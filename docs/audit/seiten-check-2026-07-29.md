# Seiten-Check – Gesamtbericht

**Datum:** 2026-07-29
**Geprüft von:** Prüf-Team (`.claude/agents/`) – mitglieder-waechter, seiten-pruefer, sicherheits-pruefer, barrierefreiheit-pruefer, inhalts-pruefer
**Umfang:** komplette Website inkl. Mitgliederbereich · reine Lese-Prüfung, kein Produktivcode geändert.

---

## Gesamteindruck

Das Fundament ist solide. **Keine kritischen Sicherheitslücken**, der Mitgliederbereich ist über `src/proxy.ts` zentral login-geschützt (Next.js 16.2.10, gepatcht gegen CVE-2025-29927), Row-Level-Security für `profiles/progress/notes/ebook_leads` sitzt sauber, Secrets sind korrekt getrennt, `npm run lint` läuft ohne Fehler, alle dynamischen Routen und Slugs sind konsistent.

Die wichtigsten offenen Punkte sind **rechtlicher** (Platzhalter in Impressum/Datenschutz) und **inhaltlicher** Natur (16 tote PDF-Downloads), dazu robustheits- und Barrierefreiheits-Verbesserungen.

---

## 🔴 Kritisch – vor dem Live-Gang beheben

### 1. Impressum enthält sichtbare Platzhalter (Pflichtangaben nach § 5 DDG)
**Datei:** `src/app/impressum/page.tsx`
Live sichtbar: `[Straße und Hausnummer]`, `[PLZ Ort]`, `[Land]`, `[Telefonnummer]`, `[USt-IdNr.]` sowie ein gelber Hinweis-Banner. Nur Name und E-Mail sind echt.
→ Echte Anschrift/Telefon/USt-IdNr. eintragen, Hinweis-Banner entfernen. Rechtlich zwingend.

### 2. Datenschutzerklärung enthält sichtbare Platzhalter
**Datei:** `src/app/datenschutz/page.tsx`
Live sichtbar: `[Anschrift]`, `[Hosting-Anbieter]`, `[Newsletter-Anbieter]` + „anpassbare Vorlage"-Hinweis.
→ Verantwortliche-Anschrift, echten Hoster und E-Mail-Dienstleister (Supabase/Resend) eintragen, Hinweis entfernen.

---

## 🟠 Mittel – zeitnah angehen

### 3. 16 von 29 Vertiefungs-PDFs führen ins 404 *(von zwei Prüfern bestätigt)*
**Dateien:** `src/app/mitglieder/wissen/[slug]/page.tsx:166`, `.../lektion/route.ts`
Der Button „Diese Vertiefung als PDF" erscheint bei allen 29 Vertiefungen (Bedingung `exercises.length > 0`), aber nur 13 PDFs existieren in `content/pdf/`. Betroffen sind die 16 Slugs der Kategorie „Mentale Selbstverteidigung" (propaganda, framing, algorithmen, …).
→ Entweder die 16 PDFs mit `tools/pdf/build-member.py` erzeugen **oder** den Button nur bei tatsächlich vorhandenem PDF anzeigen.

### 4. Rate-Limiter per `X-Forwarded-For`-Spoofing umgehbar
**Dateien:** `src/app/api/kontakt/route.ts:44-49`, `src/app/api/ebook/route.ts:39-44`, `deploy/nginx/werdemeisterdeinergedanken.conf`
nginx hängt die Client-IP nur an (`$proxy_add_x_forwarded_for`), der Code liest `.split(",")[0]` – also den frei wählbaren Wert. Ein Angreifer rotiert den Header und umgeht das Limit vollständig → Postfach-Flutung, Verheizen des Resend-Kontingents.
→ In nginx `proxy_set_header X-Forwarded-For $remote_addr;` (setzen statt anhängen) oder im Code den letzten XFF-Eintrag nehmen. Für verteilten Spam zusätzlich geteilter Store (Redis).

### 5. Fehlende Security-Header (CSP, X-Frame-Options, HSTS)
**Dateien:** `next.config.ts` (leer), `deploy/nginx/*.conf`
Ohne `X-Frame-Options`/`frame-ancestors` ist der Mitgliederbereich per iframe einbettbar (Clickjacking); ohne HSTS ist beim ersten HTTP-Aufruf SSL-Stripping möglich.
→ In nginx `Strict-Transport-Security`, `X-Frame-Options: SAMEORIGIN`, `X-Content-Type-Options: nosniff` + restriktive CSP setzen (oder zentral via `headers()` in `next.config.ts`).

### 6. Textkontrast unter WCAG AA (flächendeckend)
**Dateien:** durchgängig – u. a. `Hero.tsx`, `PageHero.tsx`, `Faq.tsx`, Formulare (`AuthForm`, `ContactForm`, `EbookForm`)
Die Muster `text-ink-soft/70 … /40` mischen die Textfarbe zum Hintergrund auf → geschätzt ~3,5:1 (`/70`) bis ~2,0:1 (`/40`), Fließtext braucht 4,5:1. Betrifft auch rechtlich relevante Feinabsätze (Datenschutz-Zustimmung).
→ Volldeckenden Mittelton-Token (≥ 4,5:1) einführen und Body-/Feinabsatz-Text darauf umstellen. Werte am gerenderten Zustand mit DevTools messen.

### 7. Mitgliederschutz hängt an einem einzigen Punkt (keine Defense-in-Depth)
**Dateien:** `src/app/mitglieder/**` (kein `layout.tsx`, keine seiten-/routeneigenen Auth-Checks)
Der Schutz greift real über `src/proxy.ts`, aber ausschließlich dort. Fällt der Matcher durch eine spätere Änderung aus, liegen alle Inhalte offen. Offizielle Next.js-Empfehlung: Autorisierung nicht allein der Middleware/dem Proxy überlassen.
→ `src/app/mitglieder/layout.tsx` mit `getUser()` + `redirect` als zweite Schicht; zusätzlich Auth-Check am Anfang jeder PDF-`route.ts`.

### 8. Geschützte PDFs `force-static` + `Cache-Control: public`
**Dateien:** `arbeitsheft/route.ts`, `stufe/[nr]/lektion|uebungen/route.ts`, `wissen/[slug]/lektion/route.ts`
Mitglieder-PDFs werden statisch vorgerendert und öffentlich gecached. Bei direkter Auslieferung über nginx/CDN am Node-Layer vorbei wären sie ohne Login abrufbar.
→ Für zugangsbeschränkte Inhalte `force-dynamic` + eigener Auth-Check + `Cache-Control: private, no-store`; sicherstellen, dass nginx `/mitglieder/**` nie am Node-Prozess vorbei ausliefert.

### 9. Mobiles Menü: Links im geschlossenen Zustand fokussierbar
**Datei:** `src/components/layout/Header.tsx:83-118`
Das Menü wird nur visuell (`max-h-0 opacity-0`) versteckt; Tastatur-/Screenreader-Nutzer taben ins unsichtbare Menü.
→ Im geschlossenen Zustand `inert` (oder `hidden`) setzen; optional `Escape` schließt + Fokus zurück auf den Toggle.

### 10. Formularfelder ohne sichtbaren Fokus-Ring
**Dateien:** `AuthForm.tsx:12`, `ContactForm.tsx:54`, `EbookForm.tsx:131`, `JournalReflection.tsx:109`
`focus:outline-none focus:border-accent` überschreibt den globalen Fokus-Ring; nur ein 1px-Randfarbwechsel bleibt (WCAG 2.4.7).
→ `focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent` (analog zu `Button.tsx:52`).

### 11. FAQ-Akkordeon: A11y-Verknüpfung fehlt
**Datei:** `src/components/sections/Faq.tsx:26-70`
Toggle ohne `aria-controls`; eingeklappter Text bleibt im A11y-Tree (nur `grid-rows-[0fr] opacity-0`).
→ Panel-`id` + `aria-controls`; eingeklappten Inhalt mit `hidden`/`inert` aus dem Tree nehmen.

### 12. `/bewusstseinstest` fehlt in der Sitemap
**Datei:** `src/app/sitemap.ts:8-16`
Öffentliche, indexierbare Seite, aber nicht im `routes`-Array.
→ `"/bewusstseinstest"` ergänzen.

---

## 🟡 Niedrig / Feinschliff

| # | Fund | Ort | Empfehlung |
|---|------|-----|------------|
| 13 | E-Book-Route als Mail-Bombing/Relay nutzbar (hängt an #4) | `api/ebook/route.ts:136-181` | Erneutversand pro Adresse drosseln (max. 1×/24 h) |
| 14 | `CRON_SECRET` auch als Query-Param (Log-Leak) + nicht zeitkonstanter Vergleich | `api/impulses/route.ts:35-36` | Nur `Authorization`-Header; `crypto.timingSafeEqual` |
| 15 | PDF-Routen ohne `X-Robots-Tag: noindex` | 4× `route.ts` | Header ergänzen (Tiefenschutz) |
| 16 | Footer-Kontrast grenzwertig | `Footer.tsx` (`/60`–`/70`) | Opacity reduzieren, am Rendering messen |
| 17 | Dekorative Icons nicht `aria-hidden` | `Icon.tsx` | zentral `aria-hidden`, wenn kein `title` |
| 18 | Alle Videos fehlen – „folgt in Kürze" | `deep-dives.ts`, `stage-lessons.ts`, `practices.ts` | YouTube-IDs nachtragen (Fallback ist sauber) |
| 19 | Kein OG-/Twitter-Vorschaubild | `layout.tsx:44-56` | `opengraph-image.png` ergänzen |
| 20 | `/ebook` ohne 404-Guard (500 statt 404) | `lib/pdf/ebook-file.ts` | graceful behandeln wie `getStaticPdf` |
| 21 | Verwaiste Groß-PNGs in `public/` (~28 MB) | `public/Nano Banana*.png` | entfernen (bläht Deploy auf) |
| 22 | Social-Icons 40px statt 44px Touch-Ziel | `Footer.tsx` | auf `h-11 w-11` anheben |
| 23 | TODO-Kommentare (nicht live sichtbar) | `lib/site.ts` | bei Bedarf ergänzen |

---

## Was verifiziert in Ordnung ist

- **Sicherheit:** 0 kritische Lücken · Secrets getrennt (kein `NEXT_PUBLIC_`-Leak) · Service-Role nur serverseitig · RLS zugesperrt · confirm/unsubscribe-Tokens sind UUID v4 · Ausgabe via `escapeHtml()` maskiert, kein `dangerouslySetInnerHTML`.
- **Mitgliederschutz:** greift zentral über `src/proxy.ts` für alle `/mitglieder/**` inkl. PDF-Routen · alle Mitglieder-Seiten `robots:{index:false}`.
- **Inhalte:** 7 Stufen vollständig (content + Lektion + Skript + 14 PDFs) · Praxis (13 Slugs) und Vertiefungen (29 Slugs) konsistent verlinkt · Blog (10 Beiträge, eindeutige Slugs) · Bewusstseinstest vollständig (21 Fragen, Auswertung, Startstufe-Speicherung).
- **Technik:** `npm run lint` grün · keine toten Seiten-Links · Downloads mit korrekten Headern und 404-Guard (außer `/ebook`, siehe #20) · `sitemap.ts`/`robots.ts` konsistent (außer #12).

---

## Die 3 wichtigsten nächsten Schritte

1. **Rechtstexte füllen** (#1, #2) – Impressum & Datenschutz mit echten Pflichtangaben. Zwingend vor Live-Gang.
2. **16 tote Vertiefungs-Downloads schließen** (#3) – PDFs erzeugen oder Button bedingt anzeigen.
3. **Härtung** – Rate-Limiter gegen XFF-Spoofing (#4) + Security-Header (#5), dann Textkontrast (#6) als größte Barrierefreiheits-Wirkung.
