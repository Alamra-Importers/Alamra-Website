'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { Mail, Phone, MapPin } from 'lucide-react'

const Footer = () => {
  const currentYear = new Date().getFullYear()

  const footerLinks = {
    company: [
      { name: 'About Us', href: '#about' },
      { name: 'Our Work', href: '#work' },
      { name: 'Contact', href: '#contact' },
    ],
    services: [
      { name: 'Custom Embroidery', href: '/services/embroidery' },
      { name: 'Badge Creation', href: '/services/badges' },
      { name: 'Bullion Work', href: '/services/bullion' },
    ],
  }

  return (
    <footer className="bg-navy text-ivory">
      <div className="container-custom section-padding">
        {/* Main Footer Content */}
        <div className="py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="lg:col-span-2"
          >
            <Link href="/" className="flex items-center space-x-3 mb-6">
              <Image
                src="/alamra_compressed.webp"
                alt="Alamra"
                width={40}
                height={40}
                className="w-10 h-10"
              />
            </Link>
            
            <p className="text-ivory/80 mb-6 max-w-md leading-relaxed">
              Crafting exquisite embroidered pieces with traditional techniques and modern precision. 
              Your vision, our expertise, exceptional results.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-ivory/70">
                <Mail className="w-4 h-4" />
                <span className="text-sm">hello@alamra.com</span>
              </div>
              <div className="flex items-center space-x-3 text-ivory/70">
                <Phone className="w-4 h-4" />
                <span className="text-sm">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center space-x-3 text-ivory/70">
                <MapPin className="w-4 h-4" />
                <span className="text-sm">Toronto, Ontario</span>
              </div>
            </div>
          </motion.div>

          {/* Company Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-gold mb-4">Company</h3>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-ivory/70 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Services Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-gold mb-4">Services</h3>
            <ul className="space-y-3">
              {footerLinks.services.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-ivory/70 hover:text-gold transition-colors duration-300 text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Bottom Bar */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="border-t border-ivory/20 py-8 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0"
        >
          <div className="text-ivory/60 text-sm">
            © {currentYear} Alamra. All rights reserved.
          </div>
          
          <div className="flex space-x-6 text-sm">
            <Link href="/privacy" className="text-ivory/60 hover:text-gold transition-colors duration-300">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-ivory/60 hover:text-gold transition-colors duration-300">
              Terms of Service
            </Link>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}

export default Footer