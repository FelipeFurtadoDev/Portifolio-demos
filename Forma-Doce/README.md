# 02 — Forma Doce | Confeitaria de celebrações

Landing page demonstrativa de uma marca **fictícia**, parte do catálogo de modelos para pequenos negócios.
Conceito visual: **pop artesanal**. Decisões de design em [`DESIGN_NOTES.md`](DESIGN_NOTES.md).

## Como executar

Abra a pasta `Portifolio-landing-pages` no VS Code, inicie o **Live Server** e acesse:

```
http://127.0.0.1:5500/02-confeitaria/index.html
```

Não há build nem dependências. É preciso estar conectado à internet para carregar as fontes (Google Fonts) e as fotografias (Unsplash).

## Estrutura

```
02-confeitaria/
├── index.html        Estrutura e textos de venda (comentários "EDITÁVEL")
├── css/styles.css    Tokens (cores, fontes, espaços) no :root + componentes
├── js/config.js      Configuração central: marca, demonstração, WhatsApp,
│                     Instagram, produtos do formulário, ocasiões, créditos
├── js/main.js        Menu, filtro por ocasião, formulário, mensagem de WhatsApp
├── assets/favicon.svg
├── DESIGN_NOTES.md
└── README.md
```

## Como adaptar para um cliente real

1. **`js/config.js`**
   - `brand`: nome, descrição e assinatura.
   - `contact.whatsapp`: apenas dígitos, com 55 + DDD + número (ex.: `5511912345678`).
   - `demo.enabled: false`: remove a faixa e o aviso de demonstração e faz o formulário abrir o WhatsApp.
   - `contact.instagram`, `contact.hours`, `contact.serviceArea`.
   - `products`: nomes, rótulos e limites de quantidade. O `id` precisa coincidir com `data-product` / `data-product-card` no HTML.
   - `occasions`: o `id` precisa coincidir com `data-occasion` (adesivos) e `data-occasions` (produtos).
   - `photoCredits`: atualize ou esvazie quando as fotos forem do cliente.
2. **`index.html`**: textos marcados com `EDITÁVEL`, metadados do `<head>` (título, descrição, `og:image`) e `src`/`srcset`/`alt` das fotos. **Remova** `<meta name="robots" content="noindex, nofollow">` ao publicar.
3. Quando as fotos forem da própria confeitaria, remova as etiquetas `Foto ilustrativa` (`<figcaption class="photo-tag">`).
4. Cores e fontes: bloco `:root` no topo de `css/styles.css`.

## Pedido pelo WhatsApp

O formulário pede produto, data desejada, quantidade (a unidade muda conforme o produto), nome e, opcionalmente, ocasião e preferências. Depois monta a mensagem e mostra uma prévia ao vivo.

- **Modo demonstração** (padrão) ou número inválido: abre um aviso com a mensagem pronta e um botão para copiá-la. Nenhum WhatsApp é aberto e nenhum dado é enviado.
- **Modo real** (`demo.enabled: false` + número válido): abre `https://wa.me/<número>?text=<mensagem>` em nova aba.

A mensagem deixa claro que o pedido só é confirmado depois da conversa. Não há backend nem armazenamento de dados.

## Imagens

Todas as fotografias vêm da [Unsplash](https://unsplash.com) e estão sob a [Licença Unsplash](https://unsplash.com/license): uso comercial gratuito, sem atribuição obrigatória (o site atribui mesmo assim). A licença não permite vender as fotos sem modificação nem usá-las para montar um serviço concorrente de imagens. Todas foram verificadas como "gratuitas" (não Unsplash+) na data de criação.

| Uso | Fotógrafo(a) | Página |
|---|---|---|
| Abertura (bolo de cerejas) | Deva Williamson | https://unsplash.com/photos/HHebuDYjP4I |
| Bolos personalizados | Katie Rosario | https://unsplash.com/photos/QNyRp21hb5I |
| Fatia ("por dentro") | Aneta Voborilova | https://unsplash.com/photos/Rj1IWO8IozE |
| Doces finos (brigadeiros) | Ediglecio Lêla | https://unsplash.com/photos/FBmw3Thd6Io |
| Caixas para presente | Ciocan Ciprian | https://unsplash.com/photos/rINURuoyAlA |
| Kits de comemoração | Rehina Sultanova | https://unsplash.com/photos/rIiGJGOPLIw |
| Processo (mãos confeitando) | Mick Haupt | https://unsplash.com/photos/eR3LPfuDzGk |
| Encerramento (mesa de festa) | Createasea | https://unsplash.com/photos/QKCfljjWC6s |

**Pendência:** salvar versões locais otimizadas em `assets/img/`, porque o ambiente de criação não conseguiu baixar arquivos. Hoje as fotos são carregadas de `images.unsplash.com` em tamanhos responsivos. Para trocar, basta substituir `src`/`srcset` no `index.html`.
