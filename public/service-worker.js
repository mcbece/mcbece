importScripts("https://storage.googleapis.com/workbox-cdn/releases/6.4.2/workbox-sw.js")
importScripts("./__version.js")

self.addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") self.skipWaiting()
})

workbox.core.setCacheNameDetails({
    prefix: "@pfis1737/mcbece"
})

workbox.precaching.precacheAndRoute(__version.content)

workbox.routing.registerRoute(
    /.*\.(?:png|jpg|jpeg|svg|gif|webp)(?:\?.*)?$/,
    new workbox.strategies.CacheFirst({
        cacheName: "image-cache",
        plugins: [
            new workbox.expiration.ExpirationPlugin({
                maxEntries: 20,
                maxAgeSeconds: 365 * 24 * 60 * 60
            })
        ]
    }),
    "GET"
)
workbox.routing.registerRoute(
    /^https:\/\/cdn\.jsdelivr\.net\/(?:.*)/,
    new workbox.strategies.StaleWhileRevalidate({
        cacheName: "jsdelivr-cache"
    }),
    "GET"
)
