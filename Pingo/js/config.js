/* ==========================================================================
   PINGO · Banho & Tosa — configuração central
   Tudo o que muda de um cliente para outro fica aqui: modo demonstração,
   WhatsApp e mensagens, endereço e horários, e créditos das fotos.

   O index.html guarda uma cópia do endereço, dos horários e da mensagem geral
   (blocos marcados com EDITAR) para a página continuar legível sem
   JavaScript. Ao personalizar, altere aqui e confira esses blocos no HTML.
   ========================================================================== */

window.PINGO_CONFIG = {
  brand: {
    name: "PINGO"
  },

  /* Modo demonstração
     - enabled: true  -> mostra o aviso no topo e NUNCA abre o WhatsApp; os
                         botões abrem uma janela com a mensagem de exemplo e
                         a opção de copiá-la.
     - enabled: false -> os botões abrem o WhatsApp com a mensagem pronta,
                         desde que contact.whatsapp seja um número válido. */
  demo: {
    enabled: true,
    notice: "PINGO é uma marca fictícia. Endereço, horários e fotos são ilustrativos, e o WhatsApp não está configurado.",
    copyLabel: "Copiar mensagem de exemplo"
  },

  contact: {
    /* Somente dígitos: DDI 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    /* Mensagem geral: cabeçalho, capa e contato. */
    greeting: "Olá, PINGO! Gostaria de consultar os horários de banho e tosa para meu cão.",
    /* Mensagem de cada serviço do menu. {servico} recebe o nome abaixo. */
    serviceMessage: "Olá, PINGO! Gostaria de consultar os horários de {servico} para meu cão.",
    /* Mensagem da ficha "Antes de trazer seu cão". Entre a abertura e o
       fechamento entram, uma por linha, as respostas escolhidas
       (Porte, Pelagem e Primeira visita). */
    fichaMessage: {
      intro: "Olá, PINGO! Gostaria de consultar os serviços e horários para meu cão.",
      closing: "Podem me orientar sobre o serviço mais adequado e a disponibilidade?"
    }
  },

  /* Nome de cada serviço dentro da mensagem (chave = data-wa do index.html). */
  services: {
    banho:     "banho",
    higienica: "banho com tosa higiênica",
    completa:  "banho com tosa completa"
  },

  /* Endereço e horários. demo: true mostra o selo "Dados demonstrativos".
     Troque pelos dados do cliente e mude para false. */
  studio: {
    demo: true,
    addressLines: [
      "Rua dos Bichos, 87",
      "Bairro Jardim Exemplo, Cidade Exemplo",
      "CEP 00000-000"
    ],
    reference: "Ao lado da padaria da esquina. Há bicicletário na calçada.",
    hours: [
      { days: "Segunda a sexta", time: "8h às 18h" },
      { days: "Sábado",          time: "8h às 14h" },
      { days: "Domingo",         time: "Fechado" }
    ],
    note: "Atendimento com hora marcada. A confirmação do horário é feita pelo salão, pelo WhatsApp."
  },

  /* Imagens locais
     false -> fotos servidas pela CDN da Unsplash (padrão).
     true  -> usa assets/img/<nome>-<largura>.webp, gerados por
              tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
              volta sozinha para a CDN. */
  useLocalImages: false,

  /* Larguras geradas por foto (chave = data-img do index.html). */
  imageFiles: {
    capa:     [600, 900, 1200, 1600],
    escova:   [500, 800, 1100],
    banho:    [600, 900, 1200],
    patas:    [600, 900, 1200],
    tosa:     [600, 900, 1200],
    mesa:     [700, 1000, 1400],
    banho2:   [500, 800, 1000],
    toalha:   [500, 800, 1000]
  },

  /* Créditos exibidos no rodapé. Todas as fotos: Licença Unsplash. */
  credits: [
    { role: "Secagem (capa)",       author: "Neakasa",            id: "ndyLOhEEFuQ" },
    { role: "Escovação (capa)",     author: "Neakasa",            id: "s1cbq_XroX0" },
    { role: "Banho",                author: "Ayla Verschueren",   id: "yE5hlzDapEo" },
    { role: "Tosa higiênica",       author: "Ludek Pytloun",      id: "JtbE42YVp0s" },
    { role: "Tosa completa",        author: "Buddy AN",           id: "LpK2xddrElI" },
    { role: "Mesa de acabamento",   author: "zutail happytail",   id: "7NhFIMS9QH0" },
    { role: "Espaço de banho",      author: "Eliza Ari",          id: "1W7bJqkvdSc" },
    { role: "Área de secagem",      author: "Sandy Andrade",      id: "SpAdugxTZVQ" }
  ]
};
