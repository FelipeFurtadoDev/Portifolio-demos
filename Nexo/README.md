# NEXO / Estúdio Facial (modelo 07)

Landing page demonstrativa de estética facial não invasiva. HTML, CSS e JavaScript puros, sem dependências.

## Executar
- **VS Code + Live Server:** abra `http://127.0.0.1:5500/07-estetica-facial-nexo/index.html`.
- **GitHub Pages:** todos os caminhos são relativos, então a pasta funciona como subpasta.

## Estrutura
```
index.html                 página (com cópia estática do conteúdo, para quem estiver sem JS)
css/styles.css             estilos (tokens no topo)
css/fontes-locais.css      alternativa às fontes do Google (ver tools/)
js/config.js               TUDO o que muda por cliente: marca, textos, cuidados, imagens,
                           endereço, horários, contato e modo demonstração
js/main.js                 aplica o config, atlas de cuidados, contato/WhatsApp e menu móvel
tools/baixar-recursos.ps1  baixa fotos e fontes para assets/ (uso local)
modelo.json                dados para o catálogo publicado
DESIGN_NOTES.md            decisões, testes e pendências
```

## Adaptar para um cliente
1. Edite `js/config.js`: marca, textos (`texts`), abordagem (`approach`), cuidados (`cares`), endereço, horários e Instagram.
2. Atualize também a cópia estática do HTML. Ela aparece para quem estiver sem JavaScript e para buscadores.
3. Contato real: preencha `contact.whatsapp` (ex.: `5511912345678`) e mude `demo.enabled` para `false`.
4. Troque as fotos (`images`). Use `src` com um caminho próprio ou rode o script e ative `useLocalImages`.
5. Remova o `noindex` do `<head>` e revise o título, a descrição e o `og:image`.
6. Valide com a profissional os cuidados, as etapas e as durações.

## Créditos
- Fotos: Unsplash (Licença Unsplash), com autores listados no rodapé e no DESIGN_NOTES.
- Fontes: Funnel Display, Funnel Sans e Geist Mono (SIL Open Font License 1.1).
