// Serien I–L (Loslassen/Mut/Fokus/Handeln) – Configs für das gemeinsame Layout-Modul.
const { buildSeries } = require("./lib/centered");

const POSES = {
  offeneArme:            { nat: [941, 1672],  bb: { minx: 19,  maxx: 928,  miny: 11, maxy: 1614 } },
  augenZu:               { nat: [1024, 1536], bb: { minx: 166, maxx: 836,  miny: 30, maxy: 1454 } },
  handHerz:              { nat: [1024, 1536], bb: { minx: 172, maxx: 864,  miny: 34, maxy: 1534 } },
  offeneHand:            { nat: [1024, 1536], bb: { minx: 208, maxx: 882,  miny: 32, maxy: 1534 } },
  offeneHand2:           { nat: [1024, 1536], bb: { minx: 122, maxx: 846,  miny: 38, maxy: 1534 } },
  kinn:                  { nat: [1024, 1536], bb: { minx: 160, maxx: 858,  miny: 28, maxy: 1534 } },
  faust:                 { nat: [1024, 1536], bb: { minx: 295, maxx: 850,  miny: 30, maxy: 1522 } },
  handBrust:             { nat: [1024, 1536], bb: { minx: 198, maxx: 714,  miny: 32, maxy: 1502 } },
  armeVerschraenktA:     { nat: [1024, 1536], bb: { minx: 305, maxx: 743,  miny: 16, maxy: 1504 } },
  armeVerschraenktB:     { nat: [1024, 1536], bb: { minx: 317, maxx: 751,  miny: 35, maxy: 1507 } },
  sprung:                { nat: [1024, 1536], bb: { minx: 9,   maxx: 1013, miny: 97, maxy: 1302 } },
  stopp:                 { nat: [1024, 1536], bb: { minx: 166, maxx: 808,  miny: 32, maxy: 1534 } },
  fingerhoch:            { nat: [1024, 1536], bb: { minx: 44,  maxx: 1022, miny: 12, maxy: 1534 } },
  fingerhochTasche:      { nat: [941, 1672],  bb: { minx: 234, maxx: 737,  miny: 40, maxy: 1601 } },
  punkt:                 { nat: [1024, 1536], bb: { minx: 152, maxx: 882,  miny: 24, maxy: 1534 } },
  zeigen:                { nat: [1024, 1536], bb: { minx: 134, maxx: 938,  miny: 38, maxy: 1534 } },
  merke:                 { nat: [941, 1670],  bb: { minx: 202, maxx: 724,  miny: 28, maxy: 1604 } },
  nachdenken:            { nat: [1024, 1536], bb: { minx: 65,  maxx: 987,  miny: 42, maxy: 1508 } },
  zeigtSeite:            { nat: [941, 1672],  bb: { minx: 292, maxx: 733,  miny: 39, maxy: 1583 } },
  gehtZeigt:             { nat: [941, 1672],  bb: { minx: 219, maxx: 746,  miny: 15, maxy: 1607 } },
  rennt:                 { nat: [1024, 1536], bb: { minx: 226, maxx: 833,  miny: 10, maxy: 1516 } },
  doppelzeiger:          { nat: [941, 1672],  bb: { minx: 237, maxx: 748,  miny: 48, maxy: 1609 } },
  reichtHand:            { nat: [1024, 1536], bb: { minx: 287, maxx: 768,  miny: 28, maxy: 1465 } },
  ansprache:             { nat: [1024, 1536], bb: { minx: 288, maxx: 838,  miny: 30, maxy: 1458 } },
};

const SERIES = [
  { prefix: "loslassen", tag: "Loslassen & Frieden",
    coverTitle: `<em>Loslassen</em> &amp;<br>Frieden`, coverSubtitle: "Kontrolle abgeben, innere Ruhe finden.", coverBg: 1,
    items: [
      { key: "loslassen", pose: "offeneArme",  q: `Was du <em>losl&auml;sst</em>,<br>kann dich nicht<br>mehr <em>halten</em>.` },
      { key: "stille",    pose: "augenZu",     q: `<em>Stille</em> ist kein<br>Nichts &ndash;<br>sie ist <em>Antwort</em>.` },
      { key: "frieden",   pose: "handHerz",    q: `<em>Frieden</em> beginnt,<br>wo der Kampf<br><em>endet</em>.` },
      { key: "halten",    pose: "offeneHand",  q: `Halte nichts<br>fest, was<br>gehen <em>will</em>.` },
      { key: "vertrauen", pose: "offeneHand2", q: `Vertrau dem,<br>was <em>kommt</em>,<br>wenn du <em>losl&auml;sst</em>.` },
      { key: "atme",      pose: "kinn",        q: `Nicht alles<br>braucht eine<br><em>Antwort</em>. Atme.` },
    ] },
  { prefix: "mut", tag: "Mut & Selbstwert",
    coverTitle: `<em>Mut</em> &amp;<br>Selbstwert`, coverSubtitle: "Sich trauen, sich wertschätzen.", coverBg: 2,
    items: [
      { key: "mut",       pose: "faust",             q: `<em>Mut</em> ist Angst,<br>die trotzdem<br><em>losgeht</em>.` },
      { key: "wert",      pose: "handBrust",         q: `Dein <em>Wert</em><br>h&auml;ngt an<br>keinem <em>Applaus</em>.` },
      { key: "stehen",    pose: "armeVerschraenktA", q: `Steh zu <em>dir</em>,<br>auch wenn du<br><em>allein</em> stehst.` },
      { key: "trau",      pose: "sprung", lift: 150, scale: 0.92, q: `Trau dich &ndash;<br>der Boden<br>kommt von <em>selbst</em>.` },
      { key: "nein",      pose: "stopp",             q: `<em>Nein</em> sagen<br>ist auch<br><em>Selbstachtung</em>.` },
      { key: "genug",     pose: "fingerhoch",        q: `Du bist <em>genug</em>.<br>Schon <em>jetzt</em>.` },
    ] },
  { prefix: "fokus", tag: "Fokus & Disziplin",
    coverTitle: `<em>Fokus</em> &amp;<br>Disziplin`, coverSubtitle: "Dranbleiben, Prioritäten setzen.", coverBg: 3,
    items: [
      { key: "fokus",     pose: "fingerhochTasche",  q: `<em>Fokus</em> hei&szlig;t,<br>Nein zu sagen<br>zu fast <em>allem</em>.` },
      { key: "disziplin", pose: "punkt",             q: `<em>Disziplin</em> ist<br>Liebe zu<br>deinem <em>Ziel</em>.` },
      { key: "ziel",      pose: "zeigen",            q: `Ein <em>Ziel</em><br>ohne Plan<br>bleibt ein <em>Wunsch</em>.` },
      { key: "schritte",  pose: "merke",             q: `Kleine Schritte,<br>t&auml;glich &ndash;<br>schlagen <em>Talent</em>.` },
      { key: "weglassen", pose: "armeVerschraenktB", q: `<em>Klarheit</em> entsteht,<br>wenn du<br><em>wegl&auml;sst</em>.` },
      { key: "langsam",   pose: "nachdenken",        q: `Denk <em>langsam</em>.<br>Dann handle<br><em>schnell</em>.` },
    ] },
  { prefix: "handeln", tag: "Verantwortung & Handeln",
    coverTitle: `<em>Verantwortung</em><br>&amp; Handeln`, coverSubtitle: "Selbst ins Tun kommen.", coverBg: 4,
    items: [
      { key: "zug",       pose: "zeigtSeite",   q: `Es ist <em>dein</em><br>Leben. Also<br>dein <em>Zug</em>.` },
      { key: "tun",       pose: "gehtZeigt",    q: `Reden <em>&auml;ndert</em> nichts.<br><em>Tun</em> schon.` },
      { key: "moment",    pose: "rennt",        q: `Warte nicht auf<br>den <em>perfekten</em><br>Moment.` },
      { key: "verantwortung", pose: "doppelzeiger", q: `<em>Du</em> bist dran.<br>Und das ist<br>gute <em>Nachricht</em>.` },
      { key: "eigenehand", pose: "reichtHand",  q: `Nimm dein Leben<br>in die <em>eigene</em><br>Hand.` },
      { key: "gestalten", pose: "ansprache",    q: `H&ouml;r auf zu <em>warten</em>.<br>Fang an zu<br><em>gestalten</em>.` },
    ] },
];

let total = 0;
SERIES.forEach((s) => { total += buildSeries({ poses: POSES, ...s }); });
console.log(`Serien I–L: ${SERIES.length} Serien à 6 Motive (+ Cover) -> tools/social/weisheiten/build/`);
