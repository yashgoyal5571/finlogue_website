"use client";

import React, { useEffect, useState } from "react";

export default function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    let ticking = false;

    const toggleVisibility = () => {
      if (window.scrollY > 400) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(toggleVisibility);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    toggleVisibility();

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <button
      type="button"
      onClick={scrollToTop}
      aria-label="Back to top"
      title="Back to top"
      style={{
        position: "fixed",
        bottom: "28px",
        right: "28px",
        zIndex: 9000,
        width: "44px",
        height: "44px",
        borderRadius: "50%",
        backgroundColor: "rgba(10, 19, 41, 0.92)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        border: "1px solid rgba(197, 168, 128, 0.45)",
        boxShadow: "0 8px 24px rgba(7, 13, 30, 0.4), 0 0 16px rgba(197, 168, 128, 0.15)",
        color: "var(--gold-oxford, #C5A880)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        cursor: "pointer",
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? "translateY(0) scale(1)" : "translateY(14px) scale(0.85)",
        pointerEvents: isVisible ? "auto" : "none",
        transition: "opacity 0.28s cubic-bezier(0.16, 1, 0.3, 1), transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), background-color 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease",
      }}
      className="back-to-top-btn"
    >
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{
          transition: "transform 0.2s ease",
        }}
        className="back-to-top-arrow"
      >
        <path d="M18 15l-6-6-6 6" />
      </svg>
    </button>
  );
}
