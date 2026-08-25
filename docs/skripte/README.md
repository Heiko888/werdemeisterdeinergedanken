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

## Willkommensvideo (Dashboard)

`willkommen/dashboard-willkommen.md` – das Intro auf der Startseite des
Mitgliederbereichs (`/mitglieder`). Empfängt neue Mitglieder, gibt Orientierung
(„Hier weitermachen", 7 Stufen, Praxis, Vertiefungen, Werkzeugkasten) und nimmt
Druck raus. Enthält Stichpunkt-Drehbuch, Wort-für-Wort-Version, On-Screen-Text
und eine 45-Sek-Kurzfassung.

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
