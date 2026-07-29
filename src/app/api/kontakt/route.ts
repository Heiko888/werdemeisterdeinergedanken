import { NextResponse } from "next/server";
import { Resend } from "resend";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Kontaktformular-Versand über Resend.
 * Benötigte Umgebungsvariablen:
 *   RESEND_API_KEY  – API-Key aus dem Resend-Dashboard (Pflicht)
 *   CONTACT_TO      – Empfänger (Standard: site.email)
 *   CONTACT_FROM    – Absender (Standard: onboarding@resend.dev; nach
 *                     Domain-Verifizierung z. B. kontakt@…deinergedanken.de)
 */
const FROM =
  process.env.CONTACT_FROM ||
  "Werde Meister deiner Gedanken <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || site.email;

/**
 * Ratenbegrenzung pro IP. Jede Anfrage löst bis zu zwei Resend-Aufrufe aus
 * (Benachrichtigung + Auto-Antwort), deshalb ist eine Bremse nötig: sonst
 * kann ein Bot, der den Honeypot umgeht, das Kontingent leeren und das
 * Postfach fluten.
 *
 * Bewusst im Arbeitsspeicher: reicht für die Ein-Container-Installation und
 * geht beim Neustart verloren. Gegen verteilten Spam von vielen IPs bräuchte
 * es einen gemeinsamen Speicher (z. B. Redis).
 */
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  // Notbremse gegen unbegrenztes Wachstum der Map
  if (hits.size > 5000) hits.clear();
  return recent.length > RATE_MAX;
}

function clientIp(request: Request): string {
  // `x-real-ip` wird von unserem nginx zuverlässig aus $remote_addr gesetzt
  // und lässt sich vom Client nicht fälschen – daher zuerst prüfen. Der
  // `x-forwarded-for`-Wert ist client-manipulierbar; wir nehmen davon nur den
  // letzten (proxy-nächsten) Eintrag als Fallback, nicht den ersten.
  const xff = request.headers.get("x-forwarded-for");
  const xffLast = xff?.split(",").pop()?.trim();
  return request.headers.get("x-real-ip") || xffLast || "unknown";
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
    return NextResponse.json(
      {
        ok: false,
        error: `Zu viele Anfragen in kurzer Zeit. Bitte versuch es später noch einmal oder schreib mir direkt an ${site.email}.`,
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
  const name = String(body.name ?? "").trim();
  const email = String(body.email ?? "").trim();
  const message = String(body.message ?? "").trim();
  const honeypot = String(body.company ?? "").trim();

  // Spam-Schutz: Honeypot ausgefüllt → still verwerfen (Erfolg vortäuschen)
  if (honeypot) return NextResponse.json({ ok: true });

  if (!name || !email || !message) {
    return NextResponse.json(
      { ok: false, error: "Bitte fülle alle Felder aus." },
      { status: 400 },
    );
  }
  if (!isEmail(email)) {
    return NextResponse.json(
      { ok: false, error: "Bitte gib eine gültige E-Mail-Adresse an." },
      { status: 400 },
    );
  }
  if (message.length > 5000) {
    return NextResponse.json(
      { ok: false, error: "Deine Nachricht ist etwas zu lang." },
      { status: 400 },
    );
  }

  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      {
        ok: false,
        code: "not_configured",
        error: `Der Mailversand ist noch nicht eingerichtet. Bitte schreib mir direkt an ${site.email}.`,
      },
      { status: 503 },
    );
  }

  const resend = new Resend(apiKey);
  const safe = {
    name: escapeHtml(name),
    email: escapeHtml(email),
    message: escapeHtml(message),
  };

  // 1) Benachrichtigung an Heiko
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: TO,
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${name}`,
      text: `Name: ${name}\nE-Mail: ${email}\n\nNachricht:\n${message}`,
      html: `<h2 style="font-family:sans-serif">Neue Kontaktanfrage</h2>
        <p style="font-family:sans-serif"><strong>Name:</strong> ${safe.name}<br>
        <strong>E-Mail:</strong> ${safe.email}</p>
        <p style="font-family:sans-serif;white-space:pre-wrap">${safe.message}</p>`,
    });
    if (error) throw error;
  } catch (err) {
    console.error("Kontakt-Mail fehlgeschlagen:", err);
    return NextResponse.json(
      {
        ok: false,
        error: `Senden fehlgeschlagen. Bitte versuch es später erneut oder schreib direkt an ${site.email}.`,
      },
      { status: 502 },
    );
  }

  // 2) Automatische Bestätigung an den Absender (optional, Fehler nicht kritisch)
  try {
    await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Danke für deine Nachricht",
      text: `Hey ${name},

danke für deine Nachricht – ich habe sie erhalten und melde mich so bald wie möglich bei dir.

Bis dahin: Bleib bewusst.
Heiko

— Werde Meister deiner Gedanken`,
    });
  } catch (err) {
    console.error("Auto-Antwort fehlgeschlagen (unkritisch):", err);
  }

  return NextResponse.json({ ok: true });
}
