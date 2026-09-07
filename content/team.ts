export interface TeamMember {
  name: string;
  role: string;
  dept?: string;
  batch?: string;
  focus: string;
  email: string | null;
  phone: string | null;
  image?: string;
}

export interface ContactChannel {
  platform: string;
  label: string;
  href: string;
}

export interface CoreTeamGroup {
  photo: string;
  caption: string;
}

export interface TeamContent {
  header: {
    title: string;
    subtitle: string;
  };
  coordinators: TeamMember[];
  heads: TeamMember[];
  coreTeam: CoreTeamGroup;
  contact: {
    title: string;
    subtitle: string;
    submitLabel: string;
    channels: ContactChannel[];
  };
}

export const team: TeamContent = {
  header: {
    title: "THE PEOPLE BEHIND THE HOUSE",
    subtitle: "An institutional hierarchy governed by discipline, strategic rigor, and student leadership.",
  },
  coordinators: [
    {
      name: "Aditya Tiwari",
      role: "Coordinator",
      focus: "Institutional Strategy & Leadership",
      email: null,
      phone: null,
      image: "/assets/team/aditya-tiwari.jpg",
    },
    {
      name: "Aryan Mittal",
      role: "Coordinator",
      focus: "Operations & Strategic Initiatives",
      email: null,
      phone: null,
      image: "/assets/team/aryan-mittal.jpg",
    },
    {
      name: "Akshat Thadani",
      role: "Coordinator",
      focus: "Corporate Engagements & Finance Research",
      email: null,
      phone: null,
      image: "/assets/team/akshat-thadani.jpg",
    },
  ],
  heads: [
    {
      name: "Krishna Khairnar",
      role: "Head",
      dept: "Consulting & Strategy",
      batch: "Y24",
      focus: "Case Competitions & Mentorship",
      email: null,
      phone: null,
      image: "/assets/team/krishna-khairnar.jpg",
    },
    {
      name: "Abhinav Sharma",
      role: "Head",
      dept: "Finance & Research",
      batch: "Y24",
      focus: "Markets Research & Equity Valuation",
      email: null,
      phone: null,
      image: "/assets/team/abhinav-sharma.jpg",
    },
  ],
  coreTeam: {
    photo: "/assets/team/core-y25-group.jpg",
    caption: "Core Team · Batch Y25",
  },
  contact: {
    title: "INTAKE & INQUIRIES",
    subtitle: "Submit official correspondence, advisory briefs, or partnership proposals.",
    submitLabel: "SUBMIT FOR REVIEW",
    channels: [
      {
        platform: "Instagram",
        label: "@finlogue.lnmiit",
        href: "https://www.instagram.com/finlogue.lnmiit/",
      },
      {
        platform: "LinkedIn",
        label: "Finlogue LNMIIT",
        href: "https://www.linkedin.com/company/finlogue-lnmiit/",
      },
      {
        platform: "Email",
        label: "24uec533@lnmiit.ac.in",
        href: "mailto:24uec533@lnmiit.ac.in",
      },
    ],
  },
};
