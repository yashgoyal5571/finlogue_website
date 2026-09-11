"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { gallery, GalleryItem } from "@/content/gallery";
import LightboxModal from "@/components/LightboxModal";
import CelebratingSuccessShowcase from "@/components/CelebratingSuccessShowcase";

export default function GalleryPage() {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(gallery.items);

  // Hydrate items dynamically from the Admin/Sheets API, fallback to default
  useEffect(() => {
    async function loadDynamicGallery() {
      try {
        const res = await fetch("/api/admin/gallery");
        if (res.ok) {
          const data = await res.json();
          const list = data.gallery || data.items;
          if (Array.isArray(list) && list.length > 0) {
            setItems(list);
          }
        }
      } catch (err) {
        console.warn("Using offline fallback gallery items:", err);
      }
    }
    loadDynamicGallery();
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

      {/* 2. CELEBRATING SUCCESS Showcase (Continuous Marquee + Rotating Stage Slider with Clean One-Liner) */}
      <CelebratingSuccessShowcase galleryItems={items} />

      {/* 3. Pure Photo Gallery Grid (Placed BELOW Celebrating Success — E-Cell Clean Photo Grid Style) */}
      <section className="section-pure-white" style={{ padding: "40px 0 90px" }}>
        <div className="container">
          {/* 4-Column Pure Photo Grid (Clean Borders, Pure Photos, No Text/Overlay, Click to Expand) */}
          <div
            className="gallery-photo-grid"
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: "18px",
            }}
          >
            {items.map((item) => (
              <div
                key={item.id}
                onClick={() => setActiveModalItem(item)}
                className="gallery-photo-tile"
                style={{
                  position: "relative",
                  width: "100%",
                  aspectRatio: "16 / 10.5",
                  borderRadius: "8px",
                  overflow: "hidden",
                  border: "1.5px solid var(--white-border-strong)",
                  backgroundColor: "var(--navy-deep)",
                  boxShadow: "0 4px 16px rgba(7, 13, 30, 0.08)",
                  cursor: "pointer",
                  transition: "transform 0.25s ease, box-shadow 0.25s ease, border-color 0.25s ease",
                }}
              >
                {/* Pure Photo Image — No overlay text, no expand badge */}
                <Image
                  src={item.image}
                  alt={item.title || "Finlogue gallery photograph"}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  style={{ objectFit: "cover", transition: "transform 0.35s ease" }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Embedded CSS for hover and responsive 4-column layout */}
        <style jsx>{`
          .gallery-photo-tile:hover {
            transform: translateY(-4px);
            box-shadow: 0 12px 28px rgba(7, 13, 30, 0.16);
            border-color: var(--gold-oxford);
          }
          .gallery-photo-tile:hover img {
            transform: scale(1.04);
          }
          @media (max-width: 1024px) {
            .gallery-photo-grid {
              grid-template-columns: repeat(2, 1fr) !important;
              gap: 14px !important;
            }
          }
          @media (max-width: 640px) {
            .gallery-photo-grid {
              grid-template-columns: 1fr !important;
              gap: 12px !important;
            }
          }
        `}</style>
      </section>

      {/* Fullscreen Lightbox Modal with Next/Prev and Full View */}
      <LightboxModal
        item={activeModalItem}
        items={items}
        onClose={() => setActiveModalItem(null)}
        onNavigate={(item) => setActiveModalItem(item)}
      />
    </main>
  );
}
