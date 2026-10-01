import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeCanvas({
  geometryType = 'torusKnot',
  wireframe = true,
  speed = 1.0,
  particleCount = 1500,
  primaryColor = '#ff2a5f',
  secondaryColor = '#00f0ff',
  height = '100%',
  interactive = true,
  className = ''
}) {
  const mountRef = useRef(null);
  const sceneRef = useRef(null);
  const meshRef = useRef(null);
  const particlesRef = useRef(null);
  const gridRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const animFrameId = useRef(null);

  useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    const width = container.clientWidth || 600;
    const height = container.clientHeight || 500;

    // 1. Scene, Camera, Renderer
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 1000);
    camera.position.z = 7;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // 2. Main 3D Shape
    const createGeometry = (type) => {
      switch (type) {
        case 'icosahedron':
          return new THREE.IcosahedronGeometry(1.9, 2);
        case 'waveGrid':
          return new THREE.PlaneGeometry(4.5, 4.5, 36, 36);
        case 'dodecahedron':
          return new THREE.DodecahedronGeometry(1.9, 1);
        case 'sphere':
          return new THREE.SphereGeometry(1.8, 48, 48);
        case 'torusKnot':
        default:
          return new THREE.TorusKnotGeometry(1.5, 0.42, 120, 24, 2, 3);
      }
    };

    const geom = createGeometry(geometryType);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(primaryColor),
      wireframe: wireframe,
      roughness: 0.2,
      metalness: 0.8,
      emissive: new THREE.Color(primaryColor),
      emissiveIntensity: wireframe ? 0.35 : 0.15,
    });

    const mesh = new THREE.Mesh(geom, material);
    scene.add(mesh);
    meshRef.current = mesh;

    // Add an inner glowing wireframe core
    const innerGeom = new THREE.IcosahedronGeometry(0.8, 1);
    const innerMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color(secondaryColor),
      wireframe: true,
      transparent: true,
      opacity: 0.6
    });
    const innerMesh = new THREE.Mesh(innerGeom, innerMat);
    mesh.add(innerMesh);

    // 3. Particle Starfield / Dust Field
    const particleGeometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);

    const c1 = new THREE.Color(primaryColor);
    const c2 = new THREE.Color(secondaryColor);

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;
      const radius = 3.5 + Math.random() * 4.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);

      positions[i3] = radius * Math.sin(phi) * Math.cos(theta);
      positions[i3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
      positions[i3 + 2] = radius * Math.cos(phi);

      const mixedColor = c1.clone().lerp(c2, Math.random());
      colors[i3] = mixedColor.r;
      colors[i3 + 1] = mixedColor.g;
      colors[i3 + 2] = mixedColor.b;
    }

    particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    particleGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

    const particleMaterial = new THREE.PointsMaterial({
      size: 0.04,
      vertexColors: true,
      transparent: true,
      opacity: 0.75,
      blending: THREE.AdditiveBlending
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    scene.add(particles);
    particlesRef.current = particles;

    // 4. Subtle Ambient Floor Grid
    const gridHelper = new THREE.GridHelper(18, 24, new THREE.Color(secondaryColor), new THREE.Color(0x1a1a28));
    gridHelper.position.y = -3.2;
    gridHelper.material.opacity = 0.25;
    gridHelper.material.transparent = true;
    scene.add(gridHelper);
    gridRef.current = gridHelper;

    // 5. Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(new THREE.Color(primaryColor), 8, 20);
    pointLight1.position.set(4, 4, 4);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(new THREE.Color(secondaryColor), 7, 20);
    pointLight2.position.set(-4, -3, 3);
    scene.add(pointLight2);

    // 6. Mouse Interaction Event Listeners
    const handleMouseMove = (e) => {
      if (!interactive) return;
      const rect = container.getBoundingClientRect();
      const clientX = e.clientX - rect.left;
      const clientY = e.clientY - rect.top;
      mouseRef.current.targetX = (clientX / rect.width - 0.5) * 2;
      mouseRef.current.targetY = (clientY / rect.height - 0.5) * 2;
    };

    if (interactive) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    // 7. Resize Observer
    const handleResize = () => {
      if (!container) return;
      const newWidth = container.clientWidth;
      const newHeight = container.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(newWidth, newHeight);
    };

    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(container);

    // 8. Render Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      const elapsedTime = clock.getElapsedTime();
      const delta = clock.getDelta();

      // Mouse lerp damping
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.05;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.05;

      if (meshRef.current) {
        meshRef.current.rotation.x = elapsedTime * 0.35 * speed + mouseRef.current.y * 0.4;
        meshRef.current.rotation.y = elapsedTime * 0.5 * speed + mouseRef.current.x * 0.6;
        meshRef.current.rotation.z = Math.sin(elapsedTime * 0.2) * 0.2;

        // If plane geometry, ripple the vertices dynamically
        if (geometryType === 'waveGrid' && meshRef.current.geometry.attributes.position) {
          const pos = meshRef.current.geometry.attributes.position;
          for (let i = 0; i < pos.count; i++) {
            const u = pos.getX(i);
            const v = pos.getY(i);
            const z = Math.sin(u * 2 + elapsedTime * 2 * speed) * 0.35 + Math.cos(v * 2 + elapsedTime * 1.5) * 0.2;
            pos.setZ(i, z);
          }
          pos.needsUpdate = true;
        }

        innerMesh.rotation.y = -elapsedTime * 0.8 * speed;
        innerMesh.rotation.x = elapsedTime * 0.4 * speed;
      }

      if (particlesRef.current) {
        particlesRef.current.rotation.y = -elapsedTime * 0.08 * speed;
        particlesRef.current.rotation.x = Math.sin(elapsedTime * 0.05) * 0.1;
      }

      if (gridRef.current) {
        gridRef.current.position.z = (elapsedTime * 0.5 * speed) % 1.5;
      }

      renderer.render(scene, camera);
      animFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
      if (interactive) window.removeEventListener('mousemove', handleMouseMove);
      resizeObserver.disconnect();
      renderer.dispose();
      geom.dispose();
      material.dispose();
      innerGeom.dispose();
      innerMat.dispose();
      particleGeometry.dispose();
      particleMaterial.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [geometryType, wireframe, speed, particleCount, primaryColor, secondaryColor, interactive]);

  return (
    <div
      ref={mountRef}
      className={`relative w-full overflow-hidden select-none ${className}`}
      style={{ height }}
    />
  );
}
