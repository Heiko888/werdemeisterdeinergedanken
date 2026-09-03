# Änderungen / Serverstand

Chronologisches Protokoll wichtiger Änderungen am Projekt, damit jederzeit der
aktuelle Stand nachvollziehbar ist. Neueste Einträge oben.

---

## 2026-09-03 – E-Book nur noch mit bestätigter Anmeldung

Der Lead-Magnet war auf **zwei** Wegen ohne E-Mail-Adresse zu bekommen:

1. `/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf` – die Datei lag unter
   `public/`, und alles dort liefert Next.js zusätzlich direkt unter seinem
   Dateipfad aus. Derselbe Fallstrick wie früher bei den Mitglieder-PDFs und
   den Vorlagen.
2. `/ebook` – die Download-Route war `force-static` und prüfte nichts.

Beides ist zu. Das PDF liegt jetzt in `content/pdf/` (wird vom Dockerfile
ohnehin ins Laufzeit-Image kopiert), `/ebook` ist dynamisch und verlangt ein
Token. Als Token dient das vorhandene `confirm_token` des Leads – keine
Migration, keine neue Env-Variable nötig; es ist pro Adresse eindeutig, liegt
der bestätigten Person vor und wird bei einer erneuten Anfrage eines offenen
Leads neu erzeugt, womit alte Links verfallen. Bewusst nicht das
`unsubscribe_token`: ein weitergeleiteter Link würde sonst die Abmeldung
Dritter erlauben. Ohne bzw. mit falschem Token gibt es 404 statt 403.

Was sich im Ablauf ändert: Die Liefermail und die Bestätigungsseite verlinken
den Download mit Token; das PDF hängt wie bisher als Anhang an der Mail. Der
„Notausgang" im Formular (`status === "fallback"`, wenn der Versand klemmt)
bot bisher das PDF frei an – das war die Lücke in Sichtbarkeit und ist jetzt
ein „Erneut versuchen". Der Direktlink nach erfolgreichem Absenden bleibt,
aber nur für bereits bestätigte Adressen: `/api/ebook` gibt dafür eine
`downloadUrl` mit Token zurück.

Die Admin-Vorlagenübersicht verlinkte den alten `public/`-Pfad. Sie bekommt
mit `/admin/vorlagen/ebook` eine eigene, an die Anmeldung gebundene Route –
ein Admin hat kein Lead-Token. `tools/pdf/generate.mjs` schreibt das E-Book
jetzt nach `content/pdf/` statt `public/`.

Verifiziert gegen einen Wegwerf-Container mit dem fertigen Image: alter
Dateipfad 404, `/ebook` ohne Token 404, mit erfundenem Token 404, mit dem
Token eines bestätigten Leads 200 mit 3.549.855 Bytes `application/pdf`.

---

## 2026-09-03 – Startseite „Warum ich das mache": Portrait-Avatar näher rangezoomt

**Wunsch:** Das Gesicht sitzt im runden Avatar (Heiko Schwaninger) neben dem
Namen zu klein – es soll den Kreis stärker ausfüllen.

**Umgesetzt:** Das Portrait wird jetzt eine Stufe hineingezoomt, sodass der Kopf
den Avatar besser füllt. Der Zoom ist am oberen Rand verankert (`origin-top`),
damit der Kopf oben bündig bleibt und die Gesichtsmitte im Kreis zentriert liegt.

**Geändert:**
- `src/components/sections/WhyMe.tsx`: Am `<Image>` des Avatars die Klasse
  `origin-top scale-[1.35]` ergänzt (zusätzlich zu `object-cover object-top`).
  Der umgebende `span` hat bereits `overflow-hidden rounded-full`, sodass das
  vergrößerte Bild sauber im Kreis beschnitten wird.

---

## 2026-09-03 – Footer: Social-Media-Buttons in Markenfarben

**Wunsch:** Die Social-Media-Buttons im Footer sollen farbig sein.

**Umgesetzt:** Jeder Social-Button erscheint jetzt im Icon in der jeweiligen
Markenfarbe (Instagram Pink, Facebook Blau, YouTube Rot, LinkedIn Blau). Beim
Hover/Fokus füllt sich der Button vollständig in der Markenfarbe (Instagram als
typischer Farbverlauf), das Icon wird weiß und der Button hebt sich leicht an.

**Geändert:**
- `src/components/layout/Footer.tsx`:
  - Neue `socialColors`-Map mit Marken-`color` (Icon-Grundfarbe) und `bg`
    (Hover-Füllung) je Plattform inkl. `telegram` (für spätere Aktivierung).
  - Buttons setzen die Farben rein über CSS-Variablen (`--social-color`,
    `--social-bg`) + Tailwind-Utilities (`text-[var(--social-color)]`,
    `hover:[background:var(--social-bg)]`, `hover:text-white`). Kein JS/Client
    nötig – der Footer bleibt eine Server-Komponente.
  - `CSSProperties`-Typ aus `react` importiert (für die CSS-Variablen im
    `style`-Attribut).

---

## 2026-09-03 – Bewusstseinstest-Hero: volles Desktop-Bildband zurückgenommen (wie /mitgliedschaft)

Die zuvor eingebaute Desktop-Variante „volles Bildband" auf `/bewusstseinstest`
gefiel in der Darstellung nicht und wurde **komplett zurückgenommen**. Die
Hero-Sektion sieht auf dem Desktop jetzt wieder aus **wie auf `/mitgliedschaft`**:
Das Bild liegt ab `lg` **dezent (55 %) als Hintergrund hinter dem Text** mit
Navy-Lesbarkeits-Schleier; auf Mobil bleibt es als eigenes Band im Fluss.

**Geändert:**
- `src/app/bewusstseinstest/page.tsx`: Hero-Sektion auf das ursprüngliche
  Mitgliedschafts-Muster zurückgesetzt:
  - `lg:min-h-[34rem] lg:justify-center` wieder da; Bild-Wrapper wieder
    `lg:absolute lg:inset-0 lg:aspect-auto`, Bild wieder `lg:opacity-55`.
  - Navy-Schleier (`hidden lg:block`, horizontaler Verlauf) und der auf `lg`
    ausgeblendete Unterkanten-Fade (`lg:hidden`) wieder eingesetzt.
  - Text-Container wieder `lg:py-24`.
  - **Beibehalten:** der mobile Band nutzt weiterhin `aspect-[16/9]` (passend
    zum neuen 16:9-Motiv), und das neue Titelbild (`hero-bewusstseinstest.webp`)
    bleibt unverändert.

Damit ist der Stand vor der „volles-Bildband"-Änderung wiederhergestellt – nur
mit dem neuen Bild.

---

## 2026-09-03 – Mitgliederbereich: Marketing-Navigation im Header ausgeblendet

**Gemeldetes Problem:** Im geschützten Mitgliederbereich (`/mitglieder…`) fehlte
im Header der Punkt „Mitgliedschaft". Das war zwar so gewollt (ein zahlendes
Mitglied soll keine Verkaufs-Einladung sehen), wirkte aber **irreführend**: Die
übrigen Header-Links (Die 7 Stufen, Bewusstseinstest, Über mich, Blog) führten
weiter aus dem geschützten Bereich hinaus. Ein Klick z. B. auf „Bewusstseinstest"
landete auf einer öffentlichen Seite – und dort war **das volle Menü inkl.
„Mitgliedschaft" wieder da**. Das Menü „sprang" also je nach Seite.

Sicherheit war nie betroffen: Der Zugriffsschutz liegt im Proxy (`src/proxy.ts`)
und im `MembersLayout` (Login-Prüfung), **nicht** in der Menü-Sichtbarkeit. Es
war rein ein UX-/Konsistenz-Thema.

**Entscheidung:** Im Mitgliederbereich die **gesamte** öffentliche
Marketing-Navigation ausblenden, statt nur einen Punkt. Die inhaltliche
Orientierung übernimmt weiterhin die `MemberNav` (Mein Bereich, Praxis, Journal,
Wissen, Programm, Einstellungen) direkt unter dem Header.

**Geändert:**
- `src/components/layout/Header.tsx`:
  - Im Mitgliederbereich (`pathname.startsWith("/mitglieder")`) wird die
    komplette Haupt-Navigation (Desktop **und** mobiles Menü) nicht mehr
    gerendert – vorher wurde nur „Mitgliedschaft" herausgefiltert.
  - Rechts im Header erscheinen im Mitgliederbereich stattdessen **„Zur Website"**
    (Link auf `/`) und **„Abmelden"** (`<form action={signOut}>`, Server-Action
    aus `src/app/auth/actions.ts`). Außerhalb des Mitgliederbereichs unverändert:
    „Mitglieder"-Link + CTA „Kostenloses Erstgespräch".
  - Die frühere Breiten-Kompensation (`imMitgliederbereich`-abhängige
    `gap`/`px`/`inset`-Werte) entfällt, da die Marketing-Nav im
    Mitgliederbereich gar nicht mehr angezeigt wird; die öffentliche Nav nutzt
    weiter die kompakten Werte (`gap-0.5`, `px-3`, `after:inset-x-3`).

Verifiziert: `next build` erfolgreich, ESLint sauber. Der öffentliche Header
bleibt inhaltlich unverändert.

---

## 2026-09-03 – Bewusstseinstest: Titelbild getauscht (Kompass-Plaza im Sonnenuntergang)

Das Titelbild der Seite `/bewusstseinstest` wurde gegen ein neues Motiv
getauscht: eine dunkle Stein-Plaza mit **Kompass-Intarsie** und leuchtenden
Rune-Kreisen, die als Weg auf einen **Sonnenuntergang über Bergen** zulaufen –
passt thematisch zum bisherigen „Kompass & Weg ins Licht".

**Änderungen**

- `public/hero-bewusstseinstest.webp` **neu erzeugt** aus dem hochgeladenen PNG
  (1672×941, Seitenverhältnis 16:9). WebP Qualität 82 (~127 KB), unter gleichem
  Namen ersetzt.
- `src/app/bewusstseinstest/page.tsx`: Hero-Sektion umgebaut – das Bild liegt
  jetzt auf **allen** Breakpoints (auch Desktop) als eigenes **volles Bildband**
  im Fluss (`aspect-[16/9]`, volle Deckkraft, unbeschnitten), der Text steht
  darunter auf reinem Navy.
  - Zuvor lag das Bild ab `lg` **gedimmt (55 %) als Hintergrund hinter dem Text**
    (`lg:absolute inset-0`, `lg:opacity-55`) mit Lesbarkeits-Schleier. Diese
    Desktop-Sonderbehandlung wurde entfernt (auf Wunsch: „volles Bildband wie
    Mobil"): kein `lg:absolute`, kein `lg:opacity-55`, kein Navy-Schleier mehr,
    `lg:min-h-[34rem] lg:justify-center` entfernt.
  - Mobiler Band von `aspect-[3/2]` (altes 3:2-Bild) auf `aspect-[16/9]`
    (neues Motiv) umgestellt; der Unterkanten-Verlauf ins Navy gilt jetzt auf
    allen Breakpoints.

Das alte 3:2-Bild bleibt über die Git-Historie wiederherstellbar.

---

## 2026-09-03 – Öffentlicher Header: Logo bricht nicht mehr um (Desktop)

Im **öffentlichen** Header (nicht im Mitgliederbereich) brach die Wortmarke auf
Desktop um: „WERDE MEISTER" rutschte auf zwei Zeilen und wirkte „verschoben".

**Ursache:** Der öffentliche Header trägt mehr Inhalt als der Mitglieder-Header
– zusätzlich den Nav-Punkt „Mitgliedschaft" **und** den CTA-Button „Kostenloses
Erstgespräch". Gemessen mit den echten Schriften überschreitet die Zeile den
Container (max-w-6xl, ~1088 px Inhalt) um ~23 px. Da das Logo keinen festen
Platz beanspruchte (`flex-shrink` aktiv), wurde es gestaucht und die Wortmarke
umbrach. Im Mitgliederbereich (weniger Inhalt, kein Button) passt alles → dort
war das Logo immer korrekt.

**Geändert (nur öffentlicher Header betroffen, Mitgliederbereich unverändert):**
- `src/components/layout/Header.tsx`:
  - `<Logo className="shrink-0" />` – das Logo wird nie mehr gestaucht/umbrochen.
  - Navigation im **öffentlichen** Bereich etwas kompakter: `px-3` statt `px-4`
    pro Link und engerer Abstand (`gap-0.5`), aktive Unterstreichung
    `after:inset-x-3`. Im Mitgliederbereich bleibt alles bei `px-4`/`gap-1`
    (`imMitgliederbereich`-Verzweigung) – dort ändert sich **nichts**.

Damit passt die öffentliche Kopfzeile mit ~25 px Reserve, das Logo steht wie im
Mitgliederbereich. Verifiziert per Headless-Messung mit Fraunces/Inter.

---

## 2026-09-03 – Wortmarke: Unterzeile „Deiner Gedanken" zentriert (war verschoben)

Im Schriftlogo (Header hell + Footer dunkel) saß die zweite Zeile
`— Deiner Gedanken —` **linksbündig** unter „WERDE MEISTER" und wirkte dadurch
nach links **verschoben**. Ursache: Die Zeile liegt in einer Flex-Spalte, die
ihre Kinder auf die Breite der (breiteren) ersten Zeile streckt – ohne
Zentrierung wurde der Dekor-Strich-Text-Block links gepackt.

**Geändert:**
- `src/components/visuals/Logo.tsx`: Der zweiten Zeile (`— Deiner Gedanken —`)
  `justify-center` gegeben, sodass sie **mittig unter „WERDE MEISTER"** sitzt –
  symmetrisch mit den goldenen Flankier-Strichen, passend zum Marken-Emblem.

Wirkt in beiden Varianten (`tone="onLight"` im Header, `tone="onDark"` im Footer).
Verifiziert per Headless-Render mit der echten Fraunces-Schrift (Vorher/Nachher).

---

## 2026-09-03 – Footer-Copyright-Zeile: Mobil-Ausrichtung korrigiert

Die untere Copyright-Zeile im Footer (`© … Alle Rechte vorbehalten.` +
`Werde Meister deiner Gedanken · Bewusstseinsentwicklung in 7 Stufen`) wurde auf
schmalen/mittleren Bildschirmen **nebeneinander an die Ränder gezogen** (unruhig,
wirkte „nicht richtig platziert"), weil sie schon ab `sm` (640 px) auf
`flex-row justify-between` umgeschaltet hat.

**Geändert:**
- `src/components/layout/Footer.tsx` (Copyright-Leiste):
  - Umschalt-Breakpoint von `sm:` auf `lg:` (1024 px) angehoben – passt zum
    restlichen Footer, der ebenfalls erst ab `lg` volle Breite nutzt.
  - Auf Mobil/Tablet jetzt **gestapelt und zentriert** (`flex-col items-center
    text-center`); erst ab `lg` nebeneinander und linksbündig
    (`lg:flex-row lg:justify-between lg:text-left`).
  - `justify-between` greift dadurch nur noch im Zeilen-Layout ab `lg`.

Verifiziert per Headless-Screenshots bei 500 px (gestapelt/zentriert), 820 px
(gestapelt/zentriert) und 1100 px (nebeneinander).

---

## 2026-09-03 – Footer-Eisvogel getauscht: Gold → Blau (echtes Motiv)

Der Eisvogel im Footer wurde vom **goldenen** auf das **blaue** (naturechte)
Motiv umgestellt. Beide Varianten lagen bereits im Repo; die blaue entspricht
der realen Färbung des Eisvogels.

**Geändert:**
- `src/components/layout/Footer.tsx`
  - Bild-`src` von `/eisvogel-gold.webp` auf `/eisvogel-blau.webp` umgestellt.
  - Glow-Radial von Gold (`--color-gold-500`) auf Teal (`--color-teal-500`)
    umgestellt, damit der Schein zum blauen Motiv passt.
  - Drop-Shadow von Gold `rgba(217,169,58,0.3)` auf Teal `rgba(33,178,189,0.3)`
    angepasst.

Die Datei `public/eisvogel-gold.webp` bleibt vorerst unbenutzt liegen und kann
später entfernt werden, falls nicht mehr gebraucht.

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
