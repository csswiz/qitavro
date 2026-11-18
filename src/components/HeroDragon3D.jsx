import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

/**
 * HeroDragon3D
 * Live 3D Mythic Guardian Dragon for QITAVRO Hero Section.
 * - Confined strictly within the Hero section bounds.
 * - Small, elegant literary scale ("chota sa").
 * - Translates smoothly from TOP to BOTTOM on scroll within the hero.
 * - Gentle diving pitch, organic sway, and golden/burgundy editorial lighting.
 * - IntersectionObserver to pause rendering when hero is off-screen.
 */
export default function HeroDragon3D({
  modelUrl = '/models/dragon.glb',
  className = '',
}) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let width = container.clientWidth || window.innerWidth;
    let height = container.clientHeight || 560;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 0, 4.2);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    // 2. Editorial Lighting System (Warm Ivory, Muted Gold & Deep Wine Rim)
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.4);
    scene.add(ambientLight);

    // Warm Gold Key Light
    const goldKeyLight = new THREE.DirectionalLight(0xb69a72, 2.5);
    goldKeyLight.position.set(3.5, 4.0, 3.0);
    scene.add(goldKeyLight);

    // Deep Wine / Burgundy Rim Light from back-left
    const wineRimLight = new THREE.DirectionalLight(0x652e3c, 2.2);
    wineRimLight.position.set(-4.0, -1.0, -2.5);
    scene.add(wineRimLight);

    // Soft Upper Fill Light
    const topFill = new THREE.DirectionalLight(0xfff8f0, 1.2);
    topFill.position.set(0, 5, 2);
    scene.add(topFill);

    // 3. Dragon Pivot Hierarchy:
    // dragonPivot (handles scroll Y, sway X, and position in Hero)
    // └── modelWrapper (handles centering, descent pitch and local banking)
    const dragonPivot = new THREE.Group();
    const modelWrapper = new THREE.Group();
    dragonPivot.add(modelWrapper);
    scene.add(dragonPivot);

    // Subtle magical gold particles floating around the dragon
    const particleCount = 24;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount * 3; i += 3) {
      particlePositions[i] = (Math.random() - 0.5) * 1.5;
      particlePositions[i + 1] = (Math.random() - 0.5) * 1.0;
      particlePositions[i + 2] = (Math.random() - 0.5) * 1.0;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xb69a72,
      size: 0.035,
      transparent: true,
      opacity: 0.65,
    });
    const sparkles = new THREE.Points(particleGeo, particleMat);
    dragonPivot.add(sparkles);

    // Stylized Golden Placeholder while GLB streams
    function createPlaceholder() {
      const g = new THREE.Group();
      const gold = new THREE.MeshStandardMaterial({
        color: 0xb69a72,
        roughness: 0.35,
        metalness: 0.8,
      });
      const wine = new THREE.MeshStandardMaterial({
        color: 0x652e3c,
        roughness: 0.45,
        metalness: 0.4,
      });

      const body = new THREE.Mesh(new THREE.ConeGeometry(0.18, 0.75, 6), gold);
      body.rotation.z = Math.PI * 0.45;
      g.add(body);

      const head = new THREE.Mesh(new THREE.ConeGeometry(0.12, 0.35, 5), wine);
      head.position.set(0.38, 0.18, 0);
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
        0.35, 0.45, 0.2,
        0.5, 0.05, 0.05,
        0, 0, 0,
        -0.35, 0.45, -0.2,
        -0.5, 0.05, -0.05,
      ]);
      wingGeo.setAttribute('position', new THREE.BufferAttribute(wingVerts, 3));
      wingGeo.computeVertexNormals();
      const wings = new THREE.Mesh(wingGeo, wingMat);
      wings.position.set(0, 0.12, 0);
      g.add(wings);

      return g;
    }

    let activePlaceholder = createPlaceholder();
    modelWrapper.add(activePlaceholder);

    // 4. Load the user's custom GLB model
    const loader = new GLTFLoader();
    let loadedModel = null;

    loader.load(
      modelUrl,
      (gltf) => {
        loadedModel = gltf.scene;

        // Auto-center children to pivot (0,0,0)
        const box = new THREE.Box3().setFromObject(loadedModel);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;

        // Normalize size to ~1.0 unit
        const normScale = 1.0 / maxDim;
        loadedModel.position.set(-center.x * normScale, -center.y * normScale, -center.z * normScale);
        loadedModel.scale.setScalar(normScale);

        // Enhance materials with editorial lighting response
        loadedModel.traverse((child) => {
          if (child.isMesh && child.material) {
            child.material.roughness = Math.max(0.28, child.material.roughness || 0.4);
            child.material.metalness = Math.min(0.85, child.material.metalness || 0.5);
            child.material.envMapIntensity = 1.25;
          }
        });

        // Swap out placeholder cleanly
        modelWrapper.remove(activePlaceholder);
        modelWrapper.add(loadedModel);
      },
      undefined,
      (err) => {
        console.warn('HeroDragon3D: Using stylized book wyrm placeholder.', err);
      }
    );

    // 5. Scroll Progress and Movement Tracking
    let targetProgress = 0;
    let currentProgress = -1; // Initialized on first frame to prevent sudden jumping
    let isVisible = true;

    // Mouse tilt tracking
    let mouseX = 0;
    let mouseY = 0;
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      if (rect.width > 0 && rect.height > 0) {
        mouseX = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        mouseY = -(((e.clientY - rect.top) / rect.height) * 2 - 1);
      }
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Scroll tracker relative to Hero container
    const handleScroll = () => {
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const heroHeight = rect.height || 560;

      // When rect.top <= 0, user has scrolled into/through the hero
      // Progress clamped between 0.0 and 1.0 so dragon stays strictly in hero
      const scrolled = -rect.top;
      const progress = Math.max(0, Math.min(1, scrolled / heroHeight));
      targetProgress = progress;

      if (currentProgress < 0) {
        currentProgress = progress;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // IntersectionObserver to pause rendering when hero is scrolled past
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.02 }
    );
    observer.observe(container);

    // 6. Responsive Bounds Calculation (Top to Bottom inside Hero)
    const getBounds = () => {
      const aspect = width / height;
      const vFov = (camera.fov * Math.PI) / 180;
      const visibleHeight = 2 * Math.tan(vFov / 2) * camera.position.z;
      const visibleWidth = visibleHeight * aspect;

      const isMobile = width < 768;
      // "chota sa" scale tuned so it looks like an elegant literary guardian
      const scale = isMobile ? 0.36 : 0.54;

      // Top-to-Bottom bounds inside hero section (+Y is top, -Y is bottom)
      const topY = visibleHeight * 0.36;
      const bottomY = -visibleHeight * 0.34;

      // Horizontal placement: positioned on the LEFT side of the Hero section
      const baseX = isMobile ? -visibleWidth * 0.22 : -visibleWidth * 0.28;

      return { topY, bottomY, baseX, scale, visibleWidth, visibleHeight };
    };

    // 7. Animation Loop (60/120 fps)
    const clock = new THREE.Clock();
    let animId;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      if (!isVisible) return;

      const delta = clock.getDelta();
      const time = clock.getElapsedTime();

      if (currentProgress < 0) {
        currentProgress = targetProgress;
      }

      // Smooth physics lerp
      currentProgress += (targetProgress - currentProgress) * 0.075;

      const { topY, bottomY, baseX, scale } = getBounds();

      // Vertical translation: TOP to BOTTOM across Hero on scroll
      const hoverWave = Math.sin(time * 2.2) * 0.06;
      const posY = topY + (bottomY - topY) * currentProgress + hoverWave;

      // Gentle organic horizontal sway & subtle arc
      const sway = Math.sin(time * 1.5) * 0.04 + Math.sin(currentProgress * Math.PI) * 0.06;
      const posX = baseX + sway;

      // Subtle depth breathing - brought forward in Z
      const posZ = 0.15 + Math.cos(time * 1.4) * 0.05;

      dragonPivot.position.set(posX, posY, posZ);
      dragonPivot.scale.setScalar(scale);

      // Natural flight banking & descent pitch
      const scrollVelocity = (targetProgress - currentProgress);
      // Pitch slightly down when diving/descending on scroll down
      const divePitch = scrollVelocity * 1.5;
      // Front-facing orientation (facing the user/camera)
      const baseHeading = 0.05;

      modelWrapper.rotation.y = baseHeading + (mouseX * 0.25) + Math.sin(time * 1.2) * 0.04;
      modelWrapper.rotation.x = divePitch + (mouseY * 0.12) + Math.sin(time * 1.8) * 0.03;
      modelWrapper.rotation.z = -scrollVelocity * 0.8 + Math.sin(time * 2.0) * 0.025;

      // Floating dust rotation
      sparkles.rotation.y = time * 0.25;
      sparkles.rotation.x = Math.sin(time * 0.5) * 0.15;

      renderer.render(scene, camera);
    };

    renderLoop();

    // 8. Resize Handling
    const handleResize = () => {
      if (!container) return;
      width = container.clientWidth || window.innerWidth;
      height = container.clientHeight || 560;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };
    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      observer.disconnect();

      renderer.dispose();
      particleGeo.dispose();
      particleMat.dispose();
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
