# Supabase Edge Functions

Referenz-Quellcode der Edge Functions – **bereits in der Produktion deployt**.
Analog zum `seed/`-Ordner dient dieser Ordner der Nachvollziehbarkeit und
Reproduzierbarkeit; es läuft kein automatischer Deploy aus dem Repo.

## `neuer-fragebogen`

Verschickt eine E-Mail an Heiko, sobald ein neuer Fragebogen zum
Klarheitsgespräch eingeht. Ausgelöst vom Datenbank-Trigger
`erstgespraech_fragebogen_benachrichtigung` (Migration
`20260914174236_benachrichtigung_neuer_fragebogen.sql`), der per `pg_net` einen
signierten HTTP-POST an diese Function sendet.

**Secrets (Dashboard → Edge Functions → Secrets):**

| Secret | Zweck |
|---|---|
| `RESEND_API_KEY` | Versand über resend.com |
| `WEBHOOK_SECRET` | muss identisch zum Vault-Secret `fragebogen_webhook_secret` sein (Trigger ↔ Function) |
| `BENACHRICHTIGUNG_AN` | optional, Empfänger (Standard: heiko.schwaninger@outlook.com) |
| `ABSENDER` | optional, Absender (Standard: onboarding@resend.dev) |

**Deploy (bei Änderungen):**

```bash
supabase functions deploy neuer-fragebogen --no-verify-jwt
```

`--no-verify-jwt`, weil die Function ihre eigene Zugangsprüfung über
`WEBHOOK_SECRET` macht (der Aufruf kommt vom DB-Trigger, nicht von einem
angemeldeten Nutzer).
