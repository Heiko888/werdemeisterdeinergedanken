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
