import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * HeroDragon3D
 * Hanging Dragon Souvenir with 3D String & Interactive Physics:
 * - Suspended on the left side from an elegant ceiling fixture with a 3D gold silk cord.
 * - Interactive: Hover breeze, click/tap impulse swing, and drag-and-release pendulum physics.
 * - Connected 3D cord with decorative beads, loop clasp, and lower accent tassel.
 * - Scroll inertia: responds smoothly to user scroll.
 * - Smart pointer events: canvas only intercepts events when hovering the souvenir,
 *   leaving all text and buttons underneath 100% clickable.
 */
export default function HeroDragon3D({
  modelUrl = '/models/dragon.glb',
  className = '',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    // 0. Performance Guard: Only enable on desktop screens (>=1024px) with desktop GPU
    if (typeof window === 'undefined') return;
    const isDesktop = window.innerWidth >= 1024 && !/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    if (!isDesktop) return;

    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 560;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: false, // Performance: antialias false saves ~40% GPU fillrate
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25)); // Cap at 1.25 to prevent 4K overhead
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.domElement.style.pointerEvents = 'none'; // Initially pass-through
    container.appendChild(renderer.domElement);

    // 2. Lighting System (Warm Ivory, Muted Gold & Wine Highlights)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.3);
    scene.add(ambientLight);

    const goldKeyLight = new THREE.DirectionalLight(0xb69a72, 2.8);
    goldKeyLight.position.set(3.5, 4.0, 3.0);
    scene.add(goldKeyLight);

    const wineRimLight = new THREE.DirectionalLight(0x833449, 2.4);
    wineRimLight.position.set(-4.0, -1.0, -2.5);
    scene.add(wineRimLight);

    const topDownSpot = new THREE.SpotLight(0xfffaed, 2.0);
    topDownSpot.position.set(0, 5, 2);
    topDownSpot.angle = Math.PI / 6;
    topDownSpot.penumbra = 0.8;
    scene.add(topDownSpot);

    // 3. Materials for the Souvenir String & Hardware
    const goldHardwareMat = new THREE.MeshStandardMaterial({
      color: 0xd4af37,
      metalness: 0.88,
      roughness: 0.22,
    });

    const silkCordMat = new THREE.MeshStandardMaterial({
      color: 0xc5a059,
      metalness: 0.65,
      roughness: 0.35,
    });

    const wineBeadMat = new THREE.MeshStandardMaterial({
      color: 0x833449,
      metalness: 0.35,
      roughness: 0.3,
    });

    // 4. Hierarchy:
    // anchorGroup (handles anchor point X, Y on left side of viewport + scroll translation)
    // └── pendulumPivot (swings around anchor point: rotation.z, rotation.x, rotation.y)
    //     ├── stringMesh (3D cord extending downward)
    //     ├── beads & clasp hardware
    //     └── dragonCharmGroup (the suspended dragon souvenir + secondary wobble)
    //         ├── dragonModelWrapper
    //         └── bottomTassel (secondary swaying tassel)
    const anchorGroup = new THREE.Group();
    scene.add(anchorGroup);

    const pendulumPivot = new THREE.Group();
    anchorGroup.add(pendulumPivot);

    // Ceiling Mount Hardware at top of string (y = 0)
    const ceilingMount = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.015, 16),
      goldHardwareMat
    );
    ceilingMount.rotation.x = Math.PI / 2;
    pendulumPivot.add(ceilingMount);

    const topRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.035, 0.008, 12, 24),
      goldHardwareMat
    );
    topRing.rotation.y = Math.PI / 2;
    topRing.position.set(0, -0.02, 0);
    pendulumPivot.add(topRing);

    // Dynamic String Setup
    let stringLength = 1.45;
    const stringRadius = 0.0055;
    const stringGeo = new THREE.CylinderGeometry(stringRadius, stringRadius, 1, 8);
    // Offset cylinder geometry so pivot is at top (y=0 to y=-1)
    stringGeo.translate(0, -0.5, 0);

    const stringMesh = new THREE.Mesh(stringGeo, silkCordMat);
    pendulumPivot.add(stringMesh);

    // Decorative Silk/Gold Bead midway down cord
    const midBead = new THREE.Mesh(
      new THREE.SphereGeometry(0.024, 14, 14),
      wineBeadMat
    );
    pendulumPivot.add(midBead);

    // Clasp & Ring at bottom of cord
    const bottomClasp = new THREE.Group();
    const claspBead = new THREE.Mesh(
      new THREE.SphereGeometry(0.028, 14, 14),
      goldHardwareMat
    );
    bottomClasp.add(claspBead);

    const bottomRing = new THREE.Mesh(
      new THREE.TorusGeometry(0.032, 0.008, 12, 24),
      goldHardwareMat
    );
    bottomRing.position.set(0, -0.035, 0);
    bottomClasp.add(bottomRing);
    pendulumPivot.add(bottomClasp);

    // Dragon Charm Group (hangs from bottom clasp)
    const dragonCharmGroup = new THREE.Group();
    pendulumPivot.add(dragonCharmGroup);

    const dragonModelWrapper = new THREE.Group();
    dragonCharmGroup.add(dragonModelWrapper);

    // Accent Bottom Tassel (hangs below the dragon as a classic souvenir touch)
    const bottomTassel = new THREE.Group();
    const tasselCap = new THREE.Mesh(
      new THREE.ConeGeometry(0.022, 0.03, 12),
      goldHardwareMat
    );
    bottomTassel.add(tasselCap);

    const tasselSkirt = new THREE.Mesh(
      new THREE.ConeGeometry(0.03, 0.16, 12),
      wineBeadMat
    );
    tasselSkirt.position.set(0, -0.09, 0);
    bottomTassel.add(tasselSkirt);

    bottomTassel.position.set(0, -0.48, 0);
    dragonCharmGroup.add(bottomTassel);

    // Invisible Hit Box for Generous, Smooth Interaction Raycasting
    const hitGeo = new THREE.SphereGeometry(0.48, 12, 12);
    const hitMat = new THREE.MeshBasicMaterial({ visible: false });
    const hitSphere = new THREE.Mesh(hitGeo, hitMat);
    hitSphere.position.set(0, -0.15, 0);
    dragonCharmGroup.add(hitSphere);

    // Stylized Placeholder Wyrm (while GLB streams)
    function createPlaceholder() {
      const g = new THREE.Group();
      const gold = new THREE.MeshStandardMaterial({
        color: 0xb69a72,
        roughness: 0.35,
        metalness: 0.8,
      });
      const wine = new THREE.MeshStandardMaterial({
        color: 0x833449,
        roughness: 0.45,
        metalness: 0.4,
      });

      const body = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.72, 6), gold);
      body.rotation.z = Math.PI * 0.45;
      g.add(body);

      const head = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.32, 5), wine);
      head.position.set(0.36, 0.16, 0);
      head.rotation.z = -Math.PI * 0.4;
      g.add(head);

      const wingMat = new THREE.MeshStandardMaterial({
        color: 0xd4af37,
        side: THREE.DoubleSide,
        roughness: 0.3,
      });
      const wingGeo = new THREE.BufferGeometry();
      const wingVerts = new Float32Array([
        0, 0, 0,
        0.32, 0.42, 0.18,
        0.48, 0.05, 0.05,
        0, 0, 0,
        -0.32, 0.42, -0.18,
        -0.48, 0.05, -0.05,
      ]);
      wingGeo.setAttribute('position', new THREE.BufferAttribute(wingVerts, 3));
      wingGeo.computeVertexNormals();
      const wings = new THREE.Mesh(wingGeo, wingMat);
      wings.position.set(0, 0.12, 0);
      g.add(wings);

      return g;
    }

    let activePlaceholder = createPlaceholder();
    dragonModelWrapper.add(activePlaceholder);

    // 5. Load GLB Model
    const loader = new GLTFLoader();
    let loadedModel = null;

    loader.load(
      modelUrl,
      (gltf) => {
        loadedModel = gltf.scene;

        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;

        const normScale = 1.0 / maxDim;
        loadedModel.position.set(
          -center.x * normScale,
          -center.y * normScale,
          -center.z * normScale
        );
        loadedModel.scale.setScalar(normScale);

        loadedModel.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.roughness = Math.max(0.25, child.material.roughness || 0.4);
            child.material.metalness = Math.min(0.88, child.material.metalness || 0.6);
            child.material.envMapIntensity = 1.35;
          }
        });

        dragonModelWrapper.remove(activePlaceholder);
        dragonModelWrapper.add(loadedModel);
      },
      undefined,
      (err) => {
        console.warn('HeroDragon3D: Using stylized souvenir placeholder.', err);
      }
    );

    // 6. Responsive Bounds & String Sizing
    const getBounds = () => {
      const isMobile = width < 768;
      const aspect = width / height;
      const vFov = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
      const visibleWidth = visibleHeight * aspect;

      // Souvenir dimensions
      const len = isMobile ? 1.15 : 1.45;
      const scale = isMobile ? 0.34 : 0.46;

      // Anchor top coordinates on the left side of hero
      const topY = visibleHeight * 0.48; // near top edge of hero
      const bottomY = visibleHeight * 0.22; // translation down on scroll
      const baseX = isMobile ? -visibleWidth * 0.32 : -visibleWidth * 0.34;
      const baseZ = 0.2;

      return { visibleHeight, visibleWidth, len, scale, topY, bottomY, baseX, baseZ, isMobile };
    };

    // 7. Interactive Physics Engine
    // Pendulum harmonic angles (radians) & velocities
    let thetaZ = 0; // side-to-side swing
    let thetaX = 0; // forward-backward swing
    let thetaY = 0; // twist around string
    let velZ = 0;
    let velX = 0;
    let velY = 0;

    // Secondary charm wobble lag
    let charmLagZ = 0;
    let charmLagX = 0;

    // Pointer Tracking & Raycasting
    const raycaster = new THREE.Raycaster();
    const mouseNorm = new THREE.Vector2(-10, -10);
    let isHovered = false;
    let isDragging = false;
    let dragPlane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    let dragPoint = new THREE.Vector3();
    let lastPointerPos = { x: 0, y: 0, time: performance.now() };
    let pointerVelocity = { x: 0, y: 0 };
    let dragStartPos = { x: 0, y: 0 };

    // Update string length and position of child elements
    const updateStringGeometry = (len, scale) => {
      stringLength = len;
      stringMesh.scale.set(1, len, 1);
      midBead.position.set(0, -len * 0.48, 0);
      bottomClasp.position.set(0, -len, 0);
      dragonCharmGroup.position.set(0, -len - 0.08, 0);
      dragonCharmGroup.scale.setScalar(scale);
    };

    // Window Mouse / Pointer Move
    const handlePointerMove = (e) => {
      const now = performance.now();
      const dt = Math.max(0.001, (now - lastPointerPos.time) / 1000);
      pointerVelocity.x = (e.clientX - lastPointerPos.x) / dt;
      pointerVelocity.y = (e.clientY - lastPointerPos.y) / dt;
      lastPointerPos = { x: e.clientX, y: e.clientY, time: now };

      if (!container) return;
      const rect = container.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;

      mouseNorm.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouseNorm.y = -(((e.clientY - rect.top) / rect.height) * 2 - 1);

      // Raycast check against hit sphere
      raycaster.setFromCamera(mouseNorm, camera);
      const intersects = raycaster.intersectObject(hitSphere, false);

      const hit = intersects.length > 0;
      if (hit !== isHovered) {
        isHovered = hit;
      }

      // Dynamic pointer-events: only intercept mouse when directly touching/hovering the souvenir
      if (isHovered || isDragging) {
        renderer.domElement.style.pointerEvents = 'auto';
        renderer.domElement.style.cursor = isDragging ? 'grabbing' : 'grab';
      } else {
        renderer.domElement.style.pointerEvents = 'none';
        renderer.domElement.style.cursor = 'default';
      }

      // If user drags the souvenir
      if (isDragging) {
        dragPlane.setFromNormalAndCoplanarPoint(
          new THREE.Vector3(0, 0, 1),
          anchorGroup.position
        );
        if (raycaster.ray.intersectPlane(dragPlane, dragPoint)) {
          // Relative vector from top anchor to drag point
          const dx = dragPoint.x - anchorGroup.position.x;
          const dy = dragPoint.y - anchorGroup.position.y;
          const dz = dragPoint.z - anchorGroup.position.z;

          // Compute target angles
          const targetZ = Math.max(-0.85, Math.min(0.85, Math.atan2(dx, -dy)));
          const targetX = Math.max(-0.65, Math.min(0.65, Math.atan2(dz, -dy)));

          thetaZ += (targetZ - thetaZ) * 0.35;
          thetaX += (targetX - thetaX) * 0.35;
          thetaY += (dx * 0.5 - thetaY) * 0.2;
        }
      } else if (isHovered && Math.hypot(pointerVelocity.x, pointerVelocity.y) > 250) {
        // Swift hover breeze nudge!
        velZ += (pointerVelocity.x / 1400);
        velX += (-pointerVelocity.y / 1800);
        velY += (pointerVelocity.x / 1800);
      }
    };

    // Pointer Down (Click / Tap Start)
    const handlePointerDown = (e) => {
      if (!isHovered) return;
      isDragging = true;
      dragStartPos = { x: e.clientX, y: e.clientY };
      renderer.domElement.style.cursor = 'grabbing';
    };

    // Pointer Up (Release / Click Nudge)
    const handlePointerUp = (e) => {
      if (!isDragging) return;

      const dist = Math.hypot(e.clientX - dragStartPos.x, e.clientY - dragStartPos.y);
      if (dist < 6) {
        // User clicked/tapped the souvenir! Impart a fun, lively swing & spin impulse
        velZ += (Math.random() > 0.5 ? 1 : -1) * (0.45 + Math.random() * 0.35);
        velX += (Math.random() - 0.5) * 0.5;
        velY += (Math.random() > 0.5 ? 1 : -1) * (1.8 + Math.random() * 0.8);
      } else {
        // Released from drag: fling with release velocity
        velZ += Math.max(-2.5, Math.min(2.5, pointerVelocity.x / 600));
        velX += Math.max(-2.0, Math.min(2.0, -pointerVelocity.y / 700));
      }

      isDragging = false;
      renderer.domElement.style.cursor = isHovered ? 'grab' : 'default';
      if (!isHovered) {
        renderer.domElement.style.pointerEvents = 'none';
      }
    };

    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerdown', handlePointerDown);
    window.addEventListener('pointerup', handlePointerUp);
    window.addEventListener('pointercancel', handlePointerUp);

    // 8. Scroll Tracker
    let targetProgress = 0;
    let currentProgress = 0;
    let lastScrollY = window.scrollY;
    let scrollVelocity = 0;

    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const heroHeight = rect.height || 560;
      const scrolled = -rect.top;
      targetProgress = Math.max(0, Math.min(1, scrolled / heroHeight));

      const deltaY = window.scrollY - lastScrollY;
      lastScrollY = window.scrollY;
      scrollVelocity = deltaY * 0.05;

      // Scroll imparts dynamic pendulum swing
      velZ += scrollVelocity * 0.04;
      velX -= scrollVelocity * 0.06;
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to pause rendering when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    // Initial bounds calculation
    const initialBounds = getBounds();
    updateStringGeometry(initialBounds.len, initialBounds.scale);

    // 9. Animation Loop with Harmonic Physics
    const clock = new THREE.Clock();
    let animId;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      if (!isVisible) return;

      const delta = Math.min(0.04, clock.getDelta());
      const time = clock.getElapsedTime();

      // Smooth scroll lerp
      currentProgress += (targetProgress - currentProgress) * 0.08;

      const bounds = getBounds();
      updateStringGeometry(bounds.len, bounds.scale);

      // Anchor translation: position on left side, gently lowing slightly on scroll
      const anchorY = bounds.topY + (bounds.bottomY - bounds.topY) * currentProgress;
      const anchorX = bounds.baseX;
      const anchorZ = bounds.baseZ;
      anchorGroup.position.set(anchorX, anchorY, anchorZ);

      // Pendulum Physics (Harmonic restoration + drag damping)
      if (!isDragging) {
        const gravityConst = 16.0;
        const restoration = gravityConst / stringLength;

        // Gravity pulls back to center (theta = 0)
        const accelZ = -restoration * Math.sin(thetaZ);
        const accelX = -restoration * Math.sin(thetaX);

        // Gentle ambient breeze so it always feels tangible and alive
        const ambientDraft = Math.sin(time * 1.6) * 0.008;
        const ambientBreeze = Math.cos(time * 1.1) * 0.006;

        velZ = (velZ + (accelZ + ambientDraft) * delta) * Math.pow(0.985, delta * 60);
        velX = (velX + (accelX + ambientBreeze) * delta) * Math.pow(0.985, delta * 60);
        velY = velY * Math.pow(0.97, delta * 60);

        thetaZ += velZ * delta;
        thetaX += velX * delta;
        thetaY += velY * delta;
      }

      // Apply pendulum swing to pivot
      pendulumPivot.rotation.z = thetaZ;
      pendulumPivot.rotation.x = thetaX;
      pendulumPivot.rotation.y = thetaY;

      // Secondary spring lag for the charm (dragon wobbles realistically on cord)
      charmLagZ += (thetaZ * 0.45 - charmLagZ) * 0.15;
      charmLagX += (thetaX * 0.35 - charmLagX) * 0.15;
      dragonCharmGroup.rotation.z = charmLagZ;
      dragonCharmGroup.rotation.x = charmLagX;

      // Front-facing orientation: face slightly towards center of hero (subtle inward greeting)
      const inwardAngle = bounds.isMobile ? 0.15 : 0.28;
      dragonModelWrapper.rotation.y = inwardAngle + Math.sin(time * 1.8) * 0.04;

      // Secondary tassel lag
      bottomTassel.rotation.z = -velZ * 0.4 + Math.sin(time * 3.0) * 0.05;
      bottomTassel.rotation.x = -velX * 0.3 + Math.cos(time * 2.5) * 0.04;

      renderer.render(scene, camera);
    };

    renderLoop();

    // 10. Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      const b = getBounds();
      updateStringGeometry(b.len, b.scale);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerdown', handlePointerDown);
      window.removeEventListener('pointerup', handlePointerUp);
      window.removeEventListener('pointercancel', handlePointerUp);
      observer.disconnect();

      renderer.dispose();
      stringGeo.dispose();
      goldHardwareMat.dispose();
      silkCordMat.dispose();
      wineBeadMat.dispose();
      hitGeo.dispose();
      hitMat.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none z-30 overflow-hidden ${className}`}
      aria-hidden="true"
    />
  );
}
