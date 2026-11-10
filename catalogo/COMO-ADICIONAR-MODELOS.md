# Como adicionar um modelo ao catálogo

O catálogo se monta sozinho a cada push na `main`. O GitHub Actions encontra as pastas de modelos, fotografa os sites que mudaram e publica tudo no GitHub Pages.

Você **não** edita o `index.html` nem nenhum cadastro central.

---

## 0. Configuração inicial (uma única vez)

Antes da primeira publicação automática, no GitHub:

1. **Settings → Pages → Build and deployment → Source:** troque *Deploy from a branch* por **GitHub Actions**.
2. **Settings → Environments → github-pages:** em *Deployment branches and tags*, confira se a branch `main` está permitida.
3. Aba **Actions → Publicar catálogo → Run workflow** para a primeira publicação.

Enquanto o Source continuar em *Deploy from a branch*, o site é servido direto da branch (sem capturas automáticas), e o passo "Publicar" do workflow termina com ✗.

---

## Atalho: modelo criado em `Portifolio-landing-pages`

Os modelos nascem em `Portifolio-landing-pages` (pastas `05-estetica-pet`, `06-marmoraria`…). Para trazer um modelo para cá, ou atualizar um que já está aqui, rode no PowerShell, dentro da pasta `Portifolio-demos`:

```
powershell -ExecutionPolicy Bypass -File catalogo\build\copiar-modelo.ps1 -Origem 06-marmoraria -Destino Orla
```

- `-Origem` é o nome da pasta em `Portifolio-landing-pages`, e `-Destino` é o nome da pasta aqui, que vira o endereço do site.
- O script espelha a pasta, então arquivos apagados na origem também saem daqui. Ele leva junto o `modelo.json` da origem.
- Ele recusa nomes com acento, espaço, nome reservado ou grafia diferente de uma pasta existente (`orla` × `Orla`).
- Ele não faz commit nem push. Depois, siga do passo 4.

Por isso, **cada modelo novo já deve ter o seu `modelo.json` na pasta de origem** (passo 3). Assim o catálogo recebe textos e cores revisados junto com o site.

Nomes usados até agora:

| Origem (`Portifolio-landing-pages`) | Destino (catálogo) |
|---|---|
| `01-estetica-facial` | `Naria` |
| `02-confeitaria` | `Forma-Doce` |
| `03-nail-designer` | `Traco` |
| `04-estetica-automotiva` | `Vertice` |
| `05-estetica-pet` | `Bolha-Bento` |
| `06-marmoraria` | `Orla` |

Os modelos 01 a 04 têm o `modelo.json` só aqui no catálogo. Se forem atualizados pelo script, esse arquivo é mantido.

## 1. Copie a pasta para a raiz do repositório

```
Portifolio-demos/
├── Naria/
├── Forma-Doce/
├── Traco/
├── Vertice/
├── Nova-Marca/        ← a pasta nova entra aqui, ao lado das outras
└── catalogo/
```

- O **nome da pasta** vira o endereço do site: `…/Portifolio-demos/Nova-Marca/`.
  Maiúsculas e minúsculas contam, então escolha o nome definitivo antes do primeiro push.
- Evite espaços e acentos no nome da pasta. Use hífens: `Nova-Marca`, e não `Nova Marca`.
- Cada pasta precisa de um nome que continue único sem acentos e sem maiúsculas: `Nova-Marca` e `nova-marca` disputariam o mesmo identificador. Nesse caso, fica com ele a pasta que tem `modelo.json`, e o resumo da execução avisa.
- Não use nomes reservados para pastas técnicas: `catalogo`, `assets`, `css`, `js`, `scripts`, `img`, `fonts`, `docs`, `build`, `tools`, `node_modules`, entre outros.
  Pastas que começam com `.` ou `_` também são ignoradas, e isso é útil para rascunhos (`_rascunho/`).

## 2. Estrutura mínima

A única exigência é um **`index.html` diretamente dentro da pasta**:

```
Nova-Marca/
├── index.html      ← obrigatório
├── modelo.json     ← recomendado (passo 3)
└── … css/, js/, assets/ como o site precisar
```

Os links internos do site devem ser relativos (`css/styles.css`, não `/css/styles.css`), como já acontece nos modelos atuais.

## 3. Preencha o `modelo.json` (recomendado)

Crie `Nova-Marca/modelo.json` com os textos e as cores que aparecem no catálogo:

```json
{
  "marca": "NOVA MARCA",
  "segmento": "Estética facial",
  "descricao": "Uma ou duas frases sobre o negócio e a linguagem visual do modelo.",
  "caracteristicas": [
    "Recurso principal da página",
    "Outro recurso",
    "Mais um recurso"
  ],
  "cores": {
    "fundo": "#1F4D46",
    "texto": "#F4F1EA",
    "textoSecundario": "#BFD8D2"
  },
  "ordem": 50
}
```

| Campo | O que faz | Se ficar de fora |
|---|---|---|
| `marca` | Nome mostrado no catálogo e no índice | Usa o nome da pasta |
| `segmento` | Nicho. Vários modelos podem ter o mesmo | Mostra "Segmento não informado" |
| `descricao` | Parágrafo curto, até 600 caracteres | O parágrafo não aparece |
| `caracteristicas` | De 1 a 6 itens curtos | A lista não aparece |
| `cores.fundo` | Cor da faixa do modelo, normalmente a principal da marca | Faixa azul-escura neutra |
| `cores.texto` / `cores.textoSecundario` | Textos sobre a faixa. Precisam de contraste de pelo menos 4,5:1 com o fundo; abaixo disso, o catálogo usa as cores neutras e avisa no resumo | Tons claros neutros |
| `ordem` | Posição: menor aparece antes | Vai para o fim, em ordem alfabética |
| `publicar` | `false` esconde o modelo do catálogo, mas o site continua acessível pelo endereço | Aparece normalmente |

Os modelos atuais usam `ordem` 10, 20, 30, 40, 50 e 60. Use 70, 80… para os próximos, ou 15 para encaixar um modelo entre dois existentes.

Sem `modelo.json`, o modelo aparece mesmo assim, com o nome da pasta e rótulos neutros. Nenhuma informação comercial é inventada.

**Opcional, prévias feitas à mão:** para usar imagens próprias em vez da captura automática, informe os caminhos a partir da raiz do repositório:

```json
"imagens": {
  "desktop": "catalogo/previas/nova-marca-desktop-1600.webp",
  "desktopLeve": "catalogo/previas/nova-marca-desktop-800.webp",
  "celular": "catalogo/previas/nova-marca-mobile-390.webp"
}
```

## 4. Commit e Push pelo GitHub Desktop

1. Abra o GitHub Desktop. A pasta nova aparece em **Changes**.
2. Escreva um resumo, por exemplo *"Adiciona modelo Nova Marca"*, e clique em **Commit to main**.
3. Clique em **Push origin**.

## 5. Confira a publicação

1. No GitHub, abra o repositório e a aba **Actions**.
2. A execução **"Publicar catálogo"** começa sozinha e leva alguns minutos. A primeira é a mais demorada, porque fotografa todos os modelos.
3. **✓ verde:** o catálogo está no ar com o modelo novo. Atualize `https://felipefurtadodev.github.io/Portifolio-demos/` (Ctrl+F5 se a página antiga continuar aparecendo).
4. Clique na execução para ver o **resumo**: a lista de modelos encontrados, a situação de cada captura e os avisos sobre o `modelo.json`.

## 6. Se algo der errado

| O que você vê | Causa provável | O que fazer |
|---|---|---|
| O modelo não aparece no catálogo | Pasta sem `index.html` direto dentro dela, nome reservado ou nome começando com `.`/`_` | Confira em "Pastas ignoradas", no resumo da execução |
| Aparece com o nome da pasta e "Segmento não informado" | Sem `modelo.json`, ou com erro de digitação nele | Veja os avisos no resumo. Um erro de sintaxe JSON (vírgula, aspas) aparece com a posição exata |
| "Prévia em preparação" no lugar da captura | A captura falhou e não havia prévia anterior | No resumo, a tabela "Capturas" diz o motivo, por exemplo uma imagem ou fonte que não carregou. Corrija o site e faça novo push |
| Captura antiga depois de mudar o site | A captura nova falhou, então o catálogo manteve a última válida | Mesmo procedimento: o motivo está na tabela "Capturas" |
| Execução com ✗ vermelho | O passo "Gerar o catálogo" encontrou um erro grave (por exemplo, nenhum modelo) ou a publicação falhou | Abra o passo em vermelho e leia a mensagem. O site anterior continua no ar |
| ✗ em "Publicar" com aviso sobre Pages | O Pages não está configurado para GitHub Actions | Veja a seção 0, "Configuração inicial" |
| ✗ em "Publicar" citando *environment* ou *branch* | A branch `main` não está liberada no ambiente `github-pages` | Settings → Environments → github-pages → permita a `main` |
| Capturas demoradas ou todas refeitas | Primeira execução, ou o cache expirou (o GitHub apaga caches sem uso por 7 dias) | Normal: cada modelo leva alguns segundos (cerca de 3 s nos testes). A partir da próxima execução, só os modelos alterados são fotografados |

Para refazer a publicação sem mudar nada: aba **Actions** → **Publicar catálogo** → **Run workflow**.

## 7. Testar no computador antes do push (opcional)

Precisa do [Node.js](https://nodejs.org) 18 ou mais recente. No terminal, na pasta `Portifolio-demos`:

```bash
# Gerar o catálogo (rápido, sem instalar nada):
node catalogo/build/gerar-catalogo.mjs
# Depois abra o index.html com o Live Server.

# Gerar as capturas também (instala o Playwright uma única vez, cerca de 150 MB):
cd catalogo/build
npm install
npx playwright install chromium
cd ../..
node catalogo/build/capturar-previas.mjs                  # só os modelos sem prévia
node catalogo/build/capturar-previas.mjs --modelo Nova-Marca   # um modelo específico
node catalogo/build/capturar-previas.mjs --todas          # refaz todas
node catalogo/build/gerar-catalogo.mjs
```

- Testes locais alteram o `index.html` e `catalogo/previas/`. Fazer commit dessas mudanças é opcional: a publicação refaz tudo de qualquer forma.
- As prévias commitadas servem de reserva caso uma captura falhe no GitHub.
- `node_modules` não vai para o repositório: já está no `.gitignore`.
