// MindMesh AI - Service Worker for Push Notifications

const CACHE_NAME = 'mindmesh-v1';
const urlsToCache = [
  '/',
  '/index.html',
];

// Install event
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => cache.addAll(urlsToCache))
  );
  self.skipWaiting();
});

// Activate event
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((cacheName) => cacheName !== CACHE_NAME)
          .map((cacheName) => caches.delete(cacheName))
      );
    })
  );
  self.clients.claim();
});

// Push event - Handle incoming push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: 'You have a new notification',
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      { action: 'explore', title: 'Open App' },
      { action: 'close', title: 'Dismiss' }
    ]
  };

  if (event.data) {
    try {
      const data = event.data.json();
      options.body = data.body || options.body;
      options.title = data.title || 'MindMesh AI';
      if (data.data) options.data = { ...options.data, ...data.data };
    } catch (e) {
      options.body = event.data.text();
    }
  }

  event.waitUntil(
    self.registration.showNotification('MindMesh AI', options)
  );
});

// Notification click event
self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  if (event.action === 'explore') {
    event.waitUntil(
      clients.matchAll({ type: 'window' }).then((clientList) => {
        for (const client of clientList) {
          if (client.url === '/' && 'focus' in client) {
            return client.focus();
          }
        }
        if (clients.openWindow) {
          return clients.openWindow('/dashboard');
        }
      })
    );
  }
});

// Background sync for goal reminders
self.addEventListener('sync', (event) => {
  if (event.tag === 'goal-reminder') {
    event.waitUntil(checkGoalReminders());
  }
});

async function checkGoalReminders() {
  // This would typically fetch from the server
  console.log('Checking goal reminders...');
}

// Periodic sync for scheduled notifications
self.addEventListener('periodicsync', (event) => {
  if (event.tag === 'check-goals') {
    event.waitUntil(checkGoalReminders());
  }
});
