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

Se duas pastas resultarem no mesmo identificador (`Nova-Marca` e `nova-marca`), fica com ele a que tem `modelo.json`; empatando, a de nome menor em ordem de código, com maiúsculas antes. A outra recebe o sufixo `-2`, e o resumo avisa.

## Validação do `modelo.json`

- Campo inválido é descartado com aviso, e os demais continuam valendo.
- JSON com erro de sintaxe: o modelo aparece com os valores padrão, e o aviso mostra a posição do erro.
- Todo texto é escapado antes de entrar no HTML. Caminhos de imagem só são aceitos quando relativos, sem `..` e sem protocolo (`javascript:`, `http:`).
- As cores precisam estar no formato `#RRGGBB` e ter contraste de pelo menos 4,5:1 entre texto e fundo. Caso contrário, a faixa usa as cores neutras.

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

## De onde vêm as prévias e o que acontece se faltar uma

Para cada modelo, da fonte mais nova para a mais antiga:

1. **Captura nova** (Playwright), quando o conteúdo da pasta mudou;
2. **Cache** por conteúdo do Actions (temporário, até 7 dias sem uso);
3. **`catalogo/previas/` no repositório**, durável e versionado;
4. **Site já publicado** (`recuperar-previas.mjs`), que só preenche o que falta e nunca sobrescreve.

Nenhuma etapa grava imagem substituta. O passo final roda
`gerar-catalogo.mjs --exigir-previas`: se algum modelo não tiver as três prévias em
WebP válido (cabeçalho RIFF/WEBP, tamanho coerente), **nada é gerado e a publicação é
interrompida**, mantendo o site anterior. Em `workflow_dispatch`, a opção
"Publicar mesmo sem todas as prévias" libera isso de propósito (vira aviso).
As imagens de cada execução ficam no artefato `previas-catalogo` (90 dias).

## Publicação

O GitHub Pages precisa estar com **Settings → Pages → Source = GitHub Actions**. Enquanto estiver em "Deploy from a branch", quem publica é a publicação automática da branch: o site é servido como está no repositório, sem as capturas e o catálogo gerados no build. O passo "Publicar" do workflow pode falhar ou concorrer com ela.
