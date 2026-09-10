import React from "react";
import Link from "next/link";
import { about } from "@/content/about";
import AboutHashScroll from "@/components/AboutHashScroll";
import SponsorsShowcase from "@/components/SponsorsShowcase";

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

      {/* 2. The Vision — Focused Architectural Statement (Mission removed) */}
      <section className="section-pure-white" style={{ padding: "80px 0" }}>
        <div className="container">
          <div
            style={{
              maxWidth: "920px",
              margin: "0 auto",
              backgroundColor: "var(--white-pure)",
              border: "1px solid var(--white-border)",
              borderLeft: "4px solid var(--emerald)",
              boxShadow: "var(--card-shadow)",
              padding: "48px 40px",
              textAlign: "center",
              borderRadius: "var(--radius-sm)",
            }}
          >
            <span className="section-badge" style={{ color: "var(--emerald)", marginBottom: "14px" }}>
              LONG-TERM HORIZON
            </span>
            <h2
              className="font-display-serif"
              style={{ fontSize: "clamp(30px, 3.5vw, 42px)", color: "var(--ink-title)", marginBottom: "20px" }}
            >
              The Vision
            </h2>
            <p
              style={{
                color: "var(--ink-body)",
                lineHeight: 1.8,
                fontSize: "clamp(16px, 1.35vw, 18.5px)",
                maxWidth: "760px",
                margin: "0 auto",
              }}
            >
              {about.mission.vision}
            </p>
            <div
              style={{
                marginTop: "32px",
                paddingTop: "20px",
                borderTop: "1px solid var(--white-border)",
              }}
            >
              <span
                className="font-metadata-mono"
                style={{
                  fontSize: "11.5px",
                  color: "var(--gold-oxford)",
                  textTransform: "uppercase",
                  letterSpacing: "0.14em",
                }}
              >
                FORGING TOMORROW&apos;S FINANCIAL LEADERS · LNMIIT
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Foundational Pillars In-Depth — Architectural Alabaster (#F8FAFC) */}
      <section className="section-alabaster">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">ORGANIZATIONAL DIVISIONS</span>
            <h2 className="section-title">Our Core Pillars</h2>
            <p className="section-sub">
              Four specialized divisions working in synergy to provide 360° mastery across markets, consulting, competitions, and early-stage ventures.
            </p>
          </div>

          <div className="grid-2">
            {about.pillars.map((pillar) => (
              <div
                key={pillar.id}
                id={pillar.id}
                style={{
                  backgroundColor: "var(--white-pure)",
                  border: "1px solid var(--white-border)",
                  boxShadow: "var(--card-shadow)",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  scrollMarginTop: "120px",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease",
                }}
              >
                <div>
                  <span
                    className="font-metadata-mono"
                    style={{
                      fontSize: "11px",
                      color: "var(--burgundy-crest)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "12px",
                    }}
                  >
                    {pillar.fileNumber}
                  </span>

                  <h3
                    className="font-display-serif"
                    style={{ fontSize: "28px", color: "var(--ink-title)", marginBottom: "12px" }}
                  >
                    {pillar.title}
                  </h3>

                  <p style={{ fontSize: "15px", color: "var(--ink-body)", fontWeight: 600, marginBottom: "12px" }}>
                    {pillar.blurb}
                  </p>

                  <p style={{ fontSize: "14px", color: "var(--ink-muted)", lineHeight: 1.65, marginBottom: "24px" }}>
                    {pillar.details}
                  </p>
                </div>

                <div style={{ paddingTop: "20px", borderTop: "1px solid var(--white-border)" }}>
                  <span
                    className="font-metadata-mono"
                    style={{
                      fontSize: "11px",
                      color: "var(--ink-title)",
                      textTransform: "uppercase",
                      display: "block",
                      marginBottom: "10px",
                    }}
                  >
                    SIGNATURE INITIATIVES:
                  </span>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {pillar.keyInitiatives.map((init) => (
                      <li
                        key={init}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          fontSize: "13.5px",
                          color: "var(--ink-body)",
                        }}
                      >
                        <span style={{ width: "6px", height: "6px", borderRadius: "50%", backgroundColor: "var(--navy-hero)" }} />
                        <span>{init}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Top Sponsors & Patronages Structure (matching user reference image) */}
      <SponsorsShowcase />
    </main>
  );
}
