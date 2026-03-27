importScripts("https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js");

// Activate new Service Worker immediately without waiting
workbox.core.skipWaiting();

// Take control of all open tabs immediately
workbox.core.clientsClaim();

// Also handle manual SKIP_WAITING messages from the page
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
});

/**
 * NETWORK FIRST for HTML pages and JS files
 * → Always tries to fetch the latest from the server first.
 * → Falls back to cache only if the user is offline.
 * → Result: pushing new code = users get it on next visit automatically.
 */
workbox.routing.registerRoute(
  /\.html$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'html-cache',
    networkTimeoutSeconds: 5,
  })
);

workbox.routing.registerRoute(
  /\.js$/,
  new workbox.strategies.NetworkFirst({
    cacheName: 'js-cache',
    networkTimeoutSeconds: 5,
  })
);

/**
 * CACHE FIRST for images and icons
 * → These rarely change so it's safe to serve from cache.
 * → Cached for 30 days, max 60 files.
 */
workbox.routing.registerRoute(
  /\.(?:png|jpg|jpeg|svg|gif|ico)$/,
  new workbox.strategies.CacheFirst({
    cacheName: 'image-cache',
    plugins: [
      new workbox.expiration.Plugin({
        maxEntries: 60,
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);
