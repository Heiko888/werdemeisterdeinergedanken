# Bezahl-Mitgliedschaft mit Stripe

Die „Mitglied werden"-Buttons auf `/mitgliedschaft` starten einen echten
Stripe-Abo-Checkout. Nach erfolgreicher Zahlung legt ein Webhook den Zugang an
und schickt der Kundin/dem Kunden eine Mail zum Setzen des Passworts.

## Schnell-Checkliste „Bezahlen zuerst" (Selbstbedienung, kein Konto von Hand)

Der Code ist fertig. Zum Scharfschalten nur diese Schritte (alle in deinen
Dashboards – nichts davon geht ohne deine Zugangsdaten):

1. **Stripe-Produkt + Preise** anlegen: ein Produkt „Mitgliedschaft" mit zwei
   wiederkehrenden Preisen – **49 €/Monat** → `STRIPE_PRICE_ID` und **490 €/Jahr**
   → `STRIPE_PRICE_ID_YEARLY` (die Jahres-Option erscheint nur, wenn diese
   zweite ID gesetzt ist; sonst wird überall das Monatsabo genutzt).
2. **Stripe API-Key** (`sk_…`) und **Webhook** (Endpoint
   `…/api/stripe/webhook`, Events s. u.) anlegen → `STRIPE_WEBHOOK_SECRET`
   (`whsec_…`) notieren.
3. **Supabase-Migration** `0007_membership.sql` im SQL-Editor ausführen.
4. **Env-Variablen** im Hosting setzen: `STRIPE_SECRET_KEY`, `STRIPE_PRICE_ID`,
   `STRIPE_WEBHOOK_SECRET`, `SUPABASE_SERVICE_ROLE_KEY`, `RESEND_API_KEY`
   (für die Passwort-Mail), optional `MEMBERSHIP_FROM`.
5. Im **Stripe-Testmodus** mit Karte `4242 4242 4242 4242` einen Checkout
   durchspielen → Eintrag `active` in `memberships` + Passwort-Mail prüfen.
6. Auf **Live-Keys** umstellen und **`REQUIRE_ACTIVE_MEMBERSHIP=true`** setzen –
   ab jetzt kommt man nur mit aktivem Abo (oder als Admin) in `/mitglieder`.
7. **Preis** in `src/app/mitgliedschaft/page.tsx` (Konstante `PRICE`) an dein
   echtes Modell anpassen.

Danach entstehen alle Zugänge automatisch über den Checkout – kein Konto muss
mehr von Hand angelegt werden. (Für das alternative Modell „erst registrieren,
dann bezahlen" zusätzlich `ALLOW_SELF_REGISTRATION=true` setzen.)

Solange die Stripe-Variablen **nicht** gesetzt sind, führen die Buttons sanft
zum Kontaktformular – die Seite bleibt also jederzeit funktionsfähig.

## Ablauf

1. Besucher klickt **Mitglied werden** → `POST /api/checkout`.
2. Die Route erstellt eine Stripe-Checkout-Session (Modus: Abo) und leitet auf
   die gehostete Stripe-Bezahlseite weiter.
3. Nach Zahlung → Weiterleitung auf `/mitgliedschaft/willkommen`.
4. Stripe ruft `POST /api/stripe/webhook` auf:
   - `checkout.session.completed` → Eintrag in `public.memberships`
     (Status `active`), Supabase-Konto anlegen (falls neu), Passwort-Setzen-Mail
     verschicken.
   - `customer.subscription.updated` / `deleted` → Status spiegeln
     (z. B. `canceled`, `past_due`).

## Einrichtung (durch Heiko)

### 1. Produkt & Preis in Stripe anlegen
- Stripe-Dashboard → **Product catalog** → Produkt „Mitgliedschaft" anlegen.
- Wiederkehrenden Preis hinzufügen (z. B. 49 €/Monat) → **Price-ID** kopieren
  (`price_…`). Preis auf der Seite steht aktuell als Platzhalter `49 €` in
  `src/app/mitgliedschaft/page.tsx` (Konstante `PRICE`) – dort ggf. anpassen.

### 2. API-Keys & Webhook
- **Developers → API keys** → *Secret key* kopieren (`sk_test_…` / `sk_live_…`).
- **Developers → Webhooks → Add endpoint**
  - URL: `https://www.werdemeisterdeinergedanken.de/api/stripe/webhook`
  - Events: `checkout.session.completed`, `customer.subscription.updated`,
    `customer.subscription.deleted`
  - Nach dem Anlegen das **Signing secret** kopieren (`whsec_…`).

### 3. Umgebungsvariablen (Vercel → Settings → Environment Variables)
```
STRIPE_SECRET_KEY=sk_live_…
STRIPE_PRICE_ID=price_…
STRIPE_WEBHOOK_SECRET=whsec_…
SUPABASE_SERVICE_ROLE_KEY=…        # falls noch nicht gesetzt (fürs Freischalten)
MEMBERSHIP_FROM=Werde Meister deiner Gedanken <mail@deine-domain.de>   # optional
```

### 4. Datenbank-Migration
`supabase/migrations/0007_membership.sql` im Supabase-SQL-Editor ausführen
(legt die Tabelle `public.memberships` mit aktivem RLS an – nur der
Service-Role-Key darf schreiben/lesen).

### 5. Testen (Stripe-Testmodus)
- Test-Keys verwenden, Testkarte `4242 4242 4242 4242`, beliebiges Datum/CVC.
- Checkout durchspielen → in `memberships` sollte ein Eintrag `active` stehen,
  und die Passwort-Mail sollte ankommen.
- Danach auf Live-Keys umstellen.

### 6. Bezahlschranke aktivieren (optional)
Standardmäßig ist `/mitglieder` weiterhin für alle eingeloggten Nutzer offen
(bricht bestehende Zugänge nicht). Sobald der Checkout getestet ist:
```
REQUIRE_ACTIVE_MEMBERSHIP=true
```
Dann brauchen Nicht-Admins eine aktive Mitgliedschaft. Admins (`ADMIN_EMAILS`)
kommen immer rein.

## Beteiligte Dateien
- `src/lib/stripe.ts` – Stripe-Client & Konfiguration
- `src/lib/membership.ts` – Status-Abfrage pro E-Mail
- `src/components/membership/CheckoutButton.tsx` – Button (Formular → Checkout)
- `src/app/api/checkout/route.ts` – startet den Checkout
- `src/app/api/stripe/webhook/route.ts` – pflegt die Mitgliedschaft
- `src/app/mitgliedschaft/willkommen/page.tsx` – Danke-/Nächste-Schritte-Seite
- `supabase/migrations/0007_membership.sql` – Tabelle `memberships`
