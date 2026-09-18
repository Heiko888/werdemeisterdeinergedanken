import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { impulses, ctaPathFor } from "@/lib/impulses";
import { site } from "@/lib/site";
import { cronAuthorized } from "@/lib/cron-auth";
import { runSequences, emailsInActiveSequence } from "@/lib/sequence-mailer";
import {
  FROM,
  ABO_GRUND_MITGLIED,
  ABO_GRUND_LEAD,
  renderHtml,
  renderText,
  sendTestImpulse,
} from "@/lib/impulse-mailer";

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
 *
 * Verkaufsstrecken: Vor der Impuls-Rotation werden die fälligen Schritte der
 * E-Mail-Sequenzen verschickt (src/lib/sequence-mailer.ts; täglich zusätzlich
 * über /api/sequences). Leads, die gerade in einer laufenden Strecke stecken,
 * bekommen in diesem Lauf KEINEN Impuls – die Rotation übernimmt erst danach.
 *
 * TESTSENDUNG (kein Echtversand):
 *   ?test=<email>       – schickt EINEN Impuls an genau diese Adresse und
 *                         lässt die Empfängerliste sowie alle Zähler unberührt.
 *   &impulse=<index>    – optional: welcher Impuls (0-basiert, Standard 0).
 *   Braucht nur CRON_SECRET + RESEND_API_KEY (kein Service-Role-Key nötig).
 *   Beispiel:
 *     /api/impulses?secret=<CRON_SECRET>&test=name@example.com&impulse=2
 *   Im Admin-Cockpit geht das per Button unter /admin/impulse.
 */

async function handle(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json(
      { ok: false, error: "Nicht autorisiert." },
      { status: 401 },
    );
  }

  // --- Testmodus: nur an eine Adresse, ohne Verteiler/Zähler zu berühren ---
  const params = new URL(request.url).searchParams;
  const testEmail = params.get("test");
  if (testEmail) {
    const res = await sendTestImpulse(testEmail, params.get("impulse"));
    if (!res.ok) {
      return NextResponse.json(
        { ok: false, code: res.code, error: res.error },
        { status: res.status },
      );
    }
    return NextResponse.json({
      ok: true,
      test: true,
      to: res.to,
      impulseIndex: res.impulseIndex,
      subject: res.subject,
      note: "Testsendung verschickt – Empfängerliste und Zähler wurden nicht berührt.",
    });
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

  // Erst die Verkaufsstrecken (idempotent), dann die Rotation.
  const sequences = await runSequences();
  const inSequence = await emailsInActiveSequence(admin);

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
    const ctaUrl = `${site.url}${ctaPathFor(impulse, { isMember: true })}`;
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

  // ---- E-Book-/Test-Lead-Nurture (B5) ----
  // Dieselbe Impuls-Rotation an bestätigte Leads, die noch keine Mitglieder
  // sind. So bekommt der große Funnel (Test/E-Book → Mitgliedschaft) eine
  // automatische Brücke. Fehlt die Nurture-Spalte (Migration nicht eingespielt),
  // wird der Block einfach übersprungen. Leads in laufender Verkaufsstrecke
  // werden ausgelassen; ihre CTAs zeigen auf öffentliche Seiten (ctaPathFor).
  let leadsSent = 0;
  let leadsFailed = 0;
  let leadsInSequence = 0;

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
    if (inSequence.has(email.toLowerCase())) {
      leadsInSequence += 1;
      continue;
    }
    const idx = ((lead.impulse_index as number) ?? 0) % impulses.length;
    const impulse = impulses[idx];
    const ctaUrl = `${site.url}${ctaPathFor(impulse, { isMember: false })}`;
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
    leadsInSequence,
    sequences,
  });
}

export const GET = handle;
export const POST = handle;
