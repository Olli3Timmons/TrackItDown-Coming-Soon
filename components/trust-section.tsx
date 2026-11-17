import { Reveal } from "@/components/reveal"
import { AnonymousArt, CallArt, RadarArt } from "@/components/safety-illustrations"

// Bento tiles: a coloured panel with a small animation, then the point in words
const safetyPoints = [
  {
    title: "Always report to the police first",
    description: "TrackItDown is independent and not affiliated with any police force. If a crime is happening, call 999.",
    panel: "bg-[#1d1d1f]",
    Art: CallArt,
  },
  {
    title: "Never approach a stolen vehicle",
    description: "Rewards are for information only. Observe and report from a safe distance, and never confront anyone.",
    panel: "bg-background ring-1 ring-border",
    Art: RadarArt,
  },
  {
    title: "Report sightings anonymously",
    description: "Turn on anonymous mode in settings and owners see the sighting, not who sent it.",
    panel: "bg-[#0071e3]",
    Art: AnonymousArt,
  },
]

export function TrustSection() {
  return (
    <section className="bg-card px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <Reveal className="text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-6xl">Safety first.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            TrackItDown is built with safety at its core. We encourage responsible reporting and always prioritise personal safety over vehicle recovery.
          </p>
        </Reveal>

        <ul className="mt-16 grid gap-10 sm:grid-cols-3 sm:gap-6">
          {safetyPoints.map(({ title, description, panel, Art }, i) => (
            <li key={title}>
              <Reveal delay={i * 0.1}>
                <div className={`flex aspect-[4/3] items-center justify-center overflow-hidden rounded-3xl ${panel}`}>
                  <Art />
                </div>
                <h3 className="mt-6 text-lg font-semibold text-foreground">{title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{description}</p>
              </Reveal>
            </li>
          ))}
        </ul>

        <Reveal>
          <figure className="mx-auto mt-24 max-w-3xl text-center sm:mt-32">
            <blockquote className="text-2xl font-medium leading-snug tracking-tight text-foreground text-balance sm:text-3xl">
              &ldquo;I started TrackItDown after my own car was stolen. I know how helpless it feels — and how much faster recovery could be if communities worked together.&rdquo;
            </blockquote>
            <figcaption className="mt-6 text-muted-foreground">Oliver, Founder of TrackItDown</figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  )
}
