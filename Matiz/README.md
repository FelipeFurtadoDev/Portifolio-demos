# MATIZ · Estúdio de beleza (modelo 15)

Landing page demonstrativa de um estúdio de unhas, cílios e sobrancelhas. É o terceiro modelo do nicho (depois de TRAÇO, 03, e ENTRE., 10). Uma página, cinco seções, HTML, CSS e JavaScript puros, sem dependências. Decisões de design, testes e pendências em [`DESIGN_NOTES.md`](DESIGN_NOTES.md).

## Como abrir

1. No VS Code, abra a pasta `Portifolio-landing-pages` e inicie o Live Server (porta 5500).
2. Acesse `http://127.0.0.1:5500/15-estudio-de-beleza-matiz/index.html`.

Também funciona em uma subpasta do GitHub Pages: todos os caminhos são relativos. É preciso internet, porque as fotos (Unsplash) e as fontes (Google Fonts) ainda vêm de fora; veja "Fotos e fontes locais".

## Estrutura

```
15-estudio-de-beleza-matiz/
├── index.html                 página (5 seções, cabeçalho e rodapé)
├── css/styles.css             estilos (tokens de cor e fonte no topo)
├── js/config.js               TUDO o que muda por cliente (edite aqui)
├── js/main.js                 menu, atalhos, aproximação das fotos, mensagens, cópia
├── assets/favicon.svg
├── tools/baixar-recursos.ps1  baixa fotos e fontes para uso local
├── modelo.json                ficha do catálogo
├── DESIGN_NOTES.md
└── README.md
```

## Como adaptar para um cliente

Em `js/config.js` (`window.MATIZ_CONFIG`):

- `contact.whatsapp`: só dígitos, com `55` + DDD + número (ex.: `5511912345678`). Com número válido **e** `demo.enabled: false`, todos os botões abrem o WhatsApp.
- `contact.greeting` e `contact.serviceMessage`: texto das mensagens (`{servico}` recebe o nome do serviço).
- `services`: preço e duração de cada serviço, pela chave `data-servico` do `index.html`. Campo vazio ou `null` não aparece; `showPrices: false` esconde todos.
- `visit`: bairro, endereço e horários. Vazio mantém o texto padrão ("Informado na conversa").
- `credits`: créditos das fotos no rodapé.

No `index.html` ficam o nome de cada serviço e o que ele inclui (procure por `data-servico`). Para incluir um serviço, copie um `<li class="item">`, mude `data-servico` e `data-nome` e crie a chave em `services`.

Para a versão comercial: remova o `noindex`, ajuste `<title>`, `description` e `og:image`, troque as fotos pelas da cliente (e remova os selos "Foto ilustrativa") e revise o `modelo.json`.

## Fotos e fontes locais

Rode, dentro desta pasta:

```
powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
```

Depois mude `useLocalImages` para `true` em `js/config.js` (se faltar um arquivo, aquela foto volta para a CDN) e troque os dois `<link rel="preconnect">` das fontes e o `<link>` do Google Fonts no `index.html` por `<link rel="stylesheet" href="css/fontes-locais.css">`.

## Créditos

- Fotos: Unsplash (Licença Unsplash). Autores: photo koala, Gabrielle Wright, Kambria Trout, Ali Shoaee, Mary Borozdina, Gayane Khachatryan e Giorgio Trovato.
- Fontes: Asul e Source Sans 3 (SIL Open Font License 1.1).
