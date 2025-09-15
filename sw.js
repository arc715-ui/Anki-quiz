const CACHE = "quiz-cache-v1";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  // 画像アイコン等があればここに追記: "./icon-192.png", "./icon-512.png"
];

// インストール時にプリキャッシュ
self.addEventListener("install", (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(ASSETS)));
});

// ネット優先→失敗時キャッシュ（またはキャッシュ優先でもOK）
self.addEventListener("fetch", (e) => {
  e.respondWith(
    fetch(e.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(e.request, copy));
        return res;
      })
      .catch(() => caches.match(e.request))
  );
});
