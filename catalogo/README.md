# Catálogo — como funciona

**Para adicionar um modelo, leia [COMO-ADICIONAR-MODELOS.md](COMO-ADICIONAR-MODELOS.md).** Este arquivo descreve a estrutura por dentro.

## Visão geral

```
push na main
   │
   ▼
GitHub Actions (.github/workflows/publicar-catalogo.yml)
   1. copia o repositório para uma pasta de publicação
   2. capturar-previas.mjs  → fotografa os modelos alterados (Playwright, WebP)
   3. gerar-catalogo.mjs    → escreve os blocos dos modelos e o índice no index.html
   4. publica a pasta no GitHub Pages (artefato; nada volta para o repositório)
```

O catálogo publicado é **HTML estático**: não depende de JavaScript nem de nenhuma API para aparecer.

## Arquivos

| Arquivo | Papel |
|---|---|
| `../index.html` | Abertura, rodapé e dois pares de marcadores (`<!-- catalogo:indice -->` e `<!-- catalogo:modelos -->`). O conteúdo entre os marcadores é gerado; o resto é editado à mão normalmente |
| `catalogo.css` | Visual do catálogo |
| `previas/` | Capturas commitadas. Servem de reserva: são usadas quando a captura automática falha |
| `build/descobrir.mjs` | Descoberta das pastas e validação do `modelo.json` |
| `build/gerar-catalogo.mjs` | Gera o HTML. Sem dependências |
| `build/capturar-previas.mjs` | Capturas com Playwright, com cache por modelo |
| `build/package.json` | Versão fixa do Playwright (só usado no build) |
| `<Modelo>/modelo.json` | Textos, cores e ordem de cada modelo no catálogo. Não afeta o site do modelo |

## Regras da descoberta

Uma pasta da raiz é um modelo quando:

1. não começa com `.` nem `_`;
2. não é uma pasta técnica (`catalogo`, `assets`, `css`, `js`, `scripts`, `node_modules`, `img`, `fonts`, `docs`, `build`, `tools` e similares; a lista completa está em `build/descobrir.mjs`);
3. tem um `index.html` diretamente dentro dela;
4. não tem `"publicar": false` no `modelo.json`.

O identificador de cada modelo vem do nome da pasta, sem acentos e em minúsculas (`Forma-Doce` vira `forma-doce`). É ele que dá nome às prévias (`previas/forma-doce-desktop-1600.webp`) e ao endereço `#modelo-forma-doce`.

## Capturas

- **Telas:** computador em 1440 × 900, salvo em 1600 × 1000 e 800 × 500; celular em 390 × 844, salvo em 780 × 1688. Tudo em WebP.
- **Antes de fotografar,** o script espera o carregamento, as fontes e as imagens visíveis, depois congela as animações.
- **A captura é recusada quando:**
  - a página responde com erro;
  - uma imagem visível, uma fonte ou uma folha de estilo não carrega;
  - a tela sai em branco.
- **Cache:** no GitHub Actions, cada modelo guarda uma impressão digital dos seus arquivos. Só é fotografado de novo quando algum arquivo muda; mudar apenas o `modelo.json` não gera nova captura.
- **Ordem de reserva** quando a captura falha:
  1. a última captura válida do cache;
  2. a prévia commitada em `previas/`;
  3. a moldura "Prévia em preparação".

## Publicação

O GitHub Pages precisa estar com **Settings → Pages → Source = GitHub Actions**. Enquanto estiver em "Deploy from a branch", quem publica é a publicação automática da branch: o site é servido como está no repositório, sem as capturas e o catálogo gerados no build. O passo "Publicar" do workflow pode falhar ou concorrer com ela.
