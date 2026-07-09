"use client"

import { useState } from "react"

const faqs = [
  {
    q: "What is Aegis?",
    a: "Describe what you want to run. Aegis picks compatible open models, benchmarks GPUs, tunes the runtime, and gives you a deploy-ready stack.",
  },
  {
    q: "How do I build my first pipeline?",
    a: "Paste a model or describe your workload in plain English. Aegis drafts a plan across engines and GPUs, then runs it once you accept.",
  },
  {
    q: "Which AI models are supported?",
    a: "Any open model on Hugging Face across LLMs, speech, embeddings, rankers, vision, and audio — from Llama and Qwen to Whisper and DeepSeek.",
  },
  {
    q: "How does GPU kernel optimization work?",
    a: "Where supported, Aegis tunes kernels and server settings for your model and target GPU, measuring the impact instead of assuming it.",
  },
  {
    q: "Can I deploy pipelines as APIs?",
    a: "Yes. Deploy the winning stack on our cloud and pay per million tokens, or export the deployment kit and self-host it anywhere.",
  },
  {
    q: "How is this different from using closed-source APIs?",
    a: "You own the stack. No black box — you get the measured benchmark receipt and a runnable kit you can inspect, run, or move to your own cloud.",
  },
  {
    q: "Is my data secure?",
    a: "Workloads run on isolated GPU infrastructure with end-to-end encryption and zero data retention. Aegis is SOC 2 Type II attested.",
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
