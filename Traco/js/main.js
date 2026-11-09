/* ==========================================================================
   TRAÇO STUDIO — comportamento
   1. Ajustes gerais (demonstração, ano, Instagram, créditos, imagens locais)
   2. Topo e menu móvel
   3. Régua da abertura
   4. Ficha de agendamento (serviços, lookbook, formato, prévia, envio)
   5. Barra fixa de agendamento (celular e tablet)
   ========================================================================== */
(function () {
  "use strict";

  var config = window.TRACO_CONFIG;
  if (!config) {
    console.error("TRAÇO: js/config.js não foi carregado.");
    return;
  }

  document.documentElement.classList.add("js");

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  /* ---------- 1. Ajustes gerais ---------- */

  var whatsappValido = /^55\d{10,11}$/.test(String(config.contact.whatsapp || ""));
  var modoDemo = Boolean(config.demo && config.demo.enabled) || !whatsappValido;

  var aviso = $("[data-demo-notice]");
  if (aviso && config.demo && config.demo.enabled) {
    aviso.textContent = config.demo.notice;
    aviso.hidden = false;
  }

  var ano = $("[data-ano]");
  if (ano) ano.textContent = String(new Date().getFullYear());

  var insta = $("[data-instagram]");
  if (insta && config.contact.instagram) {
    insta.href = "https://www.instagram.com/" + encodeURIComponent(config.contact.instagram) + "/";
    insta.target = "_blank";
    insta.rel = "noopener";
    insta.hidden = false;
  }

  var listaCreditos = $("[data-creditos]");
  if (listaCreditos && Array.isArray(config.photoCredits)) {
    config.photoCredits.forEach(function (c) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = c.url;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = c.author;
      li.append(c.use + ": ", a);
      listaCreditos.appendChild(li);
    });
  }

  /* Imagens locais (assets/img/<nome>-800.webp e -1200.webp).
     Se um arquivo faltar, a foto volta para a URL remota original. */
  if (config.useLocalImages) {
    $$("img[data-photo]").forEach(function (img) {
      var nome = img.getAttribute("data-photo");
      var remotoSrc = img.getAttribute("src");
      var remotoSet = img.getAttribute("srcset");
      img.addEventListener("error", function voltar() {
        img.removeEventListener("error", voltar);
        console.warn("TRAÇO: imagem local ausente (" + nome + "). Usando a versão remota.");
        img.srcset = remotoSet;
        img.src = remotoSrc;
      });
      img.srcset = "assets/img/" + nome + "-800.webp 800w, assets/img/" + nome + "-1200.webp 1200w";
      img.src = "assets/img/" + nome + "-1200.webp";
    });
  }

  /* ---------- 2. Topo e menu móvel ---------- */

  var topo = $("[data-topo]");
  var menu = $("[data-menu]");
  var botaoMenu = $("[data-menu-toggle]");
  var textoBotaoMenu = $(".menu-botao__texto");
  var telaLarga = window.matchMedia("(min-width: 900px)");

  function abrirMenu() {
    menu.classList.add("menu--aberto");
    topo.classList.add("topo--menu-aberto");
    document.body.classList.add("sem-rolagem");
    botaoMenu.setAttribute("aria-expanded", "true");
    textoBotaoMenu.textContent = "Fechar";
    var primeiro = $("a", menu);
    if (primeiro) primeiro.focus();
  }
  function fecharMenu(devolverFoco) {
    if (!menu.classList.contains("menu--aberto")) return;
    menu.classList.remove("menu--aberto");
    topo.classList.remove("topo--menu-aberto");
    document.body.classList.remove("sem-rolagem");
    botaoMenu.setAttribute("aria-expanded", "false");
    textoBotaoMenu.textContent = "Menu";
    if (devolverFoco) botaoMenu.focus();
  }

  if (menu && botaoMenu) {
    botaoMenu.addEventListener("click", function () {
      if (menu.classList.contains("menu--aberto")) fecharMenu(true);
      else abrirMenu();
    });
    $$("a", menu).forEach(function (a) {
      a.addEventListener("click", function () { fecharMenu(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape") fecharMenu(true);
    });
    /* Mantém o foco dentro do menu aberto */
    menu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || !menu.classList.contains("menu--aberto")) return;
      var focaveis = $$("a", menu).concat([botaoMenu]);
      var primeiro = focaveis[0];
      var ultimo = focaveis[focaveis.length - 1];
      if (e.shiftKey && document.activeElement === primeiro) { e.preventDefault(); ultimo.focus(); }
    });
    botaoMenu.addEventListener("keydown", function (e) {
      if (e.key !== "Tab" || e.shiftKey || !menu.classList.contains("menu--aberto")) return;
      e.preventDefault();
      $("a", menu).focus();
    });
    telaLarga.addEventListener("change", function (e) { if (e.matches) fecharMenu(false); });
  }

  function marcarRolagem() {
    if (topo) topo.classList.toggle("topo--rolado", window.scrollY > 8);
  }
  window.addEventListener("scroll", marcarRolagem, { passive: true });
  marcarRolagem();

  /* ---------- 3. Régua da abertura ---------- */

  var regua = $("[data-regua]");
  var CM = 120; /* px por "centímetro" da régua, igual ao CSS */
  function desenharRegua() {
    if (!regua) return;
    var largura = regua.clientWidth;
    var total = Math.floor(largura / CM);
    var frag = document.createDocumentFragment();
    for (var i = 0; i <= total; i++) {
      if (i * CM > largura - 60) break; /* deixa espaço para a unidade */
      var n = document.createElement("span");
      n.className = "regua__n";
      n.style.left = (i * CM) + "px";
      n.textContent = String(i);
      frag.appendChild(n);
    }
    var u = document.createElement("span");
    u.className = "regua__unidade";
    u.textContent = "cm";
    frag.appendChild(u);
    regua.replaceChildren(frag);
  }
  desenharRegua();
  var reguaTimer;
  window.addEventListener("resize", function () {
    clearTimeout(reguaTimer);
    reguaTimer = setTimeout(desenharRegua, 120);
  });

  /* ---------- 4. Ficha de agendamento ---------- */

  var ficha = $("[data-ficha]");
  if (!ficha) return;

  var servicosPorId = {};
  config.services.forEach(function (s) { servicosPorId[s.id] = s; });
  var looksPorId = {};
  config.looks.forEach(function (l) { looksPorId[l.id] = l; });

  var caixas = $$("input[data-service]");
  var listaSelecao = $("[data-selecao]", ficha);
  var vazio = $("[data-vazio]", ficha);
  var contagem = $("[data-contagem]", ficha);
  var erroServicos = $("[data-erro-servicos]", ficha);
  var blocoRef = $("[data-referencia]", ficha);
  var nomeRef = $("[data-referencia-nome]", ficha);
  var blocoFormatos = $("[data-formatos]", ficha);
  var opcoesFormatos = $("[data-formatos-opcoes]", ficha);
  var campoNome = ficha.elements.nome;
  var campoObs = ficha.elements.obs;
  var erroNome = $("[data-erro-nome]", ficha);
  var previa = $("[data-previa]", ficha);
  var botaoEnviar = $("[data-enviar]", ficha);
  var resultadoDemo = $("[data-demo-resultado]", ficha);
  var botaoCopiar = $("[data-copiar]", ficha);
  var avisoCopiado = $("[data-copiado]", ficha);

  var lookEscolhido = null;

  if (modoDemo) {
    botaoEnviar.textContent = "Preparar mensagem";
    $(".ficha__legal", ficha).textContent = "Modo demonstração: a mensagem é montada aqui e nada é enviado. Com o WhatsApp configurado, este botão abre a conversa com o estúdio.";
  }

  /* Formatos de unha (SVG desenhados à mão, 24 × 40) */
  var desenhos = {
    quadrada: "M4 38 V7 H20 V38",
    amendoada: "M4 38 V17 C4 9 9 3 12 2 C15 3 20 9 20 17 V38",
    bailarina: "M4 38 V15 L8 3 H16 L20 15 V38",
    stiletto: "M4 38 V19 L12 1 L20 19 V38",
    indefinido: "M4 38 V16 C4 10 8 6 12 6 C16 6 20 10 20 16 V38"
  };
  config.shapes.forEach(function (f) {
    var rotulo = document.createElement("label");
    rotulo.className = "formato";
    rotulo.innerHTML =
      '<input type="radio" name="formato" value="' + f.id + '">' +
      '<span class="formato__caixa">' +
      '<svg viewBox="0 0 24 40" aria-hidden="true" focusable="false"><path d="' + (desenhos[f.id] || desenhos.indefinido) + '"/></svg>' +
      '<span>' + f.name + '</span></span>';
    opcoesFormatos.appendChild(rotulo);
  });

  function selecionados() {
    return caixas.filter(function (c) { return c.checked; }).map(function (c) { return servicosPorId[c.value]; }).filter(Boolean);
  }

  function pedeFormato(lista) {
    return lista.some(function (s) { return s.shape; });
  }

  function valorMarcado(nome) {
    var el = $$('input[name="' + nome + '"]', ficha).filter(function (i) { return i.checked; })[0];
    return el ? el.value : "";
  }

  function nomeFormato(id) {
    var f = config.shapes.filter(function (x) { return x.id === id; })[0];
    return f ? f.name.toLowerCase() : "";
  }

  function juntar(lista) {
    if (lista.length <= 1) return lista.join("");
    return lista.slice(0, -1).join(", ") + " ou " + lista[lista.length - 1];
  }

  function montarMensagem() {
    var lista = selecionados();
    var linhas = ["Olá, " + config.brand.greetingName + "! Gostaria de agendar um horário.", ""];
    if (lista.length) {
      linhas.push("Serviços:");
      lista.forEach(function (s) { linhas.push("- " + s.name); });
    } else {
      linhas.push("Serviços: (marque pelo menos um)");
    }
    var formato = valorMarcado("formato");
    if (pedeFormato(lista) && formato) linhas.push("Formato das unhas: " + nomeFormato(formato));
    if (lookEscolhido) linhas.push("Referência: look " + lookEscolhido.id + " do lookbook (" + lookEscolhido.name + ")");
    var periodo = valorMarcado("periodo");
    var dias = $$('input[name="dia"]', ficha).filter(function (i) { return i.checked; }).map(function (i) { return i.value; });
    if (dias.length) linhas.push("Dias possíveis: " + juntar(dias));
    linhas.push("Período: " + (periodo || "sem preferência"));
    var nome = campoNome.value.trim();
    if (nome) linhas.push("Nome: " + nome);
    var obs = campoObs.value.trim();
    if (obs) linhas.push("Observações: " + obs);
    linhas.push("", "Pode me passar os horários disponíveis?");
    return linhas.join("\n");
  }

  function atualizar() {
    var lista = selecionados();

    listaSelecao.replaceChildren();
    lista.forEach(function (s) {
      var li = document.createElement("li");
      var texto = document.createElement("span");
      texto.textContent = s.name;
      var grupo = document.createElement("small");
      grupo.textContent = s.group;
      texto.appendChild(grupo);
      var tirar = document.createElement("button");
      tirar.type = "button";
      tirar.className = "ficha__tirar";
      tirar.textContent = "Tirar";
      tirar.setAttribute("aria-label", "Tirar " + s.name + " da ficha");
      tirar.addEventListener("click", function () {
        var caixa = caixas.filter(function (c) { return c.value === s.id; })[0];
        if (caixa) caixa.checked = false;
        atualizar();
        (listaSelecao.querySelector(".ficha__tirar") || campoNome).focus();
      });
      li.append(texto, tirar);
      listaSelecao.appendChild(li);
    });
    vazio.hidden = lista.length > 0;
    if (lista.length) erroServicos.hidden = true;

    var n = lista.length;
    var rotulo = n === 0 ? "Nenhum serviço" : n === 1 ? "1 serviço" : n + " serviços";
    contagem.textContent = rotulo;

    blocoFormatos.hidden = !pedeFormato(lista);

    blocoRef.hidden = !lookEscolhido;
    if (lookEscolhido) nomeRef.textContent = "Look " + lookEscolhido.id + ", " + lookEscolhido.name.toLowerCase();
    $$(".look").forEach(function (el) {
      el.classList.toggle("look--escolhido", Boolean(lookEscolhido) && el.getAttribute("data-look") === lookEscolhido.id);
    });

    previa.textContent = montarMensagem();
    atualizarBarra(n);
  }

  ficha.addEventListener("input", function (e) {
    if (e.target === campoNome && campoNome.value.trim().length >= 2) limparErroNome();
    atualizar();
  });
  ficha.addEventListener("change", atualizar);
  caixas.forEach(function (c) { c.addEventListener("change", atualizar); });

  $("[data-referencia-remover]", ficha).addEventListener("click", function () {
    lookEscolhido = null;
    atualizar();
    campoNome.focus();
  });

  /* "Quero esse visual" */
  $$("[data-look-pick]").forEach(function (botao) {
    botao.addEventListener("click", function () {
      var look = looksPorId[botao.getAttribute("data-look-pick")];
      if (!look) return;
      lookEscolhido = look;
      look.services.forEach(function (id) {
        var caixa = caixas.filter(function (c) { return c.value === id; })[0];
        if (caixa) caixa.checked = true;
      });
      if (look.shape) {
        var radio = $('input[name="formato"][value="' + look.shape + '"]', ficha);
        if (radio) radio.checked = true;
      }
      atualizar();
      contagem.textContent += ". Look " + look.id + " adicionado";
      ficha.scrollIntoView({ behavior: reduzMovimento.matches ? "auto" : "smooth", block: "start" });
      var titulo = $("#ficha-titulo");
      titulo.setAttribute("tabindex", "-1");
      titulo.focus({ preventScroll: true });
    });
  });

  function limparErroNome() {
    erroNome.hidden = true;
    campoNome.removeAttribute("aria-invalid");
  }

  ficha.addEventListener("submit", function (e) {
    e.preventDefault();
    var lista = selecionados();
    var nome = campoNome.value.trim();
    var primeiroErro = null;

    resultadoDemo.hidden = true;

    if (!lista.length) {
      erroServicos.hidden = false;
      primeiroErro = primeiroErro || caixas[0];
    }
    if (nome.length < 2) {
      erroNome.hidden = false;
      campoNome.setAttribute("aria-invalid", "true");
      primeiroErro = primeiroErro || campoNome;
    } else {
      limparErroNome();
    }
    if (primeiroErro) {
      primeiroErro.focus();
      return;
    }

    var mensagem = montarMensagem();
    if (modoDemo) {
      resultadoDemo.hidden = false;
      avisoCopiado.textContent = "";
      resultadoDemo.focus();
      return;
    }
    var url = "https://wa.me/" + config.contact.whatsapp + "?text=" + encodeURIComponent(mensagem);
    window.open(url, "_blank", "noopener");
  });

  botaoCopiar.addEventListener("click", function () {
    var texto = montarMensagem();
    function ok() { avisoCopiado.textContent = "Mensagem copiada."; }
    function falhou() {
      var sel = window.getSelection();
      var r = document.createRange();
      r.selectNodeContents(previa);
      sel.removeAllRanges();
      sel.addRange(r);
      avisoCopiado.textContent = "Não foi possível copiar automaticamente. O texto da prévia foi selecionado: use Ctrl+C.";
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(ok, falhou);
    } else {
      falhou();
    }
  });

  /* ---------- 5. Barra fixa de agendamento ---------- */

  var barra = $("[data-barra]");
  var barraConta = $("[data-barra-conta]");
  var abertura = $(".abertura");
  var passouAbertura = false;
  var fichaVisivel = false;

  function atualizarBarra(n) {
    if (!barra) return;
    barraConta.textContent = n ? (n === 1 ? "1 serviço na ficha" : n + " serviços na ficha") : "Monte sua ficha";
  }
  function mostrarBarra() {
    if (!barra) return;
    var visivel = passouAbertura && !fichaVisivel;
    barra.classList.toggle("barra-agenda--visivel", visivel);
    /* Fora da tela, a barra não recebe foco nem é lida */
    if (visivel) {
      barra.removeAttribute("aria-hidden");
      barra.removeAttribute("tabindex");
    } else {
      barra.setAttribute("aria-hidden", "true");
      barra.setAttribute("tabindex", "-1");
    }
  }

  if (barra && "IntersectionObserver" in window) {
    barra.hidden = false;
    new IntersectionObserver(function (entradas) {
      passouAbertura = !entradas[0].isIntersecting;
      mostrarBarra();
    }).observe(abertura);
    new IntersectionObserver(function (entradas) {
      fichaVisivel = entradas[0].isIntersecting;
      mostrarBarra();
    }, { threshold: 0.05 }).observe(ficha);
  }

  atualizar();
})();
