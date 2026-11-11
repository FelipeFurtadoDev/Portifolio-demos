/* PULSO Auto Care: comportamento da página.
   Tudo o que muda por cliente está em js/config.js. */
(function () {
  "use strict";

  var C = window.PULSO_CONFIG;
  if (!C) return;

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  function el(tag, attrs, html) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) {
      if (k === "class") n.className = attrs[k]; else n.setAttribute(k, attrs[k]);
    });
    if (html != null) n.innerHTML = html;
    return n;
  }
  function esc(s) {
    return String(s).replace(/[&<>"]/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c];
    });
  }

  var mqMov = window.matchMedia("(prefers-reduced-motion: reduce)");
  var state = { view: C.views[0].id, active: null, service: "" };
  var servicesById = {};
  C.services.forEach(function (s) { servicesById[s.id] = s; });
  var hotById = {};
  C.hotspots.forEach(function (h) { hotById[h.id] = h; });

  /* ---------------------------------------------------------------- topo */
  var topo = $("#topo-cab");
  var faixa = $("#faixa-demo");
  if (C.demo.enabled) { faixa.textContent = C.demo.banner; faixa.hidden = false; }

  function medirTopo() {
    document.documentElement.style.setProperty("--cab-h", topo.offsetHeight + "px");
  }
  medirTopo();
  window.addEventListener("resize", medirTopo);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(medirTopo);

  function marcarRolagem() { topo.classList.toggle("is-rolado", window.scrollY > 24); }
  marcarRolagem();
  window.addEventListener("scroll", marcarRolagem, { passive: true });

  var menuBotao = $("#menu-botao");
  var menu = $("#menu");
  function fecharMenu(devolverFoco) {
    menu.classList.remove("is-aberto");
    menuBotao.setAttribute("aria-expanded", "false");
    document.documentElement.classList.remove("menu-aberto");
    if (devolverFoco) menuBotao.focus();
  }
  menuBotao.addEventListener("click", function () {
    var abrir = !menu.classList.contains("is-aberto");
    medirTopo();
    menu.classList.toggle("is-aberto", abrir);
    menuBotao.setAttribute("aria-expanded", String(abrir));
    document.documentElement.classList.toggle("menu-aberto", abrir);
    if (abrir) { var a = $("a", menu); if (a) a.focus(); }
  });
  menu.addEventListener("click", function (e) { if (e.target.closest("a")) fecharMenu(false); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && menu.classList.contains("is-aberto")) { fecharMenu(true); }
  });
  window.matchMedia("(min-width: 900px)").addEventListener("change", function (m) { if (m.matches) fecharMenu(false); });

  /* ---------------------------------------------------- B · cuidados */
  var listaServicos = $("#servicos");
  var tabs = $("#abas");
  var palco = $("#palco");
  var area = $("#palco-area");
  var pop = $("#popover");

  // lista de cuidados (sempre visível; também é a alternativa aos pontos)
  var ul = el("ul", { class: "servicos__lista" });
  C.services.forEach(function (s) {
    var li = el("li");
    var b = el("button", { type: "button", class: "servico", "data-servico": s.id, "aria-pressed": "false" },
      '<span class="servico__marca" aria-hidden="true"></span>' +
      '<span class="servico__nome">' + esc(s.name) + '</span>' +
      '<span class="servico__resumo">' + esc(s.summary) + '</span>');
    b.addEventListener("click", function () { escolherServico(s.id); });
    li.appendChild(b);
    ul.appendChild(li);
  });
  listaServicos.appendChild(ul);

  // abas e vistas
  C.views.forEach(function (v, i) {
    var t = el("button", {
      type: "button", role: "tab", class: "aba", id: "aba-" + v.id,
      "aria-controls": "vista-" + v.id, "aria-selected": String(i === 0), tabindex: i === 0 ? "0" : "-1"
    }, '<span>' + esc(v.label) + '</span>');
    t.addEventListener("click", function () { trocarVista(v.id, true); });
    t.addEventListener("keydown", function (e) {
      var idx = C.views.indexOf(v), n = C.views.length, alvo = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") alvo = (idx + 1) % n;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") alvo = (idx - 1 + n) % n;
      else if (e.key === "Home") alvo = 0;
      else if (e.key === "End") alvo = n - 1;
      if (alvo !== null) {
        e.preventDefault();
        trocarVista(C.views[alvo].id, true);
        $("#aba-" + C.views[alvo].id).focus();
      }
    });
    tabs.appendChild(t);

    var vista = el("div", { class: "vista", id: "vista-" + v.id, role: "tabpanel", "aria-labelledby": "aba-" + v.id, "data-vista": v.id });
    if (i !== 0) vista.hidden = true;
    var img = el("img", {
      src: v.src, srcset: v.srcset, sizes: "(min-width: 1000px) 44vw, (min-width: 700px) 56vw, 92vw",
      width: v.width, height: v.height, alt: v.alt, decoding: "async"
    });
    if (i !== 0) img.setAttribute("loading", "lazy");
    vista.appendChild(img);
    var pontos = el("div", { class: "pontos" });
    C.hotspots.filter(function (h) { return h.view === v.id; }).forEach(function (h) {
      var s = servicesById[h.service];
      var p = el("button", {
        type: "button", class: "ponto", "data-ponto": h.id, "aria-expanded": "false", "aria-controls": "popover",
        "aria-label": h.title + ". Cuidado: " + (s ? s.name : "")
      }, '<span class="ponto__anel" aria-hidden="true"></span><span class="ponto__miolo" aria-hidden="true"></span>');
      p.style.left = h.x + "%";
      p.style.top = h.y + "%";
      p.addEventListener("click", function () {
        if (state.active === h.id && modo() === "flutuante") fecharPopover(false);
        else selecionarPonto(h.id);
      });
      pontos.appendChild(p);
    });
    vista.appendChild(pontos);
    palco.appendChild(vista);
  });
  palco.style.aspectRatio = C.views[0].width + " / " + C.views[0].height;

  function modo() {
    return document.documentElement.clientWidth >= 1000 ? "flutuante" : "encaixado";
  }

  function trocarVista(id, abrirPrimeiro) {
    state.view = id;
    $$(".aba", tabs).forEach(function (t) {
      var sel = t.id === "aba-" + id;
      t.setAttribute("aria-selected", String(sel));
      t.tabIndex = sel ? 0 : -1;
    });
    $$(".vista", palco).forEach(function (v) { v.hidden = v.getAttribute("data-vista") !== id; });
    var view = C.views.filter(function (v) { return v.id === id; })[0];
    palco.style.aspectRatio = view.width + " / " + view.height;
    if (abrirPrimeiro) {
      var primeiro = C.hotspots.filter(function (h) { return h.view === id; })[0];
      if (primeiro) selecionarPonto(primeiro.id, true);
    }
  }

  function selecionarPonto(id, automatico) {
    var h = hotById[id];
    if (!h) return;
    if (h.view !== state.view) trocarVista(h.view, false);
    state.active = id;
    $$(".ponto", palco).forEach(function (p) {
      var on = p.getAttribute("data-ponto") === id;
      p.classList.toggle("is-ativo", on);
      p.setAttribute("aria-expanded", String(on));
    });
    var s = servicesById[h.service];
    $("#pop-cuidado").textContent = s ? s.name : "";
    $("#pop-titulo").textContent = h.title;
    $("#pop-texto").textContent = h.text;
    $("#pop-lista").innerHTML = h.includes.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("");
    pop.hidden = false;
    area.classList.add("tem-popover");
    realcarLista(h.service);
    if (!automatico) definirServico(h.service);
    posicionarPopover();
    if (!automatico && modo() === "encaixado") {
      // no painel encaixado, a informação aparece abaixo da foto: traz para a tela
      pop.scrollIntoView({ block: "nearest", behavior: mqMov.matches ? "auto" : "smooth" });
    }
  }

  function fecharPopover(devolverFoco) {
    var id = state.active;
    state.active = null;
    pop.hidden = true;
    area.classList.remove("tem-popover");
    $$(".ponto", palco).forEach(function (p) {
      p.classList.remove("is-ativo");
      p.setAttribute("aria-expanded", "false");
    });
    if (devolverFoco && id) {
      var b = $('[data-ponto="' + id + '"]', palco);
      if (b) b.focus();
    }
  }

  function limitar(v, a, b) { return Math.max(a, Math.min(v, Math.max(a, b))); }

  function posicionarPopover() {
    if (pop.hidden || !state.active) return;
    var m = modo();
    area.setAttribute("data-modo", m);
    if (m === "encaixado") {
      pop.style.left = pop.style.top = pop.style.width = "";
      return;
    }
    var h = hotById[state.active];
    var vw = document.documentElement.clientWidth;
    var aR = area.getBoundingClientRect(), sR = palco.getBoundingClientRect();
    var pw = Math.min(300, vw - 16);
    pop.style.width = pw + "px";
    var ph = pop.offsetHeight;
    var cx = sR.left + h.x / 100 * sR.width, cy = sR.top + h.y / 100 * sR.height;
    var g = 34; // distância do ponto
    var candidatos = [
      { l: cx + g, t: cy - ph / 2 },
      { l: cx - g - pw, t: cy - ph / 2 },
      { l: cx - pw / 2, t: cy + g },
      { l: cx - pw / 2, t: cy - g - ph }
    ];
    var escolhido = null, i, c, l, t;
    for (i = 0; i < candidatos.length && !escolhido; i++) {
      c = candidatos[i];
      l = limitar(c.l, 8, vw - pw - 8);
      t = limitar(c.t, sR.top + 8, sR.bottom - ph - 8);
      var cobre = !(l + pw < cx - 28 || l > cx + 28 || t + ph < cy - 28 || t > cy + 28);
      if (!cobre) escolhido = { l: l, t: t };
    }
    if (!escolhido) escolhido = { l: limitar(candidatos[0].l, 8, vw - pw - 8), t: limitar(candidatos[0].t, sR.top + 8, sR.bottom - ph - 8) };
    pop.style.left = (escolhido.l - aR.left) + "px";
    pop.style.top = (escolhido.t - aR.top) + "px";
  }

  function escolherServico(id) {
    var doView = C.hotspots.filter(function (h) { return h.service === id && h.view === state.view; })[0];
    var qualquer = C.hotspots.filter(function (h) { return h.service === id; })[0];
    var alvo = doView || qualquer;
    if (alvo) selecionarPonto(alvo.id);
  }

  $("#pop-fechar").addEventListener("click", function () { fecharPopover(true); });
  $("#pop-acao").addEventListener("click", function () {
    var h = hotById[state.active];
    if (h) definirServico(h.service);
  });
  palco.addEventListener("click", function (e) {
    if (!e.target.closest(".ponto") && modo() === "flutuante" && state.active) fecharPopover(false);
  });
  area.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && state.active && modo() === "flutuante") {
      e.stopPropagation();
      fecharPopover(true);
    }
  });
  if (window.ResizeObserver) new ResizeObserver(posicionarPopover).observe(palco);
  window.addEventListener("resize", posicionarPopover);

  /* ----------------------------------------------------- D · contato */
  var opcoes = $("#contexto-opcoes");
  function chip(valor, texto, marcado) {
    var l = el("label", { class: "chip" });
    var i = el("input", { type: "radio", name: "cuidado", value: valor });
    if (marcado) i.checked = true;
    i.addEventListener("change", function () { definirServico(valor); });
    l.appendChild(i);
    l.appendChild(el("span", null, esc(texto)));
    return l;
  }
  C.services.forEach(function (s) { opcoes.appendChild(chip(s.id, s.name, false)); });
  opcoes.appendChild(chip("", "Ainda não sei", true));

  function montarMensagem() {
    var s = servicesById[state.service];
    if (!s) return C.message.base;
    var nome = s.name.charAt(0).toLowerCase() + s.name.slice(1);
    return C.message.withService.replace("{cuidado}", nome);
  }

  function realcarLista(id) {
    $$(".servico", listaServicos).forEach(function (b) {
      b.setAttribute("aria-pressed", String(b.getAttribute("data-servico") === id));
    });
  }

  function definirServico(id) {
    state.service = id || "";
    realcarLista(state.service);
    $$('input[name="cuidado"]', opcoes).forEach(function (i) { i.checked = i.value === state.service; });
    $("#mensagem-previa").textContent = montarMensagem();
    esconderAviso();
  }

  var aviso = $("#aviso-demo");
  var botaoWhats = $("#botao-whats");
  var botaoCopiar = $("#botao-copiar");
  var linkMapa = $("#link-mapa");
  var numero = String(C.contact.whatsapp || "").replace(/\D/g, "");
  var emDemo = C.demo.enabled || !numero;

  function mostrarAviso(texto) {
    aviso.textContent = texto;
    aviso.hidden = false;
    botaoCopiar.hidden = false;
  }
  function esconderAviso() {
    aviso.hidden = true;
    botaoCopiar.hidden = true;
    botaoCopiar.textContent = "Copiar mensagem";
  }

  if (emDemo) {
    botaoWhats.setAttribute("role", "button");
    botaoWhats.addEventListener("click", function (e) {
      e.preventDefault();
      mostrarAviso(C.demo.contactNotice);
    });
  } else {
    botaoWhats.target = "_blank";
    botaoWhats.rel = "noopener";
    botaoWhats.addEventListener("click", function () {
      botaoWhats.href = "https://wa.me/" + numero + "?text=" + encodeURIComponent(montarMensagem());
    });
    botaoWhats.href = "https://wa.me/" + numero + "?text=" + encodeURIComponent(montarMensagem());
  }

  botaoCopiar.addEventListener("click", function () {
    var txt = montarMensagem();
    var ok = function () {
      botaoCopiar.textContent = "Mensagem copiada";
      setTimeout(function () { botaoCopiar.textContent = "Copiar mensagem"; }, 2200);
    };
    if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).then(ok, function () {});
  });

  $("#info-whats").textContent = C.contact.whatsappDisplay;
  $("#info-endereco").innerHTML = esc(C.contact.address.line1) + "<br>" + esc(C.contact.address.line2) +
    '<span class="info__nota">' + esc(C.contact.address.note) + "</span>";
  $("#info-horarios").innerHTML = C.contact.hours.map(function (h) {
    return "<li><span>" + esc(h.days) + "</span><strong>" + esc(h.time) + "</strong></li>";
  }).join("");
  $("#info-horarios-nota").textContent = C.contact.hoursNote;
  $("#info-pratico").textContent = C.contact.practical;

  if (C.contact.mapsUrl) {
    linkMapa.href = C.contact.mapsUrl;
    linkMapa.target = "_blank";
    linkMapa.rel = "noopener";
  } else if (C.demo.enabled) {
    linkMapa.addEventListener("click", function (e) {
      e.preventDefault();
      mostrarAviso("Endereço demonstrativo: o link do mapa é configurado em js/config.js quando o endereço real estiver definido.");
      botaoCopiar.hidden = true;
    });
  } else {
    linkMapa.hidden = true;
  }

  /* --------------------------------------------- C · legendas e créditos */
  C.details.forEach(function (d) {
    var f = $('[data-legenda="' + d.id + '"]');
    if (f) f.textContent = d.caption;
  });
  $("#creditos").textContent = "Fotografias: " + C.credits.map(function (c) { return c.use + ", " + c.text; }).join("; ") + ".";

  /* ------------------------------------------------ A · parallax da capa */
  var capa = $("#capa");
  var foto = $("#capa-foto");
  var camadas = $$("[data-camada]", capa);
  var mqLarga = window.matchMedia("(min-width: 900px) and (hover: hover) and (pointer: fine)");
  var px = 0, py = 0, pendente = false;

  function ativo() { return !mqMov.matches && mqLarga.matches; }
  function zerar() {
    foto.style.transform = "";
    camadas.forEach(function (c) { c.style.transform = ""; });
  }
  function quadro() {
    pendente = false;
    if (!ativo()) { zerar(); return; }
    var r = capa.getBoundingClientRect();
    if (r.bottom < -50 || r.top > window.innerHeight + 50) return;
    var p = Math.min(Math.max(-r.top / r.height, 0), 1);
    foto.style.transform = "translate3d(" + (px * -7).toFixed(2) + "px," + (p * r.height * 0.05 + py * -5).toFixed(2) + "px,0) scale(1.07)";
    camadas.forEach(function (c) {
      var k = parseFloat(c.getAttribute("data-camada"));
      c.style.transform = "translate3d(" + (px * k * 90).toFixed(2) + "px," + (p * r.height * k).toFixed(2) + "px,0)";
    });
  }
  function pedir() { if (!pendente) { pendente = true; requestAnimationFrame(quadro); } }
  window.addEventListener("scroll", pedir, { passive: true });
  window.addEventListener("resize", pedir);
  capa.addEventListener("pointermove", function (e) {
    if (!ativo()) return;
    var r = capa.getBoundingClientRect();
    px = ((e.clientX - r.left) / r.width - 0.5) * 2;
    py = ((e.clientY - r.top) / r.height - 0.5) * 2;
    pedir();
  });
  capa.addEventListener("pointerleave", function () { px = 0; py = 0; pedir(); });
  mqMov.addEventListener("change", pedir);
  mqLarga.addEventListener("change", pedir);
  pedir();

  /* -------------------------------------------------------------- início */
  definirServico("");
  trocarVista(C.views[0].id, true); // abre o primeiro ponto, sem escolher o cuidado no contato
})();
