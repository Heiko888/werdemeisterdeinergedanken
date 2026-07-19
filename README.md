# Werde Meister deiner Gedanken

Professioneller Neuaufbau des Markenauftritts von **Heiko Schwaninger** –
Bewusstseinsentwicklung in 7 Stufen. Modernes, ruhiges Design in der
bestehenden Markenwelt (tiefes Mitternachtsblau, Königsblau, kosmische
Violett/Cyan-Akzente, Gold).

## Tech-Stack

- **Next.js 16** (App Router)
- **React 19**
- **Tailwind CSS 4** (Design-Tokens via `@theme` in `src/app/globals.css`)
- **TypeScript**
- Fonts: **Sora** (Headlines) & **Inter** (Fließtext) via `next/font`
- Alle Visuals als SVG/CSS – **keine externen Bilder nötig**

## Entwicklung

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # Produktions-Build
npm run start    # Produktions-Server
npm run lint
```

## Projektstruktur

```
src/
  app/                     Routen (App Router)
    page.tsx               Startseite
    die-7-stufen/          Die 7 Stufen im Detail
    ueber-mich/            Über mich
    kontakt/               Kontakt + Formular
    impressum/             Impressum (Vorlage)
    datenschutz/           Datenschutz (Vorlage)
    globals.css            Design-System / Tokens
    sitemap.ts, robots.ts  SEO
  components/
    layout/                Header, Footer, PageHero, Prose
    sections/              Startseiten-Sektionen (Hero, FAQ, ...)
    ui/                    Button, Container, Icon, ...
    visuals/               Logo, CosmicBackground, NeuralOrb
  lib/
    site.ts                Zentrale Konfiguration (Name, Kontakt, Social, Navigation)
    content.ts             Inhalte (7 Stufen, Werte, Testimonials, FAQ)
```

## Noch anzupassen (mit `TODO` markiert)

- **`src/lib/site.ts`** – echte Kontaktdaten und Social-Media-Links
- **Impressum & Datenschutz** – Platzhalter `[…]` durch echte Angaben ersetzen
- **Formulare** (`ContactForm`, `EbookForm`) – an einen Mail-/Newsletter-Dienst
  anbinden (z. B. Resend, Brevo, Mailchimp)
- Texte & Testimonials nach Wunsch verfeinern
- Optional: echte Fotos/Logo statt der generierten SVG-Motive
