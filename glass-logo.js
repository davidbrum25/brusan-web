/* ==========================================================================
   BRUSAN · 3D Realistic Glass Logo (Three.js)
   - High-impact Prominent Scale (Fills central hero space)
   - Extruded beveled SVG geometry
   - Physical Glass Material (Transmission, IOR, Refraction, Specular Glints)
   - Looped breathing & floating animation (no mouse/tap interaction)
   ========================================================================== */

(function () {
  let container, canvas, renderer, scene, camera;
  let logoGroup;
  let keyLight, goldLight, cobaltLight, fillLight;
  let cachedSize = null;
  let isInitialized = false;

  function initGlassLogo() {
    container = document.getElementById("glass-logo-container");
    const fallbackImg = document.getElementById("hero-logo-fallback");

    if (!container || !window.THREE || !window.THREE.SVGLoader) {
      if (fallbackImg) fallbackImg.style.display = "block";
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || 360;

    // 1. Scene setup
    scene = new THREE.Scene();

    // 2. Camera setup
    camera = new THREE.PerspectiveCamera(34, width / height, 0.1, 1000);
    camera.position.set(0, 0, 100);

    // 3. Renderer with transparent background and high DPR support
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;

    canvas = renderer.domElement;
    canvas.id = "glass-logo-canvas";
    container.appendChild(canvas);

    // 4. Lighting Rig for realistic glass reflections and refractions
    const ambientLight = new THREE.AmbientLight(0x24201b, 1.4);
    scene.add(ambientLight);

    keyLight = new THREE.DirectionalLight(0xffffff, 3.2);
    keyLight.position.set(30, 50, 100);
    scene.add(keyLight);

    goldLight = new THREE.PointLight(0xd4a359, 4.5, 400);
    goldLight.position.set(-80, 40, 60);
    scene.add(goldLight);

    cobaltLight = new THREE.PointLight(0x2589bd, 4.5, 400);
    cobaltLight.position.set(80, -40, 60);
    scene.add(cobaltLight);

    fillLight = new THREE.DirectionalLight(0xf4f1ea, 2.0);
    fillLight.position.set(0, -60, -40);
    scene.add(fillLight);

    // 5. Load and Extrude SVG Logo
    const loader = new THREE.SVGLoader();

    loader.load(
      "assets/brusan_logo_blanco.svg",
      function (data) {
        const paths = data.paths;
        logoGroup = new THREE.Group();

        // Realistic Glass Material definition
        const glassMaterial = new THREE.MeshPhysicalMaterial({
          color: 0xf6f3ee,
          emissive: 0x121110,
          roughness: 0.04,
          metalness: 0.02,
          transmission: 0.95, // Optical glass transmission
          ior: 1.52,          // Standard optical glass IOR
          reflectivity: 0.92,
          thickness: 4.5,     // Deep refraction volume
          specularIntensity: 2.0,
          specularColor: 0xffffff,
          clearcoat: 1.0,
          clearcoatRoughness: 0.04,
          attenuationColor: 0xd4a359,
          attenuationDistance: 35.0,
          transparent: true,
          opacity: 0.94,
          side: THREE.DoubleSide
        });

        const extrudeSettings = {
          depth: 4.8,
          bevelEnabled: true,
          bevelThickness: 1.4,
          bevelSize: 1.1,
          bevelOffset: 0,
          bevelSegments: 6,
          curveSegments: 20
        };

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          const shapes = THREE.SVGLoader.createShapes(path);

          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            const mesh = new THREE.Mesh(geometry, glassMaterial);
            logoGroup.add(mesh);
          }
        }

        // Compute overall bounding box to center logo perfectly at (0, 0, 0)
        const box = new THREE.Box3().setFromObject(logoGroup);
        const center = new THREE.Vector3();
        box.getCenter(center);
        const size = new THREE.Vector3();
        box.getSize(size);
        cachedSize = size;

        // Adjust mesh positions relative to group center and flip SVG Y-axis
        logoGroup.position.x = -center.x;
        logoGroup.position.y = center.y;
        logoGroup.position.z = 0;
        logoGroup.scale.set(1, -1, 1); // SVG Y coordinates point downwards

        // Parent wrapper to handle rotations and oscillations around true origin
        const rootWrapper = new THREE.Group();
        rootWrapper.add(logoGroup);
        scene.add(rootWrapper);
        logoGroup = rootWrapper;

        // Scale camera view so logo is large, prominent, and fills 90% of width
        updateCameraFit(size);

        if (fallbackImg) {
          fallbackImg.style.display = "none";
        }

        isInitialized = true;
        requestAnimationFrame(renderLoop);
      },
      undefined,
      function (error) {
        console.warn("SVG 3D glass logo load error, falling back to static SVG:", error);
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

    // Calculate distance to fit prominently (occupying ~90% of container width or ~82% of container height)
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

    // Smooth, gentle looped floating movement without user interaction
    if (logoGroup) {
      logoGroup.rotation.y = Math.sin(t * 0.45) * 0.08;
      logoGroup.rotation.x = Math.cos(t * 0.35) * 0.04;
      logoGroup.position.y = Math.sin(t * 0.65) * 2.8;
    }

    // Orbiting light reflections for dynamic edge glints
    if (goldLight && cobaltLight && keyLight) {
      goldLight.position.x = Math.cos(t * 0.5) * 110;
      goldLight.position.y = Math.sin(t * 0.4) * 50 + 15;

      cobaltLight.position.x = -Math.sin(t * 0.45) * 110;
      cobaltLight.position.y = Math.cos(t * 0.55) * 50 - 15;

      keyLight.position.x = Math.sin(t * 0.3) * 50 + 25;
    }

    renderer.render(scene, camera);
  }

  document.addEventListener("DOMContentLoaded", initGlassLogo);
})();
