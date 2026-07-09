"use client"

import { useEffect, useState } from "react"

/**
 * Signature background element: a faint attack-surface grid.
 * Base layer = hairline grid (the "lines"), plus a sparse set of cells
 * that quietly light up amber/teal, like assets being swept by a scan.
 * Works in both themes off CSS variables — no hardcoded colors.
 */

const CELL = 56
const COLS = 24
const ROWS = 14

// Deterministic sparse set so it doesn't reflow/hydrate-mismatch
function seededCells(seed: number, count: number) {
  const cells: { x: number; y: number; kind: "accent" | "clear"; delay: number }[] = []
  let s = seed
  const rand = () => {
    s = (s * 9301 + 49297) % 233280
    return s / 233280
  }
  for (let i = 0; i < count; i++) {
    cells.push({
      x: Math.floor(rand() * COLS),
      y: Math.floor(rand() * ROWS),
      kind: rand() > 0.55 ? "accent" : "clear",
      delay: rand() * 6,
    })
  }
  return cells
}

export function GridDecoration() {
  const [cells, setCells] = useState<ReturnType<typeof seededCells>>([])

  useEffect(() => {
    setCells(seededCells(42, 9))
  }, [])

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* base hairline grid */}
      <div
        className="absolute inset-0 opacity-[0.5] dark:opacity-[0.35]"
        style={{
          backgroundImage:
            "linear-gradient(to right, var(--border) 1px, transparent 1px), linear-gradient(to bottom, var(--border) 1px, transparent 1px)",
          backgroundSize: `${CELL}px ${CELL}px`,
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 85%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 85%)",
        }}
      />
      {/* swept cells */}
      <svg
        className="absolute inset-0 h-full w-full"
        style={{
          maskImage: "radial-gradient(ellipse 80% 60% at 50% 20%, black 30%, transparent 80%)",
          WebkitMaskImage:
            "radial-gradient(ellipse 80% 60% at 50% 20%, black 30%, transparent 80%)",
        }}
      >
        {cells.map((c, i) => (
          <rect
            key={i}
            x={c.x * CELL + 1}
            y={c.y * CELL + 1}
            width={CELL - 2}
            height={CELL - 2}
            fill={c.kind === "accent" ? "var(--accent)" : "var(--accent-secondary)"}
            className="scan-cell"
            style={{ animationDelay: `${c.delay}s` }}
          />
        ))}
      </svg>
    </div>
  )
}
