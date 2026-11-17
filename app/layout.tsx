import type { Metadata, Viewport } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import { MotionProvider } from '@/components/motion-provider'
import './globals.css'

// Apple devices use the system font (SF Pro, which Apple doesn't license for web hosting); everyone else gets Inter.
// next/font self-hosts it, so visitors make no requests to Google.
const inter = Inter({ subsets: ['latin'], display: 'swap', variable: '--font-inter' })

export const viewport: Viewport = { themeColor: '#ffffff' }

export const metadata: Metadata = {
  // www is the primary domain on Vercel (the bare domain redirects to it)
  metadataBase: new URL('https://www.trackitdown.co.uk'),
  title: {
    default: 'TrackItDown - Community-Powered Stolen Vehicle Recovery',
    template: '%s | TrackItDown',
  },
  description: 'Report stolen vehicles, alert nearby communities, and increase recovery chances through safe crowdsourced sightings across the UK.',
  openGraph: {
    title: 'TrackItDown — Report & Find Stolen Vehicles',
    description: 'Report stolen vehicles, crowdsourced sightings, and safer recoveries with local communities.',
    type: 'website',
    url: 'https://www.trackitdown.co.uk',
    siteName: 'TrackItDown',
  },
  // Preview image, favicon and Apple icon come from app/opengraph-image.tsx, app/icon.svg and app/apple-icon.png
  twitter: {
    card: 'summary_large_image',
    title: 'TrackItDown — Report & Find Stolen Vehicles',
    description: 'Report stolen vehicles, crowdsourced sightings, and safer recoveries with local communities.',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="skip-link absolute left-2 top-2 z-50 rounded border border-primary bg-primary/90 p-2 text-sm font-medium text-primary-foreground opacity-0 transition-all duration-150 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <Header />
        <MotionProvider>{children}</MotionProvider>
        <Analytics />
      </body>
    </html>
  )
}
