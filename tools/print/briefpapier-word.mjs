/**
 * Briefpapier als Word-Vorlage (.docx).
 *
 *   node tools/print/briefpapier-word.mjs      (oder: npm run briefpapier:word)
 *
 * Ausgabe → tools/print/out/WMDG-Briefpapier-Vorlage.docx
 *
 * Erzeugt einen beschreibbaren A4-Briefbogen: Marken-Kopf (Emblem + Wortmarke +
 * Tagline) und Fußzeile (Anschrift, Kontakt, USt-IdNr.) wiederholen sich auf
 * jeder Seite; dazwischen ein DIN-5008-naher Satzspiegel mit Platzhaltern.
 *
 * Word kennt keine eigenen Marken-Schriften/Verläufe – daher websichere
 * Schriften (Georgia ≈ Fraunces, Arial ≈ Inter) und solide, AA-taugliche
 * Markenfarben (Kap. 04/05). Quelle der Daten: tools/print/marke.mjs.
 */
import { writeFileSync, readFileSync, mkdirSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import {
  Document, Packer, Paragraph, TextRun, ImageRun, Table, TableRow, TableCell,
  WidthType, BorderStyle, AlignmentType, VerticalAlign, Header, Footer,
} from "docx";
import { CONTACT, C } from "./marke.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT = join(HERE, "out");

const SERIF = "Georgia";                 // ≈ Fraunces
const SANS = "Arial";                    // ≈ Inter
const hex = (h) => h.replace("#", "").toUpperCase();
const INK = hex(C.ink), MUTED = hex(C.inkMuted), MID = hex(C.inkMid);
// Gold als tragende Markenfarbe: gold-600 (Antikgold) für die große Wortmarke
// und Feinlinien, gold-700 (AA auf Hell) für kleine Texte/Links.
const GOLD_WORD = hex(C.gold600), GOLD_TEXT = hex(C.gold700), LINE = hex(C.gold600);

const logo = readFileSync(join(ROOT, "public/email/wmdg-signatur-logo.png"));

// Seiten-Inhaltsbreite (A4 11906 DXA − Ränder links 1418 / rechts 1134).
const CONTENT_W = 11906 - 1418 - 1134; // 9354
const noBorder = { style: BorderStyle.NONE, size: 0, color: "auto" };
const noBorders = { top: noBorder, bottom: noBorder, left: noBorder, right: noBorder,
  insideHorizontal: noBorder, insideVertical: noBorder };

// Feine Marken-Linie (Gold) als Absatz-Unterkante.
const ruleP = (opts = {}) => new Paragraph({
  border: { bottom: { style: BorderStyle.SINGLE, size: 12, color: LINE, space: 1 } },
  spacing: { after: 0, ...opts.spacing },
});
const gap = (pts) => new Paragraph({ spacing: { after: pts * 20 }, children: [] });

// ---------- Kopfzeile -------------------------------------------------------
function header() {
  const wordmark = new TableCell({
    verticalAlign: VerticalAlign.CENTER, margins: { left: 120 }, borders: noBorders,
    width: { size: 5600, type: WidthType.DXA },
    children: [
      // Zeile 1: WERDE MEISTER (MEISTER gold, wie im Original-Logo)
      new Paragraph({ spacing: { after: 30 }, children: [
        new TextRun({ text: CONTACT.lockup.pre.toUpperCase() + " ", font: SANS,
          bold: true, size: 30, color: INK, characterSpacing: 40 }),
        new TextRun({ text: CONTACT.lockup.gold.toUpperCase(), font: SANS,
          bold: true, size: 30, color: GOLD_WORD, characterSpacing: 40 }),
      ] }),
      // Zeile 2: DEINER GEDANKEN
      new Paragraph({ children: [new TextRun({
        text: CONTACT.lockup.sub.toUpperCase(), font: SANS, bold: true, size: 16,
        color: INK, characterSpacing: 60 })] }),
    ],
  });
  const emblem = new TableCell({
    verticalAlign: VerticalAlign.CENTER, borders: noBorders,
    width: { size: 1200, type: WidthType.DXA },
    children: [new Paragraph({ children: [new ImageRun({
      type: "png", data: logo, transformation: { width: 60, height: 60 } })] })],
  });
  const tag = new TableCell({
    verticalAlign: VerticalAlign.CENTER, borders: noBorders,
    width: { size: 2554, type: WidthType.DXA },
    children: [new Paragraph({ alignment: AlignmentType.RIGHT, children: [new TextRun({
      text: CONTACT.tagline.toUpperCase(), font: SANS, bold: true, size: 17,
      color: GOLD_TEXT, characterSpacing: 30 })] })],
  });
  return new Header({ children: [
    new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, borders: noBorders,
      columnWidths: [1200, 5600, 2554],
      rows: [new TableRow({ children: [emblem, wordmark, tag] })] }),
    ruleP({ spacing: { before: 80 } }),
  ] });
}

// ---------- Fußzeile --------------------------------------------------------
function footCell(width, label, lines) {
  const children = [new Paragraph({ spacing: { after: 20 }, children: [new TextRun({
    text: label.toUpperCase(), font: SANS, bold: true, size: 15, color: INK, characterSpacing: 20 })] })];
  for (const l of lines) {
    children.push(new Paragraph({ spacing: { after: 0, line: 220 }, children: [
      new TextRun({ text: l.text, font: SANS, size: 15, color: l.color || MUTED }) ] }));
  }
  return new TableCell({ borders: noBorders, width: { size: width, type: WidthType.DXA },
    margins: { right: 200 }, children });
}
function footer() {
  const kontakt = [
    ...(CONTACT.phone ? [{ text: "Tel " + CONTACT.phone }] : []),
    { text: CONTACT.email },
    { text: CONTACT.web, color: GOLD_TEXT },
  ];
  return new Footer({ children: [
    ruleP(),
    gap(4),
    new Table({ width: { size: CONTENT_W, type: WidthType.DXA }, borders: noBorders,
      columnWidths: [3118, 3118, 3118],
      rows: [new TableRow({ children: [
        footCell(3118, "Anschrift", [{ text: CONTACT.name }, { text: CONTACT.street }, { text: CONTACT.city }]),
        footCell(3118, "Kontakt", kontakt),
        footCell(3118, "Rechtliches", [{ text: "USt-IdNr." }, { text: CONTACT.ustId }]),
      ] })] }),
  ] });
}

// ---------- Textkörper (Satzspiegel mit Platzhaltern) -----------------------
const ph = (t) => new TextRun({ text: t, font: SANS, size: 22, color: MUTED }); // Platzhalter
const body = () => [
  // Rücksende-Zeile (klein, mit feiner Unterkante)
  new Paragraph({
    border: { bottom: { style: BorderStyle.SINGLE, size: 4, color: MUTED, space: 2 } },
    spacing: { after: 240 },
    children: [new TextRun({
      text: `${CONTACT.name} · ${CONTACT.street} · ${CONTACT.city}`,
      font: SANS, size: 15, color: MUTED })],
  }),
  // Adressfeld (Platzhalter)
  new Paragraph({ spacing: { after: 0, line: 300 }, children: [ph("[ Anrede Vorname Nachname ]")] }),
  new Paragraph({ spacing: { after: 0, line: 300 }, children: [ph("[ Straße und Hausnummer ]")] }),
  new Paragraph({ spacing: { after: 0, line: 300 }, children: [ph("[ PLZ Ort ]")] }),
  // Datum rechts
  new Paragraph({ alignment: AlignmentType.RIGHT, spacing: { before: 360, after: 320 },
    children: [ph("Großheubach, [ Datum ]")] }),
  // Betreff
  new Paragraph({ spacing: { after: 260 }, children: [new TextRun({
    text: "[ Betreff ]", font: SERIF, bold: true, size: 26, color: INK })] }),
  // Anrede + Textkörper
  new Paragraph({ spacing: { after: 200 }, children: [ph("[ Anrede ],")] }),
  new Paragraph({ spacing: { after: 200, line: 320 }, children: [ph("[ Ihr Text … ]")] }),
  gap(6),
  // Grußformel
  new Paragraph({ spacing: { after: 40 }, children: [
    new TextRun({ text: "Mit herzlichen Grüßen", font: SANS, size: 22, color: INK }) ] }),
  gap(18),
  new Paragraph({ children: [new TextRun({ text: CONTACT.name, font: SANS, size: 22, color: INK })] }),
];

// ---------- Dokument --------------------------------------------------------
const doc = new Document({
  creator: CONTACT.brand,
  title: "Briefbogen – " + CONTACT.brand,
  description: "Briefpapier-Vorlage (Word)",
  sections: [{
    properties: {
      page: {
        size: { width: 11906, height: 16838 }, // A4
        margin: { top: 2160, bottom: 1440, left: 1418, right: 1134, header: 680, footer: 620 },
      },
    },
    headers: { default: header() },
    footers: { default: footer() },
    children: body(),
  }],
});

mkdirSync(OUT, { recursive: true });
const buf = await Packer.toBuffer(doc);
const outFile = join(OUT, "WMDG-Briefpapier-Vorlage.docx");
writeFileSync(outFile, buf);
console.log("✓ WMDG-Briefpapier-Vorlage.docx  →", OUT);
