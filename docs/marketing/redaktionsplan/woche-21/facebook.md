# Facebook-Redaktionsplan – Woche 21 · Block C – Mentale Selbstverteidigung · Sprache & Etiketten

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema „Sprache &
Etiketten", Hook „Ein Wort beendet jede Debatte"), Skript
`docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „3 · Sprache & Etiketten"),
`src/lib/blog.ts` (`sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` → real unter
`/blog/sprache-und-etiketten-wie-ein-etikett-das-denken-beendet`,
`src/app/blog/[slug]/page.tsx`), `src/lib/deep-dives.ts` (`sprache-und-etiketten`, real
unter `/mitglieder/wissen/sprache-und-etiketten`, `src/app/mitglieder/wissen/[slug]/page.tsx`),
`docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Sprache & Etiketten". Hook: „Ein Wort beendet jede Debatte." Kontext-Text darunter: Nennst du jemanden „Experte", hört man zu. Nennst du dieselbe Person bei genau derselben Aussage „Querulant", hört man weg. Ein Etikett ersetzt das Argument durch ein Gefühl und beendet damit das Prüfen, bevor es überhaupt beginnt – der Test dagegen: das Etikett abziehen, nur die Handlung beschreiben und schauen, ob die Aussage dann noch überzeugt. | Reel-Serie „selbstverteidigung", Thema „Sprache & Etiketten" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „3 · Sprache & Etiketten") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/sprache-und-etiketten` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: „Schwurbler", „Gutmensch", „Nestbeschmutzer" – ein einziges Etikett kann jede Debatte beenden, bevor sie beginnt. Ein Etikett muss nichts beweisen, es muss nur kleben bleiben. Kurzer Teaser, dann Link zum vollständigen Artikel inklusive der vier Fragen, mit denen sich ein Etikett entschärfen lässt. | Blog-Slug `sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` → `/blog/sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Ein Etikett muss nichts beweisen. Es muss nur kleben bleiben" als Diskussionsanstoß, dazu Kontext: Sich von Etiketten zu lösen heißt nicht, jede Aussage gutzuheißen – es heißt, den Menschen wieder vom Wort zu trennen und selbst zu prüfen, ob hier ein Argument widerlegt oder nur ein Mensch abgestempelt wird. Community-Frage: „Welches Reizwort triggert bei dir sofort eine Reaktion, bevor du überhaupt geprüft hast, was eigentlich gesagt wurde?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-01-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `sprache-und-etiketten` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Sprache & Etiketten" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Sprache & Etiketten) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/sprache-und-etiketten` und
  `/#ebook` laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "sprache-und-etiketten-wie-ein-etikett-das-denken-beendet"`, vorhanden).
  Blog-Pfad ist real `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `sprache-und-etiketten` gegen `src/lib/deep-dives.ts` geprüft, Route real
  vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Kein `sources`-Feld mit
  zitierten Studien vorhanden – deshalb bewusst eine klassische Zitat-Karte
  (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Zitat-Karten-Nummer: Der Ordner umfasst nur 14 Motive (`WMDG-Zitat-01` bis `-14`) und
  war bereits bis Woche 20 vollständig durchlaufen (Woche 11 → `-05` … Woche 20 → `-14`);
  ab dieser Woche beginnt die Zählung bewusst wieder bei `-01`. Der Ordner enthält keine
  Themen-Zuordnung je Nummer (nur `WMDG-Zitat-NN[-hell].png` durchnummeriert) – die
  Person, die die Karte einstellt, sollte den tatsächlichen Kartentext gegen das Thema
  „Sprache & Etiketten" prüfen und ggf. eine passendere Nummer wählen, insbesondere weil
  `-01` in dieser zweiten Runde ggf. schon anderweitig verplant sein könnte.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
