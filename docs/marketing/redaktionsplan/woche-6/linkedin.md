# LinkedIn – Woche 6 · Block A · Stufe 6 „Innere Ausrichtung"

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block A, Zeile „Woche 6 –
> Stufe 6 · Innere Ausrichtung". Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 266), `src/lib/deep-dives.ts` (Zeile 659), `src/lib/practices.ts`
> (Zeile 135), `docs/carousels/marketing-serien.mjs` und
> `docs/marketing/content-data.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „„Ich müsste mich nur mehr zusammenreißen" ist selten eine Diagnose – meistens ist es ein Symptom." Text übersetzt den Blog in einen Führungs-/Selbstführungskontext: Willenskraft gilt gemeinhin als knappe Ressource, die man gegen ein tief verankertes Muster einsetzt – Prokrastination vor der unangenehmen Aufgabe, das ewige Ja zu neuen Projekten trotz voller Kapazität. Eine vielzitierte Studie zur „Ego-Depletion" (Baumeister, 1998) wurde in einer großen Replikation (Hagger, 2016) nicht bestätigt – ein Lehrstück dafür, dass reine Disziplin ein brüchiges Fundament ist. Tragfähiger ist die Frage: Welches Ziel oder welche Aufgabe passt eigentlich nicht zu meinen Werten – und deshalb kostet sie ständig Überwindung? Schluss: Wer seine Werte kennt, muss nicht mehr jede Entscheidung gegen den inneren Widerstand erzwingen. | Blog `/blog/warum-willenskraft-ueberschaetzt-wird` (verifiziert in `src/lib/blog.ts`, Zeile 266–308: Abschnitt „Muster sind schneller als Vorsätze", Zitat „Du kannst ein Muster nicht wegdrücken. Aber du kannst es durchschauen") | Kommentar-Frage: „Wo verlässt du dich im Job gerade eher auf reine Willenskraft als auf Klarheit über das eigentliche Ziel?" (Soft-Engagement, kein harter Link) |
| Mi | 08:15 | 🖼️ Carousel | Document-Post „Studien-Fakten: Was die Forschung über dein Denken weiß" – sachlicher Ton, Fokus auf das Fakt-Slide „Willenskraft ist überschätzt" (Baumeister 1998, Replikation Hagger 2016) sowie das Remedy-Slide „So liest du Studien richtig". Im Begleittext auf Team- und Organisationsführung zugespitzt: Kultur, die allein auf „mehr Disziplin" oder „mehr Einsatz" setzt, baut auf einer wissenschaftlich brüchigen Annahme auf – tragfähiger sind klare Werte, gute Umgebung und Gewohnheiten, die Reibung von vornherein reduzieren, statt sie täglich neu wegzudrücken. | Carousel-Serie `studien-fakten` in `docs/carousels/marketing-serien.mjs`, Zeilen 117–145 (Fakt-Slide „05" Zeile 137–139, Remedy-Slide Zeile 140–142). Ergänzend als Sharepic: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-05-hell.png` (Text „Willenskraft als „Muskel", der ermüdet? Eine große Replikation fand den Effekt nicht", `docs/marketing/content-data.mjs`, `FACTS`-Eintrag `key: "05"`) | „Speichern für das nächste Team-Gespräch über Motivation und Durchhaltevermögen." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Vor der nächsten großen Entscheidung: eine Hand aufs Herz, fünf Sekunden ein-, fünf Sekunden ausatmen." Kurzer Text stellt die Übung „Herz-Kohärenz" als Weg vor, Kopf und Gefühl vor wichtigen Entscheidungen oder Gesprächen in Einklang zu bringen – gerade wenn Denken, Fühlen und Handeln in unterschiedliche Richtungen ziehen, wie es bei Zielkonflikten zwischen Werten und Deadlines häufig passiert. Verweis auf das kostenlose E-Book „Die 7 Stufen kompakt" als Einstieg, mit Blick auf die vollständige Lektion zu Stufe 6 für alle, die tiefer einsteigen wollen. | Praxis `herz-kohaerenz` (verifiziert in `src/lib/practices.ts`, Zeile 135–157, `relatedStage: 6`) · Deep-Dive `werte-und-ziele` (`src/lib/deep-dives.ts`, Zeile 659–714: Abschnitt „Warum Klarheit über Werte entlastet") · Lektion `/mitglieder/stufe/6` + PDF `content/pdf/stufe-6-lektion.pdf` und Vertiefungs-PDF `content/pdf/vertiefung-werte-und-ziele.pdf` (beide per `ls content/pdf/` verifiziert) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Lektion 6 direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh (Di 07:30), Carousel Mitte der Woche (Mi 08:15), Pitch zum Wochenausklang (Do 07:45) – identisch zu den Vorwochen.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do für „fokussiert".
- **Carousel-Wiederverwendung begründet:** `studien-fakten` wird diese Woche mit Fokus auf Fakt „05" (Willenskraft) gezeigt – bisher unverwendet (Woche 3: Fakt „04", Woche 4: Fakt „02", Woche 5: Fakt „01"). Damit sind vier der fünf Fakt-Slides der Serie über die Wochen 3–6 einmal verwendet worden, ohne Doppelung.
- **Blog-Deep-Dive-Passung besonders eng:** Der Blog-Titel „Warum Willenskraft überschätzt wird" und das Fakt-Slide „Willenskraft ist überschätzt" behandeln dieselbe Studie (Baumeister/Hagger) – bewusst als thematischer Doppel-Anker für die Woche genutzt.
- **Kein Video-Slot:** Für Woche 6 liegt noch kein `docs/marketing/redaktionsplan/woche-6/youtube.md` vor; selbst wenn eines entsteht, gilt dieselbe Regel wie in den Vorwochen: ohne veröffentlichte URL kein natives Teilen auf LinkedIn.
- **Berufsbezug durchgängig:** Selbstführung ohne Ausbrennen, Teamkultur jenseits von „mehr Disziplin", Entscheidungen unter Zielkonflikten – dieselbe Kernthese wie in den anderen Kanälen (Stufe 6 · Innere Ausrichtung), aus Arbeitsperspektive übersetzt.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
