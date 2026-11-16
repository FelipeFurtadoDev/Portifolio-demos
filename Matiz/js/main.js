/* ==========================================================================
   MATIZ · Estúdio de beleza — comportamento da página
   JavaScript puro, sem dependências. A página inteira continua legível sem
   este arquivo; aqui ficam: menu do topo, destaque dos atalhos, aproximação
   das fotos, mensagens por serviço, cópia no modo demonstração e dados
   vindos de js/config.js.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.MATIZ_CONFIG || {};
  var demo = cfg.demo || {};
  var contact = cfg.contact || {};

  /* ---------- Utilidades ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $all(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function clamp(v, min, max) { return Math.min(max, Math.max(min, v)); }

  var number = String(contact.whatsapp || "").replace(/\D/g, "");
  var hasNumber = /^55\d{10,11}$/.test(number);
  var isDemo = demo.enabled !== false || !hasNumber;   /* sem número válido, nunca abre conversa */

  function waUrl(text) {
    return "https://wa.me/" + number + "?text=" + encodeURIComponent(text);
  }
  function serviceMessage(nome) {
    var tpl = contact.serviceMessage || "Olá! Gostaria de agendar: {servico}.";
    return tpl.replace("{servico}", nome);
  }

  /* Cópia: API moderna, depois método antigo; devolve uma Promise<boolean>. */
  function copyText(text) {
    function legacy() {
      try {
        var ta = document.createElement("textarea");
        ta.value = text;
        ta.setAttribute("readonly", "");
        ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;";
        document.body.appendChild(ta);
        ta.select();
        ta.setSelectionRange(0, text.length);
        var ok = document.execCommand("copy");
        document.body.removeChild(ta);
        return ok;
      } catch (e) { return false; }
    }
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text).then(function () { return true; }, function () { return legacy(); });
    }
    return Promise.resolve(legacy());
  }

  /* ---------- Modo demonstração: faixa do topo ---------- */
  var demoBar = $("[data-demo-bar]");
  if (demoBar) {
    if (isDemo) {
      var demoText = $("[data-demo-text]", demoBar);
      if (demoText && demo.notice) demoText.textContent = demo.notice;
    } else {
      demoBar.hidden = true;
    }
  }

  /* ---------- Fotos locais (opcional) ---------- */
  if (cfg.useLocalImages && cfg.imageFiles) {
    $all("img[data-img]").forEach(function (img) {
      var info = cfg.imageFiles[img.getAttribute("data-img")];
      if (!info) return;
      var original = { src: img.getAttribute("src"), srcset: img.getAttribute("srcset") };
      var mid = info.larguras[Math.floor(info.larguras.length / 2)];
      img.addEventListener("error", function onError() {
        img.removeEventListener("error", onError);
        img.setAttribute("srcset", original.srcset);
        img.setAttribute("src", original.src);
      });
      img.setAttribute("srcset", info.larguras.map(function (w) { return "assets/img/" + info.nome + "-" + w + ".webp " + w + "w"; }).join(", "));
      img.setAttribute("src", "assets/img/" + info.nome + "-" + mid + ".webp");
    });
  }

  /* ---------- Menu do topo (celular) ---------- */
  (function nav() {
    var toggle = $("[data-nav-toggle]");
    var list = $("[data-nav-lista]");
    if (!toggle || !list) return;
    function setOpen(open, returnFocus) {
      toggle.setAttribute("aria-expanded", open ? "true" : "false");
      list.classList.toggle("is-open", open);
      if (open) { var first = $("a", list); if (first) first.focus(); }
      else if (returnFocus) { toggle.focus(); }
    }
    toggle.addEventListener("click", function () {
      setOpen(toggle.getAttribute("aria-expanded") !== "true", false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && list.classList.contains("is-open")) setOpen(false, true);
    });
    document.addEventListener("click", function (e) {
      if (!list.classList.contains("is-open")) return;
      if (!list.contains(e.target) && e.target !== toggle) setOpen(false, false);
    });
    list.addEventListener("click", function (e) {
      if (e.target.closest("a")) setOpen(false, false);
    });
    list.addEventListener("focusout", function (e) {
      if (!list.classList.contains("is-open")) return;
      var to = e.relatedTarget;
      if (to && !list.contains(to) && to !== toggle) setOpen(false, false);
    });
  })();

  /* ---------- Chamadas para o WhatsApp (abertura, topo, contato) ---------- */
  var greeting = contact.greeting || "Olá! Gostaria de consultar horários.";
  $all("[data-cta]").forEach(function (a) {
    if (isDemo) return;                                  /* demonstração: segue para #contato */
    a.href = waUrl(greeting);
    a.target = "_blank";
    a.rel = "noopener noreferrer";
  });

  /* ---------- Menu de serviços: preço, duração e pedido por serviço ---------- */
  var showPrices = cfg.showPrices !== false;
  var priceNote = $("[data-preco-nota]");
  var anyMeta = false;

  $all("[data-servico]").forEach(function (item) {
    var id = item.getAttribute("data-servico");
    var nome = item.getAttribute("data-nome") || "";
    var meta = $("[data-meta]", item);
    var info = (cfg.services || {})[id];
    if (showPrices && info && meta) {
      var parts = [];
      if (info.preco) parts.push(info.preco);
      if (info.duracao) parts.push(info.duracao);
      if (parts.length) { meta.textContent = parts.join(" · "); anyMeta = true; }
    }

    var btn = $("[data-pedir]", item);
    if (!btn) return;
    var msg = serviceMessage(nome);
    btn.setAttribute("aria-label", (isDemo ? (demo.sampleLabel || "Copiar mensagem de exemplo") : (demo.realLabel || "Pedir no WhatsApp")) + ": " + nome);
    btn.textContent = isDemo ? (demo.sampleLabel || "Copiar mensagem de exemplo") : (demo.realLabel || "Pedir no WhatsApp");

    if (!isDemo) {
      btn.href = waUrl(msg);
      btn.target = "_blank";
      btn.rel = "noopener noreferrer";
      return;
    }

    var out = $("[data-retorno]", item);
    btn.setAttribute("role", "button");
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      copyText(msg).then(function (ok) {
        if (!out) return;
        out.hidden = false;
        out.textContent = "";
        out.setAttribute("role", "status");
        var p = document.createElement("p");
        if (ok) {
          p.textContent = "Mensagem de exemplo copiada: “" + msg + "”. Nenhuma conversa foi aberta (demonstração).";
          out.appendChild(p);
        } else {
          p.textContent = "Não foi possível copiar automaticamente. Selecione o texto abaixo e copie (Ctrl+C, ou toque e segure no celular):";
          var ta = document.createElement("textarea");
          ta.readOnly = true;
          ta.rows = 3;
          ta.value = msg;
          ta.setAttribute("aria-label", "Mensagem de exemplo para copiar");
          out.appendChild(p);
          out.appendChild(ta);
          ta.focus();
          ta.select();
        }
      });
    });
  });
  if (priceNote && isDemo && anyMeta) priceNote.hidden = false;

  /* Destaque do atalho do grupo que está na tela (apoio à navegação). */
  (function atalhos() {
    var links = $all("[data-atalho]");
    var groups = $all("[data-grupo]");
    var bar = $("[data-atalhos]");
    if (!links.length || !groups.length || !bar) return;
    var ticking = false;
    function update() {
      ticking = false;
      var line = bar.getBoundingClientRect().bottom + 24;
      var current = null;
      groups.forEach(function (g) {
        var r = g.getBoundingClientRect();
        if (r.top <= line && r.bottom > line) current = g.id;
      });
      links.forEach(function (a) {
        if (a.getAttribute("data-atalho") === current) a.setAttribute("aria-current", "true");
        else a.removeAttribute("aria-current");
      });
    }
    function request() { if (!ticking) { ticking = true; requestAnimationFrame(update); } }
    window.addEventListener("scroll", request, { passive: true });
    window.addEventListener("resize", request);
    update();
  })();

  /* ---------- Detalhes do acabamento: aproximar dentro do mesmo quadro ---------- */
  $all("[data-detalhe]").forEach(function (fig) {
    var frame = $("[data-quadro]", fig);
    var img = frame && $("img", frame);
    var actions = $("[data-acao]", fig);
    var button = $("[data-zoom-botao]", fig);
    var state = $("[data-zoom-estado]", fig);
    if (!frame || !img || !actions || !button || !state) return;

    var focus = (fig.getAttribute("data-foco") || "0.5,0.5").split(",").map(parseFloat);
    var zoom = parseFloat(fig.getAttribute("data-zoom")) || 2.5;
    var label = fig.getAttribute("data-rotulo") || "o detalhe";
    var on = false;

    /* O ponto de foco vai para o centro do quadro, sem deixar borda vazia. */
    var tx = clamp((0.5 - zoom * focus[0]) * 100, (1 - zoom) * 100, 0);
    var ty = clamp((0.5 - zoom * focus[1]) * 100, (1 - zoom) * 100, 0);

    function render() {
      img.style.setProperty("--s", on ? zoom : 1);
      img.style.setProperty("--tx", on ? tx + "%" : "0%");
      img.style.setProperty("--ty", on ? ty + "%" : "0%");
      fig.classList.toggle("is-zoom", on);
      button.textContent = on ? "Ver foto inteira" : "Ver detalhe";
      state.textContent = on ? "Mostrando " + label + " ampliado" : "Mostrando a foto inteira";
    }
    actions.hidden = false;
    button.addEventListener("click", function () { on = !on; render(); });
    fig.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && on) { on = false; render(); button.focus(); }
    });
    render();
  });

  /* ---------- Visita: bairro, endereço e horários ---------- */
  (function visita() {
    var v = cfg.visit || {};
    var bairro = $("[data-visita-bairro]");
    var endereco = $("[data-visita-endereco]");
    var horarios = $("[data-visita-horarios]");
    var nota = $("[data-visita-nota]");
    var used = false;
    if (bairro && v.bairro) { bairro.textContent = v.bairro; used = true; }
    if (endereco && v.endereco) { endereco.textContent = v.endereco; used = true; }
    if (horarios && v.horarios && v.horarios.length) {
      horarios.textContent = "";
      v.horarios.forEach(function (h) {
        var s = document.createElement("span");
        s.textContent = h.dias + ": " + h.horas;
        horarios.appendChild(s);
      });
      used = true;
    }
    if (nota && used && isDemo) nota.hidden = false;
  })();

  /* ---------- Contato ---------- */
  (function contato() {
    var action = $("[data-contato-acao]");
    var box = $("[data-mensagem]");
    var rotulo = $("[data-msg-rotulo]");
    var status = $("[data-contato-status]");
    var manual = $("[data-contato-manual]");
    var area = $("#mensagem-manual");
    var aviso = $("[data-contato-aviso]");
    if (!action || !box) return;
    box.textContent = greeting;

    if (!isDemo) {
      action.textContent = "Ver horários no WhatsApp";
      action.href = waUrl(greeting);
      action.target = "_blank";
      action.rel = "noopener noreferrer";
      if (rotulo) rotulo.textContent = "Mensagem que será enviada";
      if (aviso) aviso.hidden = true;
      return;
    }
    action.textContent = demo.sampleLabel || "Copiar mensagem de exemplo";
    action.setAttribute("role", "button");
    action.addEventListener("click", function (e) {
      e.preventDefault();
      copyText(greeting).then(function (ok) {
        if (ok) {
          if (status) status.textContent = "Mensagem de exemplo copiada.";
          if (manual) manual.hidden = true;
        } else {
          if (status) status.textContent = "Não foi possível copiar automaticamente.";
          if (manual && area) {
            manual.hidden = false;
            area.value = greeting;
            area.focus();
            area.select();
          }
        }
      });
    });
  })();

  /* ---------- Rodapé: créditos das fotos ---------- */
  (function creditos() {
    var list = $("[data-creditos]");
    var credits = cfg.credits;
    if (!list || !credits || !credits.length) return;
    list.textContent = "";
    credits.forEach(function (c) {
      var li = document.createElement("li");
      li.appendChild(document.createTextNode(c.role + ": "));
      var a = document.createElement("a");
      a.href = c.url;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
      a.textContent = c.author + " (Unsplash)";
      li.appendChild(a);
      list.appendChild(li);
    });
  })();
})();
