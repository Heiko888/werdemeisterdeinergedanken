# WMDG — Komplette Seiten- & Funktionsdokumentation (Gesamtdokument)

> Dies ist die **zusammengefasste Gesamtansicht** aller Kapitel aus `docs/seiten/`.
> Die Einzelkapitel bleiben die Pflege-Quelle; dieses Dokument bündelt sie zum
> Lesen/Exportieren an einem Ort.

_Stand: 2026-09-11._

---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/README.md -->
<!-- ============================================================ -->

# Seiten- & Funktionsdokumentation

Vollständige Dokumentation aller Seiten, Routen, Funktionen, Generatoren und der
Konfiguration von **werdemeisterdeinergedanken** (Next.js 16, App Router).
Erstellt durch ein automatisiertes Doku-Team, das jeden Bereich direkt am echten
Quellcode dokumentiert hat.

> **Zweck:** Damit jederzeit der aktuelle Serverstand nachvollziehbar ist – welche
> Seite was tut, was konfiguriert ist, welche Datenquellen und Umgebungsvariablen
> dahinterstehen und welche Erweiterungen perspektivisch vorgesehen sind.

_Stand: 2026-09-11_

---

## Inhaltsverzeichnis

| # | Dokument | Inhalt |
|---|----------|--------|
| 01 | [Öffentliche Seiten](./01-oeffentliche-seiten.md) | Startseite, Die 7 Stufen, Buch, E-Book, Über mich, Bewusstseinstest, Kontakt, Blog (+Artikel), Impressum, Datenschutz |
| 02 | [Mitgliedschaft & Authentifizierung](./02-mitgliedschaft-auth.md) | Login, Mitgliedschaft, Willkommen, Auth-Callback – kompletter Anmelde-/Registrierungs-/Checkout-Fluss |
| 03 | [Mitgliederbereich (/mitglieder)](./03-mitgliederbereich.md) | Dashboard, 7 Stufen, Praxis, Wissen, Wissensdatenbank, Journal, Detektor, KI-Begleiter, Gedankenprofil, Einstellungen, Programm, Rückkehr, Arbeitsheft – inkl. Zugriffsschutz & KI |
| 04 | [Admin-Bereich (/admin)](./04-admin.md) | Dashboard, Seiten, Redaktionsplan, Marken-Übersicht, Vorlagen, Bewusstseinsbibliothek – inkl. Admin-Zugriffsschutz |
| 05 | [API-Routen](./05-api-routes.md) | Checkout, Buch-Checkout/Download, E-Book (Double-Opt-In), Impulse-Newsletter, Kontakt, Stripe-Webhook, RSS |
| 06 | [Konfiguration & Infrastruktur](./06-konfiguration-infrastruktur.md) | Layout/SEO, next.config, Proxy, Umgebungsvariablen, Supabase/DB, Resend/Mail, robots/sitemap, Docker/Deployment |
| 07 | [Generatoren & Folien](./07-generatoren-und-folien.md) | Alle `tools/`-Skripte: PDF, Marketing, Print, Bilder, Vorlagen-Galerie, Video-Folien, Workshop-Präsentationen |
| 08 | [Verzeichnisse & Datenstruktur](./08-verzeichnisse-und-daten.md) | Kompletter Verzeichnisbaum, `src/lib`-Module, `content/`, `public/`, `docs/`, Datenbank-Datensicht |
| 09 | [Geplante Erweiterungen & Roadmap](./09-geplante-erweiterungen.md) | Deaktivierte/versteckte Funktionen, Platzhalter, Feature-Flags, offene Audit-Punkte, latente Strukturen |

---

## Überblick in Zahlen

- **35 Seiten** (`page.tsx`) über öffentlich, Mitgliederbereich und Admin
- **~20 Route-Handler** (`route.ts`): API, geschützte Downloads, RSS, Auth-Callback
- **51 `src/lib`-Module** als Daten- und Logik-Schicht
- **11 Supabase-Tabellen** (`profiles`, `progress`, `notes`, `test_results`,
  `ebook_leads`, `memberships`, `gedanken_readings`, `begleiter_messages`,
  `muster_spiegel`, `rueckkehr`, `redaktionsplan_posts`) mit RLS
- **~40 Generatoren** in `tools/` (PDF, Marketing, Print, Video-Folien, Workshop)
- **KI-Funktionen** auf `claude-opus-5` (Fallback `claude-opus-4-8`)

## Zentrale Architektur-Merkmale

- **Next.js 16 / App Router.** „Middleware" heißt hier **Proxy** (`src/proxy.ts`):
  Host-Kanonisierung, Supabase-Session-Refresh, Login-/Admin-Schutz.
- **Dreischichtiger Zugriffsschutz** für den Mitgliederbereich: Proxy →
  Layout-/Seiten-Check (`supabase.auth.getUser()`) → Download-Guard für PDFs.
  Geschützte PDFs liegen bewusst in `content/pdf/` (nicht `public/`).
- **SEO** über den zentralen `withCanonical()`-Helper (`src/lib/seo.ts`), da
  Next.js Metadaten je Segment ersetzt statt zu mergen.
- **Zahlung** über Stripe (Abo + Buch-Einmalkauf), Freischaltung asynchron per
  signiertem Webhook; **E-Mail** über Resend mit DSGVO-Double-Opt-In.
- **Admin** per `ADMIN_EMAILS` (serverseitig) + `SUPABASE_SERVICE_ROLE_KEY`.

## Pflege der Dokumentation

Die Dateien sind nach Bereichen getrennt, damit einzelne Kapitel bei Änderungen
gezielt aktualisiert werden können. Wichtige Änderungen werden zusätzlich im
chronologischen Änderungsprotokoll [`../AENDERUNGEN.md`](../AENDERUNGEN.md)
festgehalten.

_Stand: 2026-09-11 — automatisch dokumentiert_


---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/01-oeffentliche-seiten.md -->
<!-- ============================================================ -->

# Öffentliche Seiten

Diese Datei dokumentiert alle öffentlich zugänglichen Seiten und Routen der Next.js-Website (App Router) des Projekts „Werde Meister deiner Gedanken" – also Marketing-, Landing-, Blog- und Rechtstexte. Grundlage ist ausschließlich der tatsächliche Code unter `src/app`, `src/components`, `src/lib` und `content/`. Der Mitgliederbereich (`/mitglieder`), der Admin-Bereich (`/admin`), Auth-Seiten und die reinen API-Routen sind hier bewusst nicht enthalten.

## Übersicht der dokumentierten Routen

- [`/` — Startseite](#--startseite)
- [`/die-7-stufen` — Die 7 Stufen der Bewusstseinsentwicklung](#die-7-stufen--die-7-stufen-der-bewusstseinsentwicklung)
- [`/buch` — Verkaufsseite Buch](#buch--verkaufsseite-buch)
- [`/ebook` — E-Book-Download (Route Handler)](#ebook--e-book-download-route-handler)
- [`/gratis-ebook` — Landingpage Lead-Magnet](#gratis-ebook--landingpage-lead-magnet)
- [`/ueber-mich` — Über mich](#ueber-mich--über-mich)
- [`/bewusstseinstest` — Bewusstseinstest](#bewusstseinstest--bewusstseinstest)
- [`/kontakt` — Kontakt](#kontakt--kontakt)
- [`/blog` — Blog-Übersicht](#blog--blog-übersicht)
- [`/blog/[slug]` — Blog-Artikel](#blogslug--blog-artikel)
- [`/impressum` — Impressum](#impressum--impressum)
- [`/datenschutz` — Datenschutzerklärung](#datenschutz--datenschutzerklärung)

### Seitenübergreifende Konventionen

- **Metadaten:** Fast alle Seiten setzen ihre SEO-Metadaten über den Helper `withCanonical(path, meta)` aus `src/lib/seo.ts`. Dieser ergänzt die kanonische URL (`alternates.canonical`) sowie ein seiten-eigenes `openGraph`- und `twitter`-Objekt (Typ `website`, `locale: de_DE`, `siteName`, `og:url = site.url + path`). Grund: Next.js merged verschachtelte Metadata-Felder nicht feldweise, sondern ersetzt sie je Segment – ohne den Helper würde jede Unterseite die OpenGraph-Daten der Startseite erben.
- **Zentrale Daten:** `src/lib/site.ts` (`site`) liefert Name, URL, E-Mail (`info@werdemeisterdeinergedanken.de`), Social-Links und Video-IDs. `src/lib/content.ts` liefert die redaktionellen Kerninhalte (Stufen, Werte, Testimonials, FAQs). `src/lib/gradients.ts` liefert die geteilten Hero-Verläufe (`HERO_GLOW`).
- **Server- vs. Client-Komponenten:** Alle Seiten (`page.tsx`) sind Server-Komponenten. Nur einzelne eingebundene Sektionen sind Client-Komponenten (`"use client"`): `Faq`, `EbookForm`, `ContactForm`, `ConsciousnessTest`, `BlogIndex`, `ReadingProgress`, `Reveal`, `VideoMessage`.

---

## `/` — Startseite

1. **Route / Datei:** `/` · `src/app/page.tsx`
2. **Zweck:** Zentrale Marketing-Startseite. Führt Besucher vom Nutzenversprechen („Nicht die Umstände formen dich, sondern was du darüber denkst") über die 7 Stufen, Vertrauensaufbau und Social Proof bis zum kostenlosen E-Book und den zentralen CTAs (Erstgespräch / 7 Stufen).
3. **Funktionen & Features:** Reine Komposition von Sektions-Komponenten in fester Reihenfolge:
   - `Hero` — Titel, zwei CTAs (`/die-7-stufen`, `/kontakt`), Heiko-Porträt (`heiko-hero.webp`), Proof-Punkte.
   - `SevenStages` (`#angebot`) — 7 Stufen-Karten aus `stages` + Abschluss-Karte mit Link zu `/die-7-stufen`.
   - `Compass` — Nutzenliste + Bild `kompass-weg.webp`, CTA zum `/bewusstseinstest`.
   - `WhyMe` — Kurzbiografie + Werte (`values`), Link zu `/ueber-mich`.
   - `WhatToExpect` — 3 Erwartungs-Karten aus `expectations`.
   - `Testimonials` (`#stimmen`) — 3 Stimmen aus `testimonials`.
   - `MaybeNotYou` — Video-Botschaft (`VideoMessage`, YouTube-nocookie, Platzhalter-Video + gebrandetes Thumbnail).
   - `LeadMagnet` (`#ebook`) — E-Book-Cover + `EbookForm` (Anmeldung).
   - `Faq` — Akkordeon aus `faqs` (Client-Komponente).
   - `FinalCta` — Abschluss-CTAs (`/kontakt`, `/die-7-stufen`).
   - Die Sektion `Creed` ist importiert, aber auskommentiert (nicht aktiv).
4. **Datenquellen:** Über die Sektionen indirekt `src/lib/content.ts` (`stages`, `values`, `expectations`, `testimonials`, `faqs`), `src/lib/site.ts` (Video), `src/lib/gradients.ts`. Statisch (SSG) – kein `generateStaticParams`, kein `generateMetadata`, keine `revalidate`/`dynamic`-Flags auf Seitenebene.
5. **Konfiguriert:** Keine eigene `metadata`-Export in `page.tsx` – die Startseite erbt die Metadaten aus dem Root-Layout (`src/app/layout.tsx`). OpenGraph-Bild kommt aus der dateibasierten `src/app/opengraph-image.tsx`. Bilder aus `public/`: `heiko-hero.webp`, `heiko-avatar.webp`, `kompass-weg.webp`, `ebook-mockup.webp`, Video-Thumbnail unter `public/video-thumbnails/landing/`. Server-Komponente.

---

## `/die-7-stufen` — Die 7 Stufen der Bewusstseinsentwicklung

1. **Route / Datei:** `/die-7-stufen` · `src/app/die-7-stufen/page.tsx`
2. **Zweck:** Detaillierte Darstellung des kompletten Entwicklungswegs – jede der 7 Stufen mit Erkennungsmerkmalen, Falle, entstehender Fähigkeit und nächstem Schritt, dargestellt als „leuchtender Pfad" (Timeline).
3. **Funktionen & Features:**
   - Dunkler Hero mit durchlaufendem Hintergrundbild `kompass-weg.webp` (Maskierung/Ausblendung nach unten), CTA „Wo stehe ich gerade?" → `/bewusstseinstest`.
   - Timeline (`<ol>`) über `stages.map(...)`: pro Stufe Nummer, Titel, Untertitel, Beschreibung und – sofern vorhanden – der `detail`-Block als 4-Felder-Raster (recognize, stuck, skill, next).
   - Abschluss-CTA-Sektion mit zwei Buttons: `/bewusstseinstest` und `/kontakt`.
   - `Faq` (Client-Akkordeon, Standard-FAQs) am Seitenende.
4. **Datenquellen:** `stages` aus `src/lib/content.ts` (inkl. optionalem `detail`-Objekt, das nur hier gerendert wird). Statisch (SSG). Kein `generateStaticParams`/`revalidate`.
5. **Konfiguriert:** `metadata` via `withCanonical("/die-7-stufen", …)` – Titel „Die 7 Stufen der Bewusstseinsentwicklung". Bild `public/kompass-weg.webp` (mit `priority`). Eingebundene Komponenten: `Container`, `Button`, `Reveal`, `Eyebrow`, `ArrowRight`, `Faq`. Server-Komponente; aufwendige Inline-Gradients (Gold-Glows, Sternenfeld). Keine Umgebungsvariablen.

---

## `/buch` — Verkaufsseite Buch

1. **Route / Datei:** `/buch` · `src/app/buch/page.tsx`
2. **Zweck:** Verkaufs-/Landingpage für das kostenpflichtige Buch „Werde Meister deiner Gedanken" – wählbar als PDF (29,90 €) oder gedruckt (39,90 €), inkl. vollständigem Inhaltsverzeichnis und Kaufabschluss über Stripe.
3. **Funktionen & Features:**
   - `async`-Seite mit `searchParams` (`checkout`, `edition`): zeigt nach Rückkehr aus dem Bezahlvorgang eine Hinweis-Leiste (Erfolg/Abbruch/Fehler), Erfolgstext abhängig von `edition` (PDF-Download vs. Versand).
   - Hero mit Cover `buch-cover-3d.webp`, Preisangaben, Anker-Buttons `#bestellen` und `#inhalt`.
   - Problem-Sektion (3 Karten), Nutzen-Sektion (`promises`), vollständiges Inhaltsverzeichnis (`bookParts`: 5 Teile / 24 Kapitel, Teil V hervorgehoben), „Für wen"-Sektion (`forWhom`), Autor-Karte (`heiko-avatar.webp`).
   - Stimmen-Sektion nur, wenn `bookTestimonials.length > 0` (aktuell leer → ausgeblendet).
   - Angebots-/Preis-Sektion (`#bestellen`) mit zwei `BuchKaufenButton`-Instanzen (`edition="pdf"` / `edition="print"`).
   - FAQ-Sektion (`#faq`) als native `<details>`-Akkordeons aus `buchFaqs` (lokal definiert).
   - **CTA/Formular:** `BuchKaufenButton` ist ein echtes HTML-`<form action="/api/buch-checkout" method="POST">` mit verstecktem `edition`-Feld → startet den Stripe-Einmalkauf serverseitig (Fallback zum Kontaktformular, falls Stripe nicht eingerichtet).
4. **Datenquellen:** `bookTestimonials` aus `src/lib/content.ts`; `HERO_GLOW` aus `src/lib/gradients.ts`; Preise, `bookParts`, `promises`, `forWhom`, `buchFaqs`, `NOTICES` sind lokal in der Datei definiert. Quelle des Inhaltsverzeichnisses laut Kommentar: `docs/ebook/werde-meister-deiner-gedanken.md`. Seite ist wegen `await searchParams` dynamisch (kein `generateStaticParams`).
5. **Konfiguriert:** `metadata` via `withCanonical("/buch", …)`. Bilder: `public/buch-cover-3d.webp`, `public/heiko-avatar.webp` (beide statisch importiert). Komponenten: `Container`, `Card`, `Button`, `Eyebrow`, Icons (`ArrowRight`, `Check`, `Star`), `BuchKaufenButton`. Server-Komponente. Zahlungsabwicklung über die API-Route `/api/buch-checkout` (Stripe).

---

## `/ebook` — E-Book-Download (Route Handler)

1. **Route / Datei:** `/ebook` · `src/app/ebook/route.ts` (Route Handler, `GET`)
2. **Zweck:** Geschützter Download des Lead-Magnet-E-Books „Die 7 Stufen der Bewusstseinsentwicklung" als PDF. Der Download ist der Gegenwert für die bestätigte Newsletter-Anmeldung.
3. **Funktionen & Features:**
   - `GET`-Handler, liest den `token`-Query-Parameter aus der URL.
   - Prüft den Token über `isValidEbookToken(token)`. Ohne oder mit ungültigem Token bewusst **404** („Nicht gefunden") statt 403 – Unbefugte erfahren nicht, dass es etwas zu holen gibt.
   - Bei gültigem Token: liefert die PDF-Bytes mit `Content-Type: application/pdf`, `Content-Disposition: attachment` (Dateiname aus `EBOOK_FILE_NAME`) und `Cache-Control: private, no-store`.
   - Fehlt die Datei o. Ä. → ebenfalls sauberes 404 statt 500.
4. **Datenquellen:** `getEbookPdfBytes()` / `EBOOK_FILE_NAME` aus `src/lib/pdf/ebook-file.ts` (liest `content/pdf/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf`, bewusst unter `content/` statt `public/`, damit die Datei nicht an der Token-Prüfung vorbei ausgeliefert wird; wird nach dem ersten Lesen gecacht). Token-Validierung via `isValidEbookToken` aus `src/lib/ebook-download.ts` – prüft in Supabase-Tabelle `ebook_leads` gegen `confirm_token` und Status `confirmed`.
5. **Konfiguriert:** `export const runtime = "nodejs"` (Dateisystemzugriff) und `export const dynamic = "force-dynamic"` (Antwort hängt vom URL-Token ab). Keine Metadaten (kein UI). Abhängig von der Supabase-Konfiguration (Admin-Client); ohne Supabase wird nichts ausgeliefert.

---

## `/gratis-ebook` — Landingpage Lead-Magnet

1. **Route / Datei:** `/gratis-ebook` · `src/app/gratis-ebook/page.tsx`
2. **Zweck:** Fokussierte Landingpage mit dem einen Ziel, die E-Mail-Anmeldung für das kostenlose E-Book zu erreichen (Double-Opt-in). Erklärt Inhalt, Ablauf und nimmt Einwände über eine FAQ.
3. **Funktionen & Features:**
   - Hero mit E-Book-Mockup (`ebook-mockup.webp`), Kernversprechen (`bullets`) und dem Anmeldeformular `EbookForm` (Client-Komponente).
   - Vorschau der 7 Stufen als Karten aus `stages`.
   - „So kommst du an dein E-Book" – 3-Schritte-Ablauf (`steps`, Double-Opt-in transparent gemacht).
   - Vertrauens-Karte mit Heiko-Porträt (`heiko-avatar.webp`).
   - `Faq` (Client) mit **eigenen** Items (`ebookFaqs`), eigenem Eyebrow/Titel.
   - Abschluss-CTA-Sektion mit **zweitem** `EbookForm`.
   - **Formular:** `EbookForm` sendet per `fetch` an `/api/ebook` (JSON `{ email, company }`, `company` = Honeypot). Statusmaschine: `idle → sending → confirm | sent | fallback`; bei bestätigten Adressen direkter Download-Link mit Token, bei „not_configured"/Fehler Fallback mit Retry.
4. **Datenquellen:** `stages` aus `src/lib/content.ts`, `HERO_GLOW` aus `src/lib/gradients.ts`; `bullets`, `steps`, `ebookFaqs` lokal definiert. Statisch (SSG); die eigentliche Anmeldung läuft zur Laufzeit über die API-Route `/api/ebook`.
5. **Konfiguriert:** `metadata` via `withCanonical("/gratis-ebook", …)`. Bilder: `public/ebook-mockup.webp`, `public/heiko-avatar.webp` (statisch importiert). Komponenten: `Container`, `Reveal`, `Eyebrow`/`SectionHeading`, `Card`, Icons (`Check`, `Download`, `Mail`, `Spark`), `EbookForm`, `Faq`. Server-Komponente (mit eingebetteten Client-Formularen).

---

## `/ueber-mich` — Über mich

1. **Route / Datei:** `/ueber-mich` · `src/app/ueber-mich/page.tsx`
2. **Zweck:** Persönliche Vorstellung von Heiko Schwaninger („Begleiter für mentale Entprogrammierung") – seine Geschichte, Wendepunkte und Werte, als Vertrauensbrücke zum Angebot.
3. **Funktionen & Features:**
   - `PageHero` mit Hintergrundbild `ueber-heiko-berg.webp` (Spotlight links).
   - Lange Story-Sektion (Fließtext mit hervorgehobenen Frage-Blöcken/`<aside>`), inkl. Inline-Link zu `/die-7-stufen`.
   - CTA-Buttons: `/die-7-stufen` und `/kontakt`.
   - Meilenstein-Timeline (`milestones`, lokal definiert).
   - Werte-Sektion (dunkles Band) aus `values`.
4. **Datenquellen:** `values` aus `src/lib/content.ts`; `milestones` lokal in der Datei. Statisch (SSG).
5. **Konfiguriert:** `metadata` via `withCanonical("/ueber-mich", …)`. Bild: `public/ueber-heiko-berg.webp` (über `PageHero`, `imagePosition="30% 15%"`, `spotlight="left"`). Komponenten: `PageHero`, `Container`, `Button`, `Reveal`, `ArrowRight`, `Eyebrow`. Server-Komponente.

---

## `/bewusstseinstest` — Bewusstseinstest

1. **Route / Datei:** `/bewusstseinstest` · `src/app/bewusstseinstest/page.tsx` (interaktiver Teil: `src/components/sections/ConsciousnessTest.tsx`, Server-Action: `src/app/bewusstseinstest/actions.ts`)
2. **Zweck:** Kostenloser Selbsttest, der über 21 Aussagen ermittelt, auf welcher der 7 Stufen der Nutzer aktuell steht, und eine ausführliche Auswertung inklusive nächstem Schritt liefert.
3. **Funktionen & Features:**
   - `PageHero` mit Bild `hero-bewusstseinstest.webp` (Spotlight rechts).
   - `ConsciousnessTest` (Client-Komponente): Fragen-Navigation mit Fortschrittsbalken, 5-stufige Antwortskala (0–4), Zurück-Button; am Ende Ergebnis-Auswertung (Hauptstufe, Profil-Balken über alle Stufen, Herausforderung/Potenzial/nächster Schritt/Empfehlung), „Test wiederholen".
   - Antworten werden in `localStorage` (`wmdg:test-antworten`) zwischengespeichert, um den Login-Umweg (`?fortsetzen=1`) zu überleben.
   - Ergebnis wird bei angemeldeten Mitgliedern über die Server-Action `saveStartStage` am Profil gespeichert (Rohantworten werden serverseitig neu bewertet, damit kein Ergebnis manipuliert werden kann). CTAs abhängig vom Login-Status: eingeloggt → `/mitglieder/gedankenprofil` bzw. `/mitglieder/stufe/{nr}`; ausgeloggt → `/kontakt` und `/#angebot` sowie Login-Link.
4. **Datenquellen:** `src/lib/consciousness-test.ts` (`answerScale`, `testQuestions` = 21 Fragen à 3 pro Stufe, `testStages`, `scoreByStage`, `topStage`, `getTestStage`, `MAX_PER_STAGE` = 12). Server-Action nutzt Supabase (`profiles`, `test_results`) über `src/lib/supabase/server.ts` und prüft `isSupabaseConfigured`. Statischer Seitenrahmen; interaktive Logik client-/serverseitig.
5. **Konfiguriert:** `metadata` **ohne** `withCanonical` – inline gesetzt (`alternates.canonical` via `site.url`, Titel „Bewusstseinstest – Wo findest du dich gerade?"). Bild: `public/hero-bewusstseinstest.webp`. Komponenten: `PageHero`, `ConsciousnessTest`. Seite selbst Server-Komponente, Test ist Client-Komponente. Speicherfunktion abhängig von Supabase-Konfiguration.

---

## `/kontakt` — Kontakt

1. **Route / Datei:** `/kontakt` · `src/app/kontakt/page.tsx` (Formular: `src/components/sections/ContactForm.tsx`)
2. **Zweck:** Kontaktaufnahme und Anbahnung eines kostenlosen Erstgesprächs über ein Nachrichtenformular; zusätzlich direkte E-Mail- und Social-Media-Kontaktwege.
3. **Funktionen & Features:**
   - `async`-Seite mit `searchParams` (`thema`): über `resolveThema` wird ein bekanntes Thema (z. B. `mitgliedschaft`, `buch`) aufgelöst und dem Formular als Label, Hinweis und vorausgefüllte Nachrichtenvorlage übergeben.
   - `PageHero` (ohne Bild).
   - `ContactForm` (Client): Felder Name, E-Mail, Nachricht, Datenschutz-Checkbox (Pflicht) + Honeypot-Feld `company`; sendet per `fetch` JSON an `/api/kontakt`. Statusmaschine `idle → sending → done | error`; Erfolgs- und Fehleransicht mit Fallback-Mailto.
   - Seitenspalte (`aside`): Marken-Bild `WMDG-Personal-Logo-4x5-hell.png`, direkte E-Mail (`site.email`), Social-Icons aus `site.social`, Hinweis-Karte „Kostenloses Erstgespräch".
4. **Datenquellen:** `src/lib/site.ts` (`site.email`, `site.social`), `src/lib/kontakt-themen.ts` (`resolveThema`, `KONTAKT_THEMEN`). Versand über API-Route `/api/kontakt`. Wegen `await searchParams` dynamisch.
5. **Konfiguriert:** `metadata` via `withCanonical("/kontakt", …)`. Bild: `public/WMDG-Personal-Logo-4x5-hell.png`. Komponenten: `PageHero`, `Container`, `ContactForm`, Icons (`Mail`, `socialIcons`). Server-Komponente mit eingebettetem Client-Formular.

---

## `/blog` — Blog-Übersicht

1. **Route / Datei:** `/blog` · `src/app/blog/page.tsx` (Übersicht: `src/components/blog/BlogIndex.tsx`)
2. **Zweck:** Übersicht aller veröffentlichten Blog-Artikel („Impulse") mit hervorgehobenem neuestem Beitrag und Filterung nach Themen/Kategorien.
3. **Funktionen & Features:**
   - `PageHero` mit Bild `hero-blog-gipfel.webp` (Spotlight links).
   - `BlogIndex` (Client): hebt den neuesten Beitrag als große „Featured"-Karte hervor (nur im Filter „Alle"), Kategorie-Filter als Buttons (mit Zählern, nach Häufigkeit sortiert), responsives Artikel-Raster. Karten verlinken auf `/blog/{slug}`; Cover-Motiv aus redaktionellem Bild oder generativem `BlogCover`.
   - Die Seite übergibt bewusst nur schlanke Karten-Daten (`BlogCard`, ohne `content`) an die Client-Komponente.
4. **Datenquellen:** `publishedPosts()` aus `src/lib/blog.ts` – liefert nur veröffentlichte (nicht vorausdatierte) und nicht deaktivierte Artikel, neueste zuerst. Hinweis: Die Kategorie „Mentale Selbstverteidigung" ist in `DEACTIVATED_CATEGORIES` und erscheint daher nirgends öffentlich.
5. **Konfiguriert:** `metadata` via `withCanonical("/blog", …)`. `export const revalidate = 3600` (stündliche Neuvalidierung, damit vorausdatierte Artikel an ihrem Erscheinungstag von selbst auftauchen). Bild: `public/hero-blog-gipfel.webp`. Komponenten: `PageHero`, `BlogIndex` (→ `BlogCover`). Seite Server-Komponente, Übersicht Client-Komponente.

---

## `/blog/[slug]` — Blog-Artikel

1. **Route / Datei:** `/blog/[slug]` (dynamisches Segment `slug`) · `src/app/blog/[slug]/page.tsx` (OG-Bild: `src/app/blog/[slug]/opengraph-image.tsx`)
2. **Zweck:** Einzelansicht eines Blog-Artikels mit Lesefortschritt, gegliedertem Inhalt, Autor-Signatur, kontextabhängigem Abschluss-CTA und Empfehlungen weiterer Artikel.
3. **Funktionen & Features:**
   - `ReadingProgress` (Client) – Lesefortschrittsanzeige.
   - Dunkler Artikel-Header (Kategorie-Badge, Titel, Datum, Lesezeit, Autor), optionales Titelbild (`post.image`).
   - Inhalts-Renderer über `post.content`-Blöcke (`p`, `h2`, `quote`, `ul`); Inline-Links im Markdown-Stil `[Text](/pfad)` via `renderInline`.
   - Autor-Signatur (`heiko-avatar.webp`).
   - Kontextabhängiger CTA: `ctaFor(post)` wählt aus `CTA_BY_VARIANT` anhand von `post.cta` bzw. `CTA_BY_CATEGORY` (z. B. Kategorie „Wissenschaft" → „stufen", „Bewusstsein" → „test") oder Fallback „erstgespraech".
   - „Weitere Impulse": bis zu 2 Artikel, zuerst gleiche Kategorie, dann aufgefüllt.
   - `notFound()` (404) bei unbekanntem Slug oder deaktivierter Kategorie.
4. **Datenquellen:** `src/lib/blog.ts` (`getPost`, `posts`, `publishedPosts`, `isPublished`, `isCategoryDeactivated`, Typen `Post`/`CtaVariant`), `site` und `HERO_GLOW`. Artikelinhalte sind vollständig als strukturierte Blöcke in `src/lib/blog.ts` hinterlegt (kein Markdown-/CMS-Setup).
   - `generateStaticParams()` erzeugt Seiten für **alle** nicht deaktivierten Artikel (auch vorausdatierte – sie sind erreichbar, aber bis zum Erscheinungstag nicht verlinkt und `noindex`).
   - `generateMetadata()` setzt Titel, Beschreibung, kanonische URL, vollständiges `openGraph` (`type: article`, `publishedTime`) und `twitter`; für noch nicht erschienene oder deaktivierte Artikel `robots: { index: false }`.
5. **Konfiguriert:** `export const revalidate = 3600`. Dateibasiertes OG-Bild `opengraph-image.tsx` erzeugt pro Artikel ein Marken-Vorschaubild (1200×630, `ImageResponse`) mit echtem Titel/Kategorie; ebenfalls mit eigenem `generateStaticParams`. Autor-Bild `public/heiko-avatar.webp`. Komponenten: `Container`, `Button`, `Reveal`, `ArrowRight`, `ReadingProgress`. Server-Komponente (mit Client-`ReadingProgress`).

---

## `/impressum` — Impressum

1. **Route / Datei:** `/impressum` · `src/app/impressum/page.tsx`
2. **Zweck:** Gesetzlich vorgeschriebene Anbieterkennzeichnung (§ 5 DDG) mit Kontaktdaten, USt-ID und rechtlichen Hinweisen.
3. **Funktionen & Features:** `PageHero` (nur Titel „Impressum") und ein Textblock in `Prose`-Formatierung: Angaben gemäß § 5 DDG, Kontakt, Umsatzsteuer-ID (DE415501288), redaktionell Verantwortlicher, Streitschlichtung (EU-OS-Plattform), Haftung für Inhalte, Urheberrecht. Enthält `mailto:`-Link und externen Link zur EU-Streitbeilegung.
4. **Datenquellen:** `src/lib/site.ts` (`site.author`, `site.email`); Adresse und rechtliche Texte sind fest in der Datei hinterlegt. Statisch (SSG).
5. **Konfiguriert:** `metadata` via `withCanonical("/impressum", …)` mit `robots: { index: false, follow: true }` (nicht indexiert). Komponenten: `PageHero`, `Container`, `Prose`. Server-Komponente. Keine Bilder/Umgebungsvariablen.

---

## `/datenschutz` — Datenschutzerklärung

1. **Route / Datei:** `/datenschutz` · `src/app/datenschutz/page.tsx`
2. **Zweck:** DSGVO-Datenschutzerklärung – informiert über alle Datenverarbeitungen der Website (Hosting, Logs, Cookies, Analyse, Formulare, Newsletter, Account) und die Betroffenenrechte.
3. **Funktionen & Features:** `PageHero` (Titel „Datenschutz") und ein umfangreicher `Prose`-Textblock mit 13 nummerierten Abschnitten: Verantwortlicher, Allgemeines, Hosting (Hetzner), Server-Logfiles, Cookies & Einwilligung, Google Analytics 4 (nur nach Consent), Kontaktformulare, Newsletter/E-Book (Double-Opt-in), Resend (E-Mail-Versand), Supabase (Account/Datenhaltung, EU/Frankfurt), Betroffenenrechte, Beschwerderecht, Aktualität. Mehrere `mailto:`- und externe Datenschutz-Links.
4. **Datenquellen:** `src/lib/site.ts` (`site.author`, `site.email`); die Rechtstexte sind fest in der Datei hinterlegt. Nennt die real eingesetzten Dienste: Hetzner (Hosting), Google Analytics, Resend (Mailversand), Supabase (Auth/Daten). Statisch (SSG).
5. **Konfiguriert:** `metadata` via `withCanonical("/datenschutz", …)` mit `robots: { index: false, follow: true }`. Komponenten: `PageHero`, `Container`, `Prose`. Server-Komponente. Keine Bilder/Umgebungsvariablen.

---

_Stand: 2026-09-11 — automatisch dokumentiert_


---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/02-mitgliedschaft-auth.md -->
<!-- ============================================================ -->

# Mitgliedschaft & Authentifizierung

Diese Dokumentation beschreibt die Seiten und Routen rund um Mitgliedschaft, Anmeldung, Registrierung und Stripe-Checkout des Projekts „werde meister deiner gedanken" (Next.js, App Router). Alle Angaben stammen aus dem tatsächlichen Quellcode.

Grundprinzip im gesamten Bereich: Ohne konfigurierte Umgebungsvariablen bleibt die Seite lauffähig. Fehlt Supabase, zeigt der Login einen Hinweis statt eines Fehlers; fehlt Stripe, fallen die „Mitglied werden"-Buttons sanft auf das Kontaktformular zurück.

## Übersicht

- [Kompletter Anmelde-/Registrierungs-/Checkout-Fluss](#ablauf-der-komplette-fluss) — Gesamtablauf
- [`/login`](#login) — Mitglieder-Login (und optional Registrierung)
- [`/mitgliedschaft`](#mitgliedschaft) — Verkaufsseite mit Stripe-Checkout
- [`/mitgliedschaft/willkommen`](#mitgliedschaftwillkommen) — Erfolgsseite nach der Zahlung
- [`/auth/callback`](#authcallback) — Route-Handler für Bestätigungslinks aus E-Mails
- [Unterstützende Module](#unterstützende-module) — lib- und Komponenten-Bausteine

---

## Ablauf: der komplette Fluss

Es gibt zwei Wege in den Mitgliederbereich, gesteuert über die Schalter in `src/lib/supabase/config.ts`.

**Standardweg „erst bezahlen, dann Zugang"** (`ALLOW_SELF_REGISTRATION = false`, Voreinstellung):

1. Besucher öffnet `/mitgliedschaft` und klickt auf „Mitglied werden" (Komponente `CheckoutButton`). Das ist ein echtes HTML-Formular, das per `POST` an `/api/checkout` sendet — der gewählte Plan (`monat` oder `jahr`) steckt in einem versteckten Feld.
2. `/api/checkout` (`route.ts`) startet eine Stripe-Checkout-Session im Modus `subscription`. Ist eine Supabase-Session vorhanden, werden `customer_email`, `client_reference_id` und Metadaten (`supabase_user_id`, `plan`) mitgegeben; ohne Anmeldung ist Gast-Checkout möglich. Antwort: `303`-Redirect auf die gehostete Stripe-Bezahlseite.
3. Nach erfolgreicher Zahlung leitet Stripe auf `success_url` = `/mitgliedschaft/willkommen?session_id=…`. Bei Abbruch: `/mitgliedschaft?checkout=abgebrochen`; bei Fehler: `/mitgliedschaft?checkout=fehler`.
4. Ein Stripe-Webhook (außerhalb dieser Seiten, siehe `docs/STRIPE-MITGLIEDSCHAFT.md`) pflegt die Tabelle `memberships` und legt bei Bedarf das Supabase-Konto an. Der neue Nutzer erhält per E-Mail einen Link, um sein Passwort zu setzen.
5. Auf `/mitgliedschaft/willkommen` wird der Nutzer angeleitet, das Postfach zu prüfen, das Passwort über den Mail-Link zu setzen und sich anschließend unter `/login` anzumelden.
6. Der Passwort-/Bestätigungslink zeigt auf `/auth/callback`, tauscht den `code` gegen eine Session (`exchangeCodeForSession`) und leitet auf das Ziel weiter (`next`, standardmäßig `/mitglieder`).

**Optionaler Weg „erst registrieren"** (`ALLOW_SELF_REGISTRATION = true`, per Env-Variable):

1. Auf `/login` steht zusätzlich der Registrieren-Modus zur Verfügung (`AuthForm`).
2. Die Server-Action `signUp` legt über Supabase ein Konto an (`supabase.auth.signUp`) mit `emailRedirectTo` = `/auth/callback`.
3. Ist E-Mail-Bestätigung aktiv, kommt keine Session zurück, und es erscheint ein Hinweis, die Adresse per Mail zu bestätigen. Der Bestätigungslink läuft wieder über `/auth/callback`.
4. Besteht sofort eine Session, erfolgt direkte Weiterleitung nach `/mitglieder`.

Login selbst läuft in beiden Wegen über die Server-Action `signIn` (`signInWithPassword`) und leitet nach Erfolg auf das interne Ziel (`redirect`-Parameter, per `safeInternalPath` abgesichert, Fallback `/mitglieder`).

---

## `/login`

1. **Route / URL-Pfad:** `/login` — Datei: `src/app/login/page.tsx`
2. **Zweck:** Anmeldeseite für den geschützten Mitgliederbereich; je nach Konfiguration auch Registrierung.
3. **Funktionen & Features:**
   - Rendert das Formular `AuthForm` (Client-Komponente) für **Passwort-basierte Anmeldung** (E-Mail + Passwort). Kein Magic Link, kein OAuth.
   - Registrierung wird nur angezeigt, wenn `ALLOW_SELF_REGISTRATION` gesetzt ist; sonst ist der Login auf reinen Anmelde-Modus fixiert.
   - Liest den Query-Parameter `redirect`; dieser wird als `redirectTo` an das Formular gereicht (Standard `/mitglieder`), damit nach Login das ursprünglich gewünschte Ziel angesteuert wird.
   - Ist `ALLOW_SELF_REGISTRATION` aus, erscheint ein Hinweistext mit Link auf `/mitgliedschaft` („Jetzt Mitglied werden").
   - Ist Supabase nicht konfiguriert (`isSupabaseConfigured` false), wird statt des Formulars eine erklärende Info-Box gezeigt („Mitgliederbereich noch nicht aktiviert").
   - Fehlerbehandlung und Erfolgsmeldungen laufen über den Zustand der Server-Actions und werden im `AuthForm` angezeigt (siehe unten).
4. **Datenquellen & Ablauf:**
   - `searchParams` ist ein `Promise` (App-Router-Konvention dieser Version) und wird per `await` ausgelesen.
   - Verwendet `isSupabaseConfigured` und `ALLOW_SELF_REGISTRATION` aus `@/lib/supabase/config`.
   - Der eigentliche Auth-Vorgang findet in den Server-Actions `signIn`/`signUp` (`src/app/auth/actions.ts`) statt, die den Supabase-Server-Client (`@/lib/supabase/server`) nutzen.
5. **Konfiguriert:**
   - **SEO-Metadaten:** `title: "Mitglieder-Login"`, Beschreibung, `robots: { index: false, follow: false }` (nicht indexierbar).
   - `export const dynamic = "force-dynamic"` — Seite wird immer dynamisch gerendert (kein Caching).
   - **Server-Component** (async). Eingebundene Komponenten: `AuthForm` (Client), `Container`, `Eyebrow`, `Link`.
   - **Umgebungsvariablen (indirekt):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `ALLOW_SELF_REGISTRATION`.

---

## `/mitgliedschaft`

1. **Route / URL-Pfad:** `/mitgliedschaft` — Datei: `src/app/mitgliedschaft/page.tsx`
2. **Zweck:** Öffentliche Verkaufs-/Landingpage der Mitgliedschaft; stellt Angebot, Preise und die 7 Stufen vor und startet den Stripe-Checkout.
3. **Funktionen & Features:**
   - Mehrere `CheckoutButton`-Instanzen starten den **Stripe-Checkout** (Hero, Preisbereich, Final-CTA). Zwei Abo-Optionen: **Jahresabo** (`plan="jahr"`, hervorgehoben, „2 Monate gratis") und **Monatsabo** (`plan="monat"`).
   - Preisangaben stehen als Platzhalter-Objekt `PLANS` direkt im Code (Monat `49 €`, Jahr `490 €`) — laut Kommentar vor dem Livegang durch das echte Modell zu ersetzen.
   - **Hinweisbanner (Fehlerbehandlung/Statusmeldungen)** oben auf der Seite, gesteuert über Query-Parameter:
     - `?zugang=abo` → Info: aktive Mitgliedschaft nötig.
     - `?checkout=abgebrochen` → Info: Checkout abgebrochen (von der Stripe-`cancel_url`).
     - `?checkout=fehler` → Warnung: beim Checkout ist etwas schiefgelaufen.
   - Weitere Inhalte: Problem-Abschnitt, die 7 Stufen (`stages`), Feature-Liste, 3-Schritte-Ablauf, Testimonials, Preisbox, FAQ (`faqs`), Final-CTA. Verlinkt außerdem den kostenlosen `/bewusstseinstest`.
4. **Datenquellen & Ablauf:**
   - `searchParams` (`Promise`) liefert `zugang` und `checkout`; daraus wird das anzuzeigende `notice` bestimmt.
   - Inhaltsdaten aus lib-Modulen: `stages`, `testimonials`, `faqs` aus `@/lib/content`; `practices` aus `@/lib/practices`; `deepDives` aus `@/lib/deep-dives` (Anzahl fließt in Feature-Texte ein).
   - Der Checkout-Start passiert nicht auf dieser Seite selbst, sondern per Formular-`POST` der `CheckoutButton` an `/api/checkout` (Server-Route, siehe Ablauf oben).
5. **Konfiguriert:**
   - **SEO-Metadaten:** `title: "Mitgliedschaft"`, ausführliche Beschreibung, `alternates.canonical: "/mitgliedschaft"` (indexierbar, öffentliche Seite).
   - **Server-Component** (async). Eingebundene Komponenten: `CheckoutButton` (Server-Komponente mit Formular), `Card`, `Container`, `Button`, `Eyebrow`, `Icon` (ArrowRight/Check/Star), `Image` (Hero-Bild `public/mitgliedschaft-hero.webp`).
   - **Umgebungsvariablen (indirekt über `/api/checkout`):** `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`, optional `STRIPE_PRICE_ID_YEARLY`.
   - Verlaufs-/Design-Konstanten aus `@/lib/gradients` (`HERO_GLOW`).

---

## `/mitgliedschaft/willkommen`

1. **Route / URL-Pfad:** `/mitgliedschaft/willkommen` — Datei: `src/app/mitgliedschaft/willkommen/page.tsx`
2. **Zweck:** Bestätigungs-/Erfolgsseite nach erfolgreicher Stripe-Zahlung („Zahlung erfolgreich"); leitet den neuen Nutzer durch die Zugangs-Einrichtung.
3. **Funktionen & Features:**
   - Reine Informations-/Onboarding-Seite mit drei Schritten: E-Mail-Postfach prüfen, Passwort über den Mail-Link setzen & einloggen, bei der ersten Stufe beginnen.
   - Call-to-Action-Button „Zum Login" (`/login`).
   - Hinweis für den Fall, dass keine Mail ankam (Spam prüfen / Kontakt aufnehmen).
   - Keine Formulare, keine Auth-Logik, keine Fehlerbehandlung. Die Ziel-URL enthält zwar `?session_id=…` (aus Stripe `success_url`), die Seite liest diesen Parameter jedoch **nicht** aus.
4. **Datenquellen & Ablauf:**
   - Keine externen Datenquellen; die Schrittinhalte stehen als statisches Array im Modul.
   - Wird über die Stripe-`success_url` in `/api/checkout` angesteuert. Die eigentliche Freischaltung erfolgt asynchron durch den Stripe-Webhook (nicht auf dieser Seite).
5. **Konfiguriert:**
   - **SEO-Metadaten:** `title: "Willkommen"`, Beschreibung „Deine Mitgliedschaft ist aktiv.", `robots: { index: false, follow: false }` (nicht indexierbar).
   - **Server-Component** (synchron, kein `async`, keine `searchParams`-Nutzung). Eingebundene Komponenten: `PageHero`, `Container`, `Button`, `Reveal`, `Icon` (ArrowRight/Check).
   - Keine eigenen Umgebungsvariablen.

---

## `/auth/callback`

1. **Route / URL-Pfad:** `/auth/callback` — Datei: `src/app/auth/callback/route.ts` (Route-Handler, keine Seite)
2. **Zweck:** Verarbeitet den Link aus der Bestätigungs-/Passwort-E-Mail von Supabase, setzt die Session und leitet weiter.
3. **Funktionen & Features:**
   - Nur ein **`GET`-Handler**. Liest `code` und `next` aus der Query.
   - Tauscht den `code` über Supabase gegen eine gültige Session (`exchangeCodeForSession`).
   - **Sicherheit:** `next` wird über `safeInternalPath` gefiltert (nur interne Pfade, schützt vor Open-Redirect-Phishing; Fallback `/mitglieder`).
   - **Fehlerbehandlung:** Fehlt der Code, ist Supabase nicht konfiguriert oder schlägt der Tausch fehl, erfolgt Redirect auf `/login?error=bestaetigung`.
4. **Datenquellen & Ablauf:**
   - Bei Erfolg: `NextResponse.redirect` auf `${origin}${next}` (Standardziel `/mitglieder`).
   - Bei Misserfolg: `NextResponse.redirect` auf `${origin}/login?error=bestaetigung`.
   - Nutzt den Supabase-**Server-Client** (`@/lib/supabase/server` → `createClient`), `isSupabaseConfigured` und `safeInternalPath`. `origin` stammt aus der Request-URL.
5. **Konfiguriert:**
   - Kein `metadata` (Route-Handler, keine gerenderte Seite). Läuft serverseitig.
   - **Umgebungsvariablen (indirekt):** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`.
   - Wird als `emailRedirectTo`-Ziel von `signUp` und vom Stripe-/Supabase-Onboarding genutzt.

---

## Unterstützende Module

Kurzüberblick der beteiligten Bausteine (nur soweit für den Fluss relevant):

- **`src/app/auth/actions.ts`** — Server-Actions (`"use server"`):
  - `signIn`: Passwort-Login (`signInWithPassword`); übersetzt „Invalid login credentials" in eine deutsche Meldung; leitet nach Erfolg auf das per `safeInternalPath` geprüfte Ziel.
  - `signUp`: nur bei `ALLOW_SELF_REGISTRATION`; validiert Name und Mindest-Passwortlänge (8), setzt `emailRedirectTo` auf `/auth/callback`, gibt bei aktiver E-Mail-Bestätigung eine Hinweismeldung zurück, sonst Redirect auf `/mitglieder`.
  - `signOut`: meldet ab und leitet auf `/login`.
- **`src/components/auth/AuthForm.tsx`** — Client-Komponente (`"use client"`). Umschalter Login/Registrieren (nur bei `allowRegister`), nutzt `useActionState` für `signIn`/`signUp`, zeigt Fehler (`state.error`, `role="alert"`) und Erfolgsmeldungen (`state.message`) an. Verstecktes Feld `redirect` transportiert das Login-Ziel.
- **`src/components/membership/CheckoutButton.tsx`** — Server-Komponente. Echtes `<form action="/api/checkout" method="POST">` mit verstecktem `plan`-Feld; funktioniert ohne Client-JavaScript.
- **`src/app/api/checkout/route.ts`** — `POST` startet die Stripe-Subscription-Session (Fallback aufs Kontaktformular bei fehlender Stripe-Konfiguration; optionale Verknüpfung mit angemeldetem Nutzer); `GET` leitet zurück auf `/mitgliedschaft`. Basis-URL in Produktion aus `site.ts` (nicht aus manipulierbarem `x-forwarded-host`).
- **`src/lib/stripe.ts`** — Stripe-Konfiguration (nur serverseitig). Env-Variablen: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` (Monat), `STRIPE_PRICE_ID_YEARLY` (Jahr, optional), `STRIPE_BOOK_PRICE_ID`/`_PRINT` (Buch), `STRIPE_WEBHOOK_SECRET`. Hilfsfunktionen `getStripe()`, `priceIdForPlan()`; `ACTIVE_MEMBERSHIP_STATES = { active, trialing }`. Der Secret-Key darf nie `NEXT_PUBLIC_` sein.
- **`src/lib/membership.ts`** — liest den Mitgliedschafts-Status pro E-Mail aus der Tabelle `memberships` (über den Admin/Service-Role-Client, nur serverseitig). `isActiveMember()` prüft gegen `ACTIVE_MEMBERSHIP_STATES`.
- **`src/lib/supabase/*`**:
  - `config.ts`: Env-Variablen und Schalter `isSupabaseConfigured`, `REQUIRE_MEMBER_LOGIN` (true), `ALLOW_SELF_REGISTRATION` (Standard false), `REQUIRE_ACTIVE_MEMBERSHIP` (Standard false; Admins über `ADMIN_EMAILS`).
  - `server.ts`: Supabase-Client für Server-Komponenten/Actions/Route-Handler (Cookie-basiert, `@supabase/ssr`).
  - `client.ts`: Browser-Client für Client-Komponenten.
  - `admin.ts`: Service-Role-Client (umgeht Row-Level-Security), nur serverseitig, `SUPABASE_SERVICE_ROLE_KEY`; gibt `null` zurück, wenn nicht konfiguriert.
- **`src/lib/safe-redirect.ts`** — `safeInternalPath()` lässt nur seiteninterne Pfade zu (lehnt absolute URLs, `//host` und `/\host` ab); Schutz vor Open-Redirect-Phishing.

_Stand: 2026-09-11 — automatisch dokumentiert_


---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/03-mitgliederbereich.md -->
<!-- ============================================================ -->

# Mitgliederbereich (/mitglieder)

Diese Dokumentation beschreibt den kompletten geschützten Mitgliederbereich (`/mitglieder/*`) des Projekts „werde meister deiner gedanken" (Next.js 16, App Router, React 19). Alle Angaben stammen aus dem tatsächlichen Quellcode.

Der Mitgliederbereich ist der umfangreichste Teil der Website: das persönliche Cockpit für die Reise durch die 7 Stufen, samt Lern-Lektionen, Praxis- und Wissens-Bibliotheken, einem KI-Begleiter, einem Manipulations-Detektor, einem Gedankenprofil mit KI-Reading, einem geführten 21-Tage-Programm, einer täglichen Rückkehr-Praxis und einem wachsenden Journal.

Zwei durchgehende Grundprinzipien:

- **Lauffähig ohne Konfiguration.** Ohne Supabase-Variablen bleibt der Bereich erreichbar; Fortschritt/Personalisierung bleiben dann leer, statt Fehler zu werfen. Ohne `ANTHROPIC_API_KEY` blenden sich alle KI-Werkzeuge (Begleiter, Detektor, Reading, Muster-Spiegel) still aus.
- **Defense-in-Depth beim Zugriffsschutz.** Der eigentliche Login-Schutz liegt zentral im Proxy (`src/proxy.ts`, in Next.js 16 heißt „Middleware" jetzt „Proxy"). Zusätzlich prüft jede Seite/Route den Login noch einmal selbst — falls der Proxy-Matcher einmal nicht greift, bleiben die Inhalte trotzdem geschützt.

## Übersicht

- [Zugriffsschutz (gemeinsam)](#zugriffsschutz-gemeinsam) — Proxy, Layout, Download-Guard, Supabase, Datenmodell
- [`/mitglieder`](#mitglieder) — Dashboard / Cockpit
- [`/mitglieder/stufe/[nr]`](#mitgliederstufenr) — Stufen-Detailseite (Lektion, Übungen, Reflexion)
- [`/mitglieder/stufe/[nr]/lektion`](#mitgliederstufenrlektion) — PDF-Download: komplette Lektion
- [`/mitglieder/stufe/[nr]/uebungen`](#mitgliederstufenruebungen) — PDF-Download: Übungs-Arbeitsblatt
- [`/mitglieder/praxis`](#mitgliederpraxis) — Praxis-Bibliothek (Übersicht)
- [`/mitglieder/praxis/[slug]`](#mitgliederpraxisslug) — Praxis-Detailseite
- [`/mitglieder/wissen`](#mitgliederwissen) — Vertiefungen (Übersicht)
- [`/mitglieder/wissen/[slug]`](#mitgliederwissenslug) — Vertiefungs-Detailseite
- [`/mitglieder/wissen/[slug]/lektion`](#mitgliederwissensluglektion) — PDF-Download: Vertiefung
- [`/mitglieder/wissensdatenbank`](#mitgliederwissensdatenbank) — Wissensdatenbank (27 Kapitel, Übersicht)
- [`/mitglieder/wissensdatenbank/[slug]`](#mitgliederwissensdatenbankslug) — Kapitel-/Glossar-Detailseite
- [`/mitglieder/journal`](#mitgliederjournal) — Mein Journal + Standortbestimmung + Muster-Spiegel
- [`/mitglieder/detektor`](#mitgliederdetektor) — Manipulations-Detektor (KI)
- [`/mitglieder/begleiter`](#mitgliederbegleiter) — KI-Begleiter (Chat)
- [`/mitglieder/begleiter/antwort`](#mitgliederbegleiterantwort) — Route-Handler: gestreamte KI-Antwort
- [`/mitglieder/gedankenprofil`](#mitgliedergedankenprofil) — Gedankenprofil + KI-Reading
- [`/mitglieder/einstellungen`](#mitgliedereinstellungen) — Name, Impulse, Passwort, Konto
- [`/mitglieder/programm`](#mitgliederprogramm) — 21 Tage Autopilot-Ausstieg
- [`/mitglieder/rueckkehr`](#mitgliederrueckkehr) — Die tägliche Rückkehr
- [`/mitglieder/arbeitsheft`](#mitgliederarbeitsheft) — PDF-Download: Gesamt-Arbeitsheft

---

## Zugriffsschutz (gemeinsam)

Der gesamte Bereich ist mehrschichtig abgesichert. Keine einzelne Schicht ist allein verantwortlich.

### 1. Proxy (zentral) — `src/proxy.ts`

- In Next.js 16 ersetzt der „Proxy" die frühere `src/middleware.ts` (gleiche Funktion, neuer Name).
- Läuft laut `config.matcher` auf allen Seiten-Routen außer `api`, `_next/static`, `_next/image`, `favicon.ico`, `robots.txt`, `sitemap.xml`.
- `withAuth()` greift nur auf den Auth-Pfaden (`/mitglieder*`, `/admin*`, `/login`) und nur, wenn `REQUIRE_MEMBER_LOGIN` an ist und Supabase konfiguriert ist. Es refresht die Session und leitet nicht angemeldete Besucher von `/mitglieder…` auf `/login?redirect=<pfad>`. `/admin` bekommt eine zweite Schicht (kein Login → Login; kein Admin → zurück nach `/mitglieder`). Bereits eingeloggte Nutzer auf `/login` werden direkt ins Dashboard geschickt.
- Zusätzlich (unabhängig vom Login): Kanonischer-Host-Redirect (Apex/Test-Domain → `www`, 301, abschaltbar über `ENFORCE_CANONICAL_HOST=false`) und `X-Robots-Tag: noindex, nofollow` für alle nicht-kanonischen Hosts (z. B. Vercel-Previews).

### 2. Layout (zweite Schicht für Seiten) — `src/app/mitglieder/layout.tsx`

- Server-Komponente, umschließt **alle** Seiten unter `/mitglieder` (aber **nicht** die `route.ts`-Downloads).
- Wenn `isSupabaseConfigured && REQUIRE_MEMBER_LOGIN`: liest `supabase.auth.getUser()`; ohne User → `redirect("/login?redirect=/mitglieder")`.
- **Optionale Bezahlschranke** (`REQUIRE_ACTIVE_MEMBERSHIP=true`): zusätzlich zum Login ist eine aktive Stripe-Mitgliedschaft nötig. Admins (`isAdminEmail`) kommen immer rein; Nicht-Zahler werden auf `/mitgliedschaft?zugang=abo` geleitet. Standard ist `false`, um bestehende Zugänge nicht zu brechen.
- Rendert die persistente `MemberNav` (Mein Bereich · Praxis · Journal · Wissen · Programm · Einstellungen) und — falls der Begleiter serverseitig eingerichtet ist — den schwebenden `BegleiterLauncher`.
- Zusätzlich prüft **jede einzelne Seite** den Login noch einmal in ihrer Server-Komponente und macht bei Bedarf einen seiten-spezifischen `redirect("/login?redirect=<eigener Pfad>")`.

### 3. Download-Guard (für Route-Handler) — `src/lib/members/download-guard.ts`

Route-Handler (`route.ts`) werden von **keinem** Layout umschlossen; deshalb greift dort weder der Layout-Login-Check noch die Bezahlschranke. `guardMemberDownload(request)` bildet dieselbe Logik ab und wird von jeder Download-Route als erstes aufgerufen:

- Ohne Supabase / bei ausgeschaltetem Login-Schutz → `null` (kein Schutz erzwingbar, altes Verhalten).
- Kein User → `303`-Redirect auf `/login?redirect=<pfad+query>`.
- Bezahlschranke aktiv und weder Admin noch aktives Mitglied → `303` auf `/mitgliedschaft?zugang=abo`.
- Sonst `null` (Zugriff erlaubt). Betroffen: `stufe/[nr]/lektion`, `stufe/[nr]/uebungen`, `wissen/[slug]/lektion`, `arbeitsheft`.

**Wichtig zum PDF-Speicherort:** Die gestalteten PDFs liegen bewusst unter `content/pdf/` und **nicht** unter `public/`. Alles unter `public/` würde Next.js direkt unter seinem Dateipfad ausliefern — am Proxy vorbei — und der Login-Schutz wäre wirkungslos. `src/lib/pdf/static-pdf.ts` liest die Dateien (mit In-Memory-Cache) und liefert `null`, wenn eine Datei fehlt (Route antwortet dann 404). Der Ordner muss im Dockerfile ins Laufzeit-Image kopiert werden.

### 4. Supabase-Clients & Konfiguration

- `src/lib/supabase/config.ts`: `SUPABASE_URL`/`SUPABASE_ANON_KEY` aus `NEXT_PUBLIC_SUPABASE_URL`/`NEXT_PUBLIC_SUPABASE_ANON_KEY`; `isSupabaseConfigured`; Schalter `REQUIRE_MEMBER_LOGIN = true` (fest), `ALLOW_SELF_REGISTRATION` (Env), `REQUIRE_ACTIVE_MEMBERSHIP` (Env).
- `src/lib/supabase/server.ts`: `createClient()` — Cookie-basierter SSR-Client für Server-Komponenten, Server-Actions und Route-Handler.
- `src/lib/supabase/admin.ts`: `createAdminClient()` — Service-Role-Key (`SUPABASE_SERVICE_ROLE_KEY`, **nicht** `NEXT_PUBLIC_*`), umgeht RLS, nur serverseitig; gibt `null` zurück, wenn Variablen fehlen.
- `src/lib/admin.ts`: `ADMIN_EMAILS` (Env, kommagetrennt; Fallback zwei Standard-Adressen), `isAdminEmail()`.
- `src/lib/membership.ts`: `getMembership()`/`isActiveMember()` lesen die Tabelle `memberships` (über den Admin-Client), Status-Prüfung gegen `ACTIVE_MEMBERSHIP_STATES` aus `src/lib/stripe.ts`. Die `memberships`-Tabelle wird vom Stripe-Webhook gepflegt.

### 5. Datenmodell (Supabase-Tabellen)

Alle Schreibvorgänge sind zusätzlich per Row-Level-Security abgesichert (Autorisierung passiert in der Datenbank; die Checks im Code sind die UX-Ebene). Verwendete Tabellen:

| Tabelle | Zweck | Migration (laut Code-Kommentar) |
|---|---|---|
| `profiles` | `full_name`, `start_stage`, `test_scores`, `newsletter_opt_in`, `newsletter_opted_in_at` | 0002 / 0004 |
| `progress` | Fortschritt; `item_type` ∈ `stage`/`programm`/`wissenskapitel`, `item_key`, `status` (`in_progress`/`completed`), `completed_at` | 0002 / 0011 / 0014 |
| `notes` | Journal-Notizen zu Reflexionsfragen; `item_type`, `item_key`, `ref`, `body`, `updated_at` | 0002 |
| `test_results` | Verlauf der Bewusstseinstests (`top_stage`, `taken_at`) für die Wachstumskurve | 0006 |
| `rueckkehr` | Tägliche Rückkehr; `datum` (Kalendertag) | 0012 |
| `begleiter_messages` | Chatverlauf des KI-Begleiters; `role`, `body`, `model`, `created_at` | 0009 |
| `gedanken_readings` | Gespeicherte KI-Readings zum Gedankenprofil | 0008 |
| `muster_spiegel` | Gespeicherte KI-Muster-Spiegel zum Journal | 0010 |
| `memberships` | Stripe-Mitgliedschaftsstatus pro E-Mail | (Stripe-Webhook) |

Fehlt eine Migration, verhalten sich die Leseabfragen defensiv (leeres Ergebnis) und das jeweilige Feature blendet sich aus, statt zu brechen.

### 6. KI-Anbindung (Anthropic)

- `src/lib/ki-modell.ts`: Hauptmodell `KI_MODELL = "claude-opus-5"`, Ersatzmodell `KI_MODELL_ERSATZ = "claude-opus-4-8"`. `istKapazitaetsfehler()` erkennt 429 + alle 5xx (inkl. 529 „Overloaded"). `mitErsatzmodell()` führt einen Aufruf mit Opus 5 aus und wiederholt ihn bei Kapazitätsfehlern **einmalig** mit Opus 4.8 (fachliche Fehler wie 401/403/400 werden nicht wiederholt).
- Alle KI-Aufrufe brauchen `ANTHROPIC_API_KEY` (nicht `NEXT_PUBLIC_*`) und passieren **ausschließlich auf Klick** — nichts läuft im Hintergrund.
- Genutzt über `@anthropic-ai/sdk` mit `max_tokens: 8000` und `output_config: { effort: "low" }` (Thinking ist bei Opus standardmäßig an, der große Puffer verhindert Abbruch mitten im Satz).

---

## `/mitglieder`

1. **Route / URL-Pfad:** `/mitglieder` — Datei: `src/app/mitglieder/page.tsx` (Actions: `src/app/mitglieder/actions.ts`)
2. **Zweck:** Persönliches Dashboard/Cockpit: begrüßt mit Vornamen, zeigt Fortschritt durch die 7 Stufen, den nächsten Schritt und einen Werkzeugkasten.
3. **Funktionen & Features:**
   - **Personalisierte Begrüßung** (nur Vorname, sauber großgeschrieben; kein Raten aus der E-Mail).
   - **Mini-Fortschritt** im Kopf (abgeschlossene Stufen / 7, Prozent).
   - **Momentum-Reihe** (`MomentumRow`): Serie/Rhythmus aus `rueckkehr`, Programm-Fortschritt (`x/21`), „zuletzt aktiv" (jüngstes aus letzter Notiz und letzter Rückkehr).
   - **Willkommensvideo** (Facade-Muster über `VideoEmbed`; Fallback `site.placeholderVideoId`).
   - **„Hier weitermachen"** — der eine dominante Anker: die erste noch offene Stufe (frühestens die per Bewusstseinstest ermittelte `start_stage`), mit passender Praxis; bei „alles erledigt" ein Abschluss-Zustand.
   - **Chronologischer Stepper** über alle 7 Stufen mit Status-Badges (Erledigt / Du bist hier / Begonnen / Als Nächstes). Sanfte Führung, **keine Sperre** — alle Stufen sind frei zugänglich.
   - **Newsletter-Toggle** (`NewsletterToggle`) für wöchentliche E-Mail-Impulse.
   - **Werkzeugkasten** mit Links zu Journal, Begleiter, Gedankenprofil, Detektor, Programm, Rückkehr, Wissensdatenbank, Gesamt-Arbeitsheft-PDF und (nur Admin) Marketing-Cockpit.
   - Kuratierte **Vertiefungen** und **Praxis** passend zur aktuellen Stufe (jeweils max. 3).
4. **Zugriffsschutz:** Proxy + Layout; zusätzlich eigener Check in der Seite: bei `REQUIRE_MEMBER_LOGIN && !user` → `redirect("/login?redirect=/mitglieder")`.
5. **Datenquellen & Ablauf:** Supabase (`profiles`, `progress` mit `item_type` `stage`/`programm`, `rueckkehr`, `notes`). Stufen aus `@/lib/content` (`stages`), Vertiefungen aus `@/lib/deep-dives` (`deepDivesForStage`), Praxis aus `@/lib/practices` (`practicesForStage`), `PROGRAMM_TAGE_GESAMT` aus `@/lib/programm`. Verfügbarkeit von Begleiter (`isBegleiterConfigured`) und Detektor (`isDetektorConfigured`) wird geprüft. Keine `generateStaticParams`.
6. **Konfiguriert:** Server-Component, `export const dynamic = "force-dynamic"`. `metadata.robots = { index: false, follow: false }`. Braucht Supabase-Env; KI-Links erscheinen nur mit `ANTHROPIC_API_KEY`.

---

## `/mitglieder/stufe/[nr]`

1. **Route / URL-Pfad:** `/mitglieder/stufe/1` … `/7` — Datei: `src/app/mitglieder/stufe/[nr]/page.tsx`
2. **Zweck:** Detailseite einer der 7 Stufen: Kerngedanke, Video, Lektion, Übungen, passende Praxis, Reflexion (beschreibbar), Verankerung, Vertiefungen.
3. **Funktionen & Features:**
   - **Fortschritts-Toggle** „Stufe abschließen" (`StageCompleteToggle`, Client) — Seite selbst bleibt statisch, Status wird per Server-Action nachgeholt/getoggelt.
   - **Video** zur Stufe (`VideoEmbed`, Fallback `site.placeholderVideoId`), Lektion in Abschnitten, nummerierte Übungen.
   - **Zwei PDF-Downloads:** komplette Lektion und Übungsblatt (Links auf die `route.ts`-Handler).
   - **Reflexionsblock** (`JournalReflection`, `itemType="stage"`) mit Autosave → speichert in `notes` und markiert die Stufe automatisch als „begonnen" (`in_progress`).
   - Querverweise: passende Praxis, passende Vertiefungen, Vor/Zurück-Navigation, Kontakt-CTA.
4. **Zugriffsschutz:** Proxy + Layout (kein eigener Login-`redirect` in dieser Seite; ungültige Nummer → `notFound()`).
5. **Datenquellen & Ablauf:** `stages` (`@/lib/content`), `getStageLesson` (`@/lib/stage-lessons`), `deepDivesForStage`, `practicesForStage`. `generateStaticParams()` erzeugt `nr` = 1…7. `generateMetadata()` setzt Titel „Stufe N – Titel" + `noindex`. Fortschritt/Notizen über Server-Actions aus `actions.ts` (Supabase `progress`/`notes`).
6. **Konfiguriert:** Server-Component; statisch vorgerendert (keine `dynamic`-Angabe), interaktive Teile sind Client-Inseln. `noindex`.

## `/mitglieder/stufe/[nr]/lektion`

1. **Route / URL-Pfad:** `/mitglieder/stufe/[nr]/lektion` — Datei: `src/app/mitglieder/stufe/[nr]/lektion/route.ts`
2. **Zweck:** Geschützter PDF-Download der kompletten Lektion einer Stufe.
3. **Funktionen & Features:** `GET`-Handler, liefert `content/pdf/stufe-<nr>-lektion.pdf` als Attachment (Dateiname `Lektion-Stufe-<nr>-<slug>.pdf`).
4. **Zugriffsschutz:** `guardMemberDownload(request)` als erster Schritt (Login/Bezahlschranke). Ungültige `nr` oder fehlendes PDF → 404.
5. **Datenquellen & Ablauf:** `stages`, `worksheetSlug` (`@/lib/pdf/slug`), `getStaticPdf` (`@/lib/pdf/static-pdf`, liest aus `content/pdf/`).
6. **Konfiguriert:** Route-Handler, `export const dynamic = "force-dynamic"` (session-abhängig, nicht statisch). Header: `Content-Type: application/pdf`, `Content-Disposition: attachment`, `Cache-Control: public, max-age=0, must-revalidate`.

## `/mitglieder/stufe/[nr]/uebungen`

1. **Route / URL-Pfad:** `/mitglieder/stufe/[nr]/uebungen` — Datei: `src/app/mitglieder/stufe/[nr]/uebungen/route.ts`
2. **Zweck:** Geschützter PDF-Download des Übungs-Arbeitsblatts (mit Ausfüll-Linien) einer Stufe.
3. **Funktionen & Features:** `GET`-Handler, liefert `content/pdf/stufe-<nr>-uebungen.pdf` (Dateiname `Uebungen-Stufe-<nr>-<slug>.pdf`).
4. **Zugriffsschutz:** `guardMemberDownload(request)`; ungültige `nr`/fehlendes PDF → 404.
5. **Datenquellen & Ablauf:** identisch zur Lektion-Route (`stages`, `worksheetSlug`, `getStaticPdf`).
6. **Konfiguriert:** Route-Handler, `dynamic = "force-dynamic"`, gleiche PDF-Header.

---

## `/mitglieder/praxis`

1. **Route / URL-Pfad:** `/mitglieder/praxis` — Datei: `src/app/mitglieder/praxis/page.tsx`
2. **Zweck:** Übersicht aller Praxisübungen (Meditationen, Atemübungen, Rituale), nach Kategorie gruppiert.
3. **Funktionen & Features:** Karten-Grid je Kategorie mit Thumbnail, Titel, Dauer, Teaser; Link „Zu meinem Bereich".
4. **Zugriffsschutz:** Proxy + Layout (kein eigener Check).
5. **Datenquellen & Ablauf:** `practicesByCategory()` aus `@/lib/practices`. Keine dynamischen Params.
6. **Konfiguriert:** Server-Component, statisch; `noindex`. Titel „Praxis".

## `/mitglieder/praxis/[slug]`

1. **Route / URL-Pfad:** `/mitglieder/praxis/<slug>` — Datei: `src/app/mitglieder/praxis/[slug]/page.tsx`
2. **Zweck:** Detailseite einer geführten Praxis: Wofür/Wann, Einführung, Audio/Video, Schritt-für-Schritt-Anleitung, Tipp, Reflexion.
3. **Funktionen & Features:**
   - **Audio-Player** (`<audio controls preload="none">`), falls `practice.audio` gesetzt; sonst **Video** (`VideoEmbed`, Fallback `site.placeholderVideoId`); sonst Platzhalter.
   - Nummerierte Anleitung, optionaler Tipp.
   - **Reflexionsblock** „Nachklang" (`JournalReflection`, `itemType="practice"`) mit Autosave — nutzt eigene Fragen der Praxis oder `DEFAULT_PRACTICE_REFLECTION`.
   - Querverweis zur zugehörigen Stufe.
4. **Zugriffsschutz:** Proxy + Layout; unbekannter Slug → `notFound()`.
5. **Datenquellen & Ablauf:** `practices`, `getPractice`, `practiceReflection` (`@/lib/practices`); `stages` für den Querverweis. `generateStaticParams()` über alle Praxis-Slugs; `generateMetadata()` (Titel + `noindex`). Notizen über Server-Actions (`notes`).
6. **Konfiguriert:** Server-Component, statisch; `noindex`.

---

## `/mitglieder/wissen`

1. **Route / URL-Pfad:** `/mitglieder/wissen` — Datei: `src/app/mitglieder/wissen/page.tsx`
2. **Zweck:** Übersicht der **Vertiefungen** — die psychologischen Mechanismen hinter den 7 Stufen (zum Anwenden & Üben, an die Stufe gekoppelt).
3. **Funktionen & Features:** Karten-Grid nach Kategorie mit Thumbnail, „Stufe X"-Label, Titel, Teaser; Querverweis-Karte zur reinen Nachschlage-Wissensdatenbank; „Thema vorschlagen"-CTA. `MemberNav`-Eintrag „Wissen" ist auf diesem gesamten Pfad-Präfix aktiv.
4. **Zugriffsschutz:** Proxy + Layout.
5. **Datenquellen & Ablauf:** `deepDivesByCategory()` (`@/lib/deep-dives`), `stages` für die Labels. Keine dynamischen Params.
6. **Konfiguriert:** Server-Component, statisch; `noindex` (mit `description` + OG). Titel „Vertiefungen – die Mechanismen hinter den 7 Stufen".

## `/mitglieder/wissen/[slug]`

1. **Route / URL-Pfad:** `/mitglieder/wissen/<slug>` — Datei: `src/app/mitglieder/wissen/[slug]/page.tsx`
2. **Zweck:** Detailseite einer Vertiefung: Kerngedanke, Video, Lektion in Abschnitten, Übungen, Reflexion, Kernbotschaft, wissenschaftlicher Hintergrund, Querverweise.
3. **Funktionen & Features:**
   - Video (`VideoEmbed`), Übungen, **PDF-Download** „Diese Vertiefung als PDF" — **nur** wenn `hasStaticPdf("vertiefung-<slug>")` (der Knopf erscheint nicht, wenn das gestaltete PDF fehlt, um 404 zu vermeiden).
   - **Reflexionsblock** (`JournalReflection`, `itemType="deep_dive"`) mit Autosave.
   - **Wissenschaftlicher Hintergrund**: reale Studien mit ehrlicher Einordnung (`sources`), inkl. Warnhinweis-Note.
   - Querverweis zur Stufe und **Themen-Brücke** zum passenden Wissensdatenbank-Kapitel (`kapitelZuVertiefung`).
4. **Zugriffsschutz:** Proxy + Layout; unbekannter Slug → `notFound()`.
5. **Datenquellen & Ablauf:** `deepDives`, `getDeepDive` (`@/lib/deep-dives`), `kapitelZuVertiefung` (`@/lib/library-links`), `stages`, `hasStaticPdf`. `generateStaticParams()` über alle Deep-Dive-Slugs; `generateMetadata()` (Titel + `noindex`).
6. **Konfiguriert:** Server-Component, statisch; `noindex`.

## `/mitglieder/wissen/[slug]/lektion`

1. **Route / URL-Pfad:** `/mitglieder/wissen/[slug]/lektion` — Datei: `src/app/mitglieder/wissen/[slug]/lektion/route.ts`
2. **Zweck:** Geschützter PDF-Download einer Vertiefung.
3. **Funktionen & Features:** `GET`-Handler, liefert `content/pdf/vertiefung-<slug>.pdf` (Dateiname `Vertiefung-<slug>.pdf`).
4. **Zugriffsschutz:** `guardMemberDownload(request)`; unbekannter Slug/fehlendes PDF → 404.
5. **Datenquellen & Ablauf:** `getDeepDive`, `worksheetSlug`, `getStaticPdf`.
6. **Konfiguriert:** Route-Handler, `dynamic = "force-dynamic"`, PDF-Header wie oben.

---

## `/mitglieder/wissensdatenbank`

1. **Route / URL-Pfad:** `/mitglieder/wissensdatenbank` — Datei: `src/app/mitglieder/wissensdatenbank/page.tsx` (Actions: `src/app/mitglieder/wissenskapitel-actions.ts`)
2. **Zweck:** Nachschlage-Bibliothek „Gehirn, Bewusstsein & Gedanken" — 27 Kapitel, wissenschaftlich fundiert, in 5 Teile gegliedert.
3. **Funktionen & Features:**
   - Kapitel-Karten je Teil (`PARTS`) mit Nummer, Titel, Lead; **„Gelesen"-Badge** pro Kapitel.
   - **Persönlicher Lese-Fortschritt** (Balken „x/27 gelesen · %"), erscheint ab dem ersten gelesenen Kapitel.
   - Evidenz-Legende (✅ / ⚠️ / 🔬) mit Link zum Glossar; Querverweis-Karte zu den Vertiefungen.
4. **Zugriffsschutz:** Proxy + Layout.
5. **Datenquellen & Ablauf:** `chapters()`, `PARTS`, `ChapterMeta` (`@/lib/wissensdatenbank`, liest Kapitel serverseitig via `node:fs`). Lese-Status aus `progress` (`item_type="wissenskapitel"`) über `getGeleseneKapitel()` (defensiv: leer, wenn Migration 0014 fehlt).
6. **Konfiguriert:** Server-Component, `dynamic = "force-dynamic"` (personalisierter Fortschritt); `noindex` (mit `description`). Titel „Wissensdatenbank – Gehirn, Bewusstsein & Gedanken".

## `/mitglieder/wissensdatenbank/[slug]`

1. **Route / URL-Pfad:** `/mitglieder/wissensdatenbank/<slug>` (inkl. Sonderseite `glossar`) — Datei: `src/app/mitglieder/wissensdatenbank/[slug]/page.tsx`
2. **Zweck:** Einzelnes Wissensdatenbank-Kapitel bzw. das Glossar als gerenderter Fließtext.
3. **Funktionen & Features:**
   - Gerenderter Inhalt über `MarkdownDoc` (Blöcke aus dem Doc).
   - **„Als gelesen markieren"-Toggle** (`KapitelGelesenToggle`, Client) — nur für nummerierte Kapitel, nicht fürs Glossar; optimistischer Zustand wird bei Speicherfehler (z. B. fehlende Migration 0014) sauber zurückgenommen.
   - Vor/Zurück zwischen Kapiteln; **Themen-Brücke** zur passenden Vertiefung (`vertiefungZuKapitel`); Mitglieder-CTA „Vom Wissen zur Praxis".
4. **Zugriffsschutz:** Proxy + Layout; unbekannter Slug → `notFound()`.
5. **Datenquellen & Ablauf:** `getDoc`, `chapterSlugs` (`@/lib/wissensdatenbank`), `vertiefungZuKapitel` (`@/lib/library-links`). Lese-Status via `wissenskapitel-actions` (`progress`). `generateStaticParams()` erzeugt alle Kapitel-Slugs **plus** `glossar`; `generateMetadata()` (Titel + `description` + OG + `noindex`).
6. **Konfiguriert:** Server-Component; Seite selbst statisch vorgerendert, Lese-Toggle als Client-Insel. `noindex`.

---

## `/mitglieder/journal`

1. **Route / URL-Pfad:** `/mitglieder/journal` — Datei: `src/app/mitglieder/journal/page.tsx`
2. **Zweck:** Zentraler Sammelort aller Reflexionen; dazu eine regelbasierte Standortbestimmung, optional ein KI-Muster-Spiegel und eine Wachstumskurve aus den Bewusstseinstests.
3. **Funktionen & Features:**
   - **Cockpit-Statistiken:** Anzahl Reflexionen, abgeschlossene Stufen (`x/7`), Startstufe (aus Test), zuletzt geschrieben.
   - **Standortbestimmung** (`buildStandort`, regelbasiert aus den eigenen Daten — keine Vorhersage), mit „nächster Schritt"-Link.
   - **Muster-Spiegel** (`MusterSpiegelPanel`) — optionale KI-Vertiefung, nur wenn konfiguriert **und** Reflexionen vorhanden; wird nur auf Klick erzeugt (siehe muster-actions).
   - **Wachstumskurve** (`TestCurve`) der Schwerpunkt-Stufe über die Zeit (ab ≥1 Testergebnis).
   - **Chronologische Liste** aller nicht-leeren Reflexionen mit Herkunft (Stufe/Vertiefung/Praxis), Frage und Text; **Druck-Button** (`PrintButton`, druckoptimiertes Layout).
4. **Zugriffsschutz:** Proxy + Layout; zusätzlich eigener Check: `redirect("/login?redirect=/mitglieder/journal")`.
5. **Datenquellen & Ablauf:** Server-Actions aus `actions.ts` — `getJournalEntries` (`notes`), `getCompletedStages` (`progress`), `getStartStage` (`profiles`), `getTestHistory` (`test_results`). `resolveEntry`/`formatDate` (`@/lib/journal`) lösen jede Notiz in Titel/Frage/Link auf. `buildStandort` (`@/lib/standortbestimmung`). Muster-Spiegel über `muster-actions` (`muster_spiegel`). Alles parallel via `Promise.all`.
6. **Konfiguriert:** Server-Component, `dynamic = "force-dynamic"`; `noindex`. Muster-Spiegel braucht `ANTHROPIC_API_KEY`.

---

## `/mitglieder/detektor`

1. **Route / URL-Pfad:** `/mitglieder/detektor` — Datei: `src/app/mitglieder/detektor/page.tsx` (Actions: `src/app/mitglieder/detektor-actions.ts`)
2. **Zweck:** Manipulations-Detektor: eingefügten Text (Werbung, Schlagzeile, Post) per KI gegen die 16 Techniken der „Mentalen Selbstverteidigung" prüfen und die wirkenden Hebel mit Zitat und nüchterner Erklärung zeigen.
3. **Funktionen & Features:**
   - **Textfeld** (40–5000 Zeichen) + Analyse-**auf-Klick** (`DetektorPanel`, Client → Server-Action `analyzeText`). Nichts läuft automatisch.
   - Ergebnis: einordnender Gesamtsatz + Liste der Funde (Technik-Titel, wörtliches Zitat, Erklärung, Link zur Vertiefung). Leere Fund-Liste ist ein gültiges Ergebnis.
   - Fehlerzustände: `not_configured`, `too_short`/`too_long`, `unauthenticated`, `error`. Ist der Key nicht gesetzt, zeigt die Seite einen Hinweis statt des Werkzeugs.
4. **Zugriffsschutz:** Proxy + Layout; zusätzlich eigener Check `redirect("/login?redirect=/mitglieder/detektor")`. Die Server-Action prüft erneut Login + Konfiguration.
5. **Datenquellen & Ablauf:** Taxonomie = `deepDives`, gefiltert auf Kategorie „Mentale Selbstverteidigung" (Single Source of Truth). Anthropic über `mitErsatzmodell`; strenger System-Prompt (nur Kürzel aus der Liste, echte Zitate, keine Wertung). Antwort ist reines JSON, das robust geparst wird; halluzinierte/unbekannte Kürzel und Duplikate werden verworfen.
6. **Konfiguriert:** Server-Component, `dynamic = "force-dynamic"`; `noindex`. Braucht `ANTHROPIC_API_KEY` + Supabase (Login).

---

## `/mitglieder/begleiter`

1. **Route / URL-Pfad:** `/mitglieder/begleiter` — Datei: `src/app/mitglieder/begleiter/page.tsx` (Actions: `src/app/mitglieder/begleiter/actions.ts`)
2. **Zweck:** KI-Begleiter-Chat, der die Inhalte des Angebots und den Stand der Person kennt.
3. **Funktionen & Features:**
   - **Chat** (`BegleiterChat`, Client) mit Willkommenstext und Einstiegsvorschlägen; Antworten kommen **gestreamt** vom Route-Handler.
   - Gespeicherter Verlauf wird beim Laden gezeigt (`getConversation`); Verlauf **löschen** möglich (`clearConversation`, RLS-geschützt).
   - Grenzen: Eingabe ≤ `MAX_INPUT_CHARS` (2000), Kontextfenster `HISTORY_LIMIT` (24), Tageslimit `DAILY_MESSAGE_LIMIT` (40, Admins ausgenommen).
   - Ist der Begleiter nicht eingerichtet: ruhiger „schläft noch"-Hinweis. Krisen-Hinweis (Telefonseelsorge) unter dem Gespräch.
   - Erscheint zusätzlich als schwebender `BegleiterLauncher` auf allen Mitglieder-Seiten.
4. **Zugriffsschutz:** Proxy + Layout; zusätzlich eigener Check `redirect("/login?redirect=/mitglieder/begleiter")`. `isBegleiterConfigured()` = `ANTHROPIC_API_KEY` **und** Supabase.
5. **Datenquellen & Ablauf:** Verlauf aus `begleiter_messages` (Supabase). Antwort-Erzeugung läuft nicht als Server-Action, sondern über den Streaming-Route-Handler (siehe unten).
6. **Konfiguriert:** Server-Component, `dynamic = "force-dynamic"`; `noindex`.

## `/mitglieder/begleiter/antwort`

1. **Route / URL-Pfad:** `/mitglieder/begleiter/antwort` (`POST`) — Datei: `src/app/mitglieder/begleiter/antwort/route.ts`
2. **Zweck:** Erzeugt die Antwort des Begleiters **gestreamt** (Wort für Wort), damit nicht zehn Sekunden vor einem Ladepunkt gewartet wird.
3. **Funktionen & Features:**
   - Prüft Eingabe (nicht leer, ≤ 2000 Zeichen) und **Tageslimit** (rollierende 24 h; zählt `role="user"` in `begleiter_messages`; Admins ausgenommen → 429 `rate_limited`).
   - Baut Kontext **bewusst aus der Datenbank** (letzte `HISTORY_LIMIT` Nachrichten), nicht aus dem Request — so kann niemand eine erfundene Vorgeschichte unterschieben.
   - Baut den System-Prompt aus Name, Gedankenprofil-Fakten, Journal-Fakten und dem echten Inhaltsverzeichnis (`buildSystemPrompt`, `contentCatalogue`, `profileFacts`, `journalFacts`).
   - Speichert die Frage **vor** dem KI-Aufruf; scheitert der Aufruf ohne ein einziges Wort, wird die gespeicherte Frage wieder gelöscht (kein verschmutzter Verlauf, kein verbrauchtes Limit).
   - Modell-Fallback **im Stream**: 529/5xx vor dem ersten Wort → Wechsel von `claude-opus-5` auf `claude-opus-4-8`; mitten im Text wird nicht neu angesetzt. Nur vollständige Antworten landen im Verlauf (inkl. tatsächlich benutztem Modell).
4. **Zugriffsschutz:** Liegt unter `/mitglieder` → vom Proxy geschützt; **zusätzlich** prüft der Handler selbst Login + Konfiguration (Route-Handler werden von keinem Layout umschlossen). Fehler als JSON (`not_configured` 503, `unauthenticated` 401, `empty`/`too_long` 400, `rate_limited` 429).
5. **Datenquellen & Ablauf:** Supabase (`begleiter_messages`, `profiles`), `getTestProfile`/`getCompletedStages`/`getJournalEntries` (`actions.ts`), `buildGedankenprofil` (`@/lib/gedankenprofil`), Prompt-Bausteine aus `@/lib/begleiter-prompt`, Konstanten aus `@/lib/begleiter`, Modelllogik aus `@/lib/ki-modell`. Anthropic-`messages.stream`.
6. **Konfiguriert:** Route-Handler, `dynamic = "force-dynamic"`, `maxDuration = 60`. Antwort-Header: `Content-Type: text/plain; charset=utf-8`, `Cache-Control: no-store`, `X-Accel-Buffering: no` (nginx puffert den Stream nicht). Braucht `ANTHROPIC_API_KEY` + Supabase.

---

## `/mitglieder/gedankenprofil`

1. **Route / URL-Pfad:** `/mitglieder/gedankenprofil` — Datei: `src/app/mitglieder/gedankenprofil/page.tsx` (Actions: `src/app/mitglieder/reading-actions.ts`)
2. **Zweck:** Auswertung des Bewusstseinstests: Profil über alle 7 Stufen, Bedarfsanalyse, optional ein persönliches KI-Reading.
3. **Funktionen & Features:**
   - **7-Stufen-Profil** mit Prozent-Balken und Level (Verankert / Im Aufbau / Entwicklungsraum), Schwerpunkt-Markierung und Abgeschlossen-Haken.
   - **Bedarfsanalyse**: priorisierte Stufen mit Grund, konkretem nächsten Schritt und passender Praxis/Vertiefung.
   - **KI-Reading** (`ReadingPanel`) — nur wenn konfiguriert **und** ein Test vorliegt; erzeugt **nur auf Klick** (`generateReading`), gespeichertes Reading wird angezeigt und kann neu erzeugt werden.
   - Ohne Test: Einladung zum Bewusstseinstest. Verweis zum Begleiter, der dieses Profil kennt.
4. **Zugriffsschutz:** Proxy + Layout; zusätzlich eigener Check `redirect("/login?redirect=/mitglieder/gedankenprofil")`.
5. **Datenquellen & Ablauf:** `getTestProfile` (`profiles.start_stage`, `test_scores`) + `getCompletedStages` (`progress`), verrechnet in `buildGedankenprofil` (`@/lib/gedankenprofil`, deterministisch). Reading über `reading-actions` (`gedanken_readings`); die KI deutet nur die faktische Profil-Zusammenfassung, erfindet nichts.
6. **Konfiguriert:** Server-Component, `dynamic = "force-dynamic"`; `noindex`. Reading braucht `ANTHROPIC_API_KEY`.

---

## `/mitglieder/einstellungen`

1. **Route / URL-Pfad:** `/mitglieder/einstellungen` — Datei: `src/app/mitglieder/einstellungen/page.tsx` (Actions: `src/app/mitglieder/actions.ts`)
2. **Zweck:** Kontoeinstellungen: Anzeigename, E-Mail-Impulse, Passwort, Konto/Abmelden.
3. **Funktionen & Features:**
   - **Anzeigename** (`DisplayNameForm` → `updateDisplayName`; schreibt `profiles.full_name` und zieht Auth-Metadaten mit; max. 80 Zeichen).
   - **Newsletter-Toggle** (`NewsletterToggle` → `setNewsletterOptIn`).
   - **Passwort ändern** (`PasswordForm` → `updatePassword`; ≥ 8 Zeichen; session-basiert, altes Passwort nicht nötig).
   - **Konto**: E-Mail-Anzeige + Abmelden (`signOut`).
   - Ohne Supabase: Hinweis „noch nicht konfiguriert".
4. **Zugriffsschutz:** Proxy + Layout; zusätzlich eigener Check `redirect("/login?redirect=/mitglieder/einstellungen")`.
5. **Datenquellen & Ablauf:** Supabase `profiles` (`full_name`, `newsletter_opt_in`), `auth.updateUser` für Passwort/Metadaten. Server-Actions in `actions.ts`.
6. **Konfiguriert:** Server-Component, `dynamic = "force-dynamic"`; `noindex`.

---

## `/mitglieder/programm`

1. **Route / URL-Pfad:** `/mitglieder/programm` — Datei: `src/app/mitglieder/programm/page.tsx` (Actions: `src/app/mitglieder/programm-actions.ts`)
2. **Zweck:** Geführtes 21-Tage-Programm „Autopilot-Ausstieg" in drei Wochen (Bemerken → Beobachten/Loslassen → bewusst Gestalten).
3. **Funktionen & Features:**
   - **Selbst-getakteter Begleiter** (`ProgrammBegleiter`, Client): alle 21 Tage sichtbar, der erste noch offene Tag steht vorne; jeder Tag hat Impuls, Übung und weiterführenden Bezug.
   - **Tag abschließen** ist ein Klick (`setProgrammTag`, Validierung 1–21); ein verpasster Tag ist kein Bruch. Fortschritt fließt in die Momentum-Reihe des Dashboards.
4. **Zugriffsschutz:** Proxy + Layout; zusätzlich eigener Check `redirect("/login?redirect=/mitglieder/programm")`.
5. **Datenquellen & Ablauf:** `programmTage`, `programmWochen`, `tagKey` (`@/lib/programm`). Fortschritt aus `progress` (`item_type="programm"`, `item_key` `01`…`21`) über `getProgrammFortschritt`/`setProgrammTag`.
6. **Konfiguriert:** Server-Component, `dynamic = "force-dynamic"`; `noindex`.

---

## `/mitglieder/rueckkehr`

1. **Route / URL-Pfad:** `/mitglieder/rueckkehr` — Datei: `src/app/mitglieder/rueckkehr/page.tsx` (Actions: `src/app/mitglieder/rueckkehr-actions.ts`)
2. **Zweck:** Offene tägliche Praxis nach dem Programm: einmal am Tag innehalten und „zurückkehren".
3. **Funktionen & Features:**
   - **Rhythmus-/Serien-Ansicht** (`TaeglicheRueckkehr`, Client) über die zurückliegenden Tage.
   - **Rückkehr markieren** für den (lokalen) Kalendertag (`markiereRueckkehr`), **idempotent** (zweiter Klick am selben Tag ändert nichts).
   - Der Tag kommt aus der **lokalen Zeit** der Person (Client übergibt `YYYY-MM-DD`); akzeptiert wird nur, was höchstens ±1 Tag von der Serverzeit abweicht (`istPlausiblesHeute`). Speist die Serie im Dashboard.
4. **Zugriffsschutz:** Proxy + Layout; zusätzlich eigener Check `redirect("/login?redirect=/mitglieder/rueckkehr")`. Action-Ergebnisse: `ok`/`invalid`/`unauthenticated`.
5. **Datenquellen & Ablauf:** Tabelle `rueckkehr` (`user_id`, `datum`, Unique `user_id,datum`), Fenster von 400 Tagen. `getRueckkehrDaten`/`markiereRueckkehr`.
6. **Konfiguriert:** Server-Component, `dynamic = "force-dynamic"`; `noindex`.

---

## `/mitglieder/arbeitsheft`

1. **Route / URL-Pfad:** `/mitglieder/arbeitsheft` — Datei: `src/app/mitglieder/arbeitsheft/route.ts`
2. **Zweck:** Geschützter PDF-Download des Gesamt-Arbeitshefts über alle 7 Stufen.
3. **Funktionen & Features:** `GET`-Handler, liefert `content/pdf/arbeitsheft.pdf` (Dateiname `Arbeitsheft-Die-7-Stufen.pdf`). Verlinkt aus dem Werkzeugkasten des Dashboards.
4. **Zugriffsschutz:** `guardMemberDownload(request)`; fehlendes PDF → 404.
5. **Datenquellen & Ablauf:** `getStaticPdf("arbeitsheft")` aus `content/pdf/`.
6. **Konfiguriert:** Route-Handler, `dynamic = "force-dynamic"`, PDF-Header (`application/pdf`, `attachment`, `public, max-age=0, must-revalidate`).

---

## Unterstützende Bausteine (Kurzüberblick)

- **Inhalts-/Datenmodule:** `@/lib/content` (`stages` = 7 Stufen), `@/lib/stage-lessons` (Lektionen), `@/lib/deep-dives` (Vertiefungen, inkl. `sources`), `@/lib/practices` (Praxis-Bibliothek), `@/lib/wissensdatenbank` (27 Kapitel + Glossar, gelesen via `node:fs`), `@/lib/library-links` (Themen-Brücken Vertiefung ↔ Kapitel), `@/lib/programm` (21 Tage), `@/lib/consciousness-test` (Bewusstseinstest).
- **Auswertung:** `@/lib/gedankenprofil` (`buildGedankenprofil`, deterministisch), `@/lib/standortbestimmung` (`buildStandort`, regelbasiert), `@/lib/journal` (`resolveEntry`, `formatDate`).
- **KI:** `@/lib/ki-modell` (Modellwahl + Fallback), `@/lib/begleiter` (Client-sichere Typen/Grenzen/Texte), `@/lib/begleiter-prompt` (server-only System-Prompt + Inhaltsverzeichnis).
- **PDF:** `@/lib/pdf/static-pdf` (liest `content/pdf/`, gecacht), `@/lib/pdf/slug` (`worksheetSlug`).
- **Client-Komponenten** (`src/components/members/*`): `MemberNav`, `BegleiterLauncher`/`BegleiterChat`, `DetektorPanel`, `JournalReflection` (Autosave), `StageCompleteToggle`, `KapitelGelesenToggle`, `NewsletterToggle`, `MusterSpiegelPanel`, `ReadingPanel`, `TaeglicheRueckkehr`, `ProgrammBegleiter`, `DisplayNameForm`, `PasswordForm`, `MomentumRow`, `TestCurve`, `VideoEmbed`, `PrintButton`, `LessonHero`.

---

## Wiederkehrende Muster (zusammengefasst)

- **Statische Seite + Client-Insel:** Detailseiten (Stufe, Vertiefung, Praxis, Kapitel) werden statisch vorgerendert; persönlicher Fortschritt/Notizen kommen über kleine Client-Komponenten und Server-Actions nach.
- **`force-dynamic`** überall dort, wo personalisiert oder pro Sitzung gerendert wird (Dashboard, Journal, Wissensdatenbank-Übersicht, alle KI-Seiten, Einstellungen, Programm, Rückkehr, alle Download-Routen).
- **`noindex, nofollow`** auf allen Mitglieder-Seiten (geschützter Bereich).
- **KI nur auf Klick, nie automatisch** (Begleiter, Detektor, Reading, Muster-Spiegel); ohne `ANTHROPIC_API_KEY` blendet sich das Werkzeug still aus.
- **Defensive Datenzugriffe:** fehlt eine Migration/Tabelle, bleibt das Feature leer statt zu brechen.
- **Fortschritt über eine gemeinsame Tabelle:** `progress` trägt Stufen, Programm-Tage und gelesene Kapitel (unterschieden über `item_type`); Reflexionen liegen in `notes` und markieren die Stufe automatisch als „begonnen".

_Stand: 2026-09-11 — automatisch dokumentiert_


---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/04-admin.md -->
<!-- ============================================================ -->

# Admin-Bereich (/admin)

Der Admin-Bereich ist das interne „Marketing-Cockpit" des Projekts *Werde Meister deiner Gedanken*. Er ist ausschließlich für Administratoren zugänglich, wird niemals von Suchmaschinen indexiert (jede Seite setzt `robots: { index: false, follow: false }`) und bündelt Kennzahlen, Redaktions- und Produktionsplanung, das Marken- und Vorlagen-Material sowie die interne Recherche-Sammlung.

Alle Seiten sind **Server-Components** mit `export const dynamic = "force-dynamic"` (keine statische Vorab-Generierung, weil sie pro Aufruf die angemeldete Person und ggf. Live-Daten aus Supabase prüfen). Die interaktiven Teile (Redaktionsplan-Editor, Vorlagen-Browser, Bibliotheks-Browser) sind ausgelagerte Client-Components, die von den Server-Seiten mit bereits geprüften Daten versorgt werden.

## Übersicht der Routen

- [`/admin`](#admin) — Marketing-Cockpit / Dashboard (`src/app/admin/page.tsx`)
- [`/admin/seiten`](#adminseiten) — Seitenübersicht aller Website-Routen (`src/app/admin/seiten/page.tsx`)
- [`/admin/redaktionsplan`](#adminredaktionsplan) — Kanalübergreifender Redaktionsplan (`src/app/admin/redaktionsplan/page.tsx`)
- [`/admin/marken-uebersicht`](#adminmarken-uebersicht) — Farben, Logos, Vorlagen-Bestand (`src/app/admin/marken-uebersicht/page.tsx`)
- [`/admin/vorlagen`](#adminvorlagen) — Vorlagen-Bibliothek / Galerie (`src/app/admin/vorlagen/page.tsx`)
- [`/admin/vorlagen/datei/[...pfad]`](#adminvorlagendateipfad) — Datei-Auslieferung für Vorlagen (`.../datei/[...pfad]/route.ts`)
- [`/admin/vorlagen/ebook`](#adminvorlagenebook) — Auslieferung des Lead-Magnet-E-Books (`.../ebook/route.ts`)
- [`/admin/bewusstseinsbibliothek`](#adminbewusstseinsbibliothek) — Quellen-, Themen- & Content-Reservoir (`src/app/admin/bewusstseinsbibliothek/page.tsx`)

## Admin-Zugriffsschutz (gemeinsam)

Der Admin-Zugang wird **zweifach** (Defense-in-Depth) abgesichert:

1. **Proxy / Middleware** (`src/proxy.ts`, in Next.js 16 heißt Middleware jetzt „Proxy"):
   Die Funktion `withAuth` greift für alle Pfade unter `/admin` (sowie `/mitglieder` und `/login`). Ist `REQUIRE_MEMBER_LOGIN` aktiv und Supabase konfiguriert, wird per `supabase.auth.getUser()` die Session geprüft:
   - kein Login → Redirect nach `/login?redirect=<pfad>`
   - eingeloggt, aber keine Admin-E-Mail → Redirect nach `/mitglieder`
   Der Matcher schließt `api`, `_next/static`, `_next/image` u. a. aus — die Datei-Routen unter `/admin/vorlagen/...` fallen bewusst **nicht** unter `api` und prüfen daher zusätzlich selbst.

2. **Seiten-/Route-eigener Check** (in jeder `page.tsx` und jeder `route.ts`):
   - Ist Supabase nicht konfiguriert (`isSupabaseConfigured` aus `src/lib/supabase/config.ts`), gibt es keine Anmeldung. Die Seiten zeigen dann einen „Noch nicht verbunden"-Hinweis; die Datei-Routen liefern schlicht `404`.
   - Sonst: `createClient()` (Server-Supabase, `src/lib/supabase/server.ts`) → `supabase.auth.getUser()`.
     - kein `user` → `redirect("/login?redirect=<pfad>")` (Seiten) bzw. `404` (Routen)
     - `!isAdminEmail(user.email)` → `redirect("/mitglieder")` (Seiten) bzw. `404` (Routen)

**Wer Admin ist** (`src/lib/admin.ts`):
Die Funktion `isAdminEmail(email)` vergleicht (case-insensitiv) gegen die Liste `ADMIN_EMAILS`. Diese stammt aus der Umgebungsvariable **`ADMIN_EMAILS`** (kommagetrennt). Fehlt sie, gelten als Default `heiko.schwaninger@outlook.com` und `heiko.schwaninger@gmail.com`. Die Liste steht bewusst **nicht** unter `NEXT_PUBLIC_*` und bleibt damit serverseitig.

**Service-Role-Client** (`src/lib/supabase/admin.ts`):
Für bereichsübergreifende Zählungen und Schreibzugriffe (Redaktionsplan) wird `createAdminClient()` genutzt — ein Supabase-Client mit **`SUPABASE_SERVICE_ROLE_KEY`**, der Row-Level-Security umgeht. Er wird ausschließlich serverseitig und erst **nach** bestandenem Admin-Check verwendet. Fehlt der Key, gibt die Funktion `null` zurück; die Aufrufer behandeln das als „nicht konfiguriert" und bleiben nutzbar (Funnel-Zahlen inaktiv, Redaktionsplan nicht speicherbar).

---

## /admin

1. **Route / Datei:** `/admin` — `src/app/admin/page.tsx`
2. **Zweck:** Marketing-Cockpit / Startseite des Admin-Bereichs. Zeigt auf einen Blick Reichweite, E-Book-Funnel, Bewusstseinstest-Verteilung und den Content-/Drehplan-Produktionsstand.
3. **Funktionen & Features:**
   - Kopf-Kennzahlen: Mitglieder, Newsletter-Abos, bestätigte E-Book-Leads (+ Zuwachs 30 Tage), Anzahl Bewusstseinstests.
   - Schnell-Links zu Redaktionsplan, Vorlagen, Marken-Übersicht, Seitenübersicht, Bewusstseinsbibliothek.
   - Warnhinweis, wenn `SUPABASE_SERVICE_ROLE_KEY` fehlt (Funnel-Zahlen dann inaktiv, Content-Status funktioniert trotzdem).
   - E-Book-Funnel: offen (Opt-in) / bestätigt / abgemeldet / Bestätigungsrate (%).
   - Bewusstseinstest-Verteilung über die 7 Stufen (nur wenn Tests vorhanden), als Balken.
   - Content-/Drehplan-Status: Fortschrittsbalken „Videos gedreht", getrennte Produktionslinien für Langvideos (Stufen-Lektionen, Praxis-Übungen, Vertiefungen, Mentale Selbstverteidigung), Reels und Carousels; zusätzlich Cover-Motive, Reels/Carousels geplant, Blog-Artikel.
4. **Zugriffsschutz:** Wie im gemeinsamen Abschnitt. Ohne Supabase → Hinweis-Seite; ohne Login → `/login?redirect=/admin`; ohne Admin-Recht → `/mitglieder`.
5. **Datenquellen & Ablauf:**
   - **Funnel** über `getFunnelStats()` (`src/lib/admin-stats.ts`): zählt via Service-Role-Client die Tabellen `profiles` (Mitglieder; Newsletter = `newsletter_opt_in = true`), `ebook_leads` (nach `status` pending/confirmed/unsubscribed, plus bestätigte der letzten 30 Tage über `confirmed_at`) und `test_results` (`top_stage` → Verteilung Stufe 1–7). Fehlende Tabelle/Key → `configured: false`, Werte 0.
   - **Content-Inventar** über `getContentInventory()` (rein statisch, ohne DB): aus `stageLessons`, `practices`, `deepDives` (Trennung „Mentale Selbstverteidigung"), `reels`/`reelSeries`, `carousels`/`carouselSeries`, `blog`, `stages`. „gedreht"/„erstellt" wird über die Felder `video` bzw. `produced`/`filmed` gezählt.
6. **Konfiguriert:** `dynamic = "force-dynamic"`; `metadata.title = "Marketing-Cockpit"`, `robots: noindex/nofollow`. Server-Component. Umgebungsvariablen: `ADMIN_EMAILS`, `SUPABASE_SERVICE_ROLE_KEY` (für Funnel), Supabase-URL/Anon-Key.

## /admin/seiten

1. **Route / Datei:** `/admin/seiten` — `src/app/admin/seiten/page.tsx`
2. **Zweck:** Interne, klickbare Übersicht **aller** Seiten der Website, gruppiert nach Bereich — als Navigations- und Kontrollhilfe.
3. **Funktionen & Features:**
   - Gesamtzahl aller Seiten im Kopf; Gruppen mit Beschreibung und Seitenzahl.
   - Gruppen: Öffentliche Seiten, Blog (Übersicht + alle Artikel), Mitgliederbereich, Die 7 Stufen, Praxis, Vertiefungen, Wissensdatenbank (+ Glossar), Administration, Rechtliches.
   - Die dynamischen Gruppen werden aus denselben Datenquellen erzeugt wie die echten Seiten — die Liste bleibt damit automatisch aktuell. Jede Kachel zeigt Label, optionalen Hinweis und den `href`-Pfad.
4. **Zugriffsschutz:** Wie gemeinsam. Ohne Login → `/login?redirect=/admin/seiten`; ohne Admin → `/mitglieder`. Zusätzlich zur Proxy-Absicherung.
5. **Datenquellen & Ablauf:** Statische Inhalts-Module: `publishedPosts()` (`src/lib/blog`), `practices`, `deepDives`, `stages` (`src/lib/content`), `chapters()` (`src/lib/wissensdatenbank`). Öffentliche/Mitglieder-/Admin-/Rechts-Links sind fest hinterlegt. Keine Datenbankzugriffe (außer dem Auth-Check).
6. **Konfiguriert:** `dynamic = "force-dynamic"`; `metadata.title = "Seitenübersicht"`, `robots: noindex/nofollow`. Server-Component. Umgebungsvariablen: `ADMIN_EMAILS` (+ Supabase-Login).

## /admin/redaktionsplan

1. **Route / Datei:** `/admin/redaktionsplan` — `src/app/admin/redaktionsplan/page.tsx` (Client-Editor: `Planer.tsx`, Server-Actions: `actions.ts`, Datenmodell: `src/lib/redaktionsplan.ts`)
2. **Zweck:** Kanalübergreifender Redaktionsplan — ein Wochenthema, alle Kanäle gleichzeitig (Instagram, Facebook, LinkedIn, YouTube). Pro Tag planen und den Produktionsstatus pflegen.
3. **Funktionen & Features:**
   - Interaktives Cockpit (`RedaktionsplanCockpit`): Posts pro Woche/Tag; Kanal-, Block- und Status-Kennzeichnung (farbcodiert: IG/FB/LI/YT, Blöcke A/B/C).
   - Post-Bearbeitung: anlegen, ändern, löschen; schneller Status-Wechsel im Kreis *geplant → erstellt → veröffentlicht*; Notizfeld.
   - Import/Reset: Standard-Plan (20+ Wochen) aus dem Code in die DB importieren; „zurücksetzen" leert und importiert neu.
   - Fehler-/Hinweis-Banner (z. B. wenn Service-Role-Key fehlt).
   - Wochen-Metadaten (Serie, Block, Titel) aus `WOCHEN_META`; Standard-Plan gegliedert in Block A (Die 7 Stufen), B (Praxis & Wissenschaft) und C (Mentale Selbstverteidigung).
4. **Zugriffsschutz:** Seite wie gemeinsam (ohne Login → `/login?redirect=/admin/redaktionsplan`, ohne Admin → `/mitglieder`). **Zusätzlich** prüft jede Server-Action in `actions.ts` über `requireAdmin()` erneut Login + Admin-Recht und beschafft erst dann den Service-Role-Client — die Tabelle `redaktionsplan_posts` bleibt für den Anon-Key komplett gesperrt (RLS, Migration 0013).
5. **Datenquellen & Ablauf:**
   - Anzeige über `getPlanPosts()` (liest `redaktionsplan_posts` via Service-Role-Client, sortiert nach Woche/Wochentag/sort).
   - Mutationen: `updatePost`, `setStatus`, `addPost`, `deletePost`, `seedDefaultPlan` — alle mit Eingabe-Normalisierung/Validierung (Textlängen, erlaubte Kanäle/Status, Wochentag 1–7). Nach Schreibzugriff `revalidatePath("/admin/redaktionsplan")`.
   - Seed-Quelle: `flattenForSeed()` / `DEFAULT_PLAN` aus `src/lib/redaktionsplan.ts`.
6. **Konfiguriert:** `dynamic = "force-dynamic"`; `metadata.title = "Redaktionsplan"`, `robots: noindex/nofollow`. Server-Component + Client-Editor + `"use server"`-Actions. Umgebungsvariablen: `ADMIN_EMAILS`, `SUPABASE_SERVICE_ROLE_KEY` (Pflicht zum Speichern), Supabase-URL/Anon-Key. DB-Tabelle: `redaktionsplan_posts`.

## /admin/marken-uebersicht

1. **Route / Datei:** `/admin/marken-uebersicht` — `src/app/admin/marken-uebersicht/page.tsx` (Daten: `src/lib/marken-uebersicht.ts`)
2. **Zweck:** Referenz-Übersicht des kompletten Markensystems: Farbwelten, Farbsystem mit Hex-Werten, alle Logos und der Vorlagen-Bestand inkl. Lücken-Check.
3. **Funktionen & Features:**
   - Kopf-Kennzahlen (aus `bestandKennzahlen`): Motive gesamt, 4 Farbwelten, Logo-Varianten, Bilddateien.
   - Vier schematische Farbwelt-Panels (aus echten Marken-Tokens gebaut, kein Screenshot): `dunkel`, `hell`, `tuerkis`, `tuerkisHell` (Achsen: Grund Navy/Creme × Akzent Gold/Türkis). Hinweis-Box zum neuen Türkis-Status, solange `tuerkisStatus.gerendert === false`.
   - Farbsystem: Gruppen (`farbGruppen`) mit Swatches (Hex, Token, Rolle) — Quelle der Wahrheit `src/app/globals.css`.
   - Logos (`logos`): jedes Logo auf Creme und auf Dunkel, mit Dateiname, Verwendung, optionalem Hinweis.
   - Vorlagen-Bestand & Lücken-Check: Tabelle aus `vorlagenBestand` (Motiv-Familie, Motive, Creme, Dunkel, Türkis, Status paarig/prüfen) mit Summenzeile; Kennzahl-Karten (paarig vorhanden, neutrale Vorlagen, erwartete Türkis-Motive).
   - Ausklappbarer Entwickler-Abschnitt: Render-Befehle (`npm run marketing:all`, `THEME=… node docs/marketing/…`) und Verweis auf `/admin/vorlagen`.
4. **Zugriffsschutz:** Wie gemeinsam. Ohne Login → `/login?redirect=/admin/marken-uebersicht`; ohne Admin → `/mitglieder`.
5. **Datenquellen & Ablauf:** Rein statisch aus `src/lib/marken-uebersicht.ts` (`farbGruppen`, `farbWelten`, `logos`, `vorlagenBestand`, `bestandKennzahlen`, `tuerkisStatus`). Die dort gepflegten Zahlen stammen aus einer manuellen Zählung von `docs/marketing/**` (Stand 01.09.2026); Farbwerte gespiegelt aus `globals.css`, Logo-Pfade aus `public/`. Keine DB-Zugriffe außer Auth.
6. **Konfiguriert:** `dynamic = "force-dynamic"`; `metadata.title = "Marken-Übersicht"`, `robots: noindex/nofollow`. Server-Component. Umgebungsvariablen: `ADMIN_EMAILS` (+ Supabase-Login).

## /admin/vorlagen

1. **Route / Datei:** `/admin/vorlagen` — `src/app/admin/vorlagen/page.tsx` (Client-Galerie: `VorlagenBrowser.tsx`, Assets: `src/lib/vorlagen-assets.ts`, Katalog: `src/lib/vorlagen.ts`)
2. **Zweck:** Vorlagen-Bibliothek — alle fertigen Vorlagen (Social-Grafiken, Reel-Cover, Carousels, Workshop-Material, PDFs) zum Ansehen und Herunterladen, durchsuch- und filterbar.
3. **Funktionen & Features:**
   - Interaktiver `VorlagenBrowser` mit Such-/Filterleiste über die Kategorien `social`, `reels`, `carousel`, `workshop` (aus `vorlagenAssets` gefiltert).
   - PDF-Liste (`buildPdfListe()`): verlinkt bestehende, geschützte Routen — Gratis-E-Book über `/admin/vorlagen/ebook`, Arbeitsheft, je Stufe Lektion + Übungen, alle Vertiefungen. Mitglieder-PDFs bleiben login-geschützt (nur verlinkt, nicht nach `public/` kopiert).
   - Bilder werden inline als Vorschau geladen, Dokumente (PDF/PPTX/ZIP) als Download.
   - Ausklappbarer Entwickler-Abschnitt: Erzeugungs-Befehl `npm run vorlagen:galerie` und pro Vorlagen-Art (`vorlagenKatalog`) Ordner + Quell-Befehl.
4. **Zugriffsschutz:** Wie gemeinsam. Ohne Login → `/login?redirect=/admin/vorlagen`; ohne Admin → `/mitglieder`. Die eigentlichen Dateien werden nicht aus `public/` geliefert, sondern über die separat geschützten Routen (siehe unten).
5. **Datenquellen & Ablauf:**
   - Galerie-Daten aus `src/lib/vorlagen-assets.ts` (auto-generiert von `tools/vorlagen/build-gallery.mjs`; beschreibt Dateien unter `content/vorlagen/`). Katalog-Beschreibung aus `src/lib/vorlagen.ts` (rein statisch, keine Dateisystem-Zugriffe).
   - PDF-Liste aus `stages` und `deepDives`.
6. **Konfiguriert:** `dynamic = "force-dynamic"`; `metadata.title = "Vorlagen"`, `robots: noindex/nofollow`. Server-Component + Client-Browser. Umgebungsvariablen: `ADMIN_EMAILS` (+ Supabase-Login).

## /admin/vorlagen/datei/[...pfad]

1. **Route / Datei:** `/admin/vorlagen/datei/[...pfad]` (Catch-all, GET) — `src/app/admin/vorlagen/datei/[...pfad]/route.ts` (Pfad-Logik: `src/lib/vorlagen-datei.ts`)
2. **Zweck:** Liefert eine einzelne Vorlagen-Datei aus `content/vorlagen/` aus — Bilder inline, Dokumente als Download —, aber nur an Admins. Wird von der Galerie unter `/admin/vorlagen` verlinkt (auch die `<img>`-Vorschauen, die die Session-Cookies mitschicken).
3. **Funktionen & Features:** Datei-Auslieferung mit passendem `Content-Type` und `Content-Disposition` (`inline` für Bilder, `attachment` für Dokumente), `Cache-Control: private, no-store`.
4. **Zugriffsschutz / Pfad-Traversal:**
   - Ohne Supabase → `404`. Ohne Login **oder** ohne Admin-Recht → bewusst `404` (nicht `403`), damit Nicht-Admins nicht einmal erfahren, dass die Datei existiert.
   - **Directory-Traversal-Schutz** in der reinen, separat getesteten Funktion `resolveVorlagenFile(pfad, ROOT)` (`ROOT = <cwd>/content/vorlagen`):
     1. `normalize()` der zusammengesetzten Segmente; abgelehnt werden Pfade, die mit `.` beginnen (`../`, versteckt), mit `/` beginnen (absolut) oder ein Nullbyte (`\0`) enthalten.
     2. **Typ-Whitelist** über `VORLAGEN_TYPES` — nur `.webp/.png/.jpg/.jpeg/.svg/.pdf/.pptx/.zip`; alles andere → `null`.
     3. Zweiter Sicherheitsgurt: Der aufgelöste absolute Pfad muss echt mit `${ROOT}/` beginnen, sonst `null`.
   - Bewusste Ablage unter `content/` statt `public/`: Dateien unter `public/` würde Next.js zusätzlich ungeschützt unter ihrem Dateipfad ausliefern und den Admin-Schutz aushebeln. `content/` wird im Dockerfile ins Laufzeit-Image kopiert.
5. **Datenquellen & Ablauf:** `readFile()` der aufgelösten Datei aus `content/vorlagen/`; bei Lesefehler → `404`. Auth über Server-Supabase-Client + `isAdminEmail`.
6. **Konfiguriert:** Route-Handler (GET), Node-Runtime (Dateisystem). Umgebungsvariablen: `ADMIN_EMAILS` (+ Supabase-Login). Keine eigenen Metadaten (kein HTML).

## /admin/vorlagen/ebook

1. **Route / Datei:** `/admin/vorlagen/ebook` (GET) — `src/app/admin/vorlagen/ebook/route.ts` (Datei-Lader: `src/lib/pdf/ebook-file.ts`)
2. **Zweck:** Liefert das Lead-Magnet-E-Book „Die 7 Stufen der Bewusstseinsentwicklung" an Admins — für die Verlinkung in der Vorlagen-Übersicht. Nötig, seit das PDF unter `content/pdf/` statt `public/` liegt; der öffentliche Weg `/ebook` verlangt ein Lead-Token, das ein Admin nicht hat.
3. **Funktionen & Features:** Genau **eine** feste Datei; kein Pfad-Parameter — damit stellt sich die Frage nach Directory-Traversal gar nicht erst. Auslieferung als `application/pdf`, `Content-Disposition: inline`, `Cache-Control: private, no-store`.
4. **Zugriffsschutz:** Ohne Supabase → `404`. Ohne Login oder ohne Admin → bewusst `404` (nicht `403`). Keine Pfad-Eingabe, daher kein Traversal-Risiko.
5. **Datenquellen & Ablauf:** `getEbookPdfBytes()` liest (und cached) `content/pdf/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf`; Lesefehler → `404`. Auth über Server-Supabase-Client + `isAdminEmail`.
6. **Konfiguriert:** `runtime = "nodejs"`, `dynamic = "force-dynamic"`, Route-Handler (GET). Umgebungsvariablen: `ADMIN_EMAILS` (+ Supabase-Login). Konstante Dateiname aus `EBOOK_FILE_NAME`.

## /admin/bewusstseinsbibliothek

1. **Route / Datei:** `/admin/bewusstseinsbibliothek` — `src/app/admin/bewusstseinsbibliothek/page.tsx` (Client-Browser: `src/components/members/BibliothekBrowser.tsx`, Daten: `src/lib/bewusstseinsbibliothek.ts`)
2. **Zweck:** Interne Materialsammlung hinter den Inhalten — Quellen, Tätigkeiten, Themenfelder mit Buchempfehlungen, ARTE-Dokumentationen, ein Content-Reservoir und die sinnvolle Bearbeitungsreihenfolge. Durchsuchbar und nach Quellentyp filterbar.
3. **Funktionen & Features:**
   - Einleitung zum Grundgedanken (Persönlichkeits- vs. Bewusstseinsentwicklung, drei Bewegungen) mit Datumsangabe `BIBLIOTHEK_STAND`.
   - Quellen-Kennzeichnung: Kürzel `W/P/G/E/L` (Wissenschaftlich, Philosophisch, Gesellschaftlich, Erfahrungsorientiert, Literatur) aus `QUELLEN`/`QUELL_CODES`, erklärt und als Filter-Chips im Browser nutzbar.
   - Durchsuchbare, filterbare Bibliothek (`BibliothekBrowser`) über Themen, Bücher, Romane, ARTE-Dokus etc.
4. **Zugriffsschutz:** Wie gemeinsam. Ohne Supabase → Hinweis-Seite; ohne Login → `/login?redirect=/admin/bewusstseinsbibliothek`; ohne Admin → `/mitglieder`. Zusätzlich zum Proxy.
5. **Datenquellen & Ablauf:** Rein statisch aus `src/lib/bewusstseinsbibliothek.ts` (`QUELLEN`, `QUELL_CODES`, `BIBLIOTHEK_STAND` sowie Themen-/Buch-/Roman-/Doku-Daten). Ursprung: gleichnamiges Artifact (Stand 4. September 2026). Keine DB-Zugriffe außer Auth.
6. **Konfiguriert:** `dynamic = "force-dynamic"`; `metadata.title = "Bewusstseinsbibliothek"`, `robots: noindex/nofollow`. Server-Component + Client-Browser. Umgebungsvariablen: `ADMIN_EMAILS` (+ Supabase-Login).

_Stand: 2026-09-11 — automatisch dokumentiert_


---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/05-api-routes.md -->
<!-- ============================================================ -->

# API-Routen

Diese Seite dokumentiert alle Route Handler (App Router) der Website „Werde
Meister deiner Gedanken". Grundlage ist ausschließlich der tatsächliche Code
unter `src/app/**/route.ts` sowie die eingebundenen Hilfsmodule unter
`src/lib/`.

Zwei Muster ziehen sich durch fast alle Routen:

- **Sanfte Fallbacks statt harter Fehler.** Ist ein Dienst (Stripe, Resend,
  Supabase) nicht konfiguriert, läuft kein Button ins Leere – die Route leitet
  aufs Kontaktformular um oder liefert eine erklärende Antwort.
- **Basis-URL bewusst gewählt.** Hinter dem Reverse-Proxy ist `request.url` die
  interne Adresse (`http://localhost:3000`). Alle Routen mit Rückkehr-Links
  nutzen deshalb in Produktion die kanonische Domain aus `src/lib/site.ts`
  (`site.url`) und nur lokal die echte Request-Herkunft. `x-forwarded-host`
  wird bewusst nicht verwendet (clientseitig fälschbar).

Alle Routen laufen unter `runtime = "nodejs"` (nötig für Stripe-SDK, `crypto`,
`resend`, Datei-Zugriff und den Supabase-Service-Role-Client).

## Übersicht

| Route | Methoden | Zweck |
|-------|----------|-------|
| `/api/checkout` | POST, GET | Startet den Stripe-Checkout für das Abo (Monat/Jahr). |
| `/api/buch-checkout` | POST, GET | Startet den Stripe-Checkout für den Buch-Einmalkauf (PDF/gedruckt). |
| `/api/buch-download` | GET | Ausliefern der gekauften Buch-PDF nur mit gültigem, signiertem Token. |
| `/api/ebook` | POST | Lead-Erfassung für das kostenlose E-Book mit Double-Opt-in. |
| `/api/ebook/confirm` | GET | Double-Opt-in-Bestätigung + Auslösen des E-Book-Versands. |
| `/api/ebook/unsubscribe` | GET | 1-Klick-Abmeldung aus der E-Book-Lead-Liste (DSGVO). |
| `/api/impulses` | GET, POST | Cron-geschützter Serienversand der wöchentlichen E-Mail-Impulse. |
| `/api/impulses/unsubscribe` | GET | 1-Klick-Abmeldung von den E-Mail-Impulsen (DSGVO). |
| `/api/kontakt` | POST | Kontaktformular-Versand über Resend (Benachrichtigung + Auto-Antwort). |
| `/api/stripe/webhook` | POST | Stripe-Webhook: Mitgliedschaft pflegen + Buch-/Zugangs-Zustellung. |
| `/rss.xml` | GET | Statisch erzeugter RSS-Feed des Blogs. |

---

## `/api/checkout`

1. **Route / Datei:** `/api/checkout` — `src/app/api/checkout/route.ts`
2. **HTTP-Methoden:** `POST` (Checkout starten), `GET` (Weiterleitung zurück
   zur Verkaufsseite).
3. **Zweck:** Startet den Stripe-Checkout für die Abo-Mitgliedschaft
   (Monats- oder Jahresabo) und leitet den Nutzer auf die gehostete
   Stripe-Bezahlseite weiter.
4. **Request:** `POST` als `FormData` mit optionalem Feld `plan` (`"monat"`
   oder `"jahr"`; alles andere/leer → Monatsabo). Kein Body zwingend nötig –
   ein direkter Aufruf ohne Formular fällt auf das Monatsabo zurück.
5. **Ablauf & Logik:**
   - Basis-URL bestimmen (`site.url` in Produktion, sonst Request-Origin).
   - `getStripe()` liefert den Stripe-Client oder `null`. Fehlt der Client
     oder `STRIPE_PRICE_ID`, folgt ein **Fallback-Redirect (303)** auf
     `/kontakt?thema=mitgliedschaft`.
   - Plan aus dem Formular lesen; `priceIdForPlan(plan)` löst zur Preis-ID auf
     („jahr" nutzt `STRIPE_PRICE_ID_YEARLY`, fällt aber auf das Monatsabo
     zurück, wenn das Jahres-Preis-ID fehlt).
   - **Optionale Verknüpfung mit bestehender Anmeldung:** Über den
     Supabase-Server-Client wird `auth.getUser()` versucht. Ist ein Nutzer
     angemeldet, werden dessen `email` (als `customer_email`) und `id` (als
     `client_reference_id` und in den Metadaten `supabase_user_id`)
     mitgegeben. Fehlt eine Session, ist Gast-Checkout weiterhin möglich – der
     Webhook legt den Zugang danach an.
   - `stripe.checkout.sessions.create({ mode: "subscription", … })` mit:
     `line_items` (Preis-ID, Menge 1), `allow_promotion_codes: true`,
     `billing_address_collection: "auto"`, `metadata` (`supabase_user_id`
     falls vorhanden, `plan`), `subscription_data.metadata.supabase_user_id`
     (falls Nutzer bekannt), `success_url`
     `…/mitgliedschaft/willkommen?session_id={CHECKOUT_SESSION_ID}`,
     `cancel_url` `…/mitgliedschaft?checkout=abgebrochen`.
6. **Response:**
   - Erfolg → `303`-Redirect auf `session.url` (Stripe-Bezahlseite).
   - Keine `session.url` → `303` auf `/mitgliedschaft?checkout=fehler`.
   - Exception → `303` auf `/mitgliedschaft?checkout=fehler` (Fehler wird
     geloggt).
   - Stripe nicht konfiguriert → `303` auf `/kontakt?thema=mitgliedschaft`.
   - `GET` → `303` auf `/mitgliedschaft`.
7. **Konfiguriert:** `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID` (Monat, Pflicht),
   `STRIPE_PRICE_ID_YEARLY` (Jahr, optional); Supabase (`NEXT_PUBLIC_SUPABASE_URL`,
   `NEXT_PUBLIC_SUPABASE_ANON_KEY`) für die optionale Nutzerkopplung;
   `NODE_ENV` steuert die Basis-URL. `runtime = "nodejs"`. Sicherheit:
   Basis-URL nicht aus `x-forwarded-host`; kein harter Fehler ohne Stripe.

---

## `/api/buch-checkout`

1. **Route / Datei:** `/api/buch-checkout` — `src/app/api/buch-checkout/route.ts`
2. **HTTP-Methoden:** `POST` (Checkout starten), `GET` (zurück zur Buchseite).
3. **Zweck:** Startet den Stripe-Checkout für den **Einmalkauf** des Buchs
   „Werde Meister deiner Gedanken" – als PDF (29,90 €) oder gedruckt (39,90 €).
4. **Request:** `POST` als `FormData` mit optionalem Feld `edition`
   (`"pdf"` oder `"print"`; Standard `pdf`).
5. **Ablauf & Logik:**
   - Edition aus dem Formular lesen (Standard `pdf`).
   - `bookPriceIdForEdition(edition)` liefert `STRIPE_BOOK_PRICE_ID` (PDF) bzw.
     `STRIPE_BOOK_PRICE_ID_PRINT` (gedruckt).
   - Fehlt der Stripe-Client oder die Preis-ID der Edition → **Fallback-Redirect
     (303)** auf `/kontakt?thema=buch`.
   - `stripe.checkout.sessions.create({ mode: "payment", … })` (Einmalzahlung)
     mit: `line_items`, `allow_promotion_codes: true`,
     `billing_address_collection: "required"`. Nur bei `edition === "print"`
     zusätzlich `shipping_address_collection.allowed_countries: ["DE","AT","CH"]`
     (die PDF-Edition ist reiner Download, ohne Lieferadresse).
   - `metadata`: `produkt: "buch-werde-meister-deiner-gedanken"` und `edition` –
     genau diese Kennung wertet der Stripe-Webhook aus.
   - `success_url` `…/buch?checkout=erfolg&edition=<edition>&session_id={CHECKOUT_SESSION_ID}`,
     `cancel_url` `…/buch?checkout=abgebrochen`.
6. **Response:**
   - Erfolg → `303`-Redirect auf `session.url`.
   - Keine `session.url` → `303` auf `/buch?checkout=fehler`.
   - Exception → `303` auf `/buch?checkout=fehler` (geloggt).
   - Nicht konfiguriert → `303` auf `/kontakt?thema=buch`.
   - `GET` → `303` auf `/buch`.
7. **Konfiguriert:** `STRIPE_SECRET_KEY`, `STRIPE_BOOK_PRICE_ID` (PDF),
   `STRIPE_BOOK_PRICE_ID_PRINT` (gedruckt); `NODE_ENV`. `runtime = "nodejs"`.
   Sicherheit: keine Rate-Limit (Stripe hostet die Bezahlung selbst);
   Lieferadresse nur bei Druckedition; sanfter Fallback.

---

## `/api/buch-download`

1. **Route / Datei:** `/api/buch-download` — `src/app/api/buch-download/route.ts`
2. **HTTP-Methoden:** `GET`.
3. **Zweck:** Ausliefern der gekauften Buch-PDF „Werde Meister deiner Gedanken"
   – ausschließlich mit gültigem, signiertem Token aus der Liefermail.
4. **Request:** Query-Parameter `token` (der signierte Download-Token, siehe
   `src/lib/buch-download.ts`).
5. **Ablauf & Logik (Datei-Download mit Guard):**
   - Token aus der URL lesen.
   - `verifyBuchDownloadToken(token)` prüft **HMAC-SHA256-Signatur** (timing-safe
     mit `timingSafeEqual`) und **Ablaufdatum** (`exp` im Payload, 30 Tage TTL).
     Das Signatur-Geheimnis ist `BUCH_DOWNLOAD_SECRET`, ersatzweise
     `STRIPE_WEBHOOK_SECRET`. Der Token ist stateless (kein DB-Zugriff).
   - Bei ungültigem/fehlendem/abgelaufenem Token → **404 „Nicht gefunden"**
     (bewusst 404 statt 403: Unbefugte erfahren nicht, dass es hier etwas gibt).
   - PDF-Bytes werden über `getBuchPdfBytes()` aus `content/pdf/…` geladen
     (bewusst nicht unter `public/`, sonst frei abrufbar; im Speicher gecacht).
     Fehlt die Datei → ebenfalls 404.
6. **Response:**
   - Erfolg → `200` mit PDF-Bytes; Header `Content-Type: application/pdf`,
     `Content-Disposition: attachment; filename="Werde-Meister-deiner-Gedanken.pdf"`,
     `Cache-Control: private, no-store` (persönlicher Download).
   - Sonst → `404` (Text „Nicht gefunden").
7. **Konfiguriert:** `BUCH_DOWNLOAD_SECRET` (oder `STRIPE_WEBHOOK_SECRET`) als
   Signatur-Geheimnis; PDF unter `content/pdf/Werde-Meister-deiner-Gedanken.pdf`
   (im Dockerfile ins Image kopiert). `runtime = "nodejs"`,
   `dynamic = "force-dynamic"` (Antwort hängt vom Token ab). Sicherheit:
   signierter, ablaufender Token; timing-safe Vergleich; 404 statt 403; kein
   Caching.

---

## `/api/ebook`

1. **Route / Datei:** `/api/ebook` — `src/app/api/ebook/route.ts`
2. **HTTP-Methoden:** `POST`.
3. **Zweck:** Lead-Erfassung für das kostenlose E-Book „Die 7 Stufen der
   Bewusstseinsentwicklung" mit **Double-Opt-in** (DSGVO-Einwilligung).
4. **Request:** `POST` mit `Content-Type: application/json`, Body:
   `{ email: string, company?: string }`. `company` ist der **Honeypot** (muss
   leer bleiben).
5. **Ablauf & Logik (Double-Opt-in-Flow):**
   1. **Rate-Limit:** In-Memory pro IP (`x-real-ip` zuerst, sonst letzter
      Eintrag von `x-forwarded-for`), max. 5 Anfragen / 10 Minuten → sonst
      `429`.
   2. JSON parsen (Fehler → `400`); `email` normalisieren (trim, lowercase),
      `company` (Honeypot) lesen.
   3. **Honeypot** ausgefüllt → still verwerfen, aber `{ ok: true, mode:
      "confirm" }` vortäuschen.
   4. E-Mail-Format prüfen (Regex) → sonst `400`.
   5. Fehlt `RESEND_API_KEY` → `503` mit `code: "not_configured"` (das Formular
      bietet dann den Direkt-Download an).
   6. **Ohne Supabase** (`createAdminClient()` = `null`): kein Double-Opt-in
      möglich → `sendEbookDeliveryMail` schickt das E-Book direkt (PDF als
      Anhang, ohne Download-Link). Antwort `{ ok: true, mode: "sent" }`;
      Versandfehler → `502`.
   7. **Mit Supabase:** bestehenden Lead in `ebook_leads` per `email` suchen
      (Fehler → `500`).
      - **Status `confirmed`** (Einwilligung liegt vor): E-Book direkt erneut
        senden (`sendEbookDeliveryMail` mit Unsubscribe-URL und
        `confirm_token` als Download-Token). Antwort `{ ok: true, mode:
        "sent", downloadUrl? }` – `downloadUrl` nur, wenn ein Token vorliegt.
      - **Neu / noch offen (`pending`):** `upsert` (onConflict `email`) mit
        `status: "pending"`, `requested_at`, `request_ip`. Bei einem bereits
        bestehenden Lead wird ein **frisches `confirm_token`** (`crypto.randomUUID()`)
        erzwungen, damit alte Links ungültig werden. Danach
        `sendEbookConfirmationMail` mit
        `…/api/ebook/confirm?token=<confirm_token>`. Antwort `{ ok: true,
        mode: "confirm" }`. **Es wird bewusst KEIN Download-Link ausgegeben** –
        ohne bestätigte Einwilligung kein E-Book. Versandfehler → `502`,
        Speicherfehler → `500`.
6. **Response:** JSON. `200` `{ ok: true, mode: "confirm" | "sent",
   downloadUrl? }`; `400` (ungültige Anfrage/E-Mail); `429` (Rate-Limit);
   `500` (Supabase-Fehler); `502` (Mailversand); `503` (`not_configured`).
7. **Konfiguriert:** `RESEND_API_KEY` (Pflicht für Versand), `EBOOK_FROM` /
   `CONTACT_FROM` (Absender, optional), Supabase-Service-Role
   (`SUPABASE_SERVICE_ROLE_KEY` + `NEXT_PUBLIC_SUPABASE_URL`) für die
   Lead-Speicherung, Tabelle `ebook_leads`. `runtime = "nodejs"`. Sicherheit:
   In-Memory-Rate-Limit, Honeypot, E-Mail-Validierung, Double-Opt-in,
   Token-Rotation bei erneuter Anfrage.

---

## `/api/ebook/confirm`

1. **Route / Datei:** `/api/ebook/confirm` — `src/app/api/ebook/confirm/route.ts`
2. **HTTP-Methoden:** `GET` (Klick auf den Link in der Bestätigungsmail).
3. **Zweck:** Double-Opt-in-Bestätigung: bestätigt die Anmeldung über den Token
   und löst den Versand des E-Books aus.
4. **Request:** Query-Parameter `token` (das `confirm_token` des Leads).
5. **Ablauf & Logik:**
   - Fehlt der Token → HTML-Seite „Link unvollständig" (`400`).
   - Ohne Supabase (`createAdminClient()` = `null`) → HTML „Gerade nicht
     möglich" (`503`).
   - Lead über `confirm_token` in `ebook_leads` suchen (`id, email, status,
     unsubscribe_token`). Nicht gefunden/Fehler → HTML „Link ungültig oder
     abgelaufen" (`404`).
   - **Schon `confirmed`:** nicht erneut senden (schützt vor
     Doppelversand durch Link-Vorschauen/Scanner) → HTML „Schon bestätigt"
     (`200`) mit Direkt-Download-Link (Token = `confirm_token`).
   - **Übergang `pending → confirmed`:** `update` auf `status: "confirmed"`,
     `confirmed_at`, `confirm_ip` (aus `x-forwarded-for` erster Eintrag, sonst
     `x-real-ip`). Update-Fehler → HTML „Gerade nicht möglich" (`500`).
   - Ist `RESEND_API_KEY` gesetzt: `sendEbookDeliveryMail` mit Unsubscribe-URL
     und dem `token` als Download-Token. **Nur beim Übergang wird versendet.**
     Mailfehler → Bestätigung bleibt gespeichert, HTML mit Hinweis + direktem
     Download-Link (`200`).
6. **Response:** **HTML-Seite** (`text/html`), `noindex`, im Marken-Layout, mit
   optionalem „E-Book direkt herunterladen"-Link. Status-Codes `200` (Erfolg /
   schon bestätigt), `400`, `404`, `500`, `503`.
7. **Konfiguriert:** Supabase-Service-Role (Pflicht), Tabelle `ebook_leads`;
   `RESEND_API_KEY`, `EBOOK_FROM`/`CONTACT_FROM` (Versand). `runtime = "nodejs"`,
   `dynamic = "force-dynamic"`. Sicherheit: Versand nur einmalig beim
   Status-Übergang (Idempotenz gegen Doppelversand); Download nur mit Token.

---

## `/api/ebook/unsubscribe`

1. **Route / Datei:** `/api/ebook/unsubscribe` — `src/app/api/ebook/unsubscribe/route.ts`
2. **HTTP-Methoden:** `GET`.
3. **Zweck:** 1-Klick-Abmeldung aus der E-Book-Lead-Liste (DSGVO), öffentlich
   über den Token aus dem Abmeldelink der E-Mail – keine Anmeldung nötig.
4. **Request:** Query-Parameter `token` (das `unsubscribe_token` des Leads).
5. **Ablauf & Logik:**
   - Fehlt der Token → HTML „Link unvollständig" (`400`).
   - Ohne Supabase → HTML „Gerade nicht möglich" (`503`).
   - `update` auf `ebook_leads` per `unsubscribe_token`: `status:
     "unsubscribed"`, `unsubscribed_at`; `select("id")` zur Trefferprüfung.
   - Kein Treffer/Fehler → HTML „Link ungültig oder bereits abgemeldet"
     (`404`).
6. **Response:** HTML-Seite (`text/html`, `noindex`). `200` „Erfolgreich
   abgemeldet"; sonst `400` / `404` / `503`.
7. **Konfiguriert:** Supabase-Service-Role (Pflicht), Tabelle `ebook_leads`.
   `runtime = "nodejs"`, `dynamic = "force-dynamic"`. Sicherheit: Token als
   Zugangsschlüssel; keine Preisgabe, ob ein Eintrag existierte.

---

## `/api/impulses`

1. **Route / Datei:** `/api/impulses` — `src/app/api/impulses/route.ts`
2. **HTTP-Methoden:** `GET` und `POST` (beide zeigen auf denselben Handler
   `handle`).
3. **Zweck:** Cron-getriebener Serienversand der wöchentlichen E-Mail-Impulse
   an alle Mitglieder mit aktivem Newsletter-Opt-in.
4. **Request:** Autorisierung nötig – entweder Header `Authorization: Bearer
   <CRON_SECRET>` oder Query `?secret=<CRON_SECRET>`. Kein Body erforderlich.
   Gedacht für einen wöchentlichen Cron (z. B. Vercel Cron).
5. **Ablauf & Logik:**
   - **Autorisierung:** `authorized()` vergleicht Secret **timing-safe**
     (`timingSafeEqual`). Ohne gesetztes `CRON_SECRET` immer `false`. Nicht
     autorisiert → `401`.
   - Fehlt `RESEND_API_KEY` oder Supabase-Service-Role → `503` mit `code:
     "not_configured"`.
   - Empfänger laden: `profiles` (`id, email, impulse_index,
     unsubscribe_token`) mit `newsletter_opt_in = true`. DB-Fehler → `500`.
   - **Pro Empfänger:** ohne E-Mail → übersprungen (`skipped`). Sonst nächsten
     Impuls über `impulse_index % impulses.length` bestimmen (Serie läuft
     zyklisch), CTA-URL und Unsubscribe-URL (`…/api/impulses/unsubscribe?token=<unsubscribe_token>`)
     bauen, Mail via Resend als Text + HTML senden (HTML per `escapeHtml`
     abgesichert). Bei Erfolg `impulse_index` auf `idx + 1` erhöhen (`sent`).
     Sendefehler werden geloggt und gezählt (`failed`), der Lauf bricht nicht
     ab.
6. **Response:** JSON. Erfolg → `200` `{ ok: true, total, sent, failed,
   skipped }`. Sonst `401` (nicht autorisiert), `503` (`not_configured`),
   `500` (DB-Fehler).
7. **Konfiguriert:** `CRON_SECRET` (Pflicht, schützt die Route),
   `RESEND_API_KEY` (Pflicht), `SUPABASE_SERVICE_ROLE_KEY` (+ URL, Pflicht),
   `IMPULSE_FROM`/`CONTACT_FROM` (Absender, optional), Tabelle `profiles`.
   `runtime = "nodejs"`, `dynamic = "force-dynamic"`. Sicherheit: Route ist
   **nicht** über den Proxy geschützt (`/api` ausgenommen) und daher selbst per
   `CRON_SECRET` abgesichert; timing-safe Secret-Vergleich; HTML-Escaping.

---

## `/api/impulses/unsubscribe`

1. **Route / Datei:** `/api/impulses/unsubscribe` — `src/app/api/impulses/unsubscribe/route.ts`
2. **HTTP-Methoden:** `GET`.
3. **Zweck:** 1-Klick-Abmeldung von den wöchentlichen E-Mail-Impulsen (DSGVO),
   öffentlich über den Token aus dem Abmeldelink – keine Anmeldung nötig.
4. **Request:** Query-Parameter `token` (das `unsubscribe_token` am Profil).
5. **Ablauf & Logik:**
   - Fehlt der Token → HTML „Link unvollständig" (`400`).
   - Ohne Supabase → HTML „Gerade nicht möglich" (`503`).
   - `update` auf `profiles` per `unsubscribe_token`: `newsletter_opt_in:
     false`, `newsletter_opted_in_at: null`; `select("id")` zur Trefferprüfung.
   - Kein Treffer/Fehler → HTML „Link ungültig oder bereits abgemeldet"
     (`404`).
6. **Response:** HTML-Seite (`text/html`). `200` „Erfolgreich abgemeldet";
   sonst `400` / `404` / `503`.
7. **Konfiguriert:** Supabase-Service-Role (Pflicht), Tabelle `profiles`.
   `runtime = "nodejs"`, `dynamic = "force-dynamic"`. Sicherheit: Token als
   Zugangsschlüssel; setzt das Opt-in per Service-Role-Key zurück.

---

## `/api/kontakt`

1. **Route / Datei:** `/api/kontakt` — `src/app/api/kontakt/route.ts`
2. **HTTP-Methoden:** `POST`.
3. **Zweck:** Versand des Kontaktformulars über Resend – Benachrichtigung an
   den Betreiber und eine automatische Bestätigung an den Absender.
4. **Request:** `POST` mit `Content-Type: application/json`, Body:
   `{ name, email, message, company?, thema? }`. `company` ist der Honeypot;
   `thema` ist optional (z. B. „mitgliedschaft", „buch"; auf 60 Zeichen gekürzt).
5. **Ablauf & Logik:**
   1. **Rate-Limit:** In-Memory pro IP (`x-real-ip`, sonst letzter
      `x-forwarded-for`-Eintrag), max. 5 / 10 Minuten → sonst `429` (jede
      Anfrage löst bis zu zwei Resend-Aufrufe aus).
   2. JSON parsen (Fehler → `400`); Felder trimmen; `thema` auf 60 Zeichen
      begrenzen.
   3. **Honeypot** (`company`) ausgefüllt → still verwerfen, `{ ok: true }`.
   4. Pflichtfelder prüfen (`name`, `email`, `message`) → sonst `400`;
      E-Mail-Format prüfen → sonst `400`; `message` > 5000 Zeichen → `400`.
   5. Fehlt `RESEND_API_KEY` → `503` mit `code: "not_configured"`.
   6. Alle Werte per `escapeHtml` absichern (HTML-Mail).
   7. **Mail 1 (Pflicht):** Benachrichtigung an `CONTACT_TO` (Standard
      `site.email`) mit `replyTo: <email>`; Betreff enthält optional das Thema.
      Fehler → `502`.
   8. **Mail 2 (optional):** automatische Bestätigung an den Absender; Fehler
      werden nur geloggt (unkritisch).
6. **Response:** JSON. `200` `{ ok: true }`; `400` (Validierung); `429`
   (Rate-Limit); `502` (Benachrichtigung fehlgeschlagen); `503`
   (`not_configured`).
7. **Konfiguriert:** `RESEND_API_KEY` (Pflicht), `CONTACT_TO` (Empfänger,
   Standard `site.email`), `CONTACT_FROM` (Absender). `runtime = "nodejs"`.
   Sicherheit: In-Memory-Rate-Limit, Honeypot, Feld-/Längenvalidierung,
   HTML-Escaping, `x-real-ip` bevorzugt (nicht fälschbar).

---

## `/api/stripe/webhook`

1. **Route / Datei:** `/api/stripe/webhook` — `src/app/api/stripe/webhook/route.ts`
2. **HTTP-Methoden:** `POST` (Endpoint für Stripe-Events).
3. **Zweck:** Zentraler Stripe-Webhook: hält die Mitgliedschaft in Supabase
   aktuell und stößt die Zustellung nach Buch-Käufen sowie die
   Zugangsbereitstellung an.
4. **Request:** Roher Request-Body (Stripe-Event) plus Header
   `stripe-signature`. Der Body wird als Text gelesen (nötig für die
   Signaturprüfung).
5. **Ablauf & Logik (Zahlungsfluss):**
   - Fehlt Stripe-Client oder `STRIPE_WEBHOOK_SECRET` → `503`
     (`not_configured`).
   - **Signaturprüfung:** `stripe.webhooks.constructEvent(body, signature,
     STRIPE_WEBHOOK_SECRET)`. Schlägt sie fehl → `400` (`invalid_signature`).
   - Event-Typ auswerten:
     - **`checkout.session.completed` → `onCheckoutCompleted`:**
       - E-Mail aus `customer_details.email` / `customer_email` (lowercase);
         ohne E-Mail Abbruch.
       - **Buch-Einmalkauf** (`metadata.produkt ===
         "buch-werde-meister-deiner-gedanken"`): eigener Zweig
         `onBookPurchase` – **keine Mitgliedschaft, kein Konto**. Nur bei
         `payment_status` `paid`/`no_payment_required` wird geliefert. Ohne
         `RESEND_API_KEY` wird übersprungen. Edition `print` →
         `sendBuchPrintOrderMail` (Bestellbestätigung, Versand manuell);
         Edition `pdf` → signierter 30-Tage-Download-Token
         (`createBuchDownloadToken`, ggf. `null`) und `sendBuchPdfMail`
         (PDF-Anhang + optionaler Download-Button). **Fehler werden bewusst
         nicht verschluckt** → Webhook endet mit 500, Stripe stellt erneut zu.
       - **Abo-Kauf:** `customerId`/`subscriptionId` ermitteln; bei
         vorhandener Subscription `stripe.subscriptions.retrieve` → `status`
         und `current_period_end`. `upsertMembership` schreibt in
         `memberships` (onConflict `email`). Danach `provisionAccess(email)`
         (best-effort): `auth.admin.createUser` (idempotent, „already
         registered" wird ignoriert) und `auth.admin.generateLink({ type:
         "recovery", redirectTo: …/login })`, der Link geht per
         Willkommens-Mail (Resend) an den Nutzer zum Passwort-Setzen.
     - **`customer.subscription.updated` / `customer.subscription.deleted` →
       `onSubscriptionChanged`:** spiegelt `status` und `current_period_end`
       in `memberships` (Match über `stripe_subscription_id`). Ohne
       Service-Role-Key nur No-op.
     - andere Event-Typen → ignoriert.
   - Handler-Exception → `500` (`handler_error`), sodass Stripe erneut
     zustellt.
6. **Response:** JSON. Erfolg → `200` `{ received: true }`; `400`
   (`invalid_signature`); `500` (`handler_error` / Buch-Lieferung
   fehlgeschlagen); `503` (`not_configured`).
7. **Konfiguriert:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET` (Pflicht für
   Signaturprüfung), Supabase-Service-Role (`memberships`, Auth-Admin),
   `RESEND_API_KEY`, `MEMBERSHIP_FROM`/`CONTACT_FROM`/`BUCH_FROM`,
   `BUCH_DOWNLOAD_SECRET` (Download-Token). `runtime = "nodejs"`. Sicherheit:
   HMAC-Signaturprüfung ist Pflicht; roher Body; Idempotenz beim Konto-Anlegen;
   fehlgeschlagene Lieferungen führen bewusst zu 500 (Stripe-Retry statt
   stillem Verlust). Der Endpoint muss in Stripe auf `…/api/stripe/webhook`
   zeigen.

---

## `/rss.xml`

1. **Route / Datei:** `/rss.xml` — `src/app/rss.xml/route.ts`
2. **HTTP-Methoden:** `GET`.
3. **Zweck:** Liefert den RSS-Feed des Blogs. Quelle ist dieselbe Liste wie
   Blog und Sitemap (`src/lib/blog.ts`), sodass neue Artikel automatisch im
   Feed landen.
4. **Request:** Keine Parameter. Der Feed hängt an keiner Anfrage.
5. **Ablauf & Logik:**
   - `publishedPosts()` liefert die veröffentlichten Beiträge.
   - Pro Beitrag ein `<item>` mit `title`/`category`/`excerpt`/vollem Inhalt
     (`content:encoded`, per `blocksToHtml` aus den Blog-Blöcken erzeugt).
     Texte werden per `escapeXml`/`cdata` abgesichert; Datum via `toRfc822`
     ins RFC-822-Format übersetzt.
   - `lastBuildDate` ist das Datum des neuesten Artikels (kein
     Build-Zeitstempel), damit sich der Feed nur bei inhaltlichen Änderungen
     ändert.
6. **Response:** `200` mit XML (`Content-Type: application/rss+xml;
   charset=utf-8`, `Cache-Control: public, max-age=3600, s-maxage=3600`).
7. **Konfiguriert:** Keine Umgebungsvariablen; Metadaten aus `src/lib/site.ts`.
   `dynamic = "force-static"` (beim Build erzeugt) mit `revalidate = 3600`
   (stündliches Nachziehen, damit vorausdatierte Artikel ohne Deploy in den
   Feed rutschen). Sicherheit: XML-Escaping und CDATA gegen Feed-Injection.

---

_Stand: 2026-09-11 — automatisch dokumentiert_


---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/06-konfiguration-infrastruktur.md -->
<!-- ============================================================ -->

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


---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/07-generatoren-und-folien.md -->
<!-- ============================================================ -->

# 07 · Generatoren & Folien

Konsolidierte Übersicht **aller Generatoren, Skripte und Folien-/Präsentations-
Erzeuger** des Projekts. Verifiziert gegen den Code in `tools/` (und die von
`package.json` mitgenutzten Skripte unter `docs/`). Die ausführlichen
Detaildokumente stehen in [`docs/generatoren/`](../generatoren/) und sind am
Ende verlinkt.

---

## 1. Was sind Generatoren und wie werden sie ausgeführt?

Generatoren sind **Build-Skripte**, die aus den redaktionellen Quellen (TypeScript-
Datenmodule in `src/lib/*.ts`, Markdown unter `docs/skripte/**` und `docs/ebook/`,
JSON-Specs unter `tools/workshop/specs/` sowie fest im Skript hinterlegten Inhalten)
fertige **Artefakte** erzeugen: PDFs (E-Book, Buch, Mitglieder-Dokumente, Drehbücher,
Anleitungen), **Bilder/Marketing-Assets** (PNG/WebP), **Print-/Geschäftsausstattung**
(PDF, DOCX, HTML-Signatur) sowie **Folien/Präsentationen** (PPTX für Video-Einblendungen
und Workshops).

Es gibt zwei Aufruf-Arten:

- **npm-Scripts** (`package.json` → `scripts`): der Regelfall, z. B. `npm run pdf`.
  Node-Generatoren laufen über `node …`, einige Folien-/PDF-Generatoren über
  `python3 …` (in `scripts` bereits so hinterlegt, z. B. `video-folien` und
  `buchcover`).
- **Direkte Aufrufe** ohne npm-Script: manche Generatoren startet man von Hand,
  z. B. `python3 tools/pdf/build-ebook-gedanken.py` oder
  `node tools/pdf/anleitung-stripe.mjs [zielordner]`. Viele akzeptieren ein
  optionales **Ausgabe-Verzeichnis als erstes Argument** (`process.argv[2]`).

**Technische Grundlagen**

- **Node** (ESM) für alle `.mjs`-Generatoren; **Python 3** für die `.py`-Skripte.
- **Chromium/Chrome** für alle Skripte, die HTML zu PDF/PNG rendern. Gesucht wird
  einheitlich über `findChrome()`: `CHROME_BIN` → Playwright-Chromium →
  `PLAYWRIGHT_BROWSERS_PATH` bzw. `/opt/pw-browsers` → System-`chromium`/`chrome`.
  In dieser Umgebung ist Chromium unter `/opt/pw-browsers` vorinstalliert.
- **npm-Pakete:** `playwright` (Chromium-Pfad/Screenshots), `pdf-lib` (PDF-Merge in
  `generate.mjs`), `sharp` (WebP/Galerie, Bild-Freistellung), `docx` (Word-Vorlage),
  `typescript` (TS→JSON in `extract-content.mjs`).
- **Python-Pakete:** `python-pptx` + `Pillow` (Workshop- und Video-Folien),
  `pymupdf`/`fitz` (nur `buchcover-png.py`, PDF→PNG). Die E-Book-/Buch-/Member-/
  Brandbook-Python-Skripte nutzen sonst nur die Standardbibliothek.
- **System-Binaries:** `zip`/`unzip` (nur Galerie-Build).
- **Env-Schalter** (häufig): `CHROME_BIN`, `PLAYWRIGHT_BROWSERS_PATH`, `KEEP_HTML`
  (temporäres HTML behalten), `SCALE` (Auflösungsfaktor bei Marketing-Rendern),
  `THEME`/`ONLY` (Teilmengen), `REPO_ROOT`/`BUILD_DIR` (Python-Pipelines).
- Website-Secrets aus `.env.local.example` (Supabase, Resend, Stripe) betreffen
  **nur die Runtime**, nicht die Generatoren.

---

## 2. Übersichtstabelle (aus `package.json` + direkte Aufrufe)

### npm-Scripts

| npm-Script | Skript-Datei | Erzeugt | Ausgabe-Verzeichnis |
|---|---|---|---|
| `npm run pdf` | `tools/pdf/generate.mjs` (+ `extract-content.mjs`, `build-ebook.py`, `build-member.py`) | Gratis-E-Book „7 Stufen" + alle Mitglieder-PDFs (Lektionen, Übungen, Vertiefungen, Arbeitsheft) | `public/Die-7-Stufen-…​.pdf`, `content/pdf/*.pdf` |
| `npm run pdf:brandbook` | `tools/pdf/build-brandbook.mjs` (+ `build-brandbook.py`) | Brandbook als PDF | `docs/brandbook/WMDG-Brandbook.pdf` |
| `npm run pdf:buch` | `tools/pdf/build-buch.mjs` (+ `build-buch.py`) | Vollständiges Buch „Werde Meister deiner Gedanken" (5 Teile, 24 Kapitel) als PDF | `content/pdf/Werde-Meister-deiner-Gedanken.pdf` |
| `npm run buchcover` | `tools/pdf/buchcover-png.py` | Buch-Titelseite als PNG (A4 @ 300 dpi) | `content/pdf/Werde-Meister-deiner-Gedanken-Cover.png` |
| `npm run reel-drehbuch` | `tools/pdf/reel-drehbuch.mjs` | Reel-Drehbücher (5 Serien + „Alle Serien") als PDF | `docs/workshop/reel-skripte/` |
| `npm run langvideo-drehbuch` | `tools/pdf/langvideo-drehbuch.mjs` | Langvideo-Drehbücher „Ablesen" + „Stichpunkt" | **Projekt-Root** (Default) |
| `npm run willkommen-skript` | `tools/pdf/willkommen-skript.mjs` | Willkommensvideo-Skript (Dashboard) als PDF | `docs/skripte/willkommen/` |
| `npm run videoskripte-md` | `tools/pdf/videoskripte-markdown.mjs` | Videoskripte als gebündelte Markdown-Dateien | `docs/skripte/videoskripte/` |
| `npm run video-folien` | `tools/video/foliensatz.py` | **7 PowerPoint-Decks** (On-Screen-Folien für Videos: 1× 16:9-Langvideo, 1× Teaser-Reel, 5× Reel-Serien) | `docs/video/` |
| `npm run covers` | `docs/reels/covers/build.mjs` | Reel-/Feed-Cover als gebrandetes HTML (5 Formate) | `docs/reels/covers/**` |
| `npm run covers:png` | `docs/reels/covers/export-png.mjs` | Cover-PNGs **+** transparente Overlay-Ebenen (Chromium) | `docs/reels/covers/export/**`, `…/export-overlay/**` |
| `npm run carousels:slides` | `docs/carousels/build.mjs` | Carousel-Slides als HTML (3 Formate) | `docs/carousels/build/**` |
| `npm run carousels:png` | `docs/carousels/export-png.mjs` | Carousel-PNGs **+** Overlay-Ebenen (baut vorab selbst neu) | `docs/carousels/export/**`, `…/export-overlay/**` |
| `npm run endcard` | `docs/reels/covers/endcard.mjs` | Outro-/Endcards (nur HTML/CSS, kein PNG) | `docs/reels/covers/endcard/` |
| `npm run brand-assets` | `docs/marketing/brand-assets.mjs` | Marken-Assets: Profil/Avatar, Kanalbilder, YouTube-Thumbnails, Zitat-/Studien-Kacheln, E-Book-Post, Story (mehrere Formate) — **`SCALE=2` verwenden** | `docs/marketing/**` |
| `npm run story-overlays` | `tools/marketing/story-overlays.mjs` | Titel-Overlays „Persönliche Geschichten" (transparent + Marken-Hintergrund, 3 Formate) | `docs/marketing/story-overlays/**` |
| `npm run story-carousels` | `tools/marketing/story-carousels.mjs` | Komplette Bild-Geschichten (Titel-Overlay + Body-/CTA-Slides) | `docs/marketing/story-carousels/**` |
| `npm run content-overlays` | `tools/marketing/content-overlays.mjs` | Overlays für „Zitate" & „Studien-Fakten" (transparent + Hintergrund, 3 Formate) | `docs/marketing/content-overlays/**` |
| `npm run whatsapp:mitgliedschaft` | `tools/marketing/whatsapp-mitgliedschaft.mjs` | WhatsApp-Verkaufsserie (7 Folien, 4:5 + 9:16, Overlay + Hintergrund) | `docs/marketing/whatsapp-mitgliedschaft/**` |
| `npm run whatsapp:safezone` | `docs/marketing/whatsapp-safezone.mjs` | WhatsApp-Business-Banner mit eingezeichneter Safe-Zone (1920×1080) | `docs/marketing/**` |
| `npm run marketing:all` | Orchestrator | Kette: `brand-assets` → `content-overlays` → `story-overlays` → `story-carousels` → `whatsapp:mitgliedschaft` → `vorlagen:galerie` | s. o. + `content/vorlagen/` |
| `npm run vorlagen:galerie` | `tools/vorlagen/build-gallery.mjs` (+ `marketing-carousels.mjs`, `bild-jobs.mjs`) | Baut die Admin-Galerie neu: webp/ZIP + Katalog (**destruktiv**) | `content/vorlagen/**`, `src/lib/vorlagen-assets.ts` |
| `npm run gold-emblem` | `tools/print/gold-emblem.mjs` (+ Kette `logo-lockup.mjs`) | Optimiertes Gold-Emblem fürs Einbetten (240 px) | `public/email/wmdg-signatur-logo.png` |
| `npm run logo-lockup` | `tools/print/logo-lockup.mjs` | Volles Logo-Lockup (Emblem + Wortmarke, echter Verlauf) als transparentes PNG | `public/email/wmdg-logo-lockup.png` |
| `npm run print` | `tools/print/geschaeftsausstattung.mjs` | Visitenkarte (2-seitig) + Briefpapier (leer + Muster) als druckfertige PDFs + Vorschau-PNGs | `tools/print/out/` |
| `npm run signatur` | `tools/print/email-signatur.mjs` | E-Mail-Signatur: Anleitungsseite, hell/dunkel-Snippets, Text-Fallback, Vorschau-PNGs | `tools/print/out/` |
| `npm run briefpapier:word` | `tools/print/briefpapier-word.mjs` | Briefpapier als beschreibbare Word-Vorlage | `tools/print/out/WMDG-Briefpapier-Vorlage.docx` |

### Nur direkt aufrufbar (kein npm-Script)

| Aufruf | Skript-Datei | Erzeugt | Ausgabe-Verzeichnis |
|---|---|---|---|
| `python3 tools/pdf/build-ebook.py` | `build-ebook.py` | HTML des Gratis-E-Books (wird von `generate.mjs` gerendert) | `tools/pdf/.build/ebook.html` |
| `python3 tools/pdf/build-ebook-gedanken.py` | `build-ebook-gedanken.py` | HTML des 2. E-Books „Die Gedanken, die nicht deine sind" (PDF-Schritt manuell) | `tools/pdf/.build/ebook-gedanken.html` |
| `node tools/pdf/carousel-texte.mjs [ziel]` | `carousel-texte.mjs` | Carousel-Texte je Serie als PDF + „Alle Serien" | `docs/workshop/carousel-texte/` (Default) |
| `node tools/pdf/intro-video-drehbuch.mjs [ziel]` | `intro-video-drehbuch.mjs` | Intro-/Teaser-Video-Drehbuch als PDF | **Projekt-Root** (Default) |
| `node tools/pdf/anleitung-stripe.mjs [ziel]` | `anleitung-stripe.mjs` | Anleitung „Stripe-Mitgliedschaft einrichten" als PDF | `docs/workshop/anleitungen/` (Default) |
| `node tools/pdf/praxis-sprecherskript.mjs [ziel]` | `praxis-sprecherskript.mjs` (+ `praxis-skripte-data.mjs`) | 13 Sprecher-Skripte „Praxis mit Stimme" + Gesamtmappe + Aufnahme-Leitfaden als PDF | `docs/mitglieder/sprecherskripte/` (Default) |
| `python3 tools/pdf/build-reel-skripte.py` | `build-reel-skripte.py` | „Reel-Skripte · Die 7 Stufen" als HTML (Web + Print-HTML mit eingebetteten Fonts) | `docs/skripte/reels/reel-skripte-7-stufen.html`, `.build/…print.html` |
| `node docs/marketing/social-banners.mjs` | `social-banners.mjs` | Kanal-Banner (YouTube, Facebook, Instagram-Story) | `docs/marketing/**` |
| `node docs/marketing/video-thumbnails.mjs` | `video-thumbnails.mjs` | 16:9-Thumbnails je Inhalt (Titel live aus TS) | `public/video-thumbnails/**` |
| `SCALE=2 node docs/carousels/marketing-serien.mjs` | `marketing-serien.mjs` | 5 Marketing-Carousels (HTML + PNG in einem Lauf) | `docs/carousels/export/<serie>/**` |
| `node docs/carousels/stufen-ueberblick.mjs` | `stufen-ueberblick.mjs` | 9-Slide-Carousel „Die 7 Stufen deiner Meisterschaft" | `docs/carousels/export/stufen-ueberblick/**` |
| `node tools/marketing/personal-brand.mjs` | `personal-brand.mjs` | Persönliche Marken-Grafik (freigestelltes Foto auf Marken-Hintergrund) | `docs/marketing/personal/**` |
| `node tools/vorlagen/marketing-carousels.mjs` | `marketing-carousels.mjs` | Marketing-Carousels **non-destruktiv** in die Galerie (Standalone-Modus) | `content/vorlagen/carousels/marketing__*` |
| `node tools/images/eisvogel-transparent.mjs [src] [ziel]` | `eisvogel-transparent.mjs` | Eisvogel freistellen → transparentes WebP (Footer) | `public/eisvogel-gold.webp` (Default) |
| `node tools/images/schneeleopard-webp.mjs [src] [ziel]` | `schneeleopard-webp.mjs` | Schneeleopard trimmen/verkleinern → transparentes WebP (Footer) | `public/schneeleopard.webp` (Default) |
| `python3 tools/workshop/build.py <spec.json> …` | `tools/workshop/build.py` | Pro Spec: **Workshop-PPTX (16:9)** + Workbook-PDF + Moderationsplan-PDF | `docs/workshop/<slug>/` (+ Spiegel `content/vorlagen/workshop/`) |

**Reine Datenmodule / Helfer** (kein eigener Lauf, werden importiert):
`tools/pdf/praxis-skripte-data.mjs`, `tools/pdf/extract-content.mjs` (via `generate.mjs`),
`tools/print/marke.mjs` (Kontakt-/Markendaten, Single Source of Truth für `tools/print/*`),
`tools/vorlagen/bild-jobs.mjs` (Parallelität + WebP-Optionen für den Galerie-Build),
`docs/marketing/content-data.mjs` (Zitate/Fakten), `docs/reels/covers/data.mjs`,
`docs/carousels/data.mjs`, `docs/_glyphs.mjs` (gezeichnete Sonderzeichen →/≠/⋯).

---

## 3. Generatoren nach Kategorie

### 3.1 PDF-Generatoren (`tools/pdf/`)

Gemeinsam: HTML → Headless-Chromium `--print-to-pdf`; Chromium via `findChrome()`;
Zwischen-HTML in `tools/pdf/.build/` (git-ignoriert); Schriften Fraunces/Inter
eingebettet aus `tools/pdf/assets/fonts.css`.

- **`generate.mjs` — Haupt-Pipeline (`npm run pdf`).**
  Orchestriert `extract-content.mjs` (TS → `.build/content.json` via `typescript`),
  `build-ebook.py` und `build-member.py`, rendert deren HTML zu PDF und **mergt**
  das Arbeitsheft (Cover + Innenteil) mit `pdf-lib`.
  Datenquelle: `src/lib/{content,stage-lessons,deep-dives}.ts` (für die Mitglieder-
  PDFs); das E-Book selbst trägt seine Texte fest im Skript.
  Ausgabe: `public/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf` (Lead-Magnet) und
  `content/pdf/*.pdf` (`stufe-1..7-lektion`, `stufe-1..7-uebungen`,
  `vertiefung-<slug>`, `arbeitsheft`). Mitglieder-PDFs bewusst nach `content/pdf/`
  (Login-Schutz), nicht `public/`.
  Voraussetzungen: Node, Python 3, Chromium, `pdf-lib`, `playwright`, `typescript`;
  Assets `public/logo-brain.png`, `public/heiko-portrait.webp`,
  `assets/brain-freigestellt.png`.

- **`build-ebook.py` — Gratis-E-Book „7 Stufen".** Erzeugt das HTML (bewusst
  gekürzte Fassung, Texte fest im Skript in `STAGES_FULL`/`COVER`/…). Läuft über
  `npm run pdf`. Nur Python-Stdlib.

- **`build-ebook-gedanken.py` — E-Book „Die Gedanken, die nicht deine sind".**
  Inhalt aus Markdown (`docs/ebook/die-gedanken-die-nicht-deine-sind.md`, per Env
  `EBOOK_MD` überschreibbar). **Kein npm-Script, nicht in `generate.mjs`** — HTML
  danach separat zu PDF rendern.

- **`build-buch.py` + `build-buch.mjs` — Vollständiges Buch (`npm run pdf:buch`).**
  Quelle ausschließlich `docs/ebook/werde-meister-deiner-gedanken.md` (reine
  Leserfassung; `docs/ebook/intern/` ist bewusst ausgeschlossen). Aufbau: Titelseite,
  Autoren-Hinweis, generiertes Inhaltsverzeichnis, Teil-Trennseiten, Kapitel,
  Schlusswort, Anhang. Ausgabe `content/pdf/Werde-Meister-deiner-Gedanken.pdf`.
  Nutzt `tools/pdf/assets/cover-treppe.png` als Cover-Motiv, sonst Fallback auf das
  goldene Gehirn.

- **`buchcover-png.py` — Buchcover als PNG (`npm run buchcover`).**
  Stellt via `build-buch.py` das Buch-HTML sicher, löst die `<section class="cover">`
  heraus, rendert sie als 1-seitige A4-PDF und rastert sie mit **PyMuPDF** zu PNG
  (`content/pdf/…-Cover.png`, 2479×3508 @ 300 dpi; DPI per Env `BUCHCOVER_DPI`).
  Zusätzliche Voraussetzung: `pip install pymupdf`.

- **`build-brandbook.py` + `build-brandbook.mjs` — Brandbook (`npm run pdf:brandbook`).**
  Erzeugt das Brandbook im Mitglieder-PDF-Design (Deckblatt, Inhaltsverzeichnis,
  ein Kapitel je Abschnitt). Ausgabe `docs/brandbook/WMDG-Brandbook.pdf`. Assets:
  `public/logo-brain-gold.png`, `public/logo-full.png`, `fonts.css`.

- **`build-member.py` — Mitglieder-Dokumente.** Baut aus `.build/content.json` das
  HTML aller Lektionen/Übungen/Vertiefungen + Arbeitsheft-Cover/-Innenteil und ein
  `m-manifest.json`. Läuft über `npm run pdf`. Verlangt genau eine Lesson je
  Stage-`number`.

- **`reel-drehbuch.mjs` — Reel-Drehbücher (`npm run reel-drehbuch [ziel]`).**
  Bündelt 5 Serien (Tokens: `7-Stufen`, `Praxis`, `Vertiefungen`,
  `Mentale-Selbstverteidigung`, `Wissenschaft`) + „Alle-Serien" zu PDFs.
  Quelle: `docs/skripte/reels/*.md`. Default-Ausgabe `docs/workshop/reel-skripte/`.

- **`carousel-texte.mjs` — Carousel-Texte als PDF** (kein npm-Script).
  Quelle: `docs/skripte/carousels/{stufen,praxis,vertiefungen,selbstverteidigung}.md`
  (`marketing.md` **nicht**). Default-Ausgabe `docs/workshop/carousel-texte/`.

- **`langvideo-drehbuch.mjs` — Langvideo-Drehbücher (`npm run langvideo-drehbuch [ziel]`).**
  Zwei PDFs „Ablesen" (Teleprompter) und „Stichpunkt". Quelle: `docs/skripte/`
  (`stufen-komplett/`, `praxis/`, `vertiefungen-komplett/` bzw. `stufen/`,
  `vertiefungen/`). **Default-Ausgabe: Projekt-Root** — für die Galerie ein
  `docs/workshop/`-Ziel übergeben.

- **`intro-video-drehbuch.mjs` — Intro-/Landing-Video** (kein npm-Script).
  Quelle: `docs/skripte/landing/{intro,reel}-nicht-deine-schuld.md`. Ausgabe
  `WMDG-Video-Drehbuch-Intro.pdf`, **Default: Projekt-Root**.

- **`willkommen-skript.mjs` — Willkommensvideo (`npm run willkommen-skript [ziel]`).**
  Text 1:1 aus `docs/skripte/willkommen/dashboard-willkommen.md`. Ausgabe
  `Willkommensvideo-Dashboard.pdf` in `docs/skripte/willkommen/` (Default).

- **`praxis-sprecherskript.mjs` — „Praxis mit Stimme"** (kein npm-Script).
  13 Einzel-PDFs + Gesamtmappe + Aufnahme-Leitfaden. Datenquelle
  `praxis-skripte-data.mjs` (gesprochene Fassung der 13 Übungen aus
  `src/lib/practices.ts`). Default-Ausgabe `docs/mitglieder/sprecherskripte/`
  (Unterordner `einzel/`).

- **`videoskripte-markdown.mjs` — Videoskripte als Markdown (`npm run videoskripte-md [ziel]`).**
  Bündelt dieselben Quellen wie die Video-Drehbuch-PDFs zu je einer zusammen-
  hängenden `.md`. Default-Ausgabe `docs/skripte/videoskripte/`. Kein Chromium
  (reines Markdown).

- **`build-reel-skripte.py` — Reel-Skripte-Heft** (kein npm-Script).
  Quelle `tools/pdf/assets/reel-source.html` (`<main>`-Block der 21 Reels). Erzeugt
  eine Web-HTML (`docs/skripte/reels/reel-skripte-7-stufen.html`, Google-Fonts) und
  eine Print-HTML mit eingebetteten Fonts in `.build/`; PDF danach per Chromium.

- **`anleitung-stripe.mjs` — Stripe-Anleitung** (kein npm-Script).
  Ein gebrandetes PDF, Inhalt inline; nutzt `ARROW`/`DOTS` aus `docs/_glyphs.mjs`.
  Default-Ausgabe `docs/workshop/anleitungen/` (Galerie nimmt es im Workshop-Tab auf).

### 3.2 Marketing-Assets (`tools/marketing/` + `docs/marketing/`)

Zwei Familien: **Overlay-Renderer** in `tools/marketing/` (erzeugen transparente
Text-Ebenen + passenden Marken-Hintergrund zum Unterlegen eigener Fotos in Canva)
und **Bild-Renderer** in `docs/marketing/` (fertige PNGs). Alle rendern per
Playwright/Chromium.

- **`tools/marketing/story-overlays.mjs` (`npm run story-overlays`)** — Titel-Overlays
  „Persönliche Geschichten"; Texte inline (`STORIES`). Ausgabe
  `docs/marketing/story-overlays/<format>/*.png`.
- **`tools/marketing/content-overlays.mjs` (`npm run content-overlays`)** — Overlays
  für „Zitate"/„Studien-Fakten"; Daten aus `docs/marketing/content-data.mjs`.
  Ausgabe `docs/marketing/content-overlays/<serie>/<format>/*.png`.
- **`tools/marketing/story-carousels.mjs` (`npm run story-carousels`)** — komplette
  Bild-Geschichten (Titel-Overlay + Body-/CTA-Slides); Texte inline (`STORIES`).
  Ausgabe `docs/marketing/story-carousels/<slug>/<format>/`.
- **`tools/marketing/whatsapp-mitgliedschaft.mjs` (`npm run whatsapp:mitgliedschaft`)**
  — 7-teilige Verkaufsserie (Hook → Problem → 7 Stufen → Inhalte → Ablauf → Preis →
  CTA) in 4:5 + 9:16, mit Overlay- und Hintergrund-Ebenen; vier Farbwelten (Env
  `THEME`). Texte inline (`SLIDES`). Ausgabe `docs/marketing/whatsapp-mitgliedschaft/`.
- **`tools/marketing/personal-brand.mjs`** (kein npm-Script) — freigestelltes Foto
  auf Marken-Hintergrund. Eingabe `docs/marketing/_input/portrait.png` (bzw. Env
  `PORTRAIT`, Fallback `public/heiko-hero.webp`). Env `SCALE`, `THEME`. Ausgabe
  `docs/marketing/personal/`.
- **`docs/marketing/brand-assets.mjs` (`npm run brand-assets`)** — Profil/Avatar,
  Kanalbild, YouTube-Thumbnails, Zitat-/Studien-Kacheln, E-Book-Post, Story.
  Zitate/Fakten aus `docs/marketing/content-data.mjs`. **`SCALE=2` ist Pflicht**
  (Default 1 halbiert die Assets stillschweigend); Teilmenge via `ONLY`.
- **`docs/marketing/social-banners.mjs`** (kein npm-Script) — Kanal-Banner
  (YouTube/Facebook/Instagram-Story), Inhalte inline; `@2x` bei `retina`.
- **`docs/marketing/video-thumbnails.mjs`** (kein npm-Script) — 16:9-Thumbnails,
  Titel live aus `src/lib/{content,deep-dives,practices}.ts`; Ausgabe nach
  `public/video-thumbnails/` (direkt als Video-Poster).
- **`docs/marketing/whatsapp-safezone.mjs` (`npm run whatsapp:safezone`)** —
  Business-Banner mit eingezeichneter Safe-Zone (1920×1080).

> Sonderzeichen: `→`, `≠`, `⋯` fehlen im eingebetteten Schrift-Subset und kommen
> als Inline-SVG aus `docs/_glyphs.mjs` — nie als Textzeichen ins gerenderte Markup.

### 3.3 Print / Geschäftsausstattung (`tools/print/`)

Kontakt-/Markendaten zentral in `tools/print/marke.mjs` (Single Source of Truth;
`CONTACT.phone = ""` blendet die Telefonzeile überall aus). Rendering via
Playwright/Chromium, Schriften aus `tools/pdf/assets/fonts.css`, Emblem aus
`public/logo-brain-gold.png`. Ausgabe durchweg nach `tools/print/out/`.

- **`geschaeftsausstattung.mjs` (`npm run print`)** — Visitenkarte (2-seitig,
  85×55 mm + 3 mm Beschnitt, Schnittmarken) + Briefpapier (leer + Muster) als
  Vektor-PDFs (Merge via `pdf-lib`) + Vorschau-PNGs.
- **`email-signatur.mjs` (`npm run signatur`)** — Anleitungsseite, hell/dunkel-
  Snippets, `.txt`-Fallback, Vorschau-PNGs. Logo als gehostetes Bild
  (`…/email/wmdg-signatur-logo.png`, erst nach Deploy erreichbar). Websichere
  Schriften, Inline-Styles.
- **`briefpapier-word.mjs` (`npm run briefpapier:word`)** — beschreibbare
  `.docx`-Vorlage (`docx`-Paket) mit wiederkehrendem Kopf/Fuß; Logo als Bild aus
  `public/email/wmdg-logo-lockup.png`.
- **`gold-emblem.mjs` (`npm run gold-emblem`)** — optimiertes 240-px-Gold-Emblem
  aus `public/logo-brain-gold-freigestellt.png` (via `sharp`) →
  `public/email/wmdg-signatur-logo.png`.
- **`logo-lockup.mjs` (`npm run logo-lockup`)** — volles Logo-Lockup (Emblem +
  Wortmarke mit echtem Verlauf) als transparentes PNG →
  `public/email/wmdg-logo-lockup.png` (fürs Einbetten in Word).

> Bei geändertem Basis-Emblem einmal `npm run gold-emblem` und danach
> `npm run logo-lockup` laufen lassen.

### 3.4 Bilder (`tools/images/`)

Reine `sharp`-Skripte (kein Chromium). Beide akzeptieren `[quelle] [ziel]` als
Argumente.

- **`eisvogel-transparent.mjs`** — stellt den goldenen Eisvogel per Flood-Fill frei
  (nur zusammenhängendes Randweiß) → `public/eisvogel-gold.webp`.
- **`schneeleopard-webp.mjs`** — trimmt/verkleinert das bereits transparente
  Schneeleopard-PNG → `public/schneeleopard.webp`. Das 11-MB-Quell-PNG liegt
  bewusst nicht mehr im Repo; zum Neubau die Quelle wieder bereitstellen.

### 3.5 Vorlagen-Galerie (`tools/vorlagen/`)

- **`build-gallery.mjs` (`npm run vorlagen:galerie`)** — baut die Admin-Galerie
  `/admin/vorlagen` **komplett neu**: sammelt fertige Dateien aus `docs/**`
  (Social-PNGs, Reel-Cover, Carousels, Overlays, Workshop-PPTX/PDF), wandelt sie via
  `sharp` in webp/ZIP, schreibt nach `content/vorlagen/**` und erzeugt den Katalog
  `src/lib/vorlagen-assets.ts`. **Destruktiv** (löscht `content/vorlagen/` zu Beginn).
  Voraussetzungen: `sharp`, `zip`/`unzip` (kein Chromium). Nutzt `bild-jobs.mjs`
  (begrenzte Parallelität, alpha-bewusste WebP-Optionen) und `marketing-carousels.mjs`.
  > Läuft ein Schritt ohne vorbefüllte Quellordner (z. B. `docs/carousels/export/`
  > existiert erst nach `carousels:png`), trägt er **still 0 Einträge** ein.
- **`marketing-carousels.mjs`** — zwei Modi: importiert vom Vollbau **oder**
  standalone (`node …`) **non-destruktiv/idempotent** (nur `marketing__*` neu). Liest
  `docs/carousels/export/<key>/**` + Captions aus `docs/skripte/`.
- **`bild-jobs.mjs`** — Helfer-Modul (Warteschlange `MAX_JOBS`/`GALERIE_JOBS`,
  `webpOpts()`).
- **Server-Deploy:** `tools/deploy/update-vorlagen-galerie.sh` baut die Galerie auf
  dem Server so, dass vorhandene Reels/Carousels im Volume `/opt/website-vorlagen`
  **erhalten** bleiben (nicht einfach `npm run vorlagen:galerie` auf dem Server).

### 3.6 Video-Folien (`tools/video/foliensatz.py`) — **Folien/Präsentationen**

`npm run video-folien` (= `python3 tools/video/foliensatz.py`). Erzeugt die
**On-Screen-Einblendungen** für die Videos als editierbare PowerPoint im hellen
**Creme-Branding** der Drehbücher. Reine PPTX-Erzeugung (`python-pptx` + `Pillow`),
**kein Chromium/Node**. Idempotent — bei Skript-Änderung neu ausführen.

Sieben Decks in `docs/video/`:

| Datei | Format | Inhalt |
|---|---|---|
| `WMDG-Video-Folien.pptx` | 16:9 | Langvideos: pro Stufe Titel + Merksatz, pro Praxis Titel, pro Vertiefung Titel + Merksatz, 16× Mentale Selbstverteidigung Titel + Merksatz, plus Cover/Trenner |
| `WMDG-Video-Folien-Reel.pptx` | 9:16 | Teaser-Reel „Nicht deine Schuld" |
| `WMDG-Video-Folien-Reels-7-Stufen.pptx` | 9:16 | Reel-Serie „Die 7 Stufen" |
| `WMDG-Video-Folien-Reels-Vertiefungen.pptx` | 9:16 | Reel-Serie „Vertiefungen" |
| `WMDG-Video-Folien-Reels-Praxis.pptx` | 9:16 | Reel-Serie „Praxis-Übungen" |
| `WMDG-Video-Folien-Reels-Wissenschaft.pptx` | 9:16 | Reel-Serie „Die Wissenschaft dahinter" |
| `WMDG-Video-Folien-Reels-Selbstverteidigung.pptx` | 9:16 | Reel-Serie „Wie dein Denken gelenkt wird" |

Datenquelle → Folie: dieselben Markdown-Skripte wie die Drehbücher
(`docs/skripte/stufen-komplett/`, `praxis/`, `vertiefungen-komplett/`, `landing/`,
`reels/`). Folientexte werden aus den `[Regie]`-Einblende-Cues bzw. Merksätzen
gezogen. Neue Reel-Serie = einen Eintrag in `REEL_SERIES` ergänzen. Font-Namen
`Fraunces`/`Inter` werden referenziert, aber nicht eingebettet — fehlen sie, ersetzt
PowerPoint sie (Layout/Farben/Text bleiben korrekt). Logo:
`tools/pdf/assets/brain-freigestellt.png`.

### 3.7 Workshop-Präsentationen / Folien (`tools/workshop/`) — **Folien/Präsentationen**

`python3 tools/workshop/build.py <spec.json> [<spec2.json> …]` (Spec-Auswahl nur über
Positions-Argumente; ohne Argument Exit-Code 1). Pro Spec entstehen **drei**
gebrandete Artefakte unter `docs/workshop/<slug>/`:

- `WMDG-Workshop-<fileStem>.pptx` — editierbare PowerPoint (16:9, mit Sprecher-Notizen)
- `WMDG-Workbook-<fileStem>.pdf` — Teilnehmer-Workbook (A4)
- `WMDG-Moderationsplan-<fileStem>.pdf` — Ablauf-/Moderationsplan (A4)

Alle drei werden zusätzlich nach `content/vorlagen/workshop/` gespiegelt (überschreibt
gleichnamige Dateien). Voraussetzungen: Python 3, `python-pptx`, `Pillow`,
`playwright` (für die PDF-Rendering-Schritte). Chromium: fest gesuchter Pfad
`/opt/pw-browsers/chromium-1194/chrome-linux/chrome`, sonst Playwright-Standard.
Schriften: PPTX referenziert Cambria/Calibri (System), die PDFs betten Fraunces/Inter
aus `tools/pdf/assets/fonts.css` ein (wird beim Import gelesen — muss existieren).
Bilder fest aus `tools/workshop/assets/` (`bg-title.png`, `bg-divider.png`,
`brain.png`, `circle.png`). Ausgabeort ergibt sich aus `slug`/`fileStem` **in der
Spec**, nicht aus dem Argument-Dateinamen.

**Foliensatz (fixe Reihenfolge):** Titel → Agenda → Kernbotschaft → Ausgangspunkt/
Kennzahl → Übung 1 → Kapitel-Divider → Themen-Überblick → **je eine Folie pro
`module`-Eintrag** → Übung 2 → Zusammenfassung → Angebot → Abschluss.
Folienzahl = **11 feste Folien + 1 Folie je `module`**.

**Spec-Format (`specs/*.json`).** Ein einzelnes JSON-Objekt; alle vier Specs teilen
exakt dasselbe Schema. Keine Bildpfade in der Spec (Bilder fest verdrahtet).
Nummerierungen entstehen automatisch (Array-Indizes bzw. `badge`). Fehlt `notes`,
setzt der Code je Folientyp einen deutschen Standard-Notiztext.

- **Top-Level-Metadaten (Strings):** `slug`, `fileStem`, `eyebrow`, `title1`,
  `title2` (teal akzentuiert), `subtitle`, `author`, `format`, `dauer`, `gruppe`,
  `leitung`.
- **Inhalts-Blöcke (je ein Slide-Typ):** `agenda` (Array `{title, desc}`),
  `kernbotschaft` (`{pre, accent, post, tail?}`), `ausgangspunkt`
  (`{kicker, title, p1, p2, metricPre, metric, metricLabel, metricNote}`),
  `uebung1`/`uebung2` (`{kicker, title, steps[], mitnehmen}`), `kapitelIntro`
  (`{kicker, title, subtitle}`), `landkarte` (`{kicker, title, items[]}`),
  `module` (Array `{badge, title, sub, body, reflexion}` — bestimmt die Folienzahl),
  `zusammenfassung` (`{kicker, title, items[]}`), `angebot`
  (`{kicker, title, features[], preis, preisSuffix, url, note}`), `abschluss`
  (`{pre, accent, post, thanks, url}`). Jeder Block erlaubt optional `notes`.
- **Nur für die PDFs:** `workbook`
  (`{coverSubtitle, intro:{body, grundKicker, grundText}, sections[]}`; `section` =
  `{kicker, title, body, uebungKicker?, steps?[], prompt, lines}`) und `moderation`
  (`{ziel[], material[], ablauf[]}`; `ablauf`-Zeile =
  `{time, dur, block, what, material?, pause?}`, `pause:true` färbt die Zeile grün).
- Fehlt ein von `build_pptx` erwarteter Key → `KeyError`.

**Die vier vorhandenen Specs:**

| Spec | slug | Thema (title1 — title2) | Format | Module | Folien |
|---|---|---|---|:---:|:---:|
| `journal.json` | `journal` | Die Kraft der Reflexion — Journaling-Halbtag | Halbtag | 7 | 18 |
| `wissensdatenbank.json` | `wissensdatenbank` | Dein Gehirn verstehen — Wissensreise | Ganztag | 10 | 21 |
| `blog.json` | `blog` | Deinen Kopf durchdenken — Blog & Deep-Dives | Ganztag | 11 | 22 |
| `bewusstseinstest.json` | `bewusstseinstest` | Wo stehst du gerade? — Bewusstseinstest | Halbtag | 7 | 18 |

### 3.8 Bild-Studios (`docs/carousels/`, `docs/reels/covers/`)

Werden über npm-Scripts (`covers`, `covers:png`, `carousels:slides`, `carousels:png`,
`endcard`) aus `package.json` mitbetrieben und speisen die Vorlagen-Galerie. Details
in [`visual-generatoren.md`](../generatoren/visual-generatoren.md):
Cover-Studio (inline-Daten in `data.mjs`, 6 Bereiche × 5 Formate) und Carousel-Studio
(MD-basiert, 4 Serien × 3 Formate). `covers:png`/`carousels:png` erzeugen im selben
Lauf zusätzlich transparente **Overlay-Ebenen** (`export-overlay/`).

---

## 4. Ausgabe-Verzeichnisse

| Zielordner | Inhalt | Versioniert? |
|---|---|---|
| `public/` | Öffentlicher Lead-Magnet `Die-7-Stufen-…​.pdf`; `video-thumbnails/`; freigestellte Bilder (`eisvogel-gold.webp`, `schneeleopard.webp`); `email/*` (Emblem/Lockup) | ja |
| `content/pdf/` | Login-geschützte PDFs: 14 Stufen-PDFs, `arbeitsheft.pdf`, 29 `vertiefung-*.pdf`, das Buch-PDF + `…-Cover.png`; zusätzlich eine Kopie des 7-Stufen-E-Books | ja |
| `content/vorlagen/` | Admin-Galerie (webp/ZIP/pptx/pdf) — **git-ignoriert**, liegt auf dem Server unter `/opt/website-vorlagen`; im frischen Clone leer | **nein** |
| `docs/brandbook/` | `WMDG-Brandbook.pdf` (+ Brandbook-Markdown) | ja |
| `docs/workshop/<slug>/` | Workshop-PPTX + Workbook-/Moderations-PDF | ja |
| `docs/workshop/{reel-skripte,carousel-texte,anleitungen}/` | Reel-Drehbücher, Carousel-Texte, Stripe-Anleitung (PDF) | ja |
| `docs/video/` | 7 Video-Folien-PPTX (16:9 + 9:16) | ja |
| `docs/marketing/**` | Marketing-PNGs + Overlays (`story-overlays/`, `story-carousels/`, `content-overlays/`, `whatsapp-mitgliedschaft/`, `personal/`, Kanal-Ordner) | ja |
| `docs/carousels/{build,export,export-overlay}/` | Carousel-HTML (`build`, versioniert) + PNG-Exporte (**git-ignoriert**) | teils |
| `docs/reels/covers/{export,export-overlay}/` | Cover-PNG-Exporte (**git-ignoriert**); HTML/Galerie versioniert | teils |
| `docs/skripte/{videoskripte,willkommen,reels}/` | gebündelte Video-Markdown, Willkommens-PDF, Reel-Skripte-HTML | ja |
| `docs/mitglieder/sprecherskripte/` | „Praxis mit Stimme"-PDFs (Einzel + Gesamtmappe + Leitfaden) | ja |
| `tools/print/out/` | Visitenkarte/Briefpapier (PDF), Signatur (HTML/TXT), Word-Vorlage (DOCX), Vorschauen | ja |
| `tools/pdf/.build/` | Zwischen-HTML/JSON der PDF-Pipeline | **nein** (git-ignoriert) |
| `src/lib/vorlagen-assets.ts` | Auto-generierter Galerie-Katalog | ja |

---

## 5. Weiterführende Detail-Dokumentation

Die folgenden Dateien in [`docs/generatoren/`](../generatoren/) enthalten die
ausführlichen Beschreibungen (Datenzugriff, Stolperfallen, Abhängigkeiten):

- [`README.md`](../generatoren/README.md) — Generator-Handbuch, Datenfluss-Diagramm,
  Reproduzierbarkeits-Reihenfolge, Umgebung/Voraussetzungen.
- [`pdf-generatoren.md`](../generatoren/pdf-generatoren.md) — PDF-Pipeline und
  Drehbücher (`tools/pdf/`).
- [`marketing-und-galerie.md`](../generatoren/marketing-und-galerie.md) —
  Marketing-Renderer und Vorlagen-Galerie.
- [`visual-generatoren.md`](../generatoren/visual-generatoren.md) — Carousels &
  Reels-Cover-Studios (`docs/carousels/`, `docs/reels/covers/`), inkl.
  Cover-Nummer↔Thema-Tabellen.
- [`video-foliensatz.md`](../generatoren/video-foliensatz.md) — Video-On-Screen-Folien
  (`tools/video/`).
- [`workshop-generator.md`](../generatoren/workshop-generator.md) — Workshop-Generator
  + Spec-Format (`tools/workshop/`).
- [`content-inventar.md`](../generatoren/content-inventar.md) — vollständige
  Bestandsaufnahme aller Inhalte und Zählungen.

Ergänzend: [`tools/pdf/README.md`](../../tools/pdf/README.md) (PDF-Pipeline & Buch)
und [`tools/print/README.md`](../../tools/print/README.md) (Geschäftsausstattung).

_Stand: 2026-09-11 — automatisch dokumentiert_


---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/08-verzeichnisse-und-daten.md -->
<!-- ============================================================ -->

# Verzeichnisse & Datenstruktur

Diese Datei dokumentiert die **Verzeichnisstruktur** und die
**Inhalts-/Datenquellen** des Projekts *Werde Meister deiner Gedanken* (WMDG) –
ein Next.js-Projekt (App Router) mit Supabase (Auth/DB), Resend (Mail) und
Stripe (Bezahlung). Grundlage ist der reale Stand des Dateisystems, nicht eine
Annahme aus älterer Doku.

Ergänzend: die Seiten-/Routen-Übersicht steht in
[`docs/projektstruktur.md`](../projektstruktur.md); das Änderungsprotokoll in
[`docs/AENDERUNGEN.md`](../AENDERUNGEN.md).

## Inhaltsübersicht

- [A) Top-Level-Verzeichnisbaum](#a-top-level-verzeichnisbaum)
- [B) `src/` im Detail](#b-src-im-detail)
- [C) `content/` – Inhaltsquellen](#c-content--inhaltsquellen)
- [D) `public/` – statische Assets](#d-public--statische-assets)
- [E) `docs/` – Projektdokumentation](#e-docs--projektdokumentation)
- [F) Datenbank (Supabase) – Datensicht](#f-datenbank-supabase--datensicht)

---

## A) Top-Level-Verzeichnisbaum

```
werdemeisterdeinergedanken/
├── src/                    Anwendungscode (Next.js App Router)
│   ├── app/                Routen, Seiten, API-Handler
│   ├── components/         React-Komponenten (nach Bereich gruppiert)
│   ├── lib/                Inhalts-Daten, Business-Logik, Integrationen
│   ├── proxy.ts            Middleware (Login-Schutz /mitglieder)
│   └── fonts/… (in app/)   Schriften
├── content/                Redaktionelle Inhaltsquellen (NICHT öffentlich)
│   ├── wissensdatenbank/   27 Markdown-Kapitel + README + Glossar
│   └── pdf/                Gestaltete PDFs (Lektionen, Übungen, Buch, E-Book)
├── public/                 Statische Assets, direkt unter ihrem Pfad ausgeliefert
│   ├── blog/               Blog-Cover
│   ├── email/              Logos für Mails
│   ├── video-thumbnails/   Video-Vorschaubilder (landing/praxis/stufen/vertiefungen)
│   └── wissensdatenbank/   Bild(er) der Wissensdatenbank
├── docs/                   Projektdokumentation & Marketing-Werkzeuge
│   ├── audit/ design/ brandbook/ generatoren/ marketing/ …
│   ├── skripte/ carousels/ reels/ video/ workshop/ ebook/ …
│   ├── projektstruktur.md  Seiten-/Routen-Übersicht
│   └── AENDERUNGEN.md      Chronologisches Änderungsprotokoll
├── tools/                  Build-/Generator-Skripte (pdf, images, video, …)
├── supabase/               Datenbank-Migrationen (SQL)
│   └── migrations/         0001–0014
├── deploy/                 Self-Hosting (docker-compose, nginx-Config)
└── .claude/                Claude-Code-Konfiguration
    ├── agents/             22 spezialisierte Subagenten (Marken, Prüfung, …)
    └── commands/           Slash-Commands (design-check, seiten-check, …)
```

**Zweck der Top-Level-Ordner (je 1–2 Sätze):**

| Ordner | Zweck |
|---|---|
| `src/` | Der gesamte Anwendungscode: Routen (`app/`), Komponenten (`components/`) und die Daten-/Logik-Schicht (`lib/`). |
| `content/` | Redaktionelle Inhaltsquellen, die **nicht** öffentlich ausgeliefert werden: die Markdown-Wissensdatenbank und die gestalteten Mitglieder-PDFs. Bewusst getrennt von `public/`, damit der Login-Schutz greift. |
| `public/` | Statische Assets (Logos, Hero-Bilder, Cover, Portraits, Blog-/E-Mail-Grafiken, Video-Thumbnails). Wird von Next.js direkt unter dem Dateipfad ausgeliefert – an der Middleware vorbei. |
| `docs/` | Projektdokumentation, Marken-/Design-Referenzen, Audits sowie Marketing-Produktionswerkzeuge (Skripte, Carousels, Reels, Workshop, E-Book). |
| `tools/` | Ausführbare Build- und Generator-Skripte (PDF-Erzeugung, Bild-/Video-/Vorlagen-Generatoren). |
| `supabase/` | Datenbank-Migrationen als versionierte SQL-Dateien – die Quelle der Wahrheit für das Schema. |
| `deploy/` | Self-Hosting-Konfiguration: `docker-compose.yml`, nginx-Vhost und `.env.example`. |
| `.claude/` | Claude-Code-Setup: 22 projektspezifische Subagenten und Slash-Commands für wiederkehrende Aufgaben. |

Im Wurzelverzeichnis liegen zusätzlich die üblichen Konfigurationsdateien
(`next.config.ts`, `tsconfig.json`, `package.json`, `eslint.config.mjs`,
`postcss.config.mjs`, `Dockerfile`, `.env.local.example`) sowie drei
Video-Drehbuch-PDFs (`WMDG-Video-Drehbuch-*.pdf`).

---

## B) `src/` im Detail

### `src/app` (Routing/Seiten – nur grob)

App-Router-Struktur. Details siehe [`docs/projektstruktur.md`](../projektstruktur.md).
Der reale Bestand ist inzwischen größer als die alte Doku und umfasst u. a.:

- **Öffentlich:** `/` (Startseite), `die-7-stufen`, `bewusstseinstest`,
  `ueber-mich`, `blog` (+ `[slug]`), `kontakt`, `ebook`, `gratis-ebook`,
  `buch`, `mitgliedschaft` (+ `willkommen`), `login`, `impressum`,
  `datenschutz`.
- **Mitgliederbereich (`mitglieder/…`, login-geschützt):** Dashboard,
  `journal`, `stufe/[nr]` (+ `lektion`/`uebungen` als PDF), `wissen/[slug]`
  (+ `lektion`), `praxis`, `wissensdatenbank`, `programm`, `begleiter`
  (KI-Chat), `detektor`, `gedankenprofil`, `rueckkehr`, `arbeitsheft`,
  `einstellungen`.
- **Admin (`admin/…`, nur Admin-E-Mails):** Cockpit, `marken-uebersicht`,
  `bewusstseinsbibliothek`, `redaktionsplan`, `seiten`, `vorlagen`.
- **API/System (`api/…`, `auth/callback`, `rss.xml`, `sitemap.ts`,
  `robots.ts`):** `kontakt`, `impulses` (+ unsubscribe), `ebook`
  (+ confirm/unsubscribe), `checkout`, `buch-checkout`, `buch-download`,
  `stripe` (Webhook).

### `src/components` (nach Bereich gruppiert)

| Gruppe | Wofür | Beispiele |
|---|---|---|
| `analytics` | Google-Analytics-Einbindung & Cookie-Steuerung | `GoogleAnalytics`, `CookieSettingsButton` |
| `auth` | Anmelde-/Registrier-Formular | `AuthForm` |
| `blog` | Blog-Darstellung | `BlogIndex`, `BlogCover`, `ReadingProgress` |
| `layout` | Seitengerüst | `Header`, `Footer`, `PageHero`, `Prose` |
| `members` | Mitgliederbereich (interaktive Panels) | `BegleiterChat`, `DetektorPanel`, `MusterSpiegelPanel`, `JournalReflection`, `MemberNav`, `TaeglicheRueckkehr`, `TestCurve`, `ReadingPanel`, `VideoEmbed`, … (21 Dateien) |
| `membership` | Bezahl-Mitgliedschaft | `CheckoutButton` |
| `sections` | Landingpage-/Seiten-Abschnitte | `Hero`, `SevenStages`, `Compass`, `Faq`, `Testimonials`, `LeadMagnet`, `EbookForm`, `ContactForm`, `ConsciousnessTest`, `WhyMe`, `FinalCta`, … |
| `ui` | Wiederverwendbare Bausteine | `Button`, `Card`, `Container`, `Icon`, `SectionHeading`, `Reveal`, `StarRating`, `PhotoFrame`, `VideoMessage`, `ArrowLink`, `BackToTop` |
| `visuals` | Markante Grafik-Elemente | `Logo`, `NeuralOrb`, `CosmicBackground` |
| `wissen` | Markdown-Rendering der Wissensdatenbank | `MarkdownDoc` |

### `src/lib` (Daten-/Logik-Schicht — vollständige Tabelle)

`src/lib` enthält **51 Module** (52 Dateien inkl. der Test-Datei
`vorlagen-datei.test.ts`), aufgeteilt in den Hauptordner und die Unterordner
`members/`, `pdf/` und `supabase/`.

**Hauptordner `src/lib/`:**

| Datei | Zweck |
|---|---|
| `admin.ts` | Admin-Zugriffsprüfung fürs Marketing-Cockpit (`ADMIN_EMAILS`). |
| `admin-stats.ts` | Kennzahlen fürs Marketing-Cockpit (Funnel-/Content-Statistiken). |
| `analytics.ts` | Zentrale GA4-Konfiguration (Measurement-ID). |
| `begleiter.ts` | KI-Begleiter: gemeinsame Typen, Grenzen, Texte (ohne Server-Abhängigkeiten). |
| `begleiter-prompt.ts` | KI-Begleiter: System-Prompt + Inhaltsverzeichnis (server-only, liest Kapitel). |
| `bewusstseinsbibliothek.ts` | Inhaltsdaten der Bewusstseinsbibliothek (Admin-Werkzeug). |
| `blog.ts` | Blog-Inhalte (Artikel als strukturierte Blöcke). |
| `blog-accent.ts` | Cover-Farbwelten des Blogs (schlankes Client-Modul). |
| `buch-download.ts` | Signierter, zeitlich begrenzter Download-Link fürs Buch-PDF (HMAC-SHA256). |
| `buch-mail.ts` | Mail-Bausteine für den Buchkauf (PDF-Lieferung / Druck-Bestätigung). |
| `carousels.ts` | Carousel-Produktion (Foliensequenzen IG/LinkedIn). |
| `cn.ts` | Minimaler className-Helper. |
| `consciousness-test.ts` | Bewusstseinstest: 7 Stufen, 21 Aussagen, Auswertungen. |
| `content.ts` | Zentrale Website-Inhalte (7 Stufen, Werte, Features). |
| `deep-dives.ts` | Vertiefungen – psychologische Wissens-Bibliothek des Mitgliederbereichs. |
| `ebook-download.ts` | Zugangsprüfung für den direkten E-Book-Download (Lead-Magnet). |
| `ebook-mail.ts` | Bausteine für E-Book-Bestätigungs- und Liefermail. |
| `gedankenprofil.ts` | Regelbasiertes „Gedankenprofil" mit Bedarfsanalyse. |
| `gradients.ts` | Gemeinsame Hero-/Sektions-Verläufe (eine Quelle der Wahrheit). |
| `hero-image.ts` | Liefert das Seitenverhältnis von Herobildern als CSS-`aspect-ratio`. |
| `impulses.ts` | Wöchentliche E-Mail-Impulse (Texte für den Cron-Versand). |
| `journal.ts` | Auflösung von Journal-Notizen zu ihrem lesbaren Kontext. |
| `ki-modell.ts` | Modellwahl für die KI-Funktionen (Reading, Begleiter). |
| `kontakt-themen.ts` | Themen fürs Kontaktformular (`/kontakt?thema=…`). |
| `library-links.ts` | Themen-Brücken zwischen den beiden Wissens-Bibliotheken. |
| `marken-uebersicht.ts` | Daten für die Marken-Übersicht (`/admin/marken-uebersicht`). |
| `membership.ts` | Mitgliedschafts-Status pro E-Mail (Stripe; nur serverseitig). |
| `practices.ts` | Praxis-Bibliothek (Meditationen, Atemübungen, Rituale). |
| `programm.ts` | Programm „21 Tage Autopilot-Ausstieg" (geführte Tage). |
| `redaktionsplan.ts` | Datenmodell & Standard-Redaktionsplan (20 Wochen). |
| `reels.ts` | Reels-Produktion (Kurzvideo-Skripte). |
| `safe-redirect.ts` | Schutz vor Open-Redirect (nur interne Pfade als Ziel). |
| `seo.ts` | Kanonische URL + Open-Graph-/Twitter-Metadaten je Seite. |
| `site.ts` | Zentrale Seiten-Config, Navigation (`mainNav`/`legalNav`), Social-Links. |
| `stage-lessons.ts` | Ausführliche Lektions-Inhalte der 7 Stufen (Mitgliederbereich). |
| `standortbestimmung.ts` | Regelbasierte „Standortbestimmung" aus den eigenen Daten der Person. |
| `stripe.ts` | Zentrale Stripe-Konfiguration (nur serverseitig). |
| `uiClasses.ts` | Gemeinsame Klassen-Strings (eine Quelle statt Kopien). |
| `vorlagen.ts` | Katalog aller „Vorlagen" für `/admin/vorlagen`. |
| `vorlagen-assets.ts` | Auto-generierte Galerie-Daten (`npm run vorlagen:galerie`). |
| `vorlagen-datei.ts` | Sicheres Auflösen eines angeforderten Vorlagen-Pfads. |
| `vorlagen-datei.test.ts` | Tests zur sicheren Vorlagen-Pfad-Auflösung. |
| `wissensdatenbank.ts` | Loader + leichter Markdown-Parser für `content/wissensdatenbank/`. |

**`src/lib/members/`:**

| Datei | Zweck |
|---|---|
| `download-guard.ts` | Zugriffsschutz für Datei-Downloads (`route.ts`) im Mitgliederbereich. |

**`src/lib/pdf/`:**

| Datei | Zweck |
|---|---|
| `buch-file.ts` | Lädt das gestaltete Buch-PDF (`content/pdf/…`) als Bytes für die Zustellung. |
| `ebook-file.ts` | Lädt das gestaltete E-Book-PDF als Bytes (feste Datei). |
| `slug.ts` | Dateinamen-tauglicher Slug mit deutscher Umlaut-Umschrift. |
| `static-pdf.ts` | Liest gestaltete Mitglieder-PDFs aus `content/pdf/<name>.pdf` (mit Cache, 404 bei Fehlen). |

**`src/lib/supabase/`:**

| Datei | Zweck |
|---|---|
| `admin.ts` | Supabase-Client mit Service-Role-Key (umgeht RLS; nur in geschützten Routen). |
| `client.ts` | Supabase-Client für den Browser (Client-Komponenten). |
| `config.ts` | Zentrale Supabase-Konfiguration aus Umgebungsvariablen. |
| `server.ts` | Supabase-Client für Server-Komponenten, Server-Actions & Route-Handler. |

---

## C) `content/` – Inhaltsquellen

`content/` ist bewusst von `public/` getrennt: Alles unter `public/` liefert
Next.js direkt unter seinem Dateipfad aus (an der Middleware vorbei). Inhalte,
die geschützt bzw. serverseitig verarbeitet werden sollen, liegen daher in
`content/` und werden im Dockerfile mit ins Laufzeit-Image kopiert.

### `content/wissensdatenbank/` (Markdown)

- **27 Kapitel** als Markdown, Namensschema `NN-thema.md`
  (`01-neuroanatomie-aufbau-des-gehirns.md` … `27-das-unbewusste.md`),
  thematisch in fünf Teile gegliedert.
- **`README.md`** – Einleitung, Evidenz-Legende (✅ / ⚠️ / 🔬) und
  Kapitel-Verzeichnis. Leitprinzip: „Ehrlichkeit vor Effekt".
- **`glossar.md`** – alphabetisches Begriffsverzeichnis mit Kapitel-Verweisen.
- Gesamt: **29 `.md`-Dateien** (27 Kapitel + README + Glossar).

**Verwendung:** `src/lib/wissensdatenbank.ts` lädt und parst diese Kapitel
(via `node:fs`) für die Seite `/mitglieder/wissensdatenbank` (Rendering über
`components/wissen/MarkdownDoc.tsx`). Zusätzlich speist der KI-Begleiter seinen
Kontext aus diesen Kapiteln (`src/lib/begleiter-prompt.ts`).

### `content/pdf/` (gestaltete PDFs)

| Kategorie | Dateien | Anzahl |
|---|---|---|
| Stufen-Lektionen | `stufe-1-lektion.pdf` … `stufe-7-lektion.pdf` | 7 |
| Stufen-Übungen | `stufe-1-uebungen.pdf` … `stufe-7-uebungen.pdf` | 7 |
| Vertiefungen | `vertiefung-<slug>.pdf` (z. B. `-automatische-gedanken`, `-neuroplastizitaet`, `-propaganda`, …) | 29 |
| Buch | `Werde-Meister-deiner-Gedanken.pdf` (+ `…-Cover.png`) | 1 (+Cover) |
| E-Book / Lead-Magnet | `Die-7-Stufen-der-Bewusstseinsentwicklung.pdf` | 1 |
| Arbeitsheft | `arbeitsheft.pdf` | 1 |

**Verwendung:**

- **Stufen:** `mitglieder/stufe/[nr]/lektion/route.ts` und `.../uebungen/route.ts`
  liefern `stufe-<nr>-lektion.pdf` bzw. `stufe-<nr>-uebungen.pdf` über
  `getStaticPdf()` (aus `src/lib/pdf/static-pdf.ts`).
- **Vertiefungen:** `mitglieder/wissen/[slug]/lektion/route.ts` liefert
  `vertiefung-<slug>.pdf`; die Seite blendet den Download nur ein, wenn
  `hasStaticPdf()` die Datei findet.
- **Arbeitsheft:** `mitglieder/arbeitsheft/route.ts` liefert `arbeitsheft.pdf`.
- **E-Book:** wird nach Double-Opt-in ausgeliefert (`src/lib/pdf/ebook-file.ts`,
  Route `/ebook` und `/api/ebook/confirm`).
- **Buch:** wird nach Stripe-Kauf zugestellt (`src/lib/pdf/buch-file.ts`,
  `buch-mail.ts`, signierter Link via `buch-download.ts`).

Alle Mitglieder-Downloads sind durch den Login-Proxy und den
`download-guard`/`getStaticPdf`-Weg geschützt (kein direkter Dateipfad).

---

## D) `public/` – statische Assets

Direkt unter ihrem Pfad ausgelieferte, frei abrufbare Dateien.

| Gruppe | Dateien (Beispiele) | Wofür |
|---|---|---|
| Logos & Marke | `logo.svg`, `logo-full.png`, `logo-brain*.png` (frei/gold/türkis), `WMDG-Personal-Logo-4x5-hell.png`, `WMDG-Hintergrund-1x1-hell.png` | Header/Footer, Marken-Übersicht, Social-Vorlagen |
| Hero-Bilder | `heiko-hero.webp`, `hero-mitglieder.png`, `hero-wissen.webp`, `hero-praxis.webp`, `hero-journal.webp`, `hero-programm.webp`, `hero-bewusstseinstest.webp`, `hero-blog-gipfel.webp`, `mitgliedschaft-hero.webp`, `kompass-weg.webp` | Seiten-Header (`PageHero`) |
| Buch-/E-Book-Cover | `buch-cover.webp`, `buch-cover-3d.webp`, `ebook-cover.png/.webp`, `ebook-mockup.webp` | Angebots-/Lead-Magnet-Darstellung |
| Portraits & Motive | `heiko-portrait.webp`, `heiko-avatar.webp`, `heiko-brain-portrait(-creme).webp`, `ueber-heiko-berg.webp`, `schneeleopard.webp`, `eisvogel-blau/-gold.webp` | „Über mich", Testimonials, Marken-Bildwelt |
| `blog/` | 29 PNG-Cover (`neuroplastizitaet.png`, `propaganda.png`, `freier-wille.png`, …) | Blog-Artikel-Cover |
| `email/` | `wmdg-logo-lockup.png`, `wmdg-signatur-logo.png` | Logos in Resend-Mails |
| `video-thumbnails/` | `landing/` (4), `praxis/` (52), `stufen/` (28), `vertiefungen/` (116) + `willkommen*.png` (4) | Vorschaubilder für Video-Slots |
| `wissensdatenbank/` | `das-gehirn-ein-netzwerk.webp` | Bild in der Wissensdatenbank |

Hinweis: Ganz oben liegt außerdem eine generisch benannte Bilddatei
(`2fd37d3c-…​.png`).

---

## E) `docs/` – Projektdokumentation

| Unterordner / Datei | Wofür (1 Satz) |
|---|---|
| `audit/` | Prüfberichte (Launch-Check, UX-Audit, Seiten-Checks, Generatoren-Audit). |
| `design/` | Design-Review-Protokolle (Design-Checks). |
| `brandbook/` | Markenhandbuch (Marke, Tonalität, Logo, Farben, Typografie, Bildwelt, Anwendungen, Struktur). |
| `generatoren/` | Dokumentation der Generatoren (PDF, Marketing/Galerie, Video-Folien, Visuals, Workshop, Content-Inventar). |
| `marketing/` | Marketing-Assets & -Skripte (Gold-Grafiken, Content-Daten, Facebook, E-Book, Brand-Assets). |
| `workshop/` | Workshop-Materialien (Präsentationsvorlage, 7-Stufen, Bewusstseinstest, Journal, Carousel-Texte, Anleitungen). |
| `skripte/` | Ausformulierte Produktions-Skripte (Landing, Stufen, Praxis, Vertiefungen, Reels, Carousels). |
| `reels/` | Reels-Cover-Vorlagen und -Grafiken. |
| `carousels/` | Carousel-Baukasten (Build-/Export-Skripte, Daten, Marketing-Serien). |
| `ebook/` | E-Book-Manuskripte (u. a. „Die 7 Stufen…", „Die Gedanken, die nicht deine sind"). |
| `mitglieder/` | Mitgliederbereich-Doku (u. a. Sprecherskripte). |
| `video/` | Video-Foliensätze (PowerPoint) für Reels-Serien. |
| `buch-1-verwertung/` | Zweitverwertung des Buchs (Blog-Artikel, Zitate, Reels/Carousels). |
| `archiv/` | Abgelegte/ältere Materialien. |
| `seiten/` | Detail-Dokus zu einzelnen Seitenbereichen (z. B. Mitgliedschaft/Auth) — **diese Datei liegt hier**. |
| `projektstruktur.md` | Seiten-/Routen-/Download-Übersicht. |
| `AENDERUNGEN.md` | **Chronologisches Änderungsprotokoll** (neueste Einträge oben) — Serverstand & wichtige Änderungen. |
| Weitere Top-Level-Dateien | `DOMAIN-UMZUG.md`, `EMAIL-IMPULSE.md`, `KI-BEGLEITER.md`, `LOKAL-INSTALLIEREN.md`, `STRIPE-MITGLIEDSCHAFT.md`, `repo-analyse-clone-dauer.md`. |

> **Merke:** [`docs/AENDERUNGEN.md`](../AENDERUNGEN.md) ist das laufende
> Änderungsprotokoll des Projekts. Wesentliche Änderungen dort eintragen.

---

## F) Datenbank (Supabase) – Datensicht

Diese Sicht beschreibt, **welche Nutzerdaten wo gespeichert** werden. Das
Schema kommt aus `supabase/migrations/0001–0014`. Client-/Infra-Konfiguration
ist hier bewusst ausgeklammert.

**Grundmuster:**

- Persönliche Nutzerdaten hängen an `auth.users` (per `user_id`) und sind mit
  **Row-Level-Security (RLS)** so geschützt, dass jede Person ausschließlich
  ihre **eigenen** Zeilen sieht/ändert.
- Sensible Tabellen ohne Login-Bezug (`ebook_leads`, `memberships`,
  `redaktionsplan_posts`) haben **RLS aktiv, aber KEINE Policy** → der
  öffentliche Anon-Key kommt gar nicht heran; Zugriff nur über den
  **Service-Role-Key** in serverseitigen, abgesicherten Routen.
- Ein Trigger legt bei jeder Registrierung automatisch ein `profiles`-Zeile an;
  `touch_updated_at()`/`set_updated_at()` pflegen `updated_at`.

| Tabelle | Zweck | Wichtige Spalten | RLS | Zugriff |
|---|---|---|---|---|
| `profiles` | Mitglieds-Profil je Login-Konto; auch Testergebnis & Newsletter-Opt-in | `id`(→auth.users), `email`, `full_name`, `start_stage`, `test_scores`, `test_taken_at`, `newsletter_opt_in`, `newsletter_opted_in_at`, `impulse_index`, `unsubscribe_token` | ✅ (nur eigene Zeile lesen/ändern) | Person selbst; Serienversand über Service-Role |
| `progress` | Fortschritt: abgeschlossene Inhalte je Person | `user_id`, `item_type` (`stage`/`practice`/`deep_dive`/`programm`/`wissenskapitel`), `item_key`, `status`, `completed_at` | ✅ (nur eigene) | Person selbst |
| `notes` | Persönliches Journal / Reflexionsantworten | `user_id`, `item_type`, `item_key`, `ref` (z. B. `reflection-0`), `body` | ✅ (nur eigene) | Person selbst |
| `test_results` | Verlauf des Bewusstseinstests (Wachstumskurve) | `user_id`, `top_stage`, `scores[]`, `taken_at` | ✅ (nur eigene) | Person selbst |
| `ebook_leads` | Lead-Erfassung Gratis-E-Book (Double-Opt-in, DSGVO) | `email`(unique), `status` (`pending`/`confirmed`/`unsubscribed`), `confirm_token`, `unsubscribe_token`, `source`, `requested_at`, `confirmed_at`, `request_ip`, `confirm_ip` | ✅ aktiv, **keine Policy** | nur Service-Role (API-Routen) |
| `memberships` | Bezahl-Mitgliedschaft (Stripe-Abo), nach E-Mail geschlüsselt | `email`(PK), `status`, `stripe_customer_id`, `stripe_subscription_id`, `current_period_end` | ✅ aktiv, **keine Policy** | nur Service-Role (Stripe-Webhook) |
| `gedanken_readings` | Gespeicherte KI-Readings zum Gedankenprofil (Verlauf) | `user_id`, `body`, `source_stage`, `source_scores[]`, `model`, `created_at` | ✅ (nur eigene) | Person selbst |
| `begleiter_messages` | Chatverlauf des KI-Begleiters (eine Zeile je Nachricht) | `user_id`, `role` (`user`/`assistant`), `body`, `model`, `created_at` | ✅ (nur eigene, inkl. Löschen) | Person selbst |
| `muster_spiegel` | Gespeicherte KI-„Muster-Spiegel" aus dem Journal (Verlauf) | `user_id`, `body`, `source_entry_count`, `source_from`, `source_to`, `model` — **kein** Reflexionstext | ✅ (nur eigene) | Person selbst |
| `rueckkehr` | „Tägliche Rückkehr" – ein Eintrag je Kalendertag | `user_id`, `datum` (unique je Person), `created_at` | ✅ (nur eigene) | Person selbst |
| `redaktionsplan_posts` | Bearbeitbarer Social-Media-Redaktionsplan (Admin-Cockpit) | `woche`, `block`, `wochentag`, `kanal` (`ig`/`fb`/`li`/`yt`), `format`, `titel`, `status`, `sort`, … | ✅ aktiv, **keine Policy** | nur Service-Role nach Admin-Prüfung |

**Welche Daten liegen wo (Kurzfassung):**

- **Mitglieder-Stammdaten & Bewusstseinstest (letztes Ergebnis, Newsletter-Opt-in):** `profiles`.
- **Lernfortschritt** (Stufen, Praxis, Vertiefungen, 21-Tage-Programm, Wissenskapitel): `progress`.
- **Journal/Reflexionen:** `notes` (Rohtexte), abgeleitete KI-Spiegelungen in `muster_spiegel`.
- **Test-Verlauf über Zeit:** `test_results`.
- **Gedankenprofil-KI-Texte:** `gedanken_readings`; **Begleiter-Chats:** `begleiter_messages`.
- **Tägliche Rückkehr:** `rueckkehr`.
- **E-Book-Interessent*innen (ohne Login):** `ebook_leads`.
- **Zahlende Mitglieder (Stripe):** `memberships`.
- **Redaktionsplanung (Admin):** `redaktionsplan_posts`.

---

_Stand: 2026-09-11 — automatisch dokumentiert_


---

<!-- ============================================================ -->
<!-- Quelle: docs/seiten/09-geplante-erweiterungen.md -->
<!-- ============================================================ -->

# Geplante Erweiterungen & Roadmap

Diese Seite bündelt alles, was im Projekt zwar **angelegt, angedacht oder
vorbereitet**, aber noch **nicht (voll) aktiv** ist – dazu ausdrückliche
Zukunftshinweise aus Code und Dokumentation.

> **WICHTIGER Hinweis:** Dieser Überblick ist **aus Code- und Doku-Spuren
> abgeleitet** (auskommentierte Features, Platzhalter, Feature-Flags,
> Audit-Empfehlungen, ungenutzte Strukturen). Er beschreibt den **Ist-Stand der
> Absichten**, wie er sich im Repository ablesen lässt – **keine offizielle
> Produkt-Roadmap** des Betreibers. Jeder Punkt ist mit Datei + Fundstelle
> belegt. Wo Audit-Empfehlungen zitiert werden, kann ein Teil davon zwischen
> Audit-Datum und heute bereits umgesetzt sein; verifizierte Umsetzungen sind
> als solche vermerkt.

---

## Deaktivierte / versteckte Funktionen (bereits gebaut)

Fertig entwickelte Bausteine, die im Code liegen, aber bewusst ausgeblendet
sind. Aktivierung ist jeweils ein kleiner, klar umrissener Eingriff.

| Funktion | Beleg | Was ist geplant / beabsichtigt | Zum Aktivieren nötig |
|---|---|---|---|
| **„Der Grundgedanke"-Sektion (Creed)** auf der Startseite | Import u. Einbindung auskommentiert: `src/app/page.tsx:6` (`// import { Creed } …`) und `:21` (`{/* <Creed /> */}`); Komponente vollständig vorhanden: `src/components/sections/Creed.tsx` | Zusätzliche Marken-Sektion „Dein Bewusstsein ist der Schlüssel. Deine Gedanken sind der Code." auf der Home | Beide Zeilen in `page.tsx` einkommentieren |
| **Blog-Kategorie „Mentale Selbstverteidigung"** komplett deaktiviert | `src/lib/blog.ts:1779-1781` (`DEACTIVATED_CATEGORIES = new Set(["Mentale Selbstverteidigung"])`), Filter `isCategoryDeactivated` `:1783-1786` | **16 fertig geschriebene Artikel** (verifiziert per Zählung) erscheinen nirgends – nicht in Übersicht, RSS, Sitemap; eigene URL → 404. Inhalte bleiben im Code erhalten und sind jederzeit reaktivierbar | Kategorie-Eintrag aus dem Set entfernen. **Vorher klären** (bewusst/sensibel vs. versehentlich); Konflikt beachten: der Redaktionsplan verlinkt weiter auf diese Slugs (s. u.) |
| **Buch-Stimmen-Sektion** auf `/buch` | Leeres Array: `src/lib/content.ts:199` (`export const bookTestimonials: Testimonial[] = []`); bedingtes Rendern: `src/app/buch/page.tsx:487` (`bookTestimonials.length > 0 && …`) | Testimonial-Abschnitt speziell zum Buch (bewusst getrennt von den 7-Stufen-`testimonials`); solange leer, blendet `/buch` den Abschnitt aus | Echte Leser-Rückmeldungen (mit Einverständnis) ins Array eintragen |
| **Persönliche Videobotschaft** auf der Startseite („Ein anderer Blickwinkel") | `src/lib/site.ts:25-28` (`videoMessage.youtubeId: null`); Fallback-/„folgt in Kürze"-Zweig in `src/components/sections/MaybeNotYou.tsx` (laut Audit `:58-64`) | Statt echtem Video läuft aktuell das globale Platzhalter-Video hinter dem Marken-Thumbnail | Echte YouTube-ID in `videoMessage.youtubeId` eintragen (oder `placeholderVideoId: null`, um ehrlich „folgt in Kürze" zu zeigen) |
| **Echte Lektions-/Vertiefungs-/Praxis-Videos** (Platzhalter aktiv) | `src/lib/site.ts:34` (`placeholderVideoId: "gOvtKBnqGvk"`). Alle 7 Stufen-Lektionen, alle 29 Vertiefungen und 13/14 Praxis-Übungen haben `video: null`; genau **eine** echte Ausnahme: `src/lib/practices.ts:84` (`video: "3XiHP4U683Q"`) | Der „folgt in Kürze"-Zustand ist im Code vorhanden, wird durch den globalen Platzhalter aber nie gezeigt | Echte Video-IDs pro Inhalt hinterlegen, **oder** `placeholderVideoId: null` setzen (ehrlicher Fallback) |
| **Telegram-Social-Link** (Icon erscheint automatisch bei URL) | `src/lib/site.ts:41-42` (`// TODO: echte URLs ergänzen …` / `// telegram: "https://t.me/…"`) | Weiterer Social-Kanal; Icons werden automatisch angezeigt, sobald eine URL gesetzt ist | Echte Telegram-URL im `social`-Objekt einkommentieren |
| **`session_id` auf der Willkommensseite nicht ausgelesen** | Checkout übergibt sie: `src/app/api/checkout/route.ts:84` (`success_url: …/willkommen?session_id={CHECKOUT_SESSION_ID}`); Seite ignoriert den Parameter vollständig: `src/app/mitgliedschaft/willkommen/page.tsx` (kein `searchParams`-Zugriff) | Geplant/empfohlen (UX-Audit E6/F): serverseitige Prüfung der `session_id`, Status spiegeln („Zugang wird eingerichtet…"), „Passwort-Mail erneut senden"-Trigger | `willkommen/page.tsx` auf async Page mit `searchParams` umbauen und Stripe-Session serverseitig verifizieren |

---

## Platzhalter & vorläufige Werte

| Wert | Beleg | Erklärung | Zum Finalisieren nötig |
|---|---|---|---|
| **Mitgliedschaftspreis 49 €/Monat, 490 €/Jahr** hartcodiert | `src/app/mitgliedschaft/page.tsx:23` (Kommentar „Preis-Platzhalter – vor dem Livegang durch das echte Modell ersetzen."), Werte `:24-41` | Angezeigter Betrag ist unabhängig von den Stripe-Preis-IDs (die aus Env kommen). Gefahr: Diskrepanz Anzeige ↔ Abbuchung | Angezeigten Preis exakt an den in Stripe hinterlegten Preis angleichen |
| **Globales Platzhalter-Video** `gOvtKBnqGvk` | `src/lib/site.ts:29-34` | „Vorerst überall dort, wo noch kein eigenes Video produziert wurde"; auf `null` setzen = wieder „folgt in Kürze" | Echte Videos hinterlegen oder Platzhalter global entfernen |
| **Platzhalter-Kommentare in Datenquellen** (echte URLs, Video-IDs) | `src/lib/site.ts:3` u. `:41`; Sammelbefund im Generatoren-Audit: `docs/audit/vorlagen-generatoren-audit-2026-08-13.md:477` („Diverse Platzhalter-TODOs … in `site.ts`, `stage-lessons.ts`, `deep-dives.ts`, `practices.ts` — redaktionell, keine Integrationen") | Redaktionell zu befüllende Felder, keine offenen technischen Integrationen | Echte Daten nachtragen |
| **13 in `src/` gelesene, produktiv aber nicht gesetzte Env-Variablen** | `docs/AENDERUNGEN.md` (Eintrag 2026-09-10 „`deploy/` …"): `CONTACT_*`, `*_FROM`, `BUCH_DOWNLOAD_SECRET`, `STRIPE_*`, `REQUIRE_ACTIVE_MEMBERSHIP`, `ALLOW_SELF_REGISTRATION`; dokumentiert in `deploy/.env.example` | Alle mit Fallback – „nichts kaputt, aber bisher unsichtbar". Betrifft v. a. Zahlung/Mailversand | Vor Nutzung der jeweiligen Funktion in der Laufzeitumgebung setzen |

---

## Feature-Flags & Schalter

Konfigurierbare Ein/Aus-Funktionen und „graceful degradation"-Zweige (Feature
bleibt latent, bis ein Dienst konfiguriert ist).

| Flag / Bedingung | Beleg | Default | Wirkung / geplanter Zweck |
|---|---|---|---|
| `ALLOW_SELF_REGISTRATION` | `src/lib/supabase/config.ts:19-26`; genutzt in `src/app/auth/actions.ts:47`, `src/app/login/page.tsx:44,54,56`; Doku `.env.local.example:73-76` | `false` | Freie Selbst-Registrierung (Konten ohne Zahlung). Vorbereitet für das Modell **„erst registrieren, dann bezahlen"** – dann auf `true` |
| `REQUIRE_ACTIVE_MEMBERSHIP` | `src/lib/supabase/config.ts:28-37`; genutzt in `src/app/mitglieder/layout.tsx:43`, `src/lib/members/download-guard.ts:48`; Anleitung `docs/STRIPE-MITGLIEDSCHAFT.md:90-97` | `false` | Bezahlschranke für `/mitglieder`. Ausdrücklich geplant: **„Erst umlegen, wenn der Stripe-Checkout live und getestet ist."** |
| `REQUIRE_MEMBER_LOGIN` | `src/lib/supabase/config.ts:12-16` | `true` | Login-Schutz des Mitgliederbereichs |
| `ENFORCE_CANONICAL_HOST` | `.env.local.example:108-112`; Kontext `docs/DOMAIN-UMZUG.md` | `true` | 301 auf www; „false = vorübergehend abschalten, solange www noch nicht live ist" |
| `STRIPE_PRICE_ID_YEARLY` | `.env.local.example:49-50` | (leer) | Optional: **schaltet die Jahres-Abo-Option frei**, sobald der zweite Preis angelegt ist |
| `STRIPE_BOOK_PRICE_ID` / `STRIPE_BOOK_PRICE_ID_PRINT` | `.env.local.example:51-58`; `src/lib/stripe.ts` (`bookPriceIdForEdition`) | (leer) | PDF- bzw. Druck-Edition auf `/buch`. **Ohne die Variable fällt der Button sanft aufs Kontaktformular** (`/kontakt?thema=buch`) |
| `ANTHROPIC_API_KEY` (+ Migrationen 0008/0009) | `.env.local.example:78-97`; `docs/KI-BEGLEITER.md:48` | (leer) | Schaltet **KI-Reading** (Gedankenprofil) und **KI-Begleiter** frei. Ohne Key bleiben beide Seiten nutzbar/erreichbar, die Optionen/Links werden schlicht ausgeblendet (graceful degradation) |
| E-Book Double-Opt-in | `.env.local.example:17-25` (Migration `0005_ebook_leads.sql` + Service-Role-Key) | direkter Versand | Ohne Service-Role-Key: direkter Versand ohne Lead-Speicherung; mit → Double-Opt-in + `public.ebook_leads` |
| `NEXT_PUBLIC_GA_ID` (kein Code-Default) | `.env.local.example:99-106`; `src/lib/analytics.ts` | (leer) | Analytics lädt **nur** mit gesetzter ID (sonst kein Tracking, kein Cookie-Banner) |
| `BUCH_DOWNLOAD_SECRET` | `.env.local.example:66-70` | Fallback auf `STRIPE_WEBHOOK_SECRET` | Aktiviert den signierten, 30-Tage-gültigen PDF-Download-Link in der Liefermail; fehlt beides → nur PDF-Anhang |

---

## Offene Punkte aus Audits & Doku

Konkrete offene Empfehlungen und geplante Maßnahmen aus den Audit-/Design-Dokumenten.

### Vor-Launch-Check (`docs/audit/launch-check-2026-09-09.md`)

**Vor Go-live zu entscheiden:**
- **B1** – Mitgliedschaftspreis als Code-Platzhalter (`:20-26`) → Anzeige = Stripe-Preis sicherstellen.
- **B2** – Fast alle Mitglieder-Videos = Platzhalter (`:28-34`) → echte Videos oder `placeholderVideoId: null`.
- **B3** – Persönliche Videobotschaft = Platzhalter (`:36-42`).

**Wichtig (W1-W7, `:46-91`):** Hero zu dunkel (W1 – **Entscheidung laut `AENDERUNGEN.md` 2026-09-09: Hero bleibt bewusst dunkel, keine Aufhellung**), Porträt-Glow (W2), uneinheitliche H2-Größen (W3 – **umgesetzt** laut `AENDERUNGEN.md` 2026-09-09), Teal-Schatten im Badge (W4 – **umgesetzt**), Blog-Kategorie deaktiviert bestätigen (W5), `npm run lint`-Fehler (W6 – **behoben**), Next.js-Sicherheitsupdate (W7 – **erledigt**, 16.2.10 → 16.3.4).

**Nice-to-have (N1-N6, `:96-106`):** Kompass-Crop (N1), `robots.ts` deckt `/admin` nicht ab (N2), **zweites Buch-PDF nirgends als Verkaufsschritt eingebunden** (N3 – Hinweis: wird inzwischen per Liefermail nach Kauf zugestellt, `src/lib/pdf/buch-file.ts`), offene TODOs `site.ts:41` + `Creed` (N4), kein eigenes `favicon.ico` (N5), `AGENTS.md` verweist auf nicht existierendes Verzeichnis (N6).

**Ausdrückliche Ausbau-Ideen nach dem Launch (KI-Spiegel, Chat & Profil, `:110-128`):**
1. „Ins Profil übernehmen"-Button im Begleiter-Chat (Erkenntnis → Journal/Profil).
2. Muster-Spiegel auch aus Chat-Verläufen speisen (Verlauf liegt bereits in Supabase).
3. „Lebendiges Profil": kuratierter Freitext „Was ich über mich gelernt habe".
Grundlage laut Doku „sauber gebaut – gut nachrüstbar, kein Launch-Blocker".

### Mitgliederbereich-UX-Audit (`docs/audit/mitgliederbereich-ux-audit-2026-08-26.md`)

3-Phasen-Maßnahmenplan (`:231-255`). Mehrere **Phase-1-Punkte sind inzwischen
umgesetzt** (verifiziert im Code): `practicesForStage()` auf der Stufenseite
(`src/app/mitglieder/stufe/[nr]/page.tsx:54`), `JournalReflection` für Praxis
freigeschaltet (`src/components/members/JournalReflection.tsx:20` akzeptiert
`practice`; `praxis/[slug]/page.tsx:159`), und die Test-Startstufe personalisiert
den Dashboard-Anker (`src/app/mitglieder/page.tsx:180-185`, `floorIndex` aus
`startStage`).

**Weiterhin geplant/offen (Auswahl):**
- **Persistente Mitglieder-Navigation** (E1 `:82`, „das größte strukturelle Loch").
- **Dashboard vom Index zum Cockpit** umbauen (E2 `:84`, Bibliotheken auslagern, kuratieren).
- **Echte Videos** produzieren (G `:182`).
- **Fortschritt aus echter Aktivität** ableiten; Schema `item_type in ('stage','practice','deep_dive')` voll nutzen (E3 `:86`).
- **Zwei Bibliotheken entwirren** (Vertiefungen ↔ Wissensdatenbank, E4 `:88`); Wissensdatenbank Gelesen-Status + Reflexionsfrage.
- **Filter/Suche** in Vertiefungs-Index und Journal (G `:187`); Stufen-Badges/„Empfohlen für Stufe X".
- **Stripe-Kundenportal-Link** (Abo-Selbstverwaltung/Kündigung) in den Einstellungen (D `:73`, F `:170`).
- **Test-Methodik härten** (Umkehr-Items, gemischte Reihenfolge, „zwischen Stufe X und Y") (`:119`).
- **Kern-Kategorien der Vertiefungen ausbauen** – Schieflage 16/29 „Mentale Selbstverteidigung", andere Kategorien mit je 1 Eintrag (verifiziert: Gehirn 1, Emotion 1, Körper 1) (`:133`).

### Design-Check (`docs/design/design-check-2026-09-09.md:202-218`)
Drei nächste Schritte: Hero aufhellen (überholt – Betreiber-Freigabe „bleibt dunkel"), Sektions-H2 vereinheitlichen (umgesetzt), zwei Farbkorrekturen.

### Generatoren-/Vorlagen-Audit (`docs/audit/vorlagen-generatoren-audit-2026-08-13.md:532`)
Prioritäten P1-P4 weitgehend umgesetzt; **offen bleibt nur P4-Canva** (Brand-Templates mit Datensatz in Canva anlegen – kein Code).

### Buch – juristische & redaktionelle Restpunkte
- Juristische Vorprüfung (`docs/AENDERUNGEN.md` 2026-09-08): anwaltlich abzunehmen bleiben vollständiges Impressum/Anschrift (Anschrift inzwischen eingetragen), Einordnung „Lena"/Angehörigen-Einverständnis, finale Disclaimer-Freigabe, Marketing-Claims. Vertriebsform-spezifische Pflichtangaben „ggf. später prüfen".
- Buch-Verkaufsseite: **vollständige Gliederung Teil I-IV noch nicht abgebildet** – aktuell nur Teil V (Kap. 19-24) als Schwerpunkt/Leseprobe; „restliche Teile können ergänzt werden, sobald die Titel vorliegen" (`docs/AENDERUNGEN.md` 2026-09-09).
- Buch-PDF-Ablage/Auslieferung war „noch offen und separat zu entscheiden" (`docs/AENDERUNGEN.md` 2026-09-08) – inzwischen via signiertem Link + Anhang gelöst.

### Content-Inventar (`docs/generatoren/content-inventar.md:85-89`)
**„Noch nicht gebaut":** `cover-overlay/` und `carousel-overlay/` fehlen im Repo; sie brauchen git-ignorierte lokale Exporte (`npm run covers:png` / `carousels:png`) vor dem Galerie-Bau, sonst tragen die Schritte still 0 Einträge ein.

### Redaktionsplan-Konflikt (`docs/AENDERUNGEN.md:554-560`)
Der Redaktionsplan (`src/lib/redaktionsplan.ts` + `docs/marketing/`) plant weiter Social-Posts mit `/blog/<slug>`-Links auf die **16 deaktivierten** „Mentale Selbstverteidigung"-Artikel – diese URLs liefern öffentlich 404. Kein Website-Bug, aber ein Planungskonflikt, der beim Ausspielen zu beachten ist (bzw. sich mit Reaktivierung der Kategorie auflöst).

---

## Angelegte, noch ungenutzte Strukturen

Vorbereitete Code-/Datenstrukturen, für die aktuell keine Nutzung nachweisbar ist.

| Struktur | Beleg | Status |
|---|---|---|
| **Audio-Zweig für Praxis-Übungen** | Feld `audio?: string \| null` in `src/lib/practices.ts:34`; Auswahl `featuredPractice()` `:372-374` (`p.video \|\| p.audio`); Player im UI `src/app/mitglieder/praxis/[slug]/page.tsx:88-103` | **Ungenutzt** – verifiziert: keine Übung hat ein `audio`-Feld gesetzt, keine Audiodatei (`*.mp3/m4a/wav/ogg`) in `public/` oder `content/`. Der Player-/Auswahlzweig ist vorbereitet, aber toter Code, bis Aufnahmen ergänzt werden |
| **Zweites Buch-PDF `content/pdf/Werde-Meister-deiner-Gedanken.pdf`** | Laut Launch-Check N3 „wird nirgends eingebunden"; tatsächlich geladen für die Liefermail nach Kauf: `src/lib/pdf/buch-file.ts:15` | Für die Post-Kauf-Zustellung genutzt; **nicht** als direkter Download/Verkaufsschritt auf einer Seite verlinkt (bewusste Login-/Nicht-öffentlich-Ablage) |

> Hinweis: Die zur Audit-Zeit als „ungenutzt" bemängelte Notiz-Spalte
> `item_type='practice'` (`supabase/migrations/0003_notes.sql:14`) wird
> **inzwischen** genutzt (`src/lib/journal.ts:14` + Praxis-Reflexion), ebenso das
> `start_stage`-Feld für die Dashboard-Personalisierung. Diese gelten daher nicht
> mehr als latent.

---

## Sonstige TODO-/Marker-Fundstellen

| Fundstelle | Inhalt |
|---|---|
| `src/lib/site.ts:3` | „Alle mit «TODO» markierten Felder bitte mit echten Daten befüllen (Kontakt, Social-Links, rechtliche Angaben)." |
| `src/lib/site.ts:41` | `// TODO: echte URLs ergänzen …` (Telegram, s. o.) |
| `src/lib/admin-stats.ts:95` | `// Tabelle evtl. noch nicht migriert` – toleranter Fallback, falls eine Migration fehlt |
| `src/app/bewusstseinstest/actions.ts:64` | „Bewusst nicht-fatal – falls Migration 0006 noch nicht eingespielt ist …" (graceful bei fehlender `test_history`) |
| `src/app/mitglieder/reading-actions.ts:150` | Kommentar zu asynchronem Nachreichen („und später als fertig angezeigt wird") |
| `src/app/blog/[slug]/page.tsx:144` | Vorausdatierte Artikel „Noch nicht erschienen: erreichbar, aber nicht für Suchmaschinen" – Redaktionsplan-Mechanik für künftige Beiträge |

---

_Stand: 2026-09-11 — automatisch dokumentiert_


---
