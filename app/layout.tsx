import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { Header } from '@/components/header'
import './globals.css'

const nunitoSans = Nunito_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
  display: 'swap',
  variable: '--font-nunito-sans',
})

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
    images: [
      {
        url: 'https://trackitdown.co.uk/images/og-image.png',
        width: 1200,
        height: 630,
        alt: 'TrackItDown — Stolen Vehicle Reports',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TrackItDown — Report & Find Stolen Vehicles',
    description: 'Report stolen vehicles, crowdsourced sightings, and safer recoveries with local communities.',
    images: ['https://trackitdown.co.uk/images/og-image.png'],
  },
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${nunitoSans.variable} font-sans antialiased`}>
        <a
          href="#main-content"
          className="skip-link absolute left-2 top-2 z-50 rounded border border-primary bg-primary/90 p-2 text-sm font-medium text-white opacity-0 transition-all duration-150 focus:opacity-100 focus:outline-none focus:ring-2 focus:ring-primary"
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
