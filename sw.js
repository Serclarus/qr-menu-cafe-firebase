// Service Worker for QR Menu PWA
const CACHE_NAME = 'qr-menu-v1.0.0';
const STATIC_CACHE = 'static-v1.0.0';
const DYNAMIC_CACHE = 'dynamic-v1.0.0';

// Files to cache for offline functionality
const STATIC_FILES = [
    '/',
    '/index.html',
    '/css/styles.css',
    '/js/app.js',
    '/manifest.json',
    '/icons/icon-192x192.png',
    '/icons/icon-512x512.png',
    'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap'
];

// API endpoints to cache
const API_ENDPOINTS = [
    '/api/menu',
    '/api/categories',
    '/api/cafe-info'
];

// Install event - cache static files
self.addEventListener('install', event => {
    console.log('Service Worker: Installing...');
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then(cache => {
                console.log('Service Worker: Caching static files');
                return cache.addAll(STATIC_FILES);
            })
            .then(() => {
                console.log('Service Worker: Static files cached');
                return self.skipWaiting();
            })
            .catch(error => {
                console.error('Service Worker: Error caching static files', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', event => {
    console.log('Service Worker: Activating...');
    event.waitUntil(
        caches.keys()
            .then(cacheNames => {
                return Promise.all(
                    cacheNames.map(cacheName => {
                        if (cacheName !== STATIC_CACHE && cacheName !== DYNAMIC_CACHE) {
                            console.log('Service Worker: Deleting old cache', cacheName);
                            return caches.delete(cacheName);
                        }
                    })
                );
            })
            .then(() => {
                console.log('Service Worker: Activated');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', event => {
    const { request } = event;
    const url = new URL(request.url);

    // Handle API requests with network-first strategy
    if (API_ENDPOINTS.some(endpoint => url.pathname.includes(endpoint))) {
        event.respondWith(networkFirstStrategy(request));
        return;
    }

    // Handle static files with cache-first strategy
    if (request.method === 'GET') {
        event.respondWith(cacheFirstStrategy(request));
        return;
    }

    // For other requests, use network
    event.respondWith(fetch(request));
});

// Cache-first strategy for static files
async function cacheFirstStrategy(request) {
    try {
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }

        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(STATIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.error('Cache-first strategy failed:', error);
        return new Response('Offline content not available', {
            status: 503,
            statusText: 'Service Unavailable'
        });
    }
}

// Network-first strategy for API requests
async function networkFirstStrategy(request) {
    try {
        const networkResponse = await fetch(request);
        if (networkResponse.ok) {
            const cache = await caches.open(DYNAMIC_CACHE);
            cache.put(request, networkResponse.clone());
        }
        return networkResponse;
    } catch (error) {
        console.log('Network failed, trying cache:', error);
        const cachedResponse = await caches.match(request);
        if (cachedResponse) {
            return cachedResponse;
        }
        
        // Return offline fallback for API requests
        return new Response(JSON.stringify({
            error: 'Offline',
            message: 'İnternet bağlantısı yok. Lütfen bağlantınızı kontrol edin.'
        }), {
            status: 503,
            statusText: 'Service Unavailable',
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}

// Background sync for offline actions
self.addEventListener('sync', event => {
    if (event.tag === 'background-sync') {
        event.waitUntil(doBackgroundSync());
    }
});

async function doBackgroundSync() {
    console.log('Service Worker: Background sync');
    // Handle any pending offline actions here
}

// Push notifications (for future use)
self.addEventListener('push', event => {
    if (event.data) {
        const data = event.data.json();
        const options = {
            body: data.body,
            icon: '/icons/icon-192x192.png',
            badge: '/icons/icon-72x72.png',
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: 1
            },
            actions: [
                {
                    action: 'explore',
                    title: 'Menüyü Görüntüle',
                    icon: '/icons/icon-192x192.png'
                },
                {
                    action: 'close',
                    title: 'Kapat',
                    icon: '/icons/icon-192x192.png'
                }
            ]
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
        );
    }
});

// Notification click handler
self.addEventListener('notificationclick', event => {
    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler for communication with main thread
self.addEventListener('message', event => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});

// Periodic background sync (if supported)
self.addEventListener('periodicsync', event => {
    if (event.tag === 'content-sync') {
        event.waitUntil(updateContent());
    }
});

async function updateContent() {
    console.log('Service Worker: Periodic sync');
    // Update cached content periodically
    try {
        const cache = await caches.open(DYNAMIC_CACHE);
        for (const endpoint of API_ENDPOINTS) {
            try {
                const response = await fetch(endpoint);
                if (response.ok) {
                    await cache.put(endpoint, response);
                }
            } catch (error) {
                console.log('Failed to update', endpoint, error);
            }
        }
    } catch (error) {
        console.error('Periodic sync failed:', error);
    }
}
