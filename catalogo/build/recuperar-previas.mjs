#!/usr/bin/env node
// =====================================================================
// Recupera prévias que faltam a partir do site JÁ PUBLICADO no GitHub Pages.
//
//   node catalogo/build/recuperar-previas.mjs --raiz <pasta> [--url <base do site>]
//
// Por que existe: o cache do GitHub Actions é temporário (expira, pode ser
// apagado, pode não ser restaurado). O site publicado é uma fonte durável: a
// última publicação boa já contém as prévias de todos os modelos.
//
// Regras:
// - Só baixa o que está ausente ou inválido em <raiz>/catalogo/previas/.
//   Nunca sobrescreve um arquivo válido (nem o do repositório, nem o do cache).
// - Só aceita WebP válido; página de erro ou arquivo truncado é descartado.
// - É um recurso de recuperação: falha de rede não interrompe nada. Quem
//   decide se a publicação pode seguir sem prévia é gerar-catalogo.mjs.
//
// Ordem de preferência no workflow: captura nova > cache por conteúdo >
// arquivo do repositório > site publicado (esta ferramenta).
// A captura e o cache entram depois e substituem o que foi recuperado aqui
// quando o modelo mudou, então uma prévia recuperada nunca "congela" um modelo.
// =====================================================================

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { descobrirModelos, ARQUIVOS_PREVIA, PREVIAS_DIR, webpValido } from "./descobrir.mjs";

const RAIZ_REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");
const anotacao = (s) => String(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const celula = (s) => String(s).replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");

function argumento(nome, padrao) {
  const i = process.argv.indexOf(nome);
  return i > -1 && process.argv[i + 1] && !process.argv[i + 1].startsWith("--") ? process.argv[i + 1] : padrao;
}

// https://<dono>.github.io/<repositório>/ a partir de GITHUB_REPOSITORY (dono/repositório).
function urlPadrao() {
  const repo = process.env.GITHUB_REPOSITORY;
  if (!repo || !repo.includes("/")) return null;
  const [dono, nome] = repo.split("/");
  return `https://${dono.toLowerCase()}.github.io/${nome}/`;
}

async function baixar(endereco) {
  let ultimo;
  for (let t = 1; t <= 2; t++) {
    try {
      const r = await fetch(endereco, { signal: AbortSignal.timeout(20_000), redirect: "follow" });
      if (!r.ok) throw new Error(`HTTP ${r.status}`);
      const tipo = r.headers.get("content-type") || "";
      const buf = Buffer.from(await r.arrayBuffer());
      if (!webpValido(buf)) throw new Error(`conteúdo não é um WebP válido (${tipo || "sem tipo"}, ${buf.length} bytes)`);
      return buf;
    } catch (e) { ultimo = e; }
  }
  throw ultimo;
}

async function principal() {
  const raiz = path.resolve(argumento("--raiz", RAIZ_REPO));
  let base = argumento("--url", urlPadrao());
  if (!base) { console.log("Recuperação do site publicado: sem endereço (defina --url ou GITHUB_REPOSITORY). Nada a fazer."); return; }
  if (!base.endsWith("/")) base += "/";

  const { modelos } = descobrirModelos(raiz);
  const relatorio = [];
  for (const m of modelos) {
    if (m.meta.imagens) continue; // imagens próprias: não são geradas
    const recuperadas = [], falhas = [];
    for (const sufixo of Object.values(ARQUIVOS_PREVIA)) {
      const rel = `${PREVIAS_DIR}/${m.slug}-${sufixo}`;
      const destino = path.join(raiz, rel);
      if (fs.existsSync(destino) && webpValido(fs.readFileSync(destino))) continue;
      try {
        const buf = await baixar(new URL(rel, base).href);
        fs.mkdirSync(path.dirname(destino), { recursive: true });
        fs.writeFileSync(destino, buf);
        recuperadas.push(sufixo);
      } catch (e) {
        falhas.push(`${sufixo}: ${e.message}`);
      }
    }
    if (recuperadas.length || falhas.length) {
      relatorio.push([m.pasta, [recuperadas.length ? `recuperado do site publicado: ${recuperadas.join(", ")}` : "", falhas.length ? `não recuperado (${falhas.join("; ")})` : ""].filter(Boolean).join(" | ")]);
    }
  }

  if (!relatorio.length) { console.log("Recuperação do site publicado: nenhuma prévia faltando."); return; }
  console.log("Recuperação do site publicado:");
  for (const [p, s] of relatorio) console.log(`  • ${p}/ → ${s}`);
  for (const [p, s] of relatorio) {
    if (process.env.GITHUB_ACTIONS && s.includes("não recuperado")) console.log(`::notice title=${anotacao(`Prévia de ${p}`).replace(/:/g, "%3A").replace(/,/g, "%2C")}::${anotacao(s)}`);
  }
  if (process.env.GITHUB_STEP_SUMMARY) {
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY,
      ["### Recuperação a partir do site publicado", "", "| Pasta | Situação |", "|---|---|", ...relatorio.map(([p, s]) => `| \`${celula(p)}/\` | ${celula(s)} |`), "", ""].join("\n"));
  }
}

principal().catch((erro) => {
  // Recuperação é um auxílio: nunca derruba o workflow por conta própria.
  console.error(`Aviso: recuperação do site publicado não concluída: ${erro.message}`);
});
