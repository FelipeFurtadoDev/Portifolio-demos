/* ==========================================================================
   ORLA Pedra & Projeto — comportamento da página
   Lê window.ORLA_CONFIG (js/config.js) e monta aplicações, amostruário,
   contato e o pedido de orçamento.
   ========================================================================== */
(function () {
  'use strict';

  var cfg = window.ORLA_CONFIG;
  if (!cfg) { console.error('ORLA: js/config.js não foi carregado.'); return; }

  var $ = function (sel, ctx) { return (ctx || document).querySelector(sel); };
  var $$ = function (sel, ctx) { return Array.prototype.slice.call((ctx || document).querySelectorAll(sel)); };
  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');
  var isDemo = !!(cfg.demo && cfg.demo.enabled);
  var whatsapp = String(cfg.contact.whatsapp || '').replace(/\D/g, '');
  var podeEnviar = !isDemo && whatsapp.length >= 12;

  function esc(t) {
    return String(t).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  }

  /* ---------------------------------------------------------------- Imagens */
  var REMOTO = 'https://images.unsplash.com/photo-';

  function urlRemota(img, w) {
    return REMOTO + img.id + '?auto=format&fit=max&q=70&w=' + w;
  }
  function urlLocal(img, w) {
    return 'assets/img/' + img.file + '-' + w + '.webp';
  }
  function srcset(img, widths, local) {
    return widths.map(function (w) {
      return (local ? urlLocal(img, w) : urlRemota(img, w)) + ' ' + w + 'w';
    }).join(', ');
  }

  /* Aplica a foto `key` em <img>. Com useLocalImages, tenta o arquivo local
     e volta para a Unsplash se ele não existir. */
  function aplicarImagem(el, key, widths, sizes) {
    var img = cfg.images[key];
    if (!el || !img) return;
    widths = widths || [640, 1200];
    var local = !!cfg.useLocalImages;
    el.onerror = null;
    if (local) {
      el.onerror = function () {
        el.onerror = null;
        console.warn('ORLA: imagem local ausente (' + img.file + '), usando a versão remota.');
        el.srcset = srcset(img, widths, false);
        el.src = urlRemota(img, widths[widths.length - 1]);
      };
    }
    if (sizes) el.sizes = sizes;
    el.srcset = srcset(img, widths, local);
    el.src = local ? urlLocal(img, widths[widths.length - 1]) : urlRemota(img, widths[widths.length - 1]);
  }

  /* A capa já vem no HTML (carregamento mais rápido). Só troca no modo local. */
  if (cfg.useLocalImages) {
    aplicarImagem($('#capa-img'), 'hero', [800, 1600, 2400], '100vw');
  }

  /* ------------------------------------------------- Modo demo e contatos */
  if (!isDemo) $$('[data-demo-only]').forEach(function (el) { el.hidden = true; });

  $$('[data-brand-name]').forEach(function (el) { el.textContent = cfg.brand.name; });
  $$('[data-tagline]').forEach(function (el) { el.textContent = cfg.brand.tagline; });
  function numero(texto) {
    return '<span class="sem-quebra">' + esc(texto) + '</span>' + (isDemo ? ' <span class="sem-quebra">(exemplo)</span>' : '');
  }
  $$('[data-whatsapp-display]').forEach(function (el) { el.innerHTML = numero(cfg.contact.whatsappDisplay); });
  $$('[data-phone-display]').forEach(function (el) { el.innerHTML = numero(cfg.contact.phoneDisplay); });
  $$('[data-address]').forEach(function (el) {
    var c = cfg.contact;
    var html = esc(c.address) + ', ' + esc(c.district) + '<br>' + esc(c.city) + '<br>' + esc(c.region);
    if (c.mapsUrl) html += '<br><a href="' + esc(c.mapsUrl) + '" target="_blank" rel="noopener">Abrir no Google Maps</a>';
    if (c.instagram) html += '<br><a href="https://instagram.com/' + esc(c.instagram) + '" target="_blank" rel="noopener">@' + esc(c.instagram) + '</a>';
    el.innerHTML = html;
  });
  $$('[data-hours]').forEach(function (el) {
    el.innerHTML = cfg.hours.map(function (h) {
      return '<li><span>' + esc(h.days) + '</span><span>' + esc(h.time) + '</span></li>';
    }).join('');
  });
  $$('[data-hours-today]').forEach(function (el) {
    var abertos = cfg.hours.filter(function (h) { return !/fechado/i.test(h.time); });
    var texto = abertos.map(function (h, i) {
      return (i ? h.days.toLowerCase() : h.days) + ', ' + h.time;
    }).join('; ');
    el.textContent = cfg.contact.region + '. ' + texto + '.';
  });

  /* --------------------------------------------------------------- Menu */
  var botaoMenu = $('[data-menu-toggle]');
  var menu = $('#menu');
  var mqMenu = window.matchMedia('(max-width: 899.98px)');

  function posicionarMenu() {
    var topo = $('#topo').getBoundingClientRect();
    menu.style.setProperty('--menu-top', Math.max(0, Math.round(topo.bottom)) + 'px');
  }
  function abrirMenu() {
    posicionarMenu();
    botaoMenu.setAttribute('aria-expanded', 'true');
    botaoMenu.querySelector('.menu-botao__texto').textContent = 'Fechar';
    menu.classList.add('esta-aberto');
    document.body.classList.add('menu-aberto');
    var primeiro = menu.querySelector('a');
    if (primeiro) primeiro.focus();
  }
  function fecharMenu(devolverFoco) {
    botaoMenu.setAttribute('aria-expanded', 'false');
    botaoMenu.querySelector('.menu-botao__texto').textContent = 'Menu';
    menu.classList.remove('esta-aberto');
    document.body.classList.remove('menu-aberto');
    if (devolverFoco) botaoMenu.focus();
  }
  botaoMenu.addEventListener('click', function () {
    if (botaoMenu.getAttribute('aria-expanded') === 'true') fecharMenu(false); else abrirMenu();
  });
  menu.addEventListener('click', function (e) {
    if (e.target.closest('a') && mqMenu.matches) fecharMenu(false);
  });
  document.addEventListener('keydown', function (e) {
    if (botaoMenu.getAttribute('aria-expanded') !== 'true') return;
    if (e.key === 'Escape') { fecharMenu(true); return; }
    if (e.key === 'Tab') {   // foco preso entre o botão e os itens do menu
      var focaveis = [botaoMenu].concat($$('a, button', menu));
      var i = focaveis.indexOf(document.activeElement);
      if (e.shiftKey && i <= 0) { e.preventDefault(); focaveis[focaveis.length - 1].focus(); }
      else if (!e.shiftKey && i === focaveis.length - 1) { e.preventDefault(); focaveis[0].focus(); }
    }
  });
  window.addEventListener('resize', function () {
    if (!mqMenu.matches && menu.classList.contains('esta-aberto')) fecharMenu(false);
    else if (menu.classList.contains('esta-aberto')) posicionarMenu();
  });

  /* --------------------------------------------------------- Aplicações */
  var paginacao = $('[data-applications]');
  var sizesPeca = {   // larguras reais das peças em cada faixa de tela
    grande: '(min-width: 1200px) 56vw, (min-width: 600px) 92vw, 100vw',
    alta: '(min-width: 1200px) 40vw, (min-width: 600px) 46vw, 100vw',
    baixa: '(min-width: 1200px) 40vw, (min-width: 600px) 46vw, 100vw',
    media: '(min-width: 1200px) 40vw, (min-width: 600px) 46vw, 100vw',
    larga: '(min-width: 1200px) 56vw, (min-width: 600px) 46vw, 100vw'
  };
  paginacao.innerHTML = cfg.applications.map(function (a) {
    return '' +
      '<article class="peca peca--' + esc(a.layout) + '" id="aplicacao-' + esc(a.id) + '">' +
        '<div class="peca__foto"><img data-app-img="' + esc(a.image) + '" data-layout="' + esc(a.layout) + '" alt="' + esc(a.alt) + '" width="1200" height="800" loading="lazy" decoding="async" style="object-position:' + esc(a.focus || '50% 50%') + '"></div>' +
        '<div class="peca__texto">' +
          '<h3 class="peca__nome">' + esc(a.label) + '</h3>' +
          '<p class="peca__descricao">' + esc(a.text) + '</p>' +
          '<p class="peca__pecas"><strong>Peças comuns:</strong> ' + esc(a.pieces.join(', ')) + '.</p>' +
          '<button class="peca__acao" type="button" data-ambient-pick="' + esc(a.id) + '">Orçar ' + esc(a.formLabel.toLowerCase()) + '</button>' +
        '</div>' +
      '</article>';
  }).join('');
  $$('[data-app-img]', paginacao).forEach(function (el) {
    aplicarImagem(el, el.getAttribute('data-app-img'), [640, 1200], sizesPeca[el.getAttribute('data-layout')]);
  });

  /* ------------------------------------------------------- Amostruário */
  var areaPlaquetas = $('[data-samples]');
  areaPlaquetas.innerHTML = cfg.materials.map(function (m, i) {
    return '' +
      '<button class="plaqueta" type="button" aria-pressed="' + (i === 0) + '" data-material="' + esc(m.id) + '" aria-controls="ficha" aria-label="' + esc(m.name) + '">' +
        '<span class="plaqueta__amostra"><img data-sample-img="' + esc(m.texture) + '" alt="" width="640" height="1200" loading="lazy" decoding="async"></span>' +
        '<span class="plaqueta__nome">' + esc(m.name) + '</span>' +
      '</button>';
  }).join('');
  $$('[data-sample-img]', areaPlaquetas).forEach(function (el) {
    aplicarImagem(el, el.getAttribute('data-sample-img'), [640], '20vw');
  });

  var ficha = $('[data-sheet]');
  ficha.id = 'ficha';
  var imgTextura = $('[data-sheet-texture]', ficha);
  var imgAplicacao = $('[data-sheet-application]', ficha);
  var materialAtual = cfg.materials[0];

  function mostrarMaterial(m, comTransicao) {
    materialAtual = m;
    $('[data-sheet-family]', ficha).textContent = m.family;
    $('[data-sheet-name]', ficha).textContent = m.name;
    $('[data-sheet-tone]', ficha).textContent = m.tone;
    $('[data-sheet-text]', ficha).textContent = m.text;
    $('[data-sheet-finishes]', ficha).textContent = m.finishes.join(', ');
    $('[data-sheet-uses]', ficha).textContent = m.uses;

    var trocar = function () {
      imgTextura.alt = m.textureAlt;
      imgAplicacao.alt = m.applicationAlt;
      aplicarImagem(imgTextura, m.texture, [640, 1200], '(min-width: 900px) 24vw, 40vw');
      aplicarImagem(imgAplicacao, m.application, [640, 1200], '(min-width: 900px) 36vw, 60vw');
    };
    if (comTransicao && !reduzMovimento.matches) {
      imgTextura.classList.add('esta-trocando');
      imgAplicacao.classList.add('esta-trocando');
      setTimeout(function () {
        trocar();
        var mostrar = function () { this.classList.remove('esta-trocando'); };
        imgTextura.addEventListener('load', mostrar, { once: true });
        imgAplicacao.addEventListener('load', mostrar, { once: true });
        setTimeout(function () {   // segurança: nunca deixar a foto invisível
          imgTextura.classList.remove('esta-trocando');
          imgAplicacao.classList.remove('esta-trocando');
        }, 1500);
      }, 180);
    } else {
      trocar();
    }
    $$('.plaqueta', areaPlaquetas).forEach(function (b) {
      b.setAttribute('aria-pressed', String(b.getAttribute('data-material') === m.id));
    });
  }
  mostrarMaterial(materialAtual, false);

  areaPlaquetas.addEventListener('click', function (e) {
    var b = e.target.closest('.plaqueta');
    if (!b) return;
    var m = cfg.materials.filter(function (x) { return x.id === b.getAttribute('data-material'); })[0];
    if (m && m !== materialAtual) mostrarMaterial(m, true);
  });

  /* ------------------------------------------------------- Formulário */
  var form = $('#form-orcamento');
  var areaAmbientes = $('[data-ambient-options]');
  var selMaterial = $('#material');
  var inpNome = $('#nome');
  var inpObs = $('#obs');
  var previa = $('[data-preview]');
  var avisoEnvio = $('#aviso-envio');
  var resumo = $('#form-resumo');
  var botaoEnviar = $('[data-submit-label]');

  var ambientes = cfg.applications.map(function (a) { return { id: a.id, label: a.formLabel }; });
  if (cfg.extraAmbient) ambientes.push({ id: cfg.extraAmbient.id, label: cfg.extraAmbient.formLabel });

  areaAmbientes.innerHTML = ambientes.map(function (a) {
    return '<label class="opcao"><input type="radio" name="ambiente" value="' + esc(a.id) + '"><span>' + esc(a.label) + '</span></label>';
  }).join('');

  var materiaisForm = cfg.materials.map(function (m) { return { id: m.id, name: m.name }; });
  if (cfg.extraMaterial) materiaisForm.push(cfg.extraMaterial);
  selMaterial.insertAdjacentHTML('beforeend', materiaisForm.map(function (m) {
    return '<option value="' + esc(m.id) + '">' + esc(m.name) + '</option>';
  }).join(''));

  botaoEnviar.textContent = podeEnviar ? 'Enviar pelo WhatsApp' : 'Preparar mensagem';

  function rotuloAmbiente() {
    var r = form.querySelector('input[name="ambiente"]:checked');
    if (!r) return '';
    return ambientes.filter(function (a) { return a.id === r.value; })[0].label;
  }
  function rotuloMaterial() {
    var o = selMaterial.options[selMaterial.selectedIndex];
    return selMaterial.value ? o.textContent : '';
  }

  function montarMensagem() {
    var linhas = [
      cfg.brand.greeting,
      'Gostaria de pedir um orçamento.',
      '',
      'Ambiente: ' + (rotuloAmbiente() || '(a escolher)'),
      'Material: ' + (rotuloMaterial() || '(a escolher)'),
      'Nome: ' + (inpNome.value.trim() || '(seu nome)')
    ];
    var obs = inpObs.value.trim();
    if (obs) linhas.push('Observações: ' + obs);
    linhas.push('', 'Sei que o valor depende das medidas e da chapa escolhida.');
    return linhas.join('\n');
  }
  function atualizarPrevia() {
    previa.textContent = montarMensagem();
  }
  form.addEventListener('input', function (e) {
    atualizarPrevia();
    if (avisoEnvio && !avisoEnvio.hidden) avisoEnvio.hidden = true;
    limparErro(e.target.name === 'ambiente' ? 'ambiente' : e.target.id);
  });
  form.addEventListener('change', atualizarPrevia);
  atualizarPrevia();

  /* Erros */
  var campos = {
    ambiente: { box: $('#campo-ambiente'), erro: $('#erro-ambiente') },
    material: { box: selMaterial, erro: $('#erro-material') },
    nome: { box: inpNome, erro: $('#erro-nome') }
  };
  function mostrarErro(nome, texto) {
    var c = campos[nome];
    c.box.setAttribute('aria-invalid', 'true');
    c.erro.textContent = texto;
    c.erro.hidden = false;
  }
  function limparErro(nome) {
    var c = campos[nome];
    if (!c) return;
    c.box.removeAttribute('aria-invalid');
    c.erro.hidden = true;
    c.erro.textContent = '';
    if (!form.querySelector('[aria-invalid="true"]')) resumo.hidden = true;
  }

  function validar() {
    var erros = [];
    Object.keys(campos).forEach(limparErro);
    if (!rotuloAmbiente()) { mostrarErro('ambiente', 'Escolha o ambiente da peça.'); erros.push('ambiente'); }
    if (!selMaterial.value) { mostrarErro('material', 'Escolha um material ou "Ainda não sei, quero sugestão".'); erros.push('material'); }
    if (inpNome.value.trim().length < 2) { mostrarErro('nome', 'Escreva seu nome (pelo menos 2 letras).'); erros.push('nome'); }
    return erros;
  }

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var erros = validar();
    if (erros.length) {
      resumo.textContent = erros.length === 1 ? 'Falta 1 informação para preparar a mensagem.' : 'Faltam ' + erros.length + ' informações para preparar a mensagem.';
      resumo.hidden = false;
      var primeiro = erros[0] === 'ambiente' ? form.querySelector('input[name="ambiente"]') : campos[erros[0]].box;
      primeiro.focus();
      return;
    }
    var msg = montarMensagem();
    if (podeEnviar) {
      window.open('https://wa.me/' + whatsapp + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      return;
    }
    avisoEnvio.hidden = false;
    $('[data-copy-status]').textContent = '';
    avisoEnvio.focus({ preventScroll: true });
    avisoEnvio.scrollIntoView({ block: 'nearest', behavior: reduzMovimento.matches ? 'auto' : 'smooth' });
  });

  $('[data-copy]').addEventListener('click', function () {
    var status = $('[data-copy-status]');
    var texto = montarMensagem();
    var ok = function () { status.textContent = 'Mensagem copiada.'; };
    var reserva = function () {   // seleciona o texto e tenta o método antigo de cópia
      var r = document.createRange();
      r.selectNodeContents(previa);
      var s = window.getSelection();
      s.removeAllRanges(); s.addRange(r);
      var copiou = false;
      try { copiou = document.execCommand('copy'); } catch (err) { copiou = false; }
      status.textContent = copiou ? 'Mensagem copiada.' : 'Texto selecionado: use Ctrl+C para copiar.';
    };
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(texto).then(ok, reserva);
    } else {
      reserva();
    }
  });

  /* Atalhos que preenchem o formulário */
  function irParaFormulario(foco) {
    $('#orcamento').scrollIntoView({ behavior: reduzMovimento.matches ? 'auto' : 'smooth', block: 'start' });
    setTimeout(function () { foco.focus({ preventScroll: true }); }, reduzMovimento.matches ? 0 : 450);
  }
  paginacao.addEventListener('click', function (e) {
    var b = e.target.closest('[data-ambient-pick]');
    if (!b) return;
    var r = form.querySelector('input[name="ambiente"][value="' + b.getAttribute('data-ambient-pick') + '"]');
    if (!r) return;
    r.checked = true;
    limparErro('ambiente');
    atualizarPrevia();
    irParaFormulario(r);
  });
  $('[data-use-material]').addEventListener('click', function () {
    selMaterial.value = materialAtual.id;
    limparErro('material');
    atualizarPrevia();
    irParaFormulario(selMaterial);
  });

  /* ----------------------------------------------------------- Créditos */
  var vistos = {};
  var creditos = [];
  Object.keys(cfg.images).forEach(function (k) {
    var i = cfg.images[k];
    if (vistos[i.user]) return;
    vistos[i.user] = true;
    creditos.push('<a href="https://unsplash.com/@' + esc(i.user) + '?utm_source=orla_demo&amp;utm_medium=referral" target="_blank" rel="noopener">' + esc(i.author) + '</a>');
  });
  $$('[data-credits]').forEach(function (el) {
    el.innerHTML = 'Fotos: ' + creditos.join(', ') + ' (Unsplash, Licença Unsplash). Tipografia: Geologica (SIL Open Font License).';
  });
})();
