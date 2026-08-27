/**
 * E-Mail-Signatur im Marken-Look.
 *
 *   node tools/print/email-signatur.mjs      (oder: npm run signatur)
 *
 * Ausgabe → tools/print/out/
 *   WMDG-Email-Signatur.html          Anleitungsseite: gerenderte Signatur zum
 *                                     Markieren+Kopieren + der Roh-Quelltext
 *   WMDG-Email-Signatur-Snippet.html  Nur die Signatur (Tabelle) – für Editoren,
 *                                     die HTML direkt entgegennehmen (Outlook …)
 *   WMDG-Email-Signatur.txt           Nur-Text-Variante (Fallback)
 *   WMDG-Email-Signatur-Vorschau.png  Bildschirm-Vorschau
 *
 * E-Mail-tauglich gebaut: Tabellen-Layout, ausschließlich Inline-Styles,
 * websichere Schriften (Georgia ≈ Fraunces, Arial ≈ Inter), gehostetes Logo,
 * KEINE Verlaufsschrift (rendern viele Clients nicht) – stattdessen solide
 * Markenfarben. Farben AA-konform auf Weiß (Kap. 04).
 *
 * Quelle der Wahrheit: tools/print/marke.mjs (Kontakt + Farben).
 */
import { writeFileSync, existsSync, readdirSync, mkdirSync } from "node:fs";
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { CONTACT, C } from "./marke.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const OUT = join(HERE, "out");

// Gehostetes Logo (liegt unter public/, wird mit der Website ausgeliefert).
const LOGO_URL = `${CONTACT.webHref}/email/wmdg-signatur-logo.png`;
const telHref = "tel:" + CONTACT.phone.replace(/[^\d+]/g, "");

// Websichere Stacks (E-Mail-Clients laden keine eigenen Schriften).
const SERIF = "Georgia, 'Times New Roman', Times, serif";       // ≈ Fraunces
const SANS = "Arial, 'Helvetica Neue', Helvetica, sans-serif";  // ≈ Inter

// Eine Kontaktzeile (Label + Wert/Link).
function line(label, valueHtml) {
  return `<tr>
    <td style="padding:1px 0;font:400 13px/1.5 ${SANS};color:${C.inkMuted};white-space:nowrap;" valign="top">
      <span style="display:inline-block;width:34px;font:700 10px/1.5 ${SANS};letter-spacing:.10em;text-transform:uppercase;color:${C.inkMuted};">${label}</span>
      <span style="font:400 13px/1.5 ${SANS};color:${C.ink};">${valueHtml}</span>
    </td>
  </tr>`;
}
const a = (href, text, color) =>
  `<a href="${href}" style="color:${color};text-decoration:none;">${text}</a>`;

// Die eigentliche Signatur (reines Tabellen-Snippet, überall einbettbar).
function signature() {
  const telRow = CONTACT.phone
    ? line("Tel", a(telHref, CONTACT.phone, C.ink)) : "";
  return `<table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;font-family:${SANS};">
  <tr>
    <td valign="top" style="padding:0 16px 0 0;">
      <img src="${LOGO_URL}" width="72" height="72" alt="Werde Meister deiner Gedanken" style="display:block;width:72px;height:72px;border:0;outline:none;">
    </td>
    <td valign="top" style="padding:0 0 0 16px;border-left:3px solid ${C.teal};">
      <div style="font:700 18px/1.2 ${SERIF};color:${C.ink};">${CONTACT.name}</div>
      <div style="font:400 13px/1.4 ${SANS};color:${C.tealAA};padding-top:2px;">${CONTACT.role}</div>
      <table role="presentation" cellpadding="0" cellspacing="0" border="0" style="border-collapse:collapse;margin-top:9px;">
        ${telRow}
        ${line("Mail", a("mailto:" + CONTACT.email, CONTACT.email, C.greenAA))}
        ${line("Web", a(CONTACT.webHref, CONTACT.web, C.tealAA))}
        ${line("Insta", a(CONTACT.instagramHref, CONTACT.instagram, C.tealAA))}
      </table>
      <div style="font:700 10px/1.4 ${SANS};letter-spacing:.14em;text-transform:uppercase;color:${C.tealAA};padding-top:11px;">${CONTACT.brand} · ${CONTACT.tagline}</div>
    </td>
  </tr>
</table>`;
}

// Nur-Text-Variante.
function plain() {
  const lines = [
    CONTACT.name,
    CONTACT.role,
    "",
    CONTACT.phone ? "Tel:   " + CONTACT.phone : "",
    "Mail:  " + CONTACT.email,
    "Web:   " + CONTACT.web,
    "Insta: " + CONTACT.instagram,
    "",
    CONTACT.brand + " · " + CONTACT.tagline,
  ].filter((l) => l !== "" || true);
  return lines.join("\n").replace(/\n{3,}/g, "\n\n") + "\n";
}

// Anleitungsseite (Signatur gerendert + Quelltext zum Kopieren).
function page() {
  const sig = signature();
  const esc = (s) => s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
  return `<!doctype html><html lang="de"><head><meta charset="utf-8">
<title>WMDG · E-Mail-Signatur</title>
<style>
  body{margin:0;background:#e7e3d8;font:400 15px/1.6 ${SANS};color:${C.ink};padding:40px 24px;}
  .wrap{max-width:760px;margin:0 auto;}
  h1{font:600 24px/1.2 ${SERIF};color:${C.ink};margin:0 0 4px;}
  .lead{color:${C.inkMid};margin:0 0 28px;}
  .card{background:#fff;border-radius:16px;padding:28px 30px;box-shadow:0 10px 30px rgba(8,16,42,.12);margin-bottom:24px;}
  .card h2{font:700 12px/1.4 ${SANS};letter-spacing:.12em;text-transform:uppercase;color:${C.inkMuted};margin:0 0 16px;}
  pre{background:${C.paper};border:1px solid #e2ddd0;border-radius:10px;padding:16px;overflow-x:auto;font:400 12px/1.5 ui-monospace,Menlo,Consolas,monospace;color:#2a352f;white-space:pre-wrap;word-break:break-word;}
  ol{margin:0;padding-left:20px;color:${C.inkMid};} ol li{margin:6px 0;}
  code{background:${C.paper};padding:1px 5px;border-radius:5px;font:400 13px/1 ui-monospace,Menlo,Consolas,monospace;}
</style></head><body><div class="wrap">
  <h1>E-Mail-Signatur</h1>
  <p class="lead">Werde Meister deiner Gedanken · fertig zum Einsetzen in Gmail, Outlook &amp; Apple Mail.</p>

  <div class="card">
    <h2>Vorschau</h2>
    ${sig}
  </div>

  <div class="card">
    <h2>So setzt du sie ein</h2>
    <ol>
      <li><b>Gmail / Apple Mail:</b> die Signatur oben mit der Maus markieren, kopieren (⌘/Strg+C) und im Signatur-Editor einfügen (⌘/Strg+V).</li>
      <li><b>Outlook / HTML-Editoren:</b> den Quelltext unten verwenden (Datei <code>WMDG-Email-Signatur-Snippet.html</code>).</li>
      <li>Das Logo wird von <code>${LOGO_URL}</code> geladen – erst nach dem nächsten Website-Deploy erreichbar. Bis dahin zeigt die Vorschau ggf. ein leeres Bild.</li>
    </ol>
  </div>

  <div class="card">
    <h2>Quelltext (HTML)</h2>
    <pre>${esc(sig)}</pre>
  </div>
</div></body></html>`;
}

// ---------- Ausgabe ---------------------------------------------------------
mkdirSync(OUT, { recursive: true });
writeFileSync(join(OUT, "WMDG-Email-Signatur.html"), page());
writeFileSync(join(OUT, "WMDG-Email-Signatur-Snippet.html"),
  `<!doctype html><html><head><meta charset="utf-8"></head><body>\n${signature()}\n</body></html>`);
writeFileSync(join(OUT, "WMDG-Email-Signatur.txt"), plain());
console.log("✓ WMDG-Email-Signatur.html");
console.log("✓ WMDG-Email-Signatur-Snippet.html");
console.log("✓ WMDG-Email-Signatur.txt");

// ---------- Vorschau-PNG (Playwright) ---------------------------------------
const require = createRequire(import.meta.url);
function findChrome() {
  if (process.env.CHROME_BIN && existsSync(process.env.CHROME_BIN)) return process.env.CHROME_BIN;
  try { const p = require("playwright").chromium.executablePath(); if (p && existsSync(p)) return p; } catch {}
  for (const r of [process.env.PLAYWRIGHT_BROWSERS_PATH, "/opt/pw-browsers"].filter(Boolean)) {
    try { for (const d of readdirSync(r)) { if (d.startsWith("chromium")) { const p = join(r, d, "chrome-linux/chrome"); if (existsSync(p)) return p; } } } catch {}
  }
  throw new Error("Kein Chromium/Chrome gefunden. Führe aus:  npx playwright install chromium");
}
const { chromium } = require("playwright");
const browser = await chromium.launch({ executablePath: findChrome() });
const pg = await browser.newPage({ viewport: { width: 620, height: 260 }, deviceScaleFactor: 2 });
// Für die Vorschau das lokale, optimierte Logo als data-URI einbetten
// (setContent-Origin ist about:blank; von dort blockt Chromium file://-Bilder).
const { readFileSync } = await import("node:fs");
const localLogo = "data:image/png;base64," +
  readFileSync(join(HERE, "..", "..", "public/email/wmdg-signatur-logo.png")).toString("base64");
await pg.setContent(
  `<div style="background:#ffffff;padding:28px 30px;display:inline-block;">${signature().replace(LOGO_URL, localLogo)}</div>`,
  { waitUntil: "networkidle" });
const box = await pg.$eval("table", (el) => { const r = el.parentElement.getBoundingClientRect(); return { w: Math.ceil(r.width), h: Math.ceil(r.height) }; });
await pg.setViewportSize({ width: box.w, height: box.h });
await pg.screenshot({ path: join(OUT, "WMDG-Email-Signatur-Vorschau.png") });
console.log("✓ WMDG-Email-Signatur-Vorschau.png");
await browser.close();
console.log("\nFertig →", OUT);
