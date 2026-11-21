/**
 * Everything the portfolio says lives here, so updating it never means
 * touching the components.
 */

export const profile = {
  name: "Eyad Oraby",
  role: "Software Engineer · Mobile & Web",
  tagline:
    "I build Flutter apps people enjoy using, and the web tools behind them.",
  summary:
    "Mobile-first software engineer. Most of my work is cross-platform apps in Flutter, from login to checkout, with clean architecture (BLoC, Riverpod), offline caching and Firebase. On the web I build with Next.js, TypeScript and Postgres, and ship to production with tests and CI.",
  github: "https://github.com/EyadOraby",
  /** Leave empty to hide the email button. */
  email: "",
  location: "",
};

export type Experience = {
  title: string;
  place: string;
  period: string;
  points: string[];
};

/** Professional highlights, newest first. */
export const experience: Experience[] = [
  {
    title: "Freelance Software Engineer",
    place: "Independent",
    period: "Ongoing",
    points: [
      "Designed and shipped RSVP Studio, a multi-event RSVP builder in Next.js, Prisma and Postgres, live on Vercel with CI and 150+ tests.",
      "Delivered a custom wedding RSVP site for a client, with an admin dashboard and meal and dietary tracking.",
      "Planning a mobile app and back-office for a martial arts academy: specs, architecture decisions and delivery workflow.",
    ],
  },
  {
    title: "Flutter Developer",
    place: "Mobile projects",
    period: "2023 – present",
    points: [
      "Built Tabkha, a localized Flutter app with Firebase Auth, Cloud Firestore, Riverpod and Hive caching.",
      "Built Mini Shop, a shopping app with BLoC/Cubit state, a REST API through Dio and an offline cart in Hive.",
      "Completed the Lookfinder technical assessment: BLoC architecture, repositories and an API layer with Dio.",
    ],
  },
  {
    title: "Graduation Project",
    place: "University",
    period: "2023",
    points: [
      "A citizen services app in Flutter and Firebase: government ID and IC requests, doctor and hospital booking, and job listings.",
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "Mobile",
    items: ["Flutter", "Dart", "BLoC / Cubit", "Riverpod", "Provider", "Hive", "Localization"],
  },
  {
    group: "Web",
    items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
  },
  {
    group: "Backend & cloud",
    items: ["Firebase Auth", "Cloud Firestore", "REST APIs (Dio)", "Vercel", "Neon"],
  },
  {
    group: "Practice",
    items: ["Clean architecture", "Testing (Vitest)", "GitHub Actions CI", "Code review", "Accessibility"],
  },
];

export type Project = {
  name: string;
  kind: "Mobile" | "Web";
  summary: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  accent: string;
};

export const projects: Project[] = [
  {
    name: "RSVP Studio",
    kind: "Web",
    summary:
      "A builder for beautiful RSVP pages: ten templates and themes, a live-preview editor, guest lists with personal links and a dashboard per event.",
    highlights: [
      "Live preview builder with themes, hero layouts and design presets",
      "Guest lists, private edit links, kitchen summary and CSV export",
      "Accounts, rate limits, security headers, 150+ tests and CI",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "Postgres", "Tailwind", "Vitest"],
    links: [
      { label: "Live site", href: "https://wedding-rsvp-tau-five.vercel.app" },
      { label: "Code", href: "https://github.com/EyadOraby/wedding-rsvp" },
    ],
    accent: "#b87d8a",
  },
  {
    name: "Mini Shop",
    kind: "Mobile",
    summary:
      "A Flutter shopping app: browse and search products from a REST API, view details and keep a persistent cart.",
    highlights: [
      "BLoC/Cubit state management with repositories",
      "Dio API layer with loading and error states",
      "Cart saved offline with Hive",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Dio", "Hive"],
    links: [{ label: "Code", href: "https://github.com/EyadOraby/Mini-Shop-App" }],
    accent: "#4fb6a3",
  },
  {
    name: "Tabkha",
    kind: "Mobile",
    summary:
      "A cooking app with onboarding, authentication and a localized interface in English and Arabic.",
    highlights: [
      "Firebase Auth and Cloud Firestore",
      "Riverpod with code generation and Hive caching",
      "Language picker and full localization",
    ],
    stack: ["Flutter", "Riverpod", "Firebase", "Hive", "i18n"],
    links: [],
    accent: "#e2843b",
  },
  {
    name: "Citizen Services",
    kind: "Mobile",
    summary:
      "Graduation project: one app for government ID services, doctor and hospital bookings, and job listings.",
    highlights: [
      "Booking calendar and form flows",
      "Firebase backend with Cloud Firestore",
      "Service catalog across government, medical and jobs",
    ],
    stack: ["Flutter", "Firebase", "Firestore"],
    links: [],
    accent: "#5b8def",
  },
  {
    name: "Wedding RSVP (client)",
    kind: "Web",
    summary:
      "A custom wedding website for a client, with RSVP, meal and dietary choices, gifting details and an admin dashboard.",
    highlights: [
      "Admin dashboard for guests, meals and settings",
      "Deployed on Vercel with Postgres",
    ],
    stack: ["Next.js", "Prisma", "Postgres"],
    links: [{ label: "Live site", href: "https://youssef-wedding-rsvp.vercel.app" }],
    accent: "#c9a24b",
  },
  {
    name: "Lookfinder Task",
    kind: "Mobile",
    summary:
      "A technical assessment: location and deals browsing built with a clean BLoC architecture.",
    highlights: ["BLoC per feature", "Repository and API layer with Dio", "Reusable design constants"],
    stack: ["Flutter", "BLoC", "Dio"],
    links: [],
    accent: "#9b7cf0",
  },
];

/**
 * The hidden "Off the clock" view. Replace these with your own interests.
 */
export const hobbies: { title: string; text: string; emoji: string }[] = [
  {
    emoji: "♟️",
    title: "Chess",
    text: "Openings, endgames and the occasional blunder. Good practice for thinking a few moves ahead.",
  },
  {
    emoji: "🥋",
    title: "Martial arts",
    text: "Discipline, patience and showing up every day, on the mat and off it.",
  },
  {
    emoji: "📱",
    title: "Polishing small details",
    text: "Tweaking animations and spacing until an app feels right in the hand.",
  },
  {
    emoji: "🧠",
    title: "Learning in public",
    text: "Trying new tools, writing down what worked and turning side ideas into shipped projects.",
  },
];
