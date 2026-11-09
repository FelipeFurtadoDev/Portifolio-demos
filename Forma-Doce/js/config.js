/* ==========================================================================
   FORMA DOCE — configuração central
   Tudo o que muda de um cliente para outro fica aqui: marca, contatos,
   modo demonstração, opções do formulário e créditos das fotografias.
   ========================================================================== */

window.FORMA_DOCE_CONFIG = {
  brand: {
    name: "Forma Doce",
    descriptor: "Confeitaria de celebrações",
    tagline: "Momentos especiais merecem um sabor à altura."
  },

  /* Modo demonstração
     - enabled: true  -> mostra a faixa de aviso e NÃO abre o WhatsApp.
     - enabled: false -> o formulário abre o WhatsApp com a mensagem pronta
                         (desde que contact.whatsapp seja um número válido). */
  demo: {
    enabled: true,
    notice: "Site demonstrativo: a Forma Doce é uma marca fictícia, as fotos são ilustrativas e os contatos não estão configurados."
  },

  contact: {
    /* Somente dígitos, com DDI 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Usuário do Instagram sem @. Vazio = não exibe link. */
    instagram: "",
    /* Textos curtos exibidos no cartão de contato. */
    serviceArea: "Retirada e entrega combinadas conforme endereço e data.",
    hours: "Atendimento de pedidos pelo WhatsApp, em horário comercial."
  },

  /* Produtos do formulário. `id` precisa coincidir com data-product no HTML.
     qtyLabel / qtyUnit mudam conforme o produto escolhido. */
  products: [
    {
      id: "bolo",
      name: "Bolo personalizado",
      qtyLabel: "Para quantas pessoas, aproximadamente?",
      qtyUnit: "pessoas",
      qtyHint: "Ajuda a definir tamanho e formato do bolo.",
      qtyMin: 1,
      qtyMax: 500
    },
    {
      id: "doces",
      name: "Doces finos",
      qtyLabel: "Quantos doces, aproximadamente?",
      qtyUnit: "doces",
      qtyHint: "Uma estimativa já basta; a quantidade é ajustada no orçamento.",
      qtyMin: 1,
      qtyMax: 5000
    },
    {
      id: "caixa",
      name: "Caixa de doces para presente",
      qtyLabel: "Quantas caixas?",
      qtyUnit: "caixas",
      qtyHint: "Para várias pessoas presenteadas, informe o total de caixas.",
      qtyMin: 1,
      qtyMax: 500
    },
    {
      id: "kit",
      name: "Kit para pequena comemoração",
      qtyLabel: "Quantos kits?",
      qtyUnit: "kits",
      qtyHint: "Cada kit é pensado para uma comemoração pequena.",
      qtyMin: 1,
      qtyMax: 50
    }
  ],

  /* Ocasiões. `id` precisa coincidir com data-occasion (adesivos) e
     data-occasions (produtos) no HTML. */
  occasions: [
    { id: "aniversario", name: "Aniversário" },
    { id: "presente", name: "Presente" },
    { id: "festa", name: "Festa ou evento" },
    { id: "pequena", name: "Pequena celebração" }
  ],

  /* Créditos das fotografias (Unsplash License). Exibidos no rodapé.
     Ao usar fotos do cliente, substitua os src no HTML e ajuste esta lista. */
  photoCredits: [
    { use: "Abertura", author: "Deva Williamson", url: "https://unsplash.com/photos/HHebuDYjP4I" },
    { use: "Bolos personalizados", author: "Katie Rosario", url: "https://unsplash.com/photos/QNyRp21hb5I" },
    { use: "Fatia de bolo", author: "Aneta Voborilova", url: "https://unsplash.com/photos/Rj1IWO8IozE" },
    { use: "Doces finos", author: "Ediglecio Lêla", url: "https://unsplash.com/photos/FBmw3Thd6Io" },
    { use: "Caixas para presente", author: "Ciocan Ciprian", url: "https://unsplash.com/photos/rINURuoyAlA" },
    { use: "Kits de comemoração", author: "Rehina Sultanova", url: "https://unsplash.com/photos/rIiGJGOPLIw" },
    { use: "Processo", author: "Mick Haupt", url: "https://unsplash.com/photos/eR3LPfuDzGk" },
    { use: "Encerramento", author: "Createasea", url: "https://unsplash.com/photos/QKCfljjWC6s" }
  ]
};
