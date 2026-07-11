import { PanelLeft, ChevronDown, ChevronRight, ClipboardList, ListChecks } from "lucide-react"
import { Logo } from "@/components/logo"
import { DemoMock } from "@/components/demo-mock"

const steps = [
  {
    lead: "Enter your ",
    strong: "domain",
    trail: " — or connect your SSO to scope the org.",
  },
  {
    lead: "Aegis maps your ",
    strong: "external attack surface",
    trail: " across every subdomain, IP, and cert.",
  },
  {
    lead: "It correlates ",
    strong: "open, deep, and dark web",
    trail: " intel into one exposure view.",
  },
  {
    lead: "You get a ",
    strong: "ranked fix list",
    trail: " — or push it straight to Jira and Slack.",
  },
]

function AgentMock() {
  return (
    <DemoMock className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="nl-reveal flex items-center gap-2 border-b border-border pb-3" style={{ "--d": "0ms" } as React.CSSProperties}>
        <Logo />
        <PanelLeft className="size-4 text-muted-foreground" />
        <span className="flex items-center gap-1 text-sm font-medium">
          New Scan <ChevronDown className="size-3.5 text-muted-foreground" />
        </span>
      </div>

      <div className="nl-reveal mt-4 rounded-lg bg-muted/60 p-3 text-sm leading-relaxed" style={{ "--d": "80ms" } as React.CSSProperties}>
        <span className="nl-stream inline-block" style={{ "--d": "220ms" } as React.CSSProperties}>
          Scan <span className="font-medium">acme.com</span> for external
          exposure and <span className="font-medium">dark web</span> mentions
        </span>
      </div>

      <button className="nl-reveal mt-4 flex items-center gap-1 text-xs text-muted-foreground" style={{ "--d": "340ms" } as React.CSSProperties}>
        <ChevronRight className="size-3" /> Thought for 1s
      </button>
      <p className="nl-reveal mt-2 text-sm text-muted-foreground" style={{ "--d": "420ms" } as React.CSSProperties}>
        Mapping attack surface and correlating threat intel for acme.com.
      </p>

      <div className="nl-reveal mt-4 rounded-lg border border-border p-3" style={{ "--d": "520ms" } as React.CSSProperties}>
        <div className="flex items-center gap-2 text-sm font-medium">
          <ClipboardList className="size-4 text-muted-foreground" />
          Scan scope set
          <span className="ml-auto text-xs text-muted-foreground">
            Domain, surface, web
          </span>
        </div>
        <dl className="mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Domain</dt>
            <dd className="font-medium">acme.com</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Surface</dt>
            <dd className="font-medium">412 assets</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Sources</dt>
            <dd className="font-medium">Clear, deep, dark</dd>
          </div>
        </dl>
      </div>

      <div className="nl-reveal mt-3 rounded-lg border border-border p-3" style={{ "--d": "640ms" } as React.CSSProperties}>
        <div className="flex items-center gap-2 text-sm font-medium">
          <ListChecks className="size-4 text-muted-foreground" />
          Findings compiled
          <span className="ml-auto text-xs text-muted-foreground">3.1s</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          14 exposures prepared and ranked
        </p>
      </div>

      <div className="nl-pop mt-3 rounded-lg border border-lime/60 bg-lime/10 p-3" style={{ "--d": "780ms" } as React.CSSProperties}>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span aria-hidden="true" className="nl-pulse size-1.5 rounded-full bg-lime" />
          Scan complete · 14 findings · 3 critical
        </p>
        <p className="mt-2 text-sm">
          Exposed credentials on a stealer log and an open S3 bucket ranked
          highest
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Recommended path: reset exposed accounts, lock the bucket. Review the
          plan before acting.
        </p>
        <div className="mt-3 flex gap-2">
          <button className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted">
            Open Report
          </button>
          <button className="rounded-md bg-lime px-3 py-1.5 text-sm font-semibold text-lime-foreground transition-opacity hover:opacity-90">
            Push to Jira
          </button>
        </div>
      </div>
    </DemoMock>
  )
}

export function HowItWorks() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          From domain to a <span className="highlight">prioritized</span> plan
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
          Aegis detects, correlates, and ranks your exposure — then tells you
          exactly what to fix first.
        </p>

        <div className="mt-14 grid gap-12 lg:grid-cols-2 lg:items-center">
          <ol className="space-y-8">
            {steps.map((s, i) => (
              <li key={i} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full border border-border text-sm font-semibold">
                  {i + 1}
                </span>
                <p className="text-xl font-medium leading-snug text-foreground/90">
                  {s.lead}
                  <span className="text-lime-foreground">
                    <span className="rounded bg-lime px-1">{s.strong}</span>
                  </span>
                  {s.trail}
                </p>
              </li>
            ))}
          </ol>
          <AgentMock />
        </div>
      </div>
    </section>
  )
}
