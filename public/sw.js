this.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open("v1").then((cache) => {
      return cache.addAll([
        "/",
        "/index.html",
        "/faq",
        "/auth/login",
        "/auth/register",
        "/auth/forgotpassword",
        "/manifest.json",
        "/auth/manifest.json",
        "/main.css",
        "/logo.ico",
        "/auth/logo.ico",
        "/logo.png",
        "/static/js/bundle.js",
        "/static/media/logo.97567b1efc35069a48d7.png",
        "/user/profile",
        "/user/manifest.json",
        "/404"
      ]);
    })
  );
});

this.addEventListener("fetch", (event) => {
  if (!navigator.onLine) {
    event.respondWith(
      caches.match(event.request).then((response) => {
        if (response) {
          return response;
        } else {
          return fetch(event.request);
        }
      })
    );
  }
});

this.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (cacheName !== "v1") {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

this.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});
