# Facebook-Redaktionsplan – Woche 22 · Block C – Mentale Selbstverteidigung · Medien-Agenda

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema
„Medien-Agenda", Hook „Nicht WAS – sondern WORÜBER"), Skript
`docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „4 · Medien & Aufmerksamkeit"),
`src/lib/blog.ts` (`medien-agenda-nicht-was-sondern-worueber` → real unter
`/blog/medien-agenda-nicht-was-sondern-worueber`, `src/app/blog/[slug]/page.tsx`),
`src/lib/deep-dives.ts` (`medien-agenda`, real unter `/mitglieder/wissen/medien-agenda`,
`src/app/mitglieder/wissen/[slug]/page.tsx`), `docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Medien-Agenda". Hook: „Nicht WAS – sondern WORÜBER." Kontext-Text darunter: Medien müssen dir nicht sagen, was du denken sollst – es reicht, festzulegen, worüber du überhaupt nachdenkst. Was ständig vorkommt, wirkt automatisch wichtig, was fehlt, existiert für die Debatte kaum. Die Auswahl selbst ist schon die Botschaft. | Reel-Serie „selbstverteidigung", Thema „Medien-Agenda" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „4 · Medien & Aufmerksamkeit") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/medien-agenda` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Wir glauben, wir bilden uns frei eine Meinung. Doch die wichtigste Weiche wird gestellt, lange bevor wir zu urteilen beginnen: bei der Frage, worüber wir überhaupt nachdenken. Wer die Themen setzt, muss uns keine Meinung mehr vorschreiben. Kurzer Teaser, dann Link zum vollständigen Artikel mit vier Fragen, um die Agenda hinter den Schlagzeilen zu durchschauen. | Blog-Slug `medien-agenda-nicht-was-sondern-worueber` → `/blog/medien-agenda-nicht-was-sondern-worueber` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/medien-agenda-nicht-was-sondern-worueber` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Nicht die Antwort formt deine Meinung, sondern die Frage, die man dir überhaupt stellt" als Diskussionsanstoß, dazu Kontext: Die Agenda zu durchschauen macht dich nicht zum Zyniker, sondern zum aufmerksameren Zeitgenossen – du entscheidest wieder mit, was deine Aufmerksamkeit überhaupt verdient. Community-Frage: „Welches wichtige Thema fällt dir ein, über das gerade auffällig wenig gesprochen wird – und warum, glaubst du, ist das so?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-02-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `medien-agenda` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Medien-Agenda" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Medien-Agenda) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/medien-agenda` und `/#ebook`
  laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "medien-agenda-nicht-was-sondern-worueber"`, vorhanden). Blog-Pfad ist real
  `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `medien-agenda` gegen `src/lib/deep-dives.ts` geprüft, Route real
  vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx` (Deep-Dive-Titel dort:
  „Medien & Aufmerksamkeit"). Kein `sources`-Feld mit zitierten Studien vorhanden –
  deshalb bewusst eine klassische Zitat-Karte (`docs/marketing/zitate/1x1/`) statt einer
  Studien-Karte gewählt.
- Zitat-Karten-Nummer: zweite Runde durch den 14er-Ordner (Woche 21 → `-01`), diese
  Woche `-02`. Der Ordner enthält keine Themen-Zuordnung je Nummer (nur
  `WMDG-Zitat-NN[-hell].png` durchnummeriert) – die Person, die die Karte einstellt,
  sollte den tatsächlichen Kartentext gegen das Thema „Medien-Agenda / Auswahl als
  Botschaft" prüfen und ggf. eine passendere Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
