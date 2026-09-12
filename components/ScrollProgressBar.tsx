"use client";

import React, { useEffect, useRef } from "react";

export default function ScrollProgressBar() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = barRef.current;
    if (!el) return;

    // Check if modern CSS scroll-driven animation is supported
    if (CSS.supports && CSS.supports("animation-timeline", "scroll()")) {
      el.classList.add("scroll-driven-progress");
      return;
    }

    let ticking = false;

    const updateProgress = () => {
      const scrollPx = document.documentElement.scrollTop || document.body.scrollTop;
      const winHeightPx =
        document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const progress = winHeightPx > 0 ? scrollPx / winHeightPx : 0;
      const clamped = Math.min(Math.max(progress, 0), 1);
      if (el) {
        el.style.transform = `scaleX(${clamped})`;
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateProgress);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    updateProgress();

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        height: "2.5px",
        zIndex: 99999,
        pointerEvents: "none",
        backgroundColor: "transparent",
      }}
    >
      <div
        ref={barRef}
        className="scroll-progress-bar-fill"
        style={{
          height: "100%",
          width: "100%",
          background: "linear-gradient(90deg, #937140 0%, #C5A880 50%, #DFC39D 100%)",
          transformOrigin: "0% 50%",
          transform: "scaleX(0)",
          boxShadow: "0 0 10px rgba(197, 168, 128, 0.6)",
          willChange: "transform",
        }}
      />
    </div>
  );
}
