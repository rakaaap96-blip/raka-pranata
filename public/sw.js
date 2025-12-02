const CACHE_NAME = 'portfolio-v1.5'; // Naikkan versi
const OFFLINE_URL = '/offline.html';

// Hanya cache file yang benar-benar ada dan penting
const urlsToCache = [
  '/',
  '/offline.html',
  '/manifest.json',
  '/favicon.ico',
  // Hapus favicon yang tidak diperlukan, gunakan yang umum saja
  '/IMGG/logo.svg',
  // Hapus file yang mungkin tidak ada seperti og-image.png jika tidak diperlukan
];

// Install event - DIPERBAIKI dengan error handling yang lebih baik
self.addEventListener('install', (event) => {
  console.log('🟢 Service Worker installing...');
  
  event.waitUntil(
    (async () => {
      try {
        const cache = await caches.open(CACHE_NAME);
        console.log('📦 Opening cache:', CACHE_NAME);
        
        // Cache file satu per satu dengan error handling
        const cachePromises = urlsToCache.map(async (url) => {
          try {
            await cache.add(url);
            console.log('✅ Cached:', url);
          } catch (error) {
            console.warn('⚠️ Failed to cache:', url, error);
            // Continue caching other files even if one fails
          }
        });
        
        await Promise.all(cachePromises);
        console.log('🎉 All files cached (with possible warnings)');
        
        return self.skipWaiting();
      } catch (error) {
        console.error('💥 Cache opening failed:', error);
        throw error;
      }
    })()
  );
});

// Activate event - DIPERBAIKI
self.addEventListener('activate', (event) => {
  console.log('🔥 Service Worker activating...');
  
  event.waitUntil(
    (async () => {
      // Hapus cache lama
      const cacheNames = await caches.keys();
      await Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== CACHE_NAME) {
            console.log('🗑️ Deleting old cache:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
      
      console.log('🚀 Claiming clients');
      await self.clients.claim();
      console.log('✅ Service Worker ready!');
    })()
  );
});

// Fetch event - DIPERBAIKI
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  const url = new URL(event.request.url);
  
  // Skip external resources dan dev server
  if (
    url.protocol !== 'http:' && url.protocol !== 'https:' ||
    url.hostname === 'chrome-extension' ||
    url.pathname.includes('sockjs-node') ||
    url.hostname.includes('google-analytics')
  ) {
    return;
  }
  
  event.respondWith(
    (async () => {
      try {
        // Coba dari cache dulu
        const cachedResponse = await caches.match(event.request);
        if (cachedResponse) {
          console.log('📨 Cache hit:', url.pathname);
          return cachedResponse;
        }
        
        // Jika tidak ada di cache, fetch dari network
        console.log('🌐 Fetching from network:', url.pathname);
        const networkResponse = await fetch(event.request);
        
        // Cache response untuk future use (hanya dari origin yang sama)
        if (url.origin === self.location.origin) {
          const cache = await caches.open(CACHE_NAME);
          // Clone response karena response hanya bisa digunakan sekali
          cache.put(event.request, networkResponse.clone());
        }
        
        return networkResponse;
        
      } catch (error) {
        console.log('❌ Network failed:', url.pathname, error);
        
        // Coba cache untuk HTML pages
        if (
          event.request.headers.get('accept')?.includes('text/html') ||
          event.request.destination === 'document'
        ) {
          const offlinePage = await caches.match(OFFLINE_URL);
          if (offlinePage) {
            console.log('📄 Serving offline page');
            return offlinePage;
          }
        }
        
        // Coba cari cached version dari request yang sama
        const cachedVersions = await caches.match(event.request, { ignoreSearch: true });
        if (cachedVersions) {
          return cachedVersions;
        }
        
        // Fallback untuk images
        if (event.request.destination === 'image') {
          return new Response(
            '<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 200 200"><rect width="200" height="200" fill="#f0f0f0"/><text x="100" y="100" text-anchor="middle" dy=".3em" fill="#666">Image not available</text></svg>',
            {
              headers: { 'Content-Type': 'image/svg+xml' }
            }
          );
        }
        
        // Default error response
        return new Response(
          `Network error: Cannot fetch ${url.pathname}`,
          {
            status: 503,
            statusText: 'Service Unavailable',
            headers: { 'Content-Type': 'text/plain' }
          }
        );
      }
    })()
  );
});

// Background sync (optional)
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync triggered:', event.tag);
    // Implement sync logic here
  }
});

// Handle push notifications (optional)
self.addEventListener('push', (event) => {
  console.log('🔔 Push notification received');
  // Implement push notification logic here
});