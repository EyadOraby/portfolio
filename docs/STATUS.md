# Status across projects

Where everything stands, so work can resume from any machine. Updated 2026-11-22.

## Projects

| Project | Repo | Live | What's there |
| --- | --- | --- | --- |
| Portfolio | EyadOraby/portfolio | portfolio-alpha-sepia-82.vercel.app | Professional apps first (17 store apps), case studies, Off the clock, printable CV at `#cv`. Vercel deploys on merge |
| RSVP Studio | EyadOraby/wedding-rsvp | wedding-rsvp-tau-five.vercel.app | Multi-event RSVP builder; see its `docs/WORKFLOW.md` |
| Mini Shop | EyadOraby/Mini-Shop-App | eyadoraby.github.io/Mini-Shop-App (app at `/app/`) | Shop, wishlist, cart with promo codes, checkout, orders, dark mode, admin dashboard (`?screen=admin`), offline catalog |
| Tabkha | EyadOraby/tabkha_app | eyadoraby.github.io/tabkha_app (app at `/app/`) | Food delivery, ratings and recipes; restaurant console (`?screen=admin`) and platform console (`?screen=superadmin`) |
| SANAD (graduation) | EyadOraby/grad | eyadoraby.github.io/grad (app at `/app/`) | Bookings, government request tracking, job applications, Activity tab, accessibility settings, staff portal (`?screen=staff`) |

Each Flutter repo has a landing page at its root and the app under `/app/`. CI analyzes, tests and builds the web app on every pull request, deploys GitHub Pages from `main`, and publishes an Android APK to the `android` GitHub release (`mini-shop.apk`, `tabkha.apk`, `sanad.apk`).

## Flutter

The apps need current stable Flutter (3.50 at the time). The old 3.16 beta in `C:\src\flutter` cannot build them, so a separate stable SDK lives in `X:\tools\flutter`. CI uses `subosito/flutter-action` on the stable channel. Web builds use `--pwa-strategy=none` so browsers never serve an old cached build.

Every app opens any screen on the web with `?screen=`, and `?demo=1` fills in sample data (Mini Shop and SANAD). That is how the portfolio screenshots are taken.

## Portfolio screenshots

`public/shots/` holds the open-source app captures (phones at 390×844 with a device pixel ratio of 2, desktops at 1280×800, photo-heavy shots as JPEG). `public/pro/` holds icons and store screenshots of the 17 professional apps, taken from the "Eyad Oraby" profile artifact. Tests check that every referenced image exists.

## Data

Tabkha's delivery data and SANAD's requests, bookings and applications are demo data saved on each device, behind small storage interfaces (`FoodStorage`, `SanadStorage`), so a Firebase backend can replace them without touching the screens.

## Waiting on Eyad

- Tabkha web sign-in: add `eyadoraby.github.io` under Firebase Authentication → Authorized domains (the account signed in here has no access to that project)
- Phone notifications: run `/config` in Claude Code on the computer
- Personalise hobby details in `src/content.ts` (written as reflections, not facts)
- Optional: custom domain, Resend API key for RSVP Studio emails

## Next ideas

- Connect Tabkha and SANAD data to Firebase so it is shared between users
- Illustrated character of Eyad on the portfolio: see `docs/CHARACTER_PLAN.md`
