"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { gallery, GalleryItem } from "@/content/gallery";
import LightboxModal from "@/components/LightboxModal";

export default function GalleryPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);

  const filteredItems = gallery.items.filter((item) => {
    if (selectedCategory === "All") return true;
    return item.category === selectedCategory;
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
            <span>{gallery.header.badge}</span>
          </div>

          <h1 className="hero-title" style={{ textAlign: "left", margin: 0 }}>
            {gallery.header.title}
          </h1>

          <p className="hero-subline" style={{ textAlign: "left", margin: "24px 0 0", maxWidth: "780px" }}>
            {gallery.header.subtitle}
          </p>
        </div>
      </section>

      {/* 2. Filter Bar & Media Archive Grid — Crisp Pure White (#FFFFFF) */}
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
            {gallery.categories.map((cat) => {
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

          {/* Media Grid */}
          <div className="grid-3" style={{ marginBottom: "20px" }}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="gallery-card"
              >
                {/* Image Frame */}
                <div className="gallery-frame">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    style={{ objectFit: "cover" }}
                  />
                  <span className="gallery-tag">{item.tag}</span>
                </div>

                {/* Text Meta Content */}
                <div className="gallery-content">
                  <div>
                    <div className="gallery-meta">
                      <span style={{ color: "var(--burgundy-crest)", fontWeight: 600 }}>{item.category}</span>
                      <span>{item.date}</span>
                    </div>

                    <h3 className="gallery-title">{item.title}</h3>

                    <p style={{ fontSize: "14px", color: "var(--ink-body)", marginTop: "10px", lineHeight: 1.55 }}>
                      {item.description}
                    </p>
                  </div>

                  <div
                    style={{
                      marginTop: "20px",
                      paddingTop: "14px",
                      borderTop: "1px solid var(--white-border)",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      fontFamily: "var(--font-mono)",
                      fontSize: "11px",
                      color: "var(--ink-muted)",
                    }}
                  >
                    <span>📍 {item.location}</span>
                    <span style={{ color: "var(--navy-hero)", fontWeight: 600 }}>Expand Photo →</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Bottom Submit Footage Box — Deep Midnight Navy (#070D1E) */}
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
                Are you an attendee with photos from our past conclaves?
              </h3>
              <p style={{ fontSize: "14.5px", color: "var(--platinum-muted)", marginTop: "6px" }}>
                Submit your event captures to be cataloged in the official Finlogue Visual Vault.
              </p>
            </div>
            <Link
              href="/contact"
              className="stamp-button stamp-button-primary"
            >
              <span>SUBMIT ARCHIVE ASSETS</span>
            </Link>
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal */}
      <LightboxModal
        item={activeModalItem}
        onClose={() => setActiveModalItem(null)}
      />
    </main>
  );
}
