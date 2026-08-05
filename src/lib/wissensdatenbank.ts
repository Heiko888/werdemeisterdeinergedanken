/**
 * Wissensdatenbank – Loader & leichter Markdown-Parser.
 *
 * Die Kapitel liegen als Markdown unter `content/wissensdatenbank/` (bewusst in
 * `content/`, weil dieser Ordner – anders als `docs/` – ins Deploy-Image kopiert
 * wird und damit zur Build-Zeit lesbar ist). Statt eines vollen Markdown-Setups
 * parsen wir die wenigen genutzten Konstrukte (Überschriften, Absätze, Zitate,
 * Listen, Tabellen) selbst in ein schlankes Block-Modell – im selben Geist wie
 * die Blog-Blöcke in `lib/blog.ts`.
 *
 * Server-only: nutzt `node:fs` und wird ausschließlich in Server-Komponenten
 * importiert.
 */

import fs from "node:fs";
import path from "node:path";

const DIR = path.join(process.cwd(), "content", "wissensdatenbank");

// ---------------------------------------------------------------------------
// Block-Modell
// ---------------------------------------------------------------------------

export type Block =
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "p"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "table"; head: string[]; rows: string[][] }
  | { type: "hr" };

type RawBlock = Block | { type: "h1"; text: string };

export type Doc = {
  slug: string;
  /** "01".."26" für Kapitel, null für Sonderseiten (Glossar). */
  number: string | null;
  title: string;
  /** Erstes Zitat nach dem Titel – dient als Vorspann/Untertitel. */
  lead: string;
  /** Fließtext ohne Titel und Vorspann. */
  blocks: Block[];
};

export type ChapterMeta = {
  slug: string;
  number: string;
  title: string;
  lead: string;
};

// ---------------------------------------------------------------------------
// Hilfen
// ---------------------------------------------------------------------------

/** Erzeugt eine stabile Anker-ID aus einem Überschriftentext (dt.-tauglich). */
export function slugifyHeading(text: string): string {
  return text
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const BLOCK_START = /^(#{1,3}\s|>|\||[-*]\s|\d+\.\s|---+\s*$)/;

function parseRow(line: string): string[] {
  return line
    .trim()
    .replace(/^\|/, "")
    .replace(/\|$/, "")
    .split("|")
    .map((c) => c.trim());
}

/** Zerlegt Markdown in unser Block-Modell (inkl. optionalem H1-Titel). */
function parseBlocks(md: string): RawBlock[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: RawBlock[] = [];
  const isBlank = (l: string) => l.trim() === "";
  let i = 0;

  while (i < lines.length) {
    const line = lines[i];

    if (isBlank(line)) {
      i++;
      continue;
    }

    const t = line.trim();

    // Horizontale Linie
    if (/^---+$/.test(t)) {
      blocks.push({ type: "hr" });
      i++;
      continue;
    }

    // Überschrift (#, ##, ###)
    const h = /^(#{1,3})\s+(.*)$/.exec(t);
    if (h) {
      const level = h[1].length;
      const text = h[2].trim();
      if (level === 1) blocks.push({ type: "h1", text });
      else
        blocks.push({
          type: level === 2 ? "h2" : "h3",
          text,
          id: slugifyHeading(text),
        });
      i++;
      continue;
    }

    // Zitat / Callout (zusammenhängende > … Zeilen)
    if (/^>\s?/.test(t)) {
      const buf: string[] = [];
      while (i < lines.length && /^>\s?/.test(lines[i].trim())) {
        buf.push(lines[i].trim().replace(/^>\s?/, "").trim());
        i++;
      }
      blocks.push({ type: "quote", text: buf.join(" ").trim() });
      continue;
    }

    // Tabelle (GFM-Pipe): Kopfzeile + Trennzeile |---|---|
    if (
      /^\|/.test(t) &&
      i + 1 < lines.length &&
      /^\|?[\s:|-]+\|?$/.test(lines[i + 1].trim()) &&
      lines[i + 1].includes("-")
    ) {
      const tableLines: string[] = [];
      while (i < lines.length && /^\|/.test(lines[i].trim())) {
        tableLines.push(lines[i]);
        i++;
      }
      const head = parseRow(tableLines[0]);
      const rows = tableLines.slice(2).map(parseRow);
      blocks.push({ type: "table", head, rows });
      continue;
    }

    // Aufzählung (- / *)
    if (/^[-*]\s+/.test(t)) {
      const items: string[] = [];
      while (i < lines.length) {
        const cur = lines[i];
        if (/^[-*]\s+/.test(cur.trim())) {
          items.push(cur.trim().replace(/^[-*]\s+/, "").trim());
          i++;
        } else if (!isBlank(cur) && !BLOCK_START.test(cur.trim()) && items.length) {
          items[items.length - 1] += " " + cur.trim();
          i++;
        } else break;
      }
      blocks.push({ type: "ul", items });
      continue;
    }

    // Nummerierte Liste
    if (/^\d+\.\s+/.test(t)) {
      const items: string[] = [];
      while (i < lines.length) {
        const cur = lines[i];
        if (/^\d+\.\s+/.test(cur.trim())) {
          items.push(cur.trim().replace(/^\d+\.\s+/, "").trim());
          i++;
        } else if (!isBlank(cur) && !BLOCK_START.test(cur.trim()) && items.length) {
          items[items.length - 1] += " " + cur.trim();
          i++;
        } else break;
      }
      blocks.push({ type: "ol", items });
      continue;
    }

    // Absatz (bis Leerzeile oder nächster Block-Start)
    const buf: string[] = [];
    while (i < lines.length && !isBlank(lines[i]) && !BLOCK_START.test(lines[i].trim())) {
      buf.push(lines[i].trim());
      i++;
    }
    blocks.push({ type: "p", text: buf.join(" ").trim() });
  }

  return blocks;
}

// ---------------------------------------------------------------------------
// Öffentliche API
// ---------------------------------------------------------------------------

/** Liest ein Dokument (Kapitel oder Sonderseite wie „glossar") anhand des Slugs. */
export function getDoc(slug: string): Doc | null {
  // Kein Pfad-Trickserei zulassen.
  if (!/^[a-z0-9-]+$/.test(slug)) return null;
  const file = path.join(DIR, `${slug}.md`);
  if (!fs.existsSync(file)) return null;

  const raw = parseBlocks(fs.readFileSync(file, "utf8"));
  const titleIdx = raw.findIndex((b) => b.type === "h1");
  const title = titleIdx >= 0 ? (raw[titleIdx] as { text: string }).text : slug;
  const leadIdx = raw.findIndex((b, idx) => idx > titleIdx && b.type === "quote");
  const lead = leadIdx >= 0 ? (raw[leadIdx] as { text: string }).text : "";

  const blocks = raw.filter(
    (b, idx) => idx !== titleIdx && idx !== leadIdx && b.type !== "h1",
  ) as Block[];

  const m = /^(\d\d)-/.exec(slug);
  return { slug, number: m ? m[1] : null, title, lead, blocks };
}

/** Alle Kapitel-Slugs (nur nummerierte Dateien), aufsteigend sortiert. */
export function chapterSlugs(): string[] {
  return fs
    .readdirSync(DIR)
    .filter((f) => /^\d\d-.+\.md$/.test(f))
    .map((f) => f.replace(/\.md$/, ""))
    .sort();
}

/** Schlanke Metadaten aller Kapitel für Übersicht & Navigation. */
export function chapters(): ChapterMeta[] {
  return chapterSlugs().map((slug) => {
    const d = getDoc(slug);
    return {
      slug,
      number: d?.number ?? "",
      title: d?.title ?? slug,
      lead: d?.lead ?? "",
    };
  });
}

/** Thematische Gliederung der Übersichtsseite (fünf Teile, wie im Index). */
export const PARTS: { title: string; hint: string; slugs: string[] }[] = [
  {
    title: "Das biologische Fundament",
    hint: "Wie das Organ gebaut ist und funktioniert",
    slugs: [
      "01-neuroanatomie-aufbau-des-gehirns",
      "02-neuronen-synapsen-neurotransmitter",
      "03-neuroplastizitaet",
    ],
  },
  {
    title: "Bewusstsein & Wahrnehmung",
    hint: "Was Bewusstsein ist – und wo es entsteht",
    slugs: [
      "04-theorien-des-bewusstseins",
      "05-neuronale-korrelate-des-bewusstseins",
      "06-aufmerksamkeit-und-wahrnehmung",
      "27-das-unbewusste",
    ],
  },
  {
    title: "Denken, Erinnern, Fühlen, Entscheiden",
    hint: "Die zentralen kognitiven Prozesse",
    slugs: [
      "07-gedanken-und-kognition",
      "08-gedaechtnis-und-lernen",
      "09-emotionen-und-limbisches-system",
      "10-freier-wille-und-entscheidung",
      "18-konditionierung-und-lernen",
      "23-sprache-und-denken",
    ],
  },
  {
    title: "Verändern, Trainieren, Regulieren",
    hint: "Was sich am Gehirn nachweislich beeinflussen lässt",
    slugs: [
      "11-achtsamkeit-meditation-mentales-training",
      "12-veraenderte-bewusstseinszustaende",
      "14-gewohnheiten-und-verhaltensaenderung",
      "15-stress-angst-und-trauma",
      "16-belohnung-motivation-und-sucht",
      "20-gehirngesundheit-schlaf-bewegung-ernaehrung",
      "22-gehirn-und-koerper-interozeption",
    ],
  },
  {
    title: "Selbst, Gesellschaft & Grenzfragen",
    hint: "Ich, andere und die offenen Ränder",
    slugs: [
      "13-kognitive-verzerrungen-und-selbsttaeuschung",
      "17-das-selbst-und-identitaet",
      "19-das-soziale-gehirn-und-beeinflussung",
      "21-entwicklung-und-alterung-des-gehirns",
      "24-psychische-gesundheit-neurowissenschaftlich",
      "25-ki-maschinen-und-bewusstsein",
      "26-placebo-nocebo-und-erwartung",
    ],
  },
];
