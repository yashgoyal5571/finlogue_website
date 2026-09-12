"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { TeamMemberItem } from "@/lib/cms-types";

interface AdminTeamTabProps {
  data: TeamMemberItem[];
  onSave: (updated: TeamMemberItem[]) => Promise<void>;
  showToast: (msg: string) => void;
}

export default function AdminTeamTab({ data, onSave, showToast }: AdminTeamTabProps) {
  const [teamList, setTeamList] = useState<TeamMemberItem[]>(data);
  const [filterTier, setFilterTier] = useState<string>("ALL");
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);

  // Field validation and bottom center notice
  const [fieldErrors, setFieldErrors] = useState<{
    name?: string;
    email?: string;
    linkedin?: string;
  }>({});
  const [bottomNotice, setBottomNotice] = useState<string | null>(null);

  const showBottomNotice = (msg: string) => {
    setBottomNotice(msg);
    setTimeout(() => {
      setBottomNotice(null);
    }, 3800);
  };

  // Member modal state
  const [isMemberModalOpen, setIsMemberModalOpen] = useState(false);
  const [editingMemberId, setEditingMemberId] = useState<string | null>(null);
  const [memberForm, setMemberForm] = useState<TeamMemberItem>({
    id: "",
    name: "",
    role: "Associate",
    tier: "coreTeam",
    dept: "",
    email: "",
    linkedin: "",
    image: "/assets/team/aryan-mittal.jpg",
  });

  const memberFileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveAll = async (overrideList?: TeamMemberItem[]) => {
    setIsSaving(true);
    const toSave = overrideList || teamList;
    try {
      await onSave(toSave);
      showToast("Team roster saved & published live!");
    } catch {
      alert("Failed to save team roster.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleFileUpload = async (file: File): Promise<string | null> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", "team");

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast("Portrait uploaded from device!");
        return json.url;
      } else {
        alert(json.error || "Portrait upload failed.");
        return null;
      }
    } catch (err: any) {
      alert(`Upload error: ${err?.message || "Could not upload image"}`);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  const handleModalPhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const url = await handleFileUpload(file);
    if (url) {
      setMemberForm((prev) => ({ ...prev, image: url }));
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = () => {
    setIsDragOver(false);
  };

  const handleDrop = async (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const url = await handleFileUpload(file);
      if (url) {
        setMemberForm((prev) => ({ ...prev, image: url }));
      }
    }
  };

  const handleOpenMemberModal = (member?: TeamMemberItem) => {
    setFieldErrors({});
    if (member) {
      setEditingMemberId(member.id);
      setMemberForm({
        ...member,
        dept: member.dept || "",
      });
    } else {
      setEditingMemberId(null);
      setMemberForm({
        id: `team-${Date.now()}`,
        name: "",
        role: "Associate",
        tier: "coreTeam",
        dept: "",
        email: "",
        linkedin: "",
        image: "/assets/team/aryan-mittal.jpg",
      });
    }
    setIsMemberModalOpen(true);
  };

  // Validation helpers
  const isValidLnmiitEmail = (email: string) => {
    const trimmed = email.trim().toLowerCase();
    return /^[a-zA-Z0-9._%+-]+@lnmiit\.ac\.in$/.test(trimmed);
  };

  const isValidUrl = (url: string) => {
    const trimmed = url.trim().toLowerCase();
    return trimmed.startsWith("https://") || trimmed.startsWith("http://");
  };

  const handleSaveMember = (e: React.FormEvent) => {
    e.preventDefault();

    const errors: { name?: string; email?: string; linkedin?: string } = {};

    // 1. Name validation
    if (!memberForm.name || !memberForm.name.trim()) {
      errors.name = "Invalid";
      setFieldErrors(errors);
      showBottomNotice("Name section is required.");
      return;
    }

    // 2. Email validation
    if (!memberForm.email || !memberForm.email.trim()) {
      errors.email = "Invalid";
      setFieldErrors(errors);
      showBottomNotice("Email section is required.");
      return;
    } else if (!isValidLnmiitEmail(memberForm.email)) {
      errors.email = "Invalid";
      setFieldErrors(errors);
      showBottomNotice("Valid @lnmiit.ac.in email is required.");
      return;
    }

    // 3. LinkedIn validation
    if (!memberForm.linkedin || !memberForm.linkedin.trim()) {
      errors.linkedin = "Invalid";
      setFieldErrors(errors);
      showBottomNotice("LinkedIn Handle section is required.");
      return;
    } else if (!isValidUrl(memberForm.linkedin)) {
      errors.linkedin = "Invalid";
      setFieldErrors(errors);
      showBottomNotice("Valid LinkedIn URL is required.");
      return;
    }

    setFieldErrors({});
    const list = [...teamList];

    const derivedRole =
      memberForm.tier === "coordinators"
        ? "Coordinator"
        : memberForm.tier === "heads"
        ? "Head"
        : memberForm.role || "Associate";

    const cleanDept = memberForm.dept ? memberForm.dept.trim() : "";
    const normalizedMember: TeamMemberItem = {
      ...memberForm,
      name: memberForm.name.trim(),
      email: memberForm.email.trim().toLowerCase(),
      linkedin: memberForm.linkedin.trim(),
      role: derivedRole,
      dept: cleanDept,
      focus: cleanDept,
    };

    if (editingMemberId) {
      const idx = list.findIndex((m) => m.id === editingMemberId);
      if (idx >= 0) list[idx] = normalizedMember;
    } else {
      list.push(normalizedMember);
    }

    setTeamList(list);
    setIsMemberModalOpen(false);
    handleSaveAll(list);
  };

  const handleDeleteMember = (id: string, name: string) => {
    if (!window.confirm(`Remove member "${name}" from team roster?`)) return;
    const list = teamList.filter((m) => m.id !== id);
    setTeamList(list);
    handleSaveAll(list);
  };

  const filteredMembers = teamList.filter((m) => {
    if (filterTier === "ALL") return true;
    return m.tier === filterTier;
  });

  // Conditional Formatting for Hierarchy Badges
  const getHierarchyBadge = (tier: string) => {
    switch (tier) {
      case "coordinators":
        return {
          label: "COORDINATORS",
          bg: "rgba(10, 19, 41, 0.08)",
          color: "var(--navy-hero)",
          border: "1px solid rgba(197, 168, 128, 0.5)",
        };
      case "heads":
        return {
          label: "HEADS",
          bg: "rgba(139, 29, 65, 0.08)",
          color: "var(--burgundy-crest)",
          border: "1px solid rgba(139, 29, 65, 0.3)",
        };
      case "coreTeam":
      default:
        return {
          label: "CORE TEAM",
          bg: "rgba(21, 128, 61, 0.08)",
          color: "#15803d",
          border: "1px solid rgba(21, 128, 61, 0.3)",
        };
    }
  };

  return (
    <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
      {/* Bottom Center Required Notification */}
      {bottomNotice && (
        <div
          style={{
            position: "fixed",
            bottom: "32px",
            left: "50%",
            transform: "translateX(-50%)",
            backgroundColor: "#070D1E",
            color: "#FFFFFF",
            padding: "12px 26px",
            borderRadius: "100px",
            border: "1.5px solid #ef4444",
            boxShadow: "0 12px 36px rgba(0,0,0,0.45)",
            zIndex: 100000,
            display: "flex",
            alignItems: "center",
            gap: "10px",
            fontFamily: "var(--font-sans)",
            fontSize: "13px",
            fontWeight: 600,
            animation: "fadeIn 0.2s ease",
          }}
        >
          <span style={{ color: "#ef4444", fontSize: "16px" }}>⚠️</span>
          <span>{bottomNotice}</span>
        </div>
      )}

      {/* Header & Controls (INSTITUTIONAL PERSONNEL line removed) */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
        <div>
          <h3 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", margin: 0 }}>
            Leadership & Core Team ({teamList.length})
          </h3>
        </div>

        <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
          {/* Hierarchy Filter */}
          <div style={{ display: "flex", gap: "4px", backgroundColor: "var(--white-alabaster)", padding: "4px", borderRadius: "6px", border: "1px solid var(--white-border)" }}>
            {["ALL", "coordinators", "heads", "coreTeam"].map((tier) => (
              <button
                key={tier}
                type="button"
                onClick={() => setFilterTier(tier)}
                style={{
                  padding: "6px 12px",
                  fontSize: "11px",
                  fontFamily: "var(--font-mono)",
                  textTransform: "uppercase",
                  borderRadius: "4px",
                  border: "none",
                  backgroundColor: filterTier === tier ? "var(--navy-hero)" : "transparent",
                  color: filterTier === tier ? "#FFFFFF" : "var(--ink-title)",
                  cursor: "pointer",
                  fontWeight: 600,
                }}
              >
                {tier === "ALL" ? "ALL" : tier === "coordinators" ? "Coordinators" : tier === "heads" ? "Heads" : "Core Team"}
              </button>
            ))}
          </div>

          <button
            type="button"
            onClick={() => handleOpenMemberModal()}
            className="stamp-button stamp-button-primary"
            style={{ padding: "8px 18px", fontSize: "12px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
          >
            + ADD TEAM MEMBER
          </button>
        </div>
      </div>

      {/* Team Cards Grid — Entire card clickable, single delete icon, no click to edit line */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
        {filteredMembers.map((member) => {
          const badge = getHierarchyBadge(member.tier);
          return (
            <div
              key={member.id}
              onClick={() => handleOpenMemberModal(member)}
              title="Click anywhere to edit member details"
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
                minHeight: "135px",
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
                  handleDeleteMember(member.id, member.name);
                }}
                title={`Delete ${member.name}`}
                aria-label={`Delete ${member.name}`}
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

              {/* Card Profile Info: Avatar, Hierarchy Badge, Name, and Optional Department */}
              <div>
                <div style={{ display: "flex", gap: "14px", alignItems: "center" }}>
                  <div style={{ width: "56px", height: "56px", position: "relative", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--gold-oxford)", backgroundColor: "#0A1329", flexShrink: 0 }}>
                    <Image
                      src={member.image || "/assets/team/aryan-mittal.jpg"}
                      alt={member.name}
                      fill
                      sizes="56px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ paddingRight: "36px" }}>
                    <span
                      style={{
                        fontSize: "9px",
                        padding: "2px 7px",
                        borderRadius: "4px",
                        fontWeight: 700,
                        backgroundColor: badge.bg,
                        color: badge.color,
                        border: badge.border,
                        fontFamily: "var(--font-mono)",
                        letterSpacing: "0.06em",
                        display: "inline-block",
                        marginBottom: "4px",
                      }}
                    >
                      {badge.label}
                    </span>
                    <h4 className="font-display-serif" style={{ fontSize: "18px", color: "var(--ink-title)", margin: "2px 0 0", lineHeight: 1.2 }}>
                      {member.name}
                    </h4>
                  </div>
                </div>

                {/* Optional Department Pill — conditionally displayed only if entered */}
                {member.dept && member.dept.trim() ? (
                  <div style={{ marginTop: "10px" }}>
                    <span
                      style={{
                        fontSize: "11.5px",
                        color: "var(--ink-body)",
                        backgroundColor: "rgba(10, 19, 41, 0.05)",
                        padding: "3px 10px",
                        borderRadius: "100px",
                        display: "inline-block",
                        border: "1px solid rgba(10, 19, 41, 0.08)",
                        maxWidth: "100%",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {member.dept}
                    </span>
                  </div>
                ) : null}
              </div>
            </div>
          );
        })}
      </div>

      {/* ===================== MODAL: MEMBER EDIT ===================== */}
      {isMemberModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsMemberModalOpen(false)} aria-hidden="true" />
          <div className="lightbox-dialog" style={{ maxWidth: "540px", padding: "30px", position: "relative", zIndex: 10, backgroundColor: "var(--white-pure)", borderRadius: "10px", boxShadow: "0 24px 60px rgba(0,0,0,0.3)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
              <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: 0 }}>
                {editingMemberId ? "Edit Team Member" : "Add Team Member"}
              </h3>
              <button
                type="button"
                onClick={() => setIsMemberModalOpen(false)}
                className="modal-close-btn"
                style={{ fontSize: "18px", border: "none", background: "transparent", cursor: "pointer", color: "var(--ink-muted)" }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveMember} noValidate style={{ display: "flex", flexDirection: "column", gap: "18px" }}>
              {/* Row 1: Name and Hierarchy (no asterisks) */}
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "14px" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "5px", display: "block", fontWeight: 700 }}>
                    NAME
                  </label>
                  <input
                    type="text"
                    value={memberForm.name}
                    onChange={(e) => {
                      setMemberForm({ ...memberForm, name: e.target.value });
                      if (fieldErrors.name) {
                        setFieldErrors({ ...fieldErrors, name: undefined });
                      }
                    }}
                    placeholder="e.g. Aditya Tiwari"
                    className="form-input"
                    style={{
                      width: "100%",
                      padding: "10px 12px",
                      fontSize: "13px",
                      borderColor: fieldErrors.name ? "#dc2626" : undefined,
                    }}
                  />
                  {fieldErrors.name && (
                    <span style={{ color: "#dc2626", fontSize: "11px", fontWeight: 600, marginTop: "4px", display: "block" }}>
                      Invalid
                    </span>
                  )}
                </div>

                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "5px", display: "block", fontWeight: 700 }}>
                    HIERARCHY
                  </label>
                  <select
                    value={memberForm.tier}
                    onChange={(e) => {
                      const newTier = e.target.value as any;
                      setMemberForm({
                        ...memberForm,
                        tier: newTier,
                        role: newTier === "coordinators" ? "Coordinator" : newTier === "heads" ? "Head" : "Associate",
                      });
                    }}
                    className="form-input"
                    style={{ width: "100%", padding: "10px 12px", fontSize: "13px" }}
                  >
                    <option value="coordinators">Coordinator (Council)</option>
                    <option value="heads">Department Head</option>
                    <option value="coreTeam">Core Team Associate</option>
                  </select>
                </div>
              </div>

              {/* Row 2: Department (no optional written after department) */}
              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "5px", display: "block", fontWeight: 700 }}>
                  DEPARTMENT
                </label>
                <input
                  type="text"
                  value={memberForm.dept || ""}
                  onChange={(e) => setMemberForm({ ...memberForm, dept: e.target.value })}
                  placeholder={
                    memberForm.tier === "coordinators"
                      ? "e.g. Institutional Strategy & Leadership"
                      : memberForm.tier === "heads"
                      ? "e.g. Consulting & Strategy"
                      : "e.g. Equity Research & Modeling"
                  }
                  className="form-input"
                  style={{ width: "100%", padding: "10px 12px", fontSize: "13px" }}
                />
              </div>

              {/* Row 3: Portrait Photo with Drag and Drop from Device + Browse */}
              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "5px", display: "block", fontWeight: 700 }}>
                  PORTRAIT PHOTO (FROM DEVICE)
                </label>
                
                <div
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => memberFileInputRef.current?.click()}
                  style={{
                    border: isDragOver ? "2px dashed var(--gold-oxford)" : "1.5px dashed rgba(10, 19, 41, 0.25)",
                    backgroundColor: isDragOver ? "rgba(197, 168, 128, 0.12)" : "#F8FAFC",
                    borderRadius: "10px",
                    padding: "16px 20px",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    display: "flex",
                    alignItems: "center",
                    gap: "18px",
                  }}
                >
                  <div style={{ width: "62px", height: "62px", position: "relative", borderRadius: "50%", overflow: "hidden", border: "2px solid var(--gold-oxford)", backgroundColor: "#0A1329", flexShrink: 0, boxShadow: "0 2px 8px rgba(0,0,0,0.15)" }}>
                    <Image
                      src={memberForm.image || "/assets/team/aryan-mittal.jpg"}
                      alt="Portrait Preview"
                      fill
                      sizes="62px"
                      style={{ objectFit: "cover" }}
                    />
                  </div>

                  <div style={{ flex: 1, textAlign: "left" }}>
                    <p style={{ margin: 0, fontSize: "13.5px", fontWeight: 600, color: "var(--ink-title)" }}>
                      {isUploading ? "Uploading portrait to server..." : "Drag & drop portrait from device"}
                    </p>
                    <p style={{ margin: "3px 0 0", fontSize: "11.5px", color: "var(--ink-muted)" }}>
                      or <span style={{ color: "var(--navy-hero)", textDecoration: "underline", fontWeight: 600 }}>Browse Device</span> (PNG, JPG, JPEG, WEBP)
                    </p>
                    {memberForm.image && (
                      <p className="font-metadata-mono" style={{ margin: "5px 0 0", fontSize: "10.5px", color: "var(--emerald)", wordBreak: "break-all" }}>
                        ✓ Active Photo: {memberForm.image}
                      </p>
                    )}
                  </div>

                  <input
                    type="file"
                    ref={memberFileInputRef}
                    onChange={handleModalPhotoFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />
                </div>
              </div>

              {/* Row 4: Email (must be @lnmiit.ac.in, no asterisk) */}
              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "5px", display: "block", fontWeight: 700 }}>
                  EMAIL
                </label>
                <input
                  type="email"
                  value={memberForm.email}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMemberForm({ ...memberForm, email: val });
                    if (val.trim() && !isValidLnmiitEmail(val)) {
                      setFieldErrors((prev) => ({ ...prev, email: "Invalid" }));
                    } else {
                      setFieldErrors((prev) => ({ ...prev, email: undefined }));
                    }
                  }}
                  placeholder="e.g. rollnumber@lnmiit.ac.in"
                  className="form-input"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "13px",
                    borderColor: fieldErrors.email ? "#dc2626" : undefined,
                  }}
                />
                {fieldErrors.email && (
                  <span style={{ color: "#dc2626", fontSize: "11px", fontWeight: 600, marginTop: "4px", display: "block" }}>
                    Invalid
                  </span>
                )}
              </div>

              {/* Row 5: LinkedIn Handle (no asterisk) */}
              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "5px", display: "block", fontWeight: 700 }}>
                  LINKEDIN HANDLE
                </label>
                <input
                  type="url"
                  value={memberForm.linkedin}
                  onChange={(e) => {
                    const val = e.target.value;
                    setMemberForm({ ...memberForm, linkedin: val });
                    if (val.trim() && !isValidUrl(val)) {
                      setFieldErrors((prev) => ({ ...prev, linkedin: "Invalid" }));
                    } else {
                      setFieldErrors((prev) => ({ ...prev, linkedin: undefined }));
                    }
                  }}
                  placeholder="https://www.linkedin.com/in/username"
                  className="form-input"
                  style={{
                    width: "100%",
                    padding: "10px 12px",
                    fontSize: "13px",
                    borderColor: fieldErrors.linkedin ? "#dc2626" : undefined,
                  }}
                />
                {fieldErrors.linkedin && (
                  <span style={{ color: "#dc2626", fontSize: "11px", fontWeight: 600, marginTop: "4px", display: "block" }}>
                    Invalid
                  </span>
                )}
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "14px", paddingTop: "14px", borderTop: "1px solid var(--white-border)" }}>
                <button
                  type="button"
                  onClick={() => setIsMemberModalOpen(false)}
                  className="stamp-button"
                  style={{ padding: "9px 18px", fontSize: "12px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSaving || isUploading}
                  className="stamp-button stamp-button-primary"
                  style={{ padding: "9px 22px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)", fontWeight: 700 }}
                >
                  {isSaving ? "Saving..." : "Save Member"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
