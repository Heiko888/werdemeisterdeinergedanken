# Geschäftsausstattung (Print & E-Mail-Signatur)

Druckfertige **Visitenkarte**, **Briefpapier** und eine **E-Mail-Signatur** im
Marken-Look von „Werde Meister deiner Gedanken" – reproduzierbar per Skript.

```bash
npm run print              # Visitenkarte + Briefpapier (PDF)
npm run signatur           # E-Mail-Signatur (HTML + Text, hell + dunkel)
npm run briefpapier:word   # Briefpapier als Word-Vorlage (.docx)
# oder direkt:
node tools/print/geschaeftsausstattung.mjs
node tools/print/email-signatur.mjs
node tools/print/briefpapier-word.mjs
```

Kontakt- und Markendaten liegen gebündelt in `tools/print/marke.mjs`
(Single Source of Truth für alle Generatoren).

## Briefpapier als Word-Vorlage (`npm run briefpapier:word`)

Ausgabe → `tools/print/out/WMDG-Briefpapier-Vorlage.docx`

Beschreibbarer **A4-Briefbogen** zum Download: Marken-Kopf (Emblem + Wortmarke +
Tagline) und Fußzeile (Anschrift, Kontakt, USt-IdNr.) wiederholen sich auf jeder
Seite; dazwischen ein DIN-5008-naher Satzspiegel mit Platzhaltern
(`[ … ]`), die einfach überschrieben werden.

- **Schriften:** Word kennt Fraunces/Inter nicht → **websichere** Schriften
  (Georgia ≈ Fraunces für den Betreff, Arial ≈ Inter für den Rest).
- **Farben:** solide, AA-taugliche Markenfarben statt Verlauf (Kap. 04); die
  Kopf-/Fuß-Trennlinie ist ein Gold-Absatzrahmen.
- **Kopf/Fuß** liegen in der Word-Kopf-/Fußzeile → auf jeder Folgeseite
  automatisch vorhanden, der Textbereich bleibt frei beschreibbar.
- **Logo:** Der Kopf nutzt das **echte Logo als Bild** (`public/email/wmdg-logo-lockup.png`,
  erzeugt von `npm run logo-lockup`) – goldenes Emblem + Wortmarke mit echtem
  Gold-Verlauf. Die Unterüberschrift („DEINER GEDANKEN" mit Flankenstrichen)
  sitzt **zentriert** unter der Kopfzeile. So sieht Word 1:1 wie Header/Brief-
  bogen aus (Word kann keinen Verlaufstext). Bei geändertem Emblem/Logo einmal
  `npm run gold-emblem` und danach `npm run logo-lockup` laufen lassen.
- **Schriftlogo:** Derselbe Lauf erzeugt zusätzlich `public/email/wmdg-schriftlogo.png`
  – die **reine Wortmarke ohne Emblem** (ebenfalls mit zentrierter Unterüberschrift).

> Baut auf `docx` (npm, devDependency). Das eingebettete Logo-Bild macht die
> .docx eigenständig.

## E-Mail-Signatur (`npm run signatur`)

Ausgabe → `tools/print/out/`

| Datei | Inhalt |
|-------|--------|
| `WMDG-Email-Signatur.html` | Anleitungsseite: **beide** Varianten (hell + dunkel) gerendert zum Markieren + Kopieren, plus Quelltext |
| `WMDG-Email-Signatur-Snippet.html` | helle Signatur (Tabelle) – für Editoren, die HTML direkt entgegennehmen (Outlook …) |
| `WMDG-Email-Signatur-Dark-Snippet.html` | dunkle Variante (Navy-Karte) für dunkle Mail-Oberflächen / Dark Mode |
| `WMDG-Email-Signatur.txt` | Nur-Text-Variante (Fallback) |
| `WMDG-Email-Signatur-Vorschau.png` / `-Dark-Vorschau.png` | Bildschirm-Vorschauen |

**E-Mail-tauglich gebaut:** Tabellen-Layout, ausschließlich Inline-Styles,
**websichere Schriften** (Georgia ≈ Fraunces, Arial ≈ Inter – E-Mail-Clients
laden keine eigenen Schriften), **keine Verlaufsschrift** (rendern viele Clients
nicht) → stattdessen solide, AA-konforme Markenfarben.

- **Logo:** wird als gehostetes Bild von
  `https://www.werdemeisterdeinergedanken.de/email/wmdg-signatur-logo.png`
  geladen (liegt unter `public/email/`, wird mit der Website ausgeliefert – erst
  **nach dem nächsten Deploy** erreichbar). E-Mail-Clients strippen eingebettete
  Bilder, daher der bewusste Hosting-Weg.
- **Zwei Varianten:** **hell** (kein eigener Grund, für helle Oberflächen) und
  **dunkel** (bringt einen eigenen Navy-Grund mit → bleibt dunkel, egal wie der
  Client rendert; ideal für Dark-Mode-Clients). Auf Navy leuchtet das Gold als
  Akzent unkritisch (Kap. 04); die helle Variante nutzt die AA-Ersatztöne.
- **Einsetzen:** Gmail / Apple Mail → gewünschte Variante auf der HTML-Seite
  markieren, kopieren, im Signatur-Editor einfügen. Outlook → `…-Snippet.html`
  (hell) bzw. `…-Dark-Snippet.html` (dunkel) verwenden.

## Aufbau

- **Visitenkarte Vorderseite** – dunkel (ruhiges Anthrazit mit warmem Gold-Schimmer),
  freigestelltes Gehirn-Emblem, Wortmarke im Original-Lockup „WERDE MEISTER / DEINER GEDANKEN" (MEISTER gold), Tagline als Eyebrow.
- **Visitenkarte Rückseite** – hell (Papier), Name + Rolle, Kontaktspalte
  (Mail / Web / Instagram), Markenzeile in der Fußzeile.
- **Briefbogen** – Kopf mit Logo + Wortmarke + Tagline, feine Signatur-Linie,
  DIN-5008-naher Satzspiegel (Rücksende-Zeile, Adressfeld, Datum, Betreff),
  Fußzeile mit Anschrift, Kontakt und USt-IdNr.

## Datenpflege

Alle Kontakt- und Markendaten stehen gebündelt im `CONTACT`-Objekt in
`tools/print/marke.mjs` (gespiegelt aus `src/lib/site.ts` und
`src/app/impressum/page.tsx`) – von dort ziehen **alle drei** Generatoren.
`CONTACT.phone` steuert die Telefonzeile: leeren (`""`) blendet sie überall aus.

## Technik

- Rendering über **Playwright/Chromium** (wie das übrige Marken-Toolset),
  Ausgabe als **Vektor-PDF** mit eingebetteten Schriften (`page.pdf`,
  `preferCSSPageSize`).
- Schriften (Fraunces + Inter) kommen als data-URI aus
  `tools/pdf/assets/fonts.css`; das **goldene** Emblem aus
  `public/logo-brain-gold.png` – die PDFs sind damit **eigenständig**.
- **Goldenes Emblem:** Der Website-Header färbt das Gehirn per CSS-Filter gold
  (`.logo-gold` in `globals.css`). Da Word/E-Mail keine CSS-Filter können, backt
  `npm run gold-emblem` (`tools/print/gold-emblem.mjs`) den Filter einmal in
  `public/logo-brain-gold.png` (+ die optimierte `public/email/…-logo.png`).
  Bei einem neuen Basis-Emblem einmal `npm run gold-emblem` laufen lassen.
- Farben/Schriften spiegeln die Quelle der Wahrheit
  (`docs/brandbook/04-farben.md`, `05-typografie.md`).

> **Hinweis Druckerei:** Chromium rendert in **RGB**. Für professionellen
> Offsetdruck die PDFs beim Druckdienstleister nach **CMYK** wandeln lassen
> (oder einen RGB-Digitaldruck-Workflow wählen). Beschnitt (3 mm) und
> Schnittmarken sind auf der Visitenkarte bereits angelegt.
