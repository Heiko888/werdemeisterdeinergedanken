import { isRequestAdmin } from "@/lib/admin-guard";
import { getBookOrders, toCsv } from "@/lib/admin-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isRequestAdmin())) {
    return new Response("Forbidden", { status: 403 });
  }
  const { rows } = await getBookOrders();
  const csv = toCsv(
    [
      { key: "created_at", label: "Datum" },
      { key: "email", label: "E-Mail" },
      { key: "edition", label: "Edition" },
      { key: "amount_total", label: "Betrag (Cent)" },
      { key: "currency", label: "Währung" },
      { key: "status", label: "Status" },
      { key: "shipping_name", label: "Empfänger" },
      { key: "shipping_address", label: "Lieferadresse" },
      { key: "stripe_session_id", label: "Stripe-Session" },
    ],
    rows,
  );
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="buch-bestellungen-${stamp}.csv"`,
    },
  });
}
