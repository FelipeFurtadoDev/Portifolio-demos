# DESIGN_NOTES — 02 · Forma Doce | Confeitaria de celebrações

Registro de decisões visuais e técnicas para evitar repetição em modelos futuros do mesmo nicho.

## 1. Conceito visual

**Pop artesanal.** A página tem a postura de uma confeitaria independente com identidade de embalagem: campos de cor chapados, tipografia gorda e retrô, formas recortadas como adesivos e etiquetas, sombras deslocadas sem desfoque (como relevo de papel) e fotografia saturada como protagonista.

A marca deve parecer "desenhada para esta confeitaria", não um layout genérico com fotos de bolo. O elemento memorável é a **abertura**: o bolo de cerejas dentro de um arco de vitrine, ladeado pelo título dividido.

## 2. Paleta e tipografia

| Token | Hex | Uso |
|---|---|---|
| Baunilha | `#FFF2D9` | Fundo base, texto sobre campos escuros |
| Cereja | `#D83D48` | Acentos, frutas do selo, granulado do padrão |
| Cereja funda | `#C7303D` | **Variação criada** para campos com texto (hero, cabeçalho, botões). O `#D83D48` dá 4,49:1 com branco, abaixo do mínimo de 4,5:1 para texto comum; `#C7303D` dá ≈5,4:1 |
| Amora | `#8C3B68` | Seção de pedido, menu móvel, adesivo de presente |
| Morango | `#F6B9C6` | Faixa de caixas e kits, cartão de contato, selo, títulos sobre chocolate |
| Chocolate | `#30231F` | Texto, faixa de doces finos, processo, rodapé, sombras deslocadas |
| Glacê | `#FFFAF1` | Papel da comanda e do modal |
| Erro | `#A3122A` | Mensagens de validação |

- **Display:** Shrikhand (Google Fonts). Peso único, gordo e inclinado, com cara de letreiro de confeitaria. Usado em títulos, nomes dos adesivos, números das etapas e marca.
- **Texto:** Bricolage Grotesque (eixos `opsz`, `wdth` e `wght`). Legível em formulários e textos práticos e com personalidade própria. Observação: o "Q" da Bricolage tem uma cauda longa que lembra um sublinhado; é o desenho da fonte, não um bug.
- Nenhum rótulo em caixa alta, nenhum destaque de palavra isolada nos títulos.

## 3. Arquitetura da página

1. **Faixa de demonstração** (chocolate) — some com `demo.enabled: false`.
2. **Cabeçalho fixo** cereja, com a marca em selo oval inclinado.
3. **Abertura** — campo cereja; no desktop, grade de 3 colunas com `subgrid`: "Tem festa?" | arco com o bolo | "A gente faz o bolo." + texto + CTAs. O selo giratório leva a assinatura. A borda inferior é rendada (recortes de papel de bolo).
4. **Qual é a ocasião?** — quatro adesivos com formatos diferentes (círculo, etiqueta com furo, selo rendado e ingresso picotado). Funcionam como filtro: destacam no cardápio o que combina e preenchem a ocasião no formulário.
5. **Cardápio de encomendas** — três momentos com escala e fundo diferentes:
   - Bolos: retrato grande + fatia em recorte circular sobreposto ("por dentro").
   - Doces finos: faixa chocolate com a foto sangrando até a borda direita.
   - Caixas e kits: faixa morango, duas peças desencontradas (paisagem com canto curvo e retrato em pílula).
6. **Monte seu pedido** — fundo amora com padrão de granulado; o formulário é uma **comanda com canhoto picotado**, e o canhoto mostra a prévia da mensagem ao vivo.
7. **Do pedido à mesa** — foto documental em largura total (21:9); o título fica numa etiqueta cereja sobreposta; cinco etapas numeradas (é sequência real).
8. **Dúvidas + cartão de contato** (morango, fixo ao rolar no desktop).
9. **Encerramento** — foto de mesa de festa em largura total com cartão baunilha sobreposto.
10. **Rodapé** chocolate com borda rendada, assinatura e créditos.

## 4. Estratégia fotográfica

Todas as fotos são da Unsplash, com licença gratuita (Licença Unsplash), selecionadas visualmente no navegador. Cada uma tem um papel:

| Papel | Foto | Enquadramento na página |
|---|---|---|
| Protagonista | Bolo alto rosa com cerejas (Deva Williamson) | Arco 5:7, fundo branco da foto funde com a moldura baunilha |
| Produto: bolos | Bolo rosa com calda escorrida e casquinha (Katie Rosario) | Retrato 4:5, cantos arredondados |
| Close-up de fatia | Fatia com camadas e geleia de frutas vermelhas (Aneta Voborilova) | Círculo sobreposto, borda baunilha + sombra cereja |
| Doces finos | Brigadeiros com lascas e rosetas, foto feita no Brasil (Ediglecio Lêla) | Sangria total na faixa chocolate |
| Caixas para presente | Mãos segurando caixinha de doces (Ciocan Ciprian) | 3:2 com um canto de raio grande |
| Kits | Mini bolo "happy birthday" com vela na embalagem (Rehina Sultanova) | Pílula vertical com borda baunilha |
| Processo (mãos) | Mãos com saco de confeitar aplicando cobertura rosa, luz baixa (Mick Haupt) | Faixa 21:9 em largura total |
| Encerramento | Mesa de festa com bolos vermelhos e brancos estilo vintage (Createasea) | Largura total 16:7 com cartão sobreposto |

Sem filtros, sem sobreposição opaca, sem redução de opacidade. A única opacidade aplicada é o estado "não combina" do filtro de ocasião (35%), que volta a 100% quando o produto recebe foco.

Cada foto leva a etiqueta discreta "Foto ilustrativa", para não apresentar fotos de banco como trabalho da marca fictícia.

## 5. Elementos gráficos característicos

- Arco de vitrine na abertura.
- Selo circular giratório (SVG com `textPath`) com a assinatura e duas cerejas desenhadas.
- Bordas rendadas (gradiente radial repetido) no fim da abertura e no topo do rodapé. Só nesses dois pontos.
- Adesivos de ocasião com quatro formatos (CSS `border-radius`, `clip-path`, `mask` com SVG de recorte rendado e `mask` com picotes).
- Comanda com canhoto picotado e furos laterais.
- Padrão de granulado (SVG em `background-image`) na seção de pedido.
- Sombras deslocadas sólidas (sem desfoque) em botões, arco, comanda, cartões e no estado selecionado dos adesivos.
- Sublinhado ondulado (`text-decoration: wavy`) no hover do menu.

## 6. Interações

- Menu móvel (abaixo de 900 px) com `aria-expanded`, fecha com Esc, clique fora ou ao escolher um link.
- Adesivos de ocasião = botões `aria-pressed`; filtram o cardápio, anunciam o resultado em `aria-live`, oferecem "Ver o que combina no cardápio" e "Mostrar o cardápio inteiro", e sincronizam o campo Ocasião do formulário (e vice-versa).
- Botões "Pedir orçamento de…" pré-selecionam o produto no formulário.
- Formulário: o rótulo e a dica da quantidade mudam conforme o produto (pessoas, doces, caixas, kits); data mínima = amanhã; validação própria com mensagens por campo, `aria-invalid`, resumo em `role="alert"` e foco no primeiro erro.
- Prévia da mensagem atualizada a cada digitação.
- Envio:
  - modo demonstração ou número inválido → `<dialog>` com a mensagem pronta e botão "Copiar mensagem"; nada é enviado;
  - número válido e demo desligado → abre `https://wa.me/<número>?text=…`.
- A mensagem sempre termina com "Sei que o pedido só fica confirmado depois de combinarmos os detalhes", reforçando que o envio não é confirmação.
- Movimento: o único movimento automático é o selo girando (36 s por volta). Todo o resto responde a ações (hover/foco dos adesivos, botões que "afundam", acordeão). `prefers-reduced-motion` desliga o giro e as transições.

## 7. Diferenças em relação ao NÁRIA (Modelo 01)

| | NÁRIA | Forma Doce |
|---|---|---|
| Direção | Editorial sensorial, calma | Pop artesanal, energética |
| Abertura | Texto à esquerda, foto à direita | Composição simétrica: título dividido em volta de um arco central |
| Tipografia | Bodoni Moda (serifa de alto contraste) + Hanken Grotesk | Shrikhand (display gorda retrô) + Bricolage Grotesque |
| Cor | Fundo claro editorial com acento ameixa | Campos chapados saturados que se alternam por seção |
| Serviços | Abas com painel | Adesivos-filtro + cardápio em faixas de escala variada |
| Formulário | Formulário convencional | Comanda com canhoto e prévia ao vivo |
| Fotos | Tons suaves, enquadramentos retangulares | Saturadas, sete enquadramentos diferentes |
| Ornamento | Mínimo | Rendado, selo, granulado, sombras deslocadas |

**Para o próximo modelo do nicho de confeitaria/alimentação, evitar:** arco de vitrine na abertura, selo giratório, adesivos-filtro, comanda com canhoto, Shrikhand, sombras sólidas deslocadas e borda rendada.

## 8. Decisões técnicas

- HTML, CSS e JS puros, sem dependências além do Google Fonts.
- `js/config.js` concentra marca, modo demonstração, WhatsApp, Instagram, textos de atendimento, produtos do formulário (rótulos/unidades/limites), ocasiões e créditos das fotos.
- Textos de venda ficam no HTML, marcados com `<!-- EDITÁVEL -->`.
- Vínculo entre HTML e config por atributos: `data-product`, `data-product-card`, `data-occasion`, `data-occasions`.
- Imagens remotas da Unsplash com `srcset`/`sizes`, `width`/`height` (evita salto de layout), `loading="lazy"` abaixo da dobra e `preload` + `fetchpriority="high"` na protagonista.
- Grades com `minmax(0, 1fr)` explícito para impedir que a largura intrínseca das fotos force rolagem horizontal.
- `subgrid` no título da abertura (desktop). Navegadores sem suporte caem no layout empilhado.
- `<dialog>` nativo para o aviso (foco preso e Esc nativos); `alert()` como reserva em navegadores antigos.

## 9. Problemas encontrados e soluções

| Problema | Solução |
|---|---|
| `#D83D48` com texto branco fica com 4,49:1, abaixo do mínimo de 4,5:1 | Criado `--cereja-funda: #C7303D` para campos com texto; o tom original ficou para acentos |
| Rolagem horizontal de 15 px em 1024 px, causada pelo encerramento | A grade usava trilha `auto`, e a largura intrínseca da imagem (1600 px) forçava a coluna. Corrigido com `grid-template-columns: minmax(0, 1fr)` nas grades com foto |
| Na abertura a 1024 e 1440 px, o texto de apoio ficava longo demais na coluna estreita e empurrava os botões para baixo da dobra | Texto encurtado e espaçamento do título reduzido |
| Faixa de doces finos com foto muito alta no desktop (~1050 px) | Espaçamento interno e altura mínima reduzidos |
| A prévia da mensagem ficava sozinha no topo do canhoto | Bloco interno com `position: sticky` no desktop |
| Grande vazio entre as ocasiões e o cardápio | Espaçamento inferior da seção de ocasiões reduzido |
| Em 360 px, "Aniversário" quase encostava na borda do círculo | Tamanho mínimo do nome dos adesivos reduzido |
| A 768 px os adesivos em 2×2 ficavam enormes | Grade de 4 colunas a partir de 700 px |
| Ao escolher uma ocasião, o efeito no cardápio ficava fora da tela | Link "Ver o que combina no cardápio" na linha de status |
| O ambiente de criação não consegue baixar arquivos de imagem | Fotos servidas pela CDN da Unsplash, registradas como pendência no README |
