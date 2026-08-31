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
      {/* Krafttier & Symbol – der goldene Eisvogel (dezentes, schmales Band) */}
      <div className="relative border-b border-white/10">
        <Container className="flex flex-col items-center gap-4 py-7 text-center sm:flex-row sm:justify-between sm:gap-6 sm:text-left">
          <div className="min-w-0 sm:order-1">
            <p className="text-sm leading-relaxed text-cream-dim/80">
              <span className="font-medium text-gold-300">Der Eisvogel</span> –
              mein Symbol für einen klaren, wachen Geist.
            </p>
            <ul className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-cream-dim/55 sm:justify-start">
              <li>Glück &amp; Hoffnung</li>
              <li aria-hidden className="text-cream-dim/25">·</li>
              <li>Fokus &amp; Präzision</li>
              <li aria-hidden className="text-cream-dim/25">·</li>
              <li>Klarheit &amp; Reinheit</li>
            </ul>
          </div>

          <div className="relative shrink-0 sm:order-2">
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-full opacity-60 blur-xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-gold-500) 30%, transparent), transparent 68%)",
              }}
            />
            <Image
              src="/eisvogel-gold.webp"
              alt="Goldener Eisvogel im Flug – Krafttier für Glück, Fokus und einen klaren Geist"
              width={320}
              height={320}
              sizes="(min-width: 640px) 80px, 64px"
              className="mx-auto w-16 drop-shadow-[0_6px_24px_rgba(217,169,58,0.3)] sm:w-20"
            />
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
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-mist-200 transition-all hover:-translate-y-0.5 hover:border-gold-400/50 hover:text-white"
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
