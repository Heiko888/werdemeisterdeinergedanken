import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icon";
import { practicesByCategory } from "@/lib/practices";

export const metadata: Metadata = {
  title: "Praxis",
  robots: { index: false, follow: false },
};

// Übersicht aller Praxisübungen (Meditationen, Atemübungen, Rituale).
// Einstiegspunkt hinter dem Link „Zur Praxis" aus Wissensdatenbank & Co.
export default function PraxisIndexPage() {
  const groups = practicesByCategory();

  return (
    <>
      <PageHero
        eyebrow="Gelebte Praxis"
        title="Praxis"
        intro="Was die Stufen wirksam macht: geführte Meditationen, Atemübungen und Rituale für den Alltag – jede mit klarer Schritt-für-Schritt-Anleitung."
        // Vollflächiges Naturmotiv (Yogamatte, Trinkflasche, Steinturm vor
        // Bergpanorama). Ohne zentrales Symbol – der formatfüllende
        // object-cover-Zuschnitt ist hier gewollt (kein object-contain nötig).
        image="/hero-praxis.png"
      />

      <section className="py-14 sm:py-18">
        <Container>
          <Link
            href="/mitglieder"
            className="-mx-2 mb-8 inline-flex items-center gap-2 rounded-lg px-2 py-2 text-sm text-ink-mid transition-colors hover:text-ink"
          >
            <ArrowRight className="rotate-180" />
            Zu meinem Bereich
          </Link>

          {groups.map((group) => (
            <div key={group.category} className="mt-10 first:mt-0">
              <h2 className="text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-ink-muted">
                {group.category}
              </h2>
              <div className="mt-4 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {group.items.map((practice) => (
                  <Link
                    key={practice.slug}
                    href={`/mitglieder/praxis/${practice.slug}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-ink/10 bg-white shadow-card transition-all duration-300 hover:-translate-y-1 hover:border-accent/30"
                  >
                    <div className="relative aspect-video w-full overflow-hidden bg-navy-900">
                      <Image
                        src={`/video-thumbnails/praxis/${practice.slug}.png`}
                        alt=""
                        aria-hidden
                        fill
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                      />
                    </div>
                    <div className="flex flex-col gap-2 p-6">
                      <div className="flex items-start justify-between gap-3">
                        <h3 className="text-lg font-medium text-ink transition-colors group-hover:text-accent">
                          {practice.title}
                        </h3>
                        <span className="mt-0.5 shrink-0 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                          {practice.duration}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed text-ink-mid">
                        {practice.summary}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </Container>
      </section>
    </>
  );
}
