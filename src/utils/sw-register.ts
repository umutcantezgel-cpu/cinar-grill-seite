/**
 * Service Worker Registration
 * Registers SW with proper lifecycle management
 */

export async function registerServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    console.log('[SW] Service Workers not supported');
    return;
  }

  try {
    // Register service worker
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
    });

    console.log('[SW] Registered with scope:', registration.scope);

    // Handle updates
    registration.addEventListener('updatefound', () => {
      const newWorker = registration.installing;
      if (!newWorker) return;

      newWorker.addEventListener('statechange', () => {
        if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
          // New SW available, prompt user to refresh
          console.log('[SW] New version available');

          // Show update notification (optional)
          showUpdateNotification();
        }
      });
    });

    // Handle controller change (SW activated)
    navigator.serviceWorker.addEventListener('controllerchange', () => {
      console.log('[SW] Controller changed, reloading page');
      window.location.reload();
    });

    return registration;
  } catch (error) {
    console.error('[SW] Registration failed:', error);
  }
}

/**
 * Show update notification to user
 */
function showUpdateNotification() {
  // Simple notification (can be replaced with custom UI)
  if (confirm('Eine neue Version der Webseite ist verfügbar. Jetzt aktualisieren?')) {
    // Skip waiting and activate new SW
    navigator.serviceWorker.ready.then((registration) => {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
    });
  }
}

/**
 * Unregister service worker (for debugging)
 */
export async function unregisterServiceWorker() {
  if (!('serviceWorker' in navigator)) {
    return;
  }

  try {
    const registration = await navigator.serviceWorker.ready;
    await registration.unregister();
    console.log('[SW] Unregistered');

    // Clear caches
    const cacheNames = await caches.keys();
    await Promise.all(cacheNames.map((name) => caches.delete(name)));
    console.log('[SW] Caches cleared');
  } catch (error) {
    console.error('[SW] Unregistration failed:', error);
  }
}
