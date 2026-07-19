import { Container } from "@/components/ui/Container";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";
import { values } from "@/lib/content";

export function WhyMe() {
  return (
    <section className="relative overflow-hidden bg-navy-900 py-20 sm:py-28">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-25" />
      <div className="pointer-events-none absolute right-0 top-0 -z-10 h-[26rem] w-[26rem] rounded-full bg-brand-600/10 blur-[120px]" />

      <Container className="grid gap-14 lg:grid-cols-[1fr_1fr]">
        {/* Story */}
        <div className="flex flex-col items-start gap-6">
          <Eyebrow>Warum ich das mache</Eyebrow>
          <h2 className="text-3xl sm:text-4xl font-bold text-white">
            Ich war selbst gefangen in meinem Kopf
          </h2>
          <div className="flex flex-col gap-4 prose-lead">
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

          <div className="mt-2 flex items-center gap-4 rounded-2xl border border-white/10 bg-white/5 p-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-gold-300 to-cosmic-violet text-lg font-bold text-navy-950">
              HS
            </div>
            <div>
              <p className="font-semibold text-white">Heiko Schwaninger</p>
              <p className="text-sm text-mist-300/70">
                Begleiter für mentale Entprogrammierung
              </p>
            </div>
          </div>

          <Button href="/ueber-mich" variant="ghost" className="mt-1">
            Meine ganze Geschichte
            <ArrowRight />
          </Button>
        </div>

        {/* Werte */}
        <div className="flex flex-col gap-6">
          <Eyebrow>Was mich leitet</Eyebrow>
          <h3 className="text-2xl sm:text-3xl font-bold text-white">
            Meine Werte
          </h3>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v, i) => (
              <div
                key={v.title}
                className="flex flex-col gap-2 rounded-2xl border border-white/10 bg-navy-800/50 p-5"
              >
                <span className="font-display text-sm font-bold text-gradient">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h4 className="text-lg font-bold text-white">{v.title}</h4>
                <p className="text-sm leading-relaxed text-mist-200/70">
                  {v.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
}
