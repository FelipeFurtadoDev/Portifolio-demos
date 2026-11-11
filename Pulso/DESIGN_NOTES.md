# PULSO Auto Care: notas de design e decisões técnicas

Modelo 09 do catálogo. Segunda proposta comercial do nicho de estética automotiva, criada como alternativa estrutural ao VÉRTICE (04).
Assinatura: "Seu carro em outra frequência."
Data: 11/11/2026.

Skill Frontend Design da Anthropic: carregada e aplicada (plano de tokens e wireframes mentais antes do código, revisão do plano contra o briefing e contra o VÉRTICE).

Documentos consultados:
- `docs/01_NEGOCIO_E_PUBLICO.md`, `docs/02_NICHOS_E_OBJETIVOS.md`, `docs/acervo_design_landing_pages.md`, `docs/guia_componentes_diferenciacao.md`;
- `DESIGN_NOTES.md` dos modelos 04 (VÉRTICE), 07 (NEXO) e 08 (AVELA), mais `index.html` e `js/config.js` do 04;
- os `fontes-locais.css` dos modelos 03, 05, 06 e 07, para não repetir famílias tipográficas. Os `DESIGN_NOTES.md` dos modelos 01, 02, 03, 05 e 06 **não** foram lidos.

A fotografia enviada junto com o briefing (sedã azul em três quartos, estúdio com luz laranja) foi usada como capa porque encaixou na paleta e na composição. O briefing a tratava como referência, não como obrigação.

---

## 1. Identidade e conceito

**Performance visual, em claro.** O nome sugere batimento, e o grafismo da marca é a **linha de pulso**: um traço que sobe e desce, usado no símbolo, no sublinhado da capa e como marcador de seção. O contraste é entre áreas claras (gelo), uma grande área de azul elétrico e fotografias intensas. Os cortes são diagonais e os botões e abas são paralelogramos.

O que dá personalidade sem virar painel de carro:
- botões, abas e marcadores inclinados (-12°), como o "tombo" de uma letra itálica;
- **riscos direcionais** (três traços inclinados) na capa e no botão principal;
- cantos recortados em 45° nas fotos e no cartão de contato;
- título em fonte larga e pesada, levemente inclinado.

Evitado de propósito: instrumentos, velocímetro, bandeira quadriculada, números de corrida, fundo preto contínuo, "linha de luz" e lanterna de inspeção (VÉRTICE).

## 2. Arquitetura implementada

Quatro momentos. Cada um responde a uma pergunta do visitante:

| | Pergunta | Fundo | Composição |
|---|---|---|---|
| **A · Impacto** | "Que lugar é este?" | Foto em sangria total sobre azul-noite | Título e CTAs à esquerda, carro à direita; riscos e faixas como camadas; corte diagonal na base |
| **B · Explore os cuidados** | "O que fazem no meu carro?" | Gelo, com bloco azul inclinado atrás da foto | Lista dos 4 cuidados à esquerda; foto do carro com pontos à direita; abas "Por fora" e "Por dentro" |
| **C · Superfícies e detalhes** | "Como é o trabalho de perto?" | Azul elétrico, com cortes diagonais em cima e embaixo | Quatro fotos em escalas e proporções diferentes, deslocadas, com legendas curtas |
| **D · Contato** | "Como falo com eles?" | Gelo, com cartão escuro inclinado | Frase, escolha opcional do cuidado, mensagem pronta, WhatsApp, endereço e horários |

Topo fixo (marca, três destinos e "Conversar"; menu em painel abaixo de 900 px) e faixa de demonstração coral. O rodapé fica dentro do D: marca, aviso de demonstração e créditos. **Não há quinta seção de CTA.**

## 3. Tipografia e paleta

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| Gelo | `#F3F1EA` | Fundo de B e D, texto sobre escuro | Asfalto sobre gelo: 14,5:1 |
| Asfalto | `#14212B` | Texto, cartão de contato, painel do popover | Gelo sobre asfalto: 14,5:1 |
| Azul elétrico | `#1769E8` | Seção C, bloco atrás da foto, ponto ativo | Branco sobre azul: 5,0:1. Azul sobre gelo: só 4,4:1, por isso **não é usado em texto pequeno** |
| Coral energético | `#FF6542` | Botões, faixa de demonstração, ponto, marcadores | Asfalto sobre coral: 5,6:1. Coral nunca é cor de texto sobre gelo |
| Aço claro | `#B9C6D0` | Texto secundário sobre asfalto | 9,4:1 |
| Azul profundo | `#0F52C2` (**criado**) | Foco e links sobre gelo | 6,2:1 sobre gelo |
| Tinta secundária | `#4A5C69` (**criado**) | Texto secundário sobre gelo | 6,1:1 |
| Noite | `#0C141B` (**criado**) | Fundo da capa, atrás da foto | |

A paleta do briefing foi mantida; só foram acrescentadas as variantes necessárias para texto. Coral e azul não se misturam em todo lugar: o coral é ação (botões, ponto, faixa), o azul é grande superfície e estado ativo.

**Tipografia** (nenhuma delas foi usada nos modelos anteriores):
- **Anybody**, variável com eixo de largura (`font-stretch` 118–150%) e peso 800–900: títulos, nomes de cuidados, marca. Os títulos da capa têm inclinação de -6° por transformação.
- **Instrument Sans** 400–700: textos, botões e rótulos.
- Sem caixa alta nos rótulos, sem palavra destacada nos títulos e sem monoespaçada.
- Hoje carregadas pelo Google Fonts (conferido no navegador que `Anybody 500–900` e `Instrument Sans 400–700` carregaram). O script `tools/baixar-recursos.ps1` gera a versão local; **não foi executado**.

## 4. Estratégia fotográfica

| Papel | Foto | Origem | Como aparece |
|---|---|---|---|
| **A · Capa** | Sedã azul-elétrico em três quartos, piso brilhante, luz laranja | Arquivo enviado com o briefing. Apresenta marca de gerador de imagens no canto inferior direito e parece gerada por IA. **Origem e licença a confirmar** | Sangria total; recorte de 40 px na base para remover a marca; versões 900, 1276 (original) e 1914 px (ampliação por reamostragem, sem detalhe novo) |
| **B · Por fora** | Lateral de carro laranja com retrovisor, porta, para-lama e roda | Unsplash, Bailey Mahon (a mesma foto usada na galeria do VÉRTICE) | Recorte 4:5; cinco pontos |
| **B · Por dentro** | Interior com volante, câmbio e bancos de couro vermelho | Unsplash, Douglas Fehr (a mesma do VÉRTICE) | Recorte 4:5; quatro pontos |
| **C · Gotas** | Gotas sobre pintura prateada | Unsplash, Vitalii Abakumov (VÉRTICE) | Retrato 3:4, escala grande |
| **C · Polimento** | Politriz vermelha com fita de proteção | Unsplash, Neelabh Raj (VÉRTICE) | Retrato 4:5, deslocada para baixo |
| **C · Farol** | Farol azul-marinho com feixe de luz | Unsplash, Kyle Winkle (VÉRTICE) | Paisagem 3:2, ao lado do título |
| **C · Roda** | Raios de roda de liga com pinça vermelha | Unsplash, Ian Edokov (VÉRTICE) | Paisagem 3:2 |

**Limitação real e decisão:** o ambiente de trabalho não tem acesso à internet para baixar imagens, e eu só uso fotografias que consegui ver (para posicionar pontos em regiões que existem). Por isso **seis das sete fotos aparecem também no VÉRTICE**. Elas foram copiadas (o modelo 04 não foi alterado) e recortadas de outra forma. É o ponto mais fraco do modelo em relação ao briefing, que pedia um conjunto novo e mais colorido. Está nas pendências.

Cuidados com as fotos:
- nada é apresentado como trabalho da marca, e não há antes/depois nem comparador;
- as legendas descrevem o que a foto mostra;
- a capa e a seção B têm cor, mas as fotos de C são escuras. O azul elétrico de fundo é o que as destaca.

## 5. Componentes escolhidos

```text
Componentes escolhidos: ID 03 (protagonista), ID 14 (apoio)
Objetivos de cada componente:
  03 Hotspots sobre imagens: o visitante entende o que o estúdio faz em cada região do carro, sem
     ler uma grade de serviços. Reduz a dúvida "isso inclui o quê?" antes do primeiro contato.
  14 Parallax em camadas: dá profundidade à capa e liga a fotografia aos grafismos da marca.
Como influenciaram a arquitetura:
  03 organiza o momento B inteiro: lista de cuidados + foto com pontos + abas fora/dentro; o
     serviço escolhido ali alimenta o contato (D). Não existe seção de "serviços" em cartões.
  14 define a composição da capa: foto em sangria com camadas gráficas independentes (riscos e
     faixas), em vez de título num bloco e foto em outro.
Componentes já usados nos modelos comparados:
  VÉRTICE (04): 01 Antes/depois (planejado) e 14 Parallax (planejado). NEXO (07): 09 Lista de
  serviços + painel estável e 05. AVELA (08): lookbook de carta. (Conforme o guia; os registros
  completos dos modelos 01 a 06 não foram relidos.)
O que foi deliberadamente evitado:
  grade 2x2 de serviços, galeria com efeito de luz, formulário de orçamento, seção laranja
  chapada, título sobre faixa de foto, logotipo gigante atravessando a foto, comparador antes/depois.
Alternativas responsivas / reduzido movimento / sem JS:
  Lista de cuidados sempre visível (no celular em 2x2). Abaixo de 1000 px o popover vira painel
  fixo abaixo da foto, e a página rola até ele ao tocar num ponto. Sem JS, a foto aparece e há
  uma lista estática dos quatro cuidados (<noscript>). Parallax só com ponteiro fino e 900 px ou
  mais, e desligado com prefers-reduced-motion.
Pendências e testes observados: ver seções 8 e 9.
```

## 6. Parallax da capa

- Três camadas: **foto** (desloca-se 5% da altura da capa ao longo da rolagem, mais ±7 px com o ponteiro, escala fixa de 1,07 para não expor bordas), **faixas** (-7%) e **riscos** (-14%). Só `transform`, via `requestAnimationFrame`.
- A foto não é recortada nem separada em planos: é uma camada única. Os planos de profundidade vêm dos grafismos, e o carro nunca é deformado.
- Desligado abaixo de 900 px, sem ponteiro fino e com `prefers-reduced-motion: reduce`. O JS limpa os estilos ao desativar.
- O único movimento sem ação do usuário é o traço de pulso que se desenha uma vez no carregamento e o anel pulsando nos pontos ainda não abertos. Ambos param com movimento reduzido.

## 7. Hotspots

- Pontos em **porcentagem da imagem exibida** (`x`, `y` em `config.js`). Como a moldura tem a mesma proporção da foto (4:5), os pontos acompanham a imagem em qualquer largura. Nada de `object-fit` que recorte diferente.
- Cada ponto é um `<button>` de 48 px com nome acessível ("Roda e pneu. Cuidado: Rodas e superfícies externas"), `aria-expanded` e `aria-controls`.
- **Nove pontos, todos sobre regiões visíveis:** por fora, lateral/porta, para-lama, roda, retrovisor e friso; por dentro, bancos de couro, volante, console/câmbio e saídas de ar.
- Estado ativo: miolo azul maior com anel branco; os demais pulsam levemente.
- **Popover:**
  - a partir de 1000 px fica sobre a página, ao lado do ponto. A posição é calculada com limites da janela (nunca sai da tela) e escolhe lado, abaixo ou acima, evitando cobrir o ponto ativo;
  - abaixo de 1000 px, encaixa-se logo abaixo da foto;
  - Esc fecha, e o foco volta ao ponto; clicar no ponto ativo ou fora também fecha (só no modo flutuante).
- Abas "Por fora" e "Por dentro" (`role=tablist`, setas, Home e End). Ao trocar de aba, o primeiro ponto daquela vista abre sozinho, **sem** escolher o cuidado no contato.
- A lista de cuidados é a alternativa sempre visível: tocar num cuidado abre o primeiro ponto dele.
- Clicar em "Conversar sobre este cuidado" ou escolher um ponto/cuidado preenche a mensagem do contato. Não há montador de orçamento.

## 8. Diferenças em relação ao VÉRTICE (teste de diferenciação)

Comparação feita com os arquivos e capturas deste projeto, contra o VÉRTICE (04, mesmo nicho), o AVELA (08, capa com logotipo gigante) e o NEXO (07, lista com painel estável):

| | VÉRTICE | PULSO |
|---|---|---|
| Capa | Título em bloco claro, foto em faixa e barra laranja de serviços | Foto em sangria total, título e CTAs sobre ela, carro à direita, camadas gráficas e corte diagonal |
| Geometria | Retângulos, faixas empilhadas | Paralelogramos, diagonais, cantos em 45° |
| Fotografia | Carro laranja de frente; galeria escura | Carro azul; os detalhes ficam sobre um campo azul |
| Serviços | Grade 2×2 de cartões com fotos e itens | **Dentro** de uma fotografia, por pontos; lista curta ao lado |
| Segunda parte | Galeria com lanterna que acompanha o cursor | Composição assimétrica de quatro fotos, sem grade de cartões |
| Conversão | Formulário de orçamento em seção laranja chapada | Frase, cuidado opcional, mensagem pronta e WhatsApp; sem formulário |
| Tipografia e cor | Big Shoulders, carbono e laranja | Anybody larga, gelo, azul elétrico e coral |
| Movimento | Luz de inspeção | Parallax discreto e pontos que abrem informação |

Em relação ao AVELA, o PULSO não atravessa a foto com o logotipo (isso foi testado e removido na revisão, ver seção 10). Em relação ao NEXO, a lista de cuidados não é o componente principal: ela acompanha a foto, que é onde a exploração acontece.

**Avaliação crítica:** a estrutura, a interação e o contato são genuinamente diferentes do VÉRTICE. A fotografia ainda não: seis das sete imagens vêm do mesmo acervo do VÉRTICE, e só a capa e a composição das fotos mudam. Enquanto as fotos não forem trocadas, a diferença fotográfica é parcial.

## 9. Funcionalidades
- Topo fixo com faixa de demonstração configurável, menu móvel acessível (foco, Esc e fechamento ao navegar) e "pular para o conteúdo".
- Hotspots e abas como na seção 7.
- Contato:
  - cuidado opcional em botões de rádio (sincronizado com a lista da seção B) e mensagem montada pelo `config.js`;
  - **modo demonstrativo:** o botão mostra um aviso e oferece "Copiar mensagem". Nada é aberto nem enviado, e o link do mapa também mostra aviso;
  - com `demo.enabled: false` e um número em `contact.whatsapp`, abre `wa.me` com a mensagem; com `contact.mapsUrl`, o link do mapa abre o endereço.
- Imagens com `srcset`, dimensões declaradas e carregamento tardio fora da capa. `noindex` mantido.
- `prefers-reduced-motion` respeitado (CSS e JS).

## 10. Testes realizados (Live Server, navegador integrado do Claude Desktop)

- **Larguras e alturas** (a página carregada em quadros do tamanho exato, medida por script): 360×740, 390×844, 600×900, 768×1024, 900×700, 1024×768, 1100×800, 1440×900, 1366×560 e 390×560. Em todas:
  - sem rolagem horizontal (`scrollWidth` = `clientWidth`);
  - 7 de 7 imagens carregadas, sem distorção de proporção;
  - texto e botões da capa dentro da capa;
  - fotografia da capa visível na primeira tela, de 300 px (390×560) a 749 px (1440×900);
  - os nove pontos dentro da imagem;
  - popover dentro da tela, sem cobrir o ponto ativo nos modos flutuante (1024 a 1440).
- **Capturas inspecionadas visualmente:** 1440 (capa, cuidados por fora e por dentro com popover, detalhes, contato); 390 (capa, cuidados com painel encaixado, detalhes, contato, menu aberto); 768 (capa, antes e depois do ajuste); 1366×560 (capa). **Só medidos, sem captura:** 360, 600, 900, 1024, 1100 e 390×560.
- **Teclado:** seta direita na aba "Por fora" troca para "Por dentro" e abre o primeiro ponto; Tab leva ao ponto; Enter fecha/abre; Esc fecha e mantém o foco no ponto.
- **Menu móvel (390):** abre em painel sob o topo e Esc fecha e devolve o foco ao botão.
- **Contato demonstrativo:** escolher um cuidado altera chip e mensagem; clicar no WhatsApp mostra o aviso, não abre janela nem altera o endereço, e mostra "Copiar mensagem".
- **Parallax:** foto, faixas e riscos foram medidos em rolagens de 0 a 600 px (foto desloca 10 px por 200 px; riscos, 28 px) e com um evento de ponteiro. **Não foi feita observação em vídeo** do movimento contínuo.
- **Console e rede:** só a mensagem do Live Server; 13 recursos na aba de 1440, nenhum com status de erro.
- **Não testados:** toque real em dispositivo (os cliques foram de mouse), preferência real de movimento reduzido do sistema, leitor de tela, Safari/iOS, GitHub Pages e o script `baixar-recursos.ps1`.

## 11. Problemas encontrados e corrigidos
1. **Logotipo em contorno atravessando o carro** (primeira versão da capa) competia com a foto e se parecia com o AVELA → removido; a camada passou a ser de faixas.
2. **Topo "invisível" no celular:** a capa começava abaixo do topo fixo e o fundo claro da página aparecia atrás de logotipo e menu claros → a capa agora tem espaço para o topo e fundo próprio.
3. **Informação do ponto abaixo da tela no celular:** o painel encaixado ficava fora da primeira tela depois de tocar → a página rola até ele.
4. **Capa em tablet vertical (768×1024):** carro pequeno e muito espaço vazio → foto maior e texto no topo.
5. **Popover:** a primeira lógica dependia da largura da foto e cobria os pontos em 1440×900 → passou a usar a janela, com teste de sobreposição.
6. Nenhum `overflow: hidden` foi usado para esconder problema. Há `overflow: clip` só na capa, que corta a foto ampliada pelo parallax.

## 12. Pendências

### BLOQUEANTES
- Nenhuma.

### RECOMENDADAS
1. **Trocar a foto da capa** por uma de 2400 px ou mais, com licença clara e sem marca de gerador. Hoje ela tem 1276 px (a versão de 1914 px é ampliação). Em telas grandes ou de alta densidade ficará levemente macia. Os emblemas de montadora visíveis no carro também merecem avaliação. Ao trocar, reveja o enquadramento e o escurecimento da esquerda.
2. **Substituir as fotos reaproveitadas do VÉRTICE** por um conjunto novo e mais colorido (azul, vermelho, couro em tons quentes, gotas sobre pintura azul, polimento em carroceria vermelha), e **reposicionar os pontos** de acordo com cada foto.
3. Rodar `tools/baixar-recursos.ps1`, trocar o link do Google Fonts por `css/fontes-locais.css` e conferir.
4. Testar toque real, movimento reduzido real, leitor de tela e Safari/iOS; conferir no GitHub Pages.
5. Inspecionar visualmente 360, 600, 900, 1024 e 1100 (hoje só medidos).
6. Gerar uma versão menor de `gotas-1000.webp` (165 KB) e da capa de 1914 px (180 KB), se o desempenho importar.

### PUBLICAÇÃO COMERCIAL
- [ ] `contact.whatsapp` real e `demo.enabled: false`; testar o WhatsApp e o link do mapa.
- [ ] Endereço, horários, atendimento e Instagram reais.
- [ ] Textos dos cuidados e dos pontos revistos com o cliente, sem prazos nem garantias que ele não possa cumprir.
- [ ] Fotos do cliente, com autorização; `Imagem ilustrativa` só deve sair para fotos de trabalhos reais.
- [ ] Atualizar ou remover os créditos.
- [ ] Remover `noindex`; revisar `<title>`, `description` e `og:image` (hoje não há imagem de compartilhamento).
- [ ] Favicon e símbolo do cliente.
- [ ] Domínio, hospedagem e repetir a auditoria nas larguras depois da troca de conteúdo.
