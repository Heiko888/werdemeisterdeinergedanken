/**
 * Ratenbegrenzung für öffentliche API-Routen (Kontakt, E-Book, Klarheitsgespräch).
 *
 * Bevorzugt einen GEMEINSAMEN Speicher in Supabase (Fixed-Window-Zähler über die
 * DB-Funktion `rate_limit_hit`, Migration `…_rate_limits.sql`). So wirkt das
 * Limit auch bei mehreren Instanzen und übersteht einen Neustart.
 *
 * Fällt der DB-Weg aus (kein Service-Role-Key, fehlende Funktion, Fehler), greift
 * ein In-Memory-Fallback pro Prozess – dasselbe Verhalten wie zuvor. Das Limit
 * wird dadurch nie schlechter als bisher, im Normalfall aber verteilt.
 */
import { createAdminClient } from "@/lib/supabase/admin";

// --- In-Memory-Fallback (pro Prozess) ---------------------------------------
const memoryHits = new Map<string, number[]>();

function memoryLimited(key: string, max: number, windowMs: number): boolean {
  const now = Date.now();
  const recent = (memoryHits.get(key) ?? []).filter((t) => now - t < windowMs);
  recent.push(now);
  memoryHits.set(key, recent);
  // Notbremse gegen unbegrenztes Wachstum der Map.
  if (memoryHits.size > 5000) memoryHits.clear();
  return recent.length > max;
}

/**
 * Registriert einen Treffer und meldet, ob das Limit ÜBERSCHRITTEN ist
 * (`true` = blockieren). `bucket` trennt die Zähler je Route
 * (z. B. "kontakt"), `ident` ist meist die IP.
 */
export async function isRateLimited(
  bucket: string,
  ident: string,
  max: number,
  windowMs: number,
): Promise<boolean> {
  const admin = createAdminClient();
  if (admin) {
    try {
      const { data, error } = await admin.rpc("rate_limit_hit", {
        p_bucket: bucket,
        p_ident: ident,
        p_max: max,
        // Postgres-Interval-Literal, z. B. "600 seconds".
        p_window: `${Math.round(windowMs / 1000)} seconds`,
      });
      if (!error && typeof data === "boolean") {
        // Die Funktion gibt `allowed` zurück → limitiert ist das Gegenteil.
        return !data;
      }
    } catch {
      // Fällt unten auf den In-Memory-Fallback zurück.
    }
  }
  return memoryLimited(`${bucket}:${ident}`, max, windowMs);
}

/**
 * Client-IP aus den Proxy-Headern. `x-real-ip` setzt unser nginx zuverlässig
 * (nicht fälschbar); `x-forwarded-for` ist client-manipulierbar, daher nur der
 * letzte (proxy-nächste) Eintrag als Fallback.
 */
export function clientIp(request: Request): string {
  const xff = request.headers.get("x-forwarded-for");
  const xffLast = xff?.split(",").pop()?.trim();
  return request.headers.get("x-real-ip") || xffLast || "unknown";
}
