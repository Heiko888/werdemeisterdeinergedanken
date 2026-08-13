/**
 * Parser + Konfiguration fürs Carousel-Studio.
 * NEBENWIRKUNGSFREI (außer Datei-Lesen der Skripte). Quelle der Wahrheit für
 * die Slide-Texte sind die Markdown-Dateien in docs/skripte/carousels/ –
 * hier werden sie nur eingelesen und strukturiert.
 */
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const SKRIPTE = join(HERE, "..", "skripte", "carousels");

export const HANDLE = "www.werdemeisterdeinergedanken.de";
export const GRAD = "linear-gradient(120deg,#8cc63f 0%,#21b2bd 100%)";

/**
 * Ausgabeformate. Breite ist überall 1080px (Schriftgrößen bleiben gültig),
 * nur Höhe + vertikale Paddings ändern sich – die `.mid`-Spalte ist zentriert,
 * darum wirkt 9:16 luftiger und 1:1 kompakter.
 */
export const FORMATS = [
  { key: "feed-4x5",  label: "4:5 · Carousel",      w: 1080, h: 1350, padTop: 88,  padX: 84, padBottom: 76 },
  { key: "feed-1x1",  label: "1:1 · Feed",          w: 1080, h: 1080, padTop: 60,  padX: 84, padBottom: 56 },
  { key: "reel-9x16", label: "9:16 · Reel / Story", w: 1080, h: 1920, padTop: 150, padX: 84, padBottom: 130 },
];
/** Standard-/Rückwärtskompat-Format (4:5). */
export const FORMAT = FORMATS[0];

export const SERIES = [
  { key: "selbstverteidigung", label: "Mentale Selbstverteidigung", file: "selbstverteidigung.md" },
  { key: "stufen", label: "Die 7 Stufen", file: "stufen.md" },
  { key: "praxis", label: "Praxis", file: "praxis.md" },
  { key: "vertiefungen", label: "Vertiefungen", file: "vertiefungen.md" },
  { key: "mitgliederbereich", label: "Mitgliederbereich", file: "mitgliederbereich.md" },
];

export function slugify(s) {
  return s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/&/g, "und")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

const RE_HEAD = /^##\s+(\S+)\s*·\s*(.+?)\s*$/;
const RE_SLIDE = /^\*\*Slide\s+(\d+)\s*(?:·\s*(Cover|CTA))?\s*:\*\*\s*(.*)$/i;
const RE_SKIP = /^\*\*(Ziel|Caption|Slide-Prinzip)/i;

/** Eine Markdown-Datei einer Serie in Carousels + Slides zerlegen. */
function parseFile(file, seriesKey, seriesLabel) {
  const text = readFileSync(join(SKRIPTE, file), "utf8");
  const lines = text.split(/\r?\n/);
  const carousels = [];
  let cur = null; // aktuelles Carousel
  let target = null; // aktuelle Slide (für Fortsetzungszeilen) oder null

  const pushSlide = (num, role, txt) => {
    const slide = { num: Number(num), role: role ?? "body", text: txt.trim(), sub: "" };
    cur.slides.push(slide);
    target = slide;
  };

  for (const raw of lines) {
    const line = raw.trimEnd();
    const mh = line.match(RE_HEAD);
    if (mh) {
      const [, , rest] = mh;
      // „Autopilot — Du wirst gelebt" → topic + Untertitel
      const [topic, ...subParts] = rest.split(/\s+—\s+/);
      cur = {
        series: seriesKey,
        seriesLabel,
        topic: topic.trim(),
        subtitle: subParts.join(" — ").trim(),
        slug: slugify(topic),
        slides: [],
      };
      carousels.push(cur);
      target = null;
      continue;
    }
    if (!cur) continue;

    if (RE_SKIP.test(line)) {
      target = null;
      continue;
    }
    const ms = line.match(RE_SLIDE);
    if (ms) {
      const [, num, role, txt] = ms;
      pushSlide(num, role ? role.toLowerCase() : null, txt);
      continue;
    }
    // Fortsetzungszeile der aktuellen Slide
    if (target && line.trim() && !line.startsWith("**") && !line.startsWith("#")) {
      const t = line.trim();
      if (/^Unterzeile:/i.test(t)) target.sub = t.replace(/^Unterzeile:\s*/i, "").trim();
      else target.text += (target.text ? " " : "") + t;
    }
  }

  // Cover-Untertitel aus „Headline — Sub" ableiten, falls nicht separat gesetzt
  for (const c of carousels) {
    for (const s of c.slides) {
      if (s.role === "cover" && !s.sub && /\s+—\s+/.test(s.text)) {
        const [head, ...rest] = s.text.split(/\s+—\s+/);
        s.text = head.trim();
        s.sub = rest.join(" — ").trim();
      }
    }
  }
  return carousels;
}

/** Alle Serien mit ihren Carousels laden. */
export function loadCarousels() {
  return SERIES.map((s) => ({
    ...s,
    carousels: parseFile(s.file, s.key, s.label),
  }));
}
