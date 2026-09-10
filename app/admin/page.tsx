"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { CaseFile, events as defaultEventsData } from "@/content/events";
import { SpeakerItem } from "@/app/api/admin/speakers/route";
import { TeamMemberItem } from "@/app/api/admin/team/route";
import { gallery as defaultGalleryData, GalleryItem } from "@/content/gallery";
import { AttendeeItem, dynamicAttendeesCache } from "@/app/api/admin/attendees/route";

export default function AdminPortalPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passkeyInput, setPasskeyInput] = useState("");
  const [authError, setAuthError] = useState<string | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Main Section Navigation
  const [activeSection, setActiveSection] = useState<"events" | "speakers" | "team" | "gallery" | "attendees">("events");

  // --- 1. EVENTS STATE ---
  const [eventsList, setEventsList] = useState<CaseFile[]>(defaultEventsData.caseFiles);
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
  const [speakerCategoryFilter, setSpeakerCategoryFilter] = useState<string>("ALL");
  const [isSpeakerModalOpen, setIsSpeakerModalOpen] = useState(false);
  const [editingSpeaker, setEditingSpeaker] = useState<SpeakerItem | null>(null);
  const [isSavingSpeaker, setIsSavingSpeaker] = useState(false);

  const [speakerForm, setSpeakerForm] = useState({
    name: "",
    title: "",
    firm: "",
    category: "POTR Conclave Jury",
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

  const [teamErrors, setTeamErrors] = useState<Record<string, string>>({});

  const [teamForm, setTeamForm] = useState({
    name: "",
    tier: "coreTeam" as "coordinators" | "heads" | "coreTeam",
    dept: "",
    email: "",
    linkedin: "",
    image: "",
  });

  // --- 4. GALLERY / VISUAL VAULT STATE ---
  const [galleryList, setGalleryList] = useState<GalleryItem[]>(defaultGalleryData.items);
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

  // --- 5. ATTENDEES & REGISTRATIONS STATE ---
  const [attendeesList, setAttendeesList] = useState<AttendeeItem[]>(dynamicAttendeesCache);
  const [isLoadingAttendees, setIsLoadingAttendees] = useState(false);
  const [attendeeStatusFilter, setAttendeeStatusFilter] = useState<string>("ALL");
  const [attendeeEventFilter, setAttendeeEventFilter] = useState<string>("ALL");
  const [attendeeSearch, setAttendeeSearch] = useState("");
  const [isAttendeeModalOpen, setIsAttendeeModalOpen] = useState(false);
  const [editingAttendee, setEditingAttendee] = useState<AttendeeItem | null>(null);
  const [isSavingAttendee, setIsSavingAttendee] = useState(false);

  const [attendeeForm, setAttendeeForm] = useState({
    name: "",
    email: "",
    phone: "",
    institution: "The LNM Institute of Information Technology",
    event: "PITCH ON THE ROCKS (POTR)",
    status: "CONFIRMED" as AttendeeItem["status"],
    notes: "",
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
    fetchAttendees();
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
      const list = data.gallery || data.items;
      if (Array.isArray(list) && list.length > 0) {
        setGalleryList(list);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingGallery(false);
    }
  };

  const fetchAttendees = async () => {
    setIsLoadingAttendees(true);
    try {
      const res = await fetch("/api/admin/attendees");
      const data = await res.json();
      const list = data.attendees || data.items;
      if (Array.isArray(list) && list.length > 0) {
        setAttendeesList(list);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoadingAttendees(false);
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
        category: "POTR Conclave Jury",
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
        showToast(editingSpeaker ? "Speaker profile updated!" : "New keynote/mentor added!");
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
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const teamFileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (file: File) => {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      alert("Please upload a valid image file (JPG, PNG, WEBP).");
      return;
    }

    setIsUploadingImage(true);
    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (res.ok && data.success) {
        handleTeamFieldChange("image", data.fileName);
        showToast("Image uploaded to /assets/team/ successfully!");
      } else {
        alert(data.error || "Failed to upload image.");
      }
    } catch {
      alert("Network error uploading image.");
    } finally {
      setIsUploadingImage(false);
      setIsDragOver(false);
    }
  };

  const handleFileDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragOver(false);
  };

  const handleTeamFieldChange = (field: string, value: string) => {
    const cleanValue = field === "image" ? value.replace(/^\/assets\/team\//, "") : value;
    setTeamForm((prev) => ({ ...prev, [field]: cleanValue }));
    if (teamErrors[field] || teamErrors.general) {
      setTeamErrors((prev) => {
        const updated = { ...prev };
        delete updated[field];
        delete updated.general;
        return updated;
      });
    }
  };

  const handleOpenTeamModal = (member?: TeamMemberItem) => {
    setTeamErrors({});
    if (member) {
      setEditingMember(member);
      setTeamForm({
        name: member.name || "",
        tier: member.tier || "coreTeam",
        dept: member.dept || member.focus || "",
        email: member.email || "",
        linkedin: member.linkedin || "",
        image: (member.image || "").replace(/^\/assets\/team\//, ""),
      });
    } else {
      setEditingMember(null);
      setTeamForm({
        name: "",
        tier: "coreTeam",
        dept: "",
        email: "",
        linkedin: "",
        image: "",
      });
    }
    setIsTeamModalOpen(true);
  };

  const handleSaveTeamMember = async (e: React.FormEvent) => {
    e.preventDefault();

    const nameTrimmed = teamForm.name.trim();
    const deptTrimmed = teamForm.dept.trim();
    const emailTrimmed = teamForm.email.trim().toLowerCase();
    const linkedinTrimmed = teamForm.linkedin.trim();
    const imageTrimmed = teamForm.image.trim();

    const fieldErrors: Record<string, string> = {};

    // Specific validity checks for filled fields
    if (nameTrimmed && (!/^[a-zA-Z\s.'-]+$/.test(nameTrimmed) || nameTrimmed.length < 2)) {
      fieldErrors.name = "Invalid";
    }

    if (deptTrimmed && deptTrimmed.length < 2) {
      fieldErrors.dept = "Invalid";
    }

    if (emailTrimmed) {
      const lnmiitEmailRegex = /^[a-zA-Z0-9._%+-]+@([a-zA-Z0-9-]+\.)*lnmiit\.ac\.in$/i;
      if (!lnmiitEmailRegex.test(emailTrimmed)) {
        fieldErrors.email = "Invalid";
      }
    }

    if (linkedinTrimmed) {
      const isLinkedIn = /^(https?:\/\/)?(www\.)?linkedin\.com\/.*$/i.test(linkedinTrimmed);
      const isGenericUrl = /^https?:\/\/[^\s/$.?#].[^\s]*$/i.test(linkedinTrimmed);
      if (!isLinkedIn && !isGenericUrl) {
        fieldErrors.linkedin = "Invalid";
      }
    }

    if (imageTrimmed) {
      const isCleanFilename = /^[a-zA-Z0-9._/-]+$/.test(imageTrimmed);
      const isUrl = /^https?:\/\//.test(imageTrimmed);
      if (!isCleanFilename && !isUrl) {
        fieldErrors.image = "Invalid";
      }
    }

    const hasInvalidity = Object.keys(fieldErrors).length > 0;
    const hasEmptyField = !nameTrimmed || !emailTrimmed || !linkedinTrimmed || !imageTrimmed;

    const newErrors: Record<string, string> = { ...fieldErrors };

    // Only show "All sections are required" if no invalidity exists and at least one field is empty
    if (!hasInvalidity && hasEmptyField) {
      newErrors.general = "All sections are required";
    }

    if (Object.keys(newErrors).length > 0) {
      setTeamErrors(newErrors);
      return;
    }

    setIsSavingMember(true);

    const derivedRole =
      teamForm.tier === "coordinators"
        ? "Coordinator"
        : teamForm.tier === "heads"
        ? "Head"
        : "Associate";

    const finalImage =
      imageTrimmed.startsWith("http://") || imageTrimmed.startsWith("https://")
        ? imageTrimmed
        : imageTrimmed.startsWith("/")
        ? imageTrimmed
        : `/assets/team/${imageTrimmed}`;

    const payload: TeamMemberItem = {
      id: editingMember ? editingMember.id : `team-${Date.now()}`,
      name: nameTrimmed,
      role: derivedRole,
      tier: teamForm.tier,
      dept: deptTrimmed,
      batch: editingMember?.batch || "",
      focus: editingMember?.focus && editingMember.focus !== deptTrimmed ? editingMember.focus : "",
      email: emailTrimmed,
      linkedin: linkedinTrimmed,
      image: finalImage,
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

  // --- ATTENDEE ACTIONS ---
  const handleToggleAttendeeStatus = async (id: string, newStatus: AttendeeItem["status"]) => {
    setAttendeesList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );

    try {
      const res = await fetch("/api/admin/attendees", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id, status: newStatus }),
      });
      if (res.ok) {
        showToast(`Attendee status updated to ${newStatus}`);
      } else {
        fetchAttendees();
      }
    } catch {
      fetchAttendees();
    }
  };

  const handleOpenAttendeeModal = (att?: AttendeeItem) => {
    if (att) {
      setEditingAttendee(att);
      setAttendeeForm({
        name: att.name,
        email: att.email,
        phone: att.phone || "",
        institution: att.institution,
        event: att.event,
        status: att.status,
        notes: att.notes || "",
      });
    } else {
      setEditingAttendee(null);
      setAttendeeForm({
        name: "",
        email: "",
        phone: "",
        institution: "The LNM Institute of Information Technology",
        event: "PITCH ON THE ROCKS (POTR)",
        status: "CONFIRMED",
        notes: "",
      });
    }
    setIsAttendeeModalOpen(true);
  };

  const handleSaveAttendee = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSavingAttendee(true);

    const payload: AttendeeItem = {
      id: editingAttendee ? editingAttendee.id : `att-${Date.now()}`,
      token: editingAttendee ? editingAttendee.token : `REG-${Math.floor(100000 + Math.random() * 900000)}`,
      name: attendeeForm.name,
      email: attendeeForm.email,
      phone: attendeeForm.phone,
      institution: attendeeForm.institution || "Independent Participant",
      event: attendeeForm.event,
      status: attendeeForm.status,
      registeredAt: editingAttendee ? editingAttendee.registeredAt : new Date().toISOString().replace("T", " ").slice(0, 16),
      notes: attendeeForm.notes,
    };

    try {
      const res = await fetch("/api/admin/attendees", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ attendee: payload }),
      });
      const data = await res.json();
      if (res.ok && data.success) {
        showToast(editingAttendee ? "Attendee details updated!" : "Attendee registered successfully!");
        setIsAttendeeModalOpen(false);
        fetchAttendees();
      } else {
        alert(data.error || "Failed to save attendee.");
      }
    } catch {
      alert("Error saving attendee.");
    } finally {
      setIsSavingAttendee(false);
    }
  };

  const handleDeleteAttendee = async (id: string, name: string) => {
    if (!window.confirm(`Delete registration for "${name}"?`)) return;
    try {
      const res = await fetch(`/api/admin/attendees?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      if (res.ok) {
        showToast(`Registration removed.`);
        setAttendeesList((prev) => prev.filter((a) => a.id !== id));
      }
    } catch {
      alert("Error deleting attendee.");
    }
  };

  const handleExportAttendeesCSV = () => {
    const headers = ["Token", "Name", "Email", "Phone", "Institution", "Event", "Status", "Registered At", "Notes"];
    const rows = attendeesList.map((a) => [
      `"${a.token}"`,
      `"${a.name.replace(/"/g, '""')}"`,
      `"${a.email}"`,
      `"${a.phone || ""}"`,
      `"${a.institution.replace(/"/g, '""')}"`,
      `"${a.event.replace(/"/g, '""')}"`,
      `"${a.status}"`,
      `"${a.registeredAt}"`,
      `"${(a.notes || "").replace(/"/g, '""')}"`,
    ]);
    const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((r) => r.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Finlogue_Attendees_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showToast("Attendee CSV Exported!");
  };

  // --- FILTERS ---
  const filteredEvents = eventsList.filter((ev) => {
    const matchesFilter = eventFilterStatus === "ALL" ? true : ev.status === eventFilterStatus;
    const matchesQuery =
      ev.title.toLowerCase().includes(eventSearch.toLowerCase()) ||
      ev.category.toLowerCase().includes(eventSearch.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  const filteredSpeakers = speakersList.filter((s) => {
    if (speakerCategoryFilter === "ALL") return true;
    return s.category.toLowerCase().includes(speakerCategoryFilter.toLowerCase());
  });

  const filteredTeam = teamList.filter((m) => {
    if (teamTierFilter === "ALL") return true;
    return m.tier === teamTierFilter;
  });

  const filteredGallery = galleryList.filter((g) => {
    if (galleryCategoryFilter === "ALL") return true;
    return g.category.toLowerCase() === galleryCategoryFilter.toLowerCase();
  });

  const filteredAttendees = attendeesList.filter((a) => {
    const matchesStatus = attendeeStatusFilter === "ALL" ? true : a.status === attendeeStatusFilter;
    const matchesEvent = attendeeEventFilter === "ALL" ? true : a.event.toLowerCase().includes(attendeeEventFilter.toLowerCase());
    const matchesQuery =
      a.name.toLowerCase().includes(attendeeSearch.toLowerCase()) ||
      a.email.toLowerCase().includes(attendeeSearch.toLowerCase()) ||
      a.token.toLowerCase().includes(attendeeSearch.toLowerCase()) ||
      a.institution.toLowerCase().includes(attendeeSearch.toLowerCase());
    return matchesStatus && matchesEvent && matchesQuery;
  });

  const liveCount = eventsList.filter((e) => e.status === "ACTIVE").length;
  const upcomingCount = eventsList.filter((e) => e.status === "UPCOMING").length;
  const closedCount = eventsList.filter((e) => e.status === "CLOSED").length;
  const potrEvent = eventsList.find((e) => e.id === "potr");

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
            Access the institutional control desk to manage live events, POTR conclave, keynote speakers, attendee rosters, and Google Sheets synchronization.
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
                } else if (activeSection === "gallery") {
                  handleOpenGalleryModal();
                } else {
                  handleOpenAttendeeModal();
                }
              }}
              className="stamp-button stamp-button-primary"
              style={{ fontSize: "12px", padding: "8px 18px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
            >
              + ADD NEW {activeSection === "events" ? "EVENT" : activeSection === "speakers" ? "SPEAKER" : activeSection === "team" ? "MEMBER" : activeSection === "gallery" ? "PHOTO ARCHIVE" : "ATTENDEE"}
            </button>
            <button type="button" onClick={() => setIsAuthenticated(false)} style={{ fontSize: "12px", color: "var(--platinum-muted)", marginLeft: "8px" }}>
              Sign Out
            </button>
          </div>
        </div>
      </header>

      {/* Main Section Navigation Strip (5 Tabs) */}
      <section style={{ backgroundColor: "var(--white-pure)", borderBottom: "1px solid var(--white-border)", padding: "16px 0" }}>
        <div className="container" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px" }}>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            <button
              type="button"
              onClick={() => setActiveSection("events")}
              className="stamp-button"
              style={{
                fontSize: "12.5px",
                padding: "8px 16px",
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
                fontSize: "12.5px",
                padding: "8px 16px",
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
              onClick={() => setActiveSection("attendees")}
              className="stamp-button"
              style={{
                fontSize: "12.5px",
                padding: "8px 16px",
                backgroundColor: activeSection === "attendees" ? "var(--navy-hero)" : "var(--white-pure)",
                color: activeSection === "attendees" ? "#FFFFFF" : "var(--ink-title)",
                borderColor: activeSection === "attendees" ? "var(--navy-hero)" : "var(--white-border)",
                fontWeight: 700,
              }}
            >
              📋 ATTENDEES & REGISTRATIONS ({attendeesList.length})
            </button>

            <button
              type="button"
              onClick={() => setActiveSection("team")}
              className="stamp-button"
              style={{
                fontSize: "12.5px",
                padding: "8px 16px",
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
                fontSize: "12.5px",
                padding: "8px 16px",
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

      {/* ================= SECTION 1: EVENTS & POTR MANAGER ================= */}
      {activeSection === "events" && (
        <section className="container" style={{ marginTop: "32px" }}>
          {/* POTR Flagship Conclave Dedicated Spotlight Banner */}
          {potrEvent && (
            <div
              style={{
                backgroundColor: "var(--navy-hero)",
                border: "2px solid var(--gold-oxford)",
                padding: "26px 30px",
                color: "#FFFFFF",
                marginBottom: "32px",
                boxShadow: "0 12px 32px rgba(7, 13, 30, 0.25)",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
                gap: "24px",
              }}
            >
              <div style={{ flex: 1, minWidth: "300px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                  <span
                    style={{
                      backgroundColor: "var(--gold-oxford)",
                      color: "var(--navy-deep)",
                      fontSize: "10.5px",
                      padding: "3px 10px",
                      fontWeight: 800,
                      fontFamily: "var(--font-mono)",
                      letterSpacing: "0.1em",
                      borderRadius: "2px",
                    }}
                  >
                    ★ FLAGSHIP ANNUAL VENTURE CONCLAVE
                  </span>
                  <span
                    style={{
                      fontSize: "10.5px",
                      padding: "3px 8px",
                      backgroundColor: potrEvent.status === "ACTIVE" ? "rgba(21, 128, 61, 0.3)" : "rgba(197, 168, 128, 0.2)",
                      color: potrEvent.status === "ACTIVE" ? "var(--emerald-bright)" : "var(--gold-oxford)",
                      fontFamily: "var(--font-mono)",
                      border: "1px solid currentColor",
                      borderRadius: "2px",
                    }}
                  >
                    ● {potrEvent.status === "ACTIVE" ? "LIVE ON PORTAL" : potrEvent.status}
                  </span>
                </div>

                <h2 className="font-display-serif" style={{ fontSize: "26px", margin: "0 0 8px", color: "#FFFFFF" }}>
                  PITCH ON THE ROCKS (POTR)
                </h2>
                <p style={{ fontSize: "13.5px", color: "var(--platinum-muted)", lineHeight: 1.55, maxWidth: "720px", margin: "0 0 16px" }}>
                  {potrEvent.description}
                </p>

                <div style={{ display: "flex", gap: "20px", flexWrap: "wrap", fontSize: "12px", fontFamily: "var(--font-mono)", color: "var(--gold-oxford)" }}>
                  <span>🏆 {potrEvent.prizeOrOutput}</span>
                  <span>📅 {potrEvent.date}</span>
                  <span>👥 {potrEvent.eligibility}</span>
                </div>
              </div>

              {/* Quick Actions for POTR */}
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", alignItems: "flex-end" }}>
                <div style={{ display: "inline-flex", border: "1px solid rgba(255,255,255,0.2)", borderRadius: "4px", overflow: "hidden" }}>
                  <button
                    type="button"
                    onClick={() => handleToggleEventStatus("potr", "ACTIVE")}
                    style={{ padding: "6px 14px", fontSize: "11px", fontFamily: "var(--font-mono)", backgroundColor: potrEvent.status === "ACTIVE" ? "var(--emerald)" : "transparent", color: "#FFFFFF" }}
                  >
                    ● LIVE
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleEventStatus("potr", "UPCOMING")}
                    style={{ padding: "6px 14px", fontSize: "11px", fontFamily: "var(--font-mono)", backgroundColor: potrEvent.status === "UPCOMING" ? "var(--gold-oxford)" : "transparent", color: potrEvent.status === "UPCOMING" ? "var(--navy-deep)" : "#FFFFFF" }}
                  >
                    ● UPCOMING
                  </button>
                  <button
                    type="button"
                    onClick={() => handleToggleEventStatus("potr", "CLOSED")}
                    style={{ padding: "6px 14px", fontSize: "11px", fontFamily: "var(--font-mono)", backgroundColor: potrEvent.status === "CLOSED" ? "var(--burgundy-crest)" : "transparent", color: "#FFFFFF" }}
                  >
                    ● ARCHIVED
                  </button>
                </div>

                <div style={{ display: "flex", gap: "8px" }}>
                  <button
                    type="button"
                    onClick={() => {
                      setEditingEvent(potrEvent);
                      setEventForm({
                        title: potrEvent.title,
                        category: potrEvent.category,
                        status: potrEvent.status,
                        date: potrEvent.date,
                        prizeOrOutput: potrEvent.prizeOrOutput,
                        eligibility: potrEvent.eligibility,
                        description: potrEvent.description,
                      });
                      setIsEventModalOpen(true);
                    }}
                    className="stamp-button"
                    style={{ fontSize: "11.5px", padding: "6px 14px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", borderColor: "var(--gold-oxford)", fontWeight: 700 }}
                  >
                    ✎ Edit POTR Dossier
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveSection("attendees");
                      setAttendeeEventFilter("POTR");
                    }}
                    className="stamp-button"
                    style={{ fontSize: "11.5px", padding: "6px 12px", borderColor: "rgba(255,255,255,0.3)", color: "#FFFFFF" }}
                  >
                    View POTR Attendees →
                  </button>
                </div>
              </div>
            </div>
          )}

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
              const isPOTR = ev.id === "potr";

              return (
                <div
                  key={ev.id}
                  style={{
                    backgroundColor: "var(--white-pure)",
                    border: isPOTR ? "2px solid var(--gold-oxford)" : "1px solid var(--white-border)",
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
                      {isPOTR && (
                        <span style={{ fontSize: "10px", padding: "2px 8px", backgroundColor: "var(--gold-oxford)", color: "var(--navy-deep)", fontWeight: 800, textTransform: "uppercase" }}>
                          ★ FLAGSHIP
                        </span>
                      )}
                      <span className="font-metadata-mono" style={{ fontSize: "10.5px", color: "var(--ink-muted)" }}>{ev.fileNumber || "LEAGUE"}</span>
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

      {/* ================= SECTION 2: SPEAKERS & POTR JURY ================= */}
      {activeSection === "speakers" && (
        <section className="container" style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <h2 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", margin: 0 }}>
                Keynote Speakers & Conclave Mentors ({speakersList.length})
              </h2>
              <p style={{ fontSize: "13px", color: "var(--ink-muted)", marginTop: "4px" }}>
                Manage all profiles appearing on the homepage Inspirational Speakers carousel and POTR Conclave Jury. Click &ldquo;✎ Edit&rdquo; on any card to modify their details.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center", flexWrap: "wrap" }}>
              <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
                {["ALL", "POTR Conclave Jury", "Venture Capital", "Private Equity", "Keynote"].map((c) => (
                  <button
                    key={c}
                    type="button"
                    onClick={() => setSpeakerCategoryFilter(c)}
                    className="stamp-button"
                    style={{
                      fontSize: "11px",
                      padding: "6px 12px",
                      backgroundColor: speakerCategoryFilter === c ? "var(--navy-hero)" : "var(--white-pure)",
                      color: speakerCategoryFilter === c ? "#FFFFFF" : "var(--ink-title)",
                      borderColor: speakerCategoryFilter === c ? "var(--navy-hero)" : "var(--white-border)",
                    }}
                  >
                    {c.toUpperCase()}
                  </button>
                ))}
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
          </div>

          <div className="grid-3" style={{ gap: "20px" }}>
            {filteredSpeakers.map((sp) => (
              <div
                key={sp.id || sp.name}
                style={{
                  backgroundColor: "var(--white-pure)",
                  border: sp.category === "POTR Conclave Jury" ? "1.5px solid var(--gold-oxford)" : "1px solid var(--white-border)",
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
                      <span className="font-metadata-mono" style={{ fontSize: "10px", color: sp.category === "POTR Conclave Jury" ? "var(--gold-oxford)" : "var(--burgundy-crest)", textTransform: "uppercase", fontWeight: 700 }}>
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
                    ✎ Edit Speaker
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

      {/* ================= SECTION 3: ATTENDEES & REGISTRATIONS ================= */}
      {activeSection === "attendees" && (
        <section className="container" style={{ marginTop: "32px" }}>
          {/* Header & CSV Export */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "24px" }}>
            <div>
              <h2 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", margin: 0 }}>
                Attendee Registrations & Delegations ({attendeesList.length})
              </h2>
              <p style={{ fontSize: "13px", color: "var(--ink-muted)", marginTop: "4px" }}>
                Live intake from the portal registration desk and POTR founder submissions. Edit status, add remarks, or export for campus security check-in.
              </p>
            </div>

            <div style={{ display: "flex", gap: "10px", flexWrap: "wrap" }}>
              <button
                type="button"
                onClick={handleExportAttendeesCSV}
                className="stamp-button"
                style={{ fontSize: "12px", padding: "8px 16px", borderColor: "var(--emerald)", color: "var(--emerald)", fontWeight: 700 }}
              >
                📥 EXPORT CSV ROSTER
              </button>
              <button
                type="button"
                onClick={() => handleOpenAttendeeModal()}
                className="stamp-button stamp-button-primary"
                style={{ fontSize: "12px", backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}
              >
                + ADD ATTENDEE RECORD
              </button>
            </div>
          </div>

          {/* Filters Bar */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "20px" }}>
            <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
              {["ALL", "CONFIRMED", "CHECKED-IN", "WAITLISTED", "REJECTED"].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setAttendeeStatusFilter(s)}
                  className="stamp-button"
                  style={{
                    fontSize: "11px",
                    padding: "6px 12px",
                    backgroundColor: attendeeStatusFilter === s ? "var(--navy-hero)" : "var(--white-pure)",
                    color: attendeeStatusFilter === s ? "#FFFFFF" : "var(--ink-title)",
                    borderColor: attendeeStatusFilter === s ? "var(--navy-hero)" : "var(--white-border)",
                  }}
                >
                  {s}
                </button>
              ))}
            </div>

            <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>
              <select
                value={attendeeEventFilter}
                onChange={(e) => setAttendeeEventFilter(e.target.value)}
                className="form-input"
                style={{ fontSize: "12px", padding: "6px 12px", maxWidth: "220px" }}
              >
                <option value="ALL">All Events & Conclaves</option>
                <option value="POTR">Pitch on the Rocks (POTR)</option>
                <option value="CASE CRACKERS">National Case Crackers</option>
                <option value="VALUATION LAB">Valuation & Equity Research</option>
                <option value="M&A">M&A Boardroom Simulation</option>
                <option value="CONSULTANTS">Consultants Got Talent</option>
              </select>

              <input
                type="text"
                placeholder="Search name, email, token..."
                value={attendeeSearch}
                onChange={(e) => setAttendeeSearch(e.target.value)}
                className="form-input"
                style={{ maxWidth: "240px", padding: "6px 12px", fontSize: "12px" }}
              />
            </div>
          </div>

          {/* Attendees Table */}
          <div style={{ backgroundColor: "var(--white-pure)", border: "1px solid var(--white-border)", boxShadow: "var(--card-shadow)", overflowX: "auto" }}>
            <table style={{ width: "100%", borderCollapse: "collapse", textAlign: "left", fontSize: "13px" }}>
              <thead>
                <tr style={{ backgroundColor: "var(--navy-hero)", color: "#FFFFFF", fontFamily: "var(--font-mono)", fontSize: "11px", textTransform: "uppercase" }}>
                  <th style={{ padding: "14px 16px" }}>Token</th>
                  <th style={{ padding: "14px 16px" }}>Participant Name</th>
                  <th style={{ padding: "14px 16px" }}>Contact Info</th>
                  <th style={{ padding: "14px 16px" }}>Institution</th>
                  <th style={{ padding: "14px 16px" }}>Event Registered</th>
                  <th style={{ padding: "14px 16px" }}>Status</th>
                  <th style={{ padding: "14px 16px", textAlign: "right" }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredAttendees.map((att, idx) => {
                  const isCheckedIn = att.status === "CHECKED-IN";
                  const isConfirmed = att.status === "CONFIRMED";
                  const isWaitlisted = att.status === "WAITLISTED";

                  return (
                    <tr
                      key={att.id || att.token}
                      style={{
                        borderBottom: "1px solid var(--white-border)",
                        backgroundColor: idx % 2 === 0 ? "var(--white-pure)" : "var(--white-alabaster)",
                      }}
                    >
                      <td style={{ padding: "14px 16px", fontFamily: "var(--font-mono)", color: "var(--gold-oxford)", fontWeight: 700 }}>
                        {att.token}
                      </td>
                      <td style={{ padding: "14px 16px", fontWeight: 600, color: "var(--ink-title)" }}>
                        {att.name}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ color: "var(--ink-body)" }}>{att.email}</div>
                        {att.phone && <div style={{ fontSize: "11.5px", color: "var(--ink-muted)", fontFamily: "var(--font-mono)" }}>{att.phone}</div>}
                      </td>
                      <td style={{ padding: "14px 16px", color: "var(--ink-muted)", maxWidth: "220px" }}>
                        {att.institution}
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <span style={{ fontSize: "11px", padding: "2px 8px", backgroundColor: "rgba(10, 19, 41, 0.06)", border: "1px solid var(--white-border)", borderRadius: "4px", fontWeight: 600 }}>
                          {att.event}
                        </span>
                      </td>
                      <td style={{ padding: "14px 16px" }}>
                        <div style={{ display: "inline-flex", gap: "4px", alignItems: "center" }}>
                          <span
                            style={{
                              fontSize: "10.5px",
                              fontFamily: "var(--font-mono)",
                              padding: "2px 8px",
                              borderRadius: "4px",
                              fontWeight: 700,
                              backgroundColor: isCheckedIn ? "rgba(21, 128, 61, 0.15)" : isConfirmed ? "rgba(10, 19, 41, 0.1)" : isWaitlisted ? "rgba(197, 168, 128, 0.15)" : "rgba(114, 47, 55, 0.15)",
                              color: isCheckedIn ? "var(--emerald-bright)" : isConfirmed ? "var(--navy-hero)" : isWaitlisted ? "var(--gold-oxford)" : "var(--burgundy-crest)",
                            }}
                          >
                            ● {att.status}
                          </span>
                        </div>
                      </td>
                      <td style={{ padding: "14px 16px", textAlign: "right" }}>
                        <div style={{ display: "inline-flex", gap: "6px", alignItems: "center" }}>
                          {/* Quick Check-in Toggle */}
                          <button
                            type="button"
                            title="Mark as Checked-in"
                            onClick={() => handleToggleAttendeeStatus(att.id, isCheckedIn ? "CONFIRMED" : "CHECKED-IN")}
                            style={{
                              padding: "4px 8px",
                              fontSize: "11px",
                              backgroundColor: isCheckedIn ? "var(--emerald)" : "transparent",
                              color: isCheckedIn ? "#FFFFFF" : "var(--emerald)",
                              border: "1px solid var(--emerald)",
                              cursor: "pointer",
                            }}
                          >
                            {isCheckedIn ? "✓ In" : "Check-in"}
                          </button>

                          {/* Full Edit Modal */}
                          <button
                            type="button"
                            onClick={() => handleOpenAttendeeModal(att)}
                            className="stamp-button"
                            style={{ fontSize: "11px", padding: "4px 8px", borderColor: "var(--navy-hero)", color: "var(--navy-hero)" }}
                          >
                            ✎ Edit
                          </button>

                          {/* Delete */}
                          <button
                            type="button"
                            onClick={() => handleDeleteAttendee(att.id, att.name)}
                            className="stamp-button"
                            style={{ fontSize: "11px", padding: "4px 6px", borderColor: "var(--burgundy-border)", color: "var(--burgundy-text)" }}
                          >
                            ✕
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

      {/* ================= SECTION 4: LEADERSHIP & TEAM ================= */}
      {activeSection === "team" && (
        <section className="container" style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <h2 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", margin: 0 }}>
                Organizational Hierarchy & Team Roster ({teamList.length})
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

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(240px, 1fr))",
              gap: "14px",
            }}
          >
            {filteredTeam.map((m) => {
              const tierLabel =
                m.tier === "coordinators"
                  ? "COORDINATOR"
                  : m.tier === "heads"
                  ? "DEPARTMENT HEAD"
                  : "CORE ASSOCIATE";

              const tierBadgeStyle =
                m.tier === "coordinators"
                  ? { color: "var(--gold-oxford)", backgroundColor: "rgba(197, 168, 128, 0.15)", border: "1px solid rgba(197, 168, 128, 0.3)" }
                  : m.tier === "heads"
                  ? { color: "var(--burgundy-crest)", backgroundColor: "rgba(114, 47, 55, 0.08)", border: "1px solid rgba(114, 47, 55, 0.2)" }
                  : { color: "var(--navy-hero)", backgroundColor: "rgba(10, 19, 41, 0.06)", border: "1px solid rgba(10, 19, 41, 0.15)" };

              return (
                <div
                  key={m.id || m.name}
                  style={{
                    backgroundColor: "var(--white-pure)",
                    border: "1px solid var(--white-border)",
                    boxShadow: "0 1px 4px rgba(7, 13, 30, 0.04)",
                    borderRadius: "8px",
                    padding: "14px 16px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    gap: "10px",
                  }}
                >
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "8px" }}>
                      <div
                        style={{
                          width: "38px",
                          height: "38px",
                          borderRadius: "50%",
                          overflow: "hidden",
                          position: "relative",
                          backgroundColor: "var(--navy-deep)",
                          flexShrink: 0,
                          border: "1.5px solid var(--white-border-strong)",
                        }}
                      >
                        <Image src={m.image || "/assets/team/aditya-tiwari.jpg"} alt={m.name} fill sizes="38px" style={{ objectFit: "cover" }} />
                      </div>
                      <div style={{ minWidth: 0, flex: 1 }}>
                        <h4
                          className="font-display-serif"
                          style={{
                            fontSize: "16px",
                            color: "var(--ink-title)",
                            margin: 0,
                            lineHeight: 1.2,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {m.name}
                        </h4>
                      </div>
                    </div>

                    <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                      <div>
                        <span
                          className="font-metadata-mono"
                          style={{
                            fontSize: "9.5px",
                            fontWeight: 700,
                            letterSpacing: "0.06em",
                            padding: "2px 6px",
                            borderRadius: "4px",
                            display: "inline-block",
                            ...tierBadgeStyle,
                          }}
                        >
                          {tierLabel}
                        </span>
                      </div>

                      {(m.dept || m.role) && (
                        <p
                          style={{
                            fontSize: "12px",
                            color: "var(--ink-body)",
                            margin: "2px 0 0",
                            fontWeight: 600,
                            lineHeight: 1.3,
                          }}
                        >
                          {m.dept || m.role}
                        </p>
                      )}
                    </div>
                  </div>

                  <div style={{ display: "flex", justifyContent: "flex-end", gap: "6px", borderTop: "1px solid var(--white-border)", paddingTop: "8px" }}>
                    <button
                      type="button"
                      onClick={() => handleOpenTeamModal(m)}
                      className="stamp-button"
                      style={{ fontSize: "10px", padding: "3px 8px", borderColor: "var(--navy-hero)", color: "var(--navy-hero)" }}
                    >
                      ✎ Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDeleteTeamMember(m.id || m.name, m.name)}
                      className="stamp-button"
                      style={{ fontSize: "10px", padding: "3px 8px", borderColor: "var(--burgundy-border)", color: "var(--burgundy-text)" }}
                    >
                      ✕ Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* ================= SECTION 5: VISUAL VAULT & GALLERY ================= */}
      {activeSection === "gallery" && (
        <section className="container" style={{ marginTop: "32px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "16px", marginBottom: "20px" }}>
            <div>
              <h2 className="font-display-serif" style={{ fontSize: "24px", color: "var(--ink-title)", margin: 0 }}>
                Visual Vault & Photo Archives ({galleryList.length})
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

      {/* MODAL 1: ADD/EDIT EVENT (Includes POTR) */}
      {isEventModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsEventModalOpen(false)} />
          <div className="lightbox-dialog" style={{ maxWidth: "580px", padding: "30px", backgroundColor: "var(--white-pure)", color: "var(--ink-title)" }}>
            <h3 className="font-display-serif" style={{ fontSize: "22px", marginBottom: "16px" }}>
              {editingEvent ? `Edit Event — ${editingEvent.title}` : "Add New Event"}
            </h3>
            <form onSubmit={handleSaveEvent} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="form-label">EVENT TITLE *</label>
                <input type="text" required value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} className="form-input" placeholder="e.g. PITCH ON THE ROCKS (POTR)" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">CATEGORY</label>
                  <select value={eventForm.category} onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })} className="form-input">
                    <option value="Venture">Venture & Conclave</option>
                    <option value="Consulting">Consulting</option>
                    <option value="Finance">Finance</option>
                    <option value="Strategy">Strategy</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">STATUS</label>
                  <select value={eventForm.status} onChange={(e) => setEventForm({ ...eventForm, status: e.target.value as any })} className="form-input">
                    <option value="ACTIVE">ACTIVE (Live on Portal)</option>
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
                  <label className="form-label">PRIZE / DILIGENCE POOL</label>
                  <input type="text" value={eventForm.prizeOrOutput} onChange={(e) => setEventForm({ ...eventForm, prizeOrOutput: e.target.value })} className="form-input" placeholder="₹25CR+ & Mentorship" />
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

      {/* MODAL 2: ADD/EDIT SPEAKER (Includes POTR Jury & Mentors) */}
      {isSpeakerModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsSpeakerModalOpen(false)} />
          <div className="lightbox-dialog" style={{ maxWidth: "540px", padding: "30px", backgroundColor: "var(--white-pure)", color: "var(--ink-title)" }}>
            <h3 className="font-display-serif" style={{ fontSize: "22px", marginBottom: "16px" }}>
              {editingSpeaker ? `Edit Speaker — ${editingSpeaker.name}` : "Add Keynote Speaker / Conclave Mentor"}
            </h3>
            <form onSubmit={handleSaveSpeaker} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="form-label">FULL NAME *</label>
                <input type="text" required value={speakerForm.name} onChange={(e) => setSpeakerForm({ ...speakerForm, name: e.target.value })} className="form-input" placeholder="e.g. Ninad Karpe / Radhika Iyer" />
              </div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">ROLE / DESIGNATION</label>
                  <input type="text" required value={speakerForm.title} onChange={(e) => setSpeakerForm({ ...speakerForm, title: e.target.value })} className="form-input" placeholder="Partner / Keynote Jury" />
                </div>
                <div>
                  <label className="form-label">FIRM / FUND / SPECIALTY</label>
                  <input type="text" required value={speakerForm.firm} onChange={(e) => setSpeakerForm({ ...speakerForm, firm: e.target.value })} className="form-input" placeholder="100X.VC / Goldman Sachs" />
                </div>
              </div>
              <div>
                <label className="form-label">CATEGORY / TRACK</label>
                <select value={speakerForm.category} onChange={(e) => setSpeakerForm({ ...speakerForm, category: e.target.value })} className="form-input">
                  <option value="POTR Conclave Jury">POTR Conclave Jury (Flagship Investor Panel)</option>
                  <option value="Venture Capital">Venture Capital & Angel Syndicate</option>
                  <option value="Private Equity">Private Equity & M&A</option>
                  <option value="Keynote">Annual Keynote Speaker</option>
                  <option value="Strategy & Leadership">Strategy & Leadership</option>
                </select>
              </div>
              <div>
                <label className="form-label">ENDORSEMENT / QUOTE</label>
                <textarea rows={3} required value={speakerForm.quote} onChange={(e) => setSpeakerForm({ ...speakerForm, quote: e.target.value })} className="form-textarea" placeholder="Official quote or jury endorsement..." />
              </div>
              <div>
                <label className="form-label">PORTRAIT IMAGE PATH / URL</label>
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

      {/* MODAL 3: ADD/EDIT ATTENDEE & REGISTRATION */}
      {isAttendeeModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsAttendeeModalOpen(false)} />
          <div className="lightbox-dialog" style={{ maxWidth: "560px", padding: "30px", backgroundColor: "var(--white-pure)", color: "var(--ink-title)" }}>
            <h3 className="font-display-serif" style={{ fontSize: "22px", marginBottom: "16px" }}>
              {editingAttendee ? `Edit Registration — ${editingAttendee.token}` : "Add Attendee / Manual Registration"}
            </h3>
            <form onSubmit={handleSaveAttendee} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">PARTICIPANT NAME *</label>
                  <input type="text" required value={attendeeForm.name} onChange={(e) => setAttendeeForm({ ...attendeeForm, name: e.target.value })} className="form-input" placeholder="e.g. Aarav Khandelwal" />
                </div>
                <div>
                  <label className="form-label">EMAIL ADDRESS *</label>
                  <input type="email" required value={attendeeForm.email} onChange={(e) => setAttendeeForm({ ...attendeeForm, email: e.target.value })} className="form-input" placeholder="name@domain.edu" />
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">PHONE NUMBER</label>
                  <input type="text" value={attendeeForm.phone} onChange={(e) => setAttendeeForm({ ...attendeeForm, phone: e.target.value })} className="form-input" placeholder="+91 98..." />
                </div>
                <div>
                  <label className="form-label">STATUS</label>
                  <select value={attendeeForm.status} onChange={(e) => setAttendeeForm({ ...attendeeForm, status: e.target.value as any })} className="form-input">
                    <option value="CONFIRMED">CONFIRMED (Approved)</option>
                    <option value="CHECKED-IN">CHECKED-IN (On Campus)</option>
                    <option value="WAITLISTED">WAITLISTED</option>
                    <option value="REJECTED">REJECTED / WITHDRAWN</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="form-label">COLLEGE / INSTITUTION *</label>
                <input type="text" required value={attendeeForm.institution} onChange={(e) => setAttendeeForm({ ...attendeeForm, institution: e.target.value })} className="form-input" placeholder="e.g. The LNM Institute of Information Technology" />
              </div>

              <div>
                <label className="form-label">EVENT REGISTERED FOR</label>
                <select value={attendeeForm.event} onChange={(e) => setAttendeeForm({ ...attendeeForm, event: e.target.value })} className="form-input">
                  <option value="PITCH ON THE ROCKS (POTR)">PITCH ON THE ROCKS (POTR) — Flagship Conclave</option>
                  <option value="NATIONAL CASE CRACKERS">NATIONAL CASE CRACKERS — Consulting League</option>
                  <option value="VALUATION & EQUITY RESEARCH LAB">VALUATION & EQUITY RESEARCH LAB</option>
                  <option value="M&A BOARDROOM SIMULATION">M&A BOARDROOM SIMULATION</option>
                  <option value="CONSULTANTS GOT TALENT">CONSULTANTS GOT TALENT</option>
                </select>
              </div>

              <div>
                <label className="form-label">REMARKS / FOUNDER STATEMENT / NOTES</label>
                <textarea rows={3} value={attendeeForm.notes} onChange={(e) => setAttendeeForm({ ...attendeeForm, notes: e.target.value })} className="form-textarea" placeholder="e.g. Pitch deck reviewed; assigned Syndicate 03..." />
              </div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button type="button" onClick={() => setIsAttendeeModalOpen(false)} style={{ padding: "8px 16px", color: "var(--ink-muted)" }}>Cancel</button>
                <button type="submit" disabled={isSavingAttendee} className="stamp-button stamp-button-primary" style={{ backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}>
                  {isSavingAttendee ? "SAVING..." : "SAVE ATTENDEE →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 4: ADD/EDIT TEAM MEMBER */}
      {isTeamModalOpen && (
        <div className="lightbox-overlay" role="dialog" aria-modal="true">
          <div style={{ position: "fixed", inset: 0 }} onClick={() => setIsTeamModalOpen(false)} />
          <div className="lightbox-dialog" style={{ maxWidth: "540px", padding: "30px", backgroundColor: "var(--white-pure)", color: "var(--ink-title)" }}>
            <h3 className="font-display-serif" style={{ fontSize: "22px", marginBottom: "16px" }}>
              {editingMember ? "Edit Team Member" : "Add Leadership / Core Member"}
            </h3>
            <form noValidate onSubmit={handleSaveTeamMember} style={{ display: "flex", flexDirection: "column", gap: "14px" }}>
              <div>
                <label className="form-label">FULL NAME</label>
                <input
                  type="text"
                  value={teamForm.name}
                  onChange={(e) => handleTeamFieldChange("name", e.target.value)}
                  className="form-input"
                  style={{
                    border: teamErrors.name ? "1px solid #EF4444" : undefined,
                  }}
                />
                {teamErrors.name && (
                  <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "5px", display: "block", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                    {teamErrors.name}
                  </span>
                )}
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">HIERARCHY</label>
                  <select
                    value={teamForm.tier}
                    onChange={(e) => handleTeamFieldChange("tier", e.target.value)}
                    className="form-input"
                  >
                    <option value="coordinators">Coordinator</option>
                    <option value="heads">Department Head</option>
                    <option value="coreTeam">Core Associate</option>
                  </select>
                </div>
                <div>
                  <label className="form-label">ROLE (OPTIONAL)</label>
                  <input
                    type="text"
                    value={teamForm.dept}
                    onChange={(e) => handleTeamFieldChange("dept", e.target.value)}
                    className="form-input"
                    style={{
                      border: teamErrors.dept ? "1px solid #EF4444" : undefined,
                    }}
                  />
                  {teamErrors.dept && (
                    <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "5px", display: "block", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                      {teamErrors.dept}
                    </span>
                  )}
                </div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px" }}>
                <div>
                  <label className="form-label">OFFICIAL EMAIL</label>
                  <input
                    type="email"
                    value={teamForm.email}
                    onChange={(e) => handleTeamFieldChange("email", e.target.value)}
                    className="form-input"
                    style={{
                      border: teamErrors.email ? "1px solid #EF4444" : undefined,
                    }}
                  />
                  {teamErrors.email && (
                    <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "5px", display: "block", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                      {teamErrors.email}
                    </span>
                  )}
                </div>
                <div>
                  <label className="form-label">LINKEDIN URL</label>
                  <input
                    type="text"
                    value={teamForm.linkedin}
                    onChange={(e) => handleTeamFieldChange("linkedin", e.target.value)}
                    className="form-input"
                    style={{
                      border: teamErrors.linkedin ? "1px solid #EF4444" : undefined,
                    }}
                  />
                  {teamErrors.linkedin && (
                    <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "5px", display: "block", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                      {teamErrors.linkedin}
                    </span>
                  )}
                </div>
              </div>

              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                  <label className="form-label" style={{ margin: 0 }}>PORTRAIT IMAGE</label>
                  {teamForm.image && (
                    <span style={{ fontSize: "11px", color: "var(--emerald)", fontWeight: 600 }}>
                      ✓ Uploaded / Selected
                    </span>
                  )}
                </div>

                {/* Drag & Drop / Browse Upload Dropzone */}
                <div
                  onDrop={handleFileDrop}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onClick={() => teamFileInputRef.current?.click()}
                  style={{
                    border: isDragOver
                      ? "2px dashed var(--gold-oxford)"
                      : teamErrors.image
                      ? "2px dashed #EF4444"
                      : "2px dashed #CBD5E1",
                    borderRadius: "8px",
                    padding: "14px 16px",
                    textAlign: "center",
                    backgroundColor: isDragOver ? "rgba(197, 168, 128, 0.08)" : "#F8FAFC",
                    cursor: "pointer",
                    transition: "all 0.2s ease",
                    marginBottom: "8px",
                  }}
                >
                  <input
                    ref={teamFileInputRef}
                    type="file"
                    accept="image/png, image/jpeg, image/webp, image/jpg"
                    style={{ display: "none" }}
                    onChange={(e) => {
                      if (e.target.files && e.target.files.length > 0) {
                        handleFileUpload(e.target.files[0]);
                      }
                    }}
                  />

                  {isUploadingImage ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px", color: "var(--navy-hero)", fontSize: "12.5px", fontWeight: 600, padding: "4px 0" }}>
                      <span className="pi-pulse-dot" style={{ backgroundColor: "var(--navy-hero)" }} />
                      <span>Uploading photo to /assets/team/...</span>
                    </div>
                  ) : teamForm.image ? (
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
                      <div style={{ width: "38px", height: "38px", borderRadius: "50%", overflow: "hidden", position: "relative", backgroundColor: "var(--navy-hero)", flexShrink: 0, border: "2px solid var(--gold-oxford)" }}>
                        <Image
                          src={teamForm.image.startsWith("http") || teamForm.image.startsWith("/") ? teamForm.image : `/assets/team/${teamForm.image}`}
                          alt="Preview"
                          fill
                          style={{ objectFit: "cover" }}
                        />
                      </div>
                      <div style={{ textAlign: "left" }}>
                        <span style={{ fontSize: "12px", fontWeight: 600, color: "var(--ink-title)", display: "block" }}>
                          {teamForm.image}
                        </span>
                        <span style={{ fontSize: "10.5px", color: "var(--navy-hero)", textDecoration: "underline" }}>
                          Click to browse or drop a different image
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <p style={{ fontSize: "12.5px", fontWeight: 600, color: "var(--navy-hero)", margin: "0 0 2px" }}>
                        Drag & drop photo here, or <span style={{ textDecoration: "underline", color: "var(--gold-oxford)" }}>browse computer</span>
                      </p>
                      <span style={{ fontSize: "10.5px", color: "var(--ink-muted)" }}>
                        JPG, PNG, or WEBP (auto-saved to /assets/team/)
                      </span>
                    </div>
                  )}
                </div>

                {/* Direct Path Input with Permanent Prefix */}
                <div style={{ display: "flex", alignItems: "stretch" }}>
                  <span
                    style={{
                      backgroundColor: "#F1F5F9",
                      border: teamErrors.image ? "1px solid #EF4444" : "1px solid #CBD5E1",
                      borderRight: "none",
                      padding: "9px 12px",
                      fontSize: "13px",
                      color: "var(--navy-hero)",
                      fontFamily: "var(--font-mono)",
                      fontWeight: 600,
                      display: "flex",
                      alignItems: "center",
                      userSelect: "none",
                      borderTopLeftRadius: "6px",
                      borderBottomLeftRadius: "6px",
                    }}
                  >
                    /assets/team/
                  </span>
                  <input
                    type="text"
                    value={teamForm.image}
                    onChange={(e) => handleTeamFieldChange("image", e.target.value)}
                    className="form-input"
                    style={{
                      borderTopLeftRadius: 0,
                      borderBottomLeftRadius: 0,
                      border: teamErrors.image ? "1px solid #EF4444" : "1px solid #CBD5E1",
                      flex: 1,
                    }}
                  />
                </div>
                {teamErrors.image && (
                  <span style={{ fontSize: "11px", color: "#EF4444", marginTop: "5px", display: "block", fontFamily: "var(--font-sans)", fontWeight: 500 }}>
                    {teamErrors.image}
                  </span>
                )}
              </div>

              {teamErrors.general && (
                <div style={{ fontSize: "12px", color: "#EF4444", fontFamily: "var(--font-sans)", fontWeight: 500, textAlign: "center", marginTop: "2px" }}>
                  {teamErrors.general}
                </div>
              )}

              <div style={{ display: "flex", justifyContent: "flex-end", gap: "10px", marginTop: "8px" }}>
                <button type="button" onClick={() => setIsTeamModalOpen(false)} style={{ padding: "8px 16px", color: "var(--ink-muted)", background: "none", border: "none", cursor: "pointer" }}>Cancel</button>
                <button type="submit" disabled={isSavingMember} className="stamp-button stamp-button-primary" style={{ backgroundColor: "var(--navy-hero)", color: "#FFFFFF" }}>
                  {isSavingMember ? "SAVING..." : "SAVE MEMBER →"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* MODAL 5: ADD/EDIT GALLERY ARCHIVE */}
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
