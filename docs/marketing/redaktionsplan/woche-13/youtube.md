# YouTube-Redaktionsplan — Woche 13

**Wochenthema:** Block C · Mentale Selbstverteidigung — Wiederholung = Wahrheit?
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block C,
Zeile 87 („Wiederholung = Wahrheit?" · Reel-Hook „Oft gehört = wahr?" ·
Blog `warum-oft-gehoert-sich-wie-wahr-anfuehlt` · Deep-Dive
`wiederholung-wahrheit`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Warum sich „oft gehört" wie „wahr" anfühlt | Blog `src/lib/blog.ts` → Slug `warum-oft-gehoert-sich-wie-wahr-anfuehlt` + Deep-Dive `src/lib/deep-dives.ts` → Slug `wiederholung-wahrheit` (PDF `content/pdf/vertiefung-wiederholung-wahrheit.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | Je öfter du etwas hörst, desto wahrer klingt es | Reel `selbstverteidigung` / Topic „Wiederholung" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/mentale-selbstverteidigung.md` Zeile 103–107 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil Shorts als Zubringer über den
Tag verteilt bessere Sichtung bei Pendel-/Pausenzeiten bekommen — inhaltlich
bleibt der direkte Verweis aufs Hauptvideo vom Vortag erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Warum sich ‚oft gehört' wie ‚wahr'
  anfühlt" (`src/lib/blog.ts`, Slug `warum-oft-gehoert-sich-wie-wahr-anfuehlt`,
  Kategorie „Mentale Selbstverteidigung") — Vertrautheit fühlt sich an wie
  Wahrheit, der scheinbare Konsens, wie du dich schützt.
- Vertiefung/Fachteil: Deep-Dive „Wiederholung wird zur Wahrheit"
  (`src/lib/deep-dives.ts`, Slug `wiederholung-wahrheit`, Untertitel „Warum
  Vertrautes glaubwürdig wirkt", Kategorie „Mentale Selbstverteidigung"),
  PDF `content/pdf/vertiefung-wiederholung-wahrheit.pdf`
- Programmbezug/Einordnung: Wissensdatenbank
  `/mitglieder/wissen/wiederholung-wahrheit`

**Videotitel-Vorschlag:**
„Warum sich ‚oft gehört' wie ‚wahr' anfühlt"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Je öfter du eine Aussage hörst, desto wahrer erscheint sie dir — ganz ohne
Beweis. In diesem Video zeige ich dir, wie dein Gehirn Vertrautheit mit
Wahrheit verwechselt und wie du den scheinbaren Konsens von echten,
unabhängigen Quellen unterscheidest. Hol dir dazu das kostenlose E-Book
„Werde Meister deiner Gedanken": https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Wiederholungseffekt, Mentale Selbstverteidigung, kritisches Denken, Manipulation erkennen, Medienkompetenz

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-wiederholung-wahrheit-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „selbstverteidigung" (`src/lib/reels.ts`), Topic
„Wiederholung" — Hook „Oft gehört = wahr?" (Reel-Skript-Hook: „Je öfter du
etwas hörst, desto wahrer klingt es. Auch wenn's falsch ist.").
Skripttext: `docs/skripte/reels/mentale-selbstverteidigung.md`, Zeile
103–107. Dasselbe Reel-Thema (Wiederholung) läuft in dieser Woche parallel
auf Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „Je öfter du etwas hörst, desto wahrer klingt es"

**Beschreibung:** Vertrautheit ist kein Beweis. Die volle Erklärung im
Hauptvideo „Warum sich ‚oft gehört' wie ‚wahr' anfühlt" — komplett oben
verlinkt. Kostenloses E-Book: https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** Vertrautheit ≠ Beweis.

**CTA im Video:** „Prüf heute eine Sache, die du für selbstverständlich
hältst — ganzes Video oben verlinkt."

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-wiederholung-wahrheit-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in `src/components/sections/LeadMagnet.tsx`)
→ E-Book-Funnel → `/mitglieder` (Programmzugang, Wissensdatenbank
`/mitglieder/wissen/wiederholung-wahrheit`).
