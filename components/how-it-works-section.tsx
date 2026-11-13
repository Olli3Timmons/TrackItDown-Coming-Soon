"use client"

import { useEffect, useRef, useState } from "react"
import Image from "next/image"
import { PhoneFrame } from "@/components/phone-frame"

const steps = [
  {
    title: "Report your vehicle",
    description: "Submit a detailed report with photos and last known location in under 60 seconds, and offer a reward if you choose.",
    image: "/images/app/step-1.webp",
    alt: "Reporting a stolen vehicle in the TrackItDown app",
  },
  {
    title: "Community gets alerted",
    description: "Nearby members receive instant alerts and can safely report sightings, anonymously if they choose.",
    image: "/images/app/step-2.webp",
    alt: "Stolen vehicles reported near you in the TrackItDown app",
  },
  {
    title: "Track & recover",
    description: "Sightings appear on a live map. Share them with the police to help them recover it.",
    image: "/images/app/step-3.webp",
    alt: "Sighting updates in the TrackItDown app",
  },
]

export function HowItWorksSection() {
  // Pinned scroll story on md+ screens with motion allowed; otherwise (and on the server) a plain stacked list
  const [pinned, setPinned] = useState(false)
  const [step, setStep] = useState(0)
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const mq = matchMedia("(min-width: 768px) and (prefers-reduced-motion: no-preference)")
    const update = () => setPinned(mq.matches)
    update()
    mq.addEventListener("change", update)
    return () => mq.removeEventListener("change", update)
  }, [])

  // shortcut: snaps between steps (floor of scroll progress); swap for damped interpolation if it feels steppy
  useEffect(() => {
    if (!pinned) return
    let raf = 0
    const onScroll = () => {
      cancelAnimationFrame(raf)
      raf = requestAnimationFrame(() => {
        const el = trackRef.current
        if (!el) return
        const r = el.getBoundingClientRect()
        const progress = -r.top / (r.height - innerHeight)
        setStep(Math.min(steps.length - 1, Math.max(0, Math.floor(progress * steps.length))))
      })
    }
    onScroll()
    addEventListener("scroll", onScroll, { passive: true })
    return () => {
      removeEventListener("scroll", onScroll)
      cancelAnimationFrame(raf)
    }
  }, [pinned])

  return (
    <section id="how-it-works" className="band-dark scroll-mt-12 px-4">
      <div className="mx-auto max-w-5xl pt-24 text-center sm:pt-32">
        <h2 className="text-4xl font-semibold tracking-[-0.02em] text-balance sm:text-6xl">How TrackItDown works.</h2>
        <p className="mx-auto mt-4 max-w-xl text-lg text-muted-foreground sm:text-xl">From stolen to spotted, in three steps.</p>
      </div>

      {pinned ? (
        <div ref={trackRef} className="relative h-[300vh]">
          <div className="sticky top-0 mx-auto grid h-screen max-w-5xl grid-cols-2 items-center gap-12 pt-12">
            <ol className="space-y-10">
              {steps.map((s, i) => (
                <li
                  key={s.title}
                  aria-current={i === step ? "step" : undefined}
                  className={`transition-opacity duration-500 ${i === step ? "opacity-100" : "opacity-30"}`}
                >
                  <span className="text-sm font-semibold text-muted-foreground">Step {i + 1}</span>
                  <h3 className="mt-1 text-2xl font-semibold tracking-tight lg:text-3xl">{s.title}</h3>
                  <p className="mt-2 max-w-sm text-lg leading-relaxed text-muted-foreground">{s.description}</p>
                </li>
              ))}
            </ol>

            <PhoneFrame alt={steps[step].alt} className="mx-auto h-[min(72vh,660px)] w-auto">
              {steps.map((s, i) => (
                <Image
                  key={s.image}
                  src={s.image}
                  alt=""
                  fill
                  sizes="340px"
                  className={`object-cover object-top transition-opacity duration-500 ${i === step ? "opacity-100" : "opacity-0"}`}
                />
              ))}
            </PhoneFrame>
          </div>
        </div>
      ) : (
        <ol className="mx-auto grid max-w-5xl gap-16 py-20 md:grid-cols-3 md:gap-10">
          {steps.map((s, i) => (
            <li key={s.title} className="flex flex-col items-center text-center">
              <PhoneFrame src={s.image} alt={s.alt} className="w-[240px]" />
              <span className="mt-8 text-sm font-semibold text-muted-foreground">Step {i + 1}</span>
              <h3 className="mt-1 text-xl font-semibold tracking-tight">{s.title}</h3>
              <p className="mt-2 max-w-xs leading-relaxed text-muted-foreground">{s.description}</p>
            </li>
          ))}
        </ol>
      )}
    </section>
  )
}
