import { stages } from "@/lib/content";
import { worksheetSlug } from "@/lib/pdf/slug";
import { getStaticPdf } from "@/lib/pdf/static-pdf";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * Gratis-Kapitel zur Test-Stufe (Kampagnen-Check, Punkt 2).
 *
 * Streamt die Lektion der Stufe (content/pdf/stufe-<N>-lektion.pdf) OHNE Login –
 * das ist der Lead-Magnet auf der öffentlichen Ergebnisseite
 * /bewusstseinstest/ergebnis/<N>. Für Mitglieder bleibt die geschützte Route
 * /mitglieder/stufe/<N>/lektion unverändert; hier wird bewusst dieselbe Datei
 * per Streaming ausgeliefert statt einer Kopie unter public/ (die Dateien sind
 * groß und lägen dort ungeschützt an jeder Prüfung vorbei).
 *
 * Nicht indexieren (X-Robots-Tag) – der Link soll über Test und Mail kommen.
 */
export async function GET(
  _request: Request,
  { params }: { params: Promise<{ stufe: string }> },
) {
  const { stufe } = await params;
  const idx = Number(stufe) - 1;

  if (!/^[1-7]$/.test(stufe) || !Number.isInteger(idx) || idx < 0 || idx >= stages.length) {
    return new Response("Nicht gefunden", { status: 404 });
  }

  const stage = stages[idx];
  const pdf = getStaticPdf(`stufe-${idx + 1}-lektion`);
  if (!pdf) return new Response("Nicht gefunden", { status: 404 });

  const filename = `Gratis-Kapitel-Stufe-${stage.number}-${worksheetSlug(stage.title)}.pdf`;

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `attachment; filename="${filename}"`,
      "Cache-Control": "public, max-age=3600",
      "X-Robots-Tag": "noindex",
    },
  });
}
