import React from "react";
import Link from "next/link";
import Image from "next/image";
import { home } from "@/content/home";
import StatsCounter from "@/components/StatsCounter";
import InspirationalSpeakers from "@/components/InspirationalSpeakers";

export const metadata = {
  title: "FINLOGUE — Finance & Strategy Cell | LNMIIT",
  description:
    "LNMIIT's premier student-run Finance and Corporate Strategy body. Catalyzing valuation research, quantitative case solving, and venture capital deployment.",
};

export default function HomePage() {
  return (
    <main style={{ flex: 1, width: "100%", overflow: "hidden" }}>
      {/* 1. HERO SECTION — Full Bleed Picture Holder with Light-Colored Luminous Overlay */}
      <section
        style={{
          position: "relative",
          minHeight: "92vh",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
          backgroundColor: "#F8FAFC",
        }}
      >
        {/* Full-Cover Background Image (Picture Holder covering whole hero) */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            zIndex: 1,
          }}
        >
          <Image
            src="/assets/gallery/summit-keynote.jpg"
            alt="Finlogue Auditorium & Keynote Arena"
            fill
            sizes="100vw"
            priority
            style={{
              objectFit: "cover",
              objectPosition: "center 35%",
              filter: "contrast(102%) brightness(105%)",
            }}
          />
          {/* Light-Colored Gradient Overlay so the photograph is bright & clearly visible */}
          <div
            style={{
              position: "absolute",
              inset: 0,
              background:
                "linear-gradient(180deg, rgba(248, 250, 252, 0.78) 0%, rgba(241, 245, 249, 0.90) 100%), linear-gradient(90deg, rgba(255, 255, 255, 0.94) 0%, rgba(255, 255, 255, 0.70) 55%, rgba(248, 250, 252, 0.85) 100%)",
            }}
          />
        </div>

        {/* Hero Content Container */}
        <div className="container" style={{ position: "relative", zIndex: 10, padding: "90px 0 60px" }}>
          <div style={{ maxWidth: "720px" }}>
            {/* Institutional Badge */}
            <div
              className="badge-pill"
              style={{
                marginBottom: "22px",
                backgroundColor: "rgba(7, 13, 30, 0.06)",
                borderColor: "rgba(7, 13, 30, 0.15)",
                color: "var(--navy-hero)",
              }}
            >
              <span
                style={{
                  width: "8px",
                  height: "8px",
                  borderRadius: "9999px",
                  backgroundColor: "var(--navy-hero)",
                  display: "inline-block",
                }}
              />
              <span style={{ fontWeight: 600 }}>{home.hero.badge}</span>
            </div>

            {/* Main Title (Executive Navy with authority) */}
            <h1
              className="font-display-serif"
              style={{
                fontSize: "clamp(44px, 6vw, 76px)",
                color: "var(--navy-hero)",
                lineHeight: 1.05,
                letterSpacing: "0.02em",
                textTransform: "uppercase",
                marginBottom: "22px",
                fontWeight: 700,
              }}
            >
              FINLOGUE LNMIIT
            </h1>

            {/* Description Subtitle */}
            <p
              style={{
                fontSize: "clamp(15px, 1.8vw, 17.5px)",
                color: "#334155",
                lineHeight: 1.65,
                marginBottom: "36px",
                maxWidth: "640px",
                fontWeight: 400,
              }}
            >
              The Finance & Strategy Cell (Finlogue) of LNMIIT develops premier student analysts and venture leaders through live market challenges, quantitative modeling, and boardroom case simulations.
            </p>

            {/* Action Buttons (Pill button Know More → like ecell reference) */}
            <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap" }}>
              <Link
                href="/about"
                target="_blank"
                rel="noopener noreferrer"
                className="stamp-button stamp-button-primary"
                style={{
                  padding: "14px 32px",
                  borderRadius: "100px",
                  backgroundColor: "var(--navy-hero)",
                  borderColor: "var(--navy-hero)",
                  color: "#FFFFFF",
                  fontWeight: 700,
                  fontSize: "14.5px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "8px",
                  boxShadow: "0 6px 20px rgba(7, 13, 30, 0.25)",
                }}
              >
                <span>Know More</span>
                <span style={{ fontSize: "16px", color: "var(--gold-oxford)" }}>→</span>
              </Link>

              <Link
                href="#initiatives"
                className="secondary-button"
                style={{
                  padding: "14px 28px",
                  borderRadius: "100px",
                  fontSize: "14px",
                  borderColor: "var(--navy-hero)",
                  color: "var(--navy-hero)",
                  backgroundColor: "rgba(255, 255, 255, 0.8)",
                  fontWeight: 600,
                }}
              >
                <span>Explore Initiatives</span>
              </Link>
            </div>

            {/* University Credentials Strip */}
            <div
              className="hero-credentials"
              style={{
                marginTop: "44px",
                justifyContent: "flex-start",
                color: "#475569",
                fontSize: "12px",
                fontWeight: 500,
              }}
            >
              <span>The LNM Institute of Information Technology</span>
              <span style={{ color: "var(--navy-hero)" }}>·</span>
              <span>Venture Incubation</span>
              <span style={{ color: "var(--navy-hero)" }}>·</span>
              <span>Financial Modeling</span>
              <span style={{ color: "var(--navy-hero)" }}>·</span>
              <span>Corporate Strategy</span>
            </div>
          </div>
        </div>

        {/* Downward Scroll Indicator (matching ecell reference) */}
        <div
          style={{
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 10,
            color: "var(--navy-hero)",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            opacity: 0.7,
            animation: "pulse 2s infinite",
          }}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19" />
            <polyline points="19 12 12 19 5 12" />
          </svg>
        </div>
      </section>

      {/* 2. ABOUT FINLOGUE (What is Finlogue? — Matching E-Cell IIT Bombay layout) */}
      <section className="section-pure-white" style={{ padding: "80px 0" }}>
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

      {/* 3. LIVE IMPACT NUMBERS / STATS BAR — Architectural Light Gray (#F8FAFC) */}
      <section className="section-alabaster">
        <div className="container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-end",
              flexWrap: "wrap",
              gap: "16px",
              marginBottom: "36px",
            }}
          >
            <div>
              <span className="section-badge">KEY PERFORMANCE METRICS</span>
              <h2 className="section-title">
                The Scale of Our Ecosystem
              </h2>
            </div>
            <p className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)" }}>
              Validated data across flagship symposiums and student cohorts.
            </p>
          </div>

          <div className="stats-grid">
            {home.stats.map((stat) => (
              <StatsCounter
                key={stat.label}
                label={stat.label}
                value={stat.value}
                detail={stat.detail}
              />
            ))}
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
                "founder-circle": "accent-incubation",
              };
              return (
                <div key={item.id} className={`initiative-card ${accentMap[item.id] ?? ""}`}>
                  <div>
                    <div className="initiative-header">
                      <span className="initiative-tag">{item.tag}</span>
                      <span className="initiative-badge-tag">{item.highlight}</span>
                    </div>

                    <h3 className="initiative-title">{item.title}</h3>
                    <p className="initiative-desc">{item.description}</p>
                  </div>

                  <div className="initiative-footer">
                    <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)" }}>
                      {item.metrics}
                    </span>
                  </div>
                </div>
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

          <div className="grid-3">
            <div className="gallery-card">
              <div className="gallery-frame">
                <Image
                  src="/assets/gallery/summit-keynote.jpg"
                  alt="Global Financial Summit Keynote"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="gallery-tag">KEYNOTE ADDRESS</span>
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title" style={{ fontSize: "20px" }}>
                  Global Financial Conclave
                </h3>
              </div>
            </div>

            <div className="gallery-card">
              <div className="gallery-frame">
                <Image
                  src="/assets/gallery/pitch-session.jpg"
                  alt="Live Pitch Session"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="gallery-tag">VENTURE PITCH</span>
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title" style={{ fontSize: "20px" }}>
                  Pitch on the Rocks Battle
                </h3>
              </div>
            </div>

            <div className="gallery-card">
              <div className="gallery-frame">
                <Image
                  src="/assets/gallery/award-ceremony.jpg"
                  alt="Award Ceremony"
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  style={{ objectFit: "cover" }}
                />
                <span className="gallery-tag">HONORS & VICTORY</span>
              </div>
              <div className="gallery-content">
                <h3 className="gallery-title" style={{ fontSize: "20px" }}>
                  National Case League Champions
                </h3>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 7. STARTUP ECOSYSTEM TICKER — Cool Platinum Light Strip */}
      <section className="section-ticker-light">
        <div className="container" style={{ textAlign: "center" }}>
          <span className="section-badge" style={{ marginBottom: "20px" }}>
            VENTURES PITCHED & ACCELERATED THROUGH OUR SUMMITS
          </span>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))",
              gap: "16px",
              marginTop: "24px",
            }}
          >
            {home.startups.map((st) => (
              <div
                key={st.name}
                style={{
                  backgroundColor: "var(--white-pure)",
                  border: "1px solid var(--white-border)",
                  boxShadow: "var(--card-shadow)",
                  padding: "16px 12px",
                  textAlign: "center",
                }}
              >
                <span className="font-display-serif-sm" style={{ fontSize: "17px", color: "var(--ink-title)", display: "block" }}>
                  {st.name}
                </span>
                <span
                  className="font-metadata-mono"
                  style={{ fontSize: "9.5px", color: "var(--navy-hero)", textTransform: "uppercase", marginTop: "4px", display: "block" }}
                >
                  {st.category}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. CLOSING HIGH-CONVERSION CTA — Statement Executive Midnight Navy Banner */}
      <section className="section-navy-cta">
        <div className="container-narrow">
          <span className="section-badge">SHAPE TOMORROW'S MARKETS</span>
          <h2 className="section-title">{home.closingCta.headline}</h2>
          <p className="section-sub" style={{ maxWidth: "600px", margin: "20px auto 0" }}>
            {home.closingCta.subline}
          </p>
          <div style={{ marginTop: "40px" }}>
            <Link
              href={home.closingCta.href}
              className="stamp-button stamp-button-primary"
              style={{ padding: "16px 36px", fontSize: "15px" }}
            >
              <span>{home.closingCta.buttonText}</span>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
