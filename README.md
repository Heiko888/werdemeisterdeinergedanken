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

## Mitgliederbereich (Supabase)

Geschützter Bereich unter `/mitglieder` mit Login/Registrierung (`/login`) auf
Basis von **Supabase Auth** (E-Mail + Passwort). Ohne Zugangsdaten bleibt die
Seite lauffähig – der Bereich zeigt dann einen Hinweis.

**Einrichtung:**

1. Datenbank vorbereiten: SQL aus `supabase/migrations/0001_profiles.sql` im
   Supabase-Dashboard (SQL Editor) ausführen. Legt die `profiles`-Tabelle mit
   Row-Level-Security und einen Trigger an, der bei jeder Registrierung
   automatisch ein Profil erstellt.
2. Umgebungsvariablen setzen (`.env.local` lokal, in Vercel unter Settings →
   Environment Variables) – Vorlage: `.env.local.example`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   (Supabase-Dashboard → Project Settings → API)
3. In Supabase unter **Authentication → URL Configuration** die Redirect-URLs
   hinterlegen (`http://localhost:3000/**` und die spätere Vercel-Domain).

**Relevante Dateien:**

```
src/lib/supabase/        Client (Browser/Server) + Konfiguration
src/proxy.ts             Session-Refresh + Schutz von /mitglieder + Host-Kanonisierung
src/app/auth/            Server-Actions (Login/Registrierung/Logout) + Callback
src/app/login/           Login-/Registrierungs-Seite
src/app/mitglieder/      Geschütztes Dashboard
supabase/migrations/     SQL für profiles-Tabelle + RLS
```

## Gratis-E-Book (Lead-Magnet)

Das kostenlose E-Book „Die 7 Stufen kompakt" wird zur Build-Zeit als PDF
erzeugt (`/ebook`) und über den Lead-Magneten auf der Startseite ausgegeben.

- **Nur `RESEND_API_KEY` gesetzt:** Nach dem Eintragen wird das E-Book direkt
  per E-Mail verschickt (kein Double-Opt-in, keine Speicherung).
- **Zusätzlich Double-Opt-in (DSGVO):** Migration
  `supabase/migrations/0005_ebook_leads.sql` ausführen und
  `SUPABASE_SERVICE_ROLE_KEY` setzen. Dann bekommen Interessent*innen zuerst
  eine Bestätigungsmail; erst nach dem Klick wird das E-Book geliefert. Die
  Leads landen in `public.ebook_leads` (RLS aktiv, nur Service-Role-Zugriff),
  jede Mail enthält einen 1-Klick-Abmeldelink.
- **Ohne `RESEND_API_KEY`:** Das Formular bietet den direkten Download an.

**Relevante Dateien:**

```
src/components/sections/EbookForm.tsx   Formular (Front-end)
src/app/api/ebook/route.ts              Anmeldung: Lead + Bestätigungsmail
src/app/api/ebook/confirm/route.ts      Double-Opt-in-Bestätigung + Lieferung
src/app/api/ebook/unsubscribe/route.ts  1-Klick-Abmeldung
src/lib/ebook-mail.ts                   Bestätigungs-/Liefermail
src/lib/pdf/                            PDF-Erzeugung + Datenzusammenstellung
```
