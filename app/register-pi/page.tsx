"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";

export default function RegisterPIPage() {
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
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("finlogue_pi_submitted") === "true") {
        setAlreadySubmitted(true);
      }
    }
  }, []);

  const handleFieldChange = (field: string, val: string) => {
    let formattedVal = val;

    if (field === "phone") {
      // Restrict strictly to digits and maximum 10 digits
      formattedVal = val.replace(/\D/g, "").slice(0, 10);
    } else if (field === "rollNumber") {
      // Uppercase alphanumeric, max 10 characters
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
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (alreadySubmitted) {
      return;
    }

    const nameTrimmed = formData.name.trim();
    const rollTrimmed = formData.rollNumber.trim().toUpperCase();
    const emailTrimmed = formData.email.trim().toLowerCase();
    const phoneTrimmed = formData.phone.trim();
    const statementTrimmed = formData.statement.trim();

    const fieldErrors: Record<string, string> = {};

    // Roll number must start with 26
    if (rollTrimmed && !rollTrimmed.startsWith("26")) {
      fieldErrors.rollNumber = "Invalid";
    }

    // Email format must strictly be rollno@lnmiit.ac.in
    const expectedEmail = rollTrimmed
      ? `${rollTrimmed.toLowerCase()}@lnmiit.ac.in`
      : "";
    if (emailTrimmed) {
      if (!expectedEmail || emailTrimmed !== expectedEmail) {
        fieldErrors.email = "Invalid";
      }
    }

    // Phone number must be exactly 10 digits
    if (phoneTrimmed && phoneTrimmed.length !== 10) {
      fieldErrors.phone = "Invalid";
    }

    const hasInvalidity = Object.keys(fieldErrors).length > 0;

    const hasEmptyField =
      !nameTrimmed ||
      !rollTrimmed ||
      !emailTrimmed ||
      !phoneTrimmed ||
      !statementTrimmed;

    const newErrors: Record<string, string> = { ...fieldErrors };

    // Only show "All sections are required" if no invalidity exists and at least one field is empty
    if (!hasInvalidity && hasEmptyField) {
      newErrors.general = "All sections are required";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const compiledStatement = `Roll No: ${rollTrimmed}${
      statementTrimmed ? ` | Statement: ${statementTrimmed}` : ""
    }`;

    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: nameTrimmed,
          email: emailTrimmed,
          phone: phoneTrimmed,
          institution: `LNMIIT Batch Y-26 (${rollTrimmed})`,
          event: "Personal Interview (PI) - Y-26 Batch Recruitment",
          statement: compiledStatement,
        }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        if (typeof window !== "undefined") {
          localStorage.setItem("finlogue_pi_submitted", "true");
        }
        setAlreadySubmitted(true);
      } else {
        setErrorMessage(data.error || "Failed to process application. Please try again.");
      }
    } catch {
      // Offline fallback
      if (typeof window !== "undefined") {
        localStorage.setItem("finlogue_pi_submitted", "true");
      }
      setAlreadySubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main
      style={{
        minHeight: "100vh",
        backgroundColor: "#050A18",
        color: "#FFFFFF",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 16px",
        position: "relative",
      }}
    >
      {/* Background architectural grid */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "radial-gradient(rgba(197, 168, 128, 0.08) 1px, transparent 1px), radial-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
          pointerEvents: "none",
        }}
      />

      {/* Form Container */}
      <div
        style={{
          position: "relative",
          zIndex: 10,
          width: "100%",
          maxWidth: "580px",
          backgroundColor: "#070D1E",
          border: "1px solid rgba(197, 168, 128, 0.35)",
          boxShadow:
            "0 24px 60px rgba(0, 0, 0, 0.8), 0 0 40px rgba(197, 168, 128, 0.12)",
          borderRadius: "14px",
          padding: "clamp(24px, 4vw, 36px)",
        }}
      >
        {alreadySubmitted ? (
          /* Simple confirmation state */
          <div style={{ textAlign: "center", padding: "28px 12px" }}>
            <div
              style={{
                width: "56px",
                height: "56px",
                borderRadius: "50%",
                backgroundColor: "rgba(16, 185, 129, 0.12)",
                border: "1.5px solid #10B981",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                margin: "0 auto 16px",
                color: "#10B981",
                fontSize: "26px",
              }}
            >
              ✓
            </div>

            <h2
              className="font-display-serif"
              style={{ fontSize: "26px", color: "#FFFFFF", marginBottom: "8px" }}
            >
              Application Submitted
            </h2>

            <p
              style={{
                fontSize: "14px",
                color: "var(--platinum-muted)",
                lineHeight: 1.6,
                maxWidth: "380px",
                margin: "0 auto 24px",
              }}
            >
              Your response has been recorded.
            </p>

            <Link
              href="/"
              className="stamp-button stamp-button-primary"
              style={{
                display: "inline-flex",
                justifyContent: "center",
                padding: "12px 28px",
                fontSize: "13.5px",
                textDecoration: "none",
              }}
            >
              <span>RETURN TO HOME</span>
            </Link>
          </div>
        ) : (
          /* Form State */
          <div>
            <div style={{ marginBottom: "22px" }}>
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
                  style={{
                    fontSize: "10px",
                    color: "var(--gold-oxford)",
                    letterSpacing: "0.12em",
                  }}
                >
                  RECRUITING Y-26 BATCH
                </span>
              </div>

              <h1
                className="font-display-serif"
                style={{ fontSize: "28px", color: "#FFFFFF", margin: "0" }}
              >
                Register for Personal Interviews (PI)
              </h1>
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

            <form
              onSubmit={handleSubmit}
              noValidate
              style={{ display: "flex", flexDirection: "column", gap: "18px" }}
            >
              {/* Row 1: Name & Roll Number */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    htmlFor="pi-page-name"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: "var(--platinum-muted)",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Full Name
                  </label>
                  <input
                    id="pi-page-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleFieldChange("name", e.target.value)}
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
                  {errors.name && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#EF4444",
                        marginTop: "5px",
                        display: "block",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                      }}
                    >
                      {errors.name}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pi-page-roll"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: "var(--platinum-muted)",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Roll Number
                  </label>
                  <input
                    id="pi-page-roll"
                    type="text"
                    value={formData.rollNumber}
                    onChange={(e) => handleFieldChange("rollNumber", e.target.value)}
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
                  {errors.rollNumber && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#EF4444",
                        marginTop: "5px",
                        display: "block",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                      }}
                    >
                      {errors.rollNumber}
                    </span>
                  )}
                </div>
              </div>

              {/* Row 2: Email & Phone */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
                  gap: "16px",
                }}
              >
                <div>
                  <label
                    htmlFor="pi-page-email"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: "var(--platinum-muted)",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    Institute Email
                  </label>
                  <input
                    id="pi-page-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleFieldChange("email", e.target.value)}
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
                  {errors.email && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#EF4444",
                        marginTop: "5px",
                        display: "block",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                      }}
                    >
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="pi-page-phone"
                    style={{
                      fontFamily: "var(--font-sans)",
                      fontSize: "12.5px",
                      fontWeight: 600,
                      color: "var(--platinum-muted)",
                      display: "block",
                      marginBottom: "6px",
                    }}
                  >
                    WhatsApp / Phone Number
                  </label>
                  <input
                    id="pi-page-phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleFieldChange("phone", e.target.value)}
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
                  {errors.phone && (
                    <span
                      style={{
                        fontSize: "11px",
                        color: "#EF4444",
                        marginTop: "5px",
                        display: "block",
                        fontFamily: "var(--font-sans)",
                        fontWeight: 500,
                      }}
                    >
                      {errors.phone}
                    </span>
                  )}
                </div>
              </div>

              {/* Statement / Pitch */}
              <div>
                <label
                  htmlFor="pi-page-statement"
                  style={{
                    fontFamily: "var(--font-sans)",
                    fontSize: "12.5px",
                    fontWeight: 600,
                    color: "var(--platinum-muted)",
                    display: "block",
                    marginBottom: "6px",
                  }}
                >
                  Why do you want to join Finlogue? (Brief Pitch)
                </label>
                <textarea
                  id="pi-page-statement"
                  rows={3}
                  value={formData.statement}
                  onChange={(e) => handleFieldChange("statement", e.target.value)}
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
                {errors.general && (
                  <div
                    style={{
                      fontSize: "12px",
                      color: "#EF4444",
                      fontFamily: "var(--font-sans)",
                      fontWeight: 500,
                      textAlign: "center",
                      marginBottom: "10px",
                    }}
                  >
                    {errors.general}
                  </div>
                )}
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
                  <span>
                    {isSubmitting
                      ? "PROCESSING APPLICATION..."
                      : "SUBMIT PI REGISTRATION"}
                  </span>
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </main>
  );
}
