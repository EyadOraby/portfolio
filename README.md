# Eyad Oraby · Portfolio

[![CI](https://github.com/EyadOraby/portfolio/actions/workflows/ci.yml/badge.svg)](https://github.com/EyadOraby/portfolio/actions/workflows/ci.yml)

My portfolio, presented as a phone, because most of what I build lives on one.

- **Work** and **Projects** are apps on the home screen. Tap one and it opens out of its icon.
- **Off the clock**, the personal side, is hidden: pull down the phone's status bar to find it (or focus the status bar and press Enter).
- Every view has its own URL (`#work`, `#projects`, `#off-duty`), so links and the back button work.
- Motion is subtle and turns off for people who prefer reduced motion.

## Stack

React, TypeScript and Vite, with plain CSS and no animation library. Vitest covers the content and the pull-down gesture logic; GitHub Actions runs typecheck, tests and a production build on every push.

## Editing

All the text lives in [`src/content.ts`](src/content.ts): profile, experience, skills, projects and hobbies.

```bash
npm ci
npm run dev
```
