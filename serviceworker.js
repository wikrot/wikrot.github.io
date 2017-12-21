const urlsToCache = [
    '/bootstrap/css/bootstrap.min.css',
    '/bootstrap/css/custom.min.css',
    '/acn-element.html',
    '/acn-content.html'];

self.addEventListener('install', (event) => {
  console.log('instalowanie serviceworker');

  event.waitUntil(
    caches.open('static').then((cache) => {
        for (let i = 0; i < urlsToCache.length; i++) {
            cache.add(urlsToCache[i]);
        }
    })
  );

});

self.addEventListener('activate', event => {
  console.log('sw gotowy');
});

self.addEventListener('fetch', event => {
  const url = new URL(event.request.url);

  if (url.origin == location.origin && urlsToCache.indexOf(url.pathname) > -1) {
    event.respondWith(caches.match(url.pathname));
  }
});
