/**
 * Everything the portfolio says lives here, so updating it never means
 * touching the components.
 */

export const profile = {
  name: "Eyad Oraby",
  role: "Software Engineer · Mobile & Web",
  tagline: "I build Flutter apps people enjoy using, and the web products behind them.",
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

/** How I work: shown on the Work view. */
export const principles: { title: string; text: string }[] = [
  {
    title: "Architecture before features",
    text: "Clear layers (UI, state, repositories, services) so screens stay thin and data sources can change without rewrites.",
  },
  {
    title: "Tested and automated",
    text: "Unit tests on the logic that matters, CI on every pull request and deploys that happen on merge, not by hand.",
  },
  {
    title: "Small, reviewable changes",
    text: "Stacked pull requests with short, specific commits, so every change is easy to review and easy to roll back.",
  },
  {
    title: "Details people feel",
    text: "Loading, empty and error states, accessibility and motion that respects reduced-motion settings.",
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

export type Shot = {
  src: string;
  alt: string;
  device: "desktop" | "phone";
};

export type Project = {
  slug: string;
  name: string;
  kind: "Mobile" | "Web";
  context: string;
  tagline: string;
  problem: string;
  approach: string;
  outcome: string;
  highlights: string[];
  stack: string[];
  links: { label: string; href: string }[];
  shots: Shot[];
  accent: string;
};

const desktop = (src: string, alt: string): Shot => ({ src: `/shots/${src}.png`, alt, device: "desktop" });
const phone = (src: string, alt: string): Shot => ({ src: `/shots/${src}.png`, alt, device: "phone" });

export const projects: Project[] = [
  {
    slug: "rsvp-studio",
    name: "RSVP Studio",
    kind: "Web",
    context: "Product · live",
    tagline: "A builder for RSVP pages, with a live-preview editor and a dashboard per event.",
    problem:
      "Hosts juggle spreadsheets, group chats and generic form tools to collect replies, meals and plus-ones, and the result rarely looks like their event.",
    approach:
      "A Next.js App Router product on Postgres: a builder with ten templates and live preview, guest lists with private edit links, and server-side validation with zod shared by the form and the API.",
    outcome:
      "Live on Vercel with Neon Postgres, 150+ tests in CI, rate limits and security headers, and deploys on every merge.",
    highlights: [
      "Live-preview builder: templates, themes, hero layouts and section ordering",
      "Guest lists, personal invite links and edits without accounts",
      "Kitchen summary for meals and dietary needs, plus CSV export",
    ],
    stack: ["Next.js", "TypeScript", "Prisma", "Postgres", "Tailwind", "Vitest"],
    links: [
      { label: "Live site", href: "https://wedding-rsvp-tau-five.vercel.app" },
      { label: "Code", href: "https://github.com/EyadOraby/wedding-rsvp" },
    ],
    shots: [
      desktop("rsvp-builder", "RSVP Studio builder: design presets on the left, live preview of the invitation on the right"),
      desktop("rsvp-dashboard", "Event dashboard with reply counts and recent responses"),
      desktop("rsvp-guest-list", "Guest list with invite status and personal links"),
      desktop("rsvp-landing", "RSVP Studio landing page"),
    ],
    accent: "#d08a9a",
  },
  {
    slug: "mini-shop",
    name: "Mini Shop",
    kind: "Mobile",
    context: "Personal · live demo",
    tagline: "A Flutter shopping app with search, filters and a cart that survives restarts.",
    problem:
      "Shopping apps live or die on the basics: a fast catalog, search that just works, and a cart that is still there tomorrow, even offline.",
    approach:
      "BLoC/Cubit state over repositories, a Dio API layer, and a Hive-backed cart. Search, category and sort live in one state object and are applied in one place.",
    outcome:
      "Runs on Android, iOS and the web from one codebase. CI analyzes, tests and publishes the web build to GitHub Pages.",
    highlights: [
      "Category chips, sorting and search combined in one tested getter",
      "Pull to refresh, loading and friendly retry states",
      "Responsive grid and a hero transition into product details",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Dio", "Hive"],
    links: [
      { label: "Live demo", href: "https://eyadoraby.github.io/Mini-Shop-App/" },
      { label: "Code", href: "https://github.com/EyadOraby/Mini-Shop-App" },
    ],
    shots: [
      phone("shop-mobile", "Mini Shop on a phone: search, category chips and a product grid"),
      desktop("shop-desktop", "Mini Shop on the web with a wider, responsive grid"),
    ],
    accent: "#4fb6a3",
  },
  {
    slug: "wedding-invitation",
    name: "Wedding Invitation",
    kind: "Web",
    context: "Client work · showcase",
    tagline: "A mobile-first wedding site with RSVP, meals and dietary needs, and an admin view.",
    problem:
      "A couple wanted one elegant link for every guest: the story, the schedule, and an RSVP that told the kitchen exactly what to cook.",
    approach:
      "Built first as a custom site for the client, then generalized into RSVP Studio's Timeless template. Shown here with demo data so the client's guests stay private.",
    outcome:
      "Guests reply in under a minute on their phones, and the hosts get a live headcount and a kitchen summary instead of a spreadsheet.",
    highlights: [
      "Script title, serif type and a calm, printed-invitation feel",
      "RSVP with attendance, meals, dietary needs and a message",
      "Add to calendar and a schedule for the day",
    ],
    stack: ["Next.js", "Prisma", "Postgres", "Tailwind"],
    links: [],
    shots: [
      phone("rsvp-mobile", "Wedding invitation for Layla and Omar on a phone"),
      phone("rsvp-mobile-form", "The RSVP form on a phone: name, attendance and a message"),
      desktop("rsvp-event-page", "The same invitation on a desktop browser"),
    ],
    accent: "#c9a24b",
  },
  {
    slug: "tabkha",
    name: "Tabkha",
    kind: "Mobile",
    context: "Personal · private repo",
    tagline: "A cooking app with onboarding, accounts and a fully localized interface.",
    problem: "Recipe apps often ignore Arabic speakers, and switching language mid-session usually breaks layouts.",
    approach:
      "Riverpod with code generation for state, Firebase Auth and Firestore for data, Hive for caching, and right-to-left aware layouts.",
    outcome: "English and Arabic with a live language picker, offline-friendly caching and a clean onboarding flow.",
    highlights: ["Firebase Auth and Cloud Firestore", "Riverpod with code generation", "Language picker and full localization"],
    stack: ["Flutter", "Riverpod", "Firebase", "Hive", "i18n"],
    links: [],
    shots: [],
    accent: "#e2843b",
  },
  {
    slug: "citizen-services",
    name: "Citizen Services",
    kind: "Mobile",
    context: "Graduation project",
    tagline: "One app for government ID requests, doctor and hospital bookings, and job listings.",
    problem: "Everyday services were spread across offices, phone lines and websites with no single place to start.",
    approach: "A Flutter app on Firebase with a shared booking calendar and form flows reused across every service type.",
    outcome: "A single catalog across government, medical and jobs, with bookings stored in Cloud Firestore.",
    highlights: ["Booking calendar and form flows", "Firebase backend with Cloud Firestore", "Service catalog across three domains"],
    stack: ["Flutter", "Firebase", "Firestore"],
    links: [],
    shots: [],
    accent: "#5b8def",
  },
  {
    slug: "lookfinder",
    name: "Lookfinder",
    kind: "Mobile",
    context: "Technical assessment",
    tagline: "Location and deals browsing built with a clean BLoC architecture.",
    problem: "A timed assessment: show deals by location with clean, reviewable architecture.",
    approach: "One BLoC per feature, repositories over a Dio API layer, and shared design constants.",
    outcome: "A codebase reviewers can follow in minutes, with each feature isolated and testable.",
    highlights: ["BLoC per feature", "Repository and API layer with Dio", "Reusable design constants"],
    stack: ["Flutter", "BLoC", "Dio"],
    links: [],
    shots: [],
    accent: "#9b7cf0",
  },
];

/** Headline numbers for the home screen. */
export const metrics: { value: number; suffix: string; label: string }[] = [
  { value: projects.length, suffix: "", label: "shipped projects" },
  { value: projects.filter((p) => p.kind === "Mobile").length, suffix: "", label: "Flutter apps" },
  { value: 150, suffix: "+", label: "automated tests" },
  { value: 2, suffix: "", label: "live production apps" },
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
