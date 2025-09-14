import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ContactSection } from '@/components/sections/contact-section'

export const metadata = {
  title: 'Contact Us - Alamra Embroidery',
  description: 'Get in touch with Alamra Embroidery for custom quotes and inquiries about our premium embroidery services.',
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32">
        <div className="container-custom section-padding text-center">
          <h1 className="mb-6 font-playfair text-4xl md:text-5xl lg:text-6xl font-bold">
            Contact Us
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl opacity-90">
            Ready to bring your vision to life? Get in touch for a custom quote 
            and let's create something extraordinary together.
          </p>
        </div>
      </section>

      {/* Contact Form Section */}
      <ContactSection />

      <Footer />
    </main>
  )
}