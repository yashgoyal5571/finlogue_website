"use client";

import React from "react";
import Image from "next/image";

export interface VentureItem {
  id: string;
  name: string;
  tagline?: string;
  logoType: "sensovision" | "augaid" | "citpeels" | "cubicles" | "lokachakra" | "vzeya" | "eventzbook" | "drivomate";
}

const VENTURES: VentureItem[] = [
  {
    id: "v-sensovision",
    name: "SensoVision",
    tagline: "AI-Powered Visual Analytics",
    logoType: "sensovision",
  },
  {
    id: "v-augaid",
    name: "AugAid",
    tagline: "Assistive Health Technology",
    logoType: "augaid",
  },
  {
    id: "v-citpeels",
    name: "CIT-Peels",
    tagline: "Sustainable Biomaterials",
    logoType: "citpeels",
  },
  {
    id: "v-cubicles",
    name: "Cubicles.com",
    tagline: "Flexible Workspace Systems",
    logoType: "cubicles",
  },
  {
    id: "v-lokachakra",
    name: "Lokachakra",
    tagline: "Smart Logistics Platform",
    logoType: "lokachakra",
  },
  {
    id: "v-vzeya",
    name: "Vzeya",
    tagline: "Automated Creator Commerce",
    logoType: "vzeya",
  },
  {
    id: "v-eventzbook",
    name: "Eventz Book",
    tagline: "Unified Event Infrastructure",
    logoType: "eventzbook",
  },
  {
    id: "v-drivomate",
    name: "Drivomate",
    tagline: "Connected Fleet Telematics",
    logoType: "drivomate",
  },
];

export default function VenturesShowcase() {
  const renderVentureMark = (v: VentureItem) => {
    switch (v.logoType) {
      case "sensovision":
        return (
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
            }}
          >
            <div style={{ position: "relative", width: "88px", height: "38px" }}>
              <Image
                src="/assets/ventures/sensovision-icon.png"
                alt="SensoVision mark"
                fill
                sizes="100px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
            <div style={{ position: "relative", width: "116px", height: "20px" }}>
              <Image
                src="/assets/ventures/sensovision-text.png"
                alt="SensoVision"
                fill
                sizes="130px"
                style={{ objectFit: "contain" }}
                priority
              />
            </div>
          </div>
        );

      case "augaid":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="42" height="42" viewBox="0 0 40 40" fill="none">
              <rect x="15" y="5" width="10" height="30" rx="4" fill="#10B981" />
              <rect x="5" y="15" width="30" height="10" rx="4" fill="#10B981" />
              <path
                d="M11 20 H 16 L 18.5 13 L 21.5 27 L 24 20 H 29"
                stroke="#FFFFFF"
                strokeWidth="2.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "15px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              Aug<span style={{ color: "#34D399" }}>Aid</span>
            </span>
          </div>
        );

      case "citpeels":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="42" height="40" viewBox="0 0 38 36" fill="none">
              <path
                d="M19 4 C27 4, 34 11, 34 20 C34 28, 26 33, 19 33 C12 33, 4 28, 4 20 C4 11, 11 4, 19 4 Z"
                fill="none"
                stroke="#F59E0B"
                strokeWidth="2.8"
              />
              <path
                d="M19 8 C23 12, 25 18, 19 28 C15 22, 14 15, 19 8 Z"
                fill="#F59E0B"
                opacity="0.85"
              />
              <path d="M13 18 Q 19 16, 25 18" stroke="#1E2833" strokeWidth="1.8" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14.5px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              CIT-<span style={{ color: "#FBBF24" }}>Peels</span>
            </span>
          </div>
        );

      case "cubicles":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="42" height="38" viewBox="0 0 40 36" fill="none">
              <polygon points="20,2 36,11 20,20 4,11" fill="#38BDF8" opacity="0.95" />
              <polygon points="4,11 20,20 20,34 4,25" fill="#0284C7" />
              <polygon points="36,11 20,20 20,34 36,25" fill="#0369A1" />
              <rect x="9" y="16" width="5" height="5" fill="#E0F2FE" opacity="0.8" />
              <rect x="26" y="16" width="5" height="5" fill="#E0F2FE" opacity="0.8" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              Cubicles<span style={{ color: "#38BDF8" }}>.com</span>
            </span>
          </div>
        );

      case "lokachakra":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="40" height="40" viewBox="0 0 38 38" fill="none">
              <circle cx="19" cy="19" r="15" stroke="#FB923C" strokeWidth="2.8" strokeDasharray="5 3" />
              <circle cx="19" cy="19" r="8" stroke="#FFFFFF" strokeWidth="2.2" />
              <circle cx="19" cy="19" r="3.5" fill="#F97316" />
              <line x1="19" y1="4" x2="19" y2="11" stroke="#F97316" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="19" y1="27" x2="19" y2="34" stroke="#F97316" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="4" y1="19" x2="11" y2="19" stroke="#F97316" strokeWidth="2.8" strokeLinecap="round" />
              <line x1="27" y1="19" x2="34" y2="19" stroke="#F97316" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14.5px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.04em",
                lineHeight: 1,
              }}
            >
              Loka<span style={{ color: "#FB923C" }}>chakra</span>
            </span>
          </div>
        );

      case "vzeya":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="42" height="38" viewBox="0 0 38 34" fill="none">
              <path d="M4 4 L19 30 L34 4 L26 4 L19 18 L12 4 Z" fill="#818CF8" />
              <circle cx="19" cy="8" r="3.5" fill="#C7D2FE" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.06em",
                lineHeight: 1,
              }}
            >
              Vzeya
            </span>
          </div>
        );

      case "eventzbook":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="42" height="36" viewBox="0 0 42 34" fill="none">
              <rect x="3" y="4" width="36" height="26" rx="4" stroke="#F43F5E" strokeWidth="2.8" />
              <circle cx="3" cy="17" r="4" fill="#1E2833" stroke="#F43F5E" strokeWidth="2.2" />
              <circle cx="39" cy="17" r="4" fill="#1E2833" stroke="#F43F5E" strokeWidth="2.2" />
              <line x1="16" y1="11" x2="26" y2="11" stroke="#FDA4AF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="14" y1="17" x2="28" y2="17" stroke="#FDA4AF" strokeWidth="2.5" strokeLinecap="round" />
              <line x1="18" y1="23" x2="24" y2="23" stroke="#FDA4AF" strokeWidth="2.5" strokeLinecap="round" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              Eventz <span style={{ color: "#FB7185" }}>Book</span>
            </span>
          </div>
        );

      case "drivomate":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="42" height="38" viewBox="0 0 40 34" fill="none">
              <circle cx="20" cy="17" r="14" stroke="#06B6D4" strokeWidth="2.8" />
              <circle cx="20" cy="17" r="5" fill="#06B6D4" />
              <line x1="20" y1="17" x2="28" y2="9" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" />
              <path d="M10 23 Q 20 28, 30 23" stroke="#06B6D4" strokeWidth="2.4" strokeLinecap="round" fill="none" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "14.5px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.03em",
                lineHeight: 1,
              }}
            >
              Drivo<span style={{ color: "#22D3EE" }}>mate</span>
            </span>
          </div>
        );
    }
  };

  return (
    <section className="sponsors-showcase-section" style={{ padding: "75px 0 85px" }}>
      <div className="container">
        <div className="sponsors-showcase-header" style={{ marginBottom: "36px" }}>
          <span
            className="section-badge"
            style={{
              fontSize: "11px",
              letterSpacing: "0.16em",
              marginBottom: "8px",
              display: "inline-block",
              color: "var(--navy-hero)",
            }}
          >
            VENTURES PITCHED & ACCELERATED THROUGH OUR SUMMITS
          </span>
        </div>

        <div className="sponsors-showcase-grid">
          {VENTURES.map((v) => (
            <div className="sponsor-tile-wrapper" key={v.id} title={`${v.name}${v.tagline ? ` · ${v.tagline}` : ""}`}>
              {/* Soft gold/sand backing rim */}
              <div className="sponsor-tile-backdrop" />
              {/* Dark slate/navy squircle front tile */}
              <div className="sponsor-tile-front">
                {renderVentureMark(v)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
