"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Plus, Close, ArrowUp } from "@/components/ui/Icon";
import { slugify, type KategorieRow, type MethodeRow } from "@/lib/coaching-methoden";
import { createMethode, updateMethode } from "./actions";

type Props = {
  kategorien: KategorieRow[];
  methode: MethodeRow | null;
};

type FormState = {
  kategorie_id: string;
  name: string;
  herkunft: string;
  kern: string;
  wann_einsetzen: string;
  ablauf: string[];
  beispielfragen: string[];
  dauer: string;
  setting: string;
  hinweise: string;
  tags: string[];
  sortierung: number;
  aktiv: boolean;
  eigene_notizen: string;
};

function initial(methode: MethodeRow | null, kategorien: KategorieRow[]): FormState {
  if (methode) {
    return {
      kategorie_id: methode.kategorie_id,
      name: methode.name,
      herkunft: methode.herkunft,
      kern: methode.kern,
      wann_einsetzen: methode.wann_einsetzen,
      ablauf: methode.ablauf.length ? methode.ablauf : [""],
      beispielfragen: methode.beispielfragen.length ? methode.beispielfragen : [""],
      dauer: methode.dauer,
      setting: methode.setting,
      hinweise: methode.hinweise,
      tags: methode.tags,
      sortierung: methode.sortierung,
      aktiv: methode.aktiv,
      eigene_notizen: methode.eigene_notizen,
    };
  }
  return {
    kategorie_id: kategorien[0]?.id ?? "",
    name: "",
    herkunft: "",
    kern: "",
    wann_einsetzen: "",
    ablauf: [""],
    beispielfragen: [""],
    dauer: "",
    setting: "",
    hinweise: "",
    tags: [],
    sortierung: 0,
    aktiv: true,
    eigene_notizen: "",
  };
}

const feld =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none transition-colors focus:border-gold-600";
const labelCls = "text-xs font-semibold uppercase tracking-wide text-ink-muted";

export function MethodeEditor({ kategorien, methode }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [form, setForm] = useState<FormState>(() => initial(methode, kategorien));
  const [fehler, setFehler] = useState<string | null>(null);
  const [hinweisGespeichert, setHinweisGespeichert] = useState(false);

  const set = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setHinweisGespeichert(false);
    setForm((f) => ({ ...f, [key]: value }));
  };

  const speichern = () => {
    setFehler(null);
    const payload: Record<string, unknown> = {
      ...form,
      ablauf: form.ablauf.map((s) => s.trim()).filter(Boolean),
      beispielfragen: form.beispielfragen.map((s) => s.trim()).filter(Boolean),
      tags: form.tags.map((s) => s.trim()).filter(Boolean),
    };
    startTransition(async () => {
      if (methode) {
        const res = await updateMethode(methode.id, payload);
        if (!res.ok) return setFehler(res.error);
        setHinweisGespeichert(true);
        router.refresh();
      } else {
        const res = await createMethode(payload);
        if (!res.ok) return setFehler(res.error);
        router.push(`/admin/methoden/${res.data.slug}`);
      }
    });
  };

  const vorschauSlug = methode?.slug ?? (slugify(form.name) || "methode");

  return (
    <div className="flex flex-col gap-6">
      {fehler && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {fehler}
        </div>
      )}
      {hinweisGespeichert && (
        <div className="rounded-2xl border border-emerald-300 bg-emerald-50 p-4 text-sm text-emerald-700">
          Gespeichert.
        </div>
      )}

      {/* Grunddaten */}
      <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className={labelCls}>Name</span>
            <input
              className={feld}
              value={form.name}
              onChange={(e) => set("name", e.target.value)}
              placeholder="z. B. Atemanker (Achtsames Atmen)"
            />
            <span className="text-xs text-ink-muted">
              Slug: <code className="rounded bg-ink/5 px-1">{vorschauSlug}</code>
              {methode && " (bleibt beim Bearbeiten unverändert)"}
            </span>
          </label>

          <label className="flex flex-col gap-1">
            <span className={labelCls}>Kategorie</span>
            <select
              className={feld}
              value={form.kategorie_id}
              onChange={(e) => set("kategorie_id", e.target.value)}
            >
              {kategorien.map((k) => (
                <option key={k.id} value={k.id}>
                  {k.name}
                </option>
              ))}
            </select>
          </label>

          <label className="flex flex-col gap-1">
            <span className={labelCls}>Herkunft / Schule</span>
            <input
              className={feld}
              value={form.herkunft}
              onChange={(e) => set("herkunft", e.target.value)}
              placeholder="z. B. MBSR (Jon Kabat-Zinn)"
            />
          </label>

          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className={labelCls}>Kern-Satz</span>
            <textarea
              className={`${feld} min-h-[70px] resize-y`}
              value={form.kern}
              onChange={(e) => set("kern", e.target.value)}
              placeholder="Die Essenz in einem Satz."
            />
          </label>

          <label className="flex flex-col gap-1 sm:col-span-2">
            <span className={labelCls}>Wann einsetzen</span>
            <textarea
              className={`${feld} min-h-[80px] resize-y`}
              value={form.wann_einsetzen}
              onChange={(e) => set("wann_einsetzen", e.target.value)}
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className={labelCls}>Dauer</span>
            <input
              className={feld}
              value={form.dauer}
              onChange={(e) => set("dauer", e.target.value)}
              placeholder="z. B. 3–15 Min."
            />
          </label>

          <label className="flex flex-col gap-1">
            <span className={labelCls}>Setting</span>
            <input
              className={feld}
              value={form.setting}
              onChange={(e) => set("setting", e.target.value)}
              placeholder="z. B. Einzel, Gruppe, Selbstpraxis"
            />
          </label>
        </div>
      </div>

      {/* Ablauf */}
      <ListenFeld
        titel="Ablauf"
        hinweis="Schritte in Reihenfolge – werden als nummerierte Liste angezeigt."
        werte={form.ablauf}
        onChange={(w) => set("ablauf", w)}
        mehrzeilig
        platzhalter="Nächster Schritt …"
      />

      {/* Beispielfragen */}
      <ListenFeld
        titel="Beispielfragen"
        hinweis="Werden als Zitate dargestellt."
        werte={form.beispielfragen}
        onChange={(w) => set("beispielfragen", w)}
        mehrzeilig
        platzhalter="Beispielfrage …"
      />

      {/* Hinweise & Grenzen */}
      <div className="rounded-2xl border border-gold-400/50 bg-gold-300/10 p-5">
        <label className="flex flex-col gap-1">
          <span className={labelCls}>Hinweise &amp; Grenzen (zur Therapie)</span>
          <textarea
            className={`${feld} min-h-[90px] resize-y`}
            value={form.hinweise}
            onChange={(e) => set("hinweise", e.target.value)}
          />
          <span className="text-xs text-ink-muted">
            Grenzen zur Therapie bewusst erhalten – im Nachschlagewerk als Warnbox
            sichtbar.
          </span>
        </label>
      </div>

      {/* Tags */}
      <TagsFeld werte={form.tags} onChange={(w) => set("tags", w)} />

      {/* Eigene Notizen – prominent */}
      <div className="rounded-2xl border-2 border-gold-500/40 bg-white p-5 shadow-card">
        <label className="flex flex-col gap-1">
          <span className="text-sm font-semibold text-ink">
            Eigene Notizen (Praxiserfahrungen)
          </span>
          <textarea
            className={`${feld} min-h-[120px] resize-y`}
            value={form.eigene_notizen}
            onChange={(e) => set("eigene_notizen", e.target.value)}
            placeholder="Was funktioniert bei dir? Für wen? Varianten, Stolpersteine, eigene Beispiele …"
          />
        </label>
      </div>

      {/* Meta */}
      <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
        <div className="flex flex-wrap items-end gap-6">
          <label className="flex flex-col gap-1">
            <span className={labelCls}>Sortierung</span>
            <input
              type="number"
              className={`${feld} w-28`}
              value={form.sortierung}
              onChange={(e) => set("sortierung", Number(e.target.value) || 0)}
            />
          </label>
          <label className="inline-flex items-center gap-2 pb-2 text-sm text-ink-mid">
            <input
              type="checkbox"
              checked={form.aktiv}
              onChange={(e) => set("aktiv", e.target.checked)}
            />
            Aktiv (im Nachschlagewerk sichtbar)
          </label>
        </div>
      </div>

      {/* Aktionen */}
      <div className="sticky bottom-4 z-10 flex flex-wrap justify-end gap-2 rounded-2xl border border-ink/10 bg-white/90 p-3 shadow-card backdrop-blur">
        <button
          type="button"
          onClick={() => router.push("/admin/methoden")}
          className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink-mid transition-colors hover:border-ink/30 hover:text-ink"
        >
          Abbrechen
        </button>
        <button
          type="button"
          disabled={pending}
          onClick={speichern}
          className="rounded-full bg-ink px-6 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Speichere …" : methode ? "Speichern" : "Methode anlegen"}
        </button>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

/** Editierbare Liste: Zeilen hinzufügen, entfernen, verschieben. */
function ListenFeld({
  titel,
  hinweis,
  werte,
  onChange,
  mehrzeilig = false,
  platzhalter,
}: {
  titel: string;
  hinweis?: string;
  werte: string[];
  onChange: (werte: string[]) => void;
  mehrzeilig?: boolean;
  platzhalter?: string;
}) {
  const setAt = (i: number, v: string) => {
    const next = [...werte];
    next[i] = v;
    onChange(next);
  };
  const remove = (i: number) => onChange(werte.filter((_, j) => j !== i));
  const move = (i: number, dir: -1 | 1) => {
    const j = i + dir;
    if (j < 0 || j >= werte.length) return;
    const next = [...werte];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
  };
  const add = () => onChange([...werte, ""]);

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
      <div className="flex items-baseline justify-between">
        <span className={labelCls}>{titel}</span>
        <span className="text-xs text-ink-muted">{werte.filter(Boolean).length}</span>
      </div>
      {hinweis && <p className="mt-1 text-xs text-ink-muted">{hinweis}</p>}

      <div className="mt-3 flex flex-col gap-2">
        {werte.map((wert, i) => (
          <div key={i} className="flex items-start gap-2">
            <span className="mt-2.5 w-5 shrink-0 text-right text-xs text-ink-muted tabular-nums">
              {i + 1}
            </span>
            {mehrzeilig ? (
              <textarea
                className={`${feld} min-h-[44px] resize-y`}
                value={wert}
                placeholder={platzhalter}
                onChange={(e) => setAt(i, e.target.value)}
              />
            ) : (
              <input
                className={feld}
                value={wert}
                placeholder={platzhalter}
                onChange={(e) => setAt(i, e.target.value)}
              />
            )}
            <div className="mt-0.5 flex shrink-0 flex-col gap-0.5">
              <button
                type="button"
                onClick={() => move(i, -1)}
                disabled={i === 0}
                aria-label="Nach oben"
                className="rounded p-1 text-ink-mid transition-colors hover:bg-ink/5 hover:text-ink disabled:opacity-30"
              >
                <ArrowUp className="h-3.5 w-3.5" />
              </button>
              <button
                type="button"
                onClick={() => move(i, 1)}
                disabled={i === werte.length - 1}
                aria-label="Nach unten"
                className="rounded p-1 text-ink-mid transition-colors hover:bg-ink/5 hover:text-ink disabled:opacity-30"
              >
                <ArrowUp className="h-3.5 w-3.5 rotate-180" />
              </button>
            </div>
            <button
              type="button"
              onClick={() => remove(i)}
              aria-label="Zeile entfernen"
              className="mt-0.5 rounded p-1 text-ink-mid transition-colors hover:bg-red-50 hover:text-red-600"
            >
              <Close className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={add}
        className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-ink/15 px-3 py-1.5 text-[13px] text-ink-mid transition-colors hover:border-ink/30 hover:text-ink"
      >
        <Plus className="h-3.5 w-3.5" />
        Zeile hinzufügen
      </button>
    </div>
  );
}

/** Tags: als Chips mit Entfernen, neue über Eingabe + Enter/Komma. */
function TagsFeld({
  werte,
  onChange,
}: {
  werte: string[];
  onChange: (werte: string[]) => void;
}) {
  const [entwurf, setEntwurf] = useState("");

  const commit = () => {
    const neu = entwurf
      .split(",")
      .map((t) => t.trim())
      .filter((t) => t && !werte.includes(t));
    if (neu.length) onChange([...werte, ...neu]);
    setEntwurf("");
  };

  return (
    <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
      <span className={labelCls}>Tags</span>
      {werte.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-2">
          {werte.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1.5 rounded-full border border-ink/10 bg-ink/[0.02] px-2.5 py-1 text-xs text-ink-mid"
            >
              #{tag}
              <button
                type="button"
                onClick={() => onChange(werte.filter((t) => t !== tag))}
                aria-label={`${tag} entfernen`}
                className="text-ink-muted transition-colors hover:text-red-600"
              >
                <Close className="h-3 w-3" />
              </button>
            </span>
          ))}
        </div>
      )}
      <input
        className={`${feld} mt-3`}
        value={entwurf}
        onChange={(e) => setEntwurf(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === ",") {
            e.preventDefault();
            commit();
          }
        }}
        onBlur={commit}
        placeholder="Tag eingeben und Enter drücken …"
      />
    </div>
  );
}
