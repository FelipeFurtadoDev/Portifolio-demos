# PINGO · Banho & Tosa — DESIGN_NOTES (modelo 17)

Marca fictícia: salão de banho e tosa de bairro para cães. O tutor leva o cão e combina o horário pelo WhatsApp.
Página demonstrativa, `noindex`, sem número de WhatsApp configurado.

## 1. Conceito e identidade visual

Balcão de pet shop bem desenhado. Três ideias sustentam a página:

- **Cardápio de parede**: os serviços são linhas largas, alinhadas como um menu de balcão (nome + diferença essencial, com linha pontilhada até o resumo na capa).
- **Etiqueta de coleira**: toda foto ou serviço recebe uma etiqueta arredondada com ponto terracota, que diz o que a foto mostra e se é ilustrativa.
- **Placa de balcão**: "Hora marcada. O salão confirma o horário pelo WhatsApp." e a ficha "É só contar na conversa".

Tom de texto: direto, de bairro, português do Brasil. Sem avaliações, números ou garantias inventados.

## 2. Arquitetura implementada (5 seções)

| # | Seção | id | Função |
|---|-------|----|--------|
| 1 | Capa | `#inicio` | Título "Banho e tosa, com hora marcada", botão "Consultar horários", link "Ver os serviços", colagem de duas fotos, mini-menu |
| 2 | Menu de banho e tosa | `#servicos` | Componente principal: 3 linhas expansíveis |
| 3 | O salão por dentro | `#salao` | Composição estática: 1 foto grande + 2 menores com legendas |
| 4 | Antes de trazer seu cão | `#antes` | Ficha de balcão: porte, pelagem, primeira visita (conteúdo, não formulário) |
| 5 | Endereço, horários e WhatsApp | `#contato` | Dados demonstrativos, selo de empresa fictícia, botão geral |

Arquivos: `index.html`, `css/styles.css`, `js/config.js`, `js/main.js`, `assets/favicon.svg`, `modelo.json`, `README.md`, `tools/baixar-recursos.ps1`, este arquivo.

## 3. Paleta e tipografia

| Nome | Hex | Uso |
|------|-----|-----|
| Marfim | `#F8F5EC` | fundo predominante |
| Verde-petróleo | `#173F3A` | texto, cabeçalho, blocos de contraste |
| Verde-piscina | `#63C9B0` | superfícies e painéis |
| Amarelo-manga | `#FFC653` | ação principal (texto petróleo) |
| Terracota | `#B84D3A` | pequenos elementos gráficos (pontos das etiquetas, sublinhado do link) |

- **Bricolage Grotesque** (títulos, com eixos `opsz`, `wdth`, `wght` e `font-stretch`): personalidade, títulos condensados e pesados.
- **DM Sans** (texto e interface).
- Fontes via Google Fonts; alternativa local pelo script `tools/baixar-recursos.ps1` (não executado).

## 4. Direção fotográfica

Fotos reais de banco de imagens (Unsplash), luz natural ou difusa, enquadramentos próximos, cenas de trabalho. Todas marcadas como "Foto ilustrativa" nas etiquetas, para não parecerem o salão fictício. Legendas descrevem o que cada foto mostra.

| Uso | Autor | ID Unsplash | Licença | Recorte / papel |
|-----|-------|-------------|---------|-----------------|
| Capa, principal (secagem) | Neakasa | `ndyLOhEEFuQ` | Unsplash License | Protagonista da página; `fetchpriority=high`; cão e secador inteiros em todas as larguras |
| Capa, detalhe (escovação) | Neakasa | `s1cbq_XroX0` | Unsplash License | Sobrepõe só o canto superior direito (ombro do tutor) |
| Menu: banho | Ayla Verschueren | `yE5hlzDapEo` | Unsplash License | Foto da linha "Banho" |
| Menu: tosa higiênica | Ludek Pytloun | `JtbE42YVp0s` | Unsplash License | Foto da linha "Banho com tosa higiênica" |
| Menu: tosa completa | Buddy AN | `LpK2xddrElI` | Unsplash License | Foto da linha "Banho com tosa completa" |
| Salão: mesa de acabamento | zutail happytail | `7NhFIMS9QH0` | Unsplash License | Destaque 4:3 |
| Salão: espaço de banho | Eliza Ari | `1W7bJqkvdSc` | Unsplash License | Menor, 2:3 |
| Salão: área de secagem | Sandy Andrade | `SpAdugxTZVQ` | Unsplash License | Menor, 2:3 |

Licença conferida na página de cada foto. Créditos exibidos no rodapé e em `PINGO_CONFIG.credits`.

**Lacunas registradas**

- Não há foto real de interior de salão com área de banho ou secagem como estações. As três imagens de "O salão por dentro" ilustram as etapas, não o espaço fictício.
- A foto da mesa de acabamento mostra o cão com focinheira; é aceitável para ilustrar, mas vale trocar.
- A foto principal da capa tem título "secador" no Unsplash e descrição "tosa"; a legenda descreve só o que se vê (cão sendo seco/escovado).
- A foto da tosa completa também aparece no modelo 05 (BOLHA & BENTO).

## 5. Componentes, função comercial e diferenças

**Componente principal: menu de serviços em três linhas expansíveis.** Cada linha mostra nome e diferença essencial; aberta, revela foto, "O que está incluso" e botão para pedir horário daquele serviço. Mais de uma linha pode ficar aberta; no mobile o conteúdo abre logo abaixo da linha tocada. A mensagem do botão leva o nome do serviço.

**Apoio: colagem de fotos com etiquetas de coleira** (capa e salão) e **ficha de balcão** (porte, pelagem, primeira visita).

| Aspecto | VÃO (11) | BOLHA & BENTO (05) | PINGO (17) |
|---------|----------|--------------------|------------|
| Capa | arco | revista, logotipo largo | texto + colagem de duas fotos, mini-menu |
| Serviços | galeria horizontal | mosaico | menu vertical expansível |
| Jornada | roteiro de visita em passos | — | ficha de balcão, sem passos |
| Cores | — | menta/coral | marfim, petróleo, piscina, manga |

Evitado de propósito: capa em arco, galeria horizontal, roteiro passo a passo, formulário, calendário, orçamento automático, avaliações, GSAP.

**Formato compacto (guia de diferenciação)**

- Componentes escolhidos: menu vertical expansível (acordeão independente) como protagonista; colagem com etiquetas como apoio. Nenhum ID do guia foi copiado literalmente; o acordeão é a família mais próxima.
- Evitado: arco, galeria horizontal, roteiro de visita, grade de cartões iguais, sequência capa → serviços → galeria → contato.
- Responsivo: capa em coluna única no mobile (título e ações antes da foto principal); linhas do menu abrem logo abaixo.
- Movimento: só a transição de abertura (≈0,3 s), desligada em `prefers-reduced-motion`.
- Sem JavaScript: todos os resumos e o conteúdo ficam visíveis, e o contato geral continua em texto.

## 6. Decisões técnicas

- HTML, CSS e JS puros. Sem frameworks nem backend. **GSAP não foi usado** (CSS basta para a abertura das linhas).
- Acordeão: `<h3><button aria-expanded aria-controls>` + painel `role="region"`. Abertura por `grid-template-rows 0fr → 1fr` com atraso de `visibility`. A classe `.js` em `<html>` só então recolhe; sem JS tudo aparece. Setas ↑/↓, Home e End movem o foco entre as linhas. Links `#servico-*` abrem a linha correspondente.
- Foto + etiqueta em CSS grid na mesma célula (sem `position:absolute`).
- Imagens: `srcset`/`sizes`, `width`/`height` reservados, `loading=lazy` exceto a principal da capa.
- WhatsApp: tudo em `js/config.js` (`window.PINGO_CONFIG`). Número vazio ou `demo.enabled:true` → modo demonstrativo: `<dialog>` com a mensagem de exemplo e botão de copiar. Com número válido (`/^55\d{10,11}$/`) e `demo.enabled:false`, os botões viram links `wa.me` com `target=_blank rel="noopener noreferrer"`.
  - Geral: "Olá, PINGO! Gostaria de consultar os horários de banho e tosa para meu cão."
  - Por serviço: "Olá, PINGO! Gostaria de consultar os horários de {servico} para meu cão."
- `useLocalImages` + `imageFiles` trocam as fotos remotas por arquivos locais.
- Caminhos relativos (Live Server e subpasta do GitHub Pages).

## 7. Recursos externos e licenças

- Unsplash (8 fotos, licença Unsplash), via CDN `images.unsplash.com`.
- Google Fonts: Bricolage Grotesque e DM Sans (OFL).
- Favicon SVG próprio.

## 8. Testes realmente realizados

**Playwright local (Chrome do sandbox), 117 verificações, 117 aprovadas.** Executado com imagens e fontes simuladas via `page.route`, portanto valida geometria e comportamento, não a aparência final das fotos. Larguras 390, 768, 1024 e 1440 px:

- sem rolagem horizontal;
- linhas do menu abrindo e fechando, mais de uma aberta ao mesmo tempo;
- teclado (Tab, Enter/Espaço, setas, Home, End) e foco visível;
- mensagens: geral vs. por serviço, no modo demonstrativo e com número de teste;
- conteúdo visível sem JavaScript;
- `prefers-reduced-motion`.

**Navegador integrado (Live Server `http://127.0.0.1:5500/17-estetica-pet-pingo/index.html`), com fotos reais:**
- capa em 390 px e 1024 px (cão e secador inteiros; título e ações antes da foto no mobile);
- menu aberto; salão em 1024 px (três fotos carregadas);
- as capturas desse navegador às vezes atrasam ou pintam parcialmente; os pontos duvidosos foram confirmados por JavaScript (`complete`, `naturalWidth`) e segunda captura.

**Problemas encontrados e corrigidos**
- Grade do salão esticava e cortava fotos → colunas `2fr 1fr 1fr` com proporções fixas.
- Título quebrava em 4 linhas em 1024 px → `font-size` em `6.4vw`.
- Mini-menu apertado abaixo de 480 px → pontilhado e resumo ocultados.
- Seletor `.painel__detalhe .foto > img` não aplicava → corrigido.

**Não testado (pendente)**
- Capturas completas nas cinco larguras com fotos reais (só 390 e 1024 foram vistas assim; 360, 768 e 1440 com fotos reais ficam para revisão visual).
- Safari/iOS, toque real, leitor de tela.
- Script `baixar-recursos.ps1` (não executado) e modo de imagens locais com arquivos reais.
- Previews do catálogo (geração fora desta pasta).

## 9. Pendências

**BLOQUEANTES:** nenhuma conhecida.

**RECOMENDADAS**
- Revisão visual com fotos reais em 360, 768 e 1440 px, e rodapé.
- Executar `tools/baixar-recursos.ps1` e ativar `useLocalImages` e fontes locais.
- Trocar a foto da mesa de acabamento (focinheira) e a foto da tosa completa (já usada no modelo 05).
- Testar em Safari/iOS, toque real e leitor de tela.
- Catálogo: copiar o modelo para o repositório de demos com `powershell -ExecutionPolicy Bypass -File catalogo\build\copiar-modelo.ps1 -Origem <pasta> -Destino Pingo`, depois commit e push manuais. Não feito aqui.

**PUBLICAÇÃO COMERCIAL**
- Número real de WhatsApp em `contact.whatsapp` e `demo.enabled:false`.
- Endereço e horários reais; remover o selo de empresa fictícia.
- Remover `noindex`; domínio, hospedagem e metadados do cliente.
- Fotos do salão e dos serviços reais do cliente, no lugar das ilustrativas.

## 10. Como executar

Abrir a pasta no VS Code, Live Server (porta 5500): `http://127.0.0.1:5500/17-estetica-pet-pingo/index.html`.
