# LASTRO · Bancadas sob medida — modelo 12 (marmoraria)

Landing page demonstrativa de uma marmoraria fictícia que faz bancadas, ilhas e lavatórios sob medida. Ela responde a uma pergunta: **"O que preciso informar para pedir orçamento da minha bancada?"**. HTML, CSS e JavaScript puros, sem dependências.

## Como abrir a prévia local

- **VS Code + Live Server:** abra a pasta `Portifolio-landing-pages` e acesse `http://127.0.0.1:5500/12-marmoraria-lastro/index.html`.
- **Sem Live Server:** abra o `index.html` no navegador, ou rode `python -m http.server 8000` dentro de `12-marmoraria-lastro` e acesse `http://127.0.0.1:8000/`.
- **GitHub Pages:** funciona em subpasta; todos os caminhos são relativos.

Para ver as fotos e as fontes é preciso ter internet (veja "Fotos e fontes locais").

## Estrutura

```
12-marmoraria-lastro/
├── index.html
├── css/
│   ├── styles.css
│   └── fontes-locais.css   # @font-face para quando as fontes forem baixadas
├── js/
│   ├── config.js           # o que muda por cliente
│   └── main.js
├── assets/
│   └── favicon.svg         # assets/img e assets/fonts são criadas pelo script
├── tools/
│   └── baixar-recursos.ps1 # baixa fotos (WebP) e fontes para uso local
├── capturas/               # capturas de tela da capa e do configurador
├── modelo.json             # dados do catálogo
├── DESIGN_NOTES.md
└── README.md
```

## Personalização rápida

**`js/config.js`**
- `brand`: nome.
- `demo.enabled`: `true` mostra a faixa de aviso e o botão do WhatsApp só explica que o contato não está configurado; `false` faz o botão abrir `https://wa.me/<número>?text=<mensagem>` (precisa de `contact.whatsapp`, só dígitos, com 55 e DDD).
- `contact`: WhatsApp e rótulo do botão. Vazio enquanto for demonstração.
- `pecas`: os campos de cada peça (rótulo, tipo `medida`, `recortes` ou `escolha`, opções, ajuda e ligação com o desenho).
- `ajudas`: textos dos dois botões de ajuda.
- `medidas`: faixa aceita (10 a 1500 cm).
- `useLocalImages`, `localWidths` e `credits`: fotos locais e créditos do rodapé.

**`index.html`** (marcado com `EDITAR`): textos da capa, nomes e orientações dos quatro cartões de peça, legendas e textos das seções. Os cartões ficam no HTML de propósito, para a orientação continuar legível sem JavaScript.

**Esboços:** os quatro SVGs ficam no `index.html` (`#esb-reta`, `#esb-l`, `#esb-ilha`, `#esb-lavatorio`). Os textos com `data-cota` mostram a medida digitada; os grupos com `data-recorte` e `data-cuba` aparecem conforme a escolha. Para uma nova peça: um cartão, um SVG com `id="esb-<id>"` e a entrada em `pecas`.

## Fotos e fontes locais

O ambiente de criação não tinha internet no terminal, então as fotos vêm da Unsplash e as fontes do Google Fonts. Para deixar tudo local:

1. No PowerShell, dentro de `12-marmoraria-lastro`: `powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1`
2. Em `js/config.js`, mude `useLocalImages` para `true`.
3. No `index.html`, troque o `<link>` do Google Fonts e os dois `preconnect` de fontes por `<link rel="stylesheet" href="css/fontes-locais.css">`.
4. Opcional: troque o `preload`, o `src` e o `srcset` das imagens no HTML pelos arquivos locais (hoje o JS faz a troca depois do carregamento).

Se uma foto local faltar, a página volta sozinha para a URL da Unsplash e avisa no console. O script **não foi executado** neste ambiente.

Depois de editar CSS ou JS, aumente o `?v=` nos links do `index.html` para evitar cache.

## Catálogo

O `modelo.json` já está pronto (`ordem: 120`). Para levar o modelo ao catálogo, dentro de `Portifolio-demos`:
`powershell -ExecutionPolicy Bypass -File catalogo\build\copiar-modelo.ps1 -Origem <pasta-origem> -Destino Lastro`

Detalhes de design, testes e pendências: `DESIGN_NOTES.md`.
