import { Cpu } from "lucide-react"
import { Logo } from "@/components/logo"

const providers = [
  { name: "Aegis", gpus: "L4 · A100 · H100 · H200 · B200" },
  { name: "Modal", gpus: "A10 · L40S · A100 · H100" },
  { name: "RunPod", gpus: "RTX 4090 · A100 · H100" },
  { name: "Vast.ai", gpus: "L4 · RTX 4090 · A100" },
  { name: "Local hardware", gpus: "Bring your own GPU" },
]

export function HardwareSection() {
  return (
    <section className="border-b border-border">
      <div className="mx-auto max-w-6xl px-4 py-20 text-center sm:py-24">
        <div className="mx-auto mb-6 flex w-fit items-center justify-center">
          <Logo className="scale-125" />
        </div>
        <h2 className="mx-auto max-w-3xl text-balance text-4xl font-bold tracking-tight sm:text-5xl">
          Deploy on the <span className="highlight">hardware</span> you choose
        </h2>
        <p className="mx-auto mt-5 max-w-xl text-pretty text-lg leading-relaxed text-muted-foreground">
          Compare real GPU prices and deploy wherever fits. The deployment kit
          and your own cloud mean no lock-in, no rewrites.
        </p>

        <div className="mt-14 grid items-stretch gap-6 lg:grid-cols-[1fr_auto_1fr]">
          {/* Source */}
          <div className="flex items-center justify-center rounded-xl border border-border bg-card p-6">
            <div className="text-center">
              <div className="mx-auto mb-3 flex size-12 items-center justify-center rounded-lg bg-[#ffd21e] text-2xl">
                {"\u{1F917}"}
              </div>
              <p className="font-semibold">Hugging Face</p>
              <p className="text-sm text-muted-foreground">
                Any Hugging Face model
              </p>
            </div>
          </div>

          {/* Optimizer */}
          <div className="flex items-center justify-center rounded-xl border border-lime/60 bg-lime/10 px-8 py-6">
            <div className="text-center">
              <Logo className="mx-auto mb-3 scale-150" />
              <p className="font-semibold">Aegis</p>
              <p className="text-sm text-muted-foreground">Optimize</p>
            </div>
          </div>

          {/* Providers */}
          <div className="grid gap-2 text-left">
            {providers.map((p) => (
              <div
                key={p.name}
                className="flex items-center gap-3 rounded-lg border border-border bg-card px-4 py-3 transition-colors hover:border-foreground/30"
              >
                <Cpu className="size-4 shrink-0 text-muted-foreground" />
                <div>
                  <p className="text-sm font-semibold">{p.name}</p>
                  <p className="text-xs text-muted-foreground">{p.gpus}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
