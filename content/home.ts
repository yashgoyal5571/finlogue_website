export interface HeroContent {
  badge: string;
  headline: string;
  subline: string;
  primaryCta: {
    text: string;
    href: string;
  };
  secondaryCta: {
    text: string;
    href: string;
  };
}

export interface ImpactStat {
  label: string;
  value: string;
  detail: string;
}

export interface InitiativeTeaser {
  id: string;
  tag: string;
  title: string;
  description: string;
  metrics: string;
  href: string;
  highlight: string;
}

export interface MentorSpeaker {
  name: string;
  title: string;
  firm: string;
  category: string;
  quote: string;
  image?: string;
}

export interface StartupPartner {
  name: string;
  tagline: string;
  category: string;
}

export interface HomeContent {
  hero: HeroContent;
  stats: ImpactStat[];
  initiatives: InitiativeTeaser[];
  pillars: {
    id: string;
    number: string;
    title: string;
    blurb: string;
  }[];
  speakersMentors: MentorSpeaker[];
  startups: StartupPartner[];
  closingCta: {
    headline: string;
    subline: string;
    buttonText: string;
    href: string;
  };
}

export const home: HomeContent = {
  hero: {
    badge: "FINANCE & STRATEGY CELL · LNMIIT",
    headline: "BUILDING ANALYSTS. SHAPING STRATEGY.",
    subline:
      "Finlogue is LNMIIT's premier student body for finance, corporate strategy, and business consulting — developing rigorous analytical minds through live market challenges.",
    primaryCta: {
      text: "DISCOVER INITIATIVES",
      href: "#initiatives",
    },
    secondaryCta: {
      text: "ABOUT THE CELL",
      href: "/about",
    },
  },
  stats: [
    {
      label: "EQUITY RESEARCH & VALUATION",
      value: "50+",
      detail: "DCF models, valuation decks & market research briefs",
    },
    {
      label: "FINANCE ASPIRANTS MENTORED",
      value: "1,200+",
      detail: "Trained across financial modeling, stock analysis & strategy",
    },
    {
      label: "CASE & STOCK LEAGUES",
      value: "35+",
      detail: "National challenges, boardroom simulations & M&A battles",
    },
    {
      label: "INDUSTRY MENTORS & ALUMNI",
      value: "40+",
      detail: "Investment bankers, equity analysts, CAs & corporate leads",
    },
  ],
  initiatives: [
    {
      id: "potr",
      tag: "FLAGSHIP ANNUAL SUMMIT",
      title: "PITCH ON THE ROCKS",
      description:
        "Finlogue's marquee annual investment & strategy conclave bringing together industry leaders, analysts, and LNMIIT cohorts for live case deliberation, valuation panels, and sector keynotes.",
      metrics: "Annual Flagship Conclave · 9+ Industry Leaders & Jury",
      href: "/events#potr",
      highlight: "Annual Conclave",
    },
    {
      id: "case-crackers",
      tag: "CONSULTING LEAGUE",
      title: "NATIONAL CASE CRACKERS",
      description:
        "Intensive business problem-solving challenge where multi-disciplinary cohorts deconstruct corporate distress, supply chain shocks, and market-entry strategies under real boardroom conditions.",
      metrics: "50+ Teams · Boardroom Defense · Cash Honors",
      href: "/events#case-crackers",
      highlight: "Flagship Case Challenge",
    },
    {
      id: "valuation-lab",
      tag: "FINANCIAL ENGINEERING",
      title: "VALUATION & EQUITY RESEARCH LAB",
      description:
        "Rigorous financial modeling program covering discounted cash flows, LBO analysis, comparable company analysis, and equity research teardowns guided by industry practitioners.",
      metrics: "12+ Live Models · Industry Standards",
      href: "/events#valuation-lab",
      highlight: "Skill Accelerator",
    },
    {
      id: "market-watch",
      tag: "MARKETS & ANALYSIS",
      title: "MARKET WATCH SERIES",
      description:
        "Recurring market analysis sessions, sector deep-dives, and investment committee simulations designed to sharpen macro-economic reasoning and portfolio thinking.",
      metrics: "Weekly Sessions · Live Market Data",
      href: "/events#market-watch",
      highlight: "Weekly Briefing",
    },
    {
      id: "ma-simulation",
      tag: "CORPORATE STRATEGY",
      title: "M&A BOARDROOM SIMULATION",
      description:
        "High-stakes executive negotiation arena simulating contested takeovers, synergy valuations, antitrust defenses, and hostile bids with real-time deal room mechanics.",
      metrics: "Live Deal Room · Multi-Round Negotiation",
      href: "/events#ma-simulation",
      highlight: "Boardroom Arena",
    },
  ],
  pillars: [
    {
      id: "finance",
      number: "01",
      title: "FINANCE & MARKETS",
      blurb: "Quantitative modeling, asset valuation, and capital markets analysis.",
    },
    {
      id: "consulting",
      number: "02",
      title: "STRATEGY & CONSULTING",
      blurb: "Structured problem solving, market sizing, and corporate advisory frameworks.",
    },
    {
      id: "competition",
      number: "03",
      title: "COMPETITIVE ARENAS",
      blurb: "High-stakes inter-collegiate case championships and financial challenges.",
    },
    {
      id: "community",
      number: "04",
      title: "ECOSYSTEM & VENTURE",
      blurb: "Startups, alumni mentorship, angel networks, and investor summits.",
    },
  ],
  speakersMentors: [
    {
      name: "Ninad Karpe",
      title: "Partner, 100X.VC",
      firm: "Lead Conclave Jury & Veteran Angel Investor",
      category: "Venture Capital",
      quote:
        "The depth of valuation discipline, cash flow stress-testing, and market diligence displayed by Finlogue cohorts matches what we see in seasoned investment syndicates. They are forging genuine financial minds.",
      image: "/assets/gallery/summit-keynote.jpg",
    },
    {
      name: "Aman Tekriwal",
      title: "Angel Investor & PE Specialist",
      firm: "Strategic Advisor & Private Equity Lead",
      category: "Angel Investment",
      quote:
        "Financial modeling rigor, DCF mastery, and strategic acumen are exceptionally rare at the undergraduate level. Finlogue is setting an institutional benchmark for practical boardroom readiness.",
      image: "/assets/team/aryan-mittal.jpg",
    },
    {
      name: "Krishna Dev Pathak",
      title: "Venture Partner",
      firm: "Ecosystem Builder & Startup Strategist",
      category: "Ecosystem",
      quote:
        "Bridging theoretical finance with high-stakes venture pitching and market simulation is exactly how top-tier analysts are forged. Finlogue's conclaves consistently demonstrate elite institutional standards.",
      image: "/assets/team/aditya-tiwari.jpg",
    },
    {
      name: "Sidharth Pandey",
      title: "Growth Strategist",
      firm: "Private Equity Advisory & Corporate Turnarounds",
      category: "Strategy",
      quote:
        "The caliber of business problem-solving, unit economic diligence, and corporate restructuring cases tackled by Finlogue analysts reflects remarkable dedication to real-world corporate execution.",
      image: "/assets/gallery/pitch-session.jpg",
    },
    {
      name: "Siddhant Gupta",
      title: "Venture Founder",
      firm: "Early Stage Investor & Market Strategist",
      category: "Startups",
      quote:
        "From pitch defense to capital allocation, the rigorous standards maintained by Finlogue provide student analysts with an undeniable advantage in top consulting firms and investment desks.",
      image: "/assets/gallery/networking-hall.jpg",
    },
  ],
  startups: [
    { name: "SensoVision", tagline: "AI-Powered Visual Analytics", category: "DeepTech" },
    { name: "AugAid", tagline: "Assistive Health Technology", category: "HealthTech" },
    { name: "CIT-Peels", tagline: "Sustainable Biomaterials", category: "CleanTech" },
    { name: "Cubicles.com", tagline: "Flexible Workspace Systems", category: "PropTech" },
    { name: "Lokachakra", tagline: "Smart Logistics Platform", category: "Supply Chain" },
    { name: "Vzeya", tagline: "Automated Creator Commerce", category: "SaaS" },
    { name: "Eventz Book", tagline: "Unified Event Infrastructure", category: "Marketplace" },
    { name: "Drivomate", tagline: "Connected Fleet Telematics", category: "AutoTech" },
  ],
  closingCta: {
    headline: "JOIN THE NEXT GENERATION OF LEADERS",
    subline:
      "Whether you are building a company, solving a case, or analyzing the markets — your seat at the table is waiting.",
    buttonText: "CONNECT WITH US",
    href: "/contact",
  },
};
