import type { Resend } from "resend";
import { getBuchPdfBytes, BUCH_FILE_NAME } from "@/lib/pdf/buch-file";
import { site } from "@/lib/site";

/**
 * Mail-Bausteine für den Buch-Kauf (siehe /api/stripe/webhook):
 *   • PDF-Edition  → Liefermail mit dem Buch als PDF-Anhang.
 *   • gedruckte Edition → Bestellbestätigung (Versand erfolgt manuell).
 *
 * Absender und Layout an einer Stelle gepflegt, analog zu src/lib/ebook-mail.ts.
 */

export const BUCH_FROM =
  process.env.BUCH_FROM ||
  process.env.EBOOK_FROM ||
  process.env.CONTACT_FROM ||
  "Werde Meister deiner Gedanken <onboarding@resend.dev>";

/** Rahmen-Layout für alle Mails – inline-Styles wegen E-Mail-Clients. */
function shell(inner: string): string {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:34rem;margin:0 auto;padding:8px">
    <p style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#7a869a;margin:0 0 .5rem">${site.name}</p>
    ${inner}
  </div>`;
}

/**
 * Liefert das gekaufte Buch als PDF (Edition „pdf").
 * Wird nach erfolgreicher Zahlung vom Stripe-Webhook aufgerufen.
 *
 * Zustellung doppelt abgesichert: PDF als Anhang UND – sofern ein signierter
 * Download-Link übergeben wird – ein zeitlich begrenzter Download-Button (für
 * den Fall, dass der Anhang beim Mailanbieter an Größengrenzen scheitert).
 */
export async function sendBuchPdfMail(
  resend: Resend,
  to: string,
  downloadUrl?: string | null,
): Promise<void> {
  const pdf = getBuchPdfBytes();

  const downloadHtml = downloadUrl
    ? `<p style="margin:1.5rem 0">
      <a href="${downloadUrl}" style="display:inline-block;background:#141b2b;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px">Buch als PDF herunterladen</a>
    </p>
    <p style="margin:0 0 1rem;font-size:13px;line-height:1.6;color:#5a657a">
      Der Download-Link ist 30 Tage gültig. Alternativ hängt das PDF direkt an
      dieser E-Mail.
    </p>`
    : "";

  const html = shell(`
    <h1 style="font-size:22px;line-height:1.25;color:#141b2b;margin:0 0 1rem">Dein Buch ist da 🌱</h1>
    <p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">
      vielen Dank für deinen Kauf! Hier ist dein Exemplar von
      <strong>„Werde Meister deiner Gedanken"</strong> als PDF – zum Lesen am
      Computer, Tablet oder Smartphone.
    </p>
    ${downloadHtml}
    <p style="margin:0 0 1.25rem;font-size:16px;line-height:1.6;color:#2a3446">
      Mein Tipp: Lies in deinem Tempo, Kapitel für Kapitel. Der Wandel entsteht
      nicht durch Wissen, sondern durch Wiederholung.
    </p>
    <hr style="border:none;border-top:1px solid #e6e9ef;margin:2rem 0 1rem">
    <p style="font-size:12px;line-height:1.5;color:#9aa4b5;margin:0">
      Du erhältst diese E-Mail, weil du das Buch auf ${site.url} gekauft hast.
      Sollte etwas nicht stimmen, antworte einfach auf diese E-Mail – wir kümmern
      uns persönlich.
    </p>
  `);

  const text = `Dein Buch ist da.

Vielen Dank für deinen Kauf! Hier ist dein Exemplar von „Werde Meister deiner Gedanken" als PDF – zum Lesen am Computer, Tablet oder Smartphone.
${downloadUrl ? `\nBuch als PDF herunterladen (Link 30 Tage gültig):\n${downloadUrl}\n` : ""}
Das PDF hängt außerdem direkt an dieser E-Mail.

Mein Tipp: Lies in deinem Tempo, Kapitel für Kapitel.

Du erhältst diese E-Mail, weil du das Buch auf ${site.url} gekauft hast. Fragen? Antworte einfach auf diese E-Mail.

— Werde Meister deiner Gedanken`;

  const { error } = await resend.emails.send({
    from: BUCH_FROM,
    to,
    subject: "Dein Buch: Werde Meister deiner Gedanken (PDF)",
    text,
    html,
    attachments: [{ filename: BUCH_FILE_NAME, content: Buffer.from(pdf) }],
  });
  if (error) throw error;
}

/**
 * Bestellbestätigung für die gedruckte Edition (Edition „print").
 * Der Versand selbst erfolgt manuell über das Stripe-Dashboard.
 */
export async function sendBuchPrintOrderMail(resend: Resend, to: string): Promise<void> {
  const html = shell(`
    <h1 style="font-size:22px;line-height:1.25;color:#141b2b;margin:0 0 1rem">Danke für deine Bestellung 📖</h1>
    <p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">
      vielen Dank! Deine Bestellung des gedruckten Buchs
      <strong>„Werde Meister deiner Gedanken"</strong> ist bei uns eingegangen.
      Wir bereiten den Versand an deine angegebene Adresse vor – du bekommst dein
      Exemplar in den nächsten Tagen.
    </p>
    <hr style="border:none;border-top:1px solid #e6e9ef;margin:2rem 0 1rem">
    <p style="font-size:12px;line-height:1.5;color:#9aa4b5;margin:0">
      Du erhältst diese E-Mail, weil du das Buch auf ${site.url} bestellt hast.
      Fragen zur Bestellung? Antworte einfach auf diese E-Mail.
    </p>
  `);

  const text = `Danke für deine Bestellung.

Vielen Dank! Deine Bestellung des gedruckten Buchs „Werde Meister deiner Gedanken" ist bei uns eingegangen. Wir bereiten den Versand an deine angegebene Adresse vor – du bekommst dein Exemplar in den nächsten Tagen.

Du erhältst diese E-Mail, weil du das Buch auf ${site.url} bestellt hast. Fragen? Antworte einfach auf diese E-Mail.

— Werde Meister deiner Gedanken`;

  const { error } = await resend.emails.send({
    from: BUCH_FROM,
    to,
    subject: "Deine Bestellung: Werde Meister deiner Gedanken (gedruckt)",
    text,
    html,
  });
  if (error) throw error;
}
