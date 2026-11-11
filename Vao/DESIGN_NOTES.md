# VÃO · Banho e Tosa — Notas de design e decisões técnicas

Modelo 11 do catálogo. Segunda landing page de estética pet (a primeira é o Bolha & Bento, modelo 05).
Marca fictícia: estúdio de banho e tosa **para cães**, com hora marcada. Nome provisório aprovado: VÃO.
Título: "Banho e tosa, com tudo combinado antes."
Data: 11/11/2026.

## 1. Objetivo comercial

A página atende dois visitantes:

- **Quem já sabe o que quer:** encontra "Consultar horários" no topo fixo e na capa, que levam direto ao contato.
- **Quem chegou pelo Google ou Instagram:** encontra "Como é a primeira visita?" na capa, que leva às três etapas: como o cão é recebido, o que se combina com a equipe e como funciona a retirada.

Quatro blocos, nesta ordem: capa → sua visita → serviços → contato, mais o rodapé. Não há galeria, depoimentos, perguntas frequentes nem formulário.

## 2. Arquitetura implementada

1. **Faixa de demonstração** (marinho, texto pequeno). Some com `demo.enabled: false`.
2. **Topo fixo** (marinho): marca com o desenho do vão, "Banho e tosa", links "A visita" e "Serviços" e o botão amarelo "Consultar horários". Abaixo de 760 px ficam só a marca e o botão (não há menu, porque a página é curta e a capa já leva às seções). Abaixo de 380 px some o "Banho e tosa" ao lado da marca.
3. **Abertura** (`#inicio`):
   - **a partir de 760 px:** duas colunas iguais. À esquerda, o bloco marinho com "Banho e tosa para cães" no alto e, na base, o título, a linha de apoio e as ações. À direita, a fotografia ocupa a coluna inteira, até a borda da tela;
   - **a partir de 1024 px:** a capa ocupa a primeira tela (entre 34 e 52 rem de altura). Entre 760 e 1023 px a altura vem do texto, para a foto não virar uma fatia estreita em tablets em pé;
   - **no celular:** identificação, título, apoio e ações primeiro; a foto vem depois, em 5:4.
   - Ações: "Consultar horários" (→ `#contato`) e "Como é a primeira visita?" (→ `#visita`).
4. **Sua visita, do começo ao fim** (`#visita`, branco azulado): interação principal (seção 6).
5. **O que você pode marcar** (`#servicos`, branco azulado claro): três linhas tipográficas largas (Banho, Tosa higiênica, Tosa completa), separadas por filetes. Cada linha tem o nome grande, uma classificação curta e a descrição. Abaixo, a nota de que o valor depende do porte e da pelagem.
6. **Consulte um horário** (`#contato`, marinho): título, texto, botão "Consultar horários pelo WhatsApp", aviso de demonstração e, ao lado, "Onde estamos" e "Horários".
7. **Rodapé** (marinho): marca, aviso de marca fictícia, créditos das fotos (gerados do `config`) e "Voltar ao início".

## 3. Direção de arte

**Um estúdio de bairro organizado.** Blocos retangulares de cor, linhas finas, alto contraste e poucos elementos por bloco. A ousadia fica concentrada no título condensado da capa; o resto é disciplinado.

- **O vão.** O nome vira o único elemento gráfico próprio: um contorno de porta (três lados de um retângulo) ao lado do nome, no topo e no favicon. Não foi espalhado pela página.
- **Retângulos e filetes:** botões, fotos e etapas sem cantos arredondados. Os filetes separam as etapas, os serviços e os dados de contato.
- **Numeração só onde há sequência:** 1, 2 e 3 aparecem apenas nas etapas da visita. Os serviços não são numerados.
- **Amarelo só para ação e estado ativo:** botões de ação, a barra da etapa aberta, o foco nos fundos marinhos e a borda da mensagem de retorno do contato.
- **Evitado de propósito:** rótulos em caixa alta, palavra destacada no título, setas nos botões, cartões arredondados, sombras e gradientes.

### Paleta

| Token | Hex | Uso | Contraste |
|---|---|---|---|
| Marinho | `#15264A` | Capa, topo, contato, rodapé; texto principal no claro | 13:1 na névoa, 14,1:1 no papel |
| Marinho 2 | `#22396A` | Hover do botão de contorno, linhas sobre o marinho, fundo do retorno do contato | — |
| Névoa (branco azulado) | `#EAF0F7` | Seção da visita | — |
| Papel (branco azulado claro) | `#F6F9FC` | Fundo geral, serviços, etapa ativa no desktop | — |
| Tinta 2 | `#46587A` | Texto secundário no claro | 6,2:1 na névoa, 6,8:1 no papel |
| Sobre o marinho | `#C9D5E8` | Texto de apoio sobre o marinho | 10:1 |
| Linha escura | `#8A9BB8` | Notas pequenas e filetes sobre o marinho | 5,3:1 |
| Filete forte | `#7F90AE` | Contornos e separadores das etapas e serviços no claro | 3,06:1 (mínimo para componentes) |
| Açafrão | `#F2B21B` | Ações e estados ativos, sempre com texto marinho | 7,9:1 |
| Açafrão claro | `#FFC94A` | Hover das ações | — |

Contrastes calculados pela fórmula da WCAG 2.2 (script em Python, nesta sessão).

### Tipografia

- **Barlow Condensed** 700 nos títulos (capa, seções, nomes das etapas) e 600 nos nomes dos serviços, nos números das etapas e nos subtítulos do contato. Sempre em caixa baixa com inicial maiúscula.
  - Capa: de 3 rem (celular) a 7 rem (1440 px), entrelinha 0,92, com `max-width: 11ch` e `text-wrap: balance`. Fica em quatro linhas no desktop e no celular.
  - Serviços: de 3 a 6,5 rem.
- **Instrument Sans** (400–700) no texto, nos botões e nos rótulos.
- **Fontes de reserva:** "Arial Narrow", "Roboto Condensed", "Liberation Sans Narrow" e sans-serif para os títulos; "Segoe UI", system-ui e Arial para o texto. Testadas com as fontes da web bloqueadas (seção 10): o título da capa passa a ocupar cinco linhas, sem rolagem horizontal e com as ações ainda na primeira tela em 1440×900.

## 4. Fotografia

Quatro fotos da Unsplash, todas gratuitas sob a Licença Unsplash (nenhuma do Unsplash+). Foram escolhidas visualmente no navegador, entre cerca de 400 miniaturas de 25 buscas. Título de cada página conferido em 11/11/2026 como "Fotografia grátis na Unsplash", com a "Licença da Unsplash".

| Papel | Foto (autor) | Recorte |
|---|---|---|
| **Capa** | [Homem deitado no chão da cozinha olhando um cão de pelo encaracolado](https://unsplash.com/photos/4UP9eSHz8tQ), de Charlie Green | Desktop: coluna inteira, `object-position: 57% 45%`. Celular: 5:4, `85% 40%`, que tira o pano de prato natalino do canto esquerdo |
| **Chegada** | [Golden retriever caminhando na calçada ao lado da tutora, com a guia visível](https://unsplash.com/photos/VehdYPKnX8Y), de Andriyko Podilnyk | 3:2 no celular, 16:10 no desktop |
| **Banho e tosa** | [Mão escovando a cabeça de um filhote de pastor-australiano, com a outra mão no focinho](https://unsplash.com/photos/DAhcXRQciY4), de Ayla Verschueren | Idem, `58% 45%` |
| **Retirada** | [Mulher rindo enquanto o cão pula no colo e encosta o focinho no rosto dela](https://unsplash.com/photos/Qdt8f7Tcle0), de Tamas Pap | Idem, `60% 40%` |

- **Coerência:** luz natural, tons neutros (cinza, madeira, branco) e enquadramento documental. Nenhuma foto de cão em fundo branco de estúdio fotográfico nem fantasiado.
- **Capa:** cão de porte médio à altura dos olhos de uma pessoa deitada no chão, com luz lateral da janela, textura do pelo visível e um gesto natural (mão no queixo, cão encostando o focinho). O recorte funciona em 1440, 1024, 768, 390 e 360 px (capturas conferidas).
- **Sem filtros, sobreposições ou redução de opacidade.** A única intervenção é o recorte.
- **Avisos:** "Imagem ilustrativa, de banco de imagens" sobre a foto da capa; "Fotos ilustrativas… não mostram cães atendidos pelo VÃO" sob as etapas; faixa de demonstração e rodapé.
- **Fotos descartadas:** retrato de estúdio com samoieda (iluminação de ensaio, muito posado), escova a vácuo com mangueira (parece anúncio de produto), cão em pet shop com marcas visíveis e fotos em preto e branco.

### Desvios em relação ao briefing

1. **Capa: ambiente doméstico, não um estúdio.** Não encontrei, entre as fotos gratuitas, uma imagem de cão adulto de porte médio sendo recebido num salão de banho e tosa com a qualidade de luz e gesto pedidos. A foto escolhida tem tudo o que o briefing pede de enquadramento (altura dos olhos, luz lateral, textura, gesto), mas a cena é uma cozinha e a pessoa parece ser o tutor, não a equipe.
2. **Chegada: calçada, não a porta do estúdio.** Mostra o cão chegando com a tutora e a guia visível, em plano médio, mas não há fachada nem recepção. O rosto da tutora não aparece.
3. **Banho e tosa: plano médio, não detalhe.** A escova e as duas mãos estão em evidência, com a textura do pelo visível, mas o enquadramento é mais aberto que um detalhe, e o cão é um filhote. O fundo de tijolos e o piso não identificam um salão profissional.
4. **Retirada:** o gesto é espontâneo, mas o fundo é uma parede lisa, sem contexto de retirada (balcão, porta).

Recomendação: na versão de um cliente real, substituir as quatro por fotos do próprio estúdio, nesta ordem de prioridade: capa, chegada e retirada.

## 5. Interação principal: "Sua visita, do começo ao fim"

**Função:** explicar uma sequência de atendimento. Não é um seletor de serviços.

**Padrão escolhido: sanfona (WAI-ARIA APG Accordion)**, com duas apresentações visuais:

- **Marcação:** cada etapa tem um `h3` com um `<button>` (`aria-expanded`, `aria-controls`) e um painel `role="region"` com `aria-labelledby`. A mesma marcação serve para o celular e para o desktop, então não há troca de papéis ARIA no ponto de quebra.
- **Por que não abas:** no desktop, abas seriam o padrão mais óbvio, mas o celular precisa do conteúdo "junto ao controle", o que exige botões e painéis intercalados. Uma `tablist` com painéis no meio seria inválida. Com a sanfona, o comportamento de teclado é o mesmo nas duas larguras.
- **Celular e tablet (< 900 px):** cada botão abre e fecha a própria etapa, e várias podem ficar abertas. O painel aparece logo abaixo do botão (distância medida: 0 px). Chegada começa aberta; Retirada pode ser aberta diretamente. Entre 600 e 899 px, foto e texto ficam lado a lado dentro da etapa.
- **Desktop (≥ 900 px):** sempre há exatamente uma etapa aberta. Os botões formam a lista lateral (coluna de 13,5 a 21 rem), e o painel ocupa a coluna da direita.
  - **Painel estável:** os três painéis ficam na mesma célula da grade (`grid-row: 1 / 5`). A área tem a altura do maior painel, e os ocultos ficam com `visibility: hidden`. Nada abaixo se move ao trocar de etapa (posição da seção seguinte medida nos três estados, em 900, 1024, 1280 e 1440 px).
  - **Fotos sem deformação:** `aspect-ratio` fixo (16:10) e `object-fit: cover`; proporção medida igual nos três estados.
  - Clicar na etapa já aberta não faz nada; ela continua aberta (`aria-expanded="true"`).
  - **Estado ativo:** barra açafrão à esquerda, fundo papel, número e nome em marinho. As inativas ficam com o nome em cinza-azulado.
- **Teclado:** Tab passa pelos três botões; Enter ou Espaço abrem; ↑ ↓ circulam entre as etapas; Home e End vão à primeira e à última. O contorno de foco é marinho, de 3 px.
- **Troca de largura:** ao passar do celular para o desktop com várias etapas abertas, fica a última que a pessoa abriu.
- **Sem JavaScript:** as três etapas aparecem abertas, uma abaixo da outra, com foto e texto. A grade lateral, os sinais de +/− e o fechamento dependem da classe `.js`, que só é aplicada quando o JavaScript roda.
- **Movimento:** no desktop, troca por opacidade (180 ms); no celular, o painel entra com opacidade e um deslocamento de 0,35 rem (180 ms). Com `prefers-reduced-motion: reduce`, as durações vão a ~0 e a rolagem suave é desligada.
- **Por que não GSAP:** CSS e algumas linhas de JS bastam; nenhuma biblioteca foi usada.

## 6. Contato

- **Sem formulário e sem simulação de reserva.** O botão "Consultar horários pelo WhatsApp" fica acompanhado, o tempo todo, do aviso "Atendimento desativado nesta demonstração. O botão não abre o WhatsApp e nenhuma mensagem é enviada." (ligado ao botão por `aria-describedby`).
- **Ao clicar (demonstração):** aparece uma mensagem num `role="status"`: "Nada foi aberto nem enviado. Na versão do estúdio, este botão abre o WhatsApp com a pergunta sobre horários já escrita." Não abre aba, não muda a URL e não chama `window.open`.
- **Versão comercial** (`demo.enabled: false` + número válido `55DDDNÚMERO`): o botão vira um link `https://wa.me/<número>?text=<mensagem>`, e a faixa e o aviso somem. Com `demo.enabled: false` e número vazio ou inválido, o botão explica que o WhatsApp não foi configurado e avisa no console.
- **Dados:** endereço ("Rua Ilustrativa, 120, Vila Exemplo, São Paulo", marcado "Endereço fictício") e horários (marcados "Horários de exemplo") vêm do `config.js`. O HTML guarda a mesma cópia para quem navega sem JS. Link do mapa e Instagram aparecem só se forem preenchidos.
- **Nada inventado como real:** não há telefone, avaliação, certificação, número de atendimentos, preço nem selo.

## 7. Diferenças em relação ao Bolha & Bento (modelo 05)

| | Bolha & Bento (05) | **VÃO (11)** |
|---|---|---|
| Direção | Editorial divertido, revista de bichos | **Estúdio de bairro organizado: retângulos, filetes e alto contraste** |
| Abertura | Logotipo de largura total como cabeçalho de revista, foto-sabonete sobreposta, chamadas de capa | **Duas colunas: bloco marinho com título condensado e foto documental até a borda** |
| Fotografia | Mosaico de 7 fotos em grade, legendas em plaquinha | **Uma foto por etapa da visita, dentro da sequência** |
| Serviços | Quatro tratamentos visuais diferentes (foto alta, bloco rosa, foto larga, campo de etiquetas) | **Três linhas tipográficas amplas separadas por filetes, sem foto** |
| Peça central | Mosaico "Um dia de banho" | **"Sua visita": lista lateral + painel estável / sanfona** |
| Conversão | Formulário de quatro campos com mensagem pronta | **Contato direto, sem formulário** |
| Público | Cães e gatos | **Só cães** |
| Tipografia | Fraunces SOFT + Figtree | **Barlow Condensed + Instrument Sans** |
| Paleta | Menta, coral, rosa, baunilha | **Azul-marinho, branco azulado e açafrão** |
| Forma | Cantos de sabonete, plaquinha com furo | **Ângulos retos, contorno de porta** |

Sem cores e fotos, a página continua distinta: duas colunas retas na capa, uma lista numerada ao lado de um painel e linhas de serviço com nomes enormes.
Comparação feita com os arquivos e a nota do modelo 05; não foram abertas capturas novas do 05 nesta sessão.

### Componentes (formato do guia)

```text
Componentes escolhidos: ID 09 adaptado (lista + painel estável), como protagonista.
  Aqui a lista explica as etapas de um atendimento, não serviços. Sem componente de apoio.
Objetivos: mostrar a quem chega pelo Google como o cão é recebido, o que se combina
  e como funciona a retirada, antes de pedir o contato.
Como influenciaram a arquitetura: a explicação vem antes dos serviços, e as fotos
  estão dentro das etapas (não há galeria).
Componentes já usados nos modelos comparados: 05 usa galeria editorial (02) e
  formulário com mensagem pronta; 07 (NEXO) usa o 09 para serviços.
O que foi deliberadamente evitado: galeria, cartões de serviço, formulário, segundo
  efeito visual, logotipo de largura total, chamadas de capa.
Alternativas responsivas / reduzido movimento / sem JS: sanfona abaixo de 900 px;
  transições a ~0 com movimento reduzido; três etapas abertas sem JS.
Pendências e testes observados: seções 10 e 12.
```

O briefing não pediu um componente de apoio, e não acrescentei nenhum.

## 8. Decisões técnicas

- HTML, CSS e JS puros. Caminhos relativos em tudo (compatível com subpasta do GitHub Pages).
- `<meta name="robots" content="noindex, nofollow">` (demonstração).
- `html.js` é aplicado num script curto no `<head>`. Sem ele, todo o conteúdo fica visível.
- `[hidden] { display: none !important; }` (lição do modelo 04).
- `scroll-padding-top` compensa o topo fixo: os títulos de destino ficam a 208 px do topo em 1440 e a 152 px em 390 (o topo termina em 65 px).
- **Imagens:**
  - capa com `preload` (`imagesrcset` e `imagesizes` iguais aos do `<img>`) e `fetchpriority="high"`;
  - o `sizes` da capa no desktop é `1200px`, porque a foto é recortada pela altura e aparece mais larga que a coluna;
  - etapas com `loading="lazy"` e `srcset` de 480, 800 e 1200 px.
- Peso do JavaScript: ~9 KB sem compressão, sem dependências.
- Arquivos CSS/JS com `?v=3`.
- Fonte de peso 500 da Barlow Condensed retirada do pedido ao Google Fonts (não era usada).

## 9. Recursos externos e licenças

- **Fotos:** Unsplash, Licença Unsplash (uso gratuito, inclusive comercial, sem atribuição obrigatória; créditos mantidos por cortesia). Carregadas de `images.unsplash.com`; IDs no `tools/baixar-recursos.ps1` e links no `config.js`.
- **Fontes:** Barlow Condensed e Instrument Sans, SIL Open Font License 1.1, carregadas do Google Fonts. `css/fontes-locais.css` já está pronto para os arquivos locais.
- **Favicon:** SVG próprio (contorno de porta branco com soleira açafrão em fundo marinho), sem texto.

## 10. Testes executados (11/11/2026)

Dois ambientes, com papéis diferentes:

**A. Navegador integrado do Claude Desktop + Live Server** (`http://127.0.0.1:5500`). Motor: **Chromium** (Electron 45 do app). Fotos e fontes reais. O painel tem cerca de 620 px de largura, então as larguras maiores foram emuladas e as capturas saíram reduzidas; a revisão visual foi completada com medições em JavaScript.

- **Capturas revisadas:** 1440×900, 1024×768, 900×800, 899×800, 768×1024, 390×844 e 360×640 (capa, visita, serviços e contato).
- **Fotos:** as quatro carregadas (`naturalWidth > 0`), sem deformação.
- **Recursos:** só os hosts esperados (Live Server, `images.unsplash.com`, Google Fonts).
- **Fontes:** Barlow Condensed 600/700 e Instrument Sans carregadas.
- **Links internos:** nenhum quebrado.
- **Console (aba nova):** só a mensagem do Live Server. Um aviso de `preload` não usado apareceu numa aba em que a emulação de 1440 px foi aplicada depois do carregamento; numa aba nova, a imagem pré-carregada e a usada eram a mesma.
- **Etapas, desktop:**
  - cliques em 1440 e 900 px: imagem, texto e estado ativo corretos, sem salto;
  - teclado em 900 px: ↓↓ + Enter abriu Retirada; Home + Espaço voltou a Chegada; contorno de foco visível.
- **Etapas, celular (390):** "Retirada" aberta diretamente, com o painel colado ao botão.
- **Contato (900):** clique real no botão. A URL não mudou, nenhuma janela foi aberta (`window.open` interceptado) e a mensagem de status apareceu.

**B. Playwright 1.x (Python) no ambiente de trabalho do Claude.** Motor: **Chromium 153** (headless). As fontes da web foram bloqueadas (teste das fontes de reserva), e as fotos foram trocadas por uma imagem cinza de 1200×800, porque esse ambiente não tem internet. Servidor HTTP local servindo a pasta.

- **Larguras:** 1440×900, 1280×600 (janela baixa), 1024×768, 900×800, 899×800, 768×1024, 600×900, 390×844 e 360×640. Em todas:
  - `scrollWidth` igual à largura e nenhum elemento fora da tela (verificação em todos os elementos);
  - a ação principal da capa vem antes da foto (no celular, acima; no desktop, na coluna ao lado);
  - nenhum erro de página além do bloqueio proposital das fontes.
- **Ponto de quebra 899/900:** em 900, grade lateral e painel estável, com a seção seguinte na mesma posição nas três etapas; em 899, sanfona com painel a 0 px do botão.
- **Fotos das etapas:** proporção igual nos três estados (1,6 no desktop, 1,5 no celular).
- **Sem JavaScript** (`javaScriptEnabled: false`), 1440 e 390: três etapas visíveis com foto e texto, horários e endereço presentes, aviso do contato e faixa de demonstração visíveis, sem rolagem horizontal.
- **Movimento reduzido** (`reducedMotion: 'reduce'`): transição do painel e animação da sanfona em ~0 s; `scroll-behavior: auto`.
- **Âncoras com topo fixo:** os dois botões da capa e os três links do topo levam aos títulos certos, visíveis abaixo do topo, em 1440 e em 390.
- **Teclado (1440):** ordem de Tab: pular para o conteúdo → marca → A visita → Serviços → Consultar horários (topo) → Consultar horários (capa) → Como é a primeira visita? → etapas. Foco visível em todos; ↑ ↓ Home End entre as etapas.
- **Troca de largura:** com Retirada e Banho e tosa abertas no celular, ao passar para 1200 px ficou só Banho e tosa, a última aberta.
- **Contato:**
  - demonstração: o botão continua `<button>`, a URL não muda, nenhuma aba é aberta e a mensagem de status aparece;
  - versão comercial (config alterado só no teste): o botão vira `<a href="https://wa.me/5511900000000?text=…">`, e a faixa e o aviso somem. Nenhuma conversa foi aberta.
- **Fotos locais ausentes:** com `useLocalImages: true`, as quatro fotos voltaram para a CDN, com aviso no console.

**Não testado:**
- WebKit/Safari: nem emulado (o WebKit do Playwright não está instalado no ambiente) nem em dispositivo real;
- Firefox;
- leitor de tela (NVDA, TalkBack, VoiceOver);
- preferência real de movimento reduzido do sistema (só a emulação do Playwright);
- publicação real no GitHub Pages;
- fotos e fontes locais de verdade (os arquivos ainda não existem).

O servidor MCP do Playwright do Claude Desktop não pôde ser usado: ele não inicia na máquina porque o `npx` não está disponível no Windows.

## 11. Problemas encontrados e corrigidos

| Problema | Correção |
|---|---|
| Em 768×1024 a capa ocupava a altura da tela e a foto virava uma fatia de 384 px de largura: o rosto do homem era cortado | Altura da tela só a partir de 1024 px; entre 760 e 1023 px a altura vem do texto. Ponto focal 57% 45% |
| No celular, o pano de prato natalino aparecia no canto da foto da capa | Recorte 5:4 com `object-position: 85% 40%` |
| Em 900 px a lista de etapas ficava larga (336 px) e o painel estreito (432 px) | Coluna da lista `minmax(13.5rem, min(30%, 21rem))`: 244 px × 524 px em 900 |
| Em 900–1199 px o título do painel ao lado do texto espremia o parágrafo | Título acima do texto até 1199 px; lado a lado a partir de 1200 |
| Entre 600 e 899 px a foto da etapa aberta ocupava a largura toda (~570 px de altura) | Foto e texto lado a lado dentro da etapa |
| Foto da capa baixada em 800 px para uma área de 720×800 recortada pela altura (ficaria borrada) | `sizes` de 1200 px no desktop, no `<img>` e no `preload` |
| Créditos do rodapé liam "Capa, Charlie Green, Chegada…" | "Charlie Green (capa), Andriyko Podilnyk (chegada)…" |
| A mensagem do clique no contato repetia o aviso que já estava visível | Mensagem curta: "Nada foi aberto nem enviado…" |
| Peso 500 da Barlow Condensed era baixado sem uso | Retirado do link, do `fontes-locais.css` e do script |

## 12. Pendências

### BLOQUEANTES
- Nenhuma identificada para a demonstração.

### RECOMENDADAS
1. **Fotos e fontes locais.** Rodar `tools/baixar-recursos.ps1`, ativar `useLocalImages`, trocar o link das fontes por `css/fontes-locais.css` e, de preferência, pôr os caminhos locais direto no HTML (incluindo o `preload`). Motivo: o terminal deste ambiente estava sem internet, e a página hoje depende de `images.unsplash.com` e do Google Fonts (LGPD: o IP do visitante vai para o Google).
2. **Fotografia mais próxima do briefing** (seção 4, desvios): uma capa num estúdio e uma chegada na porta deixariam a narrativa mais concreta. Prioridade: capa.
3. Testar no Safari (iOS e macOS), principalmente `text-wrap: balance`, `100svh`, `aspect-ratio` e a função `min()` dentro de `minmax()` na grade das etapas. Testar também no Firefox.
4. Testar com leitor de tela: anúncio de `aria-expanded`, regiões das etapas e a mensagem `role="status"` do contato.
5. Testar com a preferência real de movimento reduzido do Windows (Acessibilidade > Efeitos visuais > Efeitos de animação).
6. Revisar a capa num navegador comum em 1280–1920 px, em resolução real (as capturas em telas largas saíram reduzidas).
7. Instalar o Node.js (com `npx`) no Windows para que o Playwright do Claude Desktop funcione na próxima auditoria e permita testar com o WebKit.

### PUBLICAÇÃO COMERCIAL
- [ ] `contact.whatsapp` real e `demo.enabled: false`; testar se abre o WhatsApp certo.
- [ ] Endereço, bairro, cidade, horários, link do Google Maps e Instagram reais no `config.js` **e na cópia do HTML** (bloco "Consulte um horário").
- [ ] Revisar com o cliente o texto das três etapas (como ele realmente recebe, combina e avisa) e o que entra em cada serviço. Não prometer cuidados que dependam de avaliação.
- [ ] Trocar as fotos pelas do cliente, com autorização de uso de imagem dos tutores e da equipe. Remover os avisos de "ilustrativa" só quando forem fotos reais do estabelecimento.
- [ ] Atualizar ou remover os créditos da Unsplash.
- [ ] Remover o `noindex`; revisar `<title>`, `description` e `og:image` (foto real, 1200×630, URL absoluta do domínio).
- [ ] Favicon e marca do cliente. Um nome mais longo que "VÃO" no topo deve ser conferido em 360 px.
- [ ] Repetir a auditoria (360, 390, 768, 899/900, 1024, 1440, teclado, sem JS, console) depois de trocar o conteúdo, principalmente se os textos das etapas ficarem bem mais longos: o painel do desktop cresce até o maior deles.
- [ ] Para entrar no catálogo: `copiar-modelo.ps1 -Origem 11-estetica-pet-vao -Destino Vao` (sugestão de nome) e commit/push pelo usuário.
