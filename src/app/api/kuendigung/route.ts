import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { createAdminClient } from "@/lib/supabase/admin";
import { isRateLimited, clientIp } from "@/lib/rate-limit";
import { MITGLIEDSCHAFT_AKTIV } from "@/lib/membership-launch";
import { getMembership } from "@/lib/membership";
import { ACTIVE_MEMBERSHIP_STATES } from "@/lib/stripe";
import {
  KUENDIGUNG_ARTEN,
  angabenZeilen,
  bestaetigungsText,
  formatEingang,
  neueReferenz,
  pruefeKuendigung,
  type KuendigungEingabe,
} from "@/lib/kuendigung";

export const runtime = "nodejs";

/**
 * Kündigungsbutton (§ 312k BGB) – nimmt eine Kündigung an (siehe
 * src/lib/kuendigung.ts).
 *
 * 1. Prüft die Angaben (dieselbe Prüfung wie im Formular).
 * 2. Sucht zur E-Mail-Adresse die Mitgliedschaft, um das Vertragsende (Ende
 *    des laufenden Abrechnungszeitraums) nennen zu können. Das Ergebnis geht
 *    nur in die E-Mails, nicht in die Antwort – sonst ließe sich über die
 *    Seite abfragen, ob eine Adresse Mitglied ist.
 * 3. Speichert die Kündigung mit Eingangszeitpunkt und Referenz in
 *    `kuendigungen` (Übersicht unter /admin/kuendigungen).
 * 4. Benachrichtigt Heiko und schickt der Person sofort eine
 *    Kündigungsbestätigung per E-Mail (Inhalt, Datum und Uhrzeit des Eingangs,
 *    Vertragsende).
 *
 * Die Kündigung in Stripe führt Heiko bewusst manuell aus (Abo zum
 * Periodenende beenden) – die Kündigung ist mit dem Eingang wirksam erklärt,
 * die Abwicklung ist ein zweiter Schritt.
 *
 * Eine Kündigung darf nie still verloren gehen: Klappt weder Speichern noch
 * Mailversand, antwortet die Route mit einem Fehler und nennt die
 * E-Mail-Adresse als Ausweg.
 *
 * Solange die Mitgliedschaft nicht buchbar ist (MITGLIEDSCHAFT_AKTIV = false),
 * gibt es nichts zu kündigen → 404.
 */
const FROM =
  process.env.CONTACT_FROM ||
  "Werde Meister deiner Gedanken <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || site.email;

const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 10;

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function periodeEndeFuer(email: string): Promise<string | null> {
  try {
    const m = await getMembership(email);
    if (!m || !ACTIVE_MEMBERSHIP_STATES.has(m.status)) return null;
    return m.current_period_end;
  } catch (err) {
    console.error("kuendigung membership lookup failed", err);
    return null;
  }
}

async function speichern(
  e: KuendigungEingabe,
  referenz: string,
  eingang: string,
  periodeEnde: string | null,
  ip: string,
): Promise<boolean> {
  const admin = createAdminClient();
  if (!admin) return false;
  try {
    const { error } = await admin.from("kuendigungen").insert({
      referenz,
      name: e.name,
      email: e.email,
      vertrag: e.vertrag,
      vertragsnummer: e.vertragsnummer || null,
      art: e.art,
      grund: e.grund || null,
      zeitpunkt: e.zeitpunkt,
      wunschdatum: e.wunschdatum || null,
      periode_ende: periodeEnde,
      eingegangen_at: eingang,
      request_ip: ip,
    });
    if (error) {
      console.error("kuendigungen insert error", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("kuendigungen insert failed", err);
    return false;
  }
}

export async function POST(request: Request) {
  if (!MITGLIEDSCHAFT_AKTIV) {
    return NextResponse.json({ ok: false, error: "Nicht gefunden." }, { status: 404 });
  }

  const ip = clientIp(request);
  if (await isRateLimited("kuendigung", ip, RATE_MAX, RATE_WINDOW_MS)) {
    return NextResponse.json(
      {
        ok: false,
        error: `Zu viele Anfragen in kurzer Zeit. Bitte versuch es gleich noch einmal oder sende deine Kündigung per E-Mail an ${site.email}.`,
      },
      { status: 429 },
    );
  }

  let roh: Record<string, unknown>;
  try {
    roh = ((await request.json()) ?? {}) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ ok: false, error: "Ungültige Anfrage." }, { status: 400 });
  }

  // Honeypot: für Menschen unsichtbar – ausgefüllt → still verwerfen.
  if (String(roh.company ?? "").trim()) {
    return NextResponse.json({ ok: true, referenz: "KU-00000000", eingang: new Date().toISOString(), bestaetigungGesendet: true });
  }

  const pruefung = pruefeKuendigung(roh);
  if (!pruefung.ok) {
    return NextResponse.json({ ok: false, error: pruefung.fehler }, { status: 400 });
  }
  const e = pruefung.eingabe;
  const eingang = new Date().toISOString();
  const referenz = neueReferenz(randomUUID());
  const periodeEnde = await periodeEndeFuer(e.email);

  const gespeichert = await speichern(e, referenz, eingang, periodeEnde, ip);

  let benachrichtigt = false;
  let bestaetigungGesendet = false;
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);
    const { datum, uhrzeit } = formatEingang(eingang);
    const zeilen = angabenZeilen(e);
    const mitglied = periodeEnde
      ? `aktive Mitgliedschaft gefunden, Periodenende ${periodeEnde}`
      : "KEINE aktive Mitgliedschaft zu dieser E-Mail gefunden – bitte manuell zuordnen";
    const offen = "Bitte das Abo in Stripe beenden und den Status in /admin/kuendigungen setzen.";

    // 1) Benachrichtigung an Heiko
    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: e.email,
        subject: `Kündigung ${referenz}: ${KUENDIGUNG_ARTEN[e.art]} – ${e.name}`,
        text:
          `Neue Kündigung über die Website.\n\nEingegangen: ${datum}, ${uhrzeit} Uhr\nReferenz: ${referenz}\n` +
          `In der Datenbank gespeichert: ${gespeichert ? "ja" : "NEIN – bitte selbst ablegen"}\n` +
          `Mitgliedschaft: ${mitglied}\n\n` +
          zeilen.map(([k, v]) => `${k}: ${v}`).join("\n") +
          `\n\n${offen}`,
        html:
          `<h2 style="font-family:sans-serif">Neue Kündigung ${referenz}</h2>` +
          `<p style="font-family:sans-serif">Eingegangen: ${datum}, ${uhrzeit} Uhr<br>` +
          `In der Datenbank gespeichert: <strong>${gespeichert ? "ja" : "NEIN – bitte selbst ablegen"}</strong><br>` +
          `Mitgliedschaft: ${escapeHtml(mitglied)}</p>` +
          `<p style="font-family:sans-serif;white-space:pre-wrap">${zeilen
            .map(([k, v]) => `<strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}`)
            .join("<br>")}</p>` +
          `<p style="font-family:sans-serif">${escapeHtml(offen)}</p>`,
      });
      if (error) throw error;
      benachrichtigt = true;
    } catch (err) {
      console.error("Kündigung-Benachrichtigung fehlgeschlagen:", err);
    }

    // 2) Kündigungsbestätigung an die Person (Textform, § 312k Abs. 4 BGB)
    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: e.email,
        replyTo: TO,
        subject: `Bestätigung deiner Kündigung (${referenz})`,
        text: bestaetigungsText(e, referenz, eingang, periodeEnde, site.email),
      });
      if (error) throw error;
      bestaetigungGesendet = true;
    } catch (err) {
      console.error("Kündigungsbestätigung fehlgeschlagen:", err);
    }
  }

  if (!gespeichert && !benachrichtigt) {
    return NextResponse.json(
      {
        ok: false,
        error: `Deine Kündigung konnte gerade nicht übermittelt werden. Bitte sende sie per E-Mail an ${site.email} – das ist genauso wirksam.`,
      },
      { status: 503 },
    );
  }

  // Bewusst ohne Vertragsende/Mitgliedschafts-Daten (siehe Kommentar oben).
  return NextResponse.json({ ok: true, referenz, eingang, bestaetigungGesendet });
}
