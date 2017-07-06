// 安装
var cacheName = 'app-abc-1123-v001'
self.addEventListener('install', function (event) {
  event.waitUntil(
    // 获取缓存信息
    caches.open(cacheName).then(function (cache) {
    })
  )
})

self.addEventListener('activate', function (event) {
});

self.addEventListener('fetch', function (event) {
  console.log(event.request);
});

// 强制 installing -> activate
self.skipWaiting()

//
self.clients.claim()

//
self.clients.matchAll()

self.location

self.registration