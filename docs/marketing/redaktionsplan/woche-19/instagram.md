# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 19) · Kognitive Dissonanz
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 19 · Kognitive Dissonanz

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Warum du wegschaust." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Kognitive Dissonanz** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „12 · Kognitive Dissonanz" (Hook im Skript: „Wir lehnen Informationen nicht ab, weil sie falsch sind.") | „Wann hast du zuletzt zugegeben, dich geirrt zu haben? Schreib's in die Kommentare." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Selbstkontrolle oder Selbstschutz? Was du tust, wenn ein Gedanke wehtut." | `docs/carousels/marketing-serien.mjs`, Serie **„60000-gedanken"**, Compare-Slide „Gedankenkontrolle", Karte **„Selbstkontrolle"** (nennt „störende Gedanken entkräften" wörtlich) als Aufhänger ⚠️ *(kein 1:1-Slide zu „Kognitive Dissonanz", siehe Material-Check)*, vertieft mit Blog `/blog/warum-du-verteidigst-was-dir-schadet` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/kognitive-dissonanz` (`src/lib/deep-dives.ts`, `relatedStage: 3`) | „Die Frage, die den blinden Fleck sichtbar macht – ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Welche Überzeugung hältst du fest, obwohl sie dir eigentlich schadet?" + Mini-Übung „Loslass-Ritual" | `src/lib/practices.ts`, Slug **`loslass-ritual`** (Kategorie „Rituale", 15 Minuten, `relatedStage: 4`) → Route `/mitglieder/praxis/loslass-ritual` | „Schreib heute auf, was du eigentlich loslassen müsstest – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Alte Muster sind keine Schwäche. Sie waren einmal dein Schutz." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-06-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "06"`) · Vertiefung `/mitglieder/wissen/kognitive-dissonanz` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Kognitive Dissonanz" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Reel-Hook „Warum du wegschaust" trifft den
  Kern des Themas direkt und eröffnet den zweiten Teil von Block C mit
  einem persönlichen Pattern-Interrupt.
- **Carousel (Mi, 12:30):** Kein eigener Dissonanz-Schritt in den Serien
  vorhanden; die Compare-Karte „Selbstkontrolle" nennt aber wörtlich das
  „Entkräften störender Gedanken" – ein realer, wenn auch indirekter
  Anknüpfungspunkt. Die eigentliche Tiefe (Quellenabwertung als bequemster
  Ausweg) liefert der Blogartikel.
- **Story (Fr, 19:00):** Das Loslass-Ritual gibt dem zentralen Skript-Satz
  „Unbehagen ist ein Hinweis, genauer hinzuschauen – nicht wegzuschauen"
  eine konkrete, spürbare Form: erst benennen, dann bewusst loslassen,
  statt die Spannung wegzuargumentieren.
- **Zitat + Pitch (So, 08:00):** Zitat 06 passt inhaltlich sehr genau –
  „verteidigte" Muster waren einmal Schutz, nicht Schwäche; das erklärt,
  warum Loslassen so schwerfällt, ohne zu beschämen.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Kognitive Dissonanz" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Warum du wegschaust", Skript-Abschnitt „12 · Kognitive Dissonanz" in `docs/skripte/reels/mentale-selbstverteidigung.md` vorhanden.
- ✅ Blog-Slug `warum-du-verteidigst-was-dir-schadet` in `src/lib/blog.ts`, reale Route `/blog/warum-du-verteidigst-was-dir-schadet`.
- ✅ Deep-Dive `kognitive-dissonanz` in `src/lib/deep-dives.ts`, `relatedStage: 3`, reale Route `/mitglieder/wissen/kognitive-dissonanz`.
- ✅ Praxis `loslass-ritual` in `src/lib/practices.ts`, `relatedStage: 4`, Route `/mitglieder/praxis/loslass-ritual`.
- ⚠️ **Carousel-Lücke:** `docs/carousels/marketing-serien.mjs` enthält keinen dedizierten Slide zu „Kognitive Dissonanz". Die Compare-Karte „Selbstkontrolle" (Serie „60000-gedanken") ist der inhaltlich nächstliegende reale Slide (Formulierung „störende Gedanken entkräften"). **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Dissonanz-Schritt ergänzen.
- ✅ Zitat-Kachel `WMDG-Zitat-06-hell.png`, Text `key: "06"` aus `docs/marketing/content-data.mjs` – passt inhaltlich (alte, schützende Muster verteidigen).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
