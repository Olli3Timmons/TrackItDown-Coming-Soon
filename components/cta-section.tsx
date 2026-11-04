"use client"

import { useState, useEffect, useRef } from "react"
import { StoreBadges } from "@/components/store-badges"

export function CtaSection() {
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
    <section id="download" ref={sectionRef} className="relative py-24 px-4 overflow-hidden scroll-mt-16 border-t border-border">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="space-y-8">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            TrackItDown is coming
            <br />
            <span className="text-neutral-300">to iPhone and Android.</span>
          </h2>
          <p className={`text-lg text-neutral-400 max-w-xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            Report a stolen vehicle in under a minute and let people nearby help you find it. Coming soon to the App Store and Google Play.
          </p>

          <div className={`transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            <StoreBadges className="justify-center" />
          </div>
        </div>
      </div>
    </section>
  )
}
