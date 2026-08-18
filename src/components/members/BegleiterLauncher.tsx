"use client";

import { useState } from "react";
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
          role="dialog"
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
