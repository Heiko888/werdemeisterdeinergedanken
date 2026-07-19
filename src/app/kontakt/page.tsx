import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/sections/ContactForm";
import { Mail, socialIcons } from "@/components/ui/Icon";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Kontakt",
  description:
    "Nimm Kontakt auf und vereinbare ein kostenloses Erstgespräch. Gemeinsam finden wir heraus, wo du stehst und was dein nächster Schritt ist.",
};

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Lass uns über deinen{" "}
            <span className="text-gradient">nächsten Schritt</span> sprechen
          </>
        }
        intro="Ob konkrete Frage oder einfach der Wunsch, endlich anzufangen – schreib mir. Ich lese jede Nachricht persönlich."
      />

      <section className="pb-8">
        <Container className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          <ContactForm />

          <aside className="flex flex-col gap-5">
            <div className="rounded-3xl border border-white/10 bg-navy-800/40 p-6">
              <h2 className="text-lg font-bold text-white">Direkt erreichen</h2>
              <a
                href={`mailto:${site.email}`}
                className="mt-4 flex items-center gap-3 rounded-xl border border-white/10 bg-white/5 p-4 text-sm text-mist-100 transition-colors hover:border-brand-400/40"
              >
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-500/20 text-lg text-cosmic-cyan">
                  <Mail />
                </span>
                <span>
                  <span className="block text-xs uppercase tracking-wider text-mist-300/60">
                    E-Mail
                  </span>
                  {site.email}
                </span>
              </a>
            </div>

            <div className="rounded-3xl border border-white/10 bg-navy-800/40 p-6">
              <h2 className="text-lg font-bold text-white">Folge mir</h2>
              <div className="mt-4 flex flex-wrap gap-2.5">
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
            </div>

            <div className="rounded-3xl border border-brand-400/25 bg-gradient-to-br from-brand-600/20 to-cosmic-violet/15 p-6">
              <h2 className="text-lg font-bold text-white">
                Kostenloses Erstgespräch
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-mist-100/80">
                Unverbindlich und ehrlich. Wir klären, ob und wie ich dich am
                besten unterstützen kann – ganz ohne Verkaufsdruck.
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  );
}
