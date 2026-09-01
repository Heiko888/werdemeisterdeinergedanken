# LinkedIn – Woche 19 · Block C · Mentale Selbstverteidigung – Kognitive Dissonanz

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Kognitive Dissonanz" (Zeile 93). Diese Woche eröffnet die **zweite Hälfte**
> der Reihe „Mentale Selbstverteidigung" (Reel-Serie `selbstverteidigung` in
> `src/lib/reels.ts`, Zeile 42: „Kognitive Dissonanz", Hook „Warum du
> wegschaust", `filmed: false`). Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 829), `src/lib/deep-dives.ts` (Zeile 1481),
> `docs/carousels/marketing-serien.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke
> unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Wenn im Projekt-Review eine unbequeme Zahl auftaucht, wird selten die Zahl geprüft – meistens die Quelle." Text überträgt den Blog-Kern (kognitive Dissonanz: eine neue Information, die nicht zum eigenen Weltbild passt, erzeugt Unbehagen – und wir lösen die Spannung meist zur falschen Seite auf, indem wir nicht unsere Sicht, sondern die Information selbst infrage stellen) auf Arbeitssituationen: das eigene Projekt, in das schon viel Zeit und Reputation investiert wurde, wird gegen jede Kritik verteidigt statt neu bewertet; eine schlechte Kennzahl wird als „Ausreißer" abgetan, statt als Signal ernst genommen; wer eine unbequeme Rückmeldung gibt, wird schnell als „hat keine Ahnung" abgestempelt, damit man sich mit dem Inhalt nicht mehr auseinandersetzen muss. Kern: Je mehr eigene Zeit, Status oder Überzeugung in eine Entscheidung investiert wurde, desto heftiger wird sie verteidigt – gerade dann, wenn sie zu wackeln beginnt. Schluss: die Gegenfrage aus dem Artikel, auf den Job zugespitzt – „Wehre ich diese Rückmeldung ab, weil sie falsch ist, oder weil sie unbequem ist?" | Blog `/blog/warum-du-verteidigst-was-dir-schadet` (verifiziert in `src/lib/blog.ts`, Zeile 829–871: Zitat „Unbehagen ist ein Hinweis, genauer hinzuschauen – nicht wegzuschauen" Zeile 856, Abschnitt „Selektive Wahrnehmung und Abwertung" Zeile 859–864) | Kommentar-Frage: „Bei welcher eigenen Entscheidung im Job fällt es dir am schwersten, eine gegenteilige Zahl oder Rückmeldung einfach gelten zu lassen?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – sachlicher Ton, Fokus auf das Remedy-Slide „Bewusstheit gibt dir die Kontrolle zurück": „Du kannst Einflüssen nicht entkommen – aber du kannst sie durchschauen. Frag bei jeder Botschaft: Woher kommt sie? Wer profitiert? Welche Emotion soll sie auslösen?" Im Begleittext wird die Frage bewusst nach innen gewendet, auf die eigene Abwehrreaktion im Job: Nicht nur externe Botschaften prüfen, sondern die eigene erste Reaktion auf unbequeme Rückmeldung – ist es die Sache, die stört, oder das Gefühl, widerlegt zu werden? ⚠ Hinweis: Keine der 5 evergreenen Carousel-Serien behandelt kognitive Dissonanz als eigenes Slide; das Remedy-Slide zur „Bewusstheit" ist die nächstpassende reale Slide und wird hier bewusst reflexiv (auf die eigene Abwehr statt auf externe Beeinflussung) ausgelegt. | Carousel-Serie `wer-denkt-hier` in `docs/carousels/marketing-serien.mjs`, Zeilen 91–114 (Remedy-Slide Zeile 109–111) | „Speichern für das nächste Review, in dem eine unbequeme Zahl schnell abgetan wird." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Eine Meinung ändern zu können ist im Job keine Schwäche, sondern die eigentliche Führungsqualität." Kurzer Text eröffnet mit Kognitive Dissonanz die zweite Hälfte der Reihe „Mentale Selbstverteidigung" und verweist auf die konkrete Übung aus der Vertiefung („Der Unbehagen-Marker": bemerken, wenn eine Information sofort Widerstand auslöst, und innehalten, bevor man urteilt). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `kognitive-dissonanz` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1481–1536: Abschnitt „Warum wir Fehler ungern zugeben" Zeile 1493, Übung „Der Unbehagen-Marker" Zeile 1507–1514) · Route `/mitglieder/wissen/kognitive-dissonanz` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-kognitive-dissonanz.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Kognitive Dissonanz" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:00), Pitch zum Wochenausklang (Do 07:45) – identischer Rhythmus wie in Woche 11–18.
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do.
- **Carousel-Auswahl mit Abweichung:** Kognitive Dissonanz hat unter den 5 evergreenen Serien kein eigenes Slide. Das Remedy-Slide „Bewusstheit gibt dir die Kontrolle zurück" aus `wer-denkt-hier` ist die nächstpassende reale Fundstelle (kritisches Prüfen von Botschaften und Emotionen) und wurde im Begleittext bewusst auf die eigene Abwehrreaktion zugespitzt – klar als Abweichung (⚠) markiert, nichts erfunden.
- **Berufsbezug durchgängig:** Projekt-Reviews, Kennzahlen, Feedback-Kultur – dieselbe Kernthese wie in den anderen Kanälen (kognitive Dissonanz: wir verteidigen oft nicht die Wahrheit, sondern unser Selbstbild), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Die Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 42, Eintrag „Kognitive Dissonanz") ist zum Planungszeitpunkt mit `filmed: false` markiert – kein natives YouTube-Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil. Bewusst überparteilich (Dissonanz wird als allgemeiner Denkmechanismus erklärt, nicht an einem politischen Beispiel aufgehängt).
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
