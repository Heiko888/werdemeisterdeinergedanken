/**
 * Videoskripte als gebündeltes Markdown.
 *
 * Jedes Video-PDF wird zusätzlich als EINE zusammenhängende Markdown-Datei
 * ausgegeben – inhaltsgleich zum PDF, aber lesbar und editierbar in einer Datei.
 * Die Quell-Dateien und ihre Reihenfolge sind identisch zu den PDF-Generatoren
 * (tools/pdf/langvideo-drehbuch.mjs, tools/pdf/intro-video-drehbuch.mjs),
 * damit Markdown und PDF nie auseinanderlaufen.
 *
 *   node tools/pdf/videoskripte-markdown.mjs [ausgabe-verzeichnis]
 *
 * Standard-Ausgabe: docs/skripte/videoskripte/
 *
 * Hinweis: Das Willkommensvideo (docs/skripte/willkommen/dashboard-willkommen.md)
 * liegt bereits als eigenständige, vollständige Markdown-Quelle vor und wird hier
 * nur in die Übersicht (README) verlinkt, nicht neu erzeugt.
 */
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join, relative } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const SK = join(ROOT, "docs", "skripte");
const OUT_DIR = process.argv[2] || join(SK, "videoskripte");

/** Alle .md eines Ordners (sortiert), optional eine ausschließen. */
function files(dir, exclude) {
  return readdirSync(join(SK, dir))
    .filter((f) => f.endsWith(".md") && f !== exclude)
    .sort()
    .map((f) => join(SK, dir, f));
}

const SV_STICH = "mentale-selbstverteidigung-drehbuecher.md";
const SV_KOMPL = "mentale-selbstverteidigung-komplett.md";

// Quellen 1:1 zu den PDF-Generatoren.
const BUNDLES = [
  {
    // → WMDG-Video-Drehbuch-Intro.pdf (tools/pdf/intro-video-drehbuch.mjs)
    file: "landing-intro-drehbuch.md",
    title: "Landing-Video-Drehbuch · Wort für Wort",
    subtitle: "Was, wenn es nicht an dir liegt? · Intro-Video + Teaser-Reel",
    pdf: "WMDG-Video-Drehbuch-Intro.pdf",
    sections: [
      {
        label: "Intro-Video & Teaser-Reel",
        files: [
          join(SK, "landing", "intro-nicht-deine-schuld.md"),
          join(SK, "landing", "reel-nicht-deine-schuld.md"),
        ],
      },
    ],
  },
  {
    // → WMDG-Video-Drehbuch-Ablesen.pdf (tools/pdf/langvideo-drehbuch.mjs, komplett)
    file: "langvideo-ablesen.md",
    title: "Langvideo-Drehbuch · Wort für Wort",
    subtitle: "Zum Ablesen (Teleprompter) · Mitgliederbereich",
    pdf: "WMDG-Video-Drehbuch-Ablesen.pdf",
    sections: [
      { label: "Die 7 Stufen", files: files("stufen-komplett") },
      { label: "Praxis", files: files("praxis") },
      { label: "Vertiefungen", files: files("vertiefungen-komplett", SV_KOMPL) },
      { label: "Mentale Selbstverteidigung", files: [join(SK, "vertiefungen-komplett", SV_KOMPL)] },
    ],
  },
  {
    // → WMDG-Video-Drehbuch-Stichpunkt.pdf (tools/pdf/langvideo-drehbuch.mjs, stichpunkt)
    file: "langvideo-stichpunkt.md",
    title: "Langvideo-Drehbuch · Stichpunkt",
    subtitle: "Zum freien Sprechen · Mitgliederbereich",
    pdf: "WMDG-Video-Drehbuch-Stichpunkt.pdf",
    note: "Praxis-Meditationen gibt es nur als Wort-für-Wort-Fassung (siehe „Langvideo · Wort für Wort“) – sie werden ohnehin ruhig vorgelesen.",
    sections: [
      { label: "Die 7 Stufen", files: files("stufen") },
      { label: "Vertiefungen", files: files("vertiefungen", SV_STICH) },
      { label: "Mentale Selbstverteidigung", files: [join(SK, "vertiefungen", SV_STICH)] },
    ],
  },
  {
    // → WMDG-Reel-Drehbuch-Alle-Serien.pdf (tools/pdf/reel-drehbuch.mjs)
    // Die Einzel-Serien liegen bereits je als eine Markdown-Datei in
    // docs/skripte/reels/ vor (= die Einzel-PDFs); hier zusätzlich alle
    // Serien in EINEM Bündel, analog zum Alle-Serien-PDF.
    file: "reels-alle-serien.md",
    title: "Reel-Drehbuch · Alle Serien",
    subtitle:
      "Alle Reel-Serien · 7 Stufen · Praxis · Vertiefungen · Mentale Selbstverteidigung · Wissenschaft",
    pdf: "WMDG-Reel-Drehbuch-Alle-Serien.pdf",
    sections: [
      { label: "Die 7 Stufen", files: [join(SK, "reels", "stufen.md")] },
      { label: "Praxis", files: [join(SK, "reels", "praxis.md")] },
      { label: "Vertiefungen", files: [join(SK, "reels", "vertiefungen.md")] },
      { label: "Mentale Selbstverteidigung", files: [join(SK, "reels", "mentale-selbstverteidigung.md")] },
      { label: "Die Wissenschaft dahinter", files: [join(SK, "reels", "wissenschaft.md")] },
    ],
  },
];

/**
 * Überschriften eines Quell-Skripts um `by` Stufen tiefer setzen, damit sie
 * unter der Abschnitts-Überschrift (##) sauber einhängen. Code-Blöcke werden
 * unangetastet gelassen. Übrige Zeilen bleiben 1:1 erhalten.
 */
function demoteHeadings(md, by) {
  const lines = md.split(/\r?\n/);
  let inFence = false;
  return lines
    .map((line) => {
      if (/^\s*```/.test(line)) { inFence = !inFence; return line; }
      if (inFence) return line;
      const m = line.match(/^(#{1,6})(\s+.*)$/);
      if (!m) return line;
      const level = Math.min(6, m[1].length + by);
      return "#".repeat(level) + m[2];
    })
    .join("\n")
    .trim();
}

const DATE = new Date().toISOString().slice(0, 10);

function buildBundle(b) {
  const parts = [];
  parts.push(`# ${b.title}`);
  parts.push("");
  parts.push(`> ${b.subtitle}`);
  parts.push("");
  parts.push(
    `_Automatisch gebündelt aus den Einzel-Skripten – inhaltsgleich zu \`${b.pdf}\`. ` +
      `Stand ${DATE}. Neu erzeugen: \`node tools/pdf/videoskripte-markdown.mjs\`._`,
  );
  parts.push("");
  if (b.note) {
    parts.push(`**Hinweis:** ${b.note}`);
    parts.push("");
  }

  for (const s of b.sections) {
    if (!s.files.length) continue;
    parts.push("---");
    parts.push("");
    parts.push(`## ${s.label}`);
    parts.push("");
    const chunks = s.files.map((f) => {
      const rel = relative(ROOT, f);
      const body = demoteHeadings(readFileSync(f, "utf8"), 2);
      return `<!-- Quelle: ${rel} -->\n\n${body}`;
    });
    parts.push(chunks.join("\n\n"));
    parts.push("");
  }

  return parts.join("\n").replace(/\n{3,}/g, "\n\n").trimEnd() + "\n";
}

mkdirSync(OUT_DIR, { recursive: true });
const written = [];
for (const b of BUNDLES) {
  const out = join(OUT_DIR, b.file);
  writeFileSync(out, buildBundle(b), "utf8");
  const count = b.sections.reduce((n, s) => n + s.files.length, 0);
  written.push({ file: b.file, count });
  console.log(`✓ ${relative(ROOT, out)} (${count} Quell-Skripte)`);
}

console.log(`\nFertig: ${written.length} Videoskript-Bündel in ${relative(ROOT, OUT_DIR)}`);
