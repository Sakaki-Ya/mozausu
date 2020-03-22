importScripts(
  "https://storage.googleapis.com/workbox-cdn/releases/4.3.1/workbox-sw.js"
);

workbox.precaching.precacheAndRoute([
  "script/lib/anime.js",
  "script/lib/doubletap.js",
  "script/lib/fabric.js",
  "script/lib/jquery.js",
  "script/lib/ripple.js",
  "script/script.min.js",
  "style/bulma.min.css",
  "style/bulma-slider.min.css",
  "style/style.css",
  "manifest.json"
]);

self.addEventListener("fetch", function(e) {});
