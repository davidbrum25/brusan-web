/* ==========================================================================
   BRUSAN · Header background video, scrubbed by page scroll
   Scroll down → play forward. Scroll up → reverse. Never autoplays.
   ========================================================================== */

(function () {
  const video = document.getElementById("hero-bg-video");
  const header = document.getElementById("inicio");
  if (!video || !header) return;

  let duration = 0;
  let ticking = false;

  function clamp01(n) {
    return n < 0 ? 0 : n > 1 ? 1 : n;
  }

  function targetTime() {
    if (!duration) return 0;
    const range = Math.max(1, header.offsetHeight);
    return clamp01(window.scrollY / range) * duration;
  }

  function apply() {
    ticking = false;
    if (!duration) return;
    const next = targetTime();
    if (Math.abs(video.currentTime - next) < 1 / 60) return;
    try {
      video.currentTime = next;
    } catch (e) {
      /* metadata not ready */
    }
  }

  function onScroll() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(apply);
    }
  }

  function unlockDecoder() {
    video.muted = true;
    const play = video.play();
    if (play && typeof play.then === "function") {
      play
        .then(function () {
          video.pause();
          video.removeAttribute("poster");
          apply();
        })
        .catch(function () {
          apply();
        });
    } else {
      video.pause();
      apply();
    }
  }

  function arm() {
    duration = video.duration || 0;
    if (!duration || !isFinite(duration)) return;
    video.pause();
    unlockDecoder();
  }

  video.preload = "auto";
  video.muted = true;
  video.defaultMuted = true;
  video.playsInline = true;
  video.setAttribute("playsinline", "");
  video.setAttribute("webkit-playsinline", "");
  video.autoplay = false;
  video.loop = false;
  video.controls = false;

  video.addEventListener("seeked", function () {
    if (Math.abs(video.currentTime - targetTime()) >= 1 / 60) apply();
  });

  if (video.readyState >= 1) arm();
  video.addEventListener("loadedmetadata", arm);
  video.addEventListener("durationchange", arm);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll, { passive: true });
  document.addEventListener("scroll", onScroll, { passive: true });
})();
