import type { Resend } from "resend";
import { getEbookPdfBytes } from "@/lib/pdf/ebook-file";
import { site } from "@/lib/site";

/**
 * Zentrale Bausteine für den E-Book-Versand (Bestätigungs- und Liefermail).
 * Wird von /api/ebook (Anfrage) und /api/ebook/confirm (Lieferung) genutzt,
 * damit Absender und Layout an einer Stelle gepflegt werden.
 */

export const EBOOK_FROM =
  process.env.EBOOK_FROM ||
  process.env.CONTACT_FROM ||
  "Werde Meister deiner Gedanken <onboarding@resend.dev>";

/** Rahmen-Layout für alle Mails – schlicht, inline-Styles wegen E-Mail-Clients. */
function shell(inner: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:34rem;margin:0 auto;padding:8px">
    <p style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#7a869a;margin:0 0 .5rem">${site.name}</p>
    ${inner}
  </div>`;
}

/**
 * Double-Opt-in: bittet um Bestätigung der Anmeldung. Erst der Klick auf
 * den Link löst die Lieferung des E-Books aus (DSGVO-konforme Einwilligung).
 */
export async function sendEbookConfirmationMail(
  resend: Resend,
  to: string,
  confirmUrl: string,
): Promise<void> {
  const html = shell(`
    <h1 style="font-size:22px;line-height:1.25;color:#141b2b;margin:0 0 1rem">Nur noch ein Schritt 🌱</h1>
    <p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">
      schön, dass du dein kostenloses E-Book <strong>„Die 7 Stufen der Bewusstseinsentwicklung"</strong>
      anfordern möchtest. Bitte bestätige kurz, dass diese E-Mail wirklich dir gehört –
      dann schicken wir dir dein Exemplar sofort zu.
    </p>
    <p style="margin:1.5rem 0">
      <a href="${confirmUrl}" style="display:inline-block;background:#141b2b;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px">Anmeldung bestätigen &amp; E-Book erhalten</a>
    </p>
    <p style="margin:0 0 1rem;font-size:14px;line-height:1.6;color:#5a657a">
      Falls sich der Button nicht öffnen lässt, kopiere diesen Link in deinen Browser:<br>
      <a href="${confirmUrl}" style="color:#5a657a;word-break:break-all">${confirmUrl}</a>
    </p>
    <hr style="border:none;border-top:1px solid #e6e9ef;margin:2rem 0 1rem">
    <p style="font-size:12px;line-height:1.5;color:#9aa4b5;margin:0">
      Du hast das E-Book auf ${site.url} angefordert. Falls nicht du das warst,
      ignoriere diese E-Mail einfach – ohne Bestätigung passiert nichts.
    </p>
  `);

  const text = `Nur noch ein Schritt.

Schön, dass du dein kostenloses E-Book „Die 7 Stufen der Bewusstseinsentwicklung" anfordern möchtest. Bitte bestätige kurz deine Anmeldung – dann schicken wir dir dein Exemplar sofort zu:

${confirmUrl}

Du hast das E-Book auf ${site.url} angefordert. Falls nicht du das warst, ignoriere diese E-Mail einfach – ohne Bestätigung passiert nichts.

— Werde Meister deiner Gedanken`;

  const { error } = await resend.emails.send({
    from: EBOOK_FROM,
    to,
    subject: "Bitte bestätige deine Anmeldung",
    text,
    html,
  });
  if (error) throw error;
}

/**
 * Liefert das E-Book als PDF-Anhang. Enthält einen 1-Klick-Abmeldelink
 * (DSGVO), falls ein Unsubscribe-Token vorhanden ist.
 */
export async function sendEbookDeliveryMail(
  resend: Resend,
  to: string,
  unsubscribeUrl?: string,
): Promise<void> {
  const pdf = getEbookPdfBytes();
  const downloadUrl = `${site.url}/ebook`;

  const unsubHtml = unsubscribeUrl
    ? `Du erhältst diese E-Mail, weil du das E-Book auf ${site.url} bestätigt hast.
       <a href="${unsubscribeUrl}" style="color:#9aa4b5">Abmelden</a>.`
    : `Du erhältst diese E-Mail, weil du das E-Book auf ${site.url} angefordert hast.`;

  const html = shell(`
    <h1 style="font-size:22px;line-height:1.25;color:#141b2b;margin:0 0 1rem">Dein E-Book ist da 🌱</h1>
    <p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">
      danke fürs Bestätigen. Im Anhang findest du dein kostenloses E-Book
      <strong>„Die 7 Stufen der Bewusstseinsentwicklung – Erste Übungen für mehr Klarheit"</strong>.
    </p>
    <p style="margin:0 0 1.25rem;font-size:16px;line-height:1.6;color:#2a3446">
      Mein Tipp: Nimm dir eine einzige Übung vor und bleib ein paar Tage dabei.
      Der Wandel entsteht nicht durch Wissen, sondern durch Wiederholung.
    </p>
    <p style="margin:1.5rem 0">
      <a href="${downloadUrl}" style="display:inline-block;background:#141b2b;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px">E-Book herunterladen</a>
    </p>
    <hr style="border:none;border-top:1px solid #e6e9ef;margin:2rem 0 1rem">
    <p style="font-size:12px;line-height:1.5;color:#9aa4b5;margin:0">${unsubHtml}</p>
  `);

  const text = `Dein E-Book ist da.

Danke fürs Bestätigen. Im Anhang findest du dein kostenloses E-Book „Die 7 Stufen der Bewusstseinsentwicklung – Erste Übungen für mehr Klarheit".

Mein Tipp: Nimm dir eine einzige Übung vor und bleib ein paar Tage dabei.

E-Book herunterladen: ${downloadUrl}

—
${unsubscribeUrl ? `Abmelden: ${unsubscribeUrl}` : ""}
Werde Meister deiner Gedanken`;

  const { error } = await resend.emails.send({
    from: EBOOK_FROM,
    to,
    subject: "Dein E-Book: Die 7 Stufen der Bewusstseinsentwicklung",
    text,
    html,
    attachments: [
      {
        filename: "Die-7-Stufen-der-Bewusstseinsentwicklung.pdf",
        content: Buffer.from(pdf),
      },
    ],
  });
  if (error) throw error;
}
