#!/usr/bin/env bash
#
# update-vorlagen-galerie.sh
# ---------------------------------------------------------------------------
# Aktualisiert die Vorlagen-Galerie (/admin/vorlagen) auf dem Server, ohne die
# Live-Galerie zu beschädigen.
#
# HINTERGRUND
#   - Der Katalog `src/lib/vorlagen-assets.ts` ist in Git versioniert und wird
#     ins Next.js-Build eingebacken. Er ist die Quelle der Wahrheit.
#   - Die eigentlichen Bilder/ZIPs liegen NICHT in Git, sondern unter
#     content/vorlagen/ und werden auf dem Server aus dem Volume
#     /opt/website-vorlagen in den Container gemountet (-> /app/content/vorlagen).
#   - `npm run vorlagen:galerie` baut content/vorlagen/ komplett neu. Die Quellen
#     fuer Social-Grafiken, Content-/Story-Overlays und Workshop-Dateien liegen
#     in Git und sind daher immer vorhanden. Die Quell-Exporte fuer REELS und
#     STUDIO-CAROUSELS (docs/reels/covers/export, docs/carousels/export, ...)
#     sind gitignored und werden per Chromium/Playwright erzeugt – auf einem
#     reinen Deploy-Server liegen sie meist NICHT vor.
#
# WAS DIESES SKRIPT TUT
#   1. Neusten Stand holen (git pull) und Abhaengigkeiten sicherstellen.
#   2. Das bestehende Volume sichern (Snapshot).
#   3. content/vorlagen/ neu erzeugen (aus den in Git vorhandenen Quellen).
#   4. Den versionierten Katalog wiederherstellen (der Server-Lauf wuerde ihn
#      sonst unvollstaendig ueberschreiben, wenn Reels/Carousel-Quellen fehlen).
#   5. Teil-Galerien, die mangels Quellen NICHT neu gebaut wurden (Reels,
#      Studio-Carousels, Cover-/Carousel-Overlays, Marketing-Carousels), aus
#      dem Snapshot zurueckspielen -> die Live-Galerie verliert nichts.
#   6. Ergebnis nach /opt/website-vorlagen synchronisieren.
#
#   Optional (FULL_REBUILD=1): Wenn die Render-Toolchain (Chromium/Playwright)
#   vorhanden ist, werden Reels- und Carousel-Exporte vorher frisch gerendert
#   und komplett neu gebaut – dann ist kein Zurueckspielen noetig.
#
# VORAUSSETZUNGEN
#   - Node.js + npm, `zip` im PATH (fuer Carousel-/Overlay-ZIPs).
#   - Dieses Skript laeuft in einem Repo-Checkout (REPO_DIR).
#   - VOLUME_DIR ist der HOST-Ordner, der in den Container gemountet wird, und
#     ist NICHT identisch mit REPO_DIR/content/vorlagen.
#
# BENUTZUNG
#   sudo REPO_DIR=/opt/website VOLUME_DIR=/opt/website-vorlagen \
#     bash tools/deploy/update-vorlagen-galerie.sh
#
#   Voll-Neuaufbau (nur wenn Chromium/Playwright vorhanden):
#   FULL_REBUILD=1 bash tools/deploy/update-vorlagen-galerie.sh
#
# WICHTIG
#   Der aktualisierte KATALOG wird erst live, wenn das App-Image mit dem neuen
#   Stand neu gebaut und der Container neu gestartet wurde (der Katalog ist ins
#   Build eingebacken). Bilder aus dem Volume erscheinen dagegen sofort.
# ---------------------------------------------------------------------------

set -euo pipefail

# --- Konfiguration (per Env ueberschreibbar) -------------------------------
REPO_DIR="${REPO_DIR:-$(pwd)}"
VOLUME_DIR="${VOLUME_DIR:-/opt/website-vorlagen}"
BRANCH="${BRANCH:-main}"
FULL_REBUILD="${FULL_REBUILD:-0}"

# Teil-Galerien, deren Quell-Exporte gitignored sind und auf einem reinen
# Deploy-Server fehlen koennen. Werden aus dem Snapshot zurueckgespielt, falls
# der Neu-Lauf sie nicht erzeugt hat.
PRESERVE_SUBS=(reels carousels cover-overlay carousel-overlay marketing)

log()  { printf '\033[1;36m[vorlagen]\033[0m %s\n' "$*"; }
warn() { printf '\033[1;33m[vorlagen] WARNUNG:\033[0m %s\n' "$*" >&2; }
die()  { printf '\033[1;31m[vorlagen] FEHLER:\033[0m %s\n' "$*" >&2; exit 1; }

# --- Vorbedingungen pruefen -------------------------------------------------
command -v node >/dev/null || die "node nicht gefunden."
command -v npm  >/dev/null || die "npm nicht gefunden."
command -v zip  >/dev/null || die "zip nicht gefunden (fuer Carousel-/Overlay-ZIPs noetig)."
command -v rsync >/dev/null || die "rsync nicht gefunden."

[ -d "$REPO_DIR/.git" ] || die "REPO_DIR ist kein Git-Checkout: $REPO_DIR"
cd "$REPO_DIR"

OUT_DIR="$REPO_DIR/content/vorlagen"
[ "$(readlink -f "$OUT_DIR")" != "$(readlink -f "$VOLUME_DIR")" ] \
  || die "VOLUME_DIR darf nicht REPO_DIR/content/vorlagen sein ($VOLUME_DIR)."

# --- 1. Code + Abhaengigkeiten ---------------------------------------------
log "Hole neusten Stand ($BRANCH) …"
git fetch origin "$BRANCH" --quiet
git checkout "$BRANCH" --quiet
git pull --ff-only origin "$BRANCH" --quiet

log "Installiere Abhaengigkeiten (npm ci) …"
npm ci --no-audit --no-fund

# --- 2. Snapshot des bestehenden Volumes -----------------------------------
BACKUP_DIR="$(mktemp -d)"
trap 'rm -rf "$BACKUP_DIR"' EXIT
if [ -d "$VOLUME_DIR" ] && [ -n "$(ls -A "$VOLUME_DIR" 2>/dev/null || true)" ]; then
  log "Sichere bestehendes Volume ($VOLUME_DIR) …"
  cp -a "$VOLUME_DIR/." "$BACKUP_DIR/"
else
  warn "Kein/leeres Volume unter $VOLUME_DIR – nichts zu sichern."
fi

# --- 3. (optional) Reels/Carousels frisch rendern --------------------------
if [ "$FULL_REBUILD" = "1" ]; then
  log "FULL_REBUILD=1 – rendere Reels/Carousel-Exporte neu (braucht Chromium/Playwright) …"
  npm run covers
  npm run covers:png
  npm run carousels:slides
  npm run carousels:png
fi

# --- 4. Galerie neu erzeugen -----------------------------------------------
log "Erzeuge content/vorlagen/ neu (npm run vorlagen:galerie) …"
npm run vorlagen:galerie

# --- 5. Versionierten Katalog wiederherstellen ------------------------------
# Der Server-Lauf ueberschreibt src/lib/vorlagen-assets.ts. Fehlen Reels-/
# Carousel-Quellen, waere der neu geschriebene Katalog unvollstaendig. Der in
# Git versionierte Katalog ist die Quelle der Wahrheit -> wiederherstellen.
if [ "$FULL_REBUILD" != "1" ]; then
  log "Stelle versionierten Katalog wieder her (git checkout src/lib/vorlagen-assets.ts) …"
  git checkout -- src/lib/vorlagen-assets.ts
fi

# --- 6. Fehlende Teil-Galerien aus dem Snapshot zurueckspielen --------------
if [ "$FULL_REBUILD" != "1" ] && [ -d "$BACKUP_DIR" ]; then
  for sub in "${PRESERVE_SUBS[@]}"; do
    if [ ! -d "$OUT_DIR/$sub" ] && [ -d "$BACKUP_DIR/$sub" ]; then
      log "Bewahre Teil-Galerie '$sub' aus dem Snapshot (keine Quelle im Checkout) …"
      cp -a "$BACKUP_DIR/$sub" "$OUT_DIR/$sub"
      # zugehoerige Thumbs (falls vorhanden) ebenfalls zurueckspielen
      if [ -d "$BACKUP_DIR/thumbs/$sub" ] && [ ! -d "$OUT_DIR/thumbs/$sub" ]; then
        mkdir -p "$OUT_DIR/thumbs"
        cp -a "$BACKUP_DIR/thumbs/$sub" "$OUT_DIR/thumbs/$sub"
      fi
    fi
  done
  # Generischer Lueckenschluss: alles aus dem Snapshot uebernehmen, was der
  # Neu-Lauf NICHT erzeugt hat (ueberschreibt nie frische Dateien).
  cp -an "$BACKUP_DIR/." "$OUT_DIR/" 2>/dev/null || true
fi

# --- 7. Konsistenz-Check: referenziert der Katalog Dateien, die fehlen? -----
log "Pruefe Katalog gegen vorhandene Dateien …"
MISSING="$(node - "$OUT_DIR" <<'NODE'
const fs = require("node:fs");
const path = require("node:path");
const OUT = process.argv[2];
const cat = path.join(process.cwd(), "src", "lib", "vorlagen-assets.ts");
const t = fs.readFileSync(cat, "utf8");
const hrefs = [...t.matchAll(/"(?:href|thumb|zipHref)":\s*"([^"]+)"/g)].map((m) => m[1]);
const missing = [];
for (const h of hrefs) {
  const rel = h.replace(/^\/admin\/vorlagen\/datei\//, "");
  if (!fs.existsSync(path.join(OUT, rel))) missing.push(rel);
}
process.stdout.write(String(missing.length));
if (missing.length) {
  console.error("  fehlende Dateien (erste 10):");
  for (const m of missing.slice(0, 10)) console.error("   - " + m);
}
NODE
)"
if [ "$MISSING" != "0" ]; then
  warn "$MISSING vom Katalog referenzierte Dateien fehlen im Neu-Aufbau."
  warn "Nichts synchronisiert. Meist fehlen die Reels-/Carousel-Quellen –"
  warn "entweder mit FULL_REBUILD=1 (Chromium noetig) laufen lassen oder das"
  warn "bestehende Volume behalten. Abbruch zur Sicherheit."
  die "Konsistenz-Check fehlgeschlagen ($MISSING fehlende Dateien)."
fi
log "Konsistenz-Check ok – keine fehlenden Dateien."

# --- 8. Nach /opt/website-vorlagen synchronisieren -------------------------
log "Synchronisiere -> $VOLUME_DIR …"
mkdir -p "$VOLUME_DIR"
rsync -a --delete "$OUT_DIR/" "$VOLUME_DIR/"

log "Fertig. Volume aktualisiert: $VOLUME_DIR"
log "Hinweis: Fuer den neuen KATALOG das App-Image neu bauen und den Container"
log "         neu starten (der Katalog ist ins Next.js-Build eingebacken)."
