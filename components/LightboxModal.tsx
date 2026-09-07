"use client";

import React, { useEffect } from "react";
import Image from "next/image";

export interface LightboxItem {
  id: string;
  title: string;
  category: string;
  image: string;
  date: string;
  location: string;
  description: string;
  tag: string;
}

interface LightboxModalProps {
  item: LightboxItem | null;
  onClose: () => void;
}

export default function LightboxModal({ item, onClose }: LightboxModalProps) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };
    if (item) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [item, onClose]);

  if (!item) return null;

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label={item.title}
    >
      <div
        style={{ position: "fixed", inset: 0 }}
        onClick={onClose}
        aria-hidden="true"
      />

      <div className="lightbox-dialog" style={{ position: "relative", zIndex: 10 }}>
        {/* Header Bar */}
        <div className="lightbox-header">
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <span
              className="font-metadata-mono"
              style={{
                fontSize: "11px",
                color: "var(--gold)",
                border: "1px solid var(--gold-border)",
                padding: "2px 8px",
                textTransform: "uppercase",
              }}
            >
              {item.tag}
            </span>
            <span
              className="font-metadata-mono"
              style={{ fontSize: "12px", color: "var(--parchment-muted)" }}
            >
              {item.category} · {item.date}
            </span>
          </div>

          <button
            type="button"
            onClick={onClose}
            style={{
              color: "var(--parchment-muted)",
              fontSize: "18px",
              padding: "4px 8px",
              lineHeight: 1,
            }}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Media Frame */}
        <div className="lightbox-media">
          <Image
            src={item.image}
            alt={item.title}
            fill
            sizes="(max-width: 1024px) 100vw, 900px"
            style={{ objectFit: "contain" }}
            priority
          />
        </div>

        {/* Details Footer */}
        <div className="lightbox-body">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "baseline",
              gap: "16px",
              flexWrap: "wrap",
              marginBottom: "12px",
            }}
          >
            <h3 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ivory)" }}>
              {item.title}
            </h3>
            <span
              className="font-metadata-mono"
              style={{ fontSize: "12px", color: "var(--gold)" }}
            >
              📍 {item.location}
            </span>
          </div>

          <p style={{ fontSize: "14px", color: "var(--parchment-muted)", lineHeight: 1.6 }}>
            {item.description}
          </p>
        </div>
      </div>
    </div>
  );
}
