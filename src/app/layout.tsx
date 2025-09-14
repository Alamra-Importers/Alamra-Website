import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

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
  icons: {
    icon: '/logo-gold.png',
    shortcut: '/logo-gold.png',
    apple: '/logo-gold.png',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className={`${inter.className} antialiased`}>
        {children}
      </body>
    </html>
  )
}