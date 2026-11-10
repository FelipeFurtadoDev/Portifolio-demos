# Bolha & Bento — modelo 05 (estética pet, banho e tosa)

Landing page demonstrativa de uma marca fictícia de banho e tosa para cães e gatos. HTML, CSS e JavaScript puros, sem dependências.

## Como executar

- **VS Code + Live Server:** abra a pasta `Portifolio-landing-pages` e acesse `http://127.0.0.1:5500/05-estetica-pet/index.html`.
- **GitHub Pages:** funciona em subpasta; todos os caminhos são relativos.

## Estrutura

```
05-estetica-pet/
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
├── DESIGN_NOTES.md
└── README.md
```

## Personalização rápida (`js/config.js`)

- `brand`: nome, assinatura e saudação da mensagem.
- `demo.enabled`: `true` mostra os avisos e nunca envia nada; `false` ativa o WhatsApp (precisa de `contact.whatsapp`).
- `contact`: WhatsApp (só dígitos, com 55 e DDD), número exibido, endereço, bairro, cidade, link do Google Maps e Instagram (vazios = não aparecem).
- `hours`: dias e horários.
- `form`: espécies, cuidados, aviso para gatos (`catNote`), etiqueta por cuidado quando o pet é gato (`catServiceNote`) e frase final da mensagem.
- `extras`: cuidados complementares (aparecem só na seção de cuidados; são combinados pelo WhatsApp).
- `images` / `useLocalImages`: fotos da Unsplash e modo local.

Os textos longos (descrição dos cuidados, legendas da galeria, chamadas da capa) ficam no `index.html`, marcados com comentários `EDITAR`. Os ids `banho`, `higienica` e `completa` ligam os botões "Agendar…" ao formulário: se mudar um id em `config.form.services`, ajuste o `data-escolher` correspondente.

## Fotos e fontes locais

O ambiente usado na criação não tinha acesso à internet pelo terminal, então as fotos vêm da Unsplash e as fontes do Google Fonts. Para deixar tudo local:

1. No PowerShell, dentro de `05-estetica-pet`: `powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1`
2. Em `js/config.js`, mude `useLocalImages` para `true`.
3. No `index.html`, troque o `<link>` do Google Fonts e os dois `preconnect` de fontes por `<link rel="stylesheet" href="css/fontes-locais.css">`.
4. Opcional: troque o `preload`, o `src` e o `srcset` das imagens no HTML pelos arquivos locais (hoje o JS faz a troca depois do carregamento).

Se uma foto local faltar, a página volta sozinha para a URL da Unsplash e avisa no console.

Depois de editar CSS ou JS, aumente o `?v=` nos links do `index.html` para evitar cache.

Detalhes de design, testes e pendências: `DESIGN_NOTES.md`.
