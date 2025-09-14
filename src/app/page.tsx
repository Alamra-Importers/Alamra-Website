import { Header } from '@/components/layout/header'
import { Hero } from '@/components/sections/hero'
import { FeaturedWork } from '@/components/sections/featured-work'
import { ContactSection } from '@/components/sections/contact-section'
import { Footer } from '@/components/layout/footer'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <FeaturedWork />
      <ContactSection />
      <Footer />
    </main>
  )
}