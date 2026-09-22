#!/usr/bin/env node
// Elgato-Prompter-Export: alle Sprechtexte als reine .txt-Dateien (UTF-8).
//
// Ein Video = eine Datei. Entfernt wird alles, was nicht gesprochen wird:
// Kopfzeilen (Format/Länge), [Regie]-Hinweise, Markdown-Zeichen, Überschriften.
// Pausen-Marker aus den Praxis-Skripten (… und […Pause: 10 Sek]) bleiben stehen.
//
// Aufruf: npm run elgato-txt   (oder: node tools/pdf/elgato-txt.mjs [ausgabe-ordner])
// Ausgabe: docs/skripte/elgato/ (+ WMDG-Elgato-Skripte.zip, falls `zip` vorhanden)

import { readFileSync, writeFileSync, readdirSync, rmSync, mkdirSync, existsSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const SK = join(ROOT, "docs", "skripte");
const OUT = process.argv[2] || join(SK, "elgato");

const read = (p) => readFileSync(join(SK, p), "utf8").replace(/\r\n/g, "\n");
const md = (dir) => readdirSync(join(SK, dir)).filter((f) => f.endsWith(".md")).sort();

const slug = (s) =>
  s
    .toLowerCase()
    .replace(/ä/g, "ae").replace(/ö/g, "oe").replace(/ü/g, "ue").replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 60)
    .replace(/-+$/g, "");

// Markdown → Sprechtext
function clean(text) {
  const lines = text.split("\n").map((l) => {
    if (/^\s*`[^`]*`\s*$/.test(l)) return null; // reine Regie-/Hinweiszeile
    if (/^\s*#{1,6}\s/.test(l)) return null; // Überschrift
    if (/^\s*-{3,}\s*$/.test(l)) return null; // Trenner
    if (/^\s*<!--.*-->\s*$/.test(l)) return null;
    return l
      .replace(/`[^`]*`\s*/g, "")
      .replace(/^\s*>\s?/, "")
      .replace(/\*\*([^*]+)\*\*/g, "$1")
      .replace(/(^|[^*\w])\*([^*\n]+)\*(?=[^*\w]|$)/g, "$1$2")
      .replace(/(^|\W)_([^_\n]+)_(?=\W|$)/g, "$1$2")
      .replace(/[ \t]+$/g, "");
  });
  return lines
    .filter((l) => l !== null)
    .join("\n")
    .replace(/\n{3,}/g, "\n\n")
    .trim() + "\n";
}

// Text nach der ersten ---‑Linie (Kopf mit Format/Regie wegschneiden)
const afterHeader = (s) => {
  const m = s.match(/^-{3,}\s*$/m);
  return m ? s.slice(m.index + m[0].length) : s;
};

// Abschnitt ab Überschrift `heading` bis zur nächsten ---‑Linie / gleichrangigen Überschrift
function section(s, heading) {
  const i = s.indexOf(heading);
  if (i < 0) throw new Error(`Abschnitt nicht gefunden: ${heading}`);
  const rest = s.slice(i + heading.length);
  const end = rest.search(/^(-{3,}\s*$|## )/m);
  return end < 0 ? rest : rest.slice(0, end);
}

const files = []; // [relPfad, text]
const add = (rel, text) => files.push([rel, clean(text)]);

// 1 · Intro + Teaser-Reel (Startseite)
add("01-intro/intro-video-was-wenn-es-nicht-an-dir-liegt.txt", afterHeader(read("landing/intro-nicht-deine-schuld.md")));
{
  const s = read("landing/reel-nicht-deine-schuld.md");
  const hook = s.match(/^\*\*HOOK:\*\*\s*(.+)$/m)[1].replace(/^[„"]|["“]$/g, "");
  const skript = s.match(/^\*\*SKRIPT:\*\*\s*(.+)$/m)[1];
  add("01-intro/teaser-reel-nicht-deine-schuld.txt", `${hook}\n\n${skript}`);
}

// 2 · Willkommensvideo (nur die Wort-für-Wort-Fassung)
add("02-willkommen/willkommensvideo-dashboard.txt", section(read("willkommen/dashboard-willkommen.md"), "## Wort-für-Wort (Teleprompter)"));

// 3 · 7 Stufen · 4 · Vertiefungen · 6 · Praxis (je eine Datei pro Video)
for (const f of md("stufen-komplett"))
  add(`03-stufen/${f.replace(/-komplett\.md$/, ".txt")}`, afterHeader(read(`stufen-komplett/${f}`)));

for (const f of md("vertiefungen-komplett").filter((f) => !f.startsWith("mentale-selbstverteidigung")))
  add(`04-vertiefungen/${f.replace(/-komplett\.md$/, ".txt")}`, afterHeader(read(`vertiefungen-komplett/${f}`)));

// 5 · Mentale Selbstverteidigung: eine Quelldatei mit 16 Themen → 16 Dateien
{
  const s = read("vertiefungen-komplett/mentale-selbstverteidigung-komplett.md");
  const parts = s.split(/^## (?=\d+ · )/m).slice(1);
  for (const p of parts) {
    const [head, ...body] = p.split("\n");
    const [, nr, title] = head.match(/^(\d+) · (.+)$/);
    add(`05-mentale-selbstverteidigung/${nr.padStart(2, "0")}-${slug(title)}.txt`, body.join("\n"));
  }
}

for (const f of md("praxis")) add(`06-praxis/${f.replace(/\.md$/, ".txt")}`, afterHeader(read(`praxis/${f}`)));

// 7 · Reels: jeder Block mit Hook + Skript wird eine Datei (Primär-Hook, dann Sprechtext)
const REEL_SERIES = [
  ["stufen.md", "7-stufen"],
  ["vertiefungen.md", "vertiefungen"],
  ["mentale-selbstverteidigung.md", "mentale-selbstverteidigung"],
  ["praxis.md", "praxis"],
  ["wissenschaft.md", "wissenschaft"],
];
let reelTotal = 0;
for (const [src, dir] of REEL_SERIES) {
  const s = read(`reels/${src}`);
  let parent = "";
  let n = 0;
  for (const block of s.split(/^(?=#{2,3} )/m)) {
    const head = block.match(/^(#{2,3}) (.+)$/m);
    if (!head) continue;
    if (head[1] === "##") parent = head[2];
    const hook = block.match(/^\*\*Hook:\*\*\s*(.+)$/im);
    const skript = block.match(/^\*\*Skript:\*\*\s*(.+)$/im);
    if (!hook || !skript) continue;
    n++;
    const name = head[1] === "###" && /^\d+ · /.test(parent) && /^Variante/i.test(head[2])
      ? `${parent.replace(/^\d+ · /, "")} ${head[2]}`
      : head[2];
    const hookText = hook[1].trim().replace(/^[„"‚']|["“‘']$/g, "");
    add(`07-reels/${dir}/${String(n).padStart(2, "0")}-${slug(name.replace(/^(Reel \d+|[VW]\d+|\d+) · /, ""))}.txt`, `${hookText}\n\n${skript[1].trim()}`);
  }
  reelTotal += n;
}

// Schreiben
if (existsSync(OUT)) rmSync(OUT, { recursive: true });
for (const [rel, text] of files) {
  const p = join(OUT, rel);
  mkdirSync(dirname(p), { recursive: true });
  writeFileSync(p, text, "utf8");
}

const count = (prefix) => files.filter(([r]) => r.startsWith(prefix)).length;
writeFileSync(
  join(OUT, "LIESMICH.txt"),
  `WMDG – Sprechtexte für den Elgato Prompter
Stand: ${new Date().toISOString().slice(0, 10)} · automatisch erzeugt mit: npm run elgato-txt

Eine Datei = ein Video. Nur der Text, der gesprochen wird –
ohne Regie-Hinweise, Überschriften und Formatierung.
In den Praxis-Skripten stehen die Pausen: … = kurze Pause, […Pause: 10 Sek] = längere Stille.
In den Reels steht zuerst der Hook, dann der Sprechtext. [Eckige Klammern] = eigene Zahl/Situation einsetzen.

01-intro                       ${count("01-")} Dateien  (Startseite: Intro-Video + Teaser-Reel)
02-willkommen                  ${count("02-")} Datei    (Willkommensvideo im Mitgliederbereich)
03-stufen                      ${count("03-")} Dateien  (7 Stufen, lange Videos 6–10 Min)
04-vertiefungen                ${count("04-")} Dateien (Vertiefungen, 3–5 Min)
05-mentale-selbstverteidigung  ${count("05-")} Dateien (Themenblock, je 3–5 Min)
06-praxis                      ${count("06-")} Dateien (Meditationen, Atemübungen, Rituale)
07-reels                       ${reelTotal} Dateien (alle Reel-Serien)

Nicht von Hand ändern – die Quellen liegen in docs/skripte/ (Markdown).
`,
  "utf8",
);

console.log(`✓ ${files.length} Skripte als .txt in ${OUT} (davon ${reelTotal} Reels)`);

const zipName = "WMDG-Elgato-Skripte.zip";
const z = spawnSync("zip", ["-qr", zipName, "."], { cwd: OUT });
if (z.status === 0) console.log(`✓ ${join(OUT, zipName)}`);
else console.log("(zip nicht verfügbar – ZIP übersprungen)");
