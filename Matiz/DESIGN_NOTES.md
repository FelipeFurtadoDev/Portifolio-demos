# MATIZ · Estúdio de beleza — DESIGN_NOTES

Modelo 15 do catálogo. Terceiro modelo do nicho unhas / cílios / sobrancelhas (após TRAÇO e ENTRE). Marca fictícia: estúdio de bairro, hora marcada, luz natural. **Demonstração: nenhuma conversa de WhatsApp é aberta enquanto `contact.whatsapp` estiver vazio.**

## 1. Conceito e identidade
- Promessa: mostrar o acabamento, explicar o que cada serviço inclui e levar direto ao WhatsApp.
- Metáfora visual: pincelada (cantos suaves, borda de pincel na faixa amarela, traço azul-névoa atrás do díptico). Poucos contornos largos.
- Sem réguas (TRAÇO), sem logo dividido, sem cartões empilhados e sem formulário de agendamento.

## 2. Arquitetura (5 seções + cabeçalho e rodapé)
1. **Abertura** `#inicio` — díptico assimétrico (mão com esmalte, grande; olhar com cílios e sobrancelha, pequena) e faixa amarela com título e “Ver horários no WhatsApp”. No celular, título e ação vêm antes das fotos.
2. **Menu de serviços** `#servicos` — três grupos abertos (`#unhas`, `#cilios`, `#sobrancelhas`), barra de atalhos fixa com destaque do grupo visível. Cada grupo tem uma **foto de atendimento** integrada ao título colorido e à lista (revisão de 16/11/2026, ver seção 11). Cada serviço: uma frase do que inclui + ação de WhatsApp com o nome do serviço.
3. **Detalhes do acabamento** `#detalhes` — 3 fotos em alta resolução, legenda “o que observar”, **Ver detalhe / Ver foto inteira**.
4. **O espaço e a visita** `#visita` — foto de ambiente + foto de atendimento, 4 passos da visita, bairro/endereço/horários (demonstrativos).
5. **Fale com o estúdio** `#contato` — WhatsApp em destaque, mensagem de exemplo, dúvidas rápidas (primeira visita, manutenção, remarcação). Sem campos.

## 3. Paleta e contraste (calculados)
| Token | Hex | Uso |
|---|---|---|
| oliva | `#35452D` | marca, títulos, fundo do contato |
| amarelo solar | `#F6C74F` | faixa da capa e ações principais (texto escuro) |
| azul névoa | `#D4E6EE` | fundo dos detalhes, traço da capa |
| branco quente | `#FBF8EF` | fundo principal |
| tinta | `#252722` | texto |
| derivados | `#4A4D44`, `#2A3824`, `#D7DFCB`, `#FFD36B`, `#BFD6E1` | texto suave, rodapé, texto sobre oliva, hover, bordas |

Pares: tinta/branco 14,2:1 · oliva/branco 9,7:1 · tinta/sol 9,5:1 · oliva/sol 6,5:1 · tinta/névoa 11,8:1 · oliva/névoa 8,0:1 · branco/oliva 9,7:1 · sol/oliva 6,5:1 · tinta-suave/branco 8,1:1. Amarelo nunca é texto sobre fundo claro (1,5:1). Foco: contorno oliva 3 px; amarelo dentro do contato e do rodapé.

## 4. Tipografia
**Asul** (400/700) nos títulos; **Source Sans 3** (400–700) no texto e nos controles. Public Sans não foi usada (não está no projeto). Carregadas pelo Google Fonts; `tools/baixar-recursos.ps1` baixa os arquivos locais e gera `css/fontes-locais.css`.

## 5. Fotografia
Dez fotos do Unsplash (sete originais + três do menu de serviços) (licença Unsplash: uso comercial permitido, atribuição não obrigatória, mas registrada). Todas rotuladas como **ilustrativas** e nunca atribuídas ao estúdio fictício. Servidas por `srcset` (URLs com `auto=format&q=72`); `useLocalImages: true` troca por `assets/img/` após rodar o script.

| Uso | Autor | Link |
|---|---|---|
| Abertura (mãos) | photo koala | unsplash.com/photos/EXVM7w4b_lo |
| Abertura (olhar) | Gabrielle Wright | unsplash.com/photos/YCMkMQevCIE |
| Detalhe unhas | Kambria Trout | unsplash.com/photos/8XgdwxIJQAQ |
| Detalhe cílios | Ali Shoaee | unsplash.com/photos/SdStLjkoWXM |
| Detalhe sobrancelhas | Mary Borozdina | unsplash.com/photos/5CnuyRFJjp4 |
| Ambiente | Gayane Khachatryan | unsplash.com/photos/aMnH1OgFmwM |
| Atendimento | Giorgio Trovato | unsplash.com/photos/gb6gtiTZKB8 |
| Menu · unhas | Ondrej Supitar | unsplash.com/photos/6omaRd0IG2w |
| Menu · cílios | Hayley Kim Studios | unsplash.com/photos/sRSRuxkOuzI |
| Menu · sobrancelhas | Stefan Vibes | unsplash.com/photos/-k0_8bZ4L8c |

Recortes: capa mobile 4:5 com `object-position: 50% 80%` (as unhas inferiores ficam visíveis); 600–899 px em 1:1; desktop ocupa a altura da linha, sem proporção fixa. Focos do zoom: unhas `0.46,0.42` ×2,5 · cílios `0.52,0.40` ×2,4 · sobrancelha `0.50,0.20` ×2,3 (o foco inicial dos cílios apontava para pele e foi corrigido).

## 6. Componentes (função comercial)
- **Díptico de abertura + faixa**: mostra o acabamento antes de qualquer texto e coloca a ação na primeira dobra.
- **Menu de serviços aberto com atalhos**: o cliente compara sem abrir sanfonas; cada linha já pede o serviço certo.
- **Zoom por quadro fixo** (Ver detalhe / Ver foto inteira): prova de acabamento sem mudar o layout. Transformação CSS (`--s/--tx/--ty`), foco calculado a partir de `data-foco` e `data-zoom`; transição só em `prefers-reduced-motion: no-preference`; Esc devolve à foto inteira; estado em texto (`role=status`).
- **Contato sem formulário**: abre o WhatsApp com saudação pronta; em demonstração, “Copiar mensagem de exemplo” com fallback de cópia manual (textarea somente leitura, texto selecionado).

Componentes escolhidos: ver pendência RECOMENDADA sobre os IDs do guia.

### Diferenças em relação aos anteriores
Comparação feita a partir do briefing e das notas dos modelos anteriores, **não** com capturas lado a lado:
- TRAÇO: usa réguas e linhas de medida como estrutura; MATIZ usa um díptico fotográfico e pincelada.
- ENTRE: logo dividido, cartões empilhados e formulário de agendamento; MATIZ tem menu aberto em lista, logo simples e contato sem campos.
- Ritmo: faixa amarela sobre foto → lista de serviços → fotos grandes com zoom → texto de visita → fecho oliva.

## 7. Decisões técnicas
- HTML/CSS/JS puros. **GSAP não foi usado**: CSS e JS nativos bastam para o zoom e o destaque do menu.
- Dados do cliente em `js/config.js` (`window.MATIZ_CONFIG`); nomes e “inclui” de cada serviço ficam no HTML para leitura sem JS.
- Modo demonstração: `isDemo = demo.enabled !== false || !número válido` (`/^55\d{10,11}$/`). Sem número válido nunca abre conversa.
- Sem JS: menu, fotos inteiras, serviços e contato continuam legíveis; apenas os botões de zoom ficam ocultos.
- Caminhos relativos; `noindex`; favicon SVG; `modelo.json` para o catálogo.
- Skill **Frontend Design**: não foi invocada na implementação inicial; foi **invocada** na revisão do menu de serviços (seção 11).

## 8. Testes realizados
**Playwright (Python + Google Chrome, no ambiente de trabalho, rede externa bloqueada: fotos e fontes remotas não carregam, então valem para layout, comportamento e console, não para o visual):**
- Sem rolagem horizontal em 360, 390, 600, 768, 900, 1024, 1100 e 1440 px, e em 1440×700, 1024×600 e 390×667.
- Botão da faixa dentro da primeira dobra em todas as telas testadas (a correção abaixo foi validada aqui).
- Tab: pular para o conteúdo, logo, menu, botão e atalhos com contorno de 3 px.
- Zoom por teclado: Enter amplia (quadro 495×660 não muda), texto do botão e estado atualizam; Esc volta e mantém o foco.
- Menu mobile: abre, `aria-expanded` correto, Esc fecha e devolve o foco ao botão.
- `prefers-reduced-motion`: transição 0 s e rolagem `auto`; sem a preferência: 0,5 s e `smooth`.
- Sem JavaScript: 9 serviços, texto “inclui” e mensagem visíveis, sem overflow.
- Modo real com configuração de teste (número fictício, sem enviar): links `wa.me/…?text=` corretos, inclusive com o nome do serviço.
- Fallback de cópia com área de transferência bloqueada: aviso, textarea visível e texto selecionado.
- Sem erros de página nem de console.

**Navegador integrado + Live Server (127.0.0.1:5500), com fotos reais:** capa em 1440×700, 1440×900, 1024×700, 768×1024 e 390×844; menu, destaque dos atalhos, zoom das 3 fotos (srcset escolhe 1500–1800 px), cópia por serviço em demonstração, visita e contato em 768 px, console sem erros. 27 URLs de imagem e 3 de fonte responderam OK.

### Revisão do menu de serviços — verificações (16/11/2026)
- **Playwright (Python + Chrome, sem rede externa: fotos e fontes remotas não carregam, então valem para layout, estrutura e console):** sem rolagem horizontal em 360, 390, 600, 640, 719, 720, 768, 839, 840, 1024, 1440 (e 1440×700); nenhum item da lista sobreposto à coluna foto + título; botões dos serviços com 46 px ou mais de altura; título (`h3`) antes da foto na ordem de leitura; `alt` descritivo, selo “Foto ilustrativa”, `srcset` com 4 larguras, `loading="lazy"` e `width/height` em cada foto; zoom, menu, cópia, `prefers-reduced-motion`, página sem JS e links `wa.me` (número fictício, sem enviar) repetidos sem regressão; nenhum erro de página.
- **Navegador integrado + Live Server (127.0.0.1:5500), com fotos e fontes reais:** as 3 fotos carregam (`complete`, srcset escolhendo 720 w no desktop); leitura da lista e botões em desktop 1440, tablet 768 e 640, celular 390 e 360; depois de usar cada atalho, o botão do primeiro serviço de cada grupo fica visível em 390×844 (732, 733 e 786 px de 844) e em 360×740 (683, 684 e 711 px de 740); console sem erros.
- Recortes revisados olhando as imagens renderizadas nos três tamanhos: pincel e unha (unhas), pinça e fios (cílios), sobrancelha e pinça (sobrancelhas) permanecem à vista.

**Não realizado:** capturas de página inteira arquivadas nas 5 larguras; teste em celular real (toque); GitHub Pages em subpasta; execução de `tools/baixar-recursos.ps1`; geração da prévia do catálogo; auditoria axe/leitor de tela.

## 9. Problemas encontrados e corrigidos
- Faixa amarela dentro da grade do díptico virava coluna estreita → movida para fora.
- Altura da capa ditada pelo tamanho intrínseco da foto → fotos `position:absolute; inset:0`.
- Unha inferior coberta pela foto pequena no mobile → novo `object-position`, sobreposição menor e variante 600–899 px.
- Foco do zoom dos cílios em pele → reposicionado.
- Em telas baixas (1440×700, 1024×600) o botão caía abaixo da dobra porque a foto pequena tinha `aspect-ratio` 4:3 → altura vem da linha (`min(86%, 38rem)`), altura mínima da foto grande 16 rem e capa mínima 30 rem.

- Âncoras dos atalhos: o `scroll-margin-top` do `.grupo` somava-se ao `scroll-padding-top` do `html`, e o grupo parava ~140 px abaixo do ponto certo (empurrando o primeiro botão para fora da tela no celular). Removido o `scroll-margin-top`; o recuo vem só do `scroll-padding-top`.
- Cache do Live Server: após editar o CSS, a página seguiu com a versão antiga; versões de `?v=` dos arquivos subidas para 2 e 3.
- Sincronização: uma cópia de `styles.css` chegou desatualizada ao computador (24.782 contra 25.230 bytes); reenviada e conferida pelo tamanho.

## 10. Pendências
**BLOQUEANTES:** nenhuma.

**RECOMENDADAS**
- Menu de serviços: as 3 fotos novas também dependem do Unsplash até rodar `tools/baixar-recursos.ps1` (agora baixa 10 fotos, incluindo `menu-unhas`, `menu-cilios` e `menu-sobrancelhas`).
- A foto de sobrancelhas mostra modelagem com pinça (combina com “Design com pinça”); não mostra escovação. Para o brow lamination, trocar por uma foto de escovação autorizada quando houver.
- Rodar `tools/baixar-recursos.ps1` (PowerShell no Windows) para usar fotos e fontes locais e ativar `useLocalImages: true`; sem isso a demonstração depende do Unsplash e do Google Fonts.
- Registrar os IDs dos componentes no formato do guia (seção 7) e anexar capturas lado a lado com ENTRE/TRAÇO.
- Capturas de página inteira nas 5 larguras e teste em celular real.
- Verificar em GitHub Pages (subpasta) após a publicação do catálogo.

**PUBLICAÇÃO COMERCIAL**
- Preencher `contact.whatsapp`, `demo.enabled: false`, bairro, endereço, horários, preços e durações (`showPrices`), Instagram.
- Trocar as fotos ilustrativas por fotos reais do estúdio e remover os créditos/rótulos “ilustrativa”.
- Domínio, hospedagem e reavaliar `noindex`; revisar textos com o cliente (regras de publicidade para serviços de estética).

## 11. Revisão: presença fotográfica no menu de serviços (16/11/2026)

**Pedido:** uma foto por grupo (unhas, cílios, sobrancelhas), integrada ao título e à lista, com luz natural, tons de pele preservados e enquadramento próximo; fonte conferida, autor registrado, alt descritivo, “ilustrativa”.

**Skill Frontend Design:** invocada. Decisão aplicada: sem cartões nem molduras novas; a foto passa a ser a “cabeça” de cada grupo e o bloco colorido do título (amarelo, azul-névoa, oliva) entra por cima da borda inferior dela, repetindo o gesto da faixa amarela sobre o díptico da abertura. Os cantos amplos da foto espelham os do título. Nenhuma animação nova.

**Composição**
- Desktop (≥ 840 px): coluna esquerda com foto quadrada e título sobreposto; lista à direita com nome, descrição, preço e botão como antes. A coluna deixou de ser fixa (sticky) porque agora tem a altura da lista.
- Tablet (720–839 px): mesma composição, foto 4:5 mais estreita.
- 600–719 px: coluna única, foto 16:10.
- Celular (< 600 px): foto 4:3 logo acima do título e, em telas com até 800 px de altura, 3:2 e título compacto; o primeiro serviço e o botão aparecem logo abaixo.
- Recorte por grupo (`--foco`): unhas 50% 52%, cílios 50% 48%, sobrancelhas 50% 55%.
- HTML: `h3` antes da `figure` (ordem de leitura); a ordem visual é invertida por CSS.

**Fotos escolhidas** (todas “Free to use under the Unsplash License”, páginas conferidas; arquivos com 2400 px de largura; distintas das fotos da capa, dos detalhes e da visita):
| Grupo | Autor | Página | O que mostra |
|---|---|---|---|
| Unhas | Ondrej Supitar | unsplash.com/photos/6omaRd0IG2w | manicure aplicando esmalte claro com pincel, mãos em primeiro plano |
| Cílios | Hayley Kim Studios | unsplash.com/photos/sRSRuxkOuzI | pinça posicionando fio de extensão, protetores sob os olhos |
| Sobrancelhas | Stefan Vibes | unsplash.com/photos/-k0_8bZ4L8c | pinça modelando a sobrancelha, outra mão esticando a pele |

**Candidatas descartadas:**
- nastiia nikitenko (U88HKDGynE4) e Bermix Studio (CqEGy4zAmbI): o título da página diz “sobrancelhas”, mas a imagem é de extensão de cílios; não usadas no grupo Sobrancelhas.
- Sum Sum (x0r5YvOJFCg): procedimento estético médico (preenchimento), fora do escopo.
- Fotos marcadas Unsplash+ (Getty): licença diferente, não usadas.
- Cipriano Bala (ToLhVLEbiRg): boa luz natural, mas enquadramento aberto e olho da cliente fora de vista.

**Textos alternativos:** descrevem o gesto (aplicação do esmalte; posicionamento do fio com pinça; modelagem com pinça). Legenda “Foto ilustrativa” sobre cada foto; créditos no rodapé (`credits` em `js/config.js`, mais lista estática para o caso sem JS).

**Limitações:** a foto de cílios tem tom de pele um pouco rosado no original e não foi editada; a de sobrancelhas mostra pinça, não escova. Sem GSAP.
