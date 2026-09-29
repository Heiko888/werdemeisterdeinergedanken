import { Container } from "@/components/ui/Container";

/**
 * Ladezustand des Mitgliederbereichs (Suspense-Fallback für alle Seiten unter
 * /mitglieder, solange keine tiefere loading.tsx greift).
 *
 * Ruhiges Skeleton im Stil des Mitglieder-Kopfs (.member-hero) plus zwei
 * Karten-Platzhalter. Die Puls-Animation entfällt bei „Bewegung reduzieren".
 */
export default function MitgliederLoading() {
  const pulse = "animate-pulse motion-reduce:animate-none";
  return (
    <div aria-busy="true" aria-live="polite">
      <p className="sr-only">Wird geladen …</p>

      <section
        aria-hidden
        className="member-hero flex flex-col justify-center overflow-hidden py-14 min-h-[22rem] sm:min-h-[34rem] sm:py-20"
      >
        <Container className="relative z-10 flex flex-col items-start gap-4">
          <div className={`h-3 w-28 rounded-full bg-white/15 ${pulse}`} />
          <div
            className={`h-9 w-full max-w-md rounded-xl bg-white/15 sm:h-11 ${pulse}`}
          />
          <div className="flex w-full max-w-xl flex-col gap-2">
            <div className={`h-4 w-full rounded-full bg-white/10 ${pulse}`} />
            <div className={`h-4 w-4/5 rounded-full bg-white/10 ${pulse}`} />
          </div>
          <div className={`mt-2 h-2 w-full max-w-md rounded-full bg-white/15 ${pulse}`} />
        </Container>
      </section>

      <Container className="py-12 sm:py-16">
        <div aria-hidden className="grid gap-6 md:grid-cols-2">
          {[0, 1].map((i) => (
            <div
              key={i}
              className={`flex flex-col gap-4 rounded-2xl bg-white p-6 shadow-card ${pulse}`}
            >
              <div className="h-3 w-24 rounded-full bg-mist-200" />
              <div className="h-6 w-3/4 rounded-lg bg-mist-200" />
              <div className="flex flex-col gap-2">
                <div className="h-3.5 w-full rounded-full bg-mist-100" />
                <div className="h-3.5 w-5/6 rounded-full bg-mist-100" />
                <div className="h-3.5 w-2/3 rounded-full bg-mist-100" />
              </div>
              <div className="mt-2 h-11 w-40 rounded-xl bg-mist-200" />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}
