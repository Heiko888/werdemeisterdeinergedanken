# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 26) · Bildmacht
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 26 · Bildmacht

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Ein Bild ist kein Beweis." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Bildmacht** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „14 · Bilder statt Argumente" (Hook im Skript: „Ein Bild fühlt sich an wie ein Beweis. Ist aber nur ein Ausschnitt.") | „Ton weg, dann urteilen. Speichern – und schreib in die Kommentare, welches Bild dich zuletzt getäuscht hat." |
| Mittwoch | 12:30 | 🖼️ Carousel | „So liest du Studien richtig – und so liest du auch Bilder" | `docs/carousels/marketing-serien.mjs`, Serie **„studien-fakten"**, Remedy-Slide „So liest du Studien richtig" (Kernsatz: „Eine einzelne Studie ist ein Hinweis, kein Beweis") als Aufhänger ⚠️ *(strukturelle Parallele „kein Beweis", kein 1:1-Slide zu „Bildmacht", siehe Material-Check)*, vertieft mit Blog `/blog/bildmacht-ein-bild-ist-kein-beweis` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/bildmacht` (`src/lib/deep-dives.ts`, `relatedStage: 3`) | „Was liegt außerhalb des Bildrands? Ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Welches Bild hat zuletzt sofort ein Gefühl in dir ausgelöst, bevor du überhaupt wusstest, worum es geht?" + Mini-Übung „Body-Scan" | `src/lib/practices.ts`, Slug **`body-scan`** (Kategorie „Meditationen", 15 Minuten, `relatedStage: 4`) → Route `/mitglieder/praxis/body-scan` | „Merkst du eine Körperreaktion auf ein Bild, mach kurz den Body-Scan, bevor du reagierst – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Der erste Schritt ist nicht Kontrolle. Es ist Bemerken." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-13-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "13"`) · Vertiefung `/mitglieder/wissen/bildmacht` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Bilder statt Argumente" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Reel-Hook „Ein Bild ist kein Beweis" ist ein
  klarer Pattern-Interrupt für ein visuelles Medium wie Instagram selbst –
  bewusst zugespitzt.
- **Carousel (Mi, 12:30):** Kein Slide behandelt Bildmanipulation direkt;
  der Studienkritik-Slide trifft aber strukturell dieselbe Botschaft
  („X ist ein Hinweis, kein Beweis") und lässt sich 1:1 auf Bilder
  übertragen – die Bild-spezifische Tiefe (Ausschnitt, Musik, Timing)
  liefert der Blogartikel.
- **Story (Fr, 19:00):** Der Body-Scan holt aus der unmittelbaren
  Gefühlsreaktion auf ein Bild zurück in den Körper – die praktische
  Pause, bevor das Bild die Bewertung übernimmt.
- **Zitat + Pitch (So, 08:00):** Zitat 13 – „Bemerken vor Kontrolle" –
  passt als würdiger, ruhiger Abschluss des gesamten zweiten Teils von
  Block C.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Bildmacht" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Ein Bild ist kein Beweis", Skript-Abschnitt „14 · Bilder statt Argumente" in `docs/skripte/reels/mentale-selbstverteidigung.md` vorhanden.
- ✅ Blog-Slug `bildmacht-ein-bild-ist-kein-beweis` in `src/lib/blog.ts`, reale Route `/blog/bildmacht-ein-bild-ist-kein-beweis`.
- ✅ Deep-Dive `bildmacht` in `src/lib/deep-dives.ts`, `relatedStage: 3`, reale Route `/mitglieder/wissen/bildmacht`.
- ✅ Praxis `body-scan` in `src/lib/practices.ts`, `relatedStage: 4`, Route `/mitglieder/praxis/body-scan`.
- ⚠️ **Carousel-Lücke:** `docs/carousels/marketing-serien.mjs` enthält keinen dedizierten Slide zu „Bildmacht". Der Remedy-Slide „So liest du Studien richtig" (Serie „studien-fakten") ist der inhaltlich nächstliegende reale Slide (strukturelle Parallele „kein Beweis"). **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Bildmacht-Schritt ergänzen.
- ✅ Zitat-Kachel `WMDG-Zitat-13-hell.png`, Text `key: "13"` aus `docs/marketing/content-data.mjs` – passt als Serien-Abschluss.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.

## Block-C-Abschluss – Gesamtstatus Carousel-Material (Wochen 11–26)

Über alle 16 Wochen von Block C deckt `docs/carousels/marketing-serien.mjs`
weiterhin nur drei der 16 Themen mit einem **eigenen** Schritt ab:
Algorithmen/Filterblasen (W12), Werbung & Mangel (W15), Gruppendruck (W16).
Für die übrigen 13 Themen (Framing, Wiederholung, Reizüberflutung,
Autoritätshörigkeit, Propaganda, Kognitive Dissonanz, Identität & Meinung,
Sprache & Etiketten, Medien-Agenda, Angst-Steuerung, Ablenkung,
Normalisierung, Bildmacht) gibt es keinen dedizierten Slide; in jeder
Wochen-Datei wurde jeweils der inhaltlich nächstliegende reale Slide aus
„wer-denkt-hier", „60000-gedanken", „4-wege-freiheit" oder „studien-fakten"
gewählt und die eigentliche Tiefe über den passenden Blogartikel/Deep-Dive
sichergestellt. Zusätzlich wurden zwei Warnsignal-Items derselben Liste
(„Starke Emotion" und „Schwarz-Weiß & „alle"") in den Wochen 14/23 bzw. 25
mehrfach als Anker genutzt, da sie die jeweils treffendste wörtliche
Formulierung liefern. **Empfehlung an den Koordinator/Themen-Strategen:**
Für den nächsten Redaktionszyklus eine eigene Carousel-Serie zu „Mentale
Selbstverteidigung" mit 13 zusätzlichen Themen-Schritten produzieren, damit
Block C auch im Carousel-Format vollständig eigene Assets bekommt.
