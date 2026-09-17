import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEbookConfirmationMail, sendEbookDeliveryMail } from "@/lib/ebook-mail";
import { site } from "@/lib/site";
import { ebookDownloadUrl } from "@/lib/ebook-download";

export const runtime = "nodejs";

/**
 * Lead-Erfassung für das kostenlose E-Book „Die 7 Stufen der Bewusstseinsentwicklung".
 *
 * Ablauf mit Double-Opt-in (wenn Supabase eingerichtet ist):
 *   1. E-Mail wird als Lead mit Status „pending" gespeichert.
 *   2. Eine Bestätigungsmail geht raus; erst der Klick auf den Link
 *      (/api/ebook/confirm) liefert das E-Book (DSGVO-Einwilligung).
 *   3. Bereits bestätigte Adressen bekommen das E-Book direkt erneut.
 *
 * Ohne Supabase (kein Service-Role-Key) fällt die Route auf einen einfachen
 * Direktversand zurück – das E-Book kommt dann ohne Lead-Speicherung an.
 * Ohne RESEND_API_KEY antwortet die Route mit „not_configured" (503); das
 * Formular bietet dann den direkten Download an.
 *
 * Antwort bei Erfolg: { ok: true, mode: "confirm" | "sent", downloadUrl? }.
 * Die downloadUrl kommt nur bei bereits bestätigten Adressen mit – sie
 * enthält das Token für /ebook. Bei „confirm" gibt es bewusst keinen Link:
 * ohne bestätigte Einwilligung kein E-Book.
 */

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

function clientIp(request: Request): string {
  return (
    // Siehe kontakt/route.ts: x-real-ip zuerst (nginx-gesetzt, nicht
    // fälschbar); x-forwarded-for nur als Fallback und dort den letzten Eintrag.
    request.headers.get("x-real-ip") ||
    request.headers.get("x-forwarded-for")?.split(",").pop()?.trim() ||
    "unknown"
  );
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (isRateLimited(ip)) {
    return NextResponse.json(
      {
        ok: false,
        error:
          "Zu viele Anfragen in kurzer Zeit. Bitte versuch es später noch einmal.",
      },
      { status: 429 },
    );
  }

  let data: unknown;
  try {
    data = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  const body = (data ?? {}) as Record<string, unknown>;
  const email = String(body.email ?? "").trim().toLowerCase();
  const honeypot = String(body.company ?? "").trim();
  // Herkunft des Leads (z. B. "startseite", "gratis-ebook") – auf einen
  // slug-artigen Wert begrenzt, damit die Spalte auswertbar bleibt.
  const source =
    String(body.source ?? "")
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9_-]/g, "")
      .slice(0, 40) || "lead-magnet";

  // Spam-Schutz: Honeypot ausgefüllt → still verwerfen (Erfolg vortäuschen)
  if (honeypot) return NextResponse.json({ ok: true, mode: "confirm" });

  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Bitte gib eine gültige E-Mail-Adresse an." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        error: "Der E-Mail-Versand ist noch nicht eingerichtet.",
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const admin = createAdminClient();

  // Fallback ohne Supabase: kein Double-Opt-in möglich, E-Book direkt senden.
  if (!admin) {
    try {
      // Ohne Supabase gibt es keinen Lead und damit kein Token – die Mail
      // kommt dann ohne Download-Link, das PDF hängt aber als Anhang dran.
      await sendEbookDeliveryMail(resend, email);
    } catch (err) {
      console.error("E-Book-Direktversand fehlgeschlagen:", err);
      return NextResponse.json(
        {
          ok: false,
          error: "Senden fehlgeschlagen. Bitte versuch es später erneut.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({ ok: true, mode: "sent" });
  }

  // Bestehenden Lead nachschlagen.
  const { data: existing, error: selErr } = await admin
    .from("ebook_leads")
    .select("id, status, confirm_token, unsubscribe_token")
    .eq("email", email)
    .maybeSingle();

  if (selErr) {
    console.error("Lead-Lookup fehlgeschlagen:", selErr);
    return NextResponse.json(
      { ok: false, error: "Gerade nicht möglich. Bitte versuch es später." },
      { status: 500 },
    );
  }

  // Bereits bestätigt → E-Book direkt erneut zusenden (Einwilligung liegt vor).
  if (existing?.status === "confirmed") {
    const unsubUrl = `${site.url}/api/ebook/unsubscribe?token=${existing.unsubscribe_token}`;
    const downloadToken = existing.confirm_token as string | null;
    try {
      await sendEbookDeliveryMail(
        resend,
        email,
        unsubUrl,
        downloadToken ?? undefined,
      );
    } catch (err) {
      console.error("E-Book-Erneutversand fehlgeschlagen:", err);
      return NextResponse.json(
        {
          ok: false,
          error: "Senden fehlgeschlagen. Bitte versuch es später erneut.",
        },
        { status: 502 },
      );
    }
    return NextResponse.json({
      ok: true,
      mode: "sent",
      // Einwilligung liegt vor → der Direkt-Download darf angeboten werden.
      ...(downloadToken ? { downloadUrl: ebookDownloadUrl(downloadToken) } : {}),
    });
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
        // Bei bestehendem „pending"-Lead ein neues Token erzwingen, damit alte
        // Links ungültig werden; Standard-Default greift nur beim Insert.
        // Die Herkunft (source) wird nur beim ersten Anlegen gesetzt, damit ein
        // erneuter Eintrag die ursprüngliche Quelle nicht überschreibt.
        ...(existing ? { confirm_token: crypto.randomUUID() } : { source }),
      },
      { onConflict: "email" },
    )
    .select("confirm_token")
    .single();

  if (upErr || !lead) {
    console.error("Lead konnte nicht gespeichert werden:", upErr);
    return NextResponse.json(
      { ok: false, error: "Gerade nicht möglich. Bitte versuch es später." },
      { status: 500 },
    );
  }

  const confirmUrl = `${site.url}/api/ebook/confirm?token=${lead.confirm_token}`;
  try {
    await sendEbookConfirmationMail(resend, email, confirmUrl);
  } catch (err) {
    console.error("Bestätigungsmail fehlgeschlagen:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Senden fehlgeschlagen. Bitte versuch es später erneut.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true, mode: "confirm" });
}
