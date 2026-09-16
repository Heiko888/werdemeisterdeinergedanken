import { NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { impulses } from "@/lib/impulses";
import { site } from "@/lib/site";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Serienversand der wöchentlichen E-Mail-Impulse.
 *
 * Diese Route ist NICHT über den Proxy geschützt (/api ist ausgenommen) und
 * daher selbst abgesichert: Aufrufe brauchen das CRON_SECRET (Header
 * `Authorization: Bearer <secret>` oder `?secret=<secret>`).
 *
 * Benötigte Umgebungsvariablen:
 *   CRON_SECRET               – Schutz dieser Route (Pflicht)
 *   RESEND_API_KEY            – Mailversand (Pflicht)
 *   SUPABASE_SERVICE_ROLE_KEY – liest alle Opt-in-Profile (Pflicht)
 *   IMPULSE_FROM / CONTACT_FROM – Absender (optional)
 *
 * Einrichten: z. B. Vercel Cron (wöchentlich) auf diese URL zeigen lassen,
 * mit dem Secret im Authorization-Header.
 */

const FROM =
  process.env.IMPULSE_FROM ||
  process.env.CONTACT_FROM ||
  "Werde Meister deiner Gedanken <onboarding@resend.dev>";

/** Zeitkonstanter String-Vergleich – verhindert Timing-Rückschlüsse aufs Secret. */
function safeEqual(a: string, b: string): boolean {
  const ab = Buffer.from(a);
  const bb = Buffer.from(b);
  if (ab.length !== bb.length) return false;
  return timingSafeEqual(ab, bb);
}

function authorized(request: Request): boolean {
  const secret = process.env.CRON_SECRET;
  if (!secret) return false;
  const header = request.headers.get("authorization");
  if (header && safeEqual(header, `Bearer ${secret}`)) return true;
  const query = new URL(request.url).searchParams.get("secret");
  return query != null && safeEqual(query, secret);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

function renderHtml(
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
function renderText(
  impulse: (typeof impulses)[number],
  ctaUrl: string,
  unsubUrl: string,
  aboGrund: string,
): string {
  return `${impulse.heading}\n\n${impulse.body.join("\n\n")}\n\n${impulse.ctaLabel}: ${ctaUrl}\n\n—\n${aboGrund}\nAbmelden: ${unsubUrl}`;
}

const ABO_GRUND_MITGLIED =
  "Du erhältst diese Impulse, weil du sie in deinem Bereich abonniert hast.";
const ABO_GRUND_LEAD =
  "Du erhältst diese Impulse, weil du das kostenlose E-Book angefordert hast.";

async function handle(request: Request) {
  if (!authorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Nicht autorisiert." },
      { status: 401 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  const admin = createAdminClient();
  if (!apiKey || !admin) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        error:
          "Versand nicht eingerichtet: RESEND_API_KEY und SUPABASE_SERVICE_ROLE_KEY erforderlich.",
      },
      { status: 503 },
    );
  }

  const { data: recipients, error } = await admin
    .from("profiles")
    .select("id, email, impulse_index, unsubscribe_token")
    .eq("newsletter_opt_in", true);

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  let sent = 0;
  let failed = 0;
  let skipped = 0;

  // E-Mails der Mitglieder merken – damit ein E-Book-Lead, der zugleich Mitglied
  // ist, den Impuls nicht doppelt bekommt.
  const memberEmails = new Set<string>();

  for (const r of recipients ?? []) {
    const email = r.email as string | null;
    if (!email) {
      skipped += 1;
      continue;
    }
    memberEmails.add(email.toLowerCase());
    const idx = ((r.impulse_index as number) ?? 0) % impulses.length;
    const impulse = impulses[idx];
    const ctaUrl = `${site.url}${impulse.ctaPath}`;
    const unsubUrl = `${site.url}/api/impulses/unsubscribe?token=${r.unsubscribe_token}`;

    try {
      const { error: sendErr } = await resend.emails.send({
        from: FROM,
        to: email,
        subject: impulse.subject,
        text: renderText(impulse, ctaUrl, unsubUrl, ABO_GRUND_MITGLIED),
        html: renderHtml(impulse, ctaUrl, unsubUrl, ABO_GRUND_MITGLIED),
      });
      if (sendErr) throw sendErr;

      await admin
        .from("profiles")
        .update({ impulse_index: idx + 1 })
        .eq("id", r.id);
      sent += 1;
    } catch (err) {
      console.error("Impuls-Versand fehlgeschlagen für", r.id, err);
      failed += 1;
    }
  }

  // ---- E-Book-Lead-Nurture (B5) ----
  // Dieselbe Impuls-Rotation an bestätigte E-Book-Leads, die noch keine
  // Mitglieder sind. So bekommt der große Funnel (E-Book → Mitgliedschaft) eine
  // automatische Brücke. Fehlt die Nurture-Spalte (Migration nicht eingespielt),
  // wird der Block einfach übersprungen.
  let leadsSent = 0;
  let leadsFailed = 0;

  const { data: leads } = await admin
    .from("ebook_leads")
    .select("id, email, impulse_index, unsubscribe_token, nurture_opt_in")
    .eq("status", "confirmed")
    .eq("nurture_opt_in", true);

  for (const lead of leads ?? []) {
    const email = lead.email as string | null;
    if (!email || memberEmails.has(email.toLowerCase())) {
      skipped += 1;
      continue;
    }
    const idx = ((lead.impulse_index as number) ?? 0) % impulses.length;
    const impulse = impulses[idx];
    const ctaUrl = `${site.url}${impulse.ctaPath}`;
    const unsubUrl = `${site.url}/api/ebook/unsubscribe?token=${lead.unsubscribe_token}`;

    try {
      const { error: sendErr } = await resend.emails.send({
        from: FROM,
        to: email,
        subject: impulse.subject,
        text: renderText(impulse, ctaUrl, unsubUrl, ABO_GRUND_LEAD),
        html: renderHtml(impulse, ctaUrl, unsubUrl, ABO_GRUND_LEAD),
      });
      if (sendErr) throw sendErr;

      await admin
        .from("ebook_leads")
        .update({ impulse_index: idx + 1, last_impulse_at: new Date().toISOString() })
        .eq("id", lead.id);
      leadsSent += 1;
    } catch (err) {
      console.error("Impuls-Versand (Lead) fehlgeschlagen für", lead.id, err);
      leadsFailed += 1;
    }
  }

  return NextResponse.json({
    ok: true,
    total: (recipients ?? []).length + (leads ?? []).length,
    sent,
    failed,
    skipped,
    leadsSent,
    leadsFailed,
  });
}

export const GET = handle;
export const POST = handle;
