"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import * as THREE from "three";

/* ─── City coordinates (lat/lng → 3D) ─────────────────────────────── */
const CITIES = [
  { id: "ktm", label: "Kathmandu", lat: 27.7,  lng: 85.3,  primary: true  },
  { id: "lon", label: "London",    lat: 51.5,  lng: -0.1,  primary: false },
  { id: "syd", label: "Sydney",    lat: -33.9, lng: 151.2, primary: false },
  { id: "tor", label: "Toronto",   lat: 43.7,  lng: -79.4, primary: false },
  { id: "nyc", label: "New York",  lat: 40.7,  lng: -74.0, primary: false },
  { id: "tok", label: "Tokyo",     lat: 35.7,  lng: 139.7, primary: false },
];

const CONNECTIONS = [
  ["ktm","lon"],["ktm","syd"],["ktm","tor"],
  ["ktm","nyc"],["ktm","tok"],
] as const;

const STATS = [
  { value: 1500, suffix: "+", label: "Students Placed" },
  { value: 15,   suffix: "+", label: "Countries" },
  { value: 80,   suffix: "+", label: "Universities" },
  { value: 95,   suffix: "%", label: "Visa Success" },
];

/* ─── Helpers ─────────────────────────────────────────────────────── */
function latLngToVec3(lat: number, lng: number, r: number): THREE.Vector3 {
  const phi   = (90 - lat) * (Math.PI / 180);
  const theta = (lng + 180) * (Math.PI / 180);
  return new THREE.Vector3(
    -r * Math.sin(phi) * Math.cos(theta),
     r * Math.cos(phi),
     r * Math.sin(phi) * Math.sin(theta),
  );
}

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

function hexToColor(hex: string) { return new THREE.Color(hex); }

/* ─── Count-up hook ───────────────────────────────────────────────── */
function useCountUp(target: number, duration = 1800, active = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!active) return;
    let start = 0;
    const step = target / (duration / 16);
    const id = setInterval(() => {
      start = Math.min(start + step, target);
      setCount(Math.floor(start));
      if (start >= target) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [active, target, duration]);
  return count;
}

function StatItem({ value, suffix, label, active }: { value: number; suffix: string; label: string; active: boolean }) {
  const n = useCountUp(value, 1800, active);
  return (
    <div className="flex flex-col items-center px-4 py-5">
      <span className="text-2xl md:text-3xl font-extrabold" style={{ color: "#FCB730" }}>
        {n}{suffix}
      </span>
      <span className="text-xs mt-1 text-center font-medium" style={{ color: "rgba(255,255,255,0.5)" }}>{label}</span>
    </div>
  );
}

/* ─── Three.js Globe ─────────────────────────────────────────────── */
function GlobeCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const W = canvas.offsetWidth;
    const H = canvas.offsetHeight;

    /* Scene */
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, W / H, 0.01, 100);
    camera.position.set(0, 0, 2.8);

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(W, H);
    renderer.setClearColor(0x000000, 0);

    /* Globe group — we rotate this */
    const globe = new THREE.Group();
    scene.add(globe);
    /* tilt the globe slightly like a real one */
    globe.rotation.z = THREE.MathUtils.degToRad(12);

    /* ── Dot sphere surface ── */
    const DOT_COUNT = 5000;
    const positions: number[] = [];
    for (let i = 0; i < DOT_COUNT; i++) {
      const phi   = Math.acos(1 - 2 * (i + 0.5) / DOT_COUNT);
      const theta = Math.PI * (1 + Math.sqrt(5)) * i;
      const v = new THREE.Vector3(
        Math.sin(phi) * Math.cos(theta),
        Math.cos(phi),
        Math.sin(phi) * Math.sin(theta),
      );
      positions.push(v.x, v.y, v.z);
    }
    const dotGeo = new THREE.BufferGeometry();
    dotGeo.setAttribute("position", new THREE.Float32BufferAttribute(positions, 3));
    const dotMat = new THREE.PointsMaterial({
      color: 0x5577dd,
      size: 0.018,
      transparent: true,
      opacity: 0.7,
      sizeAttenuation: true,
    });
    globe.add(new THREE.Points(dotGeo, dotMat));

    /* ── Wireframe sphere (very faint) ── */
    const wireMat = new THREE.MeshBasicMaterial({
      color: 0x2244aa,
      wireframe: true,
      transparent: true,
      opacity: 0.06,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1, 32, 24), wireMat));

    /* ── Atmosphere glow (outer sphere) ── */
    const atmMat = new THREE.MeshBasicMaterial({
      color: 0x3355ff,
      transparent: true,
      opacity: 0.07,
      side: THREE.BackSide,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.18, 32, 24), atmMat));

    /* ── Atmosphere ring glow (inner rim) ── */
    const rimMat = new THREE.MeshBasicMaterial({
      color: 0x3366ee,
      transparent: true,
      opacity: 0.12,
      side: THREE.BackSide,
    });
    globe.add(new THREE.Mesh(new THREE.SphereGeometry(1.08, 32, 24), rimMat));

    /* ── City markers ── */
    const ktmPos = latLngToVec3(27.7, 85.3, 1);
    const cityMeshes: { mesh: THREE.Mesh; pulsePhase: number }[] = [];

    CITIES.forEach(city => {
      const pos = latLngToVec3(city.lat, city.lng, 1);

      /* Outer pulse ring */
      const ringGeo = new THREE.RingGeometry(0.028, 0.042, 24);
      const ringMat = new THREE.MeshBasicMaterial({
        color: city.primary ? 0xFDED22 : 0xFCB730,
        transparent: true,
        opacity: 0.5,
        side: THREE.DoubleSide,
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(pos.clone().multiplyScalar(1.002));
      ring.lookAt(pos.clone().multiplyScalar(3));
      globe.add(ring);

      /* Core dot */
      const dotMesh = new THREE.Mesh(
        new THREE.SphereGeometry(city.primary ? 0.022 : 0.014, 12, 12),
        new THREE.MeshBasicMaterial({ color: city.primary ? 0xFDED22 : 0xFCB730 }),
      );
      dotMesh.position.copy(pos.clone().multiplyScalar(1.01));
      globe.add(dotMesh);
      cityMeshes.push({ mesh: ring, pulsePhase: Math.random() * Math.PI * 2 });
    });

    /* ── Connection arcs ── */
    interface ArcData {
      line: THREE.Line;
      points: THREE.Vector3[];
      particleProgress: number;
      particleSpeed: number;
      particleMesh: THREE.Mesh;
    }
    const arcs: ArcData[] = [];

    CONNECTIONS.forEach(([fromId, toId], idx) => {
      const from = CITIES.find(c => c.id === fromId)!;
      const to   = CITIES.find(c => c.id === toId)!;
      const aPos = latLngToVec3(from.lat, from.lng, 1);
      const bPos = latLngToVec3(to.lat,   to.lng,   1);
      const pts  = greatCirclePoints(aPos, bPos, 80, 0.22);

      const arcGeo = new THREE.BufferGeometry().setFromPoints(pts);
      const arcMat = new THREE.LineBasicMaterial({
        color: 0xFCB730,
        transparent: true,
        opacity: 0.3,
      });
      const line = new THREE.Line(arcGeo, arcMat);
      globe.add(line);

      /* Traveling particle */
      const particle = new THREE.Mesh(
        new THREE.SphereGeometry(0.016, 8, 8),
        new THREE.MeshBasicMaterial({ color: 0xFDED22 }),
      );
      globe.add(particle);

      arcs.push({
        line,
        points: pts,
        particleProgress: (idx / CONNECTIONS.length),
        particleSpeed: 0.0018 + Math.random() * 0.0008,
        particleMesh: particle,
      });
    });

    /* ── Kathmandu glow beacon ── */
    const beaconGeo = new THREE.SphereGeometry(0.05, 16, 16);
    const beaconMat = new THREE.MeshBasicMaterial({
      color: 0xFDED22,
      transparent: true,
      opacity: 0.18,
    });
    const beacon = new THREE.Mesh(beaconGeo, beaconMat);
    beacon.position.copy(ktmPos.clone().multiplyScalar(1.01));
    globe.add(beacon);

    /* ── Point light ── */
    const light = new THREE.PointLight(0x4466ff, 2, 6);
    light.position.set(2, 2, 2);
    scene.add(light);
    scene.add(new THREE.AmbientLight(0x334488, 0.5));

    /* ── Resize handler ── */
    const onResize = () => {
      const w = canvas.offsetWidth;
      const h = canvas.offsetHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ── */
    let frameId: number;
    let t = 0;

    const animate = () => {
      frameId = requestAnimationFrame(animate);
      t += 0.005;

      /* Slow globe rotation */
      globe.rotation.y += 0.0012;

      /* Pulse rings */
      cityMeshes.forEach(({ mesh, pulsePhase }) => {
        const s = 1 + 0.35 * Math.sin(t * 1.8 + pulsePhase);
        mesh.scale.setScalar(s);
        (mesh.material as THREE.MeshBasicMaterial).opacity = 0.5 * (1 - (s - 1) / 0.35) + 0.1;
      });

      /* Traveling particles along arcs */
      arcs.forEach(arc => {
        arc.particleProgress = (arc.particleProgress + arc.particleSpeed) % 1;
        const idx = Math.floor(arc.particleProgress * (arc.points.length - 1));
        const p = arc.points[Math.min(idx, arc.points.length - 1)];
        arc.particleMesh.position.copy(p);
        /* Fade in/out at endpoints */
        const fade = Math.sin(arc.particleProgress * Math.PI);
        (arc.particleMesh.material as THREE.MeshBasicMaterial).opacity = fade;
      });

      /* Beacon beacon */
      const bs = 1 + 0.4 * Math.sin(t * 2.5);
      beacon.scale.setScalar(bs);
      beaconMat.opacity = 0.18 * (1 - (bs - 1) / 0.4) + 0.05;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: "100%", height: "100%", display: "block" }}
    />
  );
}

/* ─── Main Hero ──────────────────────────────────────────────────── */
export default function AffiliateHero() {
  const reduce = useReducedMotion();
  const [statsActive, setStatsActive] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setStatsActive(true), 900);
    return () => clearTimeout(t);
  }, []);

  return (
    <section
      className="relative min-h-screen flex flex-col overflow-hidden"
      style={{ background: "linear-gradient(135deg, #010b22 0%, #001353 45%, #0c1270 100%)" }}
    >
      {/* Dot grid */}
      <div className="absolute inset-0 pointer-events-none" style={{
        backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.055) 1px, transparent 1px)",
        backgroundSize: "44px 44px",
      }} />

      {/* Ambient glows */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: "radial-gradient(ellipse 60% 60% at 20% 50%, rgba(49,66,156,0.4) 0%, transparent 70%)",
      }} />
      <div className="absolute top-0 right-0 w-[700px] h-[700px] pointer-events-none" style={{
        background: "radial-gradient(circle at top right, rgba(252,183,48,0.10) 0%, transparent 55%)",
      }} />

      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-[2px]" style={{
        background: "linear-gradient(90deg, transparent 0%, #FCB730 30%, #FDED22 50%, #FCB730 70%, transparent 100%)",
      }} />

      <div className="relative z-10 flex-1 flex flex-col">
        <div className="max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pt-20 pb-6 flex-1 flex flex-col lg:flex-row items-center gap-10 lg:gap-0">

          {/* ── LEFT TEXT  (52%) ── */}
          <div className="w-full lg:w-[52%] flex flex-col items-start pr-0 lg:pr-12">

            {/* Eyebrow pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <span
                className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold tracking-widest uppercase"
                style={{
                  background: "rgba(253,237,34,0.08)",
                  border: "1px solid rgba(253,237,34,0.28)",
                  color: "#FDED22",
                  boxShadow: "0 0 24px rgba(253,237,34,0.1)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
                Nepal&apos;s #1 Student Affiliate Program
              </span>
            </motion.div>

            {/* Headline */}
            <div className="mt-5 flex flex-col" style={{ gap: "2px" }}>
              {[
                { text: "Earn.",       gold: false },
                { text: "Represent.",  gold: true  },
                { text: "Grow.",       gold: false },
              ].map((w, i) => (
                <motion.span
                  key={w.text}
                  className="font-extrabold leading-[1.0] tracking-tight"
                  style={w.gold ? {
                    fontSize: "clamp(2.6rem, 5.2vw, 5rem)",
                    background: "linear-gradient(90deg, #FCB730 0%, #FDED22 55%, #FCB730 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    filter: "drop-shadow(0 0 30px rgba(252,183,48,0.4))",
                  } : {
                    fontSize: "clamp(2.6rem, 5.2vw, 5rem)",
                    color: "#ffffff",
                  }}
                  initial={reduce ? { opacity: 0 } : { opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.08 + i * 0.13, ease: [0.22, 1, 0.36, 1] as const }}
                >
                  {w.text}
                </motion.span>
              ))}
            </div>

            {/* Subheadline */}
            <motion.p
              className="mt-5 text-base md:text-[17px] leading-relaxed max-w-[480px]"
              style={{ color: "rgba(255,255,255,0.6)" }}
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.52, ease: [0.22, 1, 0.36, 1] as const }}
            >
              Help students find their path to global education — and earn real commissions while doing it.
              Join Nepal&apos;s most ambitious student affiliate ecosystem.
            </motion.p>

            {/* CTAs */}
            <motion.div
              className="mt-7 flex flex-wrap gap-4"
              initial={reduce ? { opacity: 0 } : { opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.65, ease: [0.22, 1, 0.36, 1] as const }}
            >
              <motion.button
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-[10px] font-extrabold text-[15px] text-black"
                style={{ background: "#FDED22", boxShadow: "0 4px 32px rgba(253,237,34,0.5)" }}
                whileHover={reduce ? {} : { scale: 1.05, boxShadow: "0 6px 48px rgba(253,237,34,0.65)" }}
                whileTap={{ scale: 0.97 }}
                onClick={() => document.getElementById("apply-form")?.scrollIntoView({ behavior: "smooth" })}
              >
                Apply Now — It&apos;s Free
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </motion.button>

              <motion.button
                className="inline-flex items-center gap-2 px-7 py-4 rounded-[10px] font-semibold text-[15px] text-white"
                style={{ border: "1px solid rgba(255,255,255,0.2)", background: "rgba(255,255,255,0.04)" }}
                whileHover={reduce ? {} : { background: "rgba(255,255,255,0.09)", borderColor: "rgba(255,255,255,0.35)" }}
                onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
              >
                See How It Works
                <svg className="w-4 h-4 opacity-55" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </motion.button>
            </motion.div>

            {/* Trust micro-copy */}
            <motion.div
              className="mt-7 flex flex-wrap gap-x-5 gap-y-2 text-sm"
              style={{ color: "rgba(255,255,255,0.38)" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.85 }}
            >
              {["Free to join", "Approved in 48 hrs", "No audience required"].map(t => (
                <span key={t} className="flex items-center gap-1.5">
                  <span style={{ color: "#FCB730" }}>✓</span> {t}
                </span>
              ))}
            </motion.div>
          </div>

          {/* ── RIGHT: THREE.JS GLOBE (48%) ── */}
          <motion.div
            className="w-full lg:w-[48%] relative flex items-center justify-center"
            style={{ height: "clamp(360px, 42vw, 540px)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.2 }}
          >
            <GlobeCanvas />

            {/* Floating notification badges */}
            <motion.div
              className="absolute top-[8%] right-[4%] px-3 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 pointer-events-none"
              style={{
                background: "rgba(0,10,40,0.85)",
                border: "1px solid rgba(252,183,48,0.35)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                whiteSpace: "nowrap",
              }}
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.4, duration: 0.6 }}
            >
              <span className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: "#4ade80", boxShadow: "0 0 6px #4ade80" }} />
              <motion.span animate={reduce ? {} : { y: [0, -6, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
                Rohan K. just earned a commission
              </motion.span>
            </motion.div>

            <motion.div
              className="absolute bottom-[10%] left-[2%] px-3 py-2.5 rounded-xl text-xs font-semibold text-white flex items-center gap-2 pointer-events-none"
              style={{
                background: "rgba(0,10,40,0.85)",
                border: "1px solid rgba(49,66,156,0.5)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.5)",
                whiteSpace: "nowrap",
              }}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.7, duration: 0.6 }}
            >
              <motion.span animate={reduce ? {} : { y: [0, 6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1 }}>
                <span style={{ marginRight: "6px" }}>📍</span>Priya S. referred 3 students this week
              </motion.span>
            </motion.div>

            <motion.div
              className="absolute top-[42%] left-[0%] px-3 py-2 rounded-xl text-xs font-semibold text-white flex items-center gap-2 pointer-events-none"
              style={{
                background: "rgba(0,10,40,0.85)",
                border: "1px solid rgba(253,237,34,0.25)",
                backdropFilter: "blur(14px)",
                boxShadow: "0 4px 24px rgba(0,0,0,0.4)",
                whiteSpace: "nowrap",
              }}
              initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 2.0, duration: 0.6 }}
            >
              <motion.span animate={reduce ? {} : { y: [0, -4, 0] }} transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 2 }}>
                <span style={{ color: "#FDED22", marginRight: "5px" }}>★</span>New Elite Partner achieved
              </motion.span>
            </motion.div>
          </motion.div>
        </div>

        {/* ── STATS BAR ── */}
        <div className="relative z-10 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 pb-10">
          <motion.div
            className="rounded-2xl overflow-hidden"
            style={{
              background: "rgba(0,8,30,0.75)",
              border: "1px solid rgba(252,183,48,0.2)",
              backdropFilter: "blur(20px)",
              boxShadow: "0 0 80px rgba(49,66,156,0.2), inset 0 1px 0 rgba(255,255,255,0.04)",
            }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.8, ease: [0.22, 1, 0.36, 1] as const }}
          >
            <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
              {STATS.map((s, i) => (
                <motion.div key={s.label}
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                  transition={{ delay: 0.9 + i * 0.1 }}>
                  <StatItem {...s} active={statsActive} />
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

    </section>
  );
}
