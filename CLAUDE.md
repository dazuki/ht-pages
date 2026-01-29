# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro 5.x static site - personal link/branding page for Hemligt.org. Single page, zero JS runtime.

## Commands

```bash
npm run dev      # dev server with --host (network accessible)
npm run build    # production build to dist/
npm run preview  # preview production build
npm run astro sync  # regenerate content collection types
```

No tests, linters, or formatters configured.

## Architecture

```
src/
├── content.config.ts     # Content Collection definition with Zod schema
├── data/user.json        # All site content: name, profession, socials[], links[]
├── styles/global.css     # CSS reset, variables, animations
├── pages/index.astro     # Only page - fetches data via getEntry(), passes props
├── layouts/Layout.astro  # HTML wrapper, imports global CSS + remixicon
└── components/
    ├── Profile.astro     # Header: photo, name, profession, social icons (props)
    ├── Social.astro      # Single social icon link (props)
    ├── List.astro        # Container wrapper for Link cards (props)
    └── Link.astro        # Service link card with icon + description (props)
```

**Data flow:** `user.json` → Content Collection → `getEntry('user', 'profile')` in index.astro → props to components

**Styling:** Global CSS in `src/styles/global.css` with CSS custom properties. Component-scoped styles. Black/white/grayscale palette. CSS animations for fade-in effects.

**Icons:** RemixIcon library (imported once in Layout) - use class names like `ri-github-fill`

## Deployment

GitHub Actions on push to `main`:
- SSHs to VPS using secrets (VPS_HOST, VPS_USERNAME, VPS_SSH_KEY, VPS_PORT, VPS_ROOT_FOLDER)
- Runs `npm install && npm run build` on server

## Editing Content

Modify `src/data/user.json` to change:
- Profile name/profession
- Social links (icon, url, alt)
- Service links (title, description, icon, url)

Run `npm run astro sync` after schema changes to regenerate types.
