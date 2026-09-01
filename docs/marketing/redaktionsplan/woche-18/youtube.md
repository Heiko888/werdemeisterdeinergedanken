# YouTube-Redaktionsplan — Woche 18

**Wochenthema:** Block C · Mentale Selbstverteidigung — Propaganda
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 92 („Propaganda" · Reel-Hook „Ohne eine einzige Lüge" · Blog
`propaganda-erkennst-du-nicht-an-lauten-parolen` · Deep-Dive `propaganda`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Propaganda erkennst du nicht an lauten Parolen | Blog `src/lib/blog.ts` → Slug `propaganda-erkennst-du-nicht-an-lauten-parolen` + Deep-Dive `src/lib/deep-dives.ts` → Slug `propaganda` (PDF `content/pdf/vertiefung-propaganda.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Propaganda erkennst du nicht an lauten Parolen. Sondern hieran | Reel `selbstverteidigung` / Topic „Propaganda" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 49–53 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Propaganda erkennst du nicht an
  lauten Parolen" (`src/lib/blog.ts`, Slug
  `propaganda-erkennst-du-nicht-an-lauten-parolen`, Kategorie „Mentale
  Selbstverteidigung") — drei Hebel ohne Lüge (Wiederholung, Emotion,
  Vereinfachung), Feindbild und Zugehörigkeit, dein Schutz.
- Vertiefung/Fachteil: Deep-Dive „Propaganda & Konditionierung"
  (`src/lib/deep-dives.ts`, Slug `propaganda`, Untertitel „Wie Denken von
  außen geformt wird", Kategorie „Mentale Selbstverteidigung"), PDF
  `content/pdf/vertiefung-propaganda.pdf`
- Programmbezug/Einordnung: Wissensdatenbank `/mitglieder/wissen/propaganda`

**Videotitel-Vorschlag:**
„Propaganda erkennst du nicht an lauten Parolen"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Wir stellen uns Propaganda gern plump vor — laute Parolen, offensichtliche
Lügen. Doch die wirksamste Beeinflussung ist leise und arbeitet über
Wiederholung, Emotion und Vereinfachung, ganz ohne eine einzige Lüge; in
diesem Video zeige ich dir die drei Hebel und wie du dich schützt. Hol dir
dazu das kostenlose E-Book „Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Propaganda, Mentale Selbstverteidigung, Manipulation erkennen, kritisches Denken, Medienkompetenz

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Propaganda" — Hook „Ohne eine einzige Lüge" (Reel-Skript-Hook: „Propaganda
erkennst du nicht an lauten Parolen. Sondern hieran.").
Skripttext: `docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 49–53.
Dasselbe Reel-Thema (Propaganda) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Propaganda erkennst du nicht an lauten Parolen. Sondern
hieran"

**Beschreibung:** Wiederholung · Emotion · Vereinfachung — keine Lüge
nötig. Die volle Erklärung im Hauptvideo „Propaganda erkennst du nicht an
lauten Parolen" — komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Wiederholung · Emotion · Vereinfachung ·
„Keine Lüge nötig."

**CTA im Video:** „Woher stammt deine stärkste Überzeugung? Schreib's in
die Kommentare — ganzes Video oben verlinkt."

**Thumbnail:** Kein stufenspezifisches Motiv für Block C vorhanden. Basis
`docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
(Creme-Variante, Standard laut Kanal-Vorgabe) — Motiv noch zu produzieren.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank
`/mitglieder/wissen/propaganda`).
