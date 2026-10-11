// Versión del caché - Incrementa este número para forzar la actualización en todos los clientes
const CACHE_NAME = 'mathmaster-v2';

const ASSETS_TO_CACHE = [
  './',
  './index.html',
  './style.css?v=2.0',
  './data.js?v=2.0',
  './app.js?v=2.0',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png'
];

// Instalación: forzar skipWaiting para activar de inmediato
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

// Activación: borrar cachés viejos y tomar control inmediato
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Borrando caché anterior:', key);
            return caches.delete(key);
          }
        })
      );
    }).then(() => self.clients.claim())
  );
});

// Network-First para archivos principales (HTML, JS, CSS) para que siempre reciba la versión nueva
self.addEventListener('fetch', (e) => {
  // Ignorar peticiones que no sean GET
  if (e.request.method !== 'GET') return;

  const url = new URL(e.request.url);

  // Si es un recurso del mismo origen (código de la app)
  if (url.origin === location.origin) {
    e.respondWith(
      fetch(e.request)
        .then((networkResponse) => {
          // Si la red responde bien, guardamos copia en caché y devolvemos
          if (networkResponse && networkResponse.status === 200) {
            const copy = networkResponse.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(e.request, copy));
          }
          return networkResponse;
        })
        .catch(() => {
          // Si no hay internet, fallback a caché
          return caches.match(e.request).then((cached) => {
            if (cached) return cached;
            if (e.request.mode === 'navigate') {
              return caches.match('./index.html');
            }
          });
        })
    );
  } else {
    // Para CDNs externos (ej. confetti, Google Fonts): Cache-First
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
