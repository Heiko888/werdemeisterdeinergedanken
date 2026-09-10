# Deployment (Hetzner)

> **Achtung – aus diesem Ordner heraus wird nichts ausgerollt.**
> Produktiv läuft die Website als Service `website` im Compose-Stack
> `/opt/mattermost/docker-compose.yml`, mit **Caddy** (nicht nginx) als
> Reverse-Proxy und automatischem TLS. `docker-compose.yml` hier ist die
> versionierte **Spiegelung** jenes Service – zum Nachschlagen, nicht zum
> Starten. Eine `deploy/.env` existiert auf dem Server nicht (die Werte
> stehen in `/opt/mattermost/.env`), und nginx läuft dort nirgends.
>
> Vollständiger Ablauf des Domain-Umzugs: **[../docs/DOMAIN-UMZUG.md](../docs/DOMAIN-UMZUG.md)**.

## Update ausrollen (der echte Weg)

```bash
git -C /opt/website pull
docker compose -f /opt/mattermost/docker-compose.yml up -d --build website
```

Danach prüfen:

```bash
docker ps --filter name=mattermost-website-1
curl -s -o /dev/null -w '%{http_code}\n' -L https://www.werdemeisterdeinergedanken.de/
```

## Wie es produktiv zusammenhängt

| Baustein | Ort |
|----------|-----|
| Quellcode / Build-Context | `/opt/website` (dieses Repo) |
| Compose-Stack | `/opt/mattermost/docker-compose.yml`, Service `website` |
| Secrets & Build-Args | `/opt/mattermost/.env` |
| Reverse-Proxy + TLS | Caddy (`/opt/mattermost/caddy/Caddyfile`) |
| Container | `mattermost-website-1`, nur `expose: 3000` – kein Host-Port |

Routing laut Caddyfile:

- `www.werdemeisterdeinergedanken.de` → `reverse_proxy website:3000`
- `werdemeisterdeinergedanken.de` → 301 auf `www.`
- `neu.` / `www.neu.` → ebenfalls `website:3000`

TLS-Zertifikate holt und erneuert Caddy selbst – kein certbot, kein Cron.

### Wann ist ein Rebuild nötig?

`NEXT_PUBLIC_*` wird zur **Buildzeit** ins Client-Bundle eingebacken. Werden
diese Werte in `/opt/mattermost/.env` geändert, braucht es ein `--build`.
Alle übrigen Variablen (`RESEND_API_KEY`, `SUPABASE_SERVICE_ROLE_KEY`,
`CRON_SECRET`, `ANTHROPIC_API_KEY`, `ADMIN_EMAILS`, `ENFORCE_CANONICAL_HOST`)
werden zur **Laufzeit** gelesen – dort genügt:

```bash
docker compose -f /opt/mattermost/docker-compose.yml up -d website
```

## Inhalt dieses Ordners

| Datei | Zweck |
|-------|-------|
| `docker-compose.yml` | **Spiegelung** des produktiven Service `website` – versioniert, damit Build-Args, Env und Mounts im Repo nachvollziehbar sind |
| `.env.example` | Dokumentiert die Variablen, die produktiv in `/opt/mattermost/.env` stehen |
| `nginx/werdemeisterdeinergedanken.conf` | Altbestand aus der nginx-Ära – nginx läuft auf dem Server nicht, TLS macht Caddy |

### Warum eine Spiegelung?

Der produktive Stack liegt unter `/opt/mattermost/docker-compose.yml` und kann
nicht in dieses Repo wandern: dort stehen auch Caddy, Mattermost und Postgres.
Damit trotzdem versioniert ist, *wie* die App läuft, bildet
`deploy/docker-compose.yml` den Service `website` 1:1 nach.

**Beide Dateien müssen von Hand synchron gehalten werden.** Ob sie es sind,
prüft dieser Vergleich – er darf nichts ausgeben:

```bash
diff <(docker compose -f /opt/mattermost/docker-compose.yml config \
         | awk '/^  website:/{f=1} f&&/^  [a-z]/&&!/^  website:/{f=0} f') \
     <(docker compose --env-file /opt/mattermost/.env \
         -f /opt/website/deploy/docker-compose.yml config \
         | awk '/^  website:/{f=1} f&&/^  [a-z]/&&!/^  website:/{f=0} f')
```

Ein `docker compose -f deploy/docker-compose.yml up` startet einen **zweiten**,
isolierten Container (eigener Projektname `wmdg-website-spiegel`, eigenes Netz,
kein Host-Port). Caddy kennt ihn nicht – die Live-Seite bleibt unberührt. Er
kostet nur Plattenplatz und stiftet Verwirrung; gewollt ist er nie.
