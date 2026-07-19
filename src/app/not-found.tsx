import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { CosmicBackground } from "@/components/visuals/CosmicBackground";
import { ArrowRight } from "@/components/ui/Icon";

export default function NotFound() {
  return (
    <section className="relative flex min-h-[70vh] items-center overflow-hidden py-20">
      <CosmicBackground variant="hero" />
      <Container className="flex flex-col items-center gap-6 text-center">
        <span className="font-display text-7xl font-bold text-gradient sm:text-8xl">
          404
        </span>
        <h1 className="text-3xl font-bold text-white sm:text-4xl">
          Diese Seite existiert nicht
        </h1>
        <p className="prose-lead max-w-md">
          Vielleicht ein Denkfehler im Code – kein Grund zur Sorge. Kehr zurück
          und finde deinen Weg.
        </p>
        <Button href="/" variant="primary" size="lg">
          Zur Startseite
          <ArrowRight />
        </Button>
      </Container>
    </section>
  );
}
