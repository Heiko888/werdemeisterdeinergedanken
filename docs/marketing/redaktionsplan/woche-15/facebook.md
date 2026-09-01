# Facebook-Redaktionsplan – Woche 15 · Block C – Mentale Selbstverteidigung · Werbung & Mangel

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema „Werbung &
Mangel", Hook „Sie verkauft dir den Mangel"), Skript
`docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „6 · Werbung & künstlicher
Mangel"), `src/lib/blog.ts` (`werbung-und-der-kuenstliche-mangel` → real unter
`/blog/werbung-und-der-kuenstliche-mangel`, `src/app/blog/[slug]/page.tsx`),
`src/lib/deep-dives.ts` (`werbung-und-mangel`, real unter
`/mitglieder/wissen/werbung-und-mangel`, `src/app/mitglieder/wissen/[slug]/page.tsx`),
`docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Werbung & Mangel". Hook: „Sie verkauft dir den Mangel." Kontext-Text darunter: Gute Werbung verkauft kein Produkt, sondern zuerst ein unangenehmes Gefühl – den Eindruck, dass etwas fehlt. Kaum eine Werbung sagt „Du bist genug"; sie deutet an, dass Schönheit, Erfolg oder Ruhe fehlen, ein Mangel, der oft erst Sekunden zuvor künstlich erzeugt wurde. Erst danach erscheint das Produkt als Erlösung von einem Unbehagen, das die Werbung selbst geweckt hat. | Reel-Serie „selbstverteidigung", Thema „Werbung & Mangel" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „6 · Werbung & künstlicher Mangel") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/werbung-und-mangel` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Sobald man sich mit einem idealisierten Bild vergleicht, entsteht ein Abstand – und genau den soll das Produkt schließen, meist geht es dabei gar nicht um die Sache selbst, sondern um Status und Dazugehören. Produkte werden gezielt mit Gefühlen wie Freiheit, Liebe oder Sicherheit verknüpft, nicht weil sie diese Gefühle auslösen, sondern weil die Verknüpfung tausendfach wiederholt wird. Kurzer Teaser, dann Link zum vollständigen Artikel inklusive der einfachen Pause zwischen Impuls und Kauf. | Blog-Slug `werbung-und-der-kuenstliche-mangel` → `/blog/werbung-und-der-kuenstliche-mangel` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/werbung-und-der-kuenstliche-mangel` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Du kaufst nicht die Uhr, sondern das Gefühl, jemand zu sein, der so eine Uhr trägt" als Diskussionsanstoß, dazu Kontext: Der Ausweg ist nicht Verzicht um jeden Preis, sondern Bewusstheit – vieles kaufst du nicht aus echtem Bedarf, sondern weil dir vorher das Gefühl gegeben wurde, dass dir etwas fehlt. Schon eine kurze Pause zwischen Impuls und Kauf reicht oft, um Wunsch von Werbewirkung zu unterscheiden. Community-Frage: „Was hast du zuletzt gekauft, das eigentlich ein Gefühl kaufen sollte – und war der Mangel dahinter überhaupt echt?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-09-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `werbung-und-mangel` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Werbung & künstlicher Mangel" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Werbung & Mangel) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/werbung-und-mangel` und
  `/#ebook` laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "werbung-und-der-kuenstliche-mangel"`, vorhanden). Blog-Pfad ist real
  `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `werbung-und-mangel` gegen `src/lib/deep-dives.ts` geprüft, Route real
  vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Kein `sources`-Feld mit
  zitierten Studien vorhanden – deshalb bewusst eine klassische Zitat-Karte
  (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Der Zitat-Karten-Ordner (`docs/marketing/zitate/1x1/`) enthält keine Themen-Zuordnung
  je Nummer – bitte den tatsächlichen Kartentext vor dem Einstellen gegen das Thema
  „Werbung/künstlicher Mangel" prüfen und ggf. eine passendere Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
