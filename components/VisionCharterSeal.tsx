"use client";

import React from "react";

export default function VisionCharterSeal() {
  return (
    <section
      style={{
        position: "relative",
        padding: "clamp(80px, 9vw, 120px) 0",
        backgroundColor: "var(--white-pure)",
        borderTop: "1px solid var(--white-border)",
        borderBottom: "1px solid var(--white-border)",
        overflow: "hidden",
      }}
      aria-label="Institutional Vision Charter"
    >
      {/* 1. Ultra-Slow Rotating Background Architectural Seal Watermark */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: "clamp(340px, 45vw, 560px)",
          height: "clamp(340px, 45vw, 560px)",
          pointerEvents: "none",
          opacity: 0.07,
          zIndex: 1,
        }}
      >
        <svg
          viewBox="0 0 500 500"
          style={{
            width: "100%",
            height: "100%",
            animation: "sealSpin 90s linear infinite",
          }}
        >
          {/* Outer Notched Ring */}
          <circle cx="250" cy="250" r="238" fill="none" stroke="var(--navy-hero)" strokeWidth="1.2" />
          <circle cx="250" cy="250" r="230" fill="none" stroke="var(--navy-hero)" strokeWidth="0.8" strokeDasharray="3 4" />
          <circle cx="250" cy="250" r="200" fill="none" stroke="var(--navy-hero)" strokeWidth="1" />

          {/* Cardinal Crosshair Coordinates */}
          <line x1="250" y1="4" x2="250" y2="496" stroke="var(--navy-hero)" strokeWidth="0.8" strokeDasharray="6 4" />
          <line x1="4" y1="250" x2="496" y2="250" stroke="var(--navy-hero)" strokeWidth="0.8" strokeDasharray="6 4" />
          <line x1="75" y1="75" x2="425" y2="425" stroke="var(--navy-hero)" strokeWidth="0.5" strokeDasharray="4 6" />
          <line x1="425" y1="75" x2="75" y2="425" stroke="var(--navy-hero)" strokeWidth="0.5" strokeDasharray="4 6" />

          {/* 8-Point Intersecting Octagram */}
          <polygon
            points="250,60 305,195 440,250 305,305 250,440 195,305 60,250 195,195"
            fill="none"
            stroke="var(--navy-hero)"
            strokeWidth="0.9"
          />

          {/* Inner Coordinate Ring */}
          <circle cx="250" cy="250" r="140" fill="none" stroke="var(--navy-hero)" strokeWidth="1.2" />
          <circle cx="250" cy="250" r="132" fill="none" stroke="var(--navy-hero)" strokeWidth="0.6" strokeDasharray="2 3" />
          <circle cx="250" cy="250" r="70" fill="none" stroke="var(--navy-hero)" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2, textAlign: "center" }}>
        {/* Formal Institutional Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "10px",
            padding: "6px 16px",
            backgroundColor: "var(--white-alabaster)",
            border: "1px solid var(--white-border-strong)",
            borderRadius: "9999px",
            marginBottom: "28px",
          }}
        >
          <span
            style={{
              width: "6px",
              height: "6px",
              borderRadius: "50%",
              backgroundColor: "var(--gold-oxford)",
              display: "inline-block",
            }}
          />
          <span
            className="font-metadata-mono"
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              color: "var(--navy-hero)",
              textTransform: "uppercase",
              fontWeight: 700,
            }}
          >
            INSTITUTIONAL CHARTER · THE VISION
          </span>
        </div>

        {/* Prestigious Center Emblem (Static Fine Hairline Crest) */}
        <div style={{ display: "flex", justifyContent: "center", marginBottom: "24px" }}>
          <div
            style={{
              width: "56px",
              height: "56px",
              borderRadius: "50%",
              border: "1px solid var(--gold-border)",
              backgroundColor: "var(--white-alabaster)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              boxShadow: "0 4px 14px rgba(197, 168, 128, 0.15)",
              position: "relative",
            }}
          >
            {/* Subtle Counter-Rotating Inner Ring */}
            <svg
              viewBox="0 0 100 100"
              style={{
                width: "44px",
                height: "44px",
                animation: "sealSpinReverse 40s linear infinite",
              }}
            >
              <circle cx="50" cy="50" r="46" fill="none" stroke="var(--gold-oxford)" strokeWidth="1.2" strokeDasharray="3 3" />
              <circle cx="50" cy="50" r="38" fill="none" stroke="var(--gold-oxford)" strokeWidth="0.8" />
              <polygon points="50,15 62,38 85,50 62,62 50,85 38,62 15,50 38,38" fill="none" stroke="var(--gold-oxford)" strokeWidth="0.9" />
              <circle cx="50" cy="50" r="5" fill="var(--gold-oxford)" />
            </svg>
          </div>
        </div>

        {/* Display Heading */}
        <h2
          className="font-display-serif"
          style={{
            fontSize: "clamp(32px, 3.8vw, 48px)",
            color: "var(--ink-title)",
            lineHeight: 1.2,
            maxWidth: "920px",
            margin: "0 auto 24px",
            fontWeight: 400,
            letterSpacing: "-0.01em",
          }}
        >
          Forging India&apos;s premier collegiate ecosystem for venture intelligence, corporate strategy, and financial engineering.
        </h2>

        {/* Minimal Subline Quote */}
        <p
          style={{
            fontSize: "clamp(15px, 1.2vw, 17.5px)",
            color: "var(--ink-muted)",
            maxWidth: "680px",
            margin: "0 auto 40px",
            lineHeight: 1.7,
            fontFamily: "var(--font-sans)",
          }}
        >
          Producing job creators, strategic advisors, and industry leaders through uncompromising analytical rigor and institutional meritocracy.
        </p>

        {/* Formal Roman Numerals & Divider Line (Representing the 4 Pillars without duplicate text) */}
        <div
          style={{
            maxWidth: "620px",
            margin: "0 auto",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "14px",
          }}
        >
          {/* Subtle Hairline Axis Line */}
          <div
            style={{
              width: "100%",
              height: "1px",
              background: "linear-gradient(90deg, transparent, var(--gold-border), var(--gold-oxford), var(--gold-border), transparent)",
            }}
          />

          {/* 4 Cardinal Pillars Accents */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              width: "100%",
              padding: "0 10px",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", fontWeight: 700 }}>
                I.
              </span>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-body)", letterSpacing: "0.08em" }}>
                MARKETS
              </span>
            </div>

            <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "var(--gold-oxford)", opacity: 0.6 }} />

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", fontWeight: 700 }}>
                II.
              </span>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-body)", letterSpacing: "0.08em" }}>
                STRATEGY
              </span>
            </div>

            <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "var(--gold-oxford)", opacity: 0.6 }} />

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", fontWeight: 700 }}>
                III.
              </span>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-body)", letterSpacing: "0.08em" }}>
                COMPETITIONS
              </span>
            </div>

            <span style={{ width: "3px", height: "3px", borderRadius: "50%", backgroundColor: "var(--gold-oxford)", opacity: 0.6 }} />

            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", fontWeight: 700 }}>
                IV.
              </span>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-body)", letterSpacing: "0.08em" }}>
                VENTURES
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Embedded Formal CSS Animation Keyframes */}
      <style jsx global>{`
        @keyframes sealSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes sealSpinReverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }
      `}</style>
    </section>
  );
}
