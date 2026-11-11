# VÃO · Banho e Tosa — modelo 11 (estética pet, banho e tosa para cães)

Landing page demonstrativa de uma marca fictícia de banho e tosa para cães, com hora marcada. HTML, CSS e JavaScript puros, sem dependências.

## Como executar

- **VS Code + Live Server:** abra a pasta `Portifolio-landing-pages` e acesse `http://127.0.0.1:5500/11-estetica-pet-vao/index.html`.
- **GitHub Pages:** funciona em subpasta; todos os caminhos são relativos.

## Estrutura

```
11-estetica-pet-vao/
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
├── modelo.json             # dados do catálogo
├── DESIGN_NOTES.md
└── README.md
```

## Personalização rápida (`js/config.js`)

- `brand`: nome e descrição.
- `demo.enabled`: `true` mostra a faixa de aviso e o botão de contato só explica que o atendimento está desativado; `false` transforma o botão num link para o WhatsApp (precisa de `contact.whatsapp`).
- `contact`: WhatsApp (só dígitos, com 55 e DDD), mensagem inicial, rótulo do botão, endereço, bairro/cidade, nota do endereço, link do mapa e Instagram (vazios = não aparecem).
- `hours`: linhas de dias e horários e uma nota.
- `useLocalImages` e `credits`: fotos locais e créditos do rodapé.

**Importante:** o bloco "Consulte um horário" do `index.html` guarda uma cópia do endereço e dos horários para quem navega sem JavaScript (comentário `EDITAR`). Ao trocar esses dados no `config.js`, atualize também a cópia no HTML.

Os textos da capa, das três etapas da visita e dos serviços ficam no `index.html`.

## Fotos e fontes locais

O ambiente usado na criação não tinha internet no terminal, então as fotos vêm da Unsplash e as fontes do Google Fonts. Para deixar tudo local:

1. No PowerShell, dentro de `11-estetica-pet-vao`: `powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1`
2. Em `js/config.js`, mude `useLocalImages` para `true`.
3. No `index.html`, troque o `<link>` do Google Fonts e os dois `preconnect` de fontes por `<link rel="stylesheet" href="css/fontes-locais.css">`.
4. Opcional: troque o `preload`, o `src` e o `srcset` das imagens no HTML pelos arquivos locais (hoje o JS faz a troca depois do carregamento).

Se uma foto local faltar, a página volta sozinha para a URL da Unsplash e avisa no console.

Depois de editar CSS ou JS, aumente o `?v=` nos links do `index.html` para evitar cache.

Detalhes de design, testes e pendências: `DESIGN_NOTES.md`.
