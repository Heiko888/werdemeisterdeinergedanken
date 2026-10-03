# Datenschutz – offene Abgleiche (intern)

Interne TODO-Liste: Welche **tatsächlich im Code eingesetzten** externen Dienste
müssen mit der Datenschutzerklärung (`src/app/datenschutz/page.tsx`) noch
vollständig abgeglichen werden? Hier stehen bewusst **keine** fertigen
Klauseln – nur, was geprüft werden muss. Anbieterdaten (Firma, Anschrift,
Drittlandtransfer, AV-Vertrag) bitte aus den Verträgen bzw. Unterlagen der
Anbieter übernehmen, nicht raten.

Stand: 2026-10-03 · Grundlage: Code-Durchsicht (`package.json`,
`src/`, `.env.local.example`).

---

## Bereits am 2026-10-03 korrigiert

- `TTDSG` → `TDDDG` (2×, Cookie-Abschnitt).
- „Lernfortschritt“ → „Nutzungsfortschritt“ (Supabase-Abschnitt).
- Aufsichtsbehörde → Bayerisches Landesamt für Datenschutzaufsicht, Promenade 18,
  91522 Ansbach (ohne Link/Telefon/E-Mail – nicht im Projekt hinterlegt).
- Falsche Querverweise in Punkt 8 (Resend = Punkt 9, Supabase = Punkt 10).

## Offen – je Dienst

### Anthropic API (KI)
- **Im Code:** `@anthropic-ai/sdk`; Muster-Spiegel (`muster-actions.ts`, aktiv),
  Manipulations-Detektor (`detektor-actions.ts`, aktiv sobald Key gesetzt),
  KI-Begleiter und KI-Reading (per Schalter derzeit **aus**).
- **In der Erklärung:** **fehlt komplett.**
- Prüfen: Welche Daten gehen raus (Journal-Texte, Detektor-Eingaben,
  Profilwerte)? Rechtsgrundlage, Einwilligung vor dem Klick, Anbieter/Sitz,
  Drittlandtransfer, AV-Vertrag/Datenschutzbedingungen, Speicherdauer beim
  Anbieter, Speicherung der Ergebnisse in Supabase (`muster_spiegel`,
  `detektor_checks`, `gedanken_readings`, `begleiter_messages`).

### Stripe (Zahlungen)
- **Im Code:** `stripe`; `/api/buch-checkout` (Buchverkauf, aktiv),
  `/api/checkout` (Mitgliedschaft, derzeit gesperrt), `/api/stripe/webhook`.
- **In der Erklärung:** **fehlt komplett.**
- Prüfen: Rolle (eigener Verantwortlicher vs. Auftragsverarbeiter), übermittelte
  Daten (E-Mail, Zahlungsdaten bei Stripe), Rechtsgrundlage, Drittland,
  Aufbewahrung (steuerliche Pflichten).

### Supabase (Auth & Datenbank)
- **Im Code:** Login, Profile, Fortschritt, Journal, Test-Ergebnisse,
  Leads inkl. Test-Stufe (`ebook_leads`), Kontaktanfragen (`kontakt_anfragen`),
  Klarheitsgespräch-Fragebögen, Rate-Limits (IP-bezogen).
- **In der Erklärung:** vorhanden, aber unvollständig.
- Prüfen: Server-Standort „Frankfurt“ gegen das tatsächliche Projekt prüfen;
  Liste der gespeicherten Daten ergänzen (Kontaktanfragen, Test-Leads mit
  Test-Stufe, KI-Ergebnisse, Fragebögen, IP für Rate-Limiting);
  Speicherdauern je Tabelle; AV-Vertrag.

### Resend (E-Mail)
- **Im Code:** `resend`; Double-Opt-in, E-Book, Test-Ergebnis-Mails,
  E-Mail-Folgen (`src/lib/sequences.ts`), Kontakt-Benachrichtigung,
  Impulse-Mails, Buch-Download.
- **In der Erklärung:** vorhanden.
- Prüfen: Anbieterangaben, Drittlandtransfer und Rechtsgrundlage gegen die
  aktuellen Resend-Unterlagen; ob die automatisierten E-Mail-Folgen und
  Öffnungs-/Klick-Tracking (falls aktiv) beschrieben sind.

### Google Analytics 4
- **Im Code:** `src/components/analytics/GoogleAnalytics.tsx`, nur mit
  `NEXT_PUBLIC_GA_ID` und nach Einwilligung.
- **In der Erklärung:** vorhanden.
- Prüfen: Angaben zu Anbieter, Datenkategorien, Speicherdauer der Cookies,
  „IP-Anonymisierung“ (bei GA4 anders gelöst als bei Universal Analytics –
  Formulierung prüfen), Drittlandtransfer.

### Hetzner (Hosting)
- **Im Code/Doku:** Hosting laut Datenschutzerklärung.
- **In der Erklärung:** vorhanden.
- Prüfen: Anbieterangaben gegen den Vertrag, AV-Vertrag, tatsächliche
  Log-Speicherdauer (Erklärung nennt 14 Tage) gegen die Server-Konfiguration.

## Weitere im Code gefundene Dienste (nicht in der Aufgabenliste, aber zu prüfen)

- **Meta-Pixel** (`src/components/analytics/MetaPixel.tsx`): lädt nach
  Einwilligung, sobald `NEXT_PUBLIC_META_PIXEL_ID` gesetzt ist. **Fehlt in der
  Erklärung**, der Cookie-Banner deckt ihn laut Code mit ab.
- **YouTube** (`youtube-nocookie.com`, Vorschaubilder direkt von `i.ytimg.com`)
  in `VideoEmbed.tsx` / `VideoMessage.tsx`: **fehlt in der Erklärung**. Prüfen,
  ob Vorschaubilder schon vor dem Klick vom YouTube-Server geladen werden.
- **Bewusstseinstest-Leads** (`/api/test-lead`): Speicherung von E-Mail und
  ermittelter Test-Stufe in `ebook_leads`, danach E-Mail-Folge – in Punkt 8 nur
  „Newsletter & E-Book“ genannt.
- **Kontaktformular**: Speicherung in Supabase (`kontakt_anfragen`) zusätzlich
  zur E-Mail – Speicherdauer fehlt.
