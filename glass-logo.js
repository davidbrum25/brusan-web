/* ==========================================================================
   BRUSAN · 3D Realistic Glass Logo (Three.js)
   - Extruded beveled SVG geometry
   - Physical Glass Material (Transmission, IOR, Refraction, Specular Glints)
   - Looped breathing & floating animation (no mouse/tap interaction)
   ========================================================================== */

(function () {
  let container, canvas, renderer, scene, camera;
  let logoGroup;
  let keyLight, goldLight, cobaltLight;
  let isInitialized = false;

  function initGlassLogo() {
    container = document.getElementById("glass-logo-container");
    const fallbackImg = document.getElementById("hero-logo-fallback");

    if (!container || !window.THREE || !window.THREE.SVGLoader) {
      if (fallbackImg) fallbackImg.style.display = "block";
      return;
    }

    const width = container.clientWidth || 800;
    const height = container.clientHeight || 200;

    // 1. Scene setup
    scene = new THREE.Scene();

    // 2. Camera setup
    camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 1000);
    camera.position.set(0, 0, 140);

    // 3. Renderer with transparent background and high DPR support
    renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance"
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.3;

    canvas = renderer.domElement;
    canvas.id = "glass-logo-canvas";
    container.appendChild(canvas);

    // 4. Lighting Rig for realistic glass reflections and refractions
    const ambientLight = new THREE.AmbientLight(0x24201b, 1.2);
    scene.add(ambientLight);

    keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(20, 40, 90);
    scene.add(keyLight);

    goldLight = new THREE.PointLight(0xd4a359, 3.5, 300);
    goldLight.position.set(-60, 30, 45);
    scene.add(goldLight);

    cobaltLight = new THREE.PointLight(0x2589bd, 3.5, 300);
    cobaltLight.position.set(60, -30, 45);
    scene.add(cobaltLight);

    const rimLight = new THREE.DirectionalLight(0xf4f1ea, 1.8);
    rimLight.position.set(0, -50, -40);
    scene.add(rimLight);

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
          roughness: 0.05,
          metalness: 0.05,
          transmission: 0.95, // High glass transmission
          ior: 1.52,          // Standard optical glass IOR
          reflectivity: 0.9,
          thickness: 2.2,     // Refraction volume thickness
          specularIntensity: 1.8,
          specularColor: 0xffffff,
          clearcoat: 1.0,
          clearcoatRoughness: 0.06,
          attenuationColor: 0xd4a359,
          attenuationDistance: 25.0,
          transparent: true,
          opacity: 0.92,
          side: THREE.DoubleSide
        });

        const extrudeSettings = {
          depth: 2.6,
          bevelEnabled: true,
          bevelThickness: 0.7,
          bevelSize: 0.5,
          bevelOffset: 0,
          bevelSegments: 5,
          curveSegments: 18
        };

        const geometries = [];

        for (let i = 0; i < paths.length; i++) {
          const path = paths[i];
          const shapes = THREE.SVGLoader.createShapes(path);

          for (let j = 0; j < shapes.length; j++) {
            const shape = shapes[j];
            const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
            geometries.push(geometry);

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

        // Scale camera view according to viewport width
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
    if (!camera || !container) return;
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 200;
    const aspect = width / height;

    camera.aspect = aspect;

    // Adjust camera distance so logo fills the container comfortably
    const logoWidth = size ? size.x : 226;
    const targetDistance = (logoWidth / 2) / Math.tan((camera.fov * Math.PI) / 360) * 0.72;
    camera.position.z = Math.max(targetDistance, 100);
    camera.updateProjectionMatrix();

    if (renderer) {
      renderer.setSize(width, height);
    }
  }

  function onWindowResize() {
    if (!container || !renderer || !camera) return;
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  }

  function renderLoop(time) {
    requestAnimationFrame(renderLoop);

    const t = time * 0.001;

    // Smooth, gentle looped floating movement without user interaction
    if (logoGroup) {
      logoGroup.rotation.y = Math.sin(t * 0.55) * 0.08;
      logoGroup.rotation.x = Math.cos(t * 0.42) * 0.04;
      logoGroup.position.y = Math.sin(t * 0.75) * 2.2;
    }

    // Orbiting light reflections for dynamic edge glints
    if (goldLight && cobaltLight && keyLight) {
      goldLight.position.x = Math.cos(t * 0.6) * 90;
      goldLight.position.y = Math.sin(t * 0.45) * 40 + 10;

      cobaltLight.position.x = -Math.sin(t * 0.5) * 90;
      cobaltLight.position.y = Math.cos(t * 0.65) * 40 - 10;

      keyLight.position.x = Math.sin(t * 0.35) * 40 + 20;
    }

    renderer.render(scene, camera);
  }

  document.addEventListener("DOMContentLoaded", initGlassLogo);
})();
