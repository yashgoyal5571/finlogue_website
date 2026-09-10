import React from "react";
import Link from "next/link";
import Image from "next/image";
import { home } from "@/content/home";
import InspirationalSpeakers from "@/components/InspirationalSpeakers";
import HeroParallax from "@/components/HeroParallax";
import MomentsAccordion from "@/components/MomentsAccordion";
import VenturesShowcase from "@/components/VenturesShowcase";

export const metadata = {
  title: "FINLOGUE — Finance & Strategy Cell | LNMIIT",
  description:
    "LNMIIT's premier student-run Finance and Corporate Strategy body. Catalyzing valuation research, quantitative case solving, and venture capital deployment.",
};

export default function HomePage() {
  return (
    <main style={{ flex: 1, width: "100%", overflow: "hidden" }}>
      {/* 1. HERO SECTION — Natural Parallax Drift (Blue Keynote Auditorium) */}
      <HeroParallax />

      {/* 2. ABOUT FINLOGUE (White section that smoothly glides above the hero) */}
      <section
        id="about-finlogue"
        className="section-pure-white"
        style={{
          position: "relative",
          zIndex: 10,
          backgroundColor: "#FFFFFF",
          padding: "90px 0 80px",
          scrollMarginTop: "72px",
          borderTopLeftRadius: "clamp(24px, 3.5vw, 40px)",
          borderTopRightRadius: "clamp(24px, 3.5vw, 40px)",
          marginTop: "-48px",
          boxShadow: "0 -20px 50px rgba(7, 13, 30, 0.12), 0 -4px 14px rgba(7, 13, 30, 0.05)",
          borderTop: "1px solid rgba(197, 168, 128, 0.35)",
        }}
      >
        <div className="container">
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
              gap: "48px",
              alignItems: "center",
            }}
          >
            {/* Left Content Column */}
            <div>
              <span className="section-badge" style={{ marginBottom: "14px" }}>
                ABOUT FINLOGUE · LNMIIT
              </span>
              <h2
                className="font-display-serif"
                style={{
                  fontSize: "clamp(30px, 3.5vw, 44px)",
                  color: "var(--navy-hero)",
                  lineHeight: 1.15,
                  marginBottom: "20px",
                  fontWeight: 700,
                }}
              >
                Catalyzing Valuation Research & Venture Strategy
              </h2>
              <p
                style={{
                  fontSize: "15.5px",
                  color: "#475569",
                  lineHeight: 1.7,
                  marginBottom: "18px",
                }}
              >
                Finlogue is the apex student-run Finance and Corporate Strategy body of The LNM Institute of Information Technology. We bridge the gap between academic theory and high-stakes market execution.
              </p>
              <p
                style={{
                  fontSize: "15px",
                  color: "#64748B",
                  lineHeight: 1.7,
                  marginBottom: "28px",
                }}
              >
                Through nationwide case challenges, live algorithmic trading simulations, equity research publications, and our flagship Pitch on the Rocks conclave, Finlogue nurtures the next generation of financial analysts, venture builders, and strategic leaders.
              </p>
              <div>
                <Link
                  href="/about"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="stamp-button stamp-button-primary"
                  style={{
                    padding: "12px 28px",
                    borderRadius: "100px",
                    fontSize: "14px",
                    display: "inline-flex",
                    alignItems: "center",
                    gap: "8px",
                    backgroundColor: "var(--navy-hero)",
                    color: "#FFFFFF",
                  }}
                >
                  <span>Discover Our Journey</span>
                  <span style={{ color: "var(--gold-oxford)" }}>→</span>
                </Link>
              </div>
            </div>

            {/* Right Media Placeholder Column */}
            <div
              style={{
                position: "relative",
                width: "100%",
                height: "380px",
                borderRadius: "20px",
                overflow: "hidden",
                boxShadow: "0 20px 40px -10px rgba(7, 13, 30, 0.2)",
                border: "1px solid rgba(7, 13, 30, 0.1)",
              }}
            >
              <Image
                src="/assets/gallery/summit-keynote.jpg"
                alt="Finlogue Strategic Conclave"
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                style={{ objectFit: "cover" }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  background:
                    "linear-gradient(180deg, rgba(7, 13, 30, 0.1) 0%, rgba(7, 13, 30, 0.6) 100%)",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  bottom: "20px",
                  left: "20px",
                  right: "20px",
                  color: "#FFFFFF",
                }}
              >
                <span
                  className="font-metadata-mono"
                  style={{
                    fontSize: "10.5px",
                    color: "var(--gold-oxford)",
                    letterSpacing: "0.1em",
                    display: "block",
                    marginBottom: "4px",
                  }}
                >
                  FLAGSHIP ANNUAL SYMPOSIUM
                </span>
                <h4 style={{ fontSize: "18px", fontWeight: 600 }}>
                  National Financial Conclave & Shark Arena
                </h4>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* 3. FLAGSHIP INITIATIVES & PROGRAMS — Architectural Alabaster (#F8FAFC) */}
      <section className="section-alabaster" id="initiatives">
        <div className="container">
          <div className="section-header">
            <span className="section-badge">CORE PROGRAMS & CONCLAVES</span>
            <h2 className="section-title">Flagship Initiatives</h2>
            <p className="section-sub">
              From our landmark annual venture conclave to rigorous corporate consulting leagues, discover the arenas where students and analysts test their mettle.
            </p>
          </div>

          <div className="grid-2">
            {home.initiatives.map((item) => {
              const accentMap: Record<string, string> = {
                potr: "accent-venture",
                "case-crackers": "accent-consulting",
                "valuation-lab": "accent-finance",
                "market-watch": "accent-consulting",
                "ma-simulation": "accent-venture",
              };
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`initiative-card ${accentMap[item.id] ?? ""}`}
                  style={{
                    textDecoration: "none",
                    color: "inherit",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    transition: "transform 0.2s ease, box-shadow 0.2s ease",
                  }}
                >
                  <div>
                    <h3 className="initiative-title">{item.title}</h3>
                    <p className="initiative-desc">{item.description}</p>
                  </div>

                  <div className="initiative-footer" style={{ display: "flex", alignItems: "center" }}>
                    <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)" }}>
                      {item.metrics}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>

          <div style={{ marginTop: "44px", textAlign: "center" }}>
            <Link
              href="/events"
              className="stamp-button"
              style={{ borderColor: "var(--navy-hero)", color: "var(--navy-hero)" }}
            >
              <span>VIEW FULL CALENDAR & EVENT SCHEDULE</span>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. ABOUT & PILLARS SNAPSHOT — Deep Midnight Navy Anchor (#070D1E) */}
      <section className="section-navy-dark">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "start", gap: "48px" }}>
            <div>
              <span className="section-badge">FOUNDATIONAL PILLARS</span>
              <h2 className="section-title">Built to Bridge Theory & Execution</h2>
              <p className="section-sub" style={{ marginTop: "20px" }}>
                We reject passive learning. Finlogue operates as an independent house structured around four specialized divisions that mirror top-tier investment banks, strategic consultancies, and venture accelerators.
              </p>

              <div style={{ marginTop: "32px" }}>
                <Link
                  href="/about"
                  className="stamp-button"
                >
                  <span>READ OUR FULL CHARTER & ORIGIN</span>
                </Link>
              </div>
            </div>

            <div className="grid-2">
              {home.pillars.map((pillar) => (
                <div key={pillar.id} className="pillar-card">
                  <span className="pillar-num">PILLAR {pillar.number}</span>
                  <h3 className="pillar-title">{pillar.title}</h3>
                  <p className="pillar-blurb">{pillar.blurb}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSPIRATIONAL SPEAKERS & TESTIMONIALS (matching ecell reference) */}
      <section className="section-pure-white">
        <div className="container">
          <div className="section-header">
            <h2
              className="font-display-serif"
              style={{
                fontSize: "clamp(32px, 4vw, 44px)",
                color: "var(--navy-hero)",
                textTransform: "uppercase",
                letterSpacing: "0.04em",
                marginBottom: "12px",
              }}
            >
              INSPIRATIONAL SPEAKERS
            </h2>
            <p className="section-sub" style={{ maxWidth: "680px", margin: "0 auto" }}>
              Discover the influential venture capitalists, investors, and corporate leaders who have shared their wisdom and market insights at Finlogue conclaves.
            </p>
          </div>

          {/* Multi-Card Sliding Carousel with Hover Animations + Testimonial Block */}
          <InspirationalSpeakers speakers={home.speakersMentors} />
        </div>
      </section>

      {/* 6. MOMENTS & ARCHIVAL VAULT PREVIEW — Deep Midnight Navy Frame (#0A1329) */}
      <section className="section-navy-dark">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "24px",
              marginBottom: "48px",
            }}
          >
            <div>
              <span className="section-badge">ARCHIVAL MOMENTS</span>
              <h2 className="section-title">Moments From the Arena</h2>
              <p className="section-sub" style={{ maxWidth: "560px" }}>
                Snapshots of high-stakes founder pitches, auditorium keynotes, and national case competition victories.
              </p>
            </div>

            <Link
              href="/gallery"
              className="stamp-button"
            >
              <span>VIEW FULL GALLERY</span>
            </Link>
          </div>

          {/* Interactive Stretching Moments Accordion with Vertical Labels & Hover Reveal */}
          <MomentsAccordion />
        </div>
      </section>

      {/* 7. VENTURES SHOWCASE — 3D Squircle Logo System */}
      <VenturesShowcase />
    </main>
  );
}
