import type { CSSProperties } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/visuals/Logo";
import { socialIcons } from "@/components/ui/Icon";
import { CookieSettingsButton } from "@/components/analytics/CookieSettingsButton";
import { GA_ID } from "@/lib/analytics";
import { mainNav, legalNav, site } from "@/lib/site";

/**
 * Markenfarben der sozialen Netzwerke – für die farbigen Footer-Buttons.
 * `bg` füllt den Button beim Hover (Instagram als typischer Verlauf).
 */
const socialColors: Record<string, { color: string; bg: string }> = {
  instagram: {
    color: "#E1306C",
    bg: "linear-gradient(45deg, #F58529, #DD2A7B, #8134AF, #515BD4)",
  },
  facebook: { color: "#1877F2", bg: "#1877F2" },
  youtube: { color: "#FF0000", bg: "#FF0000" },
  linkedin: { color: "#0A66C2", bg: "#0A66C2" },
  telegram: { color: "#229ED9", bg: "#229ED9" },
};

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
            <li>
              <Link
                href="/seiten"
                className="inline-flex min-h-11 items-center text-sm text-mist-300/70 transition-colors hover:text-white"
              >
                Seitenübersicht
              </Link>
            </li>
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
              const brand = socialColors[key];
              return (
                <a
                  key={key}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={key}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-lg text-[var(--social-color)] transition-all hover:-translate-y-0.5 hover:border-transparent hover:text-white hover:shadow-lg hover:[background:var(--social-bg)]"
                  style={
                    {
                      // Fallback in die Variable verlagert – ein nachgeschaltetes
                      // var()-Fallback im Tailwind-Arbitrary-Value (text-[var(a,var(b))])
                      // erzeugt sonst ungültiges CSS und bricht den Dev-Build.
                      "--social-color": brand?.color ?? "var(--color-mist-200)",
                      "--social-bg": brand?.bg ?? "transparent",
                    } as CSSProperties
                  }
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
            <div
              aria-hidden
              className="absolute -inset-3 -z-10 rounded-full opacity-60 blur-xl"
              style={{
                background:
                  "radial-gradient(circle, color-mix(in oklab, var(--color-teal-500) 30%, transparent), transparent 68%)",
              }}
            />
            <Image
              src="/eisvogel-blau.webp"
              alt="Eisvogel im Flug – Krafttier für Glück, Fokus und einen klaren Geist"
              width={640}
              height={622}
              sizes="(min-width: 640px) 80px, 64px"
              className="mx-auto w-16 drop-shadow-[0_6px_24px_rgba(33,178,189,0.3)] sm:w-20"
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
        <Container className="flex flex-col items-center gap-3 py-6 text-center text-xs text-mist-300/60 lg:flex-row lg:justify-between lg:text-left">
          <p>
            © {year} {site.author}. Alle Rechte vorbehalten.
          </p>
          <p>Werde Meister deiner Gedanken · Bewusstseinsentwicklung in 7 Stufen</p>
        </Container>
      </div>
    </footer>
  );
}
