/**
 * Versand der E-Mail-Verkaufsstrecken (Daten: src/lib/sequences.ts).
 *
 * Zustand liegt in public.lead_sequence_state (Migration 0018): je Lead,
 * Sequenz und Schritt ein Datensatz mit `sent_at`. Dadurch ist `runSequences()`
 * idempotent – der Cron darf täglich (oder öfter) laufen, jede Mail geht genau
 * einmal raus. Pro Lead und Lauf wird höchstens EIN Schritt verschickt, damit
 * niemand mehrere Mails auf einmal bekommt, falls der Cron mal pausiert hat.
 *
 * Anker der Strecken:
 *   test-lead   → `confirmed_at` des Leads (Double-Opt-in bestätigt)
 *   book-buyer  → `created_at` der ersten Buch-Bestellung (book_orders)
 *
 * Nur Leads, die ab SEQUENCE_ELIGIBLE_FROM bestätigt bzw. gekauft haben,
 * kommen in eine Strecke – Bestandsleads von vorher bleiben in der
 * Impuls-Rotation und bekommen nicht rückwirkend elf Tage Mails.
 *
 * Genutzt von:
 *   - src/app/api/sequences/route.ts   (täglicher Cron)
 *   - src/app/api/impulses/route.ts    (wöchentlich; ruft runSequences() mit
 *                                       auf und pausiert Impulse für Leads in
 *                                       laufender Strecke)
 *   - src/app/api/ebook/confirm/route.ts (Tag-0-Mail sofort nach Bestätigung)
 */
import { Resend } from "resend";
import type { SupabaseClient } from "@supabase/supabase-js";
import { createAdminClient } from "@/lib/supabase/admin";
import { getTestStage } from "@/lib/consciousness-test";
import { ACTIVE_MEMBERSHIP_STATES } from "@/lib/stripe";
import { site } from "@/lib/site";
import {
  bookBuyerSequence,
  fillPlaceholders,
  sequenceLength,
  testLeadSequence,
  type Sequence,
  type SequenceMail,
} from "@/lib/sequences";
import { FROM, errorMessage } from "@/lib/impulse-mailer";

/** Ab diesem Datum bestätigte Leads / getätigte Käufe durchlaufen die Strecken. */
export const SEQUENCE_ELIGIBLE_FROM = "2026-09-18T00:00:00Z";

/** Antworten auf Sequenz-Mails landen bei Heiko (CTA „Antworte einfach"). */
const REPLY_TO = process.env.CONTACT_TO || site.email;

const DAY_MS = 24 * 60 * 60 * 1000;

export type SequenceLead = {
  id: string;
  email: string;
  stufe: number | null;
  unsubscribe_token: string;
};

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function daysSince(iso: string, now = Date.now()): number {
  const t = Date.parse(iso);
  if (!Number.isFinite(t)) return 0;
  return Math.floor((now - t) / DAY_MS);
}

/* ---------- Rendering ---------- */

type Rendered = { subject: string; html: string; text: string };

/** Eine Sequenz-Mail für einen Lead rendern (HTML + Text). */
export function renderSequenceMail(
  seq: Sequence,
  step: SequenceMail,
  lead: Pick<SequenceLead, "stufe" | "unsubscribe_token">,
): Rendered {
  const stage = lead.stufe ? getTestStage(lead.stufe) : undefined;
  const ctx = { stufe: lead.stufe, stufenName: stage?.name ?? null };
  const subject = fillPlaceholders(step.subject, ctx);
  const preheader = fillPlaceholders(step.preheader, ctx);
  const paragraphs = step.body.map((p) => fillPlaceholders(p, ctx));
  const ctaUrl = step.ctaPath
    ? `${site.url}${fillPlaceholders(step.ctaPath, ctx)}`
    : null;
  const unsubUrl = `${site.url}/api/ebook/unsubscribe?token=${lead.unsubscribe_token}`;

  const html = `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:34rem;margin:0 auto;padding:8px">
    <span style="display:none;max-height:0;overflow:hidden;color:transparent">${escapeHtml(preheader)}</span>
    <p style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#7a869a;margin:0 0 .5rem">${escapeHtml(site.name)}</p>
    <h1 style="font-size:22px;line-height:1.25;color:#141b2b;margin:0 0 1.25rem">${escapeHtml(subject)}</h1>
    <p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">Hallo,</p>
    ${paragraphs
      .map(
        (p) =>
          `<p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">${escapeHtml(p)}</p>`,
      )
      .join("")}
    ${
      ctaUrl
        ? `<p style="margin:1.5rem 0"><a href="${ctaUrl}" style="display:inline-block;background:#141b2b;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px">${escapeHtml(step.ctaLabel)}</a></p>`
        : `<p style="margin:1.5rem 0;font-size:16px;line-height:1.6;color:#141b2b;font-weight:600">${escapeHtml(step.ctaLabel)}</p>`
    }
    <p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">Heiko</p>
    ${
      step.footerNote
        ? `<p style="margin:1.5rem 0 0;font-size:13px;line-height:1.6;color:#5a657a;border-left:3px solid #e6e9ef;padding-left:12px">${escapeHtml(step.footerNote)}</p>`
        : ""
    }
    <hr style="border:none;border-top:1px solid #e6e9ef;margin:2rem 0 1rem">
    <p style="font-size:12px;line-height:1.5;color:#9aa4b5;margin:0">
      ${escapeHtml(seq.aboGrund)}
      <a href="${unsubUrl}" style="color:#9aa4b5">Jederzeit abmelden</a>.
    </p>
  </div>`;

  const text = [
    subject,
    "",
    "Hallo,",
    "",
    paragraphs.join("\n\n"),
    "",
    ctaUrl ? `${step.ctaLabel}: ${ctaUrl}` : step.ctaLabel,
    "",
    "Heiko",
    step.footerNote ? `\n${step.footerNote}` : "",
    "",
    "—",
    seq.aboGrund,
    `Abmelden: ${unsubUrl}`,
  ].join("\n");

  return { subject, html, text };
}

/* ---------- Versand eines Schritts ---------- */

/**
 * Schickt genau EINEN Schritt an einen Lead und protokolliert ihn.
 * Wirft bei Versandfehlern; ein bereits protokollierter Schritt wird
 * übersprungen (idempotent, Primärschlüssel lead_id+sequence+step).
 */
export async function sendSequenceStep(
  admin: SupabaseClient,
  resend: Resend,
  lead: SequenceLead,
  seq: Sequence,
  stepIndex: number,
): Promise<"sent" | "skipped"> {
  const step = seq.steps[stepIndex];
  if (!step) return "skipped";
  if (step.requiresStufe && !lead.stufe) return "skipped";

  // Erst reservieren (Insert), dann senden: schlägt der Insert wegen des
  // Primärschlüssels fehl, hat ein paralleler Lauf den Schritt schon.
  const { error: insErr } = await admin.from("lead_sequence_state").insert({
    lead_id: lead.id,
    sequence: seq.id,
    step: stepIndex,
  });
  if (insErr) {
    if (insErr.code === "23505") return "skipped"; // unique_violation
    throw insErr;
  }

  const { subject, html, text } = renderSequenceMail(seq, step, lead);
  const { error: sendErr } = await resend.emails.send({
    from: FROM,
    to: lead.email,
    replyTo: REPLY_TO,
    subject,
    text,
    html,
  });
  if (sendErr) {
    // Reservierung zurücknehmen, damit der nächste Lauf es erneut versucht.
    await admin
      .from("lead_sequence_state")
      .delete()
      .match({ lead_id: lead.id, sequence: seq.id, step: stepIndex });
    throw sendErr;
  }
  return "sent";
}

/* ---------- Hilfen ---------- */

/** E-Mails aller aktiven Mitglieder (klein geschrieben) – bekommen keine Verkaufsstrecke. */
async function activeMemberEmails(admin: SupabaseClient): Promise<Set<string>> {
  const { data } = await admin.from("memberships").select("email, status");
  const set = new Set<string>();
  for (const m of data ?? []) {
    if (ACTIVE_MEMBERSHIP_STATES.has(String(m.status))) {
      set.add(String(m.email).toLowerCase());
    }
  }
  return set;
}

/** Bereits verschickte Schritte einer Sequenz, gruppiert nach Lead. */
async function sentSteps(
  admin: SupabaseClient,
  seq: Sequence,
): Promise<Map<string, Set<number>>> {
  const { data, error } = await admin
    .from("lead_sequence_state")
    .select("lead_id, step")
    .eq("sequence", seq.id);
  if (error) throw error;
  const map = new Map<string, Set<number>>();
  for (const row of data ?? []) {
    const id = String(row.lead_id);
    if (!map.has(id)) map.set(id, new Set());
    map.get(id)!.add(Number(row.step));
  }
  return map;
}

/** Index des nächsten fälligen, noch nicht gesendeten Schritts – oder -1. */
function nextDueStep(
  seq: Sequence,
  lead: SequenceLead,
  anchorIso: string,
  sent: Set<number> | undefined,
): number {
  const elapsed = daysSince(anchorIso);
  for (let i = 0; i < seq.steps.length; i += 1) {
    const step = seq.steps[i];
    if (step.day > elapsed) break;
    if (sent?.has(i)) continue;
    if (step.requiresStufe && !lead.stufe) continue;
    return i;
  }
  return -1;
}

/**
 * E-Mail-Adressen (klein geschrieben) aller Leads, die gerade in einer
 * laufenden Strecke stecken. Der Impuls-Mailer überspringt sie, damit sich
 * Verkaufsstrecke und Wochen-Impuls nicht überlagern.
 */
export async function emailsInActiveSequence(
  admin: SupabaseClient,
): Promise<Set<string>> {
  const active = new Set<string>();
  const testDays = sequenceLength(testLeadSequence);
  const bookDays = sequenceLength(bookBuyerSequence);

  const { data: leads } = await admin
    .from("ebook_leads")
    .select("email, confirmed_at")
    .eq("status", "confirmed")
    .gte("confirmed_at", SEQUENCE_ELIGIBLE_FROM);
  for (const l of leads ?? []) {
    if (l.confirmed_at && daysSince(String(l.confirmed_at)) <= testDays) {
      active.add(String(l.email).toLowerCase());
    }
  }

  const { data: orders } = await admin
    .from("book_orders")
    .select("email, created_at")
    .gte("created_at", SEQUENCE_ELIGIBLE_FROM);
  for (const o of orders ?? []) {
    if (o.created_at && daysSince(String(o.created_at)) <= bookDays) {
      active.add(String(o.email).toLowerCase());
    }
  }
  return active;
}

/* ---------- Lauf ---------- */

export type RunSequencesResult =
  | {
      ok: true;
      testLead: { sent: number; failed: number };
      bookBuyer: { sent: number; failed: number };
    }
  | { ok: false; code: "not_configured"; error: string };

/**
 * Verschickt alle fälligen Schritte beider Strecken (höchstens einer je Lead
 * und Lauf). Fehler einzelner Mails werden gezählt und geloggt, brechen den
 * Lauf aber nicht ab.
 */
export async function runSequences(): Promise<RunSequencesResult> {
  const apiKey = process.env.RESEND_API_KEY;
  const admin = createAdminClient();
  if (!apiKey || !admin) {
    return {
      ok: false,
      code: "not_configured",
      error:
        "Versand nicht eingerichtet: RESEND_API_KEY und SUPABASE_SERVICE_ROLE_KEY erforderlich.",
    };
  }
  const resend = new Resend(apiKey);
  const members = await activeMemberEmails(admin);

  const testLead = await runTestLeadSequence(admin, resend, members);
  const bookBuyer = await runBookBuyerSequence(admin, resend, members);
  return { ok: true, testLead, bookBuyer };
}

async function runTestLeadSequence(
  admin: SupabaseClient,
  resend: Resend,
  members: Set<string>,
): Promise<{ sent: number; failed: number }> {
  const seq = testLeadSequence;
  let sent = 0;
  let failed = 0;

  const { data: leads, error } = await admin
    .from("ebook_leads")
    .select("id, email, stufe, confirmed_at, unsubscribe_token, nurture_opt_in")
    .eq("status", "confirmed")
    .eq("nurture_opt_in", true)
    .gte("confirmed_at", SEQUENCE_ELIGIBLE_FROM);
  if (error) {
    // Typisch: Migration 0017/0018 noch nicht eingespielt → nur loggen.
    console.error("Sequenz (test-lead): Leads nicht lesbar:", error.message);
    return { sent, failed };
  }

  let sentMap: Map<string, Set<number>>;
  try {
    sentMap = await sentSteps(admin, seq);
  } catch (err) {
    console.error("Sequenz (test-lead): Zustand nicht lesbar:", errorMessage(err));
    return { sent, failed };
  }

  for (const row of leads ?? []) {
    const lead: SequenceLead = {
      id: String(row.id),
      email: String(row.email),
      stufe: typeof row.stufe === "number" ? row.stufe : null,
      unsubscribe_token: String(row.unsubscribe_token),
    };
    if (!row.confirmed_at || members.has(lead.email.toLowerCase())) continue;

    const idx = nextDueStep(seq, lead, String(row.confirmed_at), sentMap.get(lead.id));
    if (idx < 0) continue;

    try {
      if ((await sendSequenceStep(admin, resend, lead, seq, idx)) === "sent") sent += 1;
    } catch (err) {
      console.error(`Sequenz (test-lead) Schritt ${idx} fehlgeschlagen für`, lead.id, errorMessage(err));
      failed += 1;
    }
  }
  return { sent, failed };
}

/**
 * Buch-Käufer haben nicht zwingend einen Lead-Datensatz. Für den Versand (und
 * den Abmeldelink) wird deshalb je Käufer-E-Mail ein Lead mit
 * `source = 'buch-kauf'` angelegt, falls noch keiner existiert. Käufer sind
 * Bestandskunden – die Einladung in die Mitgliedschaft geht als Hinweis auf ein
 * ähnliches eigenes Angebot raus (§ 7 Abs. 3 UWG), jede Mail mit 1-Klick-Abmeldung.
 * Abgemeldete Adressen bleiben abgemeldet.
 */
async function runBookBuyerSequence(
  admin: SupabaseClient,
  resend: Resend,
  members: Set<string>,
): Promise<{ sent: number; failed: number }> {
  const seq = bookBuyerSequence;
  let sent = 0;
  let failed = 0;

  const { data: orders, error } = await admin
    .from("book_orders")
    .select("email, created_at, status")
    .gte("created_at", SEQUENCE_ELIGIBLE_FROM)
    .order("created_at", { ascending: true });
  if (error) {
    console.error("Sequenz (book-buyer): Bestellungen nicht lesbar:", error.message);
    return { sent, failed };
  }

  // Erste Bestellung je E-Mail ist der Anker; Erstattungen zählen nicht.
  const anchors = new Map<string, string>();
  for (const o of orders ?? []) {
    if (String(o.status) === "erstattet") continue;
    const email = String(o.email).toLowerCase();
    if (!anchors.has(email)) anchors.set(email, String(o.created_at));
  }
  if (anchors.size === 0) return { sent, failed };

  let sentMap: Map<string, Set<number>>;
  try {
    sentMap = await sentSteps(admin, seq);
  } catch (err) {
    console.error("Sequenz (book-buyer): Zustand nicht lesbar:", errorMessage(err));
    return { sent, failed };
  }

  for (const [email, anchor] of anchors) {
    if (members.has(email)) continue;

    // Lead nachschlagen oder als Käufer-Lead anlegen.
    const { data: existing } = await admin
      .from("ebook_leads")
      .select("id, email, stufe, status, unsubscribe_token")
      .eq("email", email)
      .maybeSingle();

    let leadRow = existing;
    if (!leadRow) {
      const { data: created, error: insErr } = await admin
        .from("ebook_leads")
        .insert({
          email,
          status: "confirmed",
          source: "buch-kauf",
          requested_at: anchor,
          confirmed_at: anchor,
        })
        .select("id, email, stufe, status, unsubscribe_token")
        .single();
      if (insErr || !created) {
        console.error("Sequenz (book-buyer): Käufer-Lead nicht anlegbar:", insErr?.message);
        failed += 1;
        continue;
      }
      leadRow = created;
    }
    if (String(leadRow.status) !== "confirmed") continue;

    const lead: SequenceLead = {
      id: String(leadRow.id),
      email: String(leadRow.email),
      stufe: typeof leadRow.stufe === "number" ? leadRow.stufe : null,
      unsubscribe_token: String(leadRow.unsubscribe_token),
    };
    const idx = nextDueStep(seq, lead, anchor, sentMap.get(lead.id));
    if (idx < 0) continue;

    try {
      if ((await sendSequenceStep(admin, resend, lead, seq, idx)) === "sent") sent += 1;
    } catch (err) {
      console.error(`Sequenz (book-buyer) Schritt ${idx} fehlgeschlagen für`, lead.id, errorMessage(err));
      failed += 1;
    }
  }
  return { sent, failed };
}
