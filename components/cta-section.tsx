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
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(59,130,246,0.15),transparent_50%),radial-gradient(circle_at_70%_50%,rgba(99,102,241,0.1),transparent_50%)]" />

      <div className="relative max-w-2xl mx-auto text-center">
        <div className="space-y-8">
          <h2 className={`text-3xl sm:text-4xl lg:text-5xl font-bold text-white tracking-tight leading-tight transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Don&apos;t wait for launch day.
            <br />
            <span className="text-blue-300">Join the waitlist today.</span>
          </h2>
          <p className={`text-lg text-blue-100/70 max-w-xl mx-auto transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '100ms' }}>
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
                  className="h-14 px-5 bg-white/10 border-white/20 text-white placeholder:text-white/40 rounded-xl text-base focus-visible:border-blue-400 focus-visible:ring-blue-400/20"
                  required
                />
                <Button
                  type="submit"
                  size="lg"
                  className="h-14 px-8 bg-white text-slate-900 hover:bg-blue-50 font-semibold whitespace-nowrap rounded-xl shadow-lg shadow-white/10 transition-all duration-200 hover:-translate-y-0.5"
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

          <p className={`text-sm text-blue-200/50 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '300ms' }}>
            🔒 No spam, ever. Unsubscribe anytime.
          </p>

          {/* Social media links */}
          <div className={`flex items-center justify-center gap-4 pt-4 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`} style={{ transitionDelay: '400ms' }}>
            <span className="text-sm text-blue-200/40">Follow for updates:</span>
            <div className="flex gap-3">
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
                aria-label="Follow us on X (Twitter)"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
              </a>
              <a
                href="#"
                className="flex items-center justify-center w-9 h-9 rounded-lg bg-white/10 text-white/60 hover:bg-white/20 hover:text-white transition-all duration-200"
                aria-label="Follow us on Instagram"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
