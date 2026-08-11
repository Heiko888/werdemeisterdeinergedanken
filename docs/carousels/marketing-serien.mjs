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
const GRAD = "linear-gradient(120deg,#8cc63f 0%,#21b2bd 100%)";

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
        sub: "Wer versteht, wie Gedanken entstehen und gelenkt werden, gewinnt ein Stück Kontrolle zurück – und damit seine Freiheit.", button: "Zurück zur mentalen Freiheit →" },
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
        sub: "Speichere den Post, wähle einen Weg und starte heute. Schreib mir die Zahl in die Kommentare.", button: "Jetzt starten →" },
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
        sub: "Beobachte heute einmal bewusst, was deine Gedanken auslöst. Teile deine Erkenntnis in den Kommentaren.", button: "Mehr erfahren →" },
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
        sub: "Speichere den Post und schreib mir die Zahl in die Kommentare. Die Vertiefungen mit allen Quellen findest du auf der Website.", button: "Mehr erfahren →" },
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
        sub: "Link in Bio – oder direkt auf werdemeisterdeinergedanken.de. Speichere den Post, damit du ihn wiederfindest.", button: "Gratis sichern →" },
    ],
  },
];

// ---------------------------------------------------------------------------
const cssFor = (W, H, PAD) => `
*{ margin:0; padding:0; box-sizing:border-box; }
html,body{ background:#05060c; overflow:hidden; }
.slide{ position:relative; width:${W}px; height:${H}px; overflow:hidden;
  font-family:'Inter',system-ui,sans-serif; color:#f4f7ff; }
.slide::before{ content:""; position:absolute; inset:0; z-index:0;
  background:
    radial-gradient(50% 120% at 88% 12%, rgba(33,178,189,.30), transparent 60%),
    radial-gradient(46% 120% at 6% 96%, rgba(54,112,238,.24), transparent 60%),
    radial-gradient(40% 90% at 74% 90%, rgba(140,198,63,.14), transparent 60%),
    #08102a; }
.slide::after{ content:""; position:absolute; inset:0; z-index:0; pointer-events:none;
  background-image:
    radial-gradient(2.4px 2.4px at 18% 22%, rgba(255,255,255,.5), transparent),
    radial-gradient(1.7px 1.7px at 80% 16%, rgba(185,222,255,.45), transparent),
    radial-gradient(2.8px 2.8px at 30% 82%, rgba(255,255,255,.4), transparent),
    radial-gradient(1.6px 1.6px at 88% 70%, rgba(200,240,235,.5), transparent),
    radial-gradient(2px 2px at 60% 90%, rgba(255,255,255,.34), transparent); }
.content{ position:absolute; inset:0; z-index:3; display:flex; flex-direction:column; padding:${PAD}px 80px ${Math.max(56, PAD - 12)}px; }
.top{ display:flex; align-items:flex-start; justify-content:space-between; gap:32px; }
.logo{ width:160px; height:auto; filter:drop-shadow(0 4px 22px rgba(52,196,196,.30)); }
.tag{ text-align:right; padding-top:6px; font-weight:800; font-size:19px; letter-spacing:.13em;
  text-transform:uppercase; background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.mid{ flex:1 1 auto; display:flex; flex-direction:column; justify-content:center; gap:20px; }
.eyebrow{ font-weight:800; font-size:21px; letter-spacing:.15em; text-transform:uppercase;
  color:#34c4c4; }
.headline{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:76px; line-height:1.05;
  letter-spacing:-1px; filter:drop-shadow(0 6px 30px rgba(0,0,0,.55)); }
.title{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:62px; line-height:1.08; letter-spacing:-.5px;
  filter:drop-shadow(0 6px 30px rgba(0,0,0,.55)); }
.bar{ width:120px; height:6px; border-radius:6px; background:${GRAD}; }
.sub{ font-size:33px; line-height:1.38; color:#c2d0e4; max-width:92%; }
.body{ font-family:'Fraunces',Georgia,serif; font-weight:500; line-height:1.34; color:#eef3fb;
  filter:drop-shadow(0 4px 22px rgba(0,0,0,.5)); }
.numbig{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:180px; line-height:.9; letter-spacing:-2px;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent;
  filter:drop-shadow(0 8px 30px rgba(52,196,196,.25)); }
.statlabel{ font-weight:700; font-size:30px; line-height:1.3; color:#e7eefb; }
.numbg{ position:absolute; z-index:1; right:40px; top:50%; transform:translateY(-50%); font-family:'Fraunces',Georgia,serif;
  font-weight:600; font-size:440px; line-height:.8; color:rgba(255,255,255,.05); }
.rubric{ display:flex; align-items:center; gap:16px; }
.rubric .num{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:40px;
  background:${GRAD}; -webkit-background-clip:text; background-clip:text; -webkit-text-fill-color:transparent; }
.cards{ display:flex; gap:26px; }
.card{ flex:1; background:rgba(255,255,255,.05); border:1px solid rgba(255,255,255,.10);
  border-radius:26px; padding:38px 34px; display:flex; flex-direction:column; gap:18px; }
.card h3{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:40px; line-height:1.1; }
.card p{ font-size:27px; line-height:1.38; color:#c8d5e7; flex:1; }
.chip{ align-self:flex-start; padding:12px 22px; border-radius:999px; font-weight:700; font-size:23px; }
.chip.good{ background:rgba(140,198,63,.16); color:#b9e08a; border:1px solid rgba(140,198,63,.4); }
.chip.bad{ background:rgba(230,120,90,.14); color:#f0b49b; border:1px solid rgba(230,120,90,.38); }
.list{ display:flex; flex-direction:column; gap:30px; margin-top:6px; }
.li{ display:flex; gap:22px; align-items:flex-start; }
.li .dot{ margin-top:14px; width:16px; height:16px; border-radius:50%; background:${GRAD}; flex:0 0 auto; }
.li .txt{ font-size:31px; line-height:1.36; color:#dbe6f4; }
.li .txt b{ font-weight:800; color:#fff; }
.rec{ display:flex; flex-direction:column; gap:22px; margin-top:4px; }
.rec .row{ display:flex; gap:22px; align-items:flex-start; }
.rec .n{ flex:0 0 auto; width:52px; height:52px; border-radius:50%; background:${GRAD}; color:#04121a;
  font-weight:800; font-size:28px; display:flex; align-items:center; justify-content:center; }
.rec .rt{ font-size:30px; line-height:1.32; color:#dbe6f4; padding-top:6px; }
.rec .rt b{ font-weight:800; color:#fff; }
.close{ margin-top:22px; font-size:28px; line-height:1.4; color:#a7bad2; font-style:italic; }
.hint{ margin-top:12px; background:rgba(52,196,196,.09); border-left:5px solid #21b2bd; border-radius:12px;
  padding:24px 28px; }
.hint .hl{ font-weight:800; font-size:22px; letter-spacing:.06em; text-transform:uppercase; color:#5fd0d6; }
.hint .ht{ margin-top:8px; font-size:29px; line-height:1.36; color:#dbe6f4; }
.merk{ margin-top:14px; font-family:'Fraunces',Georgia,serif; font-style:italic; font-weight:500;
  font-size:34px; line-height:1.34; color:#cfe9c4; border-left:5px solid #8cc63f; padding-left:26px; }
.cta{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:64px; line-height:1.12; letter-spacing:-.5px; }
.btn{ align-self:flex-start; margin-top:14px; padding:22px 40px; border-radius:999px; background:${GRAD};
  color:#04121a; font-weight:800; font-size:29px; }
.foot{ display:flex; align-items:center; justify-content:space-between; gap:24px; }
.handle{ font-weight:600; font-size:25px; letter-spacing:.03em; color:#9db1cb; }
.dots{ display:flex; align-items:center; gap:9px; }
.dot2{ width:10px; height:10px; border-radius:50%; background:rgba(255,255,255,.22); }
.dot2.on{ background:${GRAD}; box-shadow:0 0 12px rgba(52,196,196,.5); }
.count{ font-size:23px; color:#9db1cb; font-variant-numeric:tabular-nums; }
.swipe{ font-size:25px; color:#9db1cb; font-weight:600; }
`;

const fontsCss = readFileSync(join(COVERS, "_fonts.css"), "utf8");
const logoUri = `data:image/png;base64,${readFileSync(join(COVERS, "logo.png")).toString("base64")}`;
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
function slideHtml(series, s, idx, total, css) {
  const isCover = s.role === "cover";
  const numbg = s.role === "step" ? `<div class="numbg">${s.n}</div>` : "";
  const foot = `<div class="foot"><span class="handle">${isCover ? series.label : HANDLE}</span>${dots(idx, total)}<span class="count">${isCover ? '<span class="swipe">wischen →</span>' : `${idx + 1}/${total}`}</span></div>`;
  return `<!doctype html><html lang="de"><head><meta charset="utf-8"><style>${fontsCss}\n${css}</style></head>
<body><div class="slide">${numbg}<div class="content">
  <div class="top"><img class="logo" src="${logoUri}" alt=""><div class="tag">${isCover ? "" : series.tag}</div></div>
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
  const css = cssFor(F.w, F.h, F.pad);
  const page = await browser.newPage({ viewport: { width: F.w, height: F.h }, deviceScaleFactor: 1 });
  for (const series of SERIES) {
    const dir = join(OUTBASE, series.key, F.key);
    mkdirSync(dir, { recursive: true });
    const total = series.slides.length;
    for (let i = 0; i < series.slides.length; i++) {
      await page.setContent(slideHtml(series, series.slides[i], i, total, css), { waitUntil: "networkidle" });
      await page.screenshot({ path: join(dir, `slide-${String(i + 1).padStart(2, "0")}.png`) });
    }
    console.log(`✓ ${F.key} · ${series.label}: ${total} Slides`);
  }
  await page.close();
}
await browser.close();
console.log("Fertig.");
