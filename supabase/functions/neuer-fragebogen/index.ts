// Benachrichtigung bei neuem Fragebogen zum Klarheitsgespraech
// Wird von einem Datenbank-Trigger auf public.erstgespraech_fragebogen aufgerufen.
//
// Benoetigte Secrets (Supabase Dashboard -> Edge Functions -> Secrets):
//   RESEND_API_KEY     Schluessel von resend.com
//   WEBHOOK_SECRET     dasselbe Geheimnis, das im Trigger hinterlegt ist
//   BENACHRICHTIGUNG_AN   optional, Standard: heiko.schwaninger@outlook.com
//   ABSENDER              optional, Standard: onboarding@resend.dev

import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const STUFEN: Record<number, string> = {
  1: "1 · Autopilot",
  2: "2 · Erwachen",
  3: "3 · Selbstbeobachtung",
  4: "4 · Emotionale Reifung",
  5: "5 · Schöpferkraft",
  6: "6 · Innere Ausrichtung",
  7: "7 · Meisterschaft",
};

function escape(text: unknown): string {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function absatz(text: unknown): string {
  return escape(text).replace(/\n/g, "<br>");
}

function block(frage: string, antwort: unknown): string {
  if (!antwort) return "";
  return `
    <tr><td style="padding:18px 0 0 0;border-top:1px solid #dbe3e0;">
      <div style="font:600 12px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.08em;text-transform:uppercase;color:#6a7975;padding-bottom:6px;">${escape(frage)}</div>
      <div style="font:400 16px/1.6 Georgia,serif;color:#131b1a;">${absatz(antwort)}</div>
    </td></tr>`;
}

Deno.serve(async (req: Request) => {
  if (req.method !== "POST") {
    return new Response("Method not allowed", { status: 405 });
  }

  // Eigene Zugangspruefung: nur der Datenbank-Trigger kennt dieses Geheimnis.
  const erwartet = Deno.env.get("WEBHOOK_SECRET");
  const geliefert = req.headers.get("x-webhook-secret");
  if (!erwartet || geliefert !== erwartet) {
    return new Response("Unauthorized", { status: 401 });
  }

  const apiKey = Deno.env.get("RESEND_API_KEY");
  if (!apiKey) {
    console.error("RESEND_API_KEY fehlt");
    return new Response("RESEND_API_KEY fehlt", { status: 500 });
  }

  const empfaenger = Deno.env.get("BENACHRICHTIGUNG_AN") ?? "heiko.schwaninger@outlook.com";
  const absender = Deno.env.get("ABSENDER") ?? "Werde Meister deiner Gedanken <onboarding@resend.dev>";

  let eintrag: Record<string, unknown>;
  try {
    const body = await req.json();
    eintrag = (body?.record ?? body) as Record<string, unknown>;
  } catch (_e) {
    return new Response("Ungueltiger Body", { status: 400 });
  }

  const name = String(eintrag.name ?? "Unbekannt");
  const email = String(eintrag.email ?? "");
  const stufe = typeof eintrag.stufe === "number" ? STUFEN[eintrag.stufe] : "keine Angabe";

  const betreff = `Neuer Fragebogen: ${name}`;

  const html = `<!doctype html>
<html lang="de"><body style="margin:0;background:#f6f8f7;padding:28px 16px;">
  <table role="presentation" cellpadding="0" cellspacing="0" style="max-width:600px;margin:0 auto;background:#ffffff;border:1px solid #dbe3e0;border-radius:4px;">
    <tr><td style="padding:28px 28px 20px 28px;">
      <div style="font:600 12px/1.4 -apple-system,Segoe UI,sans-serif;letter-spacing:.16em;text-transform:uppercase;color:#0f5c56;">Klarheitsgespräch</div>
      <h1 style="margin:10px 0 0 0;font:400 28px/1.2 Georgia,serif;color:#131b1a;">${escape(name)}</h1>
      <div style="font:400 15px/1.6 -apple-system,Segoe UI,sans-serif;color:#3e4c4a;padding-top:4px;">
        <a href="mailto:${escape(email)}" style="color:#0f5c56;">${escape(email)}</a><br>
        Selbsteinschätzung: ${escape(stufe)}
      </div>
    </td></tr>
    <tr><td style="padding:0 28px 28px 28px;">
      <table role="presentation" cellpadding="0" cellspacing="0" width="100%">
        ${block("Warum jetzt?", eintrag.anlass)}
        ${block("Wiederkehrendes Muster", eintrag.muster)}
        ${block("Bisher versucht", eintrag.versucht)}
        ${block("Was sich ändern dürfte", eintrag.veraenderung)}
        ${block("Sonstiges", eintrag.sonstiges)}
      </table>
    </td></tr>
    <tr><td style="padding:18px 28px 24px 28px;border-top:1px solid #dbe3e0;font:400 13px/1.6 -apple-system,Segoe UI,sans-serif;color:#6a7975;">
      Eingegangen über: ${escape(eintrag.quelle ?? "unbekannt")}<br>
      Lies das vor dem Termin — und markier dir zwei wörtliche Sätze daraus.
    </td></tr>
  </table>
</body></html>`;

  const text = [
    `Neuer Fragebogen: ${name}`,
    email,
    `Selbsteinschätzung: ${stufe}`,
    "",
    `Warum jetzt?\n${eintrag.anlass ?? ""}`,
    "",
    `Wiederkehrendes Muster\n${eintrag.muster ?? ""}`,
    "",
    `Bisher versucht\n${eintrag.versucht ?? ""}`,
    "",
    `Was sich ändern dürfte\n${eintrag.veraenderung ?? ""}`,
    eintrag.sonstiges ? `\nSonstiges\n${eintrag.sonstiges}` : "",
  ].join("\n");

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: absender,
      to: [empfaenger],
      reply_to: email || undefined,
      subject: betreff,
      html,
      text,
    }),
  });

  if (!res.ok) {
    const fehler = await res.text();
    console.error("Resend-Fehler:", res.status, fehler);
    return new Response(JSON.stringify({ ok: false, status: res.status, fehler }), {
      status: 502,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify({ ok: true }), {
    headers: { "Content-Type": "application/json" },
  });
});
