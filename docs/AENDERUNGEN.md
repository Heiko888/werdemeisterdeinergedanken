# Änderungen / Serverstand

Chronologisches Protokoll wichtiger Änderungen am Projekt, damit jederzeit der
aktuelle Stand nachvollziehbar ist. Neueste Einträge oben.

---

## 2026-09-03 – Programm-Seite: Titelbild getauscht (neues Neon-Gehirn-Logo)

Das Titelbild der Mitglieder-Programm-Seite (`/mitglieder/programm`) wurde gegen
die neue Motiv-Variante getauscht: identische Meditations-Szene, aber mit dem
**leuchtenden Neon-Gehirn-Logo** (orange Linien-Umriss) statt des zuvor
gefüllten goldenen Gehirn-/Baum-Symbols.

**Änderungen**

- `public/hero-programm.webp` **neu erzeugt** aus dem hochgeladenen PNG
  `public/2fd37d3c-2fe5-4387-910f-6408a0b4f877.png` (1672×941, unverändertes
  Seitenverhältnis). Aus dem PNG (~2,3 MB) wurde ein optimiertes WebP
  (Qualität 82, ~183 KB) erzeugt und die Datei **unter gleichem Namen** ersetzt.
- **Kein Code-Änderung** nötig: `src/app/mitglieder/programm/page.tsx` referenziert
  weiterhin `/hero-programm.webp`; das Seitenverhältnis wird via
  `heroImageAspect()` automatisch aus dem Dateikopf gelesen.

Hinweis: Das Roh-PNG `2fd37d3c-…png` liegt bereits auf `main` (vom Upload) und
wurde **nicht** zusätzlich in diesen Branch übernommen. Das alte Bild bleibt über
die Git-Historie wiederherstellbar.

---

## 2026-09-02 – Aufräumen: ungenutzte hochgeladene Roh-PNGs entfernt

Die zuvor hochgeladenen großen Roh-PNGs mit UUID-Dateinamen wurden aus `public`
entfernt – sie waren **nirgends im Code referenziert** und wurden nur unnötig
mit ausgeliefert (~10,2 MB). Das für den Footer verwendete freigestellte Motiv
liegt weiterhin als `public/eisvogel-blau.webp` vor (daraus erzeugt).

**Entfernt (je 1,6–2,5 MB):**

- `public/0d6daecd-ba2c-487a-982b-e85fe433d466.png` (freigestellter Eisvogel –
  Quelle für `eisvogel-blau.webp`, wird nicht mehr direkt gebraucht)
- `public/506998a4-c2b1-4f4d-9c02-6841d20063b7.png` (Eisvogel-Foto, dunkler Grund)
- `public/be4c45e2-facd-4b29-b187-8227d26a7f75.png` (Eisvogel-Foto, dunkler Grund)
- `public/25703de6-7e68-4ae2-8db1-ca3cd96a36dc.png` (Meditations-Szene)
- `public/857bc3c9-7eaf-44f3-b9e4-7e10a58cb838.png` (goldenes Gehirn-Logo)

Alle Dateien bleiben über die Git-Historie (Commit `a8c9ecb`) wiederherstellbar,
falls sie doch noch gebraucht werden. `hero-programm.png` bleibt erhalten (wird
auf der Mitglieder-Programm-Seite verwendet).

---

## 2026-09-02 – Footer-Eisvogel: freigestelltes Motiv statt Foto-Rahmen

Der zuvor als **gerahmtes Foto** (dunkler Hintergrund, `rounded-2xl`) eingebaute
blaue Eisvogel wurde durch die **freigestellte, transparente Variante** ersetzt und
wieder auf den **kleinen Icon-Look mit sanftem Gold-Glow** gebracht – wie beim
ursprünglichen goldenen Eisvogel, nur in den echten Eisvogel-Farben.

**Änderungen**

- `public/eisvogel-blau.webp` **neu erzeugt** aus der freigestellten Vorlage
  `public/0d6daecd-ba2c-487a-982b-e85fe433d466.png` (transparenter Hintergrund,
  auf Motiv zugeschnitten, 640 px, WebP mit Alpha ≈ 122 KB). Ersetzt die vorige
  Foto-WebP gleichen Namens.
- `src/components/layout/Footer.tsx`:
  - Rahmen-Darstellung (`rounded-2xl`, `ring`, großer Schatten, `w-56/72`)
    entfernt.
  - Zurück auf **kleines Icon**: `w-16 sm:w-20`, zentriert, mit weichem goldenem
    Radial-Glow (`div` mit `radial-gradient`) und dezentem Gold-Drop-Shadow.
  - `width/height` auf das neue Seitenverhältnis (640×622) angepasst.

Hinweis: In `public` liegen weitere hochgeladene Motive (dunkle Foto-Versionen
`506998a4…` / `be4c45e2…`, eine Meditations-Szene, ein Gehirn-Logo). Für den
Footer wird bewusst die **freigestellte** Datei verwendet. Die alte
`eisvogel-gold.webp` bleibt weiterhin unbenutzt liegen.

---

## 2026-09-02 – Eisvogel im Footer getauscht: Gold → Blau (echtes Motiv)

Das Krafttier-Bild ganz unten im Footer (mittig, über der Copyright-Zeile) war
bisher der **freigestellte goldene Eisvogel** (`eisvogel-gold.webp`, kleines
Icon ~64–80 px mit goldenem Radial-Glow). Es wurde gegen ein **neues, realistisch
gerendertes Motiv in natürlichem Blau-Orange** ausgetauscht.

**Änderungen**

- Neues Bild `public/eisvogel-blau.webp` hinzugefügt (aus der hochgeladenen PNG
  1536×1024 auf 900×600 skaliert, WebP q82 ≈ 72 KB).
- `src/components/layout/Footer.tsx`:
  - `src` von `/eisvogel-gold.webp` auf `/eisvogel-blau.webp` umgestellt,
    `width/height` auf das neue 3:2-Seitenverhältnis (1536×1024) angepasst.
  - Das Motiv bringt einen **eigenen Glow auf dunklem Grund** mit, daher wurde der
    künstliche goldene Radial-Glow-`div` entfernt. Stattdessen ist das Bild jetzt
    als gerahmtes Foto dargestellt: `rounded-2xl`, feiner `ring-white/10` und ein
    dezenter bläulicher Schatten – deutlich größer (`w-56 sm:w-72`) als das alte
    Icon, damit die Details zur Geltung kommen.
  - `alt`-Text und Kommentar von „Goldener Eisvogel" auf „Eisvogel" angepasst.
- Die alte Datei `public/eisvogel-gold.webp` bleibt vorerst liegen (unbenutzt),
  falls schnell zurückgetauscht werden soll.

Die begleitende Bildunterschrift („Der Eisvogel – mein Symbol für einen klaren,
wachen Geist" inkl. Glück/Fokus/Klarheit) bleibt unverändert.

---

## 2026-09-02 – Creme-Übergang am Blog-Hero wieder entfernt (rückgängig)

Der zuvor eingebaute weiche Creme-/Weiß-Verlauf am unteren Blog-Hero-Rand war
nicht erwünscht und wurde **komplett zurückgenommen**. Der Blog-Hero endet damit
wieder wie ursprünglich (harter Absatz zur Blog-Liste, kein Verlauf).

**Änderungen (Rücknahme des Eintrags direkt darunter)**

- `src/app/blog/page.tsx`: `fadeToColor="var(--color-paper)"` wieder entfernt.
- `src/components/layout/PageHero.tsx`: Die zuvor ergänzte `fadeToColor`-Rendering
  im **Bildband-/Spotlight-Zweig** wieder entfernt. Der ältere `fadeToColor`-Block
  im klassischen Layout (unverändert seit vorher) bleibt bestehen; die Prop wird
  aktuell nirgends mehr genutzt.

Damit ist der Stand vor dem Creme-Übergang wiederhergestellt. Der Blog-Hero bleibt
weiterhin ohne Spotlight (siehe übernächster Eintrag).

---

## 2026-09-02 – Blog-Hero läuft unten weich in Creme aus

Der Blog-Hero (`/blog`) blieb bisher am unteren Rand hart Navy und setzte dann
mit einem sichtbaren horizontalen Schnitt auf die creme-/paperfarbene Blog-Liste
(`bg-paper-aura`, `--color-paper` = `#f6f4ee`) auf. Jetzt gibt es einen weichen,
langen Verlauf ins Creme – kein harter Übergang mehr.

**Ursache / warum es vorher „nicht ging":** Die Prop `fadeToColor` war im
`PageHero` **nur im klassischen Layout** implementiert. Der Blog-Hero läuft aber
über den **Bildband-Zweig** (greift immer, sobald `image` gesetzt ist) – dort
wurde `fadeToColor` schlicht ignoriert.

**Änderungen**

- `src/components/layout/PageHero.tsx`: Den `fadeToColor`-Verlauf jetzt auch im
  Bildband-/Spotlight-Zweig gerendert (identische Gradient-Formel wie im
  klassischen Layout, `z-0` vor dem Text-Container mit `z-10`, Höhe
  `h-3/4 sm:h-3/5`). Damit funktioniert das weiche Auslaufen für **jeden** Hero
  mit Bild – mit oder ohne Spotlight.
- `src/app/blog/page.tsx`: `fadeToColor="var(--color-paper)"` am `PageHero`
  gesetzt, damit das Hero-Ende exakt in die Hintergrundfarbe der Blog-Liste
  übergeht. (Das kurz zuvor entfernte `spotlight="right"` bleibt entfernt – siehe
  Eintrag direkt darunter; der Creme-Übergang ist davon unabhängig.)

Mobil (Bildband, Text auf Navy darunter) blendet ebenfalls sauber ins Creme aus.

---

## 2026-09-02 – Blog-Hero zurück auf den Standard-Aufbau (kein Spotlight)

Auf `/blog` ist der Hero auf Desktop sehr dunkel – vom Motiv (Gipfel,
Sonnenaufgang, Kompass) ist kaum etwas zu erkennen.

**Änderung**

- `src/app/blog/page.tsx`: `spotlight="right"` entfernt. Der Hero nutzt wieder
  den gewohnten gleichmäßigen Navy-Schleier mit zentriertem Text.

**Wichtig: Das hat das Problem NICHT behoben.**

Die ursprüngliche Annahme war, der gerichtete Verlauf ersticke das zentrierte
Motiv. Nach dem Deploy gemessen (Helligkeit 0–255 über vier Zonen, links → rechts):

| | | | | |
|---|---|---|---|---|
| `/blog` mit Spotlight | 31,5 | 24,2 | 22,5 | 25,2 |
| `/blog` ohne Spotlight | 20,8 | 33,1 | 32,1 | 23,6 |
| `/ueber-mich` (Referenz, funktioniert) | 39,5 | 44,9 | 48,7 | 40,5 |

Nur marginal heller, weiterhin weit unter der Referenz. Der Spotlight-Verlauf
war also **nicht** die Ursache.

**Was geprüft und ausgeschlossen ist**

- Der Optimizer liefert das Bild korrekt: `/_next/image?url=%2Fhero-blog-gipfel.webp&w=1920&q=75`
  → 200, 84 KB, 1672×941, ein intaktes Motiv.
- Unterhalb von `lg` (mobiles Bildband) erscheint das Bild vollständig.
- Kein Render-Rennen: fünf Läufe mit unterschiedlichem `--virtual-time-budget`
  und zusätzlich `--run-all-compositor-stages-before-draw` liefern identische Werte.
- Das Markup von `/blog` und `/ueber-mich` ist strukturell identisch.
- Eine CSS-Nachbildung mit demselben Verlauf und Gold-Glow zeigt das Motiv klar
  (mitte 43,1 / rechts 57,4 statt 22,4 / 24,4 live).

**Ursache weiterhin unbekannt.** Verwandter Fall zum Vergleich: der `?v=2`-Cache-Bust
brach `next/image` auf Wissen/Praxis und hinterließ schwarze Kästen – dort antwortete
der Optimizer allerdings mit 400, hier mit 200. Der Mechanismus ist also ein anderer.

**Nicht geändert**

- `/ueber-mich` (`spotlight="left"`) und `/mitglieder/wissen` (`spotlight="right"`)
  bleiben unverändert. Auf `/ueber-mich` wirkt der Spotlight-Aufbau sehr gut.
- Mobil war der Blog-Hero nie betroffen.

---

## 2026-09-02 – Restliche Bild-Heroes geprüft, Wissen ebenfalls Spotlight

Alle vier Bild-Heroes durchgesehen und einheitlich bewertet:

- **/ueber-mich** – `spotlight="left"` (erledigt, siehe unten).
- **/blog** – `spotlight="right"` (erledigt, siehe unten).
- **/mitglieder/wissen** – jetzt **`spotlight="right"`** (`src/app/mitglieder/wissen/page.tsx`).
  Das warme, beleuchtete Bücherregal rechts wird freigestellt, der Text steht links –
  wirkt deutlich edler als der bisherige mittige, gleichmäßige Schleier.
- **/mitglieder/praxis** – **bewusst unverändert**. Das Motiv ist eine gestaltete
  Grafik mit **eingebrannter „PRAXIS"-Überschrift und Legende** (Atem, Achtsamkeit …)
  und wird per `lg:object-contain` ganz gezeigt. Ein Spotlight-Verlauf mit seitlicher
  Textspalte würde mit dem eingebrannten Titel/der Legende kollidieren – daher hier
  nicht sinnvoll.

Mobil (Bildband) bleibt bei allen unverändert.

---

## 2026-09-02 – „Über mich"-Hero auf Desktop kinematisch (wie Mitgliedschaft)

Auf Desktop wirkte der Hero der Seite **/ueber-mich** flach: Das ganze Motiv lag
unter einem gleichmäßigen Navy-Schleier (~85 %) und der Text stand mittig – das
schöne Heiko-Bild war kaum noch sichtbar. Die **Mitgliedschaftsseite** löst das
deutlich ansprechender (freigestelltes Motiv auf einer Seite, Textspalte auf der
Gegenseite, gerichteter Verlauf). **Mobil war bereits exzellent** (Bildband) und
bleibt unverändert.

**Neuer, optionaler Spotlight-Modus im `PageHero`**

- `src/components/layout/PageHero.tsx`: Neue Prop
  `spotlight?: "left" | "right"`. Wirkt **nur ab `lg`** und nur zusammen mit dem
  mobilen Bildband. Das Motiv wird auf der genannten Seite freigestellt (bleibt
  hell/sichtbar), der Text steht als schmale Spalte (`lg:max-w-xl`) auf der
  Gegenseite (rechts- bzw. linksbündig, mit weichem Text-Schatten). Darunter ein
  **gerichteter Navy-Verlauf** – am dunkelsten hinter dem Text, zum Motiv hin
  ausblendend. Die Farbstufen sind **bewusst identisch zur Mitgliedschaftsseite**,
  damit die Heroes über die Seite hinweg denselben Ton tragen. Hero minimal höher
  (`lg:min-h-[40rem]` statt `34rem`).
- `src/app/ueber-mich/page.tsx`: `spotlight="left"` gesetzt – Heiko sitzt am
  linken Bildrand, der Text steht rechts.

**Nicht geändert**

- Der mobile Aufbau (Bildband oben, Text zentriert darunter) ist unverändert.
- Alle anderen `PageHero`-Nutzungen ohne `spotlight` (Blog, Praxis, Wissen,
  Kontakt, Impressum, …) rendern exakt wie bisher – der Default-Aufbau blieb
  gleich (nur intern in einen inneren Flex-Container verschoben, optisch
  identisch).

---

## 2026-09-02 – Titelbild der Programm-Seite getauscht

Das Hero-Bild auf `/mitglieder/programm` (21 Tage Autopilot-Ausstieg) wurde
durch ein neues Motiv ersetzt.

**Neue Datei**

- `public/hero-programm.png` (1672×941) – neues Titelbild. (Hochgeladen als
  „ChatGPT Image Sep 2, 2026, 03_48_31 PM.png", zur sauberen Einbindung ohne
  Leerzeichen umbenannt.)

**Betroffene Stelle**

- `src/app/mitglieder/programm/page.tsx`: `heroImage` von
  `/hero-programm.webp` auf `/hero-programm.png` umgestellt.

**Details**

- Seitenverhältnis (1672 / 941) ist identisch zum bisherigen Bild; das mobile
  Bildband wird über `heroImageAspect` weiterhin automatisch aus der Datei
  gelesen (unterstützt PNG). Next.js `<Image>` optimiert das PNG zur Laufzeit.
- Die bisherige `public/hero-programm.webp` bleibt als ungenutzte Datei erhalten.

---

## 2026-09-02 – Logo im Header/Footer dezent vergrößert

Das Emblem war etwas zu klein. Größe zentral in `LogoMark`
(`src/components/visuals/Logo.tsx`) von `h-10` (40 px) auf `h-12` (48 px)
angehoben – wirkt in **Header** und **Footer** (beide nutzen dieselbe
Komponente). `sizes`-Hinweis entsprechend angepasst.

---

## 2026-09-02 – Logo auf der Website getauscht

Das Marken-Emblem wurde **überall auf der Website** durch das neue goldene
Gehirn-Logo (freigestellt) ersetzt. Ausschließlich Website-Anzeigen – Marketing-
und Doku-Assets (`docs/`, Social-Media-Generatoren) blieben unberührt.

**Neue Datei**

- `public/logo-brain-gold-freigestellt.png` (2000×2000, transparent) – neues
  Standard-Emblem. (Hochgeladen als „gold logo freigestellt.png", zur sauberen
  Einbindung ohne Leerzeichen umbenannt.)

**Betroffene Stellen**

- **Header** (`src/components/layout/Header.tsx` → `Logo`/`LogoMark`)
- **Footer** (`src/components/layout/Footer.tsx` → `Logo`)
- **Blog-Index** – dekoratives Emblem (`src/components/blog/BlogIndex.tsx`)
- **Favicon** (`src/app/icon.png`, 256×256, aus dem neuen Logo erzeugt)

**Details**

- `src/components/visuals/Logo.tsx`: Import auf neue Datei umgestellt.
- Der CSS-Gold-Filter `.logo-gold` wurde entfernt (Emblem ist bereits golden –
  ein zusätzlicher Farbfilter hätte den Ton verfälscht). Regel aus
  `src/app/globals.css` gelöscht, Klasse aus `Logo.tsx` und `BlogIndex.tsx`
  entfernt.
- `src/lib/marken-uebersicht.ts`: neues Emblem als aktueller Web-Standard
  eingetragen; altes `logo-brain.png` als frühere Variante markiert.

**Nicht geändert**

- `src/app/opengraph-image.tsx` (OG-/Social-Vorschaubild) enthält kein
  Gehirn-Emblem, nur Text – daher kein Tausch nötig.
- Alte Logo-Dateien (`logo-brain.png`, `logo-brain-gold.png`,
  `logo-brain-tuerkis.png`, `logo-full.png`, `logo.svg`) bleiben als Assets
  erhalten (weiterhin für Marketing/E-Mail/Katalog referenziert).
