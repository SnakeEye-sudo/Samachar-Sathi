// SamacharSathi — Service Worker v1
// Offline-first caching + Push Notifications

const CACHE_NAME = 'samachar-sathi-v1';
const BASE = '/Samachar-Sathi';
const ASSETS = [
  `${BASE}/`,
  `${BASE}/index.html`,
  `${BASE}/logo.png`,
  `${BASE}/manifest.json`,
];

// Install: cache core assets
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(ASSETS).catch(() => {}))
  );
  self.skipWaiting();
});

// Activate: clean old caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch: network-first for API/news, cache-first for static assets
self.addEventListener('fetch', event => {
  const { request } = event;
  if (request.method !== 'GET' || !request.url.startsWith(self.location.origin)) return;

  const url = new URL(request.url);
  // Network-first for news JSON and API calls
  if (url.pathname.includes('/news/') || url.pathname.includes('/api/')) {
    event.respondWith(
      fetch(request)
        .then(res => {
          const clone = res.clone();
          caches.open(CACHE_NAME).then(c => c.put(request, clone));
          return res;
        })
        .catch(() => caches.match(request))
    );
    return;
  }

  // Cache-first for static assets
  event.respondWith(
    caches.match(request).then(cached => {
      if (cached) return cached;
      return fetch(request).then(response => {
        if (!response || response.status !== 200 || response.type === 'opaque') return response;
        const clone = response.clone();
        caches.open(CACHE_NAME).then(c => c.put(request, clone));
        return response;
      }).catch(() => {
        if (request.mode === 'navigate') return caches.match(`${BASE}/index.html`);
      });
    })
  );
});

// ── Push Notification handler ─────────────────────────────────
self.addEventListener('push', event => {
  const data = event.data ? event.data.json() : {};
  const title = data.title || 'SamacharSathi';
  const options = {
    body: data.body || 'Aaj ka news analysis ready hai!',
    icon: `${BASE}/logo.png`,
    badge: `${BASE}/logo.png`,
    tag: data.tag || 'ss-news',
    data: { url: data.url || `${BASE}/` },
    actions: [
      { action: 'open', title: '📰 Padhein' },
      { action: 'dismiss', title: 'Baad mein' }
    ],
    vibrate: [200, 100, 200]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', event => {
  event.notification.close();
  if (event.action === 'dismiss') return;
  const url = event.notification.data?.url || `${BASE}/`;
  event.waitUntil(clients.openWindow(url));
});

// ── Message handler ───────────────────────────────────────────
self.addEventListener('message', event => {
  if (event.data?.type === 'SCHEDULE_NEWS_NOTIF') {
    const { userName, time } = event.data;
    self.registration.showNotification('🔔 SamacharSathi Notifications ON!', {
      body: `${userName ? userName + ', ' : ''}daily news reminders set ho gaye! (${time || '7:00 AM'})`,
      icon: `${BASE}/logo.png`,
      tag: 'ss-notif-confirm',
    });
  }
  if (event.data?.type === 'DAILY_NEWS_REMINDER') {
    const { userName } = event.data;
    self.registration.showNotification('📰 Aaj ka News Analysis Ready!', {
      body: `${userName || 'Yaar'}, aaj ki important news analysis padhne ka time ho gaya!`,
      icon: `${BASE}/logo.png`,
      badge: `${BASE}/logo.png`,
      tag: 'ss-daily',
      data: { url: `${BASE}/` },
      actions: [
        { action: 'open', title: '📰 Abhi Padhein' },
        { action: 'dismiss', title: 'Baad mein' }
      ]
    });
  }
});
