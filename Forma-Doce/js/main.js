/* ==========================================================================
   FORMA DOCE — comportamento da página
   - Textos e contatos a partir do config
   - Menu móvel
   - Filtro de cardápio por ocasião
   - Formulário de pedido com prévia, validação e mensagem para WhatsApp
   ========================================================================== */
(function () {
  "use strict";

  var CONFIG = window.FORMA_DOCE_CONFIG;
  if (!CONFIG) {
    console.error("Forma Doce: js/config.js não foi carregado.");
    return;
  }

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };

  var DEMO = !!(CONFIG.demo && CONFIG.demo.enabled);
  var PHONE = String((CONFIG.contact && CONFIG.contact.whatsapp) || "").replace(/\D/g, "");
  /* Número válido: DDI 55 + DDD (2) + 8 ou 9 dígitos */
  var PHONE_OK = /^55\d{10,11}$/.test(PHONE);

  var productById = {};
  CONFIG.products.forEach(function (p) { productById[p.id] = p; });
  var occasionById = {};
  CONFIG.occasions.forEach(function (o) { occasionById[o.id] = o; });

  /* ---------------------------------------------------------------------
     1. Textos vindos do config
     --------------------------------------------------------------------- */
  function getPath(obj, path) {
    return path.split(".").reduce(function (acc, key) {
      return acc && acc[key] !== undefined ? acc[key] : undefined;
    }, obj);
  }

  $$("[data-config]").forEach(function (el) {
    var value = getPath(CONFIG, el.getAttribute("data-config"));
    if (typeof value === "string" && value) el.textContent = value;
  });

  if (!DEMO) {
    $$("[data-demo-only]").forEach(function (el) { el.remove(); });
  }

  /* Contatos */
  var waTarget = $('[data-contact="whatsapp"]');
  if (waTarget) {
    if (PHONE_OK) {
      var a = document.createElement("a");
      a.href = "https://wa.me/" + PHONE;
      a.target = "_blank";
      a.rel = "noopener";
      a.textContent = formatPhone(PHONE);
      waTarget.textContent = "";
      waTarget.appendChild(a);
    } else {
      waTarget.textContent = DEMO
        ? "Número ainda não configurado neste site demonstrativo."
        : "Número em atualização. Use o formulário de pedido.";
    }
  }

  var ig = String((CONFIG.contact && CONFIG.contact.instagram) || "").replace(/^@/, "");
  var igRow = $('[data-contact-row="instagram"]');
  if (ig && igRow) {
    var link = document.createElement("a");
    link.href = "https://instagram.com/" + encodeURIComponent(ig);
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "@" + ig;
    $('[data-contact="instagram"]').appendChild(link);
    igRow.hidden = false;
  }

  /* Créditos das fotos com link */
  var creditsEl = $('[data-render="credits"]');
  if (creditsEl && CONFIG.photoCredits && CONFIG.photoCredits.length) {
    var seen = {};
    var unique = CONFIG.photoCredits.filter(function (c) {
      if (seen[c.author]) return false;
      seen[c.author] = true;
      return true;
    });
    creditsEl.textContent = "";
    unique.forEach(function (c, i) {
      if (i > 0) creditsEl.appendChild(document.createTextNode(i === unique.length - 1 ? " e " : ", "));
      var l = document.createElement("a");
      l.href = c.url;
      l.target = "_blank";
      l.rel = "noopener";
      l.textContent = c.author;
      creditsEl.appendChild(l);
    });
  }

  function formatPhone(digits) {
    var n = digits.replace(/^55/, "");
    var ddd = n.slice(0, 2);
    var rest = n.slice(2);
    var cut = rest.length - 4;
    return "(" + ddd + ") " + rest.slice(0, cut) + "-" + rest.slice(cut);
  }

  /* ---------------------------------------------------------------------
     2. Menu móvel
     --------------------------------------------------------------------- */
  var toggle = $(".menu-toggle");
  var nav = $("#menu-principal");

  function setMenu(open) {
    toggle.setAttribute("aria-expanded", String(open));
    nav.classList.toggle("is-open", open);
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (e) {
      if (e.target.closest("a")) setMenu(false);
    });
    document.addEventListener("keydown", function (e) {
      if (e.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
    document.addEventListener("click", function (e) {
      if (toggle.getAttribute("aria-expanded") === "true" && !e.target.closest(".site-header")) setMenu(false);
    });
    window.matchMedia("(min-width: 900px)").addEventListener("change", function (mq) {
      if (mq.matches) setMenu(false);
    });
  }

  /* ---------------------------------------------------------------------
     3. Formulário: opções vindas do config
     --------------------------------------------------------------------- */
  var form = $("#order-form");
  var choicesBox = $('[data-render="product-choices"]');
  var occasionSelect = $('[data-render="occasion-options"]');

  if (choicesBox) {
    choicesBox.textContent = "";
    CONFIG.products.forEach(function (p, i) {
      var label = document.createElement("label");
      label.className = "choice";
      var input = document.createElement("input");
      input.type = "radio";
      input.name = "produto";
      input.value = p.id;
      if (i === 0) input.required = true;
      var span = document.createElement("span");
      span.textContent = p.name;
      label.appendChild(input);
      label.appendChild(span);
      choicesBox.appendChild(label);
    });
  }

  if (occasionSelect) {
    CONFIG.occasions.forEach(function (o) {
      var opt = document.createElement("option");
      opt.value = o.id;
      opt.textContent = o.name;
      occasionSelect.appendChild(opt);
    });
    var other = document.createElement("option");
    other.value = "outra";
    other.textContent = "Outra ocasião";
    occasionSelect.appendChild(other);
  }

  /* Data mínima: amanhã (a data é só uma preferência) */
  var dateInput = $("#f-data");
  function isoDate(d) {
    var m = String(d.getMonth() + 1).padStart(2, "0");
    var day = String(d.getDate()).padStart(2, "0");
    return d.getFullYear() + "-" + m + "-" + day;
  }
  var tomorrow = new Date();
  tomorrow.setHours(0, 0, 0, 0);
  tomorrow.setDate(tomorrow.getDate() + 1);
  if (dateInput) dateInput.min = isoDate(tomorrow);

  /* ---------------------------------------------------------------------
     4. Filtro por ocasião
     --------------------------------------------------------------------- */
  var stickers = $$("[data-occasion]");
  var dishes = $$("[data-product-card]");
  var statusText = $("[data-occasion-status]");
  var clearBtn = $("[data-occasion-clear]");
  var jumpLink = $("[data-occasion-jump]");
  var activeOccasion = "";

  function applyOccasion(id, opts) {
    activeOccasion = id;
    stickers.forEach(function (s) {
      s.setAttribute("aria-pressed", String(s.getAttribute("data-occasion") === id));
    });

    var matches = 0;
    dishes.forEach(function (d) {
      var list = (d.getAttribute("data-occasions") || "").split(/\s+/);
      var match = !id || list.indexOf(id) !== -1;
      if (id && match) matches++;
      d.classList.toggle("is-muted", !match);
      d.classList.toggle("is-match", !!id && match);
    });

    if (statusText) {
      statusText.textContent = id
        ? "Ocasião: " + occasionById[id].name + ". " + matches + (matches === 1 ? " linha do cardápio combina" : " linhas do cardápio combinam") + " com ela e aparecem em destaque."
        : "Nenhuma ocasião escolhida: o cardápio mostra tudo.";
    }
    if (clearBtn) clearBtn.hidden = !id;
    if (jumpLink) jumpLink.hidden = !id;

    if (occasionSelect && !(opts && opts.keepForm)) {
      occasionSelect.value = id || "";
      updatePreview();
    }
  }

  stickers.forEach(function (s) {
    s.addEventListener("click", function () {
      var id = s.getAttribute("data-occasion");
      applyOccasion(activeOccasion === id ? "" : id);
    });
  });
  if (clearBtn) {
    clearBtn.addEventListener("click", function () {
      applyOccasion("");
      var first = stickers[0];
      if (first) first.focus();
    });
  }

  /* Botões do cardápio pré-selecionam o produto */
  $$("[data-product]").forEach(function (btn) {
    btn.addEventListener("click", function () {
      selectProduct(btn.getAttribute("data-product"));
    });
  });

  function selectProduct(id) {
    var radio = form && form.querySelector('input[name="produto"][value="' + id + '"]');
    if (!radio) return;
    radio.checked = true;
    onProductChange();
    clearError("produto");
  }

  /* ---------------------------------------------------------------------
     5. Formulário: unidade, prévia e validação
     --------------------------------------------------------------------- */
  var qtyInput = $("#f-qtd");
  var qtyLabel = $("[data-qty-label]");
  var qtyHint = $("[data-qty-hint]");
  var preview = $("[data-preview]");
  var summary = $("[data-form-summary]");

  function currentProduct() {
    var r = form && form.querySelector('input[name="produto"]:checked');
    return r ? productById[r.value] : null;
  }

  function onProductChange() {
    var p = currentProduct();
    if (p) {
      qtyLabel.textContent = p.qtyLabel;
      qtyHint.textContent = p.qtyHint;
      qtyInput.min = p.qtyMin;
      qtyInput.max = p.qtyMax;
    }
    updatePreview();
  }

  function formatDate(iso) {
    if (!iso) return "";
    var parts = iso.split("-");
    var d = new Date(Number(parts[0]), Number(parts[1]) - 1, Number(parts[2]));
    var weekday = d.toLocaleDateString("pt-BR", { weekday: "long" });
    return parts[2] + "/" + parts[1] + "/" + parts[0] + " (" + weekday + ")";
  }

  function buildMessage() {
    var data = new FormData(form);
    var p = currentProduct();
    var occasion = data.get("ocasiao");
    var occasionName = occasion === "outra" ? "Outra ocasião" : (occasionById[occasion] ? occasionById[occasion].name : "");
    var qty = String(data.get("quantidade") || "").trim();
    var obs = String(data.get("observacoes") || "").trim();
    var name = String(data.get("nome") || "").trim();

    var lines = ["Olá, " + CONFIG.brand.name + "! Gostaria de pedir um orçamento.", ""];
    lines.push("• Produto: " + (p ? p.name : "—"));
    if (occasionName) lines.push("• Ocasião: " + occasionName);
    lines.push("• Data desejada: " + (data.get("data") ? formatDate(data.get("data")) : "—"));
    lines.push("• Quantidade: " + (qty ? "cerca de " + qty + (p ? " " + p.qtyUnit : "") : "—"));
    if (obs) lines.push("• Preferências: " + obs);
    lines.push("");
    lines.push("Meu nome: " + (name || "—"));
    lines.push("Sei que o pedido só fica confirmado depois de combinarmos os detalhes.");
    return lines.join("\n");
  }

  function updatePreview() {
    if (preview && form) preview.textContent = buildMessage();
  }

  function setError(name, message) {
    var errEl = form.querySelector('[data-error-for="' + name + '"]');
    if (errEl) errEl.textContent = message;
    if (name === "produto") {
      form.querySelector(".field--choices").setAttribute("aria-invalid", "true");
    } else {
      var field = form.elements[name];
      if (field) field.setAttribute("aria-invalid", "true");
    }
  }

  function clearError(name) {
    var errEl = form.querySelector('[data-error-for="' + name + '"]');
    if (errEl) errEl.textContent = "";
    if (name === "produto") {
      form.querySelector(".field--choices").removeAttribute("aria-invalid");
    } else {
      var field = form.elements[name];
      if (field) field.removeAttribute("aria-invalid");
    }
  }

  function validate() {
    var errors = [];
    var p = currentProduct();

    if (!p) {
      setError("produto", "Escolha o que você quer encomendar.");
      errors.push("produto");
    } else clearError("produto");

    var dateVal = dateInput.value;
    if (!dateVal) {
      setError("data", "Informe a data em que você precisa da encomenda.");
      errors.push("data");
    } else if (dateVal < dateInput.min) {
      setError("data", "Escolha uma data a partir de amanhã.");
      errors.push("data");
    } else clearError("data");

    var qtyRaw = qtyInput.value.trim();
    var qty = Number(qtyRaw);
    var min = p ? p.qtyMin : 1;
    var max = p ? p.qtyMax : 5000;
    if (!qtyRaw) {
      setError("quantidade", "Informe uma quantidade aproximada.");
      errors.push("quantidade");
    } else if (!Number.isInteger(qty) || qty < min || qty > max) {
      setError("quantidade", "Use um número inteiro entre " + min + " e " + max + ". Para quantidades maiores, conte nas preferências.");
      errors.push("quantidade");
    } else clearError("quantidade");

    var name = form.elements.nome.value.trim();
    if (name.length < 2) {
      setError("nome", "Informe seu nome para a mensagem.");
      errors.push("nome");
    } else clearError("nome");

    return errors;
  }

  if (form) {
    form.addEventListener("change", function (e) {
      if (e.target.name === "produto") {
        onProductChange();
        clearError("produto");
      }
      if (e.target.name === "ocasiao") {
        var v = e.target.value;
        if (!v || occasionById[v]) applyOccasion(v, { keepForm: true });
      }
    });
    form.addEventListener("input", function (e) {
      updatePreview();
      if (e.target.name && e.target.getAttribute("aria-invalid") === "true") clearError(e.target.name);
      if (summary && !summary.hidden) summary.hidden = true;
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var errors = validate();
      if (errors.length) {
        summary.textContent = errors.length === 1
          ? "Falta um campo obrigatório. Confira o campo destacado."
          : "Faltam " + errors.length + " campos obrigatórios. Confira os campos destacados.";
        summary.hidden = false;
        var first = errors[0] === "produto"
          ? form.querySelector('input[name="produto"]')
          : form.elements[errors[0]];
        if (first) first.focus();
        return;
      }
      summary.hidden = true;
      var message = buildMessage();

      if (!DEMO && PHONE_OK) {
        window.open("https://wa.me/" + PHONE + "?text=" + encodeURIComponent(message), "_blank", "noopener");
        return;
      }
      openDialog(message);
    });

    updatePreview();
  }

  /* ---------------------------------------------------------------------
     6. Aviso do modo demonstração / número não configurado
     --------------------------------------------------------------------- */
  var dialog = $("#order-dialog");
  var lastFocus = null;

  function openDialog(message) {
    $("[data-modal-text]").textContent = DEMO
      ? "Este é um site demonstrativo e o número de WhatsApp não está configurado, por isso nada foi enviado. Esta é a mensagem que seria aberta no WhatsApp da confeitaria:"
      : "O número de WhatsApp ainda não foi configurado, por isso nada foi enviado. Copie a mensagem e envie pelo canal de contato da confeitaria:";
    $("[data-modal-message]").textContent = message;
    $("[data-copy-feedback]").textContent = "";
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === "function") {
      dialog.showModal();
      $("[data-copy]", dialog).focus();
    } else {
      window.alert($("[data-modal-text]").textContent + "\n\n" + message);
    }
  }

  if (dialog) {
    $("[data-close]", dialog).addEventListener("click", function () { dialog.close(); });
    dialog.addEventListener("close", function () {
      if (lastFocus && lastFocus.focus) lastFocus.focus();
    });
    dialog.addEventListener("click", function (e) {
      if (e.target === dialog) dialog.close();
    });
    $("[data-copy]", dialog).addEventListener("click", function () {
      var text = $("[data-modal-message]").textContent;
      var feedback = $("[data-copy-feedback]");
      copyText(text).then(function () {
        feedback.textContent = "Mensagem copiada.";
      }, function () {
        feedback.textContent = "Não foi possível copiar automaticamente. Selecione o texto acima e copie.";
      });
    });
  }

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(text);
    }
    return new Promise(function (resolve, reject) {
      var ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.select();
      var ok = false;
      try { ok = document.execCommand("copy"); } catch (err) { ok = false; }
      document.body.removeChild(ta);
      if (ok) resolve(); else reject();
    });
  }
})();
