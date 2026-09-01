# Instagram – Wochenplan

**Wochenthema:** Stufe 3 · Selbstbeobachtung (Woche 3, Block A – Die 7 Stufen)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/stufen-ueberblick.mjs`, `docs/marketing/content-data.mjs`,
> `docs/marketing/zitate/`, `content/pdf/`). Blog-Route real unter
> **`/blog/…`** (`src/app/blog/[slug]/page.tsx`), nicht `/wissen/blog/…`.
>
> **Backlog-Hinweis geprüft:** Der Themen-Backlog markiert den Blog-Slug für
> Stufe 3 als nur „naheliegend". Verifiziert: `denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt`
> existiert real in `src/lib/blog.ts` und der zugehörige Deep-Dive
> `kognitive-verzerrungen` trägt `relatedStage: 3` – die Zuordnung ist also
> tatsächlich exakt, keine Abweichung nötig.

## Woche 3 · Stufe 3 – Selbstbeobachtung

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Ich bin früher in jeden einzelnen Gedanken reingesprungen." | `src/lib/reels.ts` – Serie „stufen", Topic **Selbstbeobachtung**, Variante A · Skript: `docs/skripte/reels/stufen.md`, Abschnitt „03 · Selbstbeobachtung — Variante A" | „Folge für die nächste Stufe – wir gehen den Weg Schritt für Schritt." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Selbstbeobachtung – Setz dich ans Ufer: 3 Denkfehler, die dich reinziehen" | `docs/carousels/stufen-ueberblick.mjs`, Slide „03 · Selbstbeobachtung – Setz dich ans Ufer" als Aufhänger, vertieft mit Blog `/blog/denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/kognitive-verzerrungen` (`src/lib/deep-dives.ts`, `relatedStage: 3`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, falls dich das gerade ertappt." |
| Freitag | 19:00 | 📚 Story | Umfrage „Springst du noch in jeden Gedanken – oder schaust du inzwischen manchmal nur zu?" + Mini-Übung „Der innere Beobachter" | `src/lib/practices.ts`, Slug **`innerer-beobachter`** (Kategorie „Meditationen", 10 Minuten, `relatedStage: 3`) → Route `/mitglieder/praxis/innerer-beobachter` | „Probier die 10-Minuten-Übung jetzt und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Der erste Schritt ist nicht Kontrolle. Es ist Bemerken." | Studien-/Zitat-Kachel `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-04-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `FACTS`, `key: "04"`, Quelle Tversky & Kahneman 1974) · Lektion `/mitglieder/stufe/3` + PDF `content/pdf/stufe-3-lektion.pdf` (+ `stufe-3-uebungen.pdf`) | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → volle Stufe 3 in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Startzeit für Reichweite. Variante A gewählt, weil sie
  das Symptom „in jeden Gedanken reinspringen" am direktesten zeigt und exakt
  zum Backlog-Hook „Nicht in jeden Gedanken springen" passt.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte. Kombiniert das
  Stufen-Carousel-Slide „03 · Selbstbeobachtung" mit dem Denkfehler-Blogartikel
  – beide drehen sich um dasselbe Bild: Abstand zum eigenen Denken gewinnen.
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus
  die reale Praxis `innerer-beobachter`, die exakt zu Stufe 3 gehört
  (`relatedStage: 3`).
- **Zitat + Pitch (So, 08:00):** Statt einer Alltags-Zitatkachel bewusst eine
  Studienfakt-Kachel gewählt (Tversky & Kahneman, „vorhersehbare" Denkfehler),
  weil sie inhaltlich exakt zum Wochenblog passt und die wissenschaftliche
  Seite des Programms zeigt. Ruhiger Sonntagmorgen-Slot beibehalten.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Selbstbeobachtung" Variante A in `src/lib/reels.ts` (Serie „stufen"), Skript in `docs/skripte/reels/stufen.md`.
- ✅ Blog-Slug `denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` existiert in `src/lib/blog.ts` (Kategorie „Wissenschaft"), reale Route `/blog/denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt`.
- ✅ Deep-Dive `kognitive-verzerrungen` in `src/lib/deep-dives.ts`, `relatedStage: 3` – Backlog-Warnung „nur naheliegend" damit aufgelöst, Zuordnung ist exakt.
- ✅ Praxis `innerer-beobachter` in `src/lib/practices.ts`, `relatedStage: 3`, Route `/mitglieder/praxis/innerer-beobachter`.
- ✅ Carousel-Baustein „03 · Selbstbeobachtung – Setz dich ans Ufer" real in `docs/carousels/stufen-ueberblick.mjs` gefunden.
- ✅ Studien-Kachel `WMDG-Studienfakt-04-hell.png`, Text `FACTS.key: "04"` aus `docs/marketing/content-data.mjs`.
- ✅ Lektion-Route `/mitglieder/stufe/3` + PDFs `content/pdf/stufe-3-lektion.pdf` / `stufe-3-uebungen.pdf` vorhanden.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
