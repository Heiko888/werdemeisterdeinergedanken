/**
 * Anleitung „Stripe-Mitgliedschaft einrichten" → ein gebrandetes PDF.
 * Reines HTML→Chromium (print-to-pdf), keine Zusatz-Tools.
 *
 *   node tools/pdf/anleitung-stripe.mjs [ausgabe-verzeichnis]
 *
 * Standard-Ausgabe: docs/workshop/anleitungen/ (→ Vorlagen-Galerie nimmt das
 * PDF im Workshop-Tab automatisch auf).
 */
import { readFileSync, writeFileSync, existsSync, readdirSync, rmSync, mkdirSync } from "node:fs";
import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, "..", "..");
const OUT_DIR = process.argv[2] || join(ROOT, "docs", "workshop", "anleitungen");

function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try {
      for (const d of readdirSync(r)) {
        if (!d.startsWith("chromium")) continue;
        for (const bin of ["chrome-linux/chrome", "chrome-mac/Chromium.app/Contents/MacOS/Chromium", "chrome-win/chrome.exe"]) {
          const p = join(r, d, bin);
          if (existsSync(p)) return p;
        }
      }
    } catch {}
  }
  for (const c of ["google-chrome", "google-chrome-stable", "chromium", "chromium-browser"]) {
    const r = spawnSync(process.platform === "win32" ? "where" : "which", [c], { encoding: "utf8" });
    if (r.status === 0) return r.stdout.trim().split("\n")[0];
  }
  throw new Error("Kein Chromium/Chrome gefunden (CHROME_BIN setzen).");
}

const fontsCss = readFileSync(join(ROOT, "docs", "reels", "covers", "_fonts.css"), "utf8");
const logoUri = `data:image/png;base64,${readFileSync(join(ROOT, "docs", "reels", "covers", "logo.png")).toString("base64")}`;
const DATE = new Date().toISOString().slice(0, 10);

const STYLE = `
${fontsCss}
:root{ --ink:#1a2230; --mid:#4b5769; --muted:#8b96a6; --leaf:#6aab24; --teal:#199aa8; }
@page{ size:A4; margin:18mm 16mm; }
*{ box-sizing:border-box; }
body{ margin:0; font-family:'Inter',system-ui,sans-serif; color:var(--ink); font-size:11pt; line-height:1.5; }
.cover{ height:261mm; display:flex; flex-direction:column; align-items:center; justify-content:center; text-align:center; page-break-after:always; }
.cover img{ width:150px; margin-bottom:26px; }
.brow{ font-size:11pt; font-weight:800; letter-spacing:.2em; text-transform:uppercase; color:var(--teal); margin-bottom:10px; }
.cover h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:30pt; margin:0 0 8px; border:0; line-height:1.1; }
.cover p{ color:var(--mid); font-size:12pt; margin:2px 0; }
h1{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:20pt; margin:0 0 4mm; padding-bottom:2.5mm;
  border-bottom:2px solid; border-image:linear-gradient(90deg,#8cc63f,#21b2bd) 1; }
h2{ font-family:'Fraunces',Georgia,serif; font-weight:600; font-size:14pt; margin:7mm 0 2mm; color:#12324a; }
p{ margin:0 0 2.5mm; }
ol,ul{ margin:1mm 0 3mm 5mm; } li{ margin:1mm 0; }
code,.env{ font-family:'DejaVu Sans Mono',ui-monospace,Menlo,Consolas,monospace; font-size:9.5pt; }
code{ background:#eef2f7; padding:.4mm 1.4mm; border-radius:3px; color:#0f3a4d; }
.env{ display:block; background:#0b1a2b; color:#dbe7f2; border-radius:7px; padding:4mm 5mm; margin:2mm 0 4mm; white-space:pre; font-size:9pt; line-height:1.6; }
.env b{ color:#a3d64f; font-weight:600; }
table{ width:100%; border-collapse:collapse; font-size:9.5pt; margin:2mm 0 4mm; }
th,td{ border:1px solid #e0e7f0; padding:1.8mm 2.4mm; text-align:left; vertical-align:top; }
th{ background:#eef4f5; font-weight:700; }
.note{ break-inside:avoid; background:#fff7ed; border:1px solid #f2d5a8; border-left:4px solid #e0912f;
  border-radius:7px; padding:3.5mm 4.5mm; margin:3mm 0; }
.note b{ color:#9a5a0c; }
.tip{ background:#eef7ee; border:1px solid #cfe6c7; border-left:4px solid var(--leaf); border-radius:7px; padding:3.5mm 4.5mm; margin:3mm 0; }
.step{ break-inside:avoid; }
strong{ font-weight:700; }`;

const BODY = `
<h1>In Kürze</h1>
<p>Der Code für die Bezahl-Mitgliedschaft ist fertig. Nach dieser Anleitung
entstehen alle Zugänge automatisch über den Checkout – niemand muss mehr ein
Konto von Hand anlegen. Modell: <strong>„Bezahlen zuerst"</strong> mit
<strong>Monats- (49 €) und Jahresabo (490 €, 2 Monate gratis)</strong>.</p>

<div class="tip"><b>Reihenfolge:</b> Erst im <b>Testmodus</b> alles einrichten und
mit der Testkarte durchspielen. Läuft es, auf Live-Keys umstellen und die
Bezahlschranke scharfschalten.</div>

<div class="note"><b>Sicherheit:</b> Geheime Schlüssel (<code>sk_…</code>,
<code>whsec_…</code>) gehören ausschließlich in die Umgebungsvariablen deines
Hostings – niemals in E-Mails, Chats oder ins Repository.</div>

<h1>1 · Produkt & zwei Preise anlegen</h1>
<div class="step">
<ol>
  <li>Stripe-Dashboard oben rechts in den <strong>Testmodus</strong> schalten.</li>
  <li><strong>Mehr → Produktkatalog → + Produkt hinzufügen</strong>.</li>
  <li>Name: <strong>Mitgliedschaft</strong>.</li>
  <li>Preis 1: <strong>49 €</strong> · <strong>Wiederkehrend</strong> · Intervall <strong>Monatlich</strong> → speichern.</li>
  <li>Am selben Produkt: <strong>+ weiteren Preis</strong> → <strong>490 €</strong> · <strong>Wiederkehrend</strong> · Intervall <strong>Jährlich</strong> → speichern.</li>
  <li>Bei jedem Preis: <strong>⋯ → ID kopieren</strong> (beginnt mit <code>price_…</code>).</li>
</ol>
</div>
<table>
  <thead><tr><th>Preis</th><th>Env-Variable</th></tr></thead>
  <tbody>
    <tr><td>49 € / Monat</td><td><code>STRIPE_PRICE_ID</code></td></tr>
    <tr><td>490 € / Jahr</td><td><code>STRIPE_PRICE_ID_YEARLY</code></td></tr>
  </tbody>
</table>
<p>Die Jahres-Option erscheint auf der Website nur, wenn
<code>STRIPE_PRICE_ID_YEARLY</code> gesetzt ist – sonst läuft alles über das
Monatsabo (kein toter Button).</p>

<h1>2 · API-Schlüssel</h1>
<ol>
  <li><strong>Entwickler → API-Schlüssel</strong>.</li>
  <li><strong>Geheimer Schlüssel</strong> kopieren (<code>sk_test_…</code> im Testmodus) → <code>STRIPE_SECRET_KEY</code>.</li>
</ol>

<h1>3 · Webhook</h1>
<ol>
  <li><strong>Entwickler → Webhooks → Endpunkt hinzufügen</strong>.</li>
  <li>URL: <code>https://www.werdemeisterdeinergedanken.de/api/stripe/webhook</code></li>
  <li>Events auswählen:
    <ul>
      <li><code>checkout.session.completed</code></li>
      <li><code>customer.subscription.updated</code></li>
      <li><code>customer.subscription.deleted</code></li>
    </ul>
  </li>
  <li>Nach dem Anlegen das <strong>Signing secret</strong> kopieren (<code>whsec_…</code>) → <code>STRIPE_WEBHOOK_SECRET</code>.</li>
</ol>

<h1>4 · Umgebungsvariablen setzen</h1>
<p>Im Hosting (z. B. Vercel → Settings → Environment Variables) eintragen:</p>
<span class="env"><b>STRIPE_SECRET_KEY</b>=sk_test_…
<b>STRIPE_PRICE_ID</b>=price_…            # 49 €/Monat
<b>STRIPE_PRICE_ID_YEARLY</b>=price_…     # 490 €/Jahr
<b>STRIPE_WEBHOOK_SECRET</b>=whsec_…
<b>SUPABASE_SERVICE_ROLE_KEY</b>=…        # fürs Freischalten des Zugangs
<b>RESEND_API_KEY</b>=re_…               # für die Passwort-Mail
<b>MEMBERSHIP_FROM</b>=Werde Meister deiner Gedanken &lt;mail@deine-domain.de&gt;   # optional</span>
<p>Danach die Supabase-Migration <code>supabase/migrations/0007_membership.sql</code>
im Supabase-SQL-Editor ausführen (legt die Tabelle <code>memberships</code> mit
aktivem RLS an).</p>

<h1>5 · Testlauf (Testmodus)</h1>
<ol>
  <li>Auf <code>/mitgliedschaft</code> ein Abo wählen → Checkout.</li>
  <li>Testkarte <strong>4242 4242 4242 4242</strong>, beliebiges künftiges Datum, beliebige CVC/PLZ.</li>
  <li>Prüfen: In Supabase steht in <code>memberships</code> ein Eintrag mit Status <strong>active</strong>.</li>
  <li>Prüfen: Die <strong>Passwort-setzen-Mail</strong> kommt an (über Resend).</li>
  <li>Über den Link Passwort setzen → Login → Zugang zum Mitgliederbereich.</li>
</ol>
<div class="note"><b>Kommt keine Mail?</b> Dann fehlt meist <code>RESEND_API_KEY</code>
oder die Absender-Domain ist bei Resend noch nicht verifiziert (ohne
Verifizierung sendet Resend nur an die eigene Konto-Adresse).</div>

<h1>6 · Live schalten</h1>
<ol>
  <li>In Stripe auf <strong>Live-Modus</strong> wechseln und Produkt/Preise/Webhook dort (oder per „Kopieren nach Live") anlegen.</li>
  <li>Die <strong>Live-Keys</strong> (<code>sk_live_…</code>, Live-<code>price_…</code>, Live-<code>whsec_…</code>) in die Env eintragen.</li>
  <li>Bezahlschranke aktivieren: <code>REQUIRE_ACTIVE_MEMBERSHIP=true</code> setzen. Ab jetzt kommt man nur mit aktivem Abo (Admins immer) in <code>/mitglieder</code>.</li>
</ol>

<h1>Kurz-Checkliste</h1>
<table>
  <thead><tr><th>Schritt</th><th>Ergebnis</th></tr></thead>
  <tbody>
    <tr><td>Produkt + 2 Preise</td><td>price-IDs (Monat + Jahr)</td></tr>
    <tr><td>API-Schlüssel</td><td>sk_…</td></tr>
    <tr><td>Webhook</td><td>whsec_…</td></tr>
    <tr><td>Env + Migration</td><td>alles gesetzt, Tabelle da</td></tr>
    <tr><td>Testlauf</td><td>„active" + Passwort-Mail</td></tr>
    <tr><td>Live + Schranke</td><td>REQUIRE_ACTIVE_MEMBERSHIP=true</td></tr>
  </tbody>
</table>
`;

const html = `<!doctype html><html lang="de"><head><meta charset="utf-8"><title>Anleitung · Stripe-Mitgliedschaft</title>
<style>${STYLE}</style></head><body>
<div class="cover">
  <img src="${logoUri}" alt="Logo">
  <div class="brow">Werde Meister deiner Gedanken</div>
  <h1>Stripe-Mitgliedschaft<br>einrichten</h1>
  <p>Self-Service „Bezahlen zuerst" · Monats- &amp; Jahresabo</p>
  <p>Schritt-für-Schritt-Anleitung · Stand ${DATE}</p>
</div>
${BODY}
</body></html>`;

mkdirSync(OUT_DIR, { recursive: true });
const out = join(OUT_DIR, "WMDG-Anleitung-Stripe-Mitgliedschaft.pdf");
const tmp = join(HERE, ".anleitung-stripe.html");
writeFileSync(tmp, html);
const r = spawnSync(findChrome(), [
  "--headless=new", "--no-sandbox", "--disable-gpu", "--no-pdf-header-footer",
  `--print-to-pdf=${out}`, tmp,
], { stdio: "ignore" });
if (!process.env.KEEP_HTML) rmSync(tmp, { force: true });
if (r.status !== 0 || !existsSync(out)) throw new Error("PDF-Render fehlgeschlagen");
console.log(`✓ ${out}`);
