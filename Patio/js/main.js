/* ==========================================================================
   PÁTIO · Estética automotiva móvel
   JavaScript puro, sem dependências. Os dados vêm de js/config.js.
   Módulos: menu · aviso de demonstração · WhatsApp · lista de bairros ·
   créditos · fotos locais.
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
    if (tipo === "bairro") return contact.neighborhoodMessage || contact.greeting || "";
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

  /* ----------------------------------------------- Bairros por região */
  (function cobertura() {
    var cob = cfg.coverage || {};
    var raiz = $("[data-regioes]");
    var regioes = cob.regions || [];

    $$("[data-demo-dados]").forEach(function (n) { n.hidden = !cob.demo; });
    $$("[data-cobertura-nota]").forEach(function (n) { if (cob.note) n.textContent = cob.note; });

    var lista = $("[data-condicoes]");
    if (lista && cob.conditions) {
      cob.conditions.forEach(function (c) {
        var li = el("li", "condicao");
        li.appendChild(el("h3", "condicao__titulo", c.title));
        li.appendChild(el("p", "condicao__texto", c.text));
        lista.appendChild(li);
      });
    }

    if (!raiz || !regioes.length) return;
    var itens = [];

    function definir(item, aberto) {
      item.raiz.classList.toggle("is-aberta", aberto);
      item.botao.setAttribute("aria-expanded", aberto ? "true" : "false");
      item.estado.textContent = aberto ? "Aberta" : "Ver bairros";
    }
    function alternar(alvo) {
      var abrir = !alvo.raiz.classList.contains("is-aberta");
      itens.forEach(function (i) { definir(i, i === alvo ? abrir : false); });
    }

    regioes.forEach(function (r, n) {
      var raizItem = el("div", "regiao");
      var h = el("h3", "regiao__titulo");
      var botao = el("button", "regiao__botao");
      botao.type = "button";
      botao.id = "regiao-botao-" + n;
      botao.setAttribute("aria-controls", "regiao-painel-" + n);

      var nome = el("span", "regiao__nome", r.name);
      var qtd = el("span", "regiao__qtd", r.areas.length + (r.areas.length === 1 ? " bairro" : " bairros"));
      var estado = el("span", "regiao__estado", "Ver bairros");
      var icone = el("span", "regiao__icone");
      icone.setAttribute("aria-hidden", "true");
      botao.appendChild(nome);
      botao.appendChild(qtd);
      botao.appendChild(estado);
      botao.appendChild(icone);
      h.appendChild(botao);

      var painel = el("div", "regiao__painel");
      painel.id = "regiao-painel-" + n;
      painel.setAttribute("role", "region");
      painel.setAttribute("aria-labelledby", botao.id);
      var miolo = el("div", "regiao__miolo");
      var ul = el("ul", "regiao__bairros");
      r.areas.forEach(function (b) { ul.appendChild(el("li", null, b)); });
      miolo.appendChild(ul);
      painel.appendChild(miolo);

      raizItem.appendChild(h);
      raizItem.appendChild(painel);
      raiz.appendChild(raizItem);

      var item = { raiz: raizItem, botao: botao, estado: estado };
      itens.push(item);
      definir(item, n === 0);
      botao.addEventListener("click", function () { alternar(item); });
    });

    /* Setas, Home e End percorrem os títulos (padrão de acordeão). */
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
