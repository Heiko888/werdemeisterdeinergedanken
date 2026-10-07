import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { ArrowRight } from "@/components/ui/Icon";
import { LessonHero } from "@/components/members/LessonHero";
import { memberEyebrow } from "@/lib/uiClasses";
import { soforthilfen } from "@/lib/soforthilfe";
import { getPractice } from "@/lib/practices";
import { getDeepDive } from "@/lib/deep-dives";
import { isBegleiterConfigured } from "@/app/mitglieder/begleiter/actions";

export const metadata: Metadata = {
  title: "Soforthilfe",
  robots: { index: false, follow: false },
};

/**
 * „Was ist gerade los?" – Soforthilfe für akute Momente.
 *
 * Zwei Taps statt Bibliothek: Situation antippen → ein Mini-Schritt für die
 * nächste Minute, eine passende geführte Übung und eine Vertiefung für später.
 * Bewusst ohne Client-JavaScript (<details>), damit es auch bei schlechtem Netz
 * sofort funktioniert. Krisennummern stehen sichtbar am Ende.
 */
export default async function SoforthilfePage() {
  const begleiterVerfuegbar = await isBegleiterConfigured();

  return (
    <>
      <LessonHero
        eyebrow="Soforthilfe"
        title="Was ist gerade los?"
        subtitle="Tipp an, was am ehesten passt. Du bekommst einen kleinen Schritt für die nächste Minute – und eine Übung, wenn du mehr Zeit hast."
      />

      <section className="py-12 sm:py-16">
        <Container size="narrow" className="flex flex-col gap-4">
          {soforthilfen.map((s) => {
            const practice = getPractice(s.practice);
            const practiceAlt = s.practiceAlt ? getPractice(s.practiceAlt) : undefined;
            const dive = getDeepDive(s.deepDive);
            return (
              <details
                key={s.slug}
                id={s.slug}
                className="group rounded-2xl border border-ink/10 bg-white shadow-card open:border-gold-500/35"
              >
                <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-left [&::-webkit-details-marker]:hidden">
                  <span className="font-display text-lg font-medium text-ink">
                    {s.label}
                  </span>
                  <ArrowRight className="shrink-0 text-ink-muted transition-transform duration-300 group-open:rotate-90" />
                </summary>
                <div className="flex flex-col gap-6 border-t border-ink/10 px-6 pb-7 pt-5">
                  <p className="text-[1.02rem] leading-relaxed text-ink-mid">
                    {s.anerkennung}
                  </p>

                  <div className="flex flex-col gap-3">
                    <span className={memberEyebrow}>Jetzt, in einer Minute</span>
                    <ol className="flex flex-col gap-3">
                      {s.sofort.map((step, i) => (
                        <li
                          key={step}
                          className="flex items-start gap-3 text-[0.98rem] leading-relaxed text-ink"
                        >
                          <span className="mt-0.5 inline-flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-accent/12 text-xs font-semibold text-accent">
                            {i + 1}
                          </span>
                          {step}
                        </li>
                      ))}
                    </ol>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className={memberEyebrow}>Wenn du mehr Zeit hast</span>
                    <div className="grid gap-3 sm:grid-cols-2">
                      {[practice, practiceAlt].filter(Boolean).map((p) => (
                        <Link
                          key={p!.slug}
                          href={`/mitglieder/praxis/${p!.slug}`}
                          className="group/card flex flex-col gap-1 rounded-xl border border-ink/10 bg-mist-50 p-4 transition-all hover:border-accent/35"
                        >
                          <span className="flex items-center justify-between gap-3">
                            <span className="font-medium text-ink group-hover/card:text-accent">
                              {p!.title}
                            </span>
                            <span className="shrink-0 text-xs font-semibold uppercase tracking-wider text-ink-muted">
                              {p!.duration}
                            </span>
                          </span>
                          <span className="text-sm leading-relaxed text-ink-mid">
                            {p!.summary}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    {dive && (
                      <Link
                        href={`/mitglieder/wissen/${dive.slug}`}
                        className="inline-flex min-h-11 items-center gap-2 font-medium text-accent underline-offset-4 hover:underline"
                      >
                        Später verstehen: {dive.title}
                        <ArrowRight />
                      </Link>
                    )}
                    {begleiterVerfuegbar && (
                      <Link
                        href="/mitglieder/begleiter"
                        className="inline-flex min-h-11 items-center gap-2 font-medium text-ink-mid underline-offset-4 hover:text-ink hover:underline"
                      >
                        Mit dem KI-Begleiter darüber sprechen
                        <ArrowRight />
                      </Link>
                    )}
                  </div>
                </div>
              </details>
            );
          })}

          {/* Krisenhinweis – immer sichtbar, ruhig, aber unmissverständlich */}
          <div
            role="note"
            className="mt-6 rounded-2xl border border-ink/15 bg-mist-100 p-6 text-[0.98rem] leading-relaxed text-ink"
          >
            <p className="font-medium">Wenn es mehr ist als ein schwerer Moment</p>
            <p className="mt-2 text-ink-mid">
              Diese Übungen ersetzen keine Therapie und keine Hilfe in einer
              akuten Krise. Die Telefonseelsorge ist rund um die Uhr kostenlos
              und anonym für dich da:{" "}
              <a href="tel:08001110111" className="font-medium text-ink underline underline-offset-4">
                0800 111 0 111
              </a>{" "}
              oder{" "}
              <a href="tel:08001110222" className="font-medium text-ink underline underline-offset-4">
                0800 111 0 222
              </a>
              . Österreich: 142 · Schweiz: 143 · Notfall: 112.
            </p>
          </div>
        </Container>
      </section>
    </>
  );
}
