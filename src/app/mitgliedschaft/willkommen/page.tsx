import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight, Check } from "@/components/ui/Icon";

export const metadata: Metadata = {
  title: "Willkommen",
  description: "Deine Mitgliedschaft ist aktiv.",
  robots: { index: false, follow: false },
};

const steps = [
  [
    "Prüfe dein E-Mail-Postfach",
    "Du hast eine Mail bekommen, um dein Passwort zu setzen. Damit richtest du deinen Zugang ein.",
  ],
  [
    "Passwort setzen & einloggen",
    "Über den Link in der Mail legst du dein Passwort fest und kommst direkt in deinen Bereich.",
  ],
  [
    "Bei der ersten Stufe beginnen",
    "Mach den Bewusstseinstest, finde deinen Startpunkt – und geh Stufe für Stufe in deinem Tempo.",
  ],
];

export default function WillkommenPage() {
  return (
    <>
      <PageHero
        eyebrow="Zahlung erfolgreich"
        title={
          <>
            Willkommen an <em className="accent">Bord</em>.
          </>
        }
        intro="Deine Mitgliedschaft ist aktiv. Nur noch ein kleiner Schritt, dann kann es losgehen."
      />

      <section className="bg-white py-16 sm:py-24">
        <Container size="narrow">
          <Reveal>
            <ol className="flex flex-col gap-6">
              {steps.map(([title, text], i) => (
                <li
                  key={title}
                  className="flex items-start gap-4 rounded-2xl border border-ink/10 bg-paper/40 p-6 shadow-card"
                >
                  <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-leaf-500 to-teal-500 text-sm font-semibold text-navy-950">
                    {i + 1}
                  </span>
                  <div className="flex flex-col gap-1">
                    <h2 className="font-display text-lg font-medium text-ink">
                      {title}
                    </h2>
                    <p className="text-[1.02rem] leading-relaxed text-ink-mid">
                      {text}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-10 flex flex-col items-start gap-4">
              <Button href="/login" variant="accent" size="lg">
                Zum Login
                <ArrowRight />
              </Button>
              <p className="flex items-center gap-2 text-sm text-ink-muted">
                <Check className="text-accent" />
                Keine Mail erhalten? Sieh im Spam nach oder melde dich kurz bei
                uns – wir helfen sofort.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>
    </>
  );
}
