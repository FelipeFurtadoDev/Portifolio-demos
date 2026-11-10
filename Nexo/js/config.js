/* ==========================================================================
   NEXO / Estúdio Facial — CONFIGURAÇÃO CENTRAL
   --------------------------------------------------------------------------
   Para adaptar o modelo a um negócio real, edite este arquivo:
   marca, textos, cuidados, imagens, endereço, horários e contato.

   Como funciona:
   - Ao carregar, js/main.js aplica estes dados à página.
   - O index.html traz uma cópia estática do mesmo conteúdo. Ela só aparece
     para quem estiver sem JavaScript (e para buscadores). Ao entregar a um
     cliente, atualize também o HTML, ou ao menos os blocos marcados como
     "CÓPIA ESTÁTICA".
   ========================================================================== */

window.NEXO_CONFIG = {
  brand: {
    name: "NEXO",
    descriptor: "Estúdio Facial",
    /* A assinatura vira o título da capa, uma linha por item. */
    signatureLines: ["Sua pele.", "Seu tempo.", "Seu cuidado."]
  },

  /* MODO DEMONSTRAÇÃO
     enabled: true  → nenhum botão abre o WhatsApp. Um aviso discreto
                      explica que a ação está em demonstração e mostra a
                      mensagem que seria enviada.
     Para publicar: preencha contact.whatsapp e mude enabled para false. */
  demo: {
    enabled: true,
    bar: "Modelo demonstrativo. Marca, endereço, horários e contatos são fictícios.",
    toastTitle: "Contato em demonstração",
    toastText: "Este estúdio é fictício, então o WhatsApp não foi aberto. No site real, este botão inicia a conversa com a mensagem:"
  },

  contact: {
    /* Somente números, com DDI e DDD. Ex.: "5511912345678".
       Vazio na demonstração: nenhum número real é usado. */
    whatsapp: "",
    whatsappDisplay: "(00) 00000-0000",
    /* Mensagem inicial dos botões gerais. Curta e sem pedir dados pessoais. */
    message: "Olá! Vim pelo site da NEXO e quero conversar sobre um cuidado facial.",
    instagram: "@nexo.estudiofacial",
    instagramUrl: "" /* ex.: "https://www.instagram.com/perfil" */
  },

  address: {
    street: "Rua Demonstrativa, 000",
    district: "Bairro Exemplo",
    city: "Sua Cidade, UF",
    short: "Bairro Exemplo, Sua Cidade",
    note: "Endereço fictício."
  },

  hours: [
    { days: "Terça a sexta", time: "9h às 19h" },
    { days: "Sábado", time: "9h às 15h" },
    { days: "Domingo e segunda", time: "Fechado" }
  ],
  hoursShort: "Ter. a sáb., com hora marcada",

  /* Textos de interface (os elementos com data-config="texts.xxx"). */
  texts: {
    segment: "Estética facial não invasiva",
    lede: "Limpeza de pele, hidratação, argila e massagem facial em um estúdio pequeno, com hora marcada e uma pessoa por vez.",
    ctaPrimary: "Conversar sobre meu cuidado",
    ctaSecondary: "Ver os cuidados",
    atlasTitle: "Atlas de cuidados",
    atlasIntro: "Cinco cuidados de superfície, sem agulhas, sem aparelhos invasivos e sem promessa de resultado. Abra um para ver o que inclui.",
    atlasHelpTitle: "Não sabe por onde começar?",
    atlasHelpText: "Conte o que você sente na pele. A gente sugere o cuidado mais simples para isso.",
    atlasNote: "Cuidados estéticos não invasivos. Não fazemos diagnóstico nem tratamos doenças de pele. Durações aproximadas e demonstrativas.",
    closingTitle: "Conversar sobre meu cuidado",
    closingText: "O botão abre o WhatsApp com uma mensagem curta. Você conta o que procura e combinamos o horário. Não pedimos nenhum dado antes da conversa."
  },

  /* IMAGENS LOCAIS
     false → fotos carregadas da Unsplash (padrão da demonstração).
     true  → usa assets/img/<file>-<largura>.webp, gerados por
             tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
             volta sozinha para a URL remota e o console avisa. */
  useLocalImages: false,

  /* --------------------------------------------------------------------
     IMAGENS
     id:      identificador da foto na Unsplash (para fotos remotas).
     src:     alternativa: caminho próprio (ex.: "assets/img/fachada.jpg").
              Quando preenchido, substitui o id.
     file:    nome-base dos arquivos locais (useLocalImages).
     widths:  larguras locais disponíveis.
     focus:   ponto de recorte (object-position) usado pelo CSS.
     credit:  exibido no rodapé.
     -------------------------------------------------------------------- */
  images: {
    hero: {
      id: "photo-1551184451-76b762941ad6",
      file: "capa",
      widths: [800, 1200, 1800],
      focus: "58% 30%",
      alt: "Rosto de perto, com uma faixa de luz do sol atravessando o olho e a bochecha.",
      credit: { name: "Kamila Maciejewska", url: "https://unsplash.com/photos/b2bXKspL5MY" }
    },
    limpeza: {
      id: "photo-1791714390214-f6ff43e6262e",
      file: "limpeza",
      widths: [800, 1200],
      focus: "50% 40%",
      alt: "Testa e olhos fechados de uma pessoa com sardas, pele de perto.",
      credit: { name: "@denmirov", url: "https://unsplash.com/photos/sUuOgnVyxjA" }
    },
    hidratacao: {
      id: "photo-1693004925174-d9e06209d0ee",
      file: "hidratacao",
      widths: [800, 1200],
      focus: "45% 40%",
      alt: "Mulher negra aplicando uma porção de creme branco na bochecha com a ponta dos dedos.",
      credit: { name: "Leighann Blackwood", url: "https://unsplash.com/photos/NdcuSGxKbwE" }
    },
    argila: {
      id: "photo-1794151882454-48112934c4bc",
      file: "argila",
      widths: [800, 1200],
      focus: "40% 45%",
      alt: "Metade de um rosto coberto por máscara de argila verde, com o olho aberto.",
      credit: { name: "@maxbvp", url: "https://unsplash.com/photos/0RxbUktnZug" }
    },
    massagem: {
      id: "photo-1561228987-8e7379dde477",
      file: "massagem",
      widths: [800, 1200],
      focus: "50% 35%",
      alt: "Mão com anel dourado tocando o pescoço, em luz suave.",
      credit: { name: "Angélica Echeverry", url: "https://unsplash.com/photos/5KY5LP_zc44" }
    },
    renovacao: {
      id: "photo-1659007747376-3811b34e458f",
      file: "renovacao",
      widths: [800, 1200],
      focus: "50% 50%",
      alt: "Textura de creme branco espalhado, com dobras e brilho.",
      credit: { name: "Pawel Czerwinski", url: "https://unsplash.com/photos/0c36Otpkk6k" }
    },
    estudio: {
      id: "photo-1677441564461-1b3e5bff781c",
      file: "estudio",
      widths: [800, 1200],
      focus: "50% 62%",
      alt: "Cadeira de palhinha junto a uma parede clara, com a luz da janela desenhando uma grade de sombras.",
      credit: { name: "Yi Wei", url: "https://unsplash.com/photos/Obm20i8OEX4" }
    }
  },

  /* --------------------------------------------------------------------
     CUIDADOS DO ATLAS
     Verifique com a profissional responsável, antes de publicar:
     nomes, etapas, durações e se tudo cabe na atuação dela.
     message: mensagem inicial do botão daquele cuidado.
     -------------------------------------------------------------------- */
  cares: [
    {
      id: "limpeza",
      code: "N.01",
      name: "Limpeza de pele",
      duration: "80 min",
      image: "limpeza",
      summary: "Higienização, esfoliação leve, extração manual de cravos quando indicada e máscara calmante no final.",
      includes: [
        "Conversa rápida sobre a sua rotina",
        "Higienização e esfoliação leve",
        "Extração manual de cravos, sem pressa",
        "Máscara calmante e protetor solar"
      ],
      forWhom: "Para quem sente oleosidade acumulada ou cravos e quer uma sensação de pele limpa.",
      note: "Lesões inflamadas, feridas ou acne ativa não recebem extração. Nesses casos, orientamos procurar um dermatologista.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre limpeza de pele."
    },
    {
      id: "hidratacao",
      code: "N.02",
      name: "Hidratação facial",
      duration: "50 min",
      image: "hidratacao",
      summary: "Camadas de produtos hidratantes escolhidos para a sua pele naquele dia, aplicadas com toque lento.",
      includes: [
        "Higienização suave",
        "Esfoliação delicada, se a pele estiver pronta",
        "Máscara hidratante",
        "Finalização com hidratante e protetor solar"
      ],
      forWhom: "Para pele que repuxa, parece opaca ou ressecou com sol, frio ou ar-condicionado.",
      note: "Se você tem sensibilidade conhecida a algum ingrediente, conte na conversa: os produtos são adaptados.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre hidratação facial."
    },
    {
      id: "argila",
      code: "N.03",
      name: "Máscara de argila",
      duration: "45 min",
      image: "argila",
      summary: "Argila em camada fina, escolhida pela sensação da pele no dia: mais oleosa, mais sensível ou mais opaca.",
      includes: [
        "Higienização",
        "Argila escolhida na hora",
        "Tempo de pausa com a máscara",
        "Remoção morna e hidratação"
      ],
      forWhom: "Para quem quer uma pausa curta e a pele com sensação de frescor.",
      note: "Pode ser feita sozinha ou ao final de outro cuidado do atlas.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre máscara de argila."
    },
    {
      id: "massagem",
      code: "N.04",
      name: "Massagem facial",
      duration: "40 min",
      image: "massagem",
      summary: "Movimentos manuais no rosto, no pescoço e no colo, com óleo ou creme, para relaxar e aquecer a pele.",
      includes: [
        "Movimentos lentos, sem aparelhos",
        "Rosto, pescoço e colo",
        "Pressão ajustada ao seu conforto"
      ],
      forWhom: "Para quem passa o dia com o rosto tenso ou quer um tempo de silêncio.",
      note: "É um cuidado de relaxamento. Não substitui fisioterapia nem acompanhamento médico.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre massagem facial."
    },
    {
      id: "renovacao",
      code: "N.05",
      name: "Renovação suave",
      duration: "60 min",
      image: "renovacao",
      summary: "Esfoliação enzimática ou física leve, sempre de superfície, seguida de hidratação. A pele fica mais macia ao toque.",
      includes: [
        "Observação da pele no dia",
        "Esfoliação enzimática ou física leve",
        "Hidratação e protetor solar"
      ],
      forWhom: "Para manutenção entre outros cuidados, quando a pele parece áspera ou sem viço.",
      note: "Não fazemos peeling químico profundo, microagulhamento nem procedimentos com agulhas ou laser.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre renovação suave."
    }
  ]
};
