# YouTube-Redaktionsplan — Woche 9

**Wochenthema:** Block B · Praxis & Wissenschaft — Was Meditation im Gehirn verändert
**Frequenz-Stufe:** fokussiert → 1× Hauptvideo (+ 1 Short als Crosspost)

Quelle Wochenthema: `docs/marketing/redaktionsplan/themen-backlog.md`, Block B,
Zeile 75 („Was Meditation im Gehirn verändert" · Blog
`was-meditation-im-gehirn-veraendert` · Reel-Serie „wissenschaft" ·
Studien-Zitate `docs/marketing/zitate/studien-4x5`).

---

## Wochenübersicht

| Tag | Uhrzeit | Format | Titel | Skript-/Quelle | CTA |
|---|---|---|---|---|---|
| Mi | 17:00 | ▶️ Video | Was Meditation wirklich im Gehirn verändert (ehrlich eingeordnet) | Blog `src/lib/blog.ts` → Slug `was-meditation-im-gehirn-veraendert` (Kategorie „Wissenschaft") | „Kostenloses E-Book sichern" → `/#ebook` |
| Do | 12:00 | ⚡ Short | 47 % deines Tages bist du gedanklich woanders | Reel `wissenschaft` / Topic „Abschweifender Geist" aus `src/lib/reels.ts`, Skript `docs/skripte/reels/wissenschaft.md` Zeile 58–64 (identisch zu IG/FB-Reel dieser Woche) | „Ganzes Video verlinkt oben ↑" |

Begründung Zeitpunkt: Hauptvideo Mittwoch 17:00 (Richtwert). Short am
Folgetag (Do 12:00) statt spätnachmittags, weil der Zahlen-Hook („47 %")
über Pendel-/Pausenzeiten mehr Sichtung bekommt — der Verweis aufs
Hauptvideo vom Vortag bleibt direkt im Video-Close erhalten.

---

## ▶️ Hauptvideo — Mi, 17:00

**Skript-/Materialbasis:**
- Kernaussage & Struktur: Blog-Artikel „Was Meditation wirklich im
  Gehirn verändert" (`src/lib/blog.ts`, Slug
  `was-meditation-im-gehirn-veraendert`, Kategorie „Wissenschaft") —
  zwei Belege: die Harvard-Studie von Killingsworth & Gilbert (2010, ca.
  47 % abschweifender Geist, korreliert mit geringerem Wohlbefinden) und
  die MBSR-Studie von Britta Hölzel (2011): mehr graue Substanz im
  Hippocampus, Hinweise auf eine weniger reaktive Amygdala nach acht
  Wochen Achtsamkeitstraining.
- Ehrlichkeit/Einordnung im Video: kleine Stichproben, kein Wundermittel,
  kein Ersatz für Behandlung — Punkt „Die nötige Vorsicht" aus dem
  Blogartikel wörtlich übernehmen.
- Optional als Textkarten im Schnitt: Studien-Zitate
  `docs/marketing/zitate/studien-4x5/` (Bildkacheln „Studienfakt" —
  Zuordnung einzelner Dateinummern zu diesem Thema liegt nicht als
  Manifest vor, daher nur als generische Zitat-Vorlage nutzen, nicht als
  themenspezifisch zugeordnet ausgeben).

**Videotitel-Vorschlag:**
„Was Meditation wirklich im Gehirn verändert (ehrlich eingeordnet)"

**Beschreibung (2–3 Sätze inkl. Funnel-Link):**
Fast die Hälfte des Tages ist unser Geist gedanklich woanders — und
genau das macht uns nachweislich unglücklicher. In diesem Video zeige
ich dir, was Achtsamkeitsforschung tatsächlich zeigt: vom abschweifenden
Geist bis zu messbaren Veränderungen im Gehirn nach acht Wochen Übung —
ohne Esoterik, ohne Übertreibung. Hol dir dazu das kostenlose E-Book
„Werde Meister deiner Gedanken":
https://werdemeisterdeinergedanken.de/#ebook

**Stichwort-Tags:** Meditation Wissenschaft, Achtsamkeit, Neuroplastizität, Amygdala, abschweifender Geist

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-meditation-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## ⚡ Short — Do, 12:00

**Reel-Quelle:** Serie „wissenschaft" (`src/lib/reels.ts`), Topic
„Abschweifender Geist" (Hook: „Fast die Hälfte des Tages bist du
gedanklich woanders."). Skripttext: `docs/skripte/reels/wissenschaft.md`,
Zeile 58–64 (Reel 06). Dieselbe Harvard-Studie (Killingsworth & Gilbert,
2010) wird im Blogartikel des Hauptvideos zitiert — direkte inhaltliche
Brücke. Dasselbe Reel-Thema läuft in dieser Woche parallel auf
Instagram/Facebook — ein Kernthema über alle Kanäle.

**Short-Titel:** „47 % deines Tages bist du gedanklich woanders"

**Beschreibung:** Zwei Harvard-Forscher haben über 2.000 Menschen mitten
im Alltag gefragt: Wo ist dein Kopf gerade? Ergebnis: fast die Hälfte
der Zeit woanders — und in diesen Momenten waren sie unglücklicher. Die
ganze Studie und was Meditation daran verändert im Hauptvideo „Was
Meditation wirklich im Gehirn verändert" — komplett oben verlinkt.
Kostenloses E-Book: https://werdemeisterdeinergedanken.de/#ebook

**On-Screen-Text (aus Skript):** ~47 % der Wachzeit abgeschweift · Geist
wandert zu Sorgen & Was-wäre-wenn · Abschweifen = unglücklicher ·
Präsenz ist kein Luxus

**CTA im Video:** „Mehr Übungen zur Präsenz — ganzes Video oben
verlinkt."

**Thumbnail:** `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-meditation-hell.png` (Creme-Variante, Standard; 2560×1440; dunkle Variante ohne `-hell` vorhanden). Themenspezifisches Motiv erstellt und einsatzbereit.

---

## Funnel-Pfad

Video/Short → `/#ebook` (Lead-Magnet, Anker in
`src/components/sections/LeadMagnet.tsx`) → E-Book-Funnel →
`/mitglieder` (Programmzugang; Übung „Atembeobachtung" als
Einstiegs-Praxis unter `/mitglieder/praxis/atembeobachtung`).
