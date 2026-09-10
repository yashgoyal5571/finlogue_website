export interface ContactChannel {
  platform: string;
  handle: string;
  href: string;
  iconType: "instagram" | "linkedin" | "email" | "location";
}

export interface CoordinatorContact {
  name: string;
  role: string;
  dept: string;
  email: string;
  linkedin?: string;
  phone?: string;
}

export interface FAQItem {
  question: string;
  answer: string;
  category: "General" | "Events & Competitions" | "Startups & Funding" | "Membership";
}

export interface ContactContent {
  header: {
    badge: string;
    title: string;
    subtitle: string;
  };
  office: {
    title: string;
    campus: string;
    building: string;
    address: string;
    hours: string;
    email: string;
  };
  channels: ContactChannel[];
  coordinators: CoordinatorContact[];
  inquiryTypes: string[];
  faqs?: FAQItem[];
}

export const contact: ContactContent = {
  header: {
    badge: "CORRESPONDENCE & INTAKE",
    title: "CONNECT WITH THE HOUSE",
    subtitle:
      "Whether you are an aspiring student analyst, an early-stage founder seeking venture capital, or a corporate partner looking to collaborate, our doors are open.",
  },
  office: {
    title: "CENTRAL OFFICE",
    campus: "The LNM Institute of Information Technology",
    building: "Student Activity Center (SAC) / Finlogue Cell",
    address: "Rupa ki Nangal, Post-Sumel, Via-Jamdoli, Jaipur, Rajasthan 302031",
    hours: "Monday – Saturday: 10:00 AM – 8:00 PM IST",
    email: "finlogue@licai.lnmiit.ac.in",
  },
  channels: [
    {
      platform: "Instagram",
      handle: "@finlogue.lnmiit",
      href: "https://www.instagram.com/finlogue.lnmiit/",
      iconType: "instagram",
    },
    {
      platform: "LinkedIn",
      handle: "Entrepreneuria / Finlogue LNMIIT",
      href: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
      iconType: "linkedin",
    },
    {
      platform: "Official Dispatch",
      handle: "finlogue@licai.lnmiit.ac.in",
      href: "mailto:finlogue@licai.lnmiit.ac.in",
      iconType: "email",
    },
  ],
  coordinators: [
    {
      name: "Aditya Tiwari",
      role: "Lead Coordinator",
      dept: "Institutional Strategy & Leadership",
      email: "24uec533@lnmiit.ac.in",
      linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
    },
    {
      name: "Aryan Mittal",
      role: "Coordinator",
      dept: "Operations & Strategic Logistics",
      email: "24uec533@lnmiit.ac.in",
      linkedin: "https://www.linkedin.com/company/entrepreneuria-lnmiit/posts/?feedView=all",
    },
  ],
  inquiryTypes: [
    "Corporate Sponsorship & Brand Partnership",
    "Startup Pitch & Diligence (Pitch on the Rocks)",
    "Inter-College Case League Participation",
    "Speaker / Mentor Invitation",
    "General Inquiries & Student Collaboration",
  ],
  faqs: [
    {
      question: "How can early-stage startups apply to Pitch on the Rocks (POTR)?",
      answer:
        "Startups can apply during the open registration window via our Events portal or by submitting their pitch deck through the intake form below, selecting 'Startup Pitch & Diligence'. Selected ventures receive direct pitching slots with active angel investors and venture capitalists.",
      category: "Startups & Funding",
    },
    {
      question: "Can students from other universities participate in Finlogue competitions?",
      answer:
        "Yes! Major flagship events, national case crackers, and valuation challenges are open to students across institutes pan-India. Notifications and problem briefs are released on our Events page and official social channels.",
      category: "Events & Competitions",
    },
    {
      question: "How does Finlogue select new student members and analysts?",
      answer:
        "Inductions are conducted annually for first- and second-year students through a multi-stage process consisting of an aptitude assessment, market case analysis, and a personal interview evaluating dedication, quantitative reasoning, and curiosity.",
      category: "Membership",
    },
    {
      question: "How can corporations or venture funds partner with Finlogue?",
      answer:
        "We collaborate with financial institutions, advisory firms, and VC funds as case partners, summit sponsors, and mock jury panels. Please reach out via the inquiry form or directly to our Corporate Engagements coordinator.",
      category: "General",
    },
  ],
};
