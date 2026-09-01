# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 13) · Wiederholung = Wahrheit
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 13 · Wiederholung = Wahrheit

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Oft gehört = wahr?" | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Wiederholung** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „10 · Wiederholung wird zur Wahrheit" (Hook im Skript: „Je öfter du etwas hörst, desto wahrer klingt es. Auch wenn's falsch ist.") – ebenfalls einer der vier vom Skript empfohlenen Einstiegs-Reels. | „Prüf heute eine Sache, die du für selbstverständlich hältst – und folge für Teil 2." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Dein Kopf verzerrt – systematisch" | `docs/carousels/marketing-serien.mjs`, Serie **„studien-fakten"**, Schritt „Fakt 04 · Dein Kopf verzerrt – systematisch" (Tversky & Kahneman) als Aufhänger ⚠️ *(allgemeiner Denkverzerrungs-Fakt, kein 1:1-Slide zum Wiederholungseffekt, siehe Material-Check)*, vertieft mit Blog `/blog/warum-oft-gehoert-sich-wie-wahr-anfuehlt` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/wiederholung-wahrheit` (`src/lib/deep-dives.ts`, `relatedStage: 1`) | „Die ganze Erklärung inkl. Beleg-Test gibt's im Blog – Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Welche Aussage glaubst du vor allem, weil du sie oft gehört hast?" + Mini-Übung „Abend-Reflexion" | `src/lib/practices.ts`, Slug **`abend-reflexion`** (Kategorie „Rituale", 5–10 Minuten, `relatedStage: 3`) → Route `/mitglieder/praxis/abend-reflexion` | „Nimm dir heute Abend die 5 Minuten und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Bloße Wiederholung lässt eine Aussage glaubwürdiger wirken – auch wenn sie falsch ist." | Studien-Kachel `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-08-hell.png` (Creme-Standard; Text + Quelle lt. `docs/marketing/content-data.mjs`, `FACTS key: "08"`, Hasher, Goldstein & Toppino 1977) · Vertiefung `/mitglieder/wissen/wiederholung-wahrheit` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Wiederholung wird zur Wahrheit" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** „Wiederholung" ist eines der vier im Skript selbst
  empfohlenen Einstiegs-Reels der Serie – starker Wochenauftakt.
- **Carousel (Mi, 12:30):** Kein eigener „wer-denkt-hier"-Schritt zum
  Wiederholungseffekt vorhanden; der nächstbeste reale Treffer ist der
  „studien-fakten"-Schritt zu systematischen Denkverzerrungen (Tversky &
  Kahneman) – thematisch verwandt (beide sind vorhersehbare Denkfehler),
  aber nicht exakt. Die eigentliche Tiefe zum Illusory-Truth-Effekt liefert
  der Blogartikel.
- **Story (Fr, 19:00):** Die Abend-Reflexion eignet sich, um unhinterfragt
  übernommene Aussagen des Tages rückblickend zu bemerken.
- **Zitat + Pitch (So, 08:00):** Hier gibt es einen **exakten** Beleg-Treffer:
  Studienfakt 08 beschreibt wortwörtlich den Illusory-Truth-Effekt, der im
  Blogartikel und Deep-Dive behandelt wird.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Wiederholung" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Oft gehört = wahr?", Skript-Abschnitt „10 · Wiederholung wird zur Wahrheit" vorhanden.
- ✅ Blog-Slug `warum-oft-gehoert-sich-wie-wahr-anfuehlt` in `src/lib/blog.ts`, reale Route `/blog/warum-oft-gehoert-sich-wie-wahr-anfuehlt`.
- ✅ Deep-Dive `wiederholung-wahrheit` in `src/lib/deep-dives.ts`, `relatedStage: 1`, reale Route `/mitglieder/wissen/wiederholung-wahrheit`.
- ✅ Praxis `abend-reflexion` in `src/lib/practices.ts`, `relatedStage: 3`, Route `/mitglieder/praxis/abend-reflexion`.
- ⚠️ **Carousel-Lücke:** Kein dedizierter Slide zum Wiederholungs-/Illusory-Truth-Effekt in `docs/carousels/marketing-serien.mjs`. Ausgewichen auf den thematisch verwandten „studien-fakten"-Schritt zu Denkverzerrungen; **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Wiederholungs-Schritt ergänzen.
- ✅ Studien-Kachel `WMDG-Studienfakt-08-hell.png`, Text + Quelle `FACTS key: "08"` aus `docs/marketing/content-data.mjs` – **exakter** Themen-Treffer (Illusory-Truth-Effekt, Hasher/Goldstein/Toppino 1977).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
