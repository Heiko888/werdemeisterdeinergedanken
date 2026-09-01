# Instagram – Wochenplan

**Wochenthema:** Block B · Praxis & Wissenschaft – Der Placebo-Effekt / Erwartung (Woche 10)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/marketing-serien.mjs`, `docs/marketing/content-data.mjs`,
> `docs/marketing/zitate/`, `content/pdf/`). Blog-Route real unter
> **`/blog/…`** (`src/app/blog/[slug]/page.tsx`), Deep-Dive-Route real unter
> **`/mitglieder/wissen/…`** (`src/app/mitglieder/wissen/[slug]/page.tsx`).
> Themenquelle: `docs/marketing/redaktionsplan/themen-backlog.md`, Block B,
> Zeile „Der Placebo-Effekt / Erwartung".

> **Cross-Channel-Abgleich:** `docs/marketing/redaktionsplan/woche-10/youtube.md`
> (bereits vorhanden) setzt für diese Woche explizit das Reel-Thema
> **„Placebo"** (Serie „wissenschaft") als kanalübergreifenden
> Crosspost-Kern ein. Dieser Plan übernimmt dasselbe Reel für Konsistenz
> über alle Kanäle.

## Woche 10 · Der Placebo-Effekt / Erwartung

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Eine Überzeugung verändert echte Körperprozesse." | `src/lib/reels.ts` – Serie „wissenschaft", Topic **Placebo** · Skript: `docs/skripte/reels/wissenschaft.md`, Abschnitt „07 · Placebo — Wenn Erwartung den Körper verändert" (Zeile 66), Quelle Placebo-Forschung, u. a. Benedetti | „Was das für deinen Körper bedeutet, steht im Blog – Link in Bio." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Eine einzelne Studie ist ein Hinweis, kein Beweis – was steckt wirklich hinter dem Placebo-Effekt?" | `docs/carousels/marketing-serien.mjs`, Carousel **„studien-fakten"**, Slide „Ehrlich bleiben – So liest du Studien richtig" als Aufhänger (kein eigener Placebo-Slide vorhanden, siehe Material-Check), vertieft mit Blog `/blog/der-placebo-effekt-wie-erwartung-wirkt` (`src/lib/blog.ts`, Kategorie „Wissenschaft") und Deep-Dive `/mitglieder/wissen/muster-und-koerper` (`src/lib/deep-dives.ts`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern für alle, die Körper und Kopf zusammendenken." |
| Freitag | 19:00 | 📚 Story | Umfrage „Glaubst du, dass deine Erwartung deinen Körper wirklich verändern kann?" + Mini-Übung „Morgen-Ausrichtung" | `src/lib/practices.ts`, Slug **`morgen-ausrichtung`** (Kategorie „Rituale", 5 Minuten) → Route `/mitglieder/praxis/morgen-ausrichtung` | „Probier die 5-Minuten-Ausrichtung morgen früh und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Der Placebo-Effekt ist real: Erwartung setzt körpereigene Endorphine frei." | Studien-Kachel `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-12-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `FACTS`, `key: "12"`, Quelle Placebo-Forschung, u. a. Benedetti) · Bonus-Vertiefung: PDF `content/pdf/vertiefung-muster-und-koerper.pdf` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die Vertiefung „Muster, Körper & Gesundheit" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Startzeit für Reichweite. „Placebo" ist das einzige
  Reel-Thema der Serie „wissenschaft", das exakt zum Wochenthema passt –
  wortgleich der Hook aus `src/lib/reels.ts` – und zugleich das
  kanalübergreifend abgestimmte Reel-Thema laut `woche-10/youtube.md`.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte. Kein Slide der
  Serie „studien-fakten" behandelt Placebo direkt (die fünf Fakten sind:
  Neuroplastizität, Gefühle benennen, Autopilot/Libet, Denkfehler,
  Willenskraft). Als Aufhänger dient stattdessen der „remedy"-Slide „So
  liest du Studien richtig" – inhaltlich naheliegend, weil der
  Placebo-Effekt selbst oft als Beispiel dafür dient, wie vorsichtig man
  einzelne Studien lesen muss. Blog und Deep-Dive liefern die eigentliche
  Placebo-Vertiefung.
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus
  die reale Praxis `morgen-ausrichtung`: Sie lässt Nutzer:innen bewusst eine
  Erwartung/Ausrichtung für den Tag setzen, statt „unbemerkt hineinzustolpern"
  – die praktische Entsprechung des Wochenthemas „Erwartung wirkt".
- **Zitat + Pitch (So, 08:00):** Studienfakt-Kachel **Key 12** (Benedetti,
  Placebo/Endorphine) – der einzige `FACTS`-Eintrag, der wörtlich das
  Wochenthema trifft. Ruhiger Sonntagmorgen-Slot beibehalten, plus Verweis
  auf das reale Vertiefungs-PDF zum Deep-Dive.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Placebo" in `src/lib/reels.ts` (Serie „wissenschaft"), Skript in `docs/skripte/reels/wissenschaft.md`, Zeile 66.
- ✅ Blog-Slug `der-placebo-effekt-wie-erwartung-wirkt` existiert in `src/lib/blog.ts` (Kategorie „Wissenschaft"), reale Route `/blog/der-placebo-effekt-wie-erwartung-wirkt`.
- ✅ Deep-Dive `muster-und-koerper` in `src/lib/deep-dives.ts`, reale Route `/mitglieder/wissen/muster-und-koerper`.
- ✅ Praxis `morgen-ausrichtung` in `src/lib/practices.ts`, Route `/mitglieder/praxis/morgen-ausrichtung`.
- ✅ Studien-Kachel `WMDG-Studienfakt-12-hell.png`, Text `FACTS.key: "12"` aus `docs/marketing/content-data.mjs` – Datei real vorhanden in `docs/marketing/zitate/studien-4x5/`.
- ✅ PDF `content/pdf/vertiefung-muster-und-koerper.pdf` real vorhanden.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
- ⚠️ **Fehlender Baustein gemeldet:** Die Carousel-Serie „studien-fakten"
  (`docs/carousels/marketing-serien.mjs`) enthält keinen Slide zum
  Placebo-Effekt. Genutzt wurde ersatzweise der allgemeine „So liest du
  Studien richtig"-Slide. Empfehlung an den Themen-Strategen: einen
  sechsten Fakt-Slide „Placebo" (Benedetti/Endorphine, passend zu
  `FACTS.key: "12"`) ergänzen.
