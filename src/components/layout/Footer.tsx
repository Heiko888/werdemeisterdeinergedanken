import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/visuals/Logo";
import { socialIcons } from "@/components/ui/Icon";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { GA_ID } from "@/lib/analytics";
import { mainNav, legalNav, site } from "@/lib/site";

export function Footer() {
  const year = 2026;

  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-navy-900">
      {/* Krafttier & Symbol – der goldene Eisvogel */}
      <div className="relative border-b border-white/10">
        <Container className="flex flex-col items-center gap-8 py-14 text-center sm:flex-row sm:gap-11 sm:text-left">
          <div className="relative shrink-0">
            <div
              aria-hidden
              className="absolute -inset-6 -z-10 rounded-full opacity-70 blur-2xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-gold-500) 34%, transparent), transparent 66%)",
              }}
            />
            <Image
              src="/eisvogel-gold.webp"
              alt="Goldener Eisvogel im Flug – Krafttier für Glück, Fokus und einen klaren Geist"
              width={320}
              height={320}
              sizes="(min-width: 640px) 176px, 144px"
              className="mx-auto w-36 drop-shadow-[0_12px_50px_rgba(217,169,58,0.35)] sm:w-44"
            />
          </div>

          <div className="max-w-xl">
            <p className="mb-3 text-xs font-semibold uppercase tracking-[0.24em] text-gold-300">
              Krafttier &amp; Symbol
            </p>
            <p className="text-lg leading-relaxed text-cream">
              Der <span className="font-medium text-gold-300">Eisvogel</span>{" "}
              begleitet diesen Weg – er steht für einen klaren, wachen Geist und
              den Mut, im richtigen Moment einzutauchen.
            </p>
            <ul className="mt-5 flex flex-col gap-x-8 gap-y-2 text-sm text-cream-dim/70 sm:flex-row sm:flex-wrap">
              <li>
                <span className="font-medium text-cream">Glück &amp; Hoffnung</span>{" "}
                – Zeichen für einen neuen Lebensabschnitt.
              </li>
              <li>
                <span className="font-medium text-cream">Fokus &amp; Präzision</span>{" "}
                – blitzschnell und treffsicher.
              </li>
              <li>
                <span className="font-medium text-cream">Klarheit &amp; Reinheit</span>{" "}
                – Flaggschiff für lebendige Gewässer.
              </li>
            </ul>
          </div>
        </Container>
      </div>

      {/* Link-Bereich */}
      <Container className="grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4 [&>*]:min-w-0">
        <div className="flex flex-col gap-4">
          <Logo tone="onDark" />
          <p className="max-w-xs text-sm leading-relaxed text-cream-dim/65">
            {site.tagline}. Ein Weg zurück zu Klarheit, innerer Ruhe und der
            Fähigkeit, deine Gedanken bewusst zu gestalten.
          </p>
        </div>

        <div>
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
            Navigation
          </h3>
          <ul className="flex flex-col gap-0.5">
            {mainNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-mist-300/70 transition-colors hover:text-white"
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
          <ul className="flex flex-col gap-0.5">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="inline-flex min-h-11 items-center text-sm text-mist-300/70 transition-colors hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            {GA_ID && (
              <li>
                <CookieSettingsButton />
              </li>
            )}
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-mist-200 transition-all hover:-translate-y-0.5 hover:border-brand-400/50 hover:text-white"
                >
                  <SocialIcon />
                </a>
              );
            })}
          </div>
          <a
            href={`mailto:${site.email}`}
            className="mt-5 inline-block break-words text-sm text-mist-300/70 transition-colors hover:text-white"
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
