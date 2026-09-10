"use client";

import React, { useState } from "react";
import Image from "next/image";
import LightboxModal, { LightboxItem } from "@/components/LightboxModal";

interface MomentItem {
  id: string;
  name: string;
  oneLiner: string;
  image: string;
  tag: string;
  category: string;
  date: string;
  location: string;
}

const MOMENTS: MomentItem[] = [
  {
    id: "gal-01",
    name: "GLOBAL CONCLAVE",
    oneLiner:
      "Finlogue's annual flagship symposium convening 600+ student analysts, venture founders, and market leaders.",
    image: "/assets/gallery/summit-keynote.jpg",
    tag: "KEYNOTE ADDRESS",
    category: "Keynotes",
    date: "Spring 2026",
    location: "Grand Auditorium",
  },
  {
    id: "gal-02",
    name: "VENTURE PITCH",
    oneLiner:
      "High-stakes startup diligence where early-stage founders pitch unit economics directly to active institutional VCs.",
    image: "/assets/gallery/pitch-session.jpg",
    tag: "VENTURE PITCH",
    category: "Pitch Sessions",
    date: "Autumn 2025",
    location: "Executive Conclave Hall",
  },
  {
    id: "gal-03",
    name: "CASE LEAGUE",
    oneLiner:
      "National business turnaround championship conquered after 48 hours of uninterrupted financial modeling and strategy.",
    image: "/assets/gallery/award-ceremony.jpg",
    tag: "HONORS & VICTORY",
    category: "Summits",
    date: "Winter 2025",
    location: "Main Stage",
  },
  {
    id: "gal-04",
    name: "NETWORKING",
    oneLiner:
      "High-trust ecosystem exchange connecting senior corporate partners, student analysts, and venture syndicates.",
    image: "/assets/gallery/networking-hall.jpg",
    tag: "ECOSYSTEM EXCHANGE",
    category: "Community",
    date: "Spring 2026",
    location: "Executive Lounge",
  },
];

export default function MomentsAccordion() {
  // NONE of the photos are expanded by default
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [modalItem, setModalItem] = useState<LightboxItem | null>(null);

  const handleCardClick = (index: number, item: MomentItem) => {
    if (activeIdx !== index) {
      setActiveIdx(index);
    } else {
      // Optional lightbox if clicked again in expanded state
      setModalItem({
        id: item.id,
        title: item.name,
        category: item.category,
        image: item.image,
        date: item.date,
        location: item.location,
        description: item.oneLiner,
        tag: item.tag,
      });
    }
  };

  return (
    <>
      <div className="moments-accordion-wrapper">
        <div
          className="moments-accordion-container"
          role="region"
          aria-label="Moments From the Arena Gallery"
          onMouseLeave={() => setActiveIdx(null)}
        >
          {MOMENTS.map((item, index) => {
            const isExpanded = activeIdx === index;
            const hasActive = activeIdx !== null;

            return (
              <div
                key={item.id}
                className={`moments-accordion-panel ${
                  isExpanded ? "is-expanded" : hasActive ? "is-compressed" : "is-idle"
                }`}
                onMouseEnter={() => setActiveIdx(index)}
                onClick={() => handleCardClick(index, item)}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    handleCardClick(index, item);
                  }
                }}
                role="button"
                aria-expanded={isExpanded}
                aria-label={`${item.name} - ${isExpanded ? item.oneLiner : "Hover to expand"}`}
              >
                {/* Background Photo */}
                <div className="moments-accordion-image-wrap">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 60vw"
                    style={{
                      objectFit: "cover",
                      objectPosition: "center",
                    }}
                    priority={index < 2}
                  />
                  {/* Dark Vignette Overlay */}
                  <div className="moments-accordion-vignette" />
                  {/* Deep Contrast Overlay on Expanded */}
                  <div className="moments-accordion-gradient" />
                </div>

                {/* Event Name Title: In compacted form it sits vertical, on hover it smoothly rotates & slides to horizontal! */}
                <div className="moments-accordion-title-box">
                  <h3 className="moments-accordion-event-name">{item.name}</h3>
                </div>

                {/* Single One-Liner Description (fades in cleanly below the horizontal title) */}
                <div className="moments-accordion-one-liner-wrap" aria-hidden={!isExpanded}>
                  <p className="moments-accordion-one-liner">{item.oneLiner}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile helper hint */}
        <div className="moments-accordion-mobile-hint">
          <span>Tap any panel to expand moment</span>
        </div>
      </div>

      {/* Fullscreen Lightbox Modal (if opened) */}
      {modalItem && (
        <LightboxModal item={modalItem} onClose={() => setModalItem(null)} />
      )}
    </>
  );
}
