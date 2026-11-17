/* ==========================================================================
   PINGO · Banho & Tosa
   JavaScript puro, sem dependências. Os dados vêm de js/config.js.
   Módulos: aviso de demonstração · WhatsApp · menu de serviços (itens que
   abrem e fecham de forma independente) · ficha do cão (formulário que monta
   a mensagem) · endereço e horários · créditos · fotos locais.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.PINGO_CONFIG || {};
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

  /* ------------------------------------------------ Aviso de demonstração */
  $$("[data-demo-aviso]").forEach(function (n) {
    if (demo.enabled === false) { n.hidden = true; return; }
    if (demo.notice) n.textContent = demo.notice;
  });

  /* ------------------------------------------------------------ WhatsApp */
  var numero = String(contact.whatsapp || "").replace(/\D/g, "");
  var numeroValido = /^55\d{10,11}$/.test(numero);
  var whatsappAtivo = numeroValido && demo.enabled === false;

  function mensagemPara(tipo) {
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
    $$("[data-demo-fechar]", dialogo).forEach(function (b) {
      b.addEventListener("click", function () { dialogo.close(); });
    });
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

  $$("[data-msg-geral]").forEach(function (n) { if (contact.greeting) n.textContent = contact.greeting; });
  $$("[data-wa-estado]").forEach(function (n) { n.hidden = whatsappAtivo; });

  /* ----------------------------------------------- Menu de serviços (itens) */
  (function menuServicos() {
    var itens = $$(".item").map(function (item) {
      return { raiz: item, botao: $(".item__botao", item), texto: $(".item__acao-texto", item) };
    });
    if (!itens.length) return;

    function definir(item, aberto) {
      item.raiz.classList.toggle("is-aberto", aberto);
      item.botao.setAttribute("aria-expanded", aberto ? "true" : "false");
      if (item.texto) item.texto.textContent = aberto ? "Fechar" : "Ver o que inclui";
    }
    itens.forEach(function (item, n) {
      definir(item, n === 0);
      item.botao.addEventListener("click", function () {
        definir(item, item.botao.getAttribute("aria-expanded") !== "true");
      });
    });

    /* Setas, Home e End percorrem as linhas; cada linha abre sozinha. */
    $(".quadro").addEventListener("keydown", function (e) {
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

    /* Links do mini-menu da capa (#servico-...) abrem a linha correspondente. */
    $$('a[href^="#servico-"]').forEach(function (a) {
      a.addEventListener("click", function () {
        var alvo = document.getElementById(a.getAttribute("href").slice(1));
        itens.forEach(function (item) { if (item.raiz === alvo) definir(item, true); });
      });
    });
  })();

  /* -------------------------------- Ficha do cão: formulário que monta a mensagem */
  (function ficha() {
    var form = $("[data-ficha]");
    if (!form) return;
    form.noValidate = true; /* a validação é nossa; sem JS valem os campos required do navegador */

    var estado = $("[data-ficha-estado]", form);
    var grupos = $$("[data-grupo]", form).map(function (campo) {
      return {
        campo: campo,
        rotulo: campo.getAttribute("data-rotulo-msg"),
        radios: $$('input[type="radio"]', campo),
        erro: $("[data-erro]", campo),
        descricao: campo.getAttribute("aria-describedby") || ""
      };
    });

    function resposta(g) {
      for (var i = 0; i < g.radios.length; i++) if (g.radios[i].checked) return g.radios[i].value;
      return "";
    }
    function marcar(g, invalido) {
      g.campo.classList.toggle("is-invalido", invalido);
      g.erro.hidden = !invalido;
      /* a orientação só entra na descrição do grupo enquanto estiver visível */
      g.campo.setAttribute("aria-describedby", invalido ? (g.descricao + " " + g.erro.id).trim() : g.descricao);
    }
    function mensagem() {
      var m = contact.fichaMessage || {};
      var linhas = [m.intro || "Olá, PINGO! Gostaria de consultar os serviços e horários para meu cão."];
      grupos.forEach(function (g) { linhas.push(g.rotulo + " — " + resposta(g)); });
      linhas.push(m.closing || "Podem me orientar sobre o serviço mais adequado e a disponibilidade?");
      return linhas.join("\n");
    }

    /* Escolher uma opção limpa a orientação daquele grupo. */
    form.addEventListener("change", function () {
      grupos.forEach(function (g) { if (resposta(g)) marcar(g, false); });
      estado.textContent = "";
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var faltando = grupos.filter(function (g) { return !resposta(g); });
      grupos.forEach(function (g) { marcar(g, faltando.indexOf(g) >= 0); });
      if (faltando.length) {
        estado.textContent = "";
        faltando[0].radios[0].focus();
        return;
      }
      var msg = mensagem();
      if (whatsappAtivo) {
        var a = document.createElement("a");
        a.href = urlWhatsapp(msg);
        a.target = "_blank";
        a.rel = "noopener noreferrer";
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        estado.textContent = "Abrindo o WhatsApp com as informações escolhidas.";
      } else {
        estado.textContent = "";
        abrirDemonstracao(msg);
      }
    });
  })();

  /* ----------------------------------------- Endereço, horários e mensagem */
  (function estudio() {
    var st = cfg.studio || {};
    $$("[data-demo-dados]").forEach(function (n) { n.hidden = !st.demo; });
    $$("[data-estudio-nota]").forEach(function (n) { if (st.note) n.textContent = st.note; });

    var raiz = $("[data-estudio]");
    if (!raiz || !st.addressLines) return;
    while (raiz.firstChild) raiz.removeChild(raiz.firstChild);

    var bloco = el("div");
    bloco.appendChild(el("h3", null, "Endereço"));
    var end = el("address");
    st.addressLines.forEach(function (linha, i) {
      if (i) end.appendChild(document.createElement("br"));
      end.appendChild(document.createTextNode(linha));
    });
    bloco.appendChild(end);
    if (st.reference) bloco.appendChild(el("p", "ref", st.reference));
    raiz.appendChild(bloco);

    if (st.hours && st.hours.length) {
      var horas = el("div");
      horas.appendChild(el("h3", null, "Horários"));
      var dl = el("dl", "horarios");
      st.hours.forEach(function (h) {
        var linha = el("div", "horarios__linha");
        linha.appendChild(el("dt", null, h.days));
        linha.appendChild(el("dd", null, h.time));
        dl.appendChild(linha);
      });
      horas.appendChild(dl);
      raiz.appendChild(horas);
    }
  })();

  /* ------------------------------------------------------------ Créditos */
  (function creditos() {
    var ul = $("[data-creditos]");
    if (!ul || !cfg.credits) return;
    while (ul.firstChild) ul.removeChild(ul.firstChild);
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
