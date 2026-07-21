/**
 * PDF-Erzeugung für den Mitgliederbereich.
 * Drei Dokumenttypen, aufgebaut aus denselben Bausteinen:
 *   - buildWorksheetPdf  → Übungs-Arbeitsblatt einer Stufe (mit Schreibzeilen)
 *   - buildLessonPdf     → komplette Lektion einer Stufe (zum Lesen)
 *   - buildWorkbookPdf   → Gesamt-Arbeitsheft über alle 7 Stufen
 *
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

type Color = ReturnType<typeof rgb>;

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
    .replace(/ /g, " ");
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
    color?: Color;
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

function divider(ctx: Ctx, thickness = 1, gapBefore = 6, gapAfter = 14) {
  ensure(ctx, gapBefore + gapAfter);
  ctx.y -= gapBefore;
  ctx.page.drawLine({
    start: { x: MARGIN, y: ctx.y },
    end: { x: PAGE.w - MARGIN, y: ctx.y },
    thickness,
    color: HAIRLINE,
  });
  ctx.y -= gapAfter;
}

/* ---------------------------------------------------------------- */
/* Wiederverwendbare Abschnitte                                     */
/* ---------------------------------------------------------------- */

function sectionStageHeader(ctx: Ctx, stage: Stage, kindLabel: string) {
  ctx.y -= 4;
  paragraph(ctx, "WERDE MEISTER DEINER GEDANKEN", {
    font: ctx.fonts.bold,
    size: 8.5,
    color: ACCENT,
    lineHeight: 12,
  });
  ctx.y -= 6;
  paragraph(ctx, `${kindLabel} · Stufe ${stage.number}`, {
    font: ctx.fonts.reg,
    size: 10,
    color: INK_SOFT,
    lineHeight: 14,
  });
  paragraph(ctx, stage.title, {
    font: ctx.fonts.bold,
    size: 22,
    color: INK,
    lineHeight: 26,
  });
  paragraph(ctx, stage.subtitle, {
    font: ctx.fonts.reg,
    size: 11,
    color: ACCENT,
    lineHeight: 16,
    gapAfter: 10,
  });
  divider(ctx);
}

function sectionKeyIdea(ctx: Ctx, lesson: StageLesson) {
  paragraph(ctx, lesson.keyIdea, {
    font: ctx.fonts.obl,
    size: 12,
    color: INK,
    lineHeight: 17,
    gapAfter: 18,
  });
}

function sectionIntro(ctx: Ctx, lesson: StageLesson) {
  paragraph(ctx, lesson.intro, {
    font: ctx.fonts.reg,
    size: 10.5,
    color: INK_SOFT,
    lineHeight: 16,
    gapAfter: 18,
  });
}

function sectionLesson(ctx: Ctx, lesson: StageLesson) {
  paragraph(ctx, "Die Lektion", {
    font: ctx.fonts.bold,
    size: 14,
    color: INK,
    lineHeight: 20,
    gapAfter: 6,
  });
  lesson.sections.forEach((section) => {
    ensure(ctx, 40);
    paragraph(ctx, section.heading, {
      font: ctx.fonts.bold,
      size: 11.5,
      color: INK,
      lineHeight: 16,
    });
    paragraph(ctx, section.body, {
      font: ctx.fonts.reg,
      size: 10.5,
      color: INK_SOFT,
      lineHeight: 16,
      gapAfter: 12,
    });
  });
  ctx.y -= 4;
}

function sectionExercises(ctx: Ctx, lesson: StageLesson, interactive: boolean) {
  paragraph(ctx, "Deine Übungen", {
    font: ctx.fonts.bold,
    size: 14,
    color: INK,
    lineHeight: 20,
    gapAfter: 6,
  });

  lesson.exercises.forEach((exercise, i) => {
    ensure(ctx, 40);
    paragraph(ctx, `${i + 1}. ${exercise.title}`, {
      font: ctx.fonts.bold,
      size: 12,
      color: INK,
      lineHeight: 17,
    });
    if (exercise.duration) {
      paragraph(ctx, exercise.duration, {
        font: ctx.fonts.obl,
        size: 9.5,
        color: ACCENT,
        lineHeight: 13,
        gapAfter: 2,
      });
    }
    const stepIndent = MARGIN + 20;
    exercise.steps.forEach((step, s) => {
      ensure(ctx, 16);
      ctx.y -= 15;
      ctx.page.drawText(`${s + 1}.`, {
        x: MARGIN + 4,
        y: ctx.y,
        size: 10.5,
        font: ctx.fonts.bold,
        color: ACCENT,
      });
      wrap(step, ctx.fonts.reg, 10.5, CONTENT_W - 20).forEach((line, li) => {
        if (li > 0) {
          ensure(ctx, 15);
          ctx.y -= 15;
        }
        ctx.page.drawText(line, {
          x: stepIndent,
          y: ctx.y,
          size: 10.5,
          font: ctx.fonts.reg,
          color: INK_SOFT,
        });
      });
    });
    if (interactive) {
      ctx.y -= 12;
      paragraph(ctx, "Meine Notizen:", {
        font: ctx.fonts.obl,
        size: 9.5,
        color: INK_SOFT,
        lineHeight: 12,
      });
      writingLines(ctx, 2);
    }
    ctx.y -= 18;
  });
}

function sectionReflection(ctx: Ctx, lesson: StageLesson, interactive: boolean) {
  ensure(ctx, 40);
  ctx.y -= 4;
  paragraph(ctx, "Zum Innehalten", {
    font: ctx.fonts.bold,
    size: 14,
    color: INK,
    lineHeight: 20,
    gapAfter: 6,
  });
  lesson.reflection.forEach((question) => {
    ensure(ctx, interactive ? 40 : 20);
    paragraph(ctx, question, {
      font: ctx.fonts.reg,
      size: 10.5,
      color: INK,
      lineHeight: 15,
      gapAfter: interactive ? 2 : 8,
    });
    if (interactive) {
      writingLines(ctx, 2);
      ctx.y -= 14;
    }
  });
}

function sectionAffirmation(ctx: Ctx, lesson: StageLesson) {
  ensure(ctx, 50);
  divider(ctx, 1, 4, 16);
  paragraph(ctx, "Dein Leitsatz", {
    font: ctx.fonts.bold,
    size: 9,
    color: ACCENT,
    lineHeight: 13,
  });
  paragraph(ctx, `„${lesson.affirmation}“`, {
    font: ctx.fonts.obl,
    size: 13,
    color: INK,
    lineHeight: 18,
  });
}

/* ---------------------------------------------------------------- */
/* Dokument-Grundgerüst                                             */
/* ---------------------------------------------------------------- */

async function startDoc(title: string, footer: string): Promise<Ctx> {
  const doc = await PDFDocument.create();
  doc.setTitle(title);
  doc.setAuthor("Werde Meister deiner Gedanken");

  const fonts: Fonts = {
    reg: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    obl: await doc.embedFont(StandardFonts.HelveticaOblique),
  };

  return {
    doc,
    page: doc.addPage([PAGE.w, PAGE.h]),
    y: PAGE.h - MARGIN,
    fonts,
    pageNo: 1,
    footer,
  };
}

/* ---------------------------------------------------------------- */
/* 1) Übungs-Arbeitsblatt einer Stufe                               */
/* ---------------------------------------------------------------- */

export async function buildWorksheetPdf(
  stage: Stage,
  lesson: StageLesson,
): Promise<Uint8Array> {
  const ctx = await startDoc(
    `Übungen – Stufe ${stage.number}: ${stage.title}`,
    `Werde Meister deiner Gedanken · Stufe ${stage.number} – ${stage.title}`,
  );
  ctx.doc.setSubject("Übungs-Arbeitsblatt");

  sectionStageHeader(ctx, stage, "Arbeitsblatt");
  sectionKeyIdea(ctx, lesson);
  sectionExercises(ctx, lesson, true);
  sectionReflection(ctx, lesson, true);
  sectionAffirmation(ctx, lesson);

  drawFooter(ctx);
  return ctx.doc.save();
}

/* ---------------------------------------------------------------- */
/* 2) Komplette Lektion einer Stufe                                 */
/* ---------------------------------------------------------------- */

export async function buildLessonPdf(
  stage: Stage,
  lesson: StageLesson,
): Promise<Uint8Array> {
  const ctx = await startDoc(
    `Lektion – Stufe ${stage.number}: ${stage.title}`,
    `Werde Meister deiner Gedanken · Stufe ${stage.number} – ${stage.title}`,
  );
  ctx.doc.setSubject("Lektion");

  sectionStageHeader(ctx, stage, "Lektion");
  sectionKeyIdea(ctx, lesson);
  sectionIntro(ctx, lesson);
  sectionLesson(ctx, lesson);
  sectionExercises(ctx, lesson, false);
  sectionReflection(ctx, lesson, false);
  sectionAffirmation(ctx, lesson);

  drawFooter(ctx);
  return ctx.doc.save();
}

/* ---------------------------------------------------------------- */
/* 3) Gesamt-Arbeitsheft über alle Stufen                           */
/* ---------------------------------------------------------------- */

export async function buildWorkbookPdf(
  entries: { stage: Stage; lesson: StageLesson }[],
): Promise<Uint8Array> {
  const ctx = await startDoc(
    "Das Arbeitsheft – Die 7 Stufen der Bewusstseinsentwicklung",
    "Werde Meister deiner Gedanken · Das Arbeitsheft",
  );
  ctx.doc.setSubject("Arbeitsheft – Die 7 Stufen");

  /* ---- Deckblatt ---- */
  ctx.y = PAGE.h - 150;
  paragraph(ctx, "WERDE MEISTER DEINER GEDANKEN", {
    font: ctx.fonts.bold,
    size: 10,
    color: ACCENT,
    lineHeight: 16,
    gapAfter: 40,
  });
  paragraph(ctx, "Das Arbeitsheft", {
    font: ctx.fonts.bold,
    size: 34,
    color: INK,
    lineHeight: 40,
  });
  paragraph(ctx, "Die 7 Stufen der Bewusstseinsentwicklung", {
    font: ctx.fonts.obl,
    size: 15,
    color: INK_SOFT,
    lineHeight: 22,
    gapAfter: 30,
  });
  paragraph(
    ctx,
    "Dein persönlicher Begleiter durch die 7 Stufen: Lektionen, praktische Übungen und Reflexionsfragen – mit Raum, deine Gedanken festzuhalten. Nimm dir Zeit, arbeite in deinem Tempo und kehre immer wieder zurück.",
    {
      font: ctx.fonts.reg,
      size: 11,
      color: INK_SOFT,
      lineHeight: 17,
    },
  );

  /* ---- Inhaltsverzeichnis ---- */
  newPage(ctx);
  paragraph(ctx, "Inhalt", {
    font: ctx.fonts.bold,
    size: 20,
    color: INK,
    lineHeight: 26,
    gapAfter: 14,
  });
  entries.forEach(({ stage }) => {
    ensure(ctx, 30);
    ctx.y -= 24;
    ctx.page.drawText(ascii(stage.number), {
      x: MARGIN,
      y: ctx.y,
      size: 13,
      font: ctx.fonts.bold,
      color: ACCENT,
    });
    ctx.page.drawText(ascii(stage.title), {
      x: MARGIN + 40,
      y: ctx.y,
      size: 13,
      font: ctx.fonts.bold,
      color: INK,
    });
    ctx.page.drawText(ascii(stage.subtitle), {
      x: MARGIN + 40,
      y: ctx.y - 15,
      size: 9.5,
      font: ctx.fonts.reg,
      color: INK_SOFT,
    });
    ctx.y -= 15;
    ctx.page.drawLine({
      start: { x: MARGIN, y: ctx.y - 10 },
      end: { x: PAGE.w - MARGIN, y: ctx.y - 10 },
      thickness: 0.5,
      color: HAIRLINE,
    });
    ctx.y -= 10;
  });

  /* ---- Stufen ---- */
  entries.forEach(({ stage, lesson }) => {
    newPage(ctx);
    ctx.footer = `Werde Meister deiner Gedanken · Stufe ${stage.number} – ${stage.title}`;
    sectionStageHeader(ctx, stage, "Stufe");
    sectionKeyIdea(ctx, lesson);
    sectionIntro(ctx, lesson);
    sectionLesson(ctx, lesson);
    sectionExercises(ctx, lesson, true);
    sectionReflection(ctx, lesson, true);
    sectionAffirmation(ctx, lesson);
  });

  drawFooter(ctx);
  return ctx.doc.save();
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
