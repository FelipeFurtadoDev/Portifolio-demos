# LASTRO · Pedra natural sob medida (Modelo 12, versão 2 revisada)

Vitrine de ambientes e acabamentos para marmorarias residenciais. Marca e
conteúdo fictícios, para demonstração. A versão 1 (configurador de orçamento)
está arquivada em `../_versoes/12-lastro-v1-configurador/`.

## Como ver
1. No VS Code, abra a pasta `Portifolio-landing-pages` e clique em **Go Live**.
2. Acesse `http://127.0.0.1:5500/12-marmoraria-lastro/index.html`.

Também funciona em subpasta do GitHub Pages (caminhos relativos, sem build).

## Arquitetura (cinco seções, mais cabeçalho e rodapé)
1. **Abertura**: ilha de pedra clara com marcenaria em madeira, promessa e atalhos para os ambientes.
2. **Ambientes**: três painéis que se abrem (cozinha, com o destaque "Ilhas e áreas gourmet"; banheiro e lavabo; sala e estar), com galeria.
3. **Detalhes**: mosaico de veios, recorte de cuba, quina e encontro de peças, com legendas neutras.
4. **Peças**: lista compacta do que a marmoraria faz sob medida e o processo em quatro etapas (fotos ilustrativas nas três primeiras).
5. **Conversa**: referências guardadas, peças de interesse, "Tenho planta ou fotos para enviar", medidas aproximadas (opcional) e mensagem pronta.

## Onde mudar o que é do cliente
- `js/config.js`: marca, modo demonstração, WhatsApp (`contact.whatsapp`), fotos e créditos, nomes das peças.
- `index.html`: textos de cada seção.
- Para vender: `demo.enabled: false`, número em `contact.whatsapp`, remover `noindex`.

## Recursos locais (opcional)
`powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1` baixa as 19
fotos (3 larguras, WebP) e as 2 fontes. Depois: `useLocalImages: true` em
`js/config.js` e trocar o `<link>` do Google Fonts por `css/fontes-locais.css`.

## Observações
- Fotos: Unsplash (licença Unsplash), ilustrativas; não são trabalhos da marca. As do processo vêm de lugares diferentes.
- Referências guardadas ficam só na aba (sessionStorage); nada é enviado.
- Detalhes, testes e pendências: `DESIGN_NOTES.md`.
