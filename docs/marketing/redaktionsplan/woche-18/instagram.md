# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 18) · Propaganda
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 18 · Propaganda

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Ohne eine einzige Lüge." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Propaganda** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „1 · Propaganda" (Hook im Skript: „Propaganda erkennst du nicht an lauten Parolen. Sondern hieran.") | „Woher stammt deine stärkste Überzeugung? Schreib's in die Kommentare." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Gedankenkontrolle: Selbstkontrolle vs. Manipulation von außen" | `docs/carousels/marketing-serien.mjs`, Serie **„60000-gedanken"**, Compare-Slide „Gedankenkontrolle" (nennt „Werbung, Propaganda oder psychologische Techniken" wörtlich) als Aufhänger, vertieft mit Blog `/blog/propaganda-erkennst-du-nicht-an-lauten-parolen` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/propaganda` (`src/lib/deep-dives.ts`, `relatedStage: 1`) | „Die drei leisen Hebel der Propaganda – ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Welche Überzeugung hast du übernommen, ohne sie je wirklich geprüft zu haben?" + Mini-Übung „Abend-Reflexion" | `src/lib/practices.ts`, Slug **`abend-reflexion`** (Kategorie „Rituale", 5–10 Minuten, `relatedStage: 3`) → Route `/mitglieder/praxis/abend-reflexion` | „Geh heute Abend eine Überzeugung durch, statt sie einfach zu behalten – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Du musst deine Gedanken nicht bekämpfen. Nur aufhören, jedem zu glauben." | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-08-hell.png` (Creme-Standard; Text lt. `docs/marketing/content-data.mjs`, `key: "08"`) · Vertiefung `/mitglieder/wissen/propaganda` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Propaganda & Konditionierung" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Hook „Ohne eine einzige Lüge" ist der stärkste
  Pattern-Interrupt der ganzen Reel-Serie und passt als Abschluss-Thema
  von Block C.
- **Carousel (Mi, 12:30):** Der Compare-Slide „Gedankenkontrolle" aus der
  Serie „60000-gedanken" nennt „Propaganda" als Stichwort wörtlich –
  ein **realer, wenn auch knapper** Treffer; die eigentliche Tiefe (drei
  Hebel: Wiederholung, Emotion, Vereinfachung) liefert der Blogartikel.
- **Story (Fr, 19:00):** Die Abend-Reflexion passt, um am Tagesende eine
  ungeprüft übernommene Überzeugung zu identifizieren – direkte
  Anwendung der Deep-Dive-Übung „Der Herkunfts-Check" in Alltagsform.
- **Zitat + Pitch (So, 08:00):** Zitat 08 fasst die Kernbotschaft der
  Serie zusammen (nicht bekämpfen, sondern aufhören, jedem Gedanken zu
  glauben) und passt als würdiger Abschluss des ganzen Themenblocks.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Propaganda" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Ohne eine einzige Lüge", Skript-Abschnitt „1 · Propaganda" vorhanden.
- ✅ Blog-Slug `propaganda-erkennst-du-nicht-an-lauten-parolen` in `src/lib/blog.ts`, reale Route `/blog/propaganda-erkennst-du-nicht-an-lauten-parolen`.
- ✅ Deep-Dive `propaganda` in `src/lib/deep-dives.ts`, `relatedStage: 1`, reale Route `/mitglieder/wissen/propaganda`.
- ✅ Praxis `abend-reflexion` in `src/lib/practices.ts`, `relatedStage: 3`, Route `/mitglieder/praxis/abend-reflexion`.
- ✅ Carousel „60000-gedanken", Compare-Slide „Gedankenkontrolle" real in `docs/carousels/marketing-serien.mjs` gefunden – nennt „Propaganda" wörtlich als Stichpunkt (kein eigener Propaganda-Vollschritt, aber ein echter, direkter Treffer).
- ✅ Zitat-Kachel `WMDG-Zitat-08-hell.png`, Text `key: "08"` aus `docs/marketing/content-data.mjs` – passt als Serien-Abschluss.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.

## Block-C-Abschluss – Gesamtstatus Carousel-Material

Über die acht Wochen (11–18) hinweg deckt `docs/carousels/marketing-serien.mjs` nur
drei der acht Themen mit einem **eigenen** Schritt ab: Algorithmen/Filterblasen
(W12), Werbung & Mangel (W15), Gruppendruck (W16). Für Framing (W11), Wiederholung
(W13), Reizüberflutung (W14) und Autoritätshörigkeit (W17) gibt es keinen
dedizierten Slide; dort wurde jeweils auf den inhaltlich nächstliegenden
vorhandenen Slide ausgewichen (siehe die einzelnen Wochen-Dateien) und die Tiefe
über den passenden Blogartikel/Deep-Dive sichergestellt. **Empfehlung an den
Koordinator/Themen-Strategen:** die Serie „wer-denkt-hier" um fünf weitere
Schritte (Framing, Wiederholung, Reizüberflutung, Autorität, Propaganda)
ergänzen, damit Block C auch im Carousel-Format vollständig eigene Assets hat.
