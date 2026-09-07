"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CaseFile } from "@/content/events";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  // Events State
  const [eventsList, setEventsList] = useState<CaseFile[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("ALL");
  const [searchQuery, setSearchQuery] = useState("");
  const [dataSource, setDataSource] = useState<string>("local_cache");

  // Modals & Forms
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CaseFile | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    title: "",
    category: "Strategy",
    status: "ACTIVE" as "ACTIVE" | "UPCOMING" | "CLOSED",
    date: "",
    prizeOrOutput: "",
    eligibility: "Open Pan-India",
    description: "",
  });

  // Check existing session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          fetchEvents();
        }
      } catch {
        // Not authenticated
      }
    };
    checkSession();
  }, []);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError(null);
    setIsVerifying(true);

    try {
      const res = await fetch("/api/admin/auth", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ passkey: passkeyInput }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        setIsAuthenticated(true);
        fetchEvents();
        showToast("Access Authorized. Welcome, Coordinator.");
      } else {
        setAuthError(data.error || "Invalid passkey.");
      }
    } catch {
      setAuthError("Failed to reach authentication server.");
    } finally {
      setIsVerifying(false);
    }
  };

  const fetchEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (data.success && Array.isArray(data.events)) {
        setEventsList(data.events);
        setDataSource(data.source || "local_cache");
      }
    } catch (err) {
      console.error("Failed to load events:", err);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  // Quick 1-Click Status Switcher (LIVE / UPCOMING / ARCHIVED)
  const handleToggleStatus = async (id: string, newStatus: "ACTIVE" | "UPCOMING" | "CLOSED") => {
    // Optimistic UI update
    setEventsList((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
    );

    try {
      const res = await fetch("/api/admin/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`Status updated to ${newStatus === "ACTIVE" ? "LIVE" : newStatus}`);
      } else {
        alert(data.error || "Failed to update status");
        fetchEvents(); // rollback
      }
    } catch {
      alert("Network error updating status.");
      fetchEvents();
    }
  };

  const handleOpenAddModal = () => {
    setEditingEvent(null);
    setFormData({
      title: "",
      category: "Strategy",
      status: "ACTIVE",
      date: "SPRING 2026",
      prizeOrOutput: "₹50,000 & Citation",
      eligibility: "Open Pan-India",
      description: "",
    });
    setIsAddModalOpen(true);
  };

  const handleOpenEditModal = (event: CaseFile) => {
    setEditingEvent(event);
    setFormData({
      title: event.title,
      category: event.category,
      status: event.status,
      date: event.date,
      prizeOrOutput: event.prizeOrOutput,
      eligibility: event.eligibility,
      description: event.description,
    });
    setIsAddModalOpen(true);
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);

    const eventPayload: CaseFile = {
      id: editingEvent
        ? editingEvent.id
        : formData.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      fileNumber: editingEvent
        ? editingEvent.fileNumber
        : `INITIATIVE 0${eventsList.length + 1}`,
      title: formData.title.toUpperCase(),
      category: formData.category as any,
      status: formData.status,
      date: formData.date || "UPCOMING",
      prizeOrOutput: formData.prizeOrOutput,
      eligibility: formData.eligibility,
      description: formData.description,
    };

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: eventPayload }),
      });

      const data = await res.json();
      if (res.ok && data.success) {
        showToast(editingEvent ? "Event updated successfully!" : "New event published live!");
        setIsAddModalOpen(false);
        fetchEvents();
      } else {
        alert(data.error || "Failed to save event.");
      }
    } catch {
      alert("Error transmitting event payload.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!window.confirm(`Are you sure you want to remove "${title}" from the catalog?`)) {
      return;
    }

    try {
      const res = await fetch(`/api/admin/events?id=${encodeURIComponent(id)}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (res.ok) {
        showToast(`Event "${title}" removed.`);
        setEventsList((prev) => prev.filter((ev) => ev.id !== id));
      } else {
        alert(data.error || "Failed to delete event.");
      }
    } catch {
      alert("Error deleting event.");
    }
  };

  const filteredEvents = eventsList.filter((ev) => {
    const matchesFilter =
      filterStatus === "ALL" ? true : ev.status === filterStatus;
    const matchesQuery =
      ev.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      ev.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const liveCount = eventsList.filter((e) => e.status === "ACTIVE").length;
  const upcomingCount = eventsList.filter((e) => e.status === "UPCOMING").length;
  const closedCount = eventsList.filter((e) => e.status === "CLOSED").length;

  // 1. Unauthenticated Login Gate View
  if (!isAuthenticated) {
    return (
      <main
        style={{
          minHeight: "100vh",
          backgroundColor: "var(--navy-deep)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            maxWidth: "440px",
            width: "100%",
            backgroundColor: "var(--white-pure)",
            border: "1px solid var(--white-border)",
            boxShadow: "0 20px 40px rgba(0,0,0,0.5)",
            padding: "40px 32px",
            textAlign: "center",
          }}
        >
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
            <Image src="/logo.png" alt="Finlogue Crest" width={52} height={52} style={{ objectFit: "contain" }} />
          </div>

          <span
            className="font-metadata-mono"
            style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}
          >
            FINLOGUE SECRETARIAT
          </span>
          <h1 className="font-display-serif" style={{ fontSize: "28px", color: "var(--ink-title)", margin: "8px 0 12px" }}>
            Coordinator Portal
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--ink-body)", marginBottom: "28px", lineHeight: 1.5 }}>
            Access the institutional administrative desk to manage live events, announcements, and Google Sheets synchronization.
          </p>

          <form onSubmit={handleLogin} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            <div style={{ textAlign: "left" }}>
              <label className="form-label" style={{ fontSize: "11.5px" }}>COORDINATOR PASSKEY</label>
              <input
                type="password"
                required
                value={passkeyInput}
                onChange={(e) => setPasskeyInput(e.target.value)}
                placeholder="Enter authorized passkey..."
                className="form-input"
                style={{ fontSize: "14px", padding: "12px 14px" }}
              />
              <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-muted)", marginTop: "6px", display: "block" }}>
                Default key: FINLOGUE@LNMIIT2026
              </span>
            </div>

            {authError && (
              <div
                style={{
                  padding: "10px",
                  backgroundColor: "var(--burgundy-tint)",
                  border: "1px solid var(--burgundy-border)",
                  color: "var(--burgundy-text)",
                  fontSize: "12.5px",
                  textAlign: "left",
                }}
              >
                ⚠ {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="stamp-button stamp-button-primary"
              style={{
                width: "100%",
                padding: "12px",
                backgroundColor: "var(--navy-hero)",
                color: "#FFFFFF",
                borderColor: "var(--navy-hero)",
                marginTop: "4px",
              }}
            >
              {isVerifying ? "AUTHENTICATING..." : "AUTHORIZE ACCESS →"}
            </button>

            <Link
              href="/"
              style={{
                fontSize: "12.5px",
                color: "var(--ink-muted)",
                marginTop: "8px",
                textDecoration: "none",
              }}
            >
              ← Return to Public Portal
            </Link>
          </form>
        </div>
      </main>
    );
  }

  // 2. Authenticated Admin Dashboard View
  return (
    <main style={{ minHeight: "100vh", backgroundColor: "var(--white-alabaster)", paddingBottom: "80px" }}>
      {/* Toast Notification */}
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

      {/* Admin Header Bar */}
      <header
        style={{
          backgroundColor: "var(--navy-deep)",
          color: "#FFFFFF",
          borderBottom: "1px solid var(--navy-border)",
          padding: "18px 0",
        }}
      >
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
            <Image src="/logo.png" alt="Crest" width={36} height={36} style={{ objectFit: "contain" }} />
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--gold-oxford)", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                  INTERNAL SECRETARIAT
                </span>
                <span
                  style={{
                    fontSize: "9.5px",
                    padding: "2px 8px",
                    backgroundColor: "rgba(21, 128, 61, 0.2)",
                    color: "var(--emerald-bright)",
                    border: "1px solid rgba(21, 128, 61, 0.4)",
                    borderRadius: "4px",
                    fontFamily: "var(--font-mono)",
                  }}
                >
                  LIVE SYNC ACTIVE
                </span>
              </div>
              <h1 className="font-display-serif" style={{ fontSize: "20px", color: "#FFFFFF", margin: 0 }}>
                Finlogue Management Desk
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link
              href="/events"
              target="_blank"
              rel="noopener noreferrer"
              className="stamp-button"
              style={{
                fontSize: "12px",
                padding: "8px 16px",
                borderColor: "rgba(255,255,255,0.2)",
                color: "#FFFFFF",
              }}
            >
              PREVIEW SITE ↗
            </Link>

            <button
              type="button"
              onClick={handleOpenAddModal}
              className="stamp-button stamp-button-primary"
              style={{
                fontSize: "12px",
                padding: "8px 18px",
                backgroundColor: "var(--gold-oxford)",
                color: "var(--navy-deep)",
                borderColor: "var(--gold-oxford)",
                fontWeight: 700,
              }}
            >
              + ADD NEW EVENT
            </button>

            <button
              type="button"
              onClick={() => setIsAuthenticated(false)}
              style={{
                fontSize: "12px",
                color: "var(--platinum-muted)",
                marginLeft: "8px",
              }}
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Metrics Banner */}
      <section style={{ backgroundColor: "var(--white-pure)", borderBottom: "1px solid var(--white-border)", padding: "28px 0" }}>
        <div className="container">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "20px" }}>
            <div style={{ padding: "18px", backgroundColor: "var(--white-alabaster)", border: "1px solid var(--white-border)" }}>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)" }}>TOTAL INITIATIVES</span>
              <span className="font-display-serif" style={{ fontSize: "32px", color: "var(--ink-title)", display: "block", marginTop: "4px" }}>
                {eventsList.length}
              </span>
            </div>

            <div style={{ padding: "18px", backgroundColor: "rgba(21, 128, 61, 0.04)", border: "1px solid rgba(21, 128, 61, 0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--emerald)" }} />
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--emerald)" }}>LIVE / ACTIVE</span>
              </div>
              <span className="font-display-serif" style={{ fontSize: "32px", color: "var(--emerald)", display: "block", marginTop: "4px" }}>
                {liveCount}
              </span>
            </div>

            <div style={{ padding: "18px", backgroundColor: "rgba(197, 168, 128, 0.06)", border: "1px solid rgba(197, 168, 128, 0.3)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--gold-oxford)" }} />
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)" }}>UPCOMING ARENAS</span>
              </div>
              <span className="font-display-serif" style={{ fontSize: "32px", color: "var(--gold-oxford)", display: "block", marginTop: "4px" }}>
                {upcomingCount}
              </span>
            </div>

            <div style={{ padding: "18px", backgroundColor: "rgba(114, 47, 55, 0.04)", border: "1px solid rgba(114, 47, 55, 0.2)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                <span style={{ width: "8px", height: "8px", borderRadius: "50%", backgroundColor: "var(--burgundy-crest)" }} />
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)" }}>ARCHIVED CASES</span>
              </div>
              <span className="font-display-serif" style={{ fontSize: "32px", color: "var(--burgundy-crest)", display: "block", marginTop: "4px" }}>
                {closedCount}
              </span>
            </div>
          </div>

          {/* Google Sheets Sync Banner */}
          <div
            style={{
              marginTop: "20px",
              padding: "16px 20px",
              backgroundColor: "var(--navy-hero)",
              color: "#FFFFFF",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              flexWrap: "wrap",
              gap: "12px",
            }}
          >
            <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
              <span style={{ fontSize: "20px" }}>📊</span>
              <div>
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", textTransform: "uppercase" }}>
                  GOOGLE SHEETS DATA DISPATCH
                </span>
                <p style={{ fontSize: "13px", color: "var(--platinum-muted)", margin: 0 }}>
                  Event submissions and inquiries automatically sync to your LNMIIT Google Drive Sheet.
                </p>
              </div>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <Link
                href="/docs/GOOGLE_SHEETS_SETUP.md"
                target="_blank"
                className="stamp-button"
                style={{
                  fontSize: "11px",
                  padding: "6px 14px",
                  borderColor: "rgba(255,255,255,0.3)",
                  color: "#FFFFFF",
                }}
              >
                SETUP GUIDE ↗
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Events Manager Area */}
      <section className="container" style={{ marginTop: "36px" }}>
        {/* Filter & Search Bar */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: "16px",
            marginBottom: "24px",
          }}
        >
          {/* Status Tabs */}
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {[
              { key: "ALL", label: `ALL (${eventsList.length})` },
              { key: "ACTIVE", label: `LIVE (${liveCount})` },
              { key: "UPCOMING", label: `UPCOMING (${upcomingCount})` },
              { key: "CLOSED", label: `ARCHIVED (${closedCount})` },
            ].map((tab) => {
              const isSelected = filterStatus === tab.key;
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setFilterStatus(tab.key)}
                  className="stamp-button"
                  style={{
                    fontSize: "11.5px",
                    padding: "6px 16px",
                    backgroundColor: isSelected ? "var(--navy-hero)" : "var(--white-pure)",
                    color: isSelected ? "#FFFFFF" : "var(--ink-title)",
                    borderColor: isSelected ? "var(--navy-hero)" : "var(--white-border)",
                    fontWeight: 600,
                  }}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Search Input */}
          <div style={{ minWidth: "260px" }}>
            <input
              type="text"
              placeholder="Search initiatives, categories..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="form-input"
              style={{ fontSize: "13px", padding: "8px 14px", backgroundColor: "var(--white-pure)" }}
            />
          </div>
        </div>

        {/* Events Table / Card List */}
        {isLoadingEvents ? (
          <div style={{ padding: "60px 0", textAlign: "center", color: "var(--ink-muted)" }}>
            Loading events catalog...
          </div>
        ) : filteredEvents.length === 0 ? (
          <div style={{ padding: "60px 0", textAlign: "center", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)" }}>
            <p className="font-display-serif" style={{ fontSize: "20px", color: "var(--ink-title)" }}>No initiatives match the selected criteria.</p>
            <button
              type="button"
              onClick={handleOpenAddModal}
              className="stamp-button stamp-button-primary"
              style={{ marginTop: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}
            >
              + Create First Event
            </button>
          </div>
        ) : (
          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {filteredEvents.map((ev) => {
              const isLive = ev.status === "ACTIVE";
              const isUpcoming = ev.status === "UPCOMING";
              const isArchived = ev.status === "CLOSED";

              return (
                <div
                  key={ev.id}
                  style={{
                    backgroundColor: "var(--white-pure)",
                    border: "1px solid var(--white-border)",
                    boxShadow: "var(--card-shadow)",
                    padding: "24px 28px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  {/* Left Column: Details */}
                  <div style={{ flex: 1, minWidth: "300px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)" }}>
                        {ev.fileNumber}
                      </span>
                      <span
                        style={{
                          fontSize: "10.5px",
                          padding: "2px 8px",
                          borderRadius: "4px",
                          backgroundColor: "var(--white-alabaster)",
                          border: "1px solid var(--white-border)",
                          fontFamily: "var(--font-mono)",
                          color: "var(--ink-title)",
                          textTransform: "uppercase",
                        }}
                      >
                        {ev.category}
                      </span>
                      <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)" }}>
                        Anchor: #{ev.id}
                      </span>
                    </div>

                    <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "0 0 6px" }}>
                      {ev.title}
                    </h3>

                    <p style={{ fontSize: "13.5px", color: "var(--ink-body)", margin: "0 0 10px", lineHeight: 1.5, maxWidth: "720px" }}>
                      {ev.description}
                    </p>

                    <div style={{ display: "flex", gap: "18px", fontSize: "12px", color: "var(--ink-muted)", flexWrap: "wrap" }}>
                      <span>📅 Timeline: <strong style={{ color: "var(--ink-title)" }}>{ev.date}</strong></span>
                      <span>🏆 Output: <strong style={{ color: "var(--emerald)" }}>{ev.prizeOrOutput}</strong></span>
                      <span>👥 Target: <strong style={{ color: "var(--ink-title)" }}>{ev.eligibility}</strong></span>
                    </div>
                  </div>

                  {/* Right Column: 1-Click Status Toggler & Actions */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "12px" }}>
                    {/* Interactive 3-way Status Switcher */}
                    <div>
                      <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-muted)", display: "block", marginBottom: "6px", textAlign: "right" }}>
                        EVENT STATUS TOGGLE:
                      </span>
                      <div
                        style={{
                          display: "inline-flex",
                          border: "1px solid var(--white-border)",
                          borderRadius: "6px",
                          overflow: "hidden",
                          backgroundColor: "var(--white-alabaster)",
                        }}
                      >
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(ev.id, "ACTIVE")}
                          style={{
                            padding: "6px 14px",
                            fontSize: "11.5px",
                            fontFamily: "var(--font-mono)",
                            backgroundColor: isLive ? "var(--emerald)" : "transparent",
                            color: isLive ? "#FFFFFF" : "var(--ink-muted)",
                            fontWeight: isLive ? 700 : 500,
                            transition: "all 0.15s ease",
                          }}
                        >
                          ● LIVE
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(ev.id, "UPCOMING")}
                          style={{
                            padding: "6px 14px",
                            fontSize: "11.5px",
                            fontFamily: "var(--font-mono)",
                            backgroundColor: isUpcoming ? "var(--gold-oxford)" : "transparent",
                            color: isUpcoming ? "var(--navy-deep)" : "var(--ink-muted)",
                            fontWeight: isUpcoming ? 700 : 500,
                            transition: "all 0.15s ease",
                          }}
                        >
                          ● UPCOMING
                        </button>
                        <button
                          type="button"
                          onClick={() => handleToggleStatus(ev.id, "CLOSED")}
                          style={{
                            padding: "6px 14px",
                            fontSize: "11.5px",
                            fontFamily: "var(--font-mono)",
                            backgroundColor: isArchived ? "var(--burgundy-crest)" : "transparent",
                            color: isArchived ? "#FFFFFF" : "var(--ink-muted)",
                            fontWeight: isArchived ? 700 : 500,
                            transition: "all 0.15s ease",
                          }}
                        >
                          ● ARCHIVED
                        </button>
                      </div>
                    </div>

                    {/* Action buttons */}
                    <div style={{ display: "flex", gap: "8px", marginTop: "4px" }}>
                      <Link
                        href={`/events#${ev.id}`}
                        target="_blank"
                        className="stamp-button"
                        style={{ fontSize: "11px", padding: "6px 12px", color: "var(--ink-title)" }}
                      >
                        View Card ↗
                      </Link>
                      <button
                        type="button"
                        onClick={() => handleOpenEditModal(ev)}
                        className="stamp-button"
                        style={{ fontSize: "11px", padding: "6px 14px", borderColor: "var(--navy-hero)", color: "var(--navy-hero)" }}
                      >
                        ✎ Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(ev.id, ev.title)}
                        className="stamp-button"
                        style={{ fontSize: "11px", padding: "6px 12px", borderColor: "var(--burgundy-border)", color: "var(--burgundy-text)" }}
                      >
                        ✕ Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </section>

      {/* Add / Edit Event Modal */}
      {isAddModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsAddModalOpen(false)} />

          <div
            className="lightbox-dialog"
            style={{
              maxWidth: "600px",
              padding: "32px",
              backgroundColor: "var(--white-pure)",
              color: "var(--ink-title)",
              maxHeight: "90vh",
              overflowY: "auto",
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", borderBottom: "1px solid var(--white-border)", paddingBottom: "14px" }}>
              <div>
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", textTransform: "uppercase" }}>
                  EVENT SPECIFICATION DESK
                </span>
                <h3 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", margin: "4px 0 0" }}>
                  {editingEvent ? "Edit Initiative Dossier" : "Publish New Initiative / League"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                style={{ fontSize: "20px", color: "var(--ink-muted)" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveEvent} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="form-label">EVENT TITLE *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. NATIONAL CASE CRACKERS 2026"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="form-input"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label className="form-label">CATEGORY</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="form-input"
                    style={{ backgroundColor: "var(--white-pure)" }}
                  >
                    <option value="Consulting">Consulting</option>
                    <option value="Finance">Finance</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Venture">Venture</option>
                  </select>
                </div>

                <div>
                  <label className="form-label">INITIAL STATUS</label>
                  <select
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    className="form-input"
                    style={{ backgroundColor: "var(--white-pure)" }}
                  >
                    <option value="ACTIVE">ACTIVE (Live Registration)</option>
                    <option value="UPCOMING">UPCOMING (Teaser)</option>
                    <option value="CLOSED">CLOSED (Archived Post-Mortem)</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label className="form-label">TIMELINE / DATE</label>
                  <input
                    type="text"
                    placeholder="e.g. SPRING 2026 or APRIL 10"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    className="form-input"
                  />
                </div>

                <div>
                  <label className="form-label">PRIZE / RECOGNITION</label>
                  <input
                    type="text"
                    placeholder="e.g. ₹50,000 & Mentorship"
                    value={formData.prizeOrOutput}
                    onChange={(e) => setFormData({ ...formData, prizeOrOutput: e.target.value })}
                    className="form-input"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">ELIGIBILITY</label>
                <input
                  type="text"
                  placeholder="e.g. Open Pan-India · Undergrads & Postgrads"
                  value={formData.eligibility}
                  onChange={(e) => setFormData({ ...formData, eligibility: e.target.value })}
                  className="form-input"
                />
              </div>

              <div>
                <label className="form-label">EVENT BRIEF / DESCRIPTION *</label>
                <textarea
                  rows={4}
                  required
                  placeholder="Describe problem statements, rounds, judging criteria..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="form-textarea"
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "12px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  style={{ fontSize: "13px", color: "var(--ink-muted)", padding: "10px 18px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving}
                  className="stamp-button stamp-button-primary"
                  style={{ padding: "12px 28px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                >
                  {isSaving ? "SAVING..." : editingEvent ? "UPDATE EVENT DOSSIER →" : "PUBLISH LIVE TO WEBSITE →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
