/* ==========================================================================
   MATIZ · Estúdio de beleza — configuração central
   Tudo o que muda de um cliente para outro fica aqui: marca, modo
   demonstração, contato, mensagens, preços e durações, dados da visita e
   créditos das fotos. Os textos editoriais (nome de cada serviço e o que ele
   inclui) ficam no index.html, para a página continuar legível sem JavaScript.
   ========================================================================== */

window.MATIZ_CONFIG = {
  brand: {
    name: "MATIZ"
  },

  /* Modo demonstração
     - enabled: true  -> mostra o aviso no topo e NUNCA abre o WhatsApp;
                         as ações viram "Copiar mensagem de exemplo".
     - enabled: false -> as ações abrem o WhatsApp com a mensagem pronta,
                         desde que contact.whatsapp seja um número válido. */
  demo: {
    enabled: true,
    notice: "MATIZ é uma marca fictícia. As fotos são ilustrativas, de banco de imagens, e o WhatsApp não está configurado.",
    sampleLabel: "Copiar mensagem de exemplo",
    realLabel: "Pedir no WhatsApp"
  },

  contact: {
    /* Somente dígitos: DDI 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Mensagem geral (consultar horários), usada na faixa de abertura e no contato. */
    greeting: "Olá, MATIZ! Gostaria de consultar horários.",
    /* Mensagem por serviço. {servico} recebe o nome do serviço escolhido. */
    serviceMessage: "Olá, MATIZ! Gostaria de agendar: {servico}. Quais horários vocês têm?"
  },

  /* Dados da visita. Deixe um campo vazio ("" ou []) para mostrar o texto
     padrão do index.html ("Informado na conversa"). Na demonstração, são exemplos. */
  visit: {
    bairro: "Bairro de exemplo",
    endereco: "Rua de Exemplo, 123 (endereço demonstrativo)",
    horarios: [
      { dias: "Terça a sexta", horas: "9h às 19h" },
      { dias: "Sábado", horas: "9h às 16h" }
    ]
  },

  /* Preço e duração por serviço (chave = data-servico do index.html).
     Campo ausente, null ou "" = não aparece. Sem registro = a linha some.
     showPrices: false esconde preços e durações de uma vez. */
  showPrices: true,
  services: {
    "manicure":          { preco: "R$ 45",  duracao: "50 min" },
    "gel":               { preco: "R$ 85",  duracao: "1 h 15" },
    "remocao-gel":       { preco: "R$ 95",  duracao: "1 h 30" },
    "fio-a-fio":         { preco: "R$ 190", duracao: "2 h" },
    "volume":            { preco: "R$ 230", duracao: "2 h 30" },
    "manutencao-cilios": { preco: "R$ 120", duracao: "1 h 30" },
    "pinca":             { preco: "R$ 50",  duracao: "30 min" },
    "henna":             { preco: "R$ 65",  duracao: "45 min" },
    "lamination":        { preco: null,     duracao: "1 h" }
  },

  /* Instagram (sem @). Vazio = não aparece. Reservado para uso futuro. */
  instagram: "",

  /* Imagens locais
     false -> fotos servidas pela CDN da Unsplash (padrão).
     true  -> usa assets/img/<nome>-<largura>.webp, gerados por
              tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
              volta sozinha para a CDN. */
  useLocalImages: false,

  /* Créditos exibidos no rodapé. Todas as fotos: Licença Unsplash. */
  credits: [
    { role: "Abertura (mãos)",   author: "photo koala",         url: "https://unsplash.com/photos/EXVM7w4b_lo" },
    { role: "Abertura (olhar)",  author: "Gabrielle Wright",    url: "https://unsplash.com/photos/YCMkMQevCIE" },
    { role: "Unhas, detalhe",    author: "Kambria Trout",       url: "https://unsplash.com/photos/8XgdwxIJQAQ" },
    { role: "Cílios, detalhe",   author: "Ali Shoaee",          url: "https://unsplash.com/photos/SdStLjkoWXM" },
    { role: "Sobrancelhas, detalhe", author: "Mary Borozdina",  url: "https://unsplash.com/photos/5CnuyRFJjp4" },
    { role: "Ambiente",          author: "Gayane Khachatryan",  url: "https://unsplash.com/photos/aMnH1OgFmwM" },
    { role: "Atendimento",       author: "Giorgio Trovato",     url: "https://unsplash.com/photos/gb6gtiTZKB8" },
    { role: "Menu, unhas",       author: "Ondrej Supitar",      url: "https://unsplash.com/photos/6omaRd0IG2w" },
    { role: "Menu, cílios",      author: "Hayley Kim Studios",  url: "https://unsplash.com/photos/sRSRuxkOuzI" },
    { role: "Menu, sobrancelhas", author: "Stefan Vibes",       url: "https://unsplash.com/photos/-k0_8bZ4L8c" }
  ],

  /* Imagens (usado por useLocalImages): nome do arquivo e larguras geradas. */
  imageFiles: {
    capa:        { nome: "capa",        larguras: [480, 800, 1200, 1600] },
    cabeca:      { nome: "olhar",       larguras: [480, 800, 1200, 1600] },
    unhas:       { nome: "unhas",       larguras: [600, 1000, 1500, 2000] },
    cilios:      { nome: "cilios",      larguras: [800, 1200, 1800, 2400] },
    sobrancelha: { nome: "sobrancelha", larguras: [800, 1200, 1800, 2400] },
    espaco:      { nome: "espaco",      larguras: [600, 900, 1200, 1600] },
    atendimento: { nome: "atendimento", larguras: [480, 800, 1200] },
    menuUnhas:        { nome: "menu-unhas",        larguras: [480, 720, 1000, 1400] },
    menuCilios:       { nome: "menu-cilios",       larguras: [480, 720, 1000, 1400] },
    menuSobrancelhas: { nome: "menu-sobrancelhas", larguras: [480, 720, 1000, 1400] }
  }
};
