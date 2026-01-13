const CACHE_NAME = 'cristo-cache-v1';
const urlsToCache = [
  '/',
  '/index.html',
  '/live.html',
  '/style.css',
  '/main.js',
  '/logo.png',
  '/Main Pic.jpg',
  '/manifest.json',
  '/icon-192.png',
  '/icon-512.png',
  '/images/facebook logo.jpg',
  '/images/youtube logo.webp'
];

// INSTALL: cache all essential assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
      .then(() => self.skipWaiting())
  );
});

// ACTIVATE: remove old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME)
            .map(key => caches.delete(key))
      )
    ).then(() => self.clients.claim())
  );
});

// FETCH: serve cached assets first, fallback to network
self.addEventListener('fetch', event => {
  const request = event.request;

  // Ignore non-GET requests
  if (request.method !== 'GET') return;

  event.respondWith(
    caches.match(request)
      .then(cachedResponse => {
        if (cachedResponse) return cachedResponse;

        return fetch(request)
          .then(networkResponse => {
            // Only cache successful responses
            if (!networkResponse || networkResponse.status !== 200 || networkResponse.type !== 'basic') {
              return networkResponse;
            }

            // Clone the response to cache
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => cache.put(request, responseToCache));

            return networkResponse;
          })
          .catch(() => {
            // Optional: fallback for offline
            if (request.destination === 'document') return caches.match('/index.html');
          });
      })
  );
});
