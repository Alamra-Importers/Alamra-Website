/**
 * Header Component - Main Navigation
 * 
 * This component provides the main navigation header for the Alamra Embroidery website.
 * Features a responsive design with mobile menu, logo switching, and scroll-based styling.
 * 
 * @component Header
 * @description Main navigation header with responsive mobile menu
 * @author Alamra Embroidery Development Team
 * @version 2.0.0
 * 
 * Features:
 * ✅ Responsive design (desktop + mobile)
 * ✅ Fixed positioning with scroll-based background changes
 * ✅ Logo switching (alamra.png → logo-black.png on scroll)
 * ✅ Mobile hamburger menu with smooth animations
 * ✅ Accessible navigation links
 * ✅ Call-to-action button (Get Quote)
 * 
 * Technical Notes:
 * - Uses 'use client' for browser-only features (scroll detection)
 * - Fixed positioning prevents layout shifts during scroll
 * - Hardware acceleration (translateZ) for smooth performance
 * - Mobile-first responsive design with Tailwind CSS
 */

'use client'

import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import Image from 'next/image'
import Link from 'next/link'

export function Header() {
  // State Management
  const [isScrolled, setIsScrolled] = useState(false)        // Track scroll position for styling changes
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false) // Control mobile menu visibility

  // Scroll Detection Effect
  // Monitors scroll position to trigger header background changes
  useEffect(() => {
    const handleScroll = () => {
      // Change header appearance after scrolling 50px down
      setIsScrolled(window.scrollY > 50)
    }

    // Add scroll listener when component mounts
    window.addEventListener('scroll', handleScroll)

    // Cleanup: Remove listener when component unmounts
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Navigation Configuration
  // Define all main navigation links
  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Products', href: '/products' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ]

  return (
    <header className="header-fixed w-full">
      {/* 
        Header Background Container
        - Changes from transparent to white/blur on scroll
        - Uses hardware acceleration for smooth performance
        - Fixed positioning and height ensures header stays at top without movement
      */}
      <div
        className={`w-full h-full ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
        style={{
          // Smooth transitions for background changes only (prevents movement)
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
          transform: 'translateZ(0)', // Force hardware acceleration to prevent layout shifts
          willChange: 'background-color, backdrop-filter, box-shadow', // Optimize for these property changes
          position: 'relative' // Ensure proper stacking context
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <nav className="flex items-center justify-between h-full">
            {/* 
              Logo Section
              - Switches between alamra_compressed.webp (transparent header) and logo-black_compressed.webp (scrolled header)
              - flex-shrink-0 prevents logo from shrinking in flex layout
              - priority loading for better performance
            */}
            <Link href="/" className="flex items-center flex-shrink-0">
              <Image
                src={isScrolled ? "/logo-black_compressed.webp" : "/alamra_compressed.webp"} // Dynamic logo switching
                alt="Alamra"
                width={48}
                height={48}
                className="w-12 h-12"
                priority // Load logo immediately for better UX
              />
            </Link>

            {/* 
              Desktop Navigation
              - Hidden on mobile (hidden md:flex)
              - Horizontal layout with consistent spacing
              - Includes main nav links + CTA button
            */}
            <div className="hidden md:flex items-center space-x-8">
              {/* Main Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-700 hover:text-primary-500 font-medium"
                  style={{ transition: 'color 0.2s ease' }} // Smooth hover effect
                >
                  {item.name}
                </Link>
              ))}

              {/* Call-to-Action Button */}
              <Link
                href="/contact"
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium"
                style={{ transition: 'background-color 0.2s ease' }} // Smooth hover effect
              >
                Get Quote
              </Link>
            </div>

            {/* 
              Mobile Menu Toggle Button
              - Only visible on mobile (md:hidden)
              - Toggles between hamburger and X icon
              - Accessible button with proper touch targets
            */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary-500"
              style={{ transition: 'color 0.2s ease' }}
              aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'} // Accessibility
            >
              {isMobileMenuOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
            </button>
          </nav>

          {/* 
            Mobile Menu Dropdown
            - Animated slide-down effect using Framer Motion
            - Only visible on mobile devices
            - Closes automatically when link is clicked
            - Includes all navigation links + CTA button
          */}
        </div>
      </div>

      {/* Mobile Menu - Positioned absolutely to not affect header height */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}    // Start hidden and slightly up
            animate={{ opacity: 1, y: 0 }}      // Animate to visible and proper position
            exit={{ opacity: 0, y: -10 }}       // Animate back to hidden when closing
            className="absolute top-full left-0 right-0 md:hidden bg-white border-t border-gray-200 shadow-lg"
            style={{
              transform: 'translateZ(0)', // Hardware acceleration
              zIndex: 40,
              backfaceVisibility: 'hidden' // Prevent flickering
            }}
          >
            <div className="py-4 space-y-4">
              {/* Mobile Navigation Links */}
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)} // Close menu when link clicked
                  className="block text-gray-700 hover:text-primary-500 font-medium"
                  style={{ transition: 'color 0.2s ease' }}
                >
                  {item.name}
                </Link>
              ))}

              {/* Mobile CTA Button */}
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu when button clicked
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium inline-block"
                style={{ transition: 'background-color 0.2s ease' }}
              >
                Get Quote
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

/**
 * Header Component Usage Notes:
 * 
 * 1. Responsive Behavior:
 *    - Desktop: Horizontal navigation with all links visible
 *    - Mobile: Hamburger menu with slide-down navigation
 * 
 * 2. Scroll Behavior:
 *    - Transparent background when at top of page
 *    - White background with blur and shadow when scrolled
 *    - Logo switches from alamra.png to logo-black.png
 * 
 * 3. Performance Optimizations:
 *    - Hardware acceleration (translateZ) prevents layout shifts
 *    - Image priority loading for logo
 *    - Efficient scroll event handling with cleanup
 * 
 * 4. Accessibility Features:
 *    - Proper ARIA labels for mobile menu button
 *    - Keyboard navigation support
 *    - Semantic HTML structure
 * 
 * 5. Required Assets:
 *    - /alamra_compressed.webp - Main logo (transparent background)
 *    - /logo-black_compressed.webp - Dark logo (scrolled state)
 * 
 * 6. Dependencies:
 *    - Framer Motion (animations)
 *    - Heroicons (menu icons)
 *    - Tailwind CSS (styling)
 *    - Next.js Image component
 */