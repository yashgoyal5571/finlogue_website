"use client";

import React, { useState } from "react";
import { ContactContent, FAQItem } from "@/content/contact";

interface AdminContactTabProps {
  data: ContactContent;
  onSave: (updated: ContactContent) => Promise<void>;
  showToast: (msg: string) => void;
}

export default function AdminContactTab({ data, onSave, showToast }: AdminContactTabProps) {
  const [contactData, setContactData] = useState<ContactContent>(data);
  const [isSaving, setIsSaving] = useState(false);

  // FAQ Modal state
  const [isFaqModalOpen, setIsFaqModalOpen] = useState(false);
  const [editingFaqIndex, setEditingFaqIndex] = useState<number | null>(null);
  const [faqForm, setFaqForm] = useState<FAQItem>({
    question: "",
    answer: "",
    category: "General",
  });

  const handleSaveAll = async (override?: ContactContent) => {
    setIsSaving(true);
    const toSave = override || contactData;
    try {
      await onSave(toSave);
      showToast("Contact details & FAQs updated & published live!");
    } catch {
      alert("Failed to save contact content.");
    } finally {
      setIsSaving(false);
    }
  };

  // --- FAQs CRUD ---
  const handleOpenFaqModal = (faq?: FAQItem, index?: number) => {
    if (faq && index !== undefined) {
      setEditingFaqIndex(index);
      setFaqForm({ ...faq });
    } else {
      setEditingFaqIndex(null);
      setFaqForm({
        question: "",
        answer: "",
        category: "General",
      });
    }
    setIsFaqModalOpen(true);
  };

  const handleSaveFaq = (e: React.FormEvent) => {
    e.preventDefault();
    const faqs = [...(contactData.faqs || [])];
    if (editingFaqIndex !== null) {
      faqs[editingFaqIndex] = faqForm;
    } else {
      faqs.push(faqForm);
    }

    const updated = { ...contactData, faqs };
    setContactData(updated);
    setIsFaqModalOpen(false);
    handleSaveAll(updated);
  };

  const handleDeleteFaq = (index: number) => {
    const faqs = (contactData.faqs || []).filter((_, i) => i !== index);
    const updated = { ...contactData, faqs };
    setContactData(updated);
    handleSaveAll(updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* 1. Office Location & Official Details */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
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

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              INSTITUTE / CAMPUS
            </label>
            <input
              type="text"
              value={contactData.office.campus}
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
              value={contactData.office.building}
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
              value={contactData.office.email}
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
        </div>

        <div style={{ marginTop: "16px" }}>
          <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
            POSTAL ADDRESS
          </label>
          <input
            type="text"
            value={contactData.office.address}
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

      {/* 2. FAQs Section */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
              KNOWLEDGE BASE
            </span>
            <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
              Frequently Asked Questions ({(contactData.faqs || []).length})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => handleOpenFaqModal()}
            className="stamp-button stamp-button-primary"
            style={{ padding: "8px 18px", fontSize: "12px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
          >
            + ADD NEW FAQ
          </button>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
          {(contactData.faqs || []).map((faq, idx) => (
            <div
              key={idx}
              style={{
                padding: "18px 22px",
                backgroundColor: "var(--white-alabaster)",
                border: "1px solid var(--white-border)",
                borderRadius: "6px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "flex-start",
                gap: "16px",
              }}
            >
              <div style={{ flex: 1 }}>
                <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 600, display: "block", marginBottom: "4px" }}>
                  {faq.category}
                </span>
                <h4 className="font-display-serif" style={{ fontSize: "17px", color: "var(--ink-title)", margin: "0 0 6px" }}>
                  {faq.question}
                </h4>
                <p style={{ fontSize: "13px", color: "var(--ink-body)", margin: 0, lineHeight: 1.5 }}>
                  {faq.answer}
                </p>
              </div>

              <div style={{ display: "flex", gap: "8px" }}>
                <button
                  type="button"
                  onClick={() => handleOpenFaqModal(faq, idx)}
                  className="stamp-button"
                  style={{ padding: "6px 12px", fontSize: "11.5px" }}
                >
                  ✎ Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDeleteFaq(idx)}
                  className="stamp-button"
                  style={{ padding: "6px 10px", fontSize: "11.5px", color: "#dc2626", borderColor: "rgba(220,38,38,0.3)" }}
                >
                  ✕
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== MODAL: FAQ ===================== */}
      {isFaqModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsFaqModalOpen(false)} aria-hidden="true" />
          <div className="lightbox-dialog" style={{ maxWidth: "520px", padding: "28px", position: "relative", zIndex: 10, backgroundColor: "var(--white-pure)", borderRadius: "8px" }}>
            <h3 className="font-display-serif" style={{ fontSize: "20px", color: "var(--ink-title)", margin: "0 0 16px" }}>
              {editingFaqIndex !== null ? "Edit FAQ" : "Add New FAQ"}
            </h3>

            <form onSubmit={handleSaveFaq} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>CATEGORY</label>
                <select
                  value={faqForm.category}
                  onChange={(e) => setFaqForm({ ...faqForm, category: e.target.value as any })}
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                >
                  <option value="General">General</option>
                  <option value="Events & Competitions">Events & Competitions</option>
                  <option value="Startups & Funding">Startups & Funding</option>
                  <option value="Membership">Membership</option>
                </select>
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>QUESTION</label>
                <input
                  type="text"
                  required
                  value={faqForm.question}
                  onChange={(e) => setFaqForm({ ...faqForm, question: e.target.value })}
                  placeholder="e.g. Can students from other universities participate?"
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px" }}
                />
              </div>

              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "4px", display: "block" }}>ANSWER</label>
                <textarea
                  rows={4}
                  required
                  value={faqForm.answer}
                  onChange={(e) => setFaqForm({ ...faqForm, answer: e.target.value })}
                  placeholder="Detailed response..."
                  className="form-input"
                  style={{ width: "100%", padding: "8px 12px", fontSize: "13px", lineHeight: 1.4 }}
                />
              </div>

              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "12px" }}>
                <button
                  type="button"
                  onClick={() => setIsFaqModalOpen(false)}
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
                  Save FAQ
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
