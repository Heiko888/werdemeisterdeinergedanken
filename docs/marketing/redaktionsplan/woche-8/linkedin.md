# LinkedIn – Woche 8 · Block B · Atmung & Nervensystem

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block B, Zeile „Atmung &
> Nervensystem" (Zeile 74). Block B ist **themenbasiert**, nicht mehr an eine
> der 7 Stufen gekoppelt wie Block A (Wochen 1–7) – Praxis- und Deep-Dive-Slugs
> tragen deshalb unterschiedliche `relatedStage`-Werte, s. Hinweise unten.
>
> Alle Slugs/Pfade gegen `src/lib/blog.ts` (Zeile 1091), `src/lib/deep-dives.ts`
> (Zeile 533), `src/lib/practices.ts` (Zeilen 63, 184, 207),
> `docs/carousels/marketing-serien.mjs` und `docs/marketing/content-data.mjs`
> geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Der Kollege schickt eine scharfe Nachricht im Team-Chat – und bevor du antwortest, entscheidet sich in deinem Nervensystem mehr, als dir bewusst ist." Text überträgt die UCLA-Studie zum „Affect Labeling" (Benennen von Gefühlen senkt messbar die Amygdala-Aktivität) in den Arbeitsalltag: Statt eine scharfe Antwort im Affekt abzuschicken, hilft es nachweislich, das Gefühl kurz innerlich zu benennen („Das ist Ärger", „Das ist Druck") – nicht als Wohlfühl-Trick, sondern als beforschter Hebel, der dem präfrontalen Kortex die Führung zurückgibt. Schluss: die „90-Sekunden"-Faustregel (Jill Bolte Taylor) als bürotaugliches Werkzeug – die erste körperliche Welle einer Emotion ist kürzer, als sie sich anfühlt; wer sie abwartet, statt sofort zu reagieren, trifft die klarere Entscheidung. | Blog `/blog/gefuehle-benennen-beruhigt-das-gehirn` (verifiziert in `src/lib/blog.ts`, Zeile 1091–1141: Abschnitt „Die Studie: Feelings into Words" Zeile 1109–1123, Abschnitt „Und die 90 Sekunden?" Zeile 1125–1131) | Kommentar-Frage: „Welches Wort hilft dir am meisten, wenn du merkst, dass gerade eine starke Reaktion in dir hochkommt?" (Soft-Engagement, kein harter Link) |
| Mi | 08:15 | 🖼️ Carousel | Document-Post „Studien-Fakten: Was die Forschung über dein Denken weiß" – sachlicher Ton, Fokus auf das Fakt-Slide „Ein Gefühl zu benennen beruhigt" (Lieberman, UCLA 2007) – identischer Fakt wie im Dienstags-Beitrag, hier als eigenständige, teilbare Grafik. Im Begleittext auf Konflikt- und Feedback-Gespräche im Job zugespitzt: Wer im hitzigen Moment das Gefühl benennt, statt es zu unterdrücken oder auszuagieren, gibt nachweislich dem überlegten Denken die Führung zurück – eine der wenigen „soft skills", die sich per Hirnscan belegen lassen. | Carousel-Serie `studien-fakten` in `docs/carousels/marketing-serien.mjs`, Zeilen 117–145 (Fakt-Slide „02" Zeile 128–130). Ergänzend als Sharepic: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-02-hell.png` (Text „Ein Gefühl zu benennen dämpft die Amygdala – die Alarmzentrale des Gehirns", `docs/marketing/content-data.mjs`, `FACTS`-Eintrag `key: "02"`, Zeile 33) | „Speichern für das nächste hitzige Gespräch, in dem du merkst, wie ein Gefühl hochkommt." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Die schnellste Intervention gegen einen überreizten Kopf vor dem nächsten Call dauert drei Atemzüge." Kurzer Text stellt ein kleines Atem-Werkzeugset für den Job vor: die Atembeobachtung als tägliche Grundübung, die die Fähigkeit überhaupt erst aufbaut; die 4-6-Atmung als unauffälliges Akutmittel direkt vor einem schwierigen Anruf oder in der Warteschlange vorm Meeting; Box Breathing als das Werkzeug für Situationen mit hohem Einsatz – dieselbe Technik, die in Hochdruck-Berufen genutzt wird, passt vor eine wichtige Präsentation oder ein kritisches Kundengespräch. Eingeordnet über den Deep-Dive-Abschnitt „Den Körper als Hebel nutzen": Der Körper reguliert schneller als jedes Argument. | Praxis `atembeobachtung` (verifiziert in `src/lib/practices.ts`, Zeile 63–85, `relatedStage: 2`), `vier-sechs-atmung` (Zeile 184–205, `relatedStage: 4`), `box-breathing` (Zeile 207–227, `relatedStage: 6`) · Deep-Dive `emotionsregulation` (`src/lib/deep-dives.ts`, Zeile 533–592: Abschnitt „Den Körper als Hebel nutzen" Zeile 553–556) · Vertiefungs-PDF `content/pdf/vertiefung-emotionsregulation.pdf` (per `ls content/pdf/` verifiziert) · Praxis-Seiten `/mitglieder/praxis/atembeobachtung`, `/mitglieder/praxis/vier-sechs-atmung`, `/mitglieder/praxis/box-breathing` (Route `src/app/mitglieder/praxis/[slug]/page.tsx`, per `getPractice(slug)` verifiziert) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Alle Atemübungen + Vertiefung in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:15), Pitch zum Wochenausklang (Do 07:45) – identischer Rhythmus wie Block A.
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do.
- **Block B ist themenbasiert, nicht stufenbasiert:** Anders als in Block A tragen die drei hier verwendeten Praxis-Slugs unterschiedliche `relatedStage`-Werte (`atembeobachtung` = 2, `vier-sechs-atmung` = 4, `box-breathing` = 6) und der Deep-Dive `emotionsregulation` trägt `relatedStage: 4`. Es wird deshalb bewusst **kein** einzelner `/mitglieder/stufe/N`-Lektionslink gesetzt (das würde eine falsche 1:1-Zuordnung suggerieren), sondern auf die einzelnen Praxis-Seiten und die passende Wissens-Vertiefung verwiesen. Diese Abweichung vom Block-A-Muster gilt für den gesamten Block B (Wochen 8–10) und wird hiermit an die Redaktionsleitung zurückgemeldet.
- **Carousel-Auswahl begründet:** `docs/carousels/marketing-serien.mjs` enthält weiterhin nur 5 evergreene Serien. `studien-fakten` passt inhaltlich am besten, weil ihr Fakt-Slide „02" wortgleich die im Blog zitierte UCLA-Studie abbildet – dieselbe Quelle wie im Dienstags-Beitrag, hier bewusst als eigenständige Grafik wiederverwendet (die Serie wurde bereits in den Wochen 3–6 mit anderen Fakten genutzt, s. dortige Wochen-Dateien).
- **Kein Video-Slot:** Für Woche 8 liegt kein `docs/marketing/redaktionsplan/woche-8/youtube.md` mit veröffentlichter URL vor – ohne natives Video kein Video-Slot auf LinkedIn.
- **Berufsbezug durchgängig:** Team-Chat-Reaktionen, Konflikt-/Feedback-Gespräche, Anrufe und Präsentationen unter Druck – dieselbe Kernthese wie in den anderen Kanälen (Atmung & Nervensystem), aus Arbeitsperspektive übersetzt.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
