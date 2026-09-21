// Serie M „Übung & Meisterschaft" – Config für das gemeinsame Layout-Modul (lib/centered).
const { buildSeries } = require("./lib/centered");

const POSES = {
  armeVerschraenktSeite: { nat: [941, 1671],  bb: { minx: 281, maxx: 744, miny: 26, maxy: 1592 } },
  rennt:                 { nat: [1024, 1536], bb: { minx: 226, maxx: 833, miny: 10, maxy: 1516 } },
  punkt:                 { nat: [1024, 1536], bb: { minx: 152, maxx: 882, miny: 24, maxy: 1534 } },
  nachdenken:            { nat: [1024, 1536], bb: { minx: 65,  maxx: 987, miny: 42, maxy: 1508 } },
  gehtZeigt:             { nat: [941, 1672],  bb: { minx: 219, maxx: 746, miny: 15, maxy: 1607 } },
  faust:                 { nat: [1024, 1536], bb: { minx: 295, maxx: 850, miny: 30, maxy: 1522 } },
};

const n = buildSeries({
  prefix: "uebung",
  tag: "Übung & Meisterschaft",
  coverTitle: `<em>Übung</em> &amp;<br>Meisterschaft`,
  coverSubtitle: "Wiederholung, Dranbleiben, Wachstum – wie aus Mühe Können wird.",
  poses: POSES,
  items: [
    { n: 1, key: "meisterschaft", pose: "armeVerschraenktSeite",
      q: `<em>Meisterschaft</em><br>ist &Uuml;bung,<br>die nicht <em>aufh&ouml;rt</em>.` },
    { n: 2, key: "dranbleiben", pose: "rennt",
      q: `Wer <em>dranbleibt</em>,<br>&uuml;berholt jedes<br><em>Talent</em>.` },
    { n: 3, key: "wiederholung", pose: "punkt",
      q: `<em>Wiederholung</em><br>ist die Mutter<br>des <em>K&ouml;nnens</em>.` },
    { n: 4, key: "fehler", pose: "nachdenken",
      q: `Jeder <em>Fehler</em><br>ist eine <em>&Uuml;bung</em><br>mehr.` },
    { n: 5, key: "schritt", pose: "gehtZeigt",
      q: `<em>Schritt</em> f&uuml;r Schritt<br>wird aus M&uuml;he<br><em>Meisterschaft</em>.` },
    { n: 6, key: "wachstum", pose: "faust",
      q: `Wo es <em>schwer</em> wird,<br>beginnt dein<br><em>Wachstum</em>.` },
  ],
});
console.log(`Serie M „Übung & Meisterschaft": ${n}x2 + Cover -> tools/social/weisheiten/build/`);
