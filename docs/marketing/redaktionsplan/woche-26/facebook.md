# Facebook-Redaktionsplan – Woche 26 · Block C – Mentale Selbstverteidigung · Bildmacht

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema „Bildmacht",
Hook „Ein Bild ist kein Beweis"), Skript `docs/skripte/reels/mentale-selbstverteidigung.md`
(Abschnitt „14 · Bilder statt Argumente"), `src/lib/blog.ts`
(`bildmacht-ein-bild-ist-kein-beweis` → real unter `/blog/bildmacht-ein-bild-ist-kein-beweis`,
`src/app/blog/[slug]/page.tsx`), `src/lib/deep-dives.ts` (`bildmacht`, real unter
`/mitglieder/wissen/bildmacht`, `src/app/mitglieder/wissen/[slug]/page.tsx`),
`docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Bildmacht". Hook: „Ein Bild ist kein Beweis." Kontext-Text darunter: Ein starkes Bild wirkt in Sekundenbruchteilen und weckt Gefühle, bevor der Verstand überhaupt eine Frage stellen kann. Genau das macht Bilder so überzeugend – und so leicht zu missbrauchen, denn ein Bild zeigt immer nur einen Ausschnitt und behauptet doch, die ganze Wirklichkeit zu sein. | Reel-Serie „selbstverteidigung", Thema „Bildmacht" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „14 · Bilder statt Argumente") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/bildmacht` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Ein Bild überzeugt schneller als jedes Argument – und genau darin liegt die Gefahr. Ein Bild beweist, dass etwas fotografiert wurde, nicht, was es bedeutet: Was im Ausschnitt fehlt, was davor oder danach geschah, entscheidet oft mehr als das Bild selbst. Kurzer Teaser, dann Link zum vollständigen Artikel mit vier Fragen, wie du Bilder kritisch liest. | Blog-Slug `bildmacht-ein-bild-ist-kein-beweis` → `/blog/bildmacht-ein-bild-ist-kein-beweis` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/bildmacht-ein-bild-ist-kein-beweis` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Ein Bild beweist, dass etwas fotografiert wurde – nicht, was es bedeutet" als Diskussionsanstoß, dazu Kontext: Bilder lesen zu lernen heißt nicht, nichts mehr zu glauben, sondern die Frage wieder zuzulassen, bevor das Gefühl entscheidet – etwa welchen Ausschnitt man gerade sieht und was außerhalb davon liegt. Community-Frage: „Wann hat dich zuletzt ein einzelnes Bild komplett überzeugt – und hast du danach geprüft, was außerhalb des Bildausschnitts lag?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-06-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `bildmacht` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Bildmacht" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Bildmacht) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/bildmacht` und `/#ebook` laufen
  als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "bildmacht-ein-bild-ist-kein-beweis"`, vorhanden). Blog-Pfad ist real
  `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `bildmacht` gegen `src/lib/deep-dives.ts` geprüft, Route real vorhanden
  unter `src/app/mitglieder/wissen/[slug]/page.tsx` (Deep-Dive-Titel dort: „Bilder statt
  Argumente"). Kein `sources`-Feld mit zitierten Studien vorhanden – deshalb bewusst eine
  klassische Zitat-Karte (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte
  gewählt.
- Zitat-Karten-Nummer: zweite Runde durch den 14er-Ordner (Woche 21 → `-01`, … Woche 25 →
  `-05`), diese Woche `-06`. Der Ordner enthält keine Themen-Zuordnung je Nummer (nur
  `WMDG-Zitat-NN[-hell].png` durchnummeriert) – die Person, die die Karte einstellt,
  sollte den tatsächlichen Kartentext gegen das Thema „Bildmacht / Ausschnitt statt
  Wirklichkeit" prüfen und ggf. eine passendere Nummer wählen; da `-06` bereits in
  Woche 12 (Thema „Algorithmen") verwendet wurde, ist ein doppelter Einsatz desselben
  Kartenmotivs innerhalb der 26 Wochen möglich und sollte gegen den tatsächlichen
  Veröffentlichungskalender geprüft werden.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
