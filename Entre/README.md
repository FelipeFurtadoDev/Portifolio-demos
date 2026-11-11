# ENTRE. Atelier de Olhar & Mãos (modelo 10)

Landing page demonstrativa de manicure, cílios e sobrancelhas. É a segunda proposta do nicho, alternativa estrutural ao TRAÇO Studio (03). HTML, CSS e JavaScript puros, sem dependências (o empilhamento dos cartões e a tipografia cinética não usam biblioteca).

## Executar
- **VS Code + Live Server:** `http://127.0.0.1:5500/10-entre-beauty-atelier/index.html`
- **GitHub Pages:** os caminhos são relativos, então a pasta funciona como subpasta.

## Estrutura
```
index.html                 página (quatro momentos: primeiro olhar, três formas, o gesto, próximo momento)
css/styles.css             estilos (tokens no topo)
js/config.js               TUDO o que muda por cliente: marca, demonstração, contato,
                           cuidados de cada categoria, imagens locais e créditos
js/main.js                 menu, cartões empilhados, estado da escolha, mensagem e cópia
assets/favicon.svg         favicon (moldura amendoada)
assets/img/                (vazio até rodar o script) fotos WebP locais
tools/baixar-recursos.ps1  baixa fotos e fontes para uso local
modelo.json                dados para o catálogo publicado
DESIGN_NOTES.md            decisões, testes e pendências
```

## Adaptar para um cliente real
1. Em `js/config.js`: `brand`, `contact` (WhatsApp, Instagram, informações práticas) e `cares` (resumo e cuidados de cada categoria).
2. Contato real: preencha `contact.whatsapp` (ex.: `5511912345678`) e mude `demo.enabled` para `false`. O botão passa a se chamar "Abrir conversa no WhatsApp" e abre a conversa com a mensagem pronta.
3. Textos dos cartões e da seção "O gesto" ficam no `index.html` (procure por `cartao__desc`, `cartao__lista` e `nota`). Mantenha os cuidados dos cartões iguais aos de `cares[].services`.
4. Fotos: troque as URLs no `index.html` (atributos `src`/`srcset` com `data-img`) ou gere arquivos locais com o mesmo nome. A foto da capa fica numa moldura alta (≈ 2:3 no desktop, 4:5 no celular); ajuste `object-position` em `.amendoa img` se o rosto sair do centro.
5. Para indexar no Google: remova o `noindex` do `<head>` e ajuste título, descrição e `og:image`.

## Fotos e fontes locais
Rode `powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1` dentro desta pasta. Depois:
- mude `useLocalImages` para `true` em `js/config.js` (se faltar algum arquivo, aquela foto volta para a CDN sozinha);
- troque os links do Google Fonts no `index.html` por `<link rel="stylesheet" href="css/fontes-locais.css">`.

## Créditos
- Fotos: Unsplash (Licença Unsplash). Autores: Andriyko Podilnyk, Laura Chouette, Milky Way Lashes, engin akyurt, Ondrej Supitar e Le Petit.
- Fontes: Instrument Serif e Familjen Grotesk (SIL Open Font License 1.1).
