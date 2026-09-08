"use client";

import React, { useState } from "react";
import Link from "next/link";
import { about } from "@/content/about";
import LeadershipSection from "@/components/LeadershipSection";
import PIRegistrationModal from "@/components/PIRegistrationModal";

export default function TeamPage() {
  const [piModalOpen, setPiModalOpen] = useState(false);

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
            <span>INSTITUTIONAL GOVERNANCE & PERSONNEL</span>
          </div>

          <h1 className="hero-title" style={{ textAlign: "left", margin: 0 }}>
            The People Behind The House
          </h1>

          <p className="hero-subline" style={{ textAlign: "left", margin: "24px 0 0", maxWidth: "820px" }}>
            An institutional hierarchy governed by discipline, strategic rigor, and student leadership across LNMIIT. Meet the coordinators, department heads, and core associates driving our financial research, strategy advisory, and flagship conclaves.
          </p>

          <div
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
              COUNCIL · HEADS · CORE ASSOCIATES (Y24 & Y25)
            </div>

            {/* Quick jump to recruitment modal */}
            <button
              type="button"
              onClick={() => setPiModalOpen(true)}
              className="pi-recruitment-btn"
              style={{ fontSize: "12px", padding: "7px 16px" }}
            >
              <span className="pi-pulse-dot" />
              <span>Recruiting Batch Y-26 · Register for PI</span>
            </button>
          </div>
        </div>
      </section>

      {/* 2. Main Leadership Section Component */}
      <LeadershipSection
        initialCoordinators={about.leadership.coordinators}
        initialHeads={about.leadership.heads}
        initialCoreTeam={about.leadership.coreTeam}
        subtitle="Governed by student leadership with uncompromising institutional standards across capital markets and corporate strategy."
        coreTeamText={about.leadership.coreTeamText}
      />

      {/* 3. Dedicated Y-26 Recruitment Callout Banner */}
      <section className="section-navy-dark" style={{ padding: "80px 0" }}>
        <div className="container">
          <div
            style={{
              padding: "48px 40px",
              backgroundColor: "var(--navy-card)",
              border: "1px solid rgba(197, 168, 128, 0.4)",
              boxShadow: "0 20px 48px rgba(7, 13, 30, 0.6)",
              borderRadius: "12px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "32px",
            }}
          >
            <div style={{ maxWidth: "620px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 10px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(16, 185, 129, 0.12)",
                  border: "1px solid rgba(16, 185, 129, 0.3)",
                  marginBottom: "14px",
                }}
              >
                <span
                  style={{
                    width: "7px",
                    height: "7px",
                    borderRadius: "50%",
                    backgroundColor: "#10B981",
                    display: "inline-block",
                    boxShadow: "0 0 8px #10B981",
                  }}
                />
                <span
                  className="font-metadata-mono"
                  style={{ fontSize: "10.5px", color: "#6EE7B7", letterSpacing: "0.12em" }}
                >
                  NEW STUDENT INDUCTIONS · BATCH Y-26
                </span>
              </div>

              <h3 className="font-display-serif" style={{ fontSize: "32px", color: "#FFFFFF", lineHeight: 1.2 }}>
                Want to become a part of Finlogue?
              </h3>
              <p style={{ fontSize: "15px", color: "var(--platinum-muted)", marginTop: "10px", lineHeight: 1.6 }}>
                Recruitment for the upcoming Y-26 batch is now underway. If you are passionate about capital markets, management consulting, venture strategy, or creative operations, register for your Personal Interview (PI) now.
              </p>
            </div>

            <div style={{ display: "flex", gap: "16px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={() => setPiModalOpen(true)}
                className="stamp-button stamp-button-primary"
                style={{ padding: "14px 28px" }}
              >
                <span>REGISTER FOR PI (Y-26)</span>
              </button>
              <Link
                href="/contact"
                className="secondary-button"
                style={{ padding: "14px 24px" }}
              >
                <span>CONTACT SECRETARIAT</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Y-26 Personal Interview (PI) Registration Modal */}
      <PIRegistrationModal
        isOpen={piModalOpen}
        onClose={() => setPiModalOpen(false)}
      />
    </main>
  );
}
