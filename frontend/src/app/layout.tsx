import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/context/CartContext'
import CartDrawer from '@/components/ui/CartDrawer'
import WhatsAppWidget from '@/components/ui/WhatsAppWidget'

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://feiwellhub.co.ke'),
  title: {
    default:  'Feiwellhub Naturals — Premium Health Supplements',
    template: '%s | Feiwellhub Naturals',
  },
  description:
    'Clinically-formulated supplements for nerve pain, immune support, joint health, asthma and more. Science-backed, nature-sourced. Delivered across Nairobi.',
  keywords: [
    'food supplements', 'nerve pain', 'neuropathy', 'immune support',
    'joint health', 'glucosamine', 'omega-3', 'vitamin D3', 'Kenya', 'Nairobi',
  ],
  openGraph: {
    type:     'website',
    siteName: 'Feiwellhub Naturals',
    title:    'Feiwellhub Naturals — Premium Health Supplements',
    description: 'Clinically-formulated supplements for nerve pain, immune support and joint health.',
    locale:   'en_KE',
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
        <CartProvider>
          {children}
          {/* Cart drawer — available on every page */}
          <CartDrawer />
          {/* WhatsApp widget — available on every page */}
          <WhatsAppWidget />
        </CartProvider>
      </body>
    </html>
  )
}
