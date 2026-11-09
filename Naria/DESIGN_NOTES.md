# NÁRIA — Notas de design e decisões técnicas

Modelo 01 do catálogo. Marca fictícia de estética facial.
Última revisão: 09/11/2026 (revisão técnica final de pendências).

## 1. Direção de arte (aprovada — não alterar sem nova decisão)

- **Conceito:** editorial sensorial, inspirado em publicações de beleza.
- **Paleta:** marfim `#F6F0EB`, ameixa `#682F49`, argila `#D68B79`, rosé `#E8CBC4`, grafite `#29252A`.
  A ameixa domina (blocos inteiros), a argila só aparece em detalhes. Isso evita a combinação genérica "creme + terracota".
- **Tipografia:** Bodoni Moda (títulos, fonte variável com tamanho óptico) e Hanken Grotesk (texto).
- **Peça central:** "Coleção de cuidados" como sumário de revista (abas acessíveis com foto e ficha).
- **Fotografia:** a foto da abertura é a protagonista (vertical, luz quente, mãos em cena). As demais variam proporção (4:5, 5:4, 3:4) e escala.
  Legendas "Imagem ilustrativa" em todas as fotos; as fotos do espaço levam "não retratam o estúdio".
- **Movimento:** uma única sequência na abertura, mais um fade discreto ao trocar de serviço.

## 2. Decisões técnicas

### Imagens
- **Padrão atual:** carregadas da Unsplash (`images.unsplash.com`) com `srcset` de 480 a 1600 px, recorte por proporção e foco (`crop=top/bottom`).
  O servidor da Unsplash entrega AVIF/WebP conforme o navegador.
- **Modo local preparado (`useLocalImages` em `js/config.js`):**
  - quando `true`, o site usa `assets/img/<file>-800.webp` e `<file>-1200.webp`;
  - se um arquivo local faltar, aquela foto volta sozinha para a URL remota e um aviso aparece no console;
  - os tamanhos são 800 e 1200 px (e não 1600) porque 1200 já cobre a maior exibição real em telas de alta densidade.
    Nas versões de 1600 px, algumas fotos passavam de 500 KB (hidratação: 1 MB).
- **`tools/baixar-recursos.ps1`** baixa as 18 imagens com os mesmos recortes usados hoje, mais as 3 fontes.
  As 21 URLs do script foram validadas no navegador (HTTP 200, WebP / woff2). O script em si não foi executado, porque este ambiente não roda PowerShell.
- **Por que as imagens não foram salvas nesta revisão:** o ambiente de desenvolvimento não tem acesso de rede para downloads. Além disso, a ferramenta de transferência para a pasta do projeto injeta metadados de procedência (C2PA) em arquivos de imagem. Baixar pelo script, direto no computador, evita os dois problemas.

### Fontes
- **Padrão atual:** Google Fonts, com `preconnect` e `display=swap`.
- **Alternativa local pronta:** `css/fontes-locais.css` (subconjunto latin, que cobre o português; fontes variáveis; total aproximado de 131 KB em 3 arquivos).
  Testada no navegador apontando para os mesmos arquivos .woff2: métricas idênticas às do Google Fonts em 6 combinações de família, estilo e peso.
- **Benefícios de migrar:**
  - privacidade: sem envio do IP do visitante ao Google, ponto relevante pela LGPD;
  - menos uma origem externa;
  - o site funciona sem depender de terceiros.
  - O ganho de velocidade é pequeno. Por isso a migração é recomendada **na entrega ao cliente**, não obrigatória na demonstração.

### Favicon
- O arquivo `assets/favicon.svg` ficou com cerca de 7,7 KB de metadados C2PA injetados pela ferramenta de transferência. Tentativas de regravar o arquivo limpo receberam a injeção de novo.
- **Solução aplicada:** o mesmo SVG agora vai embutido no `<link rel="icon">` do `index.html` (data URI, 268 bytes, sem requisição extra).
  A renderização foi comparada pixel a pixel com o arquivo original: diferença zero.
- `assets/favicon.svg` não é mais referenciado. Pode ser apagado, ou substituído pelo conteúdo limpo abaixo, se preferir manter um arquivo editável:

```svg
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="14" fill="#682F49"/><text x="32" y="46" text-anchor="middle" font-family="Didot, 'Bodoni 72', Georgia, serif" font-style="italic" font-size="40" fill="#F6F0EB">N</text></svg>
```

- **Limitação conhecida:** a letra usa fontes do sistema (Didot, Bodoni 72, Georgia), então o "N" varia levemente entre sistemas operacionais. Para um cliente real, o ideal é um favicon com a letra convertida em contorno (path).

### Indexação
- `<meta name="robots" content="noindex, nofollow">` **mantido**, com comentário no `<head>`. Remover somente ao publicar o site de um cliente real.

### Movimento reduzido
- Com `prefers-reduced-motion: reduce`:
  - as animações de entrada não existem (ficam dentro de `no-preference`);
  - as transições caem para ~0;
  - a rolagem suave é desligada;
  - o JS não aplica o fade ao trocar de serviço.
- **Teste realizado (simulação):** o navegador integrado não emula essa preferência. Recarreguei a página com as regras `reduce` forçadas, as `no-preference` desligadas e `matchMedia` respondendo "reduce".
  - Resultado: `animation-name: none` no título, na foto e no texto da abertura; `scroll-behavior: auto`; transições de 0,00001 s; a troca de aba funcionou sem animação.
  - Controle: sem a simulação, o título volta a ter a animação `line-in`.
  - Ainda falta um teste com a preferência real do sistema operacional (ver pendências).

## 3. Testes desta revisão (09/11/2026, Live Server, navegador integrado)

- Página normal em 1440 px e 390 px: sem rolagem horizontal, 9/9 imagens carregadas, console limpo.
- Menu mobile (abrir e fechar com Esc), formulário de agendamento e aviso de demonstração funcionando.
- Modo local simulado sem arquivos: 9 fallbacks para a URL remota, 0 imagens quebradas.
- Fontes locais (simulação com os mesmos .woff2): métricas idênticas.
- Favicon embutido: renderização idêntica ao original.
- Movimento reduzido: simulação descrita acima.
- Não testado: o script PowerShell e o modo local com os arquivos presentes.

## 4. Pendências

1. **Rodar `tools/baixar-recursos.ps1`** no computador. Depois:
   - ativar `useLocalImages: true`;
   - trocar o link das fontes;
   - testar no Live Server se as 9 fotos vêm de `assets/img` (aba Rede do navegador) e se a tipografia continua igual.
2. **Apagar ou limpar `assets/favicon.svg`** (opcional; não é mais usado).
3. **Testar movimento reduzido de verdade:**
   - Windows: Configurações > Acessibilidade > Efeitos visuais > desligar "Efeitos de animação";
   - ou, no Chrome DevTools: Rendering > "Emulate CSS media feature prefers-reduced-motion".
4. **Desempenho (opcional):** a foto da abertura só é definida quando o JS roda. Se a nota de LCP importar para o cliente, colocar a foto final direto no HTML, com `<link rel="preload" as="image">`.

## 5. Antes de entregar a um cliente real

- [ ] Trocar marca, slogan, textos e serviços (`js/config.js` e os blocos `EDITÁVEL` do `index.html`).
- [ ] Preencher `contact.whatsapp` (DDI + DDD + número) e mudar `demo.enabled` para `false`. Testar se o botão abre o WhatsApp certo com a mensagem pronta.
- [ ] Substituir as fotos ilustrativas pelas do cliente, com autorização de uso de imagem das pessoas fotografadas. Remover as legendas "Imagem ilustrativa" e "não retratam o estúdio" quando as fotos forem reais.
- [ ] Atualizar ou remover os créditos da Unsplash no rodapé, conforme as fotos usadas.
- [ ] Hospedar imagens e fontes localmente (pendência 1).
- [ ] Revisar os textos com a profissional, seguindo as regras de publicidade da área:
  - sem promessas de resultado e sem termos médicos;
  - sem antes e depois sem verificar as normas;
  - confirmar se as durações informadas correspondem à realidade.
- [ ] Endereço real, horários reais, Instagram real (`instagramUrl`).
- [ ] Remover o `noindex`; ajustar `<title>`, `description` e `og:image` (de preferência uma foto do cliente, 1200×630).
- [ ] Gerar um favicon definitivo, com a letra em contorno ou a logo do cliente.
- [ ] Se o site usar fontes do Google ou outros serviços de terceiros, avaliar a necessidade de aviso de privacidade.
- [ ] Repetir o protocolo de revisão visual (360, 390, 768, 1024 e 1440 px), além de teclado e console, depois de trocar o conteúdo.
