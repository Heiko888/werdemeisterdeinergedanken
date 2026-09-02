# Facebook-Redaktionsplan – Woche 20 · Block C – Mentale Selbstverteidigung · Identität & Meinung

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema „Identität &
Meinung", Hook „Hast du eine Meinung – oder sie dich?"), Skript
`docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „15 · Identität & Meinung"),
`src/lib/blog.ts` (`hast-du-eine-meinung-oder-hat-sie-dich` → real unter
`/blog/hast-du-eine-meinung-oder-hat-sie-dich`, `src/app/blog/[slug]/page.tsx`),
`src/lib/deep-dives.ts` (`identitaet-und-meinung`, real unter
`/mitglieder/wissen/identitaet-und-meinung`, `src/app/mitglieder/wissen/[slug]/page.tsx`),
`docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Identität & Meinung". Hook: „Hast du eine Meinung – oder sie dich?" Kontext-Text darunter: Eine Meinung ist eigentlich ein Werkzeug: annehmen, prüfen, bei Bedarf ablegen. Doch manche Meinungen verwachsen mit unserer Identität – mit einer Gruppe, einem Lager, einem Lebensstil, dem wir uns zugehörig fühlen. Dann fühlt sich jede Kritik an der Meinung an wie ein Angriff auf uns selbst, und der Verstand sucht Gegenargumente statt Wahrheit. | Reel-Serie „selbstverteidigung", Thema „Identität & Meinung" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „15 · Identität & Meinung") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/identitaet-und-meinung` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Sobald eine Meinung Teil deiner Identität wird, fühlt sich Kritik daran wie ein persönlicher Angriff an – der Körper geht in Verteidigung, der Verstand sucht Gegenargumente statt Wahrheit. Kurzer Teaser, dann Link zum vollständigen Artikel darüber, warum eine Überzeugung ändern zu können Reife ist und wie sich Abstand zwischen dich und deine Meinungen legen lässt. | Blog-Slug `hast-du-eine-meinung-oder-hat-sie-dich` → `/blog/hast-du-eine-meinung-oder-hat-sie-dich` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/hast-du-eine-meinung-oder-hat-sie-dich` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Solange du eine Meinung hast, kannst du sie prüfen. Sobald die Meinung dich hat, verteidigst du sie wie dein Leben" als Diskussionsanstoß, dazu Kontext: Freiheit heißt nicht, keine Meinung zu haben, sondern einen Abstand zwischen sich und seine Meinungen legen zu können – so wie zwischen sich und seine Gedanken. Du bleibst du, auch wenn eine Meinung geht. Community-Frage: „Bei welchem Thema fühlt sich Widerspruch für dich ganz persönlich an – und was sagt das darüber, wie sehr die Meinung mit deiner Identität verwachsen ist?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-14-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `identitaet-und-meinung` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Identität & Meinung" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Identität & Meinung) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/identitaet-und-meinung` und
  `/#ebook` laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "hast-du-eine-meinung-oder-hat-sie-dich"`, vorhanden). Blog-Pfad ist real
  `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `identitaet-und-meinung` gegen `src/lib/deep-dives.ts` geprüft, Route
  real vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Kein `sources`-Feld
  mit zitierten Studien vorhanden – deshalb bewusst eine klassische Zitat-Karte
  (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Zitat-Karten-Nummer im Sinne der laufenden Wochenzählung (Woche 11 → `-05`, … Woche 19
  → `-13`) fortgesetzt auf `-14`, dem letzten Kartenmotiv im Ordner. Der Ordner enthält
  keine Themen-Zuordnung je Nummer (nur `WMDG-Zitat-NN[-hell].png` durchnummeriert, 14
  Stück) – die Person, die die Karte einstellt, sollte den tatsächlichen Kartentext gegen
  das Thema „Identität & Meinung / Abstand zur eigenen Überzeugung" prüfen und ggf. eine
  passendere Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
