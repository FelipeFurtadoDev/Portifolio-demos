#!/usr/bin/env node
// =====================================================================
// Gera os blocos dos modelos e o índice do catálogo no index.html.
//
//   node catalogo/build/gerar-catalogo.mjs [--raiz <pasta>] [--exigir-previas [--permitir-sem-previa]]
//
// Lê as pastas de modelos (descobrir.mjs), monta o HTML de cada modelo e
// substitui o conteúdo entre os marcadores do index.html:
//   <!-- catalogo:indice --> ... <!-- /catalogo:indice -->
//   <!-- catalogo:modelos --> ... <!-- /catalogo:modelos -->
// Todo o resto do index.html (abertura, rodapé, estilos) fica intocado.
//
// --exigir-previas (usado pelo GitHub Actions): se algum modelo não tiver as três
// prévias válidas (WebP de computador, computador leve e celular), NADA é gerado,
// o comando termina com erro e a publicação é interrompida: o site que já está no ar
// continua como estava. --permitir-sem-previa libera isso de propósito (aviso, não erro).
//
// Sem dependências: só Node.js 18 ou mais recente.
// =====================================================================

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { descobrirModelos, previasDe, previasFaltantes, CORES_PADRAO, SEGMENTO_PADRAO } from "./descobrir.mjs";

const RAIZ_REPO = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..", "..");

// Textos para os comandos do GitHub Actions (::warning) e para a tabela do resumo.
// Sem escape, um nome de pasta com ":" ou "," ou uma mensagem com "|" quebraria a saída.
const anotacao = (s) => String(s).replace(/%/g, "%25").replace(/\r/g, "%0D").replace(/\n/g, "%0A");
const anotacaoTitulo = (s) => anotacao(s).replace(/:/g, "%3A").replace(/,/g, "%2C");
const celula = (s) => String(s).replace(/\|/g, "\\|").replace(/\s*\n\s*/g, " ");

function argumento(nome, padrao) {
  const i = process.argv.indexOf(nome);
  return i > -1 && process.argv[i + 1] ? process.argv[i + 1] : padrao;
}

// ---------- Escape: nenhum texto do modelo.json entra cru no HTML ----------
const esc = (t) => String(t)
  .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
  .replace(/"/g, "&quot;").replace(/'/g, "&#39;");

// Codifica cada trecho do caminho (espaços, acentos), mantendo as barras.
const url = (p) => p.split("/").map((s) => (s === "." ? s : encodeURIComponent(s))).join("/");

// ---------- Marcação (idêntica à aprovada do catálogo) ----------
function htmlModelo(m, posicao, previas) {
  const meta = m.meta;
  const marca = meta.marca || m.pasta;
  const segmento = meta.segmento || SEGMENTO_PADRAO;
  const cores = meta.cores || CORES_PADRAO;
  const numero = String(posicao + 1).padStart(2, "0");
  const idNome = `${m.slug}-nome`;
  const demo = esc(url(m.demo));

  const descricao = meta.descricao
    ? `\n          <p class="modelo__descricao">${esc(meta.descricao)}</p>` : "";
  const recursos = meta.caracteristicas
    ? `\n          <ul class="modelo__recursos">${meta.caracteristicas.map((c) => `<li>${esc(c)}</li>`).join("")}</ul>` : "";

  let telaDesktop;
  if (previas.desktop) {
    const leve = previas.desktopLeve || previas.desktop;
    const srcset = previas.desktopLeve
      ? `${esc(url(previas.desktopLeve))} 800w, ${esc(url(previas.desktop))} 1600w`
      : `${esc(url(previas.desktop))} 1600w`;
    // A primeira prévia aparece logo na abertura: carrega com prioridade.
    const carregamento = posicao === 0 ? `fetchpriority="high"` : `loading="lazy"`;
    telaDesktop = `<img src="${esc(url(leve))}" srcset="${srcset}" sizes="(min-width: 960px) 60vw, 92vw"
                 width="1600" height="1000" alt="" ${carregamento} decoding="async">`;
  } else {
    telaDesktop = `<span class="tela__vazia">Prévia em preparação</span>`;
  }

  const telaCelular = previas.celular ? `
          <figure class="tela tela--mobile">
            <img src="${esc(url(previas.celular))}" width="390" height="844" alt="" loading="lazy" decoding="async">
          </figure>` : "";

  const classePrevia = previas.celular ? "modelo__previa" : "modelo__previa modelo__previa--sem-celular";

  return `
    <article class="modelo" id="modelo-${m.slug}" aria-labelledby="${idNome}"
             style="--palco: ${cores.fundo}; --tinta: ${cores.texto}; --tinta-suave: ${cores.textoSecundario};">
      <div class="modelo__grade">
        <div class="modelo__info">
          <p class="modelo__numero">Modelo ${numero}</p>
          <h3 class="modelo__nome" id="${idNome}">${esc(marca)}</h3>
          <p class="modelo__segmento">${esc(segmento)}</p>${descricao}${recursos}
          <a class="modelo__acao" href="${demo}">Ver demonstração<span class="visualmente-oculto"> do modelo ${esc(marca)}</span></a>
        </div>

        <a class="${classePrevia}" href="${demo}" tabindex="-1" aria-hidden="true">
          <figure class="tela tela--desktop">
            <span class="tela__barra">${esc(m.pasta)}/</span>
            ${telaDesktop}
          </figure>${telaCelular}
        </a>
      </div>
    </article>
`;
}

function htmlIndice(m) {
  const marca = m.meta.marca || m.pasta;
  const segmento = m.meta.segmento || SEGMENTO_PADRAO;
  return `          <li><a href="#modelo-${m.slug}"><span class="indice__nome">${esc(marca)}</span><span class="indice__segmento">${esc(segmento)}</span></a></li>\n`;
}

function substituirEntre(html, nome, conteudo) {
  const inicio = `<!-- catalogo:${nome} -->`;
  const fim = `<!-- /catalogo:${nome} -->`;
  const a = html.indexOf(inicio);
  const b = html.indexOf(fim);
  if (a < 0 || b < 0 || b < a) throw new Error(`marcadores ${inicio} ... ${fim} não encontrados no index.html`);
  return html.slice(0, a + inicio.length) + "\n" + conteudo + html.slice(b);
}

// ---------- Execução ----------
function principal() {
  const raiz = path.resolve(argumento("--raiz", RAIZ_REPO));
  const arquivoIndex = path.join(raiz, "index.html");
  const { modelos, ignoradas } = descobrirModelos(raiz);

  // Proteção: nunca publicar um catálogo vazio por engano.
  if (!modelos.length) {
    throw new Error("nenhum modelo encontrado. Uma pasta de modelo precisa ter um index.html na raiz dela.");
  }

  // Verificação das prévias ANTES de qualquer escrita: nunca publica catálogo incompleto em silêncio.
  if (process.argv.includes("--exigir-previas")) {
    const pendencias = modelos.map((m) => [m, previasFaltantes(raiz, m)]).filter(([, f]) => f.length);
    if (pendencias.length) {
      const liberado = process.argv.includes("--permitir-sem-previa");
      const nivel = liberado ? "warning" : "error";
      for (const [m, f] of pendencias) {
        const msg = `prévia(s) ausente(s) ou inválida(s): ${f.join(", ")}`;
        console.log(`${process.env.GITHUB_ACTIONS ? `::${nivel} title=${anotacaoTitulo(`Prévia de ${m.pasta}`)}::${anotacao(msg)}` : `  ${m.pasta}/ → ${msg}`}`);
      }
      if (process.env.GITHUB_STEP_SUMMARY) {
        fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, [
          liberado ? "### ⚠️ Publicação liberada SEM todas as prévias" : "### ⛔ Publicação interrompida: faltam prévias", "",
          "| Pasta | Prévias ausentes ou inválidas |", "|---|---|",
          ...pendencias.map(([m, f]) => `| \`${celula(m.pasta)}/\` | ${f.map(celula).join("<br>")} |`), "",
          liberado ? "" : "O site que já está no ar **não foi alterado**. Corrija a causa (veja a etapa de capturas) e rode de novo, ou use *Run workflow* com “Publicar mesmo sem todas as prévias”.", "",
        ].join("\n"));
      }
      if (!liberado) {
        throw new Error(`${pendencias.length} modelo(s) sem prévia válida (${pendencias.map(([m]) => m.pasta).join(", ")}). Nada foi gerado nem publicado.`);
      }
    }
  }

  const linhas = [];
  let blocos = "";
  let indice = "";
  modelos.forEach((m, i) => {
    const previas = previasDe(raiz, m);
    if (previas.manual && !previas.desktop) m.avisos.push("imagens.desktop do modelo.json não encontrada");
    blocos += htmlModelo(m, i, previas);
    indice += htmlIndice(m);
    const situacao = previas.desktop && previas.celular ? "computador e celular"
      : previas.desktop ? "só computador" : previas.celular ? "só celular (computador em preparação)" : "em preparação";
    linhas.push({ pasta: m.pasta, marca: m.meta.marca || `${m.pasta} (provisório)`, previas: situacao, avisos: m.avisos });
  });

  let html = fs.readFileSync(arquivoIndex, "utf8");
  html = substituirEntre(html, "indice", indice + "          ");
  html = substituirEntre(html, "modelos", blocos + "    ");
  fs.writeFileSync(arquivoIndex, html);

  // Relatório no terminal e, no GitHub Actions, no resumo da execução.
  console.log(`Catálogo gerado: ${modelos.length} modelo(s).`);
  for (const l of linhas) {
    console.log(`  • ${l.pasta}/ → ${l.marca} | prévias: ${l.previas}`);
    for (const a of l.avisos) console.log(`      aviso: ${a}`);
  }
  if (ignoradas.length) console.log(`Pastas ignoradas: ${ignoradas.join(", ")}`);

  if (process.env.GITHUB_STEP_SUMMARY) {
    const md = [
      `### Catálogo: ${modelos.length} modelo(s)`, "",
      "| Pasta | Nome | Prévias | Avisos |", "|---|---|---|---|",
      ...linhas.map((l) => `| \`${celula(l.pasta)}/\` | ${celula(l.marca)} | ${l.previas} | ${l.avisos.map(celula).join("<br>") || "—"} |`),
      "", ignoradas.length ? `Pastas ignoradas: ${ignoradas.map((p) => `\`${celula(p)}\``).join(", ")}` : "", "",
    ].join("\n");
    fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, md);
  }
  for (const l of linhas) {
    for (const a of l.avisos) if (process.env.GITHUB_ACTIONS) console.log(`::warning title=${anotacaoTitulo(l.pasta)}::${anotacao(a)}`);
  }
}

try {
  principal();
} catch (erro) {
  console.error(`ERRO ao gerar o catálogo: ${erro.message}`);
  process.exit(1);
}
