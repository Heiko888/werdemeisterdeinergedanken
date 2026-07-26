# Deployment (Hetzner)

Dateien in diesem Ordner richten den Produktionsbetrieb auf dem Hetzner-Server
ein. Vollständiger Ablauf des Domain-Umzugs: **[../docs/DOMAIN-UMZUG.md](../docs/DOMAIN-UMZUG.md)**.

## Inhalt

| Datei | Zweck |
|-------|-------|
| `docker-compose.yml` | Baut das Image und startet die App auf `127.0.0.1:3000` |
| `.env.example` | Vorlage für `deploy/.env` (Secrets, nicht committen) |
| `nginx/werdemeisterdeinergedanken.conf` | TLS + Hostname-Routing (www/apex/neu) |

## Schnellstart

```bash
cp deploy/.env.example deploy/.env      # Werte eintragen
docker compose -f deploy/docker-compose.yml up -d --build
```

App läuft danach lokal auf Port 3000 – öffentlich wird sie über nginx.

## nginx

```bash
sudo cp deploy/nginx/werdemeisterdeinergedanken.conf /etc/nginx/sites-available/
sudo ln -s /etc/nginx/sites-available/werdemeisterdeinergedanken.conf /etc/nginx/sites-enabled/
sudo nginx -t && sudo systemctl reload nginx
```

## TLS (Let's Encrypt)

```bash
sudo mkdir -p /var/www/certbot
sudo certbot certonly --webroot -w /var/www/certbot \
  -d www.werdemeisterdeinergedanken.de \
  -d werdemeisterdeinergedanken.de \
  -d neu.werdemeisterdeinergedanken.de
```

Auto-Renewal prüfen: `sudo certbot renew --dry-run`.

## Update ausrollen

```bash
git pull
docker compose -f deploy/docker-compose.yml up -d --build
```
