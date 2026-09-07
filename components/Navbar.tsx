"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
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
    { label: "Gallery", href: "/gallery" },
    { label: "Contact Us", href: "/contact" },
  ];

  return (
    <>
      <header className={`site-header ${isScrolled ? "scrolled" : ""}`}>
        <div className="nav-inner" style={{ width: "100%", padding: "0 clamp(20px, 4vw, 48px)" }}>
          {/* Brand Logo */}
          <Link
            href="/"
            className="brand-wrap"
            aria-label="Finlogue Portal Home"
          >
            <Image
              src="/logo.png"
              alt="Finlogue Crest"
              width={40}
              height={40}
              style={{ height: "40px", width: "auto", objectFit: "contain", flexShrink: 0 }}
              priority
            />
            <div className="brand-titles">
              <span className="brand-name">FINLOGUE</span>
              <span className="brand-sub">Finance Cell · LNMIIT</span>
            </div>
          </Link>

          {/* Desktop Nav Links (Opening sections in a new tab per user approach) */}
          <nav
            className="nav-links"
            aria-label="Primary Navigation"
            onMouseLeave={() => setHoveredHref(null)}
          >
            {navLinks.map((link) => {
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
    </>
  );
}
