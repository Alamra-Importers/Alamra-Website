import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gray-50 min-h-[60vh] flex items-center pt-32">
        <div className="container-custom section-padding text-center">
          <h1 className="mb-4 font-playfair text-6xl md:text-8xl font-bold text-gray-900">
            404
          </h1>
          <h2 className="mb-6 font-playfair text-2xl md:text-3xl font-bold text-gray-700">
            Page Not Found
          </h2>
          <p className="mb-8 mx-auto max-w-2xl text-gray-600 text-lg">
            The page you're looking for doesn't exist. It might have been moved, 
            deleted, or you entered the wrong URL.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary">
              Go Home
            </Link>
            <Link href="/products" className="btn-outline">
              View Products
            </Link>
          </div>
        </div>
      </section>
      
      <Footer />
    </main>
  )
}