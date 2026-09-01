# YouTube-Redaktionsplan — Woche 14

**Wochenthema:** Block C · Mentale Selbstverteidigung — Reizüberflutung
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 88 („Reizüberflutung" · Reel-Hook „Dein Gehirn im Daueralarm" · Blog
`reizueberflutung-warum-dein-gehirn-nicht-abschaltet` · Deep-Dive
`reizueberflutung`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Reizüberflutung: Warum dein Gehirn nicht mehr abschaltet | Blog `src/lib/blog.ts` → Slug `reizueberflutung-warum-dein-gehirn-nicht-abschaltet` + Deep-Dive `src/lib/deep-dives.ts` → Slug `reizueberflutung` (PDF `content/pdf/vertiefung-reizueberflutung.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Dein Gehirn ist im Daueralarm. Und im Alarm denkst du schlechter | Reel `selbstverteidigung` / Topic „Reizüberflutung" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 139–143 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Reizüberflutung: Warum dein Gehirn
  nicht mehr abschaltet" (`src/lib/blog.ts`, Slug
  `reizueberflutung-warum-dein-gehirn-nicht-abschaltet`, Kategorie „Mentale
  Selbstverteidigung") — die schnelle und die langsame Stressreaktion,
  warum du im Alarm schlechter denkst, der Kreislauf und der Ausweg.
- Vertiefung/Fachteil: Deep-Dive „Reizüberflutung & Alarmbereitschaft"
  (`src/lib/deep-dives.ts`, Slug `reizueberflutung`, Untertitel „Warum ein
  überflutetes Gehirn leichter zu lenken ist", Kategorie „Mentale
  Selbstverteidigung"), PDF `content/pdf/vertiefung-reizueberflutung.pdf`
- Programmbezug/Einordnung: Wissensdatenbank
  `/mitglieder/wissen/reizueberflutung`

**Videotitel-Vorschlag:**
„Reizüberflutung: Warum dein Gehirn nicht mehr abschaltet"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Nachrichten, Pushs, Dauer-Empörung: Zu viele gleichzeitige Reize halten dein
Nervensystem in Alarmbereitschaft — und in diesem Zustand denkst du enger
und bist leichter lenkbar. In diesem Video zeige ich dir, warum das so ist
und mit welchen einfachen Schritten du deinem Kopf wieder Ruhe gibst. Hol
dir dazu das kostenlose E-Book „Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Reizüberflutung, Stress, Mentale Selbstverteidigung, Nervensystem, Achtsamkeit

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-reizueberflutung-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Reizüberflutung" — Hook „Dein Gehirn im Daueralarm" (Reel-Skript-Hook:
„Dein Gehirn ist im Daueralarm. Und im Alarm denkst du schlechter.").
Skripttext: `docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile
139–143. Dasselbe Reel-Thema (Reizüberflutung) läuft in dieser Woche
parallel auf Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Dein Gehirn ist im Daueralarm. Und im Alarm denkst du
schlechter"

**Beschreibung:** Alarm → enges Denken → leichter lenkbar. Die volle
Erklärung im Hauptvideo „Reizüberflutung: Warum dein Gehirn nicht mehr
abschaltet" — komplett oben verlinkt. Kostenloses E-Book:
https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Alarm → enges Denken → leichter lenkbar.

**CTA im Video:** „Ruhe ist keine Zeitverschwendung — ganzes Video oben
verlinkt."

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-reizueberflutung-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank
`/mitglieder/wissen/reizueberflutung`).
