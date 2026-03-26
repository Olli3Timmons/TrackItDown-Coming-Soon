"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { ArrowRight, MapPin, ChevronDown, Eye, TrendingUp } from "lucide-react"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setIsLoading(true);
      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        if (res.ok) {
          setIsSubmitted(true);
          setEmail("");
        } else {
          // Optionally handle error
        }
      } catch (err) {
        // Optionally handle error
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center px-4 py-20 bg-gradient-to-br from-slate-50 via-white to-slate-100">
      <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_20%_20%,rgba(47,130,255,0.12),transparent_40%),radial-gradient(circle_at_80%_80%,rgba(34,197,94,0.08),transparent_45%)]" />
      <div className="relative max-w-6xl mx-auto w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="space-y-6">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight text-foreground animate-fade-in-up motion-safe:animate-none opacity-0 animation-delay-140">
              Find stolen vehicles faster with local alert networks
            </h1>

            <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-lg animate-fade-in-up motion-safe:animate-none opacity-0 animation-delay-200">
              Report a stolen car, broadcast to nearby drivers, and share verified sightings in one secure platform built for UK communities and police coordination.
            </p>

            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-lg animate-fade-in-up motion-safe:animate-none opacity-0 animation-delay-260"
              aria-label="Waitlist signup"
            >
              {!isSubmitted ? (
                <>
                  <Input
                    type="email"
                    placeholder="Johndoe@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="h-12 w-full rounded-lg border border-border bg-white px-4 text-foreground placeholder:text-muted-foreground focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/30"
                    required
                    aria-label="Email address"
                  />
                  <Button
                    type="submit"
                    size="lg"
                    className="h-12 whitespace-nowrap rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
                    aria-live="polite"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <>
                        <Spinner className="mr-2" />
                        Loading...
                      </>
                    ) : (
                      <>
                        Join Waitlist
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </>
              ) : (
                <div className="flex items-center gap-2 rounded-lg bg-green-50 px-4 py-3 text-green-800 ring-1 ring-green-200" role="status" aria-live="polite">
                  <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                      clipRule="evenodd"
                    />
                  </svg>
                  <span className="font-medium">You're on the list! We'll be in touch soon.</span>
                </div>
              )}
            </form>

            <div className="grid grid-cols-3 gap-3 max-w-md text-center animate-fade-in-up motion-safe:animate-none opacity-0 animation-delay-320">
              <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-border">
                <p className="text-2xl font-bold text-foreground">75%</p>
                <p className="text-xs text-muted-foreground">Average recovery rate</p>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-border">
                <p className="text-2xl font-bold text-foreground">2m</p>
                <p className="text-xs text-muted-foreground">Community alerts sent</p>
              </div>
              <div className="rounded-xl bg-white p-3 shadow-sm ring-1 ring-border">
                <p className="text-2xl font-bold text-foreground">1,250</p>
                <p className="text-xs text-muted-foreground">Early members</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="relative bg-white rounded-[2rem] overflow-hidden animate-fade-in-right animation-delay-320">
              <img
                src="/images/map-preview.jpg"
                alt="Map showing vehicle sighting location"
                className="h-72 w-full object-cover rounded-[2rem]"
              />
            </div>

            <div
              className="absolute -left-6 -top-6 w-56 rounded-2xl bg-white p-4 shadow-lg floating-card border border-slate-200 animate-fade-in-up opacity-0 animation-delay-500"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-3 mb-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-blue-100 flex items-center justify-center">
                  <Eye className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-xs text-foreground">Live Sighting</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Birmingham • 2 min ago</p>
                </div>
              </div>
              <div className="flex justify-end">
                <div className="inline-flex items-center gap-1 px-2 py-1 rounded-full bg-blue-100/50 text-blue-600 text-xs font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></span>
                  Live now
                </div>
              </div>
            </div>

            <div
              className="absolute -right-6 -bottom-6 w-56 rounded-2xl bg-white p-4 shadow-lg floating-card floating-card-delay border border-slate-200 animate-fade-in-up opacity-0 animation-delay-700"
              style={{ transformStyle: 'preserve-3d' }}
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-green-100 flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-green-600" />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-xs text-foreground">Active Reports</p>
                  <p className="text-xs text-muted-foreground mt-0.5">Last 24 hours</p>
                  <div className="mt-3 space-y-1.5 text-xs">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Stolen:</span>
                      <span className="font-bold text-foreground">47</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Sightings:</span>
                      <span className="font-bold text-foreground">156</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={() => {
          document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-2 lg:bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-0.5 lg:gap-2 text-muted-foreground hover:text-foreground transition-colors animate-fade-in opacity-0 animation-delay-500 cursor-pointer"
      >
        <span className="text-xs tracking-wide">Learn more</span>
        <ChevronDown className="h-5 w-5 animate-bounce-subtle" />
      </button>
    </section>
  )
}
