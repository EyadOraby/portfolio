# Status across projects

Where everything stands, so work can resume from any machine. Updated 2026-11-21.

## Projects

| Project | Repo | Live | State |
| --- | --- | --- | --- |
| Portfolio | EyadOraby/portfolio | portfolio-alpha-sepia-82.vercel.app | Up to date on `main` (Vercel deploys on merge) |
| RSVP Studio | EyadOraby/wedding-rsvp | wedding-rsvp-tau-five.vercel.app | Up to date; see its `docs/WORKFLOW.md` |
| Mini Shop | EyadOraby/Mini-Shop-App | eyadoraby.github.io/Mini-Shop-App | Up to date; web demo on GitHub Pages |
| Tabkha | EyadOraby/tabkha_app (private) | none | Up to date on `main`: recipes home, Flutter upgrade, CI |
| SANAD (graduation) | EyadOraby/grad (private) | none | Up to date on `main`: Flutter 3 upgrade, app flow fixes, CI |

## Flutter

The Tabkha and SANAD upgrades need current stable Flutter (3.50 at the time). The old 3.16 beta in `C:\src\flutter` cannot build them, so a separate stable SDK lives in `X:\tools\flutter`. CI uses `subosito/flutter-action` on the stable channel.

Both apps open any screen on the web with `?screen=`, for example `?screen=home` or `?screen=recipe&id=52772` (Tabkha) and `?screen=medical` (SANAD). That is how the portfolio screenshots were taken.

## Portfolio screenshots

`public/shots/` holds real captures: phone shots at 390×844 with a device pixel ratio of 2, desktop shots at 1280×800. Photo-heavy shots are JPEG. Every screenshot referenced in `src/content.ts` is checked by a test.

## Waiting on Eyad

- Personalise hobby details in `src/content.ts` (they are written as reflections, not facts)
- Optional: make Tabkha or SANAD public to host their web demos on GitHub Pages
- Optional: custom domain, Resend API key for RSVP Studio emails
