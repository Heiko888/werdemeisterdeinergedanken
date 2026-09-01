# Facebook-Redaktionsplan – Woche 24 · Block C – Mentale Selbstverteidigung · Ablenkung

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema „Ablenkung",
Hook „Keine Lüge. Nur Lärm."), Skript `docs/skripte/reels/mentale-selbstverteidigung.md`
(Abschnitt „11 · Ablenkung & Überflutung"), `src/lib/blog.ts`
(`ablenkung-keine-luege-nur-laerm` → real unter `/blog/ablenkung-keine-luege-nur-laerm`,
`src/app/blog/[slug]/page.tsx`), `src/lib/deep-dives.ts` (`ablenkung`, real unter
`/mitglieder/wissen/ablenkung`, `src/app/mitglieder/wissen/[slug]/page.tsx`),
`docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Ablenkung". Hook: „Keine Lüge. Nur Lärm." Kontext-Text darunter: Man muss dir eine unbequeme Wahrheit nicht verbergen, es reicht, dich abzulenken. Ein ständig wechselndes Karussell aus Aufregern hält beschäftigt und erschöpft – und ein erschöpfter Mensch prüft nicht mehr, er reagiert nur noch. Die Frage bei jedem Aufreger: Betrifft mich das wirklich, und kann ich etwas daran ändern? | Reel-Serie „selbstverteidigung", Thema „Ablenkung" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „11 · Ablenkung & Überflutung") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/ablenkung` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Man muss die Wahrheit nicht verbieten, wenn man sie im Lärm verschwinden lässt. Das Laute ist selten das Wichtige – Empörung verbreitet sich schneller als Abwägung, der Skandal schneller als die stille Entwicklung, die dein Leben wirklich prägt. Kurzer Teaser, dann Link zum vollständigen Artikel mit vier Fragen, wie du deinen Fokus im Dauerlärm schützt. | Blog-Slug `ablenkung-keine-luege-nur-laerm` → `/blog/ablenkung-keine-luege-nur-laerm` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/ablenkung-keine-luege-nur-laerm` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Du musst niemandem den Mund verbieten, wenn alle gleichzeitig reden" als Diskussionsanstoß, dazu Kontext: Fokus ist im Dauerlärm keine Selbstverständlichkeit, sondern eine Entscheidung, die täglich neu getroffen wird – zum Beispiel durch bewusste Ruhezonen ohne Feed und ohne Aufreger. Community-Frage: „Woran hat sich deine Aufmerksamkeit heute zuletzt festgebissen – und war es im Nachhinein wirklich wichtig oder nur laut?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-04-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `ablenkung` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Ablenkung" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Ablenkung) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/ablenkung` und `/#ebook` laufen
  als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "ablenkung-keine-luege-nur-laerm"`, vorhanden). Blog-Pfad ist real
  `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `ablenkung` gegen `src/lib/deep-dives.ts` geprüft, Route real vorhanden
  unter `src/app/mitglieder/wissen/[slug]/page.tsx` (Deep-Dive-Titel dort: „Ablenkung &
  Überflutung"). Kein `sources`-Feld mit zitierten Studien vorhanden – deshalb bewusst
  eine klassische Zitat-Karte (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte
  gewählt.
- Zitat-Karten-Nummer: zweite Runde durch den 14er-Ordner (Woche 21 → `-01`, … Woche 23 →
  `-03`), diese Woche `-04`. Der Ordner enthält keine Themen-Zuordnung je Nummer (nur
  `WMDG-Zitat-NN[-hell].png` durchnummeriert) – die Person, die die Karte einstellt,
  sollte den tatsächlichen Kartentext gegen das Thema „Ablenkung / Fokus im Lärm" prüfen
  und ggf. eine passendere Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
