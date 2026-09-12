"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import dynamic from "next/dynamic";
import { gallery, GalleryItem } from "@/content/gallery";
import CelebratingSuccessShowcase from "@/components/CelebratingSuccessShowcase";
import ScrollReveal from "@/components/ScrollReveal";

const LightboxModal = dynamic(() => import("@/components/LightboxModal"), {
  ssr: false,
});

export default function GalleryPage() {
  const [activeModalItem, setActiveModalItem] = useState<GalleryItem | null>(null);
  const [items, setItems] = useState<GalleryItem[]>(gallery.items);
  const [celebratingPhotos, setCelebratingPhotos] = useState<{ id: string; image: string }[]>([]);

  // Hydrate items dynamically from the Admin/Sheets API, fallback to default
  useEffect(() => {
    async function loadDynamicGallery() {
      try {
        const res = await fetch("/api/admin/gallery", { cache: "no-store" });
        if (res.ok) {
          const data = await res.json();
          const list = data.gallery || data.items;
          if (Array.isArray(list) && list.length > 0) {
            setItems(list);
          }
          const cs = data.celebratingSuccess;
          if (cs) {
            if (Array.isArray(cs.photos) && cs.photos.length > 0) {
              setCelebratingPhotos(cs.photos);
            } else if (cs.image) {
              setCelebratingPhotos([{ id: "cs-1", image: cs.image }]);
            }
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
          <div className="badge-pill hero-anim-badge">
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

          <h1 className="hero-title hero-anim-title" style={{ textAlign: "left", margin: 0 }}>
            {gallery.header.title}
          </h1>

          <p className="hero-subline hero-anim-sub" style={{ textAlign: "left", margin: "24px 0 0", maxWidth: "780px" }}>
            {gallery.header.subtitle}
          </p>
        </div>
      </section>

      {/* 2. CELEBRATING SUCCESS Showcase (Clean Laureates Podium Slider) */}
      <ScrollReveal direction="up" delay={40}>
        <CelebratingSuccessShowcase celebratingPhotos={celebratingPhotos} />
      </ScrollReveal>

      {/* 3. Pure Photo Gallery Grid (Archival Vault) */}
      <section className="section-pure-white" style={{ padding: "40px 0 90px" }}>
        <div className="container">
          <div className="gallery-photo-grid">
            {items.map((item, idx) => (
              <ScrollReveal key={item.id} direction="up" delay={idx * 30}>
                <div
                  onClick={() => setActiveModalItem(item)}
                  className="gallery-photo-tile gold-glow-hover shimmer-sweep"
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
                  {/* Pure Photo Image */}
                  <Image
                    src={item.image}
                    alt={item.title || "Finlogue gallery photograph"}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: "cover", transition: "transform 0.35s ease" }}
                  />

                  {/* Frosted Glass Caption Reveal on Hover */}
                  <div
                    className="gallery-frosted-caption"
                    style={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      right: 0,
                      padding: "10px 14px",
                      background: "rgba(7, 13, 30, 0.78)",
                      backdropFilter: "blur(10px)",
                      WebkitBackdropFilter: "blur(10px)",
                      borderTop: "1px solid rgba(197, 168, 128, 0.35)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      transform: "translateY(100%)",
                      opacity: 0,
                      transition: "transform 0.28s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.25s ease",
                      zIndex: 2,
                      pointerEvents: "none",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-sans)",
                        fontSize: "12px",
                        fontWeight: 500,
                        color: "#FFFFFF",
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        maxWidth: "85%",
                      }}
                    >
                      {item.title || "Finlogue Archive"}
                    </span>
                    <span
                      style={{
                        color: "var(--gold-oxford, #C5A880)",
                        fontSize: "13px",
                        lineHeight: 1,
                      }}
                    >
                      ↗
                    </span>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fullscreen Lightbox Modal (dynamically loaded when open) */}
      {activeModalItem && (
        <LightboxModal
          item={activeModalItem}
          items={items}
          onClose={() => setActiveModalItem(null)}
          onNavigate={(item) => setActiveModalItem(item)}
        />
      )}
    </main>
  );
}
