import type { Metadata, Viewport } from 'next'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import './globals.css'

export const viewport: Viewport = { themeColor: '#ffffff' }

export const metadata: Metadata = {
  metadataBase: new URL('https://trackitdown.co.uk'),
  title: {
    default: 'TrackItDown - Community-Powered Stolen Vehicle Recovery',
    template: '%s | TrackItDown',
  },
  description: 'Report stolen vehicles, alert nearby communities, and increase recovery chances through safe crowdsourced sightings across the UK.',
  generator: 'v0.app',
  openGraph: {
    title: 'TrackItDown — Report & Find Stolen Vehicles',
    description: 'Report stolen vehicles, crowdsourced sightings, and safer recoveries with local communities.',
    type: 'website',
    url: 'https://trackitdown.co.uk',
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
      <body className="font-sans antialiased">
        <a
          href="#main-content"
          className="skip-link absolute left-2 top-2 z-50 rounded border border-primary bg-primary/90 p-2 text-sm font-medium text-primary-foreground opacity-0 transition-all duration-150 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
        >
          Skip to main content
        </a>
        <Header />
        {children}
        <Analytics />
      </body>
    </html>
  )
}
