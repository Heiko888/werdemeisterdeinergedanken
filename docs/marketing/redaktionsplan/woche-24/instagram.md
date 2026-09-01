# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 24) · Ablenkung
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 24 · Ablenkung

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Keine Lüge. Nur Lärm." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Ablenkung** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „11 · Ablenkung & Überflutung" (Hook im Skript: „Man muss dir die Wahrheit nicht verbergen. Es reicht, dich abzulenken.") | „Deine Aufmerksamkeit ist wertvoll. Schütz sie – wovon hast du dich zuletzt ablenken lassen? Schreib's in die Kommentare." |
| Mittwoch | 12:30 | 🖼️ Carousel | „4 Wege zur mentalen Freiheit – Informationsdiät gegen den Dauer-Lärm" | `docs/carousels/marketing-serien.mjs`, Serie **„4-wege-freiheit"**, Schritt „02 · Informationsdiät" (nennt wörtlich „ständigen Strom aus Nachrichten und Social Media", Hint „bildschirmfrei") als Aufhänger ⚠️ *(deckt Informationsflut, nicht das Empörungs-Karussell im engeren Sinn – kein 1:1-Slide, siehe Material-Check)*, vertieft mit Blog `/blog/ablenkung-keine-luege-nur-laerm` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/ablenkung` (`src/lib/deep-dives.ts`, `relatedStage: 3`) | „Die Frage, die jeden Aufreger entlarvt – ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Wie oft hast du dich heute schon von einem Aufreger ablenken lassen, der dein Leben gar nicht betrifft?" + Mini-Übung „4-6-Atmung" | `src/lib/practices.ts`, Slug **`vier-sechs-atmung`** (Kategorie „Atemübungen", 3 Minuten, `relatedStage: 4`) → Route `/mitglieder/praxis/vier-sechs-atmung` | „Nutz die 4-6-Atmung, bevor du zum nächsten Aufreger scrollst – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „In rund 47 % der Wachzeit ist unser Geist nicht bei der Sache – und dann unglücklicher." | Studien-Kachel `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-01-hell.png` (Creme-Standard; Text + Quelle lt. `docs/marketing/content-data.mjs`, `FACTS key: "01"`, Killingsworth & Gilbert, Harvard 2010) · Vertiefung `/mitglieder/wissen/ablenkung` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Ablenkung & Überflutung" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Reel-Hook „Keine Lüge. Nur Lärm." fasst den
  gesamten Mechanismus in vier Worten zusammen und eignet sich als
  scharfer Wochenauftakt.
- **Carousel (Mi, 12:30):** Kein Slide zum Empörungs-Karussell selbst,
  aber der „Informationsdiät"-Schritt aus „4-wege-freiheit" adressiert
  denselben Grundhebel (Reizflut eindämmen statt sie ungefiltert
  aufzunehmen) mit konkreter Handlungsanweisung.
- **Story (Fr, 19:00):** Die 4-6-Atmung ist „unauffällig genug für den
  Alltag" und lässt sich genau in dem Moment einsetzen, in dem ein neuer
  Aufreger im Feed erscheint – bevor er die volle Aufmerksamkeit zieht.
- **Zitat + Pitch (So, 08:00):** Der Mind-Wandering-Fakt (47 %) war in
  Woche 14 nur ein verwandter Treffer für Reizüberflutung – für Ablenkung
  ist er der eigentlich exakte, literale Beleg.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Ablenkung" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Keine Lüge. Nur Lärm.", Skript-Abschnitt „11 · Ablenkung & Überflutung" in `docs/skripte/reels/mentale-selbstverteidigung.md` vorhanden.
- ✅ Blog-Slug `ablenkung-keine-luege-nur-laerm` in `src/lib/blog.ts`, reale Route `/blog/ablenkung-keine-luege-nur-laerm`.
- ✅ Deep-Dive `ablenkung` in `src/lib/deep-dives.ts`, `relatedStage: 3`, reale Route `/mitglieder/wissen/ablenkung`.
- ✅ Praxis `vier-sechs-atmung` in `src/lib/practices.ts`, `relatedStage: 4`, Route `/mitglieder/praxis/vier-sechs-atmung`.
- ⚠️ **Carousel-Lücke:** `docs/carousels/marketing-serien.mjs` enthält keinen dedizierten Slide zu „Ablenkung" (Empörungs-Karussell). Der Schritt „Informationsdiät" (Serie „4-wege-freiheit") ist der inhaltlich nächstliegende reale Slide. **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Ablenkungs-Schritt ergänzen.
- ✅ Studien-Kachel `WMDG-Studienfakt-01-hell.png` (`FACTS key: "01"`) – **Hinweis:** wurde bereits Woche 14 (Reizüberflutung) als nur verwandter Treffer genutzt; für Ablenkung (Mind-Wandering) ist dies der eigentlich exakte Beleg.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
