"use client";

import React from "react";
import Link from "next/link";
import PIRegistrationForm from "@/components/PIRegistrationForm";

export default function RegisterPIPage() {
  return (
    <main
      style={{
        flex: 1,
        width: "100%",
        minHeight: "100vh",
        backgroundColor: "var(--navy-deep)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "clamp(36px, 5vw, 64px) 16px 80px",
        position: "relative",
      }}
    >
      {/* Background Architectural Grid */}
      <div className="hero-architectural-grid" style={{ opacity: 0.15 }} />

      <div
        style={{
          width: "100%",
          maxWidth: "680px",
          position: "relative",
          zIndex: 10,
        }}
      >
        {/* Back Link */}
        <div style={{ marginBottom: "24px" }}>
          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "8px",
              color: "var(--gold-oxford)",
              fontFamily: "var(--font-mono)",
              fontSize: "12px",
              textDecoration: "none",
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            <span>←</span>
            <span>Return to Finlogue Home</span>
          </Link>
        </div>

        {/* Card Container */}
        <div
          style={{
            backgroundColor: "#FFFFFF",
            borderRadius: "20px",
            border: "1.5px solid rgba(197, 168, 128, 0.4)",
            boxShadow: "0 20px 50px rgba(0, 0, 0, 0.4)",
            padding: "clamp(24px, 4.5vw, 40px) clamp(18px, 4vw, 36px)",
          }}
        >
          {/* Header Title & Badge */}
          <div style={{ marginBottom: "24px" }}>
            <div
              className="badge-pill"
              style={{
                display: "inline-flex",
                marginBottom: "12px",
                backgroundColor: "rgba(7, 13, 30, 0.06)",
                borderColor: "rgba(7, 13, 30, 0.15)",
                color: "var(--navy-hero)",
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
              <span style={{ fontSize: "11px", fontWeight: 600 }}>RECRUITMENTS OPEN · Y26 BATCH</span>
            </div>

            <h1
              className="font-display-serif"
              style={{
                fontSize: "clamp(26px, 4vw, 34px)",
                color: "var(--navy-hero)",
                lineHeight: 1.15,
                margin: 0,
                fontWeight: 700,
              }}
            >
              PI Registration
            </h1>

            <p
              style={{
                fontSize: "14px",
                color: "#475569",
                lineHeight: 1.6,
                marginTop: "10px",
                marginBottom: 0,
              }}
            >
              Apply to join the student-run Finance and Corporate Strategy body of LNMIIT.
            </p>
          </div>

          {/* Clean Reusable Form Component */}
          <PIRegistrationForm />
        </div>
      </div>
    </main>
  );
}
