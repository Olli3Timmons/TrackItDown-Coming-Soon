"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { AnimatePresence, m } from "framer-motion"
import { BellRing, Car, MapPin, Pause, Play } from "lucide-react"
import { PhoneFrame } from "@/components/phone-frame"

// The app's story in three screens, looping. Swap the files when the demo screenshots arrive.
const frames = [
  { src: "/images/app/step-1.webp", label: "Vehicle reported", ms: 1800 },
  { src: "/images/app/step-2.webp", label: "Nearby members alerted", ms: 1800 },
  { src: "/images/app/hero.webp", label: "Sightings come in", ms: 3200 },
]

// App-style alerts that pile up beside the phone as the story plays. Generic wording on purpose:
// no numbers, places or makes, so nothing reads as real activity.
const alerts = [
  { title: "Vehicle reported", sub: "Shared with members nearby", Icon: Car, tone: "bg-[#ff3b30]", pos: "top-[20%] -left-[12%] sm:-left-[34%]" },
  { title: "Members alerted", sub: "People nearby are looking", Icon: BellRing, tone: "bg-[#0071e3]", pos: "top-[46%] -right-[12%] sm:-right-[34%]" },
  { title: "New sighting", sub: "Pinned on your map", Icon: MapPin, tone: "bg-[#ff9f0a]", pos: "top-[72%] -left-[8%] sm:-left-[28%]" },
]

export function HeroPhone() {
  const [frame, setFrame] = useState(0)
  const [playing, setPlaying] = useState(true)

  // Reduced motion: stay still on the first screen, which is what the server rendered, so nothing swaps
  useEffect(() => {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) setPlaying(false)
  }, [])

  // Advance the story; loops back to the start
  useEffect(() => {
    if (!playing) return
    const t = setTimeout(() => setFrame((f) => (f + 1) % frames.length), frames[frame].ms)
    return () => clearTimeout(t)
  }, [playing, frame])

  return (
    <div>
      {/* Caption, progress and pause sit above the phone so they're on screen while it plays (WCAG 2.2.2) */}
      <p aria-hidden="true" className="text-sm font-medium text-foreground">
        <span className="text-muted-foreground">App preview · </span>
        {frames[frame].label}
      </p>
      <div className="mt-1 flex items-center justify-center gap-3">
        <div aria-hidden="true" className="flex gap-1.5">
          {frames.map((f, i) => (
            <span key={f.src} className={`h-1 rounded-full transition-all duration-500 ${i <= frame ? "w-6 bg-foreground" : "w-3 bg-muted"}`} />
          ))}
        </div>
        {/* Hidden, not removed, with reduced motion so the layout doesn't shift. One control pauses story, cards and glow. */}
        <button
          type="button"
          onClick={() => setPlaying((p) => !p)}
          aria-label={playing ? "Pause animation" : "Play animation"}
          className="flex h-11 w-11 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-card hover:text-foreground motion-reduce:invisible"
        >
          {playing ? <Pause className="h-3.5 w-3.5" aria-hidden="true" /> : <Play className="h-3.5 w-3.5" aria-hidden="true" />}
        </button>
      </div>

      {/* From lg the phone is sized by window height so it fits beside the text: 14rem covers the header,
          padding and the caption row above; stops shrinking at 440px tall (shorter windows scroll) */}
      <div className="relative mx-auto mt-4 w-[280px] sm:w-[340px] lg:aspect-[600/1172] lg:h-[clamp(440px,calc(100svh_-_14rem),660px)] lg:w-auto">
        {/* Colour glow behind the phone (and the headline: -z-10 inside HeroSection's isolate) */}
        <div
          aria-hidden="true"
          className="hero-glow pointer-events-none absolute left-1/2 top-1/2 -z-10 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-50 blur-3xl"
          style={{
            background: "radial-gradient(circle at 32% 35%, #0071e3 0%, transparent 55%), radial-gradient(circle at 68% 65%, #ff9f0a 0%, transparent 55%)",
            animationPlayState: playing ? "running" : "paused",
          }}
        />

        <PhoneFrame alt="App preview: reporting a stolen vehicle, alerting nearby members, and sightings coming in">
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

        {/* initial={false}: the first card is in the server HTML as-is, so nothing pops in on load */}
        <AnimatePresence initial={false}>
          {alerts.map(
            ({ title, sub, Icon, tone, pos }, i) =>
              i <= frame && (
                <m.div
                  key={title}
                  aria-hidden="true"
                  className={`absolute z-10 ${pos}`}
                  initial={{ opacity: 0, scale: 0.9, y: 12 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ type: "spring", stiffness: 260, damping: 22 }}
                >
                  <m.div
                    className="flex w-44 items-center gap-3 rounded-2xl bg-white/90 p-3 text-left shadow-[0_12px_32px_-12px_rgb(0_0_0/0.35)] ring-1 ring-black/5 backdrop-blur sm:w-60"
                    animate={playing ? { y: [0, -6, 0] } : { y: 0 }}
                    transition={{ duration: 4, repeat: playing ? Infinity : 0, ease: "easeInOut", delay: i * 0.6 }}
                  >
                    <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-white sm:h-9 sm:w-9 ${tone}`}>
                      <Icon className="h-4 w-4" />
                    </span>
                    <span className="min-w-0">
                      <span className="block truncate text-xs font-semibold text-[#1d1d1f] sm:text-sm">{title}</span>
                      <span className="block truncate text-[11px] text-[#6e6e73] sm:text-xs">{sub}</span>
                    </span>
                  </m.div>
                </m.div>
              ),
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
