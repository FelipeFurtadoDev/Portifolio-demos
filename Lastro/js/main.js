/* ==========================================================================
   LASTRO · Bancadas sob medida
   Esboço da peça (adaptação do ID 07), ajuda contextual (ID 18), resumo e
   mensagem pronta. JavaScript puro, sem dependências.
   Sem JavaScript, a página continua legível: as orientações de cada peça
   estão nos cartões do HTML e a mensagem padrão já está escrita.
   ========================================================================== */
(function () {
  'use strict';

  var CFG = window.LASTRO_CONFIG || {};
  var DEMO = CFG.demo || {};
  var LIM = CFG.medidas || { min: 10, max: 1500 };

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function h(tag, attrs, kids) {
    var n = document.createElement(tag);
    Object.keys(attrs || {}).forEach(function (k) {
      var v = attrs[k];
      if (v === false || v == null) return;
      if (k === 'text') n.textContent = v;
      else if (k === 'class') n.className = v;
      else n.setAttribute(k, v === true ? '' : v);
    });
    (kids || []).forEach(function (c) { if (c) n.appendChild(c); });
    return n;
  }

  /* O atributo hidden funciona em elementos SVG, mas a propriedade .hidden não existe neles. */
  function ocultar(el, sim) { if (sim) el.setAttribute('hidden', ''); else el.removeAttribute('hidden'); }

  var estado = { peca: null, valores: {}, arquivos: false };

  var elCampos = $('#campos');
  var elDesc = $('#esb-desc');
  var DESC_INICIAL = elDesc ? elDesc.textContent : '';
  var DESC_PECA = {
    reta: 'Vista de cima de uma bancada reta junto à parede, com cotas de comprimento e profundidade.',
    l: 'Vista de cima de uma bancada em L. O lado A segue a parede do fundo e o lado B, a parede lateral.',
    ilha: 'Vista de cima de uma ilha, com cotas de comprimento e largura.',
    lavatorio: 'Vista de cima de um lavatório junto à parede, com cotas de largura e profundidade.'
  };
  var DESC_FIM = ' A marmoraria confere as medidas finais. A área hachurada representa a parede.';

  /* ---------- Demonstração, créditos, fotos locais ---------- */
  function aplicarDemo() {
    var bar = $('[data-demo-bar]');
    var txt = $('[data-demo-text]');
    var demoContato = $('[data-demo-contact]');
    if (txt && DEMO.notice) txt.textContent = DEMO.notice;
    if (!DEMO.enabled) {
      if (bar) bar.hidden = true;
      if (demoContato) demoContato.hidden = true;
    }
  }

  function aplicarCreditos() {
    var box = $('[data-creditos]');
    var lista = CFG.credits || [];
    if (!box || !lista.length) return;
    box.textContent = 'Fotos na Unsplash: ';
    lista.forEach(function (c, i) {
      var a = h('a', { href: c.url, target: '_blank', rel: 'noopener', text: c.author });
      box.appendChild(a);
      box.appendChild(document.createTextNode(' (' + c.role.toLowerCase() + ')' + (i < lista.length - 1 ? ', ' : '.')));
    });
  }

  function aplicarImagensLocais() {
    if (!CFG.useLocalImages) return;
    $$('img[data-img]').forEach(function (img) {
      var nome = img.getAttribute('data-img');
      var ws = (CFG.localWidths || {})[nome];
      if (!ws) return;
      var orig = { src: img.getAttribute('src'), srcset: img.getAttribute('srcset') };
      img.addEventListener('error', function volta() {
        img.removeEventListener('error', volta);
        console.warn('LASTRO: arquivo local ausente para "' + nome + '"; usando a Unsplash.');
        img.setAttribute('srcset', orig.srcset); img.setAttribute('src', orig.src);
      });
      img.setAttribute('srcset', ws.map(function (w) { return 'assets/img/' + nome + '-' + w + '.webp ' + w + 'w'; }).join(', '));
      img.setAttribute('src', 'assets/img/' + nome + '-' + ws[Math.floor(ws.length / 2)] + '.webp');
    });
  }

  /* ---------- Medidas ---------- */
  function fmt(n) { return n.toLocaleString('pt-BR', { maximumFractionDigits: 2 }); }

  function lerMedida(bruto) {
    var t = (bruto || '').trim().replace(/\s+/g, '').replace(/cm$/i, '');
    if (!t) return { vazio: true };
    if (!/^\d{1,4}([.,]\d{1,2})?$/.test(t)) {
      return { erro: 'Use só números, com vírgula ou ponto para decimais. Exemplo: 280 ou 62,5.' };
    }
    var n = parseFloat(t.replace(',', '.'));
    if (!(n >= LIM.min)) return { erro: 'Esse valor é pequeno para centímetros e não entrou no resumo. Para 2,8 m, escreva 280.' };
    if (n > LIM.max) return { erro: 'Esse valor passa de ' + fmt(LIM.max) + ' cm e não entrou no resumo. Confira a medida.' };
    return { n: n, texto: fmt(n) };
  }

  function nomeDaPeca(id) {
    var radio = $('.peca__radio[value="' + id + '"]');
    var n = radio && radio.parentNode.querySelector('.peca__nome');
    return n ? n.textContent.trim() : id;
  }

  function pecaAtiva() { return estado.peca ? (CFG.pecas || {})[estado.peca] : null; }
  function valoresAtivos() {
    if (!estado.peca) return {};
    return estado.valores[estado.peca] || (estado.valores[estado.peca] = {});
  }

  /* valor "limpo" de um campo (ou null se vazio ou inválido) */
  function valorDoCampo(campo) {
    var v = valoresAtivos()[campo.id];
    if (campo.tipo === 'medida') {
      var r = lerMedida(v);
      return r.texto ? '≈ ' + r.texto + ' cm' : null;
    }
    if (campo.tipo === 'recortes') return v && v.length ? v.slice() : null;
    return v ? v : null;
  }

  /* ---------- Campos ---------- */
  function renderCampos() {
    elCampos.textContent = '';
    var peca = pecaAtiva();
    if (!peca) {
      elCampos.appendChild(h('p', { class: 'campos__vazio', text: 'Escolha uma peça para ver as medidas que ajudam. Todas são opcionais.' }));
      return;
    }
    var id = estado.peca;
    elCampos.appendChild(h('h3', { class: 'campos__titulo', text: nomeDaPeca(id) }));
    elCampos.appendChild(h('p', { class: 'campos__nota', text: 'Todos os campos são opcionais. Medidas aproximadas já ajudam, e o que faltar fica para a conversa.' }));
    peca.campos.forEach(function (c) { elCampos.appendChild(construirCampo(id, c)); });

    var acoes = h('div', { class: 'campos__acoes' });
    acoes.appendChild(h('a', { class: 'botao botao--primario', href: '#pedido', text: 'Continuar para o pedido' }));
    acoes.appendChild(h('button', { class: 'campos__limpar', type: 'button', 'data-acao': 'limpar', text: 'Limpar escolha' }));
    elCampos.appendChild(acoes);
  }

  function ajudaDe(prefixo, campo) {
    if (!campo.ajuda || !(CFG.ajudas || {})[campo.ajuda]) return [];
    var a = CFG.ajudas[campo.ajuda];
    var pid = 'ajuda-' + prefixo;
    var btn = h('button', {
      class: 'ajuda__btn', type: 'button', id: 'btn-' + pid,
      'aria-expanded': 'false', 'aria-controls': pid
    }, [h('span', { class: 'ajuda__icone', 'aria-hidden': 'true', text: '?' }), h('span', { text: a.botao })]);
    var painel = h('p', { class: 'ajuda__painel', id: pid, hidden: true, text: a.texto });
    return [btn, painel];
  }

  function construirCampo(pecaId, c) {
    var prefixo = pecaId + '-' + c.id;
    var wrap = h('div', { class: 'campo', 'data-campo': c.id });
    var guardado = valoresAtivos()[c.id];

    if (c.tipo === 'recortes') {
      wrap.setAttribute('role', 'group');
      wrap.setAttribute('aria-labelledby', 'nome-' + prefixo);
      var linha = h('div', { class: 'campo__rotulo' }, [
        h('span', { class: 'campo__nome', id: 'nome-' + prefixo, text: c.rotulo }),
        h('span', { class: 'campo__opc', text: 'opcional' })
      ].concat(ajudaDe(prefixo, c)));
      wrap.appendChild(linha);
      var checks = h('div', { class: 'checks' });
      c.opcoes.forEach(function (op) {
        var inp = h('input', { type: 'checkbox', value: op });
        if (guardado && guardado.indexOf(op) > -1) inp.checked = true;
        inp.addEventListener('change', function () {
          var sel = $$('input:checked', checks).map(function (i) { return i.value; });
          valoresAtivos()[c.id] = sel;
          atualizar();
        });
        checks.appendChild(h('label', { class: 'check' }, [inp, h('span', { text: op })]));
      });
      wrap.appendChild(checks);
      return wrap;
    }

    var idCampo = 'campo-' + prefixo;
    var rotulo = h('div', { class: 'campo__rotulo' }, [
      h('label', { class: 'campo__nome', for: idCampo }, [
        document.createTextNode(c.rotulo),
        c.tipo === 'medida' ? h('span', { class: 'sr-only', text: ', em centímetros' }) : null
      ]),
      h('span', { class: 'campo__opc', id: 'opc-' + prefixo, text: 'opcional' })
    ].concat(ajudaDe(prefixo, c)));
    if (c.dica) rotulo.appendChild(h('span', { class: 'campo__dica', text: c.dica }));
    wrap.appendChild(rotulo);

    if (c.tipo === 'medida') {
      var inp = h('input', {
        id: idCampo, type: 'text', inputmode: 'decimal', autocomplete: 'off', spellcheck: 'false',
        'aria-describedby': 'opc-' + prefixo + ' un-' + prefixo + ' erro-' + prefixo
      });
      if (guardado) inp.value = guardado;
      var erro = h('p', { class: 'campo__erro', id: 'erro-' + prefixo, hidden: true });
      inp.addEventListener('input', function () {
        valoresAtivos()[c.id] = inp.value;
        var r = lerMedida(inp.value);
        wrap.classList.toggle('campo--erro', !!r.erro);
        if (r.erro) { inp.setAttribute('aria-invalid', 'true'); erro.textContent = r.erro; erro.hidden = false; }
        else { inp.removeAttribute('aria-invalid'); erro.textContent = ''; erro.hidden = true; }
        atualizar();
      });
      wrap.appendChild(h('div', { class: 'campo__entrada' }, [
        inp, h('span', { class: 'campo__un', id: 'un-' + prefixo, text: 'cm' })
      ]));
      wrap.appendChild(erro);
      if (guardado) inp.dispatchEvent(new Event('input'));
    } else {
      var sel = h('select', { id: idCampo, 'aria-describedby': 'opc-' + prefixo });
      sel.appendChild(h('option', { value: '', text: c.vazio || 'Ainda não defini' }));
      c.opcoes.forEach(function (op) { sel.appendChild(h('option', { value: op, text: op })); });
      if (guardado) sel.value = guardado;
      sel.addEventListener('change', function () { valoresAtivos()[c.id] = sel.value; atualizar(); });
      wrap.appendChild(sel);
    }
    return wrap;
  }

  /* ---------- Ajuda contextual ---------- */
  var ajudaAberta = null;
  function abrirAjuda(btn, abrir) {
    var painel = document.getElementById(btn.getAttribute('aria-controls'));
    if (!painel) return;
    if (abrir && ajudaAberta && ajudaAberta !== btn) fecharAjuda(false);
    btn.setAttribute('aria-expanded', abrir ? 'true' : 'false');
    painel.hidden = !abrir;
    ajudaAberta = abrir ? btn : null;
  }
  function fecharAjuda(devolverFoco) {
    if (!ajudaAberta) return;
    var btn = ajudaAberta;
    abrirAjuda(btn, false);
    if (devolverFoco && document.body.contains(btn)) btn.focus();
  }
  elCampos.addEventListener('click', function (e) {
    var btn = e.target.closest('.ajuda__btn');
    if (btn) { abrirAjuda(btn, btn.getAttribute('aria-expanded') !== 'true'); return; }
    if (e.target.closest('[data-acao="limpar"]')) limpar();
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && ajudaAberta) { e.preventDefault(); fecharAjuda(true); }
  });
  document.addEventListener('click', function (e) {
    if (ajudaAberta && !e.target.closest('.ajuda__btn, .ajuda__painel')) fecharAjuda(false);
  });

  /* ---------- Esboço ---------- */
  function atualizarDesenho() {
    var id = estado.peca;
    var alvo = document.getElementById(id ? 'esb-' + id : 'esb-vazio');
    $$('.esboco__svg').forEach(function (s) { ocultar(s, s !== alvo); });
    if (elDesc) elDesc.textContent = id ? (DESC_PECA[id] || '') + DESC_FIM : DESC_INICIAL;
    if (!id || !alvo) return;

    pecaAtiva().campos.forEach(function (c) {
      var v = valorDoCampo(c);
      if (c.cota) {
        $$('[data-cota="' + c.cota + '"]', alvo).forEach(function (t) {
          if (!t.dataset.padrao) t.dataset.padrao = t.textContent;
          t.textContent = v ? (c.cotaPrefixo ? c.cotaPrefixo + ' ' : '') + v : t.dataset.padrao;
        });
      }
      if (c.tipo === 'recortes') {
        $$('[data-recorte]', alvo).forEach(function (g) { ocultar(g, !(v && v.indexOf(g.getAttribute('data-recorte')) > -1)); });
      }
      if (c.tipo === 'escolha') {
        $$('[data-cuba]', alvo).forEach(function (g) { ocultar(g, g.getAttribute('data-cuba') !== v); });
      }
    });
  }

  function animarDesenho() {
    var s = estado.peca && document.getElementById('esb-' + estado.peca);
    if (!s) return;
    s.classList.remove('entrando');
    void s.getBoundingClientRect();
    s.classList.add('entrando');
    setTimeout(function () { s.classList.remove('entrando'); }, 1000);
  }

  /* ---------- Resumo e mensagem ---------- */
  function minuscula(t) { return t.charAt(0).toLowerCase() + t.slice(1); }
  function listaPt(a) { return a.length > 1 ? a.slice(0, -1).join(', ') + ' e ' + a[a.length - 1] : a[0]; }

  function atualizarResumo() {
    var nome = $('#resumo-peca'), dl = $('#resumo-dados'), vazio = $('#resumo-vazio');
    var msg = [];
    var marca = (CFG.brand && CFG.brand.name) || 'LASTRO';
    msg.push('Olá, ' + marca + '! Gostaria de pedir um orçamento de bancada sob medida.');
    dl.textContent = '';

    var peca = pecaAtiva();
    if (!peca) {
      nome.textContent = 'Nenhuma peça escolhida ainda.';
      dl.hidden = true; vazio.hidden = false;
      msg[0] += ' Ainda não escolhi a peça nem tenho medidas; explico o que preciso na conversa.';
    } else {
      nome.textContent = 'Peça: ' + nomeDaPeca(estado.peca);
      dl.hidden = false; vazio.hidden = true;
      msg.push('Peça: ' + nomeDaPeca(estado.peca) + '.');
      var pendentes = [];
      peca.campos.forEach(function (c) {
        var v = valorDoCampo(c);
        var txt = v ? (Array.isArray(v) ? listaPt(v.map(minuscula)) : v) : null;
        dl.appendChild(h('dt', { text: c.rotulo }));
        dl.appendChild(h('dd', { class: txt ? '' : 'pendente', text: txt ? (Array.isArray(v) ? v.join(', ') : v) : 'Ainda não informado' }));
        if (txt) {
          var t = c.tipo === 'medida' ? txt.replace('≈', 'aprox.') : (c.tipo === 'escolha' ? minuscula(txt) : txt);
          msg.push(c.rotulo + ': ' + t + '.');
        } else pendentes.push(minuscula(c.rotulo));
      });
      if (pendentes.length) msg.push('Ainda a definir na conversa: ' + listaPt(pendentes) + '.');
    }
    if (estado.arquivos) msg.push('Tenho planta ou fotos para enviar na conversa.');
    msg.push('Sei que as medidas finais são conferidas pela marmoraria.');
    $('#mensagem').textContent = msg.join('\n');
    var aviso = $('#pedido-aviso');
    aviso.textContent = ''; aviso.classList.remove('is-erro');
  }

  function atualizar() { atualizarDesenho(); atualizarResumo(); }

  /* ---------- Eventos ---------- */
  $$('.peca__radio').forEach(function (r) {
    r.addEventListener('change', function () {
      fecharAjuda(false);
      estado.peca = r.value;
      renderCampos();
      atualizar();
      animarDesenho();
    });
  });

  function limpar() {
    fecharAjuda(false);
    estado.peca = null; estado.valores = {};
    $$('.peca__radio').forEach(function (r) { r.checked = false; });
    renderCampos(); atualizar();
    var primeiro = $('.peca__radio'); if (primeiro) primeiro.focus();
  }

  var chkArq = $('#tem-arquivos');
  chkArq.addEventListener('change', function () { estado.arquivos = chkArq.checked; atualizarResumo(); });
  $$('[data-rota-arquivos]').forEach(function (a) {
    a.addEventListener('click', function () { estado.arquivos = true; chkArq.checked = true; atualizarResumo(); });
  });

  function avisar(texto, erro) {
    var a = $('#pedido-aviso');
    a.textContent = texto; a.classList.toggle('is-erro', !!erro);
  }

  function copiar(texto) {
    if (navigator.clipboard && window.isSecureContext) {
      return navigator.clipboard.writeText(texto);
    }
    return Promise.reject(new Error('sem-api'));
  }
  function copiarReserva(alvo) {
    var r = document.createRange(); r.selectNodeContents(alvo);
    var s = window.getSelection(); s.removeAllRanges(); s.addRange(r);
    try { return document.execCommand('copy'); } catch (e) { return false; }
  }

  $('[data-acao="copiar"]').addEventListener('click', function () {
    var alvo = $('#mensagem');
    var texto = alvo.textContent;
    copiar(texto).then(function () { avisar('Mensagem copiada.'); }).catch(function () {
      if (copiarReserva(alvo)) avisar('Mensagem copiada.');
      else avisar('Não foi possível copiar sozinho. A mensagem está selecionada: use Ctrl+C.', true);
    });
  });

  $('[data-acao="whatsapp"]').addEventListener('click', function () {
    var num = ((CFG.contact || {}).whatsapp || '').replace(/\D/g, '');
    if (DEMO.enabled) { avisar(DEMO.contactNotice || 'Contato real ainda não configurado.'); return; }
    if (num.length < 12) { avisar('Configure o número em contact.whatsapp (js/config.js) para abrir o WhatsApp.', true); return; }
    window.open('https://wa.me/' + num + '?text=' + encodeURIComponent($('#mensagem').textContent), '_blank', 'noopener');
  });
  var btnZap = $('[data-acao="whatsapp"]');
  if (CFG.contact && CFG.contact.buttonLabel) btnZap.textContent = CFG.contact.buttonLabel;

  /* ---------- Início ---------- */
  aplicarDemo();
  aplicarCreditos();
  aplicarImagensLocais();
  renderCampos();
  atualizar();
})();
