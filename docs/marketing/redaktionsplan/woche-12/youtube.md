# YouTube-Redaktionsplan — Woche 12

**Wochenthema:** Block C · Mentale Selbstverteidigung — Filterblase / Algorithmen
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 86 („Filterblase / Algorithmen" · Reel-Hook „Dein Feed ≠ die Welt" ·
Blog `filterblase-warum-dein-feed-nicht-die-welt-ist` · Deep-Dive `algorithmen`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Die Filterblase: Warum dein Feed nicht die Welt ist | Blog `src/lib/blog.ts` → Slug `filterblase-warum-dein-feed-nicht-die-welt-ist` + Deep-Dive `src/lib/deep-dives.ts` → Slug `algorithmen` (PDF `content/pdf/vertiefung-algorithmen.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Du siehst online nicht die Welt. Du siehst dich selbst | Reel `selbstverteidigung` / Topic „Algorithmen" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 73–77 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Die Filterblase: Warum dein Feed
  nicht die Welt ist" (`src/lib/blog.ts`, Slug
  `filterblase-warum-dein-feed-nicht-die-welt-ist`, Kategorie „Mentale
  Selbstverteidigung") — der Feed als Spiegel des eigenen Verhaltens, warum
  Empörung nach oben gespült wird, der Verlust der gemeinsamen Wirklichkeit.
- Vertiefung/Fachteil: Deep-Dive „Algorithmen & Filterblasen"
  (`src/lib/deep-dives.ts`, Slug `algorithmen`, Untertitel „Die
  personalisierte Realität", Kategorie „Mentale Selbstverteidigung"), PDF
  `content/pdf/vertiefung-algorithmen.pdf`
- Programmbezug/Einordnung: Wissensdatenbank `/mitglieder/wissen/algorithmen`

**Videotitel-Vorschlag:**
„Die Filterblase: Warum dein Feed nicht die Welt ist"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Online siehst du keine Wirklichkeit, sondern eine Auswahl, berechnet aus dem,
worauf du bisher reagiert hast. In diesem Video zeige ich dir, warum
Empörung nach oben gespült wird und wie du deine eigene Filterblase gezielt
durchlöcherst. Hol dir dazu das kostenlose E-Book „Werde Meister deiner
Gedanken": https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Filterblase, Algorithmen, Mentale Selbstverteidigung, Social Media, Medienkompetenz

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Algorithmen" — Hook „Dein Feed ≠ die Welt" (Reel-Skript-Hook: „Du siehst
online nicht die Welt. Du siehst dich selbst.").
Skripttext: `docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 73–77.
Dasselbe Reel-Thema (Algorithmen/Filterblase) läuft in dieser Woche parallel
auf Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Du siehst online nicht die Welt. Du siehst dich selbst"

**Beschreibung:** Dein Feed ist ein Spiegel, kein Fenster. Die volle
Erklärung im Hauptvideo „Die Filterblase: Warum dein Feed nicht die Welt
ist" — komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Spiegel, kein Fenster. · Empörung =
Reichweite.

**CTA im Video:** „Folge heute einer Stimme, die anders denkt — ganzes
Video oben verlinkt."

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank `/mitglieder/wissen/algorithmen`).
