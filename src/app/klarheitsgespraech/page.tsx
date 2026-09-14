import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { KlarheitsgespraechForm } from "@/components/sections/KlarheitsgespraechForm";

/**
 * Öffentlicher Vorab-Fragebogen zum kostenlosen Klarheitsgespräch.
 *
 * Diese Seite ist der Link, den Heiko direkt an Interessenten schickt – vor Ort
 * oder per E-Mail –, wenn der Fragebogen noch nicht ausgefüllt wurde. Die
 * Antworten landen über `/api/klarheitsgespraech` in `erstgespraech_fragebogen`
 * und erscheinen dann automatisch im Admin-Cockpit unter „Offene Fragebögen".
 *
 * Bewusst `noindex`: Es ist ein direkt geteilter Link, keine Marketing-Seite,
 * die in Google auftauchen soll. Analog zu /impressum wird die Seite NICHT über
 * robots.ts gesperrt (damit Crawler das noindex-Tag lesen können) und steht
 * nicht in der Sitemap.
 *
 * Optionaler Query-Parameter `?q=` überschreibt die gespeicherte Herkunft
 * (Spalte `quelle`), z. B. `?q=vor-ort`. Ohne Parameter gilt „direktlink".
 */

export const metadata: Metadata = {
  title: "Fragebogen zum Klarheitsgespräch",
  description:
    "Ein paar ehrliche Fragen zur Vorbereitung deines kostenlosen Klarheitsgesprächs.",
  robots: { index: false, follow: false },
};

/** Herkunft aus dem Query-Parameter säubern (kurz, nur unbedenkliche Zeichen). */
function quelleAusParam(q: string | string[] | undefined): string {
  const roh = Array.isArray(q) ? q[0] : q;
  const sauber = (roh ?? "").trim().toLowerCase().replace(/[^a-z0-9_-]/g, "");
  return sauber ? sauber.slice(0, 60) : "direktlink";
}

export default async function KlarheitsgespraechPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const { q } = await searchParams;
  const quelle = quelleAusParam(q);

  return (
    <>
      <PageHero
        eyebrow="Vor unserem Gespräch"
        title={
          <>
            Ein paar <em className="accent">ehrliche Fragen</em> vorab
          </>
        }
        intro="Damit unser Klarheitsgespräch nicht mit Aufwärmen startet, sondern gleich bei dem, worum es dir wirklich geht. Nimm dir 5–10 Minuten. Es gibt keine falschen Antworten – je ehrlicher, desto wertvoller für dich."
      />

      <section className="bg-paper-aura grain-soft relative pt-10 pb-12 sm:pt-16 sm:pb-24">
        <Container size="narrow">
          <KlarheitsgespraechForm quelle={quelle} />
          <p className="mt-6 text-center text-xs text-ink-muted">
            Deine Angaben nutze ich ausschließlich zur Vorbereitung unseres
            Gesprächs. Sie werden nicht weitergegeben.
          </p>
        </Container>
      </section>
    </>
  );
}
