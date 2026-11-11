#!/usr/bin/env node
// =====================================================================
// Capturas automáticas das demonstrações (computador e celular), em WebP.
//
//   node catalogo/build/capturar-previas.mjs [--raiz <pasta>] [--cache <pasta>]
//                                            [--todas] [--modelo <Pasta>]
//
// - Serve a pasta --raiz num servidor local e abre cada demonstração no
//   Chromium (Playwright): os arquivos reais, como estão no repositório.
// - Espera carregamento, fontes e imagens visíveis; congela animações.
// - Recusa capturas quebradas: página com erro, imagem visível que não
//   carregou, folha de estilo ou fonte que falhou, tela em branco.
// - Grava em <raiz>/catalogo/previas/<id>-desktop-1600.webp, -desktop-800.webp
//   e -mobile-390.webp.
//
// Com --cache (GitHub Actions): só recaptura o modelo cujos arquivos mudaram.
// Se a captura falhar (ou o navegador nem abrir), usa a última prévia válida:
// cache, ou a que já está em catalogo/previas/ (repositório ou recuperada do
// site publicado). Nunca grava imagem substituta. Sem nenhuma prévia, o modelo
// fica sem arquivos e gerar-catalogo.mjs --exigir-previas interrompe a publicação.
// Sem --cache (uso local): captura só os modelos que ainda não têm prévias,
// ou todos com --todas, ou um só com --modelo <Pasta>.
//
// Falha de um modelo nunca interrompe os demais.
// =====================================================================

import fs from "node:fs";
import path from "node:path";
import http from "node:http";
import crypto from "node:crypto";
import { fileURLToPath } from "node:url";
import { descobrirModelos, PREVIAS_DIR, ARQUIVOS_PREVIA, webpValido } from "./descobrir.mjs";

const RAIZ_REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

// Textos para os comandos do GitHub Actions (::warning) e para a tabela do resumo.
// Sem escape, um nome de pasta com ":" ou "," ou uma mensagem com "|" quebraria a saída.
const anotacao = (s) => String(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const anotacaoTitulo = (s) => anotacao(s).replace(/:/g, "%3A").replace(/,/g, "%2C");
const celula = (s) => String(s).replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");

// Mude este texto quando mudar o jeito de capturar: invalida o cache inteiro.
const VERSAO_CAPTURA = "v1|desktop 1440x900@1600|celular 390x844@2x|webp q75";

const TELAS = {
  desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1600 / 1440, isMobile: false, hasTouch: false },
  celular: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 2, isMobile: true, hasTouch: true },
};
const ARQUIVOS = ARQUIVOS_PREVIA;
const QUALIDADE_WEBP = 0.75;
const TENTATIVAS = 2;
const LIMITE_MODELO_MS = 120_000;

function argumento(nome, padrao) {
  const i = process.argv.indexOf(nome);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : padrao;
}
const temOpcao = (nome) => process.argv.includes(nome);

// ---------- Servidor estático local (só leitura, só dentro da raiz) ----------
const TIPOS = {
  ".html": "text/html; charset=utf-8", ".css": "text/css; charset=utf-8", ".js": "text/javascript; charset=utf-8",
  ".mjs": "text/javascript; charset=utf-8", ".json": "application/json; charset=utf-8", ".svg": "image/svg+xml",
  ".png": "image/png", ".jpg": "image/jpeg", ".jpeg": "image/jpeg", ".gif": "image/gif", ".webp": "image/webp",
  ".avif": "image/avif", ".ico": "image/x-icon", ".woff": "font/woff", ".woff2": "font/woff2", ".ttf": "font/ttf",
  ".otf": "font/otf", ".mp4": "video/mp4", ".webm": "video/webm", ".txt": "text/plain; charset=utf-8",
};

function iniciarServidor(raiz) {
  const servidor = http.createServer((req, res) => {
    try {
      const caminho = decodeURIComponent(new URL(req.url, "http://localhost").pathname);
      let arquivo = path.resolve(raiz, "." + caminho);
      if (arquivo !== raiz && !arquivo.startsWith(raiz + path.sep)) { res.writeHead(403).end(); return; }
      if (fs.existsSync(arquivo) && fs.statSync(arquivo).isDirectory()) {
        if (!caminho.endsWith("/")) { res.writeHead(301, { Location: caminho + "/" }).end(); return; }
        arquivo = path.join(arquivo, "index.html");
      }
      if (!fs.existsSync(arquivo)) { res.writeHead(404).end(); return; }
      res.writeHead(200, { "Content-Type": TIPOS[path.extname(arquivo).toLowerCase()] || "application/octet-stream" });
      fs.createReadStream(arquivo).pipe(res);
    } catch {
      res.writeHead(400).end();
    }
  });
  return new Promise((ok) => servidor.listen(0, "127.0.0.1", () => ok(servidor)));
}

// ---------- Impressão digital da pasta do modelo ----------
function hashDaPasta(pastaAbs) {
  const h = crypto.createHash("sha256").update(VERSAO_CAPTURA);
  const arquivos = [];
  (function andar(dir) {
    for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
      const abs = path.join(dir, e.name);
      if (e.isDirectory()) andar(abs);
      else if (e.isFile()) arquivos.push(abs);
    }
  })(pastaAbs);
  arquivos
    .map((abs) => [path.relative(pastaAbs, abs).split(path.sep).join("/"), abs])
    .filter(([rel]) => rel !== "modelo.json") // textos do catálogo não mudam a captura
    .sort(([a], [b]) => (a < b ? -1 : 1))
    .forEach(([rel, abs]) => h.update(rel + "\0").update(fs.readFileSync(abs)).update("\0"));
  return h.digest("hex");
}

// ---------- Captura de uma tela ----------
async function capturarTela(browser, endereco, tela) {
  const ctx = await browser.newContext({
    ...TELAS[tela], reducedMotion: "reduce", colorScheme: "light", locale: "pt-BR", serviceWorkers: "block",
  });
  const page = await ctx.newPage();
  const falhas = [];
  const registrar = (req, motivo) => {
    if (["stylesheet", "font"].includes(req.resourceType())) falhas.push(`${req.resourceType()} ${motivo}: ${req.url().slice(0, 120)}`);
  };
  page.on("requestfailed", (req) => registrar(req, "falhou"));
  page.on("response", (r) => { if (r.status() >= 400) registrar(r.request(), `HTTP ${r.status()}`); });

  try {
    const resposta = await page.goto(endereco, { waitUntil: "load", timeout: 45_000 });
    if (!resposta || !resposta.ok()) throw new Error(`a página respondeu HTTP ${resposta ? resposta.status() : "sem resposta"}`);
    await page.waitForLoadState("networkidle", { timeout: 15_000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);

    // Volta ao topo e espera as imagens visíveis na primeira tela.
    await page.evaluate(() => window.scrollTo(0, 0));
    const visiveis = () => [...document.images].filter((i) => {
      const r = i.getBoundingClientRect();
      return r.width > 1 && r.height > 1 && r.bottom > 0 && r.top < innerHeight && r.right > 0 && r.left < innerWidth
        && getComputedStyle(i).visibility !== "hidden";
    });
    await page.waitForFunction(`(${visiveis.toString()})().every((i) => i.complete)`, null, { timeout: 20_000 }).catch(() => {});
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(500);

    const estado = await page.evaluate(`(() => {
      const imgs = (${visiveis.toString()})();
      return {
        quebradas: imgs.filter((i) => !i.complete || i.naturalWidth === 0).map((i) => (i.currentSrc || i.src).slice(0, 120)),
        fontes: [...document.fonts].filter((f) => f.status === "error").map((f) => f.family),
      };
    })()`);
    if (estado.quebradas.length) throw new Error(`imagem visível não carregou: ${estado.quebradas.join(", ")}`);
    if (estado.fontes.length) throw new Error(`fonte não carregou: ${estado.fontes.join(", ")}`);
    if (falhas.length) throw new Error(falhas.join(" | "));

    return await page.screenshot({ type: "png", animations: "disabled", caret: "hide" });
  } finally {
    await ctx.close();
  }
}

// ---------- Conversão para WebP no próprio Chromium (sem dependências extras) ----------
async function paraWebp(paginaConversora, png, larguras) {
  const r = await paginaConversora.evaluate(async ({ b64, larguras, q }) => {
    const blob = await (await fetch("data:image/png;base64," + b64)).blob();
    const bmp = await createImageBitmap(blob);
    // Detecção de tela em branco: desvio-padrão da luminância numa miniatura.
    const mini = document.createElement("canvas");
    mini.width = 64; mini.height = Math.max(1, Math.round(64 * bmp.height / bmp.width));
    const m = mini.getContext("2d");
    m.drawImage(bmp, 0, 0, mini.width, mini.height);
    const px = m.getImageData(0, 0, mini.width, mini.height).data;
    let soma = 0, soma2 = 0, n = 0;
    for (let i = 0; i < px.length; i += 4) {
      const l = 0.2126 * px[i] + 0.7152 * px[i + 1] + 0.0722 * px[i + 2];
      soma += l; soma2 += l * l; n++;
    }
    const desvio = Math.sqrt(Math.max(0, soma2 / n - (soma / n) ** 2));

    const saidas = [];
    for (const w of larguras) {
      const c = document.createElement("canvas");
      c.width = w; c.height = Math.round(bmp.height * w / bmp.width);
      const ctx = c.getContext("2d");
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = "high";
      ctx.drawImage(bmp, 0, 0, c.width, c.height);
      saidas.push({ dados: c.toDataURL("image/webp", q), largura: c.width, altura: c.height });
    }
    return { desvio, origem: [bmp.width, bmp.height], saidas };
  }, { b64: png.toString("base64"), larguras, q: QUALIDADE_WEBP });

  if (r.desvio < 3) throw new Error("a captura saiu praticamente lisa (tela em branco)");
  return r.saidas.map((s) => {
    if (!s.dados.startsWith("data:image/webp")) throw new Error("o Chromium não gerou WebP");
    return { buffer: Buffer.from(s.dados.split(",")[1], "base64"), largura: s.largura, altura: s.altura };
  });
}

async function comTentativas(fn) {
  let ultimo;
  for (let t = 1; t <= TENTATIVAS; t++) {
    try { return await fn(); } catch (e) { ultimo = e; }
  }
  throw ultimo;
}

async function capturarModelo(browser, conversora, base, modelo) {
  const endereco = `${base}/${encodeURIComponent(modelo.pasta)}/`;
  const desktopPng = await comTentativas(() => capturarTela(browser, endereco, "desktop"));
  const celularPng = await comTentativas(() => capturarTela(browser, endereco, "celular"));
  const [d1600, d800] = await paraWebp(conversora, desktopPng, [1600, 800]);
  const [cel] = await paraWebp(conversora, celularPng, [780]);
  return { desktop: d1600, desktopLeve: d800, celular: cel };
}

function limite(promessa, ms, nome) {
  let t;
  return Promise.race([
    promessa,
    new Promise((_, nao) => { t = setTimeout(() => nao(new Error(`tempo esgotado (${ms / 1000}s) em ${nome}`)), ms); }),
  ]).finally(() => clearTimeout(t));
}

// ---------- Execução ----------
async function principal() {
  const raiz = path.resolve(argumento("--raiz", RAIZ_REPO));
  const cacheDir = argumento("--cache", null) && path.resolve(argumento("--cache"));
  const soModelo = argumento("--modelo", null);
  const todas = temOpcao("--todas");
  const destinoDir = path.join(raiz, PREVIAS_DIR);
  fs.mkdirSync(destinoDir, { recursive: true });

  const { modelos } = descobrirModelos(raiz);
  const destino = (m, k) => path.join(destinoDir, `${m.slug}-${ARQUIVOS[k]}`);
  const arquivoValido = (f) => { try { return webpValido(fs.readFileSync(f)); } catch { return false; } };
  const temPreviasNoDestino = (m) => Object.keys(ARQUIVOS).every((k) => arquivoValido(destino(m, k)));

  // O navegador é aberto só quando algum modelo precisa de captura nova, e uma falha
  // aqui (Playwright ausente, Chromium não instalado) NÃO impede o aproveitamento do
  // cache e das prévias já existentes: cada modelo cai no plano de recuperação abaixo.
  let navegador = null, conversora = null, erroNavegador = null;
  async function abrirNavegador() {
    if (navegador || erroNavegador) return;
    try {
      let playwright;
      try { playwright = await import("playwright"); }
      catch { throw new Error("Playwright não está instalado (cd catalogo/build && npm install && npx playwright install chromium)"); }
      navegador = await playwright.chromium.launch(process.env.CHROME_PATH ? { executablePath: process.env.CHROME_PATH } : {});
      conversora = await navegador.newPage();
    } catch (e) {
      erroNavegador = new Error(`navegador indisponível: ${String(e.message).split("\n")[0]}`);
    }
  }
  const servidor = await iniciarServidor(raiz);
  const base = `http://127.0.0.1:${servidor.address().port}`;
  const relatorio = [];
  let semPrevia = 0;

  try {
    for (const m of modelos) {
      if (soModelo && m.pasta !== soModelo) continue;
      if (m.meta.imagens) { relatorio.push([m.pasta, "imagens definidas no modelo.json (sem captura)"]); continue; }

      const hash = cacheDir ? hashDaPasta(path.join(raiz, m.pasta)) : null;
      const cacheModelo = cacheDir ? path.join(cacheDir, m.slug) : null;
      const cacheArquivo = (k) => path.join(cacheModelo, ARQUIVOS[k]);
      const cacheCompleto = () => cacheModelo && Object.keys(ARQUIVOS).every((k) => arquivoValido(cacheArquivo(k)));
      const copiarDoCache = () => Object.keys(ARQUIVOS).forEach((k) => fs.copyFileSync(cacheArquivo(k), destino(m, k)));

      if (cacheDir) {
        const hashAnterior = fs.existsSync(path.join(cacheModelo, "hash.txt")) ? fs.readFileSync(path.join(cacheModelo, "hash.txt"), "utf8").trim() : "";
        if (hashAnterior === hash && cacheCompleto()) {
          copiarDoCache();
          relatorio.push([m.pasta, "sem mudanças: prévia reaproveitada do cache"]);
          continue;
        }
      } else if (!todas && !soModelo && temPreviasNoDestino(m)) {
        relatorio.push([m.pasta, "já tem prévias (use --todas para refazer)"]);
        continue;
      }

      const inicio = Date.now();
      try {
        await abrirNavegador();
        if (erroNavegador) throw erroNavegador;
        const imgs = await limite(capturarModelo(navegador, conversora, base, m), LIMITE_MODELO_MS, m.pasta);
        for (const [k, img] of Object.entries(imgs)) fs.writeFileSync(destino(m, k), img.buffer);
        if (cacheDir) {
          fs.mkdirSync(cacheModelo, { recursive: true });
          for (const [k, img] of Object.entries(imgs)) fs.writeFileSync(cacheArquivo(k), img.buffer);
          fs.writeFileSync(path.join(cacheModelo, "hash.txt"), hash);
        }
        const kb = Object.values(imgs).map((i) => `${i.largura}×${i.altura} ${Math.round(i.buffer.length / 1024)} KB`).join(", ");
        relatorio.push([m.pasta, `capturada em ${((Date.now() - inicio) / 1000).toFixed(1)}s (${kb})`]);
      } catch (erro) {
        // Plano de recuperação: nada é apagado e nenhuma imagem substituta é criada.
        let plano, grave = false;
        if (cacheCompleto()) { copiarDoCache(); plano = "mantida a última prévia válida do cache (pode estar desatualizada)"; }
        else if (temPreviasNoDestino(m)) plano = "mantida a prévia que já está em catalogo/previas/ (repositório ou site publicado; pode estar desatualizada)";
        else { plano = "SEM PRÉVIA VÁLIDA: a publicação será interrompida pela verificação, a menos que seja liberada de propósito"; grave = true; semPrevia++; }
        relatorio.push([m.pasta, `FALHOU: ${erro.message} → ${plano}`]);
        if (process.env.GITHUB_ACTIONS) console.log(`::${grave ? "error" : "warning"} title=${anotacaoTitulo(`Captura de ${m.pasta}`)}::${anotacao(`${erro.message} → ${plano}`)}`);
      }
    }

    // Remove do cache modelos que não existem mais.
    if (cacheDir && fs.existsSync(cacheDir) && !soModelo) {
      const ativos = new Set(modelos.map((m) => m.slug));
      for (const d of fs.readdirSync(cacheDir)) if (!ativos.has(d)) fs.rmSync(path.join(cacheDir, d), { recursive: true, force: true });
    }
  } finally {
    servidor.close();
    if (navegador) await navegador.close().catch(() => {});
  }

  console.log("Prévias:");
  for (const [pasta, situacao] of relatorio) console.log(`  • ${pasta}/ → ${situacao}`);
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
      ["### Capturas", "", "| Pasta | Situação |", "|---|---|", ...relatorio.map(([p, s]) => `| \`${celula(p)}/\` | ${celula(s)} |`), "", ""].join("\n"));
  }
}

principal().catch((erro) => {
  console.error(`ERRO nas capturas: ${erro.message}`);
  process.exit(1);
});
