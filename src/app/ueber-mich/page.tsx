import type { Metadata } from "next";
import type { ReactNode } from "react";
import Link from "next/link";
import { PageHero } from "@/components/layout/PageHero";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Reveal } from "@/components/ui/Reveal";
import { ArrowRight } from "@/components/ui/Icon";
import { Eyebrow } from "@/components/ui/SectionHeading";
import { values } from "@/lib/content";
import { withCanonical } from "@/lib/seo";

export const metadata: Metadata = withCanonical("/ueber-mich", {
  title: "Über mich",
  description:
    "Heiko Schwaninger – Gründer von Werde Meister deiner Gedanken. Meine Geschichte: vom Verstehen technischer Systeme über Menschen und Kommunikation bis zum eigenen inneren System – und wie daraus die 7 Stufen der Bewusstseinsentwicklung entstanden sind.",
});

/*
 * Aufbau (Stand 2026-10-05): Die Geschichte wird genau EINMAL vollständig
 * erzählt (zwei Story-Sektionen). Die Timeline „Auf einen Blick“ ist nur eine
 * stark verkürzte Zusammenfassung der Lebensphasen, „Woher meine Perspektive
 * kommt“ nennt die fachlichen Grundlagen. Rote Linie: Systeme verstehen →
 * Systeme enttarnen → das eigene innere System enttarnen.
 *
 * Chronologie (bitte bei Änderungen beibehalten): Lenas Tod → rund zwei Jahre
 * Vollgas → etwa drei Jahre nach ihrem Tod die Implosion → Reset/Neuaufbau →
 * erst DANACH Programmierung, Docker, Server, eigene technische Entwicklung.
 */

/** Hervorgehobene Kernaussage im Fließtext. */
function Kernsatz({ children }: { children: ReactNode }) {
  return (
    <p className="font-display text-xl italic leading-snug text-ink sm:text-2xl">
      {children}
    </p>
  );
}

/** Fragen-Box im Stil der bisherigen Seite. */
function Fragen({ intro, fragen }: { intro?: string; fragen: string[] }) {
  return (
    <aside className="rounded-2xl border border-accent/25 bg-accent/[0.04] px-6 py-5">
      {intro && <p className="mb-2 text-sm text-ink-mid">{intro}</p>}
      <ul className="flex flex-col gap-2">
        {fragen.map((q) => (
          <li key={q} className="flex gap-3 font-medium text-ink">
            <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
            <span>{q}</span>
          </li>
        ))}
      </ul>
    </aside>
  );
}

/** Kurze Aufzählung mit Gold-Punkten. */
function Punkte({ items }: { items: string[] }) {
  return (
    <ul className="my-1 flex flex-col gap-2.5">
      {items.map((line) => (
        <li key={line} className="flex gap-3 text-ink">
          <span aria-hidden className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-500" />
          <span>{line}</span>
        </li>
      ))}
    </ul>
  );
}

/** Zwischenüberschrift innerhalb der Geschichte. */
function Kapitel({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-6 font-display text-2xl italic text-ink first:mt-0">
      {children}
    </h3>
  );
}

/** Stark verkürzte Zusammenfassung der Lebensphasen – keine Wiederholung des Fließtexts. */
const phases = [
  {
    year: "Technik",
    title: "Verstehen, wie Systeme funktionieren",
    text: "Kfz-Mechaniker, danach Betriebsinformatiker.",
  },
  {
    year: "Menschen",
    title: "Vom technischen System zum Menschen",
    text: "Versicherung, Vertrieb, Gastronomie, Immobilien, Referent, Marketing.",
  },
  {
    year: "Lange Jahre",
    title: "Viel Wissen – und funktionieren",
    text: "Immer in Bewegung, wenig Blick auf das eigene Innere.",
  },
  {
    year: "Der Einschnitt",
    title: "Lenas Tod",
    text: "Danach rund zwei Jahre Vollgas.",
  },
  {
    year: "Etwa drei Jahre später",
    title: "Die Implosion",
    text: "Meine bisherige Identität bricht zusammen.",
  },
  {
    year: "Neuaufbau",
    title: "Das eigene innere System enttarnen",
    text: "Fragen, Schreiben, Coaching – danach auch Programmierung, Server und KI.",
  },
  {
    year: "Heute",
    title: "Aus meinem Weg wurden die 7 Stufen",
    text: "Werde Meister deiner Gedanken – als Landkarte, weiter in Entwicklung.",
  },
];

/** Woher meine Perspektive kommt – tatsächliche Grundlagen, keine erfundenen Titel. */
const foundations = [
  {
    title: "Technisches Fundament",
    text: "Abgeschlossene Ausbildung zum Kfz-Mechaniker, danach Betriebsinformatiker. Später eigene technische Praxis mit Programmierung, Servern und digitalen Projekten.",
  },
  {
    title: "Kaufmännische Praxis",
    text: "Kaufmännische Abläufe, Buchhaltung, steuerliche Themen und Organisation – vieles selbst gemacht und praktisch gelernt, statt es auszulagern.",
  },
  {
    title: "Menschen & Kommunikation",
    text: "Langjährige Berufserfahrung in Versicherung, Vertrieb und Verkauf, Gastronomie und Immobilienumfeld, rund sieben Jahre als Referent, dazu Online-Marketing, Storytelling und Video.",
  },
  {
    title: "Weiterbildung & Selbststudium",
    text: "Umfangreiche Weiterbildungen und jahrzehntelanges Selbststudium – unter anderem zu Rhetorik, Körpersprache, NLP, Reframing, Meditation, Atem und Trance, Psychologie und Bewusstsein. Dazu die eigene Erfahrung aus Krise und Neuaufbau.",
  },
];

/** Abschluss: Test als erster Schritt, Buch als zweiter (CTA-Regel aus
    FinalCta), Mitgliedschaft als digitale Plattform für den eigenen Weg. */
const nextSteps = [
  {
    href: "/bewusstseinstest",
    eyebrow: "Kostenlos starten",
    title: "Bewusstseinstest",
    text: "Eine kurze Selbsteinschätzung, die dir zeigt, welche der 7 Stufen bei deinen aktuellen Antworten besonders im Vordergrund steht.",
  },
  {
    href: "/buch",
    eyebrow: "Zum Nachlesen",
    title: "Das Buch",
    text: "„Werde Meister deiner Gedanken“ – erkenne die Gedanken, die gar nicht deine sind.",
  },
  {
    href: "/mitgliedschaft",
    eyebrow: "Demnächst",
    title: "Mitgliedschaft",
    text: "Die digitale Plattform mit den 7 Stufen, Videos, Wissen, Praxisimpulsen und Reflexion – zur eigenständigen Nutzung in deinem Tempo.",
  },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="Über mich"
        title={
          <>
            Hallo, ich bin <em className="accent">Heiko</em>
          </>
        }
        intro="Gründer von Werde Meister deiner Gedanken. Ich wollte mein Leben lang verstehen, wie Systeme funktionieren – erst in der Technik, dann beim Menschen und schließlich in mir selbst. Aus diesem Weg ist Werde Meister deiner Gedanken entstanden."
        image="/ueber-heiko-berg.webp"
        imagePosition="30% 15%"
        spotlight="left"
      />

      {/* Teil 1 der Geschichte: Systeme verstehen, Funktionieren, Verlust, Implosion */}
      <section className="bg-paper-aura grain-soft relative py-12 sm:py-16">
        <Container size="narrow">
          <Reveal>
            <div className="flex flex-col items-start gap-5">
              <Eyebrow>Meine Geschichte</Eyebrow>
              <h2 className="text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
                Ich wollte wissen, wie{" "}
                <em className="accent">Systeme funktionieren</em>
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col gap-5 text-[1.05rem] leading-relaxed text-ink-mid">
              <p>
                Wenn ich auf mein Leben zurückschaue, zieht sich ein Faden durch
                fast alles, was ich getan habe: Ich wollte verstehen, wie Dinge
                funktionieren. Nicht nur, dass sie funktionieren – sondern warum.
              </p>
              <Kernsatz>
                Irgendwann wollte ich Systeme nicht mehr nur verstehen, sondern
                enttarnen.
              </Kernsatz>
              <p>
                Welche Mechanismen wirken im Hintergrund? Warum funktioniert etwas
                bei dem einen Menschen und bei dem anderen nicht? Welche Regeln,
                Prägungen, Denkweisen und Interessen sind auf den ersten Blick
                nicht zu sehen?
              </p>

              <Kapitel>Vom technischen System zum Menschen</Kapitel>
              <p>
                Mein beruflicher Weg begann mit einer Ausbildung zum
                Kfz-Mechaniker. Danach folgte die Ausbildung zum
                Betriebsinformatiker.
              </p>
              <p>
                Schon dort zeigte sich, was mich bis heute antreibt: Ich wollte
                wissen, wie einzelne Komponenten zusammenwirken – und wo die
                Ursache liegt, wenn ein System nicht funktioniert.
              </p>
              <p>
                Später verlagerte sich diese Neugier immer mehr vom technischen
                System auf den Menschen.
              </p>

              <Kapitel>Menschen, Kommunikation und das, was dahinter liegt</Kapitel>
              <p>
                Nach der Informatik wechselte ich in die Versicherungsbranche.
                Schon in dieser Zeit beschäftigte ich mich intensiv mit Verkauf,
                Rhetorik, Körpersprache, Kommunikation und Menschenkenntnis – und
                ebenso mit NLP, Reframing, Meditation, Trance und veränderten
                inneren Zuständen.
              </p>
              <p>
                Dazu kam immer der kaufmännische Teil: Abläufe, Buchhaltung,
                steuerliche Fragen, Organisation. Vieles davon habe ich selbst
                gemacht und mir praktisch beigebracht, statt es abzugeben. Ich
                wollte Wissen nicht nur kennen. Ich wollte es anwenden können.
              </p>
              <p>
                Später kamen weitere Stationen: die Gastronomie – ohne
                gastronomische Ausbildung, aber mit jahrelanger Praxis –, rund
                sieben Jahre als Referent, Vertrieb und Verkauf, das
                Immobilienumfeld, Online-Marketing und Kampagnen, Storytelling,
                Video und Kamerapräsenz, Atemtechniken.
              </p>
              <p>
                Das bedeutete vor allem eines: jeden Tag echte Menschen. Ich habe
                beobachtet, wie sie reagieren und entscheiden, was sie nach außen
                zeigen und was dahinter liegt – und was sich verändert, wenn Geld,
                Druck, Status, Angst, Erfolg oder Unsicherheit ins Spiel kommen.
              </p>
              <p>
                Ich bin dabei auch Menschen begegnet, die beruflich oder
                wirtschaftlich deutlich weiter waren als ich, und habe genau
                hingeschaut, wie sie denken, entscheiden und handeln. Nicht, um sie
                zu kopieren, sondern mit diesen Fragen:
              </p>
              <Fragen
                fragen={[
                  "Was kann ich daraus verstehen?",
                  "Was ist Substanz – und was nur Fassade?",
                  "Was funktioniert für mich – und was nicht?",
                ]}
              />

              <Kapitel>Kein Modell einfach glauben</Kapitel>
              <p>
                Parallel habe ich über viele Jahre sehr viel gelesen und gelernt –
                nicht nur klassische Erfolgsbücher. Mich interessierten Denken,
                Psychologie und menschliches Verhalten, Erfolg und persönliche
                Entwicklung, Kommunikation, Spiritualität, Meditation und
                Bewusstsein, gesellschaftliche Mechanismen, Marketing und
                Beeinflussung.
              </p>
              <p>
                Ich wollte nie ein Modell glauben, nur weil jemand behauptet, dass
                es funktioniert. Ich wollte wissen: Warum funktioniert es? Unter
                welchen Bedingungen? Wo liegen die Grenzen – und was fehlt?
              </p>
              <p>Mein Vorgehen war dabei fast immer dasselbe:</p>
              <Punkte
                items={[
                  "beobachten",
                  "ausprobieren",
                  "auseinandernehmen",
                  "verstehen",
                  "rekonstruieren",
                  "mit anderen Erkenntnissen verbinden",
                  "daraus ein eigenes Gesamtbild entwickeln",
                ]}
              />
              <Kernsatz>
                Ich habe Systeme beobachtet, ausprobiert, auseinandergenommen und
                rekonstruiert.
              </Kernsatz>

              <Kapitel>Funktionieren</Kapitel>
              <p>
                Trotz all dieses Wissens war mein eigenes Leben alles andere als
                sortiert. Über lange Zeit war ich ständig in Bewegung.
              </p>
              <p className="font-medium text-ink">
                Arbeiten. Probleme lösen. Weitermachen. Aushalten. Funktionieren.
              </p>
              <p>
                Ich hielt mich für jemanden, der einfach sehr viel einstecken kann.
                Rückblickend musste ich lernen: Belastbarkeit und Verdrängung
                liegen manchmal erstaunlich nah beieinander. Dinge mit sich selbst
                auszumachen kann eine Stärke sein. Es kann aber auch zum Muster
                werden.
              </p>

              <Kapitel>Der Verlust</Kapitel>
              <p>
                Der Tod meiner Lebensgefährtin Lena war einer der schwersten
                Einschnitte meines Lebens.
              </p>
              <p>
                Ich habe danach nicht aufgehört. Im Gegenteil: Vor allem über
                ungefähr zwei Jahre habe ich extrem viel gearbeitet. Vollgas.
                Zeitweise bestand mein Leben fast nur aus Arbeit.
              </p>
              <p>
                Hohe Intensität ist dabei nicht per se das Problem – sie gehört zu
                mir. Schwierig wurde die Mischung: jahrelanger Druck, emotionale
                Belastungen, der Verlust, permanentes Funktionieren, Unsicherheit,
                immer neue Baustellen, später auch wegbrechende Aufträge – und
                trotzdem weiter Vollgas.
              </p>
              <p className="font-medium text-ink">Es wurde zunehmend schwerer.</p>

              <Kapitel>Drei Jahre später: die Implosion</Kapitel>
              <p>
                Ungefähr drei Jahre nach Lenas Tod kam der komplette Einschlag.
                Nicht ein einzelnes Problem. Nicht nur beruflich, nicht nur
                finanziell, nicht nur emotional.
              </p>
              <Kernsatz>Meine bisherige Identität brach zusammen.</Kernsatz>
              <p>
                In dieser Zeit spiegelte mir eine Begegnung – genauer: eine
                zwischenmenschliche Konstellation – plötzlich sehr vieles aus
                meinem bisherigen Leben. Auf einmal sah ich Zusammenhänge: zu
                meinem Aufwachsen und familiären Dynamiken, zu früheren
                Erfahrungen, zu Vertrauen und Rückzug, Funktionieren und
                Verdrängung, zu Beziehungen, Selbstbildern, Schutzmechanismen und
                Reaktionen, die sich immer wiederholten.
              </p>
              <p>
                Ich begann zu sehen, dass manche meiner Reaktionen und Denkweisen
                eine Geschichte hatten. Mein ganzes Leben schien sich auf einmal zu
                spiegeln.
              </p>
              <p>
                Emotional war ich in dieser Phase extrem überladen. Ich war
                innerlich unruhig, mein Körper zuckte, und es fühlte sich an, als
                wäre mein gesamtes Nervensystem überreizt. Über ungefähr drei bis
                vier Monate war teilweise nur das Nötigste möglich.
              </p>
              <p className="font-medium text-ink">
                Und genau da konnte ich nicht mehr einfach weiterrennen.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Teil 2 der Geschichte: inneres System, Reset, Neuaufbau, Gesamtbild */}
      <section className="bg-surface-aura grain-soft relative py-12 sm:py-16">
        <Container size="narrow">
          <Reveal>
            <div className="flex flex-col items-start gap-5">
              <Eyebrow>Was danach kam</Eyebrow>
              <h2 className="text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
                Mein eigenes <em className="accent">inneres System</em>{" "}
                enttarnen
              </h2>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="mt-8 flex flex-col gap-5 text-[1.05rem] leading-relaxed text-ink-mid">
              <aside className="glow-gold rounded-2xl border border-gold-400/25 bg-surface p-6 shadow-card">
                <p className="text-ink">
                  Ich hatte mein Leben lang versucht, Systeme im Außen zu verstehen
                  und zu enttarnen.
                </p>
                <p className="mt-2 font-display text-xl italic leading-snug text-ink">
                  Nach meinem Zusammenbruch musste ich anfangen, mein eigenes
                  inneres System zu enttarnen.
                </p>
              </aside>

              <Kapitel>Der Reset</Kapitel>
              <p>
                Das war der Punkt, an dem sich wirklich etwas veränderte. Ich
                begann, mein bisheriges Fundament auseinanderzunehmen und neu
                aufzubauen.
              </p>
              <p>
                Nicht mit der Frage: „Wie werde ich möglichst schnell wieder
                funktionstüchtig?“ Sondern mit der Frage:
              </p>
              <Kernsatz>„Was ist hier eigentlich passiert?“</Kernsatz>
              <Fragen
                intro="Ich wollte Ursachen verstehen:"
                fragen={[
                  "Welche Muster laufen in mir – und woher kommen sie?",
                  "Wann wurden sie geprägt?",
                  "Welche Reaktion war einmal Schutz – und brauche ich sie heute noch?",
                  "Welche Überzeugungen habe ich übernommen, und was gehört tatsächlich zu mir?",
                  "Was kann ich verändern – und was kann ich nicht einfach löschen, aber bewusst anders handhaben?",
                ]}
              />

              <Kapitel>Ein Mensch hat viele Seiten</Kapitel>
              <p>
                In dieser Zeit habe ich unter anderem selbst ein sehr intensives
                Coaching in Anspruch genommen, das mir ausgesprochen geholfen hat.
                Über mehrere Sitzungen ging es dabei auch um unterschiedliche
                Persönlichkeitsanteile – etwa den ordentlichen, den chaotischen,
                den nachdenklichen, den bequemen oder den aktiven. Diese Anteile
                wurden bewusst betrachtet, sortiert und anschließend in einem
                trance- bzw. hypnoseähnlichen Zustand weiter bearbeitet und
                verankert.
              </p>
              <p>
                Was ich daraus mitgenommen habe: Ein Mensch hat nicht nur „eine
                Persönlichkeit“. Er trägt unterschiedliche Seiten, Bedürfnisse und
                Reaktionsweisen in sich. Es ging nicht darum, einzelne Anteile
                wegzumachen, sondern sie zu erkennen und neu zu ordnen.
              </p>

              <Kapitel>Was sich verändern lässt – und was nicht</Kapitel>
              <p>
                Manche Muster lassen sich verändern. Manche Prägungen verlieren an
                Macht, sobald man sie erkennt und ihnen neue Erfahrungen und
                Verhaltensweisen entgegensetzt. Anderes gehört tiefer zur eigenen
                Geschichte oder Persönlichkeit und verschwindet nicht einfach.
              </p>
              <p>
                Bewusstseinsentwicklung bedeutet für mich deshalb nicht, alles an
                sich selbst zu löschen. Sondern zu erkennen, was in einem wirkt und
                woher es kommt – und bewusster entscheiden zu können, wie man damit
                umgeht.
              </p>

              <Kapitel>Neu aufbauen</Kapitel>
              <p>
                In dieser Phase begann ich wieder intensiv zu schreiben. Schreiben
                half mir, Erkenntnisse festzuhalten und Zusammenhänge sichtbar zu
                machen. Ich hörte sehr viele Podcasts aus ganz unterschiedlichen
                Themengebieten, oft auf Autofahrten. Dazu kamen weiterhin Bücher,
                Meditation, Selbstbeobachtung, das Coaching, eigene Erfahrungen und
                ständiges Hinterfragen.
              </p>
              <p>
                Nicht als Selbstoptimierung. Es ging darum, das große Ganze zu
                verstehen.
              </p>
              <p>
                Erst in dieser Zeit kam auch die Technik zurück – tiefer als zuvor:
                Programmierung und Coding, Entwicklung mit Claude, Docker, Server
                und technische Infrastruktur, eigene digitale Projekte und KI. Und
                wieder zeigte sich dasselbe Muster: Ich möchte verstehen, wie ein
                System funktioniert. Ich baue Dinge selbst, teste sie, zerlege
                Probleme und setze Lösungen neu zusammen.
              </p>

              <Kapitel>Kein Happy End – aber ein Unterschied</Kapitel>
              <p>
                Das hier ist keine Geschichte, in der danach alles perfekt ist.
                Auch heute tauchen alte Muster wieder auf. Auch heute komme ich
                wieder in mein Vollgas.
              </p>
              <p>
                Der Unterschied: Ich erkenne manches früher. Ich kann eher
                unterscheiden, ob eine intensive Phase mich trägt – oder ob ich
                wieder nur funktioniere und gegen mich selbst arbeite.
              </p>
              <p>
                Arbeit und hohe Intensität sind nicht automatisch das Problem. Wenn
                mich etwas begeistert und ich einen Sinn darin sehe, kann intensive
                Arbeit sogar Energie geben. Quälend wird es dort, wo man dauerhaft
                gegen sich selbst arbeitet, nur noch funktioniert oder versucht, ein
                Leben aufrechtzuerhalten, das nicht mehr zu einem passt.
              </p>

              <Kapitel>Von einzelnen Methoden zum Gesamtbild</Kapitel>
              <p>
                Aus all dem ist nicht über Nacht ein Modell entstanden. Über Jahre
                wuchs ein Gesamtbild. Ich hatte viele einzelne Systeme
                kennengelernt: Kommunikation, NLP, Reframing, Meditation, Verkauf,
                Psychologie, Spiritualität, Erfolgsmodelle, Marketing,
                Storytelling, Technik, Unternehmertum, Coaching und
                Bewusstseinsarbeit – und meine eigenen Krisen und Muster.
              </p>
              <p>
                Und immer wieder fehlte mir etwas:{" "}
                <em className="accent not-italic font-medium">der Zusammenhang</em>.
                Eine Methode kann an einer Stelle helfen. Aber sie erklärt nicht
                automatisch das ganze System Mensch.
              </p>
              <Kernsatz>
                Ich hatte viel Wissen. Aber Wissen allein verändert noch kein Leben.
              </Kernsatz>
              <p>
                Daraus wuchs der Wunsch, die einzelnen Puzzleteile in eine
                nachvollziehbare Struktur zu bringen.
              </p>

              <aside className="glow-gold rounded-2xl border border-gold-400/25 bg-surface p-6 shadow-card">
                <p className="text-ink">
                  Die{" "}
                  <Link
                    href="/die-7-stufen"
                    className="font-medium text-accent underline decoration-accent/40 underline-offset-4 hover:decoration-accent"
                  >
                    7 Stufen der Bewusstseinsentwicklung
                  </Link>{" "}
                  sind der heutige Stand dieses Weges.
                </p>
                <p className="mt-2 text-ink-mid">
                  Nicht als absolute Wahrheit, nicht als fertige Wissenschaft,
                  nicht als Therapie und nicht als Heilsversprechen. Sondern als
                  Landkarte und Orientierungssystem.
                </p>
              </aside>

              <p>
                Werde Meister deiner Gedanken ist dabei selbst noch in
                Entwicklung. Es ist die Basis eines größeren Systems, das Wissen,
                praktische Anwendung, Reflexion und Bewusstseinsentwicklung
                langfristig enger miteinander verbinden soll.
              </p>
              <p>
                Erkennen ist der Anfang. Entscheidend ist, was daraus im Alltag
                entsteht.
              </p>
              <blockquote className="border-l-2 border-accent/40 pl-5">
                <p className="font-display text-xl italic leading-snug text-ink sm:text-2xl">
                  Bewusstsein wird erst durch Handlung wirksam.
                </p>
              </blockquote>
            </div>
          </Reveal>

          <Reveal delay={160}>
            <div className="mt-9 flex flex-wrap gap-3">
              <Button href="/die-7-stufen" variant="accent" className="w-fit">
                Die 7 Stufen ansehen
                <ArrowRight />
              </Button>
              <Button href="/kontakt" variant="secondary" className="w-fit">
                Nachricht schreiben
              </Button>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Auf einen Blick – verkürzte Phasen, keine Wiederholung des Fließtexts */}
      <section className="bg-paper-aura grain-soft relative py-16 sm:py-24">
        <Container size="narrow">
          <Eyebrow>Mein Weg auf einen Blick</Eyebrow>
          <ol className="relative mt-10">
            <span
              aria-hidden
              className="absolute left-[7px] top-2 bottom-3 w-px bg-gradient-to-b from-gold-500/55 via-gold-400/35 to-transparent"
            />
            {phases.map((m) => (
              <Reveal key={m.year}>
                <li className="relative flex gap-6 pb-9 last:pb-0">
                  <span
                    aria-hidden
                    className="relative z-10 mt-1.5 h-3.5 w-3.5 shrink-0 rounded-full bg-gradient-to-br from-gold-400 to-gold-500 ring-4 ring-surface-2"
                  />
                  <div className="-mt-1 min-w-0">
                    <span className="font-display text-sm italic text-accent/80">
                      {m.year}
                    </span>
                    <h3 className="mt-0.5 text-lg font-medium text-ink">
                      {m.title}
                    </h3>
                    <p className="mt-1 text-sm leading-relaxed text-ink-mid">
                      {m.text}
                    </p>
                  </div>
                </li>
              </Reveal>
            ))}
          </ol>
        </Container>
      </section>

      {/* Woher meine Perspektive kommt – tatsächliche Grundlagen + Abgrenzung */}
      <section className="bg-surface-aura grain-soft relative py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Woher meine Perspektive kommt</Eyebrow>
            <h2 className="mt-4 text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
              Erfahrung aus <em className="accent">unterschiedlichen Welten</em>
            </h2>
            <p className="mt-5 text-[1.05rem] leading-relaxed text-ink-mid">
              Die Inhalte von Werde Meister deiner Gedanken sind aus Ausbildung,
              Berufspraxis, Weiterbildung, Selbststudium und eigener Erfahrung
              gewachsen:
            </p>
          </div>
          <div className="mt-10 grid gap-5 sm:grid-cols-2">
            {foundations.map((f, i) => (
              <Reveal key={f.title} delay={(i % 2) * 80}>
                <div className="h-full rounded-2xl border border-ink/10 bg-surface p-6 shadow-card">
                  <span className="font-display text-2xl italic text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-2 text-lg font-medium text-ink">{f.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink-mid">{f.text}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <p className="mt-8 max-w-2xl text-sm leading-relaxed text-ink-muted">
            Wichtig: Aus diesen Ausbildungen und Erfahrungen ergibt sich keine
            ärztliche, psychotherapeutische oder heilkundliche Qualifikation. Die
            Inhalte von Werde Meister deiner Gedanken dienen der persönlichen
            Selbstreflexion, Bewusstseinsentwicklung und allgemeinen
            Wissensvermittlung. Sie ersetzen keine medizinische,
            psychotherapeutische oder sonstige heilkundliche Diagnose oder
            Behandlung. Bei psychischen oder körperlichen Beschwerden wende dich
            bitte an entsprechend qualifizierte Fachpersonen.
          </p>
        </Container>
      </section>

      {/* Werte – dunkles Kontrast-Band, die Zahlen leuchten auf Navy */}
      <section className="relative isolate overflow-hidden bg-cosmic on-dark py-20 sm:py-28">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 -z-10 bg-stars opacity-70"
        />
        <Container>
          <Eyebrow>Was mich leitet</Eyebrow>
          <h2 className="mt-4 text-[2rem] font-medium text-ink sm:text-4xl">
            Meine Werte
          </h2>
          <div className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v, i) => (
              <Reveal key={v.title} delay={(i % 4) * 70}>
                <div className="flex flex-col gap-2 border-t border-white/15 pt-5">
                  <span className="font-display text-3xl italic text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="text-lg font-medium text-ink">{v.title}</h3>
                  <p className="text-sm leading-relaxed text-ink-mid">
                    {v.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      {/* Nächste Schritte – die Seite endet nicht bei den Werten, sondern
          zeigt die nächsten Möglichkeiten */}
      <section className="bg-paper-aura grain-soft relative py-16 sm:py-24">
        <Container>
          <div className="max-w-2xl">
            <Eyebrow>Wie es weitergeht</Eyebrow>
            <h2 className="mt-4 text-[2rem] font-medium leading-[1.12] text-ink sm:text-4xl">
              Dein <em className="accent">nächster Schritt</em>
            </h2>
          </div>
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {nextSteps.map((n, i) => (
              <Reveal key={n.href} delay={i * 80}>
                <Link
                  href={n.href}
                  className="group flex h-full flex-col rounded-2xl border border-ink/10 bg-surface p-6 shadow-card transition hover:-translate-y-0.5 hover:border-accent/40 focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
                >
                  <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent/90">
                    {n.eyebrow}
                  </span>
                  <h3 className="mt-2 text-xl font-medium text-ink">{n.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink-mid">{n.text}</p>
                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-accent">
                    Ansehen
                    <ArrowRight className="transition group-hover:translate-x-0.5" />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
