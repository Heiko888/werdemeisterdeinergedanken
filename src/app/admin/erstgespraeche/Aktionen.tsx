"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { ArrowRight, Plus } from "@/components/ui/Icon";
import { gespraechOhneFragebogen, gespraechStarten } from "./actions";

/** „Gespräch starten“ aus einem offenen Fragebogen – legt an und öffnet das Cockpit. */
export function StartGespraechButton({ fragebogenId }: { fragebogenId: string }) {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [fehler, setFehler] = useState<string | null>(null);

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        disabled={pending}
        onClick={() =>
          start(async () => {
            setFehler(null);
            const res = await gespraechStarten(fragebogenId);
            if (res.ok) router.push(`/admin/erstgespraeche/${res.data.id}`);
            else setFehler(res.error);
          })
        }
        className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Öffne …" : "Gespräch starten"}
        <ArrowRight />
      </button>
      {fehler && <span className="text-xs text-red-600">{fehler}</span>}
    </div>
  );
}

/** „Gespräch ohne Fragebogen“ – Name eingeben, anlegen, Cockpit öffnen. */
export function OhneFragebogenButton() {
  const router = useRouter();
  const [pending, start] = useTransition();
  const [offen, setOffen] = useState(false);
  const [name, setName] = useState("");
  const [fehler, setFehler] = useState<string | null>(null);

  if (!offen) {
    return (
      <button
        type="button"
        onClick={() => setOffen(true)}
        className="inline-flex items-center gap-2 rounded-full border border-ink/15 px-5 py-2.5 text-sm font-medium text-ink transition-colors hover:border-ink/30"
      >
        <Plus />
        Gespräch ohne Fragebogen
      </button>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        start(async () => {
          setFehler(null);
          const res = await gespraechOhneFragebogen(name);
          if (res.ok) router.push(`/admin/erstgespraeche/${res.data.id}`);
          else setFehler(res.error);
        });
      }}
      className="flex flex-wrap items-center gap-2"
    >
      <input
        autoFocus
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name des Interessenten"
        className="min-w-[16rem] rounded-full border border-ink/15 bg-paper px-4 py-2 text-sm text-ink outline-none focus:border-accent"
      />
      <button
        type="submit"
        disabled={pending || !name.trim()}
        className="inline-flex items-center gap-2 rounded-full bg-ink px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
      >
        {pending ? "Öffne …" : "Anlegen"}
        <ArrowRight />
      </button>
      <button
        type="button"
        onClick={() => {
          setOffen(false);
          setName("");
          setFehler(null);
        }}
        className="rounded-full px-3 py-2 text-sm text-ink-mid transition-colors hover:text-ink"
      >
        Abbrechen
      </button>
      {fehler && <span className="w-full text-xs text-red-600">{fehler}</span>}
    </form>
  );
}
