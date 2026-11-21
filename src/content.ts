/**
 * Everything the portfolio says lives here, so updating it never means
 * touching the components.
 */

export const profile = {
  name: "Eyad Oraby",
  role: "Flutter Software Engineer · Apes Solutions",
  tagline: "I build mobile apps that make it to the App Store, and stay there.",
  summary:
    "Software engineer at Apes Solutions. I take Flutter apps from Figma to release on iOS and Android: architecture, API integration, payments, push notifications and the store submission at the end. I started out building Power BI and SAP dashboards, so data-heavy screens are home turf.",
  github: "https://github.com/EyadOraby",
  linkedin: "https://www.linkedin.com/in/eyad-oraby-30631b247/",
  /** Leave empty to hide the email button. */
  /** Path to a CV in public/ (e.g. "/cv.pdf"). Leave empty to hide the button. */
  cv: "",
  email: "eyadoraby99@gmail.com",
  location: "Giza, Egypt",
};

export type ProApp = {
  slug: string;
  name: string;
  category: string;
  year: number;
  summary: string;
  role?: string;
  stat?: { value: string; label: string };
  tags: string[];
  links: { label: string; href: string }[];
  shots: number;
  /** Background, ink and accent taken from the app's own branding. */
  colors: { bg: string; ink: string; accent: string };
  status: "Live" | "Retired";
  featured?: boolean;
};

export type Experience = {
  title: string;
  place: string;
  period: string;
  points: string[];
};

const store = (ios?: string, android?: string) => [
  ...(ios ? [{ label: "App Store", href: `https://apps.apple.com/eg/app/${ios}` }] : []),
  ...(android ? [{ label: "Google Play", href: `https://play.google.com/store/apps/details?id=${android}` }] : []),
];

/** Production apps shipped to the App Store and Google Play. Screens come from each store listing. */
export const proApps: ProApp[] = [
  {
    slug: "spark-entertainment",
    name: "Spark",
    category: "Booking & sports",
    year: 2025,
    summary:
      "Discover and book sports, adventures, wellness sessions and experiences. Venue, event and class listings, secure checkout and paid memberships.",
    stat: { value: "4.8★", label: "from 244 ratings on the App Store" },
    tags: ["Bookings", "Memberships", "Payments"],
    links: store("spark-entertainment/id6739362680", "com.apessmartsolutions.spark"),
    shots: 3,
    colors: { bg: "#2d2d2d", ink: "#F3F6EC", accent: "#C6F43A" },
    status: "Live",
    featured: true,
  },
  {
    slug: "aisu",
    name: "AISU",
    category: "Industry data · Arab Iron and Steel Union",
    year: 2026,
    summary:
      "Official app of the Arab Iron and Steel Union. Steel prices with interactive charts, production and trade statistics, the Arab Steel Map, industry news, a member directory and a glossary, in Arabic and English.",
    role: "Mobile developer, building the Flutter app alongside the product and backend teams.",
    tags: ["Price charts", "Industry statistics", "Arabic RTL · English"],
    links: store("aisu/id6799080208", "com.apessmartsolutions.aisuMobile"),
    shots: 5,
    colors: { bg: "#13407a", ink: "#FFFFFF", accent: "#E8B84A" },
    status: "Live",
    featured: true,
  },
  {
    slug: "arab-steel-summit",
    name: "Arab Steel Summit",
    category: "Events · 19th Summit, Cairo",
    year: 2026,
    summary:
      "Event app for the Arab Iron and Steel Union's annual summit, updated for the 19th Arab Steel Summit in Cairo: agenda, speakers, sponsors, exhibitors and attendee registration.",
    role: "Led the full UI revamp for the 2026 edition and shipped fixes and updates through the event.",
    tags: ["UI revamp", "Agenda", "Exhibitors"],
    links: store("arab-steel-summit/id6752536030", "com.apessmartsolutions.arabsteelsummit"),
    shots: 3,
    colors: { bg: "#bfc9dc", ink: "#0F2444", accent: "#13407A" },
    status: "Live",
    featured: true,
  },
  {
    slug: "egypt-international-boat-show",
    name: "Egypt International Boat Show",
    category: "Events",
    year: 2025,
    summary: "Official app for the Egypt International Boat Show: the event guide, exhibitors and a look back at past editions.",
    tags: ["Event guide", "Exhibitors", "Past editions"],
    links: store("egypt-international-boat-show/id6755657894", "com.apessmartsolutions.eibs.prod"),
    shots: 3,
    colors: { bg: "#025866", ink: "#F0FAFA", accent: "#8FE3EA" },
    status: "Live",
    featured: true,
  },
  {
    slug: "inspkt",
    name: "INSPKT",
    category: "Business tools",
    year: 2026,
    summary:
      "Car inspection platform. Inspectors manage bookings and work through detailed vehicle checklists with photos, so buyers can pick the right car.",
    tags: ["Inspection checklists", "Photo uploads", "Bookings"],
    links: store("inspkt/id6757188921"),
    shots: 4,
    colors: { bg: "#000000", ink: "#F5F5F5", accent: "#9DB4E6" },
    status: "Live",
    featured: true,
  },
  {
    slug: "hpadel",
    name: "HPadel",
    category: "Booking & sports",
    year: 2024,
    summary: "Padel court booking. Find a location, reserve a court, keep track of your bookings and follow community news.",
    tags: ["Court booking", "Calendar", "News feed"],
    links: store("hpadel/id6450797965", "com.apessmartsolutions.hpadelapp"),
    shots: 4,
    colors: { bg: "#24538e", ink: "#FFFFFF", accent: "#FF7A55" },
    status: "Live",
    featured: true,
  },
  {
    slug: "spark-merchant",
    name: "Spark Merchant",
    category: "Business tools",
    year: 2025,
    summary: "The vendor side of Spark: upcoming bookings, customer details and live updates for venues.",
    tags: ["Vendor dashboard", "Live updates"],
    links: store("spark-merchant/id6743125434", "com.apessmartsolutions.sparkadmin"),
    shots: 3,
    colors: { bg: "#303030", ink: "#F3F6EC", accent: "#A8F030" },
    status: "Live",
  },
  {
    slug: "riseup",
    name: "RiseUp",
    category: "Events",
    year: 2024,
    summary: "Companion app for the RiseUp Summit startup event: agenda, speakers, workshops and exhibitors.",
    tags: ["Agenda", "Speakers"],
    links: store("riseup/id6498714758", "com.apessmartsolutions.riseup"),
    shots: 3,
    colors: { bg: "#47518f", ink: "#FFFFFF", accent: "#F5D547" },
    status: "Live",
  },
  {
    slug: "padbol-egypt",
    name: "Padbol Egypt",
    category: "Booking & sports",
    year: 2025,
    summary: "Book Padbol courts in a few taps: nearest location, open slots and your bookings.",
    tags: ["Court booking", "Locations"],
    links: store("padbol-egypt/id6745130436", "com.apessmartsolutions.padbolegypt"),
    shots: 3,
    colors: { bg: "#232323", ink: "#F5F5F5", accent: "#FF4040" },
    status: "Live",
  },
  {
    slug: "tamreena",
    name: "Tamreena",
    category: "Health & fitness",
    year: 2024,
    summary: "Tailored workout plans, personalised meal plans and progress tracking in one app.",
    tags: ["Workouts", "Meal plans"],
    links: store("tamreena/id6475480492", "com.apessmartsolutions.tamreena"),
    shots: 3,
    colors: { bg: "#FFFFFF", ink: "#1B1B1B", accent: "#D9661B" },
    status: "Live",
  },
  {
    slug: "footfit",
    name: "FootFit",
    category: "Booking & sports",
    year: 2025,
    summary: "Football training: book sessions, buy packages, check in by QR code and earn rewards.",
    tags: ["Packages", "QR check-in", "Rewards"],
    links: store("footfit/id6742765982", "com.footfit.mena"),
    shots: 3,
    colors: { bg: "#141414", ink: "#F5F5F5", accent: "#E8C84A" },
    status: "Live",
  },
  {
    slug: "bullsports-club",
    name: "Bullsports Club",
    category: "Booking & sports",
    year: 2026,
    summary: "Multi-sport club app: see the sports at each location and book a court in seconds.",
    tags: ["Multi-sport", "Booking"],
    links: store("bullsports-club/id6761111292"),
    shots: 3,
    colors: { bg: "#434041", ink: "#F7F5F5", accent: "#FF5A5A" },
    status: "Live",
  },
  {
    slug: "smash-padel",
    name: "Smash Padel",
    category: "Booking & sports",
    year: 2023,
    summary: "Booking app for Smash Padel Academy in Sheikh Zayed: locations, coaches and training packages.",
    tags: ["Coaches", "Packages"],
    links: store("smash-padel/id1662258177"),
    shots: 3,
    colors: { bg: "#0e92d5", ink: "#FFFFFF", accent: "#FFE36B" },
    status: "Live",
  },
  {
    slug: "eventbeez",
    name: "EventBeez",
    category: "Events",
    year: 2023,
    summary: "Event management in your pocket: attendees, sessions, workshops and seminars.",
    tags: ["Attendees", "Sessions"],
    links: store("eventbeez/id6461975231"),
    shots: 3,
    colors: { bg: "#ffde80", ink: "#1A1A1A", accent: "#1A1A1A" },
    status: "Live",
  },
  {
    slug: "status-strong",
    name: "Status Strong",
    category: "Mental wellness · iOS",
    year: 2024,
    summary:
      "Daily check-ins, a personal dashboard to track mood trends, and accountability partners for support. Built during my time at Status Strong.",
    tags: ["Check-ins", "Mood trends"],
    links: [],
    shots: 3,
    colors: { bg: "#1d2a3a", ink: "#F2F5F9", accent: "#7FB2FF" },
    status: "Retired",
  },
];

/** Apps delivered without public store screens. */
export const alsoDelivered = ["Galasa", "Cairo Talents", "Views Real Estate"];

/** Professional roles, newest first. */
export const experience: Experience[] = [
  {
    title: "Software Engineer",
    place: "Apes Solutions · Cairo",
    period: "Feb 2025 – Present",
    points: [
      "Lead end-to-end Flutter delivery, from Figma handoff and architecture to App Store and Google Play release.",
      "Shipped apps including Spark and Spark Merchant, AISU, Egypt International Boat Show, INSPKT, Padbol Egypt, FootFit and Bullsports Club.",
      "Led the UI revamp of the Arab Steel Summit app for the 19th Summit in Cairo (Nov 2026).",
      "Design REST contracts with backend engineers; integrate Firebase Auth, FCM push, Paymob payments and Strapi CMS.",
      "Build data-heavy screens: vendor dashboards, KPI views, maps and charts.",
    ],
  },
  {
    title: "Flutter Developer",
    place: "Talento · Remote",
    period: "Dec 2024 – Feb 2025",
    points: [
      "Built a reusable UI component library that kept screens consistent and sped up feature delivery.",
      "Reworked API handling and caching to lower response times and improve reliability.",
    ],
  },
  {
    title: "Junior Flutter Developer",
    place: "Status Strong · Remote",
    period: "Jul 2024 – Dec 2024",
    points: [
      "Cut screen load times by about 20% through rendering and rebuild optimisations.",
      "Helped migrate the app to a modular architecture so several developers could work in parallel.",
    ],
  },
  {
    title: "Junior Flutter Developer",
    place: "Apes Solutions · Cairo",
    period: "Jul 2023 – Nov 2023",
    points: ["Delivered core modules for Smash Padel and Views Real Estate, including REST integration and paginated feeds."],
  },
  {
    title: "Data & product internships",
    place: "Gameball · MEGA · eTax",
    period: "2022 – 2023",
    points: [
      "Power BI KPI dashboards at MEGA for Construction; SAP BusinessObjects dashboards at eTax; product and analytics at Gameball.",
    ],
  },
];

export const education: { school: string; degree: string; highlight?: string }[] = [
  {
    school: "Arab Academy for Science & Technology",
    degree: "B.Sc. Business Information Systems · 2020–2023",
    highlight: "3.88 GPA · honors, ranked 4th in class",
  },
  { school: "American University in Cairo", degree: "Computer Engineering coursework · 2017–2020" },
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
  { group: "Mobile", items: ["Flutter", "Dart", "Riverpod", "BLoC / Cubit", "Provider", "GoRouter", "Hive", "Build flavors"] },
  {
    group: "Backend & services",
    items: ["REST APIs", "Dio", "Firebase Auth", "Firestore", "FCM push", "Paymob", "Strapi"],
  },
  { group: "Data & dashboards", items: ["Power BI", "SAP BusinessObjects", "SQL", "R", "Flutter charts"] },
  {
    group: "Web & delivery",
    items: ["Next.js", "TypeScript", "Git", "GitHub Actions", "Patrol", "Maestro", "Postman", "Figma"],
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
    tagline: "A complete Flutter store: browse, save, check out and track orders, in light or dark.",
    problem:
      "Shopping apps live or die on the basics: a fast catalog, a cart you trust, a checkout that doesn't fight you, and a store that still opens when the network doesn't.",
    approach:
      "BLoC/Cubit state over repositories, with pricing, promo codes and shipping in one tested CartSummary. Storage sits behind a small KeyValueStore (Hive in the app, memory in tests), and the catalog falls back from the API to a cached copy to a bundled one.",
    outcome:
      "Wishlist, cart with undo, promo codes, a three-step checkout, order tracking and dark mode, on Android, iOS and the web, with 19 tests and CI that deploys the demo on every merge.",
    highlights: [
      "Three-step checkout with validation and an animated confirmation",
      "Order history with a processing, shipped and delivered timeline",
      "Works offline: API, then cached catalog, then bundled catalog",
    ],
    stack: ["Flutter", "Dart", "BLoC", "Dio", "Hive"],
    links: [
      { label: "Live demo", href: "https://eyadoraby.github.io/Mini-Shop-App/?demo=1" },
      { label: "Code", href: "https://github.com/EyadOraby/Mini-Shop-App" },
    ],
    shots: [
      phone("shop-home", "Mini Shop storefront: search, promo banner, categories and rated products", "jpg"),
      phone("shop-detail", "A product with rating, perks and a sticky add-to-cart bar", "jpg"),
      phone("shop-cart", "Cart with steppers, promo code and order summary", "jpg"),
      phone("shop-checkout", "Three-step checkout: delivery, payment and review", "jpg"),
      phone("shop-orders", "Order history with a delivery timeline", "jpg"),
      desktop("shop-desktop", "Mini Shop on the web with a wide product grid", "jpg"),
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
    context: "Personal · live demo",
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
    links: [
      { label: "Live demo", href: "https://eyadoraby.github.io/tabkha_app/?screen=home" },
      { label: "Code", href: "https://github.com/EyadOraby/tabkha_app" },
    ],
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
      "Revived in 2026: upgraded from Dart 2 to current Flutter, redesigned in an emerald and gold government style, fixed sign-out and navigation, and added tests, CI and a web demo.",
    highlights: [
      "ID renewal and integrated services card requests",
      "Doctors, hospitals, radiology and physiotherapy with booking",
      "Web deep links for demos, covered by tests",
    ],
    stack: ["Flutter", "Dart 3", "Material 3", "Firebase"],
    links: [
      { label: "Live demo", href: "https://eyadoraby.github.io/grad/" },
      { label: "Code", href: "https://github.com/EyadOraby/grad" },
    ],
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
export const metrics: { value: number; decimals?: number; suffix: string; label: string }[] = [
  { value: 17, suffix: "", label: "apps shipped to the stores" },
  { value: 4.8, decimals: 1, suffix: "★", label: "Spark, from 244 ratings" },
  { value: 3, suffix: "+ yrs", label: "Flutter in production" },
  { value: projects.length, suffix: "", label: "open-source projects" },
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
