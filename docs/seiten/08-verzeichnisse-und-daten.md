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
