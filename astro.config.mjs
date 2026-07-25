// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import starlightBlog from "starlight-blog";

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
      ],
      customCss: ["./src/styles/brand.css"],
      sidebar: [],
    }),
  ],
});
