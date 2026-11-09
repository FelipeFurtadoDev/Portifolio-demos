/* =====================================================================
   CADASTRO DE MODELOS DO CATÁLOGO
   Este é o único arquivo a editar para incluir, alterar ou reordenar
   modelos. Instruções completas e exemplo em catalogo/README.md.

   Campos de cada modelo:
     id              identificador único: minúsculas, números e hífens
                     (vira o endereço #modelo-<id> e o nome das capturas)
     ordem           posição no catálogo (números menores aparecem antes)
     marca           nome da marca, como deve aparecer no catálogo
     nicho           segmento do negócio (vários modelos podem repetir)
     descricao       um parágrafo curto sobre o modelo
     caracteristicas lista de 2 a 4 recursos da página
     demo            caminho relativo da pasta publicada, com "./" e "/" final,
                     respeitando maiúsculas e minúsculas (ex.: "./Forma-Doce/")
     cores.palco     cor de fundo da faixa do modelo
     cores.tinta     cor do texto e do botão sobre a faixa
     cores.tintaSuave cor dos textos secundários (número e nicho)
     imagens.desktop        captura 1440 × 900 exportada em 1600 × 1000
     imagens.desktopLeve    a mesma captura em 800 × 500
     imagens.celular        captura 390 × 844
   ===================================================================== */

window.CATALOGO_MODELOS = [
  {
    id: "naria",
    ordem: 10,
    marca: "NÁRIA",
    nicho: "Estética facial",
    descricao:
      "Estúdio pequeno, atendimento individual e hora marcada. Linguagem editorial, de revista de beleza: " +
      "tipografia Bodoni, ameixa como cor principal e a fotografia da abertura como protagonista.",
    caracteristicas: [
      "Coleção de cuidados em abas, com foto e ficha de cada serviço",
      "Pedido de agendamento com a mensagem pronta para o WhatsApp",
      "Seções de ritual de atendimento, espaço e dúvidas frequentes"
    ],
    demo: "./Naria/",
    cores: { palco: "#682F49", tinta: "#F6F0EB", tintaSuave: "#E8CBC4" },
    imagens: {
      desktop: "catalogo/previas/naria-desktop-1600.webp",
      desktopLeve: "catalogo/previas/naria-desktop-800.webp",
      celular: "catalogo/previas/naria-mobile-390.webp"
    }
  },

  {
    id: "forma-doce",
    ordem: 20,
    marca: "FORMA DOCE",
    nicho: "Confeitaria de celebrações",
    descricao:
      "Bolos personalizados, doces finos e caixas para presente sob encomenda. Visual pop artesanal, " +
      "com cara de embalagem: campos de cor chapados, letreiro retrô e formas recortadas como adesivos.",
    caracteristicas: [
      "Cardápio filtrado pela ocasião: aniversário, presente, festa",
      "Formulário de pedido com prévia da mensagem em tempo real",
      "Passo a passo da encomenda e dúvidas frequentes"
    ],
    demo: "./Forma-Doce/",
    cores: { palco: "#30231F", tinta: "#FFF2D9", tintaSuave: "#F6B9C6" },
    imagens: {
      desktop: "catalogo/previas/forma-doce-desktop-1600.webp",
      desktopLeve: "catalogo/previas/forma-doce-desktop-800.webp",
      celular: "catalogo/previas/forma-doce-mobile-390.webp"
    }
  },

  {
    id: "traco",
    ordem: 30,
    marca: "TRAÇO Studio",
    nicho: "Unhas, cílios e sobrancelhas",
    descricao:
      "Nail design, extensão de cílios e design de sobrancelhas tratados como desenho técnico: " +
      "tipografia larga, cobalto sobre fundo claro e uma régua que acompanha a leitura.",
    caracteristicas: [
      "Lookbook com o botão “Quero esse visual”, que já marca os serviços",
      "Ficha de agendamento que pergunta o formato da unha quando precisa",
      "Serviços agrupados por unhas, cílios e sobrancelhas"
    ],
    demo: "./Traco/",
    cores: { palco: "#2443C2", tinta: "#FFFFFF", tintaSuave: "#DCE3FF" },
    imagens: {
      desktop: "catalogo/previas/traco-desktop-1600.webp",
      desktopLeve: "catalogo/previas/traco-desktop-800.webp",
      celular: "catalogo/previas/traco-mobile-390.webp"
    }
  }
];
