import { StoreBadges } from "@/components/store-badges"
import { HeroPhone } from "@/components/hero-phone"

const stats = [
  { title: "Under a minute", sub: "To report" },
  { title: "UK-wide", sub: "Report anywhere" },
  { title: "Rewards", sub: "Set by owners" },
]

export function HeroSection() {
  return (
    <section className="overflow-hidden px-4 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-lg font-semibold text-muted-foreground sm:text-xl">TrackItDown</p>
        <h1 className="mt-3 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground text-balance sm:text-7xl">
          Stolen vehicle? Your community can help find it.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
          Report it in under a minute, alert people nearby, and see sightings on a map you can share with the police.
        </p>

        <StoreBadges className="mt-10 justify-center" />

        <a href="#how-it-works" className="mt-6 inline-block text-lg text-link hover:underline">
          See how it works <span aria-hidden="true">›</span>
        </a>
      </div>

      <div className="mt-16 sm:mt-20">
        <HeroPhone />
      </div>

      <ul className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6">
        {stats.map(({ title, sub }) => (
          <li key={title}>
            <span className="block text-lg font-semibold text-foreground sm:text-2xl">{title}</span>
            <span className="mt-1 block text-sm text-muted-foreground">{sub}</span>
          </li>
        ))}
      </ul>
    </section>
  )
}
