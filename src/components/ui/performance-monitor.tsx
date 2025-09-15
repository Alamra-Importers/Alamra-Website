/**
 * Performance Monitor Component
 * 
 * Tracks and reports performance metrics for the Alamra Embroidery website.
 * Monitors Core Web Vitals and provides insights for optimization.
 * 
 * @component PerformanceMonitor
 * @description Client-side performance monitoring and reporting
 * @author Alamra Embroidery Development Team
 * @version 1.0.0
 */

'use client'

import { useEffect } from 'react'

interface PerformanceMetrics {
  lcp?: number // Largest Contentful Paint
  fid?: number // First Input Delay
  cls?: number // Cumulative Layout Shift
  fcp?: number // First Contentful Paint
  ttfb?: number // Time to First Byte
}

export function PerformanceMonitor() {
  useEffect(() => {
    if (typeof window === 'undefined') return

    const metrics: PerformanceMetrics = {}

    // Measure Core Web Vitals
    const measureWebVitals = () => {
      // LCP - Largest Contentful Paint
      if ('PerformanceObserver' in window) {
        try {
          const lcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            const lastEntry = entries[entries.length - 1] as any
            metrics.lcp = lastEntry.startTime
            console.log('LCP:', metrics.lcp)
          })
          lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] })

          // FID - First Input Delay
          const fidObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              metrics.fid = entry.processingStart - entry.startTime
              console.log('FID:', metrics.fid)
            })
          })
          fidObserver.observe({ entryTypes: ['first-input'] })

          // CLS - Cumulative Layout Shift
          let clsValue = 0
          const clsObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (!entry.hadRecentInput) {
                clsValue += entry.value
              }
            })
            metrics.cls = clsValue
            console.log('CLS:', metrics.cls)
          })
          clsObserver.observe({ entryTypes: ['layout-shift'] })

          // FCP - First Contentful Paint
          const fcpObserver = new PerformanceObserver((list) => {
            const entries = list.getEntries()
            entries.forEach((entry: any) => {
              if (entry.name === 'first-contentful-paint') {
                metrics.fcp = entry.startTime
                console.log('FCP:', metrics.fcp)
              }
            })
          })
          fcpObserver.observe({ entryTypes: ['paint'] })

        } catch (error) {
          console.warn('Performance monitoring not supported:', error)
        }
      }

      // TTFB - Time to First Byte
      if (performance.timing) {
        metrics.ttfb = performance.timing.responseStart - performance.timing.navigationStart
        console.log('TTFB:', metrics.ttfb)
      }
    }

    // Image loading performance
    const trackImageLoading = () => {
      const images = document.querySelectorAll('img')
      let loadedImages = 0
      const totalImages = images.length

      images.forEach((img, index) => {
        if (img.complete) {
          loadedImages++
        } else {
          img.addEventListener('load', () => {
            loadedImages++
            if (loadedImages === totalImages) {
              console.log('All images loaded')
            }
          })
        }
      })
    }

    // Resource loading performance
    const trackResourceLoading = () => {
      if (performance.getEntriesByType) {
        const resources = performance.getEntriesByType('resource')
        const imageResources = resources.filter((resource: any) => 
          resource.initiatorType === 'img'
        )
        
        console.log('Image resources loaded:', imageResources.length)
        
        // Track slow loading images
        imageResources.forEach((resource: any) => {
          if (resource.duration > 1000) { // More than 1 second
            console.warn('Slow loading image:', resource.name, resource.duration + 'ms')
          }
        })
      }
    }

    // Run measurements
    measureWebVitals()
    
    // Track images after page load
    window.addEventListener('load', () => {
      setTimeout(() => {
        trackImageLoading()
        trackResourceLoading()
      }, 1000)
    })

    // Report metrics after page is fully loaded
    window.addEventListener('load', () => {
      setTimeout(() => {
        console.log('Performance Metrics:', metrics)
        
        // You could send these metrics to an analytics service
        // sendToAnalytics(metrics)
      }, 3000)
    })

  }, [])

  // This component doesn't render anything
  return null
}

/**
 * Hook to measure component render performance
 */
export function usePerformanceTimer(componentName: string) {
  useEffect(() => {
    const startTime = performance.now()
    
    return () => {
      const endTime = performance.now()
      const renderTime = endTime - startTime
      
      if (renderTime > 16) { // More than one frame (16ms)
        console.warn(`${componentName} render time:`, renderTime + 'ms')
      }
    }
  })
}

/**
 * Preload critical resources
 */
export function preloadCriticalResources() {
  if (typeof window === 'undefined') return

  // Preload critical images
  const criticalImages = [
    '/images/hero-bg.jpg',
    '/images/logo-gold.png',
  ]

  criticalImages.forEach(src => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = src
    document.head.appendChild(link)
  })

  // Preload critical fonts
  const criticalFonts = [
    'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap',
    'https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&display=swap',
  ]

  criticalFonts.forEach(href => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'style'
    link.href = href
    document.head.appendChild(link)
  })
}