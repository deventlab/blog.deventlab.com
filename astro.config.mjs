// @ts-check
import { defineConfig } from "astro/config";
import sitemap from "@astrojs/sitemap";

export default defineConfig({
  site: "https://blog.deventlab.com",
  integrations: [sitemap()],
  redirects: { "/blog": "/" },
  markdown: { shikiConfig: { theme: "github-dark" } },
});
