/**
 * Service Worker for Alamra Embroidery
 * 
 * Provides caching strategies for images and static assets
 * to improve loading performance and offline experience.
 */

const CACHE_NAME = 'alamra-embroidery-v1'
const STATIC_CACHE = 'alamra-static-v1'
const IMAGE_CACHE = 'alamra-images-v1'

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/products',
  '/manifest.json',
  '/logo-gold-small_compressed.webp',
  '/alamra_compressed.webp',
  '/logo-black_compressed.webp',
]

// Install event - cache static assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then((cache) => cache.addAll(STATIC_ASSETS))
      .then(() => self.skipWaiting())
  )
})

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames
            .filter((cacheName) => {
              return cacheName !== CACHE_NAME && 
                     cacheName !== STATIC_CACHE && 
                     cacheName !== IMAGE_CACHE
            })
            .map((cacheName) => caches.delete(cacheName))
        )
      })
      .then(() => self.clients.claim())
  )
})

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event
  const url = new URL(request.url)

  // Handle image requests
  if (request.destination === 'image') {
    event.respondWith(
      caches.open(IMAGE_CACHE)
        .then((cache) => {
          return cache.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse
              }

              return fetch(request)
                .then((response) => {
                  // Only cache successful responses
                  if (response.status === 200) {
                    cache.put(request, response.clone())
                  }
                  return response
                })
                .catch(() => {
                  // Return a fallback image if network fails
                  return new Response(
                    '<svg width="400" height="300" xmlns="http://www.w3.org/2000/svg"><rect width="100%" height="100%" fill="#f3f4f6"/><text x="50%" y="50%" text-anchor="middle" dy=".3em" fill="#9ca3af">Image unavailable</text></svg>',
                    { headers: { 'Content-Type': 'image/svg+xml' } }
                  )
                })
            })
        })
    )
    return
  }

  // Handle static assets
  if (url.pathname.startsWith('/_next/static/') || 
      url.pathname.startsWith('/static/') ||
      STATIC_ASSETS.includes(url.pathname)) {
    event.respondWith(
      caches.open(STATIC_CACHE)
        .then((cache) => {
          return cache.match(request)
            .then((cachedResponse) => {
              if (cachedResponse) {
                return cachedResponse
              }

              return fetch(request)
                .then((response) => {
                  if (response.status === 200) {
                    cache.put(request, response.clone())
                  }
                  return response
                })
            })
        })
    )
    return
  }

  // Handle API and page requests with network-first strategy
  if (url.pathname.startsWith('/api/') || 
      request.mode === 'navigate') {
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache successful page responses
          if (response.status === 200 && request.mode === 'navigate') {
            const responseClone = response.clone()
            caches.open(CACHE_NAME)
              .then((cache) => cache.put(request, responseClone))
          }
          return response
        })
        .catch(() => {
          // Fallback to cache for navigation requests
          if (request.mode === 'navigate') {
            return caches.match('/')
              .then((cachedResponse) => {
                return cachedResponse || new Response('Offline', { status: 503 })
              })
          }
          return new Response('Network error', { status: 503 })
        })
    )
    return
  }

  // Default: try network first, fallback to cache
  event.respondWith(
    fetch(request)
      .catch(() => caches.match(request))
  )
})

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle any background sync tasks
      console.log('Background sync triggered')
    )
  }
})

// Push notifications (if needed in the future)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json()
    event.waitUntil(
      self.registration.showNotification(data.title, {
        body: data.body,
        icon: '/logo-gold-small_compressed.webp',
        badge: '/logo-gold-small_compressed.webp',
      })
    )
  }
})