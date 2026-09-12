import React from "react";
import { about } from "@/content/about";
import AboutHashScroll from "@/components/AboutHashScroll";
import SponsorsShowcase from "@/components/SponsorsShowcase";
import CollegiateCharterShowcase from "@/components/CollegiateCharterShowcase";

import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "About Us — FINLOGUE | Institutional Charter & Divisions",
  description:
    "Learn about Finlogue's vision, core foundational pillars, and esteemed patronages fostering financial and strategic excellence at LNMIIT.",
};

export default function AboutPage() {
  return (
    <main style={{ flex: 1, width: "100%", overflow: "hidden" }}>
      <AboutHashScroll />

      {/* 1. Page Hero Header — Deep Executive Midnight Navy (#0A1329) */}
      <section className="page-hero-navy">
        <div className="hero-architectural-grid" />
        <div className="container" style={{ position: "relative", zIndex: 10 }}>
          <ScrollReveal direction="up" delay={20}>
            <div className="badge-pill hero-anim-badge">
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "9999px",
                  backgroundColor: "var(--gold-oxford)",
                  display: "inline-block",
                }}
              />
              <span>{about.header.badge}</span>
            </div>

            <h1 className="hero-title hero-anim-title" style={{ textAlign: "left", margin: 0 }}>
              {about.header.title}
            </h1>

            <p className="hero-subline hero-anim-sub" style={{ textAlign: "left", margin: "24px 0 0", maxWidth: "780px" }}>
              {about.header.subtitle}
            </p>

            <p
              className="font-metadata-mono hero-anim-actions"
              style={{ fontSize: "11.5px", color: "var(--gold-oxford)", textTransform: "uppercase", marginTop: "20px" }}
            >
              {about.header.statSummary}
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* 2. Institutional Charter & Operational Chambers (Unified Collegiate Matrix) */}
      <CollegiateCharterShowcase />

      {/* 4. Top Sponsors & Patronages Structure (matching user reference image) */}
      <SponsorsShowcase />
    </main>
  );
}
