import type { Metadata } from "next";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Prose } from "@/components/layout/Prose";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Informationen zur Verarbeitung personenbezogener Daten (DSGVO).",
  robots: { index: false, follow: true },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Datenschutz" />
      <section className="pb-8">
        <Container size="narrow">
          <div className="rounded-3xl border border-ink/10 bg-white p-6 shadow-card sm:p-10">
            <Prose>
              <h2>1. Verantwortlicher</h2>
              <p>
                Verantwortlich für die Datenverarbeitung auf dieser Website ist:
                <br />
                {site.author}
                <br />
                Dompfaffenweg 30
                <br />
                63920 Großheubach
                <br />
                Deutschland
                <br />
                E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
              </p>

              <h2>2. Allgemeines zur Datenverarbeitung</h2>
              <p>
                Wir verarbeiten personenbezogene Daten unserer Nutzer
                grundsätzlich nur, soweit dies zur Bereitstellung einer
                funktionsfähigen Website sowie unserer Inhalte und Leistungen
                erforderlich ist. Die Verarbeitung erfolgt auf Grundlage der
                DSGVO.
              </p>

              <h2>3. Hosting (Hetzner)</h2>
              <p>
                Diese Website wird bei der Hetzner Online GmbH,
                Industriestr. 25, 91710 Gunzenhausen, Deutschland gehostet
                (Server-Standort innerhalb der EU). Der Anbieter verarbeitet in
                unserem Auftrag Server-Logfiles (siehe Punkt 4). Rechtsgrundlage
                ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an einem
                sicheren und stabilen Betrieb).
                <br />
                Datenschutz Hetzner:{" "}
                <a
                  href="https://www.hetzner.com/de/rechtliches/datenschutz"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  hetzner.com/de/rechtliches/datenschutz
                </a>
              </p>

              <h2>4. Server-Logfiles</h2>
              <p>
                Beim Aufruf der Website werden automatisch Informationen an den
                Server gesendet und temporär in einem Logfile gespeichert:
              </p>
              <ul>
                <li>IP-Adresse des anfragenden Geräts</li>
                <li>Datum und Uhrzeit des Zugriffs</li>
                <li>Name und URL der abgerufenen Datei</li>
                <li>Referrer-URL</li>
                <li>verwendeter Browser und Betriebssystem</li>
                <li>Name des Internet-Providers</li>
              </ul>
              <p>
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO (berechtigtes
                Interesse an einem stabilen Betrieb). Speicherdauer: 14 Tage,
                danach automatische Löschung.
              </p>

              <h2>5. Cookies</h2>
              <p>
                Wir setzen ausschließlich technisch notwendige Cookies ein. Das
                betrifft im Wesentlichen das Login-Cookie unseres
                Authentifizierungs-Dienstes Supabase, das dich nach der Anmeldung
                im Mitgliederbereich eingeloggt hält (gültig bis zum Logout bzw.
                bis zum Ablauf der Sitzung). Es kommen keine Statistik- oder
                Marketing-Cookies und keine Tracking-Dienste zum Einsatz; ein
                Cookie-Einwilligungsbanner ist daher nicht erforderlich.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO in Verbindung mit
                § 25 Abs. 2 Nr. 2 TTDSG (unbedingt erforderliche Cookies).
              </p>

              <h2>6. Kontaktaufnahme &amp; Formulare</h2>
              <p>
                Wenn du uns über das Kontaktformular oder per E-Mail
                kontaktierst, werden deine Angaben (Name, E-Mail-Adresse,
                Nachricht) zur Bearbeitung der Anfrage gespeichert.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. a und b DSGVO. Diese Daten
                geben wir nicht ohne deine Einwilligung weiter.
              </p>

              <h2>7. Newsletter &amp; E-Book-Anmeldung</h2>
              <p>
                Für den Bezug unserer E-Mail-Impulse bzw. des kostenlosen E-Books
                verwenden wir das Double-Opt-in-Verfahren: Du erhältst zunächst
                eine Bestätigungsmail, die du aktiv bestätigen musst. Verarbeitet
                wird deine E-Mail-Adresse sowie der Zeitpunkt der Anmeldung (zur
                Dokumentation der Einwilligung). Du kannst deine Einwilligung
                jederzeit über den Abmeldelink in jeder Mail widerrufen. Der
                Versand erfolgt über Resend (siehe Punkt 8), die Speicherung der
                Anmeldedaten über Supabase (siehe Punkt 9). Rechtsgrundlage ist
                Art. 6 Abs. 1 lit. a DSGVO (Einwilligung).
              </p>

              <h2>8. Resend – E-Mail-Versand</h2>
              <p>
                Bestätigungs- und Benachrichtigungs-E-Mails (z. B.
                Double-Opt-in, E-Book-Zustellung, Kontaktbestätigung) versenden
                wir über den Dienst Resend (Resend, Inc., USA). Dabei werden deine
                E-Mail-Adresse, ggf. dein Vorname und der jeweilige Mail-Inhalt
                übermittelt. Resend gewährleistet ein angemessenes Schutzniveau
                über Standardvertragsklauseln. Rechtsgrundlage ist Art. 6 Abs. 1
                lit. b DSGVO (Vertragserfüllung) bzw. Art. 6 Abs. 1 lit. a DSGVO
                (Einwilligung).
                <br />
                Datenschutz Resend:{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  resend.com/legal/privacy-policy
                </a>
              </p>

              <h2>9. Supabase – Account &amp; Datenhaltung</h2>
              <p>
                Für Anmeldung/Login und die Speicherung deiner Inhalte im
                Mitgliederbereich nutzen wir Supabase (Server-Standort innerhalb
                der EU, Frankfurt). Gespeichert werden:
              </p>
              <ul>
                <li>E-Mail-Adresse und Passwort (als Hash)</li>
                <li>Profilangaben (z. B. Name)</li>
                <li>
                  dein Lernfortschritt (abgeschlossene Stufen) und dein Ergebnis
                  aus dem Bewusstseinstest
                </li>
                <li>deine persönlichen Notizen und Reflexionen</li>
                <li>dein Opt-in-Status für die E-Mail-Impulse</li>
              </ul>
              <p>
                Speicherdauer: bis zur Löschung deines Accounts. Auf deinen Wunsch
                löschen wir deinen Account vollständig – eine formlose Mail an{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a> genügt.
                Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO
                (Vertragserfüllung).
                <br />
                Datenschutz Supabase:{" "}
                <a
                  href="https://supabase.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  supabase.com/privacy
                </a>
              </p>

              <h2>10. Deine Rechte</h2>
              <p>Dir stehen jederzeit folgende Rechte zu:</p>
              <ul>
                <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
                <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
                <li>Löschung (Art. 17 DSGVO)</li>
                <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
                <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                <li>
                  Widerruf erteilter Einwilligungen (Art. 7 Abs. 3 DSGVO) – die
                  Rechtmäßigkeit der bis zum Widerruf erfolgten Verarbeitung
                  bleibt unberührt
                </li>
              </ul>
              <p>
                Zur Ausübung genügt eine Mail an{" "}
                <a href={`mailto:${site.email}`}>{site.email}</a>.
              </p>

              <h2>11. Beschwerderecht</h2>
              <p>
                Du hast das Recht, dich bei einer Datenschutz-Aufsichtsbehörde zu
                beschweren, z. B.:
                <br />
                Der Bayerische Landesbeauftragte für den Datenschutz
                <br />
                Wagmüllerstraße 18, 80538 München
                <br />
                <a
                  href="https://www.datenschutz-bayern.de"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  www.datenschutz-bayern.de
                </a>
              </p>

              <h2>12. Aktualität</h2>
              <p>
                Diese Datenschutzerklärung ist aktuell gültig. Durch die
                Weiterentwicklung der Website oder geänderte gesetzliche Vorgaben
                kann eine Anpassung erforderlich werden.
              </p>
            </Prose>
          </div>
        </Container>
      </section>
    </>
  );
}
