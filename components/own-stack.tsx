import { Radar, Timer, ShieldHalf, FileCheck2 } from "lucide-react"
import { DemoMock } from "@/components/demo-mock"

const reasons = [
  {
    icon: Radar,
    title: "See it before they do",
    body: "Know what attackers can see across your external surface and the dark web.",
  },
  {
    icon: Timer,
    title: "Shrink dwell time",
    body: "Catch leaked credentials and secrets in hours, not the months attackers rely on.",
  },
  {
    icon: ShieldHalf,
    title: "Protect the brand",
    body: "Detect impersonating domains and takedown phishing kits abusing your name.",
  },
  {
    icon: FileCheck2,
    title: "Prove compliance",
    body: "SOC 2-ready evidence and audit trails for every exposure you remediated.",
  },
]

const supported = [
  {
    label: "SURFACE",
    items:
      "Domains, subdomains, IPs, certificates, cloud assets, exposed services",
  },
  {
    label: "SOURCES",
    items: "Clear web, deep web, dark web, code repos, cloud buckets, Telegram",
  },
  {
    label: "FINDINGS",
    items:
      "Credentials, PII, source code, secrets, phishing, brand abuse, ransomware",
  },
  {
    label: "INTEGRATIONS",
    items: "Slack, Jira, Splunk, SIEM, SOAR, Entra ID, Okta, API",
  },
]

export function OwnStack() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Own your exposure posture, not just alerts
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
          Not a flood of noise. Aegis ranks what matters and feeds it into the
          workflows you already run.
        </p>

        <h3 className="mt-16 text-center text-xl font-semibold">
          Why continuous exposure monitoring matters
        </h3>
        <DemoMock className="mt-8 grid gap-px overflow-hidden rounded-xl border border-border bg-border sm:grid-cols-2">
          {reasons.map(({ icon: Icon, title, body }, i) => (
            <div
              key={title}
              className="nl-reveal flex items-start justify-between gap-4 bg-background p-6"
              style={{ "--d": `${i * 90}ms` } as React.CSSProperties}
            >
              <div>
                <p className="font-semibold">{title}</p>
                <p className="mt-1 text-sm text-muted-foreground">{body}</p>
              </div>
              <Icon
                className="size-6 shrink-0 text-muted-foreground"
                strokeWidth={1.5}
              />
            </div>
          ))}
        </DemoMock>

        <div className="mt-8 rounded-xl border border-border bg-card p-6 sm:p-8">
          <p className="text-lg font-semibold">Coverage across the stack</p>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            From your external attack surface to the darkest corners of the
            web — Aegis monitors every layer of exposure.
          </p>
          <dl className="mt-6 space-y-4">
            {supported.map((s) => (
              <div
                key={s.label}
                className="grid gap-1 border-t border-border pt-4 sm:grid-cols-[120px_1fr] sm:gap-4"
              >
                <dt className="text-xs font-semibold tracking-wide text-muted-foreground">
                  {s.label}
                </dt>
                <dd className="text-sm text-foreground/90">{s.items}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}
