"use client"

import { ChevronDown, Clock, MapPin, Users } from "lucide-react"
import { MobileRecoveryFlow } from "@/components/mobile-recovery-flow"
import { StoreBadges } from "@/components/store-badges"

import dynamic from "next/dynamic"

const MapPreview = dynamic(() => import("@/components/interactive-map"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-muted/20 animate-pulse flex items-center justify-center border border-border/60">
      <p className="text-muted-foreground text-sm font-medium">Loading live map...</p>
    </div>
  )
})

export function HeroSection() {
  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 pt-20 pb-32 lg:pt-12 lg:pb-24 overflow-hidden">
      {/* Background gradients */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'linear-gradient(135deg, oklch(0.17 0.005 260 / 0.04), transparent, oklch(0.17 0.005 260 / 0.02))',
            'radial-gradient(ellipse 800px 600px at 0% 0%, oklch(0.17 0.005 260 / 0.06), transparent)',
          ].join(', '),
        }}
      />

      <div className="relative max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-8 items-center pt-8">
        
        {/* Left Column: Content */}
        <div className="space-y-6 sm:space-y-8 text-left max-w-2xl mx-auto lg:mx-0 w-full">


          <div className="space-y-4">


            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-5xl xl:text-6xl font-extrabold leading-[1.05] tracking-tight text-foreground">
              Stolen vehicle? Your community can help find it.
            </h1>

            {/* Sub-headline */}
            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
              Report it in under a minute, alert people nearby, and see sightings on a map you can share with the police.
            </p>
          </div>

          <StoreBadges className="animate-fade-in-up animation-delay-400" />

          {/* Value props — compact pills on mobile, expanded on sm+ */}
          <div className="pt-6 mt-6 border-t border-border/40 max-w-lg animate-fade-in-up animation-delay-500">
            {/* Mobile: compact horizontal pills */}
            <div className="flex sm:hidden items-center gap-2 flex-wrap">
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                <Clock className="h-3.5 w-3.5 text-primary" />
                60s to report
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                <MapPin className="h-3.5 w-3.5 text-primary" />
                UK-Wide
              </div>
              <div className="flex items-center gap-1.5 rounded-full border border-border/60 bg-card px-3 py-1.5 text-xs font-medium text-foreground shadow-sm">
                <Users className="h-3.5 w-3.5 text-primary" />
                Community
              </div>
            </div>

            {/* sm+: expanded layout with icons & descriptions */}
            <div className="hidden sm:flex flex-row gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">60 Seconds</p>
                  <p className="text-xs text-muted-foreground leading-tight">To report</p>
                </div>
              </div>
              
              <div className="w-px h-10 bg-border/60"></div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <MapPin className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">UK-Wide</p>
                  <p className="text-xs text-muted-foreground leading-tight">Report anywhere</p>
                </div>
              </div>

              <div className="w-px h-10 bg-border/60"></div>

              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">Community</p>
                  <p className="text-xs text-muted-foreground leading-tight">Powered</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile recovery flow graphic — visible below lg only */}
          <div className="block lg:hidden mt-8">
            <MobileRecoveryFlow />
          </div>
        </div>

        {/* Right Column: Interactive Map */}
        <div className="hidden lg:block relative w-full aspect-square sm:aspect-[4/3] lg:aspect-auto lg:h-[500px] xl:h-[600px] rounded-[2rem] overflow-hidden shadow-2xl border border-border/60 animate-fade-in-up animation-delay-700 bg-card group">
          <MapPreview className="w-full h-full" />
          {/* Edge glow overlay */}
          <div className="absolute inset-0 rounded-[2rem] ring-1 ring-inset ring-white/10 pointer-events-none z-[400]" />
          

        </div>

      </div>

      {/* Scroll indicator - adjusted to ensure visibility */}
      <button
        onClick={() => {
          document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-6 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors animate-fade-in animation-delay-700 cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase">How it works</span>
        <ChevronDown className="h-4 w-4 animate-bounce-subtle" />
      </button>
    </section>
  )
}
