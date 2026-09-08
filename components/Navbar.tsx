"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import PIRegistrationModal from "@/components/PIRegistrationModal";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const [piModalOpen, setPiModalOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 20);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile drawer is open
  useEffect(() => {
    if (mobileDrawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileDrawerOpen]);

  // Close drawer on escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileDrawerOpen) {
        setMobileDrawerOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobileDrawerOpen]);

  const [hoveredHref, setHoveredHref] = useState<string | null>(null);

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/about" },
    { label: "Events", href: "/events" },
    { label: "Team", href: "/team" },
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header className="site-header-wrapper">
        <div className={`site-header ${isScrolled ? "scrolled" : ""}`}>
          <div className="nav-inner">
            {/* Desktop Left Navigation Links */}
            <nav
              className="nav-links nav-links-left"
              aria-label="Primary Navigation Left"
              onMouseLeave={() => setHoveredHref(null)}
            >
              {navLinks.slice(0, 3).map((link) => {
                const isSelected = hoveredHref
                  ? hoveredHref === link.href
                  : pathname === link.href;

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    target={link.href === "/" ? undefined : "_blank"}
                    rel={link.href === "/" ? undefined : "noopener noreferrer"}
                    onMouseEnter={() => setHoveredHref(link.href)}
                    className={`nav-link ${isSelected ? "active" : ""}`}
                  >
                    <span>{link.label}</span>
                    <span className="nav-link-underline" />
                  </Link>
                );
              })}
            </nav>

            {/* Center Anchor: Brand Logo & Wordmark */}
            <div className="nav-center-brand">
              <Link
                href="/"
                className="brand-center-wrap"
                aria-label="Finlogue Portal Home"
              >
                <div className="brand-crest-box">
                  <Image
                    src="/logo.png"
                    alt="Finlogue Crest"
                    width={40}
                    height={40}
                    className="brand-crest-img"
                    priority
                  />
                </div>
                <div className="brand-center-text">
                  <span className="brand-center-title">FINLOGUE</span>
                  <span className="brand-center-sub">FINANCE CELL</span>
                </div>
              </Link>
            </div>

            {/* Desktop Right Navigation Links & Action */}
            <div className="nav-right-cluster">
              <nav
                className="nav-links nav-links-right"
                aria-label="Primary Navigation Right"
                onMouseLeave={() => setHoveredHref(null)}
              >
                {navLinks.slice(3).map((link) => {
                  const isSelected = hoveredHref
                    ? hoveredHref === link.href
                    : pathname === link.href;

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.href === "/" ? undefined : "_blank"}
                      rel={link.href === "/" ? undefined : "noopener noreferrer"}
                      onMouseEnter={() => setHoveredHref(link.href)}
                      className={`nav-link ${isSelected ? "active" : ""}`}
                    >
                      <span>{link.label}</span>
                      <span className="nav-link-underline" />
                    </Link>
                  );
                })}
              </nav>

              {/* Recruitment CTA Button (Inspired by Waterfield's New Badge Callout) */}
              <div className="nav-cta-btn">
                <button
                  type="button"
                  onClick={() => setPiModalOpen(true)}
                  className="pi-recruitment-btn"
                  aria-label="Register for Personal Interviews (PI) - Y-26 Batch"
                  title="Y-26 Batch Recruitments Open · Register for Personal Interviews"
                >
                  <span className="pi-new-badge">New</span>
                  <span className="pi-label-text">Register for PI</span>
                  <span className="pi-batch-tag">Y-26</span>
                </button>
              </div>

              {/* Mobile Hamburger Trigger */}
              <button
                type="button"
                onClick={() => setMobileDrawerOpen(true)}
                className="mobile-toggle-btn"
                aria-label="Open mobile navigation drawer"
                aria-expanded={mobileDrawerOpen}
              >
                <span className="mobile-toggle-line" />
                <span className="mobile-toggle-line" />
              </button>
            </div>
          </div>
        </div>
      </header>


      {/* Mobile Drawer Overlay */}
      {mobileDrawerOpen && (
        <div
          className="drawer-overlay"
          role="dialog"
          aria-modal="true"
        >
          {/* Dimmed backdrop */}
          <div
            style={{ position: "fixed", inset: 0 }}
            onClick={() => setMobileDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sheet */}
          <aside className="drawer-panel">
            <div>
              {/* Drawer Top Header */}
              <div className="drawer-header">
                <div className="brand-wrap">
                  <Image
                    src="/logo.png"
                    alt="Finlogue Crest"
                    width={32}
                    height={32}
                    style={{ height: "32px", width: "auto", objectFit: "contain" }}
                  />
                  <div className="brand-titles">
                    <span className="brand-name" style={{ fontSize: "18px" }}>
                      FINLOGUE
                    </span>
                    <span className="brand-sub" style={{ fontSize: "9px" }}>
                      Finance & Strategy Portal
                    </span>
                  </div>
                </div>

                {/* Close Button */}
                <button
                  type="button"
                  onClick={() => setMobileDrawerOpen(false)}
                  style={{
                    width: "40px",
                    height: "40px",
                    border: "1px solid var(--hairline)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "var(--parchment-muted)",
                    fontSize: "18px",
                  }}
                  aria-label="Close navigation drawer"
                >
                  ✕
                </button>
              </div>

              {/* Navigation Links */}
              <nav className="drawer-nav" aria-label="Mobile Navigation">
                {navLinks.map((link, idx) => {
                  const isActive = pathname === link.href;
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      target={link.href === "/" ? undefined : "_blank"}
                      rel={link.href === "/" ? undefined : "noopener noreferrer"}
                      onClick={() => setMobileDrawerOpen(false)}
                      className={`drawer-link ${isActive ? "active" : ""}`}
                    >
                      <span>{link.label}</span>
                      <span
                        className="font-metadata-mono"
                        style={{ fontSize: "11px", color: "rgba(147, 161, 176, 0.6)" }}
                      >
                        0{idx + 1}
                      </span>
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Drawer Recruitment Callout */}
              <div style={{ marginTop: "24px", paddingTop: "20px", borderTop: "1px solid rgba(226, 232, 240, 0.1)" }}>
                <button
                  type="button"
                  onClick={() => {
                    setMobileDrawerOpen(false);
                    setPiModalOpen(true);
                  }}
                  className="pi-recruitment-btn"
                  style={{ width: "100%", justifyContent: "center", padding: "12px 18px" }}
                >
                  <span className="pi-pulse-dot" />
                  <span>Register for PI (Y-26)</span>
                </button>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="drawer-footer">
              <p
                className="font-metadata-mono"
                style={{ fontSize: "10px", color: "rgba(147, 161, 176, 0.7)", textTransform: "uppercase" }}
              >
                Finance Cell · LNMIIT
              </p>
            </div>
          </aside>
        </div>
      )}

      {/* Interactive Y-26 Personal Interview (PI) Registration Modal */}
      <PIRegistrationModal
        isOpen={piModalOpen}
        onClose={() => setPiModalOpen(false)}
      />
    </>
  );
}

