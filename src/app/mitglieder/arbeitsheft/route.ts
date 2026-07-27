import { getStaticPdf } from "@/lib/pdf/static-pdf";

export const dynamic = "force-static";

/**
 * Gesamt-Arbeitsheft über alle 7 Stufen – gestaltetes PDF im Markendesign
 * (public/pdf/arbeitsheft.pdf), direkt zum Download.
 */
export async function GET() {
  const pdf = getStaticPdf("arbeitsheft");
  if (!pdf) return new Response("Nicht gefunden", { status: 404 });

  return new Response(pdf as BodyInit, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition":
        'attachment; filename="Arbeitsheft-Die-7-Stufen.pdf"',
      "Cache-Control": "public, max-age=3600",
    },
  });
}
