# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 20) · Identität & Meinung
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 20 · Identität & Meinung

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Hast du eine Meinung – oder sie dich?" | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Identität & Meinung** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „15 · Identität & Meinung" (Hook im Skript: „Hast du eine Meinung – oder hat die Meinung längst dich?") | „Bei welchem Thema fühlt sich Widerspruch persönlich an? Schreib's in die Kommentare." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Meinungen, die gar nicht deine sind" | `docs/carousels/marketing-serien.mjs`, Serie **„60000-gedanken"**, Liste „Äußere Einflüsse", Item **„Gruppendruck"** (nennt „Meinungen … ungeprüft übernehmen" wörtlich) als Aufhänger ⚠️ *(kein 1:1-Slide zu „Identität & Meinung", siehe Material-Check)*, vertieft mit Blog `/blog/hast-du-eine-meinung-oder-hat-sie-dich` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/identitaet-und-meinung` (`src/lib/deep-dives.ts`, `relatedStage: 6`) | „Der Test, ob eine Meinung wirklich deine ist – ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Welche Meinung würdest du nie laut infrage stellen – selbst wenn du insgeheim zweifelst?" + Mini-Übung „Morgen-Ausrichtung" | `src/lib/practices.ts`, Slug **`morgen-ausrichtung`** (Kategorie „Rituale", 5 Minuten, `relatedStage: 5`) → Route `/mitglieder/praxis/morgen-ausrichtung` | „Wähle morgen früh bewusst eine Haltung, statt in eine alte Position zu rutschen – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Freiheit beginnt mit einer Frage: Ist dieser Gedanke wirklich meiner?" | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-07-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "07"`) · Vertiefung `/mitglieder/wissen/identitaet-und-meinung` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Identität & Meinung" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Reel-Hook „Hast du eine Meinung – oder sie
  dich?" ist die zugespitzteste Formulierung des Wochenthemas und eignet
  sich als starker Wochenauftakt.
- **Carousel (Mi, 12:30):** Kein eigener Identitäts-Schritt vorhanden; der
  Gruppendruck-Punkt aus „60000-gedanken" trifft die Kernmechanik
  („Meinungen … ungeprüft übernehmen") direkt genug, um als Aufhänger zu
  dienen – die Verbindung zur *eigenen Identität* liefert der Blogartikel.
- **Story (Fr, 19:00):** Die Morgen-Ausrichtung trainiert genau die
  bewusste Wahl einer Haltung, statt eine übernommene Meinung automatisch
  zu verteidigen – ein direkter Transfer der Skript-Aussage „Eine Meinung
  ändern zu können ist … Reife" in ein tägliches Ritual.
- **Zitat + Pitch (So, 08:00):** Zitat 07 fragt exakt das, worum es die
  ganze Woche ging – ein ruhiger, klarer Wochenausklang mit Bogen zum
  Angebot.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Identität & Meinung" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Hast du eine Meinung – oder sie dich?", Skript-Abschnitt „15 · Identität & Meinung" in `docs/skripte/reels/mentale-selbstverteidigung.md` vorhanden.
- ✅ Blog-Slug `hast-du-eine-meinung-oder-hat-sie-dich` in `src/lib/blog.ts`, reale Route `/blog/hast-du-eine-meinung-oder-hat-sie-dich`.
- ✅ Deep-Dive `identitaet-und-meinung` in `src/lib/deep-dives.ts`, `relatedStage: 6`, reale Route `/mitglieder/wissen/identitaet-und-meinung`.
- ✅ Praxis `morgen-ausrichtung` in `src/lib/practices.ts`, `relatedStage: 5`, Route `/mitglieder/praxis/morgen-ausrichtung`.
- ⚠️ **Carousel-Lücke:** `docs/carousels/marketing-serien.mjs` enthält keinen dedizierten Slide zu „Identität & Meinung". Das Listen-Item „Gruppendruck" (Serie „60000-gedanken") ist der inhaltlich nächstliegende reale Slide (Formulierung „Meinungen … ungeprüft übernehmen"). **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Identitäts-Schritt ergänzen.
- ✅ Zitat-Kachel `WMDG-Zitat-07-hell.png`, Text `key: "07"` aus `docs/marketing/content-data.mjs` – passt inhaltlich (Meinung vs. Identität).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
