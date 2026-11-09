// =====================================================================
// Descoberta dos modelos e leitura do modelo.json
// Usado por gerar-catalogo.mjs e capturar-previas.mjs. Sem dependências.
//
// Uma pasta da raiz do repositório é um modelo quando:
//   1. não começa com "." nem "_";
//   2. não é uma pasta técnica (lista PASTAS_TECNICAS abaixo);
//   3. contém um arquivo index.html;
//   4. não tem "publicar": false no seu modelo.json.
// Nenhum nome de modelo é fixo no código.
// =====================================================================

import fs from "node:fs";
import path from "node:path";

// Pastas da raiz que nunca são demonstrações (comparação sem maiúsculas).
export const PASTAS_TECNICAS = new Set([
  "catalogo", "assets", "css", "js", "scripts", "node_modules",
  "img", "imagens", "images", "fonts", "fontes", "docs", "vendor",
  "dist", "build", "tools", "ferramentas", "src", "public", "static",
  "templates", "test", "tests", "tmp", "temp",
]);

export const PREVIAS_DIR = "catalogo/previas";

// Cores neutras para modelos sem cores no modelo.json (as do próprio catálogo).
export const CORES_PADRAO = { fundo: "#151A26", texto: "#F3F4F6", textoSecundario: "#C3C8D2" };
export const SEGMENTO_PADRAO = "Segmento não informado";

const CAMPOS = new Set(["marca", "segmento", "descricao", "caracteristicas", "cores", "ordem", "publicar", "imagens"]);
const COR = /^#[0-9a-fA-F]{6}$/;
const CONTROLE = /[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/;

// "Forma-Doce" -> "forma-doce"; "Estética Nova" -> "estetica-nova"
export function slugDe(nomePasta) {
  return nomePasta
    .normalize("NFD").replace(/[̀-ͯ]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "modelo";
}

function luminancia(hex) {
  const c = [1, 3, 5].map((i) => parseInt(hex.slice(i, i + 2), 16) / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4));
  return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2];
}
export function contraste(a, b) {
  const [x, y] = [luminancia(a), luminancia(b)].sort((m, n) => n - m);
  return (x + 0.05) / (y + 0.05);
}

function textoLimpo(valor, max) {
  if (typeof valor !== "string") return null;
  const t = valor.replace(/\s+/g, " ").trim();
  if (!t || t.length > max || CONTROLE.test(valor)) return null;
  return t;
}

// Caminho relativo seguro, dentro do repositório (sem "..", sem barra inicial, sem protocolo).
function caminhoSeguro(valor) {
  if (typeof valor !== "string") return null;
  const p = valor.trim().replace(/\\/g, "/").replace(/^\.\//, "");
  if (!p || p.startsWith("/") || /^[a-z]+:/i.test(p) || p.split("/").includes("..")) return null;
  return p;
}

// Valida o modelo.json. Campo inválido é descartado com aviso; os demais seguem valendo.
export function validarMetadados(bruto, avisos) {
  const m = {};
  if (bruto === null || typeof bruto !== "object" || Array.isArray(bruto)) {
    avisos.push("modelo.json precisa ser um objeto { ... }; usando valores padrão");
    return m;
  }
  for (const chave of Object.keys(bruto)) {
    if (!CAMPOS.has(chave) && !chave.startsWith("$")) avisos.push(`campo desconhecido ignorado: "${chave}"`);
  }

  if ("marca" in bruto) {
    m.marca = textoLimpo(bruto.marca, 60);
    if (!m.marca) { delete m.marca; avisos.push("marca: texto de até 60 caracteres"); }
  }
  if ("segmento" in bruto) {
    m.segmento = textoLimpo(bruto.segmento, 80);
    if (!m.segmento) { delete m.segmento; avisos.push("segmento: texto de até 80 caracteres"); }
  }
  if ("descricao" in bruto) {
    m.descricao = textoLimpo(bruto.descricao, 600);
    if (!m.descricao) { delete m.descricao; avisos.push("descricao: texto de até 600 caracteres"); }
  }
  if ("caracteristicas" in bruto) {
    const lista = Array.isArray(bruto.caracteristicas) ? bruto.caracteristicas.map((c) => textoLimpo(c, 160)) : [];
    if (lista.length && lista.length <= 6 && lista.every(Boolean)) m.caracteristicas = lista;
    else avisos.push("caracteristicas: lista de 1 a 6 textos de até 160 caracteres");
  }
  if ("cores" in bruto) {
    const c = bruto.cores || {};
    if (["fundo", "texto", "textoSecundario"].every((k) => COR.test(c[k] || ""))) {
      m.cores = { fundo: c.fundo.toUpperCase(), texto: c.texto.toUpperCase(), textoSecundario: c.textoSecundario.toUpperCase() };
      for (const k of ["texto", "textoSecundario"]) {
        const r = contraste(m.cores.fundo, m.cores[k]);
        if (r < 4.5) avisos.push(`cores.${k} tem contraste ${r.toFixed(2)}:1 com o fundo (mínimo recomendado 4,5:1)`);
      }
    } else {
      avisos.push('cores: informe fundo, texto e textoSecundario no formato "#RRGGBB"; usando cores neutras');
    }
  }
  if ("ordem" in bruto) {
    if (typeof bruto.ordem === "number" && Number.isFinite(bruto.ordem)) m.ordem = bruto.ordem;
    else avisos.push("ordem: precisa ser um número");
  }
  if ("publicar" in bruto) {
    if (typeof bruto.publicar === "boolean") m.publicar = bruto.publicar;
    else avisos.push("publicar: use true ou false");
  }
  if ("imagens" in bruto) {
    const i = bruto.imagens || {};
    const img = {};
    for (const k of ["desktop", "desktopLeve", "celular"]) {
      if (k in i) {
        const p = caminhoSeguro(i[k]);
        if (p) img[k] = p; else avisos.push(`imagens.${k}: caminho relativo inválido`);
      }
    }
    if (img.desktop || img.celular) m.imagens = img;
  }
  return m;
}

function ehModelo(raiz, nome) {
  if (nome.startsWith(".") || nome.startsWith("_")) return false;
  if (PASTAS_TECNICAS.has(nome.toLowerCase())) return false;
  // Nome exato "index.html": o GitHub Pages diferencia maiúsculas de minúsculas.
  return fs.readdirSync(path.join(raiz, nome)).includes("index.html");
}

// Retorna { modelos, ignoradas }. Cada modelo:
// { pasta, slug, demo, meta, avisos, temMetadados }
export function descobrirModelos(raiz) {
  const entradas = fs.readdirSync(raiz, { withFileTypes: true })
    .filter((e) => e.isDirectory())
    .map((e) => e.name)
    .sort((a, b) => a.localeCompare(b, "pt-BR"));

  const modelos = [];
  const ignoradas = [];
  const slugsUsados = new Map();

  for (const pasta of entradas) {
    if (!ehModelo(raiz, pasta)) { ignoradas.push(pasta); continue; }

    const avisos = [];
    let meta = {};
    let temMetadados = false;
    const arquivoMeta = path.join(raiz, pasta, "modelo.json");
    if (fs.existsSync(arquivoMeta)) {
      temMetadados = true;
      try {
        const texto = fs.readFileSync(arquivoMeta, "utf8").replace(/^﻿/, "");
        meta = validarMetadados(JSON.parse(texto), avisos);
      } catch (erro) {
        avisos.push(`modelo.json com erro de sintaxe (${erro.message}); usando valores padrão`);
      }
    } else {
      avisos.push("sem modelo.json: usando o nome da pasta e rótulos neutros");
    }

    if (meta.publicar === false) { ignoradas.push(`${pasta} (publicar: false)`); continue; }

    let slug = slugDe(pasta);
    if (slugsUsados.has(slug)) {
      const n = slugsUsados.get(slug) + 1;
      slugsUsados.set(slug, n);
      avisos.push(`identificador "${slug}" já usado por outra pasta; usando "${slug}-${n}"`);
      slug = `${slug}-${n}`;
    } else {
      slugsUsados.set(slug, 1);
    }

    modelos.push({ pasta, slug, demo: `./${pasta}/`, meta, avisos, temMetadados });
  }

  modelos.sort((a, b) => {
    const oa = a.meta.ordem ?? Infinity, ob = b.meta.ordem ?? Infinity;
    if (oa !== ob) return oa - ob;
    return (a.meta.marca || a.pasta).localeCompare(b.meta.marca || b.pasta, "pt-BR");
  });
  return { modelos, ignoradas };
}

// Caminhos das prévias de um modelo: as indicadas no modelo.json ou as geradas
// automaticamente em catalogo/previas/<slug>-*.webp. Só devolve arquivos que existem.
export function previasDe(raiz, modelo) {
  const existe = (p) => p && fs.existsSync(path.join(raiz, p)) ? p : null;
  const manual = modelo.meta.imagens;
  if (manual) {
    return { desktop: existe(manual.desktop), desktopLeve: existe(manual.desktopLeve), celular: existe(manual.celular), manual: true };
  }
  return {
    desktop: existe(`${PREVIAS_DIR}/${modelo.slug}-desktop-1600.webp`),
    desktopLeve: existe(`${PREVIAS_DIR}/${modelo.slug}-desktop-800.webp`),
    celular: existe(`${PREVIAS_DIR}/${modelo.slug}-mobile-390.webp`),
    manual: false,
  };
}
