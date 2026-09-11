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
