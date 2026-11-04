import { ChevronDown, Clock, MapPin, PoundSterling } from "lucide-react"
import { StoreBadges } from "@/components/store-badges"
import { HeroPhone } from "@/components/hero-phone"

const stats = [
  { icon: Clock, title: "Under a minute", sub: "To report" },
  { icon: MapPin, title: "UK-wide", sub: "Report anywhere" },
  { icon: PoundSterling, title: "Rewards", sub: "Set by owners" },
]

export function HeroSection() {
  return (
    <section className="relative overflow-hidden px-4 pt-16 pb-24 lg:pt-20 lg:pb-28">
      {/* Soft light behind the phone */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 700px 520px at 72% 45%, rgb(255 255 255 / 0.07), transparent)" }}
      />

      <div className="relative mx-auto grid w-full max-w-6xl grid-cols-1 items-center gap-14 lg:grid-cols-[1.15fr_1fr]">
        <div className="space-y-8">
          <div className="space-y-5">
            <h1 className="text-4xl font-extrabold leading-[1.05] tracking-tight text-foreground sm:text-5xl xl:text-6xl">
              Stolen vehicle? Your community can help find it.
            </h1>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
              Report it in under a minute, alert people nearby, and see sightings on a map you can share with the police.
            </p>
          </div>

          <StoreBadges />

          <ul className="flex max-w-lg flex-wrap gap-x-8 gap-y-4 border-t border-border pt-6">
            {stats.map(({ icon: Icon, title, sub }) => (
              <li key={title} className="flex items-center gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-muted">
                  <Icon className="h-5 w-5 text-foreground" aria-hidden="true" />
                </span>
                <span className="leading-tight">
                  <span className="block text-sm font-semibold text-foreground">{title}</span>
                  <span className="block text-xs text-muted-foreground">{sub}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>

        <HeroPhone />
      </div>

      <a
        href="#how-it-works"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1.5 text-muted-foreground transition-colors hover:text-foreground sm:flex"
      >
        <span className="text-xs uppercase tracking-widest">How it works</span>
        <ChevronDown className="h-4 w-4 animate-bounce-subtle" aria-hidden="true" />
      </a>
    </section>
  )
}
