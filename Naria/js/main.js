/* ==========================================================================
   NÁRIA — comportamento da página
   Lê window.SITE_CONFIG (js/config.js) e preenche conteúdos, imagens,
   serviços, perguntas e o formulário de agendamento via WhatsApp.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.SITE_CONFIG;
  if (!cfg) {
    console.error("SITE_CONFIG não encontrado. Verifique se js/config.js foi carregado.");
    return;
  }

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  function get(obj, path) {
    return path.split(".").reduce(function (acc, key) { return acc == null ? acc : acc[key]; }, obj);
  }

  function el(tag, attrs, children) {
    var node = document.createElement(tag);
    if (attrs) {
      Object.keys(attrs).forEach(function (k) {
        if (k === "text") node.textContent = attrs[k];
        else if (k === "html") node.innerHTML = attrs[k];
        else node.setAttribute(k, attrs[k]);
      });
    }
    (children || []).forEach(function (c) { if (c) node.appendChild(c); });
    return node;
  }

  var isDemo = !!(cfg.demo && cfg.demo.enabled) || !cfg.contact.whatsapp;
  var reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------------------------------------------------------------
     Textos simples marcados com data-config="caminho.no.config"
     --------------------------------------------------------------------- */
  $$("[data-config]").forEach(function (node) {
    var value = get(cfg, node.getAttribute("data-config"));
    if (typeof value === "string") node.textContent = value;
  });

  if (!isDemo) {
    $$("[data-demo-only], .demo-bar").forEach(function (n) { n.remove(); });
  }

  /* ---------------------------------------------------------------------
     Imagens: URLs da Unsplash recebem srcset responsivo
     --------------------------------------------------------------------- */
  var WIDTHS = [480, 800, 1200, 1600];

  function isUnsplash(src) { return /^https:\/\/images\.unsplash\.com\//.test(src); }

  function unsplashUrl(src, w, crop, focus) {
    var url = src + "?auto=format&fit=crop&q=72&w=" + w + (focus ? "&crop=" + focus : "");
    if (crop) {
      var parts = crop.split(":");
      url += "&h=" + Math.round((w * Number(parts[1])) / Number(parts[0]));
    }
    return url;
  }

  var LOCAL_WIDTHS = [800, 1200];

  function setRemote(img, data, crop) {
    if (isUnsplash(data.src)) {
      img.srcset = WIDTHS.map(function (w) { return unsplashUrl(data.src, w, crop, data.focus) + " " + w + "w"; }).join(", ");
      img.src = unsplashUrl(data.src, 800, crop, data.focus);
    } else {
      img.removeAttribute("srcset");
      img.src = data.src;
    }
  }

  function setLocal(img, data) {
    var base = "assets/img/" + data.file + "-";
    img.srcset = LOCAL_WIDTHS.map(function (w) { return base + w + ".webp " + w + "w"; }).join(", ");
    img.src = base + LOCAL_WIDTHS[0] + ".webp";
  }

  function applyImage(img, data) {
    if (!img || !data) return;
    var crop = img.getAttribute("data-crop");
    var local = !!(cfg.useLocalImages && data.file);
    img.sizes = img.getAttribute("data-sizes") || "100vw";
    img.alt = data.alt || "";

    img.addEventListener("error", function onError() {
      if (local) {
        /* Arquivo local ausente: volta para a URL original */
        console.warn("Imagem local não encontrada (assets/img/" + data.file + "-*.webp). Usando a URL remota.");
        local = false;
        setRemote(img, data, crop);
        return;
      }
      img.removeEventListener("error", onError);
      console.warn("Imagem não carregou:", data.src);
      if (img.closest("figure")) img.closest("figure").classList.add("is-broken");
    });

    if (local) setLocal(img, data);
    else setRemote(img, data, crop);
  }

  $$("img[data-image]").forEach(function (img) {
    applyImage(img, cfg.images[img.getAttribute("data-image")]);
  });

  /* ---------------------------------------------------------------------
     Coleção de cuidados (abas acessíveis)
     --------------------------------------------------------------------- */
  var tabsWrap = $('[data-render="service-tabs"]');
  var panelsWrap = $('[data-render="service-panels"]');
  var tabs = [];
  var panels = [];

  cfg.services.forEach(function (s, i) {
    var tab = el("button", {
      type: "button",
      role: "tab",
      id: "tab-" + s.id,
      "aria-controls": "painel-" + s.id,
      "aria-selected": i === 0 ? "true" : "false",
      tabindex: i === 0 ? "0" : "-1",
      class: "service-tab"
    }, [
      el("span", { class: "service-tab__name", text: s.name }),
      el("span", { class: "service-tab__summary", text: s.summary })
    ]);

    var img = el("img", {
      "data-crop": "4:5",
      "data-sizes": "(min-width: 1024px) 30vw, 88vw",
      width: "800",
      height: "1000",
      loading: "lazy"
    });

    var list = el("ul", { class: "service-panel__steps" },
      s.steps.map(function (step) { return el("li", { text: step }); }));

    var panel = el("div", {
      role: "tabpanel",
      id: "painel-" + s.id,
      "aria-labelledby": "tab-" + s.id,
      class: "service-panel",
      tabindex: "0"
    }, [
      el("figure", { class: "service-panel__figure" }, [
        img,
        el("figcaption", { class: "photo-note", text: "Imagem ilustrativa" })
      ]),
      el("div", { class: "service-panel__text" }, [
        el("h3", { class: "service-panel__name", text: s.name }),
        el("p", { class: "service-panel__desc", text: s.description }),
        el("p", { class: "service-panel__label", text: "Como acontece" }),
        list,
        el("p", { class: "service-panel__duration", text: s.duration }),
        el("a", {
          class: "button button--light",
          href: "#agendar",
          "data-service-link": s.id,
          text: "Agendar " + s.name.toLowerCase()
        })
      ])
    ]);
    if (i !== 0) panel.hidden = true;

    applyImage(img, s.image);
    tabsWrap.appendChild(tab);
    panelsWrap.appendChild(panel);
    tabs.push(tab);
    panels.push(panel);
  });

  function selectTab(index, focus) {
    tabs.forEach(function (t, i) {
      var active = i === index;
      t.setAttribute("aria-selected", active ? "true" : "false");
      t.tabIndex = active ? 0 : -1;
      panels[i].hidden = !active;
      if (active && !reduceMotion) {
        panels[i].classList.remove("is-entering");
        void panels[i].offsetWidth; /* reinicia a animação */
        panels[i].classList.add("is-entering");
      }
    });
    if (focus) tabs[index].focus();
  }

  tabs.forEach(function (tab, i) {
    tab.addEventListener("click", function () { selectTab(i, false); });
    tab.addEventListener("keydown", function (e) {
      var next = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") next = (i + 1) % tabs.length;
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") next = (i - 1 + tabs.length) % tabs.length;
      if (e.key === "Home") next = 0;
      if (e.key === "End") next = tabs.length - 1;
      if (next !== null) { e.preventDefault(); selectTab(next, true); }
    });
  });

  /* ---------------------------------------------------------------------
     Endereço, horários, contato, perguntas e créditos
     --------------------------------------------------------------------- */
  var address = $('[data-render="address"]');
  if (address) {
    [cfg.address.street, cfg.address.district, cfg.address.city].forEach(function (line, i) {
      if (i) address.appendChild(el("br"));
      address.appendChild(document.createTextNode(line));
    });
    if (cfg.address.note) address.appendChild(el("span", { class: "info-block__note", text: cfg.address.note }));
  }

  var hours = $('[data-render="hours"]');
  if (hours) {
    cfg.hours.forEach(function (h) {
      hours.appendChild(el("div", null, [el("dt", { text: h.days }), el("dd", { text: h.time })]));
    });
  }

  var contact = $('[data-render="contact"]');
  if (contact) {
    var waLine = el("span", { class: "contact-line" }, [
      document.createTextNode("WhatsApp " + cfg.contact.whatsappDisplay)
    ]);
    if (isDemo) waLine.appendChild(el("span", { class: "tag-demo", text: "demonstrativo" }));
    contact.appendChild(waLine);
    if (cfg.contact.instagram) {
      var ig = cfg.contact.instagramUrl
        ? el("a", { href: cfg.contact.instagramUrl, rel: "noopener", target: "_blank", text: "Instagram " + cfg.contact.instagram })
        : el("span", { text: "Instagram " + cfg.contact.instagram });
      var igLine = el("span", { class: "contact-line" }, [ig]);
      if (isDemo) igLine.appendChild(el("span", { class: "tag-demo", text: "demonstrativo" }));
      contact.appendChild(igLine);
    }
    contact.appendChild(el("a", { class: "text-link", href: "#agendar", text: "Solicitar horário" }));
  }

  var faq = $('[data-render="faq"]');
  if (faq) {
    cfg.faq.forEach(function (item) {
      faq.appendChild(el("details", { class: "faq-item" }, [
        el("summary", null, [el("span", { text: item.q }), el("span", { class: "faq-item__sign", "aria-hidden": "true" })]),
        el("p", { text: item.a })
      ]));
    });
  }

  var credits = $('[data-render="credits"]');
  if (credits) {
    var seen = {};
    var all = Object.keys(cfg.images).map(function (k) { return cfg.images[k]; })
      .concat(cfg.services.map(function (s) { return s.image; }));
    all.forEach(function (img) {
      if (!img || !img.credit || seen[img.credit.url]) return;
      seen[img.credit.url] = true;
      credits.appendChild(el("li", null, [
        el("a", { href: img.credit.url, rel: "noopener", target: "_blank", text: img.credit.author }),
        document.createTextNode(" — " + (img.alt || "fotografia"))
      ]));
    });
  }

  /* ---------------------------------------------------------------------
     Formulário de agendamento → mensagem de WhatsApp
     --------------------------------------------------------------------- */
  var form = $("#form-agendamento");
  var select = $('[data-render="service-options"]');
  var periodsWrap = $('[data-render="periods"]');

  select.appendChild(el("option", { value: "", text: "Quero ajuda para escolher" }));
  cfg.services.forEach(function (s) {
    select.appendChild(el("option", { value: s.id, text: s.name }));
  });

  cfg.periods.forEach(function (p, i) {
    var id = "periodo-" + i;
    var input = el("input", { type: "radio", name: "periodo", id: id, value: p });
    if (i === cfg.periods.length - 1) input.checked = true;
    periodsWrap.appendChild(el("div", { class: "period" }, [input, el("label", { for: id, text: p })]));
  });

  /* Links "Agendar ..." pré-selecionam o serviço */
  document.addEventListener("click", function (e) {
    var link = e.target.closest("[data-service-link]");
    if (!link) return;
    var id = link.getAttribute("data-service-link");
    if (id) select.value = id;
  });

  function buildMessage() {
    var data = new FormData(form);
    var service = cfg.services.filter(function (s) { return s.id === data.get("servico"); })[0];
    var name = String(data.get("nome") || "").trim();
    var obs = String(data.get("obs") || "").trim();
    var lines = [];
    lines.push("Olá! " + (name ? "Sou " + name + " e g" : "G") + "ostaria de agendar um horário na " + cfg.brand.name + ".");
    lines.push("Cuidado: " + (service ? service.name : "ainda não sei, gostaria de ajuda para escolher"));
    lines.push("Período preferido: " + (data.get("periodo") || "sem preferência"));
    if (obs) lines.push("Observações: " + obs);
    return lines.join("\n");
  }

  var dialog = $("#demo-dialog");
  var dialogMsg = $("#demo-dialog-message");
  var dialogStatus = $("#demo-dialog-status");
  var lastTrigger = null;

  function openDemoDialog(message) {
    dialogMsg.textContent = message;
    dialogStatus.textContent = "";
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
    } else {
      window.alert(message);
    }
  }

  if (dialog) {
    dialog.addEventListener("close", function () {
      if (lastTrigger) lastTrigger.focus();
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
  }

  $("#demo-dialog-copy").addEventListener("click", function () {
    var text = dialogMsg.textContent;
    var done = function () { dialogStatus.textContent = "Mensagem copiada."; };
    var fail = function () { dialogStatus.textContent = "Não foi possível copiar automaticamente. Selecione o texto e copie manualmente."; };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(text).then(done, fail);
    } else {
      try {
        var ta = el("textarea", { readonly: "", style: "position:fixed;opacity:0" });
        ta.value = text;
        document.body.appendChild(ta);
        ta.select();
        document.execCommand("copy") ? done() : fail();
        ta.remove();
      } catch (err) { fail(); }
    }
  });

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var message = buildMessage();
    lastTrigger = form.querySelector('[type="submit"]');
    if (isDemo) {
      openDemoDialog(message);
      return;
    }
    var url = "https://wa.me/" + cfg.contact.whatsapp.replace(/\D/g, "") + "?text=" + encodeURIComponent(message);
    window.open(url, "_blank", "noopener");
  });

  /* ---------------------------------------------------------------------
     Menu mobile
     --------------------------------------------------------------------- */
  var toggle = $(".menu-toggle");
  var nav = $("#menu-principal");
  var header = $(".site-header");
  var mq = window.matchMedia("(min-width: 1024px)");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.querySelector(".menu-toggle__label").textContent = open ? "Fechar" : "Menu";
    header.classList.toggle("is-open", open);
    document.documentElement.classList.toggle("menu-open", open);
  }

  toggle.addEventListener("click", function () {
    setMenu(toggle.getAttribute("aria-expanded") !== "true");
  });

  nav.addEventListener("click", function (e) {
    if (e.target.closest("a") && !mq.matches) setMenu(false);
  });

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
      setMenu(false);
      toggle.focus();
    }
  });

  /* Mantém o foco dentro do menu aberto */
  header.addEventListener("keydown", function (e) {
    if (e.key !== "Tab" || toggle.getAttribute("aria-expanded") !== "true") return;
    var focusables = [toggle].concat($$("a", nav));
    var first = focusables[0];
    var last = focusables[focusables.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  function onBreakpoint() { if (mq.matches) setMenu(false); }
  if (mq.addEventListener) mq.addEventListener("change", onBreakpoint);
  else mq.addListener(onBreakpoint);

  /* Cabeçalho ganha fundo ao rolar */
  var onScroll = function () { header.classList.toggle("is-scrolled", window.scrollY > 8); };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  document.documentElement.classList.add("js-ready");
})();
