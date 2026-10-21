# blog.deventlab.com

Source of the [deventlab blog](https://blog.deventlab.com): a static [Astro](https://astro.build) site with posts written in Markdown, deployed to GitHub Pages.

## Run locally

```bash
npm install
npm run dev     # http://localhost:4321
```

## Writing a post

Create `src/content/blog/YYYY-MM-DD-your-slug.md` (the file name becomes the URL, `/blog/<file-name>/`):

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

Put images in `src/assets/` and reference them relatively from the post. Preview locally, then push to `main`; GitHub Actions builds and deploys.

## License & trademarks

The code in this repository is licensed under the MIT License (see [LICENSE](LICENSE)).

The posts, the deventlab name, and the logo and other brand assets are not covered by that license and remain the property of deventlab. Please don't use them in a way that suggests endorsement.
