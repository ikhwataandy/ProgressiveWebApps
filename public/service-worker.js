importScripts('https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js');

if (workbox) {
    console.log(`Workbox berhasil dimuat`);

} else {
    console.log(`Workbox gagal dimuat`);
}

workbox.precaching.precacheAndRoute([
    "/",
    "/index.html",
    "/nav.html",
    "/main.js",
    "/db.js",
    "/idb.js",
    "/app.js",
    "/pages/favourite.html",
    "/pages/home.html",
    "/pages/teamlist.html",
    "/pages/jadwal.html",
    "/js/api.js",
    "/js/nav.js",
    "/js/materialize.min.js",
    "/css/materialize.min.css",
    "/icon.png",
]);

workbox.routing.registerRoute(
    /\.(?:png|gif|jpg|jpeg|svg)$/,
    new workbox.strategies.CacheFirst({
        cacheName: 'images',
        plugins: [
            new workbox.expiration.Plugin({
                maxEntries: 70,
                maxAgeSeconds: 30 * 24 * 60 * 60,
            })
        ]
    })
);

workbox.routing.registerRoute(
    new RegExp("https://api.football-data.org/v2/"),
    new workbox.strategies.StaleWhileRevalidate(),
    new workbox.cacheableResponse.Plugin({
        statuses: [200],
    }),
    new workbox.expiration.Plugin({
        maxAgeSeconds: 60 * 60 * 24 * 365,
        maxEntries: 30,
    }),

)


self.addEventListener('push', function(event) {
    var body;
    if (event.data) {
        body = event.data.text();
    } else {
        body = 'Push message no payload';
    }
    var options = {
        body: body,
        icon: '/icon.png',
        vibrate: [100, 50, 100],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        }
    };
    event.waitUntil(
        self.registration.showNotification('Push Notification', options)
    );
});