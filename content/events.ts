export interface PotrStat {
  label: string;
  value: string;
  description?: string;
}

export interface InvestorMentor {
  name: string;
  credential: string;
  role: string;
  linkedInPostUrl?: string;
  initials?: string;
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
  fileNumber?: string;
  title: string;
  status: "ACTIVE" | "UPCOMING" | "CLOSED";
  category: string;
  date: string;
  shortLine?: string;
  description: string;
  typeIndicator?: string;
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

  categories: [
    "All",
    "Venture",
    "Finance",
    "Founders",
    "Strategy",
    "Real-World Problems",
  ],

  flagship: {
    id: "potr",
    title: "PITCH ON THE ROCKS (POTR)",
    tagline: "WHERE FOUNDERS PITCH. INVESTORS LISTEN.",
    badge: "FLAGSHIP CONCLAVE",
    edition: "EDITION 2025–2026",

    about:
      "Pitch on the Rocks is Finlogue's marquee venture summit bringing together visionary student founders, investors, industry leaders and ecosystem enablers. It creates a platform for founders to present their ventures, engage with experienced people from the ecosystem, receive meaningful feedback and build valuable connections.",

    stats: [
      {
        label: "VENTURE CAPITAL DISCUSSED",
        value: "₹25CR+",
        description: "Capital evaluated & discussed with student & alumni founders",
      },
      {
        label: "STARTUPS SHOWCASED",
        value: "25+",
        description: "Curated high-conviction startups shortlisted for live pitch",
      },
      {
        label: "ACTIVE INVESTORS & JUDGES",
        value: "9+",
        description: "Institutional VCs, angel syndicates & seasoned industry mentors",
      },
    ],

    investorsMentors: [
      {
        name: "Ninad Karpe",
        credential: "Partner, 100X.VC & Veteran Angel Investor",
        role: "Keynote Jury",
        initials: "NK",
        linkedInPostUrl: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      },
      {
        name: "Aman Tekriwal",
        credential: "Angel Investor & Private Equity Specialist",
        role: "Lead Diligence Panel",
        initials: "AT",
        linkedInPostUrl: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      },
      {
        name: "Krishna Dev Pathak",
        credential: "Venture Partner & Ecosystem Builder",
        role: "Ecosystem Mentor",
        initials: "KP",
        linkedInPostUrl: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      },
      {
        name: "Sidharth Pandey",
        credential: "Growth Strategist & PE Advisory",
        role: "Corporate Mentor",
        initials: "SP",
        linkedInPostUrl: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      },
      {
        name: "Siddhant Gupta",
        credential: "Founder & Early Stage Investor",
        role: "Startup Mentor",
        initials: "SG",
        linkedInPostUrl: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      },
      {
        name: "Vartul Jain",
        credential: "Corporate Finance & M&A Specialist",
        role: "Valuation Mentor",
        initials: "VJ",
        linkedInPostUrl: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      },
      {
        name: "Garima Seth",
        credential: "Senior Investment Strategist",
        role: "Jury Member",
        initials: "GS",
        linkedInPostUrl: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      },
    ],

    startupPortfolio: [
      {
        name: "SensoVision",
        category: "DeepTech AI",
        stage: "Pre-Series A",
      },
      {
        name: "AugAid",
        category: "MedTech Assistive",
        stage: "Seed",
      },
      {
        name: "CIT-Peels",
        category: "BioTech Circular",
        stage: "Pre-Seed",
      },
      {
        name: "Cubicles.com",
        category: "PropTech Platform",
        stage: "Growth",
      },
      {
        name: "Lokachakra",
        category: "Supply Chain",
        stage: "Seed",
      },
      {
        name: "Vzeya",
        category: "E-Commerce SaaS",
        stage: "Seed",
      },
      {
        name: "Eventz Book",
        category: "Event Tech",
        stage: "Early Traction",
      },
      {
        name: "Drivomate",
        category: "Connected Auto",
        stage: "Pre-Seed",
      },
    ],
  },

  caseFiles: [
    {
      id: "potr",
      fileNumber: "INITIATIVE 01",
      title: "PITCH ON THE ROCKS",
      category: "VENTURE",
      date: "FLAGSHIP SUMMIT",

      shortLine: "Where founders pitch. Investors listen.",

      description:
        "A startup–investor platform where founders pitch their ventures and engage with investors, industry leaders and ecosystem enablers.",

      typeIndicator: "ANNUAL CONCLAVE",
      status: "ACTIVE",
      prizeOrOutput: "Founder–Investor Platform",
      eligibility: "Collegiate Founders & Startups",
    },

    {
      id: "behind-the-prices",
      fileNumber: "INITIATIVE 02",
      title: "BEHIND THE PRICES",
      category: "FINANCE",
      date: "EQUITY SERIES",

      shortLine:
        "Uncover what moves a stock — and what could move it next.",

      description:
        "An equity research challenge built around understanding the story behind a stock's price, what moves it and what could move it next.",

      typeIndicator: "EQUITY CHALLENGE",
      status: "ACTIVE",
      prizeOrOutput: "Equity Research",
      eligibility: "Student Analysts & Researchers",
    },

    {
      id: "founders-friday",
      fileNumber: "INITIATIVE 03",
      title: "FOUNDER'S FRIDAY",
      category: "FOUNDERS",
      date: "INTERVIEW SERIES",

      shortLine: "The people and stories behind the pitches.",

      description:
        "An Instagram interview series featuring founders from Pitch on the Rocks, exploring their journeys, challenges, decisions and the stories behind the businesses they are building.",

      typeIndicator: "INTERVIEW SERIES",
      status: "ACTIVE",
      prizeOrOutput: "Founder Stories",
      eligibility: "POTR Founders & Ecosystem Builders",
    },

    {
      id: "case-craft",
      fileNumber: "INITIATIVE 04",
      title: "CASE CRAFT",
      category: "STRATEGY",
      date: "CASE LEAGUE",

      shortLine:
        "Research a company. Understand its product. Pitch it to the panel.",

      description:
        "A company research and pitching challenge built around understanding a business, its product and the opportunity behind it.",

      typeIndicator: "RESEARCH & PITCH",
      status: "ACTIVE",
      prizeOrOutput: "Company Research & Pitch",
      eligibility: "Student Participants",
    },

    {
      id: "thadani-and-co",
      fileNumber: "INITIATIVE 05",
      title: "THADANI & CO.",
      category: "REAL-WORLD PROBLEMS",
      date: "SPRINT ARENA",

      shortLine: "Real startups. Real problems. Real solutions.",

      description:
        "A real-world problem-solving initiative where students work on actual challenges shared by startups and develop practical solutions for the businesses themselves.",

      typeIndicator: "PROBLEM SPRINT",
      status: "ACTIVE",
      prizeOrOutput: "Practical Business Solutions",
      eligibility: "Cross-Disciplinary Problem Solvers",
    },
  ],
};