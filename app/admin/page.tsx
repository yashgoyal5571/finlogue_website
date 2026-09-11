"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CmsData, defaultCmsData } from "@/lib/cms-types";
import AdminHomeTab from "@/components/admin/AdminHomeTab";
import AdminEventsTab from "@/components/admin/AdminEventsTab";
import AdminGalleryTab from "@/components/admin/AdminGalleryTab";
import AdminTeamTab from "@/components/admin/AdminTeamTab";
import AdminContactTab from "@/components/admin/AdminContactTab";
import AdminSheetsTab from "@/components/admin/AdminSheetsTab";

type AdminTab = "home" | "events" | "gallery" | "team" | "contact" | "sheets";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Active Main Tab
  const [activeTab, setActiveTab] = useState<AdminTab>("home");

  // Master CMS State
  const [cmsData, setCmsData] = useState<CmsData>(defaultCmsData);
  const [isLoadingContent, setIsLoadingContent] = useState(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3800);
  };

  // Fetch full CMS content
  const loadContent = async () => {
    setIsLoadingContent(true);
    try {
      const res = await fetch("/api/admin/content");
      if (res.ok) {
        const json = await res.json();
        if (json.success && json.data) {
          setCmsData(json.data);
        }
      }
    } catch (err) {
      console.warn("Could not load dynamic CMS content:", err);
    } finally {
      setIsLoadingContent(false);
    }
  };

  const validTabs: AdminTab[] = ["home", "events", "gallery", "team", "contact", "sheets"];

  const handleTabSwitch = (tab: AdminTab) => {
    setActiveTab(tab);
    if (typeof window !== "undefined") {
      window.location.hash = tab;
      localStorage.setItem("finlogue_admin_tab", tab);
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    if (typeof window !== "undefined") {
      localStorage.removeItem("finlogue_admin_session");
    }
    showToast("Session locked.");
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      // 1. Restore auth state on reload
      const savedAuth = localStorage.getItem("finlogue_admin_session");
      if (savedAuth === "true") {
        setIsAuthenticated(true);
      }

      // 2. Restore active tab from hash or localStorage
      const hash = window.location.hash.replace("#", "") as AdminTab;
      if (validTabs.includes(hash)) {
        setActiveTab(hash);
      } else {
        const savedTab = localStorage.getItem("finlogue_admin_tab") as AdminTab;
        if (validTabs.includes(savedTab)) {
          setActiveTab(savedTab);
        }
      }

      const onHashChange = () => {
        const currentHash = window.location.hash.replace("#", "") as AdminTab;
        if (validTabs.includes(currentHash)) {
          setActiveTab(currentHash);
        }
      };
      window.addEventListener("hashchange", onHashChange);
    }

    loadContent();
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);
    setAuthError(null);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: passkeyInput }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("finlogue_admin_session", "true");
        }
        showToast("Access authorized. Welcome to Finlogue CMS!");
        loadContent();
      } else {
        setAuthError(data.error || "Invalid passkey. Access denied.");
      }
    } catch {
      // Offline fallback
      if (passkeyInput === "FINLOGUE@LNMIIT2026") {
        setIsAuthenticated(true);
        if (typeof window !== "undefined") {
          localStorage.setItem("finlogue_admin_session", "true");
        }
        showToast("Access authorized via offline credential.");
      } else {
        setAuthError("Could not verify passkey. Check connection.");
      }
    } finally {
      setIsVerifying(false);
    }
  };

  // Save Section Handler
  const handleSaveSection = async (section: keyof CmsData, sectionData: any) => {
    const res = await fetch("/api/admin/content", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        section,
        data: sectionData,
      }),
    });

    if (!res.ok) {
      throw new Error("Failed to save section");
    }

    const json = await res.json();
    if (json.success && json.data) {
      setCmsData(json.data);
    }
  };

  // 1. Unauthenticated Login Gate
  if (!isAuthenticated) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "var(--navy-deep)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ maxWidth: "440px", width: "100%", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", padding: "40px 32px", textAlign: "center", borderRadius: "8px" }}>
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
            <Image src="/logo.png" alt="Finlogue Crest" width={52} height={52} style={{ objectFit: "contain" }} />
          </div>

          <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
            FINLOGUE SECRETARIAT
          </span>
          <h1 className="font-display-serif" style={{ fontSize: "28px", color: "var(--ink-title)", margin: "8px 0 12px" }}>
            CMS Control Desk
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--ink-body)", marginBottom: "28px", lineHeight: 1.5 }}>
            Authorized portal to manage live website content, POTR venture conclave, photo galleries, leadership directory, and Google Sheets integration.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ textAlign: "left" }}>
              <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "6px", display: "block" }}>
                COORDINATOR PASSKEY
              </label>
              <input
                type="password"
                required
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter authorized passkey..."
                className="form-input"
                style={{ width: "100%", fontSize: "14px", padding: "12px 14px" }}
              />
              <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-muted)", marginTop: "6px", display: "block" }}>
                Authorized credential: FINLOGUE@LNMIIT2026
              </span>
            </div>

            {authError && (
              <div style={{ padding: "10px", backgroundColor: "var(--burgundy-tint)", border: "1px solid var(--burgundy-border)", color: "var(--burgundy-text)", fontSize: "12.5px", textAlign: "left", borderRadius: "4px" }}>
                ⚠ {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="stamp-button stamp-button-primary"
              style={{ width: "100%", padding: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)", fontWeight: 700 }}
            >
              {isVerifying ? "AUTHENTICATING..." : "ENTER CONTROL DESK →"}
            </button>

            <Link href="/" style={{ fontSize: "12.5px", color: "var(--ink-muted)", marginTop: "8px", textDecoration: "none" }}>
              ← Return to Public Website
            </Link>
          </form>
        </div>
      </main>
    );
  }

  // 2. Authenticated Admin Desk
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--white-alabaster)", paddingBottom: "80px" }}>
      {/* Toast Alert */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            backgroundColor: "var(--navy-deep)",
            color: "#FFFFFF",
            padding: "14px 24px",
            border: "1px solid var(--gold-oxford)",
            borderRadius: "6px",
            boxShadow: "0 8px 30px rgba(0,0,0,0.35)",
            zIndex: 9999,
            display: "flex",
            alignItems: "center",
            gap: "12px",
            fontFamily: "var(--font-mono)",
            fontSize: "12.5px",
          }}
        >
          <span style={{ color: "var(--gold-oxford)", fontSize: "16px" }}>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Header Bar */}
      <header style={{ backgroundColor: "var(--navy-deep)", color: "#FFFFFF", borderBottom: "1px solid var(--navy-border)", padding: "18px 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Image src="/logo.png" alt="Crest" width={36} height={36} style={{ objectFit: "contain" }} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--gold-oxford)", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                  INTERNAL SECRETARIAT
                </span>
                <span style={{ fontSize: "9.5px", padding: "2px 8px", backgroundColor: "rgba(21, 128, 61, 0.2)", color: "var(--emerald-bright)", border: "1px solid rgba(21, 128, 61, 0.4)", borderRadius: "4px", fontFamily: "var(--font-mono)" }}>
                  FULL-SITE CMS ACTIVE
                </span>
              </div>
              <h1 className="font-display-serif" style={{ fontSize: "20px", color: "#FFFFFF", margin: 0 }}>
                Finlogue Master Control Desk
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Link
              href={activeTab === "events" ? "/events" : activeTab === "gallery" ? "/gallery" : activeTab === "team" ? "/team" : activeTab === "contact" ? "/contact" : "/"}
              target="_blank"
              rel="noopener noreferrer"
              className="stamp-button"
              style={{ fontSize: "12px", padding: "8px 16px", borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF", textDecoration: "none" }}
            >
              PREVIEW PAGE ↗
            </Link>

            <button
              type="button"
              onClick={handleLogout}
              className="stamp-button"
              style={{ fontSize: "12px", padding: "8px 14px", borderColor: "rgba(255,255,255,0.15)", color: "var(--platinum-muted)" }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Section Navigation Strip (6 Dedicated Tabs) */}
      <section style={{ backgroundColor: "var(--white-pure)", borderBottom: "1px solid var(--white-border)", padding: "14px 0", position: "sticky", top: 0, zIndex: 50 }}>
        <div className="container" style={{ display: "flex", gap: "8px", flexWrap: "wrap", alignItems: "center" }}>
          <button
            type="button"
            onClick={() => handleTabSwitch("home")}
            className="stamp-button"
            style={{
              fontSize: "12.5px",
              padding: "9px 18px",
              backgroundColor: activeTab === "home" ? "var(--navy-hero)" : "var(--white-pure)",
              color: activeTab === "home" ? "#FFFFFF" : "var(--ink-title)",
              borderColor: activeTab === "home" ? "var(--navy-hero)" : "var(--white-border)",
              fontWeight: 700,
            }}
          >
            🏠 HOME PAGE
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch("events")}
            className="stamp-button"
            style={{
              fontSize: "12.5px",
              padding: "9px 18px",
              backgroundColor: activeTab === "events" ? "var(--navy-hero)" : "var(--white-pure)",
              color: activeTab === "events" ? "#FFFFFF" : "var(--ink-title)",
              borderColor: activeTab === "events" ? "var(--navy-hero)" : "var(--white-border)",
              fontWeight: 700,
            }}
          >
            📅 EVENTS & POTR
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch("gallery")}
            className="stamp-button"
            style={{
              fontSize: "12.5px",
              padding: "9px 18px",
              backgroundColor: activeTab === "gallery" ? "var(--navy-hero)" : "var(--white-pure)",
              color: activeTab === "gallery" ? "#FFFFFF" : "var(--ink-title)",
              borderColor: activeTab === "gallery" ? "var(--navy-hero)" : "var(--white-border)",
              fontWeight: 700,
            }}
          >
            🖼️ GALLERY ({cmsData.gallery.items.length})
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch("team")}
            className="stamp-button"
            style={{
              fontSize: "12.5px",
              padding: "9px 18px",
              backgroundColor: activeTab === "team" ? "var(--navy-hero)" : "var(--white-pure)",
              color: activeTab === "team" ? "#FFFFFF" : "var(--ink-title)",
              borderColor: activeTab === "team" ? "var(--navy-hero)" : "var(--white-border)",
              fontWeight: 700,
            }}
          >
            👥 TEAM ({cmsData.team.length})
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch("contact")}
            className="stamp-button"
            style={{
              fontSize: "12.5px",
              padding: "9px 18px",
              backgroundColor: activeTab === "contact" ? "var(--navy-hero)" : "var(--white-pure)",
              color: activeTab === "contact" ? "#FFFFFF" : "var(--ink-title)",
              borderColor: activeTab === "contact" ? "var(--navy-hero)" : "var(--white-border)",
              fontWeight: 700,
            }}
          >
            ✉️ CONTACT US
          </button>

          <button
            type="button"
            onClick={() => handleTabSwitch("sheets")}
            className="stamp-button"
            style={{
              fontSize: "12.5px",
              padding: "9px 18px",
              backgroundColor: activeTab === "sheets" ? "var(--navy-hero)" : "var(--white-pure)",
              color: activeTab === "sheets" ? "#FFFFFF" : "var(--ink-title)",
              borderColor: activeTab === "sheets" ? "var(--navy-hero)" : "var(--white-border)",
              fontWeight: 700,
            }}
          >
            📊 GOOGLE SHEETS
          </button>
        </div>
      </section>

      {/* Main Tab Content */}
      <section style={{ padding: "36px 0" }}>
        <div className="container">
          {isLoadingContent ? (
            <div style={{ padding: "48px", textAlign: "center", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>
              Loading CMS configuration from disk...
            </div>
          ) : (
            <>
              {activeTab === "home" && (
                <AdminHomeTab
                  data={cmsData.home}
                  onSave={(updated) => handleSaveSection("home", updated)}
                  showToast={showToast}
                />
              )}

              {activeTab === "events" && (
                <AdminEventsTab
                  data={cmsData.events}
                  onSave={(updated) => handleSaveSection("events", updated)}
                  showToast={showToast}
                />
              )}

              {activeTab === "gallery" && (
                <AdminGalleryTab
                  data={cmsData.gallery}
                  onSave={(updated) => handleSaveSection("gallery", updated)}
                  showToast={showToast}
                />
              )}

              {activeTab === "team" && (
                <AdminTeamTab
                  data={cmsData.team}
                  onSave={(updated) => handleSaveSection("team", updated)}
                  showToast={showToast}
                />
              )}

              {activeTab === "contact" && (
                <AdminContactTab
                  data={cmsData.contact}
                  onSave={(updated) => handleSaveSection("contact", updated)}
                  showToast={showToast}
                />
              )}

              {activeTab === "sheets" && (
                <AdminSheetsTab
                  config={cmsData.googleSheets}
                  onSaveConfig={(updated) => handleSaveSection("googleSheets", updated)}
                  showToast={showToast}
                />
              )}
            </>
          )}
        </div>
      </section>
    </main>
  );
}
