import { isRequestAdmin } from "@/lib/admin-guard";
import { getEbookLeads, toCsv } from "@/lib/admin-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isRequestAdmin())) {
    return new Response("Forbidden", { status: 403 });
  }
  const { rows } = await getEbookLeads();
  const csv = toCsv(
    [
      { key: "email", label: "E-Mail" },
      { key: "status", label: "Status" },
      { key: "source", label: "Quelle" },
      { key: "requested_at", label: "Eingetragen" },
      { key: "confirmed_at", label: "Bestätigt" },
      { key: "unsubscribed_at", label: "Abgemeldet" },
    ],
    rows,
  );
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="ebook-leads-${stamp}.csv"`,
    },
  });
}
