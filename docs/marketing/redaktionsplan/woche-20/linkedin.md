# LinkedIn – Woche 20 · Block C · Mentale Selbstverteidigung – Identität & Meinung

> Kanal-Planer: linkedin. Frequenz-Stufe: **fokussiert (3 Posts)**. Quelle:
> `docs/marketing/redaktionsplan/themen-backlog.md`, Block C, Zeile
> „Identität & Meinung" (Zeile 94). Reel-Serie `selbstverteidigung` in
> `src/lib/reels.ts`, Zeile 45: „Identität & Meinung", Hook „Hast du eine
> Meinung – oder sie dich?", `filmed: false`. Alle Slugs/Pfade gegen
> `src/lib/blog.ts` (Zeile 917), `src/lib/deep-dives.ts` (Zeile 1655),
> `docs/carousels/marketing-serien.mjs` geprüft (`rg`/`ls`, s. Prüfvermerke
> unten).
>
> Bild-Assets: **Creme-Variante als Standard** (`-hell.png`), s.
> `docs/marketing/zitate/4x5/` bzw. `docs/marketing/zitate/studien-4x5/`.

## Woche

| Tag | Uhrzeit | Format | Inhalt / Hook | Quelle | CTA |
|---|---|---|---|---|---|
| Di | 07:30 | 📝 Beitrag | **Hook (1. Zeile):** „Sobald ‚das machen wir hier so‘ zur Identität einer Abteilung wird, ist jeder Verbesserungsvorschlag ein Angriff." Text überträgt den Blog-Kern (eine Meinung ist eigentlich ein Werkzeug – man nimmt sie an, prüft sie, legt sie bei Bedarf ab; verschmilzt sie aber mit Identität und Zugehörigkeit, wird jede Kritik daran zum persönlichen Angriff) auf Arbeitskontexte: die Methode, mit der ein Team seit Jahren arbeitet, wird nicht mehr geprüft, weil Kritik daran wie ein Angriff auf die eigene Kompetenz wirkt; „Wir bei uns in der Abteilung" wird zur Grenze, die Verbesserungsvorschläge von außen automatisch abwehrt; die eigene fachliche Meinung, einmal öffentlich vertreten, wird auch dann verteidigt, wenn neue Fakten dagegensprechen – weil ein Rückzug wie ein Gesichtsverlust wirkt. Kern: Wer eine Meinung ändern kann, ohne sich selbst infrage zu stellen, hat Reife bewiesen, keine Schwäche. Schluss: die zugespitzte Frage aus dem Artikel – „Verteidige ich hier die Sache – oder mich selbst?" | Blog `/blog/hast-du-eine-meinung-oder-hat-sie-dich` (verifiziert in `src/lib/blog.ts`, Zeile 917–959: Zitat „Solange du eine Meinung hast, kannst du sie prüfen. Sobald die Meinung dich hat, verteidigst du sie wie dein Leben" Zeile 943–945, Abschnitt „Meinung wird zu Zugehörigkeit" Zeile 935–940) | Kommentar-Frage: „Welche Arbeitsweise in deinem Team würde sofort Widerstand auslösen, wenn sie infrage gestellt würde – unabhängig davon, ob sie noch die beste ist?" (Soft-Engagement, kein harter Link) |
| Mi | 08:00 | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – sachlicher Ton, Fokus auf das Step-Slide „Gruppendruck": „Unser Bedürfnis nach Zugehörigkeit macht uns empfänglich für die Denkweise des Umfelds. Oft übernehmen wir Meinungen und Verhalten, ohne sie je zu hinterfragen." Im Begleittext auf Team- und Abteilungszugehörigkeit im Job zugespitzt: Eine fachliche Position wird oft nicht deshalb vertreten, weil sie geprüft wurde, sondern weil sie zur eigenen Gruppe im Unternehmen gehört – „das sagt man bei uns eben so". | Carousel-Serie `wer-denkt-hier` in `docs/carousels/marketing-serien.mjs`, Zeilen 91–114 (Step-Slide „Gruppendruck" Zeile 101–102) | „Speichern für die nächste Diskussion, in der eine Meinung eigentlich nur eine Zugehörigkeit verteidigt." → kein Link, reines Save/Share |
| Do | 07:45 | 🎯 Pitch | **Hook:** „Du bleibst du, auch wenn eine berufliche Meinung geht – das ist der eigentliche Kern von Souveränität im Job." Kurzer Text stellt Identität & Meinung als zehnten Baustein der Reihe „Mentale Selbstverteidigung" vor, mit Verweis auf die konkrete Übung aus der Vertiefung („Identität oder Ansicht?": innerlich „Ich bemerke die Meinung, dass …" statt „Ich bin …" sagen, um Abstand zu gewinnen). Einstieg über das kostenlose E-Book, vollständige Vertiefung samt PDF im Mitgliederbereich. | Deep-Dive `identitaet-und-meinung` (verifiziert in `src/lib/deep-dives.ts`, Zeile 1655–1710: Abschnitt „Warum Kritik dann schmerzt" Zeile 1671, Übung „Identität oder Ansicht?" Zeile 1681–1688) · Route `/mitglieder/wissen/identitaet-und-meinung` (`src/app/mitglieder/wissen/[slug]/page.tsx`) + PDF `content/pdf/vertiefung-identitaet-und-meinung.pdf` (verifiziert per `ls content/pdf/`) | Soft-CTA: „Kostenloses E-Book sichern" → `/#ebook`; für bereits Registrierte: „Vertiefung „Identität & Meinung" direkt in der Mitgliedschaft" → `/mitglieder` |

## Hinweise zur Umsetzung

- **Rhythmus eingehalten:** Textbeitrag früh in der Pendelzeit (Di 07:30), Carousel Mitte der Woche (Mi 08:00), Pitch zum Wochenausklang (Do 07:45) – identischer Rhythmus wie in Woche 11–19.
- **Kein Freitag/Wochenende belegt** – bei „fokussiert" bleiben drei Slots Di–Do.
- **Carousel-Auswahl begründet:** Unter den 5 evergreenen Serien gibt es kein eigenes „Identität"-Slide. Das Step-Slide „Gruppendruck" aus `wer-denkt-hier` trifft den Kernmechanismus des Blogs jedoch direkt (Zugehörigkeit lässt Meinungen ungeprüft übernehmen) – inhaltlich passend genug, um ohne ⚠-Abweichung als Hauptbeleg zu dienen; die Zuspitzung im Begleittext liegt auf der Verschmelzung von Meinung und Team-Zugehörigkeit statt auf klassischem Gruppendruck.
- **Berufsbezug durchgängig:** Team-Methoden, Abteilungs-Zugehörigkeit, öffentlich vertretene Fachmeinungen – dieselbe Kernthese wie in den anderen Kanälen (Identität & Meinung: „Solange du eine Meinung hast, kannst du sie prüfen. Sobald die Meinung dich hat, verteidigst du sie wie dein Leben"), aus Arbeitsperspektive übersetzt.
- **Kein Video-Slot:** Die Reel-Serie „selbstverteidigung" (`src/lib/reels.ts`, Zeile 45, Eintrag „Identität & Meinung") ist zum Planungszeitpunkt mit `filmed: false` markiert – kein natives YouTube-Teilen möglich.
- **Ton:** sachlich, wertig, These zuerst – kein Boulevard-Stil. Bewusst überparteilich (Identitätsverschmelzung wird als allgemeiner Mechanismus erklärt, nicht an einem politischen Lager aufgehängt).
- Es wurden keine neuen Slugs/Assets erfunden; alle Quellenangaben sind mit Datei/Zeile oder Verzeichnis-Listing belegt.
