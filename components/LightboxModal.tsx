"use client";

import React, { useEffect } from "react";
import Image from "next/image";

export interface LightboxItem {
  id: string;
  image: string;
  title?: string;
  category?: string;
  date?: string;
  location?: string;
  description?: string;
  tag?: string;
}

interface LightboxModalProps<T extends LightboxItem = LightboxItem> {
  item: T | null;
  items?: T[];
  onClose: () => void;
  onNavigate?: (item: T) => void;
}

export default function LightboxModal<T extends LightboxItem = LightboxItem>({
  item,
  items = [],
  onClose,
  onNavigate,
}: LightboxModalProps<T>) {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      } else if (e.key === "ArrowRight" && items.length > 0 && item && onNavigate) {
        const idx = items.findIndex((it) => it.id === item.id);
        if (idx !== -1) {
          const nextIdx = (idx + 1) % items.length;
          onNavigate(items[nextIdx]);
        }
      } else if (e.key === "ArrowLeft" && items.length > 0 && item && onNavigate) {
        const idx = items.findIndex((it) => it.id === item.id);
        if (idx !== -1) {
          const prevIdx = (idx - 1 + items.length) % items.length;
          onNavigate(items[prevIdx]);
        }
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
  }, [item, items, onClose, onNavigate]);

  if (!item) return null;

  const currentIndex = items.findIndex((it) => it.id === item.id);

  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (items.length > 0 && onNavigate) {
      const prevIdx = (currentIndex - 1 + items.length) % items.length;
      onNavigate(items[prevIdx]);
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (items.length > 0 && onNavigate) {
      const nextIdx = (currentIndex + 1) % items.length;
      onNavigate(items[nextIdx]);
    }
  };

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Expanded Photo"
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(5, 10, 24, 0.95)",
        backdropFilter: "blur(14px)",
        zIndex: 1000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "clamp(16px, 3vw, 32px)",
      }}
    >
      {/* Top Floating Close Button */}
      <button
        type="button"
        onClick={onClose}
        style={{
          position: "fixed",
          top: "20px",
          right: "24px",
          color: "#FFFFFF",
          background: "rgba(255, 255, 255, 0.12)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          borderRadius: "50%",
          width: "40px",
          height: "40px",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "18px",
          cursor: "pointer",
          transition: "background 0.2s ease, transform 0.2s ease",
          zIndex: 1010,
        }}
        aria-label="Close photo"
      >
        ✕
      </button>

      {/* Pure Expanded Image Dialog without any text header or footer */}
      <div
        className="lightbox-dialog"
        onClick={(e) => e.stopPropagation()}
        style={{
          position: "relative",
          width: "100%",
          maxWidth: "1100px",
          height: "clamp(340px, 80vh, 760px)",
          backgroundColor: "#000000",
          border: "1.5px solid rgba(255, 255, 255, 0.12)",
          borderRadius: "10px",
          overflow: "hidden",
          boxShadow: "0 28px 70px rgba(0, 0, 0, 0.85)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {/* Full Image */}
        <Image
          src={item.image}
          alt={item.title || "Expanded photograph"}
          fill
          sizes="(max-width: 1200px) 100vw, 1100px"
          style={{ objectFit: "contain" }}
          priority
        />

        {/* Prev Arrow */}
        {items.length > 1 && onNavigate && (
          <button
            type="button"
            onClick={handlePrev}
            style={{
              position: "absolute",
              left: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(7, 13, 30, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s ease, transform 0.2s ease",
              zIndex: 10,
            }}
            aria-label="Previous photo"
          >
            ❮
          </button>
        )}

        {/* Next Arrow */}
        {items.length > 1 && onNavigate && (
          <button
            type="button"
            onClick={handleNext}
            style={{
              position: "absolute",
              right: "16px",
              top: "50%",
              transform: "translateY(-50%)",
              width: "44px",
              height: "44px",
              borderRadius: "50%",
              backgroundColor: "rgba(7, 13, 30, 0.75)",
              border: "1px solid rgba(255, 255, 255, 0.25)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
              transition: "background 0.2s ease, transform 0.2s ease",
              zIndex: 10,
            }}
            aria-label="Next photo"
          >
            ❯
          </button>
        )}
      </div>
    </div>
  );
}
