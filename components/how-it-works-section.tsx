"use client"

import { FileText, Eye, CheckCircle } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const steps = [
  {
    number: "01",
    icon: FileText,
    title: "Report your vehicle",
    description: "Submit a detailed report with photos, registration, and last known location. It takes less than a minute."
  },
  {
    number: "02",
    icon: Eye,
    title: "Community spots & shares",
    description: "Local community members receive alerts and safely report any sightings with photos and location data."
  },
  {
    number: "03",
    icon: CheckCircle,
    title: "Increase recovery chances",
    description: "More eyes mean faster recovery. Work with police using real-time community intelligence."
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
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id="how-it-works" className="py-20 px-4 bg-card border-y border-border scroll-mt-20">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
            How TrackItDown works
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A simple three-step process designed to maximise your vehicle recovery chances
          </p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div 
              key={step.number} 
              className={`relative transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 150}ms` }}
            >
              <div className="text-center space-y-4 group">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-2xl bg-background border border-border flex items-center justify-center mx-auto shadow-sm group-hover:shadow-md group-hover:border-primary/30 transition-all duration-300">
                    <step.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-semibold flex items-center justify-center">
                    {step.number}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
              {index < steps.length - 1 && (
                <div className={`hidden md:block absolute top-10 left-[calc(50%+60px)] w-[calc(100%-120px)] h-px bg-border transition-all duration-1000 ${isVisible ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}`} style={{ transitionDelay: `${500 + index * 150}ms`, transformOrigin: 'left' }} />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
