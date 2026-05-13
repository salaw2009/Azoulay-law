# Blog source

Hebrew SEO blog posts authored by the `seo-shimon-azoulay` scheduled task.

## Output format

**Important:** Azoulay posts must be saved as **`.html`** files (not `.md`).
The static site has no Markdown renderer — `.md` files dropped here will
sit unrendered and won't appear on the live site.

Each post is an HTML file located at `blog/<slug>.html`, where the slug
is English kebab-case so it maps cleanly to URLs under `/blog/<slug>.html`.

## What every post needs

- Full HTML page with `<html lang="he" dir="rtl">` and the site's
  navy/gold design (use existing posts as templates — copy the `<head>`,
  `<style>`, header, footer and disclaimer blocks verbatim, then swap
  the article body).
- `<title>`, `<meta name="description">`, `<link rel="canonical">` and
  the `BlogPosting` JSON-LD block (update `headline`, `description`,
  `datePublished`, `url`, `keywords`).
- Article body inside `<article class="article-body">` with `<h2>`
  section headings and `<p>` paragraphs.
- Legal disclaimer block at the bottom (already in the template).
- Add a new card to `blog.html` linking to the post (title, date,
  excerpt, "קראו את המאמר" CTA), and add the post to the `blogPost`
  array in the blog-listing JSON-LD.

## Publishing checklist

1. Create `blog/<slug>.html` (use an existing post as a template).
2. Add a card to `blog.html` and an entry to its `blogPost` JSON-LD list.
3. Update `../sitemap.xml` with the new URL.
4. Commit and push to `main`.
