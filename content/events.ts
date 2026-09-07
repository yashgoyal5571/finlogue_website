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
    id: "pitch-on-the-rocks",
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
      fileNumber: "CASE FILE 026",
      title: "THE SNAPDEAL DILEMMA",
      status: "CLOSED",
      category: "Strategy",
      date: "AUTUMN 2025",
      description:
        "A forensic strategic autopsy and post-mortem dissecting the critical capital allocation, competitor consolidation, and pivot strategies during the peak e-commerce burn war.",
      prizeOrOutput: "Published Case Brief & Archival Analysis",
      eligibility: "Open Pan-India · 120+ Teams Participated",
    },
    {
      fileNumber: "CASE FILE 027",
      title: "CONSULTANTS GOT TALENT",
      status: "ACTIVE",
      category: "Consulting",
      date: "SPRING 2026",
      description:
        "High-octane live case challenge assessing structured problem solving, hypothesis generation, executive presence, and rapid financial sizing before industry consultants.",
      prizeOrOutput: "₹50,000 Prize Pool & Direct Mentorship Interviews",
      eligibility: "Open to Undergrads & Postgrads across India",
    },
    {
      fileNumber: "CASE FILE 028",
      title: "FINTECH DISRUPTION VALUATION LAB",
      status: "UPCOMING",
      category: "Finance",
      date: "SUMMER 2026",
      description:
        "Rigorous financial modeling competition analyzing unit economics, customer acquisition costs, and valuation multiples for cross-border payment platforms.",
      prizeOrOutput: "Corporate Citation & Research Publication",
      eligibility: "Student Analysts & Finance Enthusiasts",
    },
    {
      fileNumber: "CASE FILE 029",
      title: "VENTURE BUILDERS HACKATHON",
      status: "UPCOMING",
      category: "Venture",
      date: "AUTUMN 2026",
      description:
        "36-hour sprint where product engineers collaborate with finance analysts to build, validate, and pitch an investor-ready business model from scratch.",
      prizeOrOutput: "Incubation Grant & Angel Syndicate Review",
      eligibility: "Teams of 2–4 Students",
    },
  ],
};
