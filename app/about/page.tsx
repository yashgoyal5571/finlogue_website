import React from "react";
import { about } from "@/content/about";
import AboutHashScroll from "@/components/AboutHashScroll";
import SponsorsShowcase from "@/components/SponsorsShowcase";
import CollegiateCharterShowcase from "@/components/CollegiateCharterShowcase";

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
          <div className="badge-pill">
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

          <h1 className="hero-title" style={{ textAlign: "left", margin: 0 }}>
            {about.header.title}
          </h1>

          <p className="hero-subline" style={{ textAlign: "left", margin: "24px 0 0", maxWidth: "780px" }}>
            {about.header.subtitle}
          </p>

          <p
            className="font-metadata-mono"
            style={{ fontSize: "11.5px", color: "var(--gold-oxford)", textTransform: "uppercase", marginTop: "20px" }}
          >
            {about.header.statSummary}
          </p>
        </div>
      </section>

      {/* 2. Institutional Charter & Operational Chambers (Unified Collegiate Matrix) */}
      <CollegiateCharterShowcase />

      {/* 4. Top Sponsors & Patronages Structure (matching user reference image) */}
      <SponsorsShowcase />
    </main>
  );
}
