/* ==========================================================================
   CADÊNCIA · Estética facial — configuração central
   Tudo o que muda de um cliente para outro fica aqui: marca, modo
   demonstração, contato, nomes dos cuidados e créditos das fotos.
   Os textos de cada cuidado (descrição, sessão, o que inclui, duração e
   valores) ficam no index.html, dentro de cada <article class="cuidado">.
   A comparação lê esses mesmos textos, então há uma única fonte para eles.
   ========================================================================== */

window.CADENCIA_CONFIG = {
  brand: {
    name: "CADÊNCIA"
  },

  /* Modo demonstração
     - enabled: true  -> mostra o aviso no topo e NUNCA abre o WhatsApp;
                         o visitante pode copiar a mensagem pronta.
     - enabled: false -> "Consultar disponibilidade" abre o WhatsApp com a
                         mensagem, desde que contact.whatsapp seja válido. */
  demo: {
    enabled: true,
    notice: "Demonstração: CADÊNCIA é uma marca fictícia. As fotografias são ilustrativas, de banco de imagens, e ainda não há contato configurado.",
    sendNotice: "Demonstração: ainda não há contato configurado, então nada foi enviado. Use “Copiar mensagem” e cole no canal de contato do estúdio real."
  },

  contact: {
    /* Somente dígitos: DDI 55 + DDD + número. Ex.: "5511912345678".
       Deixe vazio enquanto o site for demonstrativo. */
    whatsapp: ""
  },

  /* Imagens locais
     false -> fotos servidas pela CDN da Unsplash (padrão).
     true  -> usa assets/img/<nome>-<largura>.webp, gerados por
              tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
              volta sozinha para a CDN. */
  useLocalImages: false,

  /* Cuidados. O id precisa ser igual ao data-care do index.html.
     - title: nome exibido
     - label: como entra na frase "Tenho interesse ..." da mensagem */
  cares: [
    { id: "limpeza",    title: "Limpeza de pele",   label: "na limpeza de pele" },
    { id: "hidratacao", title: "Hidratação facial", label: "na hidratação facial" },
    { id: "massagem",   title: "Massagem facial",   label: "na massagem facial" }
  ],

  /* Linhas da comparação, na ordem exibida. key = data-attr do index.html. */
  compareRows: [
    { key: "foco",    label: "Foco da sessão" },
    { key: "sessao",  label: "Como é a sessão" },
    { key: "inclui",  label: "O que está incluído" },
    { key: "duracao", label: "Duração prevista" },
    { key: "valores", label: "Valores" }
  ],

  /* Créditos exibidos no rodapé. Todas as fotos: Licença Unsplash.
     "user" é o nome de usuário na Unsplash. */
  credits: [
    { role: "Abertura",     user: "ionelaaaaa",            id: "16mHHrY3PUk" },
    { role: "Limpeza",      user: "kimick",                id: "J6Hg_YH2tFk" },
    { role: "Hidratação",   user: "enginakyurt",           id: "g-m8EDc4X6Q" },
    { role: "Massagem",     user: "rosaliegdy",            id: "c-cC9DnjpqA" },
    { role: "Conversa",     user: "alexandermassph",       id: "toteQQX33lk" },
    { role: "Atendimento",  user: "ernesto_sams",          id: "91dmB8SHiWc" },
    { role: "Orientações",  user: "crystalweed",           id: "w1an547rkxo" },
    { role: "Retrato",      user: "jonathanborba",         id: "cDmQ48iNbm8" },
    { role: "Espaço",       user: "mayurroxanphotography", id: "JnsuyfJrxQw" },
    { role: "Materiais",    user: "contentpixie",          id: "TxBQ7yLj6JU" }
  ]
};
