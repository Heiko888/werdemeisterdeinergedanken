# Instagram – Wochenplan

**Wochenthema:** Stufe 6 · Innere Ausrichtung (Woche 6, Block A – Die 7 Stufen)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/stufen-ueberblick.mjs`, `docs/marketing/content-data.mjs`,
> `docs/marketing/zitate/`, `content/pdf/`). Blog-Route real unter
> **`/blog/…`** (`src/app/blog/[slug]/page.tsx`), nicht `/wissen/blog/…`.
>
> **Backlog-Hinweis geprüft:** Der Themen-Backlog markiert den Blog-Slug für
> Stufe 6 als nur „naheliegend". Verifiziert: `warum-willenskraft-ueberschaetzt-wird`
> existiert real in `src/lib/blog.ts` und der zugehörige Deep-Dive
> `werte-und-ziele` trägt `relatedStage: 6` – die Zuordnung ist also exakt.

## Woche 6 · Stufe 6 – Innere Ausrichtung

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Dein Kopf ist ein brillanter Diener. Aber ein ziemlich schlechter Chef." | `src/lib/reels.ts` – Serie „stufen", Topic **Innere Ausrichtung**, Variante B · Skript: `docs/skripte/reels/stufen.md`, Abschnitt „06 · Innere Ausrichtung — Variante B" | „Folge für die nächste Stufe – wir gehen den Weg Schritt für Schritt." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Innere Ausrichtung – Kopf, Herz und Handeln: warum Willenskraft allein nicht reicht" | `docs/carousels/stufen-ueberblick.mjs`, Slide „06 · Innere Ausrichtung – Kopf, Herz und Handeln" als Aufhänger, vertieft mit Blog `/blog/warum-willenskraft-ueberschaetzt-wird` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/werte-und-ziele` (`src/lib/deep-dives.ts`, `relatedStage: 6`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, falls du dich gerade zusammenreißen musst." |
| Freitag | 19:00 | 📚 Story | Umfrage „Ziehen bei dir gerade Kopf und Herz an einem Strang – oder eher gegeneinander?" + Mini-Übung „Herz-Kohärenz" | `src/lib/practices.ts`, Slug **`herz-kohaerenz`** (Kategorie „Meditationen", 5–10 Minuten, `relatedStage: 6`) → Route `/mitglieder/praxis/herz-kohaerenz` | „Probier die 5-Minuten-Übung jetzt und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Willenskraft als „Muskel", der ermüdet? Eine große Replikation fand den Effekt nicht." | Studien-Kachel `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-05-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `FACTS`, `key: "05"`, Quelle Baumeister 1998 / Replikation Hagger 2016, umstritten) · Lektion `/mitglieder/stufe/6` + PDF `content/pdf/stufe-6-lektion.pdf` (+ `stufe-6-uebungen.pdf`) | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → volle Stufe 6 in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Startzeit für Reichweite. Variante B wortgleich zum
  Backlog-Hook „Der Kopf ist ein guter Diener, schlechter Chef" gewählt.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte. Kombiniert das
  Stufen-Carousel-Slide „06 · Innere Ausrichtung" mit dem Willenskraft-
  Blogartikel – beide erklären, warum reine Selbstdisziplin nicht ausreicht.
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus
  die reale Praxis `herz-kohaerenz`, die exakt zu Stufe 6 gehört
  (`relatedStage: 6`).
- **Zitat + Pitch (So, 08:00):** Studienfakt-Kachel zur Willenskraft-Debatte
  gewählt, weil sie 1:1 zum Wochenblog passt und die Quellenzeile den
  wissenschaftlichen Streit transparent kennzeichnet (Redlichkeit statt
  Übertreibung). Ruhiger Sonntagmorgen-Slot beibehalten.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Innere Ausrichtung" Variante B in `src/lib/reels.ts` (Serie „stufen"), Skript in `docs/skripte/reels/stufen.md`.
- ✅ Blog-Slug `warum-willenskraft-ueberschaetzt-wird` existiert in `src/lib/blog.ts` (Kategorie „Muster lösen"), reale Route `/blog/warum-willenskraft-ueberschaetzt-wird`.
- ✅ Deep-Dive `werte-und-ziele` in `src/lib/deep-dives.ts`, `relatedStage: 6` – Backlog-Warnung „nur naheliegend" damit aufgelöst, Zuordnung ist exakt.
- ✅ Praxis `herz-kohaerenz` in `src/lib/practices.ts`, `relatedStage: 6`, Route `/mitglieder/praxis/herz-kohaerenz`.
- ✅ Carousel-Baustein „06 · Innere Ausrichtung – Kopf, Herz und Handeln" real in `docs/carousels/stufen-ueberblick.mjs` gefunden.
- ✅ Studien-Kachel `WMDG-Studienfakt-05-hell.png`, Text `FACTS.key: "05"` aus `docs/marketing/content-data.mjs`.
- ✅ Lektion-Route `/mitglieder/stufe/6` + PDFs `content/pdf/stufe-6-lektion.pdf` / `stufe-6-uebungen.pdf` vorhanden.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
