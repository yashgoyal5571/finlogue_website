"use client";

import React, { useState, useRef } from "react";
import Image from "next/image";
import { GalleryItem } from "@/content/gallery";
import { CelebratingSuccessContent } from "@/lib/cms-types";

interface GalleryDataPayload {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  celebratingSuccess: CelebratingSuccessContent;
  items: GalleryItem[];
}

interface AdminGalleryTabProps {
  data: GalleryDataPayload;
  onSave: (updated: GalleryDataPayload) => Promise<void>;
  showToast: (msg: string) => void;
}

export default function AdminGalleryTab({ data, onSave, showToast }: AdminGalleryTabProps) {
  const [galleryData, setGalleryData] = useState<GalleryDataPayload>(data);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  // Photo modal state
  const [isPhotoModalOpen, setIsPhotoModalOpen] = useState(false);
  const [editingPhotoId, setEditingPhotoId] = useState<string | null>(null);
  const [editingSlotNum, setEditingSlotNum] = useState<number>(1);
  const [photoForm, setPhotoForm] = useState<GalleryItem>({
    id: "",
    image: "/assets/gallery/celebrating-success.jpg",
  });

  const bannerFileInputRef = useRef<HTMLInputElement>(null);
  const photoFileInputRef = useRef<HTMLInputElement>(null);

  const handleSaveAll = async (override?: GalleryDataPayload) => {
    setIsSaving(true);
    const toSave = override || galleryData;
    try {
      await onSave(toSave);
      showToast("Gallery updated and published live!");
    } catch {
      alert("Failed to save gallery content.");
    } finally {
      setIsSaving(false);
    }
  };

  // Upload file helper
  const handleFileUpload = async (file: File, folder: string = "gallery"): Promise<string | null> => {
    setIsUploading(true);
    try {
      const formData = new FormData();
      formData.append("file", file);
      formData.append("folder", folder);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const json = await res.json();
      if (res.ok && json.success) {
        showToast("Photo uploaded successfully!");
        return json.url;
      } else {
        alert(json.error || "Photo upload failed.");
        return null;
      }
    } catch (err: any) {
      alert(`Upload error: ${err?.message || "Could not upload image"}`);
      return null;
    } finally {
      setIsUploading(false);
    }
  };

  // Banner image upload
  const handleBannerFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await handleFileUpload(file, "gallery");
    if (uploadedUrl) {
      const updated = {
        ...galleryData,
        celebratingSuccess: {
          ...galleryData.celebratingSuccess,
          image: uploadedUrl,
        },
      };
      setGalleryData(updated);
      handleSaveAll(updated);
    }
  };

  // Photo modal image upload from device
  const handleModalPhotoFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const uploadedUrl = await handleFileUpload(file, "gallery");
    if (uploadedUrl) {
      setPhotoForm((prev) => ({ ...prev, image: uploadedUrl }));
    }
  };

  // Open photo modal to change or add photo
  const handleOpenPhotoModal = (item?: GalleryItem, slotIndex?: number) => {
    if (item) {
      setEditingPhotoId(item.id);
      setEditingSlotNum(slotIndex !== undefined ? slotIndex + 1 : 1);
      setPhotoForm({ ...item });
    } else {
      setEditingPhotoId(null);
      setEditingSlotNum(galleryData.items.length + 1);
      setPhotoForm({
        id: `gal-${Date.now()}`,
        image: "/assets/gallery/celebrating-success.jpg",
      });
    }
    setIsDragging(false);
    setIsPhotoModalOpen(true);
  };

  const handleSavePhoto = (e: React.FormEvent) => {
    e.preventDefault();
    if (!photoForm.image) {
      alert("Please upload or select an image.");
      return;
    }

    const list = [...galleryData.items];
    if (editingPhotoId) {
      const idx = list.findIndex((p) => p.id === editingPhotoId);
      if (idx >= 0) list[idx] = photoForm;
    } else {
      list.push(photoForm);
    }

    const updated = { ...galleryData, items: list };
    setGalleryData(updated);
    setIsPhotoModalOpen(false);
    handleSaveAll(updated);
  };

  const handleDeletePhoto = (id: string, slotNum: number) => {
    if (!window.confirm(`Delete Photo #${slotNum}?`)) return;
    const list = galleryData.items.filter((p) => p.id !== id);
    const updated = { ...galleryData, items: list };
    setGalleryData(updated);
    handleSaveAll(updated);
  };

  const handleMovePhoto = (index: number, direction: "up" | "down") => {
    const list = [...galleryData.items];
    const targetIdx = direction === "up" ? index - 1 : index + 1;
    if (targetIdx < 0 || targetIdx >= list.length) return;

    const temp = list[index];
    list[index] = list[targetIdx];
    list[targetIdx] = temp;

    const updated = { ...galleryData, items: list };
    setGalleryData(updated);
    handleSaveAll(updated);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* 1. Celebrating Success Spotlight Editor */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
              SPOTLIGHT FEATURE
            </span>
            <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
              Celebrating Success Hero Showcase
            </h3>
          </div>
          <button
            type="button"
            onClick={() => handleSaveAll()}
            disabled={isSaving}
            className="stamp-button stamp-button-primary"
            style={{ padding: "8px 20px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
          >
            {isSaving ? "SAVING..." : "SAVE SPOTLIGHT →"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "24px" }}>
          <div>
            <div style={{ marginBottom: "16px" }}>
              <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
                SPOTLIGHT TITLE
              </label>
              <input
                type="text"
                value={galleryData.celebratingSuccess?.title || "Celebrating Success"}
                onChange={(e) =>
                  setGalleryData({
                    ...galleryData,
                    celebratingSuccess: {
                      ...galleryData.celebratingSuccess,
                      title: e.target.value,
                    },
                  })
                }
                className="form-input"
                style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
              />
            </div>

            <div>
              <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
                ONE-LINER FOOTER TEXT (ON IMAGE)
              </label>
              <textarea
                rows={3}
                value={galleryData.celebratingSuccess?.oneLiner || ""}
                onChange={(e) =>
                  setGalleryData({
                    ...galleryData,
                    celebratingSuccess: {
                      ...galleryData.celebratingSuccess,
                      oneLiner: e.target.value,
                    },
                  })
                }
                className="form-input"
                style={{ width: "100%", padding: "10px 14px", fontSize: "13px", lineHeight: 1.5 }}
              />
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              HERO IMAGE
            </label>
            <div style={{ display: "flex", gap: "16px", alignItems: "center" }}>
              <div style={{ width: "180px", height: "110px", position: "relative", border: "1px solid var(--white-border)", borderRadius: "6px", overflow: "hidden", backgroundColor: "#0A1329" }}>
                {galleryData.celebratingSuccess?.image && (
                  <Image
                    src={galleryData.celebratingSuccess.image}
                    alt="Celebrating Success Preview"
                    fill
                    style={{ objectFit: "cover" }}
                  />
                )}
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                <input
                  type="file"
                  ref={bannerFileInputRef}
                  onChange={handleBannerFileChange}
                  accept="image/*"
                  style={{ display: "none" }}
                />
                <button
                  type="button"
                  onClick={() => bannerFileInputRef.current?.click()}
                  disabled={isUploading}
                  className="stamp-button"
                  style={{ padding: "8px 16px", fontSize: "12px" }}
                >
                  {isUploading ? "Uploading..." : "📷 Upload New Photo"}
                </button>
                <input
                  type="text"
                  placeholder="Or enter image URL..."
                  value={galleryData.celebratingSuccess?.image || ""}
                  onChange={(e) =>
                    setGalleryData({
                      ...galleryData,
                      celebratingSuccess: {
                        ...galleryData.celebratingSuccess,
                        image: e.target.value,
                      },
                    })
                  }
                  className="form-input"
                  style={{ width: "240px", padding: "6px 10px", fontSize: "11.5px" }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Photo Grid — Pure visual cards, no title/category/date, click to change via drag/drop, trash icon */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", flexWrap: "wrap", gap: "12px" }}>
          <div>
            <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
              CURATED PHOTO REPOSITORY
            </span>
            <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
              Visual Vault Moments ({galleryData.items.length})
            </h3>
          </div>
          <button
            type="button"
            onClick={() => handleOpenPhotoModal()}
            className="stamp-button stamp-button-primary"
            style={{ padding: "8px 18px", fontSize: "12px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
          >
            + ADD NEW PHOTO CAPTURE
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: "20px" }}>
          {galleryData.items.map((item, idx) => (
            <div
              key={item.id || idx}
              onClick={() => handleOpenPhotoModal(item, idx)}
              title="Click anywhere to change this photo"
              style={{
                backgroundColor: "var(--white-alabaster)",
                border: "1px solid var(--white-border)",
                borderRadius: "10px",
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                cursor: "pointer",
                position: "relative",
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
              {/* Pure Photo Tile with Slot Badge */}
              <div style={{ position: "relative", width: "100%", aspectRatio: "16 / 10.5", backgroundColor: "#0A1329" }}>
                <Image
                  src={item.image || "/assets/gallery/celebrating-success.jpg"}
                  alt={`Photo slot #${idx + 1}`}
                  fill
                  style={{ objectFit: "cover" }}
                />
                <span
                  style={{
                    position: "absolute",
                    top: "10px",
                    left: "10px",
                    backgroundColor: "rgba(10, 19, 41, 0.88)",
                    color: "#FFFFFF",
                    fontSize: "11px",
                    fontFamily: "var(--font-mono)",
                    fontWeight: 700,
                    padding: "3px 9px",
                    borderRadius: "4px",
                    border: "1px solid rgba(255, 255, 255, 0.15)",
                  }}
                >
                  #{idx + 1}
                </span>
              </div>

              {/* Clean Bottom Action Strip — Reorder Controls and Single Red Trash Can */}
              <div
                style={{
                  padding: "12px 14px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  backgroundColor: "var(--white-pure)",
                  borderTop: "1px solid var(--white-border)",
                }}
              >
                {/* Reorder Arrows */}
                <div style={{ display: "flex", gap: "6px" }}>
                  <button
                    type="button"
                    disabled={idx === 0}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMovePhoto(idx, "up");
                    }}
                    className="stamp-button"
                    style={{ padding: "4px 9px", fontSize: "11px" }}
                    title="Move Earlier"
                  >
                    ←
                  </button>
                  <button
                    type="button"
                    disabled={idx === galleryData.items.length - 1}
                    onClick={(e) => {
                      e.stopPropagation();
                      handleMovePhoto(idx, "down");
                    }}
                    className="stamp-button"
                    style={{ padding: "4px 9px", fontSize: "11px" }}
                    title="Move Later"
                  >
                    →
                  </button>
                </div>

                {/* Single Red Trash Delete Icon */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeletePhoto(item.id, idx + 1);
                  }}
                  title={`Delete Photo #${idx + 1}`}
                  style={{
                    width: "30px",
                    height: "30px",
                    borderRadius: "6px",
                    border: "1px solid rgba(220, 38, 38, 0.2)",
                    backgroundColor: "rgba(220, 38, 38, 0.06)",
                    color: "#dc2626",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    cursor: "pointer",
                    transition: "background 0.15s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(220, 38, 38, 0.15)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = "rgba(220, 38, 38, 0.06)";
                  }}
                >
                  <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="3 6 5 6 21 6" />
                    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                    <line x1="10" y1="11" x2="10" y2="17" />
                    <line x1="14" y1="11" x2="14" y2="17" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===================== MODAL: CHANGE PHOTO (DRAG & DROP + BROWSE) ===================== */}
      {isPhotoModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsPhotoModalOpen(false)} aria-hidden="true" />
          <div
            className="lightbox-dialog"
            style={{
              maxWidth: "520px",
              width: "100%",
              padding: "28px",
              position: "relative",
              zIndex: 10,
              backgroundColor: "var(--white-pure)",
              borderRadius: "10px",
              boxShadow: "0 20px 50px rgba(7, 13, 30, 0.35)",
            }}
          >
            {/* Modal Header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "18px" }}>
              <div>
                <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
                  PHOTO VAULT REPOSITORY
                </span>
                <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
                  {editingPhotoId ? `Change Photo #${editingSlotNum}` : "Add New Photo"}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsPhotoModalOpen(false)}
                style={{
                  background: "transparent",
                  border: "none",
                  color: "var(--ink-muted)",
                  fontSize: "20px",
                  cursor: "pointer",
                  padding: "4px 8px",
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSavePhoto} style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
              {/* Current Preview */}
              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "8px", display: "block", fontWeight: 700, letterSpacing: "0.06em" }}>
                  CURRENT PHOTO PREVIEW
                </label>
                <div
                  style={{
                    position: "relative",
                    width: "100%",
                    height: "190px",
                    borderRadius: "8px",
                    overflow: "hidden",
                    border: "1.5px solid var(--white-border-strong)",
                    backgroundColor: "#0A1329",
                  }}
                >
                  {photoForm.image ? (
                    <Image src={photoForm.image} alt="Photo Preview" fill style={{ objectFit: "cover" }} />
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", height: "100%", color: "var(--ink-muted)", fontSize: "13px" }}>
                      No image selected
                    </div>
                  )}
                </div>
              </div>

              {/* Drag & Drop Zone + Device Browse */}
              <div>
                <label className="form-label" style={{ fontSize: "11.5px", marginBottom: "8px", display: "block", fontWeight: 700, letterSpacing: "0.06em" }}>
                  CHANGE PHOTO FROM DEVICE
                </label>

                <div
                  onDragOver={(e) => {
                    e.preventDefault();
                    setIsDragging(true);
                  }}
                  onDragLeave={(e) => {
                    e.preventDefault();
                    setIsDragging(false);
                  }}
                  onDrop={async (e) => {
                    e.preventDefault();
                    setIsDragging(false);
                    const file = e.dataTransfer.files?.[0];
                    if (file) {
                      const uploadedUrl = await handleFileUpload(file, "gallery");
                      if (uploadedUrl) {
                        setPhotoForm((prev) => ({ ...prev, image: uploadedUrl }));
                      }
                    }
                  }}
                  onClick={() => photoFileInputRef.current?.click()}
                  style={{
                    border: isDragging ? "2px dashed var(--gold-oxford)" : "2px dashed var(--white-border-strong)",
                    borderRadius: "8px",
                    padding: "28px 16px",
                    textAlign: "center",
                    backgroundColor: isDragging ? "rgba(197, 168, 128, 0.08)" : "var(--white-alabaster)",
                    cursor: "pointer",
                    transition: "all 0.18s ease",
                  }}
                >
                  <input
                    type="file"
                    ref={photoFileInputRef}
                    onChange={handleModalPhotoFileChange}
                    accept="image/*"
                    style={{ display: "none" }}
                  />

                  <div style={{ color: isDragging ? "var(--gold-oxford)" : "var(--navy-hero)", marginBottom: "10px" }}>
                    <svg width="34" height="34" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" style={{ margin: "0 auto" }}>
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                      <polyline points="17 8 12 3 7 8" />
                      <line x1="12" y1="3" x2="12" y2="15" />
                    </svg>
                  </div>

                  <p style={{ margin: "0 0 4px", fontSize: "13.5px", fontWeight: 600, color: "var(--ink-title)" }}>
                    {isUploading ? "Uploading photo to server..." : isDragging ? "Drop photo to upload" : "Drag and drop new photo here"}
                  </p>
                  <p style={{ margin: "0 0 12px", fontSize: "11.5px", color: "var(--ink-muted)" }}>
                    Supports JPG, PNG, WEBP from your computer
                  </p>

                  <button
                    type="button"
                    disabled={isUploading}
                    className="stamp-button"
                    style={{ padding: "6px 16px", fontSize: "12px", pointerEvents: "none" }}
                  >
                    📁 Browse from Device
                  </button>
                </div>
              </div>

              {/* Action Buttons */}
              <div style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setIsPhotoModalOpen(false)}
                  className="stamp-button"
                  style={{ padding: "9px 18px", fontSize: "12.5px" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isUploading || isSaving}
                  className="stamp-button stamp-button-primary"
                  style={{
                    padding: "9px 24px",
                    fontSize: "12.5px",
                    backgroundColor: "var(--navy-hero)",
                    color: "#FFFFFF",
                    borderColor: "var(--navy-hero)",
                    fontWeight: 700,
                  }}
                >
                  {isSaving ? "Saving..." : "Save Photo"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
