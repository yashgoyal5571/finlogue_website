"use client";

import React, { useState } from "react";
import Link from "next/link";
import { about } from "@/content/about";
import LeadershipSection from "@/components/LeadershipSection";
export default function TeamPage() {

  return (
    <main style={{ flex: 1, width: "100%", overflow: "hidden" }}>
      {/* 1. Page Hero Header — Deep Executive Midnight Navy (#0A1329) */}
      <section className="page-hero-navy">
        <div className="hero-architectural-grid" />
        <div className="container" style={{ position: "relative", zIndex: 10 }}>
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
            <span>INSTITUTIONAL GOVERNANCE & PERSONNEL</span>
          </div>

          <h1 className="hero-title hero-anim-title" style={{ textAlign: "left", margin: 0 }}>
            The People Behind The House
          </h1>

          <p className="hero-subline hero-anim-sub" style={{ textAlign: "left", margin: "24px 0 0", maxWidth: "820px" }}>
            An institutional hierarchy governed by discipline, strategic rigor, and student leadership across LNMIIT. Meet the coordinators, department heads, and core associates driving our financial research, strategy advisory, and flagship conclaves.
          </p>

          <div
            className="hero-anim-actions"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "24px",
              marginTop: "28px",
              flexWrap: "wrap",
            }}
          >
            <div
              className="font-metadata-mono"
              style={{ fontSize: "11.5px", color: "var(--gold-oxford)", textTransform: "uppercase" }}
            >
              COUNCIL · HEADS · CORE ASSOCIATES
            </div>

            {/* Quick jump to recruitment page */}
            <Link
              href="/register-pi"
              className="pi-recruitment-btn shimmer-sweep"
              style={{ fontSize: "12px", padding: "7px 16px", textDecoration: "none" }}
            >
              <span className="pi-pulse-dot" />
              <span>Register for PI</span>
              <span className="btn-arrow">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 2. Main Leadership Section Component */}
      <LeadershipSection
        initialCoordinators={about.leadership.coordinators}
        initialHeads={about.leadership.heads}
        initialCoreTeam={about.leadership.coreTeam}
        subtitle="Governed by student leadership with uncompromising institutional standards across capital markets and corporate strategy."
      />

    </main>
  );
}
