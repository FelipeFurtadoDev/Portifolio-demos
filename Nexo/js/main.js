/* ==========================================================================
   NEXO / Estúdio Facial — comportamento
   1. Textos e dados a partir do config
   2. Imagens (remotas ou locais)
   3. Atlas de cuidados (disclosure em faixas)
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
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

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

    /* Não reatribui se já está igual: evita baixar a foto da capa duas vezes. */
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
     Padrão "disclosure" (W3C APG): cada faixa tem um <button> com
     aria-expanded e aria-controls. Uma faixa aberta por vez.
     Sem JS: tudo aberto (conteúdo estático do HTML).
     ====================================================================== */
  var list = document.getElementById("atlas-lista");

  function careMarkup(care, i) {
    var img = (C.images && C.images[care.image]) || {};
    var includes = (care.includes || []).map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    var label = "Conversar sobre " + care.name.charAt(0).toLowerCase() + care.name.slice(1);
    return (
      '<li class="faixa" id="faixa-' + esc(care.id) + '" style="--i:' + i + '">' +
        '<div class="faixa__corpo">' +
        '<h3 class="faixa__titulo">' +
          '<button class="faixa__botao" type="button" aria-expanded="false" aria-controls="painel-' + esc(care.id) + '">' +
            '<span class="faixa__codigo">' + esc(care.code) + "</span>" +
            '<span class="faixa__nome">' + esc(care.name) + "</span>" +
            '<span class="faixa__duracao">' + esc(care.duration) + "</span>" +
            '<span class="faixa__sinal" aria-hidden="true"></span>' +
          "</button>" +
        "</h3>" +
        '<figure class="faixa__foto"><img data-image="' + esc(care.image) + '" sizes="(min-width: 900px) 40vw, 100vw" loading="lazy" decoding="async" alt="' + esc(img.alt || "") + '"></figure>' +
        '<p class="faixa__resumo">' + esc(care.summary) + "</p>" +
        '<div class="faixa__painel" id="painel-' + esc(care.id) + '" hidden>' +
          '<div class="faixa__colunas">' +
            '<div class="faixa__inclui"><h4>O que inclui</h4><ul>' + includes + "</ul></div>" +
            '<dl class="faixa__notas">' +
              (care.forWhom ? "<div><dt>Para quem</dt><dd>" + esc(care.forWhom) + "</dd></div>" : "") +
              (care.note ? "<div><dt>Bom saber</dt><dd>" + esc(care.note) + "</dd></div>" : "") +
            "</dl>" +
          "</div>" +
          '<a class="botao botao--lima" href="#estudio" data-contact data-message="' + esc(care.message || "") + '">' + esc(label) + "</a>" +
        "</div>" +
        "</div>" +
      "</li>"
    );
  }

  var openId = null;

  function setOpen(id, opts) {
    opts = opts || {};
    var apply = function () {
      openId = id;
      list.classList.toggle("atlas__faixas--aberto", !!id);
      list.querySelectorAll(".faixa").forEach(function (li) {
        var isOpen = li.id === "faixa-" + id;
        li.classList.toggle("is-open", isOpen);
        var btn = li.querySelector(".faixa__botao");
        var panel = li.querySelector(".faixa__painel");
        btn.setAttribute("aria-expanded", String(isOpen));
        panel.hidden = !isOpen;
      });
    };

    /* View Transition só no desktop, onde as faixas mudam de largura.
       Sem suporte (ou com movimento reduzido): troca instantânea. */
    if (opts.animate && document.startViewTransition && !reduceMotion.matches &&
        window.matchMedia("(min-width: 900px)").matches) {
      document.startViewTransition(apply);
    } else {
      apply();
    }
  }

  if (list && Array.isArray(C.cares) && C.cares.length) {
    list.innerHTML = C.cares.map(careMarkup).join("");
    list.classList.add("atlas__faixas--js");
    root.classList.add("atlas-pronto");

    list.addEventListener("click", function (ev) {
      var btn = ev.target.closest(".faixa__botao");
      if (!btn) return;
      var id = btn.getAttribute("aria-controls").replace("painel-", "");
      var next = openId === id ? null : id;
      setOpen(next, { animate: true });
      /* No celular a faixa anterior fecha acima: mantém o botão à vista. */
      if (next && !window.matchMedia("(min-width: 900px)").matches) {
        requestAnimationFrame(function () {
          btn.scrollIntoView({ block: "nearest", behavior: reduceMotion.matches ? "auto" : "smooth" });
        });
      }
    });

    setOpen(null);
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

  function setupContactLinks(scope) {
    (scope || document).querySelectorAll("[data-contact]").forEach(function (a) {
      var message = a.getAttribute("data-message") || C.contact.message;
      if (live) {
        a.href = waLink(message);
        a.target = "_blank";
        a.rel = "noopener";
      }
    });
  }

  /* Delegação: vale também para os botões criados pelo atlas. */
  document.addEventListener("click", function (ev) {
    var a = ev.target.closest("[data-contact]");
    if (!a || live) return;
    ev.preventDefault();
    showAviso(a.getAttribute("data-message") || C.contact.message);
  });

  setupContactLinks();

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
    window.matchMedia("(min-width: 700px)").addEventListener("change", closeMenu);
  }
})();
