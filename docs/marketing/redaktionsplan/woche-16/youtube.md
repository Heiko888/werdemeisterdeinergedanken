# YouTube-Redaktionsplan — Woche 16

**Wochenthema:** Block C · Mentale Selbstverteidigung — Gruppendruck
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 90 („Gruppendruck" · Reel-Hook „Laut ≠ Mehrheit" · Blog
`gruppendruck-und-die-schweigespirale` · Deep-Dive `gruppendruck`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Gruppendruck: Warum wir schweigen, obwohl wir zweifeln | Blog `src/lib/blog.ts` → Slug `gruppendruck-und-die-schweigespirale` + Deep-Dive `src/lib/deep-dives.ts` → Slug `gruppendruck` (PDF `content/pdf/vertiefung-gruppendruck.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Die Mehrheit, vor der du dich fürchtest, gibt es oft gar nicht | Reel `selbstverteidigung` / Topic „Gruppendruck" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 85–89 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Gruppendruck: Warum wir schweigen,
  obwohl wir zweifeln" (`src/lib/blog.ts`, Slug
  `gruppendruck-und-die-schweigespirale`, Kategorie „Mentale
  Selbstverteidigung") — die Schweigespirale, die Mehrheitsillusion, wie
  Mut klein anfängt.
- Vertiefung/Fachteil: Deep-Dive „Gruppendruck & Schweigespirale"
  (`src/lib/deep-dives.ts`, Slug `gruppendruck`, Untertitel „Warum wir uns
  anpassen, obwohl wir zweifeln", Kategorie „Mentale Selbstverteidigung"),
  PDF `content/pdf/vertiefung-gruppendruck.pdf`
- Programmbezug/Einordnung: Wissensdatenbank
  `/mitglieder/wissen/gruppendruck`

**Videotitel-Vorschlag:**
„Gruppendruck: Warum wir schweigen, obwohl wir zweifeln"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Die Angst vor Ausgrenzung sitzt tiefer als jedes Argument — deshalb tragen
wir öffentlich mit, was wir privat bezweifeln. In diesem Video zeige ich
dir, wie die Schweigespirale eine Mehrheit vortäuscht, die es oft gar nicht
gibt, und warum ein einziger, ruhiger Satz sie auflösen kann. Hol dir dazu
das kostenlose E-Book „Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Gruppendruck, Schweigespirale, Mentale Selbstverteidigung, Zivilcourage, Persönlichkeitsentwicklung

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-gruppendruck-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Gruppendruck" — Hook „Laut ≠ Mehrheit" (Reel-Skript-Hook: „Die Mehrheit,
vor der du dich fürchtest, gibt es oft gar nicht.").
Skripttext: `docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 85–89.
Dasselbe Reel-Thema (Gruppendruck) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Die Mehrheit, vor der du dich fürchtest, gibt es oft gar
nicht"

**Beschreibung:** Laut ≠ Mehrheit. Die volle Erklärung im Hauptvideo
„Gruppendruck: Warum wir schweigen, obwohl wir zweifeln" — komplett oben
verlinkt. Kostenloses E-Book: https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Laut ≠ Mehrheit. · „Organisiertes
Schweigen."

**CTA im Video:** „Sag einmal ruhig, was du wirklich denkst — ganzes Video
oben verlinkt."

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-gruppendruck-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank
`/mitglieder/wissen/gruppendruck`).
