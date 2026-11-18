# DESIGN_NOTES · Modelo 18 · LUME (Marmoraria)

Terceiro lote, último modelo. Implementado em 17/11/2026 e **revisado visualmente em 18/11/2026**
(identidade suave em ameixa, rosa mineral e azul-névoa, no lugar do azul-cobalto). A revisão foi
feita na própria pasta, sem `versoes` nem cópias; a página publicada em Portifolio-demos/Lume não foi tocada.

## O que mudou na revisão de 18/11
1. **Identidade**: paleta, fontes (Asul + Instrument Sans) e formas arredondadas, sem cobalto, amarelo nem cinzas.
2. **Abertura**: "LUME" menor, espaços verticais reduzidos, título e botão mais perto da primeira tela. No desktop, marca e mensagem comercial dividem a primeira linha e a foto vem logo abaixo; no celular, a ordem é marca, foto, título e botão.
3. **Comparador**: três estados (nenhuma, uma e duas referências), títulos integrados aos painéis (sem as faixas azuis) e foco tratado ao remover.
4. **Legendas do acabamento**: "Recorte da cuba" virou **"Cuba e bancada"**; "Encontro entre peças" virou **"Bancada com lateral até o piso"**; "Borda e espessura" foi reescrita para o que o recorte mostra. As demais descrições foram revistas pelo mesmo critério (ver "Legendas e textos alternativos").
5. **Texto de orientação**: "Envie fotos do ambiente e, se tiver, um desenho com medidas pelo WhatsApp." (abertura e contato).

## Conceito e identidade visual
Revista de interiores suave e fotográfica: branco porcelana como fundo, fotografias em destaque com
cantos arredondados, e a cor distribuída em blocos (rosa no comparador e nas notas, azul-névoa nas peças
e no rodapé, ameixa na marca, nos títulos, nos botões principais e no fechamento). Poucos contornos:
os blocos se separam por espaço e por mudança discreta de fundo. A pedra aparece sempre em ambientes
iluminados, sem filtros nem véus sobre as fotos. Símbolo: quadrado arredondado ameixa com "L" porcelana e um ponto rosa.

## Arquitetura implementada (seis seções, mais cabeçalho e rodapé)
1. **Abertura** (`#inicio`): "LUME" + "Marmoraria" + linha de serviço; título "Pedras sob medida para os espaços da sua casa" com o botão "Conversar sobre meu projeto" e a orientação do WhatsApp; foto horizontal (`eager`, `fetchpriority="high"`; 16:11 no celular, 16:8 até 900 px e 2,55:1 acima). No DOM, a ordem é marca, mensagem e foto; a ordem visual muda por CSS (grid) sem mexer na ordem de leitura. A legenda da foto é texto (o link do crédito fica no rodapé).
2. **Escolha o ambiente** (`#ambientes`): mural de 9 fotos (3 por ambiente), grade de 12 colunas no desktop com áreas nomeadas e alturas variadas, 2 colunas no celular; filtros em cápsulas.
3. **Duas referências, lado a lado** (`#comparar`): painel rosa mineral com três estados (abaixo).
4. **O acabamento visto de perto** (`#acabamento`): três recortes ampliados, com "Para conversar" em caixas rosa.
5. **Sob medida** (`#sob-medida`): painel azul-névoa com lista tipográfica (nome grande, etiquetas, texto, "Ajuda saber" e botão).
6. **Contato** (`#contato`): painel ameixa com mensagem sugerida, aviso de modo demonstração, local e horários fictícios.

## Paleta e tipografia
| Papel | Cor |
|---|---|
| Fundo predominante (branco porcelana) | `#FAF7FA` |
| Marca, títulos, botões principais, fechamento (ameixa) | `#542D4E` (hover `#3F2039`) |
| Comparador, notas, aviso de demonstração (rosa mineral) | `#E4C8D0` |
| Painel de peças, quadros de foto, rodapé (azul-névoa) | `#CBDDE2` |
| Texto (grafite violeta) | `#302B34` |
| Derivadas | texto secundário `#4F4755`; superfície discreta `#F3ECF1`; contorno de controles `#8A6A85` |

**Contrastes calculados (WCAG 2.x):** grafite/porcelana 13,0:1; grafite/rosa 8,9:1; grafite/azul-névoa 9,9:1;
secundário/porcelana 8,4:1; secundário/rosa 5,7:1; secundário/azul-névoa 6,3:1; ameixa/porcelana 10,6:1;
ameixa/rosa 7,2:1; ameixa/azul-névoa 8,0:1; botão principal (porcelana/ameixa) 10,6:1, hover 13,4:1;
botão rosa do contato (ameixa/rosa) 7,2:1; rótulos rosa sobre ameixa 7,2:1; contorno de controles/porcelana 4,4:1;
anel de foco ameixa sobre porcelana 10,6:1 e sobre rosa 7,2:1; anel porcelana sobre ameixa 10,6:1;
desabilitado `#6E6574`/porcelana 5,2:1.
Tipografia: **Asul** 400 (títulos, marca, nomes das peças; só o peso 400 é carregado, por isso sem negrito sintético) e **Instrument Sans** 400–700 (texto e interface). Formas: 24 px em painéis e fotos grandes, 20 px em cartões e fotos médias, 16 px em caixas pequenas; botões e filtros em cápsula.

## Direção fotográfica
10 fotografias (abertura 1, cozinha 3, banheiro 3, área gourmet 3), todas Unsplash (licença Unsplash,
não Unsplash+), escolhidas por mostrarem a pedra e a luz natural; renders foram descartados. As fotos
mantêm seus ativos e créditos da versão anterior. Os recortes do bloco "acabamento" são **ampliações de
fotos já usadas no mural** (retângulos explícitos em `DETALHES`), conferidos contra as legendas. No comparador,
a foto aparece **inteira**, centralizada num quadro azul-névoa (fotos de proporções diferentes não são cortadas).
Todas são ilustrativas, e a página diz que não são trabalhos da marca.

| Chave | Uso | Autor (Unsplash) | Página |
|---|---|---|---|
| capa | abertura (faixa horizontal) | GoodLifeConstruction | unsplash.com/photos/pQVP5QmskxM |
| coz1 | mural; comparação; recorte 'Bancada com lateral até o piso' | Jakob Owens | unsplash.com/photos/XKLZia7hPYI |
| coz2 | mural | Cat Han | unsplash.com/photos/VgyN_CWXQVM |
| coz3 | mural | Jason Briscoe | unsplash.com/photos/GliaHAJ3_5A |
| ban1 | mural; recorte 'Cuba e bancada' | Peter Muniz | unsplash.com/photos/wfMM98Vggn0 |
| ban2 | mural | Peter Muniz | unsplash.com/photos/9OKuf13OidA |
| ban3 | mural | Clay Banks | unsplash.com/photos/7Z2OTozIY_0 |
| gou1 | mural; recorte 'Borda e espessura' | Alef Morais | unsplash.com/photos/YTnLXCH0jWw |
| gou2 | mural | Alef Morais | unsplash.com/photos/OsUiWBJ4AXU |
| gou3 | mural | Alef Morais | unsplash.com/photos/aUsRyb_gPTI |

Observações: gou1, gou2 e gou3 são do mesmo fotógrafo (provável mesma sessão). O material do tampo
(granito, quartzito, quartzo, porcelanato…) **não é confirmado** nas fotos, por isso nenhuma descrição o nomeia.

## Legendas e textos alternativos (critério: só o que a imagem mostra)
- **Borda e espessura** (recorte de gou1): mostra o canto de uma bancada de tampo claro com borda espessa e lateral em tom marrom, com um deck de madeira ao fundo. O alt anterior citava um cooktop que não aparece no recorte; foi corrigido.
- **Cuba e bancada** (recorte de ban1): cuba integrada à bancada, torneira de parede preta acima. O texto trata da relação entre cuba, bancada e torneira; "rebaixada na própria peça" foi trocado por "integrada", pois a foto não permite afirmar a técnica.
- **Bancada com lateral até o piso** (recorte de coz1): o tampo da ilha continua pela lateral até o piso. O texto descreve o efeito visual e o que combinar (altura, espessura, quina, veios); **não afirma técnica de emenda**.
- Mural e comparador: "pedra" saiu das descrições das fotos (coz1, coz3, ban1, ban2, ban3 e abertura), "lateral em queda" virou "lateral até o piso", "cuba rebaixada" virou "cuba integrada", e "espesso" saiu de ban2, que não permite afirmar. "Pedra" continua no texto comercial das peças, que descreve o serviço, não a foto.

## Componentes e função comercial
- **Mural filtrável**: mostra a pedra instalada por ambiente antes do orçamento. Filtros em cápsula com `aria-pressed` (ativo = ameixa cheio). As escolhas se mantêm ao trocar de filtro. Foto escolhida: anel ameixa e selo "Referência N".
- **Comparador de até duas referências** (protagonista). Estados:
  - **0 escolhas**: no desktop, título e um cartão compacto com orientação e "Ir ao mural" dividem uma linha; no celular, painel curto. Sem espaços vazios.
  - **1 escolha**: a referência escolhida e um cartão compacto "Referência 2" convidando a escolher a segunda (e "Limpar escolha" / "Conversar sobre esta referência").
  - **2 escolhas**: comparação ampla (duas colunas a partir de 800 px; empilhada no celular, com "Remover" na cabeça de cada painel).
  Limite de 2 com orientação para remover uma, remoção individual, limpar tudo, estado em `sessionStorage` (só na aba) e botão que leva os nomes das referências ao WhatsApp. Atualizações mantêm o foco (no quadro que sobra ou, sem escolhas, no aviso) e são anunciadas em região `aria-live`. A troca de estado tem um esmaecimento curto (sem movimento reduzido, nenhum).
- **Acabamento visto de perto**: três recortes e o que conversar antes do corte.
- **Lista de peças**: composição tipográfica por linhas; cada botão abre uma mensagem específica.
- **Contato**: mensagem geral "Olá, LUME! Gostaria de conversar sobre uma peça sob medida para minha casa.".
- **Estados**: hover (rosa nos controles contornados, ameixa-escuro nos cheios), foco (anel de 3 px), selecionado (anel e selo), desabilitado (texto `#6E6574`, sem hover) e modo demonstração (faixa rosa no topo, aviso no contato e janela `<dialog>` com a mensagem).

### Diferença em relação aos modelos anteriores
- **LASTRO (12)**: escuro, painéis que se abrem e galeria em tela cheia; aqui o fundo é claro, o mural é uma grade aberta e a comparação é lado a lado.
- **ORLA / modelo 06**: desenho técnico e cotas; aqui só fotografia.
- **CADÊNCIA (13)**: também possui um comparador, então a comparação **não é exclusiva** do catálogo. A diferença está no conteúdo (duas fotos de ambientes com legendas factuais), na abertura tipográfica e no caminho até o WhatsApp.

## Decisões técnicas
- HTML, CSS e JavaScript puros; sem frameworks. **GSAP não usado**: filtros, comparação e a única animação (entrada da marca, uma vez) se resolvem com CSS e JS nativo. `prefers-reduced-motion` desliga transições, animações e a rolagem suave.
- `index.html` e `js/config.js` foram gerados de uma fonte única durante a criação; o resultado é HTML e JS comuns, sem build.
- Largura das seções: `width: min(100% - 2 × margem, 1560px)`; painéis (rosa, azul-névoa, ameixa) são as próprias seções com fundo e raio.
- Mural: áreas nomeadas por variáveis CSS (`--a` e `--v`); o filtro só alterna `hidden` e a grade da visão filtrada.
- Recortes: `<img>` absoluta posicionada por `--cx/--cy/--cw/--ch` num quadro com `aspect-ratio`.
- Âncoras: `scroll-padding-top` com a altura do cabeçalho fixo; menu do celular em cartão arredondado, fecha com Esc.
- Imagens: `srcset` em 480/800/1200/1600, `sizes` por foto, `width`/`height` reservados, `loading="lazy"` fora da abertura, preload da abertura.
- Contato: dados em `js/config.js`. Com `demo.enabled: true` ou número com menos de 12 dígitos, a janela de demonstração mostra a mensagem (com "Copiar mensagem"); com demonstração desligada e número válido, abre `wa.me` em nova aba.
- Sem JavaScript: mural e seções visíveis; filtros, "Comparar referência" e a comparação ficam ocultos (a comparação mostra um aviso) e os botões de contato levam a `#contato`.
- `noindex` ativo (demonstração). `theme-color` `#FAF7FA`; favicon e símbolo da marca refeitos nas cores novas.

## Recursos externos e licenças
- Fotos: Unsplash (Licença Unsplash), via CDN (`images.unsplash.com`); verificadas na seleção; revalidar antes da venda.
- Fontes: Asul e Instrument Sans (SIL Open Font License 1.1), via Google Fonts; versão local em `css/fontes-locais.css` (arquivos ainda não baixados).

## Testes realmente realizados (revisão de 18/11)
**Playwright (Python + Chrome) no ambiente de criação, em 390×844, 768×1024, 1024×768 e 1440×900, 126 verificações, todas aprovadas.** Limitações: as fotos do Unsplash foram **substituídas por imagens de teste com a mesma proporção** (a rede do ambiente é restrita) e as fontes do Google não carregaram (texto em fonte reserva); por isso este teste valida estrutura, geometria e comportamento, **não os recortes nem a tipografia reais**. Verificado em cada largura:
- sem erro de console/JS e sem rolagem horizontal; imagens com `src` carregam; proporções do mural variadas;
- título e botão da abertura dentro da primeira tela (390: botão termina em 666 px de 844);
- as cinco âncoras da navegação chegam abaixo do cabeçalho fixo (com movimento reduzido e, no 1440, também com rolagem suave);
- filtros (9/3/3/3 itens, `aria-pressed`), escolhas preservadas ao trocar de filtro;
- comparador: estados 0, 1 e 2, convite compacto (182 px), limite de 2 com orientação, foto inteira no quadro, remover (foco no quadro restante e, na última, no aviso) e limpar;
- mensagens: geral (texto exato), por peça, com os nomes das referências (modo demonstração, nada enviado) e modo real simulado (`window.open` interceptado, número fictício);
- teclado: Enter e Espaço no botão de uma foto (foco permanece), Esc fecha a janela e devolve o foco, foco visível de 3 px;
- CSS sem as cores antigas; com `prefers-reduced-motion: reduce` a animação da marca fica em ~0 e, sem preferência, está ativa (0,7 s) e a rolagem é suave.

**Navegador integrado do Claude Desktop (Live Server, fotos e fontes reais):** revisão visual do desktop (1440: abertura, mural, comparador nos três estados, acabamento, peças, contato e rodapé), do celular (390: abertura, comparador, acabamento, peças e contato), do 768 (abertura e comparador com uma escolha) e do 1024 (mural). Fotos e fontes (Asul 400 e Instrument Sans) carregaram.

## Problemas encontrados e corrigidos na revisão
- Botões "Pedir orçamento…" da lista de peças ficavam com larguras diferentes: coluna de largura fixa no desktop.
- Alt do recorte "Borda e espessura" citava um cooktop que não aparece no recorte; o recorte também avançava além da borda da foto (`cy + ch > 1`) e foi ajustado.
- Rótulos "Referência 1/2" do comparador eram faixas azuis; agora integrados ao painel.
- Ao remover a última referência, o foco ficaria num quadro oculto; agora vai para o aviso.
- Dois testes do Playwright falhavam por artefato do próprio teste (a expressão devolvia uma função que o Playwright executava); corrigidos e reexecutados.

## Pendências
**BLOQUEANTES**: nenhuma conhecida.

**RECOMENDADAS**
- Não foram feitos: leitores de tela (VoiceOver/NVDA/TalkBack), toque real, 360 px, alturas reduzidas, capturas de página inteira em todas as larguras, revisão visual do 1024 além do mural e do 768 além da abertura e do comparador, e rodada do Playwright com as fotos e fontes reais.
- Rodar `tools\baixar-recursos.ps1` e ativar `useLocalImages` e `fontes-locais.css`; ajustar o `<link rel="preload">` da abertura e o `og:image` para os arquivos locais. O script não foi executado.
- As prévias de desktop e celular do catálogo **não foram regeneradas**: são feitas pelo fluxo do Portifolio-demos (`copiar-modelo.ps1 -Origem 18-marmoraria-lume -Destino Lume`, depois commit e push, quando o GitHub Actions fotografa com o Playwright), que não executei e que depende da sua autorização.
- O nome curto da foto no mural (ex.: "Bancada com cuba integrada") difere do nome completo usado no comparador e no WhatsApp ("Bancada de banheiro com cuba integrada").

**PUBLICAÇÃO COMERCIAL**
- Número de WhatsApp real (`contact.whatsapp`), endereço, horários, nome e razão social do cliente; desligar o modo demonstração.
- Fotos reais do cliente no lugar das ilustrativas, ou revalidação das licenças das fotos Unsplash.
- Domínio, hospedagem, remover `noindex`, revisar metadados e `og:image`.
- Material das pedras: só citar nas legendas o que o cliente confirmar.
