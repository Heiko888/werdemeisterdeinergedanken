# Instagram – Wochenplan

**Wochenthema:** Stufe 1 · Autopilot (Woche 1, Block A – Die 7 Stufen)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/`, `docs/marketing/zitate/`, `content/pdf/`). Korrektur zum
> Themen-Backlog: Der Blog liegt real unter **`/blog/…`**, nicht unter
> `/wissen/blog/…` (Route: `src/app/blog/[slug]/page.tsx`) – im Plan unten mit
> dem realen Pfad verwendet. Bitte im Backlog gegenprüfen/anpassen.

## Woche 1 · Stufe 1 – Autopilot

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Ich hab mal einen Tag lang mitgezählt, wie oft ich wirklich entscheide." | `src/lib/reels.ts` – Serie „stufen", Topic **Autopilot**, Variante A · Skript: `docs/skripte/reels/stufen.md`, Abschnitt „01 · Autopilot — Variante A: Läuft das automatisch?" | „Folge für die nächste Stufe – wir gehen den Weg Schritt für Schritt." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Autopilot – du wirst gelebt: 3 Muster, die gerade für dich entscheiden" | `docs/carousels/stufen-ueberblick.mjs`, Slide „01 · Autopilot – Du wirst gelebt" als Aufhänger, vertieft mit Blog `/blog/drei-muster-die-dich-unbewusst-steuern` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/automatische-gedanken` (`src/lib/deep-dives.ts`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, falls du dich gerade selbst erkennst." |
| Freitag | 19:00 | 📚 Story | Umfrage „Ehrlich – bist du gerade im Autopilot oder bewusst dabei?" + Mini-Übung „Der Autopilot-Check" | `src/lib/practices.ts`, Slug **`autopilot-check`** (Kategorie „Rituale", 2 Minuten, `relatedStage: 1`) → Route `/mitglieder/praxis/autopilot-check` | „Probier den 2-Minuten-Check jetzt und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Raus aus dem Autopilot – rein in echte innere Klarheit." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-04-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "04"`) · Lektion `/mitglieder/stufe/1` + PDF `content/pdf/stufe-1-lektion.pdf` (+ `stufe-1-uebungen.pdf`) | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → volle Stufe 1 in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** klassische Startzeit für Reichweite – bewusst als
  erster Touchpoint der Woche (Aufmerksamkeit/Hook), Variante A des
  Autopilot-Themas gewählt, weil sie das Symptom am direktesten zeigt.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte, Standard-Mittagszeit
  beibehalten. Kombiniert das vorhandene Stufen-Carousel-Slide mit dem
  passenden Blogartikel als „mehr lesen"-Vertiefung.
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus die
  reale Mini-Übung `autopilot-check`, die exakt zu Stufe 1 gehört
  (`relatedStage: 1`).
- **Zitat + Pitch (So, 08:00):** bewusst am Sonntagmorgen statt mitten in der
  Woche, weil der Wochenabschluss den Bogen zum Angebot (E-Book → Mitgliedschaft)
  schlägt und der ruhige Sonntagmorgen-Slot für inspirierende Zitat-Posts
  erfahrungsgemäß am besten funktioniert.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel-Serie „stufen" inkl. Autopilot A/B/C in `src/lib/reels.ts`, Skript in `docs/skripte/reels/stufen.md`.
- ✅ Lektion-Route `src/app/mitglieder/stufe/[nr]/page.tsx` (+ `lektion/route.ts`, `uebungen/route.ts`); PDFs `content/pdf/stufe-1-lektion.pdf` und `content/pdf/stufe-1-uebungen.pdf` vorhanden.
- ⚠️ Blog-Slug `drei-muster-die-dich-unbewusst-steuern` existiert in `src/lib/blog.ts`, aber die reale Route ist `/blog/[slug]` (`src/app/blog/[slug]/page.tsx`) – **nicht** `/wissen/blog/…` wie im Themen-Backlog notiert. Bitte Backlog korrigieren.
- ✅ Deep-Dive `automatische-gedanken` in `src/lib/deep-dives.ts`, Route `/mitglieder/wissen/[slug]`.
- ✅ Praxis `autopilot-check` in `src/lib/practices.ts`, Route `/mitglieder/praxis/[slug]`.
- ✅ Zitat-Kachel: kein direkter „Autopilot"-Slug in `docs/marketing/zitate/`, da die Kacheln durchnummeriert sind (`WMDG-Zitat-01` … `-11`, je mit/ohne `-hell`). Text-Quelle ist `docs/marketing/content-data.mjs`; `key: "04"` = „Raus aus dem Autopilot – rein in echte innere Klarheit." → inhaltlich der beste Treffer für Stufe 1. Creme-Variante `WMDG-Zitat-04-hell.png` als Standard verwendet.
- ✅ Carousel-Baustein „Autopilot – Du wirst gelebt" real in `docs/carousels/stufen-ueberblick.mjs` (Slide `n: "01"`) gefunden und genutzt (nicht in `marketing-serien.mjs`, das für diese Woche kein Stufe-1-Carousel enthält).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
