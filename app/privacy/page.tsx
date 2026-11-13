import type { Metadata } from "next"
import { Footer } from "@/components/footer"

export const metadata: Metadata = {
  title: "Privacy",
  description: "How Trackitdown Ltd handles data on trackitdown.co.uk.",
}

const CONTACT_EMAIL = "trackitdowwnn@gmail.com"

export default function PrivacyPage() {
  return (
    <main id="main-content" className="min-h-screen">
      <article className="mx-auto max-w-2xl px-4 py-16 text-muted-foreground [&_a]:text-link [&_a]:underline [&_h2]:mt-10 [&_h2]:mb-3 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-foreground [&_li]:mt-2 [&_p]:mt-3 [&_p]:leading-relaxed [&_ul]:list-disc [&_ul]:pl-5">
        <h1 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">Privacy notice</h1>
        <p>Last updated: 4 November 2026</p>

        <p>
          This notice explains how Trackitdown Ltd (company no. 17532660, registered in England &amp; Wales) handles
          personal data when you visit trackitdown.co.uk. The TrackItDown app is not yet available. It will have its own
          privacy policy, published before launch.
        </p>

        <h2>Who we are</h2>
        <p>
          Trackitdown Ltd is the controller for this website. Contact us about privacy at{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>

        <h2>What this website collects</h2>
        <ul>
          <li>No accounts, forms or sign-ups. We do not ask for your name, email or any other details.</li>
          <li>No cookies, and nothing is stored on your device.</li>
          <li>
            Anonymous visit statistics through Vercel Web Analytics: pages viewed, the site that referred you, country,
            browser and device type. It does not use cookies and does not identify you.
          </li>
          <li>
            Technical logs kept by our hosting provider, Vercel, including your IP address, to deliver the site and
            protect it from abuse.
          </li>
        </ul>

        <h2>Why we use it</h2>
        <p>
          We rely on our legitimate interests in running a secure website and understanding, in aggregate, how it is
          used. We do not sell data or use it for advertising.
        </p>

        <h2>Who processes it and where</h2>
        <p>
          Vercel Inc. hosts this website and provides the analytics. Vercel may process data outside the UK, including
          in the United States, under its own data protection safeguards.
        </p>

        <h2>How long it is kept</h2>
        <p>We do not store personal data from this website ourselves. Vercel keeps logs and analytics for limited periods under its own retention policy.</p>

        <h2>Your rights</h2>
        <p>
          Under UK data protection law you can ask to access, correct or delete your personal data, or object to how we
          use it. Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>. If you are unhappy with our answer you
          can complain to the Information Commissioner&apos;s Office at <a href="https://ico.org.uk/make-a-complaint/">ico.org.uk</a>.
        </p>

        <h2>Changes</h2>
        <p>If we change this notice we will update the date at the top of this page.</p>
      </article>
      <Footer />
    </main>
  )
}
