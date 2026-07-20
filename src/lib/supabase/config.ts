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
 * Vorerst `false` → /mitglieder ist frei sichtbar (Vorschau ohne Anmeldung).
 * Auf `true` setzen, sobald Supabase aktiv ist, um den Zugang zu schützen.
 */
export const REQUIRE_MEMBER_LOGIN = false;
