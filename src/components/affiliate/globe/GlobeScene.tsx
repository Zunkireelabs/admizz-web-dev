"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { ORIGINS, DESTINATIONS, ROUTE_PAIRS, type Destination, type GeoCity } from "./data";

interface Props {
  /** Reduced-detail mode for mobile / low-end devices */
  reducedDetail?: boolean;
  /** Disable all motion + arcs (prefers-reduced-motion) */
  staticOnly?:    boolean;
  /** Fires when a destination beacon is hovered (or null on leave) */
  onHoverDestination?: (d: Destination | null, screenPos: { x: number; y: number } | null) => void;
}

/** Convert lat/lng to a 3D vector on a unit sphere. */
function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

/** Great-circle interpolation between two surface points, lifted into an arc. */
function greatCirclePoints(a: THREE.Vector3, b: THREE.Vector3, segments: number, lift: number): THREE.Vector3[] {
  const points: THREE.Vector3[] = [];
  for (let i = 0; i <= segments; i++) {
    const t = i / segments;
    const p = new THREE.Vector3().lerpVectors(a, b, t).normalize();
    const arc = Math.sin(t * Math.PI) * lift;
    p.multiplyScalar(1 + arc);
    points.push(p);
  }
  return points;
}

interface ActiveRoute {
  line:          THREE.Line;
  geometry:      THREE.BufferGeometry;
  material:      THREE.LineBasicMaterial;
  particle:      THREE.Mesh;
  particleMat:   THREE.MeshBasicMaterial;
  points:        THREE.Vector3[];
  startTime:     number;
  lifetime:      number;   // seconds
  particleSpeed: number;
}

interface DestinationBeacon {
  destination: Destination;
  position:    THREE.Vector3;
  core:        THREE.Mesh;
  ring:        THREE.Mesh;
  ringMat:     THREE.MeshBasicMaterial;
  hitTarget:   THREE.Mesh;       // invisible raycast target
  pulsePhase:  number;
}

export default function GlobeScene({ reducedDetail = false, staticOnly = false, onHoverDestination }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const hoverDestRef = useRef<Destination | null>(null);

  useEffect(() => {
    const canvasEl = canvasRef.current;
    const container = containerRef.current;
    if (!canvasEl || !container) return;
    const canvas: HTMLCanvasElement = canvasEl;

    const getSize = () => {
      const r = container.getBoundingClientRect();
      return { w: r.width || 600, h: r.height || 600 };
    };

    let { w: W, h: H } = getSize();

    /* ── Scene / camera / renderer ────────────────────────────────────── */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, W / H, 0.01, 100);
    camera.position.set(0, 0, 4.3);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H, false);
    renderer.setClearColor(0x000000, 0);

    const globe = new THREE.Group();
    globe.rotation.z = THREE.MathUtils.degToRad(18);
    scene.add(globe);

    /* ── Fibonacci dot sphere (Earth surface) ─────────────────────────── */
    const DOT_COUNT = reducedDetail ? 1200 : 2000;
    const positions: number[] = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / DOT_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const x = Math.sin(phi) * Math.cos(theta);
      const y = Math.cos(phi);
      const z = Math.sin(phi) * Math.sin(theta);
      positions.push(x, y, z);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const dotMat = new THREE.PointsMaterial({
      color:            0x6a82c8,
      size:             reducedDetail ? 0.016 : 0.014,
      transparent:      true,
      opacity:          0.55,
      sizeAttenuation:  true,
    });
    const dots = new THREE.Points(dotGeo, dotMat);
    globe.add(dots);

    /* ── Solid backing sphere (slightly smaller, soft fill) ───────────── */
    const fillMat = new THREE.MeshBasicMaterial({
      color:       0x0a1a4a,
      transparent: true,
      opacity:     0.5,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(0.985, 32, 24), fillMat));

    /* ── Inner atmosphere rim ─────────────────────────────────────────── */
    const rimMat = new THREE.MeshBasicMaterial({
      color:       0x3355bb,
      transparent: true,
      opacity:     0.15,
      side:        THREE.BackSide,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.08, 32, 24), rimMat));

    /* ── Outer atmosphere glow ────────────────────────────────────────── */
    const atmMat = new THREE.MeshBasicMaterial({
      color:       0x4a6cd0,
      transparent: true,
      opacity:     0.07,
      side:        THREE.BackSide,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.32, 32, 24), atmMat));

    /* ── Distant starfield (parented to scene, not globe) ─────────────── */
    const STAR_COUNT = reducedDetail ? 350 : 700;
    const starPos: number[] = [];
    for (let i = 0; i < STAR_COUNT; i++) {
      const r = 18 + Math.random() * 12;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      starPos.push(
        r * Math.sin(p) * Math.cos(t),
        r * Math.cos(p),
        r * Math.sin(p) * Math.sin(t),
      );
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos, 3));
    const starMat = new THREE.PointsMaterial({
      color:       0xffffff,
      size:        0.07,
      transparent: true,
      opacity:     0.45,
      sizeAttenuation: true,
    });
    scene.add(new THREE.Points(starGeo, starMat));

    /* ── Origin markers (small, subtle) ───────────────────────────────── */
    ORIGINS.forEach((o: GeoCity) => {
      const pos = latLngToVec3(o.lat, o.lng, 1.005);
      const m = new THREE.Mesh(
        new THREE.SphereGeometry(0.009, 10, 10),
        new THREE.MeshBasicMaterial({ color: 0xaab8e8, transparent: true, opacity: 0.7 }),
      );
      m.position.copy(pos);
      globe.add(m);
    });

    /* ── Destination beacons + raycast targets ────────────────────────── */
    const beacons: DestinationBeacon[] = [];
    DESTINATIONS.forEach(d => {
      const pos = latLngToVec3(d.lat, d.lng, 1);

      // Core glow dot
      const core = new THREE.Mesh(
        new THREE.SphereGeometry(0.026, 14, 14),
        new THREE.MeshBasicMaterial({ color: 0xFDED22 }),
      );
      core.position.copy(pos.clone().multiplyScalar(1.012));
      globe.add(core);

      // Pulse ring (faces outward from globe center)
      const ringGeo = new THREE.RingGeometry(0.036, 0.055, 28);
      const ringMat = new THREE.MeshBasicMaterial({
        color:       0xFCB730,
        transparent: true,
        opacity:     0.6,
        side:        THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.014));
      ring.lookAt(pos.clone().multiplyScalar(4));
      globe.add(ring);

      // Invisible larger sphere as raycast target
      const hitGeo = new THREE.SphereGeometry(0.08, 8, 8);
      const hitMat = new THREE.MeshBasicMaterial({ visible: false });
      const hit = new THREE.Mesh(hitGeo, hitMat);
      hit.position.copy(pos.clone().multiplyScalar(1.05));
      hit.userData.destId = d.id;
      globe.add(hit);

      beacons.push({
        destination: d,
        position:    pos,
        core,
        ring,
        ringMat,
        hitTarget:   hit,
        pulsePhase:  Math.random() * Math.PI * 2,
      });
    });

    /* ── Active arc routes (cycling pool) ─────────────────────────────── */
    const MAX_ROUTES = reducedDetail ? 6 : 14;
    const routes: ActiveRoute[] = [];

    function pickRoutePair(): [GeoCity, Destination] {
      const [oId, dId] = ROUTE_PAIRS[Math.floor(Math.random() * ROUTE_PAIRS.length)];
      const origin = ORIGINS.find(o => o.id === oId)!;
      const dest   = DESTINATIONS.find(d => d.id === dId)!;
      return [origin, dest];
    }

    function spawnRoute(now: number): ActiveRoute {
      const [origin, dest] = pickRoutePair();
      const a = latLngToVec3(origin.lat, origin.lng, 1);
      const b = latLngToVec3(dest.lat,   dest.lng,   1);
      const pts = greatCirclePoints(a, b, 60, 0.32);

      const geometry = new THREE.BufferGeometry().setFromPoints(pts);
      const material = new THREE.LineBasicMaterial({
        color:       0x8fb6ff,
        transparent: true,
        opacity:     0,
      });
      const line = new THREE.Line(geometry, material);
      globe.add(line);

      const particleMat = new THREE.MeshBasicMaterial({ color: 0xFDED22, transparent: true, opacity: 0 });
      const particle = new THREE.Mesh(new THREE.SphereGeometry(0.014, 8, 8), particleMat);
      globe.add(particle);

      return {
        line,
        geometry,
        material,
        particle,
        particleMat,
        points:        pts,
        startTime:     now,
        lifetime:      6 + Math.random() * 3.5,        // 6–9.5s
        particleSpeed: 0.32 + Math.random() * 0.18,    // unit progress / second
      };
    }

    function disposeRoute(r: ActiveRoute) {
      globe.remove(r.line);
      globe.remove(r.particle);
      r.geometry.dispose();
      r.material.dispose();
      (r.particle.geometry as THREE.BufferGeometry).dispose();
      r.particleMat.dispose();
    }

    /* Pre-seed pool so the globe doesn't open empty */
    if (!staticOnly) {
      const seed = performance.now() / 1000;
      for (let i = 0; i < MAX_ROUTES; i++) {
        const r = spawnRoute(seed);
        r.startTime = seed - (i / MAX_ROUTES) * r.lifetime;
        routes.push(r);
      }
    }

    /* ── Pointer hover (raycasting) ───────────────────────────────────── */
    const raycaster = new THREE.Raycaster();
    const pointer   = new THREE.Vector2();
    let pointerActive = false;
    let pointerInside = false;

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      pointerActive = true;
      pointerInside = true;
    };
    const onPointerLeave = () => {
      pointerInside = false;
      pointerActive = false;
      if (hoverDestRef.current) {
        hoverDestRef.current = null;
        onHoverDestination?.(null, null);
      }
    };

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerleave", onPointerLeave);

    /* ── Resize ───────────────────────────────────────────────────────── */
    const onResize = () => {
      const { w, h } = getSize();
      W = w; H = h;
      camera.aspect = W / H;
      camera.updateProjectionMatrix();
      renderer.setSize(W, H, false);
    };
    const ro = new ResizeObserver(onResize);
    ro.observe(container);

    /* ── Animation loop (paused via IntersectionObserver) ─────────────── */
    let frameId = 0;
    let paused = false;
    let last = performance.now();

    /* Auto-rotation state */
    let rotationY = 0;
    let hoverPauseUntil = 0;

    function tick(now: number) {
      const dt = Math.min((now - last) / 1000, 0.05); // cap to avoid jumps
      last = now;
      const tSec = now / 1000;

      if (!staticOnly) {
        // Auto rotate (pause briefly on hover)
        const targetSpeed = now < hoverPauseUntil ? 0.005 : 0.04;
        rotationY += targetSpeed * dt;
        globe.rotation.y = rotationY;
      }

      // Pulse beacons
      beacons.forEach(b => {
        const s = 1 + 0.4 * Math.sin(tSec * 1.6 + b.pulsePhase);
        b.ring.scale.setScalar(s);
        b.ringMat.opacity = staticOnly ? 0.4 : 0.55 * (1 - (s - 1) / 0.4) + 0.15;
      });

      // Cycle routes
      if (!staticOnly) {
        for (let i = routes.length - 1; i >= 0; i--) {
          const r = routes[i];
          const age = tSec - r.startTime;
          const t = age / r.lifetime;

          if (t >= 1) {
            disposeRoute(r);
            routes.splice(i, 1);
            continue;
          }

          // Smooth fade-in (0-0.18) → hold → fade-out (0.75-1)
          let opacity = 0;
          if (t < 0.18)      opacity = (t / 0.18) * 0.55;
          else if (t > 0.75) opacity = ((1 - t) / 0.25) * 0.55;
          else               opacity = 0.55;
          r.material.opacity = opacity;

          // Particle along the arc
          const particleProgress = Math.min(1, age * r.particleSpeed);
          const idx = Math.floor(particleProgress * (r.points.length - 1));
          r.particle.position.copy(r.points[Math.min(idx, r.points.length - 1)]);
          // Trailing fade
          r.particleMat.opacity = Math.sin(particleProgress * Math.PI) * 0.95;
        }
        // Refill pool
        while (routes.length < MAX_ROUTES) {
          routes.push(spawnRoute(tSec));
        }
      }

      // Hover detection
      if (pointerActive && pointerInside) {
        raycaster.setFromCamera(pointer, camera);
        const targets = beacons.map(b => b.hitTarget);
        const hits = raycaster.intersectObjects(targets, false);
        if (hits.length > 0) {
          const hitId = hits[0].object.userData.destId;
          const beacon = beacons.find(b => b.destination.id === hitId);
          if (beacon && hoverDestRef.current?.id !== beacon.destination.id) {
            hoverDestRef.current = beacon.destination;
            // Project beacon world position to screen for card placement
            const world = new THREE.Vector3();
            beacon.core.getWorldPosition(world);
            const ndc = world.project(camera);
            const rect = canvas.getBoundingClientRect();
            const x = (ndc.x * 0.5 + 0.5) * rect.width;
            const y = (1 - (ndc.y * 0.5 + 0.5)) * rect.height;
            onHoverDestination?.(beacon.destination, { x, y });
            hoverPauseUntil = now + 1500;
          } else if (beacon && hoverDestRef.current?.id === beacon.destination.id) {
            // Update card position as the globe rotates
            const world = new THREE.Vector3();
            beacon.core.getWorldPosition(world);
            const ndc = world.project(camera);
            const rect = canvas.getBoundingClientRect();
            const x = (ndc.x * 0.5 + 0.5) * rect.width;
            const y = (1 - (ndc.y * 0.5 + 0.5)) * rect.height;
            onHoverDestination?.(beacon.destination, { x, y });
            hoverPauseUntil = now + 1500;
          }
          canvas.style.cursor = "pointer";
        } else {
          if (hoverDestRef.current) {
            hoverDestRef.current = null;
            onHoverDestination?.(null, null);
          }
          canvas.style.cursor = "grab";
        }
      }

      renderer.render(scene, camera);
      if (!paused) frameId = requestAnimationFrame(tick);
    }
    frameId = requestAnimationFrame(tick);

    /* ── Pause when offscreen ─────────────────────────────────────────── */
    const io = new IntersectionObserver(
      entries => {
        for (const e of entries) {
          if (e.isIntersecting) {
            if (paused) {
              paused = false;
              last = performance.now();
              frameId = requestAnimationFrame(tick);
            }
          } else {
            paused = true;
            cancelAnimationFrame(frameId);
          }
        }
      },
      { threshold: 0 },
    );
    io.observe(container);

    /* ── Cleanup ──────────────────────────────────────────────────────── */
    return () => {
      cancelAnimationFrame(frameId);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      routes.forEach(disposeRoute);
      scene.traverse(obj => {
        if ((obj as THREE.Mesh).geometry) (obj as THREE.Mesh).geometry.dispose?.();
        const mat = (obj as THREE.Mesh).material;
        if (Array.isArray(mat)) mat.forEach(m => m.dispose());
        else if (mat) (mat as THREE.Material).dispose();
      });
      renderer.dispose();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reducedDetail, staticOnly]);

  return (
    <div ref={containerRef} style={{ position: "relative", width: "100%", height: "100%" }}>
      <canvas ref={canvasRef} style={{ width: "100%", height: "100%", display: "block", cursor: "grab" }} />
    </div>
  );
}
