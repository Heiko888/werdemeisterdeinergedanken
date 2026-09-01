# Instagram – Wochenplan

**Wochenthema:** Stufe 5 · Schöpferkraft (Woche 5, Block A – Die 7 Stufen)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/stufen-ueberblick.mjs`, `docs/marketing/content-data.mjs`,
> `docs/marketing/zitate/`, `content/pdf/`). Blog-Route real unter
> **`/blog/…`** (`src/app/blog/[slug]/page.tsx`), nicht `/wissen/blog/…`.

## Woche 5 · Stufe 5 – Schöpferkraft

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Was du oft denkst, wird zur Straße in deinem Kopf. Und das ist wörtlich gemeint." | `src/lib/reels.ts` – Serie „stufen", Topic **Schöpferkraft**, Variante A · Skript: `docs/skripte/reels/stufen.md`, Abschnitt „05 · Schöpferkraft — Variante A" | „Folge für die nächste Stufe – wir gehen den Weg Schritt für Schritt." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Schöpferkraft – Du schreibst den Code neu: dein Gehirn ist formbar" | `docs/carousels/stufen-ueberblick.mjs`, Slide „05 · Schöpferkraft – Du schreibst den Code neu" als Aufhänger, vertieft mit Blog `/blog/neuroplastizitaet-warum-dein-gehirn-formbar-ist` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/neuroplastizitaet` (`src/lib/deep-dives.ts`, `relatedStage: 5`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, falls du gerade eine neue Bahn bauen willst." |
| Freitag | 19:00 | 📚 Story | Umfrage „Handy zuerst oder Ausrichtung zuerst – was machst du morgens als Erstes?" + Mini-Übung „Morgen-Ausrichtung" | `src/lib/practices.ts`, Slug **`morgen-ausrichtung`** (Kategorie „Rituale", 5 Minuten, `relatedStage: 5`) → Route `/mitglieder/praxis/morgen-ausrichtung` | „Probier die 5-Minuten-Übung morgen früh und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Dein Gehirn bleibt formbar – ein Leben lang." | Studien-Kachel `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-06-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `FACTS`, `key: "06"`, Quelle Maguire 2000 · Draganski 2004) · Lektion `/mitglieder/stufe/5` + PDF `content/pdf/stufe-5-lektion.pdf` (+ `stufe-5-uebungen.pdf`) | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → volle Stufe 5 in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Startzeit für Reichweite. Variante A wortgleich zum
  Backlog-Hook „Was du oft denkst, wird zur Straße im Kopf" gewählt.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte. Kombiniert das
  Stufen-Carousel-Slide „05 · Schöpferkraft" mit dem Neuroplastizitäts-
  Blogartikel – beide zeigen dasselbe Bild: gebahnte Wege im Kopf.
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus
  die reale Praxis `morgen-ausrichtung`, die exakt zu Stufe 5 gehört
  (`relatedStage: 5`).
- **Zitat + Pitch (So, 08:00):** Studienfakt-Kachel (Maguire/Draganski) statt
  Alltags-Zitat, weil sie 1:1 zum Wochenblog über Neuroplastizität passt.
  Ruhiger Sonntagmorgen-Slot beibehalten.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Schöpferkraft" Variante A in `src/lib/reels.ts` (Serie „stufen"), Skript in `docs/skripte/reels/stufen.md`.
- ✅ Blog-Slug `neuroplastizitaet-warum-dein-gehirn-formbar-ist` existiert in `src/lib/blog.ts` (Kategorie „Wissenschaft"), reale Route `/blog/neuroplastizitaet-warum-dein-gehirn-formbar-ist`.
- ✅ Deep-Dive `neuroplastizitaet` in `src/lib/deep-dives.ts`, `relatedStage: 5` – passt exakt.
- ✅ Praxis `morgen-ausrichtung` in `src/lib/practices.ts`, `relatedStage: 5`, Route `/mitglieder/praxis/morgen-ausrichtung`.
- ✅ Carousel-Baustein „05 · Schöpferkraft – Du schreibst den Code neu" real in `docs/carousels/stufen-ueberblick.mjs` gefunden.
- ✅ Studien-Kachel `WMDG-Studienfakt-06-hell.png`, Text `FACTS.key: "06"` aus `docs/marketing/content-data.mjs`.
- ✅ Lektion-Route `/mitglieder/stufe/5` + PDFs `content/pdf/stufe-5-lektion.pdf` / `stufe-5-uebungen.pdf` vorhanden.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
