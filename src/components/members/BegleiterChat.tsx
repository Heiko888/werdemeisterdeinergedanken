"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { clearConversation } from "@/app/mitglieder/begleiter/actions";
import { cn } from "@/lib/cn";
import {
  BEGLEITER_SUGGESTIONS,
  BEGLEITER_WELCOME,
  MAX_INPUT_CHARS,
  begleiterErrorText,
  type BegleiterError,
  type ChatMessage,
} from "@/lib/begleiter";

/**
 * KI-Begleiter – das Gespräch.
 *
 * Die Antwort kommt gestreamt vom Route-Handler `/mitglieder/begleiter/antwort`
 * und wächst Wort für Wort im Blasenfeld. Der Verlauf liegt serverseitig in
 * Supabase; hier steht nur die Anzeige.
 */

/**
 * Erkennt Links im Antworttext und macht sie anklickbar.
 *
 * Der Begleiter nennt Inhalte als echte Pfade (z. B. „(/mitglieder/praxis/
 * atembeobachtung)"). Zwei Fälle werden linkbar gemacht:
 * - **Interne Pfade** unter bekannten Startsegmenten → Next-`<Link>` (schnelle
 *   In-App-Navigation, kein voller Neuladen). Die Allowlist verhindert, dass
 *   Alltags-Schrägstriche wie „und/oder" fälschlich zu Links werden.
 * - **Echte URLs** (`http(s)://…`) → normaler Link in neuem Tab.
 */
const LINK_RE =
  /(https?:\/\/[^\s)]+)|(\/(?:mitglieder|bewusstseinstest|kontakt|blog|die-7-stufen|mitgliedschaft|ueber-mich|datenschutz|impressum)(?:\/[\w-]+)*)/g;

const linkClass =
  "font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:text-ink hover:decoration-ink/40 [overflow-wrap:anywhere]";

function linkify(text: string): ReactNode[] {
  const out: ReactNode[] = [];
  let last = 0;
  let key = 0;
  LINK_RE.lastIndex = 0;
  for (let m = LINK_RE.exec(text); m !== null; m = LINK_RE.exec(text)) {
    if (m.index > last) out.push(text.slice(last, m.index));
    const treffer = m[0];
    if (m[1]) {
      // Externe URL – neuer Tab, Referrer sparsam. Nachlaufende Satzzeichen
      // (z. B. der Punkt am Satzende) gehören nicht in die URL, sondern bleiben
      // als Text stehen.
      const tail = treffer.match(/[.,;:!?]+$/)?.[0] ?? "";
      const url = tail ? treffer.slice(0, -tail.length) : treffer;
      out.push(
        <a
          key={key++}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className={linkClass}
        >
          {url}
        </a>,
      );
      if (tail) out.push(tail);
    } else {
      // Interner Pfad – In-App-Navigation.
      out.push(
        <Link key={key++} href={treffer} className={linkClass}>
          {treffer}
        </Link>,
      );
    }
    last = m.index + treffer.length;
  }
  if (last < text.length) out.push(text.slice(last));
  return out;
}

/** Antworttext in Absätze zerlegen – Zeilenumbrüche innerhalb bleiben erhalten. */
function Paragraphs({ text }: { text: string }) {
  return (
    <>
      {text.split(/\n{2,}/).map((para, i) => (
        <p key={i} className="whitespace-pre-wrap">
          {linkify(para.trim())}
        </p>
      ))}
    </>
  );
}

export function BegleiterChat({
  initialMessages,
  fill = false,
}: {
  initialMessages: ChatMessage[];
  /**
   * `true` = das Gespräch füllt einen fest hohen Rahmen (Overlay-Panel):
   * der Verlauf scrollt für sich, Eingabe und Knöpfe bleiben unten stehen.
   * `false` (Standard) = wächst als Karte auf der eigenen Seite mit.
   */
  fill?: boolean;
}) {
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages);
  const [draft, setDraft] = useState("");
  const [streaming, setStreaming] = useState<string | null>(null);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [clearing, setClearing] = useState(false);

  const endRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Ans Ende scrollen, sobald etwas dazukommt – aber nie beim ersten Aufbau,
  // sonst springt die Seite direkt nach dem Laden.
  const mounted = useRef(false);
  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, streaming]);

  async function send(text: string) {
    const frage = text.trim();
    if (!frage || pending) return;

    setError(null);
    setPending(true);
    setDraft("");
    // Die eigene Frage sofort zeigen; die id ist nur fürs Rendern gedacht,
    // beim nächsten Laden kommt die echte aus der Datenbank.
    setMessages((prev) => [
      ...prev,
      {
        id: `lokal-${prev.length}`,
        role: "user",
        body: frage,
        createdAt: new Date().toISOString(),
      },
    ]);
    setStreaming("");

    try {
      const response = await fetch("/mitglieder/begleiter/antwort", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: frage }),
      });

      if (!response.ok || !response.body) {
        let kind: BegleiterError = "error";
        try {
          const data = (await response.json()) as { error?: BegleiterError };
          if (data.error && data.error in begleiterErrorText) kind = data.error;
        } catch {
          // Keine verwertbare Antwort – bleibt beim allgemeinen Hinweis.
        }
        setError(begleiterErrorText[kind]);
        setStreaming(null);
        return;
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let answer = "";

      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        answer += decoder.decode(value, { stream: true });
        setStreaming(answer);
      }
      answer += decoder.decode();

      if (answer.trim()) {
        setMessages((prev) => [
          ...prev,
          {
            id: `lokal-antwort-${prev.length}`,
            role: "assistant",
            body: answer.trim(),
            createdAt: new Date().toISOString(),
          },
        ]);
      } else {
        setError(begleiterErrorText.error);
      }
    } catch {
      setError(begleiterErrorText.error);
    } finally {
      setStreaming(null);
      setPending(false);
      inputRef.current?.focus();
    }
  }

  async function onClear() {
    setClearing(true);
    setError(null);
    try {
      const res = await clearConversation();
      if (res.ok) {
        setMessages([]);
      } else {
        setError("Das Gespräch konnte gerade nicht gelöscht werden.");
      }
    } catch {
      setError("Das Gespräch konnte gerade nicht gelöscht werden.");
    } finally {
      setClearing(false);
    }
  }

  const leer = messages.length === 0 && streaming === null;
  const zuLang = draft.length > MAX_INPUT_CHARS;

  return (
    <div
      className={cn(
        "flex flex-col bg-white",
        fill
          ? "h-full gap-4 p-4"
          : "gap-5 rounded-2xl border border-accent/25 p-5 shadow-card sm:p-7",
      )}
    >
      {/* Verlauf */}
      <div
        className={cn(
          "flex flex-col gap-4",
          // Im Panel scrollt nur der Verlauf; Eingabe & Knöpfe bleiben unten.
          fill && "min-h-0 flex-1 overflow-y-auto pr-1",
        )}
      >
        {leer && (
          <div className="rounded-2xl border border-ink/10 bg-paper/60 px-5 py-4">
            <p className="text-[1.02rem] leading-relaxed text-ink-soft/90">
              {BEGLEITER_WELCOME}
            </p>
          </div>
        )}

        {messages.map((m) =>
          m.role === "user" ? (
            <div key={m.id} className="flex justify-end">
              <div className="max-w-[85%] rounded-2xl rounded-br-md bg-ink px-5 py-3.5 text-[0.98rem] leading-relaxed text-paper">
                <p className="whitespace-pre-wrap">{m.body}</p>
              </div>
            </div>
          ) : (
            <div key={m.id} className="flex justify-start">
              <div className="flex max-w-[92%] flex-col gap-3 rounded-2xl rounded-bl-md border border-ink/10 bg-paper/60 px-5 py-4 text-[1.02rem] leading-relaxed text-ink-soft/90">
                <Paragraphs text={m.body} />
              </div>
            </div>
          ),
        )}

        {/* Laufende Antwort */}
        {streaming !== null && (
          <div className="flex justify-start" aria-live="polite">
            <div className="flex max-w-[92%] flex-col gap-3 rounded-2xl rounded-bl-md border border-ink/10 bg-paper/60 px-5 py-4 text-[1.02rem] leading-relaxed text-ink-soft/90">
              {streaming ? (
                <Paragraphs text={streaming} />
              ) : (
                <p className="text-ink-muted">Der Begleiter denkt nach …</p>
              )}
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Einstiegsfragen, solange noch nichts gesagt wurde */}
      {leer && (
        <div className="flex flex-wrap gap-2">
          {BEGLEITER_SUGGESTIONS.map((s) => (
            <button
              key={s}
              type="button"
              onClick={() => send(s)}
              disabled={pending}
              className="rounded-full border border-ink/15 bg-white px-4 py-2 text-left text-sm text-ink-mid transition-all hover:border-accent/40 hover:text-accent disabled:cursor-not-allowed disabled:opacity-60"
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {error && (
        <p
          role="status"
          className="rounded-xl border border-ink/10 bg-paper/60 px-4 py-3 text-sm leading-relaxed text-ink-mid"
        >
          {error}
        </p>
      )}

      {/* Eingabe */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (!zuLang) send(draft);
        }}
        className="flex flex-col gap-3"
      >
        <label htmlFor="begleiter-frage" className="sr-only">
          Deine Nachricht an den Begleiter
        </label>
        <textarea
          id="begleiter-frage"
          ref={inputRef}
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          onKeyDown={(e) => {
            // Enter sendet, Shift+Enter macht einen Absatz.
            if (e.key === "Enter" && !e.shiftKey) {
              e.preventDefault();
              if (!zuLang) send(draft);
            }
          }}
          rows={3}
          disabled={pending}
          placeholder="Was beschäftigt dich gerade?"
          className="w-full resize-y rounded-2xl border border-ink/15 bg-paper/40 px-4 py-3 text-[1rem] leading-relaxed text-ink placeholder:text-ink-muted focus-visible:border-accent/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:opacity-60"
        />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-3">
            <button
              type="submit"
              disabled={pending || !draft.trim() || zuLang}
              className="inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-semibold text-paper shadow-card transition-all hover:bg-ink/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {pending ? "Antwort kommt …" : "Senden"}
            </button>
            <span className="text-xs text-ink-muted">
              Enter sendet · Umschalt+Enter macht einen Absatz
            </span>
          </div>
          {messages.length > 0 && (
            <button
              type="button"
              onClick={onClear}
              disabled={pending || clearing}
              className="text-xs text-ink-muted underline underline-offset-4 transition-colors hover:text-accent disabled:opacity-60"
            >
              {clearing ? "wird gelöscht …" : "Gespräch löschen"}
            </button>
          )}
        </div>
        {zuLang && (
          <p className="text-xs text-ink-mid">
            {begleiterErrorText.too_long} ({draft.length} Zeichen)
          </p>
        )}
      </form>
    </div>
  );
}
