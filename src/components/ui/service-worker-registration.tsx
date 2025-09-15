/**
 * Service Worker Registration Component
 * 
 * Registers the service worker for caching and offline functionality.
 * Only runs in production to avoid development issues.
 * 
 * @component ServiceWorkerRegistration
 * @description Client-side service worker registration
 * @author Alamra Embroidery Development Team
 * @version 1.0.0
 */

'use client'

import { useEffect } from 'react'

export function ServiceWorkerRegistration() {
  useEffect(() => {
    if (
      typeof window !== 'undefined' &&
      'serviceWorker' in navigator &&
      process.env.NODE_ENV === 'production'
    ) {
      const registerSW = async () => {
        try {
          const registration = await navigator.serviceWorker.register('/sw.js', {
            scope: '/',
          })

          console.log('Service Worker registered successfully:', registration)

          // Handle updates
          registration.addEventListener('updatefound', () => {
            const newWorker = registration.installing
            if (newWorker) {
              newWorker.addEventListener('statechange', () => {
                if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
                  // New content is available, refresh the page
                  console.log('New content available, refreshing...')
                  window.location.reload()
                }
              })
            }
          })

          // Check for updates periodically
          setInterval(() => {
            registration.update()
          }, 60000) // Check every minute

        } catch (error) {
          console.error('Service Worker registration failed:', error)
        }
      }

      // Register after page load to avoid blocking
      window.addEventListener('load', registerSW)

      return () => {
        window.removeEventListener('load', registerSW)
      }
    }
  }, [])

  return null
}

/**
 * Preload critical resources using service worker
 */
export function preloadCriticalAssets() {
  if (typeof window !== 'undefined' && 'serviceWorker' in navigator) {
    navigator.serviceWorker.ready.then((registration) => {
      // Send message to service worker to preload critical assets
      registration.active?.postMessage({
        type: 'PRELOAD_CRITICAL',
        assets: [
          '/images/hero-bg.jpg',
          '/logo-gold.png',
        ]
      })
    })
  }
}