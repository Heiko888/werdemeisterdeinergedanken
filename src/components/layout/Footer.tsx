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

      {/* Krafttier & Symbol – der Eisvogel (mittig, ganz unten) */}
      <div className="hairline">
        <Container className="flex flex-col items-center gap-3 py-8 text-center">
          <div className="relative shrink-0">
            <Image
              src="/eisvogel-blau.webp"
              alt="Eisvogel im Flug – Krafttier für Glück, Fokus und einen klaren Geist"
              width={1536}
              height={1024}
              sizes="(min-width: 640px) 288px, 224px"
              className="mx-auto w-56 rounded-2xl ring-1 ring-white/10 drop-shadow-[0_8px_40px_rgba(56,150,220,0.28)] sm:w-72"
            />
          </div>

          <div className="min-w-0">
            <p className="text-sm leading-relaxed text-cream-dim/80">
              <span className="font-medium text-gold-300">Der Eisvogel</span> –
              mein Symbol für einen klaren, wachen Geist.
            </p>
            <ul className="mt-1 flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs text-cream-dim/55">
              <li>Glück &amp; Hoffnung</li>
              <li aria-hidden className="text-cream-dim/25">·</li>
              <li>Fokus &amp; Präzision</li>
              <li aria-hidden className="text-cream-dim/25">·</li>
              <li>Klarheit &amp; Reinheit</li>
            </ul>
          </div>
        </Container>
      </div>

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
