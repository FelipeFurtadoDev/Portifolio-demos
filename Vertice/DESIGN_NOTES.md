# VÉRTICE Detail Lab — Notas de design e decisões técnicas

Modelo 04 do catálogo. Marca fictícia de estética automotiva (detalhamento e conservação de veículos).
Assinatura: "Cada detalhe muda o resultado."

- Versão inicial: 09/11/2026.
- **Revisão 2 (09/11/2026, tarde):**
  - correção responsiva;
  - página reduzida a 4 experiências;
  - paleta mais viva;
  - nova foto de capa.

---

## 0. Revisão 2: o que mudou e por quê

### Arquitetura (de 7 blocos para 4)
| Antes | Agora |
|---|---|
| Abertura (foto escura em sangria, título sobre o preto) | **1. Capa:** título em fundo claro, foto colorida em faixa logo abaixo e faixa laranja com os 4 serviços |
| Serviços em 4 composições longas, com "O que inclui" e "Indicado quando" | **2. Serviços:** grade 2×2 com foto, área, nome, uma frase e 3 itens curtos em etiquetas |
| Laboratório de superfícies (4 amostras com "Observamos / Tratamos") | **3. Galeria "Detalhes do trabalho":** 4 fotos com legenda de uma linha; a luz de inspeção foi mantida |
| Orçamento | **4. Orçamento (seção laranja):** formulário, prévia e informações práticas juntos |
| "Como funciona o atendimento" (seção própria, 4 etapas longas) | Removida; virou 3 passos curtos no topo do orçamento |
| Encerramento com CTA genérico | Removido; o CTA é o próprio formulário. WhatsApp, horário, local e retirada ficam ao lado da prévia |

Altura da página em 1440 px: ~10 900 px → **~6 500 px**.

O menu agora tem Serviços, Galeria, Contato e Pedir orçamento.

### Cor
- O laranja passou de `#ED693B` (cobre) para **`#FF5A1F`**, quase a cor do carro da capa.
- O cobre continua como referência histórica, mas não é mais usado.
- **Fundos claros dominam:** capa, serviços e rodapé de contato em gelo/branco. O carbono ficou só no topo, na galeria e no painel da prévia.
- **Momentos de cor chapada:** a faixa de serviços da capa e a seção inteira de orçamento em laranja, com texto carbono (5,9:1).
- As fotos foram escolhidas para destacar do fundo: carro laranja sobre tijolo e aço, gotas prata, couro vermelho e espuma iluminada.

### Correções responsivas
| Problema | Correção |
|---|---|
| Título sobre a foto exigia cálculos frágeis de altura; em janelas baixas ou intermediárias o texto encostava no carro | Texto e foto em blocos separados: nunca se sobrepõem. O título é limitado a 16% da altura da tela no desktop, para a foto aparecer na 1ª tela mesmo em janelas baixas |
| Menu móvel aberto com a faixa de demonstração visível: o painel (fixo em `--topo-h`) cobria o próprio topo e o botão "Fechar" | O painel é posicionado pela base real do topo ao abrir e ao redimensionar |
| 360×740: só ~150 px da foto da capa na 1ª tela; botões empilhados | Botões lado a lado abaixo de 600 px e espaçamentos menores: ~250 px de foto visíveis |
| Âncoras do menu paravam sob o topo fixo | `scroll-padding-top` ajustado; as seções param 12 px abaixo do topo em todas as larguras testadas |
| Grades com fotos podiam forçar largura | `minmax(0, 1fr)` e `min-width: 0` nas colunas |

Nenhum `overflow: hidden` foi usado para esconder problema. A única regra de recorte é a das fotos da galeria, que recortam a própria luz de inspeção (é o efeito).

---

## 1. Identidade e conceito

**Cinematográfico industrial com cor.** O galpão de tijolo, os portões de aço e o carro laranja da capa definem a paleta. A tipografia condensada e as marcações de "linha de luz" seguem o vocabulário da inspeção de pintura. A revisão manteve o conceito e trocou o "preto com cinza" por contraste entre claro, laranja chapado e fotos saturadas.

Elementos próprios mantidos:
- **Linha de luz:** filete de reflexo de lâmpada tubular usado como marcador e divisor.
- **Lâmpada de inspeção** na galeria: uma faixa de luz inclinada que acompanha o cursor ou o dedo e só ilumina as fotos.
- **Pictogramas de veículo** no formulário.
- **Símbolo "V"** com ponto no vértice (logo e favicon).

## 2. Arquitetura atual

0. Faixa de demonstração (some com `demo.enabled: false`).
1. **Topo fixo** (carbono) com marca, menu e "Pedir orçamento". Abaixo de 900 px vira menu em tela cheia.
2. **Capa** (`#capa`):
   - título "CADA DETALHE / MUDA O RESULTADO." (Big Shoulders 800, caixa alta);
   - texto de apoio e os CTAs "Pedir orçamento" e "Ver serviços";
   - foto em faixa de largura total;
   - faixa laranja com os 4 serviços como atalhos.
3. **Serviços** (`#servicos`, gelo): Polimento técnico, Proteção de pintura, Higienização interna e Detalhamento completo. Grade 2×2 a partir de 1024 px, coluna única abaixo. Cada um tem "Incluir no orçamento", que marca o serviço no formulário.
4. **Galeria** (`#galeria`, carbono):
   - "Detalhes do trabalho": 4 fotos (inspeção, pintura, faróis e vidros, rodas) com legendas de uma linha;
   - aviso "Imagens ilustrativas… não mostram serviços realizados pela VÉRTICE".
5. **Orçamento** (`#orcamento`, laranja):
   - título e os 3 passos (é uma sequência real);
   - formulário em painel branco e prévia da mensagem em painel carbono;
   - abaixo da prévia: WhatsApp, horário, local e retirada (de `config.contact`).
6. **Rodapé:** marca, aviso de demonstração e créditos das fotos e fontes.

## 3. Tipografia e paleta

| Token | Hex | Uso |
|---|---|---|
| Carbono | `#121416` | Topo, galeria, painel da prévia, texto sobre claros e sobre laranja |
| Grafite | `#2A2F31` | Fundo de espera das fotos, balão da prévia |
| Laranja | `#FF5A1F` | Seção de orçamento, faixa de serviços, botões, etiquetas de área, marcações |
| Laranja claro | `#FF7A45` | Hover de botões |
| Laranja forja | `#B93A0A` | Texto e foco laranja sobre gelo (5,1:1) |
| Gelo | `#F4F2EC` | Capa e serviços |
| Branco | `#FFFFFF` | Painel do formulário, campos |
| Titânio | `#AAB2B4` | Texto secundário sobre carbono |
| Aço | `#4A5154` | Texto secundário sobre claros (7,2:1) |

Contrastes verificados:
- carbono sobre laranja: 5,9:1;
- laranja sobre carbono: 5,9:1;
- branco sobre laranja: só 3,1:1, por isso **não é usado para texto**.

- **Big Shoulders Display** (títulos) e **Schibsted Grotesk** (texto), locais, OFL.
- Sem rótulos em caixa alta, sem destaque de palavra isolada e sem setas em botões.

## 4. Estratégia fotográfica

9 fotos da Unsplash (Licença Unsplash, todas gratuitas; licença conferida na página de cada foto), locais em `assets/img`.

| Papel | Foto (autor) | Observação |
|---|---|---|
| **Capa (nova)** | Porsche 911 GT3 RS laranja em 3/4 dianteiro, diante de galpão de tijolos com portões de aço (Robert Cichol) | Placa apagada no arquivo local; sem alternativa remota de propósito |
| Polimento técnico | Politriz com fita de proteção, macro (Neelabh Raj) | Mantida |
| Proteção de pintura | Gotas sobre capô prata (Vitalii Abakumov) | Mantida |
| Higienização interna | Couro vermelho e console (Douglas Fehr) | Mantida, recorte sem o volante |
| Detalhamento completo | Carro coberto de espuma no box iluminado (Zulfahmi Khani) | Mantida |
| Galeria: inspeção | Profissional trabalhando em carro preto (Zac Nielson) | Saiu do atendimento para a galeria |
| Galeria: pintura (nova) | Lateral de carro laranja com reflexos e roda escura (Bailey Mahon) | Conversa com a capa |
| Galeria: faróis | Farol com feixe de luz (Kyle Winkle) | Mantida |
| Galeria: rodas | Raios de roda e pinça vermelha (Ian Edokov) | Mantida |

### Por que a nova capa
A foto anterior (sedã preto de perfil sobre fundo preto) era sofisticada, mas escura, lateral e "chapada": o carro quase se fundia ao fundo, e em telas pequenas virava uma silhueta. A nova capa:
- **tem cor própria:** o laranja do carro é a cor da marca, e a paleta foi ajustada a partir dele;
- **separa bem o carro do fundo:** laranja saturado contra tijolo terroso e portões de aço cinza-azulado, com asfalto escuro embaixo;
- **mostra um ângulo mais forte:** 3/4 dianteiro, com volume, vincos do capô, farol e roda em primeiro plano;
- **tem luz natural difusa e legível**, com reflexos no capô e na lateral, sem estourar;
- **combina com o conceito industrial:** galpão de tijolo e portões metálicos, sem showroom genérico;
- **funciona nas duas telas:** 16:10 (desktop) e 5:4 (celular) mantêm o carro inteiro, com a frente em destaque.

Cuidados:
- a placa foi apagada no arquivo (privacidade). Por isso a capa não volta para a URL original da Unsplash se o arquivo faltar;
- nenhuma foto é apresentada como trabalho da marca, e não há antes/depois.

## 5. Funcionalidades
- Menu móvel acessível: foco no 1º link, Esc fecha e devolve o foco, foco preso no menu e posição calculada abaixo do topo.
- Textos, serviços, legendas da galeria, passos e contato configuráveis em `js/config.js`.
- Formulário de orçamento:
  - veículo com pictogramas, modelo opcional, serviços (múltiplos), objetivo, nome e observações;
  - validação com mensagens por bloco, resumo e foco no primeiro erro;
  - prévia ao vivo e "Incluir no orçamento" nos serviços.
- Envio:
  - modo demonstração: "Preparar mensagem" mostra o aviso e "Copiar mensagem". Nada é enviado;
  - número configurado e `demo.enabled: false`: "Enviar pelo WhatsApp" abre `wa.me` com a mensagem.
- Imagens locais com alternativa remota automática (exceto a capa), luz de inspeção na galeria e créditos gerados no rodapé.
- `prefers-reduced-motion`: sem animações de entrada, sem passagem automática da luz e sem rolagem suave.

## 6. Diferenças em relação aos modelos anteriores

| | NÁRIA (01) | Forma Doce (02) | TRAÇO (03) | VÉRTICE (04) |
|---|---|---|---|---|
| Direção | Editorial sensorial | Pop artesanal | Fashion / régua | Industrial cinematográfico com cor |
| Capa | Texto/foto lado a lado | Arco central | Título + foto + régua | Título em bloco claro + foto colorida em faixa + barra laranja de serviços |
| Tipografia | Bodoni + Hanken | Shrikhand + Bricolage | Archivo expandida | Big Shoulders condensada + Schibsted |
| Peça central | Abas | Adesivos-filtro | Lookbook | Galeria com luz de inspeção |
| Conversão | Formulário simples | Comanda | Ficha fixa | Seção laranja com formulário, prévia e contato juntos |

**Para o próximo modelo, evitar:** seção de orçamento em cor chapada, Big Shoulders, linha de luz / lâmpada interativa, pictogramas no formulário e barra de serviços colada à capa.

## 7. Decisões técnicas
- HTML, CSS e JS puros; fontes e imagens locais; caminhos relativos (GitHub Pages em subpasta).
- `noindex, nofollow` mantido (demonstração).
- `[hidden] { display: none !important; }` evita que classes com `display` reexibam elementos ocultos.
- CSS e JS com `?v=23` para evitar cache.
- A ferramenta de transferência acrescenta ~5,8 KB de metadados (C2PA) em cada imagem; as imagens funcionam normalmente.

## 8. Testes realizados na revisão 2 (Live Server, navegador integrado)

- **Larguras e alturas:**
  - 360×740, 390×844, 600×900, 768×1024, 900×700, 1024×768, 1100×800 e 1440×900;
  - janelas baixas: 1366×560 e 390×560.
- **Em todas as medidas acima:**
  - rolagem horizontal 0 (`scrollWidth` = largura), nenhum elemento fora da tela;
  - nenhum título ou botão com texto cortado;
  - foto da capa visível na 1ª tela: de 258 px (1366×560) a 535 px (768×1024).
- **Âncoras** (Serviços, Galeria, Orçamento): as seções param 12 px abaixo do topo fixo em 360 e 1440.
- **Capturas inspecionadas:** página inteira em 1440; capa em todas as medidas; serviços em 360 e 1440; galeria em 390×560 e 1440; orçamento em 390×560 e 1440; rodapé em 1440.
- **Menu móvel (390×560):** o painel começa abaixo do topo (115 px com a faixa de demonstração), o foco vai para "Serviços", e Esc fecha, devolve o foco e libera a rolagem.
- **Formulário (390×560):**
  - "Incluir no orçamento" (Proteção) marcou o serviço;
  - o envio incompleto mostrou "Faltam 3 informações" e levou o foco ao veículo;
  - completo, mostrou o aviso de demonstração e a prévia correta.
- **Teclado (1440):** sequência de Tab do "Pular para o conteúdo" até os créditos do rodapé, na ordem esperada.
- **Carregamento (aba nova, 1440):**
  - 9 de 9 imagens carregadas, 15 recursos, todos do próprio domínio, nenhum com erro;
  - console só com a mensagem do Live Server.
  - Na aba antiga apareceram um 404 e um `ERR_CONTENT_LENGTH_MISMATCH` sem origem identificada; não se repetiram na aba nova (provável resíduo de recargas durante a gravação dos arquivos).
- **Não testado:** preferência real de movimento reduzido do sistema, leitores de tela, Safari/iOS e publicação no GitHub Pages.

## 9. Pendências

### Bloqueantes
- Nenhuma.

### Recomendadas
1. **Apagar arquivos sem uso** em `assets/img`, que sobraram da versão anterior: `abertura-*`, `encerramento-*`, `couro-*` e `verniz-*` (8 arquivos). Não foi possível apagá-los a partir deste ambiente.
2. `completo-1400.webp` (~290 KB) e `capa-2400.webp` (~310 KB) são os arquivos mais pesados. Se o desempenho importar, gerar versões com qualidade menor.
3. Testar movimento reduzido real (Windows: Acessibilidade > Efeitos visuais) e leitor de tela (NVDA/TalkBack).
4. Conferir no Safari.

### Publicação comercial
- [ ] `contact.whatsapp` real e `demo.enabled: false`; testar o WhatsApp.
- [ ] Endereço, horário, política de retirada e Instagram reais.
- [ ] Textos dos serviços revisados com o cliente, sem prazos ou garantias que ele não possa cumprir.
- [ ] Fotos do cliente, com autorização; remover "Imagem ilustrativa" só para fotos de trabalhos reais.
- [ ] Atualizar ou remover créditos da Unsplash.
- [ ] Remover `noindex`; revisar `<title>`, `description` e `og:image`.
- [ ] Favicon e símbolo do cliente.
- [ ] Repetir a auditoria em todas as larguras depois da troca de conteúdo.
