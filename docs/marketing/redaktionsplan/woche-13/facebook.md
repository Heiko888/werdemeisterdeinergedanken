# Facebook-Redaktionsplan – Woche 13 · Block C – Mentale Selbstverteidigung · Wiederholung = Wahrheit

**Block C – Mentale Selbstverteidigung** · Frequenz-Stufe: **fokussiert (3 Posts/Woche)**

Quellen (verifiziert): `src/lib/reels.ts` (Serie „selbstverteidigung", Thema
„Wiederholung", Hook „Oft gehört = wahr?"), Skript
`docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „10 · Wiederholung wird
zur Wahrheit"), `src/lib/blog.ts` (`warum-oft-gehoert-sich-wie-wahr-anfuehlt` → real
unter `/blog/warum-oft-gehoert-sich-wie-wahr-anfuehlt`,
`src/app/blog/[slug]/page.tsx`), `src/lib/deep-dives.ts` (`wiederholung-wahrheit`,
real unter `/mitglieder/wissen/wiederholung-wahrheit`,
`src/app/mitglieder/wissen/[slug]/page.tsx`), `docs/marketing/zitate/1x1/`.

Bild-Assets: **Creme-Variante (`-hell.png`) ist Standard**, wo eine Zitat-/Studienkarte
genutzt wird.

| Tag | Uhrzeit | Format | Inhalt/Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel (Crosspost) | Crosspost des IG-Reels zur Serie „Mentale Selbstverteidigung", Thema „Wiederholung". Hook: „Oft gehört = wahr?" Kontext-Text darunter: Es gibt einen gut belegten Effekt – je öfter wir eine Aussage hören, desto wahrer erscheint sie uns, unabhängig davon, ob sie stimmt. Beim ersten Hören sind wir skeptisch, beim zehnten Mal fühlt sich dieselbe Aussage vertraut an, und diese Vertrautheit verwechselt das Gehirn mit Wahrheit. Deshalb wirken eingängige Slogans oft stärker als komplizierte, aber korrekte Erklärungen. | Reel-Serie „selbstverteidigung", Thema „Wiederholung" – `src/lib/reels.ts`; Skript `docs/skripte/reels/mentale-selbstverteidigung.md` (Abschnitt „10 · Wiederholung wird zur Wahrheit") | Mehr zum Thema in der Vertiefung: `/mitglieder/wissen/wiederholung-wahrheit` |
| Mittwoch | 08:00 | 📝 Beitrag | Blog-Anriss: Je öfter man eine Aussage hört, desto wahrer erscheint sie – ganz ohne neuen Beweis, nur durch Wiederholung. Wenn viele dasselbe sagen, halten wir es zudem für wahr, auch wenn alle es nur voneinander abgeschrieben haben; entscheidend ist nicht, wie viele etwas sagen, sondern auf wie viele unabhängige Quellen es wirklich zurückgeht. Kurzer Teaser, dann Link zum vollständigen Artikel inklusive des einfachen Schutzes gegen den Wiederholungseffekt. | Blog-Slug `warum-oft-gehoert-sich-wie-wahr-anfuehlt` → `/blog/warum-oft-gehoert-sich-wie-wahr-anfuehlt` (`src/lib/blog.ts`) | Ganzen Artikel lesen: `/blog/warum-oft-gehoert-sich-wie-wahr-anfuehlt` |
| Freitag | 18:00 | 💬 Zitat/Studie + Community-Frage | Zitat-Karte zum Thema „Vertrautheit ist kein Beweis" als Diskussionsanstoß, dazu Kontext: Wiederholung ist einer der ältesten Tricks der Beeinflussung – und einer der wirksamsten, gerade weil er ganz ohne Lüge auskommt. Was oft wiederholt wird, verdient dieselbe Prüfung wie beim allerersten Mal: Kenne ich einen echten Beleg, oder habe ich das nur oft gehört? Community-Frage: „Welche Aussage glaubst du vor allem deshalb, weil du sie schon so oft gehört hast – hast du sie je wirklich geprüft?" | Zitat-Karte `docs/marketing/zitate/1x1/WMDG-Zitat-07-hell.png` (Creme-Variante); inhaltlicher Bezug: Deep-Dive `wiederholung-wahrheit` (`src/lib/deep-dives.ts`) | Kommentiere deine Antwort · Mehr zum Thema in der Vertiefung „Wiederholung wird zur Wahrheit" (Mitgliedschaft), Einstieg über `/#ebook` |

## Hinweise
- Frequenz exakt eingehalten: 3 Posts (Reel-Crosspost, Blog-Beitrag, Zitat + Community-Frage).
- Reel-Crosspost greift dasselbe Kernthema wie der IG-Reel-Tag der Woche (Serie
  „Mentale Selbstverteidigung" · Wiederholung) auf – kein separates Thema.
- Rhythmus wie vorgegeben: Reel früh in der Woche (Montag, früher Abend), Blog-Link
  Mitte der Woche (Mittwoch, 08:00 vormittags), Community-Frage + Zitat zum
  Wochenausklang (Freitag, früher Abend).
- Diskussion sichergestellt: der Freitagspost endet mit einer offenen Frage an die
  Community statt einer reinen CTA.
- Keine dedizierte 🎯 Pitch-Position, da diese Woche kein Pitch-/Funnel-Slot vorgesehen
  ist (fokussierte Stufe = 3 Posts); `/mitglieder/wissen/wiederholung-wahrheit` und
  `/#ebook` laufen als weiche CTA im Reel- bzw. Community-Post mit.
- Blog-Slug gegen `src/lib/blog.ts` geprüft (Zeile mit
  `slug: "warum-oft-gehoert-sich-wie-wahr-anfuehlt"`, vorhanden). Blog-Pfad ist real
  `/blog/<slug>` (`src/app/blog/[slug]/page.tsx`).
- Deep-Dive-Slug `wiederholung-wahrheit` gegen `src/lib/deep-dives.ts` geprüft, Route
  real vorhanden unter `src/app/mitglieder/wissen/[slug]/page.tsx`. Kein `sources`-Feld
  mit zitierten Studien vorhanden – deshalb bewusst eine klassische Zitat-Karte
  (`docs/marketing/zitate/1x1/`) statt einer Studien-Karte gewählt.
- Der Zitat-Karten-Ordner (`docs/marketing/zitate/1x1/`) enthält keine Themen-Zuordnung
  je Nummer – bitte den tatsächlichen Kartentext vor dem Einstellen gegen das Thema
  „Wiederholung/Vertrautheit" prüfen und ggf. eine passendere Nummer wählen.
- `src/lib/practices.ts` wurde für diese Woche bewusst nicht referenziert – der
  Koordinator hat für Block C nur Reel-Serie, Blog und Deep-Dives als Quellen
  vorgegeben.
