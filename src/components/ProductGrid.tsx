'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

interface Product {
  id: string
  name: string
  description: string
  image: string
  category: string
  details: string
}

const ProductGrid = () => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const products: Product[] = [
    {
      id: "1",
      name: "Paris Collection",
      description: "Embroidered bullion crest with the finest materials",
      image: "/1.jpg",
      category: "Bullion Embroidery",
      details: "Intricate goldwork showcasing premium craftsmanship with traditional French techniques."
    },
    {
      id: "2",
      name: "Carleton University",
      description: "A badge created for Carleton University with utmost precision",
      image: "/2.jpg",
      category: "University Badges",
      details: "Prestigious institutional badge featuring detailed embroidery and official university colors."
    },
    {
      id: "3",
      name: "Ontario Corrections",
      description: "Machined Badge for the Ontario Corrections Office",
      image: "/3.jpg",
      category: "Official Badges",
      details: "Professional law enforcement badge combining durability with distinguished appearance."
    },
  ]

  const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

  const filteredProducts = selectedCategory === 'All' 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
    <section className="py-20 bg-ivory min-h-screen">
      <div className="container-custom section-padding">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="font-playfair text-4xl md:text-6xl font-bold text-navy mb-6">
            Our <span className="text-gold">Portfolio</span>
          </h1>
          <p className="text-lg text-navy/70 max-w-3xl mx-auto">
            Discover our collection of meticulously crafted embroidered pieces, 
            each representing our commitment to excellence and attention to detail.
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-navy text-ivory shadow-lg'
                  : 'bg-white text-navy hover:bg-navy/10 border border-navy/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Products Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {filteredProducts.map((product) => (
            <motion.div
              key={product.id}
              variants={itemVariants}
              className="group relative"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <Link href={`/products/${product.id}`}>
                <div className="relative overflow-hidden rounded-xl bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
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
                    <div className={`absolute inset-0 bg-navy/70 transition-opacity duration-300 ${
                      hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                    }`} />
                    
                    {/* Category Badge */}
                    <div className="absolute top-4 left-4">
                      <span className="bg-gold text-navy px-3 py-1 rounded-full text-sm font-medium">
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
                      <div className="text-center text-ivory">
                        <h3 className="font-playfair text-2xl font-bold mb-3">
                          {product.name}
                        </h3>
                        <p className="text-ivory/90 text-sm leading-relaxed mb-4">
                          {product.details}
                        </p>
                        <span className="inline-block bg-gold text-navy px-4 py-2 rounded-full text-sm font-medium">
                          View Details
                        </span>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-semibold text-navy mb-2">
                      {product.name}
                    </h3>
                    <p className="text-navy/70 text-sm">
                      {product.description}
                    </p>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <h3 className="font-playfair text-2xl font-semibold text-navy mb-4">
            Ready to Create Your Own Masterpiece?
          </h3>
          <p className="text-navy/70 mb-8 max-w-2xl mx-auto">
            Let us bring your vision to life with our expert craftsmanship and attention to detail.
          </p>
          <Link href="#contact" className="btn-primary text-lg">
            Start Your Project
          </Link>
        </motion.div>
      </div>
    </section>
  )
}

export default ProductGrid