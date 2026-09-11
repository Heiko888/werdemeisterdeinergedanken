# Konfiguration & Infrastruktur

Diese Dokumentation beschreibt die technische Grundlage der Website „Werde Meister deiner Gedanken" (Next.js 16, App Router): globales Layout und SEO, die Next.js-Konfiguration, alle Umgebungsvariablen, die Supabase-Datenbank sowie das Deployment. Alle Angaben stammen aus dem tatsächlichen Quellcode bzw. den Konfigurationsdateien.

> **Besonderheit dieser Next.js-Version (16.3.4):** Die frühere „Middleware" heißt hier **Proxy** und liegt in `src/proxy.ts` (nicht `src/middleware.ts`). Sie exportiert eine Funktion `proxy(request)` statt `middleware(request)`. Details in Abschnitt A/E.

## Inhaltsübersicht

- [A) Globales Layout & SEO](#a-globales-layout--seo)
- [B) Next.js-Konfiguration](#b-nextjs-konfiguration)
- [C) Umgebungsvariablen](#c-umgebungsvariablen)
- [D) Supabase / Datenbank](#d-supabase--datenbank)
- [E) Deployment](#e-deployment)

---

## A) Globales Layout & SEO

### Root-Layout (`src/app/layout.tsx`)

Das Wurzel-Layout setzt `<html lang="de">` und baut den globalen Seitenrahmen auf.

**Fonts** — bewusst selbst-gehostet über `next/font/local` (nicht `next/font/google`), aus zwei Gründen: deterministische Builds ohne Google-Fetch zur Build-Zeit und Datenschutz (kein Google-Fonts-Request im Browser, DSGVO). Die Dateien liegen in `src/app/fonts/`:

| Font | Variable | Rolle | Schnitte |
|------|----------|-------|----------|
| Inter | `--font-inter` | Fließtext | variabel 100–900, `display: swap` |
| Fraunces | `--font-fraunces` | Überschriften (editorial Serife) | variabel 100–900, normal + italic |

Beide Variablen werden zusammen mit `antialiased` auf das `<html>`-Element gelegt.

**Globaler Seitenrahmen** (im `<body>`, Klassen `min-h-dvh flex flex-col bg-paper text-foreground`):
- Skip-Link „Zum Inhalt springen" (`#main`) für Barrierefreiheit
- `<Header />` (`src/components/layout/Header.tsx`)
- `<main id="main">` mit den Seiteninhalten
- `<Footer />` (`src/components/layout/Footer.tsx`)
- `<BackToTop />` (`src/components/ui/BackToTop.tsx`)
- `<GoogleAnalytics />` (`src/components/analytics/GoogleAnalytics.tsx`)

Es gibt **keinen** globalen Context-/Theme-Provider — die Komponenten sind selbst-versorgend.

**Metadaten-Basis** (`export const metadata`): zentral aus `src/lib/site.ts` gespeist.

| Feld | Wert / Quelle |
|------|---------------|
| `metadataBase` | `new URL(site.url)` = `https://www.werdemeisterdeinergedanken.de` |
| `title.default` | `"{site.name} — {site.tagline}"` |
| `title.template` | `"%s · {site.name}"` (Seitentitel-Vorlage) |
| `description` | `site.description` |
| `keywords` | Bewusstsein, Bewusstseinsentwicklung, mentale Entprogrammierung, Gedanken meistern, Mindset Coaching, Persönlichkeitsentwicklung, Heiko Schwaninger, 7 Stufen |
| `authors` / `creator` | `site.author` (Heiko Schwaninger) |
| `alternates.types` | RSS-Autodiscovery auf `/rss.xml` |
| `openGraph` | type `website`, locale `de_DE`, url/siteName/title/description |
| `twitter` | `summary_large_image` |
| `robots` | `index: true, follow: true` |

Ergänzend erzeugt Next.js Bilder aus Konventionsdateien: `src/app/opengraph-image.tsx` und `src/app/twitter-image.tsx` (OG-/Twitter-Bild), `src/app/icon.png` (Favicon), `src/app/not-found.tsx` (404).

### Zentrale Konfiguration (`src/lib/site.ts`)

Das `site`-Objekt bündelt Name, `shortName` (WMDG), Tagline, Beschreibung, **URL** (`https://www.werdemeisterdeinergedanken.de`), Autor, E-Mail (`info@werdemeisterdeinergedanken.de`), eine Videobotschaft-Konfiguration (`videoMessage.youtubeId` derzeit `null`), ein globales Platzhalter-Video (`placeholderVideoId: "gOvtKBnqGvk"`) sowie Social-Links (Instagram, YouTube, Facebook, LinkedIn).

Zusätzlich definiert die Datei die Navigationslisten:
- `mainNav`: Die 7 Stufen, Das Buch, Mitgliedschaft, Bewusstseinstest, Über mich, Blog
- `legalNav`: Impressum, Datenschutz

### SEO-Helfer (`src/lib/seo.ts`)

`withCanonical(path, meta)` ergänzt die Metadaten einer öffentlichen Seite um eine **kanonische URL** (`alternates.canonical`) und ein seiten-eigenes Open-Graph-/Twitter-Objekt. Hintergrund: Next.js merged verschachtelte `metadata`-Felder wie `openGraph` **nicht** feldweise, sondern ersetzt sie pro Segment. Ohne diesen Helper würde jede Seite ohne eigenes `openGraph` die og:url/og:title/og:description der Startseite erben. Der Helper setzt `og:url` = `{site.url}{path}`, übernimmt Titel/Beschreibung aus den Seiten-Metadaten und lässt bereits gesetzte Felder unangetastet.

### robots (`src/app/robots.ts`)

Erzeugt `/robots.txt`:
- `allow: "/"` für alle User-Agents
- `disallow: ["/mitglieder", "/login"]` — nur die wirklich privaten Bereiche
- **Bewusst nicht gesperrt:** `/impressum` und `/datenschutz` — diese steuern ihre Nicht-Indexierung über ein `noindex`-Meta-Tag; ein Crawl-Verbot würde verhindern, dass dieses Tag überhaupt gelesen wird
- `sitemap: "{site.url}/sitemap.xml"`

### sitemap (`src/app/sitemap.ts`)

Erzeugt `/sitemap.xml`, `export const revalidate = 3600` (stündlich, damit vorausdatierte Artikel ohne Deploy erscheinen). Enthaltene URLs:

- **Statische Seiten:** `/` (Priorität 1.0), `/die-7-stufen`, `/buch`, `/mitgliedschaft`, `/ueber-mich`, `/bewusstseinstest`, `/gratis-ebook`, `/blog`, `/kontakt` (jeweils Priorität 0.7, `changeFrequency: monthly`)
- **Blog-Artikel:** dynamisch über `publishedPosts()` aus `src/lib/blog.ts` — je `/blog/{slug}` mit `lastModified: post.date`, `changeFrequency: yearly`, Priorität 0.6
- **Bewusst NICHT enthalten:** `/impressum` und `/datenschutz` (tragen `noindex`)

### Layout-Komponenten (`src/components/layout/`)

| Komponente | Rolle |
|------------|-------|
| `Header.tsx` | Client-Komponente. Sticky-Header mit Scroll-Zustand, Mobil-Menü (Escape schließt, Fokus-Management, Body-Scroll-Sperre). Blendet im Mitgliederbereich (`pathname.startsWith("/mitglieder")`) die Marketing-Navigation aus und zeigt nur „Zur Website" + „Abmelden". |
| `Footer.tsx` | Link-Bereich, Marken-farbige Social-Buttons, Rechts-Links (`legalNav`), Cookie-Einstellungen-Button (nur wenn `GA_ID` gesetzt). Jahr fest `2026`. |
| `PageHero.tsx` | Wiederverwendbarer Seiten-Header. |
| `Prose.tsx` | Typografie-Wrapper für Fließtext. |

### Analytics (`src/components/analytics/`)

**`GoogleAnalytics.tsx`** (Client-Komponente) — DSGVO-konforme GA4-Einbindung mit **Opt-in-Consent**:
- **Vor** einer aktiven Einwilligung wird **kein** GA-Script geladen und **kein** Cookie gesetzt.
- Die Entscheidung liegt in `localStorage` (`wmdg-analytics-consent`), gelesen über `useSyncExternalStore` (korrekte Hydration).
- Erst nach Klick auf „Akzeptieren" wird `gtag.js` injiziert (Consent Mode v2, `anonymize_ip: true`). Nur `analytics_storage` wird auf `granted` gesetzt; Ad-Storage bleibt `denied`.
- Client-Navigationen werden als zusätzliche `page_view`-Events gemeldet (der erste wird übersprungen, um Doppelzählung zu vermeiden).
- Widerruf entfernt die GA-Cookies (`clearGaCookies`) und lädt neu.
- Ohne `NEXT_PUBLIC_GA_ID` bleibt alles inaktiv (kein Banner, kein Script).

**`src/lib/analytics.ts`** — Konfiguration: `GA_ID = process.env.NEXT_PUBLIC_GA_ID ?? ""` (kein Code-Default), `CONSENT_STORAGE_KEY`, `OPEN_CONSENT_EVENT` (`wmdg:open-consent`, öffnet Banner erneut) und `clearGaCookies()` (löscht `_ga`, `_ga_*`, `_gid`, `_gat`, `_gat_*` über mehrere Domain-Varianten).

**`CookieSettingsButton.tsx`** — Footer-Button, der über das Custom-Event den Consent-Banner erneut öffnet.

---

## B) Next.js-Konfiguration

### `next.config.ts`

**Sicherheits-Header** — bewusst in Next.js gesetzt (nicht nur im Reverse-Proxy), damit der Schutz bei jedem Hosting greift. Gelten für alle Routen (`source: "/:path*"`):

| Header | Wert |
|--------|------|
| `Strict-Transport-Security` | `max-age=31536000; includeSubDomains` |
| `X-Frame-Options` | `SAMEORIGIN` |
| `X-Content-Type-Options` | `nosniff` |
| `Referrer-Policy` | `strict-origin-when-cross-origin` |
| `Permissions-Policy` | `camera=(), microphone=(), geolocation=()` |
| `Content-Security-Policy` | siehe unten |

**Content-Security-Policy** (Einzeldirektiven):
- `default-src 'self'`
- `img-src 'self' data: blob: https:`
- `style-src 'self' 'unsafe-inline'` (Next/Tailwind nutzen Inline-Styles)
- `script-src 'self' 'unsafe-inline' https://www.googletagmanager.com` (GA lädt erst nach Einwilligung)
- `font-src 'self' data:`
- `connect-src 'self' https:` (deckt GA-Beacons ab)
- `frame-src https://www.youtube-nocookie.com https://www.youtube.com` (datenschutzfreundliche Video-Einbettung)
- `frame-ancestors 'self'`, `base-uri 'self'`, `form-action 'self'`

**Redirects** (alle `permanent: true` = 301):

| Von | Nach |
|-----|------|
| `/wissen` | `/mitglieder/wissensdatenbank` |
| `/wissen/:slug` | `/mitglieder/wissensdatenbank/:slug` |
| `/seiten` | `/admin/seiten` |

Die Wissensdatenbank ist in den geschützten Mitgliederbereich gewandert, die Seitenübersicht in den Admin-Bereich. Es gibt **keine** `rewrites`, **keine** Konfiguration für `images` (Domains/Remote-Patterns) und **keine** experimentellen Flags in dieser Datei. Bild-Domains sind nicht konfiguriert, weil keine externen Bild-Hosts über `next/image` optimiert werden.

**Host-Kanonisierung** findet nicht hier, sondern in `src/proxy.ts` statt (siehe A/E).

### `postcss.config.mjs`

Ein einziges Plugin: `@tailwindcss/postcss` (Tailwind CSS v4, das die PostCSS-Integration übernimmt). Keine separate `tailwind.config` — v4 wird CSS-first über `src/app/globals.css` konfiguriert.

### `eslint.config.mjs`

Flat-Config (`eslint/config`), kombiniert `eslint-config-next/core-web-vitals` und `eslint-config-next/typescript`. Zusätzlich ignoriert: `.next/**`, `out/**`, `build/**`, `next-env.d.ts` sowie `src/**/*.test.ts` (Node-Test-Dateien, laufen über `npm test`, nicht über den Next-Build).

### `tsconfig.json`

- `target: ES2017`, `module/moduleResolution: esnext/bundler`, `strict: true`, `noEmit: true`, `jsx: react-jsx`
- Next-Plugin aktiv
- **Pfad-Alias:** `"@/*": ["./src/*"]` (wird projektweit für Imports wie `@/lib/site` genutzt)
- `include`: u. a. `next-env.d.ts`, `**/*.ts(x)`, `.next/types`, `.next/dev/types`, `**/*.mts`
- `exclude`: `node_modules`, `src/**/*.test.ts`

### `package.json`

**Version:** `next` **16.3.4**, `react`/`react-dom` **19.2.4**, privat, `version 0.1.0`.

**Scripts (gruppiert):**

- *Kern (Next.js):* `dev` (`next dev`), `build` (`next build`), `start` (`next start`), `lint` (`eslint`), `test` (`node --test "src/**/*.test.ts"`)
- *PDF-Erzeugung:* `pdf`, `pdf:brandbook`, `pdf:buch`, `buchcover`
- *Reels / Social-Video:* `covers`, `covers:png`, `reel-drehbuch`, `endcard`, `langvideo-drehbuch`, `willkommen-skript`, `videoskripte-md`, `video-folien`
- *Carousels:* `carousels:slides`, `carousels:png`
- *Marketing-Assets:* `brand-assets`, `story-overlays`, `story-carousels`, `content-overlays`, `whatsapp:mitgliedschaft`, `whatsapp:safezone`, `marketing:all` (Sammel-Task), `vorlagen:galerie`
- *Print / Geschäftsausstattung:* `gold-emblem`, `logo-lockup`, `print`, `signatur`, `briefpapier:word`

**Wichtige Dependencies:**

| Paket | Version | Zweck |
|-------|---------|-------|
| `next` | 16.3.4 | Framework (App Router) |
| `react` / `react-dom` | 19.2.4 | UI |
| `@anthropic-ai/sdk` | ^0.115.0 | KI (Reading, Begleiter, Muster-Spiegel) |
| `@supabase/ssr` | ^0.12.3 | Supabase-Clients (Browser/Server/Proxy) |
| `@supabase/supabase-js` | ^2.110.7 | Supabase-Basis-SDK (Admin/Service-Role) |
| `stripe` | ^22.4.0 | Bezahl-Mitgliedschaft & Buch-Verkauf |
| `resend` | ^6.18.0 | E-Mail-Versand (Kontakt, E-Book, Impulse, Buch) |
| `pdf-lib` | ^1.17.1 | PDF-Generierung |
| `sharp` | ^0.34.5 | Bildverarbeitung |

**Dev-Dependencies (Auswahl):** `tailwindcss` ^4 + `@tailwindcss/postcss`, `eslint` ^9 + `eslint-config-next` 16.3.4, `typescript` ^5, `playwright` ^1.49.1, `docx` ^9.7.1, diverse `@types/*`.

---

## C) Umgebungsvariablen

Quelle: `.env.local.example` (vollständig gelesen). Ergänzt um die tatsächlichen Nutzungsorte aus dem Code (`process.env.*`). Grundprinzip im gesamten Projekt: **Ohne gesetzte Variablen bleibt die Seite lauffähig** — Features schalten sich still ab oder fallen auf einen Standard/das Kontaktformular zurück. Der Präfix `NEXT_PUBLIC_` bedeutet: Wert wird zur **Build-Zeit** ins Client-Bundle eingebacken (öffentlich). Alle übrigen Variablen sind rein serverseitig.

### Supabase

| Name | Zweck | Pflicht/optional | Wo genutzt |
|------|-------|------------------|-----------|
| `NEXT_PUBLIC_SUPABASE_URL` | Projekt-URL | Pflicht für Mitgliederbereich | `src/lib/supabase/config.ts` |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Anon/Publishable-Key (RLS-gebunden) | Pflicht für Mitgliederbereich | `src/lib/supabase/config.ts` |
| `SUPABASE_SERVICE_ROLE_KEY` | Service-Role-Key — **umgeht RLS**, niemals `NEXT_PUBLIC_` | optional (nötig für E-Book-Leads, Impulse, Memberships, Redaktionsplan) | `src/lib/supabase/admin.ts` |

### Stripe

| Name | Zweck | Pflicht/optional | Wo genutzt |
|------|-------|------------------|-----------|
| `STRIPE_SECRET_KEY` | geheimer API-Key (`sk_live_`/`sk_test_`) | optional (nötig für Checkout) | `src/lib/stripe.ts` |
| `STRIPE_PRICE_ID` | Preis-ID Monatsabo | optional (Basis für Abo) | `src/lib/stripe.ts` |
| `STRIPE_PRICE_ID_YEARLY` | Preis-ID Jahresabo | optional (schaltet Jahres-Option frei) | `src/lib/stripe.ts` |
| `STRIPE_BOOK_PRICE_ID` | Preis-ID Buch PDF (29,90 €) | optional | `src/lib/stripe.ts` |
| `STRIPE_BOOK_PRICE_ID_PRINT` | Preis-ID Buch gedruckt (39,90 €) | optional | `src/lib/stripe.ts` |
| `STRIPE_WEBHOOK_SECRET` | Signatur-Geheimnis Webhook (`whsec_`) | optional (nötig für Webhook) | `src/lib/stripe.ts`, `src/app/api/stripe/webhook/route.ts` |

### Mail / Resend

| Name | Zweck | Pflicht/optional | Wo genutzt |
|------|-------|------------------|-----------|
| `RESEND_API_KEY` | API-Key für E-Mail-Versand | Pflicht für jeglichen Versand | `api/kontakt`, `api/ebook`, `api/ebook/confirm`, `api/impulses`, `api/stripe/webhook` |
| `CONTACT_TO` | Empfänger Kontaktformular | optional (Fallback `site.email`) | `src/app/api/kontakt/route.ts` |
| `CONTACT_FROM` | Absender Kontaktformular | optional (Fallback `onboarding@resend.dev`) | `api/kontakt`, dient als globaler Fallback |
| `EBOOK_FROM` | Absender E-Book-Auslieferung | optional (Fallback `CONTACT_FROM`) | `src/lib/ebook-mail.ts`, `src/lib/buch-mail.ts` |
| `IMPULSE_FROM` | Absender E-Mail-Impulse | optional (Fallback `CONTACT_FROM`) | `src/app/api/impulses/route.ts` |
| `MEMBERSHIP_FROM` | Absender Mitgliedschafts-Mails | optional (Fallback `CONTACT_FROM`) | `src/app/api/stripe/webhook/route.ts` |
| `BUCH_FROM` | Absender Buch-Auslieferung | optional (Fallback `EBOOK_FROM`/`CONTACT_FROM`) | `src/lib/buch-mail.ts` |

### KI / Anthropic

| Name | Zweck | Pflicht/optional | Wo genutzt |
|------|-------|------------------|-----------|
| `ANTHROPIC_API_KEY` | API-Key, versorgt alle KI-Funktionen (Reading, Begleiter, Muster-Spiegel, Detektor); niemals `NEXT_PUBLIC_` | optional (ohne Key werden die KI-Optionen ausgeblendet) | `mitglieder/reading-actions.ts`, `mitglieder/begleiter/*`, `mitglieder/muster-actions.ts`, `mitglieder/detektor-actions.ts` |

Modellwahl in `src/lib/ki-modell.ts`: Hauptmodell `claude-opus-5`, Ersatzmodell `claude-opus-4-8`. Bei Kapazitätsfehlern (429/5xx, inkl. 529 „Overloaded") wird einmalig auf das Ersatzmodell umgeschaltet (`mitErsatzmodell`); fachliche Fehler (401/403/400) werden nicht wiederholt.

### Site / URL

| Name | Zweck | Pflicht/optional | Wo genutzt |
|------|-------|------------------|-----------|
| `NEXT_PUBLIC_GA_ID` | GA4-Measurement-ID (`G-…`); ohne sie bleiben Analytics + Cookie-Banner inaktiv | optional (in Produktion setzen) | `src/lib/analytics.ts` |
| `ENFORCE_CANONICAL_HOST` | `true` = Apex/`neu.` → 301 auf `www.`; `false` schaltet ab | optional (Default-Verhalten: aktiv, außer Wert `"false"`) | `src/proxy.ts` |

### Sonstiges (Schalter, Zugänge, Secrets)

| Name | Zweck | Pflicht/optional | Wo genutzt |
|------|-------|------------------|-----------|
| `ADMIN_EMAILS` | kommagetrennte Admin-Adressen für `/admin`; niemals `NEXT_PUBLIC_` | optional (Fallback: eingebaute Liste bei `undefined` — **Achtung:** leerer String sperrt alle aus) | `src/lib/admin.ts` |
| `CRON_SECRET` | schützt `/api/impulses` (Serienversand); ohne Wert wird jeder Aufruf abgelehnt | optional (Pflicht für Impuls-Versand) | `src/app/api/impulses/route.ts` |
| `REQUIRE_ACTIVE_MEMBERSHIP` | `true` verlangt zusätzlich zum Login eine aktive Stripe-Mitgliedschaft | optional (Default `false`, strikt `=== "true"`) | `src/lib/supabase/config.ts` |
| `ALLOW_SELF_REGISTRATION` | `true` erlaubt freie Konten ohne Zahlung | optional (Default `false`, strikt `=== "true"`) | `src/lib/supabase/config.ts` |
| `BUCH_DOWNLOAD_SECRET` | signiert den zeitlich begrenzten PDF-Download-Link (30 Tage) | optional (Fallback `STRIPE_WEBHOOK_SECRET`, sonst kein Link) | `src/lib/buch-download.ts` |
| `NODE_ENV` | Standard-Node-Umgebung (production/development) | von der Laufzeit gesetzt | `api/checkout`, `api/buch-checkout` |

**Pflicht-Variablen** (für den vollen produktiven Betrieb der Kernfunktionen): `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`, `ADMIN_EMAILS`, `CRON_SECRET`, `NEXT_PUBLIC_GA_ID`; für den Bezahlweg zusätzlich `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, `STRIPE_WEBHOOK_SECRET`; für die KI-Funktionen `ANTHROPIC_API_KEY`. Im engeren Code-Sinne echt zwingend (sonst Feature komplett aus) sind vor allem die beiden `NEXT_PUBLIC_SUPABASE_*` (Mitgliederbereich) und `RESEND_API_KEY` (jeglicher Versand).

---

## D) Supabase / Datenbank

### Clients (`src/lib/supabase/`)

| Datei | Client | Key | Einsatz |
|-------|--------|-----|---------|
| `client.ts` | `createBrowserClient` (`@supabase/ssr`) | Anon-Key | Client-Komponenten im Browser |
| `server.ts` | `createServerClient` (`@supabase/ssr`, mit `cookies()`) | Anon-Key | Server-Komponenten, Server-Actions, Route-Handler |
| `admin.ts` | `createClient` (`@supabase/supabase-js`) | **Service-Role-Key** | nur serverseitig in geschützten Routen; **umgeht RLS**; gibt `null` zurück, wenn Key fehlt; `persistSession: false` |
| `config.ts` | — | — | zentrale Werte + Schalter: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `isSupabaseConfigured`, `REQUIRE_MEMBER_LOGIN` (= `true`), `ALLOW_SELF_REGISTRATION`, `REQUIRE_ACTIVE_MEMBERSHIP` |

**Trennung Service-Role vs. Anon:** Der Anon-Key ist an Row-Level-Security (RLS) gebunden — jede Person kommt nur an ihre eigenen Zeilen. Der Service-Role-Key umgeht RLS vollständig und wird ausschließlich serverseitig in geschützten Routen benutzt (E-Book-Leads, Impuls-Versand, Memberships, Redaktionsplan) — er darf niemals in den Browser gelangen (kein `NEXT_PUBLIC_`).

### Migrationen (`supabase/migrations/`) — Tabellen & RLS

14 Migrationen (`0001`–`0014`). Die zentrale Registrierungs-Automatik: ein Trigger `on_auth_user_created` auf `auth.users` legt via `handle_new_user()` automatisch ein `profiles`-Profil an. Ein gemeinsamer Trigger `touch_updated_at()` (bzw. `set_updated_at()` beim Redaktionsplan) pflegt `updated_at`.

| Migration | Tabelle | Kernspalten | RLS-Policy |
|-----------|---------|-------------|-----------|
| 0001 | `public.profiles` | `id` (FK `auth.users`), `email`, `full_name`, Timestamps | `profiles_select_own`, `profiles_update_own` (nur eigene Zeile, `auth.uid() = id`) |
| 0002 | `public.progress` | `user_id`, `item_type` (stage/practice/deep_dive…), `item_key`, `status`, unique(user,type,key) | `progress_rw_own` (all, `auth.uid() = user_id`) |
| 0002 | (erweitert `profiles`) | `start_stage`, `test_scores`, `test_taken_at` | über bestehende Profil-Policy |
| 0003 | `public.notes` | `user_id`, `item_type`, `item_key`, `ref`, `body` (Journal/Reflexion) | `notes_rw_own` (all, eigene) |
| 0004 | (erweitert `profiles`) | `newsletter_opt_in`, `newsletter_opted_in_at`, `impulse_index`, `unsubscribe_token` | Opt-in via Profil-Policy; Serienversand nur über Service-Role |
| 0005 | `public.ebook_leads` | `email` (unique), `status`, `confirm_token`, `unsubscribe_token`, `source`, IPs, Timestamps | **RLS an, KEINE Policy** → nur Service-Role |
| 0006 | `public.test_results` | `user_id`, `top_stage`, `scores[]`, `taken_at` (Verlauf/Wachstumskurve) | `test_results_rw_own` (all, eigene) |
| 0007 | `public.memberships` | `email` (PK), `status`, `stripe_customer_id`, `stripe_subscription_id`, `current_period_end` | **RLS an, KEINE Policy** → nur Service-Role (Webhook) |
| 0008 | `public.gedanken_readings` | `user_id`, `body`, `source_stage`, `source_scores[]`, `model` (KI-Reading-Verlauf) | `gedanken_readings_rw_own` (all, eigene) |
| 0009 | `public.begleiter_messages` | `user_id`, `role` (user/assistant), `body`, `model` (KI-Chatverlauf) | `begleiter_messages_rw_own` (all, eigene) |
| 0010 | `public.muster_spiegel` | `user_id`, `body`, `source_entry_count`, `source_from/to`, `model` (KI-„Muster-Spiegel") | `muster_spiegel_rw_own` (all, eigene) |
| 0011 | (ändert `progress`) | erweitert `item_type`-CHECK um `programm` | — |
| 0012 | `public.rueckkehr` | `user_id`, `datum` (date), unique(user,datum) — „tägliche Rückkehr" | `rueckkehr_rw_own` (all, eigene) |
| 0013 | `public.redaktionsplan_posts` | `woche`, `block`, `thema`, `wochentag`, `kanal`, `format`, `titel`, `status`, `sort` … | **RLS an, KEINE Policy** → nur Service-Role (Admin-Routen) |
| 0014 | (ändert `progress`) | erweitert `item_type`-CHECK um `wissenskapitel` | — |

**Gefundene Tabellen (10):** `profiles`, `progress`, `notes`, `ebook_leads`, `test_results`, `memberships`, `gedanken_readings`, `begleiter_messages`, `muster_spiegel`, `rueckkehr`, `redaktionsplan_posts`. (Migrationen 0011/0014 erweitern nur `progress`; 0002/0004 ergänzen Spalten an `profiles`.)

**RLS-Muster:** Nutzerbezogene Tabellen tragen eine `_rw_own`-Policy (`auth.uid() = user_id`, Lesen+Schreiben nur der eigenen Zeilen). Die drei „geheimen" Tabellen (`ebook_leads`, `memberships`, `redaktionsplan_posts`) haben RLS aktiv, aber **bewusst keine Policy** — damit sind sie für anon/authenticated vollständig gesperrt und nur über den Service-Role-Key (nach serverseitiger Berechtigungsprüfung) erreichbar. Alle `SECURITY DEFINER`-Funktionen setzen `search_path = ''` (Supabase-Linter-Empfehlung).

---

## E) Deployment

### Dockerfile (Multi-Stage)

Drei Stages auf `node:22-alpine` (Next.js 16 braucht Node ≥ 20.9):

1. **`deps`** — `npm ci` aus `package.json` + `package-lock.json`.
2. **`builder`** — kopiert `node_modules`, nimmt die drei `NEXT_PUBLIC_*` als `ARG`/`ENV` entgegen (müssen zur **Build-Zeit** vorliegen, da sie ins Client-Bundle eingebacken werden), `NEXT_TELEMETRY_DISABLED=1`, `npm run build`.
3. **`runner`** — `NODE_ENV=production`, `PORT=3000`, eigener Nicht-Root-User (`nextjs:nodejs`). Kopiert `public`, `content` (Mitglieder-PDFs, bewusst außerhalb `public/` → nur hinter Login), `.next` (mit `--chown=nextjs:nodejs`, damit der ISR-/Prerender-Cache zur Laufzeit schreibbar ist), `node_modules` und `package.json`. `CMD ["npm", "run", "start"]`, `EXPOSE 3000`.

### `deploy/` — Überblick

> **Wichtig:** Aus `deploy/` wird **nichts** ausgerollt. Der Ordner ist eine **versionierte Spiegelung** des produktiven Setups zum Nachschlagen.

Produktiv (Hetzner):
- **Quellcode/Build-Context:** `/opt/website` (dieses Repo)
- **Compose-Stack:** `/opt/mattermost/docker-compose.yml`, Service `website` (dort liegen auch Caddy, Mattermost, Postgres)
- **Secrets & Build-Args:** `/opt/mattermost/.env`
- **Reverse-Proxy + TLS:** **Caddy** (`/opt/mattermost/caddy/Caddyfile`), automatisches TLS (kein certbot/nginx)
- **Container:** `mattermost-website-1`, nur `expose: 3000` (kein Host-Port; Zugriff nur intern über Caddy)

**Routing (Caddy):** `www.werdemeisterdeinergedanken.de` → `reverse_proxy website:3000`; Apex und `neu.`/`www.neu.` → 301 bzw. proxy.

**Ausrollen (der echte Weg):**
```bash
git -C /opt/website pull
docker compose -f /opt/mattermost/docker-compose.yml up -d --build website
```
Rebuild (`--build`) ist nur nötig, wenn sich `NEXT_PUBLIC_*` ändert (Build-Zeit). Alle übrigen Variablen (`RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `ANTHROPIC_API_KEY`, `ADMIN_EMAILS`, `ENFORCE_CANONICAL_HOST` …) werden zur Laufzeit gelesen → `up -d website` genügt.

**Ordnerinhalt:**
- `deploy/docker-compose.yml` — 1:1-Spiegelung des Service `website` (eigener Projektname `wmdg-website-spiegel`, damit ein versehentlicher Start den Produktivstack nie überschreibt). Dokumentiert Build-Args, Env-Zeilen und das Volume `/opt/website-vorlagen:/app/content/vorlagen:ro` (Vorlagen-Galerie ~2 GB, bewusst außerhalb von Repo/Image).
- `deploy/.env.example` — dokumentiert, was in `/opt/mattermost/.env` gehört.
- `deploy/nginx/werdemeisterdeinergedanken.conf` — **Altbestand** aus der nginx-Ära; nginx läuft produktiv nicht mehr (TLS macht Caddy).

### Host-Kanonisierung & Auth im Proxy (`src/proxy.ts`)

Der „Proxy" (Next.js-16-Nachfolger der Middleware) übernimmt drei Aufgaben, in dieser Reihenfolge:
1. **Kanonischer Host:** Apex (`werdemeisterdeinergedanken.de`) und `neu.` werden per 301 auf `https://www.…` umgeleitet (abschaltbar über `ENFORCE_CANONICAL_HOST=false`; Host wird via `x-forwarded-host` hinter dem Proxy gelesen).
2. **Auth/Session:** Auf `/mitglieder`, `/admin`, `/login` wird die Supabase-Session aufgefrischt. `/mitglieder` ohne Login → `/login?redirect=…`; `/admin` zusätzlich mit Admin-Prüfung (`isAdminEmail`, Defense-in-Depth); eingeloggt auf `/login` → `/mitglieder`.
3. **noindex** für nicht-kanonische Hosts (z. B. Vercel-Preview) via `X-Robots-Tag`.

`config.matcher` schließt `api`, `_next/static`, `_next/image`, `favicon.ico`, `robots.txt`, `sitemap.xml` aus.

---

_Stand: 2026-09-11 — automatisch dokumentiert_
