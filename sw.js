const CACHE_NAME = 'mathmaster-v4';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=4.0',
  './data.js?v=4.0',
  './app.js?v=4.0',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

self.addEventListener('install', (e) => {
  self.skipWaiting();
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(ASSETS_TO_CACHE).catch((err) => {
        console.warn('Cache addAll warning:', err);
      });
    })
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  if (url.origin === location.origin) {
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          return caches.match(e.request).then((cached) => {
            if (cached) return cached;
            if (e.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
        })
    );
  } else {
    e.respondWith(
      caches.match(e.request).then((cachedResponse) => {
        return cachedResponse || fetch(e.request).then((networkResponse) => {
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
          }
          return networkResponse;
        });
      })
    );
  }
});
