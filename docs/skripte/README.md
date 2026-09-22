# Video-Skripte – Mitgliederbereich

Sprech-Skripte / Drehbücher für alle Videos im Mitgliederbereich.
Basis: die vorhandenen Lektions-Inhalte (`src/lib/stage-lessons.ts`,
`src/lib/deep-dives.ts`, `src/lib/practices.ts`) – so passen Video und Website
inhaltlich zusammen.

## Format-Konventionen

| Bereich | Skript-Typ | Länge |
|---|---|---|
| **Willkommen (Dashboard)** | Stichpunkt-Drehbuch **+ Wort-für-Wort** (`willkommen/`) | 2–3 Min |
| **7 Stufen** | Stichpunkt-Drehbuch (`stufen/`) **+ Wort-für-Wort komplett** (`stufen-komplett/`) | 6–10 Min |
| **Vertiefungen** | Stichpunkt-Drehbuch (`vertiefungen/`) **+ Wort-für-Wort komplett** (`vertiefungen-komplett/`) | 3–5 Min |
| **Praxis (Meditation/Atem/Ritual)** | Wort-für-Wort (zum Einsprechen) | nach Übungsdauer |

**Legende in den Skripten:**
- `[Regie]` – Hinweis zu Tempo, Ton, Bild, Pause (nicht sprechen)
- `→` – Kernaussage / Talking Point (frei ausformulieren)
- **Fett** – der eine Satz, der genau so fallen sollte (Hook, Leitsatz)
- Bei Praxis: `…` = bewusste Sprechpause, kursiv = Regieton (leise, langsam)

## Schnellübersicht: Wo liegt welches Skript? (Stand 2026-09-22)

**Fertige PDFs (zum Drehen / Teleprompter):**

| Was | Datei |
|---|---|
| Lange Videos – Wort für Wort (7 Stufen, Praxis, Vertiefungen, Mentale Selbstverteidigung) | `docs/workshop/video-drehbuecher/WMDG-Video-Drehbuch-Ablesen.pdf` |
| Lange Videos – Stichpunkte (frei sprechen) | `docs/workshop/video-drehbuecher/WMDG-Video-Drehbuch-Stichpunkt.pdf` |
| Intro-Video Startseite + Teaser-Reel | `docs/workshop/video-drehbuecher/WMDG-Video-Drehbuch-Intro.pdf` |
| Willkommensvideo Mitglieder-Dashboard | `docs/skripte/willkommen/Willkommensvideo-Dashboard.pdf` |
| Alle Reels (97 Stück, alle Serien) | `docs/workshop/reel-skripte/WMDG-Reel-Drehbuch-Alle-Serien.pdf` |
| Reels je Serie | `docs/workshop/reel-skripte/WMDG-Reel-Drehbuch-<Serie>.pdf` |
| Praxis mit Stimme (13 Übungen) | `docs/mitglieder/sprecherskripte/WMDG-Praxis-mit-Stimme-Gesamtmappe.pdf` (+ `einzel/`) |

**Dieselben Inhalte als Markdown:** `videoskripte/` (Bündel, siehe unten) sowie
die Einzel-Quellen in `stufen/`, `stufen-komplett/`, `vertiefungen/`,
`vertiefungen-komplett/`, `praxis/`, `reels/`, `landing/`, `willkommen/`,
`carousels/`, `wissenschaft/`.

**Für den Elgato Prompter (reine .txt, ein Video pro Datei):** `elgato/` –
148 Dateien (Intro, Willkommen, 7 Stufen, Vertiefungen, Mentale
Selbstverteidigung, Praxis, 96 Reels) plus alles als `elgato/WMDG-Elgato-Skripte.zip`.
Ohne Regie-Hinweise und Formatierung; Pausen-Marker in der Praxis bleiben.
Details in `elgato/LIESMICH.txt`.

**Aktualisieren nach Änderung einer Quelle:**
`npm run videoskripte-md` · `npm run reel-drehbuch` · `npm run langvideo-drehbuch` · `npm run elgato-txt`

## Willkommensvideo (Dashboard)

`willkommen/dashboard-willkommen.md` – das Intro auf der Startseite des
Mitgliederbereichs (`/mitglieder`). Empfängt neue Mitglieder, gibt Orientierung
(„Hier weitermachen", 7 Stufen, Praxis, Vertiefungen, Werkzeugkasten) und nimmt
Druck raus. Enthält Stichpunkt-Drehbuch, Wort-für-Wort-Version, On-Screen-Text
und eine 45-Sek-Kurzfassung.

Gebrandete **PDF** (zum Ausdrucken / Teleprompter):
`willkommen/Willkommensvideo-Dashboard.pdf` – erzeugt mit `npm run
willkommen-skript` (Generator: `tools/pdf/willkommen-skript.mjs`, Text 1:1 aus
der Markdown-Fassung). Optik wie die Praxis-Sprecherskripte.

## Alle Videoskripte gebündelt als Markdown (`videoskripte/`)

Für jedes Video-**PDF** gibt es zusätzlich **eine** zusammenhängende
Markdown-Datei – inhaltsgleich zum PDF, aber in einer Datei les- und editierbar.
So hast du jederzeit den aktuellen Stand jedes Video-Drehbuchs auf einen Blick.

| Bündel (Markdown) | Entspricht PDF | Inhalt |
|---|---|---|
| `videoskripte/landing-intro-drehbuch.md` | `WMDG-Video-Drehbuch-Intro.pdf` | Intro-Video + Teaser-Reel („Nicht deine Schuld") |
| `videoskripte/langvideo-ablesen.md` | `WMDG-Video-Drehbuch-Ablesen.pdf` | Wort-für-Wort: 7 Stufen (komplett) · Praxis · Vertiefungen · Mentale Selbstverteidigung |
| `videoskripte/langvideo-stichpunkt.md` | `WMDG-Video-Drehbuch-Stichpunkt.pdf` | Stichpunkt: 7 Stufen · Vertiefungen · Mentale Selbstverteidigung |
| `willkommen/dashboard-willkommen.md` | `Willkommensvideo-Dashboard.pdf` | Willkommensvideo (liegt schon als eigene Markdown-Quelle vor) |
| `videoskripte/reels-alle-serien.md` | `WMDG-Reel-Drehbuch-Alle-Serien.pdf` | Alle Reel-Serien gebündelt: 7 Stufen · Praxis · Vertiefungen · Mentale Selbstverteidigung · Wissenschaft |

Die **einzelnen** Reel-Serien liegen bereits je als eine Markdown-Datei in
`reels/` vor (= die Einzel-Serien-PDFs) – gebündelt gibt es sie zusätzlich in
`videoskripte/reels-alle-serien.md`.

Die Bündel werden **automatisch** aus den Einzel-Skripten erzeugt (gleiche
Quellen und Reihenfolge wie die PDF-Generatoren), damit Markdown und PDF nie
auseinanderlaufen:

```
npm run videoskripte-md      # oder: node tools/pdf/videoskripte-markdown.mjs
```

Generator: `tools/pdf/videoskripte-markdown.mjs`. Die Bündel nicht von Hand
bearbeiten – stattdessen die jeweilige Einzel-Quelle ändern (als
`<!-- Quelle: … -->`-Kommentar über jedem Abschnitt vermerkt) und neu erzeugen.

## Themenblock „Mentale Selbstverteidigung" (16 Themen)

Video-Skripte zum Block „Wie dein Denken gelenkt wird":
- `vertiefungen/mentale-selbstverteidigung-drehbuecher.md` – 16 Stichpunkt-Drehbücher (frei sprechen, 3–5 Min)
- `vertiefungen-komplett/mentale-selbstverteidigung-komplett.md` – 16 komplette Wort-für-Wort-Skripte
- `reels/mentale-selbstverteidigung.md` – 16 Kurz-Reels
- Blog & E-Book: siehe `src/lib/blog.ts` bzw. `docs/ebook/`

## Reels (Social)

`reels/mentale-selbstverteidigung.md` – 16 Kurz-Skripte (30–45 Sek) zum
Themenblock „Wie dein Denken gelenkt wird", je mit Hook, Skript, On-Screen-Text
und CTA.

## Drehreihenfolge (Empfehlung)

1. **7 Stufen** – Kernprodukt, jeder durchläuft sie → `stufen/`
2. **Praxis-Meditationen** – schnell als MP3 einsprechbar → `praxis/`
3. **Vertiefungen** – nach und nach → `vertiefungen/`

## Status

### Willkommen (Aufnahme = Video online; Skript ✍️ = Sprechtext liegt vor)
- [ ] Dashboard-Willkommen ✍️

### Stufen (Aufnahme = Video online; Skript ✍️ = Sprechtext liegt vor)
- [ ] 01 – Autopilot ✍️
- [ ] 02 – Erwachen ✍️
- [ ] 03 – Selbstbeobachtung ✍️
- [ ] 04 – Emotionale Reifung ✍️
- [ ] 05 – Schöpferkraft ✍️
- [ ] 06 – Innere Ausrichtung ✍️
- [ ] 07 – Meisterschaft ✍️

### Praxis (Aufnahme = Video/MP3 online; Skript ✍️ = Sprechtext liegt vor)
- [x] Atembeobachtung *(Video bereits online)*
- [ ] Der innere Beobachter ✍️
- [ ] Body-Scan ✍️
- [ ] Herz-Kohärenz ✍️
- [ ] Verlängertes Ausatmen ✍️
- [ ] 4-6-Atmung ✍️
- [ ] Box Breathing ✍️
- [ ] Der Autopilot-Check ✍️
- [ ] Morgen-Ausrichtung ✍️
- [ ] Abend-Reflexion ✍️
- [ ] Loslass-Ritual ✍️
- [ ] Präsenz-Spaziergang ✍️
- [ ] Die tägliche Rückkehr ✍️

### Vertiefungen (Aufnahme = Video online; Skript ✍️ = Sprechtext liegt vor)
- [ ] Automatische Gedanken ✍️
- [ ] Konditionierung ✍️
- [ ] Kognitive Verzerrungen ✍️
- [ ] Kernüberzeugungen ✍️
- [ ] Der innere Kritiker ✍️
- [ ] Neuroplastizität ✍️
- [ ] Die Reiz-Reaktions-Lücke ✍️
- [ ] Grübeln & Gedankenkreisen ✍️
- [ ] Emotionsregulation ✍️
- [ ] Selbstmitgefühl ✍️
- [ ] Werte & Ziele ✍️
- [ ] Muster, Körper & Gesundheit ✍️
- [ ] Integration & Weitergabe ✍️

## Wenn ein Video/Audio fertig ist

YouTube-ID (Teil hinter `youtu.be/…`) **oder** MP3-Datei + Thema an Claude geben
→ wird an der richtigen Stelle im Code eingetragen (`video`- bzw. `audio`-Feld)
und gepusht.
