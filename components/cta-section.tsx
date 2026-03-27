"use client"

import { useState, useEffect, useRef } from "react"
import { Button } from "@/components/ui/button"
import { Spinner } from "@/components/ui/spinner"
import { Input } from "@/components/ui/input"
import { ArrowRight } from "lucide-react"

export function CtaSection() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState("")
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
    <section ref={sectionRef} className="relative py-24 px-4 overflow-hidden">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(255,255,255,0.05),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(255,255,255,0.03),transparent_50%)]" />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="space-y-8">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Don&apos;t wait for launch day.
            <br />
            <span className="text-neutral-300">Join the waitlist today.</span>
          </h2>
          <p className={`text-lg text-neutral-400 max-w-xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
            Join UK residents preparing to protect their communities. Get exclusive updates and be the first to use TrackItDown when we launch.
          </p>

          <form onSubmit={handleSubmit} className={`flex flex-col sm:flex-row gap-3 max-w-md mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '200ms' }}>
            {!isSubmitted ? (
              <>
                <Input
                  type="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-14 px-5 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl text-base focus-visible:border-neutral-400 focus-visible:ring-neutral-400/20"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 px-8 bg-white text-neutral-900 hover:bg-neutral-100 font-semibold whitespace-nowrap rounded-xl shadow-lg shadow-white/10 transition-all duration-200 hover:-translate-y-0.5"
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
              <div className="flex items-center gap-3 px-5 py-4 bg-emerald-500/20 text-emerald-200 rounded-xl border border-emerald-400/30 w-full justify-center">
                <svg className="h-5 w-5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="font-medium">You&apos;re on the list! We&apos;ll be in touch soon.</span>
              </div>
            )}
          </form>

          {error && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-3 text-red-200 ring-1 ring-red-400/30 max-w-md mx-auto animate-fade-in-up" role="alert">
              <svg className="h-4 w-4 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          <p className={`text-sm text-neutral-500 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
            🔒 No spam, ever. Unsubscribe anytime.
          </p>


        </div>
      </div>
    </section>
  )
}
