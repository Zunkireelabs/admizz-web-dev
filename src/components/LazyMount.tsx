"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

interface Props {
  children: ReactNode;
  rootMargin?: string;
  minHeight?: number | string;
  className?: string;
}

export default function LazyMount({
  children,
  rootMargin = "400px",
  minHeight = 400,
  className,
}: Props) {
  const [shouldRender, setShouldRender] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (typeof IntersectionObserver === "undefined") {
      setShouldRender(true);
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setShouldRender(true);
          io.disconnect();
        }
      },
      { rootMargin },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [rootMargin]);

  return (
    <div ref={ref} className={className} style={shouldRender ? undefined : { minHeight }}>
      {shouldRender ? children : null}
    </div>
  );
}
