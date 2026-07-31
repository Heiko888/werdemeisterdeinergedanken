/**
 * Admin-Zugriff fürs Marketing-Cockpit (/admin).
 *
 * Wer Admin ist, steht in der Umgebungsvariable ADMIN_EMAILS
 * (kommagetrennt). Ohne Variable gilt die Haupt-Adresse als Admin.
 * Bewusst NICHT unter NEXT_PUBLIC_* – die Liste bleibt serverseitig.
 */
const raw = process.env.ADMIN_EMAILS ?? "heiko.schwaninger@gmail.com";

export const ADMIN_EMAILS = raw
  .split(",")
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export function isAdminEmail(email?: string | null): boolean {
  if (!email) return false;
  return ADMIN_EMAILS.includes(email.toLowerCase());
}
