"use client"

import { cn } from "@/lib/utils"

// The three dark "A" paths lifted straight from /public/icon.svg.
// We use them as a clip-path so the animated pixels only render inside the A.
const A_PATHS: { d: string; transform: string }[] = [
  {
    d: "M0 0 C12.54 0 25.08 0 38 0 C38 6.93 38 13.86 38 21 C43.94 21 49.88 21 56 21 C56 27.93 56 34.86 56 42 C50.06 42 44.12 42 38 42 C38 48.6 38 55.2 38 62 C43.94 62 49.88 62 56 62 C56 68.93 56 75.86 56 83 C62.27 83 68.54 83 75 83 C75 89.93 75 96.86 75 104 C62.46 104 49.92 104 37 104 C37 97.07 37 90.14 37 83 C24.79 83 12.58 83 0 83 C0 89.93 0 96.86 0 104 C-6.27 104 -12.54 104 -19 104 C-19 76.61 -19 49.22 -19 21 C-12.73 21 -6.46 21 0 21 C0 14.07 0 7.14 0 0 Z",
    transform: "translate(71,34)",
  },
  {
    d: "M0 0 C5.39 -0.02 10.79 -0.04 16.18 -0.05 C18.02 -0.06 19.85 -0.07 21.69 -0.08 C24.32 -0.09 26.96 -0.09 29.59 -0.1 C30.42 -0.1 31.24 -0.11 32.09 -0.11 C34.06 -0.11 36.03 -0.06 38 0 C39 1 39 1 39.11 2.95 C39.11 3.78 39.1 4.61 39.1 5.47 C39.09 6.37 39.09 7.27 39.09 8.2 C39.08 9.62 39.08 9.62 39.06 11.06 C39.06 12.01 39.05 12.96 39.05 13.94 C39.04 16.29 39.02 18.65 39 21 C44.61 21 50.22 21 56 21 C56 15.06 56 9.12 56 3 C62.27 3 68.54 3 75 3 C75 9.6 75 16.2 75 23 C62.46 23 49.92 23 37 23 C37 15.74 37 8.48 37 1 C24.79 1 12.58 1 0 1 C0 0.67 0 0.34 0 0 Z",
    transform: "translate(71,115)",
  },
  {
    d: "M0 0 C5.94 0 11.88 0 18 0 C18 6.93 18 13.86 18 21 C12.06 21 6.12 21 0 21 C0 14.07 0 7.14 0 0 Z",
    transform: "translate(109,55)",
  },
]

// Deterministic pseudo-random so server and client render identically.
function pseudoRandom(i: number): number {
  return ((i * 2654435761) % 1000) / 1000
}

const CELL = 15 // 180 / 12 = 12x12 grid
const GRID = 12

export function AegisLoader({
  size = 88,
  label,
  className,
  centered = false,
  overlay = false,
}: {
  size?: number
  label?: string
  className?: string
  centered?: boolean
  overlay?: boolean
}) {
  const pixels = []
  for (let row = 0; row < GRID; row++) {
    for (let col = 0; col < GRID; col++) {
      const i = row * GRID + col
      const delay = pseudoRandom(i) * 1.4
      const dur = 0.9 + pseudoRandom(i + 97) * 0.8
      pixels.push(
        <rect
          key={i}
          x={col * CELL + 1}
          y={row * CELL + 1}
          width={CELL - 2}
          height={CELL - 2}
          rx={1.5}
          className="fill-primary"
          style={{
            animation: `aegis-pixel ${dur}s ease-in-out ${delay}s infinite`,
          }}
        />,
      )
    }
  }

  return (
    <div
      className={cn(
        "flex flex-col items-center gap-3",
        centered && "min-h-screen justify-center",
        overlay &&
          "fixed inset-0 z-50 justify-center bg-background/80 backdrop-blur-sm",
        !centered && !overlay && "p-6",
        className,
      )}
      role="status"
      aria-live="polite"
    >
      <svg
        width={size}
        height={size}
        viewBox="0 0 180 180"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <clipPath id="aegis-a-clip">
            {A_PATHS.map((p, i) => (
              <path key={i} d={p.d} transform={p.transform} />
            ))}
          </clipPath>
        </defs>

        {/* card background */}
        <rect
          x={0}
          y={0}
          width={180}
          height={180}
          rx={28}
          className="fill-muted"
        />

        {/* pixels + scan sweep, clipped to the A shape */}
        <g clipPath="url(#aegis-a-clip)">
          <rect width={180} height={180} className="fill-primary/10" />
          {pixels}
          <rect
            x={-20}
            y={0}
            width={220}
            height={26}
            className="fill-primary-foreground/70"
            style={{ animation: "aegis-scan 1.6s linear infinite" }}
          />
        </g>
      </svg>
      {label && (
        <p className="text-sm text-muted-foreground">{label}</p>
      )}
      <span className="sr-only">Loading</span>
    </div>
  )
}
