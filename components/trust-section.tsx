"use client"

import { MapPin, Shield, Users } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const trustPoints = [
  {
    icon: MapPin,
    stat: "UK-Wide",
    label: "Coverage across communities"
  },
  {
    icon: Users,
    stat: "Community",
    label: "Powered by local watchers"
  },
  {
    icon: Shield,
    stat: "Secure",
    label: "Privacy-first design"
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
      { threshold: 0.15 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-20 px-4 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-12 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
            Built for communities across the UK
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Designed with safety, privacy, and effectiveness in mind
          </p>
        </div>
        
        <div className="grid sm:grid-cols-3 gap-8">
          {trustPoints.map((point, index) => (
            <div 
              key={point.stat} 
              className={`text-center space-y-4 transition-all duration-500 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${200 + index * 100}ms` }}
            >
              <div className="w-16 h-16 rounded-2xl bg-background border border-border flex items-center justify-center mx-auto hover:border-primary/30 hover:shadow-md transition-all duration-300 group">
                <point.icon className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{point.stat}</p>
                <p className="text-muted-foreground">{point.label}</p>
              </div>
            </div>
          ))}
        </div>


      </div>
    </section>
  )
}
