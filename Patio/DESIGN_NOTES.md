# PÁTIO · Estúdio de estética automotiva — DESIGN_NOTES (modelo 16)

Marca fictícia. Terceiro modelo do nicho automotivo, depois de VÉRTICE (04) e PULSO (09).

**Revisão de 16/11/2026.** O PÁTIO passou a ser um estúdio que recebe o carro com hora marcada. Foram revistos a capa (título, botão e foto), as seções 4 e 5 e os textos dos serviços e das legendas; o conteúdo da versão anterior sobre atendimento fora do estúdio foi removido da página, do `config.js`, do `modelo.json` e destas notas. Identidade, paleta, tipografia, estrutura de cinco seções e os pares de fotos foram mantidos.

## 1. Conceito e identidade

Um estúdio onde o trabalho é feito com calma e com horário combinado. A página mostra como o serviço é feito, onde fica o estúdio e como entregar e retirar o carro, e leva ao WhatsApp. A identidade é clara: fundo pérola, divisórias finas, fotos largas, e um vinho usado só onde há decisão (ação principal, marca e um bloco de destaque). Sem diagonais, sem parallax, sem hotspots e sem formulário.

## 2. Arquitetura implementada

Cabeçalho fixo (Serviços, Acabamento, Estúdio, Agendamento e botão "Agendar"), cinco seções e rodapé.

1. **Capa** (`#abertura`): h1 "Estética automotiva com hora marcada", botão "Agendar pelo WhatsApp" e link "Ver onde fica o estúdio". Foto panorâmica de polimento da pintura em uma oficina. Em telas de 1280 px ou mais, o painel pérola fica no canto inferior esquerdo da foto, sobre a parede e o pneu, e termina antes da politriz. De 900 a 1279 px e em telas baixas, o painel vira uma faixa acima da foto. No celular, título e botão vêm antes da foto.
2. **Serviços em ação** (`#servicos`): lavagem detalhada, higienização interna (faixa caramelo) e proteção de pintura, em composições de larguras diferentes, cada uma com o que inclui e um botão "Agendar ..." com mensagem própria.
3. **Do gesto ao acabamento** (`#acabamento`): três pares (rodas, interior, pintura), com legendas que descrevem o que cada foto mostra e o aviso de que as fotos de cada par vêm de carros e lugares diferentes.
4. **Onde fica o estúdio** (`#estudio`): foto do ambiente, endereço demonstrativo, horários e, num bloco vinho, as etapas de chegada, entrega do carro e retirada. Todos os dados vêm de `PATIO_CONFIG.studio` e estão marcados como demonstração.
5. **Agendamento e dúvidas** (`#agendamento`): botão "Agendar pelo WhatsApp", estado do contato e três perguntas frequentes (agendamento, tempo estimado, retirada do carro).

## 3. Paleta e tipografia

| Cor | Hex | Uso |
|---|---|---|
| Vinho | `#792B3D` | marca, ação principal, um bloco de destaque |
| Prata | `#DCE0E3` | fundo dos serviços e do agendamento, divisórias |
| Pérola | `#F7F6F2` | fundo predominante, painel da capa |
| Grafite | `#232629` | texto, navegação, rodapé |
| Caramelo | `#C28E64` | só na higienização interna |
| Vinho escuro | `#5E1F2E` | variante: hover do botão |
| Tinta 2 | `#565C61` | variante: texto secundário |

Contrastes calculados: grafite/pérola 14,06; grafite/prata 11,45; grafite/caramelo 5,32; pérola/vinho 8,72; vinho/prata 7,10; tinta 2 sobre pérola 6,27 e sobre prata 5,10; pérola/vinho escuro 11,35. O botão vinho sobre caramelo tem 3,30, que é limite de componente de interface; ele também tem borda grafite.

Fontes: Barlow Semi Condensed (títulos, 600 e 700) e DM Sans (texto e controles). Ambas SIL OFL 1.1, hoje carregadas do Google Fonts.

## 4. Direção fotográfica e fontes das imagens

Luz natural nos gestos, ambiente de estúdio na capa e na seção 4. Todas da Unsplash (Licença Unsplash, gratuitas, não Unsplash+), com autor no rodapé via `credits`.

| Chave | Foto | Autor | Função |
|---|---|---|---|
| capa | z6o7bOvvalU | Luay Barani | protagonista: profissional polindo o capô de um carro escuro em uma oficina (novo) |
| lavagem | DtrI63-Z46I | Willian Cittadin | carro com espuma |
| interior | 5m5418Ng6t8 | Towfiqu barbhuiya | luva azul higienizando porta |
| protecao | jZdOBQvDOXM | Mohamed Gado | luva aplicando produto no capô |
| roda | Ce_gQ7Z0eAc | Adrian Dascal | escova na roda |
| raios | os_LwBZHi6E | Frankie Lopez | raios e pinça |
| volante | _vmBjTG5L1g | Muhammad Saad | microfibra no volante |
| banco | iUkQ06FNOrU | Obi | couro perfurado caramelo |
| aplicacao | 3WR9p-pk2Fg | Tyler | borrifador e microfibra |
| reflexo | 0WwgdD5cfnQ | Sean Foster | reflexo na pintura |
| estudio | cNQoYkRJmQk | Deniz Demirci | ambiente de estúdio com spots no teto e prateleira de produtos (novo) |

Saíram: a capa anterior (Brad Starkey, lavagem em área externa) e a foto de ambiente residencial (Jonas Jaeken).

Observações sobre as fotos:
- A capa mostra uma oficina, com pneus empilhados e parede branca. Serve como "estúdio ou box", mas não é um estúdio de estética de aparência polida. A foto é horizontal e fechada: não aparece o rosto do profissional.
- A foto do ambiente mostra um sedã de luxo (com o emblema da marca) em um box bem iluminado. Não é um carro de uso comum.
- A foto de lavagem (carro coberto de espuma) foi feita ao ar livre. Foi mantida porque ainda ilustra o serviço, e a legenda a descreve como ilustração de banco de imagens.
- Nenhuma foto é do trabalho da marca fictícia. Os pares de fotos vêm de carros e lugares diferentes e estão apresentados como ilustrações do processo e do acabamento, nunca como antes e depois.

## 5. Componentes (formato compacto do guia, §7)

```text
Componentes escolhidos: pares de fotos "gesto e acabamento" (protagonista, seção 3); perguntas frequentes em acordeão (apoio, seção 5)
Objetivos de cada componente: mostrar como cada etapa é feita e que aparência ela busca, sem prometer resultado; tirar as dúvidas de agendamento, tempo e retirada sem alongar a página
Como influenciaram a arquitetura: a seção 3 fica no centro da página, entre os serviços e o estúdio; o estúdio fecha a prova de confiança antes do agendamento, que termina em perguntas curtas
Componentes já usados nos modelos comparados: VÉRTICE e PULSO (ver DESIGN_NOTES de cada um); PÁTIO não repete diagonais, hotspots nem parallax
O que foi deliberadamente evitado: formulário, calculadora, calendário, depoimentos, números de resultado, antes/depois, animação de entrada por seção, mapa incorporado, GSAP
Alternativas responsivas / reduzido movimento / sem JS: celular com título antes da foto; faixa acima da foto de 900 a 1279 px e em telas baixas; prefers-reduced-motion desliga a transição das perguntas e a rolagem suave; sem JS as respostas ficam todas visíveis e os botões levam a #agendamento (endereço, horários e etapas dependem de JS e trazem aviso para chamar no WhatsApp)
Pendências e testes observados: ver seções 9 e 10
```

GSAP não foi usado. A única animação é a abertura das perguntas (grid-template-rows 0fr para 1fr, com `visibility` atrasada), que CSS resolve sem dependência.

## 6. Diferenciação

| | VÉRTICE | PULSO | PÁTIO |
|---|---|---|---|
| Clima | industrial, laranja | esportivo, azul | claro, calmo, vinho e prata |
| Composição | blocos pesados | diagonais | fotos largas, divisórias finas, painel no canto da foto |
| Componente | — | — | pares gesto e acabamento; perguntas em acordeão |
| Contato | — | — | WhatsApp direto, com modo demonstrativo |

## 7. Decisões técnicas

- HTML gerado de um template, com fotos expandidas em `src`, `srcset`, `width` e `height` (CDN da Unsplash, WebP, larguras de 480 a 2400). Capa sem lazy e com `fetchpriority="high"`.
- Capa em CSS grid com sobreposição, sem `position: absolute`. A foto tem pouco espaço livre: a politriz fica a 37% da largura. Por isso o painel (largura `clamp(360px, 31vw, 440px)`, título de até 48 px) só sobrepõe a foto a partir de 1280 px; abaixo disso vira faixa acima dela, para nunca cobrir a ferramenta.
- Perguntas frequentes: botão com `aria-expanded`/`aria-controls`, painel `role="region"`, perguntas independentes, a primeira aberta, setas, Home e End. O estado é indicado por barra vinho, ícone e cor, não só por cor. O HTML já traz as respostas; o CSS só as esconde com a classe `js`.
- WhatsApp: com número que case `/^55\d{10,11}$/` e `demo.enabled: false`, os botões viram `wa.me` com mensagem pronta, em nova aba com `noopener noreferrer`. Em demo, abre um `<dialog>` com a mensagem e botão de copiar. Nada é enviado. Mensagens: geral, por serviço (`{servico}`) e de entrega do carro.
- Endereço, horários e etapas ficam em `PATIO_CONFIG.studio`, marcados como demonstração.
- `useLocalImages` e `tools/baixar-recursos.ps1` seguem a convenção de MATIZ e PULSO; a tabela de fotos do script foi atualizada para a capa e o ambiente novos.
- O favicon cresce de ~300 bytes para ~9,5 KB ao ser gravado pela ferramenta de envio (metadado C2PA); é o mesmo efeito dos modelos anteriores.

## 8. Recursos externos e licenças

- Fotos: Unsplash, Licença Unsplash (uso comercial permitido, sem exigir crédito; o crédito é dado por cortesia). Hotlink da CDN por padrão.
- Fontes: Google Fonts, SIL OFL 1.1.
- Nenhuma biblioteca JavaScript.

## 9. Testes realmente realizados

**Playwright no ambiente de trabalho** (servidor local, requisições externas bloqueadas, então fotos externas e fontes não carregam nesse teste; 125 de 125 verificações passaram na última execução, em 1440x900, 1366x768, 1100x800, 1024x768, 900x700, 768x1024, 600x900, 390x844, 360x740, 1366x560 e 390x560):
- Sem rolagem horizontal, nenhum elemento fora da tela, sem erros de JavaScript e dados do estúdio renderizados em todos os tamanhos.
- Capa: painel antes da foto no celular e na faixa; no desktop largo, painel dentro da foto, encostado na base, com a borda direita antes da politriz; botão "Agendar pelo WhatsApp" dentro da primeira tela nos tamanhos com altura de 700 px ou mais.
- Menu móvel, Esc e retorno do foco; navegação por teclado até "Estúdio"; todas as âncoras existem e as antigas (#atendimento, #contato) não aparecem.
- Perguntas frequentes: abertura padrão, setas, Home, End, Enter, Espaço, abertura independente, conteúdo oculto quando fechado, foco visível por teclado.
- prefers-reduced-motion.
- Modo demonstração: nenhum link aponta para `wa.me`; a janela abre com a mensagem geral (topo, capa e agendamento), por serviço (lavagem, higienização, proteção) e de entrega do carro; copiar mensagem e Esc devolvendo o foco.
- Com número de teste: os 7 links viram `wa.me` com a mensagem certa, sem enviar nada.
- Sem JS; semântica (1 h1, 5 seções, 11 fotos com alt e dimensões, `lang="pt-BR"`, `noindex`, ids únicos, skip link, título e descrição novos, texto alternativo e créditos da capa e do estúdio, pares de fotos preservados).
- Varredura de texto, HTML e configuração: nenhuma ocorrência dos termos da versão anterior (atendimento fora do estúdio, visita, bairros, cobertura e requisitos do local).

**Navegador integrado com Live Server (porta 5500), com fontes e fotos reais:** inspeção visual da capa em 1440x900, 1024x768 e 390x844, e das seções do estúdio e do agendamento em 1440x900 e 390x844. Ficaram sem inspeção visual no navegador: 768, 360 e a página inteira em 1024 (esses tamanhos só passaram nas verificações de geometria do Playwright).

**Não testado:** Safari/iOS, toque real, leitor de tela, prefers-reduced-motion real do sistema, GitHub Pages, WhatsApp com número real, `baixar-recursos.ps1` (não executado), prévias do catálogo (ver seção 10).

**Problemas encontrados e corrigidos nesta revisão:**
- Com o painel à direita, ele cobria o tronco e a mão do profissional; passou para a esquerda, onde há parede e pneus.
- Mesmo à esquerda, o painel de 500 px encostava na politriz em 1440 e a cobria em 1024; ficou mais estreito (até 440 px) e, abaixo de 1280 px, virou faixa acima da foto.
- Envio de arquivos para a pasta do computador ficou com versão antiga em várias tentativas; cada arquivo foi reenviado e conferido pelo conteúdo servido pelo Live Server.

## 10. Pendências

**BLOQUEANTES:** nenhuma conhecida.

**RECOMENDADAS**
- A página publicada no catálogo (`.../Portifolio-demos/Patio/`) ainda é a versão anterior. Para atualizá-la, copiar o modelo com `catalogo\build\copiar-modelo.ps1` e fazer commit e push; as prévias de desktop e celular são fotografadas pelo GitHub Actions nesse push. Nada disso foi feito aqui porque a pasta `Portifolio-demos` não está conectada a esta sessão.
- Trocar a capa por foto de um box de estética com aparência de estúdio (ou do cliente), e a foto de lavagem por uma feita em ambiente coberto.
- Rodar `tools/baixar-recursos.ps1`, ativar `useLocalImages` e trocar o link das fontes, para a página não depender de CDN.
- Inspeção visual em 768 e 360 px e testes em iPhone/Safari e com leitor de tela.
- Conferir o favicon após o envio (inflado pelo metadado).

**PUBLICAÇÃO COMERCIAL**
- Número real de WhatsApp em `contact.whatsapp` e `demo.enabled: false`.
- Endereço, horários e etapas reais em `studio` (e `demo: false`); considerar mapa ou link de rota.
- Nome, marca, textos, preços e horários do cliente; trocar as fotos pelas dele.
- Remover `noindex`, ajustar `<title>`, `description` e `og:image`.
- Domínio, hospedagem e política de privacidade, se houver coleta de dados.
- Revisar o texto da página conforme as regras de publicidade do segmento.

## 11. Observações do repositório

- VÉRTICE (04) não tem `modelo.json` nem README na pasta conectada, então a ficha dele não serviu de comparação.
- Nenhum outro modelo e nenhum recurso compartilhado foi alterado. Nada foi enviado ao Git.
