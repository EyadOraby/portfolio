# Master plan

Everything discussed and not yet done, in one place. Tick items as they land. Updated 2026-11-22.

## Decisions so far (22 Nov 2026)

- **Mini Shop → The Maker's Market:** a shop for Egyptian handmade crafts and home goods, with products from named makers. The look is earthy, patterned and story-led.
- **Tabkha:** warm home kitchen. Cream, terracotta and herb green, hand-drawn ingredient illustrations, a friendly rounded serif.
- **SANAD:** calm civic. Deep teal and sand, generous spacing, simple geometric illustrations, very high legibility.
- **Portfolio:** keep the current concept and animations, and add a designed background that the animated character lives in.
  - *Professional part:* suit and white-shirt style. Bright and energetic, even in dark mode, saying "open to work, ready for anything".
  - *Personal part:* a mix of interests where each space or corner is one interest or hobby, possibly with a small mini game as a showcase.
  - *Corners:* computers and tech, travel, a collector's area for cars and motorbikes, sports and fitness, gaming, reading and learning.
  - *Mini game:* explore an illustrated room through guided navigation. The visitor moves between set points rather than roaming freely, with short interactive moments between stops. Each stop opens one interest.
- **CV:** local extraction checks first, then an online ATS checker (approved by Eyad).

## How work runs (workflow)

1. **Decide:** design choices come from Eyad first (style, names, fonts, colours). Nothing gets built on a guess.
2. **Direction board:** for each project, one page with palette, type, icon style, illustration style and two key screens. Eyad approves it before any code.
3. **Build:** one branch per piece (`type/short-kebab`), small PRs, CI green, then merge and deploy.
4. **Check:** run the screen tests (EN/AR, phone/desktop), Lighthouse and a screenshot pass on the live site.
5. **Record:** update `STATUS.md` and this file, and refresh the portfolio screenshots.

## Design rules (all projects)

The goal is work that looks designed by a person, not generated.

- **One idea per brand.** Each app gets its own personality, palette, typeface pair, icon set and illustration style. Nothing is shared between apps except quality.
- **No generic AI look:** no purple-blue gradients, glassy blobs, sparkle icons, stock 3D people, emoji as icons, or "Welcome back 👋" copy.
- **Real typography:** a paired display and text face per brand, and an Arabic face chosen to match it rather than a fallback.
- **Hand-tuned illustration:** a consistent, limited style (line weight, palette and shapes) per brand. AI tools may give a starting point, but every final asset is redrawn or edited as vector so it is consistent and clean.
- **Icons:** one family per app (for example Phosphor, Lucide, Tabler or a custom set), never mixed.
- **Copy:** short, specific, human. Real-sounding data in demos.
- **Accessible by default:** 4.5:1 contrast, 44 px touch targets, screen-reader labels, RTL checked.

## To-do list

### 1. Portfolio: clean, well furnished
- [ ] Direction board: refined palette, type pair (Latin + Arabic), spacing scale, motion rules
- [ ] Redesign pass on every section with more whitespace, an aligned grid and fewer competing elements
- [ ] Illustrated character (see `CHARACTER_PLAN.md`)
  - [ ] Eyad sends 1–2 clear front photos
  - [ ] Choose the tool (paid or free) and lock a character sheet (front, side, expressions)
  - [ ] Scenes: hero wave, desk (freelance), video call (professional), one per hobby, footer point
  - [ ] Clean up as vector or WebP, keep stills under 120 KB, add a still pose for reduced motion
  - [ ] `Character` component, placed per the plan, light and dark mode checked
- [ ] Fix the open report findings: Smash Padel card contrast, Arabic heading layout shift
- [ ] Personalise the hobby details in `src/content.ts`
- [ ] Designed background in the current concept, with the character blending into the existing animations
- [ ] Professional part: white shirt and suit look, bright and energetic in both themes, "open to work" message
- [ ] Personal part: one corner per interest (tech, travel, cars and motorbikes collection, sports, gaming, reading)
- [ ] Guided room-exploration mini game: set waypoints, short interactions between stops, works with touch and keyboard, with a skip and reduced-motion version
- [ ] New screenshots of the redesigned apps

### 2. Tabkha: full UI/UX redesign
- [ ] Brand: name stays; personality, palette, type pair, icon family, illustration style
- [ ] UX review of the order flow (browse, item, cart, checkout, tracking) and the admin and courier views
- [ ] Redesign every screen for phone, tablet and desktop, in English and Arabic
- [ ] Custom illustrations: empty states, onboarding, success and errors
- [ ] New app icon, splash screen and landing page in the new brand
- [ ] Screen smoke tests (same pattern as SANAD)
- [ ] Waiting on Eyad: Firebase authorised domain for web sign-in

### 3. SANAD: full UI/UX redesign
- [ ] Brand: civic and trustworthy, accessibility first; personality, palette, type pair, icon family, illustration style
- [ ] UX review: services, applications, appointments, Activity, accessibility settings, staff portal
- [ ] Redesign every screen (the older form pages are the weakest), phone, tablet and desktop, EN and AR
- [ ] Custom illustrations for each service area and for empty states
- [ ] New app icon, splash screen and landing page

### 4. Mini Shop: rename and full redesign
- [x] New name and focus: The Maker's Market, Egyptian handmade crafts and home goods
- [ ] Rename everywhere: app name, package and bundle IDs, repo, Pages URL, landing page, portfolio entry and README
- [ ] Brand: logo, palette, type pair, icon family, product photography and illustration style
- [ ] Redesign the storefront, product, cart, checkout and dashboard, EN and AR, all sizes
- [ ] Screen smoke tests to lift coverage past 42.5%

### 5. GitHub profile
- [ ] Profile README repo (`EyadOraby/EyadOraby`): a short intro, what I build, current focus, and links to the portfolio and CV
- [ ] Pin the best six repos, each with a description, topics, live link and screenshot in its README
- [ ] README per project: what it is, screenshots, stack, how to run, tests, live demo
- [ ] Ongoing, real activity: every piece of this plan lands as small PRs, giving a steady, honest history. Add an `explorations` repo for small experiments (Flutter animations, Rive, accessibility, RTL) as they happen. No backdated or filler commits: reviewers spot them, and they undo the trust the profile is meant to build.
- [ ] Decide what to do with the old public repos (`academy-app`, `dashboard`): polish them or archive them

### 6. CV: ATS-friendly, in LaTeX
- [ ] Eyad sends the existing `.tex` source (not found on this computer; only a March 2023 PDF on the Desktop)
- [ ] Rebuild on an ATS-safe layout: single column, standard section names (Experience, Education, Skills, Projects), no tables, icons or images for key data, real text (no ligature tricks), `\pdfgentounicode=1` and `glyphtounicode` so the text extracts cleanly
- [ ] Update the content to match the portfolio (roles, dates, projects, links)
- [ ] Extraction check: run `pdftotext` and an open-source resume parser locally, then confirm name, email, phone, titles, dates, skills and education come out correctly
- [ ] Online ATS checker (approved by Eyad) after the local checks pass
- [ ] An Arabic version, if wanted
- [ ] Put the PDF on the portfolio and in the GitHub profile

### 7. Smaller items carried over
- [ ] RSVP Studio: theme-chip label contrast
- [ ] Flutter first load on mobile: deferred loading, trimming assets, trying the Wasm build
- [ ] Optional: custom domain, and a Resend key for RSVP emails
- [ ] Phone notifications: run `/config` in Claude Code on the computer

## Suggested order

1. Decisions and inputs from Eyad (names, directions, photos, `.tex`).
2. CV and GitHub profile, which are quick and bring the most visible benefit.
3. Mini Shop rename and redesign.
4. Tabkha redesign.
5. SANAD redesign.
6. Portfolio redesign and character. These come last so they can show the finished apps.
