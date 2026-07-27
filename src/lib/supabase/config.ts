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
 * `true` → Besucher können sich selbst über /login (Tab „Registrieren“) anlegen,
 *          statt dass jeder Zugang von Hand in Supabase erstellt werden muss.
 *
 * ⚠️ Hinweis zum Zugriffsschutz: /mitglieder ist aktuell NUR „eingeloggt vs.
 * nicht eingeloggt“ geschützt (siehe src/proxy.ts) – es gibt keine Bezahl-/
 * Freigabe-Stufe. Jeder registrierte User sieht damit sofort ALLE Inhalte.
 * Für bezahlte Inhalte zusätzlich ein Freigabe-Gate ergänzen (z. B. ein
 * `approved`-Flag in `profiles`, das im Proxy/auf /mitglieder geprüft wird).
 *
 * Ob nach der Registrierung eine E-Mail-Bestätigung nötig ist, steuert die
 * Supabase-Projekteinstellung „Confirm email“ (dafür muss dort SMTP hinterlegt
 * sein, sonst greifen die strengen Rate-Limits des Default-Mailers).
 */
export const ALLOW_SELF_REGISTRATION = true;
