"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";

interface SuccessMoment {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  badge: string;
  highlight: string;
  details: string;
}

const defaultSuccessMoments: SuccessMoment[] = [
  {
    id: "moment-1",
    title: "Grand Winners — National Case Crackers",
    subtitle: "Turnaround Strategy & Boardroom Defense Champions",
    image: "/assets/gallery/celebrating-success.jpg",
    badge: "1ST PLACE · GRAND CHAMPIONS",
    highlight: "₹50,000 Honors & Institutional Trophy",
    details: "The winning syndicate awarded the official championship citation after a 48-hour intensive turnaround modeling sprint before partner judges.",
  },
  {
    id: "moment-2",
    title: "Pitch on the Rocks — Venture Pitch Laureates",
    subtitle: "High-Conviction Pre-Seed Diligence Winner",
    image: "/assets/gallery/award-ceremony.jpg",
    badge: "VENTURE PODIUM",
    highlight: "Angel Syndicate Mentorship & Capital Allocation",
    details: "Student founders celebrated on the conclave main stage after defending unit economics before 100X.VC and angel partners.",
  },
  {
    id: "moment-3",
    title: "M&A Boardroom Simulation — Hostile Dealmakers",
    subtitle: "Contested Takeover & Synergy Valuation Arena",
    image: "/assets/gallery/pitch-session.jpg",
    badge: "DEALMAKER TROPHY",
    highlight: "Best Executive Negotiation & Valuation Model",
    details: "Honoring the winning investment banking syndicate for successful antitrust clearance and synergy valuation during the live deal room battle.",
  },
  {
    id: "moment-4",
    title: "Annual Financial Conclave — Keynote Delegation",
    subtitle: "600+ Attendees Across Pan-India Universities",
    image: "/assets/hero/flagship-summit.jpg",
    badge: "FLAGSHIP CONCLAVE",
    highlight: "Auditorium Ovation & Industry Panel",
    details: "Celebrating the largest student-run financial conclave delegation hosted at LNMIIT with keynote venture leaders.",
  },
];

// Moving ticker photo moments for the top reel
const tickerImages = [
  { src: "/assets/gallery/celebrating-success.jpg", label: "Grand Champions Podium" },
  { src: "/assets/gallery/award-ceremony.jpg", label: "National League Victory" },
  { src: "/assets/gallery/pitch-session.jpg", label: "Live Shark Battle" },
  { src: "/assets/gallery/summit-keynote.jpg", label: "Auditorium Keynote" },
  { src: "/assets/gallery/networking-hall.jpg", label: "Investor Lounge Exchange" },
  { src: "/assets/gallery/consulting-workshop.jpg", label: "Valuation Syndicate" },
  { src: "/assets/hero/flagship-summit.jpg", label: "Conclave Flagship Arena" },
];

interface CelebratingSuccessShowcaseProps {
  galleryItems?: { image: string }[];
}

export default function CelebratingSuccessShowcase({ galleryItems }: CelebratingSuccessShowcaseProps = {}) {
  const [moments, setMoments] = useState<SuccessMoment[]>(defaultSuccessMoments);
  const [headline, setHeadline] = useState("CELEBRATING SUCCESS");
  const [tagline, setTagline] = useState("Meet the past champions and winning cohorts of Finlogue competitions and get inspired by their journey.");
  const [dynamicReel, setDynamicReel] = useState<string[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    fetch("/api/admin/content?section=gallery")
      .then((r) => (r.ok ? r.json() : null))
      .then((d) => {
        if (d && d.celebratingSuccess) {
          if (d.celebratingSuccess.title) setHeadline(d.celebratingSuccess.title);
          if (d.celebratingSuccess.tagline) setTagline(d.celebratingSuccess.tagline);
          if (Array.isArray(d.celebratingSuccess.moments) && d.celebratingSuccess.moments.length > 0) {
            setMoments(d.celebratingSuccess.moments);
          } else if (d.celebratingSuccess.image) {
            setMoments((prev) => [
              {
                ...prev[0],
                image: d.celebratingSuccess.image,
                title: d.celebratingSuccess.caption || prev[0].title,
              },
              ...prev.slice(1),
            ]);
          }
        }
        if (d && Array.isArray(d.items) && d.items.length > 0) {
          setDynamicReel(d.items.map((it: any) => it.image).filter(Boolean));
        }
      })
      .catch(() => {});
  }, []);

  const total = moments.length;

  const nextMoment = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevMoment = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Automatic slide rotation every 3.5 seconds
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      nextMoment();
    }, 3500);
    return () => clearInterval(interval);
  }, [isPaused, nextMoment]);

  const activeMoment = moments[currentIndex] || moments[0];

  const reelImages: string[] =
    galleryItems && galleryItems.length > 0
      ? galleryItems.map((it) => it.image)
      : dynamicReel.length > 0
      ? dynamicReel
      : tickerImages.map((it) => it.src);

  return (
    <section className="section-pure-white" style={{ padding: "60px 0 80px", overflow: "hidden" }}>
      {/* 1. Continuous Auto-Moving Top Photo Reel (Dynamic Gallery Photos, No Text/Labels) */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          marginBottom: "50px",
          position: "relative",
          maskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%)",
        }}
      >
        <div
          className="marquee-track"
          style={{
            display: "flex",
            gap: "16px",
            width: "max-content",
            animation: "marqueeScroll 35s linear infinite",
          }}
        >
          {[...reelImages, ...reelImages].map((imgSrc, idx) => (
            <div
              key={`reel-${idx}`}
              style={{
                width: "280px",
                height: "175px",
                position: "relative",
                borderRadius: "12px",
                overflow: "hidden",
                border: "1.5px solid rgba(197, 168, 128, 0.3)",
                flexShrink: 0,
                boxShadow: "0 4px 14px rgba(7, 13, 30, 0.15)",
                backgroundColor: "var(--navy-deep)",
              }}
            >
              <Image
                src={imgSrc}
                alt="Finlogue visual archive moment"
                fill
                sizes="280px"
                style={{ objectFit: "cover" }}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="container">
        {/* 2. Section Header: "CELEBRATING SUCCESS" (Exact match to E-Cell reference) */}
        <div style={{ textAlign: "center", marginBottom: "36px" }}>
          <h2
            className="font-display-serif"
            style={{
              fontSize: "clamp(32px, 4.5vw, 48px)",
              color: "var(--gold-oxford)",
              textTransform: "uppercase",
              letterSpacing: "0.06em",
              margin: "0 0 12px",
              fontWeight: 700,
            }}
          >
            {headline}
          </h2>
          <p
            style={{
              fontSize: "15px",
              color: "var(--ink-body)",
              maxWidth: "680px",
              margin: "0 auto",
              lineHeight: 1.6,
            }}
          >
            {tagline}
          </p>
        </div>

        {/* 3. Featured Hero Moment Slider (with Auto-move and Left/Right Arrows) */}
        <div
          style={{
            maxWidth: "920px",
            margin: "0 auto",
            position: "relative",
          }}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <div
            style={{
              position: "relative",
              width: "100%",
              height: "clamp(340px, 50vw, 520px)",
              borderRadius: "24px",
              overflow: "hidden",
              border: "2px solid var(--gold-oxford)",
              boxShadow: "0 20px 48px -8px rgba(7, 13, 30, 0.35)",
              backgroundColor: "var(--navy-deep)",
            }}
          >
            <Image
              src={activeMoment.image}
              alt={activeMoment.title}
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 920px"
              style={{ objectFit: "cover", transition: "opacity 0.4s ease" }}
            />

            {/* Sleek One-Liner Image Footer Strip */}
            <div
              style={{
                position: "absolute",
                bottom: 0,
                left: 0,
                right: 0,
                background: "linear-gradient(to top, rgba(6, 12, 28, 0.94) 0%, rgba(6, 12, 28, 0.75) 65%, transparent 100%)",
                padding: "clamp(14px, 2.5vw, 22px) clamp(20px, 3.5vw, 32px)",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                gap: "14px",
                flexWrap: "wrap",
              }}
            >
              <h3
                style={{
                  fontFamily: "var(--font-sans)",
                  fontSize: "clamp(14px, 1.6vw, 17px)",
                  fontWeight: 700,
                  color: "#FFFFFF",
                  margin: 0,
                  letterSpacing: "0.02em",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                  flexWrap: "wrap",
                }}
              >
                <span>{activeMoment.title}</span>
                <span style={{ color: "var(--gold-oxford)", fontWeight: 500, fontSize: "clamp(13px, 1.3vw, 15px)" }}>
                  | {activeMoment.subtitle}
                </span>
              </h3>

              <span
                className="font-metadata-mono"
                style={{
                  fontSize: "11px",
                  color: "#E2E8F0",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  backgroundColor: "rgba(255, 255, 255, 0.12)",
                  padding: "4px 10px",
                  borderRadius: "4px",
                  backdropFilter: "blur(6px)",
                }}
              >
                {activeMoment.highlight}
              </span>
            </div>
          </div>

          {/* Left Arrow Button */}
          <button
            type="button"
            onClick={prevMoment}
            className="success-slider-arrow success-slider-prev"
            aria-label="Previous success moment"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>

          {/* Right Arrow Button */}
          <button
            type="button"
            onClick={nextMoment}
            className="success-slider-arrow success-slider-next"
            aria-label="Next success moment"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>

          {/* Pagination Indicators Below Slider */}
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "8px",
              marginTop: "20px",
            }}
          >
            {defaultSuccessMoments.map((m, idx) => (
              <button
                key={m.id}
                type="button"
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to moment ${idx + 1}`}
                style={{
                  width: currentIndex === idx ? "28px" : "8px",
                  height: "8px",
                  borderRadius: "4px",
                  backgroundColor: currentIndex === idx ? "var(--gold-oxford)" : "rgba(7, 13, 30, 0.25)",
                  border: "none",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
