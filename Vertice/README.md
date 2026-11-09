# VÉRTICE Detail Lab — modelo 04 (estética automotiva)

Landing page demonstrativa de uma marca fictícia de estética automotiva. HTML, CSS e JavaScript puros, sem dependências externas.

## Como executar

- **VS Code + Live Server:** abra a pasta `Portifolio-landing-pages` e acesse `http://127.0.0.1:5500/04-estetica-automotiva/index.html`.
- **GitHub Pages:** funciona em subpasta; todos os caminhos são relativos.

## Estrutura

```
04-estetica-automotiva/
├── index.html
├── css/
│   ├── fontes.css      # @font-face das fontes locais
│   └── styles.css
├── js/
│   ├── config.js       # TUDO o que muda por cliente
│   └── main.js
├── assets/
│   ├── fonts/          # Big Shoulders Display e Schibsted Grotesk (OFL)
│   └── img/            # 9 fotos em WebP, 2 ou 3 tamanhos cada
├── DESIGN_NOTES.md
└── README.md
```

## Personalização rápida (`js/config.js`)

- `brand`: nome, saudação da mensagem e assinatura.
- `demo.enabled`: `true` mostra o aviso e nunca envia nada; `false` ativa o WhatsApp.
- `contact.whatsapp`: só dígitos, com DDI e DDD (ex.: `5511912345678`).
- `contact.instagram`, `address`, `hours`, `region`, `pickup`.
- `text`: títulos e textos principais de cada seção.
- `services`, `gallery`, `process`: serviços, legendas da galeria e os 3 passos do orçamento; os ids dos serviços ligam o HTML ao formulário.
- `form.vehicles`, `form.goals`, `form.closingLine`: opções e frase final da mensagem.
- `images` / `useLocalImages`: fotos, créditos e alternativa remota.

Ao trocar fotos, mantenha os nomes em `assets/img` (`<nome>-<largura>.webp`) ou ajuste `srcset`, `width` e `height` no `index.html`.

Depois de editar CSS ou JS, aumente o `?v=` nos links do `index.html` para evitar cache.

Detalhes de design, testes e pendências: `DESIGN_NOTES.md`.
