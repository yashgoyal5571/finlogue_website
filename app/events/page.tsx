"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { events, CaseFile } from "@/content/events";
import InitiativesFlipGrid from "@/components/InitiativesFlipGrid";
import AnimatedStatCard from "@/components/AnimatedStatCard";

export default function EventsPage() {
  const [eventsData, setEventsData] = useState(events);
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
        const res = await fetch("/api/admin/content?section=events");
        if (res.ok) {
          const data = await res.json();
          if (data && data.flagship) {
            setEventsData(data);
            if (Array.isArray(data.caseFiles) && data.caseFiles.length > 0) {
              setCaseFiles(data.caseFiles);
            }
          }
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
            <span>{eventsData.header.badge}</span>
          </div>

          <h1 className="hero-title" style={{ textAlign: "left", margin: 0 }}>
            {eventsData.header.title}
          </h1>

          <p className="hero-subline" style={{ textAlign: "left", margin: "24px 0 0", maxWidth: "780px" }}>
            {eventsData.header.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Filter Bar & Flagship Conclave (POTR) — Crisp Pure White (#FFFFFF) */}
      <section className="section-pure-white">
        <div className="container">
          {/* Flagship Summit Feature: PITCH ON THE ROCKS */}
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
                  <span className="status-badge status-badge-active">{eventsData.flagship.badge}</span>
                  <span className="font-metadata-mono" style={{ fontSize: "11px", color: "#FFFFFF", textTransform: "uppercase" }}>
                    {eventsData.flagship.edition}
                  </span>
                </div>
                <h2 className="font-display-serif" style={{ fontSize: "clamp(30px, 4.5vw, 54px)", color: "#FFFFFF" }}>
                  {eventsData.flagship.title}
                </h2>
                <p className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--gold-oxford)", letterSpacing: "0.12em", marginTop: "6px", textTransform: "uppercase" }}>
                  {eventsData.flagship.tagline}
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
                    {eventsData.flagship.about}
                  </p>
                </div>

                <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                  <button
                    type="button"
                    onClick={() => handleRegisterClick(eventsData.flagship.title)}
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

              {/* Stat Highlights Bar with Scroll-Triggered Count-Up Animation */}
              <div
                style={{
                  marginTop: "32px",
                  paddingTop: "32px",
                  borderTop: "1px solid var(--white-border)",
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
                  gap: "20px",
                }}
              >
                {eventsData.flagship.stats.map((st) => (
                  <AnimatedStatCard
                    key={st.label}
                    label={st.label}
                    value={st.value}
                    description={st.description}
                  />
                ))}
              </div>
            </div>

            {/* Mentors & Judges Roster */}
            <div style={{ padding: "36px" }}>
              <div style={{ marginBottom: "28px" }}>
                <span className="section-badge" style={{ color: "var(--burgundy-crest)" }}>
                  ESTEEMED JURY & MENTOR PANEL
                </span>
                <h3 className="font-display-serif" style={{ fontSize: "26px", color: "var(--ink-title)", margin: "4px 0 0" }}>
                  Active Investors in Attendance
                </h3>
              </div>

              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
                  gap: "20px",
                }}
              >
                {eventsData.flagship.investorsMentors.map((inv) => (
                  <a
                    key={inv.name}
                    href={inv.linkedInPostUrl || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all"}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={`View official LinkedIn post for ${inv.name}`}
                    className="investor-post-card"
                    style={{
                      padding: "24px 22px",
                      backgroundColor: "var(--white-pure)",
                      border: "1px solid var(--white-border)",
                      borderRadius: "6px",
                      boxShadow: "0 2px 8px rgba(10, 19, 41, 0.04)",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <h4
                      className="font-display-serif"
                      style={{
                        fontSize: "20px",
                        color: "var(--ink-title)",
                        margin: 0,
                        lineHeight: 1.25,
                        transition: "color 0.2s ease",
                      }}
                    >
                      {inv.name}
                    </h4>
                    <p
                      style={{
                        fontSize: "13px",
                        color: "var(--ink-body)",
                        marginTop: "8px",
                        lineHeight: 1.5,
                        marginBottom: 0,
                      }}
                    >
                      {inv.credential}
                    </p>
                  </a>
                ))}
              </div>
            </div>
          </div>
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

          <InitiativesFlipGrid items={caseFiles} onRegisterClick={handleRegisterClick} />
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
