import { PanelLeft, ChevronDown, ChevronRight, ClipboardList, ListChecks } from "lucide-react"
import { Logo } from "@/components/logo"
import { DemoMock } from "@/components/demo-mock"

const steps = [
  {
    lead: "Describe a ",
    strong: "Llama 3.1 70B",
    trail: " workload in plain English.",
  },
  {
    lead: "Aegis compares ",
    strong: "SGLang",
    trail: " and every other engine your model can run on.",
  },
  {
    lead: "It tunes ",
    strong: "server tuning",
    trail: " where it helps, with no config to hand-write.",
  },
  {
    lead: "Deploy on ",
    strong: "NVIDIA A100",
    trail: " and pay per million tokens, or export the stack and self-host.",
  },
]

function AgentMock() {
  return (
    <DemoMock className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="nl-reveal flex items-center gap-2 border-b border-border pb-3" style={{ "--d": "0ms" } as React.CSSProperties}>
        <Logo />
        <PanelLeft className="size-4 text-muted-foreground" />
        <span className="flex items-center gap-1 text-sm font-medium">
          New Session <ChevronDown className="size-3.5 text-muted-foreground" />
        </span>
      </div>

      <div className="nl-reveal mt-4 rounded-lg bg-muted/60 p-3 text-sm leading-relaxed" style={{ "--d": "80ms" } as React.CSSProperties}>
        <span className="nl-stream inline-block" style={{ "--d": "220ms" } as React.CSSProperties}>
          Optimize <span className="font-medium">Llama-3.1-8B-Instruct</span> on{" "}
          <span className="font-medium">vLLM</span> for cheapest GPU with latency
          and VRAM checks
        </span>
      </div>

      <button className="nl-reveal mt-4 flex items-center gap-1 text-xs text-muted-foreground" style={{ "--d": "340ms" } as React.CSSProperties}>
        <ChevronRight className="size-3" /> Thought for 1s
      </button>
      <p className="nl-reveal mt-2 text-sm text-muted-foreground" style={{ "--d": "420ms" } as React.CSSProperties}>
        Capturing cost-first intent for Llama 3.1 8B on vLLM.
      </p>

      <div className="nl-reveal mt-4 rounded-lg border border-border p-3" style={{ "--d": "520ms" } as React.CSSProperties}>
        <div className="flex items-center gap-2 text-sm font-medium">
          <ClipboardList className="size-4 text-muted-foreground" />
          Intake updated
          <span className="ml-auto text-xs text-muted-foreground">
            Model, engine, goal
          </span>
        </div>
        <dl className="mt-3 space-y-1.5 text-sm">
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Model</dt>
            <dd className="font-medium">Llama 3.1 8B</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Engine</dt>
            <dd className="font-medium">vLLM</dd>
          </div>
          <div className="flex justify-between">
            <dt className="text-muted-foreground">Goal</dt>
            <dd className="font-medium">Low cost, latency checked</dd>
          </div>
        </dl>
      </div>

      <div className="nl-reveal mt-3 rounded-lg border border-border p-3" style={{ "--d": "640ms" } as React.CSSProperties}>
        <div className="flex items-center gap-2 text-sm font-medium">
          <ListChecks className="size-4 text-muted-foreground" />
          Plan drafted
          <span className="ml-auto text-xs text-muted-foreground">3.1s</span>
        </div>
        <p className="mt-2 text-sm text-muted-foreground">
          10 execution phases prepared
        </p>
      </div>

      <div className="nl-pop mt-3 rounded-lg border border-lime/60 bg-lime/10 p-3" style={{ "--d": "780ms" } as React.CSSProperties}>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          <span aria-hidden="true" className="nl-pulse size-1.5 rounded-full bg-lime" />
          Plan ready · 10 phases · ~23m
        </p>
        <p className="mt-2 text-sm">
          Optimize Llama 3.1 8B on vLLM for cheapest GPU with latency checks
        </p>
        <p className="mt-1 text-sm text-muted-foreground">
          Recommended path: vLLM on L4. Review the plan before execution.
        </p>
        <div className="mt-3 flex gap-2">
          <button className="rounded-md border border-border bg-background px-3 py-1.5 text-sm font-medium transition-colors hover:bg-muted">
            Open Plan
          </button>
          <button className="rounded-md bg-lime px-3 py-1.5 text-sm font-semibold text-lime-foreground transition-opacity hover:opacity-90">
            Accept and run
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
          From prompt to a production stack you{" "}
          <span className="highlight">own</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
          Aegis compares, tunes, and benchmarks the stack. Deploy or export
          it.
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
