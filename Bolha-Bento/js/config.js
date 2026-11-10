/* ==========================================================================
   BOLHA & BENTO — configuração do modelo
   --------------------------------------------------------------------------
   Tudo o que muda de um cliente para outro está aqui. Os textos longos dos
   cuidados e da galeria ficam no index.html, marcados com comentários
   "EDITAR".
   ========================================================================== */
window.BB_CONFIG = {
  brand: {
    name: 'Bolha & Bento',
    tagline: 'Banho gostoso. Pelo soltinho. Pet feliz.',
    greeting: 'Olá, Bolha & Bento!'
  },

  /* Modo demonstrativo: true mostra avisos e NUNCA envia mensagens.
     Para um cliente real: false + contact.whatsapp preenchido. */
  demo: {
    enabled: true
  },

  contact: {
    whatsapp: '',                       // só dígitos, com DDI e DDD. Ex.: 5511912345678
    whatsappDisplay: '(11) 90000-0000', // como o número aparece na página
    address: 'Rua das Acácias, 120',
    district: 'Jardim Modelo',
    city: 'São Paulo, SP',
    mapsUrl: '',                        // link do Google Maps; vazio = não mostra o botão
    instagram: ''                       // usuário sem @; vazio = não mostra
  },

  hours: [
    { days: 'Terça a sexta', time: '9h às 18h' },
    { days: 'Sábado', time: '9h às 14h' },
    { days: 'Domingo e segunda', time: 'Fechado' }
  ],

  form: {
    species: [
      { id: 'cao', label: 'Cão' },
      { id: 'gato', label: 'Gato' }
    ],
    services: [
      { id: 'banho', label: 'Banho' },
      { id: 'higienica', label: 'Banho + tosa higiênica' },
      { id: 'completa', label: 'Banho + tosa completa' }
    ],
    catNote: 'Gatos são atendidos em horário reservado, sem outros pets por perto. A tosa completa em gatos é combinada depois de uma avaliação.',
    catServiceNote: { completa: 'após avaliação' }, // aparece ao lado do cuidado quando o pet é gato
    closingLine: 'Podemos combinar os detalhes, o horário e o valor por aqui?'
  },

  /* Cuidados complementares: aparecem na seção de cuidados (combinados depois pelo WhatsApp) */
  extras: [
    { id: 'hidratacao', label: 'Hidratação do pelo' },
    { id: 'unhas', label: 'Corte de unhas' },
    { id: 'ouvidos', label: 'Limpeza externa dos ouvidos' },
    { id: 'dentes', label: 'Escovação dos dentes' },
    { id: 'nos', label: 'Desembolo de nós', note: 'conforme avaliação' }
  ],

  /* Fotos. useLocalImages: true usa assets/img/<nome>-<largura>.webp
     (gerados por tools/baixar-recursos.ps1). Se um arquivo faltar, a foto
     volta para a URL da Unsplash automaticamente. */
  useLocalImages: false,
  images: {
    hero:        { id: 'photo-1709771818873-57feeea88f41', slug: 's9KAJUt0NAM', author: 'Karsten Winegeart', user: '_karsten' },
    banho:       { id: 'photo-1597595735781-6a57fb8e3e3d', slug: 'xypTOFe_hqc', author: 'Anthony Duran', user: 'dogflirt' },
    tosa:        { id: 'photo-1719464454959-9cf304ef4774', slug: 'LpK2xddrElI', author: 'Buddy AN', user: 'stbuddyp' },
    banheira:    { id: 'photo-1647002380358-fc70ed2f04e0', slug: 'ldIghI2FIA0', author: 'Ayla Verschueren', user: 'moob' },
    turbante:    { id: 'photo-1611173622933-91942d394b04', slug: 'ZVdZw2p08y4', author: 'Hayffield L', user: 'hayffield' },
    toalha:      { id: 'photo-1581887936036-3f4f7f0b6679', slug: 'ikv10lHZUas', author: 'Jamie Street', user: 'jamie452' },
    gato:        { id: 'photo-1589443665283-fcd73c585b01', slug: 'Ql-IOqQCz9k', author: 'Marit van Wijngaarden', user: 'maritvanwijngaarden' },
    salao:       { id: 'photo-1528846104175-4fd300ee59da', slug: 'dHIRbh9En6I', author: 'Александр Гросс (Alexander Gross)', user: 'boney' },
    ferramentas: { id: 'photo-1559693555-d143b5b713ed', slug: 'Pb8eiWD69GE', author: 'mostafa meraji', user: 'mostafa_meraji' },
    pelo:        { id: 'photo-1588269845464-8993565cac3a', slug: 'WLGx0fKFSeI', author: 'Julio Bernal', user: 'jbernals' }
  }
};
