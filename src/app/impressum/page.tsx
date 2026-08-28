import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/impressum", {
  title: "Impressum",
  description: "Impressum und Anbieterkennzeichnung.",
  robots: { index: false, follow: true },
});

export default function ImprintPage() {
  return (
    <>
      <PageHero title="Impressum" />
      <section className="bg-paper-aura grain-soft relative pb-8">
        <Container size="narrow">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-10">
            <Prose>
              <h2>Angaben gemäß § 5 DDG (Digitale-Dienste-Gesetz)</h2>
              <p>
                {site.author}
                <br />
                Dompfaffenweg 30
                <br />
                63920 Großheubach
                <br />
                Deutschland
              </p>

              <h2>Kontakt</h2>
              <p>
                E-Mail:{" "}
                <a href={`mailto:${site.email}`} className="break-all">{site.email}</a>
              </p>

              <h2>Umsatzsteuer-ID</h2>
              <p>
                Umsatzsteuer-Identifikationsnummer gemäß § 27 a
                Umsatzsteuergesetz:
                <br />
                DE415501288
              </p>

              <h2>Redaktionell verantwortlich</h2>
              <p>
                {site.author}
                <br />
                Anschrift wie oben
              </p>

              <h2>Streitschlichtung</h2>
              <p>
                Die Europäische Kommission stellt eine Plattform zur
                Online-Streitbeilegung (OS) bereit:{" "}
                <a
                  href="https://ec.europa.eu/consumers/odr/"
                  className="break-all"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                . Wir sind nicht bereit oder verpflichtet, an
                Streitbeilegungsverfahren vor einer
                Verbraucherschlichtungsstelle teilzunehmen.
              </p>

              <h2>Haftung für Inhalte</h2>
              <p>
                Als Diensteanbieter sind wir gemäß § 7 Abs.1 DDG für eigene
                Inhalte auf diesen Seiten nach den allgemeinen Gesetzen
                verantwortlich. Nach §§ 8 bis 10 DDG sind wir als
                Diensteanbieter jedoch nicht verpflichtet, übermittelte oder
                gespeicherte fremde Informationen zu überwachen.
              </p>

              <h2>Urheberrecht</h2>
              <p>
                Die durch die Seitenbetreiber erstellten Inhalte und Werke auf
                diesen Seiten unterliegen dem deutschen Urheberrecht. Beiträge
                Dritter sind als solche gekennzeichnet.
              </p>
            </Prose>
          </div>
        </Container>
      </section>
    </>
  );
}
