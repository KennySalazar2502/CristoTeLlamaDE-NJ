const CACHE_NAME = "cristo-cache-v3"; // Updated version to avoid old cache conflicts
const urlsToCache = [
  "index.html",
  "calendar.html",
  "live.html",
  "style.css",
  "main.js",
  "script.js",
  "manifest.json",
  "logo.png",
  "facebook logo.jpg",
  "youtube logo.webp"
];

// Install Service Worker and cache files
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate Service Worker and clean old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.map(key => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      )
    )
  );
  self.clients.claim();
});

// Intercept network requests
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => {
        // Optional fallback for offline or missing files
        if (event.request.destination === "document") {
          return caches.match("index.html");
        }
      });
    })
  );
});
