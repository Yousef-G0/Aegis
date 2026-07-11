import type { Metadata } from "next"
import {
  Globe,
  MessagesSquare,
  KeyRound,
  Fingerprint,
  Bot,
  ShieldAlert,
  Network,
  Cloud,
  Radar,
  GitBranch,
  Workflow,
  ListChecks,
  Zap,
  ScanLine,
  Bug,
  Server,
  ShieldHalf,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { CtaFooter } from "@/components/cta-footer"
import { Logo } from "@/components/logo"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Cyber Threat Intelligence Platform — Aegis",
  description:
    "Aegis monitors the dark web, stealer-log markets, Telegram, and millions of threat indicators to surface the risks that matter — and drive action across your security stack.",
}

function Section({
  id,
  children,
  className,
}: {
  id?: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <section
      id={id}
      className={cn("border-b border-border", className)}
    >
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">{children}</div>
    </section>
  )
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
      <span className="size-1.5 rounded-full bg-accent-secondary" />
      {children}
    </p>
  )
}

function PixelButton({
  href,
  children,
  variant = "primary",
}: {
  href: string
  children: React.ReactNode
  variant?: "primary" | "ghost"
}) {
  const cls =
    variant === "primary"
      ? "pixel-btn pixel-btn-primary"
      : "pixel-btn pixel-btn-ghost"
  return (
    <a href={href} className={cn(cls, "text-xs")}>
      {children}
      <svg viewBox="0 0 24 24" className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2.4}>
        <path d="M9 6l6 6-6 6" strokeLinecap="square" />
      </svg>
    </a>
  )
}

const feed = [
  { tag: "credential_dump_ri", time: "02:14 UTC", text: "New combo list · 2.3M credentials · US financial", tone: "critical" as const },
  { tag: "iab_marketplace", time: "02:09 UTC", text: "VPN access for sale · Fortune 500 healthcare", tone: "new" as const },
  { tag: "stealer_logs_daily", time: "01:58 UTC", text: "RedLine batch · 847 corporate entries", tone: "critical" as const },
  { tag: "telegram_monitor", time: "01:44 UTC", text: "Brand impersonation · lookalike domain registered", tone: "new" as const },
]

const steps = [
  { n: "01", title: "Detect", body: "Aegis enumerates your external surface and continuously collects across the clear, deep, and dark web." },
  { n: "02", title: "Prioritize", body: "Each exposure is enriched, scored, and ranked by real risk to your organization — not raw volume." },
  { n: "03", title: "Remediate", body: "Validated findings push into your SIEM, SOAR, and ticketing, or trigger automated response." },
]

const capabilities = [
  { icon: MessagesSquare, title: "Dark Web & Telegram Monitoring", body: "Continuous collection across Telegram channels, dark web forums, marketplaces, and paste sites — backed by years of archived data." },
  { icon: KeyRound, title: "Stealer Log Intelligence", body: "Millions of new stealer logs collected weekly, surfacing credentials harvested by RedLine, Raccoon, Vidar, Lumma, and emerging malware." },
  { icon: Bot, title: "Threat Flow AI Engine", body: "Generative AI translates multilingual underground chatter, correlates across sources, and produces actionable reports in seconds." },
  { icon: Fingerprint, title: "Identity Exposure Management", body: "Continuous monitoring of enterprise credentials with blast-radius mapping across connected services and sensitive systems." },
  { icon: Zap, title: "Automated Remediation", body: "Integrates with Entra ID and your IdP to force password resets, revoke sessions, and lock accounts automatically." },
  { icon: Bug, title: "Indicators of Compromise", body: "Context-mapped intelligence objects: threat actor profiles, URLs, IPs, file hashes, TTPs, and CVEs." },
]

const teams = [
  { icon: Server, title: "Security Operations", stat: "100k+", unit: "logs ingested / day", body: "Ingest, test, and remediate stealer logs, leaked credentials, and combolists automatically." },
  { icon: Radar, title: "Threat Intelligence", stat: "Millions", unit: "threat actor profiles", body: "Track critical and emerging risks across forums, markets, blogs, and Telegram channels." },
  { icon: ShieldAlert, title: "Fraud & Abuse", stat: "Billions", unit: "data points monitored", body: "Automate monitoring for fraud and abuse schemes across billions of data points in near real time." },
  { icon: Workflow, title: "MSSP / Services", stat: "24/7", unit: "proprietary collection", body: "Improve red-teaming, pentesting, and customer time-to-value with industry-leading intel." },
]

const integrations = ["Slack", "Jira", "Splunk", "Microsoft Entra ID", "Okta", "Azure Sentinel", "ServiceNow", "OpenCTI"]

const remediation = [
  { n: "01", title: "Leaked credentials", body: "Stealer log · dark web market", result: "Account locked" },
  { n: "02", title: "Phishing domain", body: "Look-alike registration detected", result: "Taken down" },
  { n: "03", title: "Stolen session", body: "Active cookie for sale", result: "Session revoked" },
  { n: "04", title: "Emerging IOCs / TTPs", body: "From tracked actor campaigns", result: "Pushed to SecOps" },
]

const faqs = [
  { q: "What is a cyber threat intelligence platform?", a: "A CTI platform automates the threat-intelligence lifecycle in one place: collecting data across the dark web, clear web, and illicit channels, enriching and prioritizing it, and delivering alerts into your security tools. Aegis extends this into exposure management by validating and remediating automatically." },
  { q: "What data sources does Aegis monitor?", a: "Aegis continuously monitors Telegram channels, dark web forums and markets, paste sites, ransomware leak sites, public code repositories, and the clear web — all cross-referenced against your external attack surface." },
  { q: "How is Aegis different from traditional CTI tools?", a: "Aegis is exposure-first. Beyond tactical intelligence, it maps findings to your identities and assets, scores them by real risk, and can remediate through your IdP — not just alert." },
  { q: "How does automated remediation work?", a: "When an exposed credential is validated, Aegis can force a password reset, revoke active sessions, and lock the account through Entra ID or Okta — often in under 60 seconds." },
  { q: "How quickly can a team deploy Aegis?", a: "Most teams stand up Aegis in about 30 minutes. Drop in your domains, connect integrations, and the first critical alerts typically arrive the same day." },
]

export default function CtiPlatformPage() {
  return (
    <main className="relative z-0 min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Cyber Threat Intelligence Platform</Eyebrow>
            <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              See every exposure before it becomes a{" "}
              <span className="highlight">breach</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Aegis monitors the dark web, stealer-log markets, Telegram, and
              millions of connected threat indicators to detect the risks that
              matter — and drive action across your existing security stack.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PixelButton href="#">Book a Demo</PixelButton>
              <PixelButton href="#" variant="ghost">
                Start Free Scan
              </PixelButton>
            </div>
          </div>

          {/* Live feed mock */}
          <div className="rounded-2xl border-2 border-foreground bg-card p-4 shadow-[6px_6px_0_0_var(--foreground)]">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Logo className="scale-90" />
                <span className="text-sm font-medium">Threat Intelligence Feed</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium">
                <span className="size-1.5 animate-pulse rounded-full bg-lime" />
                Live
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {feed.map((f) => (
                <li
                  key={f.tag}
                  className="flex items-start gap-3 rounded-lg border border-border bg-background p-3"
                >
                  <span
                    className={cn(
                      "mt-1 size-2 shrink-0 rounded-full",
                      f.tone === "critical" ? "bg-destructive" : "bg-accent-secondary",
                    )}
                  />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-medium">{f.tag}</span>
                      <span className="text-muted-foreground">{f.time}</span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-foreground/90">{f.text}</p>
                  </div>
                  <span
                    className={cn(
                      "ml-auto shrink-0 rounded border px-1.5 py-0.5 text-[10px] font-semibold uppercase",
                      f.tone === "critical"
                        ? "border-destructive/40 text-destructive"
                        : "border-accent-secondary/40 text-accent-secondary",
                    )}
                  >
                    {f.tone}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* How it works */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          An identity-first{" "}
          <span className="highlight">cyber threat intelligence</span> platform
        </h2>
        <p className="mx-auto mt-5 max-w-2xl text-balance text-center text-lg leading-relaxed text-muted-foreground">
          Aegis brings together the sources and capabilities your team needs in
          a single solution — better context and faster signal to action for
          your security operations.
        </p>

        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {steps.map((s) => (
            <div
              key={s.n}
              className="rounded-xl border border-border bg-card p-6"
            >
              <span className="font-pixel text-sm text-muted-foreground">{s.n}</span>
              <h3 className="mt-3 text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {s.body}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-8 grid gap-4 rounded-xl border border-border bg-background p-6 sm:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Monitored sources
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Clear web", "Dark web", "Telegram", "GitHub repos", "Paste sites", "Ransomware blogs"].map((s) => (
                <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Connects to
            </p>
            <div className="mt-3 flex flex-wrap gap-2">
              {integrations.map((s) => (
                <span key={s} className="rounded-full border border-border bg-card px-3 py-1 text-xs font-medium text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* See risks before they strike */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-[6px_6px_0_0_var(--foreground)]">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-2.5 py-1 text-xs font-semibold uppercase text-destructive">
                Critical · ALR-2891
              </span>
              <span className="text-xs text-muted-foreground">08:42 UTC</span>
            </div>
            <p className="mt-4 text-lg font-semibold">Identity exposure · Okta SSO</p>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-mono">johndoe@acme.corp</span> surfaced in a
              Lumma stealer log (4,212 records).
            </p>
            <dl className="mt-5 grid grid-cols-3 gap-3 text-sm">
              <div className="rounded-lg border border-border bg-background p-3">
                <dt className="text-xs text-muted-foreground">Source</dt>
                <dd className="mt-1 font-medium">Lumma · log</dd>
              </div>
              <div className="rounded-lg border border-border bg-background p-3">
                <dt className="text-xs text-muted-foreground">Confidence</dt>
                <dd className="mt-1 font-medium">High</dd>
              </div>
              <div className="rounded-lg border border-border bg-background p-3">
                <dt className="text-xs text-muted-foreground">First seen</dt>
                <dd className="mt-1 font-medium">4 min ago</dd>
              </div>
            </dl>
          </div>

          <div>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Cyber threat intelligence that{" "}
              <span className="highlight">prevents</span> breaches
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Security teams rarely see every leaked credential, exposed API
              key, or reused password in time. Discovery too often comes after
              an incident — when the costs are measured in dollars, lost time,
              and reputational damage.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-3xl font-bold">$4.44M</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  Average cost of a data breach in 2025
                </p>
              </div>
              <div className="rounded-xl border border-border bg-card p-5">
                <p className="text-3xl font-bold">88%</p>
                <p className="mt-1 text-sm text-muted-foreground">
                  of web app attacks involved stolen credentials
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Capabilities */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          From threat alerts to <span className="highlight">action</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-balance text-center text-lg leading-relaxed text-muted-foreground">
          Aegis covers every stage of the threat-intelligence lifecycle in a
          single platform.
        </p>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {capabilities.map((c) => (
            <div key={c.title} className="rounded-xl border border-border bg-card p-6">
              <c.icon className="size-7 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                {c.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* Identity exposure management */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Identity Exposure Management</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Shut down the #1 attack path for account takeovers
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Stolen credentials are the primary entry point for enterprise
              breaches. Aegis detects exposed identities, maps the blast radius
              across connected services, and remediates automatically through
              your IdP — even at 2 AM on a weekend.
            </p>
            <ul className="mt-6 space-y-2 text-sm text-muted-foreground">
              {["Detect credentials in stealer logs and dark web dumps", "Validate exposure against your identity provider", "Auto-remediate: force resets, revoke sessions, flag accounts", "Reduce remediation from hours to under 60 seconds"].map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <ListChecks className="mt-0.5 size-4 shrink-0 text-lime-foreground" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-[6px_6px_0_0_var(--foreground)]">
            <p className="font-pixel text-sm text-muted-foreground">Aegis · identity console</p>
            <ol className="mt-4 space-y-3">
              {remediation.map((r) => (
                <li key={r.n} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                  <span className="font-pixel text-xs text-muted-foreground">{r.n}</span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold">{r.title}</p>
                    <p className="text-xs text-muted-foreground">{r.body}</p>
                  </div>
                  <span className="shrink-0 rounded border border-lime/50 bg-lime/10 px-2 py-0.5 text-xs font-medium text-lime-foreground">
                    {r.result}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </Section>

      {/* Teams */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          How security teams leverage <span className="highlight">Aegis</span>
        </h2>
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {teams.map((t) => (
            <div key={t.title} className="rounded-xl border border-border bg-card p-6">
              <t.icon className="size-7 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-4 text-lg font-semibold">{t.title}</h3>
              <p className="mt-3 text-3xl font-bold">{t.stat}</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground">{t.unit}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Integrations */}
      <Section>
        <div className="rounded-2xl border border-border bg-card p-8 text-center sm:p-12">
          <h2 className="text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Connect Aegis to your existing workflows
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-pretty text-lg leading-relaxed text-muted-foreground">
            Enterprise-proven APIs and integrations bring Aegis threat
            intelligence into your SIEM, TIP, or SOAR — so remediation happens
            inside the stack you already run.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            {integrations.map((s) => (
              <span key={s} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-4 py-2.5 text-sm font-medium">
                <Network className="size-4 text-muted-foreground" />
                {s}
              </span>
            ))}
          </div>
        </div>
      </Section>

      {/* ROI */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          {[
            { stat: "321%", label: "Return on investment", sub: "Payback in under 6 months" },
            { stat: "25%", label: "Reduced risk of severe breach", sub: "$509K in associated savings" },
            { stat: "1300+", label: "Analyst hours reallocated", sub: "$167K in labor cost savings" },
          ].map((r) => (
            <div key={r.label} className="rounded-xl border border-border bg-card p-6 text-center">
              <p className="text-4xl font-bold">{r.stat}</p>
              <p className="mt-2 font-semibold">{r.label}</p>
              <p className="mt-1 text-sm text-muted-foreground">{r.sub}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently asked questions about{" "}
          <span className="highlight">CTI</span>
        </h2>
        <div className="mx-auto mt-12 grid max-w-4xl gap-4">
          {faqs.map((f) => (
            <div key={f.q} className="rounded-xl border border-border bg-card p-6 text-left">
              <p className="font-semibold">{f.q}</p>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section>
        <div className="rounded-2xl border-2 border-foreground bg-lime/10 p-8 text-center shadow-[6px_6px_0_0_var(--foreground)] sm:p-12">
          <ShieldHalf className="mx-auto size-9 text-lime" strokeWidth={2.2} />
          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Stand up Aegis in 30 minutes
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            No credit card. Drop in a domain and watch the first stealer-log
            alerts arrive within the hour.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <PixelButton href="#">Start Free Scan</PixelButton>
            <PixelButton href="#" variant="ghost">Book a Demo</PixelButton>
          </div>
        </div>
      </Section>

      <CtaFooter />
    </main>
  )
}
