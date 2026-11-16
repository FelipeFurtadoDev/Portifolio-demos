# PÁTIO · Estúdio de estética automotiva (modelo 16)

Landing page demonstrativa de um estúdio de estética automotiva que recebe o carro com hora marcada: lavagem detalhada, higienização interna e proteção de pintura. É o terceiro modelo do nicho (depois de VÉRTICE, 04, e PULSO, 09). Uma página, cinco seções, HTML, CSS e JavaScript puros, sem dependências. Decisões de design, testes e pendências em [`DESIGN_NOTES.md`](DESIGN_NOTES.md).

## Como abrir

1. No VS Code, abra a pasta `Portifolio-landing-pages` e inicie o Live Server (porta 5500).
2. Acesse `http://127.0.0.1:5500/16-estetica-automotiva-patio/index.html`.

Também funciona em uma subpasta do GitHub Pages: todos os caminhos são relativos. É preciso internet, porque as fotos (Unsplash) e as fontes (Google Fonts) ainda vêm de fora; veja "Fotos e fontes locais".

## Estrutura

```
16-estetica-automotiva-patio/
├── index.html                 página (5 seções, cabeçalho e rodapé)
├── css/styles.css             estilos (tokens de cor e fonte no topo)
├── js/config.js               TUDO o que muda por cliente (edite aqui)
├── js/main.js                 menu, WhatsApp, estúdio, perguntas frequentes, créditos
├── assets/favicon.svg
├── tools/baixar-recursos.ps1  baixa fotos e fontes para uso local
├── modelo.json                ficha do catálogo
├── DESIGN_NOTES.md
└── README.md
```

## Como adaptar para um cliente

Em `js/config.js` (`window.PATIO_CONFIG`):

- `contact.whatsapp`: só dígitos, com `55` + DDD + número (ex.: `5511912345678`). Com número válido **e** `demo.enabled: false`, todos os botões abrem o WhatsApp com a mensagem pronta.
- `contact.greeting`, `contact.deliveryMessage` e `contact.serviceMessage`: texto das mensagens (`{servico}` recebe o nome do serviço, definido em `services`).
- `studio`: endereço, ponto de referência, horários, aviso de hora marcada e as etapas de chegada e entrega do carro. Enquanto `studio.demo` for `true`, aparece o selo de dado demonstrativo; troque por dados reais e mude para `false`.
- `credits`: créditos das fotos no rodapé.

No `index.html` ficam os textos dos serviços, legendas e as perguntas frequentes. Em modo demonstrativo nada é enviado: o botão abre uma janela com a mensagem de exemplo e a opção de copiá-la.

Para a versão comercial: remova o `noindex`, ajuste `<title>`, `description` e `og:image`, troque as fotos pelas do cliente (e remova os avisos de "foto ilustrativa") e revise o `modelo.json`.

## Fotos e fontes locais

Rode, dentro desta pasta:

```
powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
```

Depois mude `useLocalImages` para `true` em `js/config.js` (se faltar um arquivo, aquela foto volta para a CDN) e troque os dois `<link rel="preconnect">` das fontes e o `<link>` do Google Fonts no `index.html` por `<link rel="stylesheet" href="css/fontes-locais.css">`. O script ainda não foi executado; confira o resultado na primeira vez.

## Créditos

- Fotos: Unsplash (Licença Unsplash). Autores: Luay Barani, Willian Cittadin, Towfiqu barbhuiya, Mohamed Gado, Adrian Dascal, Frankie Lopez, Obi, Sean Foster, Deniz Demirci, Muhammad Saad e Tyler.
- Fontes: Barlow Semi Condensed e DM Sans (SIL Open Font License 1.1).
