# Pikari Inc Website

Marketing and blog website for Pikari Inc, a company exploring the intersection of AI and product development. Publishes research, frameworks, case studies, and field notes.

## Specs

Read specs in `_specs/` before implementing. New specs should follow `_specs/_template.md`.

## Blog Post Workflow

Blog posts live in `content/blog/` as `.mdx` files.

### Creating a new post

1. Create a new file in `content/blog/` with a kebab-case filename matching the title (e.g., `my-post-title.mdx`)
2. Every post needs this frontmatter at the top:

```
---
title: 'Post Title'
category: 'Frameworks' | 'Field Notes' | 'Case Studies' | 'Research'
date: 'YYYY-MM-DD'
excerpt: 'A one or two sentence summary of the post.'
image: 'https://images.unsplash.com/photo-XXXXX?w=800&q=80'
featured: false
readTime: 'X min read'
author:
  name: 'Author Name'
  role: 'Role at Pikari'
  avatar: 'https://images.unsplash.com/photo-XXXXX?w=200&q=80'
---
```

3. Write the post body below the frontmatter using Markdown (headings, bold, lists, etc.)
4. Look at existing posts in `content/blog/` for examples of tone, length, and structure.

### Publishing workflow

When a blog post is ready to publish:

1. Pull latest from main: `git pull origin main`
2. Create a branch: `git checkout -b blog/<short-slug>`
3. Add and commit the new/changed files
4. Push and open a pull request: `gh pr create`
5. The post goes live after the PR is reviewed and merged.
