import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="grain relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10"
        style={{
          background:
            "radial-gradient(55% 50% at 50% 0%, color-mix(in oklab, var(--color-teal-500) 12%, transparent), transparent 65%)",
        }}
      />
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="font-display text-7xl italic text-accent/80 sm:text-8xl">
          404
        </span>
        <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
          Diese Seite existiert nicht
        </h1>
        <p className="max-w-md text-[1.05rem] leading-relaxed text-ink-soft/75">
          Vielleicht ein Denkfehler im Code – kein Grund zur Sorge. Kehr zurück
          und finde deinen Weg.
        </p>
        <Button href="/" variant="accent" size="lg">
          Zur Startseite
          <ArrowRight />
        </Button>
      </Container>
    </section>
  );
}
