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

  // Smooth Parallax Calculations inspired by Dribbble motion design
  const imageTranslateY = scrollY * 0.35;
  const textTranslateY = scrollY * 0.18;
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
      {/* Background Image Container with Smooth Parallax Drift */}
      <div
        style={{
          position: "absolute",
          top: "-5%",
          left: 0,
          right: 0,
          bottom: "-5%",
          zIndex: 1,
          transform: `translate3d(0, ${imageTranslateY}px, 0)`,
          willChange: "transform",
        }}
      >
        <Image
          src="/assets/gallery/summit-keynote.jpg"
          alt="Finlogue Auditorium & Keynote Arena"
          fill
          sizes="100vw"
          priority
          style={{
            objectFit: "cover",
            objectPosition: "center 35%",
            filter: "contrast(102%) brightness(100%)",
          }}
        />
        {/* Lighter Tone Gradient Overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(90deg, rgba(255, 255, 255, 0.90) 0%, rgba(255, 255, 255, 0.68) 42%, rgba(255, 255, 255, 0.18) 75%, rgba(255, 255, 255, 0.08) 100%), linear-gradient(180deg, rgba(248, 250, 252, 0.35) 0%, transparent 40%, rgba(248, 250, 252, 0.6) 100%)",
          }}
        />
      </div>

      {/* Hero Content with Subtle Parallax Lag & Smooth Fade */}
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
        }}
      >
        <div style={{ maxWidth: "720px", width: "100%" }}>
          {/* Institutional Badge */}
          <div
            className="badge-pill"
            style={{
              marginBottom: "18px",
              backgroundColor: "rgba(7, 13, 30, 0.06)",
              borderColor: "rgba(7, 13, 30, 0.15)",
              color: "var(--navy-hero)",
            }}
          >
            <span
              style={{
                width: "8px",
                height: "8px",
                borderRadius: "9999px",
                backgroundColor: "var(--navy-hero)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span style={{ fontWeight: 600 }}>{badge}</span>
          </div>

          {/* Main Title */}
          <h1
            className="font-display-serif hero-title-display"
            style={{
              fontSize: "clamp(29px, 5.8vw, 72px)",
              color: "var(--navy-hero)",
              lineHeight: 1.08,
              letterSpacing: "0.01em",
              textTransform: "uppercase",
              marginBottom: "18px",
              fontWeight: 700,
              overflowWrap: "break-word",
              wordBreak: "break-word",
              hyphens: "auto",
            }}
          >
            {title}
          </h1>

          {/* Description Subtitle */}
          <p
            style={{
              fontSize: "clamp(14.5px, 1.8vw, 17.5px)",
              color: "#334155",
              lineHeight: 1.65,
              marginBottom: "32px",
              maxWidth: "640px",
              fontWeight: 400,
              overflowWrap: "break-word",
              wordBreak: "break-word",
            }}
          >
            {subtitle}
          </p>

          {/* Action Buttons */}
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
            <Link
              href="/about"
              className="stamp-button stamp-button-primary"
              style={{
                padding: "14px 32px",
                borderRadius: "100px",
                backgroundColor: "var(--navy-hero)",
                borderColor: "var(--navy-hero)",
                color: "#FFFFFF",
                fontWeight: 700,
                fontSize: "14.5px",
                display: "inline-flex",
                alignItems: "center",
                gap: "8px",
                boxShadow: "0 6px 20px rgba(7, 13, 30, 0.25)",
              }}
            >
              <span>{ctaPrimaryText}</span>
              <span style={{ fontSize: "16px", color: "var(--gold-oxford)" }}>→</span>
            </Link>

            <Link
              href="#initiatives"
              className="secondary-button"
              style={{
                padding: "14px 28px",
                borderRadius: "100px",
                fontSize: "14px",
                borderColor: "var(--navy-hero)",
                color: "var(--navy-hero)",
                backgroundColor: "rgba(255, 255, 255, 0.8)",
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
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
          <line x1="12" y1="5" x2="12" y2="19" />
          <polyline points="19 12 12 19 5 12" />
        </svg>
      </a>
    </section>
  );
}
