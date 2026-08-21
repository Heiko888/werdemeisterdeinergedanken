"use client";

import { useMemo, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Close, Plus } from "@/components/ui/Icon";
import {
  KANAL_LABEL,
  STATUS_LABEL,
  WOCHENTAGE,
  type Kanal,
  type PostStatus,
  type WochenMeta,
} from "@/lib/redaktionsplan";
import {
  addPost,
  deletePost,
  seedDefaultPlan,
  setStatus,
  updatePost,
  type PlanPostRow,
} from "./actions";

type Props = {
  initialPosts: PlanPostRow[];
  wochenMeta: WochenMeta[];
};

const KANAELE: Kanal[] = ["ig", "fb", "li", "yt"];
const STATI: PostStatus[] = ["geplant", "erstellt", "veroeffentlicht"];

const KANAL_FARBE: Record<Kanal, string> = {
  ig: "#d6336c",
  fb: "#1877f2",
  li: "#0a66c2",
  yt: "#e5322d",
};
const BLOCK_FARBE: Record<string, string> = {
  A: "#7bb832",
  B: "#17a5b0",
  C: "#d98324",
};
const STATUS_STYLE: Record<PostStatus, string> = {
  geplant: "bg-ink/5 text-ink-mid",
  erstellt: "bg-gold-300/40 text-ink",
  veroeffentlicht: "bg-leaf-500/20 text-leaf-700",
};

/** Nächster Status im Kreis geplant → erstellt → veröffentlicht → geplant. */
function nextStatus(s: PostStatus): PostStatus {
  const i = STATI.indexOf(s);
  return STATI[(i + 1) % STATI.length];
}

const FORMAT_VORSCHLAEGE = [
  "🎬 Reel",
  "🖼️ Carousel",
  "📝 Beitrag",
  "📚 Story",
  "▶️ Video",
  "⚡ Short",
  "🎯 Pitch",
  "💬 Zitat/Studie",
];

type FormState = {
  id?: string;
  woche: number;
  block: string;
  thema: string;
  wochentag: number;
  uhrzeit: string;
  kanal: Kanal;
  format: string;
  titel: string;
  quelle: string;
  cta: string;
  status: PostStatus;
  optional: boolean;
  notiz: string;
};

export function RedaktionsplanCockpit({ initialPosts, wochenMeta }: Props) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [fehler, setFehler] = useState<string | null>(null);

  // Wochen, die es gibt: aus Meta + tatsächlich vorhandenen Posts.
  const wochen = useMemo(() => {
    const set = new Set<number>(wochenMeta.map((w) => w.woche));
    initialPosts.forEach((p) => set.add(p.woche));
    return [...set].sort((a, b) => a - b);
  }, [wochenMeta, initialPosts]);

  const [woche, setWoche] = useState<number>(wochen[0] ?? 1);
  const [kanalFilter, setKanalFilter] = useState<Kanal | "all">("all");
  const [form, setForm] = useState<FormState | null>(null);

  const meta = wochenMeta.find((w) => w.woche === woche);

  const wochenPosts = useMemo(
    () =>
      initialPosts
        .filter((p) => p.woche === woche)
        .filter((p) => kanalFilter === "all" || p.kanal === kanalFilter),
    [initialPosts, woche, kanalFilter],
  );

  const run = (fn: () => Promise<{ ok: boolean; error?: string }>) => {
    setFehler(null);
    startTransition(async () => {
      const res = await fn();
      if (!res.ok) setFehler(res.error ?? "Unbekannter Fehler.");
      else router.refresh();
    });
  };

  // --- Leerer Zustand: Standardplan importieren --------------------------
  if (initialPosts.length === 0) {
    return (
      <div className="mx-auto max-w-xl rounded-2xl border border-ink/10 bg-white p-8 text-center shadow-card">
        <h2 className="font-display text-2xl font-medium text-ink">
          Noch kein Plan vorhanden
        </h2>
        <p className="mt-3 text-ink-mid">
          Importiere den fertigen Standard-Redaktionsplan (20 Wochen, Block A–C:
          7 Stufen · Praxis &amp; Wissenschaft · Mentale Selbstverteidigung).
          Danach kannst du jeden Post frei bearbeiten.
        </p>
        {fehler && <p className="mt-4 text-sm text-red-600">{fehler}</p>}
        <button
          type="button"
          disabled={pending}
          onClick={() => run(() => seedDefaultPlan(false))}
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
        >
          {pending ? "Importiere …" : "Standardplan importieren"}
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {fehler && (
        <div className="rounded-2xl border border-red-300 bg-red-50 p-4 text-sm text-red-700">
          {fehler}
        </div>
      )}

      {/* Wochen-Umschalter */}
      <div className="flex flex-wrap gap-2">
        {wochen.map((n) => {
          const m = wochenMeta.find((w) => w.woche === n);
          const aktiv = n === woche;
          return (
            <button
              key={n}
              type="button"
              onClick={() => setWoche(n)}
              className={`flex min-w-[92px] flex-col gap-0.5 rounded-xl border px-3 py-2 text-left transition-colors ${
                aktiv
                  ? "border-transparent bg-ink text-white"
                  : "border-ink/10 bg-white text-ink-mid hover:border-ink/25"
              }`}
              style={
                aktiv ? undefined : { borderTopColor: BLOCK_FARBE[m?.block ?? "A"], borderTopWidth: 3 }
              }
            >
              <span className="text-[11px] tabular-nums opacity-70">Woche {n}</span>
              <span className="text-[13px] font-medium">{m?.thema ?? "—"}</span>
            </button>
          );
        })}
      </div>

      {/* Wochen-Banner */}
      {meta && (
        <div className="rounded-2xl border border-ink/10 bg-white p-5 shadow-card">
          <div className="text-xs font-semibold uppercase tracking-wide text-ink-muted">
            Woche {meta.woche} · {meta.serie}
          </div>
          <h2 className="mt-1 font-display text-xl font-medium text-ink sm:text-2xl">
            {meta.titel}
          </h2>
        </div>
      )}

      {/* Werkzeugleiste: Kanal-Filter + Reset */}
      <div className="flex flex-wrap items-center gap-2">
        <span className="mr-1 text-xs font-semibold uppercase tracking-wide text-ink-muted">
          Kanal
        </span>
        {(["all", ...KANAELE] as const).map((k) => {
          const aktiv = kanalFilter === k;
          return (
            <button
              key={k}
              type="button"
              onClick={() => setKanalFilter(k)}
              className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-[13px] font-medium transition-colors ${
                aktiv
                  ? "border-ink bg-ink text-white"
                  : "border-ink/10 bg-white text-ink-mid hover:border-ink/25"
              }`}
            >
              {k !== "all" && (
                <span
                  className="h-2.5 w-2.5 rounded-full"
                  style={{ background: KANAL_FARBE[k] }}
                />
              )}
              {k === "all" ? "Alle" : KANAL_LABEL[k]}
            </button>
          );
        })}
        <div className="ml-auto">
          <button
            type="button"
            disabled={pending}
            onClick={() => {
              if (
                confirm(
                  "Den gesamten Plan auf den Standard (20 Wochen) zurücksetzen? Alle eigenen Änderungen gehen verloren.",
                )
              )
                run(() => seedDefaultPlan(true));
            }}
            className="rounded-full border border-ink/15 px-4 py-1.5 text-[13px] text-ink-mid transition-colors hover:border-ink/30 hover:text-ink disabled:opacity-50"
          >
            Auf Standard zurücksetzen
          </button>
        </div>
      </div>

      {/* Tage */}
      <div className="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
        {WOCHENTAGE.map((tag, i) => {
          const tagNr = i + 1;
          const posts = wochenPosts
            .filter((p) => p.wochentag === tagNr)
            .sort((a, b) => a.sort - b.sort);
          return (
            <div key={tag} className="flex flex-col gap-3">
              <div className="flex items-center justify-between border-b border-ink/10 pb-2">
                <span className="font-display font-medium text-ink">{tag}</span>
                <button
                  type="button"
                  onClick={() =>
                    setForm({
                      woche,
                      block: meta?.block ?? "A",
                      thema: meta?.thema ?? "",
                      wochentag: tagNr,
                      uhrzeit: "",
                      kanal: "ig",
                      format: "🎬 Reel",
                      titel: "",
                      quelle: "",
                      cta: "",
                      status: "geplant",
                      optional: false,
                      notiz: "",
                    })
                  }
                  className="inline-flex items-center gap-1 rounded-full border border-ink/10 px-2.5 py-1 text-xs text-ink-mid transition-colors hover:border-ink/25 hover:text-ink"
                >
                  <Plus className="h-3.5 w-3.5" />
                  Post
                </button>
              </div>

              {posts.length === 0 && (
                <p className="text-xs text-ink-muted">Kein Post an diesem Tag.</p>
              )}

              {posts.map((p) => (
                <article
                  key={p.id}
                  className="rounded-xl border border-ink/10 bg-white p-3 shadow-card"
                  style={{ borderLeft: `3px solid ${KANAL_FARBE[p.kanal]}` }}
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-xs tabular-nums text-ink-muted">
                      {p.uhrzeit || "—"}
                    </span>
                    <span
                      className="inline-flex items-center gap-1.5 text-xs font-semibold"
                      style={{ color: KANAL_FARBE[p.kanal] }}
                    >
                      <span
                        className="h-2 w-2 rounded-full"
                        style={{ background: KANAL_FARBE[p.kanal] }}
                      />
                      {KANAL_LABEL[p.kanal]}
                    </span>
                  </div>
                  <div className="mt-1.5 text-[11px] font-medium text-ink-mid">
                    {p.format}
                  </div>
                  <p className="mt-1 text-[13px] leading-snug text-ink">{p.titel}</p>
                  {p.quelle && (
                    <p className="mt-1 text-[11px] text-ink-muted">{p.quelle}</p>
                  )}
                  {p.notiz && (
                    <p className="mt-1 text-[11px] italic text-ink-mid">📌 {p.notiz}</p>
                  )}

                  <div className="mt-2.5 flex flex-wrap items-center gap-1.5">
                    <button
                      type="button"
                      disabled={pending}
                      onClick={() => run(() => setStatus(p.id, nextStatus(p.status)))}
                      className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold transition-opacity hover:opacity-80 disabled:opacity-50 ${STATUS_STYLE[p.status]}`}
                      title="Status wechseln"
                    >
                      {STATUS_LABEL[p.status]}
                    </button>
                    <span className="ml-auto flex gap-1.5">
                      <button
                        type="button"
                        onClick={() => setForm({ ...p })}
                        className="rounded-full border border-ink/10 px-2.5 py-0.5 text-[11px] text-ink-mid transition-colors hover:border-ink/25 hover:text-ink"
                      >
                        Bearbeiten
                      </button>
                      <button
                        type="button"
                        disabled={pending}
                        onClick={() => {
                          if (confirm("Diesen Post löschen?"))
                            run(() => deletePost(p.id));
                        }}
                        className="rounded-full border border-ink/10 px-2.5 py-0.5 text-[11px] text-ink-mid transition-colors hover:border-red-300 hover:text-red-600 disabled:opacity-50"
                      >
                        Löschen
                      </button>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          );
        })}
      </div>

      {/* Bearbeiten / Neu */}
      {form && (
        <EditDialog
          form={form}
          pending={pending}
          onClose={() => setForm(null)}
          onChange={setForm}
          onSave={() => {
            const { id, ...rest } = form;
            const payload = { ...rest } as Record<string, unknown>;
            run(async () => {
              const res = id ? await updatePost(id, payload) : await addPost(payload);
              if (res.ok) setForm(null);
              return res;
            });
          }}
        />
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------

function EditDialog({
  form,
  pending,
  onClose,
  onChange,
  onSave,
}: {
  form: FormState;
  pending: boolean;
  onClose: () => void;
  onChange: (f: FormState) => void;
  onSave: () => void;
}) {
  const set = <K extends keyof FormState>(key: K, value: FormState[K]) =>
    onChange({ ...form, [key]: value });

  const feld =
    "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink outline-none focus:border-teal-500";
  const label = "text-xs font-semibold uppercase tracking-wide text-ink-muted";

  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-ink/40 p-4 sm:p-8"
      onClick={onClose}
    >
      <div
        className="w-full max-w-lg rounded-2xl border border-ink/10 bg-white p-6 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="font-display text-lg font-medium text-ink">
            {form.id ? "Post bearbeiten" : "Neuer Post"}
          </h3>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-1 text-ink-mid hover:bg-ink/5 hover:text-ink"
            aria-label="Schließen"
          >
            <Close />
          </button>
        </div>

        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className={label}>Wochentag</span>
            <select
              className={feld}
              value={form.wochentag}
              onChange={(e) => set("wochentag", Number(e.target.value))}
            >
              {WOCHENTAGE.map((t, i) => (
                <option key={t} value={i + 1}>
                  {t}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>Uhrzeit</span>
            <input
              className={feld}
              value={form.uhrzeit}
              placeholder="z. B. 18:00"
              onChange={(e) => set("uhrzeit", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>Kanal</span>
            <select
              className={feld}
              value={form.kanal}
              onChange={(e) => set("kanal", e.target.value as Kanal)}
            >
              {KANAELE.map((k) => (
                <option key={k} value={k}>
                  {KANAL_LABEL[k]}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>Format</span>
            <input
              className={feld}
              list="format-vorschlaege"
              value={form.format}
              onChange={(e) => set("format", e.target.value)}
            />
            <datalist id="format-vorschlaege">
              {FORMAT_VORSCHLAEGE.map((f) => (
                <option key={f} value={f} />
              ))}
            </datalist>
          </label>
        </div>

        <label className="mt-3 flex flex-col gap-1">
          <span className={label}>Titel / Hook</span>
          <textarea
            className={`${feld} min-h-[70px] resize-y`}
            value={form.titel}
            onChange={(e) => set("titel", e.target.value)}
          />
        </label>

        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <label className="flex flex-col gap-1">
            <span className={label}>Quelle</span>
            <input
              className={feld}
              value={form.quelle}
              onChange={(e) => set("quelle", e.target.value)}
            />
          </label>
          <label className="flex flex-col gap-1">
            <span className={label}>CTA</span>
            <input
              className={feld}
              value={form.cta}
              onChange={(e) => set("cta", e.target.value)}
            />
          </label>
        </div>

        <label className="mt-3 flex flex-col gap-1">
          <span className={label}>Notiz (intern)</span>
          <input
            className={feld}
            value={form.notiz}
            onChange={(e) => set("notiz", e.target.value)}
          />
        </label>

        <div className="mt-3 flex flex-wrap items-center gap-4">
          <label className="flex flex-col gap-1">
            <span className={label}>Status</span>
            <select
              className={feld}
              value={form.status}
              onChange={(e) => set("status", e.target.value as PostStatus)}
            >
              {STATI.map((s) => (
                <option key={s} value={s}>
                  {STATUS_LABEL[s]}
                </option>
              ))}
            </select>
          </label>
          <label className="mt-5 inline-flex items-center gap-2 text-sm text-ink-mid">
            <input
              type="checkbox"
              checked={form.optional}
              onChange={(e) => set("optional", e.target.checked)}
            />
            Optional (Ruhetag / Kür)
          </label>
        </div>

        <div className="mt-6 flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-ink/15 px-4 py-2 text-sm text-ink-mid hover:border-ink/30 hover:text-ink"
          >
            Abbrechen
          </button>
          <button
            type="button"
            disabled={pending}
            onClick={onSave}
            className="rounded-full bg-ink px-5 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 disabled:opacity-50"
          >
            {pending ? "Speichere …" : "Speichern"}
          </button>
        </div>
      </div>
    </div>
  );
}
