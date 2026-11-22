# Status across projects

Where everything stands, so work can resume from any machine. The full to-do list and workflow are in [PLAN.md](PLAN.md). Updated 2026-11-22 (evening).

## Latest (22 Nov 2026)

- **CV:** rebuilt in LaTeX for ATS parsing. The source is in the private `EyadOraby/cv` repo; the PDF is on the CV page and the GitHub profile.
- **GitHub profile:** README live, repo descriptions and topics set; `academy-app` made private, `dashboard` archived.
- **Mini Shop is now The Maker's Market** (repo `makers-market`): Egyptian crafts catalogue in English and Arabic, product art drawn in code, new brand, 84% test coverage.
- **Tabkha:** warm home-kitchen redesign (herb green and tomato, Young Serif and Nunito, ingredient doodles); coverage 51.5%.
- **SANAD:** calm civic redesign (teal and sand, Atkinson Hyperlegible, geometric emblems, wordmark).
- **Portfolio:** "Explore the room" guided tour on Off the clock, contrast and Arabic layout-shift fixes, fresh screenshots of every app.
- **Later on 22 Nov:** SANAD government and medical pages rebuilt (shared layouts, real request tracking, one provider page); Tabkha order flow (dish sheet, kitchen note) and a new Courier role; splash screens and trimmed fonts in all three apps; tablet size in every screen test; illustrated character on the portfolio (hero, hire card, room, Say hello); Arabic CV.
- **3D portrait:** the Experience hire card now shows Eyad's real photo as a 3D relief that follows the pointer (WebGL, no library, about 40 KB of images).
- Brand guides live in each app's `docs/BRAND.md`. Everything still open is in [PLAN.md](PLAN.md).

## Projects

| Project | Repo | Live | What's there |
| --- | --- | --- | --- |
| Portfolio | EyadOraby/portfolio | portfolio-alpha-sepia-82.vercel.app | Professional apps first (17 store apps), case studies, Off the clock, printable CV at `#cv`. English and Arabic (`?lang=ar`). Vercel deploys on merge |
| RSVP Studio | EyadOraby/wedding-rsvp | wedding-rsvp-tau-five.vercel.app | Multi-event RSVP builder; see its `docs/WORKFLOW.md` |
| The Maker's Market (was Mini Shop) | EyadOraby/makers-market | eyadoraby.github.io/makers-market (app at `/app/`) | Shop, wishlist, cart with promo codes, checkout, orders, dark mode, admin dashboard (`?screen=admin`), offline catalog; English and Arabic |
| Tabkha | EyadOraby/tabkha_app | eyadoraby.github.io/tabkha_app (app at `/app/`) | Food delivery, ratings and recipes; sign-in with one-tap demo accounts (customer, restaurant admin, super admin); restaurant console (`?screen=admin`) and platform console (`?screen=superadmin`); English and Arabic |
| SANAD (graduation) | EyadOraby/grad | eyadoraby.github.io/grad (app at `/app/`) | Login with guest and demo accounts (citizen, staff), bookings, request tracking, job applications, Activity, accessibility settings, staff portal (`?screen=staff`); desktop portal layout; English and Arabic |

Each Flutter repo has a landing page at its root and the app under `/app/`. CI analyzes, tests and builds the web app on every pull request, deploys GitHub Pages from `main`, and publishes an Android APK to the `android` GitHub release (`mini-shop.apk`, `tabkha.apk`, `sanad.apk`).

## Flutter

The apps need current stable Flutter (3.50 at the time). The old 3.16 beta in `C:\src\flutter` cannot build them, so a separate stable SDK lives in `X:\tools\flutter`. CI uses `subosito/flutter-action` on the stable channel. Web builds use `--pwa-strategy=none` so browsers never serve an old cached build.

Every app opens any screen on the web with `?screen=`, and `?demo=1` fills in sample data (The Maker's Market and SANAD). That is how the portfolio screenshots are taken.

## Portfolio screenshots

`public/shots/` holds the open-source app captures (phones at 390×844 with a device pixel ratio of 2, desktops at 1280×800, photo-heavy shots as JPEG). `public/pro/` holds icons and store screenshots of the 17 professional apps, taken from the "Eyad Oraby" profile artifact. Tests check that every referenced image exists.

## Languages

Every project has English and Arabic with right-to-left layouts. `?lang=ar` or `?lang=en` opens a language directly, and the choice is remembered. Strings are keyed by their English text with `t()` / `context.t()` falling back to English:
- Portfolio: `src/i18n.ar.ts` (interface) and `src/content.ar.ts` (content)
- The Maker's Market: `lib/app/strings.dart`; Tabkha: `lib/Features/Food/food_strings.dart` plus the ARB files; SANAD: `lib/l10n/sanad_strings.dart`

## Demo access

- Tabkha sign-in: Continue as guest, or Customer / Restaurant admin / Super admin demo accounts
- SANAD login: Continue as guest, or Citizen / Staff demo accounts (`?demo=1` seeds the citizen's activity)
- The Maker's Market: `?demo=1` fills the cart, wishlist and orders

## Layouts

All apps adapt to phones, tablets and desktops: bottom navigation on phones, navigation rails or side menus with centered, width-limited content on wide screens.

## Data

Tabkha's delivery data and SANAD's requests, bookings and applications are demo data saved on each device, behind small storage interfaces (`FoodStorage`, `SanadStorage`), so a Firebase backend can replace them without touching the screens.

## Testing

Full results, Lighthouse scores and open findings: [TEST_REPORT.md](TEST_REPORT.md) (22 Nov 2026). All suites pass; every Flutter app analyzes with 0 errors and 0 warnings.

## Waiting on Eyad

- Tabkha web sign-in: add `eyadoraby.github.io` under Firebase Authentication → Authorized domains (the account signed in here has no access to that project)
- Phone notifications: run `/config` in Claude Code on the computer
- Personalise hobby details in `src/content.ts` (written as reflections, not facts)
- Optional: custom domain, Resend API key for RSVP Studio emails

## Next ideas

- Connect Tabkha and SANAD data to Firebase so it is shared between users
- Illustrated character of Eyad on the portfolio: see `docs/CHARACTER_PLAN.md`
