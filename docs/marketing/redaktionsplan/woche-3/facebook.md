# Facebook-Redaktionsplan – Woche 3 · Stufe 3 · Selbstbeobachtung

**Block A – Die 7 Stufen** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „stufen", Thema „Selbstbeobachtung",
Skript `docs/skripte/reels/stufen.md`, Abschnitt „03 · Selbstbeobachtung"),
`src/lib/blog.ts` (`denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` → real unter
`/blog/denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt`, `src/app/blog/[slug]/page.tsx`),
`src/lib/deep-dives.ts` (`kognitive-verzerrungen`), `src/lib/practices.ts`
(`innerer-beobachter`), `content/pdf/stufe-3-lektion.pdf`,
`docs/marketing/zitate/studien-1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

⚠ Hinweis aus dem Themen-Backlog: Für Stufe 3 ist der Blog-Slug thematisch
„naheliegend" (Denkfehler/kognitive Verzerrungen statt wörtlich „Selbstbeobachtung"),
aber real vorhanden und inhaltlich passend – geprüft in `src/lib/blog.ts`.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zu Stufe 3, Variante A („Du springst in jeden Gedanken"). Hook: „Ich bin früher in jeden einzelnen Gedanken reingesprungen." Kontext-Text darunter: Stell dir einen Fluss vor, an dessen Ufer du sitzt – deine Gedanken sind das Wasser. Kaum kam eine Sorge vorbei, war der Autor schon mitgeschwommen, und zwei Stunden später fragte er sich, wie er dahin gekommen war. Der innere Beobachter bleibt einfach sitzen und lässt alles vorbeiziehen – das ist keine Kälte, sondern Überblick. Und aus Überblick kann man zum ersten Mal wählen. | Reel-Serie „stufen", Thema „Selbstbeobachtung", Variante A – `src/lib/reels.ts`; Skript `docs/skripte/reels/stufen.md` (Abschnitt „03 · Selbstbeobachtung — Variante A") | Mehr zu Stufe 3 in der Lektion: `/mitglieder/stufe/3` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Wir halten unser Denken für einen neutralen Beobachter der Wirklichkeit – die Forschung sagt, es ist eher ein Erzähler mit festen Vorlieben. Kognitive Verzerrungen wie Schwarz-Weiß-Denken, Katastrophisieren oder der Bestätigungsfehler fühlen sich völlig logisch an und verfärben trotzdem die Realität. Die gute Nachricht: Es sind nur eine Handvoll Muster – wer sie kennt, erkennt sie wieder. Kurzer Teaser der bekanntesten Denkfehler, dann Link zum vollständigen Artikel. | Blog-Slug `denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` → `/blog/denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Studien-Karte zum Thema „Denkfehler sind vorhersehbar" als Diskussionsanstoß, dazu Kontext: 1974 zeigten Tversky und Kahneman im Fachblatt „Science", dass Menschen systematisch – also vorhersehbar – danebenliegen: Verfügbarkeitsheuristik, Verankerung, Bestätigungsfehler. Ein Denkfehler, den man erkennt, verliert seine Macht; einer, den man für die Wahrheit hält, regiert einen weiter. Community-Frage: „Welcher Denkfehler ist dein persönlicher Klassiker – Schwarz-Weiß-Denken, Katastrophisieren oder etwas ganz anderes?" | Studien-Karte `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-02-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `kognitive-verzerrungen` (`src/lib/deep-dives.ts`, Quellen Tversky & Kahneman 1974, Beck 1960er) und Praxis `innerer-beobachter` (`src/lib/practices.ts`) | Kommentiere deine Antwort · Mini-Übung zum Ausprobieren: Praxis „Der innere Beobachter" (in der Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Stufe 3 ·
  Selbstbeobachtung, Variante A) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); die Lektion `/mitglieder/stufe/3` und `/#ebook`
  laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt"`, vorhanden). Blog-Pfad
  ist real `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`), nicht `/wissen/blog/…`.
- Statt einer klassischen Zitat-Karte wurde hier eine Studien-Karte
  (`docs/marketing/zitate/studien-1x1/`) gewählt, da der Deep-Dive konkrete Studien
  (Tversky & Kahneman, Beck) referenziert – passt besser zum Wissenschafts-Ton des
  Artikels. Der Ordner enthält ebenfalls keine Themen-Zuordnung je Nummer – bitte den
  tatsächlichen Kartentext vor dem Einstellen gegen das Thema „Denkfehler/kognitive
  Verzerrungen" prüfen.
