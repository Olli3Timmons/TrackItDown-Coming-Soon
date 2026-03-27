"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { ArrowRight, ChevronDown, Clock, MapPin, Shield } from "lucide-react"

export function HeroSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    if (email) {
      setIsLoading(true);
      try {
        const res = await fetch('/api/waitlist', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email })
        });
        const data = await res.json();
        if (res.ok && data.success) {
          setIsSubmitted(true);
          setEmail("");
        } else {
          setError(data.error || "Something went wrong. Please try again.");
        }
      } catch {
        setError("Could not connect. Please check your internet and try again.");
      } finally {
        setIsLoading(false);
      }
    }
  }

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center px-4 py-24 overflow-hidden">
      {/* Background gradients — using CSS gradients instead of blur for mobile compatibility */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: [
            'linear-gradient(135deg, oklch(0.50 0.20 255 / 0.04), transparent, oklch(0.50 0.20 255 / 0.02))',
            'radial-gradient(ellipse 800px 600px at 50% 0%, oklch(0.50 0.20 255 / 0.06), transparent)',
            'radial-gradient(ellipse 400px 400px at 100% 100%, oklch(0.50 0.20 255 / 0.04), transparent)',
          ].join(', '),
        }}
      />

      <div className="relative max-w-3xl mx-auto w-full text-center">
        <div className="space-y-8">
          {/* Pill badge */}
          <div className="animate-fade-in-up animation-delay-100">
            <div className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/[0.06] px-4 py-1.5 text-sm font-medium text-primary">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              Coming soon — Join the waitlist
            </div>
          </div>

          {/* Headline */}
          <h1 className="text-4xl sm:text-5xl lg:text-[3.5rem] font-bold leading-[1.1] tracking-tight text-foreground animate-fade-in-up animation-delay-200">
            Your community is the UK's fastest stolen vehicle recovery network
          </h1>

          {/* Sub-headline */}
          <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto animate-fade-in-up animation-delay-300">
            Report your stolen vehicle in 60 seconds. Thousands of local eyes help track it down — safely, and in coordination with police.
          </p>

          {/* Email form */}
          <form
            onSubmit={handleSubmit}
            className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto animate-fade-in-up animation-delay-400"
            aria-label="Waitlist signup"
          >
            {!isSubmitted ? (
              <>
                <Input
                  id="hero-email"
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 w-full rounded-xl border-2 border-border bg-white px-5 text-base text-foreground placeholder:text-muted-foreground/60 transition-all duration-200 focus-visible:border-primary focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-primary/15 focus-visible:shadow-lg focus-visible:shadow-primary/5"
                  required
                  aria-label="Email address"
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 whitespace-nowrap rounded-xl bg-primary px-8 text-base font-semibold text-primary-foreground shadow-lg shadow-primary/25 transition-all duration-200 hover:shadow-xl hover:shadow-primary/30 hover:-translate-y-0.5 hover:bg-primary/90 animate-pulse-ring"
                  aria-live="polite"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Spinner className="mr-2" />
                      Joining...
                    </>
                  ) : (
                    <>
                      Join the Waitlist
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-3 rounded-xl bg-emerald-50 px-5 py-4 text-emerald-800 ring-1 ring-emerald-200 w-full justify-center" role="status" aria-live="polite">
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="font-medium">You&apos;re on the list! We&apos;ll be in touch soon.</span>
              </div>
            )}
          </form>

          {/* Error message */}
          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 text-red-700 ring-1 ring-red-200 max-w-lg mx-auto animate-fade-in-up" role="alert">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {/* Privacy text */}
          <p className="text-sm text-muted-foreground/80 animate-fade-in-up animation-delay-500">
            🔒 No spam, ever. Unsubscribe anytime. Your data stays in the UK.
          </p>

          {/* Value props — replacing fabricated stats */}
          <div className="grid grid-cols-3 gap-4 max-w-md mx-auto animate-fade-in-up animation-delay-500">
            <div className="flex flex-col items-center gap-1.5 rounded-xl bg-card/80 p-4 ring-1 ring-border/60">
              <Clock className="h-5 w-5 text-primary mb-0.5" />
              <p className="text-sm font-semibold text-foreground">60 Seconds</p>
              <p className="text-xs text-muted-foreground leading-tight">To submit a report</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl bg-card/80 p-4 ring-1 ring-border/60">
              <MapPin className="h-5 w-5 text-primary mb-0.5" />
              <p className="text-sm font-semibold text-foreground">UK-Wide</p>
              <p className="text-xs text-muted-foreground leading-tight">Community coverage</p>
            </div>
            <div className="flex flex-col items-center gap-1.5 rounded-xl bg-card/80 p-4 ring-1 ring-border/60">
              <Shield className="h-5 w-5 text-primary mb-0.5" />
              <p className="text-sm font-semibold text-foreground">Police</p>
              <p className="text-xs text-muted-foreground leading-tight">Coordinated recovery</p>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={() => {
          document.getElementById('how-it-works')?.scrollIntoView({ behavior: 'smooth' })
        }}
        className="absolute bottom-6 lg:bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-muted-foreground/60 hover:text-muted-foreground transition-colors animate-fade-in animation-delay-700 cursor-pointer"
      >
        <span className="text-xs tracking-widest uppercase">How it works</span>
        <ChevronDown className="h-4 w-4 animate-bounce-subtle" />
      </button>
    </section>
  )
}
