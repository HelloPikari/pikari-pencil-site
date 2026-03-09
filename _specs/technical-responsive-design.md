---
type: technical
status: done
created: 2026-03-09
depends-on: feature-responsive-design
---

# Responsive Design — Technical Spec

## 1. Overview

File-by-file implementation plan for making the Pikari website responsive from 320px to 2560px using fluid CSS `clamp()` values and minimal Tailwind breakpoints. Covers 27 files across 8 phases. All fluid values are centralized as CSS custom properties in `globals.css` and referenced via `var()` in components.

---

## 2. The Problem

The feature spec (`feature-responsive-design.md`) defines the responsive strategy but lacks the per-file change instructions an implementer needs. Every component uses hardcoded pixel values for font sizes, spacing, widths, and heights. The body enforces `min-w-[1440px]`. This spec maps every inline style and className that must change, with exact old → new values.

---

## 3. Goals

- **Complete change manifest.** Every file, every line that changes, documented with old and new values.
- **Phase-ordered implementation.** Foundation first, then shared components, then page-specific — each phase is independently testable.
- **Zero visual regression at 1440px.** All `clamp()` max values match current fixed values exactly.
- **Minimal diff surface.** Only change what's necessary for responsiveness — no refactoring, no new features.

---

## 4. Proposed Solution

### Design Decisions

1. **CSS custom properties in `@theme`** — All fluid `clamp()` values centralized in `globals.css`, referenced via `var()` in components. This keeps components clean and makes future adjustments trivial.
2. **`aspect-ratio` for images** — Replace all fixed `height` inline styles with `aspect-ratio` so images scale proportionally.
3. **`max-width: 1440px` centered container** — Cap content width on ultra-wide screens. Background colors extend full-width via the `html` element.
4. **Tailwind v4 breakpoints** — `sm:` (640px), `md:` (768px), `lg:` (1024px) for grid column collapses only. No breakpoints for typography or spacing.

### CSS Custom Properties

Add to `globals.css` inside the `@theme` block:

**Fluid typography:**

| Token                        | Value                                       | Desktop equivalent |
| ---------------------------- | ------------------------------------------- | ------------------ |
| `--font-size-hero`           | `clamp(2.25rem, 1rem + 5vw, 4.5rem)`        | 72px               |
| `--font-size-cta-title`      | `clamp(2rem, 1rem + 4vw, 3rem)`             | 48px               |
| `--font-size-metric`         | `clamp(1.75rem, 1rem + 3.5vw, 2.625rem)`    | 42px               |
| `--font-size-quote`          | `clamp(1.375rem, 1rem + 2vw, 1.75rem)`      | 28px               |
| `--font-size-section-title`  | `clamp(1.125rem, 0.9rem + 1vw, 1.375rem)`   | 22px               |
| `--font-size-body`           | `clamp(0.9375rem, 0.875rem + 0.25vw, 1rem)` | 16px               |
| `--font-size-mdx-h2`         | `clamp(1.25rem, 1rem + 1vw, 1.5rem)`        | 24px               |
| `--font-size-mdx-blockquote` | `clamp(1.125rem, 0.9rem + 0.75vw, 1.25rem)` | 20px               |

**Fluid spacing:**

| Token                    | Value                       | Desktop equivalent |
| ------------------------ | --------------------------- | ------------------ |
| `--spacing-page-x`       | `clamp(1.25rem, 5vw, 4rem)` | 64px               |
| `--spacing-section-y`    | `clamp(2.5rem, 6vw, 5rem)`  | 80px               |
| `--spacing-section-y-sm` | `clamp(2rem, 4vw, 3rem)`    | 48px               |
| `--spacing-card-gap`     | `clamp(1rem, 2vw, 1.5rem)`  | 24px               |
| `--spacing-column-gap`   | `clamp(1.5rem, 4vw, 3rem)`  | 48px               |
| `--spacing-large-gap`    | `clamp(2rem, 5vw, 4rem)`    | 64px               |

### Aspect Ratio Conversions

| Component                         | Old `height` | New `aspect-ratio`           |
| --------------------------------- | ------------ | ---------------------------- |
| PostCard image                    | `240px`      | `16 / 10`                    |
| HeroImage                         | `420px`      | `10 / 3`                     |
| TeamGrid photo                    | `320px`      | `5 / 4`                      |
| About page / Blog post hero image | `400px`      | `7 / 2`                      |
| FeaturedPost image                | `360px`      | `5 / 3`                      |
| MapSection                        | `320px`      | `4 / 1` + `minHeight: 200px` |

### Grid Collapse Strategy

| Breakpoint          | Columns      | Components affected                                                                                         |
| ------------------- | ------------ | ----------------------------------------------------------------------------------------------------------- |
| `< 640px` (default) | 1 col        | All grids stack to single column                                                                            |
| `sm:` 640px         | 2 col        | TeamGrid, newsletter input row, contact name fields                                                         |
| `md:` 768px         | 2 col        | FeaturedDiscoveries, PostGrid, Footer columns, OurStory sidebar, FeaturedPost image+text, Contact form+info |
| `lg:` 1024px        | Full desktop | 3-col grids (OurApproach, Values, PostGrid), 4-col grids (TeamGrid, Metrics)                                |

---

### Phase 1 — Foundation (2 files)

#### `src/app/globals.css`

**Add `@theme` block with all custom properties listed above.**

**Add `html` rule for max-width container:**

```css
html {
  background-color: var(--color-background);
}

body {
  max-width: 1440px;
  margin-inline: auto;
}
```

This centers the content at `max-width: 1440px` while `html` provides the background that extends full-width on ultra-wide screens.

#### `src/app/layout.tsx`

| Property         | Old                          | New           |
| ---------------- | ---------------------------- | ------------- |
| `body` className | `min-w-[1440px] antialiased` | `antialiased` |

Remove `min-w-[1440px]`. The `max-width: 1440px` and `margin-inline: auto` are handled in CSS (globals.css body rule) rather than Tailwind classes, so `layout.tsx` just drops the min-width.

---

### Phase 2 — Shared Components (4 files)

#### `src/components/shared/Header.tsx`

| Property         | Old                    | New                                             |
| ---------------- | ---------------------- | ----------------------------------------------- |
| `header` padding | `padding: '20px 64px'` | `padding: '20px var(--spacing-page-x)'`         |
| `nav` gap        | `gap: '24px'`          | `gap: '24px'` (unchanged — nav items are small) |

Header nav links and CTA button sizes remain fixed (already small enough for mobile). Mobile navigation is out of scope per the feature spec.

#### `src/components/shared/Footer.tsx`

| Property          | Old                                  | New                                                                                 |
| ----------------- | ------------------------------------ | ----------------------------------------------------------------------------------- |
| `footer` padding  | `padding: '48px 64px'`               | `padding: 'var(--spacing-section-y-sm) var(--spacing-page-x)'`                      |
| Logo column width | `width: '300px', flexShrink: 0`      | Remove `width` and `flexShrink`                                                     |
| Layout container  | `display: 'flex'` with `gap: '64px'` | className `grid grid-cols-1 md:grid-cols-4` with `gap: 'var(--spacing-column-gap)'` |
| Right section     | `display: 'flex'` with `gap: '64px'` | Remove — columns handled by grid                                                    |
| Logo column gap   | `gap: '48px'`                        | `gap: 'var(--spacing-column-gap)'`                                                  |
| Footer bottom gap | `gap: '16px'`                        | `gap: '16px'` (unchanged — small)                                                   |

The footer switches from a flex row (logo + 3 link columns) to a responsive grid. On mobile (`< md:`), all columns stack. On `md:+`, 4 equal columns.

#### `src/components/shared/NewsletterCTA.tsx`

| Property                | Old           | New                                                  |
| ----------------------- | ------------- | ---------------------------------------------------- |
| `section` paddingBlock  | `'80px'`      | `'var(--spacing-section-y)'`                         |
| `section` paddingInline | `'64px'`      | `'var(--spacing-page-x)'`                            |
| `h2` fontSize           | `'48px'`      | `'var(--font-size-cta-title)'`                       |
| `p` fontSize            | `'14px'`      | Unchanged (already small)                            |
| Input wrapper           | `gap: '8px'`  | className `flex flex-col sm:flex-row gap-2 max-w-md` |
| `input` width           | `'320px'`     | Remove `width`, add `flex: 1`                        |
| `input` fontSize        | `'14px'`      | Unchanged                                            |
| `button` padding        | `'12px 24px'` | Unchanged                                            |

The input+button row stacks vertically on mobile (`< sm:`), sits side-by-side on `sm:+`. The fixed `320px` input width is removed — the `max-w-md` container constrains the row's total width on desktop.

#### `src/components/shared/PostCard.tsx`

| Property       | Old       | New                                           |
| -------------- | --------- | --------------------------------------------- |
| Image `height` | `'240px'` | Remove `height`, add `aspectRatio: '16 / 10'` |
| `h3` fontSize  | `'22px'`  | `'var(--font-size-section-title)'`            |

Category badge (`9px`) and margins remain unchanged.

---

### Phase 3 — Home Page (6 files)

#### `src/components/home/Hero.tsx`

| Property          | Old                | New                                                                            |
| ----------------- | ------------------ | ------------------------------------------------------------------------------ |
| `section` padding | `'80px 64px 48px'` | `'var(--spacing-section-y) var(--spacing-page-x) var(--spacing-section-y-sm)'` |
| `h1` fontSize     | `'72px'`           | `'var(--font-size-hero)'`                                                      |
| `h1` maxWidth     | `'700px'`          | Unchanged                                                                      |
| `p` fontSize      | `'16px'`           | `'var(--font-size-body)'`                                                      |
| `p` maxWidth      | `'520px'`          | Unchanged                                                                      |
| Buttons gap       | `'12px'`           | Unchanged                                                                      |
| Button padding    | `'12px 24px'`      | Unchanged                                                                      |
| Button fontSize   | `'14px'`           | Unchanged                                                                      |

#### `src/components/home/HeroImage.tsx`

| Property            | Old       | New                                          |
| ------------------- | --------- | -------------------------------------------- |
| `div` paddingInline | `'64px'`  | `'var(--spacing-page-x)'`                    |
| Image `height`      | `'420px'` | Remove `height`, add `aspectRatio: '10 / 3'` |

#### `src/components/home/FeaturedDiscoveries.tsx`

| Property                | Old                | New                                              |
| ----------------------- | ------------------ | ------------------------------------------------ |
| `section` paddingInline | `'64px'`           | `'var(--spacing-page-x)'`                        |
| `section` paddingBlock  | `'48px'`           | `'var(--spacing-section-y-sm)'`                  |
| `h2` fontSize           | `'22px'`           | `'var(--font-size-section-title)'`               |
| Grid className          | `grid grid-cols-3` | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Grid gap                | `'24px'`           | `'var(--spacing-card-gap)'`                      |

#### `src/components/home/Metrics.tsx`

**Most complex change.** The current layout uses a flex row with conditional vertical dividers between metrics. This needs to become a responsive grid.

| Property               | Old                                           | New                                                                                                                     |
| ---------------------- | --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| `section` padding      | `'64px'`                                      | `'var(--spacing-page-x)'` (all sides, or `'var(--spacing-section-y-sm) var(--spacing-page-x)'` for vertical/horizontal) |
| Layout                 | `display: 'flex'` row with divider spans      | className `grid grid-cols-2 lg:grid-cols-4` with `gap: 'var(--spacing-card-gap)'`                                       |
| Divider elements       | Conditional `<span>` with `borderInlineStart` | **Remove entirely**                                                                                                     |
| Metric number fontSize | `'42px'`                                      | `'var(--font-size-metric)'`                                                                                             |
| Metric label fontSize  | `'14px'`                                      | Unchanged                                                                                                               |

**Structural rewrite:** Remove the map logic that inserts divider `<span>` elements between metrics. Replace with a simple grid where each metric is a grid cell. The grid handles 2-col on mobile, 4-col on `lg:`.

#### `src/components/home/OurApproach.tsx`

| Property          | Old                | New                                                   |
| ----------------- | ------------------ | ----------------------------------------------------- |
| `section` padding | `'48px 64px'`      | `'var(--spacing-section-y-sm) var(--spacing-page-x)'` |
| `h2` fontSize     | `'22px'`           | `'var(--font-size-section-title)'`                    |
| `p` fontSize      | `'14px'`           | Unchanged                                             |
| `p` maxWidth      | `'600px'`          | Unchanged                                             |
| Grid className    | `grid grid-cols-3` | `grid grid-cols-1 lg:grid-cols-3`                     |
| Grid gap          | `'48px'`           | `'var(--spacing-column-gap)'`                         |

#### `src/components/home/Testimonial.tsx`

| Property                | Old       | New                          |
| ----------------------- | --------- | ---------------------------- |
| `section` paddingBlock  | `'80px'`  | `'var(--spacing-section-y)'` |
| `section` paddingInline | `'64px'`  | `'var(--spacing-page-x)'`    |
| `blockquote` fontSize   | `'28px'`  | `'var(--font-size-quote)'`   |
| `blockquote` maxWidth   | `'900px'` | Unchanged                    |

---

### Phase 4 — About Page (5 files)

#### `src/components/about/AboutHero.tsx`

| Property          | Old                | New                                                                            |
| ----------------- | ------------------ | ------------------------------------------------------------------------------ |
| `section` padding | `'80px 64px 48px'` | `'var(--spacing-section-y) var(--spacing-page-x) var(--spacing-section-y-sm)'` |
| `h1` fontSize     | `'72px'`           | `'var(--font-size-hero)'`                                                      |
| `h1` maxWidth     | `'800px'`          | Unchanged                                                                      |
| `p` fontSize      | `'16px'`           | `'var(--font-size-body)'`                                                      |
| `p` maxWidth      | `'600px'`          | Unchanged                                                                      |

#### `src/components/about/OurStory.tsx`

| Property                 | Old                              | New                                                               |
| ------------------------ | -------------------------------- | ----------------------------------------------------------------- |
| `section` padding        | `'48px 64px'`                    | `'var(--spacing-section-y-sm) var(--spacing-page-x)'`             |
| `section` gap            | `'64px'`                         | `'var(--spacing-large-gap)'`                                      |
| `section` layout         | `display: 'flex'` (implicit row) | className `flex flex-col md:flex-row`                             |
| Left column `width`      | `'400px'`                        | Remove `width: '400px'`, add className `md:w-[300px] md:shrink-0` |
| Left column `flexShrink` | `0`                              | Remove (handled by `md:shrink-0`)                                 |
| `h2` fontSize            | `'22px'`                         | `'var(--font-size-section-title)'`                                |
| `p` fontSize             | `'16px'`                         | `'var(--font-size-body)'`                                         |

On mobile, columns stack vertically. On `md:+`, sidebar is `300px` (narrower than current `400px` to fit better at `768px`).

#### `src/components/about/TeamGrid.tsx`

| Property          | Old                | New                                                   |
| ----------------- | ------------------ | ----------------------------------------------------- |
| `section` padding | `'48px 64px'`      | `'var(--spacing-section-y-sm) var(--spacing-page-x)'` |
| `h2` fontSize     | `'22px'`           | `'var(--font-size-section-title)'`                    |
| Grid className    | `grid grid-cols-4` | `grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`      |
| Grid gap          | `'24px'`           | `'var(--spacing-card-gap)'`                           |
| Image `height`    | `'320px'`          | Remove `height`, add `aspectRatio: '5 / 4'`           |

#### `src/components/about/Values.tsx`

| Property          | Old                | New                                                   |
| ----------------- | ------------------ | ----------------------------------------------------- |
| `section` padding | `'48px 64px'`      | `'var(--spacing-section-y-sm) var(--spacing-page-x)'` |
| `h2` fontSize     | `'22px'`           | `'var(--font-size-section-title)'`                    |
| Grid className    | `grid grid-cols-3` | `grid grid-cols-1 lg:grid-cols-3`                     |
| Grid gap          | `'48px'`           | `'var(--spacing-column-gap)'`                         |

#### `src/app/about/page.tsx`

| Property                    | Old       | New                                         |
| --------------------------- | --------- | ------------------------------------------- |
| Image wrapper paddingInline | `'64px'`  | `'var(--spacing-page-x)'`                   |
| Image `height`              | `'400px'` | Remove `height`, add `aspectRatio: '7 / 2'` |

---

### Phase 5 — Blog Page (4 files)

#### `src/components/blog/BlogHero.tsx`

| Property          | Old                | New                                                     |
| ----------------- | ------------------ | ------------------------------------------------------- |
| `section` padding | `'80px 64px 32px'` | `'var(--spacing-section-y) var(--spacing-page-x) 32px'` |
| `h1` fontSize     | `'72px'`           | `'var(--font-size-hero)'`                               |
| `h1` maxWidth     | `'700px'`          | Unchanged                                               |
| `p` fontSize      | `'16px'`           | `'var(--font-size-body)'`                               |
| `p` maxWidth      | `'520px'`          | Unchanged                                               |

#### `src/components/blog/FeaturedPost.tsx`

| Property                | Old                                      | New                                                                           |
| ----------------------- | ---------------------------------------- | ----------------------------------------------------------------------------- |
| `section` paddingInline | `'64px'`                                 | `'var(--spacing-page-x)'`                                                     |
| `section` paddingBlock  | `'48px'`                                 | `'var(--spacing-section-y-sm)'`                                               |
| Link layout             | `display: 'flex'` row with `gap: '32px'` | className `flex flex-col md:flex-row` with `gap: 'var(--spacing-column-gap)'` |
| Image `width`           | `'600px'`                                | Remove `width`, add className `md:w-1/2`                                      |
| Image `height`          | `'360px'`                                | Remove `height`, add `aspectRatio: '5 / 3'`                                   |
| `h2` fontSize           | `'28px'`                                 | `'var(--font-size-quote)'` (same clamp range)                                 |

On mobile, image stacks above text content at full width. On `md:+`, image takes half width.

#### `src/components/blog/PostGrid.tsx`

| Property                | Old                | New                                              |
| ----------------------- | ------------------ | ------------------------------------------------ |
| `section` paddingInline | `'64px'`           | `'var(--spacing-page-x)'`                        |
| `section` paddingBlock  | `'48px'`           | `'var(--spacing-section-y-sm)'`                  |
| `h2` fontSize           | `'22px'`           | `'var(--font-size-section-title)'`               |
| Grid className          | `grid grid-cols-3` | `grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3` |
| Grid gap                | `'24px'`           | `'var(--spacing-card-gap)'`                      |

#### `src/components/blog/CategoryFilter.tsx`

| Property                | Old               | New                       |
| ----------------------- | ----------------- | ------------------------- |
| Container paddingInline | `'64px'`          | `'var(--spacing-page-x)'` |
| Container layout        | `display: 'flex'` | Add `flexWrap: 'wrap'`    |

Buttons are small enough to not need fluid sizing — just add `flex-wrap` so they wrap on narrow viewports.

---

### Phase 6 — Blog Post Page (1 file)

#### `src/app/blog/[slug]/page.tsx`

| Property                    | Old            | New                                                |
| --------------------------- | -------------- | -------------------------------------------------- |
| Hero section padding        | `'110px 64px'` | `'var(--spacing-section-y) var(--spacing-page-x)'` |
| `h1` fontSize               | `'72px'`       | `'var(--font-size-hero)'`                          |
| `p` fontSize                | `'16px'`       | `'var(--font-size-body)'`                          |
| `p` maxWidth                | `'600px'`      | Unchanged                                          |
| Image wrapper paddingInline | `'64px'`       | `'var(--spacing-page-x)'`                          |
| Image `height`              | `'400px'`      | Remove `height`, add `aspectRatio: '7 / 2'`        |
| Article padding             | `'64px'`       | `'var(--spacing-page-x)'`                          |
| Content wrapper `width`     | `'578px'`      | `maxWidth: '578px', width: '100%'`                 |

The fixed `width: '578px'` on the article content wrapper becomes `maxWidth: '578px'` with `width: '100%'` so it shrinks on narrow viewports while maintaining the same max reading width.

---

### Phase 7 — Contact Page (5 files)

#### `src/components/contact/ContactHero.tsx`

| Property          | Old                | New                                                                            |
| ----------------- | ------------------ | ------------------------------------------------------------------------------ |
| `section` padding | `'80px 64px 48px'` | `'var(--spacing-section-y) var(--spacing-page-x) var(--spacing-section-y-sm)'` |
| `h1` fontSize     | `'72px'`           | `'var(--font-size-hero)'`                                                      |
| `h1` maxWidth     | `'700px'`          | Unchanged                                                                      |
| `p` fontSize      | `'16px'`           | `'var(--font-size-body)'`                                                      |
| `p` maxWidth      | `'600px'`          | Unchanged                                                                      |

#### `src/components/contact/ContactForm.tsx`

| Property        | Old                                  | New                                                            |
| --------------- | ------------------------------------ | -------------------------------------------------------------- |
| `h2` fontSize   | `'22px'`                             | `'var(--font-size-section-title)'`                             |
| Name fields row | `display: 'flex'` with `gap: '16px'` | className `grid grid-cols-1 sm:grid-cols-2` with `gap: '16px'` |

The first/last name fields row uses a grid so the fields stack on mobile (`< sm:`) and sit side-by-side on `sm:+`. All other form elements (input padding, button sizing, textarea) remain unchanged — they're already reasonable sizes.

#### `src/components/contact/ContactInfo.tsx`

| Property               | Old       | New                                              |
| ---------------------- | --------- | ------------------------------------------------ |
| Container `width`      | `'380px'` | Remove `width`                                   |
| Container `flexShrink` | `0`       | Remove `flexShrink` (parent grid handles sizing) |
| `h2` fontSize          | `'22px'`  | `'var(--font-size-section-title)'`               |

The fixed `380px` width is removed. The parent contact page grid handles column sizing.

#### `src/components/contact/MapSection.tsx`

| Property                | Old       | New                                                               |
| ----------------------- | --------- | ----------------------------------------------------------------- |
| Container paddingInline | `'64px'`  | `'var(--spacing-page-x)'`                                         |
| Map `height`            | `'320px'` | Remove `height`, add `aspectRatio: '4 / 1'`, `minHeight: '200px'` |

The `minHeight: '200px'` prevents the map from becoming too short on narrow viewports where `4/1` aspect ratio would make it very thin.

#### `src/app/contact/page.tsx`

| Property             | Old                              | New                                                   |
| -------------------- | -------------------------------- | ----------------------------------------------------- |
| Form section padding | `'48px 64px'`                    | `'var(--spacing-section-y-sm) var(--spacing-page-x)'` |
| Form section gap     | `'48px'`                         | `'var(--spacing-column-gap)'`                         |
| Form section layout  | `display: 'flex'` (implicit row) | className `flex flex-col md:flex-row`                 |

On mobile, form and contact info stack vertically. On `md:+`, they sit side-by-side.

---

### Phase 8 — MDX Components (2 files)

#### `src/components/mdx/index.tsx`

| Property              | Old      | New                                 |
| --------------------- | -------- | ----------------------------------- |
| `h2` fontSize         | `'24px'` | `'var(--font-size-mdx-h2)'`         |
| `blockquote` fontSize | `'20px'` | `'var(--font-size-mdx-blockquote)'` |
| `p` fontSize          | `'16px'` | `'var(--font-size-body)'`           |

Margins and line-heights remain unchanged — they're already in rem-compatible values.

#### `src/components/mdx/Callout.tsx`

No changes needed. The `15px` font size and `24px` margins are already reasonable at all viewport sizes. The component is used within the article content wrapper which is already constrained by `maxWidth: 578px`.

---

## 5. Impact on Existing Screens

| Screen / Area                  | Current behaviour                 | Change needed                                                    |
| ------------------------------ | --------------------------------- | ---------------------------------------------------------------- |
| All pages — body               | `min-w-[1440px]`, no max-width    | Remove min-width, add `max-width: 1440px` centered               |
| All pages — horizontal padding | Fixed `64px`                      | Fluid `var(--spacing-page-x)` → `clamp(1.25rem, 5vw, 4rem)`      |
| All pages — section padding    | Fixed `48px`–`80px`               | Fluid `var(--spacing-section-y)` / `var(--spacing-section-y-sm)` |
| All pages — hero titles        | Fixed `72px`                      | Fluid `var(--font-size-hero)` → scales 36px–72px                 |
| All pages — section titles     | Fixed `22px`                      | Fluid `var(--font-size-section-title)` → scales 18px–22px        |
| Homepage — Metrics             | Flex row + dividers               | Grid `2-col` → `4-col`, dividers removed                         |
| Homepage — FeaturedDiscoveries | `grid-cols-3`                     | `1-col` → `2-col` → `3-col`                                      |
| About — OurStory               | `400px` fixed sidebar             | `md:w-[300px]` responsive sidebar                                |
| About — TeamGrid               | `grid-cols-4`                     | `1-col` → `2-col` → `4-col`                                      |
| Blog — FeaturedPost            | Fixed `600x360` image             | `aspect-ratio: 5/3` with `md:w-1/2`                              |
| Blog — PostGrid                | `grid-cols-3`                     | `1-col` → `2-col` → `3-col`                                      |
| Blog post — article            | Fixed `width: 578px`              | `maxWidth: 578px; width: 100%`                                   |
| Contact — form + info          | Fixed `380px` info column         | Responsive `md:flex-row` layout                                  |
| Footer                         | Flex row with `300px` logo column | `grid grid-cols-1 md:grid-cols-4`                                |
| Newsletter — input             | Fixed `320px`                     | Full-width with `max-w-md` container                             |
| All images                     | Fixed `height` values             | `aspect-ratio` with `object-cover`                               |

---

## 6. Out of Scope

- Mobile navigation (hamburger menu, drawer) — separate spec.
- Dark mode.
- New mobile-only components or layouts.
- Animations or transitions for responsive changes.
- Print styles.
- Landscape/portrait orientation handling.
- Container queries (PostCard already uses them — preserve as-is).

---

## 7. Success Criteria

- No horizontal scrollbar at any viewport from 320px to 2560px.
- All text remains readable (no text smaller than 9px) at every viewport.
- Desktop appearance at 1440px is pixel-identical to current site (all `clamp()` max values match current fixed values).
- `npm run build` succeeds with zero errors.
- Lighthouse mobile score improves from current state.
- All existing container query behaviour (PostCard) preserved.
- Content is capped at 1440px on ultra-wide screens with background extending full-width.
- All 27 files modified, no others touched.
- Each phase can be implemented and tested independently.

---

## 8. Open Questions

- **OurStory sidebar width:** Reduced from `400px` to `300px` at `md:` breakpoint. Should this scale further or stay fixed at `300px`? Current spec uses `md:w-[300px]`.
- **Callout.tsx:** Currently excluded from changes. Should it use `--font-size-body` for consistency, or keep its `15px` fixed size?
- **Hero section top padding on blog post:** Currently `110px`, mapped to `--spacing-section-y` which maxes at `80px`. This will reduce the blog post hero padding from `110px` to `80px` at desktop. Acceptable?
