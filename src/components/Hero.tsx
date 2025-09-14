'use client'

import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import Link from 'next/link'

const Hero = () => {
  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background with parallax effect */}
      <div 
        className="absolute inset-0 parallax-bg"
        style={{
          backgroundImage: 'linear-gradient(rgba(26, 35, 50, 0.7), rgba(26, 35, 50, 0.5)), url("/hero-embroidery.jpg")',
        }}
      />
      
      {/* Content */}
      <div className="relative z-10 text-center text-ivory section-padding">
        <div className="container-custom">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto"
          >
            <motion.h1 
              className="font-playfair text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              Exquisite
              <br />
              <span className="text-gold">Embroidered</span>
              <br />
              Craftsmanship
            </motion.h1>
            
            <motion.p 
              className="text-xl md:text-2xl mb-8 text-ivory/90 font-light max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              Discover premium embroidered badges, crests, and bullion work 
              crafted with the finest materials and utmost precision
            </motion.p>
            
            <motion.div 
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
            >
              <Link href="#work" className="btn-primary text-lg px-10 py-4">
                View Our Work
              </Link>
              <Link href="#about" className="btn-secondary text-lg px-10 py-4 bg-transparent border-ivory text-ivory hover:bg-ivory hover:text-navy">
                Our Story
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <Link href="#work" className="flex flex-col items-center text-ivory/70 hover:text-gold transition-colors">
          <span className="text-sm mb-2 font-medium">Scroll to explore</span>
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <ChevronDown size={24} />
          </motion.div>
        </Link>
      </motion.div>
    </section>
  )
}

export default Hero