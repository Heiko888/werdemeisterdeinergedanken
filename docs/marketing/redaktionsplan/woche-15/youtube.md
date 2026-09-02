# YouTube-Redaktionsplan — Woche 15

**Wochenthema:** Block C · Mentale Selbstverteidigung — Werbung & Mangel
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 89 („Werbung & Mangel" · Reel-Hook „Sie verkauft dir den Mangel" ·
Blog `werbung-und-der-kuenstliche-mangel` · Deep-Dive `werbung-und-mangel`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Werbung verkauft dir keinen Mangel — sie erschafft ihn | Blog `src/lib/blog.ts` → Slug `werbung-und-der-kuenstliche-mangel` + Deep-Dive `src/lib/deep-dives.ts` → Slug `werbung-und-mangel` (PDF `content/pdf/vertiefung-werbung-und-mangel.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Werbung verkauft dir kein Produkt. Sie verkauft dir einen Mangel | Reel `selbstverteidigung` / Topic „Werbung & Mangel" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 79–83 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Werbung verkauft dir keinen Mangel —
  sie erschafft ihn" (`src/lib/blog.ts`, Slug
  `werbung-und-der-kuenstliche-mangel`, Kategorie „Mentale
  Selbstverteidigung") — erst der Mangel, dann das Produkt; Vergleich,
  Status, Gefühl; die Pause als Ausweg.
- Vertiefung/Fachteil: Deep-Dive „Werbung & künstlicher Mangel"
  (`src/lib/deep-dives.ts`, Slug `werbung-und-mangel`, Untertitel „Wie ein
  Bedürfnis erschaffen wird", Kategorie „Mentale Selbstverteidigung"), PDF
  `content/pdf/vertiefung-werbung-und-mangel.pdf`
- Programmbezug/Einordnung: Wissensdatenbank
  `/mitglieder/wissen/werbung-und-mangel`

**Videotitel-Vorschlag:**
„Werbung verkauft dir keinen Mangel — sie erschafft ihn"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Gute Werbung verkauft kein Produkt, sondern zuerst ein unangenehmes Gefühl:
dass dir etwas fehlt. In diesem Video zeige ich dir, wie dieser künstliche
Mangel erzeugt wird und mit welcher einfachen 24-Stunden-Regel du deinen
nächsten Kaufimpuls durchschaust. Hol dir dazu das kostenlose E-Book „Werde
Meister deiner Gedanken": https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Werbung, künstlicher Mangel, Mentale Selbstverteidigung, Konsumkritik, Achtsamkeit

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-werbung-und-mangel-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Werbung & Mangel" — Hook „Sie verkauft dir den Mangel" (Reel-Skript-Hook:
„Werbung verkauft dir kein Produkt. Sie verkauft dir einen Mangel.").
Skripttext: `docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 79–83.
Dasselbe Reel-Thema (Werbung & Mangel) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Werbung verkauft dir kein Produkt. Sie verkauft dir einen
Mangel"

**Beschreibung:** Erst der Mangel. Dann das Produkt. Die volle Erklärung im
Hauptvideo „Werbung verkauft dir keinen Mangel — sie erschafft ihn" —
komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Erst der Mangel. Dann das Produkt.

**CTA im Video:** „24-Stunden-Regel vor jedem Kauf — ganzes Video oben
verlinkt."

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-werbung-und-mangel-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank
`/mitglieder/wissen/werbung-und-mangel`).
