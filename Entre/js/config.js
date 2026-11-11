/* ==========================================================================
   ENTRE. Atelier de Olhar & Mãos — configuração central
   Tudo o que muda de um cliente para outro fica aqui: marca, modo
   demonstração, contato, cuidados de cada categoria e créditos das fotos.
   Os textos editoriais (capa, "O gesto") ficam no index.html.
   ========================================================================== */

window.ENTRE_CONFIG = {
  brand: {
    name: "ENTRE.",
    /* Usado na saudação da mensagem. */
    greetingName: "ENTRE."
  },

  /* Modo demonstração
     - enabled: true  -> mostra o aviso no topo e NUNCA abre o WhatsApp;
                         o visitante pode copiar a mensagem pronta.
     - enabled: false -> o botão principal abre o WhatsApp com a mensagem,
                         desde que contact.whatsapp seja um número válido. */
  demo: {
    enabled: true,
    notice: "Demonstração: ENTRE. é uma marca fictícia. As fotos são ilustrativas, de banco de imagens, e o WhatsApp não está configurado."
  },

  contact: {
    /* Somente dígitos: DDI 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Usuário do Instagram, sem @. Vazio = o link não aparece. */
    instagram: "",
    /* Informações práticas exibidas ao lado da mensagem.
       Mantenha genéricas na demonstração: nada de endereço verificável. */
    details: [
      { label: "Atendimento", value: "Somente com hora marcada" },
      { label: "Dias", value: "Terça a sábado (horários de exemplo)" },
      { label: "Endereço", value: "Enviado na confirmação do horário" }
    ]
  },

  /* Imagens locais
     false -> fotos servidas pela CDN da Unsplash (padrão).
     true  -> usa assets/img/<nome>-<largura>.webp, gerados por
              tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
              volta sozinha para a CDN. */
  useLocalImages: false,

  /* Categorias de cuidado. A ordem é a dos cartões e das opções do contato.
     - id: não mude (o HTML usa data-care="maos|olhar|sobrancelhas")
     - title: nome usado nos botões e na mensagem
     - messageLabel: como a categoria entra na frase da mensagem
     - summary: descrição curta exibida no contato ao escolher
     - services: cuidados que o visitante pode marcar (opcional) */
  cares: [
    {
      id: "maos",
      title: "Mãos e unhas",
      messageLabel: "as mãos e as unhas",
      summary: "Cutilagem cuidadosa, esmaltação de acabamento limpo e formatos pensados para o seu dia a dia.",
      services: [
        "Manicure com esmaltação tradicional",
        "Esmaltação em gel",
        "Alongamento em gel",
        "Detalhe de nail art"
      ]
    },
    {
      id: "olhar",
      title: "Cílios e olhar",
      messageLabel: "os cílios e o olhar",
      summary: "Extensões e lifting escolhidos pelo formato dos seus olhos, do efeito discreto ao mais marcado.",
      services: [
        "Extensão fio a fio",
        "Volume leve",
        "Lash lifting com tintura",
        "Manutenção de extensão"
      ]
    },
    {
      id: "sobrancelhas",
      title: "Sobrancelhas",
      messageLabel: "as sobrancelhas",
      summary: "Desenho a partir da sua expressão, respeitando os fios naturais e o equilíbrio do rosto.",
      services: [
        "Design com pinça",
        "Design com henna",
        "Brow lamination",
        "Coloração dos fios"
      ]
    }
  ],

  /* Créditos exibidos no rodapé. Todas as fotos: Licença Unsplash. */
  credits: [
    { role: "Capa", author: "Andriyko Podilnyk", url: "https://unsplash.com/photos/qobqtA9S0Rs" },
    { role: "Mãos e unhas", author: "Laura Chouette", url: "https://unsplash.com/photos/t1uTqt6qhWI" },
    { role: "Cílios e olhar", author: "Milky Way Lashes", url: "https://unsplash.com/photos/GEct9d7zgos" },
    { role: "Sobrancelhas", author: "engin akyurt", url: "https://unsplash.com/photos/-AXzdbotjKI" },
    { role: "O gesto", author: "Ondrej Supitar", url: "https://unsplash.com/photos/6omaRd0IG2w" },
    { role: "Detalhe", author: "Le Petit", url: "https://unsplash.com/photos/Jp4POW00eE0" }
  ]
};
