// Serie F „Einladung & Reflexion" – Config für das gemeinsame Layout-Modul (lib/centered).
const { buildSeries } = require("./lib/centered");

const POSES = {
  kinn:        { nat: [1024, 1536], bb: { minx: 160, maxx: 858, miny: 28, maxy: 1534 } },
  offeneHand:  { nat: [1024, 1536], bb: { minx: 208, maxx: 882, miny: 32, maxy: 1534 } },
  handHerz:    { nat: [1024, 1536], bb: { minx: 172, maxx: 864, miny: 34, maxy: 1534 } },
  ansprache:   { nat: [1024, 1536], bb: { minx: 288, maxx: 838, miny: 30, maxy: 1458 } },
  offeneHand2: { nat: [1024, 1536], bb: { minx: 122, maxx: 846, miny: 38, maxy: 1534 } },
};

const n = buildSeries({
  prefix: "einladung",
  tag: "Einladung & Reflexion",
  coverTitle: `<em>Einladung</em> &amp;<br>Reflexion`,
  coverSubtitle: "Ruhige Impulse zum Innehalten.",
  poses: POSES,
  items: [
    { n: 1, key: "fragen", pose: "kinn",
      q: `Wer <em>fragt</em>,<br>hat den ersten<br>Schritt schon<br><em>gemacht</em>.` },
    { n: 2, key: "indir", pose: "offeneHand",
      q: `Alles, was du<br><em>brauchst</em>,<br>tr&auml;gst du<br>schon in <em>dir</em>.` },
    { n: 3, key: "leiser", pose: "handHerz",
      q: `H&ouml;r auf das,<br>was <em>leiser</em> ist<br>als deine<br><em>Gedanken</em>.` },
    { n: 4, key: "kein-zufall", pose: "ansprache",
      q: `Du bist nicht<br><em>zuf&auml;llig</em><br>hier.` },
    { n: 5, key: "traegt", pose: "offeneHand2",
      q: `Nimm dir Zeit<br>f&uuml;r den <em>Gedanken</em>,<br>der dich<br><em>tr&auml;gt</em>.` },
  ],
});
console.log(`Serie F „Einladung & Reflexion": ${n}x2 + Cover -> tools/social/weisheiten/build/`);
