export function Logo({ className }: { className?: string }) {
  // pixel-art mark: green + black squares on a 4x4 grid
  const cells = [
    [1, 0, 2, 0],
    [0, 1, 0, 2],
    [2, 0, 1, 0],
    [0, 2, 0, 1],
  ]
  const color = (v: number) =>
    v === 1 ? "var(--lime)" : v === 2 ? "var(--foreground)" : "transparent"
  return (
    <span
      className={className}
      aria-hidden="true"
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(4, 1fr)",
        width: 22,
        height: 22,
        gap: 1,
      }}
    >
      {cells.flat().map((v, i) => (
        <span key={i} style={{ backgroundColor: color(v), borderRadius: 1 }} />
      ))}
    </span>
  )
}
