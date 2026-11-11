# LASTRO · Bancadas sob medida — Notas de design e decisões técnicas

Modelo 12 do catálogo (segunda marmoraria; último modelo da segunda remessa). Marca fictícia.
Pergunta que a página resolve: **"O que preciso informar para pedir orçamento da minha bancada?"**
Data: 11/11/2026.

## 1. Estratégia comercial

A ORLA (06) organiza a escolha por ambiente, pedra e acabamento. O LASTRO organiza a jornada pela **peça que a pessoa precisa e pelo que ela já sabe sobre a obra**. O visitante pode chegar com planta, só com uma foto ou sem medida nenhuma, e em todos os casos consegue começar o contato.

| Bloco | O que resolve |
|---|---|
| 1. Capa | Oferta e botão "Preparar meu pedido" em faixa própria, abaixo de uma foto ampla da ilha |
| 2. Escolha a peça | Esboço por peça + campos opcionais + rota direta "Já tenho planta ou fotos" |
| 3. A pedra no ambiente | Duas fotos: uma mostra a peça no espaço, a outra aproxima o recorte da cuba e o encontro com a parede |
| 4. Comece o orçamento | Resumo da peça e dos dados, lista do que enviar e mensagem pronta para copiar |

Não há preços, prazos, garantias, avaliações nem obras atribuídas à marca.

## 2. Conceito e direção de arte

**Revista de arquitetura, com o desenho técnico concentrado num só lugar.** Fotografia ampla e margens generosas, contraste de escala entre as fotos e os títulos em serifa condensada. Cotas, hachuras e traço de projeto aparecem **apenas** no esboço do configurador; o resto da página fica quieto.

- **Capa:** foto em sangria (ilha de pedra em primeiro plano, madeira de nogueira, luz de janela à esquerda) e, logo abaixo, uma faixa ultramarina de largura total, com área própria para o texto. Nada de texto sobre a foto.
- **Símbolo:** um "L" recortado num quadrado ultramarino. É a inicial da marca e também a planta de uma bancada em L.
- **Esboço:** vista de cima, traço ultramarino sobre papel quadriculado claro, parede hachurada, cotas com terminais. A cota mostra o valor digitado (`≈ 280 cm`) ou o nome da medida enquanto o campo está vazio.
- **Seleção:** cartão da peça preenchido em ultramarino, ícone invertido e selo de confirmação (não depende só da cor).

### Paleta

| Token | Hex | Uso |
|---|---|---|
| Ultramarino | `#1F2EB8` | Faixa da capa, controles, traço do esboço, símbolo |
| Ultramarino escuro | `#17228A` | Hover dos botões primários |
| Ultramarino leve | `#E8EBFB` | Preenchimento do esboço, ajuda aberta, caixa marcada |
| Branco mineral | `#F6F7F5` | Fundo base |
| Branco | `#FFFFFF` | Painéis, campos, seção do orçamento |
| Grafite | `#23262B` | Texto, faixa de demonstração, rodapé |
| Grafite 2 | `#4A4F57` | Texto secundário |
| Controle | `#6B7079` | Borda de campos |
| Erro | `#B3261E` | Validação de medidas |

Madeira e tons quentes existem **só nas fotografias**. Contrastes calculados (WCAG): todos os pares de texto ≥ 6,0:1 (maioria ≥ 7:1); bordas de campo 4,98:1; traço ultramarino sobre branco 9,81:1.

### Tipografia

- **Instrument Serif** (Google Fonts, OFL) nos títulos e subtítulos. Peso único.
- **Geist** (Google Fonts, OFL, variável 400–700) em textos, controles, medidas e cotas.
- Sem rótulos em caixa alta, sem palavra destacada em título, sem fonte monoespaçada, sem setas nos botões. "LASTRO" em caixa alta e espaçado é o logotipo.

## 3. Arquitetura implementada

0. Faixa de demonstração (grafite, uma ou duas linhas).
1. Topo fixo: símbolo + nome, dois links (a partir de 760 px) e "Orçamento".
2. **Capa (`#inicio`).**
   - Desktop: foto de altura `100svh − 25rem` (300–700 px) + faixa ultramarina com título em duas colunas (título à esquerda; apoio, botão e rota à direita).
   - Celular: foto com altura `min(110vw, 100svh − 22rem)`, depois a faixa com título, **botão**, rota e só então a frase de apoio (`order`), para a oferta e o botão ficarem na primeira tela. Medido: 390×844 e 360×640 mostram título, botão e "Já tenho planta ou fotos" sem rolar.
3. **Configurador (`#peca`).**
   - A partir de **960 px**: duas colunas. À esquerda, as quatro peças e os campos; à direita, o esboço, que fica fixo (`sticky`) enquanto se preenchem os campos.
   - Abaixo de 960 px: uma coluna na ordem **peças → esboço → campos**. O esboço fica logo abaixo dos cartões (distância medida < 60 px), sem rolagem lateral.
4. **A pedra no ambiente (`#ambiente`).** Composição estática de 12 colunas a partir de 900 px: plano aberto (8 colunas) e detalhe vertical 4:5 (4 colunas) alinhados pela base, com legendas curtas. No celular, uma coluna na proporção natural.
5. **Orçamento (`#pedido`).** Resumo à esquerda; mensagem e botões à direita (empilhados abaixo de 900 px).
6. Rodapé com aviso de marca fictícia e créditos gerados do `config.js`.

Página inteira: ~4.570 px em 1440 px de largura.

## 4. Componentes escolhidos

```text
Componentes escolhidos: ID 07 (protagonista), ID 18 (apoio)
Objetivos de cada componente:
  07 — a escolha troca a geometria do desenho e quais informações são úteis para o orçamento
  18 — explicar só os dois termos que podem travar o preenchimento: "profundidade" e "recorte"
Como influenciaram a arquitetura:
  O configurador é o centro da página (e não uma seção de catálogo): fotos e contato vêm depois dele.
  O resumo e a mensagem do bloco 4 são alimentados pelo estado da peça ativa.
Componentes já usados nos modelos comparados:
  ORLA (06): 06 (amostruário). A tabela de planejamento sugere também o 03, mas o DESIGN_NOTES da ORLA não registra hotspots. Nenhum dos dois é repetido aqui.
O que foi deliberadamente evitado:
  recorte de texto na foto, juntas entre fotos, trilho de amostras, carimbo de prancha e Geologica (lista de "evitar" da ORLA);
  formulário longo; GSAP; ícones genéricos de construção.
Alternativas responsivas / reduzido movimento / sem JS: ver seções 6 e 7.
Pendências e testes observados: ver seções 10 a 12.
```

### ID 07 — esboço da peça (adaptação do configurador visual do INTERFACE / LAB)

No original, a seleção troca variantes de um produto. Aqui ela troca **a geometria e as informações pedidas**.

| Peça | Campos (todos opcionais, em cm) | O que muda no desenho |
|---|---|---|
| Bancada reta | Comprimento, profundidade, recortes (cuba, cooktop) | Retângulo junto à parede; cuba e cooktop aparecem quando marcados |
| Bancada em L | Comprimento do lado A (parede do fundo), lado B (parede lateral), posição da cuba | Dois braços com selos A e B; a cuba muda de lado ou vai para o encontro |
| Ilha | Comprimento, largura, recortes | Retângulo livre, sem parede |
| Lavatório | Largura, profundidade, tipo de cuba | Cuba de apoio, embutida ou esculpida |

- Quatro opções visíveis desde o início, cada uma com ícone, nome e orientação em texto. **Nenhuma vem marcada**; sem escolha, o esboço mostra só um quadro tracejado e a mensagem diz que a peça ainda não foi escolhida.
- Controles semânticos: `fieldset` com `legend` e `input type="radio"` reais; foco visível por contorno grafite de 3 px; seleção por preenchimento + ícone + selo.
- **Medidas:** `inputmode="decimal"`, unidade `cm` e "opcional" sempre visíveis ao lado do campo; aceita vírgula ou ponto, "280cm" e espaços. Valores inválidos (texto, menos de 10 cm, mais de 1500 cm) recebem mensagem, `aria-invalid` e **não entram** no resumo nem na mensagem. O caso mais provável, "2,8" digitado em metros, explica como escrever 280.
- **Estado por peça:** os valores ficam guardados por peça. Ao trocar de peça, o resumo mostra só os campos da peça ativa (testado: dados da reta não aparecem na ilha nem no lavatório) e, ao voltar, os valores são restaurados.
- **Texto do esboço:** SVG com `role="img"` e legenda visível "Esboço ilustrativo, fora de escala." + "A marmoraria confere as medidas finais." A descrição acessível muda por peça (por exemplo, "O lado A segue a parede do fundo e o lado B, a parede lateral").
- **Animação:** ao escolher uma peça, o contorno se desenha em 0,55 s e as cotas surgem em seguida. É a resposta a uma ação, e só ocorre com `prefers-reduced-motion: no-preference`.
- **Atalho comercial:** "Já tenho planta ou fotos" (no cabeçalho do configurador e na capa) leva a `#pedido` e marca "Tenho planta ou fotos para enviar", que entra na mensagem.

### ID 18 — ajuda contextual (adaptação do experimento de popovers)

- Dois botões com nome explícito: **"O que é profundidade?"** (reta e lavatório) e **"O que é um recorte?"** (reta, L, ilha e lavatório, junto de cuba e cooktop).
- Comportamento: abre por clique, toque, Enter e Espaço; `aria-expanded` + `aria-controls`; o foco **permanece no botão** ao abrir; Esc fecha (mesmo com o foco em outro campo) e devolve o foco ao botão; clicar fora também fecha; só uma ajuda fica aberta.
- Posição: o painel abre **dentro da linha do próprio campo**, logo abaixo do botão e com a largura do campo (sem `position: absolute`, sem cortes a 360 px). Alvo de toque de 40 px de altura.
- Unidade, "opcional" e a orientação essencial continuam visíveis fora da ajuda. A ajuda não cria navegação.
- **Diferença em relação ao ID 18 original:** em vez de balão flutuante, um painel em fluxo. Escolha deliberada: é a forma mais robusta para largura de celular e não precisa de posicionamento por âncora. O custo é um pequeno deslocamento do conteúdo abaixo ao abrir.

## 5. Direção fotográfica e licenças

Fotos escolhidas por inspeção visual no navegador (folhas de contato), descartando renders 3D e fotos de imobiliária. Todas são de **Unsplash, Licença Unsplash**; a página de cada foto diz "Fotografia grátis" (não são Unsplash+). Autoria conferida em cada página em 11/11/2026.

| Papel | Foto | Autor | Enquadramento |
|---|---|---|---|
| **Capa** | `photo-1781249144389-4174c1164955` — [Tf5QDU9xxMU](https://unsplash.com/photos/Tf5QDU9xxMU) | Irena Oze | Vista oblíqua: ilha de pedra com veios e pintas em primeiro plano (tampo e frente), nogueira, luz de janela à esquerda. Proporção 3:2 |
| Plano aberto | `photo-1792980191179-67e43ba8d5d4` — [ZTGO2CpU3CA](https://unsplash.com/photos/ZTGO2CpU3CA) | Clay Banks | Cozinha com ilha de tampo escuro, janela e bancada de apoio |
| Detalhe | `photo-1637665609537-26857a32f6cd` — [2v01Re71D6I](https://unsplash.com/photos/2v01Re71D6I) | Craig Lovelidge | Cuba preta embutida em pedra clara, faixa de pedra em volta do recorte e encontro com a parede |

- **Recortes:** capa em `object-position: 24% 78%`, que preserva tampo e frente da ilha tanto no desktop (faixa larga) quanto no celular (recorte quase quadrado). Conferido nas capturas a 1440, 768, 390 e 360. Detalhe com `object-position: 24% 62%` (4:5, desktop) e `30% 60%` (4:3, celular).
- **Independência:** as três fotos têm autores diferentes e vêm de obras diferentes. O plano aberto e o detalhe estão identificados como referências que "não mostram trabalhos da LASTRO".
- **Sem filtros, sobreposições ou redução de opacidade** sobre as fotos. A única intervenção é o recorte por `object-fit`.
- **Avisos:** "Imagem ilustrativa" na capa; nota sob o bloco editorial; faixa de demonstração; rodapé.
- **Referências de composição** (Cosentino e deVOL): consultadas só como conceito (foto ampla + detalhe com legenda). **Os sites não foram abertos neste ambiente** (o terminal não alcança esses domínios), então a comparação se baseia no briefing.

## 6. Decisões técnicas

- HTML, CSS e JS puros. Caminhos relativos; nenhum caminho do Windows no código. Funciona em subpasta do GitHub Pages.
- `noindex, nofollow` (demonstração), com comentário no `<head>`.
- Favicon SVG em arquivo (`assets/favicon.svg`), o mesmo "L" do símbolo.
- Capa com `srcset` 640/1200/1800, `preload` com `imagesrcset`, `fetchpriority="high"`, `width`/`height`. As demais com `loading="lazy"`, `decoding="async"`, `width`/`height`.
- Atributo `hidden` com `[hidden]{display:none!important}`. **Detalhe que gerou um bug:** em elementos SVG a propriedade `.hidden` não existe; o JS usa `setAttribute('hidden')`.
- `:has()` é usado para o estado selecionado dos cartões e das caixas de marcar (suporte atual em Chrome, Edge, Safari e Firefox 121+).
- Grades com `minmax(0, 1fr)`. Nenhum `overflow: hidden` para esconder problema. Sem rolagem horizontal em nenhum estado.
- **GSAP: não usado.** A única animação é o desenho do contorno do esboço, feita com `stroke-dashoffset` em CSS; GSAP seria dependência sem ganho.
- Cópia: `navigator.clipboard` e, se recusada, seleção + `execCommand('copy')` com aviso para usar Ctrl+C.
- Contato: demonstração com `contact.whatsapp` vazio; o botão do WhatsApp só mostra um aviso (`role="status"`). Com `demo.enabled: false` e número válido, abre `wa.me` com a mensagem. Dados demonstrativos ficam separados em `config.js`.
- **Skill Frontend Design:** a skill `frontend-design` estava disponível e foi carregada antes de escrever o código; as decisões da seção 6 ("Plano de design e revisão") seguiram o seu roteiro. O GSAP não foi usado.
- CSS/JS com `?v=1`.

### Plano de design e revisão

Antes de codificar, o plano foi confrontado com os padrões que a skill lista como "automáticos". Mudanças feitas por isso: (1) fundo creme + terracota descartado (o briefing já impunha mineral + ultramarino; a madeira ficou só nas fotos); (2) cotas e hachuras mantidas **apenas** no esboço, para não virar ornamento (como na ORLA); (3) nenhuma palavra destacada em título, nenhum rótulo em caixa alta e nenhuma seta nos botões; (4) o contato virou "resumo + mensagem" (e não um formulário de campos de contato); (5) a ajuda deixou de ser balão flutuante e virou painel em fluxo (justificativa na seção 4).

## 7. Alternativas: sem JavaScript, movimento reduzido, toque e teclado

- **Sem JS:** capa, fotos, orientações das quatro peças (nos cartões), mensagem padrão e rodapé continuam legíveis; aparece um aviso de que o esboço e a mensagem automática precisam de JS; esboço, campos e botões de copiar/WhatsApp ficam ocultos (sem controles quebrados). A página usa `html.js` para ativar o comportamento.
- **Movimento reduzido:** a animação do esboço não é definida (`animation-name: none`) e a rolagem suave fica desligada; há também um bloco `prefers-reduced-motion: reduce` que zera transições.
- **Toque:** botões de ajuda com 40 px de altura, cartões inteiros clicáveis, campos de 48 px.
- **Teclado:** ordem natural do documento; "Pular para o conteúdo"; foco visível em todos os controles; Esc fecha a ajuda.

## 8. Diferenças em relação à ORLA (mesmo nicho) e a modelos recentes

Teste de diferenciação, com base no código e nas capturas da ORLA publicada (lida em 11/11/2026) e nos arquivos locais:

| | ORLA (06) | **LASTRO (12)** |
|---|---|---|
| Organização | Ambiente → pedra → acabamento | **Peça → o que a pessoa já sabe** |
| Abertura | Foto em sangria com bloco de texto recortado no canto | **Foto ampla e, abaixo, faixa ultramarina com área própria de texto** |
| Cor | Areia, pedra quente, verde profundo, terracota em linhas | **Branco mineral, ultramarino, grafite; madeira só nas fotos** |
| Tipografia | Geologica (uma família, eixo de nitidez) | **Instrument Serif + Geist** |
| Peça central | Amostruário de pedras penduradas + ficha textura × aplicação | **Esboço SVG que muda com a peça, campos e resumo** |
| Fotos | 16 fotos (aplicações e texturas) | **3 fotos em composição editorial (capa, plano aberto, detalhe)** |
| Contato | Formulário em prancha com carimbo, prévia da mensagem | **Resumo + mensagem pronta; sem campos de contato; rota "Já tenho planta ou fotos"** |
| Elementos gráficos | Juntas, cotas finas, carimbo, hachura em toda a página | **Desenho técnico só dentro do configurador** |
| Seções | 4 blocos mais topo e rodapé | 4 seções |

Sem cores e fotos, a estrutura continua diferente: a ORLA parte de uma lista de ambientes e materiais; o LASTRO parte de um configurador que pede dados. A comparação com os demais modelos do catálogo foi feita só pelos `DESIGN_NOTES` da ORLA e pelo `README` do VÃO (11); não abri o código dos outros.

## 9. Recursos externos e licenças

- **Fotos:** Unsplash (seção 5), carregadas de `images.unsplash.com` até rodar o script de download.
- **Fontes:** Instrument Serif e Geist, SIL Open Font License 1.1, pelo Google Fonts. `css/fontes-locais.css` está pronto para os arquivos locais.
- **Script:** `tools/baixar-recursos.ps1` baixa as 9 fotos (WebP) e as 2 fontes. Só grava dentro da pasta e **não foi executado**.

## 10. Testes realizados (11/11/2026)

**Ambiente.** O terminal do ambiente não acessa a internet nem a sua máquina, então os testes foram dois:

- **Playwright (Python, Chrome 153), a partir de uma cópia local.** As fotos da Unsplash foram **substituídas por placeholders 3:2** e as fontes web não carregaram (caiu na serifa e na sans do sistema). Serve para estrutura, funcionalidade e overflow; **não** para avaliar fotografia nem a tipografia real. 93 verificações automatizadas.
- **Navegador integrado do Claude Desktop, pelo Live Server (`127.0.0.1:5500`), com fotos e fontes reais.** Inspeção visual da capa, do configurador e do bloco editorial; medições por JavaScript; console e rede.

**Larguras e breakpoint do configurador.** Playwright: 1440×900, 1024×768, **960×800 e 959×800** (os dois lados do breakpoint do configurador: 2 colunas em 960; 1 coluna em 959), 768×1024, 390×844 e 360×640. Navegador integrado (visual): 1440×900, 768×1024, 390×844, 360×640.

- **Overflow:** `scrollWidth` igual à largura em todas as larguras e nenhum elemento fora da tela, nos estados vazio e com a bancada em L preenchida com valores máximos e ajuda aberta.
- **Quatro peças:** o desenho correspondente aparece e é o único visível; sem peça, aparece o quadro neutro.
- **Bancada em L:** lados A e B identificados no desenho (selos e cotas "lado A"/"lado B") e nos campos ("junto à parede do fundo", "junto à parede lateral"); a cuba muda de posição.
- **Sem dados incompatíveis:** dados da reta não aparecem no resumo nem na mensagem da ilha ou do lavatório; ao voltar, são restaurados.
- **Campos vazios e vírgula decimal:** campos vazios geram "Ainda a definir na conversa"; `62,5`, `240,5` e `280cm` são aceitos; `2,8`, `abc` e valores fora da faixa mostram erro e ficam de fora.
- **Contato direto:** sem peça e sem medida, "Já tenho planta ou fotos" leva a `#pedido`, marca a caixa e a mensagem sai com essa informação.
- **Mensagem copiada:** o conteúdo da área de transferência é igual à mensagem exibida e o aviso "Mensagem copiada." aparece.
- **WhatsApp demonstrativo:** nenhum popup, nenhuma requisição para `wa.me`; aparece o aviso de que nada foi enviado. Modo real **simulado** (número de teste e `window.open` interceptado): URL `https://wa.me/5511900000000?text=…` com a mensagem; nenhuma conversa foi aberta.
- **Ajuda por teclado:** Shift+Tab chega ao botão; Enter e Espaço abrem; o foco permanece no botão; Esc fecha (inclusive com o foco em outro campo) e devolve o foco ao botão; só uma ajuda aberta; clique fora fecha.
- **Ajuda por toque** (Playwright com emulação de toque, 360×640): abre e fecha, painel a 4 px do botão e dentro de 20–340 px; alvo de 40 px.
- **Foco visível:** 14 Tab consecutivos, todos com contorno sólido de 3 px.
- **Sem JavaScript:** sem overflow; orientações das quatro peças legíveis; aviso e mensagem padrão visíveis; sem controles quebrados.
- **Movimento reduzido (emulado no Playwright):** `animation-name: none` e `scroll-behavior: auto` com `reduce`; com `no-preference`, `desenhar` e `smooth`.
- **Links:** todas as âncoras internas resolvem; os 3 links externos têm `rel="noopener"`. Imagens com `alt` e `width`/`height`.
- **Contraste:** calculado para todos os pares de cor usados (seção 2), todos aprovados.
- **Console e rede (navegador integrado):** só a mensagem do Live Server; recursos locais 200/304; as três fotos e as duas fontes carregaram.
- **Capa no celular:** a 390×844 e a 360×640, título, botão e rota ficam dentro da primeira tela; a ilha (tampo e frente) permanece no recorte.

## 11. Problemas encontrados e corrigidos

| Problema | Correção |
|---|---|
| Troca de peça não mostrava o esboço (o quadro neutro continuava) | O JS usava `.hidden` em SVG, que não existe; passou a usar `setAttribute('hidden')` |
| Título da capa em 3 linhas e botão fora da tela no desktop | `max-width` em `ch` forçava a quebra; trocado por `em`, e a altura da foto reduzida (`100svh − 25rem`) |
| Texto do quadro neutro maior que o quadro | Duas linhas (`tspan`) e fonte menor |
| Cota do lado A mostrava só "≈ 280 cm", sem dizer o lado | `cotaPrefixo`: "lado A ≈ 280 cm" |
| Primeira versão da auditoria falhou em 7 itens | Eram premissas erradas do **teste** (o Tab sai do campo para a ajuda seguinte; fotos `lazy` não carregam sem rolar). Refeitos e aprovados; o código não mudou |

## 12. Pendências

### Bloqueantes
- Nenhuma identificada para a demonstração.

### Recomendadas
1. **Fotos e fontes locais.** Rodar `tools/baixar-recursos.ps1`, ativar `useLocalImages` e trocar o link do Google Fonts por `css/fontes-locais.css`. Conferir na aba Rede.
2. **Repetir a auditoria Playwright com as fotos e as fontes reais** (a do Playwright usou placeholders e fontes de sistema).
3. **Capturas em resolução cheia:** as capturas de desktop vieram do painel do navegador integrado (cerca de 620 px de largura, com a página emulada a 1440 px) e ficaram reduzidas. As de celular estão em resolução próxima da real. Refazer a 1440 px numa janela comum, se precisar de material de divulgação.
4. Testar com a preferência real de movimento reduzido do sistema (a verificação foi por emulação).
5. Testar com leitor de tela (NVDA/TalkBack): descrição do esboço, ajuda aberta/fechada, mensagens de erro, aviso de cópia.
6. Testar em Safari/iOS e em celular real (toque, teclado virtual com `inputmode="decimal"`).
7. Os sites da Cosentino e da deVOL não foram abertos; se quiser, revisar a composição editorial contra eles.

### Publicação comercial
- [ ] `contact.whatsapp` real e `demo.enabled: false`; testar se abre o WhatsApp certo.
- [ ] Textos dos cartões (orientações de cada peça), campos de `pecas` e lista "O que você pode enviar" revisados com o cliente (por exemplo, outras peças como soleiras e escadas exigem novo esboço).
- [ ] Trocar as fotos por obras reais do cliente (com autorização) e só então retirar "Imagem ilustrativa" e as notas; atualizar ou remover os créditos.
- [ ] Remover o `noindex`; revisar `<title>`, `description` e `og:image` (foto real, 1200×630, URL absoluta do domínio).
- [ ] Favicon e símbolo com a marca do cliente.
- [ ] Endereço, horários e região de atendimento reais (esta página não os traz de propósito; incluir se o cliente quiser).
- [ ] Repetir a auditoria (360–1440, teclado, console) depois de trocar o conteúdo.
