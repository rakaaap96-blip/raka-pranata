const CACHE_NAME = 'portfolio-v1.5';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/',
  '/offline.html',
  '/manifest.json',

  // Favicon & PWA icons
  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',

  // Images
  '/IMGG/logo.svg',
  '/IMGG/og-image.png'
];

// INSTALL
self.addEventListener('install', (event) => {
  console.log('🟢 Service Worker installing...');

  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        console.log('📦 Caching files...');

        // Cache satu-satu supaya satu file gagal
        // tidak menghancurkan semuanya
        for (const url of urlsToCache) {
          try {
            await cache.add(url);
            console.log('✅ Cached:', url);
          } catch (error) {
            console.error('❌ Failed:', url, error);
          }
        }
      })
      .then(() => {
        console.log('🚀 Skip waiting');
        return self.skipWaiting();
      })
  );
});

// ACTIVATE
self.addEventListener('activate', (event) => {
  console.log('🔥 Service Worker activated');

  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              console.log('🗑️ Removing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

// FETCH
self.addEventListener('fetch', (event) => {

  // Skip non-GET
  if (event.request.method !== 'GET') return;

  // Skip extensions
  if (event.request.url.startsWith('chrome-extension://')) return;

  // Skip analytics / websocket
  if (
    event.request.url.includes('google-analytics') ||
    event.request.url.includes('collect?v=2') ||
    event.request.url.includes('sockjs-node')
  ) {
    return;
  }

  event.respondWith(
    (async () => {
      try {

        // Cek cache dulu
        const cached = await caches.match(event.request);

        if (cached) {
          return cached;
        }

        // Ambil dari network
        const response = await fetch(event.request);

        // Simpan response yang valid
        if (
          response &&
          response.status === 200 &&
          event.request.url.startsWith(self.location.origin)
        ) {

          const cache = await caches.open(CACHE_NAME);

          cache.put(
            event.request,
            response.clone()
          );
        }

        return response;

      } catch (error) {

        console.log(
          '❌ Network failed:',
          error
        );

        // Kalau halaman HTML gagal
        if (
          event.request.destination === 'document' ||
          event.request.headers
            .get('accept')
            ?.includes('text/html')
        ) {

          const offline = await caches.match(
            OFFLINE_URL
          );

          if (offline) {
            return offline;
          }
        }

        return new Response(
          'Offline',
          {
            status: 503,
            statusText: 'Offline'
          }
        );
      }
    })()
  );
});

// BACKGROUND SYNC
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    console.log('🔄 Background sync');
  }
});