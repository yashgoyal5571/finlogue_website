import { home as defaultHome, HomeContent } from "@/content/home";
import { events as defaultEvents, EventsContent } from "@/content/events";
import { gallery as defaultGallery, GalleryContent, GalleryItem } from "@/content/gallery";
import { about as defaultAbout } from "@/content/about";
import { contact as defaultContact, ContactContent } from "@/content/contact";

export interface TeamMemberItem {
  id: string;
  name: string;
  role: string;
  tier: "coordinators" | "heads" | "coreTeam";
  dept?: string;
  batch?: string;
  focus?: string;
  email: string;
  linkedin: string;
  image: string;
}

export interface CelebratingSuccessPhoto {
  id: string;
  image: string;
}

export interface CelebratingSuccessContent {
  title?: string;
  oneLiner?: string;
  image?: string;
  photos?: CelebratingSuccessPhoto[];
}

export interface GoogleSheetsConfig {
  webhookUrl: string;
  sheetUrl: string;
  lastSynced: string | null;
}

export interface CmsData {
  home: HomeContent;
  events: EventsContent;
  gallery: {
    header: GalleryContent["header"];
    celebratingSuccess: CelebratingSuccessContent;
    items: GalleryItem[];
  };
  team: TeamMemberItem[];
  contact: ContactContent;
  googleSheets: GoogleSheetsConfig;
}

// Generate initial team list from about.leadership
const initialTeamList: TeamMemberItem[] = [
  ...defaultAbout.leadership.coordinators.map((c, idx) => ({
    id: `coord-${idx + 1}`,
    name: c.name,
    role: c.role,
    tier: "coordinators" as const,
    focus: c.focus || "",
    dept: c.dept || c.focus || "",
    email: c.email || "24uec533@lnmiit.ac.in",
    linkedin: c.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
    image: c.image || "/assets/team/aryan-mittal.jpg",
  })),
  ...defaultAbout.leadership.heads.map((h, idx) => ({
    id: `head-${idx + 1}`,
    name: h.name,
    role: h.role,
    tier: "heads" as const,
    dept: h.dept || "Department Head",
    batch: h.batch || "Y24",
    focus: h.focus || "",
    email: h.email || "24uec533@lnmiit.ac.in",
    linkedin: h.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
    image: h.image || "/assets/team/aryan-mittal.jpg",
  })),
  ...(defaultAbout.leadership.coreTeam ?? []).map((m, idx) => ({
    id: `core-${idx + 1}`,
    name: m.name,
    role: m.role,
    tier: "coreTeam" as const,
    dept: m.dept || "Equity Research",
    batch: m.batch || "Y25",
    focus: m.focus || "",
    email: m.email || "24uec533@lnmiit.ac.in",
    linkedin: m.linkedin || "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
    image: m.image || "/assets/team/aditya-tiwari.jpg",
  })),
];

export const defaultCmsData: CmsData = {
  home: defaultHome,
  events: defaultEvents,
  gallery: {
    header: defaultGallery.header,
    celebratingSuccess: {
      title: "Celebrating Success",
      oneLiner: "Finlogue Conclave: High-conviction student ventures pitching live to institutional investors.",
      image: "/assets/gallery/celebrating-success.jpg",
    },
    items: defaultGallery.items,
  },
  team: initialTeamList,
  contact: defaultContact,
  googleSheets: {
    webhookUrl: process.env.GOOGLE_SHEETS_WEBHOOK_URL || "",
    sheetUrl: "https://docs.google.com/spreadsheets",
    lastSynced: null,
  },
};
