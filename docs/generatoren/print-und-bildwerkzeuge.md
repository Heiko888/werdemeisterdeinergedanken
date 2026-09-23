# Print-Generatoren & Bildwerkzeuge

Zuständiger Team-Agent: **visual-dokumentar**.

Zwei getrennte Bereiche:

1. **`tools/print/*`** — die **Geschäftsausstattung**: Visitenkarte,
   Briefpapier (PDF + Word) und E-Mail-Signatur im Marken-Look, plus zwei
   Logo-Zulieferer (`gold-emblem.mjs`, `logo-lockup.mjs`) und ein gemeinsames
   Datenmodul (`marke.mjs`). Alle Kontakt-/Markendaten kommen **ausschließlich**
   aus `tools/print/marke.mjs` (`CONTACT`, `C`) — laut Kommentar im Modul
   „gespiegelt aus `src/lib/site.ts` und `src/app/impressum/page.tsx`" (kein
   automatischer Sync, Pflege von Hand). Primärquelle für dieses Kapitel ist
   `tools/print/README.md`; alle Angaben unten sind gegen den Code geprüft.
2. **`tools/images/*`** — zwei einmalige **Bild-Freisteller/-Optimierer**
   (Quellbild → transparentes WebP fürs Footer-Icon „Krafttier & Symbol"),
   unabhängig vom Print-Toolset, nutzen nur `sharp`.

---

## tools/print/marke.mjs — kein eigener Generator, gemeinsames Datenmodul

- **Zweck:** Single Source of Truth für Kontakt-/Marken-/Farbdaten aller
  `tools/print/*`-Generatoren: `CONTACT` (Name, Wortmarke/Lockup, Tagline,
  Rolle, E-Mail, Web, Instagram, Anschrift, USt-IdNr., Telefon) und `C`
  (Farb-Tokens: Navy-Stufen, Paper/Surface/Ink, Gold-Stufen, Teal/Leaf/AA-Töne).
- **Aufruf:** nur als Import (`import { CONTACT, C } from "./marke.mjs"`),
  kein eigenständiges Skript.
- **Eingaben:** keine — alle Werte inline im Modul (kein automatisches
  Nachziehen aus `src/lib/site.ts`; README nennt es ausdrücklich „gespiegelt",
  nicht generiert).
- **Stolperfalle:** `CONTACT.phone` steuert direkt die Telefonzeile auf
  Visitenkarte, Briefbogen **und** Signatur — leeren (`""`) blendet sie
  überall gleichzeitig aus.
- **⚠ zu klären:** Da `marke.mjs` von Hand aus `src/lib/site.ts` und
  `src/app/impressum/page.tsx` „gespiegelt" wird, driftet es bei einer
  Änderung dort auseinander, bis jemand `marke.mjs` manuell nachzieht — es
  gibt keinen Check, der das erzwingt.

## tools/print/gold-emblem.mjs

- **Zweck:** Erzeugt aus dem freigestellten Gold-Original eine kleine,
  optimierte Emblem-Variante zum Einbetten in Word/E-Mail-Signatur.
- **Aufruf:** `npm run gold-emblem` (`node tools/print/gold-emblem.mjs`).
- **Voraussetzungen:** Node, `sharp` (kein Playwright/Chromium — reine
  Pixel-Operation).
- **Eingaben:** `public/logo-brain-gold-freigestellt.png` (**Pflicht** — wirft
  `Error` mit `existsSync`-Check, wenn die Datei fehlt).
- **Ablauf:** `sharp(src).resize(240, 240, { fit: "contain", background:
  transparent }).png({ compressionLevel: 9 })`.
- **Ausgaben:** `public/email/wmdg-signatur-logo.png` (240×240, transparent).
- **Verbundene Komponenten:** wird von `email-signatur.mjs` als gehostetes
  Logo referenziert (`CONTACT.webHref + "/email/wmdg-signatur-logo.png"`) und
  von `email-signatur.mjs`s Vorschau-Rendering als lokale Base64-Kopie
  eingebettet. README: bei geändertem Basis-Emblem erst `npm run gold-emblem`,
  danach `npm run logo-lockup` laufen lassen.

## tools/print/logo-lockup.mjs

- **Zweck:** Rendert den vollständigen Logo-Lockup (Emblem + Wortmarke „WERDE
  MEISTER / DEINER GEDANKEN", „MEISTER" im Gold-Verlauf) einmalig als
  transparentes PNG — für die Word-Vorlage, die keinen Verlaufstext kann.
- **Aufruf:** `npm run logo-lockup` (`node tools/print/logo-lockup.mjs`).
- **Voraussetzungen:** Node, `playwright`, Chromium (`findChrome()`:
  `CHROME_BIN` → Playwright → `PLAYWRIGHT_BROWSERS_PATH`/`/opt/pw-browsers`).
  Assets: `tools/pdf/assets/fonts.css`,
  `public/logo-brain-gold-freigestellt.png`. Daten: `CONTACT.lockup` aus
  `marke.mjs` (`pre`/`gold`/`sub`).
- **Ablauf:** baut ein HTML-Snippet (`SCALE = 4` für Retina-Schärfe im Druck),
  schreibt eine temporäre `.tmp-lockup.html` neben dem Skript, rendert sie mit
  Chromium und macht einen `element.screenshot({ omitBackground: true })`
  genau des `.lock`-Elements, löscht danach die temporäre Datei.
- **Ausgaben:** `public/email/wmdg-logo-lockup.png`.
- **Verbundene Komponenten:** wird von `briefpapier-word.mjs` als
  eingebettetes Bild im Word-Kopf gelesen
  (`readFileSync(join(ROOT, "public/email/wmdg-logo-lockup.png"))`).

## tools/print/geschaeftsausstattung.mjs

- **Zweck:** Druckfertige **Visitenkarte** (Vorder-/Rückseite) und
  **Briefpapier** (leer + mit Muster-Anschreiben) als Vektor-PDFs, plus
  Bildschirm-Vorschauen.
- **Aufruf:** `npm run print` (`node tools/print/geschaeftsausstattung.mjs`).
- **Voraussetzungen:** Node, `playwright`, Chromium (`findChrome()` wie oben),
  `pdf-lib` (Merge der zwei Karten-Seiten zu einem 2-seitigen PDF). Assets:
  `tools/pdf/assets/fonts.css` (Fraunces/Inter als data-URI-woff2),
  `public/logo-brain-gold-freigestellt.png` (data-URI, goldenes Emblem).
- **Eingaben / Datenzugriff:** `CONTACT`, `C` aus `marke.mjs`. Farben/Schrift
  laut Kopfkommentar aus `docs/brandbook/04-farben.md`,
  `05-typografie.md` (nicht programmatisch eingelesen, nur als Quelle
  dokumentiert).
- **Ablauf:**
  1. Vorder- und Rückseite der Visitenkarte werden **getrennt** als
     1-seitige PDF-Buffer gerendert (`pdfBuffer()`), damit sich die
     Hell-/Dunkel-Styles beider Seiten nicht überschreiben (Kommentar im
     Code), und mit `pdf-lib` (`PDFDocument.copyPages`) zu **einem**
     2-seitigen PDF zusammengeführt.
  2. Briefbogen zweimal gerendert: `letterhead({ sample: false })` (leer) und
     `letterhead({ sample: true })` (mit Beispieltext).
  3. Drei PNG-Bildschirmvorschauen (`deviceScaleFactor: 2`): Visitenkarte
     beidseitig nebeneinander, leerer Bogen, Muster-Bogen.
- **Ausgaben** (alle nach `tools/print/out/`):
  `WMDG-Visitenkarte.pdf` (2 Seiten, 85×55 mm + 3 mm Beschnitt,
  Schnittmarken), `WMDG-Visitenkarte-Vorschau.png`, `WMDG-Briefpapier.pdf`
  (leerer A4-Bogen), `WMDG-Briefpapier-Muster.pdf` (mit Beispielanschreiben),
  `WMDG-Briefpapier-Vorschau.png`, `WMDG-Briefpapier-Muster-Vorschau.png`.
- **Stolperfalle (Druckerei):** Chromium rendert in RGB — für professionellen
  Offsetdruck müssen die PDFs beim Dienstleister nach CMYK gewandelt werden
  (oder RGB-Digitaldruck-Workflow wählen); README weist ausdrücklich darauf
  hin.

## tools/print/email-signatur.mjs

- **Zweck:** E-Mail-taugliche Signatur in zwei Farbthemes (hell/dunkel), als
  fertige HTML-Anleitungsseite, zwei copy-paste-fertige Snippets und eine
  Nur-Text-Variante.
- **Aufruf:** `npm run signatur` (`node tools/print/email-signatur.mjs`).
- **Voraussetzungen:** Node, `playwright`, Chromium (`findChrome()` wie oben,
  nur für die zwei PNG-Vorschauen gebraucht). Kein `sharp`. Daten: `CONTACT`,
  `C` aus `marke.mjs`.
- **Eingaben:** websichere Schrift-Stacks inline (`Georgia, … serif` ≈
  Fraunces, `Arial, … sans-serif` ≈ Inter — Word/E-Mail-Clients laden keine
  eigenen Schriften). Logo als **gehostete** URL
  `CONTACT.webHref + "/email/wmdg-signatur-logo.png"` (liegt unter
  `public/email/`, ausgeliefert erst **nach dem nächsten Deploy**) — für die
  lokalen PNG-Vorschauen wird stattdessen die lokale Datei
  `public/email/wmdg-signatur-logo.png` als Base64-Data-URI eingesetzt
  (`localLogo`, weil `setContent()` von `about:blank` aus keine `file://`-Bilder
  lädt).
- **Ablauf:** baut Tabellen-Markup mit reinen Inline-Styles (kein CSS-Verlauf
  in der Schrift, da viele Clients das nicht rendern) für zwei Varianten
  (`signature("light")`, `signature("dark")`), schreibt vier HTML-/Text-Dateien
  direkt, rendert danach zwei Bildschirm-Vorschauen per Chromium
  (`viewport` wird nach dem ersten Render exakt auf die gemessene
  Element-Box angepasst, dann Screenshot).
- **Ausgaben** (alle nach `tools/print/out/`):
  `WMDG-Email-Signatur.html` (Anleitungsseite, beide Varianten + Quelltext),
  `WMDG-Email-Signatur-Snippet.html` (helle Tabelle für Outlook & Co.),
  `WMDG-Email-Signatur-Dark-Snippet.html` (dunkle Variante),
  `WMDG-Email-Signatur.txt` (Nur-Text-Fallback),
  `WMDG-Email-Signatur-Vorschau.png`, `WMDG-Email-Signatur-Dark-Vorschau.png`.
- **Verbundene Komponenten:** Logo-Abhängigkeit zu `gold-emblem.mjs`
  (`public/email/wmdg-signatur-logo.png`).

## tools/print/briefpapier-word.mjs

- **Zweck:** Briefpapier als beschreibbare **Word-Vorlage** (.docx) — Marken-
  Kopf/-Fuß in Word-Header/-Footer (wiederholen sich automatisch auf jeder
  Seite), dazwischen ein DIN-5008-naher Satzspiegel mit Platzhaltern (`[ … ]`).
- **Aufruf:** `npm run briefpapier:word` (`node
  tools/print/briefpapier-word.mjs`).
- **Voraussetzungen:** Node, npm-Paket **`docx`** (devDependency,
  `^9.7.1` in `package.json`) — importiert `Document, Packer, Paragraph,
  TextRun, ImageRun, Table, TableRow, TableCell, WidthType, BorderStyle,
  AlignmentType, VerticalAlign, Header, Footer`. **Kein** Playwright/Chromium
  (reine `docx`-API, kein HTML-Rendering). Daten: `CONTACT`, `C` aus
  `marke.mjs`.
- **Eingaben:** `public/email/wmdg-logo-lockup.png` wird per `readFileSync`
  eingelesen und als `ImageRun` in den Word-Header eingebettet — **Pflicht**
  (Datei muss vorher existieren, also `npm run logo-lockup` zuvor laufen
  lassen; kein `existsSync`-Guard mit sprechender Fehlermeldung im Skript
  selbst, ein Fehlen bricht beim `readFileSync` mit dem generischen
  Node-`ENOENT` ab). Schriften: websicher inline (`Georgia` ≈ Fraunces,
  `Arial` ≈ Inter — Word kennt keine eigenen Marken-Schriften).
- **Ausgaben:** `tools/print/out/WMDG-Briefpapier-Vorlage.docx`.
- **Verbundene Komponenten:** hängt an `logo-lockup.mjs` (Bild-Quelle) und
  mittelbar an `gold-emblem.mjs` (README-Empfehlung: bei geändertem
  Basis-Emblem erst `gold-emblem`, dann `logo-lockup`, dann
  `briefpapier:word` neu laufen lassen).

---

## Reihenfolge / Abhängigkeiten innerhalb `tools/print/`

```
marke.mjs (Datenmodul, kein Build-Schritt)
   │
   ├─▶ npm run gold-emblem   → public/email/wmdg-signatur-logo.png
   │        │
   │        └─▶ npm run signatur (Logo-Quelle für Vorschau + gehostete URL)
   │
   ├─▶ npm run logo-lockup   → public/email/wmdg-logo-lockup.png
   │        │
   │        └─▶ npm run briefpapier:word (Logo-Bild im Word-Header, Pflicht)
   │
   └─▶ npm run print          → tools/print/out/WMDG-{Visitenkarte,Briefpapier}*.pdf/png
                                 (eigenständig, kein Word-/Signatur-Vorlauf nötig)
```

`npm run print` und `npm run signatur` sind **eigenständig** (nutzen das Gold-
Emblem direkt als PNG, kein Vorlauf nötig). `npm run briefpapier:word` **setzt
`npm run logo-lockup` voraus** — ohne vorherigen Lauf bricht der Word-Build
beim Lesen von `public/email/wmdg-logo-lockup.png` ab.

Ausgabeordner aller drei Print-Generatoren: **`tools/print/out/`** (wird bei
Bedarf mit `mkdirSync({ recursive: true })` angelegt, nicht vorab geleert —
alte Dateien bleiben liegen, wenn ein Zieldateiname sich ändert).

`tools/print/out/` ist kein Bestandteil von `content/vorlagen/` — die
Print-Generatoren sind **nicht** an `tools/vorlagen/build-gallery.mjs`
angebunden (kein Treffer für „print" oder „briefpapier" dort).

---

## tools/images/eisvogel-transparent.mjs

- **Zweck:** Stellt den goldenen Eisvogel frei (weißer Hintergrund →
  transparent) für das „Krafttier & Symbol"-Band im Footer.
- **Aufruf:** `node tools/images/eisvogel-transparent.mjs [quelle] [ziel]`
  (kein npm-Script). Defaults: Quelle `tools/images/eisvogel-gold-source.png`,
  Ziel `public/eisvogel-gold.webp`.
- **Voraussetzungen:** Node, `sharp`. Kein Playwright/Chromium.
- **Eingaben:** das Quellbild via CLI-Argument oder Default-Pfad (Original mit
  weißem Hintergrund).
- **Ablauf:**
  1. Liest das Bild roh ein (`sharp(src).ensureAlpha().raw().toBuffer()`).
  2. **Flood-Fill vom Bildrand** über zusammenhängende (fast-)weiße Pixel
     (Schwelle `BG_MIN = 240`) — nur der **zusammenhängende** Rand-Hintergrund
     wird erkannt, helle/weiße Flächen **innerhalb** des Motivs (z. B. der
     Wangen-/Halsfleck) bleiben erhalten, weil sie den Rand nicht berühren.
  3. Setzt erkannte Hintergrundpixel auf Alpha 0; an echten Silhouetten-
     Randpixeln (angrenzend an den Hintergrund) wird die Kante zwischen
     `EDGE_LO = 224` und `BG_MIN = 240` weich ausgeblendet (linear
     interpoliert), damit die Kontur nicht ausgefranst wirkt.
  4. `sharp(data, {raw}).trim()` (transparente Ränder wegschneiden),
     `resize({ width: 640, withoutEnlargement: true })`,
     `webp({ quality: 90, alphaQuality: 100, effort: 6 })`.
- **Ausgaben:** `public/eisvogel-gold.webp` (max. 640 px breit, Alpha-WebP).
- **Verbundene Komponenten:** liefert das Bild für den Footer-Bereich „Krafttier
  & Symbol" (Konsument im UI-Code nicht Teil dieses Kapitels — reine
  Bild-Erzeugung).

## tools/images/schneeleopard-webp.mjs

- **Zweck:** Verkleinert/optimiert ein bereits freigestelltes,
  transparentes Schneeleopard-Foto für dasselbe Footer-Icon-Band.
- **Aufruf:** `node tools/images/schneeleopard-webp.mjs [quelle] [ziel]` (kein
  npm-Script). Defaults: Quelle `public/schneeleopard.png`, Ziel
  `public/schneeleopard.webp`.
- **Voraussetzungen:** Node, `sharp`. Kein Playwright/Chromium.
- **Eingaben:** `public/schneeleopard.png` — laut Kopfkommentar **nicht mehr
  im Repo** (bewusst entfernt, um `public/` klein zu halten; Original war
  „3000×3000, RGBA, ~11 MB"). Das ausgelieferte `public/schneeleopard.webp`
  ist bereits erzeugt und committet.
- **Ablauf:** kein Freistellen nötig (Quelle hat laut Kommentar bereits einen
  transparenten Hintergrund) — nur `sharp(src).trim({ threshold: 10 })`
  (transparenten Rand wegschneiden), `resize({ width: 720, height: 720, fit:
  "inside", withoutEnlargement: true })`,
  `webp({ quality: 82, effort: 6, alphaQuality: 90 })`.
- **Ausgaben:** `public/schneeleopard.webp`.
- **Reproduzierbarkeit:** ⚠ zu klären / dokumentierte Einschränkung — ohne das
  (nicht versionierte) Original-PNG **nicht** aus dem Repo heraus neu
  erzeugbar; der Kopfkommentar nennt das ausdrücklich und verweist darauf, im
  Bedarfsfall das Original wieder als Quelle bereitzustellen
  (`node tools/images/schneeleopard-webp.mjs pfad/zur/schneeleopard.png`).
- **Verbundene Komponenten:** wie `eisvogel-transparent.mjs` für das
  „Krafttier & Symbol"-Band im Footer.
