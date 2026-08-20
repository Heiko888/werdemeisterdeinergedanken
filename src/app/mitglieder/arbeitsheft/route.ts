import { getStaticPdf } from "@/lib/pdf/static-pdf";
import { guardMemberDownload } from "@/lib/members/download-guard";

// Session-abhängiger Zugriffsschutz → nicht statisch vorrendern.
export const dynamic = "force-dynamic";

/**
 * Gesamt-Arbeitsheft über alle 7 Stufen – gestaltetes PDF im Markendesign
 * (content/pdf/arbeitsheft.pdf), direkt zum Download.
 */
export async function GET(request: Request) {
  const denied = await guardMemberDownload(request);
  if (denied) return denied;

  const pdf = getStaticPdf("arbeitsheft");
  if (!pdf) return new Response("Nicht gefunden", { status: 404 });

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Arbeitsheft-Die-7-Stufen.pdf"',
      "Cache-Control": "public, max-age=0, must-revalidate",
    },
  });
}
