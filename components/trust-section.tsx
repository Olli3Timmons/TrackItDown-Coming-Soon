"use client"

import { ShieldCheck, Lock, Phone, AlertTriangle, Globe } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const credibilityBadges = [
  { icon: Lock, label: "GDPR Compliant" },
  { icon: ShieldCheck, label: "UK-Based Servers" },
  { icon: Phone, label: "Police Coordinated" },
  { icon: Globe, label: "UK-Wide Coverage" },
]

const safetyPoints = [
  {
    icon: Phone,
    title: "Always report to police first",
    description: "TrackItDown supplements official channels — it never replaces them."
  },
  {
    icon: AlertTriangle,
    title: "Never approach a stolen vehicle",
    description: "Your safety is paramount. Observe and report from a safe distance."
  },
  {
    icon: Lock,
    title: "Your identity is protected",
    description: "Privacy-first design ensures secure, anonymous reporting."
  }
]

export function TrustSection() {
  const [isVisible, setIsVisible] = useState(false)
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

  return (
    <section ref={sectionRef} className="py-24 px-4">
      <div className="max-w-5xl mx-auto space-y-16">
        {/* Credibility badges strip */}
        <div className={`flex flex-wrap justify-center gap-3 sm:gap-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          {credibilityBadges.map((badge) => (
            <div
              key={badge.label}
              className="flex items-center gap-2 rounded-full border border-border/60 bg-card px-4 py-2 text-sm font-medium text-foreground shadow-sm hover:shadow-md hover:border-primary/20 transition-all duration-200"
            >
              <badge.icon className="h-4 w-4 text-primary" />
              {badge.label}
            </div>
          ))}
        </div>

        {/* Safety section card */}
        <div className={`bg-card rounded-2xl border border-border/60 p-8 sm:p-10 shadow-sm transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '150ms' }}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-5.5 w-5.5 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-foreground tracking-tight">Safety First</h2>
          </div>

          <p className="text-muted-foreground mb-8 leading-relaxed max-w-2xl">
            TrackItDown is built with safety at its core. We encourage responsible reporting and always prioritise personal safety over vehicle recovery.
          </p>

          <div className="grid sm:grid-cols-3 gap-6">
            {safetyPoints.map((point, index) => (
              <div
                key={point.title}
                className={`space-y-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${350 + index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <point.icon className="h-5 w-5 text-foreground/70" />
                </div>
                <h3 className="font-semibold text-foreground">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Founder quote — styled with left accent border */}
        <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '500ms' }}>
          <div className="max-w-2xl mx-auto border-l-4 border-primary/30 pl-6 sm:pl-8 py-2">
            <blockquote className="text-lg text-muted-foreground leading-relaxed">
              &ldquo;I started TrackItDown after my own car was stolen. I know how helpless it feels — and how much faster recovery could be if communities worked together.&rdquo;
            </blockquote>
            <p className="mt-4 text-sm font-semibold text-foreground">
              — Oliver, Founder of TrackItDown
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
