import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import type { Block } from "@/lib/wissensdatenbank";

/**
 * Rendert das Block-Modell der Wissensdatenbank (siehe `lib/wissensdatenbank.ts`)
 * in typografisch sauberes JSX – im Stil der übrigen Fließtext-Seiten.
 */

/** Basis-Route der Wissensdatenbank (liegt im geschützten Mitgliederbereich). */
export const WISSEN_BASE = "/mitglieder/wissensdatenbank";

/** Interne `.md`-Verweise in App-Routen übersetzen, externes/Anker unverändert. */
function toHref(raw: string): string {
  const r = raw.trim();
  if (/^(https?:)?\/\//.test(r) || r.startsWith("mailto:") || r.startsWith("#"))
    return r;
  const h = r.replace(/^\.\//, "").replace(/\.md$/, "");
  if (h.startsWith("../") || h === "README") return WISSEN_BASE;
  return `${WISSEN_BASE}/${h}`;
}

function Anchor({ href, children }: { href: string; children: ReactNode }) {
  const target = toHref(href);
  const external = /^(https?:)?\/\//.test(target) || target.startsWith("mailto:");
  const cls =
    "font-medium text-accent underline decoration-accent/40 underline-offset-2 transition-colors hover:decoration-accent";
  if (external)
    return (
      <a href={target} target="_blank" rel="noopener noreferrer" className={cls}>
        {children}
      </a>
    );
  if (target.startsWith("#"))
    return (
      <a href={target} className={cls}>
        {children}
      </a>
    );
  return (
    <Link href={target} className={cls}>
      {children}
    </Link>
  );
}

/**
 * Emphasis-Parser für **fett** und *kursiv* – bewusst als linearer Scanner
 * (kein Regex-Backtracking) implementiert. Behandelt Verschachtelung in beide
 * Richtungen, inkl. des `***`-Falls (Fett mit kursivem Journalnamen am Ende,
 * z. B. „**… *Nature***").
 */
function emphasize(s: string, key: string): ReactNode[] {
  const L = s.length;
  const out: ReactNode[] = [];
  let i = 0;
  let n = 0;

  // Nächstes schließendes * (einzelner Stern schließt eine Kursivspanne);
  // per Backslash escapte Sterne (z. B. „STAR\*D") werden übersprungen.
  const findEm = (from: number): number => {
    let k = from;
    while (k < L) {
      if (s[k] === "\\") {
        k += 2;
        continue;
      }
      if (s[k] === "*") return k;
      k++;
    }
    return -1;
  };
  // Schließendes ** finden, dabei einzelne *…*-Kursivspannen überspringen
  // (so bindet der `***`-Fall die Kursivspanne korrekt vor dem Fett-Ende).
  const findStrong = (from: number): number => {
    let k = from;
    while (k < L) {
      if (s[k] === "\\") {
        k += 2;
        continue;
      }
      if (s[k] === "*" && s[k + 1] === "*") return k;
      if (s[k] === "*") {
        const c = findEm(k + 1);
        if (c === -1) return -1;
        k = c + 1;
        continue;
      }
      k++;
    }
    return -1;
  };

  while (i < L) {
    // Backslash-Escape: nächstes Zeichen wörtlich übernehmen.
    if (s[i] === "\\" && i + 1 < L) {
      out.push(s[i + 1]);
      i += 2;
      continue;
    }
    if (s[i] === "*") {
      if (s[i + 1] === "*") {
        const j = findStrong(i + 2);
        if (j !== -1) {
          out.push(
            <strong key={`${key}-${n++}`} className="font-semibold text-ink">
              {emphasize(s.slice(i + 2, j), `${key}-${n}`)}
            </strong>,
          );
          i = j + 2;
          continue;
        }
        // Unbalanciertes ** – literal ausgeben, statt eine leere Kursivspanne
        // zu erzeugen.
        out.push("**");
        i += 2;
        continue;
      }
      const j = findEm(i + 1);
      if (j !== -1) {
        out.push(
          <em key={`${key}-${n++}`} className="italic">
            {emphasize(s.slice(i + 1, j), `${key}-${n}`)}
          </em>,
        );
        i = j + 1;
        continue;
      }
      out.push("*");
      i++;
      continue;
    }
    let k = i;
    while (k < L && s[k] !== "*" && s[k] !== "\\") k++;
    out.push(s.slice(i, k));
    i = k;
  }
  return out;
}

// Links und <sub> sind nicht verschachtelungs-kritisch – als sichere Regex.
const LINK_SUB_SOURCE =
  "(\\[([^\\]]+)\\]\\(([^)]+)\\))|(<sub>([\\s\\S]*?)</sub>)";

/** Inline-Formatierung: **fett**, *kursiv*, [link](ziel), <sub>…</sub>. */
export function renderInline(text: string, keyBase = "i"): ReactNode {
  const out: ReactNode[] = [];
  const re = new RegExp(LINK_SUB_SOURCE, "g");
  let last = 0;
  let m: RegExpExecArray | null;
  let n = 0;
  while ((m = re.exec(text)) !== null) {
    if (m.index > last)
      out.push(...emphasize(text.slice(last, m.index), `${keyBase}-t${n}`));
    const key = `${keyBase}-${n++}`;
    if (m[1] !== undefined) {
      out.push(
        <Anchor key={key} href={m[3]}>
          {renderInline(m[2], key)}
        </Anchor>,
      );
    } else if (m[4] !== undefined) {
      out.push(
        <sub key={key} className="text-[0.7rem] text-ink-mid/70">
          {renderInline(m[5], key)}
        </sub>,
      );
    }
    last = m.index + m[0].length;
  }
  if (last < text.length)
    out.push(...emphasize(text.slice(last), `${keyBase}-t${n}`));
  return out.length === 1 ? out[0] : out;
}

export function MarkdownDoc({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <div key={i} className="mt-6 flex scroll-mt-24 flex-col gap-3" id={block.id}>
                <span aria-hidden className="rule block h-px w-12" />
                <h2 className="font-display text-2xl font-medium text-ink">
                  {renderInline(block.text, `h2-${i}`)}
                </h2>
              </div>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={block.id}
                className="mt-3 scroll-mt-24 font-display text-lg font-semibold text-ink"
              >
                {renderInline(block.text, `h3-${i}`)}
              </h3>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="rounded-2xl border border-accent/25 bg-accent/[0.04] px-5 py-4 text-[0.98rem] leading-relaxed text-ink-mid"
              >
                {renderInline(block.text, `q-${i}`)}
              </blockquote>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2.5 pl-1">
                {block.items.map((it, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[1.02rem] leading-relaxed text-ink-soft/85"
                  >
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{renderInline(it, `ul-${i}-${j}`)}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="flex flex-col gap-2.5 pl-1">
                {block.items.map((it, j) => (
                  <li
                    key={j}
                    className="flex items-start gap-3 text-[1.02rem] leading-relaxed text-ink-soft/85"
                  >
                    <span className="mt-0.5 min-w-6 shrink-0 font-display text-sm font-semibold text-accent">
                      {j + 1}.
                    </span>
                    <span>{renderInline(it, `ol-${i}-${j}`)}</span>
                  </li>
                ))}
              </ol>
            );
          case "table":
            return (
              <div
                key={i}
                className="overflow-x-auto rounded-2xl border border-ink/10"
              >
                <table className="w-full border-collapse text-left text-[0.92rem]">
                  <thead>
                    <tr className="bg-ink/[0.03]">
                      {block.head.map((h, j) => (
                        <th
                          key={j}
                          className="border-b border-ink/10 px-4 py-3 font-semibold text-ink"
                        >
                          {renderInline(h, `th-${i}-${j}`)}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {block.rows.map((row, r) => (
                      <tr key={r} className="align-top">
                        {row.map((c, j) => (
                          <td
                            key={j}
                            className="border-b border-ink/[0.06] px-4 py-3 text-ink-soft/85"
                          >
                            {renderInline(c, `td-${i}-${r}-${j}`)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            );
          case "image":
            return (
              <figure key={i} className="my-2 flex flex-col gap-3">
                <div className="overflow-hidden rounded-2xl border border-ink/10 bg-ink/[0.02] shadow-card">
                  <Image
                    src={block.src}
                    alt={block.alt}
                    width={2000}
                    height={1080}
                    sizes="(max-width: 768px) 100vw, 720px"
                    className="h-auto w-full"
                  />
                </div>
                {block.alt && (
                  <figcaption className="text-center text-[0.85rem] leading-relaxed text-ink-mid">
                    {block.alt}
                  </figcaption>
                )}
              </figure>
            );
          case "hr":
            return <span key={i} aria-hidden className="rule my-2 block h-px w-full" />;
          case "p":
          default:
            return (
              <p key={i} className="text-[1.05rem] leading-[1.75] text-ink-soft/85">
                {renderInline(block.text, `p-${i}`)}
              </p>
            );
        }
      })}
    </div>
  );
}
