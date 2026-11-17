import { HeroPhone } from "@/components/hero-phone"
import { Reveal } from "@/components/reveal"

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
    // isolate: lets the phone's radar rings sit behind the headline (-z-10) without escaping the section
    <section className="isolate overflow-hidden px-4 pt-16 pb-20 text-center sm:pt-24 sm:pb-28 lg:pt-12">
      {/* Stacked and centred below lg; from lg, text left and phone right */}
      {/* max-w-5xl matches the header and How it works, so left edges line up */}
      <div className="mx-auto max-w-5xl lg:grid lg:grid-cols-2 lg:items-center lg:gap-12">
        <div className="mx-auto max-w-4xl lg:mx-0 lg:text-left">
          <p className="text-lg font-semibold text-muted-foreground sm:text-xl">Coming soon to iPhone and Android</p>
          <h1 className="mt-3 text-[2.625rem] font-semibold leading-[1.05] tracking-[-0.03em] text-foreground text-balance sm:text-7xl lg:text-6xl">
            Stolen vehicle? Your community can help find it.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground text-pretty sm:text-xl lg:mx-0">
            Report it in under a minute, alert people nearby, and see sightings on a map you can share with the police.
          </p>

          <a
            href="#how-it-works"
            className="mt-10 inline-flex h-12 items-center rounded-full bg-primary px-7 text-base font-medium text-primary-foreground transition-opacity hover:opacity-85"
          >
            See how it works
          </a>

          <p className="mx-auto mt-5 max-w-2xl text-sm text-muted-foreground lg:mx-0">
            {trust.map((t, i) => (
              <span key={t}>
                <span className="whitespace-nowrap">{i < trust.length - 1 ? `${t} ·` : t}</span>{" "}
              </span>
            ))}
          </p>
        </div>

        <div className="mt-12 sm:mt-14 lg:mt-0">
          <HeroPhone />
        </div>
      </div>

      {/* Below the fold at every size, so it can reveal on scroll */}
      <Reveal>
        <ul className="mx-auto mt-16 grid max-w-3xl grid-cols-3 gap-6 lg:mt-20">
          {stats.map(({ title, sub }) => (
            <li key={title}>
              <span className="block text-lg font-semibold text-foreground sm:text-2xl">{title}</span>
              <span className="mt-1 block text-sm text-muted-foreground">{sub}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  )
}
