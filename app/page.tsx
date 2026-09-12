import React from "react";
import Link from "next/link";
import Image from "next/image";
import { home as defaultHome } from "@/content/home";
import { getCmsData } from "@/lib/cms";
import InspirationalSpeakers from "@/components/InspirationalSpeakers";
import HeroParallax from "@/components/HeroParallax";
import MomentsAccordion from "@/components/MomentsAccordion";
import VenturesShowcase from "@/components/VenturesShowcase";

import ScrollReveal from "@/components/ScrollReveal";

export const metadata = {
  title: "FINLOGUE — Finance & Strategy Cell | LNMIIT",
  description:
    "LNMIIT's premier student-run Finance and Corporate Strategy body. Catalyzing valuation research, quantitative case solving, and venture capital deployment.",
};

export default async function HomePage() {
  const cms = await getCmsData();
  const home = cms.home || defaultHome;

  return (
    <main style={{ flex: 1, width: "100%", overflow: "hidden" }}>
      {/* 1. HERO SECTION — Natural Parallax Drift (Blue Keynote Auditorium) */}
      <HeroParallax hero={home.hero} />

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
              gridTemplateColumns: "repeat(auto-fit, minmax(min(100%, 300px), 1fr))",
              gap: "40px",
              alignItems: "center",
            }}
          >
            {/* Left Content Column */}
            <ScrollReveal direction="up" delay={50}>
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
                    className="stamp-button stamp-button-primary shimmer-sweep"
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
                    <span className="btn-arrow" style={{ color: "var(--gold-oxford)" }}>→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            {/* Right Media Placeholder Column */}
            <ScrollReveal direction="up" delay={180}>
              <div
                className="gold-glow-hover"
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
                  src="/assets/gallery/potr-pitch-stage.jpg"
                  alt="Pitch on the Rocks Live Presentation Stage"
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  style={{ objectFit: "cover", objectPosition: "center 38%" }}
                />
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(180deg, rgba(7, 13, 30, 0.04) 0%, rgba(7, 13, 30, 0.65) 100%)",
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
                    Pitch On The Rocks (POTR) Shark Conclave
                  </h4>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </div>
      </section>


      {/* 3. FLAGSHIP INITIATIVES & PROGRAMS — Architectural Alabaster (#F8FAFC) */}
      <section className="section-alabaster" id="initiatives">
        <div className="container">
          <ScrollReveal direction="up" delay={50}>
            <div className="section-header">
              <span className="section-badge">CORE PROGRAMS & CONCLAVES</span>
              <h2 className="section-title">Flagship Initiatives</h2>
              <p className="section-sub">
                From our landmark annual venture conclave to rigorous corporate consulting leagues, discover the arenas where students and analysts test their mettle.
              </p>
            </div>
          </ScrollReveal>

          <div className="grid-2">
            {home.initiatives.map((item, idx) => {
              const accentMap: Record<string, string> = {
                potr: "accent-venture",
                "case-crackers": "accent-consulting",
                "valuation-lab": "accent-finance",
                "market-watch": "accent-consulting",
                "ma-simulation": "accent-venture",
              };
              return (
                <ScrollReveal key={item.id} direction="up" delay={idx * 75}>
                  <Link
                    href={item.href}
                    className={`initiative-card gold-glow-hover shimmer-sweep ${accentMap[item.id] ?? ""}`}
                    style={{
                      textDecoration: "none",
                      color: "inherit",
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                      cursor: "pointer",
                      height: "100%",
                    }}
                  >
                    <div>
                      <h3 className="initiative-title">{item.title}</h3>
                      <p className="initiative-desc">{item.description}</p>
                    </div>
                  </Link>
                </ScrollReveal>
              );
            })}
          </div>

          <ScrollReveal direction="up" delay={200}>
            <div style={{ marginTop: "44px", textAlign: "center" }}>
              <Link
                href="/events"
                className="stamp-button shimmer-sweep"
                style={{ borderColor: "var(--navy-hero)", color: "var(--navy-hero)" }}
              >
                <span>VIEW FULL CALENDAR & EVENT SCHEDULE</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* 4. ABOUT & PILLARS SNAPSHOT — Deep Midnight Navy Anchor (#070D1E) */}
      <section className="section-navy-dark">
        <div className="container">
          <div className="grid-2" style={{ alignItems: "start", gap: "48px" }}>
            <ScrollReveal direction="up" delay={50}>
              <div>
                <span className="section-badge">FOUNDATIONAL PILLARS</span>
                <h2 className="section-title">Built to Bridge Theory & Execution</h2>
                <p className="section-sub" style={{ marginTop: "20px" }}>
                  We reject passive learning. Finlogue operates as an independent house structured around four specialized divisions that mirror top-tier investment banks, strategic consultancies, and venture accelerators.
                </p>

                <div style={{ marginTop: "32px" }}>
                  <Link
                    href="/about"
                    className="stamp-button shimmer-sweep"
                  >
                    <span>READ OUR FULL CHARTER & ORIGIN</span>
                    <span className="btn-arrow">→</span>
                  </Link>
                </div>
              </div>
            </ScrollReveal>

            <div className="grid-2">
              {home.pillars.map((pillar, idx) => (
                <ScrollReveal key={pillar.id} direction="up" delay={idx * 80}>
                  <div className="pillar-card gold-glow-hover" style={{ height: "100%" }}>
                    <span className="pillar-num">PILLAR {pillar.number}</span>
                    <h3 className="pillar-title">{pillar.title}</h3>
                    <p className="pillar-blurb">{pillar.blurb}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. INSPIRATIONAL SPEAKERS & TESTIMONIALS (matching ecell reference) */}
      <section className="section-pure-white">
        <div className="container">
          <ScrollReveal direction="up" delay={50}>
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
          </ScrollReveal>

          {/* Multi-Card Sliding Carousel with Hover Animations + Testimonial Block */}
          <ScrollReveal direction="up" delay={120}>
            <InspirationalSpeakers speakers={home.speakersMentors} />
          </ScrollReveal>
        </div>
      </section>

      {/* 6. MOMENTS & ARCHIVAL VAULT PREVIEW — Deep Midnight Navy Frame (#0A1329) */}
      <section className="section-navy-dark">
        <div className="container">
          <ScrollReveal direction="up" delay={50}>
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
                className="stamp-button shimmer-sweep"
              >
                <span>VIEW FULL GALLERY</span>
                <span className="btn-arrow">→</span>
              </Link>
            </div>
          </ScrollReveal>

          {/* Interactive Stretching Moments Accordion with Vertical Labels & Hover Reveal */}
          <ScrollReveal direction="up" delay={120}>
            <MomentsAccordion />
          </ScrollReveal>
        </div>
      </section>

      {/* 7. VENTURES SHOWCASE — 3D Squircle Logo System */}
      <ScrollReveal direction="up" delay={80}>
        <VenturesShowcase />
      </ScrollReveal>
    </main>
  );
}
