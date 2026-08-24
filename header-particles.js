/* ==========================================================================
   BRUSAN · Header overlay: ThreeUI Predictive Arc — signal-particles
   Port of @designcodeio/threeui SignalParticles (canvas 2D, transparent).
   Props match the published demo: mode dark, speed 0.96, hue -4,
   saturation 0.95, brightness 0.98.
   ========================================================================== */

(function () {
  const canvas = document.getElementById("gl-canvas");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const SPEED = 0.96;
  const SPACING = 16;
  const DOT_RADIUS = 1.5;

  let width = 0;
  let height = 0;
  let time = 0;
  let raf = 0;
  let visible = true;

  function resize() {
    const parent = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const nextW = parent ? parent.clientWidth : window.innerWidth;
    const nextH = parent ? parent.clientHeight : window.innerHeight;
    canvas.width = Math.max(1, Math.floor(nextW * dpr));
    canvas.height = Math.max(1, Math.floor(nextH * dpr));
    canvas.style.width = nextW + "px";
    canvas.style.height = nextH + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    width = nextW;
    height = nextH;
  }

  function draw() {
    raf = 0;
    if (!visible || document.hidden) return;

    ctx.clearRect(0, 0, width, height);

    const cols = Math.floor(width / SPACING);
    const rows = Math.floor(height / SPACING);
    const offsetX = (width - cols * SPACING) / 2;
    const offsetY = (height - rows * SPACING) / 2;

    for (let i = 0; i <= cols; i++) {
      for (let j = 0; j <= rows; j++) {
        const x = offsetX + i * SPACING;
        const y = offsetY + j * SPACING;
        const nx = i * 0.1;
        const ny = j * 0.1;
        const wave1 = Math.sin(nx + time * 0.5) * Math.cos(ny - time * 0.3);
        const wave2 = Math.sin(nx * 0.5 - ny * 0.5 + time * 0.8);
        const value = wave1 + wave2;

        if (value > 0.1) {
          ctx.beginPath();
          ctx.arc(x, y, DOT_RADIUS, 0, Math.PI * 2);

          const highlightCheck = Math.sin(i * 12.34) * Math.cos(j * 56.78);
          if (highlightCheck > 0.98) {
            ctx.fillStyle = "#3b82f6";
          } else if (highlightCheck < -0.98) {
            ctx.fillStyle = "#8b5cf6";
          } else {
            const alpha = Math.min(0.6, (value - 0.1) * 0.8);
            ctx.fillStyle = "rgba(148, 163, 184, " + alpha + ")";
          }
          ctx.fill();
        }
      }
    }

    time += 0.02 * SPEED;
    raf = requestAnimationFrame(draw);
  }

  function start() {
    if (!raf && visible && !document.hidden) {
      raf = requestAnimationFrame(draw);
    }
  }

  function stop() {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  resize();
  window.addEventListener("resize", resize);

  if (typeof IntersectionObserver === "function") {
    const io = new IntersectionObserver(function (entries) {
      visible = !!(entries[0] && entries[0].isIntersecting);
      if (visible) start();
      else stop();
    });
    io.observe(canvas.parentElement || canvas);
  }

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) stop();
    else start();
  });

  start();
})();
