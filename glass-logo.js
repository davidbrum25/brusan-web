/* ==========================================================================
   BRUSAN · 3D Multi-Material Logo (Three.js)
   - Glass (White parts): Notebook Body & Connector Tab with RGB Chromatic Refraction
   - Metallic Black (Dark parts): 3 Binder Rings & "BRUSAN" Wordmark with Micro-Noise Satin Finish
   - Auto-Framing & Autonomous Floating Breathing Loop
   ========================================================================== */

(function () {
  let container, canvas, renderer, scene, camera;
  let logoGroup;
  let keyLight, goldLight, cobaltLight, fillLight, rimLight;
  let glassMaterial, metallicMaterial;
  let cachedSize = null;
  let isInitialized = false;

  // 1. Procedural Micro-Noise Texture for Metallic Brushed Finish
  function createMicroNoiseTexture() {
    const size = 256;
    const canvas = document.createElement("canvas");
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext("2d");
    const imgData = ctx.createImageData(size, size);
    const data = imgData.data;

    for (let i = 0; i < data.length; i += 4) {
      const noise = (Math.random() - 0.5) * 60;
      const val = Math.floor(128 + noise);
      data[i] = val;
      data[i + 1] = val;
      data[i + 2] = val;
      data[i + 3] = 255;
    }
    ctx.putImageData(imgData, 0, 0);

    const texture = new THREE.CanvasTexture(canvas);
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;
    texture.repeat.set(6, 6);
    return texture;
  }

  function initGlassLogo() {
    container = document.getElementById("glass-logo-container");
    const fallbackImg = document.getElementById("hero-logo-fallback");

    if (!container || !window.THREE || !window.THREE.SVGLoader) {
      if (fallbackImg) fallbackImg.style.display = "block";
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 360;

    // 2. Scene setup
    scene = new THREE.Scene();

    // 3. Camera setup
    camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);

    // 4. Renderer setup
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.35;

    canvas = renderer.domElement;
    canvas.id = "glass-logo-canvas";
    container.appendChild(canvas);

    // 5. Lighting Rig for Glass Refraction & Metallic Highlights
    const ambientLight = new THREE.AmbientLight(0x24201b, 1.6);
    scene.add(ambientLight);

    keyLight = new THREE.DirectionalLight(0xffffff, 3.5);
    keyLight.position.set(40, 60, 100);
    scene.add(keyLight);

    goldLight = new THREE.PointLight(0xd4a359, 5.0, 450);
    goldLight.position.set(-100, 40, 70);
    scene.add(goldLight);

    cobaltLight = new THREE.PointLight(0x2589bd, 5.0, 450);
    cobaltLight.position.set(100, -40, 70);
    scene.add(cobaltLight);

    rimLight = new THREE.DirectionalLight(0xf4f1ea, 2.2);
    rimLight.position.set(0, -60, -30);
    scene.add(rimLight);

    fillLight = new THREE.PointLight(0xffffff, 2.0, 300);
    fillLight.position.set(0, 80, 50);
    scene.add(fillLight);

    // 6. Materials definition

    // A. Refractive Glass Material for Notebook Cover & Connector Tab with Chromatic RGB Dispersion
    glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xf4f1ea,
      emissive: 0x121110,
      roughness: 0.02,
      metalness: 0.0,
      transmission: 0.95, // Full light transmission
      ior: 1.54,          // Optical glass refractive index
      reflectivity: 0.95,
      thickness: 6.5,     // Deep refraction volume
      specularIntensity: 2.5,
      specularColor: 0xffffff,
      clearcoat: 1,
      clearcoatRoughness: 0.25,
      attenuationColor: 0xd4a359,
      attenuationDistance: 45.0,
      transparent: true,
      opacity: 1,
      side: THREE.DoubleSide
    });

    // Custom Shader Hook for Real RGB Chromatic Dispersion on Glass
    glassMaterial.onBeforeCompile = function (shader) {
      shader.uniforms.uTime = { value: 0 };

      shader.fragmentShader = `
        uniform float uTime;
      ` + shader.fragmentShader;

      shader.fragmentShader = shader.fragmentShader.replace(
        '#include <dithering_fragment>',
        `
        #include <dithering_fragment>

        // RGB Spectral Decomposition / Chromatic Dispersion across beveled normals
        vec3 vDir = normalize(vViewPosition);
        vec3 nDir = normalize(vNormal);
        float fresnel = pow(1.0 - clamp(dot(-vDir, nDir), 0.0, 1.0), 2.2);

        // Rainbow spectral separation
        vec3 spectralRGB = vec3(
          sin(fresnel * 5.0 + uTime * 0.9 + 0.0) * 0.5 + 0.5,
          sin(fresnel * 5.0 + uTime * 0.9 + 2.09) * 0.5 + 0.5,
          sin(fresnel * 5.0 + uTime * 0.9 + 4.18) * 0.5 + 0.5
        );

        // Warm Gold & Cool Cobalt dispersion caustics
        vec3 goldCaustic = vec3(0.83, 0.64, 0.35);
        vec3 blueCaustic = vec3(0.15, 0.54, 0.74);
        vec3 caustics = mix(goldCaustic, blueCaustic, sin(uTime * 0.6 + fresnel * 3.5) * 0.5 + 0.5);

        // Add prismatic highlights to glass edges
        gl_FragColor.rgb += mix(spectralRGB, caustics, 0.55) * fresnel * 0.95;
        `
      );

      glassMaterial.userData.shader = shader;
    };

    // B. Metallic Black Material for 3 Binder Rings & "BRUSAN" Wordmark with bg_textures_01.jpg roughness map
    const textureLoader = new THREE.TextureLoader();
    const roughnessTexture = textureLoader.load("assets/textures/bg_textures_04.jpg", (tex) => {
      tex.wrapS = THREE.RepeatWrapping;
      tex.wrapT = THREE.RepeatWrapping;
      tex.repeat.set(2.5, 2.5);
      if (metallicMaterial) {
        metallicMaterial.needsUpdate = true;
      }
    });
    roughnessTexture.wrapS = THREE.RepeatWrapping;
    roughnessTexture.wrapT = THREE.RepeatWrapping;
    roughnessTexture.repeat.set(2.5, 2.5);

    metallicMaterial = new THREE.MeshStandardMaterial({
      color: 0x141312,                // Deep mineral graphite black
      metalness: 0.90,                // Rich metallic sheen
      roughness: 0.50,                // Tactile surface roughness modulated by map
      roughnessMap: roughnessTexture, // Texture-driven micro roughness
      bumpMap: roughnessTexture,      // Tactile physical relief bump
      bumpScale: 0.04,
      side: THREE.DoubleSide
    });

    // 7. Load and Extrude SVG Logo with Precise Material Mapping
    const loader = new THREE.SVGLoader();

    loader.load(
      "assets/brusan_logo_blanco.svg",
      function (data) {
        const paths = data.paths;
        logoGroup = new THREE.Group();

        const extrudeSettings = {
          depth: 4.8,
          bevelEnabled: true,
          bevelThickness: 1,
          bevelSize: .8,
          bevelOffset: 0,
          bevelSegments: 6,
          curveSegments: 20
        };

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          const shapes = THREE.SVGLoader.createShapes(path);

          // Path 0 (id="path86") is the complete Isotype notebook (Green area -> Optical Glass)
          // Path 1 (id="path1") is the entire "BRUSAN" wordmark (Pink area -> Satin Metallic Black)
          const isIsotype = (i === 0) || (path.userData && path.userData.node && path.userData.node.id === "path86");

          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);

            const mesh = new THREE.Mesh(
              geometry,
              isIsotype ? glassMaterial : metallicMaterial
            );
            logoGroup.add(mesh);
          }
        }

        // Compute overall bounding box to center entire lockup at (0, 0, 0)
        const box = new THREE.Box3().setFromObject(logoGroup);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);
        cachedSize = size;

        // Center meshes and flip SVG Y-axis
        logoGroup.position.x = -center.x;
        logoGroup.position.y = center.y;
        logoGroup.position.z = 0;
        logoGroup.scale.set(1, -1, 1);

        // Root wrapper for smooth floating rotation
        const rootWrapper = new THREE.Group();
        rootWrapper.add(logoGroup);
        scene.add(rootWrapper);
        logoGroup = rootWrapper;

        // Frame camera prominently
        updateCameraFit(size);

        if (fallbackImg) {
          fallbackImg.style.display = "none";
        }

        isInitialized = true;
        requestAnimationFrame(renderLoop);
      },
      undefined,
      function (error) {
        console.warn("SVG 3D logo load error, falling back to static SVG:", error);
        if (fallbackImg) fallbackImg.style.display = "block";
      }
    );

    window.addEventListener("resize", onWindowResize);
  }

  function updateCameraFit(size) {
    if (size) cachedSize = size;
    if (!camera || !container || !cachedSize) return;

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 360;
    const aspect = width / height;

    camera.aspect = aspect;

    const logoWidth = cachedSize.x || 226;
    const logoHeight = cachedSize.y || 39;

    const vFOV = (camera.fov * Math.PI) / 180;
    const tanHalfFOV = Math.tan(vFOV / 2);

    const distanceWidth = (logoWidth / (2 * tanHalfFOV * aspect)) * 1.10;
    const distanceHeight = (logoHeight / (2 * tanHalfFOV)) * 1.25;

    camera.position.z = Math.max(distanceWidth, distanceHeight, 35);
    camera.updateProjectionMatrix();

    if (renderer) {
      renderer.setSize(width, height);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    }
  }

  function onWindowResize() {
    updateCameraFit();
  }

  function renderLoop(time) {
    requestAnimationFrame(renderLoop);

    const t = time * 0.001;

    // Update chromatic dispersion shader time uniform
    if (glassMaterial && glassMaterial.userData.shader) {
      glassMaterial.userData.shader.uniforms.uTime.value = t;
    }

    // Smooth, gentle looped floating movement without user interaction
    if (logoGroup) {
      logoGroup.rotation.y = Math.sin(t * 0.45) * 0.08;
      logoGroup.rotation.x = Math.cos(t * 0.35) * 0.04;
      logoGroup.position.y = Math.sin(t * 0.65) * 2.8;
    }

    // Orbiting light reflections for specular refractions & metallic highlights
    if (goldLight && cobaltLight && keyLight) {
      goldLight.position.x = Math.cos(t * 0.5) * 120;
      goldLight.position.y = Math.sin(t * 0.4) * 50 + 15;

      cobaltLight.position.x = -Math.sin(t * 0.45) * 120;
      cobaltLight.position.y = Math.cos(t * 0.55) * 50 - 15;

      keyLight.position.x = Math.sin(t * 0.3) * 60 + 25;
    }

    renderer.render(scene, camera);
  }

  document.addEventListener("DOMContentLoaded", initGlassLogo);
})();
