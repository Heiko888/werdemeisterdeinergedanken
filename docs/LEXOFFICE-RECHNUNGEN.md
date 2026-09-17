# lexoffice – automatische Rechnungen

Nach einem bezahlten **Buch-Einmalkauf** legt das Projekt automatisch einen
**Rechnungs-Entwurf** in [lexoffice](https://www.lexware.de/lexoffice/) an, damit
Rechnungen nicht mehr von Hand erfasst werden müssen.

> **Stand: Stufe 1 – nur Buch-Einmalkauf, nur Entwurf.**
> Das Abo/die Mitgliedschaft ist noch NICHT angebunden. Rechnungen werden als
> Entwurf erzeugt und in lexoffice manuell geprüft, festgeschrieben und versendet.

## Ablauf

1. Kauf über Stripe (`/api/buch-checkout` → gehostete Bezahlseite).
2. Stripe meldet `checkout.session.completed` an den Webhook
   `src/app/api/stripe/webhook/route.ts`.
3. Der Webhook protokolliert die Bestellung (`book_orders`) **und** legt über
   `src/lib/lexoffice.ts` einen Rechnungs-**Entwurf** in lexoffice an
   (`POST /v1/invoices?finalize=false`).
4. ID und Link des Entwurfs werden an der Bestellung gespeichert
   (`book_orders.lexoffice_invoice_id` / `.lexoffice_invoice_url`).
5. Du öffnest den Entwurf in lexoffice, prüfst ihn, schreibst ihn fest und
   versendest ihn.

Das Anlegen ist **best effort und idempotent**: Es blockiert die Buch-Auslieferung
niemals, und eine erneute Zustellung desselben Stripe-Events erzeugt keinen
zweiten Entwurf (geprüft über die bereits gespeicherte `lexoffice_invoice_id`).

## Steuer

- Es wird **Umsatzsteuer ausgewiesen**.
- Die Stripe-Beträge (29,90 € / 39,90 €) sind **Bruttopreise**. Die Rechnung
  rechnet daher brutto (`taxType: "gross"`), sodass der Endbetrag exakt dem
  gezahlten Betrag entspricht; die USt. wird herausgerechnet und gesondert
  ausgewiesen.
- **Satz:** Standard **7 %** (ermäßigter Satz für Bücher und E-Books in DE),
  einstellbar über `LEXOFFICE_VAT_RATE`.
- **Absenderdaten** (Firma, Anschrift, Steuernummer/USt-IdNr.) kommen aus dem
  **lexoffice-Profil** – bitte dort vollständig hinterlegen.

## Konfiguration

In `.env.local` (lokal) bzw. Vercel → Settings → Environment Variables:

| Variable | Zweck |
|---|---|
| `LEXOFFICE_API_KEY` | API-Schlüssel aus lexoffice (Einstellungen → öffentliche API). Ohne ihn ist die Anbindung inaktiv. Nie mit `NEXT_PUBLIC_` prefixen. |
| `LEXOFFICE_VAT_RATE` | Umsatzsteuersatz in Prozent (Standard `7`). |

Zusätzlich nötig: `SUPABASE_SERVICE_ROLE_KEY` und die Migration
`supabase/migrations/0017_book_orders_lexoffice.sql`.

## Grenzen / bewusst (noch) nicht umgesetzt

- **Kein automatischer Versand an die Kundschaft.** Die lexoffice-API hat keinen
  „Rechnung per E-Mail senden“-Endpunkt; der Versand läuft vorerst manuell aus
  lexoffice heraus. (Später möglich: PDF über die Files-API abrufen und über den
  bereits integrierten Resend-Versand mitschicken.)
- **Kein Festschreiben.** Es werden nur Entwürfe erzeugt (`finalize=false`).
- **Abo/Mitgliedschaft** ist noch nicht angebunden (folgt als Stufe 2).

## Nächste Schritte (offen)

- Stufe 2: Rechnungen für die Mitgliedschaft (wiederkehrende Abo-Abrechnung).
- Optional: Entwürfe automatisch festschreiben und die Rechnung per Resend an die
  Kundschaft senden.
- Optional: Storno/Gutschrift bei Rückerstattung.
