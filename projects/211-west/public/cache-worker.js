self.addEventListener('fetch', (event) => {
  if (/\.jpg$|.png$|.gif$|.webp$/.test(event.request.url)) {
    event.respondWith(
      caches.match(event.request).then((cachedResponse) => {
        if (cachedResponse) {
          return cachedResponse;
        }
        return fetch(event.request).then((response) =>
          caches
            .open('image-cache')
            .then((cache) =>
              cache.put(event.request, response.clone()).then(() => response)
            )
        );
      })
    );
  }
});
