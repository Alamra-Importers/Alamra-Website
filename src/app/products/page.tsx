import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductsGrid } from '@/components/sections/products-grid'

export const metadata = {
  title: 'Products - Alamra Embroidery',
  description: 'Browse our collection of premium custom embroidery, badges, and precision crafted pieces.',
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      <section className="py-20 bg-gray-50 pt-32">
        <div className="container-custom section-padding">
          <div className="text-center mb-16">
            <h1 className="mb-4 font-playfair text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900">
              Our Products
            </h1>
            <p className="mx-auto max-w-2xl text-gray-600 text-lg">
              Explore our complete collection of premium embroidered pieces, 
              each crafted with meticulous attention to detail.
            </p>
          </div>
          
          <ProductsGrid />
        </div>
      </section>
      
      <Footer />
    </main>
  )
}