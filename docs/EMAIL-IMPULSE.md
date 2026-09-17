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
3. **Cron einrichten**, der wöchentlich die Versand-Route aufruft. Produktiv
   läuft die Seite als Docker-Compose-Stack (kein Vercel), deshalb übernimmt das
   ein eigener `busybox`-crond-Dienst **`impuls-cron`** in der Compose-Datei
   (`deploy/docker-compose.yml`, produktiv gespiegelt in
   `/opt/mattermost/docker-compose.yml`). Er ruft montags 07:00 intern
   `http://website:3000/api/impulses?secret=$CRON_SECRET` auf – kein
   öffentlicher Port nötig.

   Jeder andere Scheduler funktioniert ebenso: Aufruf mit
   `?secret=<CRON_SECRET>` oder dem Header `Authorization: Bearer <CRON_SECRET>`
   (so würde z. B. Vercel Cron den Header automatisch setzen).

## Testsendung (gefahrlos prüfen)

Ob der Versandweg funktioniert (Resend-Key, Absender, Rendering), lässt sich mit
einer **Testsendung an eine einzige Adresse** prüfen – **ohne** dass der
Verteiler angeschrieben oder ein Zähler verändert wird:

```
GET/POST /api/impulses?secret=<CRON_SECRET>&test=<empfaenger-email>
                       [&impulse=<index>]   # optional, 0-basiert, Standard 0
```

- Braucht nur `CRON_SECRET` **und** `RESEND_API_KEY` (kein Service-Role-Key).
- Der Betreff wird mit `[TEST]` gekennzeichnet; die Mail liest die
  Empfängertabellen **nicht** und schreibt **keine** `impulse_index`-Werte fort.
- Antwort bei Erfolg: `{ ok: true, test: true, to, impulseIndex, subject }`.
- Solange die Domain bei Resend nicht verifiziert ist (Absender
  `onboarding@resend.dev`), stellt Resend nur an die eigene Konto-Adresse zu –
  für den Test also die eigene Adresse verwenden.

Beispiel (produktiv, intern im Docker-Netz):

```
curl "http://website:3000/api/impulses?secret=$CRON_SECRET&test=du@example.com"
```

## Ablauf

- Jeder Lauf schickt der Reihe nach:
  1. jedem **Mitglied** mit Opt-in (`profiles.newsletter_opt_in`) den nächsten
     Impuls (`profiles.impulse_index` zählt hoch),
  2. jedem **bestätigten E-Book-Lead** mit `nurture_opt_in`
     (`ebook_leads.status = 'confirmed'`) den nächsten Impuls
     (`ebook_leads.impulse_index` zählt hoch) – die Brücke E-Book →
     Mitgliedschaft.
- **Keine Doppel-Mails:** Wer als Mitglied schon eine Mail bekommen hat, wird in
  der Lead-Schleife übersprungen (Abgleich per E-Mail).
- Die Serie läuft **zyklisch** über alle Einträge in `impulses.ts` (bewusst
  endlos – die Impulse sind als wiederkehrender Rhythmus gedacht, nicht als
  einmaliger Kurs).
- Jede Mail enthält einen **Abmeldelink**: Mitglieder
  `/api/impulses/unsubscribe?token=…`, Leads `/api/ebook/unsubscribe?token=…`.
- Ohne die nötigen Keys antwortet die Route mit `503 not_configured` und
  verschickt nichts – nichts bricht.

## Hinweise / DSGVO

- Es gilt **Single-Opt-in** für bereits eingeloggte, verifizierte Mitglieder,
  mit klarem Consent (Schalter) + jederzeitiger 1-Klick-Abmeldung. Für einen
  öffentlichen Newsletter (Nicht-Mitglieder) wäre **Double-Opt-in** zu ergänzen.
- Der Versand läuft aktuell **sequenziell**; für große Verteiler sollten
  Batching/Throttling bzw. Resend-Batch-Endpunkte ergänzt werden.
- Der Zeitpunkt des Opt-in wird in `newsletter_opted_in_at` protokolliert.
