# Design-Check — 2026-09-02

Vollständiger Design-Review durch das **Design-Team** (komponenten-designer,
layout-architekt, bild-kurator, marken-hueter). Reine Bewertung am Code —
**kein Produktivcode geändert**. Funde sind am Code belegt (Datei:Zeile);
visuelle Feinheiten (Glow-Intensität, gefühlte Gold-Dosierung, mobile Crops)
sollten zusätzlich im Browser gegengeprüft werden.

**Legende:** 🔴 stört die Wirkung deutlich · 🟠 merklich · 🟡 Feinschliff

---

## Umsetzungs-Log

**2026-09-02 — Quick Wins umgesetzt** (Branch `claude/design-review-agent-team-v5qwbk`):

| # | Fund | Umsetzung | Datei |
|---|------|-----------|-------|
| 1 | K1 | Button-Basis um `group` + `group-hover:[&>svg:last-child]:translate-x-1` erweitert → nachgestellter Pfeil gleitet bei jedem CTA beim Hover mit | `src/components/ui/Button.tsx` |
| 2 | B1 | Footer-Eisvogel auf goldene Variante umgestellt | `src/components/layout/Footer.tsx:115` |
| 3 | – | Radius-Bruch behoben: `rounded-[2px]` → `rounded-3xl` | `src/app/kontakt/page.tsx:89` |
| 4 | B4 | LCP-Bild auf `.webp` umgestellt (2,36 MB → 248 KB); `hero-programm.png` gelöscht | `src/app/mitglieder/programm/page.tsx:43` |
| 5 | K2 | Header-CTA (Desktop + Mobil) von Gold `accent` → `secondary`, damit Gold der Sektions-Hauptaktion vorbehalten bleibt | `src/components/layout/Header.tsx:99,159` |

Offen: alle übrigen 🔴/🟠/🟡-Funde unten (System-Vereinheitlichung Card/Button/
Eyebrow/Text-Kontrast, Homepage-Takt, Hero-Fold mobil, restliche Bild-/Layout-Funde).

---

## Gesamteindruck

Das Fundament ist stark und markengerecht: Buttons, Karten, Blog-Index und die
Kern-Bildwelt (`heiko-hero`, `ueber-heiko-berg`, Hero-Bilder, Blog-Motive) sind
sorgfältig gebaut — dunkel, warm, golden, cinematisch. Der Eindruck „wirkt
stumpf" ist **nicht pauschal richtig**: die Elemente sind gut gemacht, aber an
wenigen **systemischen** Stellen fehlt ihnen der letzte Schliff, der ein
sorgfältiges Design lebendig macht. Die drei roten Fäden:

1. **Micro-Interactions fehlen** — der Pfeil in Buttons bewegt sich beim Hover
   nicht mit; das lässt fast jeden CTA reglos/„still" wirken.
2. **Das Design-System wird nicht konsequent durchgesetzt** — `Card`, `Button`,
   `Eyebrow` existieren als Bausteine, werden aber vielfach hand-kopiert (mit
   leichten Abweichungen bei Radius, Farbe, Gold-Dosierung).
3. **Gold verliert seine Wertigkeit** durch Überpräsenz (zwei goldene CTAs pro
   Screen, Gold als Standard-Icon-Hintergrund im Mitgliederbereich).

Dazu einige klare Einzelfehler (Radius-Bruch auf `/kontakt`, blauer statt
goldener Eisvogel im Footer, ein markenfremdes Foto auf `/kontakt`).

---

## Quick Wins — größte Wirkung, kleinster Aufwand

Diese fünf sind klein umzusetzen und wirken sofort:

1. **Button-Pfeil beim Hover mitbewegen.** In `Button.tsx:64` `group` ergänzen und
   dem Pfeil-Icon `transition-transform duration-300 group-hover:translate-x-1`
   geben — belebt praktisch **jeden** CTA der Seite auf einen Schlag.
2. **Eisvogel im Footer golden statt blau.** `Footer.tsx:115`
   `/eisvogel-blau.webp` → `/eisvogel-gold.webp` (Datei liegt bereits im Repo).
   Auf jeder Seite sichtbar.
3. **Radius-Bruch auf `/kontakt` beheben.** `kontakt/page.tsx:89` `rounded-[2px]`
   → `rounded-3xl` (wie die beiden Nachbarkarten).
4. **`hero-programm.png` → `.webp`.** `mitglieder/programm/page.tsx:43` auf die
   bereits vorhandene `.webp` umstellen (2,36 MB → 248 KB, es ist das LCP-Bild).
5. **Header-CTA entschärfen.** `Header.tsx:99/159` `variant="accent"` →
   `secondary`, damit Gold der jeweils *einen* Sektions-Hauptaktion vorbehalten
   bleibt.

---

## 🔴 Deutliche Wirkung

### K1 — Button-Pfeil ohne Hover-Bewegung (Kern des „stumpf"-Eindrucks)
`Button.tsx:64-69` setzt keine `group`-Klasse, daher animiert der `ArrowRight`
in praktisch jedem CTA **nicht** beim Hover (`Hero.tsx:134`, `FinalCta.tsx:35`,
`die-7-stufen/page.tsx:105/229`, `ConsciousnessTest.tsx:240/250`,
`AuthForm.tsx:139`, `ueber-mich/page.tsx:80`, u. a.). Der Button hebt sich zwar
(`hover:-translate-y-0.5`), sein Innenleben bleibt reglos. `ArrowLink.tsx:19-26`
macht es richtig vor (`group-hover:translate-x-1`).
→ **`group` in `Button.tsx:64` + `transition-transform duration-300
group-hover:translate-x-1` am Pfeil.** Zentrale Änderung, wirkt überall.

### K2 — Gold-Akzent nicht mehr exklusiv
Header zeigt dauerhaft (sticky) einen `accent`-Button (`Header.tsx:99/159`),
fast jede Sektion hat selbst einen (`Hero.tsx:132`, `Compass.tsx:76`,
`FinalCta.tsx:33`, `die-7-stufen/page.tsx:103/227`, `ConsciousnessTest.tsx:238/248`,
`EbookForm.tsx:144`). Ergebnis: meist **zwei goldene CTAs gleichzeitig** →
Gold wirkt inflationär statt hochwertig. Dieselbe CTA „Kostenloses Erstgespräch"
ist mal `accent` (Header, FinalCta), mal `secondary` (`Hero.tsx:136`).
→ Header-CTA auf `secondary`; Gold pro Screen nur der **einen** Hauptaktion.

### M1 — AA-Opacity-Anti-Pattern im meistgelesenen Text (~30 Stellen)
`globals.css:82-87` führt `ink-mid`/`ink-muted` genau deshalb ein, um
Opacity-Textstufen zu ersetzen — trotzdem wird `text-ink-soft/85|90` als
Fließtext auf Hell weiterverwendet: `blog/[slug]/page.tsx:264,277,278`,
`wissen/MarkdownDoc.tsx:216,230,265,301`, `mitglieder/praxis/[slug]/page.tsx`,
`mitglieder/stufe/[nr]/page.tsx`, `members/BegleiterChat.tsx`, u. v. m.; dazu
`text-ink-muted/50|70` (`BlogIndex.tsx:91`, `admin/vorlagen/VorlagenBrowser.tsx`).
Betrifft Blog-Lesetext, Wissensdatenbank, Begleiter-Chat.
→ `/85|90` → `text-ink-mid`, `/50|70` → `text-ink-muted` (ohne Opacity).

### B1 — Footer-Eisvogel im falschen Farbton (site-weit)
`Footer.tsx:114-121` nutzt `eisvogel-blau.webp` (kräftiges Blau/Orange) neben
Gold-Glow und goldenem `drop-shadow` — Bruch mit „warmes Gold". Die goldene
Version `public/eisvogel-gold.webp` liegt bereits im Repo, wird aber nirgends
referenziert.
→ `Footer.tsx:115` auf `/eisvogel-gold.webp`. Auf jeder Seite sichtbar.

### B2 — Markenfremdes Foto auf der Kontaktseite
`kontakt/page.tsx:35-42` nutzt `heiko-brain-portrait.webp`: Neon-Teal Sci-Fi-
Gehirn, T-Shirt mit sichtbarem Aufdruck „FCKNG SERIOUS". Widerspricht „ruhig,
edel, warmes Gold" fundamental — falsche Farbtemperatur, saloppes Wort auf einer
Vertrauens-/Conversion-Seite.
→ `heiko-hero.webp` oder `ueber-heiko-berg.webp` verwenden; alternativ neues
Porträt ohne Text-Print/Neon.

### L1 — Header breiter als der Seiteninhalt
`Header.tsx:71` nutzt `max-w-7xl` (80rem), der restliche Content läuft über
`Container size="default"` = `max-w-6xl` (72rem, `Container.tsx:15-19`). Ab
~1280px sitzt das Logo 64px weiter außen als die H1 darunter — die sonst
konsequente gemeinsame Kante bricht an der prominentesten Stelle.
→ Header auf `<Container size="default">` umstellen.

### L2 — Hero-CTA auf Mobil weit unter dem Fold
`Hero.tsx:87-140`: Reihenfolge Mobil ist Eyebrow → H1 → Porträt (~400px hoch)
→ Text → CTA. Kern-Handlung erst nach ≈1000px Scrollstrecke sichtbar — auf den
meisten Smartphones **nicht** above the fold.
→ Porträt auf Mobil verkleinern (`w-[min(200px,52vw)]`) und/oder CTA-Buttons
vor das Porträt ziehen. Browser-Check bei 375×667 / 390×844.

---

## 🟠 Merkliche Wirkung

### K3 — Kein gemeinsamer Input-Baustein, Fokus springt hart
Keine `Input.tsx` in `ui/`. Feld-Optik wird lokal dupliziert und weicht ab:
`ContactForm.tsx:53-54` + `EbookForm.tsx:131` haben **kein** `transition-colors`
(Rahmen springt hart auf `border-accent`) — die zwei konversionskritischsten
Formulare. `AuthForm`, `PasswordForm`, `DisplayNameForm` je leicht anders
(`bg-paper/60` vs. `bg-white`). Absende-Buttons in `PasswordForm.tsx:77-83` /
`DisplayNameForm.tsx:39-45` sind handgestrickte Pills ohne Inset-Highlight/Glow/
Lift → wirken flacher als die Marketing-CTAs.
→ `Input`/`Textarea`-Baustein extrahieren (`transition-colors duration-200`,
einheitlicher Fokus); Formular-Buttons auf `<Button>` umstellen.

### K4 — `ghost`-Variante fällt gegen die anderen ab
`Button.tsx:20` `ghost: "text-accent hover:text-ink"` — keine Fläche, kein
Schatten, kein Lift. Neben `primary/secondary/accent` wirkt er kaum wie ein
Button (`mitglieder/wissen/[slug]/page.tsx:252`).
→ mind. `hover:-translate-y-0.5` + dezente `hover:bg-accent/5`, oder als
`ArrowLink`/Text-Link führen.

### M2 — Zwei parallele Button-Systeme (eckig vs. Pille)
Neben `Button.tsx` (`rounded-xl`) existiert ein hand-kopiertes Pill-CTA
(`rounded-full bg-ink px-6 py-3 …`) in `MusterSpiegelPanel.tsx:108`,
`BegleiterChat.tsx:336`, `DetektorPanel.tsx:87`, `ReadingPanel.tsx:108`,
`mitglieder/page.tsx:394`, `admin/redaktionsplan/Planer.tsx:134` — gleiche
Rolle, zwei Formsprachen.
→ auf `<Button>` umstellen; falls Pille gewünscht, als `variant="pill"` ins
System aufnehmen.

### M3 — `Card` wird kaum genutzt, 61 hand-kopierte Duplikate
`Card.tsx:6-7` sagt selbst, es ersetze die kopierten
`rounded-2xl border border-ink/10 bg-surface p-6 shadow-card`-Strings — trotzdem
nur 5× importiert, das Muster aber **61×** wortwörtlich dupliziert (v. a.
`mitglieder/*`, `mitgliedschaft/page.tsx`). Jede System-Änderung an Karten muss
an 60+ Stellen nachgezogen werden.
→ Duplikate schrittweise durch `<Card>` ersetzen, beginnend in `mitglieder/*`.

### L3 — Drei helle Sektionen in Folge am Homepage-Ende
`page.tsx:16-26`: nach Testimonials (dunkel) folgen MaybeNotYou (`:22`
`bg-paper-aura`), LeadMagnet (`:20` `bg-surface-aura`), Faq (`:22` `bg-paper-aura`)
— drei fast identisch beige Sektionen im entscheidenden letzten Drittel vor der
Konversion; der sonst saubere dunkel/hell-Takt bricht, die Kapitel verschwimmen.
→ eine der drei auf Dunkel (`bg-cosmic on-dark`, Muster in `Compass.tsx:18`),
z. B. LeadMagnet — stellt den Takt wieder her.

### L4 — Karten-Raster ohne `h-full` (ungleiche Höhen)
`Card.tsx:29-35` setzt keine Höhe; in `SevenStages.tsx:22-27` und
`WhatToExpect.tsx:37-41` fehlt `h-full` → Karten „hängen" oben, Unterkanten
driften bei ungleich langen Texten auseinander. `gratis-ebook/page.tsx:167`
setzt den Fix für dieselben Karten bereits.
→ `h-full` auf `Card` + `Reveal` in Grid-Layouts.

### L5 — Leere Grid-Zelle am Zeilenende
`SevenStages.tsx:63-87`: 7+1 Karten in `lg:grid-cols-3` → letzte Zeile 2 Karten,
dritte Spalte leer. Stärker auf `gratis-ebook/page.tsx:164-187`: 7 Karten in
`lg:grid-cols-3` → letzte Zeile nur 1 Karte, ⅔ leer.
→ letzte Karte `lg:col-span-3` (Abschluss-Banner) oder `lg:grid-cols-4`.

### L6 — Uneinheitliche Sektionsabstände zwischen Seiten
Startseite durchgängig `py-16 sm:py-32`, andere Seiten weichen ohne Grund ab
(`ueber-mich` `py-12 sm:py-16` / `py-20 sm:py-28`, `die-7-stufen:205`
`py-16 sm:py-24`, `gratis-ebook` `py-16 sm:py-28`, `mitgliedschaft:73/198`
abweichend). Wirkt zufällig statt als Skala.
→ zwei feste Presets (`py-16 sm:py-28` Standard, `py-20 sm:py-32` betont).

### M4 — Gold als Standard-Icon-Fläche im Mitgliederbereich
`mitglieder/page.tsx` enthält ~20 Gold-Referenzen, u. a. gold getönte Icon-Kreise
an 6 Stellen (`:358,476,478,577,590,661`) — Gold ist hier nicht *ein* Akzent,
sondern Standardfarbe. Dazu 7× ein Pseudo-Gradient mit identischer Start-/
Endfarbe (`from-gold-500/15 to-gold-500/15`, `:357,577,590,661`,
`wissen/page.tsx:65`, `wissensdatenbank/page.tsx:69`, `journal/page.tsx:149`) —
optisch kein Verlauf, nur Kopier-Altlast.
→ Gold auf 1–2 Fokuspunkte/Seite; übrige Kreise `bg-ink/5`/`teal`/`leaf`;
Pseudo-Gradients zu flachem `bg-gold-500/15` vereinfachen.

### M5 — Eyebrow-Label hand-kopiert statt Komponente
`SectionHeading.tsx:5-23` definiert `<Eyebrow>` (`tracking-[0.28em]
text-accent/90` + Haarlinie), an 13 Stellen aber abweichend hand-geschrieben
(`text-[0.7rem] … tracking-[0.2em] text-accent`, ohne Haarlinie) — v. a.
`mitglieder/page.tsx` (7×), `journal`, `stufe/[nr]`, `ProgrammBegleiter`.
→ auf `<Eyebrow>` umstellen; schmalere Sperrung ggf. als Prop.

### B3 — Video-Poster laufen an next/image vorbei
`VideoMessage.tsx:85` + `VideoEmbed.tsx:44` rendern die Thumbnails aus
`public/video-thumbnails/**` per rohem `<img>` (400–720 KB PNG, 1280×720) —
kein WebP/AVIF, kein `sizes`-Downscaling für mobile Karten. Betrifft fast jede
Stufen-/Praxis-/Vertiefungs-Karte.
→ `next/image` mit `onError`-Fallback prüfen; sonst Quell-PNGs für kleine
Kartenformate vorskalieren.

### B4 — `hero-programm.png` statt `.webp` (LCP-Bild)
`mitglieder/programm/page.tsx:43` lädt die 2,36-MB-PNG mit `fill priority`,
obwohl `hero-programm.webp` (248 KB, gleiche Maße) existiert.
→ auf `.webp` umstellen, PNG löschen (~2,1 MB).

---

## 🟡 Feinschliff

- **K5 — Radius-Ausreißer `rounded-[2px]`** in `PhotoFrame.tsx:32,71`,
  `VideoMessage.tsx:62`, `MaybeNotYou.tsx:59` gegen das sonstige System
  (`rounded-xl`…`3xl`). Falls Absicht (Passepartout-Look): als `--radius-frame`
  ins `@theme` + in `PhotoFrame` kapseln (statt in `MaybeNotYou` erneut tippen);
  sonst auf `rounded-lg` anheben, damit es nicht wie ein vergessener Wert aussieht.
- **K6 — Doppelte Focus-Definition:** `Button.tsx:65` setzt `outline-offset-2`,
  `globals.css:209-213` global `offset-3` → Buttons haben anderen Fokusring als
  Links/Inputs. Vereinheitlichen.
- **K7 — Sterne im `false`-Zustand wirken „verwaschen":** `StarRating.tsx:17-22`
  nutzt `text-ink/15` auf der Fill-Form statt einer Outline. Stroke-Variante
  rendern (`fill="none" stroke="currentColor"`, Preset in `Icon.tsx:19-25`).
- **K8 — Duplizierte Bausteine:** `mitgliedschaft/page.tsx:332-336` rendert
  Sterne manuell statt `<StarRating>`; `:460-475` ein zweites FAQ-Akkordeon
  statt `Faq`. Vereinheitlichen (ggf. `Faq tone="dark"`-Variante).
- **K9 — Test-Antwortkarten ohne Lift:** `ConsciousnessTest.tsx:337-342` fehlt
  `hover:-translate-y-0.5`/Schatten wie beim `secondary`-Button.
- **M6 — Hex-Werte im Basis-Button:** `Button.tsx:13` `from-[#243731]` /
  `hover:from-[#2b423a]` — einziger Hex-Ausreißer in `src/`. Als `--color-ink-700/600`
  ins `@theme`.
- **M7 — `text-[NNrem]`-Arbiträrwerte (>150×):** untereinander konsistent, aber
  außerhalb des Theme-Systems (`1.02rem` vs. `1.05rem` vs. `0.98rem` für denselben
  Zweck). 3–4 wiederkehrende Größen als `--text-lead`/`--text-body` etc. benennen.
- **M8 — Dupliziertes Seiten-H1-Pattern (15×):** `text-[2rem] font-medium …
  sm:text-4xl` in 15 Dateien; es gibt `PageHero` für dunkle Heros, aber keine
  Entsprechung für die helle einfache Kopfzeile. `PageHeading`-Komponente bauen.
- **M9 — `--font-serif` ist ein toter Token** (`globals.css:15`, nirgends genutzt)
  → entfernen oder als Alias dokumentieren.
- **M10 — Badge-Farbsprache uneinheitlich** (Gold/Grau/Teal ohne Regel,
  `mitglieder/page.tsx:492-507` vs. `admin/redaktionsplan/Planer.tsx:42-46`) →
  kleine Konvention dokumentieren (Gold = aktiv/empfohlen, Grau = neutral,
  Teal = Meta/Zahlen).
- **L7 — WhyMe → WhatToExpect** zwei helle Sektionen ohne Trenner; `seam-gold`
  auch auf `WhatToExpect.tsx:16`.
- **L8 — `FinalCta.tsx:9`** `py-24 sm:py-32` weicht vom Homepage-Standard ab —
  vereinheitlichen oder kommentieren.
- **L9 — Header-Gruppe gedrängt:** `Header.tsx:91-103` `gap-4` zwischen
  Sekundärlink und Primär-CTA → `gap-5`/`gap-6`.
- **L10 — Kontaktseite knapper Abschluss:** `kontakt/page.tsx:30` `pb-8` ohne
  `sm:`-Stufe → `pb-12 sm:pb-24`.
- **B5 — `heiko-portrait.webp`** (Sepia auf Weiß) bricht in Avatar-Kreisen
  (`gratis-ebook:234`, `WhyMe.tsx:42`, `blog/[slug]:289`) den warmen Look →
  Ausschnitt aus `heiko-hero`/`ueber-heiko-berg` freistellen.
- **B6 — Eingebrannter Text in Hero-Bildern:** `hero-praxis.webp` (Titel + evtl.
  Kollision mit echtem H1, `praxis/page.tsx:21-33`) und `hero-programm.webp`
  (Wordmark) — bei Neugenerierung ohne Text rendern. Browser-Check ≥1024px.
- **B7 — `kompass-weg.webp` Mobil-Crop:** `die-7-stufen/page.tsx:44-62`
  (`h-[46rem] object-cover object-top`) — Kompass könnte auf schmalen Screens aus
  dem Bild fallen. Bei 375px prüfen, ggf. `object-position` Richtung „center right".
- **B8 — Tote/schwere Assets:** `ebook-cover.png` (770 KB, `.webp` existiert),
  `video-thumbnails/**` ~70 MB ungenutzte `-hell`/`-tuerkis`-Varianten,
  `blog/*.png` ~47 MB (werden zur Laufzeit optimiert, aber schweres Ausgangsmaterial).
  Klären/löschen.

---

## Positivbefunde (zur Einordnung)

- Buttons, Karten, Blog-Index, Testimonials sind bereits mit Verlauf,
  Lichtkante, farbigem Glow und Hover-Lift gebaut — kein „billiges" Fundament.
- Kern-Bildwelt sehr konsistent und markengerecht (dunkel/warm/golden/cinematisch);
  `PageHero`/`LessonHero` lösen das Crop-Problem vorbildlich (automatisches
  Seitenverhältnis, mobiles Bildband statt hartem Beschnitt).
- Dekorbilder konsequent `alt="" aria-hidden`, informative Bilder mit sinnvollen
  Alt-Texten. Keine toten Bildpfade.
- Farbdisziplin insgesamt hoch: nur **ein** Hex-Ausreißer im ganzen `src/`-Baum.

---

## Die 3 wichtigsten nächsten Schritte

1. **Micro-Interaction für Buttons** (K1) + **Header-CTA entschärfen** (K2) —
   der größte Hebel gegen den „stumpf"-Eindruck, an einer zentralen Stelle.
2. **Design-System durchsetzen:** `Card` (M3), Pill-Buttons (M2), `Eyebrow` (M5)
   und die Opacity-Textstufen (M1) vereinheitlichen — stoppt das Auseinanderdriften
   und hebt Lesbarkeit/Kontrast im meistgelesenen Content.
3. **Bild-Quick-Wins** (B1 Eisvogel golden, B2 Kontakt-Foto, B4 `hero-programm.webp`)
   und **Homepage-Takt** (L3) — sichtbare Sprünge in Markenwirkung und Fluss mit
   wenig Aufwand.

> Umsetzung erst nach Freigabe. Empfehlung: mit den **Quick Wins** starten, dann
> die drei System-Vereinheitlichungen (Card/Button/Eyebrow/Text) als eigenen
> Durchgang. Für die Fold-/Crop-Funde (L2, B6, B7) vorab kurz im Browser
> gegenprüfen (375×667 und ~1440px).
