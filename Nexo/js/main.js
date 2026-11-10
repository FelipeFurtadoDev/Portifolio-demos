/* ==========================================================================
   NEXO / Estúdio Facial — comportamento
   1. Textos e dados a partir do config
   2. Imagens (remotas ou locais)
   3. Atlas de cuidados (índice + painel, padrão "tabs" da W3C)
   4. Contato pelo WhatsApp / modo demonstração
   5. Menu móvel
   ========================================================================== */
(function () {
  "use strict";

  var C = window.NEXO_CONFIG;
  if (!C) {
    console.warn("NEXO: js/config.js não carregou. A página segue com o conteúdo estático.");
    return;
  }

  var root = document.documentElement;
  var desktop = window.matchMedia("(min-width: 900px)");

  /* ---------- utilidades ---------- */
  function get(path) {
    return path.split(".").reduce(function (obj, key) {
      return obj == null ? undefined : obj[key];
    }, C);
  }

  function esc(str) {
    return String(str).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  function lowerFirst(s) {
    return s.charAt(0).toLowerCase() + s.slice(1);
  }

  /* ======================================================================
     1. TEXTOS
     ====================================================================== */
  document.querySelectorAll("[data-config]").forEach(function (el) {
    var value = get(el.getAttribute("data-config"));
    if (typeof value === "string" && value.trim()) el.textContent = value;
  });

  var bar = document.querySelector("[data-demo-bar]");
  if (bar) {
    if (C.demo && C.demo.enabled) bar.textContent = C.demo.bar;
    else bar.remove();
  }

  var approach = document.querySelector("[data-approach]");
  if (approach && Array.isArray(C.approach) && C.approach.length) {
    approach.innerHTML = C.approach.map(function (p) {
      return '<p class="ponto"><strong class="ponto__lead">' + esc(p.lead) + "</strong> " + esc(p.text) + "</p>";
    }).join("");
  }

  var hoursList = document.querySelector("[data-hours]");
  if (hoursList && Array.isArray(C.hours)) {
    hoursList.innerHTML = C.hours.map(function (h) {
      return "<li><span>" + esc(h.days) + "</span> <span>" + esc(h.time) + "</span></li>";
    }).join("");
  }

  var insta = document.querySelector("[data-instagram]");
  if (insta && C.contact) {
    insta.innerHTML = C.contact.instagramUrl
      ? '<a href="' + esc(C.contact.instagramUrl) + '" target="_blank" rel="noopener">' + esc(C.contact.instagram) + "</a>"
      : esc(C.contact.instagram);
  }

  var credits = document.querySelector("[data-credits]");
  if (credits && C.images) {
    var seen = [];
    var links = [];
    Object.keys(C.images).forEach(function (k) {
      var cr = C.images[k].credit;
      if (!cr || seen.indexOf(cr.name) > -1) return;
      seen.push(cr.name);
      links.push(cr.url ? '<a href="' + esc(cr.url) + '" target="_blank" rel="noopener">' + esc(cr.name) + "</a>" : esc(cr.name));
    });
    if (links.length) {
      credits.innerHTML = links.length > 1
        ? links.slice(0, -1).join(", ") + " e " + links[links.length - 1]
        : links[0];
    }
  }

  /* ======================================================================
     2. IMAGENS
     ====================================================================== */
  var REMOTE_WIDTHS = { hero: [640, 960, 1280, 1800], other: [480, 800, 1200] };

  function remoteUrl(id, w) {
    return "https://images.unsplash.com/" + id + "?auto=format&fit=crop&w=" + w + "&q=72";
  }

  function remoteSet(key, img) {
    if (img.src) return { src: img.src, srcset: "" };
    var widths = key === "hero" ? REMOTE_WIDTHS.hero : REMOTE_WIDTHS.other;
    return {
      src: remoteUrl(img.id, key === "hero" ? 960 : 800),
      srcset: widths.map(function (w) { return remoteUrl(img.id, w) + " " + w + "w"; }).join(", ")
    };
  }

  function localSet(img) {
    var widths = img.widths || [800, 1200];
    return {
      src: "assets/img/" + img.file + "-" + widths[0] + ".webp",
      srcset: widths.map(function (w) { return "assets/img/" + img.file + "-" + w + ".webp " + w + "w"; }).join(", ")
    };
  }

  function applyImage(el, key) {
    var img = C.images && C.images[key];
    if (!img) return;
    if (img.focus) el.style.objectPosition = img.focus;
    if (img.alt && el.getAttribute("alt") !== "") el.alt = img.alt;

    var remote = remoteSet(key, img);
    var wanted = C.useLocalImages && img.file ? localSet(img) : remote;

    /* Não reatribui se já está igual: evita baixar a mesma foto duas vezes. */
    if ((el.getAttribute("srcset") || "") !== wanted.srcset) el.setAttribute("srcset", wanted.srcset);
    if (el.getAttribute("src") !== wanted.src) el.setAttribute("src", wanted.src);

    if (C.useLocalImages && img.file) {
      el.addEventListener("error", function onError() {
        el.removeEventListener("error", onError);
        console.warn("NEXO: imagem local ausente (" + img.file + "). Usando a versão remota.");
        el.setAttribute("srcset", remote.srcset);
        el.setAttribute("src", remote.src);
      });
    }
  }

  function applyAllImages(scope) {
    (scope || document).querySelectorAll("img[data-image]").forEach(function (el) {
      applyImage(el, el.getAttribute("data-image"));
    });
  }

  /* ======================================================================
     3. ATLAS DE CUIDADOS
     Índice (tablist) + painel (tabpanel), padrão "Tabs" da W3C APG,
     com ativação automática e foco itinerante (roving tabindex).

     Estabilidade visual:
     - Todos os painéis ocupam a MESMA célula da grade (CSS). A altura do
       componente é sempre a do painel mais alto: trocar de cuidado não
       muda o tamanho de nada nem empurra a página.
     - Os inativos ficam com visibility:hidden (fora da leitura e do Tab).
     - A troca é instantânea; o painel novo só faz um fade de opacidade
       (CSS). Nenhuma escala, nenhuma View Transition, nada rasterizado.
     - Cliques rápidos apenas trocam a classe: não há fila de animações.
     Sem JS: o HTML estático mostra o índice como âncoras e todos os
     cuidados em sequência.
     ====================================================================== */
  var corpo = document.getElementById("atlas-corpo");
  var tabs = [];
  var panels = [];
  var current = -1;

  function careTab(care, i) {
    return (
      '<button class="indice__item" type="button" role="tab" id="aba-' + esc(care.id) + '"' +
        ' aria-selected="false" aria-controls="cuidado-' + esc(care.id) + '" tabindex="-1">' +
        '<span class="indice__codigo">' + esc(care.code) + "</span>" +
        '<span class="indice__nome">' + esc(care.name) + "</span>" +
        '<span class="indice__duracao">' + esc(care.duration) + "</span>" +
        '<span class="indice__frase">' + esc(care.tagline || "") + "</span>" +
      "</button>"
    );
  }

  function carePanel(care) {
    var img = (C.images && C.images[care.image]) || {};
    var includes = (care.includes || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    return (
      '<article class="cuidado" id="cuidado-' + esc(care.id) + '" role="tabpanel" aria-labelledby="aba-' + esc(care.id) + '" tabindex="0">' +
        '<figure class="cuidado__foto"><img data-image="' + esc(care.image) + '" sizes="(min-width: 900px) 28vw, 100vw" width="1200" height="1500" loading="lazy" decoding="async" alt="' + esc(img.alt || "") + '"></figure>' +
        '<div class="cuidado__texto">' +
          '<p class="cuidado__meta"><span>' + esc(care.code) + "</span> <span>" + esc(care.duration) + "</span></p>" +
          '<h3 class="cuidado__nome">' + esc(care.name) + "</h3>" +
          '<p class="cuidado__resumo">' + esc(care.summary) + "</p>" +
          '<h4 class="cuidado__rotulo">O que inclui</h4>' +
          '<ul class="cuidado__lista">' + includes + "</ul>" +
          (care.note ? '<p class="cuidado__nota"><strong>Bom saber.</strong> ' + esc(care.note) + "</p>" : "") +
          '<a class="botao botao--coral" href="#estudio" data-contact data-message="' + esc(care.message || "") + '">Conversar sobre ' + esc(lowerFirst(care.name)) + "</a>" +
        "</div>" +
      "</article>"
    );
  }

  function select(index, focus) {
    if (index === current || index < 0 || index >= tabs.length) {
      if (focus && tabs[index]) tabs[index].focus();
      return;
    }
    if (current > -1) {
      tabs[current].setAttribute("aria-selected", "false");
      tabs[current].tabIndex = -1;
      panels[current].classList.remove("is-active");
    }
    current = index;
    tabs[index].setAttribute("aria-selected", "true");
    tabs[index].tabIndex = 0;
    panels[index].classList.add("is-active");
    if (focus) tabs[index].focus();

    /* No celular, a faixa de abas rola sozinha para mostrar a aba ativa,
       sem mover a página. */
    if (!desktop.matches) {
      var strip = tabs[index].parentNode;
      var t = tabs[index];
      var left = t.offsetLeft - (strip.clientWidth - t.offsetWidth) / 2;
      strip.scrollTo({ left: Math.max(0, left), behavior: "auto" });
    }
  }

  if (corpo && Array.isArray(C.cares) && C.cares.length) {
    corpo.innerHTML =
      '<div class="atlas__indice indice" role="tablist" aria-label="Cuidados" aria-orientation="vertical">' +
        C.cares.map(careTab).join("") +
      "</div>" +
      '<div class="atlas__paineis">' + C.cares.map(carePanel).join("") + "</div>";
    corpo.classList.add("atlas__corpo--js");

    tabs = Array.prototype.slice.call(corpo.querySelectorAll('[role="tab"]'));
    panels = Array.prototype.slice.call(corpo.querySelectorAll('[role="tabpanel"]'));

    var tablist = corpo.querySelector('[role="tablist"]');
    var syncOrientation = function () {
      tablist.setAttribute("aria-orientation", desktop.matches ? "vertical" : "horizontal");
    };
    syncOrientation();
    desktop.addEventListener("change", syncOrientation);

    tablist.addEventListener("click", function (ev) {
      var tab = ev.target.closest('[role="tab"]');
      if (tab) select(tabs.indexOf(tab), false);
    });

    tablist.addEventListener("keydown", function (ev) {
      var i = tabs.indexOf(document.activeElement);
      if (i < 0) return;
      var next = null;
      switch (ev.key) {
        case "ArrowDown":
        case "ArrowRight": next = (i + 1) % tabs.length; break;
        case "ArrowUp":
        case "ArrowLeft": next = (i - 1 + tabs.length) % tabs.length; break;
        case "Home": next = 0; break;
        case "End": next = tabs.length - 1; break;
      }
      if (next !== null) {
        ev.preventDefault();
        select(next, true);
      }
    });

    select(0, false);

    /* As fotos dos painéis ocultos são "lazy". Quando o atlas se aproxima
       da tela, todas passam a carregar: a primeira troca já encontra a foto
       pronta, sem caixa vazia. */
    var panelImgs = corpo.querySelectorAll(".cuidado img");
    var loadAll = function () {
      panelImgs.forEach(function (im) { im.loading = "eager"; });
    };
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(function (entries) {
        if (entries.some(function (e) { return e.isIntersecting; })) {
          loadAll();
          io.disconnect();
        }
      }, { rootMargin: "600px 0px" });
      io.observe(corpo);
    } else {
      loadAll();
    }
  }

  applyAllImages();

  /* ======================================================================
     4. CONTATO
     Com número configurado e demo desligada: link wa.me com mensagem curta.
     Na demonstração: nenhum contato é aberto; aparece um aviso discreto.
     ====================================================================== */
  var aviso = document.getElementById("aviso-demo");
  var avisoTimer = null;
  var number = ((C.contact && C.contact.whatsapp) || "").replace(/\D/g, "");
  var live = !(C.demo && C.demo.enabled) && number.length >= 10;

  function waLink(message) {
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(message);
  }

  function hideAviso() {
    if (!aviso) return;
    aviso.classList.remove("is-visivel");
    clearTimeout(avisoTimer);
  }

  function showAviso(message) {
    if (!aviso) return;
    aviso.innerHTML =
      '<div class="aviso__corpo">' +
        '<p class="aviso__titulo">' + esc(C.demo.toastTitle) + "</p>" +
        "<p>" + esc(C.demo.toastText) + "</p>" +
        '<p class="aviso__mensagem">' + esc(message) + "</p>" +
      "</div>" +
      '<button class="aviso__fechar" type="button">Fechar aviso</button>';
    aviso.classList.add("is-visivel");
    clearTimeout(avisoTimer);
    avisoTimer = setTimeout(hideAviso, 12000);
  }

  if (aviso) {
    aviso.addEventListener("click", function (ev) {
      if (ev.target.closest(".aviso__fechar")) hideAviso();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && aviso.classList.contains("is-visivel")) hideAviso();
    });
  }

  if (live) {
    document.querySelectorAll("[data-contact]").forEach(function (a) {
      a.href = waLink(a.getAttribute("data-message") || C.contact.message);
      a.target = "_blank";
      a.rel = "noopener";
    });
  }

  /* Delegação: vale também para os botões criados pelo atlas. */
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest("[data-contact]");
    if (!a || live) return;
    ev.preventDefault();
    showAviso(a.getAttribute("data-message") || C.contact.message);
  });

  /* ======================================================================
     5. MENU MÓVEL
     ====================================================================== */
  var menuBtn = document.querySelector(".topo__menu");
  var nav = document.getElementById("navegacao");
  if (menuBtn && nav) {
    root.classList.add("menu-pronto");
    var closeMenu = function () {
      menuBtn.setAttribute("aria-expanded", "false");
      nav.classList.remove("is-aberto");
    };
    menuBtn.addEventListener("click", function () {
      var open = menuBtn.getAttribute("aria-expanded") !== "true";
      menuBtn.setAttribute("aria-expanded", String(open));
      nav.classList.toggle("is-aberto", open);
    });
    nav.addEventListener("click", function (ev) {
      if (ev.target.closest("a")) closeMenu();
    });
    document.addEventListener("keydown", function (ev) {
      if (ev.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") {
        closeMenu();
        menuBtn.focus();
      }
    });
    window.matchMedia("(min-width: 760px)").addEventListener("change", closeMenu);
  }
})();
