"use client";

import React, { useState } from "react";

interface Chamber {
  title: string;
  description: string;
  deliverables: string[];
  accentColor: string;
}

const chambers: Chamber[] = [
  {
    title: "Market & Valuation Teardowns",
    description:
      "Peer-led analytical sessions deconstructing corporate earnings, macro trends, and public equities through rigorous DCF, LBO, and relative valuation modeling.",
    deliverables: [
      "Weekly Equity Research Labs",
      "Macroeconomic & Sector Teardowns",
      "Financial Modeling & DCF Workshops",
    ],
    accentColor: "var(--emerald)",
  },
  {
    title: "Case Solving & Frameworks",
    description:
      "Structured problem-solving bootcamps modeled on MBB consultancies, breaking down complex business problems, hypothesis trees, and market entry strategies.",
    deliverables: [
      "Hypothesis Trees & GTM Strategy",
      "Profitability & Market Sizing Drills",
      "Live Business Case Teardowns",
    ],
    accentColor: "var(--gold-oxford)",
  },
  {
    title: "National Case Syndicate",
    description:
      "Fielding elite, battle-tested student cohorts for premier business case competitions and boardroom simulations across top IIMs, IITs, and global leagues.",
    deliverables: [
      "Case Crackers Internal League",
      "Boardroom War-Room Simulations",
      "Premier National Case Representations",
    ],
    accentColor: "var(--burgundy-crest)",
  },
  {
    title: "Venture Flagships & Mentorship",
    description:
      "Bridging student analysts and founders with institutional investors, venture funds, and executive alumni through landmark symposiums and curated masterclasses.",
    deliverables: [
      "Pitch on the Rocks (POTR) Flagship",
      "Angel & VC Mentorship Circles",
      "Executive Alumni Advisory Desk",
    ],
    accentColor: "var(--navy-hero)",
  },
];

export default function CollegiateCharterShowcase() {
  const [activeChamber, setActiveChamber] = useState<number | null>(null);

  return (
    <section
      className="collegiate-charter-section"
      style={{
        position: "relative",
        padding: "clamp(64px, 7vw, 100px) 0 clamp(80px, 8vw, 110px)",
        backgroundColor: "var(--white-pure)",
        borderTop: "1px solid var(--white-border)",
        borderBottom: "1px solid var(--white-border)",
        overflow: "hidden",
      }}
      aria-label="Vision and Core Pillars"
    >
      {/* Background Architectural Watermark Seal */}
      <div
        style={{
          position: "absolute",
          top: "160px",
          left: "50%",
          transform: "translateX(-50%)",
          width: "clamp(340px, 48vw, 620px)",
          height: "clamp(340px, 48vw, 620px)",
          pointerEvents: "none",
          opacity: 0.05,
          zIndex: 0,
        }}
      >
        <svg
          viewBox="0 0 500 500"
          style={{
            width: "100%",
            height: "100%",
            animation: "charterSealSpin 120s linear infinite",
          }}
        >
          <circle cx="250" cy="250" r="238" fill="none" stroke="var(--navy-hero)" strokeWidth="1.2" />
          <circle cx="250" cy="250" r="230" fill="none" stroke="var(--navy-hero)" strokeWidth="0.8" strokeDasharray="3 4" />
          <circle cx="250" cy="250" r="200" fill="none" stroke="var(--navy-hero)" strokeWidth="1" />
          <line x1="250" y1="4" x2="250" y2="496" stroke="var(--navy-hero)" strokeWidth="0.8" strokeDasharray="6 4" />
          <line x1="4" y1="250" x2="496" y2="250" stroke="var(--navy-hero)" strokeWidth="0.8" strokeDasharray="6 4" />
          <polygon
            points="250,60 305,195 440,250 305,305 250,440 195,305 60,250 195,195"
            fill="none"
            stroke="var(--navy-hero)"
            strokeWidth="0.9"
          />
          <circle cx="250" cy="250" r="140" fill="none" stroke="var(--navy-hero)" strokeWidth="1.2" />
          <circle cx="250" cy="250" r="70" fill="none" stroke="var(--navy-hero)" strokeWidth="0.8" />
        </svg>
      </div>

      <div className="container" style={{ position: "relative", zIndex: 2 }}>
        {/* ===================================================================
            THE VISION HEADER
            =================================================================== */}
        <div style={{ textAlign: "center", maxWidth: "940px", margin: "0 auto 52px" }}>


          {/* Central Medallion Crest */}
          <div style={{ display: "flex", justifyContent: "center", marginBottom: "22px" }}>
            <div
              style={{
                width: "54px",
                height: "54px",
                borderRadius: "50%",
                border: "1px solid var(--gold-border)",
                backgroundColor: "var(--white-alabaster)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                boxShadow: "0 4px 14px rgba(197, 168, 128, 0.16)",
              }}
            >
              <svg
                viewBox="0 0 100 100"
                style={{
                  width: "40px",
                  height: "40px",
                  animation: "charterSealSpinReverse 50s linear infinite",
                }}
              >
                <circle cx="50" cy="50" r="46" fill="none" stroke="var(--gold-oxford)" strokeWidth="1.2" strokeDasharray="3 3" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="var(--gold-oxford)" strokeWidth="0.8" />
                <polygon points="50,15 62,38 85,50 62,62 50,85 38,62 15,50 38,38" fill="none" stroke="var(--gold-oxford)" strokeWidth="0.9" />
                <circle cx="50" cy="50" r="5" fill="var(--gold-oxford)" />
              </svg>
            </div>
          </div>

          {/* Monumental Vision Title */}
          <h2
            className="font-display-serif"
            style={{
              fontSize: "clamp(30px, 3.6vw, 46px)",
              color: "var(--ink-title)",
              lineHeight: 1.22,
              margin: "0 auto 20px",
              fontWeight: 400,
              letterSpacing: "-0.015em",
            }}
          >
            Forging India&apos;s premier collegiate ecosystem for venture intelligence, corporate strategy, and financial engineering.
          </h2>

          {/* Purpose Statement for the Student-Led Club */}
          <p
            style={{
              fontSize: "clamp(15px, 1.15vw, 17px)",
              color: "var(--ink-muted)",
              maxWidth: "760px",
              margin: "0 auto",
              lineHeight: 1.7,
              fontFamily: "var(--font-sans)",
            }}
          >
            A 100% student-founded and student-led society at LNMIIT. We take finance and business strategy beyond textbook theory through four operational working chambers driven by peer mentorship, analytical rigor, and competitive execution.
          </p>
        </div>

        {/* ===================================================================
            THE 4 OPERATIONAL CHAMBERS (CLEAN, DISTINCT BORDERED CARDS)
            =================================================================== */}
        <div
          className="chambers-grid"
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: "20px",
          }}
        >
          {chambers.map((chamber, index) => {
            const isHovered = activeChamber === index;

            return (
              <div
                key={chamber.title}
                onMouseEnter={() => setActiveChamber(index)}
                onMouseLeave={() => setActiveChamber(null)}
                style={{
                  backgroundColor: isHovered ? "var(--white-alabaster)" : "var(--white-pure)",
                  border: isHovered ? "1px solid var(--white-border-strong)" : "1px solid var(--white-border)",
                  borderRadius: "8px",
                  boxShadow: isHovered
                    ? "0 10px 26px -4px rgba(7, 13, 30, 0.08), 0 3px 8px -2px rgba(7, 13, 30, 0.04)"
                    : "0 2px 8px -2px rgba(7, 13, 30, 0.03)",
                  padding: "clamp(26px, 2.8vw, 36px) clamp(20px, 2.2vw, 26px)",
                  display: "flex",
                  flexDirection: "column",
                  position: "relative",
                  overflow: "hidden",
                  transition: "border-color 0.22s ease, box-shadow 0.22s ease, background-color 0.22s ease, transform 0.22s ease",
                  transform: isHovered ? "translateY(-3px)" : "translateY(0)",
                }}
              >
                {/* Subtle top accent hairline upon hover */}
                <div
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    height: "3px",
                    backgroundColor: isHovered ? chamber.accentColor : "transparent",
                    transition: "background-color 0.2s ease",
                  }}
                />

                {/* Chamber Title */}
                <h3
                  className="font-display-serif"
                  style={{
                    fontSize: "clamp(20px, 1.55vw, 23px)",
                    color: "var(--ink-title)",
                    lineHeight: 1.25,
                    marginBottom: "14px",
                    fontWeight: 500,
                  }}
                >
                  {chamber.title}
                </h3>

                {/* Detailed Description */}
                <p
                  style={{
                    fontSize: "14px",
                    color: "var(--ink-muted)",
                    lineHeight: 1.65,
                    marginBottom: "24px",
                  }}
                >
                  {chamber.description}
                </p>

                {/* Key Initiatives / Deliverables List */}
                <div style={{ marginTop: "auto", paddingTop: "18px", borderTop: "1px solid var(--white-border)" }}>
                  <ul
                    style={{
                      listStyle: "none",
                      padding: 0,
                      margin: 0,
                      display: "flex",
                      flexDirection: "column",
                      gap: "9px",
                    }}
                  >
                    {chamber.deliverables.map((item) => (
                      <li
                        key={item}
                        style={{
                          fontSize: "13px",
                          color: "var(--ink-body)",
                          lineHeight: 1.4,
                          display: "flex",
                          alignItems: "flex-start",
                          gap: "8px",
                        }}
                      >
                        <span
                          style={{
                            color: chamber.accentColor,
                            fontSize: "10px",
                            marginTop: "3px",
                            flexShrink: 0,
                          }}
                        >
                          ◆
                        </span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Embedded CSS for Rotations and Responsive Grid */}
      <style jsx global>{`
        @keyframes charterSealSpin {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        @keyframes charterSealSpinReverse {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(-360deg);
          }
        }

        @media (max-width: 1024px) {
          .chambers-grid {
            grid-template-columns: repeat(2, 1fr) !important;
            gap: 18px !important;
          }
        }

        @media (max-width: 640px) {
          .chambers-grid {
            grid-template-columns: 1fr !important;
            gap: 16px !important;
          }
        }
      `}</style>
    </section>
  );
}
