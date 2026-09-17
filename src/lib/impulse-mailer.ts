/**
 * Gemeinsame Versand-Bausteine der E-Mail-Impulse.
 *
 * Hier liegt die eine Quelle der Wahrheit für Absender, Rendering (HTML/Text)
 * und die Testsendung. Genutzt von:
 *   - der Cron-Route  src/app/api/impulses/route.ts (Serienversand + Testmodus)
 *   - der Admin-Action src/app/admin/impulse/actions.ts (Button „Testimpuls senden")
 */
import { Resend } from "resend";
import { impulses } from "@/lib/impulses";
import { site } from "@/lib/site";

/** Absender der Impuls-Mails (nach Domain-Verifizierung eigene Domain setzen). */
export const FROM =
  process.env.IMPULSE_FROM ||
  process.env.CONTACT_FROM ||
  "Werde Meister deiner Gedanken <onboarding@resend.dev>";

export const ABO_GRUND_MITGLIED =
  "Du erhältst diese Impulse, weil du sie in deinem Bereich abonniert hast.";
export const ABO_GRUND_LEAD =
  "Du erhältst diese Impulse, weil du das kostenlose E-Book angefordert hast.";
export const ABO_GRUND_TEST =
  "Dies ist eine Testsendung – sie ging nur an diese eine Adresse, kein Verteiler wurde angeschrieben.";

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

/** HTML-Fassung der Impuls-Mail. */
export function renderHtml(
  impulse: (typeof impulses)[number],
  ctaUrl: string,
  unsubUrl: string,
  aboGrund: string,
): string {
  const paragraphs = impulse.body
    .map(
      (p) =>
        `<p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">${escapeHtml(
          p,
        )}</p>`,
    )
    .join("");

  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:34rem;margin:0 auto;padding:8px">
    <p style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#7a869a;margin:0 0 .5rem">${escapeHtml(
      site.name,
    )}</p>
    <h1 style="font-size:22px;line-height:1.25;color:#141b2b;margin:0 0 1.25rem">${escapeHtml(
      impulse.heading,
    )}</h1>
    ${paragraphs}
    <p style="margin:1.5rem 0">
      <a href="${ctaUrl}" style="display:inline-block;background:#141b2b;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px">${escapeHtml(
        impulse.ctaLabel,
      )}</a>
    </p>
    <hr style="border:none;border-top:1px solid #e6e9ef;margin:2rem 0 1rem">
    <p style="font-size:12px;line-height:1.5;color:#9aa4b5;margin:0">
      ${escapeHtml(aboGrund)}
      <a href="${unsubUrl}" style="color:#9aa4b5">Jederzeit abmelden</a>.
    </p>
  </div>`;
}

/** Textfassung der Impuls-Mail (Plain-Text-Alternative). */
export function renderText(
  impulse: (typeof impulses)[number],
  ctaUrl: string,
  unsubUrl: string,
  aboGrund: string,
): string {
  return `${impulse.heading}\n\n${impulse.body.join("\n\n")}\n\n${impulse.ctaLabel}: ${ctaUrl}\n\n—\n${aboGrund}\nAbmelden: ${unsubUrl}`;
}

/** Sehr einfache Plausibilitätsprüfung einer E-Mail-Adresse. */
export function isValidEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Beliebige Eingabe zyklisch auf einen gültigen Impuls-Index klemmen. */
export function resolveImpulseIndex(value: string | number | null | undefined): number {
  const parsed =
    typeof value === "number" ? value : Number.parseInt(String(value ?? "0"), 10);
  const n = Number.isFinite(parsed) ? parsed : 0;
  return ((n % impulses.length) + impulses.length) % impulses.length;
}

export type TestSendResult =
  | { ok: true; to: string; impulseIndex: number; subject: string }
  | { ok: false; status: number; code?: string; error: string };

/**
 * Testsendung: schickt genau EINEN Impuls an EINE Adresse.
 *
 * Liest die Empfängertabellen NICHT und verändert KEINE Zähler – ideal, um den
 * Versandweg (Resend/Absender/Rendering) gefahrlos zu prüfen. Braucht nur
 * RESEND_API_KEY (kein Service-Role-Key). Der `status` im Fehlerfall passt für
 * Route-Handler; die Admin-Action nutzt nur `error`.
 */
export async function sendTestImpulse(
  toEmail: string,
  impulseIndexInput?: string | number | null,
): Promise<TestSendResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return {
      ok: false,
      status: 503,
      code: "not_configured",
      error: "Testsendung nicht möglich: RESEND_API_KEY fehlt.",
    };
  }

  const email = toEmail.trim();
  if (!isValidEmail(email)) {
    return { ok: false, status: 400, error: `Ungültige Test-Adresse: ${email}` };
  }

  const idx = resolveImpulseIndex(impulseIndexInput);
  const impulse = impulses[idx];
  const ctaUrl = `${site.url}${impulse.ctaPath}`;
  // Kein echter Abmelde-Token nötig – Platzhalter, damit die Vorlage vollständig ist.
  const unsubUrl = `${site.url}/api/impulses/unsubscribe?token=TESTSENDUNG`;
  const subject = `[TEST] ${impulse.subject}`;

  try {
    const resend = new Resend(apiKey);
    const { error: sendErr } = await resend.emails.send({
      from: FROM,
      to: email,
      subject,
      text: renderText(impulse, ctaUrl, unsubUrl, ABO_GRUND_TEST),
      html: renderHtml(impulse, ctaUrl, unsubUrl, ABO_GRUND_TEST),
    });
    if (sendErr) throw sendErr;
  } catch (err) {
    console.error("Impuls-Testsendung fehlgeschlagen an", email, err);
    return {
      ok: false,
      status: 502,
      error: err instanceof Error ? err.message : "Versand fehlgeschlagen.",
    };
  }

  return { ok: true, to: email, impulseIndex: idx, subject };
}
