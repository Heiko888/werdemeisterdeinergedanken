// Story „Meisterschaft" (9:16) – baut die Weisheit „Du kannst nicht eine Sache ständig
// wiederholen, ohne dabei immer besser zu werden." zu einer 6-teiligen Story aus und
// wendet sie auf die Marke an (Wiederholung → Meisterschaft der Gedanken).
const { buildSeries } = require("./lib/centered");

const POSES = {
  armeVerschraenktB: { nat: [1024, 1536], bb: { minx: 317, maxx: 751,  miny: 35, maxy: 1507 } },
  erklaert:          { nat: [941, 1670],  bb: { minx: 253, maxx: 841,  miny: 30, maxy: 1602 } },
  kinn:              { nat: [1024, 1536], bb: { minx: 160, maxx: 858,  miny: 28, maxy: 1534 } },
  kopfkratzen:       { nat: [1024, 1536], bb: { minx: 194, maxx: 786,  miny: 46, maxy: 1482 } },
  zeigtSeite:        { nat: [941, 1672],  bb: { minx: 292, maxx: 733,  miny: 39, maxy: 1583 } },
  offeneHand:        { nat: [1024, 1536], bb: { minx: 208, maxx: 882,  miny: 32, maxy: 1534 } },
};

const n = buildSeries({
  prefix: "story-meisterschaft",
  tag: "Meisterschaft",
  formats: ["9x16"],
  noCover: true,
  poses: POSES,
  items: [
    { n: 1, key: "hook", pose: "armeVerschraenktB", scale: 0.86,
      q: `Du kannst nicht<br>eine Sache st&auml;ndig<br><em>wiederholen</em>,<br>ohne immer <em>besser</em><br>zu werden.` },
    { n: 2, key: "gedanken", pose: "erklaert",
      q: `Das gilt f&uuml;r alles &ndash;<br>auch f&uuml;r deine<br><em>Gedanken</em>.` },
    { n: 3, key: "spur", pose: "kinn",
      q: `Jeder Gedanke,<br>den du oft denkst,<br>gr&auml;bt eine <em>Spur</em>.` },
    { n: 4, key: "zweifel", pose: "kopfkratzen",
      q: `Wiederholst du<br><em>Zweifel</em>, wirst du<br>Meister im <em>Zweifeln</em>.` },
    { n: 5, key: "klarheit", pose: "zeigtSeite",
      q: `Wiederholst du<br><em>Klarheit</em>, wirst du<br>Meister der <em>Klarheit</em>.` },
    { n: 6, key: "start", pose: "offeneHand",
      q: `Also &ndash; worin willst<br>du <em>besser</em> werden?<br>Fang <em>heute</em> an.`,
      cta: "Speichern &middot; dranbleiben" },
  ],
});
console.log(`Story „Meisterschaft" (9:16): ${n} Slides -> tools/social/weisheiten/build/`);
