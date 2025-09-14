'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

const products = [
  {
    id: "1",
    name: "Paris",
    description: "Embroidered bullion crest with the finest materials, showcasing intricate detail work and premium gold threading.",
    image: "/1.jpg",
    category: "Institutional",
    features: ["Bullion Threading", "Premium Materials", "Custom Design"]
  },
  {
    id: "2", 
    name: "Carleton",
    description: "A badge created for Carleton university with the utmost precision, featuring the university's official crest and colors.",
    image: "/2.jpg",
    category: "University",
    features: ["University Official", "Precision Crafted", "Authentic Colors"]
  },
  {
    id: "3",
    name: "Corrections",
    description: "Machined Badge for the Ontario Corrections Office, meeting all official specifications and durability requirements.",
    image: "/3.jpg",
    category: "Government",
    features: ["Official Specification", "Durable Construction", "Government Grade"]
  },
]

const categories = ["All", "Institutional", "University", "Government"]

export function ProductsGrid() {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [hoveredProduct, setHoveredProduct] = useState<string | null>(null)

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory)

  return (
    <div>
      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
              selectedCategory === category
                ? 'bg-primary-500 text-white shadow-lg'
                : 'bg-white text-gray-600 border border-gray-300 hover:bg-gray-50'
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((product) => (
          <Link key={product.id} href={`/products/${product.id}`}>
            <div 
              className="card card-hover h-full flex flex-col"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className={`object-cover transition-transform duration-500 ${
                    hoveredProduct === product.id ? 'scale-110' : 'scale-100'
                  }`}
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-primary-400 text-white px-3 py-1 rounded-full text-sm font-medium">
                    {product.category}
                  </span>
                </div>
              </div>
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="font-playfair text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {product.name}
                </h3>
                <p className="text-gray-600 leading-relaxed mb-4 flex-1">
                  {product.description}
                </p>
                
                {/* Features */}
                <div className="flex flex-wrap gap-1 mb-4">
                  {product.features.map((feature) => (
                    <span
                      key={feature}
                      className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
                  <span className="text-sm font-medium">View Details</span>
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}