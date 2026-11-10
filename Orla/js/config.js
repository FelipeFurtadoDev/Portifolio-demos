/* ==========================================================================
   ORLA Pedra & Projeto — configuração do modelo
   --------------------------------------------------------------------------
   Tudo o que muda de um cliente para outro está aqui: marca, contato,
   horários, aplicações, materiais, imagens e modo demonstrativo.
   Os textos da capa ficam no index.html, marcados com "EDITÁVEL".
   ========================================================================== */
window.ORLA_CONFIG = {
  brand: {
    name: 'ORLA Pedra & Projeto',
    shortName: 'ORLA',
    tagline: 'Pedra certa. Corte preciso. Acabamento que valoriza o ambiente.',
    greeting: 'Olá, ORLA Pedra & Projeto!'
  },

  /* Modo demonstrativo: true mostra avisos e NUNCA envia mensagens.
     Para um cliente real: enabled false + contact.whatsapp preenchido. */
  demo: {
    enabled: true,
    notice: 'Site demonstrativo: empresa fictícia, contatos de exemplo e imagens ilustrativas.'
  },

  contact: {
    whatsapp: '',                        // só dígitos, com DDI e DDD. Ex.: 5511912345678
    whatsappDisplay: '(11) 90000-0000',  // como o número aparece na página
    phoneDisplay: '(11) 3000-0000',
    email: 'contato@exemplo.com.br',
    address: 'Rua Exemplo, 000',
    district: 'Lapa',
    city: 'São Paulo, SP',
    region: 'Atendimento na Zona Oeste e região',
    mapsUrl: '',                         // link do Google Maps; vazio = não mostra o link
    instagram: ''                        // usuário sem @; vazio = não mostra
  },

  hours: [
    { days: 'Segunda a sexta', time: '8h às 18h' },
    { days: 'Sábado', time: '8h às 12h' },
    { days: 'Domingo e feriados', time: 'Fechado' }
  ],

  /* Imagens: true usa os arquivos de assets/img (gerados por
     tools/baixar-recursos.ps1). Se um arquivo faltar, aquela foto volta
     sozinha para a versão remota da Unsplash. */
  useLocalImages: false,

  /* Fotos (Licença Unsplash). "file" é o nome do arquivo local. */
  images: {
    hero:        { id: '1610276099118-c929abaaa80a', file: 'capa',           author: 'Simona Sergi',       user: 'i_am_simoesse' },
    cozinha:     { id: '1772567732923-5ba1956dcd07', file: 'cozinha',        author: 'Franco Debartolo',   user: 'francotheshooter' },
    banheiro:    { id: '1754788358645-d6e6cca12e25', file: 'banheiro',       author: 'Ela De Pure',        user: 'eladepure' },
    gourmet:     { id: '1762117360868-d4e757073d45', file: 'gourmet',        author: 'Alef Morais',        user: 'alef_visuals' },
    escada:      { id: '1781047884697-53a3dc4d7eee', file: 'escada',         author: 'Sebastian Schuster', user: 'sschusterphotoart' },
    lavatorio:   { id: '1763485956243-50068d04a1ad', file: 'lavatorio',      author: 'Peter Muniz',        user: 'petepxl' },
    texBranco:   { id: '1694378061058-bb6532de3bba', file: 'textura-branco', author: 'Akbar Nemati',       user: 'akbarnemati' },
    appBranco:   { id: '1762304817469-1d6c808324ee', file: 'aplicacao-branco', author: 'Bill Ringer',      user: 'iamsimplybill' },
    texQuartzito:{ id: '1603369425250-b276f2006ec0', file: 'textura-quartzito', author: 'the blowup',      user: 'theblowup' },
    appQuartzito:{ id: '1772567732983-447c7db0ce4e', file: 'aplicacao-quartzito', author: 'Franco Debartolo', user: 'francotheshooter' },
    texTravertino:{ id: '1784652587224-062bd5f231bf', file: 'textura-travertino', author: 'Barney Goodman', user: 'bgoodpic' },
    appTravertino:{ id: '1754127321614-6daec4680c04', file: 'aplicacao-travertino', author: 'Karolina Grabowska', user: 'kaboompics' },
    texVerde:    { id: '1532644440111-bc94f97955c1', file: 'textura-verde',  author: 'Olga Thelavart',     user: 'olga_o' },
    appVerde:    { id: '1738748444653-2fb1388aef1a', file: 'aplicacao-verde', author: 'Alexey Aladashvili', user: 'alexeyaladashvili61' },
    texGranito:  { id: '1776278515692-87e1ba3f4d34', file: 'textura-granito', author: 'Compagnons',        user: 'sigmund' },
    appGranito:  { id: '1793905228745-958077009bb2', file: 'aplicacao-granito', author: 'Monaz Hastam',     user: 'monazme' }
  },

  /* Aplicações — "layout" define o lugar da peça no mosaico:
     grande | alta | media | baixa | larga */
  applications: [
    {
      id: 'cozinha', label: 'Cozinhas', formLabel: 'Cozinha', layout: 'grande',
      text: 'Bancadas e ilhas para o uso diário, com recortes de cuba e cooktop.',
      pieces: ['bancadas', 'ilhas', 'frontões', 'rodabancas'],
      image: 'cozinha', alt: 'Ilha de cozinha em pedra clara com veios suaves, banquetas e vaso com folhagem',
      focus: '50% 60%'
    },
    {
      id: 'banheiro', label: 'Banheiros', formLabel: 'Banheiro', layout: 'alta',
      text: 'Bancadas com cuba esculpida ou de apoio e prateleiras no box.',
      pieces: ['bancadas', 'cubas esculpidas', 'nichos de box'],
      image: 'banheiro', alt: 'Bancada de banheiro em mármore branco com veios violeta e cuba de apoio',
      focus: '55% 50%'
    },
    {
      id: 'gourmet', label: 'Áreas gourmet', formLabel: 'Área gourmet', layout: 'media',
      text: 'Pedras que aguentam calor, sol e uso intenso.',
      pieces: ['bancadas', 'churrasqueiras', 'tampos externos'],
      image: 'gourmet', alt: 'Área gourmet coberta com bancada longa de pedra clara e banquetas',
      focus: '50% 70%'
    },
    {
      id: 'escada', label: 'Escadas', formLabel: 'Escada', layout: 'baixa',
      text: 'Degraus e espelhos cortados em sequência, com o mesmo desenho.',
      pieces: ['degraus', 'espelhos', 'rodapés', 'patamares'],
      image: 'escada', alt: 'Escada curva em pedra bege com degraus arredondados',
      focus: '40% 60%'
    },
    {
      id: 'detalhes', label: 'Lavabos, nichos e soleiras', formLabel: 'Lavabo, nicho ou soleira', layout: 'larga',
      text: 'As peças menores, onde a precisão do corte mais aparece.',
      pieces: ['lavabos', 'nichos', 'soleiras', 'peitoris'],
      image: 'lavatorio', alt: 'Banheiro com bancada longa em pedra cinza e cuba integrada',
      focus: '50% 55%'
    }
  ],

  /* Opção extra só do formulário */
  extraAmbient: { id: 'outro', formLabel: 'Outro ambiente' },

  /* Materiais do amostruário. As descrições são gerais e ilustrativas:
     revisar com o cliente conforme as pedras que ele realmente trabalha. */
  materials: [
    {
      id: 'marmore-branco',
      name: 'Mármore branco',
      family: 'Mármore',
      tone: 'Fundo claro, veios cinza e dourados',
      text: 'Veios marcantes sobre fundo claro. É mais poroso e sensível a ácidos, como limão e vinagre, por isso costuma ir para banheiros, lavabos e painéis. Na cozinha, pede impermeabilização e cuidado no uso.',
      finishes: ['Polido', 'Levigado', 'Escovado'],
      uses: 'Lavatórios, painéis, frontões e tampos de mesa',
      texture: 'texBranco', application: 'appBranco',
      textureAlt: 'Textura de mármore branco com veios cinza',
      applicationAlt: 'Caneca sobre bancada de mármore branco com veios dourados'
    },
    {
      id: 'quartzito',
      name: 'Quartzito',
      family: 'Pedra natural de alta dureza',
      tone: 'Tons claros e quentes, desenho fluido',
      text: 'Tem desenho parecido com o do mármore, mas é bem mais duro. Costuma resistir melhor a riscos e ao calor, e por isso aparece muito em cozinhas e ilhas.',
      finishes: ['Polido', 'Levigado', 'Escovado'],
      uses: 'Bancadas de cozinha, ilhas e frontões',
      texture: 'texQuartzito', application: 'appQuartzito',
      textureAlt: 'Textura de pedra clara com veio quente atravessando a superfície',
      applicationAlt: 'Bancada de cozinha em pedra clara com frontão alto e torneira escura'
    },
    {
      id: 'travertino',
      name: 'Travertino',
      family: 'Pedra calcária',
      tone: 'Bege quente, poros e faixas naturais',
      text: 'Tons quentes e poros característicos, que podem ser preenchidos (estucados) ou mantidos abertos. É poroso: pede impermeabilização e limpeza com produtos neutros.',
      finishes: ['Levigado', 'Escovado', 'Apicoado'],
      uses: 'Escadas, lavatórios, mesas e revestimentos',
      texture: 'texTravertino', application: 'appTravertino',
      textureAlt: 'Superfície de pedra bege com sombras suaves de janela',
      applicationAlt: 'Tampo de travertino com poros aparentes, copo e livro'
    },
    {
      id: 'marmore-verde',
      name: 'Mármore verde',
      family: 'Mármore',
      tone: 'Verde profundo com veios claros',
      text: 'Uma pedra de presença, que vira o ponto focal do ambiente. Como todo mármore, pede impermeabilização e cuidado com produtos ácidos.',
      finishes: ['Polido', 'Levigado'],
      uses: 'Ilhas, lavabos, tampos e painéis',
      texture: 'texVerde', application: 'appVerde',
      textureAlt: 'Textura de mármore verde-escuro com veios claros',
      applicationAlt: 'Ilha de cozinha revestida em mármore verde com banquetas de madeira'
    },
    {
      id: 'granito-preto',
      name: 'Granito preto',
      family: 'Granito',
      tone: 'Fundo escuro com pontos claros',
      text: 'Uma das pedras mais resistentes e fáceis de manter no dia a dia. Disfarça manchas e marcas de uso, por isso é comum em cozinhas e áreas gourmet.',
      finishes: ['Polido', 'Levigado', 'Flameado'],
      uses: 'Bancadas de cozinha, áreas gourmet, soleiras e peitoris',
      texture: 'texGranito', application: 'appGranito',
      textureAlt: 'Textura de granito preto com pontos brancos',
      applicationAlt: 'Cozinha com ilha em pedra escura de veios claros e paredes brancas'
    }
  ],

  /* Opção extra só do formulário */
  extraMaterial: { id: 'sugestao', name: 'Ainda não sei, quero sugestão' }
};
