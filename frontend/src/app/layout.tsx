import type { Metadata } from 'next'
import './globals.css'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://faiwellhub.co.ke'),
  title: {
    default: 'Faiwellhub Naturals — Premium Herbal Supplements',
    template: '%s | Faiwellhub Naturals',
  },
  description:
    'Premium food supplements, herbal teas, essential oils and natural skincare. Science-backed, nature-sourced. Delivered across Nairobi.',
  keywords: [
    'food supplements', 'herbal supplements', 'moringa', 'ashwagandha',
    'natural wellness', 'organic', 'Kenya', 'Nairobi', 'Faiwellhub',
  ],
  openGraph: {
    type:     'website',
    siteName: 'Faiwellhub Naturals',
    title:    'Faiwellhub Naturals — Premium Herbal Supplements',
    description: 'Premium food supplements, herbal teas, essential oils and natural skincare.',
    locale:   'en_KE',
  },
  twitter: {
    card:        'summary_large_image',
    title:       'Faiwellhub Naturals',
    description: 'Premium food supplements and herbal wellness products.',
  },
  robots: {
    index:     true,
    follow:    true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        {children}
        {/* WhatsApp widget — visible on every page sitewide */}
        <WhatsAppWidget />
      </body>
    </html>
  )
}
