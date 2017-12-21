const urlsToCache = [
    '/bootstrap/css/bootstrap.min.css',
    '/bootstrap/css/custom.min.css',
    '/acn-element.html',
    '/acn-content.html'
];

self.addEventListener('install', event => {
  console.log('instalowanie serviceworker');

  event.waitUntil(
    caches.open('static').then((cache) => {
        urlsToCache.forEach((url) => {
            cache.add(url);
        });
    });
  );
});

self.addEventListener('activate', event => {
  console.log('sw gotowy');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin == location.origin && urlsToCache.contains(url.pathname)) {
    event.respondWith(caches.match(url.pathname)));
  }
});
