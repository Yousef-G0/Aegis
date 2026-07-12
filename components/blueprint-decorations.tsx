import { cn } from "@/lib/utils"

type IconName =
  | "cube"
  | "chip"
  | "document"
  | "database"
  | "clock"
  | "terminal"

function PixelIcon({
  name,
  className,
}: {
  name: IconName
  className?: string
}) {
  const common = {
    viewBox: "0 0 16 16",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.2,
    strokeLinecap: "square" as const,
    strokeLinejoin: "miter" as const,
    shapeRendering: "crispEdges" as const,
    className,
    "aria-hidden": true,
  }

  switch (name) {
    case "cube":
      return (
        <svg {...common}>
          <path d="M8 2 L14 5 V11 L8 14 L2 11 V5 Z" />
          <path d="M8 2 V8 M8 8 L14 5 M8 8 L2 5" />
        </svg>
      )
    case "chip":
      return (
        <svg {...common}>
          <rect x="4" y="4" width="8" height="8" />
          <path d="M6 2v2 M10 2v2 M6 12v2 M10 12v2 M2 6h2 M2 10h2 M12 6h2 M12 10h2" />
          <rect x="6.5" y="6.5" width="3" height="3" />
        </svg>
      )
    case "document":
      return (
        <svg {...common}>
          <rect x="4" y="2" width="8" height="12" />
          <path d="M6 5h4 M6 8h4 M6 11h3" />
        </svg>
      )
    case "database":
      return (
        <svg {...common}>
          <ellipse cx="8" cy="4" rx="5" ry="2" />
          <path d="M3 4v8c0 1.1 2.24 2 5 2s5-.9 5-2V4" />
          <path d="M3 8c0 1.1 2.24 2 5 2s5-.9 5-2" />
        </svg>
      )
    case "clock":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="6" />
          <path d="M8 8V4 M8 8l3 1" />
        </svg>
      )
    case "terminal":
      return (
        <svg {...common}>
          <rect x="2" y="3" width="12" height="10" />
          <path d="M4 7l3 2-3 2 M9 11h3" />
        </svg>
      )
  }
}

type Placed = { name: IconName; className: string }

const icons: Placed[] = [
  { name: "cube", className: "top-[11%] left-[5%]" },
  { name: "chip", className: "top-[24%] left-[88%]" },
  { name: "document", className: "top-[38%] left-[4%]" },
  { name: "database", className: "top-[52%] left-[89%]" },
  { name: "clock", className: "top-[66%] left-[6%]" },
  { name: "terminal", className: "top-[80%] left-[90%]" },
  { name: "document", className: "top-[46%] left-[92%]" },
  { name: "cube", className: "top-[91%] left-[42%]" },
]

const markers: { letter: string; className: string }[] = [
  { letter: "H", className: "top-[6%] left-[2.5%]" },
  { letter: "R", className: "top-[19%] left-[2.5%]" },
  { letter: "W", className: "top-[33%] left-[2.5%]" },
  { letter: "X", className: "top-[47%] left-[2.5%]" },
  { letter: "S", className: "top-[61%] left-[2.5%]" },
  { letter: "F", className: "top-[75%] left-[2.5%]" },
  { letter: "C", className: "top-[89%] left-[2.5%]" },
]

export function BlueprintDecorations() {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {icons.map((item, i) => (
        <PixelIcon
          key={`icon-${i}`}
          name={item.name}
          className={cn(
            "absolute hidden size-7 text-foreground opacity-25 lg:block",
            item.className,
          )}
        />
      ))}

      {markers.map((m, i) => (
        <span
          key={`marker-${i}`}
          className={cn(
            "absolute hidden size-7 items-center justify-center border-2 border-foreground/25 font-pixel text-[10px] leading-none text-foreground/30 lg:flex",
            m.className,
          )}
        >
          {m.letter}
        </span>
      ))}
    </div>
  )
}