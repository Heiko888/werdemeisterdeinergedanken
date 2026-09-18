import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { sendEbookDeliveryMail } from "@/lib/ebook-mail";
import { site } from "@/lib/site";
import { ebookDownloadUrl } from "@/lib/ebook-download";
import { sendSequenceStep } from "@/lib/sequence-mailer";
import { testLeadSequence } from "@/lib/sequences";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Double-Opt-in-Bestätigung: bestätigt die Anmeldung über den Token aus der
 * Bestätigungsmail und löst den Versand des E-Books aus.
 *
 * Das E-Book wird nur beim Übergang pending → confirmed verschickt. So lösen
 * Link-Vorschauen/Scanner, die den Link mehrfach abrufen, keinen doppelten
 * Versand aus – ein erneuter Aufruf zeigt nur die Erfolgsseite.
 *
 * Leads aus dem Bewusstseinstest (Spalte `stufe` gesetzt, /api/test-lead)
 * nutzen dieselbe Bestätigung: Statt der E-Book-Lieferung geht die Tag-0-Mail
 * der Verkaufsstrecke raus (Ergebnis + Gratis-Kapitel, idempotent über
 * lead_sequence_state) und der Browser landet direkt auf der Ergebnisseite
 * /bewusstseinstest/ergebnis/<stufe>. Hat dieselbe Adresse vorher auch das
 * E-Book angefordert (source ≠ bewusstseinstest), wird es zusätzlich geliefert.
 */

function htmlPage(
  title: string,
  message: string,
  status = 200,
  downloadToken?: string,
) {
  // Der Direkt-Download braucht das Token des bestätigten Leads; ohne Token
  // bleibt es beim Link zur Website (/ebook antwortet sonst mit 404).
  const download = downloadToken
    ? ` <a href="${ebookDownloadUrl(downloadToken)}" style="margin-left:.5rem;color:#3a7a1c">E-Book direkt herunterladen</a>`
    : "";
  const cta =
    status === 200
      ? `<p style="margin-top:1.5rem"><a href="${site.url}" style="display:inline-block;background:#141b2b;color:#fff;text-decoration:none;font-weight:600;font-size:15px;padding:12px 22px;border-radius:999px">Zur Website</a>${download}</p>`
      : "";
  const body = `<!doctype html><html lang="de"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex"><title>${title}</title></head><body style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;max-width:32rem;margin:4rem auto;padding:0 1.5rem;line-height:1.6;color:#1a2233"><p style="font-size:12px;letter-spacing:.15em;text-transform:uppercase;color:#7a869a;margin:0 0 .75rem">${site.name}</p><h1 style="font-size:1.4rem;margin:0 0 .75rem">${title}</h1><p style="color:#4a5568;margin:0">${message}</p>${cta}</body></html>`;
  return new NextResponse(body, {
    status,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

export async function GET(request: Request) {
  const token = new URL(request.url).searchParams.get("token");
  if (!token) {
    return htmlPage(
      "Link unvollständig",
      "Der Bestätigungslink ist nicht vollständig. Bitte nutze den Link aus der E-Mail unverändert.",
      400,
    );
  }

  const admin = createAdminClient();
  if (!admin) {
    return htmlPage(
      "Gerade nicht möglich",
      "Die Bestätigung ist momentan nicht möglich. Bitte versuch es später noch einmal.",
      503,
    );
  }

  const { data: lead, error } = await admin
    .from("ebook_leads")
    .select("id, email, status, unsubscribe_token, stufe, source")
    .eq("confirm_token", token)
    .maybeSingle();

  if (error || !lead) {
    return htmlPage(
      "Link ungültig oder abgelaufen",
      "Wir konnten keine passende Anmeldung finden. Fordere das E-Book bei Bedarf einfach erneut an.",
      404,
    );
  }

  const stufe = typeof lead.stufe === "number" ? lead.stufe : null;
  const isTestLead = stufe != null && stufe >= 1 && stufe <= 7;
  const ergebnisUrl = `${site.url}/bewusstseinstest/ergebnis/${stufe}?bestaetigt=1`;

  // Schon bestätigt → nicht erneut senden (schützt vor Link-Vorschau-Doppelversand).
  if (lead.status === "confirmed") {
    if (isTestLead && lead.source === "bewusstseinstest") {
      return NextResponse.redirect(ergebnisUrl, 303);
    }
    return htmlPage(
      "Schon bestätigt",
      "Deine Anmeldung ist bereits bestätigt – das E-Book ist unterwegs bzw. schon in deinem Postfach. Über den Link unten kannst du es auch direkt laden.",
      200,
      token,
    );
  }

  const confirmIp =
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    null;

  const { error: updErr } = await admin
    .from("ebook_leads")
    .update({
      status: "confirmed",
      confirmed_at: new Date().toISOString(),
      confirm_ip: confirmIp,
    })
    .eq("id", lead.id);

  if (updErr) {
    console.error("Lead-Bestätigung fehlgeschlagen:", updErr);
    return htmlPage(
      "Gerade nicht möglich",
      "Die Bestätigung ist momentan nicht möglich. Bitte versuch es später noch einmal.",
      500,
    );
  }

  const apiKey = process.env.RESEND_API_KEY;

  // Test-Lead: Tag-0-Mail (Ergebnis + Kapitel) und Weiterleitung zur
  // Ergebnisseite. Versandfehler sind unkritisch – die Seite zeigt alles.
  if (isTestLead) {
    if (apiKey) {
      try {
        await sendSequenceStep(
          admin,
          new Resend(apiKey),
          {
            id: String(lead.id),
            email: String(lead.email),
            stufe,
            unsubscribe_token: String(lead.unsubscribe_token),
          },
          testLeadSequence,
          0,
        );
      } catch (err) {
        console.error("Ergebnis-Mail nach Bestätigung fehlgeschlagen:", err);
      }
    }
    // Reiner Test-Lead → direkt zur Ergebnisseite. Wer vorher auch das E-Book
    // wollte, bekommt es unten noch geliefert und sieht die Bestätigungsseite.
    if (lead.source === "bewusstseinstest") {
      return NextResponse.redirect(ergebnisUrl, 303);
    }
  }

  if (apiKey) {
    const unsubUrl = `${site.url}/api/ebook/unsubscribe?token=${lead.unsubscribe_token}`;
    try {
      await sendEbookDeliveryMail(
        new Resend(apiKey),
        lead.email as string,
        unsubUrl,
        token,
      );
    } catch (err) {
      // Bestätigung ist gespeichert – Lieferung per Mail nur unkritisch
      // fehlgeschlagen. Direkt-Download auf der Seite fängt das ab.
      console.error("E-Book-Lieferung nach Bestätigung fehlgeschlagen:", err);
      return htmlPage(
        "Anmeldung bestätigt",
        "Danke! Der E-Mail-Versand klemmt gerade – du kommst über den Link unten aber sofort an dein E-Book.",
        200,
        token,
      );
    }
  }

  return htmlPage(
    "Anmeldung bestätigt – dein E-Book ist unterwegs 🌱",
    "Danke fürs Bestätigen! Wir haben dir dein E-Book gerade per E-Mail geschickt. Schau in dein Postfach (und ggf. in den Spam-Ordner). Du kannst es auch direkt hier laden.",
    200,
    token,
  );
}
