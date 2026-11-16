# QUINA · Bolos sob encomenda (modelo 14)

Landing page demonstrativa de uma confeitaria fictícia de bolos sob encomenda. Uma página, cinco seções, HTML, CSS e JavaScript puros, sem dependências. Detalhes de design, testes e pendências em [`DESIGN_NOTES.md`](DESIGN_NOTES.md).

## Como abrir

1. No VS Code, abra a pasta `Portifolio-landing-pages` e inicie o Live Server (porta 5500).
2. Acesse `http://127.0.0.1:5500/14-confeitaria-quina/index.html`.

Também funciona em uma subpasta do GitHub Pages: todos os caminhos são relativos. É preciso internet, porque as fotos (Unsplash) e as fontes (Google Fonts) ainda vêm de fora; veja "Fotos e fontes locais".

## Estrutura

```
14-confeitaria-quina/
├── index.html              página (5 seções, cabeçalho e rodapé)
├── css/
│   ├── styles.css          estilos
│   └── fontes-locais.css   @font-face para as fontes locais (opcional)
├── js/
│   ├── dados.js            TODOS os dados do cliente e as opções (edite aqui)
│   └── main.js             configurador, galeria, resumo, mensagem, cópia
├── assets/favicon.svg
├── tools/baixar-recursos.ps1   baixa fotos e fontes para uso local
├── modelo.json             ficha do catálogo
├── DESIGN_NOTES.md
└── README.md
```

## Como adaptar para um cliente

Quase tudo está em `js/dados.js` (`window.QUINA_DADOS`):

- `marca`: nome, texto de apresentação.
- `contato`: `whatsapp` (formato `55` + DDD + número, só dígitos) e `instagram`.
- `demo`: `ativo` (`true` mostra a faixa e o aviso de demonstração) e os textos do aviso.
- `pedido`: `convidadosMax` e `tabelaPorcoes` (deixe `null` se a confeitaria não definir porções; o exemplo comentado mostra o formato).
- `formatos`, `acabamentos`, `sabores`: opções do configurador.
- `fotos`, `faixas`: fotos, legendas, créditos e a que opção cada foto está ligada.
- `encomenda.itens`: antecedência, retirada ou entrega, confirmação.

Textos fixos da página (título da abertura, descrições das seções) estão no `index.html`.

### WhatsApp real

Em `js/dados.js`: preencha `contato.whatsapp` e mude `demo.ativo` para `false`. O botão só aparece com número válido; sem ele, a página mostra o aviso e deixa copiar a mensagem. Antes de publicar, confira o número, os prazos e as regras que a página promete.

### Fotos e fontes locais

No PowerShell, dentro da pasta do modelo:

```
powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
```

O script grava só dentro de `14-confeitaria-quina/assets/` (fotos em três larguras e fontes). Depois, siga o cabeçalho do script: `imagens.useLocalImages: true` em `dados.js`, troque a capa e a foto da embalagem no HTML e troque o `<link>` do Google Fonts por `css/fontes-locais.css`. O script ainda não foi executado.

### Antes de publicar

Remover `noindex`, trocar fotos e dados de exemplo, configurar domínio e metadados. A lista completa está em `DESIGN_NOTES.md`, seção "Pendências".

## Créditos

Fotografias: Unsplash (Licença Unsplash). Autores e páginas em `js/dados.js` e no rodapé da página. Fontes: Zalando Sans Expanded e DM Sans (SIL Open Font License 1.1).
