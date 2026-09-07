"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  const [emailInput, setEmailInput] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailInput.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmailInput("");
        setSubscribed(false);
      }, 4000);
    }
  };

  return (
    <footer
      style={{
        backgroundColor: "#070D1E",
        borderTop: "1px solid rgba(197, 168, 128, 0.25)",
        color: "#FFFFFF",
        padding: "70px 0 30px",
        position: "relative",
      }}
    >
      <div className="container">
        {/* Top Main Grid: Multi-Column Organization matching e-cell layout */}
        <div className="footer-grid-layout">
          {/* Column 1: Brand Info & Newsletter Subscription */}
          <div className="footer-col-brand">
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "16px" }}>
              <Image
                src="/logo.png"
                alt="Finlogue Crest"
                width={40}
                height={40}
                style={{ height: "40px", width: "auto", objectFit: "contain" }}
              />
              <div>
                <h3 className="font-display-serif" style={{ fontSize: "22px", color: "#FFFFFF", lineHeight: 1 }}>
                  FINLOGUE
                </h3>
                <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--gold-oxford)", letterSpacing: "0.1em" }}>
                  FINANCE CELL · LNMIIT
                </span>
              </div>
            </div>

            <p style={{ fontSize: "13.5px", color: "var(--platinum-muted)", lineHeight: 1.6, marginBottom: "20px" }}>
              Forging future venture builders, equity research analysts, and strategy consultants through relentless analytical diligence.
            </p>

            {/* Newsletter Subscription Box (e-cell inspiration) */}
            <div style={{ marginBottom: "24px" }}>
              <span
                style={{
                  fontSize: "12px",
                  fontWeight: 600,
                  color: "#FFFFFF",
                  display: "block",
                  marginBottom: "8px",
                }}
              >
                Subscribe to Our Financial Briefs
              </span>
              <form onSubmit={handleSubscribe} style={{ position: "relative", maxWidth: "280px" }}>
                <input
                  type="email"
                  value={emailInput}
                  onChange={(e) => setEmailInput(e.target.value)}
                  placeholder="Enter your email"
                  required
                  style={{
                    width: "100%",
                    padding: "10px 42px 10px 14px",
                    borderRadius: "100px",
                    border: "1px solid rgba(197, 168, 128, 0.4)",
                    backgroundColor: "rgba(255, 255, 255, 0.05)",
                    color: "#FFFFFF",
                    fontSize: "12.5px",
                    outline: "none",
                  }}
                />
                <button
                  type="submit"
                  aria-label="Subscribe"
                  style={{
                    position: "absolute",
                    right: "4px",
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "var(--gold-oxford)",
                    border: "none",
                    color: "#070D1E",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                    <line x1="5" y1="12" x2="19" y2="12" />
                    <polyline points="12 5 19 12 12 19" />
                  </svg>
                </button>
              </form>
              {subscribed && (
                <span style={{ fontSize: "11px", color: "var(--gold-oxford)", marginTop: "6px", display: "block" }}>
                  ✓ You are subscribed to Finlogue briefs.
                </span>
              )}
            </div>

            {/* Social Network Links */}
            <div>
              <span
                style={{
                  fontSize: "11px",
                  color: "var(--platinum-muted)",
                  display: "block",
                  marginBottom: "10px",
                  letterSpacing: "0.04em",
                }}
              >
                Get connected with us on social networks:
              </span>
              <div style={{ display: "flex", gap: "10px" }}>
                <a
                  href="https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Finlogue LinkedIn"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "1px solid rgba(197, 168, 128, 0.35)",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    color: "var(--gold-oxford)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s, color 0.2s",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6Z" />
                  </svg>
                </a>
                <a
                  href="https://www.instagram.com/finlogue.lnmiit/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Finlogue Instagram"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "1px solid rgba(197, 168, 128, 0.35)",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    color: "var(--gold-oxford)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s, color 0.2s",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                  </svg>
                </a>
                <a
                  href="mailto:24uec533@lnmiit.ac.in"
                  aria-label="Email Finlogue"
                  style={{
                    width: "34px",
                    height: "34px",
                    borderRadius: "50%",
                    border: "1px solid rgba(197, 168, 128, 0.35)",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    color: "var(--gold-oxford)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    transition: "background-color 0.2s, color 0.2s",
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22,6 12,13 2,6" />
                  </svg>
                </a>
              </div>
            </div>
          </div>

          {/* Column 2: Our Initiatives */}
          <div>
            <h4
              className="font-metadata-mono"
              style={{
                fontSize: "12px",
                color: "var(--gold-oxford)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "18px",
                fontWeight: 700,
              }}
            >
              OUR INITIATIVES
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/events#potr" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Pitch on the Rocks (POTR)
                </Link>
              </li>
              <li>
                <Link href="/events#case-crackers" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  National Case Crackers
                </Link>
              </li>
              <li>
                <Link href="/events#valuation-lab" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Valuation & Equity Research Lab
                </Link>
              </li>
              <li>
                <Link href="/events#market-watch" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Market Watch Series
                </Link>
              </li>
              <li>
                <Link href="/events#ma-simulation" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  M&A Boardroom Simulation
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Specialized Pillars */}
          <div>
            <h4
              className="font-metadata-mono"
              style={{
                fontSize: "12px",
                color: "var(--gold-oxford)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "18px",
                fontWeight: 700,
              }}
            >
              CELL DIVISIONS
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/about#finance" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Finance & Capital Markets
                </Link>
              </li>
              <li>
                <Link href="/about#consulting" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Strategy & Consulting
                </Link>
              </li>
              <li>
                <Link href="/about#competition" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Competitive Arenas
                </Link>
              </li>
              <li>
                <Link href="/about#finance" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Equity Valuation Practical
                </Link>
              </li>
              <li>
                <Link href="/about#community" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Corporate Diligence Desk
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 4: Useful Links */}
          <div>
            <h4
              className="font-metadata-mono"
              style={{
                fontSize: "12px",
                color: "var(--gold-oxford)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "18px",
                fontWeight: 700,
              }}
            >
              USEFUL LINKS
            </h4>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: "10px" }}>
              <li>
                <Link href="/" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Home Portal
                </Link>
              </li>
              <li>
                <Link href="/about" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  About Finlogue
                </Link>
              </li>
              <li>
                <Link href="/events" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Events & Conclaves
                </Link>
              </li>
              <li>
                <Link href="/gallery" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Media & Archival Vault
                </Link>
              </li>
              <li>
                <Link href="/about#leadership" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Leadership Hierarchy
                </Link>
              </li>
              <li>
                <Link href="/contact" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--platinum-muted)", transition: "color 0.15s" }}>
                  Contact Secretariat
                </Link>
              </li>
              <li>
                <Link href="/admin" target="_blank" rel="noopener noreferrer" style={{ fontSize: "13.5px", color: "var(--gold-oxford)", transition: "color 0.15s" }}>
                  Coordinator Desk ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 5: Contact & Office */}
          <div>
            <h4
              className="font-metadata-mono"
              style={{
                fontSize: "12px",
                color: "var(--gold-oxford)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                marginBottom: "18px",
                fontWeight: 700,
              }}
            >
              SECRETARIAT & OFFICE
            </h4>
            <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "flex", gap: "10px", alignItems: "flex-start" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-oxford)" strokeWidth="2" style={{ flexShrink: 0, marginTop: "2px" }}>
                  <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <p style={{ fontSize: "13px", color: "var(--platinum-muted)", lineHeight: 1.5, margin: 0 }}>
                  Students Activity Center (SAC),<br />
                  The LNM Institute of Information Technology,<br />
                  Jaipur, Rajasthan 302031
                </p>
              </div>

              <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="var(--gold-oxford)" strokeWidth="2" style={{ flexShrink: 0 }}>
                  <rect width="20" height="16" x="2" y="4" rx="2" />
                  <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                </svg>
                <a
                  href="mailto:24uec533@lnmiit.ac.in"
                  style={{ fontSize: "13px", color: "var(--platinum-muted)", transition: "color 0.15s" }}
                >
                  24uec533@lnmiit.ac.in
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Legal & Accreditation Bar */}
        <div
          style={{
            paddingTop: "24px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: "12px",
            fontSize: "11px",
            color: "rgba(226, 232, 240, 0.45)",
          }}
        >
          <span className="font-metadata-mono" style={{ textTransform: "uppercase" }}>
            FINLOGUE CELL © 2026 · THE LNM INSTITUTE OF INFORMATION TECHNOLOGY · ALL RIGHTS RESERVED
          </span>
          <span className="font-metadata-mono" style={{ textTransform: "uppercase", color: "var(--gold-oxford)" }}>
            STUDENT RUN · INSTITUTIONALLY GOVERNED
          </span>
        </div>
      </div>
    </footer>
  );
}
