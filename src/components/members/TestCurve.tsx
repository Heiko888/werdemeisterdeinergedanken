import type { TestPoint } from "@/app/mitglieder/actions";
import { formatDate } from "@/lib/journal";

/**
 * Wachstumskurve des Bewusstseinstests: Schwerpunkt-Stufe (1–7) über die Zeit.
 * Reines SVG ohne Client-Code – skaliert responsiv über die viewBox.
 * Erwartet Punkte in zeitlicher Reihenfolge (älteste zuerst).
 */
export function TestCurve({ points }: { points: TestPoint[] }) {
  const W = 560;
  const H = 220;
  const padL = 30;
  const padR = 14;
  const padT = 14;
  const padB = 30;
  const plotW = W - padL - padR;
  const plotH = H - padT - padB;

  const n = points.length;
  const x = (i: number) => padL + (n <= 1 ? plotW / 2 : (i / (n - 1)) * plotW);
  const y = (stage: number) => padT + ((7 - stage) / 6) * plotH;

  const line = points.map((p, i) => `${x(i)},${y(p.topStage)}`).join(" ");
  const showEveryDate = n <= 5;

  return (
    <svg
      viewBox={`0 0 ${W} ${H}`}
      className="h-auto w-full"
      role="img"
      aria-label="Verlauf deiner Schwerpunkt-Stufe über die Zeit"
    >
      {/* Gitterlinien + Stufen-Beschriftung */}
      {[1, 2, 3, 4, 5, 6, 7].map((s) => (
        <g key={s}>
          <line
            x1={padL}
            x2={W - padR}
            y1={y(s)}
            y2={y(s)}
            stroke="#e4ded0"
            strokeWidth={1}
          />
          <text
            x={padL - 8}
            y={y(s) + 4}
            textAnchor="end"
            fontSize={11}
            fill="#9aa4b5"
          >
            {s}
          </text>
        </g>
      ))}

      {/* Verlaufslinie */}
      {n > 1 && (
        <polyline
          points={line}
          fill="none"
          stroke="#21b2bd"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      )}

      {/* Punkte + Datumsbeschriftung */}
      {points.map((p, i) => (
        <g key={`${p.takenAt}-${i}`}>
          <circle cx={x(i)} cy={y(p.topStage)} r={5} fill="#4f9e1c" />
          {(showEveryDate || i === 0 || i === n - 1) && (
            <text
              x={x(i)}
              y={H - 10}
              textAnchor={i === 0 ? "start" : i === n - 1 ? "end" : "middle"}
              fontSize={10}
              fill="#9aa4b5"
            >
              {formatDate(p.takenAt)}
            </text>
          )}
        </g>
      ))}
    </svg>
  );
}
