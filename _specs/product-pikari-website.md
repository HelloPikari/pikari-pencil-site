---
type: product
status: draft
created: 2026-03-09
---

# Pikari Inc Website — Product Spec

## 1. Overview

Pikari Inc needs a marketing website with a blog, built from a Pencil design file ("Pikari AI Site.pen"). The site has 4 pages — Homepage, About, Blog, and Contact — all sharing a consistent header, footer, and visual language. Blog posts are authored in MDX with YAML frontmatter. The stack is **Next.js 15 + React 19 + Tailwind v4 + MDX**.

---

## 2. The Problem

Pikari Inc currently has no web presence. The company needs a content-driven website to publish research, frameworks, case studies, and field notes about AI product development. The site must be fast, SEO-friendly, and easy to maintain — blog posts should be authored as Markdown files in the repo, not through a CMS.

---

## 3. Goals

- **Pixel-faithful implementation.** Every page matches the Pencil design file with correct typography, spacing, colors, and layout.
- **MDX-powered blog.** 8 blog posts with frontmatter, rendered at build time via SSG. Authors write `.mdx` files — no CMS needed.
- **Modern CSS.** Use container queries, `has()`, `text-wrap: balance`, logical properties, and `color-mix()` where they provide real value.
- **Reusable components.** Shared Header, Footer, PostCard, NewsletterCTA, and other components used across pages without duplication.
- **Static generation.** All pages pre-rendered at build time. Deploy-anywhere compatible (Vercel, Cloudflare Pages, etc.).
- **Clean project structure.** Clear separation between content (`content/blog/`), components, pages, and utilities.

---

## 4. Proposed Solution

### 4.1 Design Source

All designs come from the Pencil file at:
```
/Users/steveariss/Library/CloudStorage/GoogleDrive-steve@pikari.io/
  Shared drives/Pikari Projects/Pikari/AI/Exploration/Website/Pencil/Pikari AI Site.pen
```

Key frame IDs for reference:
| Page | Frame ID | Frame Name |
|------|----------|------------|
| Homepage | `mBnLa` | Pikari Inc — Homepage |
| About | `GsxVJ` | Pikari Inc — About |
| Blog | `JKP1D` | Pikari Inc — Blog |
| Contact | `yEReC` | Pikari Inc — Contact |

### 4.2 Design Tokens

Extracted from the Pencil design — these become CSS custom properties:

**Colors:**
| Token | Value | Usage |
|-------|-------|-------|
| `--color-bg` | `#FDFCF9` | Page background (warm off-white) |
| `--color-text` | `#1A1A1A` | Primary text, headings, logo |
| `--color-text-secondary` | `#777777` | Body text, nav items, descriptions |
| `--color-text-muted` | `#999999` | Meta labels, footer social, metric labels |
| `--color-border` | `#E5E2DC` | Dividers, card borders, section separators |
| `--color-dark` | `#1A1A1A` | Dark backgrounds (CTA section, buttons) |
| `--color-white` | `#FFFFFF` | White text on dark bg, button text |

**Typography:**
| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Headings | Playfair Display | 600, 700 | Hero titles (72px), section titles (22-28px), card titles, logo (24px) |
| Body | Inter | 400, 500, 600, 700 | Navigation, body text, buttons, meta labels, badges |
| Icons | Lucide | — | search, chevron-left, chevron-right |

**Key heading styles (italic used throughout):**
- Hero titles: 72px, italic, 600 weight, -2px letter-spacing, 1.05 line-height
- Section titles: 22px, italic, 600 weight, 0.5px letter-spacing
- Card titles (homepage): 22px, italic, 600 weight, 0.5px letter-spacing, 1.2 line-height
- Card titles (blog grid): 18px, italic, 600 weight, 1.3 line-height
- Badge text: 9px, 700 weight, 1px letter-spacing, uppercase

**Spacing patterns:**
- Page horizontal padding: 64px
- Section vertical padding: 64px (some sections use 80px top)
- Card gaps: 24px
- Nav item gap: 24px
- Component internal gaps: 16-18px

### 4.3 Pages and Sections

#### Homepage (`/`)
| Order | Section | Key Details |
|-------|---------|-------------|
| 1 | Header | Logo "PIKARI" (Playfair 24px bold, 4px tracking), nav (Home/About/Blog/Contact), search icon, "GET STARTED" CTA button |
| 2 | Divider | 1px `#E5E2DC` full-width |
| 3 | Hero | Badge "AI PRODUCT DISCOVERY", headline "Illuminating the Future of Product" (72px italic), subtitle, two CTAs: "Explore Discoveries" (filled dark) + "About Us" (outlined) |
| 4 | Hero Image | Full-width image with 64px horizontal padding, 420px height |
| 5 | Divider | |
| 6 | Featured Discoveries | Header: "Latest Discoveries" + "View All →" link. 3-column card grid showing latest blog posts |
| 7 | Divider | |
| 8 | Metrics | 4 stats in a row with 1px vertical separators: 147 Discoveries Published, 52k+ Monthly Readers, 36 Industry Partners, 12 Countries Reached. Numbers: Inter 42px 600 weight, -2px tracking |
| 9 | Divider | |
| 10 | How We Think | Header: "Our Approach" title + description paragraph. 3-column pillars with 1px top border: 01 Human-First Discovery, 02 Rigorous Experimentation, 03 Open Knowledge Sharing |
| 11 | Divider | |
| 12 | Testimonial | Centered quote (Playfair 28px italic, 900px max-width), attribution: "Sarah Chen, VP of Product, Meridian Labs" |
| 13 | Divider | |
| 14 | Final CTA (Newsletter) | Dark bg (`#1A1A1A`). "Stay Curious" (Playfair 48px italic white), subtitle, email input (320px, bordered `#333`) + "Subscribe" button (white bg, dark text) |
| 15 | Footer | Brand ("PIKARI" + tagline, 300px), 3 link columns (Explore, Company, Legal) with 64px gap, copyright bar with social links (Twitter, LinkedIn, RSS) |

#### About (`/about`)
| Order | Section | Key Details |
|-------|---------|-------------|
| 1 | Header | Same as homepage, "About" nav item active |
| 2 | Divider | |
| 3 | About Hero | Badge "ABOUT PIKARI", headline "We Believe the Best Products Begin with Curiosity" (72px italic), subtitle |
| 4 | Divider | |
| 5 | About Image | Full-width image, 400px height, 64px horizontal padding |
| 6 | Divider | |
| 7 | Our Story | 2-column: left side "Our Story" label (400px width), right side 3 paragraphs (first in dark text, others in secondary) |
| 8 | Divider | |
| 9 | Team | "The Team" header, 4-column grid of team member cards (photo + name + role) |
| 10 | Divider | |
| 11 | Values | "What We Value" header, 3-column layout with top borders |
| 12 | Divider | |
| 13 | Footer | Same as homepage |

#### Blog (`/blog`)
| Order | Section | Key Details |
|-------|---------|-------------|
| 1 | Header | Same, "Blog" active |
| 2 | Divider | |
| 3 | Blog Hero | Badge "THE BLOG", headline "Discoveries, Frameworks & Field Notes" (72px italic), subtitle, category filter pills: All (filled dark), Research, Frameworks, Case Studies, Field Notes (outlined) |
| 4 | Divider | |
| 5 | Featured Post | Side-by-side: image (600px wide, 360px tall) + content (FEATURED badge dark bg, meta "RESEARCH · MAR 9, 2026 · 12 MIN READ", title 28px Playfair italic, description, author avatar + name) |
| 6 | Divider | |
| 7 | Recent Posts Grid 1 | "Recent Posts" header, 3-column card grid (image 200px, meta, title 18px, description) |
| 8 | Divider | |
| 9 | Recent Posts Grid 2 | Same layout, 3 rows of 3 cards + pagination (chevron-left, page numbers 1-4, chevron-right) |
| 10 | Divider | |
| 11 | Newsletter CTA | Dark bg, "Never Miss a Discovery" (Playfair 48px italic white), subtitle, email + subscribe |
| 12 | Divider | |
| 13 | Footer | Same |

#### Contact (`/contact`)
| Order | Section | Key Details |
|-------|---------|-------------|
| 1 | Header | Same, "Contact" active |
| 2 | Divider | |
| 3 | Contact Hero | Badge "GET IN TOUCH", headline "We'd Love to Hear from You" (72px italic), subtitle about 48hr response time |
| 4 | Divider | |
| 5 | Contact Body | 2-column: left = "Send a Message" form (First Name + Last Name row, Email, Subject, Message textarea, "Send Message" button dark), right = "Other Ways to Reach Us" (380px) with 4 info blocks (Email, Address, Social, Hours) each with top border |
| 6 | Divider | |
| 7 | Map Section | Full-width map image, 320px height, 64px horizontal padding |
| 8 | Divider | |
| 9 | Footer | Same |

### 4.4 Component Architecture

**Shared across pages:**
- `Header` — Logo, nav with active state via `usePathname()`, search icon, CTA
- `Footer` — Brand block (300px), 3 link columns, copyright + social row
- `Divider` — 1px full-width `#E5E2DC` line
- `SectionBadge` — Uppercase text in a bordered pill (padding 4px/10px, 1px border)
- `NewsletterCTA` — Dark bg section with title, subtitle, email input + subscribe button
- `PostCard` — Blog post card used on homepage and blog grid. Uses **container queries** to adapt:
  - In homepage container: 240px image, 22px title
  - In blog grid container: 200px image, 18px title

**Page-specific:**
- Homepage: `Hero`, `FeaturedDiscoveries`, `Metrics`, `OurApproach`, `Testimonial`
- About: `OurStory`, `TeamGrid`, `Values`
- Blog: `FeaturedPost`, `CategoryFilter`, `Pagination`
- Contact: `ContactForm`, `ContactInfo`

### 4.5 MDX Blog System

**Content location:** `content/blog/*.mdx`

**Frontmatter schema:**
```yaml
title: string            # Post title
category: string         # Research | Frameworks | Case Studies | Field Notes
date: string             # YYYY-MM-DD
excerpt: string          # Short description for cards
image: string            # Cover image path (/images/blog/...)
featured: boolean        # Show in featured post slot
readTime: string         # "X min read"
author:
  name: string           # Author display name
  role: string           # Author title/role
```

**Processing:** `src/lib/posts.ts`
- Reads all `.mdx` files from `content/blog/`
- Parses frontmatter with `gray-matter`
- Generates slugs from filenames
- Sorts by date descending
- Filters by category
- Returns typed `Post` objects

**Rendering:** `next-mdx-remote` compiles MDX at build time. Custom components (callouts, code blocks, etc.) mapped in `src/components/shared/mdx/index.tsx`.

### 4.6 Modern CSS Techniques

Use these where they provide clear value — not for decoration:

| Technique | Where | Why |
|-----------|-------|-----|
| **Container queries** (`@container`) | `PostCard` component | Card adapts image height + title size to parent container (homepage vs blog grid) — single component, no size props needed |
| **CSS `has()`** | Newsletter email input | `:has(:focus)` on wrapper changes border/glow when input is focused, no JS state required |
| **`text-wrap: balance`** | Hero headlines, section titles | Produces more even line breaks on the 2-3 line Playfair Display italic headings |
| **Logical properties** | Padding, margins, borders | `padding-inline: 64px`, `border-block-start: 1px`, etc. — cleaner semantics, RTL-ready |
| **`color-mix()`** | Hover states | Derive hover colors from base tokens: `color-mix(in srgb, var(--color-text) 80%, transparent)` — no separate hover color tokens needed |
| **`scroll-margin-top`** | Section anchors | Ensures in-page links clear a potential sticky header |

### 4.7 Eight Scaffolded Blog Posts

Each post includes frontmatter + 3-5 paragraphs of placeholder MDX body content with subheadings.

**Post 1 — Featured**
```yaml
# content/blog/the-emergence-pattern.mdx
title: "The Emergence Pattern: How AI Features Go from Novelty to Necessity"
category: "Research"
date: "2026-03-09"
readTime: "12 min read"
featured: true
image: "/images/blog/emergence-pattern.jpg"
excerpt: "A longitudinal study of 50 products that successfully transitioned AI features from 'nice to have' to core value proposition. What patterns emerge, and what can builders learn?"
author:
  name: "Elena Vasquez"
  role: "Research Lead"
```

**Post 2**
```yaml
# content/blog/why-best-ai-products-start-with-human-intuition.mdx
title: "Why the Best AI Products Start with Human Intuition"
category: "Research"
date: "2026-03-01"
readTime: "8 min read"
featured: false
image: "/images/blog/human-intuition.jpg"
excerpt: "Exploring how leading teams balance machine intelligence with human judgment to build products people actually want."
author:
  name: "Sarah Chen"
  role: "VP of Product"
```

**Post 3**
```yaml
# content/blog/the-discovery-loop.mdx
title: "The Discovery Loop: A Framework for AI Iteration"
category: "Frameworks"
date: "2026-02-28"
readTime: "10 min read"
featured: false
image: "/images/blog/discovery-loop.jpg"
excerpt: "A practical methodology for rapid experimentation when building AI-powered features into existing products."
author:
  name: "Elena Vasquez"
  role: "Research Lead"
```

**Post 4**
```yaml
# content/blog/how-meridian-labs-rebuilt-onboarding.mdx
title: "How Meridian Labs Rebuilt Their Onboarding with AI"
category: "Case Studies"
date: "2026-02-14"
readTime: "15 min read"
featured: false
image: "/images/blog/meridian-labs.jpg"
excerpt: "A deep dive into how one team reduced time-to-value by 60% using intelligent user flows."
author:
  name: "Elena Vasquez"
  role: "Research Lead"
```

**Post 5**
```yaml
# content/blog/five-things-shipping-ai-to-enterprise.mdx
title: "Five Things I Learned Shipping AI to Enterprise"
category: "Field Notes"
date: "2026-02-03"
readTime: "6 min read"
featured: false
image: "/images/blog/shipping-enterprise.jpg"
excerpt: "Lessons from the trenches on security reviews, compliance hurdles, and change management."
author:
  name: "Sarah Chen"
  role: "VP of Product"
```

**Post 6**
```yaml
# content/blog/build-vs-buy-ai-capabilities.mdx
title: "When to Build vs. When to Buy AI Capabilities"
category: "Research"
date: "2026-01-22"
readTime: "9 min read"
featured: false
image: "/images/blog/build-vs-buy.jpg"
excerpt: "A decision framework for product leaders weighing build vs. buy for AI integrations."
author:
  name: "Elena Vasquez"
  role: "Research Lead"
```

**Post 7**
```yaml
# content/blog/pms-guide-to-prompt-engineering.mdx
title: "The PM's Guide to Prompt Engineering"
category: "Field Notes"
date: "2026-01-10"
readTime: "5 min read"
featured: false
image: "/images/blog/prompt-engineering.jpg"
excerpt: "You don't need to be a developer. Here's what every product manager should know about prompts."
author:
  name: "Sarah Chen"
  role: "VP of Product"
```

**Post 8**
```yaml
# content/blog/shipping-ai-features-that-users-trust.mdx
title: "Shipping AI Features That Users Actually Trust"
category: "Research"
date: "2026-01-15"
readTime: "7 min read"
featured: false
image: "/images/blog/trust-features.jpg"
excerpt: "Trust is the invisible feature. How to design AI-powered experiences that earn confidence, not skepticism."
author:
  name: "Sarah Chen"
  role: "VP of Product"
```

**Category distribution:** Research (4), Frameworks (1), Case Studies (1), Field Notes (2)

---

## 5. Impact on Existing Screens

*N/A — This is a brand-new project. No existing code or screens.*

---

## 6. Out of Scope

- CMS or admin interface — blog posts are authored as MDX files in the repo
- User authentication or accounts
- E-commerce or payments
- Search functionality (the search icon is present in the design but non-functional for v1)
- Blog post comments
- Analytics integration
- Email newsletter backend (form is frontend-only for now)
- Contact form backend/submission handling
- Responsive/mobile layouts (desktop-first from the 1440px design; responsive can be a follow-up)
- Image optimization pipeline (use Next.js `<Image>` with placeholder images)
- Dark mode

---

## 7. Success Criteria

- All 4 pages render and match the Pencil design screenshots at 1440px width
- All 8 MDX blog posts render at `/blog/[slug]` with correct frontmatter
- Blog listing page shows featured post, category filter UI, post grid, and pagination UI
- Homepage "Featured Discoveries" shows the 3 most recent posts from MDX content
- `npm run build` succeeds with all pages statically generated
- Container queries cause PostCard to adapt between homepage (large) and blog grid (compact) contexts
- `text-wrap: balance` applied to hero headlines and section titles
- Logical properties used for padding and borders throughout
- No hardcoded hex colors in components — all reference CSS custom properties
- Header nav shows correct active state per page

---

## 8. Open Questions

- Should category filtering on `/blog` be client-side (JS filter) or generate separate routes (`/blog/category/research`)?
- Should pagination be real (paginated by `lib/posts.ts`) or purely visual for v1?
- Are placeholder images acceptable for v1, or should we export actual images from the Pencil design?
- Should the blog post body template include MDX custom components (callouts, code blocks) to demonstrate MDX capabilities?
