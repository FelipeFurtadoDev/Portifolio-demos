/* ==========================================================================
   TRAÇO STUDIO — configuração central
   Tudo o que muda de um cliente para outro fica aqui: marca, modo
   demonstração, contatos, serviços, formatos de unha e créditos das fotos.
   Os textos de apresentação ficam no index.html, marcados com EDITÁVEL.
   ========================================================================== */

window.TRACO_CONFIG = {
  brand: {
    name: "TRAÇO Studio",
    /* Usado na saudação da mensagem do WhatsApp. */
    greetingName: "TRAÇO Studio"
  },

  /* Modo demonstração
     - enabled: true  -> mostra o aviso no topo e NUNCA abre o WhatsApp;
                         a ficha exibe a mensagem pronta para copiar.
     - enabled: false -> o botão abre o WhatsApp com a mensagem pronta,
                         desde que contact.whatsapp seja um número válido. */
  demo: {
    enabled: true,
    notice: "Site demonstrativo: o TRAÇO Studio é uma marca fictícia. As fotos são ilustrativas e o WhatsApp não está configurado."
  },

  contact: {
    /* Somente dígitos: DDI 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Usuário do Instagram sem @. Vazio = o link não aparece. */
    instagram: ""
  },

  /* Imagens locais
     false -> fotos servidas pela CDN da Unsplash (padrão atual).
     true  -> usa assets/img/<nome>-800.webp e <nome>-1200.webp
              (gerados por tools/baixar-recursos.ps1). Se um arquivo faltar,
              aquela foto volta sozinha para a URL remota. */
  useLocalImages: false,

  /* Serviços. `id` precisa coincidir com data-service no HTML.
     `shape: true` faz a ficha perguntar o formato da unha. */
  services: [
    { id: "gel",        group: "Unhas",        name: "Esmaltação em gel",                  shape: false },
    { id: "alongamento",group: "Unhas",        name: "Alongamento em gel",                 shape: true  },
    { id: "manutencao", group: "Unhas",        name: "Manutenção de alongamento",          shape: true  },
    { id: "nailart",    group: "Unhas",        name: "Nail art",                           shape: false },
    { id: "tradicional",group: "Unhas",        name: "Manicure e pedicure tradicionais",   shape: false },
    { id: "fioafio",    group: "Cílios",       name: "Extensão de cílios fio a fio",       shape: false },
    { id: "volume",     group: "Cílios",       name: "Extensão de cílios volume",          shape: false },
    { id: "manutcilios",group: "Cílios",       name: "Manutenção de extensão de cílios",   shape: false },
    { id: "lifting",    group: "Cílios",       name: "Lash lifting",                       shape: false },
    { id: "design",     group: "Sobrancelhas", name: "Design de sobrancelhas",             shape: false },
    { id: "henna",      group: "Sobrancelhas", name: "Design de sobrancelhas com henna",   shape: false },
    { id: "lamination", group: "Sobrancelhas", name: "Brow lamination",                    shape: false }
  ],

  /* Looks do lookbook. `id` coincide com data-look; `services` define o que
     "Quero esse visual" pré-seleciona na ficha. */
  looks: [
    { id: "01", name: "Vermelho longo",           services: ["alongamento"], shape: "amendoada" },
    { id: "02", name: "Preto e tartaruga",        services: ["gel", "nailart"] },
    { id: "03", name: "Volume marcado",           services: ["volume"] },
    { id: "04", name: "Ombré azul",               services: ["alongamento", "nailart"], shape: "quadrada" },
    { id: "05", name: "Stiletto vermelho",        services: ["alongamento"], shape: "stiletto" },
    { id: "06", name: "Sobrancelha desenhada",    services: ["design"] },
    { id: "07", name: "Renda e nude",             services: ["gel"] },
    { id: "08", name: "Prata e estampas",         services: ["gel", "nailart"] }
  ],

  shapes: [
    { id: "quadrada",  name: "Quadrada" },
    { id: "amendoada", name: "Amendoada" },
    { id: "bailarina", name: "Bailarina" },
    { id: "stiletto",  name: "Stiletto" },
    { id: "indefinido",name: "Ainda não sei" }
  ],

  /* Créditos das fotografias (Licença Unsplash). Exibidos no rodapé.
     Ao usar fotos do cliente, troque as imagens no HTML e ajuste esta lista. */
  photoCredits: [
    { use: "Abertura",               author: "Margarita Yutsaytis", url: "https://unsplash.com/photos/_jqRpNc96Kg" },
    { use: "Look 01",                author: "Christian Agbede",    url: "https://unsplash.com/photos/mhKQOoy0Lg8" },
    { use: "Look 02",                author: "Bryony Elena",        url: "https://unsplash.com/photos/tXwBDZS2JxQ" },
    { use: "Look 03",                author: "Samela Carvalho",     url: "https://unsplash.com/photos/hxp1rPHSUzI" },
    { use: "Look 04",                author: "Margarita Yutsaytis", url: "https://unsplash.com/photos/olHWqqK7OVw" },
    { use: "Look 05",                author: "Felicia Montenegro",  url: "https://unsplash.com/photos/zhRYFdnmXX0" },
    { use: "Look 06",                author: "E. Norman",           url: "https://unsplash.com/photos/R5CX8XDQLV0" },
    { use: "Look 07",                author: "Wilhelm Gunkel",      url: "https://unsplash.com/photos/IW5xnCydmag" },
    { use: "Look 08",                author: "de Aura",             url: "https://unsplash.com/photos/p4vthnb-INw" },
    { use: "Método",                 author: "Veronika Veronikamaks", url: "https://unsplash.com/photos/FXdBwvIJWq4" },
    { use: "Serviços de unhas",      author: "Mariia Belinska",     url: "https://unsplash.com/photos/f_Xx82lzzh0" },
    { use: "Serviços de cílios",     author: "Victor Sirbu",        url: "https://unsplash.com/photos/G5JpTUgLDQ4" },
    { use: "Serviços de sobrancelhas", author: "Stefan Vibes",      url: "https://unsplash.com/photos/mulher-que-esta-fazendo-as-sobrancelhas-com-pinca--k0_8bZ4L8c" },
    { use: "Encerramento",           author: "Sol B",               url: "https://unsplash.com/photos/F1mJCybpdwg" }
  ]
};
