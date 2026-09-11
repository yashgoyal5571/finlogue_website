export interface GalleryItem {
  id: string;
  image: string;
  title?: string;
  category?: string;
  date?: string;
  location?: string;
  description?: string;
  tag?: string;
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
      title: "Executive Fireside Chat: Capital Markets",
      category: "Keynotes",
      image: "/assets/gallery/gallery-fireside-chat.jpg",
      date: "Spring 2026",
      location: "Auditorium Main Stage",
      description:
        "Senior partners and visiting market specialists discussing macroeconomic shifts and corporate strategy during the flagship symposium.",
      tag: "FIRESIDE CHAT",
    },
    {
      id: "gal-07",
      title: "Grand Champions Case Podium",
      category: "Summits",
      image: "/assets/gallery/celebrating-success.jpg",
      date: "Spring 2026",
      location: "Main Auditorium",
      description:
        "Winning syndicate receiving the championship trophy and honors after a 48-hour intensive turnaround modeling sprint.",
      tag: "CHAMPIONS",
    },
    {
      id: "gal-08",
      title: "Summit Arena Flashlight Celebration",
      category: "Community",
      image: "/assets/gallery/gallery-crowd-lights.jpg",
      date: "Spring 2026",
      location: "Summit Arena",
      description:
        "600+ university delegates and student founders illuminating the auditorium during the summit finals.",
      tag: "CONCLAVE ARENA",
    },
    {
      id: "gal-09",
      title: "Finlogue Executive Leadership & Cohort",
      category: "Community",
      image: "/assets/gallery/gallery-team-cohort.jpg",
      date: "Academic Year 2025–26",
      location: "Campus Central Steps",
      description:
        "Student coordinators, heads, and core analysts driving equity research, consulting leagues, and summits.",
      tag: "LEADERSHIP COHORT",
    },
    {
      id: "gal-10",
      title: "Boardroom Case Defense & Diligence",
      category: "Workshops",
      image: "/assets/gallery/gallery-boardroom-challenge.jpg",
      date: "Winter 2025",
      location: "Executive Boardroom",
      description:
        "Student analysts presenting quantitative valuation forecasts and strategic recommendations before corporate executive judges.",
      tag: "BOARDROOM DEFENSE",
    },
    {
      id: "gal-11",
      title: "National Grant & Venture Award Ceremony",
      category: "Summits",
      image: "/assets/gallery/gallery-cheque-ceremony.jpg",
      date: "Spring 2026",
      location: "Grand Conclave Stage",
      description:
        "Student founders and faculty receiving grant allocation and honors for high-conviction innovative venture ideas.",
      tag: "VENTURE GRANT",
    },
    {
      id: "gal-12",
      title: "Flagship Summit Main Arena",
      category: "Summits",
      image: "/assets/hero/flagship-summit.jpg",
      date: "Annual Conclave",
      location: "Auditorium Conclave Hall",
      description:
        "Delegates and university attendees participating in the annual flagship finance and entrepreneurship conclave.",
      tag: "ANNUAL SUMMIT",
    },
  ],
};
