/**
 * Product Categories Grid Component
 * 
 * Displays all product categories in a responsive grid layout with navigation links.
 * Each category card shows featured image, name, description, and links to collection page.
 * 
 * @component ProductCategoriesGrid
 * @description Grid display of all product categories with navigation
 * @author Alamra Embroidery Development Team
 * @version 3.0.0
 */

'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { productCategories } from '@/data/product-categories'


export function ProductCategoriesGrid() {

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {productCategories.map((category, index) => (
        <motion.div
          key={category.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          className="group"
        >
          <Link href={`/products/${category.slug}`}>
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 cursor-pointer">
              {/* Category Image */}
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={category.featuredImage}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  priority={index < 3}
                  quality={75}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
                
                {/* Image Count Badge */}
                <div className="absolute top-4 right-4 bg-primary-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  {category.images.length} {category.images.length === 1 ? 'Item' : 'Items'}
                </div>

                {/* View Collection Icon Overlay */}
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileHover={{ opacity: 1, scale: 1 }}
                    className="bg-white/90 backdrop-blur-sm rounded-full p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  >
                    <svg className="w-8 h-8 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
                    </svg>
                  </motion.div>
                </div>
              </div>
              
              {/* Category Info */}
              <div className="p-6">
                <h3 className="font-playfair text-2xl font-bold text-gray-900 mb-3 group-hover:text-primary-500 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {category.description}
                </p>
                
                {/* View Collection Button */}
                <div className="flex items-center text-primary-500 font-medium group-hover:text-primary-600 transition-colors">
                  <span>View Collection</span>
                  <svg 
                    className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        </motion.div>
      ))}
    </div>

  )
}

/**
 * Component Features:
 * 
 * 1. Responsive Grid:
 *    - 1 column on mobile
 *    - 2 columns on tablet
 *    - 3 columns on desktop
 * 
 * 2. Interactive Cards:
 *    - Hover animations (lift, scale, color changes)
 *    - Smooth transitions
 *    - Visual feedback
 *    - Navigation to collection pages
 * 
 * 3. Category Information:
 *    - Featured image with overlay
 *    - Item count badge
 *    - Category name and description
 *    - Call-to-action link
 * 
 * 4. Performance:
 *    - Next.js Image optimization
 *    - Next.js Link for client-side navigation
 *    - Staggered animations
 *    - Efficient rendering
 */