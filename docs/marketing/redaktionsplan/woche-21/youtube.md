# YouTube-Redaktionsplan — Woche 21

**Wochenthema:** Block C · Mentale Selbstverteidigung — Sprache & Etiketten
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 95 („Sprache & Etiketten" · Reel-Hook „Ein Wort beendet jede Debatte" ·
Blog `sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` · Deep-Dive
`sprache-und-etiketten`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Sprache & Etiketten: Wie ein Etikett das Denken beendet | Blog `src/lib/blog.ts` → Slug `sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` + Deep-Dive `src/lib/deep-dives.ts` → Slug `sprache-und-etiketten` (PDF `content/pdf/vertiefung-sprache-und-etiketten.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Ein einziges Wort kann eine ganze Diskussion beenden | Reel `selbstverteidigung` / Topic „Sprache & Etiketten" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 61–65 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Sprache & Etiketten: Wie ein Etikett
  das Denken beendet" (`src/lib/blog.ts`, Slug
  `sprache-und-etiketten-wie-ein-etikett-das-denken-beendet`, Kategorie
  „Mentale Selbstverteidigung") — „Schwurbler", „Gutmensch",
  „Nestbeschmutzer": ein einziges Etikett kann jede Debatte beenden, bevor
  sie beginnt, weil es das Argument durch ein Gefühl ersetzt.
- Vertiefung/Fachteil: Deep-Dive „Sprache & Etiketten"
  (`src/lib/deep-dives.ts`, Slug `sprache-und-etiketten`, Untertitel „Wie
  Wörter deine Wahrnehmung färben", Kategorie „Mentale
  Selbstverteidigung"), PDF `content/pdf/vertiefung-sprache-und-etiketten.pdf`
- Programmbezug/Einordnung: Wissensdatenbank
  `/mitglieder/wissen/sprache-und-etiketten`

**Videotitel-Vorschlag:**
„Sprache & Etiketten: Wie ein Etikett das Denken beendet"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
„Schwurbler", „Gutmensch", „Nestbeschmutzer" — ein einziges Etikett kann
eine Debatte beenden, bevor sie überhaupt beginnt. In diesem Video zeige ich
dir, wie Begriffe zu fertigen Urteilen werden und wie du den Menschen wieder
vom Wort trennst, bevor du selbst prüfst. Hol dir dazu das kostenlose
E-Book „Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Sprache und Etiketten, Mentale Selbstverteidigung, Manipulation erkennen, kritisches Denken, Medienkompetenz

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-sprache-und-etiketten-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Sprache & Etiketten" — Hook „Ein Wort beendet jede Debatte"
(Reel-Skript-Hook: „Ein einziges Wort kann eine ganze Diskussion beenden.").
Skripttext: `docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile 61–65.
Dasselbe Reel-Thema (Sprache & Etiketten) läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Ein einziges Wort kann eine ganze Diskussion beenden"

**Beschreibung:** „Experte" oder „Querulant" — bei exakt demselben Satz
entscheidet ein Wort, ob man dir zuhört oder wegsieht. Die volle Erklärung
im Hauptvideo „Sprache & Etiketten: Wie ein Etikett das Denken beendet" —
komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** „Experte / Querulant / Aktivist / Leugner —
Bewertung ohne Beweis."

**CTA im Video:** „Welches Reizwort triggert dich sofort? — ganzes Video
oben verlinkt."

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-sprache-und-etiketten-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank `/mitglieder/wissen/sprache-und-etiketten`).
