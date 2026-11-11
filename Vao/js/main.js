/* ==========================================================================
   VÃO · Banho e Tosa — comportamento
   1. Dados do config.js (faixa de demonstração, contato, horários, créditos)
   2. "Sua visita": sanfona no celular, lista + painel estável no desktop
   3. Botão de contato (demonstração ou WhatsApp real)
   4. Fotos locais opcionais
   Sem dependências. Se este arquivo falhar, a página continua completa:
   as três etapas aparecem abertas e os dados de contato estão no HTML.
   ========================================================================== */
(function () {
  "use strict";

  var cfg = window.VAO_CONFIG || {};
  var demo = cfg.demo || { enabled: true };
  var contact = cfg.contact || {};

  /* ---------- utilidades ---------- */
  function $(sel, root) { return (root || document).querySelector(sel); }
  function $$(sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); }
  function el(tag, attrs, text) {
    var n = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { n.setAttribute(k, attrs[k]); });
    if (text != null) n.textContent = text;
    return n;
  }
  function validPhone(v) { return /^55\d{10,11}$/.test(String(v || "")); }

  /* ======================================================================
     1. Dados do config
     ====================================================================== */
  function applyConfig() {
    var bar = $("[data-demo-bar]");
    if (bar) {
      if (demo.enabled) {
        if (demo.notice) $("[data-demo-text]", bar).textContent = demo.notice;
      } else {
        bar.hidden = true;
      }
    }

    var end = $("[data-endereco]");
    if (end && contact.address) {
      end.textContent = "";
      end.appendChild(document.createTextNode(contact.address));
      if (contact.district) {
        end.appendChild(el("br"));
        end.appendChild(document.createTextNode(contact.district));
      }
      if (contact.mapsUrl) {
        end.appendChild(el("br"));
        end.appendChild(el("a", { href: contact.mapsUrl, target: "_blank", rel: "noopener" }, "Abrir no mapa"));
      }
    }
    var endNota = $("[data-endereco-nota]");
    if (endNota) {
      endNota.textContent = contact.addressNote || "";
      endNota.hidden = !contact.addressNote;
    }

    var hours = cfg.hours;
    var dl = $("[data-horarios]");
    if (dl && hours && hours.rows && hours.rows.length) {
      dl.textContent = "";
      hours.rows.forEach(function (r) {
        var row = el("div");
        row.appendChild(el("dt", null, r.days));
        row.appendChild(el("dd", null, r.time));
        dl.appendChild(row);
      });
    }
    var hNota = $("[data-horarios-nota]");
    if (hNota && hours) {
      hNota.textContent = hours.note || "";
      hNota.hidden = !hours.note;
    }

    if (contact.instagram) {
      var dados = $("[data-contato-dados]");
      var bloco = el("div", { class: "dado" });
      bloco.appendChild(el("h3", { class: "dado__titulo" }, "Instagram"));
      var p = el("p", { class: "dado__linha" });
      p.appendChild(el("a", { href: "https://instagram.com/" + contact.instagram, target: "_blank", rel: "noopener" }, "@" + contact.instagram));
      bloco.appendChild(p);
      dados.appendChild(bloco);
    }

    var cred = $("[data-creditos]");
    if (cred && cfg.credits && cfg.credits.length) {
      cred.textContent = "Fotos via Unsplash (Licença Unsplash): ";
      cfg.credits.forEach(function (c, i) {
        if (i) cred.appendChild(document.createTextNode(i === cfg.credits.length - 1 ? " e " : ", "));
        cred.appendChild(el("a", { href: c.url, target: "_blank", rel: "noopener" }, c.author));
        cred.appendChild(document.createTextNode(" (" + c.role.toLowerCase() + ")"));
      });
      cred.appendChild(document.createTextNode("."));
    }
  }

  /* ======================================================================
     2. Sua visita, do começo ao fim
     Padrão: sanfona (APG Accordion). Cada etapa tem um botão com
     aria-expanded, dentro de um h3, e um painel role="region".
     - < 900px: cada botão abre e fecha a própria etapa (várias podem
       ficar abertas). O conteúdo aparece logo abaixo do botão.
     - >= 900px: sempre há exatamente uma etapa aberta; os botões viram a
       lista lateral e o painel ocupa uma área de tamanho fixo.
     Teclado: Enter/Espaço abrem; ↑ ↓ Home End movem o foco entre etapas.
     ====================================================================== */
  function setupEtapas() {
    var root = $("[data-etapas]");
    if (!root) return;
    var buttons = $$("[data-etapa]", root);
    var panels = buttons.map(function (b) { return document.getElementById(b.getAttribute("aria-controls")); });
    var desktop = window.matchMedia("(min-width: 900px)");
    var lastOpened = 0;

    function set(i, open) {
      buttons[i].setAttribute("aria-expanded", open ? "true" : "false");
      panels[i].classList.toggle("is-open", open);
    }
    function isOpen(i) { return buttons[i].getAttribute("aria-expanded") === "true"; }
    function only(i) {
      buttons.forEach(function (_, j) { set(j, j === i); });
      lastOpened = i;
    }

    // Estado inicial: Chegada aberta, as outras fechadas.
    only(0);

    buttons.forEach(function (btn, i) {
      btn.addEventListener("click", function () {
        if (desktop.matches) {
          if (!isOpen(i)) only(i);
        } else {
          var open = !isOpen(i);
          set(i, open);
          if (open) lastOpened = i;
        }
      });
      btn.addEventListener("keydown", function (e) {
        var n = buttons.length, to = null;
        if (e.key === "ArrowDown") to = (i + 1) % n;
        else if (e.key === "ArrowUp") to = (i - 1 + n) % n;
        else if (e.key === "Home") to = 0;
        else if (e.key === "End") to = n - 1;
        if (to !== null) { e.preventDefault(); buttons[to].focus(); }
      });
    });

    // Ao passar para o desktop, mantém só uma etapa aberta: a última que a
    // pessoa abriu, se ainda estiver aberta; senão a primeira aberta; senão Chegada.
    function onChange() {
      if (!desktop.matches) return;
      var open = buttons.map(function (_, j) { return isOpen(j); });
      var keep = open[lastOpened] ? lastOpened : open.indexOf(true);
      only(keep < 0 ? 0 : keep);
    }
    if (desktop.addEventListener) desktop.addEventListener("change", onChange);
    else if (desktop.addListener) desktop.addListener(onChange);
  }

  /* ======================================================================
     3. Contato
     ====================================================================== */
  function setupContato() {
    var btn = $("[data-contato]");
    var aviso = $("[data-contato-aviso]");
    var retorno = $("[data-contato-retorno]");
    if (!btn) return;
    if (contact.buttonLabel) btn.textContent = contact.buttonLabel;

    var live = !demo.enabled && validPhone(contact.whatsapp);

    if (live) {
      // Versão comercial: o botão vira link real para o WhatsApp do estúdio.
      var a = el("a", {
        class: btn.className,
        href: "https://wa.me/" + contact.whatsapp + "?text=" + encodeURIComponent(contact.message || ""),
        target: "_blank",
        rel: "noopener"
      }, btn.textContent);
      btn.replaceWith(a);
      if (aviso) aviso.hidden = true;
      return;
    }

    if (aviso && demo.contactNotice) aviso.textContent = demo.contactNotice;

    btn.addEventListener("click", function () {
      var msg = demo.enabled
        ? "Nada foi aberto nem enviado. Na versão do estúdio, este botão abre o WhatsApp com a pergunta sobre horários já escrita."
        : "O WhatsApp do estúdio ainda não foi configurado. Nenhuma mensagem foi enviada.";
      // Limpa e preenche de novo para que leitores de tela anunciem a cada clique.
      retorno.textContent = "";
      window.setTimeout(function () { retorno.textContent = msg; }, 60);
      if (!demo.enabled && window.console) console.warn("VÃO: contact.whatsapp vazio ou inválido em js/config.js.");
    });
  }

  /* ======================================================================
     4. Fotos locais (opcional)
     assets/img/<nome>-<largura>.webp. Se um arquivo faltar, volta para a CDN.
     ====================================================================== */
  function setupLocalImages() {
    if (!cfg.useLocalImages) return;
    var widths = { capa: [800, 1600], chegada: [800, 1200], cuidado: [800, 1200], retirada: [800, 1200] };
    $$("img[data-img]").forEach(function (img) {
      var name = img.getAttribute("data-img");
      var w = widths[name];
      if (!w) return;
      var cdn = { src: img.getAttribute("src"), srcset: img.getAttribute("srcset") };
      var base = "assets/img/" + name + "-";
      img.addEventListener("error", function handler() {
        img.removeEventListener("error", handler);
        if (window.console) console.warn("VÃO: foto local ausente (" + base + "*.webp). Usando a CDN.");
        img.setAttribute("srcset", cdn.srcset);
        img.setAttribute("src", cdn.src);
      });
      img.setAttribute("srcset", w.map(function (x) { return base + x + ".webp " + x + "w"; }).join(", "));
      img.setAttribute("src", base + w[0] + ".webp");
    });
  }

  applyConfig();
  setupEtapas();
  setupContato();
  setupLocalImages();
})();
