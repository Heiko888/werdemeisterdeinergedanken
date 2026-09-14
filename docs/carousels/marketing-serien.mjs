/**
 * Marketing-Carousels (Serien 2–4) → gebrandete 4:5-Slides (1080×1350).
 * Eigenständig, im Carousel-Studio-Look. Slide-Typen: cover, stat, compare,
 * list, step, recap, setup, remedy, cta.
 *
 *   node docs/carousels/marketing-serien.mjs [ausgabe-basis-verzeichnis]
 */
import { readFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { ARROW } from "../_glyphs.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const COVERS = join(ROOT, "docs", "reels", "covers");
const OUTBASE = process.argv[2] || join(HERE, "export");
const FORMATS = [
  { key: "feed-4x5", w: 1080, h: 1350, pad: 84 },
  { key: "feed-1x1", w: 1080, h: 1080, pad: 60 },
  { key: "reel-9x16", w: 1080, h: 1920, pad: 130 },
];
const HANDLE = "www.werdemeisterdeinergedanken.de";

// Marken-Palette – vier Designfarben aus zwei Achsen:
//   Grund:  Dunkel (Navy #090b10) ↔ Hell (Creme #f6f4ee)
//   Akzent: Gold (Erkenntnis) ↔ Türkis/Teal (Bewusstsein)
// 1:1 an brand-assets.mjs angeglichen, damit die Carousels zur restlichen
// Bildwelt passen. theme: "dunkel" | "hell" | "tuerkis" | "tuerkis-hell".
const BG_GOLD_HELL = `radial-gradient(78% 62% at 50% -12%, rgba(232,193,95,.22), transparent 62%),
       radial-gradient(60% 55% at 96% 4%, rgba(242,212,137,.12), transparent 60%),
       radial-gradient(58% 52% at 4% 108%, rgba(217,169,58,.13), transparent 60%),
       #f6f4ee`;
const BG_GOLD_DARK = `radial-gradient(52% 110% at 86% 10%, rgba(233,193,95,.20), transparent 60%),
       radial-gradient(46% 110% at 6% 96%, rgba(168,132,42,.12), transparent 60%),
       radial-gradient(42% 90% at 74% 92%, rgba(217,169,58,.12), transparent 60%),
       #090b10`;
// Türkis-Grund (Teal-Schimmer + Leaf) – analog BG_TUERKIS / BG_HELL_TEAL in brand-assets.
const BG_TEAL_DARK = `radial-gradient(54% 112% at 84% 8%, rgba(52,196,196,.24), transparent 60%),
       radial-gradient(48% 110% at 6% 96%, rgba(33,178,189,.14), transparent 60%),
       radial-gradient(44% 92% at 74% 94%, rgba(140,198,63,.12), transparent 60%),
       #090b10`;
const BG_TEAL_HELL = `radial-gradient(78% 62% at 50% -10%, rgba(52,196,196,.20), transparent 62%),
       radial-gradient(60% 55% at 96% 4%, rgba(140,198,63,.12), transparent 60%),
       radial-gradient(58% 52% at 4% 108%, rgba(33,178,189,.12), transparent 60%),
       #f6f4ee`;

const PAL = (theme) => {
  const hell = theme === "hell" || theme === "tuerkis-hell";
  const teal = theme === "tuerkis" || theme === "tuerkis-hell";
  const base = hell ? {
    page: "#efe9de", stars: "none",
    bg: teal ? BG_TEAL_HELL : BG_GOLD_HELL,
    grad: "linear-gradient(120deg,#d9a93a 0%,#7e6410 100%)",
    eyebrow: "#7e6410", ink: "#16231f", sub: "rgba(22,35,31,.66)",
    body: "rgba(22,35,31,.82)", strong: "#16231f", statlabel: "rgba(22,35,31,.85)",
    numbg: "rgba(22,35,31,.05)",
    cardBg: "rgba(22,35,31,.045)", cardBorder: "rgba(22,35,31,.12)", cardText: "rgba(22,35,31,.72)",
    chipGoodBg: "rgba(120,150,40,.14)", chipGoodText: "#5c6b1f", chipGoodBorder: "rgba(120,150,40,.4)",
    chipBadBg: "rgba(180,80,50,.12)", chipBadText: "#9a4426", chipBadBorder: "rgba(180,80,50,.38)",
    onGrad: "#fdfaf1",
    hintBg: "rgba(168,132,42,.10)", hintBorder: "#b8901f", hintHl: "#7e6410",
    merkText: "#4a5a2f", merkBorder: "#a8842a",
    muted: "rgba(22,35,31,.55)", dotOff: "rgba(22,35,31,.18)", logoShadow: "rgba(168,132,42,.28)",
    accentShadow: "184,144,34",
  } : {
    page: "#05060c", stars: "block",
    bg: teal ? BG_TEAL_DARK : BG_GOLD_DARK,
    grad: "linear-gradient(120deg,#f2d489 0%,#e8c15f 100%)",
    eyebrow: "#f2d489", ink: "#f4f2ec", sub: "rgba(244,242,236,.72)",
    body: "rgba(244,242,236,.86)", strong: "#ffffff", statlabel: "rgba(244,242,236,.9)",
    numbg: "rgba(255,255,255,.05)",
    cardBg: "rgba(255,255,255,.05)", cardBorder: "rgba(255,255,255,.10)", cardText: "rgba(244,242,236,.78)",
    chipGoodBg: "rgba(140,198,63,.16)", chipGoodText: "#b9e08a", chipGoodBorder: "rgba(140,198,63,.4)",
    chipBadBg: "rgba(230,120,90,.14)", chipBadText: "#f0b49b", chipBadBorder: "rgba(230,120,90,.38)",
    onGrad: "#241a06",
    hintBg: "rgba(233,193,95,.10)", hintBorder: "#e8c15f", hintHl: "#f2d489",
    merkText: "#efe2c4", merkBorder: "#e8c15f",
    muted: "rgba(244,242,236,.6)", dotOff: "rgba(255,255,255,.22)", logoShadow: "rgba(233,193,95,.30)",
    accentShadow: "233,193,95",
  };
  if (!teal) return base;
  // Türkis: Gold-Akzente durch Teal/Leaf ersetzen – Grund (Navy/Creme) bleibt.
  return {
    ...base,
    grad: hell
      ? "linear-gradient(120deg,#8cc63f 0%,#0f766e 100%)"
      : "linear-gradient(120deg,#a3d64f 0%,#21b2bd 100%)",
    eyebrow: hell ? "#0f766e" : "#5fd6d2",
    onGrad: hell ? "#f4faf9" : "#08221f",
    hintBg: hell ? "rgba(15,118,110,.10)" : "rgba(52,196,196,.10)",
    hintBorder: hell ? "#0f766e" : "#34c4c4",
    hintHl: hell ? "#0f766e" : "#5fd6d2",
    merkText: hell ? "#125a52" : "#bfeae6",
    merkBorder: hell ? "#0f766e" : "#34c4c4",
    logoShadow: hell ? "rgba(52,150,140,.28)" : "rgba(52,196,196,.30)",
    accentShadow: hell ? "33,178,189" : "52,196,196",
  };
};

// ---------------------------------------------------------------------------
const SERIES = [
  {
    key: "60000-gedanken", label: "Bis zu 60.000 Gedanken am Tag", tag: "Mentale Freiheit",
    slides: [
      { role: "cover", eyebrow: "Gedankenkontrolle & mentale Freiheit",
        title: "Bis zu 60.000 Gedanken am Tag – wie viele sind wirklich deine?",
        sub: "Über äußere Einflüsse, die unbemerkt dein Denken lenken – und den Weg zurück zu deiner geistigen Freiheit." },
      { role: "stat", eyebrow: "Die unaufhörliche innere Stimme", num: "60.000",
        label: "Gedanken pro Tag – die meisten laufen unbewusst ab",
        text: "Sie entspringen Erinnerungen, Emotionen und Eindrücken. Oft wiederholen sich dieselben Muster – besonders die negativen. Diese mentale Endlosschleife hält uns in Zweifel und Stress gefangen, ohne dass wir es bemerken." },
      { role: "compare", eyebrow: "Zwei Gesichter", title: "Gedankenkontrolle",
        cards: [
          { head: "Selbstkontrolle", text: "Deinen Geist bewusst steuern, störende Gedanken entkräften, klarere Muster fördern – der Kern jeder Achtsamkeit.", tag: "Ausdruck von Freiheit", good: true },
          { head: "Manipulation von außen", text: "Gezielte Beeinflussung durch Werbung, Propaganda oder psychologische Techniken.", tag: "Schränkt deine Freiheit ein", good: false },
        ] },
      { role: "list", eyebrow: "Äußere Einflüsse", title: "Wer denkt hier eigentlich?",
        items: [
          { lead: "Werbung & Medien", text: "Hunderte Botschaften täglich formen Werte, Kaufentscheidungen und Selbstbild." },
          { lead: "Algorithmen & Filterblasen", text: "Social Media zeigt gezielt, was fesselt – und verengt so deine Sicht." },
          { lead: "Gruppendruck", text: "Das Bedürfnis nach Zugehörigkeit lässt uns Meinungen ungeprüft übernehmen." },
        ] },
      { role: "step", rubric: "Weg zur Freiheit", n: "01", title: "Achtsamkeit üben",
        text: "Regelmäßige Meditation beruhigt den Geist. Du beobachtest deine Gedanken, ohne dich von ihnen mitreißen zu lassen." },
      { role: "step", rubric: "Weg zur Freiheit", n: "02", title: "Informationsdiät",
        text: "Schränke Nachrichten und Social Media bewusst ein – das schützt dich vor unbemerkter Beeinflussung." },
      { role: "step", rubric: "Weg zur Freiheit", n: "03", title: "Kritisch denken",
        text: "Frag dich bei jeder Botschaft: Woher stammt diese Information? Und welche Absicht könnte dahinterstehen?" },
      { role: "step", rubric: "Weg zur Freiheit", n: "04", title: "Positive Gewohnheiten",
        text: "Richte den Fokus auf Dankbarkeit, lösungsorientiertes Denken und deine ganz eigenen Ziele." },
      { role: "cta", eyebrow: "Deine geistige Freiheit", title: "Welche deiner Gedanken sind wirklich deine eigenen?",
        sub: "Wer versteht, wie Gedanken entstehen und gelenkt werden, gewinnt ein Stück Kontrolle zurück – und damit seine Freiheit.", button: `Zurück zur mentalen Freiheit ${ARROW}` },
    ],
  },
  {
    key: "4-wege-freiheit", label: "4 Wege zur mentalen Freiheit", tag: "Mentale Freiheit · Praxis",
    slides: [
      { role: "cover", eyebrow: "Mentale Freiheit · Praxis", title: "4 Wege zurück zu deiner mentalen Freiheit",
        sub: "Deine Gedanken gehören dir – hol sie dir zurück. Vier Praktiken, die du sofort umsetzen kannst." },
      { role: "setup", eyebrow: "Warum überhaupt?", title: "Freiheit heißt bewusst wählen",
        text: "Du denkst bis zu 60.000 Gedanken am Tag – viele unbewusst und von außen geprägt. Mentale Freiheit bedeutet nicht, nicht zu denken. Sondern bewusst zu wählen, welche Gedanken du nährst. Diese 4 Wege bringen dich dahin." },
      { role: "step", rubric: "Weg", n: "01", title: "Achtsamkeit üben",
        text: "Meditation beruhigt den Geist. Du lernst, Gedanken zu beobachten, ohne dich von ihnen mitreißen zu lassen.",
        hintLabel: "So geht's", hint: "3 Minuten täglich: Augen zu, nur auf den Atem achten. Schweift der Geist ab, kehr sanft zum Atem zurück." },
      { role: "step", rubric: "Weg", n: "02", title: "Informationsdiät",
        text: "Der ständige Strom aus Nachrichten und Social Media macht dich empfänglich für unbemerkte Beeinflussung.",
        hintLabel: "So geht's", hint: "Feste Handy-Zeiten. Erste Stunde nach dem Aufwachen und letzte vor dem Schlafen: bildschirmfrei." },
      { role: "step", rubric: "Weg", n: "03", title: "Kritisch denken",
        text: "Nicht jede Botschaft meint es gut mit dir. Prüfe sie, bevor du sie zu deiner eigenen machst.",
        hintLabel: "Frag dich", hint: "Woher stammt die Info? · Wer profitiert davon? · Welche Emotion soll sie in mir auslösen?" },
      { role: "step", rubric: "Weg", n: "04", title: "Positive Gewohnheiten",
        text: "Worauf du deinen Fokus richtest, wächst. Trainiere ihn bewusst, statt ihn treiben zu lassen.",
        hintLabel: "So geht's", hint: "Abends 3 Dinge notieren, für die du dankbar bist. Bei Problemen fragen: Was ist der nächste kleine Schritt?" },
      { role: "recap", eyebrow: "Auf einen Blick", title: "Fang mit einem an",
        items: [
          { lead: "Achtsamkeit üben", text: "3 Minuten Atemfokus am Tag." },
          { lead: "Informationsdiät", text: "Feste, bildschirmfreie Zeiten." },
          { lead: "Kritisch denken", text: "Quelle & Absicht hinterfragen." },
          { lead: "Positive Gewohnheiten", text: "Fokus auf Dankbarkeit & Ziele." },
        ], close: "Du musst nicht alles auf einmal. Wähle einen Weg für diese Woche." },
      { role: "cta", eyebrow: "Dein Weg beginnt jetzt", title: "Welchen Weg gehst du als Erstes?",
        sub: "Speichere den Post, wähle einen Weg und starte heute. Schreib mir die Zahl in die Kommentare.", button: `Jetzt starten ${ARROW}` },
    ],
  },
  {
    key: "wer-denkt-hier", label: "Wer denkt hier eigentlich?", tag: "Wie dein Denken gelenkt wird",
    slides: [
      { role: "cover", eyebrow: "Wie dein Denken gelenkt wird", title: "Wer denkt hier eigentlich?",
        sub: "Werbung, Algorithmen und Gruppendruck formen dein Denken – oft, ohne dass du es merkst. 3 Einflüsse, die du kennen solltest." },
      { role: "setup", eyebrow: "Die unbequeme Wahrheit", title: "Nicht alle deine Gedanken sind wirklich deine eigenen.",
        text: "Unsere Gedanken formen unsere Realität. Doch in einer Welt voller Botschaften sind wir nicht immer ihre alleinigen Architekten. Drei Kräfte lenken besonders stark." },
      { role: "step", rubric: "Einfluss", n: "01", title: "Werbung & Medien",
        text: "Hunderte Botschaften täglich formen Werte, Kaufentscheidungen und Selbstbild. Emotionale Ansprache und künstlich erzeugter Mangel lenken deine Gedanken in gewünschte Bahnen." },
      { role: "step", rubric: "Einfluss", n: "02", title: "Algorithmen & Filterblasen",
        text: "Algorithmen wissen, welche Inhalte dich fesseln, und zeigen gezielt genau das. So entstehen Filterblasen, die deine Sicht Stück für Stück verengen." },
      { role: "step", rubric: "Einfluss", n: "03", title: "Gruppendruck",
        text: "Unser Bedürfnis nach Zugehörigkeit macht uns empfänglich für die Denkweise des Umfelds. Oft übernehmen wir Meinungen und Verhalten, ohne sie je zu hinterfragen." },
      { role: "list", eyebrow: "Warnsignale", title: "So erkennst du Beeinflussung",
        items: [
          { lead: "Starke Emotion", text: "Angst oder Empörung schalten dein kritisches Denken aus." },
          { lead: "Künstlicher Zeitdruck", text: "„Nur heute“, „letzte Chance“ – Mangel treibt zu schnellen Entscheidungen." },
          { lead: "Schwarz-Weiß & „alle“", text: "Nur zwei Lager, kein Zwischenton, „alle machen das“." },
        ] },
      { role: "remedy", eyebrow: "Das Gegenmittel", title: "Bewusstheit gibt dir die Kontrolle zurück",
        text: "Du kannst Einflüssen nicht entkommen – aber du kannst sie durchschauen. Frag bei jeder Botschaft: Woher kommt sie? Wer profitiert? Welche Emotion soll sie auslösen? Wer das fragt, entscheidet wieder selbst.",
        merksatz: "Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt deine Freiheit." },
      { role: "cta", eyebrow: "Nimm dein Denken zurück", title: "Welche Gedanken sind wirklich deine?",
        sub: "Beobachte heute einmal bewusst, was deine Gedanken auslöst. Teile deine Erkenntnis in den Kommentaren.", button: `Mehr erfahren ${ARROW}` },
    ],
  },
  {
    key: "studien-fakten", label: "Studien-Fakten", tag: "Die Wissenschaft dahinter",
    slides: [
      { role: "cover", eyebrow: "Die Wissenschaft dahinter",
        title: "Studien-Fakten: Was die Forschung über dein Denken weiß",
        sub: "Fünf belegte Erkenntnisse aus Hirn- und Kognitionsforschung – ehrlich eingeordnet, ohne Hype." },
      { role: "stat", eyebrow: "Der abschweifende Geist", num: "47%",
        label: "der Wachzeit ist unser Geist nicht bei der Sache",
        text: "Killingsworth & Gilbert (Harvard, 2010, „Science“) befragten über 2.000 Menschen im Alltag. Ergebnis: Fast die Hälfte der Zeit schweifen wir ab – und sind dabei messbar unglücklicher." },
      { role: "step", rubric: "Fakt", n: "01", title: "Dein Gehirn bleibt formbar",
        text: "Neuroplastizität ist messbar: Übung verändert die Struktur deines Gehirns – ein Leben lang.",
        hintLabel: "Quelle", hint: "Maguire (2000): Londoner Taxifahrer haben einen größeren Hippocampus. Draganski (2004, „Nature“): Jonglieren-Lernen mehrt in 3 Monaten die graue Substanz." },
      { role: "step", rubric: "Fakt", n: "02", title: "Ein Gefühl zu benennen beruhigt",
        text: "Wer eine Emotion in Worte fasst, dämpft die Amygdala – die Alarmzentrale des Gehirns – und stärkt die bewusste Steuerung.",
        hintLabel: "Quelle", hint: "Lieberman (UCLA, 2007): „Putting Feelings Into Words“. Fachbegriff: Affect Labeling – „name it to tame it“." },
      { role: "step", rubric: "Fakt", n: "03", title: "Der Autopilot kommt dir zuvor",
        text: "Hirnaktivität kündigt einfache Entscheidungen an, bevor wir sie bewusst „spüren“. Grund, den Spalt bewusster Wahl zu trainieren – nicht, ihn aufzugeben.",
        hintLabel: "Quelle & Vorsicht", hint: "Libet (1983); Soon/Haynes (2008). Deutung umstritten: Schurger (2012) hält das Signal für neuronales Rauschen. Nur einfache Aufgaben." },
      { role: "step", rubric: "Fakt", n: "04", title: "Dein Kopf verzerrt – systematisch",
        text: "Wir liegen nicht zufällig daneben, sondern vorhersehbar: Was leicht einfällt, halten wir für häufig; die erste Zahl färbt jedes Urteil.",
        hintLabel: "Quelle", hint: "Tversky & Kahneman (1974, „Science“). Aaron Beck zeigte: Solche Denkfehler befeuern Angst und Niedergeschlagenheit." },
      { role: "step", rubric: "Fakt", n: "05", title: "Willenskraft ist überschätzt",
        text: "Sich allein auf Disziplin zu verlassen, ist brüchig. Tragfähiger sind Umgebung, Gewohnheiten und Bewusstheit.",
        hintLabel: "Quelle & Vorsicht", hint: "Baumeister (1998) beschrieb „Ego-Depletion“ – doch eine große Replikation (Hagger, 2016) fand den Effekt nicht. Ein Lehrstück der Replikationskrise." },
      { role: "remedy", eyebrow: "Ehrlich bleiben", title: "So liest du Studien richtig",
        text: "Eine einzelne Studie ist ein Hinweis, kein Beweis. Frag: Wie groß war die Stichprobe? Wurde der Befund wiederholt? Wird hier ein Effekt überhöht? Gute Wissenschaft nennt ihre Grenzen selbst.",
        merksatz: "Nicht die lauteste Zahl gewinnt, sondern die, die der Wiederholung standhält." },
      { role: "cta", eyebrow: "Wissen, das dich freier macht", title: "Welcher Fakt hat dich überrascht?",
        sub: "Speichere den Post und schreib mir die Zahl in die Kommentare. Die Vertiefungen mit allen Quellen findest du auf der Website.", button: `Mehr erfahren ${ARROW}` },
    ],
  },
  {
    key: "gratis-ebook", label: "Gratis-E-Book", tag: "Gratis-Einstieg",
    slides: [
      { role: "cover", eyebrow: "Gratis-Einstieg",
        title: "Werde zum bewussten Gestalter deiner Gedanken",
        sub: "Das kostenlose E-Book: Die 7 Stufen der Bewusstseinsentwicklung – kompakt, klar, sofort umsetzbar." },
      { role: "setup", eyebrow: "Für dich, wenn …", title: "Der erste Schritt ist der leichteste",
        text: "Du musst nicht alles auf einmal verstehen. Dieses E-Book bringt dir die 7 Stufen auf den Punkt – und gibt dir erste Übungen, mit denen du heute anfangen kannst. Ohne Vorwissen, ohne Druck." },
      { role: "list", eyebrow: "Das bekommst du", title: "In diesem E-Book",
        items: [
          { lead: "Die 7 Stufen kompakt", text: "Der ganze Weg vom Autopilot zur Meisterschaft – klar und verständlich erklärt." },
          { lead: "Erste Übungen", text: "Konkrete Mini-Praktiken, die im Alltag sofort für mehr Klarheit sorgen." },
          { lead: "Sofort & kostenlos", text: "Direkt per E-Mail in dein Postfach – 100 % gratis, jederzeit abbestellbar." },
        ] },
      { role: "step", rubric: "So geht's", n: "1", title: "In 30 Sekunden im Postfach",
        text: "Trag auf der Website deine E-Mail-Adresse ein – das E-Book landet sofort bei dir. Kein Kleingedrucktes, keine Kosten.",
        hintLabel: "Gut zu wissen", hint: "Du bekommst nur, was dich wirklich weiterbringt. Abmelden geht mit einem Klick, jederzeit." },
      { role: "cta", eyebrow: "Mach den ersten Schritt", title: "Hol dir das kostenlose E-Book",
        sub: "Link in Bio – oder direkt auf werdemeisterdeinergedanken.de. Speichere den Post, damit du ihn wiederfindest.", button: `Gratis sichern ${ARROW}` },
    ],
  },
  {
    key: "mentale-selbstverteidigung-1", label: "Mentale Selbstverteidigung I", tag: "Wie du manipuliert wirst",
    slides: [
      { role: "cover", eyebrow: "Mentale Selbstverteidigung · Teil 1",
        title: "8 Techniken, mit denen dein Denken gelenkt wird",
        sub: "Framing, Wiederholung, Angst, Autorität – erkenne die Muster, und sie verlieren ihre Macht. Teil 1 von 2." },
      { role: "setup", eyebrow: "Warum das zählt", title: "Manipulation braucht keine Lüge",
        text: "Die wirksamste Beeinflussung fühlt sich an wie deine eigene Meinung. Sie arbeitet mit echten Fakten, geschickt ausgewählt und verpackt. Wer die Techniken kennt, kann wieder selbst entscheiden – das ist mentale Selbstverteidigung." },
      { role: "step", rubric: "Technik", n: "01", title: "Framing",
        text: "Wie etwas benannt wird, entscheidet, wie du es bewertest. „Steuerlast“ oder „Solidarbeitrag“ meinen dasselbe – lösen aber Gegenteiliges aus.",
        hintLabel: "Gegenmittel", hint: "Formuliere die Aussage neutral neu. Was bleibt übrig, wenn du das wertende Wort streichst?" },
      { role: "step", rubric: "Technik", n: "02", title: "Filterblase & Algorithmen",
        text: "Dein Feed zeigt, was dich fesselt – nicht, was wahr oder repräsentativ ist. So wird deine Sicht Stück für Stück verengt.",
        hintLabel: "Gegenmittel", hint: "Such gezielt die beste Gegenposition. Folge Quellen, die dir widersprechen." },
      { role: "step", rubric: "Technik", n: "03", title: "Wiederholung = Wahrheit?",
        text: "Was du oft hörst, fühlt sich wahr an – auch wenn es falsch ist. Der Illusory-Truth-Effekt braucht kein Argument, nur Frequenz.",
        hintLabel: "Gegenmittel", hint: "Frag bei Vertrautem: Habe ich das geprüft – oder nur oft gehört?" },
      { role: "step", rubric: "Technik", n: "04", title: "Reizüberflutung",
        text: "Ein Gehirn im Daueralarm denkt nicht mehr in Ruhe. Ständige Reize halten dich reaktiv statt reflektiert.",
        hintLabel: "Gegenmittel", hint: "Bewusste Pausen. Entscheide Wichtiges nie im Scroll-Modus." },
      { role: "step", rubric: "Technik", n: "05", title: "Werbung & künstlicher Mangel",
        text: "„Nur heute“, „letzte Chance“ – erzeugter Mangel treibt zu schnellen Entscheidungen, bevor du nachdenkst.",
        hintLabel: "Gegenmittel", hint: "Bei Zeitdruck: eine Nacht drüber schlafen. Echte Chancen halten das aus." },
      { role: "step", rubric: "Technik", n: "06", title: "Gruppendruck",
        text: "Das Bedürfnis dazuzugehören lässt uns Meinungen ungeprüft übernehmen. Laut wirkt wie Mehrheit – ist es aber selten.",
        hintLabel: "Gegenmittel", hint: "Frag: Denke ich das – oder will ich nur nicht anecken?" },
      { role: "step", rubric: "Technik", n: "07", title: "Autoritätshörigkeit",
        text: "Ein Titel ersetzt kein Argument. Wir folgen Experten-Aura oft auch dort, wo sie gar nicht zuständig ist.",
        hintLabel: "Gegenmittel", hint: "Trenne Person und Aussage: Stimmt das Argument – unabhängig davon, wer es sagt?" },
      { role: "step", rubric: "Technik", n: "08", title: "Propaganda",
        text: "Wirksame Propaganda erkennst du nicht an lauten Parolen, sondern an der stillen Auswahl: Was wird betont, was weggelassen?",
        hintLabel: "Gegenmittel", hint: "Frag nach dem Fehlenden: Welche Perspektive kommt hier nie vor?" },
      { role: "remedy", eyebrow: "Der rote Faden", title: "Eine Frage entwaffnet fast alles",
        text: "So verschieden die Techniken sind – sie zielen alle auf schnelle, emotionale Reaktionen. Ein kurzer Moment des Innehaltens bringt dein bewusstes Denken zurück ins Spiel.",
        merksatz: "Woher kommt das? Wer profitiert? Welche Emotion soll es auslösen?" },
      { role: "cta", eyebrow: "Teil 2 folgt", title: "Welche Technik ist dir zuletzt begegnet?",
        sub: "Speichere den Post und schreib es in die Kommentare. In Teil 2: acht weitere Techniken – von kognitiver Dissonanz bis Bildmacht.", button: `Mehr erfahren ${ARROW}` },
    ],
  },
  {
    key: "mentale-selbstverteidigung-2", label: "Mentale Selbstverteidigung II", tag: "Wie du manipuliert wirst",
    slides: [
      { role: "cover", eyebrow: "Mentale Selbstverteidigung · Teil 2",
        title: "8 weitere Techniken, mit denen dein Denken gelenkt wird",
        sub: "Von kognitiver Dissonanz bis Bildmacht – die subtileren Hebel. Teil 2 von 2." },
      { role: "setup", eyebrow: "Kurz zur Erinnerung", title: "Erkennen ist die halbe Verteidigung",
        text: "Kein Trick wirkt noch gleich stark, sobald du ihn benennen kannst. Teil 1 zeigte die lauten Techniken – hier kommen die leisen, die genau deshalb so wirksam sind." },
      { role: "step", rubric: "Technik", n: "09", title: "Kognitive Dissonanz",
        text: "Wenn Fakten deinem Selbstbild widersprechen, schaust du eher weg, als dich zu ändern. Bequem – aber teuer.",
        hintLabel: "Gegenmittel", hint: "Beobachte deinen Abwehrreflex. Genau da liegt oft das, was du prüfen solltest." },
      { role: "step", rubric: "Technik", n: "10", title: "Identität & Meinung",
        text: "Wird eine Meinung Teil deiner Identität, verteidigst du sie wie dich selbst – Argumente prallen dann ab.",
        hintLabel: "Gegenmittel", hint: "Sag „Ich sehe das gerade so“ statt „Ich bin …“. Meinungen darf man wechseln." },
      { role: "step", rubric: "Technik", n: "11", title: "Sprache & Etiketten",
        text: "Ein Etikett beendet das Denken: Ist jemand erst „Spinner“ oder „Experte“, prüfst du das Argument nicht mehr.",
        hintLabel: "Gegenmittel", hint: "Streiche das Etikett und schau nur auf die Sache. Trägt sie ohne Label?" },
      { role: "step", rubric: "Technik", n: "12", title: "Medien-Agenda",
        text: "Medien sagen dir selten, was du denken sollst – aber sehr wohl, worüber. Was oben steht, wirkt wichtig.",
        hintLabel: "Gegenmittel", hint: "Frag: Warum gerade dieses Thema, gerade jetzt? Was steht dadurch nicht im Licht?" },
      { role: "step", rubric: "Technik", n: "13", title: "Angst-Steuerung",
        text: "Angst schaltet das ruhige Denken ab und macht lenkbar. Wer Bedrohung erzeugt, kann die Lösung gleich mitliefern.",
        hintLabel: "Gegenmittel", hint: "Bei starker Angst erst runterkommen, dann entscheiden. Nie im Alarm." },
      { role: "step", rubric: "Technik", n: "14", title: "Ablenkung",
        text: "Man muss nichts verbergen, wenn genug Lärm herrscht. Dauernde Nebenthemen halten das Wesentliche außer Sicht.",
        hintLabel: "Gegenmittel", hint: "Frag regelmäßig: Was ist hier eigentlich die Hauptsache?" },
      { role: "step", rubric: "Technik", n: "15", title: "Normalisierung",
        text: "„War doch schon immer so“ – was oft genug wiederholt und gezeigt wird, wirkt normal, egal wie fragwürdig.",
        hintLabel: "Gegenmittel", hint: "Frag: Würde ich das gutheißen, wenn ich es heute zum ersten Mal sähe?" },
      { role: "step", rubric: "Technik", n: "16", title: "Bildmacht",
        text: "Ein Bild ist kein Beweis. Ausschnitt, Moment und Kontext entscheiden, welche Geschichte es erzählt.",
        hintLabel: "Gegenmittel", hint: "Frag: Was liegt außerhalb des Bildrands? Und wer hat es warum gemacht?" },
      { role: "remedy", eyebrow: "Das gemeinsame Gegenmittel", title: "Der Raum zwischen Reiz und Reaktion",
        text: "Du kannst diesen Einflüssen nicht entkommen – aber du kannst sie durchschauen. Ein Moment des Innehaltens genügt, um vom Reflex zur bewussten Wahl zu wechseln.",
        merksatz: "Zwischen Reiz und Reaktion liegt ein Raum. In diesem Raum liegt deine Freiheit." },
      { role: "cta", eyebrow: "Nimm dein Denken zurück", title: "Welche Technik erkennst du am häufigsten?",
        sub: "Speichere beide Teile als Nachschlagewerk und schreib mir deine Nummer. Vertiefungen mit Quellen findest du auf der Website.", button: `Mehr erfahren ${ARROW}` },
    ],
  },
  {
    key: "autopilot-meeting", label: "Autopilot im Meeting", tag: "Stufe 1 · Autopilot",
    slides: [
      { role: "cover", eyebrow: "Autopilot im Meeting",
        title: "Wie viele Entscheidungen triffst du im Meeting wirklich bewusst?",
        sub: "Ehrliche Antwort: die meisten laufen auf Autopilot – und du merkst es nicht." },
      { role: "list", eyebrow: "Kennst du das?", title: "Der Autopilot im Meeting",
        items: [
          { lead: "Der Vorschlag kommt", text: "und du bist schon dagegen, bevor er zu Ende ist." },
          { lead: "Jemand widerspricht", text: "und dein Puls reagiert, nicht dein Argument." },
          { lead: "„Wer übernimmt das?“", text: "und deine Hand ist oben, bevor du dein Zeitfenster geprüft hast." },
        ] },
      { role: "stat", eyebrow: "Keine Willensschwäche – Effizienz", num: "60.000",
        label: "Gedanken am Tag – die meisten unbewusst, die meisten wie gestern",
        text: "Dein Gehirn spart Energie, indem es Muster wiederholt. Im Meeting heißt das: Du reagierst aus alten Rollen, statt aus der aktuellen Situation zu entscheiden." },
      { role: "recap", eyebrow: "Drei Muster laufen fast überall mit", title: "Erkennst du dich?",
        items: [
          { lead: "Der ständige Beweiser", text: "wer sich in jedem Status-Meeting neu beweisen muss, arbeitet gegen die eigene Erschöpfung." },
          { lead: "Harmonie um jeden Preis", text: "wer Konflikte vermeidet, verliert den Kontakt zur eigenen fachlichen Position." },
          { lead: "Kontrolle als Sicherheit", text: "wer alles durchplanen will, gerät bei jeder Planänderung unter Stress." },
        ],
        close: "Der erste Schritt ist nicht, sie zu bekämpfen – sondern sie zu bemerken." },
      { role: "remedy", eyebrow: "Der 2-Minuten-Check", title: "Innehalten. Atmen. Fragen.",
        text: "Halte einmal am Tag kurz inne. Ein bewusster Atemzug. Eine Frage: „Was tue ich gerade – und bin ich wirklich dabei?“ Mehr braucht es am Anfang nicht.",
        merksatz: "Was du bemerkst, entscheidet nicht mehr für dich." },
      { role: "cta", eyebrow: "Deine Frage für heute", title: "Welches der drei Muster erkennst du in deinem Arbeitsalltag wieder?",
        sub: "Kostenloses E-Book „Die 7 Stufen kompakt“ – der Weg vom Autopilot zur bewussten Entscheidung.", button: `Zum Autopilot-Check ${ARROW}` },
    ],
  },
];

// ---------------------------------------------------------------------------
const cssFor = (W, H, PAD, theme) => { const p = PAL(theme); const hell = theme === "hell" || theme === "tuerkis-hell"; return `
*{ margin:0; padding:0; box-sizing:border-box; }
html,body{ background:${p.page}; overflow:hidden; }
.slide{ position:relative; width:${W}px; height:${H}px; overflow:hidden;
  font-family:'Inter',system-ui,sans-serif; color:${p.ink}; }
.slide::before{ content:""; position:absolute; inset:0; z-index:0;
  background:
    ${p.bg}; }
.slide::after{ content:""; position:absolute; inset:0; z-index:0; pointer-events:none;
  display:${p.stars === "block" ? "block" : "none"};
  background-image:
    radial-gradient(2.4px 2.4px at 18% 22%, rgba(255,255,255,.5), transparent),
    radial-gradient(1.7px 1.7px at 80% 16%, rgba(185,222,255,.45), transparent),
    radial-gradient(2.8px 2.8px at 30% 82%, rgba(255,255,255,.4), transparent),
    radial-gradient(1.6px 1.6px at 88% 70%, rgba(200,240,235,.5), transparent),
    radial-gradient(2px 2px at 60% 90%, rgba(255,255,255,.34), transparent); }
.content{ position:absolute; inset:0; z-index:3; display:flex; flex-direction:column; padding:${PAD}px 80px ${Math.max(56, PAD - 12)}px; }
.top{ display:flex; align-items:flex-start; justify-content:space-between; gap:32px; }
.logo{ width:108px; height:auto; filter:drop-shadow(0 4px 22px ${p.logoShadow}); }
.tag{ text-align:right; padding-top:6px; font-weight:800; font-size:19px; letter-spacing:.13em;
  text-transform:uppercase; background:${p.grad}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.top.cover{ align-items:center; justify-content:flex-start; gap:26px; }
.wm{ display:flex; flex-direction:column; gap:9px; line-height:1; }
.wm .wm1{ font-family:'Fraunces',Georgia,serif; font-weight:400; font-size:40px; letter-spacing:.1em; text-transform:uppercase; color:${p.ink}; }
.wm .wm1 b{ font-weight:400; background:${p.grad}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.wm .wm2{ display:flex; align-items:center; justify-content:center; gap:11px; font-weight:400; font-size:18px; letter-spacing:.24em; text-transform:uppercase; color:${p.muted}; }
.wm .wm2::before, .wm .wm2::after{ content:""; flex:0 0 auto; width:22px; height:2px; border-radius:2px; background:${p.grad}; opacity:.85; }
.mid{ flex:1 1 auto; display:flex; flex-direction:column; justify-content:center; gap:20px; }
.eyebrow{ font-weight:800; font-size:21px; letter-spacing:.15em; text-transform:uppercase;
  color:${p.eyebrow}; }
.headline{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:76px; line-height:1.05; color:${p.ink};
  letter-spacing:-1px; filter:drop-shadow(0 6px 30px rgba(0,0,0,${hell ? ".12" : ".55"})); }
.title{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:62px; line-height:1.08; letter-spacing:-.5px; color:${p.ink};
  filter:drop-shadow(0 6px 30px rgba(0,0,0,${hell ? ".12" : ".55"})); }
.bar{ width:120px; height:6px; border-radius:6px; background:${p.grad}; }
.sub{ font-size:33px; line-height:1.38; color:${p.sub}; max-width:92%; }
.body{ font-family:'Fraunces',Georgia,serif; font-weight:500; line-height:1.34; color:${p.body};
  filter:drop-shadow(0 4px 22px rgba(0,0,0,${hell ? ".08" : ".5"})); }
.numbig{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:180px; line-height:.9; letter-spacing:-2px;
  background:${p.grad}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 8px 30px rgba(${p.accentShadow},.25)); }
.statlabel{ font-weight:700; font-size:30px; line-height:1.3; color:${p.statlabel}; }
.numbg{ position:absolute; z-index:1; right:40px; top:50%; transform:translateY(-50%); font-family:'Fraunces',Georgia,serif;
  font-weight:600; font-size:440px; line-height:.8; color:${p.numbg}; }
.rubric{ display:flex; align-items:center; gap:16px; }
.rubric .num{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:40px;
  background:${p.grad}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.cards{ display:flex; gap:26px; }
.card{ flex:1; background:${p.cardBg}; border:1px solid ${p.cardBorder};
  border-radius:26px; padding:38px 34px; display:flex; flex-direction:column; gap:18px; }
.card h3{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:40px; line-height:1.1; color:${p.ink}; }
.card p{ font-size:27px; line-height:1.38; color:${p.cardText}; flex:1; }
.chip{ align-self:flex-start; padding:12px 22px; border-radius:999px; font-weight:700; font-size:23px; }
.chip.good{ background:${p.chipGoodBg}; color:${p.chipGoodText}; border:1px solid ${p.chipGoodBorder}; }
.chip.bad{ background:${p.chipBadBg}; color:${p.chipBadText}; border:1px solid ${p.chipBadBorder}; }
.list{ display:flex; flex-direction:column; gap:30px; margin-top:6px; }
.li{ display:flex; gap:22px; align-items:flex-start; }
.li .dot{ margin-top:14px; width:16px; height:16px; border-radius:50%; background:${p.grad}; flex:0 0 auto; }
.li .txt{ font-size:31px; line-height:1.36; color:${p.body}; }
.li .txt b{ font-weight:800; color:${p.strong}; }
.rec{ display:flex; flex-direction:column; gap:22px; margin-top:4px; }
.rec .row{ display:flex; gap:22px; align-items:flex-start; }
.rec .n{ flex:0 0 auto; width:52px; height:52px; border-radius:50%; background:${p.grad}; color:${p.onGrad};
  font-weight:800; font-size:28px; display:flex; align-items:center; justify-content:center; }
.rec .rt{ font-size:30px; line-height:1.32; color:${p.body}; padding-top:6px; }
.rec .rt b{ font-weight:800; color:${p.strong}; }
.close{ margin-top:22px; font-size:28px; line-height:1.4; color:${p.muted}; font-style:italic; }
.hint{ margin-top:12px; background:${p.hintBg}; border-left:5px solid ${p.hintBorder}; border-radius:12px;
  padding:24px 28px; }
.hint .hl{ font-weight:800; font-size:22px; letter-spacing:.06em; text-transform:uppercase; color:${p.hintHl}; }
.hint .ht{ margin-top:8px; font-size:29px; line-height:1.36; color:${p.body}; }
.merk{ margin-top:14px; font-family:'Fraunces',Georgia,serif; font-style:italic; font-weight:500;
  font-size:34px; line-height:1.34; color:${p.merkText}; border-left:5px solid ${p.merkBorder}; padding-left:26px; }
.cta{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:64px; line-height:1.12; letter-spacing:-.5px; color:${p.ink}; }
.btn{ align-self:flex-start; margin-top:14px; padding:22px 40px; border-radius:999px; background:${p.grad};
  color:${p.onGrad}; font-weight:800; font-size:29px; }
.foot{ display:flex; align-items:center; justify-content:space-between; gap:24px; }
.handle{ font-weight:600; font-size:25px; letter-spacing:.03em; color:${p.muted}; }
.dots{ display:flex; align-items:center; gap:9px; }
.dot2{ width:10px; height:10px; border-radius:50%; background:${p.dotOff}; }
.dot2.on{ background:${p.grad}; box-shadow:0 0 12px rgba(${p.accentShadow},.4); }
.count{ font-size:23px; color:${p.muted}; font-variant-numeric:tabular-nums; }
.swipe{ font-size:25px; color:${p.muted}; font-weight:600; }
`; };

const fontsCss = readFileSync(join(COVERS, "_fonts.css"), "utf8");
// Emblem je Welt (wie brand-assets.mjs): Gold-Gehirn für die Gold-Welten,
// Türkis-Gehirn für die Türkis-Welten.
const logoGoldUri = `data:image/png;base64,${readFileSync(join(ROOT, "public", "logo-brain-gold-freigestellt.png")).toString("base64")}`;
const logoTealUri = `data:image/png;base64,${readFileSync(join(ROOT, "public", "logo-brain-tuerkis.png")).toString("base64")}`;
const logoFor = (theme) =>
  theme === "tuerkis" || theme === "tuerkis-hell" ? logoTealUri : logoGoldUri;
const fit = (t, big, mid, sm) => (t.length <= 120 ? big : t.length <= 240 ? mid : sm);

function dots(active, total) {
  return `<div class="dots">${Array.from({ length: total }, (_, i) => `<span class="dot2${i === active ? " on" : ""}"></span>`).join("")}</div>`;
}
function li(items) {
  return `<div class="list">${items.map((it) => `<div class="li"><span class="dot"></span><span class="txt"><b>${it.lead}</b> – ${it.text}</span></div>`).join("")}</div>`;
}
function mid(s) {
  switch (s.role) {
    case "cover":
      return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="headline">${s.title}</div><div class="bar"></div><div class="sub">${s.sub}</div></div>`;
    case "stat":
      return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="numbig">${s.num}</div><div class="statlabel">${s.label}</div><div class="body" style="font-size:${fit(s.text,36,32,29)}px">${s.text}</div></div>`;
    case "compare":
      return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="title">${s.title}</div>
        <div class="cards">${s.cards.map((c) => `<div class="card"><h3>${c.head}</h3><p>${c.text}</p><span class="chip ${c.good ? "good" : "bad"}">${c.tag}</span></div>`).join("")}</div></div>`;
    case "list":
      return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="title">${s.title}</div>${li(s.items)}</div>`;
    case "step":
      return `<div class="mid"><div class="rubric"><span class="num">${s.n}</span><span class="eyebrow">${s.rubric}</span></div>
        <div class="title">${s.title}</div><div class="body" style="font-size:${fit(s.text,40,35,31)}px">${s.text}</div>
        ${s.hint ? `<div class="hint"><div class="hl">${s.hintLabel}</div><div class="ht">${s.hint}</div></div>` : ""}</div>`;
    case "setup":
      return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="title">${s.title}</div><div class="body" style="font-size:${fit(s.text,38,34,30)}px">${s.text}</div></div>`;
    case "recap":
      return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="title">${s.title}</div>
        <div class="rec">${s.items.map((it, i) => `<div class="row"><span class="n">${i + 1}</span><span class="rt"><b>${it.lead}</b> – ${it.text}</span></div>`).join("")}</div>
        <div class="close">${s.close}</div></div>`;
    case "remedy":
      return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="title">${s.title}</div><div class="body" style="font-size:${fit(s.text,34,31,28)}px">${s.text}</div><div class="merk">${s.merksatz}</div></div>`;
    case "cta":
      return `<div class="mid"><div class="eyebrow">${s.eyebrow}</div><div class="cta">${s.title}</div><div class="sub">${s.sub}</div><div class="btn">${s.button}</div></div>`;
    default: return "";
  }
}
function slideHtml(series, s, idx, total, css, logo) {
  const isCover = s.role === "cover";
  const numbg = s.role === "step" ? `<div class="numbg">${s.n}</div>` : "";
  const foot = `<div class="foot"><span class="handle">${isCover ? series.label : HANDLE}</span>${dots(idx, total)}<span class="count">${isCover ? `<span class="swipe">wischen ${ARROW}</span>` : `${idx + 1}/${total}`}</span></div>`;
  // Jede Slide trägt die volle Wortmarke (Schriftlogo) neben dem Gehirn –
  // Zeile 2 „Deiner Gedanken" zentriert unter Zeile 1, wie auf der Startseite.
  const wm = `<div class="wm"><span class="wm1">Werde <b>Meister</b></span><span class="wm2">Deiner Gedanken</span></div>`;
  const top = `<div class="top cover"><img class="logo" src="${logo}" alt="">${wm}</div>`;
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${fontsCss}\n${css}</style></head>
<body><div class="slide">${numbg}<div class="content">
  ${top}
  ${mid(s)}
  ${foot}
</div></div></body></html>`;
}

const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try { const p = require("playwright").chromium.executablePath(); if (p && existsSync(p)) return p; } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}
const { chromium } = require("playwright");
const only = process.env.FORMAT; // optional: nur ein Format rendern

// Playwright rendert das Viewport pixelgenau (Chromium-CLI --window-size lässt
// je nach Build ~87px unten weg → abgeschnittener Footer).
const browser = await chromium.launch({ executablePath: findChrome() });
for (const F of FORMATS) {
  if (only && F.key !== only) continue;
  const page = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 1 });
  // Jede Serie in allen vier Designfarben. Unterordner je Welt:
  //   dunkel → <format>            (Gold auf Navy, Standard)
  //   hell   → <format>-hell       (Gold auf Creme)
  //   tuerkis→ <format>-tuerkis    (Türkis auf Navy)
  //   tuerkis-hell → <format>-tuerkis-hell (Türkis auf Creme)
  // Optional nur ein Theme rendern: THEME=tuerkis node docs/carousels/marketing-serien.mjs
  const themes = (process.env.THEME
    ? [process.env.THEME]
    : ["dunkel", "hell", "tuerkis", "tuerkis-hell"]);
  for (const theme of themes) {
    const css = cssFor(F.w, F.h, F.pad, theme);
    const logo = logoFor(theme);
    const sub = theme === "dunkel" ? F.key : `${F.key}-${theme}`;
    for (const series of SERIES) {
      const dir = join(OUTBASE, series.key, sub);
      mkdirSync(dir, { recursive: true });
      const total = series.slides.length;
      for (let i = 0; i < series.slides.length; i++) {
        await page.setContent(slideHtml(series, series.slides[i], i, total, css, logo), { waitUntil: "networkidle" });
        await page.screenshot({ path: join(dir, `slide-${String(i + 1).padStart(2, "0")}.png`) });
      }
      console.log(`✓ ${sub} · ${series.label}: ${total} Slides`);
    }
  }
  await page.close();
}
await browser.close();
console.log("Fertig.");
