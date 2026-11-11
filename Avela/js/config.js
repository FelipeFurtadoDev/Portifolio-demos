/* ==========================================================================
   AVELA — Atelier de Confeitaria · configuração central
   --------------------------------------------------------------------------
   Tudo o que muda de uma confeitaria para outra fica aqui:
   marca, modo demonstrativo, contato, informações práticas, textos,
   coleções, peças, fotografias e créditos.

   Depois de editar este arquivo, atualize também a cópia estática da carta
   no index.html (bloco "carta__estatica"). Ela aparece para quem estiver
   sem JavaScript e ajuda os buscadores.
   ========================================================================== */

window.AVELA_CONFIG = {
  brand: {
    name: "AVELA",
    wordmark: "avela",
    descriptor: "Atelier de Confeitaria",
    tagline: "Doces feitos para marcar momentos."
  },

  /* Modo demonstrativo
     - enabled: true  -> mostra a faixa de aviso e NUNCA abre o WhatsApp
                         (a consulta oferece "Copiar mensagem").
     - enabled: false -> com contact.whatsapp válido, o botão abre a conversa
                         com a mensagem pronta. */
  demo: {
    enabled: true,
    notice: "Site demonstrativo: a AVELA é uma marca fictícia, as fotos são ilustrativas e o contato não está configurado.",
    consultNote: "Demonstração: nenhum WhatsApp está configurado, então nada é enviado. Copie a mensagem para ver como ela chegaria à confeitaria."
  },

  contact: {
    /* Somente dígitos: 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Usuário do Instagram, sem @. Vazio = o link não aparece. */
    instagram: ""
  },

  /* Informações práticas exibidas no ateliê.
     Os valores abaixo são DEMONSTRATIVOS: confirme cada um com a confeitaria. */
  practical: [
    { term: "Antecedência", text: "Combinada em cada consulta, conforme a peça e a data." },
    { term: "Retirada e entrega", text: "Retirada no ateliê com horário marcado. Entrega consultada conforme o endereço." },
    { term: "Atendimento", text: "De terça a sábado, das 9h às 18h, pelo WhatsApp." },
    { term: "Onde fica", text: "Ateliê em São Paulo, SP. O endereço é enviado na conversa." }
  ],

  /* Linha curta da abertura. */
  location: "Ateliê em São Paulo. Encomendas por conversa, com retirada marcada.",

  /* Mensagem enviada (ou copiada). {peca}, {colecao} e {data} são substituídos. */
  message: {
    greeting: "Olá, AVELA!",
    withPiece: "Vi na carta do site a peça \"{peca}\", da coleção {colecao}, e gostaria de consultar uma encomenda parecida.",
    withoutPiece: "Vi a carta do site e gostaria de consultar uma encomenda.",
    withDate: "Seria para {data}.",
    closing: "Pode me contar como funciona? Sei que sabor, tamanho, valor e prazo são combinados na conversa."
  },

  /* Fotografias
     - useLocalImages: false -> usa a CDN da Unsplash (padrão atual).
     - useLocalImages: true  -> usa assets/img/<file>-<largura>.webp
       (gere os arquivos com tools/baixar-recursos.ps1). Se um arquivo
       faltar, a foto volta sozinha para a versão remota.
     - pos / posMobile: ponto focal do recorte (CSS object-position).
       posMobile vale até 899 px de largura. */
  images: {
    useLocalImages: false,
    remoteBase: "https://images.unsplash.com/",
    localBase: "assets/img/",
    widths: [480, 960, 1440],
    heroWidths: [800, 1400, 2200]
  },

  hero: {
    id: "photo-1600631343437-07520abddc68",
    file: "abertura",
    alt: "Fatia alta de bolo mousse de chocolate com base de avelãs, decorada com avelãs inteiras, cereja e lascas de chocolate, sobre disco dourado.",
    author: "Gabriel Miklós",
    page: "https://unsplash.com/photos/7FfW0pIoFJk"
  },

  /* Coleções da carta. As peças são DEMONSTRATIVAS: descrevem o que se vê
     na foto, não um cardápio garantido. */
  collections: [
    {
      id: "bolos",
      name: "Bolos autorais",
      summary: "Bolos de corte alto, montados em camadas para que o recheio apareça em cada fatia.",
      talk: ["Tamanho pelo número de convidados", "Combinação de massa e recheio", "Acabamento da cobertura"],
      pieces: [
        {
          id: "pistache",
          name: "Pistache e baunilha",
          desc: "Camadas de massa amanteigada e creme de pistache, com cobertura lisa e pistaches picados por cima.",
          image: {
            id: "photo-1694837493185-d92e727c6346", file: "bolo-pistache",
            alt: "Bolo de camadas com cobertura verde-clara e pistaches picados, fotografado de perto sobre fundo rosado.",
            author: "Maria Klichik", page: "https://unsplash.com/photos/WbN4gDEp3Zo",
            pos: "50% 45%", posMobile: "40% 50%"
          }
        },
        {
          id: "red-velvet",
          name: "Red velvet e frutas vermelhas",
          desc: "Massa vermelha e úmida intercalada com creme claro e um fio de geleia de frutas escuras.",
          image: {
            id: "photo-1779885580435-949062b1abb3", file: "bolo-red-velvet",
            alt: "Corte de bolo red velvet visto bem de perto, com camadas vermelhas, creme branco e recheio de frutas escuras.",
            author: "An Shved", page: "https://unsplash.com/photos/fS-ntep5yhI",
            pos: "50% 40%", posMobile: "50% 45%"
          }
        },
        {
          id: "chocolate-framboesa",
          name: "Chocolate e framboesa",
          desc: "Bolo baixo e denso de chocolate, coberto por framboesas frescas e uma camada fina de açúcar.",
          image: {
            id: "photo-1567009349827-ab242f2c96e6", file: "bolo-chocolate-framboesa",
            alt: "Bolo redondo de chocolate coberto de framboesas polvilhadas com açúcar, sobre prato de vidro e pano branco.",
            author: "Uliana Kopanytsia", page: "https://unsplash.com/photos/ySxSlqeC0YM",
            pos: "50% 38%", posMobile: "50% 40%"
          }
        }
      ]
    },
    {
      id: "tortas",
      name: "Tortas",
      summary: "Massa crocante, recheio cremoso e uma superfície pensada para ser vista antes do primeiro corte.",
      talk: ["Inteira ou em fatias", "Frutas conforme a época", "Retirada ou entrega"],
      pieces: [
        {
          id: "chocolate-figo",
          name: "Chocolate, figo e pistache",
          desc: "Ganache lisa e escura sobre massa dourada, finalizada no centro com figos, frutas vermelhas e pistache.",
          image: {
            id: "photo-1626803775151-61d756612f97", file: "torta-chocolate-figo",
            alt: "Torta de chocolate vista de cima sobre superfície azul, com figos, frutas vermelhas e pistache no centro.",
            author: "Ruth Georgiev", page: "https://unsplash.com/photos/dvmiNXMh9d8",
            pos: "50% 50%", posMobile: "50% 50%"
          }
        },
        {
          id: "frutas-vermelhas",
          name: "Frutas vermelhas",
          desc: "Recheio cremoso sob uma camada brilhante de geleia, coberto por morangos, framboesas, amoras e hortelã.",
          image: {
            id: "photo-1771556621626-353ce8ecb5e9", file: "torta-frutas-vermelhas",
            alt: "Torta redonda com cobertura vermelha brilhante, frutas vermelhas frescas e folhas de hortelã na borda.",
            author: "Diana Díaz", page: "https://unsplash.com/photos/sE8YNvc-xlU",
            pos: "50% 55%", posMobile: "50% 55%"
          }
        },
        {
          id: "noz-peca",
          name: "Noz-pecã e caramelo",
          desc: "Recheio de caramelo coberto de nozes-pecã tostadas, com borda alta de massa amanteigada.",
          image: {
            id: "photo-1767065584339-5d58fb4d8a04", file: "torta-noz-peca",
            alt: "Torta de noz-pecã com cobertura de caramelo brilhante, fotografada de perto com garfos ao fundo.",
            author: "Diego Arenas de Rodrigo", page: "https://unsplash.com/photos/-0l6Xx2rck8",
            pos: "50% 60%", posMobile: "50% 60%"
          }
        }
      ]
    },
    {
      id: "sobremesas",
      name: "Sobremesas",
      summary: "Peças individuais e para compartilhar, com acabamento de vitrine: glaçagem, cremes aplicados e camadas finas.",
      talk: ["Individuais ou para compartilhar", "Quantidade aproximada", "Mesa de evento ou presente"],
      pieces: [
        {
          id: "entremet-framboesa",
          name: "Entremet de framboesa",
          desc: "Mousse coberta por glaçagem vermelha espelhada, com framboesas frescas e um disco de chocolate no topo.",
          image: {
            id: "photo-1632134964015-9300cf2314cf", file: "sobremesa-entremet",
            alt: "Pequeno entremet com glaçagem vermelha espelhada, framboesas e disco de chocolate, sobre base escura e fundo claro.",
            author: "Bohdan Stocek", page: "https://unsplash.com/photos/YBYN5X26duQ",
            pos: "42% 50%", posMobile: "40% 50%"
          }
        },
        {
          id: "tortinha-pistache",
          name: "Tortinha de pistache",
          desc: "Base crocante, camada de framboesa e creme de pistache aplicado com bico, cortada para mostrar o interior.",
          image: {
            id: "photo-1702745284748-59c103941c41", file: "sobremesa-tortinha-pistache",
            alt: "Tortinha cortada ao meio mostrando camada de framboesa sob creme de pistache e pistaches picados.",
            author: "Serghey Savchuk", page: "https://unsplash.com/photos/XcuJRPEgn1Q",
            pos: "45% 55%", posMobile: "40% 55%"
          }
        },
        {
          id: "fatia-caramelo",
          name: "Fatia de caramelo",
          desc: "Camadas finas de massa e creme de caramelo, servidas em fatias com raspas de chocolate.",
          image: {
            id: "photo-1547414368-ac947d00b91d", file: "sobremesa-caramelo",
            alt: "Fatia de bolo de caramelo em camadas sobre prato de ardósia, com raspas de chocolate e um garfo.",
            author: "Aliona Gumeniuk", page: "https://unsplash.com/photos/GAauSStia3s",
            pos: "50% 45%", posMobile: "50% 45%"
          }
        }
      ]
    },
    {
      id: "presentes",
      name: "Presentes doces",
      summary: "Caixas para presentear e para lembranças de evento, montadas na quantidade e nas cores combinadas.",
      talk: ["Quantidade de caixas", "Cartão com mensagem", "Cores da embalagem"],
      pieces: [
        {
          id: "caixa-bombons",
          name: "Caixa de bombons",
          desc: "Bombons sortidos em caixa rígida, com laço de fita e espaço para um cartão.",
          image: {
            id: "photo-1481391319762-47dff72954d9", file: "presente-bombons",
            alt: "Caixa azul-petróleo aberta com bombons sortidos, fitas vermelhas e cacau em pó espalhado sobre fundo claro.",
            author: "Jennifer Pallian", page: "https://unsplash.com/photos/dcPNZeSY3yk",
            pos: "40% 50%", posMobile: "35% 50%"
          }
        },
        {
          id: "macarons",
          name: "Macarons em caixa",
          desc: "Macarons em cores alternadas, enfileirados numa caixa estreita com visor.",
          image: {
            id: "photo-1771333313844-9b335e73cef9", file: "presente-macarons",
            alt: "Caixa estreita com macarons coloridos enfileirados, fotografada sobre fundo escuro.",
            author: "Haberdoedas", page: "https://unsplash.com/photos/-IAZcga6uNk",
            pos: "50% 40%", posMobile: "50% 40%"
          }
        },
        {
          id: "trufas",
          name: "Trufas em caixinha",
          desc: "Trufas em caixinha de papel com seda, um formato pequeno para lembranças e mesas de evento.",
          image: {
            id: "photo-1763700667398-24ae7f2289fc", file: "presente-trufas",
            alt: "Caixinha de papel kraft com papel de seda branco e trufas de chocolate polvilhadas.",
            author: "Cohen Berg", page: "https://unsplash.com/photos/JRa_7eKqSQU",
            pos: "45% 55%", posMobile: "40% 55%"
          }
        }
      ]
    }
  ],

  /* Fotos do ateliê (gesto manual). */
  process: {
    main: {
      id: "photo-1646082192921-272df4780996", file: "atelie-ganache",
      alt: "Mãos espalhando ganache de chocolate com uma espátula sobre um bolo em base giratória.",
      author: "MRC Témiscamingue", page: "https://unsplash.com/photos/mgxL_RIUKsM"
    },
    detail: {
      id: "photo-1545015451-f05567aa6bcc", file: "atelie-trufas",
      alt: "Mão colocando uma trufa listrada sobre uma travessa de madeira com outros bombons.",
      author: "Kyaw Tun", page: "https://unsplash.com/photos/ssG41C6mwrQ"
    }
  }
};
