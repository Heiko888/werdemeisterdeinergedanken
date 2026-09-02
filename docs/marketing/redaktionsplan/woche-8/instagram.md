# Instagram – Wochenplan

**Wochenthema:** Block B · Praxis & Wissenschaft – Atmung & Nervensystem (Woche 8)
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`,
> `src/lib/blog.ts`, `src/lib/deep-dives.ts`, `src/lib/practices.ts`,
> `docs/carousels/marketing-serien.mjs`, `docs/marketing/content-data.mjs`,
> `docs/marketing/zitate/`, `content/pdf/`). Blog-Route real unter
> **`/blog/…`** (`src/app/blog/[slug]/page.tsx`), Deep-Dive-Route real unter
> **`/mitglieder/wissen/…`** (`src/app/mitglieder/wissen/[slug]/page.tsx`).
> Themenquelle: `docs/marketing/redaktionsplan/themen-backlog.md`, Block B,
> Zeile „Atmung & Nervensystem".

> **Cross-Channel-Abgleich:** `docs/marketing/redaktionsplan/woche-8/youtube.md`
> und `.../facebook.md` (beide bereits vorhanden) setzen für diese Woche
> explizit **„4-6-Atmung", Variante A** als kanalübergreifendes Reel-Kernthema
> ein. Dieser Plan übernimmt dasselbe Reel, damit der Crosspost über
> YouTube/Facebook/Instagram konsistent bleibt.

## Woche 8 · Atmung & Nervensystem

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Drei Minuten, ein klarer Rhythmus – atme jetzt mit mir." | `src/lib/reels.ts` – Serie „praxis", Topic **4-6-Atmung**, Variante A · Skript: `docs/skripte/reels/praxis.md`, Abschnitt „6 · 4-6-Atmung — Variante A · Vier ein, sechs aus" (Zeile 103) · Praxis-Basis dahinter: `atembeobachtung` (`src/lib/practices.ts`) | „Speichern und vor dem nächsten Gespräch nutzen. Folge für die nächste Übung." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Zwei Schalter für dein Nervensystem: Benennen und Atmen" | `docs/carousels/marketing-serien.mjs`, Carousel **„studien-fakten"**, Slide „Fakt 02 · Ein Gefühl zu benennen beruhigt" (Lieberman, UCLA 2007) als Aufhänger, vertieft mit Blog `/blog/gefuehle-benennen-beruhigt-das-gehirn` (`src/lib/blog.ts`, Kategorie „Wissenschaft") und Vertiefung `/mitglieder/wissen/emotionsregulation` (`src/lib/deep-dives.ts`) | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, falls dein Kopf gerade voll ist." |
| Freitag | 19:00 | 📚 Story | Umfrage „Fühlst du dich gerade eher unter Druck?" + Mini-Übung „Box Breathing" (das Atem-Quadrat) | `src/lib/practices.ts`, Slug **`box-breathing`** (Kategorie „Atemübungen", 3–5 Minuten) → Route `/mitglieder/praxis/box-breathing` · Skript-Basis: `docs/skripte/reels/praxis.md`, Abschnitt „7 · Box Breathing" | „Probier die 4 Phasen jetzt mit und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Der erste Schritt ist nicht Kontrolle. Es ist Bemerken." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-13-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `QUOTES`, `key: "13"`) · schließt den Bogen zur dritten Übung der Woche: Praxis „Atembeobachtung" (`src/lib/practices.ts`, Slug `atembeobachtung`) → `/mitglieder/praxis/atembeobachtung` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → alle Atem-Übungen in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Startzeit für Reichweite. „4-6-Atmung" Variante A statt
  „Atembeobachtung", weil YouTube (`woche-8/youtube.md`) und Facebook
  (`woche-8/facebook.md`) für diese Woche bereits explizit dasselbe
  Reel-Thema als kanalübergreifenden Crosspost-Kern festgelegt haben –
  Instagram bleibt damit die konsistente Quelle für alle drei Kanäle.
- **Carousel (Mi, 12:30):** Aha-Moment in der Wochenmitte. Es existiert kein
  dediziertes „Atmung/Nervensystem"-Carousel in `marketing-serien.mjs` (nur
  fünf Carousel-Serien insgesamt: `60000-gedanken`, `4-wege-freiheit`,
  `wer-denkt-hier`, `studien-fakten`, `gratis-ebook`). Am nächsten liegt die
  Wissenschafts-Serie „studien-fakten", deren Fakt 02 (Lieberman/Amygdala)
  exakt der für diese Woche zugewiesene Blog ist – die Brücke „Benennen
  (präfrontaler Kortex) und Atmen (Parasympathikus) beruhigen beide das
  Nervensystem" trägt den Rest des thematischen Bogens.
- **Story (Fr, 19:00):** Anwenden zum Wochenausklang – Umfrage-Sticker plus
  die reale Praxis `box-breathing`, bewusst verschieden vom Montags-Reel
  (4-6-Atmung), damit in der Woche zwei der drei zugewiesenen Atemübungen
  aktiv vorgeführt werden.
- **Zitat + Pitch (So, 08:00):** Schließt mit der dritten zugewiesenen Praxis
  (`atembeobachtung`) – die Basis-Meditation hinter beiden Atemtechniken der
  Woche. Kein stufenspezifisches Lektions-PDF vorhanden (Block B ist keine
  Stufen-Woche), daher generischer Funnel `/#ebook` → `/mitglieder`.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „4-6-Atmung" Variante A in `src/lib/reels.ts` (Serie „praxis"), Skript in `docs/skripte/reels/praxis.md`, Zeile 103.
- ✅ Blog-Slug `gefuehle-benennen-beruhigt-das-gehirn` existiert in `src/lib/blog.ts` (Kategorie „Wissenschaft"), reale Route `/blog/gefuehle-benennen-beruhigt-das-gehirn`.
- ✅ Deep-Dive `emotionsregulation` in `src/lib/deep-dives.ts`, reale Route `/mitglieder/wissen/emotionsregulation`.
- ✅ Praxis `atembeobachtung`, `vier-sechs-atmung`, `box-breathing` alle in `src/lib/practices.ts` gefunden (alle drei aus der Material-Map verwendet: Reel/Story/Pitch).
- ✅ Carousel „studien-fakten" real in `docs/carousels/marketing-serien.mjs` (Zeile 117), Slide „Fakt 02 · Ein Gefühl zu benennen beruhigt" wortgleich vorhanden.
- ✅ Zitat-Kachel `WMDG-Zitat-13-hell.png`, Text `QUOTES.key: "13"` aus `docs/marketing/content-data.mjs`, Datei real vorhanden in `docs/marketing/zitate/1x1/` und `4x5/`.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
- ⚠️ **Fehlender Baustein gemeldet:** Für „Atmung & Nervensystem" gibt es noch
  kein eigenes Carousel in `docs/carousels/marketing-serien.mjs`. Empfehlung
  an den Themen-Strategen: ein Carousel „Atem & Nervensystem" (4-6-Atmung,
  Box Breathing, Parasympathikus) ergänzen, damit künftige Wochen nicht auf
  die Studien-Fakten-Serie ausweichen müssen.
- ⚠️ **Blog-Wiederverwendung geprüft:** `gefuehle-benennen-beruhigt-das-gehirn`
  wurde bereits in Woche 4 (Stufe 4 „Emotionale Reifung") verwendet. Die
  erneute Zuweisung für Woche 8 steht so im Themen-Backlog (Block B) und
  wird hier bewusst anders eingebettet (Nervensystem/Atem-Fokus, andere
  Zitat-Kachel: `13` statt `02`) – siehe auch Hinweis in
  `docs/marketing/redaktionsplan/woche-8/facebook.md`.
