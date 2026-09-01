# YouTube-Redaktionsplan — Woche 8

**Wochenthema:** Block B · Praxis & Wissenschaft — Atmung & Nervensystem
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block B,
Zeile 74 („Atmung & Nervensystem" · Reel-Serie „praxis" · Praxis
`atembeobachtung`, `vier-sechs-atmung`, `box-breathing` · Blog
`gefuehle-benennen-beruhigt-das-gehirn`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Zwei Schalter für dein Nervensystem: Benennen und Atmen | Blog `src/lib/blog.ts` → Slug `gefuehle-benennen-beruhigt-das-gehirn` + Praxis `src/lib/practices.ts` → Slug `atembeobachtung` (Basis), `vier-sechs-atmung` und `box-breathing` (Anwendung) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Drei Minuten, ein Rhythmus: die 4-6-Atmung | Reel `praxis` / Topic „4-6-Atmung" Variante A aus `src/lib/reels.ts`, Skript `docs/skripte/reels/praxis.md` Zeile 103–110 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑ — dort auch Box Breathing & Atembeobachtung" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil eine kurze, konkrete
Atem-Übung über Pendel-/Pausenzeiten mehr Sichtung bekommt — der Verweis
aufs Hauptvideo vom Vortag bleibt direkt im Video-Close erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Warum ein Gefühl zu benennen dein
  Gehirn beruhigt" (`src/lib/blog.ts`, Slug
  `gefuehle-benennen-beruhigt-das-gehirn`, Kategorie „Wissenschaft") —
  die Lieberman-Studie (UCLA, 2007): Benennen einer Emotion senkt die
  Aktivität der Amygdala, der Alarmzentrale des Gehirns.
- Praxisteil (zweiter Schalter fürs Nervensystem, live angeleitet):
  Basis-Übung „Atembeobachtung" (`src/lib/practices.ts`, Slug
  `atembeobachtung`, 5–10 Minuten, Kategorie „Meditationen"), danach die
  beiden Anwendungs-Techniken „4-6-Atmung" (Slug `vier-sechs-atmung`,
  3 Minuten, Kategorie „Atemübungen") und „Box Breathing" (Slug
  `box-breathing`, 3–5 Minuten, Kategorie „Atemübungen") für akute
  Stressmomente.
- Brücke im Video: Benennen beruhigt über den präfrontalen Kortex, Atmen
  beruhigt über den Parasympathikus — zwei unabhängige, gut belegte Wege
  zum selben Ziel: ein ruhigeres Nervensystem.

**Videotitel-Vorschlag:**
„Zwei Schalter für dein Nervensystem: Benennen und Atmen"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Ein Gefühl zu benennen senkt nachweislich die Aktivität deiner
Alarmzentrale im Gehirn — und ein bewusst verlängerter Atem tut dasselbe
über deinen Parasympathikus. In diesem Video zeige ich dir beide Wege:
die Wissenschaft dahinter und zwei Atem-Übungen zum direkten Mitmachen
(4-6-Atmung und Box Breathing). Hol dir dazu das kostenlose E-Book
„Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Nervensystem beruhigen, Atemübung, Affect Labeling, Stressabbau, Achtsamkeit

**Thumbnail:** Kein stufenspezifisches Motiv für Block B vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „praxis" (`src/lib/reels.ts`), Topic „4-6-Atmung",
Variante A — „Vier ein, sechs aus" (Hook: „Drei Minuten, ein klarer
Rhythmus – atme jetzt mit mir.").
Skripttext: `docs/skripte/reels/praxis.md`, Zeile 103–110.
Dasselbe Reel-Thema (4-6-Atmung) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Drei Minuten, ein Rhythmus: die 4-6-Atmung"

**Beschreibung:** Vier Sekunden ein, sechs Sekunden aus — ein einfacher
Takt, der dein Nervensystem in wenigen Minuten beruhigt. Die ganze
Erklärung (plus Box Breathing und die Wissenschaft ums Gefühle-Benennen)
im Hauptvideo „Zwei Schalter für dein Nervensystem" — komplett oben
verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Ein: 4 · Aus: 6 · nicht anhalten ·
weicher Übergang · 8–10 Zyklen

**CTA im Video:** „Mach den kostenlosen Bewusstseinstest — ganzes Video
oben verlinkt."

**Thumbnail:** Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu
produzieren.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in
`src/components/sections/LeadMagnet.tsx`) → E-Book-Funnel →
`/mitglieder` (Programmzugang; Übungen dort direkt abrufbar unter
`/mitglieder/praxis/atembeobachtung`, `/mitglieder/praxis/vier-sechs-atmung`
und `/mitglieder/praxis/box-breathing`, Route `src/app/mitglieder/praxis/[slug]/page.tsx`).
