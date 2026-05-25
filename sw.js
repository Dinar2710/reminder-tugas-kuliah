const CACHE = 'rtk-v2';
const FILES = [
  '/reminder-tugas-kuliah/',
  '/reminder-tugas-kuliah/index.html',
  '/reminder-tugas-kuliah/manifest.json',
  '/reminder-tugas-kuliah/icon-192.png',
  '/reminder-tugas-kuliah/icon-512.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(CACHE).then(c => c.addAll(FILES)));
  self.skipWaiting();
});

self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ));
  self.clients.claim();
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(r => r || fetch(e.request))
  );
});
