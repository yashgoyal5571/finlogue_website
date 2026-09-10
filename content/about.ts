export interface OriginBeat {
  step: string;
  phase: string;
  title: string;
  description: string;
  highlight: string;
}

export interface Pillar {
  id: string;
  fileNumber: string;
  title: string;
  blurb: string;
  details: string;
  keyInitiatives: string[];
}

export interface LeadershipMember {
  name: string;
  role: string;
  dept?: string;
  batch?: string;
  focus?: string;
  email?: string;
  linkedin?: string;
  image?: string;
}

export interface AboutContent {
  header: {
    badge: string;
    title: string;
    subtitle: string;
    statSummary: string;
  };
  mission: {
    title: string;
    statement: string;
    vision: string;
  };
  origin: {
    title: string;
    subtitle: string;
    beats: OriginBeat[];
  };
  pillars: Pillar[];
  leadership: {
    title: string;
    subtitle: string;
    coordinators: LeadershipMember[];
    heads: LeadershipMember[];
    coreTeam?: LeadershipMember[];
    coreTeamText: string;
  };
}

export const about: AboutContent = {
  header: {
    badge: "WHO WE ARE",
    title: "FINANCE IS MORE THAN A SUBJECT.",
    subtitle:
      "Finlogue is the official Finance, Consulting & Analytics society of LNMIIT, created to bring finance beyond the classroom and into conversations, competitions, research, and real-world ideas.",
    statSummary:
      "EXPLORING MARKETS, BUSINESSES, STARTUPS, AND THE IDEAS THAT SHAPE THEM.",
  },
  mission: {
    title: "MISSION & VISION",
    statement:
      "To foster an elite intellectual ecosystem where students cultivate unmatched financial acumen, master structured problem solving, and interface directly with institutional investors and high-growth ventures.",
    vision:
      "To establish Finlogue as a premier collegiate hub for venture intelligence, corporate strategy, and financial engineering across the country — producing job creators, strategic advisors, and industry leaders.",
  },
  origin: {
    title: "THE ORIGIN",
    subtitle: "A four-phase chronological blueprint of how the institution was forged from the ground up.",
    beats: [
      {
        step: "01",
        phase: "THE SEED",
        title: "Campus That Wasn't Supposed To Be One",
        description:
          "Starting as an informal syndicate of students passionate about capital markets, macroeconomic indicators, and strategic management.",
        highlight: "Ground Zero · Passion for Markets",
      },
      {
        step: "02",
        phase: "CURIOUS MINDS",
        title: "The Assembly of Analysts",
        description:
          "Uniting students across engineering and management disciplines through weekly market tear-downs, valuation models, and strategy debates.",
        highlight: "Cross-Disciplinary Rigor",
      },
      {
        step: "03",
        phase: "FINLOGUE ESTABLISHED",
        title: "Chartering The House",
        description:
          "Formalizing the cell with dedicated pillars in Finance, Consulting, Competitions, and Ecosystem Community — building the institutional foundation.",
        highlight: "Official Charter & Structure",
      },
      {
        step: "04",
        phase: "SCALE & FLAGSHIPS",
        title: "The Ecosystem Expands",
        description:
          "Launching landmark summits like Pitch on the Rocks, fielding national case competition cohorts, and attracting distinguished venture partners and angel networks.",
        highlight: "National Case Podiums · Research Labs",
      },
    ],
  },
  pillars: [
    {
      id: "finance",
      fileNumber: "PILLAR 01",
      title: "FINANCE & MARKETS",
      blurb: "Capital markets, quantitative research, equity research, and corporate valuation.",
      details:
        "Comprehensive training in DCF, LBO, merger models, portfolio risk management, and quantitative finance methods simulating hedge funds and investment banks.",
      keyInitiatives: [
        "Equity Research Reports",
        "Mock Trading & Portfolio Simulations",
        "Valuation Case Competitions",
      ],
    },
    {
      id: "consulting",
      fileNumber: "PILLAR 02",
      title: "STRATEGY & CONSULTING",
      blurb: "Case solving, hypothesis-driven structuring, and management advisory.",
      details:
        "Developing structured problem-solving methodologies modeled on tier-1 management consultancies (MBB). Dissecting business problems, market entry, and operational turnarounds.",
      keyInitiatives: [
        "Case Interview Masterclasses",
        "Live Client Advisory Briefs",
        "Strategy Framework Teardowns",
      ],
    },
    {
      id: "competition",
      fileNumber: "PILLAR 03",
      title: "NATIONAL COMPETITIONS",
      blurb: "Representing the institution in prestigious national and global business challenges.",
      details:
        "Fielding top-tier cohorts for corporate case challenges across premier institutes (IIMs, IITs) and international leagues.",
      keyInitiatives: [
        "Case Crackers League",
        "National Business Model Challenges",
        "Boardroom Simulation Showdowns",
      ],
    },
    {
      id: "community",
      fileNumber: "PILLAR 04",
      title: "ECOSYSTEM & VENTURE",
      blurb: "Startups, alumni mentorship, angel networks, and investor summits.",
      details:
        "Connecting student analysts, strategists, and founders with capital, mentorship, and industry veterans through flagship symposiums like Pitch on the Rocks.",
      keyInitiatives: [
        "Pitch on the Rocks (POTR) Flagship",
        "Angel & VC Mentorship Circles",
        "Founder Incubation Desk",
      ],
    },
  ],
  leadership: {
    title: "LEADERSHIP & HIERARCHY",
    subtitle: "Governed by student leadership with uncompromising institutional standards.",
    coordinators: [
      {
        name: "Aditya Tiwari",
        role: "Coordinator",
        focus: "Institutional Strategy & Leadership",
        email: "24uec533@lnmiit.ac.in",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        image: "/assets/team/aditya-tiwari.jpg",
      },
      {
        name: "Aryan Mittal",
        role: "Coordinator",
        focus: "Operations & Strategic Initiatives",
        email: "24uec533@lnmiit.ac.in",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        image: "/assets/team/aryan-mittal.jpg",
      },
      {
        name: "Akshat Thadani",
        role: "Coordinator",
        focus: "Corporate Engagements & Finance Research",
        email: "24uec533@lnmiit.ac.in",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        image: "/assets/team/aditya-tiwari.jpg",
      },
    ],
    heads: [
      {
        name: "Krishna Khairnar",
        role: "Head",
        dept: "Consulting & Strategy",
        batch: "Batch Y24",
        focus: "",
        email: "24uec533@lnmiit.ac.in",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        image: "/assets/team/aryan-mittal.jpg",
      },
      {
        name: "Abhinav Sharma",
        role: "Head",
        dept: "Finance & Research",
        batch: "Batch Y24",
        focus: "",
        email: "24uec533@lnmiit.ac.in",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        image: "/assets/team/aditya-tiwari.jpg",
      },
    ],
    coreTeam: [
      {
        name: "Rohan Rastogi",
        role: "Associate",
        dept: "Equity Research",
        batch: "Y25",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        email: "24uec533@lnmiit.ac.in",
        image: "/assets/team/rohan-rastogi.png",
      },
      {
        name: "Armaan Pareek",
        role: "Associate",
        dept: "Corporate Finance",
        batch: "Y25",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        email: "24uec533@lnmiit.ac.in",
        image: "/assets/team/aryan-mittal.jpg",
      },
      {
        name: "Ishan Shukla",
        role: "Associate",
        dept: "Valuation Lab",
        batch: "Y25",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        email: "24uec533@lnmiit.ac.in",
        image: "/assets/team/aditya-tiwari.jpg",
      },
      {
        name: "Saurabh Agarwal",
        role: "Associate",
        dept: "Strategic Consulting",
        batch: "Y25",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        email: "24uec533@lnmiit.ac.in",
        image: "/assets/team/aryan-mittal.jpg",
      },
      {
        name: "Lakshana Goswami",
        role: "Associate",
        dept: "Corporate Relations",
        batch: "Y25",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        email: "24uec533@lnmiit.ac.in",
        image: "/assets/team/aditya-tiwari.jpg",
      },
      {
        name: "Yash Khandelwal",
        role: "Associate",
        dept: "Events & Operations",
        batch: "Y25",
        linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
        email: "24uec533@lnmiit.ac.in",
        image: "/assets/team/aryan-mittal.jpg",
      },
    ],
    coreTeamText:
      "Supported by the dedicated Core Team driving equity research, financial modeling, consulting leagues, and corporate relations.",
  },
};
