import Link from "next/link";
import { APP_GLOW } from "@/lib/gradients";
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
            APP_GLOW,
        }}
      />
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="font-display text-7xl italic text-accent/80 sm:text-8xl">
          404
        </span>
        <h1 className="text-[2rem] font-medium text-ink sm:text-4xl">
          Diese Seite existiert nicht
        </h1>
        <p className="max-w-md text-[1.05rem] leading-relaxed text-ink-mid">
          Vielleicht ein Denkfehler im Code – kein Grund zur Sorge. Kehr zurück
          und finde deinen Weg.
        </p>
        <Button href="/" variant="accent" size="lg">
          Zur Startseite
          <ArrowRight />
        </Button>

        {/* Rückführung statt Sackgasse: die wichtigsten Wege direkt anbieten. */}
        <nav
          aria-label="Beliebte Seiten"
          className="mt-2 flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-sm"
        >
          {[
            { href: "/die-7-stufen", label: "Die 7 Stufen" },
            { href: "/blog", label: "Blog" },
            { href: "/bewusstseinstest", label: "Bewusstseinstest" },
            { href: "/kontakt", label: "Kontakt" },
          ].map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className="font-medium text-accent underline-offset-2 hover:underline"
            >
              {l.label}
            </Link>
          ))}
        </nav>
      </Container>
    </section>
  );
}
