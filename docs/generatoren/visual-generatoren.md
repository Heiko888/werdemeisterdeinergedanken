# Bild-Generatoren: Carousels & Reels-Cover

Zuständiger Team-Agent: **visual-dokumentar**.

**Gemeinsames Marken-System:** Verlauf `linear-gradient(120deg,#8cc63f→#21b2bd)`
(leaf→teal), Schriften Fraunces (Serif) / Inter (Sans), Handle
`www.werdemeisterdeinergedanken.de`. Geteilte Assets `docs/reels/covers/_fonts.css`
und `docs/reels/covers/logo.png` (das Cover-Studio ist die Quelle; das
Carousel-`build.mjs` kopiert sie herüber). Generierte Ordner `build/`,
`export/` und `export-overlay/` sind git-ignoriert.

**Sonderzeichen im Markup:** Der Rechtspfeil kommt als gezeichnetes Inline-SVG
aus **`docs/_glyphs.mjs`** (`ARROW`), nicht als Textzeichen – `U+2192` fehlt im
`unicode-range` von `_fonts.css`, wodurch Chromium sonst eine System-Schrift
zöge und die PNGs von Rechner zu Rechner leicht abwichen. Betrifft
`build.mjs` („wischen →" im Slide-Footer), `marketing-serien.mjs` und
`stufen-ueberblick.mjs` (CTA-Buttons). In den HTML-Galerieseiten (`index.html`)
darf ein „→" stehen bleiben – die werden nicht zu PNG gerendert.

> **Noch offen:** `docs/reels/covers/data.mjs` setzt in drei Cover-Titeln
> `≠` (**U+2260**) – „Dein Feed ≠ die Welt" (05), „Laut ≠ Mehrheit" (07),
> „Titel ≠ Wahrheit" (08). Auch dieses Zeichen fehlt im `unicode-range` und
> kommt daher aus einer System-Schrift; die drei Cover sind also nicht
> maschinenunabhängig reproduzierbar. Kein akutes Problem, weil
> `docs/reels/covers/export/` git-ignoriert ist und kein eingechecktes Asset
> davon abhängt. Eine Behebung analog zum Pfeil (`NEQ` in `docs/_glyphs.mjs`)
> ist möglich, verlangt aber typografisches Augenmaß: das Zeichen steht in
> 120px-Headlines direkt neben echten Inter-Glyphen.

**Chromium-Suche** in allen PNG-Exportern (`findChrome`): `CHROME_BIN` →
`require("playwright").chromium.executablePath()` → `PLAYWRIGHT_BROWSERS_PATH`
bzw. `/opt/pw-browsers` → System-`which`. Bewusst Playwright-Viewport-Screenshot
statt Chromium-CLI `--window-size` (letzteres kappt je Build ~87px unten).

---

## Skript-Übersicht

| Skript | Chromium | npm-Script | Ausgabe |
|---|---|---|---|
| `carousels/data.mjs` | nein | – (Modul) | Exporte (Parser) |
| `carousels/build.mjs` | nein | `carousels:slides` | `docs/carousels/build/**` HTML |
| `carousels/export-png.mjs` | **ja** | `carousels:png` | `docs/carousels/export/**/slide-NN.png` **+** `docs/carousels/export-overlay/**` (transparent) |
| `carousels/marketing-serien.mjs` | **ja** | – (`node …`) | `docs/carousels/export/<serie>/**` PNG |
| `carousels/stufen-ueberblick.mjs` | **ja** | – (`node …`) | `docs/carousels/export/stufen-ueberblick/**` PNG |
| `reels/covers/data.mjs` | nein | – (Modul) | Exporte (Motive/Formate) |
| `reels/covers/build.mjs` | nein | `covers` | `docs/reels/covers/**` HTML |
| `reels/covers/export-png.mjs` | **ja** | `covers:png` | `docs/reels/covers/export/**/cover-NN.png` **+** `docs/reels/covers/export-overlay/**` (transparent) |
| `reels/covers/endcard.mjs` | nein | `endcard` | `docs/reels/covers/endcard/*.html+css` |
| `reels/cover-template.html` | nein | – (statisch) | Design-Referenz |

---

## Carousel-Studio (`docs/carousels/`) — MD-basiert

**`data.mjs`** — Parser/Config-Modul (kein direkter Start; importiert).
Liest die vier Serien-Markdowns aus `docs/skripte/carousels/`
(`selbstverteidigung.md`, `stufen.md`, `praxis.md`, `vertiefungen.md`;
`marketing.md` wird hier **nicht** geladen). `loadCarousels()` zerlegt sie per
Regex (`## slug · Topic — Untertitel`, `**Slide N · Cover/CTA:** …`) in
Carousel-/Slide-Objekte. Exportiert `FORMATS` (3 Formate, alle 1080px breit:
`feed-4x5` 1080×1350, `feed-1x1` 1080×1080, `reel-9x16` 1080×1920). **Single
Source of Truth = die MD-Dateien**; die Serienliste `SERIES` ist hartkodiert.

**`build.mjs`** (`npm run carousels:slides`) — rendert jede Slide als gebrandetes
HTML in 3 Formaten + Vorschau-Galerien. Kein Chromium. Kopiert vorab
`_fonts.css`/`logo.png` aus `../reels/covers/`. Ausgaben unter
`docs/carousels/build/<serie>/<slug>/<format>/slide-NN.html` +
`build/index.html`. Optionales Arg = eigenständige Artifact-Galerie mit
eingebetteten Fonts/Logo. Stolperfalle: das `OV`-Overrides-Objekt referenziert
Slides per `serie/slug/num` — bei geänderter MD-Nummerierung greifen die
Rich-Layouts nicht mehr.

**`export-png.mjs`** (`npm run carousels:png`) — **ruft zuerst automatisch
`build.mjs` auf** (`spawnSync`) und rendert dann die HTMLs pixelgenau als PNG.
Filter: `node … stufen` (Serie), `… stufen autopilot` (Serie+Carousel). Env:
`SCALE` (Default 1), `FORMAT` (einzelnes Format), `CHROME_BIN`,
`PLAYWRIGHT_BROWSERS_PATH`. Ausgaben:
`docs/carousels/export/<serie>/<slug>/<format>/slide-NN.png`. Chromium
zwingend, sonst harter Abbruch.

**Overlay-Variante (im selben Lauf):** Jede Slide wird ein zweites Mal
geschossen — Hintergrundschicht per injiziertem CSS ausgeblendet
(`.slide::before`, `.slide::after`, `.bg` → `display:none`, Body transparent),
Screenshot mit `omitBackground: true`. Ergebnis: dieselbe Typografie als
**transparente PNG-Ebene** unter
`docs/carousels/export-overlay/<serie>/<slug>/<format>/slide-NN.png`. Kein
zweiter Renderlauf, kein dupliziertes Layout — der Look bleibt garantiert
identisch. In Canva: eigenes Foto darunterlegen, Overlay darüber; der im
Overlay enthaltene Scrim hält den Text lesbar.

**`marketing-serien.mjs`** (`node …`, kein npm-Script) — eigenständiger Generator
für 5 Marketing-Carousels (`60000-gedanken`, `4-wege-freiheit`, `wer-denkt-hier`,
`studien-fakten`, `gratis-ebook`); Slide-Daten **inline** (`SERIES`-Array), baut
HTML **und** PNG in einem Durchgang. Kein `data.mjs`/keine MD. Ausgabe
`<OUTBASE>/<serie>/<format>/slide-NN.png` (Default `docs/carousels/export/`).
Kein `SCALE`-Support.

**`stufen-ueberblick.mjs`** (`node …`, kein npm-Script) — eigenständiges
9-Slide-Carousel „Die 7 Stufen deiner Meisterschaft" (Cover + 7 Stufen + CTA),
Inhalte inline (`SLIDES`), direkt als PNG nach
`docs/carousels/export/stufen-ueberblick/<format>/slide-NN.png`.

---

## Cover-Studio (`docs/reels/covers/`) — inline-Daten

**`data.mjs`** — nebenwirkungsfreies Konstanten-Modul: 6 Bereiche
(`selbstverteidigung` 16, `stufen` 7, `praxis` 13, `vertiefungen` 13,
`wissenschaft` 7, `landing` 3) und 5 Formate (`reel-9x16`, `feed-4x5`,
`feed-1x1`, `landscape-16x9` 1920×1080, `pin-2x3` 1000×1500). Alle Motiv-Texte
inline; hier ändern.

**`build.mjs`** (`npm run covers`) — rendert alle Motive × 5 Formate als
gebrandete HTML-Dateien + Iframe-Galerien. Kein Chromium. Ausgaben unter
`docs/reels/covers/<bereich>/<format>/cover-NN.html` (+ `_cover.css`,
`index.html`) und `covers/index.html`. Optionales Arg = Artifact-Galerie.

**`export-png.mjs`** (`npm run covers:png`) — rendert jede `cover-NN.html` als
PNG. **Baut NICHT selbst** — `npm run covers` muss vorher gelaufen sein
(Unterschied zum Carousel-Export). Filter: `node … selbstverteidigung`,
`node … stufen reel-9x16`. Env `SCALE`. Ausgabe
`docs/reels/covers/export/<bereich>/<format>/cover-NN.png`.

**Overlay-Variante (im selben Lauf):** wie beim Carousel-Export — Hintergrund
per CSS ausgeblendet (`.cover::before`, `.bg`), `omitBackground: true`,
Ausgabe parallel unter
`docs/reels/covers/export-overlay/<bereich>/<format>/cover-NN.png`. Für
Reel-Cover (Titel + Handle über eigenem Foto) der Regelfall.

**`endcard.mjs`** (`npm run endcard`) — Outro-Karten in 3 Formaten, Inhalte
inline. **Nur HTML/CSS, kein PNG** (PNG müsste manuell per Chromium-Screenshot).
Ausgabe `docs/reels/covers/endcard/endcard-<key>.html` + `_endcard-<key>.css`.

**`cover-template.html`** — statische Design-Referenz eines 9:16-Covers mit
eingebetteten Fonts (base64). Von keinem Skript referenziert; wird bei
Design-Änderungen **nicht** automatisch mit `build.mjs` synchronisiert.

---

## Pipeline-Reihenfolge

**Carousel-Studio (MD):**
1. Text pflegen in `docs/skripte/carousels/{selbstverteidigung,stufen,praxis,vertiefungen}.md`.
2. `npm run carousels:slides` → HTML in `docs/carousels/build/` (Vorschau `build/index.html`).
3. `npm run carousels:png` → **baut automatisch neu** und rendert PNGs nach
   `docs/carousels/export/` **sowie** die transparenten Ebenen nach
   `docs/carousels/export-overlay/`.

**Cover-Studio (inline):**
1. Motive pflegen in `docs/reels/covers/data.mjs`.
2. `npm run covers` → Cover-HTMLs/Galerien.
3. `npm run covers:png` → PNGs nach `docs/reels/covers/export/` **und**
   transparente Ebenen nach `docs/reels/covers/export-overlay/` (**manueller
   Zweischritt** — baut nicht selbst).

**Eigenständige Generatoren** (`marketing-serien.mjs`, `stufen-ueberblick.mjs`)
und **`endcard.mjs`** laufen ohne Zwischenschritt/`data.mjs`; nur Fonts/Logo aus
`docs/reels/covers/` nötig.

---

## Cover-Nummer ↔ Thema (alle Serien)

Die Reel-Cover werden **je Serie** fortlaufend nummeriert
(`reel-<serie>-NN.webp`). Das Admin-Dashboard `/admin/vorlagen` betitelt sie nur
nach **Serie + Nummer** („Vertiefungen · Cover 11"), **nicht** nach Thema — und
jede Serie hat ihre eigene „01, 02, …". Die Nummer steht außerdem sichtbar oben
rechts im Cover selbst. Die Reihenfolge ergibt sich aus `COLLECTIONS` in
`docs/reels/covers/data.mjs`; die Zuordnung unten ist gegen die gerenderten
Bilder verifiziert.

### Die 7 Stufen (`reel-stufen-NN`)

| Cover | Thema | Motiv-Text | Slug |
|:---:|---|---|---|
| 01 | Autopilot | „Du wirst **gelebt**" | `autopilot` |
| 02 | Erwachen | „Der Moment, in dem du **aufwachst**" | `erwachen` |
| 03 | Selbstbeobachtung | „Sieh dir selbst **zu**" | `selbstbeobachtung` |
| 04 | Emotionale Reifung | „Fühlen – ohne **festzuhalten**" | `emotionale-reifung` |
| 05 | Schöpferkraft | „Du erschaffst – **bewusst**" | `schoepferkraft` |
| 06 | Innere Ausrichtung | „Kopf, Herz und **Handeln**" | `innere-ausrichtung` |
| 07 | Meisterschaft | „Du bist der **Gestalter**" | `meisterschaft` |

### Vertiefungen (`reel-vertiefungen-NN`)

| Cover | Thema | Motiv-Text | Slug (Carousel/PDF) |
|:---:|---|---|---|
| 01 | Automatische Gedanken | „Die Stimme, die schon **geurteilt** hat" | `automatische-gedanken` |
| 02 | Konditionierung | „Alte Reize feuern **noch**" | `konditionierung` |
| 03 | Kognitive Verzerrungen | „Denkfehler, die sich **wahr** anfühlen" | `kognitive-verzerrungen` |
| 04 | Kernüberzeugungen | „Die Regel unter dem **Gedanken**" | `kernueberzeugungen` |
| 05 | Der innere Kritiker | „Wessen Stimme ist das **wirklich?**" | `der-innere-kritiker` |
| 06 | Neuroplastizität | „Dein Gehirn kann sich **ändern**" | `neuroplastizitaet` |
| 07 | Reiz-Reaktions-Lücke | „Zwischen Reiz und Reaktion: **du**" | `die-reiz-reaktions-luecke` |
| 08 | Grübeln | „Raus aus der **Endlosschleife**" | `gruebeln-und-gedankenkreisen` |
| 09 | Emotionsregulation | „Fühlen, ohne zu **ertrinken**" | `emotionsregulation` |
| 10 | Selbstmitgefühl | „Sei dein eigener **Freund**" | `selbstmitgefuehl` |
| 11 | **Werte & Ziele** | „Die Richtung unter dem **Tun**" | `werte-und-ziele` |
| 12 | Muster & Körper | „Wenn Denken unter die **Haut** geht" | `muster-koerper-und-gesundheit` |
| 13 | Integration & Weitergabe | „Vom Wissen zur gelebten **Haltung**" | `integration-und-weitergabe` |

### Praxis (`reel-praxis-NN`)

| Cover | Thema | Motiv-Text | Slug |
|:---:|---|---|---|
| 01 | Atembeobachtung | „Zurück zum **Atem**" | `atembeobachtung` |
| 02 | Der innere Beobachter | „Wer schaut da **zu?**" | `der-innere-beobachter` |
| 03 | Body-Scan | „Hör deinem Körper **zu**" | `body-scan` |
| 04 | Herz-Kohärenz | „Bring Herz und Atem in **Takt**" | `herz-kohaerenz` |
| 05 | Verlängertes Ausatmen | „Länger aus – **ruhiger**" | `verlaengertes-ausatmen` |
| 06 | 4-6-Atmung | „Vier ein. Sechs **aus.**" | `4-6-atmung` |
| 07 | Box Breathing | „Atme im **Viereck**" | `box-breathing` |
| 08 | Der Autopilot-Check | „Läufst du – oder **lebst** du?" | `der-autopilot-check` |
| 09 | Morgen-Ausrichtung | „Wie willst du den Tag **treffen?**" | `morgen-ausrichtung` |
| 10 | Abend-Reflexion | „Was war heute **wirklich?**" | `abend-reflexion` |
| 11 | Loslass-Ritual | „Leg es **ab**" | `loslass-ritual` |
| 12 | Präsenz-Spaziergang | „Geh – ganz **da**" | `praesenz-spaziergang` |
| 13 | Die tägliche Rückkehr | „Immer wieder **zurück**" | `die-taegliche-rueckkehr` |

### Mentale Selbstverteidigung (`reel-selbstverteidigung-NN`)

| Cover | Thema | Motiv-Text | Slug |
|:---:|---|---|---|
| 01 | Propaganda | „Ohne eine einzige **Lüge**" | `propaganda` |
| 02 | Framing | „Ein **Wort** ändert alles" | `framing` |
| 03 | Sprache & Etiketten | „Ein Wort beendet jede **Debatte**" | `sprache-und-etiketten` |
| 04 | Medien-Agenda | „Nicht WAS – sondern **WORÜBER**" | `medien-agenda` |
| 05 | Algorithmen | „Dein **Feed** ≠ die Welt" | `algorithmen` |
| 06 | Werbung & Mangel | „Sie verkauft dir den **Mangel**" | `werbung-und-mangel` |
| 07 | Gruppendruck | „Laut ≠ **Mehrheit**" | `gruppendruck` |
| 08 | Autoritätshörigkeit | „Titel ≠ **Wahrheit**" | `autoritaetshoerigkeit` |
| 09 | Angst-Steuerung | „Angst macht dich **lenkbar**" | `angst-steuerung` |
| 10 | Wiederholung | „Oft gehört = **wahr?**" | `wiederholung` |
| 11 | Ablenkung | „Keine Lüge. Nur **Lärm.**" | `ablenkung` |
| 12 | Kognitive Dissonanz | „Warum du **wegschaust**" | `kognitive-dissonanz` |
| 13 | Normalisierung | „„War doch schon immer **so**?"" | `normalisierung` |
| 14 | Bildmacht | „Ein Bild ist kein **Beweis**" | `bildmacht` |
| 15 | Identität & Meinung | „Hast du eine Meinung – oder sie **dich?**" | `identitaet-und-meinung` |
| 16 | Reizüberflutung | „Dein Gehirn im **Daueralarm**" | `reizueberflutung` |

### Die Wissenschaft dahinter (`reel-wissenschaft-NN`)

| Cover | Thema | Motiv-Text |
|:---:|---|---|
| 01 | Freier Wille | „Wer entscheidet – du oder dein **Gehirn?**" |
| 02 | Neuroplastizität | „Dein Gehirn bleibt **formbar**" |
| 03 | Gefühle benennen | „Ein Wort, das dich **beruhigt**" |
| 04 | Denkfehler | „Dein Kopf **täuscht** dich" |
| 05 | Willenskraft | „Willenskraft ist **überschätzt**" |
| 06 | Abschweifender Geist | „47 % der Zeit **woanders**" |
| 07 | Placebo | „Erwartung wirkt im **Körper**" |

### Landing / Funnel (`reel-landing-NN`)

| Cover | Thema | Motiv-Text |
|:---:|---|---|
| 01 | Nicht deine Schuld | „Nicht deine **Schuld**" |
| 02 | Es ist ein Programm | „Es ist ein **Programm**" |
| 03 | Zu wenig Disziplin? | „Zu wenig Disziplin? **Nein.**" |

**Hinweise:**
- Dieselbe Reihenfolge gilt für die Galerie-Thumbnails
  (`thumbs/reels/reel-<serie>-NN.webp`).
- Die **Slug-Schreibweise** der Deep-Dives in `src/lib/deep-dives.ts` weicht bei
  einigen ab (z. B. `innerer-kritiker`, `reiz-reaktions-luecke`, `gruebeln`,
  `muster-und-koerper`, `wiederholung-wahrheit`).
- Der Produktions-**Status-Tracker** `src/lib/reels.ts` nummeriert Reels
  unabhängig von der Cover-Nummer — beide nicht verwechseln.

---

## Carousels: Ordner ↔ Thema ↔ Slides

Carousels liegen unter `content/vorlagen/carousels/<serie>__<slug>/` (Ordner mit
`slide-01.webp … slide-NN.webp`) plus je ein gleichnamiges `.zip`. Im
Admin-Dashboard sind sie – anders als die Reel-Cover – **nach Thema** benannt.
**54 Carousels** insgesamt. Die vier Serien `stufen/praxis/vertiefungen/
selbstverteidigung` stammen aus `docs/skripte/carousels/*.md` (via `data.mjs`),
die Marketing-Serie aus `MARKETING_TITEL` in `tools/vorlagen/marketing-carousels.mjs`.

### Marketing / Funnel (5) — Slugs `marketing__…`

| Slug | Titel (Dashboard) | Slides |
|---|---|:---:|
| `60000-gedanken` | Bis zu 60.000 Gedanken am Tag | 9 |
| `4-wege-freiheit` | 4 Wege zur mentalen Freiheit | 8 |
| `wer-denkt-hier` | Wer denkt hier eigentlich? | 8 |
| `studien-fakten` | Studien-Fakten | 9 |
| `gratis-ebook` | Gratis-E-Book | 5 |

### Die 7 Stufen (7) — Slugs `stufen__…`

| Slug | Thema | Slides |
|---|---|:---:|
| `autopilot` | 01 · Autopilot | 7 |
| `erwachen` | 02 · Erwachen | 7 |
| `selbstbeobachtung` | 03 · Selbstbeobachtung | 7 |
| `emotionale-reifung` | 04 · Emotionale Reifung | 7 |
| `schoepferkraft` | 05 · Schöpferkraft | 7 |
| `innere-ausrichtung` | 06 · Innere Ausrichtung | 7 |
| `meisterschaft` | 07 · Meisterschaft | 7 |

### Praxis (13) — Slugs `praxis__…`

| Slug | Thema | Slides |
|---|---|:---:|
| `atembeobachtung` | Atembeobachtung | 6 |
| `der-innere-beobachter` | Der innere Beobachter | 6 |
| `body-scan` | Body-Scan | 6 |
| `herz-kohaerenz` | Herz-Kohärenz | 6 |
| `verlaengertes-ausatmen` | Verlängertes Ausatmen | 6 |
| `4-6-atmung` | 4-6-Atmung | 6 |
| `box-breathing` | Box Breathing | 6 |
| `der-autopilot-check` | Der Autopilot-Check | 6 |
| `morgen-ausrichtung` | Morgen-Ausrichtung | 6 |
| `abend-reflexion` | Abend-Reflexion | 6 |
| `loslass-ritual` | Loslass-Ritual | 6 |
| `praesenz-spaziergang` | Präsenz-Spaziergang | 6 |
| `die-taegliche-rueckkehr` | Die tägliche Rückkehr | 6 |

### Vertiefungen (13) — Slugs `vertiefungen__…`

| Slug | Thema | Slides |
|---|---|:---:|
| `automatische-gedanken` | Automatische Gedanken | 7 |
| `konditionierung` | Konditionierung | 7 |
| `kognitive-verzerrungen` | Kognitive Verzerrungen | 7 |
| `kernueberzeugungen` | Kernüberzeugungen | 7 |
| `der-innere-kritiker` | Der innere Kritiker | 7 |
| `neuroplastizitaet` | Neuroplastizität | 7 |
| `die-reiz-reaktions-luecke` | Reiz-Reaktions-Lücke | 7 |
| `gruebeln-und-gedankenkreisen` | Grübeln | 7 |
| `emotionsregulation` | Emotionsregulation | 7 |
| `selbstmitgefuehl` | Selbstmitgefühl | 7 |
| `werte-und-ziele` | Werte & Ziele | 7 |
| `muster-koerper-und-gesundheit` | Muster & Körper | 7 |
| `integration-und-weitergabe` | Integration & Weitergabe | 7 |

### Mentale Selbstverteidigung (16) — Slugs `selbstverteidigung__…`

| Slug | Thema | Slides |
|---|---|:---:|
| `propaganda` | Propaganda | 7 |
| `framing` | Framing | 7 |
| `sprache-und-etiketten` | Sprache & Etiketten | 7 |
| `medien-agenda` | Medien-Agenda | 7 |
| `algorithmen` | Algorithmen | 7 |
| `werbung-und-mangel` | Werbung & Mangel | 7 |
| `gruppendruck` | Gruppendruck | 7 |
| `autoritaetshoerigkeit` | Autoritätshörigkeit | 7 |
| `angst-steuerung` | Angst-Steuerung | 7 |
| `wiederholung` | Wiederholung | 7 |
| `ablenkung` | Ablenkung | 7 |
| `kognitive-dissonanz` | Kognitive Dissonanz | 7 |
| `normalisierung` | Normalisierung | 7 |
| `bildmacht` | Bildmacht | 7 |
| `identitaet-und-meinung` | Identität & Meinung | 7 |
| `reizueberflutung` | Reizüberflutung | 7 |

Die Slide-Preview je Ordner ist eine 4:5-`webp`; der Voll-Download (`<serie>__
<slug>.zip`) enthält alle drei Formate (`feed-4x5`, `feed-1x1`, `reel-9x16`) als
`webp@1080`.
