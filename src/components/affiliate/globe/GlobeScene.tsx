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

    /* ── Fibonacci dot sphere — masked to land only ───────────────────── */
    const CANDIDATE_COUNT = reducedDetail ? 8000 : 14000;
    const dotMat = new THREE.PointsMaterial({
      color:            0xb8d4ff,
      size:             reducedDetail ? 0.022 : 0.02,
      transparent:      true,
      opacity:          1.0,
      sizeAttenuation:  true,
    });
    let dotsMesh: THREE.Points | null = null;

    // Pre-compute Fibonacci candidate positions (same for any mask).
    const candidates: number[] = [];
    for (let i = 0; i < CANDIDATE_COUNT; i++) {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / CANDIDATE_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      candidates.push(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      );
    }

    // Load mask and build the land-only Points object once it arrives.
    // three-globe's earth-water.png: bright = water, dark = land.
    const maskImg = new Image();
    maskImg.crossOrigin = "anonymous";
    maskImg.src = "/images/world-land-mask.png";
    let cancelledMask = false;
    maskImg.onload = () => {
      if (cancelledMask) return;
      const mw = maskImg.naturalWidth;
      const mh = maskImg.naturalHeight;
      const off = document.createElement("canvas");
      off.width = mw;
      off.height = mh;
      const octx = off.getContext("2d", { willReadFrequently: true });
      if (!octx) return;
      octx.drawImage(maskImg, 0, 0);
      const data = octx.getImageData(0, 0, mw, mh).data;
      const landPositions: number[] = [];
      for (let i = 0; i < CANDIDATE_COUNT; i++) {
        const x = candidates[i * 3];
        const y = candidates[i * 3 + 1];
        const z = candidates[i * 3 + 2];
        // UV mapping consistent with latLngToVec3():
        //   marker: x = -sin(phi)cos(theta), z = sin(phi)sin(theta), theta = lng+π
        // For a dot at (x,y,z), recover lng via lng = -atan2(z, x).
        const lat = Math.asin(y);
        const lng = -Math.atan2(z, x);
        const u = (lng + Math.PI) / (2 * Math.PI);
        const v = (Math.PI / 2 - lat) / Math.PI;
        const px = Math.min(mw - 1, Math.max(0, Math.floor(u * mw)));
        const py = Math.min(mh - 1, Math.max(0, Math.floor(v * mh)));
        if (data[(py * mw + px) * 4] < 100) {
          landPositions.push(x, y, z);
        }
      }
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(landPositions, 3));
      geo.computeBoundingSphere();
      dotsMesh = new THREE.Points(geo, dotMat);
      dotsMesh.frustumCulled = false;
      globe.add(dotsMesh);
    };
    maskImg.onerror = () => {
      // Fallback: full Fibonacci sphere if mask fails to load.
      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.Float32BufferAttribute(candidates, 3));
      geo.computeBoundingSphere();
      dotsMesh = new THREE.Points(geo, dotMat);
      dotsMesh.frustumCulled = false;
      globe.add(dotsMesh);
    };

    /* ── Solid backing sphere (slightly smaller, soft fill) ───────────── */
    const fillMat = new THREE.MeshBasicMaterial({
      color:       0x040a24,
      transparent: true,
      opacity:     0.92,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(0.985, 64, 48), fillMat));

    /* ── Inner atmosphere rim ─────────────────────────────────────────── */
    const rimMat = new THREE.MeshBasicMaterial({
      color:       0x4d6ee6,
      transparent: true,
      opacity:     0.28,
      side:        THREE.BackSide,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.08, 64, 48), rimMat));

    /* ── Outer atmosphere glow ────────────────────────────────────────── */
    const atmMat = new THREE.MeshBasicMaterial({
      color:       0x6b88ff,
      transparent: true,
      opacity:     0.12,
      side:        THREE.BackSide,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.32, 64, 48), atmMat));

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

    /* Drag state */
    let dragging = false;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragLastX = 0;
    let dragLastY = 0;
    let dragMoved = false;
    let dragVelX = 0; // radians per second (Y axis spin)
    let dragVelY = 0; // radians per second (X axis tilt)
    let userRotX = 0;
    const DRAG_THRESHOLD = 4;
    const MAX_TILT = Math.PI / 3; // ±60°

    canvas.style.cursor = "grab";
    canvas.style.touchAction = "none";

    const onPointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.x =  ((e.clientX - rect.left) / rect.width)  * 2 - 1;
      pointer.y = -((e.clientY - rect.top)  / rect.height) * 2 + 1;
      pointerActive = true;
      pointerInside = true;

      if (dragging) {
        const dx = e.clientX - dragLastX;
        const dy = e.clientY - dragLastY;
        if (!dragMoved && Math.hypot(e.clientX - dragStartX, e.clientY - dragStartY) > DRAG_THRESHOLD) {
          dragMoved = true;
          // While dragging, suppress hover popups.
          if (hoverDestRef.current) {
            hoverDestRef.current = null;
            onHoverDestination?.(null, null);
          }
        }
        if (dragMoved) {
          const yawDelta = dx * 0.005;
          const pitchDelta = dy * 0.005;
          rotationY += yawDelta;
          userRotX = Math.max(-MAX_TILT, Math.min(MAX_TILT, userRotX + pitchDelta));
          // Track velocity for inertia (radians per second @ ~60fps approx).
          dragVelX = yawDelta * 60;
          dragVelY = pitchDelta * 60;
          dragLastX = e.clientX;
          dragLastY = e.clientY;
        }
      }
    };
    const onPointerDown = (e: PointerEvent) => {
      dragging = true;
      dragMoved = false;
      dragStartX = dragLastX = e.clientX;
      dragStartY = dragLastY = e.clientY;
      dragVelX = 0;
      dragVelY = 0;
      canvas.style.cursor = "grabbing";
      canvas.setPointerCapture?.(e.pointerId);
    };
    const onPointerUp = (e: PointerEvent) => {
      dragging = false;
      canvas.style.cursor = "grab";
      canvas.releasePointerCapture?.(e.pointerId);
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
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointercancel", onPointerUp);
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
        const hasMomentum = Math.abs(dragVelX) > 0.001 || Math.abs(dragVelY) > 0.001;
        if (dragging) {
          // User is dragging — pointer handler updates rotationY/userRotX directly.
        } else if (hasMomentum) {
          // Coast with exponential decay (~1.5s to ~0).
          rotationY += dragVelX * dt;
          userRotX = Math.max(-MAX_TILT, Math.min(MAX_TILT, userRotX + dragVelY * dt));
          const decay = Math.exp(-dt * 2.8);
          dragVelX *= decay;
          dragVelY *= decay;
          hoverPauseUntil = now + 1500; // delay auto-resume after coast
        } else {
          // Auto rotate (pause briefly on hover or after release)
          const targetSpeed = now < hoverPauseUntil ? 0.005 : 0.04;
          rotationY += targetSpeed * dt;
        }
        globe.rotation.x = userRotX;
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
      cancelledMask = true;
      cancelAnimationFrame(frameId);
      ro.disconnect();
      io.disconnect();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointercancel", onPointerUp);
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
