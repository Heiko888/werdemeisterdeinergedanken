import { NextResponse } from "next/server";
import { cronAuthorized } from "@/lib/cron-auth";
import { runSequences } from "@/lib/sequence-mailer";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Täglicher Versand der E-Mail-Verkaufsstrecken (src/lib/sequences.ts).
 *
 * Verschickt an bestätigte Leads bzw. Buch-Käufer den jeweils nächsten
 * fälligen Schritt (Tag 0/1/3/5/7/9/11 bzw. 3/10/21). Idempotent über
 * public.lead_sequence_state – mehrfacher Aufruf am selben Tag schickt nichts
 * doppelt. Der wöchentliche Impuls-Lauf (/api/impulses) ruft dieselbe Logik
 * zusätzlich auf; dieser Endpoint sorgt für die tägliche Taktung.
 *
 * Geschützt wie /api/impulses: `Authorization: Bearer <CRON_SECRET>` oder
 * `?secret=<CRON_SECRET>`. Cron: siehe deploy/docker-compose.yml (impuls-cron).
 */
async function handle(request: Request) {
  if (!cronAuthorized(request)) {
    return NextResponse.json({ ok: false, error: "Nicht autorisiert." }, { status: 401 });
  }
  const result = await runSequences();
  if (!result.ok) {
    return NextResponse.json(result, { status: 503 });
  }
  return NextResponse.json(result);
}

export const GET = handle;
export const POST = handle;
