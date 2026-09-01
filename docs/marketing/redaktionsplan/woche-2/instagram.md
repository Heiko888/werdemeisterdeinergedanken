# Instagram – Wochenplan

**Wochenthema:** Stufe 2 · Erwachen (Woche 2, Block A – Die 7 Stufen)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/stufen-ueberblick.mjs`, `docs/marketing/content-data.mjs`,
> `docs/marketing/zitate/`, `content/pdf/`). Blog-Route real unter
> **`/blog/…`** (`src/app/blog/[slug]/page.tsx`), nicht `/wissen/blog/…`.

## Woche 2 · Stufe 2 – Erwachen

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Wenn du deine Gedanken hören kannst – wer hört dann eigentlich zu?" | `src/lib/reels.ts` – Serie „stufen", Topic **Erwachen**, Variante B · Skript: `docs/skripte/reels/stufen.md`, Abschnitt „02 · Erwachen — Variante B" | „Folge für die nächste Stufe – wir gehen den Weg Schritt für Schritt." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Erwachen: Du bist nicht deine Gedanken – der Moment, der alles ändert" | `docs/carousels/stufen-ueberblick.mjs`, Slide „02 · Erwachen – Du bist nicht deine Gedanken" als Aufhänger, vertieft mit Blog `/blog/du-bist-nicht-deine-gedanken` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/reiz-reaktions-luecke` (`src/lib/deep-dives.ts`, `relatedStage: 2`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, falls du dich gerade selbst erkennst." |
| Freitag | 19:00 | 📚 Story | Umfrage „Kannst du gerade 60 Sekunden lang nur deinem Atem zuhören – ohne einzugreifen?" + Mini-Übung „Atembeobachtung" | `src/lib/practices.ts`, Slug **`atembeobachtung`** (Kategorie „Meditationen", 5–10 Minuten, `relatedStage: 2`) → Route `/mitglieder/praxis/atembeobachtung` | „Probier die Mini-Version jetzt und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Du bist nicht deine Gedanken. Du bist der, der sie bemerkt." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-03-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "03"`) · Lektion `/mitglieder/stufe/2` + PDF `content/pdf/stufe-2-lektion.pdf` (+ `stufe-2-uebungen.pdf`) | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → volle Stufe 2 in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Startzeit für Reichweite. Variante B des
  Erwachen-Themas gewählt, weil ihr Hook („wer hört dann eigentlich zu?")
  wörtlich das Wochenthema aus dem Backlog trifft und am neugierigsten macht.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte. Kombiniert das
  vorhandene Stufen-Carousel-Slide „02 · Erwachen" mit dem passenden
  Blogartikel gleichen Titels als „mehr lesen"-Vertiefung.
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus
  die reale Praxis `atembeobachtung`, die exakt zu Stufe 2 gehört
  (`relatedStage: 2`).
- **Zitat + Pitch (So, 08:00):** Wochenabschluss mit Bogen zum Angebot
  (E-Book → Mitgliedschaft), ruhiger Sonntagmorgen-Slot für Zitat-Posts.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Erwachen" Variante B in `src/lib/reels.ts` (Serie „stufen"), Skript in `docs/skripte/reels/stufen.md`.
- ✅ Blog-Slug `du-bist-nicht-deine-gedanken` existiert in `src/lib/blog.ts` (Kategorie „Bewusstsein"), reale Route `/blog/du-bist-nicht-deine-gedanken`.
- ✅ Deep-Dive `reiz-reaktions-luecke` in `src/lib/deep-dives.ts`, `relatedStage: 2` – passt exakt zu Stufe 2 (nicht nur „naheliegend").
- ✅ Praxis `atembeobachtung` in `src/lib/practices.ts`, `relatedStage: 2`, Route `/mitglieder/praxis/atembeobachtung`.
- ✅ Carousel-Baustein „02 · Erwachen – Du bist nicht deine Gedanken" real in `docs/carousels/stufen-ueberblick.mjs` gefunden.
- ✅ Zitat-Kachel `WMDG-Zitat-03-hell.png`, Text `key: "03"` aus `docs/marketing/content-data.mjs` – inhaltlich exakter Treffer (identischer Wortlaut wie der Blogtitel).
- ✅ Lektion-Route `/mitglieder/stufe/2` + PDFs `content/pdf/stufe-2-lektion.pdf` / `stufe-2-uebungen.pdf` vorhanden.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
