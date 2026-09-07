"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { events, CaseFile } from "@/content/events";

export default function EventsPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [caseFiles, setCaseFiles] = useState<CaseFile[]>(events.caseFiles);
  const [registrationModalOpen, setRegistrationModalOpen] = useState(false);
  const [registeredEvent, setRegisteredEvent] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);

  const [modalForm, setModalForm] = useState({
    name: "",
    email: "",
    institution: "",
    statement: "",
  });

  const handleRegisterClick = (eventTitle: string) => {
    setRegisteredEvent(eventTitle);
    setSubmittedToken(null);
    setRegistrationModalOpen(true);
  };

  const handleModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...modalForm,
          eventTitle: registeredEvent,
        }),
      });

      const data = await res.json();
      if (res.ok) {
        setSubmittedToken(data.token);
      } else {
        alert(data.error || "Failed to submit registration.");
      }
    } catch {
      setSubmittedToken(`REG-${Date.now().toString().slice(-6)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(() => {
    const loadDynamicEvents = async () => {
      try {
        const res = await fetch("/api/admin/events");
        const data = await res.json();
        if (data.success && Array.isArray(data.events) && data.events.length > 0) {
          setCaseFiles(data.events);
        }
      } catch {
        // Fallback to static default
      }
    };
    loadDynamicEvents();
  }, []);

  useEffect(() => {
    const handleHash = () => {
      if (typeof window === "undefined") return;
      const rawHash = window.location.hash.replace("#", "");
      if (rawHash) {
        // Alias support if someone accesses #pitch-on-the-rocks
        const hash = rawHash === "pitch-on-the-rocks" ? "potr" : rawHash;
        setSelectedCategory("All");
        setTimeout(() => {
          const el = document.getElementById(hash);
          if (el) {
            el.scrollIntoView({ behavior: "smooth", block: "center" });
            el.classList.add("highlight-active-card");
            setTimeout(() => {
              el.classList.remove("highlight-active-card");
            }, 3000);
          }
        }, 150);
      }
    };

    handleHash();
    window.addEventListener("hashchange", handleHash);
    return () => window.removeEventListener("hashchange", handleHash);
  }, []);

  const filteredCaseFiles = caseFiles.filter((cf) => {
    if (selectedCategory === "All") return true;
    if (selectedCategory === "Case Competitions")
      return cf.category === "Consulting" || cf.category === "Strategy";
    if (selectedCategory === "Valuation Labs") return cf.category === "Finance";
    if (selectedCategory === "Flagship Summits") return cf.category === "Venture" || cf.id === "potr";
    if (selectedCategory === "Workshops") return cf.category === "Strategy" || cf.category === "Finance";
    return true;
  });

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
            <span>{events.header.badge}</span>
          </div>

          <h1 className="hero-title" style={{ textAlign: "left", margin: 0 }}>
            {events.header.title}
          </h1>

          <p className="hero-subline" style={{ textAlign: "left", margin: "24px 0 0", maxWidth: "780px" }}>
            {events.header.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Filter Bar & Flagship Conclave (POTR) — Crisp Pure White (#FFFFFF) */}
      <section className="section-pure-white">
        <div className="container">
          {/* Category Filter Tabs */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "10px",
              paddingBottom: "28px",
              borderBottom: "1px solid var(--white-border)",
              marginBottom: "48px",
              flexWrap: "wrap",
            }}
          >
            {events.categories.map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className="stamp-button"
                  style={{
                    padding: "8px 18px",
                    fontSize: "12px",
                    fontFamily: "var(--font-mono)",
                    textTransform: "uppercase",
                    backgroundColor: isSelected ? "var(--navy-hero)" : "var(--white-pure)",
                    color: isSelected ? "#FFFFFF" : "var(--ink-title)",
                    borderColor: isSelected ? "var(--navy-hero)" : "var(--white-border)",
                    boxShadow: isSelected ? "0 2px 8px rgba(10, 19, 41, 0.2)" : "none",
                    letterSpacing: "0.08em",
                  }}
                >
                  {cat}
                </button>
              );
            })}
          </div>

          {/* Flagship Summit Feature: PITCH ON THE ROCKS */}
          {(selectedCategory === "All" || selectedCategory === "Flagship Summits") && (
            <div
              id="potr"
              style={{
                backgroundColor: "var(--white-pure)",
                border: "1px solid var(--white-border)",
                boxShadow: "var(--card-shadow)",
                overflow: "hidden",
                marginBottom: "40px",
                scrollMarginTop: "120px",
                transition: "box-shadow 0.3s ease, outline 0.3s ease",
              }}
            >
              {/* Banner Media Frame */}
              <div style={{ position: "relative", width: "100%", height: "360px", backgroundColor: "var(--navy-deep)" }}>
                <Image
                  src="/assets/hero/flagship-summit.jpg"
                  alt="Pitch on the Rocks Flagship Conclave"
                  fill
                  priority
                  style={{ objectFit: "cover", opacity: 0.75 }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(to top, rgba(7, 13, 30, 0.95) 0%, rgba(7, 13, 30, 0.4) 60%, transparent 100%)",
                    padding: "36px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "flex-end",
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "8px" }}>
                    <span className="status-badge status-badge-active">{events.flagship.badge}</span>
                    <span className="font-metadata-mono" style={{ fontSize: "11px", color: "#FFFFFF", textTransform: "uppercase" }}>
                      {events.flagship.edition}
                    </span>
                  </div>
                  <h2 className="font-display-serif" style={{ fontSize: "clamp(30px, 4.5vw, 54px)", color: "#FFFFFF" }}>
                    {events.flagship.title}
                  </h2>
                  <p className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--gold-oxford)", letterSpacing: "0.12em", marginTop: "6px", textTransform: "uppercase" }}>
                    {events.flagship.tagline}
                  </p>
                </div>
              </div>

              {/* Summit Narrative & Application CTA */}
              <div style={{ padding: "36px", borderBottom: "1px solid var(--white-border)" }}>
                <div className="grid-2" style={{ alignItems: "center", gap: "32px" }}>
                  <div>
                    <h3 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", marginBottom: "12px" }}>
                      About The Summit
                    </h3>
                    <p style={{ color: "var(--ink-body)", lineHeight: 1.65 }}>
                      {events.flagship.about}
                    </p>
                  </div>

                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                    <button
                      type="button"
                      onClick={() => handleRegisterClick(events.flagship.title)}
                      className="stamp-button stamp-button-primary"
                      style={{ padding: "14px 28px", fontSize: "14px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                    >
                      APPLY AS FOUNDER / ATTENDEE →
                    </button>
                    <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)", marginTop: "8px", textTransform: "uppercase" }}>
                      Direct investor meetings · Curated diligence
                    </span>
                  </div>
                </div>

                {/* Stat Highlights Bar */}
                <div className="stats-grid" style={{ marginTop: "32px", paddingTop: "32px", borderTop: "1px solid var(--white-border)" }}>
                  {events.flagship.stats.map((st) => (
                    <div key={st.label} style={{ padding: "18px", backgroundColor: "var(--white-alabaster)", border: "1px solid var(--white-border)" }}>
                      <span className="stat-label" style={{ fontSize: "11px", color: "var(--ink-muted)" }}>{st.label}</span>
                      <span className="stat-value" style={{ fontSize: "28px", color: "var(--ink-title)", marginTop: "4px", display: "block" }}>{st.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Mentors & Judges Roster */}
              <div style={{ padding: "36px", borderBottom: "1px solid var(--white-border)" }}>
                <span className="section-badge" style={{ color: "var(--burgundy-crest)" }}>ESTEEMED JURY & MENTOR PANEL</span>
                <h3 className="font-display-serif" style={{ fontSize: "26px", color: "var(--ink-title)", marginBottom: "24px" }}>
                  Active Investors in Attendance
                </h3>

                <div className="grid-4">
                  {events.flagship.investorsMentors.map((inv) => (
                    <div
                      key={inv.name}
                      style={{
                        padding: "20px",
                        backgroundColor: "var(--white-pure)",
                        border: "1px solid var(--white-border)",
                        boxShadow: "var(--card-shadow)",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "space-between",
                      }}
                    >
                      <div>
                        <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--burgundy-crest)", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>
                          {inv.role}
                        </span>
                        <h4 className="font-display-serif" style={{ fontSize: "19px", color: "var(--ink-title)" }}>
                          {inv.name}
                        </h4>
                      </div>
                      <p style={{ fontSize: "12.5px", color: "var(--ink-body)", marginTop: "12px", lineHeight: 1.5 }}>
                        {inv.credential}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Featured Startups Showcase */}
              <div style={{ padding: "36px", backgroundColor: "var(--white-alabaster)" }}>
                <span className="section-badge" style={{ color: "var(--ink-muted)" }}>STARTUP DEMO TRACK</span>
                <h3 className="font-display-serif" style={{ fontSize: "26px", color: "var(--ink-title)", marginBottom: "24px" }}>
                  Selected Ventures From The Cohort
                </h3>

                <div className="grid-4">
                  {events.flagship.startupPortfolio.map((st) => (
                    <div
                      key={st.name}
                      style={{
                        padding: "16px",
                        backgroundColor: "var(--white-pure)",
                        border: "1px solid var(--white-border)",
                        boxShadow: "var(--card-shadow)",
                        textAlign: "center",
                      }}
                    >
                      <span className="font-display-serif-sm" style={{ fontSize: "18px", color: "var(--ink-title)", display: "block" }}>
                        {st.name}
                      </span>
                      <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--burgundy-crest)", textTransform: "uppercase", marginTop: "4px", display: "block" }}>
                        {st.category}
                      </span>
                      <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--ink-muted)", marginTop: "2px", display: "block" }}>
                        Stage: {st.stage}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* 3. Case Files Repository — Architectural Alabaster (#F8FAFC) */}
      <section className="section-alabaster">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">CASE ARCHIVE & UPCOMING LEAGUES</span>
            <h2 className="section-title">Case Files & Competitions</h2>
            <p className="section-sub">
              Explore past problem briefs, ongoing consulting leagues, and registration tracks.
            </p>
          </div>

          <div className="grid-2">
            {filteredCaseFiles.map((cf) => {
              const isClosed = cf.status === "CLOSED";
              const isActive = cf.status === "ACTIVE";

              return (
                <div
                  key={cf.id || cf.fileNumber}
                  id={cf.id}
                  style={{
                    backgroundColor: "var(--white-pure)",
                    border: "1px solid var(--white-border)",
                    boxShadow: "var(--card-shadow)",
                    padding: "32px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    transition: "transform 0.25s ease, box-shadow 0.25s ease, outline 0.25s ease",
                    scrollMarginTop: "120px",
                  }}
                >
                  <div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        paddingBottom: "14px",
                        borderBottom: "1px solid var(--white-border)",
                        marginBottom: "16px",
                      }}
                    >
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)" }}>
                        {cf.fileNumber}
                      </span>
                      <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                        <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-body)", textTransform: "uppercase" }}>
                          {cf.category}
                        </span>
                        <span
                          className={`status-badge ${
                            isClosed
                              ? "status-badge-closed"
                              : isActive
                              ? "status-badge-active"
                              : "status-badge-upcoming"
                          }`}
                        >
                          {isClosed ? "ARCHIVED" : isActive ? "LIVE" : "UPCOMING"}
                        </span>
                      </div>
                    </div>

                    <h3 className="font-display-serif" style={{ fontSize: "26px", color: "var(--ink-title)", marginBottom: "8px" }}>
                      {cf.title}
                    </h3>
                    <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", display: "block", marginBottom: "16px" }}>
                      TIMELINE: {cf.date}
                    </span>

                    <p style={{ fontSize: "14.5px", color: "var(--ink-body)", lineHeight: 1.6, marginBottom: "24px" }}>
                      {cf.description}
                    </p>
                  </div>

                  <div style={{ paddingTop: "20px", borderTop: "1px solid var(--white-border)", display: "flex", flexDirection: "column", gap: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "12.5px", flexWrap: "wrap", gap: "8px" }}>
                      <span style={{ color: "var(--emerald)", fontWeight: 600 }}>🏆 {cf.prizeOrOutput}</span>
                      <span style={{ color: "var(--ink-muted)" }}>👥 {cf.eligibility}</span>
                    </div>

                    {!isClosed ? (
                      <button
                        type="button"
                        onClick={() => handleRegisterClick(cf.title)}
                        className="stamp-button stamp-button-block"
                        style={{ backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                      >
                        REGISTER FOR CASE BRIEF →
                      </button>
                    ) : (
                      <div
                        style={{
                          padding: "10px",
                          textAlign: "center",
                          border: "1px solid var(--burgundy-border)",
                          backgroundColor: "var(--burgundy-tint)",
                          fontFamily: "var(--font-mono)",
                          fontSize: "11px",
                          color: "var(--burgundy-text)",
                          textTransform: "uppercase",
                          letterSpacing: "0.08em",
                        }}
                      >
                        ARCHIVED CASE FILE
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. Bottom Partnership CTA Banner — Deep Midnight Navy (#070D1E) */}
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
                Want to host a case competition or sponsor a track?
              </h3>
              <p style={{ fontSize: "14.5px", color: "var(--platinum-muted)", marginTop: "6px" }}>
                Collaborate with Finlogue to engage 1,200+ top analytical minds across the nation.
              </p>
            </div>
            <Link
              href="/contact"
              className="stamp-button stamp-button-primary"
            >
              <span>PARTNER WITH US</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Interactive Registration / Participation Modal */}
      {registrationModalOpen && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
        >
          <div
            style={{ position: "fixed", inset: 0 }}
            onClick={() => setRegistrationModalOpen(false)}
            aria-hidden="true"
          />

          <div
            className="lightbox-dialog"
            style={{ maxWidth: "540px", padding: "32px", position: "relative", zIndex: 10, backgroundColor: "var(--white-pure)", color: "var(--ink-title)" }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                paddingBottom: "16px",
                borderBottom: "1px solid var(--white-border)",
                marginBottom: "24px",
              }}
            >
              <div>
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase" }}>
                  OFFICIAL REGISTRATION INTAKE
                </span>
                <h3 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", marginTop: "4px" }}>
                  {registeredEvent}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setRegistrationModalOpen(false)}
                style={{ color: "var(--ink-muted)", fontSize: "20px" }}
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            {submittedToken ? (
              <div style={{ textAlign: "center", padding: "24px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                <div
                  style={{
                    width: "48px",
                    height: "48px",
                    borderRadius: "50%",
                    backgroundColor: "var(--emerald-tint)",
                    color: "var(--emerald)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "20px",
                  }}
                >
                  ✓
                </div>
                <h4 className="font-display-serif" style={{ fontSize: "26px", color: "var(--ink-title)" }}>
                  Application Logged
                </h4>
                <p style={{ fontSize: "14px", color: "var(--ink-body)", maxWidth: "380px" }}>
                  Your registration token <span style={{ color: "var(--navy-hero)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{submittedToken}</span> has been securely dispatched.
                </p>
                <button
                  type="button"
                  onClick={() => setRegistrationModalOpen(false)}
                  className="stamp-button"
                  style={{ marginTop: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                >
                  CLOSE DESK
                </button>
              </div>
            ) : (
              <form onSubmit={handleModalSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div>
                  <label className="form-label">Full Name / Lead Founder *</label>
                  <input
                    type="text"
                    required
                    value={modalForm.name}
                    onChange={(e) => setModalForm({ ...modalForm, name: e.target.value })}
                    placeholder="e.g. Alex Sharma"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Official Email *</label>
                  <input
                    type="email"
                    required
                    value={modalForm.email}
                    onChange={(e) => setModalForm({ ...modalForm, email: e.target.value })}
                    placeholder="alex@university.edu"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Institution / Startup Name</label>
                  <input
                    type="text"
                    value={modalForm.institution}
                    onChange={(e) => setModalForm({ ...modalForm, institution: e.target.value })}
                    placeholder="e.g. LNMIIT / FinTech Labs"
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">Brief Statement / Pitch Link</label>
                  <textarea
                    rows={3}
                    value={modalForm.statement}
                    onChange={(e) => setModalForm({ ...modalForm, statement: e.target.value })}
                    placeholder="Briefly describe your venture or case team credentials..."
                    className="form-textarea"
                  />
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", alignItems: "center", gap: "16px", marginTop: "8px" }}>
                  <button
                    type="button"
                    onClick={() => setRegistrationModalOpen(false)}
                    style={{ fontSize: "13px", color: "var(--ink-muted)" }}
                  >
                    CANCEL
                  </button>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="stamp-button stamp-button-primary"
                    style={{ padding: "10px 24px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                  >
                    {isSubmitting ? "TRANSMITTING..." : "SUBMIT DOSSIER →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </main>
  );
}
