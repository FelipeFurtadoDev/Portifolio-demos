# PULSO Auto Care (modelo 09)

Landing page demonstrativa de estética e detalhamento automotivo. É a segunda proposta do nicho, alternativa estrutural ao VÉRTICE (04). HTML, CSS e JavaScript puros, sem dependências (a cena de abertura e o traçado do método não usam biblioteca).

## Executar
- **VS Code + Live Server:** `http://127.0.0.1:5500/09-estetica-automotiva-pulso/index.html`
- **GitHub Pages:** os caminhos são relativos, então a pasta funciona como subpasta.

## Estrutura
```
index.html                 página (cinco momentos: capa, cuidados, detalhes, método, contato)
css/styles.css             estilos (tokens no topo)
js/config.js               TUDO o que muda por cliente: marca, demonstração, contato, horários,
                           cuidados, pontos sobre as fotos, legendas e créditos
js/main.js                 cena de abertura, hotspots com lista, contato, menu e traçado do método
assets/img/                fotografias otimizadas (webp)
assets/favicon.svg         favicon (linha de pulso)
tools/baixar-recursos.ps1  baixa as fontes para uso local (ver abaixo)
modelo.json                dados para o catálogo publicado
DESIGN_NOTES.md            decisões, testes e pendências
```

## Adaptar para um cliente real
1. Em `js/config.js`: marca, `contact` (WhatsApp, endereço, horários, mapa), `services`, textos dos `hotspots` e créditos.
2. Contato real: preencha `contact.whatsapp` (ex.: `5511912345678`) e mude `demo.enabled` para `false`. O botão passa a abrir o WhatsApp com a mensagem pronta.
3. Fotos: troque os arquivos em `assets/img/` mantendo as proporções (`fora` e `dentro` são 4:5) e **reposicione os pontos** (`x` e `y`, em % da imagem) de acordo com o que aparece em cada foto. Cada ponto é também um item da lista ao lado da foto. As fotos do método (`avaliar`, `cuidar`, `entregar`) ficam no `index.html`.
4. Revise os textos do `index.html` (capa, títulos, rodapé) e as legendas dos detalhes.
5. Para indexar no Google: remova o `noindex` do `<head>` e ajuste título, descrição e `og:image`.

## Fontes locais
Por padrão a página carrega Anybody e Instrument Sans pelo Google Fonts. Para usar arquivos locais, rode `powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1` na pasta do modelo e troque o link do Google Fonts no `index.html` por `css/fontes-locais.css`.

## Créditos
- Capa: imagem fornecida pelo projeto (origem e licença a confirmar).
- Demais fotos: Unsplash (Licença Unsplash). Autores no rodapé e no DESIGN_NOTES.
- Fontes: Anybody e Instrument Sans (SIL Open Font License 1.1).
