/**
 * Erzeugt ein druckbares Übungs-Arbeitsblatt (PDF) für eine Stufe.
 * Verwendet pdf-lib (reines JavaScript, keine nativen Abhängigkeiten),
 * damit es auch in der Serverless-Umgebung von Vercel zuverlässig läuft.
 */
import {
  PDFDocument,
  StandardFonts,
  rgb,
  type PDFFont,
  type PDFPage,
} from "pdf-lib";
import type { Stage } from "@/lib/content";
import type { StageLesson } from "@/lib/stage-lessons";

const PAGE = { w: 595.28, h: 841.89 }; // A4 hochkant
const MARGIN = 56;
const CONTENT_W = PAGE.w - MARGIN * 2;
const BOTTOM = MARGIN + 24; // Platz für die Fußzeile

const INK = rgb(0.086, 0.137, 0.122);
const INK_SOFT = rgb(0.3, 0.34, 0.32);
const ACCENT = rgb(0.31, 0.62, 0.11);
const HAIRLINE = rgb(0.85, 0.85, 0.82);
const WRITE_LINE = rgb(0.8, 0.8, 0.78);

/**
 * pdf-lib nutzt die WinAnsi-Kodierung. Umlaute sind darin enthalten,
 * einige typografische Sonderzeichen ersetzen wir sicherheitshalber
 * durch ASCII-Entsprechungen, damit garantiert kein Zeichen fehlt.
 */
function ascii(s: string): string {
  return s
    .replace(/[„“”]/g, '"')
    .replace(/[‘’‚]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/…/g, "...")
    .replace(/ /g, " ");
}

type Fonts = { reg: PDFFont; bold: PDFFont; obl: PDFFont };

type Ctx = {
  doc: PDFDocument;
  page: PDFPage;
  y: number;
  fonts: Fonts;
  pageNo: number;
  footer: string;
};

function wrap(text: string, font: PDFFont, size: number, maxW: number): string[] {
  const out: string[] = [];
  for (const paragraph of ascii(text).split("\n")) {
    const words = paragraph.split(/\s+/).filter(Boolean);
    let line = "";
    for (const word of words) {
      const test = line ? `${line} ${word}` : word;
      if (line && font.widthOfTextAtSize(test, size) > maxW) {
        out.push(line);
        line = word;
      } else {
        line = test;
      }
    }
    out.push(line);
  }
  return out;
}

function drawFooter(ctx: Ctx) {
  const size = 8;
  ctx.page.drawLine({
    start: { x: MARGIN, y: MARGIN + 12 },
    end: { x: PAGE.w - MARGIN, y: MARGIN + 12 },
    thickness: 0.5,
    color: HAIRLINE,
  });
  ctx.page.drawText(ascii(ctx.footer), {
    x: MARGIN,
    y: MARGIN,
    size,
    font: ctx.fonts.reg,
    color: INK_SOFT,
  });
  const pageLabel = `Seite ${ctx.pageNo}`;
  ctx.page.drawText(pageLabel, {
    x: PAGE.w - MARGIN - ctx.fonts.reg.widthOfTextAtSize(pageLabel, size),
    y: MARGIN,
    size,
    font: ctx.fonts.reg,
    color: INK_SOFT,
  });
}

function newPage(ctx: Ctx) {
  drawFooter(ctx);
  ctx.page = ctx.doc.addPage([PAGE.w, PAGE.h]);
  ctx.pageNo += 1;
  ctx.y = PAGE.h - MARGIN;
}

/** Sorgt dafür, dass mind. `need` Punkte Platz auf der Seite sind. */
function ensure(ctx: Ctx, need: number) {
  if (ctx.y - need < BOTTOM) newPage(ctx);
}

function paragraph(
  ctx: Ctx,
  text: string,
  opts: {
    font?: PDFFont;
    size?: number;
    color?: ReturnType<typeof rgb>;
    lineHeight?: number;
    x?: number;
    maxW?: number;
    gapAfter?: number;
  } = {},
) {
  const font = opts.font ?? ctx.fonts.reg;
  const size = opts.size ?? 10.5;
  const color = opts.color ?? INK_SOFT;
  const lh = opts.lineHeight ?? size * 1.5;
  const x = opts.x ?? MARGIN;
  const maxW = opts.maxW ?? CONTENT_W - (x - MARGIN);
  for (const line of wrap(text, font, size, maxW)) {
    ensure(ctx, lh);
    ctx.y -= lh;
    ctx.page.drawText(line, { x, y: ctx.y, size, font, color });
  }
  ctx.y -= opts.gapAfter ?? 0;
}

/** Leere Schreiblinien zum Ausfüllen. */
function writingLines(ctx: Ctx, count: number) {
  const gap = 22;
  for (let i = 0; i < count; i += 1) {
    ensure(ctx, gap);
    ctx.y -= gap;
    ctx.page.drawLine({
      start: { x: MARGIN, y: ctx.y },
      end: { x: PAGE.w - MARGIN, y: ctx.y },
      thickness: 0.6,
      color: WRITE_LINE,
    });
  }
}

export async function buildWorksheetPdf(
  stage: Stage,
  lesson: StageLesson,
): Promise<Uint8Array> {
  const doc = await PDFDocument.create();
  doc.setTitle(`Übungen – Stufe ${stage.number}: ${stage.title}`);
  doc.setAuthor("Werde Meister deiner Gedanken");
  doc.setSubject("Übungs-Arbeitsblatt");

  const fonts: Fonts = {
    reg: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    obl: await doc.embedFont(StandardFonts.HelveticaOblique),
  };

  const ctx: Ctx = {
    doc,
    page: doc.addPage([PAGE.w, PAGE.h]),
    y: PAGE.h - MARGIN,
    fonts,
    pageNo: 1,
    footer: `Werde Meister deiner Gedanken · Stufe ${stage.number} – ${stage.title}`,
  };

  // Kopfzeile
  ctx.y -= 4;
  paragraph(ctx, "WERDE MEISTER DEINER GEDANKEN", {
    font: fonts.bold,
    size: 8.5,
    color: ACCENT,
    lineHeight: 12,
  });
  ctx.y -= 6;
  paragraph(ctx, `Arbeitsblatt · Stufe ${stage.number}`, {
    font: fonts.reg,
    size: 10,
    color: INK_SOFT,
    lineHeight: 14,
  });
  paragraph(ctx, stage.title, {
    font: fonts.bold,
    size: 22,
    color: INK,
    lineHeight: 26,
  });
  paragraph(ctx, stage.subtitle, {
    font: fonts.reg,
    size: 11,
    color: ACCENT,
    lineHeight: 16,
    gapAfter: 10,
  });

  // Trennlinie
  ensure(ctx, 12);
  ctx.y -= 6;
  ctx.page.drawLine({
    start: { x: MARGIN, y: ctx.y },
    end: { x: PAGE.w - MARGIN, y: ctx.y },
    thickness: 1,
    color: HAIRLINE,
  });
  ctx.y -= 14;

  // Kerngedanke
  paragraph(ctx, lesson.keyIdea, {
    font: fonts.obl,
    size: 12,
    color: INK,
    lineHeight: 17,
    gapAfter: 18,
  });

  // Übungen
  paragraph(ctx, "Deine Übungen", {
    font: fonts.bold,
    size: 14,
    color: INK,
    lineHeight: 20,
    gapAfter: 6,
  });

  lesson.exercises.forEach((exercise, i) => {
    ensure(ctx, 40);
    // Titel + Dauer
    paragraph(ctx, `${i + 1}. ${exercise.title}`, {
      font: fonts.bold,
      size: 12,
      color: INK,
      lineHeight: 17,
    });
    if (exercise.duration) {
      paragraph(ctx, exercise.duration, {
        font: fonts.obl,
        size: 9.5,
        color: ACCENT,
        lineHeight: 13,
        gapAfter: 2,
      });
    }
    // Schritte
    const stepIndent = MARGIN + 20;
    exercise.steps.forEach((step, s) => {
      ensure(ctx, 16);
      ctx.y -= 15;
      ctx.page.drawText(`${s + 1}.`, {
        x: MARGIN + 4,
        y: ctx.y,
        size: 10.5,
        font: fonts.bold,
        color: ACCENT,
      });
      const lines = wrap(step, fonts.reg, 10.5, CONTENT_W - 20);
      lines.forEach((line, li) => {
        if (li > 0) {
          ensure(ctx, 15);
          ctx.y -= 15;
        }
        ctx.page.drawText(line, {
          x: stepIndent,
          y: ctx.y,
          size: 10.5,
          font: fonts.reg,
          color: INK_SOFT,
        });
      });
    });
    // Notizen
    ctx.y -= 12;
    paragraph(ctx, "Meine Notizen:", {
      font: fonts.obl,
      size: 9.5,
      color: INK_SOFT,
      lineHeight: 12,
    });
    writingLines(ctx, 2);
    ctx.y -= 18;
  });

  // Reflexion
  ensure(ctx, 40);
  ctx.y -= 4;
  paragraph(ctx, "Zum Innehalten", {
    font: fonts.bold,
    size: 14,
    color: INK,
    lineHeight: 20,
    gapAfter: 6,
  });
  lesson.reflection.forEach((question) => {
    ensure(ctx, 40);
    paragraph(ctx, question, {
      font: fonts.reg,
      size: 10.5,
      color: INK,
      lineHeight: 15,
      gapAfter: 2,
    });
    writingLines(ctx, 2);
    ctx.y -= 14;
  });

  // Leitsatz
  ensure(ctx, 50);
  ctx.y -= 4;
  ctx.page.drawLine({
    start: { x: MARGIN, y: ctx.y },
    end: { x: PAGE.w - MARGIN, y: ctx.y },
    thickness: 1,
    color: HAIRLINE,
  });
  ctx.y -= 16;
  paragraph(ctx, "Dein Leitsatz", {
    font: fonts.bold,
    size: 9,
    color: ACCENT,
    lineHeight: 13,
  });
  paragraph(ctx, `„${lesson.affirmation}“`, {
    font: fonts.obl,
    size: 13,
    color: INK,
    lineHeight: 18,
  });

  drawFooter(ctx);

  return doc.save();
}

/** Dateinamen-tauglicher Slug mit deutscher Umlaut-Umschrift. */
export function worksheetSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/ä/g, "ae")
    .replace(/ö/g, "oe")
    .replace(/ü/g, "ue")
    .replace(/ß/g, "ss")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
