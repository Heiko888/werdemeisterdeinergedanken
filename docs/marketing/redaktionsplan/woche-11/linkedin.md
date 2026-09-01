# LinkedIn – Woche 11 · Block C · Mentale Selbstverteidigung – Framing

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile „Framing"
> (Zeile 85). Alle Slugs/Pfade gegen `src/lib/blog.ts` (Zeile 423),
> `src/lib/deep-dives.ts` (Zeile 901), `docs/carousels/marketing-serien.mjs`
> und `docs/marketing/content-data.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke
> unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Bevor im Meeting ein einziges Argument fällt, hat oft schon ein Wort entschieden, wie es ankommt." Text überträgt den Blog-Kern (derselbe Sachverhalt wirkt je nach Wortwahl völlig anders) in typische Arbeitssituationen: „Wir investieren in die Umstrukturierung" vs. „Wir geben dafür Geld aus" im Budget-Meeting; „Freistellung" vs. „Kündigung" in der HR-Kommunikation; ob ein Kollege in der Retro als „gründlich" oder als „Bedenkenträger" bezeichnet wird, entscheidet über die Reaktion der Runde, bevor ein Argument geprüft ist. Kern: Der Rahmen liefert die Bewertung gleich mit – die Fakten müssen dafür nicht falsch sein. Schluss: die schärfste der Frame-Fragen aus dem Artikel, zugespitzt auf den Job: „Wer profitiert davon, dass genau dieser Begriff im Protokoll steht?" | Blog `/blog/framing-wie-ein-wort-deine-meinung-macht` (verifiziert in `src/lib/blog.ts`, Zeile 423–485: Beispiel „investiert“/„gibt aus“ Zeile 446, Zitat „Ein Wort kann aus einer Kürzung eine Reform … machen" Zeile 450, Frame-Fragen-Liste Zeile 473–479) | Kommentar-Frage: „In welchem Meeting hast du zuletzt gemerkt, dass ein Wort schon die Zustimmung vorwegnahm, bevor überhaupt ein Argument kam?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Studien-Fakten" – sachlicher Ton, Fokus auf Fakt 04 „Dein Kopf verzerrt – systematisch" (Tversky & Kahneman, 1974): Was leicht einfällt, halten wir für häufig; die zuerst genannte Zahl färbt jedes weitere Urteil. Im Begleittext auf Verhandlungs- und Budgetsituationen zugespitzt: Die zuerst genannte Summe in einer Gehalts- oder Preisverhandlung wirkt als Anker, unabhängig davon, wie realistisch sie ist – wer das kennt, lässt sich seltener über den Anker führen. | Carousel-Serie `studien-fakten` in `docs/carousels/marketing-serien.mjs`, Zeilen 117–146 (Fakt 04 „Dein Kopf verzerrt – systematisch" Zeile 134–136). Ergänzend als Sharepic: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-04-hell.png` (Text „Wir liegen nicht zufällig daneben – sondern vorhersehbar.", Quelle Tversky & Kahneman 1974, `docs/marketing/content-data.mjs`, FACTS `key: "04"`, Zeile 37–38) | „Speichern für die nächste Verhandlung, in der zuerst eine Zahl fällt." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Mentale Selbstverteidigung im Job beginnt nicht mit Misstrauen – sondern mit der Frage, welchen Rahmen ein Satz dir gerade mitliefert." Kurzer Text stellt Framing als ersten Baustein der Reihe „Mentale Selbstverteidigung" vor und verweist auf die ausführliche Vertiefung mit den acht Frame-Fragen und Übungen für den Alltag (u. a. Meetings, Vertragsverhandlungen, interne Kommunikation). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `framing` (verifiziert in `src/lib/deep-dives.ts`, Zeile 901–956: Abschnitt „Gewinn, Verlust und Moral", Übung „Die Umformulierungs-Probe") · Route `/mitglieder/wissen/framing` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-framing.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Framing" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:00), Pitch zum Wochenausklang (Do 07:45) – identischer Rhythmus wie in Woche 1–2.
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do.
- **Carousel-Auswahl begründet:** Die Serie `studien-fakten` liefert mit Fakt 04 (Anchoring-Effekt) die einzige Slide unter den 5 evergreenen Serien, die wissenschaftlich exakt zum Kernmechanismus von Framing passt (die erste Zahl/das erste Wort setzt den Rahmen). Die passgenaue Ergänzung ist der Standalone-Sharepic `WMDG-Studienfakt-04-hell.png`, der wortgleich dieselbe Studie zitiert.
- **Berufsbezug durchgängig:** Budget-Meetings, Restrukturierungs-Kommunikation, Gehalts-/Vertragsverhandlungen – dieselbe Kernthese wie in den anderen Kanälen (Framing: „Der Rahmen liefert die Bewertung gleich mit"), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Die Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 27–47, Eintrag „Framing") ist zum Planungszeitpunkt mit `filmed: false` markiert – kein natives YouTube-Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil. Bewusst überparteilich (Framing wird als Mechanismus erklärt, nicht an einem politischen Beispiel aufgehängt).
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
