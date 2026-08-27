# Geschäftsausstattung (Print)

Druckfertige **Visitenkarte** und **Briefpapier** im Marken-Look von
„Werde Meister deiner Gedanken" – reproduzierbar per Skript.

```bash
npm run print
# oder direkt:
node tools/print/geschaeftsausstattung.mjs
```

Ausgabe → `tools/print/out/`

| Datei | Inhalt |
|-------|--------|
| `WMDG-Visitenkarte.pdf` | 2 Seiten (Vorder-/Rückseite), **85×55 mm + 3 mm Beschnitt** (91×61 mm), mit Schnittmarken |
| `WMDG-Visitenkarte-Vorschau.png` | Bildschirm-Vorschau beider Seiten (ohne Beschnitt) |
| `WMDG-Briefpapier.pdf` | **A4**-Briefbogen, leer – die eigentliche Vorlage zum Beschreiben |
| `WMDG-Briefpapier-Muster.pdf` | A4-Briefbogen mit Beispiel-Anschreiben (zeigt den Satzspiegel) |
| `WMDG-Briefpapier-Vorschau.png` / `-Muster-Vorschau.png` | Bildschirm-Vorschauen |

## Aufbau

- **Visitenkarte Vorderseite** – dunkel (Navy + kosmischer Verlauf), freigestelltes
  Gehirn-Emblem, Wortmarke (Signatur-Verlauf auf „Gedanken"), Tagline als Eyebrow.
- **Visitenkarte Rückseite** – hell (Papier), Name + Rolle, Kontaktspalte
  (Mail / Web / Instagram), Markenzeile in der Fußzeile.
- **Briefbogen** – Kopf mit Logo + Wortmarke + Tagline, feine Signatur-Linie,
  DIN-5008-naher Satzspiegel (Rücksende-Zeile, Adressfeld, Datum, Betreff),
  Fußzeile mit Anschrift, Kontakt und USt-IdNr.

## Datenpflege

Alle Kontakt- und Markendaten stehen gebündelt im `CONTACT`-Objekt oben in
`geschaeftsausstattung.mjs` (gespiegelt aus `src/lib/site.ts` und
`src/app/impressum/page.tsx`). Eine **Telefonnummer** ist bewusst leer – wird sie
in `CONTACT.phone` eingetragen, erscheint sie automatisch auf Karte und Briefbogen.

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
