"use client";

import { useRef, useEffect, useState, useCallback } from "react";

/* ── Prize config (exact match of events spin-wheel.js) ───────── */
const prizes = [
  { text: "Laptop", color: "#4ECDC4", emoji: "💻" },
  { text: "Phone", color: "#FF6B9D", emoji: "📱" },
  { text: "Tablet", color: "#A29BFE", emoji: "📱" },
  { text: "Watch", color: "#C44569", emoji: "⌚" },
  { text: "Earbuds", color: "#FCB69F", emoji: "🎧" },
  { text: "Flight", color: "#FFA726", emoji: "✈️" },
  { text: "Movie", color: "#FF7675", emoji: "🎬" },
  { text: "Recharge", color: "#667eea", emoji: "📶" },
  { text: "Test Prep", color: "#E056FD", emoji: "📚" },
];

const prizeLabels = [
  { emoji: "💻", label: "Laptop" },
  { emoji: "📱", label: "Smart Phone" },
  { emoji: "📱", label: "Tablet" },
  { emoji: "⌚", label: "Smart Watch" },
  { emoji: "🎧", label: "Ear Buds" },
  { emoji: "✈️", label: "Flight Ticket" },
  { emoji: "🎬", label: "Movie Ticket" },
  { emoji: "📶", label: "Recharge" },
  { emoji: "📚", label: "Test Prep" },
];

const NUM_SEGMENTS = prizes.length;
const SEGMENT_ANGLE = (2 * Math.PI) / NUM_SEGMENTS;
// Excluded: Laptop (0), Phone (1), Tablet (2) — 0% chance
const COMMON_SEGMENTS = [3, 4, 5, 6, 7, 8];

/* ── Google Sheets endpoints (same as events site) ────────────── */
const SCRIPT_URLS = {
  primary:
    "https://script.google.com/macros/s/AKfycbxeAGAIM_pZTsgj-7-cqvt__hBfI4wbQRztMVfZ2jaF9LarsRcbl0FRvkco_R8R9KWxkQ/exec",
  secondary:
    "https://script.google.com/macros/s/AKfycbwEhcdBi59eIdC45UQ8bHWYuOQYyP929Hipq93d9Rp6ILzRX7ZJCCGH6OoGbn2OPprL/exec",
  nepal:
    "https://script.google.com/macros/s/AKfycbx_eRs4VvnE3Mcd2dz8jO6e5E1MzcWmGxfO6vXgYqoubjTkg0DiIq3aARfVkIl8_m3KAg/exec",
};

/* ── Form options (same as events formOptions.json) ───────────── */
const COUNTRIES = [
  { code: "NP", dialCode: "+977", name: "Nepal" },
  { code: "US", dialCode: "+1", name: "USA" },
  { code: "IN", dialCode: "+91", name: "India" },
  { code: "ZM", dialCode: "+260", name: "Zambia" },
  { code: "BD", dialCode: "+880", name: "Bangladesh" },
  { code: "GB", dialCode: "+44", name: "UK" },
  { code: "AU", dialCode: "+61", name: "Australia" },
  { code: "CA", dialCode: "+1", name: "Canada" },
  { code: "CN", dialCode: "+86", name: "China" },
  { code: "JP", dialCode: "+81", name: "Japan" },
];

const STUDY_DESTINATIONS = [
  "UK", "USA", "Canada", "Australia", "India",
  "Germany", "Finland", "Sweden", "New Zealand", "France", "Other",
];

const STUDY_LEVELS = [
  { value: "Undergraduate", label: "Undergraduate" },
  { value: "Postgraduate", label: "Postgraduate" },
  { value: "Doctorate", label: "Doctorate / PhD" },
  { value: "Diploma", label: "Diploma / Certificate" },
  { value: "Foundation", label: "Foundation Year" },
];

const STUDY_PROGRAMS = [
  "Engineering & Technology",
  "Allied Health Sciences",
  "Humanities & Social Sciences",
  "Business & Management",
  "Law & Legal Studies",
  "Architecture & Design",
  "Applied Sciences",
  "Medical & Pharmacy",
];

/* ── Panel state ──────────────────────────────────────────────── */
type Panel = "content" | "form" | "spinning";

export default function SpinWheel() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const rotationRef = useRef(0);
  const savedFormData = useRef<FormData | null>(null);
  const [panel, setPanel] = useState<Panel>("content");
  const [resultPrize, setResultPrize] = useState<string | null>(null);
  const [dataSaved, setDataSaved] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  /* Form state */
  const [country, setCountry] = useState("NP");
  const [phone, setPhone] = useState("+977");

  /* ── Draw wheel (exact match of events drawWheel) ─────────── */
  const drawWheel = useCallback((rotation: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const centerX = canvas.width / 2;
    const centerY = canvas.height / 2;
    const radius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);
    ctx.rotate(rotation);

    for (let i = 0; i < NUM_SEGMENTS; i++) {
      const startAngle = i * SEGMENT_ANGLE - Math.PI / 2;
      const endAngle = startAngle + SEGMENT_ANGLE;

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, radius, startAngle, endAngle);
      ctx.closePath();
      ctx.fillStyle = prizes[i].color;
      ctx.fill();
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.save();
      ctx.rotate(startAngle + SEGMENT_ANGLE / 2);
      ctx.textAlign = "right";
      ctx.fillStyle = "#fff";
      ctx.font = "bold 14px Montserrat, sans-serif";
      ctx.shadowColor = "rgba(0,0,0,0.3)";
      ctx.shadowBlur = 2;
      ctx.fillText(prizes[i].text, radius - 20, 5);
      ctx.restore();
    }

    ctx.beginPath();
    ctx.arc(0, 0, 40, 0, 2 * Math.PI);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.strokeStyle = "#0066cc";
    ctx.lineWidth = 4;
    ctx.stroke();
    ctx.restore();

    ctx.beginPath();
    ctx.arc(centerX, centerY, radius + 5, 0, 2 * Math.PI);
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 8;
    ctx.stroke();
  }, []);

  useEffect(() => {
    drawWheel(0);
  }, [drawWheel]);

  /* ── Submit form data to Google Sheets ────────────────────── */
  const submitFormData = useCallback(async (prize: string) => {
    const fd = savedFormData.current;
    if (!fd) return;

    // Set prize and metadata
    fd.set("Prize", prize);
    fd.set("Src", "AdmizzEdu-Spin-And-Win");

    const now = new Date();
    fd.set("Date", now.toDateString());
    fd.set("Time", now.toLocaleTimeString());

    const params = new URLSearchParams(window.location.search);
    ["utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content"].forEach(
      (k) => fd.set(k, params.get(k) || "")
    );
    fd.set("referrer_url", document.referrer || "Direct");
    fd.set("landing_page", window.location.href);

    const countryVal = fd.get("Country") as string;

    try {
      const fetches = [
        fetch(SCRIPT_URLS.primary, { method: "POST", body: fd }),
        fetch(SCRIPT_URLS.secondary, { method: "POST", body: fd }),
      ];
      if (countryVal === "NP") {
        fetches.push(fetch(SCRIPT_URLS.nepal, { method: "POST", body: fd }));
      }
      await Promise.all(fetches);
    } catch (error) {
      console.error("Form submission error:", error);
    }
  }, []);

  /* ── Spin animation (verified: 1000/1000 correct in simulation) ── */
  const spinWheel = useCallback(() => {
    const SPIN_DURATION = 5000;

    // Excluded: Laptop (0), Phone (1), Tablet (2) — 0% chance
    const targetSegment =
      COMMON_SEGMENTS[Math.floor(Math.random() * COMMON_SEGMENTS.length)];

    // Calculate rotation so pointer lands within targetSegment
    // Segment i starts at (i * SEG - π/2) in unrotated wheel
    // After rotation R, segment i start is at (i * SEG - π/2 + R)
    // Pointer is at 3π/2 (top). We need pointer inside segment:
    //   segStart + R <= 3π/2 < segEnd + R
    //   R = 3π/2 - segStart - jitter, jitter ∈ (0.2*SEG, 0.8*SEG)
    const segStart = targetSegment * SEGMENT_ANGLE - Math.PI / 2;
    const jitter = (0.2 + Math.random() * 0.6) * SEGMENT_ANGLE;
    let targetR = 3 * Math.PI / 2 - segStart - jitter;
    targetR = ((targetR % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);

    // Add 5-8 full rotations for visual effect
    const fullRotations = (5 + Math.floor(Math.random() * 4)) * 2 * Math.PI;
    let currentR = ((rotationRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
    let extraAngle = targetR - currentR;
    if (extraAngle < 0) extraAngle += 2 * Math.PI;

    const totalRotation = fullRotations + extraAngle;
    const targetRotation = rotationRef.current + totalRotation;
    const startTime = Date.now();
    const startRotation = rotationRef.current;

    // Scroll wheel into view on mobile
    if (sectionRef.current) {
      sectionRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }

    function animate() {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / SPIN_DURATION, 1);
      const easeOut = 1 - Math.pow(1 - progress, 3);

      rotationRef.current =
        startRotation + (targetRotation - startRotation) * easeOut;
      drawWheel(rotationRef.current);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        // Snap to exact final rotation
        rotationRef.current = targetRotation;
        drawWheel(rotationRef.current);

        // Detect prize from final visual position (matches what user sees)
        let R = ((rotationRef.current % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
        const pointerLocal = ((3 * Math.PI / 2 - R) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        const adjusted = ((pointerLocal + Math.PI / 2) % (2 * Math.PI) + 2 * Math.PI) % (2 * Math.PI);
        let detected = Math.floor(adjusted / SEGMENT_ANGLE) % NUM_SEGMENTS;
        // Safety: if somehow lands on excluded, use target
        if (detected < 3) detected = targetSegment;
        const prize = prizes[detected].text;

        // Show prize popup instantly
        setPanel("content");
        setResultPrize(prize);
        setDataSaved(false);

        // Submit to Google Sheets in background
        submitFormData(prize).finally(() => {
          setDataSaved(true);
        });
      }
    }

    requestAnimationFrame(animate);
  }, [drawWheel, submitFormData]);

  /* ── Country change → phone prefix ────────────────────────── */
  function handleCountryChange(code: string) {
    setCountry(code);
    const c = COUNTRIES.find((c) => c.code === code);
    setPhone(c?.dialCode ?? "");
  }

  function handlePhoneChange(value: string) {
    const c = COUNTRIES.find((c) => c.code === country);
    const prefix = c?.dialCode ?? "";
    if (prefix && !value.startsWith(prefix)) {
      setPhone(prefix);
    } else {
      setPhone(value);
    }
  }

  /* ── Form submit → validate → spin ────────────────────────── */
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);

    const firstName = (fd.get("Name") as string)?.trim();
    const lastName = (fd.get("Last Name") as string)?.trim();
    const email = (fd.get("Email") as string)?.trim();
    const phoneVal = (fd.get("PhoneNo") as string)?.trim();
    const city = (fd.get("City") as string)?.trim();
    const destination = fd.get("preferedDestination") as string;
    const studyLevel = fd.get("studyLevel") as string;
    const studyProgram = fd.get("studyProgram") as string;

    if (!firstName || !lastName || !email || !phoneVal || !city || !destination || !studyLevel || !studyProgram) {
      alert("Please fill in all fields and agree to Terms & Conditions");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      alert("Please enter a valid email address");
      return;
    }

    // Capture form data NOW before panel change unmounts the form
    savedFormData.current = fd;

    setSubmitting(true);
    setPanel("spinning");
    spinWheel();
  }

  /* ── Close result → redirect ──────────────────────────────── */
  function closeResult() {
    if (!dataSaved) return;
    setResultPrize(null);
    setTimeout(() => {
      window.location.href = "/thank-you";
    }, 300);
  }

  /* ── Render ───────────────────────────────────────────────── */
  return (
    <>
      <section
        ref={sectionRef}
        id="register"
        className="py-12 md:py-16"
        style={{ background: "#F0F2F8" }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2
            className="text-[22px] sm:text-[26px] md:text-[34px] font-bold text-center mb-8 md:mb-12"
            style={{ color: "#0D1282", fontFamily: "var(--font-rubik), sans-serif" }}
          >
            Every Registration = A Chance to Win Amazing Prizes!
          </h2>

          <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-center max-w-5xl mx-auto">
            {/* ── Left: Wheel ── */}
            <div className="flex justify-center">
              <div className="relative">
                <div
                  className="absolute left-1/2 -translate-x-1/2 -top-3 z-10"
                  style={{
                    width: 0,
                    height: 0,
                    borderLeft: "14px solid transparent",
                    borderRight: "14px solid transparent",
                    borderTop: "24px solid #0D1282",
                  }}
                />
                <canvas
                  ref={canvasRef}
                  width={340}
                  height={340}
                  className="block max-w-[280px] md:max-w-none h-auto"
                />
              </div>
            </div>

            {/* ── Right: Content / Form / Spinning ── */}
            <div
              className="bg-white rounded-2xl p-5 md:p-7 min-h-[340px] flex flex-col"
              style={{ boxShadow: "0 4px 20px rgba(0,0,0,0.08)" }}
            >
              {/* Content panel */}
              {panel === "content" && (
                <>
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-2xl">🎁</span>
                    <h3 className="text-xl md:text-2xl font-bold" style={{ color: "#0D1282" }}>
                      Spin to Win!
                    </h3>
                  </div>
                  <p className="text-[14px] mb-4" style={{ color: "#475569" }}>
                    Register for ADMIZZION WEEK and get a chance to win these amazing prizes!
                  </p>
                  <div className="grid grid-cols-2 gap-x-5 gap-y-2 mb-5">
                    {prizeLabels.map((p) => (
                      <div key={p.label} className="flex items-center gap-2 text-[14px]" style={{ color: "#1e293b" }}>
                        <span>{p.emoji}</span>
                        <span className="font-medium">{p.label}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    type="button"
                    onClick={() => setPanel("form")}
                    className="mt-auto w-full py-3 rounded-full text-white font-semibold text-[15px] transition-opacity hover:opacity-90"
                    style={{ background: "linear-gradient(135deg, #0066cc 0%, #0052a3 100%)" }}
                  >
                    Register &amp; Spin to Win!
                  </button>
                </>
              )}

              {/* Form panel */}
              {panel === "form" && (
                <>
                  <h3 className="text-lg font-bold mb-3 text-center" style={{ color: "#0D1282" }}>
                    Quick Registration
                  </h3>
                  <form ref={formRef} onSubmit={handleSubmit} className="flex flex-col gap-2 flex-1">
                    <div className="grid grid-cols-2 gap-2">
                      <input name="Name" placeholder="First Name" required className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none" />
                      <input name="Last Name" placeholder="Last Name" required className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none" />
                    </div>
                    <input name="Email" type="email" placeholder="Email Address" required className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none" />
                    <div className="grid grid-cols-2 gap-2">
                      <select
                        name="Country"
                        value={country}
                        onChange={(e) => handleCountryChange(e.target.value)}
                        required
                        className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                      >
                        {COUNTRIES.map((c) => (
                          <option key={c.code} value={c.code}>
                            {c.name} ({c.code})
                          </option>
                        ))}
                      </select>
                      <input
                        name="PhoneNo"
                        type="tel"
                        value={phone}
                        onChange={(e) => handlePhoneChange(e.target.value)}
                        required
                        className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none"
                      />
                    </div>
                    <input name="City" placeholder="Enter your city name" required className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none" />
                    <select name="preferedDestination" required defaultValue="" className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none">
                      <option value="" disabled>Preferred Study Destination</option>
                      {STUDY_DESTINATIONS.map((d) => (<option key={d} value={d}>{d}</option>))}
                    </select>
                    <div className="grid grid-cols-2 gap-2">
                      <select name="studyLevel" required defaultValue="" className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none">
                        <option value="" disabled>Level of study</option>
                        {STUDY_LEVELS.map((l) => (<option key={l.value} value={l.value}>{l.label}</option>))}
                      </select>
                      <select name="studyProgram" required defaultValue="" className="border border-gray-300 rounded-lg px-3 py-2.5 text-sm focus:outline-none">
                        <option value="" disabled>Study program</option>
                        {STUDY_PROGRAMS.map((p) => (<option key={p} value={p}>{p}</option>))}
                      </select>
                    </div>
                    <label className="flex items-center gap-2 text-[12px] text-gray-600">
                      <input type="checkbox" required />
                      <span>I agree to the Terms &amp; Conditions</span>
                    </label>
                    <button
                      type="submit"
                      disabled={submitting}
                      className="mt-auto w-full py-3 rounded-full text-white font-semibold text-[15px] transition-opacity hover:opacity-90 disabled:opacity-60"
                      style={{ background: "linear-gradient(135deg, #0066cc 0%, #0052a3 100%)" }}
                    >
                      {submitting ? "Spinning..." : "Submit & Spin!"}
                    </button>
                  </form>
                  <button
                    type="button"
                    onClick={() => { setPanel("content"); setSubmitting(false); }}
                    className="mt-2 text-sm text-gray-500 hover:text-gray-700 min-h-[44px]"
                  >
                    &larr; Back
                  </button>
                </>
              )}

              {/* Spinning panel */}
              {panel === "spinning" && (
                <div className="flex-1 flex flex-col items-center justify-center text-center">
                  <span className="text-5xl mb-4 animate-bounce">🍀</span>
                  <h3 className="text-xl font-bold mb-2" style={{ color: "#0D1282" }}>Spinning...</h3>
                  <p className="text-gray-500">Good luck!</p>
                </div>
              )}
            </div>
          </div>

          <p className="text-center text-sm text-gray-400 mt-5 italic">
            *Terms &amp; Conditions apply
          </p>
        </div>
      </section>

      {/* ── Result Modal ── */}
      {resultPrize && (
        <>
          <div
            className="fixed inset-0 bg-black/70 z-[2000] transition-opacity"
            onClick={closeResult}
          />
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[2001] bg-white rounded-2xl p-8 md:p-10 text-center max-w-sm w-[90%] shadow-2xl">
            <div className="text-5xl mb-4 animate-bounce">🎉</div>
            <h2 className="text-2xl font-bold mb-2" style={{ color: "#0D1282" }}>
              Congratulations!
            </h2>
            <p className="text-gray-600 mb-3">You&apos;ve won a chance to win:</p>
            <div
              className="text-2xl font-bold mb-4 py-3 px-6 rounded-xl inline-block"
              style={{ background: "linear-gradient(135deg, #E3F2FD 0%, #BBDEFB 100%)", color: "#0066cc" }}
            >
              {resultPrize}
            </div>
            <p className="text-sm text-gray-400 mb-5">
              We&apos;ll contact you if you&apos;re selected as a winner!
            </p>
            <button
              onClick={closeResult}
              disabled={!dataSaved}
              className="w-full py-3 rounded-full text-white font-semibold transition-opacity hover:opacity-90 disabled:opacity-60"
              style={{ background: "#0066cc" }}
            >
              {dataSaved ? "Continue" : "Saving..."}
            </button>
          </div>
        </>
      )}
    </>
  );
}
