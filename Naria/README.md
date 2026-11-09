# 01 — Nária | Estúdio de Estética Facial

Landing page demonstrativa de uma marca **fictícia**, do catálogo de modelos para pequenos negócios.
Conceito visual: **editorial sensorial**.

## Como executar

Abra a pasta `Portifolio-landing-pages` no VS Code e inicie o **Live Server**. Depois acesse:

```
http://127.0.0.1:5500/01-estetica-facial/index.html
```

O site não tem build nem dependências instaladas. Precisa de internet para carregar as fontes (Google Fonts) e as fotografias (Unsplash).

## Estrutura

```
01-estetica-facial/
├── index.html       Estrutura e textos institucionais (marcados com "EDITÁVEL")
├── css/styles.css         Tokens de cor e tipografia, layout e componentes
├── css/fontes-locais.css  Alternativa ao Google Fonts (opcional, ver abaixo)
├── js/config.js           Configuração central: marca, contatos, endereço, horários,
│                          serviços, perguntas frequentes e imagens
├── js/main.js             Renderização a partir do config, abas, menu, formulário/WhatsApp
├── tools/baixar-recursos.ps1  Baixa fotos e fontes para assets/img e assets/fonts
├── assets/                Arquivos locais (favicon.svg antigo, não mais usado)
├── DESIGN_NOTES.md        Decisões técnicas, testes e pendências
└── README.md
```

## Como adaptar para um cliente real

1. Em `js/config.js`:
   - `brand`: nome, descrição e slogan.
   - `contact.whatsapp`: número só com dígitos, com DDI e DDD (ex.: `5511912345678`).
   - `demo.enabled`: mude para `false`. Assim a barra de demonstração e os avisos somem, e o formulário passa a abrir o WhatsApp.
   - `address`, `hours`, `periods`, `services` e `faq`.
   - `images`: troque `src` por fotos do cliente (ex.: `assets/img/sala.jpg`) e atualize `alt` e `credit`. Se uma foto for do próprio cliente, remova o `credit` ou adapte o texto de créditos no rodapé.
2. Em `index.html`: textos da abertura, do estúdio, do ritual e do espaço (comentários `EDITÁVEL`), e os metadados do `<head>` (título, descrição, `og:image`). Remova `<meta name="robots" content="noindex, nofollow">` ao publicar.
3. Revise as legendas "Imagem ilustrativa": remova-as quando as fotos forem do estúdio real.
4. Cores e fontes ficam no topo de `css/styles.css` (bloco `:root`).

Cuidados com a publicidade: não inclua promessas de resultado, termos médicos, depoimentos não autorizados nem antes e depois sem verificar as regras aplicáveis à profissão.

## Agendamento

O formulário monta uma mensagem com cuidado escolhido, período, nome e observações:

- **Modo demonstração** (padrão): abre um aviso com a mensagem pronta e um botão para copiá-la. Nenhum WhatsApp é aberto e nenhum dado é enviado.
- **Modo real**: abre `https://wa.me/<número>?text=<mensagem>` em nova aba.

Não há backend nem armazenamento de dados.

## Imagens

Todas as fotografias vêm da [Unsplash](https://unsplash.com) e estão sob a [Licença Unsplash](https://unsplash.com/license): uso comercial gratuito, sem necessidade de atribuição (o site atribui mesmo assim). A licença não permite revender as fotos sem modificação nem montar um serviço concorrente de imagens. As fotos são carregadas diretamente de `images.unsplash.com`, em tamanhos responsivos.

| Uso | Fotógrafo(a) | Página |
|---|---|---|
| Abertura | Dominique Rivas | https://unsplash.com/photos/rWwuf8yKw4Y |
| O estúdio (textura) | Kelsey Curtis | https://unsplash.com/photos/kD9qprR6HBI |
| Limpeza de pele | kimia kazemi | https://unsplash.com/photos/J6Hg_YH2tFk |
| Hidratação facial | Rosa Rafael | https://unsplash.com/photos/Pe9IXUuC6QU |
| Massagem facial | Anna Keibalo | https://unsplash.com/photos/qybZ2w0CzMw |
| Cuidado personalizado | Kadarius Seegars | https://unsplash.com/photos/Mxy5gokl8mE |
| Ritual de atendimento | Anna Keibalo | https://unsplash.com/photos/BJ7i-96glwM |
| Espaço (sala) | Mayur Roxan | https://unsplash.com/photos/JnsuyfJrxQw |
| Espaço (detalhe) | Anna Keibalo | https://unsplash.com/photos/-kYCpF55lIg |

As fotos de ambiente são de referência e aparecem com a legenda "não retratam o estúdio". Nenhuma imagem é apresentada como trabalho realizado pela marca.

## Imagens e fontes locais (recomendado antes de entregar a um cliente)

Por padrão, fotos e fontes vêm da Unsplash e do Google Fonts. Para hospedar tudo no próprio site:

1. Dentro de `01-estetica-facial`, rode:
   ```
   powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
   ```
   O script cria `assets/img/*.webp` (800 e 1200 px, com os mesmos recortes) e `assets/fonts/*.woff2`.
2. Em `js/config.js`, mude `useLocalImages` para `true`. Se alguma foto faltar, o site usa a URL remota daquela foto automaticamente.
3. No `index.html`, troque os três `<link>` do Google Fonts por `<link rel="stylesheet" href="css/fontes-locais.css">`.

Detalhes e testes em `DESIGN_NOTES.md`.

## Favicon

O ícone está embutido no próprio `index.html` (procure `rel="icon"`). Para mudar a letra ou as cores, edite esse trecho; `%23682F49` é a cor `#682F49`.
