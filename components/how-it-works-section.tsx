"use client"

import { FileText, Eye, CheckCircle, ArrowRight } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Report your vehicle",
    description: "Submit a detailed report with photos and last known location in under 60 seconds.",
    accent: "from-red-500/20 to-red-500/5",
    accentBorder: "group-hover:border-red-500/30",
    accentShadow: "group-hover:shadow-red-500/10",
    iconAccent: "text-red-500",
    badgeAccent: "bg-red-500",
    detail: "📸 Photos · 📍 Location · 🚗 Details",
  },
  {
    number: "02",
    icon: Eye,
    title: "Community gets alerted",
    description: "Nearby members receive instant alerts and can safely report sightings with photos.",
    accent: "from-blue-500/20 to-blue-500/5",
    accentBorder: "group-hover:border-blue-500/30",
    accentShadow: "group-hover:shadow-blue-500/10",
    iconAccent: "text-blue-500",
    badgeAccent: "bg-blue-500",
    detail: "👁️ Local eyes · 📡 Instant alerts · 🤝 Anonymous",
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Track & recover",
    description: "Real-time sightings feed into a live map. Work with police to recover your vehicle.",
    accent: "from-emerald-500/20 to-emerald-500/5",
    accentBorder: "group-hover:border-emerald-500/30",
    accentShadow: "group-hover:shadow-emerald-500/10",
    iconAccent: "text-emerald-500",
    badgeAccent: "bg-emerald-500",
    detail: "🗺️ Live map · 🚔 Police link · ✅ Recovery",
  },
]

export function HowItWorksSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [lineProgress, setLineProgress] = useState(0)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  /* Animate the connecting line progressively */
  useEffect(() => {
    if (!isVisible) return
    const start = performance.now()
    const duration = 1200
    const delay = 500

    const animate = (now: number) => {
      const elapsed = now - start - delay
      if (elapsed < 0) {
        requestAnimationFrame(animate)
        return
      }
      const progress = Math.min(elapsed / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setLineProgress(eased)
      if (progress < 1) requestAnimationFrame(animate)
    }
    requestAnimationFrame(animate)
  }, [isVisible])

  return (
    <section ref={sectionRef} id="how-it-works" className="relative py-24 px-4 bg-card scroll-mt-20">
      {/* Soft gradient divider — top */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />

      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-16 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            How TrackItDown works
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Three simple steps to maximise your vehicle recovery chances.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-5 relative">
          {/* Animated connecting line — desktop only */}
          <div className="hidden md:block absolute top-[3.5rem] left-[calc(16.67%+28px)] right-[calc(16.67%+28px)] h-[2px] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-red-400/60 via-blue-400/60 to-emerald-400/60 rounded-full"
              style={{
                transform: `scaleX(${lineProgress})`,
                transformOrigin: 'left',
                transition: 'none',
              }}
            />
          </div>

          {/* Arrow connectors — desktop only */}
          {[0, 1].map((i) => (
            <div
              key={`arrow-${i}`}
              className={`hidden md:flex absolute top-[2.25rem] items-center justify-center z-10 transition-all duration-500 ${isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-50'}`}
              style={{
                left: i === 0 ? 'calc(33.33% - 8px)' : 'calc(66.66% - 8px)',
                transitionDelay: `${700 + i * 200}ms`,
              }}
            >
              <div className="w-7 h-7 rounded-full bg-card border-2 border-border/60 flex items-center justify-center shadow-sm">
                <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
              </div>
            </div>
          ))}

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-background p-6 sm:p-7 text-center space-y-5 transition-all duration-300 hover:shadow-xl ${step.accentBorder} ${step.accentShadow} hover:-translate-y-1`}>
                {/* Gradient background on hover */}
                <div className={`absolute inset-0 bg-gradient-to-b ${step.accent} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />

                {/* Icon with number badge */}
                <div className="relative inline-block">
                  <div className={`w-[4.5rem] h-[4.5rem] rounded-2xl bg-muted/50 border-2 border-border/40 flex items-center justify-center mx-auto shadow-sm group-hover:shadow-lg group-hover:scale-105 transition-all duration-300`}>
                    <step.icon className={`h-7 w-7 ${step.iconAccent} group-hover:scale-110 transition-transform duration-300`} />
                  </div>
                  <span className={`absolute -top-2 -right-2 w-7 h-7 rounded-full ${step.badgeAccent} text-white text-xs font-bold flex items-center justify-center shadow-md`}>
                    {step.number}
                  </span>
                </div>

                {/* Text content */}
                <div className="relative space-y-2">
                  <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto">{step.description}</p>
                </div>

                {/* Detail chips */}
                <div className="relative">
                  <div className="flex flex-wrap justify-center gap-1.5">
                    {step.detail.split(' · ').map((chip) => (
                      <span
                        key={chip}
                        className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/80 bg-muted/60 px-2.5 py-1 rounded-full border border-border/40"
                      >
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Soft gradient divider — bottom */}
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-border to-transparent" />
    </section>
  )
}
