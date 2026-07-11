import type { Metadata } from "next"
import {
  KeyRound,
  ShieldAlert,
  Zap,
  Fingerprint,
  Search,
  Network,
  Bug,
  Bot,
  Users,
  Gauge,
  Lock,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { CtaFooter } from "@/components/cta-footer"
import { Section, Eyebrow, PixelButton, StatCard } from "@/components/marketing"

export const metadata: Metadata = {
  title: "Identity Exposure Management — Aegis",
  description:
    "Aegis pairs industry-leading coverage of exposed credentials and stealer logs with automated workflows that cut breach risk from days to seconds.",
}

const doors = [
  { icon: KeyRound, title: "Millions of credentials exposed weekly", body: "Your team faces a steady wave of compromised accounts — an endless pipeline for attackers." },
  { icon: Search, title: "Attackers find exposures at scale", body: "They parse fresh stealer-log datasets in minutes to pull out corporate logins." },
  { icon: Gauge, title: "Speed is the real weakness", body: "The faster attackers move, the higher their success. MFA-bypassing sessions make it worse." },
  { icon: Bug, title: "Tracking & remediation are costly", body: "Identity investigations take hours; a single password reset can cost ~$70 in overhead." },
]

const pillars = [
  { icon: Network, title: "Best coverage of identity exposures", body: "The most comprehensive collection of leaked credentials and stealer logs, current and emerging." },
  { icon: Zap, title: "Near real-time detection", body: "New identity exposures are added around the clock, so you're alerted the moment they hit the black market." },
  { icon: Lock, title: "Automated validation & remediation", body: "Connect Entra ID to auto-validate exposures and force resets, revoke sessions, and lock accounts." },
  { icon: Gauge, title: "Proven risk reduction", body: "Customers see a 25% drop in severe breach risk and reclaim 1,300+ analyst hours a year." },
]

const toolkit = [
  { icon: Lock, title: "Entra ID validation & remediation", body: "Validate and fix identity exposures directly against your Entra ID environment." },
  { icon: Fingerprint, title: "Blast-radius visualization", body: "At-a-glance view of external risk to users and potential adversary attack paths." },
  { icon: Search, title: "Leaked credentials browser", body: "Agile, intuitive investigations across Aegis's world-class exposure database." },
  { icon: Bug, title: "Stealer log events", body: "Deep visibility into stealer-log events for maximum investigation context." },
  { icon: ShieldAlert, title: "Access-broker monitoring", body: "Track dark web chatter from initial access brokers for early compromise indicators." },
  { icon: Network, title: "API & integrations", body: "Enterprise-proven APIs to embed identity exposure management into core workflows." },
]

const faqs = [
  { q: "What is Identity Exposure Management (IEM)?", a: "IEM continuously monitors for compromised credentials and session tokens across the dark web, Telegram, and other sources where threat actors trade stolen data. Unlike traditional identity products that focus inside your perimeter, IEM looks outward — detecting employee credentials that leaked before attackers can use them." },
  { q: "Why is IEM important now?", a: "We've shifted to 'logging in' instead of 'hacking in.' Infostealer malware harvests not just passwords but MFA-bypassing session cookies, which appear in markets within minutes. Stolen credentials are involved in 88% of basic web-app breaches." },
  { q: "How does automated remediation work?", a: "Connect your IdP (e.g., Entra ID). When an exposed credential is validated, Aegis can force a password reset, revoke active sessions, and lock the account — often in under 60 seconds, even at 2 AM on a weekend." },
  { q: "How does IEM save money?", a: "Remediation is expensive — a single password reset can cost ~$70 once you factor IT overhead. Automating detection and response cuts both the breach risk and the investigation hours that add up across hundreds of incidents." },
  { q: "How fast can we deploy it?", a: "Most teams stand up Aegis in about 30 minutes. Connect your IdP and domains, and the first critical alerts typically arrive the same day." },
]

export default function IdentityExposureManagementPage() {
  return (
    <main className="relative z-0 min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Identity Exposure Management</Eyebrow>
            <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              Your passwords are already on the dark web.{" "}
              <span className="highlight">Make sure they don&apos;t work.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Aegis pairs industry-leading coverage of exposed credentials and
              stealer logs with automated workflows that cut breach risk from
              days to seconds.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PixelButton href="#">Start Free Scan</PixelButton>
              <PixelButton href="#" variant="ghost">Book a Demo</PixelButton>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-foreground bg-card p-6 shadow-[6px_6px_0_0_var(--foreground)]">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-2 rounded-full border border-destructive/40 px-2.5 py-1 text-xs font-semibold uppercase text-destructive">
                Critical · ALR-2891
              </span>
              <span className="text-xs text-muted-foreground">02:14 UTC</span>
            </div>
            <p className="mt-4 text-lg font-semibold">Identity exposure · Okta SSO</p>
            <p className="mt-1 text-sm text-muted-foreground">
              <span className="font-mono">j•••••@acme.corp</span> · Senior SRE ·
              stealer log · Lumma C2
            </p>
            <ul className="mt-5 space-y-2 text-sm">
              <li className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                <span>38 logins · 14 corp URLs</span>
                <span className="font-medium text-destructive">32 live cookies</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                <span>AWS_IAM key · scope:* (admin)</span>
                <span className="font-medium text-destructive">re-listed</span>
              </li>
              <li className="flex items-center justify-between rounded-lg border border-lime/50 bg-lime/10 px-3 py-2">
                <span className="font-medium text-lime-foreground">Auto-remediated</span>
                <span className="font-medium text-lime-foreground">password reset · sessions revoked</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Exposed credentials are an open door */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Exposed credentials are an <span className="highlight">open door</span> for attackers
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {doors.map((d) => (
            <div key={d.title} className="rounded-xl border border-border bg-card p-6">
              <d.icon className="size-7 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-4 text-lg font-semibold">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Clarity */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Flare turns credential chaos into clarity</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Coverage, speed, and automated response
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              The industry&apos;s best coverage of identity exposures, near
              real-time detection, and automated remediation through your IdP —
              so the gap between discovery and fix collapses from days to
              seconds.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {pillars.map((p) => (
              <div key={p.title} className="rounded-xl border border-border bg-card p-5">
                <p.icon className="size-6 text-muted-foreground" strokeWidth={1.5} />
                <h3 className="mt-3 font-semibold">{p.title}</h3>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* Toolkit */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          The Identity Exposure Management <span className="highlight">toolkit</span>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {toolkit.map((t) => (
            <div key={t.title} className="rounded-xl border border-border bg-card p-6">
              <t.icon className="size-7 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-4 text-lg font-semibold">{t.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* Results */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Results you can <span className="highlight">expect</span>
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-3">
          <StatCard stat="321%" label="Overall ROI" sub="Payback in under 6 months" />
          <StatCard stat="25%" label="Lower severe breach risk" sub="$509K in associated savings" />
          <StatCard stat="1300+" label="Analyst hours reallocated" sub="$167K labor cost savings" />
        </div>
      </Section>

      {/* Extend to employees */}
      <Section>
        <div className="grid gap-10 rounded-2xl border border-border bg-card p-8 sm:grid-cols-2 sm:items-center lg:p-12">
          <div>
            <Eyebrow>Extend security to your people</Eyebrow>
            <h2 className="mt-6 text-balance text-3xl font-bold tracking-tight sm:text-4xl">
              Bring identity intelligence to the employees who need it
            </h2>
            <p className="mt-4 text-pretty text-lg leading-relaxed text-muted-foreground">
              With personal and corporate identities increasingly entangled,
              dark web monitoring and PII exposure detection delivered as an
              employee benefit strengthens your whole security culture.
            </p>
          </div>
          <div className="flex items-center justify-center rounded-xl border border-border bg-background p-8">
            <Users className="size-16 text-accent-secondary" strokeWidth={1.2} />
          </div>
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently asked about{" "}
          <span className="highlight">identity exposure</span>
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
          <Bot className="mx-auto size-9 text-lime" strokeWidth={2.2} />
          <h2 className="mx-auto mt-6 max-w-2xl text-balance text-3xl font-bold tracking-tight sm:text-4xl">
            Book a demo of Identity Exposure Management
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            See how Aegis validates and remediates exposed identities
            automatically — before attackers log in.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <PixelButton href="#">Book a Demo</PixelButton>
            <PixelButton href="#" variant="ghost">Start Free Scan</PixelButton>
          </div>
        </div>
      </Section>

      <CtaFooter />
    </main>
  )
}
