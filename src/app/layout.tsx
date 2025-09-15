import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'
import { PerformanceMonitor } from '@/components/ui/performance-monitor'
import { ServiceWorkerRegistration } from '@/components/ui/service-worker-registration'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
})

export const metadata: Metadata = {
  title: 'Alamra Embroidery - Premium Custom Embroidery & Badges',
  description: 'Discover exquisite custom embroidery, badges, and precision craftsmanship. Premium quality embroidered products for institutions, organizations, and individuals.',
  keywords: 'embroidery, custom badges, embroidered patches, premium craftsmanship, institutional badges',
  authors: [{ name: 'Alamra Embroidery' }],
  creator: 'Alamra Embroidery',
  publisher: 'Alamra Embroidery',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: '/logo-gold-small_compressed.webp',
    shortcut: '/logo-gold-small_compressed.webp',
    apple: '/logo-gold-small_compressed.webp',
  },
  manifest: '/manifest.json',
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
  },
  themeColor: '#d4af37',
  colorScheme: 'light',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <link rel="dns-prefetch" href="https://fonts.gstatic.com" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Alamra Embroidery" />
        <meta name="application-name" content="Alamra Embroidery" />
        <meta name="msapplication-TileColor" content="#d4af37" />
        <meta name="msapplication-tap-highlight" content="no" />
      </head>
      <body className={`${inter.className} antialiased`}>
        {process.env.NODE_ENV === 'development' && <PerformanceMonitor />}
        <ServiceWorkerRegistration />
        {children}
      </body>
    </html>
  )
}