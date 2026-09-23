// Serie H „Haltung & Klarheit" – Config für das gemeinsame Layout-Modul (lib/centered).
const { buildSeries } = require("./lib/centered");

const POSES = {
  armeVerschraenktSeite: { nat: [941, 1671],  bb: { minx: 281, maxx: 744, miny: 26, maxy: 1592 } },
  armeVerschraenktB:     { nat: [1024, 1536], bb: { minx: 317, maxx: 751, miny: 35, maxy: 1507 } },
  erklaert:              { nat: [941, 1670],  bb: { minx: 253, maxx: 841, miny: 30, maxy: 1602 } },
  zeigtSeite:            { nat: [941, 1672],  bb: { minx: 292, maxx: 733, miny: 39, maxy: 1583 } },
  doppelzeiger:          { nat: [941, 1672],  bb: { minx: 237, maxx: 748, miny: 48, maxy: 1609 } },
  fingerhochTasche:      { nat: [941, 1672],  bb: { minx: 234, maxx: 737, miny: 40, maxy: 1601 } },
};

const n = buildSeries({
  prefix: "haltung",
  tag: "Haltung & Klarheit",
  coverTitle: `<em>Haltung</em> &amp;<br>Klarheit`,
  coverSubtitle: "Standpunkt beziehen – ohne Lautstärke.",
  poses: POSES,
  items: [
    { n: 1, key: "standpunkt", pose: "armeVerschraenktSeite",
      q: `Ein klarer <em>Standpunkt</em><br>braucht keine<br><em>Lautst&auml;rke</em>.` },
    { n: 2, key: "haltung", pose: "armeVerschraenktB",
      q: `<em>Haltung</em> zeigt sich,<br>wenn es<br><em>unbequem</em> wird.` },
    { n: 3, key: "klar", pose: "erklaert",
      q: `Sag es <em>klar</em>.<br>Wahrheit braucht<br>keine <em>Umwege</em>.` },
    { n: 4, key: "glauben", pose: "zeigtSeite",
      q: `Du <em>entscheidest</em>,<br>was du<br><em>glaubst</em>.` },
    { n: 5, key: "jetzt", pose: "doppelzeiger",
      q: `Fang bei <em>dir</em> an.<br>Und zwar <em>jetzt</em>.` },
    { n: 6, key: "gedanke", pose: "fingerhochTasche",
      q: `Ein klarer <em>Gedanke</em><br>schl&auml;gt tausend<br><em>Meinungen</em>.` },
  ],
});
console.log(`Serie H „Haltung & Klarheit": ${n}x2 + Cover -> tools/social/weisheiten/build/`);
