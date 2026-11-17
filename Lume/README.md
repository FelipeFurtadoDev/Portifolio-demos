# LUME · Marmoraria (Modelo 18)

Demonstração de site de uma página para marmorarias residenciais: capa com a marca em
azul-cobalto e uma cozinha em tela larga, mural fotográfico por ambiente, comparação de
duas referências lado a lado, acabamento visto de perto, lista de peças sob medida e
fechamento de contato. Marca, endereço, horários e contato são **fictícios**.

## Como ver
1. No VS Code, abra a pasta `Portifolio-landing-pages` e clique em **Go Live**.
2. Acesse `http://127.0.0.1:5500/18-marmoraria-lume/index.html`.

Funciona também em subpasta do GitHub Pages (caminhos relativos, sem build).

## Arquitetura (seis seções, mais cabeçalho e rodapé)
1. **Capa**: "LUME" gigante, "Marmoraria", foto horizontal e faixa com título e botão "Conversar sobre meu projeto".
2. **Escolha o ambiente**: mural com filtros Todos/Cozinha/Banheiro/Área gourmet e "Comparar referência" em cada foto.
3. **Duas referências, lado a lado**: até duas fotos do mural, com legendas factuais, remover/limpar e botão que leva os nomes ao WhatsApp.
4. **O acabamento visto de perto**: borda, recorte da cuba e encontro entre peças, com o que conversar antes.
5. **O que você precisa fazer sob medida?**: bancadas, lavatórios, soleiras e peitoris, cada um com sua mensagem.
6. **Vamos conversar sobre seu projeto**: bloco cobalto com contato, local e horários demonstrativos.

O mural, as seções e o botão geral de contato funcionam sem JavaScript (o contato geral
leva à seção de contato). Filtros, comparação e mensagens dependem de JavaScript.

## Onde mudar o que é do cliente
- `js/config.js`: marca, modo demonstração, WhatsApp (`contact.whatsapp`), endereço, horários, fotos e créditos, mensagens por peça.
- `index.html`: textos das seções.
- Para vender: `demo.enabled: false`, número em `contact.whatsapp` (só dígitos, com 55 e DDD), remover o `noindex`, trocar endereço e horários.
- Os arquivos `index.html` e `js/config.js` são gerados de uma fonte única durante a criação do modelo; depois da entrega, edite-os diretamente.

## Recursos locais (opcional)
`powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1` baixa as 10 fotos
(4 larguras, WebP) e as 2 fontes. Depois: `useLocalImages: true` em `js/config.js` e trocar
o `<link>` do Google Fonts por `css/fontes-locais.css`. O script não foi executado na criação.

## Observações
- Fotos: Unsplash (licença Unsplash), ilustrativas; não são trabalhos da marca. Créditos no rodapé e em `js/config.js`.
- As referências escolhidas ficam só na aba (`sessionStorage`); nada é enviado.
- Detalhes, testes e pendências: `DESIGN_NOTES.md`.
