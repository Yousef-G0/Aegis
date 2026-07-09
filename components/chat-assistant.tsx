"use client"

import { useEffect, useRef, useState } from "react"
import {
  ArrowDown,
  Bot,
  Send,
  ShieldAlert,
  Sparkles,
  X,
} from "lucide-react"
import { cn } from "@/lib/utils"

type Sender = "bot" | "user"

interface Message {
  id: number
  sender: Sender
  text: string
}

interface QuickReply {
  label: string
  prompt: string
}

const QUICK_REPLIES: QuickReply[] = [
  { label: "Scan a domain", prompt: "Scan a domain for exposure" },
  { label: "My attack surface", prompt: "What is my external attack surface?" },
  { label: "Critical CVEs", prompt: "Show the latest critical CVEs" },
  { label: "Breach check", prompt: "Check if my org was in a breach" },
  { label: "Triage an alert", prompt: "Help me triage a security alert" },
]

const GREETING =
  "Hi — I'm the Aegis CTI assistant. I surface your external threat exposure: exposed assets, fresh CVEs, leaked credentials, and alert triage. What do you want to look at first?"

// Demo canned replies. Swap this out for a real CTI backend later.
function getBotReply(input: string): string {
  const q = input.toLowerCase()

  if (q.includes("scan") && q.includes("domain")) {
    return `Paste a domain (e.g. acme.com) and I'll enumerate subdomains, open ports, and TLS issues. For now, here's a sample:

• 14 subdomains discovered
• 3 hosts with expired certificates
• 1 exposed admin panel (panel.acme.com:8443)

⚠️ Sample data — connect your scanner to get live results.`
  }
  if (q.includes("attack surface") || q.includes("exposure")) {
    return `Your external attack surface (sample):

• 42 internet-facing assets
• 6 with critical misconfigurations
• 2 assets in sanctioned/blocked regions
• Last scan: 2h ago

Want a prioritized remediation list?`
  }
  if (q.includes("cve")) {
    return `Latest critical CVEs (sample feed):

• CVE-2024-3094 — xz-utils backdoor (CVSS 10.0)
• CVE-2024-21412 — Windows SmartScreen bypass (CVSS 8.1)
• CVE-2023-46805 — Ivanti SSL VPN RCE (CVSS 9.8)

3 of your assets map to these. Want the affected hostnames?`
  }
  if (q.includes("breach") || q.includes("leak") || q.includes("credential")) {
    return `Breach lookup (sample):

• 2 employee emails found in recent stealer logs
• 1 password reused across 4 services
• 0 active session tokens observed

I can draft a forced-reset notice for the affected accounts.`
  }
  if (q.includes("triage") || q.includes("alert")) {
    return `Triage steps:

1. Confirm scope — which asset/IP triggered it?
2. Check if the IOC matches a known-good source.
3. Correlate with recent CVEs & threat-actor TTPs.
4. Decide: ignore / monitor / contain.

Paste the alert details and I'll do step 1–3 for you.`
  }
  return `I can help with: domain scans, attack-surface summaries, critical CVEs, breach/credential checks, and alert triage. Try one of the quick actions below — or type a domain or IOC.`
}

export function ChatAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    { id: 0, sender: "bot", text: GREETING },
  ])
  const [input, setInput] = useState("")
  const [typing, setTyping] = useState(false)
  const [unseen, setUnseen] = useState(true)
  const [showScroll, setShowScroll] = useState(false)

  const idRef = useRef(1)
  const scrollerRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const timers = useRef<ReturnType<typeof setTimeout>[]>([])

  // Scroll the message list to the bottom whenever it changes.
  useEffect(() => {
    const el = scrollerRef.current
    if (el && open) el.scrollTop = el.scrollHeight
  }, [messages, typing, open])

  // Focus the input when the panel opens.
  useEffect(() => {
    if (open) {
      setUnseen(false)
      const t = setTimeout(() => inputRef.current?.focus(), 120)
      return () => clearTimeout(t)
    }
  }, [open])

  // Clear any pending bot timers on unmount.
  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  function send(text: string) {
    const trimmed = text.trim()
    if (!trimmed) return

    const userMsg: Message = { id: idRef.current++, sender: "user", text: trimmed }
    setMessages((prev) => [...prev, userMsg])
    setInput("")
    setTyping(true)

    const reply = getBotReply(trimmed)
    const t = setTimeout(() => {
      setTyping(false)
      setMessages((prev) => [
        ...prev,
        { id: idRef.current++, sender: "bot", text: reply },
      ])
    }, 750)
    timers.current.push(t)
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    send(input)
  }

  return (
    <div className="fixed bottom-4 right-4 z-[60] flex flex-col items-end gap-3 sm:bottom-6 sm:right-6">
      {/* Chat panel */}
      {open && (
        <div
          role="dialog"
          aria-label="Aegis CTI assistant"
          className="animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 flex h-[min(32rem,calc(100dvh-7rem))] w-[calc(100vw-2rem)] max-w-[24rem] flex-col overflow-hidden rounded-xl border-2 border-foreground bg-card text-card-foreground shadow-[6px_6px_0_0_var(--foreground)] motion-reduce:animate-none"
        >
          {/* Header */}
          <div className="flex items-center justify-between gap-2 border-b-2 border-foreground bg-lime px-3 py-2.5 text-lime-foreground">
            <div className="flex items-center gap-2">
              <span className="flex size-8 items-center justify-center rounded-md border-2 border-lime-foreground bg-background/20">
                <ShieldAlert className="size-4" />
              </span>
              <div className="leading-tight">
                <p className="font-pixel text-[0.62rem] uppercase tracking-tight">
                  Aegis // CTI
                </p>
                <p className="text-[0.65rem] opacity-80">
                  Threat Exposure Assistant
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex size-8 items-center justify-center rounded-md text-lime-foreground outline-none transition-colors hover:bg-lime-foreground/15 focus-visible:ring-2 focus-visible:ring-lime-foreground/50"
            >
              <X className="size-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            ref={scrollerRef}
            onScroll={(e) =>
              setShowScroll(
                e.currentTarget.scrollHeight -
                  e.currentTarget.scrollTop -
                  e.currentTarget.clientHeight >
                  24,
              )
            }
            className="relative flex-1 space-y-3 overflow-y-auto p-3"
          >
            {messages.map((m) => (
              <MessageBubble key={m.id} message={m} />
            ))}

            {typing && (
              <div className="flex items-end gap-2">
                <BotAvatar />
                <div className="flex items-center gap-1 rounded-xl rounded-bl-sm border border-border bg-muted px-3 py-2.5">
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.3s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground [animation-delay:-0.15s]" />
                  <span className="size-1.5 animate-bounce rounded-full bg-muted-foreground" />
                </div>
              </div>
            )}

            {showScroll && (
              <button
                type="button"
                onClick={() => {
                  const el = scrollerRef.current
                  if (el) el.scrollTop = el.scrollHeight
                }}
                aria-label="Scroll to latest"
                className="absolute bottom-2 left-1/2 flex size-7 -translate-x-1/2 items-center justify-center rounded-full border-2 border-foreground bg-background text-foreground shadow-[2px_2px_0_0_var(--foreground)]"
              >
                <ArrowDown className="size-3.5" />
              </button>
            )}
          </div>

          {/* Quick replies */}
          {messages.length <= 1 && !typing && (
            <div className="flex flex-wrap gap-1.5 border-t border-border px-3 pt-2.5">
              {QUICK_REPLIES.map((qr) => (
                <button
                  key={qr.label}
                  type="button"
                  onClick={() => send(qr.prompt)}
                  className="rounded-full border border-border bg-background px-2.5 py-1 text-xs text-foreground/80 transition-colors hover:border-accent-secondary hover:text-foreground"
                >
                  {qr.label}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <form
            onSubmit={handleSubmit}
            className="flex items-center gap-2 border-t-2 border-foreground p-2.5"
          >
            <input
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask about a domain, asset, or alert…"
              aria-label="Message"
              className="min-w-0 flex-1 rounded-lg border border-input bg-background px-3 py-2 text-sm text-foreground outline-none placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            />
            <button
              type="submit"
              aria-label="Send message"
              className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary text-primary-foreground outline-none transition-transform hover:translate-y-px focus-visible:ring-3 focus-visible:ring-ring/50 disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="size-4" />
            </button>
          </form>
        </div>
      )}

      {/* Launcher button (stays fixed, follows you on scroll) */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-label={open ? "Close assistant" : "Open CTI assistant"}
        aria-expanded={open}
        className={cn(
          "relative flex size-14 items-center justify-center rounded-full border-2 border-foreground bg-lime text-lime-foreground shadow-[4px_4px_0_0_var(--foreground)] outline-none transition-all",
          "hover:translate-x-[1px] hover:translate-y-[1px] hover:shadow-[3px_3px_0_0_var(--foreground)] active:translate-x-[4px] active:translate-y-[4px] active:shadow-none",
          "focus-visible:ring-3 focus-visible:ring-ring/50",
          "motion-reduce:transition-none",
        )}
      >
        {open ? (
          <X className="size-6" />
        ) : (
          <Bot className="size-6" />
        )}

        {unseen && !open && (
          <span className="absolute -top-0.5 -right-0.5 flex size-3.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-destructive opacity-75" />
            <span className="relative inline-flex size-3.5 rounded-full border-2 border-foreground bg-destructive" />
          </span>
        )}
      </button>

      {/* Hint chip when closed */}
      {!open && (
        <div className="animate-in fade-in slide-in-from-right-2 pointer-events-none hidden rounded-lg border-2 border-foreground bg-background px-2.5 py-1.5 text-xs font-medium text-foreground shadow-[3px_3px_0_0_var(--foreground)] sm:block">
          <Sparkles className="mr-1 inline-block size-3.5 text-accent-secondary" />
          Ask the CTI assistant
        </div>
      )}
    </div>
  )
}

function BotAvatar() {
  return (
    <span className="flex size-7 shrink-0 items-center justify-center rounded-md border-2 border-foreground bg-lime text-lime-foreground">
      <Bot className="size-4" />
    </span>
  )
}

function MessageBubble({ message }: { message: Message }) {
  const isUser = message.sender === "user"

  if (isUser) {
    return (
      <div className="flex animate-in fade-in slide-in-from-bottom-2 justify-end motion-reduce:animate-none">
        <div className="max-w-[85%] whitespace-pre-wrap rounded-xl rounded-br-sm border-2 border-foreground bg-primary px-3 py-2 text-sm text-primary-foreground">
          {message.text}
        </div>
      </div>
    )
  }

  return (
    <div className="flex animate-in fade-in slide-in-from-bottom-2 items-end gap-2 motion-reduce:animate-none">
      <BotAvatar />
      <div className="max-w-[85%] whitespace-pre-wrap rounded-xl rounded-bl-sm border border-border bg-muted px-3 py-2 text-sm text-foreground">
        {message.text}
      </div>
    </div>
  )
}
