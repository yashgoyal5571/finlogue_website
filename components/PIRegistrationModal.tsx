"use client";

import React, { useEffect } from "react";
import PIRegistrationForm from "./PIRegistrationForm";

interface PIRegistrationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PIRegistrationModal({ isOpen, onClose }: PIRegistrationModalProps) {
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

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="pi-modal-title"
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 99999,
        backgroundColor: "rgba(3, 7, 18, 0.8)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "560px",
          backgroundColor: "#FFFFFF",
          borderRadius: "20px",
          border: "1.5px solid rgba(197, 168, 128, 0.4)",
          boxShadow: "0 25px 60px -12px rgba(7, 13, 30, 0.35)",
          maxHeight: "90vh",
          overflowY: "auto",
          position: "relative",
          padding: "clamp(24px, 4vw, 36px) clamp(20px, 3.5vw, 32px)",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Modal Close Button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close dialog"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
            width: "36px",
            height: "36px",
            borderRadius: "50%",
            border: "1px solid var(--white-border)",
            backgroundColor: "#F8FAFC",
            color: "var(--navy-hero)",
            fontSize: "18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            transition: "background-color 0.2s, color 0.2s",
          }}
        >
          ✕
        </button>

        {/* Modal Header */}
        <div style={{ marginBottom: "20px" }}>
          <div className="badge-pill" style={{ display: "inline-flex", marginBottom: "10px" }}>
            <span
              style={{
                width: "6px",
                height: "6px",
                borderRadius: "50%",
                backgroundColor: "var(--gold-oxford)",
                display: "inline-block",
              }}
            />
            <span style={{ fontSize: "10.5px" }}>RECRUITMENTS OPEN · Y26 COHORT</span>
          </div>

          <h2
            id="pi-modal-title"
            className="font-display-serif"
            style={{
              fontSize: "clamp(24px, 4vw, 30px)",
              color: "var(--navy-hero)",
              lineHeight: 1.2,
              margin: 0,
            }}
          >
            PI Registration
          </h2>

          <p style={{ fontSize: "13.5px", color: "#64748B", marginTop: "6px", lineHeight: 1.5 }}>
            Register your official candidature for the Finlogue interview panel.
          </p>
        </div>

        {/* Reusable Form */}
        <PIRegistrationForm isModal />
      </div>
    </div>
  );
}
