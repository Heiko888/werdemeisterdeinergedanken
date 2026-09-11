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
