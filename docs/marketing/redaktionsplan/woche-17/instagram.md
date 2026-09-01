# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 17) · Autoritätshörigkeit
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 17 · Autoritätshörigkeit

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Titel ≠ Wahrheit." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Autoritätshörigkeit** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „8 · Autorität & Gehorsam" (Hook im Skript: „Derselbe Satz klingt wahrer, wenn ein Titel davorsteht.") | „Folge für Teil 2: Wie Angst dich lenkbar macht." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Bewusstheit gibt dir die Kontrolle zurück" | `docs/carousels/marketing-serien.mjs`, Serie **„wer-denkt-hier"**, Remedy-Slide „Bewusstheit gibt dir die Kontrolle zurück" als Aufhänger ⚠️ *(kein 1:1-Slide zu „Autorität & Gehorsam", siehe Material-Check)*, vertieft mit Blog `/blog/wann-vertrauen-zu-blindem-gehorsam-wird` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/autoritaetshoerigkeit` (`src/lib/deep-dives.ts`, `relatedStage: 1`) | „Wann aus Vertrauen blinder Gehorsam wird – ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Glaubst du eine Aussage, weil sie stimmt – oder weil ein Titel davorsteht?" + Mini-Übung „Der innere Beobachter" | `src/lib/practices.ts`, Slug **`innerer-beobachter`** (Kategorie „Meditationen", 10 Minuten, `relatedStage: 3`) → Route `/mitglieder/praxis/innerer-beobachter` | „Beobachte heute einmal den Impuls, einfach zuzustimmen – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Unter dem Druck einer Autorität handeln viele gegen ihr eigenes Gewissen." | Studien-Kachel `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-13-hell.png` (Creme-Standard; Text + Quelle lt. `docs/marketing/content-data.mjs`, `FACTS key: "13"`, Stanley Milgram 1963, ethisch umstritten) · Vertiefung `/mitglieder/wissen/autoritaetshoerigkeit` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Autorität & Gehorsam" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Hook „Titel ≠ Wahrheit" bringt das Wochenthema
  provokant und kurz auf den Punkt.
- **Carousel (Mi, 12:30):** Kein eigener „wer-denkt-hier"-Schritt zu
  Autorität/Gehorsam; das generische Gegenmittel-Slide („Bewusstheit gibt
  dir die Kontrolle zurück") passt als Rahmen zu jedem Einfluss-Thema,
  Tiefe liefert der Blogartikel.
- **Story (Fr, 19:00):** „Der innere Beobachter" schafft die Distanz, die
  nötig ist, um zwischen „aus Fachwissen gesagt" und „nur weil ein Titel
  davorsteht" zu unterscheiden.
- **Zitat + Pitch (So, 08:00):** Studienfakt 13 (Milgram) ist ein
  **exakter** Treffer – das Milgram-Experiment ist der Klassiker zum
  Thema Autoritätsgehorsam und wird auch inhaltlich mit dem Deep-Dive
  „Autorität & Gehorsam" verknüpft. Die Quellenzeile in
  `content-data.mjs` markiert das Experiment bewusst als „ethisch
  umstritten" – das übernehmen wir 1:1 in die Bildunterschrift.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Autoritätshörigkeit" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Titel ≠ Wahrheit", Skript-Abschnitt „8 · Autorität & Gehorsam" vorhanden.
- ✅ Blog-Slug `wann-vertrauen-zu-blindem-gehorsam-wird` in `src/lib/blog.ts`, reale Route `/blog/wann-vertrauen-zu-blindem-gehorsam-wird`.
- ✅ Deep-Dive `autoritaetshoerigkeit` in `src/lib/deep-dives.ts`, `relatedStage: 1`, reale Route `/mitglieder/wissen/autoritaetshoerigkeit`.
- ✅ Praxis `innerer-beobachter` in `src/lib/practices.ts`, `relatedStage: 3`, Route `/mitglieder/praxis/innerer-beobachter`.
- ⚠️ **Carousel-Lücke:** Kein dedizierter Slide zu „Autorität & Gehorsam" in `docs/carousels/marketing-serien.mjs`. Ausgewichen auf das generische Remedy-Slide der Serie „wer-denkt-hier"; **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Autoritäts-Schritt ergänzen.
- ✅ Studien-Kachel `WMDG-Studienfakt-13-hell.png`, Text + Quelle `FACTS key: "13"` aus `docs/marketing/content-data.mjs` – **exakter** Themen-Treffer (Milgram-Experiment); Hinweis „ethisch umstritten" aus der Quelle wird im Post-Text mitgeführt.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
