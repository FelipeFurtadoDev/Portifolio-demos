# Catálogo de modelos

A página inicial do repositório (`index.html`) é montada a partir de um cadastro único: **`catalogo/modelos.js`**.
Para incluir, alterar ou reordenar um modelo, edite só esse arquivo. Os blocos dos modelos e o índice da abertura são gerados sozinhos.

## Arquivos

```
index.html               estrutura da página e moldes (templates) de um modelo e de um item do índice
catalogo/
├── modelos.js           CADASTRO: o único arquivo a editar no dia a dia
├── catalogo.js          monta a página a partir do cadastro (não precisa ser editado)
├── catalogo.css         estilos do catálogo
├── previas/             capturas de tela dos modelos
└── README.md
```

## Como cadastrar um novo modelo

1. **Publique o site** em uma pasta na raiz do repositório, por exemplo `./Studio-Lume/`.
   O nome da pasta diferencia maiúsculas de minúsculas no GitHub Pages: `./Studio-Lume/` e `./studio-lume/` são endereços diferentes.

2. **Gere as três capturas** da página inicial e salve em `catalogo/previas/`, usando o `id` do modelo no nome:

   | Arquivo | Tela capturada | Tamanho final |
   |---|---|---|
   | `<id>-desktop-1600.webp` | computador, 1440 × 900 | 1600 × 1000 px |
   | `<id>-desktop-800.webp` | a mesma captura, reduzida | 800 × 500 px |
   | `<id>-mobile-390.webp` | celular, 390 × 844 | 390 × 844 px |

   Mantenha as proporções (16:10 no computador, 390:844 no celular); a moldura do catálogo depende delas.

3. **Acrescente o modelo** ao final da lista em `catalogo/modelos.js`, depois do último `}` e antes do `];`.
   Não esqueça a vírgula entre um modelo e outro.

4. **Abra o `index.html`** no Live Server e confira o novo bloco e o item do índice.

5. **Opcional, recomendado:** inclua o modelo na lista de reserva do `index.html` (`<ol id="indice-lista">`).
   Essa lista só aparece quando o JavaScript não carrega e leva direto às demonstrações.
   Sem essa linha, o modelo novo só fica de fora nesse modo de reserva; o catálogo normal continua completo.

## Exemplo

Um quarto modelo, do mesmo nicho da NÁRIA:

```js
  {
    id: "studio-lume",
    ordem: 15,
    marca: "STUDIO LUME",
    nicho: "Estética facial",
    descricao:
      "Clínica de estética com foco em tratamentos de pele. Visual claro e técnico, " +
      "com fotografia de produto e tabela de protocolos.",
    caracteristicas: [
      "Tabela de protocolos com duração e indicação",
      "Agendamento com escolha de profissional",
      "Perguntas frequentes sobre cada tratamento"
    ],
    demo: "./Studio-Lume/",
    cores: { palco: "#1F4D46", tinta: "#F4F1EA", tintaSuave: "#BFD8D2" },
    imagens: {
      desktop: "catalogo/previas/studio-lume-desktop-1600.webp",
      desktopLeve: "catalogo/previas/studio-lume-desktop-800.webp",
      celular: "catalogo/previas/studio-lume-mobile-390.webp"
    }
  }
```

Com `ordem: 15`, ele aparece entre a NÁRIA (10) e a FORMA DOCE (20).
Os modelos atuais usam ordens de 10 em 10 justamente para deixar espaço para inserções.
Com ordens iguais, vale a ordem alfabética da marca.

O número exibido ("Modelo 01", "Modelo 02"…) acompanha a posição na página e se ajusta sozinho.

## Campos

| Campo | Obrigatório | O que é |
|---|---|---|
| `id` | sim | Identificador único: letras minúsculas, números e hífens (`studio-lume`). Vira o endereço `#modelo-studio-lume`. |
| `ordem` | sim | Número que define a posição. Menor aparece antes. |
| `marca` | sim | Nome da marca, como deve aparecer. |
| `nicho` | sim | Segmento do negócio. Vários modelos podem ter o mesmo nicho. |
| `descricao` | sim | Um parágrafo curto, de 2 a 3 linhas. |
| `caracteristicas` | sim | Lista de 2 a 4 recursos da página. |
| `demo` | sim | Caminho relativo da pasta, com `./` no início e `/` no fim. |
| `cores.palco` | sim | Fundo da faixa do modelo: normalmente a cor principal da marca. |
| `cores.tinta` | sim | Texto e botão sobre a faixa. |
| `cores.tintaSuave` | sim | Textos secundários (número e nicho). |
| `imagens.desktop` | sim | Captura de computador, 1600 px. |
| `imagens.desktopLeve` | sim | A mesma captura, 800 px (usada em telas menores). |
| `imagens.celular` | sim | Captura de celular, 390 px. |

**Contraste das cores:** `tinta` e `tintaSuave` precisam de contraste de pelo menos 4,5:1 com `palco`.
Confira em um verificador de contraste antes de publicar.

## Se algo der errado

- **Um modelo não aparece:** abra o console do navegador (F12). O catálogo ignora modelos com dados incompletos e explica o motivo, como `Modelo 4 ignorado: nicho ausente.`. Os demais continuam na página.
- **Nenhum modelo aparece e surge o aviso "Não foi possível carregar as prévias":** quase sempre é um erro de digitação em `modelos.js`, como uma vírgula ou chave faltando. O console aponta a linha. Enquanto isso, a lista de reserva mantém os links para as demonstrações.
- **A captura não aparece:** confira o nome do arquivo em `previas/`, incluindo maiúsculas e minúsculas.

O cadastro é um arquivo `.js`, e não `.json`, para funcionar também ao abrir o `index.html` direto do computador, sem servidor.
