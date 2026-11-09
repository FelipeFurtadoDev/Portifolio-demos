/* ==========================================================================
   NÁRIA — CONFIGURAÇÃO CENTRAL
   --------------------------------------------------------------------------
   Para adaptar o modelo a um negócio real, edite apenas este arquivo:
   nome, contatos, endereço, horários, serviços, perguntas e imagens.
   Os textos institucionais longos (abertura, proposta e ritual) estão no
   index.html, marcados com comentários "EDITÁVEL".
   ========================================================================== */

window.SITE_CONFIG = {
  brand: {
    name: "Nária",
    descriptor: "Estúdio de Estética Facial",
    slogan: "Cuidado que respeita a sua essência."
  },

  /* Modo demonstração.
     enabled: true  → os botões de agendamento NÃO abrem o WhatsApp; mostram
                      a mensagem pronta e avisam que o contato é fictício.
     Para publicar um site real: preencha contact.whatsapp e mude para false. */
  demo: {
    enabled: true,
    notice: "Demonstração: marca, endereço e contatos fictícios."
  },

  contact: {
    /* Somente números, com DDI e DDD. Ex.: "5511912345678".
       Deixe vazio na demonstração — nenhum telefone real é usado. */
    whatsapp: "",
    whatsappDisplay: "(00) 00000-0000",
    instagram: "@naria.estudio",
    instagramUrl: "" /* ex.: "https://www.instagram.com/perfil" */
  },

  address: {
    street: "Rua das Acácias, 000 — sala 2",
    district: "Bairro Jardim Demonstrativo",
    city: "Sua Cidade — UF",
    note: "Endereço fictício. A localização exata é enviada na confirmação do horário."
  },

  hours: [
    { days: "Terça a sexta", time: "9h às 19h" },
    { days: "Sábado", time: "9h às 14h" },
    { days: "Domingo e segunda", time: "Fechado" }
  ],

  /* Períodos oferecidos no formulário de agendamento. */
  periods: ["Manhã", "Tarde", "Sábado", "Sem preferência"],

  /* Imagens locais.
     false → as fotos são carregadas da Unsplash (padrão da demonstração).
     true  → usa assets/img/<file>-800.webp e <file>-1200.webp.
             Gere esses arquivos com tools/baixar-recursos.ps1.
             Se algum arquivo local faltar, o site volta sozinho para a URL
             remota daquela foto e avisa no console. */
  useLocalImages: false,

  /* --------------------------------------------------------------------
     IMAGENS
     src: URL completa ou caminho local (ex.: "assets/img/fachada.jpg").
     Para URLs da Unsplash, o site gera automaticamente versões
     responsivas (srcset). Para arquivos locais, usa o arquivo como está.
     focus (opcional, só Unsplash): "top", "bottom", "left", "right" ou
            "faces" — define qual parte da foto preservar no recorte.
     file:   nome-base do arquivo local em assets/img (ver useLocalImages).
     credit: exibido no rodapé em "Créditos das imagens".
     -------------------------------------------------------------------- */
  images: {
    hero: {
      src: "https://images.unsplash.com/photo-1643684391140-c5056cfd3436",
      file: "hero",
      focus: "top",
      alt: "Mãos aplicando um cuidado suave no rosto de uma mulher de olhos fechados, sob luz quente.",
      credit: { author: "Dominique Rivas", url: "https://unsplash.com/photos/rWwuf8yKw4Y" }
    },
    proposta: {
      src: "https://images.unsplash.com/photo-1585945037805-5fd82c2e60b1",
      file: "proposta",
      alt: "Textura de creme branco espalhada sobre uma superfície bege.",
      credit: { author: "Kelsey Curtis", url: "https://unsplash.com/photos/kD9qprR6HBI" }
    },
    ritual: {
      src: "https://images.unsplash.com/photo-1706795033728-9232ef548a16",
      file: "ritual",
      alt: "Profissional com as mãos no rosto de uma cliente deitada em uma maca, coberta por manta clara.",
      credit: { author: "Anna Keibalo", url: "https://unsplash.com/photos/BJ7i-96glwM" }
    },
    espacoPrincipal: {
      src: "https://images.unsplash.com/photo-1787651343620-8d5303006ecb",
      file: "espaco-principal",
      focus: "bottom",
      alt: "Sala de atendimento com maca coberta por lençol bege e janela com luz natural.",
      credit: { author: "Mayur Roxan", url: "https://unsplash.com/photos/JnsuyfJrxQw" }
    },
    espacoDetalhe: {
      src: "https://images.unsplash.com/photo-1706795033855-eee02f726868",
      file: "espaco-detalhe",
      focus: "bottom",
      alt: "Toalhas enroladas e um frasco de vidro sobre uma superfície clara, com luzes desfocadas ao fundo.",
      credit: { author: "Anna Keibalo", url: "https://unsplash.com/photos/-kYCpF55lIg" }
    }
  },

  /* --------------------------------------------------------------------
     SERVIÇOS — aparecem na "Coleção de cuidados" e no formulário.
     Não inclua preços, promessas de resultado ou termos médicos.
     -------------------------------------------------------------------- */
  services: [
    {
      id: "limpeza",
      name: "Limpeza de pele",
      summary: "Para recomeçar a pele com leveza.",
      description:
        "Higienização em etapas, com esfoliação suave, extração cuidadosa quando indicada e uma máscara calmante ao final. Um cuidado para a rotina de quem sente a pele carregada, com poros mais aparentes ou simplesmente precisa de uma pausa.",
      steps: ["Higienização e esfoliação suave", "Extração cuidadosa, se indicada", "Máscara calmante e proteção"],
      duration: "Cerca de 90 minutos",
      image: {
        src: "https://images.unsplash.com/photo-1761718209708-9ab9ba1c7252",
        file: "servico-limpeza",
        alt: "Rosto de mulher com espuma de limpeza durante um cuidado facial.",
        credit: { author: "kimia kazemi", url: "https://unsplash.com/photos/J6Hg_YH2tFk" }
      }
    },
    {
      id: "hidratacao",
      name: "Hidratação facial",
      summary: "Conforto para a pele que pede água.",
      description:
        "Uma sequência de texturas leves e máscara aplicada com pincel, escolhidas conforme a sensação da sua pele no dia. Indicada para quem sente repuxar, para dias de clima seco ou para preparar a pele antes de um evento.",
      steps: ["Higienização delicada", "Máscara aplicada com pincel", "Finalização com hidratante e proteção"],
      duration: "Cerca de 60 minutos",
      image: {
        src: "https://images.unsplash.com/photo-1570172619644-dfd03ed5d881",
        file: "servico-hidratacao",
        alt: "Profissional aplicando máscara facial com pincel no rosto de uma cliente de olhos fechados.",
        credit: { author: "Rosa Rafael", url: "https://unsplash.com/photos/Pe9IXUuC6QU" }
      }
    },
    {
      id: "massagem",
      name: "Massagem facial",
      summary: "Um tempo para soltar o rosto.",
      description:
        "Movimentos manuais lentos no rosto, pescoço e colo, com óleo ou creme de deslizamento. É o cuidado para desacelerar: ajuda a relaxar a expressão e a sair do estúdio com a sensação de ter descansado.",
      steps: ["Preparação da pele", "Massagem manual em rosto, pescoço e colo", "Finalização sem pressa"],
      duration: "Cerca de 50 minutos",
      image: {
        src: "https://images.unsplash.com/photo-1706795034830-de41aee06afa",
        file: "servico-massagem",
        alt: "Mulher relaxada recebendo massagem facial, com as mãos da profissional sobre a testa.",
        credit: { author: "Anna Keibalo", url: "https://unsplash.com/photos/qybZ2w0CzMw" }
      }
    },
    {
      id: "personalizado",
      name: "Cuidado facial personalizado",
      summary: "Montado a partir da sua pele e da sua rotina.",
      description:
        "Começa por uma conversa sobre o que você sente, o que já usa e o que gostaria de cuidar. A partir disso, combinamos etapas de limpeza, hidratação e massagem na medida certa para aquele dia. Ideal para quem não sabe por onde começar.",
      steps: ["Conversa e observação da pele", "Combinação de etapas sob medida", "Orientações simples para casa"],
      duration: "De 60 a 90 minutos",
      image: {
        src: "https://images.unsplash.com/photo-1608571423902-eed4a5ad8108",
        file: "servico-personalizado",
        alt: "Frasco âmbar com conta-gotas sobre um pedestal de madeira, com sombra de folhas na parede.",
        credit: { author: "Kadarius Seegars", url: "https://unsplash.com/photos/Mxy5gokl8mE" }
      }
    }
  ],

  /* --------------------------------------------------------------------
     PERGUNTAS FREQUENTES
     -------------------------------------------------------------------- */
  faq: [
    {
      q: "Preciso agendar com antecedência?",
      a: "Sim. O estúdio atende somente com hora marcada, uma cliente por vez. Envie sua solicitação pelo WhatsApp e responderemos com os horários disponíveis."
    },
    {
      q: "Não sei qual cuidado escolher. E agora?",
      a: "Escolha o cuidado facial personalizado ou conte, na mensagem, o que você sente na pele. Na conversa antes do horário ajudamos a decidir o que faz mais sentido."
    },
    {
      q: "Vocês realizam procedimentos médicos ou injetáveis?",
      a: "Não. O estúdio trabalha apenas com cuidados estéticos faciais, sem procedimentos invasivos. Para questões de saúde da pele, o caminho certo é um médico dermatologista."
    },
    {
      q: "Tenho pele sensível, acne ou estou gestante. Posso fazer?",
      a: "Conte isso ao agendar. Adaptamos produtos e etapas quando é possível e, em alguns casos, recomendamos conversar antes com seu médico."
    },
    {
      q: "Como faço para remarcar ou cancelar?",
      a: "Pelo mesmo WhatsApp do agendamento, de preferência com 24 horas de antecedência. Assim conseguimos oferecer o horário a outra pessoa."
    },
    {
      q: "Quais são os valores e as formas de pagamento?",
      a: "Os valores de cada cuidado e as formas de pagamento aceitas são informados no atendimento pelo WhatsApp, junto com a confirmação do horário."
    }
  ]
};
