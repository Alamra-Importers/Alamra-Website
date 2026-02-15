import { AnimatePresence, motion } from 'framer-motion'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { Link } from '@tanstack/react-router'

interface MobileDrawerProps {
  isOpen: boolean
  onClose: () => void
  navItems: Array<{ name: string; href: string }>
  contactLink: string
}

export function MobileDrawer({ isOpen, onClose, navItems, contactLink }: MobileDrawerProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
            className="fixed left-0 top-0 bottom-0 w-64 bg-white shadow-2xl z-50 md:hidden"
          >
            <div className="flex flex-col h-full">
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-200">
                <img
                  src="/logo-black.webp"
                  alt="Alamra"
                  width={40}
                  height={40}
                  className="w-10 h-10"
                />
                <button
                  onClick={onClose}
                  className="p-2 text-gray-700 hover:text-primary-500 transition-colors"
                >
                  <XMarkIcon className="h-6 w-6" />
                </button>
              </div>

              {/* Navigation Items */}
              <nav className="flex-1 p-6">
                <div className="space-y-6">
                  {navItems.map((item) => (
                    <Link
                      key={item.name}
                      to={item.href}
                      onClick={onClose}
                      className="block text-gray-900 hover:text-primary-500 font-medium text-lg transition-colors"
                    >
                      {item.name}
                    </Link>
                  ))}

                  {/* Get Quote Button - Highlighted in Orange */}
                  <Link
                    to={contactLink}
                    onClick={onClose}
                    className="block bg-primary-500 hover:bg-primary-600 text-white px-6 py-3 rounded-lg font-medium text-center transition-colors mt-8"
                  >
                    Get Quote
                  </Link>
                </div>
              </nav>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
