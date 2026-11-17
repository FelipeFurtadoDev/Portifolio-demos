# PINGO · Banho & Tosa (modelo 17)

Landing page demonstrativa de um banho e tosa de bairro para cães, com hora marcada pelo WhatsApp. É o terceiro modelo do nicho pet (depois de Bolha & Bento, 05, e VÃO, 11). Uma página, cinco seções, HTML, CSS e JavaScript puros, sem dependências. Decisões de design, testes e pendências em [`DESIGN_NOTES.md`](DESIGN_NOTES.md).

## Como abrir

1. No VS Code, abra a pasta `Portifolio-landing-pages` e inicie o Live Server (porta 5500).
2. Acesse `http://127.0.0.1:5500/17-estetica-pet-pingo/index.html`.

Também funciona em uma subpasta do GitHub Pages: todos os caminhos são relativos. É preciso internet, porque as fotos (Unsplash) e as fontes (Google Fonts) ainda vêm de fora; veja "Fotos e fontes locais".

## Estrutura

```
17-estetica-pet-pingo/
├── index.html                 página (5 seções, cabeçalho e rodapé)
├── css/styles.css             estilos (tokens de cor e fonte no topo)
├── js/config.js               TUDO o que muda por cliente (edite aqui)
├── js/main.js                 menu de serviços, WhatsApp, endereço e horários, créditos
├── assets/favicon.svg
├── tools/baixar-recursos.ps1  baixa fotos e fontes para uso local
├── modelo.json                ficha do catálogo
├── DESIGN_NOTES.md
└── README.md
```

## Como adaptar para um cliente

Em `js/config.js` (`window.PINGO_CONFIG`):

- `contact.whatsapp`: só dígitos, com `55` + DDD + número (ex.: `5511912345678`). Com número válido **e** `demo.enabled: false`, todos os botões abrem o WhatsApp com a mensagem pronta.
- `contact.greeting` e `contact.serviceMessage`: texto das mensagens (`{servico}` recebe o nome do serviço, definido em `services`).
- `contact.fichaMessage` (`intro` e `closing`): abertura e fechamento da mensagem montada pela ficha "Antes de trazer seu cão". Entre os dois entram as respostas, uma por linha (`Porte — …`, `Pelagem — …`, `Primeira visita — Sim/Não`).
- `studio`: endereço, ponto de referência, horários e aviso de hora marcada. Enquanto `studio.demo` for `true`, aparece o selo de dado demonstrativo.
- `credits`: créditos das fotos no rodapé.

O `index.html` guarda uma cópia do endereço, dos horários, da mensagem geral e dos créditos (blocos marcados com `EDITAR`), para a página continuar legível sem JavaScript. Ao personalizar, altere o `config.js` e confira esses blocos. Os textos dos serviços, as legendas e a ficha ficam no `index.html`.

Em modo demonstrativo nada é enviado: o botão abre uma janela com a mensagem de exemplo e a opção de copiá-la. Isso vale também para o botão "Enviar informações pelo WhatsApp" da ficha, que só abre o WhatsApp quando o número é válido e `demo.enabled` é `false`.

### Ficha como formulário

A seção `#antes` é um formulário só de front-end: três grupos de seleção única (rádios dentro de `fieldset`/`legend`), todos obrigatórios, sem campos de dados pessoais e sem envio a servidor. Faltando uma resposta, a orientação aparece junto do grupo e o foco vai ao primeiro grupo pendente. As opções e o rótulo de cada linha da mensagem (`data-rotulo-msg`) ficam no `index.html`; os valores dos rádios são o que entra na mensagem. Sem JavaScript, o envio leva ao bloco de contato (`#contato`).

Para a versão comercial: remova o `noindex`, ajuste `<title>`, `description` e `og:image`, troque as fotos pelas do cliente (e remova os avisos de "foto ilustrativa") e revise o `modelo.json`.

## Fotos e fontes locais

Rode, dentro desta pasta:

```
powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
```

Depois mude `useLocalImages` para `true` em `js/config.js` (se faltar um arquivo, aquela foto volta para a CDN) e troque os dois `<link rel="preconnect">` das fontes e o `<link>` do Google Fonts no `index.html` por `<link rel="stylesheet" href="css/fontes-locais.css">`. O script ainda não foi executado; confira o resultado na primeira vez.

## Créditos

- Fotos: Unsplash (Licença Unsplash). Autores: Neakasa (duas fotos), Ayla Verschueren, Ludek Pytloun, Buddy AN, zutail happytail, Eliza Ari e Sandy Andrade.
- Fontes: Bricolage Grotesque e DM Sans (SIL Open Font License 1.1).
