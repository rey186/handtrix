// HANDTRIX service worker. Subí el número de VERSION cuando cambies este archivo.
const VERSION = '20261122-1524';
const CACHE = "handtrix-" + VERSION;
const CORE = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png"];
self.addEventListener("install", e => {
  e.waitUntil(caches.open(CACHE).then(c => Promise.all(CORE.map(u => c.add(u).catch(() => null)))).then(() => self.skipWaiting()));
});
self.addEventListener("activate", e => {
  e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k.startsWith("handtrix-") && k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
const isHeavy = url => /\/vendor\//.test(url.pathname) || /three\.module\.js$/.test(url.pathname) || /\.glb$/.test(url.pathname);
self.addEventListener("fetch", e => {
  const req = e.request; if (req.method !== "GET") return;
  const url = new URL(req.url); if (url.origin !== location.origin) return;   // Supabase, CDN, etc. van directo a la red
  if (isHeavy(url)) {   // modelo de manos y three.js: primero caché (pesan mucho)
    e.respondWith(caches.open(CACHE).then(async c => { const hit = await c.match(req); if (hit) return hit; const r = await fetch(req); if (r.ok) c.put(req, r.clone()); return r; }));
    return;
  }
  e.respondWith(fetch(req, { cache: "no-cache" }).then(r => { if (r.ok) { const copy = r.clone(); caches.open(CACHE).then(c => c.put(req, copy)); } return r; }).catch(() => caches.match(req).then(h => h || caches.match("./index.html"))));   // lo demás: primero red (ves cambios al instante), caché si no hay conexión
});
