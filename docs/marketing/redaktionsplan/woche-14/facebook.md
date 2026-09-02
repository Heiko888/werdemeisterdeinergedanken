# Facebook-Redaktionsplan – Woche 14 · Block C – Mentale Selbstverteidigung · Reizüberflutung

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema
„Reizüberflutung", Hook „Dein Gehirn im Daueralarm"), Skript
`docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „16 · Reizüberflutung &
Alarmbereitschaft"), `src/lib/blog.ts`
(`reizueberflutung-warum-dein-gehirn-nicht-abschaltet` → real unter
`/blog/reizueberflutung-warum-dein-gehirn-nicht-abschaltet`,
`src/app/blog/[slug]/page.tsx`), `src/lib/deep-dives.ts` (`reizueberflutung`, real unter
`/mitglieder/wissen/reizueberflutung`, `src/app/mitglieder/wissen/[slug]/page.tsx`),
`docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Reizüberflutung". Hook: „Dein Gehirn im Daueralarm." Kontext-Text darunter: Geräusche, Nachrichten, Benachrichtigungen, Gespräche und die eigenen Gedanken konkurrieren jeden Tag um Aufmerksamkeit – das Problem ist nicht, dass das Gehirn viele Reize verarbeiten könnte, sondern dass zu viele davon gleichzeitig wichtig erscheinen, ständig wechseln und emotional aufgeladen sind. Dann bleibt das System in Bereitschaft, und unter starkem Stress arbeitet ausgerechnet der Teil des Gehirns schlechter, der für ruhiges Abwägen zuständig ist. | Reel-Serie „selbstverteidigung", Thema „Reizüberflutung" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „16 · Reizüberflutung & Alarmbereitschaft") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/reizueberflutung` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Digitale Reize sind meist unvorhersehbar, und schon die bloße Möglichkeit, dass gleich etwas Wichtiges kommt, lässt einen immer wieder zur selben Quelle zurückkehren, die zugleich belastet – ein widersprüchlicher Kreislauf, bei dem der Reiz stresst und man den nächsten Reiz zur Beruhigung sucht. Ein Mensch im Daueralarm denkt enger, sucht schnelle Antworten und ist dadurch leichter über Angst und einfache Parolen erreichbar. Kurzer Teaser, dann Link zum vollständigen Artikel inklusive der konkreten Schritte, um das System herunterzufahren. | Blog-Slug `reizueberflutung-warum-dein-gehirn-nicht-abschaltet` → `/blog/reizueberflutung-warum-dein-gehirn-nicht-abschaltet` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/reizueberflutung-warum-dein-gehirn-nicht-abschaltet` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Ein Gehirn im Daueralarm trifft andere Entscheidungen als ein reguliertes" als Diskussionsanstoß, dazu Kontext: Ruhe ist keine Zeitverschwendung, sondern der Zustand, in dem der präfrontale Cortex wieder Kontrolle übernimmt und der Raum zwischen Reiz und Reaktion entsteht, in dem man frei wählen kann. Man kann die eigenen Gedanken nicht meistern, solange das System glaubt, auf alles reagieren zu müssen. Community-Frage: „Woran merkst du bei dir selbst, dass dein Denken gerade von ‚abwägen' auf ‚nur noch reagieren' umgeschaltet hat – und was hilft dir dann am meisten?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-08-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `reizueberflutung` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Reizüberflutung & Alarmbereitschaft" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Reizüberflutung) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/reizueberflutung` und `/#ebook`
  laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "reizueberflutung-warum-dein-gehirn-nicht-abschaltet"`, vorhanden). Blog-Pfad
  ist real `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `reizueberflutung` gegen `src/lib/deep-dives.ts` geprüft, Route real
  vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Kein `sources`-Feld mit
  zitierten Studien vorhanden – deshalb bewusst eine klassische Zitat-Karte
  (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Der Zitat-Karten-Ordner (`docs/marketing/zitate/1x1/`) enthält keine Themen-Zuordnung
  je Nummer – bitte den tatsächlichen Kartentext vor dem Einstellen gegen das Thema
  „Reizüberflutung/Daueralarm" prüfen und ggf. eine passendere Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
