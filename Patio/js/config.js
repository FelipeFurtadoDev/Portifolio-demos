/* ==========================================================================
   PÁTIO · Estética automotiva móvel — configuração central
   Tudo o que muda de um cliente para outro fica aqui: modo demonstração,
   WhatsApp e mensagens, bairros atendidos, condições do local e créditos das
   fotos. Os textos editoriais (serviços, legendas, perguntas e respostas)
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
    /* Mensagem geral: abertura, cabeçalho, bairros e contato. */
    greeting: "Olá, PÁTIO! Gostaria de consultar o atendimento na minha garagem.",
    /* Mensagem de bairro fora da lista. */
    neighborhoodMessage: "Olá, PÁTIO! Meu bairro não está na lista. Vocês atendem na minha região?",
    /* Mensagem por serviço. {servico} recebe o nome do serviço. */
    serviceMessage: "Olá, PÁTIO! Quero combinar {servico} no local onde o carro está. Como funciona o atendimento?"
  },

  /* Nome de cada serviço dentro da mensagem (chave = data-wa do index.html). */
  services: {
    lavagem:      "a lavagem detalhada",
    higienizacao: "a higienização interna",
    protecao:     "a proteção de pintura"
  },

  /* Cobertura e condições do local.
     demo: true mostra o selo "Dados demonstrativos" na página. Troque por
     false quando os bairros e as exigências forem os do cliente.
     Cada região vira um item da lista expansível. */
  coverage: {
    demo: true,
    note: "Combinamos o dia e o horário na conversa. Se o seu bairro não aparece, chame no WhatsApp.",
    regions: [
      { name: "Região Norte",   areas: ["Jardim das Acácias", "Vila Primavera", "Parque Imperial", "Santa Luzia", "Alto da Colina"] },
      { name: "Região Sul",     areas: ["Residencial Aurora", "Jardim Oriente", "Vila Horizonte", "Chácara Boa Esperança", "Bosque dos Ipês", "Recanto Verde"] },
      { name: "Região Central", areas: ["Centro", "Vila Operária", "Jardim Europa Nova", "Bairro das Palmeiras"] },
      { name: "Região Leste",   areas: ["Parque Industrial Leste", "Vila Esperança", "Jardim Santa Marta", "Residencial dos Lagos"] }
    ],
    conditions: [
      { title: "Espaço ao redor do carro", text: "Espaço para abrir as portas e circular em volta do veículo, de preferência coberto ou na sombra." },
      { title: "Acesso", text: "Entrada liberada para levar os equipamentos até o carro: garagem, pátio ou vaga de condomínio com autorização." },
      { title: "Água e energia", text: "Ponto de água e tomada por perto, quando o serviço precisar. Se não houver, combinamos antes da visita." }
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
    patio:    [480, 720, 1000, 1400]
  },

  /* Créditos exibidos no rodapé. Todas as fotos: Licença Unsplash. */
  credits: [
    { role: "Abertura",             author: "Brad Starkey",       id: "eP8h7YVhFHk" },
    { role: "Lavagem detalhada",    author: "Willian Cittadin",   id: "DtrI63-Z46I" },
    { role: "Higienização interna", author: "Towfiqu barbhuiya",  id: "5m5418Ng6t8" },
    { role: "Proteção de pintura",  author: "Mohamed Gado",       id: "jZdOBQvDOXM" },
    { role: "Interior, gesto",       author: "Muhammad Saad",      id: "_vmBjTG5L1g" },
    { role: "Pintura, gesto",        author: "Tyler",              id: "3WR9p-pk2Fg" },
    { role: "Limpeza de rodas",     author: "Adrian Dascal",      id: "Ce_gQ7Z0eAc" },
    { role: "Raios da roda",        author: "Frankie Lopez",      id: "os_LwBZHi6E" },
    { role: "Textura do banco",     author: "Obi",                id: "iUkQ06FNOrU" },
    { role: "Reflexo na pintura",   author: "Sean Foster",        id: "0WwgdD5cfnQ" },
    { role: "Garagem e pátio",      author: "Jonas Jaeken",       id: "1TmI9BTLmiU" }
  ]
};
