import React from "react";
import Link from "next/link";
import Image from "next/image";
import { about } from "@/content/about";
import LeadershipSection from "@/components/LeadershipSection";
import AboutHashScroll from "@/components/AboutHashScroll";

export const metadata = {
  title: "About Us — FINLOGUE | Institutional Charter & Leadership",
  description:
    "Learn about Finlogue's origin, foundational pillars, student leadership hierarchy, and mission to foster financial and strategic excellence at LNMIIT.",
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

      {/* 2. Mission & Long-Term Horizon — Crisp Pure White (#FFFFFF) */}
      <section className="section-pure-white">
        <div className="container">
          <div className="grid-2">
            <div
              style={{
                backgroundColor: "var(--white-pure)",
                border: "1px solid var(--white-border)",
                borderLeft: "3px solid var(--navy-hero)",
                boxShadow: "var(--card-shadow)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span className="section-badge" style={{ color: "var(--navy-hero)" }}>CORE PURPOSE</span>
                <h2 className="font-display-serif" style={{ fontSize: "32px", color: "var(--ink-title)", marginBottom: "16px" }}>
                  The Mission
                </h2>
                <p style={{ color: "var(--ink-body)", lineHeight: 1.7, fontSize: "15.5px" }}>
                  {about.mission.statement}
                </p>
              </div>
              <div style={{ marginTop: "36px", paddingTop: "18px", borderTop: "1px solid var(--white-border)" }}>
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  EXCELLENCE THROUGH RIGOR
                </span>
              </div>
            </div>

            <div
              style={{
                backgroundColor: "var(--white-pure)",
                border: "1px solid var(--white-border)",
                borderLeft: "3px solid var(--emerald)",
                boxShadow: "var(--card-shadow)",
                padding: "40px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
              }}
            >
              <div>
                <span className="section-badge" style={{ color: "var(--emerald)" }}>LONG-TERM HORIZON</span>
                <h2 className="font-display-serif" style={{ fontSize: "32px", color: "var(--ink-title)", marginBottom: "16px" }}>
                  The Vision
                </h2>
                <p style={{ color: "var(--ink-body)", lineHeight: 1.7, fontSize: "15.5px" }}>
                  {about.mission.vision}
                </p>
              </div>
              <div style={{ marginTop: "36px", paddingTop: "18px", borderTop: "1px solid var(--white-border)" }}>
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.12em" }}>
                  FORGING TOMORROW&apos;S FINANCIAL LEADERS
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. The Origin Timeline — Deep Midnight Navy (#070D1E) */}
      <section className="section-navy-dark">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">CHRONOLOGICAL ARCHIVE</span>
            <h2 className="section-title">{about.origin.title}</h2>
            <p className="section-sub">{about.origin.subtitle}</p>
          </div>

          <div className="grid-4">
            {about.origin.beats.map((beat) => (
              <div
                key={beat.step}
                style={{
                  backgroundColor: "var(--navy-card)",
                  border: "1px solid var(--navy-border)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  transition: "transform 0.25s ease, border-color 0.25s ease",
                }}
              >
                <div>
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      paddingBottom: "12px",
                      borderBottom: "1px solid var(--navy-border)",
                      marginBottom: "16px",
                    }}
                  >
                    <span className="font-metadata-mono" style={{ fontSize: "13px", color: "#FFFFFF", fontWeight: 700 }}>
                      {beat.step}
                    </span>
                    <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--gold-oxford)", textTransform: "uppercase", letterSpacing: "0.1em" }}>
                      {beat.phase}
                    </span>
                  </div>

                  <h3 className="font-display-serif" style={{ fontSize: "21px", color: "#FFFFFF" }}>
                    {beat.title}
                  </h3>

                  <p style={{ fontSize: "14px", color: "var(--platinum-muted)", marginTop: "12px", lineHeight: 1.6 }}>
                    {beat.description}
                  </p>
                </div>

                <div
                  className="font-metadata-mono"
                  style={{ marginTop: "24px", paddingTop: "12px", borderTop: "1px solid var(--navy-border)", fontSize: "11px", color: "var(--gold-oxford)", letterSpacing: "0.08em" }}
                >
                  {beat.highlight}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. Foundational Pillars In-Depth — Architectural Alabaster (#F8FAFC) */}
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
                  <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", display: "block", marginBottom: "12px" }}>
                    {pillar.fileNumber}
                  </span>

                  <h3 className="font-display-serif" style={{ fontSize: "28px", color: "var(--ink-title)", marginBottom: "12px" }}>
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
                  <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-title)", textTransform: "uppercase", display: "block", marginBottom: "10px" }}>
                    SIGNATURE INITIATIVES:
                  </span>
                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "8px" }}>
                    {pillar.keyInitiatives.map((init) => (
                      <li key={init} style={{ display: "flex", alignItems: "center", gap: "8px", fontSize: "13.5px", color: "var(--ink-body)" }}>
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

      {/* 5. Leadership & Hierarchy Preview — Redirects to Dedicated Team Section */}
      <section id="leadership" className="section-pure-white" style={{ scrollMarginTop: "120px" }}>
        <div className="container">
          <div className="section-header">
            <span className="section-badge">GOVERNANCE & HIERARCHY</span>
            <h2 className="section-title">Institutional Leadership</h2>
            <p className="section-sub">
              An institutional hierarchy governed by academic rigor, strategic discipline, and student leadership across LNMIIT.
            </p>
          </div>

          <div
            style={{
              backgroundColor: "var(--white-pure)",
              border: "1px solid var(--white-border)",
              boxShadow: "var(--card-shadow)",
              borderRadius: "var(--radius-sm)",
              padding: "44px 36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div style={{ maxWidth: "680px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", textTransform: "uppercase" }}>
                COORDINATORS · DEPARTMENT HEADS · CORE ASSOCIATES
              </span>
              <h3 className="font-display-serif" style={{ fontSize: "28px", color: "var(--ink-title)", margin: "8px 0 12px" }}>
                The People Behind The House
              </h3>
              <p style={{ fontSize: "15px", color: "var(--ink-body)", lineHeight: 1.65, margin: 0 }}>
                Explore the complete roster of our Steering Council Coordinators, Department Heads for Consulting & Research, and the Core Team associates driving institutional initiatives.
              </p>
            </div>

            <div>
              <Link
                href="/team"
                className="stamp-button stamp-button-primary"
                style={{ padding: "14px 28px" }}
              >
                <span>EXPLORE TEAM HIERARCHY ↗</span>
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* 6. Closing Partnership Banner — Deep Midnight Navy (#070D1E) */}
      <section className="section-navy-dark" style={{ padding: "80px 0" }}>
        <div className="container">
          <div
            style={{
              padding: "40px",
              backgroundColor: "var(--navy-card)",
              border: "1px solid var(--navy-border)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "24px",
            }}
          >
            <div>
              <h3 className="font-display-serif" style={{ fontSize: "28px", color: "#FFFFFF" }}>
                Want to partner or collaborate with Finlogue?
              </h3>
              <p style={{ fontSize: "14.5px", color: "var(--platinum-muted)", marginTop: "4px" }}>
                Reach out to our leadership council or explore our flagship symposiums.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/contact"
                className="stamp-button stamp-button-primary"
              >
                <span>CONTACT THE HOUSE</span>
              </Link>
              <Link
                href="/events"
                className="secondary-button"
              >
                <span>VIEW EVENTS & SCHEDULE</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
