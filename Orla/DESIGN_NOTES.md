# ORLA Pedra & Projeto — Notas de design e decisões técnicas

Modelo 06 do catálogo. Marca fictícia de marmoraria.
Assinatura: "Pedra certa. Corte preciso. Acabamento que valoriza o ambiente."
Data: 10/11/2026.

> **Origem:** a pasta já tinha um rascunho deste modelo (versão `?v=7`, registrada no Git no commit "commit local"), sem DESIGN_NOTES, sem auditoria e sem `assets/`. Esta revisão partiu dele, manteve o que funcionava (conteúdo, fotos, lógica do formulário) e refez a capa, as aplicações e o amostruário. As diferenças estão na seção 9.

## 1. Estratégia comercial

Quem chega pelo Google Maps já viu o endereço e as fotos do perfil. Na página, quer confirmar três coisas:
1. se a empresa faz a peça dela (cozinha, banheiro, escada…);
2. se trabalha com a pedra que ela imagina;
3. como pedir preço.

A página responde nessa ordem, em quatro blocos:

| Bloco | Pergunta que responde |
|---|---|
| A. Capa | O que é, onde atende, quando atende, botão de orçamento |
| B. Aplicações | "Vocês fazem o meu tipo de peça?" Cada ambiente tem "Orçar…", que já marca o ambiente no formulário |
| C. Amostruário | "Qual pedra combina?" Textura e ambiente lado a lado, indicação de uso, acabamentos e perfis de borda. "Usar no orçamento" preenche o material |
| D. Orçamento | Formulário curto, prévia da mensagem para o WhatsApp e dados práticos (contato, endereço, horários) no mesmo quadro |

O que ficou de fora, de propósito:
- **"Sobre" e "Como funciona":** a observação do formulário já orienta sobre o que informar, e a frase final da mensagem lembra que o valor depende das medidas e da chapa.
- **Chamada final separada.**
- **Preços, prazos e garantias.**

O botão "Orçamento" fica sempre visível no topo, também no celular.

## 2. Direção de arte

**Arquitetura tátil / matéria e precisão.** A página fala o vocabulário de quem trabalha com pedra: chapa, recorte, junta, cota, perfil e carimbo de prancha. Cada elemento gráfico tem uma função e não é enfeite:

- **Recorte de chapa.** Na capa, o texto fica num bloco de "pedra quente", recortado no canto da foto como uma peça assentada. As aplicações repetem o recurso no desktop: cada foto tem uma plaqueta de texto encaixada no canto.
- **Juntas.** As fotos das aplicações e da ficha de material são separadas por juntas de 5 px na cor da pedra, como numa paginação de piso.
- **Cotas.** Linhas de medida com terminais ("sob medida") contornam o recorte da capa. É a única animação automática: elas se desenham ao carregar.
- **Plaquetas penduradas.** O amostruário é um trilho com amostras verticais penduradas por ganchos. A sombra inferior mostra a espessura da chapa, e a plaqueta escolhida desce e ganha uma aresta terracota.
- **Perfis de borda.** Reto, meia-esquadria, boleado e chanfrado, desenhados em corte técnico SVG, com hachura e cota de espessura.
- **Carimbo.** O quadro de contato do orçamento imita o carimbo (legenda) de uma prancha técnica, com marcas de esquadro nos cantos.

Não há ícones genéricos de construção civil.

### Paleta

| Token | Hex | Uso |
|---|---|---|
| Areia | `#F2EEE7` | Fundo base, texto sobre o verde |
| Areia clara | `#FAF8F4` | Plaquetas das aplicações, prancha do orçamento |
| Grafite | `#232323` | Texto, botões principais, rodapé |
| Pedra quente | `#B9A38C` | **Bloco de texto da capa**, juntas, trilho do amostruário |
| Pedra clara | `#D8CCBE` | Fundo de carregamento das fotos, linhas sobre o verde |
| Texto sobre pedra | `#3A3129` | **Criado.** Texto secundário no recorte da capa (≈6,7:1) |
| Terracota | `#B76A45` | Só em linhas: cotas, aresta da plaqueta ativa, foco, sublinhado do menu |
| Terracota texto | `#9A5534` | **Criado.** Links "Orçar…" (≈4,9:1 sobre areia) |
| Verde profundo | `#4F5A4F` | **Campo inteiro do amostruário**, carimbo, faixa de demonstração |
| Erro | `#A1311B` | Validação |

Ajustes em relação ao briefing:
- a pedra quente virou cor de superfície, e não só de detalhe, porque é ela que dá a sensação tátil na capa;
- a terracota ficou restrita a linhas, para não cair no clichê "creme + terracota";
- foram criados só os tons necessários para contraste de texto;
- o foco do teclado troca de cor por fundo: terracota sobre areia, grafite sobre a pedra e areia sobre o verde.

### Tipografia

- **Geologica** (variável, Google Fonts, OFL), família única. O eixo `SHRP` (nitidez) fica em 100 nos títulos e na marca: os terminais ficam cortados, como uma aresta viva. No texto corrido ele fica em 0.
- Títulos com peso 700–750, entrelinha 0,96–1,05 e espaçamento negativo.
- Sem rótulos em caixa alta, sem palavra destacada nos títulos, sem fonte monoespaçada e sem setas nos botões. "ORLA" em caixa alta é o logotipo.

## 3. Arquitetura implementada

0. **Faixa de demonstração** (verde). Some com `demo.enabled: false`.
1. **Topo fixo** (areia, filete grafite): marca com símbolo de chapa recortada, três links e "Pedir orçamento". Abaixo de 900 px, "Orçamento" + botão de menu em tela cheia.
2. **A — Capa (`#inicio`)**
   - Foto protagonista em sangria.
   - No desktop, recorte em pedra quente no canto superior esquerdo, com local, título, texto, dois botões, horário do dia e cotas.
   - No celular e no tablet, o recorte sobe sobre a base da foto.
   - O título é limitado por altura de janela (regras `max-height: 760px` e `620px`).
3. **B — Aplicações (`#aplicacoes`)**
   - Cinco ambientes gerados do `config.js`.
   - A partir de 1200 px: paginação de 12 colunas com juntas (cozinha ocupa duas linhas) e texto em plaqueta recortada no canto de cada foto.
   - De 600 a 1199 px: duas colunas, com o texto abaixo da foto; a cozinha ocupa a largura toda (2:1 a partir de 900 px).
   - Celular: uma coluna.
4. **C — Materiais (`#materiais`, verde)**
   - Trilho com 5 plaquetas: mármore branco, quartzito, travertino, mármore verde e granito preto. No celular, a fileira rola na horizontal, dentro do próprio trilho.
   - Ficha do material: textura + aplicação lado a lado com junta, família, tom, descrição honesta (porosidade, cuidados), acabamentos, onde costuma ir, "Usar no orçamento" e o aviso de que a chapa varia.
   - Faixa areia com os **perfis de borda**.
5. **D — Orçamento (`#orcamento`)**: prancha com formulário à esquerda e carimbo à direita (abaixo dele, em telas menores que 1024 px). O carimbo reúne empresa, WhatsApp, telefone, endereço, horários e a prévia da mensagem.
6. **Rodapé** curto: assinatura, aviso de marca fictícia e créditos gerados do `config.js`.

Altura medida da página inteira:

| Janela | Altura |
|---|---|
| 1440×900 | ~5.520 px |
| 1100×800 | ~5.870 px |
| 1024×768 | ~5.600 px |
| 768×1024 | ~6.840 px |
| 600×900 | ~6.500 px |
| 390×844 | ~7.770 px |
| 360×740 | ~7.790 px |

## 4. Decisões fotográficas

16 fotos da Unsplash (Licença Unsplash, nenhuma do Unsplash+), herdadas do rascunho. Nesta revisão, todas foram conferidas no navegador (HTTP 200, carregadas) e avaliadas juntas numa folha de contato.

| Papel | Conteúdo | Enquadramento |
|---|---|---|
| **Protagonista** | Cozinha clara, ilha em mármore de veios dourados, cuba redonda, galhos amarelos | Sangria total. O amarelo e o dourado dos veios dialogam com a pedra quente do recorte |
| Cozinhas | Ilha em pedra clara, frontão de quartzito, vaso | Maior peça da paginação |
| Banheiros | Mármore branco de veios violeta, cuba de apoio, ripado | Peça alta à direita |
| Escadas | Escada curva em pedra bege | Peça média |
| Áreas gourmet | Área gourmet coberta com bancada longa, luz quente | Peça larga |
| Lavabos e nichos | Banheiro com bancada maciça de cuba integrada, pendente preto | Peça larga |
| Texturas (5) | Mármore branco, quartzito, travertino com sombra de janela, mármore verde, granito preto | Plaquetas verticais 1:1,9 e ficha |
| Aplicações (5) | Uma por material (caneca no mármore, frontão de quartzito, tampo de travertino com copo, ilha verde, cozinha escura) | Ficha, ao lado da textura |

- A sequência alterna claro e quente, com dois pontos escuros (mármore verde e granito), o que evita a página "toda branca".
- Sem filtros, sobreposições ou redução de opacidade. A única intervenção é o recorte por `object-fit` e o ponto focal por foto.
- **Avisos:**
  - "Imagem ilustrativa" na capa;
  - "Aplicação ilustrativa" na ficha;
  - nota abaixo das aplicações ("Não mostram obras da ORLA");
  - aviso no rodapé.

## 5. Funcionalidades

- **`js/config.js`** concentra:
  - marca e modo demonstrativo;
  - contatos e horários;
  - fotos (id da Unsplash, arquivo local, autor);
  - aplicações (texto, peças, foto, foco, posição na paginação);
  - materiais (textos, acabamentos, usos, fotos e textos alternativos);
  - as opções extras do formulário.
- Os textos da capa ficam no `index.html`, marcados com "EDITÁVEL".
- **Menu móvel:**
  - `aria-expanded`;
  - foco no primeiro link ao abrir;
  - Esc fecha e devolve o foco;
  - Tab fica preso no menu aberto;
  - o menu fecha ao escolher um link;
  - é posicionado pela base real do topo, inclusive com a faixa de demonstração.
- **Atalhos para o formulário:**
  - "Orçar cozinha/banheiro/…" marca o ambiente;
  - "Usar no orçamento" escolhe o material;
  - os dois rolam até o formulário e levam o foco para o campo.
- **Amostruário:** plaquetas com `aria-pressed`; a ficha é atualizada com troca suave das fotos (sem transição se o movimento estiver reduzido).
- **Validação:**
  - ambiente, material e nome (2 letras ou mais) são obrigatórios;
  - mensagem por campo, `aria-invalid` e resumo "Faltam N informações" com `role="alert"`;
  - foco no primeiro erro;
  - os erros somem enquanto a pessoa corrige.
- **Prévia ao vivo** da mensagem no carimbo.
- **Envio:**
  - modo demonstrativo: aviso "Mensagem pronta… nada foi enviado" recebe o foco, com o botão "Copiar mensagem";
  - com `demo.enabled: false` e número válido: o botão vira "Enviar pelo WhatsApp" e abre `https://wa.me/<número>?text=…`.
- **Copiar:** usa a API de área de transferência. Se ela for recusada, seleciona o texto e tenta `execCommand('copy')`. Se isso também falhar, pede Ctrl+C.
- **Fotos locais opcionais:** `useLocalImages: true` usa `assets/img/<arquivo>-<largura>.webp`. Se um arquivo faltar, aquela foto volta para a Unsplash e um aviso aparece no console.

## 6. Diferenças em relação aos modelos anteriores

| | 01 NÁRIA | 02 Forma Doce | 03 TRAÇO | 04 VÉRTICE | 05 Bolha & Bento | **06 ORLA** |
|---|---|---|---|---|---|---|
| Direção | Editorial sensorial | Pop artesanal | Fashion / régua | Cinematográfico industrial | Revista de bichos | **Arquitetura tátil / desenho técnico** |
| Abertura | Texto + foto | Título em volta de arco | Título gigante + régua | Título claro + faixa de foto | Logotipo de largura total | **Foto em sangria com recorte de chapa e cotas** |
| Tipografia | Bodoni + Hanken | Shrikhand + Bricolage | Archivo expandida | Big Shoulders + Schibsted | Fraunces SOFT + Figtree | **Geologica, uma família, eixo de nitidez** |
| Peça central | Abas de sumário | Adesivos-filtro | Lookbook | Mosaico com luz | Mosaico de revista | **Amostruário pendurado + ficha textura × aplicação + perfis de borda** |
| Conversão | Formulário | Comanda | Ficha fixa | Pictogramas | Plaquinha de coleira | **Prancha com carimbo técnico** |
| Ornamento | Mínimo | Rendado | Régua | Linha de luz | Sabonete | **Junta, cota, hachura, esquadro** |

O TRAÇO (03) também usa marcações de medida, mas como ornamento de moda: régua cobalto, sobre fotos. Aqui o desenho técnico organiza a estrutura: recortes, juntas, carimbo e cortes de perfil. A cor das cotas é terracota fina, nunca um campo de cor.

**Para o próximo modelo, evitar:**
- recorte de texto encaixado na foto;
- juntas entre fotos;
- trilho de amostras penduradas;
- carimbo de prancha;
- Geologica.

## 7. Decisões técnicas

- HTML, CSS e JS puros. Caminhos relativos em tudo, compatível com subpasta do GitHub Pages; nenhum caminho do Windows no código.
- `<meta name="robots" content="noindex, nofollow">` (demonstração), com comentário no `<head>`.
- Favicon SVG embutido no `<link rel="icon">` (data URI), para não sofrer injeção de metadados na transferência de arquivos (problema registrado nos modelos 01 e 05).
- Imagens:
  - a capa vem no HTML com `srcset` de 800/1600/2400, `fetchpriority="high"` e `preload`;
  - as demais são geradas pelo JS, com `srcset` 640/1200, `sizes` por faixa de tela, `width`/`height` e `loading="lazy"`.
- `[hidden] { display: none !important; }`.
- Grades com `minmax(0, 1fr)`. Nenhum `overflow: hidden` para esconder problema. A única rolagem interna é a fileira de plaquetas no celular, que é intencional.
- Movimento:
  - uma única animação automática (as cotas da capa), dentro de `prefers-reduced-motion: no-preference`;
  - com `reduce`, as durações caem a ~0 e a rolagem suave fica desligada;
  - a troca de foto na ficha só tem transição se o movimento for permitido.
- CSS/JS com `?v=N` (versão atual: 11).

## 8. Recursos externos e licenças

- **Fotos:** Unsplash, Licença Unsplash (uso gratuito, inclusive comercial; créditos por cortesia, gerados no rodapé). Carregadas de `images.unsplash.com` até rodar o script de download.
- **Fonte:** Geologica, SIL Open Font License 1.1, pelo Google Fonts. `css/fontes-locais.css` está pronto para o arquivo local.
- **Script:** `tools/baixar-recursos.ps1` baixa as 16 fotos (capa em 800/1600/2400; demais em 640/1200, WebP) e a fonte. Ele grava só dentro desta pasta e **não foi executado** neste ambiente.

## 9. Testes executados (10/11/2026, Live Server + navegador integrado)

O painel do navegador integrado é menor que 1440 px: as larguras maiores foram emuladas, e as capturas saíram reduzidas. A inspeção nessas larguras foi completada com medições por JavaScript. As capturas foram feitas por seção, rolando a página inteira, com as animações zeradas por CSS injetado.

- **Larguras:** 360×740, 390×844, 600×900, 768×1024, 900×800, 1024×768, 1100×800 e 1440×900, mais janelas baixas (1280×600, 1024×600) e celular deitado (740×360).
- **Rolagem horizontal:** `scrollWidth` igual à largura em todas as larguras acima. A verificação automática não achou nenhum elemento fora da tela (excluindo a fileira de plaquetas, que rola por dentro).
- **Imagens:** nenhuma quebrada. Hosts carregados: Live Server, `images.unsplash.com`, `fonts.googleapis.com` e `fonts.gstatic.com`.
- **Janelas baixas:** em 1280×600 e 1024×600, os botões da capa terminam em 414 px, dentro da primeira tela.
- **Menu móvel (390):**
  - abre logo abaixo do topo, mesmo com a faixa de demonstração (117 px);
  - o foco vai para "Aplicações";
  - Esc fecha e devolve o foco ao botão.
- **Formulário (390):**
  - envio vazio: resumo "Faltam 3 informações", três mensagens, `aria-invalid` no grupo de ambiente, no material e no nome, e foco no primeiro ambiente;
  - "Orçar cozinha" marcou "Cozinha" e levou o foco ao campo;
  - a plaqueta "Mármore verde" trocou a ficha e as fotos (`aria-pressed="true"`), e "Usar no orçamento" escolheu o material;
  - envio preenchido: o resumo some, o aviso de demonstração recebe o foco e nada é enviado;
  - a prévia ficou idêntica ao esperado, com as observações.
- **Copiar:** um clique real em "Copiar mensagem" retornou "Mensagem copiada." (o texto de teste foi para a área de transferência do computador).
- **Envio real (simulado):** página carregada num iframe com `demo.enabled: false`, número de teste e `window.open` interceptado.
  - A faixa e os avisos de demonstração sumiram, e o botão virou "Enviar pelo WhatsApp".
  - A URL gerada foi `https://wa.me/5511900000000?text=…`, com a mensagem igual à prévia.
  - Nenhuma conversa foi aberta.
- **Teclado (1100 e 1440):**
  - Tab percorre "Pular para o conteúdo", marca, links, CTA do topo, botões da capa, cinco "Orçar…" e as plaquetas;
  - o contorno é visível em todos, e a cor muda por fundo;
  - na capa, o foco é grafite (corrigido nesta rodada).
- **Console:** só a mensagem do Live Server. Aparece também um erro de WebSocket `wss://srcdoc/ws`, gerado pelo iframe do teste de envio (o Live Server injeta o script de recarga no `srcdoc`); ele não acontece na página normal.
- **Não testado:**
  - preferência real de movimento reduzido do sistema (o navegador integrado não emula; regras conferidas no código);
  - leitor de tela;
  - Safari/iOS;
  - publicação real no GitHub Pages;
  - fotos e fonte locais (os arquivos ainda não existem).

## 10. Problemas encontrados e corrigidos

| Problema (rascunho ou rodada atual) | Correção |
|---|---|
| Capa sem força: recorte areia sobre cozinha branca, tudo se misturava | Recorte em pedra quente (`#B9A38C`), texto grafite, cotas grafite |
| Aplicações pareciam cartões (caixa branca com borda), seção com ~1.700 px | Desktop: foto inteira por peça, com plaqueta de texto no canto e juntas. Celular/tablet: texto direto sobre a areia. Textos encurtados. Seção com ~1.450 px em 1440 |
| Plaquetas cobriam quase toda a foto das peças pequenas em 1024 px | Layout em plaquetas só a partir de 1200 px, com linhas mais altas |
| Cozinha em largura total ficava alta demais entre 900 e 1199 px | Proporção 2:1 nessa faixa |
| Ficha do material solta sobre a areia, desconectada do amostruário | Seção de materiais inteira em verde (trilho + ficha); perfis de borda numa faixa areia própria |
| Contorno de foco terracota quase invisível sobre a pedra e o verde | Grafite na capa, areia no amostruário |
| Copiar falhava quando a API de área de transferência era recusada | Reserva com `execCommand('copy')` antes de pedir Ctrl+C |
| `sizes` das fotos das aplicações não batia com os novos pontos de quebra | `sizes` refeito por faixa (1200 px+, 600–1199 px, celular) |

## 11. Pendências

### Bloqueantes
- Nenhuma identificada para a demonstração.

### Recomendadas
1. **Fotos e fonte locais.** Rodar `tools/baixar-recursos.ps1` e ativar `useLocalImages`. Trocar o link do Google Fonts por `css/fontes-locais.css` e o `src`/`srcset`/`preload` da capa pelos arquivos locais. Conferir na aba Rede.
2. **Créditos das fotos.** Os nomes dos autores vieram do rascunho anterior; as fotos foram validadas, mas a autoria não foi reconferida uma a uma na Unsplash nesta rodada.
3. Testar com a preferência real de movimento reduzido (Windows: Acessibilidade > Efeitos visuais > Efeitos de animação).
4. Testar com leitor de tela (NVDA/TalkBack): resumo de erros, aviso de demonstração, plaquetas `aria-pressed`, menu.
5. Revisar a capa num navegador comum em 1280–1920 px, em resolução real.

### Publicação comercial
- [ ] `contact.whatsapp` real e `demo.enabled: false`; testar se abre o WhatsApp certo.
- [ ] Endereço, região, horários, telefone, e-mail, link do Maps e Instagram reais.
- [ ] Revisar com o cliente os materiais que ele realmente trabalha, acabamentos, perfis de borda e descrições técnicas (porosidade, cuidados).
- [ ] Trocar as fotos por obras reais do cliente (com autorização), e só então retirar "Imagem ilustrativa" e as notas.
- [ ] Atualizar ou remover os créditos da Unsplash.
- [ ] Remover o `noindex`; revisar `<title>`, `description` e `og:image` (foto real, 1200×630, URL absoluta do domínio).
- [ ] Favicon com a marca do cliente.
- [ ] Repetir a auditoria (360–1440, teclado, console) depois de trocar o conteúdo, principalmente as plaquetas das aplicações: textos mais longos aumentam a área coberta da foto.
