import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { site } from "@/lib/site";
import { isRateLimited, clientIp } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Öffentliche Annahme des Vorab-Fragebogens zum kostenlosen Klarheitsgespräch.
 *
 * Der Klient füllt das Formular unter `/klarheitsgespraech` aus (Link, den Heiko
 * vor Ort oder per Mail verschickt). Die Antwort landet in
 * `erstgespraech_fragebogen` und erscheint dann automatisch im Admin-Cockpit
 * unter „Offene Fragebögen".
 *
 * Sicherheit: Der Insert läuft über den anonymen Supabase-Client. Die
 * RLS-Policy `erstgespraech_fragebogen_insert` erlaubt anonyme Inserts nur mit
 * `einwilligung = true`; Lesezugriff hat der Public Key nicht. Zusätzlich hier:
 * Honeypot gegen Bots und eine IP-Ratenbremse gegen Flut.
 *
 * Optional (unkritisch): Ist `RESEND_API_KEY` gesetzt, geht eine kurze
 * Benachrichtigung an Heiko raus, damit ein neuer Fragebogen nicht übersehen
 * wird. Fehlt der Key oder scheitert der Versand, wird der Fragebogen trotzdem
 * gespeichert.
 */

// Ratenbremse pro IP – gemeinsamer Speicher über Supabase (lib/rate-limit.ts),
// mit In-Memory-Fallback. Gleiche Technik wie im Kontaktformular.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 8;

function str(v: unknown): string {
  return String(v ?? "").trim();
}

function isEmail(value: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

/** Selbsteinschätzung der Stufe: nur 1–7 durchlassen, sonst null. */
function stufeOrNull(v: unknown): number | null {
  const n = Number(v);
  return Number.isInteger(n) && n >= 1 && n <= 7 ? n : null;
}

type FeldFehler = { feld: string; text: string };

export async function POST(request: Request) {
  if (!isSupabaseConfigured) {
    return NextResponse.json(
      {
        ok: false,
        error: `Der Fragebogen ist gerade nicht verfügbar. Bitte schreib mir direkt an ${site.email}.`,
      },
      { status: 503 },
    );
  }

  if (await isRateLimited("klarheitsgespraech", clientIp(request), RATE_MAX, RATE_WINDOW_MS)) {
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

  // Spam-Schutz: Honeypot ausgefüllt → still verwerfen (Erfolg vortäuschen).
  if (str(body.company)) return NextResponse.json({ ok: true });

  const name = str(body.name);
  const email = str(body.email);
  const anlass = str(body.anlass);
  const muster = str(body.muster);
  const versucht = str(body.versucht);
  const veraenderung = str(body.veraenderung);
  const sonstiges = str(body.sonstiges);
  const stufe = stufeOrNull(body.stufe);
  const einwilligung = body.einwilligung === true;
  // Herkunft (z. B. „direktlink", „vor-ort") – knapp begrenzt, damit das Feld
  // kein Vehikel für Spam wird. Muss zur DB-Prüfung (<= 60) passen.
  const quelleRoh = str(body.quelle) || "direktlink";
  const quelle = quelleRoh.slice(0, 60);

  // Server-seitige Prüfung – spiegelt die CHECK-Constraints der Tabelle, damit
  // wir freundliche Meldungen liefern statt eines rohen DB-Fehlers.
  const fehler: FeldFehler[] = [];
  if (name.length < 2 || name.length > 120)
    fehler.push({ feld: "name", text: "Bitte gib deinen Namen an." });
  if (email.length < 5 || email.length > 200 || !isEmail(email))
    fehler.push({ feld: "email", text: "Bitte gib eine gültige E-Mail-Adresse an." });
  if (anlass.length < 10 || anlass.length > 4000)
    fehler.push({
      feld: "anlass",
      text: "Bitte beschreibe kurz (mind. 10 Zeichen), warum du gerade jetzt hier bist.",
    });
  if (muster.length < 5 || muster.length > 4000)
    fehler.push({ feld: "muster", text: "Bitte beschreibe das Muster oder Thema etwas genauer." });
  if (versucht.length < 5 || versucht.length > 4000)
    fehler.push({ feld: "versucht", text: "Bitte schreib kurz, was du schon versucht hast." });
  if (veraenderung.length < 5 || veraenderung.length > 4000)
    fehler.push({
      feld: "veraenderung",
      text: "Bitte beschreibe kurz, was sich für dich verändern soll.",
    });
  if (sonstiges.length > 4000)
    fehler.push({ feld: "sonstiges", text: "Der Text unter „Sonstiges“ ist zu lang." });
  if (!einwilligung)
    fehler.push({
      feld: "einwilligung",
      text: "Ohne deine Einwilligung darf ich deine Angaben nicht speichern.",
    });

  if (fehler.length > 0) {
    return NextResponse.json(
      { ok: false, error: fehler[0].text, felder: fehler },
      { status: 400 },
    );
  }

  const supabase = await createClient();
  const { error } = await supabase.from("erstgespraech_fragebogen").insert({
    name,
    email,
    anlass,
    muster,
    versucht,
    veraenderung,
    stufe,
    sonstiges: sonstiges || null,
    einwilligung: true,
    quelle,
  });

  if (error) {
    console.error("Fragebogen speichern fehlgeschlagen:", error);
    return NextResponse.json(
      {
        ok: false,
        error: `Speichern fehlgeschlagen. Bitte versuch es später erneut oder schreib mir direkt an ${site.email}.`,
      },
      { status: 502 },
    );
  }

  // Benachrichtigung an Heiko läuft bereits serverseitig: Ein Datenbank-Trigger
  // (`erstgespraech_fragebogen_benachrichtigung`) ruft nach dem Insert die Edge
  // Function `neuer-fragebogen` auf, die die E-Mail über Resend verschickt.
  // Deshalb hier bewusst KEIN eigener Mailversand – das würde doppelt melden.

  return NextResponse.json({ ok: true });
}
