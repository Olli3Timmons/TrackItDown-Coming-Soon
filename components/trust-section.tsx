import { Lock, Phone, AlertTriangle } from "lucide-react"

const safetyPoints = [
  {
    icon: Phone,
    title: "Always report to the police first",
    description: "TrackItDown is independent and not affiliated with any police force. If a crime is happening, call 999."
  },
  {
    icon: AlertTriangle,
    title: "Never approach a stolen vehicle",
    description: "Rewards are for information only. Observe and report from a safe distance, and never confront anyone."
  },
  {
    icon: Lock,
    title: "Report sightings anonymously",
    description: "Turn on anonymous mode in settings and owners see the sighting, not who sent it."
  }
]

export function TrustSection() {
  return (
    <section className="bg-card px-4 py-24 sm:py-32">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <h2 className="text-4xl font-semibold tracking-[-0.02em] text-foreground sm:text-6xl">Safety first.</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl">
            TrackItDown is built with safety at its core. We encourage responsible reporting and always prioritise personal safety over vehicle recovery.
          </p>
        </div>

        <ul className="mt-16 grid gap-10 sm:grid-cols-3">
          {safetyPoints.map((point) => (
            <li key={point.title}>
              <point.icon className="h-6 w-6 text-foreground" aria-hidden="true" />
              <h3 className="mt-4 text-lg font-semibold text-foreground">{point.title}</h3>
              <p className="mt-2 leading-relaxed text-muted-foreground">{point.description}</p>
            </li>
          ))}
        </ul>

        <figure className="mx-auto mt-24 max-w-3xl text-center sm:mt-32">
          <blockquote className="text-2xl font-medium leading-snug tracking-tight text-foreground text-balance sm:text-3xl">
            &ldquo;I started TrackItDown after my own car was stolen. I know how helpless it feels — and how much faster recovery could be if communities worked together.&rdquo;
          </blockquote>
          <figcaption className="mt-6 text-muted-foreground">Oliver, Founder of TrackItDown</figcaption>
        </figure>
      </div>
    </section>
  )
}
