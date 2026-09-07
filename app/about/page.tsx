import React from "react";
import Link from "next/link";
import Image from "next/image";
import { about } from "@/content/about";

export const metadata = {
  title: "About Us — FINLOGUE | Institutional Charter & Leadership",
  description:
    "Learn about Finlogue's origin, foundational pillars, student leadership hierarchy, and mission to foster financial and strategic excellence at LNMIIT.",
};

export default function AboutPage() {
  return (
    <main style={{ flex: 1, width: "100%", overflow: "hidden" }}>
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
                style={{
                  backgroundColor: "var(--white-pure)",
                  border: "1px solid var(--white-border)",
                  boxShadow: "var(--card-shadow)",
                  padding: "36px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
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

      {/* 5. Leadership & Hierarchy — Elevated Executive Presentation */}
      <section className="section-pure-white">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">GOVERNANCE & HIERARCHY</span>
            <h2 className="section-title">Leadership Hierarchy</h2>
            <p className="section-sub">{about.leadership.subtitle}</p>
          </div>

          {/* Tier 1: Coordinators (The Steering Council) — Executive Navy Blue Cards */}
          <div style={{ marginBottom: "64px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "12px", borderBottom: "1px solid var(--white-border)", marginBottom: "32px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--navy-hero)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
                COORDINATORS · THE STEERING COUNCIL
              </span>
              <span style={{ fontSize: "11px", color: "var(--gold-oxford)", fontFamily: "var(--font-mono)" }}>
                [EXECUTIVE BOARD]
              </span>
            </div>

            <div className="grid-3">
              {about.leadership.coordinators.map((coord) => (
                <div
                  key={coord.name}
                  style={{
                    background: "linear-gradient(180deg, #0C172E 0%, #060D1E 100%)",
                    border: "1px solid rgba(197, 168, 128, 0.4)",
                    boxShadow: "0 14px 38px -4px rgba(7, 13, 30, 0.4)",
                    padding: "32px 28px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    borderRadius: "var(--radius-sm)",
                    position: "relative",
                    overflow: "hidden",
                    transition: "transform 0.3s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.3s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.2s ease",
                  }}
                >
                  <div>
                    {/* Top Status Bar */}
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
                      <span className="status-badge status-badge-active" style={{ fontSize: "10px" }}>AUTHORIZED</span>
                      <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--gold-oxford)" }}>
                        STEERING COUNCIL
                      </span>
                    </div>

                    {/* Circular Portrait Header */}
                    <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "20px" }}>
                      <div
                        style={{
                          width: "80px",
                          height: "80px",
                          borderRadius: "50%",
                          border: "2px solid var(--gold-oxford)",
                          boxShadow: "0 4px 16px rgba(0, 0, 0, 0.5)",
                          position: "relative",
                          overflow: "hidden",
                          flexShrink: 0,
                          backgroundColor: "var(--navy-surface)",
                        }}
                      >
                        {coord.image ? (
                          <Image
                            src={coord.image}
                            alt={coord.name}
                            fill
                            sizes="80px"
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
                              backgroundColor: "var(--navy-surface)",
                            }}
                          >
                            {coord.name.split(" ").map((n) => n[0]).join("")}
                          </div>
                        )}
                      </div>

                      <div>
                        <h4 className="font-display-serif" style={{ fontSize: "26px", color: "#FFFFFF", lineHeight: 1.15 }}>
                          {coord.name}
                        </h4>
                        <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", display: "block", marginTop: "4px" }}>
                          {coord.role}
                        </span>
                      </div>
                    </div>

                    <p style={{ fontSize: "14px", color: "var(--platinum-muted)", lineHeight: 1.55 }}>
                      {coord.focus}
                    </p>
                  </div>

                  {/* Contact & Social Action Strip */}
                  <div
                    style={{
                      marginTop: "28px",
                      paddingTop: "16px",
                      borderTop: "1px solid rgba(226, 232, 240, 0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <a
                      href={`mailto:${coord.email}`}
                      className="font-metadata-mono"
                      style={{ fontSize: "11px", color: "var(--platinum-muted)", display: "inline-flex", alignItems: "center", gap: "6px" }}
                      title={`Email ${coord.name}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <rect width="20" height="16" x="2" y="4" rx="2" />
                        <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                      </svg>
                      <span>{coord.email}</span>
                    </a>

                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                      <a
                        href={coord.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${coord.name} LinkedIn`}
                        style={{
                          width: "32px",
                          height: "32px",
                          borderRadius: "50%",
                          border: "1px solid rgba(197, 168, 128, 0.4)",
                          backgroundColor: "rgba(255, 255, 255, 0.05)",
                          color: "var(--gold-oxford)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "background-color 0.2s, color 0.2s, border-color 0.2s",
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6Z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 2: Department Heads — Styled with Circular Portraits & Socials */}
          <div style={{ marginBottom: "64px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", paddingBottom: "12px", borderBottom: "1px solid var(--white-border)", marginBottom: "32px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--navy-hero)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
                DEPARTMENT HEADS · BATCH Y24
              </span>
            </div>

            <div className="grid-2">
              {about.leadership.heads.map((head) => (
                <div
                  key={head.name}
                  style={{
                    backgroundColor: "var(--white-pure)",
                    border: "1px solid var(--white-border)",
                    boxShadow: "var(--card-shadow)",
                    padding: "28px",
                    display: "flex",
                    alignItems: "center",
                    gap: "24px",
                    borderRadius: "var(--radius-sm)",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease",
                  }}
                >
                  <div
                    style={{
                      width: "84px",
                      height: "84px",
                      borderRadius: "50%",
                      border: "2px solid var(--white-border-strong)",
                      boxShadow: "0 2px 8px rgba(7, 13, 30, 0.08)",
                      position: "relative",
                      overflow: "hidden",
                      flexShrink: 0,
                      backgroundColor: "var(--white-alabaster)",
                    }}
                  >
                    <Image
                      src={head.image ?? "/assets/team/aryan-mittal.jpg"}
                      alt={head.name}
                      fill
                      sizes="84px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ flex: 1 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span className="badge-category badge-cat-finance" style={{ fontSize: "10px" }}>
                        {head.dept}
                      </span>
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)" }}>
                        {head.batch}
                      </span>
                    </div>

                    <h4 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)" }}>
                      {head.name}
                    </h4>

                    <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", display: "block", marginTop: "2px" }}>
                      {head.role}
                    </span>

                    <p style={{ fontSize: "13.5px", color: "var(--ink-body)", marginTop: "8px", lineHeight: 1.5 }}>
                      {head.focus}
                    </p>

                    <div style={{ display: "flex", gap: "12px", marginTop: "14px" }}>
                      <a
                        href={head.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${head.name} LinkedIn`}
                        style={{ color: "var(--navy-hero)", display: "inline-flex", alignItems: "center" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6Z" />
                        </svg>
                      </a>
                      <a
                        href={`mailto:${head.email}`}
                        aria-label={`Email ${head.name}`}
                        style={{ color: "var(--navy-hero)", display: "inline-flex", alignItems: "center" }}
                      >
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tier 3: Core Team Presentation (Inspired by IIT Roorkee Finance Club) */}
          <div style={{ marginBottom: "50px" }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", paddingBottom: "12px", borderBottom: "1px solid var(--white-border)", marginBottom: "32px", flexWrap: "wrap", gap: "10px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--navy-hero)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
                FINLOGUE CORE TEAM · BATCH Y25
              </span>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)" }}>
                EQUITY RESEARCH · CONSULTING · OPERATIONS
              </span>
            </div>

            {/* IIT Roorkee Finance Club Style Circular Core Team Grid */}
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(165px, 1fr))",
                gap: "24px 18px",
                justifyContent: "center",
              }}
            >
              {about.leadership.coreTeam?.map((member) => (
                <div
                  key={member.name}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    textAlign: "center",
                  }}
                >
                  {/* Circular Portrait (IIT Roorkee Reference) */}
                  <div
                    style={{
                      width: "96px",
                      height: "96px",
                      borderRadius: "50%",
                      border: "3px solid #FFFFFF",
                      boxShadow: "0 6px 16px rgba(7, 13, 30, 0.16)",
                      position: "relative",
                      overflow: "hidden",
                      backgroundColor: "var(--navy-hero)",
                      marginBottom: "-18px",
                      zIndex: 2,
                    }}
                  >
                    <Image
                      src={member.image ?? "/assets/team/aditya-tiwari.jpg"}
                      alt={member.name}
                      fill
                      sizes="96px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  {/* Attached Rounded Pill Card (IIT Roorkee Reference) */}
                  <div
                    style={{
                      width: "100%",
                      maxWidth: "180px",
                      backgroundColor: "#F1F5F9",
                      border: "1px solid #CBD5E1",
                      borderRadius: "16px",
                      padding: "24px 10px 14px",
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      boxShadow: "0 2px 8px rgba(7, 13, 30, 0.05)",
                      transition: "transform 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease",
                    }}
                  >
                    {/* Member Name */}
                    <h5
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "14px",
                        fontWeight: 700,
                        color: "var(--navy-hero)",
                        lineHeight: 1.2,
                        margin: 0,
                      }}
                    >
                      {member.name}
                    </h5>

                    {/* Department / Role */}
                    <span
                      style={{
                        fontSize: "11px",
                        color: "var(--burgundy-crest)",
                        fontWeight: 600,
                        marginTop: "4px",
                        display: "block",
                        lineHeight: 1.25,
                      }}
                    >
                      {member.dept}
                    </span>

                    <span
                      className="font-metadata-mono"
                      style={{
                        fontSize: "10px",
                        color: "var(--ink-muted)",
                        marginTop: "2px",
                      }}
                    >
                      {member.role} · {member.batch}
                    </span>

                    {/* LinkedIn & Mail Icons (Side-by-Side as in IIT Roorkee layout) */}
                    <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "10px" }}>
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${member.name} LinkedIn`}
                        title="LinkedIn"
                        style={{
                          color: "var(--navy-hero)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "color 0.15s ease, transform 0.15s ease",
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6Z" />
                        </svg>
                      </a>
                      <a
                        href={`mailto:${member.email}`}
                        aria-label={`Email ${member.name}`}
                        title="Official Email"
                        style={{
                          color: "var(--navy-hero)",
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          transition: "color 0.15s ease, transform 0.15s ease",
                        }}
                      >
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect width="20" height="16" x="2" y="4" rx="2" />
                          <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Core Team Note */}
          <div style={{ padding: "20px", backgroundColor: "var(--white-platinum)", border: "1px solid var(--white-border)", textAlign: "center" }}>
            <p className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
              {about.leadership.coreTeamText}
            </p>
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
