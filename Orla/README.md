# 06 — ORLA Pedra & Projeto (marmoraria)

Landing page demonstrativa de uma página para marmoraria. A empresa é fictícia e as imagens são ilustrativas.

## Como abrir

- **Live Server (VS Code):** abra a pasta `Portifolio-landing-pages`, clique em "Go Live" e acesse `http://127.0.0.1:5500/06-marmoraria/index.html`.
- **GitHub Pages:** todos os caminhos são relativos, então a pasta funciona como subpasta do repositório.

## Estrutura

```
06-marmoraria/
├── index.html              estrutura e textos da capa (procure "EDITÁVEL")
├── css/styles.css          estilos (tokens no topo)
├── css/fontes-locais.css   alternativa à fonte do Google
├── js/config.js            marca, contato, horários, aplicações, materiais, fotos, modo demo
├── js/main.js              montagem das seções, amostruário, menu, formulário
├── tools/baixar-recursos.ps1  baixa fotos e fonte para uso local
└── DESIGN_NOTES.md         decisões, testes e pendências
```

## Personalizar para um cliente

1. `js/config.js`:
   - `brand`, `contact` e `hours`;
   - `applications` e `materials` (textos, peças, fotos);
   - `demo.enabled: false` e `contact.whatsapp` com DDI e DDD (ex.: `5511912345678`).
2. `index.html`: textos da capa, `<title>`, `description`, `og:image` e remoção do `noindex`.
3. Fotos do cliente: adicione em `assets/img/` com o mesmo padrão de nome (`<arquivo>-640.webp`, `<arquivo>-1200.webp`; capa: 800/1600/2400) e ative `useLocalImages: true`.

## Recursos locais

No PowerShell, dentro desta pasta:

```
powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
```

Depois, siga as instruções no topo do script. Ele grava somente dentro de `06-marmoraria`.
