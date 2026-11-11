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

  /* Mensagem do WhatsApp. {cuidado} é trocado pelo cuidado escolhido; {foco}, pela área do interior. */
  message: {
    base: "Olá! Vi o site do PULSO Auto Care e gostaria de conversar sobre o meu carro.",
    withService: "Olá! Vi o site do PULSO Auto Care e gostaria de conversar sobre {cuidado} no meu carro.",
    withFocus: "Olá! Vi o site do PULSO Auto Care e gostaria de conversar sobre {cuidado} no meu carro, principalmente {foco}."
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

  /* Duas visualizações do carro. Cada uma tem a sua própria lista:
     por fora, três cuidados; por dentro, um serviço (higienização interna)
     com quatro áreas de atenção. */
  views: [
    {
      id: "fora",
      label: "Por fora",
      heading: "Três cuidados para a parte externa",
      alt: "Lateral de um carro laranja com retrovisor, porta, para-lama e roda em primeiro plano",
      src: "assets/img/fora-1200.webp",
      srcset: "assets/img/fora-720.webp 720w, assets/img/fora-1200.webp 1200w",
      width: 1200,
      height: 1500
    },
    {
      id: "dentro",
      label: "Por dentro",
      heading: "Higienização interna: quatro áreas de atenção",
      alt: "Interior de um carro com volante, câmbio e bancos de couro vermelho",
      src: "assets/img/dentro-854.webp",
      srcset: "assets/img/dentro-600.webp 600w, assets/img/dentro-854.webp 854w",
      width: 854,
      height: 1067
    }
  ],

  /* Pontos sobre as fotos: cada item da lista é um ponto. x e y são
     porcentagens da imagem exibida (0 a 100). Só coloque pontos em regiões
     que aparecem na foto. `edge: "baixo"` marca uma área que fica logo abaixo
     do enquadramento (o ponto vira uma seta na borda da foto).
     `service` liga o ponto ao contato; `focus` complementa a mensagem. */
  hotspots: [
    {
      id: "polimento", view: "fora", x: 30, y: 44, service: "polimento",
      title: "Polimento técnico",
      where: "Lateral e porta",
      text: "Na lateral, os reflexos mostram marcas de lavagem e opacidade. Avaliamos a pintura sob luz direta antes de escolher produto e etapas.",
      includes: ["Lavagem e descontaminação", "Polimento em etapas", "Bordas e frisos protegidos"]
    },
    {
      id: "protecao", view: "fora", x: 64, y: 24, service: "protecao",
      title: "Proteção de pintura",
      where: "Para-lama e capô",
      text: "Com a pintura preparada, aplicamos selante ou revestimento indicado para o seu uso. A durabilidade depende do produto e da manutenção.",
      includes: ["Preparação da pintura", "Produto indicado para o seu uso", "Orientação de lavagem"]
    },
    {
      id: "externo", view: "fora", x: 66, y: 80, service: "externo",
      title: "Rodas e superfícies externas",
      where: "Roda, pneu, vidros e frisos",
      text: "Aro, raios e miolo pedem escovas e produtos diferentes dos da pintura. Vidros, retrovisores, frisos e plásticos recebem o produto certo para cada material.",
      includes: ["Aro, raios e pneu", "Vidros e retrovisores", "Frisos e plásticos"]
    },
    {
      id: "bancos", view: "dentro", x: 79, y: 42, service: "interior", focus: "os bancos e estofados",
      title: "Bancos e estofados",
      where: "Couro, tecido e costuras",
      text: "Aspiramos costuras e frestas e limpamos conforme o material. O couro recebe produto próprio e hidratação.",
      includes: ["Aspiração de costuras e frestas", "Limpeza conforme o material", "Hidratação do couro"]
    },
    {
      id: "painel", view: "dentro", x: 38, y: 17, service: "interior", focus: "o painel e os comandos",
      title: "Painel e comandos",
      where: "Painel, saídas de ar e botões",
      text: "Pincéis macios e pouco líquido perto da parte elétrica. O acabamento fica limpo, sem brilho excessivo.",
      includes: ["Saídas de ar", "Botões e telas", "Acabamento fosco"]
    },
    {
      id: "console", view: "dentro", x: 56, y: 52, service: "interior", focus: "o console e as superfícies de contato",
      title: "Console e superfícies de contato",
      where: "Câmbio, volante e console",
      text: "São as partes que você mais toca. Limpamos câmbio, volante, teclas e molduras chegando aos cantos, sem soltar peças.",
      includes: ["Câmbio e volante", "Teclas e frestas", "Molduras"]
    },
    {
      id: "tapetes", view: "dentro", x: 16, y: 100, edge: "baixo", service: "interior", focus: "os tapetes e revestimentos",
      title: "Tapetes e revestimentos",
      where: "Abaixo do enquadramento",
      text: "O assoalho não aparece nesta foto, mas faz parte da higienização: tapetes, carpete e revestimentos de porta são aspirados e limpos.",
      includes: ["Tapetes e carpete", "Revestimentos de porta", "Porta-objetos"]
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
    { use: "Roda", text: "Ian Edokov / Unsplash" },
    { use: "Avaliar", text: "Zac Nielson / Unsplash" },
    { use: "Cuidar", text: "Zulfahmi Khani / Unsplash" },
    { use: "Entregar", text: "recorte da imagem da capa" }
  ]
};
