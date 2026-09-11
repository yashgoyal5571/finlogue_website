"use client";

import React, { useState } from "react";
import { EventsContent, CaseFile, InvestorMentor, PotrStat } from "@/content/events";

interface AdminEventsTabProps {
  data: EventsContent;
  onSave: (updated: EventsContent) => Promise<void>;
  showToast: (msg: string) => void;
}

export default function AdminEventsTab({ data, onSave, showToast }: AdminEventsTabProps) {
  const [eventsData, setEventsData] = useState<EventsContent>(data);
  const [isSaving, setIsSaving] = useState(false);

  // Active sub-tab inside Events
  const [activeSubTab, setActiveSubTab] = useState<"potr" | "caseFiles">("potr");

  // Investor Modal State
  const [isInvestorModalOpen, setIsInvestorModalOpen] = useState(false);
  const [editingInvestorIndex, setEditingInvestorIndex] = useState<number | null>(null);
  const [investorForm, setInvestorForm] = useState<InvestorMentor>({
    name: "",
    credential: "",
    role: "Keynote Jury",
    linkedInPostUrl: "",
    initials: "",
  });

  // Case File Modal State
  const [isCaseModalOpen, setIsCaseModalOpen] = useState(false);
  const [editingCaseId, setEditingCaseId] = useState<string | null>(null);
  const [caseForm, setCaseForm] = useState<CaseFile>({
    id: "",
    fileNumber: "INITIATIVE",
    title: "",
    status: "ACTIVE",
    category: "Strategy",
    date: "SPRING 2026",
    description: "",
    prizeOrOutput: "₹50,000 & Citation",
    eligibility: "Open Pan-India",
  });

  const handleSaveAll = async (overrideData?: EventsContent) => {
    setIsSaving(true);
    const dataToSave = overrideData || eventsData;
    try {
      await onSave(dataToSave);
      showToast("Events & POTR content successfully saved & published live!");
    } catch {
      alert("Failed to save Events content.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- POTR STAT CHANGES ---
  const handlePotrStatChange = (idx: number, field: keyof PotrStat, val: string) => {
    const updatedStats = [...eventsData.flagship.stats];
    updatedStats[idx] = { ...updatedStats[idx], [field]: val };
    const updated = {
      ...eventsData,
      flagship: { ...eventsData.flagship, stats: updatedStats },
    };
    setEventsData(updated);
  };

  // --- INVESTORS CRUD ---
  const handleOpenInvestorModal = (inv?: InvestorMentor, index?: number) => {
    if (inv !== undefined && index !== undefined) {
      setEditingInvestorIndex(index);
      setInvestorForm({ ...inv });
    } else {
      setEditingInvestorIndex(null);
      setInvestorForm({
        name: "",
        credential: "",
        role: "Keynote Jury",
        linkedInPostUrl: "",
        initials: "",
      });
    }
    setIsInvestorModalOpen(true);
  };

  const handleSaveInvestor = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedList = [...eventsData.flagship.investorsMentors];

    const initials =
      investorForm.initials ||
      investorForm.name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    const finalizedInvestor = { ...investorForm, initials };

    if (editingInvestorIndex !== null) {
      updatedList[editingInvestorIndex] = finalizedInvestor;
    } else {
      updatedList.push(finalizedInvestor);
    }

    const updated = {
      ...eventsData,
      flagship: { ...eventsData.flagship, investorsMentors: updatedList },
    };
    setEventsData(updated);
    setIsInvestorModalOpen(false);
    handleSaveAll(updated);
  };

  const handleDeleteInvestor = (index: number) => {
    const inv = eventsData.flagship.investorsMentors[index];
    if (!window.confirm(`Remove investor ${inv.name}?`)) return;

    const updatedList = eventsData.flagship.investorsMentors.filter((_, i) => i !== index);
    const updated = {
      ...eventsData,
      flagship: { ...eventsData.flagship, investorsMentors: updatedList },
    };
    setEventsData(updated);
    handleSaveAll(updated);
  };

  // --- CASE FILES CRUD ---
  const handleOpenCaseModal = (cf?: CaseFile) => {
    if (cf) {
      setEditingCaseId(cf.id);
      setCaseForm({ ...cf });
    } else {
      setEditingCaseId(null);
      setCaseForm({
        id: `initiative-${Date.now()}`,
        fileNumber: `INITIATIVE 0${eventsData.caseFiles.length + 1}`,
        title: "",
        status: "ACTIVE",
        category: "Strategy",
        date: "SPRING 2026",
        description: "",
        prizeOrOutput: "₹50,000 & Citation",
        eligibility: "Open Pan-India",
      });
    }
    setIsCaseModalOpen(true);
  };

  const handleSaveCase = (e: React.FormEvent) => {
    e.preventDefault();
    const list = [...eventsData.caseFiles];
    if (editingCaseId) {
      const idx = list.findIndex((c) => c.id === editingCaseId);
      if (idx >= 0) list[idx] = caseForm;
    } else {
      list.push(caseForm);
    }

    const updated = { ...eventsData, caseFiles: list };
    setEventsData(updated);
    setIsCaseModalOpen(false);
    handleSaveAll(updated);
  };

  const handleToggleCaseStatus = (id: string, newStatus: CaseFile["status"]) => {
    const list = eventsData.caseFiles.map((c) =>
      c.id === id ? { ...c, status: newStatus } : c
    );
    const updated = { ...eventsData, caseFiles: list };
    setEventsData(updated);
    handleSaveAll(updated);
  };

  const handleDeleteCase = (id: string, title: string) => {
    if (!window.confirm(`Delete case competition "${title}"?`)) return;
    const list = eventsData.caseFiles.filter((c) => c.id !== id);
    const updated = { ...eventsData, caseFiles: list };
    setEventsData(updated);
    handleSaveAll(updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
      {/* Sub-Tabs Selector */}
      <div style={{ display: "flex", gap: "10px", borderBottom: "1px solid var(--white-border)", paddingBottom: "14px" }}>
        <button
          type="button"
          onClick={() => setActiveSubTab("potr")}
          className="stamp-button"
          style={{
            padding: "8px 18px",
            fontSize: "12.5px",
            backgroundColor: activeSubTab === "potr" ? "var(--navy-hero)" : "var(--white-pure)",
            color: activeSubTab === "potr" ? "#FFFFFF" : "var(--ink-title)",
            borderColor: activeSubTab === "potr" ? "var(--navy-hero)" : "var(--white-border)",
            fontWeight: 700,
          }}
        >
          🏆 PITCH ON THE ROCKS (POTR)
        </button>

        <button
          type="button"
          onClick={() => setActiveSubTab("caseFiles")}
          className="stamp-button"
          style={{
            padding: "8px 18px",
            fontSize: "12.5px",
            backgroundColor: activeSubTab === "caseFiles" ? "var(--navy-hero)" : "var(--white-pure)",
            color: activeSubTab === "caseFiles" ? "#FFFFFF" : "var(--ink-title)",
            borderColor: activeSubTab === "caseFiles" ? "var(--navy-hero)" : "var(--white-border)",
            fontWeight: 700,
          }}
        >
          📂 CASE FILES & LEAGUES ({eventsData.caseFiles.length})
        </button>
      </div>

      {/* ===================== TAB 1: POTR ===================== */}
      {activeSubTab === "potr" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "28px" }}>
          {/* Header & General Narrative */}
          <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <div>
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
                  FLAGSHIP VENTURE SUMMIT
                </span>
                <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
                  Pitch on the Rocks (POTR) Overview
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleSaveAll()}
                disabled={isSaving}
                className="stamp-button stamp-button-primary"
                style={{ padding: "8px 20px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
              >
                {isSaving ? "SAVING..." : "SAVE POTR DETAILS →"}
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              <div>
                <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
                  SUMMIT TITLE
                </label>
                <input
                  type="text"
                  value={eventsData.flagship.title}
                  onChange={(e) =>
                    setEventsData({
                      ...eventsData,
                      flagship: { ...eventsData.flagship, title: e.target.value },
                    })
                  }
                  className="form-input"
                  style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
                  EDITION BADGE (e.g. EDITION 2025–2026)
                </label>
                <input
                  type="text"
                  value={eventsData.flagship.edition}
                  onChange={(e) =>
                    setEventsData({
                      ...eventsData,
                      flagship: { ...eventsData.flagship, edition: e.target.value },
                    })
                  }
                  className="form-input"
                  style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
                  TAGLINE
                </label>
                <input
                  type="text"
                  value={eventsData.flagship.tagline}
                  onChange={(e) =>
                    setEventsData({
                      ...eventsData,
                      flagship: { ...eventsData.flagship, tagline: e.target.value },
                    })
                  }
                  className="form-input"
                  style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
                />
              </div>
            </div>

            <div style={{ marginTop: "20px" }}>
              <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
                ABOUT THE SUMMIT (NARRATIVE)
              </label>
              <textarea
                rows={3}
                value={eventsData.flagship.about}
                onChange={(e) =>
                  setEventsData({
                    ...eventsData,
                    flagship: { ...eventsData.flagship, about: e.target.value },
                  })
                }
                className="form-input"
                style={{ width: "100%", padding: "10px 14px", fontSize: "13px", lineHeight: 1.5 }}
              />
            </div>
          </div>

          {/* Animated Stats Bar */}
          <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
            <h3 className="font-display-serif" style={{ fontSize: "20px", color: "var(--ink-title)", margin: "0 0 16px" }}>
              POTR Impact Metrics (Animated Counters)
            </h3>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
              {eventsData.flagship.stats.map((st, idx) => (
                <div key={idx} style={{ padding: "18px", backgroundColor: "var(--white-alabaster)", border: "1px solid var(--white-border)", borderRadius: "6px" }}>
                  <label className="form-label" style={{ fontSize: "11px", display: "block", marginBottom: "4px" }}>
                    VALUE (e.g. ₹25CR+, 25+, 9+)
                  </label>
                  <input
                    type="text"
                    value={st.value}
                    onChange={(e) => handlePotrStatChange(idx, "value", e.target.value)}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-serif)", marginBottom: "10px" }}
                  />

                  <label className="form-label" style={{ fontSize: "11px", display: "block", marginBottom: "4px" }}>
                    LABEL
                  </label>
                  <input
                    type="text"
                    value={st.label}
                    onChange={(e) => handlePotrStatChange(idx, "label", e.target.value)}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "12px", marginBottom: "10px" }}
                  />

                  <label className="form-label" style={{ fontSize: "11px", display: "block", marginBottom: "4px" }}>
                    SUBTITLE EXPLAINER
                  </label>
                  <input
                    type="text"
                    value={st.description || ""}
                    onChange={(e) => handlePotrStatChange(idx, "description", e.target.value)}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "12px" }}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Active Investors in Attendance */}
          <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "10px" }}>
              <div>
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
                  JURY & MENTOR DIRECTORY
                </span>
                <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
                  Active Investors in Attendance ({eventsData.flagship.investorsMentors.length})
                </h3>
              </div>
              <button
                type="button"
                onClick={() => handleOpenInvestorModal()}
                className="stamp-button stamp-button-primary"
                style={{ padding: "8px 18px", fontSize: "12px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
              >
                + ADD INVESTOR / JURY
              </button>
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "18px" }}>
              {eventsData.flagship.investorsMentors.map((inv, idx) => (
                <div
                  key={idx}
                  style={{
                    padding: "20px",
                    backgroundColor: "var(--white-alabaster)",
                    border: "1px solid var(--white-border)",
                    borderRadius: "6px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                      <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
                        {inv.role || "JURY"}
                      </span>
                      {inv.linkedInPostUrl && (
                        <a
                          href={inv.linkedInPostUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          style={{ fontSize: "11px", color: "#0077b5", textDecoration: "none", fontWeight: 600 }}
                        >
                          LinkedIn ↗
                        </a>
                      )}
                    </div>
                    <h4 className="font-display-serif" style={{ fontSize: "18px", color: "var(--ink-title)", margin: "0 0 6px" }}>
                      {inv.name}
                    </h4>
                    <p style={{ fontSize: "12.5px", color: "var(--ink-body)", margin: 0, lineHeight: 1.4 }}>
                      {inv.credential}
                    </p>
                  </div>

                  <div style={{ display: "flex", gap: "10px", marginTop: "16px", paddingTop: "12px", borderTop: "1px solid var(--white-border)" }}>
                    <button
                      type="button"
                      onClick={() => handleOpenInvestorModal(inv, idx)}
                      className="stamp-button"
                      style={{ flex: 1, padding: "6px", fontSize: "11.5px" }}
                    >
                      ✎ Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteInvestor(idx)}
                      className="stamp-button"
                      style={{ padding: "6px 12px", fontSize: "11.5px", color: "#dc2626", borderColor: "rgba(220, 38, 38, 0.3)" }}
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ===================== TAB 2: CASE FILES & COMPETITIONS ===================== */}
      {activeSubTab === "caseFiles" && (
        <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
            <div>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
                CASE ARCHIVE & LEAGUES
              </span>
              <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
                Case Competitions & Initiatives ({eventsData.caseFiles.length})
              </h3>
            </div>
            <button
              type="button"
              onClick={() => handleOpenCaseModal()}
              className="stamp-button stamp-button-primary"
              style={{ padding: "8px 18px", fontSize: "12px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
            >
              + ADD NEW INITIATIVE / COMPETITION
            </button>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
            {eventsData.caseFiles.map((cf) => (
              <div
                key={cf.id}
                style={{
                  padding: "20px 24px",
                  backgroundColor: "var(--white-alabaster)",
                  border: "1px solid var(--white-border)",
                  borderRadius: "6px",
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: "16px",
                }}
              >
                <div style={{ maxWidth: "680px" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "6px" }}>
                    <span
                      style={{
                        fontSize: "10px",
                        padding: "2px 8px",
                        borderRadius: "4px",
                        fontWeight: 700,
                        backgroundColor: cf.status === "ACTIVE" ? "rgba(21, 128, 61, 0.15)" : cf.status === "UPCOMING" ? "rgba(202, 138, 4, 0.15)" : "rgba(100, 116, 139, 0.15)",
                        color: cf.status === "ACTIVE" ? "#15803d" : cf.status === "UPCOMING" ? "#a16207" : "#475569",
                        fontFamily: "var(--font-mono)",
                      }}
                    >
                      {cf.status}
                    </span>
                    <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)" }}>
                      {cf.category}
                    </span>
                    <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)" }}>
                      · {cf.date}
                    </span>
                  </div>

                  <h4 className="font-display-serif" style={{ fontSize: "18px", color: "var(--ink-title)", margin: "0 0 6px" }}>
                    {cf.title}
                  </h4>
                  <p style={{ fontSize: "13px", color: "var(--ink-body)", margin: 0, lineHeight: 1.5 }}>
                    {cf.description}
                  </p>
                </div>

                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <select
                    value={cf.status}
                    onChange={(e) => handleToggleCaseStatus(cf.id, e.target.value as CaseFile["status"])}
                    className="form-input"
                    style={{ padding: "6px 10px", fontSize: "12px", width: "120px" }}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => handleOpenCaseModal(cf)}
                    className="stamp-button"
                    style={{ padding: "6px 14px", fontSize: "12px" }}
                  >
                    ✎ Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => handleDeleteCase(cf.id, cf.title)}
                    className="stamp-button"
                    style={{ padding: "6px 12px", fontSize: "12px", color: "#dc2626", borderColor: "rgba(220, 38, 38, 0.3)" }}
                  >
                    ✕
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ===================== MODAL: INVESTOR ===================== */}
      {isInvestorModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsInvestorModalOpen(false)} aria-hidden="true" />
          <div className="lightbox-dialog" style={{ maxWidth: "480px", padding: "28px", position: "relative", zIndex: 10, backgroundColor: "var(--white-pure)", borderRadius: "8px" }}>
            <h3 className="font-display-serif" style={{ fontSize: "20px", color: "var(--ink-title)", margin: "0 0 16px" }}>
              {editingInvestorIndex !== null ? "Edit Investor / Jury" : "Add Active Investor"}
            </h3>

            <form onSubmit={handleSaveInvestor} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>FULL NAME</label>
                <input
                  type="text"
                  required
                  value={investorForm.name}
                  onChange={(e) => setInvestorForm({ ...investorForm, name: e.target.value })}
                  placeholder="e.g. Ninad Karpe"
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>ONE-LINER CREDENTIAL / TITLE</label>
                <input
                  type="text"
                  required
                  value={investorForm.credential}
                  onChange={(e) => setInvestorForm({ ...investorForm, credential: e.target.value })}
                  placeholder="e.g. Partner, 100X.VC & Veteran Angel Investor"
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>LINKEDIN POST / PROFILE URL</label>
                <input
                  type="url"
                  value={investorForm.linkedInPostUrl || ""}
                  onChange={(e) => setInvestorForm({ ...investorForm, linkedInPostUrl: e.target.value })}
                  placeholder="https://www.linkedin.com/posts/..."
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                />
                <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-muted)", marginTop: "4px", display: "block" }}>
                  Card on the Events page will hyperlink directly to this post.
                </span>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsInvestorModalOpen(false)}
                  className="stamp-button"
                  style={{ padding: "8px 16px", fontSize: "12px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="stamp-button stamp-button-primary"
                  style={{ padding: "8px 20px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                >
                  Save Investor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ===================== MODAL: CASE COMPETITION ===================== */}
      {isCaseModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsCaseModalOpen(false)} aria-hidden="true" />
          <div className="lightbox-dialog" style={{ maxWidth: "560px", padding: "28px", position: "relative", zIndex: 10, backgroundColor: "var(--white-pure)", borderRadius: "8px" }}>
            <h3 className="font-display-serif" style={{ fontSize: "20px", color: "var(--ink-title)", margin: "0 0 16px" }}>
              {editingCaseId ? "Edit Case Competition" : "Add New Initiative"}
            </h3>

            <form onSubmit={handleSaveCase} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>TITLE</label>
                  <input
                    type="text"
                    required
                    value={caseForm.title}
                    onChange={(e) => setCaseForm({ ...caseForm, title: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>CATEGORY</label>
                  <select
                    value={caseForm.category}
                    onChange={(e) => setCaseForm({ ...caseForm, category: e.target.value as any })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  >
                    <option value="Strategy">Strategy</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Finance">Finance</option>
                    <option value="Venture">Venture</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>STATUS</label>
                  <select
                    value={caseForm.status}
                    onChange={(e) => setCaseForm({ ...caseForm, status: e.target.value as any })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  >
                    <option value="ACTIVE">ACTIVE</option>
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="CLOSED">CLOSED</option>
                  </select>
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>DATE / TIMELINE</label>
                  <input
                    type="text"
                    value={caseForm.date}
                    onChange={(e) => setCaseForm({ ...caseForm, date: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>DESCRIPTION / PROBLEM BRIEF</label>
                <textarea
                  rows={3}
                  required
                  value={caseForm.description}
                  onChange={(e) => setCaseForm({ ...caseForm, description: e.target.value })}
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px", lineHeight: 1.4 }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>PRIZE / OUTPUT</label>
                  <input
                    type="text"
                    value={caseForm.prizeOrOutput}
                    onChange={(e) => setCaseForm({ ...caseForm, prizeOrOutput: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>ELIGIBILITY</label>
                  <input
                    type="text"
                    value={caseForm.eligibility}
                    onChange={(e) => setCaseForm({ ...caseForm, eligibility: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsCaseModalOpen(false)}
                  className="stamp-button"
                  style={{ padding: "8px 16px", fontSize: "12px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="stamp-button stamp-button-primary"
                  style={{ padding: "8px 20px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                >
                  Save Initiative
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
