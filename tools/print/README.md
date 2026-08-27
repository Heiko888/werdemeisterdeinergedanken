# Geschäftsausstattung (Print & E-Mail-Signatur)

Druckfertige **Visitenkarte**, **Briefpapier** und eine **E-Mail-Signatur** im
Marken-Look von „Werde Meister deiner Gedanken" – reproduzierbar per Skript.

```bash
npm run print       # Visitenkarte + Briefpapier (PDF)
npm run signatur    # E-Mail-Signatur (HTML + Text)
# oder direkt:
node tools/print/geschaeftsausstattung.mjs
node tools/print/email-signatur.mjs
```

Kontakt- und Markendaten liegen gebündelt in `tools/print/marke.mjs`
(Single Source of Truth für beide Generatoren).

Ausgabe → `tools/print/out/`

| Datei | Inhalt |
|-------|--------|
| `WMDG-Visitenkarte.pdf` | 2 Seiten (Vorder-/Rückseite), **85×55 mm + 3 mm Beschnitt** (91×61 mm), mit Schnittmarken |
| `WMDG-Visitenkarte-Vorschau.png` | Bildschirm-Vorschau beider Seiten (ohne Beschnitt) |
| `WMDG-Briefpapier.pdf` | **A4**-Briefbogen, leer – die eigentliche Vorlage zum Beschreiben |
| `WMDG-Briefpapier-Muster.pdf` | A4-Briefbogen mit Beispiel-Anschreiben (zeigt den Satzspiegel) |
| `WMDG-Briefpapier-Vorschau.png` / `-Muster-Vorschau.png` | Bildschirm-Vorschauen |

## E-Mail-Signatur (`npm run signatur`)

Ausgabe → `tools/print/out/`

| Datei | Inhalt |
|-------|--------|
| `WMDG-Email-Signatur.html` | Anleitungsseite: gerenderte Signatur zum Markieren + Kopieren, plus Quelltext |
| `WMDG-Email-Signatur-Snippet.html` | Nur die Signatur (Tabelle) – für Editoren, die HTML direkt entgegennehmen (Outlook …) |
| `WMDG-Email-Signatur.txt` | Nur-Text-Variante (Fallback) |
| `WMDG-Email-Signatur-Vorschau.png` | Bildschirm-Vorschau |

**E-Mail-tauglich gebaut:** Tabellen-Layout, ausschließlich Inline-Styles,
**websichere Schriften** (Georgia ≈ Fraunces, Arial ≈ Inter – E-Mail-Clients
laden keine eigenen Schriften), **keine Verlaufsschrift** (rendern viele Clients
nicht) → stattdessen solide, AA-konforme Markenfarben.

- **Logo:** wird als gehostetes Bild von
  `https://www.werdemeisterdeinergedanken.de/email/wmdg-signatur-logo.png`
  geladen (liegt unter `public/email/`, wird mit der Website ausgeliefert – erst
  **nach dem nächsten Deploy** erreichbar). E-Mail-Clients strippen eingebettete
  Bilder, daher der bewusste Hosting-Weg.
- **Einsetzen:** Gmail / Apple Mail → Signatur auf der HTML-Seite markieren,
  kopieren, im Signatur-Editor einfügen. Outlook → `…-Snippet.html` verwenden.

## Aufbau

- **Visitenkarte Vorderseite** – dunkel (Navy + kosmischer Verlauf), freigestelltes
  Gehirn-Emblem, Wortmarke (Signatur-Verlauf auf „Gedanken"), Tagline als Eyebrow.
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
  `tools/pdf/assets/fonts.css`; das Emblem aus `public/logo-brain.png` –
  die PDFs sind damit **eigenständig** (keine externen Abhängigkeiten).
- Farben/Schriften spiegeln die Quelle der Wahrheit
  (`docs/brandbook/04-farben.md`, `05-typografie.md`).

> **Hinweis Druckerei:** Chromium rendert in **RGB**. Für professionellen
> Offsetdruck die PDFs beim Druckdienstleister nach **CMYK** wandeln lassen
> (oder einen RGB-Digitaldruck-Workflow wählen). Beschnitt (3 mm) und
> Schnittmarken sind auf der Visitenkarte bereits angelegt.
