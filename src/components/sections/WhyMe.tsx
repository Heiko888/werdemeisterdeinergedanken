import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowLink } from "@/components/ui/ArrowLink";
import { values } from "@/lib/content";
import heikoPortrait from "../../../public/heiko-portrait.webp";

export function WhyMe() {
  return (
    <section className="bg-paper-aura grain-soft relative border-t border-ink/10 py-16 sm:py-32">
      <Container className="grid gap-16 lg:grid-cols-[1fr_0.85fr]">
        {/* Story */}
        <Reveal>
          <div className="flex flex-col items-start gap-6">
            <div className="flex items-baseline gap-3">
              <span className="font-display text-sm italic text-ink-mid">
                03
              </span>
              <Eyebrow>Warum ich das mache</Eyebrow>
            </div>
            <h2 className="text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
              Ich war selbst gefangen{" "}
              <em className="accent">in meinem Kopf</em>
            </h2>
            <div className="flex flex-col gap-4 text-[1.05rem] leading-relaxed text-ink-mid">
              <p>
                Jahrelang habe ich funktioniert – und trotzdem gespürt, dass mich
                etwas von innen bremst. Grübeln, Selbstzweifel, alte Muster, die
                sich immer wiederholten. Bis ich verstanden habe: Ich bin nicht
                meine Gedanken. Ich kann lernen, sie zu meistern.
              </p>
              <p>
                Dieser Weg hat mein Leben verändert. Heute begleite ich Menschen
                dabei, denselben Schritt zu gehen – bodenständig, ehrlich und ohne
                Umwege über spirituelle Floskeln.
              </p>
            </div>

            <div className="mt-2 flex items-center gap-4">
              <span className="relative h-20 w-20 shrink-0 overflow-hidden rounded-full border border-ink/10 shadow-soft">
                <Image
                  src={heikoPortrait}
                  alt="Heiko Schwaninger"
                  fill
                  sizes="80px"
                  className="object-cover object-top"
                />
              </span>
              <div>
                <p className="font-display text-lg italic text-ink">
                  Heiko Schwaninger
                </p>
                <p className="text-sm text-ink-muted">
                  Begleiter für mentale Entprogrammierung
                </p>
              </div>
            </div>

            <ArrowLink href="/ueber-mich" className="mt-1">
              Meine ganze Geschichte
            </ArrowLink>
          </div>
        </Reveal>

        {/* Werte */}
        <Reveal delay={120}>
          <div className="flex flex-col gap-6">
            <Eyebrow>Was mich leitet</Eyebrow>
            <ul className="flex flex-col">
              {values.map((v, i) => (
                <li
                  key={v.title}
                  className="flex gap-5 border-t border-ink/10 py-5 last:border-b"
                >
                  <span className="font-display text-lg italic text-accent/70">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="text-lg font-medium text-ink">{v.title}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-mid">
                      {v.text}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
}
