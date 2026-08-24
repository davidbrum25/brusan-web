/* ==========================================================================
   BRUSAN · WebGL Wave Shader Engine
   ========================================================================== */

(function () {
  const vertexShaderSource = `
    attribute vec2 a_position;
    void main() {
      gl_Position = vec4(a_position, 0.0, 1.0);
    }
  `;

  const fragmentShaderSource = `
    precision highp float;

    uniform vec2 u_resolution;
    uniform float u_time;
    uniform vec2 u_mouse;
    uniform float u_speed;
    uniform float u_scale;
    uniform float u_glow;
    uniform float u_collision_freq;
    uniform float u_grain;

    // Palette Colors:
    // Negro Mineral: #171512
    // Gris Arena Oscura: #24201B
    // Blanco Cuarzo: #F6F3EE
    // Dorado Silíceo: #D4A359
    // Cobalto Industrial: #2589BD

    const vec3 COLOR_BG     = vec3(0.090, 0.082, 0.071); // #171512
    const vec3 COLOR_DARK   = vec3(0.141, 0.125, 0.106); // #24201B
    const vec3 COLOR_CUARZO = vec3(0.92, 0.89, 0.84);    // #F6F3EE
    const vec3 COLOR_GOLD   = vec3(0.831, 0.639, 0.349); // #D4A359
    const vec3 COLOR_BLUE   = vec3(0.145, 0.537, 0.741); // #2589BD

    vec3 permute(vec3 x) { 
      return mod(((x * 34.0) + 1.0) * x, 289.0); 
    }

    float snoise(vec2 v) {
      const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                         -0.577350269189626, 0.024390243902439);
      vec2 i  = floor(v + dot(v, C.yy));
      vec2 x0 = v - i + dot(i, C.xx);
      vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
      vec4 x12 = x0.xyxy + C.xxzz;
      x12.xy -= i1;
      i = mod(i, 289.0);
      vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
             + i.x + vec3(0.0, i1.x, 1.0));
      vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
      m = m * m;
      m = m * m;
      vec3 x = 2.0 * fract(p * (1.0 / 41.0)) - 1.0;
      vec3 h = abs(x) - 0.5;
      vec3 ox = floor(x + 0.5);
      vec3 a0 = x - ox;
      m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
      vec3 g;
      g.x  = a0.x  * x0.x  + h.x  * x0.y;
      g.yz = a0.yz * x12.xz + h.yz * x12.yw;
      return 130.0 * dot(m, g);
    }

    float lightBeam(vec2 coord, float angle, float frequency, float speed, float distortion) {
      float c = cos(angle);
      float s = sin(angle);
      vec2 rot = vec2(coord.x * c - coord.y * s, coord.x * s + coord.y * c);
      float n = snoise(rot * 0.8 + vec2(u_time * speed * 0.15, -u_time * speed * 0.1)) * distortion;
      float beamPattern = sin((rot.x + n) * frequency + u_time * speed * 0.4);
      return pow(0.5 + 0.5 * beamPattern, 3.5);
    }

    float hash12(vec2 p) {
      return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
    }

    void main() {
      vec2 uv = gl_FragCoord.xy / u_resolution.xy;
      vec2 st = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);

      float t = u_time * u_speed * 0.25;
      vec2 beamUV = vec2(st.x * 0.4, st.y * 1.5) * u_scale;

      // LIGHT BEAM 1: Golden Sand Specular Refraction
      float beam1 = lightBeam(beamUV, -0.42, 2.2 * u_collision_freq, 0.8, 0.65);
      float beam1_fade = sin(t * 0.7) * 0.35 + 0.65;

      // LIGHT BEAM 2: Cobalt Glass Sheen
      float beam2 = lightBeam(beamUV + vec2(0.2, -0.15), -0.28, 1.8 * u_collision_freq, -0.7, 0.75);
      float beam2_fade = cos(t * 0.65 + 1.2) * 0.35 + 0.65;

      // LIGHT BEAM MERGE
      float reflection_intersection = pow(beam1 * beam2, 0.85) * 1.8;

      // MOUSE INTERACTIVE REFLECTION
      vec2 mouse_st = (u_mouse - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
      float mouse_dist = length(st - mouse_st);
      float mouse_glint = smoothstep(0.4, 0.0, mouse_dist) * 0.3 * lightBeam(st, 0.5, 3.0, 1.2, 0.3);

      // Beams only — base fill is transparent so the header video shows through.
      vec3 beams = vec3(0.0);
      beams += COLOR_GOLD * beam1 * beam1_fade * 0.65 * u_glow;
      beams += COLOR_BLUE * beam2 * beam2_fade * 0.70 * u_glow;
      beams += COLOR_CUARZO * reflection_intersection * 0.25 * u_glow;
      beams += COLOR_GOLD * mouse_glint * u_glow;

      float energy = max(max(beams.r, beams.g), beams.b);
      float alpha = clamp(energy * 0.95, 0.0, 0.78);

      if (u_grain > 0.5) {
        float grain = (hash12(gl_FragCoord.xy + fract(u_time)) - 0.5) * 0.02;
        beams += grain;
      }

      gl_FragColor = vec4(beams, alpha);
    }
  `;

  let canvas, gl;
  let program;
  let uniforms = {};
  let startTime;

  const state = {
    speed: 1.0,
    scale: 1.2,
    glow: 1.3,
    collisionFreq: 1.0,
    grain: 1.0,
    mouseX: 0,
    mouseY: 0,
    targetMouseX: 0,
    targetMouseY: 0
  };

  function initWaveShader() {
    canvas = document.getElementById("gl-canvas");
    if (!canvas) return;

    const glOpts = { alpha: true, premultipliedAlpha: false, antialias: false };
    gl = canvas.getContext("webgl", glOpts) || canvas.getContext("experimental-webgl", glOpts);
    if (!gl) {
      console.warn("WebGL not available for wave shader background.");
      return;
    }
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0, 0, 0, 0);

    const vs = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vs, vertexShaderSource);
    gl.compileShader(vs);

    const fs = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fs, fragmentShaderSource);
    gl.compileShader(fs);

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([
        -1.0, -1.0,
         1.0, -1.0,
        -1.0,  1.0,
        -1.0,  1.0,
         1.0, -1.0,
         1.0,  1.0
      ]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    uniforms.resolution = gl.getUniformLocation(program, "u_resolution");
    uniforms.time = gl.getUniformLocation(program, "u_time");
    uniforms.mouse = gl.getUniformLocation(program, "u_mouse");
    uniforms.speed = gl.getUniformLocation(program, "u_speed");
    uniforms.scale = gl.getUniformLocation(program, "u_scale");
    uniforms.glow = gl.getUniformLocation(program, "u_glow");
    uniforms.collisionFreq = gl.getUniformLocation(program, "u_collision_freq");
    uniforms.grain = gl.getUniformLocation(program, "u_grain");

    startTime = performance.now();

    resizeCanvas();
    window.addEventListener("resize", resizeCanvas);

    window.addEventListener("mousemove", (e) => {
      state.targetMouseX = e.clientX;
      state.targetMouseY = e.clientY;
    });

    window.addEventListener("touchmove", (e) => {
      if (e.touches.length > 0) {
        state.targetMouseX = e.touches[0].clientX;
        state.targetMouseY = e.touches[0].clientY;
      }
    });

    requestAnimationFrame(render);
  }

  function resizeCanvas() {
    if (!gl || !canvas) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.parentElement ? canvas.parentElement.clientWidth : window.innerWidth;
    const height = canvas.parentElement ? canvas.parentElement.clientHeight : window.innerHeight;

    canvas.width = width * dpr;
    canvas.height = height * dpr;
    gl.viewport(0, 0, canvas.width, canvas.height);
  }

  function render(now) {
    if (!gl || !program) return;
    const elapsedTime = (now - startTime) * 0.001;

    state.mouseX += (state.targetMouseX - state.mouseX) * 0.05;
    state.mouseY += (state.targetMouseY - state.mouseY) * 0.05;

    gl.useProgram(program);

    gl.uniform2f(uniforms.resolution, canvas.width, canvas.height);
    gl.uniform1f(uniforms.time, elapsedTime);
    gl.uniform2f(
      uniforms.mouse,
      state.mouseX * (canvas.width / window.innerWidth),
      (window.innerHeight - state.mouseY) * (canvas.height / window.innerHeight)
    );
    gl.uniform1f(uniforms.speed, state.speed);
    gl.uniform1f(uniforms.scale, state.scale);
    gl.uniform1f(uniforms.glow, state.glow);
    gl.uniform1f(uniforms.collisionFreq, state.collisionFreq);
    gl.uniform1f(uniforms.grain, state.grain);

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 6);

    requestAnimationFrame(render);
  }

  document.addEventListener("DOMContentLoaded", initWaveShader);
})();
