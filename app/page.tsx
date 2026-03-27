import { HeroSection } from "@/components/hero-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { TrustSection } from "@/components/trust-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main id="main-content" role="main" className="min-h-screen">
      <HeroSection />
      <HowItWorksSection />
      <TrustSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
