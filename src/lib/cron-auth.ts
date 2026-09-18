import { timingSafeEqual } from "crypto";

/**
 * Schutz der Cron-Routen (/api/impulses, /api/sequences) über CRON_SECRET:
 * Header `Authorization: Bearer <secret>` oder `?secret=<secret>`.
 * Ohne gesetztes Secret ist jeder Aufruf abgelehnt.
 */

/** Zeitkonstanter String-Vergleich – verhindert Timing-Rückschlüsse aufs Secret. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

export function cronAuthorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  if (header && safeEqual(header, `Bearer ${secret}`)) return true;
  const query = new URL(request.url).searchParams.get("secret");
  return query != null && safeEqual(query, secret);
}
