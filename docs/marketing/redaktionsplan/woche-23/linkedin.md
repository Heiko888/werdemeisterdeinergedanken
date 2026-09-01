# LinkedIn – Woche 23 · Block C · Mentale Selbstverteidigung – Angst-Steuerung

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Angst-Steuerung" (Zeile 97). Reel-Serie `selbstverteidigung` in
> `src/lib/reels.ts`, Zeile 39: „Angst-Steuerung", Hook „Angst macht dich
> lenkbar", `filmed: false`. Alle Slugs/Pfade gegen `src/lib/blog.ts`
> (Zeile 1481), `src/lib/deep-dives.ts` (Zeile 1307),
> `docs/carousels/marketing-serien.mjs` und `docs/marketing/content-data.mjs`
> geprüft (`rg`/`ls`, s. Prüfvermerke unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Eine Belegschaft in Dauerangst um den Arbeitsplatz denkt eng, schnell und schwarz-weiß – genau dann ist sie am leichtesten zu lenken." Text überträgt den Blog-Kern (Angst verengt den Blick, schaltet das ruhige Denken ab; wer eine Bedrohung groß macht und dann eine Rettung anbietet, hält die Entscheidung in der Hand) auf Führungssituationen: Umstrukturierungen, die mit diffuser Sorge um „den Standort" kommuniziert werden, statt mit konkreten Fakten; das Muster „Nur wenn wir jetzt alle mitziehen, bleiben die Jobs sicher", das kaum noch geprüft, sondern nur noch befolgt wird; Verhandlungen, in denen künstlicher Zeitdruck und angedeutete Konsequenzen das ruhige Abwägen der Gegenseite gezielt aushebeln sollen. Kern: Der Körper unterscheidet nicht zwischen echter Gefahr und aufgebauschter Schlagzeile – er reagiert auf die Bewertung, nicht auf die Realität. Schluss: die konkrete Regel aus dem Artikel, auf den Job zugespitzt – im Angst-Modus keine großen Entscheidungen unterschreiben, sondern erst fragen, wie wahrscheinlich die Bedrohung wirklich ist. | Blog `/blog/angst-steuerung-warum-angst-dich-lenkbar-macht` (verifiziert in `src/lib/blog.ts`, Zeile 1481–1544: Zitat „Wer deine Angst kontrolliert, muss deine Meinung nicht mehr überzeugen" Zeile 1515–1516, Abschnitt „Wer Angst macht, macht lenkbar" Zeile 1507–1512, Übungsliste Zeile 1531–1537) | Kommentar-Frage: „Bei welcher beruflichen Entscheidung hast du zuletzt gemerkt, dass dir zuerst Angst gemacht und danach die einzige Lösung gleich mitgeliefert wurde?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – sachlicher Ton, Fokus auf das List-Slide „So erkennst du Beeinflussung", Punkt „Starke Emotion": „Angst oder Empörung schalten dein kritisches Denken aus." Im Begleittext auf Change-Kommunikation und Verhandlungsdruck im Job zugespitzt, ergänzt um den wissenschaftlichen Hintergrund, warum das Benennen der eigenen Anspannung bereits beruhigt. | Carousel-Serie `wer-denkt-hier` in `docs/carousels/marketing-serien.mjs`, Zeilen 91–114 (List-Slide „So erkennst du Beeinflussung" Zeile 103–108, Punkt „Starke Emotion" Zeile 104–105). Ergänzend als Sharepic – die präziseste Entsprechung des Wochenthemas: `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-02-hell.png` (Text „Ein Gefühl zu benennen dämpft die Amygdala – die Alarmzentrale des Gehirns.", Quelle Lieberman et al., UCLA, 2007, „Affect Labeling", `docs/marketing/content-data.mjs`, FACTS `key: "02"`, Zeile 33–34) | „Speichern für die nächste Nachricht, die dich sofort in Alarm versetzt." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Angst lässt sich nicht abschalten – aber du kannst lernen, aus ihrem Griff zurückzufinden, bevor du unterschreibst." Kurzer Text stellt Angst-Steuerung als dreizehnten Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die konkrete Übung aus der Vertiefung („Der Angst-Abstand": bewusst ausatmen und fragen, ob die Gefahr real ist oder gerade erzeugt wird, bevor man im Angstzustand entscheidet). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `angst-steuerung` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1307–1362: Abschnitt „Sicherheit gegen Freiheit" Zeile 1323, Übung „Der Angst-Abstand" Zeile 1333–1340) · Route `/mitglieder/wissen/angst-steuerung` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-angst-steuerung.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Angst als Steuerungsmittel" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:00), Pitch zum Wochenausklang (Do 07:45) – identischer Rhythmus wie in Woche 11–22.
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do.
- **Carousel-Auswahl begründet:** Das List-Slide „So erkennst du Beeinflussung" in `wer-denkt-hier` nennt „Angst oder Empörung schalten dein kritisches Denken aus" wörtlich – eine der wenigen exakten Direkttreffer unter den 5 evergreenen Serien. Die Sharepic-Ergänzung (Affect Labeling, Lieberman 2007) liefert den passenden wissenschaftlichen Gegenpol: Benennen statt unterdrücken.
- **Berufsbezug durchgängig:** Change-Kommunikation, Verhandlungsdruck, Arbeitsplatzsorgen – dieselbe Kernthese wie in den anderen Kanälen (Angst-Steuerung: „Wer deine Angst kontrolliert, muss deine Meinung nicht mehr überzeugen"), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Die Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 39, Eintrag „Angst-Steuerung") ist zum Planungszeitpunkt mit `filmed: false` markiert – kein natives YouTube-Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil. Bewusst überparteilich (Angst-Steuerung wird als allgemeiner Mechanismus erklärt, nicht an einer konkreten Krise aufgehängt).
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
