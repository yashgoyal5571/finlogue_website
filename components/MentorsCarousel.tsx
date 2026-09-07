"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MentorSpeaker } from "@/content/home";

interface MentorsCarouselProps {
  mentors: MentorSpeaker[];
}

export default function MentorsCarousel({ mentors }: MentorsCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const total = mentors.length;

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Autoplay every 6 seconds, pauses on hover
  useEffect(() => {
    if (isPaused || total <= 1) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused, total, nextSlide]);

  const current = mentors[currentIndex];

  return (
    <div
      style={{
        position: "relative",
        maxWidth: "920px",
        margin: "0 auto",
      }}
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      role="region"
      aria-roledescription="carousel"
      aria-label="Ecosystem Mentors and Keynote Speakers"
    >
      {/* Left Navigation Arrow */}
      <button
        type="button"
        onClick={prevSlide}
        aria-label="Previous speaker"
        style={{
          position: "absolute",
          left: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          backgroundColor: "#070D1E",
          border: "1px solid rgba(197, 168, 128, 0.4)",
          color: "var(--gold-oxford)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.5)",
          transition: "background-color 0.2s, border-color 0.2s, transform 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--navy-surface)";
          e.currentTarget.style.borderColor = "var(--gold-oxford)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#070D1E";
          e.currentTarget.style.borderColor = "rgba(197, 168, 128, 0.4)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="15 18 9 12 15 6" />
        </svg>
      </button>

      {/* Right Navigation Arrow */}
      <button
        type="button"
        onClick={nextSlide}
        aria-label="Next speaker"
        style={{
          position: "absolute",
          right: "-20px",
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 10,
          width: "44px",
          height: "44px",
          borderRadius: "50%",
          backgroundColor: "#070D1E",
          border: "1px solid rgba(197, 168, 128, 0.4)",
          color: "var(--gold-oxford)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          boxShadow: "0 6px 16px rgba(0, 0, 0, 0.5)",
          transition: "background-color 0.2s, border-color 0.2s, transform 0.15s",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "var(--navy-surface)";
          e.currentTarget.style.borderColor = "var(--gold-oxford)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1.08)";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "#070D1E";
          e.currentTarget.style.borderColor = "rgba(197, 168, 128, 0.4)";
          e.currentTarget.style.transform = "translateY(-50%) scale(1)";
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <polyline points="9 18 15 12 9 6" />
        </svg>
      </button>

      {/* Main Testimonial Card */}
      <div
        style={{
          background: "linear-gradient(180deg, #0C172E 0%, #060D1E 100%)",
          border: "1px solid rgba(197, 168, 128, 0.35)",
          borderRadius: "20px",
          padding: "48px 36px 40px",
          boxShadow: "0 20px 48px -10px rgba(7, 13, 30, 0.5)",
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          minHeight: "360px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Top Gold Accent Line */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: "2px",
            background: "linear-gradient(90deg, transparent, var(--gold-oxford), transparent)",
          }}
        />

        {/* Circular Portrait */}
        <div
          style={{
            width: "88px",
            height: "88px",
            borderRadius: "50%",
            border: "2.5px solid var(--gold-oxford)",
            boxShadow: "0 6px 20px rgba(0, 0, 0, 0.6)",
            position: "relative",
            overflow: "hidden",
            backgroundColor: "var(--navy-surface)",
            marginBottom: "16px",
            flexShrink: 0,
          }}
        >
          {current.image ? (
            <Image
              src={current.image}
              alt={current.name}
              fill
              sizes="88px"
              style={{ objectFit: "cover" }}
            />
          ) : (
            <div
              style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontFamily: "var(--font-serif)",
                fontSize: "26px",
                color: "var(--gold-oxford)",
              }}
            >
              {current.name.split(" ").map((n) => n[0]).join("")}
            </div>
          )}
        </div>

        {/* Name & Title */}
        <h3
          className="font-display-serif"
          style={{
            fontSize: "28px",
            color: "#FFFFFF",
            lineHeight: 1.15,
            marginBottom: "4px",
          }}
        >
          {current.name}
        </h3>

        <div style={{ display: "flex", alignItems: "center", gap: "8px", justifyContent: "center", marginBottom: "20px", flexWrap: "wrap" }}>
          <span
            className="font-metadata-mono"
            style={{
              fontSize: "12px",
              color: "var(--gold-oxford)",
              fontWeight: 600,
            }}
          >
            {current.title}
          </span>
          <span style={{ color: "rgba(226, 232, 240, 0.3)" }}>·</span>
          <span
            style={{
              fontSize: "12px",
              color: "var(--platinum-muted)",
            }}
          >
            {current.firm}
          </span>
        </div>

        {/* Impact Quote */}
        <div style={{ maxWidth: "720px", position: "relative" }}>
          <span
            style={{
              fontSize: "42px",
              lineHeight: 0,
              color: "var(--gold-oxford)",
              fontFamily: "serif",
              display: "inline-block",
              verticalAlign: "middle",
              marginRight: "8px",
              opacity: 0.7,
            }}
          >
            “
          </span>
          <p
            style={{
              fontSize: "15.5px",
              color: "#F1F5F9",
              lineHeight: 1.7,
              fontStyle: "italic",
              display: "inline",
            }}
          >
            {current.quote}
          </p>
          <span
            style={{
              fontSize: "42px",
              lineHeight: 0,
              color: "var(--gold-oxford)",
              fontFamily: "serif",
              display: "inline-block",
              verticalAlign: "middle",
              marginLeft: "8px",
              opacity: 0.7,
            }}
          >
            ”
          </span>
        </div>

        {/* Category Pill */}
        <div style={{ marginTop: "24px" }}>
          <span
            className="font-metadata-mono"
            style={{
              fontSize: "10px",
              padding: "4px 12px",
              borderRadius: "100px",
              backgroundColor: "rgba(197, 168, 128, 0.12)",
              border: "1px solid rgba(197, 168, 128, 0.3)",
              color: "var(--gold-oxford)",
              textTransform: "uppercase",
              letterSpacing: "0.1em",
            }}
          >
            {current.category}
          </span>
        </div>
      </div>

      {/* Dot Indicators */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "8px",
          marginTop: "20px",
        }}
      >
        {mentors.map((m, idx) => (
          <button
            key={m.name}
            type="button"
            onClick={() => setCurrentIndex(idx)}
            aria-label={`Go to slide ${idx + 1}: ${m.name}`}
            style={{
              width: currentIndex === idx ? "24px" : "8px",
              height: "8px",
              borderRadius: "4px",
              backgroundColor: currentIndex === idx ? "var(--gold-oxford)" : "rgba(7, 13, 30, 0.2)",
              border: "none",
              cursor: "pointer",
              transition: "all 0.25s ease",
            }}
          />
        ))}
      </div>
    </div>
  );
}
