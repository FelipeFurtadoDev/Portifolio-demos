/* ==========================================================================
   LASTRO · Bancadas sob medida — configuração central
   O que muda de um cliente para outro fica aqui: marca, modo demonstração,
   contato, fotos, créditos e os campos de cada peça do configurador.

   Os nomes e as orientações das quatro peças (cartões de escolha) ficam no
   index.html, para continuarem legíveis sem JavaScript. Os campos que
   aparecem depois da escolha são definidos abaixo, em `pecas`.
   ========================================================================== */

window.LASTRO_CONFIG = {
  brand: {
    name: "LASTRO"
  },

  /* Modo demonstração
     - enabled: true  -> mostra a faixa de aviso; o botão do WhatsApp só
                         explica que o contato não está configurado.
     - enabled: false -> o botão abre o WhatsApp com a mensagem pronta, desde
                         que contact.whatsapp seja válido. */
  demo: {
    enabled: true,
    notice: "Demonstração: LASTRO é uma marca fictícia. Fotos ilustrativas, de banco de imagens.",
    contactNotice: "Contato real ainda não configurado: nada foi enviado e nenhum link externo foi aberto. Copie a mensagem para usá-la depois."
  },

  contact: {
    /* Somente dígitos: 55 + DDD + número. Ex.: "5511912345678".
       Vazio enquanto o site for demonstrativo. */
    whatsapp: "",
    buttonLabel: "Abrir no WhatsApp"
  },

  /* Fotos locais
     false -> fotos servidas pela CDN da Unsplash (padrão).
     true  -> usa assets/img/<nome>-<largura>.webp, gerados por
              tools/baixar-recursos.ps1. Se um arquivo faltar, aquela foto
              volta sozinha para a CDN e o console avisa. */
  useLocalImages: false,
  localWidths: { capa: [640, 1200, 1800], plano: [640, 1000, 1400], detalhe: [480, 800, 1200] },

  /* Créditos exibidos no rodapé. Licença Unsplash (não é Unsplash+). */
  credits: [
    { role: "Capa", author: "Irena Oze", url: "https://unsplash.com/photos/Tf5QDU9xxMU" },
    { role: "Plano aberto", author: "Clay Banks", url: "https://unsplash.com/photos/ZTGO2CpU3CA" },
    { role: "Detalhe do recorte", author: "Craig Lovelidge", url: "https://unsplash.com/photos/2v01Re71D6I" }
  ],

  /* Campos de cada peça, na ordem em que aparecem.
     tipo "medida"   -> número em centímetros (aceita vírgula decimal)
     tipo "recortes" -> caixas de marcar (cuba, cooktop)
     tipo "escolha"  -> lista de opções
     `ajuda` liga o botão de ajuda contextual ("profundidade" ou "recorte").
     `cota` liga o campo ao desenho (data-cota no SVG); `cotaPrefixo` antecede o valor na cota. */
  pecas: {
    reta: {
      campos: [
        { id: "comprimento", tipo: "medida", rotulo: "Comprimento", cota: "comprimento" },
        { id: "profundidade", tipo: "medida", rotulo: "Profundidade", cota: "profundidade", ajuda: "profundidade" },
        { id: "recortes", tipo: "recortes", rotulo: "Recortes já definidos", opcoes: ["Cuba", "Cooktop"], ajuda: "recorte" }
      ]
    },
    l: {
      campos: [
        { id: "ladoA", tipo: "medida", rotulo: "Comprimento do lado A", dica: "junto à parede do fundo", cota: "ladoA", cotaPrefixo: "lado A" },
        { id: "ladoB", tipo: "medida", rotulo: "Comprimento do lado B", dica: "junto à parede lateral", cota: "ladoB", cotaPrefixo: "lado B" },
        { id: "cuba", tipo: "escolha", rotulo: "Posição da cuba", ajuda: "recorte",
          opcoes: ["No lado A", "No lado B", "No encontro dos lados"], vazio: "Ainda não defini" }
      ]
    },
    ilha: {
      campos: [
        { id: "comprimento", tipo: "medida", rotulo: "Comprimento", cota: "comprimento" },
        { id: "largura", tipo: "medida", rotulo: "Largura", cota: "largura" },
        { id: "recortes", tipo: "recortes", rotulo: "Recortes já definidos", opcoes: ["Cuba", "Cooktop"], ajuda: "recorte" }
      ]
    },
    lavatorio: {
      campos: [
        { id: "largura", tipo: "medida", rotulo: "Largura", cota: "largura" },
        { id: "profundidade", tipo: "medida", rotulo: "Profundidade", cota: "profundidade", ajuda: "profundidade" },
        { id: "cuba", tipo: "escolha", rotulo: "Tipo de cuba", ajuda: "recorte",
          opcoes: ["De apoio", "Embutida", "Esculpida"], vazio: "Ainda não escolhi" }
      ]
    }
  },

  /* Textos das ajudas contextuais. */
  ajudas: {
    profundidade: {
      botao: "O que é profundidade?",
      texto: "É a distância da borda da frente até o fundo da bancada, onde ela encontra a parede. Uma medida aproximada já ajuda."
    },
    recorte: {
      botao: "O que é um recorte?",
      texto: "É a abertura prevista na pedra para peças como cuba ou cooktop. Se o modelo ainda está em escolha, ele pode ser informado depois."
    }
  },

  /* Faixa de valores aceita nas medidas (cm). Fora dela, o campo avisa. */
  medidas: { min: 10, max: 1500 }
};
