# Änderungen / Serverstand

Chronologisches Protokoll wichtiger Änderungen am Projekt, damit jederzeit der
aktuelle Stand nachvollziehbar ist. Neueste Einträge oben.

---

## 2026-09-02 – Logo auf der Website getauscht

Das Marken-Emblem wurde **überall auf der Website** durch das neue goldene
Gehirn-Logo (freigestellt) ersetzt. Ausschließlich Website-Anzeigen – Marketing-
und Doku-Assets (`docs/`, Social-Media-Generatoren) blieben unberührt.

**Neue Datei**

- `public/logo-brain-gold-freigestellt.png` (2000×2000, transparent) – neues
  Standard-Emblem. (Hochgeladen als „gold logo freigestellt.png", zur sauberen
  Einbindung ohne Leerzeichen umbenannt.)

**Betroffene Stellen**

- **Header** (`src/components/layout/Header.tsx` → `Logo`/`LogoMark`)
- **Footer** (`src/components/layout/Footer.tsx` → `Logo`)
- **Blog-Index** – dekoratives Emblem (`src/components/blog/BlogIndex.tsx`)
- **Favicon** (`src/app/icon.png`, 256×256, aus dem neuen Logo erzeugt)

**Details**

- `src/components/visuals/Logo.tsx`: Import auf neue Datei umgestellt.
- Der CSS-Gold-Filter `.logo-gold` wurde entfernt (Emblem ist bereits golden –
  ein zusätzlicher Farbfilter hätte den Ton verfälscht). Regel aus
  `src/app/globals.css` gelöscht, Klasse aus `Logo.tsx` und `BlogIndex.tsx`
  entfernt.
- `src/lib/marken-uebersicht.ts`: neues Emblem als aktueller Web-Standard
  eingetragen; altes `logo-brain.png` als frühere Variante markiert.

**Nicht geändert**

- `src/app/opengraph-image.tsx` (OG-/Social-Vorschaubild) enthält kein
  Gehirn-Emblem, nur Text – daher kein Tausch nötig.
- Alte Logo-Dateien (`logo-brain.png`, `logo-brain-gold.png`,
  `logo-brain-tuerkis.png`, `logo-full.png`, `logo.svg`) bleiben als Assets
  erhalten (weiterhin für Marketing/E-Mail/Katalog referenziert).
