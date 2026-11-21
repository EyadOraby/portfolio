# Eyad Oraby · Portfolio

[![CI](https://github.com/EyadOraby/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/EyadOraby/portfolio/actions/workflows/ci.yml)

My portfolio: a home screen of interactive widgets that leads to real, shipped work.

- **Home** is a grid of widgets: an intro, a projects widget that cross-fades real desktop and phone screenshots, an experience timeline, live production sites, a toolbox and headline numbers.
- **Projects** are short case studies (problem, approach, outcome) with a screenshot gallery and a full-screen viewer.
- **Experience** covers roles, how I work and skills.
- **Off the clock**, the personal side, is hidden: press and hold the clock widget until its ring fills (Space or Enter works too).
- **Quick jump**: press Ctrl+K, ⌘K or `/` to search pages, projects and links.
- Every view has its own URL (`#work`, `#projects/mini-shop`, `#off-duty`), and pages change with a view transition where the browser supports it.
- Motion is subtle and turns off for people who prefer reduced motion.

## Stack

React, TypeScript and Vite, with plain CSS and no animation library. Vitest covers the content (including that every screenshot exists), routing, the hold gesture and the palette search; GitHub Actions runs typecheck, tests and a production build on every push.

Screenshots live in `public/shots/`.

## Editing

All the text lives in [`src/content.ts`](src/content.ts): profile, experience, principles, skills, projects (with screenshots) and hobbies.

```bash
npm ci
npm run dev
```
