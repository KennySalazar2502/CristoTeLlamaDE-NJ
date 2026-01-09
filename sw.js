const CACHE_NAME = "cristo-cache-v2";
const urlsToCache = [
  "/index.html",
  "/calendar.html",
  "/live.html",
  "/style.css",
  "/main.js",
  "/manifest.json",
  "/logo.png",
  "/images/icon-192.png",
  "/images/icon-512.png",
  "/images/youtube logo.webp",
  "/images/facebook logo.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.map(key => key !== CACHE_NAME ? caches.delete(key) : null))
    )
  );
});

self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});
