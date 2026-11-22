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
- [x] Personal part: one corner per interest in the room (tech, travel, cars and motorbikes, sports, gaming, reading)
- [x] Guided room tour ("Explore the room" on Off the clock): six corners (travel, desk, gaming, collector's shelf, sports, reading) with a tap moment at each, keyboard arrows, reduced-motion cuts, EN and AR
- [ ] Put the illustrated character into the room once the photos arrive
- [ ] New screenshots of the redesigned apps

### 2. Tabkha: full UI/UX redesign
- [x] Brand (docs/BRAND.md in the repo): herb green and tomato on cream, Young Serif + Nunito with Lalezar + Baloo Bhaijaan 2, ingredient doodles (decided by Claude per Eyad's go-ahead)
- [ ] UX review of the order flow (browse, item, cart, checkout, tracking) and the admin and courier views
- [ ] Redesign every screen for phone, tablet and desktop, in English and Arabic
- [x] Ingredient doodles on Discover, sign-in and empty states
- [ ] Doodles on onboarding and order success
- [x] Landing page restyled in the new brand
- [ ] New app icon and splash screen
- [ ] Screen smoke tests (same pattern as SANAD)
- [ ] Waiting on Eyad: Firebase authorised domain for web sign-in

### 3. SANAD: full UI/UX redesign
- [x] Brand (docs/BRAND.md in the repo): deep teal and sand, Atkinson Hyperlegible + Noto Sans Arabic, geometric emblems drawn in code, new wordmark (decided by Claude per Eyad's go-ahead)
- [ ] UX review: services, applications, appointments, Activity, accessibility settings, staff portal
- [ ] Redesign every screen (the older form pages are the weakest), phone, tablet and desktop, EN and AR
- [x] Emblems for every service area and the What's new banner
- [ ] Emblems in empty states
- [x] Landing page restyled
- [ ] New app icon and splash screen

### 4. Mini Shop: rename and full redesign
- [x] New name and focus: The Maker's Market, Egyptian handmade crafts and home goods
- [x] Renamed everywhere: package `makers_market`, app ID `com.eyadoraby.makersmarket`, repo `makers-market`, Pages URL, landing page, portfolio entry, README
- [x] Brand (docs/BRAND.md in the repo): arch logo, clay/indigo/sand palette, Fraunces + Work Sans with Amiri + Readex Pro, Material outlined icons, product art drawn in code (decided by Claude per Eyad's go-ahead)
- [x] First redesign pass: storefront, makers banner, product page with maker card, cart, checkout, dashboard restyled, EN and AR, phone and desktop
- [ ] Arabic product names and maker names in the catalogue (currently English data in both languages)
- [ ] Screen smoke tests to lift coverage past 42.5%

### 5. GitHub profile
- [x] Profile README repo (`EyadOraby/EyadOraby`): intro, shipped apps, open-source table, current focus (CV link to add once the new CV is out)
- [x] Descriptions, topics and live links on the five main repos
- [ ] Pin the six repos on the profile (GitHub's site only: Customize your pins)
- [ ] Profile name, bio, location and website (GitHub settings; the CLI token can't change them)
- [x] README per project: screenshots now in all five; refresh them after the redesigns
- [ ] Ongoing, real activity: every piece of this plan lands as small PRs, giving a steady, honest history. Add an `explorations` repo for small experiments (Flutter animations, Rive, accessibility, RTL) as they happen. No backdated or filler commits: reviewers spot them, and they undo the trust the profile is meant to build.
- [x] Old repos: `academy-app` made private (client planning files), empty `dashboard` archived

### 6. CV: ATS-friendly, in LaTeX
- [x] Source rebuilt from the March 2026 PDF (no `.tex` was sent); kept in the private `EyadOraby/cv` repo, built with Tectonic
- [x] ATS-safe layout: one A4 page, single column, standard headings, no icons or tables, no hyphenation, dates on the role line
- [x] Content refreshed: AISU and Arab Steel Summit added, SANAD and RSVP Studio projects, GitHub and portfolio links, location Giza
- [ ] Eyad to confirm: Talento end date (CV Jan 2025, portfolio Feb 2025), "Status" vs "Status Strong", and whether to add the Gameball, MEGA and eTax internships
- [x] Local extraction check (`ats_check.py`): 14/14 pass; the old PDF failed 3 (no GitHub, no clickable links, a skill label glued to its values)
- [ ] Online ATS checker: tried ResumeGo (their server returned errors) and Enhancv (needs a real drag-and-drop); Eyad to upload the PDF from the CV page once by hand
- [ ] An Arabic version, if wanted
- [x] PDF on the portfolio (CV page, Download PDF) and linked from the GitHub profile

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
