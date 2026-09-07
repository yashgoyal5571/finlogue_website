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
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

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
                        padding: "20px",
                        backgroundColor: "#F8FAFC",
                        border: "1px solid rgba(7, 13, 30, 0.07)",
                        borderRadius: "14px",
                        boxShadow: "0 2px 8px rgba(7, 13, 30, 0.03)",
                      }}
                    >
                      <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--gold-oxford)", textTransform: "uppercase", display: "block", fontWeight: 700 }}>
                        {c.role}
                      </span>
                      <h4 className="font-display-serif" style={{ fontSize: "22px", color: "var(--navy-hero)", marginTop: "4px", fontWeight: 600 }}>
                        {c.name}
                      </h4>
                      <p style={{ fontSize: "13px", color: "var(--ink-muted)", marginTop: "2px" }}>
                        {c.dept}
                      </p>

                      <a
                        href={`mailto:${c.email}`}
                        className="font-metadata-mono"
                        style={{ fontSize: "12px", color: "var(--navy-hero)", marginTop: "12px", display: "inline-block", fontWeight: 600 }}
                      >
                        ✉ {c.email}
                      </a>
                    </div>
                  ))}
                </div>
              </div>

              {/* Social Channels */}
              <div
                style={{
                  padding: "24px 32px",
                  backgroundColor: "#FFFFFF",
                  border: "1px solid rgba(7, 13, 30, 0.09)",
                  boxShadow: "0 16px 36px -10px rgba(7, 13, 30, 0.07)",
                  borderRadius: "18px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--navy-hero)", textTransform: "uppercase", fontWeight: 700 }}>
                  Official Networks:
                </span>
                <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
                  {contact.channels.map((ch) => (
                    <a
                      key={ch.platform}
                      href={ch.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-metadata-mono"
                      style={{
                        fontSize: "11.5px",
                        color: "var(--navy-hero)",
                        border: "1px solid rgba(7, 13, 30, 0.12)",
                        borderRadius: "8px",
                        padding: "8px 16px",
                        textTransform: "uppercase",
                        backgroundColor: "#F8FAFC",
                        fontWeight: 600,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {ch.platform}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Frequently Asked Questions — Architectural Alabaster (#F8FAFC) */}
      <section className="section-alabaster">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">KNOWLEDGE BASE</span>
            <h2 className="section-title">Frequently Asked Questions</h2>
            <p className="section-sub">
              Common queries regarding summit participation, startup pitching, corporate sponsorships, and inductions.
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "880px" }}>
            {contact.faqs.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div
                  key={faq.question}
                  style={{
                    border: "1px solid var(--white-border)",
                    backgroundColor: "var(--white-pure)",
                    boxShadow: "var(--card-shadow)",
                    overflow: "hidden",
                  }}
                >
                  <button
                    type="button"
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    style={{
                      width: "100%",
                      padding: "24px",
                      textAlign: "left",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "16px",
                      backgroundColor: "var(--white-pure)",
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "baseline", gap: "12px" }}>
                      <span className="font-metadata-mono" style={{ fontSize: "12px", color: "var(--burgundy-crest)" }}>
                        0{idx + 1}
                      </span>
                      <span className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)" }}>
                        {faq.question}
                      </span>
                    </div>

                    <span className="font-metadata-mono" style={{ fontSize: "18px", color: "var(--navy-hero)", fontWeight: 700 }}>
                      {isOpen ? "−" : "+"}
                    </span>
                  </button>

                  {isOpen && (
                    <div
                      style={{
                        padding: "0 24px 24px",
                        borderTop: "1px solid var(--white-border)",
                        fontSize: "14.5px",
                        color: "var(--ink-body)",
                        lineHeight: 1.65,
                      }}
                    >
                      <p style={{ marginTop: "16px" }}>{faq.answer}</p>
                      <div style={{ marginTop: "12px" }}>
                        <span className="status-badge status-badge-upcoming">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
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
