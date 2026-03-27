"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"
import { ArrowRight } from "lucide-react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "border-b border-border/50 bg-background/95 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        <Link
          href="/"
          aria-label="TrackItDown home"
          className="flex items-center gap-2.5 text-foreground"
        >
          <Image
            src="/images/logo-mark.svg"
            alt="TrackItDown logo"
            width={36}
            height={36}
            className="object-contain"
          />
          <span className="text-lg font-bold tracking-tight">TrackItDown</span>
        </Link>

        <button
          onClick={() => {
            document
              .getElementById("hero-email")
              ?.focus()
            window.scrollTo({ top: 0, behavior: "smooth" })
          }}
          className={`hidden sm:inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground shadow-md shadow-primary/20 transition-all duration-300 hover:shadow-lg hover:shadow-primary/30 hover:-translate-y-0.5 ${
            scrolled ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
          }`}
        >
          Join the Waitlist
          <ArrowRight className="h-3.5 w-3.5" />
        </button>
      </div>
    </header>
  )
}
