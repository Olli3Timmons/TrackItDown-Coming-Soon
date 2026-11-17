"use client"

import Link from "next/link"
import Image from "next/image"
import { useState, useEffect } from "react"

export function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [overDark, setOverDark] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
      // Switch to dark glass while the bar sits over a dark section
      setOverDark(!!document.elementFromPoint(innerWidth / 2, 56)?.closest(".band-dark"))
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Translucent "glass" bar: the only glass on the page
  return (
    <header
      role="banner"
      className={`sticky top-0 z-50 w-full border-b px-4 backdrop-blur-xl backdrop-saturate-150 transition-colors duration-300 ${
        overDark ? "band-dark " : ""
      }${scrolled ? "border-border/70 bg-background/70" : "border-transparent bg-background/0"}`}
    >
      <div className="mx-auto flex h-12 w-full max-w-5xl items-center justify-between">
        <Link href="/" aria-label="TrackItDown home" className="flex items-center gap-2 text-foreground">
          {/* The mark is white, so it sits on a dark app-icon tile */}
          <span className="flex h-7 w-7 items-center justify-center rounded-[22%] bg-[#1d1d1f]">
            <Image src="/images/logo-mark.svg" alt="" width={18} height={18} />
          </span>
          <span className="text-[15px] font-semibold tracking-tight">TrackItDown</span>
        </Link>

        <Link
          href="/#download"
          tabIndex={scrolled ? 0 : -1}
          aria-hidden={!scrolled}
          className={`relative inline-flex items-center rounded-full bg-primary px-3.5 py-1 text-xs font-medium text-primary-foreground transition-opacity duration-300 before:absolute before:-inset-x-1 before:-inset-y-2.5 before:content-[''] hover:opacity-85 ${
            scrolled ? "opacity-100" : "pointer-events-none opacity-0"
          }`}
        >
          Coming soon
        </Link>
      </div>
    </header>
  )
}
