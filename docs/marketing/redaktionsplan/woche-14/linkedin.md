# LinkedIn – Woche 14 · Block C · Mentale Selbstverteidigung – Reizüberflutung

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Reizüberflutung" (Zeile 88). Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 610), `src/lib/deep-dives.ts` (Zeile 1713),
> `docs/carousels/marketing-serien.mjs` und `docs/marketing/content-data.mjs`
> geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Ein Gehirn im Daueralarm trifft andere Entscheidungen als ein reguliertes – auch in Meetings." Text überträgt den Blog-Kern (zu viele gleichzeitige, wechselnde, emotional aufgeladene Reize halten das Nervensystem in Alarmbereitschaft, der präfrontale Cortex arbeitet dann schlechter) auf den Arbeitsalltag: Meeting an Meeting ohne Pause, Slack-Benachrichtigungen während der Konzentrationsarbeit, das Diensthandy, das nie ganz stumm ist. Wer in diesem Zustand eine wichtige Entscheidung trifft, denkt nachweislich enger und impulsiver – genau dann werden auch schnelle, einfache Antworten und Druckmomente von außen leichter angenommen. Schluss: die konkrete Regel aus dem Artikel, auf den Job zugespitzt – im Alarmzustand keine großen Entscheidungen treffen, sondern eine kurze reizarme Pause einlegen. | Blog `/blog/reizueberflutung-warum-dein-gehirn-nicht-abschaltet` (verifiziert in `src/lib/blog.ts`, Zeile 610–668: Zitat „Ein Gehirn im Daueralarm trifft andere Entscheidungen als ein reguliertes" Zeile 637, Abschnitt „Warum du im Alarm schlechter denkst" Zeile 640–646, Übungsliste Zeile 656–662) | Kommentar-Frage: „Wie oft triffst du wichtige Entscheidungen direkt nach einer Meeting-Kette, ohne eine einzige Minute Pause dazwischen?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Studien-Fakten" – sachlicher Ton, Fokus auf das Stat-Slide „47 %": „der Wachzeit ist unser Geist nicht bei der Sache" (Killingsworth & Gilbert, Harvard, 2010, „Science"). Im Begleittext auf ständiges Task-Switching und Dauerbeschallung im Job zugespitzt: Wer im Dauerzustand von Reizen arbeitet, verliert nicht nur Fokus, sondern ist nachweislich unzufriedener bei der Arbeit – ein Argument für bewusste, reizarme Zeitfenster im Kalender. | Carousel-Serie `studien-fakten` in `docs/carousels/marketing-serien.mjs`, Zeilen 117–146 (Stat-Slide „47 %" Zeile 122–124). Ergänzend als Sharepic: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-01-hell.png` (Text „In rund 47 % der Wachzeit ist unser Geist nicht bei der Sache – und dann unglücklicher.", `docs/marketing/content-data.mjs`, FACTS `key: "01"`, Zeile 31–32) | „Speichern für die nächste Woche voller Meetings ohne Pause dazwischen." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Ruhe ist im Job keine Zeitverschwendung – sie ist der Zustand, in dem du wieder klar denkst." Kurzer Text stellt Reizüberflutung als vierten Baustein der Reihe „Mentale Selbstverteidigung" vor und verweist auf die konkreten Übungen aus der Vertiefung (Reizquellen zählen und eine abschalten, verlängertes Ausatmen, keine großen Entscheidungen im Alarmzustand). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `reizueberflutung` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1713–1772: Abschnitt „Dein Gehirn bewertet ununterbrochen") · Route `/mitglieder/wissen/reizueberflutung` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-reizueberflutung.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Reizüberflutung & Alarmbereitschaft" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Di 07:30 Beitrag, Mi 08:00 Carousel, Do 07:45 Pitch – konsistent mit den Vorwochen.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do gemäß „fokussiert".
- **Carousel-Auswahl begründet:** `studien-fakten` liefert mit dem 47-%-Stat (Killingsworth & Gilbert) den direktesten wissenschaftlichen Beleg zum Thema Ablenkung/Reizüberflutung unter den 5 evergreenen Serien; die Serie wurde bereits in Woche 11 (Fakt 04, Framing) mit anderem Fokus genutzt – hier steht ein anderes Slide im Zentrum.
- **Berufsbezug durchgängig:** Meeting-Ketten ohne Pause, Slack/Diensthandy-Dauerbeschallung, Entscheidungen unter Zeitdruck – dieselbe Kernthese wie in den anderen Kanälen (Daueralarm verändert das Denken), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 46, Eintrag „Reizüberflutung") steht mit `filmed: false` – kein natives Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
