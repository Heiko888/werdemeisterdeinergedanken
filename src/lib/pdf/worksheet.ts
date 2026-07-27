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
  type PDFImage,
  type PDFPage,
} from "pdf-lib";
import type { Stage } from "@/lib/content";
import type { StageLesson, LessonExercise } from "@/lib/stage-lessons";
import type { DeepDive } from "@/lib/deep-dives";

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
  logo?: { img: PDFImage; w: number; h: number };
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

function newPage(ctx: Ctx, footer = true) {
  if (footer) drawFooter(ctx);
  ctx.page = ctx.doc.addPage([PAGE.w, PAGE.h]);
  ctx.pageNo += 1;
  ctx.y = PAGE.h - MARGIN;
}

/** Zentriert eine einzelne Textzeile auf der Seite. */
function centerText(
  ctx: Ctx,
  text: string,
  y: number,
  font: PDFFont,
  size: number,
  color: Color,
) {
  const t = ascii(text);
  const w = font.widthOfTextAtSize(t, size);
  ctx.page.drawText(t, { x: (PAGE.w - w) / 2, y, size, font, color });
}

/** Zentriert einen (umgebrochenen) Absatz; gibt die nächste y-Position zurück. */
function centerWrap(
  ctx: Ctx,
  text: string,
  yStart: number,
  font: PDFFont,
  size: number,
  color: Color,
  maxW: number,
  lineHeight: number,
): number {
  let y = yStart;
  for (const line of wrap(text, font, size, maxW)) {
    const w = font.widthOfTextAtSize(line, size);
    ctx.page.drawText(line, { x: (PAGE.w - w) / 2, y, size, font, color });
    y -= lineHeight;
  }
  return y;
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

function sectionDocHeader(
  ctx: Ctx,
  eyebrow: string,
  title: string,
  subtitle: string,
) {
  // Logo dezent oben rechts
  if (ctx.logo) {
    const w = 32;
    const h = (w * ctx.logo.h) / ctx.logo.w;
    ctx.page.drawImage(ctx.logo.img, {
      x: PAGE.w - MARGIN - w,
      y: PAGE.h - MARGIN - h + 2,
      width: w,
      height: h,
    });
  }
  ctx.y -= 4;
  paragraph(ctx, "WERDE MEISTER DEINER GEDANKEN", {
    font: ctx.fonts.bold,
    size: 8.5,
    color: ACCENT,
    lineHeight: 12,
  });
  ctx.y -= 6;
  paragraph(ctx, eyebrow, {
    font: ctx.fonts.reg,
    size: 10,
    color: INK_SOFT,
    lineHeight: 14,
  });
  paragraph(ctx, title, {
    font: ctx.fonts.bold,
    size: 22,
    color: INK,
    lineHeight: 26,
  });
  paragraph(ctx, subtitle, {
    font: ctx.fonts.reg,
    size: 11,
    color: ACCENT,
    lineHeight: 16,
    gapAfter: 10,
  });
  divider(ctx);
}

function sectionStageHeader(ctx: Ctx, stage: Stage, kindLabel: string) {
  sectionDocHeader(
    ctx,
    `${kindLabel} · Stufe ${stage.number}`,
    stage.title,
    stage.subtitle,
  );
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

function sectionAffirmation(ctx: Ctx, text: string, label = "Dein Leitsatz") {
  ensure(ctx, 50);
  divider(ctx, 1, 4, 16);
  paragraph(ctx, label, {
    font: ctx.fonts.bold,
    size: 9,
    color: ACCENT,
    lineHeight: 13,
  });
  paragraph(ctx, `„${text}“`, {
    font: ctx.fonts.obl,
    size: 13,
    color: INK,
    lineHeight: 18,
  });
}

/* ---------------------------------------------------------------- */
/* Dokument-Grundgerüst                                             */
/* ---------------------------------------------------------------- */

async function startDoc(
  title: string,
  footer: string,
  logoBytes?: Uint8Array,
): Promise<Ctx> {
  const doc = await PDFDocument.create();
  doc.setTitle(title);
  doc.setAuthor("Werde Meister deiner Gedanken");

  const fonts: Fonts = {
    reg: await doc.embedFont(StandardFonts.Helvetica),
    bold: await doc.embedFont(StandardFonts.HelveticaBold),
    obl: await doc.embedFont(StandardFonts.HelveticaOblique),
  };

  let logo: Ctx["logo"];
  if (logoBytes) {
    try {
      const img = await doc.embedPng(logoBytes);
      logo = { img, w: img.width, h: img.height };
    } catch {
      logo = undefined;
    }
  }

  return {
    doc,
    page: doc.addPage([PAGE.w, PAGE.h]),
    y: PAGE.h - MARGIN,
    fonts,
    pageNo: 1,
    footer,
    logo,
  };
}

/* ---------------------------------------------------------------- */
/* 1) Übungs-Arbeitsblatt einer Stufe                               */
/* ---------------------------------------------------------------- */

export async function buildWorksheetPdf(
  stage: Stage,
  lesson: StageLesson,
  logoBytes?: Uint8Array,
): Promise<Uint8Array> {
  const ctx = await startDoc(
    `Übungen – Stufe ${stage.number}: ${stage.title}`,
    `Werde Meister deiner Gedanken · Stufe ${stage.number} – ${stage.title}`,
    logoBytes,
  );
  ctx.doc.setSubject("Übungs-Arbeitsblatt");

  sectionStageHeader(ctx, stage, "Arbeitsblatt");
  sectionKeyIdea(ctx, lesson);
  sectionExercises(ctx, lesson, true);
  sectionReflection(ctx, lesson, true);
  sectionAffirmation(ctx, lesson.affirmation);

  drawFooter(ctx);
  return ctx.doc.save();
}

/* ---------------------------------------------------------------- */
/* 2) Komplette Lektion einer Stufe                                 */
/* ---------------------------------------------------------------- */

export async function buildLessonPdf(
  stage: Stage,
  lesson: StageLesson,
  logoBytes?: Uint8Array,
): Promise<Uint8Array> {
  const ctx = await startDoc(
    `Lektion – Stufe ${stage.number}: ${stage.title}`,
    `Werde Meister deiner Gedanken · Stufe ${stage.number} – ${stage.title}`,
    logoBytes,
  );
  ctx.doc.setSubject("Lektion");

  sectionStageHeader(ctx, stage, "Lektion");
  sectionKeyIdea(ctx, lesson);
  sectionIntro(ctx, lesson);
  sectionLesson(ctx, lesson);
  sectionExercises(ctx, lesson, false);
  sectionReflection(ctx, lesson, false);
  sectionAffirmation(ctx, lesson.affirmation);

  drawFooter(ctx);
  return ctx.doc.save();
}

/* ---------------------------------------------------------------- */
/* 3) Gesamt-Arbeitsheft über alle Stufen                           */
/* ---------------------------------------------------------------- */

export async function buildWorkbookPdf(
  entries: { stage: Stage; lesson: StageLesson }[],
  logoBytes?: Uint8Array,
): Promise<Uint8Array> {
  const ctx = await startDoc(
    "Das Arbeitsheft – Die 7 Stufen der Bewusstseinsentwicklung",
    "Werde Meister deiner Gedanken · Das Arbeitsheft",
    logoBytes,
  );
  ctx.doc.setSubject("Arbeitsheft – Die 7 Stufen");

  /* ---- Deckblatt ---- */
  // Dezente Brand-Kreise als Hintergrund
  ctx.page.drawCircle({
    x: PAGE.w - 24,
    y: PAGE.h - 36,
    size: 150,
    color: ACCENT,
    opacity: 0.05,
  });
  ctx.page.drawCircle({
    x: 30,
    y: 150,
    size: 170,
    color: rgb(0.16, 0.45, 0.55),
    opacity: 0.04,
  });

  // Logo mittig
  let cy = PAGE.h - 205;
  if (ctx.logo) {
    const lw = 108;
    const lh = (lw * ctx.logo.h) / ctx.logo.w;
    ctx.page.drawImage(ctx.logo.img, {
      x: (PAGE.w - lw) / 2,
      y: cy - lh,
      width: lw,
      height: lh,
    });
    cy -= lh + 30;
  } else {
    cy -= 6;
  }

  // Wortmarke
  centerText(ctx, "WERDE MEISTER DEINER GEDANKEN", cy, ctx.fonts.bold, 10, ACCENT);
  cy -= 46;

  // Titel + Untertitel
  centerText(ctx, "Das Arbeitsheft", cy, ctx.fonts.bold, 34, INK);
  cy -= 26;
  centerText(
    ctx,
    "Die 7 Stufen der Bewusstseinsentwicklung",
    cy,
    ctx.fonts.obl,
    14,
    INK_SOFT,
  );
  cy -= 30;

  // Kurze Akzent-Linie mittig
  ctx.page.drawLine({
    start: { x: PAGE.w / 2 - 30, y: cy },
    end: { x: PAGE.w / 2 + 30, y: cy },
    thickness: 2,
    color: ACCENT,
  });
  cy -= 40;

  // Sieben nummerierte Punkte
  const dot = 22;
  const dotGap = 12;
  const n = entries.length;
  const totalW = n * dot + (n - 1) * dotGap;
  let dx = (PAGE.w - totalW) / 2;
  for (let i = 0; i < n; i += 1) {
    const cxDot = dx + dot / 2;
    ctx.page.drawCircle({
      x: cxDot,
      y: cy,
      size: dot / 2,
      color: ACCENT,
      opacity: 0.08,
      borderColor: ACCENT,
      borderWidth: 1,
    });
    const num = String(i + 1);
    const nw = ctx.fonts.bold.widthOfTextAtSize(num, 10);
    ctx.page.drawText(num, {
      x: cxDot - nw / 2,
      y: cy - 3.5,
      size: 10,
      font: ctx.fonts.bold,
      color: ACCENT,
    });
    dx += dot + dotGap;
  }
  cy -= 42;

  // Einführung mittig
  centerWrap(
    ctx,
    "Dein persönlicher Begleiter durch die 7 Stufen: Lektionen, praktische Übungen und Reflexionsfragen – mit Raum, deine Gedanken festzuhalten. Nimm dir Zeit, arbeite in deinem Tempo und kehre immer wieder zurück.",
    cy,
    ctx.fonts.reg,
    11,
    INK_SOFT,
    400,
    17,
  );

  // Fußbereich mittig
  ctx.page.drawLine({
    start: { x: PAGE.w / 2 - 80, y: 120 },
    end: { x: PAGE.w / 2 + 80, y: 120 },
    thickness: 0.5,
    color: HAIRLINE,
  });
  centerText(ctx, "werdemeisterdeinergedanken.de", 102, ctx.fonts.reg, 9.5, INK_SOFT);

  /* ---- Inhaltsverzeichnis ---- */
  newPage(ctx, false);
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
    sectionStageHeader(ctx, stage, "Lektion");
    sectionKeyIdea(ctx, lesson);
    sectionIntro(ctx, lesson);
    sectionLesson(ctx, lesson);
    sectionExercises(ctx, lesson, true);
    sectionReflection(ctx, lesson, true);
    sectionAffirmation(ctx, lesson.affirmation);
  });

  drawFooter(ctx);
  return ctx.doc.save();
}

/* ---------------------------------------------------------------- */
/* 3b) Kostenloses E-Book „Die 7 Stufen kompakt"                    */
/* ---------------------------------------------------------------- */

/** Kompakte Stufen-Erklärung fürs E-Book (nur Beschreibung + Kerngedanke). */
function sectionEbookStageIntro(ctx: Ctx, stage: Stage, lesson: StageLesson) {
  // Große Stufennummer als dezenter Akzent
  ctx.y -= 6;
  paragraph(ctx, `STUFE ${stage.number}`, {
    font: ctx.fonts.bold,
    size: 9,
    color: ACCENT,
    lineHeight: 13,
  });
  paragraph(ctx, stage.title, {
    font: ctx.fonts.bold,
    size: 22,
    color: INK,
    lineHeight: 26,
  });
  paragraph(ctx, stage.subtitle, {
    font: ctx.fonts.obl,
    size: 12,
    color: ACCENT,
    lineHeight: 16,
    gapAfter: 10,
  });
  paragraph(ctx, stage.description, {
    font: ctx.fonts.reg,
    size: 11,
    color: INK_SOFT,
    lineHeight: 17,
    gapAfter: 14,
  });
  paragraph(ctx, lesson.keyIdea, {
    font: ctx.fonts.obl,
    size: 11.5,
    color: INK,
    lineHeight: 17,
    gapAfter: 16,
  });
}

/** Eine einzelne „erste Übung" – kompakt, ohne Schreiblinien. */
function sectionEbookFirstExercise(ctx: Ctx, exercise: LessonExercise) {
  ensure(ctx, 60);
  divider(ctx, 1, 4, 14);
  paragraph(ctx, "DEINE ERSTE ÜBUNG", {
    font: ctx.fonts.bold,
    size: 9,
    color: ACCENT,
    lineHeight: 13,
    gapAfter: 4,
  });
  paragraph(ctx, exercise.title, {
    font: ctx.fonts.bold,
    size: 13,
    color: INK,
    lineHeight: 18,
  });
  if (exercise.duration) {
    paragraph(ctx, exercise.duration, {
      font: ctx.fonts.obl,
      size: 9.5,
      color: ACCENT,
      lineHeight: 13,
      gapAfter: 4,
    });
  }
  const stepIndent = MARGIN + 20;
  exercise.steps.forEach((step, s) => {
    ensure(ctx, 16);
    ctx.y -= 16;
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
  ctx.y -= 8;
}

/**
 * Das kostenlose Lead-Magnet-E-Book: „Die 7 Stufen kompakt erklärt –
 * Erste Übungen für mehr Klarheit". Bewusst schlank gehalten: pro Stufe
 * eine kompakte Erklärung und genau eine sofort umsetzbare erste Übung.
 * Der ausführliche Weg (Lektionen, alle Übungen, Reflexion) lebt im
 * Arbeitsheft bzw. Mitgliederbereich.
 */
export async function buildEbookPdf(
  entries: { stage: Stage; lesson: StageLesson }[],
  logoBytes?: Uint8Array,
): Promise<Uint8Array> {
  const ctx = await startDoc(
    "Die 7 Stufen kompakt – Werde Meister deiner Gedanken",
    "Werde Meister deiner Gedanken · Die 7 Stufen kompakt",
    logoBytes,
  );
  ctx.doc.setSubject("Kostenloses E-Book – Die 7 Stufen kompakt");

  /* ---- Deckblatt ---- */
  ctx.page.drawCircle({
    x: PAGE.w - 24,
    y: PAGE.h - 36,
    size: 150,
    color: ACCENT,
    opacity: 0.05,
  });
  ctx.page.drawCircle({
    x: 30,
    y: 150,
    size: 170,
    color: rgb(0.16, 0.45, 0.55),
    opacity: 0.04,
  });

  let cy = PAGE.h - 205;
  if (ctx.logo) {
    const lw = 108;
    const lh = (lw * ctx.logo.h) / ctx.logo.w;
    ctx.page.drawImage(ctx.logo.img, {
      x: (PAGE.w - lw) / 2,
      y: cy - lh,
      width: lw,
      height: lh,
    });
    cy -= lh + 30;
  } else {
    cy -= 6;
  }

  centerText(ctx, "WERDE MEISTER DEINER GEDANKEN", cy, ctx.fonts.bold, 10, ACCENT);
  cy -= 30;
  centerText(ctx, "Kostenloses E-Book", cy, ctx.fonts.reg, 11, INK_SOFT);
  cy -= 40;

  centerText(ctx, "Die 7 Stufen kompakt", cy, ctx.fonts.bold, 32, INK);
  cy -= 30;
  centerWrap(
    ctx,
    "Erste Übungen für mehr Klarheit",
    cy,
    ctx.fonts.obl,
    15,
    INK_SOFT,
    400,
    20,
  );
  cy -= 34;

  ctx.page.drawLine({
    start: { x: PAGE.w / 2 - 30, y: cy },
    end: { x: PAGE.w / 2 + 30, y: cy },
    thickness: 2,
    color: ACCENT,
  });
  cy -= 40;

  // Sieben nummerierte Punkte
  const dot = 22;
  const dotGap = 12;
  const n = entries.length;
  const totalW = n * dot + (n - 1) * dotGap;
  let dx = (PAGE.w - totalW) / 2;
  for (let i = 0; i < n; i += 1) {
    const cxDot = dx + dot / 2;
    ctx.page.drawCircle({
      x: cxDot,
      y: cy,
      size: dot / 2,
      color: ACCENT,
      opacity: 0.08,
      borderColor: ACCENT,
      borderWidth: 1,
    });
    const num = String(i + 1);
    const nw = ctx.fonts.bold.widthOfTextAtSize(num, 10);
    ctx.page.drawText(num, {
      x: cxDot - nw / 2,
      y: cy - 3.5,
      size: 10,
      font: ctx.fonts.bold,
      color: ACCENT,
    });
    dx += dot + dotGap;
  }
  cy -= 42;

  centerWrap(
    ctx,
    "Ein kompakter Überblick über die 7 Stufen der Bewusstseinsentwicklung – mit einer ersten Übung pro Stufe, die du sofort ausprobieren kannst.",
    cy,
    ctx.fonts.reg,
    11,
    INK_SOFT,
    400,
    17,
  );

  ctx.page.drawLine({
    start: { x: PAGE.w / 2 - 80, y: 120 },
    end: { x: PAGE.w / 2 + 80, y: 120 },
    thickness: 0.5,
    color: HAIRLINE,
  });
  centerText(ctx, "werdemeisterdeinergedanken.de", 102, ctx.fonts.reg, 9.5, INK_SOFT);

  /* ---- Willkommen / So nutzt du dieses E-Book ---- */
  newPage(ctx);
  ctx.footer = "Werde Meister deiner Gedanken · Die 7 Stufen kompakt";
  sectionDocHeader(
    ctx,
    "Zum Einstieg",
    "Schön, dass du da bist",
    "Der erste Schritt aus dem Autopilot",
  );
  paragraph(
    ctx,
    "Die meisten von uns leben große Teile ihres Lebens im Autopilot: Wir reagieren, funktionieren und wiederholen – gesteuert von Gedanken und Mustern, die wir nie bewusst gewählt haben. Bewusstseinsentwicklung bedeutet, Schritt für Schritt vom automatischen Reagieren zum bewussten Gestalten zu kommen.",
    { size: 11, lineHeight: 17, gapAfter: 12 },
  );
  paragraph(
    ctx,
    "Dieses E-Book zeigt dir die 7 Stufen dieses Weges kompakt im Überblick. Zu jeder Stufe bekommst du eine erste, sofort umsetzbare Übung. Du musst nicht alles auf einmal tun – lies in Ruhe, probiere aus, was dich anspricht, und komme immer wieder zurück.",
    { size: 11, lineHeight: 17, gapAfter: 12 },
  );
  paragraph(
    ctx,
    "Ein Hinweis vorweg: Es geht nicht um Perfektion. Es geht darum, wacher zu werden – eine Spur bewusster als gestern. Genau das ist schon der ganze Anfang.",
    { size: 11, lineHeight: 17, gapAfter: 4 },
  );
  sectionAffirmation(
    ctx,
    "Was du bewusst bemerkst, kann beginnen, sich zu verändern.",
    "Dein Leitgedanke",
  );

  /* ---- Überblick: Die 7 Stufen ---- */
  newPage(ctx);
  paragraph(ctx, "Die 7 Stufen im Überblick", {
    font: ctx.fonts.bold,
    size: 20,
    color: INK,
    lineHeight: 26,
    gapAfter: 14,
  });
  entries.forEach(({ stage }) => {
    ensure(ctx, 46);
    ctx.y -= 22;
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
      y: ctx.y - 14,
      size: 9.5,
      font: ctx.fonts.obl,
      color: INK_SOFT,
    });
    ctx.y -= 14;
    ctx.page.drawLine({
      start: { x: MARGIN, y: ctx.y - 10 },
      end: { x: PAGE.w - MARGIN, y: ctx.y - 10 },
      thickness: 0.5,
      color: HAIRLINE,
    });
    ctx.y -= 10;
  });

  /* ---- Die einzelnen Stufen ---- */
  entries.forEach(({ stage, lesson }) => {
    newPage(ctx);
    ctx.footer = `Werde Meister deiner Gedanken · Stufe ${stage.number} – ${stage.title}`;
    sectionEbookStageIntro(ctx, stage, lesson);
    const first = lesson.exercises[0];
    if (first) sectionEbookFirstExercise(ctx, first);
  });

  /* ---- Abschluss / Wie es weitergeht ---- */
  newPage(ctx);
  ctx.footer = "Werde Meister deiner Gedanken · Die 7 Stufen kompakt";
  sectionDocHeader(
    ctx,
    "Wie es weitergeht",
    "Dein nächster Schritt",
    "Aus Impuls wird Praxis",
  );
  paragraph(
    ctx,
    "Du hast jetzt einen Überblick über die 7 Stufen und zu jeder Stufe eine erste Übung an der Hand. Der eigentliche Wandel entsteht nicht durch Wissen, sondern durch Wiederholung: Nimm dir eine einzige Übung vor und bleib ein paar Tage dabei.",
    { size: 11, lineHeight: 17, gapAfter: 12 },
  );
  paragraph(
    ctx,
    "Wenn du tiefer gehen möchtest, findest du im Mitgliederbereich zu jeder Stufe die vollständige Lektion, alle Übungen, Reflexionsfragen und ein Arbeitsheft zum Ausfüllen – Schritt für Schritt vom Autopilot zur Meisterschaft.",
    { size: 11, lineHeight: 17, gapAfter: 4 },
  );
  sectionAffirmation(
    ctx,
    "Du reagierst nicht mehr – du gestaltest.",
    "Dein Ziel",
  );
  paragraph(ctx, "Mehr auf werdemeisterdeinergedanken.de", {
    font: ctx.fonts.obl,
    size: 10.5,
    color: ACCENT,
    lineHeight: 16,
    gapAfter: 0,
  });

  drawFooter(ctx);
  return ctx.doc.save();
}

/* ---------------------------------------------------------------- */
/* 4) Vertiefung (Deep-Dive) als PDF                                */
/* ---------------------------------------------------------------- */

export async function buildDeepDivePdf(
  dive: DeepDive,
  logoBytes?: Uint8Array,
): Promise<Uint8Array> {
  const ctx = await startDoc(
    `Vertiefung – ${dive.title}`,
    `Werde Meister deiner Gedanken · Vertiefung: ${dive.title}`,
    logoBytes,
  );
  ctx.doc.setSubject("Vertiefung");

  // Auf die vorhandenen Bausteine abbilden
  const lesson: StageLesson = {
    number: "",
    keyIdea: dive.keyIdea,
    intro: dive.intro,
    sections: dive.sections,
    exercises: dive.exercises,
    reflection: dive.reflection,
    affirmation: dive.takeaway,
    video: dive.video,
  };

  sectionDocHeader(ctx, `Vertiefung · ${dive.category}`, dive.title, dive.subtitle);
  sectionKeyIdea(ctx, lesson);
  sectionIntro(ctx, lesson);
  sectionLesson(ctx, lesson);
  sectionExercises(ctx, lesson, false);
  sectionReflection(ctx, lesson, false);
  sectionAffirmation(ctx, dive.takeaway, "Kernbotschaft");

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
