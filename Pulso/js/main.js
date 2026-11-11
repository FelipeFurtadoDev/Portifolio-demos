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
  var state = { view: C.views[0].id, active: null, service: "", focus: "" };
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

  /* ---------------------------------------------------- B · cuidados
     Cada vista tem a sua lista. Item da lista e ponto da foto são o mesmo
     objeto (config.hotspots): selecionar um seleciona o outro. */
  var tabs = $("#abas");
  var palco = $("#palco");
  var legenda = $("#legenda");
  var mqLado = window.matchMedia("(min-width: 900px)");

  function pontosDa(viewId) { return C.hotspots.filter(function (h) { return h.view === viewId; }); }

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

    // foto com pontos
    var vista = el("div", { class: "vista", id: "vista-" + v.id, role: "tabpanel", "aria-labelledby": "aba-" + v.id, "data-vista": v.id });
    if (i !== 0) vista.hidden = true;
    var img = el("img", {
      src: v.src, srcset: v.srcset, sizes: "(min-width: 900px) 40vw, 92vw",
      width: v.width, height: v.height, alt: v.alt, decoding: "async"
    });
    if (i !== 0) img.setAttribute("loading", "lazy");
    vista.appendChild(img);
    var pontos = el("div", { class: "pontos" });

    // lista da vista
    var grupo = el("div", { class: "legenda__grupo", "data-vista": v.id });
    if (i !== 0) grupo.hidden = true;
    grupo.appendChild(el("h3", { class: "legenda__titulo" }, esc(v.heading)));
    var lista = el("ol", { class: "legenda__lista" });

    pontosDa(v.id).forEach(function (h, n) {
      var num = String(n + 1);
      var lado = h.edge ? "borda" : (h.x > 50 ? "esq" : "dir");
      var p = el("button", {
        type: "button", class: "ponto ponto--" + lado, "data-ponto": h.id,
        "aria-pressed": "false", "aria-controls": "item-" + h.id,
        "aria-label": num + ". " + h.title + (h.edge ? ", abaixo do enquadramento da foto" : "")
      }, '<span class="ponto__anel" aria-hidden="true"></span><span class="ponto__miolo" aria-hidden="true">' + num + '</span>' +
         '<span class="ponto__rotulo" aria-hidden="true">' + esc(h.title) + '</span>');
      p.style.left = h.x + "%";
      p.style.top = h.y + "%";
      p.addEventListener("click", function () { selecionar(h.id, { usuario: true, origem: "ponto" }); });
      ligarRealce(p, h.id);
      pontos.appendChild(p);

      var li = el("li", { class: "item", id: "item-" + h.id, "data-item": h.id });
      var bt = el("button", { type: "button", class: "item__botao", "aria-expanded": "false", "aria-controls": "item-det-" + h.id },
        '<span class="item__num" aria-hidden="true">' + num + '</span>' +
        '<span class="item__nome">' + esc(h.title) + '</span>' +
        '<span class="item__onde">' + esc(h.where) + '</span>');
      bt.addEventListener("click", function () { selecionar(h.id, { usuario: true, origem: "lista" }); });
      ligarRealce(bt, h.id);
      var det = el("div", { class: "item__detalhe", id: "item-det-" + h.id });
      det.hidden = true;
      det.innerHTML = '<p>' + esc(h.text) + '</p><ul>' +
        h.includes.map(function (t) { return "<li>" + esc(t) + "</li>"; }).join("") + '</ul>';
      var cta = el("a", { class: "item__acao", href: "#contato" }, "Conversar sobre isto");
      cta.addEventListener("click", function () { definirServico(h.service, h.focus); });
      det.appendChild(cta);
      li.appendChild(bt);
      li.appendChild(det);
      lista.appendChild(li);
    });
    vista.appendChild(pontos);
    palco.appendChild(vista);
    grupo.appendChild(lista);
    legenda.appendChild(grupo);
  });

  // realce cruzado ao passar o mouse ou focar: lista ↔ ponto
  function ligarRealce(node, id) {
    var on = function () { realce(id, true); }, off = function () { realce(id, false); };
    node.addEventListener("pointerenter", on);
    node.addEventListener("pointerleave", off);
    node.addEventListener("focus", on);
    node.addEventListener("blur", off);
  }
  function realce(id, on) {
    var p = $('[data-ponto="' + id + '"]', palco), it = $('[data-item="' + id + '"]', legenda);
    if (p) p.classList.toggle("is-realce", on);
    if (it) it.classList.toggle("is-realce", on);
  }

  function trocarVista(id, abrirPrimeiro) {
    state.view = id;
    $$(".aba", tabs).forEach(function (t) {
      var sel = t.id === "aba-" + id;
      t.setAttribute("aria-selected", String(sel));
      t.tabIndex = sel ? 0 : -1;
    });
    $$(".vista", palco).forEach(function (v) { v.hidden = v.getAttribute("data-vista") !== id; });
    $$(".legenda__grupo", legenda).forEach(function (g) { g.hidden = g.getAttribute("data-vista") !== id; });
    var view = C.views.filter(function (v) { return v.id === id; })[0];
    palco.style.aspectRatio = view.width + " / " + view.height;
    if (abrirPrimeiro) {
      var primeiro = pontosDa(id)[0];
      if (primeiro) selecionar(primeiro.id, { usuario: false });
    }
  }

  function selecionar(id, opt) {
    var h = hotById[id];
    if (!h) return;
    if (h.view !== state.view) trocarVista(h.view, false);
    state.active = id;
    $$(".ponto", palco).forEach(function (p) {
      var on = p.getAttribute("data-ponto") === id;
      p.classList.toggle("is-ativo", on);
      p.setAttribute("aria-pressed", String(on));
    });
    $$(".item", legenda).forEach(function (li) {
      var on = li.getAttribute("data-item") === id;
      li.classList.toggle("is-ativo", on);
      $(".item__botao", li).setAttribute("aria-expanded", String(on));
      $(".item__detalhe", li).hidden = !on;
    });
    if (opt.usuario) {
      definirServico(h.service, h.focus);
      // no celular a lista fica abaixo da foto: ao tocar num ponto, traz o item para a tela
      if (opt.origem === "ponto" && !mqLado.matches) {
        var li = $('[data-item="' + id + '"]', legenda);
        if (li) li.scrollIntoView({ block: "nearest", behavior: mqMov.matches ? "auto" : "smooth" });
      }
    }
  }

  /* ----------------------------------------------------- D · contato */
  var opcoes = $("#contexto-opcoes");
  function chip(valor, texto, marcado) {
    var l = el("label", { class: "chip" });
    var i = el("input", { type: "radio", name: "cuidado", value: valor });
    if (marcado) i.checked = true;
    i.addEventListener("change", function () { definirServico(valor, ""); });
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
    if (state.focus && C.message.withFocus) return C.message.withFocus.replace("{cuidado}", nome).replace("{foco}", state.focus);
    return C.message.withService.replace("{cuidado}", nome);
  }

  function definirServico(id, foco) {
    state.service = id || "";
    state.focus = state.service ? (foco || "") : "";
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


  /* ------------------------------------------- A · cena de abertura
     Componente 14 (parallax em camadas). A capa fica presa (position:
     sticky) por um trecho curto de rolagem e cada camada anda numa
     velocidade: o texto sai primeiro, os riscos cruzam o topo, a foto se
     aproxima pouco e o plano gelo sobe na diagonal até virar a seção
     seguinte. Só com tela larga e alta e sem preferência por movimento
     reduzido; no celular há uma versão leve, sem prender a página. */
  var trilho = $("#capa-trilho");
  var capa = $("#capa");
  var foto = $("#capa-foto");
  var texto = $(".capa__texto", capa);
  var linhas = $$(".capa__titulo span", capa);
  var apoio = [$(".capa__apoio", capa), $(".capa__acoes", capa), $(".capa__pulso", capa)];
  var riscos = $(".capa__riscos", capa);
  var faixaCapa = $(".capa__faixa", capa);
  var corte = $("#capa-corte");
  var mqCena = window.matchMedia("(min-width: 900px) and (min-height: 640px)");
  var cena = { modo: "", alvo: 0, atual: 0, raf: 0, extra: 0 };

  function suave(p, a, b) { var t = Math.min(Math.max((p - a) / (b - a), 0), 1); return t * t * (3 - 2 * t); }
  function limpar(lista) { lista.forEach(function (n) { if (n) { n.style.transform = ""; n.style.opacity = ""; } }); }

  function modoCena() {
    if (mqMov.matches) return "parado";
    return mqCena.matches ? "cena" : "leve";
  }

  function medirCena() {
    var m = modoCena();
    if (m !== cena.modo) {
      cena.modo = m;
      document.documentElement.classList.toggle("cena-ativa", m === "cena");
      limpar([foto, texto, riscos, faixaCapa, corte].concat(linhas, apoio));
    }
    if (m === "cena") {
      cena.extra = Math.round(window.innerHeight * 0.7);
      var t = corte.style.transform;
      corte.style.transform = "";
      cena.corteH = corte.getBoundingClientRect().height || 60;
      corte.style.transform = t;
      trilho.style.height = (capa.offsetHeight + cena.extra) + "px";
    } else {
      trilho.style.height = "";
    }
    lerCena();
  }

  function lerCena() {
    if (cena.modo === "parado") return;
    var r = trilho.getBoundingClientRect();
    cena.alvo = cena.modo === "cena"
      ? Math.min(Math.max(-r.top / cena.extra, 0), 1)
      : Math.min(Math.max(-r.top / capa.offsetHeight, 0), 1);
    if (!cena.raf) cena.raf = requestAnimationFrame(passoCena);
  }

  function passoCena() {
    cena.raf = 0;
    // "scrub" com pequeno atraso: a cena acompanha a rolagem sem trancos
    cena.atual += (cena.alvo - cena.atual) * 0.2;
    if (Math.abs(cena.alvo - cena.atual) < 0.0008) cena.atual = cena.alvo;
    desenharCena(cena.atual);
    if (cena.atual !== cena.alvo) cena.raf = requestAnimationFrame(passoCena);
  }

  function desenharCena(p) {
    var vw = document.documentElement.clientWidth / 100;
    if (cena.modo === "leve") {
      foto.style.transform = "translate3d(0," + (p * 36).toFixed(1) + "px,0)";
      riscos.style.transform = "translate3d(" + (-p * 30 * vw).toFixed(1) + "px,0,0)";
      return;
    }
    var h = capa.offsetHeight;
    // fundo: a foto se aproxima pouco (sem passar de 7%, para não amolecer a imagem)
    foto.style.transform = "translate3d(" + (-p * 2.5 * vw).toFixed(1) + "px," + (-p * h * 0.04).toFixed(1) + "px,0) scale(" + (1 + p * 0.07).toFixed(4) + ")";
    // primeiro plano tipográfico: cada linha escapa numa velocidade
    var saida = suave(p, 0.08, 0.62);
    linhas.forEach(function (l, i) {
      l.style.transform = "translate3d(" + (-saida * (10 + i * 9) * vw).toFixed(1) + "px,0,0)";
    });
    texto.style.transform = "translate3d(0," + (-p * h * 0.16).toFixed(1) + "px,0)";
    texto.style.opacity = (1 - suave(p, 0.3, 0.66)).toFixed(3);
    apoio.forEach(function (n, i) { if (n) n.style.transform = "translate3d(0," + (-saida * (20 + i * 14)).toFixed(1) + "px,0)"; });
    // riscos: atravessam o topo, mais rápidos que a foto
    riscos.style.transform = "translate3d(" + (-p * 62 * vw).toFixed(1) + "px," + (-p * 24).toFixed(1) + "px,0)";
    faixaCapa.style.transform = "translate3d(" + (-suave(p, 0, 0.7) * 46 * vw).toFixed(1) + "px,0,0)";
    // plano gelo: sobe na diagonal até cobrir ~46% da capa
    var s = 1 + suave(p, 0.22, 1) * Math.max(0, (h * 0.46) / cena.corteH - 1);
    corte.style.transform = "scaleY(" + s.toFixed(4) + ")";
  }

  window.addEventListener("scroll", lerCena, { passive: true });
  window.addEventListener("resize", medirCena);
  mqMov.addEventListener("change", medirCena);
  mqCena.addEventListener("change", medirCena);

  /* ------------------------------------------- D · método PULSO
     Componente 15 (SVG animado). O traçado é calculado a partir da posição
     real dos marcos das etapas, então acompanha qualquer largura. Ele se
     desenha com a rolagem; ao passar por um marco, faz o "pulso" da marca
     e revela a foto da etapa. Sem JS, as etapas e fotos aparecem normalmente;
     com movimento reduzido, o traçado aparece inteiro. */
  var metodo = $("#metodo");
  var percurso = $("#percurso");
  var etapas = $$(".etapa", percurso);
  var NS = "http://www.w3.org/2000/svg";
  var svg = document.createElementNS(NS, "svg");
  svg.setAttribute("class", "percurso__svg");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");
  var trilha = document.createElementNS(NS, "path");
  trilha.setAttribute("class", "percurso__trilha");
  var vivo = document.createElementNS(NS, "path");
  vivo.setAttribute("class", "percurso__vivo");
  svg.appendChild(trilha);
  svg.appendChild(vivo);
  percurso.insertBefore(svg, percurso.firstChild);
  metodo.classList.add("metodo--js");

  var rota = { total: 0, ys: [], passo: 6, marcos: [], alvo: 0, atual: 0, raf: 0 };

  function centro(n, ref) {
    var a = n.getBoundingClientRect(), b = ref.getBoundingClientRect();
    return { x: a.left + a.width / 2 - b.left, y: a.top + a.height / 2 - b.top };
  }

  // polilinha com cantos arredondados; pontos com `vivo: true` (o pulso) ficam retos
  function caminho(pts, raio) {
    var d = "M" + pts[0].x.toFixed(1) + " " + pts[0].y.toFixed(1);
    for (var i = 1; i < pts.length; i++) {
      var p = pts[i], a = pts[i - 1], n = pts[i + 1];
      if (!n || p.vivo || a.vivo && false) { d += " L" + p.x.toFixed(1) + " " + p.y.toFixed(1); continue; }
      var l1 = Math.hypot(p.x - a.x, p.y - a.y), l2 = Math.hypot(n.x - p.x, n.y - p.y);
      var r = Math.min(raio, l1 / 2, l2 / 2);
      if (r < 1 || n.vivo) { d += " L" + p.x.toFixed(1) + " " + p.y.toFixed(1); continue; }
      var x1 = p.x - (p.x - a.x) / l1 * r, y1 = p.y - (p.y - a.y) / l1 * r;
      var x2 = p.x + (n.x - p.x) / l2 * r, y2 = p.y + (n.y - p.y) / l2 * r;
      d += " L" + x1.toFixed(1) + " " + y1.toFixed(1) + " Q" + p.x.toFixed(1) + " " + p.y.toFixed(1) + " " + x2.toFixed(1) + " " + y2.toFixed(1);
    }
    return d;
  }

  function montarRota() {
    var w = percurso.clientWidth;
    var pR = percurso.getBoundingClientRect();
    var mR = metodo.getBoundingClientRect();
    var fim = mR.bottom - pR.top + 2;
    var largo = w >= 700;
    var E = largo ? 34 : 26;            // distância da faixa vertical até o marco
    var A = largo ? 1.5 : .9;           // amplitude do pulso
    var pts = [];
    rota.marcos = etapas.map(function (li) { return centro($(".etapa__marco", li), percurso); });
    var caixas = etapas.map(function (li) {
      var r = li.getBoundingClientRect();
      return { top: r.top - pR.top, bottom: r.bottom - pR.top };
    });
    rota.marcos.forEach(function (m, i) {
      var faixa = m.x - E;
      if (i === 0) pts.push({ x: faixa, y: -60 });
      else {
        // atravessa no vão entre a etapa anterior e esta
        var vao = (caixas[i - 1].bottom + caixas[i].top) / 2;
        pts.push({ x: rota.marcos[i - 1].x, y: vao });
        pts.push({ x: faixa, y: vao });
      }
      pts.push({ x: faixa, y: m.y });
      // o pulso da marca, entrando no marco
      pts.push({ x: faixa + E * .22, y: m.y - 20 * A, vivo: true });
      pts.push({ x: faixa + E * .5, y: m.y + 24 * A, vivo: true });
      pts.push({ x: faixa + E * .74, y: m.y - 12 * A, vivo: true });
      pts.push({ x: m.x, y: m.y, vivo: true });
    });
    // depois da entrega, segue até o título do contato
    var ult = rota.marcos[rota.marcos.length - 1];
    var xContato = Math.max(4, (parseFloat(getComputedStyle(metodo).paddingLeft) || 20) - (pR.left - mR.left) + 4);
    var ultimo = caixas[caixas.length - 1].bottom;
    pts.push({ x: ult.x, y: ultimo + (fim - ultimo) * .45 });
    pts.push({ x: xContato, y: ultimo + (fim - ultimo) * .45 });
    pts.push({ x: xContato, y: fim });
    var d = caminho(pts, largo ? 34 : 22);
    var alto = Math.max(fim, percurso.clientHeight);
    svg.setAttribute("viewBox", "0 0 " + w + " " + alto);
    svg.style.height = alto + "px";
    trilha.setAttribute("d", d);
    vivo.setAttribute("d", d);
    rota.total = vivo.getTotalLength();
    rota.ys = [];
    var maxY = -1e9;
    for (var L = 0; L <= rota.total; L += rota.passo) {
      maxY = Math.max(maxY, vivo.getPointAtLength(L).y);
      rota.ys.push(maxY);
    }
    vivo.style.strokeDasharray = rota.total + " " + rota.total;
    lerRota(true);
  }

  function lerRota(imediato) {
    if (!rota.total) return;
    var linha = window.innerHeight * 0.64 - percurso.getBoundingClientRect().top;
    if (mqMov.matches) {
      rota.alvo = rota.total;
    } else {
      var i = 0, n = rota.ys.length;
      while (i < n && rota.ys[i] <= linha) i++;
      rota.alvo = Math.min(i * rota.passo, rota.total);
    }
    etapas.forEach(function (li, k) {
      li.classList.toggle("is-viva", mqMov.matches || linha >= rota.marcos[k].y - 8);
    });
    if (imediato === true) rota.atual = rota.alvo;
    if (!rota.raf) rota.raf = requestAnimationFrame(passoRota);
  }

  function passoRota() {
    rota.raf = 0;
    rota.atual += (rota.alvo - rota.atual) * 0.18;
    if (Math.abs(rota.alvo - rota.atual) < 0.5) rota.atual = rota.alvo;
    vivo.style.strokeDashoffset = (rota.total - rota.atual).toFixed(1);
    if (rota.atual !== rota.alvo) rota.raf = requestAnimationFrame(passoRota);
  }

  var esperaRota = 0;
  function remontarRota() { clearTimeout(esperaRota); esperaRota = setTimeout(montarRota, 120); }
  window.addEventListener("scroll", lerRota, { passive: true });
  window.addEventListener("resize", remontarRota);
  mqMov.addEventListener("change", montarRota);
  if (window.ResizeObserver) new ResizeObserver(remontarRota).observe(percurso);
  if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { medirCena(); montarRota(); });

  /* -------------------------------------------------------------- início */
  definirServico("");
  trocarVista(C.views[0].id, true); // abre o primeiro ponto, sem escolher o cuidado no contato
  medirCena();
  montarRota();
})();
