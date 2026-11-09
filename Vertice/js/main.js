/* ==========================================================================
   VÉRTICE Detail Lab — comportamento
   1. Configuração → textos      5. Lâmpada de inspeção
   2. Modo demonstração           6. Formulário de orçamento
   3. Topo e menu móvel           7. Créditos e contato
   4. Imagens locais / remotas
   ========================================================================== */
(function () {
  "use strict";

  var CFG = window.VERTICE_CONFIG || {};
  var doc = document;
  var root = doc.documentElement;
  var reduzMovimento = window.matchMedia("(prefers-reduced-motion: reduce)");

  function $(sel, ctx) { return (ctx || doc).querySelector(sel); }
  function $$(sel, ctx) { return Array.prototype.slice.call((ctx || doc).querySelectorAll(sel)); }

  /* Lê "a.b.0.c" dentro do objeto de configuração. */
  function ler(caminho) {
    return caminho.split(".").reduce(function (obj, chave) {
      return obj == null ? undefined : obj[chave];
    }, CFG);
  }

  function escapar(txt) {
    return String(txt).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  }

  /* 1. Configuração → textos --------------------------------------------- */
  $$("[data-cfg]").forEach(function (el) {
    var valor = ler(el.getAttribute("data-cfg"));
    if (typeof valor === "string" && valor.trim() !== "") el.textContent = valor;
  });

  $$("[data-cfg-list]").forEach(function (el) {
    var itens = ler(el.getAttribute("data-cfg-list"));
    if (!Array.isArray(itens) || !itens.length) return;
    el.innerHTML = itens.map(function (t) { return "<li>" + escapar(t) + "</li>"; }).join("");
  });

  var listaEtapas = $("[data-process]");
  if (listaEtapas && Array.isArray(CFG.process) && CFG.process.length) {
    listaEtapas.innerHTML = CFG.process.map(function (t) { return "<li>" + escapar(t) + "</li>"; }).join("");
  }

  /* 2. Modo demonstração -------------------------------------------------- */
  var demo = !CFG.demo || CFG.demo.enabled !== false;
  var numero = String((CFG.contact && CFG.contact.whatsapp) || "").replace(/\D/g, "");
  var numeroValido = /^\d{10,15}$/.test(numero);
  var envioReal = !demo && numeroValido;

  $$("[data-demo-only]").forEach(function (el) { el.hidden = !demo; });

  function medirAviso() {
    var aviso = $(".aviso-demo");
    var h = aviso && !aviso.hidden ? aviso.offsetHeight : 0;
    root.style.setProperty("--aviso-h", h + "px");
  }
  medirAviso();
  window.addEventListener("resize", medirAviso);

  /* 3. Topo e menu móvel -------------------------------------------------- */
  // O topo é sempre sólido; só ganha uma sombra depois que a página rola.
  var topo = $("[data-topo]");
  function atualizarTopo() {
    if (topo) topo.classList.toggle("topo--rolado", window.scrollY > 8);
  }
  window.addEventListener("scroll", atualizarTopo, { passive: true });
  atualizarTopo();

  var botaoMenu = $("[data-menu-btn]");
  var menu = $("[data-menu]");
  var mqMenu = window.matchMedia("(max-width: 899px)");

  function focaveisMenu() {
    return [botaoMenu].concat($$("a, button", menu));
  }

  // O painel começa logo abaixo do topo. Com a faixa de demonstração
  // visível (rolagem no início), o topo está mais baixo que --topo-h.
  function posicionarMenu() {
    if (!topo) return;
    menu.style.top = Math.max(0, Math.round(topo.getBoundingClientRect().bottom)) + "px";
  }

  function abrirMenu() {
    posicionarMenu();
    menu.classList.add("menu--aberto");
    botaoMenu.setAttribute("aria-expanded", "true");
    botaoMenu.querySelector(".topo__menu-texto").textContent = "Fechar";
    doc.body.classList.add("menu-aberto");
    var primeiro = $("a", menu);
    if (primeiro) primeiro.focus();
  }

  function fecharMenu(devolverFoco) {
    menu.classList.remove("menu--aberto");
    botaoMenu.setAttribute("aria-expanded", "false");
    botaoMenu.querySelector(".topo__menu-texto").textContent = "Menu";
    doc.body.classList.remove("menu-aberto");
    if (devolverFoco) botaoMenu.focus();
  }

  if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", function () {
      if (menu.classList.contains("menu--aberto")) fecharMenu(false);
      else abrirMenu();
    });

    menu.addEventListener("click", function (ev) {
      if (ev.target.closest("a")) fecharMenu(false);
    });

    doc.addEventListener("keydown", function (ev) {
      if (!menu.classList.contains("menu--aberto")) return;
      if (ev.key === "Escape") {
        ev.preventDefault();
        fecharMenu(true);
        return;
      }
      if (ev.key === "Tab") {
        var itens = focaveisMenu();
        var primeiro = itens[0];
        var ultimo = itens[itens.length - 1];
        if (ev.shiftKey && doc.activeElement === primeiro) {
          ev.preventDefault();
          ultimo.focus();
        } else if (!ev.shiftKey && doc.activeElement === ultimo) {
          ev.preventDefault();
          primeiro.focus();
        }
      }
    });

    window.addEventListener("resize", function () {
      if (menu.classList.contains("menu--aberto")) posicionarMenu();
    });

    var aoMudarMenu = function () { if (!mqMenu.matches) fecharMenu(false); };
    if (mqMenu.addEventListener) mqMenu.addEventListener("change", aoMudarMenu);
    else if (mqMenu.addListener) mqMenu.addListener(aoMudarMenu);
  }

  /* 4. Imagens locais / remotas ------------------------------------------- */
  var imagens = CFG.images || {};

  function srcsetRemoto(info) {
    return info.widths.map(function (w) {
      return "https://images.unsplash.com/" + info.unsplash + "?w=" + w + "&q=70&auto=format&fit=crop " + w + "w";
    }).join(", ");
  }

  function usarRemota(img) {
    var info = imagens[img.getAttribute("data-img")];
    if (!info || !info.unsplash || img.dataset.remota) return;
    img.dataset.remota = "1";
    img.srcset = srcsetRemoto(info);
    img.src = "https://images.unsplash.com/" + info.unsplash + "?w=" + info.widths[info.widths.length - 1] + "&q=70&auto=format";
    if (window.console) console.warn("[VÉRTICE] Imagem local ausente, usando a versão remota:", info.file);
  }

  $$("img[data-img]").forEach(function (img) {
    if (CFG.useLocalImages === false) {
      usarRemota(img);
      return;
    }
    img.addEventListener("error", function () { usarRemota(img); });
    if (img.complete && img.naturalWidth === 0 && img.currentSrc) usarRemota(img);
  });

  /* 5. Lâmpada de inspeção ------------------------------------------------
     Uma única linha de luz (inclinada 12°) atravessa a mesa. Cada foto
     desenha o trecho que cai sobre ela, recebendo a posição em --x-px. */
  var mesa = $("[data-lampada]");
  var fotos = mesa ? $$(".amostra__foto", mesa) : [];

  if (mesa && fotos.length) {
    var INCLINACAO = Math.tan(12 * Math.PI / 180); // skewX(-12deg) no CSS
    var alvo = null;
    var quadro = null;

    // (x, y): ponto da tela por onde a linha deve passar.
    var posicionar = function (x, y) {
      fotos.forEach(function (foto) {
        var r = foto.getBoundingClientRect();
        // O pseudo-elemento é 25% mais largo de cada lado e 10% mais alto
        // de cada lado; a inclinação gira em torno do seu centro.
        var h = r.height * 1.2;
        var yLocal = y - (r.top - r.height * 0.1);
        var xLocal = x - r.left + r.width * 0.25 + (yLocal - h / 2) * INCLINACAO;
        foto.style.setProperty("--x-px", xLocal.toFixed(1) + "px");
      });
    };

    var centroMesaY = function () {
      var r = mesa.getBoundingClientRect();
      return r.top + Math.min(r.height, window.innerHeight) / 2;
    };

    mesa.addEventListener("pointermove", function (ev) {
      alvo = { x: ev.clientX, y: ev.clientY };
      if (!quadro) {
        quadro = requestAnimationFrame(function () {
          posicionar(alvo.x, alvo.y);
          quadro = null;
        });
      }
    });

    // Ao rolar, a linha acompanha a última posição conhecida.
    var repousoX = function () {
      var r = mesa.getBoundingClientRect();
      return r.left + r.width * 0.7;
    };
    var atualizarRepouso = function () {
      if (alvo) posicionar(alvo.x, alvo.y);
      else if (!varrendo) posicionar(repousoX(), centroMesaY());
    };
    var varrendo = false;
    window.addEventListener("scroll", function () { if (!quadro) quadro = requestAnimationFrame(function () { atualizarRepouso(); quadro = null; }); }, { passive: true });
    window.addEventListener("resize", atualizarRepouso);

    var podeVarrer = "IntersectionObserver" in window && !reduzMovimento.matches;
    if (podeVarrer) {
      // Começa fora das fotos; uma passagem automática quando a mesa aparece.
      posicionar(-9999, 0);
      varrendo = true;
      var obs = new IntersectionObserver(function (entradas) {
        entradas.forEach(function (en) {
          if (!en.isIntersecting) return;
          obs.disconnect();
          var inicio = null;
          var dur = 2200;
          var passo = function (t) {
            if (alvo) { varrendo = false; return; } // o usuário assumiu o controle
            if (!inicio) inicio = t;
            var p = Math.min((t - inicio) / dur, 1);
            var e = p < 0.5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2;
            var r = mesa.getBoundingClientRect();
            posicionar(r.left - r.width * 0.15 + e * r.width * 0.85, centroMesaY());
            if (p < 1) requestAnimationFrame(passo);
            else varrendo = false;
          };
          requestAnimationFrame(passo);
        });
      }, { threshold: 0.2 });
      obs.observe(mesa);
    } else {
      posicionar(repousoX(), centroMesaY());
    }
  }

  /* 6. Formulário de orçamento -------------------------------------------- */
  var form = $("[data-form]");

  var ICONES = {
    hatch:  '<path class="carroceria" d="M7 25 V20 Q8 17 13 16 L23 15 L31 9 Q33 8 37 8 L53 8 Q57 8 59 11 L63 16 Q66 18 66 21 V25 Z"/><circle class="roda" cx="20" cy="25" r="5"/><circle class="roda" cx="55" cy="25" r="5"/>',
    seda:   '<path class="carroceria" d="M3 25 V20 Q4 17 9 16 L22 15 L30 9 Q32 8 36 8 L50 8 Q54 8 57 11 L62 15 L72 16 Q76 17 76 20 V25 Z"/><circle class="roda" cx="18" cy="25" r="5"/><circle class="roda" cx="62" cy="25" r="5"/>',
    suv:    '<path class="carroceria" d="M4 25 V17 Q4 14 8 13 L18 12 L24 5 Q25 4 28 4 L65 4 Q69 4 71 8 L74 13 Q76 15 76 18 V25 Z"/><circle class="roda" cx="19" cy="25" r="5.5"/><circle class="roda" cx="62" cy="25" r="5.5"/>',
    picape: '<path class="carroceria" d="M3 25 V17 Q3 14 7 13 L17 12 L23 5 Q24 4 27 4 L42 4 Q44 4 44 6 V13 H77 V25 Z"/><circle class="roda" cx="17" cy="25" r="5.5"/><circle class="roda" cx="63" cy="25" r="5.5"/>',
    outro:  '<path class="carroceria tracejado" d="M5 25 V19 Q6 16 11 15 L23 14 L30 8 Q32 7 36 7 L52 7 Q56 7 58 10 L63 14 L71 15 Q75 16 75 19 V25 Z"/><circle class="roda tracejado" cx="19" cy="25" r="5"/><circle class="roda tracejado" cx="61" cy="25" r="5"/>'
  };

  if (form) {
    var cfgForm = CFG.form || {};
    var veiculos = cfgForm.vehicles || [];
    var servicos = CFG.services || [];
    var objetivos = cfgForm.goals || [];

    $("[data-vehicles]", form).innerHTML = veiculos.map(function (v) {
      return '<label class="escolha"><input type="radio" name="veiculo" value="' + escapar(v.id) + '" data-label="' + escapar(v.label) + '">' +
        '<span class="escolha__caixa"><svg viewBox="0 0 80 32" aria-hidden="true" focusable="false">' + (ICONES[v.id] || ICONES.outro) + "</svg>" +
        "<span>" + escapar(v.label) + "</span></span></label>";
    }).join("");

    $("[data-services]", form).innerHTML = servicos.map(function (s) {
      return '<label class="opcao"><input type="checkbox" name="servicos" value="' + escapar(s.id) + '" data-label="' + escapar(s.name) + '">' +
        '<span class="opcao__caixa"><span class="opcao__marca" aria-hidden="true"></span><span class="opcao__texto">' + escapar(s.name) +
        '<span class="opcao__sub">' + escapar(s.area || "") + "</span></span></span></label>";
    }).join("");

    $("[data-goals]", form).innerHTML = objetivos.map(function (g, i) {
      return '<label class="opcao opcao--radio"><input type="radio" name="objetivo" value="' + i + '" data-label="' + escapar(g) + '">' +
        '<span class="opcao__caixa"><span class="opcao__marca" aria-hidden="true"></span><span class="opcao__texto">' + escapar(g) + "</span></span></label>";
    }).join("");

    var previa = $("[data-preview]");
    var botaoEnviar = $("[data-submit]", form);
    var statusDemo = $("[data-demo-status]", form);
    var resumoErro = $("[data-resumo-erro]", form);
    var botaoCopiar = $("[data-copy]", form);
    var statusCopia = $("[data-copy-status]", form);
    var tentouEnviar = false;

    botaoEnviar.textContent = envioReal ? "Enviar pelo WhatsApp" : "Preparar mensagem";
    var destino = $("[data-previa-destino]");
    if (destino && !envioReal) destino.textContent = "WhatsApp da VÉRTICE (não configurado nesta demonstração)";

    var dados = function () {
      var veic = $('input[name="veiculo"]:checked', form);
      var obj = $('input[name="objetivo"]:checked', form);
      return {
        veiculo: veic ? veic.getAttribute("data-label") : "",
        modelo: form.elements.modelo.value.trim(),
        servicos: $$('input[name="servicos"]:checked', form).map(function (c) { return c.getAttribute("data-label"); }),
        objetivo: obj ? obj.getAttribute("data-label") : "",
        nome: form.elements.nome.value.trim(),
        obs: form.elements.obs.value.trim()
      };
    };

    var montarMensagem = function (d, rascunho) {
      var falta = function (t) { return rascunho ? "[" + t + "]" : ""; };
      var nomeMarca = (CFG.brand && CFG.brand.greetingName) || "VÉRTICE Detail Lab";
      var linhas = [
        "Olá, " + nomeMarca + "! Gostaria de um orçamento.",
        "",
        "*Veículo:* " + (d.veiculo ? d.veiculo + (d.modelo ? " (" + d.modelo + ")" : "") : falta("escolha o veículo")),
        "*Serviços:* " + (d.servicos.length ? d.servicos.join(", ") : falta("escolha um ou mais serviços")),
        "*Objetivo:* " + (d.objetivo || falta("escolha o objetivo"))
      ];
      if (d.obs) linhas.push("*Observações:* " + d.obs);
      linhas.push("", "Nome: " + (d.nome || falta("seu nome")));
      if (cfgForm.closingLine) linhas.push("", cfgForm.closingLine);
      return linhas.join("\n");
    };

    var atualizarPrevia = function () {
      var d = dados();
      var vazio = !d.veiculo && !d.servicos.length && !d.objetivo && !d.nome && !d.obs && !d.modelo;
      previa.classList.toggle("is-vazio", vazio);
      previa.textContent = vazio
        ? "Escolha o veículo e os serviços para montar a mensagem."
        : montarMensagem(d, true);
    };

    var mostrarErro = function (campo, msg) {
      var p = $('[data-erro="' + campo + '"]', form);
      var bloco = $('[data-field="' + campo + '"]', form);
      if (p) {
        p.textContent = msg || "";
        p.hidden = !msg;
      }
      if (bloco) {
        if (msg) bloco.setAttribute("data-invalido", "");
        else bloco.removeAttribute("data-invalido");
      }
      if (campo === "nome") {
        var input = form.elements.nome;
        if (msg) input.setAttribute("aria-invalid", "true");
        else input.removeAttribute("aria-invalid");
      }
    };

    var validar = function () {
      var d = dados();
      var erros = [];
      var regras = [
        ["veiculo", !d.veiculo, "Escolha o tipo de veículo.", 'input[name="veiculo"]'],
        ["servicos", !d.servicos.length, "Marque pelo menos um serviço.", 'input[name="servicos"]'],
        ["objetivo", !d.objetivo, "Escolha o objetivo principal.", 'input[name="objetivo"]'],
        ["nome", d.nome.length < 2, "Informe seu nome (pelo menos 2 letras).", 'input[name="nome"]']
      ];
      regras.forEach(function (r) {
        mostrarErro(r[0], r[1] ? r[2] : "");
        if (r[1]) erros.push(r);
      });
      return erros;
    };

    form.addEventListener("input", function () {
      atualizarPrevia();
      if (tentouEnviar) {
        var erros = validar();
        resumoErro.hidden = !erros.length;
        if (!erros.length) resumoErro.textContent = "";
      }
      statusDemo.hidden = true;
    });
    form.addEventListener("change", function () {
      atualizarPrevia();
      if (tentouEnviar) validar();
    });

    form.addEventListener("submit", function (ev) {
      ev.preventDefault();
      tentouEnviar = true;
      var erros = validar();
      if (erros.length) {
        resumoErro.textContent = erros.length === 1
          ? "Falta 1 informação para montar o pedido."
          : "Faltam " + erros.length + " informações para montar o pedido.";
        resumoErro.hidden = false;
        statusDemo.hidden = true;
        var primeiro = $(erros[0][3], form);
        if (primeiro) primeiro.focus();
        return;
      }
      resumoErro.hidden = true;
      var mensagem = montarMensagem(dados(), false);
      previa.textContent = mensagem;
      previa.classList.remove("is-vazio");

      if (envioReal) {
        var url = "https://wa.me/" + numero + "?text=" + encodeURIComponent(mensagem);
        var janela = window.open(url, "_blank", "noopener");
        if (!janela) window.location.href = url;
        return;
      }

      // Demonstração: nada é enviado.
      statusDemo.hidden = false;
      statusCopia.textContent = "";
      statusDemo.setAttribute("tabindex", "-1");
      statusDemo.focus({ preventScroll: true });
      var previaBox = $(".previa");
      if (previaBox && window.matchMedia("(max-width: 899px)").matches) {
        previaBox.scrollIntoView({ behavior: reduzMovimento.matches ? "auto" : "smooth", block: "start" });
      }
    });

    botaoCopiar.addEventListener("click", function () {
      var texto = previa.textContent;
      var ok = function () { statusCopia.textContent = "Mensagem copiada."; };
      var alternativa = function () {
        var sel = window.getSelection();
        var range = doc.createRange();
        range.selectNodeContents(previa);
        sel.removeAllRanges();
        sel.addRange(range);
        var copiou = false;
        try { copiou = doc.execCommand("copy"); } catch (e) { copiou = false; }
        statusCopia.textContent = copiou ? "Mensagem copiada." : "Texto selecionado. Use Ctrl+C (ou Copiar) para copiar.";
      };
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(texto).then(ok, alternativa);
      } else {
        alternativa();
      }
    });

    // "Incluir no orçamento" nos serviços: marca a opção correspondente.
    $$("[data-add-service]").forEach(function (link) {
      link.addEventListener("click", function () {
        var id = link.getAttribute("data-add-service");
        var caixa = $('input[name="servicos"][value="' + id + '"]', form);
        if (!caixa) return;
        caixa.checked = true;
        atualizarPrevia();
        if (tentouEnviar) validar();
        // Depois da rolagem pela âncora, leva o foco ao primeiro passo.
        setTimeout(function () {
          var veic = $('input[name="veiculo"]:checked', form) || $('input[name="veiculo"]', form);
          if (veic) veic.focus({ preventScroll: true });
        }, reduzMovimento.matches ? 0 : 500);
      });
    });

    atualizarPrevia();
  }

  /* 7. Créditos e contato ------------------------------------------------- */
  var listaCreditos = $("[data-credits]");
  if (listaCreditos) {
    listaCreditos.innerHTML = Object.keys(imagens).map(function (k) {
      var i = imagens[k];
      return "<li>" + escapar(i.use) + ': <a href="' + escapar(i.page) + '" target="_blank" rel="noopener">' + escapar(i.author) + "</a></li>";
    }).join("");
  }

  var insta = CFG.contact && CFG.contact.instagram;
  if (insta) {
    var li = $("[data-instagram]");
    var a = $("[data-instagram-link]");
    if (li && a) {
      a.href = "https://www.instagram.com/" + encodeURIComponent(insta.replace(/^@/, "")) + "/";
      li.hidden = false;
    }
  }

  var linhaWhats = $("[data-whatsapp-text]");
  if (linhaWhats) {
    if (envioReal) {
      var n = numero.replace(/^55/, "");
      linhaWhats.textContent = n.length === 11
        ? "(" + n.slice(0, 2) + ") " + n.slice(2, 7) + "-" + n.slice(7)
        : numero;
    } else {
      linhaWhats.textContent = "número não configurado (demonstração)";
    }
  }
})();
