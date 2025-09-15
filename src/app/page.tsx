import { Header } from '@/components/layout/header'
import { Hero } from '@/components/sections/hero'
import { FeaturedWork } from '@/components/sections/featured-work'
import { OurProcess } from '@/components/sections/our-process'
import { ContactSection } from '@/components/sections/contact-section'
import { Footer } from '@/components/layout/footer'
import { LazySection } from '@/components/ui/lazy-section'

export default function HomePage() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      
      {/* Featured Work - Load immediately since it's above fold */}
      <FeaturedWork />
      
      {/* Our Process Section - Lazy load since it's below fold */}
      <LazySection 
        threshold={0.1} 
        rootMargin="150px"
        fallback={
          <div className="py-20 bg-gradient-to-br from-gray-50 to-white">
            <div className="container-custom section-padding">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-64 bg-gray-200 rounded-2xl"></div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        }
      >
        <OurProcess />
      </LazySection>
      
      {/* Contact Section - Lazy load since it's below fold */}
      <LazySection 
        threshold={0.1} 
        rootMargin="100px"
        fallback={
          <div className="py-20 bg-white">
            <div className="container-custom section-padding">
              <div className="animate-pulse">
                <div className="h-8 bg-gray-200 rounded w-1/3 mx-auto mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-2/3 mx-auto mb-8"></div>
                <div className="h-64 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        }
      >
        <ContactSection />
      </LazySection>
      
      <Footer />
    </main>
  )
}