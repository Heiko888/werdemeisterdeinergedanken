import { HERO_GLOW } from "@/lib/gradients";
import { Container } from "@/components/ui/Container";
import { Reveal } from "@/components/ui/Reveal";
import { Eyebrow } from "@/components/ui/SectionHeading";

export function Creed() {
  return (
    <section className="on-dark grain relative overflow-hidden bg-navy-900 py-20 text-cream sm:py-28">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background: HERO_GLOW,
        }}
      />
      <Container size="narrow" className="flex flex-col items-center gap-6 text-center">
        <Reveal>
          <Eyebrow>Der Grundgedanke</Eyebrow>
        </Reveal>
        <Reveal delay={80}>
          <p className="max-w-2xl text-[1.9rem] font-medium leading-[1.14] text-cream sm:text-[2.6rem]">
            Dein Bewusstsein ist der{" "}
            <em className="accent">Schlüssel</em>. Deine Gedanken sind der{" "}
            <em className="accent">Code</em>.
          </p>
        </Reveal>
      </Container>
    </section>
  );
}
