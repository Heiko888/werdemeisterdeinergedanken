# Facebook-Redaktionsplan – Woche 11 · Block C – Mentale Selbstverteidigung · Framing

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema „Framing",
Hook „Ein Wort ändert alles"), Skript `docs/skripte/reels/mentale-selbstverteidigung.md`
(Abschnitt „2 · Framing"), `src/lib/blog.ts`
(`framing-wie-ein-wort-deine-meinung-macht` → real unter
`/blog/framing-wie-ein-wort-deine-meinung-macht`, `src/app/blog/[slug]/page.tsx`),
`src/lib/deep-dives.ts` (`framing`, real unter `/mitglieder/wissen/framing`,
`src/app/mitglieder/wissen/[slug]/page.tsx`), `docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Framing". Hook: „Ein Wort ändert alles." Kontext-Text darunter: Du glaubst, du reagierst auf Fakten – in Wirklichkeit reagierst du oft zuerst auf den Rahmen, in dem sie dir präsentiert werden. „Der Staat investiert zehn Milliarden" und „Der Staat gibt zehn Milliarden aus" beschreiben dieselbe Zahl, wecken aber ein ganz anderes Gefühl – und das, ohne dass eine einzige Information falsch wäre. Wer den Rahmen erkennt, kann die Bewertung darin sehen, bevor er sie unbemerkt übernimmt. | Reel-Serie „selbstverteidigung", Thema „Framing" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „2 · Framing") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/framing` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Investition oder Ausgabe, Reform oder Kürzung – dieselbe Wirklichkeit, zwei völlig unterschiedliche Gefühle. Ein Frame liefert nie nur eine Information, er liefert die Bewertung gleich mit, oft schon in der Fragestellung selbst. Sogar das, was weggelassen wird – fehlende Vorgeschichte, fehlende Gegenargumente, eine Zahl ohne Vergleich – rahmt ein Thema in ein bestimmtes Licht. Kurzer Teaser, dann Link zum vollständigen Artikel inklusive der vier Fragen, mit denen sich ein Frame entlarven lässt. | Blog-Slug `framing-wie-ein-wort-deine-meinung-macht` → `/blog/framing-wie-ein-wort-deine-meinung-macht` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/framing-wie-ein-wort-deine-meinung-macht` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Den Rahmen erkennen, bevor man die Bewertung übernimmt" als Diskussionsanstoß, dazu Kontext: Framing bedeutet nicht, dass alles gelogen ist – es bedeutet, dass jede Botschaft eine Brille mitliefert. Gedankenfreiheit beginnt nicht damit, zu allem eine Gegenmeinung zu haben, sondern damit, den Rahmen zu bemerken, bevor man die darin enthaltene Bewertung übernimmt. Community-Frage: „Bei welchem Wort merkst du bei dir selbst, dass du emotional reagierst, bevor du den Inhalt überhaupt geprüft hast?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-05-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `framing` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Framing" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Framing) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/framing` und `/#ebook` laufen
  als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "framing-wie-ein-wort-deine-meinung-macht"`, vorhanden). Blog-Pfad ist real
  `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `framing` gegen `src/lib/deep-dives.ts` geprüft, Route real vorhanden
  unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Anders als bei Deep-Dives der
  Kategorie „Vertiefungen" (z. B. `reiz-reaktions-luecke`) gibt es hier kein `sources`-
  Feld mit zitierten Studien – deshalb bewusst eine klassische Zitat-Karte
  (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Der Zitat-Karten-Ordner (`docs/marketing/zitate/1x1/`) enthält keine Themen-Zuordnung
  je Nummer (nur `WMDG-Zitat-NN[-hell].png` durchnummeriert, 14 Stück) – die Person, die
  die Karte einstellt, sollte den tatsächlichen Kartentext gegen das Thema „Framing/den
  Rahmen erkennen" prüfen und ggf. eine passendere Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
