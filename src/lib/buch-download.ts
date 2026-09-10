import { createHmac, timingSafeEqual } from "node:crypto";
import { site } from "@/lib/site";

/**
 * Signierter, zeitlich begrenzter Download-Link für die Buch-PDF.
 *
 * Stateless: Der Token trägt sein Ablaufdatum selbst und ist mit HMAC-SHA256
 * signiert – es braucht keine Datenbank. Nur wer nach dem Kauf die Liefermail
 * bekommen hat, besitzt einen gültigen Token; er verfällt nach ABLAUF_TAGE.
 *
 * Signatur-Geheimnis: `BUCH_DOWNLOAD_SECRET`, ersatzweise `STRIPE_WEBHOOK_SECRET`
 * (in Produktion ohnehin gesetzt). Ohne Geheimnis wird kein Link erzeugt und
 * die Verifikation schlägt fehl – die Mail fällt dann auf den PDF-Anhang zurück.
 */
const ABLAUF_TAGE = 30;

function secret(): string | null {
  return process.env.BUCH_DOWNLOAD_SECRET || process.env.STRIPE_WEBHOOK_SECRET || null;
}

function b64url(buf: Buffer): string {
  return buf.toString("base64url");
}

function sign(payload: string, key: string): string {
  return b64url(createHmac("sha256", key).update(payload).digest());
}

/**
 * Erzeugt einen Download-Token `<payload>.<signatur>`.
 * `payload` ist base64url-kodiertes JSON `{ exp }` (Unix-Sekunden).
 * Gibt `null` zurück, wenn kein Signatur-Geheimnis gesetzt ist.
 */
export function createBuchDownloadToken(ttlDays = ABLAUF_TAGE): string | null {
  const key = secret();
  if (!key) return null;
  const exp = Math.floor(Date.now() / 1000) + ttlDays * 24 * 60 * 60;
  const payload = b64url(Buffer.from(JSON.stringify({ exp })));
  return `${payload}.${sign(payload, key)}`;
}

/** Prüft Signatur (timing-safe) und Ablauf eines Download-Tokens. */
export function verifyBuchDownloadToken(token: string | null): boolean {
  if (!token) return false;
  const key = secret();
  if (!key) return false;

  const dot = token.indexOf(".");
  if (dot <= 0) return false;
  const payload = token.slice(0, dot);
  const signature = token.slice(dot + 1);

  const expected = sign(payload, key);
  const a = Buffer.from(signature);
  const b = Buffer.from(expected);
  if (a.length !== b.length || !timingSafeEqual(a, b)) return false;

  try {
    const { exp } = JSON.parse(Buffer.from(payload, "base64url").toString("utf8"));
    return typeof exp === "number" && exp > Math.floor(Date.now() / 1000);
  } catch {
    return false;
  }
}

/** Absolute Download-URL für die Liefermail. */
export function buchDownloadUrl(token: string): string {
  return `${site.url}/api/buch-download?token=${encodeURIComponent(token)}`;
}
