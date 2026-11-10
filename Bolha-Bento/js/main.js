/* ==========================================================================
   BOLHA & BENTO — interações
   ========================================================================== */
(function () {
  'use strict';

  var cfg = window.BB_CONFIG;
  if (!cfg) { console.error('Bolha & Bento: js/config.js não foi carregado.'); return; }

  var $ = function (sel, el) { return (el || document).querySelector(sel); };
  var $$ = function (sel, el) { return Array.prototype.slice.call((el || document).querySelectorAll(sel)); };
  var reduzMovimento = window.matchMedia('(prefers-reduced-motion: reduce)');

  var numero = String(cfg.contact.whatsapp || '').replace(/\D/g, '');
  var numeroValido = numero.length >= 12 && numero.length <= 13;
  var podeEnviar = !cfg.demo.enabled && numeroValido;

  /* ---------- Demonstração ---------- */
  if (!cfg.demo.enabled) $$('[data-demo-only]').forEach(function (el) { el.hidden = true; });

  /* ---------- Textos de contato ---------- */
  var textos = {
    address: cfg.contact.address,
    'district-city': cfg.contact.district + ', ' + cfg.contact.city,
    whatsappDisplay: cfg.contact.whatsappDisplay
  };
  $$('[data-cfg]').forEach(function (el) {
    var v = textos[el.getAttribute('data-cfg')];
    if (v) el.textContent = v;
  });

  var horas = $('[data-horas]');
  if (horas) {
    cfg.hours.forEach(function (h) {
      var dt = document.createElement('dt'); dt.textContent = h.days;
      var dd = document.createElement('dd'); dd.textContent = h.time;
      horas.append(dt, dd);
    });
  }

  var links = $('[data-links]');
  if (links) {
    var lista = [];
    if (cfg.contact.mapsUrl) lista.push(['Abrir no Google Maps', cfg.contact.mapsUrl]);
    if (cfg.contact.instagram) lista.push(['Instagram @' + cfg.contact.instagram, 'https://instagram.com/' + cfg.contact.instagram]);
    if (podeEnviar) lista.push(['Conversar no WhatsApp', 'https://wa.me/' + numero]);
    lista.forEach(function (l, i) {
      var a = document.createElement('a');
      a.href = l[1]; a.textContent = l[0]; a.target = '_blank'; a.rel = 'noopener';
      if (i) links.append(document.createTextNode('  |  '));
      links.append(a);
    });
  }

  /* ---------- Créditos das fotos ---------- */
  var creditos = $('[data-creditos]');
  if (creditos) {
    var autores = {};
    Object.keys(cfg.images).forEach(function (k) {
      var im = cfg.images[k];
      if (!autores[im.user]) autores[im.user] = im;
    });
    Object.keys(autores).forEach(function (u, i, arr) {
      var im = autores[u];
      var a = document.createElement('a');
      a.href = 'https://unsplash.com/photos/' + im.slug;
      a.textContent = im.author;
      a.target = '_blank'; a.rel = 'noopener';
      creditos.append(a);
      if (i < arr.length - 1) creditos.append(document.createTextNode(', '));
    });
    creditos.append(document.createTextNode(' (Unsplash, Licença Unsplash)'));
  }

  /* ---------- Fotos locais (opcional) ---------- */
  if (cfg.useLocalImages) {
    var larguras = { hero: [800, 1600] };
    $$('img[data-img]').forEach(function (img) {
      var nome = img.getAttribute('data-img');
      var ws = larguras[nome] || [640, 1200];
      var remoto = { src: img.getAttribute('src'), srcset: img.getAttribute('srcset') };
      img.addEventListener('error', function volta() {
        img.removeEventListener('error', volta);
        console.warn('Bolha & Bento: assets/img/' + nome + ' não encontrada; usando a Unsplash.');
        img.srcset = remoto.srcset; img.src = remoto.src;
      });
      img.srcset = ws.map(function (w) { return 'assets/img/' + nome + '-' + w + '.webp ' + w + 'w'; }).join(', ');
      img.src = 'assets/img/' + nome + '-' + ws[0] + '.webp';
    });
  }

  /* ---------- Topo ---------- */
  var topo = $('[data-topo]');
  var logotipo = $('.capa__logotipo');
  if (topo && logotipo && 'IntersectionObserver' in window) {
    new IntersectionObserver(function (e) {
      topo.classList.toggle('topo--rolado', !e[0].isIntersecting);
    }, { rootMargin: '-64px 0px 0px 0px' }).observe(logotipo);
  } else if (topo) {
    topo.classList.add('topo--rolado');
  }

  /* ---------- Menu móvel ---------- */
  var menu = $('[data-menu]');
  var botaoMenu = $('[data-menu-botao]');
  function fecharMenu(devolverFoco) {
    if (!menu.classList.contains('aberto')) return;
    menu.classList.remove('aberto');
    botaoMenu.setAttribute('aria-expanded', 'false');
    if (devolverFoco) botaoMenu.focus();
  }
  if (menu && botaoMenu) {
    botaoMenu.addEventListener('click', function () {
      var abrir = !menu.classList.contains('aberto');
      if (!abrir) { fecharMenu(false); return; }
      menu.style.setProperty('--nav-top', Math.round(topo.getBoundingClientRect().bottom) + 'px');
      menu.classList.add('aberto');
      botaoMenu.setAttribute('aria-expanded', 'true');
      var primeiro = $('a', menu); if (primeiro) primeiro.focus();
    });
    menu.addEventListener('click', function (e) { if (e.target.closest('a')) fecharMenu(false); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') fecharMenu(true); });
    topo.addEventListener('focusout', function (e) {
      if (e.relatedTarget && !topo.contains(e.relatedTarget)) fecharMenu(false);
    });
    document.addEventListener('click', function (e) {
      if (!topo.contains(e.target)) fecharMenu(false);
    });
    window.matchMedia('(min-width: 900px)').addEventListener('change', function () { fecharMenu(false); });
  }

  /* Complementares na seção de cuidados (informativos; combinados pelo WhatsApp) */
  var vitrine = $('[data-extras-vitrine]');
  if (vitrine) {
    cfg.extras.forEach(function (ex) {
      var li = document.createElement('li');
      li.className = 'plaquinha';
      li.textContent = ex.label;
      if (ex.note) { var s = document.createElement('small'); s.textContent = '(' + ex.note + ')'; li.append(s); }
      vitrine.append(li);
    });
  }

  /* ==========================================================================
     Agendamento: quem vem, cuidado, tutor e nome do pet
     ========================================================================== */
  var form = $('[data-ficha]');
  if (!form) return;

  var grupos = {
    species: 'especie',
    services: 'cuidado'
  };

  $$('[data-opcoes]', form).forEach(function (box) {
    var chave = box.getAttribute('data-opcoes');
    var nome = grupos[chave];
    cfg.form[chave].forEach(function (op) {
      var id = 'op-' + nome + '-' + op.id;
      var div = document.createElement('div');
      div.className = 'opcao';
      var input = document.createElement('input');
      input.type = 'radio'; input.name = nome; input.id = id; input.value = op.id;
      input.setAttribute('aria-describedby', 'erro-' + nome + (nome === 'cuidado' ? ' nota-gato' : ''));
      var label = document.createElement('label');
      label.htmlFor = id;
      label.append(op.label);
      if (nome === 'cuidado' && cfg.form.catServiceNote && cfg.form.catServiceNote[op.id]) {
        var s = document.createElement('small');
        s.className = 'opcao__gato';
        s.hidden = true;
        s.textContent = cfg.form.catServiceNote[op.id];
        label.append(' ', s);
      }
      div.append(input, label);
      box.append(div);
    });
  });

  /* Botões "Agendar…" das outras seções: marcam o cuidado */
  $$('[data-escolher]').forEach(function (a) {
    a.addEventListener('click', function () {
      var r = $('#op-cuidado-' + a.getAttribute('data-escolher'));
      if (r) { r.checked = true; r.dispatchEvent(new Event('change', { bubbles: true })); }
    });
  });

  var notaGato = $('[data-nota-gato]', form);
  notaGato.textContent = cfg.form.catNote;

  function valor(nome) { var i = $('input[name="' + nome + '"]:checked', form); return i ? i.value : ''; }
  function rotulo(lista, id) { for (var i = 0; i < lista.length; i++) if (lista[i].id === id) return lista[i].label; return ''; }

  function atualizarEspecie() {
    var gato = valor('especie') === 'gato';
    notaGato.hidden = !gato;
    $$('.opcao__gato', form).forEach(function (s) { s.hidden = !gato; });
  }

  function montarMensagem() {
    var esp = valor('especie');
    var cuidado = valor('cuidado');
    var tutor = $('#tutor').value.trim();
    var pet = $('#pet').value.trim();
    var linhaCuidado = cuidado ? rotulo(cfg.form.services, cuidado) : '(escolha)';
    if (esp === 'gato' && cfg.form.catServiceNote && cfg.form.catServiceNote[cuidado]) {
      linhaCuidado += ' (' + cfg.form.catServiceNote[cuidado] + ')';
    }
    var l = [cfg.brand.greeting + ' Quero agendar um horário.', ''];
    l.push('Pet: ' + (esp ? rotulo(cfg.form.species, esp) : '(escolha cão ou gato)') + (pet ? ', ' + pet : ''));
    l.push('Cuidado: ' + linhaCuidado);
    l.push('Tutor(a): ' + (tutor || '(seu nome)'));
    l.push('', cfg.form.closingLine);
    return l.join('\n');
  }

  var pronta = $('[data-pronta]', form);
  var previa = $('[data-previa]', form);
  var copiado = $('[data-copiado]', form);

  function atualizarPronta() {
    if (pronta.hidden) return;
    var m = montarMensagem();
    if (previa.textContent !== m) { previa.textContent = m; copiado.textContent = ''; }
  }

  form.addEventListener('change', function (e) {
    if (e.target.name === 'especie') atualizarEspecie();
    if (form.classList.contains('ficha--validada')) validar(false);
    atualizarPronta();
  });
  form.addEventListener('input', function () {
    if (form.classList.contains('ficha--validada')) validar(false);
    atualizarPronta();
  });

  /* ---------- Validação ---------- */
  var resumo = $('[data-resumo]', form);
  function marcar(grupo, erroId, temErro) {
    $(erroId).hidden = !temErro;
    if (grupo) grupo.classList.toggle('ficha__grupo--erro', temErro);
  }
  function validar(mostrarResumo) {
    var erros = [];
    var semEspecie = !valor('especie');
    marcar($('[data-grupo="especie"]', form), '#erro-especie', semEspecie);
    if (semEspecie) erros.push(['Quem vem: cão ou gato', $('input[name="especie"]', form)]);

    var semCuidado = !valor('cuidado');
    marcar($('[data-grupo="cuidado"]', form), '#erro-cuidado', semCuidado);
    if (semCuidado) erros.push(['O cuidado', $('input[name="cuidado"]', form)]);

    var tutor = $('#tutor');
    var nomeOk = (tutor.value.match(/\p{L}/gu) || []).length >= 2;
    marcar(null, '#erro-tutor', !nomeOk);
    tutor.setAttribute('aria-invalid', nomeOk ? 'false' : 'true');
    if (!nomeOk) erros.push(['Seu nome', tutor]);

    if (mostrarResumo && erros.length) {
      resumo.innerHTML = '';
      resumo.append(document.createTextNode(erros.length === 1 ? 'Falta 1 informação:' : 'Faltam ' + erros.length + ' informações:'));
      var ul = document.createElement('ul');
      erros.forEach(function (e) { var li = document.createElement('li'); li.textContent = e[0]; ul.append(li); });
      resumo.append(ul);
      resumo.hidden = false;
    } else if (!erros.length) {
      resumo.hidden = true;
    }
    return erros;
  }

  var botaoEnviar = $('[data-enviar]', form);
  if (podeEnviar) botaoEnviar.textContent = 'Continuar no WhatsApp';
  else if (!cfg.demo.enabled && !numeroValido) console.warn('Bolha & Bento: contact.whatsapp ausente ou inválido; o agendamento continua mostrando a mensagem para copiar.');

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    form.classList.add('ficha--validada');
    var erros = validar(true);
    if (erros.length) {
      pronta.hidden = true;
      erros[0][1].focus();
      return;
    }
    var msg = montarMensagem();
    if (podeEnviar) {
      window.open('https://wa.me/' + numero + '?text=' + encodeURIComponent(msg), '_blank', 'noopener');
      return;
    }
    previa.textContent = msg;
    copiado.textContent = '';
    pronta.hidden = false;
    pronta.focus();
    if (!reduzMovimento.matches) {
      pronta.classList.remove('balanca'); void pronta.offsetWidth; pronta.classList.add('balanca');
    }
  });
  pronta.addEventListener('animationend', function () { pronta.classList.remove('balanca'); });

  /* ---------- Copiar ---------- */
  $('[data-copiar]', form).addEventListener('click', function () {
    var msg = montarMensagem();
    function selecionar() {
      var r = document.createRange(); r.selectNodeContents(previa);
      var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
      var ok = false;
      try { ok = document.execCommand('copy'); } catch (err) { ok = false; }
      copiado.textContent = ok ? 'Mensagem copiada.' : 'Texto selecionado. Use Ctrl+C para copiar.';
    }
    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(msg).then(function () { copiado.textContent = 'Mensagem copiada.'; }, selecionar);
    } else {
      selecionar();
    }
  });

  atualizarEspecie();
})();
