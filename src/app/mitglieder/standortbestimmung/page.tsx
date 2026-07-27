import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { ArrowRight } from "@/components/ui/Icon";
import { ConsciousnessTest } from "@/components/sections/ConsciousnessTest";
import { getTestHistory } from "@/app/bewusstseinstest/actions";
import { getTestStage } from "@/lib/consciousness-test";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Standortbestimmung",
  robots: { index: false, follow: false },
};

function formatDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString("de-DE", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });
}

export default async function StandortbestimmungPage() {
  const history = await getTestHistory();

  return (
    <>
      {/* Kopf */}
      <section className="grain relative overflow-hidden border-b border-ink/10 py-14 sm:py-16">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10"
          style={{
            background:
              "radial-gradient(55% 45% at 50% 0%, color-mix(in oklab, var(--color-teal-500) 12%, transparent), transparent 65%)",
          }}
        />
        <Container size="narrow" className="flex flex-col items-start gap-4">
          <Link
            href="/mitglieder"
            className="inline-flex items-center gap-2 text-sm text-ink-soft/70 transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Mein Bereich
          </Link>
          <Eyebrow>Standortbestimmung</Eyebrow>
          <h1 className="text-[2rem] font-medium leading-[1.1] text-ink sm:text-4xl">
            Wo stehst du <em className="accent">gerade</em>?
          </h1>
          <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft/75">
            {history.length > 0
              ? "Mach den Test erneut, um deinen aktuellen Standort festzuhalten. Dein Ergebnis wird gespeichert – so siehst du weiter unten, wie sich dein Weg über die Zeit verändert."
              : "21 ehrliche Fragen zeigen dir deine aktuelle Hauptstufe. Dein Ergebnis wird in deinem Bereich gespeichert und personalisiert dein Dashboard."}
          </p>
        </Container>
      </section>

      {/* Test */}
      <section className="py-12 sm:py-16">
        <ConsciousnessTest />
      </section>

      {/* Verlauf */}
      {history.length > 0 && (
        <section className="border-t border-ink/10 py-14 sm:py-16">
          <Container size="narrow" className="flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Dein Verlauf
              </span>
              <h2 className="font-display text-2xl font-medium text-ink">
                Deine bisherigen Ergebnisse
              </h2>
              <p className="max-w-xl text-[1.02rem] leading-relaxed text-ink-soft/75">
                Entwicklung ist selten linear – dieser Verlauf hält fest, wo du
                zu welchem Zeitpunkt gestanden hast.
              </p>
            </div>

            <ol className="flex flex-col gap-3">
              {history.map((entry, i) => {
                const stage = getTestStage(entry.topStage);
                const isCurrent = i === 0;
                return (
                  <li
                    key={`${entry.takenAt}-${i}`}
                    className={`flex items-center justify-between gap-4 rounded-2xl border bg-white p-5 shadow-card ${
                      isCurrent ? "border-accent/40" : "border-ink/10"
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <span className="font-display text-2xl italic text-accent">
                        {String(entry.topStage).padStart(2, "0")}
                      </span>
                      <div className="flex flex-col">
                        <span className="font-medium text-ink">
                          {stage ? stage.name : `Stufe ${entry.topStage}`}
                        </span>
                        <span className="text-sm text-ink-soft/60">
                          {formatDate(entry.takenAt)}
                        </span>
                      </div>
                    </div>
                    {isCurrent && (
                      <span className="shrink-0 rounded-full border border-accent/30 bg-accent/[0.08] px-3 py-1 text-[0.7rem] font-semibold uppercase tracking-wider text-accent">
                        Aktuell
                      </span>
                    )}
                  </li>
                );
              })}
            </ol>
          </Container>
        </section>
      )}
    </>
  );
}
