import { isRequestAdmin } from "@/lib/admin-guard";
import { getKontaktAnfragen, toCsv } from "@/lib/admin-data";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  if (!(await isRequestAdmin())) {
    return new Response("Forbidden", { status: 403 });
  }
  const { rows } = await getKontaktAnfragen();
  const csv = toCsv(
    [
      { key: "created_at", label: "Eingegangen" },
      { key: "name", label: "Name" },
      { key: "email", label: "E-Mail" },
      { key: "thema", label: "Thema" },
      { key: "message", label: "Nachricht" },
      { key: "status", label: "Status" },
    ],
    rows,
  );
  const stamp = new Date().toISOString().slice(0, 10);
  return new Response(csv, {
    headers: {
      "content-type": "text/csv; charset=utf-8",
      "content-disposition": `attachment; filename="kontaktanfragen-${stamp}.csv"`,
    },
  });
}
