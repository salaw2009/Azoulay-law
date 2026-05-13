# Blog source

Hebrew SEO blog posts authored by the `seo-shimon-azoulay` scheduled task.

Each post is a Markdown file with YAML frontmatter (`title`, `description`,
`date`, `author`, `slug`, `tags`, `lang`, `dir`, `canonical`). Slugs are
English kebab-case so they map cleanly to URL paths under `/blog/<slug>/`.

To publish:
1. Drop the `.md` file into this folder.
2. Render to HTML (Pandoc, markdown-it, etc.) so the static site can serve it.
3. Update `../sitemap.xml` with the new URL.
4. Commit and push to `main`.
