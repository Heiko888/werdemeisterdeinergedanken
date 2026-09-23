// Serie E „Klartext & Entscheidung" + E-Book-CTA – Config für lib/centered.
const { buildSeries } = require("./lib/centered");

const POSES = {
  fingerhoch: { nat: [1024, 1536], bb: { minx: 44,  maxx: 1022, miny: 12, maxy: 1534 } },
  zeigen:     { nat: [1024, 1536], bb: { minx: 134, maxx: 938,  miny: 38, maxy: 1534 } },
  stopp:      { nat: [1024, 1536], bb: { minx: 166, maxx: 808,  miny: 32, maxy: 1534 } },
  handBrust:  { nat: [1024, 1536], bb: { minx: 198, maxx: 714,  miny: 32, maxy: 1502 } },
  punkt:      { nat: [1024, 1536], bb: { minx: 152, maxx: 882,  miny: 24, maxy: 1534 } },
  ebook:      { nat: [1024, 1536], bb: { minx: 140, maxx: 978,  miny: 30, maxy: 1534 } },
};

const nk = buildSeries({
  prefix: "klartext",
  tag: "Klartext & Entscheidung",
  coverTitle: `<em>Klartext</em> &amp;<br>Entscheidung`,
  coverSubtitle: "Klare Worte, klare Wahl.",
  poses: POSES,
  items: [
    { n: 1, key: "erkenntnis", pose: "fingerhoch",
      q: `Der Moment der<br><em>Erkenntnis</em><br>ver&auml;ndert<br><em>alles</em>.` },
    { n: 2, key: "du", pose: "zeigen",
      q: `Niemand denkt<br>das f&uuml;r dich &ndash;<br>nur <em>du</em>.` },
    { n: 3, key: "nein", pose: "stopp",
      q: `<em>Nein</em> ist ein<br>vollst&auml;ndiger<br><em>Satz</em>.` },
    { n: 4, key: "beidir", pose: "handBrust",
      q: `Alles beginnt<br>da, wo du<br>hinschaust:<br>bei <em>dir</em>.` },
    { n: 5, key: "entscheidung", pose: "punkt",
      q: `Eine <em>Entscheidung</em><br>ist st&auml;rker<br>als hundert<br><em>Vors&auml;tze</em>.` },
  ],
});

// E-Book-CTA-Motiv (eigener Prefix, ohne Cover, mit goldener CTA-Pille)
buildSeries({
  prefix: "ebook",
  tag: "Gratis E-Book",
  noCover: true,
  poses: POSES,
  items: [
    { n: 1, key: "gratis", pose: "ebook",
      q: `Dein <em>Startpunkt</em>:<br>das E-Book<br>&ndash; <em>kostenlos</em>.`,
      cta: "Gratis E-Book &middot; Link in Bio" },
  ],
});
console.log(`Serie E „Klartext" (${nk}) + E-Book: -> tools/social/weisheiten/build/`);
