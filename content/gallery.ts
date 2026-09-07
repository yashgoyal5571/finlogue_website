export interface GalleryItem {
  id: string;
  title: string;
  category: "Summits" | "Pitch Sessions" | "Keynotes" | "Workshops" | "Community";
  image: string;
  date: string;
  location: string;
  description: string;
  tag: string;
}

export interface GalleryContent {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  categories: string[];
  items: GalleryItem[];
}

export const gallery: GalleryContent = {
  header: {
    badge: "MOMENTS & ARCHIVES",
    title: "THE VISUAL VAULT",
    subtitle:
      "Capturing pivotal symposiums, founder pitches, boardroom deliberations, and landmark milestones across the journey of Finlogue.",
  },
  categories: [
    "All",
    "Summits",
    "Pitch Sessions",
    "Keynotes",
    "Workshops",
    "Community",
  ],
  items: [
    {
      id: "gal-01",
      title: "Global Financial Conclave Keynote",
      category: "Keynotes",
      image: "/assets/gallery/summit-keynote.jpg",
      date: "Spring 2026",
      location: "Grand Auditorium",
      description:
        "Opening address analyzing macro market cycles, venture valuations, and emerging fintech disruptions before an audience of 600+ student founders and analysts.",
      tag: "KEYNOTE ADDRESS",
    },
    {
      id: "gal-02",
      title: "Pitch on the Rocks: Live Startup Battle",
      category: "Pitch Sessions",
      image: "/assets/gallery/pitch-session.jpg",
      date: "Autumn 2025",
      location: "Executive Conclave Hall",
      description:
        "Early-stage venture founders pitching unit economics and market scalability directly to angel investors and institutional VCs under strict diligence conditions.",
      tag: "VENTURE DILIGENCE",
    },
    {
      id: "gal-03",
      title: "Champions of the National Case League",
      category: "Summits",
      image: "/assets/gallery/award-ceremony.jpg",
      date: "Winter 2025",
      location: "Main Stage",
      description:
        "The winning case cohort celebrating their landmark corporate turnaround proposal after 48 hours of uninterrupted financial modeling and strategy design.",
      tag: "VICTORY & HONORS",
    },
    {
      id: "gal-04",
      title: "Venture Conclave Networking Lounge",
      category: "Community",
      image: "/assets/gallery/networking-hall.jpg",
      date: "Spring 2026",
      location: "Executive Lounge",
      description:
        "High-trust intellectual exchange between institutional advisors, student analysts, angel syndicates, and prospective founders over boardroom coffee.",
      tag: "ECOSYSTEM EXCHANGE",
    },
    {
      id: "gal-05",
      title: "Financial Modeling & Valuation Masterclass",
      category: "Workshops",
      image: "/assets/gallery/consulting-workshop.jpg",
      date: "Autumn 2025",
      location: "Case Syndicate Room",
      description:
        "Intensive DCF, LBO, and market multiple valuation workshop led by visiting corporate finance specialists and senior student coordinators.",
      tag: "CASE WORKSHOP",
    },
    {
      id: "gal-06",
      title: "Executive Deliberations & Mentorship Track",
      category: "Summits",
      image: "/assets/hero/flagship-summit.jpg",
      date: "Annual Conclave",
      location: "Summit Arena",
      description:
        "Senior partners and alumni mentors dissecting strategic turnaround plays during the annual Finlogue flagship symposium.",
      tag: "FLAGSHIP SYMPOSIUM",
    },
  ],
};
