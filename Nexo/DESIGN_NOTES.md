# NEXO / Estúdio Facial: notas de design e decisões técnicas

Modelo 07 do catálogo. É o segundo modelo de estética facial, criado para ser estruturalmente diferente do NÁRIA (01).
Assinatura: "Sua pele. Seu tempo. Seu cuidado."
Data: 10/11/2026.
Skill Frontend Design da Anthropic: carregada e aplicada (plano de tokens, revisão contra o briefing, autocrítica por capturas).

## 1. Posicionamento comercial

Quem chega pelo Google Maps já viu o endereço e quer responder três perguntas em segundos:
1. É estética facial? É o tipo de cuidado que eu procuro?
2. O que exatamente fazem e quanto tempo leva?
3. Como falo com eles?

A página responde em **três momentos**, nesta ordem:

| Momento | Pergunta que responde |
|---|---|
| A. Manifesto | O que é (estética facial não invasiva), onde fica, quando atende e o botão de conversa |
| B. Atlas de cuidados | Os 5 cuidados à vista. Cada um abre com o que inclui, para quem é, um aviso honesto e um atalho de conversa |
| C. Estúdio e contato | Bloco lima em que o próprio título é o botão, mais a foto do ambiente, endereço, horários e canais |

Ficaram de fora, de propósito: FAQ, depoimentos, "como funciona", formulário, segundo CTA final e preços.
O botão "Conversar" fica fixo no topo em todas as larguras.

## 2. Direção de arte implementada

**Precisão gráfica / estúdio contemporâneo.** Design suíço modular com uma ideia só: **a faixa**.
- A foto da capa tem uma faixa de luz do sol vertical atravessando o rosto.
- O retrato é fatiado em **5 faixas verticais** que chegam desalinhadas e se alinham ao carregar. É o único movimento automático da página.
- A 2ª linha do título ("Seu tempo.") é uma **faixa horizontal de porcelana que corta a foto**: a tipografia interrompe a imagem.
- O atlas são **faixas verticais** que viram lombadas quando outra se abre.
- O CTA final termina numa **linha** petróleo que se estende ao passar o mouse.

Elementos descartados para manter a coerência:
- numeração gigante decorativa;
- legendas verticais por toda parte (só a da capa);
- grades com linhas finas de jornal;
- ícones;
- gradientes.

## 3. Paleta e tipografia

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| Porcelana | `#F4F5EE` | Fundo base, faixa que corta a foto, texto sobre petróleo | 14,8:1 com petróleo |
| Petróleo | `#13282B` | Texto, atlas, rodapé, bordas de 3 px | — |
| Lima | `#B8F05E` | **Só** em CTAs, bloco de encerramento, códigos N.0x e foco sobre fundo escuro | ≈11:1 com petróleo |
| Lavanda | `#AFB8F2` | Texto secundário sobre petróleo, durações, aviso de demonstração | ≈7,9:1 com petróleo |
| Petróleo 2 | `#1D3A3E` | **Criado.** Faixa aberta e hover das faixas | — |
| Petróleo 3 | `#2B4C50` | **Criado.** Divisões sobre petróleo | decorativo |
| Tinta suave | `#3E5356` | **Criado.** Texto secundário sobre porcelana | ≈7,4:1 |
| Lima escura | `#9ED93F` | **Criado.** Hover dos botões lima | — |
| Porcelana 2 | `#E7E9DD` | **Criado.** Fundo de carregamento das fotos | — |

Distribuição de intensidade: a capa e o contato são claros, o atlas é o único bloco escuro e o lima aparece em poucos pontos. Assim se evita o clichê "fundo quase preto + verde-ácido".

- **Funnel Display** (800/700): títulos, marca, nomes dos cuidados. Grotesca com desenho próprio (o "a" e o "e" fechados), espaçamento negativo e entrelinha de 0,9.
- **Funnel Sans** (300–800): texto corrido e botões. Mesma superfamília, por isso a página tem uma voz só.
- **Geist Mono** (400–500): apenas códigos N.01…, durações, horários, rótulos de dados e legendas de crédito, como "pequenos elementos técnicos" pedidos no briefing.
- As três são SIL Open Font License e vêm do Google Fonts. A alternativa local está pronta em `css/fontes-locais.css`.
- Sem caixa alta em rótulos e sem palavra destacada isolada nos títulos.

## 4. Direção fotográfica

**Superfície e luz.** Closes de pele real com textura, luz lateral dura, tons de pele variados e recortes que mostram parte do rosto. Nenhuma toalha na cabeça, nenhum aparelho clínico e nenhuma foto com aparência de consultório.

| Foto | Função | Enquadramento |
|---|---|---|
| Capa: rosto com faixa de luz (Kamila Maciejewska) | Protagonista e origem do conceito "faixa". LCP | Metade direita, altura total, em 5 faixas. No celular, 4:3 |
| N.01 Limpeza: testa e olhos fechados com sardas (@denmirov) | Textura real de pele | Coluna alta, depois 16:9 / meia altura |
| N.02 Hidratação: creme na bochecha, pele negra (Leighann Blackwood) | Gesto do cuidado e diversidade | Idem |
| N.03 Argila: meio rosto com argila verde (@maxbvp) | Cor que conversa com o lima | Idem |
| N.04 Massagem: mão no pescoço (Angélica Echeverry) | Toque, sem clichê de mãos no rosto | Idem |
| N.05 Renovação: textura de creme (Pawel Czerwinski) | Material, não pessoa: quebra o ritmo de rostos | Idem |
| Estúdio: cadeira de palhinha e grade de luz da janela (Yi Wei) | Ambiente acolhedor. A grade de sombra repete o grid suíço | 4:3 no celular, 1:1 no desktop |

- Nenhum filtro, opacidade ou sobreposição sobre as fotos.
- As fotos dos cuidados são ilustrativas. O rodapé diz que não têm relação com o estúdio nem com resultados, e a do estúdio diz "não retrata o estúdio".
- **Troca feita na auditoria:** a primeira foto do estúdio (sala branca) sumia no fundo porcelana. Foi substituída pela cadeira com grade de luz.

## 5. Arquitetura visual

```
┌ faixa demo (petróleo) ───────────────────────────────────────────┐
│ NEXO Estúdio Facial            Cuidados  Estúdio e contato [Conversar] (fixo)
├──────────────────────────────┬─────────────────────────────────── ┤
│ ■ Estética facial não invasiva│ ║    ║    ║    ║    ║  foto em 5   │
│                               │ ║    ║    ║    ║    ║  faixas      │
│ Sua pele.                     │ ║    ║    ║    ║    ║              │
│ Seu tempo.════════════════════╪═ faixa de porcelana corta a foto ══│
│ Seu cuidado.                  │ ║    ║    ║    ║    ║              │
│ texto + [Conversar…] Ver os cuidados ║ ║   ║    ║    ║              │
│ Onde … Quando … (mono)        │ ║    ║    ║    ║    ║   legenda ↕  │
├───────────────────── ATLAS (petróleo) ───────────────────────────┤
│ Atlas de cuidados                      texto em lavanda         │
│ ┌N.01┐┌N.02┐┌N.03┐┌N.04┐┌N.05┐   visão geral: 5 colunas iguais   │
│ │foto││foto││foto││foto││foto│   aberto: 1 larga + 4 lombadas    │
│ └────┘└────┘└────┘└────┘└────┘                                  │
│ Não sabe por onde começar?                 [Conversar…]          │
├──────────────── ESTÚDIO E CONTATO ───────────────────────────────┤
│ ┌ bloco lima ──────────────┐ ┌ foto do estúdio ┐                │
│ │ Conversar sobre           │ └─────────────────┘                │
│ │ meu cuidado  (= botão)    │ Endereço | Horários                │
│ │ ───                       │ WhatsApp | Instagram               │
│ └───────────────────────────┘                                    │
└ rodapé (petróleo): demo, créditos, voltar ao início ─────────────┘
```

- **Celular:** segmento → título → foto em faixas → texto → botão → ficha. O CTA principal termina perto do fim da 1ª tela, a 744 px de 740 em 360×740: fica uns 4 px abaixo da dobra. O botão "Conversar" do topo fica sempre visível.
- **Janelas baixas (desktop):** o título e a foto encolhem, e o enquadramento sobe (`object-position 58% 0`) para o olho não ficar sob a faixa do título.

## 6. Componente exclusivo: Atlas de cuidados

- **Padrão:** disclosure da W3C (APG). Cada cuidado tem `<h3><button aria-expanded aria-controls>`, e o painel recebe `hidden` quando fechado. Um cuidado aberto por vez. Clicar no aberto o fecha.
- **Desktop (900 px ou mais):**
  - Visão geral: 5 colunas iguais com foto alta, código, nome, duração e resumo. A coluna inteira é clicável.
  - Ao abrir um cuidado, os outros quatro viram **lombadas** de ~4,5–5,75 rem, com nome na vertical e uma fatia da foto embaixo.
  - A faixa aberta usa container query (`@container faixa`):
    - 700 px ou mais: foto à esquerda em altura total, texto à direita;
    - menos que isso (900–1100 px de tela): foto em cima e texto embaixo;
    - 1000 px ou mais: as listas internas ficam em duas colunas.
- **Celular e tablet:** bandas empilhadas (código, nome, duração, +/−). Tudo começa fechado, para ver as 5 opções de uma vez. Aberto, mostra foto, resumo, lista e notas, com foto e texto lado a lado quando a banda tem 700 px ou mais (tablet).
- **Transição:** View Transitions API só no desktop, com nomes por faixa, para as larguras se transformarem. Sem suporte, com movimento reduzido ou no celular, a troca é instantânea.
- **Sem JavaScript:** o HTML já traz os 5 cuidados abertos (`aria-expanded="true"`, sem `hidden`), em bandas com foto e texto lado a lado. Testado (simulação abaixo).
- **Nada depende de hover:** o hover só realça. O sublinhado do nome só aparece em dispositivos com `hover: hover`.
- **Fotos dos cuidados:** `loading="lazy"`. No celular, só baixam quando o cuidado é aberto (economia de dados).

## 7. Estratégia de conversão

- Não há formulário, seleção múltipla, prévia de WhatsApp, simulador, escolha de horário nem etapas.
- Os CTAs são links (`<a data-contact>`), divididos em:
  - gerais: topo, capa, ajuda do atlas e encerramento, com a mensagem "Olá! Vim pelo site da NEXO e quero conversar sobre um cuidado facial.";
  - um por cuidado, com a mensagem trocando o nome do cuidado.
- **Modo real** (`demo.enabled: false` e `contact.whatsapp` com 10 dígitos ou mais): o JS troca o `href` por `https://wa.me/<número>?text=<mensagem>` e abre em nova aba. Se o JS falhar, o link leva à seção de contato, onde o número aparece.
- **Modo demonstração:** nada é aberto. Um aviso lavanda (`role="status"`, não modal, sem roubar o foco) diz que o contato está em demonstração e mostra a mensagem que seria enviada. Fecha pelo botão, com Esc ou sozinho em 12 s.
- O visitante não informa nenhum dado pessoal ou de saúde antes da conversa. O texto do encerramento diz isso.

## 8. Diferenciação em relação ao NÁRIA

| Ponto | NÁRIA | NEXO |
|---|---|---|
| Arquitetura visual | Revista de beleza | Pôster suíço modular, campos chapados |
| Organização | 7 blocos (estúdio, coleção, ritual, espaço, FAQ, agendar) | 3 momentos |
| Capa | Serifada + foto vertical quente | Sans gigante; foto em 5 faixas cortada pelo título |
| Componentes | Abas, formulário, modal | Faixas expansíveis, bloco-CTA tipográfico, aviso não modal |
| Fotografia | Luz quente difusa, atmosfera | Luz lateral dura, close, textura, tons de pele variados |
| Linguagem gráfica | Bodoni, ameixa, rosé | Funnel + Geist Mono, petróleo, lima, lavanda, ângulos retos |
| Serviços | Sumário em abas (um por vez) | Atlas: todos visíveis lado a lado, lombadas ao abrir |
| Conversão | Formulário → mensagem pronta → WhatsApp | Link direto com mensagem curta, sem dados |
| Ritmo | Longo e uniforme | Curto: claro → escuro → lima |

Também foi evitado:
- o recorte de chapa do ORLA;
- a régua cobalto do TRAÇO;
- os adesivos da FORMA DOCE;
- a capa de revista com moldura-sabonete da BOLHA & BENTO;
- o laranja industrial do VÉRTICE.

## 9. Referências efetivamente utilizadas

- **Codrops, Animated Product Grid Preview** (lido nesta sessão). Princípio extraído: a grade que se expande em prévia. Aproveitei também os alertas do próprio autor: o efeito depende de hover (aqui é clique/teclado) e precisa respeitar o movimento reduzido. Não usei GSAP nem clip-path animado.
- **Codrops, au-rel-io** (09/11/2026): **inacessível** nesta sessão (erro do site). Não foi usado.
- **Codrops Hub:** não reaberto. Usei o resumo do acervo local (`docs/acervo_design_landing_pages.md`).
- **MDN View Transition API:** troca de estado do atlas, com fallback instantâneo.
- **MDN Container size queries:** layout interno da faixa aberta e das bandas do tablet. Navegadores sem suporte ficam com o layout empilhado, que já funciona.
- **W3C APG Disclosure:** botões com `aria-expanded`/`aria-controls`.
- **web.dev Optimize LCP:** a foto da capa tem `<link rel="preload" imagesrcset>` com os mesmos `srcset`/`sizes`, `fetchpriority="high"` e sem lazy. As 5 faixas usam a mesma URL, então o arquivo é baixado uma vez.

As páginas da MDN, W3C e web.dev foram aplicadas a partir de conhecimento consolidado dessas especificações. Não foram reabertas nesta sessão.

## 10. Recursos visuais: fontes e condições de uso

- **Fotos:** Unsplash, Licença Unsplash (uso comercial permitido, sem atribuição obrigatória; a atribuição é feita mesmo assim no rodapé). Antes de escolher, abri a página de cada foto no navegador e confirmei "Fotografia grátis", sem selo Unsplash+.
  - capa: `b2bXKspL5MY` (Kamila Maciejewska)
  - limpeza: `sUuOgnVyxjA` (@denmirov)
  - hidratação: `NdcuSGxKbwE` (Leighann Blackwood)
  - argila: `0RxbUktnZug` (@maxbvp)
  - massagem: `5KY5LP_zc44` (Angélica Echeverry)
  - renovação: `0c36Otpkk6k` (Pawel Czerwinski)
  - estúdio: `Obm20i8OEX4` (Yi Wei)
- Nenhuma foto repete o NÁRIA.
- **Fontes:** Funnel Display, Funnel Sans e Geist Mono, SIL OFL 1.1. As URLs dos .woff2 (subconjunto latin) foram conferidas na resposta do Google Fonts nesta sessão.
- **Pessoas retratadas:** fotos de banco de imagens. Para um cliente real, usar fotos próprias com autorização de uso de imagem.

### Recursos locais: limitação
Este ambiente não consegue gravar imagens baixadas na pasta do projeto. O padrão do catálogo foi mantido:
- fotos remotas da Unsplash, com `srcset`;
- `tools/baixar-recursos.ps1`, que baixa 15 arquivos de foto (7 fotos em 2 ou 3 larguras) e 3 de fonte;
- o interruptor `useLocalImages` em `js/config.js`, com retorno automático à URL remota se faltar algum arquivo.

**O script não foi executado** (o ambiente não roda PowerShell no seu computador). As imagens **não** estão salvas localmente.

## 11. Testes realizados (10/11/2026, Live Server, navegador integrado)

| Teste | Resultado |
|---|---|
| Rolagem horizontal em 360, 390, 600, 768, 900, 1024, 1100, 1280 e 1440 px | `scrollWidth` ≤ largura em todas. Nenhum elemento além da borda (script de varredura) |
| Título × foto (desktop) | As linhas 1 e 3 terminam antes da foto em 900 (397 < 452), 1024 (452 < 515), 1100 (485 < 554) e 1440 (494 < 727) |
| Janelas baixas | 1440×680 e 1280×620: CTA dentro da 1ª tela e olho acima/abaixo da faixa (não coberto) |
| CTA na 1ª tela | Desktop: sim em todas as alturas testadas. Celular: o CTA da capa fica logo abaixo da dobra em 360×740; o "Conversar" do topo fica sempre visível |
| Atlas: clique (1440, 900), toque no celular (390) e teclado (Tab + Enter, foco visível em lima) | Funcionando. `aria-expanded` e `hidden` corretos. Foco segue para o CTA do painel |
| Atlas em 768 aberto | Foto à esquerda e texto à direita (container query) |
| Botões de contato (modo demo) | Aviso aparece com a mensagem do cuidado. Nada é aberto |
| Menu móvel (360) | Abre, fecha com Esc e devolve o foco ao botão |
| Console | Só o log do Live Server. Nenhum erro |
| Fotos | Capa e estúdio carregadas. As dos cuidados carregam ao aparecer/abrir (lazy, conferido) |
| Fontes | Google Fonts respondendo 200 com as três famílias |
| Movimento reduzido (simulação) | Regras `no-preference` desligadas e `reduce` forçadas: `animation-name: none` nas faixas, `scroll-behavior: auto`, transições ≈0 |
| Sem JavaScript (simulação) | Página recarregada sem `<script>`: 5 painéis visíveis, layout lado a lado, sem rolagem horizontal |

**Não testado:**
- preferência de movimento reduzido real do sistema operacional (o navegador integrado não emula);
- a parte do JS que pula a View Transition com movimento reduzido;
- outros navegadores (Firefox e Safari);
- o script PowerShell e o modo de imagens locais;
- o modo real do WhatsApp com um número de verdade.

## 12. Correções aplicadas durante a auditoria

1. Fotos do atlas invisíveis no desktop: um seletor de "fechado = sem foto" tinha a mesma especificidade da regra do desktop. A regra do desktop foi reforçada.
2. Container query aplicada ao próprio contêiner (não funciona). Foi criada a camada `.faixa__corpo`: `.faixa` é o contêiner e o corpo é a grade.
3. Títulos das colunas do atlas desalinhados (resumo com 3 ou 4 linhas). O resumo ganhou altura mínima na visão geral.
4. Cache do Live Server servindo CSS antigo: incluído `?v=` nos links.
5. Foto do estúdio apagada (sala branca sobre fundo porcelana): trocada pela cadeira com grade de luz.
6. A marca gráfica do CTA final parecia um ícone de "pausa": virou uma linha que se estende.
7. Aviso de demonstração (petróleo) sumia sobre o atlas petróleo: agora é lavanda com borda e sombra chapada.
8. View Transition no celular gerava fantasmas (fade da página inteira): agora só roda no desktop.
9. Faixa do título cobrindo o olho em 900, 1024 e janelas baixas: título alinhado à base da área, enquadramento subido e regra específica para janelas baixas.
10. CTA da capa abaixo da dobra no celular e no tablet: foto em 4:3 (celular) e 2:1 (600–899).
11. Faixas da capa revelavam o fundo durante a animação: escala inicial maior.
12. Duas colunas internas espremidas na banda aberta do tablet: agora só quando há largura.

## 13. Pendências

### Bloqueantes
Nenhuma para a demonstração.

### Recomendadas
- Rodar `tools/baixar-recursos.ps1`, ativar `useLocalImages`, trocar o `srcset` e o preload da capa no HTML e o link das fontes. Depois, conferir na aba Rede.
- Testar com "Efeitos de animação" desligado no Windows ou com a emulação de `prefers-reduced-motion` no DevTools.
- Testar no Safari/iOS: View Transitions (só tem suporte recente) e container queries.
- O conteúdo do atlas existe em dois lugares: `config.js` (fonte da verdade) e a cópia estática no HTML (sem JS e buscadores). Ao personalizar, atualize os dois.
- Favicon embutido como SVG em data URI (letra N em contorno, sem depender de fonte). Para um cliente real, usar o logotipo dele.

### Publicação comercial
- Marca, textos, cuidados, durações e notas em `js/config.js`. **Validar com a profissional** se cada etapa cabe na atuação dela (extração, esfoliação enzimática) e se as durações são reais.
- Confirmar qualificação, registro e normas aplicáveis antes de publicar. O modelo não exibe formação, certificados nem equipamentos de propósito.
- `contact.whatsapp` com DDI e DDD e `demo.enabled: false`. Testar se abre a conversa certa.
- Endereço, horários e Instagram reais.
- Fotos próprias do estúdio e dos cuidados, com autorização das pessoas. Remover "Imagem ilustrativa" quando forem reais.
- Remover o `noindex`. Revisar `<title>`, `description` e `og:image` (1200×630, de preferência foto do cliente).
- Avaliar aviso de privacidade se mantiver o Google Fonts. Fontes locais resolvem.
- Para o catálogo: `modelo.json` criado (ordem 70). Destino sugerido: `Nexo`.

## 14. Resposta à pergunta do briefing

> "Se uma cliente rejeitar o visual do NÁRIA, o NEXO realmente oferece uma opção estrutural e artisticamente diferente, sem perder a utilidade comercial?"

Sim, e a diferença está na estrutura, não só em cores, fontes e imagens:
- a página tem 3 momentos em vez de 7;
- a capa é um pôster em que título e foto se cortam;
- os serviços viram um atlas de faixas, em que todos ficam visíveis e um se abre;
- a conversão é um link direto, sem formulário.

A utilidade comercial continua:
- o segmento está escrito na primeira linha;
- onde e quando atende aparecem na capa;
- o contato está sempre a um toque, no topo fixo;
- cada cuidado explica o que inclui, para quem é e o que não é feito.

Quem gosta do NÁRIA escolhe atmosfera e ritual. Quem escolhe o NEXO quer clareza, contraste e um estúdio com cara de marca contemporânea.
