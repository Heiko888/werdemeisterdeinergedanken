// Serie D „Muster & Vermeidung" – Config für das gemeinsame Layout-Modul (lib/centered).
const { buildSeries } = require("./lib/centered");

const POSES = {
  kopfkratzen:    { nat: [1024, 1536], bb: { minx: 194, maxx: 786, miny: 46, maxy: 1482 } },
  augenZu:        { nat: [1024, 1536], bb: { minx: 166, maxx: 836, miny: 30, maxy: 1454 } },
  ohrenZu:        { nat: [1024, 1536], bb: { minx: 108, maxx: 862, miny: 22, maxy: 1444 } },
  mundZu:         { nat: [1024, 1536], bb: { minx: 184, maxx: 804, miny: 42, maxy: 1480 } },
  schulterzucken: { nat: [1024, 1536], bb: { minx: 78,  maxx: 934, miny: 34, maxy: 1486 } },
};

const n = buildSeries({
  prefix: "muster",
  tag: "Muster & Vermeidung",
  coverTitle: `<em>Muster</em> &amp;<br>Vermeidung`,
  coverSubtitle: "Was du nicht anschaust, steuert dich.",
  poses: POSES,
  items: [
    { key: "kopfkratzen", pose: "kopfkratzen",
      q: `Verwirrung ist<br>der erste<br>Schritt zur<br><em>Klarheit</em>.` },
    { key: "augen", pose: "augenZu",
      q: `Was du nicht<br><em>anschauen</em><br>willst,<br>steuert dich.` },
    { key: "ohren", pose: "ohrenZu",
      q: `Die <em>Wahrheit</em>,<br>die du nicht<br>h&ouml;ren willst,<br>meint <em>dich</em>.` },
    { key: "mund", pose: "mundZu",
      q: `Was du<br><em>verschweigst</em>,<br>bestimmt dich<br>im <em>Stillen</em>.` },
    { key: "schulterzucken", pose: "schulterzucken",
      q: `&bdquo;Keine <em>Ahnung</em>&ldquo;<br>ist oft der<br>ehrlichste<br><em>Anfang</em>.` },
  ],
});
console.log(`Serie D „Muster & Vermeidung": ${n}x2 + Cover -> tools/social/weisheiten/build/`);
