"use client";

import React, { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { MentorSpeaker } from "@/content/home";

interface InspirationalSpeakersProps {
  speakers: MentorSpeaker[];
}

export default function InspirationalSpeakers({ speakers }: InspirationalSpeakersProps) {
  const [currentSpeakers, setCurrentSpeakers] = useState<MentorSpeaker[]>(speakers);
  const [startIndex, setStartIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const fetchLiveSpeakers = async () => {
      try {
        const res = await fetch("/api/admin/speakers");
        const data = await res.json();
        if (data.success && Array.isArray(data.speakers) && data.speakers.length > 0) {
          setCurrentSpeakers(data.speakers);
        }
      } catch {
        // keep fallback
      }
    };
    fetchLiveSpeakers();
  }, []);

  const total = currentSpeakers.length;

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };
    handleResize();
    window.addEventListener("resize", handleResize, { passive: true });
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const nextSlide = useCallback(() => {
    if (total === 0) return;
    setStartIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    if (total === 0) return;
    setStartIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  // Auto-slides every 3.2 seconds reliably; pauses only when an individual card is hovered
  useEffect(() => {
    if (hoveredIdx !== null || total <= 1) return;
    const timer = setInterval(() => {
      setStartIndex((prev) => (prev + 1) % total);
    }, 3200);
    return () => clearInterval(timer);
  }, [hoveredIdx, total]);

  // Duplicate once for continuous sliding
  const displayItems = [...currentSpeakers, ...currentSpeakers];
  const stepDistance = isMobile ? 258 : 234;

  return (
    <div
      style={{
        width: "100%",
        position: "relative",
        padding: "10px 0 20px",
      }}
    >
      {/* Carousel Viewport (Static window, inner cards slide forward smoothly) */}
      <div
        style={{
          width: "100%",
          overflow: "hidden",
          borderRadius: "20px",
          padding: "8px 0",
        }}
      >
        <div
          className="speaker-carousel-track"
          style={{
            display: "flex",
            gap: "18px",
            transform: `translate3d(-${startIndex * stepDistance}px, 0, 0)`,
            transition: "transform 0.45s cubic-bezier(0.2, 0.9, 0.3, 1)",
            willChange: "transform",
            width: "max-content",
          }}
        >
          {displayItems.map((speaker, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={`${speaker.name}-${idx}`}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                style={{
                  width: isMobile ? "240px" : "216px",
                  flexShrink: 0,
                  background: "linear-gradient(180deg, #0D1933 0%, #060D1E 100%)",
                  border: isHovered
                    ? "1.5px solid var(--gold-oxford)"
                    : "1px solid rgba(197, 168, 128, 0.22)",
                  borderRadius: "18px",
                  padding: "26px 14px 22px",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  textAlign: "center",
                  boxShadow: isHovered
                    ? "0 14px 28px rgba(0, 0, 0, 0.45)"
                    : "0 4px 14px rgba(7, 13, 30, 0.2)",
                  transform: "none",
                  cursor: "pointer",
                }}
              >
                {/* Circular Portrait — Inner item that moves forward on hover */}
                <div
                  style={{
                    width: "98px",
                    height: "98px",
                    borderRadius: "50%",
                    border: isHovered ? "2.5px solid var(--gold-oxford)" : "2px solid rgba(226, 232, 240, 0.2)",
                    boxShadow: isHovered ? "0 8px 20px rgba(197, 168, 128, 0.35)" : "0 4px 12px rgba(0, 0, 0, 0.5)",
                    position: "relative",
                    overflow: "hidden",
                    backgroundColor: "var(--navy-surface)",
                    marginBottom: "14px",
                    transition: "transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1), border-color 0.2s",
                    transform: isHovered ? "scale(1.08) translateY(-3px)" : "scale(1) translateY(0)",
                  }}
                >
                  {speaker.image ? (
                    <Image
                      src={speaker.image}
                      alt={speaker.name}
                      fill
                      sizes="100px"
                      loading={idx < 5 ? "eager" : "lazy"}
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
                        fontSize: "24px",
                        color: "var(--gold-oxford)",
                      }}
                    >
                      {speaker.name.split(" ").map((n) => n[0]).join("")}
                    </div>
                  )}
                </div>

                {/* Speaker Name — Inner item that moves forward on hover */}
                <h4
                  className="font-display-serif"
                  style={{
                    fontSize: "17.5px",
                    color: isHovered ? "#FFFFFF" : "var(--gold-oxford)",
                    lineHeight: 1.2,
                    marginBottom: "5px",
                    transition: "transform 0.2s ease, color 0.2s ease",
                    transform: isHovered ? "translateY(-2px)" : "translateY(0)",
                  }}
                >
                  {speaker.name}
                </h4>

                {/* Title / Role */}
                <span
                  className="font-metadata-mono"
                  style={{
                    fontSize: "10.5px",
                    color: "#FFFFFF",
                    display: "block",
                    lineHeight: 1.35,
                    transition: "transform 0.2s ease",
                    transform: isHovered ? "translateY(-1px)" : "translateY(0)",
                  }}
                >
                  {speaker.title}
                </span>

                <span
                  style={{
                    fontSize: "10px",
                    color: "var(--platinum-muted)",
                    marginTop: "4px",
                    display: "block",
                  }}
                >
                  {speaker.firm}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Controls Bar: Left Arrow, Pagination Dots, Right Arrow (Below the Grids) */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "18px",
          marginTop: "26px",
        }}
      >
        {/* Left Arrow Button */}
        <button
          type="button"
          onClick={prevSlide}
          aria-label="Previous speaker"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "var(--navy-hero)",
            border: "1.5px solid var(--gold-oxford)",
            color: "var(--gold-oxford)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(7, 13, 30, 0.25)",
            transition: "transform 0.15s ease, background-color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.backgroundColor = "#0C172E";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "var(--navy-hero)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Pagination Dots */}
        <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
          {currentSpeakers.map((s, idx) => (
            <button
              key={`${s.name}-${idx}`}
              type="button"
              onClick={() => setStartIndex(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              style={{
                width: startIndex === idx ? "24px" : "8px",
                height: "8px",
                borderRadius: "4px",
                backgroundColor: startIndex === idx ? "var(--gold-oxford)" : "rgba(7, 13, 30, 0.2)",
                border: "none",
                cursor: "pointer",
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>

        {/* Right Arrow Button */}
        <button
          type="button"
          onClick={nextSlide}
          aria-label="Next speaker"
          style={{
            width: "42px",
            height: "42px",
            borderRadius: "50%",
            backgroundColor: "var(--navy-hero)",
            border: "1.5px solid var(--gold-oxford)",
            color: "var(--gold-oxford)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            boxShadow: "0 4px 14px rgba(7, 13, 30, 0.25)",
            transition: "transform 0.15s ease, background-color 0.15s ease",
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.transform = "scale(1.08)";
            e.currentTarget.style.backgroundColor = "#0C172E";
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.backgroundColor = "var(--navy-hero)";
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </div>
  );
}
