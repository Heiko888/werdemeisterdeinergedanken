# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 22) · Medien-Agenda
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 22 · Medien-Agenda

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Nicht WAS – sondern WORÜBER." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Medien-Agenda** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „4 · Medien & Aufmerksamkeit" (Hook im Skript: „Medien müssen dir nicht sagen, was du denken sollst.") | „Welches wichtige Thema kommt in deinem Feed eigentlich gar nicht vor? Schreib's in die Kommentare." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Werbung & Medien" | `docs/carousels/marketing-serien.mjs`, Serie **„60000-gedanken"**, Liste „Äußere Einflüsse", Item **„Werbung & Medien"** (nennt „Medien" wörtlich, formen „Werte, Kaufentscheidungen und Selbstbild") als Aufhänger ⚠️ *(Werbefokus, kein 1:1-Slide zur Themenauswahl/Agenda-Setting, siehe Material-Check)*, vertieft mit Blog `/blog/medien-agenda-nicht-was-sondern-worueber` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/medien-agenda` (`src/lib/deep-dives.ts`, `relatedStage: 1`) | „Die drei stillen Werkzeuge der Medien-Agenda – ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Wann hast du zuletzt bewusst entschieden, worüber du heute nachdenkst – statt es dir sagen zu lassen?" + Mini-Übung „Präsenz-Spaziergang" | `src/lib/practices.ts`, Slug **`praesenz-spaziergang`** (Kategorie „Rituale", 10–20 Minuten, `relatedStage: 2`) → Route `/mitglieder/praxis/praesenz-spaziergang` | „Lass beim nächsten Spaziergang das Handy stecken – und antworte danach auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Wovon du überzeugt bist, formt mit, wie es dir geht." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-12-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "12"`) · Vertiefung `/mitglieder/wissen/medien-agenda` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Medien & Aufmerksamkeit" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Reel-Hook „Nicht WAS – sondern WORÜBER" ist
  die griffigste Zusammenfassung des Agenda-Setting-Prinzips und eröffnet
  die Woche mit einem klaren Denkanstoß.
- **Carousel (Mi, 12:30):** Kein Slide behandelt Themenauswahl/Häufigkeit
  direkt; das Listen-Item „Werbung & Medien" nennt aber wörtlich „Medien"
  als formende Kraft – als visueller Einstieg tragfähig, die eigentliche
  Mechanik (Auswahl, Häufigkeit, Weglassen) liefert der Blogartikel.
- **Story (Fr, 19:00):** Der Präsenz-Spaziergang holt bewusst weg vom
  fremdbestimmten Feed hin zu den eigenen Sinnen – die praktische
  Umkehrung von „worüber andere entscheiden lassen".
- **Zitat + Pitch (So, 08:00):** Zitat 12 schließt den Bogen: Was dich
  überzeugt (auch durch Medien geprägt), wirkt bis ins eigene Befinden.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Medien-Agenda" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Nicht WAS – sondern WORÜBER", Skript-Abschnitt „4 · Medien & Aufmerksamkeit" in `docs/skripte/reels/mentale-selbstverteidigung.md` vorhanden.
- ✅ Blog-Slug `medien-agenda-nicht-was-sondern-worueber` in `src/lib/blog.ts`, reale Route `/blog/medien-agenda-nicht-was-sondern-worueber`.
- ✅ Deep-Dive `medien-agenda` in `src/lib/deep-dives.ts`, `relatedStage: 1`, reale Route `/mitglieder/wissen/medien-agenda`.
- ✅ Praxis `praesenz-spaziergang` in `src/lib/practices.ts`, `relatedStage: 2`, Route `/mitglieder/praxis/praesenz-spaziergang`.
- ⚠️ **Carousel-Lücke:** `docs/carousels/marketing-serien.mjs` enthält keinen Slide zu Agenda-Setting/Themenauswahl. Das Listen-Item „Werbung & Medien" (Serie „60000-gedanken") ist der inhaltlich nächstliegende reale Slide, deckt aber eher Werbewirkung als Themenauswahl ab. **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Medien-Agenda-Schritt ergänzen.
- ✅ Zitat-Kachel `WMDG-Zitat-12-hell.png`, Text `key: "12"` aus `docs/marketing/content-data.mjs` – passt inhaltlich (Überzeugungen formen das Befinden).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
