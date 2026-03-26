"use client"

import { AlertCircle, Bell, Camera, Map, Share2, Shield } from "lucide-react"
import { useEffect, useRef, useState } from "react"

const features = [
  {
    icon: AlertCircle,
    title: "Report Instantly",
    description: "Submit your stolen vehicle report in under 60 seconds with all the details that matter"
  },
  {
    icon: Bell,
    title: "Alert Communities",
    description: "Automatically notify nearby users who can help keep an eye out"
  },
  {
    icon: Camera,
    title: "Receive Sightings",
    description: "Get photos and notes from community members who spot your vehicle"
  },
  {
    icon: Map,
    title: "Live Map Feed",
    description: "Track all reports and sightings on an interactive real-time map"
  },
  {
    icon: Shield,
    title: "Get Local Alerts",
    description: "Stay informed about thefts in your area to help protect your community"
  },
  {
    icon: Share2,
    title: "Share Safely",
    description: "Spread awareness through secure channels without compromising safety"
  }
]

export function FeaturesSection() {
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
    <section ref={sectionRef} className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className={`text-center mb-16 space-y-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-3xl sm:text-4xl font-semibold text-foreground">
            Everything you need to recover your vehicle
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A comprehensive platform designed to maximise your chances of recovery
          </p>
        </div>
        
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div 
              key={feature.title}
              className={`group p-6 bg-card rounded-xl border border-border hover:border-primary/30 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
              style={{ transitionDelay: `${150 + index * 75}ms` }}
            >
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4 group-hover:bg-primary/20 group-hover:scale-110 transition-all duration-300">
                <feature.icon className="h-6 w-6 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{feature.title}</h3>
              <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
