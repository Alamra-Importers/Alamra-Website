
import { useState, useEffect } from 'react'
import { Bars3Icon } from '@heroicons/react/24/outline'
import { Link } from '@tanstack/react-router'
import { useMatches, useLocation } from '@tanstack/react-router'
import { MobileDrawer } from './MobileDrawer'

export function Header() {

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const matches = useMatches()
  const currentRoute = matches[matches.length - 1]

  const headerText = currentRoute?.staticData?.headerText ?? 'light'

  const isDarkText = headerText === 'dark'

  const location = useLocation()
  const location_with_path_name = location.pathname + "#contact"
    // This triggers every time the pathname changes, regardless of how fast you click
  useEffect(() => {
    // Only scroll to top if there is NO hash (like #contact) in the URL
    if (!window.location.hash) {
      window.scrollTo(0, 0)
    }
  }, [location.pathname])

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const navItems = [
    { name: 'Home', href: '/' },
    { name: 'Portfolio', href: '/products' },
    { name: 'About', href: '/about' },
  ]

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full">
      <div
        className={`w-full ${isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-transparent'}`}
        style={{
          transition: 'background-color 0.3s ease, backdrop-filter 0.3s ease, box-shadow 0.3s ease',
          transform: 'translateZ(0)', // Force hardware acceleration to prevent movement
          willChange: 'background-color, backdrop-filter, box-shadow'
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center justify-between py-4 md:h-16 md:py-0">
            {/* Logo */}
            <Link to="/" className="flex items-center flex-shrink-0">
              <img
                src={isScrolled ? "/logo-black.png" : "/logo-gold.png"}
                alt="Alamra"
                width={48}
                height={48}
                className="w-12 h-12"
              />
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${isDarkText || isScrolled ? "text-gray-900" : "text-white"} hover:text-primary-500 font-medium transition-colors duration-300`}
                  style={{ transition: 'color 0.2s ease' }}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to={location_with_path_name}
                className="bg-primary-500 hover:bg-primary-600 text-white px-6 py-2 rounded-lg font-medium"
                style={{ transition: 'background-color 0.2s ease' }}
              >
                Get Quote
              </Link>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`md:hidden p-2 ${isDarkText || isScrolled ? "text-gray-900" : "text-white"} hover:text-primary-500`}
              style={{ transition: 'color 0.2s ease' }}
            >
              <Bars3Icon className="h-6 w-6" />
            </button>
          </nav>
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileDrawer
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={navItems}
        contactLink={location_with_path_name}
      />
    </header>
  )
}