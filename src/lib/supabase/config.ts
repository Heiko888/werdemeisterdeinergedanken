/**
 * Zentrale Supabase-Konfiguration.
 * Werte kommen aus den Umgebungsvariablen (.env.local bzw. Vercel).
 * Ohne gesetzte Variablen bleibt die Seite lauffähig – der Mitgliederbereich
 * zeigt dann einen Hinweis statt eines Fehlers.
 */
export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);

/**
 * Schalter für den Login-Schutz des Mitgliederbereichs.
 * `true` → /mitglieder ist nur nach Anmeldung erreichbar.
 */
export const REQUIRE_MEMBER_LOGIN = true;

/**
 * Selbst-Registrierung durch Besucher.
 * Vorerst `false` → geschlossener Bereich: nur „Anmelden“, keine Registrierung.
 * Zugänge werden von Hand in Supabase angelegt.
 * Auf `true` setzen, um die Registrierung für alle zu öffnen.
 */
export const ALLOW_SELF_REGISTRATION = false;

/**
 * Bezahlschranke für den Mitgliederbereich.
 * `false` (Standard) → /mitglieder ist nach Login für alle erreichbar
 *   (heutiges Verhalten – bricht bestehende Zugänge nicht).
 * `true` → zusätzlich zum Login ist eine aktive Stripe-Mitgliedschaft nötig;
 *   Admins (ADMIN_EMAILS) kommen immer rein. Erst umlegen, wenn der
 *   Stripe-Checkout live und getestet ist.
 */
export const REQUIRE_ACTIVE_MEMBERSHIP =
  process.env.REQUIRE_ACTIVE_MEMBERSHIP === "true";
