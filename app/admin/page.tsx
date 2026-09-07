"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { CaseFile } from "@/content/events";
import { SpeakerItem } from "@/app/api/admin/speakers/route";
import { TeamMemberItem } from "@/app/api/admin/team/route";
import { GalleryItem } from "@/content/gallery";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Main Section Navigation
  const [activeSection, setActiveSection] = useState<"events" | "speakers" | "team" | "gallery">("events");

  // --- 1. EVENTS STATE ---
  const [eventsList, setEventsList] = useState<CaseFile[]>([]);
  const [isLoadingEvents, setIsLoadingEvents] = useState(false);
  const [eventFilterStatus, setEventFilterStatus] = useState<string>("ALL");
  const [eventSearch, setEventSearch] = useState("");
  const [isEventModalOpen, setIsEventModalOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<CaseFile | null>(null);
  const [isSavingEvent, setIsSavingEvent] = useState(false);

  const [eventForm, setEventForm] = useState({
    title: "",
    category: "Strategy",
    status: "ACTIVE" as "ACTIVE" | "UPCOMING" | "CLOSED",
    date: "SPRING 2026",
    prizeOrOutput: "₹50,000 & Citation",
    eligibility: "Open Pan-India",
    description: "",
  });

  // --- 2. SPEAKERS STATE ---
  const [speakersList, setSpeakersList] = useState<SpeakerItem[]>([]);
  const [isLoadingSpeakers, setIsLoadingSpeakers] = useState(false);
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<SpeakerItem | null>(null);
  const [isSavingSpeaker, setIsSavingSpeaker] = useState(false);

  const [speakerForm, setSpeakerForm] = useState({
    name: "",
    title: "",
    firm: "",
    category: "Venture Capital",
    quote: "",
    image: "/assets/gallery/summit-keynote.jpg",
  });

  // --- 3. TEAM MEMBERS STATE ---
  const [teamList, setTeamList] = useState<TeamMemberItem[]>([]);
  const [isLoadingTeam, setIsLoadingTeam] = useState(false);
  const [teamTierFilter, setTeamTierFilter] = useState<string>("ALL");
  const [isTeamModalOpen, setIsTeamModalOpen] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMemberItem | null>(null);
  const [isSavingMember, setIsSavingMember] = useState(false);

  const [teamForm, setTeamForm] = useState({
    name: "",
    role: "Associate",
    tier: "coreTeam" as "coordinators" | "heads" | "coreTeam",
    dept: "Equity Research",
    batch: "Y25",
    email: "24uec533@lnmiit.ac.in",
    linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
    image: "/assets/team/aditya-tiwari.jpg",
  });

  // --- 4. GALLERY / VISUAL VAULT STATE ---
  const [galleryList, setGalleryList] = useState<GalleryItem[]>([]);
  const [isLoadingGallery, setIsLoadingGallery] = useState(false);
  const [galleryCategoryFilter, setGalleryCategoryFilter] = useState<string>("ALL");
  const [isGalleryModalOpen, setIsGalleryModalOpen] = useState(false);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [isSavingGallery, setIsSavingGallery] = useState(false);

  const [galleryForm, setGalleryForm] = useState({
    title: "",
    category: "Summits" as GalleryItem["category"],
    date: "SPRING 2026",
    location: "Main Auditorium, LNMIIT",
    tag: "CONCLAVE DISPATCH",
    description: "",
    image: "/assets/gallery/celebrating-success.jpg",
  });

  // Check initial session
  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/admin/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
          loadAllData();
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
        loadAllData();
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

  const loadAllData = () => {
    fetchEvents();
    fetchSpeakers();
    fetchTeam();
    fetchGallery();
  };

  // --- FETCHERS ---
  const fetchEvents = async () => {
    setIsLoadingEvents(true);
    try {
      const res = await fetch("/api/admin/events");
      const data = await res.json();
      if (data.success && Array.isArray(data.events)) {
        setEventsList(data.events);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingEvents(false);
    }
  };

  const fetchSpeakers = async () => {
    setIsLoadingSpeakers(true);
    try {
      const res = await fetch("/api/admin/speakers");
      const data = await res.json();
      if (data.success && Array.isArray(data.speakers)) {
        setSpeakersList(data.speakers);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingSpeakers(false);
    }
  };

  const fetchTeam = async () => {
    setIsLoadingTeam(true);
    try {
      const res = await fetch("/api/admin/team");
      const data = await res.json();
      if (data.success && Array.isArray(data.team)) {
        setTeamList(data.team);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingTeam(false);
    }
  };

  const fetchGallery = async () => {
    setIsLoadingGallery(true);
    try {
      const res = await fetch("/api/admin/gallery");
      const data = await res.json();
      if (data.success && Array.isArray(data.items)) {
        setGalleryList(data.items);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  // --- EVENT ACTIONS ---
  const handleToggleEventStatus = async (id: string, newStatus: "ACTIVE" | "UPCOMING" | "CLOSED") => {
    setEventsList((prev) =>
      prev.map((ev) => (ev.id === id ? { ...ev, status: newStatus } : ev))
    );

    try {
      const res = await fetch("/api/admin/events", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        showToast(`Event status set to ${newStatus === "ACTIVE" ? "LIVE" : newStatus}`);
      } else {
        fetchEvents();
      }
    } catch {
      fetchEvents();
    }
  };

  const handleSaveEvent = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingEvent(true);

    const eventPayload: CaseFile = {
      id: editingEvent
        ? editingEvent.id
        : eventForm.title.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
      fileNumber: editingEvent ? editingEvent.fileNumber : "",
      title: eventForm.title.toUpperCase(),
      category: eventForm.category as any,
      status: eventForm.status,
      date: eventForm.date || "UPCOMING",
      prizeOrOutput: eventForm.prizeOrOutput,
      eligibility: eventForm.eligibility,
      description: eventForm.description,
    };

    try {
      const res = await fetch("/api/admin/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ event: eventPayload }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(editingEvent ? "Event updated!" : "New event published live!");
        setIsEventModalOpen(false);
        fetchEvents();
      } else {
        alert(data.error || "Failed to save event.");
      }
    } catch {
      alert("Error saving event.");
    } finally {
      setIsSavingEvent(false);
    }
  };

  const handleDeleteEvent = async (id: string, title: string) => {
    if (!window.confirm(`Delete "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/events?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        showToast(`Event removed.`);
        setEventsList((prev) => prev.filter((e) => e.id !== id));
      }
    } catch {
      alert("Error deleting event.");
    }
  };

  // --- SPEAKER ACTIONS ---
  const handleOpenSpeakerModal = (speaker?: SpeakerItem) => {
    if (speaker) {
      setEditingSpeaker(speaker);
      setSpeakerForm({
        name: speaker.name,
        title: speaker.title,
        firm: speaker.firm,
        category: speaker.category,
        quote: speaker.quote,
        image: speaker.image || "/assets/gallery/summit-keynote.jpg",
      });
    } else {
      setEditingSpeaker(null);
      setSpeakerForm({
        name: "",
        title: "",
        firm: "",
        category: "Venture Capital",
        quote: "",
        image: "/assets/gallery/summit-keynote.jpg",
      });
    }
    setIsSpeakerModalOpen(true);
  };

  const handleSaveSpeaker = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingSpeaker(true);

    const payload: SpeakerItem = {
      id: editingSpeaker ? editingSpeaker.id : `speaker-${Date.now()}`,
      name: speakerForm.name,
      title: speakerForm.title,
      firm: speakerForm.firm,
      category: speakerForm.category,
      quote: speakerForm.quote,
      image: speakerForm.image,
    };

    try {
      const res = await fetch("/api/admin/speakers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ speaker: payload }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(editingSpeaker ? "Speaker updated!" : "New speaker added!");
        setIsSpeakerModalOpen(false);
        fetchSpeakers();
      } else {
        alert(data.error || "Failed to save speaker.");
      }
    } catch {
      alert("Error saving speaker.");
    } finally {
      setIsSavingSpeaker(false);
    }
  };

  const handleDeleteSpeaker = async (id: string, name: string) => {
    if (!window.confirm(`Delete speaker "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/speakers?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        showToast(`Speaker removed.`);
        setSpeakersList((prev) => prev.filter((s) => s.id !== id && s.name !== name));
      }
    } catch {
      alert("Error deleting speaker.");
    }
  };

  // --- TEAM ACTIONS ---
  const handleOpenTeamModal = (member?: TeamMemberItem) => {
    if (member) {
      setEditingMember(member);
      setTeamForm({
        name: member.name,
        role: member.role,
        tier: member.tier,
        dept: member.dept || "",
        batch: member.batch || "Y25",
        email: member.email || "24uec533@lnmiit.ac.in",
        linkedin: member.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        image: member.image || "/assets/team/aditya-tiwari.jpg",
      });
    } else {
      setEditingMember(null);
      setTeamForm({
        name: "",
        role: "Associate",
        tier: "coreTeam",
        dept: "Equity Research",
        batch: "Y25",
        email: "24uec533@lnmiit.ac.in",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        image: "/assets/team/aditya-tiwari.jpg",
      });
    }
    setIsTeamModalOpen(true);
  };

  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingMember(true);

    const payload: TeamMemberItem = {
      id: editingMember ? editingMember.id : `team-${Date.now()}`,
      name: teamForm.name,
      role: teamForm.role,
      tier: teamForm.tier,
      dept: teamForm.dept,
      batch: teamForm.batch,
      focus: teamForm.dept,
      email: teamForm.email,
      linkedin: teamForm.linkedin,
      image: teamForm.image,
    };

    try {
      const res = await fetch("/api/admin/team", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ member: payload }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(editingMember ? "Team member updated!" : "Team member added!");
        setIsTeamModalOpen(false);
        fetchTeam();
      } else {
        alert(data.error || "Failed to save member.");
      }
    } catch {
      alert("Error saving member.");
    } finally {
      setIsSavingMember(false);
    }
  };

  const handleDeleteTeamMember = async (id: string, name: string) => {
    if (!window.confirm(`Delete member "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/team?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        showToast(`Member removed.`);
        setTeamList((prev) => prev.filter((m) => m.id !== id));
      }
    } catch {
      alert("Error deleting member.");
    }
  };

  // --- GALLERY ACTIONS ---
  const handleOpenGalleryModal = (item?: GalleryItem) => {
    if (item) {
      setEditingGalleryItem(item);
      setGalleryForm({
        title: item.title,
        category: item.category,
        date: item.date,
        location: item.location,
        tag: item.tag,
        description: item.description,
        image: item.image,
      });
    } else {
      setEditingGalleryItem(null);
      setGalleryForm({
        title: "",
        category: "Summits",
        date: "SPRING 2026",
        location: "Main Auditorium, LNMIIT",
        tag: "CONCLAVE DISPATCH",
        description: "",
        image: "/assets/gallery/celebrating-success.jpg",
      });
    }
    setIsGalleryModalOpen(true);
  };

  const handleSaveGalleryItem = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingGallery(true);

    const payload: GalleryItem = {
      id: editingGalleryItem ? editingGalleryItem.id : `moment-${Date.now()}`,
      title: galleryForm.title,
      category: galleryForm.category as any,
      date: galleryForm.date,
      location: galleryForm.location,
      tag: galleryForm.tag || "CONCLAVE DISPATCH",
      description: galleryForm.description,
      image: galleryForm.image || "/assets/gallery/celebrating-success.jpg",
    };

    try {
      const res = await fetch("/api/admin/gallery", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ item: payload }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(editingGalleryItem ? "Gallery archive updated!" : "New photo capture published to Visual Vault!");
        setIsGalleryModalOpen(false);
        fetchGallery();
      } else {
        alert(data.error || "Failed to save gallery item.");
      }
    } catch {
      alert("Error saving gallery item.");
    } finally {
      setIsSavingGallery(false);
    }
  };

  const handleDeleteGalleryItem = async (id: string, title: string) => {
    if (!window.confirm(`Delete photo archive "${title}"?`)) return;
    try {
      const res = await fetch(`/api/admin/gallery?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        showToast(`Archive record removed.`);
        setGalleryList((prev) => prev.filter((g) => g.id !== id));
      }
    } catch {
      alert("Error deleting gallery item.");
    }
  };

  // --- FILTERS ---
  const filteredEvents = eventsList.filter((ev) => {
    const matchesFilter = eventFilterStatus === "ALL" ? true : ev.status === eventFilterStatus;
    const matchesQuery =
      ev.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
      ev.category.toLowerCase().includes(eventSearch.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const filteredTeam = teamList.filter((m) => {
    if (teamTierFilter === "ALL") return true;
    return m.tier === teamTierFilter;
  });

  const filteredGallery = galleryList.filter((g) => {
    if (galleryCategoryFilter === "ALL") return true;
    return g.category.toLowerCase() === galleryCategoryFilter.toLowerCase();
  });

  const liveCount = eventsList.filter((e) => e.status === "ACTIVE").length;
  const upcomingCount = eventsList.filter((e) => e.status === "UPCOMING").length;
  const closedCount = eventsList.filter((e) => e.status === "CLOSED").length;

  // Unauthenticated Gate
  if (!isAuthenticated) {
    return (
      <main style={{ minHeight: "100vh", backgroundColor: "var(--navy-deep)", display: "flex", alignItems: "center", justifyContent: "center", padding: "24px" }}>
        <div style={{ maxWidth: "440px", width: "100%", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", boxShadow: "0 20px 40px rgba(0,0,0,0.5)", padding: "40px 32px", textAlign: "center" }}>
          <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
            <Image src="/logo.png" alt="Finlogue Crest" width={52} height={52} style={{ objectFit: "contain" }} />
          </div>

          <span className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--burgundy-crest)", textTransform: "uppercase", letterSpacing: "0.14em", fontWeight: 700 }}>
            FINLOGUE SECRETARIAT
          </span>
          <h1 className="font-display-serif" style={{ fontSize: "28px", color: "var(--ink-title)", margin: "8px 0 12px" }}>
            Coordinator Portal
          </h1>
          <p style={{ fontSize: "13.5px", color: "var(--ink-body)", marginBottom: "28px", lineHeight: 1.5 }}>
            Access the institutional control desk to manage live events, speakers, team hierarchy, photo archives, and Google Sheets synchronization.
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
              <div style={{ padding: "10px", backgroundColor: "var(--burgundy-tint)", border: "1px solid var(--burgundy-border)", color: "var(--burgundy-text)", fontSize: "12.5px", textAlign: "left" }}>
                ⚠ {authError}
              </div>
            )}

            <button
              type="submit"
              disabled={isVerifying}
              className="stamp-button stamp-button-primary"
              style={{ width: "100%", padding: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF", borderColor: "var(--navy-hero)" }}
            >
              {isVerifying ? "AUTHENTICATING..." : "AUTHORIZE ACCESS →"}
            </button>

            <Link href="/" style={{ fontSize: "12.5px", color: "var(--ink-muted)", marginTop: "8px", textDecoration: "none" }}>
              ← Return to Public Portal
            </Link>
          </form>
        </div>
      </main>
    );
  }

  // Authenticated Portal
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

      {/* Header Bar */}
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
                  LIVE SYNC ACTIVE
                </span>
              </div>
              <h1 className="font-display-serif" style={{ fontSize: "20px", color: "#FFFFFF", margin: 0 }}>
                Finlogue Management Desk
              </h1>
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" }}>
            <Link href="/events" target="_blank" rel="noopener noreferrer" className="stamp-button" style={{ fontSize: "12px", padding: "8px 16px", borderColor: "rgba(255,255,255,0.2)", color: "#FFFFFF" }}>
              PREVIEW SITE ↗
            </Link>
            <button
              type="button"
              onClick={() => {
                if (activeSection === "events") {
                  setEditingEvent(null);
                  setEventForm({ title: "", category: "Strategy", status: "ACTIVE", date: "SPRING 2026", prizeOrOutput: "₹50,000 & Citation", eligibility: "Open Pan-India", description: "" });
                  setIsEventModalOpen(true);
                } else if (activeSection === "speakers") {
                  handleOpenSpeakerModal();
                } else if (activeSection === "team") {
                  handleOpenTeamModal();
                } else {
                  handleOpenGalleryModal();
                }
              }}
              className="stamp-button stamp-button-primary"
              style={{ fontSize: "12px", padding: "8px 18px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
            >
              + ADD NEW {activeSection === "events" ? "EVENT" : activeSection === "speakers" ? "SPEAKER" : activeSection === "team" ? "MEMBER" : "PHOTO ARCHIVE"}
            </button>
            <button type="button" onClick={() => setIsAuthenticated(false)} style={{ fontSize: "12px", color: "var(--platinum-muted)", marginLeft: "8px" }}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Section Navigation Strip */}
      <section style={{ backgroundColor: "var(--white-pure)", borderBottom: "1px solid var(--white-border)", padding: "16px 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setActiveSection("events")}
              className="stamp-button"
              style={{
                fontSize: "13px",
                padding: "8px 20px",
                backgroundColor: activeSection === "events" ? "var(--navy-hero)" : "var(--white-pure)",
                color: activeSection === "events" ? "#FFFFFF" : "var(--ink-title)",
                borderColor: activeSection === "events" ? "var(--navy-hero)" : "var(--white-border)",
                fontWeight: 700,
              }}
            >
              📅 INITIATIVES & EVENTS ({eventsList.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("speakers")}
              className="stamp-button"
              style={{
                fontSize: "13px",
                padding: "8px 20px",
                backgroundColor: activeSection === "speakers" ? "var(--navy-hero)" : "var(--white-pure)",
                color: activeSection === "speakers" ? "#FFFFFF" : "var(--ink-title)",
                borderColor: activeSection === "speakers" ? "var(--navy-hero)" : "var(--white-border)",
                fontWeight: 700,
              }}
            >
              🎙️ SPEAKERS & MENTORS ({speakersList.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("team")}
              className="stamp-button"
              style={{
                fontSize: "13px",
                padding: "8px 20px",
                backgroundColor: activeSection === "team" ? "var(--navy-hero)" : "var(--white-pure)",
                color: activeSection === "team" ? "#FFFFFF" : "var(--ink-title)",
                borderColor: activeSection === "team" ? "var(--navy-hero)" : "var(--white-border)",
                fontWeight: 700,
              }}
            >
              👥 LEADERSHIP & TEAM ({teamList.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("gallery")}
              className="stamp-button"
              style={{
                fontSize: "13px",
                padding: "8px 20px",
                backgroundColor: activeSection === "gallery" ? "var(--navy-hero)" : "var(--white-pure)",
                color: activeSection === "gallery" ? "#FFFFFF" : "var(--ink-title)",
                borderColor: activeSection === "gallery" ? "var(--navy-hero)" : "var(--white-border)",
                fontWeight: 700,
              }}
            >
              🖼️ VISUAL VAULT / GALLERY ({galleryList.length})
            </button>
          </div>

          <Link
            href="/docs/GOOGLE_SHEETS_SETUP.md"
            target="_blank"
            className="stamp-button"
            style={{ fontSize: "11.5px", padding: "6px 14px", borderColor: "var(--navy-border)", color: "var(--navy-hero)" }}
          >
            📊 Google Sheets Setup Guide ↗
          </Link>
        </div>
      </section>

      {/* ================= SECTION 1: EVENTS MANAGER ================= */}
      {activeSection === "events" && (
        <section className="container" style={{ marginTop: "32px" }}>
          {/* Quick Metrics */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "16px", marginBottom: "28px" }}>
            <div style={{ padding: "16px", backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)" }}>
              <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-muted)" }}>TOTAL INITIATIVES</span>
              <span className="font-display-serif" style={{ fontSize: "28px", color: "var(--ink-title)", display: "block" }}>{eventsList.length}</span>
            </div>
            <div style={{ padding: "16px", backgroundColor: "rgba(21, 128, 61, 0.05)", border: "1px solid rgba(21, 128, 61, 0.25)" }}>
              <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--emerald)" }}>● LIVE EVENTS</span>
              <span className="font-display-serif" style={{ fontSize: "28px", color: "var(--emerald)", display: "block" }}>{liveCount}</span>
            </div>
            <div style={{ padding: "16px", backgroundColor: "rgba(197, 168, 128, 0.08)", border: "1px solid rgba(197, 168, 128, 0.3)" }}>
              <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--gold-oxford)" }}>● UPCOMING</span>
              <span className="font-display-serif" style={{ fontSize: "28px", color: "var(--gold-oxford)", display: "block" }}>{upcomingCount}</span>
            </div>
            <div style={{ padding: "16px", backgroundColor: "rgba(114, 47, 55, 0.05)", border: "1px solid rgba(114, 47, 55, 0.2)" }}>
              <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--burgundy-crest)" }}>● ARCHIVED</span>
              <span className="font-display-serif" style={{ fontSize: "28px", color: "var(--burgundy-crest)", display: "block" }}>{closedCount}</span>
            </div>
          </div>

          {/* Filter Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              {["ALL", "ACTIVE", "UPCOMING", "CLOSED"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setEventFilterStatus(s)}
                  className="stamp-button"
                  style={{
                    fontSize: "11px",
                    padding: "6px 14px",
                    backgroundColor: eventFilterStatus === s ? "var(--navy-hero)" : "var(--white-pure)",
                    color: eventFilterStatus === s ? "#FFFFFF" : "var(--ink-title)",
                    borderColor: eventFilterStatus === s ? "var(--navy-hero)" : "var(--white-border)",
                  }}
                >
                  {s === "ALL" ? "ALL" : s === "ACTIVE" ? "LIVE" : s}
                </button>
              ))}
            </div>

            <input
              type="text"
              placeholder="Search events..."
              value={eventSearch}
              onChange={(e) => setEventSearch(e.target.value)}
              className="form-input"
              style={{ maxWidth: "260px", padding: "8px 12px", fontSize: "12.5px", backgroundColor: "var(--white-pure)" }}
            />
          </div>

          {/* Events List */}
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
                    padding: "22px 26px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    flexWrap: "wrap",
                    gap: "20px",
                  }}
                >
                  <div style={{ flex: 1, minWidth: "280px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "8px", marginBottom: "6px" }}>
                      <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-muted)" }}>{ev.fileNumber}</span>
                      <span style={{ fontSize: "10px", padding: "2px 6px", backgroundColor: "var(--white-alabaster)", border: "1px solid var(--white-border)", textTransform: "uppercase" }}>
                        {ev.category}
                      </span>
                      <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--gold-oxford)" }}>#{ev.id}</span>
                    </div>

                    <h3 className="font-display-serif" style={{ fontSize: "21px", color: "var(--ink-title)", margin: "0 0 6px" }}>
                      {ev.title}
                    </h3>
                    <p style={{ fontSize: "13px", color: "var(--ink-body)", margin: "0 0 8px", lineHeight: 1.5, maxWidth: "700px" }}>
                      {ev.description}
                    </p>
                    <div style={{ display: "flex", gap: "16px", fontSize: "11.5px", color: "var(--ink-muted)", flexWrap: "wrap" }}>
                      <span>📅 {ev.date}</span>
                      <span>🏆 {ev.prizeOrOutput}</span>
                      <span>👥 {ev.eligibility}</span>
                    </div>
                  </div>

                  {/* 1-Click Status Switcher */}
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: "10px" }}>
                    <div style={{ display: "inline-flex", border: "1px solid var(--white-border)", borderRadius: "6px", overflow: "hidden", backgroundColor: "var(--white-alabaster)" }}>
                      <button
                        type="button"
                        onClick={() => handleToggleEventStatus(ev.id, "ACTIVE")}
                        style={{ padding: "6px 12px", fontSize: "11px", fontFamily: "var(--font-mono)", backgroundColor: isLive ? "var(--emerald)" : "transparent", color: isLive ? "#FFFFFF" : "var(--ink-muted)", fontWeight: isLive ? 700 : 500 }}
                      >
                        ● LIVE
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleEventStatus(ev.id, "UPCOMING")}
                        style={{ padding: "6px 12px", fontSize: "11px", fontFamily: "var(--font-mono)", backgroundColor: isUpcoming ? "var(--gold-oxford)" : "transparent", color: isUpcoming ? "var(--navy-deep)" : "var(--ink-muted)", fontWeight: isUpcoming ? 700 : 500 }}
                      >
                        ● UPCOMING
                      </button>
                      <button
                        type="button"
                        onClick={() => handleToggleEventStatus(ev.id, "CLOSED")}
                        style={{ padding: "6px 12px", fontSize: "11px", fontFamily: "var(--font-mono)", backgroundColor: isArchived ? "var(--burgundy-crest)" : "transparent", color: isArchived ? "#FFFFFF" : "var(--ink-muted)", fontWeight: isArchived ? 700 : 500 }}
                      >
                        ● ARCHIVED
                      </button>
                    </div>

                    <div style={{ display: "flex", gap: "6px" }}>
                      <button
                        type="button"
                        onClick={() => {
                          setEditingEvent(ev);
                          setEventForm({ title: ev.title, category: ev.category, status: ev.status, date: ev.date, prizeOrOutput: ev.prizeOrOutput, eligibility: ev.eligibility, description: ev.description });
                          setIsEventModalOpen(true);
                        }}
                        className="stamp-button"
                        style={{ fontSize: "10.5px", padding: "4px 10px", borderColor: "var(--navy-hero)", color: "var(--navy-hero)" }}
                      >
                        ✎ Edit
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDeleteEvent(ev.id, ev.title)}
                        className="stamp-button"
                        style={{ fontSize: "10.5px", padding: "4px 8px", borderColor: "var(--burgundy-border)", color: "var(--burgundy-text)" }}
                      >
                        ✕ Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= SECTION 2: SPEAKERS & MENTORS ================= */}
      {activeSection === "speakers" && (
        <section className="container" style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "20px" }}>
            <div>
              <h2 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", margin: 0 }}>
                Keynote Speakers & Conclave Mentors
              </h2>
              <p style={{ fontSize: "13px", color: "var(--ink-muted)", marginTop: "4px" }}>
                These profiles appear directly on the homepage in the fast Inspirational Speakers Carousel and POTR Conclave Jury.
              </p>
            </div>
            <button
              type="button"
              onClick={() => handleOpenSpeakerModal()}
              className="stamp-button stamp-button-primary"
              style={{ fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}
            >
              + ADD NEW SPEAKER
            </button>
          </div>

          <div className="grid-3" style={{ gap: "20px" }}>
            {speakersList.map((sp) => (
              <div
                key={sp.id || sp.name}
                style={{
                  backgroundColor: "var(--white-pure)",
                  border: "1px solid var(--white-border)",
                  boxShadow: "var(--card-shadow)",
                  padding: "24px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <div style={{ width: "48px", height: "48px", borderRadius: "50%", overflow: "hidden", position: "relative", backgroundColor: "var(--navy-deep)", flexShrink: 0 }}>
                      <Image src={sp.image || "/assets/gallery/summit-keynote.jpg"} alt={sp.name} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <span className="font-metadata-mono" style={{ fontSize: "10px", color: "var(--burgundy-crest)", textTransform: "uppercase" }}>
                        {sp.category}
                      </span>
                      <h4 className="font-display-serif" style={{ fontSize: "18px", color: "var(--ink-title)", margin: "2px 0 0" }}>
                        {sp.name}
                      </h4>
                    </div>
                  </div>

                  <p className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--gold-oxford)", marginBottom: "4px" }}>
                    {sp.title}
                  </p>
                  <p style={{ fontSize: "12px", color: "var(--ink-muted)", marginBottom: "12px" }}>
                    {sp.firm}
                  </p>
                  <blockquote style={{ fontSize: "12.5px", color: "var(--ink-body)", fontStyle: "italic", lineHeight: 1.5, borderLeft: "2px solid var(--gold-oxford)", paddingLeft: "10px", margin: "0 0 16px" }}>
                    &ldquo;{sp.quote}&rdquo;
                  </blockquote>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "8px", borderTop: "1px solid var(--white-border)", paddingTop: "12px" }}>
                  <button
                    type="button"
                    onClick={() => handleOpenSpeakerModal(sp)}
                    className="stamp-button"
                    style={{ fontSize: "10.5px", padding: "4px 10px", borderColor: "var(--navy-hero)", color: "var(--navy-hero)" }}
                  >
                    ✎ Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteSpeaker(sp.id || sp.name, sp.name)}
                    className="stamp-button"
                    style={{ fontSize: "10.5px", padding: "4px 8px", borderColor: "var(--burgundy-border)", color: "var(--burgundy-text)" }}
                  >
                    ✕ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= SECTION 3: LEADERSHIP & TEAM ================= */}
      {activeSection === "team" && (
        <section className="container" style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <h2 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", margin: 0 }}>
                Organizational Hierarchy & Team Roster
              </h2>
              <p style={{ fontSize: "13px", color: "var(--ink-muted)", marginTop: "4px" }}>
                Add, edit, or remove Coordinators, Department Heads, and Core Associates displayed on the About page.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px" }}>
              <div style={{ display: "flex", gap: "6px" }}>
                {["ALL", "coordinators", "heads", "coreTeam"].map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTeamTierFilter(t)}
                    className="stamp-button"
                    style={{
                      fontSize: "11px",
                      padding: "6px 12px",
                      backgroundColor: teamTierFilter === t ? "var(--navy-hero)" : "var(--white-pure)",
                      color: teamTierFilter === t ? "#FFFFFF" : "var(--ink-title)",
                      borderColor: teamTierFilter === t ? "var(--navy-hero)" : "var(--white-border)",
                    }}
                  >
                    {t === "ALL" ? "ALL" : t === "coordinators" ? "COORDINATORS" : t === "heads" ? "HEADS" : "ASSOCIATES"}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleOpenTeamModal()}
                className="stamp-button stamp-button-primary"
                style={{ fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}
              >
                + ADD MEMBER
              </button>
            </div>
          </div>

          <div className="grid-3" style={{ gap: "20px" }}>
            {filteredTeam.map((m) => (
              <div
                key={m.id || m.name}
                style={{
                  backgroundColor: "var(--white-pure)",
                  border: "1px solid var(--white-border)",
                  boxShadow: "var(--card-shadow)",
                  padding: "20px",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
                    <div style={{ width: "44px", height: "44px", borderRadius: "50%", overflow: "hidden", position: "relative", backgroundColor: "var(--navy-deep)", flexShrink: 0 }}>
                      <Image src={m.image || "/assets/team/aditya-tiwari.jpg"} alt={m.name} fill style={{ objectFit: "cover" }} />
                    </div>
                    <div>
                      <span
                        style={{
                          fontSize: "9.5px",
                          padding: "2px 6px",
                          borderRadius: "4px",
                          backgroundColor: m.tier === "coordinators" ? "var(--navy-hero)" : m.tier === "heads" ? "var(--burgundy-crest)" : "var(--white-alabaster)",
                          color: m.tier === "coreTeam" ? "var(--ink-title)" : "#FFFFFF",
                          fontFamily: "var(--font-mono)",
                          textTransform: "uppercase",
                        }}
                      >
                        {m.tier === "coordinators" ? "COORDINATOR" : m.tier === "heads" ? "HEAD" : "ASSOCIATE"}
                      </span>
                      <h4 className="font-display-serif" style={{ fontSize: "18px", color: "var(--ink-title)", margin: "4px 0 0" }}>
                        {m.name}
                      </h4>
                    </div>
                  </div>

                  <p style={{ fontSize: "12.5px", color: "var(--ink-body)", margin: "0 0 4px", fontWeight: 600 }}>
                    {m.role} {m.dept ? `· ${m.dept}` : ""}
                  </p>
                  <p className="font-metadata-mono" style={{ fontSize: "11px", color: "var(--ink-muted)", margin: "0 0 10px" }}>
                    {m.batch || "Y25"} · {m.email}
                  </p>
                  <a
                    href={m.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ fontSize: "11px", color: "var(--navy-hero)", textDecoration: "none", display: "inline-block", marginBottom: "12px" }}
                  >
                    LinkedIn Profile ↗
                  </a>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px", borderTop: "1px solid var(--white-border)", paddingTop: "10px" }}>
                  <button
                    type="button"
                    onClick={() => handleOpenTeamModal(m)}
                    className="stamp-button"
                    style={{ fontSize: "10.5px", padding: "4px 10px", borderColor: "var(--navy-hero)", color: "var(--navy-hero)" }}
                  >
                    ✎ Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteTeamMember(m.id || m.name, m.name)}
                    className="stamp-button"
                    style={{ fontSize: "10.5px", padding: "4px 8px", borderColor: "var(--burgundy-border)", color: "var(--burgundy-text)" }}
                  >
                    ✕ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ================= SECTION 4: VISUAL VAULT & GALLERY ================= */}
      {activeSection === "gallery" && (
        <section className="container" style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <h2 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", margin: 0 }}>
                Visual Vault & Photo Archives
              </h2>
              <p style={{ fontSize: "13px", color: "var(--ink-muted)", marginTop: "4px" }}>
                Add, preview, update, or remove photographic dispatches, award ceremonies, and keynote captures on the Gallery page.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["ALL", "Summits", "Pitch Sessions", "Keynotes", "Workshops", "Community"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setGalleryCategoryFilter(c)}
                    className="stamp-button"
                    style={{
                      fontSize: "11px",
                      padding: "6px 12px",
                      backgroundColor: galleryCategoryFilter === c ? "var(--navy-hero)" : "var(--white-pure)",
                      color: galleryCategoryFilter === c ? "#FFFFFF" : "var(--ink-title)",
                      borderColor: galleryCategoryFilter === c ? "var(--navy-hero)" : "var(--white-border)",
                    }}
                  >
                    {c.toUpperCase()}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={() => handleOpenGalleryModal()}
                className="stamp-button stamp-button-primary"
                style={{ fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}
              >
                + ADD PHOTO ARCHIVE
              </button>
            </div>
          </div>

          <div className="grid-3" style={{ gap: "20px" }}>
            {filteredGallery.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: "var(--white-pure)",
                  border: "1px solid var(--white-border)",
                  boxShadow: "var(--card-shadow)",
                  overflow: "hidden",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <div style={{ position: "relative", height: "180px", backgroundColor: "var(--navy-deep)" }}>
                    <Image
                      src={item.image}
                      alt={item.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      style={{ objectFit: "cover" }}
                    />
                    <span
                      style={{
                        position: "absolute",
                        top: "10px",
                        left: "10px",
                        backgroundColor: "rgba(7, 13, 30, 0.85)",
                        color: "var(--gold-oxford)",
                        fontSize: "9.5px",
                        padding: "3px 8px",
                        borderRadius: "2px",
                        fontFamily: "var(--font-mono)",
                        textTransform: "uppercase",
                        letterSpacing: "0.08em",
                        border: "1px solid rgba(197, 168, 128, 0.3)",
                      }}
                    >
                      {item.tag || item.category}
                    </span>
                  </div>

                  <div style={{ padding: "16px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                      <span style={{ fontSize: "11px", color: "var(--burgundy-crest)", fontWeight: 600, fontFamily: "var(--font-mono)", textTransform: "uppercase" }}>
                        {item.category}
                      </span>
                      <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-muted)" }}>
                        {item.date}
                      </span>
                    </div>

                    <h4 className="font-display-serif" style={{ fontSize: "17px", color: "var(--ink-title)", margin: "0 0 8px", lineHeight: 1.3 }}>
                      {item.title}
                    </h4>

                    <p style={{ fontSize: "12.5px", color: "var(--ink-body)", margin: "0 0 10px", lineHeight: 1.5 }}>
                      {item.description}
                    </p>

                    <div style={{ fontSize: "11px", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>
                      📍 {item.location}
                    </div>
                  </div>
                </div>

                <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px", borderTop: "1px solid var(--white-border)", padding: "12px 16px", backgroundColor: "var(--white-alabaster)" }}>
                  <button
                    type="button"
                    onClick={() => handleOpenGalleryModal(item)}
                    className="stamp-button"
                    style={{ fontSize: "10.5px", padding: "4px 10px", borderColor: "var(--navy-hero)", color: "var(--navy-hero)" }}
                  >
                    ✎ Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDeleteGalleryItem(item.id, item.title)}
                    className="stamp-button"
                    style={{ fontSize: "10.5px", padding: "4px 8px", borderColor: "var(--burgundy-border)", color: "var(--burgundy-text)" }}
                  >
                    ✕ Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* MODAL 1: ADD/EDIT EVENT */}
      {isEventModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsEventModalOpen(false)} />
          <div className="lightbox-dialog" style={{ maxWidth: "580px", padding: "30px", backgroundColor: "var(--white-pure)", color: "var(--ink-title)" }}>
            <h3 className="font-display-serif" style={{ fontSize: "22px", marginBottom: "16px" }}>
              {editingEvent ? "Edit Initiative" : "Add New Event"}
            </h3>
            <form onSubmit={handleSaveEvent} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="form-label">EVENT TITLE *</label>
                <input type="text" required value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="form-input" placeholder="e.g. NATIONAL STRATEGY SPRINT" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">CATEGORY</label>
                  <select value={eventForm.category} onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })} className="form-input">
                    <option value="Consulting">Consulting</option>
                    <option value="Finance">Finance</option>
                    <option value="Strategy">Strategy</option>
                    <option value="Venture">Venture</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">STATUS</label>
                  <select value={eventForm.status} onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as any })} className="form-input">
                    <option value="ACTIVE">ACTIVE (Live)</option>
                    <option value="UPCOMING">UPCOMING</option>
                    <option value="CLOSED">CLOSED (Archived)</option>
                  </select>
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">TIMELINE / DATE</label>
                  <input type="text" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} className="form-input" placeholder="SPRING 2026" />
                </div>
                <div>
                  <label className="form-label">PRIZE POOL</label>
                  <input type="text" value={eventForm.prizeOrOutput} onChange={(e) => setEventForm({ ...eventForm, prizeOrOutput: e.target.value })} className="form-input" placeholder="₹50,000 & Citation" />
                </div>
              </div>
              <div>
                <label className="form-label">ELIGIBILITY</label>
                <input type="text" value={eventForm.eligibility} onChange={(e) => setEventForm({ ...eventForm, eligibility: e.target.value })} className="form-input" />
              </div>
              <div>
                <label className="form-label">DESCRIPTION *</label>
                <textarea rows={3} required value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} className="form-textarea" />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button type="button" onClick={() => setIsEventModalOpen(false)} style={{ padding: "8px 16px", color: "var(--ink-muted)" }}>Cancel</button>
                <button type="submit" disabled={isSavingEvent} className="stamp-button stamp-button-primary" style={{ backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}>
                  {isSavingEvent ? "SAVING..." : "SAVE EVENT →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 2: ADD/EDIT SPEAKER */}
      {isSpeakerModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsSpeakerModalOpen(false)} />
          <div className="lightbox-dialog" style={{ maxWidth: "540px", padding: "30px", backgroundColor: "var(--white-pure)", color: "var(--ink-title)" }}>
            <h3 className="font-display-serif" style={{ fontSize: "22px", marginBottom: "16px" }}>
              {editingSpeaker ? "Edit Speaker / Mentor" : "Add Keynote Speaker / Mentor"}
            </h3>
            <form onSubmit={handleSaveSpeaker} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="form-label">FULL NAME *</label>
                <input type="text" required value={speakerForm.name} onChange={(e) => setSpeakerForm({ ...speakerForm, name: e.target.value })} className="form-input" placeholder="e.g. Radhika Iyer" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">ROLE / TITLE</label>
                  <input type="text" required value={speakerForm.title} onChange={(e) => setSpeakerForm({ ...speakerForm, title: e.target.value })} className="form-input" placeholder="Partner / Managing Director" />
                </div>
                <div>
                  <label className="form-label">FIRM / FUND / SPECIALTY</label>
                  <input type="text" required value={speakerForm.firm} onChange={(e) => setSpeakerForm({ ...speakerForm, firm: e.target.value })} className="form-input" placeholder="100X.VC / Goldman Sachs" />
                </div>
              </div>
              <div>
                <label className="form-label">CATEGORY TAG</label>
                <input type="text" value={speakerForm.category} onChange={(e) => setSpeakerForm({ ...speakerForm, category: e.target.value })} className="form-input" placeholder="Venture Capital, Angel Investment, Private Equity" />
              </div>
              <div>
                <label className="form-label">ENDORSEMENT / QUOTE</label>
                <textarea rows={3} required value={speakerForm.quote} onChange={(e) => setSpeakerForm({ ...speakerForm, quote: e.target.value })} className="form-textarea" placeholder="Quote or endorsement about Finlogue..." />
              </div>
              <div>
                <label className="form-label">IMAGE PATH / URL</label>
                <input type="text" value={speakerForm.image} onChange={(e) => setSpeakerForm({ ...speakerForm, image: e.target.value })} className="form-input" />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button type="button" onClick={() => setIsSpeakerModalOpen(false)} style={{ padding: "8px 16px", color: "var(--ink-muted)" }}>Cancel</button>
                <button type="submit" disabled={isSavingSpeaker} className="stamp-button stamp-button-primary" style={{ backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}>
                  {isSavingSpeaker ? "SAVING..." : "SAVE SPEAKER →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 3: ADD/EDIT TEAM MEMBER */}
      {isTeamModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsTeamModalOpen(false)} />
          <div className="lightbox-dialog" style={{ maxWidth: "540px", padding: "30px", backgroundColor: "var(--white-pure)", color: "var(--ink-title)" }}>
            <h3 className="font-display-serif" style={{ fontSize: "22px", marginBottom: "16px" }}>
              {editingMember ? "Edit Team Member" : "Add Leadership / Core Member"}
            </h3>
            <form onSubmit={handleSaveTeamMember} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="form-label">FULL NAME *</label>
                <input type="text" required value={teamForm.name} onChange={(e) => setTeamForm({ ...teamForm, name: e.target.value })} className="form-input" placeholder="e.g. Rohan Sharma" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">TIER / HIERARCHY</label>
                  <select value={teamForm.tier} onChange={(e) => setTeamForm({ ...teamForm, tier: e.target.value as any })} className="form-input">
                    <option value="coordinators">Coordinator (Steering Council)</option>
                    <option value="heads">Department Head</option>
                    <option value="coreTeam">Core Associate</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">ROLE TITLE</label>
                  <input type="text" required value={teamForm.role} onChange={(e) => setTeamForm({ ...teamForm, role: e.target.value })} className="form-input" placeholder="Coordinator / Head / Associate" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">DEPARTMENT / FOCUS</label>
                  <input type="text" value={teamForm.dept} onChange={(e) => setTeamForm({ ...teamForm, dept: e.target.value })} className="form-input" placeholder="Equity Research, Corporate Finance" />
                </div>
                <div>
                  <label className="form-label">BATCH</label>
                  <input type="text" value={teamForm.batch} onChange={(e) => setTeamForm({ ...teamForm, batch: e.target.value })} className="form-input" placeholder="Batch Y24 / Y25" />
                </div>
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">OFFICIAL EMAIL</label>
                  <input type="email" required value={teamForm.email} onChange={(e) => setTeamForm({ ...teamForm, email: e.target.value })} className="form-input" placeholder="24uec533@lnmiit.ac.in" />
                </div>
                <div>
                  <label className="form-label">LINKEDIN URL</label>
                  <input type="url" required value={teamForm.linkedin} onChange={(e) => setTeamForm({ ...teamForm, linkedin: e.target.value })} className="form-input" />
                </div>
              </div>
              <div>
                <label className="form-label">PORTRAIT IMAGE PATH</label>
                <input type="text" value={teamForm.image} onChange={(e) => setTeamForm({ ...teamForm, image: e.target.value })} className="form-input" />
              </div>
              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button type="button" onClick={() => setIsTeamModalOpen(false)} style={{ padding: "8px 16px", color: "var(--ink-muted)" }}>Cancel</button>
                <button type="submit" disabled={isSavingMember} className="stamp-button stamp-button-primary" style={{ backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}>
                  {isSavingMember ? "SAVING..." : "SAVE MEMBER →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD/EDIT GALLERY ARCHIVE */}
      {isGalleryModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsGalleryModalOpen(false)} />
          <div className="lightbox-dialog" style={{ maxWidth: "560px", padding: "30px", backgroundColor: "var(--white-pure)", color: "var(--ink-title)" }}>
            <h3 className="font-display-serif" style={{ fontSize: "22px", marginBottom: "16px" }}>
              {editingGalleryItem ? "Edit Photo Archive" : "Add New Capture to Visual Vault"}
            </h3>
            <form onSubmit={handleSaveGalleryItem} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="form-label">ARCHIVE TITLE *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.title}
                  onChange={(e) => setGalleryForm({ ...galleryForm, title: e.target.value })}
                  className="form-input"
                  placeholder="e.g. Grand Stage Winners — National Conclave"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">CATEGORY</label>
                  <select
                    value={galleryForm.category}
                    onChange={(e) => setGalleryForm({ ...galleryForm, category: e.target.value as any })}
                    className="form-input"
                  >
                    <option value="Summits">Summits</option>
                    <option value="Pitch Sessions">Pitch Sessions</option>
                    <option value="Keynotes">Keynotes</option>
                    <option value="Workshops">Workshops</option>
                    <option value="Community">Community</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">BADGE / TAG</label>
                  <input
                    type="text"
                    value={galleryForm.tag}
                    onChange={(e) => setGalleryForm({ ...galleryForm, tag: e.target.value })}
                    className="form-input"
                    placeholder="e.g. PODIUM FINISH"
                  />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">TIMELINE / DATE</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.date}
                    onChange={(e) => setGalleryForm({ ...galleryForm, date: e.target.value })}
                    className="form-input"
                    placeholder="SPRING 2026"
                  />
                </div>
                <div>
                  <label className="form-label">CAMPUS VENUE / LOCATION</label>
                  <input
                    type="text"
                    required
                    value={galleryForm.location}
                    onChange={(e) => setGalleryForm({ ...galleryForm, location: e.target.value })}
                    className="form-input"
                    placeholder="Main Auditorium, LNMIIT"
                  />
                </div>
              </div>

              <div>
                <label className="form-label">IMAGE ASSET PATH OR URL *</label>
                <input
                  type="text"
                  required
                  value={galleryForm.image}
                  onChange={(e) => setGalleryForm({ ...galleryForm, image: e.target.value })}
                  className="form-input"
                  placeholder="/assets/gallery/celebrating-success.jpg or https://..."
                />
                <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-muted)", marginTop: "4px", display: "block" }}>
                  Presets: /assets/gallery/celebrating-success.jpg · /assets/gallery/award-ceremony.jpg · /assets/gallery/pitch-session.jpg
                </span>
              </div>

              <div>
                <label className="form-label">CAPTION & DISPATCH SUMMARY *</label>
                <textarea
                  rows={3}
                  required
                  value={galleryForm.description}
                  onChange={(e) => setGalleryForm({ ...galleryForm, description: e.target.value })}
                  className="form-textarea"
                  placeholder="Official record and details describing the moment..."
                />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button
                  type="button"
                  onClick={() => setIsGalleryModalOpen(false)}
                  style={{ padding: "8px 16px", color: "var(--ink-muted)" }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSavingGallery}
                  className="stamp-button stamp-button-primary"
                  style={{ backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}
                >
                  {isSavingGallery ? "SAVING..." : "SAVE ARCHIVE →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
