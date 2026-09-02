# Änderungen / Serverstand

Chronologisches Protokoll wichtiger Änderungen am Projekt, damit jederzeit der
aktuelle Stand nachvollziehbar ist. Neueste Einträge oben.

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
