export interface PotrStat {
  label: string;
  value: string;
}

export interface InvestorMentor {
  name: string;
  credential: string;
  role: string;
}

export interface StartupLogo {
  name: string;
  category: string;
  stage: string;
}

export interface FlagshipEvent {
  id: string;
  title: string;
  tagline: string;
  badge: string;
  about: string;
  edition: string;
  stats: PotrStat[];
  investorsMentors: InvestorMentor[];
  startupPortfolio: StartupLogo[];
}

export interface CaseFile {
  id: string;
  fileNumber: string;
  title: string;
  status: "ACTIVE" | "UPCOMING" | "CLOSED";
  category: "Strategy" | "Consulting" | "Finance" | "Venture";
  date: string;
  description: string;
  prizeOrOutput: string;
  eligibility: string;
}

export interface EventsContent {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  categories: string[];
  flagship: FlagshipEvent;
  caseFiles: CaseFile[];
}

export const events: EventsContent = {
  header: {
    badge: "INITIATIVES & CASE FILES",
    title: "FLAGSHIP EVENTS & ARENAS",
    subtitle:
      "Explore the official repository of venture symposiums, boardroom challenges, equity valuation labs, and corporate case leagues hosted by Finlogue.",
  },
  categories: ["All", "Flagship Summits", "Case Competitions", "Valuation Labs", "Workshops"],
  flagship: {
    id: "potr",
    title: "PITCH ON THE ROCKS (POTR)",
    tagline: "ANNUAL VENTURE & ANGEL SUMMIT",
    badge: "FLAGSHIP CONCLAVE",
    edition: "EDITION 2025–2026",
    about:
      "Pitch on the Rocks is Finlogue's marquee venture summit bringing together visionary student founders, angel syndicates, and institutional venture capital partners. Teams undergo intensive financial diligence and stress-test their unit economics in live pitching rounds for direct capital commitments and high-touch mentorship.",
    stats: [
      { label: "VENTURE CAPITAL DISCUSSED", value: "₹25CR+" },
      { label: "STARTUPS SHOWCASED", value: "25+" },
      { label: "ACTIVE INVESTORS & JUDGES", value: "9+" },
      { label: "DEAL CONVERSION WINDOW", value: "100%" },
    ],
    investorsMentors: [
      {
        name: "Ninad Karpe",
        credential: "Partner, 100X.VC & Veteran Angel Investor",
        role: "Keynote Jury",
      },
      {
        name: "Aman Tekriwal",
        credential: "Angel Investor & Private Equity Specialist",
        role: "Lead Diligence Panel",
      },
      {
        name: "Krishna Dev Pathak",
        credential: "Venture Partner & Ecosystem Builder",
        role: "Ecosystem Mentor",
      },
      {
        name: "Sidharth Pandey",
        credential: "Growth Strategist & PE Advisory",
        role: "Corporate Mentor",
      },
      {
        name: "Siddhant Gupta",
        credential: "Founder & Early Stage Investor",
        role: "Startup Mentor",
      },
      {
        name: "Vartul Jain",
        credential: "Corporate Finance & M&A Specialist",
        role: "Valuation Mentor",
      },
      {
        name: "Garima Seth",
        credential: "Senior Investment Strategist",
        role: "Jury Member",
      },
    ],
    startupPortfolio: [
      { name: "SensoVision", category: "DeepTech AI", stage: "Pre-Series A" },
      { name: "AugAid", category: "MedTech Assistive", stage: "Seed" },
      { name: "CIT-Peels", category: "BioTech Circular", stage: "Pre-Seed" },
      { name: "Cubicles.com", category: "PropTech Platform", stage: "Growth" },
      { name: "Lokachakra", category: "Supply Chain", stage: "Seed" },
      { name: "Vzeya", category: "E-Commerce SaaS", stage: "Seed" },
      { name: "Eventz Book", category: "Event Tech", stage: "Early Traction" },
      { name: "Drivomate", category: "Connected Auto", stage: "Pre-Seed" },
    ],
  },
  caseFiles: [
    {
      id: "potr",
      fileNumber: "FLAGSHIP",
      title: "PITCH ON THE ROCKS (POTR)",
      status: "ACTIVE",
      category: "Venture",
      date: "SPRING 2026 · ANNUAL CONCLAVE",
      description:
        "Finlogue's marquee annual venture summit bringing together visionary student founders, angel syndicates, and institutional venture capital partners for live pitch deliberation, financial diligence, and direct capital commitments.",
      prizeOrOutput: "₹25CR+ Diligence Window & Direct Angel Commitments",
      eligibility: "Student Startups & Collegiate Founders Pan-India",
    },
    {
      id: "case-crackers",
      fileNumber: "",
      title: "NATIONAL CASE CRACKERS",
      status: "ACTIVE",
      category: "Consulting",
      date: "SPRING 2026",
      description:
        "Finlogue's flagship multi-stage national case challenge. Student cohorts deconstruct live corporate distress, supply chain bottlenecks, and market-entry roadmaps before industry partners.",
      prizeOrOutput: "₹50,000 Prize Pool & Executive Mentorship Briefs",
      eligibility: "Open Pan-India · Undergrads & Postgrads",
    },
    {
      id: "valuation-lab",
      fileNumber: "",
      title: "VALUATION & EQUITY RESEARCH LAB",
      status: "UPCOMING",
      category: "Finance",
      date: "SUMMER 2026",
      description:
        "Rigorous hands-on financial engineering immersion. Analysts construct institutional-grade 3-statement models, DCFs, trading comparables, and equity research reports guided by industry professionals.",
      prizeOrOutput: "Live Research Coverage Citation & Institutional Credentials",
      eligibility: "Student Analysts & Financial Engineering Aspirants",
    },
    {
      id: "market-watch",
      fileNumber: "",
      title: "MARKET WATCH SERIES",
      status: "ACTIVE",
      category: "Strategy",
      date: "WEEKLY SESSIONS",
      description:
        "Weekly institutional market briefings and macroeconomic debates dissecting central bank actions, sector rotations, earnings surprises, and geopolitical trade dynamics.",
      prizeOrOutput: "Published Weekly Dispatch & Macro Portfolio Honors",
      eligibility: "All LNMIIT Cohorts & Open Observer Desk",
    },
    {
      id: "ma-simulation",
      fileNumber: "",
      title: "M&A BOARDROOM SIMULATION",
      status: "UPCOMING",
      category: "Strategy",
      date: "AUTUMN 2026",
      description:
        "High-stakes executive negotiation arena simulating contested takeovers, synergy valuations, antitrust defenses, and hostile bids with real-time deal room mechanics.",
      prizeOrOutput: "Trophy of Dealmaking Excellence & Angel Fund Fast-Track",
      eligibility: "Syndicate Teams of 3–5 Members",
    },
    {
      id: "the-snapdeal-dilemma",
      fileNumber: "",
      title: "THE SNAPDEAL DILEMMA",
      status: "CLOSED",
      category: "Strategy",
      date: "AUTUMN 2025",
      description:
        "A forensic strategic autopsy and post-mortem dissecting capital allocation, competitor consolidation, and pivot strategies during the peak Indian e-commerce burn war.",
      prizeOrOutput: "Published Case Brief & Archival Analysis",
      eligibility: "Open Pan-India · 120+ Teams Participated",
    },
    {
      id: "consultants-got-talent",
      fileNumber: "",
      title: "CONSULTANTS GOT TALENT",
      status: "ACTIVE",
      category: "Consulting",
      date: "SPRING 2026",
      description:
        "High-octane live case challenge assessing structured problem solving, hypothesis generation, executive presence, and rapid financial sizing before industry consultants.",
      prizeOrOutput: "₹50,000 Prize Pool & Direct Mentorship Interviews",
      eligibility: "Open to Undergrads & Postgrads across India",
    },
  ],
};
