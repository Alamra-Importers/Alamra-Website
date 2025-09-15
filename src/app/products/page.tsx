import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { ProductCategoriesGrid } from '@/components/sections/product-categories-grid'

export const metadata = {
  title: 'Products - Alamra Embroidery',
  description: 'Browse our collection of premium custom embroidery, badges, and precision crafted pieces organized by category.',
}

export default function ProductsPage() {
  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-900 to-gray-800 pt-32">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative container-custom section-padding">
          <div className="text-center mb-16">
            <h1 className="mb-6 font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              Our Product Categories
            </h1>
            <p className="mx-auto max-w-3xl text-gray-200 text-lg md:text-xl leading-relaxed">
              Discover our specialized collections of premium embroidered pieces. 
              Each category represents decades of craftsmanship and attention to detail.
            </p>
          </div>
        </div>
      </section>
      
      {/* Categories Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom section-padding">
          <ProductCategoriesGrid />
        </div>
      </section>
      
      <Footer />
    </main>
  )
}