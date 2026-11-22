/* Service worker: lets the app work offline and be installed on the home screen.

   How it works, in plain words:
   - The version comes from the address the page registers it with: service-worker.js?v=0.5.5
     (index.html passes APP_VERSION). A new APP_VERSION = a new cache name, and old caches are deleted.
   - "Network first": when online, every file is downloaded fresh (so you always get the newest app
     and words.json) and a copy is saved. When offline, the saved copy is used.
   - The handwriting font (Arti) is embedded in index.html, so caching index.html caches the font too. */

const VERSION = new URL(self.location).searchParams.get('v') || 'dev';
const CACHE = 'barer-' + VERSION;
const FILES = [
  './',
  'index.html',
  'words.json',
  'manifest.json',
  'icons/icon-192.png',
  'icons/icon-512.png',
  'icons/icon-192-maskable.png',
  'icons/icon-512-maskable.png',
  'icons/apple-touch-icon.png',
  'icons/favicon-32.png'
];

// install: download all files into the new cache
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE)
      .then(cache => cache.addAll(FILES.map(f => new Request(f, { cache: 'reload' }))))
      .then(() => self.skipWaiting())
  );
});

// activate: delete caches of older versions
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k.startsWith('barer-') && k !== CACHE).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

// fetch: network first, fall back to the cache when offline
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  event.respondWith(
    fetch(req,{cache:'no-cache'})   // ask the server if the file changed (skip the browser's 10-minute HTTP cache)
      .then(res => {
        if (res.ok) {
          const copy = res.clone();
          caches.open(CACHE).then(cache => cache.put(req, copy));
        }
        return res;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true })
          .then(hit => hit || (req.mode === 'navigate' ? caches.match('./') : undefined))
          .then(hit => hit || new Response('Offline', { status: 503, statusText: 'Offline' }))
      )
  );
});
