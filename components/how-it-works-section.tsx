"use client"

import { FileText, Eye, CheckCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Report your vehicle",
    description: "Submit a detailed report with photos and last known location in under 60 seconds."
  },
  {
    number: "02",
    icon: Eye,
    title: "Community gets alerted",
    description: "Nearby members receive instant alerts and can safely report sightings with photos."
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Track & recover",
    description: "Real-time sightings feed into a live map. Work with police to recover your vehicle."
  }
]

export function HowItWorksSection() {
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
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-24 px-4 bg-card border-y border-border/50 scroll-mt-20">
      <div className="max-w-5xl mx-auto">
        <div className={`text-center mb-16 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground tracking-tight">
            How TrackItDown works
          </h2>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Three simple steps to maximise your vehicle recovery chances.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-4 relative">
          {/* Connecting line — desktop only */}
          <div className={`hidden md:block absolute top-[3.25rem] left-[calc(16.67%+20px)] right-[calc(16.67%+20px)] h-[2px] transition-all duration-1000 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transitionDelay: '400ms', transformOrigin: 'left' }}>
            <div className="h-full w-full bg-gradient-to-r from-primary/40 via-primary/20 to-primary/40 rounded-full" />
          </div>

          {steps.map((step, index) => (
            <div
              key={step.number}
              className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="text-center space-y-4 group">
                <div className="relative inline-block">
                  <div className="w-[4.25rem] h-[4.25rem] rounded-2xl bg-background border-2 border-border/60 flex items-center justify-center mx-auto shadow-sm group-hover:shadow-lg group-hover:border-primary/30 group-hover:bg-primary/[0.03] transition-all duration-300">
                    <step.icon className="h-7 w-7 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shadow-md shadow-primary/20">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed text-sm max-w-xs mx-auto">{step.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
