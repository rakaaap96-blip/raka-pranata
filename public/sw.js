const CACHE_NAME = 'portfolio-v2.0';
const OFFLINE_URL = '/offline.html';

const urlsToCache = [
  '/offline.html',
  '/manifest.json',

  '/favicon.ico',
  '/favicon-16x16.png',
  '/favicon-32x32.png',
  '/android-chrome-192x192.png',
  '/android-chrome-512x512.png',
  '/apple-touch-icon.png',

  '/IMGG/logo.svg',
  '/IMGG/og-image.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(async (cache) => {
        for (const url of urlsToCache) {
          try {
            await cache.add(url);
          } catch {
            // skip failures
          }
        }
      })
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (event) => {
  if (event.request.url.startsWith('chrome-extension://')) return;
  if (
    event.request.url.includes('google-analytics') ||
    event.request.url.includes('collect?v=2') ||
    event.request.url.includes('sockjs-node')
  ) {
    return;
  }

  if (event.request.method !== 'GET') {
    if (event.request.method === 'POST') {
      event.respondWith(networkWithQueue(event.request));
    }
    return;
  }

  const isNavigation = event.request.destination === 'document' ||
    event.request.headers.get('accept')?.includes('text/html');

  if (isNavigation) {
    event.respondWith(networkFirstStrategy(event.request));
  } else {
    event.respondWith(cacheFirstStrategy(event.request));
  }
});

async function networkWithQueue(request) {
  try {
    const response = await fetch(request.clone());
    return response;
  } catch {
    try {
      const cache = await caches.open('post-queue');
      const queued = await cache.match('pending');
      const queue = queued ? await queued.json() : [];
      queue.push({
        url: request.url,
        method: request.method,
        headers: Array.from(request.headers.entries()),
        body: await request.clone().text(),
        timestamp: Date.now(),
      });
      const response = new Response(JSON.stringify({ queued: true }), {
        status: 202,
        headers: { 'Content-Type': 'application/json' },
      });
      const clone = response.clone();
      cache.put('pending', new Response(JSON.stringify(queue)));
      self.registration.sync.register('retry-queue');
      return response;
    } catch {
      return new Response(JSON.stringify({ error: 'Offline' }), {
        status: 503,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  }
}

async function networkFirstStrategy(request) {
  try {
    const response = await fetch(request);
    if (response && response.status === 200) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    const cached = await caches.match(request);
    if (cached) return cached;
    const offline = await caches.match(OFFLINE_URL);
    if (offline) return offline;
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

async function cacheFirstStrategy(request) {
  const cached = await caches.match(request);
  if (cached) return cached;

  try {
    const response = await fetch(request);
    if (response && response.status === 200 && request.url.startsWith(self.location.origin)) {
      const cache = await caches.open(CACHE_NAME);
      cache.put(request, response.clone());
    }
    return response;
  } catch {
    return new Response('Offline', { status: 503, statusText: 'Offline' });
  }
}

self.addEventListener('sync', (event) => {
  if (event.tag === 'retry-queue') {
    event.waitUntil(processQueue());
  }
});

async function processQueue() {
  const cache = await caches.open('post-queue');
  const queued = await cache.match('pending');
  if (!queued) return;
  const queue = await queued.json();
  const remaining = [];

  for (const item of queue) {
    try {
      await fetch(item.url, {
        method: item.method,
        headers: Object.fromEntries(item.headers),
        body: item.body,
      });
    } catch {
      remaining.push(item);
    }
  }

  if (remaining.length > 0) {
    cache.put('pending', new Response(JSON.stringify(remaining)));
    self.registration.sync.register('retry-queue');
  } else {
    cache.delete('pending');
  }
}
