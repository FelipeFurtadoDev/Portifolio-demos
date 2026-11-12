# DESIGN_NOTES · Modelo 12 · LASTRO (versão 2, revisão pontual de 12/11/2026)

Histórico: a versão 2 (vitrine de ambientes e acabamentos) foi feita em 11/11/2026 a
partir de um briefing que chegou cortado em "A direção do LASTRO é editorial"; a
interpretação de "editorial" (revista de decoração) continua sendo minha e deve ser
confirmada. Em 12/11/2026 foi feita esta **revisão pontual**, editando a pasta original
sem criar cópias. A identidade escura, as cinco seções e as interações principais foram
mantidas. A página publicada em Portifolio-demos/Lastro não foi tocada.

## O que mudou na revisão
1. **Capa**: nova foto (bancada de pedra clara com borda espessa em primeiro plano, painel de pedra com veios atrás do fogão e marcenaria em madeira). Composição dividida: texto sobre o fundo escuro, à esquerda; foto à direita **sem escurecimento geral**, só uma emenda suavizada entre as duas (máscara de 16 %). No celular a foto fica inteira no alto (corte `66% 68%`) e o texto abaixo. A capa continua com `loading="eager"` e `fetchpriority="high"`.
2. **Detalhes**: as cinco fotos foram trocadas por close-ups nítidos (veios em fundo claro, veio branco em fundo escuro, recorte de cuba, quina e espessura, encontro entre dois níveis do tampo). As legendas saíram de cima da imagem (antes havia um degradê escuro cobrindo ~40 % da foto) e ficam abaixo dela. Legendas neutras: **não classificam acabamento** (polido, fosco, escovado etc.), porque nenhuma fonte confirma isso; também não citam nomes comerciais de pedra.
3. **Quarta seção (Peças + processo)**: peças viraram lista compacta em duas colunas (sem a coluna repetida "onde"); o processo ficou em quatro etapas: Conversa e levantamento, Definição da pedra e da peça, Preparação e acabamento, Instalação. Três etapas têm foto ilustrativa legendada; a **Instalação não tem foto** (ver pendências). A seção caiu de ~2840 px para ~1790 px a 390 px de largura.
4. **Luminosidade**: o escurecimento deixou de ser uniforme. Capa sem véu; painéis com sombra lateral mais leve (0,82 → 0,55 → 0); detalhes e galeria ampliada sem nenhum filtro; no celular o texto dos painéis abertos passou para um bloco próprio abaixo da foto (antes cobria a bancada). Mistura de fotos claras (capa, veios claros, mármore, encontro) com escuras (ilha escura, veio escuro, cozinha quente).
5. **Conteúdo**: "Ilhas e áreas gourmet" aparece no painel da Cozinha como destaque com foto própria (abre a galeria na foto da ilha); na Conversa entraram a opção "Tenho planta ou fotos para enviar" e a área recolhida "Adicionar medidas aproximadas" (unidade cm/m + campo de texto). Ambas só entram na mensagem pronta quando preenchidas; sem upload, sem cálculo de preço, e a conversa continua iniciável sem preencher nada.
6. **Sessão antiga**: o estado agora fica em `lastro-v3`, lendo `lastro-v2` se existir. Chaves removidas são descartadas, duplicatas eliminadas, e só fotos "guardáveis" entram. As chaves das fotos trocadas são novas (`vel1`, `vel2`, `bord1`, `enc1`, `ilha1`); `det1`, `det2`, `det3` e `det5` foram aposentadas e **nunca reaproveitadas**, para não associar uma referência antiga a uma foto diferente.

## Conceito e identidade visual
Dark premium acolhedora: marrom-café em vez de preto frio, areia clara no texto e um
único toque de latão (botões de seleção, contador, marcadores). Fotos grandes com a
pedra como assunto, títulos serifados e legendas que explicam o que olhar na pedra.
Marca LASTRO e símbolo em L mantidos.

## Arquitetura (cinco seções, mais cabeçalho e rodapé)
1. **Abertura** (`#inicio`): foto da ilha de pedra clara, promessa, dois botões e atalhos para os ambientes (agora na coluna do texto).
2. **Ambientes** (`#ambientes`): três painéis que se abrem (cozinha com 4 fotos, banheiro e lavabo com 3, sala e estar com 3), com galeria e "Guardar referência"; a Cozinha traz o destaque "Ilhas e áreas gourmet".
3. **Detalhes** (`#detalhes`): mosaico de 5 fotos e uma nota com três perguntas.
4. **Peças** (`#pecas`): seis peças sob medida (levam à conversa já indicadas) e o processo em quatro etapas (sequência real, por isso numerada).
5. **Conversa** (`#conversa`): referências guardadas, peças de interesse, "Para agilizar a conversa (opcional)", nome, cidade, observações e mensagem pronta.
Fora das seções: cabeçalho fixo com contador, rodapé com créditos e galeria em tela cheia (`<dialog>`).

## Paleta e tipografia
| Papel | Cor |
|---|---|
| Fundo | `#15110E` (café-escuro) |
| Superfícies | `#1D1814`, `#28211A`; linhas `#3B3228` |
| Texto / secundário | `#F2EADF` / `#BFB09D` |
| Acento (latão) | `#D1A566` |
| Botão principal | marfim `#EFE5D4` com texto `#1A140F` |

Contrastes (WCAG, calculados na versão 2 e inalterados, pois as cores não mudaram): texto/fundo 15,8:1; secundário/fundo 8,9:1; latão/fundo 8,3:1; botão marfim 14,6:1; placeholder/campo 4,6:1. O texto secundário sobre a superfície dos detalhes (`#BFB09D` sobre `#28211A`) não foi recalculado separadamente nesta revisão.
Tipografia: **Instrument Serif** (títulos) e **Geist** (texto e controles).

## Direção fotográfica
19 fotografias no catálogo (hero 1, cozinha 4, banheiro 3, estar 3, detalhes 5, processo 3). Licença conferida na página de cada foto nova ("Fotografia grátis", não Unsplash+). Todas são ilustrativas; a página diz que não são trabalhos da marca, e o processo traz a legenda "Ilustração: …" em cada foto e a nota "feitas em lugares diferentes. Não são obras da LASTRO".

| Chave | Uso | Autor (Unsplash) | Página |
|---|---|---|---|
| hero | capa (nova) | Salvo Media LLC | unsplash.com/photos/OATaOCo01UI |
| coz1, coz2, coz3 | cozinha (mantidas) | Taylor Friehl; Sam Moghadam; Franco Debartolo | mlCCSG79tL4; gAL2Bw94wbI; bkdcUE3x93g |
| ilha1 | cozinha, "Ilhas e áreas gourmet" (nova) | Irena Oze | Tf5QDU9xxMU |
| ban1, ban2, ban3 | banheiro (mantidas) | DP Singh Bhullar; serjan midili; Christian Mackie | OUBRXFjrZb8; mLx6oMw32PI; yb9b2wbhxG4 |
| est1, est2, est3 | sala e estar (mantidas) | Franco Debartolo (3) | 09wQcnwCFaE; G5jPfwxZRzQ; AEXgOReTzoM |
| vel1, vel2 | detalhes: veios (novas) | Akbar Nemati (2) | 2yp6ICVr2VM; zpUjTXCjsCw |
| det4 | detalhes: recorte da cuba (mantida) | Craig Lovelidge | 2v01Re71D6I |
| bord1 | detalhes: quina e espessura (nova) | Lisa Anna | myIiHEv81jc |
| enc1 | detalhes: encontro de níveis (nova) | Ceba Solutions | hlLXymONM5U |
| proc1 | processo 1, medição (nova) | Bermix Studio | bAGo7O4prtY |
| proc2 | processo 2, amostras de pedra (nova) | Declan Sun | RaTyAZrysv4 |
| proc3 | processo 3, corte de bancada (nova) | Annie Gray | WEWTGkPUVT0 |

Removidas nesta revisão: a capa anterior (laura adai, ilha escura com plantas e luminária, competia com a bancada) e `det1`, `det2`, `det3`, `det5` (Franco Debartolo; laura adai ×2; Sam Moghadam), por não demonstrarem o que a legenda prometia. Fotos analisadas e **rejeitadas** por enganarem sobre o serviço: uma máquina de corte de metal e um meio-fio de rua (buscas por "granite slab cutting") e fotos de assentamento de azulejo.
Links, autores e textos alternativos: `js/config.js` (`fotos`) e rodapé da página.

## Componentes e função comercial
- **Painéis de ambientes que se abrem** (adaptação do ID 02 do guia). Função: três ambientes com muita foto sem rolar três blocos longos. `aria-expanded`, botões reais, conteúdo fechado fora da ordem de tabulação. No celular o painel aberto vira foto no alto + bloco de texto (altura automática, sem animação de altura).
- **Destaque do painel** ("Ilhas e áreas gourmet"): botão com miniatura que abre a galeria da cozinha na foto da ilha. Função: deixar o tema identificável sem criar sexta seção.
- **Galeria em tela cheia** (`<dialog>` nativo): setas, teclado, deslize, Esc, foco devolvido ao botão de origem. Fotos de capa e processo não entram (`guardavel: false`).
- **Referências guardadas**: "Guardar referência" em fotos de ambientes e detalhes; contador no cabeçalho; bandeja na Conversa; `sessionStorage` (só nesta aba).
- **Mosaico de detalhes**: três colunas de altura igual, legenda abaixo de cada foto, nota com três perguntas.
- **Processo em quatro etapas** com foto ilustrativa nas três primeiras.
- **Mensagem pronta**: nome, cidade, peças, "Tenho planta ou fotos do ambiente para enviar na conversa." (se marcado), referências, "Medidas aproximadas (em centímetros|metros): …" (se preenchido), observações.

### Diferença em relação ao ORLA e à versão 1
Sem desenho técnico, cotas, amostras penduradas ou carimbo; a fotografia organiza a página, a navegação é por painéis e galeria e o orçamento virou conversa curta. A revisão aproximou a capa do que a marmoraria vende (a bancada), sem mudar essa diferença.

## Decisões técnicas
- HTML, CSS e JavaScript puros. **GSAP não usado**: painéis, galeria e a entrada da capa se resolvem com CSS e `<dialog>`.
- Uma única entrada orquestrada (capa); `prefers-reduced-motion` desliga transições e animações.
- Detalhes: figura em coluna flex; o botão da foto usa `aspect-ratio` por foto (`--r`) e `<img>` absoluta com `object-fit: cover`, para as colunas fecharem a mesma altura no desktop; abaixo de 1000 px vira grade natural.
- Capa: grade de uma célula; a foto recebe `margin-left` e uma máscara na borda esquerda. Texto e foto têm a mesma largura de transição, para as letras não passarem sobre a imagem.
- Dados centralizados em `js/config.js`; textos de seção no HTML (funcionam sem JavaScript).
- WhatsApp vazio e modo demonstração ligado: o botão só explica que nada foi enviado. Em modo real, abre `wa.me`.
- `noindex, nofollow` ativo. Cache: `?v=` nos CSS/JS (css 15, config 5, main 6).
- Modo local de fotos (`useLocalImages`, `tools/baixar-recursos.ps1`, atualizado para as 19 fotos = 57 WebP + 2 fontes) pronto, mas **não executado**.

## Recursos externos e licenças
Fotos: Unsplash (licença Unsplash). Fontes: Google Fonts, SIL Open Font License 1.1. Nenhum script de terceiros.

## Testes realmente feitos (revisão de 12/11/2026)
**Navegador integrado (Live Server, imagens reais da CDN):** capa em 1440×900, 1024×768, 768×1024 e 390×844; painel da Cozinha em 1440, 1024 e 390; painel Banheiro em 390; mosaico de detalhes em 1440 e 390; quarta seção em 1440 e 390; Conversa em 1440 e 390 com os campos novos; galeria ampliada em 1440 e 390 (a foto aparece sem filtro); carregamento das imagens dos detalhes e do processo (`naturalWidth > 0`); foto ampliada em 1600 px; Esc real (tecla) fechando a galeria e devolvendo o foco ao botão que abriu; guardar/remover referências, contador e bandeja; setas da galeria; mensagem com e sem material/medidas; aviso de demonstração no WhatsApp; sessão antiga (`lastro-v2` com `det1`, `det5`, `nada`, `hero`, `proc1` e `coz1` duplicada) resultando só em `coz1` e `det4`, sem erro.
**Playwright (Chrome do sandbox, fotos trocadas por imagem de teste, fontes bloqueadas), 0 falhas em ~55 verificações:** sem rolagem horizontal, erros de JS ou elementos fora da tela em 360, 390, 768, 1024 e 1440 px; cinco seções; 5 detalhes e 4 etapas; painéis e tabulação; destaque "Ilhas e áreas gourmet" por teclado (Enter) abrindo a galeria na foto da ilha (de 4) e Esc devolvendo o foco; capa `eager` com `fetchpriority="high"`; todas as imagens com largura/altura declaradas e alt; campos novos (medidas abrem por teclado, entram e saem da mensagem); sessão antiga; WhatsApp em demonstração e sem número; persistência; menu móvel por toque; `prefers-reduced-motion` (animação da capa desligada); página sem JavaScript.
**Não feito:** celular real, Firefox, Safari, leitor de tela, Lighthouse, teste de contraste dos textos novos com ferramenta própria, e a captura a 360 px com fotos reais (o 360 só foi testado com imagem de teste).
**Capturas** em `capturas/` (1440 e 1024 reduzidas a ~620 px pelo painel; 390 e 768 em tamanho natural).

### Problemas encontrados e corrigidos nesta revisão
- No celular, o texto dos painéis abertos cobria a bancada (a foto só mostrava o teto): bloco de texto separado abaixo da foto.
- Quarta seção longa no celular: peças com nome e botão na mesma linha, etapas em duas colunas.
- Texto da capa invadia a área da foto a 1024 px: largura do texto igualada à da emenda.
- Legenda da cuba falava em "lavatório" numa foto de cozinha: reescrita.
- Intervalo irregular entre título e texto das etapas (grade com `1fr`): coluna flex.
- A gravação de arquivos pelo conector deixou uma versão anterior na pasta duas vezes: tamanhos conferidos e arquivos gravados de novo.

## Pendências
**BLOQUEANTES:** nenhuma conhecida.

**RECOMENDADAS**
- **Instalação sem foto**: não achei foto gratuita adequada de instalação de bancada de pedra; a etapa usa só texto e o número. Substituir por foto real de obra do cliente.
- **Fotos do processo são ilustrativas e imperfeitas**: a de medição (`proc1`) mostra uma pessoa medindo junto a uma parede, não uma bancada; a de corte (`proc3`) mostra uma serra de esquadria sobre uma bancada de cozinha, sem confirmar que o material é pedra. As legendas dizem só "ilustração".
- Autenticidade das fotos: não consigo garantir se algumas (em especial as de Franco Debartolo: coz3, est1, est2, est3) são fotografias ou renders. Trocar por fotos do cliente na venda. Os materiais das fotos de detalhe são descritos só pelo que se vê ("pedra de grão fino", "mármore claro", "pedra marrom-escura"); nenhuma fonte confirma tipo ou acabamento.
- Rodar `tools\baixar-recursos.ps1` e ativar `useLocalImages` e as fontes locais antes de apresentar.
- Testar em celular real, Firefox e Safari, leitor de tela, Lighthouse; conferir 360 px com fotos reais.
- Apagar de `capturas/` as imagens da versão 1 que sobraram: `ajuda-celular-390.jpg`, `configurador-celular-390.jpg`, `configurador-desktop-1440.jpg`.
- A pasta `../_versoes/12-lastro-v1-configurador/` (criada por mim na rodada anterior) contraria a regra de não manter versões; foi deixada como está, aguardando autorização para remover.
- Na ordem de Tab, o mosaico segue as colunas; aceitável, mas pode ser reordenado.

**PUBLICAÇÃO COMERCIAL**
- Nome real, textos de peças, contato, WhatsApp (`contact.whatsapp`) e `demo.enabled: false`.
- Fotos reais do cliente (ou licença revisada), créditos atualizados; reavaliar a nota "feitas em lugares diferentes" e as legendas "Ilustração".
- Domínio, hospedagem, remoção do `noindex`, favicon e metadados.
- Conferir se "mármore, granito e quartzito", as peças e as quatro etapas correspondem ao que o cliente oferece.
- Catálogo (Portifolio-demos): rodar `copiar-modelo.ps1 -Origem 12-marmoraria-lastro -Destino Lastro`; as prévias são regeneradas pelo workflow quando o conteúdo da pasta muda (não executado aqui).
