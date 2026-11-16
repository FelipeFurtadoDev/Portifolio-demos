# PÁTIO · Estética automotiva móvel — DESIGN_NOTES (modelo 16)

Marca fictícia. Terceiro modelo do nicho automotivo, depois de VÉRTICE (04) e PULSO (09).

## 1. Conceito e identidade

Serviço que vai até o cliente. A página mostra como o trabalho é feito, deixa claro onde ele pode ser feito e leva direto ao WhatsApp. A identidade é clara e calma: fundo pérola, divisórias finas, fotos largas, e um vinho usado só onde há decisão (ação principal, marca e um bloco de destaque). Sem diagonais, sem parallax, sem hotspots e sem formulário.

## 2. Arquitetura implementada

Cabeçalho fixo, cinco seções e rodapé.

1. **Abertura** (`#abertura`): foto panorâmica de um profissional lavando um sedã. No desktop, painel pérola de 500 px no canto inferior direito da foto, rente à borda, fora da área de trabalho. No mobile (<900 px), título e botão vêm antes da foto e a legenda fica abaixo dela. Em telas baixas (≥900 px de largura e ≤700 px de altura) o painel vira uma faixa acima da foto. CTA "Consultar atendimento no WhatsApp" e link "Ver bairros atendidos".
2. **Serviços em ação** (`#servicos`): três blocos abertos, de larguras diferentes. Lavagem em quadro panorâmico, higienização em quadro interno sobre faixa caramelo, proteção em close. Cada um lista o que inclui e tem botão de WhatsApp próprio.
3. **Do gesto ao acabamento** (`#acabamento`): três pares (rodas e raios, volante e banco, aplicação e reflexo da pintura), com legendas "No gesto" e "No detalhe". Aviso de que as fotos são ilustrativas.
4. **O PÁTIO vai até você** (`#atendimento`): foto de garagem residencial, bairros por região em lista que se abre (um acordeão acessível) e bloco vinho com as condições do local.
5. **Combine o atendimento** (`#contato`): botão direto, estado do contato (demo ou ativo) e três respostas curtas (chuva, duração, confirmação da visita). Preço e horário ficam para a conversa.

## 3. Paleta e tipografia

| Cor | Hex | Uso |
|---|---|---|
| Vinho | `#792B3D` | marca, ação principal, um bloco de destaque |
| Prata | `#DCE0E3` | fundo dos serviços, divisórias |
| Pérola | `#F7F6F2` | fundo predominante, painel da capa |
| Grafite | `#232629` | texto, navegação, rodapé |
| Caramelo | `#C28E64` | só na higienização interna |
| Vinho escuro | `#5E1F2E` | variante: hover do botão |
| Tinta 2 | `#565C61` | variante: texto secundário |

Contrastes calculados: grafite/pérola 14,06; grafite/prata 11,45; grafite/caramelo 5,32; pérola/vinho 8,72; vinho/prata 7,10; tinta 2 sobre pérola 6,27 e sobre prata 5,10; pérola/vinho escuro 11,35. O botão vinho sobre caramelo tem 3,30, que é limite de componente de interface; ele também tem borda grafite.

Fontes: Barlow Semi Condensed (títulos, 600 e 700) e DM Sans (texto e controles). Ambas SIL OFL 1.1, hoje carregadas do Google Fonts.

## 4. Direção fotográfica e fontes das imagens

Luz natural, carros comuns, gestos de trabalho. Todas da Unsplash (Licença Unsplash, gratuitas, não Unsplash+), com autor no rodapé via `credits`.

| Chave | Foto | Autor | Função |
|---|---|---|---|
| capa | eP8h7YVhFHk | Brad Starkey | protagonista: profissional lavando sedã preto |
| lavagem | DtrI63-Z46I | Willian Cittadin | carro com espuma em pátio |
| interior | 5m5418Ng6t8 | Towfiqu barbhuiya | luva azul higienizando porta |
| protecao | jZdOBQvDOXM | Mohamed Gado | luva aplicando cera no capô |
| roda | Ce_gQ7Z0eAc | Adrian Dascal | escova na roda |
| raios | os_LwBZHi6E | Frankie Lopez | detalhe de raios e pinça |
| volante | _vmBjTG5L1g | Muhammad Saad | microfibra no volante |
| banco | iUkQ06FNOrU | Obi | couro perfurado caramelo |
| aplicacao | 3WR9p-pk2Fg | Tyler | borrifador e microfibra |
| reflexo | 0WwgdD5cfnQ | Sean Foster | reflexo na pintura |
| patio | 1TmI9BTLmiU | Jonas Jaeken | garagem residencial |

Desvios em relação ao briefing, registrados:
- A capa mostra esponja e espuma, não microfibra, e o prédio é de tijolo; não é claramente uma garagem aberta residencial. A composição funciona e o painel não cobre o trabalho, mas vale trocar por cena mais próxima do briefing ou por foto do cliente.
- Nenhuma foto é do trabalho da marca fictícia. Os pares da seção 3 são fotos independentes e estão marcados como ilustrativos; não há "antes e depois".

## 5. Componentes (formato compacto do guia, §7)

```text
Componentes escolhidos: lista de bairros por região em acordeão (definida no briefing, protagonista da seção 4); nenhum componente do acervo foi acrescentado
Objetivos de cada componente: mostrar onde o atendimento acontece sem uma lista longa; deixar claro qual região está aberta; manter o contato geral para quem não vê o bairro
Como influenciaram a arquitetura: a seção 4 virou a prova de cobertura e traz as condições do local; o contato final ficou curto porque a dúvida de "atendem aqui?" já foi respondida
Componentes já usados nos modelos comparados: VÉRTICE e PULSO (ver DESIGN_NOTES de cada um); PÁTIO não repete diagonais, hotspots nem parallax
O que foi deliberadamente evitado: formulário, calculadora, calendário, depoimentos, números de resultado, antes/depois, animação de entrada por seção, GSAP
Alternativas responsivas / reduzido movimento / sem JS: mobile com título antes da foto; faixa acima da foto em telas baixas; prefers-reduced-motion desliga a transição da lista e a rolagem suave; sem JS o menu fica visível e os botões de contato apontam para #contato (a lista de bairros depende de JS, pois vem da configuração)
Pendências e testes observados: ver seções 7 e 9
```

GSAP não foi usado. A única animação é a abertura da lista (grid-template-rows 0fr para 1fr com `visibility` atrasada), que CSS resolve sem dependência.

## 6. Diferenciação

| | VÉRTICE | PULSO | PÁTIO |
|---|---|---|---|
| Clima | industrial, laranja | esportivo, azul | claro, calmo, vinho e prata |
| Composição | blocos pesados | diagonais | fotos largas, divisórias finas, painel no canto |
| Interação | — | — | lista de bairros por região, mensagem por serviço |
| Contato | — | — | WhatsApp direto, com modo demonstrativo |

## 7. Decisões técnicas

- HTML gerado de um template com fotos expandidas em `src`, `srcset`, `width` e `height` (CDN da Unsplash, WebP, larguras de 480 a 2400). Capa sem lazy e com `fetchpriority="high"`.
- Hero em CSS grid com sobreposição, sem `position: absolute`.
- Acordeão: botão com `aria-expanded`/`aria-controls`, painel `role="region"`, uma região aberta por vez, setas, Home e End. Estado indicado por texto ("Aberta"/"Ver bairros"), barra vinho e ícone, não só por cor.
- WhatsApp: com número que case `/^55\d{10,11}$/` e `demo.enabled: false`, os botões viram `wa.me` com mensagem pronta, em nova aba com `noopener noreferrer`. Em demo, abre um `<dialog>` com a mensagem e botão de copiar. Nada é enviado.
- Dados demonstrativos (regiões, bairros, condições) ficam em `PATIO_CONFIG.coverage`, marcados como demonstração.
- `useLocalImages` e `tools/baixar-recursos.ps1` seguem a convenção de MATIZ e PULSO.
- O favicon cresce de ~300 bytes para ~9,5 KB ao ser gravado pela ferramenta de envio (metadado C2PA); é o mesmo efeito dos modelos anteriores.

## 8. Recursos externos e licenças

- Fotos: Unsplash, Licença Unsplash (uso comercial permitido, sem exigir crédito; o crédito é dado por cortesia). Hotlink da CDN por padrão.
- Fontes: Google Fonts, SIL OFL 1.1.
- Nenhuma biblioteca JavaScript.

## 9. Testes realmente realizados

**Playwright no ambiente de trabalho** (servidor local, requisições externas bloqueadas, então fotos externas e fontes não carregam nesse teste; 96 de 96 verificações passaram na última execução):
- 11 larguras: sem rolagem horizontal, nenhum elemento fora da tela, sem erros de JavaScript, dados renderizados.
- Menu mobile, Esc e retorno do foco.
- Lista de bairros: setas, Home, End, Enter, Espaço, uma região por vez, conteúdo oculto quando fechado.
- prefers-reduced-motion.
- Janela demonstrativa, cópia da mensagem, Esc devolvendo o foco.
- Com número de teste: os 7 links viram `wa.me` com a mensagem certa (sem enviar nada); em demo nenhum link aponta para `wa.me`.
- Sem JS.
- Semântica: 1 h1, 5 seções, 11 fotos com alt e dimensões, `lang="pt-BR"`, `noindex`, ids únicos, skip link.

**Navegador integrado com Live Server (porta 5500), com fontes e fotos reais:** inspeção visual em 1440x900, 1366x560, 1100x800, 1024x768, 768x1024, 390x844 e 360x740; 11 de 11 fotos carregadas, fontes Barlow Semi Condensed e DM Sans carregadas, console sem erros, sem rolagem horizontal em 360, 1024 e 1100.

**Não testado:** Safari/iOS, toque real, leitor de tela, prefers-reduced-motion real do sistema, GitHub Pages, WhatsApp com número real, `baixar-recursos.ps1` (não executado), página completa em 360 por captura longa.

**Problemas encontrados e corrigidos:** faixa caramelo colapsada por herdar a grade de 12 colunas; painel da capa alto demais (565 px para 373 px); painel estourando a foto em 1366x560; legenda cobrindo a foto no mobile; fotos repetidas nos pares (trocadas por `volante` e `aplicacao`); fotos retrato altas demais em 768 (bloco de tablet); arquivos desatualizados no disco após o envio (reenviados e conferidos por tamanho).

## 10. Pendências

**BLOQUEANTES:** nenhuma conhecida.

**RECOMENDADAS**
- Trocar a capa por cena mais próxima do briefing (garagem aberta, microfibra) ou por foto do cliente.
- Rodar `tools/baixar-recursos.ps1`, ativar `useLocalImages` e trocar o link das fontes, para a página não depender de CDN.
- Testar em iPhone/Safari e com leitor de tela.
- Avaliar reduzir o número de fotos (11) se o peso na primeira dobra incomodar.
- Conferir o favicon após o envio (inflado pelo metadado).

**PUBLICAÇÃO COMERCIAL**
- Número real de WhatsApp em `contact.whatsapp` e `demo.enabled: false`.
- Regiões, bairros e condições reais em `coverage` (e `demo: false`).
- Nome, marca, textos, preços e horários do cliente; trocar as fotos pelas dele.
- Remover `noindex`, ajustar `<title>`, `description` e `og:image`.
- Domínio, hospedagem e política de privacidade, se houver coleta de dados.
- Revisar o texto da página conforme as regras de publicidade do segmento.

## 11. Observações do repositório

- VÉRTICE (04) não tem `modelo.json` nem README na pasta conectada, então a ficha dele não serviu de comparação. O repositório Portifolio-demos não estava conectado; o catálogo deve ser gerado com o procedimento do projeto (`catalogo\build\copiar-modelo.ps1`).
- Nenhum outro modelo e nenhum recurso compartilhado foi alterado. Nada foi enviado ao Git.
