---
type: feature
status: done
created: 2026-03-09
depends-on: product-pikari-website
---

# Responsive Design — Feature Spec

## 1. Overview

Introduce fluid typography and fluid container sizing so the site scales gracefully from 320px to 1440px+ without requiring separate mobile layouts. The current site is built desktop-first at 1440px with fixed pixel values for all typography and spacing, making it completely unusable on smaller screens. This spec defines a fluid responsive approach using CSS `clamp()` to avoid a traditional breakpoint-heavy rewrite.

---

## 2. The Problem

- The body forces `min-w-[1440px]`, so the site is broken on any screen smaller than desktop — users see a horizontally-scrolling page on tablets and phones.
- All font sizes are fixed px (72px hero, 22px sections, 16px body, 42px metrics, 9px badges) — text is either too large or too small at non-desktop viewports.
- All spacing is fixed px (`padding-inline: 64px`, card gaps 24px, section padding 48–80px) — layouts overflow or feel cramped on smaller screens.
- No media queries or responsive patterns exist anywhere in the codebase.

---

## 3. Goals

- **Fluid type scale via CSS `clamp()`.** Text scales proportionally between a mobile minimum and desktop maximum — no abrupt jumps.
- **Fluid spacing via `clamp()`.** Padding and gaps compress gracefully across viewports.
- **Minimal media queries.** Only used for grid column collapses, not for font sizes or spacing.
- **No horizontal scrollbar.** At any viewport width from 320px to 2560px.
- **Desktop appearance unchanged.** At 1440px the site should be pixel-identical to the current design.

---

## 4. Proposed Solution

### Fluid Typography Scale

| Role                  | Current | Fluid Value                                 |
| --------------------- | ------- | ------------------------------------------- |
| Hero titles           | 72px    | `clamp(2.25rem, 1rem + 5vw, 4.5rem)`        |
| Newsletter/CTA titles | 48px    | `clamp(2rem, 1rem + 4vw, 3rem)`             |
| Metric numbers        | 42px    | `clamp(1.75rem, 1rem + 3.5vw, 2.625rem)`    |
| Testimonial quote     | 28px    | `clamp(1.375rem, 1rem + 2vw, 1.75rem)`      |
| Section/card titles   | 22px    | `clamp(1.125rem, 0.9rem + 1vw, 1.375rem)`   |
| Body text             | 16px    | `clamp(0.9375rem, 0.875rem + 0.25vw, 1rem)` |
| Badge/meta            | 9px     | Fixed (already minimum legible size)        |

### Fluid Spacing

| Role                     | Current | Fluid Value                 |
| ------------------------ | ------- | --------------------------- |
| Page horizontal padding  | 64px    | `clamp(1.25rem, 5vw, 4rem)` |
| Section vertical padding | 48–80px | `clamp(2.5rem, 6vw, 5rem)`  |
| Card grid gaps           | 24px    | `clamp(1rem, 2vw, 1.5rem)`  |

### Grid Collapse Points (minimal media queries)

- **`< 768px`:** 3-column grids → 1 column, featured post stacks vertically, contact form stacks, footer columns stack.
- **`768px–1024px`:** 3-column grids → 2 columns, team grid 4 → 2 columns.
- **`> 1024px`:** Full desktop layout (current behaviour).

### Structural Changes

- Remove `min-w-[1440px]` from body in `src/app/layout.tsx`.
- Add fluid custom properties in `src/app/globals.css` (e.g., `--font-size-hero: clamp(...)`, `--spacing-page: clamp(...)`).

---

## 5. Impact on Existing Screens

| Screen / Area                   | Current behaviour    | Change needed                          |
| ------------------------------- | -------------------- | -------------------------------------- |
| All pages — body                | `min-w-[1440px]`     | Remove min-width entirely              |
| All pages — horizontal padding  | Fixed 64px           | Fluid `clamp(1.25rem, 5vw, 4rem)`      |
| Homepage — Hero                 | 72px fixed title     | Fluid clamp, scales to ~36px on mobile |
| Homepage — Featured Discoveries | 3-column fixed grid  | Collapses to 2 → 1 column              |
| Homepage — Metrics              | 4-stat row           | Wraps to 2×2 grid on mobile            |
| Homepage — Our Approach         | 3-column pillars     | Collapses to 1 column                  |
| About — Team Grid               | 4-column fixed       | 2-column on tablet, 1 on mobile        |
| About — Our Story               | 2-column fixed       | Stacks vertically on mobile            |
| Blog — Featured Post            | Side-by-side layout  | Stacks vertically on mobile            |
| Blog — Post Grid                | 3-column cards       | 2 → 1 column                           |
| Contact — Body                  | 2-column form + info | Stacks vertically on mobile            |
| Footer                          | 4-column layout      | Stacks on mobile                       |
| Header                          | Horizontal nav       | Mobile nav pattern (TBD)               |

---

## 6. Out of Scope

- Mobile navigation design (hamburger menu, drawer, etc.) — separate spec.
- Dark mode.
- New mobile-only components or sections.
- Redesigning any section's content or visual language.
- Landscape/portrait orientation-specific styles.
- Print styles.

---

## 7. Success Criteria

- No horizontal scrollbar at any viewport from 320px to 2560px.
- All text remains readable (no text smaller than 9px) at every viewport.
- Desktop appearance at 1440px is pixel-identical to current site.
- `npm run build` succeeds with zero errors.
- Lighthouse mobile score improves from current state.
- All existing container query behaviour (PostCard) preserved.

---

## 8. Open Questions

- **Mobile navigation:** Hamburger menu, bottom nav, or collapsed nav? Likely deserves its own spec.
- **Fluid tokens as CSS custom properties vs inline:** Should fluid values be centralized as `--font-size-hero: clamp(...)` custom properties in `globals.css`, or applied inline per component? CSS custom properties are more maintainable.
- **Image aspect ratios:** Should hero/blog images maintain fixed heights or switch to `aspect-ratio` at small viewports?
- **Max-width container:** Should the site have a max-width cap (e.g., 1440px centered) for ultra-wide screens, or continue to be full-width?
