"use client";

import React, { useState, useEffect } from "react";
import { HomeContent } from "@/content/home";
import { defaultCmsData } from "@/lib/cms-types";

interface AdminHomeTabProps {
  data: HomeContent;
  onSave: (updated: HomeContent) => Promise<void>;
  showToast: (msg: string) => void;
}

const normalizeHomeContent = (raw?: HomeContent): HomeContent => {
  const fallback = defaultCmsData.home;
  const heroRaw = (raw?.hero || {}) as any;
  return {
    hero: {
      badge: heroRaw.badge || fallback.hero.badge,
      headline: heroRaw.headline || heroRaw.title || fallback.hero.headline,
      subline: heroRaw.subline || heroRaw.subtitle || fallback.hero.subline,
      primaryCta: {
        text: heroRaw.primaryCta?.text || heroRaw.ctaPrimaryText || fallback.hero.primaryCta.text,
        href: heroRaw.primaryCta?.href || fallback.hero.primaryCta.href,
      },
      secondaryCta: {
        text: heroRaw.secondaryCta?.text || heroRaw.ctaSecondaryText || fallback.hero.secondaryCta.text,
        href: heroRaw.secondaryCta?.href || fallback.hero.secondaryCta.href,
      },
    },
    stats: Array.isArray(raw?.stats) && raw.stats.length > 0 ? raw.stats : fallback.stats,
    initiatives: Array.isArray(raw?.initiatives) && raw.initiatives.length > 0 ? raw.initiatives : fallback.initiatives,
    pillars: Array.isArray(raw?.pillars) && raw.pillars.length > 0 ? raw.pillars : fallback.pillars,
    speakersMentors: Array.isArray(raw?.speakersMentors) ? raw.speakersMentors : fallback.speakersMentors,
    startups: Array.isArray(raw?.startups) ? raw.startups : fallback.startups,
    closingCta: raw?.closingCta || fallback.closingCta,
  };
};

export default function AdminHomeTab({ data, onSave, showToast }: AdminHomeTabProps) {
  const [formData, setFormData] = useState<HomeContent>(() => normalizeHomeContent(data));
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    if (data) {
      setFormData(normalizeHomeContent(data));
    }
  }, [data]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSave(formData);
      showToast("Home page content updated & published live!");
    } catch {
      alert("Failed to save Home content.");
    } finally {
      setIsSaving(false);
    }
  };

  const handleStatChange = (index: number, field: "label" | "value" | "detail", val: string) => {
    const updatedStats = [...formData.stats];
    updatedStats[index] = { ...updatedStats[index], [field]: val };
    setFormData({ ...formData, stats: updatedStats });
  };

  const handlePillarChange = (index: number, field: "title" | "blurb", val: string) => {
    const updatedPillars = [...formData.pillars];
    updatedPillars[index] = { ...updatedPillars[index], [field]: val };
    setFormData({ ...formData, pillars: updatedPillars });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "32px" }}>
      {/* 1. Hero Section Box */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px", boxShadow: "0 2px 8px rgba(10, 19, 41, 0.04)" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
          <div>
            <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
              SECTION 01
            </span>
            <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 0" }}>
              Hero Banner Content
            </h3>
          </div>
          <button
            type="submit"
            disabled={isSaving}
            className="stamp-button stamp-button-primary"
            style={{ padding: "8px 20px", fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
          >
            {isSaving ? "SAVING..." : "SAVE CHANGES →"}
          </button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              HERO BADGE TEXT
            </label>
            <input
              type="text"
              value={formData.hero.badge}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, badge: e.target.value },
                })
              }
              className="form-input"
              style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              MAIN HEADLINE
            </label>
            <input
              type="text"
              value={formData.hero.headline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  hero: { ...formData.hero, headline: e.target.value },
                })
              }
              className="form-input"
              style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
            />
          </div>
        </div>

        <div style={{ marginTop: "20px" }}>
          <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
            HERO SUBLINE / NARRATIVE
          </label>
          <textarea
            rows={3}
            value={formData.hero.subline}
            onChange={(e) =>
              setFormData({
                ...formData,
                hero: { ...formData.hero, subline: e.target.value },
              })
            }
            className="form-input"
            style={{ width: "100%", padding: "10px 14px", fontSize: "13px", lineHeight: 1.5 }}
          />
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px", marginTop: "20px" }}>
          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              PRIMARY CTA BUTTON
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Button Text"
                value={formData.hero?.primaryCta?.text ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: {
                      ...formData.hero,
                      primaryCta: {
                        ...(formData.hero?.primaryCta || { href: "/about" }),
                        text: e.target.value,
                      },
                    },
                  })
                }
                className="form-input"
                style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }}
              />
              <input
                type="text"
                placeholder="Href / URL"
                value={formData.hero?.primaryCta?.href ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: {
                      ...formData.hero,
                      primaryCta: {
                        ...(formData.hero?.primaryCta || { text: "Know More" }),
                        href: e.target.value,
                      },
                    },
                  })
                }
                className="form-input"
                style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }}
              />
            </div>
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              SECONDARY CTA BUTTON
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Button Text"
                value={formData.hero?.secondaryCta?.text ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: {
                      ...formData.hero,
                      secondaryCta: {
                        ...(formData.hero?.secondaryCta || { href: "#initiatives" }),
                        text: e.target.value,
                      },
                    },
                  })
                }
                className="form-input"
                style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }}
              />
              <input
                type="text"
                placeholder="Href / URL"
                value={formData.hero?.secondaryCta?.href ?? ""}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    hero: {
                      ...formData.hero,
                      secondaryCta: {
                        ...(formData.hero?.secondaryCta || { text: "Explore Initiatives" }),
                        href: e.target.value,
                      },
                    },
                  })
                }
                className="form-input"
                style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 2. Impact Statistics Counters */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px", boxShadow: "0 2px 8px rgba(10, 19, 41, 0.04)" }}>
        <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
          SECTION 02
        </span>
        <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 20px" }}>
          Key Impact Metrics (Counters)
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "20px" }}>
          {formData.stats.map((st, idx) => (
            <div key={idx} style={{ padding: "18px", backgroundColor: "var(--white-alabaster)", border: "1px solid var(--white-border)", borderRadius: "6px" }}>
              <label className="form-label" style={{ fontSize: "11px", display: "block", marginBottom: "4px" }}>
                STAT NUMBER / VALUE
              </label>
              <input
                type="text"
                value={st.value}
                onChange={(e) => handleStatChange(idx, "value", e.target.value)}
                className="form-input"
                style={{ width: "100%", padding: "8px 12px", fontSize: "18px", fontWeight: 700, fontFamily: "var(--font-serif)", marginBottom: "12px" }}
              />

              <label className="form-label" style={{ fontSize: "11px", display: "block", marginBottom: "4px" }}>
                METRIC LABEL
              </label>
              <input
                type="text"
                value={st.label}
                onChange={(e) => handleStatChange(idx, "label", e.target.value)}
                className="form-input"
                style={{ width: "100%", padding: "8px 12px", fontSize: "12px", marginBottom: "12px" }}
              />

              <label className="form-label" style={{ fontSize: "11px", display: "block", marginBottom: "4px" }}>
                SUPPORTING DETAIL
              </label>
              <textarea
                rows={2}
                value={st.detail}
                onChange={(e) => handleStatChange(idx, "detail", e.target.value)}
                className="form-input"
                style={{ width: "100%", padding: "8px 12px", fontSize: "12px", lineHeight: 1.4 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 3. Core Pillars / Focus Areas */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px", boxShadow: "0 2px 8px rgba(10, 19, 41, 0.04)" }}>
        <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
          SECTION 03
        </span>
        <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 20px" }}>
          Strategic Pillars & Focus Areas
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          {formData.pillars.map((pillar, idx) => (
            <div key={pillar.id || idx} style={{ padding: "20px", backgroundColor: "var(--white-alabaster)", border: "1px solid var(--white-border)", borderRadius: "6px" }}>
              <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", fontWeight: 700, display: "block", marginBottom: "8px" }}>
                PILLAR {pillar.number}
              </span>
              <input
                type="text"
                value={pillar.title}
                onChange={(e) => handlePillarChange(idx, "title", e.target.value)}
                className="form-input"
                style={{ width: "100%", padding: "8px 12px", fontSize: "15px", fontWeight: 700, marginBottom: "12px" }}
              />
              <textarea
                rows={3}
                value={pillar.blurb}
                onChange={(e) => handlePillarChange(idx, "blurb", e.target.value)}
                className="form-input"
                style={{ width: "100%", padding: "8px 12px", fontSize: "12.5px", lineHeight: 1.5 }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* 4. Closing CTA Section */}
      <div className="admin-card" style={{ padding: "28px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", borderRadius: "8px", boxShadow: "0 2px 8px rgba(10, 19, 41, 0.04)" }}>
        <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
          SECTION 04
        </span>
        <h3 className="font-display-serif" style={{ fontSize: "22px", color: "var(--ink-title)", margin: "4px 0 20px" }}>
          Footer Closing Invitation
        </h3>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "20px" }}>
          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              HEADLINE
            </label>
            <input
              type="text"
              value={formData.closingCta.headline}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  closingCta: { ...formData.closingCta, headline: e.target.value },
                })
              }
              className="form-input"
              style={{ width: "100%", padding: "10px 14px", fontSize: "13px" }}
            />
          </div>

          <div>
            <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
              BUTTON TEXT & LINK
            </label>
            <div style={{ display: "flex", gap: "10px" }}>
              <input
                type="text"
                placeholder="Button Text"
                value={formData.closingCta.buttonText}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    closingCta: { ...formData.closingCta, buttonText: e.target.value },
                  })
                }
                className="form-input"
                style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }}
              />
              <input
                type="text"
                placeholder="Href / URL"
                value={formData.closingCta.href}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    closingCta: { ...formData.closingCta, href: e.target.value },
                  })
                }
                className="form-input"
                style={{ flex: 1, padding: "10px 14px", fontSize: "13px" }}
              />
            </div>
          </div>
        </div>

        <div style={{ marginTop: "16px" }}>
          <label className="form-label" style={{ fontSize: "12px", marginBottom: "6px", display: "block", fontWeight: 600 }}>
            SUBLINE DESCRIPTION
          </label>
          <textarea
            rows={2}
            value={formData.closingCta.subline}
            onChange={(e) =>
              setFormData({
                ...formData,
                closingCta: { ...formData.closingCta, subline: e.target.value },
              })
            }
            className="form-input"
            style={{ width: "100%", padding: "10px 14px", fontSize: "13px", lineHeight: 1.5 }}
          />
        </div>

        <div style={{ marginTop: "24px", display: "flex", justifyContent: "flex-end" }}>
          <button
            type="submit"
            disabled={isSaving}
            className="stamp-button stamp-button-primary"
            style={{ padding: "12px 28px", fontSize: "13px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
          >
            {isSaving ? "SAVING ALL HOME CHANGES..." : "SAVE ALL HOME CHANGES →"}
          </button>
        </div>
      </div>
    </form>
  );
}
