# Facebook-Redaktionsplan – Woche 25 · Block C – Mentale Selbstverteidigung · Normalisierung

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema
„Normalisierung", Hook „War doch schon immer so?“), Skript
`docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „13 · Normalisierung"),
`src/lib/blog.ts` (`normalisierung-war-doch-schon-immer-so` → real unter
`/blog/normalisierung-war-doch-schon-immer-so`, `src/app/blog/[slug]/page.tsx`),
`src/lib/deep-dives.ts` (`normalisierung`, real unter `/mitglieder/wissen/normalisierung`,
`src/app/mitglieder/wissen/[slug]/page.tsx`), `docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Normalisierung". Hook: „War doch schon immer so?“ Kontext-Text darunter: In kleinen Schritten rutscht eine Veränderung durch, die auf einen Schlag Widerstand geweckt hätte – jeder einzelne Schritt wirkt zu klein, um sich aufzuregen. Ist etwas erst normal, verschwindet die Erinnerung daran, dass es einmal anders war; „war doch schon immer so" stimmt fast nie. | Reel-Serie „selbstverteidigung", Thema „Normalisierung" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „13 · Normalisierung") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/normalisierung` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Was oft genug wiederholt wird, fühlt sich irgendwann normal an – auch das, was es nicht sein sollte. „War schon immer so" beschreibt eine Gewohnheit und begründet gar nichts. Kurzer Teaser, dann Link zum vollständigen Artikel mit vier Fragen, wie du Normalisierung bei dir selbst bemerkst. | Blog-Slug `normalisierung-war-doch-schon-immer-so` → `/blog/normalisierung-war-doch-schon-immer-so` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/normalisierung-war-doch-schon-immer-so` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „„War schon immer so“ beschreibt eine Gewohnheit – und begründet gar nichts" als Diskussionsanstoß, dazu Kontext: Normalisierung zu bemerken heißt, die eigenen Maßstäbe bewusst zu halten, statt sie leise verschieben zu lassen – ein Blick von außen oder von früher macht schnell sichtbar, was sich unbemerkt verschoben hat. Community-Frage: „Was würde dich heute noch stören, wenn du es zum allerersten Mal sehen würdest – aber du hast dich längst daran gewöhnt?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-05-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `normalisierung` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Normalisierung" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Normalisierung) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/normalisierung` und `/#ebook`
  laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "normalisierung-war-doch-schon-immer-so"`, vorhanden). Blog-Pfad ist real
  `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `normalisierung` gegen `src/lib/deep-dives.ts` geprüft, Route real
  vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Kein `sources`-Feld mit
  zitierten Studien vorhanden – deshalb bewusst eine klassische Zitat-Karte
  (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Zitat-Karten-Nummer: zweite Runde durch den 14er-Ordner (Woche 21 → `-01`, … Woche 24 →
  `-04`), diese Woche `-05`. Der Ordner enthält keine Themen-Zuordnung je Nummer (nur
  `WMDG-Zitat-NN[-hell].png` durchnummeriert) – die Person, die die Karte einstellt,
  sollte den tatsächlichen Kartentext gegen das Thema „Normalisierung / eigene Maßstäbe
  bewusst halten" prüfen und ggf. eine passendere Nummer wählen; da `-05` bereits in
  Woche 11 (Thema „Framing") verwendet wurde, ist ein doppelter Einsatz desselben
  Kartenmotivs innerhalb der 26 Wochen möglich und sollte gegen den tatsächlichen
  Veröffentlichungskalender geprüft werden.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
