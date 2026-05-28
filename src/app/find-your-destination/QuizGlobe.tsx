"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface CountryMarker {
  id: string;
  label: string;
  flag: string;
  lat: number;
  lng: number;
}

const QUIZ_COUNTRIES: CountryMarker[] = [
  { id: "uk",        label: "United Kingdom", flag: "🇬🇧", lat: 51.5,  lng: -0.1   },
  { id: "usa",       label: "United States",  flag: "🇺🇸", lat: 40.7,  lng: -74.0  },
  { id: "canada",    label: "Canada",         flag: "🇨🇦", lat: 43.7,  lng: -79.4  },
  { id: "australia", label: "Australia",      flag: "🇦🇺", lat: -33.9, lng: 151.2  },
  { id: "germany",   label: "Germany",        flag: "🇩🇪", lat: 52.5,  lng: 13.4   },
  { id: "nz",        label: "New Zealand",    flag: "🇳🇿", lat: -36.8, lng: 174.8  },
];

function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
    r * Math.cos(phi),
    r * Math.sin(phi) * Math.sin(theta)
  );
}

export default function QuizGlobe() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeCountry, setActiveCountry] = useState<CountryMarker | null>(QUIZ_COUNTRIES[0]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    // Scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 100);
    camera.position.set(0, 0, 3.0);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    // Globe group (we rotate this)
    const globe = new THREE.Group();
    scene.add(globe);
    globe.rotation.z = THREE.MathUtils.degToRad(12);

    // Dot sphere surface — softer color for the Admizz light card
    const DOT_COUNT = 3500;
    const positions: number[] = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi = Math.acos(1 - (2 * (i + 0.5)) / DOT_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const v = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta)
      );
      positions.push(v.x, v.y, v.z);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x31429c, // Admizz blue-royal
      size: 0.018,
      transparent: true,
      opacity: 0.65,
      sizeAttenuation: true,
    });
    globe.add(new THREE.Points(dotGeo, dotMat));

    // Faint wireframe
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x0d1282,
      wireframe: true,
      transparent: true,
      opacity: 0.05,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), wireMat));

    // Atmosphere outer glow
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0x31429c,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.18, 32, 24), atmMat));

    // Inner rim
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0x31429c,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.08, 32, 24), rimMat));

    // Country markers
    type MarkerEntry = {
      country: CountryMarker;
      ring: THREE.Mesh;
      dot: THREE.Mesh;
      ringMat: THREE.MeshBasicMaterial;
      pulsePhase: number;
      worldPos: THREE.Vector3;
    };
    const markers: MarkerEntry[] = [];

    QUIZ_COUNTRIES.forEach((c, i) => {
      const pos = latLngToVec3(c.lat, c.lng, 1);

      // Pulse ring
      const ringGeo = new THREE.RingGeometry(0.04, 0.06, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: 0xfded22, // Admizz yellow
        transparent: true,
        opacity: 0.6,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.005));
      ring.lookAt(pos.clone().multiplyScalar(3));
      globe.add(ring);

      // Core dot
      const dot = new THREE.Mesh(
        new THREE.SphereGeometry(0.022, 12, 12),
        new THREE.MeshBasicMaterial({ color: 0xfded22 })
      );
      dot.position.copy(pos.clone().multiplyScalar(1.012));
      globe.add(dot);

      markers.push({
        country: c,
        ring,
        dot,
        ringMat,
        pulsePhase: i * (Math.PI / 3),
        worldPos: new THREE.Vector3(),
      });
    });

    // Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.7));
    const point = new THREE.PointLight(0x31429c, 1.5, 6);
    point.position.set(2, 2, 2);
    scene.add(point);

    // ── Mouse drag interaction ──
    let isDragging = false;
    let lastX = 0;
    let lastY = 0;
    let dragVelX = 0;
    let dragVelY = 0;
    let autoSpin = true;

    const onPointerDown = (e: PointerEvent) => {
      isDragging = true;
      autoSpin = false;
      lastX = e.clientX;
      lastY = e.clientY;
      canvas.style.cursor = "grabbing";
    };
    const onPointerMove = (e: PointerEvent) => {
      if (!isDragging) return;
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      dragVelX = dx * 0.005;
      dragVelY = dy * 0.005;
      globe.rotation.y += dragVelX;
      globe.rotation.x = Math.max(-0.7, Math.min(0.7, globe.rotation.x + dragVelY));
      lastX = e.clientX;
      lastY = e.clientY;
    };
    const onPointerUp = () => {
      isDragging = false;
      canvas.style.cursor = "grab";
      // re-enable auto-spin after a moment
      setTimeout(() => { autoSpin = true; }, 1500);
    };

    canvas.addEventListener("pointerdown", onPointerDown);
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    // ── Click to highlight a marker ──
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();
    let pointerDownAt = { x: 0, y: 0 };
    const onClickDown = (e: PointerEvent) => {
      pointerDownAt = { x: e.clientX, y: e.clientY };
    };
    const onClickUp = (e: PointerEvent) => {
      const dist = Math.hypot(e.clientX - pointerDownAt.x, e.clientY - pointerDownAt.y);
      if (dist > 5) return; // it was a drag, not a click
      const rect = canvas.getBoundingClientRect();
      mouse.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(mouse, camera);
      const hits = raycaster.intersectObjects(markers.map((m) => m.dot));
      if (hits.length > 0) {
        const hitDot = hits[0].object as THREE.Mesh;
        const found = markers.find((m) => m.dot === hitDot);
        if (found) setActiveCountry(found.country);
      }
    };
    canvas.addEventListener("pointerdown", onClickDown);
    canvas.addEventListener("pointerup", onClickUp);

    // Resize
    const onResize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    // Animation loop
    let frameId = 0;
    let t = 0;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.01;

      if (autoSpin && !isDragging) {
        globe.rotation.y += 0.0015;
      }

      // Pulse rings
      markers.forEach((m) => {
        const s = 1 + 0.4 * Math.sin(t * 1.6 + m.pulsePhase);
        m.ring.scale.setScalar(s);
        m.ringMat.opacity = 0.6 * (1 - (s - 1) / 0.4) + 0.15;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Cleanup
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointerMove);
      window.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerdown", onClickDown);
      canvas.removeEventListener("pointerup", onClickUp);

      // Dispose geometries/materials
      dotGeo.dispose();
      dotMat.dispose();
      wireMat.dispose();
      atmMat.dispose();
      rimMat.dispose();
      markers.forEach((m) => {
        m.ring.geometry.dispose();
        m.ringMat.dispose();
        m.dot.geometry.dispose();
        (m.dot.material as THREE.Material).dispose();
      });
      renderer.dispose();
    };
  }, []);

  return (
    <div className="relative w-full max-w-[340px] mx-auto aspect-square">
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        aria-label="Interactive 3D globe showing the 6 study destinations"
      />
      {/* Hover/click hint */}
      <div className="absolute top-2 left-1/2 -translate-x-1/2 text-[10px] font-semibold uppercase tracking-[0.15em] text-blue-royal/60 pointer-events-none">
        Drag · Click a dot
      </div>
      {/* Active country pill */}
      {activeCountry && (
        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 bg-white border border-border-light shadow-[0_4px_16px_rgba(0,19,83,0.08)] rounded-full px-3.5 py-1.5 text-[12px] font-bold text-navy whitespace-nowrap flex items-center gap-1.5">
          <span className="text-base leading-none">{activeCountry.flag}</span>
          {activeCountry.label}
        </div>
      )}
    </div>
  );
}
