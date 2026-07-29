// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";
import starlightLlmsTxt from "starlight-llms-txt";

export default defineConfig({
  site: "https://blog.deventlab.com",
  integrations: [
    starlight({
      title: "DEventLab",
      description:
        "Engineering insights from the DEventLab team — distributed systems, d-engine, and beyond.",
      defaultLocale: "en",
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/deventlab",
        },
      ],
      components: {
        Footer: "./src/components/Footer.astro",
      },
      head: [
        {
          tag: "script",
          attrs: {
            type: "module",
            src: "https://static.cloudflareinsights.com/beacon.min.js",
            "data-cf-beacon": '{"token": "bf165cb3d05648eaa1c315208f1e4c18"}',
          },
        },
      ],
      plugins: [
        starlightBlog({
          title: "Blog",
          authors: {
            joshua: {
              name: "Joshua",
              title: "DEventLab",
              url: "https://github.com/deventlab",
              picture: "https://github.com/deventlab.png",
            },
          },
          metrics: {
            readingTime: true,
          },
          postCount: 10,
          recentPostCount: 5,
        }),
        starlightLlmsTxt(),
      ],
      customCss: ["./src/styles/brand.css"],
      sidebar: [],
    }),
  ],
});
