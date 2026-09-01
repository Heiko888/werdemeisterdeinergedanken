# Facebook-Redaktionsplan – Woche 19 · Block C – Mentale Selbstverteidigung · Kognitive Dissonanz

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema „Kognitive
Dissonanz", Hook „Warum du wegschaust"), Skript `docs/skripte/reels/mentale-selbstverteidigung.md`
(Abschnitt „12 · Kognitive Dissonanz"), `src/lib/blog.ts`
(`warum-du-verteidigst-was-dir-schadet` → real unter
`/blog/warum-du-verteidigst-was-dir-schadet`, `src/app/blog/[slug]/page.tsx`),
`src/lib/deep-dives.ts` (`kognitive-dissonanz`, real unter
`/mitglieder/wissen/kognitive-dissonanz`, `src/app/mitglieder/wissen/[slug]/page.tsx`),
`docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Kognitive Dissonanz". Hook: „Warum du wegschaust." Kontext-Text darunter: Wenn eine neue Information nicht zu dem passt, was wir glauben, entsteht ein unangenehmes Spannungsgefühl – kognitive Dissonanz. Weil wir dieses Unbehagen scheuen, gewinnt meist nicht die neue Information, sondern das bestehende Weltbild: Wir werten lieber die Quelle ab, als den Inhalt zu prüfen. Unbehagen ist dabei ein Hinweis, genauer hinzuschauen – nicht wegzuschauen. | Reel-Serie „selbstverteidigung", Thema „Kognitive Dissonanz" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „12 · Kognitive Dissonanz") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/kognitive-dissonanz` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Wir lehnen Informationen oft nicht ab, weil sie falsch sind, sondern weil sie unser Weltbild bedrohen. Je mehr wir in eine Überzeugung investiert haben, desto heftiger verteidigen wir sie – gerade dann, wenn sie zu wackeln beginnt. Kurzer Teaser, dann Link zum vollständigen Artikel darüber, wie selektive Wahrnehmung funktioniert und warum eine Meinung ändern zu können Reife ist, keine Schwäche. | Blog-Slug `warum-du-verteidigst-was-dir-schadet` → `/blog/warum-du-verteidigst-was-dir-schadet` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/warum-du-verteidigst-was-dir-schadet` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Unbehagen ist ein Hinweis, genauer hinzuschauen – nicht wegzuschauen" als Diskussionsanstoß, dazu Kontext: Kognitive Dissonanz bedeutet nicht, dass du falsch liegst, sobald etwas unangenehm ist – aber ein Reflex, die Quelle statt den Inhalt abzuwerten, verdient einen zweiten Blick. Gedankenfreiheit beginnt damit, das Unbehagen auszuhalten, statt es sofort wegzuerklären. Community-Frage: „Wann hast du zuletzt zugegeben, dich geirrt zu haben – und wie hat sich das angefühlt?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-13-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `kognitive-dissonanz` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Kognitive Dissonanz" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Kognitive Dissonanz) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/kognitive-dissonanz` und
  `/#ebook` laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "warum-du-verteidigst-was-dir-schadet"`, vorhanden). Blog-Pfad ist real
  `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `kognitive-dissonanz` gegen `src/lib/deep-dives.ts` geprüft, Route real
  vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Wie schon bei „Framing"
  (Woche 11) gibt es kein `sources`-Feld mit zitierten Studien – deshalb bewusst eine
  klassische Zitat-Karte (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Zitat-Karten-Nummer im Sinne der laufenden Wochenzählung (Woche 11 → `-05`, Woche 12
  → `-06`, … Woche 18 → `-12`) fortgesetzt auf `-13`. Der Ordner enthält keine
  Themen-Zuordnung je Nummer (nur `WMDG-Zitat-NN[-hell].png` durchnummeriert, 14 Stück) –
  die Person, die die Karte einstellt, sollte den tatsächlichen Kartentext gegen das
  Thema „Kognitive Dissonanz / Unbehagen aushalten" prüfen und ggf. eine passendere
  Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
