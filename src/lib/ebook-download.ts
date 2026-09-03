import { createAdminClient } from "@/lib/supabase/admin";
import { site } from "@/lib/site";

/**
 * Zugangsprüfung für den direkten E-Book-Download (/ebook).
 *
 * Das E-Book ist der Lead-Magnet: es soll nur bekommen, wer seine E-Mail-Adresse
 * hinterlegt und per Double-Opt-in bestätigt hat. Früher lag das PDF unter
 * public/ und war zusätzlich unter /ebook ohne jede Prüfung abrufbar – beides
 * ließ die Lead-Erfassung ins Leere laufen.
 *
 * Als Token dient das bereits vorhandene `confirm_token` des Leads. Das spart
 * eine Migration und hat die gewünschten Eigenschaften: es ist pro Adresse
 * eindeutig, liegt der bestätigten Person ohnehin vor (sie kam über denselben
 * Token-Link), und /api/ebook erzeugt es bei einer erneuten Anfrage eines noch
 * offenen Leads neu – alte Download-Links verfallen damit automatisch mit.
 *
 * Bewusst NICHT verwendet wird das `unsubscribe_token`: ein weitergeleiteter
 * Download-Link würde sonst die Abmeldung Dritter erlauben.
 */
export async function isValidEbookToken(token: string | null): Promise<boolean> {
  if (!token) return false;

  const admin = createAdminClient();
  // Ohne Supabase gibt es keine Leads und damit keine gültigen Token. Dann
  // lieber gar nichts ausliefern, statt auf „offen für alle" zurückzufallen.
  if (!admin) return false;

  const { data, error } = await admin
    .from("ebook_leads")
    .select("status")
    .eq("confirm_token", token)
    .maybeSingle();

  if (error || !data) return false;
  return data.status === "confirmed";
}

/** Download-Link mit Token – für Liefermail und Bestätigungsseite. */
export function ebookDownloadUrl(token: string): string {
  return `${site.url}/ebook?token=${encodeURIComponent(token)}`;
}
