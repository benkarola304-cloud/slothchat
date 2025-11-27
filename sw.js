const CACHE_NAME = 'sloth-im-v3';
const ASSETS = [
    './',
    './index.html',
    './manifest.json',
    'https://unpkg.com/peerjs@1.5.2/dist/peerjs.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/qrcodejs/1.0.0/qrcode.min.js',
    'https://unpkg.com/html5-qrcode',
    'https://cdn-icons-png.flaticon.com/512/3750/3750019.png'
];

// 安装：缓存所有核心文件
self.addEventListener('install', e => {
    self.skipWaiting(); // 强制立即生效
    e.waitUntil(caches.open(CACHE_NAME).then(c => c.addAll(ASSETS)));
});

// 激活：清理旧版本缓存
self.addEventListener('activate', e => {
    e.waitUntil(
        caches.keys().then(keys => Promise.all(
            keys.map(key => {
                if (key !== CACHE_NAME) return caches.delete(key);
            })
        ))
    );
});

// 拦截请求：优先读取缓存，实现离线访问
self.addEventListener('fetch', e => {
    e.respondWith(
        caches.match(e.request).then(res => res || fetch(e.request))
    );
});
