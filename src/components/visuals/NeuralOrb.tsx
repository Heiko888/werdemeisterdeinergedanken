import { cn } from "@/lib/cn";

/**
 * Heldenmotiv: ein leuchtender „Bewusstseins-Orb" mit neuronalem Netz.
 * Reines SVG mit sanfter Puls-Animation.
 */
export function NeuralOrb({ className }: { className?: string }) {
  const nodes = [
    [100, 40],
    [155, 70],
    [170, 130],
    [140, 175],
    [80, 180],
    [40, 140],
    [35, 80],
    [100, 105],
    [125, 120],
    [80, 90],
  ];
  const links: [number, number][] = [
    [0, 7],
    [1, 7],
    [2, 8],
    [3, 8],
    [4, 8],
    [5, 9],
    [6, 9],
    [7, 8],
    [8, 9],
    [9, 7],
    [0, 1],
    [1, 2],
    [5, 6],
  ];

  return (
    <div className={cn("relative aspect-square", className)}>
      {/* Glow */}
      <div className="absolute inset-[12%] rounded-full bg-teal-500/30 blur-3xl animate-pulse-slow" />
      <div className="absolute inset-[26%] rounded-full bg-gold-500/20 blur-2xl" />

      <svg
        viewBox="0 0 200 200"
        className="relative h-full w-full animate-float"
        aria-hidden
      >
        <defs>
          <radialGradient id="orb-core" cx="42%" cy="38%" r="70%">
            <stop offset="0%" stopColor="#bcd3ff" />
            <stop offset="45%" stopColor="#3670ee" />
            <stop offset="100%" stopColor="#0b1636" />
          </radialGradient>
          <linearGradient id="orb-ring" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0%" stopColor="#a6d64c" />
            <stop offset="50%" stopColor="#34c4c4" />
            <stop offset="100%" stopColor="#5b8cff" />
          </linearGradient>
        </defs>

        {/* Umlaufbahnen */}
        <g fill="none" stroke="url(#orb-ring)" strokeWidth="1" opacity="0.55">
          <ellipse cx="100" cy="100" rx="92" ry="92" />
          <ellipse cx="100" cy="100" rx="92" ry="40" />
          <ellipse
            cx="100"
            cy="100"
            rx="92"
            ry="40"
            transform="rotate(60 100 100)"
          />
          <ellipse
            cx="100"
            cy="100"
            rx="92"
            ry="40"
            transform="rotate(120 100 100)"
          />
        </g>

        {/* Kern */}
        <circle cx="100" cy="100" r="66" fill="url(#orb-core)" />
        <circle
          cx="100"
          cy="100"
          r="66"
          fill="none"
          stroke="#8bb2ff"
          strokeWidth="0.6"
          opacity="0.5"
        />

        {/* neuronales Netz */}
        <g opacity="0.9">
          {links.map(([a, b], i) => (
            <line
              key={i}
              x1={nodes[a][0]}
              y1={nodes[a][1]}
              x2={nodes[b][0]}
              y2={nodes[b][1]}
              stroke="#cfe0ff"
              strokeWidth="0.7"
              opacity="0.5"
            />
          ))}
          {nodes.map(([x, y], i) => (
            <circle
              key={i}
              cx={x}
              cy={y}
              r={i % 3 === 0 ? 2.6 : 1.8}
              fill={i % 4 === 0 ? "#a6d64c" : "#eaf0fb"}
            >
              <animate
                attributeName="opacity"
                values="0.4;1;0.4"
                dur={`${2 + (i % 4)}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {/* Glanzpunkt */}
        <circle cx="78" cy="74" r="14" fill="#ffffff" opacity="0.18" />
      </svg>
    </div>
  );
}
