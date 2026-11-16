/* ==========================================================================
   PÁTIO · Estética automotiva com hora marcada
   JavaScript puro, sem dependências. Os dados vêm de js/config.js.
   Módulos: menu · aviso de demonstração · WhatsApp · estúdio (endereço,
   horários e etapas) · perguntas frequentes · créditos · fotos locais.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.PATIO_CONFIG || {};
  var contact = cfg.contact || {};
  var demo = cfg.demo || {};

  function $(sel, ctx) { return (ctx || document).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); }
  function el(tag, cls, text) {
    var n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  }

  /* ---------------------------------------------------------------- Menu */
  (function menu() {
    var botao = $(".menu-botao");
    var nav = $("#menu-principal");
    if (!botao || !nav) return;
    var texto = $(".menu-botao__texto", botao);
    var largo = window.matchMedia("(min-width: 900px)");

    function definir(aberto) {
      nav.classList.toggle("is-open", aberto);
      botao.setAttribute("aria-expanded", aberto ? "true" : "false");
      if (texto) texto.textContent = aberto ? "Fechar" : "Menu";
    }

    botao.addEventListener("click", function () {
      definir(botao.getAttribute("aria-expanded") !== "true");
    });
    $$("a", nav).forEach(function (a) {
      a.addEventListener("click", function () { definir(false); });
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && botao.getAttribute("aria-expanded") === "true") {
        definir(false);
        botao.focus();
      }
    });
    function sincronizar() { if (largo.matches) definir(false); }
    if (largo.addEventListener) largo.addEventListener("change", sincronizar);
    else if (largo.addListener) largo.addListener(sincronizar);
  })();

  /* ------------------------------------------------ Aviso de demonstração */
  (function aviso() {
    $$("[data-demo-aviso]").forEach(function (n) {
      if (demo.enabled === false) { n.hidden = true; return; }
      if (demo.notice) n.textContent = demo.notice;
    });
  })();

  /* ------------------------------------------------------------ WhatsApp */
  var numero = String(contact.whatsapp || "").replace(/\D/g, "");
  var numeroValido = /^55\d{10,11}$/.test(numero);
  var whatsappAtivo = numeroValido && demo.enabled === false;

  function mensagemPara(tipo) {
    if (tipo === "entrega") return contact.deliveryMessage || contact.greeting || "";
    var nomes = cfg.services || {};
    if (nomes[tipo] && contact.serviceMessage) {
      return contact.serviceMessage.replace("{servico}", nomes[tipo]);
    }
    return contact.greeting || "";
  }
  function urlWhatsapp(msg) {
    return "https://wa.me/" + numero + "?text=" + encodeURIComponent(msg);
  }

  var dialogo = $("#demo-dialogo");
  var dialogoMsg = dialogo && $("[data-demo-mensagem]", dialogo);
  var dialogoEstado = dialogo && $("[data-demo-estado]", dialogo);
  var botaoCopiar = dialogo && $("[data-demo-copiar]", dialogo);
  var textoAtual = "";

  function abrirDemonstracao(msg) {
    textoAtual = msg;
    if (!dialogo) { window.prompt("Mensagem de exemplo (o WhatsApp não está configurado):", msg); return; }
    dialogoMsg.textContent = msg;
    dialogoEstado.textContent = "";
    if (typeof dialogo.showModal === "function") dialogo.showModal();
    else dialogo.setAttribute("open", "");
    if (botaoCopiar) botaoCopiar.focus();
  }

  function copiar(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto);
    }
    return new Promise(function (ok, erro) {
      var area = document.createElement("textarea");
      area.value = texto;
      area.setAttribute("readonly", "");
      area.style.cssText = "position:fixed;left:-9999px;top:0";
      document.body.appendChild(area);
      area.select();
      var certo = false;
      try { certo = document.execCommand("copy"); } catch (e) { certo = false; }
      document.body.removeChild(area);
      certo ? ok() : erro(new Error("cópia indisponível"));
    });
  }

  if (dialogo) {
    if (botaoCopiar) {
      botaoCopiar.textContent = demo.copyLabel || botaoCopiar.textContent;
      botaoCopiar.addEventListener("click", function () {
        copiar(textoAtual).then(function () {
          dialogoEstado.textContent = "Mensagem copiada.";
        }, function () {
          dialogoEstado.textContent = "Não foi possível copiar. Selecione o texto acima e copie.";
        });
      });
    }
    dialogo.addEventListener("click", function (e) {
      if (e.target === dialogo) dialogo.close();
    });
  }

  $$("[data-wa]").forEach(function (a) {
    var msg = mensagemPara(a.getAttribute("data-wa"));
    a.setAttribute("data-mensagem", msg);
    if (whatsappAtivo) {
      a.href = urlWhatsapp(msg);
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } else {
      a.addEventListener("click", function (e) {
        e.preventDefault();
        abrirDemonstracao(msg);
      });
    }
  });

  $$("[data-wa-estado]").forEach(function (n) {
    n.hidden = whatsappAtivo;
  });

  /* ------------------------------------------ Estúdio: dados e etapas */
  (function estudio() {
    var st = cfg.studio || {};
    $$("[data-demo-dados]").forEach(function (n) { n.hidden = !st.demo; });
    $$("[data-estudio-nota]").forEach(function (n) { if (st.note) n.textContent = st.note; });

    var raiz = $("[data-estudio]");
    if (raiz) {
      var cab = el("h3", "estudio__sub", "Endereço");
      var end = el("address", "estudio__endereco");
      (st.addressLines || []).forEach(function (linha, i) {
        if (i) end.appendChild(document.createElement("br"));
        end.appendChild(document.createTextNode(linha));
      });
      raiz.appendChild(cab);
      raiz.appendChild(end);
      if (st.reference) raiz.appendChild(el("p", "estudio__referencia", st.reference));

      if (st.hours && st.hours.length) {
        raiz.appendChild(el("h3", "estudio__sub", "Horários"));
        var dl = el("dl", "horarios");
        st.hours.forEach(function (h) {
          var linha = el("div", "horarios__linha");
          linha.appendChild(el("dt", null, h.days));
          linha.appendChild(el("dd", null, h.time));
          dl.appendChild(linha);
        });
        raiz.appendChild(dl);
      }
    }

    var lista = $("[data-chegada]");
    if (lista && st.steps) {
      st.steps.forEach(function (p) {
        var li = el("li", "chegada__item");
        li.appendChild(el("h4", "chegada__titulo", p.title));
        li.appendChild(el("p", "chegada__texto", p.text));
        lista.appendChild(li);
      });
    }
  })();

  /* ------------------------------------------- Perguntas frequentes */
  (function perguntas() {
    var raiz = $("[data-faq]");
    if (!raiz) return;
    var itens = $$(".faq__item", raiz).map(function (item) {
      return { raiz: item, botao: $(".faq__botao", item) };
    });

    function definir(item, aberto) {
      item.raiz.classList.toggle("is-aberta", aberto);
      item.botao.setAttribute("aria-expanded", aberto ? "true" : "false");
    }
    itens.forEach(function (item, n) {
      definir(item, n === 0);
      item.botao.addEventListener("click", function () {
        definir(item, item.botao.getAttribute("aria-expanded") !== "true");
      });
    });

    /* Setas, Home e End percorrem as perguntas (padrão de acordeão). */
    raiz.addEventListener("keydown", function (e) {
      var botoes = itens.map(function (i) { return i.botao; });
      var pos = botoes.indexOf(document.activeElement);
      if (pos < 0) return;
      var destino = null;
      if (e.key === "ArrowDown") destino = botoes[(pos + 1) % botoes.length];
      else if (e.key === "ArrowUp") destino = botoes[(pos - 1 + botoes.length) % botoes.length];
      else if (e.key === "Home") destino = botoes[0];
      else if (e.key === "End") destino = botoes[botoes.length - 1];
      if (destino) { e.preventDefault(); destino.focus(); }
    });
  })();

  /* ------------------------------------------------------------ Créditos */
  (function creditos() {
    var ul = $("[data-creditos]");
    if (!ul || !cfg.credits) return;
    cfg.credits.forEach(function (c) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(c.role + ": "));
      var a = el("a", null, c.author);
      a.href = "https://unsplash.com/photos/" + c.id;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      li.appendChild(a);
      ul.appendChild(li);
    });
  })();

  /* ----------------------------------------------------------- Fotos locais */
  (function fotosLocais() {
    if (!cfg.useLocalImages) return;
    $$("img[data-img]").forEach(function (img) {
      var nome = img.getAttribute("data-img");
      var larguras = cfg.imageFiles && cfg.imageFiles[nome];
      if (!larguras) return;
      var origem = { src: img.getAttribute("src"), srcset: img.getAttribute("srcset") };
      img.addEventListener("error", function () {
        img.setAttribute("srcset", origem.srcset);
        img.setAttribute("src", origem.src);
      }, { once: true });
      img.setAttribute("srcset", larguras.map(function (w) {
        return "assets/img/" + nome + "-" + w + ".webp " + w + "w";
      }).join(", "));
      img.setAttribute("src", "assets/img/" + nome + "-" + larguras[Math.floor(larguras.length / 2)] + ".webp");
    });
  })();
})();
