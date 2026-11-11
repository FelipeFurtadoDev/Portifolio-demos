# PULSO Auto Care: notas de design e decisões técnicas

Modelo 09 do catálogo, segunda proposta do nicho de estética automotiva e alternativa ao VÉRTICE (04).
Assinatura: "Seu carro em outra frequência."

- **Versão 1:** 11/11/2026, de manhã.
- **Revisão criativa e funcional (versão 2):** 11/11/2026.
- **Correção direcionada (versão 3):** 11/11/2026. Recompõe o método e reconstrói a diagonal da capa (seção 3.1). Esta versão ainda **não foi aprovada**; este documento descreve a versão 3.

**Skills.** Frontend Design da Anthropic foi carregada e aplicada nas duas versões. Na revisão, a skill `gsap-scrolltrigger` foi consultada; `gsap-core`, `gsap-timeline` e `gsap-plugins` não foram abertas (ver seção 6).

**Documentos consultados na revisão:**
- `docs/guia_componentes_diferenciacao.md` (repertório, distribuição e teste de diferenciação);
- `DESIGN_NOTES.md` do VÉRTICE (04) e do AVELA (08), que também usa o componente 15;
- a configuração de créditos do VÉRTICE, para confirmar a origem das fotos reaproveitadas.

Os `DESIGN_NOTES.md` dos modelos 01, 02, 03, 05 e 06 não foram relidos. O histórico de componentes abaixo vem do guia e dos registros do AVELA.

---

## 1. Crítica que motivou a revisão

Na versão 1, a macroestrutura era capa → serviços → galeria → contato, a mesma sequência do VÉRTICE. Os hotspots, a cor e as fotos trocavam a superfície, mas não a forma da página. Havia três problemas concretos:

1. **Capa estática.** O parallax deslocava poucos pixels e não criava nenhuma passagem para o conteúdo.
2. **Lista inconsistente.** A lista mostrava sempre os quatro serviços. No interior, só um deles fazia sentido para vários pontos.
3. **Blocos independentes.** As seções não se ligavam visualmente nem na narrativa.

## 2. O que foi preservado e o que foi reformulado

| | Preservado | Reformulado |
|---|---|---|
| Identidade | Paleta gelo, asfalto, azul elétrico e coral; Anybody e Instrument Sans; linha de pulso; paralelogramos e cortes diagonais | — |
| A · Impacto | Fotografia do sedã azul, título, CTAs, riscos e faixas | Virou uma **cena de rolagem** (seção 6), com título maior e quebrado em três linhas |
| B · Cuidados | Fotos fora e dentro, abas e pontos em % | Foto à esquerda e **lista que muda com a vista**, sincronizada com os pontos. O popover flutuante foi removido: o item da lista é o painel de informação (seção 5) |
| C · Detalhes | Composição das quatro fotos sobre azul | Sem mudança |
| D · Método | — | **Seção nova** com traçado SVG (seção 7) |
| E · Contato | Cartão, WhatsApp demonstrativo e mensagem pronta | A mensagem inclui a área do interior escolhida. O texto agora liga a avaliação à conversa. O traçado do método termina no título do contato |

**Ordem dos momentos:** foi mantida a do briefing. O método fica imediatamente antes do contato porque a primeira etapa, "Avaliar", começa justamente por uma conversa. A linha que sai de "Entregar" termina no título "Vamos conversar sobre o seu carro", e o contato passa a ser a continuação do método, não um bloco à parte.

## 3. Arquitetura (cinco momentos)

| | Pergunta do visitante | Fundo | Composição |
|---|---|---|---|
| **1 · Impacto** | "Que lugar é este?" | Azul-noite e foto em sangria | Cena presa por ~70% da altura da tela; o plano gelo sobe na diagonal e vira a seção 2 |
| **2 · Explore os cuidados** | "O que fazem no meu carro?" | Gelo, com placa azul inclinada atrás da foto | Foto com pontos numerados à esquerda; título, abas e lista à direita |
| **3 · Superfícies e detalhes** | "Como é de perto?" | Azul elétrico | Quatro fotos assimétricas |
| **4 · Método PULSO** | "Como funciona?" | Gelo | Três etapas ao lado de um trilho vertical que se desenha com a rolagem |
| **5 · Contato** | "Como falo com eles?" | Gelo, contínuo ao método | Mensagem pronta e cartão escuro com WhatsApp |

O menu ganhou "Método".

## 3.1 Correção direcionada (versão 3)

Dois problemas apontados pelo usuário em capturas da versão 2. Nada mais foi alterado.

### A. Diagonal coral da capa borrada na versão publicada

**Versão publicada x local.** Os quatro arquivos baixados de `https://felipefurtadodev.github.io/Portifolio-demos/Pulso/` (`index.html`, `css/styles.css`, `js/main.js`, `js/config.js`) têm **o mesmo SHA-256 e o mesmo tamanho** que a versão 2 local (`styles.css?v=14`, `main.js?v=9`). As três fotos do método e `fora-1200.webp` respondem 200. A publicação estava atualizada; a diferença não vem de cache nem de arquivo velho.

**Causa (medida, não suposta).** A diagonal era um `<svg>` (polígono + traço coral com `vector-effect: non-scaling-stroke`) com `will-change: transform`, e a cena a **esticava com `scaleY`**: em 1440×900, `matrix(1, 0, 0, s, 0, 0)` com **s = 1,0 → 5,74** ao longo da rolagem. Um elemento com `will-change: transform` vira camada própria do compositor, rasterizada uma vez na escala inicial; ao ser esticada durante a animação, a GPU amplia a textura, e a borda perde nitidez. No Live Server dentro do app, o resultado era aceitável, e no Chromium sem GPU do ambiente de teste (Playwright) o quadro também saiu nítido; por isso **não consegui reproduzir o borrão visualmente**. O que está comprovado é o mecanismo (escala vertical de até 5,7× numa camada promovida), que coincide com o sintoma "borrado durante a animação, nítido em repouso". Não atribuí a causa à compressão do GitHub Pages.

**Correção.** A diagonal agora são duas camadas `<span>` com `clip-path: polygon(...)` (uma coral, outra gelo deslocada 5 px), sem SVG, sem `scale`, sem `will-change`, sem `filter` e sem nenhum ancestral transformado. A cena só altera a variável CSS `--c` (altura da cunha) e o navegador redesenha o polígono em vetor a cada quadro. Nada é rasterizado em escala e a espessura é uma constante de CSS.

**Verificação.** Em 1440×900 (escala 1× e 2×) e 1366×768, em 7 pontos da rolagem (0, 20, 35, 50, 65, 80 e 100%): `--c` cresce de 72 px para 414 px; nenhum ancestral tem `transform`, `will-change` ou `filter`; e a espessura da faixa coral, medida por pixels, fica em **4–5 px CSS em todos os pontos** (4,5–5 em 2×).

### B. Fotos do método entrando tarde e composição da seção

**Causa da entrada tardia.** A etapa "acendia" (marco, verbo e foto) quando o marco passava a 64% da altura da janela. O marco ficava no centro vertical da linha (texto e foto alinhados ao centro), então "Avaliar" mostrava o texto desde ~80% da janela e a foto só abria quando o topo da etapa chegava a ~35%: cerca de **400 px de rolagem depois**. (Medido em 1440×900.)

**O que mudou:**
- O marco, o verbo e o topo da foto agora ficam na mesma linha (`align-items: start`), e o gatilho é o topo da etapa a 88% da altura da janela. A foto abre **20–80 px de rolagem depois** do texto aparecer, nos cinco tamanhos testados.
- Nenhuma foto usa `opacity: 0`. O estado padrão é a foto inteira, visível. Ela só é recolhida (`clip-path`) depois que o JS calculou o estado e só sem `prefers-reduced-motion`.
- Cabeçalho: título menor (até 3,1 rem, "O método PULSO: do primeiro olhar à entrega."), em no máximo 22 caracteres por linha, com o parágrafo logo abaixo, na mesma coluna e com a mesma margem.
- Cada verbo (até 2,8 rem) fica abaixo do título em hierarquia.
- O traçado virou um **trilho vertical** na margem esquerda, que acompanha cabeçalho e etapas e passa pelos marcos. Antes ele fazia curvas pela página e deixava vãos grandes. O desenho é o mesmo conceito: linha pontilhada em aço, linha coral que se desenha com a rolagem, "pulso" da marca antes de cada marco, e uma seta ao fim apontando para o contato.
- As fotos agora têm proporção fixa, mais baixa (5:4 em "Avaliar", 3:2 em "Cuidar" e "Entregar"), e o espaço entre etapas caiu para 40–76 px. A seção ficou bem mais curta.
- Composição: "Avaliar" com texto à esquerda e foto à direita; "Cuidar" com foto larga à esquerda e texto à direita; "Entregar" com texto à esquerda e foto à direita. O ritmo alterna lado, sem cartões.

**GSAP:** não foi usado nesta correção. As duas animações são CSS e JS nativos; ver seção 6.

## 4. Tipografia e paleta

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| Gelo | `#F3F1EA` | Fundo de B e D, texto sobre escuro | Asfalto sobre gelo: 14,5:1 |
| Asfalto | `#14212B` | Texto, cartão de contato, painel do popover | Gelo sobre asfalto: 14,5:1 |
| Azul elétrico | `#1769E8` | Seção C, bloco atrás da foto, ponto ativo | Branco sobre azul: 5,0:1. Azul sobre gelo: só 4,4:1, por isso **não é usado em texto pequeno** |
| Coral energético | `#FF6542` | Botões, faixa de demonstração, ponto, marcadores | Asfalto sobre coral: 5,6:1. Coral nunca é cor de texto sobre gelo |
| Aço claro | `#B9C6D0` | Texto secundário sobre asfalto | 9,4:1 |
| Azul profundo | `#0F52C2` (**criado**) | Foco, links e verbos ativos do método sobre gelo | 6,2:1 sobre gelo |
| Tinta secundária | `#4A5C69` (**criado**) | Texto secundário sobre gelo | 6,1:1 |
| Noite | `#0C141B` (**criado**) | Fundo da capa, atrás da foto | |

A paleta do briefing foi mantida; só foram acrescentadas as variantes necessárias para texto. Coral e azul não se misturam em todo lugar: o coral é ação (botões, ponto, faixa), o azul é grande superfície e estado ativo.

**Tipografia** (nenhuma delas foi usada nos modelos anteriores):
- **Anybody**, variável com eixo de largura (`font-stretch` 118–150%) e peso 800–900: títulos, nomes de cuidados, marca. Os títulos da capa têm inclinação de -6° por transformação.
- **Instrument Sans** 400–700: textos, botões e rótulos.
- Sem caixa alta nos rótulos, sem palavra destacada nos títulos e sem monoespaçada.
- Hoje carregadas pelo Google Fonts (conferido no navegador que `Anybody 500–900` e `Instrument Sans 400–700` carregaram). O script `tools/baixar-recursos.ps1` gera a versão local; **não foi executado**.


Os verbos do método ("Avaliar", "Cuidar", "Entregar") usam Anybody a 140% de largura, inclinada. Mudam de asfalto para azul profundo quando o traçado chega à etapa. A cor muda, mas o texto nunca depende da animação para ficar legível.

## 5. Hotspots (componente 03, protagonista)

**A inconsistência foi corrigida por dados.** Cada vista tem a sua lista, e **cada item é um ponto**: o mesmo objeto de `config.hotspots` gera o ponto na foto e o item na lista.

| Vista | Título da lista | Itens (= pontos) |
|---|---|---|
| Por fora | "Três cuidados para a parte externa" | 1 Polimento técnico (lateral e porta) · 2 Proteção de pintura (para-lama e capô) · 3 Rodas e superfícies externas (roda, pneu, vidros e frisos) |
| Por dentro | "Higienização interna: quatro áreas de atenção" | 1 Bancos e estofados · 2 Painel e comandos · 3 Console e superfícies de contato · 4 Tapetes e revestimentos |

- No interior, os quatro itens são **áreas de um mesmo serviço**, e não serviços vendidos separadamente. O título da lista diz isso, e todos levam ao cuidado "Higienização interna" no contato.
- **Tapetes:** o assoalho não aparece na foto. Em vez de colocar um ponto falso, o ponto 4 fica **na borda inferior da imagem, com uma seta para baixo**. O nome acessível e a lista dizem "abaixo do enquadramento", e o texto explica que o assoalho não aparece nesta foto.
- Na versão 1, o externo tinha cinco pontos; os de retrovisor e friso foram incorporados ao item "Rodas e superfícies externas".
- **Sincronização nos dois sentidos:**
  - clicar ou tocar no ponto seleciona o item, que se abre com texto, três itens e "Conversar sobre isto";
  - clicar no item seleciona o ponto;
  - passar o mouse ou focar num deles realça o outro;
  - o ponto ativo fica azul e mostra uma etiqueta com o nome;
  - os pontos e os itens têm o mesmo número.
- **Acessibilidade:**
  - pontos com `aria-pressed` e `aria-controls`; itens com `aria-expanded`;
  - abas com setas, Home e End;
  - sem JS, um `<noscript>` lista as duas vistas.
- **Contato:** escolher um ponto ou item preenche o cuidado e a área. Por exemplo: "…sobre higienização interna no meu carro, principalmente os tapetes e revestimentos". Trocar de aba abre o primeiro item sem alterar o contato.
- **Celular:** a lista fica abaixo da foto. Ao tocar num ponto, a página rola até o item, se ele estiver fora da tela.

## 6. Cena de abertura (componente 14, apoio)

**Como funciona:** a capa fica em `position: sticky` dentro de um trilho mais alto que ela. São cerca de 70% da altura da janela de rolagem "presa", e o JS só calcula o progresso (0 a 1). Nada salta: não há espaçador inserido nem troca de `position` durante a rolagem.

Coreografia, do fundo para a frente:

| Camada | Movimento | Papel |
|---|---|---|
| Foto | Aproxima-se até 7% e sobe 4% | Fundo lento. O limite de 7% evita amolecer a imagem |
| Riscos (topo) | Atravessam ~62% da largura da tela para a esquerda | Velocidade, sem passar sobre a carroceria |
| Título | Cada linha escapa para a esquerda numa velocidade (10, 19 e 28 vw); o bloco sobe e some entre 30% e 66% do trajeto | Tipografia em primeiro plano |
| Faixas coral e azul | Saem para a esquerda | Primeiro plano rápido |
| Plano gelo com aresta coral | A cunha cresce na diagonal até cobrir ~46% da capa, **só pela variável `--c` em duas camadas com `clip-path`** (sem `scale` nem `will-change`; seção 3.1) | É a própria seção seguinte chegando: quando a cena termina, ele continua como fundo de "Explore os cuidados" |

**Suavização:** um "scrub" com pequeno atraso (interpolação de 20% por quadro) evita trancos com a roda do mouse.

**Quando a cena não roda:**
- só funciona com tela de **900 px de largura e 640 px de altura ou mais**, e sem `prefers-reduced-motion`;
- abaixo disso (celular, tablet vertical, notebook baixo como 1366×560), a página não fica presa. Fora do movimento reduzido há uma versão leve: a foto desce até 36 px e os riscos cruzam a tela. Com movimento reduzido, não há movimento algum.

**Por que JS nativo e não GSAP:**
- a skill `gsap-scrolltrigger` foi consultada. Dela vieram três ideias: animar os filhos e não o elemento preso, usar "scrub" com atraso e recalcular depois de fontes e redimensionamentos;
- o ambiente de trabalho não tem internet para baixar uma cópia local do GSAP, e carregá-lo por CDN tornaria a abertura dependente de um serviço externo;
- as duas animações só precisam de um valor de progresso, e `sticky` resolve o "pin" sem espaçador;
- se a cena crescer no futuro, ScrollTrigger com `scrub` e `pin` seria a substituição natural.

## 7. Método PULSO (componente 15, recurso da revisão)

**Conteúdo real e verificável, sem números nem promessas:**
- **Avaliar:** olhar o carro com o cliente, sob luz; você sai sabendo o que será feito, o valor e o prazo.
- **Cuidar:** executar o combinado, com o produto certo e áreas sensíveis protegidas; se surgir algo fora do combinado, o estúdio fala antes.
- **Entregar:** ver o carro na luz, entender o que foi feito e levar orientações de conservação.

**Composição (versão 3):**
- cabeçalho e três etapas numa lista ordenada, todos à direita de um trilho vertical de 34–68 px;
- cada etapa tem marco, verbo, texto e foto alinhados pelo topo; sem cartões;
- "Avaliar": texto à esquerda e foto 5:4 à direita; "Cuidar": foto 3:2 à esquerda e texto à direita; "Entregar": texto à esquerda e foto 3:2 à direita.

**Traçado:**
- o caminho é **calculado a partir da posição real dos marcos**, então funciona em qualquer largura. Como o trilho é uma vertical, não cruza texto;
- antes de cada marco, a linha faz o **pulso da marca** (um zigue-zague curto) e entra no marco;
- depois de "Entregar", segue até o fim da seção e termina numa seta apontando para o contato.

**Animação:**
- trilha pontilhada em aço (sempre visível) e linha coral que se desenha com a rolagem, por `stroke-dashoffset`, com suavização de 22% por quadro;
- quando o topo de uma etapa passa de 88% da altura da janela, o marco fica coral, o verbo fica azul e a foto se revela por um corte (`clip-path`, 0,7 s);
- tudo é reversível ao rolar para cima.

**Sem animação:**
- sem JS, não há SVG, e as etapas e fotos aparecem completas;
- com movimento reduzido, o traçado aparece inteiro, as etapas ficam ativas e as fotos ficam abertas (testado com `reducedMotion: 'reduce'`).

O SVG é `aria-hidden`; a informação está no texto da lista ordenada.

**Diferença em relação ao AVELA (08), que também usa o 15:** lá, o SVG é um ornamento de marca (o "fio de calda") desenhado uma vez no logotipo e reaproveitado como marcador. Aqui, o SVG **explica uma sequência real**, liga fotos e etapas e acompanha a rolagem.

## 8. Estratégia fotográfica

| Papel | Foto | Origem | Uso |
|---|---|---|---|
| Capa | Sedã azul em três quartos, estúdio com luz laranja | Enviada com o briefing; parece gerada por IA; **origem e licença a confirmar** | Sangria total, com recorte na base para remover a marca do gerador |
| Por fora | Lateral, porta, para-lama e roda de carro laranja | Bailey Mahon / Unsplash (também no VÉRTICE) | 4:5, três pontos |
| Por dentro | Volante, câmbio e bancos de couro vermelho | Douglas Fehr / Unsplash (também no VÉRTICE) | 4:5, quatro pontos (um na borda) |
| Detalhes | Gotas, politriz, farol e roda | Vitalii Abakumov, Neelabh Raj, Kyle Winkle e Ian Edokov / Unsplash (também no VÉRTICE) | Sem mudança |
| **Avaliar** (nova) | Profissional examina de perto a pintura escura | Zac Nielson / Unsplash (estava no VÉRTICE como "inspeção") | Retrato 3:4 |
| **Cuidar** (nova) | Carro coberto de espuma num box iluminado | Zulfahmi Khani / Unsplash (estava no VÉRTICE como "detalhamento completo") | Paisagem 3:2, a maior foto da seção |
| **Entregar** (nova) | Farol e capô do sedã azul refletindo a luz | **Recorte da capa** (666 × 444 px) | Paisagem: o carro da abertura volta na entrega e fecha a narrativa |

- Uma foto do acervo do VÉRTICE ("verniz") foi descartada porque **não tem autor registrado**.
- Nenhuma foto é apresentada como trabalho da marca: há aviso sob o método e no rodapé.

**Limitação que continua:** o ambiente de trabalho não tem internet para baixar imagens. Por isso, todas as fotos novas também vêm do acervo do VÉRTICE, ou são um recorte da capa. Ver as pendências.

## 9. Componentes do portfólio

```text
Componentes do PULSO: 03 Hotspots (protagonista), 14 Parallax em camadas (apoio),
15 SVG animado (recurso adicional pedido na revisão).
Função comercial:
  03 mostrar onde cada cuidado atua e o que inclui, e levar o cuidado e a área ao contato.
  14 dar uma abertura memorável e ligar a capa à seção de cuidados.
  15 reduzir a insegurança de quem nunca contratou estética automotiva: explicar o que
     acontece antes, durante e depois.
Uso dos mesmos componentes em outros modelos (segundo o guia e os registros do AVELA):
  03: ORLA (06), como apoio. 14: VÉRTICE (04), como apoio sutil. 15: AVELA (08), como ornamento.
  Outros componentes já usados: 01 VÉRTICE; 02 BOLHA & BENTO; 04 TRAÇO e AVELA;
  05 e 09 NEXO; 06 ORLA; 08 e 17 FORMA DOCE; 12 TRAÇO.
O que é específico desta implementação:
  03 lista e pontos como um único dado, lista por vista, ponto de borda para área fora da foto.
  14 cena presa curta com o plano da seção seguinte como camada de transição (no VÉRTICE,
     deslocamento sutil de foto).
  15 percurso funcional calculado a partir do layout, com o pulso da marca em cada etapa.
Evitado de propósito:
  grade de serviços, comparador antes/depois, formulário de orçamento, seção de cor chapada,
  logotipo gigante atravessando a foto, fluxograma de caixas e setas, três cartões iguais.
```

## 10. Diferenciação em relação ao VÉRTICE (avaliação com base nas capturas desta revisão)

| | VÉRTICE (04) | PULSO (09) v2 |
|---|---|---|
| Abertura | Título em bloco claro, foto em faixa, barra de serviços | Cena de rolagem: foto em sangria, título que se desfaz em velocidades diferentes, plano diagonal que vira a seção seguinte |
| Serviços | Grade 2×2 de cartões | Pontos na foto + lista que muda entre fora e dentro |
| Processo | Três passos curtos no topo do formulário | Seção própria: percurso SVG, verbos em escala de título e fotos que se revelam |
| Conversão | Formulário de orçamento em seção laranja | Mensagem pronta que reflete o cuidado e a área; o percurso termina no contato |
| Ritmo | Blocos empilhados de cor alternada | Transições contínuas: diagonal da capa → gelo, azul dos detalhes, gelo do método contínuo ao contato |
| Geometria e cor | Retângulos, carbono e laranja | Diagonais, paralelogramos, gelo, azul e coral |

**Avaliação honesta:**
- **Arquitetura, movimento e conversão:** agora claramente distintos. Mesmo sem interagir, o visitante percebe a cena de abertura, a lista ao lado da foto e o percurso do método.
- **Fotografia:** continua a parte menos diferenciada. Oito das dez fotos vêm do acervo do VÉRTICE, ainda que em outros recortes e funções; as outras duas são a capa e um recorte dela.

## 11. Testes realizados

### Versão 3 (correção direcionada)

**Ferramentas:** Playwright 1.63 com Chromium (no ambiente de trabalho, servindo a pasta por um servidor local) e o navegador integrado do Claude Desktop com Live Server (que tem as fontes reais). O Playwright não carrega o Google Fonts neste ambiente (sem internet), então ele serviu para medições; a avaliação visual da composição foi feita no navegador integrado.

**Playwright, em 1440×900, 1366×768, 768×1024, 390×844 e 360×740:**
- sem rolagem horizontal, sem imagem quebrada, sem erro de página (só falha o Google Fonts, por falta de internet do ambiente);
- método em 7 momentos (entrada, cabeçalho, início de "Avaliar", foto, "Cuidar", "Entregar" e saída): estados "viva" e fotos abertas progridem 000 → 100 → 110 → 111 e o traçado cresce de 0% a 100%;
- rolagem progressiva em passos de 20 px: a foto abre **20–80 px depois do texto da etapa aparecer** (antes, ~400 px);
- `prefers-reduced-motion: reduce`: as três fotos abertas e as três etapas ativas desde o carregamento.

**Diagonal da capa:** 7 pontos de rolagem em 1440×900 (1× e 2×) e 1366×768, com `--c`, transformações de ancestrais e espessura medida (seção 3.1).

**Navegador integrado (Live Server, fontes reais):**
- 1440×900: cabeçalho e "Avaliar", "Cuidar", "Entregar" com saída; diagonal em rolagem intermediária, com zoom na aresta;
- 390×844: cabeçalho e "Avaliar", sem rolagem lateral.

**Versão publicada:** comparada por SHA-256 e por tamanho com a local (seção 3.1).

### Versão 2 (revisão anterior)
Os testes da versão 2 (hotspots, contato, teclado, auditoria em dez tamanhos) continuam válidos para as partes não alteradas, mas **a auditoria em dez tamanhos e as capturas da cena não foram repetidos na versão 3**, exceto onde descrito acima.

**Não testados (versão 3):**
- GPU real em navegador de usuário (não consegui reproduzir o borrão; a correção elimina o mecanismo, mas a conferência final é abrir a página publicada);
- preferência de movimento reduzido do sistema operacional (emulada pelo Playwright, não pelo sistema);
- toque físico, leitor de tela, Safari/iOS;
- vídeo contínuo da rolagem (as verificações são por posições e medições);
- 360×740 e 1366×768 só foram medidos, sem inspeção visual no navegador integrado.

## 12. Problemas encontrados e corrigidos

### Versão 3
1. Diagonal coral esticada por `scaleY` de até 5,7× numa camada com `will-change` → duas camadas `clip-path` com `--c` (seção 3.1).
2. Foto do método abrindo ~400 px depois do texto → gatilho no topo da etapa, alinhamento pelo topo e fotos abertas por padrão (seção 3.1).
3. Composição do método com título enorme, texto isolado e vãos grandes → cabeçalho contido, trilho vertical e fotos mais baixas.
4. **Regressão minha durante a correção:** ao reescrever a cena apaguei a linha que dá altura ao trilho da capa, e a cena deixou de ficar presa. Foi encontrada ao medir a espessura da diagonal (a rolagem não avançava) e corrigida antes da entrega.
5. Gravações no disco do usuário chegaram em atraso mais de uma vez (o servidor ainda mostrava arquivos antigos). Cada gravação foi conferida pelo conteúdo servido antes de validar.

### Versão 2
1. Título maior encostava na carroceria em 1440 → limitado a 3,5 vw (máx. 4,4 rem). A foto deslocada para a direita foi testada e descartada, porque ampliava o carro e cortava a frente.
2. No fim da cena sobrava uma faixa escura à esquerda e havia um degrau até a seção seguinte → aresta passou a começar a 30% da altura (mantido na versão 3).
3. O traçado do método atravessava um parágrafo → resolvido na versão 3 com o trilho vertical.
4. As etiquetas dos pontos criavam 64 px de rolagem lateral no celular → só existem quando ativas, quebram linha e escolhem o lado pelo ponto.
5. A placa azul cobria a lista no celular → no celular ela fica só atrás da foto.

## 13. Pendências

### BLOQUEANTES
- Nenhuma conhecida para a demonstração.

### RECOMENDADAS
1. **Conjunto fotográfico próprio**, com licença clara, para substituir as fotos herdadas do VÉRTICE, inclusive as do método:
   - capa com 2400 px ou mais e sem marca de gerador;
   - foto de "Entregar" maior (hoje tem 666 px e fica macia em telas de alta densidade);
   - interior que mostre o assoalho (o ponto de "Tapetes" pode então sair da borda).

   Ao trocar, reposicione os pontos.
2. Testar com movimento reduzido real, toque físico, leitor de tela, Safari/iOS e no GitHub Pages; gravar um vídeo da cena e do traçado.
3. Inspecionar visualmente 360, 600, 900, 1024 e 1100.
4. Rodar `tools/baixar-recursos.ps1` para usar fontes locais.
5. **Conferir a diagonal na página publicada depois da próxima publicação**, em tela de alta densidade e rolando devagar, para confirmar que o borrão sumiu.
6. Avaliar se a cena deve ficar presa por menos tempo (hoje são 70% da altura da tela), depois de uma rodada com usuários.

### PUBLICAÇÃO COMERCIAL
- [ ] WhatsApp real e `demo.enabled: false`; link do mapa.
- [ ] Endereço, horários e textos do método revisados com o cliente (só manter o que ele realmente faz, como "falamos antes se surgir algo fora do combinado").
- [ ] Fotos do cliente com autorização, e créditos atualizados.
- [ ] Remover `noindex`; revisar título, descrição e `og:image`.
- [ ] Favicon e símbolo do cliente; domínio e hospedagem; repetir a auditoria nas larguras.
