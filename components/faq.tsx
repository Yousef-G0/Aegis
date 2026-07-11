"use client"

import { useState } from "react"

const faqs = [
  {
    q: "What is Aegis?",
    a: "Aegis is a cyber threat intelligence and exposure management platform. Enter your domain and Aegis maps your external attack surface, then scans the open, deep, and dark web for exposure tied to your organization.",
  },
  {
    q: "How does a scan work?",
    a: "Aegis enumerates your domains, subdomains, IPs, and certificates, then correlates them against leaked credentials, source code, secrets, and dark web chatter — scoring each finding by real risk.",
  },
  {
    q: "What does Aegis monitor?",
    a: "Exposed credentials, leaked source repos, stale subdomains, open cloud buckets, phishing and brand-abuse domains, and mentions across dark web forums, markets, and Telegram.",
  },
  {
    q: "Is monitoring the dark web legal and safe?",
    a: "Yes. Aegis collects intelligence from publicly accessible underground sources using compliant, read-only methods. We never interact with or post to those sources.",
  },
  {
    q: "How fast will I see results?",
    a: "Most organizations get their first prioritized exposure report in minutes. Continuous monitoring then keeps the view current around the clock.",
  },
  {
    q: "Does it integrate with my stack?",
    a: "Yes. Push findings to Slack, Jira, Splunk, and your SIEM or SOAR, or pull them via API — so remediation happens inside workflows you already run.",
  },
  {
    q: "Is my data secure?",
    a: "Scans run on isolated infrastructure with end-to-end encryption and zero data retention on your assets. Aegis is SOC 2 Type II attested.",
  },
]

export function Faq() {
  const [active, setActive] = useState(0)

  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-4xl px-4 py-20 text-center sm:py-24">
        <h2 className="text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Common <span className="highlight">questions</span>
        </h2>
        <p className="mt-4 text-muted-foreground">
          Can&apos;t find what you&apos;re looking for?{" "}
          <a href="#" className="font-medium text-foreground underline underline-offset-4">
            Get in touch
          </a>
        </p>

        <div className="mt-10 flex flex-wrap justify-center gap-2">
          {faqs.map((f, i) => (
            <button
              key={f.q}
              type="button"
              onClick={() => setActive(i)}
              className={
                "rounded-lg px-3 py-2 text-sm font-medium transition-colors " +
                (active === i
                  ? "bg-lime text-lime-foreground"
                  : "bg-secondary text-secondary-foreground hover:bg-muted")
              }
            >
              {f.q}
            </button>
          ))}
        </div>

        <div className="mx-auto mt-8 max-w-2xl rounded-xl border border-border bg-card p-6 text-left">
          <p className="font-semibold">{faqs[active].q}</p>
          <p className="mt-2 leading-relaxed text-muted-foreground">
            {faqs[active].a}
          </p>
        </div>
      </div>
    </section>
  )
}
