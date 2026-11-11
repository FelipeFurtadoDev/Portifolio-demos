# AVELA / Atelier de Confeitaria: notas de design e decisões técnicas

Modelo 08 do catálogo. É a segunda proposta comercial do nicho de confeitaria, criada como alternativa estrutural à FORMA DOCE (02).
Assinatura: "Doces feitos para marcar momentos."
Data: 11/11/2026.

Skill Frontend Design da Anthropic: carregada e aplicada.

Documentos consultados:
- `docs/01_NEGOCIO_E_PUBLICO.md`;
- `docs/02_NICHOS_E_OBJETIVOS.md`;
- `docs/acervo_design_landing_pages.md`;
- `docs/guia_componentes_diferenciacao.md`;
- os DESIGN_NOTES de 01 a 07.

O briefing recebido terminava cortado no item 13 ("Teste também alturas…"). Por isso, a revisão seguiu o protocolo das instruções permanentes, acrescido de viewports baixas.

---

## 1. Identidade e conceito

**Editorial gastronômico / atelier sensorial.** A ideia que organiza tudo é **o corte**: a confeitaria mostra o que tem por dentro. A página é quase toda fotografia de perto (camadas, brilho de glaçagem, migalhas, frutas). A tipografia funciona como a de um cardápio impresso em escala de cartaz.

- FORMA DOCE vende **a festa**. AVELA vende **a peça**.
- O nome lembra "avelã", e a foto de abertura é um bolo mousse de chocolate com base de avelãs.
- A ousadia ficou concentrada em dois pontos:
  - o logotipo `avela`, em caixa baixa e tamanho de cartaz, atravessando a borda da fotografia;
  - a carta interativa.
- O resto é disciplinado: alinhamento à esquerda, uma única família serifada, pouco ornamento e um único gesto gráfico (o fio de calda).

## 2. Paleta e tipografia

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| Cacau | `#241A17` | Abertura, topo, rodapé, texto sobre claro | Creme sobre cacau: 14,1:1 |
| Creme | `#F3E9D7` | Fundo da carta, texto sobre escuro | — |
| Papel | `#FBF6EC` | **Criado.** Bilhete da consulta | Cacau sobre papel: 15,8:1 |
| Oliva funda | `#3E4A37` | **Criado.** Fundo do ateliê. Cor estrutural, para a página não ficar só bege e marrom | Creme sobre ela: 7,8:1 |
| Oliva | `#748369` | Referência do briefing. Não usada em texto (creme sobre ela dá 3,4:1) | — |
| Mel | `#E8B854` | Fio de calda na abertura, botão principal sobre cacau, foco sobre escuro | Cacau sobre mel: 9,2:1 |
| Terracota | `#CA693D` | Só como forma: marcador da coleção ativa e marcadores de lista | 3,1:1 sobre creme (insuficiente para texto) |
| Terracota funda | `#9E4A24` | **Criada.** Links e foco sobre creme e papel | 5,0:1 sobre creme |
| Tinta suave | `#6E5D53` | **Criada.** Texto secundário e abas inativas sobre creme | 5,2:1 |
| Creme suave | `#D9CDB8` | **Criado.** Texto secundário sobre cacau e oliva | 10,8:1 sobre cacau; 6,0:1 sobre oliva funda |

Por que não fica "creme + serifa + terracota" (o clichê do segmento):
- a estrutura é cacau e oliva funda, cores escuras e frias o bastante;
- o creme aparece numa única seção, a carta;
- a terracota nunca é fundo nem texto;
- a cor forte vem das fotos (framboesa, pistache, caramelo, ganache).

**Tipografia:**
- **Gloock** (serifa de alto contraste, com terminais em gota, como pingo de calda): logotipo, títulos, nomes das coleções e das peças.
- **Commissioner** (sans variável, 300–700): textos, rótulos, botões e formulário.
- Logotipo em caixa baixa, com espaçamento −0,045em.
- Sem rótulos em caixa alta, sem palavra destacada nos títulos, sem fonte monoespaçada e sem setas nos botões.
- Nenhuma dessas fontes foi usada nos modelos anteriores (ver seção 7).

## 3. Arquitetura

Três momentos, em vez de capa → serviços → galeria → formulário → CTA:

1. **Aviso de demonstração** (faixa fina). Some com `demo.enabled: false`.
2. **Topo fixo** em cacau, com o logotipo pequeno e "atelier de confeitaria", "A carta", "O ateliê" e "Consultar encomenda". No celular ficam o logotipo, "A carta" e "Consultar", sem menu hambúrguer: só há três destinos.
3. **A · Abertura**
   - **Desktop (900 px ou mais):** a foto sangra para a direita e para o topo, ocupando 60–68% da largura, com proporção próxima à original (a fatia aparece inteira). O logotipo nasce na faixa de cacau à esquerda e avança sobre a foto. Logo abaixo ficam a assinatura, o texto, "Ver a carta", "Consultar encomenda" e uma linha sobre o local.
   - **Celular:** a foto ocupa a largura toda, e o logotipo atravessa a borda inferior dela, metade sobre a foto e metade sobre o cacau.
   - Nos dois casos a transição para o cacau fica só na área desfocada da foto (à esquerda no desktop, na base no celular), nunca sobre o bolo.
4. **B · A carta** (creme). Título "A carta" e a intro. Em seguida, o lookbook: trilho de coleções, palco fotográfico estável e ficha da peça.
5. **C · O ateliê** (oliva funda):
   - título "Cada peça termina na mão de quem confeita.";
   - foto do gesto (ganache), com a foto de detalhe (trufas) sobreposta;
   - texto curto e informações práticas;
   - o **bilhete da consulta**.

   Contato e informações institucionais estão na mesma composição. Não há seção de depoimentos, nem "como funciona" em etapas, nem CTA final redundante.
6. **Rodapé** (cacau): logotipo grande, aviso de marca fictícia e créditos gerados pelo config.

## 4. Estratégia fotográfica

Todas as fotos são da Unsplash, sob a Licença Unsplash. Foram verificadas uma a uma: são fotos gratuitas, sem selo Unsplash+, e o id começa com `photo-`, não com `premium_photo-`. A seleção foi visual, feita no navegador integrado a partir de contact sheets de cerca de 590 resultados.

As três imagens enviadas pelo cliente serviram só como **direção** (entremet espelhado com corte, mãos regando calda numa grade, mil-folhas com framboesa e pistache). Não foram usadas: uma tem marca d'água ("MENU by Marge+") e outra aparenta ser gerada por IA.

**A, protagonista**
- Bolo mousse de chocolate com base de avelãs: fatia alta, corte à mostra, luz lateral quente e disco dourado. Autor: Gabriel Miklós, `7FfW0pIoFJk`.

**B, coleções da carta** (3 peças por coleção, com luz, fundo e enquadramento variados)

| Coleção | Peça | Autor / id |
|---|---|---|
| Bolos autorais | Pistache e baunilha: close lateral, verde sobre rosa | Maria Klichik, `WbN4gDEp3Zo` |
| | Red velvet: macro das camadas | An Shved, `fS-ntep5yhI` |
| | Chocolate e framboesa: fundo branco, arejado | Uliana Kopanytsia, `ySxSlqeC0YM` |
| Tortas | Chocolate, figo e pistache: vista de cima, fundo azul | Ruth Georgiev, `dvmiNXMh9d8` |
| | Frutas vermelhas: brilho, retrato | Diana Díaz, `sE8YNvc-xlU` |
| | Noz-pecã e caramelo: close quente | Diego Arenas de Rodrigo, `-0l6Xx2rck8` |
| Sobremesas | Entremet de framboesa: glaçagem espelhada vermelha | Bohdan Stocek, `YBYN5X26duQ` |
| | Tortinha de pistache: cortada, mostra a camada de framboesa | Serghey Savchuk, `XcuJRPEgn1Q` |
| | Fatia de caramelo: ardósia escura | Aliona Gumeniuk, `GAauSStia3s` |
| Presentes doces | Caixa de bombons: azul-petróleo sobre claro | Jennifer Pallian, `dcPNZeSY3yk` |
| | Macarons em caixa: fundo escuro | Haberdoedas, `-IAZcga6uNk` |
| | Trufas em caixinha kraft | Cohen Berg, `JRa_7eKqSQU` |

**C, processo**
- Mãos espalhando ganache sobre bolo em base giratória: MRC Témiscamingue, `mgxL_RIUKsM`.
- Mão colocando trufa listrada sobre travessa de madeira: Kyaw Tun, `ssG41C6mwrQ`.

**Critérios:**
- **Repetição:** nenhuma foto, nem sessão de foto, se repete com a FORMA DOCE. Descartei duas candidatas por esse motivo: Mick Haupt (`itp4KJAjdvg`), da mesma sessão da foto de processo da FORMA DOCE, e Ciocan Ciprian (`SNnVxx7pGDE`), mesmo autor e sessão das caixinhas. Também descartei brigadeiros, que a FORMA DOCE já usa.
- **Marca:** descartei uma caixa de marzipã com marca comercial visível.
- **Sem filtros:** nenhum escurecimento geral. O único gradiente fica na área desfocada da abertura, para o logotipo ter contraste.
- **Identificação:** toda foto leva o selo "Foto ilustrativa". O rodapé diz que as fotos não retratam produtos da AVELA, e as descrições das peças descrevem o que se vê na foto, sem alegar receita ou ingrediente exclusivo.
- **Recortes:** são todos feitos por CSS, com ponto focal configurável por foto (`pos` e `posMobile`). O palco é quadrado no celular, 5:4 no tablet e 5:4,4 ou 5:4 no desktop.

## 5. Componentes escolhidos

```text
Componentes escolhidos: ID 04 (protagonista), ID 15 (apoio)

Objetivos de cada componente:
- 04 Lookbook interativo ("A carta"): o visitante vindo do Maps decide pela aparência.
  Ele percorre 4 coleções e 12 peças sem sair do lugar e consulta a peça que viu,
  sem formulário.
- 15 SVG animado autoral ("fio de calda"): uma linha contínua com laçadas, como o fio
  de chocolate que sai do cone de papel. Dá identidade e liga visualmente a abertura
  à carta.

Como influenciaram a arquitetura:
- O 04 substituiu três seções do padrão (serviços, galeria e cardápio). A carta é,
  ao mesmo tempo, vitrine e ponto de partida da conversa: a peça escolhida vai para
  o bilhete da consulta.
- O 15 aparece só em dois pontos: desenha-se uma vez sobre o logotipo, na abertura,
  e reaparece curto sob a coleção ativa, como marcador da aba. Também é o favicon.

Componentes já usados nos modelos comparados:
- FORMA DOCE: 08 (filtro por ocasião) e 17 (microinterações).
- TRAÇO: 04 (lookbook em pranchas numa grade de 12 colunas) e 12.
- NEXO: 09 (índice vertical + painel estável) e 05.
- VÉRTICE: 01 e 14. BOLHA & BENTO: 02. ORLA: 06 e 03.

O que foi deliberadamente evitado:
- Arco, selo giratório, adesivos-filtro, comanda com canhoto, sombras deslocadas,
  borda rendada e Shrikhand (lista de "evitar" da FORMA DOCE).
- Pranchas numeradas em grade (TRAÇO) e índice vertical com painel à direita (NEXO).
  A carta usa trilho horizontal sobre um palco único, com dois níveis
  (coleção → peça).
- View Transitions, GSAP, animação de dimensões e scale em fotos.

Alternativas responsivas / reduzido movimento / sem JS:
- Trilho em 2×2 abaixo de 900 px e em linha a partir daí. Miniaturas em 3 colunas
  em qualquer largura.
- prefers-reduced-motion: o fio já aparece desenhado; troca de foto e de texto sem
  transição; rolagem sem suavização.
- Sem JS: as 4 coleções aparecem empilhadas (foto, descrição e peças), e os botões
  da consulta são ocultados. O texto continua selecionável.

Pendências e testes observados: ver seções 9 a 11.
```

## 6. Funcionalidades

**Carta (padrão Tabs da W3C APG)**
- Abas `role="tab"` com `aria-selected`, tabindex móvel, setas, Home e End. A ativação é automática, porque a troca é leve. O painel único é atualizado e aponta para a aba ativa com `aria-labelledby`.
- As peças são botões com `aria-pressed`, num grupo rotulado com o nome da coleção.
- **Troca de foto estável:**
  - duas camadas `<img>` sobrepostas;
  - a nova foto é **decodificada antes** (`decode()`) e só então troca, em crossfade só de opacidade (0,38 s);
  - um token descarta escolhas antigas, então em cliques rápidos só a última vale;
  - a proporção do palco é fixa, sem salto de layout;
  - o `alt` fica só na camada visível.
- Pré-carregamento:
  - ao apontar ou focar uma aba ou miniatura;
  - depois do `load`, em momento ocioso, pré-carrega a foto principal de cada coleção.
- O texto da ficha troca com um fade curto. O layout não muda entre coleções.
- "Consultar esta peça" leva ao bilhete, com foco programático (`tabindex="-1"`), e já monta a mensagem.

**Consulta**
- O bilhete mostra a peça escolhida ("Você está consultando Frutas vermelhas, da coleção Tortas") e um link "Trocar na carta".
- Há um único campo opcional, "Para quando, mais ou menos?".
- A mensagem é editável:
  - se a pessoa editar e depois trocar de peça, o texto dela não é sobrescrito;
  - aparece "Usar a mensagem sugerida".
- **Modo demonstrativo**, ou número ausente ou inválido:
  - o botão principal é "Copiar mensagem";
  - nada é enviado;
  - aparece um aviso não modal;
  - se a área de transferência falhar, o texto fica selecionado para cópia manual.
- **Modo real** (`demo.enabled: false` e WhatsApp com 55 + DDD + número):
  - "Abrir conversa no WhatsApp" abre `wa.me` com a mensagem;
  - "Copiar mensagem" continua disponível;
  - se o navegador bloquear a nova aba, a mensagem avisa.
- A mensagem termina com "Sei que sabor, tamanho, valor e prazo são combinados na conversa", sem confirmar preço, prazo ou disponibilidade.

**Configuração central (`js/config.js`):** marca, demonstração, contato, informações práticas, local, texto da mensagem, imagens (CDN ou locais, com retorno automático), coleções, peças, conversa por coleção e fotos do ateliê. Os créditos do rodapé são gerados dele.

## 7. Diferenças em relação aos modelos anteriores

| | FORMA DOCE (02) | AVELA (08) |
|---|---|---|
| Personalidade | Pop artesanal, festa | Editorial gastronômico, desejo, acabamento |
| Seções | 10 blocos | 3 momentos (abertura, carta, ateliê) |
| Abertura | Simétrica: título dividido em volta de um arco | Foto sangrada e logotipo gigante atravessando a borda da foto |
| Fotografia | Saturada, em arco, círculo e pílula | Macro e corte, sem molduras com formato, em palco único |
| Produtos | Adesivos-filtro + cardápio em faixas | Carta: trilho + palco + ficha, dois níveis |
| Conversão | Comanda com 6 campos e prévia | Bilhete com 1 campo opcional e mensagem editável vinda da peça vista |
| Tipografia | Shrikhand + Bricolage | Gloock + Commissioner |
| Cor | Cereja, amora, morango em campos alternados | Cacau, creme e oliva funda; mel e terracota só no traço |
| Ornamento | Rendado, selo, granulado, sombras | Um único fio de calda |

Em relação aos demais modelos:
- **NÁRIA:** sem abas com painel e sem Bodoni.
- **TRAÇO:** lookbook horizontal com palco, não pranchas em grade; serifa, não Archivo expandida.
- **VÉRTICE:** sem fotografia industrial e sem tipografia condensada.
- **BOLHA & BENTO:** sem Fraunces nem recortes orgânicos.
- **ORLA:** sem amostruário nem hotspots.
- **NEXO:** sem índice vertical; serifa, não Funnel + mono.

**Teste de diferenciação** (repetido sobre os screenshots finais): sem cores e fotos, a estrutura continua sendo:
- uma tela com logotipo atravessando a foto;
- um palco largo com trilho horizontal acima;
- uma colagem de duas fotos com o bilhete ao lado.

Nenhuma dessas geometrias existe nos outros sete modelos.

## 8. Decisões técnicas

- HTML, CSS e JS puros. Dependências externas: CDN da Unsplash e Google Fonts. Preparado para recursos locais (seção 11).
- Caminhos relativos em tudo (Live Server e subpasta do GitHub Pages).
- Foto da abertura:
  - `preload` + `fetchpriority="high"`;
  - `srcset` 800/1400/2200;
  - `width`/`height` declarados;
  - posicionada em `absolute` dentro do contêiner, para a altura vir do layout e não da foto.
- Grades com `minmax(0, 1fr)`, contra overflow por largura intrínseca de imagem.
- No desktop, a abertura usa uma grade de duas linhas. A foto ocupa as duas, e a altura mínima segue a largura. Se o texto da esquerda for mais alto que a foto, a foto cresce junto, sem sobreposição (ver seção 10).
- O fio usa `pathLength="1"` + `stroke-dashoffset`: animação em CSS puro, sem medir o path em JS. `vector-effect: non-scaling-stroke` mantém a espessura do traço com `preserveAspectRatio="none"`.
- `noindex, nofollow` (demonstração).
- Favicon SVG próprio com o fio de calda.
- `modelo.json` criado para o catálogo (ordem 80). O modelo **não** foi copiado para `Portifolio-demos`.

## 9. Testes realizados (11/11/2026, Live Server + navegador integrado do Claude Desktop)

Endereço: `http://127.0.0.1:5500/08-confeitaria-avela/index.html` (verificado antes dos testes).

- **Larguras:** 360×640, 390×844, 600×900, 768×1024, 900×800, 1024×600, 1100×800 e 1440×900. Também 844×390 (celular deitado). Capturas inspecionadas em todas.
- **Overflow horizontal:** nenhum. `scrollWidth` igual à largura útil em todas as larguras, e nenhum elemento passando da borda (verificação por script).
- **Carta:**
  - as 12 peças foram exibidas e conferidas visualmente no palco;
  - 23 trocas de aba com intervalo de 25 ms, mais dois cliques seguidos em miniaturas: estado final coerente (1 camada visível, `alt` certo, aba, miniatura e bilhete sincronizados).
- **Teclado:**
  - setas entre as abas (ativação automática, foco visível em terracota funda);
  - Tab do trilho para a primeira miniatura;
  - links do topo e "Pular para a carta".
- **Consulta, modo demonstrativo:**
  - "Consultar esta peça" levou ao bilhete, com foco nele;
  - o campo de data atualizou a mensagem;
  - editar o texto mostrou "Usar a mensagem sugerida", e o botão restaurou o texto;
  - "Copiar mensagem" copiou e anunciou "Mensagem copiada. Nada foi enviado: este site é demonstrativo." Observação: o teste gravou essa mensagem na área de transferência do computador.
- **Consulta, modo real simulado** (config alterado só em memória, com `window.open` interceptado, sem abrir o WhatsApp nem enviar nada):
  - o botão virou "Abrir conversa no WhatsApp";
  - a faixa de aviso sumiu;
  - a URL `wa.me/<número>?text=` saiu com a mensagem codificada corretamente.
- **Sem JavaScript** (scripts removidos numa cópia da página em memória): as 4 coleções aparecem empilhadas, sem a versão interativa.
- **Console:** sem erros nem avisos (só o "Live reload enabled." do Live Server).
- **Recursos:** todas as imagens carregadas (nenhuma com `naturalWidth` 0), Gloock e Commissioner carregadas, favicon com HTTP 200.
- **Não testado com emulação:** `prefers-reduced-motion`, porque o navegador integrado não oferece essa emulação. Foi verificado por leitura do código:
  - as animações do fio e da ficha só existem dentro de `no-preference`;
  - a regra global de `reduce` zera as transições;
  - o JS usa rolagem instantânea.

## 10. Problemas encontrados e corrigidos

| Problema | Correção |
|---|---|
| Na 1ª versão, a abertura em tela cheia a 1440 px recortava a foto (proporção 2,3:1 contra 1,33:1 da original) e cortava a base da fatia | A foto passou a ocupar 60–68% da largura, com altura limitada pela largura. A fatia aparece inteira |
| O logotipo atravessando a base da foto ficava abaixo da dobra no desktop | No desktop, o logotipo sobe para o topo da faixa de cacau e avança sobre a área desfocada da foto. No celular, a travessia pela base foi mantida |
| A 900 px, o texto da abertura subia sobre o logotipo (coluna mais alta que a foto) | Grade de duas linhas: o logotipo fica na primeira e o texto na segunda; a foto ocupa as duas e cresce se preciso |
| No ateliê, a foto de detalhe ficava solta abaixo da principal, com um vazio grande à esquerda | O detalhe foi para a mesma linha da foto principal, ancorado na base e com margem negativa. A principal acompanha a altura do texto |
| No celular, o detalhe sobrepunha a lista de informações | `order` no celular: o detalhe vem logo depois da foto principal. O selo "Foto ilustrativa" da principal foi para a esquerda |
| Bilhete em duas colunas apertado a 1100 px ("Sua consulta" quebrava) | Duas colunas só a partir de 1280 px |
| Trilho quebrava 3 + 1 a 768 px | Grade 2×2 até 899 px |
| Palco 4:5 no celular aproximava demais as fotos horizontais | Palco quadrado no celular e 5:4 no tablet |
| `window.open(..., "noopener")` sempre devolve `null`, e o aviso diria "bloqueado" mesmo com a aba aberta | Abre sem `noopener` e zera `opener` logo em seguida |
| Sem JS, o botão "Copiar mensagem" recarregaria a página (envio do formulário) | Botões da consulta ocultos em `.no-js` |
| A 360×640, os botões da abertura ficavam abaixo da dobra | Foto mais baixa em telas de até 700 px de altura (o topo fixo mantém "Consultar" sempre visível) |

## 11. Pendências

### Bloqueantes
- Nenhuma para a demonstração.

### Recomendadas
1. **Fotos e fontes locais.** Rodar `tools/baixar-recursos.ps1` (não executado: este ambiente não roda PowerShell no seu computador e não tem rede para baixar arquivos). Depois:
   - ativar `useLocalImages`;
   - trocar o `srcset` e o `preload` da abertura no HTML;
   - trocar o link do Google Fonts por `css/fontes-locais.css`;
   - conferir na aba Rede.

   Motivo: hoje a página depende de `images.unsplash.com` e do Google Fonts (LGPD: o IP do visitante vai para o Google). Os ids e as URLs das fontes foram verificados no navegador em 11/11/2026.
2. Testar `prefers-reduced-motion` num navegador com emulação (DevTools → Rendering).
3. Testar em aparelho real (iOS Safari e Android Chrome), principalmente a área de transferência e o `svh`.
4. O ambiente de criação acrescentou ao `assets/favicon.svg` um bloco `<metadata>` de procedência (C2PA, cerca de 8 KB), como nos favicons dos modelos anteriores. Não afeta a exibição. Para um arquivo mínimo, apague o bloco `<metadata>…</metadata>`.
5. A foto "Chocolate e framboesa" tem fundo branco e o bolo pequeno no quadro. Funciona como contraste de luz na coleção, mas pode ser trocada por uma mais próxima se o cliente preferir.

### Publicação comercial
- Fotos reais da confeitaria. As de banco são só ilustrativas.
- Coleções, peças e textos da carta validados com a confeitaria (sabores, formatos e o que é feito de fato).
- Informações práticas reais: antecedência, retirada e entrega, horários, endereço ou região.
- WhatsApp real (55 + DDD + número) e `demo.enabled: false`. Instagram, se houver.
- Remover o `noindex`, revisar título, descrição e `og:image`, e ajustar o texto do rodapé.
- Domínio, hospedagem e, se for para o catálogo, `copiar-modelo.ps1` com destino sugerido `Avela` (não executado).
