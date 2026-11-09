/* ==========================================================================
   VÉRTICE Detail Lab — configuração central
   Tudo o que muda de um cliente para outro fica aqui: marca, contato,
   modo demonstração, textos comerciais, serviços, galeria, opções do
   formulário, imagens e créditos.

   Como funciona:
   - O index.html já traz os textos-padrão (o site funciona sem JS).
   - Ao carregar, o main.js substitui cada elemento marcado com
     data-cfg="caminho.no.config" pelo valor encontrado aqui.
   - Listas marcadas com data-cfg-list recebem os itens dos arrays.
   ========================================================================== */

window.VERTICE_CONFIG = {
  brand: {
    name: "VÉRTICE",
    complement: "Detail Lab",
    /* Nome usado na saudação da mensagem do WhatsApp. */
    greetingName: "VÉRTICE Detail Lab",
    signature: "Cada detalhe muda o resultado."
  },

  /* Modo demonstração
     - enabled: true  -> mostra a faixa de aviso e NUNCA abre o WhatsApp;
                         o formulário apenas monta a mensagem para copiar.
     - enabled: false -> o botão abre o WhatsApp com a mensagem pronta,
                         desde que contact.whatsapp seja um número válido. */
  demo: {
    enabled: true,
    notice: "Site demonstrativo. A VÉRTICE é uma marca fictícia, as fotos são ilustrativas e nenhuma mensagem é enviada.",
    formNotice: "Modo demonstração: a mensagem foi montada, mas não será enviada a ninguém. Você pode copiá-la para conferir o formato."
  },

  contact: {
    /* Somente dígitos: DDI 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Usuário do Instagram sem @. Vazio = o link não aparece. */
    instagram: "",
    address: "Endereço demonstrativo (substituir pelo endereço real)",
    hours: "Segunda a sexta, das 8h às 18h; sábado, das 8h às 13h (horário demonstrativo)",
    pickup: "Retirada e entrega do veículo: combinar na avaliação"
  },

  /* Textos comerciais principais (substituem os do HTML). */
  text: {
    hero: {
      title1: "Cada detalhe",
      title2: "muda o resultado.",
      lead: "Polimento, proteção de pintura e higienização interna, com avaliação do carro antes de cada serviço.",
      ctaPrimary: "Pedir orçamento",
      ctaSecondary: "Ver serviços"
    },
    services: {
      title: "O que fazemos pelo seu carro",
      intro: "Quatro serviços. O valor depende do estado do veículo, por isso todo orçamento começa pela avaliação."
    },
    gallery: {
      title: "Detalhes do trabalho",
      intro: "Brilho, vidros, rodas e acabamento: é nos detalhes que o cuidado aparece.",
      hint: "Passe o cursor ou o dedo sobre as fotos para mover a luz de inspeção.",
      note: "Imagens ilustrativas de bancos de imagem. Não mostram serviços realizados pela VÉRTICE."
    },
    quote: {
      title: "Peça seu orçamento",
      intro: "Responda quatro perguntas rápidas. A mensagem fica pronta para o WhatsApp, e o valor é informado depois da avaliação."
    }
  },

  /* Serviços. `id` liga o serviço ao HTML (data-add-service) e ao
     formulário. `name` também vai na mensagem do WhatsApp. */
  services: [
    {
      id: "polimento",
      name: "Polimento técnico",
      area: "Pintura e verniz",
      summary: "Reduz riscos finos, marcas de lavagem e opacidade, devolvendo o brilho sem desgastar o verniz além do necessário.",
      includes: ["Lavagem e descontaminação", "Inspeção sob luz direta", "Polimento em etapas"]
    },
    {
      id: "protecao",
      name: "Proteção de pintura",
      area: "Pintura, vidros e plásticos",
      summary: "Selante ou revestimento que facilita a lavagem e ajuda a conservar o brilho. A durabilidade depende do produto e da manutenção.",
      includes: ["Preparação da pintura", "Produto indicado para o seu uso", "Orientação de cuidados"]
    },
    {
      id: "interior",
      name: "Higienização interna",
      area: "Bancos, carpetes e painel",
      summary: "Limpeza de bancos, carpetes, painel e acabamentos, com o produto certo para cada material.",
      includes: ["Aspiração completa", "Bancos e carpetes", "Couro limpo e hidratado"]
    },
    {
      id: "completo",
      name: "Detalhamento completo",
      area: "Veículo inteiro",
      summary: "Pintura, vidros, rodas e interior em um único plano, definido depois da avaliação.",
      includes: ["Exterior completo", "Interior completo", "Etapas combinadas com você"]
    }
  ],

  /* Legendas da galeria (mesma ordem das fotos no HTML). */
  gallery: [
    { title: "Inspeção",        text: "Luz direcionada revela marcas que passam despercebidas." },
    { title: "Pintura",         text: "Reflexo nítido é sinal de verniz limpo e bem cuidado." },
    { title: "Faróis e vidros", text: "Limpeza e proteção contra manchas de água." },
    { title: "Rodas",           text: "Produto adequado a cada acabamento." }
  ],

  /* Como funciona (exibido junto ao formulário; é uma sequência real). */
  process: [
    "Você envia o pedido",
    "Avaliamos fotos ou o carro",
    "Combinamos serviço, valor e data"
  ],

  /* Opções do formulário de orçamento. */
  form: {
    vehicles: [
      { id: "hatch",  label: "Hatch" },
      { id: "seda",   label: "Sedã" },
      { id: "suv",    label: "SUV" },
      { id: "picape", label: "Picape" },
      { id: "outro",  label: "Outro" }
    ],
    goals: [
      "Recuperar o brilho e reduzir marcas",
      "Proteger a pintura",
      "Limpar e higienizar o interior",
      "Preparar o carro para venda",
      "Manter o carro conservado",
      "Outro objetivo"
    ],
    /* Frase final da mensagem: deixa claro que não é confirmação. */
    closingLine: "Sei que valor, prazo e disponibilidade dependem da avaliação do veículo."
  },

  /* Imagens
     useLocalImages: true -> usa assets/img (padrão; arquivos incluídos).
     Se um arquivo local faltar, a foto passa para a URL da Unsplash
     (campo `unsplash`). A capa não tem alternativa remota: o arquivo local
     foi editado (placa do carro apagada) e a versão original a exibiria. */
  useLocalImages: true,
  images: {
    capa:      { file: "capa",      widths: [800, 1400, 2400], unsplash: null, author: "Robert Cichol", page: "https://unsplash.com/photos/kutG2NRxB0M", use: "Capa (placa apagada)" },
    polimento: { file: "polimento", widths: [600, 1200], unsplash: "photo-1620584898989-d39f7f9ed1b7", author: "Neelabh Raj", page: "https://unsplash.com/photos/cw1914zDHUs", use: "Polimento técnico" },
    protecao:  { file: "protecao",  widths: [600, 1000], unsplash: "photo-1780586585338-c56fe47b49f4", author: "Vitalii Abakumov", page: "https://unsplash.com/photos/tbHzrVqZzbA", use: "Proteção de pintura" },
    interior:  { file: "interior",  widths: [800, 1600], unsplash: "photo-1636647510477-5ec1593b8be3", author: "Douglas Fehr", page: "https://unsplash.com/photos/qemIachWXtI", use: "Higienização interna" },
    completo:  { file: "completo",  widths: [800, 1400], unsplash: "photo-1605164598708-25701594473e", author: "Zulfahmi Khani", page: "https://unsplash.com/photos/9iH_6JO7Ufs", use: "Detalhamento completo" },
    processo:  { file: "processo",  widths: [600, 1200], unsplash: "photo-1708805282706-f44730b7e527", author: "Zac Nielson", page: "https://unsplash.com/photos/CsZjHjFN3N8", use: "Galeria: inspeção" },
    reflexo:   { file: "reflexo",   widths: [600, 1200], unsplash: "photo-1558597576-48df594374d7", author: "Bailey Mahon", page: "https://unsplash.com/photos/9npc2g6d0tk", use: "Galeria: pintura" },
    farol:     { file: "farol",     widths: [800, 1600], unsplash: "photo-1602353551483-e148541ec7b4", author: "Kyle Winkle", page: "https://unsplash.com/photos/-cOnugFhqE4", use: "Galeria: faróis" },
    roda:      { file: "roda",      widths: [800, 1600], unsplash: "photo-1785139164960-7c61c38abf8a", author: "Ian Edokov", page: "https://unsplash.com/photos/HxpfckKgZ0g", use: "Galeria: rodas" }
  }
};
