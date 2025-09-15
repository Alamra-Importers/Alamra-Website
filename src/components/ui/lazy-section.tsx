/**
 * Lazy Section Component
 * 
 * A wrapper component that lazy loads sections when they come into view.
 * Improves initial page load performance by deferring non-critical content.
 * 
 * @component LazySection
 * @description Intersection observer-based lazy loading for sections
 * @author Alamra Embroidery Development Team
 * @version 1.0.0
 */

'use client'

import { useState, useRef, useEffect, ReactNode } from 'react'
import { motion } from 'framer-motion'

interface LazySectionProps {
  children: ReactNode
  className?: string
  threshold?: number
  rootMargin?: string
  fallback?: ReactNode
  once?: boolean
  delay?: number
}

export function LazySection({
  children,
  className = '',
  threshold = 0.1,
  rootMargin = '100px',
  fallback,
  once = true,
  delay = 0,
}: LazySectionProps) {
  const [isInView, setIsInView] = useState(false)
  const [shouldRender, setShouldRender] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsInView(true)
            setShouldRender(true)
          }, delay)
          
          if (once) {
            observer.disconnect()
          }
        } else if (!once) {
          setIsInView(false)
        }
      },
      {
        threshold,
        rootMargin,
      }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [threshold, rootMargin, once, delay])

  const DefaultFallback = () => (
    <div className="min-h-[200px] flex items-center justify-center">
      <div className="animate-pulse bg-gray-200 rounded-lg w-full h-32" />
    </div>
  )

  return (
    <div ref={sectionRef} className={className}>
      {shouldRender ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 20 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      ) : (
        fallback || <DefaultFallback />
      )}
    </div>
  )
}

/**
 * Hook for intersection observer
 */
export function useInView(options: {
  threshold?: number
  rootMargin?: string
  once?: boolean
} = {}) {
  const [isInView, setIsInView] = useState(false)
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting)
        if (entry.isIntersecting && options.once) {
          observer.disconnect()
        }
      },
      {
        threshold: options.threshold || 0.1,
        rootMargin: options.rootMargin || '0px',
      }
    )

    if (ref.current) {
      observer.observe(ref.current)
    }

    return () => observer.disconnect()
  }, [options.threshold, options.rootMargin, options.once])

  return [ref, isInView] as const
}