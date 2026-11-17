import { Reveal } from "@/components/reveal"

export function CtaSection() {
  return (
    <section id="download" className="band-dark scroll-mt-12 px-4 py-24 sm:py-32">
      <Reveal className="mx-auto max-w-3xl text-center">
        <h2 className="text-4xl font-semibold leading-tight tracking-[-0.02em] sm:text-6xl">
          TrackItDown is coming
          <br />
          <span className="text-muted-foreground">to iPhone and Android.</span>
        </h2>
        <p className="mx-auto mt-6 max-w-xl text-lg text-muted-foreground sm:text-xl">
          Report a stolen vehicle in under a minute and let people nearby help you find it. Coming soon to the App Store and Google Play.
        </p>
      </Reveal>
    </section>
  )
}
