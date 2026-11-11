/* ==========================================================================
   PULSO Auto Care: TUDO o que muda de um cliente para outro fica aqui.
   Marca, modo demonstrativo, contato, serviços, pontos do carro e fotos.
   Os textos do index.html (capa, títulos, rodapé) também precisam ser
   revisados na personalização.
   ========================================================================== */
window.PULSO_CONFIG = {

  brand: {
    name: "PULSO Auto Care",
    short: "PULSO",
    tagline: "Seu carro em outra frequência."
  },

  /* Modo demonstrativo. Com enabled:false, a faixa some e o botão do
     WhatsApp passa a abrir a conversa de verdade (se houver número). */
  demo: {
    enabled: true,
    banner: "Site demonstrativo de uma marca fictícia. Fotografias ilustrativas.",
    contactNotice: "Modo demonstrativo: nenhum contato foi aberto e nenhuma mensagem foi enviada. Com o número real configurado, este botão abre o WhatsApp com a mensagem abaixo."
  },

  contact: {
    whatsapp: "",                        // só dígitos com DDI e DDD. Ex.: "5511912345678"
    whatsappDisplay: "(00) 00000-0000",  // como aparece na tela
    instagram: "",                       // ex.: "https://instagram.com/seuperfil"
    mapsUrl: "",                         // link do Google Maps do endereço real
    address: {
      line1: "Rua Exemplo, 123",
      line2: "Bairro Exemplo, Cidade/UF",
      note: "Endereço demonstrativo"
    },
    hours: [
      { days: "Segunda a sexta", time: "8h às 18h" },
      { days: "Sábado", time: "8h às 13h" },
      { days: "Domingo e feriados", time: "Fechado" }
    ],
    hoursNote: "Horários demonstrativos. Atendimento com hora marcada.",
    practical: "Leve ou busque o carro no estúdio. Os valores são combinados depois da avaliação."
  },

  /* Mensagem do WhatsApp. {cuidado} é trocado pelo cuidado escolhido. */
  message: {
    base: "Olá! Vi o site do PULSO Auto Care e gostaria de conversar sobre o meu carro.",
    withService: "Olá! Vi o site do PULSO Auto Care e gostaria de conversar sobre {cuidado} no meu carro."
  },

  /* Os quatro cuidados. `id` liga o serviço aos pontos do carro e ao contato. */
  services: [
    {
      id: "polimento",
      name: "Polimento técnico",
      summary: "Reduz marcas finas de lavagem e a opacidade da pintura."
    },
    {
      id: "protecao",
      name: "Proteção de pintura",
      summary: "Selante ou revestimento que ajuda a repelir água e facilita a lavagem."
    },
    {
      id: "externo",
      name: "Rodas e superfícies externas",
      summary: "Aros, pneus, vidros, frisos e plásticos, cada um com o produto certo."
    },
    {
      id: "interior",
      name: "Higienização interna",
      summary: "Bancos, painel e acabamentos limpos conforme o material."
    }
  ],

  /* Duas visualizações do carro. `ratio` é largura/altura da imagem exibida. */
  views: [
    {
      id: "fora",
      label: "Por fora",
      alt: "Lateral de um carro laranja com retrovisor, porta, para-lama e roda em primeiro plano",
      src: "assets/img/fora-1200.webp",
      srcset: "assets/img/fora-720.webp 720w, assets/img/fora-1200.webp 1200w",
      width: 1200,
      height: 1500
    },
    {
      id: "dentro",
      label: "Por dentro",
      alt: "Interior de um carro com volante, câmbio e bancos de couro vermelho",
      src: "assets/img/dentro-854.webp",
      srcset: "assets/img/dentro-600.webp 600w, assets/img/dentro-854.webp 854w",
      width: 854,
      height: 1067
    }
  ],

  /* Pontos sobre as fotos. x e y são porcentagens da imagem exibida
     (0 a 100), então acompanham a foto em qualquer largura. Só coloque
     pontos em regiões que aparecem na foto. */
  hotspots: [
    {
      id: "porta", view: "fora", x: 30, y: 44, service: "polimento",
      title: "Lateral e porta",
      text: "É na lateral que os reflexos mostram marcas de lavagem e opacidade. Avaliamos a pintura antes de escolher produto e etapas.",
      includes: ["Lavagem e descontaminação", "Avaliação sob luz direta", "Polimento em etapas"]
    },
    {
      id: "paralama", view: "fora", x: 64, y: 24, service: "protecao",
      title: "Para-lama e capô",
      text: "Depois de preparada, a pintura recebe selante ou revestimento. A durabilidade depende do produto e da manutenção.",
      includes: ["Preparação da pintura", "Produto indicado para o seu uso", "Orientação de manutenção"]
    },
    {
      id: "roda", view: "fora", x: 66, y: 80, service: "externo",
      title: "Roda e pneu",
      text: "Aro, raios e miolo pedem escovas e produtos diferentes dos da pintura, de acordo com o acabamento da roda.",
      includes: ["Limpeza de aro, raios e miolo", "Pneu limpo", "Produto compatível com o acabamento"]
    },
    {
      id: "retrovisor", view: "fora", x: 14, y: 10, service: "externo",
      title: "Retrovisor e vidros",
      text: "Vidros e retrovisores são limpos sem deixar marcas de água, e as partes plásticas e emborrachadas recebem o produto adequado.",
      includes: ["Vidros e retrovisores", "Plásticos e borrachas", "Acabamento final"]
    },
    {
      id: "friso", view: "fora", x: 25, y: 76, service: "externo",
      title: "Frisos e molduras",
      text: "Frisos cromados e molduras acumulam resíduos nas bordas. A limpeza é feita com ferramentas pequenas e sem riscar o entorno.",
      includes: ["Frisos e molduras", "Saídas de ar externas", "Bordas e frestas"]
    },
    {
      id: "banco", view: "dentro", x: 80, y: 44, service: "interior",
      title: "Bancos de couro",
      text: "O couro é limpo e hidratado com produto próprio para o material. Antes, aspiramos costuras e frestas.",
      includes: ["Aspiração completa", "Limpeza do couro", "Hidratação do couro"]
    },
    {
      id: "volante", view: "dentro", x: 36, y: 66, service: "interior",
      title: "Volante e painel",
      text: "Volante, painel e comandos são limpos com cuidado para não ressecar nem deixar brilho excessivo.",
      includes: ["Volante e comandos", "Painel e plásticos", "Acabamento fosco"]
    },
    {
      id: "console", view: "dentro", x: 57, y: 54, service: "interior",
      title: "Console e câmbio",
      text: "Teclas, frestas e molduras do console acumulam poeira. A limpeza chega a esses cantos sem soltar peças.",
      includes: ["Console e câmbio", "Teclas e frestas", "Molduras metálicas"]
    },
    {
      id: "saidas", view: "dentro", x: 24, y: 14, service: "interior",
      title: "Saídas de ar e comandos",
      text: "Saídas de ar e botões são limpos com pincéis macios e sem excesso de líquido perto da parte elétrica.",
      includes: ["Saídas de ar", "Botões e comandos", "Telas e acabamentos"]
    }
  ],

  /* Fotografias da seção "Detalhes". As legendas descrevem o que a foto mostra. */
  details: [
    { id: "gotas", caption: "Gotas sobre a pintura. A proteção de pintura procura favorecer esse comportamento da água." },
    { id: "polimento", caption: "Politriz orbital com fita nas bordas: as áreas sensíveis são protegidas antes do polimento." },
    { id: "farol", caption: "Faróis e vidros também passam pela revisão de acabamento: a luz mostra marcas e opacidade." },
    { id: "roda", caption: "Aros e raios pedem escovas e produtos diferentes dos usados na pintura." }
  ],

  /* Créditos exibidos no rodapé. Atualize ao trocar as fotos. */
  credits: [
    { use: "Capa", text: "Imagem fornecida pelo projeto (origem e licença a confirmar)" },
    { use: "Por fora", text: "Bailey Mahon / Unsplash" },
    { use: "Por dentro", text: "Douglas Fehr / Unsplash" },
    { use: "Gotas", text: "Vitalii Abakumov / Unsplash" },
    { use: "Polimento", text: "Neelabh Raj / Unsplash" },
    { use: "Farol", text: "Kyle Winkle / Unsplash" },
    { use: "Roda", text: "Ian Edokov / Unsplash" }
  ]
};
