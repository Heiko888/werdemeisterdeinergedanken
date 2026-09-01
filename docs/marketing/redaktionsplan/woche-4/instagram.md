# Instagram – Wochenplan

**Wochenthema:** Stufe 4 · Emotionale Reifung (Woche 4, Block A – Die 7 Stufen)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/stufen-ueberblick.mjs`, `docs/marketing/content-data.mjs`,
> `docs/marketing/zitate/`, `content/pdf/`). Blog-Route real unter
> **`/blog/…`** (`src/app/blog/[slug]/page.tsx`), nicht `/wissen/blog/…`.

## Woche 4 · Stufe 4 – Emotionale Reifung

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Ich hab mal auf die Uhr geschaut, wie lang ein schweres Gefühl wirklich dauert." | `src/lib/reels.ts` – Serie „stufen", Topic **Emotionale Reifung**, Variante B · Skript: `docs/skripte/reels/stufen.md`, Abschnitt „04 · Emotionale Reifung — Variante B" | „Folge für die nächste Stufe – wir gehen den Weg Schritt für Schritt." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Emotionale Reifung – Fühlen, was ist: Wie lang dauert ein Gefühl wirklich?" | `docs/carousels/stufen-ueberblick.mjs`, Slide „04 · Emotionale Reifung – Fühlen, was ist" als Aufhänger, vertieft mit Blog `/blog/gefuehle-benennen-beruhigt-das-gehirn` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/emotionsregulation` (`src/lib/deep-dives.ts`, `relatedStage: 4`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern für den nächsten schweren Moment." |
| Freitag | 19:00 | 📚 Story | Umfrage „Drückst du Gefühle eher weg – oder lässt du dich von ihnen überfluten?" + Mini-Übung „Verlängertes Ausatmen" | `src/lib/practices.ts`, Slug **`verlaengertes-ausatmen`** (Kategorie „Atemübungen", 3–5 Minuten, `relatedStage: 4`) → Route `/mitglieder/praxis/verlaengertes-ausatmen` | „Probier die 3-Minuten-Übung jetzt und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Ein Gefühl zu benennen dämpft die Amygdala – die Alarmzentrale des Gehirns." | Studien-Kachel `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-02-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `FACTS`, `key: "02"`, Quelle Lieberman et al., UCLA 2007) · Lektion `/mitglieder/stufe/4` + PDF `content/pdf/stufe-4-lektion.pdf` (+ `stufe-4-uebungen.pdf`) | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → volle Stufe 4 in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Startzeit für Reichweite. Variante B gewählt, weil sie
  wortgleich zum Backlog-Hook „Wie lang dauert ein Gefühl wirklich?" ist.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte. Kombiniert das
  Stufen-Carousel-Slide „04 · Emotionale Reifung" mit dem Blogartikel über
  die Amygdala-Studie – beide erzählen dieselbe Kernidee: Benennen beruhigt.
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus
  die reale Praxis `verlaengertes-ausatmen`, die exakt zu Stufe 4 gehört
  (`relatedStage: 4`).
- **Zitat + Pitch (So, 08:00):** Studienfakt-Kachel (Lieberman/UCLA) statt
  Alltags-Zitat, weil sie 1:1 zum Wochenblog „Gefühle benennen beruhigt das
  Gehirn" passt. Ruhiger Sonntagmorgen-Slot beibehalten.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Emotionale Reifung" Variante B in `src/lib/reels.ts` (Serie „stufen"), Skript in `docs/skripte/reels/stufen.md`.
- ✅ Blog-Slug `gefuehle-benennen-beruhigt-das-gehirn` existiert in `src/lib/blog.ts` (Kategorie „Wissenschaft"), reale Route `/blog/gefuehle-benennen-beruhigt-das-gehirn`.
- ✅ Deep-Dive `emotionsregulation` in `src/lib/deep-dives.ts`, `relatedStage: 4` – passt exakt.
- ✅ Praxis `verlaengertes-ausatmen` in `src/lib/practices.ts`, `relatedStage: 4`, Route `/mitglieder/praxis/verlaengertes-ausatmen`.
- ✅ Carousel-Baustein „04 · Emotionale Reifung – Fühlen, was ist" real in `docs/carousels/stufen-ueberblick.mjs` gefunden.
- ✅ Studien-Kachel `WMDG-Studienfakt-02-hell.png`, Text `FACTS.key: "02"` aus `docs/marketing/content-data.mjs`.
- ✅ Lektion-Route `/mitglieder/stufe/4` + PDFs `content/pdf/stufe-4-lektion.pdf` / `stufe-4-uebungen.pdf` vorhanden.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
