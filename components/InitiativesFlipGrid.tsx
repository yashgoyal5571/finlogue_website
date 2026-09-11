"use client";

import React, { useState } from "react";
import { CaseFile } from "@/content/events";

interface InitiativesFlipGridProps {
  items: CaseFile[];
  onRegisterClick?: (eventTitle: string) => void;
}

// Bespoke SVG Emblems for each initiative
function getInitiativeEmblem(id?: string, category?: string) {
  if (id === "potr" || category?.toLowerCase().includes("venture")) {
    // Flagship Pitch on the Rocks — Lion / Torch / Conclave Crown
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gold-oxford)" }}>
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        <circle cx="12" cy="12" r="3" fill="rgba(197, 168, 128, 0.25)" />
      </svg>
    );
  }
  if (id === "case-crackers" || category?.toLowerCase().includes("consulting")) {
    // National Case Crackers — Chess Knight / Strategy Framework
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gold-oxford)" }}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
        <path d="M12 11v6" />
        <path d="M9 14h6" />
      </svg>
    );
  }
  if (id === "valuation-lab" || category?.toLowerCase().includes("finance")) {
    // Valuation & Equity Research Lab — Candlestick / Quantitative Chart
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gold-oxford)" }}>
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
        <circle cx="12" cy="4" r="2" fill="var(--gold-oxford)" />
        <circle cx="18" cy="10" r="2" fill="var(--gold-oxford)" />
        <circle cx="6" cy="14" r="2" fill="var(--gold-oxford)" />
      </svg>
    );
  }
  if (id === "market-watch") {
    // Market Watch — Macro Globe / Capital Markets
    return (
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gold-oxford)" }}>
        <circle cx="12" cy="12" r="10" />
        <line x1="2" y1="12" x2="22" y2="12" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
      </svg>
    );
  }
  // Default M&A / Corporate Strategy
  return (
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ color: "var(--gold-oxford)" }}>
      <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
      <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
    </svg>
  );
}

export default function InitiativesFlipGrid({ items, onRegisterClick }: InitiativesFlipGridProps) {
  const [flippedCards, setFlippedCards] = useState<Record<string, boolean>>({});
  const [selectedDossier, setSelectedDossier] = useState<CaseFile | null>(null);
  const [activeDossierTab, setActiveDossierTab] = useState<"overview" | "rounds" | "prizes" | "rules">("overview");
  const [copiedLink, setCopiedLink] = useState(false);

  const toggleFlip = (id: string, e: React.MouseEvent) => {
    // Only toggle if not clicking a button inside
    const target = e.target as HTMLElement;
    if (target.closest("button") || target.closest("a")) return;
    setFlippedCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const handleOpenDossier = (item: CaseFile, e: React.MouseEvent) => {
    e.stopPropagation();
    setSelectedDossier(item);
    setActiveDossierTab("overview");
  };

  const handleShare = (id?: string) => {
    if (typeof window === "undefined" || !id) return;
    const url = `${window.location.origin}/events#${id}`;
    navigator.clipboard.writeText(url);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  return (
    <>
      {/* 3D Flip Cards Grid */}
      <div
        className="initiatives-flip-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 300px), 1fr))",
          gap: "28px",
          width: "100%",
        }}
      >
        {items.map((item, idx) => {
          const cardId = item.id || item.fileNumber || `card-${idx}`;
          const isFlipped = !!flippedCards[cardId];
          const isClosed = item.status === "CLOSED";
          const isActive = item.status === "ACTIVE";

          return (
            <div
              key={cardId}
              id={item.id}
              className={`ecell-card-container ${isFlipped ? "is-flipped" : ""}`}
              onClick={(e) => toggleFlip(cardId, e)}
            >
              <div className="ecell-card-inner">
                {/* 1. CARD FRONT (Emblem, Title, Category Badge, Hint) */}
                <div className="ecell-card-face ecell-card-face-front">
                  {/* Concentric Double Border Frame */}
                  <div className="ecell-card-frame" />

                  <div className="ecell-card-body">
                    {/* Top Status Strip */}
                    <div style={{ width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--gold-oxford)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                        {item.category}
                      </span>
                      <span
                        className={`status-badge ${
                          isClosed ? "status-badge-closed" : isActive ? "status-badge-active" : "status-badge-upcoming"
                        }`}
                        style={{ fontSize: "10px" }}
                      >
                        {isClosed ? "ARCHIVED" : isActive ? "LIVE" : "UPCOMING"}
                      </span>
                    </div>

                    {/* Center Emblem & Branding */}
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "16px", padding: "10px 0" }}>
                      <div
                        style={{
                          width: "88px",
                          height: "88px",
                          borderRadius: "50%",
                          background: "radial-gradient(circle, rgba(197, 168, 128, 0.16) 0%, rgba(7, 14, 32, 0.8) 100%)",
                          border: "1.5px solid rgba(197, 168, 128, 0.45)",
                          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.5), inset 0 0 16px rgba(197, 168, 128, 0.15)",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                        }}
                      >
                        {getInitiativeEmblem(item.id, item.category)}
                      </div>

                      <h3
                        className="font-display-serif"
                        style={{
                          fontSize: "24px",
                          color: "var(--gold-oxford)",
                          lineHeight: 1.25,
                          maxWidth: "260px",
                          textShadow: "0 2px 8px rgba(0,0,0,0.6)",
                          margin: 0,
                        }}
                      >
                        {item.title}
                      </h3>
                    </div>

                    {/* Bottom Tagline */}
                    <div style={{ width: "100%", textAlign: "center", borderTop: "1px solid rgba(197, 168, 128, 0.2)", paddingTop: "14px" }}>
                      <p
                        className="font-metadata-mono"
                        style={{
                          fontSize: "11.5px",
                          color: "#FFFFFF",
                          margin: 0,
                          letterSpacing: "0.06em",
                        }}
                      >
                        🏆 {item.prizeOrOutput}
                      </p>
                    </div>
                  </div>
                </div>

                {/* 2. CARD BACK (Overview, Key Specs, "Know More ➔" Pill Button) */}
                <div className="ecell-card-face ecell-card-face-back">
                  {/* Concentric Double Border Frame */}
                  <div className="ecell-card-frame" />

                  <div className="ecell-card-body">
                    {/* Top Title & Batch Header */}
                    <div style={{ width: "100%", textAlign: "left", borderBottom: "1px solid rgba(197, 168, 128, 0.2)", paddingBottom: "10px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                        <h4 className="font-display-serif" style={{ fontSize: "19px", color: "var(--gold-oxford)", margin: 0 }}>
                          {item.title}
                        </h4>
                        <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--platinum-muted)" }}>
                          {item.date}
                        </span>
                      </div>
                    </div>

                    {/* Middle Overview Paragraph (Matching screenshot description box) */}
                    <div style={{ padding: "10px 4px", textAlign: "left", flex: 1, display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <p
                        style={{
                          fontSize: "13.5px",
                          color: "var(--platinum-muted)",
                          lineHeight: 1.6,
                          margin: 0,
                          display: "-webkit-box",
                          WebkitLineClamp: 5,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {item.description}
                      </p>

                      <div style={{ marginTop: "14px", display: "flex", flexDirection: "column", gap: "6px" }}>
                        <div style={{ fontSize: "12px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "var(--gold-oxford)" }}>• Honors:</span>
                          <span style={{ color: "var(--emerald)" }}>{item.prizeOrOutput}</span>
                        </div>
                        <div style={{ fontSize: "12px", color: "#FFFFFF", display: "flex", alignItems: "center", gap: "6px" }}>
                          <span style={{ color: "var(--gold-oxford)" }}>• Format:</span>
                          <span style={{ color: "var(--platinum-muted)" }}>{item.eligibility}</span>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Action Area: "Know More ➔" Pill Button (Matching E-Cell Screenshot) */}
                    <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: "10px", alignItems: "center", borderTop: "1px solid rgba(197, 168, 128, 0.2)", paddingTop: "14px" }}>
                      <button
                        type="button"
                        onClick={(e) => handleOpenDossier(item, e)}
                        className="ecell-know-more-btn"
                        style={{ width: "100%", maxWidth: "220px" }}
                      >
                        <span>Know More</span>
                        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round">
                          <circle cx="12" cy="12" r="10" />
                          <polyline points="12 16 16 12 12 8" />
                          <line x1="8" y1="12" x2="16" y2="12" />
                        </svg>
                      </button>

                      {!isClosed && onRegisterClick && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            onRegisterClick(item.title);
                          }}
                          className="font-metadata-mono"
                          style={{
                            background: "transparent",
                            border: "none",
                            color: "var(--gold-oxford)",
                            fontSize: "11px",
                            cursor: "pointer",
                            textDecoration: "underline",
                            letterSpacing: "0.06em",
                            padding: "4px",
                          }}
                        >
                          Quick Register →
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* 3. IMPRESSIVE DOSSIER TAB MODAL */}
      {selectedDossier && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="dossier-modal-title"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            backgroundColor: "rgba(3, 7, 18, 0.85)",
            backdropFilter: "blur(14px)",
            WebkitBackdropFilter: "blur(14px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px",
            animation: "fadeIn 0.25s ease",
          }}
          onClick={() => setSelectedDossier(null)}
        >
          <div
            style={{
              backgroundColor: "var(--navy-surface)",
              border: "1.5px solid var(--gold-oxford)",
              borderRadius: "24px",
              boxShadow: "0 25px 60px -12px rgba(0, 0, 0, 0.85), 0 0 40px rgba(197, 168, 128, 0.2)",
              width: "100%",
              maxWidth: "880px",
              maxHeight: "90vh",
              overflowY: "auto",
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Banner */}
            <div
              style={{
                padding: "32px 36px 24px",
                borderBottom: "1px solid rgba(197, 168, 128, 0.25)",
                background: "linear-gradient(180deg, #102144 0%, #0A142A 100%)",
                position: "relative",
              }}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedDossier(null)}
                aria-label="Close dossier"
                style={{
                  position: "absolute",
                  top: "24px",
                  right: "24px",
                  width: "38px",
                  height: "38px",
                  borderRadius: "50%",
                  border: "1px solid rgba(197, 168, 128, 0.4)",
                  backgroundColor: "rgba(7, 13, 30, 0.6)",
                  color: "var(--gold-oxford)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--gold-oxford)";
                  e.currentTarget.style.color = "#070D1E";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(7, 13, 30, 0.6)";
                  e.currentTarget.style.color = "var(--gold-oxford)";
                }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>

              <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "10px" }}>
                <span className="status-badge status-badge-active">
                  {selectedDossier.status === "CLOSED" ? "ARCHIVED CASE" : "ACTIVE INITIATIVE"}
                </span>
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", textTransform: "uppercase" }}>
                  {selectedDossier.category}
                </span>
              </div>

              <h2 id="dossier-modal-title" className="font-display-serif" style={{ fontSize: "clamp(26px, 3.5vw, 36px)", color: "#FFFFFF", margin: "0 0 8px" }}>
                {selectedDossier.title}
              </h2>

              <p className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--platinum-muted)", margin: 0, letterSpacing: "0.08em" }}>
                TIMELINE: {selectedDossier.date} · ELIGIBILITY: {selectedDossier.eligibility}
              </p>

              {/* Modal Navigation Tabs Bar */}
              <div
                style={{
                  display: "flex",
                  gap: "10px",
                  marginTop: "24px",
                  borderTop: "1px solid rgba(226, 232, 240, 0.1)",
                  paddingTop: "16px",
                  overflowX: "auto",
                }}
              >
                <button
                  type="button"
                  className={`dossier-tab-btn ${activeDossierTab === "overview" ? "active" : ""}`}
                  onClick={() => setActiveDossierTab("overview")}
                >
                  Overview & Charter
                </button>
                <button
                  type="button"
                  className={`dossier-tab-btn ${activeDossierTab === "rounds" ? "active" : ""}`}
                  onClick={() => setActiveDossierTab("rounds")}
                >
                  Rounds & Roadmap
                </button>
                <button
                  type="button"
                  className={`dossier-tab-btn ${activeDossierTab === "prizes" ? "active" : ""}`}
                  onClick={() => setActiveDossierTab("prizes")}
                >
                  Honors & Perks
                </button>
                <button
                  type="button"
                  className={`dossier-tab-btn ${activeDossierTab === "rules" ? "active" : ""}`}
                  onClick={() => setActiveDossierTab("rules")}
                >
                  Rules & Guidelines
                </button>
              </div>
            </div>

            {/* Modal Body Content Based on Active Tab */}
            <div style={{ padding: "32px 36px", flex: 1, backgroundColor: "var(--navy-card)" }}>
              {activeDossierTab === "overview" && (
                <div>
                  <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--gold-oxford)", marginBottom: "14px" }}>
                    Executive Problem Statement & Charter
                  </h3>
                  <p style={{ fontSize: "15px", color: "#E2E8F0", lineHeight: 1.75, marginBottom: "20px" }}>
                    {selectedDossier.description}
                  </p>

                  <div
                    style={{
                      display: "grid",
                      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                      gap: "16px",
                      marginTop: "24px",
                      padding: "20px",
                      backgroundColor: "rgba(7, 13, 30, 0.5)",
                      border: "1px solid rgba(197, 168, 128, 0.2)",
                      borderRadius: "12px",
                    }}
                  >
                    <div>
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)" }}>
                        PRIMARY DISCIPLINE
                      </span>
                      <p style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600, margin: "4px 0 0" }}>
                        {selectedDossier.category}
                      </p>
                    </div>

                    <div>
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)" }}>
                        PURSE / INCENTIVE
                      </span>
                      <p style={{ color: "var(--emerald)", fontSize: "14px", fontWeight: 600, margin: "4px 0 0" }}>
                        {selectedDossier.prizeOrOutput}
                      </p>
                    </div>

                    <div>
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)" }}>
                        DELIBERATION FORMAT
                      </span>
                      <p style={{ color: "#FFFFFF", fontSize: "14px", fontWeight: 600, margin: "4px 0 0" }}>
                        Multi-Stage Boardroom Review
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDossierTab === "rounds" && (
                <div>
                  <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--gold-oxford)", marginBottom: "16px" }}>
                    Competition Progression & Rounds
                  </h3>

                  <div style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
                    {/* Round 1 */}
                    <div
                      style={{
                        padding: "18px",
                        backgroundColor: "rgba(12, 23, 46, 0.7)",
                        border: "1px solid rgba(197, 168, 128, 0.25)",
                        borderRadius: "12px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--gold-oxford)", fontWeight: 700 }}>
                          STAGE 01 · EXECUTIVE ABSTRACT & SCREENING
                        </span>
                        <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--platinum-muted)" }}>
                          ELIMINATORY
                        </span>
                      </div>
                      <p style={{ fontSize: "13.5px", color: "var(--platinum-muted)", lineHeight: 1.6, margin: 0 }}>
                        Participants submit an initial 3-page problem memorandum or pitch abstract assessing key market dynamics, competitive advantages, and core hypothesis.
                      </p>
                    </div>

                    {/* Round 2 */}
                    <div
                      style={{
                        padding: "18px",
                        backgroundColor: "rgba(12, 23, 46, 0.7)",
                        border: "1px solid rgba(197, 168, 128, 0.25)",
                        borderRadius: "12px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--gold-oxford)", fontWeight: 700 }}>
                          STAGE 02 · DETAILED MODELING & DECK DEFENSE
                        </span>
                        <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)" }}>
                          SEMI-FINALS
                        </span>
                      </div>
                      <p style={{ fontSize: "13.5px", color: "var(--platinum-muted)", lineHeight: 1.6, margin: 0 }}>
                        Shortlisted cohorts submit full quantitative model sheets (DCF/LBO/Unit Economics) paired with a 10-slide executive presentation deck.
                      </p>
                    </div>

                    {/* Round 3 */}
                    <div
                      style={{
                        padding: "18px",
                        backgroundColor: "rgba(12, 23, 46, 0.7)",
                        border: "1px solid var(--emerald)",
                        borderRadius: "12px",
                      }}
                    >
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                        <span className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--emerald)", fontWeight: 700 }}>
                          STAGE 03 · GRAND FINALS & LIVE JURY DELIBERATION
                        </span>
                        <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--emerald)" }}>
                          CONCLAVE ARENA
                        </span>
                      </div>
                      <p style={{ fontSize: "13.5px", color: "var(--platinum-muted)", lineHeight: 1.6, margin: 0 }}>
                        Finalists present live before a panel of venture partners, institutional equity analysts, and corporate leaders with 10-minute rapid-fire Q&A cross-examination.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDossierTab === "prizes" && (
                <div>
                  <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--gold-oxford)", marginBottom: "16px" }}>
                    Honors, Citations & Ecosystem Perks
                  </h3>

                  <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                    <div style={{ padding: "20px", backgroundColor: "rgba(7, 13, 30, 0.6)", border: "1px solid var(--gold-oxford)", borderRadius: "12px" }}>
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)" }}>1ST PLACE WINNERS</span>
                      <h4 style={{ fontSize: "22px", color: "#FFFFFF", margin: "8px 0" }}>{selectedDossier.prizeOrOutput}</h4>
                      <p style={{ fontSize: "12.5px", color: "var(--platinum-muted)", lineHeight: 1.5, margin: 0 }}>
                        Grand trophy, official institutional citation, and direct 1-on-1 mentorship with investor leads.
                      </p>
                    </div>

                    <div style={{ padding: "20px", backgroundColor: "rgba(7, 13, 30, 0.6)", border: "1px solid rgba(197, 168, 128, 0.3)", borderRadius: "12px" }}>
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--platinum-muted)" }}>RUNNERS UP</span>
                      <h4 style={{ fontSize: "22px", color: "#FFFFFF", margin: "8px 0" }}>Merit Citations</h4>
                      <p style={{ fontSize: "12.5px", color: "var(--platinum-muted)", lineHeight: 1.5, margin: 0 }}>
                        Official Finlogue Honors certificate, fast-track interview consideration for core analyst positions.
                      </p>
                    </div>

                    <div style={{ padding: "20px", backgroundColor: "rgba(7, 13, 30, 0.6)", border: "1px solid rgba(197, 168, 128, 0.3)", borderRadius: "12px" }}>
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--platinum-muted)" }}>ALL FINALISTS</span>
                      <h4 style={{ fontSize: "22px", color: "#FFFFFF", margin: "8px 0" }}>Ecosystem Access</h4>
                      <p style={{ fontSize: "12.5px", color: "var(--platinum-muted)", lineHeight: 1.5, margin: 0 }}>
                        Networking dinner invitation with keynote venture partners and corporate leaders.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {activeDossierTab === "rules" && (
                <div>
                  <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--gold-oxford)", marginBottom: "16px" }}>
                    Participation Rules & Integrity Code
                  </h3>

                  <ul style={{ listStyle: "none", padding: 0, display: "flex", flexDirection: "column", gap: "12px" }}>
                    <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#E2E8F0", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--gold-oxford)", fontWeight: 700 }}>01.</span>
                      <span><strong>Team Composition:</strong> Open to undergraduate and postgraduate students. Cross-institutional and multi-disciplinary teams are permitted (2-4 members per team).</span>
                    </li>
                    <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#E2E8F0", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--gold-oxford)", fontWeight: 700 }}>02.</span>
                      <span><strong>Deliverable Format:</strong> All submissions must be original work in PDF format (for abstracts/decks) and unlocked XLSX (for financial models).</span>
                    </li>
                    <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#E2E8F0", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--gold-oxford)", fontWeight: 700 }}>03.</span>
                      <span><strong>Evaluation Criteria:</strong> Submissions are graded on market sizing rigor, financial defensibility, analytical clarity, and live oral cross-examination performance.</span>
                    </li>
                    <li style={{ display: "flex", gap: "10px", fontSize: "14px", color: "#E2E8F0", lineHeight: 1.6 }}>
                      <span style={{ color: "var(--gold-oxford)", fontWeight: 700 }}>04.</span>
                      <span><strong>Jury Verdict:</strong> The decisions of the investment panel and organizing committee are final and binding.</span>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* Bottom Action Bar */}
            <div
              style={{
                padding: "20px 36px",
                borderTop: "1px solid rgba(197, 168, 128, 0.25)",
                backgroundColor: "var(--navy-surface)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "14px",
              }}
            >
              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => handleShare(selectedDossier.id)}
                  className="font-metadata-mono"
                  style={{
                    backgroundColor: "transparent",
                    border: "1px solid rgba(197, 168, 128, 0.4)",
                    color: "var(--gold-oxford)",
                    padding: "8px 16px",
                    borderRadius: "6px",
                    fontSize: "11px",
                    cursor: "pointer",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "6px",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="5" r="3" />
                    <circle cx="6" cy="12" r="3" />
                    <circle cx="18" cy="19" r="3" />
                    <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                    <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
                  </svg>
                  <span>{copiedLink ? "Link Copied! ✓" : "Share Initiative"}</span>
                </button>
              </div>

              <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                <button
                  type="button"
                  onClick={() => setSelectedDossier(null)}
                  className="secondary-button"
                  style={{ padding: "10px 20px", fontSize: "13px" }}
                >
                  <span>Close Brief</span>
                </button>

                {selectedDossier.status !== "CLOSED" && onRegisterClick && (
                  <button
                    type="button"
                    onClick={() => {
                      const title = selectedDossier.title;
                      setSelectedDossier(null);
                      onRegisterClick(title);
                    }}
                    className="stamp-button stamp-button-primary"
                    style={{ padding: "10px 24px", fontSize: "13px" }}
                  >
                    <span>REGISTER FOR BRIEF →</span>
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
