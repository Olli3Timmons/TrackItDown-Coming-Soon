import { HeroSection } from "@/components/hero-section"
import { ProblemSection } from "@/components/problem-section"
import { FeaturesSection } from "@/components/features-section"
import { HowItWorksSection } from "@/components/how-it-works-section"
import { SafetySection } from "@/components/safety-section"
import { TrustSection } from "@/components/trust-section"
import { CtaSection } from "@/components/cta-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <main id="main-content" role="main" className="min-h-screen">
      <HeroSection />
      <ProblemSection />
      <FeaturesSection />
      <HowItWorksSection />
      <SafetySection />
      <TrustSection />
      <CtaSection />
      <Footer />
    </main>
  )
}
