# TRAÇO Studio — Modelo 03 (nail, lash & brow)

Landing page demonstrativa de um estúdio fictício de unhas, cílios e sobrancelhas. HTML, CSS e JavaScript puros, sem dependências além do Google Fonts e das imagens da Unsplash.

## Como executar

- **Live Server (VS Code):** abra a pasta `Portifolio-landing-pages` e acesse `http://127.0.0.1:5500/03-nail-designer/index.html`.
- **GitHub Pages:** todos os caminhos são relativos. A pasta pode ser publicada como subpasta de um repositório.

## Estrutura

```
03-nail-designer/
├── index.html              página (textos de venda marcados com EDITÁVEL)
├── css/styles.css          estilos
├── css/fontes-locais.css   alternativa local ao Google Fonts (ainda sem o arquivo da fonte)
├── js/config.js            marca, demonstração, WhatsApp, serviços, looks, créditos
├── js/main.js              menu, régua, ficha de agendamento, barra fixa
├── tools/baixar-recursos.ps1  baixa fotos e fonte para uso local
├── DESIGN_NOTES.md         decisões de design, testes e pendências
└── README.md
```

## Personalizar para um cliente

1. **Contato e modo demonstração** (`js/config.js`):
   - `contact.whatsapp`: somente dígitos, com DDI 55 + DDD + número (ex.: `5511912345678`);
   - `demo.enabled: false`.
   O botão só abre o WhatsApp quando as duas condições valem. Caso contrário, a ficha mostra a mensagem pronta para copiar, e nada é enviado.
2. **Instagram:** `contact.instagram` (sem @). Vazio = o botão não aparece.
3. **Serviços:** edite as linhas em `index.html` (seção `#agendar`) e mantenha o mesmo `id` em `config.services`. `shape: true` faz a ficha perguntar o formato da unha.
4. **Lookbook:** cada look tem `data-look` no HTML e uma entrada em `config.looks`, que define os serviços marcados por "Quero esse visual".
5. **Textos, horários e região:** blocos `EDITÁVEL` do `index.html`.
6. **Fotos:** troque as imagens (atributo `data-photo` identifica cada uma) e atualize `config.photoCredits`. O HTML das imagens foi gerado com `srcset` de 480 a 1600 px.
7. **Indexação:** remova a linha `noindex` do `<head>` somente ao publicar o site real.

## Recursos locais (opcional, recomendado na entrega)

No PowerShell, dentro de `03-nail-designer`:

```
powershell -ExecutionPolicy Bypass -File tools\baixar-recursos.ps1
```

Depois:

- `useLocalImages: true` em `js/config.js`. Se faltar alguma foto, ela volta sozinha para a versão remota, e um aviso aparece no console.
- No `index.html`, troque o link do Google Fonts e os dois `preconnect` de fontes por `<link rel="stylesheet" href="css/fontes-locais.css">`.

As 29 URLs do script foram validadas no navegador (HTTP 200, WebP e woff2). O script em si não foi executado neste ambiente.
