"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { home } from "@/content/home";

export interface DynamicHeroProps {
  badge?: string;
  title?: string;
  subtitle?: string;
  ctaPrimaryText?: string;
  ctaSecondaryText?: string;
}

interface HeroParallaxProps {
  hero?: DynamicHeroProps;
}

export default function HeroParallax({ hero }: HeroParallaxProps = {}) {
  const badge = hero?.badge || home.hero.badge;
  const title = hero?.title || "Finance is more than numbers, It's a conversation.";
  const subtitle =
    hero?.subtitle ||
    "Finance isn’t just about numbers, markets, or balance sheets. It’s about understanding the decisions, ideas, and forces that shape businesses and economies.";
  const ctaPrimaryText = hero?.ctaPrimaryText || "Know More";
  const ctaSecondaryText = hero?.ctaSecondaryText || "Explore Initiatives";

  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setScrollY(window.scrollY);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Smooth Parallax Calculations
  const imageTranslateY = scrollY * 0.32;
  const textTranslateY = scrollY * 0.16;
  const textOpacity = Math.max(0, 1 - scrollY / 700);

  return (
    <section
      className="hero-parallax-container"
      style={{
        position: "relative",
        minHeight: "92vh",
        display: "flex",
        alignItems: "center",
        overflow: "hidden",
        backgroundColor: "#070D1E",
      }}
    >
      {/* Background Image Container with Parallax Drift — Vivid, Crystal-Clear Auditorium Photo */}
      <div
        style={{
          position: "absolute",
          top: "-6%",
          left: 0,
          right: 0,
          bottom: "-6%",
          zIndex: 1,
          transform: `translate3d(0, ${imageTranslateY}px, 0)`,
          willChange: "transform",
        }}
      >
        <Image
          src="/assets/gallery/potr-swot-stage.jpg"
          alt="Pitch on the Rocks (POTR) Live Stage Conclave"
          fill
          sizes="100vw"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "80% 36%",
            filter: "contrast(106%) brightness(96%) saturate(104%)",
          }}
        />

        {/* Deep Midnight Navy Directional Scrim: Eliminates milky-whitish wash, masks SWOT double-text, and lets the #POTR stage shine vibrantly on the right */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(7, 13, 30, 0.95) 0%, rgba(7, 13, 30, 0.88) 35%, rgba(7, 13, 30, 0.52) 62%, rgba(7, 13, 30, 0.12) 84%, transparent 100%), linear-gradient(180deg, rgba(7, 13, 30, 0.5) 0%, transparent 35%, rgba(7, 13, 30, 0.75) 100%)",
            pointerEvents: "none",
          }}
        />
      </div>

      {/* Hero Content with High-Legibility Pure White & Oxford Gold Styling */}
      <div
        className="container"
        style={{
          position: "relative",
          zIndex: 10,
          paddingTop: "clamp(96px, 14vh, 130px)",
          paddingBottom: "clamp(50px, 8vh, 75px)",
          transform: `translate3d(0, ${textTranslateY}px, 0)`,
          opacity: textOpacity,
          willChange: "transform, opacity",
          width: "100%",
        }}
      >
        <div style={{ maxWidth: "720px", width: "100%" }}>
          {/* Institutional Badge */}
          <div
            className="badge-pill hero-anim-badge"
            style={{
              marginBottom: "18px",
              backgroundColor: "rgba(197, 168, 128, 0.16)",
              border: "1px solid rgba(197, 168, 128, 0.42)",
              color: "var(--gold-oxford, #C5A880)",
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "var(--gold-oxford, #C5A880)",
                display: "inline-block",
                flexShrink: 0,
                boxShadow: "0 0 8px rgba(197, 168, 128, 0.6)",
              }}
            />
            <span style={{ fontWeight: 600, letterSpacing: "0.06em", color: "var(--gold-oxford, #C5A880)" }}>
              {badge}
            </span>
          </div>

          {/* Main Title — Razor Sharp Pure White with Soft Shadow for Maximum Legibility */}
          <h1
            className="font-display-serif hero-title-display hero-anim-title"
            style={{
              fontSize: "clamp(29px, 5.8vw, 72px)",
              color: "#FFFFFF",
              lineHeight: 1.08,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              marginBottom: "18px",
              fontWeight: 700,
              overflowWrap: "break-word",
              wordBreak: "break-word",
              hyphens: "auto",
              textShadow: "0 2px 24px rgba(0, 0, 0, 0.75), 0 1px 4px rgba(0, 0, 0, 0.9)",
            }}
          >
            {title}
          </h1>

          {/* Description Subtitle — Crisp Platinum Slate */}
          <p
            className="hero-anim-sub"
            style={{
              fontSize: "clamp(14.5px, 1.8vw, 17.5px)",
              color: "rgba(226, 232, 240, 0.92)",
              lineHeight: 1.65,
              marginBottom: "32px",
              maxWidth: "640px",
              fontWeight: 400,
              overflowWrap: "break-word",
              wordBreak: "break-word",
              textShadow: "0 1px 10px rgba(0, 0, 0, 0.7)",
            }}
          >
            {subtitle}
          </p>

          {/* Action Buttons */}
          <div
            className="hero-anim-actions"
            style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}
          >
            <Link
              href="/about"
              className="stamp-button stamp-button-primary shimmer-sweep"
              style={{
                padding: "14px 32px",
                borderRadius: "100px",
                backgroundColor: "var(--gold-oxford, #C5A880)",
                borderColor: "var(--gold-oxford, #C5A880)",
                color: "#070D1E",
                fontWeight: 700,
                fontSize: "14.5px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 6px 24px rgba(197, 168, 128, 0.35)",
              }}
            >
              <span style={{ color: "#070D1E" }}>{ctaPrimaryText}</span>
              <span className="btn-arrow" style={{ fontSize: "16px", color: "#070D1E" }}>→</span>
            </Link>

            <Link
              href="#initiatives"
              className="secondary-button"
              style={{
                padding: "14px 28px",
                borderRadius: "100px",
                fontSize: "14px",
                borderColor: "rgba(255, 255, 255, 0.4)",
                color: "#FFFFFF",
                backgroundColor: "rgba(255, 255, 255, 0.12)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                fontWeight: 600,
              }}
            >
              <span>{ctaSecondaryText}</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Downward Scroll Button */}
      <a
        href="#about-finlogue"
        aria-label="Scroll down to About Finlogue"
        title="Scroll down to explore"
        className="hero-scroll-down-btn"
        style={{
          border: "1px solid rgba(255, 255, 255, 0.35)",
          backgroundColor: "rgba(7, 13, 30, 0.65)",
          color: "#FFFFFF",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </a>
    </section>
  );
}
