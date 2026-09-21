// Serie G „Aufbruch & Energie" – Config für das gemeinsame Layout-Modul (lib/centered).
const { buildSeries } = require("./lib/centered");

const POSES = {
  sprung:     { nat: [1024, 1536], bb: { minx: 9,   maxx: 1013, miny: 97, maxy: 1302 } },
  rennt:      { nat: [1024, 1536], bb: { minx: 226, maxx: 833,  miny: 10, maxy: 1516 } },
  reichtHand: { nat: [1024, 1536], bb: { minx: 287, maxx: 768,  miny: 28, maxy: 1465 } },
  gehtZeigt:  { nat: [941, 1672],  bb: { minx: 219, maxx: 746,  miny: 15, maxy: 1607 } },
  offeneArme: { nat: [941, 1672],  bb: { minx: 19,  maxx: 928,  miny: 11, maxy: 1614 } },
  merke:      { nat: [941, 1670],  bb: { minx: 202, maxx: 724,  miny: 28, maxy: 1604 } },
};

const n = buildSeries({
  prefix: "aufbruch",
  tag: "Aufbruch & Energie",
  coverTitle: `<em>Aufbruch</em> &amp;<br>Energie`,
  coverSubtitle: "Der erste Schritt gehört dir.",
  poses: POSES,
  items: [
    { n: 1, key: "sprung",  pose: "sprung", lift: 150, scale: 0.92,
      q: `Der <em>Sprung</em><br>ist k&uuml;rzer als<br>die <em>Angst</em> davor.` },
    { n: 2, key: "weg",     pose: "rennt",
      q: `Wer <em>losl&auml;uft</em>,<br>findet den<br><em>Weg</em>.` },
    { n: 3, key: "jetzt",   pose: "reichtHand",
      q: `<em>Komm mit</em>.<br>Dein Weg<br>beginnt <em>jetzt</em>.` },
    { n: 4, key: "schritt", pose: "gehtZeigt",
      q: `Der erste<br><em>Schritt</em><br>geh&ouml;rt <em>dir</em>.` },
    { n: 5, key: "offen",   pose: "offeneArme", scale: 0.96,
      q: `&Ouml;ffne dich.<br>Das <em>Neue</em><br>ist schon <em>da</em>.` },
    { n: 6, key: "entscheidung", pose: "merke",
      q: `Alles beginnt<br>mit einer<br><em>Entscheidung</em>.` },
  ],
});
console.log(`Serie G „Aufbruch & Energie": ${n}x2 + Cover -> tools/social/weisheiten/build/`);
