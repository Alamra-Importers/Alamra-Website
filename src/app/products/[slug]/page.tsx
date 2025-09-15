'use client'

import { useEffect, useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CollectionGallery } from '@/components/sections/collection-gallery'
import { getCategoryBySlug, ProductCategory } from '@/data/product-categories'

export default function CollectionPage() {
  const params = useParams()
  const [category, setCategory] = useState<ProductCategory | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (params?.slug && typeof params.slug === 'string') {
      const foundCategory = getCategoryBySlug(params.slug)
      setCategory(foundCategory || null)
      setLoading(false)
    }
  }, [params])

  if (loading) {
    return (
      <main className="min-h-screen">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading collection...</p>
          </div>
        </div>
        <Footer />
      </main>
    )
  }

  if (!category) {
    return notFound()
  }

  return (
    <main className="min-h-screen">
      <Header />
      
      {/* Hero Banner */}
      <section 
        className="relative py-32 bg-gradient-to-br from-gray-900 to-gray-800 pt-32"
        style={{
          backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${category.banner.backgroundImage})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        <div className="relative container-custom section-padding">
          <div className="text-center mb-8">
            <h1 className="mb-6 font-playfair text-4xl md:text-5xl lg:text-6xl font-bold text-white">
              {category.banner.title}
            </h1>
            <p className="mx-auto max-w-3xl text-gray-200 text-lg md:text-xl leading-relaxed mb-8">
              {category.banner.subtitle}
            </p>
            <div className="mx-auto max-w-4xl text-gray-300 text-base leading-relaxed">
              {category.longDescription}
            </div>
          </div>
        </div>
      </section>
      
      {/* Gallery Section */}
      <section className="py-20 bg-gray-50">
        <div className="container-custom section-padding">
          <CollectionGallery category={category} />
        </div>
      </section>
      
      <Footer />
    </main>
  )
}