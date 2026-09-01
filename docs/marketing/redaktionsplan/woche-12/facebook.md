# Facebook-Redaktionsplan – Woche 12 · Block C – Mentale Selbstverteidigung · Filterblase/Algorithmen

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema
„Algorithmen", Hook „Dein Feed ≠ die Welt"), Skript
`docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „5 · Algorithmen &
Filterblasen"), `src/lib/blog.ts` (`filterblase-warum-dein-feed-nicht-die-welt-ist` →
real unter `/blog/filterblase-warum-dein-feed-nicht-die-welt-ist`,
`src/app/blog/[slug]/page.tsx`), `src/lib/deep-dives.ts` (`algorithmen`, real unter
`/mitglieder/wissen/algorithmen`, `src/app/mitglieder/wissen/[slug]/page.tsx`),
`docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Algorithmen". Hook: „Dein Feed ≠ die Welt." Kontext-Text darunter: Was du in deinen Feeds siehst, ist kein Abbild der Wirklichkeit, sondern eine Auswahl, berechnet aus dem, worauf du bisher reagiert hast. Jeder Klick ist ein Signal „Davon will ich mehr" – der Algorithmus liefert prompt, und so wird die eigene Meinung immer öfter bestätigt statt herausgefordert. Das Ziel dahinter ist nicht Wahrheit, sondern Aufmerksamkeit, denn genau die ist das Geschäftsmodell. | Reel-Serie „selbstverteidigung", Thema „Algorithmen" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „5 · Algorithmen & Filterblasen") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/algorithmen` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Online siehst du keine Wirklichkeit, sondern eine Auswahl, die auf deinem bisherigen Verhalten beruht. Weil Inhalte, die starke Gefühle wie Empörung oder Angst auslösen, häufiger geteilt werden, spült der Algorithmus genau sie nach oben – nicht weil sie wahrer wären, sondern weil sie besser „performen". Wenn jeder eine andere, zugeschnittene Auswahl sieht, zerfällt die gemeinsame Grundlage, über die man überhaupt streiten könnte. Kurzer Teaser, dann Link zum vollständigen Artikel inklusive der konkreten Schritte, um die eigene Blase zu durchlöchern. | Blog-Slug `filterblase-warum-dein-feed-nicht-die-welt-ist` → `/blog/filterblase-warum-dein-feed-nicht-die-welt-ist` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/filterblase-warum-dein-feed-nicht-die-welt-ist` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Dein Feed ist ein Spiegel deines Verhaltens, kein Fenster zur Welt" als Diskussionsanstoß, dazu Kontext: Die Filterblase ist kein Grund für Technikangst, sondern für bewussten Umgang – der eigene Feed lässt sich als das behandeln, was er ist: eine Auswahl, kein Weltbild. Schon das bewusste Folgen ein, zwei seriöser Gegenstimmen kann die Blase spürbar durchlöchern. Community-Frage: „Wann hast du zuletzt online etwas gesehen, das deiner Meinung ernsthaft widersprochen hat – und wie bist du damit umgegangen?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-06-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `algorithmen` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Algorithmen & Filterblasen" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Algorithmen) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/algorithmen` und `/#ebook`
  laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "filterblase-warum-dein-feed-nicht-die-welt-ist"`, vorhanden). Blog-Pfad ist
  real `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `algorithmen` gegen `src/lib/deep-dives.ts` geprüft, Route real
  vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Kein `sources`-Feld mit
  zitierten Studien vorhanden – deshalb bewusst eine klassische Zitat-Karte
  (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Der Zitat-Karten-Ordner (`docs/marketing/zitate/1x1/`) enthält keine Themen-Zuordnung
  je Nummer – bitte den tatsächlichen Kartentext vor dem Einstellen gegen das Thema
  „Filterblase/Algorithmus" prüfen und ggf. eine passendere Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
