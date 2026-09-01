# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 25) · Normalisierung
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 25 · Normalisierung

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „„War doch schon immer so?“" | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Normalisierung** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „13 · Normalisierung" (Hook im Skript: „Was gestern undenkbar war, ist heute normal. Wie geht das?") | „Speicher das – und beobachte dich selbst. Wo hast du eine Veränderung zuletzt einfach hingenommen?" |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Warnsignal „alle machen das"" | `docs/carousels/marketing-serien.mjs`, Serie **„wer-denkt-hier"**, Liste „Warnsignale", Item **„Schwarz-Weiß & „alle""** (nennt „alle machen das" wörtlich) als Aufhänger ⚠️ *(kein eigener Normalisierungs-Slide, „alle machen das" ist aber das klassische Normalisierungs-Argument, siehe Material-Check)*, vertieft mit Blog `/blog/normalisierung-war-doch-schon-immer-so` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/normalisierung` (`src/lib/deep-dives.ts`, `relatedStage: 1`) | „Warum „schon immer so" fast nie stimmt – ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Welche Entwicklung hast du in den letzten Jahren als „normal" hingenommen, die dich am Anfang schockiert hätte?" + Mini-Übung „Herz-Kohärenz" | `src/lib/practices.ts`, Slug **`herz-kohaerenz`** (Kategorie „Meditationen", 5–10 Minuten, `relatedStage: 6`) → Route `/mitglieder/praxis/herz-kohaerenz` | „Nimm dir vor der nächsten Bewertung 5 Minuten Herz-Kohärenz – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Was du wiederholst, wird zu deiner Bahn. Also wähle bewusst." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-11-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "11"`) · Vertiefung `/mitglieder/wissen/normalisierung` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Normalisierung" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Skript-Hook „Was gestern undenkbar war, ist
  heute normal" stellt sofort die zentrale Frage der Woche und funktioniert
  als starker Aufmerksamkeits-Einstieg.
- **Carousel (Mi, 12:30):** Kein eigener Normalisierungs-Slide vorhanden;
  das Warnsignal „Schwarz-Weiß & „alle"" nennt aber wörtlich „alle machen
  das" – die klassische Normalisierungs-Rhetorik – und dient so als
  direkter, wenn auch schmaler Aufhänger.
- **Story (Fr, 19:00):** Herz-Kohärenz hilft, „vor Entscheidungen" wieder
  zur eigenen, wachen Reaktion zurückzufinden – genau die Reaktion, die
  laut Skript „vor der Gewöhnung ernst genommen" werden soll.
- **Zitat + Pitch (So, 08:00):** Zitat 11 verbindet Wiederholung und
  bewusste Wahl – die gedankliche Brücke zur schleichenden Normalisierung.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Normalisierung" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „„War doch schon immer so?“", Skript-Abschnitt „13 · Normalisierung" in `docs/skripte/reels/mentale-selbstverteidigung.md` vorhanden.
- ✅ Blog-Slug `normalisierung-war-doch-schon-immer-so` in `src/lib/blog.ts`, reale Route `/blog/normalisierung-war-doch-schon-immer-so`.
- ✅ Deep-Dive `normalisierung` in `src/lib/deep-dives.ts`, `relatedStage: 1`, reale Route `/mitglieder/wissen/normalisierung`.
- ✅ Praxis `herz-kohaerenz` in `src/lib/practices.ts`, `relatedStage: 6`, Route `/mitglieder/praxis/herz-kohaerenz`.
- ⚠️ **Carousel-Lücke:** `docs/carousels/marketing-serien.mjs` enthält keinen dedizierten Slide zu „Normalisierung". Das Warnsignal-Item „Schwarz-Weiß & „alle"" (Serie „wer-denkt-hier") ist der inhaltlich nächstliegende reale Slide (nennt „alle machen das" wörtlich). **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Normalisierungs-Schritt ergänzen.
- ✅ Zitat-Kachel `WMDG-Zitat-11-hell.png`, Text `key: "11"` aus `docs/marketing/content-data.mjs` – passt inhaltlich (Wiederholung formt die „Bahn").
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
