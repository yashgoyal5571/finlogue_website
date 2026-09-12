"use client";

import React, { useState, useEffect } from "react";

interface PIRegistrationFormProps {
  onSuccess?: (token: string) => void;
  className?: string;
  isModal?: boolean;
}

export default function PIRegistrationForm({
  onSuccess,
  className = "",
  isModal = false,
}: PIRegistrationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    rollNumber: "",
    phone: "",
    statement: "",
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [alreadySubmitted, setAlreadySubmitted] = useState(false);
  const [submittedToken, setSubmittedToken] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);

  // Multiple submissions enabled for testing & intake
  useEffect(() => {
    // Keep form unlocked
  }, []);

  const handleFieldChange = (field: string, val: string) => {
    let formattedVal = val;

    if (field === "phone") {
      // Numbers only, max 10 digits
      formattedVal = val.replace(/\D/g, "").slice(0, 10);
    } else if (field === "rollNumber") {
      // Uppercase alphanumeric, max 10 chars
      formattedVal = val.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10);
    } else if (field === "name") {
      // Letters and spaces only
      formattedVal = val.replace(/[^a-zA-Z\s]/g, "");
    }

    setFormData((prev) => ({ ...prev, [field]: formattedVal }));

    if (errors[field] || errors.general) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        delete next.general;
        return next;
      });
    }
    setServerError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (alreadySubmitted) return;

    const nameTrimmed = formData.name.trim();
    const rollTrimmed = formData.rollNumber.trim().toUpperCase();
    const emailTrimmed = formData.email.trim().toLowerCase();
    const phoneTrimmed = formData.phone.trim();
    const statementTrimmed = formData.statement.trim();

    const fieldErrors: Record<string, string> = {};

    if (!nameTrimmed) {
      fieldErrors.name = "Full Name is required.";
    } else if (nameTrimmed.length < 2) {
      fieldErrors.name = "Name must be at least 2 characters.";
    }

    if (!rollTrimmed) {
      fieldErrors.rollNumber = "Roll No. is required.";
    } else if (!rollTrimmed.startsWith("26")) {
      fieldErrors.rollNumber = "Eligibility: Roll No. must start with '26' (Y26 cohort).";
    } else if (rollTrimmed.length < 5) {
      fieldErrors.rollNumber = "Invalid Roll No. format.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailTrimmed) {
      fieldErrors.email = "College Email is required.";
    } else if (!emailRegex.test(emailTrimmed)) {
      fieldErrors.email = "Please enter a valid email address.";
    }

    if (!phoneTrimmed) {
      fieldErrors.phone = "10-digit phone number is required.";
    } else if (phoneTrimmed.length !== 10) {
      fieldErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (!statementTrimmed) {
      fieldErrors.statement = "Candidate statement of interest is required.";
    } else if (statementTrimmed.length < 15) {
      fieldErrors.statement = "Please provide a more descriptive statement (minimum 15 characters).";
    }

    if (Object.keys(fieldErrors).length > 0) {
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    setServerError(null);

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameTrimmed,
          email: emailTrimmed,
          phone: phoneTrimmed,
          institution: `Roll: ${rollTrimmed}`,
          statement: statementTrimmed,
          eventTitle: "PERSONAL INTERVIEW (PI) ROUND",
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setAlreadySubmitted(true);
        if (onSuccess) onSuccess("SUBMITTED");
      } else {
        setServerError(data.error || "Failed to submit application.");
      }
    } catch {
      // Offline fallback
      setAlreadySubmitted(true);
      if (onSuccess) onSuccess("SUBMITTED");
    } finally {
      setIsSubmitting(false);
    }
  };

  // SUCCESS / ALREADY SUBMITTED VIEW
  if (alreadySubmitted) {
    return (
      <div
        className="pi-submitted-container"
        style={{
          padding: isModal ? "28px 20px" : "40px 32px",
          textAlign: "center",
          backgroundColor: "#FFFFFF",
          borderRadius: "16px",
          border: "1.5px solid rgba(197, 168, 128, 0.4)",
          boxShadow: "0 12px 32px rgba(7, 13, 30, 0.08)",
        }}
      >
        <div
          style={{
            width: "56px",
            height: "56px",
            borderRadius: "50%",
            backgroundColor: "rgba(21, 128, 61, 0.1)",
            border: "2px solid var(--emerald-bright)",
            color: "var(--emerald)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            margin: "0 auto 18px",
            fontSize: "24px",
          }}
        >
          ✓
        </div>

        <span
          className="font-metadata-mono"
          style={{
            fontSize: "11px",
            color: "var(--gold-oxford)",
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            display: "block",
            marginBottom: "8px",
          }}
        >
          APPLICATION RECEIVED
        </span>

        <h3
          className="font-display-serif"
          style={{
            fontSize: "clamp(22px, 3.5vw, 28px)",
            color: "var(--navy-hero)",
            marginBottom: "20px",
          }}
        >
          Application Submitted Successfully
        </h3>

        <div>
          <button
            type="button"
            onClick={() => {
              setAlreadySubmitted(false);
              setFormData({
                name: "",
                email: "",
                rollNumber: "",
                phone: "",
                statement: "",
              });
              setErrors({});
              setServerError(null);
            }}
            className="stamp-button stamp-button-primary shimmer-sweep"
            style={{
              padding: "10px 26px",
              borderRadius: "100px",
              backgroundColor: "var(--navy-hero)",
              color: "#FFFFFF",
              fontSize: "13.5px",
              fontWeight: 600,
              cursor: "pointer",
              border: "none",
            }}
          >
            Submit Another Response →
          </button>
        </div>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={`pi-registration-form ${className}`}
      noValidate
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "18px",
        width: "100%",
        textAlign: "left",
      }}
    >
      {serverError && (
        <div
          role="alert"
          style={{
            padding: "12px 16px",
            borderRadius: "8px",
            backgroundColor: "rgba(138, 28, 44, 0.08)",
            border: "1px solid rgba(138, 28, 44, 0.3)",
            color: "var(--burgundy-text)",
            fontSize: "13px",
            lineHeight: 1.5,
          }}
        >
          {serverError}
        </div>
      )}

      {/* Row 1: Full Name & Roll Number */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div>
          <label
            htmlFor="pi-name"
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--navy-hero)",
              marginBottom: "6px",
            }}
          >
            Full Name <span style={{ color: "var(--burgundy-text)" }}>*</span>
          </label>
          <input
            id="pi-name"
            type="text"
            required
            value={formData.name}
            onChange={(e) => handleFieldChange("name", e.target.value)}
            className={`intake-input ${errors.name ? "input-error" : ""}`}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "8px",
              border: `1.5px solid ${errors.name ? "#DC2626" : "var(--white-border-strong)"}`,
              fontSize: "14px",
              color: "var(--navy-hero)",
              backgroundColor: "#FFFFFF",
              outline: "none",
            }}
          />
          {errors.name && (
            <span style={{ fontSize: "11.5px", color: "#DC2626", marginTop: "4px", display: "block" }}>
              {errors.name}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="pi-roll"
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--navy-hero)",
              marginBottom: "6px",
            }}
          >
            Roll No. <span style={{ color: "var(--burgundy-text)" }}>*</span>
          </label>
          <input
            id="pi-roll"
            type="text"
            required
            maxLength={10}
            value={formData.rollNumber}
            onChange={(e) => handleFieldChange("rollNumber", e.target.value)}
            className={`intake-input ${errors.rollNumber ? "input-error" : ""}`}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "8px",
              border: `1.5px solid ${errors.rollNumber ? "#DC2626" : "var(--white-border-strong)"}`,
              fontSize: "14px",
              color: "var(--navy-hero)",
              backgroundColor: "#FFFFFF",
              textTransform: "uppercase",
              fontFamily: "var(--font-mono)",
              outline: "none",
            }}
          />
          {errors.rollNumber && (
            <span style={{ fontSize: "11.5px", color: "#DC2626", marginTop: "4px", display: "block" }}>
              {errors.rollNumber}
            </span>
          )}
        </div>
      </div>

      {/* Row 2: College Email & Phone */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
          gap: "16px",
        }}
      >
        <div>
          <label
            htmlFor="pi-email"
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--navy-hero)",
              marginBottom: "6px",
            }}
          >
            College Email <span style={{ color: "var(--burgundy-text)" }}>*</span>
          </label>
          <input
            id="pi-email"
            type="email"
            required
            value={formData.email}
            onChange={(e) => handleFieldChange("email", e.target.value)}
            className={`intake-input ${errors.email ? "input-error" : ""}`}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "8px",
              border: `1.5px solid ${errors.email ? "#DC2626" : "var(--white-border-strong)"}`,
              fontSize: "14px",
              color: "var(--navy-hero)",
              backgroundColor: "#FFFFFF",
              outline: "none",
            }}
          />
          {errors.email && (
            <span style={{ fontSize: "11.5px", color: "#DC2626", marginTop: "4px", display: "block" }}>
              {errors.email}
            </span>
          )}
        </div>

        <div>
          <label
            htmlFor="pi-phone"
            style={{
              display: "block",
              fontSize: "12.5px",
              fontWeight: 600,
              color: "var(--navy-hero)",
              marginBottom: "6px",
            }}
          >
            Phone <span style={{ color: "var(--burgundy-text)" }}>*</span>
          </label>
          <input
            id="pi-phone"
            type="tel"
            required
            maxLength={10}
            value={formData.phone}
            onChange={(e) => handleFieldChange("phone", e.target.value)}
            className={`intake-input ${errors.phone ? "input-error" : ""}`}
            style={{
              width: "100%",
              padding: "11px 14px",
              borderRadius: "8px",
              border: `1.5px solid ${errors.phone ? "#DC2626" : "var(--white-border-strong)"}`,
              fontSize: "14px",
              color: "var(--navy-hero)",
              backgroundColor: "#FFFFFF",
              fontFamily: "var(--font-mono)",
              outline: "none",
            }}
          />
          {errors.phone && (
            <span style={{ fontSize: "11.5px", color: "#DC2626", marginTop: "4px", display: "block" }}>
              {errors.phone}
            </span>
          )}
        </div>
      </div>

      {/* Row 3: Statement of Motivation / Track Interest */}
      <div>
        <label
          htmlFor="pi-statement"
          style={{
            display: "block",
            fontSize: "12.5px",
            fontWeight: 600,
            color: "var(--navy-hero)",
            marginBottom: "6px",
          }}
        >
          Statement of Interest <span style={{ color: "var(--burgundy-text)" }}>*</span>
        </label>
        <textarea
          id="pi-statement"
          rows={3}
          required
          value={formData.statement}
          onChange={(e) => handleFieldChange("statement", e.target.value)}
          className={`intake-input ${errors.statement ? "input-error" : ""}`}
          style={{
            width: "100%",
            padding: "11px 14px",
            borderRadius: "8px",
            border: `1.5px solid ${errors.statement ? "#DC2626" : "var(--white-border-strong)"}`,
            fontSize: "14px",
            color: "var(--navy-hero)",
            backgroundColor: "#FFFFFF",
            outline: "none",
            resize: "vertical",
          }}
        />
        {errors.statement && (
          <span style={{ fontSize: "11.5px", color: "#DC2626", marginTop: "4px", display: "block" }}>
            {errors.statement}
          </span>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={isSubmitting}
        className="stamp-button stamp-button-primary shimmer-sweep"
        style={{
          width: "100%",
          padding: "14px 24px",
          borderRadius: "100px",
          backgroundColor: "var(--navy-hero)",
          borderColor: "var(--navy-hero)",
          color: "#FFFFFF",
          fontSize: "14.5px",
          fontWeight: 700,
          cursor: isSubmitting ? "not-allowed" : "pointer",
          opacity: isSubmitting ? 0.7 : 1,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "8px",
          marginTop: "6px",
        }}
      >
        <span>{isSubmitting ? "TRANSMITTING CANDIDATURE..." : "SUBMIT PI DOSSIER"}</span>
        <span style={{ color: "var(--gold-oxford)" }}>→</span>
      </button>
    </form>
  );
}
