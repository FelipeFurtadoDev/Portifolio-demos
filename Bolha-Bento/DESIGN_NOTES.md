# Bolha & Bento — Notas de design e decisões técnicas

Modelo 05 do catálogo. Marca fictícia de estética pet: banho e tosa para cães e gatos.
Assinatura: "Banho gostoso. Pelo soltinho. Pet feliz."
Data: 09/11/2026.

## 1. Estratégia comercial

O visitante típico chega pelo Google Maps ou pela Pesquisa. Ele já viu o endereço e quer confirmar quatro coisas em poucos segundos:
1. se atendem o pet dele (cão ou gato);
2. quais cuidados existem;
3. se o lugar parece limpo e cuidadoso;
4. como marcar.

A página responde nessa ordem, em **quatro blocos** e um rodapé curto:
- a capa diz o que é, onde fica, que é com hora marcada, e tem o botão de agendar;
- os cuidados explicam cada serviço sem preço inventado;
- a galeria mostra o trabalho de perto;
- o agendamento junta um formulário de quatro campos, a mensagem pronta para o WhatsApp, horários e endereço.

Não há "sobre", perguntas frequentes nem chamada final separada. As dúvidas de preço e de condições especiais (pelo embolado, gatos) aparecem nos próprios cuidados e no formulário, onde são úteis.

O botão "Agendar" fica sempre no topo fixo. No celular, ele é o CTA da primeira tela mesmo antes de aparecer o botão da capa.

## 2. Direção de arte

**Editorial divertido: a capa de uma revista de bichos.** A ousadia está concentrada na abertura; o resto é disciplinado.

- **Logotipo como cabeçalho de revista.** "Bolha & Bento" ocupa a largura inteira, com a foto do pet sobrepondo levemente a base das letras, como nas capas em que o modelo fica na frente do título. As "chamadas de capa" à direita são links reais para os cuidados.
- **Moldura-sabonete.** As fotos principais têm cantos assimétricos e arredondados (`--raio-sabonete`), como uma barra de sabonete. Atrás da protagonista há um segundo "sabonete" coral, girado.
- **Plaquinha de coleira.** É a etiqueta gráfica do modelo: um retângulo arredondado com um furo. Aparece:
  - no aviso "Imagem ilustrativa" da capa;
  - nas legendas da galeria;
  - nos cuidados complementares (etiquetas informativas);
  - nas opções do formulário;
  - na mensagem pronta do agendamento, uma plaquinha com argola de chaveiro.
- **Pequenos detalhes.** Um único desenho em traço (tesoura) no bloco da tosa higiênica. Sem patas, ossos, corações ou bolhas decorativas.

### Paleta

| Token | Hex | Uso |
|---|---|---|
| Menta | `#A7DED1` | Capa, topo, mensagem pronta |
| Menta clara | `#DDF2EC` | **Criado.** Avisos dentro do formulário, hover das opções |
| Verde-escuro | `#2F4A45` | Logotipo, galeria (fundo), opção marcada |
| Tinta | `#1C2F2B` | **Criado.** Texto principal (14:1 no papel, 9,4:1 na menta), contornos, rodapé |
| Coral | `#FF6B55` | Botões de ação **sempre com texto tinta** (5:1), forma atrás da foto, plaquinha marcada |
| Coral forte | `#C2412B` | **Criado.** Mensagens de erro e marcadores de lista (5:1 no papel). O coral original dá 2,7:1 em fundo claro |
| Rosa | `#F6A9B6` | Bloco da tosa higiênica (texto tinta, 7,6:1) |
| Baunilha | `#FFF0C7` | Seção de agendamento, campo dos complementares, legendas, texto sobre verde (8,5:1) |
| Papel | `#FAFDFB` | Fundo da seção de cuidados e do formulário (branco frio, sem creme) |

As cores do briefing foram mantidas. Foram criados só os tons necessários para texto legível.

### Tipografia

- **Fraunces** (variável, eixos `opsz`, `wght`, `SOFT`): sempre com `SOFT 100`, que deixa as serifas arredondadas e simpáticas sem cair no infantil.
  - O logotipo usa peso 900 com `opsz 144` fixo. Assim a largura relativa não muda com o tamanho, e o logotipo preenche exatamente a largura da coluna (`font-size` = largura × 0,175, por container query).
  - O título da capa usa itálico 700, uma frase por linha.
  - Os títulos de seção usam peso 800.
- **Figtree** (400–700) no texto, nos botões e no formulário.
- Sem rótulos em caixa alta, sem palavra destacada em títulos, sem monoespaçada e sem setas em botões.

## 3. Arquitetura implementada

1. **Faixa de demonstração** (tinta). Some com `demo.enabled: false`.
2. **Topo fixo** (menta). No alto da página só mostra os links e "Agendar"; o logotipo pequeno aparece quando o logotipo da capa sai da tela. Abaixo de 900 px vira botão "Menu" com painel suspenso.
3. **A — Capa** (menta):
   - linha de serviço (o que é, bairro e cidade, hora marcada);
   - logotipo de largura total;
   - foto-sabonete;
   - título, botões e texto de apoio;
   - quatro chamadas de capa.
   - Layout: 3 colunas a partir de 1000 px (texto | foto | chamadas); 2 colunas entre 600 e 999 px (foto | texto, chamadas embaixo); 1 coluna no celular (logotipo, foto, título, botões, texto, chamadas 2×2).
4. **B — Cuidados** (papel). Quatro tratamentos diferentes, não quatro cartões:
   - **Banho:** foto-sabonete alta e texto ao lado, com o que inclui;
   - **Tosa higiênica:** bloco rosa só de texto, com a tesoura;
   - **Tosa completa:** foto larga com canto inferior esquerdo bem curvo e texto abaixo;
   - **Para somar ao banho:** campo baunilha com plaquinhas informativas; os complementos são combinados pelo WhatsApp (ver seção 12).
   - Cada serviço tem "Agendar…", que pré-seleciona o cuidado no formulário.
   - A nota final diz que não há procedimentos veterinários.
5. **C — Um dia de banho** (verde-escuro). Mosaico de revista com 7 fotos em grade de áreas nomeadas (6 colunas no desktop, 4 no tablet, 2 no celular), alturas de linha fixas e `object-fit` com ponto focal por foto. Cada foto tem uma legenda-plaquinha curta. O texto de abertura diz que as fotos são ilustrativas.
6. **D — Agendamento** (baunilha). Formulário curto em painel (quem vem, cuidado, seu nome, nome do pet) e, ao lado (abaixo no celular), o bloco "Horários e endereço". A mensagem pronta aparece dentro do painel depois de "Preparar agendamento" (ver seção 12).
7. **Rodapé** (tinta). Logotipo, assinatura, aviso de marca fictícia, créditos das fotos (gerados do `config`) e "Voltar ao início".

Altura total medida: ~5.000 px em 1440 px de largura, ~4.850 px em 1024, ~8.300 px em 390.

## 4. Decisões fotográficas

10 fotos da Unsplash (Licença Unsplash), todas gratuitas, nenhuma do Unsplash+. Foram escolhidas visualmente entre ~290 candidatas de 21 buscas, no navegador.

| Papel | Foto (autor) | Enquadramento |
|---|---|---|
| **Protagonista** | Shih-tzu recém-tosado, bandana florida, fundo rosa (Karsten Winegeart) | Sabonete 1:1 no celular, 4:5 no tablet, 5:6 no desktop. Ampliada 1,32× pelo CSS para aproximar do rosto (a original tem muito fundo) |
| Banho | Buldogue francês com espuma, chuveirinho (Anthony Duran) | Sabonete 4:3 no celular, 4:5 a partir de 600 px |
| Tosa completa | Poodle branco com tesoura no rosto (Buddy AN) | 16:10 |
| Galeria: banheira | Border collie na banheira com toalha verde-água (Ayla Verschueren) | Sabonete, maior quadro do mosaico |
| Galeria: turbante | Lulu com toalha rosa na cabeça sendo penteado (Hayffield L) | Paisagem |
| Galeria: toalha | Cão acobreado secando com luva-toalha (Jamie Street) | Vertical estreita |
| Galeria: gato | Gato tricolor de olhos fechados sendo escovado (Marit van Wijngaarden) | Vertical estreita |
| Galeria: salão | Tosador penteando um lulu branco sobre a mesa, luz quente (Александр Гросс / Alexander Gross). Substituiu a foto de Kurt Kemple em 10/11/2026 | Quadro alto, canto inferior esquerdo curvo |
| Galeria: ferramentas | Bandeja de inox com tesouras (mostafa meraji) | Faixa larga |
| Galeria: pelo | Galgo afegão escovado, fundo amarelo (Julio Bernal) | Quadro alto |

- A sequência conta o percurso: banho → secagem → escovação → tosa → resultado, mais gatos e organização.
- Fundos coloridos (rosa, amarelo) e azulejos claros dialogam com a paleta. Nenhuma foto é de cachorro sobre fundo branco no mesmo ângulo.
- Sem filtros, sobreposições ou redução de opacidade. A única intervenção é o recorte e a ampliação da protagonista.
- **Avisos:** "Imagem ilustrativa" na capa; aviso no texto da galeria; aviso no rodapé.
- **Descartadas:** fotos de produto de marca (frasco promocional), uma foto amadora de mesa de tosa e retratos "fantasiados" (cão de camisa).
- **Observações:**
  - na foto da banheira aparece um frasco com rótulo de marca, pequeno e fora de foco;
  - a bandeja de tesouras é genérica e pode ter vindo de uma barbearia; serve só como detalhe ilustrativo de organização.

## 5. Funcionalidades

> O agendamento descrito abaixo é a versão de 09/11. A versão atual, simplificada, está na seção 12.

- **Menu móvel:** `aria-expanded`, foco no primeiro link ao abrir, Esc fecha e devolve o foco, fecha ao clicar fora, ao escolher um link ou ao sair do topo com Tab.
- **Topo:** logotipo pequeno controlado por `IntersectionObserver` sobre o logotipo da capa.
- **Conteúdo do `config.js`:** contatos, horários, links opcionais (Maps, Instagram, WhatsApp real), opções do formulário, complementares e créditos.
- **Cuidados → formulário:**
  - "Agendar banho/tosa…" marca o cuidado e leva ao agendamento;
  - as plaquinhas de complementares (`aria-pressed`) ficam sincronizadas com as caixas do formulário, nos dois sentidos.
- **Formulário de agendamento:**
  - quem vem (cão/gato);
  - porte (só aparece para cão);
  - cuidado;
  - complementares e período preferido (opcionais);
  - nome do tutor;
  - nome do pet e observações (opcionais, com limite de caracteres);
  - escolher "Gato" mostra o aviso de horário reservado e de avaliação para tosa completa.
- **Validação:** exige espécie, porte (se cão), cuidado e nome com 2 letras ou mais. Mostra:
  - mensagem em cada grupo;
  - legenda em coral forte;
  - `aria-invalid` no nome;
  - resumo "Faltam N informações" com `role="alert"`;
  - foco no primeiro erro.
  - Depois do primeiro envio, a validação se atualiza enquanto a pessoa corrige.
- **Prévia ao vivo** na plaquinha, com marcadores "(escolha…)" no rascunho. A plaquinha balança de leve quando o texto muda (só com movimento permitido).
- **Envio:**
  - modo demonstrativo ou número inválido: aviso focado, nada é enviado;
  - número válido com `demo.enabled: false`: o botão vira "Enviar pelo WhatsApp" e abre `https://wa.me/<número>?text=…`.
- **Copiar mensagem:** API de área de transferência; se recusada, seleciona o texto e tenta `execCommand('copy')`; se também falhar, pede Ctrl+C.
- **Fotos locais opcionais:** `useLocalImages: true` troca para `assets/img/<nome>-<largura>.webp`; se o arquivo faltar, volta para a Unsplash e avisa no console.

## 6. Diferenças em relação aos modelos anteriores

| | NÁRIA (01) | Forma Doce (02) | TRAÇO (03) | VÉRTICE (04) | **Bolha & Bento (05)** |
|---|---|---|---|---|---|
| Direção | Editorial sensorial | Pop artesanal | Fashion / régua | Cinematográfico industrial | **Editorial divertido / revista de bichos** |
| Abertura | Texto à esquerda, foto à direita | Título dividido em volta de arco | Título gigante + foto sangrando + régua | Foto em tela cheia, título sobre o preto | **Logotipo-cabeçalho de revista, foto-sabonete sobreposta, chamadas de capa** |
| Tipografia | Bodoni + Hanken | Shrikhand + Bricolage | Archivo expandida | Big Shoulders + Schibsted | **Fraunces SOFT (serifa macia) + Figtree** |
| Peça central | Abas de sumário | Adesivos-filtro | Lookbook numerado | Mosaico com luz de inspeção | **Mosaico de revista com legendas-plaquinha** |
| Conversão | Formulário convencional | Comanda com canhoto | Ficha fixa + barra móvel | Blocos com pictogramas + balão | **Quatro campos + mensagem pronta numa plaquinha de coleira com argola** |
| Ornamento | Mínimo | Rendado, selo | Régua e anotação | Linha de luz | **Moldura-sabonete e plaquinha de coleira** |

Sem cores e fotos, a página continua reconhecível pelo logotipo de largura total com a foto por cima, pelas formas de sabonete e pelas plaquinhas com furo.

**Para o próximo modelo, evitar:** logotipo-cabeçalho de largura total, chamadas de capa, moldura-sabonete, plaquinha de coleira, Fraunces e mosaico com legendas sobre a foto.

## 7. Decisões técnicas

- HTML, CSS e JS puros. Caminhos relativos em tudo (compatível com subpasta do GitHub Pages).
- `<meta name="robots" content="noindex, nofollow">` (demonstração).
- Container query (`cqi`) na capa: logotipo e título dimensionados pela largura real.
- Imagens:
  - `srcset`/`sizes` por papel, com `width`/`height` reais;
  - `loading="lazy"` abaixo da dobra;
  - protagonista com `preload` (`imagesrcset`) e `fetchpriority="high"`; o `sizes` dela considera a ampliação de 1,32×.
- `[hidden] { display: none !important; }`, regra aprendida no modelo 04.
- Movimento:
  - uma sequência na abertura (logotipo sobe, foto pousa, plaquinha balança) e a plaquinha da prévia balançando em resposta às mudanças;
  - tudo dentro de `prefers-reduced-motion: no-preference`; a regra `reduce` zera durações, e a rolagem suave fica desligada nesse caso.
- Arquivos CSS/JS com `?v=N` (versão atual: 2).
- O `index.html` foi gerado por um script (fora da pasta do projeto) que monta as tags `<img>` com URLs e dimensões. Editar o `index.html` diretamente funciona normalmente.

## 8. Recursos externos e licenças

- **Fotos:** Unsplash, Licença Unsplash (uso gratuito, inclusive comercial, sem atribuição obrigatória; créditos mantidos por cortesia). IDs e links em `js/config.js`. Carregadas de `images.unsplash.com` (ver pendências).
- **Fontes:** Fraunces e Figtree, SIL Open Font License 1.1, carregadas do Google Fonts (ver pendências). `css/fontes-locais.css` já está pronto para os arquivos locais.
- **Favicon:** SVG próprio (plaquinha coral com "b" desenhado em traços), sem depender de fonte.
- **Metadados nos arquivos:** a ferramenta que transfere arquivos para a pasta do projeto acrescentou ~8 KB de metadados de procedência (C2PA) ao `favicon.svg`. Ele continua funcionando (testado); o efeito é só no tamanho.

## 9. Testes executados (09/11/2026, Live Server + navegador integrado)

> Testes da primeira versão. Os testes do refinamento estão na seção 12.

O painel do navegador integrado tem 710 px de largura. Larguras maiores foram emuladas e as capturas saíram reduzidas, então a inspeção visual em 1100–1440 px foi feita em resolução menor, completada por medições com JavaScript.

- **Larguras:**
  - 360×740, 390×844, 600×900, 768×1024, 900×800, 1024×768, 1100×800, 1280×600 (janela baixa) e 1440×900;
  - capturas por seção em 390 e 1440, da capa em todas as larguras, de cuidados e galeria em 600, 900 e 1024, e do agendamento em 768 e 1100;
  - as capturas foram feitas com animações desligadas por CSS injetado; o painel em segundo plano pausa animações e as capturas saíam no quadro inicial.
- **Rolagem horizontal:** `scrollWidth` = largura em 360, 390, 600, 768, 900, 1024, 1100, 1280 e 1440, e nenhum elemento fora da tela (verificação automática em todos os elementos).
- **Imagens:** nenhuma quebrada; somente os hosts esperados (Live Server, Unsplash, Google Fonts).
- **Menu móvel (390):** abre com foco em "Cuidados"; Esc fecha e devolve o foco ao botão.
- **Formulário (390):**
  - envio vazio: resumo "Faltam 3 informações", 3 mensagens, `aria-invalid="true"` no nome e foco em "Cão";
  - fluxo completo: "Agendar tosa higiênica" (seção B) marcou o cuidado; a plaquinha "Corte de unhas" (seção B) marcou a caixa no formulário (`aria-pressed="true"`);
  - envio preenchido: resumo some, aviso de demonstração recebe o foco, nada é enviado;
  - "Gato": porte some, aviso de gatos aparece e a prévia mostra "Pet: Gato".
- **Copiar:** na primeira rodada, a API de área de transferência foi recusada no painel integrado e o texto ficou só selecionado. Depois da inclusão da tentativa com `execCommand('copy')`, um clique real em "Copiar mensagem" (aba nova, 1440) retornou "Mensagem copiada.".
- **Console (aba nova, 1440×900):** só a mensagem do Live Server. O aviso de pré-carregamento não usado da foto da capa, visto nas primeiras rodadas, sumiu depois que o `preload` passou a usar só `imagesrcset`, com o mesmo `sizes` da imagem.
- **Envio real (simulado):** página carregada num iframe com `demo.enabled: false`, número de teste e `window.open` interceptado. O botão virou "Enviar pelo WhatsApp", a faixa de demonstração sumiu, apareceu o link "Conversar no WhatsApp" e a URL gerada foi `https://wa.me/5511900000000?text=…`, com a mensagem decodificada idêntica à prévia. Nenhuma conversa foi aberta.
- **Fotos locais ausentes (simulado):** com `useLocalImages: true`, as 10 fotos voltaram para a Unsplash, com aviso no console.
- **Teclado (1100):** ordem de Tab, do "Pular para o conteúdo" pelos links do topo, botões da capa, chamadas, botões dos cuidados, plaquinhas e grupos do formulário. Contorno de foco visível em todos. A seta troca a opção do grupo de rádio e a prévia é atualizada.
- **Sem animações:** página inteira revisada com animações e transições desligadas; tudo visível e no lugar.
- **Não testado:**
  - preferência real de movimento reduzido do sistema (o navegador integrado não emula; regras conferidas no código);
  - leitores de tela;
  - Safari/iOS;
  - publicação real no GitHub Pages;
  - fotos e fontes locais de verdade (os arquivos ainda não existem).

## 10. Problemas encontrados e corrigidos

| Problema | Correção |
|---|---|
| Logotipo 11% mais largo que a coluna em 1440 (rolagem horizontal) | Fator de tamanho recalibrado pela largura medida |
| Em 390 o logotipo ainda vazava: com `opsz` automático, letras pequenas ficam mais largas | `opsz 144` fixo no logotipo; mesma proporção em qualquer largura |
| Foto da capa cobria muito do logotipo no celular | Sobreposição de 7% do tamanho do logotipo no celular, 14–16% a partir de 600 px |
| Protagonista com muito fundo rosa e o cão pequeno | Ampliação de 1,32× ancorada no rosto |
| Forma rosa atrás da foto se confundia com o fundo rosa da própria foto | Forma passou a ser coral |
| Em 600 px a forma coral e a plaquinha esticavam até a altura da coluna de texto | `align-self: start` na figura |
| Pontos separadores da linha de serviço começavam uma linha nova no celular | Pontos só a partir de 600 px |
| Em 1024 o título da capa quebrava no meio das frases ("Pelo / soltinho") | Uma frase por linha e tamanho calculado pela largura da coluna |
| Chamadas de capa espremidas em 4 colunas a 600 px | 2 colunas até 759 px |
| Legendas da galeria sem fundo (classe ausente) | Classe `plaquinha` nas legendas |
| Foto do banho 4:5 em largura total no celular (página longa) | 4:3 no celular |
| Complementares no formulário com observação quebrando em 3 linhas | Observação só na seção de cuidados; opções menores |
| Argola da prévia parecia um gancho | Argola redonda passando pelo furo |
| Ids repetidos: rádios `cuidado-banho` iguais aos ids dos artigos | Prefixo `op-` nos controles |
| Aviso de demonstração dizia "ao lado", mas no celular a prévia fica abaixo | "na prévia" |
| Copiar falhava no painel integrado (API recusada) | Reserva com `execCommand('copy')` antes de pedir Ctrl+C |
| Aviso de `preload` não usado da foto da capa | `preload` só com `imagesrcset` e `sizes` igual ao da imagem (que considera a ampliação de 1,32×) |

## 11. Pendências (atualizadas em 10/11/2026)

### Bloqueantes
- Nenhuma identificada para a demonstração.

### Recomendadas
1. **Fotos e fontes locais.** Rodar `tools/baixar-recursos.ps1`, ativar `useLocalImages`, trocar o link das fontes por `css/fontes-locais.css` e, de preferência, pôr os caminhos locais direto no HTML (incluindo o `preload`). Conferir na aba Rede. Motivo: o terminal deste ambiente estava sem internet, e a página hoje depende de `images.unsplash.com` e do Google Fonts (LGPD: o IP do visitante vai para o Google).
2. Testar com a preferência real de movimento reduzido (Windows: Acessibilidade > Efeitos visuais > Efeitos de animação).
3. Testar com leitor de tela (NVDA/TalkBack): resumo de erros, aviso de demonstração, plaquinhas `aria-pressed`, menu.
4. Revisar a capa num navegador comum em 1280–1920 px, em resolução real (as capturas desta revisão em telas largas foram reduzidas).
5. Conferir no Safari as container queries e o `clip` horizontal da capa.
6. Em janelas baixas (1280×600) o botão da capa fica no limite da primeira tela; o "Agendar" do topo cobre esse caso. Se o cliente quiser, reduzir o logotipo por altura.

### Publicação comercial
- [ ] `contact.whatsapp` real e `demo.enabled: false`; testar se abre o WhatsApp certo.
- [ ] Endereço, bairro, cidade, horários, link do Google Maps e Instagram reais.
- [ ] Revisar com o cliente cuidados, inclusões, política para gatos e complementares. Não prometer procedimentos que dependam de avaliação.
- [ ] Trocar as fotos pelas do cliente, com autorização de uso de imagem dos tutores. Remover "Imagem ilustrativa" e os avisos só quando forem fotos reais do estabelecimento.
- [ ] Atualizar ou remover os créditos da Unsplash.
- [ ] Remover o `noindex`; revisar `<title>`, `description` e `og:image` (foto real, 1200×630, URL absoluta do domínio).
- [ ] Favicon com a marca do cliente.
- [ ] Repetir a auditoria (360, 390, 768, 1024, 1440, teclado, console) depois de trocar o conteúdo, principalmente o logotipo da capa: um nome mais longo ou mais curto exige ajustar o fator `.175` em `.capa__grade`.

## 12. Refinamento final (10/11/2026)

Sem redesign: identidade, capa, cuidados, galeria, navegação e textos foram mantidos. Mudaram só o agendamento e uma foto.

### Agendamento simplificado

- **Ficaram quatro campos:**
  1. quem vem: cão ou gato (obrigatório);
  2. cuidado: banho, banho + tosa higiênica ou banho + tosa completa (obrigatório);
  3. seu nome (obrigatório, 2 letras ou mais);
  4. nome do pet (opcional).
- **Saíram do formulário:** porte, complementares, período preferido e observações. A introdução da seção diz que horário, valor e detalhes do pet são combinados pelo WhatsApp.
- **Coerência com gatos, sem campo extra:** ao escolher "Gato", aparece um aviso curto (horário reservado; tosa completa depois de avaliação), e a opção "Banho + tosa completa" ganha a etiqueta "após avaliação". Esse texto também entra na mensagem.
- **"Para somar ao banho"** continua na seção de cuidados, agora como etiquetas informativas (não são mais botões), com o texto "Peça junto com o banho. Os detalhes a gente combina pelo WhatsApp."
- **Interação direta:** o quadro grande de prévia ao lado do formulário foi retirado. O visitante preenche e clica em **"Preparar agendamento"**. Então:
  - **modo demonstrativo (ou sem número válido):** surge dentro do formulário a **"Mensagem pronta"**, uma plaquinha compacta com argola. Tem o aviso de que nada foi enviado, o texto da mensagem e o botão "Copiar mensagem". O foco vai para a plaquinha. Se a pessoa mudar algum campo depois, o texto se atualiza;
  - **número real + `demo.enabled: false`:** o botão passa a se chamar "Continuar no WhatsApp" e abre `wa.me` com a mensagem preenchida.
- **A mensagem não promete nada:** pede o horário e termina com "Podemos combinar os detalhes, o horário e o valor por aqui?". Não há confirmação de reserva nem horários disponíveis simulados.
- **Mantidos:** validação com resumo e foco no primeiro erro, `aria-invalid`, mensagens por campo, rótulos e legendas acessíveis, navegação por teclado e os botões "Agendar banho/tosa…" das outras seções, que marcam o cuidado.
- **`config.js`:** saíram `sizes`, `periods` e o uso de `extras` no formulário; entraram `catNote`, `catServiceNote` e a nova `closingLine`.
- **Altura da seção** (formulário vazio): 1.238 → **831 px** em 1440; ~790 px em 900–1100. No celular (390), com a mensagem pronta aberta: 2.358 → **1.726 px**.

### Fotografia substituída

- **Saiu:** "Tosa na mesa, com o pet bem apoiado", de Kurt Kemple. O bichon na mesa de competição, com fundo cheio, destoava das outras fotos.
- **Entrou:** [Homem escovando o pelo do cão](https://unsplash.com/photos/dHIRbh9En6I), de Александр Гросс (Alexander Gross, @boney).
  - O que mostra: tosador penteando com calma um lulu branco em pé sobre a mesa, em luz quente e com o fundo desfocado. Combina com o tom quente das fotos da toalha e do turbante.
  - Licença: conferida na página da foto em 10/11/2026. É grátis, sob a Licença Unsplash, e não é do Unsplash+.
- **Mesma posição e proporção:** área `salo` do mosaico, mesmo canto curvo. Ponto focal `52% 40%`, que mantém o cão e as mãos e corta quase todo o quadro-negro do fundo.
- **Novo texto alternativo:** "Profissional penteando com calma um lulu branco, em pé sobre a mesa de tosa, num salão de luz quente".
- **Nova legenda:** "Pente com calma, pet bem apoiado na mesa".
- Continua coberta pelo aviso "As fotos são ilustrativas e não mostram pets atendidos pela Bolha & Bento". Crédito atualizado no rodapé (gerado do `config`) e no `tools/baixar-recursos.ps1`.

### Testes do refinamento (10/11/2026, Live Server + navegador integrado)

O painel do navegador tinha cerca de 590 px de largura, então as capturas acima disso saíram reduzidas, e completei a revisão com medições em JavaScript. Durante os testes, outra pasta do repositório (06-marmoraria) estava sendo editada, e o Live Server recarregava a página a cada alteração. Os testes interrompidos foram refeitos.

- **Larguras:** 360, 390, 600, 768, 900, 1024, 1100, 1280×600 (janela baixa) e 1440. Nenhuma rolagem horizontal e nenhum elemento fora da tela (verificação automática em todos os elementos).
- **Capturas do agendamento:**
  - 1440: vazio, com aviso de gato e com a mensagem pronta;
  - 1024 e 1280×600: vazio;
  - 768 e 390: com a mensagem pronta.
- **Galeria:** foto nova capturada em 1440; carregada e sem distorção.
- **Formulário (1440, cliques reais):**
  - envio vazio: resumo "Faltam 3 informações", 3 mensagens, `aria-invalid` no nome e foco em "Cão";
  - "Agendar tosa completa" (seção de cuidados) marcou o cuidado;
  - "Gato" mostrou o aviso e a etiqueta "após avaliação";
  - com nome e nome do pet, "Preparar agendamento" abriu a mensagem pronta com o foco nela:
    "Pet: Gato, Mimi / Cuidado: Banho + tosa completa (após avaliação) / Tutor(a): Ana Teste";
  - "Copiar mensagem" com clique real: "Mensagem copiada.";
  - depois de trocar para "Cão", o aviso e a etiqueta sumiram; ao alterar o nome do pet, a mensagem se atualizou ("Pet: Cão, Bento").
- **Teclado (1280×600):** Enter em "Agendar tosa completa" marcou o cuidado. Ordem de Tab: Cão → grupo de cuidado (no item marcado) → Seu nome → Nome do pet → Preparar agendamento. Contorno visível em todos.
- **Envio real (simulado):** página carregada num iframe com `demo.enabled: false`, número de teste e `window.open` interceptado. O botão virou "Continuar no WhatsApp", a URL foi `https://wa.me/5511900000000?text=…` com a mensagem correta, e a plaquinha não apareceu. Nenhuma conversa foi aberta.
- **Topo fixo:** continua fixo nas capturas de 390, 768, 1024 e 1440. Clicar em "Agendar um horário" (1440) levou ao agendamento com o título 120 px abaixo do topo (`scroll-padding-top`), sem cobrir nada.
- **Console (aba nova, 1440):** só a mensagem do Live Server. Nenhuma imagem quebrada.
- **GitHub Pages:** nenhum caminho absoluto ou local em HTML, CSS ou JS; recursos em `css/`, `js/` e `assets/` com caminhos relativos.
- **Não testado:** preferência real de movimento reduzido, leitor de tela, Safari/iOS e publicação real no GitHub Pages.

## 13. Ajuste da capa: sobreposição foto × logotipo (10/11/2026)

**Problema.** A partir de 600 px, a foto e a forma coral atrás dela encobriam demais a base de "Bolha & Bento". Em 1440, a foto cobria 13% da altura das letras, e a forma coral girada subia ainda mais sobre "& B". Em 768, cobria 9%.

**Alterações** (só em `css/styles.css`, bloco da capa; `?v=5` no `index.html`):
- **Desktop (≥ 1000 px):**
  - a foto desceu: a margem negativa passou de 16% para 9% do tamanho do logotipo;
  - a foto ficou 8% menor (`width: 92%`, centralizada na coluna), o que abre respiro entre ela, o título da capa e as chamadas.
- **Tablet (600–999 px):** margem negativa de 14% para 8%.
- **Forma coral:** o topo passou de 4% para 9% abaixo do topo da foto, para que, girada, não suba sobre o logotipo.
- **Celular (< 600 px):** a regra continua a mesma. A foto já só encostava na base das letras; a única mudança visível é a forma coral um pouco mais baixa.
- Logotipo, fotografia, paleta, textos e o restante da página não mudaram.

**Resultado medido** (parte da altura das letras coberta pela foto):

| Largura | Antes | Depois |
|---|---|---|
| 1440 | 13% | 3% |
| 1024 | — | 3% |
| 768 | 9% | 1% |
| 390 e 360 | 0% (só a cauda do "&") | 0% (igual) |

A interação continua: a cauda do "&" desce para dentro da foto, e a foto encosta na base do "B" (desktop) ou do "Bol" (tablet).

**Testes (Live Server, navegador integrado, animações desligadas para a captura):**
- capturas da capa em 1440, 1024, 768, 390 e 360;
- medição com JavaScript da linha de base das letras contra o topo da foto;
- `scrollWidth` igual à largura em todas as larguras;
- o botão "Agendar um horário" continua na primeira tela em 1440 (623 px de 900), 1024 (563 de 768), 768 e 390;
- console sem erros da página (o único erro listado era de um teste em iframe feito antes na mesma aba).

### 13.1 Foto da capa menor, por igual (10/11/2026)

A foto-sabonete da capa (e a forma coral atrás dela, que acompanha a foto) ficou cerca de 7–10% menor, igual nos quatro lados. Só a largura mudou; a altura vem do `aspect-ratio` da foto, então não há deformação. As proporções medidas continuam 1:1 no celular, 4:5 no tablet e 5:6 no desktop.

| Faixa | Antes | Depois | Largura medida |
|---|---|---|---|
| < 600 px | `min(100%, 30rem)` | `min(90%, 27rem)` | 390: 358 → 322 px; 360: 295 px |
| 600–999 px | `100%` | `90%`, centralizada na coluna | 768: 334 → 301 px |
| ≥ 1000 px | `92%` | `85%`, centralizada | 1440: 478 → 442 px; 1024: 333 → 308 px |

A sobreposição com o logotipo é proporcional ao tamanho dele e não mudou (1–3% da altura das letras a partir de 600 px; só a cauda do "&" no celular).

**Revisão em todas as larguras** (360, 390, 600, 768, 900, 1024, 1100, 1440 e 1280×600):
- sem rolagem horizontal e sem elementos fora da tela;
- proporção da foto conferida por medição;
- a plaquinha "Imagem ilustrativa" não encosta no texto da coluna ao lado (600, 768 e 900 px);
- o botão "Agendar um horário" segue na primeira tela em todas as larguras testadas. No celular ele subiu: em 390×844, os dois botões agora cabem na primeira tela;
- console sem erros da página.

**Observação:** em 600 px a foto fica mais estreita que a coluna de texto ao lado (239 px de largura). A plaquinha passa a ocupar uma parte maior dela, mas não cobre o rosto do cão.
