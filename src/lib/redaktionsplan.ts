/**
 * Redaktionsplan – Datenmodell & Standard-Plan (20 Wochen).
 *
 * Dies ist die „Quelle der Wahrheit" für den **Standard**-Redaktionsplan, den
 * das Admin-Cockpit beim ersten Aufruf in die Datenbank importieren kann
 * (Tabelle `redaktionsplan_posts`, Migration 0013). Danach werden Posts in der
 * DB bearbeitet – dieses Modul liefert weiterhin die **Wochen-Metadaten**
 * (Serie, Block, Titel) und den Seed für „zurücksetzen / neu importieren".
 *
 * Prinzip: ein Wochenthema, alle Kanäle gleichzeitig. Fokussierte Frequenz
 * (IG 4× · FB 3× · LinkedIn 3× · YouTube 1× + Short). Alle Inhalte verweisen
 * auf vorhandenes Projekt-Material (reels.ts, blog.ts, deep-dives.ts,
 * practices.ts, Carousels, Zitate).
 */

export type Kanal = "ig" | "fb" | "li" | "yt";
export type Block = "A" | "B" | "C";

/** Status eines Posts in der Produktion. */
export type PostStatus = "geplant" | "erstellt" | "veroeffentlicht";

export const KANAL_LABEL: Record<Kanal, string> = {
  ig: "Instagram",
  fb: "Facebook",
  li: "LinkedIn",
  yt: "YouTube",
};

export const STATUS_LABEL: Record<PostStatus, string> = {
  geplant: "geplant",
  erstellt: "erstellt",
  veroeffentlicht: "veröffentlicht",
};

/** Wochentag als Zahl: 1 = Montag … 7 = Sonntag. */
export const WOCHENTAGE = [
  "Montag",
  "Dienstag",
  "Mittwoch",
  "Donnerstag",
  "Freitag",
  "Samstag",
  "Sonntag",
] as const;

export type PlanPost = {
  wochentag: number; // 1..7
  uhrzeit: string;
  kanal: Kanal;
  format: string;
  titel: string;
  quelle: string;
  cta: string;
  optional?: boolean;
};

export type WochenMeta = {
  woche: number;
  block: Block;
  serie: string;
  /** Kurzlabel (z. B. für Umschalter). */
  thema: string;
  /** Banner-Überschrift. */
  titel: string;
};

export type PlanWoche = WochenMeta & { posts: PlanPost[] };

// ---------------------------------------------------------------------------
// Builder – die Tagesstruktur ist jede Woche gleich, nur die Bausteine wechseln.
// ---------------------------------------------------------------------------

type SpecA = {
  n: number;
  next?: string;
  reelHook: string;
  liBeitrag: string;
  carousel: string;
  carouselSrc: string;
  blogTitle: string;
  blogSlug: string;
  video: string;
  practice: string;
  practiceName: string;
  poll: string;
  pitch: string;
  community: string;
};

/** Block A · Die 7 Stufen (mit Stufen-Lektion-Bezug). */
function mkWeekA(s: SpecA): PlanPost[] {
  return [
    { wochentag: 1, uhrzeit: "18:00", kanal: "ig", format: "🎬 Reel", titel: `„${s.reelHook}“`, quelle: "Reel-Serie stufen", cta: "Folgen · Speichern" },
    { wochentag: 1, uhrzeit: "19:00", kanal: "fb", format: "🎬 Reel", titel: "Gleiches Reel als Cross-Post + 2–3 Sätze Kontext.", quelle: "s. IG", cta: "Kommentar-Frage" },
    { wochentag: 2, uhrzeit: "07:30", kanal: "li", format: "📝 Beitrag", titel: `„${s.liBeitrag}“ — Stufe ${s.n} im Arbeitsalltag.`, quelle: `Blog ${s.blogSlug}`, cta: "Diskussion" },
    { wochentag: 2, uhrzeit: "12:30", kanal: "ig", format: "🖼️ Carousel", titel: `„${s.carousel}“ — Cover → Kernidee → Aha → CTA.`, quelle: s.carouselSrc, cta: "Speichern & Teilen" },
    { wochentag: 3, uhrzeit: "08:00", kanal: "fb", format: "📝 Beitrag", titel: `Blog-Anriss + Link „${s.blogTitle}“.`, quelle: `Blog ${s.blogSlug}`, cta: "Blog-Klick" },
    { wochentag: 3, uhrzeit: "09:00", kanal: "li", format: "🖼️ Carousel", titel: `Document-Post: „${s.carousel}“ (sachlicher Ton).`, quelle: "Carousel-Slides", cta: "Website" },
    { wochentag: 3, uhrzeit: "17:00", kanal: "yt", format: "▶️ Video", titel: `Hauptvideo (6–8 min): „${s.video}“`, quelle: `Blog + Stufe-${s.n}-Lektion + Deep-Dive`, cta: "Abo · E-Book in Beschreibung" },
    { wochentag: 3, uhrzeit: "17:30", kanal: "yt", format: "⚡ Short", titel: "Reel als Short zweitverwertet, verlinkt aufs Hauptvideo.", quelle: "Reel (Mo)", cta: "Zum Hauptvideo" },
    { wochentag: 4, uhrzeit: "19:00", kanal: "ig", format: "📚 Story", titel: `3-teilig: Umfrage („${s.poll}“) → Auflösung → Mini-Übung „${s.practiceName}“.`, quelle: `practices.ts · ${s.practice}`, cta: "Antwort-Sticker · Blog-Link" },
    { wochentag: 5, uhrzeit: "07:30", kanal: "li", format: "🎯 Pitch", titel: `„${s.pitch}“ Soft-Pitch E-Book „Die 7 Stufen kompakt“.`, quelle: "Funnel /#ebook", cta: "E-Book laden" },
    { wochentag: 5, uhrzeit: "08:00", kanal: "ig", format: "💬 Zitat + 🎯 Pitch", titel: `Zitatkarte zum Thema + Story-Verweis auf E-Book / Stufe ${s.n}.`, quelle: `zitate/ · /mitglieder/stufe/${s.n}`, cta: "Link in Bio" },
    { wochentag: 5, uhrzeit: "17:00", kanal: "fb", format: "💬 Zitat/Studie", titel: `Community-Frage: „${s.community}“ + Zitatkarte.`, quelle: "docs/marketing/zitate/", cta: "Kommentare" },
    { wochentag: 6, uhrzeit: "opt.", kanal: "ig", format: "📚 Story", titel: `Optional: Wochen-Recap-Story „Das war Stufe ${s.n}“${s.next ? " + Ausblick auf " + s.next : ""}.`, quelle: "—", cta: "Bindung", optional: true },
    { wochentag: 7, uhrzeit: "opt.", kanal: "fb", format: "📝 Beitrag", titel: "Optional: leiser Reflexions-Post / Zitat als Wochenausklang.", quelle: "docs/marketing/zitate/", cta: "Nähe", optional: true },
  ];
}

type SpecB = {
  next?: string;
  /** Bezeichnung der Langform (Standard „Blog"); z. B. „Vertiefung", wenn kein Blog existiert. */
  langform?: string;
  reelHook: string;
  reelSrc: string;
  liBeitrag: string;
  carousel: string;
  carouselSrc: string;
  blogTitle: string;
  blogSlug: string;
  video: string;
  videoSrc: string;
  practice: string;
  practiceName: string;
  poll: string;
  pitch: string;
  pitchHref: string;
  community: string;
  zitate: string;
  recap: string;
};

/** Block B & C (Praxis/Wissenschaft, Mentale Selbstverteidigung) – ohne Stufen-Bezug. */
function mkWeekB(s: SpecB): PlanPost[] {
  const lf = s.langform ?? "Blog";
  const istBlog = lf === "Blog";
  return [
    { wochentag: 1, uhrzeit: "18:00", kanal: "ig", format: "🎬 Reel", titel: `„${s.reelHook}“`, quelle: s.reelSrc, cta: "Folgen · Speichern" },
    { wochentag: 1, uhrzeit: "19:00", kanal: "fb", format: "🎬 Reel", titel: "Gleiches Reel als Cross-Post + 2–3 Sätze Kontext.", quelle: "s. IG", cta: "Kommentar-Frage" },
    { wochentag: 2, uhrzeit: "07:30", kanal: "li", format: "📝 Beitrag", titel: `„${s.liBeitrag}“`, quelle: `${lf} ${s.blogSlug}`, cta: "Diskussion" },
    { wochentag: 2, uhrzeit: "12:30", kanal: "ig", format: "🖼️ Carousel", titel: `„${s.carousel}“ — Cover → Kernidee → Aha → CTA.`, quelle: s.carouselSrc, cta: "Speichern & Teilen" },
    { wochentag: 3, uhrzeit: "08:00", kanal: "fb", format: "📝 Beitrag", titel: `${istBlog ? "Blog-Anriss + Link" : "Teaser + Link zur Vertiefung"} „${s.blogTitle}“.`, quelle: `${lf} ${s.blogSlug}`, cta: istBlog ? "Blog-Klick" : "Zur Vertiefung" },
    { wochentag: 3, uhrzeit: "09:00", kanal: "li", format: "🖼️ Carousel", titel: `Document-Post: „${s.carousel}“ (sachlicher Ton).`, quelle: s.carouselSrc, cta: "Website" },
    { wochentag: 3, uhrzeit: "17:00", kanal: "yt", format: "▶️ Video", titel: `Hauptvideo (6–8 min): „${s.video}“`, quelle: s.videoSrc, cta: "Abo · E-Book in Beschreibung" },
    { wochentag: 3, uhrzeit: "17:30", kanal: "yt", format: "⚡ Short", titel: "Reel als Short zweitverwertet, verlinkt aufs Hauptvideo.", quelle: "Reel (Mo)", cta: "Zum Hauptvideo" },
    { wochentag: 4, uhrzeit: "19:00", kanal: "ig", format: "📚 Story", titel: `3-teilig: Umfrage („${s.poll}“) → Auflösung → Mini-Übung „${s.practiceName}“.`, quelle: `practices.ts · ${s.practice}`, cta: "Antwort-Sticker · Blog-Link" },
    { wochentag: 5, uhrzeit: "07:30", kanal: "li", format: "🎯 Pitch", titel: `„${s.pitch}“ Soft-Pitch E-Book „Die 7 Stufen kompakt“.`, quelle: "Funnel /#ebook", cta: "E-Book laden" },
    { wochentag: 5, uhrzeit: "08:00", kanal: "ig", format: "💬 Zitat + 🎯 Pitch", titel: "Studien-/Zitatkarte + Story-Verweis auf E-Book / Vertiefung.", quelle: `${s.zitate} · ${s.pitchHref}`, cta: "Link in Bio" },
    { wochentag: 5, uhrzeit: "17:00", kanal: "fb", format: "💬 Zitat/Studie", titel: `Community-Frage: „${s.community}“ + Karte.`, quelle: s.zitate, cta: "Kommentare" },
    { wochentag: 6, uhrzeit: "opt.", kanal: "ig", format: "📚 Story", titel: `Optional: Wochen-Recap-Story „${s.recap}“${s.next ? " + Ausblick auf " + s.next : ""}.`, quelle: "—", cta: "Bindung", optional: true },
    { wochentag: 7, uhrzeit: "opt.", kanal: "fb", format: "📝 Beitrag", titel: "Optional: leiser Reflexions-Post / Zitat als Wochenausklang.", quelle: "docs/marketing/zitate/", cta: "Nähe", optional: true },
  ];
}

// ---------------------------------------------------------------------------
// Der Standard-Plan: 20 Wochen (Block A · 7 Stufen · B · Praxis/Wissenschaft ·
// C · Mentale Selbstverteidigung).
// ---------------------------------------------------------------------------

export const DEFAULT_PLAN: PlanWoche[] = [
  // ---- Block A · Die 7 Stufen -------------------------------------------
  { woche: 1, block: "A", serie: "Die 7 Stufen", thema: "Autopilot", titel: "Stufe 1 · Autopilot — Wie oft entscheidest du wirklich?",
    posts: mkWeekA({ n: 1, next: "Stufe 2 · Erwachen",
      reelHook: "Ich hab mal einen Tag lang mitgezählt, wie oft ich wirklich entscheide.",
      liBeitrag: "Wie viele Entscheidungen triffst du im Meeting wirklich bewusst?",
      carousel: "Bis zu 60.000 Gedanken am Tag", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Drei Muster, die dich unbewusst steuern", blogSlug: "drei-muster-die-dich-unbewusst-steuern",
      video: "Autopilot: Warum du weniger entscheidest, als du denkst.",
      practice: "autopilot-check", practiceName: "Der Autopilot-Check",
      poll: "Wie viel % läuft bei dir auf Autopilot?",
      pitch: "Bewusster entscheiden lässt sich üben – in 7 Stufen.",
      community: "Welche Gewohnheit machst du komplett automatisch?" }) },
  { woche: 2, block: "A", serie: "Die 7 Stufen", thema: "Erwachen", titel: "Stufe 2 · Erwachen — Wer hört zu, wenn du denkst?",
    posts: mkWeekA({ n: 2, next: "Stufe 3 · Selbstbeobachtung",
      reelHook: "Wenn du deine Gedanken hören kannst – wer hört dann eigentlich zu?",
      liBeitrag: "Zwischen Reiz und Reaktion liegt ein Moment – im Job entscheidet er über alles.",
      carousel: "Du bist nicht deine Gedanken", carouselSrc: "carousels/stufen-ueberblick.mjs",
      blogTitle: "Du bist nicht deine Gedanken", blogSlug: "du-bist-nicht-deine-gedanken",
      video: "Erwachen: Der Moment, in dem du dich beim Denken erwischst.",
      practice: "atembeobachtung", practiceName: "Atembeobachtung",
      poll: "Ertappst du dich manchmal im Gedankenkarussell?",
      pitch: "Den Beobachter kannst du trainieren – Schritt für Schritt.",
      community: "Wann hast du dich zuletzt beim Denken „erwischt“?" }) },
  { woche: 3, block: "A", serie: "Die 7 Stufen", thema: "Selbstbeobachtung", titel: "Stufe 3 · Selbstbeobachtung — Nicht in jeden Gedanken springen",
    posts: mkWeekA({ n: 3, next: "Stufe 4 · Emotionale Reifung",
      reelHook: "Ich bin früher in jeden einzelnen Gedanken reingesprungen.",
      liBeitrag: "Nicht jeder Gedanke verdient eine Reaktion – gilt auch fürs Postfach.",
      carousel: "Setz dich ans Ufer", carouselSrc: "carousels/stufen-ueberblick.mjs",
      blogTitle: "Denkfehler: Wie dein Kopf die Wirklichkeit verzerrt", blogSlug: "denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt",
      video: "Selbstbeobachtung: Gedanken sehen, ohne mitzuspringen.",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Welcher Denkfehler erwischt dich am häufigsten?",
      pitch: "Beobachten statt reagieren – das ist Übungssache.",
      community: "In welche Gedanken springst du am schnellsten rein?" }) },
  { woche: 4, block: "A", serie: "Die 7 Stufen", thema: "Emotionale Reifung", titel: "Stufe 4 · Emotionale Reifung — Fühlen, ohne überflutet zu werden",
    posts: mkWeekA({ n: 4, next: "Stufe 5 · Schöpferkraft",
      reelHook: "Ich hab mal auf die Uhr geschaut, wie lang ein schweres Gefühl wirklich dauert.",
      liBeitrag: "Emotionen im Job wegdrücken kostet Energie – benennen entlastet.",
      carousel: "Fühlen, was ist", carouselSrc: "carousels/stufen-ueberblick.mjs",
      blogTitle: "Warum ein Gefühl zu benennen dein Gehirn beruhigt", blogSlug: "gefuehle-benennen-beruhigt-das-gehirn",
      video: "Emotionale Reifung: Fühlen, ohne überflutet zu werden.",
      practice: "verlaengertes-ausatmen", practiceName: "Verlängertes Ausatmen",
      poll: "Was machst du, wenn ein Gefühl nicht gehen will?",
      pitch: "Gefühle regulieren lässt sich lernen – ganz ohne Wegdrücken.",
      community: "Welches Gefühl fällt dir am schwersten zuzulassen?" }) },
  { woche: 5, block: "A", serie: "Die 7 Stufen", thema: "Schöpferkraft", titel: "Stufe 5 · Schöpferkraft — Du schreibst den Code neu",
    posts: mkWeekA({ n: 5, next: "Stufe 6 · Innere Ausrichtung",
      reelHook: "Was du oft denkst, wird zur Straße in deinem Kopf. Und das ist wörtlich gemeint.",
      liBeitrag: "Neuroplastizität heißt: Auch berufliche Muster sind veränderbar.",
      carousel: "Du schreibst den Code neu", carouselSrc: "carousels/stufen-ueberblick.mjs",
      blogTitle: "Neuroplastizität: Warum sich dein Gehirn ein Leben lang verändert", blogSlug: "neuroplastizitaet-warum-dein-gehirn-formbar-ist",
      video: "Schöpferkraft: Wie du neue Bahnen im Kopf anlegst.",
      practice: "morgen-ausrichtung", practiceName: "Morgen-Ausrichtung",
      poll: "Welche mentale Gewohnheit willst du neu anlegen?",
      pitch: "Neue Denk-Bahnen entstehen durch Wiederholung – hier ist der Weg.",
      community: "Welchen Gedanken denkst du zu oft?" }) },
  { woche: 6, block: "A", serie: "Die 7 Stufen", thema: "Innere Ausrichtung", titel: "Stufe 6 · Innere Ausrichtung — Kopf, Herz und Handeln",
    posts: mkWeekA({ n: 6, next: "Stufe 7 · Meisterschaft",
      reelHook: "Dein Kopf ist ein brillanter Diener. Aber ein ziemlich schlechter Chef.",
      liBeitrag: "Willenskraft ist überschätzt – Ausrichtung schlägt Disziplin.",
      carousel: "Kopf, Herz und Handeln", carouselSrc: "carousels/stufen-ueberblick.mjs",
      blogTitle: "Warum Willenskraft überschätzt wird", blogSlug: "warum-willenskraft-ueberschaetzt-wird",
      video: "Innere Ausrichtung: Wenn Kopf, Herz und Handeln zusammenfinden.",
      practice: "herz-kohaerenz", practiceName: "Herz-Kohärenz",
      poll: "Woran merkst du, dass du „aus der Spur“ bist?",
      pitch: "Ausrichtung statt Dauerdisziplin – so findest du sie.",
      community: "Was gibt dir im Alltag wieder Klarheit?" }) },
  { woche: 7, block: "A", serie: "Die 7 Stufen", thema: "Meisterschaft", titel: "Stufe 7 · Meisterschaft — Was nach den 7 Stufen kommt",
    posts: mkWeekA({ n: 7, next: "Block B · Praxis & Wissenschaft",
      reelHook: "Niemand ist für immer Meister. Ich auch nicht.",
      liBeitrag: "Souveränität heißt nicht, nie getriggert zu werden – sondern schneller zurückzufinden.",
      carousel: "Meister deiner Gedanken", carouselSrc: "carousels/stufen-ueberblick.mjs",
      blogTitle: "Wie frei ist unser Geist?", blogSlug: "wie-frei-ist-unser-geist",
      video: "Meisterschaft: Was nach den 7 Stufen kommt.",
      practice: "box-breathing", practiceName: "Box Breathing",
      poll: "Was hilft dir, nach einem Trigger schnell zurückzufinden?",
      pitch: "Der ganze Weg in 7 Stufen – starte mit dem kostenlosen E-Book.",
      community: "Was hat sich verändert, seit du bewusster denkst?" }) },

  // ---- Block B · Praxis & Wissenschaft ----------------------------------
  { woche: 8, block: "B", serie: "Praxis & Wissenschaft", thema: "Atmung", titel: "Atmung & Nervensystem — Der schnellste Weg zur Ruhe",
    posts: mkWeekB({ next: "Woche 9 · Meditation",
      reelHook: "Ausatmen länger als einatmen – und dein Nervensystem schaltet um.", reelSrc: "Reel-Serie praxis",
      liBeitrag: "Vor dem schwierigen Gespräch: vier bewusste Atemzüge. Kein Eso – pure Physiologie.",
      carousel: "4 Wege zur mentalen Freiheit", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Warum ein Gefühl zu benennen dein Gehirn beruhigt", blogSlug: "gefuehle-benennen-beruhigt-das-gehirn",
      video: "Atmung & Nervensystem: 3 Übungen, die dich in 2 Minuten runterbringen.", videoSrc: "Blog + Praxis-Übungen + Deep-Dive muster-und-koerper",
      practice: "vier-sechs-atmung", practiceName: "4-6-Atmung",
      poll: "Wie atmest du gerade – flach oder tief?",
      pitch: "Ruhe auf Knopfdruck lässt sich trainieren.", pitchHref: "/mitglieder/praxis",
      community: "Welche Atem-Übung hilft dir am schnellsten?",
      zitate: "docs/marketing/zitate/", recap: "Atem-Woche" }) },
  { woche: 9, block: "B", serie: "Praxis & Wissenschaft", thema: "Meditation", titel: "Was Meditation wirklich im Gehirn verändert",
    posts: mkWeekB({ next: "Woche 10 · Placebo & Erwartung",
      reelHook: "Fast die Hälfte des Tages bist du gedanklich woanders.", reelSrc: "Reel-Serie wissenschaft",
      liBeitrag: "Meditation ist kein Wellness-Gimmick – die Bildgebung zeigt messbare Veränderungen.",
      carousel: "Studien-Fakten", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Was Meditation wirklich im Gehirn verändert", blogSlug: "was-meditation-im-gehirn-veraendert",
      video: "Was Meditation wirklich im Gehirn verändert (laut Forschung).", videoSrc: "Blog + Studien-Zitate + Reel-Serie wissenschaft",
      practice: "atembeobachtung", practiceName: "Atembeobachtung",
      poll: "Wie oft schweifst du am Tag gedanklich ab?",
      pitch: "Schon wenige Minuten täglich verändern messbar etwas.", pitchHref: "/mitglieder/praxis",
      community: "Was hält dich vom regelmäßigen Meditieren ab?",
      zitate: "docs/marketing/zitate/studien-4x5", recap: "Meditations-Woche" }) },
  { woche: 10, block: "B", serie: "Praxis & Wissenschaft", thema: "Placebo", titel: "Der Placebo-Effekt — Wie Erwartung deinen Körper verändert",
    posts: mkWeekB({ next: "Block C · Mentale Selbstverteidigung",
      reelHook: "Eine Überzeugung verändert echte Körperprozesse.", reelSrc: "Reel-Serie wissenschaft",
      liBeitrag: "Erwartung ist ein Wirkstoff – im Guten wie im Schlechten, auch im Team.",
      carousel: "Studien-Fakten", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Der Placebo-Effekt: Wie eine Erwartung deinen Körper verändert", blogSlug: "der-placebo-effekt-wie-erwartung-wirkt",
      video: "Der Placebo-Effekt: Wie Erwartung echte Körperprozesse steuert.", videoSrc: "Blog + Deep-Dive muster-und-koerper + Studien-Zitate",
      practice: "morgen-ausrichtung", practiceName: "Morgen-Ausrichtung",
      poll: "Hast du den Placebo-Effekt schon mal an dir bemerkt?",
      pitch: "Erwartung bewusst setzen – das ist der Anfang.", pitchHref: "/mitglieder",
      community: "Wo hat dich eine Erwartung schon mal getäuscht?",
      zitate: "docs/marketing/zitate/studien-4x5", recap: "Placebo-Woche" }) },

  // ---- Block C · Mentale Selbstverteidigung -----------------------------
  { woche: 11, block: "C", serie: "Mentale Selbstverteidigung", thema: "Framing", titel: "Framing — Wie ein Wort deine Meinung macht",
    posts: mkWeekB({ next: "Woche 12 · Filterblase",
      reelHook: "Ein Wort ändert alles.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Reform oder Kürzung? Dasselbe Gesetz – zwei Urteile. Achte in Meetings auf den Rahmen.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Framing: Wie ein einziges Wort deine Meinung macht", blogSlug: "framing-wie-ein-wort-deine-meinung-macht",
      video: "Framing: Wie Sprache dein Urteil lenkt.", videoSrc: "Blog + Deep-Dive framing",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Investition oder Ausgabe – welches Wort klingt besser?",
      pitch: "Den Rahmen erkennen, bevor du das Urteil übernimmst – das ist Übungssache.", pitchHref: "/mitglieder/wissen/framing",
      community: "Welches Wort verändert für dich alles?",
      zitate: "docs/marketing/zitate/", recap: "Framing-Woche" }) },
  { woche: 12, block: "C", serie: "Mentale Selbstverteidigung", thema: "Filterblase", titel: "Filterblase & Algorithmen — Warum dein Feed nicht die Welt ist",
    posts: mkWeekB({ next: "Woche 13 · Wiederholung = Wahrheit",
      reelHook: "Dein Feed ≠ die Welt.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Dein Feed zeigt dir Zustimmung – gute Entscheidungen brauchen Widerspruch.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Die Filterblase: Warum dein Feed nicht die Welt ist", blogSlug: "filterblase-warum-dein-feed-nicht-die-welt-ist",
      video: "Die Filterblase: Warum dein Feed nicht die Welt ist.", videoSrc: "Blog + Deep-Dive algorithmen",
      practice: "autopilot-check", practiceName: "Der Autopilot-Check",
      poll: "Wie oft widersprichst du deinem eigenen Feed?",
      pitch: "Den Algorithmus durchschauen kannst du lernen.", pitchHref: "/mitglieder/wissen/algorithmen",
      community: "Wann hat dein Feed dich zuletzt getäuscht?",
      zitate: "docs/marketing/zitate/", recap: "Filterblasen-Woche" }) },
  { woche: 13, block: "C", serie: "Mentale Selbstverteidigung", thema: "Wiederholung", titel: "Wiederholung = Wahrheit? — Warum „oft gehört“ sich wie „wahr“ anfühlt",
    posts: mkWeekB({ next: "Woche 14 · Reizüberflutung",
      reelHook: "Oft gehört = wahr?", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Was oft genug wiederholt wird, klingt wahr – auch im Unternehmen.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Warum sich „oft gehört“ wie „wahr“ anfühlt", blogSlug: "warum-oft-gehoert-sich-wie-wahr-anfuehlt",
      video: "Wiederholung: Warum sich „oft gehört“ wie „wahr“ anfühlt.", videoSrc: "Blog + Deep-Dive wiederholung-wahrheit",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Was hältst du für wahr, nur weil du es oft hörst?",
      pitch: "Den Wahrheits-Reflex hinterfragen – Schritt für Schritt.", pitchHref: "/mitglieder/wissen/wiederholung-wahrheit",
      community: "Welche „Wahrheit“ hast du zuletzt hinterfragt?",
      zitate: "docs/marketing/zitate/", recap: "Wiederholungs-Woche" }) },
  { woche: 14, block: "C", serie: "Mentale Selbstverteidigung", thema: "Reizüberflutung", titel: "Reizüberflutung — Warum dein Gehirn nicht mehr abschaltet",
    posts: mkWeekB({ next: "Woche 15 · Werbung & Mangel",
      reelHook: "Dein Gehirn im Daueralarm.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Dauer-Erreichbarkeit ist kein Fleiß – sie kostet Urteilskraft.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Reizüberflutung: Warum dein Gehirn nicht mehr abschaltet", blogSlug: "reizueberflutung-warum-dein-gehirn-nicht-abschaltet",
      video: "Reizüberflutung: Warum dein Gehirn nicht mehr abschaltet.", videoSrc: "Blog + Deep-Dive reizueberflutung",
      practice: "atembeobachtung", practiceName: "Atembeobachtung",
      poll: "Wie oft ist dein Kopf im Daueralarm?",
      pitch: "Dem Reizsturm bewusst begegnen – das lässt sich üben.", pitchHref: "/mitglieder/wissen/reizueberflutung",
      community: "Wie schaffst du dir Ruhe im Reizsturm?",
      zitate: "docs/marketing/zitate/", recap: "Reizüberflutungs-Woche" }) },
  { woche: 15, block: "C", serie: "Mentale Selbstverteidigung", thema: "Werbung", titel: "Werbung & Mangel — Sie verkauft nicht den Mangel, sie erschafft ihn",
    posts: mkWeekB({ next: "Woche 16 · Gruppendruck",
      reelHook: "Sie verkauft dir den Mangel.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Marketing erschafft Mangel – dieselbe Mechanik wirkt in Verhandlungen.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Werbung verkauft dir keinen Mangel – sie erschafft ihn", blogSlug: "werbung-und-der-kuenstliche-mangel",
      video: "Werbung & Mangel: Wie ein Bedürfnis erst erschaffen wird.", videoSrc: "Blog + Deep-Dive werbung-und-mangel",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Welchen „Mangel“ hat dir zuletzt Werbung eingeredet?",
      pitch: "Erschaffenen Mangel erkennen – das schützt Kopf und Konto.", pitchHref: "/mitglieder/wissen/werbung-und-mangel",
      community: "Wo hat Werbung dir einen Mangel verkauft?",
      zitate: "docs/marketing/zitate/", recap: "Werbe-Woche" }) },
  { woche: 16, block: "C", serie: "Mentale Selbstverteidigung", thema: "Gruppendruck", titel: "Gruppendruck — Warum wir schweigen, obwohl wir zweifeln",
    posts: mkWeekB({ next: "Woche 17 · Autoritätshörigkeit",
      reelHook: "Laut ≠ Mehrheit.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Im Meeting nickt die Mehrheit – der Zweifel bleibt stumm. Warum?",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Gruppendruck: Warum wir schweigen, obwohl wir zweifeln", blogSlug: "gruppendruck-und-die-schweigespirale",
      video: "Gruppendruck: Warum wir gegen die eigene Überzeugung mitmachen.", videoSrc: "Blog + Deep-Dive gruppendruck",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Hast du im Meeting schon geschwiegen, obwohl du zweifeltest?",
      pitch: "Der eigenen Stimme trauen – auch gegen die Mehrheit.", pitchHref: "/mitglieder/wissen/gruppendruck",
      community: "Wann bist du zuletzt gegen die Gruppe aufgestanden?",
      zitate: "docs/marketing/zitate/", recap: "Gruppendruck-Woche" }) },
  { woche: 17, block: "C", serie: "Mentale Selbstverteidigung", thema: "Autorität", titel: "Autoritätshörigkeit — Wann Vertrauen zu blindem Gehorsam wird",
    posts: mkWeekB({ next: "Woche 18 · Propaganda",
      reelHook: "Titel ≠ Wahrheit.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Ein Titel ist kein Argument – auch nicht im Org-Chart.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Wann Vertrauen zu blindem Gehorsam wird", blogSlug: "wann-vertrauen-zu-blindem-gehorsam-wird",
      video: "Autoritätshörigkeit: Wann Vertrauen zu Gehorsam wird.", videoSrc: "Blog + Deep-Dive autoritaetshoerigkeit",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Vertraust du dem Titel oder dem Argument?",
      pitch: "Gesundes Misstrauen gegenüber Autorität – ohne Zynismus.", pitchHref: "/mitglieder/wissen/autoritaetshoerigkeit",
      community: "Wem folgst du – Titel oder Inhalt?",
      zitate: "docs/marketing/zitate/", recap: "Autoritäts-Woche" }) },
  { woche: 18, block: "C", serie: "Mentale Selbstverteidigung", thema: "Propaganda", titel: "Propaganda — Erkennst du nicht an lauten Parolen",
    posts: mkWeekB({ next: "Woche 19 · Kognitive Dissonanz",
      reelHook: "Ohne eine einzige Lüge.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Die stärkste Beeinflussung braucht keine Lüge – nur die richtige Auswahl.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Propaganda erkennst du nicht an lauten Parolen", blogSlug: "propaganda-erkennst-du-nicht-an-lauten-parolen",
      video: "Propaganda: Beeinflussung ohne eine einzige Lüge.", videoSrc: "Blog + Deep-Dive propaganda",
      practice: "autopilot-check", practiceName: "Der Autopilot-Check",
      poll: "Woran erkennst du Propaganda?",
      pitch: "Subtile Beeinflussung entlarven – der ganze Werkzeugkasten.", pitchHref: "/mitglieder/wissen/propaganda",
      community: "Wo bist du schon subtil beeinflusst worden?",
      zitate: "docs/marketing/zitate/", recap: "Propaganda-Woche" }) },
  { woche: 19, block: "C", serie: "Mentale Selbstverteidigung", thema: "Dissonanz", titel: "Kognitive Dissonanz — Warum du verteidigst, was dir schadet",
    posts: mkWeekB({ next: "Woche 20 · Identität & Meinung",
      reelHook: "Warum du wegschaust.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Wir verteidigen Entscheidungen, statt sie zu prüfen – teuer im Job.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Warum du verteidigst, was dir schadet", blogSlug: "warum-du-verteidigst-was-dir-schadet",
      video: "Kognitive Dissonanz: Warum du verteidigst, was dir schadet.", videoSrc: "Blog + Deep-Dive kognitive-dissonanz",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Was verteidigst du, obwohl es dir schadet?",
      pitch: "Dissonanz aushalten statt wegzuschauen – das ist trainierbar.", pitchHref: "/mitglieder/wissen/kognitive-dissonanz",
      community: "Wo hast du weggeschaut, statt hinzusehen?",
      zitate: "docs/marketing/zitate/", recap: "Dissonanz-Woche" }) },
  { woche: 20, block: "C", serie: "Mentale Selbstverteidigung", thema: "Identität", titel: "Identität & Meinung — Hast du eine Meinung, oder hat sie dich?",
    posts: mkWeekB({ next: "einen neuen Themen-Zyklus",
      reelHook: "Hast du eine Meinung – oder sie dich?", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Wenn Meinung zur Identität wird, wird Feedback zum Angriff.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Hast du eine Meinung – oder hat die Meinung dich?", blogSlug: "hast-du-eine-meinung-oder-hat-sie-dich",
      video: "Identität & Meinung: Hast du eine Meinung – oder hat sie dich?", videoSrc: "Blog + Deep-Dive identitaet-und-meinung",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Ist deine Meinung deine – oder hat sie dich?",
      pitch: "Meinung von Identität trennen – der letzte Schritt zur Freiheit.", pitchHref: "/mitglieder/wissen/identitaet-und-meinung",
      community: "Welche Meinung würdest du ungern aufgeben?",
      zitate: "docs/marketing/zitate/", recap: "Identitäts-Woche" }) },

  // ---- Block C · Mentale Selbstverteidigung (Fortsetzung) ---------------
  // Diese Themen haben (noch) keinen dedizierten Blog – die „Langform" ist die
  // Vertiefung im Mitgliederbereich; FB/LI verlinken sie als Teaser/Pitch.
  { woche: 21, block: "C", serie: "Mentale Selbstverteidigung", thema: "Sprache & Etiketten", titel: "Sprache & Etiketten — Wie ein Etikett das Denken beendet",
    posts: mkWeekB({ next: "Woche 22 · Medien-Agenda",
      reelHook: "Ein Wort beendet jede Debatte.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Ein Etikett beendet jedes Argument – im Team gefährlich.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Sprache & Etiketten: Wie ein Etikett das Denken beendet", blogSlug: "sprache-und-etiketten-wie-ein-etikett-das-denken-beendet",
      video: "Sprache & Etiketten: Wie ein Wort jede Debatte beendet.", videoSrc: "Blog + Deep-Dive sprache-und-etiketten",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Welches Etikett beendet bei euch jede Diskussion?",
      pitch: "Etiketten erkennen, bevor sie das Denken ersetzen.", pitchHref: "/mitglieder/wissen/sprache-und-etiketten",
      community: "Welches Label wird bei euch als Totschlagargument benutzt?",
      zitate: "docs/marketing/zitate/", recap: "Sprache-Woche" }) },
  { woche: 22, block: "C", serie: "Mentale Selbstverteidigung", thema: "Medien-Agenda", titel: "Medien-Agenda — Nicht was du denkst, sondern worüber",
    posts: mkWeekB({ next: "Woche 23 · Angst-Steuerung",
      reelHook: "Nicht WAS – sondern WORÜBER.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Nicht die Meinung wird gesteuert, sondern das Thema – auch in Meetings.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Medien-Agenda: Nicht was du denkst, sondern worüber", blogSlug: "medien-agenda-nicht-was-sondern-worueber",
      video: "Medien-Agenda: Wie bestimmt wird, worüber du nachdenkst.", videoSrc: "Blog + Deep-Dive medien-agenda",
      practice: "autopilot-check", practiceName: "Der Autopilot-Check",
      poll: "Worüber denkst du gerade nach – wer hat das gesetzt?",
      pitch: "Die Agenda hinter den Themen sehen.", pitchHref: "/mitglieder/wissen/medien-agenda",
      community: "Welches Thema war zuletzt überall – und warum?",
      zitate: "docs/marketing/zitate/", recap: "Agenda-Woche" }) },
  { woche: 23, block: "C", serie: "Mentale Selbstverteidigung", thema: "Angst-Steuerung", titel: "Angst-Steuerung — Warum Angst dich lenkbar macht",
    posts: mkWeekB({ next: "Woche 24 · Ablenkung",
      reelHook: "Angst macht dich lenkbar.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Angst verengt den Blick – eine schlechte Basis für Entscheidungen.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Angst-Steuerung: Warum Angst dich lenkbar macht", blogSlug: "angst-steuerung-warum-angst-dich-lenkbar-macht",
      video: "Angst-Steuerung: Wie Angst dein Urteil verengt.", videoSrc: "Blog + Deep-Dive angst-steuerung",
      practice: "verlaengertes-ausatmen", practiceName: "Verlängertes Ausatmen",
      poll: "Woran merkst du, dass Angst gerade entscheidet?",
      pitch: "Aus dem Angst-Modus zurückfinden – das ist trainierbar.", pitchHref: "/mitglieder/wissen/angst-steuerung",
      community: "Wo wurde zuletzt mit deiner Angst gearbeitet?",
      zitate: "docs/marketing/zitate/", recap: "Angst-Woche" }) },
  { woche: 24, block: "C", serie: "Mentale Selbstverteidigung", thema: "Ablenkung", titel: "Ablenkung — Keine Lüge, nur Lärm",
    posts: mkWeekB({ next: "Woche 25 · Normalisierung",
      reelHook: "Keine Lüge. Nur Lärm.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Nicht Desinformation lähmt, sondern Dauerlärm – auch im Postfach.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Ablenkung: Keine Lüge – nur Lärm", blogSlug: "ablenkung-keine-luege-nur-laerm",
      video: "Ablenkung: Wie Lärm wichtiger wirkt als Wahrheit.", videoSrc: "Blog + Deep-Dive ablenkung",
      practice: "autopilot-check", practiceName: "Der Autopilot-Check",
      poll: "Was lenkt dich gerade am meisten ab?",
      pitch: "Fokus zurückgewinnen im Dauerlärm.", pitchHref: "/mitglieder/wissen/ablenkung",
      community: "Was raubt dir am meisten Aufmerksamkeit?",
      zitate: "docs/marketing/zitate/", recap: "Ablenkungs-Woche" }) },
  { woche: 25, block: "C", serie: "Mentale Selbstverteidigung", thema: "Normalisierung", titel: "Normalisierung — Warum „war schon immer so“ kein Argument ist",
    posts: mkWeekB({ next: "Woche 26 · Bildmacht",
      reelHook: "„War doch schon immer so?“", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "„War schon immer so“ ist kein Argument – nur Gewöhnung.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Normalisierung: Warum „war schon immer so“ kein Argument ist", blogSlug: "normalisierung-war-doch-schon-immer-so",
      video: "Normalisierung: Wie das Unnormale normal wird.", videoSrc: "Blog + Deep-Dive normalisierung",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Was hast du zuletzt als „normal“ akzeptiert?",
      pitch: "Schleichende Normalisierung bemerken.", pitchHref: "/mitglieder/wissen/normalisierung",
      community: "Was wurde bei euch normal, was es nicht sein sollte?",
      zitate: "docs/marketing/zitate/", recap: "Normalisierungs-Woche" }) },
  { woche: 26, block: "C", serie: "Mentale Selbstverteidigung", thema: "Bildmacht", titel: "Bildmacht — Warum ein Bild kein Beweis ist",
    posts: mkWeekB({ next: "einen neuen Themen-Zyklus",
      reelHook: "Ein Bild ist kein Beweis.", reelSrc: "Reel-Serie selbstverteidigung",
      liBeitrag: "Ein Bild überzeugt schneller als Fakten – Vorsicht in Präsentationen.",
      carousel: "Wer denkt hier eigentlich?", carouselSrc: "carousels/marketing-serien.mjs",
      blogTitle: "Bildmacht: Warum ein Bild kein Beweis ist", blogSlug: "bildmacht-ein-bild-ist-kein-beweis",
      video: "Bildmacht: Warum ein Bild kein Beweis ist.", videoSrc: "Blog + Deep-Dive bildmacht",
      practice: "innerer-beobachter", practiceName: "Der innere Beobachter",
      poll: "Welches Bild hat dich zuletzt überzeugt – zu Recht?",
      pitch: "Bilder lesen statt ihnen zu glauben.", pitchHref: "/mitglieder/wissen/bildmacht",
      community: "Welches Bild ging viral und war irreführend?",
      zitate: "docs/marketing/zitate/", recap: "Bildmacht-Woche" }) },
];

/** Wochen-Metadaten (ohne Posts) – für Umschalter, Banner, Filter. */
export const WOCHEN_META: WochenMeta[] = DEFAULT_PLAN.map(
  ({ woche, block, serie, thema, titel }) => ({ woche, block, serie, thema, titel }),
);

export function getWochenMeta(woche: number): WochenMeta | undefined {
  return WOCHEN_META.find((w) => w.woche === woche);
}

/** Flache Zeilen für den DB-Seed (eine Zeile je Post, mit Sortier-Index). */
export type SeedRow = {
  woche: number;
  block: Block;
  thema: string;
  wochentag: number;
  uhrzeit: string;
  kanal: Kanal;
  format: string;
  titel: string;
  quelle: string;
  cta: string;
  optional: boolean;
  sort: number;
};

export function flattenForSeed(): SeedRow[] {
  const rows: SeedRow[] = [];
  for (const w of DEFAULT_PLAN) {
    w.posts.forEach((p, i) => {
      rows.push({
        woche: w.woche,
        block: w.block,
        thema: w.thema,
        wochentag: p.wochentag,
        uhrzeit: p.uhrzeit,
        kanal: p.kanal,
        format: p.format,
        titel: p.titel,
        quelle: p.quelle,
        cta: p.cta,
        optional: p.optional ?? false,
        sort: i,
      });
    });
  }
  return rows;
}
