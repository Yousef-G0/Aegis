import { Globe, Network } from "lucide-react"
import { Logo } from "@/components/logo"

const sources = [
  { name: "Clear web", detail: "Domains, repos, and leaked docs" },
  { name: "Deep web", detail: "Pastes, indexers, code dumps" },
  { name: "Dark web", detail: "Forums, markets, stealer logs" },
  { name: "Telegram & chats", detail: "58k+ monitored channels" },
  { name: "Cloud buckets", detail: "Open S3, Azure, GCS" },
]

export function HardwareSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-24">
        <div className="mx-auto mb-6 flex w-fit items-center justify-center">
          <Logo className="scale-125" />
        </div>
        <h2 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          See what attackers see,{" "}
          <span className="highlight">everywhere</span> they look
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Aegis continuously monitors the open, deep, and dark web — plus your
          own external surface — so nothing slips through.
        </p>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Organization */}
          <div className="flex items-center justify-center rounded-xl border border-border bg-card p-6">
            <div className="text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-accent-secondary/15 text-accent-secondary">
                <Globe className="size-6" />
              </div>
              <p className="font-semibold">Your organization</p>
              <p className="text-sm text-muted-foreground">
                One domain scopes the whole surface
              </p>
            </div>
          </div>

          {/* Monitor */}
          <div className="flex items-center justify-center rounded-xl border border-lime/60 bg-lime/10 px-8 py-6">
            <div className="text-center">
              <Logo className="mx-auto mb-3 scale-150" />
              <p className="font-semibold">Aegis</p>
              <p className="text-sm text-muted-foreground">Monitor & correlate</p>
            </div>
          </div>

          {/* Sources */}
          <div className="grid gap-2 text-left">
            {sources.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-foreground/30"
              >
                <Network className="size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
