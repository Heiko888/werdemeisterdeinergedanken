import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { WiderrufForm } from "@/components/sections/WiderrufForm";
import { site } from "@/lib/site";
import { withCanonical } from "@/lib/seo";
import { WIDERRUF_BESTAETIGEN } from "@/lib/widerruf";

/**
 * Widerrufsfunktion – öffentlich, ohne Login, dauerhaft über den Footer
 * („Vertrag hier widerrufen“) erreichbar. Logik: src/lib/widerruf.ts,
 * Annahme: /api/widerruf. Bewusst noindex: Funktionsseite, keine Landingpage.
 */
export const metadata: Metadata = withCanonical("/widerruf", {
  title: "Vertrag widerrufen",
  description: "Widerrufe hier einen Vertrag, den du über diese Website geschlossen hast.",
  robots: { index: false, follow: true },
});

export default function WiderrufPage() {
  return (
    <>
      <PageHero
        eyebrow="Widerruf"
        title={
          <>
            Vertrag <em className="accent">widerrufen</em>
          </>
        }
        intro={`Hier kannst du einen Vertrag widerrufen, den du über diese Website geschlossen hast. Gib deine Angaben ein und klicke auf „${WIDERRUF_BESTAETIGEN}“ – du bekommst sofort eine Eingangsbestätigung per E-Mail.`}
      />

      <section className="bg-paper-aura grain-soft relative pt-10 pb-12 sm:pt-16 sm:pb-24">
        <Container size="narrow" className="flex flex-col gap-6">
          <WiderrufForm />
          <p className="text-center text-sm leading-relaxed text-ink-muted">
            Du kannst deinen Widerruf auch formlos per E-Mail an{" "}
            <a href={`mailto:${site.email}`} className="break-all text-accent underline-offset-2 hover:underline">
              {site.email}
            </a>{" "}
            senden.
          </p>
        </Container>
      </section>
    </>
  );
}
