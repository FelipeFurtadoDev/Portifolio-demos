# LASTRO · Pedra natural sob medida (Modelo 12, versão 2)

Vitrine de ambientes e acabamentos para marmorarias residenciais. Marca e
conteúdo fictícios, para demonstração. A versão 1 (configurador de orçamento)
está arquivada em `../_versoes/12-lastro-v1-configurador/`.

## Como ver
1. No VS Code, abra a pasta `Portifolio-landing-pages` e clique em **Go Live**.
2. Acesse `http://127.0.0.1:5500/12-marmoraria-lastro/index.html`.

Também funciona em subpasta do GitHub Pages (caminhos relativos, sem build).

## Arquitetura (cinco seções, mais cabeçalho e rodapé)
1. **Abertura**: ilha em pedra escura, promessa e atalhos para os ambientes.
2. **Ambientes**: três painéis que se abrem (cozinha, banheiro e lavabo, sala e estar), com galeria.
3. **Detalhes**: mosaico de acabamentos, bordas e recortes.
4. **Peças**: o que a marmoraria faz sob medida e como o projeto acontece.
5. **Conversa**: referências guardadas, peças de interesse e mensagem pronta.

## Onde mudar o que é do cliente
- `js/config.js`: marca, modo demonstração, WhatsApp (`contact.whatsapp`), fotos e créditos, nomes das peças.
- `index.html`: textos de cada seção.
- Para vender: `demo.enabled: false`, número em `contact.whatsapp`, remover `noindex`.

## Recursos locais (opcional)
`powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1` baixa as 15
fotos (3 larguras, WebP) e as 2 fontes. Depois: `useLocalImages: true` em
`js/config.js` e trocar o `<link>` do Google Fonts por `css/fontes-locais.css`.

## Observações
- Fotos: Unsplash (licença Unsplash), ilustrativas; não são trabalhos da marca.
- Referências guardadas ficam só na aba (sessionStorage); nada é enviado.
- Detalhes, testes e pendências: `DESIGN_NOTES.md`.
