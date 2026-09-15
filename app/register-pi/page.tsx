"use client";

import React, { useEffect } from "react";
import Link from "next/link";

const GOOGLE_FORM_URL = "https://forms.gle/sBAacjaqMbE8e3Bg9";

export default function RegisterPIPage() {
  useEffect(() => {
    // Redirect immediately to Google Form
    window.location.href = GOOGLE_FORM_URL;
  }, []);

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
        justifyContent: "center",
        padding: "clamp(36px, 5vw, 64px) 16px 80px",
        position: "relative",
      }}
    >
      {/* Background Architectural Grid */}
      <div className="hero-architectural-grid" style={{ opacity: 0.15 }} />

      <div
        style={{
          width: "100%",
          maxWidth: "580px",
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
            padding: "clamp(28px, 5vw, 44px) clamp(20px, 4vw, 36px)",
            textAlign: "center",
          }}
        >
          <div
            className="badge-pill"
            style={{
              display: "inline-flex",
              marginBottom: "16px",
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
              fontSize: "clamp(24px, 3.5vw, 32px)",
              color: "var(--navy-hero)",
              lineHeight: 1.2,
              margin: "0 0 12px",
              fontWeight: 700,
            }}
          >
            Redirecting to PI Registration
          </h1>

          <p
            style={{
              fontSize: "14.5px",
              color: "#475569",
              lineHeight: 1.6,
              marginBottom: "28px",
            }}
          >
            You are being redirected to the official Finlogue PI Registration Google Form. If you are not redirected automatically within a few seconds, click below.
          </p>

          <a
            href={GOOGLE_FORM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="stamp-button stamp-button-primary shimmer-sweep"
            style={{
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "10px",
              width: "100%",
              maxWidth: "360px",
              padding: "14px 24px",
              borderRadius: "100px",
              backgroundColor: "var(--navy-hero)",
              color: "#FFFFFF",
              fontSize: "14.5px",
              fontWeight: 600,
              textDecoration: "none",
              boxShadow: "0 6px 20px rgba(7, 13, 30, 0.25)",
            }}
          >
            <span>Open Google Form</span>
            <span className="btn-arrow" style={{ color: "var(--gold-oxford)" }}>→</span>
          </a>
        </div>
      </div>
    </main>
  );
}
