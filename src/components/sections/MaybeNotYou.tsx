import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Brain } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function MaybeNotYou() {
  return (
    <section className="relative overflow-hidden py-20 sm:py-24">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-cosmic opacity-90" />
      <Container size="narrow" className="flex flex-col items-center gap-8 text-center">
        <Eyebrow>Ein anderer Blickwinkel</Eyebrow>
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white">
          Was, wenn es <span className="text-gradient-gold">nicht an dir</span>{" "}
          liegt?
        </h2>
        <p className="prose-lead max-w-2xl">
          Vielleicht hast du dir schon oft die Schuld gegeben – zu wenig
          Disziplin, zu wenig Willenskraft. Doch was, wenn das Problem nie deine
          Schwäche war, sondern ein Programm, das nie hinterfragt wurde? Genau da
          setzen wir an.
        </p>

        {/* Video-Platzhalter */}
        <div className="group relative aspect-video w-full max-w-2xl overflow-hidden rounded-3xl border border-white/10 bg-navy-800/60">
          <div className="absolute inset-0 bg-stars opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-tr from-cosmic-violet/25 via-transparent to-brand-500/25" />
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-white/10 text-3xl text-white backdrop-blur transition-transform duration-300 group-hover:scale-110">
              <Brain />
            </span>
            <p className="text-sm font-medium text-mist-200/70">
              Videobotschaft folgt in Kürze
            </p>
          </div>
        </div>

        <Button href="/kontakt" variant="primary" size="lg">
          Lass uns darüber sprechen
          <ArrowRight />
        </Button>
      </Container>
    </section>
  );
}
