/* ==========================================================================
   AVELA — comportamento da página
   1. Utilidades de imagem (CDN ou arquivos locais, com retorno automático)
   2. Dados gerais (aviso, local, informações práticas, créditos)
   3. A carta: lookbook com trilho de coleções (Tabs APG) e palco estável
   4. A consulta: mensagem montada pela peça vista, WhatsApp ou cópia
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.AVELA_CONFIG;
  if (!cfg) {
    // Sem config, a página continua com a versão estática do HTML.
    console.warn("AVELA: js/config.js não foi carregado; exibindo a versão estática.");
    return;
  }

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");
  var telaEstreita = window.matchMedia("(max-width: 899px)");
  var SVG_NS = "http://www.w3.org/2000/svg";

  /* ---------------------------------------------------------------------
     1. Imagens
     --------------------------------------------------------------------- */
  var imgCfg = cfg.images || {};

  function urlRemota(img, w) {
    return (imgCfg.remoteBase || "https://images.unsplash.com/") + img.id + "?auto=format&fit=max&q=72&w=" + w;
  }

  function usaLocal(img) {
    return !!imgCfg.useLocalImages && !!img.file && !img._remota;
  }

  function url(img, w) {
    return usaLocal(img) ? (imgCfg.localBase || "assets/img/") + img.file + "-" + w + ".webp" : urlRemota(img, w);
  }

  function srcset(img, larguras) {
    return larguras.map(function (w) { return url(img, w) + " " + w + "w"; }).join(", ");
  }

  function posicao(img) {
    return (telaEstreita.matches && img.posMobile) ? img.posMobile : (img.pos || "50% 50%");
  }

  /* Aplica a foto num <img>. Se o arquivo local faltar, volta para a CDN. */
  function aplicarFoto(el, img, larguras, tamanhos) {
    el.sizes = tamanhos;
    el.srcset = srcset(img, larguras);
    el.src = url(img, larguras[Math.min(1, larguras.length - 1)]);
    if (usaLocal(img)) {
      el.addEventListener("error", function voltar() {
        el.removeEventListener("error", voltar);
        console.warn("AVELA: arquivo local ausente para \"" + img.file + "\"; usando a versão remota.");
        img._remota = true;
        aplicarFoto(el, img, larguras, tamanhos);
      });
    }
  }

  /* Decodifica antes de exibir: evita caixa vazia e salto na troca. */
  function prepararFoto(img, larguras, tamanhos) {
    var tmp = new Image();
    tmp.sizes = tamanhos;
    tmp.srcset = srcset(img, larguras);
    tmp.src = url(img, larguras[Math.min(1, larguras.length - 1)]);
    var decodificar = tmp.decode ? tmp.decode() : new Promise(function (ok, erro) { tmp.onload = ok; tmp.onerror = erro; });
    return decodificar.catch(function () {
      if (usaLocal(img)) {
        img._remota = true;
        return prepararFoto(img, larguras, tamanhos);
      }
      // Remota com falha: segue mesmo assim (o <img> mostra o alt).
    });
  }

  // Fotos fixas (abertura e ateliê) só mudam quando os arquivos locais estão ativos.
  if (imgCfg.useLocalImages) {
    var heroEl = $("[data-hero]");
    if (heroEl && cfg.hero) aplicarFoto(heroEl, cfg.hero, imgCfg.heroWidths || [800, 1400, 2200], "100vw");
    var principal = $('[data-process="main"]');
    if (principal && cfg.process) aplicarFoto(principal, cfg.process.main, (imgCfg.widths || [480, 960, 1440]).slice(1), "(min-width: 1024px) 58vw, 100vw");
    var detalhe = $('[data-process="detail"]');
    if (detalhe && cfg.process) aplicarFoto(detalhe, cfg.process.detail, (imgCfg.widths || [480, 960, 1440]).slice(0, 2), "(min-width: 1024px) 22vw, 50vw");
  }

  /* ---------------------------------------------------------------------
     2. Dados gerais
     --------------------------------------------------------------------- */
  var demoAtivo = !!(cfg.demo && cfg.demo.enabled);

  $$("[data-demo-notice]").forEach(function (el) {
    if (demoAtivo && cfg.demo.notice) el.textContent = cfg.demo.notice;
    el.hidden = !demoAtivo;
  });

  var localEl = $("[data-location]");
  if (localEl && cfg.location) localEl.textContent = cfg.location;

  var praticas = $("[data-practical]");
  if (praticas && Array.isArray(cfg.practical)) {
    praticas.textContent = "";
    cfg.practical.forEach(function (item) {
      var linha = document.createElement("div");
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = item.term;
      dd.textContent = item.text;
      linha.append(dt, dd);
      praticas.appendChild(linha);
    });
  }

  // Créditos das fotografias
  var creditos = $("[data-credits]");
  if (creditos) {
    var fotos = [];
    if (cfg.hero) fotos.push(cfg.hero);
    (cfg.collections || []).forEach(function (c) { c.pieces.forEach(function (p) { fotos.push(p.image); }); });
    if (cfg.process) fotos.push(cfg.process.main, cfg.process.detail);

    creditos.textContent = "Fotografias ilustrativas da Unsplash, sob a Licença Unsplash: ";
    fotos.forEach(function (f, i) {
      var a = document.createElement("a");
      a.href = f.page;
      a.textContent = f.author;
      a.rel = "noopener";
      a.target = "_blank";
      creditos.appendChild(a);
      creditos.appendChild(document.createTextNode(i < fotos.length - 1 ? ", " : ". "));
    });
    creditos.appendChild(document.createTextNode("Fontes: Gloock e Commissioner (SIL Open Font License)."));
  }

  var insta = $("[data-instagram]");
  if (insta && cfg.contact && cfg.contact.instagram) {
    var ia = document.createElement("a");
    ia.href = "https://www.instagram.com/" + encodeURIComponent(cfg.contact.instagram) + "/";
    ia.rel = "noopener";
    ia.target = "_blank";
    ia.textContent = "Instagram: @" + cfg.contact.instagram;
    insta.appendChild(ia);
    insta.hidden = false;
  }

  /* ---------------------------------------------------------------------
     3. A carta (Componente 04 — lookbook interativo)
     --------------------------------------------------------------------- */
  var colecoes = cfg.collections || [];
  var carta = $("[data-carta]");
  var estado = { colecao: 0, pecas: colecoes.map(function () { return 0; }), escolhida: false };
  var LARG_PALCO = imgCfg.widths || [480, 960, 1440];
  var TAM_PALCO = "(min-width: 900px) 56vw, (min-width: 600px) 92vw, 100vw";

  var aoMudarPeca = function () {}; // definido na seção 4

  function marcadorSVG() {
    var svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("class", "fio fio--marcador");
    svg.setAttribute("viewBox", "0 0 200 24");
    svg.setAttribute("preserveAspectRatio", "none");
    svg.setAttribute("aria-hidden", "true");
    svg.setAttribute("focusable", "false");
    var path = document.createElementNS(SVG_NS, "path");
    path.setAttribute("pathLength", "1");
    path.setAttribute("d", "M2 15 C 40 6, 82 4, 114 12 C 134 17, 130 23, 120 20 C 110 17, 132 6, 162 8 C 180 9, 190 12, 198 9");
    svg.appendChild(path);
    return svg;
  }

  if (carta && colecoes.length) {
    var trilho = $("[data-carta-trilho]", carta);
    var painel = $("[data-carta-painel]", carta);
    var camadas = $$("[data-carta-foto]", carta);
    var ficha = $("[data-carta-ficha]", carta);
    var fColecao = $("[data-ficha-colecao]", carta);
    var fPeca = $("[data-ficha-peca]", carta);
    var fDesc = $("[data-ficha-descricao]", carta);
    var fPecas = $("[data-ficha-pecas]", carta);
    var fConversa = $("[data-ficha-conversa]", carta);
    var fConsultar = $("[data-ficha-consultar]", carta);
    var frente = 0;
    var ficha_token = 0;
    var foto_token = 0;
    var fotoAtual = null;

    // Abas
    var abas = colecoes.map(function (c, i) {
      var b = document.createElement("button");
      b.type = "button";
      b.className = "carta__aba";
      b.id = "aba-" + c.id;
      b.setAttribute("role", "tab");
      b.setAttribute("aria-controls", "carta-painel");
      var nome = document.createElement("span");
      nome.className = "carta__aba-nome";
      nome.textContent = c.name;
      nome.appendChild(marcadorSVG());
      b.appendChild(nome);

      b.addEventListener("click", function () { selecionarColecao(i, true); });
      // Pré-carrega a foto da coleção ao apontar ou focar
      b.addEventListener("pointerenter", function () { preCarregar(i); }, { passive: true });
      b.addEventListener("focus", function () { preCarregar(i); });
      trilho.appendChild(b);
      return b;
    });

    trilho.addEventListener("keydown", function (e) {
      var atual = abas.indexOf(document.activeElement);
      if (atual < 0) return;
      var alvo = null;
      if (e.key === "ArrowRight" || e.key === "ArrowDown") alvo = (atual + 1) % abas.length;
      else if (e.key === "ArrowLeft" || e.key === "ArrowUp") alvo = (atual - 1 + abas.length) % abas.length;
      else if (e.key === "Home") alvo = 0;
      else if (e.key === "End") alvo = abas.length - 1;
      if (alvo === null) return;
      e.preventDefault();
      abas[alvo].focus();
      selecionarColecao(alvo, true);
    });

    var preCarregadas = {};
    function preCarregar(i) {
      var c = colecoes[i];
      var img = c.pieces[estado.pecas[i]].image;
      if (preCarregadas[img.id]) return;
      preCarregadas[img.id] = true;
      prepararFoto(img, LARG_PALCO, TAM_PALCO);
    }

    function trocarFoto(img, imediato) {
      var token = ++foto_token;
      fotoAtual = img;
      var tras = camadas[1 - frente];
      var vis = camadas[frente];

      if (imediato) {
        aplicarFoto(vis, img, LARG_PALCO, TAM_PALCO);
        vis.style.objectPosition = posicao(img);
        vis.alt = img.alt;
        vis.removeAttribute("aria-hidden");
        return;
      }

      prepararFoto(img, LARG_PALCO, TAM_PALCO).then(function () {
        if (token !== foto_token) return; // uma escolha mais nova já assumiu
        aplicarFoto(tras, img, LARG_PALCO, TAM_PALCO);
        tras.style.objectPosition = posicao(img);
        var pronto = tras.decode ? tras.decode().catch(function () {}) : Promise.resolve();
        return pronto.then(function () {
          if (token !== foto_token) return;
          tras.alt = img.alt;
          tras.removeAttribute("aria-hidden");
          tras.classList.add("is-visivel");
          vis.classList.remove("is-visivel");
          vis.alt = "";
          vis.setAttribute("aria-hidden", "true");
          frente = 1 - frente;
        });
      });
    }

    telaEstreita.addEventListener("change", function () {
      if (fotoAtual) camadas[frente].style.objectPosition = posicao(fotoAtual);
    });

    function montarMiniaturas(ci) {
      var c = colecoes[ci];
      fPecas.textContent = "";
      fPecas.setAttribute("aria-label", "Peças da coleção " + c.name);
      c.pieces.forEach(function (p, pi) {
        var b = document.createElement("button");
        b.type = "button";
        b.className = "ficha__miniatura";
        var im = document.createElement("img");
        im.alt = "";
        im.width = 240;
        im.height = 240;
        im.loading = "lazy";
        im.decoding = "async";
        aplicarFoto(im, p.image, [LARG_PALCO[0]], "120px");
        im.style.objectPosition = p.image.pos || "50% 50%";
        var nome = document.createElement("span");
        nome.textContent = p.name;
        b.append(im, nome);
        b.addEventListener("click", function () { selecionarPeca(pi, true); });
        b.addEventListener("pointerenter", function () { prepararFoto(p.image, LARG_PALCO, TAM_PALCO); }, { passive: true });
        fPecas.appendChild(b);
      });
    }

    function atualizarFicha(ci, pi, animar) {
      var c = colecoes[ci];
      var p = c.pieces[pi];
      fColecao.textContent = c.name + ". " + c.summary;
      fPeca.textContent = p.name;
      fDesc.textContent = p.desc;
      fConversa.textContent = "";
      (c.talk || []).forEach(function (t) {
        var li = document.createElement("li");
        li.textContent = t;
        fConversa.appendChild(li);
      });
      $$(".ficha__miniatura", fPecas).forEach(function (b, i) {
        b.setAttribute("aria-pressed", i === pi ? "true" : "false");
      });
      fConsultar.setAttribute("aria-label", "Consultar esta peça: " + p.name);

      if (animar) {
        ficha.classList.remove("is-trocando");
        var t = ++ficha_token;
        requestAnimationFrame(function () { if (t === ficha_token) ficha.classList.add("is-trocando"); });
      }
    }

    function selecionarColecao(ci, doUsuario) {
      var mudou = ci !== estado.colecao || !abas[ci].getAttribute("aria-selected");
      estado.colecao = ci;
      abas.forEach(function (b, i) {
        var ativa = i === ci;
        b.setAttribute("aria-selected", ativa ? "true" : "false");
        b.tabIndex = ativa ? 0 : -1;
      });
      painel.setAttribute("aria-labelledby", abas[ci].id);
      if (mudou || !fPecas.children.length) montarMiniaturas(ci);
      selecionarPeca(estado.pecas[ci], doUsuario, !doUsuario);
    }

    function selecionarPeca(pi, doUsuario, inicial) {
      var ci = estado.colecao;
      estado.pecas[ci] = pi;
      var p = colecoes[ci].pieces[pi];
      atualizarFicha(ci, pi, !inicial);
      trocarFoto(p.image, !!inicial);
      if (doUsuario) {
        estado.escolhida = true;
        aoMudarPeca();
      }
    }

    fConsultar.addEventListener("click", function (e) {
      var alvo = $("#consulta");
      if (!alvo) return;
      e.preventDefault();
      estado.escolhida = true;
      aoMudarPeca();
      alvo.scrollIntoView({ behavior: reduzMovimento.matches ? "auto" : "smooth", block: "start" });
      alvo.focus({ preventScroll: true });
      if (history.replaceState) history.replaceState(null, "", "#consulta");
    });

    selecionarColecao(0, false);
    carta.hidden = false;

    // Depois do carregamento, pré-carrega as fotos principais das demais coleções.
    var ocioso = window.requestIdleCallback || function (fn) { return setTimeout(fn, 1200); };
    window.addEventListener("load", function () {
      ocioso(function () { colecoes.forEach(function (c, i) { if (i) preCarregar(i); }); });
    });
  }

  /* ---------------------------------------------------------------------
     4. A consulta (conversa direta, sem formulário extenso)
     --------------------------------------------------------------------- */
  var form = $("[data-consulta-form]");
  if (!form) return;

  var campoData = $("[data-consulta-data]");
  var campoMsg = $("[data-consulta-mensagem]");
  var btnPrincipal = $("[data-consulta-principal]");
  var btnCopiar = $("[data-consulta-copiar]");
  var btnRestaurar = $("[data-consulta-restaurar]");
  var status = $("[data-consulta-status]");
  var linhaPeca = $("[data-consulta-peca]");
  var nota = $("[data-consulta-nota]");
  var msgCfg = cfg.message || {};
  var numero = String((cfg.contact && cfg.contact.whatsapp) || "").replace(/\D/g, "");
  var whatsappPronto = !demoAtivo && /^55\d{10,11}$/.test(numero);
  var sugerida = "";

  if (!demoAtivo && numero && !whatsappPronto) {
    console.warn("AVELA: contact.whatsapp precisa ter 55 + DDD + número (12 ou 13 dígitos). O botão ficará em modo de cópia.");
  }

  function pecaAtual() {
    if (!estado.escolhida || !colecoes.length) return null;
    var c = colecoes[estado.colecao];
    return { colecao: c.name, peca: c.pieces[estado.pecas[estado.colecao]].name };
  }

  function preencher(modelo, dados) {
    return String(modelo || "").replace(/\{(\w+)\}/g, function (m, k) { return dados[k] != null ? dados[k] : m; });
  }

  function montarMensagem() {
    var p = pecaAtual();
    var data = campoData.value.trim();
    var corpo = p ? preencher(msgCfg.withPiece, p) : (msgCfg.withoutPiece || "");
    if (data) corpo += " " + preencher(msgCfg.withDate, { data: data });
    return [msgCfg.greeting, corpo, msgCfg.closing].filter(Boolean).join("\n\n");
  }

  function atualizarLinhaPeca() {
    var p = pecaAtual();
    linhaPeca.textContent = "";
    var link = document.createElement("a");
    link.href = "#carta";
    if (p) {
      linhaPeca.appendChild(document.createTextNode("Você está consultando "));
      var forte = document.createElement("strong");
      forte.textContent = p.peca;
      linhaPeca.appendChild(forte);
      linhaPeca.appendChild(document.createTextNode(", da coleção " + p.colecao + ". "));
      link.textContent = "Trocar na carta";
    } else {
      linhaPeca.appendChild(document.createTextNode("Nenhuma peça escolhida ainda. "));
      link.textContent = "Escolher na carta";
    }
    linhaPeca.appendChild(link);
  }

  function editada() { return campoMsg.value.trim() !== sugerida.trim(); }

  function regenerar() {
    var nova = montarMensagem();
    var manterEdicao = sugerida && editada();
    sugerida = nova;
    if (!manterEdicao) campoMsg.value = nova;
    btnRestaurar.hidden = !editada();
  }

  aoMudarPeca = function () {
    atualizarLinhaPeca();
    regenerar();
  };

  campoData.addEventListener("input", regenerar);
  campoMsg.addEventListener("input", function () {
    btnRestaurar.hidden = !editada();
    if (status.textContent) status.textContent = "";
  });
  btnRestaurar.addEventListener("click", function () {
    campoMsg.value = sugerida;
    btnRestaurar.hidden = true;
    campoMsg.focus();
  });

  // Modo do botão
  if (whatsappPronto) {
    btnPrincipal.textContent = "Abrir conversa no WhatsApp";
    btnCopiar.hidden = false;
    nota.textContent = "A conversa abre no WhatsApp com a mensagem pronta. Nada fica confirmado antes de combinarmos os detalhes.";
  } else {
    btnPrincipal.textContent = "Copiar mensagem";
    btnCopiar.hidden = true;
    nota.textContent = demoAtivo
      ? (cfg.demo.consultNote || "")
      : "O WhatsApp ainda não foi configurado. Copie a mensagem e envie pelo canal de sua preferência.";
  }

  function avisar(texto) {
    status.textContent = "";
    // pequena pausa para leitores de tela anunciarem textos repetidos
    setTimeout(function () { status.textContent = texto; }, 30);
  }

  function copiar() {
    var texto = campoMsg.value.trim();
    var sucesso = function () {
      avisar(demoAtivo ? "Mensagem copiada. Nada foi enviado: este site é demonstrativo." : "Mensagem copiada.");
    };
    var manual = function () {
      campoMsg.focus();
      campoMsg.select();
      avisar("Não foi possível copiar automaticamente. O texto está selecionado: copie com Ctrl+C ou pelo menu do celular.");
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(sucesso, function () {
        try { campoMsg.select(); if (document.execCommand("copy")) { sucesso(); return; } } catch (e) {}
        manual();
      });
      return;
    }
    try {
      campoMsg.select();
      if (document.execCommand("copy")) { sucesso(); return; }
    } catch (e) {}
    manual();
  }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    if (!campoMsg.value.trim()) {
      avisar("Escreva uma mensagem antes de continuar.");
      campoMsg.setAttribute("aria-invalid", "true");
      campoMsg.focus();
      return;
    }
    campoMsg.removeAttribute("aria-invalid");
    if (whatsappPronto) {
      var link = "https://wa.me/" + numero + "?text=" + encodeURIComponent(campoMsg.value.trim());
      // Sem "noopener" na chamada: com ele, window.open sempre devolve null e
      // não daria para saber se a aba foi bloqueada. O opener é zerado logo depois.
      var aba = window.open(link, "_blank");
      if (aba) {
        try { aba.opener = null; } catch (err) {}
        avisar("O WhatsApp foi aberto em outra aba com a sua mensagem.");
      } else {
        avisar("O navegador bloqueou a nova aba. Toque de novo ou copie a mensagem.");
      }
    } else {
      copiar();
    }
  });
  btnCopiar.addEventListener("click", function () {
    if (!campoMsg.value.trim()) { avisar("Escreva uma mensagem antes de copiar."); campoMsg.focus(); return; }
    copiar();
  });

  atualizarLinhaPeca();
  regenerar();
})();
