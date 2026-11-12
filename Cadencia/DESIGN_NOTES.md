# CADÊNCIA · Estética facial: notas de design e decisões técnicas

Modelo 13 do portfólio, terceiro modelo do nicho de estética facial (NÁRIA 01, NEXO 07).
Assinatura: "Cuidado facial que encontra espaço na rotina." Chamada: "Um tempo para cuidar da sua pele."
Data: 12/11/2026.

Skill Frontend Design da Anthropic: **listada na sessão, mas não carregada** (apliquei o planejamento visual a partir do briefing sem invocá-la). Skills GSAP: consideradas e **não usadas**, porque CSS e JS nativos bastam para a seleção, a comparação e as microinterações.

Documentos consultados: `docs/01`, `docs/02`, `docs/acervo_design_landing_pages.md`, `docs/guia_componentes_diferenciacao.md`, DESIGN_NOTES do NÁRIA, do NEXO e do ENTRE (modelo 10), `modelo.json` dos modelos 07, 10, 11 e 12 e o documento de publicação no catálogo. As quatro páginas de referência do briefing (Ella Clinics, Luna Glow, Heyday e Codrops) **não foram abertas**: usei apenas os princípios descritos no briefing (organização dos serviços, cor de identidade, clareza da primeira visita, seleção e comparação).

## 1. Direção aprovada

Cuidado facial organizado e próximo. Abertura clara em faixas, azul como estrutura, damasco como calor, manteiga só para agir e selecionar.

## 2. Diferença em relação aos modelos anteriores

| Aspecto | NÁRIA (01) | NEXO (07) | CADÊNCIA (13) |
|---|---|---|---|
| Capa | Editorial, foto vertical protagonista | Pôster, retrato com marcas de corte | Faixas: título largo, foto horizontal e faixa damasco com as chamadas |
| Paleta | Marfim e ameixa | Ardósia, aqua e coral | Azul profundo, damasco, manteiga, branco quente e grafite |
| Tipografia | Bodoni Moda + Hanken Grotesk | Funnel + Geist Mono | Manrope em pesos 700–800 |
| Serviços | Abas com foto e ficha | Atlas: lista + painel fixo | Três colunas visíveis ao mesmo tempo, sem abrir nada, mais comparação |
| Interação principal | Abas | Lista com painel estável | Seleção de até dois cuidados e comparação lado a lado |
| Primeira visita | Não há seção própria | "Experiência do cuidado" em texto | Sequência de três fotos de proporções diferentes, com legendas |
| Contato | Formulário de agendamento | WhatsApp direto, sem formulário | Cuidado escolhido compartilhado, campos opcionais e mensagem pronta |
| Seções | — | quatro momentos | cinco |

Esta comparação se baseia nos DESIGN_NOTES dos modelos anteriores e no código da CADÊNCIA. Não abri o NÁRIA nem o NEXO no navegador, então a conferência visual direta fica pendente (seção 9).

## 3. Arquitetura (cinco seções)

1. **Abertura** (branco quente + faixa damasco). Rótulo "Estética facial" com traços, título grande, foto horizontal e faixa damasco com descrição e duas ações.
2. **Menu de cuidados e comparação** (branco quente). Três colunas separadas por fios, cada uma com foto 1:1, descrição, ficha (foco, sessão, inclui, duração, valores) e dois controles: "Consultar este cuidado" e "Comparar". Bandeja de comparação fixa no fim da seção.
3. **Sua primeira visita** (damasco). Três fotos de proporções diferentes (4:3, 4:5, 1:1) alinhadas pela base, com número e legenda ao lado.
4. **Quem atende e o espaço** (azul profundo). Retrato ilustrativo, texto, informações práticas e duas fotos menores.
5. **Consulta de horário** (branco quente). Escolha do cuidado, três campos opcionais, mensagem, ação amarela e três dúvidas práticas (sem sexta seção).

O ritmo de cor é claro → claro com faixa → damasco → azul → claro → grafite (rodapé).

## 4. Paleta e contraste

| Cor | Hex | Função | Contraste verificado |
|---|---|---|---|
| Azul profundo | `#243C78` | Marca, títulos, ícones e a seção 04 | 9,9:1 sobre branco quente; branco quente sobre ele 9,9:1 |
| Damasco | `#EDB38C` | Faixa da abertura, seção 03, bloco atrás do retrato | Grafite sobre ele 7,9:1; azul sobre ele 5,7:1 |
| Amarelo manteiga | `#F2DA83` | Ações principais e seleção, sempre com texto grafite | Grafite sobre ele 10,4:1; azul sobre ele 7,6:1 |
| Branco quente | `#FAF8F2` | Fundo predominante | — |
| Grafite | `#252A32` | Texto corrido, legendas e rodapé | 13,6:1 sobre branco quente |

Derivadas criadas para contraste: `--muted #4F5560` (7,1:1 sobre branco quente) e `--azul-claro #D9E0F2` (8,0:1 sobre azul). A manteiga sobre branco quente tem só 1,3:1, então toda superfície manteiga leva borda azul (9,9:1) ou fica sobre azul; ela nunca é texto. O damasco nunca é texto pequeno sobre fundo claro. Sobre o azul, o damasco só aparece em rótulos em caixa alta (5,7:1).

Os valores foram calculados por fórmula de luminância relativa (WCAG), não medidos na página renderizada.

Tipografia: **Manrope** (400–800, Google Fonts, SIL OFL; versão local preparada). Hierarquia por escala, peso e espaçamento.

## 5. Componentes escolhidos

```text
Componentes escolhidos: comparador de até dois serviços (protagonista, a partir da referência Codrops Product Comparison, sem código copiado), ID 17 (apoio)
Objetivos de cada componente: o comparador reduz a dúvida entre dois cuidados mostrando os mesmos atributos em linhas alinhadas; as microinterações do ID 17 dão retorno claro à seleção.
Como influenciaram a arquitetura: o menu mostra os três serviços lado a lado, sem abrir nada, e o cuidado escolhido viaja até a seção de contato, o que muda o percurso (escolher, comparar, consultar).
Componentes já usados nos modelos comparados: abas (NÁRIA), Atlas com lista e painel estável, ID 09 (NEXO), cartões empilhados no scroll, ID 11 (ENTRE). Não conferi o histórico de todos os 12 modelos, então não declaro o comparador "inédito" no catálogo.
O que foi deliberadamente evitado: abas, Atlas, painel fixo, cartões empilhados, capa com texto à esquerda e retrato à direita, quiz de diagnóstico, calendário fictício.
Alternativas responsivas / reduzido movimento / sem JS: ver seção 7.
Pendências e testes observados: seções 8 e 9.
```

**Comparador.** Cada coluna tem um botão `aria-pressed` "Comparar". A bandeja mostra "n de 2 escolhidos" com dois indicadores. Com um cuidado, oferece "Seguir para o contato". Com dois, abre a comparação. Ao tentar um terceiro, a bandeja explica o limite e oferece "Trocar [cuidado]" para cada escolha, ou "Cancelar". "Ainda preciso de orientação" existe na bandeja e no rodapé da comparação.

**Comparação.** `<dialog>` nativo aberto com `showModal()`: foco inicial no botão Fechar, Escape, clique no fundo, rolagem do fundo travada e retorno do foco ao controle de origem. É uma tabela semântica (`th scope`) em grade: no desktop, rótulo e duas colunas; no celular, o rótulo ocupa uma linha e os dois valores ficam lado a lado logo abaixo. Os valores vêm do próprio DOM do menu (uma única fonte). Cada coluna tem "Consultar este cuidado".

**Animação principal.** Na abertura, a foto de cada cuidado escolhido sai da sua posição no menu e assenta na coluna da comparação (transformação uniforme, ambas as fotos são quadradas, então sem distorção). Se a foto do menu está fora da tela, pula-se a animação. Com movimento reduzido, não há animação.

**Microinterações (ID 17).** Botões sobem 2 px no hover e afundam no clique; o ícone do controle de comparação ganha um check com leve salto; os indicadores da bandeja preenchem; as opções do contato (chips) mudam de estado. Nada de ponteiro magnético ou alvo que escapa: o alvo de clique não se move.

**Mensagem.** Montada só com o que foi informado: saudação fixa, cuidado de interesse (ou pedido de orientação, ou "dúvida entre A e B" quando há dois comparados e nenhuma escolha), período, observação e nome. Sem nada preenchido: "Olá! Vim pelo site da CADÊNCIA e gostaria de consultar a disponibilidade de horários."

**Envio.** Com `demo.enabled: true` ou sem número válido, "Consultar disponibilidade" mostra o aviso de demonstração e não abre nada. "Copiar mensagem" copia o texto. Com contato real e `demo.enabled: false`, abre `wa.me` com a mensagem. Não há confirmação de reserva, pagamento, calendário nem envio automático.

**Movimento complementar.** Traços da abertura entram em sequência curta no carregamento; fotos das seções 03 e 04 sobem e aparecem ao entrar na tela (IntersectionObserver, com rede de segurança de 4 s). Sem carrossel, texto em loop, parallax, cursor personalizado, rolagem sequestrada ou áreas fixas longas (a única área fixa é a bandeja, dentro da seção 02).

## 6. Fotografia

Dez fotos (o briefing previa de 7 a 9; ficou acima porque a primeira visita, a profissional e o espaço pedem imagens distintas), todas gratuitas na Unsplash (Licença Unsplash). Verifiquei no navegador que nenhuma é Unsplash+ e que todas carregam. Os créditos aparecem no rodapé e em `js/config.js`, identificados pelo **usuário** da Unsplash; **os nomes completos dos autores não foram confirmados**.

| Uso | Foto (ID Unsplash) | Usuário | Proporção |
|---|---|---|---|
| Abertura | `16mHHrY3PUk` | @ionelaaaaa | 3:2, recortada em faixa |
| Limpeza | `J6Hg_YH2tFk` | @kimick | 2:3 → 1:1 |
| Hidratação | `g-m8EDc4X6Q` | @enginakyurt | 3:2 → 1:1 |
| Massagem | `c-cC9DnjpqA` | @rosaliegdy | 2:3 → 1:1 |
| Conversa inicial | `toteQQX33lk` | @alexandermassph | 2:3 → 4:3 |
| Atendimento | `91dmB8SHiWc` | @ernesto_sams | 2:3 → 4:5 |
| Orientações | `w1an547rkxo` | @crystalweed | 2:3 → 1:1 |
| Retrato ilustrativo | `cDmQ48iNbm8` | @jonathanborba | 2:3 → 4:5 |
| Espaço | `JnsuyfJrxQw` | @mayurroxanphotography | 2:3 → 4:5 |
| Materiais | `TxBQ7yLj6JU` | @contentpixie | 3:2 → 1:1 |

Cuidados na seleção:
- Não repeti nenhuma foto do NEXO (inclusive descartei uma candidata `u93nTfWqR9w`, que o NEXO já usa) nem do NÁRIA, até onde o DESIGN_NOTES do NEXO registra. O NÁRIA não lista os IDs de suas fotos, então uma coincidência não é descartada.
- A massagem é de @rosaliegdy, mesmo usuário de uma foto do NEXO (outra imagem). Se parecerem da mesma sessão, trocar.
- Fotos de sessões diferentes na primeira visita; a legenda da seção diz que não retratam a mesma cliente nem o estúdio.
- O retrato é identificado como ilustrativo e "não é a profissional da marca". As fotos do espaço levam "ilustrativa".
- Sem antes/depois, sem pele retocada artificialmente e sem filtros ou sobreposições sobre as fotos.
- Recortes: foco por `object-position` por foto. A foto de abertura usa recorte mais à direita no celular para manter o rosto.

Fonte das imagens: CDN `images.unsplash.com` com `fm=webp`, `fit=max` e `srcset`. Larguras e proporções declaradas (`width`/`height`) evitam salto de layout. Modo local preparado (ver README).

## 7. Acessibilidade, fallback e movimento

- Semântica: `header`, `nav`, `main`, cinco `section` com `aria-labelledby`, `h1` único, `h2` por seção, `h3` por cuidado/passo, `figure` e `figcaption`, `dl` para fichas, `fieldset` e `legend` para a escolha do cuidado, rádios reais, `details` nativo para as dúvidas.
- Foco visível (3 px, azul; manteiga sobre fundo azul). Link "Ir para o conteúdo". Anúncios de seleção em região `aria-live`.
- Alvos de toque com pelo menos 42 a 48 px de altura.
- **Sem JavaScript:** os três cuidados, a primeira visita, a seção de quem atende, as dúvidas e os links de navegação continuam disponíveis. Os controles "Comparar" e a bandeja ficam ocultos; "Consultar este cuidado" leva à seção de contato, que mostra um aviso explicando que a mensagem precisa de JS e que o contato real aparece ali no site de um cliente. Os campos que dependem do script ficam ocultos.
- **Movimento reduzido:** o CSS limita todas as animações e transições a ~0 e a rolagem suave só existe em `no-preference`; o JS não faz a animação da comparação nem a revelação das fotos. **Verificado apenas por leitura do código e do CSS**: o navegador integrado não emula `prefers-reduced-motion`.

## 8. Testes realizados (Live Server, navegador integrado do Claude Desktop)

Ambiente: Live Server em `http://127.0.0.1:5500`. **Playwright não foi usado**: o servidor Playwright local aparece como "failed" (tempo esgotado) neste computador. Toda a verificação foi feita com o navegador integrado e scripts no contexto da página. **Não arquivei capturas de tela em disco.**

- **Larguras com medição de rolagem horizontal e elementos que passam da tela (nenhum encontrado):** 360 (o navegador reportou 374), 390, 768, 1024, 1100, 1440 e 1440 × 600.
- **Inspeção visual** (capturas na tela): desktop 1440 das cinco seções, comparação desktop, celular 390 de abertura, menu, comparação, seção 03 (primeira foto), seção 04 (retrato e texto) e contato (chips e campos), tablet 768 e 1100 da abertura e da seção 04.
- **Seleção:** zero, um e dois cuidados; tentativa de terceiro com explicação e troca; remoção e re-adição; texto e botões da bandeja a cada estado.
- **Comparação:** abertura por teclado (Enter), Escape, retorno do foco ao botão de origem, rolagem do fundo travada e liberada, duas colunas legíveis no celular sem rolagem horizontal, painel com rolagem interna em altura de 600 px.
- **Transferência para a conversa:** "Consultar este cuidado" na comparação marca o rádio correto, atualiza o resumo e a mensagem e leva o foco para a opção.
- **Mensagem:** nome, período e observação (com espaços sobrando) entram corretamente; contato sem preencher; opção de orientação; alteração do cuidado.
- **Envio sem WhatsApp:** aviso de demonstração visível e `window.open` não é chamado (verificado substituindo a função durante o teste).
- **Copiar:** o clique real mostra "Mensagem copiada." e o botão muda de rótulo. A leitura do conteúdo da área de transferência foi bloqueada pelo navegador (permissão), então **não confirmei o texto copiado**. Observação: esse teste escreveu uma mensagem de exemplo na área de transferência do seu computador.
- **Teclado:** ordem de foco lógica da primeira à última ação do menu (14 tabulações) com anel visível de 3 px.
- **Altura baixa:** a 1440 × 600 título, foto e ações da abertura cabem na primeira tela.
- **Imagens e console:** 10 de 10 imagens carregadas (inclusive as lazy, forçadas) e nenhum erro de console.

Problemas encontrados e corrigidos durante os testes:
1. Colunas do menu com larguras diferentes (padding assimétrico): trocado por `minmax(0, 1fr)` e divisórias absolutas.
2. Legenda do retrato sobre o bloco damasco (contraste insuficiente): bloco movido para um contêiner só da foto.
3. Mensagem com "interesse em a massagem": rótulos mudaram para "na".
4. Observação sem ponto final antes do nome: pontuação acrescentada.
5. Painel da comparação alto demais no desktop: foto reduzida a 140 px e linhas mais compactas.
6. Ordem da comparação seguia a ordem do clique: passou a seguir a ordem do menu.
7. Foco perdido após trocar uma escolha: agora vai para "Comparar agora".
8. Abertura com ações fora da primeira tela a 600 px de altura: regra para telas largas e baixas.
9. Botão do topo quebrado em duas linhas no celular e fichas apertadas: ajustes em telas estreitas.

## 9. Pendências

**BLOQUEANTES:** nenhuma identificada.

**RECOMENDADAS**
- Rodar o Playwright (ou equivalente) nas larguras 360, 390, 600, 768, 900, 1024, 1100 e 1440, com capturas arquivadas. Não testei 600 e 900 isoladamente.
- Testar com a preferência real de movimento reduzido do sistema e em dispositivo de toque, Safari e Firefox (só testei no navegador integrado).
- Abrir NÁRIA e NEXO ao lado da CADÊNCIA para fechar a comparação visual (seção 2).
- Rodar `tools/baixar-recursos.ps1` (não foi executado; o ambiente de desenvolvimento não roda PowerShell), ativar `useLocalImages` e trocar o link das fontes.
- Revisar a foto da massagem (mesmo usuário de uma foto do NEXO) e confirmar os nomes completos dos autores.
- Decidir se 10 fotos servem ou se tira uma (briefing: 7 a 9).
- Favicon embutido no `<head>` (SVG data URI, sem arquivo separado, para evitar injeção de metadados na transferência de arquivos).

**PUBLICAÇÃO COMERCIAL**
- Entrada no catálogo: o `modelo.json` está na pasta, mas a cópia para o repositório `Portifolio-demos` (script `copiar-modelo.ps1`, destino sugerido `Cadencia`) **não foi feita**: esse repositório não está conectado a esta sessão. Prévias desktop e mobile saem do mecanismo existente na publicação.
- Dados reais: nome da marca, profissional, formação e registro, endereço, dias e horários, duração e valores de cada cuidado, WhatsApp e Instagram.
- Fotos reais do estúdio, da profissional e dos atendimentos.
- Domínio, hospedagem, remoção do `noindex` e revisão de título, descrição e imagem de compartilhamento.
- Fonte local (LGPD) e revisão de textos de publicidade conforme a regulamentação da profissão do cliente.
