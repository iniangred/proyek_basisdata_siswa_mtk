const CACHE_NAME = 'sam-assistant-v1';
const urlsToCache = [
  './siswa.html',
  './kelas.html',
  './kurikulum.html',
  './jurnal.html',
  './logo.png'
];

// Saat aplikasi pertama kali diinstal
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Saat aplikasi dibuka ulang (Bisa jalan tanpa internet!)
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Gunakan file dari cache
        }
        return fetch(event.request); // Ambil dari internet jika belum ada
      })
  );
});