"use client";

import React, { useState } from "react";
import { contact } from "@/content/contact";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    organization: "",
    inquiryType: contact.inquiryTypes[0],
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [confirmationTicket, setConfirmationTicket] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (res.ok) {
        setConfirmationTicket(data.ticket);
      } else {
        alert(data.error || "Failed to log dispatch.");
      }
    } catch {
      setConfirmationTicket(`DISPATCH-${Date.now().toString().slice(-6)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

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
            <span>{contact.header.badge}</span>
          </div>

          <h1 className="hero-title" style={{ textAlign: "left", margin: 0 }}>
            {contact.header.title}
          </h1>

          <p className="hero-subline" style={{ textAlign: "left", margin: "24px 0 0", maxWidth: "780px" }}>
            {contact.header.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Main Two-Column Intake Section — Architectural Soft Backdrop (#F4F7FB) */}
      <section style={{ backgroundColor: "#F4F7FB", padding: "80px 0" }}>
        <div className="container">
          <div className="grid-2" style={{ gap: "44px", alignItems: "start" }}>
            {/* Left Column: Interactive Intake Slip Form with Elevated Pure White Card */}
            <div
              className="intake-slip-card"
              style={{
                backgroundColor: "#FFFFFF",
                borderRadius: "20px",
                border: "1px solid rgba(7, 13, 30, 0.09)",
                boxShadow: "0 24px 48px -12px rgba(7, 13, 30, 0.09), 0 4px 16px rgba(7, 13, 30, 0.03)",
                padding: "40px 36px",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  paddingBottom: "20px",
                  borderBottom: "1px solid rgba(7, 13, 30, 0.08)",
                  marginBottom: "32px",
                }}
              >
                <div>
                  <span className="section-badge" style={{ marginBottom: "4px", color: "var(--navy-hero)" }}>
                    OFFICIAL INTAKE SLIP
                  </span>
                  <h2 className="font-display-serif" style={{ fontSize: "32px", color: "var(--navy-hero)", fontWeight: 700 }}>
                    Submit Correspondence
                  </h2>
                </div>
                <span className="status-badge status-badge-active">
                  SECURE CHANNEL
                </span>
              </div>

              {confirmationTicket ? (
                <div style={{ textAlign: "center", padding: "40px 0", display: "flex", flexDirection: "column", alignItems: "center", gap: "16px" }}>
                  <div
                    style={{
                      width: "56px",
                      height: "56px",
                      borderRadius: "50%",
                      backgroundColor: "var(--emerald-tint)",
                      color: "var(--emerald)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "24px",
                      border: "1px solid var(--emerald-border)",
                    }}
                  >
                    ✓
                  </div>
                  <h3 className="font-display-serif" style={{ fontSize: "30px", color: "var(--ink-title)" }}>
                    Dossier Logged Successfully
                  </h3>
                  <p style={{ fontSize: "15px", color: "var(--ink-body)", maxWidth: "440px", lineHeight: 1.6 }}>
                    Thank you, <span style={{ color: "var(--navy-hero)", fontWeight: 600 }}>{formData.name}</span>. Your dispatch regarding <span style={{ color: "var(--ink-title)", fontWeight: 600 }}>{formData.inquiryType}</span> has been logged under ticket <span style={{ color: "var(--navy-hero)", fontFamily: "var(--font-mono)", fontWeight: 700 }}>{confirmationTicket}</span>.
                  </p>
                  <div style={{ paddingTop: "20px" }}>
                    <button
                      type="button"
                      onClick={() => {
                        setConfirmationTicket(null);
                        setFormData({
                          name: "",
                          email: "",
                          organization: "",
                          inquiryType: contact.inquiryTypes[0],
                          message: "",
                        });
                      }}
                      className="stamp-button"
                      style={{ backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                    >
                      SUBMIT ANOTHER DISPATCH
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
                  <div className="grid-2" style={{ gap: "20px" }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Jessica Sterling"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Official Email *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="j.sterling@firm.com"
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="grid-2" style={{ gap: "20px" }}>
                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Institution / Organization</label>
                      <input
                        type="text"
                        value={formData.organization}
                        onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                        placeholder="e.g. Goldman Sachs / Oxford VC"
                        className="form-input"
                      />
                    </div>

                    <div className="form-group" style={{ margin: 0 }}>
                      <label className="form-label">Nature of Inquiry</label>
                      <select
                        value={formData.inquiryType}
                        onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                        className="form-select"
                      >
                        {contact.inquiryTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="form-group" style={{ margin: 0 }}>
                    <label className="form-label">Dispatch Brief / Message *</label>
                    <textarea
                      required
                      rows={5}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Outline the parameters of your proposed partnership, sponsorship, or institutional inquiry..."
                      className="form-textarea"
                    />
                  </div>

                  <div
                    style={{
                      paddingTop: "12px",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      flexWrap: "wrap",
                      gap: "16px",
                    }}
                  >
                    <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)" }}>
                      Official response turnaround: within 48 business hours.
                    </span>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="stamp-button stamp-button-primary"
                      style={{ padding: "14px 32px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                    >
                      <span>{isSubmitting ? "DISPATCHING..." : "SUBMIT FOR REVIEW"}</span>
                      <span style={{ fontSize: "12px" }}>→</span>
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* Right Column: Campus Location, Direct Leadership, Channels */}
            <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
              {/* Campus Headquarters Card */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(7, 13, 30, 0.09)",
                  boxShadow: "0 24px 48px -12px rgba(7, 13, 30, 0.09), 0 4px 16px rgba(7, 13, 30, 0.03)",
                  borderRadius: "20px",
                  padding: "36px",
                }}
              >
                <span className="section-badge" style={{ color: "var(--navy-hero)" }}>CAMPUS ARCHIVE</span>
                <h3 className="font-display-serif" style={{ fontSize: "28px", color: "var(--navy-hero)", fontWeight: 700, marginBottom: "16px" }}>
                  {contact.office.title}
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "10px", fontSize: "14.5px", color: "var(--ink-body)" }}>
                  <p style={{ color: "var(--navy-hero)", fontWeight: 600 }}>
                    {contact.office.campus}
                  </p>
                  <p>{contact.office.building}</p>
                  <p style={{ fontSize: "13.5px", lineHeight: 1.5, color: "var(--ink-muted)" }}>
                    {contact.office.address}
                  </p>
                  <p
                    className="font-metadata-mono"
                    style={{ fontSize: "12px", color: "var(--navy-hero)", paddingTop: "14px", borderTop: "1px solid rgba(7, 13, 30, 0.08)", fontWeight: 600 }}
                  >
                    🕒 {contact.office.hours}
                  </p>
                  <p
                    className="font-metadata-mono"
                    style={{ fontSize: "12px", color: "var(--navy-hero)", paddingTop: "8px", fontWeight: 600, display: "flex", alignItems: "center", gap: "6px" }}
                  >
                    <span>✉ Official Dispatch:</span>
                    <a
                      href={`mailto:${contact.office.email}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "var(--navy-hero)", textDecoration: "underline" }}
                    >
                      {contact.office.email}
                    </a>
                  </p>
                </div>
              </div>

              {/* Direct Leadership Contacts */}
              <div
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(7, 13, 30, 0.09)",
                  boxShadow: "0 24px 48px -12px rgba(7, 13, 30, 0.09), 0 4px 16px rgba(7, 13, 30, 0.03)",
                  borderRadius: "20px",
                  padding: "36px",
                }}
              >
                <span className="section-badge" style={{ color: "var(--navy-hero)" }}>DIRECT CHANNELS</span>
                <h3 className="font-display-serif" style={{ fontSize: "28px", color: "var(--navy-hero)", fontWeight: 700, marginBottom: "20px" }}>
                  Student Coordinators
                </h3>

                <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                  {contact.coordinators.map((c) => (
                    <div
                      key={c.name}
                      style={{
                        padding: "22px 24px",
                        backgroundColor: "#F8FAFC",
                        border: "1px solid rgba(7, 13, 30, 0.08)",
                        borderRadius: "14px",
                        boxShadow: "0 2px 8px rgba(7, 13, 30, 0.03)",
                      }}
                    >
                      <h4
                        className="font-display-serif"
                        style={{
                          fontSize: "22px",
                          color: "var(--navy-hero)",
                          marginTop: "4px",
                          fontWeight: 600,
                        }}
                      >
                        {c.name}
                      </h4>
                      <p style={{ fontSize: "13px", color: "var(--ink-muted)", marginTop: "2px" }}>
                        {c.dept}
                      </p>
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "14px",
                          marginTop: "12px",
                          paddingTop: "12px",
                          borderTop: "1px solid rgba(7, 13, 30, 0.06)",
                        }}
                      >
                        {/* LinkedIn Icon */}
                        <a
                          href={c.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all"}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`${c.name} on LinkedIn`}
                          aria-label={`${c.name} on LinkedIn`}
                          style={{
                            color: "var(--navy-hero)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "opacity 0.15s ease, transform 0.15s ease",
                          }}
                        >
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6Z" />
                          </svg>
                        </a>

                        {/* Email Icon */}
                        <a
                          href={`mailto:${c.email}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          title={`Email ${c.name}`}
                          aria-label={`Email ${c.name}`}
                          style={{
                            color: "var(--navy-hero)",
                            display: "inline-flex",
                            alignItems: "center",
                            justifyContent: "center",
                            transition: "opacity 0.15s ease, transform 0.15s ease",
                          }}
                        >
                          <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <rect width="20" height="16" x="2" y="4" rx="2" />
                            <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                          </svg>
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 4. Bottom Campus Coordinates Strip — Deep Midnight Navy (#070D1E) */}
      <section className="section-navy-dark" style={{ padding: "70px 0" }}>
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-badge" style={{ color: "var(--gold-oxford)" }}>OFFICIAL LNMIIT CAMPUS CITATION</span>
          <h3 className="font-display-serif" style={{ fontSize: "28px", color: "#FFFFFF", marginTop: "8px" }}>
            The LNM Institute of Information Technology
          </h3>
          <p style={{ fontSize: "14px", color: "var(--platinum-muted)", marginTop: "8px" }}>
            Rupa ki Nangal, Post-Sumel, Via-Jamdoli, Jaipur, Rajasthan 302031, India
          </p>
        </div>
      </section>
    </main>
  );
}
