# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 14) · Reizüberflutung
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 14 · Reizüberflutung

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Dein Gehirn im Daueralarm." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Reizüberflutung** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „16 · Reizüberflutung & Alarmbereitschaft" (Hook im Skript: „Dein Gehirn ist im Daueralarm. Und im Alarm denkst du schlechter.") – eines der vier vom Skript empfohlenen Einstiegs-Reels. | „Ruhe ist keine Zeitverschwendung – folge für mehr." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Warnsignal starke Emotion" | `docs/carousels/marketing-serien.mjs`, Serie **„wer-denkt-hier"**, Liste „Warnsignale", Item „Starke Emotion – Angst oder Empörung schalten dein kritisches Denken aus" als Aufhänger ⚠️ *(kein 1:1-Slide zu „Reizüberflutung", siehe Material-Check)*, vertieft mit Blog `/blog/reizueberflutung-warum-dein-gehirn-nicht-abschaltet` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/reizueberflutung` (`src/lib/deep-dives.ts`, `relatedStage: 4`) | „Die ganze Erklärung inkl. Übungen gibt's im Blog – Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Woran merkst du bei dir selbst, dass dein Denken gerade von ‚abwägen' auf ‚nur noch reagieren' umgeschaltet hat?" + Mini-Übung „Verlängertes Ausatmen" | `src/lib/practices.ts`, Slug **`verlaengertes-ausatmen`** (Kategorie „Atemübungen", 3–5 Minuten, `relatedStage: 4`) → Route `/mitglieder/praxis/verlaengertes-ausatmen` – exakt die Technik, die Blog & Deep-Dive selbst empfehlen. | „Probier die Atemübung jetzt 2 Minuten und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „In rund 47 % der Wachzeit ist unser Geist nicht bei der Sache – und dann unglücklicher." | Studien-Kachel `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-01-hell.png` (Creme-Standard; Text + Quelle lt. `docs/marketing/content-data.mjs`, `FACTS key: "01"`, Killingsworth & Gilbert, Harvard 2010) · Vertiefung `/mitglieder/wissen/reizueberflutung` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Reizüberflutung & Alarmbereitschaft" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** „Reizüberflutung" ist eines der vier im Skript
  empfohlenen Einstiegs-Reels und schließt die Serie thematisch rund.
- **Carousel (Mi, 12:30):** Kein eigener „wer-denkt-hier"-Schritt zur
  Reizüberflutung; das Warnsignal „Starke Emotion" derselben Serie ist
  inhaltlich am nächsten (Emotion/Alarm schaltet kritisches Denken aus).
  Tiefe liefert der Blogartikel mit den zwei Stressreaktionen.
- **Story (Fr, 19:00):** Bewusst die Praxis gewählt, die Blog **und**
  Deep-Dive selbst als Sofortmaßnahme nennen („länger aus- als einatmen,
  das signalisiert dem Körper Sicherheit") – direkte 1:1-Anwendung des
  gelesenen Wissens.
- **Zitat + Pitch (So, 08:00):** Studienfakt 01 (Mind-Wandering, Harvard
  2010) ist thematisch verwandt (Aufmerksamkeit/Unruhe), aber kein Fakt
  über Reizüberflutung im engeren Sinn – siehe Material-Check.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Reizüberflutung" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Dein Gehirn im Daueralarm", Skript-Abschnitt „16 · Reizüberflutung & Alarmbereitschaft" vorhanden.
- ✅ Blog-Slug `reizueberflutung-warum-dein-gehirn-nicht-abschaltet` in `src/lib/blog.ts`, reale Route `/blog/reizueberflutung-warum-dein-gehirn-nicht-abschaltet`.
- ✅ Deep-Dive `reizueberflutung` in `src/lib/deep-dives.ts`, `relatedStage: 4`, reale Route `/mitglieder/wissen/reizueberflutung`.
- ✅ Praxis `verlaengertes-ausatmen` in `src/lib/practices.ts`, `relatedStage: 4`, Route `/mitglieder/praxis/verlaengertes-ausatmen` – deckt sich inhaltlich exakt mit der im Blogartikel empfohlenen Sofortmaßnahme.
- ⚠️ **Carousel-Lücke:** Kein dedizierter Slide zu „Reizüberflutung" in `docs/carousels/marketing-serien.mjs`. Ausgewichen auf das Warnsignal „Starke Emotion" der Serie „wer-denkt-hier"; **Empfehlung an den Themen-Strategen/Carousel-Team:** eigenen Reizüberflutungs-Schritt ergänzen (z. B. als 6. Slide der Serie „studien-fakten" oder als Erweiterung von „wer-denkt-hier").
- ⚠️ Studien-Kachel `WMDG-Studienfakt-01-hell.png` (`FACTS key: "01"`) ist ein **thematisch verwandter, aber nicht exakter** Treffer (Mind-Wandering statt Reizüberflutung im engeren Sinn) – bewusst gewählt, da kein Fakt zu Cortisol/Alarmbereitschaft unter den 14 hinterlegten Karten existiert.
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
