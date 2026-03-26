"use client"

import { ShieldCheck, Phone, AlertTriangle, Lock } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const safetyPoints = [
  {
    icon: Phone,
    title: "Always report to police first",
    description: "TrackItDown supplements official channels, never replaces them"
  },
  {
    icon: AlertTriangle,
    title: "Never approach a stolen vehicle",
    description: "Your safety is paramount—observe and report from a safe distance"
  },
  {
    icon: Lock,
    title: "Share information safely",
    description: "Our platform protects your identity while enabling effective reporting"
  }
]

export function SafetySection() {
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
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <div className={`bg-card rounded-2xl border border-border p-8 sm:p-12 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
              <ShieldCheck className="h-6 w-6 text-primary" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-semibold text-foreground">Safety First</h2>
          </div>
          
          <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
            TrackItDown is built with safety at its core. We encourage responsible reporting and always prioritise personal safety over vehicle recovery.
          </p>
          
          <div className="grid sm:grid-cols-3 gap-6">
            {safetyPoints.map((point, index) => (
              <div 
                key={point.title} 
                className={`space-y-3 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}
                style={{ transitionDelay: `${300 + index * 100}ms` }}
              >
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center hover:bg-primary/10 transition-colors duration-300">
                  <point.icon className="h-5 w-5 text-foreground" />
                </div>
                <h3 className="font-semibold text-foreground">{point.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
