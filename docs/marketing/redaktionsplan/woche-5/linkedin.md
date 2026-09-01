# LinkedIn – Woche 5 · Block A · Stufe 5 „Schöpferkraft"

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block A, Zeile „Woche 5 –
> Stufe 5 · Schöpferkraft". Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 1031), `src/lib/deep-dives.ts` (Zeile 343), `src/lib/practices.ts`
> (Zeile 254), `docs/carousels/marketing-serien.mjs` und
> `docs/marketing/content-data.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Dein Kommunikationsstil unter Druck ist kein Charakterzug – es ist eine ausgebaute Straße im Kopf, die du selbst gebaut hast." Text übersetzt Neuroplastizität in einen Führungs-/Karrierekontext: Wer bei Konflikten immer gleich reagiert (ausweichen, sofort verteidigen, überkorrekt sein), hält das oft für „einfach seine Art". Die Forschung (Maguire, Londoner Taxifahrer, 2000; Draganski, Jonglieren, „Nature" 2004) zeigt: Wiederholtes Verhalten formt messbar die Gehirnstruktur – und was nicht mehr genutzt wird, bildet sich zurück. Übertragen auf den Job heißt das: Eine neue Gesprächsgewohnheit (z. B. erst eine Frage stellen, bevor man widerspricht) ist keine Charaktheränderung, sondern eine neue, bewusst gebaute Bahn – die mit jeder Wiederholung leichter befahrbar wird. Schluss: Kein Muster ist endgültig, aber Veränderung entsteht durch kleine, häufige Wiederholung – nicht durch einmalige Vorsätze. | Blog `/blog/neuroplastizitaet-warum-dein-gehirn-formbar-ist` (verifiziert in `src/lib/blog.ts`, Zeile 1031–1089: Abschnitt „Was zusammen feuert, verdrahtet sich", Maguire 2000, Draganski 2004) | Kommentar-Frage: „Welche berufliche Reaktions-Gewohnheit würdest du gern umbauen, wenn du wüsstest, dass sie wirklich veränderbar ist?" (Soft-Engagement, kein harter Link) |
| Mi | 08:15 | 🖼️ Carousel | Document-Post „Studien-Fakten: Was die Forschung über dein Denken weiß" – sachlicher Ton, Fokus auf das Fakt-Slide „Dein Gehirn bleibt formbar" (Maguire 2000, Draganski 2004). Im Begleittext auf gezieltes Kompetenz-/Skilltraining im Job zugespitzt: Neue Fähigkeiten entstehen nicht durch einmalige Seminare, sondern durch kurze, regelmäßige und bewusste Wiederholung – dieselbe Logik, mit der Taxifahrer ihren Hippocampus vergrößern oder Jongleure in drei Monaten mehr graue Substanz aufbauen. | Carousel-Serie `studien-fakten` in `docs/carousels/marketing-serien.mjs`, Zeilen 117–145 (Fakt-Slide „01" Zeile 125–127). Ergänzend als Sharepic: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-06-hell.png` (Text „Dein Gehirn bleibt formbar – ein Leben lang", `docs/marketing/content-data.mjs`, `FACTS`-Eintrag `key: "06"` – inhaltlich derselbe Fakt wie im Carousel-Slide „01", nur andere Nummerierung im Sharepic-Ordner) | „Speichern als Erinnerung für die nächste neue Gewohnheit, die du aufbauen willst." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Die ersten fünf Minuten deines Arbeitstages entscheiden mehr über deinen Fokus als die nächsten fünf Stunden." Kurzer Text stellt die Übung „Morgen-Ausrichtung" als bewussten Gegenentwurf zum sofortigen Griff zum Handy/E-Mail-Postfach vor – eine kurze, bewusste Ausrichtung („Wie will ich diesem Tag begegnen?") verhindert, dass der Autopilot von der ersten Minute an übernimmt. Verweis auf das kostenlose E-Book „Die 7 Stufen kompakt" als Einstieg, mit Blick auf die vollständige Lektion zu Stufe 5 für alle, die tiefer einsteigen wollen. | Praxis `morgen-ausrichtung` (verifiziert in `src/lib/practices.ts`, Zeile 254–274, `relatedStage: 5`) · Deep-Dive `neuroplastizitaet` (`src/lib/deep-dives.ts`, Zeile 343–366: Abschnitt „Warum Wiederholung und Gefühl zählen") · Lektion `/mitglieder/stufe/5` + PDF `content/pdf/stufe-5-lektion.pdf` und Vertiefungs-PDF `content/pdf/vertiefung-neuroplastizitaet.pdf` (beide per `ls content/pdf/` verifiziert) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Lektion 5 direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh (Di 07:30), Carousel Mitte der Woche (Mi 08:15), Pitch zum Wochenausklang (Do 07:45) – identisch zu den Vorwochen.
- **Kein Freitag/Wochenende belegt** – drei Slots Di–Do für „fokussiert".
- **Carousel-Wiederverwendung begründet:** `studien-fakten` wird diese Woche mit Fokus auf Fakt „01" (Neuroplastizität) gezeigt – bisher unverwendet (Woche 3: Fakt „04", Woche 4: Fakt „02"). Keine Überschneidung der zitierten Slides zwischen den Wochen.
- **Nummerierungs-Hinweis:** Die interne Slide-Nummer im Carousel (`n: "01"`) und die Nummer der einzelnen Sharepic-Kachel (`WMDG-Studienfakt-06`) stimmen nicht überein, da beide Dateien unabhängig voneinander nummeriert sind (`marketing-serien.mjs` vs. `content-data.mjs`/`zitate/studien-4x5/`). Inhaltlich decken sich beide exakt (Maguire/Draganski, Neuroplastizität) – geprüft per `rg`.
- **Kein Video-Slot:** Für Woche 5 liegt noch kein `docs/marketing/redaktionsplan/woche-5/youtube.md` vor; selbst wenn eines entsteht, gilt dieselbe Regel wie in den Vorwochen: ohne veröffentlichte URL kein natives Teilen auf LinkedIn.
- **Berufsbezug durchgängig:** Kommunikationsgewohnheiten unter Druck, gezieltes Kompetenztraining, bewusster Start in den Arbeitstag – dieselbe Kernthese wie in den anderen Kanälen (Stufe 5 · Schöpferkraft), aus Arbeitsperspektive übersetzt.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil.
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
