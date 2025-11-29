const CACHE_NAME = 'portfolio-v1.4'; // Update version
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  '/favicon-16x16.png', 
  '/favicon-32x32.png',
  '/favicon-192x192.png',
  '/favicon-512x512.png',
  '/apple-touch-icon.png',
  '/IMGG/logo.svg',
  '/IMGG/og-image.png',
  '/src/main.tsx'
];

// Install event - FIXED
self.addEventListener('install', (event) => {
  console.log('🟢 Service Worker installed');
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('📦 Caching critical files');
        // Gunakan cache.addAll dengan error handling
        return cache.addAll(urlsToCache).catch(error => {
          console.error('Failed to cache some files:', error);
        });
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - FIXED
self.addEventListener('activate', (event) => {
  console.log('🔥 Service Worker activated');
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    }).then(() => {
      console.log('🚀 Claiming clients');
      return self.clients.claim();
    })
  );
});

// Fetch event - FIXED (No more cancelled requests!)
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests and chrome extensions
  if (event.request.method !== 'GET' || 
      event.request.url.startsWith('chrome-extension://')) {
    return;
  }

  // Skip dev server websockets and analytics
  if (event.request.url.includes('sockjs-node') ||
      event.request.url.includes('google-analytics') ||
      event.request.url.includes('collect?v=2')) {
    return;
  }

  event.respondWith(
    (async () => {
      try {
        // Coba cache dulu
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          console.log('📨 Serving from cache:', event.request.url);
          return cachedResponse;
        }

        // Kalau tidak ada di cache, fetch dari network
        console.log('🌐 Fetching from network:', event.request.url);
        const networkResponse = await fetch(event.request);
        
        // Cache response untuk future use (kecuali external resources)
        if (event.request.url.startsWith('http') && 
            event.request.url.startsWith(self.location.origin)) {
          
          const cache = await caches.open(CACHE_NAME);
          cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
        
      } catch (error) {
        console.log('❌ Network failed, trying offline page:', error);
        
        // Jika request untuk HTML document, return offline page
        if (event.request.destination === 'document' || 
            event.request.headers.get('accept')?.includes('text/html')) {
          const offlinePage = await caches.match(OFFLINE_URL);
          if (offlinePage) return offlinePage;
        }
        
        // Return generic error response
        return new Response('Network error', {
          status: 408,
          statusText: 'Network offline'
        });
      }
    })()
  );
});

// Background sync
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered');
  }
});