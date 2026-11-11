/* ==========================================================================
   ENTRE. — comportamento da página
   1. Configuração e textos de demonstração
   2. Imagens locais opcionais
   3. Topo e menu
   4. Cartões empilhados (encaixe na altura, profundidade, trilho)
   5. Estado compartilhado da escolha + mensagem
   6. Revelação do título de "O gesto"
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.ENTRE_CONFIG || {};
  var doc = document.documentElement;
  var reduz = window.matchMedia("(prefers-reduced-motion: reduce)");
  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var cares = CFG.cares || [];
  function careById(id) {
    for (var i = 0; i < cares.length; i++) { if (cares[i].id === id) return cares[i]; }
    return null;
  }

  /* 1. Configuração -------------------------------------------------------- */
  var demo = !!(CFG.demo && CFG.demo.enabled);
  var numero = String((CFG.contact && CFG.contact.whatsapp) || "").replace(/\D/g, "");
  var modoReal = !demo && /^\d{12,13}$/.test(numero);

  var barra = $("[data-demo-bar]");
  if (barra) {
    if (!demo) { barra.hidden = true; }
    else if (CFG.demo.notice) {
      var t = $("[data-demo-text]", barra);
      if (t) t.textContent = CFG.demo.notice.replace(/^Demonstração:\s*/, "");
    }
  }
  function medirAviso() {
    doc.style.setProperty("--demo-h", (barra && !barra.hidden ? barra.offsetHeight : 0) + "px");
  }
  medirAviso();

  var creditos = $("[data-creditos]");
  if (creditos && CFG.credits && CFG.credits.length) {
    creditos.textContent = "";
    CFG.credits.forEach(function (c, i) {
      var a = document.createElement("a");
      a.href = c.url;
      a.textContent = c.author;
      a.rel = "noopener";
      a.title = c.role;
      creditos.appendChild(a);
      var sep = i < CFG.credits.length - 2 ? ", " : (i === CFG.credits.length - 2 ? " e " : ".");
      creditos.appendChild(document.createTextNode(sep));
    });
  }

  var info = $("[data-info]");
  if (info && CFG.contact && CFG.contact.details) {
    CFG.contact.details.forEach(function (d) {
      var linha = document.createElement("div");
      var dt = document.createElement("dt");
      var dd = document.createElement("dd");
      dt.textContent = d.label;
      dd.textContent = d.value;
      linha.appendChild(dt);
      linha.appendChild(dd);
      info.appendChild(linha);
    });
    if (CFG.contact.instagram) {
      var linhaIg = document.createElement("div");
      linhaIg.innerHTML = "<dt>Instagram</dt><dd><a></a></dd>";
      var a = $("a", linhaIg);
      a.href = "https://instagram.com/" + CFG.contact.instagram;
      a.textContent = "@" + CFG.contact.instagram;
      a.rel = "noopener";
      info.appendChild(linhaIg);
    }
  }

  /* 2. Imagens locais (opcional) ------------------------------------------ */
  if (CFG.useLocalImages) {
    $$("img[data-img]").forEach(function (img) {
      var nome = img.getAttribute("data-img");
      var larguras = (img.getAttribute("data-widths") || "").split(",");
      var remotoSrc = img.getAttribute("src");
      var remotoSet = img.getAttribute("srcset");
      img.addEventListener("error", function voltar() {
        img.removeEventListener("error", voltar);
        console.warn("[ENTRE.] Imagem local ausente, usando a CDN: " + nome);
        img.setAttribute("srcset", remotoSet);
        img.setAttribute("src", remotoSrc);
      });
      img.setAttribute("srcset", larguras.map(function (w) { return "assets/img/" + nome + "-" + w + ".webp " + w + "w"; }).join(", "));
      img.setAttribute("src", "assets/img/" + nome + "-" + (larguras.indexOf("800") > -1 ? "800" : larguras[larguras.length - 1]) + ".webp");
    });
  }

  /* 3. Topo e menu --------------------------------------------------------- */
  var topo = $("[data-topo]");
  var toggle = $("[data-nav-toggle]");
  var lista = $("[data-nav-lista]");

  function fecharMenu(devolverFoco) {
    if (!lista.classList.contains("is-aberta")) return;
    lista.classList.remove("is-aberta");
    toggle.setAttribute("aria-expanded", "false");
    toggle.textContent = "Menu";
    if (devolverFoco) toggle.focus();
  }
  if (toggle && lista) {
    toggle.addEventListener("click", function () {
      var abrir = !lista.classList.contains("is-aberta");
      if (!abrir) { fecharMenu(false); return; }
      lista.classList.add("is-aberta");
      toggle.setAttribute("aria-expanded", "true");
      toggle.textContent = "Fechar";
      var primeiro = $("a", lista);
      if (primeiro) primeiro.focus();
    });
    lista.addEventListener("click", function (e) { if (e.target.closest("a")) fecharMenu(false); });
    document.addEventListener("keydown", function (e) { if (e.key === "Escape") fecharMenu(true); });
    document.addEventListener("click", function (e) {
      if (!e.target.closest(".nav")) fecharMenu(false);
    });
    lista.addEventListener("focusout", function (e) {
      if (e.relatedTarget && !e.relatedTarget.closest(".nav")) fecharMenu(false);
    });
  }

  /* 4. Cartões empilhados -------------------------------------------------- */
  var pilha = $("[data-pilha]");
  var cartoes = $$("[data-cartao]");
  var trilhoLinks = $$("[data-trilho-item]");
  var topoH = 64;

  function encaixar() {
    // Um cartão só fica preso se couber inteiro entre o ponto em que gruda
    // (topo + degrau) e a base da janela. Se o conteúdo for mais alto (telas
    // baixas, fonte ampliada), todos seguem no fluxo normal: nada fica
    // escondido embaixo do cartão seguinte e o comportamento é uniforme.
    topoH = topo ? topo.offsetHeight : 64;
    var vh = window.innerHeight;
    var algumNaoCabe = false;
    cartoes.forEach(function (c) { c.classList.remove("is-fluxo"); });
    cartoes.forEach(function (c) {
      var topoPreso = parseFloat(getComputedStyle(c).top) || topoH;
      var texto = $(".cartao__texto", c);
      var transbordou = texto && texto.scrollHeight > texto.clientHeight + 2;
      if (topoPreso + c.offsetHeight > vh || transbordou) algumNaoCabe = true;
    });
    cartoes.forEach(function (c) { c.classList.toggle("is-fluxo", algumNaoCabe); });
  }

  var agendado = false;
  function profundidade() {
    agendado = false;
    var vh = window.innerHeight;
    var atual = 0;
    cartoes.forEach(function (c, i) {
      var folha = c.firstElementChild;
      var prox = cartoes[i + 1];
      var p = 0;
      if (prox && !reduz.matches && !c.classList.contains("is-fluxo") && !prox.classList.contains("is-fluxo")) {
        // p = quanto o próximo cartão já cobriu este (0 a 1)
        var rc = c.getBoundingClientRect();
        var rp = prox.getBoundingClientRect();
        var faixa = Math.max(rc.height, 1);
        p = Math.min(Math.max((rc.bottom - rp.top) / faixa, 0), 1);
      }
      folha.style.setProperty("--escala", (1 - p * 0.06).toFixed(4));
      folha.style.setProperty("--sombra", (p * 0.38).toFixed(3));
      // cartão "atual": o último cujo topo já passou de 55% da janela
      if (c.getBoundingClientRect().top < vh * 0.55) atual = i;
    });
    trilhoLinks.forEach(function (a, i) {
      a.classList.toggle("is-atual", i === atual);
      if (i === atual) a.setAttribute("aria-current", "step"); else a.removeAttribute("aria-current");
    });
    if (topo) topo.classList.toggle("is-rolado", window.scrollY > 8);
  }
  function agendar() {
    if (!agendado) { agendado = true; window.requestAnimationFrame(profundidade); }
  }

  if (pilha && cartoes.length) {
    encaixar();
    profundidade();
    window.addEventListener("scroll", agendar, { passive: true });
    var redimTimer;
    window.addEventListener("resize", function () {
      clearTimeout(redimTimer);
      redimTimer = setTimeout(function () { medirAviso(); encaixar(); profundidade(); }, 120);
    });
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(function () { encaixar(); profundidade(); });
    if (reduz.addEventListener) reduz.addEventListener("change", profundidade);
  }

  /* 5. Estado compartilhado ----------------------------------------------- */
  var estado = { care: null, extras: [], nome: "" };

  var radios = $$("[data-care-radio]");
  var detalhe = $("[data-detalhe]");
  var resumo = $("[data-resumo]");
  var extrasBox = $("[data-extras]");
  var campoNome = $("[data-nome]");
  var mensagemEl = $("[data-mensagem]");
  var enviar = $("[data-enviar]");
  var statusEl = $("[data-status]");
  var avisoDemo = $("[data-aviso-demo]");

  if (enviar) enviar.textContent = modoReal ? "Abrir conversa no WhatsApp" : "Copiar mensagem";
  if (avisoDemo) {
    if (modoReal) avisoDemo.hidden = true;
    else if (!demo) avisoDemo.textContent = "WhatsApp ainda não configurado: copie a mensagem e envie pelo canal de sua preferência.";
  }

  function montarMensagem() {
    var c = careById(estado.care);
    if (!c) return "";
    var linhas = [];
    linhas.push("Olá, " + ((CFG.brand && CFG.brand.greetingName) || "ENTRE.") + "!" + (estado.nome ? " Aqui é " + estado.nome + "." : ""));
    linhas.push("Gostaria de valorizar " + c.messageLabel + ".");
    if (estado.extras.length) {
      linhas.push("Tenho interesse em: " + juntar(estado.extras.map(minusculaInicial)) + ".");
    }
    linhas.push("Pode me contar como funciona e quais horários estão disponíveis?");
    return linhas.join("\n");
  }
  function minusculaInicial(s) {
    // "Brow lamination" e nomes próprios ficam como estão; o resto vira minúscula
    return /^[A-ZÀ-Ú][a-zà-ú]/.test(s) && !/^Brow /.test(s) ? s.charAt(0).toLowerCase() + s.slice(1) : s;
  }
  function juntar(arr) {
    if (arr.length < 2) return arr.join("");
    return arr.slice(0, -1).join(", ") + " e " + arr[arr.length - 1];
  }

  function renderExtras(c) {
    extrasBox.textContent = "";
    c.services.forEach(function (s, i) {
      var label = document.createElement("label");
      label.className = "chip";
      var input = document.createElement("input");
      input.type = "checkbox";
      input.value = s;
      input.name = "extra";
      input.id = "extra-" + c.id + "-" + i;
      input.checked = estado.extras.indexOf(s) > -1;
      input.addEventListener("change", function () {
        var pos = estado.extras.indexOf(s);
        if (input.checked && pos < 0) estado.extras.push(s);
        if (!input.checked && pos > -1) estado.extras.splice(pos, 1);
        render();
      });
      label.appendChild(input);
      label.appendChild(document.createTextNode(s));
      extrasBox.appendChild(label);
    });
  }

  /* Ponto único de mudança: cartões, trilho, rádios e mensagem leem daqui. */
  function setCare(id) {
    if (!careById(id)) return;
    if (estado.care !== id) {
      estado.care = id;
      estado.extras = [];
      renderExtras(careById(id));
    }
    render();
  }

  function render() {
    var c = careById(estado.care);
    cartoes.forEach(function (el) {
      var on = el.getAttribute("data-cartao") === estado.care;
      el.classList.toggle("is-escolhido", on);
      var b = $("[data-escolher]", el);
      if (b) {
        b.setAttribute("aria-pressed", on ? "true" : "false");
        b.textContent = on ? "Ir para a mensagem" : "Escolher " + careById(el.getAttribute("data-cartao")).title.toLowerCase();
      }
    });
    trilhoLinks.forEach(function (a) {
      a.classList.toggle("is-escolhido", a.getAttribute("data-trilho-item") === estado.care);
    });
    radios.forEach(function (r) { r.checked = r.value === estado.care; });

    if (c) {
      detalhe.hidden = false;
      resumo.textContent = c.summary;
      mensagemEl.textContent = montarMensagem();
      mensagemEl.classList.remove("is-vazio");
      enviar.disabled = false;
    } else {
      detalhe.hidden = true;
      mensagemEl.classList.add("is-vazio");
      enviar.disabled = true;
    }
    statusEl.textContent = "";
  }

  function irParaContato() {
    var alvo = $("#contato");
    var pergunta = $("#pergunta");
    if (!alvo) return;
    alvo.scrollIntoView({ behavior: reduz.matches ? "auto" : "smooth", block: "start" });
    if (pergunta) {
      setTimeout(function () { pergunta.focus({ preventScroll: true }); }, reduz.matches ? 0 : 600);
    }
  }

  $$("[data-escolher]").forEach(function (b) {
    b.addEventListener("click", function () {
      var id = b.getAttribute("data-escolher");
      if (estado.care === id) { irParaContato(); return; }
      setCare(id);
    });
  });

  radios.forEach(function (r) {
    r.addEventListener("change", function () { if (r.checked) setCare(r.value); });
  });

  if (campoNome) {
    campoNome.addEventListener("input", function () {
      estado.nome = campoNome.value.trim().replace(/\s+/g, " ").slice(0, 40);
      if (estado.care) { mensagemEl.textContent = montarMensagem(); statusEl.textContent = ""; }
    });
  }

  function copiarAntigo(texto) {
    var area = document.createElement("textarea");
    area.value = texto;
    area.setAttribute("readonly", "");
    area.style.cssText = "position:fixed;left:-9999px;top:0";
    document.body.appendChild(area);
    area.select();
    var feito = false;
    try { feito = document.execCommand("copy"); } catch (e) { feito = false; }
    document.body.removeChild(area);
    return feito;
  }
  // Área de transferência moderna -> método antigo -> (falha: o texto fica selecionado)
  function copiar(texto) {
    return new Promise(function (ok, falha) {
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(ok, function () { copiarAntigo(texto) ? ok() : falha(); });
      } else {
        copiarAntigo(texto) ? ok() : falha();
      }
    });
  }

  function selecionarMensagem() {
    var r = document.createRange();
    r.selectNodeContents(mensagemEl);
    var s = window.getSelection();
    s.removeAllRanges();
    s.addRange(r);
  }

  if (enviar) {
    enviar.addEventListener("click", function () {
      var texto = montarMensagem();
      if (!texto) return;
      if (modoReal) {
        window.open("https://wa.me/" + numero + "?text=" + encodeURIComponent(texto), "_blank", "noopener");
        statusEl.textContent = "Conversa aberta no WhatsApp em uma nova aba.";
        return;
      }
      copiar(texto).then(function () {
        statusEl.textContent = "Mensagem copiada.";
      }, function () {
        selecionarMensagem();
        statusEl.textContent = "Não foi possível copiar automaticamente. A mensagem está selecionada: use Ctrl+C (ou toque e segure).";
      });
    });
  }

  render();

  /* 6. Revelação do título de "O gesto" ----------------------------------- */
  var revela = $$("[data-revela]");
  if (revela.length && "IntersectionObserver" in window && !reduz.matches) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (e) {
        if (e.isIntersecting) { e.target.classList.add("is-visto"); io.unobserve(e.target); }
      });
    }, { rootMargin: "0px 0px -12% 0px" });
    revela.forEach(function (el) {
      // Só esconde se ainda estiver abaixo da dobra; se já estiver visível, fica como está
      if (el.getBoundingClientRect().top > window.innerHeight * 0.88) {
        el.classList.add("is-pronto");
        io.observe(el);
      }
    });
  }
})();
