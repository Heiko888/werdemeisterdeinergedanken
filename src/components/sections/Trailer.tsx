"use client";

import { useEffect, useRef, useState } from "react";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Play } from "@/components/ui/Icon";
import { cn } from "@/lib/cn";

/**
 * „Trailer" zum Thema Automatische Gedanken – eine kleine cinematische
 * Teaser-Sektion, die den Sprung von Stufe 01 (Autopilot) zu Stufe 03
 * (Selbstbeobachtung) erlebbar macht: erst die dichte Stimme im Kopf,
 * dann der Riss, dann die Einladung.
 *
 * Reines CSS/SVG (keine externen Medien), dunkle Bühne als bewusster
 * Kontrast zur hellen Seite. Läuft automatisch, ist pausierbar und
 * respektiert `prefers-reduced-motion` (dann statisch & sofort lesbar).
 */

/** Typische automatische Gedanken – die „Stimme im Kopf". */
const thoughts: {
  text: string;
  top: string;
  left: string;
  delay: string;
  size: string;
}[] = [
  { text: "Das schaff ich eh nicht.", top: "12%", left: "8%", delay: "0s", size: "text-base sm:text-lg" },
  { text: "Was denken die von mir?", top: "26%", left: "58%", delay: "0.6s", size: "text-lg sm:text-xl" },
  { text: "Mach ich später.", top: "44%", left: "14%", delay: "1.1s", size: "text-sm sm:text-base" },
  { text: "Typisch ich.", top: "62%", left: "62%", delay: "0.3s", size: "text-base sm:text-lg" },
  { text: "Hätte ich nur …", top: "76%", left: "22%", delay: "1.4s", size: "text-sm sm:text-base" },
  { text: "Das geht bestimmt schief.", top: "18%", left: "34%", delay: "0.9s", size: "text-sm sm:text-base" },
  { text: "Ich bin nicht gut genug.", top: "52%", left: "40%", delay: "0.2s", size: "text-lg sm:text-2xl" },
  { text: "Keine Zeit, keine Ruhe.", top: "84%", left: "54%", delay: "1.7s", size: "text-sm sm:text-base" },
];

/** Die zentralen Textmarken (Beats) des Trailers. */
type Beat = { eyebrow?: string; line: string };

const beats: Beat[] = [
  {
    eyebrow: "Ein Trailer über automatische Gedanken",
    line: "Wie viele deiner Gedanken heute hast du wirklich gewählt?",
  },
  { line: "Hör einmal genau hin." },
  { line: "Was, wenn diese Stimme nicht du bist – sondern nur ein Muster?" },
  { line: "Du musst ihr nicht glauben. Du kannst ihr zusehen." },
  { line: "" }, // Finale: Titel + CTA (unten gesondert gerendert)
];

/** Anzeigedauer je Beat in ms. */
const durations = [3400, 3200, 4000, 3800, 7000];

export function Trailer() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [beat, setBeat] = useState(0);
  const [reduced, setReduced] = useState(false);

  // prefers-reduced-motion: dann kein Autoplay, alles sofort sichtbar.
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  // Erst starten, wenn die Sektion im Blick ist (spart Rechenzeit).
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Timeline: Beat für Beat weiterschalten, am Ende wieder von vorn.
  useEffect(() => {
    if (reduced || !visible || !playing) return;
    const t = setTimeout(
      () => setBeat((b) => (b + 1) % beats.length),
      durations[beat],
    );
    return () => clearTimeout(t);
  }, [beat, visible, playing, reduced]);

  // Im reduzierten Modus die „dichteste" Aussage zeigen.
  const activeBeat = reduced ? 2 : beat;
  const isFinale = !reduced && beat === beats.length - 1;
  // Ab dem Riss (Beat 2) beruhigen sich die Gedanken.
  const thoughtsCalm = reduced || beat >= 2;

  return (
    <section className="relative py-20 sm:py-28">
      <Container>
        <div
          ref={ref}
          className="grain relative overflow-hidden rounded-3xl border border-white/10 bg-navy-950 px-6 py-16 shadow-soft sm:px-10 sm:py-20"
        >
          {/* Kosmischer Grundton */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 -z-10"
            style={{
              background:
                "radial-gradient(70% 60% at 22% 0%, color-mix(in oklab, var(--color-cosmic-violet) 26%, transparent), transparent 60%), radial-gradient(60% 55% at 100% 30%, color-mix(in oklab, var(--color-teal-500) 22%, transparent), transparent 58%)",
            }}
          />

          {/* Ebene 1: das Gedankenfeld */}
          <div aria-hidden className="pointer-events-none absolute inset-0">
            {thoughts.map((t, i) => (
              <span
                key={i}
                className={cn(
                  "absolute -translate-x-1/2 -translate-y-1/2 font-display italic text-cream/80 transition-all duration-1000 ease-out",
                  t.size,
                  reduced ? "" : "animate-float",
                  thoughtsCalm
                    ? "opacity-15 blur-[1px]"
                    : "opacity-70 blur-0",
                )}
                style={{
                  top: t.top,
                  left: t.left,
                  animationDelay: t.delay,
                }}
              >
                „{t.text}“
              </span>
            ))}
          </div>

          {/* Ebene 2: zentrale Aussage / Finale */}
          <div className="relative mx-auto flex min-h-[15rem] max-w-2xl flex-col items-center justify-center text-center sm:min-h-[17rem]">
            {isFinale ? (
              <div className="flex flex-col items-center gap-6 animate-fade-in">
                <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-teal-300">
                  Vom Autopilot zur Wahlfreiheit
                </p>
                <h2 className="font-display text-3xl leading-tight text-cream sm:text-4xl md:text-5xl">
                  Werde Meister deiner{" "}
                  <em className="not-italic text-teal-300">Gedanken</em>.
                </h2>
                <p className="max-w-md text-base leading-relaxed text-cream-dim/80">
                  Es beginnt damit, die automatischen Gedanken zu bemerken –
                  Stufe 1 auf dem Weg zu echter Meisterschaft.
                </p>
                <Button href="/die-7-stufen" variant="accent" size="lg">
                  Bei Stufe 1 beginnen
                  <ArrowRight />
                </Button>
              </div>
            ) : (
              <div className="flex flex-col items-center gap-5">
                {beats[activeBeat].eyebrow && (
                  <p className="text-[0.7rem] font-semibold uppercase tracking-[0.28em] text-teal-300">
                    {beats[activeBeat].eyebrow}
                  </p>
                )}
                <p
                  key={activeBeat}
                  className="font-display text-2xl leading-snug text-cream animate-fade-in sm:text-3xl md:text-[2.4rem]"
                >
                  {beats[activeBeat].line}
                </p>
              </div>
            )}
          </div>

          {/* Steuerung: Fortschritt + Pause/Play (nur bei Bewegung) */}
          {!reduced && (
            <div className="relative mt-12 flex items-center justify-center gap-4">
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Trailer pausieren" : "Trailer abspielen"}
                aria-pressed={!playing}
                className="grid h-8 w-8 place-items-center rounded-full border border-white/20 text-cream/80 transition-colors hover:border-teal-300/60 hover:text-cream focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-300"
              >
                {playing ? <PauseGlyph /> : <Play className="h-3.5 w-3.5" />}
              </button>

              <div className="flex items-center gap-2">
                {beats.map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => {
                      setBeat(i);
                      setPlaying(true);
                    }}
                    aria-label={`Zu Abschnitt ${i + 1} springen`}
                    aria-current={i === beat}
                    className={cn(
                      "h-1.5 rounded-full transition-all duration-300",
                      i === beat
                        ? "w-8 bg-teal-300"
                        : "w-2.5 bg-white/25 hover:bg-white/50",
                    )}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}

/** Kleines Pause-Symbol (zwei Balken), passend zum Play-Icon-Stil. */
function PauseGlyph() {
  return (
    <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" aria-hidden fill="currentColor">
      <rect x="7" y="5" width="3.5" height="14" rx="1" />
      <rect x="13.5" y="5" width="3.5" height="14" rx="1" />
    </svg>
  );
}
