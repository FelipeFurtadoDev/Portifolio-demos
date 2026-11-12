/* LASTRO · vitrine de ambientes e acabamentos
   Comportamentos: painéis de ambientes, galeria, referências guardadas,
   mensagem pronta e menu. Dados e textos de contato vêm de js/config.js. */
(function () {
  "use strict";

  var C = window.LASTRO_CONFIG;
  if (!C) { console.warn("LASTRO: js/config.js não carregou."); return; }

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  function h(tag, attrs, children) {
    var el = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      if (k === "text") el.textContent = attrs[k];
      else if (attrs[k] !== null && attrs[k] !== undefined && attrs[k] !== false) el.setAttribute(k, attrs[k] === true ? "" : attrs[k]);
    });
    (children || []).forEach(function (c) { el.appendChild(c); });
    return el;
  }
  function svgIcon(d) {
    var s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    s.setAttribute("viewBox", "0 0 24 24"); s.setAttribute("aria-hidden", "true"); s.setAttribute("focusable", "false");
    var p = document.createElementNS("http://www.w3.org/2000/svg", "path"); p.setAttribute("d", d); s.appendChild(p);
    return s;
  }

  /* ---- Estado: referências e peças (guardado só nesta aba) ----------------- */
  var CHAVE = "lastro-v3", CHAVE_ANTIGA = "lastro-v2";
  var estado = { refs: [], pecas: [], extras: [] };
  function referenciavel(k) {
    return typeof k === "string" && Object.prototype.hasOwnProperty.call(C.fotos, k) && C.fotos[k].guardavel !== false;
  }
  function sanear(lista, valida) {
    var vistos = [];
    (Array.isArray(lista) ? lista : []).forEach(function (k) { if (valida(k) && vistos.indexOf(k) === -1) vistos.push(k); });
    return vistos;
  }
  try {
    /* Lê a sessão atual e, se não houver, a da versão anterior. Referências que
       foram removidas ou trocadas deixam de existir em C.fotos e são descartadas
       em silêncio; chaves de fotos substituídas nunca foram reutilizadas. */
    var salvo = JSON.parse(sessionStorage.getItem(CHAVE) || sessionStorage.getItem(CHAVE_ANTIGA) || "null");
    if (salvo && typeof salvo === "object") {
      estado.refs = sanear(salvo.refs, referenciavel);
      estado.pecas = sanear(salvo.pecas, function (k) { return typeof k === "string" && Object.prototype.hasOwnProperty.call(C.pecas, k); });
      estado.extras = sanear(salvo.extras, function (k) { return k === "material"; });
    }
  } catch (e) { /* sem armazenamento: o estado vive só na página */ }
  function persistir() { try { sessionStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* ignora */ } }

  /* ---- Fotos: CDN ou arquivos locais ---------------------------------------- */
  function larguras(k) {
    var g = C.fotos[k] && C.fotos[k].grupo;
    return k === "hero" ? C.localWidths.hero : g === "detalhes" ? C.localWidths.detalhes : C.localWidths.padrao;
  }
  function urlFoto(k, w) {
    if (C.useLocalImages) {
      var ws = larguras(k), alvo = ws[ws.length - 1];
      ws.forEach(function (x) { if (x >= w && x < alvo) alvo = x; });
      return "assets/img/" + k + "-" + alvo + ".webp";
    }
    return "https://images.unsplash.com/photo-" + C.fotos[k].id + "?auto=format&fit=max&q=70&w=" + w;
  }
  if (C.useLocalImages) {
    $$("img[data-foto]").forEach(function (img) {
      var k = img.getAttribute("data-foto"), orig = { s: img.getAttribute("src"), ss: img.getAttribute("srcset") };
      img.addEventListener("error", function () {
        console.warn("LASTRO: arquivo local ausente para a foto " + k + "; voltando para a CDN.");
        img.removeAttribute("data-local");
        img.setAttribute("srcset", orig.ss); img.setAttribute("src", orig.s);
      }, { once: true });
      img.setAttribute("srcset", larguras(k).map(function (w) { return "assets/img/" + k + "-" + w + ".webp " + w + "w"; }).join(", "));
      img.setAttribute("src", urlFoto(k, 960));
    });
  }

  /* ---- Faixa de demonstração ---------------------------------------------- */
  var faixa = $("[data-demo-bar]");
  if (faixa) {
    if (C.demo && C.demo.enabled) { var t = $("[data-demo-text]", faixa); if (t) t.textContent = C.demo.notice; }
    else faixa.hidden = true;
  }

  /* ---- Menu (mobile) -------------------------------------------------------- */
  var menuBtn = $(".menu-btn"), nav = $("#menu");
  function menu(abrir) {
    nav.classList.toggle("is-aberto", abrir);
    menuBtn.setAttribute("aria-expanded", abrir ? "true" : "false");
  }
  if (menuBtn && nav) {
    menuBtn.addEventListener("click", function () { menu(menuBtn.getAttribute("aria-expanded") !== "true"); });
    $$("a", nav).forEach(function (a) { a.addEventListener("click", function () { menu(false); }); });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && menuBtn.getAttribute("aria-expanded") === "true") { menu(false); menuBtn.focus(); }
    });
  }

  /* ---- Painéis de ambientes ------------------------------------------------- */
  var paineis = $$("[data-amb]");
  function abrirPainel(id) {
    paineis.forEach(function (p) {
      var on = p.getAttribute("data-amb") === id;
      p.classList.toggle("is-aberto", on);
      $(".painel__aba", p).setAttribute("aria-expanded", on ? "true" : "false");
    });
  }
  paineis.forEach(function (p) {
    $(".painel__aba", p).addEventListener("click", function () { abrirPainel(p.getAttribute("data-amb")); });
  });
  $$("[data-abrir]").forEach(function (a) {
    a.addEventListener("click", function () { abrirPainel(a.getAttribute("data-abrir")); });
  });

  /* ---- Referências ---------------------------------------------------------- */
  function temRef(k) { return estado.refs.indexOf(k) !== -1; }
  function alternarRef(k) {
    var i = estado.refs.indexOf(k);
    if (i === -1) estado.refs.push(k); else estado.refs.splice(i, 1);
    persistir(); atualizar();
  }
  $$("[data-ref]").forEach(function (b) {
    b.addEventListener("click", function () { alternarRef(b.getAttribute("data-ref")); });
  });

  var bandeja = $("[data-bandeja]"), vazio = $("[data-bandeja-vazio]");
  function desenharBandeja() {
    bandeja.textContent = "";
    estado.refs.forEach(function (k) {
      var f = C.fotos[k];
      var rm = h("button", { type: "button", class: "bandeja__rm", "aria-label": "Remover referência: " + f.titulo }, [
        svgIcon("M5 5l14 14M19 5L5 19")
      ]);
      rm.addEventListener("click", function () { alternarRef(k); var prox = $("button", bandeja); (prox || $(".chip")).focus(); });
      bandeja.appendChild(h("li", {}, [
        h("img", { src: urlFoto(k, 160), alt: "", width: 54, height: 54, loading: "lazy" }),
        h("span", { class: "bandeja__nome", text: C.grupos[f.grupo] + ": " + f.titulo }),
        rm
      ]));
    });
    vazio.hidden = estado.refs.length > 0;
    bandeja.hidden = estado.refs.length === 0;
  }

  /* ---- Peças de interesse --------------------------------------------------- */
  function temPeca(k) { return estado.pecas.indexOf(k) !== -1; }
  $$("[data-peca]").forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-peca"), i = estado.pecas.indexOf(k);
      if (i === -1) estado.pecas.push(k); else estado.pecas.splice(i, 1);
      persistir(); atualizar();
    });
  });
  $$("[data-peca-ir]").forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-peca-ir");
      if (!temPeca(k)) estado.pecas.push(k);
      persistir(); atualizar();
      aviso("“" + C.pecas[k] + "” entrou nas peças de interesse.");
      var alvo = $("#conversa"); if (alvo) alvo.scrollIntoView();
    });
  });

  /* ---- Extras opcionais: material para enviar e medidas ----------------------- */
  function temExtra(k) { return estado.extras.indexOf(k) !== -1; }
  $$("[data-extra]").forEach(function (b) {
    b.addEventListener("click", function () {
      var k = b.getAttribute("data-extra"), i = estado.extras.indexOf(k);
      if (i === -1) estado.extras.push(k); else estado.extras.splice(i, 1);
      persistir(); atualizar();
    });
  });

  /* ---- Mensagem pronta ------------------------------------------------------- */
  var campoNome = $("#f-nome"), campoLocal = $("#f-local"), campoObs = $("#f-obs"), campoMsg = $("#f-msg");
  var campoMed = $("#f-med"), campoUnid = $("#f-unid");
  var msgAviso = $("[data-aviso]");
  function aviso(txt) { msgAviso.textContent = txt; }

  function montarMensagem() {
    var nome = campoNome.value.trim(), local = campoLocal.value.trim(), obs = campoObs.value.trim();
    var linhas = [];
    var abre = C.contact.greeting;
    if (nome) abre += " Meu nome é " + nome + (local ? ", sou de " + local : "") + ".";
    else if (local) abre += " Sou de " + local + ".";
    linhas.push(abre);
    linhas.push("Quero conversar sobre um projeto em pedra natural sob medida para a minha casa.");
    if (estado.pecas.length) linhas.push("Peças de interesse: " + estado.pecas.map(function (k) { return C.pecas[k]; }).join(", ") + ".");
    if (temExtra("material")) linhas.push("Tenho planta ou fotos do ambiente para enviar na conversa.");
    if (estado.refs.length) {
      linhas.push("Referências guardadas (fotos de inspiração do site):");
      estado.refs.forEach(function (k) { linhas.push("- " + C.grupos[C.fotos[k].grupo] + ": " + C.fotos[k].titulo); });
    }
    var med = campoMed.value.trim();
    if (med) linhas.push("Medidas aproximadas (em " + (campoUnid.value === "m" ? "metros" : "centímetros") + "): " + med + ".");
    if (obs) linhas.push("Observações: " + obs);
    linhas.push("Pode me orientar sobre os próximos passos?");
    return linhas.join("\n");
  }
  [campoNome, campoLocal, campoObs, campoMed].forEach(function (c) { c.addEventListener("input", function () { campoMsg.value = montarMensagem(); }); });
  campoUnid.addEventListener("change", function () { campoMsg.value = montarMensagem(); });

  function copiar(txt) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(txt);
    return new Promise(function (ok, erro) {
      try { campoMsg.focus(); campoMsg.select(); document.execCommand("copy") ? ok() : erro(); campoMsg.setSelectionRange(0, 0); }
      catch (e) { erro(e); }
    });
  }
  $("[data-copiar]").addEventListener("click", function () {
    copiar(campoMsg.value).then(function () { aviso("Mensagem copiada. Cole na conversa quando quiser."); })
      .catch(function () { aviso("Não foi possível copiar sozinho. Selecione o texto da mensagem e copie."); });
  });
  $("[data-whats]").addEventListener("click", function () {
    var num = String((C.contact && C.contact.whatsapp) || "").replace(/\D/g, "");
    if (C.demo && C.demo.enabled) { aviso(C.demo.contactNotice); return; }
    if (num.length < 12) { aviso("O número de WhatsApp ainda não foi configurado em js/config.js."); return; }
    window.open("https://wa.me/" + num + "?text=" + encodeURIComponent(campoMsg.value), "_blank", "noopener");
    aviso("Conversa aberta em outra aba.");
  });
  $(".conversa__form").addEventListener("submit", function (e) { e.preventDefault(); });

  /* ---- Galeria (lightbox) ----------------------------------------------------- */
  var lb = $("[data-lb]");
  var lbImg = $("[data-lb-img]"), lbTit = $("[data-lb-titulo]"), lbAut = $("[data-lb-autor]"), lbCont = $("[data-lb-cont]"), lbRef = $("[data-lb-ref]");
  var galeria = { lista: [], i: 0 };
  var rolagemAntes = "", abridor = null;

  function mostrar() {
    var k = galeria.lista[galeria.i], f = C.fotos[k];
    lbImg.src = urlFoto(k, 1600); lbImg.alt = f.alt;
    lbTit.textContent = f.titulo;
    lbAut.textContent = "Foto de ";
    lbAut.appendChild(h("a", { href: f.url, target: "_blank", rel: "noopener", text: f.autor }));
    lbAut.appendChild(document.createTextNode(", via Unsplash. Imagem ilustrativa."));
    lbCont.textContent = "Foto " + (galeria.i + 1) + " de " + galeria.lista.length + " · " + C.grupos[f.grupo];
    lbRef.setAttribute("aria-pressed", temRef(k) ? "true" : "false");
    lbRef.setAttribute("aria-label", "Guardar referência: " + f.titulo);
    [1, -1].forEach(function (d) {
      var vizinho = galeria.lista[(galeria.i + d + galeria.lista.length) % galeria.lista.length];
      new Image().src = urlFoto(vizinho, 1600);
    });
    var uma = galeria.lista.length < 2;
    $("[data-lb-ant]").hidden = uma; $("[data-lb-prox]").hidden = uma;
  }
  function abrirGaleria(grupo, chave, origem) {
    abridor = origem || null;
    galeria.lista = Object.keys(C.fotos).filter(function (k) { return C.fotos[k].grupo === grupo && C.fotos[k].guardavel !== false; });
    galeria.i = Math.max(0, galeria.lista.indexOf(chave));
    mostrar();
    rolagemAntes = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    if (typeof lb.showModal === "function") lb.showModal(); else lb.setAttribute("open", "");
  }
  function passar(d) { galeria.i = (galeria.i + d + galeria.lista.length) % galeria.lista.length; mostrar(); }
  $$("[data-galeria]").forEach(function (b) {
    b.addEventListener("click", function () {
      var g = b.getAttribute("data-galeria"), k = b.getAttribute("data-foto-abrir");
      if (!k) { var p = b.closest("[data-amb]"); var im = p && $("img[data-foto]", p); k = im && im.getAttribute("data-foto"); }
      abrirGaleria(g, k, b);
    });
  });
  $("[data-lb-ant]").addEventListener("click", function () { passar(-1); });
  $("[data-lb-prox]").addEventListener("click", function () { passar(1); });
  $("[data-lb-fechar]").addEventListener("click", function () { lb.close(); });
  lbRef.addEventListener("click", function () { alternarRef(galeria.lista[galeria.i]); });
  lb.addEventListener("close", function () {
    document.documentElement.style.overflow = rolagemAntes;
    if (abridor && document.contains(abridor)) abridor.focus();
  });
  lb.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { passar(-1); e.preventDefault(); }
    else if (e.key === "ArrowRight") { passar(1); e.preventDefault(); }
  });
  $(".lb__palco").addEventListener("click", function (e) { if (e.target === e.currentTarget) lb.close(); });
  lbImg.setAttribute("draggable", "false");
  var toqueX = null;
  lbImg.addEventListener("pointerdown", function (e) { toqueX = e.clientX; });
  lbImg.addEventListener("pointerup", function (e) {
    if (toqueX === null) return;
    var dx = e.clientX - toqueX; toqueX = null;
    if (Math.abs(dx) > 50) passar(dx < 0 ? 1 : -1);
  });

  /* ---- Atualiza tudo que depende do estado ------------------------------------ */
  function atualizar() {
    var n = estado.refs.length;
    $$("[data-ref]").forEach(function (b) { b.setAttribute("aria-pressed", temRef(b.getAttribute("data-ref")) ? "true" : "false"); });
    $$("[data-peca]").forEach(function (b) { b.setAttribute("aria-pressed", temPeca(b.getAttribute("data-peca")) ? "true" : "false"); });
    $$("[data-extra]").forEach(function (b) { b.setAttribute("aria-pressed", temExtra(b.getAttribute("data-extra")) ? "true" : "false"); });
    $$("[data-ref-count]").forEach(function (el) { el.textContent = n; });
    var topoRef = $(".topo__ref");
    topoRef.classList.toggle("tem", n > 0);
    topoRef.setAttribute("aria-label", "Referências guardadas: " + n + ". Ver na conversa");
    $("[data-ref-count-text]").textContent = n ? "(" + n + (n === 1 ? " guardada)" : " guardadas)") : "(nenhuma ainda)";
    desenharBandeja();
    if (lb.open) lbRef.setAttribute("aria-pressed", temRef(galeria.lista[galeria.i]) ? "true" : "false");
    campoMsg.value = montarMensagem();
  }
  atualizar();
})();
