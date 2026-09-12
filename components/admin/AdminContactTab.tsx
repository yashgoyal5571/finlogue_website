"use client";

import React, { useState } from "react";
import { ContactContent, CoordinatorContact } from "@/content/contact";

interface AdminContactTabProps {
  data: ContactContent;
  onSave: (updated: ContactContent) => Promise<void>;
  showToast: (msg: string) => void;
}

export default function AdminContactTab({ data, onSave, showToast }: AdminContactTabProps) {
  const [contactData, setContactData] = useState<ContactContent>(data);
  const [isSaving, setIsSaving] = useState(false);

  // Coordinator Modal state
  const [isCoordModalOpen, setIsCoordModalOpen] = useState(false);
  const [editingCoordIndex, setEditingCoordIndex] = useState<number | null>(null);
  const [coordForm, setCoordForm] = useState<CoordinatorContact>({
    name: "",
    role: "Coordinator",
    dept: "",
    email: "",
    linkedin: "",
  });

  // New Inquiry Type input state
  const [newInquiryType, setNewInquiryType] = useState("");

  const handleSaveAll = async (override?: ContactContent) => {
    setIsSaving(true);
    const toSave = override || contactData;
    try {
      await onSave(toSave);
      showToast("Contact details & registration form updated & published live!");
    } catch {
      alert("Failed to save contact content.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- Coordinators / Contact Persons CRUD ---
  const handleOpenCoordModal = (coord?: CoordinatorContact, index?: number) => {
    if (coord && index !== undefined) {
      setEditingCoordIndex(index);
      setCoordForm({ ...coord });
    } else {
      setEditingCoordIndex(null);
      setCoordForm({
        name: "",
        role: "Coordinator",
        dept: "",
        email: "",
        linkedin: "",
      });
    }
    setIsCoordModalOpen(true);
  };

  const handleSaveCoord = (e: React.FormEvent) => {
    e.preventDefault();
    if (!coordForm.name.trim() || !coordForm.email.trim()) {
      alert("Name and Email are required.");
      return;
    }

    const coordinators = [...(contactData.coordinators || [])];
    if (editingCoordIndex !== null) {
      coordinators[editingCoordIndex] = coordForm;
    } else {
      coordinators.push(coordForm);
    }

    const updated = { ...contactData, coordinators };
    setContactData(updated);
    setIsCoordModalOpen(false);
    handleSaveAll(updated);
  };

  const handleDeleteCoord = (index: number) => {
    if (!confirm("Are you sure you want to remove this contact person?")) return;
    const coordinators = (contactData.coordinators || []).filter((_, i) => i !== index);
    const updated = { ...contactData, coordinators };
    setContactData(updated);
    handleSaveAll(updated);
  };

  // --- Inquiry Types Management ---
  const handleAddInquiryType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newInquiryType.trim()) return;
    const types = [...(contactData.inquiryTypes || []), newInquiryType.trim()];
    const updated = { ...contactData, inquiryTypes: types };
    setContactData(updated);
    setNewInquiryType("");
    handleSaveAll(updated);
  };

  const handleDeleteInquiryType = (index: number) => {
    const types = (contactData.inquiryTypes || []).filter((_, i) => i !== index);
    const updated = { ...contactData, inquiryTypes: types };
    setContactData(updated);
    handleSaveAll(updated);
  };

  const handleUpdateInquiryType = (index: number, val: string) => {
    const types = [...(contactData.inquiryTypes || [])];
    types[index] = val;
    setContactData({ ...contactData, inquiryTypes: types });
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* 1. Office Location & Official Coordinates */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
              CENTRAL CORRESPONDENCE
            </span>
            <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
              Office Location & Coordinates
            </h3>
          </div>
          <button
            type="button"
            onClick={() => handleSaveAll()}
            disabled={isSaving}
            className="stamp-button stamp-button-primary"
            style={{ padding: "8px 20px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
          >
            {isSaving ? "SAVING..." : "SAVE CONTACT INFO →"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(240px, 1fr))", gap: "20px" }}>
          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              INSTITUTE / CAMPUS
            </label>
            <input
              type="text"
              value={contactData.office?.campus || ""}
              onChange={(e) =>
                setContactData({
                  ...contactData,
                  office: { ...contactData.office, campus: e.target.value },
                })
              }
              className="form-input"
              style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              BUILDING / ROOM
            </label>
            <input
              type="text"
              value={contactData.office?.building || ""}
              onChange={(e) =>
                setContactData({
                  ...contactData,
                  office: { ...contactData.office, building: e.target.value },
                })
              }
              className="form-input"
              style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              OFFICIAL EMAIL
            </label>
            <input
              type="email"
              value={contactData.office?.email || ""}
              onChange={(e) =>
                setContactData({
                  ...contactData,
                  office: { ...contactData.office, email: e.target.value },
                })
              }
              className="form-input"
              style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              OFFICE HOURS
            </label>
            <input
              type="text"
              value={contactData.office?.hours || ""}
              onChange={(e) =>
                setContactData({
                  ...contactData,
                  office: { ...contactData.office, hours: e.target.value },
                })
              }
              placeholder="e.g. Monday – Saturday: 10:00 AM – 8:00 PM IST"
              className="form-input"
              style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
            />
          </div>
        </div>

        <div style={{ marginTop: "16px" }}>
          <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
            POSTAL ADDRESS
          </label>
          <input
            type="text"
            value={contactData.office?.address || ""}
            onChange={(e) =>
              setContactData({
                ...contactData,
                office: { ...contactData.office, address: e.target.value },
              })
            }
            className="form-input"
            style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
          />
        </div>
      </div>

      {/* 2. Direct Channels: Contact Person Details (Student Coordinators) */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
              DIRECT CHANNELS
            </span>
            <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
              Student Coordinators & Contact Persons ({(contactData.coordinators || []).length})
            </h3>
          </div>
          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={() => handleOpenCoordModal()}
              className="stamp-button stamp-button-primary"
              style={{ padding: "8px 18px", fontSize: "12px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
            >
              + ADD CONTACT PERSON
            </button>
            <button
              type="button"
              onClick={() => handleSaveAll()}
              disabled={isSaving}
              className="stamp-button"
              style={{ padding: "8px 18px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
            >
              SAVE PERSONS →
            </button>
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "20px" }}>
          {(contactData.coordinators || []).map((coord, idx) => (
            <div
              key={idx}
              onClick={() => handleOpenCoordModal(coord, idx)}
              title="Click anywhere to edit details"
              style={{
                padding: "20px",
                backgroundColor: "var(--white-alabaster)",
                border: "1px solid var(--white-border)",
                borderRadius: "10px",
                position: "relative",
                cursor: "pointer",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                minHeight: "140px",
                transition: "transform 0.18s ease, box-shadow 0.18s ease, border-color 0.18s ease",
                boxShadow: "0 2px 6px rgba(10, 19, 41, 0.03)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-3px)";
                e.currentTarget.style.boxShadow = "0 10px 24px rgba(10, 19, 41, 0.08)";
                e.currentTarget.style.borderColor = "var(--gold-oxford)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 2px 6px rgba(10, 19, 41, 0.03)";
                e.currentTarget.style.borderColor = "var(--white-border)";
              }}
            >
              {/* Single Delete Icon Button */}
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCoord(idx);
                }}
                title={`Delete ${coord.name}`}
                aria-label={`Delete ${coord.name}`}
                style={{
                  position: "absolute",
                  top: "14px",
                  right: "14px",
                  width: "32px",
                  height: "32px",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(220, 38, 38, 0.07)",
                  border: "1px solid rgba(220, 38, 38, 0.25)",
                  color: "#dc2626",
                  cursor: "pointer",
                  transition: "all 0.15s ease",
                  zIndex: 2,
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = "#dc2626";
                  e.currentTarget.style.color = "#FFFFFF";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "rgba(220, 38, 38, 0.07)";
                  e.currentTarget.style.color = "#dc2626";
                }}
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="3 6 5 6 21 6" />
                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                  <line x1="10" y1="11" x2="10" y2="17" />
                  <line x1="14" y1="11" x2="14" y2="17" />
                </svg>
              </button>

              {/* Profile Overview (Matching Team Tab style) */}
              <div>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <div
                    style={{
                      width: "52px",
                      height: "52px",
                      borderRadius: "50%",
                      border: "2px solid var(--gold-oxford)",
                      backgroundColor: "#0A1329",
                      color: "var(--gold-oxford)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "20px",
                      fontWeight: 700,
                      fontFamily: "var(--font-serif)",
                      flexShrink: 0,
                    }}
                  >
                    {coord.name ? coord.name.charAt(0).toUpperCase() : "C"}
                  </div>

                  <div style={{ paddingRight: "36px" }}>
                    <h4 className="font-display-serif" style={{ fontSize: "18px", color: "var(--ink-title)", margin: 0, fontWeight: 700 }}>
                      {coord.name}
                    </h4>
                    <p style={{ fontSize: "12.5px", color: "var(--ink-muted)", margin: "3px 0 0", fontWeight: 500 }}>
                      {coord.dept || "Institutional Strategy"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Contact Links Strip */}
              <div style={{ marginTop: "12px", paddingTop: "10px", borderTop: "1px solid rgba(7, 13, 30, 0.06)", display: "flex", flexDirection: "column", gap: "5px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--navy-hero)" }}>
                  <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect width="20" height="16" x="2" y="4" rx="2" />
                    <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
                  </svg>
                  <span style={{ fontWeight: 600 }}>{coord.email}</span>
                </div>
                {coord.linkedin && (
                  <div style={{ display: "flex", alignItems: "center", gap: "6px", fontSize: "12px", color: "var(--gold-oxford)" }}>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.64c-.88 0-1.6.72-1.6 1.6 0 .88.72 1.6 1.6 1.6.88 0 1.6-.72 1.6-1.6 0-.88-.72-1.6-1.6-1.6Z" />
                    </svg>
                    <span style={{ overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>LinkedIn Profile</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Registration Form Details & Dropdown Options ("Official Intake Slip") */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
              INTAKE SLIP & REGISTRATION
            </span>
            <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
              Registration Form Details & Inquiry Options
            </h3>
          </div>
          <button
            type="button"
            onClick={() => handleSaveAll()}
            disabled={isSaving}
            className="stamp-button stamp-button-primary"
            style={{ padding: "8px 20px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
          >
            {isSaving ? "SAVING..." : "SAVE FORM SETTINGS →"}
          </button>
        </div>

        {/* Form Page Headings */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "16px", marginBottom: "24px" }}>
          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              PAGE HERO BADGE
            </label>
            <input
              type="text"
              value={contactData.header?.badge || ""}
              onChange={(e) =>
                setContactData({
                  ...contactData,
                  header: { ...contactData.header, badge: e.target.value },
                })
              }
              className="form-input"
              style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              PAGE HERO TITLE
            </label>
            <input
              type="text"
              value={contactData.header?.title || ""}
              onChange={(e) =>
                setContactData({
                  ...contactData,
                  header: { ...contactData.header, title: e.target.value },
                })
              }
              className="form-input"
              style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
            />
          </div>
        </div>

        <div style={{ marginBottom: "28px" }}>
          <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
            PAGE HERO SUBTITLE
          </label>
          <textarea
            rows={2}
            value={contactData.header?.subtitle || ""}
            onChange={(e) =>
              setContactData({
                ...contactData,
                header: { ...contactData.header, subtitle: e.target.value },
              })
            }
            className="form-textarea"
            style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
          />
        </div>

        {/* Nature of Inquiry Options (The Registration Form Select Dropdown) */}
        <div style={{ borderTop: "1px solid var(--white-border)", paddingTop: "20px" }}>
          <div style={{ marginBottom: "14px" }}>
            <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--navy-hero)", fontWeight: 700, textTransform: "uppercase" }}>
              FORM DROPDOWN OPTIONS
            </span>
            <h4 className="font-display-serif" style={{ fontSize: "17px", color: "var(--ink-title)", margin: "4px 0 0" }}>
              Nature of Inquiry Options (Intake Form Dropdown)
            </h4>
            <p style={{ fontSize: "12.5px", color: "var(--ink-muted)", margin: "4px 0 14px" }}>
              These options appear in the dropdown menu on the Contact Us intake form:
            </p>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "16px" }}>
            {(contactData.inquiryTypes || []).map((type, idx) => (
              <div
                key={idx}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                <span
                  style={{
                    width: "28px",
                    height: "28px",
                    borderRadius: "50%",
                    backgroundColor: "var(--navy-hero)",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontWeight: 700,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                  }}
                >
                  {idx + 1}
                </span>
                <input
                  type="text"
                  value={type}
                  onChange={(e) => handleUpdateInquiryType(idx, e.target.value)}
                  onBlur={() => handleSaveAll()}
                  className="form-input"
                  style={{ flex: 1, padding: "8px 12px", fontSize: "13px" }}
                />
                <button
                  type="button"
                  onClick={() => handleDeleteInquiryType(idx)}
                  className="stamp-button"
                  style={{ padding: "6px 12px", fontSize: "12px", color: "#dc2626", borderColor: "rgba(220,38,38,0.3)" }}
                  title="Remove inquiry option"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>

          {/* Add New Inquiry Option Form */}
          <form onSubmit={handleAddInquiryType} style={{ display: "flex", gap: "10px", maxWidth: "600px" }}>
            <input
              type="text"
              value={newInquiryType}
              onChange={(e) => setNewInquiryType(e.target.value)}
              placeholder="e.g. Media & Press Inquiries"
              className="form-input"
              style={{ flex: 1, padding: "8px 12px", fontSize: "13px" }}
            />
            <button
              type="submit"
              className="stamp-button"
              style={{ padding: "8px 16px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)", whiteSpace: "nowrap" }}
            >
              + ADD OPTION
            </button>
          </form>
        </div>
      </div>

      {/* ===================== MODAL: COORDINATOR / CONTACT PERSON ===================== */}
      {isCoordModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsCoordModalOpen(false)} aria-hidden="true" />
          <div className="lightbox-dialog" style={{ maxWidth: "520px", padding: "28px", position: "relative", zIndex: 10, backgroundColor: "var(--white-pure)", borderRadius: "8px" }}>
            <h3 className="font-display-serif" style={{ fontSize: "20px", color: "var(--ink-title)", margin: "0 0 16px" }}>
              {editingCoordIndex !== null ? "Edit Contact Person" : "Add New Contact Person"}
            </h3>

            <form onSubmit={handleSaveCoord} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>FULL NAME *</label>
                <input
                  type="text"
                  required
                  value={coordForm.name}
                  onChange={(e) => setCoordForm({ ...coordForm, name: e.target.value })}
                  placeholder="e.g. Aditya Tiwari"
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>DEPARTMENT / FOCUS</label>
                <input
                  type="text"
                  value={coordForm.dept}
                  onChange={(e) => setCoordForm({ ...coordForm, dept: e.target.value })}
                  placeholder="e.g. Institutional Strategy & Leadership"
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>OFFICIAL EMAIL *</label>
                <input
                  type="email"
                  required
                  value={coordForm.email}
                  onChange={(e) => setCoordForm({ ...coordForm, email: e.target.value })}
                  placeholder="e.g. 24uec533@lnmiit.ac.in"
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>LINKEDIN PROFILE URL</label>
                <input
                  type="url"
                  value={coordForm.linkedin || ""}
                  onChange={(e) => setCoordForm({ ...coordForm, linkedin: e.target.value })}
                  placeholder="https://www.linkedin.com/in/username"
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px" }}
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsCoordModalOpen(false)}
                  className="stamp-button"
                  style={{ padding: "8px 16px", fontSize: "12px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="stamp-button stamp-button-primary"
                  style={{ padding: "8px 18px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
                >
                  Save Contact Person
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
