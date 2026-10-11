import { NextResponse } from "next/server";
import { randomUUID } from "node:crypto";
import { Resend } from "resend";
import { site } from "@/lib/site";
import { createAdminClient } from "@/lib/supabase/admin";
import { isRateLimited, clientIp } from "@/lib/rate-limit";
import {
  WIDERRUF_PRODUKTE,
  angabenZeilen,
  bestaetigungsText,
  formatEingang,
  neueReferenz,
  pruefeWiderruf,
  type WiderrufEingabe,
} from "@/lib/widerruf";

export const runtime = "nodejs";

/**
 * Widerrufsfunktion – nimmt einen Widerruf an (siehe src/lib/widerruf.ts).
 *
 * 1. Prüft die Angaben (dieselbe Prüfung wie im Formular).
 * 2. Speichert den Widerruf mit Eingangszeitpunkt und Referenz in
 *    `widerrufe` (Übersicht unter /admin/widerrufe).
 * 3. Benachrichtigt Heiko und schickt der Person eine Eingangsbestätigung per
 *    E-Mail (Inhalt des Widerrufs, Datum und Uhrzeit des Eingangs).
 *
 * Ein Widerruf darf nie still verloren gehen: Klappt weder Speichern noch
 * Mailversand, antwortet die Route mit einem Fehler und nennt die
 * E-Mail-Adresse als Ausweg. Ist nur der Versand der Bestätigung
 * gescheitert, ist der Widerruf trotzdem eingegangen – die Antwort sagt das
 * ehrlich (`bestaetigungGesendet: false`).
 *
 * Absender/Empfänger wie beim Kontaktformular: CONTACT_FROM, CONTACT_TO.
 */
const FROM =
  process.env.CONTACT_FROM ||
  "Werde Meister deiner Gedanken <onboarding@resend.dev>";
const TO = process.env.CONTACT_TO || site.email;

// Großzügiger als beim Kontaktformular – ein Widerruf darf nicht an der
// Bremse scheitern, Bots sollen das Postfach trotzdem nicht fluten können.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 10;

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

async function speichern(
  e: WiderrufEingabe,
  referenz: string,
  eingang: string,
  ip: string,
): Promise<boolean> {
  const admin = createAdminClient();
  if (!admin) return false;
  try {
    const { error } = await admin.from("widerrufe").insert({
      referenz,
      name: e.name,
      email: e.email,
      produkt: e.produkt,
      bestellung: e.bestellung || null,
      nachricht: e.nachricht || null,
      eingegangen_at: eingang,
      request_ip: ip,
    });
    if (error) {
      console.error("widerrufe insert error", error);
      return false;
    }
    return true;
  } catch (err) {
    console.error("widerrufe insert failed", err);
    return false;
  }
}

export async function POST(request: Request) {
  const ip = clientIp(request);
  if (await isRateLimited("widerruf", ip, RATE_MAX, RATE_WINDOW_MS)) {
    return NextResponse.json(
      {
        ok: false,
        error: `Zu viele Anfragen in kurzer Zeit. Bitte versuch es gleich noch einmal oder sende deinen Widerruf per E-Mail an ${site.email}.`,
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
    return NextResponse.json({ ok: true, referenz: "WR-00000000", eingang: new Date().toISOString(), bestaetigungGesendet: true });
  }

  const pruefung = pruefeWiderruf(roh);
  if (!pruefung.ok) {
    return NextResponse.json({ ok: false, error: pruefung.fehler }, { status: 400 });
  }
  const e = pruefung.eingabe;
  const eingang = new Date().toISOString();
  const referenz = neueReferenz(randomUUID());

  const gespeichert = await speichern(e, referenz, eingang, ip);

  let benachrichtigt = false;
  let bestaetigungGesendet = false;
  const apiKey = process.env.RESEND_API_KEY;
  if (apiKey) {
    const resend = new Resend(apiKey);
    const { datum, uhrzeit } = formatEingang(eingang);
    const zeilen = angabenZeilen(e);

    // 1) Benachrichtigung an Heiko
    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: TO,
        replyTo: e.email,
        subject: `Widerruf ${referenz}: ${WIDERRUF_PRODUKTE[e.produkt]} – ${e.name}`,
        text:
          `Neuer Widerruf über die Website.\n\nEingegangen: ${datum}, ${uhrzeit} Uhr\nReferenz: ${referenz}\n` +
          `In der Datenbank gespeichert: ${gespeichert ? "ja" : "NEIN – bitte selbst ablegen"}\n\n` +
          zeilen.map(([k, v]) => `${k}: ${v}`).join("\n"),
        html:
          `<h2 style="font-family:sans-serif">Neuer Widerruf ${referenz}</h2>` +
          `<p style="font-family:sans-serif">Eingegangen: ${datum}, ${uhrzeit} Uhr<br>` +
          `In der Datenbank gespeichert: <strong>${gespeichert ? "ja" : "NEIN – bitte selbst ablegen"}</strong></p>` +
          `<p style="font-family:sans-serif;white-space:pre-wrap">${zeilen
            .map(([k, v]) => `<strong>${escapeHtml(k)}:</strong> ${escapeHtml(v)}`)
            .join("<br>")}</p>`,
      });
      if (error) throw error;
      benachrichtigt = true;
    } catch (err) {
      console.error("Widerruf-Benachrichtigung fehlgeschlagen:", err);
    }

    // 2) Eingangsbestätigung an die Person (dauerhafter Datenträger)
    try {
      const { error } = await resend.emails.send({
        from: FROM,
        to: e.email,
        replyTo: TO,
        subject: `Eingangsbestätigung deines Widerrufs (${referenz})`,
        text: bestaetigungsText(e, referenz, eingang, site.email),
      });
      if (error) throw error;
      bestaetigungGesendet = true;
    } catch (err) {
      console.error("Widerruf-Eingangsbestätigung fehlgeschlagen:", err);
    }
  }

  // Weder gespeichert noch bei Heiko angekommen → nicht als Erfolg melden.
  if (!gespeichert && !benachrichtigt) {
    return NextResponse.json(
      {
        ok: false,
        error: `Dein Widerruf konnte gerade nicht übermittelt werden. Bitte sende ihn per E-Mail an ${site.email} – das ist genauso wirksam.`,
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ ok: true, referenz, eingang, bestaetigungGesendet });
}
