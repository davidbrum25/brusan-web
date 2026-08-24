/* ==========================================================================
   BRUSAN · "Qué hacemos" background: ThreeUI LaserCollection
   variant matrix-field (https://threeui.com/backgrounds/matrix-field/matrix-field)
   Knobs: speed 0.95, size 0.99, length 0.96, density 0.98, opacity 1,
   hue 0, saturation 0, brightness 0.98
   ========================================================================== */

(function () {
  const canvas = document.getElementById("services-bg-canvas");
  if (!canvas) return;

  const glOpts = { alpha: true, premultipliedAlpha: false, antialias: false };
  const gl = canvas.getContext("webgl", glOpts) || canvas.getContext("experimental-webgl", glOpts);
  if (!gl) return;

  const SPEED = 0.95;
  const SIZE = 0.99;
  const LENGTH = 0.96;
  const INTENSITY = (0.006 * SIZE * LENGTH).toFixed(5);

  const vsSource = `
    attribute vec4 aVertexPosition;
    void main() {
      gl_Position = aVertexPosition;
    }
  `;

  const fsSource = `
    precision highp float;
    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_mouseActive;

    float hash(float n) { return fract(sin(n)*753.5453123); }
    float noise(float x) {
      float i = floor(x);
      float f = fract(x);
      f = f*f*(3.0-2.0*f);
      return mix(hash(i), hash(i+1.0), f);
    }

    vec2 sdLine(vec2 p, vec2 a, vec2 b) {
      vec2 pa = p - a, ba = b - a;
      float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
      return vec2(length(pa - ba * h), h);
    }

    float lightning(vec2 uv, vec2 a, vec2 b, float t) {
      vec2 ab = b - a;
      float len = length(ab);
      if(len < 0.01) return 0.0;
      vec2 dir = ab / len;
      vec2 pa = uv - a;
      float h = clamp(dot(pa, dir) / len, 0.0, 1.0);
      float dist = length(pa - dir * (h * len));
      float env = sin(h * 3.1415);
      float offset = (noise(h * 25.0 - t * 35.0) - 0.5) * 0.08 * env;
      offset += (noise(h * 70.0 + t * 50.0) - 0.5) * 0.02 * env;
      float d = abs(dist + offset);
      return (0.0002 / (d + 0.0002) + 0.00001 / (d*d + 0.00001)) * env;
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      uv = uv * 2.0 - 1.0;
      uv.x *= u_resolution.x / u_resolution.y;

      vec2 mouseUV = u_mouse / u_resolution.xy;
      mouseUV = mouseUV * 2.0 - 1.0;
      mouseUV.x *= u_resolution.x / u_resolution.y;

      vec2 center = vec2(-0.8, -0.2);
      center.x += sin(u_time * 0.4) * 0.03;
      center.y += cos(u_time * 0.3) * 0.03;

      vec2 dirUp = normalize(vec2(0.15, 1.0));
      vec2 dirRight = normalize(vec2(1.0, -0.25));
      vec2 dirDownLeft = normalize(vec2(-0.8, -0.6));

      vec2 l1 = sdLine(uv, center, center + dirUp * 5.0);
      vec2 l2 = sdLine(uv, center, center + dirRight * 5.0);
      vec2 l3 = sdLine(uv, center, center + dirDownLeft * 5.0);

      float intensity = ${INTENSITY};
      float glow = intensity / (l1.x + 0.001) +
                   intensity / (l2.x + 0.001) +
                   (intensity * 0.4) / (l3.x + 0.001);

      float pulse1 = smoothstep(0.1, 0.0, abs(l1.y - fract(u_time * 0.4))) * 0.03 / (l1.x + 0.001);
      float pulse2 = smoothstep(0.1, 0.0, abs(l2.y - fract(u_time * 0.5 + 0.3))) * 0.03 / (l2.x + 0.001);
      float pulse3 = smoothstep(0.1, 0.0, abs(l3.y - fract(u_time * 0.3 + 0.7))) * 0.015 / (l3.x + 0.001);
      glow += pulse1 + pulse2 + pulse3;

      vec2 p1 = center + dirUp * clamp(dot(mouseUV - center, dirUp), 0.0, 5.0);
      vec2 p2 = center + dirRight * clamp(dot(mouseUV - center, dirRight), 0.0, 5.0);
      vec2 p3 = center + dirDownLeft * clamp(dot(mouseUV - center, dirDownLeft), 0.0, 5.0);

      float lgt1 = lightning(uv, p1, mouseUV, u_time);
      float lgt2 = lightning(uv, p2, mouseUV, u_time + 10.0);
      float lgt3 = lightning(uv, p3, mouseUV, u_time + 20.0);

      float flicker = step(0.1, noise(u_time * 60.0)) * (noise(u_time * 150.0) * 0.8 + 0.2);

      float d1 = length(mouseUV - p1);
      float d2 = length(mouseUV - p2);
      float d3 = length(mouseUV - p3);

      glow += lgt1 * smoothstep(2.0, 0.0, d1) * u_mouseActive * flicker;
      glow += lgt2 * smoothstep(2.0, 0.0, d2) * u_mouseActive * flicker;
      glow += lgt3 * smoothstep(2.0, 0.0, d3) * u_mouseActive * flicker;

      float distToCenter = length(uv - center);
      glow += 0.04 / (distToCenter + 0.01);

      vec3 baseColor = vec3(0.6, 0.75, 1.0);
      vec3 finalColor = baseColor * glow;
      finalColor *= 0.85 + 0.15 * sin(u_time * 2.0 - distToCenter * 8.0);

      float vignette = 1.0 - smoothstep(0.4, 2.0, length(uv));
      finalColor *= vignette;

      float n = fract(sin(dot(gl_FragCoord.xy, vec2(12.9898, 78.233))) * 43758.5453);
      finalColor += n * 0.02;

      vec2 edgeUV = gl_FragCoord.xy / u_resolution.xy;
      float edgeX = smoothstep(0.0, 0.08, edgeUV.x) * smoothstep(1.0, 0.92, edgeUV.x);
      float edgeY = smoothstep(0.0, 0.1, edgeUV.y) * smoothstep(1.0, 0.9, edgeUV.y);
      float edge = edgeX * edgeY;
      finalColor *= edge;

      float alpha = clamp(dot(finalColor, vec3(0.299, 0.587, 0.114)) * 1.65, 0.0, 1.0) * edge;
      gl_FragColor = vec4(finalColor, alpha);
    }
  `;

  function compile(type, source) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn("services-matrix shader:", gl.getShaderInfoLog(shader));
      return null;
    }
    return shader;
  }

  const program = gl.createProgram();
  const vs = compile(gl.VERTEX_SHADER, vsSource);
  const fs = compile(gl.FRAGMENT_SHADER, fsSource);
  if (!vs || !fs) return;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;

  const aPos = gl.getAttribLocation(program, "aVertexPosition");
  const uResolution = gl.getUniformLocation(program, "u_resolution");
  const uTime = gl.getUniformLocation(program, "u_time");
  const uMouse = gl.getUniformLocation(program, "u_mouse");
  const uMouseActive = gl.getUniformLocation(program, "u_mouseActive");

  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([1, 1, -1, 1, 1, -1, -1, -1]), gl.STATIC_DRAW);

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  let mouseX = -1000;
  let mouseY = -1000;
  let lastMouseMove = 0;
  let currentMouseActive = 0;
  let startTime = performance.now();
  let raf = 0;
  let visible = true;

  function resize() {
    const parent = canvas.parentElement;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = parent ? parent.clientWidth : canvas.clientWidth;
    const h = parent ? parent.clientHeight : canvas.clientHeight;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function render(now) {
    raf = 0;
    if (!visible || document.hidden) return;

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.useProgram(program);

    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const sinceMove = now - lastMouseMove;
    const targetActive = sinceMove < 150 ? 1 : Math.max(0, 1 - (sinceMove - 150) / 350);
    currentMouseActive += (targetActive - currentMouseActive) * 0.15;

    gl.uniform2f(uResolution, canvas.width, canvas.height);
    gl.uniform1f(uTime, ((now - startTime) * 0.001) * SPEED);
    gl.uniform2f(uMouse, mouseX, mouseY);
    gl.uniform1f(uMouseActive, currentMouseActive);

    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    raf = requestAnimationFrame(render);
  }

  function start() {
    if (!raf && visible && !document.hidden) {
      raf = requestAnimationFrame(render);
    }
  }

  function stop() {
    if (raf) {
      cancelAnimationFrame(raf);
      raf = 0;
    }
  }

  window.addEventListener("mousemove", function (e) {
    const rect = canvas.getBoundingClientRect();
    const dpr = canvas.width / Math.max(1, rect.width);
    mouseX = (e.clientX - rect.left) * dpr;
    mouseY = (rect.bottom - e.clientY) * dpr;
    lastMouseMove = performance.now();
  }, { passive: true });

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
