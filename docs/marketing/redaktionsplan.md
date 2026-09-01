# Redaktionsplan – Woche 1 (Start: Die 7 Stufen)

> **Prinzip:** Ein Wochenthema, alle Kanäle gleichzeitig. Instagram, Facebook,
> LinkedIn und YouTube spielen dieselbe Kernidee – jeweils im Format, das auf dem
> Kanal am besten funktioniert. So entsteht aus **einer** Idee ein **ganzer**
> Wochen-Content, und die Botschaft wird über die Woche hinweg wiederholt vertieft.

Dieser Plan zeigt **Woche 1** als komplett durchgeplante, von den vier
Kanal-Planern (instagram-planer, facebook-planer, linkedin-planer,
youtube-planer) final ausgearbeitete Woche. Der Einstieg beginnt bewusst
**sanft mit den 7 Stufen** (der eigentlichen Programm-Reise), nicht mit
gesellschaftskritischen „harten" Themen – diese kommen später als vertiefender
Block (siehe Themen-Backlog).

> **Korrektur (vom instagram-planer verifiziert):** Der Blog-Slug
> `drei-muster-die-dich-unbewusst-steuern` liegt real unter **`/blog/…`**
> (Route `src/app/blog/[slug]/page.tsx`), **nicht** unter `/wissen/blog/…`. Alle
> Blog-Links unten in diesem Plan verwenden den korrekten Pfad
> `/blog/drei-muster-die-dich-unbewusst-steuern`; der Themen-Backlog wurde
> entsprechend annotiert.
>
> Quelle der einzelnen Kanalpläne: `docs/marketing/redaktionsplan/instagram.md`,
> `docs/marketing/redaktionsplan/facebook.md`,
> `docs/marketing/redaktionsplan/linkedin.md`,
> `docs/marketing/redaktionsplan/youtube.md`.

- **Frequenz (fokussiert / nachhaltig):** Instagram 4× · Facebook 3× · LinkedIn 3× · YouTube 1×
- **Wochen-Dramaturgie:** Aufmerksamkeit → Aha → Anwenden → Angebot (Pitch)
- **Alle Inhalte stammen aus vorhandenem Projekt-Material** (Reels, Blog, Vertiefungen, Zitate, Carousels, Stufen-Lektionen).

---

## Content-Säulen (woraus die Posts entstehen)

| Säule | Quelle im Projekt | Wird zu … |
|---|---|---|
| **Reels / Kurzskripte** | `src/lib/reels.ts` · `docs/skripte/reels/` (98 Skripte, 6 Serien) | IG-Reel, YT-Short, FB-Reel |
| **7 Stufen (Lektionen)** | `/mitglieder/stufe/N` · `content/pdf/stufe-N-lektion.pdf` | Carousel, YT-Video, Pitch-Ziel |
| **Blog / Langtext** | `src/lib/blog.ts` (29 Artikel) | Blog-Link, LinkedIn-Textbeitrag, YT-Video-Skript |
| **Vertiefungen / Deep-Dives** | `src/lib/deep-dives.ts` · `content/pdf/vertiefung-*.pdf` (31) | Carousel, YT-Video, Pitch (Mitgliederbereich) |
| **Praxis-Übungen** | `src/lib/practices.ts` (15) | Story-Übung, Reel, Mini-Practice-Post |
| **Zitate / Studien** | `docs/marketing/zitate/` (1x1, 4x5, 9x16) | Zitat-Post, Story, Beweis-/Proof-Post |
| **Wissensdatenbank** | `content/wissensdatenbank/` (27 Artikel) | Faktenkarten, Karussell-Slides, YT-Kapitel |

---

## Format-Legende

| Kürzel | Format | Zweck |
|---|---|---|
| 🎬 **Reel** | Kurzvideo 9:16 (15–45 s) | Reichweite, Hook, Erstkontakt |
| 🖼️ **Carousel** | Feed-Beitrag, mehrere Slides (4:5) | Aha-Moment, Erklärung, Speicherbar |
| 📝 **Beitrag** | Text-/Bild-Post (Feed) | Nachdenken, Diskussion, Blog-Verweis |
| 📚 **Story** | Story-Serie (9:16, flüchtig) | Interaktion (Umfrage/Quiz), Nähe |
| ▶️ **Video** | YouTube-Langform (5–12 min) | Tiefe, SEO, Autorität |
| ⚡ **Short** | YouTube-Short (< 60 s) | YT-Reichweite (Reel-Zweitverwertung) |
| 🎯 **Pitch** | Soft-CTA: E-Book / Mitgliedschaft / Stufe | Conversion, Leads |
| 💬 **Zitat/Studie** | Zitat- oder Studienkarte | Beweis, Teilbarkeit, Ruhepunkt |

---

## Wochenthema der Muster-Woche (Woche 1)

### 🌀 „Stufe 1 · Autopilot – Wie oft entscheidest du wirklich?"
**Serie:** Die 7 Stufen · **Ziel:** Neugier auf die eigene Gedankenwelt wecken und in E-Book / Stufe 1 leiten. Sanfter, alltagsnaher Einstieg.

**Kernbotschaft:** Wir treffen viel weniger bewusste Entscheidungen, als wir glauben – der Großteil läuft auf Autopilot. Der erste Schritt ist, das überhaupt zu bemerken.

**Verfügbares Material zu diesem Thema:**
- 🎬 Reel-Skript „Autopilot" (Varianten A/B/C) → `docs/skripte/reels/stufen.md` (`src/lib/reels.ts`, Serie „stufen")
- 🖼️ Carousel „Bis zu 60.000 Gedanken am Tag" → `docs/carousels/marketing-serien.mjs` (Serie `60000-gedanken`); Carousel-Slide „01 · Autopilot – Du wirst gelebt" → `docs/carousels/stufen-ueberblick.mjs`
- 📝 Blog „Drei Muster, die dich unbewusst steuern" → **`/blog/drei-muster-die-dich-unbewusst-steuern`** (korrigierter Pfad, s. Hinweis oben; `src/lib/blog.ts`)
- 📚 Deep-Dive „Automatische Gedanken" → `/mitglieder/wissen/automatische-gedanken`
- 📘 Lektion „Stufe 1 · Autopilot" → `/mitglieder/stufe/1` · PDF `content/pdf/stufe-1-lektion.pdf` (+ `stufe-1-uebungen.pdf`)
- 🧘 Praxis „Der Autopilot-Check" → `src/lib/practices.ts` (`autopilot-check`, `relatedStage: 1`)
- 💬 Zitat-Karten (Creme `-hell.png` als Standard) → `docs/marketing/zitate/1x1/WMDG-Zitat-04-hell.png` (Sonntags-Pitch) · `docs/marketing/zitate/1x1/WMDG-Zitat-01-hell.png` (Facebook-Community-Post)
- 🎯 Funnel: E-Book „Die 7 Stufen kompakt" → `/#ebook` · Stufe 1 → `/mitglieder/stufe/1`

---

## Tagesplan (Mo–So)

> Quelle je Zeile: der jeweilige Kanal-Teilplan (s. o.). Zeiten/Formate 1:1 aus
> den vier Kanal-Plänen übernommen, hier nur nach Wochentag sortiert und
> zusammengeführt.

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Ich hab mal einen Tag lang mitgezählt, wie oft ich wirklich entscheide." (Reel-Serie „stufen", Topic Autopilot, Variante A) | `src/lib/reels.ts` (Serie „stufen") · Skript `docs/skripte/reels/stufen.md`, Abschnitt „01 · Autopilot — Variante A" | Folgen · „Speichern" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Gleiches Reel als Cross-Post + Kontext-Text: der Autopilot spart Energie, wird aber zum Problem, wenn er wiederholt, was man längst nicht mehr will. | s. IG-Reel (Mo) | „Mehr zu Stufe 1 in der Lektion" → `/mitglieder/stufe/1` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Drei Muster laufen in fast jedem Team unbewusst mit – und sie entscheiden öfter als jeder Meeting-Beschluss." Die drei Blog-Muster (ständiger Beweiser, Harmonie um jeden Preis, Kontrolle als Sicherheit) ins Arbeitsleben übersetzt. | Blog `/blog/drei-muster-die-dich-unbewusst-steuern` (`src/lib/blog.ts`, Zeilen 309–345) | Kommentar-Frage: „Welches der drei Muster erkennst du in deinem Arbeitsalltag wieder?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Drei innere Muster laufen unbewusst mit und bestimmen, wie wir entscheiden und fühlen – bevor wir es merken. | Blog `/blog/drei-muster-die-dich-unbewusst-steuern` | „Ganzen Artikel lesen" → `/blog/drei-muster-die-dich-unbewusst-steuern` |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „Bis zu 60.000 Gedanken am Tag – wie viele sind wirklich deine?" Vier Schritte zurück zur bewussten Wahl, zugespitzt auf Meetings/Priorisierung. | Carousel-Serie `60000-gedanken` in `docs/carousels/marketing-serien.mjs` (Zeilen 29–60) | „Speichern für die nächste Entscheidung, die Autopilot war." (kein Link, Save/Share) |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Autopilot – du wirst gelebt: 3 Muster, die gerade für dich entscheiden." Vertiefung mit Blog + Deep-Dive. | Carousel-Slide „01 · Autopilot" (`docs/carousels/stufen-ueberblick.mjs`) + Blog `/blog/drei-muster-die-dich-unbewusst-steuern` + Deep-Dive `/mitglieder/wissen/automatische-gedanken` | „Den ganzen Artikel gibt's im Blog – Link in Bio. Speichern, falls du dich gerade selbst erkennst." |
| **Mi** | 17:00 | YouTube | ▶️ Video | Hauptvideo (Richtwert 6–8 min): „Autopilot: Warum du oft gar nicht selbst entscheidest (Stufe 1)." Skript aus Blog + Deep-Dive + Stufe-1-Lektion, Praxisteil am Ende. | Blog `drei-muster-die-dich-unbewusst-steuern` + Deep-Dive `automatische-gedanken` + Lektion `/mitglieder/stufe/1` (PDF `content/pdf/stufe-1-lektion.pdf`) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Der Weg vom Autopilot zur bewussten Entscheidung beginnt nicht mit einem neuen Zeitmanagement-System, sondern mit einer Übung, die 2 Minuten dauert." Stellt den Autopilot-Check vor, verweist aufs E-Book. | Praxis `autopilot-check` (`src/lib/practices.ts`) · Lektion `/mitglieder/stufe/1` + PDF `content/pdf/stufe-1-lektion.pdf` · Deep-Dive `automatische-gedanken` | „Kostenloses E-Book sichern" → `/#ebook`; für Registrierte: „Lektion 1 direkt" → `/mitglieder` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Diese eine Frage entlarvt deinen Autopiloten" – Der Autopilot-Check (30 Sek.), identisch zum IG/FB-Reel-Thema der Woche, Variante C. | Reel-Serie „stufen", Topic Autopilot, Variante C (`src/lib/reels.ts`) · Skript `docs/skripte/reels/stufen.md`, Zeile 67–84 | „Ganzes Video verlinkt oben ↑ / Playlist ‚Die 7 Stufen'" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | Zitatkarte „automatische Bewertung" + Kontext (automatische Gedanken als blitzschnelle, ungefragte Urteile). Community-Frage: „Welcher automatische Gedanke meldet sich bei dir am häufigsten?" | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-01-hell.png` (Creme) · Bezug: Deep-Dive `automatische-gedanken`, Praxis `autopilot-check` | Kommentiere deine Antwort · Mini-Übung „Autopilot-Check" (Einstieg über `/#ebook`) |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Ehrlich – bist du gerade im Autopilot oder bewusst dabei?" + Mini-Übung „Der Autopilot-Check". | Praxis `autopilot-check` (`src/lib/practices.ts`, Kategorie „Rituale", 2 Min., `relatedStage: 1`) → `/mitglieder/praxis/autopilot-check` | „Probier den 2-Minuten-Check jetzt und antworte auf die Umfrage." |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Raus aus dem Autopilot – rein in echte innere Klarheit." Zitat-Kachel + Verweis auf Lektion & E-Book. | Zitat-Kachel `docs/marketing/zitate/1x1/WMDG-Zitat-04-hell.png` (Creme; Text-Quelle `docs/marketing/content-data.mjs`, `key: "04"`) · Lektion `/mitglieder/stufe/1` + PDF `content/pdf/stufe-1-lektion.pdf` | „Hol dir das kostenlose E-Book – Link in Bio (`/#ebook`) → volle Stufe 1 in der Mitgliedschaft (`/mitglieder`)." |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant (fokussierte Stufe hält Sa/So bewusst frei; kein Kanal-Plan hat einen Sa-Slot vorgesehen). | — | — |

**Zusammenfassung Frequenz (Stufe „fokussiert", exakt eingehalten):**
Instagram 4 Posts (Mo Reel, Mi Carousel, Fr Story, So Zitat+Pitch) · Facebook 3 (Mo Reel-Crosspost, Mi Beitrag, Fr Zitat+Community) · LinkedIn 3 (Di Beitrag, Mi Carousel, Do Pitch) · YouTube 1 Video + 1 Short (Mi Video, Do Short). **Gesamt: 12 Postings.**

Tagesmix: Mo (Reichweite/Hook auf IG+FB), Di (LinkedIn allein, Berufsbezug), Mi
gebündelt als Wochenmitte-„Aha"-Tag (FB-Text 08:00, LI-Carousel 08:15,
IG-Carousel 12:30, YT-Video 17:00 – bewusst zeitlich gestaffelt, kein
Überschneiden), Do (LinkedIn-Pitch morgens, YT-Short mittags – „Anwenden" und
Vertiefung), Fr (FB-Zitat abends, IG-Story abends – Wochenausklang/Community),
So (IG-Zitat+Pitch morgens – ruhiger Wochenabschluss mit Funnel). Sa bleibt
frei, da kein Kanal-Plan hierfür einen Slot vorsieht.

---

## Wochen 2–7 (Kurzform je Stufe)

Gleiche Tagesstruktur wie Woche 1 (Mo Reel · Di LI-Text + IG-Carousel · Mi FB-Blog + LI-Carousel + YT-Video/Short · Do IG-Story-Übung · Fr Pitch + Zitate). Nur die Bausteine wechseln. Reel jeweils aus Serie *stufen* (`docs/skripte/reels/stufen.md`), Carousel je Stufe aus `docs/carousels/stufen-ueberblick.mjs`, Lektion `/mitglieder/stufe/N`.

### Woche 2 · Stufe 2 · Erwachen — „Wer hört zu, wenn du denkst?"
- 🎬 **Reel-Hook:** „Wenn du deine Gedanken hören kannst – wer hört dann eigentlich zu?"
- 🖼️ **Carousel:** „Du bist nicht deine Gedanken" · 📝 **Blog:** `du-bist-nicht-deine-gedanken`
- 📚 **Deep-Dive:** `reiz-reaktions-luecke` · 🧘 **Praxis (Story):** `atembeobachtung`
- ▶️ **Video:** „Erwachen: Der Moment, in dem du dich beim Denken erwischst." · 🎯 **Pitch:** E-Book / `/mitglieder/stufe/2`

### Woche 3 · Stufe 3 · Selbstbeobachtung — „Nicht in jeden Gedanken springen"
- 🎬 **Reel-Hook:** „Ich bin früher in jeden einzelnen Gedanken reingesprungen."
- 🖼️ **Carousel:** „Setz dich ans Ufer" · 📝 **Blog:** `denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt`
- 📚 **Deep-Dive:** `kognitive-verzerrungen` · 🧘 **Praxis (Story):** `innerer-beobachter`
- ▶️ **Video:** „Selbstbeobachtung: Gedanken sehen, ohne mitzuspringen." · 🎯 **Pitch:** E-Book / `/mitglieder/stufe/3`

### Woche 4 · Stufe 4 · Emotionale Reifung — „Fühlen, ohne überflutet zu werden"
- 🎬 **Reel-Hook:** „Ich hab mal auf die Uhr geschaut, wie lang ein schweres Gefühl wirklich dauert."
- 🖼️ **Carousel:** „Fühlen, was ist" · 📝 **Blog:** `gefuehle-benennen-beruhigt-das-gehirn`
- 📚 **Deep-Dive:** `emotionsregulation` · 🧘 **Praxis (Story):** `verlaengertes-ausatmen`
- ▶️ **Video:** „Emotionale Reifung: Fühlen, ohne überflutet zu werden." · 🎯 **Pitch:** E-Book / `/mitglieder/stufe/4`

### Woche 5 · Stufe 5 · Schöpferkraft — „Du schreibst den Code neu"
- 🎬 **Reel-Hook:** „Was du oft denkst, wird zur Straße in deinem Kopf. Und das ist wörtlich gemeint."
- 🖼️ **Carousel:** „Du schreibst den Code neu" · 📝 **Blog:** `neuroplastizitaet-warum-dein-gehirn-formbar-ist`
- 📚 **Deep-Dive:** `neuroplastizitaet` · 🧘 **Praxis (Story):** `morgen-ausrichtung`
- ▶️ **Video:** „Schöpferkraft: Wie du neue Bahnen im Kopf anlegst." · 🎯 **Pitch:** E-Book / `/mitglieder/stufe/5`

### Woche 6 · Stufe 6 · Innere Ausrichtung — „Kopf, Herz und Handeln"
- 🎬 **Reel-Hook:** „Dein Kopf ist ein brillanter Diener. Aber ein ziemlich schlechter Chef."
- 🖼️ **Carousel:** „Kopf, Herz und Handeln" · 📝 **Blog:** `warum-willenskraft-ueberschaetzt-wird`
- 📚 **Deep-Dive:** `werte-und-ziele` · 🧘 **Praxis (Story):** `herz-kohaerenz`
- ▶️ **Video:** „Innere Ausrichtung: Wenn Kopf, Herz und Handeln zusammenfinden." · 🎯 **Pitch:** E-Book / `/mitglieder/stufe/6`

### Woche 7 · Stufe 7 · Meisterschaft — „Was nach den 7 Stufen kommt"
- 🎬 **Reel-Hook:** „Niemand ist für immer Meister. Ich auch nicht."
- 🖼️ **Carousel:** „Meister deiner Gedanken" · 📝 **Blog:** `wie-frei-ist-unser-geist`
- 📚 **Deep-Dive:** `integration-und-weitergabe` · 🧘 **Praxis (Story):** `box-breathing`
- ▶️ **Video:** „Meisterschaft: Was nach den 7 Stufen kommt." · 🎯 **Pitch:** E-Book / `/mitglieder/stufe/7`

> Jede Stufe hat 3 Reel-Varianten (A/B/C) in `src/lib/reels.ts` – für Wiederholung/AB-Tests über mehrere Wochen. Der interaktive Kalender zeigt alle 7 Wochen (oben umschaltbar).

---

## Woche 8–10 · Block B — Praxis & Wissenschaft (ruhigere Phase)

Gleiche Tagesstruktur, aber ruhigerer, stärker praxis-/studienbasierter Ton. Kein Stufen-Lektion-Bezug; Pitch-Ziel ist E-Book bzw. `/mitglieder/praxis`. Reels aus den Serien *praxis* / *wissenschaft*, Carousels aus `docs/carousels/marketing-serien.mjs` (`4-wege-freiheit`, `studien-fakten`).

### Woche 8 · Atmung & Nervensystem — „Der schnellste Weg zur Ruhe"
- 🎬 **Reel** (Serie *praxis*): „Ausatmen länger als einatmen – und dein Nervensystem schaltet um."
- 🖼️ **Carousel:** „4 Wege zur mentalen Freiheit" (`4-wege-freiheit`) · 📝 **Blog:** `gefuehle-benennen-beruhigt-das-gehirn`
- 📚 **Deep-Dive:** `muster-und-koerper` · 🧘 **Praxis (Story):** `vier-sechs-atmung` (auch `box-breathing`)
- ▶️ **Video:** „Atmung & Nervensystem: 3 Übungen, die dich in 2 Minuten runterbringen." · 🎯 **Pitch:** E-Book / `/mitglieder/praxis`

### Woche 9 · Was Meditation im Gehirn verändert — „Was wirklich passiert, wenn du meditierst"
- 🎬 **Reel** (Serie *wissenschaft*): „Fast die Hälfte des Tages bist du gedanklich woanders."
- 🖼️ **Carousel:** „Studien-Fakten" (`studien-fakten`) · 📝 **Blog:** `was-meditation-im-gehirn-veraendert`
- 💬 **Studien-Zitate:** `docs/marketing/zitate/studien-4x5` · 🧘 **Praxis (Story):** `atembeobachtung`
- ▶️ **Video:** „Was Meditation wirklich im Gehirn verändert (laut Forschung)." · 🎯 **Pitch:** E-Book / `/mitglieder/praxis`

### Woche 10 · Der Placebo-Effekt / Erwartung — „Wie eine Erwartung deinen Körper verändert"
- 🎬 **Reel** (Serie *wissenschaft*): „Eine Überzeugung verändert echte Körperprozesse."
- 🖼️ **Carousel:** „Studien-Fakten" (`studien-fakten`) · 📝 **Blog:** `der-placebo-effekt-wie-erwartung-wirkt`
- 📚 **Deep-Dive:** `muster-und-koerper` · 🧘 **Praxis (Story):** `morgen-ausrichtung`
- ▶️ **Video:** „Der Placebo-Effekt: Wie Erwartung echte Körperprozesse steuert." · 🎯 **Pitch:** E-Book / `/mitglieder`

> Danach folgt **Block C · Mentale Selbstverteidigung** (ab Woche 11): Framing, Filterblase … Propaganda – erst, wenn die Community die Grundlagen kennt.

---

## Woche 11–20 · Block C — Mentale Selbstverteidigung (vertiefend)

Gleiche Tagesstruktur. Reels aus Serie *selbstverteidigung* (`docs/skripte/reels/mentale-selbstverteidigung.md`), Carousel „Wer denkt hier eigentlich?" (`wer-denkt-hier`), Pitch-Ziel jeweils die Vertiefung `/mitglieder/wissen/<slug>`. Erst hier, weil die Community jetzt die Grundlagen (Block A/B) kennt.

| Woche | Thema | Reel-Hook | Blog-Slug | Deep-Dive / Pitch |
|---|---|---|---|---|
| 11 | **Framing** | „Ein Wort ändert alles" | `framing-wie-ein-wort-deine-meinung-macht` | `framing` |
| 12 | **Filterblase / Algorithmen** | „Dein Feed ≠ die Welt" | `filterblase-warum-dein-feed-nicht-die-welt-ist` | `algorithmen` |
| 13 | **Wiederholung = Wahrheit?** | „Oft gehört = wahr?" | `warum-oft-gehoert-sich-wie-wahr-anfuehlt` | `wiederholung-wahrheit` |
| 14 | **Reizüberflutung** | „Dein Gehirn im Daueralarm" | `reizueberflutung-warum-dein-gehirn-nicht-abschaltet` | `reizueberflutung` |
| 15 | **Werbung & Mangel** | „Sie verkauft dir den Mangel" | `werbung-und-der-kuenstliche-mangel` | `werbung-und-mangel` |
| 16 | **Gruppendruck** | „Laut ≠ Mehrheit" | `gruppendruck-und-die-schweigespirale` | `gruppendruck` |
| 17 | **Autoritätshörigkeit** | „Titel ≠ Wahrheit" | `wann-vertrauen-zu-blindem-gehorsam-wird` | `autoritaetshoerigkeit` |
| 18 | **Propaganda** | „Ohne eine einzige Lüge" | `propaganda-erkennst-du-nicht-an-lauten-parolen` | `propaganda` |
| 19 | **Kognitive Dissonanz** | „Warum du wegschaust" | `warum-du-verteidigst-was-dir-schadet` | `kognitive-dissonanz` |
| 20 | **Identität & Meinung** | „Meinung – oder hat sie dich?" | `hast-du-eine-meinung-oder-hat-sie-dich` | `identitaet-und-meinung` |
| 21 | **Sprache & Etiketten** | „Ein Wort beendet jede Debatte" | `sprache-und-etiketten-wie-ein-etikett-das-denken-beendet` | `sprache-und-etiketten` |
| 22 | **Medien-Agenda** | „Nicht WAS – sondern WORÜBER" | `medien-agenda-nicht-was-sondern-worueber` | `medien-agenda` |
| 23 | **Angst-Steuerung** | „Angst macht dich lenkbar" | `angst-steuerung-warum-angst-dich-lenkbar-macht` | `angst-steuerung` |
| 24 | **Ablenkung** | „Keine Lüge. Nur Lärm." | `ablenkung-keine-luege-nur-laerm` | `ablenkung` |
| 25 | **Normalisierung** | „War doch schon immer so?" | `normalisierung-war-doch-schon-immer-so` | `normalisierung` |
| 26 | **Bildmacht** | „Ein Bild ist kein Beweis" | `bildmacht-ein-bild-ist-kein-beweis` | `bildmacht` |

Story-Übung je Woche meist „Der innere Beobachter" (`innerer-beobachter`) bzw. „Der Autopilot-Check" (`autopilot-check`). LinkedIn-Beiträge mit Berufsbezug (Meetings, Führung, Entscheidungen). Details/Formulierungen: interaktiver Kalender (Woche 11–26).

> **Woche 21–26** haben jetzt eigene Blogartikel (`src/lib/blog.ts`, Kategorie
> „Mentale Selbstverteidigung", als geplante Beiträge vordatiert). Die FB-/
> LinkedIn-Langform-Posts verlinken den Blog, die Vertiefung bleibt das Pitch-Ziel.

---

## Der Fahrplan (empfohlene Reihenfolge)

Die Tagesstruktur bleibt jede Woche gleich – nur das Wochenthema wechselt. Erst
die 7 Stufen, dann ruhigere Praxis-/Wissenschafts-Wochen, dann die tiefere Serie
Mentale Selbstverteidigung:

| Woche | Thema | Block |
|---|---|---|
| **1** | **Stufe 1 · Autopilot** *(diese Muster-Woche)* | Die 7 Stufen |
| 2 | Stufe 2 · Erwachen | Die 7 Stufen |
| 3 | Stufe 3 · Selbstbeobachtung | Die 7 Stufen |
| 4 | Stufe 4 · Emotionale Reifung | Die 7 Stufen |
| 5 | Stufe 5 · Schöpferkraft | Die 7 Stufen |
| 6 | Stufe 6 · Innere Ausrichtung | Die 7 Stufen |
| 7 | Stufe 7 · Meisterschaft | Die 7 Stufen |
| 8–10 | Atmung · Meditation · Placebo/Erwartung | Praxis & Wissenschaft |
| ab 11 | Framing, Filterblase, … Propaganda | Mentale Selbstverteidigung |

> Vollständige Material-Zuordnung je Thema: `docs/marketing/redaktionsplan/themen-backlog.md`.
> Pro Stufe stehen 3 Reel-Varianten (A/B/C) bereit – gut für Wiederholung/AB-Tests.

---

## Wiederverwendungs-Logik (1 Idee → viele Formate)

```
                 ┌── 🎬 IG-Reel (Mo 18:00)
                 ├── 🎬 FB-Reel Crosspost (Mo 18:00)
   1 Kernidee ──▶├── 📝 LI-Beitrag (Di 07:30, Berufsbezug)
   („Autopilot") ├── 📝 FB-Blog-Anriss (Mi 08:00) ─┐ gleicher Blog,
                 ├── 🖼️ LI-Carousel (Mi 08:15)     │ anderer Ton je Kanal
                 ├── 🖼️ IG-Carousel (Mi 12:30)     ─┘ (60.000-Gedanken-Serie / Stufen-Slide)
                 ├── ▶️ YT-Video (Mi 17:00, Blog + Stufe-1-Lektion + Deep-Dive als Skript)
                 ├── 🎯 LI-Pitch (Do 07:45, Autopilot-Check + E-Book)
                 ├── ⚡ YT-Short (Do 12:00, Autopilot-Check)
                 ├── 💬 FB-Zitat + Community-Frage (Fr 18:00)
                 ├── 📚 IG-Story (Fr 19:00, Autopilot-Check + Umfrage)
                 └── 💬 IG-Zitat + 🎯 Pitch (So 08:00, E-Book / Stufe 1)
```

Ein einziges Wochenthema erzeugt so **12 Postings** über 4 Kanäle – ohne 12-mal neue
Inhalte zu erfinden.

---

*Erstellt aus vorhandenem Projekt-Material. Woche 1–20 sind vollständig geplant –
Block A · 7 Stufen (1–7), Block B · Praxis & Wissenschaft (8–10) und Block C ·
Mentale Selbstverteidigung (11–20). Damit ist rund ein halbes Jahr Content
kanalübergreifend durchgeplant. Für weitere Themen (z. B. Sprache & Etiketten,
Medien-Agenda, Angst-Steuerung) oder einen neuen Zyklus: `/redaktionsplan`.*
