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
