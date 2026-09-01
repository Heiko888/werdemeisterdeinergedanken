# LinkedIn – Woche 18 · Block C · Mentale Selbstverteidigung – Propaganda

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Propaganda" (Zeile 92). Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 671), `src/lib/deep-dives.ts` (Zeile 843),
> `docs/carousels/marketing-serien.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke
> unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Die wirksamste Beeinflussung im Change-Prozess kommt selten als laute Parole – sie arbeitet leise, über Wiederholung, Emotion und Vereinfachung." Text überträgt den Blog-Kern (drei Hebel wirken fast immer zusammen: Wiederholung macht vertraut, Emotion schaltet das Prüfen aus, Vereinfachung reduziert auf Gut gegen Böse – keiner dieser Hebel braucht eine Lüge) auf interne Unternehmenskommunikation: Restrukturierungs-Narrative, die in jeder Town-Hall wiederholt werden, bis sie unhinterfragt gelten; das gemeinsame Feindbild „der Wettbewerb" oder „die alte Führung", das ein Team schnell einschwört; Zustimmung zur offiziellen Linie, die zum Zeichen von Loyalität wird und Zweifel zum Risiko macht. Kern: Man kann mit wahren Einzelfakten ein verzerrtes Bild erzeugen – allein durch Auswahl und Betonung. Schluss: die nüchterne Gegenfrage aus dem Artikel – wie würde die nüchternste, sachlichste Version derselben Botschaft klingen? | Blog `/blog/propaganda-erkennst-du-nicht-an-lauten-parolen` (verifiziert in `src/lib/blog.ts`, Zeile 671–726: Abschnitt „Drei Hebel, keine Lüge" Zeile 689–695, Zitat „Nichts bindet eine Gruppe so schnell wie ein gemeinsamer Gegner" Zeile 698, Übungsliste Zeile 713–719) | Kommentar-Frage: „Welche interne Botschaft wird in deinem Unternehmen so oft wiederholt, dass sie kaum noch jemand hinterfragt?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Bis zu 60.000 Gedanken am Tag" – sachlicher Ton, Fokus auf das Compare-Slide „Gedankenkontrolle": Gegenüberstellung „Selbstkontrolle" vs. „Manipulation von außen – gezielte Beeinflussung durch Werbung, Propaganda oder psychologische Techniken" (nennt den Begriff „Propaganda" wörtlich). Im Begleittext auf interne Kommunikationskampagnen und Change-Narrative im Job zugespitzt: Wer die drei Hebel (Wiederholung, Emotion, Vereinfachung) kennt, erkennt sie auch in der eigenen Firmenkommunikation. | Carousel-Serie `60000-gedanken` in `docs/carousels/marketing-serien.mjs`, Zeilen 28–59 (Compare-Slide „Gedankenkontrolle" Zeile 37–41, Karte „Manipulation von außen") | „Speichern für die nächste Town-Hall mit einem sehr eingängigen Narrativ." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Wer die drei Hebel Wiederholung, Emotion und Vereinfachung kennt, wird schwerer steuerbar – privat wie beruflich." Kurzer Text stellt Propaganda & Konditionierung als achten und letzten Baustein der Reihe „Mentale Selbstverteidigung" vor und fasst den bisherigen Themenblock (Framing, Filterblase, Wiederholung, Reizüberflutung, Werbung, Gruppendruck, Autorität, Propaganda) kompakt zusammen. Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `propaganda` (verifiziert in `src/lib/deep-dives.ts`, Zeile 843–898: Abschnitt „Warum wir Ungeprüftes verteidigen", Übung „Der Herkunfts-Check" ab Zeile 868) · Route `/mitglieder/wissen/propaganda` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-propaganda.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Propaganda & Konditionierung" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Di 07:30 Beitrag, Mi 08:00 Carousel, Do 07:45 Pitch – konsistent mit den Vorwochen; Abschluss des Blocks „Mentale Selbstverteidigung" (Woche 11–18).
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do gemäß „fokussiert".
- **Carousel-Auswahl begründet:** `60000-gedanken` ist die einzige der 5 evergreenen Serien, die den Begriff „Propaganda" wörtlich in einem Slide nennt (Compare-Karte „Manipulation von außen"). Die Serie wurde bereits in Woche 13 (Stat-Slide) und Woche 16 (List-Slide) mit anderem Fokus genutzt – hier steht das Compare-Slide im Zentrum, um Redundanz zu vermeiden.
- **Berufsbezug durchgängig:** interne Change-Kommunikation, Town-Halls, Feindbild-Narrative im Team – dieselbe Kernthese wie in den anderen Kanälen (drei Hebel ohne eine einzige Lüge), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 31, Eintrag „Propaganda") steht mit `filmed: false` – kein natives Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil; bewusst überparteilich, Mechanismus statt politisches Beispiel (vgl. Kommentar in `src/lib/deep-dives.ts`, Zeile 840: „Ton bewusst überparteilich").
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
