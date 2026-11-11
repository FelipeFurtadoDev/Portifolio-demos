# ENTRE. Atelier de Olhar & Mãos: notas de design e decisões técnicas

Modelo 10 do catálogo. Segunda proposta do nicho de nail, lash & brow, criada como alternativa estrutural ao TRAÇO Studio (03).
Assinatura: "Atelier de Olhar & Mãos". Frase principal: "A beleza mora nos detalhes."
Data: 11/11/2026.

Skill Frontend Design da Anthropic: carregada e aplicada. As skills GSAP (`gsap-scrolltrigger`, `gsap-timeline`) foram consideradas, mas o GSAP não foi usado (ver seção 9).

Documentos consultados:
- `docs/01_NEGOCIO_E_PUBLICO.md` e `docs/02_NICHOS_E_OBJETIVOS.md`;
- `docs/acervo_design_landing_pages.md` e `docs/guia_componentes_diferenciacao.md`;
- os DESIGN_NOTES do TRAÇO (03), do PULSO (09) e o início do AVELA (08);
- as famílias tipográficas de todos os `index.html` anteriores.

Referência visual: o usuário enviou duas fotos para orientar a linguagem: mão com unhas vinho cobrindo um olho, e um macro de cílios. Elas **não foram usadas** no site, porque a origem e a licença são desconhecidas. Serviram para escolher as fotos licenciadas.

---

## 1. Conceito e identidade

**Editorial tátil.** O nome orienta a composição. *Entre* é o espaço entre os dedos e entre os cílios, de onde se olha. Na capa, o logotipo se parte em **EN** e **TRE.**, e a fotografia protagonista fica *entre* as duas metades.

A moldura da foto tem a forma de uma **unha amendoada**: lados retos e ponta arredondada, desenhada como `clipPath` SVG. Esse é o único gesto gráfico recorrente:
- a mesma curva aparece no fio vermelho fino que contorna a capa;
- reaparece no topo da foto principal de "O gesto";
- e nos marcadores miniatura das listas de cuidados.

A ousadia ficou na capa e nos cartões empilhados. O resto é contido: alinhamento à esquerda, uma serifada e uma sem serifa, sem sombras decorativas e sem gradientes.

## 2. Paleta e tipografia

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| Porcelana | `#F6F0E8` | Fundo base (respiro) | Ameixa sobre ela: 11,0:1 |
| Ameixa | `#4B293C` | Texto, cartão "Mãos", fundo do contato | Porcelana sobre ela: 11,0:1 |
| Pêssego | `#E69E89` | Palavra "Gesto.", rádios e foco sobre ameixa | Sobre ameixa: 5,7:1 |
| Lavanda | `#CEC2DD` | Faixa de demonstração e cartão "Olhar" | Ameixa funda sobre ela: 9,7:1 |
| Vermelho | `#C75C56` | **Só traços** (fio da moldura). Não é usado em texto | Sobre porcelana: 3,6:1 (gráfico ≥ 3:1) |
| Ameixa funda | `#2E1825` | **Criada.** Rodapé e texto sobre fundos claros coloridos | Porcelana sobre ela: 14,6:1 |
| Vinho | `#A8433E` | **Criada.** O vermelho do briefing não passa em texto pequeno (3,6:1). Usada em "Gesto. Olhar. Expressão.", no botão da mensagem e no foco | 5,2:1 sobre porcelana; branco sobre ela: 5,9:1; 4,5:1 sobre o rosado |
| Malva | `#6E5563` | **Criada.** Texto secundário sobre porcelana | 5,9:1 |
| Malva clara | `#D9C9D1` | **Criada.** Texto secundário sobre ameixa | 7,9:1 |
| Rosado | `#F2DDD3` | **Criada.** Fundo do cartão "Sobrancelhas" (pêssego clareado) | Ameixa funda sobre ele: 12,6:1 |
| Papel | `#FBF7F1` | **Criada.** Bilhete da mensagem | — |

Distribuição dos acentos: cada momento tem um acento dominante, para não competirem:
- capa: vinho + fio vermelho;
- cartões: pêssego, ameixa e vinho, um por capa;
- contato: pêssego.

**Tipografia** (Google Fonts, OFL; nenhuma usada nos modelos anteriores):
- **Instrument Serif** (regular e itálico): o logotipo partido (até 15 rem), os títulos, as palavras "Gesto. Olhar. Expressão." e as opções do contato. É estreita e editorial, o que permite letras enormes ao lado da foto sem ocupar a página.
- **Familjen Grotesk** (400–700): leitura, navegação e botões. É uma grotesca com algum desenho próprio, para não cair numa sans genérica.
- Evitados deliberadamente: Fraunces (BOLHA & BENTO), Gloock (AVELA), Bodoni Moda (NÁRIA), Archivo (TRAÇO); rótulos em caixa alta; setas em botões; uma única palavra destacada em itálico no título.

## 3. Arquitetura (quatro momentos)

1. **Aviso de demonstração** (faixa lavanda). Some com `demo.enabled: false`.
2. **Topo fixo** com marca, "Cuidados", "O atendimento" e "Preparar mensagem". Abaixo de 760 px vira o botão "Menu" com painel suspenso. Sem JS, os links ficam visíveis em linha.
3. **01 Primeiro olhar.** Grade de três colunas (texto | foto | texto):
   - desktop: EN no alto à esquerda, invadindo a moldura; TRE. embaixo à direita, também invadindo; "Gesto. Olhar. Expressão." no alto à direita; frase, texto e CTAs embaixo à esquerda;
   - abaixo de 900 px: EN → foto → TRE. sobreposta ao canto inferior direito da foto → palavras → texto. A foto aparece inteira na primeira tela em 360, 390, 600 e 768 px.
4. **02 Três formas de expressão.** Cabeçalho, trilho de progresso (≥ 1100 px) e as três capas empilhadas (seção 5).
5. **03 O gesto faz a diferença.** Foto de esmaltação em andamento (topo amendoado), detalhe de escovinha na sobrancelha sobreposto no canto, título com revelação curta e três notas **sequenciais**: antes do primeiro toque, durante o cuidado e entre uma visita e outra. As notas trazem o que esperar e prazos de referência de manutenção, ou seja, informação que não está nos cartões.
6. **04 Seu próximo momento.** Fundo ameixa com cantos superiores arredondados, que fecha a página. Tem a escolha "O que você deseja valorizar?", cuidados opcionais, nome opcional e o bilhete com a mensagem pronta, o botão e as informações práticas (seção 7).
7. **Rodapé** (ameixa funda): marca, aviso de marca fictícia, créditos com link (gerados pelo `config.js`) e "Voltar ao início".

## 4. Direção fotográfica

Seis fotos da Unsplash (Licença Unsplash). Nenhuma foi usada nos modelos anteriores: os IDs foram conferidos contra todos os `index.html` e `config.js`. Foram escolhidas visualmente no navegador, em pranchas de contato, entre cerca de 340 candidatas.

| Papel | Foto (autor) | Enquadramento |
|---|---|---|
| **Protagonista** | Mão de unhas claras atravessando o rosto, um olho castanho, sobrancelha e cabelo ruivo em luz quente (Andriyko Podilnyk) | Moldura amendoada alta: ≈ 2:3 no desktop, 4:5 abaixo de 900 px. `object-position: 42% 42%` mantém olho e mão no centro |
| Mãos e unhas | Mão em gesto, unhas vinho, anel fino (Laura Chouette) | Metade esquerda do cartão; faixa 16:10 no celular |
| Cílios e olhar | Close de olho com cílios longos (Milky Way Lashes) | Idem, foco no arco dos cílios |
| Sobrancelhas | Olho claro e sobrancelha natural definida (engin akyurt) | Idem, foco na sobrancelha |
| O gesto | Profissional aplicando esmalte (Ondrej Supitar) | 4:5 com topo amendoado |
| Detalhe | Escovinha penteando a sobrancelha (Le Petit) | 4:5 sobreposta, com borda porcelana |

- Unidade: luz quente e natural, pele com textura, sem filtros, sem sobreposições escuras e sem redução de opacidade.
- Uma só foto mostra o olhar, a mão e a unha juntos (a protagonista). As demais variam a escala: gesto, macro e cena de atendimento.
- Nenhuma foto se repete.
- Todas são identificadas como ilustrativas: legenda junto da foto e aviso no rodapé ("não mostram trabalhos realizados pelo atelier").
- A foto de cílios é de uma marca de cílios (perfil Milky Way Lashes na Unsplash). Está creditada e não é apresentada como trabalho do ENTRE.
- A foto da capa tem unhas claras, e não a esmaltação marcante da referência enviada. É a principal diferença em relação à foto ideal do briefing (ver pendências).

## 5. Cartões empilhados (componente 11, protagonista)

**Estrutura.** `<ol class="pilha">` com três `<li class="cartao">`, cada um com uma capa editorial:
- foto;
- "01 de 03" + três barras de progresso;
- palavra-capa enorme em itálico (Gesto. / Olhar. / Expressão.);
- título, descrição comercial e quatro cuidados;
- botão de escolha.

**Comportamento.**
- Cada cartão é `position: sticky` com `top: topo + 1rem + i × 1,15rem`. Assim a borda superior dos cartões anteriores continua visível (profundidade em degraus).
- O cartão seguinte sobe por cima pela rolagem natural. **Não há pin nem espaçador**: a altura da seção é a soma dos cartões e dos intervalos. Quando o último chega, a pilha termina e a página segue, sem vão vazio.
- Profundidade: enquanto o próximo cartão cobre o atual, o JS calcula `p` (0 a 1) e aplica ao cartão de baixo `scale(1 − 0,06p)` e um véu ameixa de até 38%. É escala uniforme pequena, sem `will-change` e sem esticar nada (lição do PULSO).
- Tempo de leitura: cada capa fica inteira na tela por toda a rolagem que o cartão seguinte leva para cobri-la (≈ altura de um cartão).
- Trilho (≥ 1100 px): lista "01 Mãos e unhas / 02 Cílios e olhar / 03 Sobrancelhas". Marca a capa atual (`aria-current="step"`), mostra "escolhido" ao lado da escolhida e leva à capa no clique.
- **Encaixe na altura:** `encaixar()` mede, para cada cartão, se `top preso + altura ≤ altura da janela` e se o texto não transborda. Se algum não couber, **todos** passam a `is-fluxo` (lista sequencial, sem prender), para nenhum conteúdo ficar escondido. Isso é recalculado ao redimensionar e quando as fontes carregam.
  - Presos: 360×740, 390×844, 600×900, 768×1024, 900×800, 1024×768, 1024×600, 1100×700, 1440×900 e 1440×700.
  - Sequenciais: 360×640 e 390×667.
- Celular: foto em faixa 16:10 (máx. 30% da altura), texto compacto, botão em largura total e degrau de 0,7 rem.
- Sem JS: os cartões continuam `sticky` pelo CSS (sem escala). Com movimento reduzido: sem escala nem véu.

## 6. Tipografia cinética (componente 12, apoio)

**Um momento principal, na abertura:**
- **EN** e **TRE.** se revelam por máscara (`clip-path: inset`) a partir do lado da foto, com deslocamento de 0,32 em em direção oposta. As letras parecem sair de trás da moldura. Duração: 1,05 s; TRE. começa 0,13 s depois.
- **"Gesto. Olhar. Expressão."** sobem palavra por palavra dentro de máscaras (`translateY(108%) → 0`), aos 0,45 s, 0,57 s e 0,69 s.
- A **foto não espera**: aparece com a página, com `preload` e `fetchpriority="high"`. O título e os CTAs também não são animados.
- O início espera as fontes (`document.fonts.ready`), com limite de 1,2 s, para não haver salto de fonte no meio da animação.
- Combinação escolhida: máscara + posição. Escala, sobreposição animada e variação de eixo foram descartadas.
- As três palavras reaparecem, estáticas, como palavra-capa de cada cartão e como apoio de cada opção do contato.

**Momento secundário:** "O gesto faz / a diferença." revela as duas linhas uma única vez, ao entrar na tela (0,9 s). Se o título já estiver visível ao carregar, nada é escondido.

**Estados intermediários verificados** (animações pausadas a 420 ms e 780 ms, 1440×900): letras recortadas com nitidez, sem tremor, sem desfoque e sem mudança de layout.

## 7. Seleção contextual (funcionalidade)

- Estado único em `main.js`: `{ care, extras[], nome }`. A função `setCare(id)` é o único ponto de mudança, e `render()` atualiza tudo a partir do estado:
  - botões dos cartões (`aria-pressed` e rótulo "Ir para a mensagem" quando escolhido);
  - selo "Escolhido para a sua mensagem";
  - trilho;
  - rádios do contato;
  - resumo da categoria;
  - cuidados opcionais (gerados de `config.cares[].services`);
  - mensagem e botão.
- Botão do cartão: o 1º clique escolhe; o 2º rola até o contato e leva o foco à pergunta.
- Os rádios são `<input type="radio">` nativos: setas do teclado funcionam e, sem JS, a escolha continua possível. Um `<noscript>` explica como falar com o atelier.
- Mensagem: saudação (+ nome), "Gostaria de valorizar …", cuidados de interesse (se marcados) e pedido de horários. Não há horários simulados nem confirmação falsa.
- **Demonstração** (padrão): o botão "Copiar mensagem" tenta a área de transferência moderna, depois o método antigo. Se os dois falharem, seleciona o texto e explica como copiar. Há aviso: "nenhuma conversa é aberta".
- **Modo real:** com `demo.enabled: false` e número válido, o botão vira "Abrir conversa no WhatsApp" e abre `wa.me/<número>?text=…`. Se a demonstração estiver desligada sem número, o botão continua copiando e o aviso muda.
- Dados comerciais editáveis em `js/config.js`: textos, cuidados, contato, informações práticas e créditos.

## 8. Diferenças em relação ao TRAÇO (avaliadas nas capturas desta entrega)

| | TRAÇO (03) | ENTRE. (10) |
|---|---|---|
| Capa | Título gigante + foto sangrando + régua em toda a largura | Logotipo partido em diagonal, foto na moldura amendoada *entre* as metades |
| Geometria | Cantos retos, régua, anotação técnica | Curva amendoada, fio fino, topo arredondado da foto do atendimento |
| Tipografia | Uma família (Archivo expandida) | Instrument Serif estreita + Familjen Grotesk |
| Cores | Gelo, carbono, cobalto | Porcelana, ameixa, pêssego, lavanda, vinho |
| Serviços | Lookbook de 8 pranchas + listas + ficha | 3 capas editoriais empilhadas na rolagem |
| Seção de marca | Método com mapeamento SVG | "O gesto": atendimento e cuidados entre visitas |
| Conversão | Ficha extensa fixa + barra inferior | Uma pergunta + cuidados opcionais + mensagem para copiar |
| Movimento | Régua se desenhando | Máscara do logotipo + profundidade dos cartões |

**Sem animação**, a diferença continua: a capa (EN | foto | TRE.), a pilha de cartões *sticky* e o contato por pergunta são estruturais, não efeitos. Com o JS desligado, a página foi conferida e mantém a composição.

**Também diferente de:** PULSO (cena de rolagem presa e hotspots) e AVELA (logotipo atravessando a foto e carta interativa). Aqui não há pin longo e o logotipo não cruza a foto: ele se divide em volta dela.

## 9. Decisões técnicas

- **Sem GSAP.** O empilhamento é `position: sticky` nativo, sem pin spacer, o que elimina os vãos de ScrollTrigger registrados no portfólio. A profundidade são duas variáveis CSS escritas num `requestAnimationFrame` ligado ao scroll (passivo). A abertura é CSS (`@keyframes`). O GSAP também traria uma dependência de CDN que o ambiente de desenvolvimento não alcança para testar.
- Moldura: `clip-path: url(#forma-amendoa)` com `clipPathUnits="objectBoundingBox"`, que escala com a caixa sem distorcer a foto. Se não houver suporte, a foto fica retangular.
- Imagens: `srcset` (480–1600 px) da CDN da Unsplash, `width`/`height` nativos, `loading="lazy"` abaixo da dobra; `preload` + `fetchpriority="high"` na capa. As tags foram geradas por script a partir de um registro único.
- `useLocalImages` troca para `assets/img/<nome>-<largura>.webp` e volta sozinho para a CDN se faltar um arquivo.
- `overflow-x: clip` no `body` só como proteção. O overflow foi medido como 0 sem depender dele.
- CSS e JS com `?v=2` para evitar cache antigo. `noindex` ativo (demonstração).
- `prefers-reduced-motion: reduce`: todas as animações e a rolagem suave ficam dentro de `no-preference`. A escala dos cartões também é desligada no JS.

## 10. Acessibilidade e responsividade

- HTML semântico: `header`/`nav`/`main`/`section`/`article`/`footer`, `h1` único ("A beleza mora nos detalhes."), `h2` por momento, `h3` por cartão e nota.
- O logotipo gigante e as palavras-capa são `aria-hidden`; as palavras da capa têm `aria-label`.
- Link "Pular para o conteúdo"; foco visível em vinho sobre claros e em pêssego sobre ameixa.
- Alvos de toque ≥ 44 px (botões, chips, links do menu e do trilho).
- Mensagem, resumo e status com `aria-live`/`role="status"`.
- Menu: `aria-expanded`, foco no primeiro link ao abrir, Esc fecha e devolve o foco, fecha ao clicar fora ou ao sair com o Tab.

## 11. Testes realizados

**Ferramentas:**
- navegador integrado do Claude Desktop com Live Server (`127.0.0.1:5500`), com fontes e fotos reais. As larguras foram emuladas; capturas acima de ~620 px saíram reduzidas;
- Chromium (Playwright Python) no ambiente de desenvolvimento, servindo a pasta localmente, só para medições. Esse ambiente não acessa Google Fonts nem Unsplash, que foram bloqueados de propósito.

O Playwright do computador do usuário não iniciou (`npx` não encontrado).

**Navegador integrado (fontes e fotos reais):**
- Capturas e inspeção visual:
  - 1440×900: capa, cartões em 3 posições da pilha, saída da pilha para "O gesto", contato vazio e preenchido, rodapé;
  - 390×844: capa, cartões empilhados, "O gesto", contato e bilhete;
  - capa em 360×640, 600×900, 768×1024, 900×800, 1024×768, 1024×600 e 1100×700;
  - cartão em 1100×700.
- Medições por script em 360×740, 600×900, 900×800 e 1100×700:
  - rolagem horizontal 0;
  - nenhum elemento além da borda;
  - nenhum título ou botão com texto cortado;
  - 6/6 imagens carregadas;
  - Instrument Serif e Familjen Grotesk carregadas.
- Estados intermediários da abertura (animações pausadas a 420 e 780 ms).
- Estado compartilhado: cartão "Olhar" → rádio marcado e mensagem; rádio "Mãos" → cartão e trilho atualizados; cuidados opcionais e nome entram na mensagem.
- Cópia: na 1ª versão, o painel do app recusou a área de transferência moderna, e o recurso de reserva selecionou o texto e mostrou a instrução. Com a correção (método antigo antes da seleção), o reteste a 390 px mostrou "Mensagem copiada." e o texto foi de fato para a área de transferência.
- URLs do script de download: 19 imagens em WebP (HTTP 200) e o CSS das fontes com os blocos "latin" esperados.
- Console: nenhum erro.

**Playwright (medições):**
- 10 tamanhos (360×740, 390×844, 600×900, 768×1024, 900×800, 1024×768, 1100×700, 1440×900, 1440×700, 390×667): overflow 0, nenhum erro de página, estado dos cartões coerente (presos em todos, menos 390×667).
- Movimento reduzido emulado: 0 animações, logotipo e palavras sem máscara, escala dos cartões em 1, título de "O gesto" visível.
- Sem JavaScript: logotipo, cartões e textos visíveis, menu em linha, `noscript` presente, overflow 0.
- Teclado em 390 px: pular → marca → Menu → 2 CTAs → botões dos 3 cartões. Enter escolhe; o 2º Enter leva o foco à pergunta do contato; as setas trocam o rádio e atualizam o cartão.
- Menu: abre com foco em "Cuidados"; Esc fecha, devolve o foco e esconde o painel.
- Modo real simulado (config alterada antes do `main.js`, `window.open` interceptado):
  - o botão virou "Abrir conversa no WhatsApp";
  - a URL gerada foi `https://wa.me/5511900000000?text=…`, com o texto decodificado idêntico à mensagem;
  - a faixa e o aviso de demonstração ficaram ocultos;
  - nenhuma conversa foi aberta.

**Não testados:**
- preferência real de movimento reduzido do sistema (só emulada);
- leitor de tela, toque físico, Safari/iOS e Firefox;
- rolagem contínua com o painel visível. O painel do app estava oculto durante os testes, o que atrasa animações, por isso a verificação foi por posições e animações pausadas;
- 1440 px visual em tamanho real (as capturas saíram reduzidas pelo painel);
- o script PowerShell em si e o modo com imagens/fontes locais;
- a área de transferência num navegador comum (só no painel do app).

## 12. Problemas encontrados e corrigidos

| Problema | Correção |
|---|---|
| A 390 px, o crédito da capa (à direita) colidia com o "TRE." | Crédito à esquerda, com largura máxima de 60% |
| EN mal tocava a moldura no desktop | Sobreposição aumentada para 0,34 em |
| Fio curvo em "O gesto" aparecia como risco solto acima da foto | Removido; a curva continua no topo amendoado da foto |
| Vão grande entre a pilha e "O gesto" | Respiro superior de "O gesto" reduzido |
| A 1024×600 o 3º cartão ia para o fluxo e os dois primeiros ficavam presos (comportamento misto). O cálculo usava uma margem estimada, não o `top` real | `encaixar()` passou a usar o `top` calculado de cada cartão e a aplicar o mesmo modo aos três |
| Crédito da foto principal de "O gesto" ficava sob a foto de detalhe no celular | Largura máxima de 52% |
| Cópia caía direto na seleção quando a API moderna era recusada | Nova tentativa com o método antigo antes da seleção |

## 13. Componentes (formato do guia)

```text
Componentes escolhidos: ID 11 (protagonista: cartões empilhados), ID 12 (apoio: tipografia cinética)
Objetivos: apresentar os três cuidados como capas que o visitante lê uma a uma e escolhe;
           dar à marca uma assinatura de abertura ligada ao próprio nome.
Como influenciaram a arquitetura: os serviços viraram uma sequência de três capas em vez de grade/lista;
           as três palavras da abertura viram as palavras-capa dos cartões e das opções do contato.
Componentes já usados nos comparados: TRAÇO 04 + 12 (lookbook, régua); PULSO 03 + 14 + 15.
O que foi deliberadamente evitado: lookbook, ficha fixa, barra inferior, régua, pin longo,
           foto que entra depois do texto, GSAP/ScrollTrigger.
Alternativas: cartões em fluxo quando não cabem; sem escala com movimento reduzido;
           sem JS a página inteira é legível e os rádios funcionam.
```

## 14. Recursos externos e licenças

- Fotos: Unsplash, Licença Unsplash (uso comercial permitido, sem atribuição obrigatória; os créditos foram mantidos). Páginas:
  - Andriyko Podilnyk: https://unsplash.com/photos/qobqtA9S0Rs
  - Laura Chouette: https://unsplash.com/photos/t1uTqt6qhWI
  - Milky Way Lashes: https://unsplash.com/photos/GEct9d7zgos
  - engin akyurt: https://unsplash.com/photos/-AXzdbotjKI
  - Ondrej Supitar: https://unsplash.com/photos/6omaRd0IG2w
  - Le Petit: https://unsplash.com/photos/Jp4POW00eE0
- Fontes: Instrument Serif e Familjen Grotesk, SIL Open Font License 1.1, via Google Fonts.
- Nenhuma biblioteca JavaScript.

## 15. Pendências

### BLOQUEANTES
- Nenhuma conhecida para a demonstração.

### RECOMENDADAS
1. Rodar `tools/baixar-recursos.ps1`, ativar `useLocalImages` e trocar o link das fontes por `css/fontes-locais.css`. Conferir na aba Rede que fotos e fontes vêm da pasta.
2. **Foto da capa:** a escolhida tem unhas claras. Se for possível licenciar uma foto como a referência enviada (unhas vinho sobre o olho), ela reforçaria o pilar "unhas" na primeira tela. A moldura e o `object-position` aceitam a troca direta.
3. Abrir num navegador comum, em tamanho real (1440 px), e rolar continuamente a pilha de cartões e a abertura para avaliar o ritmo com o painel visível.
4. Testar movimento reduzido real (Windows: Acessibilidade > Efeitos visuais > Efeitos de animação), leitor de tela (NVDA/TalkBack), toque físico e Safari/iOS.
5. Em celulares muito baixos (≤ 667 px de altura), os cartões ficam em sequência, sem empilhar. Se isso for importante, compactar a foto dos cartões nessas alturas.

### PUBLICAÇÃO COMERCIAL
- [ ] `contact.whatsapp` real e `demo.enabled: false`; testar se abre o WhatsApp certo.
- [ ] Instagram, dias e horários reais; endereço só se a cliente quiser exibi-lo.
- [ ] Cuidados reais em `config.cares` e nos cartões; confirmar com a profissional os prazos de manutenção de "O gesto" (hoje marcados como referência).
- [ ] Fotos da cliente com autorização de uso de imagem; remover "Foto ilustrativa" e os avisos de banco de imagens só quando as fotos forem dela.
- [ ] Remover o `noindex`; revisar `<title>`, `description` e `og:image` (de preferência uma foto real, 1200×630).
- [ ] Favicon com a marca da cliente, domínio e hospedagem.
- [ ] Fontes locais (LGPD: evita enviar o IP do visitante ao Google).
- [ ] Repetir a auditoria em 360, 390, 768, 1024 e 1440 px depois de trocar o conteúdo.
