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
  email: "eyadoraby99@gmail.com",
  location: "Giza, Egypt",
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
      "Built Tabkha, a bilingual recipe app with Riverpod 3, Firebase Auth, Hive and a REST API, and upgraded it to current Flutter.",
      "Built Mini Shop, a shopping app with BLoC/Cubit state, a REST API through Dio and an offline cart in Hive.",
      "Completed the Lookfinder technical assessment: BLoC architecture, repositories and an API layer with Dio.",
    ],
  },
  {
    title: "Graduation Project",
    place: "University",
    period: "2023",
    points: [
      "SANAD, a citizen services app in Flutter: government ID and IC requests, doctor and hospital booking, and job listings. Revived on current Flutter with tests and CI in 2026.",
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

const desktop = (src: string, alt: string, ext = "png"): Shot => ({ src: `/shots/${src}.${ext}`, alt, device: "desktop" });
const phone = (src: string, alt: string, ext = "png"): Shot => ({ src: `/shots/${src}.${ext}`, alt, device: "phone" });

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
    tagline: "A bilingual cooking app: browse and search recipes, follow the steps and keep favourites.",
    problem:
      "Most recipe apps ignore Arabic speakers, and switching language mid-session usually breaks layouts.",
    approach:
      "Riverpod 3 providers over TheMealDB for categories, search and recipes, Firebase Auth for accounts with a guest mode, Hive for favourites, and right-to-left aware layouts with live language switching.",
    outcome:
      "English and Arabic throughout, favourites that survive restarts, and an injectable API client tested against a mock HTTP client in CI.",
    highlights: [
      "Search with debounce, category strip and a responsive recipe grid",
      "Recipe details with ingredients, measures and numbered steps",
      "Upgraded to current Flutter, Riverpod 3 and hive_ce",
    ],
    stack: ["Flutter", "Riverpod", "Firebase Auth", "Hive", "REST", "i18n"],
    links: [],
    shots: [
      phone("tabkha-home", "Tabkha home on a phone: search, recipe categories and a grid of chicken dishes", "jpg"),
      phone("tabkha-recipe", "A Tabkha recipe with its photo, cuisine and ingredient list", "jpg"),
      phone("tabkha-login", "Tabkha sign-in screen with a continue-as-guest option"),
      desktop("tabkha-desktop", "Tabkha on the web with a six-column recipe grid", "jpg"),
    ],
    accent: "#2a8056",
  },
  {
    slug: "sanad",
    name: "SANAD",
    kind: "Mobile",
    context: "Graduation project",
    tagline: "One app for government ID requests, doctor and hospital bookings, and job listings.",
    problem: "Everyday public services in Egypt are spread across offices, phone lines and websites, with no single place to start.",
    approach:
      "A Flutter app with one catalog for government, medical and job services, shared booking flows with date and time pickers, and Material 3 navigation between sections.",
    outcome:
      "Revived in 2026: upgraded from Dart 2 to current Flutter, replaced discontinued packages, fixed sign-out and navigation, and added tests and CI.",
    highlights: [
      "ID renewal and integrated services card requests",
      "Doctors, hospitals, radiology and physiotherapy with booking",
      "Web deep links for demos, covered by tests",
    ],
    stack: ["Flutter", "Dart 3", "Material 3", "Firebase"],
    links: [],
    shots: [
      phone("sanad-home", "SANAD home: what's new and the services on offer"),
      phone("sanad-medical", "SANAD medical services: doctors, hospitals, radiology and physiotherapy"),
      phone("sanad-doctors", "SANAD doctors list with specialties, days, hours and ratings"),
      phone("sanad-login", "SANAD sign-in with a national ID"),
    ],
    accent: "#5fa35a",
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

export type Pastime = {
  slug: string;
  title: string;
  emoji: string;
  status: "Active" | "Exploring";
  tagline: string;
  overview: string;
  tiles: { label: string; value: string }[];
  notes: string[];
  accent: string;
};

/** The hidden "Off the clock" view: life away from the keyboard. */
export const hobbies: Pastime[] = [
  {
    slug: "chess",
    title: "Chess",
    emoji: "♟️",
    status: "Active",
    tagline: "Thinking a few moves ahead.",
    overview:
      "Openings, endgames and the occasional blunder. Chess is the hobby that feels closest to engineering: you weigh options, picture what happens next and commit.",
    tiles: [
      { label: "What I enjoy", value: "Openings and endgames" },
      { label: "It teaches me", value: "Patience and planning" },
      { label: "Shows up in code as", value: "Edge cases first" },
    ],
    notes: [
      "Calculating a line before moving is a lot like reasoning through a change before writing it.",
      "Losing a game to one careless move is a good reminder to review my own work.",
    ],
    accent: "#c9b38a",
  },
  {
    slug: "martial-arts",
    title: "Martial arts",
    emoji: "🥋",
    status: "Active",
    tagline: "Discipline, on the mat and off it.",
    overview:
      "Training is about showing up every day, drilling the basics until they are automatic and staying calm under pressure.",
    tiles: [
      { label: "What I enjoy", value: "Technique and drilling" },
      { label: "It teaches me", value: "Discipline and focus" },
      { label: "Shows up in code as", value: "Consistent habits" },
    ],
    notes: [
      "Small, repeated practice beats occasional bursts of effort.",
      "Respect for the people you train with carries over to every team.",
    ],
    accent: "#e2574c",
  },
  {
    slug: "basketball",
    title: "Basketball",
    emoji: "🏀",
    status: "Active",
    tagline: "Fast breaks and reading the court.",
    overview:
      "Pick-up games with friends. Basketball rewards quick decisions, good spacing and knowing when to pass instead of forcing the shot.",
    tiles: [
      { label: "What I enjoy", value: "Pick-up games" },
      { label: "It teaches me", value: "Quick decisions" },
      { label: "Shows up in code as", value: "Team over hero ball" },
    ],
    notes: ["The best plays usually come from the extra pass, and the best code from a second pair of eyes."],
    accent: "#f08a3c",
  },
  {
    slug: "football",
    title: "Football",
    emoji: "⚽",
    status: "Active",
    tagline: "Playing with friends, watching the big matches.",
    overview: "Football is where I switch off: a match with friends during the week and the big games at the weekend.",
    tiles: [
      { label: "What I enjoy", value: "Playing and watching" },
      { label: "It teaches me", value: "Playing a role" },
      { label: "Shows up in code as", value: "Clear ownership" },
    ],
    notes: ["Every position matters, and a team works when everyone knows their part."],
    accent: "#4fb6a3",
  },
  {
    slug: "travelling",
    title: "Travelling",
    emoji: "✈️",
    status: "Active",
    tagline: "New cities, new food, new ways of doing things.",
    overview:
      "Seeing how other places solve everyday problems, from transport to street food, is the best way I know to get fresh ideas.",
    tiles: [
      { label: "What I enjoy", value: "Cities and food" },
      { label: "It teaches me", value: "Adapting quickly" },
      { label: "Shows up in code as", value: "Designing for everyone" },
    ],
    notes: ["Using apps in a new country and language is the fastest way to notice what makes software friendly."],
    accent: "#5b8def",
  },
  {
    slug: "coins-and-banknotes",
    title: "Coins and banknotes",
    emoji: "💵",
    status: "Active",
    tagline: "A small history lesson in every piece.",
    overview:
      "A growing collection of coins and currency from different countries and eras. Each piece says something about where it came from and when.",
    tiles: [
      { label: "What I enjoy", value: "Finding rare pieces" },
      { label: "It teaches me", value: "Attention to detail" },
      { label: "Shows up in code as", value: "Caring about the small stuff" },
    ],
    notes: ["Collecting is mostly about noticing details others walk past, which is half of good UI work."],
    accent: "#c9a24b",
  },
];

/** Areas of tech I follow for fun, beyond day-to-day app work. */
export const interests: Pastime[] = [
  {
    slug: "devops",
    title: "DevOps",
    emoji: "⚙️",
    status: "Exploring",
    tagline: "The machinery that gets code to users safely.",
    overview:
      "CI/CD, containers and infrastructure as code. Every project in this portfolio already ships through automated checks, and I want to go deeper into the platform side.",
    tiles: [
      { label: "Already using", value: "GitHub Actions, Vercel deploys" },
      { label: "Exploring", value: "Docker, infrastructure as code" },
      { label: "Why", value: "Shipping is part of the job" },
    ],
    notes: ["Every pull request in my projects runs typecheck, tests and a build before it can merge."],
    accent: "#2088ff",
  },
  {
    slug: "networking",
    title: "Networking",
    emoji: "🌐",
    status: "Exploring",
    tagline: "What happens between a tap and a response.",
    overview: "TCP/IP, DNS, routing and CDNs: the path a request takes from a phone to a server and back.",
    tiles: [
      { label: "Already using", value: "REST APIs, HTTP clients" },
      { label: "Exploring", value: "TCP/IP, DNS, CDNs" },
      { label: "Why", value: "Faster, sturdier apps" },
    ],
    notes: ["Knowing where latency comes from makes loading states and caching decisions much easier."],
    accent: "#4fd1a5",
  },
  {
    slug: "cybersecurity",
    title: "Cybersecurity",
    emoji: "🔐",
    status: "Exploring",
    tagline: "Building things that are harder to break.",
    overview: "Threat models, secure defaults and how real attacks work, so the apps I build protect the people using them.",
    tiles: [
      { label: "Already using", value: "Rate limits, security headers, hashed passwords" },
      { label: "Exploring", value: "OWASP Top 10, threat modelling" },
      { label: "Why", value: "Users trust us with their data" },
    ],
    notes: ["RSVP Studio uses rate limits, security headers and scrypt password hashing from day one."],
    accent: "#9b7cf0",
  },
  {
    slug: "computer-architecture",
    title: "Computer architecture",
    emoji: "🧮",
    status: "Exploring",
    tagline: "The layer underneath every abstraction.",
    overview: "CPUs, pipelines, memory hierarchies and caches: how the hardware actually runs the code we write.",
    tiles: [
      { label: "Exploring", value: "Pipelines, caches, memory" },
      { label: "Why", value: "Performance starts below the framework" },
      { label: "Favourite idea", value: "Locality of reference" },
    ],
    notes: ["Understanding caches explains why some code is fast and some is not, whatever the language."],
    accent: "#ff8a65",
  },
];

export const pastimes: Pastime[] = [...hobbies, ...interests];
