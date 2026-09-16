import { isRequestAdmin } from "@/lib/admin-guard";
import { getMemberships, toCsv } from "@/lib/admin-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isRequestAdmin())) {
    return new Response("Forbidden", { status: 403 });
  }
  const { rows } = await getMemberships();
  const csv = toCsv(
    [
      { key: "email", label: "E-Mail" },
      { key: "status", label: "Status" },
      { key: "current_period_end", label: "Läuft bis" },
      { key: "created_at", label: "Seit" },
      { key: "stripe_customer_id", label: "Stripe-Kunde" },
      { key: "stripe_subscription_id", label: "Stripe-Abo" },
    ],
    rows,
  );
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="mitglieder-${stamp}.csv"`,
    },
  });
}
