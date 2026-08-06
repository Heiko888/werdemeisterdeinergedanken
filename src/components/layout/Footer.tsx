import Link from "next/link";
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
