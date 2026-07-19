import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/visuals/Logo";
import { Button } from "@/components/ui/Button";
import { ArrowRight, socialIcons } from "@/components/ui/Icon";
import { mainNav, legalNav, site } from "@/lib/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative mt-24 overflow-hidden border-t border-white/10 bg-navy-900">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-30" />
      <div className="pointer-events-none absolute -top-1/2 left-1/2 -z-10 h-[30rem] w-[30rem] -translate-x-1/2 rounded-full bg-brand-500/10 blur-[120px]" />

      {/* CTA-Band */}
      <Container className="py-14">
        <div className="glass-strong flex flex-col items-center gap-6 rounded-3xl px-6 py-12 text-center sm:px-12">
          <h2 className="text-2xl sm:text-3xl font-bold text-white">
            Bereit für neuen Input?
          </h2>
          <p className="prose-lead max-w-xl">
            Mach den ersten Schritt zu einem klareren Kopf. In einem
            unverbindlichen Gespräch finden wir heraus, wo du stehst – und was
            dein nächster Schritt ist.
          </p>
          <Button href="/kontakt" variant="accent" size="lg">
            Jetzt Gespräch vereinbaren
            <ArrowRight />
          </Button>
        </div>
      </Container>

      {/* Link-Bereich */}
      <Container className="grid gap-10 pb-12 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
        <div className="flex flex-col gap-4">
          <Logo />
          <p className="max-w-xs text-sm leading-relaxed text-mist-300/70">
            {site.tagline}. Ein Weg zurück zu Klarheit, innerer Ruhe und der
            Fähigkeit, deine Gedanken bewusst zu gestalten.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Navigation
          </h3>
          <ul className="flex flex-col gap-2.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-mist-300/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Rechtliches
          </h3>
          <ul className="flex flex-col gap-2.5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="text-sm text-mist-300/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Folge mir
          </h3>
          <div className="flex flex-wrap gap-2.5">
            {(
              Object.entries(site.social) as [
                keyof typeof site.social,
                string,
              ][]
            ).map(([key, href]) => {
              const SocialIcon = socialIcons[key];
              if (!SocialIcon) return null;
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-mist-200 transition-all hover:-translate-y-0.5 hover:border-brand-400/50 hover:text-white"
                >
                  <SocialIcon />
                </a>
              );
            })}
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block break-all text-sm text-mist-300/70 transition-colors hover:text-white"
          >
            {site.email}
          </a>
        </div>
      </Container>

      <div className="hairline">
        <Container className="flex flex-col items-center justify-between gap-3 py-6 text-xs text-mist-300/60 sm:flex-row">
          <p>
            © {year} {site.author}. Alle Rechte vorbehalten.
          </p>
          <p>Werde Meister deiner Gedanken · Bewusstseinsentwicklung in 7 Stufen</p>
        </Container>
      </div>
    </footer>
  );
}
