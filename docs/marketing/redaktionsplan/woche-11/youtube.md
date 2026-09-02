# YouTube-Redaktionsplan — Woche 11

**Wochenthema:** Block C · Mentale Selbstverteidigung — Framing
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 85 („Framing" · Reel-Hook „Ein Wort ändert alles" · Blog
`framing-wie-ein-wort-deine-meinung-macht` · Deep-Dive `framing`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Framing: Wie ein einziges Wort deine Meinung macht | Blog `src/lib/blog.ts` → Slug `framing-wie-ein-wort-deine-meinung-macht` + Deep-Dive `src/lib/deep-dives.ts` → Slug `framing` (PDF `content/pdf/vertiefung-framing.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Diese zwei Sätze meinen dasselbe — und fühlen sich völlig anders an | Reel `selbstverteidigung` / Topic „Framing" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 55–59 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Framing: Wie ein einziges Wort deine
  Meinung macht" (`src/lib/blog.ts`, Slug
  `framing-wie-ein-wort-deine-meinung-macht`, Kategorie „Mentale
  Selbstverteidigung") — der Rahmen liefert die Bewertung gleich mit,
  Framing steckt schon in der Frage, auch Weglassen ist ein Rahmen.
- Vertiefung/Fachteil: Deep-Dive „Framing" (`src/lib/deep-dives.ts`, Slug
  `framing`, Untertitel „Die unsichtbare Macht hinter den Worten",
  Kategorie „Mentale Selbstverteidigung"), PDF `content/pdf/vertiefung-framing.pdf`
- Programmbezug/Einordnung: Wissensdatenbank `/mitglieder/wissen/framing`

**Videotitel-Vorschlag:**
„Framing: Wie ein einziges Wort deine Meinung macht"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Du glaubst, du reagierst auf Fakten — in Wirklichkeit reagierst du zuerst auf
den Rahmen, in dem sie dir präsentiert werden. In diesem Video zeige ich dir,
wie ein einziges Wort aus einer Kürzung eine Reform macht und wie du den
Frame erkennst, bevor du die Bewertung darin übernimmst. Hol dir dazu das
kostenlose E-Book „Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Framing, Mentale Selbstverteidigung, Manipulation erkennen, kritisches Denken, Medienkompetenz

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-framing-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Framing" — Hook „Ein Wort ändert alles" (Reel-Skript-Hook: „Diese zwei
Sätze meinen dasselbe — und fühlen sich völlig anders an.").
Skripttext: `docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 55–59.
Dasselbe Reel-Thema (Framing) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Diese zwei Sätze meinen dasselbe — und fühlen sich völlig anders an"

**Beschreibung:** „Investiert" oder „gibt aus" — gleiche Zahl, anderes
Gefühl. Die volle Erklärung im Hauptvideo „Framing: Wie ein einziges Wort
deine Meinung macht" — komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** „investiert" vs. „gibt aus" · Gleiche Zahl,
anderes Gefühl.

**CTA im Video:** „Speicher das für die nächsten Schlagzeilen — ganzes Video
oben verlinkt."

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-framing-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank `/mitglieder/wissen/framing`).
