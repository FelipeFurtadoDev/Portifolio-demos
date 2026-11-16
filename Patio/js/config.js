/* ==========================================================================
   PÁTIO · Estética automotiva com hora marcada — configuração central
   Tudo o que muda de um cliente para outro fica aqui: modo demonstração,
   WhatsApp e mensagens, endereço e horários do estúdio, etapas de chegada e
   entrega do carro e créditos das fotos. Os textos editoriais (serviços, legendas, perguntas e respostas)
   ficam no index.html, para a página continuar legível sem JavaScript.
   ========================================================================== */

window.PATIO_CONFIG = {
  brand: {
    name: "PÁTIO"
  },

  /* Modo demonstração
     - enabled: true  -> mostra o aviso no topo e NUNCA abre o WhatsApp; os
                         botões abrem uma janela com a mensagem de exemplo e
                         a opção de copiá-la.
     - enabled: false -> os botões abrem o WhatsApp com a mensagem pronta,
                         desde que contact.whatsapp seja um número válido. */
  demo: {
    enabled: true,
    notice: "PÁTIO é uma marca fictícia. As fotos são ilustrativas, de banco de imagens, e o WhatsApp não está configurado.",
    copyLabel: "Copiar mensagem de exemplo"
  },

  contact: {
    /* Somente dígitos: DDI 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Mensagem geral: capa, cabeçalho e agendamento. */
    greeting: "Olá, PÁTIO! Gostaria de consultar os horários para levar meu carro ao estúdio.",
    /* Mensagem de quem já tem horário e quer combinar a entrega do carro. */
    deliveryMessage: "Olá, PÁTIO! Já tenho horário marcado e quero combinar a entrega do meu carro no estúdio.",
    /* Mensagem por serviço. {servico} recebe o nome do serviço. */
    serviceMessage: "Olá, PÁTIO! Quero agendar {servico} no estúdio. Quais horários vocês têm?"
  },

  /* Nome de cada serviço dentro da mensagem (chave = data-wa do index.html). */
  services: {
    lavagem:      "a lavagem detalhada",
    higienizacao: "a higienização interna",
    protecao:     "a proteção de pintura"
  },

  /* Estúdio: endereço, horários e etapas de chegada e entrega.
     demo: true mostra o selo "Dados demonstrativos" na página. Troque por
     false quando os dados forem os do cliente. */
  studio: {
    demo: true,
    addressLines: [
      "Rua das Oficinas, 240",
      "Distrito Industrial, Cidade Exemplo",
      "CEP 00000-000"
    ],
    reference: "Portão cinza ao lado da loja de autopeças. Vagas para clientes no pátio lateral.",
    hours: [
      { days: "Segunda a sexta",    time: "8h às 18h" },
      { days: "Sábado",             time: "8h às 13h" },
      { days: "Domingo e feriados", time: "Fechado" }
    ],
    note: "O estúdio atende somente com hora marcada. Chegue no horário combinado.",
    steps: [
      { title: "Chegada",         text: "Estacione no pátio lateral e fale com a equipe na entrada do box. Chegue no horário marcado para o serviço começar no tempo combinado." },
      { title: "Entrega do carro", text: "Vistoriamos o carro com você, anotamos os detalhes da pintura e do interior e você deixa as chaves. Retire antes os objetos pessoais." },
      { title: "Retirada",         text: "Avisamos pelo WhatsApp quando o carro estiver pronto. Você confere o resultado com a equipe antes de sair." }
    ]
  },

  /* Imagens locais
     false -> fotos servidas pela CDN do Unsplash (padrão).
     true  -> usa assets/img/<nome>-<largura>.webp, gerados por
              tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
              volta sozinha para a CDN. */
  useLocalImages: false,

  /* Larguras geradas por foto (chave = data-img do index.html). */
  imageFiles: {
    capa:     [800, 1200, 1800, 2400],
    lavagem:  [700, 1000, 1400, 1800],
    interior: [600, 900, 1200, 1600],
    protecao: [600, 900, 1200],
    volante:  [600, 900, 1200],
    aplicacao: [600, 900, 1200, 1600],
    roda:     [480, 720, 1000],
    raios:    [600, 900, 1200, 1600],
    banco:    [480, 720, 1000],
    reflexo:  [600, 900, 1200, 1600],
    estudio:  [600, 900, 1200, 1600]
  },

  /* Créditos exibidos no rodapé. Todas as fotos: Licença Unsplash. */
  credits: [
    { role: "Abertura",             author: "Luay Barani",        id: "z6o7bOvvalU" },
    { role: "Lavagem detalhada",    author: "Willian Cittadin",   id: "DtrI63-Z46I" },
    { role: "Higienização interna", author: "Towfiqu barbhuiya",  id: "5m5418Ng6t8" },
    { role: "Proteção de pintura",  author: "Mohamed Gado",       id: "jZdOBQvDOXM" },
    { role: "Interior, gesto",       author: "Muhammad Saad",      id: "_vmBjTG5L1g" },
    { role: "Pintura, gesto",        author: "Tyler",              id: "3WR9p-pk2Fg" },
    { role: "Limpeza de rodas",     author: "Adrian Dascal",      id: "Ce_gQ7Z0eAc" },
    { role: "Raios da roda",        author: "Frankie Lopez",      id: "os_LwBZHi6E" },
    { role: "Textura do banco",     author: "Obi",                id: "iUkQ06FNOrU" },
    { role: "Reflexo na pintura",   author: "Sean Foster",        id: "0WwgdD5cfnQ" },
    { role: "Ambiente do estúdio",  author: "Deniz Demirci",      id: "cNQoYkRJmQk" }
  ]
};
