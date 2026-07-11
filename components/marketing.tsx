import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Section({
  id,
  children,
  className,
}: {
  id?: string
  children: ReactNode
  className?: string
}) {
  return (
    <section id={id} className={cn("border-b border-border", className)}>
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">{children}</div>
    </section>
  )
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
      <span className="size-1.5 rounded-full bg-accent-secondary" />
      {children}
    </p>
  )
}

export function PixelButton({
  href,
  children,
  variant = "primary",
}: {
  href: string
  children: ReactNode
  variant?: "primary" | "ghost"
}) {
  const cls =
    variant === "primary" ? "pixel-btn pixel-btn-primary" : "pixel-btn pixel-btn-ghost"
  return (
    <a href={href} className={cn(cls, "text-xs")}>
      {children}
      <svg
        viewBox="0 0 24 24"
        className="size-3.5"
        fill="none"
        stroke="currentColor"
        strokeWidth={2.4}
      >
        <path d="M9 6l6 6-6 6" strokeLinecap="square" />
      </svg>
    </a>
  )
}

export function StatCard({
  stat,
  label,
  sub,
}: {
  stat: string
  label: string
  sub?: string
}) {
  return (
    <div className="rounded-xl border border-border bg-card p-6 text-center">
      <p className="text-4xl font-bold">{stat}</p>
      <p className="mt-2 font-semibold">{label}</p>
      {sub && <p className="mt-1 text-sm text-muted-foreground">{sub}</p>}
    </div>
  )
}
