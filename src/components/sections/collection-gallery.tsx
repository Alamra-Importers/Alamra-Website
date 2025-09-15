'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { ProductCategory } from '@/data/product-categories'

interface CollectionGalleryProps {
  category: ProductCategory
}



interface ImageModalProps {
  images: string[]
  currentIndex: number
  isOpen: boolean
  onClose: () => void
  onNext: () => void
  onPrevious: () => void
  onSelectImage: (index: number) => void
  categoryName: string
}

const ImageModal = ({ 
  images, 
  currentIndex, 
  isOpen, 
  onClose, 
  onNext, 
  onPrevious, 
  onSelectImage,
  categoryName 
}: ImageModalProps) => {
  // Preload adjacent images for instant navigation
  useEffect(() => {
    if (isOpen) {
      const preloadIndexes = [
        currentIndex - 1,
        currentIndex + 1,
        currentIndex - 2,
        currentIndex + 2
      ].filter(i => i >= 0 && i < images.length)
      
      preloadIndexes.forEach(index => {
        const img = new window.Image()
        img.src = images[index]
      })
    }
  }, [currentIndex, isOpen, images])

  if (!isOpen) return null

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') onClose()
    if (e.key === 'ArrowLeft') onPrevious()
    if (e.key === 'ArrowRight') onNext()
  }

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center"
        onClick={onClose}
        onKeyDown={handleKeyDown}
        tabIndex={0}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 text-white hover:text-gray-300 transition-colors"
        >
          <X size={32} />
        </button>

        {/* Navigation Buttons */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onPrevious()
              }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronLeft size={32} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation()
                onNext()
              }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 text-white hover:text-gray-300 transition-colors"
            >
              <ChevronRight size={32} />
            </button>
          </>
        )}

        {/* Image Counter */}
        <div className="absolute top-4 left-4 z-10 text-white text-sm">
          {currentIndex + 1} of {images.length}
        </div>

        {/* Category Name */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 z-10 text-white text-center">
          <h3 className="text-lg font-semibold">{categoryName}</h3>
        </div>

        {/* Main Image */}
        <motion.div
          key={currentIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="relative w-full h-full flex items-center justify-center p-8"
          onClick={(e) => e.stopPropagation()}
        >
          <img
            src={images[currentIndex]}
            alt={`${categoryName} - Image ${currentIndex + 1}`}
            className="max-w-[90vw] max-h-[80vh] object-contain"
            style={{ maxWidth: '90vw', maxHeight: '80vh' }}
          />
        </motion.div>

        {/* Thumbnail Strip */}
        {images.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex gap-2 max-w-[90vw] overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  onSelectImage(index)
                }}
                className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                  index === currentIndex 
                    ? 'border-white' 
                    : 'border-transparent hover:border-gray-400'
                }`}
              >
                <img
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}

export const CollectionGallery = ({ category }: CollectionGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null)

  const openModal = (index: number) => {
    setSelectedImageIndex(index)
  }

  const closeModal = () => {
    setSelectedImageIndex(null)
  }

  const nextImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex((selectedImageIndex + 1) % category.images.length)
    }
  }

  const previousImage = () => {
    if (selectedImageIndex !== null) {
      setSelectedImageIndex(
        selectedImageIndex === 0 ? category.images.length - 1 : selectedImageIndex - 1
      )
    }
  }

  const selectImage = (index: number) => {
    setSelectedImageIndex(index)
  }

  return (
    <>
      <div className="mb-12 text-center">
        <h2 className="text-3xl md:text-4xl font-playfair font-bold text-gray-900 mb-4">
          {category.name} Collection
        </h2>
        <p className="text-gray-600 text-lg max-w-3xl mx-auto">
          {category.images.length} pieces in this collection
        </p>
      </div>



      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {category.images.map((image, index) => (
          <div
            key={index}
            className="group relative aspect-square bg-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
            onClick={() => openModal(index)}
          >
            <Image
              src={image}
              alt={`${category.name} - Piece ${index + 1}`}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={index < 8}
              quality={75}
            />
            
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-3">
                <ZoomIn className="w-6 h-6 text-gray-800" />
              </div>
            </div>

            {/* Image Number */}
            <div className="absolute top-2 left-2 bg-black/50 text-white text-xs px-2 py-1 rounded">
              {index + 1}
            </div>
          </div>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImageIndex !== null && (
        <ImageModal
          images={category.images}
          currentIndex={selectedImageIndex}
          isOpen={selectedImageIndex !== null}
          onClose={closeModal}
          onNext={nextImage}
          onPrevious={previousImage}
          onSelectImage={selectImage}
          categoryName={category.name}
        />
      )}
    </>
  )
}