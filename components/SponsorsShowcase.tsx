"use client";

import React from "react";
import Image from "next/image";
import ScrollReveal from "@/components/ScrollReveal";

export interface SponsorItem {
  id: string;
  name: string;
  category?: string;
  logo?: string;
  type?: "unesco" | "startupindia" | "digitalindia" | "makeinindia" | "wadhwani" | "cnn" | "custom";
  link?: string;
}

export const POTR_SPONSORS: SponsorItem[] = [
  {
    id: "sp-yoso",
    name: "YOSO FASHION",
    category: "Fashion Partner",
    logo: "/assets/sponsors/yoso-fashion.png",
  },
  {
    id: "sp-kts",
    name: "KTS CABS",
    category: "Travel Partner",
    logo: "/assets/sponsors/kts-cabs.png",
  },
  {
    id: "sp-urban-biotix",
    name: "URBAN BIOTIX",
    category: "Gifting Partner",
    logo: "/assets/sponsors/urban-biotix.png",
  },
  {
    id: "sp-gvm",
    name: "GVM ENERGY",
    category: "Sustainable Partner",
    logo: "/assets/sponsors/gvm-energy.png",
  },
  {
    id: "sp-dezan-shira",
    name: "DEZAN SHIRA",
    category: "Media Partner",
    logo: "/assets/sponsors/dezan-shira.png",
  },
];

interface SponsorsShowcaseProps {
  title?: string;
  subtitle?: string;
  sponsors?: SponsorItem[];
  potrSponsors?: SponsorItem[];
}

const DEFAULT_SPONSORS: SponsorItem[] = [
  {
    id: "sp-unesco",
    name: "UNESCO",
    type: "unesco",
    category: "Global Patron",
  },
  {
    id: "sp-startupindia",
    name: "#startupindia",
    type: "startupindia",
    category: "National Partner",
  },
  {
    id: "sp-digitalindia",
    name: "Digital India",
    type: "digitalindia",
    category: "Govt. Initiative",
  },
  {
    id: "sp-makeinindia",
    name: "MAKE IN INDIA",
    type: "makeinindia",
    category: "Institutional Patron",
  },
  {
    id: "sp-wadhwani",
    name: "WADHWANI FOUNDATION",
    type: "wadhwani",
    category: "Foundation Partner",
  },
  {
    id: "sp-cnn",
    name: "CNN",
    type: "cnn",
    category: "Media Network",
  },
];

export default function SponsorsShowcase({
  title = "PATRONAGES AND RECOGNITIONS",
  subtitle,
  sponsors = DEFAULT_SPONSORS,
  potrSponsors = POTR_SPONSORS,
}: SponsorsShowcaseProps) {
  const renderSponsorMark = (sp: SponsorItem) => {
    // If a custom image logo is provided, render the clean branded medallion
    if (sp.logo) {
      return (
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px", width: "100%", height: "100%", justifyContent: "center" }}>
          <div
            style={{
              position: "relative",
              width: "66px",
              height: "66px",
              borderRadius: "50%",
              overflow: "hidden",
              border: "1.5px solid var(--gold-oxford)",
              boxShadow: "0 4px 14px rgba(0,0,0,0.35)",
              backgroundColor: "#FFFFFF",
              flexShrink: 0,
            }}
          >
            <Image
              src={sp.logo}
              alt={sp.name}
              fill
              sizes="80px"
              style={{ objectFit: "cover" }}
            />
          </div>
          <div style={{ textAlign: "center", lineHeight: 1.2 }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 700,
                color: "#FFFFFF",
                display: "block",
                letterSpacing: "0.02em",
              }}
            >
              {sp.name}
            </span>
            {sp.category && (
              <span
                className="font-metadata-mono"
                style={{
                  fontSize: "9px",
                  color: "var(--gold-oxford)",
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  display: "block",
                  marginTop: "3px",
                }}
              >
                {sp.category}
              </span>
            )}
          </div>
        </div>
      );
    }

    // High-fidelity brand SVGs replicating the reference image exactly
    switch (sp.type) {
      case "unesco":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="54" height="38" viewBox="0 0 60 42" fill="none" xmlns="http://www.w3.org/2000/svg">
              {/* Roof pediment */}
              <polygon points="30,2 2,12 58,12" fill="#FFFFFF" />
              {/* Entablature beam */}
              <rect x="5" y="14" width="50" height="3" fill="#FFFFFF" />
              {/* 5 Classical Pillars */}
              <rect x="8" y="19" width="5" height="14" fill="#FFFFFF" />
              <rect x="18" y="19" width="5" height="14" fill="#FFFFFF" />
              <rect x="27.5" y="19" width="5" height="14" fill="#FFFFFF" />
              <rect x="37" y="19" width="5" height="14" fill="#FFFFFF" />
              <rect x="47" y="19" width="5" height="14" fill="#FFFFFF" />
              {/* Base plinths */}
              <rect x="5" y="35" width="50" height="2.5" fill="#FFFFFF" />
              <rect x="2" y="38.5" width="56" height="3" fill="#FFFFFF" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16px",
                fontWeight: 900,
                color: "#FFFFFF",
                letterSpacing: "0.2em",
                lineHeight: 1,
              }}
            >
              UNESCO
            </span>
          </div>
        );

      case "startupindia":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "16.5px",
                fontWeight: 800,
                color: "#E8590C",
                letterSpacing: "0.02em",
                lineHeight: 1,
              }}
            >
              #startup<span style={{ color: "#2F9E44" }}>india</span>
            </span>
            <svg width="72" height="16" viewBox="0 0 62 14" fill="none" style={{ marginTop: "6px" }}>
              <path d="M2 12 H42 V5 H58" stroke="#2F9E44" strokeWidth="2.8" strokeLinecap="round" />
            </svg>
          </div>
        );

      case "digitalindia":
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
              <circle cx="20" cy="20" r="17" stroke="#16A34A" strokeWidth="3.5" />
              <path d="M12 28 C 14 14, 26 14, 28 28" stroke="#F97316" strokeWidth="3.5" strokeLinecap="round" />
              <circle cx="20" cy="18" r="4.5" fill="#3B82F6" />
            </svg>
            <div style={{ display: "flex", flexDirection: "column", textAlign: "left" }}>
              <span style={{ fontFamily: "var(--font-sans)", fontSize: "13.5px", fontWeight: 800, color: "#FFFFFF", lineHeight: 1.1 }}>
                Digital India
              </span>
              <span style={{ fontSize: "8px", color: "rgba(255,255,255,0.75)", letterSpacing: "0.04em", marginTop: "2px" }}>
                Power To Empower
              </span>
            </div>
          </div>
        );

      case "makeinindia":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "8px" }}>
            <svg width="68" height="30" viewBox="0 0 70 30" fill="none">
              <path
                d="M5 24 Q 10 10, 25 12 Q 35 6, 50 10 Q 60 12, 65 18 Q 62 26, 50 24 Q 40 28, 30 25 Q 15 28, 5 24 Z"
                fill="#94A3B8"
                opacity="0.9"
              />
              <circle cx="20" cy="17" r="4" stroke="#1E2833" strokeWidth="1.8" />
              <circle cx="36" cy="18" r="5" stroke="#1E2833" strokeWidth="1.8" />
              <circle cx="50" cy="17" r="3.5" stroke="#1E2833" strokeWidth="1.8" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "11px",
                fontWeight: 800,
                color: "#FFFFFF",
                letterSpacing: "0.14em",
                lineHeight: 1,
              }}
            >
              MAKE IN INDIA
            </span>
          </div>
        );

      case "wadhwani":
        return (
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "6px" }}>
            <svg width="50" height="22" viewBox="0 0 44 20" fill="none">
              <polygon points="22,18 10,2 16,2 22,12 28,2 34,2" fill="#F97316" />
              <polygon points="22,18 4,2 8,2 22,14 36,2 40,2" fill="#EA580C" opacity="0.85" />
            </svg>
            <span
              style={{
                fontFamily: "var(--font-sans)",
                fontSize: "10.5px",
                fontWeight: 800,
                color: "#EA580C",
                letterSpacing: "0.08em",
                textAlign: "center",
                lineHeight: 1.15,
              }}
            >
              WADHWANI<br />FOUNDATION
            </span>
          </div>
        );

      case "cnn":
        return (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "36px",
              fontWeight: 900,
              color: "#E11D48",
              letterSpacing: "-0.04em",
              lineHeight: 1,
              textShadow: "0 0 1px #E11D48",
            }}
          >
            CNN
          </span>
        );

      default:
        return (
          <span
            style={{
              fontFamily: "var(--font-sans)",
              fontSize: "13px",
              fontWeight: 800,
              color: "#FFFFFF",
              letterSpacing: "0.06em",
              textAlign: "center",
            }}
          >
            {sp.name}
          </span>
        );
    }
  };

  return (
    <section className="sponsors-showcase-section" style={{ padding: "80px 0" }}>
      <div className="container">
        {/* 1. POTR Past Edition Sponsors (Last Year Pitch on the Rocks) */}
        <ScrollReveal direction="up" delay={40}>
          <div className="sponsors-showcase-header">
            <div className="badge-pill" style={{ marginBottom: "12px", display: "inline-flex" }}>
              <span
                style={{
                  width: "7px",
                  height: "7px",
                  borderRadius: "9999px",
                  backgroundColor: "var(--gold-oxford)",
                  display: "inline-block",
                }}
              />
              <span>PITCH ON THE ROCKS</span>
            </div>
            <h2 className="sponsors-showcase-title">FLAGSHIP SUMMIT SPONSORS</h2>
            <p className="sponsors-showcase-subtitle" style={{ maxWidth: "640px", margin: "10px auto 0" }}>
              Proudly partnering with distinguished industry leaders, innovative brands, and ecosystem partners from the previous edition of Pitch on the Rocks (POTR).
            </p>
          </div>
        </ScrollReveal>

        <div className="sponsors-showcase-grid" style={{ marginBottom: "60px" }}>
          {potrSponsors.map((sp, idx) => (
            <ScrollReveal key={sp.id} direction="up" delay={idx * 65}>
              <div className="sponsor-tile-wrapper gold-glow-hover" title={`${sp.name} — ${sp.category}`}>
                <div className="sponsor-tile-backdrop" />
                <div className="sponsor-tile-front shimmer-sweep">
                  {renderSponsorMark(sp)}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        {/* 2. Institutional Patronages & Recognitions */}
        <div style={{ paddingTop: "40px", borderTop: "1px solid rgba(197, 168, 128, 0.2)" }}>
          <ScrollReveal direction="up" delay={40}>
            <div className="sponsors-showcase-header" style={{ marginBottom: "28px" }}>
              <h3 className="sponsors-showcase-title" style={{ fontSize: "22px", color: "var(--gold-oxford)" }}>
                {title}
              </h3>
              {subtitle && <p className="sponsors-showcase-subtitle">{subtitle}</p>}
            </div>
          </ScrollReveal>

          <div className="sponsors-showcase-grid">
            {sponsors.map((sp, idx) => {
              const cardContent = (
                <ScrollReveal key={sp.id} direction="up" delay={idx * 65}>
                  <div className="sponsor-tile-wrapper gold-glow-hover">
                    <div className="sponsor-tile-backdrop" />
                    <div className="sponsor-tile-front shimmer-sweep">
                      {renderSponsorMark(sp)}
                    </div>
                  </div>
                </ScrollReveal>
              );

              if (sp.link) {
                return (
                  <a
                    key={sp.id}
                    href={sp.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ textDecoration: "none" }}
                    aria-label={sp.name}
                  >
                    {cardContent}
                  </a>
                );
              }

              return cardContent;
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
