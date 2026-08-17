# Deployment (Hetzner)

> **Achtung – die Dateien in diesem Ordner sind NICHT der produktive Weg.**
> Produktiv läuft die Website als Service `website` im Compose-Stack
> `/opt/mattermost/docker-compose.yml`, mit **Caddy** (nicht nginx) als
> Reverse-Proxy und automatischem TLS. Der Ordner hier ist eine ältere,
> eigenständige Variante, die auf dem Server nirgends aktiv ist: es existiert
> weder eine `deploy/.env` noch ein laufender nginx.
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

## Inhalt dieses Ordners (Altbestand)

| Datei | Zweck |
|-------|-------|
| `docker-compose.yml` | Eigenständiger Stack, bindet die App an `127.0.0.1:3000` – ungenutzt |
| `.env.example` | Vorlage für ein `deploy/.env`, das produktiv nicht existiert |
| `nginx/werdemeisterdeinergedanken.conf` | nginx-Variante für TLS + Routing – nginx läuft auf dem Server nicht |

Diese Dateien sind als Referenz bzw. für ein mögliches Ausweichszenario
aufgehoben. Wer sie benutzt, startet einen **zweiten**, parallelen Container
neben dem produktiven – beim Port-Mapping auf `3000` kollidiert das mit
`coaching-app`. Also nur bewusst und nach Rücksprache verwenden.
