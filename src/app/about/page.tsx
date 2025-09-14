import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'

export const metadata = {
  title: 'About Us - Alamra Embroidery',
  description: 'Learn about Alamra Embroidery\'s commitment to excellence in custom embroidery and precision craftsmanship.',
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-br from-gray-900 to-gray-800 text-white pt-32">
        <div className="container-custom section-padding text-center">
          <h1 className="mb-6 font-playfair text-4xl md:text-5xl lg:text-6xl font-bold">
            About Alamra Embroidery
          </h1>
          <p className="mx-auto max-w-3xl text-lg md:text-xl opacity-90">
            Crafting excellence through traditional techniques and modern precision, 
            we bring your vision to life with uncompromising quality and attention to detail.
          </p>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom section-padding">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="mb-6 font-playfair text-3xl md:text-4xl font-bold text-gray-900">
                Our Story
              </h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                Founded with a passion for preserving the art of traditional embroidery while 
                embracing modern techniques, Alamra Embroidery has become a trusted name in 
                custom embroidery and badge creation.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We specialize in creating distinctive pieces for institutions, universities, 
                government organizations, and discerning individuals who appreciate the finest 
                in craftsmanship and attention to detail.
              </p>
            </div>
            <div className="relative h-96 bg-gray-200 rounded-lg overflow-hidden">
              {/* You can add an image here */}
              <div className="absolute inset-0 flex items-center justify-center text-gray-400">
                <p>Workshop Image Placeholder</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-white">
        <div className="container-custom section-padding">
          <div className="text-center mb-16">
            <h2 className="mb-4 font-playfair text-3xl md:text-4xl font-bold text-gray-900">
              Our Values
            </h2>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              The principles that guide every piece we create
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card text-center p-8">
              <div className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-3 font-playfair text-xl font-bold text-gray-900">
                Quality Excellence
              </h3>
              <p className="text-gray-600">
                Every piece meets our rigorous standards for materials, 
                craftsmanship, and durability.
              </p>
            </div>

            <div className="card text-center p-8">
              <div className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                </svg>
              </div>
              <h3 className="mb-3 font-playfair text-xl font-bold text-gray-900">
                Custom Precision
              </h3>
              <p className="text-gray-600">
                Each project is tailored to exact specifications with 
                meticulous attention to detail.
              </p>
            </div>

            <div className="card text-center p-8">
              <div className="w-16 h-16 bg-primary-400 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-3 font-playfair text-xl font-bold text-gray-900">
                Client Partnership
              </h3>
              <p className="text-gray-600">
                We work closely with clients to ensure every piece 
                exceeds expectations and honors their vision.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  )
}