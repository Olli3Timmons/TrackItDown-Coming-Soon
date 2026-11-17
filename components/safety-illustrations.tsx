"use client"

import { useRef } from "react"
import { m, useInView } from "framer-motion"
import { EyeOff, Phone } from "lucide-react"

// Small looping illustrations for the Safety tiles. Decorative: the tile text says it all.

export function CallArt() {
  return (
    <div aria-hidden="true" className="relative flex items-center justify-center">
      {[0, 1].map((i) => (
        <span key={i} className="hero-ping absolute h-16 w-36 rounded-full border border-white/40" style={{ animationDelay: `${i * 0.9}s` }} />
      ))}
      <span className="relative flex items-center gap-2 rounded-full bg-white px-6 py-3 text-lg font-semibold text-[#1d1d1f]">
        <Phone className="h-5 w-5 text-[#34c759]" />
        Call 999
      </span>
    </div>
  )
}

export function RadarArt() {
  return (
    <div aria-hidden="true" className="relative aspect-square w-40">
      <span className="absolute inset-0 rounded-full border border-foreground/10" />
      <span className="absolute inset-[18%] rounded-full border border-foreground/10" />
      <span className="absolute inset-[36%] rounded-full border border-foreground/10" />
      <span
        className="radar-sweep absolute inset-0 rounded-full"
        style={{ background: "conic-gradient(from 0deg, rgb(0 113 227 / 0.35), transparent 25%)" }}
      />
      {/* You, watching from a distance; the sighting further out */}
      <span className="absolute left-1/2 top-1/2 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0071e3] ring-4 ring-[#0071e3]/20" />
      <span className="absolute left-[72%] top-[24%] h-3 w-3 rounded-full bg-[#ff9f0a] ring-4 ring-[#ff9f0a]/25" />
    </div>
  )
}

export function AnonymousArt() {
  const ref = useRef<HTMLDivElement>(null)
  const on = useInView(ref, { once: true, amount: 0.6 })
  return (
    <div ref={ref} aria-hidden="true" className="flex items-center gap-4 rounded-2xl bg-white/15 px-5 py-4 text-white">
      <EyeOff className="h-5 w-5" />
      <span className="font-medium">Anonymous mode</span>
      <span className={`relative h-8 w-14 rounded-full transition-colors delay-300 duration-500 ${on ? "bg-[#34c759]" : "bg-white/30"}`}>
        <m.span
          className="absolute left-1 top-1 h-6 w-6 rounded-full bg-white shadow"
          animate={{ x: on ? 24 : 0 }}
          transition={{ type: "spring", stiffness: 500, damping: 30, delay: 0.3 }}
        />
      </span>
    </div>
  )
}
