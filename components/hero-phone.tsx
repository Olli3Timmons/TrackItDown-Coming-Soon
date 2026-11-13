"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Pause, Play } from "lucide-react"
import { PhoneFrame } from "@/components/phone-frame"

// The app's story in three screens, looping. Swap the files when the demo screenshots arrive.
const frames = [
  { src: "/images/app/step-1.webp", label: "Vehicle reported", ms: 1800 },
  { src: "/images/app/step-2.webp", label: "Nearby members alerted", ms: 1800 },
  { src: "/images/app/hero.webp", label: "Sightings come in", ms: 3200 },
]

export function HeroPhone() {
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(true)
  const [reducedMotion, setReducedMotion] = useState(false)

  // Reduced motion: show the final screen, still
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setReducedMotion(true)
      setPlaying(false)
      setFrame(frames.length - 1)
    }
  }, [])

  // Advance the story; loops back to the start
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setFrame((f) => (f + 1) % frames.length), frames[frame].ms)
    return () => clearTimeout(t)
  }, [playing, frame])

  return (
    <div className="relative mx-auto w-[280px] sm:w-[340px]">
      {/* Radar rings: the alert spreading to people nearby */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex aspect-[600/1172] items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="hero-ping absolute aspect-square w-full rounded-full border border-foreground/15"
            style={{ animationDelay: `${i * 0.6}s`, animationPlayState: playing ? "running" : "paused" }}
          />
        ))}
      </div>

      <PhoneFrame alt="TrackItDown app: reporting a stolen vehicle, alerting nearby members, and sightings coming in">
        {frames.map((f, i) => (
          <Image
            key={f.src}
            src={f.src}
            alt=""
            fill
            priority={i === 0}
            sizes="(min-width: 640px) 340px, 280px"
            className={`object-cover object-top transition-opacity duration-700 ${i === frame ? "opacity-100" : "opacity-0"}`}
          />
        ))}
      </PhoneFrame>

      {/* Step caption, progress and pause control (WCAG 2.2.2: looping motion must be pausable) */}
      <div className="mt-6 flex flex-col items-center gap-3">
        <p aria-hidden="true" className="text-sm font-medium text-foreground">{frames[frame].label}</p>
        <div className="flex items-center gap-3">
          <div aria-hidden="true" className="flex gap-1.5">
            {frames.map((f, i) => (
              <span key={f.src} className={`h-1 rounded-full transition-all duration-500 ${i <= frame ? "w-6 bg-foreground" : "w-3 bg-muted"}`} />
            ))}
          </div>
          {!reducedMotion && (
            <button
              type="button"
              onClick={() => setPlaying((p) => !p)}
              aria-label={playing ? "Pause animation" : "Play animation"}
              className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground"
            >
              {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
