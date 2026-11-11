# VÃO · Banho e Tosa — Notas de design e decisões técnicas

Modelo 11 do catálogo. Segunda landing page de estética pet (a primeira é o Bolha & Bento, modelo 05).
Marca fictícia: estúdio de banho e tosa **para cães**, com hora marcada.
Título: "Banho e tosa, com tudo combinado antes."

- **Versão atual: v4 (11/11/2026, revisão de identidade e serviços).**
- **Versão anterior: v3 (11/11/2026), a publicada em `Portifolio-demos/Vao/`.** As decisões da v3 que continuam valendo estão marcadas como mantidas; o que mudou está resumido na seção 11.

## 1. Objetivo comercial

A página atende dois visitantes:

- **Quem já sabe o que quer:** encontra "Consultar horários" no topo fixo e na capa, que levam direto ao contato.
- **Quem chegou pelo Google ou Instagram:** encontra "Como é a primeira visita?", que leva às três etapas da visita. Depois, vê os três serviços na galeria.

Quatro blocos: capa → sua visita → serviços (galeria) → contato, mais o rodapé. Sem formulário, depoimentos nem perguntas frequentes.

## 2. Arquitetura (v4)

1. **Faixa de demonstração** (lavanda clara, texto café). Some com `demo.enabled: false`.
2. **Topo fixo** (creme):
   - marca com o arco do vão, "Banho e tosa" e os links "A visita" e "Serviços";
   - botão café-escuro "Consultar horários";
   - abaixo de 760 px ficam só a marca e o botão;
   - abaixo de 430 px some o "Banho e tosa", para o botão não quebrar em duas linhas.
3. **Abertura** (`#inicio`, creme):
   - **a partir de 760 px:** duas colunas. À esquerda, "Banho e tosa para cães", o título, a linha de apoio e as ações. À direita, a foto dentro de um **arco largo** com batente lavanda, com respiro em volta (não sangra mais até a borda);
   - **no celular:** identificação, título, apoio e as duas ações primeiro; a foto vem depois, também em arco (quadrada, com o topo em semicírculo).
4. **Sua visita, do começo ao fim** (`#visita`, lavanda clara): mesma interação da v3 (seção 6), com a nova identidade.
5. **O que você pode marcar** (`#servicos`, creme): **galeria horizontal de três cartões** (seção 7).
6. **Consulte um horário** (`#contato`): painel lavanda claro com cantos arredondados sobre o creme, no lugar do bloco marinho de largura total. Dentro, a ação e o aviso à esquerda; endereço e horários em dois blocos creme à direita.
7. **Rodapé** (creme escuro): marca, aviso de marca fictícia, créditos das sete fotos (gerados do `config`) e "Voltar ao início".

## 3. Direção de arte (v4)

**Um estúdio de bairro acolhedor: creme quente, café e lavanda acinzentada, com formas suaves.** A ousadia fica no arco da capa; o resto é calmo.

- **O vão como arco.** A ideia de passagem virou o elemento gráfico da marca:
  - na capa, a foto fica dentro de um arco: o batente em lavanda e a foto como a passagem;
  - o mesmo arco aparece no símbolo ao lado do nome e no favicon;
  - a foto escolhida mostra a pessoa recebendo o cão justamente no vão de uma porta de varanda.
- **Raios proporcionais à hierarquia:**
  - pílula nos botões;
  - 1,75 rem nos cartões, no painel da visita e no painel do contato;
  - 1,25 rem nas fotos dentro deles;
  - 0,75 rem nos elementos pequenos;
  - o arco é o único semicírculo.
- **Amarelo-manteiga com moderação:** só no número da etapa aberta, na etiqueta "Inclui banho" e na marca lateral da mensagem de retorno do contato.
- **Café-escuro na ação principal:** "Consultar horários" (topo e capa) e "Consultar horários pelo WhatsApp".
- **Sem sombras, gradientes nem serifas.** A tipografia condensada mantém o tom direto e evita o visual de "creme + serifa" comum em páginas geradas.
- **Mantido da v3:**
  - numeração só nas etapas, porque são uma sequência;
  - sem rótulos em caixa alta e sem palavra destacada no título;
  - sem setas no texto dos botões. As setas da galeria são ícones, com rótulo acessível.

### Paleta

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| Creme | `#F6EEDF` | Fundo da página, capa, serviços, topo | — |
| Creme claro | `#FCF8F1` | Cartões, etapa ativa, painel da etapa, blocos de dados; texto do botão escuro | — |
| Creme escuro | `#ECE1CD` | Rodapé, linha do topo, borda dos cartões | — |
| Café | `#4A3327` | Texto principal | 10,2:1 no creme; 11,1:1 no creme claro; 9:1 na lavanda clara e no creme escuro |
| Café escuro | `#2E1F17` | Fundo da ação principal | 15:1 com o creme claro |
| Café 2 | `#6E5547` | Texto secundário | 6:1 no creme; 6,5:1 no creme claro; 5,3:1 na lavanda clara e no creme escuro |
| Lavanda clara | `#E5E0EC` | Seção da visita, painel do contato, batente do arco, faixa de demonstração | — |
| Lavanda | `#C3BBD3` | Filetes decorativos (1,6:1, só decoração) | — |
| Lavanda escura | `#6A6282` | Contornos de controles: botão secundário, botões da galeria, número das etapas | 4,95:1 no creme; 5,4:1 no creme claro; 4,4:1 na lavanda clara (mínimo para componentes: 3:1) |
| Manteiga | `#F1DA8A` | Etapa ativa, "Inclui banho", retorno do contato | 11,4:1 com o café escuro; 8,4:1 com o café |

Contrastes calculados pela fórmula da WCAG 2.2 (script em Python, nesta sessão). O foco visível é um contorno café de 3 px, que funciona em todos os fundos claros.

### Tipografia (mantida da v3)

- **Barlow Condensed** 700 nos títulos e 600 nos números e subtítulos. **Instrument Sans** (400–700) no texto e nos controles.
- **Capa:** a partir de 760 px, `clamp(3.25rem, min(6.6vw, 10.5svh), 6.5rem)`. A altura da janela também reduz o título, para as ações caberem na primeira tela em janelas baixas. Em 1280×600, com as fontes reais, as ações terminam a 585 px de 600.
- **Fontes de reserva:** "Arial Narrow", "Roboto Condensed", "Liberation Sans Narrow" e sans-serif nos títulos; "Segoe UI", system-ui e Arial no texto. Testadas com as fontes da web bloqueadas (seção 10).

## 4. Fotografia

Sete fotos da Unsplash, todas gratuitas sob a Licença Unsplash (nenhuma do Unsplash+).
- Em 11/11/2026, conferi na página de cada uma o título "Fotografia grátis na Unsplash" e a "Licença da Unsplash".
- Todas estão identificadas como ilustrativas.

| Papel | Foto (autor) | Recorte |
|---|---|---|
| **Capa (nova)** | [Mulher sorrindo na porta da varanda, inclinada para receber um labrador](https://unsplash.com/photos/Iujgc-QoLmo), de Karthik Sridasyam | Original 4:5. Desktop: arco 4:5 com ampliação de 1,12× ancorada em 72% 34%, que aproxima a pessoa e o cão e tira o objeto escuro desfocado do canto inferior esquerdo. Celular: arco 1:1, ponto focal 60% 28% |
| Chegada (v3) | [Golden retriever caminhando ao lado da tutora, com a guia](https://unsplash.com/photos/VehdYPKnX8Y), de Andriyko Podilnyk | 3:2 no celular, 16:10 no desktop |
| Banho e tosa, visita (v3) | [Mão escovando um filhote de pastor-australiano](https://unsplash.com/photos/DAhcXRQciY4), de Ayla Verschueren | Idem |
| Retirada (v3) | [Mulher rindo com o cão pulando no colo](https://unsplash.com/photos/Qdt8f7Tcle0), de Tamas Pap | Idem |
| **Banho, galeria (nova)** | [Labrador claro com toalha amarela nas costas, enxugado ao lado da banheira](https://unsplash.com/photos/xI5VJYa0jmE), de Vidak | 4:3, ponto focal 15% 40% |
| **Tosa higiênica, galeria (nova)** | [Mãos segurando a pata de um cão, com as almofadas e o pelo entre elas à mostra](https://unsplash.com/photos/NA2SJewfUTU), de H Wonder | Original vertical; 4:3, ponto focal 50% 52% |
| **Tosa completa, galeria (nova)** | [Cão de pelo claro e encaracolado, tosado por igual, de corpo inteiro na mesa com a guia de tosa](https://unsplash.com/photos/FLft9hFQ6DM), de or edri | 4:3, ponto focal 68% 50% |

- **Capa:**
  - cumpre o pedido: luz natural da varanda, ambiente visível (porta de correr, cadeira, varal de luzes) e o gesto de receber o cão com as duas mãos;
  - a porta reforça a ideia do vão, e os tons de madeira, creme e cinza combinam com a paleta;
  - **limite:** o cão aparece de costas, com o rosto escondido pela cabeça da mulher. A leitura é "o cão sendo recebido", não um retrato do cão.
- **Banho:** a toalha amarela conversa com a manteiga.
  - **Limite:** quem enxuga aparece só como braço em primeiro plano, desfocado.
- **Tosa higiênica:** detalhe de pata, um dos pontos da tosa higiênica descritos no cartão.
  - **Limite:** não mostra o corte em si, só a pata segurada.
- **Tosa completa:** corpo inteiro, pelagem curta e uniforme, fundo lavanda acinzentado e a guia de tosa.
  - **Limite:** o fundo parece de exposição ou salão, não de estúdio de bairro.
- **Descartadas:**
  - a foto da toalha-luva marrom, que é a mesma usada no Bolha & Bento e tem uma etiqueta de marca na luva;
  - cães enrolados em toalha sem ninguém enxugando;
  - um cão mordendo uma sacola;
  - o retrato de estúdio com samoieda (muito posado);
  - a foto de Buddy AN, também usada no Bolha & Bento.
- **Saiu:** a capa da v3 (Charlie Green, homem deitado na cozinha), substituída por uma foto de recepção.
- **Sem filtros, sobreposições ou redução de opacidade.** As únicas intervenções são recorte e a ampliação leve da capa no desktop.
- **Avisos de foto ilustrativa:**
  - sob a capa: "Imagem ilustrativa, de banco de imagens";
  - na visita: "Fotos ilustrativas… não mostram cães atendidos pelo VÃO";
  - sob a galeria: "Fotos ilustrativas, de banco de imagens";
  - na faixa de demonstração e no rodapé.

## 5. Componentes (formato do guia)

```text
Componentes escolhidos: ID 09 adaptado (lista + painel estável) para a visita,
  como protagonista; ID 13 (galeria horizontal) para os serviços, como apoio.
Objetivos:
  - 09: mostrar como o cão é recebido, o que se combina e como funciona a retirada.
  - 13: mostrar os três serviços com foto e descrição curta, sem empilhar
    cartões no celular, mantendo os três visíveis juntos no desktop largo.
Como influenciaram a arquitetura: a explicação vem antes dos serviços; as fotos
  ficam dentro das etapas e dos cartões, sem uma galeria separada.
Componentes já usados nos modelos comparados: 05 usa galeria editorial (02)
  e formulário com mensagem pronta; 07 (NEXO) usa o 09 para serviços.
O que foi deliberadamente evitado: rotação automática, setas fixas sobre as
  fotos, indicadores de bolinha, arrastar como único gesto, formulário.
Alternativas responsivas / reduzido movimento / sem JS: seções 6 e 7.
Pendências e testes observados: seções 10 e 12.
```

O ID 13 foi adaptado do repertório (`docs/guia_componentes_diferenciacao.md`).
- O catálogo publicado não tem um modelo "INTERFACE / LAB" para comparar (conferido em 11/11/2026).
- A implementação segue a descrição do guia: controles, indicação de continuidade, toque e alternativa de navegação.

## 6. Interação principal: "Sua visita, do começo ao fim" (mantida da v3)

- **Padrão:** sanfona (WAI-ARIA APG Accordion). Cada `h3` tem um `<button>` com `aria-expanded` e `aria-controls`; cada painel é `role="region"` com `aria-labelledby`.
- **Abaixo de 900 px:**
  - cada botão abre e fecha a própria etapa;
  - o painel aparece colado ao botão (distância medida: 0 px);
  - entre 600 e 899 px, foto e texto ficam lado a lado.
- **A partir de 900 px:**
  - sempre há uma etapa aberta, com lista lateral e painel de tamanho fixo;
  - os três painéis ocupam a mesma célula da grade, e a seção seguinte não se move nos três estados (medido de 900 a 1440 px).
- **Teclado:** Enter ou Espaço abrem; ↑ ↓ Home End movem o foco entre as etapas.
- **Sem JS:** as três etapas abertas. **Movimento reduzido:** transições a ~0.
- **Novo na v4 (só visual):**
  - o número da etapa virou um círculo, preenchido de manteiga quando a etapa está aberta;
  - no desktop, a etapa ativa e o painel ganharam fundo creme claro e cantos arredondados;
  - as fotos das etapas têm raio de 1,25 rem.
  - Controles, textos e comportamento não mudaram.

## 7. Galeria de serviços (ID 13)

**Função comercial:** o visitante compara os três cuidados de uma vez, cada um com uma foto que mostra o que acontece (enxugar, pata, corpo inteiro).
- As informações que evitam dúvidas ficam no próprio cartão: "Manutenção localizada" contra "Corte da pelagem", e a etiqueta "Inclui banho" nas duas tosas.
- Abaixo da galeria, a nota diz que o valor depende do porte e da pelagem.

- **Marcação:** um `div` rolável (`tabindex="0"`, `role="region"`, `aria-label="Serviços"`) com uma `ul` de três `li`. Cada cartão tem a foto, o nome (`h3`), a classificação, a etiqueta (nas tosas) e a descrição.
- **A partir de 1100 px:** os três cartões lado a lado numa grade de três colunas, sem rolagem e sem botões.
- **Abaixo de 1100 px:** trilho horizontal com `scroll-snap-type: x mandatory` e `scroll-snap-align: start`.
  - Entre 600 e 1099 px: dois cartões e cerca de 36% do terceiro visíveis.
  - Abaixo de 600 px: um cartão (74vw, até 21 rem) e cerca de 22% do próximo.
  - O trilho sangra até as bordas da moldura (margem negativa compensada por padding). Assim o cartão seguinte aparece cortado na borda da tela, e a página não ganha rolagem horizontal.
- **Deslize nativo:** toque, trackpad e roda do mouse. Com o trilho focado, as setas do teclado rolam e o snap alinha.
- **Botões "Serviço anterior" e "Próximo serviço":**
  - círculos de 48 px com ícone e rótulo para leitor de tela, ligados ao trilho por `aria-controls`;
  - só aparecem com JavaScript e quando há rolagem (o JS mede `scrollWidth` contra `clientWidth`, também ao redimensionar);
  - cada clique leva ao início do próximo cartão;
  - nas pontas ficam com `aria-disabled="true"` e opacidade reduzida. Não uso `disabled`, para o foco não se perder ao chegar ao último cartão;
  - a rolagem é suave, exceto com `prefers-reduced-motion`, quando é imediata.
- **Sem rotação automática.**
- **Sem JavaScript:** os três cartões estão no HTML, e o trilho rola na horizontal com toque, mouse e teclado. Os botões ficam ocultos (atributo `hidden`).
- **Peso:** ~2 KB de JS a mais, sem bibliotecas.

## 8. Contato (mantido da v3, com fundo revisado)

- **Fundo:** o marinho de largura total da v3 deu lugar a um painel lavanda clara com raio de 1,75 rem, dentro da moldura e sobre o creme. Endereço e horários ficam em dois blocos creme claro. A seção fecha a página sem pesar.
- **Mantido:**
  - o botão "Consultar horários pelo WhatsApp", com o destino vazio (`contact.whatsapp: ""`);
  - o aviso fixo "Atendimento desativado nesta demonstração. O botão não abre o WhatsApp e nenhuma mensagem é enviada.", ligado ao botão por `aria-describedby`;
  - a mensagem de status ao clicar;
  - a troca por um link `wa.me` só na versão comercial, com número válido e `demo.enabled: false`.
- **Dados:** endereço ("Rua Ilustrativa, 120 … Endereço fictício") e horários ("Horários de exemplo") vêm do `config.js`, com cópia no HTML para quem navega sem JS.

## 9. Diferenças em relação ao Bolha & Bento (modelo 05)

| | Bolha & Bento (05) | **VÃO v4 (11)** |
|---|---|---|
| Direção | Editorial divertido, revista de bichos | **Estúdio de bairro acolhedor: creme, café e lavanda, formas suaves** |
| Abertura | Logotipo de largura total, foto-sabonete sobreposta, chamadas de capa | **Duas colunas: título condensado à esquerda e foto num arco com batente à direita, com respiro** |
| Forma assinatura | Moldura-sabonete (cantos assimétricos) e plaquinha de coleira | **Arco de porta (o vão) na capa, no símbolo e no favicon** |
| Fotografia | Mosaico de 7 fotos com legendas em plaquinha | **Uma foto por etapa e uma por serviço, dentro dos componentes** |
| Serviços | Quatro tratamentos visuais diferentes, em blocos verticais | **Galeria horizontal de três cartões iguais, com snap e botões** |
| Peça central | Mosaico "Um dia de banho" | **"Sua visita": lista + painel estável / sanfona** |
| Conversão | Formulário com mensagem pronta | **Contato direto, sem formulário** |
| Público | Cães e gatos | **Só cães** |
| Tipografia | Fraunces SOFT + Figtree | **Barlow Condensed + Instrument Sans** |
| Paleta | Menta, coral, rosa, baunilha | **Creme, café, lavanda acinzentada e manteiga pontual** |

**Atenção à aproximação:** com a v4, os dois modelos de pet passaram a ter fundos claros e cantos arredondados.
- A diferença continua na estrutura: capa em duas colunas com arco × logotipo de largura total; galeria horizontal × mosaico; contato direto × formulário.
- Também continua na forma assinatura (arco × sabonete) e na tipografia condensada.
- Comparação feita com os arquivos e a nota do modelo 05; não abri capturas novas do 05 nesta sessão.

## 10. Testes executados (v4, 11/11/2026)

**A. Navegador integrado do Claude Desktop + Live Server** (`http://127.0.0.1:5500`). Motor: **Chromium** (Electron 45 do app). Fotos e fontes reais. As larguras acima de ~620 px foram emuladas, e as capturas saíram reduzidas.

- **Capa:**
  - 1440×900: ações a 777 px, arco de 405×506 px;
  - 1280×600: ações a 585 px, dentro da primeira tela;
  - 390×844: ações (até 549 px) antes da foto (a partir de 641 px);
  - recorte conferido visualmente em 1440, 1280×600 e 390.
- **Galeria:**
  - 1440: três cartões lado a lado, sem botões;
  - 768: botões visíveis. Dois cliques reais em "Próximo serviço" chegaram ao fim (`scrollLeft` = máximo), "Próximo" ficou com `aria-disabled="true"`, e o terceiro cartão apareceu inteiro;
  - 390: dois cliques até o último cartão, com as três fotos carregadas.
- **Visita e contato:** visual conferido em 1440 com a nova identidade.
- **Sincronização:** a ferramenta de cópia para a pasta do projeto às vezes gravava uma versão anterior do arquivo. Passei a copiar por um caminho novo a cada envio e a conferir o MD5 da cópia na pasta. Os arquivos finais foram conferidos assim.

**B. Playwright (Python) no ambiente de trabalho do Claude.** Motor: **Chromium 153 headless**. Esse ambiente não tem internet:
- as fontes da web foram bloqueadas, o que testou as fontes de reserva;
- as fotos foram trocadas por imagens de grade com as mesmas proporções (4:5, 3:2 e vertical), para conferir os recortes.

As capturas `vao-v4-capa-playwright.png` e `vao-v4-servicos-playwright.png` (entregues na conversa, fora da pasta do modelo) vêm desse ambiente: mostram as fotos substituídas e as fontes de reserva.

- **Larguras:** 1440×900, 1280×600, 1100×800, 1099×800, 1024×768, 900×800, 768×1024, 600×900, 390×844 e 360×640. Em todas:
  - `scrollWidth` igual à largura, antes e depois de rolar a galeria até o fim;
  - nenhum elemento fora da tela (fora do trilho);
  - nenhum erro de página.
- **Capa:**
  - as ações vêm antes da foto: abaixo dela no celular, na coluna ao lado no desktop;
  - as ações cabem na primeira tela em todas as larguras, exceto 1280×600 com as fontes de reserva (623 px de 600). Com as fontes reais, no item A, couberam;
  - proporção da foto: 0,8 (4:5) no desktop e 1 no celular.
- **Galeria:**
  - de 1100 px para cima: três cartões 100% visíveis e sem botões;
  - em 1099 px: dois cartões e 36% do terceiro, com botões;
  - em 390 e 360 px: um cartão e 22–23% do próximo;
  - em todas as larguras com rolagem, "Próximo serviço" leva até o último cartão inteiro (1 clique até 600 px, 2 no celular), e "Serviço anterior" volta.
- **Teclado (768):**
  - ordem de Tab: … etapas → "Serviço anterior" → "Próximo serviço" → trilho → botão do contato → créditos;
  - contorno de foco visível em todos;
  - Enter em "Próximo serviço" rolou o trilho, e a seta → com o trilho focado também;
  - a tecla End, com o trilho focado, não rolou na horizontal no Chromium headless (comportamento do navegador, não do código).
- **Movimento reduzido (390):** a rolagem do botão é imediata (`behavior: auto`), e o `scroll-behavior` da página fica `auto`.
- **Sem JavaScript, 1440 e 390:**
  - três cartões com nome, classificação, "Inclui banho" (2×) e a nota do valor;
  - botões ocultos;
  - trilho rolável no celular, com o último cartão alcançável;
  - três etapas abertas e aviso do contato visível;
  - sem rolagem horizontal na página.
- **Visita (regressão):** no desktop, a seção seguinte não se move nos três estados; no celular, o painel abre colado ao botão (0 px).
- **Contato (1440):** o clique não muda a URL nem abre aba, aparece a mensagem de status, o botão continua `<button>` e `contact.whatsapp` está vazio.

**Não testado:**
- WebKit/Safari (nem emulado nem em aparelho real) e Firefox;
- leitor de tela;
- preferência real de movimento reduzido do sistema;
- publicação da v4 no GitHub Pages. Não publiquei nem fiz commit; a versão publicada continua sendo a v3.

## 11. Mudanças da v3 para a v4

| Área | v3 | v4 |
|---|---|---|
| Paleta | Azul-marinho dominante, branco azulado, açafrão nas ações | Creme quente, café, lavanda acinzentada; manteiga pontual; café-escuro na ação |
| Formas | Ângulos retos | Raios proporcionais; pílulas nos botões; arco na capa |
| Capa | Bloco marinho + foto até a borda | Creme, foto em arco com respiro; nova foto de recepção |
| Marca | Contorno de porta retangular | Arco |
| Serviços | Três linhas tipográficas sem foto | Galeria horizontal (ID 13) com foto por serviço |
| Contato | Bloco marinho de largura total | Painel lavanda claro arredondado sobre o creme |
| Visita | — | Mesmos controles e comportamento; nova identidade visual |
| Créditos | 4 fotos | 7 fotos |

Problemas encontrados e corrigidos nesta revisão:

| Problema | Correção |
|---|---|
| Em 390 px o botão do topo quebrava em duas linhas | `white-space: nowrap` e "Banho e tosa" oculto abaixo de 430 px |
| A foto 4:5 num arco 4:5 não permitia ajustar o recorte, e um objeto escuro desfocado ocupava o canto inferior | Ampliação de 1,12× ancorada na pessoa |
| Em 1280×600 as ações da capa ficavam abaixo da primeira tela | Título, espaçamentos e largura do arco também limitados pela altura da janela |
| No celular só 13% do cartão seguinte aparecia | Cartão de 74vw (aparecem 22–23% do próximo) |
| O recorte do cartão Banho cortava a cabeça do cão | Ponto focal 15% 40% |
| Cópias para a pasta do projeto às vezes ficavam com a versão anterior | Envio por caminho novo e conferência de MD5 |

## 12. Pendências

### BLOQUEANTES
- Nenhuma identificada para a demonstração.

### RECOMENDADAS
1. **Fotos e fontes locais:** rodar `tools/baixar-recursos.ps1` (já inclui as 7 fotos), ativar `useLocalImages` e trocar o link das fontes por `css/fontes-locais.css`. Hoje a página depende de `images.unsplash.com` e do Google Fonts (LGPD).
2. **Fotografia:** os limites estão na seção 4. Num cliente real, as fotos do próprio estúdio resolvem todos eles; a primeira a trocar é a capa.
3. **Safari (iOS e macOS):** testar `border-radius` com raios elípticos em %, `aspect-ratio`, `100svh`/`svh` dentro de `min()`, `scroll-snap` com o trilho que sangra e `text-wrap: balance`. Testar também no Firefox.
4. **Leitor de tela:** anúncio do trilho ("Serviços", região), dos botões com `aria-disabled` e da sanfona.
5. **Movimento reduzido:** testar com a preferência real do Windows.
6. **Comparação no catálogo:** pôr a v4 e o Bolha & Bento lado a lado (seção 9, aproximação dos fundos claros).
7. **Playwright no Windows:** instalar o Node.js (com `npx`) para o Playwright do Claude Desktop funcionar, inclusive com WebKit.

### PUBLICAÇÃO COMERCIAL
- [ ] `contact.whatsapp` real e `demo.enabled: false`; testar se abre o WhatsApp certo.
- [ ] Endereço, horários, mapa e Instagram reais no `config.js` **e na cópia do HTML**.
- [ ] Revisar com o cliente o texto das etapas, os três serviços e o que cada um inclui.
- [ ] Trocar as fotos pelas do cliente, com autorização de uso de imagem; remover os avisos de "ilustrativa" só quando forem fotos reais.
- [ ] Atualizar ou remover os créditos da Unsplash (rodapé e `config.credits`).
- [ ] Remover o `noindex`; revisar `<title>`, `description` e `og:image`.
- [ ] Marca e favicon do cliente.
- [ ] Refazer a auditoria depois de trocar os textos: 360, 390, 768, 899/900, 1099/1100, 1440 e 1280×600, com teclado e sem JS. Descrições de serviço mais longas aumentam a altura dos cartões.
- [ ] Para atualizar o catálogo: `copiar-modelo.ps1 -Origem 11-estetica-pet-vao -Destino Vao`; commit e push pelo usuário.
