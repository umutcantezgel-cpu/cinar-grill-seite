/**
 * Service Worker – Cinar Grill
 * Provides offline support, asset precaching, and runtime caching strategies
 * Version: 3.0.0
 */

const VERSION = '3.0.0';
const CACHE_NAME = `cinar-grill-v${VERSION}`;
const RUNTIME_CACHE = `cinar-grill-runtime-v${VERSION}`;

/**
 * Assets to precache (critical for offline functionality)
 * Updated automatically during build
 */
const PRECACHE_ASSETS = [
  '/',
  '/offline.html',
  '/404.html',
  // CSS/JS will be added by build process
  // Images will be cached on-demand
];

/**
 * Install Event
 * Pre-cache critical assets
 */
self.addEventListener('install', (event) => {
  console.log('[SW] Installing version', VERSION);

  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[SW] Precaching assets');
      return cache.addAll(PRECACHE_ASSETS);
    }).then(() => {
      // Activate immediately
      return self.skipWaiting();
    })
  );
});

/**
 * Activate Event
 * Clean up old caches
 */
self.addEventListener('activate', (event) => {
  console.log('[SW] Activating version', VERSION);

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name.startsWith('cinar-grill-') && name !== CACHE_NAME && name !== RUNTIME_CACHE)
          .map((name) => {
            console.log('[SW] Deleting old cache:', name);
            return caches.delete(name);
          })
      );
    }).then(() => {
      // Take control immediately
      return self.clients.claim();
    })
  );
});

/**
 * Fetch Event
 * Cache strategies:
 * - HTML: Network-first (with offline fallback)
 * - CSS/JS/Fonts: Cache-first (with network fallback)
 * - Images: Cache-first (with network fallback)
 * - API: Network-only (no cache)
 */
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }

  // Skip cross-origin requests (except fonts/images)
  if (url.origin !== self.location.origin && !isCacheable(url)) {
    return;
  }

  // API requests: network-only
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(fetch(request));
    return;
  }

  // HTML: network-first with offline fallback
  if (request.headers.get('accept')?.includes('text/html')) {
    event.respondWith(networkFirstStrategy(request));
    return;
  }

  // Static assets: cache-first with network fallback
  if (isStaticAsset(url)) {
    event.respondWith(cacheFirstStrategy(request));
    return;
  }

  // Default: network-first
  event.respondWith(networkFirstStrategy(request));
});

/**
 * Check if URL is cacheable (even if cross-origin)
 */
function isCacheable(url) {
  // Allow caching of fonts and images from CDNs
  return /\.(woff2?|ttf|eot|jpg|jpeg|png|webp|avif|svg|gif)$/i.test(url.pathname);
}

/**
 * Check if URL is a static asset
 */
function isStaticAsset(url) {
  return /\.(css|js|woff2?|ttf|eot|jpg|jpeg|png|webp|avif|svg|gif|ico)$/i.test(url.pathname) ||
         url.pathname.startsWith('/assets/');
}

/**
 * Network-first strategy
 * Try network, fall back to cache, then offline page
 */
async function networkFirstStrategy(request) {
  try {
    const networkResponse = await fetch(request);

    // Cache successful responses (200-299)
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.log('[SW] Network failed, trying cache:', request.url);

    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }

    // If HTML request failed and not in cache, show offline page
    if (request.headers.get('accept')?.includes('text/html')) {
      const offlinePage = await caches.match('/offline.html');
      if (offlinePage) {
        return offlinePage;
      }
    }

    // Return generic offline response
    return new Response('Offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
    });
  }
}

/**
 * Cache-first strategy
 * Try cache, fall back to network
 */
async function cacheFirstStrategy(request) {
  const cachedResponse = await caches.match(request);
  if (cachedResponse) {
    return cachedResponse;
  }

  try {
    const networkResponse = await fetch(request);

    // Cache successful responses
    if (networkResponse.ok) {
      const cache = await caches.open(RUNTIME_CACHE);
      cache.put(request, networkResponse.clone());
    }

    return networkResponse;
  } catch (error) {
    console.error('[SW] Failed to fetch:', request.url, error);

    // Return generic offline response
    return new Response('Resource unavailable offline', {
      status: 503,
      statusText: 'Service Unavailable',
      headers: new Headers({
        'Content-Type': 'text/plain',
      }),
    });
  }
}

/**
 * Background Sync (for form submissions)
 * Re-attempt failed submissions when online
 */
self.addEventListener('sync', (event) => {
  console.log('[SW] Background sync:', event.tag);

  if (event.tag === 'contact-form-sync') {
    event.waitUntil(syncContactForm());
  }
});

/**
 * Sync contact form submissions
 */
async function syncContactForm() {
  // TODO: Implement form queue and retry logic
  console.log('[SW] Syncing contact forms...');
}

/**
 * Push Notifications (future feature)
 */
self.addEventListener('push', (event) => {
  console.log('[SW] Push received:', event);

  const options = {
    body: event.data?.text() || 'Neue Nachricht von Cinar Grill',
    icon: '/assets/img/icon-192.png',
    badge: '/assets/img/badge-72.png',
    vibrate: [200, 100, 200],
    tag: 'cinar-grill-notification',
    requireInteraction: false,
  };

  event.waitUntil(
    self.registration.showNotification('Cinar Grill', options)
  );
});

/**
 * Notification Click
 */
self.addEventListener('notificationclick', (event) => {
  console.log('[SW] Notification clicked:', event);

  event.notification.close();

  event.waitUntil(
    clients.openWindow('/')
  );
});
