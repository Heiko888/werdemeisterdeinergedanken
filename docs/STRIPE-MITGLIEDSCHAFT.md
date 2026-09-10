# Bezahl-Mitgliedschaft mit Stripe

Die „Mitglied werden"-Buttons auf `/mitgliedschaft` starten einen echten
Stripe-Abo-Checkout. Nach erfolgreicher Zahlung legt ein Webhook den Zugang an
und schickt der Kundin/dem Kunden eine Mail zum Setzen des Passworts.

> Der **Buch-Einmalkauf** auf `/buch` (PDF 29,90 € / gedruckt 39,90 €) nutzt
> denselben Stripe-Account, ist aber ein separates Produkt mit eigener Route –
> siehe Abschnitt [Buch-Einmalkauf (`/buch`)](#buch-einmalkauf-buch).

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

## Buch-Einmalkauf (`/buch`)

Neben dem Abo gibt es die Verkaufsseite `/buch` für das Buch „Werde Meister
deiner Gedanken" – in **zwei Editionen**:

- **PDF/Download** – **29,90 €** → `STRIPE_BOOK_PRICE_ID`
- **gedruckt/Versand** – **39,90 €** → `STRIPE_BOOK_PRICE_ID_PRINT`

Anders als die Mitgliedschaft ist das ein **Einmalkauf** (`mode: "payment"`,
kein Abo) – daher ein eigenes Produkt mit zwei Preisen und eine eigene
Checkout-Route (`/api/buch-checkout`). Der Webhook und die Supabase-Tabelle
`memberships` sind **nicht** beteiligt: Es entsteht kein Konto und kein
Mitgliederzugang, nur eine Bestellung in Stripe.

### Schnell-Checkliste

1. **Stripe-Produkt** „Werde Meister deiner Gedanken (Buch)" anlegen und **zwei
   einmalige Preise** hinzufügen: **29,90 € (EUR)** für die PDF-Edition
   → `STRIPE_BOOK_PRICE_ID`, und **39,90 € (EUR)** für die gedruckte Edition
   → `STRIPE_BOOK_PRICE_ID_PRINT`.
2. **Env-Variablen** im Hosting setzen: `STRIPE_BOOK_PRICE_ID=price_…` und
   `STRIPE_BOOK_PRICE_ID_PRINT=price_…` (`STRIPE_SECRET_KEY` ist derselbe wie
   beim Abo, muss also nur einmal gesetzt sein).
3. Im **Stripe-Testmodus** mit Karte `4242 4242 4242 4242` je einen Kauf
   (PDF und gedruckt) durchspielen → in Stripe erscheint eine bezahlte
   `Checkout Session` mit den Metadaten `produkt=buch-werde-meister-deiner-gedanken`
   und `edition=pdf` bzw. `edition=print`.
4. Auf **Live-Keys** umstellen.
5. **Preise** in `src/app/buch/page.tsx` (Konstanten `PRICE_PDF` / `PRICE_PRINT`)
   anpassen, falls sich die Beträge ändern (dort zentral für Hero, Angebotsbox
   und CTA).

Ist ein Preis (oder der Secret-Key) **nicht** gesetzt, führt der jeweilige
Bestell-Button sanft zum Kontaktformular (`/kontakt?thema=buch`). Nur die PDF-
Edition angelegt? Dann bleibt PDF kaufbar, „Gedruckt" landet beim Kontakt – und
umgekehrt. Die Seite bleibt also jederzeit funktionsfähig.

### Ablauf

1. Besucher wählt eine Edition und klickt **PDF für 29,90 € kaufen** bzw.
   **Gedruckt für 39,90 € bestellen** → `POST /api/buch-checkout` (Formularfeld
   `edition=pdf|print`).
2. Die Route erstellt eine Stripe-Checkout-Session (Modus: **Einmalzahlung**).
   Nur die **gedruckte** Edition erfasst zusätzlich eine **Lieferadresse**
   (Versand DE/AT/CH); die PDF-Edition ist ein reiner Download.
3. Nach Zahlung → Weiterleitung auf `/buch?checkout=erfolg&edition=…`
   (editionsabhängiger Danke-Hinweis). Abbruch → `/buch?checkout=abgebrochen`,
   Fehler → `/buch?checkout=fehler`.

> **Hinweis Fulfillment:**
> - **PDF-Edition: automatisch.** Nach erfolgreicher Zahlung schickt der
>   Stripe-Webhook (`checkout.session.completed`, `metadata.produkt=buch-…`,
>   `edition=pdf`) das Buch-PDF automatisch per E-Mail an die Kaufadresse
>   (`content/pdf/Werde-Meister-deiner-Gedanken.pdf` als Anhang). Voraussetzung:
>   `RESEND_API_KEY` gesetzt und der Webhook-Endpoint eingerichtet (s. o.).
> - **Gedruckte Edition: manuell.** Die Käufer:in bekommt automatisch eine
>   **Bestellbestätigung** per E-Mail; der **Versand** selbst erfolgt von Hand –
>   die Bestellung inkl. Lieferadresse liegt in Stripe (Dashboard → Payments).
>
> Schlägt der Mailversand fehl, endet der Webhook mit 500 und Stripe stellt
> erneut zu – so geht keine Lieferung verloren. Absender über `BUCH_FROM`
> (fällt sonst auf `EBOOK_FROM`/`CONTACT_FROM` zurück).

### Einrichtung (durch Heiko)

- Stripe-Dashboard → **Product catalog** → Produkt „Werde Meister deiner
  Gedanken (Buch)" anlegen.
- **Zwei** Preise hinzufügen, jeweils **Einmalig**: **29,90 EUR** (PDF) und
  **39,90 EUR** (gedruckt) → beide **Price-IDs** (`price_…`) kopieren.
- Env (Vercel → Settings → Environment Variables):
  ```
  STRIPE_BOOK_PRICE_ID=price_…          # PDF (29,90 €)
  STRIPE_BOOK_PRICE_ID_PRINT=price_…    # gedruckt (39,90 €)
  ```
- Testen wie oben (Testkarte `4242 4242 4242 4242`), dann Live.

## Beteiligte Dateien
- `src/lib/stripe.ts` – Stripe-Client & Konfiguration (inkl. `STRIPE_BOOK_PRICE_ID`, `STRIPE_BOOK_PRICE_ID_PRINT`, `bookPriceIdForEdition`)
- `src/lib/membership.ts` – Status-Abfrage pro E-Mail
- `src/components/membership/CheckoutButton.tsx` – Abo-Button (Formular → Checkout)
- `src/app/api/checkout/route.ts` – startet den Abo-Checkout
- `src/app/api/stripe/webhook/route.ts` – pflegt die Mitgliedschaft
- `src/app/mitgliedschaft/willkommen/page.tsx` – Danke-/Nächste-Schritte-Seite
- `supabase/migrations/0007_membership.sql` – Tabelle `memberships`
- `src/components/sections/BuchKaufenButton.tsx` – Buch-Button (Formular → Checkout)
- `src/app/api/buch-checkout/route.ts` – startet den Buch-Einmalkauf (Edition `pdf`/`print`)
- `src/app/buch/page.tsx` – Verkaufsseite Buch (Preis-Konstanten `PRICE_PDF` / `PRICE_PRINT`)
- `src/app/api/stripe/webhook/route.ts` – liefert das Buch nach Zahlung aus (PDF-Mail bzw. Print-Bestätigung)
- `src/lib/buch-mail.ts` – Liefer-/Bestätigungsmail für den Buch-Kauf (Resend)
- `src/lib/pdf/buch-file.ts` – lädt das Buch-PDF (`content/pdf/…`) für den Anhang
