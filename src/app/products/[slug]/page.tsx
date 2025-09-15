import { notFound } from 'next/navigation'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CollectionGallery } from '@/components/sections/collection-gallery'
import { getCategoryBySlug, getAllCategorySlugs } from '@/data/product-categories'

interface CollectionPageProps {
  params: {
    slug: string
  }
}

export async function generateStaticParams() {
  const slugs = getAllCategorySlugs()
  return slugs.map((slug) => ({
    slug: slug,
  }))
}

export async function generateMetadata({ params }: CollectionPageProps) {
  const category = getCategoryBySlug(params.slug)
  
  if (!category) {
    return {
      title: 'Collection Not Found - Alamra Embroidery',
    }
  }

  return {
    title: `${category.name} - Alamra Embroidery`,
    description: category.longDescription,
  }
}

export default function CollectionPage({ params }: CollectionPageProps) {
  const category = getCategoryBySlug(params.slug)

  if (!category) {
    notFound()
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