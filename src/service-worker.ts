/// <reference types="@sveltejs/kit" />
/// <reference lib="webworker" />

declare let self: ServiceWorkerGlobalScope

import { build, files, version } from '$service-worker';

const CACHE = `cache-${version}`;

const ASSETS = [
    ...build, // the app itself
    ...files  // everything in `static`
];

// Install service worker
self.addEventListener('install', (event) => {
    // Create a new cache and add all files to it
    async function addFilesToCache() {
        const cache = await caches.open(CACHE);
        await cache.addAll(ASSETS);
    }

    event.waitUntil(addFilesToCache());
});

// Activate service worker
self.addEventListener('activate', (event) => {
    // Remove previous cached data from disk
    async function deleteOldCaches() {
        for (const key of await caches.keys()) {
            if (key !== CACHE) await caches.delete(key);
        }
    }

    event.waitUntil(deleteOldCaches());
});

// Listen to fetch events
self.addEventListener('fetch', (event) => {
    // ignore POST requests etc
    if (event.request.method !== 'GET') return;

    async function respond() {
        const url = new URL(event.request.url);
        const cache = await caches.open(CACHE);

        // `build`/`files` can always be served from the cache
        if (ASSETS.includes(url.pathname)) {
            const response = await cache.match(url.pathname);

            if (response) {
                return response;
            }
        }

        // Images are dynamically cached and can be loaded from cache the 2nd time onwards
        if (url.pathname.includes('/foodItems/foodItem_')) {
            const cached_response = await cache.match(url.pathname);

            if (cached_response) {
                return cached_response;
            }
        }

        // for everything else, try the network first
        try {
            const response = await fetch(event.request);

            // if we're offline, fetch can return a value that is not a Response
            // instead of throwing - and we can't pass this non-Response to respondWith
            if (!(response instanceof Response)) {
                throw new Error('invalid response from fetch');
            }

            if (response.status === 200) {
                cache.put(event.request, response.clone());
            }

            return response;
        } catch (err) {
            throw err;
        }
    }

    event.respondWith(respond());
});

self.addEventListener("message", event => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting()
    }
})