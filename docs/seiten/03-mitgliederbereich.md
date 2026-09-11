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
