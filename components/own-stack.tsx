import { ShieldCheck, SlidersHorizontal, LineChart, Repeat } from "lucide-react"
import { DemoMock } from "@/components/demo-mock"

const reasons = [
  {
    icon: ShieldCheck,
    title: "Data privacy and control",
    body: "Keep sensitive workloads on infrastructure you choose.",
  },
  {
    icon: SlidersHorizontal,
    title: "Customization",
    body: "Tune the model, runtime, and GPU to your workload.",
  },
  {
    icon: LineChart,
    title: "Performance ownership",
    body: "Real tuning, measured, not assumed.",
  },
  {
    icon: Repeat,
    title: "Portability",
    body: "Run it on our cloud, or export it to yours.",
  },
]

const supported = [
  {
    label: "MODELS",
    items:
      "Llama 3.3, Whisper, Qwen-Image, NV-Embed, Parler-TTS, Qwen2.5, Cosmos, Pixtral, DeepSeek-V3, Mistral, Gemma 2, Nemotron, BERT, Qwen3 Embedding",
  },
  {
    label: "ENGINES",
    items: "vLLM, SGLang, TensorRT-LLM, vLLM Omni, TEI, Transformers",
  },
  {
    label: "GPUS",
    items: "L4, A10, L40S, RTX 4090, A100, H100, H200, B200",
  },
  {
    label: "CLOUDS",
    items: "Aegis Cloud, Modal, RunPod",
  },
]

export function OwnStack() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 sm:py-24">
        <h2 className="mx-auto max-w-3xl text-balance text-center text-4xl font-bold tracking-tight sm:text-5xl">
          Own the winning stack before you ship
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-center text-lg leading-relaxed text-muted-foreground">
          Not a black box. You get the measured stack to run, deploy, or export.
        </p>

        <h3 className="mt-16 text-center text-xl font-semibold">
          Why owning your AI stack matters
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
          <p className="text-lg font-semibold">Supported across the stack</p>
          <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
            Open models, serving engines, GPUs, and the clouds you deploy to.
            Aegis supports every layer of the inference stack.
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
