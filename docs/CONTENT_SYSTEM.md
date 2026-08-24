# Friction Hunter publication system

## Boundaries

This repository is the **Friction Hunter publication**: an Astro static site
deployed to GitHub Pages. It is not the Friction Hunter product backend.
Product telemetry is embedded only through the documented public API.

## Taxonomy

Every post needs one category and may belong to one series:

- `friction-hunter`: product architecture, releases, and field notes.
- `ai-systems`: browser AI, WebGPU, LLM systems, and applied engineering.
- `research`: inverse design, biology, and long-form research reports.
- `engineering-learning`: reliability, engineering practice, and learning.

Use 2–5 specific, lowercase, hyphenated tags. Prefer a series for related
multi-part work rather than creating near-duplicate titles.

## Publication checklist

1. Create the post in `src/content/posts/` as Markdown unless it needs an
   interactive component; use MDX only then.
2. Provide `title`, `description`, `pubDatetime`, `category`, and `tags`.
3. Set `series` for a connected body of work and `modDatetime` for substantive
   updates.
4. Use web URLs only; never include local `file://` paths.
5. Run `pnpm lint`, `pnpm format:check`, and `pnpm build` before merging.

Existing filenames deliberately remain stable to preserve published URLs.
