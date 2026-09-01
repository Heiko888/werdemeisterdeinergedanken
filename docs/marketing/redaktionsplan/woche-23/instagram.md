# Instagram – Wochenplan

**Wochenthema:** Block C – Mentale Selbstverteidigung (Woche 23) · Angst-Steuerung
**Frequenz-Stufe:** fokussiert → **4 Posts** (keine täglichen Stories in dieser Stufe)
**Dramaturgie der Woche:** Aufmerksamkeit → Aha → Anwenden → Angebot

> Alle Quellen unten wurden gegen den Code geprüft (`src/lib/reels.ts`, `src/lib/blog.ts`,
> `src/lib/deep-dives.ts`, `src/lib/practices.ts`, `docs/carousels/marketing-serien.mjs`,
> `docs/marketing/content-data.mjs`, `docs/marketing/zitate/`). Blog-Route real unter
> **`/blog/…`**, Deep-Dive-Route real unter **`/mitglieder/wissen/…`**, Praxis-Route real
> unter **`/mitglieder/praxis/…`**.

## Woche 23 · Angst-Steuerung

| Tag | Uhrzeit | Format | Hook/Titel | Quelle | CTA |
|---|---|---|---|---|---|
| Montag | 18:00 | 🎬 Reel | „Angst macht dich lenkbar." | `src/lib/reels.ts` – Serie **„selbstverteidigung"**, Topic **Angst-Steuerung** · Skript: `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „9 · Angst als Steuerungsmittel" (Hook im Skript: „Ein ängstlicher Mensch ist der einfachste, den man lenken kann.") | „Triff im Alarm keine großen Entscheidungen. Speicher das für den nächsten Krisen-Feed." |
| Mittwoch | 12:30 | 🖼️ Carousel | „Wer denkt hier eigentlich? – Warnsignal Angst" | `docs/carousels/marketing-serien.mjs`, Serie **„wer-denkt-hier"**, Liste „Warnsignale", Item **„Starke Emotion"** (nennt „Angst … schalten dein kritisches Denken aus" wörtlich) als Aufhänger ⚠️ *(kein eigener „Angst-Steuerung"-Vollschritt, dies ist aber der wörtlich passendste Treffer der ganzen Serie, siehe Material-Check)*, vertieft mit Blog `/blog/angst-steuerung-warum-angst-dich-lenkbar-macht` (`src/lib/blog.ts`) und Vertiefung `/mitglieder/wissen/angst-steuerung` (`src/lib/deep-dives.ts`, `relatedStage: 4`) | „Ist die Gefahr wirklich so groß – und der Preis es wert? Ganzer Artikel im Blog, Link in Bio." |
| Freitag | 19:00 | 📚 Story | Umfrage „Wann hat dich zuletzt eine Angst-Schlagzeile zu einer schnellen Reaktion getrieben?" + Mini-Übung „Box Breathing" | `src/lib/practices.ts`, Slug **`box-breathing`** (Kategorie „Atemübungen", 3–5 Minuten, `relatedStage: 6`) → Route `/mitglieder/praxis/box-breathing` | „Probier eine Runde Box Breathing, bevor du auf die nächste Alarm-Meldung reagierst – und antworte auf die Umfrage." |
| Sonntag | 08:00 | 💬 Zitat + 🎯 Pitch | „Ein Gefühl zu benennen dämpft die Amygdala – die Alarmzentrale des Gehirns." | Studien-Kachel `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-02-hell.png` (Creme-Standard; Text + Quelle lt. `docs/marketing/content-data.mjs`, `FACTS key: "02"`, Lieberman et al., UCLA 2007) · Vertiefung `/mitglieder/wissen/angst-steuerung` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → die volle Vertiefung „Angst als Steuerungsmittel" in der Mitgliedschaft (`/mitglieder`)." |

## Rhythmus-Begründung

- **Reel (Mo, 18:00):** Der Reel-Hook „Angst macht dich lenkbar" trifft
  den Kernmechanismus direkt – ein starker, unbequemer Wochenauftakt.
- **Carousel (Mi, 12:30):** Das Warnsignal „Starke Emotion" aus
  „wer-denkt-hier" nennt „Angst" wörtlich als Ausschalter kritischen
  Denkens – dieselbe Zeile diente Woche 14 (Reizüberflutung) nur als
  verwandter Treffer, hier ist sie der eigentlich passende 1:1-Anker.
- **Story (Fr, 19:00):** Box Breathing ist gezielt für „Fokus und
  Gelassenheit unter Druck" gebaut – der direkte Gegenzug zur Verengung,
  die Angst im Kopf auslöst.
- **Zitat + Pitch (So, 08:00):** Der Studienfakt zur Amygdala liefert die
  neurologische Erklärung, warum Benennen der Emotion die Alarmzentrale
  beruhigt – der ideale wissenschaftliche Anker für Angst-Steuerung.

## Material-Check (gegen Code/Ordner geprüft)

- ✅ Reel „Angst-Steuerung" in `src/lib/reels.ts` (Serie „selbstverteidigung"), Hook „Angst macht dich lenkbar", Skript-Abschnitt „9 · Angst als Steuerungsmittel" in `docs/skripte/reels/mentale-selbstverteidigung.md` vorhanden.
- ✅ Blog-Slug `angst-steuerung-warum-angst-dich-lenkbar-macht` in `src/lib/blog.ts`, reale Route `/blog/angst-steuerung-warum-angst-dich-lenkbar-macht`.
- ✅ Deep-Dive `angst-steuerung` in `src/lib/deep-dives.ts`, `relatedStage: 4`, reale Route `/mitglieder/wissen/angst-steuerung`.
- ✅ Praxis `box-breathing` in `src/lib/practices.ts`, `relatedStage: 6`, Route `/mitglieder/praxis/box-breathing`.
- ⚠️ **Carousel-Hinweis:** `docs/carousels/marketing-serien.mjs` enthält keinen eigenen „Angst-Steuerung"-Schritt. Das Warnsignal-Item „Starke Emotion" (Serie „wer-denkt-hier") nennt „Angst" jedoch wörtlich – bereits in Woche 14 verwendet, dort aber nur als verwandter Treffer für Reizüberflutung; hier ist es der eigentlich exakteste vorhandene Anker.
- ✅ Studien-Kachel `WMDG-Studienfakt-02-hell.png`, Text + Quelle `FACTS key: "02"` aus `docs/marketing/content-data.mjs` – **exakter** thematischer Treffer (Affect Labeling dämpft die Amygdala).
- ✅ Funnel `/#ebook` → `/mitglieder` unverändert übernommen.
