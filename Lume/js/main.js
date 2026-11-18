/* LUME · Marmoraria
   Comportamentos: menu, filtros do mural, comparação de até duas referências,
   mensagens de contato e janela do modo demonstração.
   Dados e textos de contato vêm de js/config.js. Sem JavaScript, o mural e o
   contato geral continuam legíveis (os controles de comparação ficam ocultos). */
(function () {
  "use strict";

  var C = window.LUME_CONFIG;
  if (!C) { console.warn("LUME: js/config.js não carregou."); return; }

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  var MAX = 2;
  var CHAVE = "lume-comparar-v1";
  var estado = { refs: [] };
  var vista = "todos";

  /* ---- Estado guardado só nesta aba ----------------------------------------- */
  function valida(k) {
    return typeof k === "string" && Object.prototype.hasOwnProperty.call(C.photos, k) && C.photos[k].grupo !== "capa";
  }
  try {
    var salvo = JSON.parse(sessionStorage.getItem(CHAVE) || "null");
    if (salvo && Array.isArray(salvo.refs)) {
      salvo.refs.forEach(function (k) { if (valida(k) && estado.refs.indexOf(k) === -1 && estado.refs.length < MAX) estado.refs.push(k); });
    }
  } catch (e) { /* sem armazenamento: o estado vive só na página */ }
  function persistir() { try { sessionStorage.setItem(CHAVE, JSON.stringify(estado)); } catch (e) { /* ignora */ } }

  /* ---- Fotos: CDN ou arquivos locais ------------------------------------------ */
  function urlFoto(k, w) {
    if (C.useLocalImages) {
      var ws = C.localWidths, alvo = ws[ws.length - 1];
      ws.forEach(function (x) { if (x >= w && x < alvo) alvo = x; });
      return "assets/img/" + k + "-" + alvo + ".webp";
    }
    return "https://images.unsplash.com/photo-" + C.photos[k].id + "?auto=format&fit=max&q=70&w=" + w;
  }
  function srcsetFoto(k) {
    return C.localWidths.map(function (w) { return urlFoto(k, w) + " " + w + "w"; }).join(", ");
  }
  if (C.useLocalImages) {
    $$("img[data-foto]").forEach(function (img) {
      var k = img.getAttribute("data-foto");
      if (!C.photos[k]) return;
      var orig = { s: img.getAttribute("src"), ss: img.getAttribute("srcset") };
      img.addEventListener("error", function () {
        console.warn("LUME: arquivo local ausente para a foto " + k + "; voltando para a CDN.");
        img.setAttribute("srcset", orig.ss); img.setAttribute("src", orig.s);
      }, { once: true });
      img.setAttribute("srcset", srcsetFoto(k));
      img.setAttribute("src", urlFoto(k, 800));
    });
  }

  /* ---- Textos configuráveis ----------------------------------------------------- */
  var faixa = $("[data-demo-bar]");
  if (faixa) {
    if (C.demo && C.demo.enabled) { var t = $("[data-demo-text]", faixa); if (t && C.demo.notice) t.textContent = C.demo.notice; }
    else faixa.hidden = true;
  }
  var cdisp = $('[data-cfg="display"]');
  if (cdisp && C.contact.display) cdisp.textContent = C.contact.display;
  var cend = $('[data-cfg="address"]');
  if (cend && Array.isArray(C.contact.address)) {
    cend.textContent = "";
    C.contact.address.forEach(function (l) { var s = document.createElement("span"); s.textContent = l; cend.appendChild(s); });
  }
  var chor = $('[data-cfg="hours"]');
  if (chor && Array.isArray(C.contact.hours)) {
    chor.textContent = "";
    C.contact.hours.forEach(function (p) {
      var d = document.createElement("div"), a = document.createElement("dt"), b = document.createElement("dd");
      a.textContent = p[0]; b.textContent = p[1]; d.appendChild(a); d.appendChild(b); chor.appendChild(d);
    });
  }
  var caviso = $("[data-contato-aviso]");

  /* ---- Anúncios para tecnologias assistivas ---------------------------------------- */
  var anuncio = $("[data-anuncio]");
  var tempoAnuncio;
  function anunciar(txt) {
    if (!anuncio) return;
    clearTimeout(tempoAnuncio);
    anuncio.textContent = "";
    tempoAnuncio = setTimeout(function () { anuncio.textContent = txt; }, 60);
  }

  /* ---- Menu (celular) ------------------------------------------------------------------ */
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

  /* ---- Mural: filtros ------------------------------------------------------------------- */
  var mural = $("[data-mural]");
  var tiles = $$("[data-tile]");
  var filtros = $$("[data-filtro]");
  var nomesAmb = C.environments;

  function filtrar(v, avisar) {
    vista = v;
    mural.setAttribute("data-vista", v);
    var visiveis = 0;
    tiles.forEach(function (t) {
      var ok = v === "todos" || t.getAttribute("data-ambiente") === v;
      t.hidden = !ok;
      if (ok) visiveis++;
    });
    filtros.forEach(function (b) { b.setAttribute("aria-pressed", b.getAttribute("data-filtro") === v ? "true" : "false"); });
    mural.classList.remove("anima");
    void mural.offsetWidth;
    mural.classList.add("anima");
    if (avisar) {
      anunciar((v === "todos" ? "Mostrando todas as " : "Mostrando as ") + visiveis + " referências" + (v === "todos" ? "." : " de " + nomesAmb[v] + ".") + " " + resumoSelecao());
    }
  }
  filtros.forEach(function (b) {
    b.addEventListener("click", function () { filtrar(b.getAttribute("data-filtro"), true); });
  });

  /* ---- Comparação ------------------------------------------------------------------------- */
  var estadoBox = $("[data-estado]"), estadoTxt = $("[data-estado-txt]");
  var guia = $("[data-guia]");
  var secaoComp = $("[data-comparar-secao]"), corpoComp = $("[data-corpo]"), vazioGeral = $("[data-vazio-geral]");
  var slots = $$("[data-slot]");
  var btnLimpar = $("[data-limpar]");
  var btnConversarRefs = $('[data-contato="refs"]');

  function nomeCurto(k) { return $('[data-tile][data-foto="' + k + '"] .tile__nome').textContent; }

  function resumoSelecao() {
    var n = estado.refs.length;
    if (n === 0) return "Nenhuma referência escolhida. Escolha até duas fotos para comparar.";
    if (n === 1) return "1 de 2 referências escolhidas: " + nomeCurto(estado.refs[0]) + ". Escolha mais uma para comparar.";
    return "2 de 2 referências escolhidas. Para trocar uma, remova uma delas primeiro.";
  }

  function alternar(k, botao) {
    var i = estado.refs.indexOf(k);
    if (i > -1) {
      estado.refs.splice(i, 1);
      persistir(); atualizar();
      anunciar("Referência removida: " + nomeCurto(k) + ". " + resumoSelecao());
      return;
    }
    if (estado.refs.length >= MAX) {
      estadoTxt.classList.add("is-limite");
      anunciar("Você já escolheu duas referências. Para trocar, remova uma delas no mural ou na comparação.");
      return;
    }
    estado.refs.push(k);
    persistir(); atualizar();
    anunciar("Referência " + estado.refs.length + " escolhida: " + nomeCurto(k) + ". " + resumoSelecao());
  }

  $$("[data-comparar]").forEach(function (b) {
    b.addEventListener("click", function () { alternar(b.getAttribute("data-comparar"), b); });
  });

  slots.forEach(function (slot, idx) {
    $("[data-remover]", slot).addEventListener("click", function () {
      var k = estado.refs[idx];
      estado.refs.splice(idx, 1);
      persistir(); atualizar();
      anunciar("Referência " + (idx + 1) + " removida: " + nomeCurto(k) + ". " + resumoSelecao());
      focarComparacao(idx);
    });
  });
  btnLimpar.addEventListener("click", function () {
    var tinha = estado.refs.length;
    estado.refs = [];
    persistir(); atualizar();
    anunciar(tinha === 2 ? "As duas referências foram removidas." : "A referência foi removida.");
    focarComparacao(0);
  });
  /* Depois de remover, o foco fica na comparação: no quadro que sobrou ou, sem escolhas, no aviso. */
  function focarComparacao(idx) {
    var n = estado.refs.length;
    var alvo = n === 0 ? vazioGeral : slots[Math.min(idx, n - 1)];
    try { alvo.focus({ preventScroll: true }); } catch (e) { alvo.focus(); }
  }

  function preencherSlot(slot, k) {
    var f = C.photos[k], img = $("[data-slot-img]", slot);
    img.setAttribute("srcset", srcsetFoto(k));
    img.setAttribute("sizes", "(max-width: 799px) 100vw, 48vw");
    img.setAttribute("src", urlFoto(k, 1200));
    img.setAttribute("alt", f.alt);
    img.setAttribute("width", f.width); img.setAttribute("height", f.height);
    $("[data-slot-nome]", slot).textContent = f.nome;
    $("[data-slot-ap]", slot).textContent = f.aparencia;
    $("[data-slot-co]", slot).textContent = f.composicao;
    $("[data-slot-pl]", slot).textContent = f.aplicacao;
    var cred = $("[data-slot-cred]", slot);
    cred.textContent = f.ambiente + ". Foto de " + f.autor + ", via Unsplash. Referência ilustrativa.";
  }

  var ultimoN = -1;
  function atualizar() {
    var n = estado.refs.length;
    tiles.forEach(function (t) {
      var k = t.getAttribute("data-foto"), i = estado.refs.indexOf(k), sel = i > -1;
      t.classList.toggle("is-escolhida", sel);
      var b = $("[data-comparar]", t);
      $(".btn-comp__txt", b).textContent = sel ? "Remover da comparação" : "Comparar referência";
      var ico = $(".btn-comp__ico", b);
      ico.innerHTML = sel
        ? '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>'
        : '<svg class="ico" viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 5v14M5 12h14"/></svg>';
      var selo = $("[data-selo]", t);
      selo.hidden = !sel;
      if (sel) selo.textContent = "Referência " + (i + 1);
    });

    estadoBox.hidden = false;
    estadoTxt.classList.remove("is-limite");
    estadoTxt.textContent = resumoSelecao();

    slots.forEach(function (slot, idx) {
      var k = estado.refs[idx];
      var vazio = $("[data-vazio]", slot), cheio = $("[data-cheio]", slot);
      if (k) { preencherSlot(slot, k); vazio.hidden = true; cheio.hidden = false; }
      else { vazio.hidden = false; cheio.hidden = true; }
    });

    guia.textContent = n === 2 ? "As duas referências estão lado a lado. Para trocar uma, use “Remover” e escolha outra no mural." : "";
    secaoComp.setAttribute("data-n", n);
    if (n !== ultimoN) {
      corpoComp.classList.remove("anima");
      void corpoComp.offsetWidth;
      corpoComp.classList.add("anima");
      ultimoN = n;
    }
    btnLimpar.disabled = n === 0;
    btnLimpar.textContent = n === 2 ? "Limpar as duas" : "Limpar escolha";
    btnConversarRefs.disabled = n === 0;
    btnConversarRefs.textContent = n === 1 ? "Conversar sobre esta referência" : "Conversar sobre estas referências";
  }

  /* ---- Contato -------------------------------------------------------------------------------- */
  function saudacao() { return C.contact.greeting + " "; }
  function mensagemGeral() { return saudacao() + C.contact.general; }
  function mensagemPeca(k) { return saudacao() + C.pieces[k].mensagem; }
  function mensagemRefs() {
    var linhas = [saudacao() + C.contact.general, "", "Escolhi " + (estado.refs.length === 1 ? "esta referência" : "estas referências") + " no site:"];
    estado.refs.forEach(function (k, i) { linhas.push((i + 1) + ") " + C.photos[k].ambiente + ": " + C.photos[k].nome); });
    linhas.push("", "As fotos são ilustrativas. Quero conversar sobre aparência e aplicação parecidas.");
    return linhas.join("\n");
  }
  function numero() { return String((C.contact && C.contact.whatsapp) || "").replace(/\D/g, ""); }

  var dlg = $("[data-demo]"), dlgMsg = $("[data-demo-msg]"), dlgAviso = $("[data-demo-aviso]"), dlgStatus = $("[data-demo-status]");
  var abridor = null;

  function abrirContato(msg, origem) {
    var real = !(C.demo && C.demo.enabled) && numero().length >= 12;
    if (real) {
      window.open("https://wa.me/" + numero() + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
      anunciar("Conversa aberta em outra aba.");
      return;
    }
    abridor = origem || null;
    dlgMsg.value = msg;
    dlgAviso.textContent = (C.demo && C.demo.enabled) ? C.demo.contactNotice : "O número de WhatsApp ainda não foi configurado em js/config.js. Nada foi enviado.";
    dlgStatus.textContent = "";
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    $("[data-demo-copiar]").focus();
  }
  $$("[data-contato]").forEach(function (a) {
    a.addEventListener("click", function (e) {
      var tipo = a.getAttribute("data-contato");
      if (a.disabled) return;
      e.preventDefault();
      var msg = tipo === "peca" ? mensagemPeca(a.getAttribute("data-peca")) : tipo === "refs" ? mensagemRefs() : mensagemGeral();
      abrirContato(msg, a);
    });
  });
  function copiar(txt) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(txt);
    return new Promise(function (ok, erro) {
      try { dlgMsg.focus(); dlgMsg.select(); document.execCommand("copy") ? ok() : erro(); dlgMsg.setSelectionRange(0, 0); }
      catch (e) { erro(e); }
    });
  }
  $("[data-demo-copiar]").addEventListener("click", function () {
    copiar(dlgMsg.value)
      .then(function () { dlgStatus.textContent = "Mensagem copiada. Cole na conversa quando quiser."; })
      .catch(function () { dlgStatus.textContent = "Não foi possível copiar sozinho. Selecione o texto da mensagem e copie."; });
  });
  $("[data-demo-fechar]").addEventListener("click", function () { dlg.close(); });
  dlg.addEventListener("close", function () { if (abridor && document.contains(abridor)) abridor.focus(); });
  dlg.addEventListener("click", function (e) { if (e.target === dlg) dlg.close(); });

  if (C.demo && !C.demo.enabled && caviso) caviso.hidden = true;
  if (caviso && C.demo && C.demo.enabled && C.demo.contactNotice) caviso.textContent = C.demo.contactNotice;

  /* ---- Início ---------------------------------------------------------------------------------- */
  filtrar("todos", false);
  atualizar();
})();
