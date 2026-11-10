/* ==========================================================================
   NEXO / Estúdio Facial — CONFIGURAÇÃO CENTRAL
   --------------------------------------------------------------------------
   Para adaptar o modelo a um negócio real, edite este arquivo:
   marca, textos, abordagem, cuidados, imagens, endereço, horários e contato.

   Como funciona:
   - Ao carregar, js/main.js aplica estes dados à página.
   - O index.html traz uma cópia estática do mesmo conteúdo, usada por quem
     está sem JavaScript e por buscadores. Ao entregar a um cliente, atualize
     também o HTML (blocos marcados como "CÓPIA ESTÁTICA").
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

  /* Textos de interface (elementos com data-config="texts.xxx"). */
  texts: {
    segment: "Estética facial não invasiva",
    lede: "Limpeza de pele, hidratação, argila e massagem facial em um estúdio pequeno, com hora marcada e uma pessoa por vez.",
    ctaPrimary: "Conversar sobre meu cuidado",
    ctaSecondary: "Ver os cuidados",

    approachTitle: "Antes do produto, a conversa.",
    approachIntro: "Cada pele chega de um jeito: depois de uma semana de sol, de pouco sono, de uma mudança de rotina. Por isso o atendimento começa ouvindo.",

    atlasTitle: "Atlas de cuidados",
    atlasIntro: "Cinco cuidados de superfície, sem agulhas e sem aparelhos invasivos. Escolha um para ver o que inclui.",
    atlasHelp: "Não sabe qual escolher? Conte o que você sente na pele e sugerimos o cuidado mais simples.",
    atlasNote: "Cuidados estéticos não invasivos. Não fazemos diagnóstico nem tratamos doenças de pele. Durações aproximadas e demonstrativas.",

    studioTitle: "Um estúdio pequeno, com hora marcada.",
    studioText: "Uma sala silenciosa, luz baixa e um atendimento por vez. Você não divide o horário nem espera na recepção.",
    studioCtaNote: "Abre o WhatsApp com uma mensagem curta. Nenhum dado é pedido antes da conversa."
  },

  /* A EXPERIÊNCIA DO CUIDADO: três parágrafos curtos, sem numeração.
     lead: frase em destaque; text: complemento. */
  approach: [
    {
      lead: "Primeiro, ouvir.",
      text: "Você conta como a pele está, o que incomoda e como é a sua rotina. Nenhum cuidado é escolhido antes disso."
    },
    {
      lead: "Depois, escolher com calma.",
      text: "Indicamos o cuidado mais simples para o que você descreveu e explicamos cada etapa. Se algo pedir avaliação médica, dizemos com clareza."
    },
    {
      lead: "Um horário só seu.",
      text: "Produtos separados para você, toalhas trocadas a cada atendimento e tempo para sair sem pressa."
    }
  ],

  /* IMAGENS LOCAIS
     false → fotos carregadas da Unsplash (padrão da demonstração).
     true  → usa assets/img/<file>-<largura>.webp, gerados por
             tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
             volta sozinha para a URL remota e o console avisa. */
  useLocalImages: false,

  /* --------------------------------------------------------------------
     IMAGENS
     id:      identificador da foto na Unsplash (fotos remotas).
     src:     alternativa: caminho próprio (ex.: "assets/img/sala.jpg").
     file:    nome-base dos arquivos locais (useLocalImages).
     widths:  larguras locais disponíveis.
     focus:   ponto de recorte (object-position).
     credit:  exibido no rodapé.
     -------------------------------------------------------------------- */
  images: {
    hero: {
      id: "photo-1551184451-76b762941ad6",
      file: "capa",
      widths: [800, 1200, 1800],
      focus: "60% 28%",
      alt: "Rosto de perto, com uma faixa de luz do sol atravessando o olho e a bochecha.",
      credit: { name: "Kamila Maciejewska", url: "https://unsplash.com/photos/b2bXKspL5MY" }
    },
    abordagem: {
      id: "photo-1731514771613-991a02407132",
      file: "abordagem",
      widths: [800, 1200],
      focus: "50% 45%",
      alt: "Esteticista com as mãos no rosto de uma cliente deitada, em uma sala com prateleiras de produtos.",
      credit: { name: "kimia kazemi", url: "https://unsplash.com/photos/u93nTfWqR9w" }
    },
    produto: {
      id: "photo-1747303969063-3b90bcb3942e",
      file: "produto",
      widths: [800, 1200],
      focus: "60% 50%",
      alt: "Mão segurando um conta-gotas sobre um frasco âmbar, com sombras de janela na parede.",
      credit: { name: "Mona Jain", url: "https://unsplash.com/photos/j24HPh0Q84g" }
    },
    limpeza: {
      id: "photo-1731355771317-b2ab72c79124",
      file: "limpeza",
      widths: [800, 1200],
      focus: "45% 50%",
      alt: "Mãos com luvas limpando o rosto de uma cliente com um disco de algodão.",
      credit: { name: "Studio Michael França", url: "https://unsplash.com/photos/aZliw_XDfUU" }
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
      id: "photo-1790244331202-0ae18434cde2",
      file: "massagem",
      widths: [800, 1200],
      focus: "50% 55%",
      alt: "Mãos massageando o rosto de uma pessoa deitada, iluminada pelo sol.",
      credit: { name: "Rosalie Gdy", url: "https://unsplash.com/photos/B4Y17X3uY7I" }
    },
    renovacao: {
      id: "photo-1722350553295-ba84043b64cc",
      file: "renovacao",
      widths: [800, 1200],
      focus: "50% 50%",
      alt: "Mãos espalhando um gel transparente no rosto de uma mulher deitada sobre uma toalha coral.",
      credit: { name: "Abiwin Krisna", url: "https://unsplash.com/photos/LcX6tUGKPuI" }
    },
    estudio: {
      id: "photo-1611920630418-f587fdc3bf94",
      file: "estudio",
      widths: [800, 1200],
      focus: "50% 60%",
      alt: "Sala de atendimento com maca coberta por manta azul, luz quente na parede e um quadro em preto e branco.",
      credit: { name: "visualsofdana", url: "https://unsplash.com/photos/IfsRTQu6Djk" }
    }
  },

  /* --------------------------------------------------------------------
     CUIDADOS DO ATLAS
     Verifique com a profissional responsável, antes de publicar:
     nomes, etapas, durações e se tudo cabe na atuação dela.
     tagline: frase curta exibida no índice (sempre visível).
     message: mensagem inicial do botão daquele cuidado.
     -------------------------------------------------------------------- */
  cares: [
    {
      id: "limpeza",
      code: "N.01",
      name: "Limpeza de pele",
      duration: "80 min",
      image: "limpeza",
      tagline: "Para oleosidade e cravos.",
      summary: "Higienização, esfoliação leve, extração manual de cravos quando indicada e máscara calmante no final.",
      includes: [
        "Conversa rápida sobre a sua rotina",
        "Higienização e esfoliação leve",
        "Extração manual de cravos, sem pressa",
        "Máscara calmante e protetor solar"
      ],
      note: "Lesões inflamadas, feridas ou acne ativa não recebem extração. Nesses casos, orientamos procurar um dermatologista.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre limpeza de pele."
    },
    {
      id: "hidratacao",
      code: "N.02",
      name: "Hidratação facial",
      duration: "50 min",
      image: "hidratacao",
      tagline: "Para pele que repuxa ou está opaca.",
      summary: "Camadas de produtos hidratantes escolhidos para a sua pele naquele dia, aplicadas com toque lento.",
      includes: [
        "Higienização suave",
        "Esfoliação delicada, se a pele estiver pronta",
        "Máscara hidratante",
        "Hidratante e protetor solar"
      ],
      note: "Se você tem sensibilidade conhecida a algum ingrediente, conte na conversa: os produtos são adaptados.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre hidratação facial."
    },
    {
      id: "argila",
      code: "N.03",
      name: "Máscara de argila",
      duration: "45 min",
      image: "argila",
      tagline: "Uma pausa curta, com sensação de frescor.",
      summary: "Argila em camada fina, escolhida pela sensação da pele no dia: mais oleosa, mais sensível ou mais opaca.",
      includes: [
        "Higienização",
        "Argila escolhida na hora",
        "Tempo de pausa com a máscara",
        "Remoção morna e hidratação"
      ],
      note: "Pode ser feita sozinha ou ao final de outro cuidado do atlas.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre máscara de argila."
    },
    {
      id: "massagem",
      code: "N.04",
      name: "Massagem facial",
      duration: "40 min",
      image: "massagem",
      tagline: "Para o rosto tenso no fim do dia.",
      summary: "Movimentos manuais no rosto, no pescoço e no colo, com óleo ou creme, para relaxar e aquecer a pele.",
      includes: [
        "Movimentos lentos, sem aparelhos",
        "Rosto, pescoço e colo",
        "Pressão ajustada ao seu conforto"
      ],
      note: "É um cuidado de relaxamento. Não substitui fisioterapia nem acompanhamento médico.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre massagem facial."
    },
    {
      id: "renovacao",
      code: "N.05",
      name: "Renovação suave",
      duration: "60 min",
      image: "renovacao",
      tagline: "Manutenção para pele áspera ou sem viço.",
      summary: "Esfoliação enzimática ou física leve, sempre de superfície, seguida de hidratação. A pele fica mais macia ao toque.",
      includes: [
        "Observação da pele no dia",
        "Esfoliação enzimática ou física leve",
        "Hidratação e protetor solar"
      ],
      note: "Não fazemos peeling químico profundo, microagulhamento nem procedimentos com agulhas ou laser.",
      message: "Olá! Vim pelo site da NEXO e quero conversar sobre renovação suave."
    }
  ]
};
