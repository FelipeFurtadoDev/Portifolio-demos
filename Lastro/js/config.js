/* ==========================================================================
   LASTRO · Pedra natural sob medida — configuração central
   O que muda de um cliente para outro fica aqui: marca, modo demonstração,
   contato, fotos (com créditos) e nomes das peças usados na mensagem pronta.

   Os textos das seções ficam no index.html, para continuarem legíveis sem
   JavaScript. A ordem das fotos de cada grupo define a ordem na galeria.
   ========================================================================== */

window.LASTRO_CONFIG = {
  brand: { name: "LASTRO" },

  /* Modo demonstração
     - enabled: true  -> mostra a faixa de aviso; o botão do WhatsApp só
                         explica que o contato não está configurado.
     - enabled: false -> o botão abre o WhatsApp com a mensagem pronta, desde
                         que contact.whatsapp seja válido. */
  demo: {
    enabled: true,
    notice: "Demonstração: LASTRO é uma marca fictícia. Fotos ilustrativas, de banco de imagens.",
    contactNotice: "Contato real ainda não configurado: nada foi enviado e nenhum link externo foi aberto. Copie a mensagem para usá-la depois."
  },

  contact: {
    /* Somente dígitos: 55 + DDD + número. Ex.: "5511912345678".
       Vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    buttonLabel: "Abrir no WhatsApp",
    greeting: "Olá, LASTRO!"
  },

  /* Fotos locais
     false -> fotos servidas pela CDN da Unsplash (padrão).
     true  -> usa assets/img/<chave>-<largura>.webp, gerados por
              tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
              volta sozinha para a CDN e o console avisa. */
  useLocalImages: false,
  localWidths: { hero: [640, 1200, 1920], detalhes: [480, 800, 1200], padrao: [480, 960, 1600] },

  /* Fotos (licença Unsplash, não Unsplash+). `grupo` liga a foto à galeria. */
  fotos: {
    hero: { id: "1783125126954-d9075ecff5ff", grupo: "abertura", titulo: "Ilha de pedra clara com marcenaria em madeira", alt: "Cozinha com ilha de tampo em pedra clara de borda espessa em primeiro plano, armários de madeira e painel de pedra com veios atrás do fogão", autor: "Salvo Media LLC", url: "https://unsplash.com/photos/OATaOCo01UI", ratio: [3, 2], guardavel: false },
    coz1: { id: "1723902500173-37fe42ceb22a", grupo: "cozinha", titulo: "Cozinha quente com bancada clara", alt: "Cozinha em tons escuros com ilha de bancada clara, estantes com luz embutida e cooktop", autor: "Taylor Friehl", url: "https://unsplash.com/photos/mlCCSG79tL4", ratio: [2, 3] },
    coz2: { id: "1627383837659-44f198098ab5", grupo: "cozinha", titulo: "Ilha de pedra com veios e banquetas", alt: "Ilha de pedra escura com veios, duas banquetas e pendentes pretos em uma cozinha clara", autor: "Sam Moghadam", url: "https://unsplash.com/photos/gAL2Bw94wbI", ratio: [2, 3] },
    ilha1: { id: "1781249144389-4174c1164955", grupo: "cozinha", titulo: "Ilha com lateral em pedra até o piso", alt: "Ilha de cozinha com tampo e lateral em pedra de textura salpicada que desce até o piso, ao lado de armários de madeira escura e banquetas brancas", autor: "Irena Oze", url: "https://unsplash.com/photos/Tf5QDU9xxMU", ratio: [3, 2] },
    coz3: { id: "1776935359448-fb11f63c375d", grupo: "cozinha", titulo: "Bancada de mármore sob janela estreita", alt: "Cozinha com bancada de mármore claro, janela estreita e pendentes sobre a bancada", autor: "Franco Debartolo", url: "https://unsplash.com/photos/bkdcUE3x93g", ratio: [2, 3] },
    ban1: { id: "1792270219154-4178b5ff648a", grupo: "banheiro", titulo: "Penteadeira com duas cubas", alt: "Penteadeira de banheiro com duas cubas, espelhos redondos iluminados e parede de pedra com veios", autor: "DP Singh Bhullar", url: "https://unsplash.com/photos/OUBRXFjrZb8", ratio: [2, 3] },
    ban2: { id: "1661107259637-4e1c55462428", grupo: "banheiro", titulo: "Bancada dupla sobre madeira", alt: "Banheiro com paredes de pedra clara, espelho redondo e bancada dupla preta sobre gabinete de madeira", autor: "serjan midili", url: "https://unsplash.com/photos/mLx6oMw32PI", ratio: [2, 3] },
    ban3: { id: "1564540579594-0930edb6de43", grupo: "banheiro", titulo: "Mármore do piso ao teto", alt: "Banheiro com paredes de mármore branco e cinza, bancada dupla branca e espelhos redondos dourados", autor: "Christian Mackie", url: "https://unsplash.com/photos/yb9b2wbhxG4", ratio: [3, 2] },
    est1: { id: "1785535573662-417e82193598", grupo: "estar", titulo: "Painel de pedra com veio contínuo", alt: "Sala com painel de pedra de veios marrons e claros, poltrona branca e luminária de mesa", autor: "Franco Debartolo", url: "https://unsplash.com/photos/09wQcnwCFaE", ratio: [2, 3] },
    est2: { id: "1772567732985-6fefa2dff56d", grupo: "estar", titulo: "Lareira em pedra entre nichos", alt: "Lareira revestida em pedra entre nichos de madeira, com sofá claro em primeiro plano", autor: "Franco Debartolo", url: "https://unsplash.com/photos/G5jPfwxZRzQ", ratio: [3, 2] },
    est3: { id: "1759238136854-a43787126db7", grupo: "estar", titulo: "Painel de pedra e mesas de centro", alt: "Sala com painel de pedra e madeira atrás da lareira e mesas de centro em pedra escura", autor: "Franco Debartolo", url: "https://unsplash.com/photos/AEXgOReTzoM", ratio: [3, 2] },
    vel1: { id: "1694378061058-bb6532de3bba", grupo: "detalhes", titulo: "Veios marcados em fundo claro", alt: "Superfície de mármore claro vista de perto, com veios cinzentos de espessuras diferentes", autor: "Akbar Nemati", url: "https://unsplash.com/photos/2yp6ICVr2VM", ratio: [3, 2] },
    vel2: { id: "1694382224141-8368bf043717", grupo: "detalhes", titulo: "Veio branco em fundo escuro", alt: "Superfície de pedra marrom-escura vista de perto, cortada por um veio branco e por veios finos", autor: "Akbar Nemati", url: "https://unsplash.com/photos/zpUjTXCjsCw", ratio: [3, 2] },
    det4: { id: "1637665609537-26857a32f6cd", grupo: "detalhes", titulo: "Recorte da cuba", alt: "Detalhe do recorte de uma cuba em bancada de pedra", autor: "Craig Lovelidge", url: "https://unsplash.com/photos/2v01Re71D6I", ratio: [3, 2] },
    bord1: { id: "1721274505251-6ce98a2101e8", grupo: "detalhes", titulo: "Quina e espessura do tampo", alt: "Canto de um tampo de pedra de grão fino sobre gabinete de madeira, com a quina e a espessura à mostra", autor: "Lisa Anna", url: "https://unsplash.com/photos/myIiHEv81jc", ratio: [2, 3] },
    enc1: { id: "1790156589905-3baa4c6e0fc7", grupo: "detalhes", titulo: "Encontro entre dois níveis do tampo", alt: "Encontro de dois níveis de um tampo branco sobre uma base de ripas de madeira", autor: "Ceba Solutions", url: "https://unsplash.com/photos/hlLXymONM5U", ratio: [3, 4] },
    proc1: { id: "1676630656246-3047520adfdf", grupo: "processo", titulo: "Medição no ambiente", alt: "Profissional usando um instrumento de medida junto a uma parede, em foto ilustrativa de medição", autor: "Bermix Studio", url: "https://unsplash.com/photos/bAGo7O4prtY", ratio: [3, 2], guardavel: false },
    proc2: { id: "1749212387838-c4c4e6e58348", grupo: "processo", titulo: "Amostras de pedra", alt: "Amostras de mármore e pedras de cores e veios diferentes expostas lado a lado", autor: "Declan Sun", url: "https://unsplash.com/photos/RaTyAZrysv4", ratio: [3, 2], guardavel: false },
    proc3: { id: "1505798577917-a65157d3320a", grupo: "processo", titulo: "Corte de bancada em obra", alt: "Profissional cortando uma bancada com serra de esquadria em uma cozinha, em foto ilustrativa", autor: "Annie Gray", url: "https://unsplash.com/photos/WEWTGkPUVT0", ratio: [3, 2], guardavel: false }
  },

  /* Rótulos dos grupos de fotos, usados na bandeja e na mensagem pronta. */
  grupos: { cozinha: "Cozinha", banheiro: "Banheiro e lavabo", estar: "Sala e estar", detalhes: "Detalhe", processo: "Processo (ilustrativo)" },

  /* Nomes das peças, usados na mensagem pronta (mesmas chaves do index.html). */
  pecas: {
    bancada: "Bancada de cozinha",
    ilha: "Ilha e balcão gourmet",
    lavatorio: "Lavatório e bancada de banheiro",
    painel: "Painel e revestimento",
    mesa: "Mesa, aparador e tampo",
    soleira: "Soleira, peitoril e detalhes",
    outra: "Outra peça sob medida"
  }
};
