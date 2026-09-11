"use client";

import React, { useState, useEffect } from "react";
import { GoogleSheetsConfig } from "@/lib/cms-types";
import { AttendeeItem } from "@/app/api/admin/attendees/route";

interface AdminSheetsTabProps {
  config: GoogleSheetsConfig;
  onSaveConfig: (updated: GoogleSheetsConfig) => Promise<void>;
  showToast: (msg: string) => void;
}

export default function AdminSheetsTab({ config, onSaveConfig, showToast }: AdminSheetsTabProps) {
  const [sheetConfig, setSheetConfig] = useState<GoogleSheetsConfig>(config);
  const [isSavingConfig, setIsSavingConfig] = useState(false);
  const [isPinging, setIsPinging] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<"CONNECTED" | "OFFLINE" | "NOT_CONFIGURED">(
    config.webhookUrl ? "CONNECTED" : "NOT_CONFIGURED"
  );

  // Attendees list
  const [attendees, setAttendees] = useState<AttendeeItem[]>([]);
  const [isLoadingAttendees, setIsLoadingAttendees] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [eventFilter, setEventFilter] = useState("ALL");

  // Add/edit attendee modal
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [attendeeForm, setAttendeeForm] = useState<AttendeeItem>({
    id: "",
    token: "",
    name: "",
    email: "",
    phone: "",
    institution: "The LNM Institute of Information Technology",
    event: "PITCH ON THE ROCKS (POTR)",
    status: "CONFIRMED",
    registeredAt: new Date().toISOString(),
    notes: "",
  });

  const fetchAttendees = async () => {
    setIsLoadingAttendees(true);
    try {
      const res = await fetch("/api/admin/attendees");
      if (res.ok) {
        const data = await res.json();
        if (data.success && Array.isArray(data.attendees)) {
          setAttendees(data.attendees);
        }
      }
    } catch {
      console.warn("Failed to load attendees");
    } finally {
      setIsLoadingAttendees(false);
    }
  };

  useEffect(() => {
    fetchAttendees();
  }, []);

  const handleSaveConfigSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingConfig(true);
    try {
      await onSaveConfig(sheetConfig);
      setConnectionStatus(sheetConfig.webhookUrl ? "CONNECTED" : "NOT_CONFIGURED");
      showToast("Google Sheets configuration saved!");
    } catch {
      alert("Failed to save Google Sheets settings.");
    } finally {
      setIsSavingConfig(false);
    }
  };

  const handleTestConnection = async () => {
    if (!sheetConfig.webhookUrl) {
      alert("Please configure a valid Webhook URL first.");
      return;
    }
    setIsPinging(true);
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      const res = await fetch(`${sheetConfig.webhookUrl}?action=ping`, {
        signal: controller.signal,
      });
      clearTimeout(timeoutId);

      if (res.ok) {
        setConnectionStatus("CONNECTED");
        showToast("Connected successfully to Google Sheets!");
      } else {
        setConnectionStatus("OFFLINE");
        alert("Google Sheets webhook returned an error response.");
      }
    } catch (err: any) {
      setConnectionStatus("OFFLINE");
      alert(`Connection failed: ${err.message || "Timeout"}`);
    } finally {
      setIsPinging(false);
    }
  };

  // CSV Export
  const handleExportCSV = () => {
    if (attendees.length === 0) {
      alert("No attendee registrations to export.");
      return;
    }

    const headers = ["Token", "Name", "Email", "Phone", "Institution", "Event", "Status", "Timestamp", "Notes"];
    const rows = attendees.map((a) => [
      `"${a.token}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.phone || ""}"`,
      `"${(a.institution || "").replace(/"/g, '""')}"`,
      `"${a.event}"`,
      `"${a.status}"`,
      `"${a.registeredAt || ""}"`,
      `"${(a.notes || "").replace(/"/g, '""')}"`,
    ]);

    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `finlogue-registrations-${Date.now()}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    showToast("Downloaded registrations CSV!");
  };

  // Toggle status
  const handleToggleStatus = async (id: string, newStatus: AttendeeItem["status"]) => {
    setAttendees((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

    try {
      await fetch("/api/admin/attendees", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      showToast(`Attendee status updated to ${newStatus}`);
    } catch {
      fetchAttendees();
    }
  };

  // Open modal
  const handleOpenAttendeeModal = (item?: AttendeeItem) => {
    if (item) {
      setEditingId(item.id);
      setAttendeeForm({ ...item });
    } else {
      setEditingId(null);
      setAttendeeForm({
        id: `att-${Date.now()}`,
        token: `REG-${Math.floor(100000 + Math.random() * 900000)}`,
        name: "",
        email: "",
        phone: "",
        institution: "The LNM Institute of Information Technology",
        event: "PITCH ON THE ROCKS (POTR)",
        status: "CONFIRMED",
        registeredAt: new Date().toISOString(),
        notes: "",
      });
    }
    setIsModalOpen(true);
  };

  const handleSaveAttendee = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/admin/attendees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendee: attendeeForm }),
      });
      if (res.ok) {
        showToast("Attendee record saved!");
        setIsModalOpen(false);
        fetchAttendees();
      } else {
        alert("Failed to save attendee.");
      }
    } catch {
      alert("Error saving attendee.");
    }
  };

  const filteredAttendees = attendees.filter((a) => {
    const matchesSearch =
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.token.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.event.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "ALL" || a.status === statusFilter;
    const matchesEvent = eventFilter === "ALL" || a.event === eventFilter;

    return matchesSearch && matchesStatus && matchesEvent;
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* 1. Google Sheets Webhook Configuration Card */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "4px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
                CLOUD SYNCHRONIZATION
              </span>
              <span
                style={{
                  fontSize: "10px",
                  padding: "2px 8px",
                  borderRadius: "4px",
                  fontWeight: 700,
                  backgroundColor: connectionStatus === "CONNECTED" ? "rgba(21, 128, 61, 0.15)" : "rgba(220, 38, 38, 0.15)",
                  color: connectionStatus === "CONNECTED" ? "#15803d" : "#dc2626",
                  fontFamily: "var(--font-mono)",
                }}
              >
                ● {connectionStatus}
              </span>
            </div>
            <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: 0 }}>
              Google Sheets Webhook & Live Link
            </h3>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <a
              href={sheetConfig.sheetUrl || "https://docs.google.com/spreadsheets"}
              target="_blank"
              rel="noopener noreferrer"
              className="stamp-button"
              style={{ padding: "8px 16px", fontSize: "12px", textDecoration: "none" }}
            >
              Open Connected Google Sheet ↗
            </a>
            <button
              type="button"
              onClick={handleTestConnection}
              disabled={isPinging}
              className="stamp-button"
              style={{ padding: "8px 16px", fontSize: "12px" }}
            >
              {isPinging ? "Testing..." : "⚡ Test Connection"}
            </button>
          </div>
        </div>

        <form onSubmit={handleSaveConfigSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "20px" }}>
            <div>
              <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
                GOOGLE APPS SCRIPT WEBHOOK URL
              </label>
              <input
                type="url"
                value={sheetConfig.webhookUrl}
                onChange={(e) => setSheetConfig({ ...sheetConfig, webhookUrl: e.target.value })}
                placeholder="https://script.google.com/macros/s/.../exec"
                className="form-input"
                style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
                PUBLIC GOOGLE SPREADSHEET URL
              </label>
              <input
                type="url"
                value={sheetConfig.sheetUrl}
                onChange={(e) => setSheetConfig({ ...sheetConfig, sheetUrl: e.target.value })}
                placeholder="https://docs.google.com/spreadsheets/d/..."
                className="form-input"
                style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
              />
            </div>
          </div>

          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <button
              type="submit"
              disabled={isSavingConfig}
              className="stamp-button stamp-button-primary"
              style={{ padding: "8px 20px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
            >
              {isSavingConfig ? "Saving..." : "Save Google Sheets Config"}
            </button>
          </div>
        </form>
      </div>

      {/* 2. Attendee Registrations Management */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
              INTAKE REGISTRY
            </span>
            <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
              Event Attendees & Applications ({attendees.length})
            </h3>
          </div>

          <div style={{ display: "flex", gap: "10px" }}>
            <button
              type="button"
              onClick={handleExportCSV}
              className="stamp-button"
              style={{ padding: "8px 16px", fontSize: "12px", backgroundColor: "rgba(21, 128, 61, 0.08)", color: "#15803d", borderColor: "rgba(21, 128, 61, 0.3)", fontWeight: 600 }}
            >
              📥 Export to CSV
            </button>
            <button
              type="button"
              onClick={() => handleOpenAttendeeModal()}
              className="stamp-button stamp-button-primary"
              style={{ padding: "8px 18px", fontSize: "12px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
            >
              + ADD REGISTRATION
            </button>
          </div>
        </div>

        {/* Filters & Search */}
        <div style={{ display: "flex", gap: "12px", marginBottom: "20px", flexWrap: "wrap" }}>
          <input
            type="text"
            placeholder="Search by name, email, token..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="form-input"
            style={{ flex: 1, minWidth: "220px", padding: "8px 12px", fontSize: "12.5px" }}
          />

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="form-input"
            style={{ padding: "8px 12px", fontSize: "12.5px" }}
          >
            <option value="ALL">All Statuses</option>
            <option value="CONFIRMED">CONFIRMED</option>
            <option value="WAITLIST">WAITLIST</option>
            <option value="FLAGGED">FLAGGED</option>
          </select>

          <button
            type="button"
            onClick={fetchAttendees}
            className="stamp-button"
            style={{ padding: "8px 14px", fontSize: "12px" }}
          >
            ↻ Refresh
          </button>
        </div>

        {/* Table */}
        <div style={{ overflowX: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "12.5px" }}>
            <thead>
              <tr style={{ backgroundColor: "var(--white-alabaster)", borderBottom: "2px solid var(--white-border)", textAlign: "left" }}>
                <th style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>TOKEN</th>
                <th style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>APPLICANT</th>
                <th style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>EVENT</th>
                <th style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>INSTITUTE</th>
                <th style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "11px" }}>STATUS</th>
                <th style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontSize: "11px", textAlign: "right" }}>ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {filteredAttendees.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ padding: "32px", textAlign: "center", color: "var(--ink-muted)" }}>
                    {isLoadingAttendees ? "Loading intake records..." : "No registrations found matching filter."}
                  </td>
                </tr>
              ) : (
                filteredAttendees.map((att) => (
                  <tr key={att.id} style={{ borderBottom: "1px solid var(--white-border)" }}>
                    <td style={{ padding: "12px 14px", fontFamily: "var(--font-mono)", fontWeight: 700, color: "var(--gold-oxford)" }}>
                      {att.token}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <div style={{ fontWeight: 600, color: "var(--ink-title)" }}>{att.name}</div>
                      <div style={{ fontSize: "11.5px", color: "var(--ink-muted)" }}>{att.email}</div>
                    </td>
                    <td style={{ padding: "12px 14px", maxWidth: "200px" }}>
                      <span style={{ fontSize: "12px", color: "var(--ink-title)" }}>{att.event}</span>
                    </td>
                    <td style={{ padding: "12px 14px", fontSize: "12px", color: "var(--ink-body)" }}>
                      {att.institution}
                    </td>
                    <td style={{ padding: "12px 14px" }}>
                      <select
                        value={att.status}
                        onChange={(e) => handleToggleStatus(att.id, e.target.value as AttendeeItem["status"])}
                        className="form-input"
                        style={{
                          padding: "4px 8px",
                          fontSize: "11.5px",
                          fontWeight: 700,
                          backgroundColor: att.status === "CONFIRMED" ? "rgba(21, 128, 61, 0.1)" : att.status === "WAITLISTED" ? "rgba(202, 138, 4, 0.1)" : "rgba(220, 38, 38, 0.1)",
                          color: att.status === "CONFIRMED" ? "#15803d" : att.status === "WAITLISTED" ? "#a16207" : "#dc2626",
                        }}
                      >
                        <option value="CONFIRMED">CONFIRMED</option>
                        <option value="WAITLISTED">WAITLISTED</option>
                        <option value="CHECKED-IN">CHECKED-IN</option>
                        <option value="REJECTED">REJECTED</option>
                      </select>
                    </td>
                    <td style={{ padding: "12px 14px", textAlign: "right" }}>
                      <button
                        type="button"
                        onClick={() => handleOpenAttendeeModal(att)}
                        className="stamp-button"
                        style={{ padding: "4px 10px", fontSize: "11px" }}
                      >
                        ✎ Edit
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ===================== MODAL: ATTENDEE ===================== */}
      {isModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsModalOpen(false)} aria-hidden="true" />
          <div className="lightbox-dialog" style={{ maxWidth: "520px", padding: "28px", position: "relative", zIndex: 10, backgroundColor: "var(--white-pure)", borderRadius: "8px" }}>
            <h3 className="font-display-serif" style={{ fontSize: "20px", color: "var(--ink-title)", margin: "0 0 16px" }}>
              {editingId ? "Edit Registration Record" : "Add Attendee Record"}
            </h3>

            <form onSubmit={handleSaveAttendee} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>FULL NAME</label>
                  <input
                    type="text"
                    required
                    value={attendeeForm.name}
                    onChange={(e) => setAttendeeForm({ ...attendeeForm, name: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>EMAIL</label>
                  <input
                    type="email"
                    required
                    value={attendeeForm.email}
                    onChange={(e) => setAttendeeForm({ ...attendeeForm, email: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>PHONE</label>
                  <input
                    type="text"
                    value={attendeeForm.phone || ""}
                    onChange={(e) => setAttendeeForm({ ...attendeeForm, phone: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>INSTITUTION</label>
                  <input
                    type="text"
                    value={attendeeForm.institution}
                    onChange={(e) => setAttendeeForm({ ...attendeeForm, institution: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  />
                </div>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>EVENT APPLIED</label>
                <input
                  type="text"
                  required
                  value={attendeeForm.event}
                  onChange={(e) => setAttendeeForm({ ...attendeeForm, event: e.target.value })}
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>TOKEN</label>
                  <input
                    type="text"
                    value={attendeeForm.token}
                    onChange={(e) => setAttendeeForm({ ...attendeeForm, token: e.target.value })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px", fontFamily: "var(--font-mono)" }}
                  />
                </div>
                <div>
                  <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>STATUS</label>
                  <select
                    value={attendeeForm.status}
                    onChange={(e) => setAttendeeForm({ ...attendeeForm, status: e.target.value as any })}
                    className="form-input"
                    style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                  >
                    <option value="CONFIRMED">CONFIRMED</option>
                    <option value="WAITLIST">WAITLIST</option>
                    <option value="FLAGGED">FLAGGED</option>
                  </select>
                </div>
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
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
                  Save Record
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
