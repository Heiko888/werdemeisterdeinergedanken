# Änderungen / Serverstand

Chronologisches Protokoll wichtiger Änderungen am Projekt, damit jederzeit der
aktuelle Stand nachvollziehbar ist. Neueste Einträge oben.

---

## 2026-09-10 – `deploy/` auf das echte Setup umgeschrieben

**Anlass:** PR #331 hat den fehlenden Volume-Mount in `deploy/docker-compose.yml`
repariert – einer Datei, die produktiv **niemand ausführt**. Live läuft die
Website als Service `website` im Stack `/opt/mattermost/docker-compose.yml`
(dort war der Mount längst vorhanden). Die Repo-Datei beschrieb dagegen ein
Setup, das es auf dem Server nie gab: eigenes Compose-Projekt, Image
`wmdg-web:latest`, Host-Port `127.0.0.1:3000`, nginx als Reverse-Proxy. Wer sie
benutzte, startete einen zweiten Container und änderte an der Live-Seite nichts.

**Geändert:**
- **`deploy/docker-compose.yml`:** Vollständig neu als **Spiegelung** des
  produktiven Service `website`. Gleiche Build-Args, Umgebungsvariablen,
  `expose: 3000` (kein Host-Port) und Volume-Mount. Entfernt: Image-Name
  `wmdg-web`, Port-Mapping, nginx-Annahmen, die nur dort gesetzten
  `CONTACT_TO`/`CONTACT_FROM`. Ergänzt: die produktiv verdrahteten
  `SUPABASE_SERVICE_ROLE_KEY`, `CRON_SECRET`, `ANTHROPIC_API_KEY`,
  `ADMIN_EMAILS`. Kopfzeile warnt jetzt in der Datei selbst, dass hier nichts
  ausgerollt wird; eigener Projektname `wmdg-website-spiegel` verhindert, dass
  ein versehentlicher Start den Stack `mattermost` anfasst.
- **`deploy/.env.example`:** Beschreibt jetzt `/opt/mattermost/.env` statt einer
  `deploy/.env`, die es nie gab. Die vier oben genannten Variablen ergänzt.
  Zusätzlich dokumentiert: 13 Variablen, die `src/` liest, die aber nirgends
  gesetzt sind (`CONTACT_*`, `*_FROM`, `BUCH_DOWNLOAD_SECRET`, `STRIPE_*`,
  `REQUIRE_ACTIVE_MEMBERSHIP`, `ALLOW_SELF_REGISTRATION`). Alle haben einen
  Fallback – nichts ist kaputt, aber es war bisher unsichtbar.
- **`deploy/README.md`:** Tabelle nicht mehr „Altbestand"; erklärt, warum
  gespiegelt wird, und enthält einen `diff`-Befehl, der beide Dateien
  vergleicht (muss leer ausgeben).
- **`docs/DOMAIN-UMZUG.md`:** Als historisch gekennzeichnet – die dort zweimal
  genannten `docker compose -f deploy/docker-compose.yml …` sind überholt.
- **`deploy/nginx/…conf`:** Als Altbestand gekennzeichnet (nginx läuft nicht,
  die App hat keinen Host-Port mehr).

**Wichtig:** Beide Compose-Dateien müssen von Hand synchron gehalten werden –
der produktive Stack kann nicht ins Repo wandern, weil dort auch Caddy,
Mattermost und Postgres liegen. Der `diff`-Befehl in `deploy/README.md` prüft
das.

Verifiziert: `docker compose -f deploy/docker-compose.yml config` gültig; der
aufgelöste Service `website` ist **zeichengleich** mit dem produktiven.
Kein Deploy nötig – an der laufenden Seite ändert sich nichts.

---

## 2026-09-10 – Vorlagen-Galerie neu erzeugt: Cover-Overlays in allen 4 Farbwelten

Die **Cover-Overlays** gab es in der Galerie bisher nur in einer Farbe. Nach dem
Farbwelt-Umbau von Reel-Covern (`199abe20`) und Carousels (`c52eb0e7`) zieht nun
auch der Overlay-Zweig nach: `npm run vorlagen:galerie` erzeugt je Cover alle
vier Welten (**Gold · Dunkel**, **Gold · Creme**, **Türkis · Navy**,
**Türkis · Creme**).

**Geändert:**
- **`src/lib/vorlagen-assets.ts`** (auto-generiert): Katalog 2079 → 2352 Einträge.
  - Cover-Overlays 59 → 236 (je Cover ×4 Welten): Mentale Selbstverteidigung
    16→64, Vertiefungen 13→52, Praxis 13→52, Wissenschaft 7→28, Die 7 Stufen
    7→28, Landing/Allgemein 3→12.
  - `carousel` 380 → 557, `social` 1423 → 1519; `reels` (236) und `workshop`
    (40) unverändert.
  - Neue Quellordner unter `social`: `personal` (64), `hintergrund` (16),
    `portrait instagram` (4), `quellen` (2); `Profil & Kanal` 16 → 26.
  - Die Chunk-Aufteilung (`vorlagenAssets0..9`) aus `ea714d7f` bleibt erhalten –
    nötig, damit der Next-Build bei >1000 Einträgen nicht bricht.
- Die Binärdaten (webp/PDF/ZIP) liegen wie gehabt **nicht** im Repo, sondern
  unter `/opt/website-vorlagen` (2,0 GB, 7540 Dateien) und werden per Volume
  nach `/app/content/vorlagen` gemountet. Alle 2135 im Katalog referenzierten
  Vorschaubilder wurden gegen das Volume geprüft – **0 fehlend**.

**Hinweis zum Deploy:** Produktiv läuft die Website als Service `website` im
Compose-Projekt `mattermost` (`/opt/mattermost/docker-compose.yml`, Caddy leitet
`www.` per `reverse_proxy website:3000` dorthin). Die Datei
`deploy/docker-compose.yml` im Repo beschreibt ein **anderes**, nicht
produktives Setup (eigenes Projekt, Image `wmdg-web:latest`, nginx-Annahme) –
ein `up -d --build` darauf startet einen zweiten Container und ändert die
Live-Seite nicht.

---

## 2026-09-10 – Vorlagen-Galerie `/admin/vorlagen`: fehlender Volume-Mount behoben

**Symptom:** Auf `/admin/vorlagen` wurden fast keine Vorlagen angezeigt – überall
gebrochene Bilder/Downloads, nur die PDF-Dokumente-Liste funktionierte.

**Ursache:** Die Vorlagen-Dateien (webp/PDF/ZIP, ~1 GB) liegen bewusst **nicht**
im Docker-Image (`content/vorlagen` steht in `.dockerignore`), sondern auf dem
Host unter `/opt/website-vorlagen` und müssen per Volume nach
`/app/content/vorlagen` in den Container gemountet werden. Genau dieser
Volume-Mount **fehlte** in `deploy/docker-compose.yml` – obwohl `.dockerignore`
und `.gitignore` ihn als vorhanden dokumentieren. Dadurch war
`/app/content/vorlagen` im Container leer und die Route
`/admin/vorlagen/datei/…` lieferte für jede Datei **404**. (Die PDF-Liste
verlinkt auf andere Routen – `/mitglieder/…` bzw. das E-Book aus `content/pdf`,
das im Image liegt – und blieb deshalb sichtbar.)

- **`deploy/docker-compose.yml`**: `volumes:`-Eintrag ergänzt –
  `${VORLAGEN_VOLUME_DIR:-/opt/website-vorlagen}:/app/content/vorlagen:ro`
  (read-only, da die Route nur liest). Kopf- und Inline-Kommentar erklären den
  Zusammenhang.
- **`deploy/.env.example`**: `VORLAGEN_VOLUME_DIR` als optional überschreibbaren
  Host-Pfad dokumentiert.

**Zum Live-Setzen nötig:** Auf dem Server neu ausrollen, damit der Mount greift:
`git pull && docker compose -f deploy/docker-compose.yml up -d --build`.
Voraussetzung ist, dass der Host-Ordner `/opt/website-vorlagen` mit den
Vorlagen-Dateien befüllt ist (falls nicht/veraltet:
`tools/deploy/update-vorlagen-galerie.sh`, ggf. `FULL_REBUILD=1`) und für den
Container-Nutzer lesbar ist.

Verifiziert: `docker compose -f deploy/docker-compose.yml config` (gültig).

---

## 2026-09-10 – Buch-PDF: signierter Download-Link in der Liefermail

Die PDF-Liefermail enthält jetzt zusätzlich zum Anhang einen **signierten,
zeitlich begrenzten Download-Link** (30 Tage) – so kommt das Buch auch dann an,
wenn der 7,5-MB-Anhang an Größengrenzen eines Mailanbieters scheitert.

- **`src/lib/buch-download.ts`** (neu): stateless **HMAC-SHA256**-Token
  (`<payload>.<signatur>`, payload = base64url `{ exp }`), Prüfung timing-safe.
  Geheimnis `BUCH_DOWNLOAD_SECRET`, ersatzweise `STRIPE_WEBHOOK_SECRET`; ohne
  Geheimnis wird kein Link erzeugt (Mail fällt auf den Anhang zurück). Keine
  Datenbank nötig.
- **`src/app/api/buch-download/route.ts`** (neu): liefert die Buch-PDF nur mit
  gültigem, nicht abgelaufenem Token aus – sonst 404 (kein Hinweis für Unbefugte).
- **`src/lib/buch-mail.ts`**: `sendBuchPdfMail` nimmt optional die Download-URL
  und rendert einen „Buch als PDF herunterladen"-Button (Anhang bleibt erhalten).
- **`src/app/api/stripe/webhook/route.ts`**: erzeugt beim PDF-Kauf den Token und
  übergibt die URL an die Liefermail.
- **`.env.local.example`** + **`docs/STRIPE-MITGLIEDSCHAFT.md`**: `BUCH_DOWNLOAD_SECRET`
  und der Download-Link dokumentiert.

Verifiziert: `npm run lint` (0 Fehler), `npm run build` (grün), `/api/buch-download`
als Route erzeugt; ohne/ungültiger Token → 404.

---

## 2026-09-10 – Buch: automatische PDF-Zustellung nach Zahlung

Der Kauf der **PDF-Edition** liefert das Buch jetzt **automatisch** aus: Nach
erfolgreicher Zahlung schickt der Stripe-Webhook das Buch-PDF per E-Mail
(Anhang). Die **gedruckte** Edition löst automatisch eine **Bestellbestätigung**
aus; der Versand bleibt manuell.

- **`src/app/api/stripe/webhook/route.ts`**: In `checkout.session.completed`
  werden Buch-Käufe (`metadata.produkt=buch-werde-meister-deiner-gedanken`) jetzt
  **abgezweigt** – sie legen **keine Mitgliedschaft und kein Konto** mehr an
  (behebt einen latenten Fehler: der Einmalkauf wäre sonst als „aktive
  Mitgliedschaft“ verbucht worden). Neuer Handler `onBookPurchase`: prüft
  `payment_status`, wählt anhand `metadata.edition` die PDF-Lieferung bzw. die
  Print-Bestätigung. Fehler beim Versand werden **nicht** verschluckt → 500 →
  Stripe stellt erneut zu (keine verlorene Lieferung).
- **`src/lib/buch-mail.ts`** (neu): `sendBuchPdfMail` (PDF als Anhang) und
  `sendBuchPrintOrderMail` (Bestellbestätigung); Absender `BUCH_FROM`.
- **`src/lib/pdf/buch-file.ts`** (neu): lädt `content/pdf/Werde-Meister-deiner-
  Gedanken.pdf` (liegt bewusst nicht unter `public/`).
- **`.env.local.example`** + **`docs/STRIPE-MITGLIEDSCHAFT.md`**: PDF-Zustellung
  dokumentiert, `BUCH_FROM` ergänzt, Fulfillment-Hinweis aktualisiert
  (PDF automatisch, gedruckt manuell).

Voraussetzung für die Auslieferung: `RESEND_API_KEY` gesetzt und der
Stripe-Webhook-Endpoint (`…/api/stripe/webhook`) mit Event
`checkout.session.completed` eingerichtet.

Verifiziert: `npm run lint` (0 Fehler), `npm run build` (grün).

---

## 2026-09-10 – Verkaufsseite `/buch`: zwei Editionen (PDF 29,90 € / gedruckt 39,90 €)

Das Buch ist jetzt in **zwei Editionen** kaufbar: **als PDF für 29,90 €**
(Download) und **gedruckt für 39,90 €** (Versand DE/AT/CH).

- **`src/lib/stripe.ts`**: neue Variable `STRIPE_BOOK_PRICE_ID_PRINT` (gedruckt);
  `STRIPE_BOOK_PRICE_ID` ist jetzt die PDF-Edition. Helfer
  `bookPriceIdForEdition(edition)` + Typ `BookEdition`; `isBookCheckoutConfigured`
  ist wahr, sobald **eine** der beiden Editionen angelegt ist.
- **`src/app/api/buch-checkout/route.ts`**: liest `edition=pdf|print` aus dem
  Formular, wählt den passenden Preis. Nur die gedruckte Edition erfasst eine
  Lieferadresse; PDF ist reiner Download. Fehlt der Preis einer Edition, greift
  weiterhin der sanfte Kontakt-Fallback. `success_url` trägt `edition` mit.
- **`src/components/sections/BuchKaufenButton.tsx`**: neues Prop `edition`
  (verstecktes Formularfeld).
- **`src/app/buch/page.tsx`**: Preis-Konstanten `PRICE_PDF` / `PRICE_PRINT`;
  Angebotsbox mit **zwei Optionen** (PDF + gedruckt, gedruckt hervorgehoben);
  Hero- und Final-CTA verweisen auf die Auswahl (`#bestellen`) und nennen beide
  Preise; Erfolgs-Hinweis editionsabhängig (Download vs. Versand); neue FAQ
  „Als PDF oder gedruckt – was ist der Unterschied?".
- **`.env.local.example`** und **`docs/STRIPE-MITGLIEDSCHAFT.md`**: um die zweite
  Preis-Variable und den Zwei-Editionen-Ablauf ergänzt (inkl. Fulfillment-Hinweis:
  PDF-Versand und Buchversand aktuell manuell über das Stripe-Dashboard).

Verifiziert: `npm run lint` (0 Fehler), `npm run build` (grün), Smoke `/buch` →
HTTP 200 mit beiden Preisen, beiden Optionen und den versteckten `edition`-Feldern
(`pdf`/`print`).

---

## 2026-09-09 – Kontaktformular: Thema-Kontext (`/kontakt?thema=…`)

Mehrere Wege enden bewusst auf dem Kontaktformular statt im Bezahlvorgang –
der sanfte Fallback aus `/api/checkout` leitet auf `/kontakt?thema=mitgliedschaft`,
`/api/buch-checkout` auf `/kontakt?thema=buch` (wenn Stripe noch nicht
eingerichtet ist). Bisher wurde der `thema`-Parameter **ignoriert**: Wer über
den Mitgliedschafts-Button kam, stand vor einem leeren, neutralen Formular.

Neu: Das Formular richtet sich nach `thema`.

- **Neue Quelle der Wahrheit** `src/lib/kontakt-themen.ts` (`KONTAKT_THEMEN` +
  `resolveThema`) – für Client (Formular) und Server (E-Mail) gemeinsam, ohne
  server-only-Importe. Bekannte Themen: `mitgliedschaft`, `buch`.
- **`src/app/kontakt/page.tsx`** liest jetzt `searchParams` (async Page,
  gleiche Konvention wie `/mitgliedschaft`) und reicht Label, Hinweis und
  vorausgefüllte Nachricht an das Formular.
- **`src/components/sections/ContactForm.tsx`** zeigt einen einordnenden
  Hinweis (Gold-Akzent) über dem Formular, füllt die Nachricht passend vor und
  schickt das `thema` im Request mit. Ohne `thema` verhält sich alles wie zuvor.
- **`src/app/api/kontakt/route.ts`** übernimmt das `thema` (auf 60 Zeichen
  begrenzt, HTML-escaped) in **Betreff** („Neue Kontaktanfrage (Mitgliedschaft)
  von …“) und Text/HTML der Benachrichtigung, damit sofort erkennbar ist,
  worum es geht.

Verifiziert: `npx tsc --noEmit` (keine neuen Fehler in den geänderten Dateien),
`npm run lint` (0 Fehler), `npm run build` (grün).

**Serverstand:** In `main` gemergt via PR #323 (Squash-Commit `4ebbf33`),
CI grün (Vercel-Deployment erfolgreich) → live in Produktion.

---

## 2026-09-09 – Verkaufsseite `/buch`: vollständiges Inhaltsverzeichnis

Die Inhalt-Sektion zeigt jetzt das **komplette Inhaltsverzeichnis** des Buchs –
**fünf Teile mit allen 24 Kapiteln** – statt nur einer Leseprobe. Datenquelle
sind die echten Überschriften aus `docs/ebook/werde-meister-deiner-gedanken.md`
(dieselbe Leserfassung, aus der auch das Buch-PDF gebaut wird), fest im
`bookParts`-Array in `src/app/buch/page.tsx` hinterlegt. **Teil V – „Die
Gedanken, die nicht deine sind“** bleibt als Schwerpunkt hervorgehoben (Gold-
Rahmen + „Schwerpunkt“-Badge, über beide Spalten).

Verifiziert: `npm run lint` (0 Fehler), `npm run build` (grün), Smoke `/buch` →
HTTP 200 mit allen fünf Teilen und Kapiteln.

---

## 2026-09-09 – Verkaufsseite `/buch`: Schwerpunkt & Struktur korrigiert

Die Buch-Verkaufsseite lehnte sich inhaltlich zu stark an das **kostenlose
E-Book** an (7 Stufen / „raus aus dem Autopilot“). Das Buch **„Werde Meister
deiner Gedanken“** hat aber einen anderen Schwerpunkt: **die Gedanken, die
nicht deine sind** – Reizüberflutung, Framing, hypnotische/suggestive
Sprachmuster, Propaganda, Algorithmen & Gruppendruck – und ist in **fünf Teilen
/ 24 Kapiteln** aufgebaut. `src/app/buch/page.tsx` entsprechend neu getextet:

- **Hero-Unterzeile**: „… in fünf Teilen und 24 Kapiteln“ statt „in 7 Stufen“.
- **Metadaten/OG-Description**: auf den Beeinflussungs-Schwerpunkt umgestellt.
- **Problem-Sektion**: „Wer denkt hier eigentlich?“ – Gedanken von außen,
  Reizüberflutung, unsichtbare Steuerung (statt Autopilot/„du wirst gelebt“).
- **Inhalt-Sektion**: die „7 Stufen“-Liste (aus `lib/content`) ersetzt durch die
  echte Buchstruktur mit dem hervorgehobenen Schwerpunkt-Teil **„Die Gedanken,
  die nicht deine sind“** und dessen Kapiteln 19–24 als Leseprobe.
- **„Was dich erwartet“, „Für wen“, Angebotsbox-Punkte**: auf Beeinflussung
  erkennen / selbst denken / 5 Teile, 24 Kapitel umgeschrieben.
- **FAQ**: neue Fragen „Worum geht es in dem Buch?“ und – zur klaren Abgrenzung –
  **„Ist das dasselbe wie das kostenlose E-Book?“** (Nein: E-Book = Einstieg
  in die 7 Stufen; Buch = tiefer, Fokus Beeinflussung von außen).

Kein Import von `stages` mehr auf der Seite. Verifiziert: `npm run lint`
(0 Fehler), `npm run build` (grün), Smoke `/buch` → HTTP 200 mit sichtbaren
Schwerpunkt-Kapiteln.

Hinweis: Die vollständige Gliederung (Titel aller fünf Teile + 24 Kapitel) liegt
noch nicht vollständig vor – aktuell ist der letzte Teil (Kap. 19–24) als
Schwerpunkt/Leseprobe abgebildet; die restlichen Teile können ergänzt werden,
sobald die Titel vorliegen.

---

## 2026-09-09 – Neue Verkaufsseite für das Buch (`/buch`, 29,90 €)

Eigenständige Verkaufsseite (Landingpage) für das gedruckte Buch **„Werde
Meister deiner Gedanken“** zum Preis **29,90 €** ergänzt.

**Neu:**

- **`src/app/buch/page.tsx`** – die Verkaufsseite im bestehenden Markendesign
  (Navy/Gold, gleiche Bausteine wie `/mitgliedschaft`): Hero mit echtem
  Buchcover + Preis, Problem-Sektion, „Was dich erwartet“, die 7 Stufen als
  Inhaltsübersicht (aus `src/lib/content.ts`), „Für wen“, Autoren-Sektion,
  Stimmen, Angebots-/Preisbox, buchspezifisches FAQ und Abschluss-CTA. Zeigt
  Hinweisbanner bei `?checkout=erfolg|abgebrochen|fehler`.
- **`src/app/api/buch-checkout/route.ts`** – Stripe-Checkout als **Einmalkauf**
  (`mode: "payment"`, Lieferadresse DE/AT/CH). Wie beim Abo-Checkout: ist Stripe
  nicht eingerichtet, fällt der Button **sanft aufs Kontaktformular**
  (`/kontakt?thema=buch`) zurück, läuft also nie ins Leere.
- **`src/components/sections/BuchKaufenButton.tsx`** – „Bestellen“-Button als
  echtes Formular (POST → `/api/buch-checkout`), funktioniert ohne Client-JS.
- **`public/buch-cover.webp`** – web-optimiertes Cover (1000 px, ~131 KB),
  erzeugt aus `content/pdf/Werde-Meister-deiner-Gedanken-Cover.png`.

**Angepasst:**

- `src/lib/stripe.ts`: neue Konstante `STRIPE_BOOK_PRICE_ID` + Flag
  `isBookCheckoutConfigured`.
- `.env.local.example`: neue Variable **`STRIPE_BOOK_PRICE_ID`** dokumentiert
  (eigener Preis eines Nicht-Abo-Produkts; ohne sie greift der Kontakt-Fallback).
- `src/lib/site.ts`: Navigationspunkt **„Das Buch“** → `/buch`.
- `src/app/sitemap.ts`: `/buch` in die Sitemap aufgenommen.

**Preis zentral** in `page.tsx` (`const PRICE = "29,90 €"`) gepflegt – Hero,
Angebotsbox und CTA zeigen garantiert denselben Betrag.

Verifiziert: `npm run lint` (0 Fehler; 6 unverändert bestehende Warnungen in
`tools/print`), `npm run build` (grün, Routen `/buch` und `/api/buch-checkout`
erzeugt), Runtime-Smoke `/buch` → HTTP 200, `/api/buch-checkout` (GET) → 303
zurück auf `/buch`.

**Vor Livegang noch nötig:** in Stripe ein Buch-Produkt mit Einmalpreis 29,90 €
anlegen und dessen `price_…`-ID als `STRIPE_BOOK_PRICE_ID` hinterlegen. Bis
dahin führt der Bestellbutton bewusst zum Kontaktformular. Schritt-für-Schritt-
Anleitung dazu in `docs/STRIPE-MITGLIEDSCHAFT.md`, Abschnitt „Buch-Einmalkauf
(`/buch`, 29,90 €)".

---

## 2026-09-09 – Sicherheitsupdate: Next.js 16.2.10 → 16.3.4

Next.js von **16.2.10 auf 16.3.4** angehoben (dazu `eslint-config-next` in
gleicher Version). 16.2.10 war laut `npm audit` als **critical** eingestuft
(u. a. SSRF in Server Actions/Rewrites, DoS in der Image-Optimization,
Cache-Konfusion, Offenlegung interner Server-Function-Endpunkte). Nach dem
Update meldet `npm audit` **keine Next.js-Schwachstelle** mehr (verbleibende
6 Findings sind transitive Dev-/Build-Abhängigkeiten, nicht laufzeitrelevant).

Verifiziert: `npm run lint` (0 Fehler), `npm run build` (grün), `npm test`
(8/8), Runtime-Smoke-Test `/`, `/die-7-stufen`, `/blog`, `/mitgliedschaft`,
`/bewusstseinstest` → alle HTTP 200. Keine Code-Anpassungen nötig (kein
Breaking Change für dieses Projekt).

---

## 2026-09-09 – Vor-Launch-Feinschliff: Überschriften, Hero-Badge, Lint

Aus der gebündelten Vor-Launch-Prüfung (`docs/audit/launch-check-2026-09-09.md`)
umgesetzt:

- **Einheitliche Section-Überschriften auf der Startseite**: Alle H2 der
  eigenständigen Sections springen auf Desktop nicht mehr zwischen 36 px und
  48 px, sondern folgen jetzt derselben Skala wie die geteilte `SectionHeading`
  (`sm:text-4xl md:text-[2.9rem]`). Betroffen: `Compass.tsx`, `WhyMe.tsx`,
  `LeadMagnet.tsx`, `MaybeNotYou.tsx`, `FinalCta.tsx`.
- **Hero-Badge-Schatten von Teal auf Gold** (`Hero.tsx`): Der „7 Stufen"-Kachel
  fehlte die Markendisziplin – der türkise Schein (`rgba(52,196,196,…)`) ist
  jetzt Gold (`rgba(217,169,58,…)`), passend zur dokumentierten „nur Gold"-Linie.
- **3 Lint-Fehler behoben** (`npm run lint` jetzt fehlerfrei):
  `VideoMessage.tsx` setzt den Poster-Zustand nicht mehr im Effekt, sondern per
  React-empfohlenem Render-Abgleich; zwei nicht-escapte Anführungszeichen in
  `admin/marken-uebersicht/page.tsx` auf typografische „…" umgestellt.

Verifiziert: `npm run lint` (0 Fehler), `npm run build` (129 Seiten, grün).

**Hero-Entscheidung:** Der dunkle Hero bleibt bewusst so (Betreiber-Freigabe
nach Screenshot-Prüfung mobil + Desktop, 2026-09-09). Keine Aufhellung.

**Noch offen / bewusst NICHT angefasst** (Entscheidung ausstehend):
- Platzhalter-Videos (Startseite „demnächst", Mitgliederbereich) – erst prüfen.
- Blog-Kategorie „Mentale Selbstverteidigung" bleibt deaktiviert (16 Artikel).
  Hinweis: Der Redaktionsplan (`src/lib/redaktionsplan.ts` + `docs/marketing/`)
  plant weiterhin Social-Posts mit `/blog/<slug>`-Links auf genau diese 16
  Artikel – diese URLs liefern öffentlich 404. Beim Ausspielen der Social-Posts
  beachten (kein Website-Bug, aber Planungskonflikt).

---

## 2026-09-09 – Social Media: Gold-Grafiken-Übersicht (Bestandsaufnahme)

Dokumentierter Serverstand aller **Gold**-Social-Media-Grafiken erstellt – ohne
Löschen oder Neu-Erzeugen. Zwei neue Dateien:
`docs/marketing/GOLD-GRAFIKEN-UEBERSICHT.md` (lesbare Übersicht pro Kanal mit
Zweck, Namenskonvention und Gold-only-Render-Befehlen) und
`docs/marketing/gold-grafiken-manifest.txt` (vollständige Datei-Liste mit
Datum + Commit im Kopf). Kernaussage: „Gold" = alle Assets **ohne** `-tuerkis`
(kein Suffix = `dunkel` Gold+Navy, `-hell` = Creme+Gold). Bestand: **828 Gold-PNG
(≈ 553 MB)** über Instagram, Facebook, LinkedIn, YouTube, WhatsApp, Profil,
Messenger, E-Book, Zitate, Studien, Story-Overlays/-Carousels und Thumbnails.

---

## 2026-09-09 – Buch: Impressum-Anschrift eingetragen

Ladungsfähige Anschrift ins Impressum aufgenommen (Hinweis-Seite):
„Impressum: Heiko Schwaninger · Dompfaffenweg 30 · 63920 Großheubach". Fest im
Generator hinterlegt (per Env `BUCH_IMPRESSUM` überschreibbar). Offiziell
korrigierte Schreibweise „Großheubach" (ß). Kontakt-E-Mail (info@werdemeisterdeinergedanken.de) ergänzt. Vertriebsform-
spezifische Pflichtangaben ggf. später prüfen (siehe Vorprüfung).

---

## 2026-09-08 – Buch: „Lena" im Buchtext anonymisiert

Auf Wunsch: der Vorname der verstorbenen Lebensgefährtin ist im **Buchtext**
komplett entfernt. Alle 7 Stellen lauten jetzt „meine Lebensgefährtin" bzw.
grammatisch angepasst „ihr/ihrer" – Wortlaut sonst unverändert. Das interne
(nicht veröffentlichte) Story-Material behält den Namen als Arbeitsstand.

---

## 2026-09-08 – Buch: juristische Vorprüfung + verstärkter Haftungshinweis

Auf Basis einer juristischen **Risiko-Vorprüfung** (kein Rechtsrat; Dokument:
`docs/ebook/intern/juristische-risiko-vorpruefung.md`) zwei konkrete Punkte
umgesetzt:

- **Haftungshinweis verstärkt** (`docs/ebook/…werde-meister….md`, „Hinweis des
  Autors"): jetzt auch keine rechtliche/finanzielle Beratung, Übungen in
  Eigenverantwortung, energetische Methoden ausdrücklich „keine wissenschaftlich
  anerkannten Heilverfahren, kein Versprechen", Hinweis zu realen Personen.
- **Copyright-/Impressum-Zeile** auf der Hinweis-Seite: „© 2026 Heiko
  Schwaninger. Alle Rechte vorbehalten." Die **ladungsfähige Anschrift** (Pflicht
  beim Verkauf) ist per Env `BUCH_IMPRESSUM` befüllbar – **noch nachzutragen**.
- Generator (`build-buch.py`) rendert den Hinweis jetzt mehrabsätzig und die
  Copyright-/Impressum-Zeile.

Offen laut Vorprüfung (anwaltlich abzunehmen): vollständiges Impressum/Anschrift,
Einordnung „Lena" (Angehörigen-Einverständnis?), finale Freigabe des Disclaimers,
Marketing-Claims. Internes Story-Material bleibt vom Build ausgeschlossen.

---

## 2026-09-08 – Buch: Formatierungs-Feinschliff (Lektorat, ohne Wortänderung)

Rein typografischer Reflow der Leserfassung – **kein Wort und kein Satzzeichen
geändert** (automatisch verifiziert: identische Wort-Reihenfolge, 20.440 Tokens
vorher = nachher).

- **Zusammengelaufene Zitat-Aufzählungen** aufgelöst: `>`-Zeilen mit mehreren
  Stichpunkten in einer Zeile (z. B. „schnellerer Herzschlag beschleunigte Atmung
  …", „Gut gegen Böse / Opfer gegen Täter …", „Reform statt Kürzung …") stehen
  jetzt je Punkt auf eigener Zeile → saubere mehrzeilige Zitatboxen (~45 Stellen).
- **Fill-in-Prompts mit „…"** (Übungen) je Fragment auf eigene Zeile.
- **Einzeiler-Bullets in Teil V** (Kap. 19–24), die hervorgehobene Merksätze/
  Beispielzitate sind, zu `>`-Zitaten vereinheitlicht (~25 Stellen).
- Fehlende **Leerzeilen** vor Überschriften und nach Listen ergänzt (~30 Stellen).

Absicherung: Vor/nach dem Reflow wurde die komplette Wort-Reihenfolge des Buches
(Marker/Whitespace herausgerechnet) verglichen und als identisch bestätigt.
Umfang jetzt 158 Seiten. Neu bauen mit `npm run pdf:buch`.

---

## 2026-09-08 – Buch: Doppelungen Kapitel 2 ↔ Kapitel 19 entschärft

Redaktionelle Überarbeitung der Leserfassung (`docs/ebook/werde-meister-deiner-gedanken.md`):
Kapitel 2 („Die Programme hinter deinem Leben") und Kapitel 19 („Wer denkt hier
eigentlich?") erzählten dieselben Inhalte doppelt. Kapitel 2 behält die
**familiäre/kindliche Prägung**; Kapitel 19 wurde auf die **äußere** Herkunft der
Gedanken (Schule, Autorität, Medien, Gruppen) zugespitzt.

- „Dein Kopf beginnt nicht bei null" gestrafft; der doppelte Kindheits-/
  Perfektionismus-Teil weicht einem kurzen Rückverweis auf Kapitel 2 und dem
  Übergang zum „Netz aus Schule, Autoritäten, Medien und Gruppen".
- Unterabschnitt „Die Familie – deine erste Realität" (Wiederholung inkl.
  „Geld wächst nicht auf Bäumen") aufgelöst; die eine eigenständige Aussage
  (Erfolgswunsch vs. dazugehören → Selbstsabotage) in den Vorabschnitt integriert.
- „Träume, die gar nicht deine sind": Statt der Wiederholung von „Träume sind
  Schäume" + Ziele-Liste jetzt ein expliziter Rückverweis auf Kapitel 2 mit neuer
  Zuspitzung (Werbung/Vergleich/soziale Netzwerke); die einzigartige radikale Frage
  bleibt.
- „Träume sind Schäume" steht jetzt nur noch einmal als Kernsatz (Kapitel 2),
  „Geld wächst nicht auf Bäumen" ebenfalls nur noch in Kapitel 2.
- Nebenbei ein Formatierungs-Artefakt in Kapitel 19 behoben (erste Listenzeile war
  ein Zitat statt Aufzählungspunkt).

Buchtext-Umfang jetzt 152 Seiten. Neu bauen mit `npm run pdf:buch`.

---

## 2026-09-08 – Buch: eigene Kapitel-Auftaktseiten (mutigeres Design)

Auf Wunsch „mutiger, mit eigenen Kapitel-Auftaktseiten" bekommt jedes Kapitel jetzt
eine **eigene, ganzseitige Auftaktseite**; der Fließtext beginnt erst auf der
Folgeseite (Initial/Drop-Cap auf dem ersten Absatz).

- **Kapitel-Auftaktseite:** feiner Gold-Rahmen als „Plate", riesige konturierte
  Ziffer (01–24) oben, Kicker + großer Serif-Titel + Gold-Verlauf-Linie unten links.
- **Einleitung / Schlusswort / Anhang:** analoge Auftaktseite, zentriert, mit
  Marken-Gehirn statt Ziffer.
- Umsetzung: eigener `@page chapopen { margin:0 }`, Auftaktseiten via `break-after:page`.
- Umfang jetzt **153 Seiten**.

Neu bauen mit: `npm run pdf:buch`

---

## 2026-09-08 – Buch-Design überarbeitet (durchgehend cremefarben + coolere Auftakte)

Nach erstem Feedback („Design nicht cool, Inhalt nicht komplett cremefarben") am
Buch-Generator `tools/pdf/build-buch.py` überarbeitet:

- **Durchgehend cremefarben:** Beim PDF-Druck füllte der Hintergrund vorher nur den
  Textbereich – die Seitenränder blieben weiß. Jetzt `@page { margin: 0 }` (Blatt =
  volle Seite, Creme randlos) und der Textabstand kommt über Section-Padding mit
  `box-decoration-break: clone`, sodass jede Folgeseite denselben Rand behält.
  Verifiziert: alle Seitenecken sind cremefarben (245,244,237), Textabstand ~20 mm.
- **Coolere Kapitel-Auftakte:** große konturierte Ziffer (z. B. „02"), Kicker,
  Serif-Titel, Gold-Verlauf-Linie – statt schlichter Kicker-Zeile.
- **Teil-Trennseiten:** große konturierte römische Ziffer (I–V) oben rechts.
- **Cover:** Gehirn-Motiv leicht nach unten gerückt, damit es den Untertitel nicht
  mehr überlagert.

Neu bauen mit: `npm run pdf:buch`

---

## 2026-09-08 – Buch „Werde Meister deiner Gedanken" ins Repo + PDF-Generator

Das vollständige Buch (bisher nur als hochgeladene Markdown-Arbeitsfassung) wurde
ins Projekt aufgenommen, für die Vermarktung aufbereitet und bekommt einen eigenen
PDF-Generator im Markendesign. Ergebnis: **129-seitiges PDF**, 5 Teile, 24 Kapitel.

**Neu:**
- **`docs/ebook/werde-meister-deiner-gedanken.md`**: die reine **Leserfassung**
  (Einleitung, Teil I–V mit Kapitel 1–24, Schlusswort, Anhang). Einzige Quelle des
  Generators.
- **`docs/ebook/intern/werde-meister-story-rohmaterial.md`**: das interne
  Arbeitsmaterial (persönliche Story-Rohmaterialien, Story-Zuordnung, redaktionelle
  Notizen). Enthält **sensible/rechtliche Rohdaten** (Ermittlungen, Verurteilung,
  Bewährung, Insolvenz) und ist **bewusst vom Build ausgeschlossen** – nicht
  veröffentlichen ohne juristische Prüfung.
- **`tools/pdf/build-buch.py`**: Markdown→HTML-Renderer für das Buch (Titelseite,
  generiertes Inhaltsverzeichnis, Teil-Trennseiten, Kapitel mit Initial/Zitat-/
  Übungsboxen, Anhang). Versteht `#`–`#####`, Zitate, Listen, fett/kursiv.
- **`tools/pdf/build-buch.mjs`** + npm-Skript **`pdf:buch`**: rendert das HTML mit
  Chromium zu `content/pdf/Werde-Meister-deiner-Gedanken.pdf`.
- **`content/pdf/Werde-Meister-deiner-Gedanken.pdf`**: das erzeugte Buch-PDF.

**Lektorat / inhaltliche Bereinigung (Leserfassung):**
- Frontmatter bereinigt: Arbeitsfassungs-Stand, internes Meta zum Manuskript,
  „Human Design"-Notiz und das manuelle Inhaltsverzeichnis entfernt (das TOC wird
  jetzt gestaltet generiert). „Hinweis des Autors" bleibt.
- **Kapitel 22**: fehlende `###`-Überschrift wiederhergestellt (Titel war in den
  ersten Absatz verschmolzen).
- Verirrte Überschrift `##### Vergangenheit` (Konvertierungsartefakt) entfernt,
  umliegende Punkte zu einer Liste zusammengeführt.
- Drei über zwei Aufzählungspunkte zerrissene Schlüssel-/Schlusssätze
  (Kap. 19, 20, 22) zu je einem Zitat zusammengeführt.
- Tippfehler behoben: fehlender Satzpunkt (Kap. 24), „keine vielen Reize" →
  „nicht viele Reize" (Kap. 20), zwei in einer Zeile verklebte Zitate getrennt
  (Kap. 9).

**Ablage-Entscheidung:** Das PDF liegt unter `content/pdf/` (login-/nicht-öffentlich),
**nicht** unter `public/`. Die Auslieferung über eine Verkaufs-/Schutzroute ist
noch offen und separat zu entscheiden.

**Noch offen (Empfehlung, nicht automatisch geändert):** redaktionelles Zusammen-
führen der Doppelungen zwischen Kapitel 2 und Kapitel 19, sowie ggf. juristische
Prüfung, falls konkrete Rechtsdetails aus dem internen Anhang in den Buchtext
übernommen werden sollen (der Buchtext selbst ist derzeit bewusst vage gehalten).

Neu bauen mit: `npm run pdf:buch`

---

## 2026-09-08 – Hero-Bilder Journal & Praxis von PNG auf WebP

Die beiden neu hinzugefügten Titelbilder lagen als verlustfreies PNG im Repo
und waren dadurch 15–20× so groß wie alle übrigen Hero-Bilder der Seite, die
seit jeher verlustbehaftetes WebP sind – bei identischen Abmessungen
(1672×941).

**Geändert:**
- **`public/hero-journal.webp`** (108 KB) ersetzt `hero-journal.png` (1,64 MB).
- **`public/hero-praxis.webp`** (257 KB) ersetzt `hero-praxis.png` (2,28 MB).
  Konvertiert mit `sharp` bei `quality: 85` – das trifft die Größenordnung der
  bestehenden Heros (`hero-blog-gipfel.webp` 118 KB,
  `hero-bewusstseinstest.webp` 127 KB, `hero-programm.webp` 183 KB).
- **`src/app/mitglieder/journal/page.tsx`** und
  **`src/app/mitglieder/praxis/page.tsx`**: die `src`- bzw. `image`-Angabe auf
  `.webp` umgestellt. Sonst keine Änderung – Zuschnitt, Verlauf und Layout
  bleiben identisch.

**Warum:** Die PNGs lagen mit zusammen ~4 MB in Git und im Docker-Image, und
der Next-Optimizer musste bei jeder noch nicht gecachten Breite ein 2,3-MB-PNG
neu durchrechnen. Sichtbar ändert sich nichts: Der Optimizer liefert Browsern
ohnehin WebP, die ausgelieferten Bytes bleiben praktisch gleich.

---

## 2026-09-08 – Neues Titelbild für „Praxis" (/mitglieder/praxis)

Das alte Praxis-Herobild (`hero-praxis.webp`) trug ein zentrales Praxis-Symbol
und musste deshalb per `object-contain` mit schmalen Navy-Rändern gezeigt
werden. Es wurde durch ein vollflächiges Naturmotiv ersetzt (Yogamatte mit
Gehirn-Logo, Trinkflasche, Steinturm & Wasserfall vor Bergpanorama im
Sonnenaufgang).

**Geändert:**
- **`public/hero-praxis.png`**: Das per Upload (Commit `b700cf0`) hinzugefügte
  Bild (`ChatGPT Image Sep 8, 2026, 08_38_39 PM.png`, 1672×941) auf den Slug
  `hero-praxis.png` umbenannt (`git mv`).
- **`public/hero-praxis.webp`**: das alte, nur hier verwendete Motiv entfernt
  (`git rm`).
- **`src/app/mitglieder/praxis/page.tsx`**: `PageHero image` auf
  `/hero-praxis.png` umgestellt und den `imageClassName="lg:object-contain"`
  entfernt – das neue Motiv hat kein zentrales Symbol, der formatfüllende
  `object-cover`-Zuschnitt (Standard) ist hier gewollt.

**Ergebnis:** Das Bild erscheint auf
`https://www.werdemeisterdeinergedanken.de/mitglieder/praxis`.

---

## 2026-09-08 – Titelbild für „Mein Journal" (/mitglieder/journal)

Der Journal-Kopf war eine einfarbige Navy-Fläche. Das hochgeladene Motiv
(Kompass, aufgeschlagenes Journal mit Füller & Gehirn-Tasse vor Bergpanorama)
sitzt jetzt als vollflächiges Titelbild dahinter – analog zum Kopf von
„Mein Bereich" (/mitglieder).

**Geändert:**
- **`public/hero-journal.png`**: Das per Upload (Commit `e515db3`) hinzugefügte
  Bild (`fef1d1cb-…​.png`, 1672×941) auf einen sauberen Slug umbenannt
  (`git mv`), passend zur `hero-*`-Namenskonvention.
- **`src/app/mitglieder/journal/page.tsx`**: `next/image` importiert und im
  `member-hero`-Kopf ein `<Image fill priority object-right>` plus Navy-Verlauf
  (`from-navy-950/92 … to-navy-950/55`) ergänzt. Das Motiv (rechts) bleibt
  sichtbar, die linke Textspalte liegt lesbar über dem Verlauf. Reine
  Dekoration (`alt=""`, `aria-hidden`) und per `print:hidden` beim Drucken
  ausgeblendet, damit der Journal-Ausdruck sauber bleibt. Muster wie bei
  `/mitglieder` bzw. `src/components/members/LessonHero.tsx`.

**Ergebnis:** Das Bild erscheint auf
`https://www.werdemeisterdeinergedanken.de/mitglieder/journal`.

---

## 2026-09-06 – Titelbild für „Mein Bereich" (/mitglieder)

Der Kopf des Mitgliederbereichs war eine einfarbige Navy-Fläche. Das neu
hochgeladene Motiv (goldene Kompass-Reise) sitzt jetzt als vollflächiges
Titelbild dahinter – analog zu den Lektions- und Bibliotheks-Köpfen.

**Geändert:**
- **`public/hero-mitglieder.png`**: Das mit Commit `5b86500` hochgeladene Bild
  (`ChatGPT Image Sep 6, 2026, 06_19_19 PM.png`, 1916×821) auf einen sauberen
  Slug umbenannt (`git mv`), damit der öffentliche Pfad ohne Leerzeichen/Kommas
  auskommt.
- **`src/app/mitglieder/page.tsx`**: `next/image` importiert und im
  `member-hero`-Kopf ein `<Image fill priority object-right>` plus Navy-Verlauf
  (`from-navy-950/92 … to-navy-950/55`) ergänzt. Das Motiv (Kompass rechts)
  bleibt sichtbar, die linke Textspalte liegt lesbar über dem Verlauf. Reine
  Dekoration: `alt=""`, `aria-hidden`. Muster übernommen aus
  `src/components/members/LessonHero.tsx`.

**Ergebnis:** Das Bild erscheint auf
`https://www.werdemeisterdeinergedanken.de/mitglieder`.

---

## 2026-09-06 – Carousels: alle 4 Farbwelten in der Galerie

Die Studio-Carousels gab es bisher nur in **einer** Farbe (Türkis/Navy). Der
Carousel-Generator hatte – anders als die Reel-Cover – kein Farbwelt-System.
Er wurde jetzt um dieselben vier Welten wie Reels & Co. erweitert: **Gold ·
Dunkel**, **Gold · Creme**, **Türkis · Navy**, **Türkis · Creme**.

**Geändert:**
- **`docs/carousels/build.mjs`:** Das Slide-CSS ist über eine aus der
  Reels-`palette(theme)` abgeleitete Token-Funktion (`carTokens`) themefähig
  (Hintergrund, Akzent, Text, Karten, Partikel, Scrim, Logo-Gehirn Gold/Türkis).
  Pro Format werden alle vier Welten geschrieben (`slide-NN{suffix}.html`).
  Beide Logo-Gehirne (Türkis + Gold) werden aus dem Cover-Studio kopiert.
- **`docs/carousels/export-png.mjs`:** rendert je Slide alle vier Welten
  (`slide-NN{suffix}.png`, plus transparente Overlay-Variante). Optional
  `node … <serie> <slug> <welt>`.
- **`tools/vorlagen/build-gallery.mjs`** (`buildCarousels`): pro Carousel jetzt
  **ein Eintrag je Welt** (Suffix in ID/ZIP, Welt-Label im Titel); Slides/ZIP
  strikt nach Welt gefiltert (sonst mischen sich die vier).
- **`src/lib/vorlagen-assets.ts`:** Studio-Carousels **49 → 196** (49 × 4
  Welten). Alle übrigen Einträge unverändert.
- **`.gitignore`:** `docs/carousels/logo-gold.png` (Build-Artefakt) ergänzt.

**Reproduktion:** `npm run carousels:png` (Chromium, rendert alle Welten) →
`npm run vorlagen:galerie`. Auf dem Server via `FULL_REBUILD=1`
`tools/deploy/update-vorlagen-galerie.sh`. Verifiziert per `npm run build`
(grün) und Sicht-Prüfung aller vier Welten (Cover + Body).

---

## 2026-09-06 – E-Book-Post-Grafiken: falsches Buchcover korrigiert

Die E-Book-Post-Vorlagen in der Galerie (`/admin/vorlagen`, „Ebook 1x1/4x5/…")
zeigten noch das **alte** Buchcover. Grund: Die Grafiken betten
`public/ebook-mockup.webp` zur Bauzeit ein; das Mockup wurde am 06.09. auf das
neue Gold-Seitengehirn (creme/gold) aktualisiert, die Post-Grafiken stammten
aber noch vom 03.09. und trugen das alte Cover.

**Geändert:**
- **`docs/marketing/ebook/WMDG-Ebook-*.png`** (20 Dateien: 5 Formate × 4
  Farbwelten) mit `ONLY=ebook node docs/marketing/brand-assets.mjs` neu gerendert
  – jetzt mit dem aktuellen Mockup/Cover. Maße unverändert (1080-basiert).

**Wirksam live** nach `npm run vorlagen:galerie` bzw. dem Deploy-Skript
(`tools/deploy/update-vorlagen-galerie.sh`) – die Galerie-Bilder werden aus
`docs/marketing/**` neu aufbereitet; die Katalog-Einträge (Pfade/Titel) bleiben
gleich.

---

## 2026-09-06 – Reel-Cover: alle 4 Farbwelten in der Galerie

In der Vorlagen-Galerie (`/admin/vorlagen`) erschien pro Reel-Cover nur **eine**
Farbwelt (türkis), obwohl der Cover-Generator jede Vorlage in **vier** Welten
erzeugt: Gold · Dunkel, Gold · Creme, Türkis · Navy, Türkis · Creme. Ursache:
`buildReels` leitete die ID nur aus der Cover-Nummer ab
(`reel-<bereich>-<nr>`), sodass alle vier Welten auf **dieselbe** ID kollidierten
(mit `parallel()` zusätzlich eine Race-Condition auf dieselbe Datei) und drei
Varianten still herausfielen.

**Geändert:**
- **`tools/vorlagen/build-gallery.mjs`** (`buildReels`): Farbwelt aus dem
  Datei-Suffix (`""`/`-hell`/`-tuerkis`/`-tuerkis-hell`) ableiten und in die ID
  (`reel-<bereich>-<nr><suffix>`) und den Titel (`… · <Welt-Label>`) aufnehmen.
  Import von `THEME_SUFFIX`/`THEME_LABEL` aus `docs/reels/covers/data.mjs`.
- **`src/lib/vorlagen-assets.ts`**: Reel-Cover-Einträge **59 → 236**
  (59 Motive × 4 Welten). Alle übrigen Einträge (Social 1423, Carousels 233,
  Workshop 40) **unverändert** aus dem Server-Stand übernommen.

**Reproduktion:** `npm run covers && npm run covers:png` (Chromium, rendert je
Cover alle 4 Welten) → `npm run vorlagen:galerie`. Auf dem Server via
`FULL_REBUILD=1 tools/deploy/update-vorlagen-galerie.sh`. Verifiziert per
`npm run build` (grün).

> Offen (separat geplant): Die **Carousels** haben im Generator noch kein
> Farbwelt-System – dort fehlen die Farbvarianten noch.

---

## 2026-09-06 – Deploy-Skript für die Vorlagen-Galerie

Skript, um die Galerie-Bilder im Server-Volume `/opt/website-vorlagen` sicher zu
aktualisieren, ohne die Live-Galerie zu beschädigen.

**Neu:**
- **`tools/deploy/update-vorlagen-galerie.sh`**: `git pull` + `npm ci`,
  Volume-Snapshot, `npm run vorlagen:galerie`, versionierten Katalog
  wiederherstellen, fehlende Teil-Galerien (Reels/Carousels/Overlays) aus dem
  Snapshot zurückspielen, **Konsistenz-Check** (bricht bei fehlenden Dateien ab),
  `rsync` nach `/opt/website-vorlagen`. Env: `REPO_DIR`/`VOLUME_DIR`/`BRANCH`,
  `FULL_REBUILD=1` für echten Komplett-Neubau (Chromium nötig).

**Geändert:**
- **`docs/generatoren/marketing-und-galerie.md`**: Abschnitt „Server-Deploy".

---

## 2026-09-06 – Vorlagen-Galerie auf dem Server neu erzeugt, Generator entschärft

Der Katalog aus dem Vorlauf (05.09.) war in einer Umgebung **ohne** die
gitignorierten Quell-Exporte entstanden; die Nicht-Social-Einträge wurden dort
nur aus dem alten Stand übernommen. Auf dem Server liegen alle Quellen vor,
deshalb wurde `npm run vorlagen:galerie` dort vollständig durchlaufen lassen.

**Ergebnis:** 1755 Katalog-Einträge (vorher 1725). Es ist **kein** Eintrag
weggefallen; hinzugekommen sind **30 Content-Overlays** (u. a.
`overlay-zitate-15` bis `-22`), die mangels Quelldateien vorher nicht gebaut
werden konnten. Social (1423), Reels (59) und Workshop (40) sind unverändert.
`content/vorlagen/` umfasst jetzt 4561 Dateien / 933 MB und wurde nach
`/opt/website-vorlagen` gespiegelt (Volume, siehe `docker-compose.yml`).

**Warum der Generator angefasst wurde:** Der erste Lauf hätte hochgerechnet
6–21 Stunden gebraucht. Zwei Ursachen, beide behoben:

1. **`effort: 6` bei transparenten Bildern.** Gemessen an einem 2160px-Overlay:
   **7,39 s** gegenüber **0,60 s** bei `effort: 4` – für nur 12 % kleinere
   Dateien (118 statt 134 KB). Bei deckenden Bildern ist der Unterschied klein
   (1,60 s vs. 1,32 s). 592 der 1423 Social-Quelldateien haben einen
   Alpha-Kanal, die Overlay-Familien fast durchgängig. `effort` ist beim
   WebP-Encoder reine Suchtiefe und **kein** Qualitätsregler – bei gleichem
   `quality` bleibt das Bild praktisch identisch. Neu wählt `webpOpts()` in
   **`tools/vorlagen/bild-jobs.mjs`** die Stufe anhand des Alpha-Kanals.
   Zwei Stellen bleiben bewusst bei 6: dort nimmt `flatten()` vorher den
   Alpha-Kanal weg, das Encoding ist also ohnehin schnell.
2. **Streng sequenzieller Ablauf.** Der Build lastete genau einen Kern aus.
   `parallel()` (ebenfalls in `bild-jobs.mjs`) arbeitet unabhängige Einheiten
   über eine Warteschlange begrenzter Breite ab – Standard ist die Kernanzahl,
   `GALERIE_JOBS` überschreibt sie. Alle acht Builder in `build-gallery.mjs`
   und `buildMarketingCarousels` wurden umgestellt.

Die **Ergebnisreihenfolge bleibt die der Eingabe**, sonst würden sich
Katalog-IDs und Slide-Reihenfolgen verschieben. Belegt: die 1423 Social-Dateien
tragen lückenlos `social-1` … `social-1423`, ohne Duplikate, Thumbs
deckungsgleich. Laufzeit danach: **12 Minuten**.

**`.dockerignore`:** `content/vorlagen` ergänzt. Der Ordner existierte auf dem
Server bisher nicht (die Binärdaten lagen nur unter `/opt/website-vorlagen`);
seit er lokal erzeugt wird, wären sonst ~1 GB in den Build-Kontext und ins
Image gewandert – zwecklos, weil das Volume den Pfad zur Laufzeit überlagert
und der Next-Build die Dateien nicht liest. Image blieb dadurch bei 1,08 GB.

**Voraussetzung nachinstalliert:** `zip` fehlte auf dem Server (`unzip` war da).
Ohne das Binary bricht der Generator beim ersten ZIP hart ab.

---

## 2026-09-05 – Geänderte Profil-Vorlagen in die Vorlagen-Galerie eingepflegt

Der Vorlagen-Katalog (`/admin/vorlagen`) war veraltet: Die neuen bzw.
überarbeiteten **Profil-/Kanal-Grafiken** aus `docs/marketing/profil/` fehlten
noch, und gelöschte Quelldateien standen weiterhin als tote Einträge (mit
kaputten Vorschaubildern) im Katalog. Der Katalog wurde neu erzeugt, sodass die
Galerie jetzt dem aktuellen Stand von `docs/marketing/` entspricht.

**Geändert:**
- **`src/lib/vorlagen-assets.ts`** (auto-generiert via `npm run vorlagen:galerie`):
  Der **Social-Teil** wurde komplett neu aus `docs/marketing/` aufgebaut
  (198 → **1423** Einträge, u. a. Zitate/Studien-Fakten in allen Formaten). Die
  Nicht-Social-Einträge (Reels 59, Carousels 203, Workshop 40) blieben
  **unverändert** übernommen.

**Neu in der Galerie (Profil & Kanal):**
- **Profilbild Quadrat** und **Profilbild Rund Emblem** – jeweils in den
  Varianten normal / hell / türkis / türkis-hell.

**Entfernt (tote Einträge, Quelldateien gelöscht):**
- **Profilbild 1080**, **Profilbild rund 1080**, **Profilbild rund 500**
  (inkl. hell-Varianten) – zeigten seit dem Löschen der Quell-PNGs ins Leere.

**Build-Fix (Generator):** Bei jetzt >1000 Katalog-Einträgen brach `next build`
mit dem TypeScript-Fehler *„Expression produces a union type that is too complex
to represent"* ab. `renderManifest` in **`tools/vorlagen/marketing-carousels.mjs`**
schreibt den Katalog deshalb in getypte Teil-Arrays (`vorlagenAssets0…N`,
je 250 Einträge) und setzt das Export-Array `vorlagenAssets` per Spread daraus
zusammen. Dadurch bleibt jedes einzelne Array-Literal für TypeScript darstellbar.
Verifiziert per `npm run build` (grün).

**Hinweis zur Reproduktion:** Nur `src/lib/vorlagen-assets.ts` ist versioniert;
die Binärdateien unter `content/vorlagen/` sind gitignored und liegen auf dem
Server (`/opt/website-vorlagen`, per Volume gemountet). Sie werden dort mit
`npm run vorlagen:galerie` reproduzierbar neu erzeugt. Die Quell-Exporte der
Reels- und Carousel-Generatoren (`docs/reels/covers/export`,
`docs/carousels/export`) sind ebenfalls gitignored und lagen in dieser
Arbeitsumgebung nicht vor – deshalb wurden **nur die geänderten Social-Vorlagen
neu erzeugt** und die übrigen Katalog-Einträge aus dem bisherigen Stand
beibehalten, damit keine Reels/Carousels aus dem Katalog verschwinden.

---

## 2026-09-04 – Hero-Text auf der rechten Seite linksbündig

Der Hero-Text, der im Spotlight-Aufbau auf der **rechten** Seite sitzt, wird
jetzt **linksbündig** ausgerichtet statt rechtsbündig – rechtsbündiger Text
wirkte unruhig. Zentral gelöst, betrifft **alle Seiten mit Hero-Text auf der
rechten Seite**.

**Geändert:**
- **`src/components/layout/PageHero.tsx`:** Im `columnClass` für den
  Spotlight-Modus die `spotlight === "left"`-Variante von
  `lg:items-end lg:text-right` auf `lg:items-start lg:text-left` umgestellt.
  Die Textspalte sitzt weiterhin über `ml-auto`/`mr-auto` auf der dem Motiv
  abgewandten Seite; der Text darin startet nun auf **beiden** Seiten links.

**Betroffen aktuell:** `/blog` (`spotlight="left"` → Text rechts, jetzt
linksbündig).

Verifiziert per `npm run build` (grün), ESLint (grün) und Screenshot `/blog`
@1440px (Titelzeilen + Eyebrow starten an derselben linken Kante).

---

## 2026-09-05 – Krafttier im Footer: Eisvogel → Schneeleopard getauscht

Das „Krafttier & Symbol"-Band im Footer zeigt jetzt statt des **Eisvogels** den
**Schneeleopard** – mit neuem Motiv, neuer Bedeutung und passendem Glow.

**Geändert:**
- **`src/components/layout/Footer.tsx`:**
  - Bild-`src` von `/eisvogel-blau.webp` auf `/schneeleopard.webp` umgestellt
    (`width`/`height` auf 720×646 angepasst, neuer Alt-Text).
  - Tagline: „Der **Schneeleopard** – mein Symbol für stille Stärke und innere
    Souveränität."
  - Attribute: **Stärke & Resilienz · Ruhe & Präsenz · Freiheit &
    Selbstbestimmung** (vorher: Glück & Hoffnung · Fokus & Präzision · Klarheit
    & Reinheit).
  - Glow-Radial + `drop-shadow` von Teal (`--color-teal-500`) auf ein neutrales
    Silber/Mist (`--color-mist-300`, `rgba(195,207,226,…)`), passend zum
    schwarz-weißen Motiv.

**Neu:**
- **`public/schneeleopard.webp`** – zugeschnittenes, verkleinertes WebP
  (720×646, ~92 KB, transparent), erzeugt aus `public/schneeleopard.png`.
- **`tools/images/schneeleopard-webp.mjs`** – reproduzierbares Skript
  (`trim` + `resize` + WebP-Export). Aufruf: `node tools/images/schneeleopard-webp.mjs`.

**Entfernt:**
- **`public/schneeleopard.png`** (3000×3000, ~11 MB) – wurde von der Seite nicht
  direkt geladen (nur das WebP) und ist deshalb aus dem ausgelieferten
  `public/`-Ordner **entfernt** (~11 MB gespart). Bei Bedarf lässt sich das WebP
  aus einer wieder bereitgestellten Quell-PNG neu erzeugen
  (`node tools/images/schneeleopard-webp.mjs pfad/zur/schneeleopard.png`).

Verifiziert per ESLint (grün).

---

## 2026-09-04 – Abstand Überschrift → Text auf `/ueber-mich` vergrößert

Nach dem Entfernen des Hundebild-Blocks stand der Erzähltext zu dicht an der
Überschrift „Ich kenne den Kopf, der nie zur Ruhe kommt" (der Block war zuvor
der Puffer dazwischen).

- **`src/app/ueber-mich/page.tsx`:** Dem Text-Block (`<div>` im zweiten
  `<Reveal>`) wurde `mt-8` gegeben, damit der Abstand zur Überschrift wieder
  zum Rhythmus der Seite passt.

---

## 2026-09-04 – Hundebild-Block von `/ueber-mich` entfernt & archiviert

Der Hundebild-Block (Bild + Zitat „Ein Hund holt dich sofort in den Moment." +
Präsenz-/Bewusstseins-Text) wurde **komplett von der „Über mich"-Seite
entfernt** und zur **späteren Wiederverwendung archiviert**.

- **`src/app/ueber-mich/page.tsx`:** `<figure>` mit Bild + `<figcaption>`
  entfernt; der nun ungenutzte `PhotoFrame`-Import wurde ebenfalls entfernt.
- **Bild verschoben:** `public/ueber-heiko-hund.webp` →
  `docs/archiv/hundbild-ueber-mich/ueber-heiko-hund.webp` (nicht mehr im
  öffentlichen `public/`-Ordner, keine weitere Referenz im Code).
- **Neu:** `docs/archiv/hundbild-ueber-mich/README.md` – enthält Text, Zitat,
  Alt-Text und das fertige JSX-Snippet inkl. Wiederverwendungs-Anleitung.

Verifiziert per ESLint (grün) und `tsc --noEmit` (keine Fehler in der Datei).

---

## 2026-09-04 – Hundebild auf `/ueber-mich` mitten in den Text verschoben

Der Hundebild-Block (Bild `/ueber-heiko-hund.webp` + Zitat „Ein Hund holt dich
sofort in den Moment." + Text über Präsenz/Bewusstsein) stand bisher **ganz
oben** in der Sektion „Meine Geschichte" – direkt unter der Überschrift und
**vor** dem eigentlichen Erzähltext.

- **Neu platziert:** Der Block sitzt jetzt **mitten im Fließtext**, nach dem
  Satz „Das war wichtig." und **vor** „Aber der eigentliche Wendepunkt kam durch
  etwas anderes:". Dort schließt der Meditations-/Wahrnehmen-Gedanke ab, sodass
  das Zitat („Präsenz / nur das Jetzt") inhaltlich passt.
- **Datei:** `src/app/ueber-mich/page.tsx` – die separate `<Reveal>`-Umhüllung
  des Bildes wurde entfernt; das `<figure>` ist nun Teil des Text-Blocks
  (`my-9` → `my-2`, da der Abstand jetzt über `gap-5` des Text-Containers
  geregelt wird). Bild, Alt-Text, Zitat und Bildunterschrift unverändert.

Verifiziert per ESLint (grün) und `tsc --noEmit` (keine Fehler in der Datei).

---

## 2026-09-04 – Seitenübersicht in den Admin-Bereich verschoben (`/admin/seiten`)

Die zuvor öffentliche Seitenübersicht (`/seiten`) ist jetzt **nur noch im
Admin-Bereich** erreichbar. Sie bündelt Links in alle Bereiche (inkl.
Mitgliederbereich) und ist damit eine interne Werkzeugseite.

- **Neu:** `src/app/admin/seiten/page.tsx` – gleiche Inhalts-Logik wie zuvor,
  jetzt als Server-Component mit **Admin-Zugriffsschutz** (`createClient` +
  `isAdminEmail`, `redirect` zu `/login` bzw. `/mitglieder`), analog zu den
  übrigen `/admin`-Seiten. `dynamic = "force-dynamic"`,
  `robots: { index: false, follow: false }`. Zusätzlich greift die Middleware
  (`src/proxy.ts`), die `/admin` ohnehin absichert (Defense-in-Depth).
- **Entfernt:** `src/app/seiten/page.tsx` (öffentliche Route).
- **`src/components/layout/Footer.tsx`:** der öffentliche Link
  „Seitenübersicht" wurde wieder entfernt.
- **`src/app/admin/page.tsx`:** im Admin-Dashboard gibt es jetzt einen Button
  „Seitenübersicht" (→ `/admin/seiten`).

Verifiziert per Production-Build (grün, `/admin/seiten` als dynamische Route ƒ,
kein öffentliches `/seiten` mehr).

---

## 2026-09-04 – Echte „Meine Geschichte" auf `/ueber-mich`

Der bisherige, generische Platzhaltertext im Abschnitt „Meine Geschichte" wurde
durch die **echte, persönliche Erzählung** ersetzt – als Storytelling aufgebaut
und bewusst zu den **7 Stufen der Bewusstseinsentwicklung** hinführend.

Inhaltliche Leitplanken (bewusst so gewählt):

- **Ton:** rein psychologisch – keine spirituellen Begriffe (Reiki, Trance,
  Frequenzen). Kern: Krise → Meditation/Atem → die richtigen Fragen → Verlust →
  tiefer schauen → Bewusstseinsentwicklung → Weitergeben.
- **Verlust (Lena):** nur **angedeutet** – ein schwerer Verlust wird erzählt,
  aber **nicht** explizit als Suizid benannt. Deshalb bewusst **kein**
  Telefonseelsorge-Hinweis (würde den Suizid explizit machen).
- Quelle des Rohmaterials: `docs/buch-1-verwertung/meine-geschichte.md`
  (E-Book „Unterwegs in anderen Dimensionen"); der Website-Text ist eine
  eigenständige, vom Betreiber vorgegebene Fassung.

Darstellung:

- Einspaltiges, schmales Lese-Layout (`Container size="narrow"`).
- Zwei akzentuierte „Fragen"-Blöcke, eine gestapelte „Du beginnst…"-Liste,
  ein Gold-Callout mit Link auf `/die-7-stufen` und ein Pull-Quote als Abschluss.
- Das Hunde-Foto samt Zitat bleibt als ruhige Auftakt-Figur erhalten.
- Die Meilenstein-Timeline („Mein Weg") wurde an den neuen Erzählbogen
  angeglichen (Anfang → erste Fragen → schwerster Verlust → 7 Stufen heute).

Betroffen:
- `src/app/ueber-mich/page.tsx` – neue Story-Sektion (ersetzt den Platzhalter),
  angepasstes `milestones`-Array, `Link`-Import ergänzt. Kein neues Datenmodul.

Verifiziert per `npm run build` (grün, `/ueber-mich` als statische Route ○) und
`npm run lint` (keine Probleme in der geänderten Datei).

---

## 2026-09-04 – Neue Seitenübersicht (`/seiten`) mit allen Links zum Anklicken

Neue Seite, die **alle** Seiten der Website als klickbare Liste bündelt,
gruppiert nach Bereich. Die dynamischen Gruppen werden aus denselben
Datenquellen erzeugt wie die echten Seiten – die Liste bleibt also automatisch
aktuell, sobald neue Inhalte dazukommen.

Gruppen:

- **Öffentliche Seiten** (Startseite, 7 Stufen, Mitgliedschaft + Willkommen,
  Bewusstseinstest, Über mich, Gratis-eBook, Kontakt, Login)
- **Blog** – Übersicht + alle veröffentlichten Artikel (`publishedPosts()`)
- **Mitgliederbereich** – Dashboard, Programm, Rückkehr, Journal,
  Gedankenprofil, Detektor, Begleiter, Einstellungen
- **Die 7 Stufen** – jede Stufe aus `stages` (`@/lib/content`)
- **Praxis** – Übersicht + alle Übungen aus `practices`
- **Vertiefungen** – Übersicht + alle aus `deepDives`
- **Wissensdatenbank** – Übersicht + alle Kapitel aus `chapters()` + Glossar
- **Administration** – Admin-Dashboard, Marken-Übersicht, Redaktionsplan,
  Vorlagen
- **Rechtliches** – Impressum, Datenschutz

Betroffen:
- `src/app/seiten/page.tsx` (neu) – Server-Component, nutzt `PageHero`,
  `Container`, `ArrowLink`-Optik; `robots: { index: false }`, da sie auch in
  den geschützten Mitgliederbereich verlinkt.
- `src/components/layout/Footer.tsx` – dezenter Link „Seitenübersicht" unter
  „Rechtliches", damit die Seite erreichbar ist.

Verifiziert per Production-Build (grün, `/seiten` als statische Route ○).

---

## 2026-09-04 – Buchmockup auf Desktop deutlich größer (wirkte verloren)

`lg:w-96` (384 px) reichte nicht – das Buch wirkte in der schmalen linken
Spalte (`0.8fr` bei `max-w-6xl` ≈ 455 px) verloren. Jetzt bekommt die
Buch-Spalte mehr Breite **und** das Buch mehr Größe:

- **Startseite (`LeadMagnet`):** Grid von `lg:grid-cols-[0.8fr_1fr]` auf
  `lg:grid-cols-[1fr_1fr]` (gleiche Spalten), Buch `lg:w-[28rem]` (448 px).
- **`/gratis-ebook`:** Buch `lg:w-[26rem]` (416 px). Hier bleibt das Grid bei
  `lg:grid-cols-[0.85fr_1fr]` – die große H1 (`text-5xl`,
  „Bewusstseinsentwicklung") braucht die breitere Textspalte, sonst bricht
  das lange Wort unschön um.
- **Formular-Button** (`EbookForm`): `shrink-0 whitespace-nowrap` ergänzt,
  damit „E-Book sichern" in der schmaleren Spalte einzeilig bleibt und nicht
  schrumpft.

Mobile-Größen unverändert. Verifiziert per Production-Build (grün) und
Screenshots bei 1280 px und 1440 px (Buch präsent, Überschrift intakt,
Button einzeilig).

---

## 2026-09-04 – Buchmockup auf Desktop vergrößert

Das Mockup wirkte auf dem Desktop in der linken Spalte zu klein (viel
Leerraum). Es hatte keine eigene Desktop-Breite, nur `sm:w-72` (288 px).

Neu: `lg:w-96` (384 px), damit das Buch die Spalte füllt und mit der
Formularkarte rechts optisch gleichzieht. Mobile-Größen (`w-64`/`w-56` bzw.
`sm:w-72`) bleiben unverändert.

Betroffen:
- `src/components/sections/LeadMagnet.tsx` (Startseite)
- `src/app/gratis-ebook/page.tsx` (Landingpage)

Visuell per Screenshot bei 1280 px geprüft.

---

## 2026-09-04 – Buchmockup auf Mobile zwischen Überschrift und Formular

Feinschliff zur vorherigen Änderung: Das Buch stand auf Mobile ganz oben
über der Überschrift. Gewünscht war es **zwischen Überschrift und Formular**.

Dafür wurde der bisher gemeinsame rechte Block (Überschrift + Intro +
Formular) in **drei** eigene Grid-Kinder aufgeteilt, DOM-Reihenfolge
Überschrift → Buch → Formular:

- **Mobile** (eine Spalte): stapelt genau so – das Buch sitzt zwischen dem
  Intro und der Anmeldekarte.
- **Desktop** (`lg:`): unverändertes Bild – das Buch rückt per
  `lg:col-start-1 lg:row-start-1 lg:row-span-2 lg:self-center` in die linke
  Spalte über beide Zeilen, Überschrift (oben) und Formular (unten) stehen
  rechts. Grid: `lg:grid-cols-[…] lg:grid-rows-[auto_auto]`.

Betroffen:
- `src/components/sections/LeadMagnet.tsx` (Startseite) – heading group =
  Eyebrow + H2 + Intro, dann Buch, dann Formularkarte (Bullets + Formular +
  Trust-Zeile).
- `src/app/gratis-ebook/page.tsx` (Landingpage) – heading group = Eyebrow +
  H1 + Intro + Bullets, dann Buch, dann Formular.

Verifiziert per Production-Build (grün) und Playwright-Screenshots bei
390 px (Mobile: Reihenfolge korrekt) und 1280 px (Desktop: Buch weiterhin
links, vertikal zentriert). Reine Layout-/Reihenfolge-Änderung.

---

## 2026-09-04 – Buchmockup auf Mobile zur Überschrift verschoben

Auf schmalen Screens (Handy) stand das E-Book-Mockup **unter** dem
Anmeldeformular, also ganz am Ende der Sektion – weit weg von der
Überschrift. Ursache: Buch- und Textspalte wurden per `order`-Utilities
umgedreht (`order-2 lg:order-1` beim Buch, `order-1 lg:order-2` beim Text),
damit das Buch auf dem Desktop links steht.

Jetzt steht das Buch auf Mobile **oben bei der Überschrift**: Buch = `order-1`,
Text = `order-2`. Auf dem Desktop (`lg:`) bleibt alles wie gehabt – Buch
links, Text/Formular rechts, weil das Buch in der DOM-Reihenfolge zuerst
kommt und das Grid es damit in die linke Spalte legt.

Betroffen (gleiche Struktur, beide angepasst):
- `src/components/sections/LeadMagnet.tsx` (Startseite)
- `src/app/gratis-ebook/page.tsx` (Gratis-E-Book-Landingpage)

Reine CSS-Reihenfolge, keine inhaltliche Änderung.

---

## 2026-09-04 – Neues 3D-Buchmockup auf der Website

Das E-Book-Mockup, das auf der Startseite (`LeadMagnet`) und auf
`/gratis-ebook` neben dem Anmeldeformular steht, wurde gegen ein neues
**3D-Buchrender** ausgetauscht (Titel „Die 7 Stufen der
Bewusstseinsentwicklung", cremeweißer Umschlag mit goldenem Seitengehirn,
perspektivische Ansicht mit Buchrücken).

- Ersetzt: `public/ebook-mockup.webp` (vorher flache Cover-Ansicht 1200×1600,
  jetzt 3D-Render 1182×1600, transparenter Hintergrund).
- **Kein Code-Change nötig**: Beide Stellen importieren die Datei statisch
  unter demselben Pfad (`LeadMagnet.tsx`, `gratis-ebook/page.tsx`);
  `next/image` liest die neuen Maße automatisch, die Anzeige nutzt feste
  Breite + `h-auto`, das Seitenverhältnis passt sich an.
- Transparenz bewusst beibehalten: Das Buch steht so mit dem vorhandenen
  Gold-Schein und `drop-shadow-2xl` auf dem Navy-Grund, ohne schwarzen Rand.
- Quelle 3000×4000 PNG (RGBA) → auf Alpha-Bounding-Box zugeschnitten und auf
  Höhe 1600 skaliert, als WebP (Q90) gespeichert (~116 KB).

Nicht berührt: `public/ebook-cover.*` (flache Cover-Variante, wird im
Website-Code nicht referenziert) und das E-Book-PDF selbst.

---

## 2026-09-03 – E-Book nur noch mit bestätigter Anmeldung

Der Lead-Magnet war auf **zwei** Wegen ohne E-Mail-Adresse zu bekommen:

1. `/Die-7-Stufen-der-Bewusstseinsentwicklung.pdf` – die Datei lag unter
   `public/`, und alles dort liefert Next.js zusätzlich direkt unter seinem
   Dateipfad aus. Derselbe Fallstrick wie früher bei den Mitglieder-PDFs und
   den Vorlagen.
2. `/ebook` – die Download-Route war `force-static` und prüfte nichts.

Beides ist zu. Das PDF liegt jetzt in `content/pdf/` (wird vom Dockerfile
ohnehin ins Laufzeit-Image kopiert), `/ebook` ist dynamisch und verlangt ein
Token. Als Token dient das vorhandene `confirm_token` des Leads – keine
Migration, keine neue Env-Variable nötig; es ist pro Adresse eindeutig, liegt
der bestätigten Person vor und wird bei einer erneuten Anfrage eines offenen
Leads neu erzeugt, womit alte Links verfallen. Bewusst nicht das
`unsubscribe_token`: ein weitergeleiteter Link würde sonst die Abmeldung
Dritter erlauben. Ohne bzw. mit falschem Token gibt es 404 statt 403.

Was sich im Ablauf ändert: Die Liefermail und die Bestätigungsseite verlinken
den Download mit Token; das PDF hängt wie bisher als Anhang an der Mail. Der
„Notausgang" im Formular (`status === "fallback"`, wenn der Versand klemmt)
bot bisher das PDF frei an – das war die Lücke in Sichtbarkeit und ist jetzt
ein „Erneut versuchen". Der Direktlink nach erfolgreichem Absenden bleibt,
aber nur für bereits bestätigte Adressen: `/api/ebook` gibt dafür eine
`downloadUrl` mit Token zurück.

Die Admin-Vorlagenübersicht verlinkte den alten `public/`-Pfad. Sie bekommt
mit `/admin/vorlagen/ebook` eine eigene, an die Anmeldung gebundene Route –
ein Admin hat kein Lead-Token. `tools/pdf/generate.mjs` schreibt das E-Book
jetzt nach `content/pdf/` statt `public/`.

Verifiziert gegen einen Wegwerf-Container mit dem fertigen Image: alter
Dateipfad 404, `/ebook` ohne Token 404, mit erfundenem Token 404, mit dem
Token eines bestätigten Leads 200 mit 3.549.855 Bytes `application/pdf`.

---

## 2026-09-03 – Startseite „Warum ich das mache": Portrait-Avatar näher rangezoomt

**Wunsch:** Das Gesicht sitzt im runden Avatar (Heiko Schwaninger) neben dem
Namen zu klein – es soll den Kreis stärker ausfüllen.

**Umgesetzt:** Das Portrait wird jetzt eine Stufe hineingezoomt, sodass der Kopf
den Avatar besser füllt. Der Zoom ist am oberen Rand verankert (`origin-top`),
damit der Kopf oben bündig bleibt und die Gesichtsmitte im Kreis zentriert liegt.

**Geändert:**
- `src/components/sections/WhyMe.tsx`: Am `<Image>` des Avatars die Klasse
  `origin-top scale-[1.35]` ergänzt (zusätzlich zu `object-cover object-top`).
  Der umgebende `span` hat bereits `overflow-hidden rounded-full`, sodass das
  vergrößerte Bild sauber im Kreis beschnitten wird.

---

## 2026-09-03 – Footer: Social-Media-Buttons in Markenfarben

**Wunsch:** Die Social-Media-Buttons im Footer sollen farbig sein.

**Umgesetzt:** Jeder Social-Button erscheint jetzt im Icon in der jeweiligen
Markenfarbe (Instagram Pink, Facebook Blau, YouTube Rot, LinkedIn Blau). Beim
Hover/Fokus füllt sich der Button vollständig in der Markenfarbe (Instagram als
typischer Farbverlauf), das Icon wird weiß und der Button hebt sich leicht an.

**Geändert:**
- `src/components/layout/Footer.tsx`:
  - Neue `socialColors`-Map mit Marken-`color` (Icon-Grundfarbe) und `bg`
    (Hover-Füllung) je Plattform inkl. `telegram` (für spätere Aktivierung).
  - Buttons setzen die Farben rein über CSS-Variablen (`--social-color`,
    `--social-bg`) + Tailwind-Utilities (`text-[var(--social-color)]`,
    `hover:[background:var(--social-bg)]`, `hover:text-white`). Kein JS/Client
    nötig – der Footer bleibt eine Server-Komponente.
  - `CSSProperties`-Typ aus `react` importiert (für die CSS-Variablen im
    `style`-Attribut).

---

## 2026-09-03 – Bewusstseinstest-Hero: volles Desktop-Bildband zurückgenommen (wie /mitgliedschaft)

Die zuvor eingebaute Desktop-Variante „volles Bildband" auf `/bewusstseinstest`
gefiel in der Darstellung nicht und wurde **komplett zurückgenommen**. Die
Hero-Sektion sieht auf dem Desktop jetzt wieder aus **wie auf `/mitgliedschaft`**:
Das Bild liegt ab `lg` **dezent (55 %) als Hintergrund hinter dem Text** mit
Navy-Lesbarkeits-Schleier; auf Mobil bleibt es als eigenes Band im Fluss.

**Geändert:**
- `src/app/bewusstseinstest/page.tsx`: Hero-Sektion auf das ursprüngliche
  Mitgliedschafts-Muster zurückgesetzt:
  - `lg:min-h-[34rem] lg:justify-center` wieder da; Bild-Wrapper wieder
    `lg:absolute lg:inset-0 lg:aspect-auto`, Bild wieder `lg:opacity-55`.
  - Navy-Schleier (`hidden lg:block`, horizontaler Verlauf) und der auf `lg`
    ausgeblendete Unterkanten-Fade (`lg:hidden`) wieder eingesetzt.
  - Text-Container wieder `lg:py-24`.
  - **Beibehalten:** der mobile Band nutzt weiterhin `aspect-[16/9]` (passend
    zum neuen 16:9-Motiv), und das neue Titelbild (`hero-bewusstseinstest.webp`)
    bleibt unverändert.

Damit ist der Stand vor der „volles-Bildband"-Änderung wiederhergestellt – nur
mit dem neuen Bild.

---

## 2026-09-03 – Mitgliederbereich: Marketing-Navigation im Header ausgeblendet

**Gemeldetes Problem:** Im geschützten Mitgliederbereich (`/mitglieder…`) fehlte
im Header der Punkt „Mitgliedschaft". Das war zwar so gewollt (ein zahlendes
Mitglied soll keine Verkaufs-Einladung sehen), wirkte aber **irreführend**: Die
übrigen Header-Links (Die 7 Stufen, Bewusstseinstest, Über mich, Blog) führten
weiter aus dem geschützten Bereich hinaus. Ein Klick z. B. auf „Bewusstseinstest"
landete auf einer öffentlichen Seite – und dort war **das volle Menü inkl.
„Mitgliedschaft" wieder da**. Das Menü „sprang" also je nach Seite.

Sicherheit war nie betroffen: Der Zugriffsschutz liegt im Proxy (`src/proxy.ts`)
und im `MembersLayout` (Login-Prüfung), **nicht** in der Menü-Sichtbarkeit. Es
war rein ein UX-/Konsistenz-Thema.

**Entscheidung:** Im Mitgliederbereich die **gesamte** öffentliche
Marketing-Navigation ausblenden, statt nur einen Punkt. Die inhaltliche
Orientierung übernimmt weiterhin die `MemberNav` (Mein Bereich, Praxis, Journal,
Wissen, Programm, Einstellungen) direkt unter dem Header.

**Geändert:**
- `src/components/layout/Header.tsx`:
  - Im Mitgliederbereich (`pathname.startsWith("/mitglieder")`) wird die
    komplette Haupt-Navigation (Desktop **und** mobiles Menü) nicht mehr
    gerendert – vorher wurde nur „Mitgliedschaft" herausgefiltert.
  - Rechts im Header erscheinen im Mitgliederbereich stattdessen **„Zur Website"**
    (Link auf `/`) und **„Abmelden"** (`<form action={signOut}>`, Server-Action
    aus `src/app/auth/actions.ts`). Außerhalb des Mitgliederbereichs unverändert:
    „Mitglieder"-Link + CTA „Kostenloses Erstgespräch".
  - Die frühere Breiten-Kompensation (`imMitgliederbereich`-abhängige
    `gap`/`px`/`inset`-Werte) entfällt, da die Marketing-Nav im
    Mitgliederbereich gar nicht mehr angezeigt wird; die öffentliche Nav nutzt
    weiter die kompakten Werte (`gap-0.5`, `px-3`, `after:inset-x-3`).

Verifiziert: `next build` erfolgreich, ESLint sauber. Der öffentliche Header
bleibt inhaltlich unverändert.

---

## 2026-09-03 – Bewusstseinstest: Titelbild getauscht (Kompass-Plaza im Sonnenuntergang)

Das Titelbild der Seite `/bewusstseinstest` wurde gegen ein neues Motiv
getauscht: eine dunkle Stein-Plaza mit **Kompass-Intarsie** und leuchtenden
Rune-Kreisen, die als Weg auf einen **Sonnenuntergang über Bergen** zulaufen –
passt thematisch zum bisherigen „Kompass & Weg ins Licht".

**Änderungen**

- `public/hero-bewusstseinstest.webp` **neu erzeugt** aus dem hochgeladenen PNG
  (1672×941, Seitenverhältnis 16:9). WebP Qualität 82 (~127 KB), unter gleichem
  Namen ersetzt.
- `src/app/bewusstseinstest/page.tsx`: Hero-Sektion umgebaut – das Bild liegt
  jetzt auf **allen** Breakpoints (auch Desktop) als eigenes **volles Bildband**
  im Fluss (`aspect-[16/9]`, volle Deckkraft, unbeschnitten), der Text steht
  darunter auf reinem Navy.
  - Zuvor lag das Bild ab `lg` **gedimmt (55 %) als Hintergrund hinter dem Text**
    (`lg:absolute inset-0`, `lg:opacity-55`) mit Lesbarkeits-Schleier. Diese
    Desktop-Sonderbehandlung wurde entfernt (auf Wunsch: „volles Bildband wie
    Mobil"): kein `lg:absolute`, kein `lg:opacity-55`, kein Navy-Schleier mehr,
    `lg:min-h-[34rem] lg:justify-center` entfernt.
  - Mobiler Band von `aspect-[3/2]` (altes 3:2-Bild) auf `aspect-[16/9]`
    (neues Motiv) umgestellt; der Unterkanten-Verlauf ins Navy gilt jetzt auf
    allen Breakpoints.

Das alte 3:2-Bild bleibt über die Git-Historie wiederherstellbar.

---

## 2026-09-03 – Öffentlicher Header: Logo bricht nicht mehr um (Desktop)

Im **öffentlichen** Header (nicht im Mitgliederbereich) brach die Wortmarke auf
Desktop um: „WERDE MEISTER" rutschte auf zwei Zeilen und wirkte „verschoben".

**Ursache:** Der öffentliche Header trägt mehr Inhalt als der Mitglieder-Header
– zusätzlich den Nav-Punkt „Mitgliedschaft" **und** den CTA-Button „Kostenloses
Erstgespräch". Gemessen mit den echten Schriften überschreitet die Zeile den
Container (max-w-6xl, ~1088 px Inhalt) um ~23 px. Da das Logo keinen festen
Platz beanspruchte (`flex-shrink` aktiv), wurde es gestaucht und die Wortmarke
umbrach. Im Mitgliederbereich (weniger Inhalt, kein Button) passt alles → dort
war das Logo immer korrekt.

**Geändert (nur öffentlicher Header betroffen, Mitgliederbereich unverändert):**
- `src/components/layout/Header.tsx`:
  - `<Logo className="shrink-0" />` – das Logo wird nie mehr gestaucht/umbrochen.
  - Navigation im **öffentlichen** Bereich etwas kompakter: `px-3` statt `px-4`
    pro Link und engerer Abstand (`gap-0.5`), aktive Unterstreichung
    `after:inset-x-3`. Im Mitgliederbereich bleibt alles bei `px-4`/`gap-1`
    (`imMitgliederbereich`-Verzweigung) – dort ändert sich **nichts**.

Damit passt die öffentliche Kopfzeile mit ~25 px Reserve, das Logo steht wie im
Mitgliederbereich. Verifiziert per Headless-Messung mit Fraunces/Inter.

---

## 2026-09-03 – Wortmarke: Unterzeile „Deiner Gedanken" zentriert (war verschoben)

Im Schriftlogo (Header hell + Footer dunkel) saß die zweite Zeile
`— Deiner Gedanken —` **linksbündig** unter „WERDE MEISTER" und wirkte dadurch
nach links **verschoben**. Ursache: Die Zeile liegt in einer Flex-Spalte, die
ihre Kinder auf die Breite der (breiteren) ersten Zeile streckt – ohne
Zentrierung wurde der Dekor-Strich-Text-Block links gepackt.

**Geändert:**
- `src/components/visuals/Logo.tsx`: Der zweiten Zeile (`— Deiner Gedanken —`)
  `justify-center` gegeben, sodass sie **mittig unter „WERDE MEISTER"** sitzt –
  symmetrisch mit den goldenen Flankier-Strichen, passend zum Marken-Emblem.

Wirkt in beiden Varianten (`tone="onLight"` im Header, `tone="onDark"` im Footer).
Verifiziert per Headless-Render mit der echten Fraunces-Schrift (Vorher/Nachher).

---

## 2026-09-03 – Footer-Copyright-Zeile: Mobil-Ausrichtung korrigiert

Die untere Copyright-Zeile im Footer (`© … Alle Rechte vorbehalten.` +
`Werde Meister deiner Gedanken · Bewusstseinsentwicklung in 7 Stufen`) wurde auf
schmalen/mittleren Bildschirmen **nebeneinander an die Ränder gezogen** (unruhig,
wirkte „nicht richtig platziert"), weil sie schon ab `sm` (640 px) auf
`flex-row justify-between` umgeschaltet hat.

**Geändert:**
- `src/components/layout/Footer.tsx` (Copyright-Leiste):
  - Umschalt-Breakpoint von `sm:` auf `lg:` (1024 px) angehoben – passt zum
    restlichen Footer, der ebenfalls erst ab `lg` volle Breite nutzt.
  - Auf Mobil/Tablet jetzt **gestapelt und zentriert** (`flex-col items-center
    text-center`); erst ab `lg` nebeneinander und linksbündig
    (`lg:flex-row lg:justify-between lg:text-left`).
  - `justify-between` greift dadurch nur noch im Zeilen-Layout ab `lg`.

Verifiziert per Headless-Screenshots bei 500 px (gestapelt/zentriert), 820 px
(gestapelt/zentriert) und 1100 px (nebeneinander).

---

## 2026-09-03 – Footer-Eisvogel getauscht: Gold → Blau (echtes Motiv)

Der Eisvogel im Footer wurde vom **goldenen** auf das **blaue** (naturechte)
Motiv umgestellt. Beide Varianten lagen bereits im Repo; die blaue entspricht
der realen Färbung des Eisvogels.

**Geändert:**
- `src/components/layout/Footer.tsx`
  - Bild-`src` von `/eisvogel-gold.webp` auf `/eisvogel-blau.webp` umgestellt.
  - Glow-Radial von Gold (`--color-gold-500`) auf Teal (`--color-teal-500`)
    umgestellt, damit der Schein zum blauen Motiv passt.
  - Drop-Shadow von Gold `rgba(217,169,58,0.3)` auf Teal `rgba(33,178,189,0.3)`
    angepasst.

Die Datei `public/eisvogel-gold.webp` bleibt vorerst unbenutzt liegen und kann
später entfernt werden, falls nicht mehr gebraucht.

---

## 2026-09-03 – Programm-Seite: Titelbild getauscht (neues Neon-Gehirn-Logo)

Das Titelbild der Mitglieder-Programm-Seite (`/mitglieder/programm`) wurde gegen
die neue Motiv-Variante getauscht: identische Meditations-Szene, aber mit dem
**leuchtenden Neon-Gehirn-Logo** (orange Linien-Umriss) statt des zuvor
gefüllten goldenen Gehirn-/Baum-Symbols.

**Änderungen**

- `public/hero-programm.webp` **neu erzeugt** aus dem hochgeladenen PNG
  `public/2fd37d3c-2fe5-4387-910f-6408a0b4f877.png` (1672×941, unverändertes
  Seitenverhältnis). Aus dem PNG (~2,3 MB) wurde ein optimiertes WebP
  (Qualität 82, ~183 KB) erzeugt und die Datei **unter gleichem Namen** ersetzt.
- **Kein Code-Änderung** nötig: `src/app/mitglieder/programm/page.tsx` referenziert
  weiterhin `/hero-programm.webp`; das Seitenverhältnis wird via
  `heroImageAspect()` automatisch aus dem Dateikopf gelesen.

Hinweis: Das Roh-PNG `2fd37d3c-…png` liegt bereits auf `main` (vom Upload) und
wurde **nicht** zusätzlich in diesen Branch übernommen. Das alte Bild bleibt über
die Git-Historie wiederherstellbar.

---

## 2026-09-02 – Aufräumen: ungenutzte hochgeladene Roh-PNGs entfernt

Die zuvor hochgeladenen großen Roh-PNGs mit UUID-Dateinamen wurden aus `public`
entfernt – sie waren **nirgends im Code referenziert** und wurden nur unnötig
mit ausgeliefert (~10,2 MB). Das für den Footer verwendete freigestellte Motiv
liegt weiterhin als `public/eisvogel-blau.webp` vor (daraus erzeugt).

**Entfernt (je 1,6–2,5 MB):**

- `public/0d6daecd-ba2c-487a-982b-e85fe433d466.png` (freigestellter Eisvogel –
  Quelle für `eisvogel-blau.webp`, wird nicht mehr direkt gebraucht)
- `public/506998a4-c2b1-4f4d-9c02-6841d20063b7.png` (Eisvogel-Foto, dunkler Grund)
- `public/be4c45e2-facd-4b29-b187-8227d26a7f75.png` (Eisvogel-Foto, dunkler Grund)
- `public/25703de6-7e68-4ae2-8db1-ca3cd96a36dc.png` (Meditations-Szene)
- `public/857bc3c9-7eaf-44f3-b9e4-7e10a58cb838.png` (goldenes Gehirn-Logo)

Alle Dateien bleiben über die Git-Historie (Commit `a8c9ecb`) wiederherstellbar,
falls sie doch noch gebraucht werden. `hero-programm.png` bleibt erhalten (wird
auf der Mitglieder-Programm-Seite verwendet).

---

## 2026-09-02 – Footer-Eisvogel: freigestelltes Motiv statt Foto-Rahmen

Der zuvor als **gerahmtes Foto** (dunkler Hintergrund, `rounded-2xl`) eingebaute
blaue Eisvogel wurde durch die **freigestellte, transparente Variante** ersetzt und
wieder auf den **kleinen Icon-Look mit sanftem Gold-Glow** gebracht – wie beim
ursprünglichen goldenen Eisvogel, nur in den echten Eisvogel-Farben.

**Änderungen**

- `public/eisvogel-blau.webp` **neu erzeugt** aus der freigestellten Vorlage
  `public/0d6daecd-ba2c-487a-982b-e85fe433d466.png` (transparenter Hintergrund,
  auf Motiv zugeschnitten, 640 px, WebP mit Alpha ≈ 122 KB). Ersetzt die vorige
  Foto-WebP gleichen Namens.
- `src/components/layout/Footer.tsx`:
  - Rahmen-Darstellung (`rounded-2xl`, `ring`, großer Schatten, `w-56/72`)
    entfernt.
  - Zurück auf **kleines Icon**: `w-16 sm:w-20`, zentriert, mit weichem goldenem
    Radial-Glow (`div` mit `radial-gradient`) und dezentem Gold-Drop-Shadow.
  - `width/height` auf das neue Seitenverhältnis (640×622) angepasst.

Hinweis: In `public` liegen weitere hochgeladene Motive (dunkle Foto-Versionen
`506998a4…` / `be4c45e2…`, eine Meditations-Szene, ein Gehirn-Logo). Für den
Footer wird bewusst die **freigestellte** Datei verwendet. Die alte
`eisvogel-gold.webp` bleibt weiterhin unbenutzt liegen.

---

## 2026-09-02 – Eisvogel im Footer getauscht: Gold → Blau (echtes Motiv)

Das Krafttier-Bild ganz unten im Footer (mittig, über der Copyright-Zeile) war
bisher der **freigestellte goldene Eisvogel** (`eisvogel-gold.webp`, kleines
Icon ~64–80 px mit goldenem Radial-Glow). Es wurde gegen ein **neues, realistisch
gerendertes Motiv in natürlichem Blau-Orange** ausgetauscht.

**Änderungen**

- Neues Bild `public/eisvogel-blau.webp` hinzugefügt (aus der hochgeladenen PNG
  1536×1024 auf 900×600 skaliert, WebP q82 ≈ 72 KB).
- `src/components/layout/Footer.tsx`:
  - `src` von `/eisvogel-gold.webp` auf `/eisvogel-blau.webp` umgestellt,
    `width/height` auf das neue 3:2-Seitenverhältnis (1536×1024) angepasst.
  - Das Motiv bringt einen **eigenen Glow auf dunklem Grund** mit, daher wurde der
    künstliche goldene Radial-Glow-`div` entfernt. Stattdessen ist das Bild jetzt
    als gerahmtes Foto dargestellt: `rounded-2xl`, feiner `ring-white/10` und ein
    dezenter bläulicher Schatten – deutlich größer (`w-56 sm:w-72`) als das alte
    Icon, damit die Details zur Geltung kommen.
  - `alt`-Text und Kommentar von „Goldener Eisvogel" auf „Eisvogel" angepasst.
- Die alte Datei `public/eisvogel-gold.webp` bleibt vorerst liegen (unbenutzt),
  falls schnell zurückgetauscht werden soll.

Die begleitende Bildunterschrift („Der Eisvogel – mein Symbol für einen klaren,
wachen Geist" inkl. Glück/Fokus/Klarheit) bleibt unverändert.

---

## 2026-09-02 – Creme-Übergang am Blog-Hero wieder entfernt (rückgängig)

Der zuvor eingebaute weiche Creme-/Weiß-Verlauf am unteren Blog-Hero-Rand war
nicht erwünscht und wurde **komplett zurückgenommen**. Der Blog-Hero endet damit
wieder wie ursprünglich (harter Absatz zur Blog-Liste, kein Verlauf).

**Änderungen (Rücknahme des Eintrags direkt darunter)**

- `src/app/blog/page.tsx`: `fadeToColor="var(--color-paper)"` wieder entfernt.
- `src/components/layout/PageHero.tsx`: Die zuvor ergänzte `fadeToColor`-Rendering
  im **Bildband-/Spotlight-Zweig** wieder entfernt. Der ältere `fadeToColor`-Block
  im klassischen Layout (unverändert seit vorher) bleibt bestehen; die Prop wird
  aktuell nirgends mehr genutzt.

Damit ist der Stand vor dem Creme-Übergang wiederhergestellt. Der Blog-Hero bleibt
weiterhin ohne Spotlight (siehe übernächster Eintrag).

---

## 2026-09-02 – Blog-Hero läuft unten weich in Creme aus

Der Blog-Hero (`/blog`) blieb bisher am unteren Rand hart Navy und setzte dann
mit einem sichtbaren horizontalen Schnitt auf die creme-/paperfarbene Blog-Liste
(`bg-paper-aura`, `--color-paper` = `#f6f4ee`) auf. Jetzt gibt es einen weichen,
langen Verlauf ins Creme – kein harter Übergang mehr.

**Ursache / warum es vorher „nicht ging":** Die Prop `fadeToColor` war im
`PageHero` **nur im klassischen Layout** implementiert. Der Blog-Hero läuft aber
über den **Bildband-Zweig** (greift immer, sobald `image` gesetzt ist) – dort
wurde `fadeToColor` schlicht ignoriert.

**Änderungen**

- `src/components/layout/PageHero.tsx`: Den `fadeToColor`-Verlauf jetzt auch im
  Bildband-/Spotlight-Zweig gerendert (identische Gradient-Formel wie im
  klassischen Layout, `z-0` vor dem Text-Container mit `z-10`, Höhe
  `h-3/4 sm:h-3/5`). Damit funktioniert das weiche Auslaufen für **jeden** Hero
  mit Bild – mit oder ohne Spotlight.
- `src/app/blog/page.tsx`: `fadeToColor="var(--color-paper)"` am `PageHero`
  gesetzt, damit das Hero-Ende exakt in die Hintergrundfarbe der Blog-Liste
  übergeht. (Das kurz zuvor entfernte `spotlight="right"` bleibt entfernt – siehe
  Eintrag direkt darunter; der Creme-Übergang ist davon unabhängig.)

Mobil (Bildband, Text auf Navy darunter) blendet ebenfalls sauber ins Creme aus.

---

## 2026-09-02 – Blog-Hero zurück auf den Standard-Aufbau (kein Spotlight)

Auf `/blog` ist der Hero auf Desktop sehr dunkel – vom Motiv (Gipfel,
Sonnenaufgang, Kompass) ist kaum etwas zu erkennen.

**Änderung**

- `src/app/blog/page.tsx`: `spotlight="right"` entfernt. Der Hero nutzt wieder
  den gewohnten gleichmäßigen Navy-Schleier mit zentriertem Text.

**Wichtig: Das hat das Problem NICHT behoben.**

Die ursprüngliche Annahme war, der gerichtete Verlauf ersticke das zentrierte
Motiv. Nach dem Deploy gemessen (Helligkeit 0–255 über vier Zonen, links → rechts):

| | | | | |
|---|---|---|---|---|
| `/blog` mit Spotlight | 31,5 | 24,2 | 22,5 | 25,2 |
| `/blog` ohne Spotlight | 20,8 | 33,1 | 32,1 | 23,6 |
| `/ueber-mich` (Referenz, funktioniert) | 39,5 | 44,9 | 48,7 | 40,5 |

Nur marginal heller, weiterhin weit unter der Referenz. Der Spotlight-Verlauf
war also **nicht** die Ursache.

**Was geprüft und ausgeschlossen ist**

- Der Optimizer liefert das Bild korrekt: `/_next/image?url=%2Fhero-blog-gipfel.webp&w=1920&q=75`
  → 200, 84 KB, 1672×941, ein intaktes Motiv.
- Unterhalb von `lg` (mobiles Bildband) erscheint das Bild vollständig.
- Kein Render-Rennen: fünf Läufe mit unterschiedlichem `--virtual-time-budget`
  und zusätzlich `--run-all-compositor-stages-before-draw` liefern identische Werte.
- Das Markup von `/blog` und `/ueber-mich` ist strukturell identisch.
- Eine CSS-Nachbildung mit demselben Verlauf und Gold-Glow zeigt das Motiv klar
  (mitte 43,1 / rechts 57,4 statt 22,4 / 24,4 live).

**Ursache weiterhin unbekannt.** Verwandter Fall zum Vergleich: der `?v=2`-Cache-Bust
brach `next/image` auf Wissen/Praxis und hinterließ schwarze Kästen – dort antwortete
der Optimizer allerdings mit 400, hier mit 200. Der Mechanismus ist also ein anderer.

**Nicht geändert**

- `/ueber-mich` (`spotlight="left"`) und `/mitglieder/wissen` (`spotlight="right"`)
  bleiben unverändert. Auf `/ueber-mich` wirkt der Spotlight-Aufbau sehr gut.
- Mobil war der Blog-Hero nie betroffen.

---

## 2026-09-02 – Restliche Bild-Heroes geprüft, Wissen ebenfalls Spotlight

Alle vier Bild-Heroes durchgesehen und einheitlich bewertet:

- **/ueber-mich** – `spotlight="left"` (erledigt, siehe unten).
- **/blog** – `spotlight="right"` (erledigt, siehe unten).
- **/mitglieder/wissen** – jetzt **`spotlight="right"`** (`src/app/mitglieder/wissen/page.tsx`).
  Das warme, beleuchtete Bücherregal rechts wird freigestellt, der Text steht links –
  wirkt deutlich edler als der bisherige mittige, gleichmäßige Schleier.
- **/mitglieder/praxis** – **bewusst unverändert**. Das Motiv ist eine gestaltete
  Grafik mit **eingebrannter „PRAXIS"-Überschrift und Legende** (Atem, Achtsamkeit …)
  und wird per `lg:object-contain` ganz gezeigt. Ein Spotlight-Verlauf mit seitlicher
  Textspalte würde mit dem eingebrannten Titel/der Legende kollidieren – daher hier
  nicht sinnvoll.

Mobil (Bildband) bleibt bei allen unverändert.

---

## 2026-09-02 – „Über mich"-Hero auf Desktop kinematisch (wie Mitgliedschaft)

Auf Desktop wirkte der Hero der Seite **/ueber-mich** flach: Das ganze Motiv lag
unter einem gleichmäßigen Navy-Schleier (~85 %) und der Text stand mittig – das
schöne Heiko-Bild war kaum noch sichtbar. Die **Mitgliedschaftsseite** löst das
deutlich ansprechender (freigestelltes Motiv auf einer Seite, Textspalte auf der
Gegenseite, gerichteter Verlauf). **Mobil war bereits exzellent** (Bildband) und
bleibt unverändert.

**Neuer, optionaler Spotlight-Modus im `PageHero`**

- `src/components/layout/PageHero.tsx`: Neue Prop
  `spotlight?: "left" | "right"`. Wirkt **nur ab `lg`** und nur zusammen mit dem
  mobilen Bildband. Das Motiv wird auf der genannten Seite freigestellt (bleibt
  hell/sichtbar), der Text steht als schmale Spalte (`lg:max-w-xl`) auf der
  Gegenseite (rechts- bzw. linksbündig, mit weichem Text-Schatten). Darunter ein
  **gerichteter Navy-Verlauf** – am dunkelsten hinter dem Text, zum Motiv hin
  ausblendend. Die Farbstufen sind **bewusst identisch zur Mitgliedschaftsseite**,
  damit die Heroes über die Seite hinweg denselben Ton tragen. Hero minimal höher
  (`lg:min-h-[40rem]` statt `34rem`).
- `src/app/ueber-mich/page.tsx`: `spotlight="left"` gesetzt – Heiko sitzt am
  linken Bildrand, der Text steht rechts.

**Nicht geändert**

- Der mobile Aufbau (Bildband oben, Text zentriert darunter) ist unverändert.
- Alle anderen `PageHero`-Nutzungen ohne `spotlight` (Blog, Praxis, Wissen,
  Kontakt, Impressum, …) rendern exakt wie bisher – der Default-Aufbau blieb
  gleich (nur intern in einen inneren Flex-Container verschoben, optisch
  identisch).

---

## 2026-09-02 – Titelbild der Programm-Seite getauscht

Das Hero-Bild auf `/mitglieder/programm` (21 Tage Autopilot-Ausstieg) wurde
durch ein neues Motiv ersetzt.

**Neue Datei**

- `public/hero-programm.png` (1672×941) – neues Titelbild. (Hochgeladen als
  „ChatGPT Image Sep 2, 2026, 03_48_31 PM.png", zur sauberen Einbindung ohne
  Leerzeichen umbenannt.)

**Betroffene Stelle**

- `src/app/mitglieder/programm/page.tsx`: `heroImage` von
  `/hero-programm.webp` auf `/hero-programm.png` umgestellt.

**Details**

- Seitenverhältnis (1672 / 941) ist identisch zum bisherigen Bild; das mobile
  Bildband wird über `heroImageAspect` weiterhin automatisch aus der Datei
  gelesen (unterstützt PNG). Next.js `<Image>` optimiert das PNG zur Laufzeit.
- Die bisherige `public/hero-programm.webp` bleibt als ungenutzte Datei erhalten.

---

## 2026-09-02 – Logo im Header/Footer dezent vergrößert

Das Emblem war etwas zu klein. Größe zentral in `LogoMark`
(`src/components/visuals/Logo.tsx`) von `h-10` (40 px) auf `h-12` (48 px)
angehoben – wirkt in **Header** und **Footer** (beide nutzen dieselbe
Komponente). `sizes`-Hinweis entsprechend angepasst.

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
