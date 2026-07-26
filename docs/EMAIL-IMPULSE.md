# Wöchentliche E-Mail-Impulse

Kurze, bodenständige Impulse entlang der 7 Stufen, die Mitglieder mit aktivem
Opt-in per E-Mail erhalten. Serienversand über [Resend](https://resend.com),
ausgelöst durch einen externen Cron-Aufruf.

## Bestandteile

| Teil | Datei |
|------|-------|
| Opt-in am Profil + Abmelde-Token | `supabase/migrations/0004_newsletter.sql` |
| Opt-in-Schalter (Dashboard) | `src/components/members/NewsletterToggle.tsx`, Action in `src/app/mitglieder/actions.ts` |
| Impuls-Inhalte | `src/lib/impulses.ts` |
| Serienversand (geschützt) | `src/app/api/impulses/route.ts` |
| 1-Klick-Abmeldung | `src/app/api/impulses/unsubscribe/route.ts` |
| Service-Role-Client | `src/lib/supabase/admin.ts` |

## Einrichtung

1. **Migration ausführen:** SQL aus `0004_newsletter.sql` (nach `0002`) im
   Supabase SQL-Editor laufen lassen.
2. **Umgebungsvariablen** setzen (siehe `.env.local.example`):
   - `RESEND_API_KEY` – Mailversand
   - `SUPABASE_SERVICE_ROLE_KEY` – liest alle Opt-in-Profile (RLS-Bypass);
     **nur serverseitig**, niemals mit `NEXT_PUBLIC_` prefixen
   - `CRON_SECRET` – schützt die Versand-Route
   - `IMPULSE_FROM` (optional) – Absenderadresse (nach Domain-Verifizierung
     bei Resend die eigene Domain verwenden)
3. **Cron einrichten**, der wöchentlich die Versand-Route aufruft, z. B. mit
   Vercel Cron (`vercel.json`):
   ```json
   {
     "crons": [{ "path": "/api/impulses", "schedule": "0 7 * * 1" }]
   }
   ```
   Vercel Cron sendet automatisch den Header `Authorization: Bearer $CRON_SECRET`,
   wenn `CRON_SECRET` als Env-Var gesetzt ist. Alternativ ein beliebiger
   Scheduler mit `?secret=<CRON_SECRET>` oder dem Bearer-Header.

## Ablauf

- Jeder Lauf schickt jeder opted-in Person den **nächsten** Impuls
  (`impulse_index` am Profil zählt hoch, die Serie läuft zyklisch über alle
  Einträge in `impulses.ts`).
- Jede Mail enthält einen **Abmeldelink** (`/api/impulses/unsubscribe?token=…`).
- Ohne die nötigen Keys antwortet die Route mit `503 not_configured` und
  verschickt nichts – nichts bricht.

## Hinweise / DSGVO

- Es gilt **Single-Opt-in** für bereits eingeloggte, verifizierte Mitglieder,
  mit klarem Consent (Schalter) + jederzeitiger 1-Klick-Abmeldung. Für einen
  öffentlichen Newsletter (Nicht-Mitglieder) wäre **Double-Opt-in** zu ergänzen.
- Der Versand läuft aktuell **sequenziell**; für große Verteiler sollten
  Batching/Throttling bzw. Resend-Batch-Endpunkte ergänzt werden.
- Der Zeitpunkt des Opt-in wird in `newsletter_opted_in_at` protokolliert.
