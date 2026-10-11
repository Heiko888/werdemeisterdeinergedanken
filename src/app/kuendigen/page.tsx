import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { KuendigungForm } from "@/components/sections/KuendigungForm";
import { site } from "@/lib/site";
import { withCanonical } from "@/lib/seo";
import { MITGLIEDSCHAFT_AKTIV } from "@/lib/membership-launch";
import { KUENDIGUNG_BESTAETIGEN } from "@/lib/kuendigung";

/**
 * Bestätigungsseite des Kündigungsbuttons (§ 312k BGB) – öffentlich, ohne
 * Login, über den Footer („Verträge hier kündigen“) erreichbar, sobald die
 * Mitgliedschaft buchbar ist (MITGLIEDSCHAFT_AKTIV). Logik:
 * src/lib/kuendigung.ts, Annahme: /api/kuendigung. Bewusst noindex.
 */
export const metadata: Metadata = withCanonical("/kuendigen", {
  title: "Verträge kündigen",
  description: "Kündige hier deine Mitgliedschaft – ohne Login.",
  robots: { index: false, follow: true },
});

export default function KuendigenPage() {
  if (!MITGLIEDSCHAFT_AKTIV) notFound();

  return (
    <>
      <PageHero
        eyebrow="Kündigung"
        title={
          <>
            Vertrag <em className="accent">kündigen</em>
          </>
        }
        intro={`Hier kannst du deine Mitgliedschaft kündigen – ohne Login. Gib deine Angaben ein und klicke auf „${KUENDIGUNG_BESTAETIGEN}“. Du bekommst sofort eine Bestätigung mit Datum und Uhrzeit des Eingangs per E-Mail.`}
      />

      <section className="bg-paper-aura grain-soft relative pt-10 pb-12 sm:pt-16 sm:pb-24">
        <Container size="narrow" className="flex flex-col gap-6">
          <KuendigungForm />
          <p className="text-center text-sm leading-relaxed text-ink-muted print:hidden">
            Bist du angemeldet, kannst du dein Abo auch unter{" "}
            <a href="/mitglieder/einstellungen" className="text-accent underline-offset-2 hover:underline">
              Einstellungen
            </a>{" "}
            verwalten. Du kannst deine Kündigung außerdem formlos per E-Mail an{" "}
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
