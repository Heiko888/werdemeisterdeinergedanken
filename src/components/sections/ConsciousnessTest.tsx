"use client";

import { useEffect, useMemo, useRef, useState, type FormEvent } from "react";
import { Card } from "@/components/ui/Card";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { ArrowRight, Check } from "@/components/ui/Icon";
import {
  answerScale,
  testQuestions,
  testStages,
  scoreByStage,
  topStage,
  getTestStage,
  MAX_PER_STAGE,
} from "@/lib/consciousness-test";
import { saveStartStage } from "@/app/bewusstseinstest/actions";
import { cn } from "@/lib/cn";
import { trackEvent } from "@/lib/analytics";
import { getUtm } from "@/lib/utm";

// Zwischenspeicher der Antworten – überlebt den Login-Umweg (siehe unten).
const TEST_STORAGE_KEY = "wmdg:test-antworten";
// Merkt sich (nur für diesen Tab), dass die E-Mail-Schranke schon passiert
// wurde – wer den Test im selben Tab wiederholt, muss sie nicht erneut sehen.
const LEAD_DONE_KEY = "wmdg:test-lead";

/**
 * Sichtbarkeit des Ergebnisses:
 *   checking → Test fertig, wir prüfen gerade, ob jemand angemeldet ist
 *   email    → nicht angemeldet: E-Mail-Schranke (Lead) vor dem Ergebnis
 *   open     → Ergebnis sichtbar (Mitglied gespeichert ODER E-Mail abgegeben)
 */
type Gate = "checking" | "email" | "open";

export function ConsciousnessTest() {
  const total = testQuestions.length;
  const [answers, setAnswers] = useState<(number | null)[]>(
    () => new Array(total).fill(null),
  );
  const [current, setCurrent] = useState(0);
  const [done, setDone] = useState(false);
  // Wurde das Ergebnis am (eingeloggten) Profil gespeichert?
  const [memberSaved, setMemberSaved] = useState(false);
  const savedRef = useRef(false);
  const [gate, setGate] = useState<Gate>("checking");
  // Rückmeldung der Lead-Route: "confirm" = Bestätigungsmail unterwegs.
  const [leadMode, setLeadMode] = useState<string | null>(null);
  const trackedRef = useRef(false);

  const scores = useMemo(() => scoreByStage(answers), [answers]);
  const resultNr = useMemo(() => topStage(scores), [scores]);
  const resultStage = getTestStage(resultNr);

  // Rehydration nach Rückkehr vom Login (?fortsetzen=1): zwischengespeicherte
  // Antworten laden und direkt ins Ergebnis springen, damit die Action das
  // Ergebnis nun (angemeldet) nachträgt – der Test muss nicht neu gemacht werden.
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    if (params.get("fortsetzen") !== "1") return;
    try {
      const raw = window.localStorage.getItem(TEST_STORAGE_KEY);
      const saved: unknown = raw ? JSON.parse(raw) : null;
      if (
        Array.isArray(saved) &&
        saved.length === total &&
        saved.every((v) => typeof v === "number")
      ) {
        // Bewusstes einmaliges Synchronisieren beim Mount: Die Quelle
        // (URL-Parameter + localStorage) steht auf dem Server nicht zur
        // Verfügung, ein Lazy-Init im useState würde einen Hydration-Mismatch
        // erzeugen. Deshalb hier per Effekt und nur bei ?fortsetzen=1.
        /* eslint-disable react-hooks/set-state-in-effect */
        setAnswers(saved as number[]);
        setCurrent(total - 1);
        setDone(true);
        /* eslint-enable react-hooks/set-state-in-effect */
      }
    } catch {
      // Defekter Eintrag → ignorieren.
    }
    // Parameter entfernen, damit ein Reload das Ergebnis nicht erneut erzwingt.
    params.delete("fortsetzen");
    const rest = params.toString();
    window.history.replaceState(
      null,
      "",
      window.location.pathname + (rest ? `?${rest}` : ""),
    );
  }, [total]);

  // Antworten zwischenspeichern, sobald der Test fertig ist – überlebt so den
  // Login-Umweg für ausgeloggte Mitglieder.
  useEffect(() => {
    if (!done || typeof window === "undefined") return;
    try {
      window.localStorage.setItem(TEST_STORAGE_KEY, JSON.stringify(answers));
    } catch {
      // Speicher nicht verfügbar (privater Modus o. Ä.) → unkritisch.
    }
  }, [done, answers]);

  // Beim Abschluss einmalig versuchen, das Ergebnis zu speichern.
  // Ist niemand angemeldet, gibt die Action still `{ saved: false }` zurück –
  // dann kommt vor dem Ergebnis die E-Mail-Schranke (Lead), es sei denn, sie
  // wurde in diesem Tab schon passiert. Für Mitglieder bleibt alles wie bisher.
  useEffect(() => {
    if (!done || !resultStage || savedRef.current) return;
    savedRef.current = true;
    saveStartStage(answers)
      .then((res) => {
        setMemberSaved(res.saved);
        // Erfolgreich am Profil gespeichert → Zwischenspeicher entfernen.
        if (res.saved && typeof window !== "undefined") {
          try {
            window.localStorage.removeItem(TEST_STORAGE_KEY);
          } catch {
            // ignorieren
          }
        }
        let leadDone = false;
        try {
          leadDone = window.sessionStorage.getItem(LEAD_DONE_KEY) === "1";
        } catch {
          // ignorieren
        }
        setGate(res.saved || leadDone ? "open" : "email");
      })
      .catch(() => setGate("email"));
  }, [done, resultStage, answers]);

  // Ergebnis sichtbar → einmalig als Konversion melden (nur mit Einwilligung).
  useEffect(() => {
    if (gate !== "open" || !resultStage || trackedRef.current) return;
    trackedRef.current = true;
    trackEvent("test_complete", { stufe: resultStage.nr, member: memberSaved });
  }, [gate, resultStage, memberSaved]);

  function choose(value: number) {
    setAnswers((prev) => {
      const next = [...prev];
      next[current] = value;
      return next;
    });
    if (current < total - 1) {
      setCurrent((c) => c + 1);
    } else {
      setDone(true);
    }
  }

  function restart() {
    setAnswers(new Array(total).fill(null));
    setCurrent(0);
    setDone(false);
    setMemberSaved(false);
    setGate("checking");
    setLeadMode(null);
    savedRef.current = false;
    trackedRef.current = false;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(TEST_STORAGE_KEY);
      } catch {
        // ignorieren
      }
      window.scrollTo({ top: 0 });
    }
  }

  /* ---------- Auswertung läuft ---------- */
  if (done && resultStage && gate === "checking") {
    return (
      <Container size="narrow" className="flex flex-col items-center gap-3 py-16 text-center">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
          Dein Ergebnis
        </span>
        <p className="text-ink-mid" aria-live="polite">
          Einen Moment – deine Antworten werden ausgewertet …
        </p>
      </Container>
    );
  }

  /* ---------- E-Mail-Schranke (nur ohne Anmeldung) ---------- */
  if (done && resultStage && gate === "email") {
    return (
      <EmailGate
        stufe={resultStage.nr}
        answers={answers}
        onDone={(mode) => {
          setLeadMode(mode);
          try {
            window.sessionStorage.setItem(LEAD_DONE_KEY, "1");
          } catch {
            // ignorieren
          }
          setGate("open");
          window.scrollTo({ top: 0 });
        }}
      />
    );
  }

  /* ---------- Ergebnis ---------- */
  if (done && resultStage) {
    return (
      <Container size="narrow" className="flex flex-col gap-10 py-6">
        <div className="flex flex-col items-center gap-3 text-center">
          <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
            Dein Ergebnis
          </span>
          <p className="text-sm text-ink-muted">
            Deine aktuelle Hauptstufe
          </p>
          <h2 className="font-display text-[2rem] font-medium leading-tight text-ink sm:text-4xl">
            Stufe {resultStage.nr}:{" "}
            <em className="accent not-italic">{resultStage.name}</em>
          </h2>
          <p className="text-base font-medium uppercase tracking-wider text-ink-muted">
            {resultStage.tagline}
          </p>
        </div>

        {/* Profil über alle Stufen */}
        <Card className="sm:p-8">
          <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-ink-muted">
            Dein Profil
          </h3>
          <ul className="mt-5 flex flex-col gap-3">
            {testStages.map((stage) => {
              const pct = Math.round(
                (scores[stage.nr - 1] / MAX_PER_STAGE) * 100,
              );
              const active = stage.nr === resultStage.nr;
              return (
                <li key={stage.nr} className="flex items-center gap-3">
                  <span
                    className={cn(
                      "w-6 shrink-0 text-right font-display text-sm italic",
                      active ? "text-accent" : "text-ink-muted",
                    )}
                  >
                    {stage.nr}
                  </span>
                  <span
                    className={cn(
                      "w-36 shrink-0 truncate text-sm sm:w-44",
                      active
                        ? "font-medium text-ink"
                        : "text-ink-mid",
                    )}
                  >
                    {stage.name}
                  </span>
                  <span className="relative h-2.5 flex-1 overflow-hidden rounded-full bg-ink/[0.06]">
                    <span
                      className={cn(
                        "absolute inset-y-0 left-0 rounded-full",
                        active
                          ? "bg-gradient-to-r from-gold-400 to-gold-500"
                          : "bg-ink/20",
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </Card>

        {/* Auswertungstext */}
        <div className="flex flex-col gap-6">
          <p className="text-lg leading-relaxed text-ink-mid">
            {resultStage.result.summary}
          </p>

          {[
            { label: "Deine Herausforderung", text: resultStage.result.challenge },
            { label: "Dein Potenzial", text: resultStage.result.potential },
            { label: "Dein nächster Schritt", text: resultStage.result.nextStep },
          ].map((block) => (
            <div key={block.label} className="flex flex-col gap-1.5">
              <h3 className="text-[0.8rem] font-semibold uppercase tracking-[0.15em] text-accent">
                {block.label}
              </h3>
              <p className="leading-relaxed text-ink-mid">{block.text}</p>
            </div>
          ))}

          <div className="flex flex-col items-start gap-4 rounded-2xl border border-accent/25 bg-white p-8 shadow-card">
            <h3 className="font-display text-xl italic text-ink">
              Meine Empfehlung
            </h3>
            <p className="max-w-xl leading-relaxed text-ink-mid">
              {resultStage.result.recommendation}
            </p>
            {memberSaved && (
              <p className="max-w-xl text-sm leading-relaxed text-accent">
                Dein Ergebnis ist in deinem Bereich gespeichert – dein
                Gedankenprofil zeigt dir jetzt, wo noch Bedarf ist.
              </p>
            )}
            {!memberSaved && leadMode === "confirm" && (
              <p className="max-w-xl text-sm leading-relaxed text-accent">
                Wir haben dir eine E-Mail geschickt – bitte bestätige darin kurz
                deine Adresse. Dann kommt dein Ergebnis samt Gratis-Kapitel auch
                in dein Postfach (schau ggf. im Spam-Ordner nach).
              </p>
            )}
            <div className="flex flex-col gap-3 sm:flex-row">
              {memberSaved ? (
                <>
                  <Button href="/mitglieder/gedankenprofil" variant="accent">
                    Zu meinem Gedankenprofil
                    <ArrowRight />
                  </Button>
                  <Button href={`/mitglieder/stufe/${resultStage.nr}`} variant="secondary">
                    Direkt zu Stufe {resultStage.nr}
                  </Button>
                </>
              ) : (
                <>
                  <Button href={`/bewusstseinstest/ergebnis/${resultStage.nr}`} variant="accent">
                    Dein Gratis-Kapitel zu Stufe {resultStage.nr}
                    <ArrowRight />
                  </Button>
                  <Button href="/mitgliedschaft" variant="secondary">
                    Mitgliedschaft 7 Tage testen
                  </Button>
                </>
              )}
            </div>
            {!memberSaved && (
              <p className="max-w-xl text-sm leading-relaxed text-ink-mid">
                Schon Mitglied?{" "}
                <a
                  href="/login?redirect=%2Fbewusstseinstest%3Ffortsetzen%3D1"
                  className="font-medium text-accent underline-offset-2 hover:underline"
                >
                  Melde dich an
                </a>{" "}
                – dann speichern wir dein Ergebnis in deinem Bereich und tragen
                es in deinen Verlauf ein. Deine Antworten bleiben dafür kurz
                gespeichert.
              </p>
            )}
          </div>

          <button
            type="button"
            onClick={restart}
            className="inline-flex min-h-11 items-center justify-center self-center px-4 py-2 text-sm font-medium text-ink-muted underline-offset-4 transition-colors hover:text-ink hover:underline"
          >
            Test wiederholen
          </button>
        </div>
      </Container>
    );
  }

  /* ---------- Fragen ---------- */
  const question = testQuestions[current];
  const progress = Math.round(((current + (answers[current] != null ? 1 : 0)) / total) * 100);

  return (
    <Container size="narrow" className="flex flex-col gap-8 py-6">
      {/* Fortschritt */}
      <div className="flex flex-col gap-2" aria-live="polite">
        <div className="flex items-center justify-between text-xs font-medium text-ink-muted">
          <span>
            Frage {current + 1} von {total}
          </span>
          <span>{progress}%</span>
        </div>
        <div
          role="progressbar"
          aria-valuenow={progress}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={`Fortschritt: Frage ${current + 1} von ${total}`}
          className="h-1.5 w-full overflow-hidden rounded-full bg-ink/[0.06]"
        >
          <span
            className="block h-full rounded-full bg-gradient-to-r from-gold-400 to-gold-500 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Frage */}
      <p
        id="test-frage"
        className="min-h-[3.5rem] font-display text-xl leading-snug text-ink sm:text-2xl"
      >
        {question.text}
      </p>

      {/* Antworten – als Gruppe an die Frage gekoppelt, damit der Bezug auch
          bei Sprung-Navigation mit Screenreadern erhalten bleibt. */}
      <div
        role="group"
        aria-labelledby="test-frage"
        className="flex flex-col gap-3"
      >
        {answerScale.map((option) => {
          const selected = answers[current] === option.value;
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => choose(option.value)}
              className={cn(
                "flex items-center justify-between gap-3 rounded-xl border px-5 py-4 text-left text-[0.98rem] font-medium transition-all duration-200",
                selected
                  ? "border-accent bg-accent/[0.06] text-ink"
                  : "border-ink/12 bg-white text-ink-soft hover:border-accent/40 hover:text-ink",
              )}
            >
              {option.label}
              <span
                className={cn(
                  "flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-[0.6rem]",
                  selected
                    ? "border-accent bg-accent/15 text-accent"
                    : "border-ink/20 text-transparent",
                )}
              >
                <Check />
              </span>
            </button>
          );
        })}
      </div>

      {/* Zurück */}
      {current > 0 && (
        <button
          type="button"
          onClick={() => setCurrent((c) => c - 1)}
          className="group -mx-3 inline-flex min-h-11 items-center gap-2 self-start rounded-lg px-3 py-2 text-sm font-medium text-ink-mid transition-colors hover:bg-ink/[0.03] hover:text-ink"
        >
          <ArrowRight className="rotate-180 transition-transform duration-300 group-hover:-translate-x-1" />
          Zurück
        </button>
      )}
    </Container>
  );
}

/* ---------- E-Mail-Schranke vor dem Ergebnis (Lead, Double-Opt-in) ---------- */

type GateStatus = "idle" | "sending" | "error";

/**
 * Fragt vor dem Ergebnis E-Mail + Einwilligung ab und meldet den Lead an
 * /api/test-lead (Vorbild: EbookForm). Die Stufe wird dort serverseitig aus
 * den rohen Antworten neu berechnet. Bei „nicht eingerichtet" (kein Resend /
 * Supabase) antwortet die Route trotzdem mit 200 – das Ergebnis erscheint
 * immer. Nur echte Fehler (ungültige Adresse, Versand klemmt) halten die
 * Schranke offen und zeigen die Meldung.
 */
function EmailGate({
  stufe,
  answers,
  onDone,
}: {
  stufe: number;
  answers: (number | null)[];
  onDone: (mode: string) => void;
}) {
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(false);
  const [company, setCompany] = useState(""); // Honeypot
  const [status, setStatus] = useState<GateStatus>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!email || !consent || status === "sending") return;
    setStatus("sending");
    setError(null);
    try {
      const res = await fetch("/api/test-lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          company,
          answers,
          source: "bewusstseinstest",
          ...getUtm(),
        }),
      });
      const data = await res.json().catch(() => ({}));
      if (res.ok) {
        if (data?.mode !== "not_configured") {
          trackEvent("generate_lead", { source: "bewusstseinstest", stufe });
        }
        onDone(typeof data?.mode === "string" ? data.mode : "confirm");
        return;
      }
      setError(data?.error ?? "Senden fehlgeschlagen. Bitte versuch es noch einmal.");
      setStatus("error");
    } catch {
      setError("Verbindung fehlgeschlagen. Bitte versuch es noch einmal.");
      setStatus("error");
    }
  }

  return (
    <Container size="narrow" className="flex flex-col gap-8 py-6">
      <div className="flex flex-col items-center gap-3 text-center">
        <span className="text-[0.7rem] font-semibold uppercase tracking-[0.2em] text-accent">
          Fast geschafft
        </span>
        <h2 className="font-display text-[2rem] font-medium leading-tight text-ink sm:text-4xl">
          Dein Ergebnis ist <em className="accent not-italic">fertig</em>.
        </h2>
        <p className="max-w-xl text-lg leading-relaxed text-ink-mid">
          Wohin dürfen wir es schicken? Du bekommst deine Auswertung, das
          Gratis-Kapitel zu deiner Stufe und in den nächsten Tagen ein paar
          kurze Mails von Heiko – ehrlich, ohne Druck, jederzeit abbestellbar.
        </p>
      </div>

      <Card as="form" onSubmit={handleSubmit} className="flex flex-col gap-4 sm:p-8">
        <div className="flex flex-col gap-3 sm:flex-row">
          <label htmlFor="test-email" className="sr-only">
            Deine E-Mail-Adresse
          </label>
          <input
            id="test-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Deine E-Mail-Adresse"
            className="h-13 flex-1 rounded-xl border border-ink/15 bg-paper/60 px-5 text-sm text-ink placeholder:text-ink-muted focus:border-accent focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent"
          />
          {/* Honeypot: für echte Nutzer unsichtbar, füllen nur Bots aus. */}
          <input
            type="text"
            name="company"
            tabIndex={-1}
            autoComplete="off"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            className="hidden"
            aria-hidden="true"
          />
          <Button
            type="submit"
            variant="accent"
            size="lg"
            disabled={status === "sending" || !consent}
            className="shrink-0 whitespace-nowrap"
          >
            {status === "sending" ? "Wird gesendet …" : "Ergebnis anzeigen"}
            <ArrowRight />
          </Button>
        </div>

        <label className="flex items-start gap-3 text-sm leading-relaxed text-ink-mid">
          <input
            type="checkbox"
            required
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-[var(--color-gold-500)]"
          />
          <span>
            Ja, schickt mir mein Ergebnis, das Gratis-Kapitel und weitere
            E-Mails zur Bewusstseinsentwicklung. Ich kann mich jederzeit mit
            einem Klick abmelden. Es gilt die{" "}
            <a href="/datenschutz" className="underline hover:text-ink">
              Datenschutzerklärung
            </a>
            .
          </span>
        </label>

        {error && (
          <p className="text-sm text-red-700" role="alert">
            {error}
          </p>
        )}

        <p className="text-xs text-ink-muted">
          Kein Spam, keine Weitergabe. Du bekommst zuerst eine kurze
          Bestätigungsmail (Double-Opt-in).{" "}
          Schon Mitglied?{" "}
          <a
            href="/login?redirect=%2Fbewusstseinstest%3Ffortsetzen%3D1"
            className="font-medium text-accent underline-offset-2 hover:underline"
          >
            Melde dich an
          </a>{" "}
          – dann speichern wir dein Ergebnis direkt in deinem Bereich.
        </p>
      </Card>
    </Container>
  );
}
