---
type: technical
status: done
created: 2026-03-09
depends-on: technical-responsive-design
---

# Sticky Header + Off-Canvas Mobile Menu — Technical Spec

## 1. Overview

File-by-file implementation plan for making the header sticky (always visible on scroll) and adding an off-canvas mobile menu that replaces the inline nav below the `md:` breakpoint (768px). The "GET STARTED" button remains visible in the header at all viewport widths. Covers 7 files.

---

## 2. The Problem

The header scrolls out of view on all pages, requiring users to scroll back to the top to navigate. On narrow viewports (< 768px), the nav links, search icon, and CTA button overflow the header — there is no mobile navigation pattern. The responsive design spec (`technical-responsive-design`) explicitly listed mobile navigation as out of scope.

---

## 3. Goals

- **Sticky header.** Logo, nav, and CTA always visible on scroll at all viewport widths.
- **Full-width header on ultra-wide.** Header background spans the full viewport, not constrained to the body's 1440px max-width. Inner content aligns with body content.
- **Off-canvas menu below 768px.** Nav links collapse behind a hamburger icon; panel slides from right.
- **GET STARTED always visible.** The CTA button stays in the header bar at all widths — never hidden behind the hamburger.
- **Accessible.** Focus trap, Escape to close, scroll lock, `aria-modal`, close on route change.
- **Zero visual regression at 1440px desktop.** Header appearance unchanged on desktop.

---

## 4. Proposed Solution

### Problem: body max-width constraint

The body has `max-width: 1440px; margin-inline: auto`. A sticky header inside body would only be 1440px wide. Solution: move the max-width from `body` to a `.content-wrapper` class, then wrap all page content _except_ `<Header />` in that wrapper. The header handles its own inner alignment with `max-width: 1440px` on a nested div.

### Sticky header structure

```
<header>  <- sticky, full viewport width, bg-color, z-50
  <div>   <- max-width: 1440px, margin-inline: auto, flex row with padding
    Logo | Nav (desktop) | Actions
  </div>
  Backdrop (fixed overlay, fade transition)
  Off-canvas panel (fixed, slide from right)
</header>
```

### Responsive layout (`md:` = 768px breakpoint)

- **Desktop (md:+):** Logo | Nav links (center) | Search + GET STARTED (right) — same as current
- **Mobile (<md:):** Logo (left) | GET STARTED + Hamburger (right)

### Off-canvas panel (mobile only)

- Fixed position, 280px wide (max 80vw), slides from right
- Contains: Close button, Search button, nav links (stacked, 16px font for touch targets)
- Semi-transparent backdrop behind panel, click to close
- Slide + fade transitions (0.3s ease via transform/opacity)

### Transitions (always in DOM, no conditional render for exit animation)

- Panel: `transform: translateX(0/100%)`, `transition: transform 0.3s ease`
- Backdrop: `opacity: 0/1`, `pointer-events: none/auto`, `transition: opacity 0.3s ease`

### Accessibility

- `role="dialog"`, `aria-modal="true"`, `aria-label` on panel
- `aria-expanded`, `aria-controls` on hamburger button
- Focus trap: on open, focus first element; wrap Tab at boundaries
- Escape key closes menu
- `document.body.style.overflow = 'hidden'` when open (scroll lock)
- Close on route change via `useEffect` on `pathname`

---

## 5. Impact on Existing Screens

| Screen / Area              | Current behaviour                                | Change needed                                                          |
| -------------------------- | ------------------------------------------------ | ---------------------------------------------------------------------- |
| All pages — body CSS       | `max-width: 1440px; margin-inline: auto` on body | Move to `.content-wrapper` class                                       |
| All pages — page structure | `<Header />` then `<Divider />` then content     | Wrap Divider + content + Footer in `<div className="content-wrapper">` |
| All pages — header         | Scrolls with content, no max-width handling      | Sticky, full-width background, inner 1440px alignment                  |
| Mobile (< 768px) — nav     | All links visible, overflows                     | Hidden behind hamburger, off-canvas panel                              |
| Mobile (< 768px) — search  | Visible in header                                | Moved to off-canvas panel                                              |
| Desktop (768px+) — header  | Horizontal nav bar                               | Unchanged appearance, now sticky                                       |

### File-by-file changes

#### `src/app/globals.css`

- Remove `max-width: 1440px` and `margin-inline: auto` from `body`
- Add `.content-wrapper { max-width: 1440px; margin-inline: auto; }`

#### `src/app/page.tsx`

Wrap everything after `<Header />` in `<div className="content-wrapper">`:

```
<Header />
<div className="content-wrapper">
  <Divider />
  ...all content...
  <Footer />
</div>
```

#### `src/app/about/page.tsx` — Same pattern

#### `src/app/blog/page.tsx` — Same pattern

#### `src/app/blog/[slug]/page.tsx` — Same pattern

#### `src/app/contact/page.tsx` — Same pattern

#### `src/components/shared/Header.tsx`

**New imports:** `useState, useEffect, useCallback, useRef` from React; `Menu, X` from lucide-react

**State:** `menuOpen` boolean via `useState`

**Header element:** `position: sticky; top: 0; z-index: 50; background-color: var(--color-bg)`

**Inner wrapper div:** `max-width: 1440px; margin-inline: auto` with existing padding and flex layout

**Desktop nav:** Add `hidden md:flex` to show only on md:+

**Desktop actions (Search + GET STARTED):** Add `hidden md:flex` to show only on md:+

**Mobile actions:** Add `flex md:hidden` container with GET STARTED button + hamburger icon (`Menu`/`X` from lucide-react, 24px)

**Backdrop:** Fixed overlay, `rgba(0,0,0,0.4)`, z-index 40, opacity transition, click to close

**Off-canvas panel:** Fixed, right-anchored, 280px/80vw, z-index 50, `md:hidden`, translateX transition. Contains close button, search button, stacked nav links (16px font)

**Effects:**

- Escape key listener (when open)
- Body scroll lock (when open)
- Focus trap (ref on panel, Tab wrapping)
- Close on `pathname` change

---

## 6. Out of Scope

- Bottom navigation bar for mobile
- Search functionality (the search button is a placeholder)
- Scroll-based header shadow or border-bottom on scroll
- Header height animation or collapse on scroll
- Mobile-specific page layouts beyond nav collapse

---

## 7. Success Criteria

- `npm run build` — zero errors
- Desktop at 1440px — header visually unchanged, sticks on scroll
- Ultra-wide (>1440px) — header background spans full width, inner content aligns with body
- Resize below 768px — nav links hidden, hamburger + GET STARTED visible
- Open menu — panel slides in from right, backdrop fades in
- Click nav link in menu — menu closes, navigates
- Press Escape — menu closes
- Click backdrop — menu closes
- Tab through menu — focus trapped within panel
- No horizontal scrollbar at any width 320px–2560px

---

## 8. Open Questions

None — all design decisions resolved during planning.
