const CACHE_NAME = "cristo-v3";
const urls = [
  "index.html",
  "calendar.html",
  "live.html",
  "style.css",
  "main.js",
  "logo.png"
];

self.addEventListener("install", e=>{
  e.waitUntil(caches.open(CACHE_NAME).then(c=>c.addAll(urls)));
});
