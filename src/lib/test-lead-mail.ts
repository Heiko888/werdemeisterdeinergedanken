import type { Resend } from "resend";
import { EBOOK_FROM } from "@/lib/ebook-mail";
import { getTestStage } from "@/lib/consciousness-test";
import { site } from "@/lib/site";

/**
 * Bestätigungsmail (Double-Opt-in) für Leads aus dem Bewusstseinstest.
 *
 * Gegenstück zu sendEbookConfirmationMail: gleiche Mechanik (Klick auf
 * /api/ebook/confirm bestätigt die Einwilligung), aber der Text verspricht
 * das, was die Person gerade erwartet – ihr Ergebnis samt Gratis-Kapitel.
 * Nach dem Klick leitet die Confirm-Route auf die Ergebnisseite weiter und
 * die Tag-0-Mail der Verkaufsstrecke (src/lib/sequences.ts) geht raus.
 */
export async function sendTestLeadConfirmationMail(
  resend: Resend,
  to: string,
  confirmUrl: string,
  stufe: number,
): Promise<void> {
  const stage = getTestStage(stufe);
  const stufenText = stage ? `Stufe ${stufe} – ${stage.name}` : `Stufe ${stufe}`;

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:34rem;margin:0 auto;padding:8px">
    <p style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#7a869a;margin:0 0 .5rem">${site.name}</p>
    <h1 style="font-size:22px;line-height:1.25;color:#141b2b;margin:0 0 1rem">Dein Ergebnis wartet 🌱</h1>
    <p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">
      danke, dass du den Bewusstseinstest gemacht hast. Dein Ergebnis: <strong>${stufenText}</strong>.
      Bitte bestätige kurz, dass diese E-Mail wirklich dir gehört – dann bekommst du
      die Auswertung und das Gratis-Kapitel zu deiner Stufe.
    </p>
    <p style="margin:1.5rem 0">
      <a href="${confirmUrl}" style="display:inline-block;background:#141b2b;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px">Bestätigen &amp; Ergebnis öffnen</a>
    </p>
    <p style="margin:0 0 1rem;font-size:14px;line-height:1.6;color:#5a657a">
      Falls sich der Button nicht öffnen lässt, kopiere diesen Link in deinen Browser:<br>
      <a href="${confirmUrl}" style="color:#5a657a;word-break:break-all">${confirmUrl}</a>
    </p>
    <hr style="border:none;border-top:1px solid #e6e9ef;margin:2rem 0 1rem">
    <p style="font-size:12px;line-height:1.5;color:#9aa4b5;margin:0">
      Du hast den Test auf ${site.url} gemacht. Falls nicht du das warst,
      ignoriere diese E-Mail einfach – ohne Bestätigung passiert nichts.
    </p>
  </div>`;

  const text = `Dein Ergebnis wartet.

Danke, dass du den Bewusstseinstest gemacht hast. Dein Ergebnis: ${stufenText}. Bitte bestätige kurz deine Anmeldung – dann bekommst du die Auswertung und das Gratis-Kapitel zu deiner Stufe:

${confirmUrl}

Du hast den Test auf ${site.url} gemacht. Falls nicht du das warst, ignoriere diese E-Mail einfach – ohne Bestätigung passiert nichts.

— Werde Meister deiner Gedanken`;

  const { error } = await resend.emails.send({
    from: EBOOK_FROM,
    to,
    subject: `Bitte bestätigen: dein Ergebnis (${stufenText})`,
    text,
    html,
  });
  if (error) throw error;
}
