const CACHE_NAME="cristo-cache-v3";
const urlsToCache=[
  "/",
  "/index.html",
  "/calendar.html",
  "/live.html",
  "/style.css",
  "/main.js",
  "/manifest.json",
  "/logo.png"
];

self.addEventListener("install",e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urlsToCache)));
  self.skipWaiting();
});

self.addEventListener("activate",e=>{
  e.waitUntil(
    caches.keys().then(keys=>
      Promise.all(keys.map(k=>k!==CACHE_NAME?caches.delete(k):null))
    )
  );
});

self.addEventListener("fetch",e=>{
  e.respondWith(
    caches.match(e.request).then(r=>r||fetch(e.request))
  );
});
