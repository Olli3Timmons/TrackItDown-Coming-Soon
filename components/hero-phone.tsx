"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { PhoneFrame } from "@/components/phone-frame"

// The app's story in three screens; the last one stays. Swap the files when the demo screenshots arrive.
const frames = [
  { src: "/images/app/step-1.webp", label: "Vehicle reported" },
  { src: "/images/app/step-2.webp", label: "Nearby members alerted" },
  { src: "/images/app/hero.webp", label: "Sightings come in" },
]
const STEP_MS = 1500 // settles at 3s; rings stop at 4.8s — inside WCAG 2.2.2's 5s limit, so no pause control needed

export function HeroPhone() {
  const [frame, setFrame] = useState(0)
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setFrame(frames.length - 1)
      return
    }
    const timers = frames.slice(1).map((_, i) => setTimeout(() => setFrame(i + 1), STEP_MS * (i + 1)))

    // Gentle tilt towards the pointer, mouse devices only (touch screens stay still)
    const el = tiltRef.current
    const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches
    const onMove = (e: PointerEvent) => {
      const x = e.clientX / innerWidth - 0.5
      const y = e.clientY / innerHeight - 0.5
      if (el) el.style.transform = `perspective(1000px) rotateY(${x * 14}deg) rotateX(${-y * 10}deg)`
    }
    if (finePointer) addEventListener("pointermove", onMove, { passive: true })

    return () => {
      timers.forEach(clearTimeout)
      removeEventListener("pointermove", onMove)
    }
  }, [])

  return (
    <div className="relative mx-auto w-[260px] sm:w-[300px] lg:w-[320px]">
      {/* Radar rings: the alert spreading to people nearby */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 flex aspect-[600/1172] items-center justify-center">
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className="hero-ping absolute aspect-square w-full rounded-full border-2 border-white/40"
            style={{ animationDelay: `${i * 0.6}s` }}
          />
        ))}
      </div>

      <div ref={tiltRef} className="transition-transform duration-300 ease-out lg:rotate-2">
        <PhoneFrame alt="TrackItDown app: reporting a stolen vehicle, alerting nearby members, and sightings coming in">
          {frames.map((f, i) => (
            <Image
              key={f.src}
              src={f.src}
              alt=""
              fill
              priority={i === 0}
              sizes="(min-width: 1024px) 320px, 70vw"
              className={`object-cover object-top transition-opacity duration-700 ${i === frame ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </PhoneFrame>
      </div>

      {/* Step caption + progress */}
      <div aria-hidden="true" className="mt-6 flex flex-col items-center gap-3">
        <p className="text-sm font-medium text-foreground">{frames[frame].label}</p>
        <div className="flex gap-1.5">
          {frames.map((f, i) => (
            <span key={f.src} className={`h-1 rounded-full transition-all duration-500 ${i <= frame ? "w-6 bg-foreground" : "w-3 bg-muted"}`} />
          ))}
        </div>
      </div>
    </div>
  )
}
