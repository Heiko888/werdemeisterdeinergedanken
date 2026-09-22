// Story „Meisterschaft" (9:16) – baut die Weisheit „Du kannst nicht eine Sache ständig
// wiederholen, ohne dabei immer besser zu werden." zu einer 6-teiligen Story aus und
// wendet sie auf die Marke an (Wiederholung → Meisterschaft der Gedanken).
const { buildSeries } = require("./lib/centered");

const POSES = {
  armeVerschraenktB: { nat: [1024, 1536], bb: { minx: 317, maxx: 751,  miny: 35, maxy: 1507 } },
  merke:             { nat: [941, 1670],  bb: { minx: 202, maxx: 724,  miny: 28, maxy: 1604 } },
  nachdenken:        { nat: [1024, 1536], bb: { minx: 65,  maxx: 987,  miny: 42, maxy: 1508 } },
  kopfkratzen:       { nat: [1024, 1536], bb: { minx: 194, maxx: 786,  miny: 46, maxy: 1482 } },
  fingerhoch:        { nat: [1024, 1536], bb: { minx: 44,  maxx: 1022, miny: 12, maxy: 1534 } },
  reichtHand:        { nat: [1024, 1536], bb: { minx: 287, maxx: 768,  miny: 28, maxy: 1465 } },
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
    { n: 2, key: "gedanken", pose: "merke",
      q: `Das gilt f&uuml;r alles &ndash;<br>auch f&uuml;r deine<br><em>Gedanken</em>.` },
    { n: 3, key: "spur", pose: "nachdenken",
      q: `Jeder Gedanke,<br>den du oft denkst,<br>gr&auml;bt eine <em>Spur</em>.` },
    { n: 4, key: "zweifel", pose: "kopfkratzen",
      q: `Wiederholst du<br><em>Zweifel</em>, wirst du<br>Meister im <em>Zweifeln</em>.` },
    { n: 5, key: "klarheit", pose: "fingerhoch",
      q: `Wiederholst du<br><em>Klarheit</em>, wirst du<br>Meister der <em>Klarheit</em>.` },
    { n: 6, key: "start", pose: "reichtHand",
      q: `Also &ndash; worin willst<br>du <em>besser</em> werden?<br>Fang <em>heute</em> an.`,
      cta: "Speichern &middot; dranbleiben" },
  ],
});
console.log(`Story „Meisterschaft" (9:16): ${n} Slides -> tools/social/weisheiten/build/`);
