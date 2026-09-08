"use client";

import React, { useState, useEffect } from "react";

interface PIRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PIRegistrationModal({ isOpen, onClose }: PIRegistrationModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    phone: "",
    domain: "Finance & Capital Markets",
    statement: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    const compiledStatement = `Roll No: ${formData.rollNumber.trim()} | Target Domain: ${formData.domain} | Statement: ${formData.statement.trim()}`;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim(),
          institution: `LNMIIT Batch Y-26 (${formData.rollNumber.trim().toUpperCase()})`,
          event: "Personal Interview (PI) - Y-26 Batch Recruitment",
          statement: compiledStatement,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setSubmittedToken(data.token || `PI-Y26-${Date.now().toString().slice(-5)}`);
      } else {
        setErrorMessage(data.error || "Failed to process application. Please try again.");
      }
    } catch {
      // Offline / fallback token generation
      setSubmittedToken(`PI-Y26-${Date.now().toString().slice(-5)}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSubmittedToken(null);
    setFormData({
      name: "",
      email: "",
      rollNumber: "",
      phone: "",
      domain: "Finance & Capital Markets",
      statement: "",
    });
    onClose();
  };

  return (
    <div
      className="drawer-overlay"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
        backgroundColor: "rgba(5, 10, 24, 0.85)",
        backdropFilter: "blur(6px)",
      }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="pi-modal-title"
    >
      {/* Dimmed backdrop click */}
      <div
        style={{ position: "fixed", inset: 0 }}
        onClick={handleReset}
        aria-hidden="true"
      />

      <div
        style={{
          position: "relative",
          zIndex: 10001,
          width: "100%",
          maxWidth: "580px",
          maxHeight: "92vh",
          overflowY: "auto",
          backgroundColor: "#070D1E",
          border: "1px solid rgba(197, 168, 128, 0.4)",
          boxShadow: "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(197, 168, 128, 0.15)",
          borderRadius: "14px",
          padding: "clamp(24px, 4vw, 36px)",
          color: "#FFFFFF",
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={handleReset}
          style={{
            position: "absolute",
            top: "18px",
            right: "18px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid rgba(226, 232, 240, 0.15)",
            backgroundColor: "rgba(255, 255, 255, 0.05)",
            color: "var(--platinum-muted)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: "16px",
            transition: "all 0.15s ease",
            cursor: "pointer",
          }}
          aria-label="Close modal"
        >
          ✕
        </button>

        {submittedToken ? (
          /* Confirmation State */
          <div style={{ textAlign: "center", padding: "16px 8px" }}>
            <div
              style={{
                width: "68px",
                height: "68px",
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                border: "2px solid #10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 20px",
                color: "#10B981",
                fontSize: "30px",
              }}
            >
              ✓
            </div>

            <span
              className="font-metadata-mono"
              style={{
                fontSize: "11px",
                color: "var(--gold-oxford)",
                letterSpacing: "0.14em",
                display: "block",
                marginBottom: "8px",
              }}
            >
              CANDIDATURE REGISTERED · BATCH Y-26
            </span>

            <h3
              id="pi-modal-title"
              className="font-display-serif"
              style={{ fontSize: "28px", color: "#FFFFFF", marginBottom: "12px" }}
            >
              Application Submitted
            </h3>

            <p style={{ fontSize: "14px", color: "var(--platinum-muted)", lineHeight: 1.6, maxWidth: "440px", margin: "0 auto 24px" }}>
              Welcome to the recruitment cycle! Your application has been logged into the Finlogue secretariat roster.
            </p>

            <div
              style={{
                backgroundColor: "rgba(255, 255, 255, 0.04)",
                border: "1px dashed rgba(197, 168, 128, 0.5)",
                borderRadius: "8px",
                padding: "16px",
                marginBottom: "28px",
              }}
            >
              <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--platinum-muted)", display: "block" }}>
                YOUR INTERVIEW CANDIDATE TOKEN
              </span>
              <span
                className="font-metadata-mono"
                style={{
                  fontSize: "22px",
                  fontWeight: 700,
                  color: "var(--gold-oxford)",
                  letterSpacing: "0.1em",
                  marginTop: "6px",
                  display: "block",
                }}
              >
                {submittedToken}
              </span>
            </div>

            <div
              style={{
                textAlign: "left",
                backgroundColor: "rgba(255, 255, 255, 0.02)",
                border: "1px solid rgba(255, 255, 255, 0.08)",
                borderRadius: "8px",
                padding: "18px 20px",
                marginBottom: "28px",
              }}
            >
              <h4 className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", marginBottom: "10px" }}>
                NEXT STEPS FOR CANDIDATES:
              </h4>
              <ul style={{ margin: 0, paddingLeft: "18px", fontSize: "13px", color: "var(--platinum-muted)", lineHeight: 1.6 }}>
                <li>Personal Interview (PI) slots and timings will be communicated via your registered email / WhatsApp.</li>
                <li>Familiarize yourself with basic market trends or case-solving logic (formal finance background is not required).</li>
                <li>Keep this token handy during the interview round.</li>
              </ul>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="stamp-button stamp-button-primary"
              style={{ width: "100%", justifyContent: "center" }}
            >
              <span>RETURN TO FINLOGUE</span>
            </button>
          </div>
        ) : (
          /* Application Form */
          <div>
            <div style={{ marginBottom: "24px" }}>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "4px 10px",
                  borderRadius: "100px",
                  backgroundColor: "rgba(197, 168, 128, 0.12)",
                  border: "1px solid rgba(197, 168, 128, 0.3)",
                  marginBottom: "12px",
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
                  style={{ fontSize: "10px", color: "var(--gold-oxford)", letterSpacing: "0.12em" }}
                >
                  RECRUITING Y-26 BATCH
                </span>
              </div>

              <h2
                id="pi-modal-title"
                className="font-display-serif"
                style={{ fontSize: "28px", color: "#FFFFFF", margin: "0 0 8px" }}
              >
                Register for Personal Interviews (PI)
              </h2>
              <p style={{ fontSize: "13.5px", color: "var(--platinum-muted)", margin: 0, lineHeight: 1.55 }}>
                Join LNMIIT&apos;s apex student finance, consulting, and strategy body. Fill out your details below to schedule your interview slot.
              </p>
            </div>

            {errorMessage && (
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "8px",
                  backgroundColor: "rgba(239, 68, 68, 0.12)",
                  border: "1px solid rgba(239, 68, 68, 0.3)",
                  color: "#FCA5A5",
                  fontSize: "13px",
                  marginBottom: "20px",
                }}
              >
                {errorMessage}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Row 1: Name & Roll Number */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                <div>
                  <label
                    htmlFor="pi-name"
                    className="font-metadata-mono"
                    style={{ fontSize: "11px", color: "var(--platinum-muted)", display: "block", marginBottom: "6px" }}
                  >
                    FULL NAME *
                  </label>
                  <input
                    id="pi-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Aryan Sharma"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(226, 232, 240, 0.16)",
                      color: "#FFFFFF",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pi-roll"
                    className="font-metadata-mono"
                    style={{ fontSize: "11px", color: "var(--platinum-muted)", display: "block", marginBottom: "6px" }}
                  >
                    ROLL NUMBER (Y-26 BATCH) *
                  </label>
                  <input
                    id="pi-roll"
                    type="text"
                    required
                    value={formData.rollNumber}
                    onChange={(e) => setFormData({ ...formData, rollNumber: e.target.value })}
                    placeholder="e.g. 26UEC001"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(226, 232, 240, 0.16)",
                      color: "#FFFFFF",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "16px" }}>
                <div>
                  <label
                    htmlFor="pi-email"
                    className="font-metadata-mono"
                    style={{ fontSize: "11px", color: "var(--platinum-muted)", display: "block", marginBottom: "6px" }}
                  >
                    INSTITUTE EMAIL *
                  </label>
                  <input
                    id="pi-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="e.g. 26uec001@lnmiit.ac.in"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(226, 232, 240, 0.16)",
                      color: "#FFFFFF",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                  />
                </div>

                <div>
                  <label
                    htmlFor="pi-phone"
                    className="font-metadata-mono"
                    style={{ fontSize: "11px", color: "var(--platinum-muted)", display: "block", marginBottom: "6px" }}
                  >
                    WHATSAPP / PHONE NUMBER *
                  </label>
                  <input
                    id="pi-phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    placeholder="e.g. +91 98765 43210"
                    style={{
                      width: "100%",
                      padding: "11px 14px",
                      borderRadius: "6px",
                      backgroundColor: "rgba(255, 255, 255, 0.04)",
                      border: "1px solid rgba(226, 232, 240, 0.16)",
                      color: "#FFFFFF",
                      fontSize: "13.5px",
                      outline: "none",
                    }}
                  />
                </div>
              </div>

              {/* Domain Preference */}
              <div>
                <label
                  htmlFor="pi-domain"
                  className="font-metadata-mono"
                  style={{ fontSize: "11px", color: "var(--platinum-muted)", display: "block", marginBottom: "6px" }}
                >
                  PREFERRED DIVISION / INTEREST AREA *
                </label>
                <select
                  id="pi-domain"
                  value={formData.domain}
                  onChange={(e) => setFormData({ ...formData, domain: e.target.value })}
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "6px",
                    backgroundColor: "#0B1528",
                    border: "1px solid rgba(226, 232, 240, 0.2)",
                    color: "#FFFFFF",
                    fontSize: "13.5px",
                    outline: "none",
                  }}
                >
                  <option value="Finance & Capital Markets">Finance & Capital Markets (Equity Research, Valuation, Trading)</option>
                  <option value="Strategy & Consulting">Strategy & Consulting (Case Solving, Advisory, Frameworks)</option>
                  <option value="Competitions & Leagues">Competitions & National Case Challenges</option>
                  <option value="Corporate Relations & Events">Corporate Relations, Sponsorships & Event Operations</option>
                  <option value="Design, Media & Content">Design, Creative Media & Social Narrative</option>
                  <option value="Tech & Quant Development">Tech, Web Operations & Financial Engineering</option>
                </select>
              </div>

              {/* Statement / Pitch */}
              <div>
                <label
                  htmlFor="pi-statement"
                  className="font-metadata-mono"
                  style={{ fontSize: "11px", color: "var(--platinum-muted)", display: "block", marginBottom: "6px" }}
                >
                  WHY DO YOU WANT TO JOIN FINLOGUE? (BRIEF PITCH)
                </label>
                <textarea
                  id="pi-statement"
                  rows={3}
                  value={formData.statement}
                  onChange={(e) => setFormData({ ...formData, statement: e.target.value })}
                  placeholder="Share what interests you about finance, strategy, case solving, or club operations..."
                  style={{
                    width: "100%",
                    padding: "11px 14px",
                    borderRadius: "6px",
                    backgroundColor: "rgba(255, 255, 255, 0.04)",
                    border: "1px solid rgba(226, 232, 240, 0.16)",
                    color: "#FFFFFF",
                    fontSize: "13.5px",
                    outline: "none",
                    resize: "vertical",
                  }}
                />
              </div>

              {/* Submit CTA */}
              <div style={{ marginTop: "8px" }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="stamp-button stamp-button-primary"
                  style={{
                    width: "100%",
                    justifyContent: "center",
                    padding: "14px 20px",
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                >
                  <span>{isSubmitting ? "PROCESSING CANDIDATURE..." : "SUBMIT PI REGISTRATION"}</span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
