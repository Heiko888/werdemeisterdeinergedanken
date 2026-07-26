# Domain-Umzug: `neu` → Hauptdomain (`www`)

Ziel: Die App, die bisher unter **`neu.werdemeisterdeinergedanken.de`** getestet
wurde, wird zur offiziellen Seite unter **`www.werdemeisterdeinergedanken.de`**
(inkl. Weiterleitung der nackten Domain).

Testing läuft auf **Vercel**, der finale Betrieb auf dem **Hetzner-Server**
(`135.181.26.222`).

---

## Ausgangslage (DNS)

| Host | Typ | Ziel | Bedeutung |
|------|-----|------|-----------|
| `@` (Apex) | A | `85.13.143.66` | **alter Server (ALL-INKL)** |
| `www` | A | `135.181.26.222` | Hetzner |
| `neu` | A | `135.181.26.222` | Hetzner (Test) |
| `auth`, `bewusstseinsentwicklung`, `chat` | A | `135.181.26.222` | weitere Dienste auf Hetzner |

Zwei Baustellen:

1. **Apex zeigt noch auf den alten Server.** `werdemeisterdeinergedanken.de`
   (ohne www) landet auf ALL-INKL statt auf Hetzner.
2. **`neu` soll dauerhaft auf `www` umgeleitet werden**, damit die Test-Domain
   nicht als Duplikat im Index bleibt.

`www` selbst zeigt DNS-technisch bereits auf Hetzner – hier fehlt „nur“ noch,
dass nginx die App auch für `www` (und den Apex-Redirect) ausliefert.

---

## Was der Code bereits erledigt

- **`src/lib/site.ts`** → `url: https://www.werdemeisterdeinergedanken.de`.
  Damit zeigen Canonical-Tags, Sitemap, robots.txt und OpenGraph immer auf `www`
  – auch während des Tests auf Vercel. Kein Duplicate-Content.
- **`src/proxy.ts`** (früher `middleware.ts`; in Next.js 16 heißt Middleware
  jetzt **Proxy**):
  - leitet `neu.` und die nackte Domain per **301 auf `https://www.…`** um,
  - setzt für alle Nicht-`www`-Hosts (z. B. Vercel-Preview) den Header
    **`X-Robots-Tag: noindex`**,
  - schützt weiterhin `/mitglieder` und frischt die Supabase-Session auf.
  - Abschaltbar über `ENFORCE_CANONICAL_HOST=false` (für die Umbauphase).

---

## Ablauf

### Phase 0 – Test auf Vercel (keine DNS-Änderung nötig)

- App auf Vercel deployen, über die `*.vercel.app`-URL testen.
- In Vercel unter **Settings → Environment Variables** setzen:
  `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`,
  `RESEND_API_KEY`, `CONTACT_TO`, `CONTACT_FROM`.
- Die Preview bekommt automatisch `noindex` (nicht-kanonischer Host).

### Phase 1 – App auf Hetzner starten

```bash
# auf dem Hetzner-Server, im geklonten Repo:
cp deploy/.env.example deploy/.env
nano deploy/.env                     # Werte eintragen

# Während www noch nicht live ist, Auto-Redirect aus lassen:
#   ENFORCE_CANONICAL_HOST=false
docker compose -f deploy/docker-compose.yml up -d --build
```

Die App lauscht danach auf `127.0.0.1:3000` (nur lokal).

### Phase 2 – nginx für `www` + Zertifikat

```bash
# vHost einspielen
sudo cp deploy/nginx/werdemeisterdeinergedanken.conf \
        /etc/nginx/sites-available/werdemeisterdeinergedanken.conf
sudo ln -s /etc/nginx/sites-available/werdemeisterdeinergedanken.conf \
           /etc/nginx/sites-enabled/

# Zertifikat für www + Apex + neu (webroot muss erreichbar sein)
sudo mkdir -p /var/www/certbot
sudo certbot certonly --webroot -w /var/www/certbot \
  -d www.werdemeisterdeinergedanken.de \
  -d werdemeisterdeinergedanken.de \
  -d neu.werdemeisterdeinergedanken.de

sudo nginx -t && sudo systemctl reload nginx
```

Prüfen: `https://www.werdemeisterdeinergedanken.de` zeigt die neue App.

### Phase 3 – Umschalten scharf stellen

1. **Apex-DNS umbiegen** (im DNS-Panel):
   `@  A  85.13.143.66` → **`@  A  135.181.26.222`**
2. **Auto-Redirect aktivieren**: in `deploy/.env`
   `ENFORCE_CANONICAL_HOST=true`, dann
   `docker compose -f deploy/docker-compose.yml up -d`.
3. Kontrolle:
   - `http://…` → `https://www.…` (301)
   - `https://werdemeisterdeinergedanken.de` → `https://www.…` (301)
   - `https://neu.werdemeisterdeinergedanken.de` → `https://www.…` (301)

### Phase 4 – Supabase

In **Supabase → Authentication → URL Configuration**:

- **Site URL**: `https://www.werdemeisterdeinergedanken.de`
- **Redirect URLs** zusätzlich freischalten (für Test/Übergang):
  `https://www.werdemeisterdeinergedanken.de/**`,
  ggf. `https://*.vercel.app/**`.

Sonst brechen Login-/Bestätigungs-Links, weil `auth/actions.ts` und
`auth/callback/route.ts` mit der dynamischen Origin arbeiten.

---

## Reihenfolge in einem Satz

Erst **www-nginx + Zertifikat** live und testen → dann **Apex-DNS** umbiegen →
zuletzt **`ENFORCE_CANONICAL_HOST=true`**. So gibt es zu keinem Zeitpunkt einen
Redirect ins Leere.

## Rollback

- Apex-DNS zurück auf `85.13.143.66`.
- `ENFORCE_CANONICAL_HOST=false` setzen und Container neu starten.
- nginx-Symlink in `sites-enabled` entfernen und `systemctl reload nginx`.

## Hinweise

- **Mail** läuft über Microsoft 365 (MX → outlook). Am DNS-Umzug der Web-Domain
  ändert sich daran nichts – MX/TXT/CNAME-Einträge für Mail unangetastet lassen.
- **Resend/`CONTACT_FROM`**: erst nach Domain-Verifizierung auf eine eigene
  Absenderadresse umstellen; bis dahin bleibt `onboarding@resend.dev`.
