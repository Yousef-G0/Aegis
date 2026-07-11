import {
  KeyRound,
  GitBranch,
  Globe,
  MessagesSquare,
  Cloud,
  ShieldAlert,
  Network,
  ListChecks,
} from "lucide-react"
import { DemoMock } from "@/components/demo-mock"

const metrics = [
  { icon: KeyRound, label: "EXPOSED CREDENTIALS", value: "Found in breaches" },
  { icon: GitBranch, label: "LEAKED SOURCE", value: "On public repos" },
  { icon: Globe, label: "STALE SUBDOMAINS", value: "Forgotten surface" },
  { icon: MessagesSquare, label: "DARK WEB CHATTER", value: "Monitored 24/7" },
  { icon: Cloud, label: "OPEN CLOUD BUCKETS", value: "Public to the internet" },
  { icon: ShieldAlert, label: "PHISHING & BRAND ABUSE", value: "Impersonating you" },
  { icon: Network, label: "EXPOSED SERVICES", value: "Scored by risk" },
  { icon: ListChecks, label: "FIX PRIORITY", value: "What to fix first" },
]

export function ResultSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Every scan ends with a{" "}
          <span className="highlight">prioritized</span> list of what to fix
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
          Aegis turns millions of signals across the open, deep, and dark web
          into a ranked, evidence-backed exposure report.
        </p>

        <DemoMock className="mt-14 grid grid-cols-1 border-l border-t border-border sm:grid-cols-2 lg:grid-cols-4">
          {metrics.map(({ icon: Icon, label, value }, i) => (
            <div
              key={label}
              className="nl-reveal group border-b border-r border-border p-6 transition-colors hover:bg-muted/50"
              style={{ "--d": `${i * 70}ms` } as React.CSSProperties}
            >
              <Icon className="size-7 text-muted-foreground" strokeWidth={1.5} />
              <p className="mt-10 text-xs font-medium tracking-wide text-muted-foreground">
                {label}
              </p>
              <p className="mt-1 text-lg font-semibold">{value}</p>
            </div>
          ))}
        </DemoMock>
      </div>
    </section>
  )
}
