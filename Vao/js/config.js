/* ==========================================================================
   VÃO · Banho e Tosa — configuração central
   O que muda de um cliente para outro fica aqui: marca, modo demonstração,
   contato, localização, horários e créditos das fotos.

   O index.html guarda uma cópia destes dados para quem navega sem
   JavaScript (bloco "Consulte um horário"). Ao personalizar, altere aqui
   e confira o mesmo bloco no HTML (marcado com EDITAR).
   ========================================================================== */

window.VAO_CONFIG = {
  brand: {
    name: "VÃO",
    descriptor: "Banho e tosa para cães"
  },

  /* Modo demonstração
     - enabled: true  -> mostra a faixa de aviso e o botão de contato só
                         explica que o atendimento está desativado.
     - enabled: false -> o botão abre o WhatsApp do estúdio com a mensagem
                         abaixo, desde que contact.whatsapp seja válido. */
  demo: {
    enabled: true,
    notice: "Demonstração: VÃO é uma marca fictícia. Endereço e horários são ilustrativos, e as fotos são de banco de imagens.",
    contactNotice: "Atendimento desativado nesta demonstração. O botão não abre o WhatsApp e nenhuma mensagem é enviada."
  },

  contact: {
    /* Somente dígitos: 55 + DDD + número. Ex.: "5511912345678".
       Vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Texto que abre a conversa no WhatsApp (versão comercial). */
    message: "Olá! Gostaria de consultar horários para banho e tosa do meu cão.",
    /* Rótulo do botão em cada modo. */
    buttonLabel: "Consultar horários pelo WhatsApp",

    /* Localização. mapsUrl vazio = o link "Abrir no mapa" não aparece. */
    address: "Rua Ilustrativa, 120",
    district: "Vila Exemplo, São Paulo",
    addressNote: "Endereço fictício",
    mapsUrl: "",

    /* Usuário do Instagram, sem @. Vazio = o link não aparece. */
    instagram: ""
  },

  /* Horários. note aparece abaixo da lista. */
  hours: {
    rows: [
      { days: "Terça a sexta", time: "8h às 18h" },
      { days: "Sábado", time: "8h às 13h" },
      { days: "Domingo e segunda", time: "Fechado" }
    ],
    note: "Horários de exemplo. Atendimento somente com hora marcada."
  },

  /* Fotos locais
     false -> fotos servidas pela CDN da Unsplash (padrão).
     true  -> usa assets/img/<nome>-<largura>.webp, gerados por
              tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
              volta sozinha para a CDN. */
  useLocalImages: false,

  /* Créditos exibidos no rodapé. Todas as fotos: Licença Unsplash. */
  credits: [
    { role: "Capa", author: "Karthik Sridasyam", url: "https://unsplash.com/photos/Iujgc-QoLmo" },
    { role: "Chegada", author: "Andriyko Podilnyk", url: "https://unsplash.com/photos/VehdYPKnX8Y" },
    { role: "Banho e tosa (visita)", author: "Ayla Verschueren", url: "https://unsplash.com/photos/DAhcXRQciY4" },
    { role: "Retirada", author: "Tamas Pap", url: "https://unsplash.com/photos/Qdt8f7Tcle0" },
    { role: "Banho", author: "Vidak", url: "https://unsplash.com/photos/xI5VJYa0jmE" },
    { role: "Tosa higiênica", author: "H Wonder", url: "https://unsplash.com/photos/NA2SJewfUTU" },
    { role: "Tosa completa", author: "or edri", url: "https://unsplash.com/photos/FLft9hFQ6DM" }
  ]
};
