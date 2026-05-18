# deventlab.com

Source for [blog.deventlab.com](https://blog.deventlab.com) — the official engineering blog
for DEventLab open-source projects (d-engine, d-stream, d-queue, and more).

Built with [Astro](https://astro.build/) + [Starlight](https://starlight.astro.build/) +
[starlight-blog](https://github.com/HiDeoo/starlight-blog).

## Local development

```bash
npm install
npm run dev        # http://localhost:4321
```

## Writing a post

1. Create a `.md` file in `src/content/docs/blog/`:
   ```
   src/content/docs/blog/YYYY-MM-DD-your-slug.md
   ```

2. Use this frontmatter:
   ```yaml
   ---
   title: "Your Post Title"
   date: YYYY-MM-DD
   excerpt: One or two sentences shown in the post list.
   authors:
     - joshua
   tags:
     - d-engine          # always include the project tag
     - distributed-systems
   ---
   ```

3. Write the body in Markdown below the frontmatter.

4. Preview locally, then commit and push to `main`. GitHub Actions deploys automatically.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds and deploys to
GitHub Pages at `blog.deventlab.com`.

> **DNS**: requires a CNAME record `blog → deventlab.github.io` at your DNS provider.
> GitHub Pages source must be set to **GitHub Actions** in repo Settings → Pages.
