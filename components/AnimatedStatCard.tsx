"use client";

import React, { useEffect, useRef, useState } from "react";

interface AnimatedStatCardProps {
  label: string;
  value: string;
  description?: string;
  duration?: number;
}

export default function AnimatedStatCard({
  label,
  value,
  description,
  duration = 1600,
}: AnimatedStatCardProps) {
  const [currentVal, setCurrentVal] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  // Parse prefix, numeric target, and suffix
  // Handles values like "₹25CR+", "25+", "9+", "100%", "500+"
  const match = value.match(/^([^\d]*)(\d+(?:\.\d+)?)(.*)$/);
  const prefix = match ? match[1] : "";
  const targetNumber = match ? parseFloat(match[2]) : 0;
  const suffix = match ? match[3] : "";

  useEffect(() => {
    const el = cardRef.current;
    if (!el || hasAnimated) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true);

          const startTime = performance.now();

          const animateStep = (time: number) => {
            const elapsed = time - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Cubic ease out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const valueNow = Math.round(easeOut * targetNumber);
            setCurrentVal(valueNow);

            if (progress < 1) {
              requestAnimationFrame(animateStep);
            } else {
              setCurrentVal(targetNumber);
            }
          };

          requestAnimationFrame(animateStep);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [targetNumber, duration, hasAnimated]);

  return (
    <div
      ref={cardRef}
      style={{
        padding: "24px 22px",
        backgroundColor: "var(--white-pure)",
        border: "1px solid var(--white-border)",
        borderRadius: "6px",
        boxShadow: "0 2px 8px rgba(10, 19, 41, 0.04)",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        transition: "all 0.25s cubic-bezier(0.16, 1, 0.3, 1)",
      }}
      className="animated-stat-card"
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "10px",
        }}
      >
        <span
          className="font-metadata-mono"
          style={{
            fontSize: "11px",
            color: "var(--ink-muted)",
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            fontWeight: 600,
          }}
        >
          {label}
        </span>
        <span
          style={{
            width: "6px",
            height: "6px",
            borderRadius: "50%",
            backgroundColor: "var(--gold-oxford)",
            display: "inline-block",
          }}
        />
      </div>

      <div style={{ margin: "4px 0 10px" }}>
        <span
          className="font-display-serif"
          style={{
            fontSize: "clamp(34px, 3.5vw, 44px)",
            fontWeight: 700,
            color: "var(--ink-title)",
            lineHeight: 1.05,
            letterSpacing: "-0.02em",
            display: "inline-block",
            fontVariantNumeric: "tabular-nums",
          }}
        >
          {prefix}
          {hasAnimated ? currentVal : 0}
          {suffix}
        </span>
      </div>

      {description && (
        <p
          style={{
            fontSize: "12.5px",
            color: "var(--ink-body)",
            lineHeight: 1.5,
            margin: 0,
          }}
        >
          {description}
        </p>
      )}
    </div>
  );
}
