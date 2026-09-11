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
