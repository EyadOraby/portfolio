# Test and performance report

Run on 22 November 2026 against every project's `main` branch and the live sites.
Tools: Vitest, TypeScript, ESLint, `flutter analyze`, `flutter test --coverage`, Lighthouse 12.8 (headless Edge, default mobile and desktop presets).

## Summary

| Project | Static checks | Tests | Coverage | Build |
|---|---|---|---|---|
| Portfolio (Vite, React) | typecheck clean | 21 / 21 pass (8 files) | – | ok, 3.1 s |
| RSVP Studio (Next.js) | typecheck clean, ESLint 0 problems | 153 / 153 pass (61 suites) | – | ok, 11.4 s, 30 routes |
| Mini Shop (Flutter) | 0 errors, 0 warnings, 36 infos | 22 / 22 pass | 42.5 % lines | web ok, 31.6 s |
| Tabkha (Flutter) | 0 errors, 0 warnings, 46 infos | 15 / 15 pass | 13.8 % lines | web ok, 47.7 s |
| SANAD (Flutter) | 0 errors, 0 warnings (was 38), 58 infos | 85 / 85 pass (was 13) | 74.7 % lines (was 6.6 %) | web ok, 34.2 s |

Every suite passes. No open pull requests were left behind except the ones listed under "Changes made during this run".

## Bundle sizes

| Project | Main script | Whole build |
|---|---|---|
| Portfolio | 331 KiB JS + 43 KiB CSS | 4.3 MiB (mostly images) |
| Mini Shop web | 3.4 MiB `main.dart.js` | 41.1 MiB |
| Tabkha web | 3.6 MiB `main.dart.js` | 44.5 MiB |
| SANAD web | 3.6 MiB `main.dart.js` | 43.6 MiB |

Flutter web totals include the CanvasKit renderer and the Android/iOS-only assets that ship in `build/web`; the browser downloads about 3.2–3.8 MiB on first load (see transfer sizes below).

## Lighthouse (live sites)

Scores are performance / accessibility / best practices / SEO.

| Page | Mobile | Desktop | Mobile FCP · LCP · TBT · CLS | Transfer |
|---|---|---|---|---|
| Portfolio | 90 / 92 / 100 / 100 | 95 / 92 / 100 / 100 | 2.2 s · 3.3 s · 30 ms · 0 | 875 KiB |
| Portfolio (Arabic) | 96 / 92 / 100 / 100 | 90 / 92 / 100 / 100 | 2.2 s · 2.2 s · 10 ms · 0 | 1.0 MiB |
| RSVP Studio | 94 / 95 / 100 / 100 | 100 / 95 / 100 / 100 | 1.0 s · 2.4 s · 100 ms · 0 | 359 KiB |
| Mini Shop landing | 97 / 92 / 96 / 100 | 100 / 92 / 96 / 100 | 1.7 s · 2.4 s · 0 ms · 0 | 212 KiB |
| Tabkha landing | 96 / 92 / 96 / 100 | 100 / 92 / 96 / 100 | 1.7 s · 2.5 s · 0 ms · 0 | 269 KiB |
| SANAD landing | 95 / 92 / 96 / 100 | 100 / 92 / 96 / 100 | 2.0 s · 2.6 s · 0 ms · 0 | 246 KiB |
| Mini Shop app | n/a / 100 / 82 / 100 | n/a / 100 / 81 / 100 | 6.8 s FCP · 9.8 s speed index | 3.7 MiB |
| Tabkha app | n/a / 100 / 82 / 100 | n/a / 100 / 100 / 100 | 9.7 s FCP · 10.2 s speed index | 3.4 MiB |
| SANAD app | n/a / 100 / 79 / 100 | n/a / 100 / 78 / 100 | 4.7 s FCP · 8.4 s speed index | 3.2 MiB |

The Flutter apps get no performance score because they paint into a canvas, so Lighthouse cannot find a Largest Contentful Paint. Their first paint and speed index are the useful numbers. On desktop they paint in 0.4–1.2 s; on the throttled mobile profile they take 5–10 s, almost all of it downloading and compiling CanvasKit and `main.dart.js`. This is why each app has a light HTML landing page in front of it.

## Changes made during this run

- **SANAD** ([grad#12](https://github.com/EyadOraby/grad/pull/12))
  - Arabic for the remaining form pages: sign up, ID and IC forms, jobs, medical centres and staff statuses. The placeholder hospital text has been replaced.
  - The new screen tests found 7 screens whose cards overflowed on phones or on desktop: government, ID/IC, jobs, appointments, physiotherapy and radiology. Those cards now flex or wrap.
  - Unused code removed; the analyzer now reports 0 warnings.
  - Smoke tests render every screen in English and Arabic at 390 px and 1280 px.
- **Landing pages** ([grad#12](https://github.com/EyadOraby/grad/pull/12), [tabkha_app#9](https://github.com/EyadOraby/tabkha_app/pull/9), [Mini-Shop-App#9](https://github.com/EyadOraby/Mini-Shop-App/pull/9))
  - In dark mode the buttons now use dark text on the light brand colour. They were white on mint, a contrast of 2.1:1.
  - Added a favicon, which removes the console 404 that cost the best-practices points.
- **Portfolio:** the stat counters expose their value as screen-reader text instead of an `aria-label` on a plain `span`, which ARIA does not allow.

## Findings still open

1. **Portfolio, Smash Padel card contrast:** the app's brand blue (`#0e92d5`) under light text measures 2.5–3.4:1. The fix is darkening the card tint, at the cost of drifting from the client's brand colour.
2. **Portfolio, Arabic desktop layout shift (CLS 0.14):** the heading moves when IBM Plex Sans Arabic swaps in. Options are a size-adjusted fallback `@font-face` or preloading the Arabic font file.
3. **RSVP Studio, theme chips:** the tiny uppercase labels on the template theme chips are white on mid-tone theme colours (2.4–3.9:1). Darker chip colours, or larger text, would fix it.
4. **Flutter first load on mobile:** options are deferred loading (`deferred as`) for the admin and staff areas, trimming unused assets from `pubspec.yaml`, and testing the WebAssembly build (`flutter build web --wasm`).
5. **Test coverage for Tabkha and Mini Shop** is still mostly logic. The screen smoke-test pattern added to SANAD would carry over directly.

## How to reproduce

- Web projects: `npm run typecheck`, `npm run lint` (RSVP), `npx vitest run`, `npm run build`.
- Flutter apps: `flutter analyze`, `flutter test --coverage`, `flutter build web --release`.
- Lighthouse: `npx lighthouse <url> --preset=desktop` (omit the preset for mobile).
