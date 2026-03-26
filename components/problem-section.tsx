"use client"

import { Clock, Users, Zap } from "lucide-react"
import { useEffect, useRef, useState } from "react"

export function ProblemSection() {
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
    <section ref={sectionRef} className="py-20 px-4 bg-card border-y border-border">
      <div className="max-w-6xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className={`space-y-6 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-balance text-foreground">
              Vehicle theft is time-sensitive. Every minute counts.
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              When your vehicle is stolen, spreading awareness quickly is crucial. Traditional methods are slow and ineffective. TrackItDown changes that.
            </p>
          </div>
          
          <div className="grid gap-6">
            <div className={`flex gap-4 p-5 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Lightning Fast</h3>
                <p className="text-muted-foreground">Alert your local community within seconds of reporting</p>
              </div>
            </div>
            
            <div className={`flex gap-4 p-5 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Community-Powered</h3>
                <p className="text-muted-foreground">Thousands of eyes watching, safely sharing sightings</p>
              </div>
            </div>
            
            <div className={`flex gap-4 p-5 bg-background rounded-xl border border-border hover:border-primary/30 hover:shadow-md transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-foreground mb-1">Real-Time Updates</h3>
                <p className="text-muted-foreground">Get notified instantly when your vehicle is spotted</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
