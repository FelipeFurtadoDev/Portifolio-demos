/* ==========================================================================
   LUME · Marmoraria: configuração central
   O que muda de um cliente para outro fica aqui: marca, modo demonstração,
   contato (WhatsApp, endereço e horários), fotos com créditos e mensagens.

   Os textos das seções ficam no index.html, para continuarem legíveis sem
   JavaScript. Os mesmos dados de contato aparecem no HTML como texto fixo;
   se você alterar aqui, o script atualiza a página ao carregar.
   ========================================================================== */

window.LUME_CONFIG = {
  brand: { name: "LUME" },

  /* Modo demonstração
     - enabled: true  -> mostra a faixa de aviso; os botões de contato abrem uma
                         janela com a mensagem pronta e avisam que nada foi enviado.
     - enabled: false -> os botões abrem o WhatsApp com a mensagem, desde que
                         contact.whatsapp seja válido. */
  demo: {
    enabled: true,
    notice: "Demonstração: marca fictícia e fotos ilustrativas.",
    contactNotice: "Contato real ainda não configurado: nada foi enviado e nenhum link externo foi aberto. Copie a mensagem para usá-la depois."
  },

  contact: {
    /* Somente dígitos: 55 + DDD + número. Ex.: "5511912345678".
       Vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    greeting: "Olá, LUME!",
    general: "Gostaria de conversar sobre uma peça sob medida para minha casa.",
    display: "(00) 00000-0000",
    address: ["Rua das Pedreiras, 120", "Distrito Industrial, Cidade Exemplo", "Endereço fictício"],
    hours: [["Segunda a sexta", "8h às 18h"], ["Sábado", "8h às 12h"], ["Domingo", "Fechado"]]
  },

  /* Fotos locais
     false -> fotos servidas pela CDN da Unsplash (padrão).
     true  -> usa assets/img/<chave>-<largura>.webp, gerados por
              tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
              volta sozinha para a CDN e o console avisa. */
  useLocalImages: false,
  localWidths: [480, 800, 1200, 1600],

  /* Fotos (licença Unsplash, não Unsplash+). São referências ilustrativas:
     não são trabalhos da marca. "grupo" liga a foto ao ambiente do mural. */
  photos: {
      "capa": {
          "id": "1771371854543-bb274762389e",
          "grupo": "capa",
          "nome": "Cozinha clara com ilha e revestimento de parede com veios",
          "alt": "Cozinha clara com ilha de tampo de tom claro em primeiro plano, revestimento de parede com veios acinzentados, armários brancos e janela grande com vista para árvores",
          "autor": "GoodLifeConstruction",
          "url": "https://unsplash.com/photos/pQVP5QmskxM",
          width: 1200,
          height: 800
      },
      "coz1": {
          "id": "1609347744403-2306e8a9ae27",
          "grupo": "cozinha",
          "nome": "Ilha com tampo claro e lateral até o piso",
          "alt": "Ilha de cozinha com tampo branco de veios cinzentos finos que continua pela lateral até o piso, duas banquetas de palha e armários claros ao fundo",
          "autor": "Jakob Owens",
          "url": "https://unsplash.com/photos/XKLZia7hPYI",
          width: 1200,
          height: 1800,
          "ambiente": "Cozinha",
          "aparencia": "Tampo branco com veios cinzentos finos e irregulares.",
          "composicao": "Ilha em primeiro plano, banquetas de palha à esquerda e armários claros ao fundo, com luz natural.",
          "aplicacao": "Tampo de ilha que continua pela lateral até o piso."
      },
      "coz2": {
          "id": "1617228069096-4638a7ffc906",
          "grupo": "cozinha",
          "nome": "Cozinha com janela sobre a bancada",
          "alt": "Cozinha de armários claros com janela larga sobre a bancada, ilha de tampo claro em primeiro plano, fogão à direita e piso de madeira clara",
          "autor": "Cat Han",
          "url": "https://unsplash.com/photos/VgyN_CWXQVM",
          width: 1200,
          height: 800,
          "ambiente": "Cozinha",
          "aparencia": "Tampos em tom claro, de aparência lisa.",
          "composicao": "Janela larga ao centro, bancada em linha, fogão à direita e piso de madeira clara.",
          "aplicacao": "Bancada de apoio sob a janela e ilha em primeiro plano."
      },
      "coz3": {
          "id": "1556911220-bff31c812dba",
          "grupo": "cozinha",
          "nome": "Bancada cinza-clara ao lado do fogão",
          "alt": "Bancada cinza-clara com veios em primeiro plano, fogão a gás ao fundo, armários brancos acima e frutas sobre o tampo",
          "autor": "Jason Briscoe",
          "url": "https://unsplash.com/photos/GliaHAJ3_5A",
          width: 1200,
          height: 719,
          "ambiente": "Cozinha",
          "aparencia": "Tampo cinza-claro com veios e manchas em tom mais escuro.",
          "composicao": "Tampo em primeiro plano, fogão a gás ao fundo e armários brancos acima.",
          "aplicacao": "Bancada contínua ao lado do fogão, com área de apoio."
      },
      "ban1": {
          "id": "1763485956164-73506432b990",
          "grupo": "banheiro",
          "nome": "Bancada de banheiro com cuba integrada",
          "alt": "Bancada de banheiro clara, de tom acinzentado, com cuba retangular integrada, torneira de parede preta, espelho em arco e pendente preto",
          "autor": "Peter Muniz",
          "url": "https://unsplash.com/photos/wfMM98Vggn0",
          width: 1200,
          height: 1800,
          "ambiente": "Banheiro",
          "aparencia": "Tampo claro de tom acinzentado, com veios suaves.",
          "composicao": "Bancada em diagonal, torneira de parede preta, espelho em arco e pendente preto acima.",
          "aplicacao": "Bancada com a cuba integrada e a torneira fixada na parede."
      },
      "ban2": {
          "id": "1763485956310-55f3c0e822d5",
          "grupo": "banheiro",
          "nome": "Bancada suspensa sobre gabinete de madeira",
          "alt": "Banheiro com bancada suspensa de tom cinza-claro sobre gabinete de madeira, espelho em arco e parede de revestimento amadeirado com área de chuveiro",
          "autor": "Peter Muniz",
          "url": "https://unsplash.com/photos/9OKuf13OidA",
          width: 1200,
          height: 1800,
          "ambiente": "Banheiro",
          "aparencia": "Tampo cinza-claro, de textura uniforme.",
          "composicao": "Espelho em arco à esquerda, parede de revestimento amadeirado e chuveiro ao fundo.",
          "aplicacao": "Bancada longa que acompanha a parede, sobre gabinete de madeira."
      },
      "ban3": {
          "id": "1771681278446-6f8eb0c7323f",
          "grupo": "banheiro",
          "nome": "Duas bancadas com espelhos ovais",
          "alt": "Dois gabinetes de madeira com tampo claro, espelhos ovais e luminárias douradas em parede clara",
          "autor": "Clay Banks",
          "url": "https://unsplash.com/photos/7Z2OTozIY_0",
          width: 1200,
          height: 800,
          "ambiente": "Banheiro",
          "aparencia": "Tampos em tom claro com veios cinzentos discretos.",
          "composicao": "Duas cubas lado a lado, espelhos ovais e luminárias douradas, em vista frontal.",
          "aplicacao": "Bancada dupla sobre gabinetes de madeira."
      },
      "gou1": {
          "id": "1762117360871-f11fbad00ee1",
          "grupo": "gourmet",
          "nome": "Varanda gourmet com cooktop na bancada",
          "alt": "Bancada clara de borda espessa com cooktop preto embutido em uma varanda coberta com palha, com piscina e jardim ao fundo",
          "autor": "Alef Morais",
          "url": "https://unsplash.com/photos/YTnLXCH0jWw",
          width: 1200,
          height: 675,
          "ambiente": "Área gourmet",
          "aparencia": "Tampo claro de borda espessa, com cooktop preto embutido.",
          "composicao": "Bancada em diagonal no primeiro plano, piscina e jardim ao fundo e cobertura de palha no alto.",
          "aplicacao": "Bancada de varanda com recorte para o cooktop."
      },
      "gou2": {
          "id": "1762117360868-d4e757073d45",
          "grupo": "gourmet",
          "nome": "Ilha gourmet sob cobertura de ripas",
          "alt": "Ilha comprida de bancada cinza-clara com banquetas de palha sob cobertura de ripas com iluminação acesa, em uma área gourmet",
          "autor": "Alef Morais",
          "url": "https://unsplash.com/photos/OsUiWBJ4AXU",
          width: 1200,
          height: 1500,
          "ambiente": "Área gourmet",
          "aparencia": "Bancada em tom cinza-claro, de superfície lisa.",
          "composicao": "Ilha comprida com banquetas de palha, cobertura de ripas e iluminação acesa.",
          "aplicacao": "Ilha que serve de apoio e de lugar de refeição na área gourmet."
      },
      "gou3": {
          "id": "1762117361035-5cd4f9c24795",
          "grupo": "gourmet",
          "nome": "Área gourmet com ilha, banquetas e TV",
          "alt": "Área gourmet com ilha comprida e banquetas de palha, televisão na parede e cobertura de ripas com luz em linha",
          "autor": "Alef Morais",
          "url": "https://unsplash.com/photos/aUsRyb_gPTI",
          width: 1200,
          height: 1500,
          "ambiente": "Área gourmet",
          "aparencia": "Bancada de tom cinza-claro com borda reta.",
          "composicao": "Vista ampla do espaço: ilha, banquetas, televisão na parede e cobertura de ripas com luz em linha.",
          "aplicacao": "Ilha de apoio a uma área de convivência externa."
      }
  },

  environments: {"cozinha": "Cozinha", "banheiro": "Banheiro", "gourmet": "Área gourmet"},

  /* Peças sob medida: nome e mensagem usados nos botões da seção 5. */
  pieces: {
      "bancadas": {
          "nome": "Bancadas",
          "mensagem": "Gostaria de pedir um orçamento de bancadas sob medida para minha casa."
      },
      "lavatorios": {
          "nome": "Lavatórios",
          "mensagem": "Gostaria de pedir um orçamento de lavatório sob medida para meu banheiro."
      },
      "soleiras": {
          "nome": "Soleiras",
          "mensagem": "Gostaria de pedir um orçamento de soleiras sob medida para minha casa."
      },
      "peitoris": {
          "nome": "Peitoris",
          "mensagem": "Gostaria de pedir um orçamento de peitoris sob medida para minha casa."
      }
  }
};
