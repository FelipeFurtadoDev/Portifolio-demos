/* ==========================================================================
   QUINA · Bolos sob encomenda — fonte única de dados
   --------------------------------------------------------------------------
   Tudo o que muda de uma confeitaria para outra fica aqui. O configurador,
   a galeria, o resumo e a mensagem leem destas listas, então o que for
   alterado aqui aparece igual nos quatro lugares.

   Os valores marcados como "exemplo" são DEMONSTRATIVOS: confirme cada um
   com a confeitaria antes de publicar.

   Depois de editar, atualize também o bloco <noscript> do index.html
   (cópia estática para quem estiver sem JavaScript).
   ========================================================================== */

window.QUINA_DADOS = {
  marca: {
    nome: "QUINA",
    descritor: "Bolos sob encomenda"
  },

  /* Modo demonstrativo
     - ativo: true  -> mostra o aviso e NUNCA abre o WhatsApp (só copia a mensagem).
     - ativo: false -> com contato.whatsapp válido, aparece "Abrir no WhatsApp". */
  demo: {
    ativo: true,
    aviso: "Site demonstrativo: a QUINA é uma marca fictícia, as fotos são ilustrativas e nenhum contato está configurado.",
    avisoContato: "Modo demonstração: nenhum WhatsApp está configurado, então nada é enviado. Copie a mensagem para ver como ela chegaria à confeitaria."
  },

  contato: {
    /* Somente dígitos: 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Usuário do Instagram, sem @. Vazio = o link não aparece. */
    instagram: ""
  },

  /* Limites do pedido */
  pedido: {
    convidadosMax: 300,

    /* Tabela de porções da confeitaria. Enquanto for null, o site NÃO mostra
       nenhuma estimativa de porções: a mensagem leva só os convidados informados.
       Para ativar, troque null por uma lista como esta (a primeira linha cujo
       "ate" cubra os convidados é a sugerida, por formato):

       tabelaPorcoes: [
         { formato: "redondo",    ate: 12, tamanho: "Redondo de 18 cm", porcoes: "10 a 12" },
         { formato: "redondo",    ate: 25, tamanho: "Redondo de 24 cm", porcoes: "20 a 25" },
         { formato: "retangular", ate: 30, tamanho: "Retangular de 25 x 35 cm", porcoes: "25 a 30" }
       ]
    */
    tabelaPorcoes: null
  },

  /* Opções do configurador. Cada grupo aceita "Em aberto" automaticamente. */
  formatos: [
    { id: "redondo", nome: "Redondo", descricao: "Fatias em cunha, bom para a mesa central." },
    { id: "retangular", nome: "Retangular", descricao: "Cortes em quadrados, prático para dividir em muitas porções." }
  ],

  acabamentos: [
    { id: "liso", nome: "Chantilly liso", descricao: "Cobertura lisa e limpa." },
    { id: "flores", nome: "Chantilly com flores", descricao: "Flores de bico sobre a cobertura." },
    { id: "ganache", nome: "Ganache com biquinhos", descricao: "Cobertura de chocolate com biquinhos." },
    { id: "frutas", nome: "Frutas por cima", descricao: "Frutas escolhidas na conversa." }
  ],

  sabores: [
    { id: "baunilha", nome: "Baunilha com creme", descricao: "Massa clara e recheio de creme." },
    { id: "chocolate", nome: "Chocolate com frutas vermelhas", descricao: "Massa de chocolate, creme e frutas vermelhas." },
    { id: "limao", nome: "Limão com creme", descricao: "Massa clara com recheio cítrico." },
    { id: "cenoura", nome: "Cenoura com brigadeiro", descricao: "Massa de cenoura e brigadeiro." }
  ],

  /* Fotografias (Unsplash, Licença Unsplash, uso comercial permitido).
     - id: parte do endereço após "photo-".
     - ratio: largura / altura do arquivo original.
     - pos: ponto focal (object-position).
     - vinculo: opção do configurador que a foto representa (gera o botão "Usar ...").
     - pagina / perfil: endereços usados nos créditos do rodapé. */
  imagens: {
    useLocalImages: false,
    remoteBase: "https://images.unsplash.com/",
    localBase: "assets/img/",
    larguras: [480, 800, 1200],
    largurasCapa: [800, 1200, 1800]
  },

  /* Quais fotos entram em cada faixa da seção "Por fora e por dentro". */
  faixas: {
    formatos: ["redondo", "retangular", "ganache"],
    cortes: ["corteCreme", "corteChocolate"]
  },

  fotos: {
    abertura: {
      rotulo: "Capa",
      arquivo: "abertura",
      id: "1519197462-7755f76e6fbd",
      ratio: 0.8,
      pos: "50% 78%",
      alt: "Bolo redondo visto de cima, com cobertura rosada, frutas vermelhas e folhas de hortelã. A primeira fatia está sobre uma espátula, ao lado do bolo.",
      autor: "Odiseo Castrejon",
      perfil: "https://unsplash.com/@edgarraw",
      pagina: "https://unsplash.com/photos/LTaNflncXV0"
    },
    redondo: {
      rotulo: "Bolo redondo",
      arquivo: "bolo-redondo-flores",
      id: "1788240357812-58893f16e148",
      ratio: 1.47,
      pos: "50% 45%",
      alt: "Bolo redondo de cobertura clara com flores de chantilly rosa e verde, sobre uma base de madeira e um pano verde.",
      legenda: "Bolo redondo de cobertura clara com flores de chantilly em rosa e verde, sobre base de madeira.",
      autor: "Liana S",
      perfil: "https://unsplash.com/@cherstve_pechivo",
      pagina: "https://unsplash.com/photos/2pYoY2dsh9M",
      vinculo: { grupo: "acabamento", opcao: "flores" }
    },
    retangular: {
      rotulo: "Bolo retangular",
      arquivo: "bolo-retangular",
      id: "1695904255931-78b11e1cb049",
      ratio: 1.333,
      pos: "50% 50%",
      alt: "Bolo retangular visto de cima, com cobertura clara decorada com flores e frutas, sobre uma base dourada.",
      legenda: "Bolo retangular de cobertura clara, decorado com flores e frutas, sobre base dourada.",
      autor: "Karina Kungla",
      perfil: "https://unsplash.com/@pixelperfectmom",
      pagina: "https://unsplash.com/photos/sxhu7gmKsZ4",
      vinculo: { grupo: "formato", opcao: "retangular" }
    },
    ganache: {
      rotulo: "Cobertura de ganache",
      arquivo: "cobertura-ganache",
      id: "1713274788200-3ebde5262387",
      ratio: 1.5,
      pos: "50% 50%",
      alt: "Bolo redondo de cobertura lisa de chocolate com biquinhos, cortado em fatias, com a primeira fatia retirada e o recheio à mostra.",
      legenda: "Bolo redondo de cobertura lisa de chocolate com biquinhos, com a primeira fatia retirada.",
      autor: "Olga Petnyunene",
      perfil: "https://unsplash.com/@12tones",
      pagina: "https://unsplash.com/photos/zcg3kMd6_Lc",
      vinculo: { grupo: "acabamento", opcao: "ganache" }
    },
    corteCreme: {
      rotulo: "Corte com creme",
      arquivo: "corte-creme",
      id: "1741429385407-b5d5b94f433f",
      ratio: 1.333,
      pos: "50% 50%",
      alt: "Corte lateral de um bolo de duas camadas douradas, com recheio de creme claro entre elas.",
      legenda: "Corte de um bolo de duas camadas douradas com recheio de creme claro.",
      autor: "Iain",
      perfil: "https://unsplash.com/@photoken123",
      pagina: "https://unsplash.com/photos/V5dD8FJeD2E",
      vinculo: { grupo: "sabor", opcao: "baunilha" }
    },
    corteChocolate: {
      rotulo: "Corte de chocolate",
      arquivo: "corte-chocolate",
      id: "1562585194-aa017445b3ad",
      ratio: 1.261,
      pos: "50% 50%",
      alt: "Fatia de bolo de chocolate cortada ao meio, com recheio de creme branco e pedaços de fruta vermelha.",
      legenda: "Fatia de bolo de chocolate com recheio de creme branco e frutas vermelhas.",
      autor: "Brett Jordan",
      perfil: "https://unsplash.com/@brett_jordan",
      pagina: "https://unsplash.com/photos/g3cAM2o8GUs",
      vinculo: { grupo: "sabor", opcao: "chocolate" }
    },
    embalagem: {
      rotulo: "Embalagem",
      arquivo: "embalagem",
      id: "1774451853657-a45138796465",
      ratio: 0.663,
      pos: "50% 55%",
      alt: "Caixa branca fechada, amarrada com uma fita verde-oliva, sobre uma superfície clara.",
      legenda: "Caixa branca amarrada com fita verde-oliva.",
      autor: "Khanh Do",
      perfil: "https://unsplash.com/@donguyenkhanhs",
      pagina: "https://unsplash.com/photos/o0wb7fpyvRo"
    }
  },

  /* Como a encomenda funciona. Os textos de "exemplo" são demonstrativos.
     combinar: true -> aparece o selo "A combinar na conversa". */
  encomenda: {
    itens: [
      {
        titulo: "Antecedência",
        texto: "Quanto antes você chamar, mais opções de data e de bolo. O prazo mínimo depende do bolo e da agenda da confeitaria.",
        exemplo: "Exemplo da demonstração: pedidos com 10 dias de antecedência.",
        combinar: false
      },
      {
        titulo: "Retirada ou entrega",
        texto: "A confeitaria informa se o bolo é retirado em horário marcado ou entregue. A entrega depende do endereço.",
        exemplo: "Exemplo da demonstração: retirada com horário marcado. Área de entrega a definir.",
        combinar: true
      },
      {
        titulo: "Quando o pedido é confirmado",
        texto: "O pedido só vale depois da conversa: preço, disponibilidade e forma de pagamento são combinados ali, não neste site.",
        exemplo: "",
        combinar: false
      }
    ]
  }
};
