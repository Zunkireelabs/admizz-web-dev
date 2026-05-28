"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";
import React from "react";

export default function TestNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [navLog, setNavLog] = useState<string[]>([]);
  const [rscTestResult, setRscTestResult] = useState<string>("not tested yet");
  const [routerState, setRouterState] = useState<string>("checking...");
  const logRef = useRef<string[]>([]);

  const log = (msg: string) => {
    const ts = new Date().toISOString().slice(11, 19);
    const entry = `[${ts}] ${msg}`;
    logRef.current = [...logRef.current, entry];
    setNavLog([...logRef.current]);
    console.log(`[test-nav] ${msg}`);
  };

  useEffect(() => {
    log(`pathname changed to: ${pathname}`);
  }, [pathname]);

  useEffect(() => {
    // === 1. Intercept location.assign and location.replace (MPA triggers) ===
    const origAssign = window.location.assign.bind(window.location);
    const origReplace = window.location.replace.bind(window.location);

    // We can't directly override location.assign/replace in all browsers,
    // but we can use a Proxy or Object.defineProperty on the prototype
    // Instead, let's use a beforeunload handler to detect MPA navigation
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      console.error("[test-nav] PAGE UNLOADING - MPA navigation detected!");
      console.trace("[test-nav] Stack trace:");
    };
    window.addEventListener("beforeunload", handleBeforeUnload);

    // === 2. Intercept fetch for RSC requests ===
    const origFetch = window.fetch;
    window.fetch = async function (...args) {
      const [url, opts] = args;
      const headers = opts?.headers as Record<string, string> | undefined;
      const isRSC = headers?.["RSC"] === "1" || headers?.["rsc"] === "1";
      const isSegmentPrefetch = !!headers?.["Next-Router-Segment-Prefetch"];

      if (isRSC || isSegmentPrefetch) {
        const urlStr = typeof url === "string" ? url : url instanceof URL ? url.href : String(url);
        const type = isSegmentPrefetch ? "SEGMENT_PREFETCH" : (headers?.["Next-Router-Prefetch"] === "1" ? "PREFETCH" : "NAV");
        console.log(`[test-nav] ${type} FETCH: ${urlStr}`, { headers });

        try {
          const resp = await origFetch.apply(this, args);
          const ct = resp.headers.get("content-type") || "none";
          console.log(`[test-nav] ${type} RESPONSE: status=${resp.status} type=${ct} redirected=${resp.redirected}`);
          return resp;
        } catch (e) {
          console.error(`[test-nav] ${type} ERROR:`, e);
          throw e;
        }
      }

      return origFetch.apply(this, args);
    };

    // === 3. Dump window.nd (Next.js debug state) ===
    const checkNd = () => {
      const nd = (window as unknown as { nd?: { cache: unknown; tree: unknown } }).nd;
      if (nd) {
        console.log("[test-nav] window.nd.tree:", JSON.stringify(nd.tree));
        console.log("[test-nav] window.nd.cache:", nd.cache);
        setRouterState(JSON.stringify(nd.tree, null, 2));
      } else {
        setRouterState("window.nd not available (production mode)");
      }
    };
    // Check after a short delay to allow hydration
    setTimeout(checkNd, 1000);

    // === 4. Monitor history.pushState and history.replaceState ===
    const origPushState = history.pushState.bind(history);
    const origReplaceState = history.replaceState.bind(history);

    history.pushState = function (...args) {
      console.log("[test-nav] history.pushState:", args[2]);
      return origPushState(...args);
    };

    history.replaceState = function (...args) {
      console.log("[test-nav] history.replaceState:", args[2]);
      return origReplaceState(...args);
    };

    return () => {
      window.fetch = origFetch;
      window.removeEventListener("beforeunload", handleBeforeUnload);
      history.pushState = origPushState;
      history.replaceState = origReplaceState;
    };
  }, []);

  const handleManualNav = () => {
    log("Calling router.push('/about')...");
    // Log the router state tree right before navigating
    const nd = (window as unknown as { nd?: { tree: unknown } }).nd;
    if (nd) {
      console.log("[test-nav] Router tree BEFORE push:", JSON.stringify(nd.tree));
    }
    router.push("/about");
    // If we get here without page unload, SPA worked
    setTimeout(() => {
      log("Still alive after router.push! SPA navigation succeeded.");
      const ndAfter = (window as unknown as { nd?: { tree: unknown } }).nd;
      if (ndAfter) {
        console.log("[test-nav] Router tree AFTER push:", JSON.stringify(ndAfter.tree));
      }
    }, 100);
  };

  const handleRscTest = async () => {
    setRscTestResult("testing...");
    try {
      const resp = await fetch("/about", {
        headers: {
          "RSC": "1",
          "Next-Router-State-Tree": encodeURIComponent(JSON.stringify(["", { children: ["__PAGE__", {}] }])),
        },
      });
      const ct = resp.headers.get("content-type") || "none";
      const body = await resp.text();
      const first200 = body.slice(0, 200);
      setRscTestResult(`status=${resp.status} type="${ct}" redirected=${resp.redirected}\nbody="${first200}..."`);
      log(`RSC test: status=${resp.status} type=${ct}`);
    } catch (e) {
      setRscTestResult(`ERROR: ${e}`);
    }
  };

  const handleSegmentPrefetchTest = async () => {
    setRscTestResult("testing segment prefetch...");
    try {
      const resp = await fetch("/about", {
        headers: {
          "RSC": "1",
          "Next-Router-Prefetch": "1",
          "Next-Router-Segment-Prefetch": "/_tree",
          "Next-URL": "/test-nav",
        },
      });
      const ct = resp.headers.get("content-type") || "none";
      const postponed = resp.headers.get("x-nextjs-postponed") || "none";
      const body = await resp.text();
      setRscTestResult(`SEGMENT PREFETCH:\nstatus=${resp.status} type="${ct}" postponed=${postponed}\nbody=${body}`);
      log(`Segment prefetch test: status=${resp.status} postponed=${postponed}`);
    } catch (e) {
      setRscTestResult(`ERROR: ${e}`);
    }
  };

  const dumpRouterTree = () => {
    const nd = (window as unknown as { nd?: { cache: unknown; tree: unknown } }).nd;
    if (nd) {
      const treeStr = JSON.stringify(nd.tree, null, 2);
      setRouterState(treeStr);
      console.log("[test-nav] FULL ROUTER TREE:", treeStr);
      console.log("[test-nav] CACHE NODE:", nd.cache);
      log("Router tree dumped to console and display");
    } else {
      setRouterState("window.nd not available");
      log("window.nd not available - build may be production");
    }
  };

  return (
    <main style={{ padding: 20, fontFamily: "monospace", maxWidth: 900, margin: "0 auto" }}>
      <h1 style={{ fontSize: 22, marginBottom: 16 }}>Navigation Diagnostic v4</h1>

      <div style={{ background: "#d4edda", padding: 12, borderRadius: 8, marginBottom: 16, border: "2px solid #28a745", fontSize: 13 }}>
        <p><strong>Pathname:</strong> {pathname}</p>
        <p><strong>React:</strong> {React.version}</p>
        <p><strong>Router:</strong> push={typeof router.push} replace={typeof router.replace} prefetch={typeof router.prefetch}</p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 16 }}>
        <button onClick={handleRscTest} style={{ color: "white", background: "#17a2b8", border: "none", padding: "8px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12 }}>
          Test RSC fetch /about
        </button>
        <button onClick={handleSegmentPrefetchTest} style={{ color: "white", background: "#6f42c1", border: "none", padding: "8px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12 }}>
          Test Segment Prefetch /about
        </button>
        <button onClick={handleManualNav} style={{ color: "white", background: "#007bff", border: "none", padding: "8px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12 }}>
          router.push("/about")
        </button>
        <button onClick={dumpRouterTree} style={{ color: "white", background: "#28a745", border: "none", padding: "8px 12px", borderRadius: 4, cursor: "pointer", fontSize: 12 }}>
          Dump Router Tree
        </button>
      </div>

      <div style={{ display: "flex", gap: 12, marginBottom: 16 }}>
        <Link href="/about" style={{ color: "blue", textDecoration: "underline", fontSize: 13 }}>Link /about</Link>
        <Link href="/blogs" style={{ color: "blue", textDecoration: "underline", fontSize: 13 }}>Link /blogs</Link>
        <Link href="/test-nav" style={{ color: "blue", textDecoration: "underline", fontSize: 13 }}>Link /test-nav</Link>
        <Link href="/test-prep" style={{ color: "blue", textDecoration: "underline", fontSize: 13 }}>Link /test-prep</Link>
      </div>

      <h2 style={{ fontSize: 16, marginBottom: 8 }}>Router State Tree:</h2>
      <pre style={{ background: "#f8f9fa", padding: 12, borderRadius: 4, marginBottom: 16, fontSize: 11, maxHeight: 200, overflow: "auto", whiteSpace: "pre-wrap" }}>
        {routerState}
      </pre>

      <h2 style={{ fontSize: 16, marginBottom: 8 }}>Test Results:</h2>
      <pre style={{ background: "#f8f9fa", padding: 12, borderRadius: 4, marginBottom: 16, fontSize: 11, maxHeight: 150, overflow: "auto", whiteSpace: "pre-wrap" }}>
        {rscTestResult}
      </pre>

      <h2 style={{ fontSize: 16, marginBottom: 8 }}>Log:</h2>
      <div style={{ background: "#1a1a2e", color: "#0f0", padding: 12, borderRadius: 8, minHeight: 100, fontSize: 11, maxHeight: 200, overflow: "auto" }}>
        {navLog.map((l, i) => <p key={i} style={{ margin: "2px 0" }}>{l}</p>)}
      </div>

      <p style={{ marginTop: 16, color: "#666", fontSize: 12 }}>
        Instructions:<br/>
        1. Click "Dump Router Tree" - copy the tree from console<br/>
        2. Click "Test RSC fetch" and "Test Segment Prefetch" - verify server responses<br/>
        3. Open Console (F12), filter "[test-nav]"<br/>
        4. Click "router.push" - watch console for:<br/>
        &nbsp;&nbsp;- "PAGE UNLOADING" = MPA (bad)<br/>
        &nbsp;&nbsp;- "Still alive" = SPA (good)<br/>
        &nbsp;&nbsp;- Stack trace shows WHERE MPA was triggered<br/>
        5. Check console for "Router tree BEFORE push" to see the tree state
      </p>
    </main>
  );
}
