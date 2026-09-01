# LinkedIn – Woche 1 · Block A · Stufe 1 „Autopilot"

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Zeile „Woche 1 – Stufe 1 ·
> Autopilot". Alle Slugs/Pfade gegen `src/lib/blog.ts`, `src/lib/deep-dives.ts`,
> `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs` und
> `docs/marketing/zitate/` geprüft (`rg`/`ls`, s. Prüfvermerke je Zeile).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s. `docs/marketing/zitate/4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Drei Muster laufen in fast jedem Team unbewusst mit – und sie entscheiden öfter als jeder Meeting-Beschluss." Text übersetzt die drei Muster aus dem Blogartikel in Arbeitskontexte: (1) *Der ständige Beweiser* – wer sich in jedem Status-Meeting neu beweisen muss, arbeitet auf Dauer gegen die eigene Erschöpfung. (2) *Harmonie um jeden Preis* – wer Konflikte im Projekt vermeidet, verliert den Kontakt zur eigenen fachlichen Position. (3) *Kontrolle als Sicherheit* – wer jeden Prozess durchplanen will, gerät bei jeder Planänderung unter Stress. Schluss: Diese Muster liefen lange auf Autopilot – bemerken ist der erste Führungs- und Selbstführungsschritt, nicht das Bekämpfen. | Blog `/wissen/blog/drei-muster-die-dich-unbewusst-steuern` (verifiziert in `src/lib/blog.ts`, Zeilen 309–345: „Der ständige Beweiser", „Harmonie um jeden Preis", „Kontrolle als Sicherheit") | Kommentar-Frage: „Welches der drei Muster erkennst du in deinem Arbeitsalltag wieder?" (kein harter Link, Soft-Engagement) |
| Mi | 08:15 | 🖼️ Carousel | Document-Post „Bis zu 60.000 Gedanken am Tag – wie viele sind wirklich deine?" Sachlicher Ton, Fokus auf die für LinkedIn relevanten Slides: Stat (60.000 Gedanken, meist unbewusst), Vergleich Selbstkontrolle vs. externe Beeinflussung, die vier Schritte zurück zur bewussten Wahl (Achtsamkeit, Informationsdiät, kritisches Prüfen, Gewohnheiten) – im Begleittext auf Entscheidungssituationen im Job zugespitzt (Meetings, Priorisierung, Reaktion auf Anfragen statt Autopilot-Antwort). | Carousel-Serie `60000-gedanken` in `docs/carousels/marketing-serien.mjs` (Zeilen 29–60, `label: "Bis zu 60.000 Gedanken am Tag"`). Bild-Kacheln, falls einzelne Zitat-Slides ergänzt werden: `docs/marketing/zitate/4x5/WMDG-Zitat-0X-hell.png` (Creme-Standard) | „Speichern für die nächste Entscheidung, bei der du merkst: das war Autopilot." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Der Weg vom Autopilot zur bewussten Entscheidung beginnt nicht mit einem neuen Zeitmanagement-System, sondern mit einer Übung, die 2 Minuten dauert." Kurzer Text stellt den Autopilot-Check als niedrigschwelligen Einstieg vor (bewusst innehalten, statt zu bewerten) und verweist auf das kostenlose E-Book „Die 7 Stufen kompakt" als Vertiefung – mit Blick auf die komplette Lektion zu Stufe 1 für alle, die tiefer einsteigen wollen. | Praxis `autopilot-check` (verifiziert in `src/lib/practices.ts`, Zeilen 231–246) · Lektion `/mitglieder/stufe/1` (Route vorhanden: `src/app/mitglieder/stufe/[nr]/page.tsx`) + PDF `content/pdf/stufe-1-lektion.pdf` (verifiziert per `ls content/pdf/`) · Deep-Dive `automatische-gedanken` (`src/lib/deep-dives.ts`, Zeile 40) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Lektion 1 direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:15, minimal von 07:30 abweichend, um nicht direkt auf den Vortagsbeitrag zu stapeln – gängige Praxis für Document-Posts, die etwas später am Vormittag mehr Verweildauer bekommen), Pitch zum Wochenausklang (Do 07:45).
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do, die laut Kanal-Profil beste Zeiten für DACH-Publikum sind.
- **Kein Video-Slot**, da in dieser Woche kein YouTube-Video vorliegt (Reel-Serie „stufen" ist Instagram/Short-Format, nicht nativ für LinkedIn vorgesehen).
- **Berufsbezug durchgängig:** Team-Meetings, Führung, Priorisierung, Entscheidungsautomatismen – dieselbe Kernthese wie in den anderen Kanälen (Stufe 1 · Autopilot), aus Arbeitsperspektive übersetzt.
- **Ton:** sachlich, wertig, These zuerst (LinkedIn zeigt nur die erste Zeile in der Timeline) – kein Boulevard-Stil, keine Klickbait-Fragen ohne Substanz.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt (s. Prüfungen oben).
