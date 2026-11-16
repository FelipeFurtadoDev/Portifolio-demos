# QUINA · Bolos sob encomenda — DESIGN_NOTES

Modelo 14 do catálogo, terceiro modelo de confeitaria. Marca fictícia (QUINA) de bolos personalizados para comemorações pequenas e médias. Site demonstrativo: nenhum contato, preço, prazo, área ou resultado é real.

Como abrir: `http://127.0.0.1:5500/14-confeitaria-quina/index.html` (VS Code, Live Server, porta 5500). Os caminhos são relativos, então a pasta também funciona numa subpasta do GitHub Pages.

---

## 1. Conceito e identidade

A página trata o pedido de um bolo como a montagem de uma mesa. O visitante diz a data e quantas pessoas vêm, escolhe formato, acabamento e sabor, e vê um esquema da mesa mudar a cada escolha. No fim sai uma mensagem pronta, só com o que ele informou.

O nome vem de **quina**, o canto. A assinatura gráfica é o canto cortado: botões, cartões e campos têm o canto inferior esquerdo quase reto, e a foto de abertura tem o canto superior esquerdo muito arredondado, como uma fatia. O logo é um círculo petróleo com uma cunha laranja, uma fatia vista de cima.

## 2. Arquitetura implementada (5 seções, mais cabeçalho e rodapé)

| # | Seção | Função comercial |
|---|-------|------------------|
| 1 | Abertura (`#inicio`): "Bolos sob encomenda para a sua mesa." | Foto aérea dominante de um bolo inteiro com a primeira fatia retirada, mais faixa estreita em verde vidro com título, texto e dois botões ("Montar meu pedido" e "Ver formatos e sabores"). |
| 2 | Configurador (`#mesa`): "Qual é o tamanho da sua mesa?" | Data e convidados primeiro; depois formato, acabamento e sabor. Cada grupo aceita "em aberto". Esquema ilustrativo da mesa e resumo ao lado. |
| 3 | Galeria (`#por-fora`): "Por fora e por dentro" | Duas faixas de fotos (formatos e acabamentos; cortes e recheios) com legenda precisa e botão "Usar este acabamento/formato/recheio" que muda só a preferência correspondente. |
| 4 | Encomenda (`#como-funciona`) | Antecedência, retirada ou entrega, quando o pedido é confirmado. Foto de embalagem. Valores de exemplo identificados como demonstração. |
| 5 | Orçamento (`#orcamento`) | Resumo com "Editar", observação opcional, mensagem pronta, copiar e WhatsApp (só com número válido). |

Cabeçalho fixo com logo, quatro âncoras e o botão "Montar meu pedido". Faixa de demonstração no topo.

## 3. Paleta e tipografia

| Cor | Hex | Função visível |
|-----|-----|----------------|
| Petróleo | `#12484A` | Navegação, títulos, contornos, foco, rodapé |
| Verde vidro | `#B8DED4` | Fundo da abertura e do configurador |
| Laranja intenso | `#FF783F` | Ação principal e seleção, sempre com texto escuro |
| Branco porcelana | `#F8FBF9` | Fundos de leitura e separação entre imagens |
| Tinta | `#192824` | Texto corrido |

Contrastes calculados (WCAG): tinta/porcelana 14,7; tinta/vidro 10,5; petróleo/porcelana 9,8; petróleo/vidro 7,0; tinta/laranja 5,9. Petróleo sobre laranja dá 3,9, usado só no anel de foco (mínimo de 3 para componentes de interface). Laranja sobre porcelana dá 2,5, por isso a seleção nunca depende só da cor: a opção marcada ganha ícone de check, contorno mais grosso e a palavra "No seu pedido" na galeria.

Fontes: **Zalando Sans Expanded** (títulos, 500 a 900) e **DM Sans** (leitura e controles). Carregadas pelo Google Fonts; `css/fontes-locais.css` e `tools/baixar-recursos.ps1` deixam a troca para arquivos locais pronta.

## 4. Direção fotográfica

Sete fotos do Unsplash (Licença Unsplash), todas ilustrativas, com `alt` próprio, legenda própria, largura e altura declaradas e `object-position` definido para cada recorte.

| Chave | Função narrativa | Autor | Página da foto |
|-------|------------------|-------|----------------|
| abertura | Imagem protagonista: bolo inteiro de cima, primeira fatia fora. Recorte `50% 78%` mantém bolo e fatia visíveis em desktop, tablet e celular. | Odiseo Castrejon | https://unsplash.com/photos/LTaNflncXV0 |
| redondo | Acabamento com flores de chantilly (vinculada a acabamento "flores") | Liana S | https://unsplash.com/photos/2pYoY2dsh9M |
| retangular | Formato retangular (vinculada a formato "retangular") | Karina Kungla | https://unsplash.com/photos/sxhu7gmKsZ4 |
| ganache | Cobertura de ganache (vinculada a acabamento "ganache") | Olga Petnyunene | https://unsplash.com/photos/zcg3kMd6_Lc |
| corteCreme | Corte com creme (vinculada a sabor "baunilha") | Iain | https://unsplash.com/photos/V5dD8FJeD2E |
| corteChocolate | Corte de chocolate com frutas (vinculada a sabor "chocolate") | Brett Jordan | https://unsplash.com/photos/g3cAM2o8GUs |
| embalagem | Como o bolo sai da confeitaria | Khanh Do | https://unsplash.com/photos/o0wb7fpyvRo |

Fotos de banco de imagens não provam trabalho executado pela marca; o texto da seção e a etiqueta "Foto ilustrativa" dizem isso. Os créditos são montados a partir de `js/dados.js` e aparecem no rodapé.

Elementos gráficos: faixas planas de cor, foto encostada na borda, círculo, retângulo e fatia como contornos. Nenhuma foto recebe filtro, sobreposição ou opacidade.

## 5. Componentes escolhidos

**Componentes escolhidos:** ID 07 (configurador visual, protagonista) e ID 17 (microinterações de seleção).

**Objetivos:** transformar a dúvida "que bolo eu peço?" em um pedido de orçamento completo, sem formulário longo e sem fingir preço.

**Como influenciaram a arquitetura:** o configurador é a seção 2 e a página gira em torno dele. A galeria alimenta o configurador (botão "Usar este..."), o resumo reaparece na seção 5, e a seção de encomenda só explica o que acontece depois. A transição de formato (redondo para retangular) é a única animação de destaque; as seleções têm feedback curto (realce, check, mensagem em região `aria-live`).

**Componentes já usados nos modelos comparados:** o briefing aponta FORMA DOCE (arco, adesivos, canhoto) e AVELA (logo sobreposto, menu em palco fixo). Não consultei o código desses modelos além da leitura inicial de comparação.

**O que foi deliberadamente evitado:** arco, adesivos e canhoto de FORMA DOCE; logo sobreposto à foto e menu em palco fixo de AVELA; a sequência capa, serviços, galeria, contato; cartões idênticos em grade; efeitos de entrada por seção.

**Alternativas responsivas:** em telas estreitas o título e os botões vêm antes da foto (foto quadrada com recorte `50% 78%`); os controles ficam em coluna e o esquema com o resumo vem logo depois; a galeria vira grade de duas colunas com a primeira foto em largura total; o painel lateral só fica fixo quando há altura (acima de 780 px).

**Diferenças em relação a FORMA DOCE e AVELA (teste de diferenciação):** composição da capa (foto dominante com faixa lateral estreita), identidade (petróleo, verde vidro e laranja, em vez das paletas anteriores), ritmo (uma página de decisão em vez de uma vitrine) e interação (esquema da mesa que muda com as escolhas). Quem vê só a primeira dobra reconhece uma página diferente das duas.

## 6. Decisões técnicas

- HTML, CSS e JavaScript puros, sem dependências. **GSAP não foi usado**: a única animação relevante (formato do bolo) é uma transição CSS de `width`, `height` e `border-radius` em variáveis, e o resto é realce curto. Não havia ganho em carregar biblioteca.
- **Uma única fonte de dados**, `js/dados.js` (`window.QUINA_DADOS`): marca, modo demonstração, contato, opções do configurador, fotos e créditos, passos da encomenda. Trocar de cliente é editar esse arquivo.
- Opções são `input[type=radio]` reais com o cartão como `label`, então teclado, leitor de tela e foco funcionam sem script extra. Setas movem a seleção dentro do grupo.
- Grupos aceitam três estados: não escolhido, "em aberto" ou uma opção. A mensagem só inclui o que foi informado; "em aberto" vira "gostaria de orientação".
- Tabela de porções é opcional (`pedido.tabelaPorcoes: null`). Sem ela, o esquema e a mensagem usam só o número de convidados e nunca estimam fatias.
- WhatsApp: botão só aparece com `demo.ativo: false` e `contato.whatsapp` no formato `55` + DDD + número (10 ou 11 dígitos). Sem isso há aviso de demonstração e a cópia continua disponível. Cópia usa `navigator.clipboard` e, se falhar, seleciona o texto para copiar à mão.
- Validação: data a partir de hoje; convidados inteiros de 1 a 300 (`pedido.convidadosMax`); mensagens de erro específicas e `aria-invalid`.
- Sem JavaScript: `<noscript>` com formatos, sabores, fotos, etapas e instruções de contato legíveis.
- `prefers-reduced-motion`: CSS zera animações e transições, `scroll-behavior: smooth` só vale com `no-preference`, e o JS usa rolagem instantânea quando o usuário pede menos movimento.
- Foto da abertura carregada direto no HTML (`preload` com `imagesrcset`, `fetchpriority="high"`); as demais carregam sob demanda.
- `noindex, nofollow` ligado (demonstração).

## 7. Recursos externos e licenças

- Fotos: Unsplash CDN, Licença Unsplash (uso comercial permitido, sem exigir crédito; o crédito é mantido por cortesia).
- Fontes: Google Fonts (Zalando Sans Expanded e DM Sans, SIL Open Font License 1.1). O Google Fonts recebe o IP do visitante; ver pendência de publicação comercial.
- Nenhuma biblioteca JavaScript.
- `assets/favicon.svg` é arte própria.

## 8. Testes realmente realizados

Feitos no navegador integrado, com a página no Live Server (`127.0.0.1:5500`). O Playwright não estava disponível (o `npx` não foi encontrado), então não há capturas automatizadas gravadas em disco; as capturas foram examinadas durante a sessão.

- Recorte da capa conferido em 1440x900, 1024x768, 768, 390 e 360: bolo inteiro e primeira fatia visíveis, sem sobreposição com o título.
- Sem rolagem horizontal e sem imagem quebrada em 360, 390, 768, 1024 e 1440 de largura (auditoria por script); título sem estouro de 360 a 1440.
- Alturas reduzidas: 1024x560 (segundo botão da abertura fica abaixo da dobra, alcançável por rolagem) e 844x390 (título e botões antes da foto, sem sobreposição).
- Largura intermediária 1280x800: navegação em linha, sem overflow.
- Configurador: troca redondo/retangular atualiza esquema e resumo; seleção "em aberto"; botão "Editar" do resumo leva e dá foco ao grupo certo; validação de data passada, convidados 0 e 999, e dados válidos.
- Galeria: "Usar este acabamento" muda só o acabamento, preserva formato e demais dados, mostra mensagem de status; segundo clique informa "já estava no seu pedido".
- Mensagem: pedido vazio, parcial, com "em aberto" e completo.
- Modo demonstração: botão de WhatsApp oculto e aviso visível. Modo real simulado em memória: com número válido o link `wa.me` aparece com a mesma mensagem codificada, `target="_blank"` e `rel="noopener noreferrer"`; com número inválido o botão some.
- Cópia: caminho de seleção manual testado; o clique real funciona, o clique sintético do navegador embutido não grava na área de transferência (limitação do teste).
- Teclado: link "Pular" aparece com foco, anel de foco de 3 px petróleo nos botões, setas trocam a opção do grupo de formato e atualizam o esquema.
- Console: sem erros novos em recargas sucessivas; os erros `Cannot read properties of undefined (reading 'formatos')` que aparecem no histórico do console vieram de recargas iniciais com `dados.js` antigo em cache (o contador não cresceu depois). Aviso de `preload` da capa no navegador embutido ao trocar de viewport: a imagem usada é a correta (1200).
- Seções 3, 4 e 5 conferidas visualmente em 390 de largura.

**Não testado:** `prefers-reduced-motion` (o navegador embutido não emula; revisado só pelo código), aparelhos reais iOS e Android, leitor de tela, visão sem JavaScript no navegador (revisada só pelo HTML), impressão, abertura real do WhatsApp.

## 9. Problemas encontrados e corrigidos

- Legenda dos campos de data e convidados sobre a borda: ganhou wrapper `.caixa`.
- Botão de WhatsApp aparecendo oculto: regra global `[hidden] { display: none !important; }`.
- Ícone de check gigante no botão de copiar: tamanho definido em `.btn svg`.
- Navegação do cabeçalho quebrando em 1000 px: ponto de quebra em 1080 px e `nowrap`.
- Cartões apertados em 768 px: `minmax(14.5rem, 1fr)`.
- Versões antigas de arquivos servidas pelo Live Server durante a edição: verificadas com parâmetro de cache antes de cada teste.

## 10. Pendências

**BLOQUEANTES:** nenhuma conhecida.

**RECOMENDADAS**
- Rodar `tools/baixar-recursos.ps1` (não foi executado) e trocar para fotos e fontes locais; hoje a demonstração depende do CDN do Unsplash e do Google Fonts (precisa de internet).
- Testar em celular real (iOS e Android) e com leitor de tela.
- No celular e no tablet o esquema da mesa aparece depois dos controles, como no briefing (resumo logo abaixo). Se a conversão pedir, um mini-resumo fixo é uma melhoria possível, mas muda a decisão aprovada e não foi aplicado.
- O favicon recebeu um bloco `<metadata>` (C2PA) de cerca de 8 KB do ambiente de geração; pode ser removido sem efeito visual.
- Prévias desktop e mobile do catálogo: a CI do catálogo gera a partir de `index.html` e `modelo.json`. Não executei `copiar-modelo.ps1` nem toquei no repositório de demos.
- Revisar `ordem: 140` no `modelo.json` ao inserir no catálogo.

**PUBLICAÇÃO COMERCIAL**
- Trocar todos os dados de exemplo: contato (`contato.whatsapp`, `contato.instagram`), prazos, retirada e entrega, área atendida, formas de confirmação, sabores e acabamentos reais.
- Substituir as fotos do banco por fotos da confeitaria.
- Definir se haverá tabela de porções (`pedido.tabelaPorcoes`) e o limite de convidados.
- Ajustar `demo.ativo` para `false` e remover a faixa de demonstração.
- Remover `noindex` e configurar domínio, hospedagem, título, descrição e imagem de compartilhamento.
- Se o Google Fonts permanecer, avaliar o aviso de privacidade (LGPD); o ideal é servir as fontes localmente.
- Revisar o texto da seção 4 com as regras reais da confeitaria e, se houver, política de cancelamento e alergênicos.
