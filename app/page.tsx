import { SiteHeader } from "@/components/site-header"
import { Hero } from "@/components/hero"
import { ResultSection } from "@/components/result-section"
import { HowItWorks } from "@/components/how-it-works"
import { HardwareSection } from "@/components/hardware-section"
import { OwnStack } from "@/components/own-stack"
import { Faq } from "@/components/faq"
import { CtaFooter } from "@/components/cta-footer"

export default function Page() {
  return (
    <main className="min-h-screen bg-background">
      <SiteHeader />
      <Hero />
      <ResultSection />
      <HowItWorks />
      <HardwareSection />
      <OwnStack />
      <Faq />
      <CtaFooter />
    </main>
  )
}
