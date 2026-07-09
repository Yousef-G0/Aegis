import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ResultSection } from "@/components/result-section"
import { HowItWorks } from "@/components/how-it-works"
import { HardwareSection } from "@/components/hardware-section"
import { OwnStack } from "@/components/own-stack"
import { Faq } from "@/components/faq"
import { CtaFooter } from "@/components/cta-footer"
import { ChatAssistant } from "@/components/chat-assistant"

export default function Page() {
  return (
    <main className="relative z-0 min-h-screen bg-background">
      <div className="bg-glow pointer-events-none absolute inset-0 -z-10" aria-hidden />
      <SiteHeader />
      <Hero />
      <ResultSection />
      <HowItWorks />
      <HardwareSection />
      <OwnStack />
      <Faq />
      <CtaFooter />
      <ChatAssistant />
    </main>
  )
}
