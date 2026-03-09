---
type: technical
status: draft
created: 2026-03-09
depends-on: product-pikari-website
---

# Pikari Inc Website — Implementation Plan

## 1. Overview

This technical spec details the step-by-step implementation plan for building the Pikari Inc marketing website from the product spec (`product-pikari-website.md`) and Pencil design file. The site is a Next.js 15 static site with MDX-powered blog content, matching the Pencil designs at 1440px width.

**Design source:** `Pikari AI Site.pen` — frames: Homepage (`mBnLa`), About (`GsxVJ`), Blog (`JKP1D`), Contact (`yEReC`), Blog Post (`XWBb1`)

---

## 2. The Problem

Pikari Inc has a complete product spec and finished Pencil designs but no code. This plan provides a phased, dependency-ordered implementation guide that an agent or developer can execute from start to finish.

---

## 3. Goals

- **Phased execution.** Each phase builds on the previous, with clear dependencies and file lists.
- **Design fidelity.** Every component references exact design tokens, typography specs, and spacing values extracted from the Pencil file.
- **Code quality from day one.** Linting and pre-commit hooks are configured in Phase 1 before any components are written.
- **Complete blog system.** 8 MDX posts with frontmatter, data layer, and rendering pipeline.

---

## 4. Proposed Solution

### Design Decisions (Resolving Open Questions)

1. **Category filtering** — Client-side JS filter on `/blog` via `useState`. No separate routes.
2. **Pagination** — Visual-only for v1. UI renders but all posts display on one page.
3. **Blog post images** — Use Unsplash URLs for all images (blog covers + team photos) via `next.config.ts` remote patterns. Select warm, editorial-tone photos matching the design aesthetic.
4. **Author avatars** — Add `avatar` field to blog post frontmatter schema. Each post specifies its author's image path.
5. **Blog post detail page** — Pencil frame `XWBb1` now exists. Phase 7 is fully specced.
6. **MDX custom components** — Include `Callout` and styled prose elements to demonstrate MDX capabilities.
7. **Linting** — ESLint + Prettier with a Husky pre-commit hook running `lint-staged`.

### Directory Structure

```
src/
  app/
    layout.tsx              # Root layout with fonts, metadata
    page.tsx                # Homepage
    globals.css             # Design tokens, container queries, base styles
    about/page.tsx
    blog/page.tsx
    blog/[slug]/page.tsx
    contact/page.tsx
  components/
    shared/                 # Header, Footer, Divider, SectionBadge, NewsletterCTA, PostCard
    home/                   # Hero, HeroImage, FeaturedDiscoveries, Metrics, OurApproach, Testimonial
    about/                  # AboutHero, OurStory, TeamGrid, Values
    blog/                   # BlogHero, FeaturedPost, CategoryFilter, PostGrid, Pagination, BlogContent
    contact/                # ContactHero, ContactForm, ContactInfo, MapSection
    mdx/                    # Callout, MDX component map
  lib/
    posts.ts                # MDX file reading, parsing, sorting, filtering
  types/
    post.ts                 # Post, PostAuthor, PostFrontmatter interfaces
content/
  blog/                     # 8 .mdx files
public/
  images/blog/              # Blog post cover images
  images/team/              # Team photos
```

### Phase 1: Project Scaffolding & Tooling

**1.1 Initialize Next.js 15 project**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir --no-import-alias
```

**1.2 Install dependencies**

```bash
npm install next-mdx-remote gray-matter lucide-react
npm install -D @tailwindcss/typography prettier eslint-config-prettier husky lint-staged
```

**1.3 Configure linting & pre-commit hook**

- **ESLint**: Extend the Next.js default config with `prettier` to disable formatting rules that conflict.
- **Prettier**: Create `.prettierrc` with project conventions (single quotes, trailing commas, etc.).
- **Husky + lint-staged**:
  ```bash
  npx husky init
  ```
  Configure `.husky/pre-commit` to run `npx lint-staged`.
  Add to `package.json`:
  ```json
  "lint-staged": {
    "*.{ts,tsx}": ["eslint --fix", "prettier --write"],
    "*.{css,json,md,mdx}": ["prettier --write"]
  }
  ```

**1.4 Configure fonts in `src/app/layout.tsx`**
Import `Playfair_Display` and `Inter` from `next/font/google`:

- Playfair: weights 600, 700; styles normal + italic; variable `--font-heading`
- Inter: weights 400, 500, 600, 700; variable `--font-body`
  Apply both variable classes to `<html>`.

**1.5 Design tokens & base styles in `src/app/globals.css`**

Using Tailwind v4 CSS-first configuration with `@theme`:

```css
@import 'tailwindcss';

@theme {
  --color-bg: #fdfcf9;
  --color-text: #1a1a1a;
  --color-text-secondary: #777777;
  --color-text-muted: #999999;
  --color-border: #e5e2dc;
  --color-dark: #1a1a1a;
  --color-white: #ffffff;
}
```

Base styles:

- `body`: font-family Inter, bg `--color-bg`, color `--color-text-secondary`
- Headings: font-family Playfair Display, color `--color-text`
- `[id] { scroll-margin-top: 80px; }` for anchor clearing
- Container query definitions for PostCard contexts
- `text-wrap: balance` utility class

**1.6 Configure `next.config.ts`**
Add `images.remotePatterns` for `images.unsplash.com` (team photos use Unsplash URLs from design).

**1.7 Create TypeScript types — `src/types/post.ts`**

```typescript
export interface PostAuthor {
  name: string;
  role: string;
  avatar: string;
}
export interface PostFrontmatter {
  title: string;
  category: 'Research' | 'Frameworks' | 'Case Studies' | 'Field Notes';
  date: string;
  excerpt: string;
  image: string;
  featured: boolean;
  readTime: string;
  author: PostAuthor;
}
export interface Post extends PostFrontmatter {
  slug: string;
  content: string;
}
```

**Files:** layout.tsx, globals.css, next.config.ts, types/post.ts, .prettierrc, .husky/pre-commit, package.json updates

### Phase 2: Blog Content & Data Layer

**2.1 Create `src/lib/posts.ts`**
Exports:

- `getAllPosts(): Post[]` — reads `content/blog/*.mdx`, parses frontmatter with `gray-matter`, generates slugs from filenames, sorts by date desc
- `getPostBySlug(slug: string): Post | undefined`
- `getFeaturedPost(): Post | undefined` — first post where `featured: true`
- `getRecentPosts(count: number): Post[]` — first N posts
- `getAllCategories(): string[]` — deduplicated category list

Uses `fs.readFileSync` + `path.join(process.cwd(), 'content/blog')` — runs at build time only (SSG).

**2.2 Create 8 MDX blog posts in `content/blog/`**
Each with full YAML frontmatter from product spec section 4.7, plus 3-5 paragraphs of placeholder body content with `##` subheadings. The featured post uses a `<Callout>` MDX component.

1. `the-emergence-pattern.mdx` (Research, featured, Mar 9 2026)
2. `why-best-ai-products-start-with-human-intuition.mdx` (Research, Mar 1)
3. `the-discovery-loop.mdx` (Frameworks, Feb 28)
4. `how-meridian-labs-rebuilt-onboarding.mdx` (Case Studies, Feb 14)
5. `five-things-shipping-ai-to-enterprise.mdx` (Field Notes, Feb 3)
6. `build-vs-buy-ai-capabilities.mdx` (Research, Jan 22)
7. `pms-guide-to-prompt-engineering.mdx` (Field Notes, Jan 10)
8. `shipping-ai-features-that-users-trust.mdx` (Research, Jan 15)

**2.3 Blog post frontmatter includes `avatar` field**
Each post's `author` block includes an `avatar` path. Example:

```yaml
author:
  name: 'Elena Vasquez'
  role: 'Research Lead'
  avatar: '/images/team/elena-vasquez.jpg'
```

**2.4 Images — Unsplash URLs**
Select warm, editorial-tone Unsplash photos for:

- 8 blog post cover images (referenced in frontmatter `image` field)
- 4 team member photos (referenced in frontmatter `avatar` and About page TeamGrid)
- Hero images for Homepage and About page

All referenced via `next.config.ts` remote patterns for `images.unsplash.com`, or downloaded to `public/images/`.

**Files:** lib/posts.ts, 8 MDX files, Unsplash image references

### Phase 3: Shared Components

All components use design tokens (no hardcoded hex), logical properties (`padding-inline`, `border-block-start`), and `text-wrap: balance` where specified.

**3.1 `src/components/shared/Divider.tsx`**
`<hr>` with `border: none; border-block-start: 1px solid var(--color-border)`.

**3.2 `src/components/shared/SectionBadge.tsx`**
Props: `{ label: string }`. Uppercase pill — `padding: 4px 10px`, 1px border `--color-border`, `border-radius: 9999px`, Inter 9px 700 weight, 1px letter-spacing.

**3.3 `src/components/shared/Header.tsx`**
Client component (uses `usePathname()`).

- Logo "PIKARI": Playfair 24px bold, 4px letter-spacing
- Nav: Home, About, Blog, Contact — Inter 14px, 24px gap, active = `--color-text`, inactive = `--color-text-secondary`
- Right: Search icon (Lucide, non-functional) + "GET STARTED" button (Inter 11px 700, uppercase, dark bg, white text, padding 8px 16px, border-radius 4px)
- `padding: 20px 64px`, flex space-between

**3.4 `src/components/shared/Footer.tsx`**

- Top row: Brand block (300px) with "PIKARI" + tagline, 3 link columns (Explore, Company, Legal)
- Bottom row: Copyright left, social links (Twitter, LinkedIn, RSS) right. Top border 1px.
- `padding: 48px 64px`, gap 48px

**3.5 `src/components/shared/NewsletterCTA.tsx`**
Props: `{ title?: string; subtitle?: string }` with defaults.

- Dark bg (`--color-dark`), centered layout
- Title: Playfair 48px italic white. Subtitle: Inter muted.
- Email input (320px) + "Subscribe" button (white bg, dark text)
- **CSS `has()`**: Input wrapper uses `:has(:focus)` for border glow
- Padding: 80px block

**3.6 `src/components/shared/PostCard.tsx`**
Props: `{ post: Post }`. Uses **container queries** to adapt:

- Parent sets `container-type: inline-size` with named containers (`post-home` / `post-blog`)
- Homepage context: 240px image, 22px title, 0.5px letter-spacing, 1.2 line-height
- Blog grid context: 200px image, 18px title, 1.3 line-height
- Meta line: Inter 9px 700, uppercase, 1px letter-spacing, `--color-text-muted`
- Hover states use **`color-mix()`**: `color-mix(in srgb, var(--color-text) 80%, transparent)`

**Files:** 6 components in `src/components/shared/`

### Phase 4: Homepage (`/`)

**4.1 `src/components/home/Hero.tsx`**

- SectionBadge "AI PRODUCT DISCOVERY"
- Headline: "Illuminating the Future of Product" — Playfair 72px italic 600, -2px tracking, 1.05 line-height, `text-wrap: balance`
- Subtitle: Inter 16px `--color-text-secondary`
- CTAs: "Explore Discoveries" (filled dark) + "About Us" (outlined), 12px gap
- `padding: 80px 64px` (top/inline)

**4.2 `src/components/home/HeroImage.tsx`**
Full-width image, 420px height, `padding-inline: 64px`. Warm-toned Unsplash image.

**4.3 `src/components/home/FeaturedDiscoveries.tsx`**

- Header: "Latest Discoveries" (Playfair 22px italic) + "View All →" link
- 3-column grid, 24px gap, `padding-inline: 64px`
- Parent div: `container-type: inline-size; container-name: post-home`
- Maps `getRecentPosts(3)` to PostCard components

**4.4 `src/components/home/Metrics.tsx`**

- 4 stats: 147 Discoveries Published, 52k+ Monthly Readers, 36 Industry Partners, 12 Countries Reached
- Numbers: Inter 42px 600 weight, -2px tracking. Labels: Inter 14px muted.
- Separated by 1px vertical lines. `padding: 64px`

**4.5 `src/components/home/OurApproach.tsx`**

- "Our Approach" title + description paragraph
- 3 pillars with 1px top border, 48px gap:
  - 01 Human-First Discovery
  - 02 Rigorous Experimentation
  - 03 Open Knowledge Sharing

**4.6 `src/components/home/Testimonial.tsx`**

- Centered quote: Playfair 28px italic, max-width 900px
- Attribution: "Sarah Chen, VP of Product, Meridian Labs"
- `padding-block: 80px`

**4.7 Assemble `src/app/page.tsx`**
Server component composing: Header → Divider → Hero → HeroImage → Divider → FeaturedDiscoveries → Divider → Metrics → Divider → OurApproach → Divider → Testimonial → Divider → NewsletterCTA("Stay Curious") → Footer

**Files:** 6 components in `src/components/home/`, `src/app/page.tsx`

### Phase 5: About Page (`/about`)

**5.1 `src/components/about/AboutHero.tsx`**

- Badge: "ABOUT PIKARI"
- Headline: "We Believe the Best Products Begin with Curiosity" — same hero typography
- Subtitle: "Pikari Inc was founded to explore the evolving relationship between human creativity and artificial intelligence in product development."

**5.2 About Image**
Full-width, 400px height, `padding-inline: 64px`. Unsplash image.

**5.3 `src/components/about/OurStory.tsx`**
2-column: left "Our Story" label (400px), right 3 paragraphs (from design):

- P1 (dark): "Pikari was born from a simple observation: the teams building the most impactful AI products weren't necessarily the most technically sophisticated. They were the most curious."
- P2 (secondary): "Founded in 2024, we set out to document what separates great AI-powered products from mediocre ones. We interview builders, analyze launches, study failures, and distill patterns into actionable frameworks."
- P3 (secondary): "Our name, Pikari, means a flash of light—that moment of illumination when a new insight clicks into place. That's what we chase, and what we share."

**5.4 `src/components/about/TeamGrid.tsx`**
"The Team" header, 4-column grid, 24px gap. Team members (from design):

- Elena Vasquez — Founder & Editor-in-Chief
- Marcus Obi — Head of Research
- Aiko Tanaka — Senior Writer
- David Park — Product Strategist

Photos: Unsplash URLs from design file. 320px height per photo.

**5.5 `src/components/about/Values.tsx`**
"What We Value" header, 3-column grid, 48px gap, each with 1px top border:

- **Intellectual Honesty**: "We publish what we find, not what sounds good. If an approach fails, we say so—and explain why."
- **Builder Empathy**: "We write for people in the arena—PMs, designers, engineers—not armchair theorists. Practical above all."
- **Long-Term Thinking**: "We focus on durable insights over trending takes. The best product thinking compounds over time."

**5.6 Assemble `src/app/about/page.tsx`**
Header → Divider → AboutHero → Divider → AboutImage → Divider → OurStory → Divider → TeamGrid → Divider → Values → Divider → Footer

**Files:** 4 components in `src/components/about/`, `src/app/about/page.tsx`

### Phase 6: Blog Listing Page (`/blog`)

**6.1 `src/components/blog/BlogHero.tsx`**

- Badge: "THE BLOG"
- Headline: "Discoveries, Frameworks & Field Notes" — hero typography
- Subtitle text

**6.2 `src/components/blog/CategoryFilter.tsx`**
Client component. Props: `{ categories: string[]; active: string; onSelect: (cat: string) => void }`.
Pills: "All" (filled dark when active) + per-category (outlined). Inter 12px 500, padding 6px 16px, border-radius 9999px.

**6.3 `src/components/blog/FeaturedPost.tsx`**
Side-by-side: image left (600px, 360px height) + content right.
Content: "FEATURED" badge (dark bg), meta line, title (Playfair 28px italic), description, author avatar + name.

**6.4 `src/components/blog/PostGrid.tsx`**
3-column grid, 24px gap. Parent: `container-type: inline-size; container-name: post-blog`. Maps posts to PostCard.

**6.5 `src/components/blog/Pagination.tsx`**
Visual-only: chevron-left, page numbers 1-4, chevron-right. Centered. Non-functional for v1.

**6.6 `src/components/blog/BlogContent.tsx`**
Client component wrapper managing category filter state. Receives all posts + featured post as props from server component. Filters posts client-side when category changes.

**6.7 Assemble `src/app/blog/page.tsx`**
Server component: reads posts via `getAllPosts()` and `getFeaturedPost()`, passes to BlogContent.
Layout: Header → Divider → BlogHero + CategoryFilter → Divider → FeaturedPost → Divider → PostGrid (recent) → Divider → PostGrid (more) + Pagination → Divider → NewsletterCTA("Never Miss a Discovery") → Divider → Footer

**Files:** 6 components in `src/components/blog/`, `src/app/blog/page.tsx`

### Phase 7: Blog Post Page (`/blog/[slug]`)

**Design source:** Pencil frame `XWBb1` — "Pikari Inc — Blog Post"

**7.1 MDX components — `src/components/mdx/`**

- `Callout.tsx`: Styled aside with left border accent
- `index.tsx`: Component map for `next-mdx-remote`. Custom renderers for:
  - `p`: Inter 16px, 1.6 line-height, `color: var(--color-text-secondary)`. First paragraph gets `color: var(--color-text)` (use `:first-of-type` or a lead paragraph component)
  - `h2`: Playfair Display italic section headings
  - `blockquote`: Styled quote block
  - `Callout`: Custom MDX component

**7.2 `src/app/blog/[slug]/page.tsx`**

- `generateStaticParams()` returns all slugs from `getAllPosts()`
- `generateMetadata()` for SEO (title, description from excerpt, og:image)
- Compiles MDX with `compileMDX` from `next-mdx-remote/rsc`

**Layout (from Pencil frame):**

1. Header
2. Divider
3. **Post Hero** (centered, `padding: 110px 64px`, `align-items: center`):
   - Category badge pill (same SectionBadge component)
   - Title: Playfair 72px italic 600, -2px tracking, 1.05 line-height, `text-wrap: balance`
   - Excerpt: Inter 16px, `color: var(--color-text-secondary)`, 600px max-width, 1.6 line-height
   - Gap: 18px between elements
4. Divider
5. **Post Image**: Full-width, 400px height, `padding-inline: 64px` (same pattern as About page image)
6. Divider
7. **Article Body** (centered, `align-items: center`, `padding: 64px`):
   - Content wrapper: 578px width, white bg (`#FFF`), `gap: 16px` between elements, clipped overflow
   - Prose: Inter 16px, 1.6 line-height
   - First paragraph: `color: var(--color-text)` (dark)
   - Subsequent paragraphs: `color: var(--color-text-secondary)`
   - Use `@tailwindcss/typography` prose classes with overrides for these token colors and the 578px width
8. Dividers
9. Newsletter CTA ("Never Miss a Discovery")
10. Footer

**Files:** 2 components in `src/components/mdx/`, `src/app/blog/[slug]/page.tsx`

### Phase 8: Contact Page (`/contact`)

**8.1 `src/components/contact/ContactHero.tsx`**
Badge: "GET IN TOUCH". Headline: "We'd Love to Hear from You". Subtitle: "Whether you have a question about our research, want to collaborate, or just want to say hello—reach out. We respond within 48 hours."

**8.2 `src/components/contact/ContactForm.tsx`**
Client component. "Send a Message" header.
Fields (from design): First Name + Last Name (side-by-side), Email ("you@company.com" placeholder), Subject ("What's this about?"), Message textarea 140px ("Tell us what's on your mind...").
Inputs: Inter 14px, 1px border `--color-border`, padding 14px 16px. Labels: Inter 12px 500.
"Send Message" button: dark bg, white text, padding 16px 32px.
`e.preventDefault()` — no backend.

**8.3 `src/components/contact/ContactInfo.tsx`**
"Other Ways to Reach Us" (380px width). 4 info blocks with 1px top border, 48px gap:

- **Email**: hello@pikari.inc
- **Office**: 548 Market Street, Suite 420 / San Francisco, CA 94104
- **Social**: Twitter, LinkedIn, GitHub
- **Response Time**: "We typically respond within 24–48 hours during business days."

**8.4 `src/components/contact/MapSection.tsx`**
Static map placeholder image, 320px height, `padding-inline: 64px`.

**8.5 Assemble `src/app/contact/page.tsx`**
Header → Divider → ContactHero → Divider → ContactBody (2-col: ContactForm fill + ContactInfo 380px, 48px gap) → Divider → MapSection → Divider → Footer

**Files:** 4 components in `src/components/contact/`, `src/app/contact/page.tsx`

### Phase 9: Final Assembly & Polish

**9.1 Finalize root layout**

- `<html lang="en">` with font variables
- `<body>` with `min-width: 1440px` (desktop-only)
- Site metadata: title template, description, favicon

**9.2 Finalize `globals.css`**
Ensure all container query rules, `has()` styles, and utility classes are complete.

**9.3 Build verification**

```bash
npm run build
```

Verify:

- All 4 static pages generate (/, /about, /blog, /contact)
- All 8 blog post pages generate at /blog/[slug] with full article layout
- No TypeScript or lint errors
- Pre-commit hook fires on `git commit` and runs lint-staged successfully

### Phase 10: Visual Verification

Use the Pencil MCP `get_screenshot` tool to compare each page frame against the built site. Check:

- [ ] Typography: correct font, weight, size, italic, letter-spacing, line-height
- [ ] Spacing: `padding-inline: 64px` everywhere, section gaps, card gaps
- [ ] Colors: all via CSS custom properties, no hardcoded hex in components
- [ ] Dividers: 1px `--color-border` between every section
- [ ] Header: active nav state matches current page
- [ ] Container queries: PostCard adapts between homepage (large) and blog grid (compact)
- [ ] `text-wrap: balance` on hero headlines and section titles
- [ ] Logical properties used throughout (no `padding-left/right`)
- [ ] `color-mix()` on hover states
- [ ] CSS `has()` on newsletter input focus
- [ ] `scroll-margin-top` on `[id]` elements
- [ ] All 8 blog posts render at correct URLs
- [ ] Featured post appears in blog listing
- [ ] Homepage shows 3 most recent posts
- [ ] Category filter toggles visible posts
- [ ] Lint passes: `npm run lint`

---

## 5. Impact on Existing Screens

_N/A — This is a brand-new project. No existing code or screens._

---

## 6. Out of Scope

- Mobile/responsive layouts (desktop-first at 1440px only)
- Search functionality (icon present but non-functional)
- Backend for newsletter/contact forms
- Authentication, CMS, analytics, dark mode
- Image optimization pipeline (use Next.js Image with Unsplash URLs)

---

## 7. Success Criteria

- All 5 pages (+ 8 blog post routes) render and match the Pencil design at 1440px
- `npm run build` succeeds with all pages statically generated
- `npm run lint` passes with zero errors
- Pre-commit hook runs lint-staged on every commit
- Container queries, `has()`, `text-wrap: balance`, logical properties, `color-mix()`, and `scroll-margin-top` are all used as specified
- No hardcoded hex colors in components — all reference CSS custom properties

---

## 8. Open Questions

_All resolved — see Design Decisions section above._

---

## Dependency Graph

```
Phase 1 (scaffolding + tooling)
  ↓
Phase 2 (content + data layer)
  ↓
Phase 3 (shared components)
  ↓
Phases 4-8 (pages — can be built in any order, all depend on Phase 3)
  ↓
Phase 9 (final assembly)
  ↓
Phase 10 (visual verification)
```

## Estimated File Count: ~55 files

- Config/setup: 5 | Shared components: 6 | Home components: 6 | About components: 4
- Blog components: 6 | Contact components: 4 | MDX components: 2 | Page files: 5
- Library: 1 | Types: 1 | Blog content: 8 | Placeholder images: ~12
