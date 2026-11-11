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
    hero: { id: "1608635661512-52c656e0d4e5", grupo: "abertura", titulo: "Ilha de pedra escura", alt: "Ilha de cozinha com bancada de pedra escura, vaso com plantas e luminária de fibra pendente, em ambiente de luz baixa", autor: "laura adai", url: "https://unsplash.com/photos/_U3YK4f7Lvs", ratio: [3, 2] },
    coz1: { id: "1723902500173-37fe42ceb22a", grupo: "cozinha", titulo: "Cozinha quente com bancada clara", alt: "Cozinha em tons escuros com ilha de bancada clara, estantes com luz embutida e cooktop", autor: "Taylor Friehl", url: "https://unsplash.com/photos/mlCCSG79tL4", ratio: [2, 3] },
    coz2: { id: "1627383837659-44f198098ab5", grupo: "cozinha", titulo: "Ilha de pedra com veios e banquetas", alt: "Ilha de pedra escura com veios, duas banquetas e pendentes pretos em uma cozinha clara", autor: "Sam Moghadam", url: "https://unsplash.com/photos/gAL2Bw94wbI", ratio: [2, 3] },
    coz3: { id: "1776935359448-fb11f63c375d", grupo: "cozinha", titulo: "Bancada de mármore sob janela estreita", alt: "Cozinha com bancada de mármore claro, janela estreita e pendentes sobre a bancada", autor: "Franco Debartolo", url: "https://unsplash.com/photos/bkdcUE3x93g", ratio: [2, 3] },
    ban1: { id: "1792270219154-4178b5ff648a", grupo: "banheiro", titulo: "Penteadeira com duas cubas", alt: "Penteadeira de banheiro com duas cubas, espelhos redondos iluminados e parede de pedra com veios", autor: "DP Singh Bhullar", url: "https://unsplash.com/photos/OUBRXFjrZb8", ratio: [2, 3] },
    ban2: { id: "1661107259637-4e1c55462428", grupo: "banheiro", titulo: "Bancada dupla sobre madeira", alt: "Banheiro com paredes de pedra clara, espelho redondo e bancada dupla preta sobre gabinete de madeira", autor: "serjan midili", url: "https://unsplash.com/photos/mLx6oMw32PI", ratio: [2, 3] },
    ban3: { id: "1564540579594-0930edb6de43", grupo: "banheiro", titulo: "Mármore do piso ao teto", alt: "Banheiro com paredes de mármore branco e cinza, bancada dupla branca e espelhos redondos dourados", autor: "Christian Mackie", url: "https://unsplash.com/photos/yb9b2wbhxG4", ratio: [3, 2] },
    est1: { id: "1785535573662-417e82193598", grupo: "estar", titulo: "Painel de pedra com veio contínuo", alt: "Sala com painel de pedra de veios marrons e claros, poltrona branca e luminária de mesa", autor: "Franco Debartolo", url: "https://unsplash.com/photos/09wQcnwCFaE", ratio: [2, 3] },
    est2: { id: "1772567732985-6fefa2dff56d", grupo: "estar", titulo: "Lareira em pedra entre nichos", alt: "Lareira revestida em pedra entre nichos de madeira, com sofá claro em primeiro plano", autor: "Franco Debartolo", url: "https://unsplash.com/photos/G5jPfwxZRzQ", ratio: [3, 2] },
    est3: { id: "1759238136854-a43787126db7", grupo: "estar", titulo: "Painel de pedra e mesas de centro", alt: "Sala com painel de pedra e madeira atrás da lareira e mesas de centro em pedra escura", autor: "Franco Debartolo", url: "https://unsplash.com/photos/AEXgOReTzoM", ratio: [3, 2] },
    det1: { id: "1787539386309-450647434074", grupo: "detalhes", titulo: "Pedra polida com veios dourados", alt: "Superfície de pedra preta polida com veios dourados, com dois vasos metálicos sobre a bancada", autor: "Franco Debartolo", url: "https://unsplash.com/photos/3x365ToKOK8", ratio: [2, 3] },
    det2: { id: "1608635661553-4be8b3659ca3", grupo: "detalhes", titulo: "Tampo com veios e utensílios", alt: "Tampo de pedra com veios em uma cozinha de luz baixa, com utensílios sobre a bancada", autor: "laura adai", url: "https://unsplash.com/photos/NOGTGs10RdY", ratio: [3, 2] },
    det3: { id: "1608635661411-b8de70247ea5", grupo: "detalhes", titulo: "Tampo de pedra em luz baixa", alt: "Tampo de pedra em ambiente escuro, com colheres de madeira e uma tigela azul", autor: "laura adai", url: "https://unsplash.com/photos/UnmCg_80FBY", ratio: [3, 2] },
    det4: { id: "1637665609537-26857a32f6cd", grupo: "detalhes", titulo: "Recorte da cuba", alt: "Detalhe do recorte de uma cuba em bancada de pedra", autor: "Craig Lovelidge", url: "https://unsplash.com/photos/2v01Re71D6I", ratio: [3, 2] },
    det5: { id: "1627383838244-c475fb74b934", grupo: "detalhes", titulo: "Borda e espessura da ilha", alt: "Borda de uma ilha de pedra escura com cuba embutida, banquetas e pendentes", autor: "Sam Moghadam", url: "https://unsplash.com/photos/iO9EHF1mv2s", ratio: [2, 3] }
  },

  /* Rótulos dos grupos de fotos, usados na bandeja e na mensagem pronta. */
  grupos: { cozinha: "Cozinha", banheiro: "Banheiro e lavabo", estar: "Sala e estar", detalhes: "Detalhe" },

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
