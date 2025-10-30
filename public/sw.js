const CACHE_NAME = 'pneus-scpneus-v1';
const urlsToCache = [
  '/',
  '/api/products',
  '/images/tires/xbri-brutus-1.png',
  '/images/tires/xbri-brutus-2.png',
  '/images/tires/xbri-brutus-3.png',
  '/images/tires/xbri-brutus-4.png',
  '/images/categories/camioneta-cerrado.png',
  '/images/categories/caminhao-br.png',
  '/images/categories/carros-cidade.png',
  '/images/categories/motos-estacionamento.png',
  '/icons/icon-192x192.png',
  '/icons/icon-512x512.png',
  '/manifest.json'
];

// Install event - cache resources
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - serve cached content when offline
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Return cached version or fetch from network
        return response || fetch(event.request);
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cache => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      );
    })
  );
});