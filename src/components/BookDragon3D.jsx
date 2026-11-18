import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Sparkles, Eye, X, RotateCcw } from 'lucide-react';

export default function BookDragon3D({
  modelUrl = '/models/dragon.glb',
  className = '',
  embedded = false,
  title = "Ignis — The Library's Guardian",
}) {
  const mountRef = useRef(null);
  const [loading, setLoading] = useState(true);
  const [modelFound, setModelFound] = useState(false);
  const [minimized, setMinimized] = useState(false);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Dimensions
    const width = container.clientWidth || 240;
    const height = container.clientHeight || 240;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 3.5);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    container.appendChild(renderer.domElement);

    // Orbit Controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enableZoom = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = 1.2;
    controls.maxPolarAngle = Math.PI / 2 + 0.1;

    // Warm Editorial Lighting
    const ambientLight = new THREE.AmbientLight(0xfff5ea, 1.2);
    scene.add(ambientLight);

    const mainLight = new THREE.DirectionalLight(0xb69a72, 2.0); // Muted gold
    mainLight.position.set(3, 4, 2);
    scene.add(mainLight);

    const rimLight = new THREE.DirectionalLight(0x652e3c, 1.5); // Burgundy rim
    rimLight.position.set(-3, -1, -2);
    scene.add(rimLight);

    let mixer = null;
    let customModel = null;
    let proceduralDragon = null;

    // Try loading custom GLB/GLTF model
    const loader = new GLTFLoader();
    loader.load(
      modelUrl,
      (gltf) => {
        setLoading(false);
        setModelFound(true);

        customModel = gltf.scene;

        // Auto-center and normalize size
        const box = new THREE.Box3().setFromObject(customModel);
        const size = box.getSize(new THREE.Vector3());
        const maxDim = Math.max(size.x, size.y, size.z) || 1;
        const scale = 2.0 / maxDim;
        customModel.scale.setScalar(scale);

        // Center on pivot
        const center = box.getCenter(new THREE.Vector3());
        customModel.position.sub(center.multiplyScalar(scale));
        customModel.position.y += 0.2;

        scene.add(customModel);

        // Play animations if present
        if (gltf.animations && gltf.animations.length > 0) {
          mixer = new THREE.AnimationMixer(customModel);
          const action = mixer.clipAction(gltf.animations[0]);
          action.play();
        }
      },
      undefined,
      (error) => {
        // Fallback: If custom model not uploaded yet, render a procedural Golden Book Wyrm!
        setLoading(false);
        setModelFound(false);

        proceduralDragon = createProceduralDragon();
        scene.add(proceduralDragon);
      }
    );

    // Procedural Stylized Origami Book Wyrm
    function createProceduralDragon() {
      const group = new THREE.Group();

      const goldMat = new THREE.MeshStandardMaterial({
        color: 0xb69a72,
        roughness: 0.35,
        metalness: 0.75,
      });

      const wineMat = new THREE.MeshStandardMaterial({
        color: 0x652e3c,
        roughness: 0.5,
        metalness: 0.3,
      });

      // Body (Segmented curve)
      const bodyGeo = new THREE.ConeGeometry(0.35, 1.2, 5);
      const body = new THREE.Mesh(bodyGeo, goldMat);
      body.rotation.z = Math.PI * 0.45;
      body.position.set(-0.2, 0.1, 0);
      group.add(body);

      // Head
      const headGeo = new THREE.ConeGeometry(0.22, 0.5, 4);
      const head = new THREE.Mesh(headGeo, wineMat);
      head.rotation.z = -Math.PI * 0.4;
      head.position.set(0.5, 0.45, 0);
      group.add(head);

      // Horns
      const hornGeo = new THREE.ConeGeometry(0.05, 0.3, 3);
      const hornL = new THREE.Mesh(hornGeo, goldMat);
      hornL.position.set(0.4, 0.7, 0.1);
      hornL.rotation.set(-0.3, 0, 0.4);
      group.add(hornL);

      const hornR = new THREE.Mesh(hornGeo, goldMat);
      hornR.position.set(0.4, 0.7, -0.1);
      hornR.rotation.set(0.3, 0, 0.4);
      group.add(hornR);

      // Wings (Left & Right)
      const wingGeo = new THREE.BufferGeometry();
      const vertices = new Float32Array([
        0, 0, 0,
        0.6, 0.8, 0.3,
        0.8, 0.1, 0.1,

        0, 0, 0,
        -0.6, 0.8, -0.3,
        -0.8, 0.1, -0.1,
      ]);
      wingGeo.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
      wingGeo.computeVertexNormals();

      const wings = new THREE.Mesh(wingGeo, new THREE.MeshStandardMaterial({
        color: 0xded6cc,
        side: THREE.DoubleSide,
        roughness: 0.3,
      }));
      wings.position.set(0, 0.3, 0);
      group.add(wings);

      // Floating pedestal (Antique leather book)
      const bookGeo = new THREE.BoxGeometry(1.6, 0.22, 1.2);
      const book = new THREE.Mesh(bookGeo, new THREE.MeshStandardMaterial({
        color: 0x421f2a,
        roughness: 0.6,
      }));
      book.position.set(0, -0.55, 0);
      group.add(book);

      // Book Gold Gilt Page Edge
      const pagesGeo = new THREE.BoxGeometry(1.52, 0.18, 1.12);
      const pages = new THREE.Mesh(pagesGeo, new THREE.MeshStandardMaterial({
        color: 0xfff0d0,
        roughness: 0.8,
      }));
      pages.position.set(0.04, -0.55, 0);
      group.add(pages);

      group.position.y = 0.1;
      return group;
    }

    // Animation Loop
    const clock = new THREE.Clock();
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      const delta = clock.getDelta();
      const elapsedTime = clock.getElapsedTime();

      if (mixer) {
        mixer.update(delta);
      }

      // Gentle floating animation
      if (proceduralDragon) {
        proceduralDragon.position.y = 0.1 + Math.sin(elapsedTime * 2.0) * 0.06;
        proceduralDragon.rotation.y = Math.sin(elapsedTime * 0.5) * 0.15;
      } else if (customModel) {
        customModel.position.y = 0.2 + Math.sin(elapsedTime * 2.0) * 0.04;
      }

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Resize Handler
    const handleResize = () => {
      if (!container) return;
      const newW = container.clientWidth || 240;
      const newH = container.clientHeight || 240;
      camera.aspect = newW / newH;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      controls.dispose();
      renderer.dispose();
      if (container && renderer.domElement) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [modelUrl, minimized]);

  // If embedded in a specific section (e.g. Hero or Featured Book)
  if (embedded) {
    return (
      <div className={`relative flex flex-col items-center ${className}`}>
        <div
          ref={mountRef}
          className="w-full h-64 sm:h-72 cursor-grab active:cursor-grabbing select-none"
          title="Drag to rotate the 3D Guardian"
        />
        <div className="flex items-center gap-2 text-[10px] font-sans text-stone-dark uppercase tracking-widest mt-1">
          <Sparkles className="w-3 h-3 text-gold" />
          <span>{modelFound ? "Interactive 3D Dragon" : "Sanctuary Guardian (Drag to Rotate)"}</span>
        </div>
      </div>
    );
  }

  // Floating Interactive Desktop / Tablet Companion
  return (
    <aside
      className={`fixed bottom-16 sm:bottom-6 right-4 sm:right-6 z-30 transition-all duration-300 ${
        minimized ? 'translate-y-2' : ''
      }`}
      aria-label="3D Literary Guardian"
    >
      <div className="relative bg-white/95 backdrop-blur-md border border-stone/80 rounded-[4px] shadow-modal p-3 flex flex-col items-center">
        {/* Header Bar */}
        <div className="w-full flex items-center justify-between pb-1.5 border-b border-stone/40 text-charcoal">
          <div className="flex items-center gap-1.5 text-[10px] font-sans uppercase tracking-widest font-semibold text-burgundy">
            <Sparkles className="w-3 h-3 text-gold" />
            <span>{minimized ? '3D Guardian' : title}</span>
          </div>
          <button
            onClick={() => setMinimized(!minimized)}
            className="p-1 text-charcoal/50 hover:text-burgundy rounded hover:bg-stone/30 transition-colors"
            title={minimized ? 'Expand 3D Guardian' : 'Minimize'}
            aria-label={minimized ? 'Expand' : 'Minimize'}
          >
            {minimized ? <Eye className="w-3.5 h-3.5" /> : <X className="w-3.5 h-3.5" />}
          </button>
        </div>

        {/* 3D Viewport */}
        {!minimized && (
          <div className="flex flex-col items-center">
            <div
              ref={mountRef}
              className="w-48 h-48 sm:w-56 sm:h-56 cursor-grab active:cursor-grabbing select-none"
              title="Click & Drag to rotate in 3D"
            />

            <div className="text-center pb-1">
              <span className="text-[9px] font-serif italic text-charcoal/60 block">
                {modelFound
                  ? 'Custom 3D Dragon Loaded'
                  : 'Drop your dragon.glb into public/models/'}
              </span>
              <span className="text-[8px] font-sans uppercase tracking-wider text-gold font-medium">
                Drag to explore 360°
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
