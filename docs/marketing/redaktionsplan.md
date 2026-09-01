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

## Wochen 2–7 (vollständig durchgeplant)

Gleiche Grund-Dramaturgie wie Woche 1 (Aufmerksamkeit → Aha → Anwenden →
Angebot), gleiche Frequenz **fokussiert** (IG 4 · FB 3 · LI 3 · YT 1 Video + 1
Short = **12 Postings/Woche**). Nur die inhaltlichen Bausteine wechseln je
Stufe. Reel jeweils aus Serie *stufen* (`src/lib/reels.ts`, Skript
`docs/skripte/reels/stufen.md`), Stufen-Carousel aus
`docs/carousels/stufen-ueberblick.mjs`, Lektion `/mitglieder/stufe/N` + PDF
`content/pdf/stufe-N-lektion.pdf` (+ `-uebungen.pdf`). Quelle je Zeile: die
vier Kanal-Teilpläne unter `docs/marketing/redaktionsplan/woche-N/{instagram,
facebook,linkedin,youtube}.md`.

> **Wichtige Korrektur (Woche 7):** Mehrere Kanal-Planer haben unabhängig
> voneinander vermerkt, dass die im Backlog für Stufe 7 genannte Praxis
> `box-breathing` in `src/lib/practices.ts` tatsächlich `relatedStage: 6`
> trägt (identisch mit `herz-kohaerenz` aus Woche 6), **nicht** `relatedStage:
> 7`. Die tatsächlich zu Stufe 7 passende Praxis ist **`taegliche-rueckkehr`**
> (`src/lib/practices.ts`, Zeile 341–363, `relatedStage: 7`, Zitat
> „Meisterschaft ist kein Zustand, den man erreicht – sondern eine tägliche
> Rückkehr in die eigene Mitte"), die inhaltlich auch enger zum Deep-Dive
> `integration-und-weitergabe` passt. **In diesem Master-Plan und im
> Kalender wird für Woche 7 durchgängig `taegliche-rueckkehr` statt
> `box-breathing` verwendet.**

---

### Woche 2 · Stufe 2 · Erwachen — „Wer hört zu, wenn du denkst?"

**Kernbotschaft:** Wer seine Gedanken bemerken kann, ist offensichtlich mehr
als diese Gedanken – der innere Beobachter ist der erste Schritt aus der
Verschmelzung mit dem eigenen Denken.

**Verfügbares Material:**
- 🎬 Reel „Erwachen" (Varianten A/B) → `src/lib/reels.ts` (Serie „stufen"), Skript `docs/skripte/reels/stufen.md`, Abschnitt „02 · Erwachen"
- 🖼️ Carousel-Slide „02 · Erwachen – Du bist nicht deine Gedanken" → `docs/carousels/stufen-ueberblick.mjs`; für LinkedIn zusätzlich Carousel „Wer denkt hier eigentlich?" (`wer-denkt-hier`) → `docs/carousels/marketing-serien.mjs`
- 📝 Blog „Du bist nicht deine Gedanken" → `/blog/du-bist-nicht-deine-gedanken` (`src/lib/blog.ts`)
- 📚 Deep-Dive „Die Reiz-Reaktions-Lücke" → `/mitglieder/wissen/reiz-reaktions-luecke` (`relatedStage: 2`)
- 📘 Lektion „Stufe 2 · Erwachen" → `/mitglieder/stufe/2` + PDF `content/pdf/stufe-2-lektion.pdf` (+ `-uebungen.pdf`, `vertiefung-reiz-reaktions-luecke.pdf`)
- 🧘 Praxis „Atembeobachtung" → `src/lib/practices.ts` (`atembeobachtung`, `relatedStage: 2`)
- 💬 Zitat-Karten (Creme `-hell.png`) → `WMDG-Zitat-03-hell.png` (Sonntags-Pitch) · `WMDG-Zitat-02-hell.png` (FB-Community-Post)
- 🎯 Funnel: E-Book → `/#ebook` · Stufe 2 → `/mitglieder/stufe/2`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Wenn du deine Gedanken hören kannst – wer hört dann eigentlich zu?" (Erwachen, Variante B) | `src/lib/reels.ts` (Serie „stufen") · `docs/skripte/reels/stufen.md`, „02 · Erwachen — Variante B" | „Folge für die nächste Stufe" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Variante A: „Ich saß im Stau und hab mich zum ersten Mal beim Denken erwischt." Das Bemerken kann selbst kein Gedanke sein. | `src/lib/reels.ts`, Variante A · `docs/skripte/reels/stufen.md` | „Mehr zu Stufe 2 in der Lektion" → `/mitglieder/stufe/2` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Der Kollege sagt einen Satz – und bevor du nachgedacht hast, bist du schon in der Verteidigung." Der innere Beobachter im Meeting. | Blog `/blog/du-bist-nicht-deine-gedanken` (`src/lib/blog.ts`, Zeile 213–264) | Kommentar-Frage: „In welcher Besprechung merkst du am ehesten, wie schnell du reagierst?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Die meisten halten Gedanken für die Wahrheit – dabei gibt es eine Instanz, die sie nur bemerkt. | Blog `/blog/du-bist-nicht-deine-gedanken` | „Ganzen Artikel lesen" → `/blog/du-bist-nicht-deine-gedanken` |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – Remedy-Slide „Zwischen Reiz und Reaktion liegt ein Raum", zugespitzt auf Verhandlungen/Entscheidungen im Job. | Carousel `wer-denkt-hier` in `docs/carousels/marketing-serien.mjs`, Zeilen 91–114 | „Speichern für die nächste Verhandlung unter Druck." |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Erwachen: Du bist nicht deine Gedanken – der Moment, der alles ändert." | Carousel-Slide „02 · Erwachen" (`docs/carousels/stufen-ueberblick.mjs`) + Blog + Deep-Dive `reiz-reaktions-luecke` | „Link in Bio · Speichern" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Wer hört eigentlich zu, wenn du denkst? (Stufe 2: Erwachen)." | Blog `du-bist-nicht-deine-gedanken` + Deep-Dive `reiz-reaktions-luecke` + Lektion `/mitglieder/stufe/2` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Die wichtigste Führungskompetenz ist kein neues Framework – sie dauert fünf Minuten: den eigenen Atem beobachten." | Praxis `atembeobachtung` · Deep-Dive `reiz-reaktions-luecke` · Lektion `/mitglieder/stufe/2` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Wenn du deine Gedanken hören kannst — wer hört dann zu?" (identisch zum IG/FB-Reel, Variante B) | Reel-Serie „stufen", Variante B · `docs/skripte/reels/stufen.md`, Zeile 108–125 | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | Zitatkarte „Raum zwischen Reiz und Reaktion" + Community-Frage: „In welcher Situation ist deine Reiz-Reaktions-Lücke am kleinsten?" | Zitat `WMDG-Zitat-02-hell.png` · Deep-Dive `reiz-reaktions-luecke` | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Kannst du 60 Sekunden lang nur deinem Atem zuhören?" + Mini-Übung „Atembeobachtung". | Praxis `atembeobachtung` → `/mitglieder/praxis/atembeobachtung` | „Probier die Mini-Version + antworte auf die Umfrage." |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Du bist nicht deine Gedanken. Du bist der, der sie bemerkt." | Zitat `WMDG-Zitat-03-hell.png` · Lektion `/mitglieder/stufe/2` | „E-Book laden (/#ebook) → Stufe 2 in der Mitgliedschaft." |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 (Mo Reel, Mi Carousel, Fr Story, So Zitat+Pitch) · FB 3 (Mo Reel-Crosspost, Mi Beitrag, Fr Zitat+Community) · LI 3 (Di Beitrag, Mi Carousel, Do Pitch) · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** Mo Reichweite (IG+FB), Di LinkedIn solo (Berufsbezug), Mi gebündelter Aha-Tag (FB 08:00 → LI 08:15 → IG 12:30 → YT 17:00, zeitlich gestaffelt), Do Anwenden (LI-Pitch + YT-Short), Fr Wochenausklang (FB-Zitat + IG-Story), So ruhiger Abschluss mit Funnel. Sa frei.

---

### Woche 3 · Stufe 3 · Selbstbeobachtung — „Nicht in jeden Gedanken springen"

**Kernbotschaft:** Nicht jeder Gedanke verdient eine Reaktion. Kognitive
Verzerrungen (Verankerung, Verfügbarkeitsheuristik, Bestätigungsfehler)
zeigen, wie systematisch unser Denken die Wirklichkeit verzerrt – wer sie
kennt, kann Abstand gewinnen, statt in jeden Gedanken „reinzuspringen".

**Verfügbares Material:**
- 🎬 Reel „Selbstbeobachtung" (Variante A) → `src/lib/reels.ts`, Skript `docs/skripte/reels/stufen.md`, Abschnitt „03 · Selbstbeobachtung"
- 🖼️ Carousel-Slide „03 · Selbstbeobachtung – Setz dich ans Ufer" → `docs/carousels/stufen-ueberblick.mjs`; LinkedIn zusätzlich „Studien-Fakten" (`studien-fakten`, Fakt „04") → `docs/carousels/marketing-serien.mjs`
- 📝 Blog „Denkfehler: Wie dein Kopf die Wirklichkeit verzerrt" → `/blog/denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` (`src/lib/blog.ts`, Zeile 1143)
- 📚 Deep-Dive „Kognitive Verzerrungen" → `/mitglieder/wissen/kognitive-verzerrungen` (`relatedStage: 3`, `src/lib/deep-dives.ts`, Zeile 162)
- 📘 Lektion „Stufe 3" → `/mitglieder/stufe/3` + PDF `content/pdf/stufe-3-lektion.pdf` (+ `-uebungen.pdf`, `vertiefung-kognitive-verzerrungen.pdf`)
- 🧘 Praxis „Der innere Beobachter" → `src/lib/practices.ts` (`innerer-beobachter`, `relatedStage: 3`, Zeile 87)
- 💬 Studien-Kacheln (Creme) → `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-04-hell.png` (Sonntag) · `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-02-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Stufe 3 → `/mitglieder/stufe/3`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Ich bin früher in jeden einzelnen Gedanken reingesprungen." (Variante A) | `src/lib/reels.ts` · `docs/skripte/reels/stufen.md`, „03 · Selbstbeobachtung — Variante A" | „Folge für die nächste Stufe" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Gleiche Variante A: Gedanken sind wie ein Fluss – der innere Beobachter bleibt am Ufer sitzen und lässt alles vorbeiziehen. | s. IG-Reel (Mo) | „Mehr zu Stufe 3 in der Lektion" → `/mitglieder/stufe/3` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Die erste Zahl in einer Verhandlung entscheidet mehr, als den meisten lieb ist." Verankerung, Verfügbarkeitsheuristik, Bestätigungsfehler im Job. | Blog `/blog/denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` (Zeile 1143–1197) | Kommentar-Frage: „Welchen Denkfehler hast du bei dir selbst erwischt?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Unser Denken ist eher ein Erzähler mit festen Vorlieben als ein neutraler Beobachter der Wirklichkeit. | Blog `/blog/denkfehler-wie-dein-kopf-die-wirklichkeit-verzerrt` | „Ganzen Artikel lesen" |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „Studien-Fakten" – Fakt-Slide „Dein Kopf verzerrt – systematisch" (Tversky & Kahneman 1974), zugespitzt auf Strategie-/Entscheidungsrunden. | Carousel `studien-fakten` in `docs/carousels/marketing-serien.mjs`, Zeilen 117–145 | „Speichern für die nächste Kennzahl ohne Kontext." |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Selbstbeobachtung – Setz dich ans Ufer: 3 Denkfehler, die dich reinziehen." | Carousel-Slide „03 · Selbstbeobachtung" + Blog + Deep-Dive `kognitive-verzerrungen` | „Link in Bio · Speichern, falls dich das gerade ertappt." |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Warum dein Kopf Gedanken für Fakten hält (Stufe 3: Selbstbeobachtung)." | Blog + Deep-Dive `kognitive-verzerrungen` + Lektion `/mitglieder/stufe/3` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Du musst deinen inneren Kritiker nicht zum Schweigen bringen – du musst nur lernen, ihm nicht mehr automatisch zu glauben." | Praxis `innerer-beobachter` · Deep-Dive `kognitive-verzerrungen` · Lektion `/mitglieder/stufe/3` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Nicht in jeden Gedanken springen" (identisch zum IG/FB-Reel, Variante A) | Reel-Serie „stufen", Variante A · `docs/skripte/reels/stufen.md`, Zeile 149–164 | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | Studien-Karte „Denkfehler sind vorhersehbar" (Tversky & Kahneman, 1974, „Science") + Community-Frage: „Welcher Denkfehler ist dein persönlicher Klassiker?" | Studien-Karte `WMDG-Studienfakt-02-hell.png` · Deep-Dive `kognitive-verzerrungen` | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Springst du noch in jeden Gedanken – oder schaust du inzwischen manchmal nur zu?" + Mini-Übung „Der innere Beobachter". | Praxis `innerer-beobachter` → `/mitglieder/praxis/innerer-beobachter` | „Probier die 10-Minuten-Übung + antworte auf die Umfrage." |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Der erste Schritt ist nicht Kontrolle. Es ist Bemerken." | Studien-Kachel `WMDG-Studienfakt-04-hell.png` · Lektion `/mitglieder/stufe/3` | „E-Book laden (/#ebook) → Stufe 3 in der Mitgliedschaft." |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zu Woche 2 (Mo Reichweite, Di LinkedIn solo, Mi gebündelter Aha-Tag, Do Anwenden, Fr/So Wochenausklang). Statt einer Alltags-Zitatkachel wird am Sonntag bewusst eine Studienfakt-Kachel gezeigt, weil sie 1:1 zum Wochenblog (Tversky & Kahneman) passt.

---

### Woche 4 · Stufe 4 · Emotionale Reifung — „Fühlen, ohne überflutet zu werden"

**Kernbotschaft:** Ein Gefühl zu benennen dämpft nachweislich die Amygdala
(Lieberman, UCLA 2007) – Gefühle sind Wellen mit Anfang und Ende, die man
aushalten statt wegdrücken oder von ihnen überflutet werden muss.

**Verfügbares Material:**
- 🎬 Reel „Emotionale Reifung" (Varianten A/B) → `src/lib/reels.ts`, Skript `docs/skripte/reels/stufen.md`, Abschnitt „04 · Emotionale Reifung"
- 🖼️ Carousel-Slide „04 · Emotionale Reifung – Fühlen, was ist" → `docs/carousels/stufen-ueberblick.mjs`; LinkedIn zusätzlich „Studien-Fakten" (Fakt „02" + 47-%-Stat) → `docs/carousels/marketing-serien.mjs`
- 📝 Blog „Warum ein Gefühl zu benennen dein Gehirn beruhigt" → `/blog/gefuehle-benennen-beruhigt-das-gehirn` (`src/lib/blog.ts`, Zeile 1091)
- 📚 Deep-Dive „Emotionsregulation" → `/mitglieder/wissen/emotionsregulation` (`relatedStage: 4`, `src/lib/deep-dives.ts`, Zeile 533)
- 📘 Lektion „Stufe 4" → `/mitglieder/stufe/4` + PDF `content/pdf/stufe-4-lektion.pdf` (+ `-uebungen.pdf`, `vertiefung-emotionsregulation.pdf`)
- 🧘 Praxis „Verlängertes Ausatmen" → `src/lib/practices.ts` (`verlaengertes-ausatmen`, `relatedStage: 4`, Zeile 161)
- 💬 Studien-Kacheln (Creme) → `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-02-hell.png` (Sonntag) · `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-03-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Stufe 4 → `/mitglieder/stufe/4`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Ich hab mal auf die Uhr geschaut, wie lang ein schweres Gefühl wirklich dauert." (Variante B) | `src/lib/reels.ts` · „04 · Emotionale Reifung — Variante B" | „Folge für die nächste Stufe" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Variante A: „Ich hab jahrelang geglaubt, verstehen reicht." Gefühle, die man nicht fühlt, verschwinden nicht – sie warten. | `src/lib/reels.ts`, Variante A | „Mehr zu Stufe 4 in der Lektion" → `/mitglieder/stufe/4` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Ein einziges Wort kann verhindern, dass eine schwierige Rückmeldung zur Eskalation wird." Affect Labeling (Lieberman, UCLA 2007) vor Feedback-Gesprächen. | Blog `/blog/gefuehle-benennen-beruhigt-das-gehirn` (Zeile 1091–1141) | Kommentar-Frage: „Vor welcher Art Gespräch hilft dir das Benennen am meisten?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Innerlich „Das ist Angst" benennen – und ruhiger werden. UCLA-Studie zur Amygdala. | Blog `/blog/gefuehle-benennen-beruhigt-das-gehirn` | „Ganzen Artikel lesen" |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „Studien-Fakten" – Fakt „Ein Gefühl zu benennen beruhigt" (Lieberman 2007) + Eröffnung „47 % abschweifender Geist" (Killingsworth & Gilbert 2010), zugespitzt auf Meeting-Präsenz. | Carousel `studien-fakten`, Zeilen 117–145 | „Speichern für das nächste Gespräch mit hochkommendem Gefühl." |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Emotionale Reifung – Fühlen, was ist: Wie lang dauert ein Gefühl wirklich?" | Carousel-Slide „04" + Blog + Deep-Dive `emotionsregulation` | „Link in Bio · Speichern für den nächsten schweren Moment." |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Wie lang dauert ein Gefühl wirklich? (Stufe 4: Emotionale Reifung)." | Blog + Deep-Dive `emotionsregulation` + Lektion `/mitglieder/stufe/4` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Bevor du die scharfe Antwort abschickst: ein Atemzug, der länger aus- als einatmet, reicht oft schon." | Praxis `verlaengertes-ausatmen` · Deep-Dive `emotionsregulation` · Lektion `/mitglieder/stufe/4` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Ich hab auf die Uhr geschaut, wie lang ein schweres Gefühl dauert" (identisch zu IG/FB, Variante B) | Reel-Serie „stufen", Variante B · `docs/skripte/reels/stufen.md`, Zeile 225–242 | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | Studien-Karte „Benennen beruhigt das Gehirn" (Lieberman 2007) + Community-Frage: „Welches Gefühl fällt dir am schwersten auszuhalten?" | Studien-Karte `WMDG-Studienfakt-03-hell.png` · Deep-Dive `emotionsregulation` | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Drückst du Gefühle eher weg – oder lässt du dich von ihnen überfluten?" + Mini-Übung „Verlängertes Ausatmen". | Praxis `verlaengertes-ausatmen` → `/mitglieder/praxis/verlaengertes-ausatmen` | „Probier die 3-Minuten-Übung + antworte auf die Umfrage." |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Ein Gefühl zu benennen dämpft die Amygdala – die Alarmzentrale des Gehirns." | Studien-Kachel `WMDG-Studienfakt-02-hell.png` (Lieberman/UCLA 2007) · Lektion `/mitglieder/stufe/4` | „E-Book laden (/#ebook) → Stufe 4 in der Mitgliedschaft." |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster aus Woche 2/3. Reel-Variante zwischen IG (B) und FB-Crosspost (A) bewusst unterschiedlich, um beide Perspektiven der Woche zu zeigen.

---

### Woche 5 · Stufe 5 · Schöpferkraft — „Du schreibst den Code neu"

**Kernbotschaft:** Neuroplastizität heißt: Ein oft gedachter Gedanke wird zur
„Straße" im Kopf – wörtlich gemeint (Maguire 2000, Draganski 2004). Das
Gehirn bleibt formbar, ein Leben lang; ab jetzt entscheidest du bewusst,
welche Bahnen du anlegst.

**Verfügbares Material:**
- 🎬 Reel „Schöpferkraft" (Variante A) → `src/lib/reels.ts`, Skript `docs/skripte/reels/stufen.md`, Abschnitt „05 · Schöpferkraft"
- 🖼️ Carousel-Slide „05 · Schöpferkraft – Du schreibst den Code neu" → `docs/carousels/stufen-ueberblick.mjs`; LinkedIn zusätzlich „Studien-Fakten" (Fakt „01") → `docs/carousels/marketing-serien.mjs`
- 📝 Blog „Neuroplastizität: Warum sich dein Gehirn ein Leben lang verändert" → `/blog/neuroplastizitaet-warum-dein-gehirn-formbar-ist` (`src/lib/blog.ts`, Zeile 1031)
- 📚 Deep-Dive „Neuroplastizität" → `/mitglieder/wissen/neuroplastizitaet` (`relatedStage: 5`, `src/lib/deep-dives.ts`, Zeile 343)
- 📘 Lektion „Stufe 5" → `/mitglieder/stufe/5` + PDF `content/pdf/stufe-5-lektion.pdf` (+ `-uebungen.pdf`, `vertiefung-neuroplastizitaet.pdf`)
- 🧘 Praxis „Morgen-Ausrichtung" → `src/lib/practices.ts` (`morgen-ausrichtung`, `relatedStage: 5`, Zeile 254)
- 💬 Studien-Kacheln (Creme) → `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-06-hell.png` (Sonntag) · `docs/marketing/zitate/studien-1x1/WMDG-Studienfakt-04-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Stufe 5 → `/mitglieder/stufe/5`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Was du oft denkst, wird zur Straße in deinem Kopf. Und das ist wörtlich gemeint." (Variante A) | `src/lib/reels.ts` · „05 · Schöpferkraft — Variante A" | „Folge für die nächste Stufe" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Gleiche Variante A: Gedanken hinterlassen reale Spuren im Gehirn – Trampelpfad wird Straße wird Autobahn. | s. IG-Reel (Mo) | „Mehr zu Stufe 5 in der Lektion" → `/mitglieder/stufe/5` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Dein Kommunikationsstil unter Druck ist kein Charakterzug – es ist eine ausgebaute Straße im Kopf, die du selbst gebaut hast." Maguire/Draganski im Führungskontext. | Blog `/blog/neuroplastizitaet-warum-dein-gehirn-formbar-ist` (Zeile 1031–1089) | Kommentar-Frage: „Welche berufliche Reaktions-Gewohnheit würdest du gern umbauen?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Londoner Taxifahrer mit vergrößertem Hippocampus, Jongleure mit mehr grauer Substanz nach drei Monaten Übung. | Blog `/blog/neuroplastizitaet-warum-dein-gehirn-formbar-ist` | „Ganzen Artikel lesen" |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „Studien-Fakten" – Fakt „01" (Neuroplastizität), zugespitzt auf gezieltes Kompetenztraining im Job. | Carousel `studien-fakten`, Zeilen 117–145, Fakt-Slide „01" | „Speichern als Erinnerung für die nächste neue Gewohnheit." |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Schöpferkraft – Du schreibst den Code neu: dein Gehirn ist formbar." | Carousel-Slide „05" + Blog + Deep-Dive `neuroplastizitaet` | „Link in Bio · Speichern, falls du eine neue Bahn bauen willst." |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Was du oft denkst, wird zur Straße im Kopf (Stufe 5: Schöpferkraft)." | Blog + Deep-Dive `neuroplastizitaet` + Lektion `/mitglieder/stufe/5` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Die ersten fünf Minuten deines Arbeitstages entscheiden mehr über deinen Fokus als die nächsten fünf Stunden." | Praxis `morgen-ausrichtung` · Deep-Dive `neuroplastizitaet` · Lektion `/mitglieder/stufe/5` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Was du oft denkst, wird zur Straße im Kopf" / „Vom Beobachter zum Gestalter" (identisch zu IG/FB, Variante A) | Reel-Serie „stufen", Variante A · `docs/skripte/reels/stufen.md`, Zeile 267–283 | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | Studien-Karte „Dein Gehirn baut sich ständig um" (Draganski 2004, „Nature") + Community-Frage: „Welche ‚Bahn' in dir ist besonders breit geworden?" | Studien-Karte `WMDG-Studienfakt-04-hell.png` · Deep-Dive `neuroplastizitaet` | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Handy zuerst oder Ausrichtung zuerst – was machst du morgens als Erstes?" + Mini-Übung „Morgen-Ausrichtung". | Praxis `morgen-ausrichtung` → `/mitglieder/praxis/morgen-ausrichtung` | „Probier die 5-Minuten-Übung morgen früh + antworte auf die Umfrage." |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Dein Gehirn bleibt formbar – ein Leben lang." | Studien-Kachel `WMDG-Studienfakt-06-hell.png` (Maguire 2000 · Draganski 2004) · Lektion `/mitglieder/stufe/5` | „E-Book laden (/#ebook) → Stufe 5 in der Mitgliedschaft." |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster aus Woche 2–4. Diese Woche verwenden IG-Reel und FB-Crosspost erstmals dieselbe Variante (A) – bewusst konsistent, weil der Hook wortgleich zum Backlog ist.

---

### Woche 6 · Stufe 6 · Innere Ausrichtung — „Kopf, Herz und Handeln"

**Kernbotschaft:** Willenskraft ist eine begrenzte Ressource, die gegen tief
verankerte Muster fast immer verliert (Baumeister 1998 – Replikation Hagger
2016 fand den „Ego-Depletion"-Effekt nicht bestätigt). Tragfähiger ist
Klarheit über die eigenen Werte, damit Kopf, Herz und Handeln in dieselbe
Richtung zeigen.

**Verfügbares Material:**
- 🎬 Reel „Innere Ausrichtung" (Variante B) → `src/lib/reels.ts`, Skript `docs/skripte/reels/stufen.md`, Abschnitt „06 · Innere Ausrichtung"
- 🖼️ Carousel-Slide „06 · Innere Ausrichtung – Kopf, Herz und Handeln" → `docs/carousels/stufen-ueberblick.mjs`; LinkedIn zusätzlich „Studien-Fakten" (Fakt „05") → `docs/carousels/marketing-serien.mjs`
- 📝 Blog „Warum Willenskraft überschätzt wird" → `/blog/warum-willenskraft-ueberschaetzt-wird` (`src/lib/blog.ts`, Zeile 266, Kategorie „Muster lösen")
- 📚 Deep-Dive „Werte & Ziele" → `/mitglieder/wissen/werte-und-ziele` (`relatedStage: 6`, `src/lib/deep-dives.ts`, Zeile 659)
- 📘 Lektion „Stufe 6" → `/mitglieder/stufe/6` + PDF `content/pdf/stufe-6-lektion.pdf` (+ `-uebungen.pdf`, `vertiefung-werte-und-ziele.pdf`)
- 🧘 Praxis „Herz-Kohärenz" → `src/lib/practices.ts` (`herz-kohaerenz`, `relatedStage: 6`, Zeile 135)
- 💬 Zitat-/Studien-Karten (Creme) → `docs/marketing/zitate/studien-4x5/WMDG-Studienfakt-05-hell.png` (Sonntag) · `docs/marketing/zitate/1x1/WMDG-Zitat-03-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Stufe 6 → `/mitglieder/stufe/6`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Dein Kopf ist ein brillanter Diener. Aber ein ziemlich schlechter Chef." (Variante B) | `src/lib/reels.ts` · „06 · Innere Ausrichtung — Variante B" | „Folge für die nächste Stufe" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Variante A: „Ich war ständig müde, und keiner konnte mir sagen, warum." Der stille Widerspruch zwischen Kopf, Bauch und Handeln. | `src/lib/reels.ts`, Variante A | „Mehr zu Stufe 6 in der Lektion" → `/mitglieder/stufe/6` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „„Ich müsste mich nur mehr zusammenreißen" ist selten eine Diagnose – meistens ist es ein Symptom." Ego-Depletion-Studie (Baumeister/Hagger) im Führungskontext. | Blog `/blog/warum-willenskraft-ueberschaetzt-wird` (Zeile 266–308) | Kommentar-Frage: „Wo verlässt du dich im Job eher auf Willenskraft als auf Klarheit über das Ziel?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: „Ich müsste nur diszipliniert genug sein" – Willenskraft ist begrenzt und verliert gegen alte Muster. | Blog `/blog/warum-willenskraft-ueberschaetzt-wird` | „Ganzen Artikel lesen" |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „Studien-Fakten" – Fakt „Willenskraft ist überschätzt" (Baumeister 1998, Replikation Hagger 2016), zugespitzt auf Teamkultur. | Carousel `studien-fakten`, Zeilen 117–145, Fakt-Slide „05" | „Speichern für das nächste Team-Gespräch über Motivation." |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Innere Ausrichtung – Kopf, Herz und Handeln: warum Willenskraft allein nicht reicht." | Carousel-Slide „06" + Blog + Deep-Dive `werte-und-ziele` | „Link in Bio · Speichern, falls du dich gerade zusammenreißen musst." |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Der Kopf ist ein guter Diener, aber ein schlechter Chef (Stufe 6: Innere Ausrichtung)." | Blog + Deep-Dive `werte-und-ziele` + Lektion `/mitglieder/stufe/6` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Vor der nächsten großen Entscheidung: eine Hand aufs Herz, fünf Sekunden ein-, fünf Sekunden ausatmen." | Praxis `herz-kohaerenz` · Deep-Dive `werte-und-ziele` · Lektion `/mitglieder/stufe/6` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Dein Kopf ist ein brillanter Diener, aber ein schlechter Chef" (identisch zu IG/FB, Variante B) | Reel-Serie „stufen", Variante B · `docs/skripte/reels/stufen.md`, Zeile 342–358 | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | Zitat-Karte „Werte als Kompass" + Community-Frage: „Welche 3 Werte würden die Menschen nennen, die dich am besten kennen?" | Zitat `WMDG-Zitat-03-hell.png` · Deep-Dive `werte-und-ziele` | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Ziehen bei dir gerade Kopf und Herz an einem Strang – oder eher gegeneinander?" + Mini-Übung „Herz-Kohärenz". | Praxis `herz-kohaerenz` → `/mitglieder/praxis/herz-kohaerenz` | „Probier die 5-Minuten-Übung + antworte auf die Umfrage." |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Willenskraft als „Muskel", der ermüdet? Eine große Replikation fand den Effekt nicht." | Studien-Kachel `WMDG-Studienfakt-05-hell.png` (Baumeister 1998 / Hagger 2016) · Lektion `/mitglieder/stufe/6` | „E-Book laden (/#ebook) → Stufe 6 in der Mitgliedschaft." |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster aus Woche 2–5. Die Sonntags-Kachel weist die wissenschaftliche Kontroverse transparent aus (Redlichkeit statt Übertreibung).

---

### Woche 7 · Stufe 7 · Meisterschaft — „Was nach den 7 Stufen kommt"

**Kernbotschaft:** Meisterschaft ist kein Zustand ohne Stürme, sondern die
Fähigkeit, immer schneller in die eigene Mitte zurückzufinden – „eine
tägliche Rückkehr", kein Ziel, das man einmal erreicht. Zugleich Abschluss
von Block A: der Bogen von „Einstieg" (E-Book) zu „ganzer Weg" (Mitgliedschaft)
wird hier geschlossen.

> **Korrektur der Praxis-Zuordnung:** Statt der im Backlog genannten
> `box-breathing` (`relatedStage: 6`) wird hier durchgängig
> **`taegliche-rueckkehr`** (`relatedStage: 7`) verwendet – siehe Hinweis am
> Anfang dieses Abschnitts.

**Verfügbares Material:**
- 🎬 Reel „Meisterschaft" (Variante B) → `src/lib/reels.ts`, Skript `docs/skripte/reels/stufen.md`, Abschnitt „07 · Meisterschaft"
- 🖼️ Carousel-Slide „07 · Meisterschaft – Meister deiner Gedanken" → `docs/carousels/stufen-ueberblick.mjs`; LinkedIn zusätzlich „4 Wege zur mentalen Freiheit" (`4-wege-freiheit`, Recap-Slide) → `docs/carousels/marketing-serien.mjs`
- 📝 Blog „Wie frei ist unser Geist?" → `/blog/wie-frei-ist-unser-geist` (`src/lib/blog.ts`, Zeile 144)
- 📚 Deep-Dive „Integration & Weitergabe" → `/mitglieder/wissen/integration-und-weitergabe` (`relatedStage: 7`, `src/lib/deep-dives.ts`, Zeile 780)
- 📘 Lektion „Stufe 7" → `/mitglieder/stufe/7` + PDF `content/pdf/stufe-7-lektion.pdf` (+ `-uebungen.pdf`, `vertiefung-integration-und-weitergabe.pdf`)
- 🧘 Praxis **„Die tägliche Rückkehr"** → `src/lib/practices.ts` (`taegliche-rueckkehr`, `relatedStage: 7`, Zeile 341–363) — *korrigiert, s. o.*
- 💬 Zitat-Karten (Creme) → `docs/marketing/zitate/1x1/WMDG-Zitat-07-hell.png` (Sonntag) · `WMDG-Zitat-04-hell.png` (FB-Freitag) · `docs/marketing/zitate/4x5/WMDG-Zitat-14-hell.png` (LI-Sharepic)
- 🎯 Funnel: E-Book → `/#ebook` · Stufe 7 → `/mitglieder/stufe/7` · Haupt-CTA Donnerstag: volle Mitgliedschaft → `/mitglieder`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Niemand ist für immer Meister. Ich auch nicht." (Variante B) | `src/lib/reels.ts` · „07 · Meisterschaft — Variante B" | „Folge für den Praxis-/Wissenschafts-Block" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Variante A: „Ich dachte, irgendwann wackelt nichts mehr. Das war ein Irrtum." Meisterschaft ist kein Punkt, an dem man fertig ist. | `src/lib/reels.ts`, Variante A | „Mehr zu Stufe 7 in der Lektion" → `/mitglieder/stufe/7` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Meisterschaft zeigt sich nicht darin, nie wieder in ein altes Muster zu rutschen – sondern darin, wie schnell du zurückfindest." Rückfälle + Mentoring vertiefen das eigene Können. | Blog `/blog/wie-frei-ist-unser-geist` (Zeile 144–210) i. V. m. Deep-Dive `integration-und-weitergabe` (Zeile 780–835) | Kommentar-Frage: „Wem hast du zuletzt etwas beigebracht, das dir selbst danach klarer wurde?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Bis zu 60.000 Gedanken am Tag – wie viel Kontrolle hat man wirklich über die eigenen Gedanken? Vier Wege zu mehr mentaler Freiheit. | Blog `/blog/wie-frei-ist-unser-geist` | „Ganzen Artikel lesen" |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „4 Wege zurück zu deiner mentalen Freiheit" – Recap-Slide als Zusammenfassung der ganzen Stufen-Reise, gerahmt als Abschluss von Block A. | Carousel `4-wege-freiheit` in `docs/carousels/marketing-serien.mjs`, Zeilen 61–89 | „Speichern als Rückblick auf die ganze Stufen-Reise." |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Meisterschaft – Meister deiner Gedanken: Wie frei ist dein Geist wirklich?" | Carousel-Slide „07" + Blog + Deep-Dive `integration-und-weitergabe` | „Link in Bio · Speichern, falls du deine 7 Stufen zusammenfassen willst." |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Niemand ist für immer Meister — und das ist die gute Nachricht (Stufe 7: Meisterschaft)." Praxisteil am Ende: **„Die tägliche Rückkehr"** (korrigiert von `box-breathing`). | Blog `wie-frei-ist-unser-geist` + Deep-Dive `integration-und-weitergabe` + Lektion `/mitglieder/stufe/7` + Praxis `taegliche-rueckkehr` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Meisterschaft ist kein Zustand, den du erreichst – sondern eine tägliche Rückkehr in deine Mitte." Letzter Post der Stufen-Serie, CTA bewusst auf die volle Mitgliedschaft zugespitzt. | Praxis **`taegliche-rueckkehr`** (korrigiert von `box-breathing`) · Deep-Dive `integration-und-weitergabe` · Lektion `/mitglieder/stufe/7` | Soft-CTA „E-Book" → `/#ebook`; Haupt-CTA „Alle 7 Stufen im Zusammenhang – jetzt Mitglied werden" → `/mitglieder` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Niemand ist für immer Meister. Ich auch nicht." (identisch zu IG/FB, Variante B) – Abschluss der siebenwöchigen Video-Reihe. | Reel-Serie „stufen", Variante B · `docs/skripte/reels/stufen.md`, Zeile 403–419 | „Hol dir das kostenlose E-Book — ganzes Video oben verlinkt." |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | Zitat-Karte „Meisterschaft als tägliche Rückkehr" + Community-Frage: „Woran erkennst du am schnellsten, dass du aus deiner Mitte gefallen bist – und was bringt dich zurück?" | Zitat `WMDG-Zitat-04-hell.png` · Deep-Dive `integration-und-weitergabe` · Praxis **`taegliche-rueckkehr`** (korrigiert von `box-breathing`) | Kommentiere deine Antwort · Mini-Übung „Die tägliche Rückkehr" |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Wie schnell findest du zurück in deine Mitte, wenn dich etwas aus der Bahn wirft?" + Mini-Übung **„Die tägliche Rückkehr"** (korrigiert von „Box Breathing"). | Praxis `taegliche-rueckkehr` → `/mitglieder/praxis/taegliche-rueckkehr` | „Probier die 5-Minuten-Übung + antworte auf die Umfrage." |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Freiheit beginnt mit einer Frage: Ist dieser Gedanke wirklich meiner?" | Zitat `WMDG-Zitat-07-hell.png` · Lektion `/mitglieder/stufe/7` | „E-Book laden (/#ebook) → Stufe 7 in der Mitgliedschaft." |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster aus Woche 2–6, mit Sonderrolle als Abschlusswoche von Block A: LinkedIn-Donnerstag nutzt als einzige Woche eine Haupt-CTA auf `/mitglieder` statt nur `/#ebook`.

> **YouTube-Thumbnail-Hinweis (Woche 2–7):** Für jede Woche existiert ein
> eigenes, stufenspezifisches Thumbnail in der Creme-Variante (Standard):
> `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-stufe-N-hell.png` (N = 2..7,
> je 2560×1440, dunkle Variante ohne `-hell` ebenfalls vorhanden). Woche 1 nutzt
> weiterhin `WMDG-Thumbnail-02-hell.png`. Damit sind alle Stufen-Thumbnails
> einsatzbereit.

> Jede Stufe hat 3 Reel-Varianten (A/B/C) in `src/lib/reels.ts` – für Wiederholung/AB-Tests über mehrere Wochen. Der interaktive Kalender zeigt alle 7 Wochen (oben umschaltbar).

---

## Woche 8–10 · Block B — Praxis & Wissenschaft (ruhigere Phase)

Gleiche Grund-Dramaturgie und Frequenz **fokussiert** (IG 4 · FB 3 · LI 3 · YT 1
Video + 1 Short = **12 Postings/Woche**) wie Block A, aber ruhigerer,
studien-/praxisbasierter Ton statt Stufen-Lektion-Bezug. Reels aus den Serien
*praxis* (Woche 8) bzw. *wissenschaft* (Woche 9–10)
(`docs/skripte/reels/praxis.md` bzw. `docs/skripte/reels/wissenschaft.md`),
Carousels aus `docs/carousels/marketing-serien.mjs` (Serie „studien-fakten").
Kein `/mitglieder/stufe/N`-Bezug (Block B ist themenbasiert, nicht
stufenbasiert) – Pitch-Ziel ist `/#ebook` bzw. die passende Praxis-/
Wissens-Seite. Quelle je Zeile: die vier Kanal-Teilpläne unter
`docs/marketing/redaktionsplan/woche-N/{instagram,facebook,linkedin,
youtube}.md`.

> **YouTube-Thumbnail-Hinweis (Woche 8–18):** Für Block B und Block C
> existiert noch **kein** eigenes, themenspezifisches Thumbnail-Motiv (anders
> als für die Stufen 2–7). Alle Videos/Shorts der Wochen 8–18 nutzen
> ersatzweise die Basis-Vorlage
> `docs/marketing/youtube/thumbnails/WMDG-Thumbnail-vorlage-hell.png`
> (Creme-Variante, Standard) — **Motiv noch zu produzieren** (so von allen elf
> YouTube-Teilplänen unabhängig gemeldet).

---

### Woche 8 · Atmung & Nervensystem — „Der schnellste Weg zur Ruhe"

**Kernbotschaft:** Zwei unabhängige, gut belegte Wege beruhigen ein
aufgewühltes Nervensystem: ein Gefühl in Worte fassen (Lieberman, UCLA 2007 –
senkt die Amygdala-Aktivität) und bewusst verlängertes Ausatmen (aktiviert den
Parasympathikus). Beides lässt sich in Minuten trainieren.

**Verfügbares Material:**
- 🎬 Reel „4-6-Atmung" (Variante A) → Reel-Serie *praxis* (`src/lib/reels.ts`), Skript `docs/skripte/reels/praxis.md`, Abschnitt „6 · 4-6-Atmung — Variante A"
- 🖼️ Carousel „Studien-Fakten", Fakt 02 (Lieberman/Amygdala) → `docs/carousels/marketing-serien.mjs` ⚠ *kein eigenes „Atmung & Nervensystem"-Carousel vorhanden, Empfehlung an den Themen-Strategen: ergänzen*
- 📝 Blog „Warum ein Gefühl zu benennen dein Gehirn beruhigt" → `/blog/gefuehle-benennen-beruhigt-das-gehirn` (bereits in Woche 4 verwendet, hier bewusst mit anderem Fokus/anderer Zitat-Kachel wiederverwendet)
- 📚 Deep-Dive „Emotionsregulation" → `/mitglieder/wissen/emotionsregulation`
- 🧘 Praxis „Atembeobachtung" (`atembeobachtung`), „4-6-Atmung" (`vier-sechs-atmung`), „Box Breathing" (`box-breathing`) → `src/lib/practices.ts`
- 💬 Zitat-Karten (Creme `-hell.png`) → `WMDG-Zitat-13-hell.png` (Sonntag) · `WMDG-Zitat-05-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Praxis-Übungen → `/mitglieder/praxis`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Drei Minuten, ein klarer Rhythmus – atme jetzt mit mir." (4-6-Atmung, Variante A) | Reel-Serie praxis (`src/lib/reels.ts`) · `docs/skripte/reels/praxis.md` | „Speichern · Folgen für die nächste Übung" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Gleiches Reel + Kontext: vier Sekunden ein, sechs Sekunden aus – ein fester Takt beruhigt Atem und Nervensystem in wenigen Minuten. | s. IG-Reel (Mo) | „Übung ausprobieren" → `/mitglieder/praxis/vier-sechs-atmung` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Der Kollege schickt eine scharfe Nachricht im Team-Chat – und bevor du antwortest, entscheidet sich in deinem Nervensystem mehr, als dir bewusst ist." Affect Labeling (Lieberman, UCLA 2007) im Arbeitsalltag. | Blog `/blog/gefuehle-benennen-beruhigt-das-gehirn` | Kommentar-Frage: „Welches Wort hilft dir, wenn eine starke Reaktion hochkommt?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: 2007 zeigte Lieberman (UCLA) – ein Gefühl zu benennen senkt die Amygdala-Aktivität. Aus „Ich bin wütend" wird „Ich bemerke Wut". | Blog `/blog/gefuehle-benennen-beruhigt-das-gehirn` | „Ganzen Artikel lesen" |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „Studien-Fakten" – Fakt „Ein Gefühl zu benennen beruhigt" (Lieberman 2007), zugespitzt auf Konflikt-/Feedback-Gespräche im Job. | Carousel `studien-fakten` (`docs/carousels/marketing-serien.mjs`) | „Speichern für das nächste hitzige Gespräch" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Zwei Schalter für dein Nervensystem: Benennen und Atmen." | Carousel `studien-fakten` (Fakt 02) · Blog + Deep-Dive `emotionsregulation` | „Link in Bio · Speichern, falls dein Kopf gerade voll ist" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Zwei Schalter für dein Nervensystem: Benennen und Atmen." | Blog + Praxis atembeobachtung/vier-sechs-atmung/box-breathing | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Die schnellste Intervention gegen einen überreizten Kopf vor dem nächsten Call dauert drei Atemzüge." Abgestuftes Atem-Werkzeugset. | Praxis atembeobachtung/vier-sechs-atmung/box-breathing · Deep-Dive emotionsregulation | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Drei Minuten, ein Rhythmus: die 4-6-Atmung" (identisch zum IG/FB-Reel). | Reel-Serie praxis, „4-6-Atmung" Variante A | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Zwei Schalter fürs Nervensystem: Benennen und Atmen" + Frage: „Welcher Schalter funktioniert bei dir zuverlässiger?" | Zitat `WMDG-Zitat-05-hell.png` · Deep-Dive emotionsregulation · Praxis box-breathing | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Fühlst du dich gerade eher unter Druck?" + Mini-Übung „Box Breathing" (Atem-Quadrat). | Praxis `box-breathing` → `/mitglieder/praxis/box-breathing` | „4 Phasen mitmachen + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Der erste Schritt ist nicht Kontrolle. Es ist Bemerken." | Zitat `WMDG-Zitat-13-hell.png` · Praxis atembeobachtung | „E-Book laden (/#ebook) → alle Atem-Übungen in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** Mo Reichweite (IG+FB), Di LinkedIn solo (Berufsbezug), Mi gebündelter Aha-Tag (FB 08:00 → LI 08:15 → IG 12:30 → YT 17:00), Do Anwenden (LI-Pitch + YT-Short), Fr Wochenausklang (FB-Zitat + IG-Story), So ruhiger Abschluss mit Funnel. Sa frei.

---

### Woche 9 · Was Meditation im Gehirn verändert — „Was wirklich passiert, wenn du meditierst"

**Kernbotschaft:** Fast die Hälfte des Tages ist unser Geist gedanklich
woanders – und dann unglücklicher (Killingsworth & Gilbert, Harvard 2010).
Acht Wochen Achtsamkeitstraining (Hölzel et al. 2011, MBSR) zeigen messbar
mehr graue Substanz im Hippocampus und eine weniger reaktive Amygdala – kein
Wundermittel, aber ehrlich belegt.

**Verfügbares Material:**
- 🎬 Reel „Abschweifender Geist" → Reel-Serie *wissenschaft* (`src/lib/reels.ts`), Skript `docs/skripte/reels/wissenschaft.md`, Abschnitt „06 · Der abschweifende Geist — 47 %" (kein eigenes Reel-Thema „Meditation" vorhanden, dieses Reel ist der kanalübergreifend abgestimmte Ersatz)
- 🖼️ Carousel „Studien-Fakten", Fakt 01 (Neuroplastizität) + Stat-Slide „47 %" → `docs/carousels/marketing-serien.mjs`
- 📝 Blog „Was Meditation wirklich im Gehirn verändert" → `/blog/was-meditation-im-gehirn-veraendert`
- 📚 Deep-Dive „Neuroplastizität" (inhaltliche Analogie, nicht die im Blog selbst verlinkte Vertiefung) → `/mitglieder/wissen/neuroplastizitaet`
- 🧘 Praxis „Atembeobachtung" (`atembeobachtung`, wörtlich im Blog empfohlen) und „Der innere Beobachter" (`innerer-beobachter`, LI-Pitch) → `src/lib/practices.ts`
- 💬 Studien-Kachel (Creme) → `WMDG-Studienfakt-11-hell.png` (Hölzel 2011, Sonntag + FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Praxis-Übungen → `/mitglieder/praxis`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Fast die Hälfte des Tages bist du gedanklich woanders." (Abschweifender Geist) | Reel-Serie wissenschaft · `docs/skripte/reels/wissenschaft.md` | „Was Meditation daran verändert, steht im Blog – Link in Bio" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Killingsworth & Gilbert (Harvard 2010): in rund 47 % der Wachzeit schweift der Geist ab – und dann sind wir unglücklicher. | s. IG-Reel (Mo) | „Die ganze Studie" → `/blog/was-meditation-im-gehirn-veraendert` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Fast die Hälfte deines Arbeitstages ist dein Kopf gar nicht bei der Aufgabe, an der du gerade sitzt." Killingsworth & Gilbert und Hölzel (2011) im Meeting-/Deep-Work-Kontext. | Blog `/blog/was-meditation-im-gehirn-veraendert` | Kommentar-Frage: „Wann war dein Kopf heute zuletzt ganz woanders?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Hölzel (2011) fand nach acht Wochen MBSR mehr graue Substanz im Hippocampus und eine weniger reaktive Amygdala. | Blog `/blog/was-meditation-im-gehirn-veraendert` | „Ganzen Artikel lesen" |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „Studien-Fakten" – Stat-Slide „47 %" + Remedy-Slide „So liest du Studien richtig", zugespitzt auf Projektarbeit/Präsentationen. | Carousel `studien-fakten` | „Speichern für die nächste Präsentation mit Studienverweis" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Dein Gehirn bleibt formbar – auch durch Meditation." | Carousel `studien-fakten` (Fakt 01) · Blog + Deep-Dive `neuroplastizitaet` | „Link in Bio · Speichern, wenn du gerade übst" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Was Meditation wirklich im Gehirn verändert (ehrlich eingeordnet)." | Blog `was-meditation-im-gehirn-veraendert` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Du musst nicht eine Stunde auf dem Kissen sitzen – drei Minuten am Tag genügen als Einstieg." Übung „Der innere Beobachter" + Neuroplastizität. | Praxis `innerer-beobachter` · Deep-Dive `neuroplastizitaet` | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „47 % deines Tages bist du gedanklich woanders" (identisch zum IG/FB-Reel). | Reel-Serie wissenschaft, „Abschweifender Geist" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Acht Wochen Übung, messbar im Gehirn" (Hölzel 2011) + Frage: „Was hat sich für dich durch Achtsamkeit verändert?" | Studien-Kachel `WMDG-Studienfakt-11-hell.png` · Deep-Dive neuroplastizitaet | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Schweifst du beim Meditieren oft ab – und denkst, das sei ein Fehler?" + Mini-Übung „Atembeobachtung". | Praxis `atembeobachtung` → `/mitglieder/praxis/atembeobachtung` | „Basis-Übung + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Acht Wochen Achtsamkeit – und die graue Substanz im Hippocampus nimmt messbar zu." | Studien-Kachel `WMDG-Studienfakt-11-hell.png` (Hölzel et al. 2011) | „E-Book laden (/#ebook) → alle Meditations-Übungen in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster aus Woche 8. IG-Reel und FB-Crosspost teilen sich bewusst dasselbe kanalübergreifend abgestimmte Ersatz-Reel „Abschweifender Geist", da `src/lib/reels.ts` kein eigenes Meditations-Reel führt.

---

### Woche 10 · Der Placebo-Effekt / Erwartung — „Wie eine Erwartung deinen Körper verändert"

**Kernbotschaft:** Der Placebo-Effekt ist kein Einbildungs-Trick: Erwartung
setzt reale körpereigene Stoffe frei, etwa schmerzlindernde Endorphine
(Benedetti u. a.). Was der Kopf glaubt, trägt der Körper mit – in beide
Richtungen, auch am Schreibtisch.

**Verfügbares Material:**
- 🎬 Reel „Placebo" → Reel-Serie *wissenschaft* (`src/lib/reels.ts`), Skript `docs/skripte/reels/wissenschaft.md`, Abschnitt „07 · Placebo — Wenn Erwartung den Körper verändert"
- 🖼️ Carousel „Studien-Fakten", Remedy-Slide „So liest du Studien richtig" + Sharepic Placebo → `docs/carousels/marketing-serien.mjs` ⚠ *kein eigener Placebo-Slide im Carousel-Skript, Empfehlung: ergänzen*
- 📝 Blog „Der Placebo-Effekt: Wie eine Erwartung deinen Körper verändert" → `/blog/der-placebo-effekt-wie-erwartung-wirkt`
- 📚 Deep-Dive „Muster, Körper & Gesundheit" (Übung „Der Körper-Stress-Check") → `/mitglieder/wissen/muster-und-koerper` + PDF `content/pdf/vertiefung-muster-und-koerper.pdf`
- 🧘 Praxis „Morgen-Ausrichtung" (`morgen-ausrichtung`) → `src/lib/practices.ts` (kein eigener Praxis-Slug im Backlog vorgegeben, Deep-Dive-Übung „Körper-Stress-Check" ergänzend genutzt)
- 💬 Studien-Kacheln (Creme) → `WMDG-Studienfakt-12-hell.png` (Benedetti, Sonntag) · `WMDG-Studienfakt-06-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Vertiefung → `/mitglieder`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Eine Überzeugung verändert echte Körperprozesse." (Placebo) | Reel-Serie wissenschaft · `docs/skripte/reels/wissenschaft.md` | „Was das für deinen Körper bedeutet, steht im Blog – Link in Bio" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Der Placebo-Effekt ist kein Einbildungs-Trick – der Körper schüttet reale schmerzlindernde Endorphine aus. | s. IG-Reel (Mo) | „Die ganze Geschichte dahinter" → `/blog/der-placebo-effekt-wie-erwartung-wirkt` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Bevor ein Projekt richtig beginnt, entscheidet oft schon eine einzige Erwartung mit über den Ausgang: die deines Teams." Placebo-Effekt (Benedetti) im Führungskontext, inkl. Grenze gegen Toxic Positivity. | Blog `/blog/der-placebo-effekt-wie-erwartung-wirkt` | Kommentar-Frage: „Wo hat eine ausgesprochene Erwartung das Ergebnis mitgeformt?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Eine Tablette ohne Wirkstoff, und die Schmerzen lassen trotzdem nach – reale körpereigene Stoffe, kein Betrug. | Blog `/blog/der-placebo-effekt-wie-erwartung-wirkt` | „Ganzen Artikel lesen" |
| **Mi** | 08:15 | LinkedIn | 🖼️ Carousel | Document-Post „Studien-Fakten" – Remedy-Slide „So liest du Studien richtig" + Sharepic Placebo, zugespitzt auf „Studien belegen …"-Folien in Pitch-Decks. | Carousel `studien-fakten` | „Speichern für die nächste ‚nur noch heute'-Folie" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Eine einzelne Studie ist ein Hinweis, kein Beweis – was steckt wirklich hinter dem Placebo-Effekt?" | Carousel `studien-fakten` (Remedy-Slide) · Blog + Deep-Dive `muster-und-koerper` | „Link in Bio · Speichern für alle, die Körper und Kopf zusammendenken" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Der Placebo-Effekt: Wie deine Erwartung deinen Körper verändert." | Blog + Deep-Dive `muster-und-koerper` (PDF vertiefung-muster-und-koerper.pdf) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Was dein Kopf glaubt, spürt dein Körper mit – auch am Schreibtisch." Der „Körper-Stress-Check" als Zwei-Minuten-Selbstcheck. | Deep-Dive `muster-und-koerper` (Übung „Der Körper-Stress-Check") | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Eine Tablette ohne Wirkstoff — und der Schmerz lässt trotzdem nach" (identisch zum IG/FB-Reel). | Reel-Serie wissenschaft, „Placebo" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Was der Kopf denkt, trägt der Körper mit" + Frage: „Hast du gemerkt, wie eine Erwartung deinen Körper spürbar verändert hat?" | Studien-Karte `WMDG-Studienfakt-06-hell.png` · Deep-Dive muster-und-koerper | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Glaubst du, dass deine Erwartung deinen Körper wirklich verändern kann?" + Mini-Übung „Morgen-Ausrichtung". | Praxis `morgen-ausrichtung` → `/mitglieder/praxis/morgen-ausrichtung` | „5-Minuten-Ausrichtung + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Der Placebo-Effekt ist real: Erwartung setzt körpereigene Endorphine frei." | Studien-Kachel `WMDG-Studienfakt-12-hell.png` (Benedetti) · PDF vertiefung-muster-und-koerper.pdf | „E-Book laden (/#ebook) → Vertiefung ‚Muster, Körper & Gesundheit' in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster aus Woche 8–9. Letzte Woche von Block B, danach folgt Block C (Mentale Selbstverteidigung).

---

## Woche 11–18 · Block C — Mentale Selbstverteidigung (vertiefend)

Gleiche Tagesstruktur und Frequenz **fokussiert** (IG 4 · FB 3 · LI 3 · YT 1
Video + 1 Short = **12 Postings/Woche**). Reels aus Serie *selbstverteidigung*
(`docs/skripte/reels/mentale-selbstverteidigung.md`), Carousel-Quelle je nach
Themen-Treffer aus `docs/carousels/marketing-serien.mjs` (Serien
„wer-denkt-hier", „60000-gedanken", „studien-fakten", „4-wege-freiheit"),
Pitch-Ziel jeweils die Vertiefung `/mitglieder/wissen/<slug>`. Erst hier
platziert, weil die Community jetzt die Grundlagen aus Block A/B kennt.
Quelle je Zeile: die vier Kanal-Teilpläne unter
`docs/marketing/redaktionsplan/woche-N/{instagram,facebook,linkedin,
youtube}.md`.

> **Bekannte Lücke – Carousel-Material für Block C:** Über die acht Wochen
> (11–18) deckt `docs/carousels/marketing-serien.mjs` nur drei der acht
> Themen mit einem **eigenen** Schritt ab: Algorithmen/Filterblasen (W12,
> Serie „wer-denkt-hier"), Werbung & Mangel (W15, „wer-denkt-hier") und
> Gruppendruck (W16, „60000-gedanken"/„wer-denkt-hier"). Für Framing (W11),
> Wiederholung (W13), Reizüberflutung (W14) und Autoritätshörigkeit (W17) gibt
> es **keinen eigenen Slide** – dort wird jeweils auf den inhaltlich
> nächstliegenden vorhandenen Slide ausgewichen (⚠ in der jeweiligen Woche
> markiert) und die Tiefe über Blog/Deep-Dive sichergestellt. Für Propaganda
> (W18) nennt der Compare-Slide „Gedankenkontrolle" (Serie „60000-gedanken")
> den Begriff „Propaganda" wörtlich, ist aber ebenfalls kein eigener
> Vollschritt (⚠). **Empfehlung an den Themen-Strategen/Carousel-Team:** die
> Serie „wer-denkt-hier" um die fünf fehlenden Schritte (Framing,
> Wiederholung, Reizüberflutung, Autorität, Propaganda) ergänzen.

---

### Woche 11 · Framing — „Ein Wort ändert alles"

**Kernbotschaft:** Ein Frame liefert nie nur eine Information, er liefert die
Bewertung gleich mit – „Der Staat investiert zehn Milliarden" und „gibt zehn
Milliarden aus" beschreiben dieselbe Zahl, wecken aber ein anderes Gefühl.
Wer den Rahmen erkennt, kann die Bewertung darin sehen, bevor er sie unbemerkt
übernimmt.

**Verfügbares Material:**
- 🎬 Reel „Framing" → Reel-Serie *selbstverteidigung* (`src/lib/reels.ts`), Skript `docs/skripte/reels/mentale-selbstverteidigung.md`, Abschnitt „2 · Framing"
- 🖼️ Carousel „Wer denkt hier eigentlich?", Cover-/Setup-Slide → `docs/carousels/marketing-serien.mjs` ⚠ *kein eigener Framing-Schritt vorhanden*
- 📝 Blog „Framing: Wie ein einziges Wort deine Meinung macht" → `/blog/framing-wie-ein-wort-deine-meinung-macht`
- 📚 Deep-Dive „Framing" (Übung „Die Umformulierungs-Probe") → `/mitglieder/wissen/framing` + PDF `content/pdf/vertiefung-framing.pdf`
- 🧘 Praxis „Der innere Beobachter" (`innerer-beobachter`) → `src/lib/practices.ts`
- 💬 Zitat-Kachel (Creme) → `WMDG-Zitat-05-hell.png` (Sonntag + FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Vertiefung → `/mitglieder/wissen/framing`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Ein Wort ändert alles." | Reel-Serie selbstverteidigung · `docs/skripte/reels/mentale-selbstverteidigung.md` | „Speicher das für die nächsten Schlagzeilen – und folge für den nächsten Trick" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | „Der Staat investiert zehn Milliarden" vs. „gibt zehn Milliarden aus" – dieselbe Zahl, ein anderes Gefühl. | s. IG-Reel (Mo) | „Mehr in der Vertiefung" → `/mitglieder/wissen/framing` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Bevor im Meeting ein einziges Argument fällt, hat oft schon ein Wort entschieden, wie es ankommt." Framing in Budget-Meetings, HR-Kommunikation, Retros. | Blog `/blog/framing-wie-ein-wort-deine-meinung-macht` | Kommentar-Frage: „Wann hat ein Wort schon die Zustimmung vorweggenommen?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Investition oder Ausgabe, Reform oder Kürzung – ein Frame liefert nie nur Information, er liefert die Bewertung gleich mit. | Blog `/blog/framing-wie-ein-wort-deine-meinung-macht` | „Ganzen Artikel lesen" |
| **Mi** | 08:00 | LinkedIn | 🖼️ Carousel | Document-Post „Studien-Fakten" – Fakt „Dein Kopf verzerrt – systematisch" (Tversky & Kahneman 1974, Anchoring), zugespitzt auf Verhandlungen/Budgets. | Carousel `studien-fakten` (Fakt 04) | „Speichern für die nächste Verhandlung, in der zuerst eine Zahl fällt" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Wer denkt hier eigentlich? – Nicht alle deine Gedanken sind wirklich deine eigenen." | Carousel `wer-denkt-hier` (Cover/Setup ⚠) · Blog + Deep-Dive `framing` | „Die vier Frame-Fragen gibt's im Blog – Link in Bio" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Framing: Wie ein einziges Wort deine Meinung macht." | Blog + Deep-Dive `framing` (PDF vertiefung-framing.pdf) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Mentale Selbstverteidigung im Job beginnt mit der Frage, welchen Rahmen ein Satz dir gerade mitliefert." Erster Baustein der Reihe. | Deep-Dive `framing` (Übung „Die Umformulierungs-Probe") · PDF vertiefung-framing.pdf | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Diese zwei Sätze meinen dasselbe — und fühlen sich völlig anders an" (identisch zum IG/FB-Reel). | Reel-Serie selbstverteidigung, „Framing" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Den Rahmen erkennen, bevor man die Bewertung übernimmt" + Frage: „Bei welchem Wort reagierst du, bevor du den Inhalt geprüft hast?" | Zitat `WMDG-Zitat-05-hell.png` · Deep-Dive framing | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Bei welchem Wort merkst du, dass du reagierst, bevor du den Inhalt geprüft hast?" + Mini-Übung „Der innere Beobachter". | Praxis `innerer-beobachter` → `/mitglieder/praxis/innerer-beobachter` | „Mini-Version + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Ein Gedanke wird erst zur Wahrheit, wenn du aufhörst, ihn zu hinterfragen." | Zitat `WMDG-Zitat-05-hell.png` · Deep-Dive framing | „E-Book laden (/#ebook) → Vertiefung ‚Framing' in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Block-A/B-Muster. Erste Woche von Block C – kein Video-Crosspost auf LinkedIn, da die Reel-Serie *selbstverteidigung* zum Planungszeitpunkt mit `filmed: false` markiert ist.

---

### Woche 12 · Filterblase / Algorithmen — „Dein Feed ≠ die Welt"

**Kernbotschaft:** Online siehst du keine Wirklichkeit, sondern eine Auswahl,
berechnet aus dem, worauf du bisher reagiert hast. Inhalte, die Empörung oder
Angst auslösen, werden häufiger geteilt – der Algorithmus spült sie nach
oben, nicht weil sie wahrer wären.

**Verfügbares Material:**
- 🎬 Reel „Algorithmen" → Reel-Serie *selbstverteidigung*, Skript, Abschnitt „5 · Algorithmen & Filterblasen"
- 🖼️ Carousel „Wer denkt hier eigentlich?", Schritt „02 · Algorithmen & Filterblasen" → `docs/carousels/marketing-serien.mjs` ✅ *exakter Themen-Treffer*
- 📝 Blog „Die Filterblase: Warum dein Feed nicht die Welt ist" → `/blog/filterblase-warum-dein-feed-nicht-die-welt-ist`
- 📚 Deep-Dive „Algorithmen & Filterblasen" → `/mitglieder/wissen/algorithmen` + PDF `content/pdf/vertiefung-algorithmen.pdf`
- 🧘 Praxis „Der Autopilot-Check" (`autopilot-check`) → `src/lib/practices.ts`
- 💬 Zitat-Kachel (Creme) → `WMDG-Zitat-01-hell.png` (Sonntag) · `WMDG-Zitat-06-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Vertiefung → `/mitglieder/wissen/algorithmen`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Dein Feed ≠ die Welt." | Reel-Serie selbstverteidigung | „Folge heute einer Stimme, die anders denkt – und folge hier für Teil 2" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Der Algorithmus zeigt keine Wirklichkeit, sondern eine Auswahl, berechnet aus dem, worauf du bisher reagiert hast. | s. IG-Reel (Mo) | „Mehr in der Vertiefung" → `/mitglieder/wissen/algorithmen` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Wer nur die Meinungen im eigenen Team-Chat hört, hält sie schnell für den ganzen Markt." Algorithmen in internen Kanälen, Netzwerk, Kundenfeedback. | Blog `/blog/filterblase-warum-dein-feed-nicht-die-welt-ist` | Kommentar-Frage: „Wann hast du entschieden, weil ‚alle' derselben Meinung zu sein schienen?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Inhalte, die Empörung oder Angst auslösen, werden häufiger geteilt – der Algorithmus spült sie nach oben. | Blog `/blog/filterblase-warum-dein-feed-nicht-die-welt-ist` | „Ganzen Artikel lesen" |
| **Mi** | 08:00 | LinkedIn | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – Slide „Algorithmen & Filterblasen", zugespitzt auf interne Informationskanäle und Marktbeobachtung. | Carousel `wer-denkt-hier` | „Speichern für die nächste Entscheidung, die auf ‚dem Feed' beruht" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Wer denkt hier eigentlich? – Algorithmen & Filterblasen." | Carousel `wer-denkt-hier` (02 ✅) · Blog + Deep-Dive `algorithmen` | „Den ganzen Artikel gibt's im Blog – Link in Bio" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Die Filterblase: Warum dein Feed nicht die Welt ist." | Blog + Deep-Dive `algorithmen` (PDF vertiefung-algorithmen.pdf) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Dein beruflicher Marktüberblick ist manchmal nur ein gut kuratierter Ausschnitt – und das lässt sich prüfen." Zweiter Baustein der Reihe. | Deep-Dive `algorithmen` · PDF vertiefung-algorithmen.pdf | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Du siehst online nicht die Welt. Du siehst dich selbst" (identisch zum IG/FB-Reel). | Reel-Serie selbstverteidigung, „Algorithmen" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Dein Feed ist ein Spiegel deines Verhaltens, kein Fenster zur Welt" + Frage: „Wann hat dir dein Feed zuletzt widersprochen?" | Zitat `WMDG-Zitat-06-hell.png` · Deep-Dive algorithmen | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Wann hast du zuletzt online etwas gesehen, das deiner Meinung ernsthaft widersprochen hat?" + Mini-Übung „Der Autopilot-Check". | Praxis `autopilot-check` → `/mitglieder/praxis/autopilot-check` | „Check beim nächsten Scrollen + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Nicht jeder Gedanke, den du denkst, ist von dir." | Zitat `WMDG-Zitat-01-hell.png` · Deep-Dive algorithmen | „E-Book laden (/#ebook) → Vertiefung ‚Algorithmen & Filterblasen' in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster aus Woche 11. Einer der drei Wochen in Block C mit exaktem Carousel-Treffer.

---

### Woche 13 · Wiederholung = Wahrheit? — „Oft gehört = wahr?"

**Kernbotschaft:** Je öfter man eine Aussage hört, desto wahrer erscheint
sie – ganz ohne neuen Beweis, nur durch Wiederholung (Illusory-Truth-Effekt,
Hasher, Goldstein & Toppino 1977). Wenn viele dasselbe sagen, halten wir es
zudem für wahr, auch wenn alle es nur voneinander abgeschrieben haben.

**Verfügbares Material:**
- 🎬 Reel „Wiederholung" → Reel-Serie *selbstverteidigung*, Skript, Abschnitt „10 · Wiederholung wird zur Wahrheit"
- 🖼️ Carousel „Bis zu 60.000 Gedanken am Tag" (Stat-Slide) + Sonntags-Sharepic „Studien-Fakten" Fakt 04 (thematisch verwandt) → `docs/carousels/marketing-serien.mjs` ⚠ *kein eigener Wiederholungs-Schritt vorhanden*
- 📝 Blog „Warum sich ‚oft gehört' wie ‚wahr' anfühlt" → `/blog/warum-oft-gehoert-sich-wie-wahr-anfuehlt`
- 📚 Deep-Dive „Wiederholung wird zur Wahrheit" → `/mitglieder/wissen/wiederholung-wahrheit` + PDF `content/pdf/vertiefung-wiederholung-wahrheit.pdf`
- 🧘 Praxis „Abend-Reflexion" (`abend-reflexion`) → `src/lib/practices.ts`
- 💬 Studien-Kachel (Creme) → `WMDG-Studienfakt-08-hell.png` (Hasher/Goldstein/Toppino 1977, exakter Treffer, Sonntag) · Zitat `WMDG-Zitat-07-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Vertiefung → `/mitglieder/wissen/wiederholung-wahrheit`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Oft gehört = wahr?" | Reel-Serie selbstverteidigung | „Prüf heute eine Sache, die du für selbstverständlich hältst – und folge für Teil 2" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Je öfter wir eine Aussage hören, desto wahrer erscheint sie – unabhängig davon, ob sie stimmt. | s. IG-Reel (Mo) | „Mehr in der Vertiefung" → `/mitglieder/wissen/wiederholung-wahrheit` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „‚Das sagen doch alle' ist im Meeting oft kein Beleg – sondern nur ein Satz, der oft genug wiederholt wurde." Unternehmensfloskeln, Branchen-Weisheiten. | Blog `/blog/warum-oft-gehoert-sich-wie-wahr-anfuehlt` | Kommentar-Frage: „Welche ‚Das ist doch bekannt'-Aussage wurde nie überprüft?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Je öfter man eine Aussage hört, desto wahrer erscheint sie – ganz ohne neuen Beweis. | Blog `/blog/warum-oft-gehoert-sich-wie-wahr-anfuehlt` | „Ganzen Artikel lesen" |
| **Mi** | 08:00 | LinkedIn | 🖼️ Carousel | Document-Post „Bis zu 60.000 Gedanken am Tag" – Stat-Slide zu mentalen Endlosschleifen + Sharepic Illusory-Truth-Effekt (Hasher/Goldstein/Toppino 1977). | Carousel `60000-gedanken` | „Speichern für die nächste Team-Weisheit, die du nie geprüft hast" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Dein Kopf verzerrt – systematisch." | Carousel `studien-fakten` (Fakt 04, thematisch verwandt ⚠) · Blog + Deep-Dive `wiederholung-wahrheit` | „Die ganze Erklärung inkl. Beleg-Test gibt's im Blog – Link in Bio" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Warum sich ‚oft gehört' wie ‚wahr' anfühlt." | Blog + Deep-Dive `wiederholung-wahrheit` (PDF vertiefung-wiederholung-wahrheit.pdf) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Der älteste Trick der Beeinflussung braucht keine einzige Lüge – nur Wiederholung." Dritter Baustein der Reihe. | Deep-Dive `wiederholung-wahrheit` · PDF vertiefung-wiederholung-wahrheit.pdf | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Je öfter du etwas hörst, desto wahrer klingt es" (identisch zum IG/FB-Reel). | Reel-Serie selbstverteidigung, „Wiederholung" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Vertrautheit ist kein Beweis" + Frage: „Welche Aussage glaubst du vor allem, weil du sie oft gehört hast?" | Zitat `WMDG-Zitat-07-hell.png` · Deep-Dive wiederholung-wahrheit | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Welche Aussage glaubst du vor allem, weil du sie oft gehört hast?" + Mini-Übung „Abend-Reflexion". | Praxis `abend-reflexion` → `/mitglieder/praxis/abend-reflexion` | „5 Minuten am Abend + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Bloße Wiederholung lässt eine Aussage glaubwürdiger wirken – auch wenn sie falsch ist." | Studien-Kachel `WMDG-Studienfakt-08-hell.png` (Hasher, Goldstein & Toppino 1977) | „E-Book laden (/#ebook) → Vertiefung ‚Wiederholung wird zur Wahrheit' in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster der Vorwochen. Sonntags-Studienkachel ist hier ein exakter Treffer, obwohl das Mittwochs-Carousel nur thematisch verwandt ist.

---

### Woche 14 · Reizüberflutung — „Dein Gehirn im Daueralarm"

**Kernbotschaft:** Zu viele gleichzeitige, wechselnde, emotional aufgeladene
Reize halten das Nervensystem in Bereitschaft. Ein Gehirn im Daueralarm denkt
enger, sucht schnelle Antworten und ist leichter über Angst und einfache
Parolen erreichbar.

**Verfügbares Material:**
- 🎬 Reel „Reizüberflutung" → Reel-Serie *selbstverteidigung*, Skript, Abschnitt „16 · Reizüberflutung & Alarmbereitschaft"
- 🖼️ Carousel „Wer denkt hier eigentlich?", Warnsignal „Starke Emotion" → `docs/carousels/marketing-serien.mjs` ⚠ *kein eigener Reizüberflutungs-Schritt vorhanden*
- 📝 Blog „Reizüberflutung: Warum dein Gehirn nicht mehr abschaltet" → `/blog/reizueberflutung-warum-dein-gehirn-nicht-abschaltet`
- 📚 Deep-Dive „Reizüberflutung & Alarmbereitschaft" → `/mitglieder/wissen/reizueberflutung` + PDF `content/pdf/vertiefung-reizueberflutung.pdf`
- 🧘 Praxis „Verlängertes Ausatmen" (`verlaengertes-ausatmen`, exakt die im Blog/Deep-Dive empfohlene Sofortmaßnahme) → `src/lib/practices.ts`
- 💬 Studien-Kachel (Creme, thematisch verwandt) → `WMDG-Studienfakt-01-hell.png` (Killingsworth & Gilbert 2010, Sonntag) · Zitat `WMDG-Zitat-08-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Vertiefung → `/mitglieder/wissen/reizueberflutung`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Dein Gehirn im Daueralarm." | Reel-Serie selbstverteidigung | „Ruhe ist keine Zeitverschwendung – folge für mehr" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Zu viele gleichzeitige, wechselnde, emotional aufgeladene Reize halten das Nervensystem in Bereitschaft. | s. IG-Reel (Mo) | „Mehr in der Vertiefung" → `/mitglieder/wissen/reizueberflutung` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Ein Gehirn im Daueralarm trifft andere Entscheidungen als ein reguliertes – auch in Meetings." Meeting-Ketten, Slack-Dauerbeschallung, Entscheidungen unter Zeitdruck. | Blog `/blog/reizueberflutung-warum-dein-gehirn-nicht-abschaltet` | Kommentar-Frage: „Wie oft triffst du Entscheidungen ohne eine Minute Pause?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Ein Mensch im Daueralarm denkt enger, sucht schnelle Antworten und ist leichter über Angst und einfache Parolen erreichbar. | Blog `/blog/reizueberflutung-warum-dein-gehirn-nicht-abschaltet` | „Ganzen Artikel lesen" |
| **Mi** | 08:00 | LinkedIn | 🖼️ Carousel | Document-Post „Studien-Fakten" – Stat-Slide „47 %" (Killingsworth & Gilbert), zugespitzt auf Task-Switching und Dauerbeschallung im Job. | Carousel `studien-fakten` | „Speichern für die nächste Meeting-Woche ohne Pause" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Wer denkt hier eigentlich? – Warnsignal starke Emotion." | Carousel `wer-denkt-hier` (Warnsignal ⚠) · Blog + Deep-Dive `reizueberflutung` | „Die ganze Erklärung inkl. Übungen gibt's im Blog – Link in Bio" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Reizüberflutung: Warum dein Gehirn nicht mehr abschaltet." | Blog + Deep-Dive `reizueberflutung` (PDF vertiefung-reizueberflutung.pdf) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Ruhe ist im Job keine Zeitverschwendung – sie ist der Zustand, in dem du wieder klar denkst." Vierter Baustein der Reihe. | Deep-Dive `reizueberflutung` · PDF vertiefung-reizueberflutung.pdf | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Dein Gehirn ist im Daueralarm. Und im Alarm denkst du schlechter" (identisch zum IG/FB-Reel). | Reel-Serie selbstverteidigung, „Reizüberflutung" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Ein Gehirn im Daueralarm trifft andere Entscheidungen als ein reguliertes" + Frage: „Woran merkst du, dass du von ‚abwägen' auf ‚nur reagieren' umgeschaltet hast?" | Zitat `WMDG-Zitat-08-hell.png` · Deep-Dive reizueberflutung | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Woran merkst du bei dir selbst, dass dein Denken gerade umgeschaltet hat?" + Mini-Übung „Verlängertes Ausatmen". | Praxis `verlaengertes-ausatmen` → `/mitglieder/praxis/verlaengertes-ausatmen` | „2-Minuten-Übung + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „In rund 47 % der Wachzeit ist unser Geist nicht bei der Sache – und dann unglücklicher." | Studien-Kachel `WMDG-Studienfakt-01-hell.png` (Killingsworth & Gilbert 2010, thematisch verwandt ⚠) | „E-Book laden (/#ebook) → Vertiefung ‚Reizüberflutung & Alarmbereitschaft' in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster der Vorwochen.

---

### Woche 15 · Werbung & Mangel — „Sie verkauft dir den Mangel"

**Kernbotschaft:** Gute Werbung verkauft kein Produkt, sondern zuerst ein
unangenehmes Gefühl – den Eindruck, dass etwas fehlt. Erst danach erscheint
das Produkt als Erlösung von einem Unbehagen, das die Werbung selbst geweckt
hat (Verlustaversion, Kahneman & Tversky 1979).

**Verfügbares Material:**
- 🎬 Reel „Werbung & Mangel" → Reel-Serie *selbstverteidigung*, Skript, Abschnitt „6 · Werbung & künstlicher Mangel"
- 🖼️ Carousel „Wer denkt hier eigentlich?", Schritt „01 · Werbung & Medien" → `docs/carousels/marketing-serien.mjs` ✅ *exakter Themen-Treffer (nennt „künstlich erzeugter Mangel" wörtlich)*
- 📝 Blog „Werbung verkauft dir keinen Mangel – sie erschafft ihn" → `/blog/werbung-und-der-kuenstliche-mangel`
- 📚 Deep-Dive „Werbung & künstlicher Mangel" → `/mitglieder/wissen/werbung-und-mangel` + PDF `content/pdf/vertiefung-werbung-und-mangel.pdf`
- 🧘 Praxis „Atembeobachtung" (`atembeobachtung`, hier als bewusste Kaufpause) → `src/lib/practices.ts`
- 💬 Studien-Kachel (Creme) → `WMDG-Studienfakt-09-hell.png` (Kahneman & Tversky 1979, Sonntag) · Zitat `WMDG-Zitat-09-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Vertiefung → `/mitglieder/wissen/werbung-und-mangel`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Sie verkauft dir den Mangel." | Reel-Serie selbstverteidigung | „24-Stunden-Regel vor jedem Kauf. Speichern & folgen" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Gute Werbung verkauft kein Produkt, sondern zuerst ein unangenehmes Gefühl – den Eindruck, dass etwas fehlt. | s. IG-Reel (Mo) | „Mehr in der Vertiefung" → `/mitglieder/wissen/werbung-und-mangel` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „‚Nur noch heute', ‚letzte Chance' – künstlicher Mangel funktioniert im Vertriebsgespräch genauso wie in der Werbung." Befristete Angebote, Zeitdruck in Verhandlungen. | Blog `/blog/werbung-und-der-kuenstliche-mangel` | Kommentar-Frage: „Bei welchem Angebot war der Zeitdruck künstlich erzeugt?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Sobald man sich mit einem idealisierten Bild vergleicht, entsteht ein Abstand – und genau den soll das Produkt schließen. | Blog `/blog/werbung-und-der-kuenstliche-mangel` | „Ganzen Artikel lesen" |
| **Mi** | 08:00 | LinkedIn | 🖼️ Carousel | Document-Post „Wer denkt hier eigentlich?" – Slide „Werbung & Medien" (nennt „künstlich erzeugter Mangel" wörtlich) + Sharepic Verlustaversion. | Carousel `wer-denkt-hier` | „Speichern für das nächste Angebot mit ‚nur noch heute'" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Wer denkt hier eigentlich? – Werbung & Medien." | Carousel `wer-denkt-hier` (01 ✅) · Blog + Deep-Dive `werbung-und-mangel` | „Den Mangel-Check gibt's im Blog – Link in Bio" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Werbung verkauft dir keinen Mangel — sie erschafft ihn." | Blog + Deep-Dive `werbung-und-mangel` (PDF vertiefung-werbung-und-mangel.pdf) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Der Ausweg ist nicht Verzicht um jeden Preis – sondern die Pause zwischen Impuls und Zusage." Fünfter Baustein der Reihe. | Deep-Dive `werbung-und-mangel` · PDF vertiefung-werbung-und-mangel.pdf | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Werbung verkauft dir kein Produkt. Sie verkauft dir einen Mangel" (identisch zum IG/FB-Reel). | Reel-Serie selbstverteidigung, „Werbung & Mangel" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Du kaufst nicht die Uhr, sondern das Gefühl, jemand zu sein, der so eine Uhr trägt" + Frage: „Was hast du zuletzt gekauft, das eigentlich ein Gefühl kaufen sollte?" | Zitat `WMDG-Zitat-09-hell.png` · Deep-Dive werbung-und-mangel | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Was hast du zuletzt gekauft, das eigentlich ein Gefühl kaufen sollte?" + Mini-Übung „Atembeobachtung" als bewusste Kaufpause. | Praxis `atembeobachtung` → `/mitglieder/praxis/atembeobachtung` | „Erst die Übung, dann entscheiden + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Ein Verlust wiegt gefühlt fast doppelt so schwer wie ein gleich großer Gewinn." | Studien-Kachel `WMDG-Studienfakt-09-hell.png` (Kahneman & Tversky 1979, Prospect Theory) | „E-Book laden (/#ebook) → Vertiefung ‚Werbung & künstlicher Mangel' in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster der Vorwochen. Zweiter exakter Carousel-Treffer in Block C.

---

### Woche 16 · Gruppendruck — „Laut ≠ Mehrheit"

**Kernbotschaft:** Wer glaubt, mit seiner Meinung allein zu stehen, schweigt
eher aus Angst vor Ablehnung – wodurch die andere Sicht noch stärker wirkt.
So entsteht eine Schweigespirale: Nicht die Mehrheit gewinnt, sondern die
lauteste, selbstsicherste Stimme (Asch-Konformitätsexperiment, 1951).

**Verfügbares Material:**
- 🎬 Reel „Gruppendruck" → Reel-Serie *selbstverteidigung*, Skript, Abschnitt „7 · Gruppendruck & Schweigespirale"
- 🖼️ Carousel „Wer denkt hier eigentlich?", Schritt „03 · Gruppendruck" → `docs/carousels/marketing-serien.mjs` ✅ *exakter Themen-Treffer*; ergänzend „Bis zu 60.000 Gedanken am Tag" (List-Slide „Gruppendruck") für LinkedIn
- 📝 Blog „Gruppendruck: Warum wir schweigen, obwohl wir zweifeln" → `/blog/gruppendruck-und-die-schweigespirale`
- 📚 Deep-Dive „Gruppendruck & Schweigespirale" → `/mitglieder/wissen/gruppendruck` + PDF `content/pdf/vertiefung-gruppendruck.pdf`
- 🧘 Praxis „Die tägliche Rückkehr" (`taegliche-rueckkehr`) → `src/lib/practices.ts`
- 💬 Studien-Kachel (Creme) → `WMDG-Studienfakt-07-hell.png` (Asch 1951, exakter Treffer, Sonntag) · Zitat `WMDG-Zitat-10-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Vertiefung → `/mitglieder/wissen/gruppendruck`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Laut ≠ Mehrheit." | Reel-Serie selbstverteidigung | „Sag einmal ruhig, was du wirklich denkst – und folge für Teil 2" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Wer glaubt, mit seiner Meinung allein zu stehen, schweigt eher aus Angst vor Ablehnung – so entsteht eine Schweigespirale. | s. IG-Reel (Mo) | „Mehr in der Vertiefung" → `/mitglieder/wissen/gruppendruck` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Fast immer denken viel mehr Menschen im Meeting wie du – sie sagen es nur nicht." Die Mehrheitsillusion in Team-Meetings und Entscheidungsrunden. | Blog `/blog/gruppendruck-und-die-schweigespirale` | Kommentar-Frage: „Wann hast du geschwiegen, obwohl du anderer Meinung warst?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Wir überschätzen systematisch, wie viele so denken wie die lautesten Stimmen, und unterschätzen die stillen Zweifler. | Blog `/blog/gruppendruck-und-die-schweigespirale` | „Ganzen Artikel lesen" |
| **Mi** | 08:00 | LinkedIn | 🖼️ Carousel | Document-Post „Bis zu 60.000 Gedanken am Tag" – List-Slide „Gruppendruck" + Sharepic Asch-Konformitätsexperiment (1951). | Carousel `60000-gedanken` | „Speichern für die nächste Entscheidungsrunde, in der ‚alle' einer Meinung scheinen" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Wer denkt hier eigentlich? – Gruppendruck." | Carousel `wer-denkt-hier` (03 ✅) · Blog + Deep-Dive `gruppendruck` | „Die Mehrheitsillusion erklärt – ganzer Artikel im Blog, Link in Bio" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Gruppendruck: Warum wir schweigen, obwohl wir zweifeln." | Blog + Deep-Dive `gruppendruck` (PDF vertiefung-gruppendruck.pdf) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Der Mut, im Meeting die eigene Sicht zu sagen, fängt klein an – und ist eine trainierbare Fähigkeit." Sechster Baustein der Reihe. | Deep-Dive `gruppendruck` · PDF vertiefung-gruppendruck.pdf | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Die Mehrheit, vor der du dich fürchtest, gibt es oft gar nicht" (identisch zum IG/FB-Reel). | Reel-Serie selbstverteidigung, „Gruppendruck" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Fast immer denken viel mehr Menschen wie du – sie sagen es nur nicht" + Frage: „Wo sagst du öffentlich etwas anderes, als du privat denkst?" | Zitat `WMDG-Zitat-10-hell.png` · Deep-Dive gruppendruck | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Wo sagst du öffentlich etwas anderes, als du privat denkst?" + Mini-Übung „Die tägliche Rückkehr". | Praxis `taegliche-rueckkehr` → `/mitglieder/praxis/taegliche-rueckkehr` | „5-Minuten-Übung + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Rund ein Drittel folgt einer sichtbar falschen Mehrheit – gegen die eigenen Augen." | Studien-Kachel `WMDG-Studienfakt-07-hell.png` (Solomon Asch 1951) | „E-Book laden (/#ebook) → Vertiefung ‚Gruppendruck & Schweigespirale' in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster der Vorwochen. Dritter exakter Carousel-Treffer in Block C.

---

### Woche 17 · Autoritätshörigkeit — „Titel ≠ Wahrheit"

**Kernbotschaft:** Man kann nicht alles selbst prüfen, deshalb vertraut man
Fachleuten – das ist vernünftig. Gefährlich wird es, wenn der Status das
Argument komplett ersetzt und Rückfragen als Respektlosigkeit gelten
(Milgram-Experiment 1963, ethisch umstritten).

**Verfügbares Material:**
- 🎬 Reel „Autoritätshörigkeit" → Reel-Serie *selbstverteidigung*, Skript, Abschnitt „8 · Autorität & Gehorsam"
- 🖼️ Carousel „4 Wege zur mentalen Freiheit", Slide „Kritisch denken" → `docs/carousels/marketing-serien.mjs` ⚠ *kein eigener Autoritäts-Schritt vorhanden*
- 📝 Blog „Wann Vertrauen zu blindem Gehorsam wird" → `/blog/wann-vertrauen-zu-blindem-gehorsam-wird`
- 📚 Deep-Dive „Autorität & Gehorsam" (Übung „Sache statt Status") → `/mitglieder/wissen/autoritaetshoerigkeit` + PDF `content/pdf/vertiefung-autoritaetshoerigkeit.pdf`
- 🧘 Praxis „Der innere Beobachter" (`innerer-beobachter`) → `src/lib/practices.ts`
- 💬 Studien-Kachel (Creme) → `WMDG-Studienfakt-13-hell.png` (Milgram 1963, exakter Treffer, ethisch umstritten, Sonntag) · Zitat `WMDG-Zitat-11-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Vertiefung → `/mitglieder/wissen/autoritaetshoerigkeit`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Titel ≠ Wahrheit." | Reel-Serie selbstverteidigung | „Folge für Teil 2: Wie Angst dich lenkbar macht" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Man kann nicht alles selbst prüfen, deshalb vertraut man Fachleuten – gefährlich wird es, wenn der Status das Argument ersetzt. | s. IG-Reel (Mo) | „Mehr in der Vertiefung" → `/mitglieder/wissen/autoritaetshoerigkeit` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Ein Titel ist ein Grund zuzuhören – kein Grund, nicht mehr zu prüfen." Beratungsfolien, Geschäftsführungsentscheidungen, Senior-Kollegen als ungeprüfte Autorität. | Blog `/blog/wann-vertrauen-zu-blindem-gehorsam-wird` | Kommentar-Frage: „Bei welcher Aussage einer Führungskraft hast du nicht nachgefragt?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Dieselbe Aussage klingt glaubwürdiger, wenn ein Titel dahintersteht – ein Experte darf sich irren und korrigieren, das ist Seriosität, keine Schwäche. | Blog `/blog/wann-vertrauen-zu-blindem-gehorsam-wird` | „Ganzen Artikel lesen" |
| **Mi** | 08:00 | LinkedIn | 🖼️ Carousel | Document-Post „4 Wege zur mentalen Freiheit" – Slide „Kritisch denken" + Sharepic Milgram-Experiment (1963, ethisch umstritten). | Carousel `4-wege-freiheit` | „Speichern für die nächste Entscheidung, die du nur wegen eines Titels unterschreibst" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Wer denkt hier eigentlich? – Bewusstheit gibt dir die Kontrolle zurück." | Carousel `wer-denkt-hier` (Remedy-Slide ⚠) · Blog + Deep-Dive `autoritaetshoerigkeit` | „Wann aus Vertrauen blinder Gehorsam wird – ganzer Artikel im Blog, Link in Bio" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Wann Vertrauen zu blindem Gehorsam wird." | Blog + Deep-Dive `autoritaetshoerigkeit` (PDF vertiefung-autoritaetshoerigkeit.pdf) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Vertraue Fachwissen – aber hör nicht auf mitzudenken. Genau darin liegt die eigentliche Kompetenz." Siebter Baustein der Reihe. | Deep-Dive `autoritaetshoerigkeit` (Übung „Sache statt Status") · PDF vertiefung-autoritaetshoerigkeit.pdf | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Derselbe Satz klingt wahrer, wenn ein Titel davorsteht" (identisch zum IG/FB-Reel). | Reel-Serie selbstverteidigung, „Autoritätshörigkeit" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Ein Titel ist ein Grund zuzuhören – kein Grund, nicht mehr zu prüfen" + Frage: „Bei welcher Instanz prüfst du gerade gar nichts mehr nach?" | Zitat `WMDG-Zitat-11-hell.png` · Deep-Dive autoritaetshoerigkeit | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Glaubst du eine Aussage, weil sie stimmt – oder weil ein Titel davorsteht?" + Mini-Übung „Der innere Beobachter". | Praxis `innerer-beobachter` → `/mitglieder/praxis/innerer-beobachter` | „Beobachte den Zustimmungs-Impuls + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Unter dem Druck einer Autorität handeln viele gegen ihr eigenes Gewissen." | Studien-Kachel `WMDG-Studienfakt-13-hell.png` (Stanley Milgram 1963, ethisch umstritten) | „E-Book laden (/#ebook) → Vertiefung ‚Autorität & Gehorsam' in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster der Vorwochen.

---

### Woche 18 · Propaganda — „Ohne eine einzige Lüge"

**Kernbotschaft:** Man stellt sich Propaganda gern plump vor – laute
Parolen, offensichtliche Lügen. Die wirksamste Beeinflussung ist leise: Sie
wirkt über Wiederholung, Emotion und Vereinfachung, ganz ohne eine einzige
Lüge. Abschluss von Block C.

**Verfügbares Material:**
- 🎬 Reel „Propaganda" → Reel-Serie *selbstverteidigung*, Skript, Abschnitt „1 · Propaganda"
- 🖼️ Carousel „Bis zu 60.000 Gedanken am Tag", Compare-Slide „Gedankenkontrolle" → `docs/carousels/marketing-serien.mjs` ⚠ *nennt „Propaganda" wörtlich, aber kein eigener Vollschritt*
- 📝 Blog „Propaganda erkennst du nicht an lauten Parolen" → `/blog/propaganda-erkennst-du-nicht-an-lauten-parolen`
- 📚 Deep-Dive „Propaganda & Konditionierung" (Übung „Der Herkunfts-Check") → `/mitglieder/wissen/propaganda` + PDF `content/pdf/vertiefung-propaganda.pdf`
- 🧘 Praxis „Abend-Reflexion" (`abend-reflexion`) → `src/lib/practices.ts`
- 💬 Zitat-Kachel (Creme) → `WMDG-Zitat-08-hell.png` (Sonntag, Serien-Abschluss) · `WMDG-Zitat-12-hell.png` (FB-Freitag)
- 🎯 Funnel: E-Book → `/#ebook` · Vertiefung → `/mitglieder/wissen/propaganda`

**Tagesplan (Mo–So):**

| Tag | Uhrzeit | Kanal | Format | Inhalt / Hook | Quelle | CTA / Ziel |
|---|---|---|---|---|---|---|
| **Mo** | 18:00 | Instagram | 🎬 Reel | „Ohne eine einzige Lüge." | Reel-Serie selbstverteidigung | „Woher stammt deine stärkste Überzeugung? Schreib's in die Kommentare" |
| **Mo** | 18:00 | Facebook | 🎬 Reel (Crosspost) | Die wirksamste Beeinflussung ist leise – sie wirkt über Wiederholung, Emotion und Vereinfachung, ganz ohne eine einzige Lüge. | s. IG-Reel (Mo) | „Mehr in der Vertiefung" → `/mitglieder/wissen/propaganda` |
| **Di** | 07:30 | LinkedIn | 📝 Beitrag | „Die wirksamste Beeinflussung im Change-Prozess kommt selten als laute Parole – sie arbeitet leise, über Wiederholung, Emotion und Vereinfachung." Change-Narrative und Feindbilder im Team. | Blog `/blog/propaganda-erkennst-du-nicht-an-lauten-parolen` | Kommentar-Frage: „Welche interne Botschaft wird so oft wiederholt, dass sie kaum noch jemand hinterfragt?" |
| **Mi** | 08:00 | Facebook | 📝 Beitrag | Blog-Anriss: Drei Hebel wirken fast immer zusammen – Wiederholung, Emotion, Vereinfachung – und keiner davon braucht eine einzige Lüge. | Blog `/blog/propaganda-erkennst-du-nicht-an-lauten-parolen` | „Ganzen Artikel lesen" |
| **Mi** | 08:00 | LinkedIn | 🖼️ Carousel | Document-Post „Bis zu 60.000 Gedanken am Tag" – Compare-Slide „Gedankenkontrolle" (nennt „Propaganda" wörtlich), zugespitzt auf Change-Kommunikation und Town-Halls. | Carousel `60000-gedanken` | „Speichern für die nächste Town-Hall mit einem sehr eingängigen Narrativ" |
| **Mi** | 12:30 | Instagram | 🖼️ Carousel | „Gedankenkontrolle: Selbstkontrolle vs. Manipulation von außen." | Carousel `60000-gedanken` (Compare-Slide ⚠) · Blog + Deep-Dive `propaganda` | „Die drei leisen Hebel der Propaganda – ganzer Artikel im Blog, Link in Bio" |
| **Mi** | 17:00 | YouTube | ▶️ Video | „Propaganda erkennst du nicht an lauten Parolen." | Blog + Deep-Dive `propaganda` (PDF vertiefung-propaganda.pdf) | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 07:45 | LinkedIn | 🎯 Pitch | „Wer die drei Hebel Wiederholung, Emotion und Vereinfachung kennt, wird schwerer steuerbar – privat wie beruflich." Achter und letzter Baustein von Block C. | Deep-Dive `propaganda` (Übung „Der Herkunfts-Check") · PDF vertiefung-propaganda.pdf | „Kostenloses E-Book sichern" → `/#ebook` |
| **Do** | 12:00 | YouTube | ⚡ Short | „Propaganda erkennst du nicht an lauten Parolen. Sondern hieran" (identisch zum IG/FB-Reel). | Reel-Serie selbstverteidigung, „Propaganda" | „Ganzes Video verlinkt oben ↑" |
| **Fr** | 18:00 | Facebook | 💬 Zitat/Studie + Community-Frage | „Nichts bindet eine Gruppe so schnell wie ein gemeinsamer Gegner" + Frage: „Welche Überzeugung hast du übernommen, ohne sie je wirklich geprüft zu haben?" | Zitat `WMDG-Zitat-12-hell.png` · Deep-Dive propaganda | Kommentiere deine Antwort |
| **Fr** | 19:00 | Instagram | 📚 Story | Umfrage „Welche Überzeugung hast du übernommen, ohne sie je wirklich geprüft zu haben?" + Mini-Übung „Abend-Reflexion". | Praxis `abend-reflexion` → `/mitglieder/praxis/abend-reflexion` | „Überzeugung durchgehen statt behalten + Umfrage-Antwort" |
| **So** | 08:00 | Instagram | 💬 Zitat + 🎯 Pitch | „Du musst deine Gedanken nicht bekämpfen. Nur aufhören, jedem zu glauben." | Zitat `WMDG-Zitat-08-hell.png` · Deep-Dive propaganda | „E-Book laden (/#ebook) → Vertiefung ‚Propaganda & Konditionierung' in der Mitgliedschaft" |
| **Sa** | — | *(Ruhetag)* | — | Kein Post geplant. | — | — |

**Frequenz:** IG 4 · FB 3 · LI 3 · YT 1 Video + 1 Short. **Gesamt: 12 Postings.**
**Tagesmix:** identisch zum Muster der Vorwochen. Letzte Woche von Block C – LinkedIn-Donnerstag fasst rückblickend alle acht Themen des Blocks zusammen.

---

## Woche 19–20 · Block C — Mentale Selbstverteidigung (Fortsetzung, kompakte Übersicht)

Gleiche Tagesstruktur und Frequenz **fokussiert** (12 Postings/Woche). Diese
beiden Wochen sind (Stand dieser Planung) noch nicht Gegenstand eines
eigenen Auftrags und bleiben in kompakter Form; Details im interaktiven
Kalender.

| Woche | Thema | Reel-Hook | Blog-Slug | Deep-Dive / Pitch |
|---|---|---|---|---|
| 19 | **Kognitive Dissonanz** | „Warum du wegschaust" | `warum-du-verteidigst-was-dir-schadet` | `kognitive-dissonanz` |
| 20 | **Identität & Meinung** | „Meinung – oder hat sie dich?" | `hast-du-eine-meinung-oder-hat-sie-dich` | `identitaet-und-meinung` |

> Woche 21–26 haben eigene Blogartikel (`src/lib/blog.ts`, Kategorie „Mentale
> Selbstverteidigung") und sind – wie Woche 19–20 – kompakt im interaktiven
> Kalender hinterlegt (`docs/marketing/redaktionsplan-kalender.html`). Details
> siehe dort bzw. `docs/marketing/redaktionsplan/themen-backlog.md`.

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
| 8 | Atmung & Nervensystem | Praxis & Wissenschaft |
| 9 | Was Meditation im Gehirn verändert | Praxis & Wissenschaft |
| 10 | Der Placebo-Effekt / Erwartung | Praxis & Wissenschaft |
| 11 | Framing | Mentale Selbstverteidigung |
| 12 | Filterblase / Algorithmen | Mentale Selbstverteidigung |
| 13 | Wiederholung = Wahrheit? | Mentale Selbstverteidigung |
| 14 | Reizüberflutung | Mentale Selbstverteidigung |
| 15 | Werbung & Mangel | Mentale Selbstverteidigung |
| 16 | Gruppendruck | Mentale Selbstverteidigung |
| 17 | Autoritätshörigkeit | Mentale Selbstverteidigung |
| 18 | Propaganda | Mentale Selbstverteidigung |
| ab 19 | Kognitive Dissonanz, … Bildmacht | Mentale Selbstverteidigung |

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

*Erstellt aus vorhandenem Projekt-Material. Woche 1–18 sind vollständig,
Tag für Tag durchgeplant – Block A · 7 Stufen (1–7), Block B · Praxis &
Wissenschaft (8–10) und Block C · Mentale Selbstverteidigung (11–18). Woche
19–26 (Fortsetzung Block C, u. a. Kognitive Dissonanz … Bildmacht) liegen
kompakt im interaktiven Kalender vor
(`docs/marketing/redaktionsplan-kalender.html`). Damit ist bereits mehr als
ein Vierteljahr Content vollständig, weitere ein halbes Jahr kompakt
kanalübergreifend durchgeplant. Für weitere Themen oder einen neuen Zyklus:
`/redaktionsplan`.*
