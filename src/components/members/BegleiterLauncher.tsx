"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { getConversation } from "@/app/mitglieder/begleiter/actions";
import { BegleiterChat } from "@/components/members/BegleiterChat";
import { Chat, Close } from "@/components/ui/Icon";
import type { ChatMessage } from "@/lib/begleiter";

/**
 * Schwebender Begleiter – der Avatar-Knopf unten rechts.
 *
 * Liegt im Mitglieder-Layout und schwimmt damit auf allen /mitglieder-Seiten
 * mit. Ein Klick öffnet das Gespräch als Overlay-Panel; man muss die eigene
 * Begleiter-Seite nicht mehr aufrufen.
 *
 * Der Verlauf wird erst beim ersten Öffnen geladen (kein Datenbank-Aufruf auf
 * jedem Seitenaufruf). Auf der Begleiter-Seite selbst erscheint der Knopf
 * nicht – dort steht das Gespräch ja schon in voller Größe.
 */
export function BegleiterLauncher() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[] | null>(null);
  const [loading, setLoading] = useState(false);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const launcherRef = useRef<HTMLButtonElement>(null);
  // Merkt sich den vorigen Offen-Zustand, um den Fokus nur dann auf den
  // Auslöser zurückzugeben, wenn wirklich geschlossen wurde (nicht beim Mount).
  const wasOpen = useRef(false);

  // Tastaturbedienung des Overlays: Escape schließt, Tab bleibt im Dialog
  // (Fokus-Trap), Fokus wandert beim Öffnen hinein und beim Schließen zurück.
  useEffect(() => {
    if (open) {
      closeRef.current?.focus();
      wasOpen.current = true;
      const onKey = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          setOpen(false);
          return;
        }
        if (e.key !== "Tab") return;
        const focusables = dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), textarea, input:not([disabled]), select, [tabindex]:not([tabindex="-1"])',
        );
        if (!focusables || focusables.length === 0) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first.focus();
        }
      };
      window.addEventListener("keydown", onKey);
      return () => window.removeEventListener("keydown", onKey);
    }
    if (wasOpen.current) {
      launcherRef.current?.focus();
      wasOpen.current = false;
    }
  }, [open]);

  // Auf der eigenen Begleiter-Seite kein Bubble (sonst zwei Gespräche).
  if (pathname?.startsWith("/mitglieder/begleiter")) return null;

  async function toggle() {
    const next = !open;
    setOpen(next);
    // Verlauf nur einmal laden, beim ersten Öffnen.
    if (next && messages === null && !loading) {
      setLoading(true);
      try {
        setMessages(await getConversation());
      } catch {
        setMessages([]);
      } finally {
        setLoading(false);
      }
    }
  }

  return (
    <>
      {/* Overlay-Panel */}
      {open && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label="Dein Begleiter"
          className="fixed bottom-24 right-4 z-50 flex h-[min(600px,calc(100dvh-8rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-accent/25 bg-white shadow-2xl sm:right-6"
        >
          {/* Kopf */}
          <div className="flex items-center justify-between gap-3 border-b border-ink/10 bg-white px-5 py-3.5">
            <div className="flex flex-col">
              <span className="text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-accent">
                Dein Begleiter
              </span>
              <span className="font-display text-base font-medium text-ink">
                Frag mich etwas
              </span>
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Gespräch schließen"
              className="grid h-9 w-9 place-items-center rounded-full text-ink-mid transition-colors hover:bg-ink/5 hover:text-ink"
            >
              <Close />
            </button>
          </div>

          {/* Gespräch */}
          <div className="min-h-0 flex-1 overflow-hidden bg-paper/30">
            {messages === null ? (
              <div className="grid h-full place-items-center px-6 text-center text-sm text-ink-muted">
                Einen Moment – dein Gespräch wird geladen …
              </div>
            ) : (
              <BegleiterChat initialMessages={messages} fill />
            )}
          </div>
        </div>
      )}

      {/* Avatar-Knopf */}
      <button
        ref={launcherRef}
        type="button"
        onClick={toggle}
        aria-expanded={open}
        aria-label={open ? "Gespräch schließen" : "Begleiter öffnen"}
        className="fixed bottom-5 right-4 z-50 grid h-14 w-14 place-items-center rounded-full bg-gradient-to-br from-teal-500 to-brand-500 text-xl text-white shadow-card ring-1 ring-white/40 transition-all hover:scale-105 hover:brightness-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:right-6"
      >
        {open ? <Close /> : <Chat />}
      </button>
    </>
  );
}
