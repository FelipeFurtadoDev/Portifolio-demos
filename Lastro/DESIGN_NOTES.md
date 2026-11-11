# DESIGN_NOTES · Modelo 12 · LASTRO (versão 2: vitrine de ambientes e acabamentos)

Reestruturação pedida em 11/11/2026. A versão 1 (configurador de orçamento, quatro
seções) foi arquivada em `../_versoes/12-lastro-v1-configurador/`, porque ela não
estava no Git local. A página publicada em Portifolio-demos/Lastro não foi tocada.

**Aviso sobre o briefing:** a mensagem chegou cortada em "A direção do LASTRO é
editorial". As decisões abaixo seguem o que foi escrito até ali; a interpretação de
"editorial" é minha (ver Conceito) e deve ser confirmada.

## Conceito e identidade visual
Dark premium acolhedora: marrom-café em vez de preto frio, areia clara no texto e um
único toque de latão (botões de seleção, contador, marcadores). A fotografia manda:
fotos grandes, em luz baixa, com a pedra como assunto. "Editorial" foi lido como
revista de decoração: títulos serifados grandes, texto curto, fotos sangrando para a
borda e legendas que explicam o que olhar na pedra. A marca LASTRO e o símbolo em L foram
mantidos (agora em latão sobre marrom).

## Arquitetura (cinco seções, mais cabeçalho e rodapé)
1. **Abertura** (`#inicio`): foto da ilha de pedra escura, promessa, dois botões e atalhos para os três ambientes.
2. **Ambientes** (`#ambientes`): três painéis que se abrem (cozinha, banheiro e lavabo, sala e estar); cada um tem texto, peças típicas, galeria de 3 fotos e "Guardar referência".
3. **Detalhes** (`#detalhes`): mosaico de 5 fotos com legendas sobre acabamento, borda e recorte, mais uma nota com três perguntas para escolher a pedra.
4. **Peças** (`#pecas`): seis peças sob medida (cada uma leva à conversa já indicada) e o caminho do projeto em quatro passos (sequência real, por isso numerada).
5. **Conversa** (`#conversa`): referências guardadas, peças de interesse, nome, cidade, observações e mensagem pronta (copiar ou abrir no WhatsApp).
Fora das seções: cabeçalho fixo com contador "Referências", rodapé com créditos e a galeria em tela cheia (`<dialog>`).

## Paleta e tipografia
| Papel | Cor |
|---|---|
| Fundo | `#15110E` (café-escuro) |
| Superfícies | `#1D1814`, `#28211A`; linhas `#3B3228` |
| Texto / secundário | `#F2EADF` / `#BFB09D` |
| Acento (latão) | `#D1A566` |
| Botão principal | marfim `#EFE5D4` com texto `#1A140F` |

Contrastes calculados (WCAG): texto/fundo 15,8:1; secundário/fundo 8,9:1; latão/fundo 8,3:1; botão marfim 14,6:1; placeholder/campo 4,6:1.
Tipografia: **Instrument Serif** (títulos, nomes de ambientes e peças) e **Geist** (texto e controles). Sem itálico, sem caixa-alta, sem rótulos decorativos.

## Direção fotográfica
15 fotografias reais (verificação visual; ver pendências), todas escolhidas por luz baixa e quente e pela pedra em primeiro plano. Estratégia: capa em foto horizontal com a ilha na metade inferior; ambientes em fotos verticais cortadas por `object-position` (um valor para desktop, outro para celular) para manter a pedra à vista; detalhes em proporção natural, sem filtros, só uma sombra de legenda. O texto dos painéis tem sombra lateral (desktop) ou inferior (celular) para não cobrir a pedra. Nenhum filtro de saturação ou opacidade sobre as imagens.

| Chave | Uso | Autor (Unsplash) |
|---|---|---|
| hero | capa | laura adai |
| coz1, coz2, coz3 | cozinha | Taylor Friehl; Sam Moghadam; Franco Debartolo |
| ban1, ban2, ban3 | banheiro e lavabo | DP Singh Bhullar; serjan midili; Christian Mackie |
| est1, est2, est3 | sala e estar | Franco Debartolo (3) |
| det1..det5 | detalhes | Franco Debartolo; laura adai (2); Craig Lovelidge; Sam Moghadam |

Links das fotos e autores: `js/config.js` (`fotos`) e rodapé da página. Licença Unsplash (páginas conferidas: "Fotografia grátis", não Unsplash+). Fotos ilustrativas; a página diz que não são trabalhos da marca.

## Componentes e função comercial
Formato compacto (como no guia de componentes):
- **Painéis de ambientes que se abrem** (adaptação do ID 02, galeria editorial expansível). Função: mostrar três ambientes com muita foto sem rolar três blocos longos. Desktop: painéis lado a lado que se expandem; celular: sanfona vertical. `aria-expanded`, botões reais, conteúdo fechado fora da ordem de tabulação.
- **Galeria em tela cheia** (`<dialog>` nativo). Função: ver a pedra em tamanho grande. Setas, teclado, deslize, Esc, foco devolvido ao botão que abriu.
- **Referências guardadas** (interação própria, não consta no catálogo). Função: transformar o desejo em conversa. Cada foto tem "Guardar referência"; contador no cabeçalho; a bandeja na Conversa lista e remove; guardado em `sessionStorage` (só nesta aba).
- **Mosaico de detalhes**: três colunas de altura igual; legendas sobre o que olhar (polido, fosco, veio, recorte, borda).
- **Mensagem pronta** (mantida da versão 1, simplificada): vira texto com nome, cidade, peças, referências e observações; sem medidas.

### Diferença em relação ao ORLA e à versão 1
- ORLA: arquitetura tátil de desenho técnico (cotas, juntas, amostras penduradas, perfis de borda, carimbo, orçamento como prancha, Geologica). LASTRO não tem nenhum desses elementos.
- LASTRO 2: a fotografia organiza a página; navegação por painéis que se abrem e galeria; orçamento vira conversa curta; tipografia serifada editorial em fundo escuro quente.
- Versão 1 do LASTRO: o configurador SVG ocupava o centro da página; agora não existe esquema, medida ou esboço, e as fotos são 15 (antes 3).
- Teste de diferenciação: se trocar logotipo e cores, a ORLA continua parecendo um caderno técnico e o LASTRO continua parecendo uma revista de ambientes.

## Decisões técnicas
- HTML, CSS e JavaScript puros; sem framework. **GSAP não usado**: transições de painel, galeria e entrada da capa são resolvidas com CSS e `<dialog>`.
- Uma única entrada orquestrada (capa); o resto responde a ações. `prefers-reduced-motion` desliga transições e animações.
- Painéis em CSS grid sobreposto (sem `position: absolute` para o conteúdo), `flex-grow` animado no desktop e `height` no celular.
- Mosaico em três colunas flex com `object-fit: cover` para fechar a altura; abaixo de 1000 px vira grade natural.
- Dados centralizados em `js/config.js` (marca, demo, contato, fotos e créditos, peças); textos de seção no HTML para funcionarem sem JavaScript.
- WhatsApp vazio e modo demonstração ligado: o botão só explica que nada foi enviado; nenhum link externo abre. Em modo real, abre `wa.me` com a mensagem codificada.
- `noindex, nofollow` ativo (demonstração).
- Cache: o `index.html` usa `?v=` nos CSS/JS; aumente o número ao editar.
- Modo local de fotos/fontes pronto (`useLocalImages`, `tools/baixar-recursos.ps1`, `css/fontes-locais.css`), mas **não executado** (45 WebP e 2 fontes ainda não baixados).

## Recursos externos e licenças
Fotos: Unsplash (licença Unsplash). Fontes: Google Fonts, SIL Open Font License 1.1. Nenhum script de terceiros.

## Testes realmente feitos
**Navegador integrado do Claude Desktop, com Live Server (imagens reais da CDN):** revisão visual em 1440×900, 1024×768, 768×1024, 390×844 e 360×640; abertura dos três painéis; galeria no desktop e no celular (corrigido depois); guardar/remover referências; menu móvel a 360 px; carregamento das 15 fotos em 1600 px e das duas fontes.
**Playwright (Chrome do sandbox, fotos trocadas por uma imagem de teste e fontes bloqueadas):** sem rolagem horizontal e sem erros de JavaScript em 360, 390, 768, 1024 e 1440 px; cinco seções; troca de painéis; painel fechado fora da tabulação; galeria por teclado (Enter, setas, Esc, foco devolvido, rolagem restaurada); guardar dentro da galeria; mensagem com nome, peça, referências e observação; WhatsApp em demonstração e sem número; persistência após recarregar; cópia da mensagem com a área de transferência real; deslize no `<dialog>` (simulado com mouse); menu móvel por toque; `prefers-reduced-motion`; página sem JavaScript (texto, imagens e navegação presentes); ordem de Tab; altura do cabeçalho a 360 px; altura da galeria no desktop.
**Capturas** em `capturas/` (navegador integrado, imagens reais; no desktop o painel de capturas reduz para ~620 px de largura).

### Problemas encontrados e corrigidos
- Capa mais alta que a janela (a altura da foto empurrava o conteúdo): altura fixada na grade.
- Texto dos painéis cobria a pedra: sombra lateral em vez de faixa inferior, e lista de peças escondida em telas menores.
- Faixa horizontal visível no degradê do painel: degradê separado em camada própria.
- Mosaico com colunas desiguais: colunas flex de altura igual.
- Foto da galeria maior que a tela no desktop: linhas da grade com `minmax(0, 1fr)`.
- Cabeçalho quebrava em duas linhas a 360 px: marca e botões compactados.
- Deslize não funcionava com mouse (arrastar da imagem): `draggable="false"`.
- Foco não voltava ao botão quando a galeria abria por script: foco guardado e devolvido no `close`.

## Pendências
**BLOQUEANTES:** nenhuma conhecida.

**RECOMENDADAS**
- Confirmar o restante do briefing (a mensagem terminou em "A direção do LASTRO é editorial") e a interpretação editorial usada.
- Conferir a autenticidade das fotos: não consigo garantir se algumas (em especial as de Franco Debartolo: coz3, est1, est2, est3, det1) são fotografias ou imagens geradas/renderizadas. Trocar por fotos próprias do cliente na venda.
- Rodar `tools\baixar-recursos.ps1` e ativar `useLocalImages` e as fontes locais antes de apresentar (evita depender da CDN).
- Testar em celular de verdade, Firefox e Safari; deslize por toque real; leitor de tela; medir desempenho (Lighthouse).
- Na ordem de Tab, o mosaico segue as colunas (de cima para baixo, coluna a coluna); aceitável, mas pode ser reordenado.
- Apagar da pasta `capturas/` as imagens da versão 1 que sobraram: `ajuda-celular-390.jpg`, `configurador-celular-390.jpg`, `configurador-desktop-1440.jpg`.
- A capa e as capturas a 1440 px foram vistas pelo painel reduzido; vale conferir em tela cheia.

**PUBLICAÇÃO COMERCIAL**
- Nome real, textos de peças, contato, número de WhatsApp (`contact.whatsapp`) e `demo.enabled: false`.
- Fotos reais do cliente (ou licença Unsplash revisada), créditos atualizados.
- Domínio, hospedagem, remoção do `noindex`, favicon e metadados (título, descrição, imagem de compartilhamento).
- Conferir se "mármore, granito e quartzito" e as peças listadas correspondem ao que o cliente realmente oferece.
