import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendTestLeadConfirmationMail } from "@/lib/test-lead-mail";
import { sendSequenceStep } from "@/lib/sequence-mailer";
import { testLeadSequence } from "@/lib/sequences";
import { testQuestions, answerScale, scoreByStage, topStage } from "@/lib/consciousness-test";
import { site } from "@/lib/site";
import { isRateLimited, clientIp } from "@/lib/rate-limit";
import { pickUtm } from "@/lib/utm";

export const runtime = "nodejs";

/**
 * Lead-Erfassung aus dem Bewusstseinstest (Kampagnen-Check, Punkt 1).
 *
 * Der Test fragt vor dem Ergebnis eine E-Mail-Adresse ab. Diese Route
 * speichert den Lead in public.ebook_leads (`source = 'bewusstseinstest'`,
 * `stufe` = ermittelte Hauptstufe) und nutzt denselben Double-Opt-in-Flow wie
 * das E-Book: Bestätigungsmail → Klick auf /api/ebook/confirm → Ergebnisseite
 * + Tag-0-Mail der Verkaufsstrecke.
 *
 * Die Stufe wird aus den ROHEN Antworten serverseitig neu berechnet (wie in
 * bewusstseinstest/actions.ts), damit sich über die Schnittstelle keine
 * beliebige Stufe eintragen lässt.
 *
 * Graceful: Das Ergebnis wird im Test IMMER angezeigt – auch wenn hier etwas
 * fehlt. Deshalb antwortet die Route bei fehlender Einrichtung (kein
 * RESEND_API_KEY / kein Supabase) mit 200 und `mode: "not_configured"`, nicht
 * mit einem Fehler.
 *
 * Antwort: { ok: true, mode: "confirm" | "sent" | "not_configured" }.
 *   confirm → Bestätigungsmail ist raus (neuer oder noch offener Lead)
 *   sent    → Adresse war schon bestätigt; Stufe aktualisiert, Ergebnis-Mail raus
 */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const MAX_ANSWER = answerScale[answerScale.length - 1].value;

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (await isRateLimited("test-lead", ip, RATE_MAX, RATE_WINDOW_MS)) {
    return NextResponse.json(
      {
        ok: false,
        error: "Zu viele Anfragen in kurzer Zeit. Bitte versuch es später noch einmal.",
      },
      { status: 429 },
    );
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  const body = (data ?? {}) as Record<string, unknown>;
  const email = String(body.email ?? "").trim().toLowerCase();
  const honeypot = String(body.company ?? "").trim();
  const utm = pickUtm(body);

  // Spam-Schutz: Honeypot ausgefüllt → still verwerfen (Erfolg vortäuschen).
  if (honeypot) return NextResponse.json({ ok: true, mode: "confirm" });

  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Bitte gib eine gültige E-Mail-Adresse an." },
      { status: 400 },
    );
  }

  // Stufe serverseitig aus den rohen Antworten ableiten.
  const answers = body.answers;
  if (!Array.isArray(answers) || answers.length !== testQuestions.length) {
    return NextResponse.json({ ok: false, error: "Ungültige Antworten." }, { status: 400 });
  }
  const cleanAnswers = answers.map((a) => {
    const n = Number(a);
    return Number.isInteger(n) && n >= 0 && n <= MAX_ANSWER ? n : null;
  });
  const stufe = topStage(scoreByStage(cleanAnswers));

  const apiKey = process.env.RESEND_API_KEY;
  const admin = createAdminClient();
  if (!apiKey || !admin) {
    // Nicht eingerichtet → Ergebnis trotzdem anzeigen (graceful).
    return NextResponse.json({ ok: true, mode: "not_configured" });
  }
  const resend = new Resend(apiKey);

  const { data: existing, error: selErr } = await admin
    .from("ebook_leads")
    .select("id, status, confirm_token, unsubscribe_token, source")
    .eq("email", email)
    .maybeSingle();

  if (selErr) {
    console.error("Test-Lead-Lookup fehlgeschlagen:", selErr);
    return NextResponse.json(
      { ok: false, error: "Gerade nicht möglich. Bitte versuch es später." },
      { status: 500 },
    );
  }

  // Bereits bestätigt → Einwilligung liegt vor: Stufe aktualisieren und die
  // Ergebnis-Mail (Tag 0 der Strecke) direkt schicken. Wurde sie für diese
  // Adresse schon verschickt, bleibt es still (Ergebnis steht ja auf dem Schirm).
  if (existing?.status === "confirmed") {
    const { error: updErr } = await admin
      .from("ebook_leads")
      .update({ stufe })
      .eq("id", existing.id);
    if (updErr) console.error("Test-Lead: Stufe nicht aktualisiert:", updErr);

    try {
      await sendSequenceStep(
        admin,
        resend,
        {
          id: String(existing.id),
          email,
          stufe,
          unsubscribe_token: String(existing.unsubscribe_token),
        },
        testLeadSequence,
        0,
      );
    } catch (err) {
      console.error("Test-Lead: Ergebnis-Mail fehlgeschlagen:", err);
    }
    return NextResponse.json({ ok: true, mode: "sent" });
  }

  // Neu oder noch offen → (frisches) Token setzen und Bestätigungsmail senden.
  const { data: lead, error: upErr } = await admin
    .from("ebook_leads")
    .upsert(
      {
        email,
        status: "pending",
        requested_at: new Date().toISOString(),
        request_ip: ip,
        stufe,
        // Herkunft nur beim ersten Anlegen setzen; bei offenem Lead neues Token.
        ...(existing
          ? { confirm_token: crypto.randomUUID() }
          : { source: "bewusstseinstest", ...utm }),
      },
      { onConflict: "email" },
    )
    .select("confirm_token")
    .single();

  if (upErr || !lead) {
    console.error("Test-Lead konnte nicht gespeichert werden:", upErr);
    return NextResponse.json(
      { ok: false, error: "Gerade nicht möglich. Bitte versuch es später." },
      { status: 500 },
    );
  }

  const confirmUrl = `${site.url}/api/ebook/confirm?token=${lead.confirm_token}`;
  try {
    await sendTestLeadConfirmationMail(resend, email, confirmUrl, stufe);
  } catch (err) {
    console.error("Test-Lead-Bestätigungsmail fehlgeschlagen:", err);
    return NextResponse.json(
      { ok: false, error: "Senden fehlgeschlagen. Bitte versuch es später erneut." },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, mode: "confirm" });
}
