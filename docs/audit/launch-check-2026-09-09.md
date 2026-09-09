# Launch-Check „Werde Meister deiner Gedanken" – 2026-09-09

Gebündelte Vor-Launch-Prüfung durch mehrere spezialisierte Agenten (Inhalt,
Technik, Design/Hero) plus Architektur-Analyse der KI-Funktionen. Ziel: die
letzten Feinheiten vor dem Go-live sichtbar und priorisiert machen.

**Gesamtbild:** Die Seite ist technisch und inhaltlich deutlich weiter als
„98 %". Kein technischer Launch-Blocker. Die offenen Punkte sind vor allem
**Content-Entscheidungen** (Preis, Videos) und **visueller Feinschliff** (Hero).

Einzelberichte:
- Design/Hero-Detailbericht: `docs/design/design-check-2026-09-09.md`
- Frühere Audits: `docs/audit/seiten-check-2026-08-19.md`,
  `docs/audit/mitgliederbereich-ux-audit-2026-08-26.md`

---

## 🔴 Vor Go-live entscheiden (Blocker im Sinne von „nicht so live gehen")

### B1 – Mitgliedschaftspreis ist ein Code-Platzhalter
`src/app/mitgliedschaft/page.tsx:23-38` – Kommentar: *„Preis-Platzhalter – vor
dem Livegang durch das echte Modell ersetzen."* Angezeigt werden **49 €/Monat**
bzw. **490 €/Jahr** als hartcodierter Text. Die Stripe-Preis-IDs kommen sauber
aus Env-Variablen, aber der **angezeigte Betrag** ist unabhängig davon.
→ Sicherstellen, dass der angezeigte Preis exakt dem in Stripe hinterlegten
Preis entspricht. Sonst Diskrepanz zwischen Anzeige und Abbuchung.

### B2 – Fast alle Mitglieder-Videos zeigen dasselbe Platzhalter-Video
`src/lib/site.ts:34` (`placeholderVideoId: "gOvtKBnqGvk"`). Betroffen:
7/7 Stufen-Lektionen, 29/29 Vertiefungen, 13/14 Praxis-Übungen (`video: null`).
Hinter individuell gebrandeten Thumbnails läuft überall derselbe Clip. Der
ehrliche „folgt in Kürze"-Zustand ist im Code vorhanden, wird aber nie gezeigt.
→ Entweder echte Videos (mind. die 7 Stufen) hinterlegen **oder**
`placeholderVideoId: null` setzen, damit ehrlich „folgt in Kürze" erscheint.

### B3 – Persönliche Videobotschaft auf der Startseite ist der Platzhalter
`src/lib/site.ts:26` (`videoMessage.youtubeId: null`) →
`src/components/sections/MaybeNotYou.tsx`. Die Sektion „Ein anderer Blickwinkel"
wird als persönliche Videobotschaft von Heiko beworben, spielt aber das
generische Platzhalter-Video. Öffentlich, prominent.
→ Echtes Video eintragen **oder** den vorhandenen „folgt in Kürze"-Zustand
zeigen (Codepfad existiert in `MaybeNotYou.tsx:58-64`).

---

## 🟠 Wichtig (vor Launch klären / beheben)

### W1 – Hero wirkt zu dunkel (deine Hauptfrage)
`src/components/sections/Hero.tsx`, `src/lib/gradients.ts:11`.
`--color-navy-900` (`#0f1218`) ist praktisch Schwarz; nur zwei schwache
Gold-Radialverläufe (20–22 % Deckkraft) hellen punktuell auf. Zentrum und
unterer Bereich bleiben flächig fast-schwarz. Darüber ein rein weißer Header →
harter Bruch beim Scrollen.
→ `HERO_GLOW`-Deckkraft und Oberlicht (`Hero.tsx:34`) anheben, optional Hero-Grund
auf `navy-850` aufhellen. **Vor Commit per Screenshot (mobil + Desktop) prüfen** –
Opacity-Werte wirken am Bildschirm anders als im Code.

### W2 – Porträt-Glow deckt nur den Kopf ab
`Hero.tsx:52-59`. Schulter/Oberkörper (dunkles T-Shirt) verschmelzen mit dem
Navy-Grund, ein großer Teil des Bildes „verschwindet".
→ Zweite, breitere Glow-Ellipse für den Oberkörper ergänzen.

### W3 – Uneinheitliche Section-Überschriften (Desktop)
H2-Größen springen zwischen 36px und 48px: `Compass.tsx:37`, `WhyMe.tsx:22`,
`LeadMagnet.tsx:31` vs. `SectionHeading.tsx:58` vs. `MaybeNotYou.tsx:32` /
`FinalCta.tsx:20`. Stärkster „nicht aus einem Guss"-Effekt der Startseite.
→ Auf eine gemeinsame Überschriftengröße vereinheitlichen.

### W4 – Teal-Schatten im goldenen Hero-Badge
`Hero.tsx:75` (`rgba(52,196,196,.5)`) widerspricht der dokumentierten
„nur Gold"-Doktrin (`gradients.ts:6`).
→ Auf Gold-Schatten umstellen.

### W5 – Halbe Blog-Kategorie deaktiviert – Absicht bestätigen
`src/lib/blog.ts:1779-1786`: Kategorie „Mentale Selbstverteidigung" zentral
deaktiviert → **16 von 29** fertig geschriebenen Artikeln erscheinen nirgends
(nicht in Übersicht/RSS/Sitemap, direkte URL = 404). Die zugehörigen
Vertiefungen im Mitgliederbereich bleiben erreichbar.
→ Klären: gewollt (z. B. sensibler Content) oder versehentlich? Falls gewollt,
sicherstellen, dass nichts auf die 404-Slugs verweist.

### W6 – `npm run lint` schlägt fehl (3 Fehler)
- `src/components/ui/VideoMessage.tsx:56` – `set-state-in-effect`
- `src/app/admin/marken-uebersicht/page.tsx:200` und `:317` – nicht-escapte `"`
Der `next build` läuft trotzdem grün (kein Lint-Gate im Build). Falls eine
CI-Pipeline `npm run lint` als Gate nutzt, blockiert das den Deploy.

### W7 – Next.js-Sicherheitsupdate
`npm audit`: `next@16.2.10` als „critical" markiert (u. a. SSRF in Server
Actions, DoS Image-Optimization). Fix: Update auf `next@16.3.x` + Test.

---

## 🟡 Nice-to-have / Feinschliff

- **N1** – Crop-Risiko Kompass-Bild (`Compass`): 16:9-Quelle in 4:3-Rahmen ohne
  `object-position` – gegenprüfen.
- **N2** – `robots.ts:13` deckt `/admin` nicht ab (praktisch unkritisch, aber
  inkonsistent zu `/mitglieder`).
- **N3** – Zweites Buch-PDF `content/pdf/Werde-Meister-deiner-Gedanken.pdf` wird
  nirgends eingebunden – bewusst zurückgehalten oder fehlt ein Verkaufsschritt?
- **N4** – Offene TODOs in `src/lib/site.ts:41` (Telegram-Link),
  auskommentierte `Creed`-Sektion in `src/app/page.tsx:6,21`.
- **N5** – Kein eigenes `favicon.ico` (nur `icon.png`; Next.js generiert daraus).
- **N6** – `AGENTS.md` verweist auf `node_modules/next/dist/docs/`, den es nicht
  gibt – irreführend, Text aufräumen.

---

## Ausbau-Ideen (nach dem Launch): KI-Spiegel, Chat & Profil

Datenfluss **heute**: Test + Journal → Gedankenprofil → gelesen von Reading,
Begleiter-Chat, Muster-Spiegel. Der Chat **kennt** Profil + letzte 8
Journal-Einträge (`src/lib/begleiter-prompt.ts`), aber **nichts fließt zurück**
aus dem Chat ins Profil. Genau diese Rückrichtung ist der natürliche nächste
Ausbauschritt:

1. **„Ins Profil übernehmen"-Button im Chat** – eine Begleiter-Erkenntnis als
   Notiz ins Journal/Profil speichern. Kleiner Eingriff, passt zur bewussten
   „nur auf Klick"-Einwilligungslogik.
2. **Muster-Spiegel auch aus Chat-Verläufen** – der Verlauf liegt bereits in
   Supabase und könnte optional einbezogen werden (heute nur Journal).
3. **Lebendiges Profil** – kuratierter Freitext „Was ich über mich gelernt
   habe", gespeist aus Chat/Journal.

Die Grundlage (Server-Actions, Supabase-Verlauf, Modell-Fallback in
`src/lib/ki-modell.ts`) ist sauber gebaut – gut nachrüstbar, **kein
Launch-Blocker**.

---

## Was bereits gut ist (kein Handlungsbedarf)

- Inhalte vollständig: 7 Stufen, 14 Praxis, 29 Vertiefungen, 27 WD-Kapitel,
  29 Blog-Artikel, alle PDFs vorhanden und korrekt verlinkt.
- Rechtstexte echt befüllt (Impressum, Datenschutz), keine Muster-Platzhalter.
- Bewusstseinstest logisch lückenlos (21 Fragen, 7 Auswertungen).
- Build sauber (Next.js 16, 129 Seiten), keine toten internen Links,
  Mitglieder-/Admin-Seiten konsequent `noindex`, `generateStaticParams`
  durchgängig synchron zu den Datenquellen.
</content>
</invoke>
