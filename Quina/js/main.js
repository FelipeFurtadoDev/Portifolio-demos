/* ==========================================================================
   QUINA · Bolos sob encomenda — comportamento da página
   JavaScript puro, sem dependências. Os dados vêm de js/dados.js.
   ========================================================================== */
(function () {
  "use strict";

  var D = window.QUINA_DADOS;
  if (!D) { return; }

  var $ = function (sel, raiz) { return (raiz || document).querySelector(sel); };
  var $$ = function (sel, raiz) { return Array.prototype.slice.call((raiz || document).querySelectorAll(sel)); };
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ------------------------------------------------------------------
     Estado do pedido. Em grupos (formato, acabamento, sabor):
       null = ainda não escolhido · "aberto" = em aberto, quero orientação · id = opção
     ------------------------------------------------------------------ */
  var estado = {
    data: "", dataAberta: false,
    convidados: "", convidadosAberto: false,
    formato: null, acabamento: null, sabor: null,
    obs: ""
  };

  var GRUPOS = {
    formato:    { lista: D.formatos,    rotulo: "Formato",          acao: "Usar este formato" },
    acabamento: { lista: D.acabamentos, rotulo: "Acabamento",       acao: "Usar este acabamento" },
    sabor:      { lista: D.sabores,     rotulo: "Sabor e recheio",  acao: "Usar este recheio" }
  };
  var ORDEM_GRUPOS = ["formato", "acabamento", "sabor"];

  /* ------------------------------------------------------------------
     Utilitários
     ------------------------------------------------------------------ */
  function el(tag, atributos, filhos) {
    var n = document.createElement(tag);
    Object.keys(atributos || {}).forEach(function (k) {
      if (k === "texto") { n.textContent = atributos[k]; }
      else if (k === "html") { n.innerHTML = atributos[k]; }
      else if (k === "class") { n.className = atributos[k]; }
      else { n.setAttribute(k, atributos[k]); }
    });
    (filhos || []).forEach(function (f) { if (f) { n.appendChild(f); } });
    return n;
  }

  function achar(grupo, id) {
    var lista = GRUPOS[grupo].lista;
    for (var i = 0; i < lista.length; i++) { if (lista[i].id === id) { return lista[i]; } }
    return null;
  }

  function hojeISO() {
    var h = new Date();
    return h.getFullYear() + "-" + String(h.getMonth() + 1).padStart(2, "0") + "-" + String(h.getDate()).padStart(2, "0");
  }

  function dataValida(valor) {
    if (!/^\d{4}-\d{2}-\d{2}$/.test(valor)) { return null; }
    var p = valor.split("-").map(Number);
    var d = new Date(p[0], p[1] - 1, p[2]);
    if (d.getFullYear() !== p[0] || d.getMonth() !== p[1] - 1 || d.getDate() !== p[2]) { return null; }
    return d;
  }

  function dataPorExtenso(d) {
    return d.toLocaleDateString("pt-BR", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }

  function convidadosValidos() {
    if (estado.convidadosAberto || estado.convidados === "") { return null; }
    var n = Number(estado.convidados);
    if (!Number.isInteger(n) || n < 1 || n > D.pedido.convidadosMax) { return null; }
    return n;
  }

  function dataEscolhida() {
    if (estado.dataAberta || estado.data === "") { return null; }
    var d = dataValida(estado.data);
    if (!d) { return null; }
    var hoje = dataValida(hojeISO());
    return d >= hoje ? d : null;
  }

  function whatsappValido() {
    return !D.demo.ativo && /^55\d{10,11}$/.test(D.contato.whatsapp || "");
  }

  /* ------------------------------------------------------------------
     Fotografias (CDN da Unsplash ou arquivos locais, com retorno automático)
     ------------------------------------------------------------------ */
  function urlRemota(foto, largura) {
    return D.imagens.remoteBase + "photo-" + foto.id + "?fit=max&fm=webp&q=75&w=" + largura;
  }
  function urlLocal(foto, largura) {
    return D.imagens.localBase + foto.arquivo + "-" + largura + ".webp";
  }
  function srcset(foto, larguras, local) {
    return larguras.map(function (w) { return (local ? urlLocal(foto, w) : urlRemota(foto, w)) + " " + w + "w"; }).join(", ");
  }
  function aplicarFoto(img, foto, larguras, sizes) {
    var local = D.imagens.useLocalImages;
    img.sizes = sizes;
    if (local) {
      img.addEventListener("error", function voltar() {
        img.removeEventListener("error", voltar);
        img.srcset = srcset(foto, larguras, false);
        img.src = urlRemota(foto, larguras[1] || larguras[0]);
      });
    }
    img.srcset = srcset(foto, larguras, local);
    img.src = local ? urlLocal(foto, larguras[1] || larguras[0]) : urlRemota(foto, larguras[1] || larguras[0]);
  }

  /* ------------------------------------------------------------------
     Ícones (traço em currentColor)
     ------------------------------------------------------------------ */
  var NS = "http://www.w3.org/2000/svg";
  var ICONES = {
    redondo: '<circle cx="20" cy="20" r="14"/><path d="M20 20 L29 9.3 M20 20 L33.2 15.2" stroke-linecap="round"/>',
    retangular: '<rect x="5" y="11" width="30" height="19" rx="2"/><path d="M25 11 V20 H35" stroke-linecap="round"/>',
    liso: '<circle cx="20" cy="20" r="14"/><path d="M12 24 Q20 28 28 24" stroke-linecap="round"/>',
    flores: '<circle cx="20" cy="20" r="14"/><circle cx="15" cy="16" r="2.2" fill="currentColor"/><circle cx="24" cy="14" r="2.2" fill="currentColor"/><circle cx="21" cy="24" r="2.2" fill="currentColor"/><circle cx="14" cy="25" r="1.4" fill="currentColor"/>',
    ganache: '<circle cx="20" cy="20" r="14"/><g fill="currentColor"><circle cx="20" cy="9.5" r="1.5"/><circle cx="27.4" cy="12.6" r="1.5"/><circle cx="30.5" cy="20" r="1.5"/><circle cx="27.4" cy="27.4" r="1.5"/><circle cx="20" cy="30.5" r="1.5"/><circle cx="12.6" cy="27.4" r="1.5"/><circle cx="9.5" cy="20" r="1.5"/><circle cx="12.6" cy="12.6" r="1.5"/></g>',
    frutas: '<circle cx="20" cy="20" r="14"/><circle cx="16" cy="17" r="3.4"/><circle cx="24" cy="22" r="3.4"/><circle cx="17" cy="26" r="2.6"/>',
    aberto: '<circle cx="20" cy="20" r="14" stroke-dasharray="3 3.4"/><path d="M16.5 16.5 A3.6 3.6 0 1 1 21 20 Q20 20.8 20 22.5" stroke-linecap="round"/><circle cx="20" cy="27" r="1.2" fill="currentColor"/>'
  };
  function icone(id) {
    var s = document.createElementNS(NS, "svg");
    s.setAttribute("viewBox", "0 0 40 40");
    s.setAttribute("fill", "none");
    s.setAttribute("stroke", "currentColor");
    s.setAttribute("stroke-width", "2");
    s.setAttribute("aria-hidden", "true");
    s.setAttribute("focusable", "false");
    s.innerHTML = ICONES[id] || ICONES.aberto;
    return s;
  }
  var CHECK = '<svg viewBox="0 0 20 20" aria-hidden="true" focusable="false"><path d="M4.5 10.5l3.8 3.8 7.2-8.6" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

  /* ------------------------------------------------------------------
     Opções do configurador
     ------------------------------------------------------------------ */
  function renderOpcoes() {
    ORDEM_GRUPOS.forEach(function (g) {
      var caixa = $('[data-opcoes="' + g + '"]');
      if (!caixa) { return; }
      var itens = GRUPOS[g].lista.concat([{ id: "aberto", nome: "Em aberto", descricao: "Quero orientação da confeitaria." }]);
      var temIcone = g !== "sabor";
      itens.forEach(function (op) {
        var entrada = el("input", { type: "radio", name: g, value: op.id });
        entrada.addEventListener("change", function () { escolher(g, op.id, "controle"); });
        var corpo = el("span", { "class": "opcao__corpo" + (temIcone ? "" : " opcao__corpo--sem-icone") });
        if (temIcone) {
          var ic = el("span", { "class": "opcao__icone", "aria-hidden": "true" });
          ic.appendChild(icone(op.id));
          corpo.appendChild(ic);
        }
        corpo.appendChild(el("span", { "class": "opcao__nome", texto: op.nome }));
        corpo.appendChild(el("span", { "class": "opcao__desc", texto: op.descricao }));
        corpo.appendChild(el("span", { "class": "opcao__ok", html: CHECK, "aria-hidden": "true" }));
        var rotulo = el("label", { "class": "opcao" + (op.id === "aberto" ? " opcao--aberto" : ""), "data-opcao": g + ":" + op.id }, [entrada, corpo]);
        caixa.appendChild(rotulo);
      });
    });
  }

  function sincronizarRadios() {
    ORDEM_GRUPOS.forEach(function (g) {
      $$('input[name="' + g + '"]').forEach(function (r) { r.checked = (estado[g] === r.value); });
    });
  }

  /* ------------------------------------------------------------------
     Escolha de uma opção (pelo controle ou pela galeria)
     ------------------------------------------------------------------ */
  var anuncio = null;
  function anunciar(texto) {
    if (!anuncio) {
      anuncio = el("p", { "class": "sr-only", role: "status", "aria-live": "polite" });
      document.body.appendChild(anuncio);
    }
    anuncio.textContent = "";
    window.setTimeout(function () { anuncio.textContent = texto; }, 30);
  }

  function escolher(grupo, id, origem) {
    var jaEra = estado[grupo] === id;
    estado[grupo] = id;
    sincronizarRadios();
    var op = id === "aberto" ? { nome: "em aberto, quero orientação" } : achar(grupo, id);
    var rotulo = GRUPOS[grupo].rotulo;

    if (origem === "galeria") {
      var status = $("#galeria-status");
      if (status) {
        status.textContent = "";
        if (jaEra) {
          status.appendChild(document.createTextNode(rotulo + " já estava no seu pedido: " + op.nome + ". "));
        } else {
          status.appendChild(document.createTextNode(rotulo + " atualizado para "));
          status.appendChild(el("strong", { texto: op.nome }));
          status.appendChild(document.createTextNode(". Data, convidados e as outras escolhas continuam como estavam. "));
        }
        status.appendChild(el("a", { href: "#orcamento", texto: "Ver no pedido" }));
      }
      var cartao = $('[data-opcao="' + grupo + ":" + id + '"]');
      if (cartao && !jaEra && !reduzMovimento.matches) {
        cartao.classList.remove("destacar");
        void cartao.offsetWidth;
        cartao.classList.add("destacar");
      }
    } else {
      anunciar(rotulo + ": " + op.nome + ".");
    }
    atualizar(jaEra ? [] : [grupo]);
  }

  /* ------------------------------------------------------------------
     Data e convidados
     ------------------------------------------------------------------ */
  function mostrarErro(idCampo, idErro, texto) {
    var campo = $("#" + idCampo), caixa = $("#" + idErro);
    if (!caixa) { return; }
    if (texto) {
      caixa.textContent = texto; caixa.hidden = false;
      campo.setAttribute("aria-invalid", "true"); campo.setAttribute("aria-describedby", idErro);
    } else {
      caixa.hidden = true; caixa.textContent = "";
      campo.removeAttribute("aria-invalid"); campo.removeAttribute("aria-describedby");
    }
  }

  function validarData() {
    var campo = $("#data");
    estado.data = campo.value;
    var msg = "";
    if (estado.data) {
      var d = dataValida(estado.data);
      if (!d) { msg = "Escolha uma data válida."; }
      else if (d < dataValida(hojeISO())) { msg = "Escolha uma data a partir de hoje."; }
    }
    mostrarErro("data", "erro-data", msg);
    atualizar(["data"]);
  }

  function validarConvidados() {
    var campo = $("#convidados");
    estado.convidados = campo.value.trim();
    var msg = "";
    if (estado.convidados !== "") {
      var n = Number(estado.convidados);
      if (!Number.isInteger(n) || n < 1) { msg = "Informe um número inteiro a partir de 1."; }
      else if (n > D.pedido.convidadosMax) {
        msg = "O limite aqui é " + D.pedido.convidadosMax + " convidados. Para mais, combine direto com a confeitaria.";
      }
    }
    mostrarErro("convidados", "erro-convidados", msg);
    atualizar(["convidados"]);
  }

  function iniciarCampos() {
    var campoData = $("#data");
    campoData.min = hojeISO();
    campoData.addEventListener("input", validarData);
    campoData.addEventListener("change", validarData);

    $("#data-aberta").addEventListener("change", function (e) {
      estado.dataAberta = e.target.checked;
      campoData.disabled = estado.dataAberta;
      if (estado.dataAberta) { campoData.value = ""; estado.data = ""; mostrarErro("data", "erro-data", ""); }
      atualizar(["data"]);
    });

    var campoConv = $("#convidados");
    campoConv.max = D.pedido.convidadosMax;
    campoConv.addEventListener("input", validarConvidados);

    $("#convidados-aberto").addEventListener("change", function (e) {
      estado.convidadosAberto = e.target.checked;
      campoConv.disabled = estado.convidadosAberto;
      $$(".contador__btn").forEach(function (b) { b.disabled = estado.convidadosAberto; });
      if (estado.convidadosAberto) { campoConv.value = ""; estado.convidados = ""; mostrarErro("convidados", "erro-convidados", ""); }
      atualizar(["convidados"]);
    });

    $$(".contador__btn").forEach(function (b) {
      b.addEventListener("click", function () {
        var passo = Number(b.getAttribute("data-passo"));
        var atual = parseInt(campoConv.value, 10);
        var proximo = isNaN(atual) ? 1 : atual + passo;
        proximo = Math.max(1, Math.min(D.pedido.convidadosMax, proximo));
        campoConv.value = String(proximo);
        validarConvidados();
      });
    });

    var obs = $("#obs");
    obs.addEventListener("input", function () {
      estado.obs = obs.value;
      atualizarContadorObs();
      atualizar([]);
    });
  }

  function atualizarContadorObs() {
    var c = $("[data-obs-contador]");
    if (c) { c.textContent = estado.obs.length + " de 400 caracteres."; }
  }

  /* ------------------------------------------------------------------
     Resumo e mensagem
     ------------------------------------------------------------------ */
  function linhas() {
    var d = dataEscolhida(), n = convidadosValidos();
    var lista = [];

    lista.push({
      chave: "data", rotulo: "Data",
      resumo: estado.dataAberta ? "Ainda não definida" : (d ? dataPorExtenso(d) : null),
      mensagem: estado.dataAberta ? "ainda não defini a data" : (d ? dataPorExtenso(d) : null)
    });
    lista.push({
      chave: "convidados", rotulo: "Convidados",
      resumo: estado.convidadosAberto ? "Ainda não sei" : (n ? "Cerca de " + n : null),
      mensagem: estado.convidadosAberto ? "ainda não sei o número" : (n ? "cerca de " + n : null)
    });
    ORDEM_GRUPOS.forEach(function (g) {
      var v = estado[g], texto = null, msg = null;
      if (v === "aberto") { texto = "Em aberto, quero orientação"; msg = "em aberto, gostaria de orientação"; }
      else if (v) { texto = msg = achar(g, v).nome; }
      lista.push({ chave: g, rotulo: GRUPOS[g].rotulo, resumo: texto, mensagem: msg });
    });
    return lista;
  }

  function referenciaTabela() {
    var t = D.pedido.tabelaPorcoes, n = convidadosValidos();
    if (!t || !t.length || !n || !estado.formato || estado.formato === "aberto") { return null; }
    var candidatas = t.filter(function (l) { return l.formato === estado.formato; })
      .sort(function (a, b) { return a.ate - b.ate; });
    for (var i = 0; i < candidatas.length; i++) {
      if (n <= candidatas[i].ate) { return candidatas[i]; }
    }
    return null;
  }

  var anterior = {};

  function renderResumo(mudadas) {
    var dados = linhas();
    var ref = referenciaTabela();
    $$("[data-resumo]").forEach(function (lista) {
      lista.textContent = "";
      dados.forEach(function (l) {
        var dd = el("dd", { "class": l.resumo ? "" : "vazio", texto: l.resumo || "Ainda não escolhi" });
        var btn = el("button", { type: "button", "class": "resumo__editar", "data-editar": l.chave },
          [document.createTextNode("Editar"), el("span", { "class": "sr-only", texto: " " + l.rotulo.toLowerCase() })]);
        btn.addEventListener("click", function () { editar(l.chave); });
        var linha = el("div", { "class": "resumo__linha" }, [el("dt", { texto: l.rotulo }), dd, btn]);
        if (mudadas.indexOf(l.chave) !== -1 && anterior[l.chave] !== l.resumo && !reduzMovimento.matches) {
          linha.classList.add("mudou");
        }
        lista.appendChild(linha);
      });
      if (ref) {
        lista.appendChild(el("div", { "class": "resumo__linha" }, [
          el("dt", { texto: "Referência" }),
          el("dd", { texto: ref.tamanho + " (" + ref.porcoes + " porções), segundo a tabela da confeitaria" }),
          el("span")
        ]));
      }
    });
    dados.forEach(function (l) { anterior[l.chave] = l.resumo; });
  }

  function montarMensagem() {
    var partes = ["Olá, " + D.marca.nome + "! Gostaria de pedir um orçamento de bolo."];
    var itens = linhas().filter(function (l) { return l.mensagem; })
      .map(function (l) { return l.rotulo + ": " + l.mensagem; });
    var ref = referenciaTabela();
    if (ref) { itens.push("Referência da tabela: " + ref.tamanho + " (" + ref.porcoes + " porções)"); }
    var obs = estado.obs.trim();
    if (obs) { itens.push("Observação: " + obs); }
    if (itens.length) { partes.push(itens.join("\n")); }
    partes.push("Sei que preço e disponibilidade são confirmados na conversa.");
    return partes.join("\n\n");
  }

  /* ------------------------------------------------------------------
     Esquema visual
     ------------------------------------------------------------------ */
  var MAX_LUGARES = 40;
  function renderEsquema() {
    var palco = $("[data-esquema]");
    if (!palco) { return; }
    palco.setAttribute("data-formato", estado.formato || "");
    palco.setAttribute("data-acabamento", estado.acabamento || "");
    var svg = $("[data-lugares]", palco);
    var n = Math.min(convidadosValidos() || 0, MAX_LUGARES);
    if (Number(svg.getAttribute("data-n")) === n) { return; }
    svg.setAttribute("data-n", String(n));
    svg.textContent = "";
    for (var i = 0; i < n; i++) {
      var ang = (i / n) * Math.PI * 2 - Math.PI / 2;
      var c = document.createElementNS(NS, "circle");
      c.setAttribute("cx", (Math.cos(ang) * 51).toFixed(2));
      c.setAttribute("cy", (Math.sin(ang) * 51).toFixed(2));
      c.setAttribute("r", n > 28 ? "2" : "2.6");
      svg.appendChild(c);
    }
  }

  /* ------------------------------------------------------------------
     Galeria
     ------------------------------------------------------------------ */
  function renderGaleria() {
    $$("[data-faixa]").forEach(function (faixa) {
      var caixa = $("[data-faixa-fotos]", faixa);
      caixa.textContent = "";
      (D.faixas[faixa.getAttribute("data-faixa")] || []).forEach(function (chave) {
        var f = D.fotos[chave];
        if (!f) { return; }
        var img = el("img", {
          alt: f.alt, width: "1200", height: String(Math.round(1200 / f.ratio)),
          decoding: "async", loading: "lazy"
        });
        img.style.objectPosition = f.pos || "50% 50%";
        aplicarFoto(img, f, D.imagens.larguras, "(min-width: 700px) 34vw, 50vw");

        var legenda = el("figcaption", {}, [
          el("p", { "class": "foto-cartao__legenda", texto: f.legenda }),
          el("p", { "class": "foto-cartao__selo", texto: "Foto ilustrativa" })
        ]);
        var cartao = el("figure", { "class": "foto-cartao", "data-foto-cartao": chave }, [
          el("div", { "class": "foto-cartao__img" }, [img]), legenda
        ]);
        cartao.style.setProperty("--ratio", String(f.ratio));

        if (f.vinculo) {
          var g = f.vinculo.grupo, op = achar(g, f.vinculo.opcao);
          var estadoTag = el("p", { "class": "foto-cartao__estado", hidden: "", html: CHECK + "<span>No seu pedido</span>" });
          var botao = el("button", { type: "button", "class": "btn btn--contorno btn--mini", texto: GRUPOS[g].acao });
          botao.setAttribute("aria-label", GRUPOS[g].acao + ": " + op.nome);
          botao.addEventListener("click", function () { escolher(g, op.id, "galeria"); });
          legenda.appendChild(estadoTag);
          legenda.appendChild(botao);
        }
        caixa.appendChild(cartao);
      });
    });
  }

  function sincronizarGaleria() {
    $$("[data-foto-cartao]").forEach(function (cartao) {
      var f = D.fotos[cartao.getAttribute("data-foto-cartao")];
      if (!f || !f.vinculo) { return; }
      var ativo = estado[f.vinculo.grupo] === f.vinculo.opcao;
      cartao.classList.toggle("foto-cartao--escolhida", ativo);
      var tag = $(".foto-cartao__estado", cartao);
      if (tag) { tag.hidden = !ativo; }
    });
  }

  /* ------------------------------------------------------------------
     Como a encomenda funciona e créditos
     ------------------------------------------------------------------ */
  function renderEncomenda() {
    var lista = $("[data-etapas]");
    if (!lista) { return; }
    lista.textContent = "";
    D.encomenda.itens.forEach(function (it) {
      var li = el("li", { "class": "etapa" }, [el("h3", { texto: it.titulo }), el("p", { texto: it.texto })]);
      if (it.exemplo) { li.appendChild(el("p", { "class": "etapa__exemplo", texto: it.exemplo })); }
      if (it.combinar) { li.appendChild(el("span", { "class": "etapa__combinar", texto: "A combinar na conversa" })); }
      lista.appendChild(li);
    });
  }

  function renderCreditos() {
    var ul = $("[data-creditos]");
    if (!ul) { return; }
    ul.textContent = "";
    Object.keys(D.fotos).forEach(function (k) {
      var f = D.fotos[k];
      var li = el("li", {}, [
        document.createTextNode(f.rotulo + ": "),
        el("a", { href: f.pagina, target: "_blank", rel: "noopener noreferrer", texto: "foto de " + f.autor }),
        document.createTextNode(" na Unsplash")
      ]);
      ul.appendChild(li);
    });
  }

  /* ------------------------------------------------------------------
     Contato e cópia
     ------------------------------------------------------------------ */
  function atualizarContato(mensagem) {
    var btn = $("#btn-whats"), aviso = $("#aviso-contato");
    if (whatsappValido()) {
      btn.hidden = false;
      btn.href = "https://wa.me/" + D.contato.whatsapp + "?text=" + encodeURIComponent(mensagem);
      aviso.hidden = true;
    } else {
      btn.hidden = true;
      btn.removeAttribute("href");
      aviso.hidden = false;
      aviso.textContent = D.demo.ativo ? D.demo.avisoContato
        : "O número de WhatsApp ainda não foi configurado. Copie a mensagem e envie pelo canal que a confeitaria indicar.";
    }
  }

  var temporizadorCopia = null;
  function copiar() {
    var campo = $("#mensagem"), status = $("#status-copia"), botao = $("#btn-copiar");
    var texto = campo.value;
    var aviso = D.demo.ativo ? "Mensagem copiada. Nada foi enviado: este site é demonstrativo." : "Mensagem copiada.";

    function ok() {
      status.textContent = aviso;
      botao.innerHTML = CHECK + "<span>Mensagem copiada</span>";
      window.clearTimeout(temporizadorCopia);
      temporizadorCopia = window.setTimeout(function () { botao.textContent = "Copiar mensagem"; }, 2600);
    }
    function manual() {
      campo.focus(); campo.select();
      status.textContent = "Não foi possível copiar sozinho. A mensagem está selecionada: use Ctrl+C (ou Copiar no celular).";
    }
    function legado() {
      campo.focus(); campo.select();
      try { return document.execCommand("copy"); } catch (e) { return false; }
    }

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(ok, function () { legado() ? ok() : manual(); });
    } else {
      legado() ? ok() : manual();
    }
  }

  /* ------------------------------------------------------------------
     Edição pelo resumo
     ------------------------------------------------------------------ */
  function editar(chave) {
    var alvo;
    if (chave === "data") { alvo = estado.dataAberta ? $("#data-aberta") : $("#data"); }
    else if (chave === "convidados") { alvo = estado.convidadosAberto ? $("#convidados-aberto") : $("#convidados"); }
    else { alvo = $('input[name="' + chave + '"]:checked') || $('input[name="' + chave + '"]'); }
    if (!alvo) { return; }
    var rolar = $("#grupo-" + chave) || alvo;
    rolar.scrollIntoView({ block: "center", behavior: reduzMovimento.matches ? "auto" : "smooth" });
    alvo.focus({ preventScroll: true });
  }

  /* ------------------------------------------------------------------
     Atualização geral
     ------------------------------------------------------------------ */
  function atualizar(mudadas) {
    renderResumo(mudadas || []);
    renderEsquema();
    sincronizarGaleria();
    var msg = montarMensagem();
    var campo = $("#mensagem");
    campo.value = msg;
    campo.rows = Math.max(8, msg.split("\n").length + 1);
    atualizarContato(msg);
    var status = $("#status-copia");
    if (status && mudadas && mudadas.length) { status.textContent = ""; }
  }

  /* ------------------------------------------------------------------
     Início
     ------------------------------------------------------------------ */
  function iniciar() {
    var aviso = $("[data-aviso-demo]");
    if (aviso) { aviso.textContent = D.demo.aviso; aviso.hidden = !D.demo.ativo; }

    $$("[data-foto]").forEach(function (img) {
      var f = D.fotos[img.getAttribute("data-foto")];
      if (!f || !D.imagens.useLocalImages) { return; }
      aplicarFoto(img, f, img.getAttribute("data-foto") === "abertura" ? D.imagens.largurasCapa : D.imagens.larguras, img.sizes);
    });

    renderOpcoes();
    renderGaleria();
    renderEncomenda();
    renderCreditos();
    iniciarCampos();
    atualizarContadorObs();
    $("#btn-copiar").addEventListener("click", copiar);
    atualizar([]);
  }

  if (document.readyState === "loading") { document.addEventListener("DOMContentLoaded", iniciar); }
  else { iniciar(); }
})();
