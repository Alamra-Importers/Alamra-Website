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
}

const FeaturedWork = () => {
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const featuredProducts: Product[] = [
    {
      id: "1",
      name: "Paris Collection",
      description: "Embroidered bullion crest with the finest materials, showcasing intricate goldwork and premium craftsmanship.",
      image: "/1.jpg",
      category: "Bullion Embroidery"
    },
    {
      id: "2",
      name: "Carleton University",
      description: "A prestigious badge created for Carleton University with meticulous attention to detail and institutional pride.",
      image: "/2.jpg",
      category: "University Badges"
    },
    {
      id: "3",
      name: "Ontario Corrections",
      description: "Precision-machined badge for the Ontario Corrections Office, combining durability with distinguished appearance.",
      image: "/3.jpg",
      category: "Official Badges"
    },
  ]

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
    <section id="work" className="py-20 bg-ivory">
      <div className="container-custom section-padding">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-navy mb-6">
            Featured <span className="text-gold">Craftsmanship</span>
          </h2>
          <p className="text-lg text-navy/70 max-w-2xl mx-auto">
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
                <div className="relative overflow-hidden rounded-lg bg-white shadow-lg hover:shadow-2xl transition-all duration-500">
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
                    <div className={`absolute inset-0 bg-navy/60 transition-opacity duration-300 ${
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
                        <h3 className="font-playfair text-2xl font-bold mb-2">
                          {product.name}
                        </h3>
                        <p className="text-ivory/90 text-sm leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                    </motion.div>
                  </div>
                  
                  {/* Card Content */}
                  <div className="p-6">
                    <h3 className="font-playfair text-xl font-semibold text-navy mb-2">
                      {product.name}
                    </h3>
                    <p className="text-navy/70 text-sm line-clamp-2">
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

export default FeaturedWork