# Prüf-Team für die Website

Ein Team spezialisierter Claude-Agenten, das die komplette Seite prüft – öffentlicher Bereich **und** Mitgliederbereich. Kein Agent ändert Produktivcode; alle prüfen und berichten. Umsetzungen erfolgen erst nach deiner Freigabe.

## So startest du das Team

Im Claude-Chat einfach:

```
/seiten-check
```

Das startet alle fünf Prüfer parallel und schreibt einen priorisierten Gesamtbericht nach `docs/audit/`.

Nur ein Teilbereich? Zum Beispiel:

```
/seiten-check nur Mitgliederbereich
/seiten-check nur Sicherheit
```

Einen einzelnen Prüfer gezielt aufrufen: „Nutze den **mitglieder-waechter**, um …".

## Die Team-Mitglieder

| Agent | Prüft |
|-------|-------|
| **mitglieder-waechter** | Zugriffsschutz: Sind alle `/mitglieder`-Seiten, Downloads und geschützten APIs wirklich nur nach Login erreichbar? RLS in Supabase. |
| **seiten-pruefer** | Technischer Rundgang: Build/Lint, tote interne Links, Routen, Metadaten, `robots`/`noindex`, Downloads. |
| **sicherheits-pruefer** | API-Routen, Secrets, Eingabevalidierung, Service-Role-Key, Rate-Limiting, Security-Header. |
| **barrierefreiheit-pruefer** | a11y: Semantik, Alt-Texte, Tastatur/Fokus, Kontrast, mobile Darstellung. |
| **inhalts-pruefer** | Vollständigkeit: 7 Stufen, Praxis, Vertiefungen, Blog, PDFs, Impressum/Datenschutz. |
| **design-pruefer** | Design-Umstellung: Ist der Wechsel vom alten „kosmischen" Look aufs neue Design (Anthrazit/Gold, Papier-Flächen, cinematische Bildwelt) überall vollzogen? Altlasten (`bg-cosmic`, `CosmicBackground`, Fremd-Paletten, harte Hex-Farben), Token-/Typografie-Treue und Bilder, die nicht zum Design passen. |

## Wie du das Team weiter ausbaust

**1. Neue Prüfer ergänzen.** Jede Datei `*.md` in diesem Ordner ist ein Agent (Frontmatter `name` + `description`, darunter die Anweisungen). Kopiere eine bestehende Datei als Vorlage. Kandidaten:
- **performance-pruefer** – Ladezeiten, Bildgrößen, Bundle-Größe, Core Web Vitals.
- **seo-pruefer** – Meta-Tags, Open-Graph, strukturierte Daten, Sitemap, interne Verlinkung.
- **dsgvo-pruefer** – Cookie-/Consent-Fluss, Datenverarbeitung, Auftragsverarbeiter (Supabase, Resend), Löschkonzept.
- **e-mail-pruefer** – Zustellbarkeit, Double-Opt-in, Abmelde-Links, Spam-Score der Resend-Templates.
- **text-pruefer** – Rechtschreibung, einheitliche Ansprache (Du/Sie), Markenstimme.

**2. Echte Browser-Prüfung.** Bisher lesen die Agenten den Code. Für echte Klick-Tests kannst du Playwright anbinden (Chromium ist in dieser Umgebung vorinstalliert). Dann prüft ein Agent live: einloggen, Direktlink auf `/mitglieder/stufe/1` ohne Login, Formulare absenden, mobile Ansicht.

**3. Automatisch laufen lassen.** Statt manuell `/seiten-check` zu tippen:
- Als wiederkehrende Aufgabe (z. B. wöchentlich) über eine Routine/einen Cron.
- Als Prüfung bei jedem Pull Request (GitHub Action), die den Bericht als Kommentar anhängt.

**4. Aus Prüfung wird Umsetzung.** Aktuell berichten die Agenten nur. Ein ergänzendes **umsetzungs-team** könnte gefundene 🔴-Punkte nach deiner Freigabe direkt beheben (z. B. eine fehlende `middleware.ts` anlegen) – bewusst getrennt, damit Prüfen und Ändern nie vermischt werden.

**5. Schweregrade schärfen.** Passe in den einzelnen Agenten-Dateien an, was für *dein* Projekt „kritisch" heißt – z. B. Rechtstexte (Impressum/Datenschutz) immer als 🔴, weil rechtlich relevant.

---

# Zweites Team: das Generator-Team

Neben dem Prüf-Team liegt in diesem Ordner ein **Generator-Team**. Es prüft
nicht die Website, sondern **dokumentiert die Build-Generatoren** (PDFs,
Carousels, Reels-Cover, Marketing-Assets, Workshop-Präsentationen, Vorlagen-
Galerie), damit sie reproduzierbar sind. Ergebnis landet in `docs/generatoren/`.

Start: `/generatoren-doku` (optional mit Schwerpunkt, z. B. „nur PDF").

| Agent | Dokumentiert |
|-------|--------------|
| **generator-architekt** | Koordination, Gesamt-Übersicht `docs/generatoren/README.md`, Datenfluss-Diagramm, Abgleich gegen `package.json`. |
| **pdf-dokumentar** | PDF-Generatoren (`tools/pdf/`): E-Books, Mitglieder-PDFs, Drehbücher. |
| **visual-dokumentar** | Bild-Generatoren: Carousels, Reels-Cover, Marketing-Renderer, Vorlagen-Galerie. |
| **workshop-dokumentar** | Workshop-Präsentations-Generator (`tools/workshop/`) + Spec-Format. |
| **content-inventar** | Vollständiges Inhalts-Inventar (Quell-Daten + erzeugte Assets, mit Zählungen). |

Wichtig: Das Generator-Team schreibt **nur** nach `docs/generatoren/` und ändert
keinen Generator- oder App-Code. Prüfen (Prüf-Team) und Dokumentieren
(Generator-Team) bleiben bewusst getrennt.

---

# Drittes Team: das Redaktions-Team

Dieses Team plant **nicht** den Code, sondern den **Social-Media-Content**: Es
erstellt einen kanalübergreifenden Redaktionsplan für **Instagram, Facebook,
LinkedIn und YouTube** – nach dem Prinzip **ein Wochenthema, alle Kanäle
gleichzeitig**. Ergebnis landet in `docs/marketing/` (Master-Plan + Kalender)
und `docs/marketing/redaktionsplan/` (Themen-Backlog + Teil-Pläne je Kanal).

Start:

```
/redaktionsplan
/redaktionsplan Thema Propaganda, 4 Wochen, aktiv
/redaktionsplan nur Instagram
```

`$ARGUMENTS` steuert Thema, Anzahl Wochen, Frequenz-Stufe (`fokussiert` |
`aktiv` | `maximal`, Standard `fokussiert`) und optionalen Kanal-Fokus.

| Agent | Plant |
|-------|-------|
| **redaktions-planer** | Koordination: wählt das Wochenthema, steuert die Kanal-Planer, führt alles zum Master-Plan `docs/marketing/redaktionsplan.md` zusammen und aktualisiert den Kalender `redaktionsplan-kalender.html`. |
| **themen-stratege** | Themen-Backlog + Material-Map je Thema (welches vorhandene Reel/Blog/Vertiefung/Praxis/Zitat passt) → `docs/marketing/redaktionsplan/themen-backlog.md`. |
| **instagram-planer** | Reels, Carousels, Stories, Pitch → `redaktionsplan/instagram.md`. |
| **facebook-planer** | Beiträge, Reel-Crossposts, Community-Fragen → `redaktionsplan/facebook.md`. |
| **linkedin-planer** | Klartext-Textbeiträge, Document-Carousels, Pitches (Berufsbezug) → `redaktionsplan/linkedin.md`. |
| **youtube-planer** | Hauptvideo (Langform) + Shorts inkl. Titel/Beschreibung → `redaktionsplan/youtube.md`. |

**Frequenz-Stufen** (Posts pro Woche):

| Stufe | Instagram | Facebook | LinkedIn | YouTube |
|---|---|---|---|---|
| fokussiert | 4× | 3× | 3× | 1× (+Short) |
| aktiv | 6× (+Stories) | 4× | 4× | 1–2× (+2 Shorts) |
| maximal | täglich | täglich | werktags täglich | 2× + Shorts |

Wichtig: Das Redaktions-Team nutzt **nur vorhandenes Projekt-Material** (Slugs/
Pfade werden am Code belegt, nichts erfunden) und schreibt **ausschließlich**
nach `docs/marketing/`. Es ändert **keinen** App-, Generator- oder Content-Code –
die Produktion der Posts (Filmen, Rendern, Veröffentlichen) bleibt bei dir.
