# TRAÇO Studio — Notas de design e decisões técnicas

Modelo 03 do catálogo. Marca fictícia de nail design, nail art, extensão de cílios e design de sobrancelhas.
Data: 09/11/2026.

## 1. Identidade e conceito

**Fashion studio + instrumento de medida.** O nome "traço" virou o elemento gráfico do site: **fios cobalto com marcações de régua e anotações técnicas**, como uma ficha de formato de unha ou o paquímetro do design de sobrancelhas. A linguagem é precisa e fria, sem ornamento suave: tipografia expandida e pesada, cantos retos, fotografia grande e contrastada.

A ousadia ficou concentrada em dois pontos: a **abertura** (título enorme + foto cobalto + régua que atravessa a tela) e o **lookbook**. O resto é disciplinado.

## 2. Paleta e tipografia

| Token | Hex | Uso |
|---|---|---|
| Gelo | `#F0EDE7` | Fundo base, abertura, lookbook |
| Carbono | `#202023` | Texto, faixa do método, ficha, encerramento, rodapé |
| Cobalto | `#3559E6` | Botões, régua, números dos looks, bordas de destaque. Branco sobre cobalto: ≈5,6:1 |
| Prata | `#C7C4BE` | Linhas finas sobre branco, rótulos sobre carbono |
| Branco | `#FFFFFF` | Fundo da seção de serviços, etiquetas sobre fotos |
| Cobalto escuro | `#2443C2` | **Criado**: hover dos botões e números da régua (≈6,8:1 sobre gelo) |
| Cobalto claro | `#8FA6FF` | **Criado**: o cobalto original sobre carbono dá ≈2,9:1, insuficiente para texto. Usado em números, linhas do mapeamento e foco sobre fundos escuros (≈7:1) |
| Grafite | `#4E4D52` | **Criado**: texto secundário sobre gelo (≈7,1:1) |
| Cinza claro | `#A9A7A2` | **Criado**: texto secundário sobre carbono (≈6,8:1) |

- **Família única: Archivo** (variável, Google Fonts, OFL), explorando o eixo de largura:
  - títulos com `font-stretch: 125%` e peso 800–850, entrelinha 0,86–0,92 e espaçamento negativo;
  - informações pequenas em largura normal, de 13 a 15 px;
  - números (looks, régua, etapas) também expandidos.
- Sem rótulos em caixa alta, sem destaque de palavra isolada em títulos, sem monoespaçada e sem setas em botões.
- A marca "TRAÇO" em caixa alta é o logotipo, não um rótulo.

## 3. Arquitetura

1. **Aviso de demonstração** (faixa carbono). Some com `demo.enabled: false`.
2. **Topo fixo** com a marca, quatro links e "Agendar horário". Abaixo de 900 px vira menu em tela cheia (carbono, links grandes expandidos).
3. **Abertura**. A grade muda de ordem por tamanho de tela:
   - desktop: título e texto à esquerda, foto à direita sangrando até a borda, régua cobalto em toda a largura na base;
   - celular e tablet: título → foto → régua → texto e botões, para a foto aparecer na primeira tela.
4. **Lookbook** — 8 pranchas numeradas em grade de 12 colunas, com alturas e deslocamentos desencontrados. Cada uma tem legenda técnica e o botão "Quero esse visual".
5. **Método** (carbono) — foto macro de sobrancelha com o **mapeamento** desenhado em SVG (início, arco e final) e três etapas numeradas (é uma sequência real: leitura, desenho, acabamento).
6. **Serviços + agendamento fundidos** — três listas selecionáveis (unhas, cílios, sobrancelhas), cada uma com foto de processo fixa ao rolar. Ao lado fica a **ficha** (fixa no desktop).
7. **Encerramento** (carbono) — foto azul intensa em altura total, "Hora marcada, sem pressa.", informações práticas (horários, região, pontualidade, pagamento) e os três passos de agendamento.
8. **Rodapé** — aviso de marca fictícia e créditos gerados pelo `config.js`.
9. **Barra fixa "Agendar"** (até 1023 px) — aparece depois da abertura, mostra quantos serviços estão na ficha e some quando a ficha está na tela.

## 4. Estratégia fotográfica

14 fotos da Unsplash (Licença Unsplash), escolhidas visualmente no navegador entre cerca de 240 candidatas. O critério: fotos macro e editoriais do serviço em si, sem rostos sorrindo nem produtos soltos.

| Papel | Foto (autor) | Enquadramento |
|---|---|---|
| **Protagonista** | Unhas amendoadas cobalto com ponta francesa prata (Margarita Yutsaytis) | 4:5 no celular, 5:4 no tablet, coluna de altura total no desktop. A cor da foto é a cor da marca |
| Look 01 | Mãos com unhas vermelhas longas sobre roupa preta (Christian Agbede) | 4:5 grande |
| Look 02 | Unhas pretas e tartaruga sobre suéter cinza (Bryony Elena) | 2:3 |
| Look 03 | Macro de cílios volumosos (Samela Carvalho) | 3:4 |
| Look 04 | Ombré azul quadrado (Margarita Yutsaytis) | 9:16, a mais alta |
| Look 05 | Stiletto vermelho sobre preto (Felicia Montenegro) | 2:3 |
| Look 06 | Olhar com sobrancelha marcada em luz baixa (E. Norman) | 4:3 |
| Look 07 | Luvas de renda e unhas em tom natural (Wilhelm Gunkel) | 2:3 |
| Look 08 | Nail art metalizada de estampas sobre pelúcia (de Aura) | 5:3 panorâmica |
| Método | Close de sobrancelha definida (Veronika Veronikamaks) | 3:4 nativo, para o SVG coincidir com a foto |
| Serviços | Técnica de luvas pretas esmaltando (Mariia Belinska); aplicação de extensão com pinças (Victor Sirbu); pinça na sobrancelha (Stefan Vibes) | 2:3 fixas ao rolar; 16:9 no celular |
| Encerramento | Mão na água azul intensa (Sol B) | Altura total no desktop, 4:5 no celular |

- Nenhum filtro, nenhuma sobreposição escura e nenhuma redução de opacidade.
- Todas as fotos levam "Imagem ilustrativa". O lookbook e o rodapé dizem que não são trabalhos do estúdio.
- Duas fotos do lookbook são de uma nail designer real (perfil @marsnails na Unsplash); continuam creditadas e não são apresentadas como trabalho da marca fictícia.

## 5. Elementos gráficos característicos

- **Régua cobalto** com marcas a cada 12, 60 e 120 px. Os números são gerados por JS conforme a largura. É o único movimento automático do site: ela se desenha da esquerda para a direita ao carregar, e a anotação aparece logo depois.
- **Anotação técnica** presa à foto protagonista (ponto, fio e etiqueta "Amendoada, ponta francesa prata").
- **Mapeamento de sobrancelha** em SVG sobre a foto do método, com marcos rotulados.
- **Números dos looks** grandes, expandidos e em cobalto, sobre um fio carbono.
- **Formatos de unha desenhados em SVG** na ficha (quadrada, amendoada, bailarina, stiletto, ainda não sei).
- Caixas de seleção quadradas próprias e chips retos. Nenhum `border-radius` decorativo e nenhuma sombra.

## 6. Funcionalidades

- **Ficha de agendamento**:
  - a seleção de serviços vira uma lista com botão "Tirar";
  - o formato da unha só é perguntado quando o serviço pede;
  - também há período, dias possíveis (opcional), nome e observações (opcional);
  - a prévia da mensagem é atualizada a cada mudança.
- **"Quero esse visual"**:
  - marca os serviços do look e pré-seleciona o formato;
  - inclui "Referência: look 05 do lookbook (Stiletto vermelho)" na mensagem;
  - destaca a prancha, rola até a ficha e leva o foco para o título dela.
- **Validação**: exige pelo menos um serviço e um nome com 2 ou mais caracteres. Mostra a mensagem junto ao campo, aplica `aria-invalid` e leva o foco ao primeiro erro.
- **Envio**:
  - em modo demonstração ou sem número válido, o botão se chama "Preparar mensagem". A ficha mostra um aviso, nada é enviado, e o botão "Copiar mensagem" usa a área de transferência ou, como reserva, seleciona o texto;
  - com o número configurado e a demonstração desligada, abre `https://wa.me/<número>?text=…`.
- **Menu móvel**: `aria-expanded`, foco no primeiro link ao abrir, Esc fecha e devolve o foco, o foco fica preso no menu aberto e a página não rola por trás.
- **Barra fixa**: fora da tela recebe `aria-hidden` e `tabindex="-1"`, para não ser alcançada pelo teclado.
- **Imagens locais opcionais** (`useLocalImages`), com volta automática para a URL remota.

## 7. Diferenças em relação aos modelos anteriores

| | NÁRIA (01) | Forma Doce (02) | TRAÇO (03) |
|---|---|---|---|
| Direção | Editorial sensorial, quente | Pop artesanal, energético | Fashion studio, geométrico e frio |
| Tipografia | Bodoni Moda + Hanken Grotesk | Shrikhand + Bricolage | Uma família só (Archivo), com contraste de largura |
| Abertura | Texto à esquerda, foto à direita | Título dividido em volta de um arco | Título gigante + foto sangrando + régua em toda a largura; no celular, título → foto → texto |
| Peça central | Abas de "sumário" | Adesivos-filtro + cardápio | Lookbook numerado em grade desencontrada, ligado à ficha |
| Conversão | Formulário convencional | Comanda com canhoto | Serviços e ficha no mesmo bloco, com ficha fixa e barra móvel |
| Aviso de demonstração | — | `<dialog>` | Painel dentro da própria ficha |
| Ornamento | Mínimo | Rendado, selo, sombras sólidas | Só linhas de medida e anotações |

**Para o próximo modelo, evitar:** régua/anotação técnica, Archivo expandida, lookbook numerado com "Quero esse visual", ficha carbono fixa ao lado de listas e barra fixa inferior de agendamento.

## 8. Decisões técnicas

- As imagens têm `srcset` de 480 a 1600 px, `sizes` por papel, `width`/`height` e `loading="lazy"` abaixo da dobra. A protagonista usa `preload` com `imagesrcset` e `fetchpriority="high"`.
- As tags `<img>` foram geradas por script a partir de um registro único. As URLs não foram digitadas à mão.
- Favicon SVG embutido em data URI, formado só por retângulos (não depende de fonte). O modelo 01 registrou injeção de metadados C2PA em arquivos de imagem e SVG transferidos.
- A abertura no desktop usa `min-height: min(100svh − topo, 56rem)`, para não esticar em telas muito altas.
- Container query na lista de serviços: preço à direita do nome só quando a lista tem 32rem ou mais. Títulos dos grupos em `cqi`, para "Sobrancelhas" não quebrar no meio.
- `overflow-wrap: normal` nos títulos de seção: palavras longas não são cortadas.
- Arquivos CSS e JS com `?v=3`, para o navegador não usar versões antigas em cache.
- `prefers-reduced-motion: reduce` desliga a animação da régua e da anotação, as transições e a rolagem suave. As animações só existem dentro de `no-preference`.

## 9. Testes realizados (09/11/2026, Live Server, navegador integrado do Claude Desktop)

Observação: o painel do navegador estava com cerca de 317 px de largura. As larguras foram emuladas pela ferramenta de viewport, e as capturas de 768, 1024 e 1440 px saíram reduzidas. Para os detalhes no desktop, apliquei uma ampliação temporária por `transform` só durante a inspeção.

- **Capturas e inspeção visual** em 360, 390, 768, 1024 e 1440 px (página inteira em 360, 1024 e 1440; abertura e lookbook em 768; ficha e menu em 360 e 390).
- **Rolagem horizontal**: medida por script nas cinco larguras. Resultado: 0 elementos fora da tela e `scrollWidth` igual à largura da janela.
- **Imagens**: 14 de 14 carregadas nas cinco larguras, nenhuma quebrada.
- **Console**: sem erros no modo normal. Os 14 avisos 404 vistos durante os testes vieram da simulação do modo de imagens locais sem os arquivos, que é o comportamento esperado.
- **Menu móvel**: abriu, focou "Lookbook" e fechou com Esc, devolvendo o foco ao botão.
- **"Quero esse visual"** (looks 04 e 05): marcou os serviços e o formato, preencheu a referência e destacou a prancha, e o foco foi para o título da ficha.
- **Validação**: com o nome vazio, mostrou o erro, aplicou `aria-invalid` e focou o campo.
- **Modo demonstração**: "Preparar mensagem" mostrou o aviso, nada foi aberto e "Copiar mensagem" copiou o texto.
- **Modo real (simulado)**: com o número configurado e a demonstração desligada, injetados antes do `main.js` e com `window.open` interceptado, a URL gerada foi `https://wa.me/5511900000000?text=…`, e a mensagem decodificada foi idêntica à prévia. Nenhuma conversa foi aberta.
- **Barra fixa**: apareceu depois da abertura com "1 serviço na ficha" e sumiu sobre a ficha.
- **Teclado**: ordem de tabulação do topo até o botão da abertura verificada, com contorno de foco visível.
- **Modo de imagens locais sem arquivos**: as 14 fotos voltaram para a versão remota, com aviso no console.
- **URLs do script de download**: 28 imagens (WebP) e 1 fonte (woff2), todas com HTTP 200.
- **Não testado**:
  - a preferência real de movimento reduzido do sistema (o navegador integrado não a emula); a regra foi conferida no código;
  - o script PowerShell em si;
  - o modo local com os arquivos presentes;
  - leitores de tela.

## 10. Problemas encontrados e corrigidos

| Problema | Correção |
|---|---|
| A anotação da foto saía pela direita no celular (rolagem horizontal de 44 px em 360 px) | A anotação passou a crescer para a esquerda do ponto |
| No celular, a foto protagonista ficava abaixo da primeira tela | A abertura foi dividida em cabeça e corpo, e a ordem passou a ser título → foto → régua → texto |
| No tablet, a foto 4:5 ocupava ~960 px de altura | Proporção 5:4 entre 640 e 1023 px, com a anotação recalculada |
| Abertura gigante em telas muito altas | Altura mínima limitada a 56rem |
| "Serviços e agendamento" quebrava no meio de "agendamento" em 1440 px | Cabeçalho em coluna única e `overflow-wrap: normal` nos títulos |
| Em 1024 px, a lista de serviços espremia nome e preço, e "Sobrancelhas" quebrava | Container query para o layout da linha e título dos grupos em `cqi` |
| Rótulos dos formatos de unha encostavam em 360 a 390 px | Grade automática com mínimo de 4,6rem por opção |
| O mapeamento da sobrancelha não coincidia com a foto | Marcos e linhas recalculados sobre a foto em 3:4 nativo |
| Legendas dos looks 07 e 08 não correspondiam às fotos (unhas vermelhas e oncinha) | Renomeados para "Renda e nude" e "Prata e estampas", com textos alternativos corrigidos |
| A marca gigante no rodapé encostava na borda e repetia um clichê | Substituída pela marca em tamanho normal |
| A ferramenta de transferência às vezes gravava a versão anterior do arquivo | Cada arquivo foi conferido pelo tamanho depois de gravado e regravado quando necessário |

## 11. Pendências

### Bloqueantes
- Nenhuma identificada para a demonstração.

### Recomendadas
1. Rodar `tools/baixar-recursos.ps1`, ativar `useLocalImages` e trocar a fonte para `css/fontes-locais.css`. Depois, conferir na aba Rede se as fotos vêm de `assets/img`.
2. Revisar a abertura e o lookbook com o painel do navegador largo (ou num navegador comum) em 1024 e 1440 px. As capturas desta revisão foram reduzidas pelo tamanho do painel.
3. Testar com a preferência real de movimento reduzido:
   - Windows: Acessibilidade > Efeitos visuais > Efeitos de animação;
   - ou Chrome DevTools: Rendering > `prefers-reduced-motion`.
4. Testar com leitor de tela (NVDA ou TalkBack) a ficha, as mensagens de erro e o anúncio da contagem.
5. A foto de cílios em 1200 px pesa ~560 KB em WebP q72. Se for usada em tamanho grande, reduzir para q60.
6. As posições da anotação e do mapeamento são calibradas para estas fotos. Ao trocar as fotos, reposicionar `.anotacao` e o SVG `.mapa`, ou removê-los.

### Publicação comercial
- [ ] `contact.whatsapp` real e `demo.enabled: false`; testar se abre o WhatsApp certo.
- [ ] Instagram, região/endereço, horários, formas de pagamento e políticas reais (tolerância e remarcação).
- [ ] Serviços, durações e preços reais. Confirmar com a profissional a frase sobre materiais individuais/esterilizados.
- [ ] Trocar as fotos por trabalhos reais da cliente, com autorização de uso de imagem. Remover "Imagem ilustrativa" e os avisos de banco de imagens só quando as fotos forem dela.
- [ ] Atualizar ou remover os créditos da Unsplash.
- [ ] Remover o `noindex`; revisar `<title>`, `description` e `og:image` (de preferência uma foto real, 1200×630).
- [ ] Favicon com a marca da cliente.
- [ ] Fontes locais (LGPD: evita enviar o IP do visitante ao Google) e avaliar aviso de privacidade, se houver serviços de terceiros.
- [ ] Repetir a auditoria em 360, 390, 768, 1024 e 1440 px depois de trocar o conteúdo.
