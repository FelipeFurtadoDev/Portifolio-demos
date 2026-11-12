/* ==========================================================================
   CADÊNCIA · Estética facial — comportamento
   JavaScript puro, sem dependências.
   - seleção de até dois cuidados e bandeja de comparação
   - comparação em <dialog> (foco, Escape, retorno ao controle de origem)
   - cuidado de interesse compartilhado com a consulta de horário
   - mensagem montada somente com o que a pessoa informou
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.CADENCIA_CONFIG || {};
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  var careIndex = {};
  (CFG.cares || []).forEach(function (c) { careIndex[c.id] = c; });
  function title(id) { return careIndex[id] ? careIndex[id].title : id; }

  /* ---------- Aviso de demonstração ---------- */
  (function demoNotice() {
    var box = $("#aviso-demo");
    if (!box || !CFG.demo) return;
    if (!CFG.demo.enabled) { box.hidden = true; return; }
    var p = $("[data-demo-texto]", box);
    if (p && CFG.demo.notice) p.textContent = CFG.demo.notice;
  })();

  /* ---------- Imagens locais (opcional) ---------- */
  (function localImages() {
    if (!CFG.useLocalImages) return;
    $$("img[data-img]").forEach(function (img) {
      var key = img.dataset.img, ws = (img.dataset.ws || "").split(",");
      var remote = { src: img.getAttribute("src"), srcset: img.getAttribute("srcset") };
      var base = "assets/img/" + key;
      img.addEventListener("error", function once() {
        img.removeEventListener("error", once);
        img.setAttribute("srcset", remote.srcset);
        img.setAttribute("src", remote.src);
        console.warn("[CADÊNCIA] arquivo local ausente para", key, "- usando a CDN.");
      });
      img.setAttribute("srcset", ws.map(function (w) { return base + "-" + w + ".webp " + w + "w"; }).join(", "));
      img.setAttribute("src", base + "-" + (ws[1] || ws[0]) + ".webp");
    });
  })();

  /* ---------- Créditos ---------- */
  (function credits() {
    var ul = $("#creditos");
    if (!ul || !CFG.credits) return;
    CFG.credits.forEach(function (c) {
      var li = document.createElement("li");
      var a = document.createElement("a");
      a.href = "https://unsplash.com/photos/" + c.id;
      a.target = "_blank"; a.rel = "noopener noreferrer";
      a.textContent = "@" + c.user;
      var s = document.createElement("span");
      s.textContent = c.role + ": ";
      li.appendChild(s); li.appendChild(a);
      ul.appendChild(li);
    });
  })();

  /* ---------- Revelação breve das fotos ---------- */
  (function reveal() {
    var els = $$(".reveal");
    if (!els.length) return;
    if (reduce.matches || !("IntersectionObserver" in window)) { els.forEach(function (e) { e.classList.add("in"); }); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) { if (en.isIntersecting) { en.target.classList.add("in"); io.unobserve(en.target); } });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });
    els.forEach(function (e) { io.observe(e); });
    // rede de segurança: nada fica invisível se o observador não disparar
    window.setTimeout(function () { els.forEach(function (e) { e.classList.add("in"); }); }, 4000);
  })();

  /* ==========================================================================
     Estado: comparação e cuidado de interesse
     ========================================================================== */
  var state = { picked: [], pending: null, interest: null, interestFromMenu: false };

  var tray = $("#bandeja"), trayTxt = $("#bandeja-txt"), trayActions = $("#bandeja-acoes"), trayTroca = $("#bandeja-troca");
  var live = $("#comparar-status");
  var dlg = $("#comparacao");
  var pips = $$(".pips i");

  $$("[data-comparar]").forEach(function (b) { b.hidden = false; });
  if (tray) tray.hidden = false;

  function announce(msg) { if (live) { live.textContent = ""; window.setTimeout(function () { live.textContent = msg; }, 30); } }

  function mkBtn(label, cls, handler) {
    var b = document.createElement("button");
    b.type = "button"; b.className = "btn " + cls; b.textContent = label;
    b.addEventListener("click", handler);
    return b;
  }

  function togglePick(id) {
    var i = state.picked.indexOf(id);
    if (i > -1) {
      state.picked.splice(i, 1); state.pending = null;
      announce(title(id) + " removida da comparação. " + state.picked.length + " de 2 escolhidos.");
    } else if (state.picked.length < 2) {
      state.picked.push(id); state.pending = null;
      announce(title(id) + " adicionada. " + state.picked.length + " de 2 escolhidos.");
    } else {
      state.pending = id;
      announce("Limite de dois cuidados. Escolha qual substituir por " + title(id) + ".");
    }
    renderPick();
    if (state.pending) { var f = $("button", trayTroca); if (f) f.focus(); }
  }

  function renderPick() {
    // colunas e botões
    $$(".cuidado").forEach(function (art) {
      var id = art.dataset.care, on = state.picked.indexOf(id) > -1;
      art.classList.toggle("is-selecionado", on);
      var btn = $("[data-comparar]", art);
      if (btn) {
        btn.setAttribute("aria-pressed", on ? "true" : "false");
        $(".comparar__txt", btn).textContent = on ? "Na comparação" : "Comparar";
      }
    });
    // indicador
    pips.forEach(function (p, i) { p.classList.toggle("on", i < state.picked.length); });
    var n = state.picked.length;
    trayActions.textContent = "";
    var names = state.picked.map(title);
    if (n === 0) {
      trayTxt.innerHTML = "Compare até dois cuidados<small>Use o botão “Comparar” em cada cuidado.</small>";
      trayActions.appendChild(mkBtn("Ainda preciso de orientação", "btn--linha", function () { goToContact("orientacao"); }));
    } else if (n === 1) {
      trayTxt.innerHTML = "<span>1 de 2 escolhido: " + names[0] + "</span><small>Escolha mais um para comparar ou siga direto para o contato.</small>";
      trayActions.appendChild(mkBtn("Seguir para o contato", "btn--manteiga", function () { goToContact(state.picked[0]); }));
      trayActions.appendChild(mkBtn("Limpar", "btn--linha", clearPicks));
    } else {
      names = ordered().map(title);
      trayTxt.innerHTML = "<span>2 de 2 escolhidos: " + names[0] + " e " + names[1] + "</span><small>Pronto para comparar lado a lado.</small>";
      var go = mkBtn("Comparar agora", "btn--manteiga", openCompare);
      go.id = "abrir-comparacao";
      trayActions.appendChild(go);
      trayActions.appendChild(mkBtn("Limpar", "btn--linha", clearPicks));
    }
    // limite de dois
    trayTroca.textContent = "";
    if (state.pending) {
      trayTroca.hidden = false;
      var p = document.createElement("p");
      p.textContent = "O limite é de dois cuidados. Para incluir " + title(state.pending) + ", escolha qual tirar:";
      trayTroca.appendChild(p);
      state.picked.slice().forEach(function (old) {
        trayTroca.appendChild(mkBtn("Trocar " + title(old), "btn--manteiga", function () {
          var idx = state.picked.indexOf(old);
          state.picked[idx] = state.pending; state.pending = null;
          announce(title(old) + " trocada por " + title(state.picked[idx]) + ".");
          renderPick();
          var again = $("#abrir-comparacao"); if (again) again.focus();
        }));
      });
      trayTroca.appendChild(mkBtn("Cancelar", "btn--linha", function () { state.pending = null; renderPick(); }));
    } else {
      trayTroca.hidden = true;
    }
  }

  function clearPicks() { state.picked = []; state.pending = null; announce("Comparação limpa."); renderPick(); }

  $$("[data-comparar]").forEach(function (b) {
    b.addEventListener("click", function () { togglePick(b.dataset.comparar); });
  });

  /* ==========================================================================
     Comparação (dialog)
     ========================================================================== */
  var opener = null;

  function cell(id, key) {
    var art = document.getElementById("cuidado-" + id);
    var dd = art && $('[data-attr="' + key + '"]', art);
    return dd ? dd.cloneNode(true) : document.createTextNode("A confirmar na conversa");
  }

  function ordered() {
    return (CFG.cares || []).map(function (c) { return c.id; }).filter(function (id) { return state.picked.indexOf(id) > -1; });
  }

  function buildCompare() {
    var body = $("#comp-corpo");
    body.textContent = "";
    var table = document.createElement("table");
    table.className = "tab";
    var cap = document.createElement("caption");
    cap.textContent = "Os mesmos atributos para cada cuidado. Fotografias ilustrativas.";
    table.appendChild(cap);

    var thead = document.createElement("thead"), hr = document.createElement("tr");
    var corner = document.createElement("td"); corner.className = "tab__canto";
    var th0 = document.createElement("th"); th0.className = "tab__canto"; th0.scope = "col"; th0.innerHTML = '<span class="sr">Atributo</span>';
    hr.appendChild(th0);
    ordered().forEach(function (id) {
      var th = document.createElement("th"); th.scope = "col";
      var wrap = document.createElement("div"); wrap.className = "col-cab";
      var foto = document.createElement("div"); foto.className = "col-cab__foto"; foto.dataset.flip = id;
      var src = $("#cuidado-" + id + " .cuidado__foto img");
      if (src) {
        var im = document.createElement("img");
        im.src = src.currentSrc || src.src; im.alt = ""; im.width = 400; im.height = 400;
        im.style.objectPosition = src.style.objectPosition;
        foto.appendChild(im);
      }
      var nome = document.createElement("p"); nome.className = "col-cab__nome"; nome.textContent = title(id);
      var go = mkBtn("Consultar este cuidado", "btn--manteiga", function () { closeCompare(false); goToContact(id); });
      wrap.appendChild(foto); wrap.appendChild(nome); wrap.appendChild(go);
      th.appendChild(wrap); hr.appendChild(th);
    });
    thead.appendChild(hr); table.appendChild(thead);

    var tbody = document.createElement("tbody");
    (CFG.compareRows || []).forEach(function (row) {
      var tr = document.createElement("tr");
      var th = document.createElement("th"); th.scope = "row"; th.textContent = row.label; tr.appendChild(th);
      ordered().forEach(function (id) {
        var td = document.createElement("td");
        var src = cell(id, row.key);
        if (src.nodeType === 1) { while (src.firstChild) td.appendChild(src.firstChild); } else { td.appendChild(src); }
        tr.appendChild(td);
      });
      tbody.appendChild(tr);
    });
    table.appendChild(tbody);
    body.appendChild(table);
  }

  function openCompare() {
    if (state.picked.length !== 2 || !dlg) return;
    opener = document.activeElement;
    // posição das fotos no menu, antes de abrir
    var from = {};
    ordered().forEach(function (id) {
      var im = $("#cuidado-" + id + " .cuidado__foto");
      if (im) from[id] = im.getBoundingClientRect();
    });
    buildCompare();
    document.documentElement.classList.add("travado");
    if (typeof dlg.showModal === "function") dlg.showModal(); else dlg.setAttribute("open", "");
    // abertura: cada foto sai da sua posição no menu e assenta na coluna
    if (!reduce.matches && dlg.animate) {
      $$("[data-flip]", dlg).forEach(function (el) {
        var f = from[el.dataset.flip], t = el.getBoundingClientRect();
        if (!f || !t.width) return;
        var visible = f.bottom > 0 && f.top < window.innerHeight;
        if (!visible) return;
        var s = f.width / t.width;
        el.animate([
          { transform: "translate(" + (f.left - t.left) + "px," + (f.top - t.top) + "px) scale(" + s + ")", borderRadius: "18px" },
          { transform: "none", borderRadius: "14px" }
        ], { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)" });
      });
    }
    var close = $("#comp-fechar"); if (close) close.focus();
  }

  function closeCompare(returnFocus) {
    if (!dlg || !dlg.open) return;
    dlg.close();
    if (returnFocus !== false) restoreFocus();
  }

  function restoreFocus() {
    var target = opener && document.contains(opener) ? opener : $("#abrir-comparacao");
    if (target) target.focus();
  }

  if (dlg) {
    dlg.addEventListener("close", function () {
      document.documentElement.classList.remove("travado");
    });
    dlg.addEventListener("cancel", function () { window.setTimeout(restoreFocus, 0); }); // Escape
    dlg.addEventListener("click", function (e) { if (e.target === dlg) closeCompare(); });
    $("#comp-fechar").addEventListener("click", function () { closeCompare(); });
    $("#comp-voltar").addEventListener("click", function () { closeCompare(); });
    $("#comp-orientacao").addEventListener("click", function () { closeCompare(false); goToContact("orientacao"); });
  }

  /* ==========================================================================
     Cuidado de interesse, mensagem e contato
     ========================================================================== */
  var form = $("#form-horario");
  var out = $("#mensagem");
  var resumo = $("#interesse-resumo");
  var radios = $$('input[name="interesse"]');
  var aviso = $("#aviso-envio");
  var copyStatus = $("#copia-status");

  function setInterest(id, fromMenu) {
    state.interest = id || null;
    state.interestFromMenu = !!fromMenu;
    radios.forEach(function (r) { r.checked = (r.value === id); });
    renderContact();
  }

  function goToContact(id) {
    setInterest(id, true);
    var sec = $("#horario");
    if (sec) {
      var smooth = !reduce.matches;
      sec.scrollIntoView({ behavior: smooth ? "smooth" : "auto", block: "start" });
      window.setTimeout(function () {
        var chk = radios.filter(function (r) { return r.checked; })[0] || $("#f-nome");
        if (chk) chk.focus({ preventScroll: true });
      }, smooth ? 600 : 0);
    }
  }

  $$("[data-consultar]").forEach(function (a) {
    a.addEventListener("click", function (e) { e.preventDefault(); goToContact(a.dataset.consultar); });
  });

  radios.forEach(function (r) {
    r.addEventListener("change", function () { setInterest(r.value, false); });
  });

  function buildMessage() {
    var nome = ($("#f-nome").value || "").trim();
    var periodo = $("#f-periodo").value;
    var obs = ($("#f-obs").value || "").trim().replace(/\s+/g, " ");
    var parts = [];
    var brand = (CFG.brand && CFG.brand.name) || "CADÊNCIA";
    parts.push("Olá! Vim pelo site da " + brand + " e gostaria de consultar a disponibilidade de horários.");
    if (state.interest === "orientacao") {
      parts.push("Ainda preciso de orientação para escolher o cuidado.");
    } else if (state.interest && careIndex[state.interest]) {
      parts.push("Tenho interesse em " + careIndex[state.interest].label + ".");
    } else if (state.picked.length === 2) {
      parts.push("Estou em dúvida entre " + title(ordered()[0]).toLowerCase() + " e " + title(ordered()[1]).toLowerCase() + ".");
    }
    if (periodo) parts.push("Prefiro o período da " + periodo + ".");
    if (obs) parts.push("Observação: " + obs + (/[.!?]$/.test(obs) ? "" : "."));
    var msg = parts.join(" ");
    if (nome) msg += " Meu nome é " + nome + ".";
    return msg;
  }

  function renderContact() {
    if (state.interest === "orientacao") resumo.textContent = "Você escolheu pedir orientação. Se quiser, troque abaixo por um cuidado específico.";
    else if (state.interest) resumo.textContent = (state.interestFromMenu ? "Escolhido no menu: " : "Escolhido: ") + title(state.interest) + ". Você pode trocar abaixo.";
    else if (state.picked.length === 2) resumo.textContent = "Você comparou " + title(ordered()[0]) + " e " + title(ordered()[1]) + ". Escolha um abaixo ou consulte sem escolher.";
    else resumo.textContent = "Você pode consultar sem escolher um cuidado.";
    out.textContent = buildMessage();
  }

  ["input", "change"].forEach(function (ev) {
    form.addEventListener(ev, function (e) { if (e.target.name !== "interesse") renderContact(); });
  });

  function copyText(text) {
    if (navigator.clipboard && window.isSecureContext) return navigator.clipboard.writeText(text);
    return new Promise(function (res, rej) {
      var ta = document.createElement("textarea");
      ta.value = text; ta.setAttribute("readonly", ""); ta.style.cssText = "position:fixed;left:-9999px;top:0";
      document.body.appendChild(ta); ta.select();
      try { document.execCommand("copy") ? res() : rej(); } catch (err) { rej(err); } finally { document.body.removeChild(ta); }
    });
  }

  function flashCopy(ok) {
    copyStatus.textContent = "";
    window.setTimeout(function () {
      copyStatus.textContent = ok ? "Mensagem copiada." : "Não foi possível copiar automaticamente. Selecione o texto da mensagem e copie.";
    }, 30);
    var btn = $("#copiar");
    var old = btn.dataset.rotulo || (btn.dataset.rotulo = btn.textContent);
    btn.textContent = ok ? "Mensagem copiada" : old;
    window.setTimeout(function () { btn.textContent = old; }, 2200);
  }

  $("#copiar").addEventListener("click", function () {
    copyText(buildMessage()).then(function () { flashCopy(true); }, function () { flashCopy(false); });
  });

  function validWhats(n) { return /^\d{10,15}$/.test(String(n || "")); }

  form.addEventListener("submit", function (e) {
    e.preventDefault();
    var msg = buildMessage();
    out.textContent = msg;
    var demo = !CFG.demo || CFG.demo.enabled;
    var num = CFG.contact && CFG.contact.whatsapp;
    if (!demo && validWhats(num)) {
      aviso.hidden = true;
      window.open("https://wa.me/" + num + "?text=" + encodeURIComponent(msg), "_blank", "noopener");
      return;
    }
    aviso.hidden = false;
    aviso.textContent = demo
      ? (CFG.demo && CFG.demo.sendNotice) || "Demonstração: nada foi enviado. Copie a mensagem."
      : "O contato do estúdio ainda não foi configurado. Copie a mensagem e envie pelo canal de contato.";
  });

  /* ---------- Início ---------- */
  renderPick();
  renderContact();
})();
