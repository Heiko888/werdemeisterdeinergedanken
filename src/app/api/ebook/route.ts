import { NextResponse } from "next/server";
import { Resend } from "resend";
import { buildEbookPdf } from "@/lib/pdf/worksheet";
import { getEbookEntries } from "@/lib/pdf/ebook-entries";
import { getLogoBytes } from "@/lib/pdf/assets";
import { site } from "@/lib/site";

export const runtime = "nodejs";

/**
 * Automatischer Versand des kostenlosen E-Books „Die 7 Stufen kompakt".
 *
 * Nimmt eine E-Mail-Adresse entgegen, erzeugt das PDF und schickt es als
 * Anhang direkt an die Person (mit Download-Link als Fallback im Text).
 * Es ist ein einfacher Single-Opt-in für den angeforderten Inhalt – kein
 * Newsletter-Abo. Wer regelmäßige Impulse möchte, abonniert diese separat
 * im Mitgliederbereich.
 *
 * Benötigte Umgebungsvariablen:
 *   RESEND_API_KEY – API-Key aus dem Resend-Dashboard (Pflicht)
 *   EBOOK_FROM / CONTACT_FROM – Absender (Standard: onboarding@resend.dev;
 *     nach Domain-Verifizierung z. B. hallo@…deinergedanken.de)
 *
 * Ohne RESEND_API_KEY antwortet die Route mit `not_configured` (503) – das
 * Formular bietet dann den direkten Download an, sodass niemand ausgesperrt
 * ist.
 */
const FROM =
  process.env.EBOOK_FROM ||
  process.env.CONTACT_FROM ||
  "Werde Meister deiner Gedanken <onboarding@resend.dev>";

/**
 * Ratenbegrenzung pro IP. Jeder Versand erzeugt ein PDF und ruft Resend auf,
 * deshalb eine Bremse gegen Missbrauch (ein Bot könnte sonst das Kontingent
 * leeren oder fremde Postfächer fluten). Bewusst im Arbeitsspeicher:
 * reicht für die Ein-Container-Installation und geht beim Neustart verloren.
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
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

const DOWNLOAD_URL = `${site.url}/ebook`;

function renderHtml(): string {
  return `<div style="font-family:-apple-system,Segoe UI,Roboto,Helvetica,Arial,sans-serif;max-width:34rem;margin:0 auto;padding:8px">
    <p style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#7a869a;margin:0 0 .5rem">${site.name}</p>
    <h1 style="font-size:22px;line-height:1.25;color:#141b2b;margin:0 0 1rem">Dein E-Book ist da 🌱</h1>
    <p style="margin:0 0 1rem;font-size:16px;line-height:1.6;color:#2a3446">
      schön, dass du dabei bist. Im Anhang findest du dein kostenloses E-Book
      <strong>„Die 7 Stufen kompakt – Erste Übungen für mehr Klarheit"</strong>.
    </p>
    <p style="margin:0 0 1.25rem;font-size:16px;line-height:1.6;color:#2a3446">
      Mein Tipp: Nimm dir eine einzige Übung vor und bleib ein paar Tage dabei.
      Der Wandel entsteht nicht durch Wissen, sondern durch Wiederholung.
    </p>
    <p style="margin:1.5rem 0">
      <a href="${DOWNLOAD_URL}" style="display:inline-block;background:#141b2b;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px">E-Book herunterladen</a>
    </p>
    <p style="margin:0 0 1rem;font-size:14px;line-height:1.6;color:#5a657a">
      Falls sich der Anhang nicht öffnen lässt, kommst du über den Button
      jederzeit an dein Exemplar.
    </p>
    <hr style="border:none;border-top:1px solid #e6e9ef;margin:2rem 0 1rem">
    <p style="font-size:12px;line-height:1.5;color:#9aa4b5;margin:0">
      Du erhältst diese E-Mail, weil du das E-Book auf ${site.url} angefordert hast.
      Mehr auf <a href="${site.url}" style="color:#9aa4b5">werdemeisterdeinergedanken.de</a>.
    </p>
  </div>`;
}

const TEXT = `Dein E-Book ist da.

Schön, dass du dabei bist. Im Anhang findest du dein kostenloses E-Book „Die 7 Stufen kompakt – Erste Übungen für mehr Klarheit".

Mein Tipp: Nimm dir eine einzige Übung vor und bleib ein paar Tage dabei. Der Wandel entsteht nicht durch Wissen, sondern durch Wiederholung.

E-Book herunterladen: ${DOWNLOAD_URL}

—
Du erhältst diese E-Mail, weil du das E-Book auf ${site.url} angefordert hast.
Werde Meister deiner Gedanken`;

export async function POST(request: Request) {
  if (isRateLimited(clientIp(request))) {
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
  const email = String(body.email ?? "").trim();
  const honeypot = String(body.company ?? "").trim();

  // Spam-Schutz: Honeypot ausgefüllt → still verwerfen (Erfolg vortäuschen)
  if (honeypot) return NextResponse.json({ ok: true });

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

  let pdf: Uint8Array;
  try {
    pdf = await buildEbookPdf(getEbookEntries(), getLogoBytes());
  } catch (err) {
    console.error("E-Book-PDF konnte nicht erzeugt werden:", err);
    return NextResponse.json(
      { ok: false, error: "Das E-Book konnte gerade nicht erstellt werden." },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  try {
    const { error } = await resend.emails.send({
      from: FROM,
      to: email,
      subject: "Dein E-Book: Die 7 Stufen kompakt",
      text: TEXT,
      html: renderHtml(),
      attachments: [
        {
          filename: "Die-7-Stufen-kompakt.pdf",
          content: Buffer.from(pdf),
        },
      ],
    });
    if (error) throw error;
  } catch (err) {
    console.error("E-Book-Versand fehlgeschlagen:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "Senden fehlgeschlagen. Bitte versuch es später erneut.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
