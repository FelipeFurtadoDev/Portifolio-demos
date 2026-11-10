# NEXO / Estúdio Facial: notas de design e decisões técnicas

Modelo 07 do catálogo. É o segundo modelo de estética facial, criado como alternativa estrutural ao NÁRIA (01).
Assinatura: "Sua pele. Seu tempo. Seu cuidado."

- **v1:** 10/11/2026 (manhã).
- **v2:** 10/11/2026 (tarde). Revisão de direção de arte, fotografia, arquitetura e Atlas, orientada pelo briefing original.

Skill Frontend Design da Anthropic: carregada e aplicada nas duas versões.

---

## 1. Briefing original × primeira implementação

O conceito original era "Precisão gráfica / estúdio contemporâneo / cuidado facial": design suíço, fotografia de pele real e uma experiência objetiva e acolhedora. A v1 cumpriu a "precisão", mas perdeu a "sensibilidade".

| Aspecto | Planejado | Entregue na v1 | Decisão na v2 |
|---|---|---|---|
| Identidade | Precisão + sensibilidade humana | Só precisão: bordas de 3 px, cantos retos em tudo, peso 800 com espaçamento apertado | **Refinar** |
| Paleta | Porcelana, petróleo, lima e lavanda, com intensidades diferentes | O lima e o petróleo dominaram, e o lavanda ficou sem função. Ar técnico, e o lima brigava com os tons de pele | **Reconstruir** |
| Capa | Pôster com fotografia protagonista | A hierarquia tipográfica era boa. As 5 faixas cortavam o olho, a faixa do título tapava o rosto e cada largura exigia ajuste de enquadramento | Tipografia **preservada**; foto **reconstruída** |
| Fotografia | Pele real, gestos, texturas e ambiente | Três boas (capa, creme, argila). Quatro desconectadas: rosto posando, mão no pescoço, textura abstrata e cadeira de palhinha. Nenhuma foto do trabalho | **Refinar** (3 mantidas, 6 novas) |
| Atlas | Exploração visual dos cuidados | Conceito bom. Implementação instável (seção 7) | Conceito **preservado**; componente **reconstruído** |
| Profundidade comercial | Apresentar o estúdio | Só os procedimentos | **Reconstruir** (4 momentos) |
| Contato | WhatsApp direto, sem formulário | Funcionava bem | **Preservado** |
| Diferença do NÁRIA | Alternativa vendável | Diferente, mas por um extremo pouco acolhedor | **Refinar** |

## 2. Elementos preservados

- Nome, assinatura, posicionamento e todos os textos responsáveis dos cuidados.
- Título da capa em três linhas, com a mesma família tipográfica (Funnel Display/Sans + Geist Mono).
- Os 5 cuidados: todos continuam coerentes com estética não invasiva.
- Códigos N.01–N.05, legendas e rótulos em mono: a "precisão" do NEXO.
- Contato:
  - link direto com mensagem curta por cuidado;
  - aviso não modal no modo demonstração;
  - nenhum dado pedido antes da conversa.
- `js/config.js` como fonte única, modo demonstração, `useLocalImages` com retorno automático, script de download e caminhos relativos (GitHub Pages).
- Semântica, menu móvel acessível e `noindex`.
- 3 fotos: retrato da capa, creme na bochecha e máscara de argila.

## 3. Elementos refinados

- **Tipografia:**
  - títulos passaram de 800 para 600, com espaçamento −0,03 em vez de −0,045;
  - texto em 1,6 de entrelinha;
  - `text-wrap: balance` nos títulos.
- **Divisórias:** de 3 px chapadas para 1 px em ardósia translúcida.
- **Botões:** pílula coral com texto ardósia profunda, em vez de retângulo lima com borda.
- **Superfícies:** marfim (capa e atlas), verde-água (abordagem) e ardósia (contato). O ritmo claro → suave → claro → escuro substitui porcelana → petróleo → lima.
- **Aviso de demonstração:** cartão branco com borda coral e cantos suaves.
- **Favicon:** "N" em contorno ardósia sobre quadrado coral arredondado. `theme-color` passou a marfim.

## 4. Elementos reconstruídos

- **Capa:**
  - uma única fotografia, inteira, com um canto em quarto de círculo e marcas de corte de gráfica;
  - a ficha "Onde/Quando" em verde-água, encaixada sobre o canto inferior da foto, atravessa da coluna da imagem para a coluna do texto.
- **Momento B, nova seção:** "A experiência do cuidado".
- **Atlas:** novo componente (seção 7).
- **Estúdio e contato:** foto da sala de atendimento, título "Um estúdio pequeno, com hora marcada.", texto do ambiente, botão do WhatsApp e dados. Saiu o bloco lima com o título-botão.

## 5. Paleta: justificativa

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| Marfim | `#F8F6F1` | Base, capa, atlas | — |
| Ardósia | `#314653` | Texto, seção de contato, faixa de demonstração | 9,1:1 sobre marfim |
| Ardósia profunda | `#22323C` | **Criada.** Rodapé, texto sobre coral | 4,6:1 sobre coral |
| Ardósia suave | `#56656F` | **Criada.** Texto secundário | 5,4:1 sobre marfim |
| Coral | `#E9876D` | Botões, marcadores, barra da aba ativa | Só como fundo ou forma (3,4:1 com ardósia, insuficiente para texto pequeno) |
| Coral escuro | `#B04E37` | **Criado.** Códigos N.0x sobre marfim | 4,9:1 |
| Verde-água | `#D8EBE6` | Seção da abordagem, ficha da capa, mensagem do aviso | Ardósia sobre ele: 7,9:1 |
| Areia | `#D8C8B8` | Fundo das fotos enquanto carregam; marcas de corte sobre ardósia | — |
| Texto claro 2 | `#C9D3D6` | **Criado.** Texto secundário sobre ardósia | 6,4:1 |

**Por que essa paleta funciona com as fotos:**
- as fotos novas têm pele quente, toalha coral (renovação), fundo verde-azulado (massagem), argila verde e manta azul-ardósia (estúdio);
- o coral e a ardósia saem das próprias imagens, e o verde-água conversa com a argila;
- assim a página parece uma direção fotográfica, não uma paleta aplicada por cima.

**Risco evitado:** marfim + coral é uma combinação muito comum ("creme + terracota"). Por isso:
- a cor estrutural é a ardósia (azul frio, não marrom);
- o coral aparece só em botões, marcadores e barras;
- não há serifa.

O resultado não fica bege nem apagado: o contraste vem da ardósia.

## 6. Estratégia fotográfica

Três categorias, como pedido.

**A. Retrato protagonista**
- **Capa (mantida):** rosto com uma faixa de luz do sol, textura de pele preservada e enquadramento próximo. Kamila Maciejewska, `b2bXKspL5MY`.
- **Por que as 5 faixas saíram:** o recurso chamava atenção para si mesmo, não para a foto. Cortava o olho, exigia `object-position` diferente por largura de tela e só funcionava com animação.
- Inteira, a foto já tem a "faixa" de luz natural. O elemento de precisão passou para as marcas de corte em volta dela.

**B. O cuidado em prática**

| Uso | Foto | Situação |
|---|---|---|
| Abordagem | Esteticista com as mãos no rosto da cliente, prateleiras ao fundo (kimia kazemi, `u93nTfWqR9w`) | **Nova** |
| Abordagem, detalhe | Conta-gotas sobre frasco âmbar, sombras de janela (Mona Jain, `j24HPh0Q84g`) | **Nova** |
| N.01 Limpeza | Algodão na higienização, mãos com luvas (Studio Michael França, `aZliw_XDfUU`) | **Nova**. Substitui o rosto posando |
| N.02 Hidratação | Creme na bochecha (Leighann Blackwood, `NdcuSGxKbwE`) | Mantida |
| N.03 Argila | Meio rosto com argila verde (@maxbvp, `0RxbUktnZug`) | Mantida |
| N.04 Massagem | Mãos massageando o rosto, sol lateral (Rosalie Gdy, `B4Y17X3uY7I`) | **Nova**. Substitui a mão com anel no pescoço |
| N.05 Renovação | Gel espalhado no rosto, toalha coral (Abiwin Krisna, `LcX6tUGKPuI`) | **Nova**. Substitui a textura abstrata de creme |

**C. Ambiente**
- **Estúdio:** sala de atendimento com maca, manta ardósia, luz quente e quadro em traço (visualsofdana, `IfsRTQu6Djk`). **Nova**, substitui a cadeira de palhinha.
- O quadro na parede é um desenho de figura sentada. Avaliei como neutro; se o cliente preferir, troque por uma foto do próprio estúdio.

**Critérios aplicados:**
- **Licença:** todas verificadas na página da Unsplash ("Fotografia grátis", Licença Unsplash, sem selo Unsplash+).
- **Repetição:** nenhuma repete o NÁRIA. Evitei também duas fotos da mesma sessão de fotos usada no NÁRIA.
- **Marca:** descartei um conta-gotas de uma marca de extratos de cannabis.
- **Clínico:** descartei imagens com ferramentas metálicas ou toucas.
- **Diversidade de enquadramento:** retrato próximo, plano médio de atendimento, detalhe de produto, gestos em close e ambiente.
- **Proporções variadas:** 4:3 e 2:1 (capa no celular/tablet), 4:5, 3:4 e 16:10.
- **Recortes:** cada foto grande tem **um único canto arredondado**, em posição diferente por momento:
  - capa: superior esquerdo;
  - abordagem: superior direito;
  - atlas: superior esquerdo pequeno;
  - estúdio: inferior direito;
  - detalhe de produto: inferior esquerdo.
- Nenhum filtro ou sobreposição.
- Todas são identificadas como ilustrativas (legendas e rodapé). A do estúdio diz "não retrata o estúdio".

## 7. Atlas de cuidados: solução técnica

### Causa da distorção na v1 (investigada no CSS e no JS)
1. **View Transition rasteriza:** o navegador tira uma imagem de cada faixa antes e depois da troca e anima essas imagens entre os dois tamanhos.
   - As imagens usam `object-fit: fill` por padrão (o CSS da v1 não mudava isso), então a proporção muda durante a animação.
   - Resultado: texto e foto **esticados e borrados**.
2. **Mudança de orientação:** o nome passava de vertical (`writing-mode`) para horizontal, e vice-versa. As duas imagens não têm relação geométrica, então a transição só podia misturá-las.
3. **Muitas mudanças ao mesmo tempo:**
   - largura (`flex`);
   - estrutura da grade;
   - container query (que trocava o layout no meio do caminho);
   - painéis com `hidden`.
4. **Fotos sob demanda:** a foto do painel aberto só começava a carregar depois. Caixa vazia, depois salto.
5. **Cliques rápidos:** um novo `startViewTransition` interrompe o anterior de forma brusca.

Diminuir os 450 ms não resolveria nenhum desses pontos.

### Nova solução: índice tipográfico + painel estável (padrão "Tabs" da W3C APG)
- **Desktop (900 px ou mais):**
  - à esquerda (5 colunas), o índice com código, nome, duração e uma frase curta. Nada de informação básica escondida;
  - à direita (7 colunas), o painel com foto, nome, resumo, o que inclui, "Bom saber" e botão de conversa.
- **Celular e tablet:** faixa de abas em pílula com rolagem lateral (a página não rola para o lado), e o painel logo abaixo. A aba ativa rola para a vista sozinha.
- **Altura estável:** todos os painéis ocupam **a mesma célula da grade** (`grid-area: 1 / 1`). A altura do componente é sempre a do painel mais alto: trocar de cuidado **não muda o tamanho de nada nem move a página**.
- **Troca:**
  - o painel anterior some na hora (`visibility: hidden`);
  - o novo aparece com **apenas opacidade**, de 0,4 a 1 em 180 ms;
  - nunca há dois textos sobrepostos nem quadro vazio;
  - sem escala, sem transformação, sem View Transition.
- **Cliques rápidos:** cada clique só troca a classe. Não há fila de animações nem bloqueio.
- **Fotos:** um `IntersectionObserver` passa todas as fotos dos painéis para carregamento imediato quando o atlas está a 600 px da tela. A primeira troca já encontra a foto pronta.
- **Container query:** só no layout interno do painel (foto ao lado do texto a partir de 600 px de painel). Ela não muda durante a troca, porque a largura do painel é fixa.
- **Acessibilidade:**
  - `role="tablist"`, `tab` e `tabpanel`;
  - `aria-selected` e `aria-controls`;
  - `aria-orientation`: vertical no desktop, horizontal no celular;
  - foco itinerante (roving tabindex);
  - Setas, Home e End;
  - Tab entra no painel e depois no botão;
  - painéis inativos ficam fora da leitura e do Tab.
- **Movimento reduzido:** sem fade, troca instantânea.
- **Sem JavaScript:** o HTML estático mostra o índice como lista de âncoras (fixa ao rolar, no desktop) e os 5 cuidados abertos em sequência.

## 8. Arquitetura final

| Momento | Superfície | Conteúdo |
|---|---|---|
| Topo fixo | Marfim | Marca, Abordagem / Cuidados / Estúdio e contato, botão "Conversar" |
| **A. Capa** | Marfim | Segmento, título em 3 linhas, texto, botão do WhatsApp, "Ver os cuidados", retrato com marcas de corte, ficha Onde/Quando |
| **B. A experiência do cuidado** | Verde-água | "Antes do produto, a conversa." Intro e três parágrafos com frase de abertura (ouvir, escolher com calma, horário só seu), sem numeração e sem cartões. Foto de atendimento + detalhe de produto atravessando a borda |
| **C. Atlas de cuidados** | Marfim | Índice + painel. Ajuda "Não sabe qual escolher?" com link de conversa e nota de responsabilidade |
| **D. Estúdio e contato** | Ardósia | Foto da sala com marcas de corte, texto do ambiente, botão principal, nota "abre o WhatsApp…", endereço, horários, WhatsApp e Instagram |
| Rodapé | Ardósia profunda | Aviso de marca fictícia, créditos e "Voltar ao início" |

- **Ficaram de fora:** FAQ, depoimentos, "como funciona" numerado, formulário, simulador, reserva e CTA final separado.
- **Altura da página:** 1440 px ≈ 4 700 px de altura (v1 ≈ 3 200). O aumento é o momento B, que acrescenta informação nova, e não enchimento.
- **Conteúdo novo no config:**
  - `texts.approach*` e `approach[]`;
  - `texts.studio*`;
  - `tagline` em cada cuidado;
  - imagens `abordagem` e `produto`.
- O `index.html` foi gerado a partir do próprio config, para a cópia estática ficar idêntica.

## 9. Diferenciação em relação ao NÁRIA

| | NÁRIA | NEXO v2 |
|---|---|---|
| Tom | Editorial sensorial, delicado | Contemporâneo, gráfico, acolhedor |
| Tipografia | Bodoni (serifa) + Hanken | Funnel Display/Sans (sem serifa) + Geist Mono |
| Cor | Ameixa, rosé, argila sobre marfim | Ardósia estrutural, verde-água e coral pontual |
| Composição | Revista: seções em fluxo | Grade de 12 colunas, marcas de corte, um canto recortado por foto, elementos que atravessam colunas |
| Fotografia | Atmosfera, luz difusa | Gestos de cuidado, pele em close, luz lateral |
| Serviços | Abas em sumário | Atlas: índice tipográfico sempre visível + painel |
| Seções | 7 | 4 |
| Conversão | Formulário → mensagem → WhatsApp | Link direto, sem dados |

## 10. Testes realizados (v2, 10/11/2026, Live Server, navegador integrado)

| Teste | Resultado |
|---|---|
| Rolagem horizontal: 360, 390, 600, 768, 900, 1024, 1100, 1280 e 1440 px | `scrollWidth` ≤ largura em todas. Varredura de elementos além da borda: nenhum (a faixa de abas rola internamente, por design) |
| Título × foto (desktop) | O título termina antes da foto em 900 (424 < 523), 1024 (449 < 594), 1100 (482 < 638) e 1440. A ficha não encosta no texto |
| Alturas reduzidas | 1440×680 e 1280×620: botão da capa dentro da 1ª tela (601 de 680; 554 de 620) |
| Botão da capa na 1ª tela | 1440, 1100, 1024 e 900: sim. 390×844: sim (829). 360×740: termina em 789, 49 px abaixo da dobra; o "Conversar" do topo fixo fica visível. 600×900: sim (854). 768×1024: sim (982), depois de passar a foto da capa para 2:1 no tablet |
| Atlas: abrir e trocar com clique (1440, 900, 1024, 768, 360) | Funcionando |
| Atlas: alternância rápida, 11 trocas a cada 40–60 ms | Em todos os instantes: **1 painel visível**, altura constante (603 px em 1440), rolagem da página inalterada (0 px), foto sem `transform` |
| Atlas: captura no meio da troca | Painel novo a 40% de opacidade, texto nítido, sem sobreposição e sem deformação. Captura final nítida |
| Atlas: só teclado | Tab → aba ativa; ↓↓ → argila; End → renovação; Home + ↑ → renovação (volta ao fim); Tab → painel; Tab → botão; Enter → aviso de demonstração com a mensagem do cuidado |
| Atlas em tela pequena | 360 e 390: faixa de abas, a aba ativa rola para a vista, página não se move |
| Fotos dos painéis | As 5 carregadas antes da primeira troca (IntersectionObserver) |
| Movimento reduzido (simulação) | Regras `no-preference` desligadas e `reduce` forçadas: sem animação na capa e no atlas, `scroll-behavior: auto` |
| Sem JavaScript (simulação) | Página recarregada sem `<script>`: 5 cuidados visíveis em sequência, 5 âncoras no índice, sem rolagem horizontal |
| Menu móvel (390) | Abre, fecha com Esc e devolve o foco, fecha ao escolher um link. A âncora para abaixo do topo fixo |
| Botões de contato (demonstração) | Aviso com a mensagem certa; a URL não muda; nada é aberto |
| Console | Nenhum erro |
| Fontes e fotos | Google Fonts e Unsplash respondendo. Todas as fotos carregadas nas larguras testadas |

### Limitações dos testes
- **Painel do navegador oculto:** durante parte da sessão, o painel do navegador integrado esteve oculto, e o navegador reduz a taxa de quadros de páginas em segundo plano.
  - Por isso a revelação da capa e o fade do atlas apareceram "congelados" em algumas capturas.
  - O comportamento foi confirmado medindo o estado (opacidade, visibilidade, altura, rolagem), além das capturas.
  - Recomendo ver a troca do atlas e a abertura da capa com o painel visível ou no Chrome.
- **Não testado:**
  - movimento reduzido real do sistema operacional;
  - Safari e Firefox;
  - modo de imagens locais e o script PowerShell;
  - WhatsApp com número real.

### Correções feitas durante a auditoria da v2
1. A foto da capa impunha a própria altura à grade (capa mais alta que a tela): passou a preencher a coluna em posição absoluta.
2. A revelação com `clip-path … round` terminava sem pintar a foto em uma das capturas: troquei por `clip-path` simples com preenchimento `backwards`. O clip só existe durante a animação, e o canto arredondado vem do `border-radius`.
3. As marcas de corte do estúdio contornavam também a legenda: foto e marcas agora ficam dentro de uma `.moldura`.
4. No celular, a ficha cobria o crédito e empurrava o botão para baixo: a ficha vai para depois do botão, e a foto fica mais baixa em telas baixas (16:10) e no tablet (2:1).
5. O fade do atlas começava em opacidade 0 (quadro vazio): agora começa em 0,4.
6. Índice apertado entre 900 e 1199 px: nomes menores e foto do painel em 16:10 quando o painel é estreito.

## 11. Pendências

### Bloqueantes
Nenhuma para a demonstração.

### Recomendadas
- Ver a troca do atlas e a abertura da capa com o painel do navegador visível (ou no Chrome) e confirmar a fluidez a olho.
- Rodar `tools/baixar-recursos.ps1` (9 fotos e 3 fontes), ativar `useLocalImages` e trocar o `srcset` e o preload da capa e o link das fontes.
- Testar no Safari/iOS (container queries, `text-wrap: balance`).
- Testar com "Efeitos de animação" desligado no Windows.
- Ao personalizar: editar `js/config.js` e a cópia estática do HTML (atlas, abordagem, textos).

### Publicação comercial
- Validar com a profissional os cuidados, as etapas e as durações, e a frase "toalhas trocadas a cada atendimento" (é um compromisso do estúdio real).
- Número de WhatsApp real e `demo.enabled: false`. Testar se abre a conversa certa.
- Endereço, horários e Instagram reais.
- Fotos próprias, com autorização das pessoas. Remover as legendas "ilustrativa" quando forem reais.
- Remover o `noindex` e revisar título, descrição e `og:image`.
- Fontes locais ou aviso de privacidade (Google Fonts).
- Catálogo: `modelo.json` atualizado (cores da v2, ordem 70). A publicação aguarda aprovação.
