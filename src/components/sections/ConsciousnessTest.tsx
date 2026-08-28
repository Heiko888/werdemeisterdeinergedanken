"use client";

import { useEffect, useMemo, useRef, useState } from "react";
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

// Zwischenspeicher der Antworten – überlebt den Login-Umweg (siehe unten).
const TEST_STORAGE_KEY = "wmdg:test-antworten";

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
  // Ist niemand angemeldet, gibt die Action still `{ saved: false }` zurück.
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
      })
      .catch(() => {});
  }, [done, resultStage, answers]);

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
    savedRef.current = false;
    if (typeof window !== "undefined") {
      try {
        window.localStorage.removeItem(TEST_STORAGE_KEY);
      } catch {
        // ignorieren
      }
      window.scrollTo({ top: 0 });
    }
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
        <div className="rounded-2xl border border-ink/10 bg-white p-6 shadow-card sm:p-8">
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
                          ? "bg-gradient-to-r from-leaf-500 to-teal-500"
                          : "bg-ink/20",
                      )}
                      style={{ width: `${pct}%` }}
                    />
                  </span>
                </li>
              );
            })}
          </ul>
        </div>

        {/* Auswertungstext */}
        <div className="flex flex-col gap-6">
          <p className="text-lg leading-relaxed text-ink-soft/85">
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
              <p className="leading-relaxed text-ink-soft/85">{block.text}</p>
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
                  <Button href="/kontakt" variant="accent">
                    Kostenloses Klarheitsgespräch
                    <ArrowRight />
                  </Button>
                  <Button href="/#angebot" variant="secondary">
                    E-Book sichern
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
            className="block h-full rounded-full bg-gradient-to-r from-leaf-500 to-teal-500 transition-all duration-300"
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
