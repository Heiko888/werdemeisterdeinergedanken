# Seiten- & Funktionsdokumentation

Vollständige Dokumentation aller Seiten, Routen, Funktionen, Generatoren und der
Konfiguration von **werdemeisterdeinergedanken** (Next.js 16, App Router).
Erstellt durch ein automatisiertes Doku-Team, das jeden Bereich direkt am echten
Quellcode dokumentiert hat.

> **Zweck:** Damit jederzeit der aktuelle Serverstand nachvollziehbar ist – welche
> Seite was tut, was konfiguriert ist, welche Datenquellen und Umgebungsvariablen
> dahinterstehen und welche Erweiterungen perspektivisch vorgesehen sind.

_Stand: 2026-09-11_

---

## Inhaltsverzeichnis

| # | Dokument | Inhalt |
|---|----------|--------|
| 01 | [Öffentliche Seiten](./01-oeffentliche-seiten.md) | Startseite, Die 7 Stufen, Buch, E-Book, Über mich, Bewusstseinstest, Kontakt, Blog (+Artikel), Impressum, Datenschutz |
| 02 | [Mitgliedschaft & Authentifizierung](./02-mitgliedschaft-auth.md) | Login, Mitgliedschaft, Willkommen, Auth-Callback – kompletter Anmelde-/Registrierungs-/Checkout-Fluss |
| 03 | [Mitgliederbereich (/mitglieder)](./03-mitgliederbereich.md) | Dashboard, 7 Stufen, Praxis, Wissen, Wissensdatenbank, Journal, Detektor, KI-Begleiter, Gedankenprofil, Einstellungen, Programm, Rückkehr, Arbeitsheft – inkl. Zugriffsschutz & KI |
| 04 | [Admin-Bereich (/admin)](./04-admin.md) | Dashboard, Seiten, Redaktionsplan, Marken-Übersicht, Vorlagen, Bewusstseinsbibliothek – inkl. Admin-Zugriffsschutz |
| 05 | [API-Routen](./05-api-routes.md) | Checkout, Buch-Checkout/Download, E-Book (Double-Opt-In), Impulse-Newsletter, Kontakt, Stripe-Webhook, RSS |
| 06 | [Konfiguration & Infrastruktur](./06-konfiguration-infrastruktur.md) | Layout/SEO, next.config, Proxy, Umgebungsvariablen, Supabase/DB, Resend/Mail, robots/sitemap, Docker/Deployment |
| 07 | [Generatoren & Folien](./07-generatoren-und-folien.md) | Alle `tools/`-Skripte: PDF, Marketing, Print, Bilder, Vorlagen-Galerie, Video-Folien, Workshop-Präsentationen |
| 08 | [Verzeichnisse & Datenstruktur](./08-verzeichnisse-und-daten.md) | Kompletter Verzeichnisbaum, `src/lib`-Module, `content/`, `public/`, `docs/`, Datenbank-Datensicht |
| 09 | [Geplante Erweiterungen & Roadmap](./09-geplante-erweiterungen.md) | Deaktivierte/versteckte Funktionen, Platzhalter, Feature-Flags, offene Audit-Punkte, latente Strukturen |
| ★ | [GESAMT-Dokument](./GESAMT.md) | Alle Kapitel oben in einer einzigen Datei gebündelt (zum Lesen/Exportieren) |

---

## Überblick in Zahlen

- **35 Seiten** (`page.tsx`) über öffentlich, Mitgliederbereich und Admin
- **~20 Route-Handler** (`route.ts`): API, geschützte Downloads, RSS, Auth-Callback
- **51 `src/lib`-Module** als Daten- und Logik-Schicht
- **11 Supabase-Tabellen** (`profiles`, `progress`, `notes`, `test_results`,
  `ebook_leads`, `memberships`, `gedanken_readings`, `begleiter_messages`,
  `muster_spiegel`, `rueckkehr`, `redaktionsplan_posts`) mit RLS
- **~40 Generatoren** in `tools/` (PDF, Marketing, Print, Video-Folien, Workshop)
- **KI-Funktionen** auf `claude-opus-5` (Fallback `claude-opus-4-8`)

## Zentrale Architektur-Merkmale

- **Next.js 16 / App Router.** „Middleware" heißt hier **Proxy** (`src/proxy.ts`):
  Host-Kanonisierung, Supabase-Session-Refresh, Login-/Admin-Schutz.
- **Dreischichtiger Zugriffsschutz** für den Mitgliederbereich: Proxy →
  Layout-/Seiten-Check (`supabase.auth.getUser()`) → Download-Guard für PDFs.
  Geschützte PDFs liegen bewusst in `content/pdf/` (nicht `public/`).
- **SEO** über den zentralen `withCanonical()`-Helper (`src/lib/seo.ts`), da
  Next.js Metadaten je Segment ersetzt statt zu mergen.
- **Zahlung** über Stripe (Abo + Buch-Einmalkauf), Freischaltung asynchron per
  signiertem Webhook; **E-Mail** über Resend mit DSGVO-Double-Opt-In.
- **Admin** per `ADMIN_EMAILS` (serverseitig) + `SUPABASE_SERVICE_ROLE_KEY`.

## Pflege der Dokumentation

Die Dateien sind nach Bereichen getrennt, damit einzelne Kapitel bei Änderungen
gezielt aktualisiert werden können. Wichtige Änderungen werden zusätzlich im
chronologischen Änderungsprotokoll [`../AENDERUNGEN.md`](../AENDERUNGEN.md)
festgehalten.

_Stand: 2026-09-11 — automatisch dokumentiert_
