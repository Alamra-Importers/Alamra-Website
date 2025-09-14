'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const featuredProducts = [
  {
    id: "1",
    name: "Paris",
    description: "Embroidered bullion crest with the finest materials",
    image: "/1.jpg",
    category: "Institutional"
  },
  {
    id: "2", 
    name: "Carleton",
    description: "A badge created for Carleton university with the utmost precision",
    image: "/2.jpg",
    category: "University"
  },
  {
    id: "3",
    name: "Corrections",
    description: "Machined Badge for the Ontario Corrections Office",
    image: "/3.jpg",
    category: "Government"
  },
]

export function FeaturedWork() {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

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
          {featuredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link href={`/products/${product.id}`}>
                <div className="card card-hover">
                  {/* Image Container */}
                  <div className="relative h-80 overflow-hidden">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className={`object-cover transition-transform duration-700 ${
                        hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                      }`}
                    />
                    
                    {/* Overlay */}
                    <div className={`absolute inset-0 bg-gray-900/60 transition-opacity duration-300 ${
                      hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-primary-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                        {product.category}
                      </span>
                    </div>
                    
                    {/* Hover Content */}
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: hoveredProduct === product.id ? 1 : 0,
                        y: hoveredProduct === product.id ? 0 : 20
                      }}
                      transition={{ duration: 0.3 }}
                      className="absolute inset-0 flex items-center justify-center p-6"
                    >
                      <div className="text-center text-white">
                        <h3 className="font-playfair text-2xl font-bold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-white/90 text-sm leading-relaxed mb-4">
                          {product.description}
                        </p>
                        <span className="inline-block bg-primary-400 text-white px-4 py-2 rounded-full text-sm font-medium">
                          View Details
                        </span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2">
                      {product.name}
                    </h3>
                    <p className="text-gray-600 text-sm">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
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
            View All Work
          </Link>
        </motion.div>
      </div>
    </section>
  )
}