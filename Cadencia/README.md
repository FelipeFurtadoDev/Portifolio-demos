# CADÊNCIA · Estética facial (modelo 13)

Landing page demonstrativa de estética facial, terceiro modelo do nicho (depois de NÁRIA e NEXO). HTML, CSS e JavaScript puros, sem dependências e sem GSAP.

## Executar
- **VS Code + Live Server:** `http://127.0.0.1:5500/13-estetica-facial-cadencia/index.html`
- **GitHub Pages:** os caminhos são relativos, então a pasta funciona como subpasta.

## Estrutura
```
index.html                 cinco seções: abertura, menu de cuidados, primeira visita, quem atende, consulta de horário
css/styles.css             estilos (tokens das cinco cores no topo)
js/config.js               TUDO o que muda por cliente: marca, demonstração, WhatsApp, nomes dos cuidados, créditos
js/main.js                 seleção e comparação, mensagem, cópia e envio
tools/baixar-recursos.ps1  baixa fotos e a fonte Manrope para uso local
modelo.json                dados para o catálogo publicado
DESIGN_NOTES.md            decisões, testes e pendências
```

## Adaptar para um cliente real
1. **Contato:** em `js/config.js`, preencha `contact.whatsapp` (somente dígitos, ex.: `5511912345678`) e mude `demo.enabled` para `false`. "Consultar disponibilidade" passa a abrir o WhatsApp com a mensagem pronta.
2. **Cuidados:** os textos de cada serviço (descrição, como é a sessão, o que inclui, duração e valores) ficam no `index.html`, dentro de cada `<article class="cuidado">`. A comparação lê esses mesmos textos. Para informar a duração ou os valores, troque o texto dos itens `data-attr="duracao"` e `data-attr="valores"`. Para um quarto cuidado, copie um `<article>`, inclua-o em `cares` no `config.js` e ajuste o CSS da grade (`.menu`) para quatro colunas.
3. **Quem atende:** nome, formação e registro da profissional entram na seção 04 (`#atendimento`). O modelo não traz credenciais, anos de experiência nem resultados: não invente.
4. **Fotos:** troque as URLs no `index.html` ou gere arquivos locais (abaixo). Retrato e fotos do espaço devem ser reais ao publicar.
5. **Indexação:** remova `noindex` do `<head>` e ajuste título, descrição e imagem de compartilhamento.

## Fotos e fonte locais
Rode `powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1` dentro desta pasta. Depois:
- mude `useLocalImages` para `true` em `js/config.js` (se faltar algum arquivo, aquela foto volta para a CDN sozinha);
- troque os links do Google Fonts no `index.html` por `<link rel="stylesheet" href="css/fontes-locais.css">`.

## Créditos
- Fotos: Unsplash (Licença Unsplash), identificadas por usuário no rodapé da página.
- Fonte: Manrope (SIL Open Font License 1.1).
