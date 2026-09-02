/**
 * Gemeinsame Daten für Cover-Generator (build.mjs) und PNG-Export
 * (export-png.mjs). NEBENWIRKUNGSFREI – nur Konstanten/Helfer, kein I/O.
 *
 * Motive/Texte ändert man ausschließlich hier.
 */
import { NEQ } from "../../_glyphs.mjs";
export const HANDLE = "www.werdemeisterdeinergedanken.de";
export const GRAD = "linear-gradient(120deg,#8cc63f 0%,#21b2bd 100%)";
export const A = (s) => `<span class="accent">${s}</span>`; // Akzentwort
export const pad2 = (n) => String(n).padStart(2, "0");

// ===========================================================================
// VIER FARBWELTEN (Grund × Akzent) – parallel zu allen anderen Generatoren.
//   dunkel        = Gold auf Navy      (Standard, Datei ohne Suffix)
//   hell          = Gold auf Creme     (-hell)
//   tuerkis       = Türkis auf Navy    (-tuerkis)   ← bisheriges Cover-Design
//   tuerkis-hell  = Türkis auf Creme   (-tuerkis-hell)
// ===========================================================================
export const THEME_SUFFIX = { dunkel: "", hell: "-hell", tuerkis: "-tuerkis", "tuerkis-hell": "-tuerkis-hell" };
export const THEMES = Object.keys(THEME_SUFFIX);
export const THEME_LABEL = {
  dunkel: "Gold · Dunkel",
  hell: "Gold · Creme",
  tuerkis: "Türkis · Navy",
  "tuerkis-hell": "Türkis · Creme",
};

// Alle welt-abhängigen Design-Werte an einer Stelle. Nebenwirkungsfrei.
export function palette(theme) {
  const hell = theme === "hell" || theme === "tuerkis-hell";
  const teal = theme === "tuerkis" || theme === "tuerkis-hell";
  const brain = teal ? "logo.png" : "logo-gold.png"; // Seiten-Gehirn bunt / Gold-Front
  // Das Gold-Front-Gehirn (640×640, dichteres Motiv) wirkt bei gleicher Breite
  // klobiger als das Türkis-Seitengehirn (640×588). Etwas verkleinern, damit
  // das Lockup wie im Website-Header ausbalanciert ist.
  const logoScale = teal ? 1 : 0.55;
  const accent = teal
    ? (hell ? "linear-gradient(120deg,#8cc63f 0%,#0f766e 100%)" : "linear-gradient(120deg,#8cc63f 0%,#21b2bd 100%)")
    : (hell ? "linear-gradient(120deg,#d9a93a 0%,#7e6410 100%)" : "linear-gradient(120deg,#f2d489 0%,#d9a93a 100%)");
  const glowRGB = teal ? "52,196,196" : "233,193,95";
  const bg = hell
    ? (teal
      ? `radial-gradient(70% 55% at 78% 12%, rgba(52,196,196,.20), transparent 62%),radial-gradient(60% 55% at 12% 108%, rgba(33,178,189,.12), transparent 60%),#f6f4ee`
      : `radial-gradient(70% 55% at 78% 12%, rgba(232,193,95,.26), transparent 62%),radial-gradient(60% 55% at 12% 108%, rgba(217,169,58,.14), transparent 60%),#f6f4ee`)
    : (teal
      ? `radial-gradient(60% 40% at 78% 30%, rgba(52,196,196,.35), transparent 60%),radial-gradient(70% 50% at 20% 10%, rgba(40,90,150,.35), transparent 60%),linear-gradient(160deg,#071026 0%,#0b2138 45%,#0a1730 100%)`
      : `radial-gradient(60% 42% at 78% 28%, rgba(233,193,95,.30), transparent 60%),radial-gradient(70% 50% at 18% 8%, rgba(168,132,42,.26), transparent 60%),linear-gradient(160deg,#0b0e16 0%,#12111b 45%,#0a0c13 100%)`);
  const ink = hell ? "#16231f" : (teal ? "#f4f7ff" : "#f6f4ee");
  const handle = hell ? "rgba(22,35,31,.6)" : (teal ? "#a7bad2" : "rgba(244,242,236,.62)");
  const scrim = hell
    ? `linear-gradient(to bottom, transparent 42%, rgba(246,244,238,.55) 72%, rgba(246,244,238,.92) 100%)`
    : (teal
      ? `linear-gradient(to bottom, transparent 40%, rgba(5,9,20,.55) 72%, rgba(5,9,20,.92) 100%)`
      : `linear-gradient(to bottom, transparent 40%, rgba(6,7,12,.55) 72%, rgba(6,7,12,.92) 100%)`);
  const wmMain = hell ? "rgba(22,35,31,.92)" : (teal ? "rgba(244,247,255,.94)" : "rgba(244,242,236,.94)");
  const wmSub = hell ? "rgba(22,35,31,.66)" : (teal ? "rgba(167,186,210,.9)" : "rgba(244,242,236,.66)");
  const tick = teal
    ? (hell ? "rgba(15,118,110,.85)" : "rgba(95,214,210,.85)")
    : (hell ? "rgba(168,132,42,.85)" : "rgba(242,212,137,.85)");
  const pageBg = hell ? "#f6f4ee" : "#05060c";
  const shadow = hell ? "none" : "drop-shadow(0 6px 34px rgba(0,0,0,.6))";
  const handleShadow = hell ? "none" : "0 2px 14px rgba(0,0,0,.7)";
  return { theme, hell, teal, brain, logoScale, accent, glowRGB, bg, ink, handle, scrim, wmMain, wmSub, tick, pageBg, shadow, handleShadow };
}

// ===========================================================================
// BEREICHE. series = Text im Tag oben. cls:"small" = kleiner (mehr Text).
// ===========================================================================
export const COLLECTIONS = [
  {
    key: "selbstverteidigung",
    label: "Mentale Selbstverteidigung",
    series: "Mentale Selbstverteidigung",
    note: "Wie dein Denken gelenkt wird – und wie du gegenhältst.",
    items: [
      { theme: "Propaganda",          cls: "",      html: `Ohne eine<br>einzige ${A("Lüge")}` },
      { theme: "Framing",             cls: "",      html: `Ein ${A("Wort")}<br>ändert alles` },
      { theme: "Sprache & Etiketten", cls: "small", html: `Ein Wort beendet<br>jede ${A("Debatte")}` },
      { theme: "Medien-Agenda",       cls: "small", html: `Nicht WAS –<br>sondern ${A("WORÜBER")}` },
      { theme: "Algorithmen",         cls: "",      html: `Dein ${A("Feed")}<br>${NEQ} die Welt` },
      { theme: "Werbung & Mangel",    cls: "",      html: `Sie verkauft dir<br>den ${A("Mangel")}` },
      { theme: "Gruppendruck",        cls: "",      html: `Laut ${NEQ}<br>${A("Mehrheit")}` },
      { theme: "Autoritätshörigkeit", cls: "",      html: `Titel ${NEQ}<br>${A("Wahrheit")}` },
      { theme: "Angst-Steuerung",     cls: "",      html: `Angst macht<br>dich ${A("lenkbar")}` },
      { theme: "Wiederholung",        cls: "",      html: `Oft gehört<br>= ${A("wahr?")}` },
      { theme: "Ablenkung",           cls: "",      html: `Keine Lüge.<br>Nur ${A("Lärm.")}` },
      { theme: "Kognitive Dissonanz", cls: "",      html: `Warum du<br>${A("wegschaust")}` },
      { theme: "Normalisierung",      cls: "small", html: `„War doch schon<br>immer ${A("so")}?"` },
      { theme: "Bildmacht",           cls: "",      html: `Ein Bild ist<br>kein ${A("Beweis")}` },
      { theme: "Identität & Meinung", cls: "small", html: `Hast du eine<br>Meinung – oder<br>sie ${A("dich?")}` },
      { theme: "Reizüberflutung",     cls: "small", html: `Dein Gehirn im<br>${A("Daueralarm")}` },
    ],
  },
  {
    key: "stufen",
    label: "Die 7 Stufen",
    series: "Die 7 Stufen",
    note: "Der Weg vom Autopilot zur Meisterschaft.",
    items: [
      { theme: "01 · Autopilot",          cls: "",      html: `Du wirst<br>${A("gelebt")}` },
      { theme: "02 · Erwachen",           cls: "small", html: `Der Moment,<br>in dem du<br>${A("aufwachst")}` },
      { theme: "03 · Selbstbeobachtung",  cls: "",      html: `Sieh dir<br>selbst ${A("zu")}` },
      { theme: "04 · Emotionale Reifung", cls: "small", html: `Fühlen – ohne<br>${A("festzuhalten")}` },
      { theme: "05 · Schöpferkraft",      cls: "",      html: `Du erschaffst –<br>${A("bewusst")}` },
      { theme: "06 · Innere Ausrichtung", cls: "",      html: `Kopf, Herz<br>und ${A("Handeln")}` },
      { theme: "07 · Meisterschaft",      cls: "",      html: `Du bist der<br>${A("Gestalter")}` },
    ],
  },
  {
    key: "praxis",
    label: "Praxis",
    series: "Praxis",
    note: "Kleine Übungen, große Wirkung.",
    items: [
      { theme: "Atembeobachtung",       cls: "",      html: `Zurück zum<br>${A("Atem")}` },
      { theme: "Der innere Beobachter", cls: "",      html: `Wer schaut<br>da ${A("zu?")}` },
      { theme: "Body-Scan",             cls: "",      html: `Hör deinem<br>Körper ${A("zu")}` },
      { theme: "Herz-Kohärenz",         cls: "small", html: `Bring Herz und<br>Atem in ${A("Takt")}` },
      { theme: "Verlängertes Ausatmen", cls: "",      html: `Länger aus –<br>${A("ruhiger")}` },
      { theme: "4-6-Atmung",            cls: "",      html: `Vier ein.<br>Sechs ${A("aus.")}` },
      { theme: "Box Breathing",         cls: "",      html: `Atme im<br>${A("Viereck")}` },
      { theme: "Der Autopilot-Check",   cls: "small", html: `Läufst du –<br>oder ${A("lebst")} du?` },
      { theme: "Morgen-Ausrichtung",    cls: "small", html: `Wie willst du<br>den Tag ${A("treffen?")}` },
      { theme: "Abend-Reflexion",       cls: "",      html: `Was war heute<br>${A("wirklich?")}` },
      { theme: "Loslass-Ritual",        cls: "",      html: `Leg es<br>${A("ab")}` },
      { theme: "Präsenz-Spaziergang",   cls: "",      html: `Geh –<br>ganz ${A("da")}` },
      { theme: "Die tägliche Rückkehr", cls: "",      html: `Immer wieder<br>${A("zurück")}` },
    ],
  },
  {
    key: "vertiefungen",
    label: "Vertiefungen",
    series: "Vertiefung",
    note: "Das Wissen hinter der Veränderung.",
    items: [
      { theme: "Automatische Gedanken",    cls: "small", html: `Die Stimme, die<br>schon ${A("geurteilt")} hat` },
      { theme: "Konditionierung",          cls: "",      html: `Alte Reize<br>feuern ${A("noch")}` },
      { theme: "Kognitive Verzerrungen",   cls: "small", html: `Denkfehler, die<br>sich ${A("wahr")} anfühlen` },
      { theme: "Kernüberzeugungen",        cls: "small", html: `Die Regel unter<br>dem ${A("Gedanken")}` },
      { theme: "Der innere Kritiker",      cls: "small", html: `Wessen Stimme<br>ist das ${A("wirklich?")}` },
      { theme: "Neuroplastizität",         cls: "small", html: `Dein Gehirn<br>kann sich ${A("ändern")}` },
      { theme: "Reiz-Reaktions-Lücke",     cls: "small", html: `Zwischen Reiz<br>und Reaktion:<br>${A("du")}` },
      { theme: "Grübeln",                  cls: "small", html: `Raus aus der<br>${A("Endlosschleife")}` },
      { theme: "Emotionsregulation",       cls: "small", html: `Fühlen, ohne<br>zu ${A("ertrinken")}` },
      { theme: "Selbstmitgefühl",          cls: "",      html: `Sei dein<br>eigener ${A("Freund")}` },
      { theme: "Werte & Ziele",            cls: "",      html: `Die Richtung<br>unter dem ${A("Tun")}` },
      { theme: "Muster & Körper",          cls: "small", html: `Wenn Denken<br>unter die ${A("Haut")} geht` },
      { theme: "Integration & Weitergabe", cls: "small", html: `Vom Wissen zur<br>gelebten ${A("Haltung")}` },
    ],
  },
  {
    key: "wissenschaft",
    label: "Die Wissenschaft dahinter",
    series: "Die Wissenschaft dahinter",
    note: "Belegte Studien, ehrlich eingeordnet – ohne Hype.",
    items: [
      { theme: "Freier Wille",         cls: "small", html: `Wer entscheidet –<br>du oder dein ${A("Gehirn?")}` },
      { theme: "Neuroplastizität",     cls: "",      html: `Dein Gehirn<br>bleibt ${A("formbar")}` },
      { theme: "Gefühle benennen",     cls: "small", html: `Ein Wort, das<br>dich ${A("beruhigt")}` },
      { theme: "Denkfehler",           cls: "",      html: `Dein Kopf<br>${A("täuscht")} dich` },
      { theme: "Willenskraft",         cls: "small", html: `Willenskraft ist<br>${A("überschätzt")}` },
      { theme: "Abschweifender Geist", cls: "small", html: `47 % der Zeit<br>${A("woanders")}` },
      { theme: "Placebo",              cls: "small", html: `Erwartung wirkt<br>im ${A("Körper")}` },
    ],
  },
  {
    key: "landing",
    label: "Landing / Funnel",
    series: "Bewusstseins-Test",
    note: "Teaser-Cover für den Funnel-Einstieg: Was, wenn es nicht an dir liegt?",
    items: [
      { theme: "Nicht deine Schuld", cls: "",      html: `Nicht deine<br>${A("Schuld")}` },
      { theme: "Es ist ein Programm", cls: "",     html: `Es ist ein<br>${A("Programm")}` },
      { theme: "Zu wenig Disziplin?", cls: "small", html: `Zu wenig Disziplin?<br>${A("Nein.")}` },
    ],
  },
];

// ===========================================================================
// FORMATE. Flex-Layout → format-agnostisch.
// ===========================================================================
export const FORMATS = [
  { key: "reel-9x16",      label: "9:16 · Reel / Story",         w: 1080, h: 1920, pad: 84, logoW: 150, tagFs: 23, headFs: 132, headSmallFs: 100, handleFs: 30, handleGap: 26, headMaxW: "100%" },
  { key: "feed-4x5",       label: "4:5 · Feed (Hochformat)",     w: 1080, h: 1350, pad: 80, logoW: 146, tagFs: 22, headFs: 120, headSmallFs: 96,  handleFs: 29, handleGap: 24, headMaxW: "100%" },
  { key: "feed-1x1",       label: "1:1 · Feed (quadratisch)",    w: 1080, h: 1080, pad: 76, logoW: 140, tagFs: 21, headFs: 104, headSmallFs: 86,  handleFs: 28, handleGap: 22, headMaxW: "100%" },
  { key: "landscape-16x9", label: "16:9 · YouTube / Querformat", w: 1920, h: 1080, pad: 90, logoW: 168, tagFs: 23, headFs: 150, headSmallFs: 120, handleFs: 32, handleGap: 28, headMaxW: "66%" },
  { key: "pin-2x3",        label: "2:3 · Pinterest",             w: 1000, h: 1500, pad: 76, logoW: 140, tagFs: 21, headFs: 120, headSmallFs: 94,  handleFs: 28, handleGap: 24, headMaxW: "100%" },
];
