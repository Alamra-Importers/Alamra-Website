/**
 * Featured Work Section Component
 * 
 * Showcases featured product categories from the Alamra Embroidery collection.
 * Uses the new category system to display representative pieces with zoom functionality.
 * 
 * @component FeaturedWork
 * @description Homepage section showcasing featured product categories with zoom
 * @author Alamra Embroidery Development Team
 * @version 3.0.0
 */

'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { getFeaturedCategories } from '@/data/product-categories'

// Get featured categories for homepage display
const featuredCategories = getFeaturedCategories(3)

export function FeaturedWork() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [selectedIndex, setSelectedIndex] = useState<number>(0)

  // Open category gallery
  const openCategoryGallery = (categoryId: string) => {
    setSelectedCategory(categoryId)
    const category = featuredCategories.find(cat => cat.id === categoryId)
    if (category && category.images.length > 0) {
      setSelectedImage(category.images[0])
      setSelectedIndex(0)
    }
  }

  // Close gallery
  const closeGallery = () => {
    setSelectedCategory(null)
    setSelectedImage(null)
  }

  // Navigate to previous image
  const previousImage = () => {
    const category = featuredCategories.find(cat => cat.id === selectedCategory)
    if (category) {
      const newIndex = selectedIndex > 0 ? selectedIndex - 1 : category.images.length - 1
      setSelectedIndex(newIndex)
      setSelectedImage(category.images[newIndex])
    }
  }

  // Navigate to next image
  const nextImage = () => {
    const category = featuredCategories.find(cat => cat.id === selectedCategory)
    if (category) {
      const newIndex = selectedIndex < category.images.length - 1 ? selectedIndex + 1 : 0
      setSelectedIndex(newIndex)
      setSelectedImage(category.images[newIndex])
    }
  }

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') closeGallery()
    if (e.key === 'ArrowLeft') previousImage()
    if (e.key === 'ArrowRight') nextImage()
  }

  const currentCategory = featuredCategories.find(cat => cat.id === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  }

  return (
    <section id="featured" className="py-20 bg-gray-50">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Featured <span className="text-primary-500">Craftsmanship</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each piece represents our commitment to excellence, combining traditional techniques
            with modern precision to create truly exceptional embroidered works.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {featuredCategories.map((category) => (
            <motion.div
              key={category.id}
              variants={itemVariants}
              className="group relative cursor-pointer"
              onMouseEnter={() => setHoveredProduct(category.id)}
              onMouseLeave={() => setHoveredProduct(null)}
              onClick={() => openCategoryGallery(category.id)}
            >
              <div className="card card-hover">
                {/* Image Container */}
                <div className="relative h-80 overflow-hidden">
                  <Image
                    src={category.featuredImage}
                    alt={category.name}
                    fill
                    className={`object-cover transition-transform duration-700 ${hoveredProduct === category.id ? 'scale-110' : 'scale-100'
                      }`}
                  />

                  {/* Overlay */}
                  <div className={`absolute inset-0 bg-gray-900/60 transition-opacity duration-300 ${hoveredProduct === category.id ? 'opacity-100' : 'opacity-0'
                    }`} />

                  {/* Item Count Badge */}
                  <div className="absolute top-4 left-4">
                    <span className="bg-primary-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {category.images.length} {category.images.length === 1 ? 'Item' : 'Items'}
                    </span>
                  </div>

                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4">
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{
                        opacity: hoveredProduct === category.id ? 1 : 0,
                        scale: hoveredProduct === category.id ? 1 : 0.8
                      }}
                      className="bg-white/90 backdrop-blur-sm rounded-full p-2"
                    >
                      <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </motion.div>
                  </div>

                  {/* Hover Content */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{
                      opacity: hoveredProduct === category.id ? 1 : 0,
                      y: hoveredProduct === category.id ? 0 : 20
                    }}
                    transition={{ duration: 0.3 }}
                    className="absolute inset-0 flex items-center justify-center p-6"
                  >
                    <div className="text-center text-white">
                      <h3 className="font-playfair text-2xl font-bold mb-2">
                        {category.name}
                      </h3>
                      <p className="text-white/90 text-sm leading-relaxed mb-4">
                        {category.description}
                      </p>
                      <span className="inline-block bg-primary-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                        View Gallery
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Card Content */}
                <div className="p-6">
                  <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <Link href="/products" className="btn-primary text-lg">
            View All Categories
          </Link>
        </motion.div>
      </div>

      {/* Gallery Modal */}
      <AnimatePresence>
        {selectedCategory && selectedImage && currentCategory && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
            onClick={closeGallery}
            onKeyDown={handleKeyDown}
            tabIndex={0}
          >
            {/* Close Button */}
            <button
              onClick={closeGallery}
              className="absolute top-4 right-4 z-60 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
              aria-label="Close gallery"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Category Title */}
            <div className="absolute top-4 left-4 text-white">
              <h2 className="text-2xl font-bold">{currentCategory.name}</h2>
              <p className="text-white/80">{currentCategory.description}</p>
            </div>

            {/* Navigation Buttons */}
            {currentCategory.images.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); previousImage(); }}
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                  aria-label="Previous image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                
                <button
                  onClick={(e) => { e.stopPropagation(); nextImage(); }}
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/10 hover:bg-white/20 text-white rounded-full p-3 transition-colors"
                  aria-label="Next image"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </>
            )}

            {/* Image */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              className="relative max-w-5xl max-h-[80vh] w-full h-full"
              onClick={(e) => e.stopPropagation()}
            >
              <Image
                src={selectedImage}
                alt={`${currentCategory.name} ${selectedIndex + 1}`}
                fill
                className="object-contain"
                sizes="90vw"
                priority
              />
            </motion.div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 bg-black/50 text-white px-4 py-2 rounded-full text-sm">
              {selectedIndex + 1} of {currentCategory.images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}