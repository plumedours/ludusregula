/**
 * Validation basique des contributions :
 * - public/data/games.json existe et JSON valide
 * - tableau d'objets { id, name, summary, pdf, thumb, tags }
 * - id unique, kebab-case
 * - chemins /rules/*.pdf et /thumbs/*.(webp|jpg|png)
 * - fichiers réellement présents dans public/, limites de taille
 * - tags en minuscules
 * - tri alphabétique par name (warning si différent)
 */
const fs = require("fs");
const path = require("path");

const ROOT = process.cwd();
const PUBLIC_DIR = path.join(ROOT, "public");
const DATA_FILE = path.join(PUBLIC_DIR, "data", "games.json");

const MAX_PDF_MB = 20;
const MAX_IMG_KB = 200;
const IMG_EXT = new Set([".webp", ".jpg", ".jpeg", ".png"]);

function fail(msg) {
  console.error("❌", msg);
  process.exit(1);
}
function warn(msg) {
  console.warn("⚠️", msg);
}

function isKebab(str) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(str);
}
function fileSizeBytes(p) {
  return fs.statSync(p).size;
}

function bytesToMB(b) {
  return (b / (1024 * 1024)).toFixed(2);
}
function bytesToKB(b) {
  return (b / 1024).toFixed(1);
}

function ensureFile(rel) {
  const abs = path.join(PUBLIC_DIR, rel.replace(/^\//, ""));
  if (!fs.existsSync(abs))
    fail(`Fichier manquant: public/${rel.replace(/^\//, "")}`);
  return abs;
}

if (!fs.existsSync(DATA_FILE)) {
  fail(`Fichier introuvable: ${path.relative(ROOT, DATA_FILE)}`);
}

let raw = "";
try {
  raw = fs.readFileSync(DATA_FILE, "utf8");
} catch (e) {
  fail(`Lecture impossible de ${DATA_FILE}: ${e.message}`);
}

let data;
try {
  data = JSON.parse(raw);
} catch (e) {
  fail(`JSON invalide dans ${path.relative(ROOT, DATA_FILE)}: ${e.message}`);
}

if (!Array.isArray(data)) fail("games.json doit contenir un tableau.");

const ids = new Set();

data.forEach((g, idx) => {
  const where = `#${idx + 1} (${g?.id ?? "sans id"})`;

  // Champs obligatoires
  if (!g || typeof g !== "object") fail(`${where} n'est pas un objet valide.`);
  if (!g.id || !isKebab(g.id))
    fail(`${where} id manquant ou non kebab-case (ex: les-colons-de-catane).`);
  if (ids.has(g.id)) fail(`${where} id en double: ${g.id}`);
  ids.add(g.id);

  if (!g.name || typeof g.name !== "string") fail(`${where} name manquant.`);
  if (!g.summary || typeof g.summary !== "string")
    fail(`${where} summary manquant.`);

  // PDF
  if (
    !g.pdf ||
    typeof g.pdf !== "string" ||
    !g.pdf.startsWith("/rules/") ||
    !g.pdf.toLowerCase().endsWith(".pdf")
  ) {
    fail(`${where} pdf doit être un chemin /rules/<id>.pdf`);
  }
  const pdfAbs = ensureFile(g.pdf);
  const pdfBytes = fileSizeBytes(pdfAbs);
  if (pdfBytes > MAX_PDF_MB * 1024 * 1024) {
    fail(
      `${where} PDF trop lourd (${bytesToMB(
        pdfBytes
      )} MB) > ${MAX_PDF_MB} MB : ${g.pdf}`
    );
  }

  // Thumbs (optionnelles)
  if (g.thumb && typeof g.thumb === "object") {
    for (const k of ["webp", "jpg", "png"]) {
      if (!g.thumb[k]) continue;
      const rel = g.thumb[k];
      if (typeof rel !== "string" || !rel.startsWith("/thumbs/")) {
        fail(`${where} thumb.${k} doit commencer par /thumbs/`);
      }
      const abs = ensureFile(rel);
      const ext = path.extname(abs).toLowerCase();
      if (!IMG_EXT.has(ext))
        fail(`${where} thumb.${k} extension invalide: ${ext}`);
      const size = fileSizeBytes(abs);
      if (size > MAX_IMG_KB * 1024) {
        warn(
          `${where} vignette ${k} lourde (${bytesToKB(
            size
          )} KB) > ${MAX_IMG_KB} KB : ${rel}`
        );
      }
    }
  }

  // Tags (optionnels)
  if (g.tags) {
    if (!Array.isArray(g.tags)) fail(`${where} tags doit être un tableau.`);
    g.tags.forEach((t) => {
      if (typeof t !== "string") fail(`${where} tag non texte: ${String(t)}`);
      if (t !== t.toLowerCase())
        warn(`${where} tag "${t}" devrait être en minuscules.`);
    });
  }
});

// Vérifier tri alphabétique par "name" (non bloquant, pour garder l’ordre lisible)
const sorted = [...data].sort((a, b) => a.name.localeCompare(b.name, "fr"));
const sameOrder =
  JSON.stringify(sorted.map((x) => x.id)) ===
  JSON.stringify(data.map((x) => x.id));
if (!sameOrder) {
  warn("Le tableau n'est pas trié alphabétiquement par 'name'. (recommandé)");
}

console.log(`✅ Validation OK — ${data.length} jeux vérifiés.`);
process.exit(0);
