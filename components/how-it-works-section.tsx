import { PhoneFrame } from "@/components/phone-frame"

const steps = [
  {
    title: "Report your vehicle",
    description: "Submit a detailed report with photos and last known location in under 60 seconds, and offer a reward if you choose.",
    image: "/images/app/step-1.webp",
    alt: "Reporting a stolen vehicle in the TrackItDown app",
  },
  {
    title: "Community gets alerted",
    description: "Nearby members receive instant alerts and can safely report sightings, anonymously if they choose.",
    image: "/images/app/step-2.webp",
    alt: "Stolen vehicles reported near you in the TrackItDown app",
  },
  {
    title: "Track & recover",
    description: "Sightings appear on a live map. Share them with the police to help them recover it.",
    image: "/images/app/step-3.webp",
    alt: "Sighting updates in the TrackItDown app",
  },
]

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="scroll-mt-20 border-t border-border bg-card px-4 py-24">
      <div className="mx-auto max-w-6xl">
        <div className="mb-16 space-y-4 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">How TrackItDown works</h2>
          <p className="mx-auto max-w-xl text-lg text-muted-foreground">From stolen to spotted, in three steps.</p>
        </div>

        <ol className="grid gap-16 md:grid-cols-3 md:gap-10">
          {steps.map((step, i) => (
            <li key={step.title} className="flex flex-col items-center text-center">
              <PhoneFrame src={step.image} alt={step.alt} className="w-[220px] lg:w-[240px]" />
              <span className="mt-8 flex h-8 w-8 items-center justify-center rounded-full bg-primary text-sm font-bold text-primary-foreground">
                {i + 1}
              </span>
              <h3 className="mt-4 text-lg font-semibold text-foreground">{step.title}</h3>
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">{step.description}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
