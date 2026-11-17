import { HeroPhone } from "@/components/hero-phone"

const stats = [
  { title: "Under a minute", sub: "To report" },
  { title: "UK-wide", sub: "Report anywhere" },
  { title: "Rewards", sub: "Set by owners" },
]

// Each point is backed elsewhere on the page (Safety section, founder quote); keep it that way.
// Order matters: the two shorter points share a line on phones.
const trust = ["UK-wide", "Started by a driver whose car was stolen", "Independent, not affiliated with any police force"]

export function HeroSection() {
  return (
    <section className="overflow-hidden px-4 pt-16 pb-20 text-center sm:pt-24 sm:pb-28">
      <div className="mx-auto max-w-4xl">
        <p className="text-lg font-semibold text-muted-foreground sm:text-xl">Coming soon to iPhone and Android</p>
        <h1 className="mt-3 text-5xl font-semibold leading-[1.05] tracking-[-0.03em] text-foreground text-balance sm:text-7xl">
          Stolen vehicle? Your community can help find it.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl">
          Report it in under a minute, alert people nearby, and see sightings on a map you can share with the police.
        </p>

        <a
          href="#how-it-works"
          className="mt-10 inline-flex h-12 items-center rounded-full bg-primary px-7 text-base font-medium text-primary-foreground transition-opacity hover:opacity-85"
        >
          See how it works
        </a>

        <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground">
          {trust.map((t, i) => (
            <span key={t}>
              <span className="whitespace-nowrap">{i < trust.length - 1 ? `${t} ·` : t}</span>{" "}
            </span>
          ))}
        </p>
      </div>

      <div className="mt-12 sm:mt-14">
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
