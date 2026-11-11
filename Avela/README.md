# AVELA / Atelier de Confeitaria (modelo 08)

Landing page demonstrativa de confeitaria artesanal sob encomenda. É a segunda proposta do nicho, diferente da FORMA DOCE (02). HTML, CSS e JavaScript puros, sem dependências.

## Executar
- **VS Code + Live Server:** `http://127.0.0.1:5500/08-confeitaria-avela/index.html`
- **GitHub Pages:** os caminhos são relativos, então a pasta funciona como subpasta.

## Estrutura
```
index.html                 página (inclui uma cópia estática da carta para quem estiver sem JS)
css/styles.css             estilos (tokens no topo)
css/fontes-locais.css      alternativa às fontes do Google (ver tools/)
js/config.js               TUDO o que muda por cliente: marca, demonstração, WhatsApp,
                           informações práticas, mensagem, coleções, peças e fotos
js/main.js                 carta (lookbook), consulta, créditos e fotos locais/remotas
assets/favicon.svg         favicon (fio de calda)
tools/baixar-recursos.ps1  baixa fotos e fontes para assets/ (uso local)
modelo.json                dados para o catálogo publicado
DESIGN_NOTES.md            decisões, testes e pendências
```

## Adaptar para uma confeitaria real
1. Em `js/config.js`:
   - marca e assinatura;
   - `practical` (antecedência, retirada, horários, local);
   - `location`;
   - `collections`: nomes, textos, peças e fotos;
   - `message`: texto da mensagem;
   - `contact.instagram`.
2. Atualize também os textos do `index.html`:
   - abertura;
   - ateliê;
   - a cópia estática da carta (`carta__estatica`).
3. Contato real: preencha `contact.whatsapp` (ex.: `5511912345678`) e mude `demo.enabled` para `false`. O botão passa a abrir o WhatsApp com a mensagem pronta.
4. Use fotos reais da confeitaria:
   - troque `id`/`file` no config;
   - ou grave os arquivos em `assets/img/<file>-<largura>.webp` e ative `images.useLocalImages`.
5. Revise as frases que descrevem as peças. Elas descrevem as fotos de exemplo.
6. Para indexar no Google:
   - remova o `noindex` do `<head>`;
   - revise título, descrição e `og:image`;
   - ajuste o texto do rodapé, que hoje fala em "modelo demonstrativo".

## Fotos e fontes locais
Rode `powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1` dentro desta pasta. Depois:
- ative `useLocalImages` em `js/config.js`;
- no `index.html`, troque o `srcset` e o `preload` da abertura e o link do Google Fonts por `css/fontes-locais.css`.

## Créditos
- Fotos: Unsplash (Licença Unsplash). Os autores aparecem no rodapé e no DESIGN_NOTES.
- Fontes: Gloock e Commissioner (SIL Open Font License 1.1).
