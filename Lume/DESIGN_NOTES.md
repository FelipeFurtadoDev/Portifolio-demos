# DESIGN_NOTES · Modelo 18 · LUME (Marmoraria)

Terceiro lote, último modelo. Foi implementado em uma pasta nova, sem tocar em outros modelos.

## Conceito e identidade visual
Revista de interiores clara e contemporânea, fotográfica, com o azul-cobalto como único
protagonista de cor. A capa é tipográfica e fotográfica ao mesmo tempo: a marca **LUME**
ocupa a largura da página (Archivo Narrow, cobalto), a palavra "Marmoraria" vem logo abaixo
e uma cozinha em formato horizontal fecha a faixa. A pedra aparece sempre em ambientes
iluminados, sem filtros nem véus. Símbolo: quadrado cobalto com "L" branco e um ponto palha.

## Arquitetura implementada (seis seções, mais cabeçalho e rodapé)
1. **Capa** (`#inicio`): título gigante + "Marmoraria" + linha de serviço, foto horizontal (`eager`, `fetchpriority="high"`, proporção 3:2 no celular, 16:8 até 1100 px, 2,35:1 acima) e faixa separada com "Pedras sob medida para os espaços da sua casa" e o botão "Conversar sobre meu projeto". No celular o cabeçalho tem o botão compacto "Orçamento", para a ação aparecer na primeira tela.
2. **Escolha o ambiente** (`#ambientes`): mural de 9 fotos (3 por ambiente) em grade de 12 colunas no desktop (áreas nomeadas, alturas variadas) e em 2 colunas no celular; filtros e visão filtrada com grade própria.
3. **Duas referências, lado a lado** (`#comparar`): fundo prata, dois quadros identificados, legenda factual (Aparência, Composição, Aplicação), "Remover referência N", "Limpar as duas" e "Conversar sobre estas referências".
4. **O acabamento visto de perto** (`#acabamento`): três recortes ampliados, com "Para conversar".
5. **Sob medida** (`#sob-medida`): lista tipográfica em linhas (nome grande, etiquetas de onde se aplica, texto, "Ajuda saber" e botão).
6. **Contato** (`#contato`): bloco cobalto, mensagem sugerida, aviso de modo demonstração, local e horários fictícios.

## Paleta e tipografia
| Papel | Cor |
|---|---|
| Fundo (branco mineral) | `#F5F5F0` |
| Cobalto (marca, ações, fechamento) | `#2448C8` (hover `--cobalto-esc`) |
| Grafite (texto) | `#252729` |
| Cinza-prata (apoio, fundo da comparação) | `#D9DDDF` |
| Palha (destaques pequenos) | `#E8CD82` |

Texto secundário `#4A4D50`. **Contrastes não foram calculados nesta entrega** (ver pendências RECOMENDADAS).
Tipografia: **Archivo Narrow** (títulos, marca, nomes das peças) e **Instrument Sans** (texto e interface), via Google Fonts, com alternativa local pronta.

## Direção fotográfica
10 fotografias (capa 1, cozinha 3, banheiro 3, área gourmet 3), todas com licença Unsplash
(não Unsplash+), escolhidas por mostrarem a pedra e a luz natural com clareza; renders e
imagens muito tratadas foram descartadas. A capa usa só a foto horizontal de cozinha; os
close-ups do bloco "acabamento" são **recortes ampliados** de fotos já usadas no mural
(coordenadas explícitas em `DETALHES`), conferidos visualmente com as legendas.
Todas são ilustrativas: a página diz que não são trabalhos da marca. As legendas descrevem
só o que se vê.

| Chave | Uso | Autor (Unsplash) | Página |
|---|---|---|---|
| capa | capa (faixa horizontal) | GoodLifeConstruction | unsplash.com/photos/pQVP5QmskxM |
| coz1 | mural cozinha; comparação; recorte 'encontro entre peças' | Jakob Owens | unsplash.com/photos/XKLZia7hPYI |
| coz2 | mural cozinha | Cat Han | unsplash.com/photos/VgyN_CWXQVM |
| coz3 | mural cozinha | Jason Briscoe | unsplash.com/photos/GliaHAJ3_5A |
| ban1 | mural banheiro; recorte 'cuba' | Peter Muniz | unsplash.com/photos/wfMM98Vggn0 |
| ban2 | mural banheiro | Peter Muniz | unsplash.com/photos/9OKuf13OidA |
| ban3 | mural banheiro | Clay Banks | unsplash.com/photos/7Z2OTozIY_0 |
| gou1 | mural área gourmet; recorte 'borda e espessura' | Alef Morais | unsplash.com/photos/YTnLXCH0jWw |
| gou2 | mural área gourmet | Alef Morais | unsplash.com/photos/OsUiWBJ4AXU |
| gou3 | mural área gourmet | Alef Morais | unsplash.com/photos/aUsRyb_gPTI |

Observações: gou1, gou2 e gou3 são do mesmo fotógrafo e parecem da mesma sessão; o material
exato do tampo (granito, quartzito, quartzo, porcelanato) **não é confirmado** em várias fotos, e por isso
nenhuma legenda nomeia material. Links, autores e textos alternativos: `js/config.js` e rodapé.

## Componentes e função comercial
- **Mural filtrável**: mostra a pedra instalada em cada ambiente antes de qualquer orçamento. Filtros são botões com `aria-pressed`; o ativo é cobalto cheio. Trocar de filtro não apaga as escolhas.
- **Comparador de duas referências** (protagonista): até duas fotos, selecionar de novo remove, mensagem ao atingir o limite, indicador de contagem perto dos filtros com link para a comparação, quadros identificados, "Remover" por quadro e "Limpar as duas". Estado em `sessionStorage` (só na aba). O botão de conversa leva os nomes das referências na mensagem de WhatsApp. Atualizações mantêm o foco e são anunciadas em uma região `aria-live`.
- **Acabamento visto de perto**: três recortes com o que combinar antes da execução.
- **Lista de peças**: composição tipográfica por linhas, diferente do mural; cada botão abre uma mensagem específica.
- **Contato**: mensagem geral "Olá, LUME! Gostaria de conversar sobre uma peça sob medida para minha casa.".

### Diferença em relação aos modelos anteriores
- **LASTRO (12)**: escuro, painéis que se abrem, galeria em tela cheia e referências guardadas; aqui o fundo é claro, o mural é uma grade fotográfica aberta e a comparação é lado a lado, sem tela cheia.
- **ORLA / modelo 06**: desenho técnico e cotas; aqui só fotografia.
- **CADÊNCIA (13)**: também possui um comparador, então a comparação **não é um recurso exclusivo** do catálogo. A diferença está no conteúdo (duas fotos de ambientes de pedra com legendas factuais), na capa tipográfica e no fluxo até o WhatsApp.

## Decisões técnicas
- HTML, CSS e JavaScript puros; sem frameworks. **GSAP não usado**: filtros, comparação e a única animação (entrada da marca na capa, uma vez, por `clip-path`) se resolvem com CSS e JS nativo. `prefers-reduced-motion` desliga transições e a entrada.
- `index.html` e `js/config.js` são gerados a partir de uma fonte única de dados durante a criação; o resultado é HTML e JS comuns, sem build.
- Mural: grade CSS com áreas nomeadas por variáveis (`--a` e `--v`); filtro apenas alterna `hidden` e a grade da visão filtrada.
- Marca gigante: unidade `cqw` num contêiner, limitada por `40vh` para a foto e o serviço aparecerem na primeira tela do desktop.
- Recortes do acabamento: `<img>` absoluta posicionada por `--cx/--cy/--cw/--ch` num quadro com `aspect-ratio`.
- Imagens: `srcset` em 480/800/1200/1600, `sizes` por foto, `width`/`height` reservados, `loading="lazy"` fora da capa, preload da capa.
- Contato: dados centralizados em `js/config.js`. Com `demo.enabled: true` ou número inválido (menos de 12 dígitos), os botões abrem uma janela `<dialog>` com a mensagem, botão "Copiar mensagem" e o aviso de que nada foi enviado; com demonstração desligada e número válido, abrem `wa.me` em nova aba.
- Sem JavaScript: mural e seções visíveis, comparação oculta com aviso, botão geral leva a `#contato`.
- `noindex` ativo (demonstração).

## Recursos externos e licenças
- Fotos: Unsplash (Licença Unsplash), via CDN (`images.unsplash.com`). Verificação de licença feita na página de cada foto durante a seleção; revalidar antes da venda.
- Fontes: Archivo Narrow e Instrument Sans (SIL Open Font License 1.1), via Google Fonts; versão local em `css/fontes-locais.css` (arquivos ainda não baixados).

## Testes realmente realizados
Todos no **navegador integrado do Claude Desktop**, abrindo `http://127.0.0.1:5500/18-marmoraria-lume/index.html` pelo Live Server, com a janela emulada em 390, 768, 1024 e 1440 px.
- Visual: capa, mural (Todos, Cozinha, Banheiro, Área gourmet), comparação, acabamento, peças, contato e rodapé em 1440; mural, comparação, acabamento, peças e contato em 390; capa e mural em 768; mural em 1024.
- Sem rolagem horizontal em 390, 768, 1024 e 1440 (`scrollWidth` ≤ largura da janela).
- Imagens: as 15 `<img>` carregaram (naturalWidth > 0) em 768, depois de rolar a página inteira.
- Fluxo (script no navegador): 9 fotos; 4 filtros com 9/3/3/3 itens e `aria-pressed` correto; seleção de 2, mensagem de limite na terceira, persistência ao trocar de filtro, remover ao selecionar de novo, "Limpar as duas" (foco no primeiro quadro), textos de orientação com 0 e 1 referência.
- Mensagens: geral, por peça (4 botões) e com referências, em modo demonstração (janela) e em modo real simulado (`window.open` interceptado, número fictício); número curto cai na janela. Nenhuma mensagem real foi enviada.
- Teclado real: Tab leva ao link "Pular para o conteúdo" com foco visível; Enter e Espaço no botão de uma foto (foco permanece, anúncio correto); Esc fecha a janela e o foco volta ao botão de origem.
- Console: sem erros (só "Live reload enabled").

## Problemas encontrados e corrigidos
- Marca gigante empurrava a foto e o botão para baixo: limitada a `min(41cqw, 40vh)`.
- Fotos paisagem colapsavam na grade do desktop (especificidade): `grid-area` com seletor mais forte.
- Imagem do quadro de comparação sobrepunha a legenda: altura máxima definida no quadro e na imagem.
- Recortes do acabamento mostravam áreas erradas: trocados por retângulos explícitos, conferidos com as legendas.
- Botão da capa ficava abaixo da primeira tela no celular: botão "Orçamento" no cabeçalho e foto 3:2.
- Nota abaixo do mural aparecia centralizada: alinhada à esquerda da grade.

## Pendências
**BLOQUEANTES**: nenhuma conhecida.

**RECOMENDADAS**
- Não foram rodados: Playwright (indisponível neste ambiente), testes de `prefers-reduced-motion` e de página sem JavaScript no navegador (apenas conferidos no código), VoiceOver/NVDA/TalkBack, toque real, 360 px, alturas reduzidas e capturas de página inteira em todas as larguras.
- Contraste (WCAG) das cores não foi calculado; o texto secundário `#4A4D50` sobre `#D9DDDF` na seção de comparação deve ser verificado.
- 768 px usa o layout de celular (a grade de desktop começa em 900 px); 1024 px foi visto só no mural.
- Conferir o cabeçalho em 360 px (largura apertada: marca, "Orçamento" e "Menu"); foi visto só em 390 px.
- Rodar `tools/baixar-recursos.ps1` e ativar `useLocalImages` e `fontes-locais.css`; ajustar o `<link rel="preload">` da capa e o `og:image` para os arquivos locais.
- `assets/favicon.svg` contém metadados anexados pelo ambiente de geração; abrir e limpar se desejar.
- Prévias do catálogo (desktop e celular) não foram geradas: dependem de `copiar-modelo.ps1 -Origem 18-marmoraria-lume -Destino Lume` e do fluxo do Portifolio-demos, que não foram executados. Não há pasta `capturas/` nesta entrega.

**PUBLICAÇÃO COMERCIAL**
- Número de WhatsApp real (`contact.whatsapp`), endereço, horários, nome e razão social do cliente; desligar o modo demonstração.
- Fotos reais do cliente no lugar das ilustrativas, ou revalidação das licenças das fotos Unsplash.
- Domínio, hospedagem, remover `noindex`, revisar metadados, `og:image` e favicon.
- Material das pedras: só citar nas legendas o que o cliente confirmar.
