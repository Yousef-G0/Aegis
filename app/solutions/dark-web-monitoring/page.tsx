import type { Metadata } from "next"
import {
  MessagesSquare,
  Globe,
  Network,
  Bug,
  KeyRound,
  ShieldAlert,
  Bot,
  Code2,
  Search,
  Zap,
  Workflow,
  Fingerprint,
} from "lucide-react"
import { SiteHeader } from "@/components/site-header"
import { CtaFooter } from "@/components/cta-footer"
import { Logo } from "@/components/logo"
import { Section, Eyebrow, PixelButton, StatCard } from "@/components/marketing"
import { cn } from "@/lib/utils"

export const metadata: Metadata = {
  title: "Dark Web Monitoring — Aegis",
  description:
    "Aegis monitors thousands of cybercrime channels — Telegram, Tor, I2P, forums, and stealer markets — and turns the noise into intelligence specific to your organization.",
}

const feed = [
  { chan: "@combo_clouds_v3", text: "Fresh dump 14M lines · 412 corp hits", time: "02:14" },
  { chan: "@lumma_lounge", text: "STEALER LOG · 38 saved logins · cookies LIVE", time: "02:12" },
  { chan: "@aitm_kit_resellers", text: "Tycoon 2FA v4 templates · target brand", time: "02:11" },
  { chan: "@session_replay_market", text: "12 live tokens · O365 · CRM", time: "02:05" },
  { chan: "@nhi_keystore", text: "AWS_IAM admin · scope:*", time: "02:03" },
]

const sources = ["Telegram", "Tor (.onion)", "I2P", "Forums", "Stealer markets", "Combo lists", "Paste sites"]

const timeline = [
  { era: "2010s", title: "Credentials at rest", body: "Third-party breach dumps. Reused passwords carry the attack across SaaS, VPN, and your IdP." },
  { era: "2010s", title: "Combo lists", body: "Curated email-and-password pairs sold by the million for credential stuffing." },
  { era: "Early 2020s", title: "Phishing kits", body: "Off-the-shelf credential capture — templates, anti-bot filters, Telegram exfil — sold for a few hundred dollars." },
  { era: "Today", title: "Infostealer logs", body: "Browser dumps traded on dark markets. Operators log in directly with stolen creds." },
  { era: "2026", title: "Sessions on demand", body: "Stolen cookies bypass MFA. The live session is the new credential." },
  { era: "2026", title: "AI-driven AiTM phishing", body: "Vibe-coded kits, real-time proxies. Sessions sold by the seat." },
  { era: "Now", title: "NHI compromise", body: "Service accounts, API keys, OAuth apps — identity with no human behind it." },
]

const surfaces = [
  {
    icon: KeyRound,
    title: "Credential leak",
    threat: "An employee's personal account is exposed in a SaaS dump. The same password protects your VPN, IdP, and code repos.",
    handle: ["Auto-validate against Entra ID", "Auto-lock affected accounts"],
  },
  {
    icon: Bug,
    title: "Infostealer log",
    threat: "A contractor's machine catches Lumma. Every saved login and cookie — your corporate URLs included — hits a market for $10–$60 a seat.",
    handle: ["Parse the log against your tenant", "Validate, then lock exposed accounts"],
  },
  {
    icon: ShieldAlert,
    title: "Phishing-kit credentials",
    threat: "A kit harvests creds and drops them in the operator's Telegram group. Buyers don't reuse them — they resell. By the time you find out, it's on its third owner.",
    handle: ["Monitor the exfil group", "Validate and lock before buyers log in"],
  },
  {
    icon: Fingerprint,
    title: "Session replay",
    threat: "A live session token, replayed from a foreign IP, walks into your CRM. No password, no MFA trip — the session is the credential.",
    handle: ["Detect exposed sessions", "Revoke via IdP or API at scale"],
  },
  {
    icon: Network,
    title: "NHI compromise",
    threat: "A service-account key lands in a public gist, then a Telegram channel. Non-human identities rarely have MFA, rarely rotate.",
    handle: ["Scan git, pastes, registries, Telegram", "File takedown requests on your behalf"],
  },
]

const steps = [
  { icon: Search, title: "Discover", body: "Map your identity surface: domains, subsidiaries, VIPs, brands, NHIs. Aegis seeds itself; you tune from there." },
  { icon: Globe, title: "Monitor", body: "Continuous matching across forums, markets, Telegram, stealer logs, and paste sites. Hits are parsed, deduped, and severity-scored." },
  { icon: Zap, title: "Act", body: "Push to your IdP, SIEM, SOAR, or ticketing. Rotate, revoke, or hand off without leaving your console." },
  { icon: Workflow, title: "Integrate", body: "Native integrations with Okta, Splunk, Sentinel, Crowdstrike, Tines — or hit the API and roll your own playbooks." },
]

const faqs = [
  { q: "What is dark web monitoring?", a: "Dark web monitoring scans illicit sources — Telegram channels, Tor forums, I2P sites, stealer-log markets, and combo lists — for data tied to your organization, then surfaces identity exposures, leaked secrets, and brand threats so you can remediate before adversaries act." },
  { q: "What types of information are sold on the dark web?", a: "Leaked credentials, session cookies, PII, source code, financial data, and company proprietary information — often packaged in stealer logs that exfiltrate everything saved in a victim's browser." },
  { q: "Is monitoring the dark web safe?", a: "Yes. Trusted platforms collect read-only, using compliant methods and ethical guidelines. Aegis never interacts with or posts to the sources it monitors." },
  { q: "Why automate dark web monitoring?", a: "Manual searching is slow, incomplete, and not scalable. Automated monitoring scans continuously and delivers prioritized, evidence-backed alerts in near real time." },
  { q: "How fast can we get started?", a: "Most teams stand up Aegis in about 30 minutes. Connect a domain, seed your identities, and start surfacing exposure within the hour." },
]

export default function DarkWebMonitoringPage() {
  return (
    <main className="relative z-0 min-h-screen">
      <SiteHeader />

      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="pointer-events-none absolute inset-0 grid-lines opacity-40" />
        <div className="relative mx-auto grid max-w-6xl gap-12 px-4 py-20 sm:py-28 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Dark Web Monitoring</Eyebrow>
            <h1 className="mt-6 text-balance text-5xl font-bold leading-[1.05] tracking-tight sm:text-6xl">
              The dark web is already talking about you.{" "}
              <span className="highlight">Hear it first.</span>
            </h1>
            <p className="mt-6 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
              Aegis monitors thousands of cybercrime channels — Telegram, Tor,
              I2P, forums, and stealer markets — and turns the noise into
              intelligence specific to your organization. Set up in 30 minutes.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PixelButton href="#">Start Free Scan</PixelButton>
              <PixelButton href="#" variant="ghost">Book a Demo</PixelButton>
            </div>
          </div>

          <div className="rounded-2xl border-2 border-foreground bg-card p-4 shadow-[6px_6px_0_0_var(--foreground)]">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <div className="flex items-center gap-2">
                <Logo className="scale-90" />
                <span className="text-sm font-medium">Dark Web Feed</span>
              </div>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium">
                <span className="size-1.5 animate-pulse rounded-full bg-lime" />
                Live
              </span>
            </div>
            <ul className="mt-3 space-y-2">
              {feed.map((f) => (
                <li key={f.chan} className="flex items-start gap-3 rounded-lg border border-border bg-background p-3">
                  <MessagesSquare className="mt-0.5 size-4 shrink-0 text-muted-foreground" />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 text-xs">
                      <span className="font-mono font-medium">{f.chan}</span>
                      <span className="text-muted-foreground">{f.time}</span>
                    </div>
                    <p className="mt-0.5 truncate text-sm text-foreground/90">{f.text}</p>
                  </div>
                  <span className="ml-auto shrink-0 rounded border border-destructive/40 px-1.5 py-0.5 text-[10px] font-semibold uppercase text-destructive">
                    New
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* What is it */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              What is <span className="highlight">dark web</span> monitoring?
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              A dark web monitoring platform continuously collects, analyzes,
              and contextualizes data from cybercrime sources — Telegram,
              Tor forums, I2P sites, stealer-log markets, and leaked-credential
              combo lists — surfacing identity exposures, leaked secrets, and
              brand threats specific to your organization.
            </p>
          </div>
          <div className="rounded-xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Sources we monitor
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {sources.map((s) => (
                <span key={s} className="rounded-full border border-border bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
                  {s}
                </span>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Credential evolution */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Dark web monitoring built for how{" "}
          <span className="highlight">credentials move now</span>
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-balance text-center text-lg leading-relaxed text-muted-foreground">
          Yesterday's tool watched passwords. The attack moved on.
        </p>
        <ol className="mt-12 space-y-4">
          {timeline.map((t, i) => (
            <li key={i} className="grid gap-4 rounded-xl border border-border bg-card p-5 sm:grid-cols-[200px_1fr]">
              <div className="flex items-center gap-2">
                <span className="font-pixel text-xs text-accent-secondary">{t.era}</span>
              </div>
              <div>
                <p className="font-semibold">{t.title}</p>
                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{t.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </Section>

      {/* One platform, every surface */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          One platform, <span className="highlight">every surface</span>
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {surfaces.map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-6">
              <div className="flex items-center gap-3">
                <s.icon className="size-6 text-muted-foreground" strokeWidth={1.5} />
                <h3 className="text-lg font-semibold">{s.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.threat}</p>
              <div className="mt-4 rounded-lg border border-lime/50 bg-lime/10 p-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-lime-foreground">
                  How Aegis handles it
                </p>
                <ul className="mt-2 space-y-1 text-sm">
                  {s.handle.map((h) => (
                    <li key={h} className="flex items-start gap-2">
                      <Zap className="mt-0.5 size-3.5 shrink-0 text-lime-foreground" />
                      {h}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Telegram is the new dark web */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>Telegram is the new dark web</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              The most extensive cybercrime Telegram coverage in the industry
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Threat actors moved from Tor forums to Telegram channels and
              ephemeral DMs. Aegis follows — combo-list drops, stealer-log
              brokers, ransomware press rooms, and AiTM kit resellers.
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="font-semibold">Aegis</p>
                <p className="mt-1 text-sm text-muted-foreground">Broad · deep · parsed</p>
              </div>
              <div className="rounded-xl border border-border bg-card p-4">
                <p className="font-semibold">Typical competitor</p>
                <p className="mt-1 text-sm text-muted-foreground">Surface-level keyword feed</p>
              </div>
            </div>
          </div>
          <div className="rounded-2xl border-2 border-foreground bg-card p-4 shadow-[6px_6px_0_0_var(--foreground)]">
            <div className="flex items-center justify-between border-b border-border pb-3">
              <span className="font-mono text-sm">flare://intel/feed · telegram</span>
              <span className="inline-flex items-center gap-1.5 rounded-full border border-border bg-background px-2.5 py-1 text-xs font-medium">
                <span className="size-1.5 animate-pulse rounded-full bg-lime" /> Live
              </span>
            </div>
            <ul className="mt-3 space-y-2 font-mono text-xs">
              {feed.map((f) => (
                <li key={f.chan} className="flex items-center justify-between rounded-lg border border-border bg-background px-3 py-2">
                  <span className="truncate">{f.chan}</span>
                  <span className="text-muted-foreground">{f.time}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>

      {/* Built for the analyst */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Built for the <span className="highlight">analyst</span>, not the dashboard tour
        </h2>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {steps.map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-6">
              <s.icon className="size-7 text-muted-foreground" strokeWidth={1.5} />
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{s.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* API-first */}
      <Section>
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <div>
            <Eyebrow>API-first by design</Eyebrow>
            <h2 className="mt-6 text-balance text-4xl font-bold tracking-tight sm:text-5xl">
              Programmable from event to action
            </h2>
            <p className="mt-5 text-lg leading-relaxed text-muted-foreground">
              Every platform event is available over a documented REST API. Pull
              events, search, trigger actions, and wire exposures straight into
              your SIEM, SOAR, or ticketing system — no console required.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              {["Azure Sentinel", "Okta", "ServiceNow", "Slack", "Jira", "Entra ID", "+ your stack via REST"].map((s) => (
                <span key={s} className="inline-flex items-center gap-2 rounded-lg border border-border bg-background px-3 py-2 text-sm font-medium">
                  <Network className="size-4 text-muted-foreground" /> {s}
                </span>
              ))}
            </div>
          </div>
          <div className="overflow-hidden rounded-2xl border-2 border-foreground bg-[#0b1020] p-5 shadow-[6px_6px_0_0_var(--foreground)]">
            <div className="mb-3 flex items-center gap-2 text-muted-foreground">
              <Code2 className="size-4" />
              <span className="font-mono text-xs">flare-cli · pull events</span>
            </div>
            <pre className="overflow-x-auto font-mono text-xs leading-relaxed text-green-300">
{`$ curl -H "Authorization: Bearer ftk_••••" \\
  "https://api.aegis.io/v1/events?
   org=acme-inc&source=forums,telegram"

{ "org": "acme-inc",
  "window": "7d", "count": 47,
  "events": [
    { "type": "credential.leak",
      "severity": "high" },
    { "type": "session.exposed",
      "severity": "critical",
      "cookies_live": 32 },
    { "type": "nhi.exposed",
      "severity": "critical",
      "scope": "*" }
  ] }`}
            </pre>
          </div>
        </div>
      </Section>

      {/* Stats */}
      <Section>
        <div className="grid gap-6 sm:grid-cols-3">
          <StatCard stat="58k+" label="Telegram channels monitored" />
          <StatCard stat="20B+" label="Leaked credentials indexed" sub="Nearly a decade of archives" />
          <StatCard stat="30 min" label="To first critical alert" />
        </div>
      </Section>

      {/* FAQ */}
      <Section>
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Frequently asked about{" "}
          <span className="highlight">dark web monitoring</span>
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
            Stand up Aegis dark web monitoring in an afternoon
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
            No procurement gauntlet. Connect your domain, seed your identities,
            and start surfacing exposure inside an hour.
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
