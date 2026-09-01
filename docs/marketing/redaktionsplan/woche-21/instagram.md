# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 21) · Sprache & Etiketten
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 21 · Sprache & Etiketten

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Ein Wort beendet jede Debatte." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Sprache & Etiketten** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „3 · Sprache & Etiketten" (Hook im Skript: „Ein einziges Wort kann eine ganze Diskussion beenden.") | „Welches Reizwort triggert dich sofort? Schreib's in die Kommentare." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Kritisch denken: Das Etikett zuerst abziehen, dann urteilen" | `docs/carousels/marketing-serien.mjs`, Serie **„4-wege-freiheit"**, Schritt „03 · Kritisch denken" (Hinweis wörtlich: „Woher stammt die Info? · Wer profitiert davon? · Welche Emotion soll sie in mir auslösen?") als Aufhänger ⚠️ *(kein 1:1-Slide zu „Sprache & Etiketten", siehe Material-Check)*, vertieft mit Blog `/blog/sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/sprache-und-etiketten` (`src/lib/deep-dives.ts`, `relatedStage: 3`) | „Der Etiketten-Test aus dem Skript – ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Bei welchem Etikett (Experte, Aktivist, Extremist …) hörst du sofort auf zuzuhören?" + Mini-Übung „Der Autopilot-Check" | `src/lib/practices.ts`, Slug **`autopilot-check`** (Kategorie „Rituale", 2 Minuten, `relatedStage: 1`) → Route `/mitglieder/praxis/autopilot-check` | „Nächstes Mal, wenn ein Etikett fällt: kurz innehalten, selbst benennen – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Zwischen „so bin ich eben“ und „so wähle ich“ liegt deine ganze Freiheit." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-14-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "14"`) · Vertiefung `/mitglieder/wissen/sprache-und-etiketten` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Sprache & Etiketten" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Reel-Hook „Ein Wort beendet jede Debatte" ist
  der prägnanteste Einstieg – das Experte/Querulant-Beispiel aus dem
  Skript liefert sofort ein Aha.
- **Carousel (Mi, 12:30):** Kein eigener Etiketten-Schritt vorhanden; der
  „Kritisch denken"-Schritt aus „4-wege-freiheit" fragt aber exakt das,
  was auch der Etiketten-Test verlangt (Quelle, Absicht, ausgelöste
  Emotion prüfen) – die konkrete Etiketten-Anwendung liefert der
  Blogartikel.
- **Story (Fr, 19:00):** Der Autopilot-Check trainiert, ein aufkommendes
  Gefühl „innerlich in einem Wort zu benennen – ohne es zu bewerten":
  genau die Gegenbewegung zu einem fremden, wertenden Etikett.
- **Zitat + Pitch (So, 08:00):** Zitat 14 stellt „so bin ich eben" (ein
  selbst übernommenes Etikett) gegen „so wähle ich" – ein präziser
  gedanklicher Bogen zum Wochenthema.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Sprache & Etiketten" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Ein Wort beendet jede Debatte", Skript-Abschnitt „3 · Sprache & Etiketten" in `docs/skripte/reels/mentale-selbstverteidigung.md` vorhanden.
- ✅ Blog-Slug `sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` in `src/lib/blog.ts`, reale Route `/blog/sprache-und-etiketten-wie-ein-etikett-das-denken-beendet`.
- ✅ Deep-Dive `sprache-und-etiketten` in `src/lib/deep-dives.ts`, `relatedStage: 3`, reale Route `/mitglieder/wissen/sprache-und-etiketten`.
- ✅ Praxis `autopilot-check` in `src/lib/practices.ts`, `relatedStage: 1`, Route `/mitglieder/praxis/autopilot-check` – **Hinweis:** dieselbe Praxis diente bereits Woche 12 (Algorithmen); hier bewusst erneut gewählt, weil ihr Kern „benennen statt bewerten" direkt zum Etiketten-Thema passt.
- ⚠️ **Carousel-Lücke:** `docs/carousels/marketing-serien.mjs` enthält keinen dedizierten Slide zu „Sprache & Etiketten". Der Schritt „Kritisch denken" (Serie „4-wege-freiheit") ist der inhaltlich nächstliegende reale Slide. **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Etiketten-Schritt ergänzen.
- ✅ Zitat-Kachel `WMDG-Zitat-14-hell.png`, Text `key: "14"` aus `docs/marketing/content-data.mjs` – passt inhaltlich („so bin ich eben" als Etikett).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
